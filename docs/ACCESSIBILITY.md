# Accessibility

## Target

The studio aims to meet **WCAG 2.2 Level AA** for the interface it controls. It
is a self-assessment, not a third-party certification. Canvas-only content is
the main area where judgement is required; the equivalent values always exist in
the DOM.

## What is implemented

### Structure and semantics

- One `<h1>`, one `<h2>` per panel, landmark elements (`header`, `nav`, `main`,
  `footer`).
- Tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`,
  roving `tabindex`, and Left/Right/Home/End keys.
- Panels use `role="tabpanel"` and are hidden when inactive.
- Form controls have visible `<label>` elements or `aria-label`s.

### Keyboard and focus

- Every slider, radio, button and input is reachable by Tab.
- Arrow keys adjust sliders; radios use native arrow-key behaviour.
- Visible focus rings on buttons, inputs, sliders and tabs.
- The practice form submits with Enter.
- Canvas dragging is optional: the angle and scale sliders provide the same
  state changes for keyboard users.

### Screen readers and live feedback

- Canvases expose `role="img"` with descriptive `aria-label`s.
- Side lengths, ratios, exact values and reciprocal values are real text, not
  painted pixels.
- Answer feedback uses `role="status"` and `aria-live="polite"`.
- The scale-constancy badge and badge-unlock toast announce politely.
- Decorative SVGs and emoji are marked `aria-hidden`.

### Visual

- Text and controls use high-contrast light-on-dark colours.
- Colour is never the sole cue: sides carry `a`, `b`, `c`, `opp`, `adj`, `hyp`
  labels in addition to their colours.
- Layout reflows at 1080 px, 760 px and 420 px without horizontal scrolling.
- Text remains usable at 200% zoom on a 1440 px viewport.

### Motion and touch

- `prefers-reduced-motion: reduce` collapses animations and transitions.
- Canvas uses `touch-action: none` only where dragging is intentional.
- Buttons and sliders are sized for touch; the mobile layout stacks cards.

## Known limitations

1. **Canvas vertices are pointer-only.** Keyboard users change the same angles
   and sizes through sliders, but cannot focus an individual vertex. A
   keyboard-operable vertex model is on the roadmap.
2. **Canvas text is not exposed as a text tree.** All numerical content is
   mirrored in the DOM, but decorative geometry (arcs, right-angle marks) is not
   described line by line.
3. **No high-contrast theme.** The dark palette targets AA contrast, but there is
   no light or forced-colours stylesheet yet.
4. **Thai screen-reader pronunciation** depends on the installed Thai voice and
   has not been formally tested across platforms.
5. **No formal audit.** Findings come from manual keyboard, zoom, contrast and
   VoiceOver spot checks.

## How to test

1. **Keyboard only:** unplug the mouse. Tab through the HUD, switch tabs with
   arrows, change both module-1 sliders, answer a practice question and reveal
   the steps. Focus must never disappear.
2. **Zoom:** set the browser to 200% at 1440 px and 390 px. No content should be
   clipped or force horizontal scrolling.
3. **Reduced motion:** enable the OS setting and confirm the constancy badge and
   steps appear without animation.
4. **Screen reader:** with VoiceOver (macOS) or TalkBack (Android), confirm the
   sliders announce their labels and values, and that feedback is read after
   checking an answer.
5. **Contrast:** spot-check muted text and the coral/emerald values against the
   card background.

## Reporting an accessibility problem

Open a bug report with the accessibility label, or use the feature request
template for a design change. Include the assistive technology, browser, module
and the task that failed. Accessibility fixes are prioritised.
