# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static single-page bionote template — Joshua Purificacion's personal page. No frameworks, no runtime dependencies, no tests, no linter, no build step. All page behavior is native HTML/CSS (scroll-snap, `:target`, `:has()`, scroll-driven animations). Deploys directly from the repo root (GitHub Pages: deploy from branch root).

## Commands

- Preview locally: serve the project root with `python -m http.server 8000` (or any static server) and open `http://localhost:8000/`. No server or JS is required to render.
- No typecheck, lint, build, or test commands exist. Verification is a manual browser check (wheel + arrow keys + nav dots + all 7 sections + the Interests hover/keyboard preview).

`.claude/settings.local.json` allowlists `npm run *`, `node *`, and `npm ls *`. Other shell commands will prompt.

## High-level architecture

### Page structure (`index.html`)
- Single `<body>` containing an atmospheric background (`div.background` with `.bg-grid` + `.bg-glow`), a `<header class="site-nav">` with brand + 3 anchor links, and a `<main>` that holds **exactly 7 `<section class="section">` blocks**: `#hero`, `#about`, `#capabilities`, `#projects`, `#personality`, `#interests`, `#connect`.
- A fixed progress rail (`aside.progress-nav`) with 7 `<a class="progress-dot" href="#...">` anchor links lives at the bottom of the page. Dot count is hand-maintained to match the 7 sections.
- `<link rel="stylesheet" href="css/main.css">` is the only stylesheet link. There is no `<script>` tag.

### Scrolling — native, not JS
- `html` (css/base.css) is the scroll container: `overflow-y: scroll`, `scroll-behavior: smooth`, `scroll-snap-type: y mandatory`.
- Each `.section` (css/components.css) is `height: 100svh`, `scroll-snap-align: start`, `scroll-snap-stop: always` — one viewport per scroll-stop. `main` has no transform.
- Navigation (site nav, hero circle-link, progress dots) is plain `href="#..."` anchors — the browser scrolls and snaps, no listeners.
- The active progress dot is lit by `body:has(#id:target)` (css/components.css). `:target` only tracks the URL hash, so the dot lights up after an anchor **click** — NOT while free-scrolling. That limitation is accepted; don't add JS to track scroll position.

### Reveal animations (css/components.css)
- `.animate-in` elements are pre-hidden (`opacity: 0; translateY(30px)`); per-element `--delay` (inline in `index.html`) staggers the cascade on the fallback path.
- **Modern path** — `@supports (animation-timeline: view())`: elements reveal via `animation: reveal-up ... both; animation-timeline: view(); animation-range: entry 0% entry 60%`. Fires on wheel, arrow keys, and (smooth) anchor jumps alike.
- **Fallback** (no scroll-driven animations): `:target .animate-in` reveals the hash-targeted section; `.hero .animate-in` reveals the landing section on first paint.
- There is no JS, so there is no "black screen if main.js fails" failure mode anymore.

### Stylesheet layering (`css/main.css`)
`main.css` is a pure `@import` aggregator — it imports in this order, and the order matters:
1. `variables.css` — design tokens (colors, fonts, z-index, spacing). Edit here for theme changes.
2. `base.css` — reset, native scroll + snap setup, background, `main` (no transform).
3. `components.css` — shared component styles (cards, buttons, progress dots), `.animate-in` reveal system.
4. `sections/*.css` — one file per section (`hero.css`, `about.css`, `capabilities.css`, `projects.css`, `personality.css`, `interests.css`, `connect.css`). `hero.css` is the largest because it owns the name treatment + glows.
5. `animations.css` — keyframes (background float etc.).
6. `responsive.css` — breakpoints; loaded last so it can override.

If you add or rename a section's CSS file, update `css/main.css` to match.

### Interests section (css/sections/interests.css)
- The 4 rows are `<details name="interests">` — a native exclusive-open accordion on mobile.
- Desktop: each row's `.preview-slot` is `position: absolute` inside `.interest-stage`, only the hovered/focused row's slot is visible (`.interest-item:has(.interest-row:hover) .preview-slot`), sibling rows dim via `:has()`.
- **Gotcha**: the `.preview-slot` is INSIDE `.interest-panel` (the accordion wrapper). Do not set `.interest-panel { display: none }` on desktop — that hides the floating preview with it. The desktop override neutralizes the accordion (`display: block; overflow: visible`) instead.
- Mobile: `.preview-slot` becomes `position: static` and the open panel shows it inline; the section grows to `height: auto` so opened panels don't clip.

## Editing rules of thumb

- **The repo root is the deploy unit** — there is no `dist/` and no build step. Edit files directly; they ship as-is.
- Adding/removing a section = update the `<section class="section">` itself **and** the 7 `.progress-dot` links in `index.html`. (A `body:has(#id:target)` rule in `components.css` also matches each section by id.)
- The CSS `@import` chain in `main.css` is ordered on purpose (variables → base → components → sections → animations → responsive). Reordering will break specificity/override assumptions.
- Scroll case (css/sections/projects.css, interests) deliberately relaxes `height: 100svh` to `height: auto; min-height: 100svh` so content-heavy sections can outgrow the viewport while keeping their snap point.

## File layout at a glance

```
index.html              ← single page, all content + structure
css/main.css            ← @import aggregator
css/variables.css       ← design tokens
css/base.css            ← reset + native scroll/snap stage
css/components.css      ← shared components, reveal system, progress dots
css/animations.css      ← keyframes
css/responsive.css      ← breakpoints (loaded last)
css/sections/*.css      ← one file per section
assets/                 ← images + PNG fallback initials
js/main.js              ← Interests hover preview + nav sync + cursor orb + parallax + personality quiz
package.json            ← metadata only, no scripts
AGENTS.md               ← sibling notes (commands, gotchas)
README.txt              ← user-facing customization instructions
```

## Dead code rationale

- `css/style.css` and `build.js` are gone: `main.css` links only the modular sheets, and there is no build (GitHub Pages serves the root).
- The transform-driven "stage" JS was replaced by native scroll-snap for the page itself. The current page interactions are `:target`, `:has()`, and `animation-timeline`. The remaining JS (`js/main.js`) powers the Interests hover preview, progress dot/nav sync, cursor orb, background parallax, and the Personality quiz — all independent of the page's scroll/snap system.