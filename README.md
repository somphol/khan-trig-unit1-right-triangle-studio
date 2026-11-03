# Khan Trig Companion · Unit 1 Right Triangle Studio

An interactive, bilingual companion for **Khan Academy Trigonometry, Unit 1: Right Triangles & Trigonometry**. Instead of reading equations, students drag vertices, scale triangles, flip reciprocal ratios, and drill generated problems — all in one offline HTML page with zero dependencies.

![Screenshot of the SOH-CAH-TOA module](assets/hero.jpg)

## The four studios

| # | Module | What it teaches |
|---|--------|-----------------|
| 01 | **SOH-CAH-TOA & Ratio Constancy** | Draggable right triangle, angle and scale sliders, live 4-decimal ratios. Scaling proves the ratios depend only on θ. |
| 02 | **Special Right Triangles** | 45°-45°-90° and 30°-60°-90° with exact radical labels (`x`, `x√2`, `x√3`, `2x`) and decimal values side by side. |
| 03 | **Reciprocal Ratios & Duality** | sin ↔ csc, cos ↔ sec, tan ↔ cot cards with undefined-state warnings at 0° and 90°. |
| 04 | **Khan Practice Sandbox** | Ratio, missing-side and real-world story problems; streak, mastery bar, badges, and animated step-by-step solutions. |

## Features

- **Semantic colour system** — hypotenuse cyan, opposite coral, adjacent emerald, angle yellow, reused in every module.
- **Bilingual HUD (EN ⇄ TH)** — every label, instruction, formula title and story problem switches language, including Thai maths terminology (ด้านตรงข้ามมุมฉาก, ด้านข้าม, ด้านชิด).
- **Live LaTeX-style fractions** — stacked fractions with tabular figures, updated on every input.
- **Canvas geometry** — HiDPI-aware rendering, vertex dragging, angle arcs, right-angle marks and responsive resizing.
- **Progress persistence** — streak, best streak, correct counts, completed modules and settings are saved to `localStorage` and restored on reload.
- **Export** — `💾 Export Progress JSON` downloads `khan_trig_unit1_progress.json`.
- **Accessibility** — labelled controls, keyboard-navigable tabs, visible focus rings, ARIA live feedback, reduced-motion support. Sliders provide a non-pointer alternative to dragging.
- **Offline and static** — no frameworks, no CDN, no fonts to download, no network requests at runtime.

## Run locally

No install and no build step.

```bash
git clone https://github.com/somphol/khan-trig-unit1-right-triangle-studio.git
cd khan-trig-unit1-right-triangle-studio
python3 -m http.server 8080
```

Open <http://localhost:8080>. Opening `index.html` directly from Finder also works; the app only needs `file://` access to its two local assets.

## Deploy

The repository is a plain static site. GitHub Pages serves it from `main` / root:

**<https://somphol.github.io/khan-trig-unit1-right-triangle-studio/>**

Any static host (Netlify, Cloudflare Pages, S3) works the same way — upload the repository root.

## Project structure

```
index.html   Markup for the HUD, four panels and all bilingual hooks
style.css    Palette, layout, responsive rules, sliders, fractions, animations
script.js    State, i18n, canvas engines, problem generator, export
state.json   Build record: elapsed time, token usage, credits
AGENTS.md    Operating notes for the next developer or agent
```

There are no generated assets and no dependencies. `assets/hero.jpg` is documentation only.

## Data and privacy

Everything stays in the browser. The only storage is `localStorage["khanTrigUnit1.v1"]` (language, settings, streak, badge list). The export button creates a local Blob; nothing is uploaded. Clearing site data resets the studio.

## Credits

Built in a single session with **[OpenCode](https://opencode.ai)** running **DeepSeek V4.1 Flash** (`opencode-go/deepseek-v4.1-flash`). Exact elapsed time and token consumption are recorded in [`state.json`](state.json).

## Licence

MIT — see [LICENSE](LICENSE).
