# Support

## Before you ask

Most questions are answered in the docs:

| Question | Read |
| -------- | ---- |
| How do I run or deploy it? | [README](README.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| How is the app built? | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Why does the triangle behave that way? | [docs/DESIGN.md](docs/DESIGN.md) |
| How do I verify a change? | [docs/TESTING.md](docs/TESTING.md) |
| What accessibility support exists? | [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) |
| How do I contribute? | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Where is progress stored? | [README § Data and privacy](README.md#data-and-privacy) |

## Common fixes

- **Progress disappeared.** Data is per browser profile and per origin. Private
  windows, clearing site data and switching between `file://` and `http://`
  origins each start fresh.
- **The canvas looks empty.** The selected panel was hidden when the window
  resized; switch tabs once or reload. Please report it if it persists.
- **Thai text wraps awkwardly.** Narrow screens wrap rather than truncate. Send
  a screenshot and viewport width if it hurts usability.
- **Export does nothing.** Some browsers block multiple downloads or require a
  user gesture; try again from the button and check the download shelf.

## Opening an issue

Use the bug report or feature request template. Include module, steps, expected
and actual behaviour, browser/OS, interface language, and console output.

Security issues must follow [SECURITY.md](SECURITY.md), not the public tracker.

## Scope and expectations

Maintenance is best effort by a single volunteer. There is no guaranteed
response time, SLA, or support for modified forks. Well-scoped reports with
reproduction steps are prioritised.
