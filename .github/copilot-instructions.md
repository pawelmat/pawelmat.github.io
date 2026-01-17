<!-- Copilot / AI agent instructions for pawelmat.github.io -->

# Purpose
This repository is a static personal/portfolio website deployed as a GitHub Pages site (username.github.io). The goal of these instructions is to help AI coding agents be immediately productive editing, testing and deploying small, focused changes.

# Quick facts
- Entry point: `index2.html` 
- Main static asset folders: `assets/css/`, `assets/js/`, `assets/img/`, `assets/vendor/`.
- Vendor libraries (Bootstrap, GLightbox, Typed.js) live under `assets/vendor/` and should not be modified in-place unless explicitly requested.
- Deployment: site is published from the `main` branch (this repo is `pawelmat.github.io`). The `CNAME` file contains the custom domain.

# Developer workflow (observed)
- Primary local preview: VS Code + Live Preview plugin. Open an HTML file in the editor, click "Show Preview" and connect external browser at http://localhost:3000/.
- If external browser shows 401 errors loading vendor assets (fonts/icons), restart VS Code (observed workaround in README.md).
- There is no formal build system or package manager present. Changes are deployed by pushing to `main`.

# Editing guidance (practical rules)
- Edit unminified sources: modify `assets/css/main.css` and `assets/js/main.js` rather than `.min` files. If you update `main.css` or `main.js`, also update or regenerate the corresponding `.min` files only if asked.
- Do not alter files in `assets/vendor/` unless updating a library intentionally. Prefer adding or upgrading libraries as new subfolders under `assets/vendor/` and update references in the HTML.
- Images: add new images to `assets/img/portfolio/` or `assets/img/profile/` and reference them with relative paths in HTML.
- Keep the `CNAME` and copyright notices intact unless the site owner requests changes.

# Patterns & examples
- Typical CSS change: edit `assets/css/main.css` and verify appearance in Live Preview (index.html). Example: change a selector in `main.css` rather than editing `main.min.css`.
- Adding a library: create `assets/vendor/<lib>/` with CSS/JS; update `<link>`/`<script>` in `index.html` or `index2.html` to point to the new files.
- Entry-point selection: when asked to modify page content, check which file the user is editing (`index.html` vs `index2.html`) before making changes.

# Safety & repo conventions
- Keep commits small and focused (single feature/fix). Provide a brief PR/commit message describing the intent and file changes.
- Do not introduce build/tooling files (e.g., package.json) unless the user requests a new toolchain.

# Where to look first
- [README.md](README.md) — project notes and Live Preview guidance.
- `index.html` and `index2.html` — primary page markup.
- `assets/css/main.css` and `assets/js/main.js` — project-level styles and scripts.
- `assets/vendor/` — third-party libraries and assets.

# When you need clarification
- If a requested change affects deployment or domain (CNAME), confirm before modifying `CNAME` or `main` branch. CNAME should not be changed.
