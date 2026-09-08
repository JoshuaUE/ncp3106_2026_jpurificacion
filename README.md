# BS Computer Engineering at UE

A responsive informational website for the Bachelor of Science in Computer Engineering program at the University of the East. The site introduces Computer Engineering, explains the CpE experience at UE, and presents specializations, careers, faculty, student organizations, projects, and contact information.

> This is a student-built informational portal, not an official University of the East publication. Confirm admissions, curriculum, faculty, facilities, and announcements through official UE channels.

## Features

- Responsive sticky navigation built with Bootstrap 5.3.3
- About CpE dropdown with active-page highlighting
- Light/dark theme toggle with persisted preference
- Three-slide hero carousel on the home page
- Filterable specialization and project cards
- Searchable career cards
- Faculty and project detail modals populated through data attributes
- Accordion content for comparisons, self-assessment, activities, project ideas, and FAQs
- Contact form with Bootstrap client-side validation
- Tech and category badges, breadcrumbs, list groups, alerts, tables, and button groups
- Scroll-to-top control and automatic footer year update

## Pages

| Page | File | Main content |
| --- | --- | --- |
| Home | [index.html](index.html) | Hero carousel, portal entry points, and program highlights |
| What is Computer Engineering? | [about-cpe.html](about-cpe.html) | CpE definition, major areas, applications, and related-degree comparisons |
| CpE at UE | [cpe-ue.html](cpe-ue.html) | Program overview, skills, learning experiences, and facilities |
| Specializations | [specializations.html](specializations.html) | Nine filterable specialization cards and self-assessment |
| Careers | [careers.html](careers.html) | Twelve searchable career cards |
| Faculty | [faculty.html](faculty.html) | Six faculty cards with modal profiles |
| SCPES | [scpes.html](scpes.html) | Organization overview, officers, activities, and project ideas |
| Student Projects | [projects.html](projects.html) | Twelve filterable project cards with detail modals |
| FAQ + Contact | [contact.html](contact.html) | FAQ accordion, quick links, department information, and contact form |

## Technology

- HTML5
- CSS3
- JavaScript
- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)
- Google Fonts: Inter and Space Grotesk

Bootstrap and the external font/icon resources are loaded through CDN links in each HTML page.

## Project Structure

```text
CPEWebsite/
├── index.html
├── about-cpe.html
├── cpe-ue.html
├── specializations.html
├── careers.html
├── faculty.html
├── scpes.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
└── images/
```

The site uses repeated header and footer markup because it is a hand-maintained static site with no build system or templating engine.

## Run Locally

The pages can be opened directly in a browser. For reliable relative links, serve the project directory locally:

```powershell
py -m http.server
```

Then open [http://localhost:8000/](http://localhost:8000/) in a browser.

## Content Notes

Program descriptions are intended for orientation and may describe typical or illustrative Computer Engineering experiences. Faculty, organization, project, facility, admissions, and curriculum information should be verified against official UE sources before being treated as authoritative.

Before using files from `assets/` or adding images, check their provenance and suitability. The `images/` directory is available for approved image assets.

## Development Notes

- Shared styles belong in [css/style.css](css/style.css).
- Progressive enhancement and page-specific behavior belong in [js/script.js](js/script.js).
- Preserve the shared navigation and footer structure across all pages.
- Use existing Bootstrap classes and CSS variables before introducing new patterns.
- Test pages at narrow and wide viewport sizes after changes.
