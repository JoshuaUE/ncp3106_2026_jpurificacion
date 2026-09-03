# CpE Website Project Plan
**Project:** BS Computer Engineering — University of the East, informational website
**Target folder:** `C:\Users\Josh\Documents\CPEWebsite`

---

## 1. Site Architecture (9 pages)

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

- **Home:** hero banner + tagline, 3–4 "what you'll find here" cards linking to other pages, program highlights strip, CTA buttons ("Learn about CpE," "See Careers")
- **What is CpE:** definition, hardware/software relationship, major areas, real-world applications, importance in society
- **CpE at UE:** program overview, objectives, skills developed, labs/facilities, student projects teaser, research/innovation activities
- **Specializations:** 8–10 cards (Embedded Systems, IoT, Networks, Cybersecurity, AI/ML, Data Engineering, Robotics, Hardware/Architecture, Cloud/Edge), each with description + example tech + career path; filterable by category (JS)
- **Careers:** 10–12 roles as cards/table with brief responsibilities
- **Faculty:** grid of cards — photo, name, title, specialization, courses
- **SCPES:** about, objectives, officers grid, activities/events
- **Projects:** gallery/grid with modal detail view, filterable by category
- **Contact/FAQ:** accordion FAQ + contact form (client-side validation) + official links

## 6. JavaScript Scope

- Mobile nav active-link tracking
- Card filtering on Specializations and Projects pages
- Accordion-driven FAQ
- Scroll-to-top button
- Simple contact form validation
- Optional: dark/light mode toggle (persisted via localStorage in the real deliverable files)

## 7. Build Order

1. Shared `style.css` — color variables, typography, spacing scale, header/footer styles
2. Home page (establishes the navbar/footer pattern to copy into all other pages)
3. About CpE → CpE at UE → Specializations → Careers → Faculty
4. SCPES → Projects
5. Contact/FAQ (needs form JS + accordion)
6. JS interactivity pass across all pages
7. Responsive QA pass (mobile / tablet / desktop) on every page

---

## Open Questions / Decisions Pending
- [ ] Confirm exact UE brand colors (maroon shade, accent color)
- [ ] Confirm real vs. placeholder faculty info (names, photos) — do NOT use Lorem ipsum or fake official info
- [ ] Confirm whether dark/light mode toggle is in scope
- [ ] Any real project examples to feature on the Projects page, or should these be illustrative/generic to start?
