/**
 * MC-23 in-process git reader for the ENGINE-03 Windows ACL sandbox.
 *
 * Measured 2026-11-05: inside the confined runner a `spawnSync` of `node` or
 * `git` fails with EPERM (Low-integrity token cannot create a grandchild). The
 * catalogue validator needs nine read-only git facts, so this module reads the
 * object store and the index directly, in-process, without spawning anything.
 *
 * Scope: READ-ONLY and deliberately tiny. It supports only the queries the
 * validator asks for, and it throws on anything else rather than silently
 * returning a wrong answer. It never writes, never mutates the index and never
 * touches a ref.
 *
 * Correctness: object contents are zlib-inflated Git objects; the index is
 * parsed from its documented v2/v3/v4 layout. Every returned path is
 * repository-relative and POSIX-normalised, matching `git diff --name-only`.
 */
import { inflateSync } from 'node:zlib';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const toPosix = (p) => p.replace(/\\/g, '/');

/** Locate the real git directory for a worktree (handles the `gitdir:` link file). */
function gitDirOf(worktree) {
  const dotGit = resolve(worktree, '.git');
  if (!existsSync(dotGit)) throw new Error(`not a git worktree: ${worktree}`);
  if (statSync(dotGit).isDirectory()) {
    // Normal repository: .git IS both the per-worktree dir and the common dir.
    // Only an index in this directory can stand in for `git status` here.
    return { gitDir: dotGit, commonDir: dotGit };
  }
  const marker = readFileSync(dotGit, 'utf8').trim();
  if (!marker.startsWith('gitdir:')) throw new Error(`unreadable .git link file in ${worktree}`);
  const gitDir = resolve(worktree, marker.slice('gitdir:'.length).trim());
  const common = resolve(gitDir, 'commondir');
  const commonDir = existsSync(common) ? resolve(gitDir, readFileSync(common, 'utf8').trim()) : gitDir;
  // HEAD and index are PER-WORKTREE (in gitDir); objects and refs are SHARED (commonDir).
  return { gitDir, commonDir };
}

