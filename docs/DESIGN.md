# Design notes

## Curriculum alignment

The studio follows Khan Academy Trigonometry **Unit 1: Right Triangles &
Trigonometry**. It is a companion for manipulation and recall, not a replacement
for instruction or a graded course.

| Module | Concept | Learning objective |
| ------ | ------- | ------------------ |
| 01 | SOH-CAH-TOA, similarity | Ratios depend only on θ, not on triangle size |
| 02 | 45°-45°-90°, 30°-60°-90° | Recall exact side relationships without a calculator |
| 03 | csc, sec, cot | Reciprocals are flipped fractions on the same triangle |
| 04 | Application and retrieval | Select and apply the right ratio, then check the result |

## Dual-coding system

Every side keeps one colour across canvas, legend, readouts, formulas and
badges. Students should be able to say "the cyan side" and mean the hypotenuse
in all four modules.

| Element | Colour | Hex |
| ------- | ------ | --- |
| Hypotenuse `c` | Neon cyan | `#00E5FF` |
| Opposite `a` | Vivid coral | `#FF5722` |
| Adjacent `b` | Electric emerald | `#00E676` |
| Angle `θ` | Golden yellow | `#FFD600` |

Colour is never the only carrier of meaning: every value also has a text label,
and every diagram has a numeric alternative in the DOM.

## Typography and formulas

- UI text: system sans stack, including Thai fallbacks (`Thonburi`,
  `Noto Sans Thai`, `Sukhumvit Set`). No web fonts, so first paint is immediate
  and the site works offline.
- Mathematics: a serif stack (`Iowan Old Style`, Palatino, Georgia) with
  stacked fractions built from flex columns and a hairline rule.
- Numbers use tabular figures so digits do not jitter while sliders move.
- Ratios are shown in three forms in module 1: symbolic fraction, substituted
  fraction, and decimal.

## Interaction decisions

- **Drag plus sliders.** Dragging teaches directly; sliders provide precision,
  keyboard access and a screen-reader-friendly fallback.
- **Scale is honest.** 0.5× is one fifth of 2.5× on screen. The side lengths and
  visual size change together, which is the point: ratios do not.
- **A constancy badge, not a modal.** Scaling briefly surfaces
  "Triangle size changed, but ratios remain 100% CONSTANT!" without blocking
  exploration.
- **Special triangles use exact labels first.** `x√2` is the headline; the
  decimal is secondary. This protects the pedagogical goal.
- **Undefined states are teachable.** At 0° and 90° module 3 explains which side
  collapsed instead of silently hiding the diagram.
- **Immediate, low-stakes feedback.** Wrong answers do not reveal the solution
  automatically; the step-by-step panel is opt-in so retrieval comes first.
- **Mastery is visible but bounded.** The bar tops out at 20 correct answers,
  which is achievable in one sitting.

## Thai terminology

| English | Thai | Note |
| ------- | ---- | ---- |
| Sine (sin) | ไซน์ (sin) | Keep the Latin function name in formulas |
| Cosine (cos) | โคไซน์ (cos) | |
| Tangent (tan) | แทนเจนต์ (tan) | |
| Hypotenuse | ด้านตรงข้ามมุมฉาก | Literal: side opposite the right angle |
| Opposite | ด้านข้าม | Side opposite θ |
| Adjacent | ด้านชิด | Side next to θ |
| Angle | มุม | |
| Undefined | ไม่นิยาม | Used for 0°/90° states |
| Round to 2 decimal places | ทศนิยม 2 ตำแหน่ง | On practice prompts |

Keep this glossary stable. Consistency matters more than literary elegance in a
classroom.

## Accessibility and universal design

- Multiple representations: visual, symbolic, numeric and verbal.
- Keyboard path for every control; tabs follow the WAI-ARIA tab pattern.
- Feedback announced through `role="status"` / `aria-live="polite"`.
- Motion reduced when the operating system asks for it.
- Touch targets sized for phones; the layout reflows to one or two columns.
- See [ACCESSIBILITY.md](ACCESSIBILITY.md) for the full statement and gaps.

## Non-goals

- Accounts, cloud sync, leaderboards or teacher dashboards.
- Adaptive difficulty or machine-learned problem selection.
- Replacing a textbook, teacher or formal assessment.
- Visual spectacle at the cost of mathematical clarity.
