# AGENTS.md

Static single-page bionote template. **No JavaScript for the page itself** — native scroll-snap + pure CSS interactions handle scrolling, navigation, reveals, and the Interests hover preview. The repo root deploys directly (GitHub Pages).

## Commands

- Preview: `python -m http.server 8000` in project root, then open `http://localhost:8000/`. The page is fully static — no server or JS is required for it to render.

## Architecture

- **Scrolling is native** (css/base.css): `html` has `overflow-y: scroll`, `scroll-behavior: smooth`, `scroll-snap-type: y mandatory`. Each `.section` (css/components.css) is `height: 100svh` with `scroll-snap-align: start` + `scroll-snap-stop: always` — one full viewport per scroll-stop. Sections move via the browser, not `transform`.
- **No `<script>` tag is required for the page itself**. The page renders and is fully interactive without any JavaScript.
- **Reveal animations** (css/components.css `@keyframes reveal-up`): `.animate-in` elements are pre-hidden at `opacity: 0` and revealed by a scroll-driven animation — `animation-timeline: view()` with `animation-range: entry 0% entry 60%` inside `@supports`. This fires on wheel, arrow keys, and anchor jumps alike. **Fallback** (no scroll-driven animations): `:target .animate-in` reveals the hash-targeted section; `.hero .animate-in` reveals on first paint.
- **Navigation is native anchors**: `href="#about"` etc. scroll directly (smooth + snapped). Progress dots at the bottom are 7 `<a class="progress-dot">` links; the active dot is styled via `body:has(#id:target)` — it lights up after an anchor click, not while free-scrolling (no JS tracks scroll position; don't "fix" this).
- **Exactly 7 `<section class="section">` blocks** exist. Adding/removing one requires updating the 7 `.progress-dot` links in `index.html` to match.
- `index.html` links `css/main.css`, which `@import`s the modular sheets (`variables`, `base`, `components`, `sections/*`, `animations`, `responsive`). If you split a sheet further, update `main.css`; the import order matters (variables → base → components → sections → animations → responsive).

## Content & images

- `assets/*.png` are placeholder fallbacks: each `img` has an `onerror` that hides it, leaving the initials/gradient treatment visible. Replace with your own images in `assets/` and update the `src`/`alt` in `index.html` (three projects + profile + hero).
- Sample text lives entirely in `index.html` (no templating). Social links in the Connect section are intentional real URLs; the Interests section uses `<details name="interests">` (native exclusive-open accordion on mobile, `:has()`-driven floating preview on desktop).
- The Interests floating preview: each row's `<details>` carries its own `.preview-slot` (position: absolute inside `.interest-stage` on desktop, inline inside the open panel on mobile). **Do not** set `.interest-panel { display: none }` on desktop — the preview slot lives inside it and would be hidden too (see css/sections/interests.css).

## Deployment

- Deploy the repo root directly (GitHub Pages: deploy from branch root). There is no build step — edit source files, commit, push.