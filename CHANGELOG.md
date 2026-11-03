# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

## [1.0.0] — 2026-11-03

### Added

- **Module 1 — SOH-CAH-TOA & Ratio Constancy.** Draggable right triangle,
  5°–85° angle slider, 0.5×–2.5× scale slider, live side lengths and four-decimal
  sine, cosine and tangent equations.
- **Module 2 — Special Right Triangles.** 45°-45°-90° and 30°-60°-90° modes with
  exact radical labels (`x`, `x√2`, `x√3`, `2x`) and decimal values.
- **Module 3 — Reciprocal Ratios & Duality.** sin ↔ csc, cos ↔ sec and tan ↔ cot
  comparison cards, live canvas, and undefined-state warnings at 0° and 90°.
- **Module 4 — Practice Sandbox.** Ratio, missing-side and real-world story
  generators; answer checking with fraction support; animated step-by-step
  solutions; streak, mastery bar and seven badges.
- **Bilingual HUD.** Full English ⇄ Thai switching, including formulas and story
  problems, with consistent Thai mathematical terminology.
- **Persistence and export.** `localStorage` progress and settings plus
  `khan_trig_unit1_progress.json` download.
- **Accessibility baseline.** Labelled controls, keyboard-navigable tabs, ARIA
  live feedback, visible focus, reduced-motion support and touch-friendly canvas.
- **Documentation and quality gates.** README, architecture, design, testing,
  deployment, accessibility and release guides; issue and PR templates; CI
  static checks.
- **Release record.** `state.json` captures build time, token usage and credits
  for OpenCode + DeepSeek V4.1 Flash.

### Security

- No runtime network requests, third-party scripts, cookies or analytics.
- Progress never leaves the visitor's browser unless they export it.

[Unreleased]: https://github.com/somphol/khan-trig-unit1-right-triangle-studio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/somphol/khan-trig-unit1-right-triangle-studio/releases/tag/v1.0.0
