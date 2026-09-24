# CPE Website Agent Guide

## Project scope

- This repository is a hand-maintained static website for a BS Computer Engineering informational portal at the University of the East.
- The site uses nine HTML pages: [index.html](index.html), [about-cpe.html](about-cpe.html), [cpe-ue.html](cpe-ue.html), [specializations.html](specializations.html), [careers.html](careers.html), [faculty.html](faculty.html), [scpes.html](scpes.html), [projects.html](projects.html), and [contact.html](contact.html).
- The intended roadmap, page status, and remaining QA notes are tracked in [PLAN.md](PLAN.md).
- Shared styling lives in [css/style.css](css/style.css), and shared behavior lives in [js/script.js](js/script.js).

## AI agent rules

- Keep changes in the static HTML/CSS/JS model; do not introduce a framework, build step, bundler, or templating system unless the repo explicitly requires it.
- Preserve the repeated header and footer markup across pages, and keep navigation links consistent when a page is added, renamed, or removed.
- Reuse Bootstrap 5.3.3, Bootstrap Icons, and the existing CSS variable/component patterns before introducing new styles or UI patterns.
- Prefer page-specific logic in [js/script.js](js/script.js) with `data-*` hooks rather than inline event wiring in individual HTML files.
- Maintain responsive behavior and light/dark theme support whenever shared styles are edited.
- Keep edits ASCII by default, while preserving intentional Unicode and emoji already used in the existing pages.

## Content and accuracy requirements

- Treat University of the East program, admissions, curriculum, facilities, faculty, and organization details as unverified unless they are backed by official UE sources.
- Do not invent faculty, project, facility, course, or institutional data. Clearly mark student-created or illustrative content.
- Keep the site’s orientation language when details are still informational or illustrative; do not present tentative content as official fact.
- Before using files in [assets](assets) or adding new imagery, verify their provenance and suitability.

## Preview and validation

- There is no package manager, build tool, or automated test suite in this repository.
- For a quick local preview, open [index.html](index.html) directly in a browser.
- For reliable relative links and browser behavior, run `py -m http.server` from the repo root and open http://localhost:8000/.
- Check edited pages at both narrow and wide widths, and confirm external Bootstrap and Google Fonts dependencies remain reachable.

## Current implementation notes

- [js/script.js](js/script.js) handles footer year updates, theme persistence, scroll-to-top behavior, career filtering, contact validation, project modal logic, and related interactivity.
- The site is intentionally hand-maintained and should remain easy to review in raw HTML files without a build step.
- Preserve verification notices for illustrative faculty, SCPES, and project content until official UE sources are confirmed.
