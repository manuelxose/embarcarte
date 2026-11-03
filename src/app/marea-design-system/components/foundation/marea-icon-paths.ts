/**
 * Original geometric UI glyphs authored for MC-17 review.
 *
 * Provenance: drawn as simple 24×24 stroke geometry for this milestone. They are
 * NOT copied, traced or adapted from a competitor icon set and they are NOT the
 * proposed MAREA identity artwork held under `docs/marea/brand/assets`. No
 * originality clearance is claimed. All glyphs are currentColor and decorative
 * unless the consumer supplies an accessible name.
 */
export const MAREA_ICON_PATHS = {
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-up': ['M6 15l6-6 6 6'],
  'chevron-right': ['M9 6l6 6-6 6'],
  'chevron-left': ['M15 6l-6 6 6 6'],
  check: ['M4 12l5 5L20 6'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  info: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18', 'M12 11v6', 'M12 7.5v.5'],
  warning: ['M12 3l10 18H2z', 'M12 9v5', 'M12 17v.5'],
  critical: ['M8 2h8l6 6v8l-6 6H8l-6-6V8z', 'M12 7v6', 'M12 17v.5'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18', 'M12 7v5l3 2'],
  offline: ['M3 3l18 18', 'M8 15a6 6 0 0 1 7 0', 'M5 11.5a10 10 0 0 1 4-2.3', 'M15 9.2a10 10 0 0 1 4 2.3'],
  online: ['M4 9a13 13 0 0 1 16 0', 'M7 12.5a9 9 0 0 1 10 0', 'M10.5 16a4 4 0 0 1 3 0', 'M12 19v.5'],
  'arrow-right': ['M4 12h16', 'M14 6l6 6-6 6'],
  external: ['M14 4h6v6', 'M20 4l-9 9', 'M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  dot: ['M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4'],
  square: ['M5 5h14v14H5z'],
  dash: ['M7 12h10'],
  document: ['M6 3h8l4 4v14H6z', 'M14 3v4h4'],
  download: ['M12 4v12', 'M7 11l5 5 5-5', 'M5 20h14'],
  link: ['M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1', 'M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1'],
  target: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18', 'M12 8v8', 'M8 12h8'],
  gauge: ['M4 18a8 8 0 1 1 16 0', 'M12 18l4-5'],
  lock: ['M6 11h12v10H6z', 'M9 11V8a3 3 0 0 1 6 0v3'],
  'shield-alert': ['M12 3l8 3v6c0 4-3.4 7.4-8 9-4.6-1.6-8-5-8-9V6z', 'M12 8v5', 'M12 16v.5'],
  sliders: ['M4 7h10', 'M18 7h2', 'M14 5v4', 'M4 17h4', 'M12 17h8', 'M8 15v4'],
} as const;

export type MareaIconName = keyof typeof MAREA_ICON_PATHS;

export const MAREA_ICON_NAMES = Object.keys(MAREA_ICON_PATHS) as readonly MareaIconName[];
