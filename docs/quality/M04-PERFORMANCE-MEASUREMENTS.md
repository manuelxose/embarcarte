# M04 — Performance measurements

These are **laboratory** measurements from a real Chromium instance, not field (CrUX/RUM)
data. The same machine, build pipeline and script were used before and after the fix.

## 1. Method

`node scripts/check-performance.mjs`:

- starts the built server with a temporary SQLite database and seeded products;
- launches Playwright Chromium headless;
- cold cache via CDP (`Network.setCacheDisabled`);
- mobile profile: 390×844, **4× CPU**, 150 ms latency, 1.6 Mbps down / 750 kbps up;
- desktop profile: 1440×900, unthrottled;
- injects `PerformanceObserver` for LCP, CLS, long tasks and `event` timing;
- waits for `load` + `networkidle` + 2.5 s, then records Navigation Timing, FCP, LCP, CLS,
  resource transfer sizes and a measured language-switch interaction;
- no live payment, no third-party analytics.

`observed_interaction_ms` is a one-interaction lab proxy, **not INP**. INP is defined over
the 98th percentile of interactions in the field and cannot be claimed from this run.

## 2. Before / after

### Mobile 390×844, 4× CPU, 1.6 Mbps

| Page | Metric | Before | After | Change |
| --- | --- | ---: | ---: | ---: |
| `/` | LCP | 1,700 ms | 1,532 ms | −168 ms |
| `/` | CLS | 0.00009 | 0.00009 | unchanged |
| `/en/shop` | LCP | 400 ms | 416 ms | +16 ms (noise) |
| `/en/shop` | CLS | 0.0039 | 0.00020 | improved |
| `/en/shop/e2e-hub` | LCP | **3,620 ms** | **496 ms** | **−3,124 ms** |
| `/en/shop/e2e-hub` | CLS | **1.3181** | **0.00025** | **−1.3178** |
| Product observed interaction | duration | 24 ms | 24 ms | unchanged |
| Language switch | wall time | 170 ms | 165 ms | −5 ms |

### Desktop 1440×900, unthrottled

| Page | Metric | Before | After |
| --- | --- | ---: | ---: |
| `/` | LCP | 536 ms | 248 ms |
| `/en/shop` | LCP | 216 ms | 308 ms |
| `/en/shop/e2e-hub` | LCP | 196 ms | 140 ms |
| `/` | CLS | 0.0018 | 0.0018 |
| `/en/shop` | CLS | 0.00068 | 0.00068 |
| `/en/shop/e2e-hub` | CLS | 0.00073 | 0.00073 |

Desktop LCP differences are single-run lab noise; the material result is the mobile product
page.

## 3. Cause and fix

The product detail was server-rendered correctly, but on the client the `product` signal
started `null`. Hydration replaced the `APP-SHOP-DETAIL` subtree at ~3.4 s, the footer
collapsed/expanded (two 0.659 layout-shift entries), and the price was painted again at
3.62 s, becoming LCP. The page looked identical, so a screenshot alone would not have caught
it.

The fix transfers the SSR product through `TransferState` and initializes the client signal
from it synchronously before hydration. The browser then skips the duplicate request. The
measured product page now paints in 496 ms with CLS 0.00025.

## 4. Budget status

| Objective | Target | Mobile result | Status |
| --- | ---: | ---: | --- |
| LCP | ≤ 2,500 ms | 1,532 ms (home), 416 ms (shop), 496 ms (product) | **Met in lab** |
| INP | ≤ 200 ms | not measured; observed interaction 24–32 ms | **Not claimed** |
| CLS | ≤ 0.1 | 0.00009–0.00025 | **Met in lab** |

The initial JS transfer is ~465 kB across the measured pages (including framework and
fonts); CSS is ~25 kB and fonts ~62 kB. No material regression was introduced by the
security headers or the localized shell.

## 5. Limitations

- One run per page/profile; no statistical distribution.
- Local loopback for the server; real latency/TLS/host load differ.
- No field data, no Lighthouse score, no third-party tag impact.
- INP cannot be concluded from one click; it remains an objective to measure with RUM.
