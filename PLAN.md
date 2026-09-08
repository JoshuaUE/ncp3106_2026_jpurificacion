# CpE Website Project Plan
**Project:** BS Computer Engineering — University of the East, informational website
**Target folder:** `C:\Users\Josh\Documents\CPEWebsite`

---

## 1. Site Architecture (9 pages)

### Implementation status

All nine pages and the shared stylesheet are implemented:

- [x] Home — `index.html`
- [x] What is Computer Engineering? — `about-cpe.html`
- [x] CpE at UE — `cpe-ue.html`
- [x] Specializations — `specializations.html`
- [x] Careers — `careers.html`
- [x] Faculty — `faculty.html`
- [x] SCPES Organization — `scpes.html`
- [x] Student Projects — `projects.html`
- [x] FAQ + Contact — `contact.html`
- [x] Shared presentation — `css/style.css`

The nine-page architecture and the planned page-specific interactions are now implemented. Continue with verification, content review, and responsive QA.

| # | Page | File |
|---|------|------|
| 1 | Home | `index.html` |
| 2 | What is Computer Engineering? | `about-cpe.html` |
| 3 | CpE at UE | `cpe-ue.html` |
| 4 | Specializations | `specializations.html` |
| 5 | Careers | `careers.html` |
| 6 | Faculty | `faculty.html` |
| 7 | SCPES Organization | `scpes.html` |
| 8 | Student Projects | `projects.html` |
| 9 | FAQ + Contact | `contact.html` |

FAQ and Contact are combined into one page (accordion FAQ + form/info below) to keep the navbar from getting overcrowded.

## 2. Folder Structure

```
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
├── images/
│   └── ...
└── assets/
    └── ...
```

## 3. Navigation Structure

Single sticky navbar, identical across all pages, active page highlighted:

- Home
- About CpE (dropdown: What is CpE? / CpE at UE / Specializations)
- Careers
- Faculty
- SCPES
- Projects
- Contact

## 4. Design System

- **Color palette:** UE maroon/red as primary brand color + a complementary tech-accent (blue or teal, "circuit/digital" feel) + neutral grays
- **Typography:** one heading font (geometric/technical feel), one body font, loaded via Google Fonts
- **Visual motif:** circuit-line patterns / chip-PCB iconography for section dividers, to reinforce the engineering identity
- **Bootstrap components mapped to purpose:**
  - Navbar → global nav
  - Carousel → home page hero/featured highlights
  - Cards → specializations, careers, faculty, projects
  - Accordion → FAQ
  - Badges → tech tags on specialization/project cards
  - Modal → project detail popups or faculty bios
  - Forms → contact page
- **Shared header/footer** markup repeated identically across all static HTML pages (no templating engine, so consistency has to be maintained by hand/copy)

## 5. Content Plan (per page)

- [x] **Home:** hero banner + tagline, 3–4 "what you'll find here" cards linking to other pages, program highlights strip, CTA buttons ("Learn about CpE," "See Careers")
- [x] **What is CpE:** definition, hardware/software relationship, major areas, real-world applications, importance in society
- [x] **CpE at UE:** program overview, objectives, skills developed, labs/facilities, student projects teaser, research/innovation activities
- [x] **Specializations:** 9 cards with category filtering via JS
- [x] **Careers:** 12 role cards with live search filtering
- [x] **Faculty:** 6 profile cards with modal details; illustrative profiles are labeled
- [x] **SCPES:** organization overview, 8 officer cards, activities, events, and join information
- [x] **Projects:** 12 cards with 7-category filtering and modal details; illustrative content is labeled
- [x] **Contact/FAQ:** 10-question accordion, validated contact form, department information, and official links

## 6. JavaScript Scope

- [ ] Mobile nav active-link tracking
- [x] Card filtering on Specializations and Projects pages
- [x] Accordion-driven FAQ
- [x] Scroll-to-top button
- [x] Simple contact form validation on the Contact/FAQ page
- [x] Dark/light mode toggle persisted via localStorage
- [x] Connect filtering, search, form, and project-modal branches to page markup

## 7. Build Order

1. [x] Shared `style.css` — color variables, typography, spacing scale, header/footer styles
2. [x] Home page (establishes the navbar/footer pattern to copy into all other pages)
3. [x] About CpE → CpE at UE
4. [x] Specializations → Careers → Faculty
5. [x] SCPES → Projects
6. [x] Contact/FAQ
7. [x] JS interactivity pass across all pages
8. [ ] Responsive QA pass (mobile / tablet / desktop) on every page

## 8. Current Notes

- All nine pages are present and linked through the shared navigation and footer.
- JavaScript hooks for filtering, career search, contact validation, project modals, theme persistence, and scroll-to-top are connected to page markup.
- `assets/` contains `cpe logo.png`, `mamlim.jpg`, `sir ej.jpg`, and `sironofre.jpg`; `images/` is currently empty. Check provenance and suitability before using any additional asset.
- Complete the responsive QA pass and continue verifying official UE content and illustrative-content notices.

---

## Open Questions / Decisions Pending
- [ ] Confirm exact UE brand colors (maroon shade, accent color)
- [ ] Confirm real vs. placeholder faculty info (names, photos) — do NOT use Lorem ipsum or fake official info
- [x] Confirm whether dark/light mode toggle is in scope
- [x] Use verification notices for illustrative faculty, SCPES, and project content
- [ ] Replace or supplement illustrative content with verified official or student-provided details where available
