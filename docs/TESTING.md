# Testing

## Automated checks

```bash
node --check script.js      # syntax gate
node scripts/check.mjs      # repository, id, i18n, colour, link and state checks
```

`scripts/check.mjs` is dependency-free and runs in CI on every push and pull
request (`.github/workflows/ci.yml`). It verifies:

- required documentation and release files exist;
- JavaScript parses;
- HTML ids are unique and every `$('id')` reference resolves;
- local `src`/`href` targets exist and no runtime resource is remote;
- the English and Thai dictionaries have identical key sets;
- every `data-i18n*` and `t('…')` key exists in both languages;
- the semantic colour contract is intact;
- runtime code contains no network APIs;
- `state.json` keeps its timing, usage, credit and deployment fields;
- relative Markdown links resolve;
- the licence remains MIT.

## Browser verification performed for 1.0.0

Headless Chrome 156 on macOS, driven over the DevTools Protocol. No console
errors or uncaught exceptions were recorded.

| Area | Check | Result |
| ---- | ----- | ------ |
| Module 1 | Default 30°: sin 0.5000, cos 0.8660, tan 0.5774 | Pass |
| Module 1 | Scale 2.5×: sides change, ratios unchanged, badge appears | Pass |
| Module 1 | Drag A upward changes the angle and slider | Pass |
| Module 2 | 45° at x=8: `8`, `8`, `8√2` → 11.31 | Pass |
| Module 2 | 30° at x=12: `12`, `12√3`, `2x` → 24.00 | Pass |
| Module 3 | 35°: sin 0.5736, csc 1.7434, sec 1.2208, cot 1.4281 | Pass |
| Module 3 | 90°: tan and sec undefined, warnings shown, cot 0 | Pass |
| Module 4 | Generated ratio problem solved; streak, mastery, badge update | Pass |
| Module 4 | Step reveal produces the expected animated steps | Pass |
| Module 4 | Story and missing-side modes generate valid prompts | Pass |
| i18n | EN ⇄ TH updates static and dynamic text | Pass |
| Persistence | Reload restores language, streak, correct count, completed tabs | Pass |
| Export | Button creates an `application/json` Blob | Pass |
| Layout | 390 px viewport: no horizontal overflow | Pass |

## Manual regression matrix

Run the rows that match your change; run all of them before a release.

### Every release

- [ ] All four tabs switch, with the active tab marked and the panel visible.
- [ ] Keyboard: Tab reaches controls, arrow keys move between tabs, focus ring visible.
- [ ] 1440 px and 390 px widths have no horizontal scrollbar.
- [ ] EN and TH both render without clipped labels.
- [ ] Reload preserves streak, language and completed tabs.
- [ ] Export downloads `khan_trig_unit1_progress.json` with valid JSON.
- [ ] Browser console is clean.

### Module 1

- [ ] Angle 5°, 30°, 45°, 85° produce plausible diagrams and values.
- [ ] Scale 0.5× and 2.5× keep all three ratios identical.
- [ ] Dragging A changes θ; dragging C changes size; the triangle stays a right triangle.
- [ ] The constancy badge appears on scale change and disappears after ~3 s.

### Module 2

- [ ] 45° mode shows x, x, x√2 and the correct decimal.
- [ ] 30° mode shows x, x√3, 2x and the correct decimal.
- [ ] x = 1 uses simplified `√2` / `√3` labels.
- [ ] Canvas labels stay inside the card at both modes and x = 20.

### Module 3

- [ ] 0°, 0.5°, 45°, 89.5°, 90° all update cards and canvas.
- [ ] csc undefined at 0°; sec and tan undefined at 90°; cot = 0 at 90°.
- [ ] Warning badges appear only on the affected cards.

### Module 4

- [ ] Each mode generates a new problem; "New problem" respects the mode.
- [ ] Correct decimal and correct fraction both pass.
- [ ] Invalid text shows the input hint, not a crash.
- [ ] A wrong answer resets the streak but keeps total correct.
- [ ] After a correct answer the input disables until a new problem.
- [ ] Steps show the right numbers and toggle off/on.

## Manual browser coverage

| Browser | Status |
| ------- | ------ |
| Chrome 156 / macOS | Verified for 1.0.0 |
| Safari / iOS | Expected to work; not formally verified |
| Firefox | Expected to work; not formally verified |
| Edge | Chromium-based; expected to work |

If you verify a new browser, add it to this table and to the release notes.

## Headless method

The 1.0.0 verification used Chrome `--headless=new` with a dedicated profile and
the DevTools Protocol to:

1. navigate to the local `file://` page;
2. read and drive controls through DOM events;
3. compute answers from the rendered prompt and submit them;
4. switch language, reload, and inspect `localStorage`-backed UI;
5. capture desktop and 390 px screenshots;
6. assert zero exceptions and zero console errors.

The harness is intentionally not committed: it depends on a local Chrome path.
The static checks above are the reproducible gate.

## Known gaps

- No cross-browser automation in CI.
- Canvas pixels are not compared visually.
- Thai line-breaking is checked by eye, not by a font-metrics test.
- Screen-reader behaviour is tested manually, not in CI.
