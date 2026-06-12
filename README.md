# Wusul — Landing Site

Static marketing site for Wusul (home + contact). HTML is built with [Eleventy](https://www.11ty.dev/) so shared layout pieces (navbar, footer, head) are written once.

**Live:** deployed via Vercel from the `_site/` output folder.

---

## Requirements

- **Node.js** 18+ ([nodejs.org](https://nodejs.org) — use the LTS version)
- **npm** (included with Node)

---

## Quick start

```bash
# Clone the repo, then:
cd wusul
npm install

# Local preview (auto-reloads on save)
npm run dev
```

Open **http://localhost:8080**

```bash
# Production build (generates _site/)
npm run build
```

---

## Daily workflow

| Task | What to do |
|------|------------|
| Edit content / layout | Change `.njk` files under `_includes/` or page files (`index.njk`, `contact.njk`) |
| Edit styles | Change files under `css/` (same as before) |
| Edit behaviour | Change `js/main.js` |
| Preview locally | `npm run dev` |
| Before opening a PR | Run `npm run build` and spot-check `_site/` if needed |

**Do not edit `_site/`** — it is generated and overwritten on every build.

---

## Project structure

```
wusul/
├── index.njk              # Home page (lists sections)
├── contact.njk            # Contact page
├── _includes/
│   ├── layouts/
│   │   └── base.njk       # HTML shell: head, navbar, content, footer, scripts
│   ├── partials/
│   │   ├── head.njk       # Meta, fonts, CSS links
│   │   ├── navbar.njk     # Navigation (shared)
│   │   ├── footer.njk     # Footer (shared)
│   │   ├── scripts.njk    # jQuery, Bootstrap, main.js
│   │   └── svg-defs.njk   # SVG clip paths (home only)
│   └── sections/          # Page sections (hero, services, FAQ, …)
├── css/
│   ├── variables.css      # Design tokens
│   ├── style.css          # Imports all section/component CSS
│   ├── contact.css        # Contact page only
│   └── sections/          # One file per section
├── js/
│   └── main.js            # Navbar scroll, FAQ, marquee, AOS, counters
├── assets/                # Images & icons
├── .eleventy.js           # Eleventy config
├── vercel.json            # Vercel build settings
└── _site/                 # Build output (gitignored)
```

---

## Where to edit

| Change | File |
|--------|------|
| Navbar links / logo | `_includes/partials/navbar.njk` |
| Footer links / phone / email | `_includes/partials/footer.njk` |
| Hero | `_includes/sections/hero.njk` |
| Services | `_includes/sections/services.njk` |
| Methodology | `_includes/sections/methodology.njk` |
| About | `_includes/sections/about.njk` |
| Tech stack | `_includes/sections/tech-stack.njk` |
| Testimonials | `_includes/sections/testimonials.njk` |
| FAQ | `_includes/sections/faq.njk` |
| CTA block | `_includes/sections/cta.njk` |
| Contact form / info | `_includes/sections/contact.njk` |
| Colours / spacing tokens | `css/variables.css` |
| Section styling | `css/sections/<name>.css` |

Home section order is defined in `index.njk`:

```njk
{% include "sections/hero.njk" %}
{% include "sections/services.njk" %}
...
```

---

## How pages work

Each page starts with **front matter** (YAML between `---` lines):

**Home (`index.njk`):**

- `isHome: true` — navbar uses `#` anchor links
- `aos: true` — loads AOS animation library
- `svgDefs: true` — includes testimonial SVG defs

**Contact (`contact.njk`):**

- `permalink: contact.html` — output filename
- `isHome: false` — navbar links point to `/#section` on home
- `extraStylesheets` — adds `css/contact.css`

Shared layout is set with `layout: layouts/base.njk`.

---

## CSS

CSS is modular. The browser only loads:

1. `css/variables.css`
2. `css/style.css` (which `@import`s section files)

Contact page also loads `css/contact.css` via front matter.

When adding styles for a new section, create `css/sections/your-section.css` and add an `@import` in `css/style.css`.

---

## Deployment (Vercel)

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "_site"
}
```

On push, Vercel runs `npm install` → `npm run build` → serves `_site/`.

Ensure the Vercel project uses these settings (or relies on `vercel.json`).

---

## Git — commit these

- `index.njk`, `contact.njk`
- `_includes/`
- `css/`, `js/`, `assets/`
- `package.json`, `package-lock.json`
- `.eleventy.js`, `vercel.json`, `.gitignore`

## Git — do not commit

- `node_modules/`
- `_site/`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `command not found: npm` | Install Node.js LTS |
| `npm run dev` fails after pull | Run `npm install` again |
| Changes not visible | Save the `.njk` file; use `npm run dev`, not opening `_site/` directly |
| Styles broken after CSS edit | Hard-refresh browser (Cmd+Shift+R) |

---

## Adding a new page (optional)

1. Create `about.njk` (or any name) with front matter + content/includes.
2. Set `permalink: about.html` if you need a specific URL.
3. Reuse `layout: layouts/base.njk` — navbar and footer are included automatically.
4. Run `npm run dev` to preview.

---

## Stack summary

| Layer | Technology |
|-------|------------|
| Templates | Eleventy 3 + Nunjucks (`.njk`) |
| CSS | Plain CSS, Bootstrap 4 |
| JS | jQuery + Bootstrap 4 + AOS |
| Hosting | Vercel |
