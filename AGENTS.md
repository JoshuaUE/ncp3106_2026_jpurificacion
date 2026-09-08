# CPE Website Agent Guide

## Project shape

- This is a hand-maintained static HTML site for a BS Computer Engineering informational portal at the University of the East.
- All nine planned pages are implemented: `index.html`, `about-cpe.html`, `cpe-ue.html`, `specializations.html`, `careers.html`, `faculty.html`, `scpes.html`, `projects.html`, and `contact.html`.
- The intended page map, completion status, and remaining QA work are documented in [PLAN.md](PLAN.md).
- Shared presentation belongs in [css/style.css](css/style.css), and progressive enhancement belongs in [js/script.js](js/script.js).

## Working conventions

- Preserve the repeated header and footer markup across pages; there is no templating or build step.
- Reuse Bootstrap 5.3.3, Bootstrap Icons, and the existing CSS variables and component classes before adding new patterns.
- Keep page-specific behavior driven by `data-*` hooks in `js/script.js` where practical.
- Maintain responsive behavior and light/dark theme support when changing shared styles or markup.
- Keep edits ASCII by default, while preserving the existing files' current encoding and intentional symbols.
- Existing HTML contains intentional Unicode symbols and emoji; preserve them when editing nearby content.

## Content and accuracy

- Treat UE program, admissions, curriculum, facilities, faculty, and organization details as information that must be verified against official UE sources before presenting it as factual.
- Do not invent faculty, project, or official institutional data. Clearly label illustrative or student-created content.
- Update navigation and footer links consistently whenever a planned page is added or renamed.
- The current program descriptions are orientation material and often marked typical or illustrative; retain that qualification until official UE sources verify details.

## Preview and validation

- There is no package manager, build tool, test runner, or repository-defined command.
- For a basic preview, open `index.html` directly in a browser.
- For reliable relative links, run `py -m http.server` from the project root and visit `http://localhost:8000/`.
- Check changed pages at narrow and wide widths, and verify external Bootstrap and Google Fonts dependencies are available when testing visually.

## Current implementation notes

- `js/script.js` currently provides footer-year updates, persisted theme switching, and scroll-to-top behavior on the implemented pages.
- Its filtering, live career search, contact validation, project modal, theme persistence, and scroll-to-top branches are connected to the completed page markup.
- `assets/` contains `cpe logo.png`, `mamlim.jpg`, `sir ej.jpg`, and `sironofre.jpg`; `images/` is empty. Check provenance and suitability before using any additional asset.
- Complete responsive QA across all nine pages and preserve verification notices for illustrative faculty, SCPES, and project content.
- Headers and footers are manually repeated across pages. Copy a current canonical version carefully and update all navigation and footer links when adding a page.
