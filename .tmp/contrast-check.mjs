// One-off palette validation (deleted after the token source is frozen).
const pal = {
  'web-light': { canvas: '#ffffff', surface: '#f2f9fd', surfaceRaised: '#eaf7ff', textPrimary: '#17365d', textSecondary: '#57708a', textMeta: '#57708a', textOnAccent: '#ffffff', dataPrimary: '#17365d', dataSecondary: '#57708a', chartLine: '#17365d', chartGrid: '#748d9f', stateCritical: '#b4423a', stateWarning: '#8a5a00', stateSafe: '#27775c', stateStale: '#555555', stateInfo: '#176ca6', stateCriticalSurface: '#fbe9e7', stateWarningSurface: '#fff4dc', stateSafeSurface: '#e2f5ee', stateStaleSurface: '#f1f1f1', stateInfoSurface: '#eaf3fa', action: '#176ca6', actionHover: '#12568a', focusRing: '#0f5f8c', focusRingOnFill: '#ffffff', disabled: '#6b7f90', disabledSurface: '#f1f5f7', line: '#e1edf5', borderStrong: '#7d8b97', fieldSurface: '#fbfdff' },
  'instrument-day': { canvas: '#f2f9fd', surface: '#ffffff', surfaceRaised: '#eaf7ff', textPrimary: '#17365d', textSecondary: '#4a6579', textMeta: '#52697f', textOnAccent: '#ffffff', dataPrimary: '#17365d', dataSecondary: '#4a6579', chartLine: '#17365d', chartGrid: '#748d9f', stateCritical: '#a32b22', stateWarning: '#8a5a00', stateSafe: '#1f5f49', stateStale: '#55646f', stateInfo: '#17365d', stateCriticalSurface: '#fbe9e7', stateWarningSurface: '#fff4dc', stateSafeSurface: '#e2f5ee', stateStaleSurface: '#eef2f4', stateInfoSurface: '#eaf3fa', action: '#176ca6', actionHover: '#12568a', focusRing: '#0f5f8c', focusRingOnFill: '#ffffff', disabled: '#7a8d9b', disabledSurface: '#eef3f6', line: '#e1edf5', borderStrong: '#788997', fieldSurface: '#ffffff' },
  'instrument-sunlight': { canvas: '#ffffff', surface: '#f7fbfe', surfaceRaised: '#eaf7ff', textPrimary: '#0b2440', textSecondary: '#3f5468', textMeta: '#4a5f73', textOnAccent: '#ffffff', dataPrimary: '#0b2440', dataSecondary: '#3f5468', chartLine: '#0b2440', chartGrid: '#5f7a8e', stateCritical: '#8f1a12', stateWarning: '#6b4300', stateSafe: '#10513c', stateStale: '#46586a', stateInfo: '#17365d', stateCriticalSurface: '#fbe9e7', stateWarningSurface: '#fff4dc', stateSafeSurface: '#e2f5ee', stateStaleSurface: '#eef2f4', stateInfoSurface: '#eaf3fa', action: '#0b4f78', actionHover: '#083f61', focusRing: '#0a4568', focusRingOnFill: '#ffffff', disabled: '#6a7f92', disabledSurface: '#eef3f6', line: '#e1edf5', borderStrong: '#74879a', fieldSurface: '#ffffff' },
  'instrument-night': { canvas: '#0d1b26', surface: '#132733', surfaceRaised: '#1a3343', textPrimary: '#8fd3f5', textSecondary: '#93a6b5', textMeta: '#a9b7c4', textOnAccent: '#0d1b26', dataPrimary: '#8fd3f5', dataSecondary: '#93a6b5', chartLine: '#8fd3f5', chartGrid: '#6a7f8d', stateCritical: '#ff9b8f', stateWarning: '#ffc46b', stateSafe: '#7bd8b0', stateStale: '#a9b7c4', stateInfo: '#93a6b5', stateCriticalSurface: '#3a1e1c', stateWarningSurface: '#3a2c14', stateSafeSurface: '#17332a', stateStaleSurface: '#232f38', stateInfoSurface: '#1e2f3c', action: '#8fd3f5', actionHover: '#b6e2fa', focusRing: '#8fd3f5', focusRingOnFill: '#0d1b26', disabled: '#7d8f9d', disabledSurface: '#1a2833', line: '#28404f', borderStrong: '#5d7282', fieldSurface: '#0f202b' },
};
const lum = (hex) => {
  const c = hex.replace('#', '');
  const v = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const ratio = (a, b) => {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const surfaces = ['canvas', 'surface', 'surfaceRaised', 'fieldSurface'];
const text = ['textPrimary', 'textSecondary', 'textMeta', 'dataPrimary', 'dataSecondary', 'action', 'stateCritical', 'stateWarning', 'stateSafe', 'stateStale', 'stateInfo'];
let fails = 0;
for (const [m, p] of Object.entries(pal)) {
  console.log('==', m);
  for (const t of text) for (const s of surfaces) { const r = ratio(p[t], p[s]); if (r < 4.5) { console.log('TEXT FAIL', t, 'on', s, r.toFixed(2)); fails++; } }
  for (const st of ['stateCritical', 'stateWarning', 'stateSafe', 'stateStale', 'stateInfo']) { const r = ratio(p[st], p[st + 'Surface']); if (r < 4.5) { console.log('BADGE FAIL', st, r.toFixed(2)); fails++; } }
  const check = (a, b, min, label) => { const r = ratio(p[a], p[b]); if (r < min) { console.log('FAIL', label, a, 'vs', b, r.toFixed(2)); fails++; } };
  check('textOnAccent', 'action', 4.5, 'onAccent');
  check('textOnAccent', 'stateCritical', 4.5, 'onAccentCrit');
  check('textOnAccent', 'stateWarning', 4.5, 'onAccentWarn');
  check('textOnAccent', 'stateSafe', 4.5, 'onAccentSafe');
  check('focusRing', 'canvas', 3, 'focusCanvas'); check('focusRing', 'surface', 3, 'focusSurface'); check('focusRing', 'surfaceRaised', 3, 'focusRaised');
  check('focusRingOnFill', 'action', 3, 'focusOnFill');
  check('borderStrong', 'surface', 3, 'border'); check('borderStrong', 'canvas', 3, 'borderCanvas');
  check('chartGrid', 'canvas', 3, 'grid'); check('chartGrid', 'surface', 3, 'gridS');
  check('chartLine', 'canvas', 3, 'line');
  check('disabled', 'canvas', 3, 'disabled');
  console.log('--');
}
console.log('FAILS', fails);
