# Agent context: Citadel Universe website

This file gives AI agents (e.g. GitHub Copilot, Cursor) quick project context. For full rules, Bootstrap usage, and troubleshooting, see [.github/copilot-agent-instructions.md](.github/copilot-agent-instructions.md).

## What this repo is

**Citadel Universe** is a static website about the 1995 Amiga game "Citadel" and its universe (story, versions, extras, playable browser game). It is the official focal point for game information, news, downloads, and community links. Deployed via **GitHub Pages** (custom domain in `CNAME`). Audience: fans, players, and visitors interested in the game and its lore.

## Tech stack

- **HTML5, CSS3, JavaScript** — no build step or package manager.
- **Bootstrap 5.3.8** — layout and components; dark theme (Craftivo-style template).
- **Entry point:** [index.html](index.html).
- **Shared header/footer:** All main pages load a common header and footer from [header.html](header.html) via [assets/js/hfloader.js](assets/js/hfloader.js). The body is hidden until the header/footer are injected.

## Structure (high level)

| Location | Purpose |
|----------|---------|
| **Root** | Main HTML pages: `index.html`, `story.html`, `gallery.html`, `maps.html`, `play.html`, `extras.html`, `versions.html`, `newsarchive.html`, `terms.html`; `header.html`; `CNAME`, `sitemap.xml`, `robots.txt`, `site.webmanifest`. |
| **assets/** | `css/main.css` (edit this), `js/main.js`, `js/hfloader.js`, `img/`, `vendor/` (Bootstrap, GLightbox, Typed.js — **do not modify**). |
| **game/** | **Out of scope.** WebGL game; do not analyze or change. |
| **files/** | Static downloads (originals, remonstered builds). |

## Edit vs do not touch

**Edit:**
- Root HTML files (content and structure).
- [assets/css/main.css](assets/css/main.css) — styling.
- [assets/js/main.js](assets/js/main.js) — site behaviour.

**Do not modify** (unless explicitly requested):
- `assets/vendor/` — third-party libraries.
- `CNAME` — custom domain configuration.
- `game/` — WebGL game directory.
- `.min.css` and `.min.js` — only regenerate from source when asked.

## Key patterns

- **Bootstrap first** — use existing Bootstrap components and utilities before adding custom code.
- **Template styles** — section/nav patterns and dark theme are in `main.css` (CSS variables for colors, fonts).
- **Local preview** — e.g. VS Code Live Preview; use `127.0.0.1` (not `localhost`) to avoid 401s on fonts/icons.

## Bootstrap documentation & examples

- **Documentation:** [Bootstrap 5.3 introduction](https://getbootstrap.com/docs/5.3/getting-started/introduction/). Most important sections: Layout, Components, Content, and Customize.
- **Examples:** [Bootstrap 5.3 examples](https://getbootstrap.com/docs/5.3/examples/).
- For component and layout patterns, also look at the existing HTML files in the root folder and the CSS/JS they use; they show how Bootstrap is used with this template’s styling.

## Where to go deeper

- **[.github/copilot-agent-instructions.md](.github/copilot-agent-instructions.md)** — full rules, Bootstrap usage, section/nav patterns, theme variables, troubleshooting, and best practices.
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — short Copilot workflow and editing rules.
