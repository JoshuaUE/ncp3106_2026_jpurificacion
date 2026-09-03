# CPE Website Agent Guide

## Project shape

- This is a hand-maintained static HTML site for a BS Computer Engineering informational portal at the University of the East.
- Pages currently implemented are `index.html`, `about-cpe.html`, and `cpe-ue.html`.
- The intended page map and content plan are documented in [PLAN.md](PLAN.md); several planned links currently point to pages that do not exist yet.
- Shared presentation belongs in [css/style.css](css/style.css), and progressive enhancement belongs in [js/script.js](js/script.js).

## Working conventions

- Preserve the repeated header and footer markup across pages; there is no templating or build step.
- Reuse Bootstrap 5.3.3, Bootstrap Icons, and the existing CSS variables and component classes before adding new patterns.
- Keep page-specific behavior driven by `data-*` hooks in `js/script.js` where practical.
- Maintain responsive behavior and light/dark theme support when changing shared styles or markup.
- Keep edits ASCII by default, while preserving the existing files' current encoding and intentional symbols.

## Content and accuracy

- Treat UE program, admissions, curriculum, facilities, faculty, and organization details as information that must be verified against official UE sources before presenting it as factual.
- Do not invent faculty, project, or official institutional data. Clearly label illustrative or student-created content.
- Update navigation and footer links consistently whenever a planned page is added or renamed.

## Preview and validation

- There is no package manager, build tool, test runner, or repository-defined command.
- For a basic preview, open `index.html` directly in a browser.
- For reliable relative links, run `py -m http.server` from the project root and visit `http://localhost:8000/`.
- Check changed pages at narrow and wide widths, and verify external Bootstrap and Google Fonts dependencies are available when testing visually.
