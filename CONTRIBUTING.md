# Contributing

Thanks for taking an interest in the studio. This is a small, dependency-free teaching project: the best contributions are focused, tested, and easy to review.

## Ground rules

1. **Stay static and offline.** No frameworks, CDNs, web fonts, analytics, remote images or runtime network calls. The app must keep working from `file://`.
2. **Keep the colour contract.** Cyan = hypotenuse, coral = opposite, emerald = adjacent, yellow = angle. This mapping is pedagogical, not decorative.
3. **Translate both languages.** Every user-facing string needs an English and a Thai entry. `scripts/check.mjs` fails when the dictionaries diverge.
4. **Preserve numerical honesty.** Ratios are computed from the drawn side lengths and displayed to four decimals. Do not replace them with pre-rounded constants.
5. **Accessibility is part of the feature.** Labelled inputs, keyboard access, visible focus and reduced-motion support are required, not optional.
6. **Small, legible diffs.** Touch the files the change needs and keep unrelated formatting out.

## Local setup

There is nothing to install.

```bash
git clone https://github.com/somphol/khan-trig-unit1-right-triangle-studio.git
cd khan-trig-unit1-right-triangle-studio
python3 -m http.server 8080
```

Open <http://localhost:8080>. Node 20+ is only needed for the static checks.

## Before opening a pull request

```bash
node --check script.js
node scripts/check.mjs
```

Then run the manual checks in [docs/TESTING.md](docs/TESTING.md) that match your change — at minimum desktop, 390 px mobile, and both languages.

## Commit messages

Use an imperative subject under ~72 characters, optionally scoped:

```
fix(practice): keep the streak after a fraction answer
docs(architecture): document the drag mapping
feat(special): label the long leg with x√3
```

Explain the learner-facing reason in the body when it is not obvious.

## Pull requests

Use the template. A good PR states the learner problem, the change, the modules touched, and the verification performed. Screenshots are expected for visual changes.

## Adding a module or problem type

- Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the state, canvas and i18n patterns.
- Add the panel, tab, translator keys and geometry in the existing style.
- Extend the manual test matrix in [docs/TESTING.md](docs/TESTING.md).
- Keep the four-colour semantics and the 4-decimal ratio convention.

## Translation notes

The Thai glossary (hypotenuse → ด้านตรงข้ามมุมฉาก, opposite → ด้านข้าม, adjacent → ด้านชิด) lives in [docs/DESIGN.md](docs/DESIGN.md). Keep mathematical terms consistent with it and prefer clear classroom language over literal translation.

## Reporting bugs and security issues

- Bugs and ideas: use the issue templates.
- Security: follow [SECURITY.md](SECURITY.md); never open a public issue with exploit details.
- Conduct concerns: follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
