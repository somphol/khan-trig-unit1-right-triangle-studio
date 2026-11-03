# AGENTS.md

## 1. What this is

A static, offline teaching app for Khan Academy Trigonometry Unit 1. One page, four interactive studios: ratio constancy, special right triangles, reciprocal ratios, and a practice sandbox. It produces no build output and talks to no server; it is not a Khan Academy clone, a course platform, or a graded assessment tool.

Current release: **v1.0.0** (2026-11-03).

Live copy: <https://somphol.github.io/khan-trig-unit1-right-triangle-studio/>
Local master: `~/Projects/khan-trig-unit1-right-triangle-studio`

## 2. Commands

```bash
# run (no install, no build)
python3 -m http.server 8080
# then open http://localhost:8080

# quality gates (also run in CI)
node --check script.js
node scripts/check.mjs

# deploy = push to main; GitHub Pages serves the repo root
git push origin main
```

Opening `index.html` via `file://` also works. There is no browser test runner in the repo; CI runs static checks, while manual verification follows [docs/TESTING.md](docs/TESTING.md). Verification for 1.0.0 used headless Chrome over the DevTools protocol and produced zero console errors.

## 3. Architecture

Load order is `index.html` → `style.css` → `script.js`. `script.js` is one IIFE, in this order:

1. `I18N` dictionaries (`en`, `th`) and `t()`.
2. `DEFAULT_STATE`, `loadState`/`saveState` (localStorage key `khanTrigUnit1.v1`).
3. Canvas helpers (`makeStage`, `neonLine`, `drawAngleArc`, `chip`, `vertex`).
4. Module engines: `drawRatio`, `drawSpecial`, `drawReciprocal`; each owns its geometry and DOM readout.
5. Practice generator (`genRatioProblem`, `genSideProblem`, `genStoryProblem`), step builders, badge rules.
6. Tab routing (`showModule`), i18n application (`applyI18n`), export, boot.

Full detail — state shape, drag mapping, geometry formulas, extension recipes — is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). `state.json` is a historical build record, **not** runtime state.

## 4. Decisions and constraints

- **Keep the four colours semantic.** Cyan is always the hypotenuse, coral the opposite, emerald the adjacent, yellow an angle. Canvas, chips, cards and legends depend on this; `scripts/check.mjs` enforces the hex values.
- **Ratios are computed from the drawn sides**, not printed from `Math.sin`, so the displayed division is internally consistent to 4 dp. Do not "simplify" this.
- **Geometry is derived from `θ` + `scale`**, never from stored pixel coordinates. Scale is linear and honest: 0.5× really is one fifth of 2.5× on screen. Side lengths use `c = 8 × scale`.
- **Canvas scaling:** every canvas uses a `ResizeObserver` and a DPR clamp of 2. Hidden panels resize when shown (`showModule`). If you add a canvas, follow `makeStage`.
- **i18n must stay symmetric:** every key exists in both `en` and `th`; `data-i18n*` attributes drive static text, `t()` drives dynamic text. CI fails on divergence.
- **Persistence is best-effort:** `localStorage` failures are swallowed so private mode still works in memory. The export filename is fixed at `khan_trig_unit1_progress.json` by requirement.
- **No dependencies and no network calls.** Do not add a framework, CDN, web font, analytics or remote image. The app must work from `file://`; CI rejects remote runtime assets and network APIs.
- **`state.json` is a snapshot.** It records the build session and is not written by the app; do not wire it into runtime logic or refresh it to hide history.
- **Docs and workflow are part of the release.** A behaviour change updates the matching doc and, when relevant, the changelog.

## 5. Known issues

- Vertex dragging is implemented for A (angle) and C (size); B is the fixed right-angle anchor, which is deliberate. Keyboard users change the same values through sliders.
- At 0° and 90° the reciprocal canvas intentionally draws a "degenerate" message instead of a zero-area triangle.
- Thai copy is longer than English; very narrow screens wrap buttons and tabs rather than truncate.
- `localStorage` on `file://` is per-browser-profile and can behave differently from an HTTP origin.
- No cross-browser automation ships with the repo; Safari and Firefox are expected to work but are not formally verified.

## 6. Continuity

Deployed at <https://somphol.github.io/khan-trig-unit1-right-triangle-studio/>, served by GitHub Pages from `main` / repository root. The local working copy is `~/Projects/khan-trig-unit1-right-triangle-studio`. Release tags follow SemVer; see [docs/RELEASE.md](docs/RELEASE.md) before tagging. If `state.json` is stale, it describes the original build, not the current commit; add a new record instead of rewriting history.
