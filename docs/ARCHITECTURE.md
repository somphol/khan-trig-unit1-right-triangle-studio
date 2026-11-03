# Architecture

## Runtime topology

```
index.html
  ├── style.css                  presentation only
  └── script.js                  one IIFE, no modules, no imports
        ├── I18N { en, th }      all UI copy
        ├── state                localStorage-backed model
        ├── canvas stages        ratio / special / reciprocal
        ├── practice engine      generators + step builders
        └── HUD, tabs, export
```

There is no server, build step, package manager or network call. GitHub Pages
serves the repository root as static files.

## Files

| File | Responsibility |
| ---- | -------------- |
| `index.html` | Semantic markup for the HUD, four panels, canvases and bilingual hooks |
| `style.css` | Semantic palette, layout, responsive breakpoints, slider and fraction styling |
| `script.js` | State, i18n, geometry, drawing, drag, problem generation, persistence, export |
| `scripts/check.mjs` | Dependency-free static release checks used by CI |
| `state.json` | Historical build record; never read at runtime |

## Boot sequence

`script.js` runs at the end of `<body>`, so every element already exists.

1. `loadState()` reads `localStorage["khanTrigUnit1.v1"]`, deep-merges it over
   `DEFAULT_STATE`, then sanitises language, module and numeric ranges.
2. `makeStage(canvas, draw)` attaches a `ResizeObserver`, clamps DPR to 2 and
   requests the first draw.
3. `init()` applies saved values to sliders and radios, syncs badges, calls
   `applyI18n()`, renders readouts, shows the last module, and generates the
   first practice problem.
4. Hidden panels are zero-sized; `showModule()` calls `stage.resize()` inside
   `requestAnimationFrame` when a tab becomes visible.

## State model

```json
{
  "version": 1,
  "lang": "en",
  "lastModule": "ratio",
  "ratio":      { "theta": 30, "scale": 1 },
  "special":    { "type": "45", "x": 8 },
  "reciprocal": { "theta": 35 },
  "practice": {
    "mode": "ratio",
    "correct": 0,
    "attempts": 0,
    "streak": 0,
    "best": 0,
    "byMode": { "ratio": 0, "side": 0, "story": 0 },
    "badges": []
  },
  "completed": { "ratio": false, "special": false, "reciprocal": false, "practice": false },
  "updatedAt": null
}
```

Writes are debounced by 250 ms during slider drags and flushed on
`beforeunload`, `visibilitychange`, tab switches and grading. Storage failure is
swallowed so the app still works in private mode.

## Canvas contract

Every stage exposes logical CSS pixels, not device pixels:

```js
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width  = Math.round(rect.width  * dpr);
canvas.height = Math.round(rect.height * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

Draw functions read `stage.w` / `stage.h` and must return early when either is
zero. Shared helpers: `drawGrid`, `neonLine`, `rightAngleMark`,
`drawAngleArc`, `chip`, `vertex`.

## Geometry

All geometry derives from state, never from stored pixels.

### Module 1 — ratio constancy

```
unit = min(w, h) * 0.82 * scale / 2.5
Lb   = cos(θ) * unit          // adjacent, horizontal
La   = sin(θ) * unit          // opposite, vertical

A = ((w + Lb) / 2, (h - La) / 2)   // top
B = ((w + Lb) / 2, (h + La) / 2)   // right angle
C = ((w - Lb) / 2, (h + La) / 2)   // angle θ
```

The triangle is centred as a bounding box, so pointer drag maps directly and
stably:

- Drag A upward: `La = h - 2y`, then `θ = asin(La / unit)`.
- Drag C leftward: `Lb = w - 2x`, then `θ = acos(Lb / unit)`.

Both are clamped to 5°–85° and quantised to the 0.5° slider step.

Side lengths shown to students use `c = 8 × scale`, `a = c sin θ`,
`b = c cos θ`; the ratio rows divide those displayed numbers, so the arithmetic
on screen is internally consistent to four decimals.

### Module 2 — special triangles

Leg pixel lengths are fitted to the available box and the triangle is centred.
The 45° case is square; the 30°-60°-90° case uses a `1 : √3` leg ratio. Labels
come from the current `x`, with `1√2`/`1√3` simplified to `√2`/`√3`.

### Module 3 — reciprocal inspector

Hypotenuse is normalised to 1, so `opp = sin θ`, `adj = cos θ`, and the numbers
under the canvas match the cards. At exactly 0° or 90° the canvas draws a
degenerate-state message instead of a zero-area triangle.

## Internationalisation

- Static markup uses `data-i18n`, `data-i18n-placeholder` or `data-i18n-title`.
- Dynamic copy uses `t('key')`; context-sensitive sentences use
  `L(english, thai)`.
- `applyI18n()` re-applies static text, then re-renders special-triangle tables,
  current problem text, progress and all canvases.
- `scripts/check.mjs` asserts that `en` and `th` have identical key sets and that
  every referenced key exists.

## Practice engine

Problem objects are plain data:

```js
{ mode: 'ratio', a, b, c, ratio: 'sin', answer }
{ mode: 'side', theta, known, value, find, answer }
{ mode: 'story', template, theta, value, known, find, answer }
```

`problemPrompt`, `problemQuestionHtml`, `problemSteps` and `answerText` are pure
functions of that object, which is why switching language can rebuild the
current problem without generating a new one. Step lists return HTML strings
built only from internal numbers and dictionary text.

Answer parsing accepts decimals and fractions (`3/5`). Tolerance is `0.001` for
ratios and `0.02` for two-decimal side/height answers.

Badges are declarative: `{ id, icon, key, test(progress) }`. `syncBadges()`
unions all currently true tests into `state.practice.badges` and returns newly
earned ids for the toast.

## Extension recipes

**New module**

1. Add a tab button and a `<section class="panel">` with `role="tabpanel"`.
2. Add state fields to `DEFAULT_STATE` and sanitise them in `init()`.
3. Create a draw function and `makeStage(canvas, draw)`.
4. Add i18n keys to both dictionaries.
5. Register the panel in `showModule()` and mark completion via `completeModule`.
6. Extend `docs/TESTING.md` and `scripts/check.mjs` if new invariants matter.

**New problem type**

1. Add a generator returning a plain-data problem object.
2. Add prompt, question, answer and step builders.
3. Wire the mode into `newProblem()` and `problemSteps()`.
4. Add a mode button and translation keys.

## Invariants

- No dependencies, CDNs, remote fonts, analytics or runtime `fetch`.
- Semantic colours: `#00e5ff` hyp, `#ff5722` opp, `#00e676` adj, `#ffd600` angle.
- Four-decimal ratio display; two-decimal lengths.
- `state.json` is documentation, not application state.
