# AGENTS.md

## 1. What this is

A static, offline teaching app for Khan Academy Trigonometry Unit 1. One page, four interactive studios: ratio constancy, special right triangles, reciprocal ratios, and a practice sandbox. It produces no build output and talks to no server; it is not a Khan Academy clone, a course platform, or a graded assessment tool.

Live copy: <https://somphol.github.io/khan-trig-unit1-right-triangle-studio/>
Local master: `~/Projects/khan-trig-unit1-right-triangle-studio`

## 2. Commands

```bash
# run (no install, no build)
python3 -m http.server 8080
# then open http://localhost:8080

# syntax gate
node --check script.js

# deploy = push to main; GitHub Pages serves the repo root
git push origin main
```

Opening `index.html` via `file://` also works. There is no test runner in the repo; verification during development used headless Chrome over the DevTools protocol (module switching, slider maths, drag, answer checking, language switch, reload persistence, export Blob) and produced zero console errors.

## 3. Architecture

Load order is `index.html` → `style.css` → `script.js`. `script.js` is one IIFE, in this order:

1. `I18N` dictionaries (`en`, `th`) and `t()`.
2. `DEFAULT_STATE`, `loadState`/`saveState` (localStorage key `khanTrigUnit1.v1`).
3. Canvas helpers (`makeStage`, `neonLine`, `drawAngleArc`, `chip`, `vertex`).
4. Module engines: `drawRatio`, `drawSpecial`, `drawReciprocal`; each owns its geometry and DOM readout.
5. Practice generator (`genRatioProblem`, `genSideProblem`, `genStoryProblem`), step builders, badge rules.
6. Tab routing (`showModule`), i18n application (`applyI18n`), export, boot.

`style.css` is organised around the semantic palette (`--hyp`, `--opp`, `--adj`, `--theta`) and then HUD → tabs → cards → canvas → controls → module-specific → responsive. `state.json` is a historical build record, **not** runtime state.

## 4. Decisions and constraints

- **Keep the four colours semantic.** Cyan is always the hypotenuse, coral the opposite, emerald the adjacent, yellow an angle. Canvas, chips, cards and legends depend on this.
- **Ratios are computed from the drawn sides**, not printed from `Math.sin`, so the displayed division is internally consistent to 4 dp. Do not "simplify" this.
- **Geometry is derived from `θ` + `scale`**, never from stored pixel coordinates. Scale is linear and honest: 0.5× really is one fifth of 2.5× on screen. Side lengths use `c = 8 × scale`.
- **Canvas scaling:** every canvas uses a `ResizeObserver` and a DPR clamp of 2. Hidden panels resize when shown (`showModule`). If you add a canvas, follow `makeStage`.
- **i18n must stay symmetric:** every key exists in both `en` and `th`; `data-i18n*` attributes drive static text, `t()` drives dynamic text. Changing a key means changing both dictionaries.
- **Persistence is best-effort:** `localStorage` failures are swallowed so private mode still works in memory. The export filename is fixed at `khan_trig_unit1_progress.json` by requirement.
- **No dependencies and no network calls.** Do not add a framework, CDN, web font, analytics or remote image. The app must work from `file://`.
- **`state.json` is a snapshot.** It records the build session and is not written by the app; do not wire it into runtime logic.

## 5. Known issues

- Vertex dragging is implemented for A (angle) and C (size); B is the fixed right-angle anchor, which is deliberate.
- At 0° and 90° the reciprocal canvas intentionally draws a "degenerate" message instead of a zero-area triangle.
- Thai copy is longer than English; very narrow screens wrap buttons and tabs rather than truncate.
- `localStorage` on `file://` is per-browser-profile and can behave differently from an HTTP origin.
- No automated test suite ships with the repo; the headless verification was ad hoc.

## 6. Continuity

Deployed at <https://somphol.github.io/khan-trig-unit1-right-triangle-studio/>, served by GitHub Pages from `main` / repository root. The local working copy is `~/Projects/khan-trig-unit1-right-triangle-studio`. If `state.json` is stale, it describes the original build, not the current commit; add a new record instead of rewriting history.