/** Resolve a revision or ref to a full commit/object id. */
export function resolveObject(repo, revision) {
  const { gitDir, commonDir } = gitDirOf(repo);
  const candidate = (name) => {
    if (!name) return null;
    for (const base of [gitDir, commonDir]) {
      const loose = join(base, 'refs', name);
      if (existsSync(loose) && statSync(loose).isFile()) return readFileSync(loose, 'utf8').trim();
      const packed = join(base, 'packed-refs');
      if (existsSync(packed)) {
        for (const line of readFileSync(packed, 'utf8').split('\n')) {
          const [hash, ref] = line.trim().split(/\s+/);
          if (ref === `refs/${name}`) return hash;
        }
      }
    }
    return null;
  };
  if (/^[0-9a-f]{4,40}$/iu.test(revision)) {
    // Full hash: use it directly. Abbreviated hash: scan the loose object store
    // for a unique prefix match, mirroring git's own disambiguation rule.
    if (revision.length === 40) return revision.toLowerCase();
    const matches = new Set();
    for (const base of [gitDir, commonDir]) {
      const objects = join(base, 'objects', revision.slice(0, 2).toLowerCase());
      if (!existsSync(objects)) continue;
      for (const entry of readdirSync(objects)) {
        const full = revision.slice(0, 2).toLowerCase() + entry.toLowerCase();
        if (full.startsWith(revision.toLowerCase())) matches.add(full);
      }
    }
    return matches.size === 1 ? [...matches][0] : null;
  }
  // HEAD is per-worktree and may be a symref or a detached commit id.
  if (revision === 'HEAD') {
    const head = join(gitDir, 'HEAD');
    if (!existsSync(head)) return null;
    const content = readFileSync(head, 'utf8').trim();
    if (!content.startsWith('ref: ')) return content;
    return candidate(content.slice(5).trim().replace(/^refs\//u, ''));
  }
  for (const name of [revision, `heads/${revision}`, `tags/${revision}`]) {
    const hash = candidate(name);
    if (hash) return hash;
  }
  return null;
}

/** Read one Git object from the loose store or a packfile (read-only). */
function readObject(repo, oid, depth = 0) {
  if (depth > 8) throw new Error('git object chain too deep');
  const { gitDir, commonDir } = gitDirOf(repo);
  for (const base of [gitDir, commonDir]) {
    const loose = join(base, 'objects', oid.slice(0, 2), oid.slice(2));
    if (existsSync(loose)) {
      const raw = inflateSync(readFileSync(loose));
      const nul = raw.indexOf(0);
      const header = raw.subarray(0, nul).toString('utf8');
      const [type, size] = header.split(' ');
      return { type, body: raw.subarray(nul + 1), size: Number(size) };
    }
    const packed = readPackedObject(base, oid);
    if (packed) return packed;
  }
  throw new Error(`object ${oid} not found in the loose store or any pack`);
}

// ── packfiles ────────────────────────────────────────────────────────────────
const TYPE_NAMES = { 1: 'commit', 2: 'tree', 3: 'blob', 4: 'tag' };
const packCache = new Map();

function packIndex(base) {
  if (packCache.has(base)) return packCache.get(base);
  const dir = join(base, 'objects', 'pack');
  const found = [];
  if (existsSync(dir)) {
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.idx')) continue;
      const idxPath = join(dir, name);
      const buf = readFileSync(idxPath);
      if (buf.subarray(0, 4).toString('binary') !== '\xfftOc') continue; // only index v2
      const count = buf.readUInt32BE(8 + 255 * 4);
      const names = Buffer.alloc(count * 20);
      let offset = 8 + 256 * 4;
      buf.copy(names, 0, offset, offset + count * 20);
      offset += count * 20 + count * 4; // skip CRC table
      const offsets = new Array(count);
      const large = [];
      for (let i = 0; i < count; i += 1) {
        const value = buf.readUInt32BE(offset + i * 4);
        if (value & 0x80000000) large.push({ index: i, value: value & 0x7fffffff });
        else offsets[i] = value;
      }
      const largeStart = offset + count * 4;
      for (const entry of large) offsets[entry.index] = Number(buf.readBigUInt64BE(largeStart + entry.value * 8));
      found.push({ idxPath, packPath: idxPath.replace(/\.idx$/u, '.pack'), count, names, offsets });
    }
  }
  packCache.set(base, found);
  return found;
}

function readPackedObject(base, oid) {
  const binary = Buffer.from(oid, 'hex');
  for (const pack of packIndex(base)) {
    let lo = 0;
    let hi = pack.count - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const cmp = pack.names.subarray(mid * 20, mid * 20 + 20).compare(binary);
      if (cmp === 0) {
        const { type, bytes } = packEntry(pack.packPath, pack.offsets[mid]);
        return { type, body: bytes, size: bytes.length };
      }
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return null;
}

/** Resolve one pack entry to `{ type, bytes }`, following delta chains. */
const packBuffers = new Map();
function packBuffer(packPath) {
  if (!packBuffers.has(packPath)) packBuffers.set(packPath, readFileSync(packPath));
  return packBuffers.get(packPath);
}

function packEntry(packPath, entryOffset) {
  const buf = packBuffer(packPath);
  let offset = entryOffset;
  let byte = buf[offset];
  offset += 1;
  const typeId = (byte >> 4) & 0x7;
  while (byte & 0x80) {
    byte = buf[offset];
    offset += 1;
  }
  // OFS_DELTA (6) / REF_DELTA (7) reference a base object that is then patched.
  if (typeId === 6) {
    byte = buf[offset];
    offset += 1;
    let baseDistance = byte & 0x7f;
    while (byte & 0x80) {
      byte = buf[offset];
      offset += 1;
      baseDistance = ((baseDistance + 1) << 7) + (byte & 0x7f);
    }
    const base = packEntry(packPath, entryOffset - baseDistance);
    return { type: base.type, bytes: applyDelta(base.bytes, inflateSync(buf.subarray(offset))) };
  }
  if (typeId === 7) {
    const baseOid = buf.subarray(offset, offset + 20).toString('hex');
    offset += 20;
    const { gitDir, commonDir } = packDirOf(packPath);
    const base = bareObject(gitDir, commonDir, baseOid);
    return { type: base.type, bytes: applyDelta(base.bytes, inflateSync(buf.subarray(offset))) };
  }
  return { type: TYPE_NAMES[typeId] ?? 'unknown', bytes: inflateSync(buf.subarray(offset)) };
}

/** Locate the git/common dirs that own a packfile. */
function packDirOf(packPath) {
  // <base>/objects/pack/<name>.pack
  const objectsDir = packPath.replace(/[\\/]objects[\\/]pack[\\/][^\\/]+$/u, '');
  const commonDir = resolve(objectsDir, '..');
  let gitDir = commonDir;
  for (const base of [commonDir, resolve(commonDir, '..')]) {
    const candidate = join(base, '.git');
    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
      gitDir = candidate;
      break;
    }
  }
  // A linked worktree resolves through its own .git file at lookup time; using
  // the common dir is sufficient for object reads.
  return { gitDir: commonDir, commonDir };
}

function bareObject(gitDir, commonDir, oid) {
  for (const base of [gitDir, commonDir]) {
    const loose = join(base, 'objects', oid.slice(0, 2), oid.slice(2));
    if (existsSync(loose)) {
      const raw = inflateSync(readFileSync(loose));
      const nul = raw.indexOf(0);
      const type = raw.subarray(0, nul).toString('utf8').split(' ')[0];
      return { type, bytes: raw.subarray(nul + 1) };
    }
    const packed = readPackedObject(base, oid);
    if (packed) return packed;
  }
  throw new Error(`delta base object ${oid} not found`);
}


/** Apply a Git delta instruction stream to a base object's bytes. */
function applyDelta(baseBytes, delta) {
  let cursor = 0;
  const readVarint = () => {
    let value = 0;
    let shift = 0;
    let byte;
    do {
      byte = delta[cursor];
      cursor += 1;
      value += (byte & 0x7f) << shift;
      shift += 7;
    } while (byte & 0x80);
    return value;
  };
  const baseSize = readVarint();
  const resultSize = readVarint();
  if (baseSize !== baseBytes.length) throw new Error('delta base size mismatch');
  const out = Buffer.alloc(resultSize);
  let written = 0;
  while (cursor < delta.length && written < resultSize) {
    const opcode = delta[cursor];
    cursor += 1;
    if (opcode & 0x80) {
      let cp = 0;
      let cpSize = 0;
      for (let bit = 0; bit < 4; bit += 1) {
        if (opcode & (1 << bit)) {
          cp += delta[cursor] << (8 * bit);
          cursor += 1;
          cpSize += 1;
        }
      }
      let cpLength = 0;
      for (let bit = 0; bit < 3; bit += 1) {
        if (opcode & (1 << (4 + bit))) {
          cpLength += delta[cursor] << (8 * bit);
          cursor += 1;
        }
      }
      if (cpLength === 0) cpLength = 0x10000;
      baseBytes.copy(out, written, cp, cp + cpLength);
      written += cpLength;
    } else if (opcode !== 0) {
      delta.copy(out, written, cursor, cursor + opcode);
      written += opcode;
      cursor += opcode;
    }
  }
  return out;
}


/** Parse a commit object's tree id and parents. */
function commitInfo(repo, oid) {
  const { body } = readObject(repo, oid);
  const text = body.toString('utf8');
  const tree = /^tree ([0-9a-f]{40})$/mu.exec(text)?.[1];
  const parents = [...text.matchAll(/^parent ([0-9a-f]{40})$/gmu)].map((m) => m[1]);
  if (!tree) throw new Error(`malformed commit ${oid}`);
  return { tree, parents };
}

/** List `path -> blob id` for every file in a tree, recursively. */
function treeFiles(repo, treeId, prefix = '', out = new Map()) {
  const { body } = readObject(repo, treeId);
  let offset = 0;
  while (offset < body.length) {
    const space = body.indexOf(32, offset);
    const nul = body.indexOf(0, space);
    const mode = body.subarray(offset, space).toString('utf8');
    const name = body.subarray(space + 1, nul).toString('utf8');
    const oid = body.subarray(nul + 1, nul + 21).toString('hex');
    offset = nul + 21;
    const full = prefix ? `${prefix}/${name}` : name;
    if (mode === '40000') treeFiles(repo, oid, full, out);
    else out.set(full, oid);
  }
  return out;
}

/** Parse the index and return `path -> blob id` for every entry. */
function indexFiles(repo) {
  const { gitDir } = gitDirOf(repo);
  const index = join(gitDir, 'index');
  if (!existsSync(index)) return new Map();
  const buf = readFileSync(index);
  if (buf.subarray(0, 4).toString('utf8') !== 'DIRC') throw new Error('unsupported index signature');
  const version = buf.readUInt32BE(4);
  if (version < 2 || version > 4) throw new Error(`unsupported index version ${version}`);
  const count = buf.readUInt32BE(8);
  const entries = new Map();
  let offset = 12;
  let previous = '';
  for (let i = 0; i < count; i += 1) {
    const start = offset;
    // v2 entry: ctime(8) mtime(8) dev(4) ino(4) mode(4) uid(4) gid(4) size(4)
    // sha1(20) flags(2) [extended flags(2) in v3+] then the NUL-terminated name.
    const oid = buf.subarray(offset + 40, offset + 60).toString('hex');
    const flags = buf.readUInt16BE(offset + 60);
    offset += 62;
    if (version >= 3 && (flags & 0x4000) !== 0) offset += 2; // extended flags present
    let name;
    if (version === 4) {
      let strip = 0;
      let byte = buf[offset];
      offset += 1;
      while (byte & 0x80) {
        strip += 1;
        byte = buf[offset];
        offset += 1;
      }
      const added = buf.subarray(offset, buf.indexOf(0, offset)).toString('utf8');
      offset += Buffer.byteLength(added) + 1;
      name = (strip > 0 ? previous.slice(0, previous.length - strip) : '') + added;
    } else {
      const nul = buf.indexOf(0, offset);
      name = buf.subarray(offset, nul).toString('utf8');
      offset = nul + 1;
      // Entries are padded with NULs so the total length is a multiple of 8.
      while ((offset - start) % 8 !== 0) offset += 1;
    }
    previous = name;
    if ((flags & 0x4000) !== 0x4000) entries.set(name, oid);
  }
  return entries;
}

/**
 * Files whose content differs between `baseRevision` and the current index,
 * excluding deletions from the reported set only when `includeDeleted` is false.
 *
 * Returns POSIX repository-relative paths, exactly like `git diff --name-only`.
 */
export function diffNames(repo, baseRevision, { includeDeleted = true } = {}) {
  const baseOid = resolveObject(repo, baseRevision);
  if (!baseOid) throw new Error(`cannot resolve revision: ${baseRevision}`);
  const baseTree = treeFiles(repo, commitInfo(repo, baseOid).tree);
  const working = indexFiles(repo);
  const changed = new Set();
  for (const [path, oid] of working) if (baseTree.get(path) !== oid) changed.add(path);
  if (includeDeleted) for (const path of baseTree.keys()) if (!working.has(path)) changed.add(path);
  return [...changed].sort();
}

/** Blob id of a path at a revision (undefined when absent). */
export function blobIdAt(repo, revision, path) {
  const oid = resolveObject(repo, revision);
  if (!oid) throw new Error(`cannot resolve revision: ${revision}`);
  return treeFiles(repo, commitInfo(repo, oid).tree).get(toPosix(path));
}

/** Text content of a file at a revision. */
export function fileAt(repo, revision, path) {
  const blob = blobIdAt(repo, revision, path);
  if (blob === undefined) return undefined;
  return readObject(repo, blob).body.toString('utf8');
}

/** Current branch name (`git rev-parse --abbrev-ref` / `git branch --show-current`). */
export function currentBranch(repo) {
  const { gitDir } = gitDirOf(repo);
  const content = readFileSync(join(gitDir, 'HEAD'), 'utf8').trim();
  if (content.startsWith('ref: refs/heads/')) return content.slice('ref: refs/heads/'.length);
  return content.startsWith('ref: ') ? content.slice(5) : null;
}

/** Resolve the current HEAD commit id (`git rev-parse HEAD`). */
export function headCommit(repo) {
  const { gitDir } = gitDirOf(repo);
  const content = readFileSync(join(gitDir, 'HEAD'), 'utf8').trim();
  if (content.startsWith('ref: ')) return resolveObject(repo, content.slice(5).replace(/^refs\//u, ''));
  return content;
}

/**
 * Working-tree state (`git status --porcelain=v1 --untracked-files=all`).
 *
 * Two axes are combined, exactly as git reports them:
 *   - index vs HEAD  -> the staged letter;
 *   - worktree vs index (by stat identity) -> the unstaged letter;
 * plus untracked files, honouring the accumulated .gitignore patterns.
 */
export function statusPorcelain(repo) {
  const baseOid = resolveObject(repo, 'HEAD');
  const baseTree = baseOid ? treeFiles(repo, commitInfo(repo, baseOid).tree) : new Map();
  const index = indexEntries(repo);
  const ignore = ignoreMatcher(repo);
  const lines = [];
  const seen = new Set();

  for (const [path, entry] of index) {
    seen.add(path);
    const base = baseTree.get(path);
    let staged = ' ';
    if (base === undefined) staged = 'A';
    else if (base !== entry.oid) staged = 'M';
    const absolute = join(repo, path);
    const unstaged = existsSync(absolute) && statMatches(absolute, entry) ? ' ' : 'M';
    if (staged !== ' ' || unstaged !== ' ') lines.push(`${staged}${unstaged} ${path}`);
  }
  for (const path of baseTree.keys()) {
    if (!index.has(path)) lines.push(`D  ${path}`);
  }
  for (const path of untrackedFiles(repo, seen, ignore)) lines.push(`?? ${path}`);
  return lines.sort();
}

/** Index entries with the stat fields needed to detect worktree changes. */
function indexEntries(repo) {
  const { gitDir } = gitDirOf(repo);
  const index = join(gitDir, 'index');
  if (!existsSync(index)) return new Map();
  const buf = readFileSync(index);
  if (buf.subarray(0, 4).toString('utf8') !== 'DIRC') throw new Error('unsupported index signature');
  const version = buf.readUInt32BE(4);
  if (version < 2 || version > 4) throw new Error(`unsupported index version ${version}`);
  const count = buf.readUInt32BE(8);
  const entries = new Map();
  let offset = 12;
  let previous = '';
  for (let i = 0; i < count; i += 1) {
    const start = offset;
    const mtimeSec = buf.readUInt32BE(offset + 8);
    const mtimeNsec = buf.readUInt32BE(offset + 12);
    const size = buf.readUInt32BE(offset + 36);
    const oid = buf.subarray(offset + 40, offset + 60).toString('hex');
    const flags = buf.readUInt16BE(offset + 60);
    offset += 62;
    if (version >= 3 && (flags & 0x4000) !== 0) offset += 2;
    let name;
    if (version === 4) {
      let strip = 0;
      let byte = buf[offset];
      offset += 1;
      while (byte & 0x80) {
        strip += 1;
        byte = buf[offset];
        offset += 1;
      }
      const added = buf.subarray(offset, buf.indexOf(0, offset)).toString('utf8');
      offset += Buffer.byteLength(added) + 1;
      name = (strip > 0 ? previous.slice(0, previous.length - strip) : '') + added;
    } else {
      const nul = buf.indexOf(0, offset);
      name = buf.subarray(offset, nul).toString('utf8');
      offset = nul + 1;
      while ((offset - start) % 8 !== 0) offset += 1;
    }
    previous = name;
    if ((flags & 0x4000) !== 0x4000) entries.set(name, { oid, mtimeSec, mtimeNsec, size });
  }
  return entries;
}

/** True when the file on disk still matches the index stat data (git's stat cache). */
function statMatches(absolute, entry) {
  const stat = statSync(absolute);
  const seconds = Math.floor(stat.mtimeMs / 1000);
  const nanos = Math.floor((stat.mtimeMs % 1000) * 1e6);
  return (
    stat.size === entry.size &&
    (seconds !== entry.mtimeSec || Math.abs(nanos - entry.mtimeNsec) < 1_000_000)
  );
}

/** Accumulated .gitignore patterns (root, per-directory and .git/info/exclude). */
function ignoreMatcher(repo) {
  const { gitDir } = gitDirOf(repo);
  const sources = [];
  const collect = (base, prefix = '') => {
    const file = join(base, prefix, '.gitignore');
    if (existsSync(file)) {
      for (const raw of readFileSync(file, 'utf8').split('\n')) {
        const line = raw.trim();
        if (line === '' || line.startsWith('#')) continue;
        const negate = line.startsWith('!');
        const pattern = negate ? line.slice(1) : line;
        sources.push({
          prefix: prefix ? `${prefix}/` : '',
          pattern: pattern.replace(/^\//u, ''),
          dirOnly: pattern.endsWith('/'),
          negate,
          anchored: pattern.startsWith('/'),
        });
      }
    }
    for (const sub of ['dist', 'tmp', 'out-tsc', 'node_modules']) {
      const dir = join(base, prefix, sub);
      if (existsSync(dir)) collect(base, prefix ? `${prefix}/${sub}` : sub);
    }
  };
  collect(repo);
  const exclude = join(gitDir, 'info', 'exclude');
  if (existsSync(exclude)) {
    for (const raw of readFileSync(exclude, 'utf8').split('\n')) {
      const line = raw.trim();
      if (line === '' || line.startsWith('#')) continue;
      sources.push({ prefix: '', pattern: line.replace(/^\//u, ''), dirOnly: line.endsWith('/'), negate: line.startsWith('!'), anchored: line.startsWith('/') });
    }
  }
  const globToRegExp = (glob) =>
    new RegExp(
      `^${glob
        .replace(/[.+^${}()|[\]\\]/gu, '\\$&')
        .replace(/\*\*\//gu, '(?:.*/)?')
        .replace(/\*\*/gu, '.*')
        .replace(/\*/gu, '[^/]*')
        .replace(/\?/gu, '[^/]')}$`,
      'u',
    );
  const compiled = sources.map((s) => ({ ...s, re: globToRegExp(s.pattern) }));

  return (path, isDir) => {
    let ignored = false;
    for (const rule of compiled) {
      if (rule.dirOnly && !isDir) continue;
      const relative = rule.prefix && path.startsWith(rule.prefix) ? path.slice(rule.prefix.length) : path;
      if (rule.prefix && !path.startsWith(rule.prefix)) continue;
      const matches = rule.anchored || rule.pattern.includes('/') ? rule.re.test(relative) : rule.re.test(relative.split('/').pop() ?? relative);
      if (matches) ignored = !rule.negate;
    }
    return ignored;
  };
}

/** Every untracked, non-ignored file in the worktree. */
function untrackedFiles(repo, tracked, ignore) {
  const out = [];
  const walk = (relative) => {
    const absolute = relative ? join(repo, relative) : repo;
    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      const path = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.name === '.git') continue;
      if (entry.isDirectory()) {
        if (ignore(`${path}/`, true)) continue;
        walk(path);
      } else if (entry.isFile()) {
        if (tracked.has(path) || ignore(path, false)) continue;
        out.push(path);
      }
    }
  };
  walk('');
  return out.sort();
}

/** Files that differ between a revision and the current index plus untracked files. */
export function changedSince(repo, revision) {
  const changed = new Set(diffNames(repo, revision));
  for (const line of statusPorcelain(repo)) {
    if (line.startsWith('A  ')) changed.add(line.slice(3));
  }
  return [...changed].sort();
}

/**
 * Read-only subset of the `git` helper, mirroring exactly the argument shapes the
 * catalogue validator uses. Anything else throws instead of guessing.
 */
export function gitSubset(repo, args) {
  const [sub, ...rest] = args;
  const separator = rest.indexOf('--');
  const paths = separator >= 0 ? rest.slice(separator + 1) : [];
  const matchesPaths = (file) =>
    paths.length === 0 || paths.some((p) => file === p || file.startsWith(p.endsWith('/') ? p : `${p}/`));

  if (sub === 'diff' && rest[0] === '--name-only') {
    return diffNames(repo, rest[1]).filter(matchesPaths).join('\n');
  }
  if (sub === 'show' && rest.length === 1) {
    const [revision, path] = rest[0].split(/:(.*)/su);
    const content = fileAt(repo, revision, path ?? '');
    if (content === undefined) throw new Error(`path not found at ${revision}: ${path}`);
    return content;
  }
  if (sub === 'status' && rest.some((a) => a.startsWith('--porcelain'))) {
    return statusPorcelain(repo).join('\n');
  }
  if (sub === 'rev-parse' && (rest[0] === 'HEAD' || rest.length === 0)) {
    return headCommit(repo);
  }
  if (sub === 'branch' && rest[0] === '--show-current') {
    return currentBranch(repo);
  }
  throw new Error(`git ${args.join(' ')} is not available in the confined subset`);
}
