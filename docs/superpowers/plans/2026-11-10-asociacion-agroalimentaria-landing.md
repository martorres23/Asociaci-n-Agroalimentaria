# Asociación Agroalimentaria Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static one-page landing for Asociación Agroalimentaria de Colombia with anchored sections, dual CTAs (afiliado/aliado), and a Formspree contact form.

**Architecture:** Plain `index.html` + `styles.css` + `script.js` + `assets/`. No framework, no build step. Content comes from the approved brochure/spec. Form posts via `fetch` to a Formspree endpoint placeholder.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts (Fraunces + Source Sans 3), Formspree, images from brochure PDF + brand logos.

**Spec:** `docs/superpowers/specs/2026-11-10-asociacion-agroalimentaria-landing-design.md`

## Global Constraints

- Stack: HTML + CSS + JS only (no React/Next/build tools).
- Brand colors: primary `#006837`, accent `#8CC63F`.
- Fonts: Fraunces (display) + Source Sans 3 (body); never Inter/Roboto/Arial.
- Hero: full-bleed photo, brand-dominant, one slogan, two CTAs; no floating badges/stats.
- Copy: Spanish, faithful to brochure.
- Contact email target: `asociacionagroalimentaria79@gmail.com`.
- Phone: `+57 320-420-0954`.
- NIT: `902120877`.
- Formspree endpoint starts as placeholder `https://formspree.io/f/PLACEHOLDER`.
- Working directory: project root `/home/torres/JH_ALTERNATVAS/Asociación agroalimentara`.
- Git: repo may not exist yet; Task 1 initializes it. Only commit when the human asks, or when executing this plan with explicit commit steps approved by the human — prefer staging locally and asking before first commit if unclear.

---

## File map

| File | Responsibility |
|------|----------------|
| `index.html` | Semantic markup, sections, form, meta/SEO |
| `styles.css` | Tokens, layout, responsive, motion |
| `script.js` | Nav, scroll, header shrink, reveal, CTA tipo, form submit |
| `assets/logo_horizontal_transparente.png` | Header logo |
| `assets/logo_asociacion_agroalimentaria_transparente.png` | Hero/footer mark |
| `assets/hero.jpg` | Hero full-bleed background |
| `assets/section-field.jpg` | Optional section atmosphere image |
| `README.md` | Local preview + Formspree setup |
| `scripts/verify-structure.sh` | Smoke checks for required ids/files |

---

### Task 1: Project scaffold + assets

**Files:**
- Create: `assets/` (directory)
- Create: `scripts/verify-structure.sh`
- Create: `index.html` (minimal stub)
- Create: `styles.css` (empty stub)
- Create: `script.js` (empty stub)
- Copy: logos into `assets/`
- Create: `assets/hero.jpg`, `assets/section-field.jpg` (from PDF)

**Interfaces:**
- Consumes: brochure PDF, logo PNGs in project root
- Produces: `assets/hero.jpg`, `assets/section-field.jpg`, logo copies; stub files linked from `index.html`

- [ ] **Step 1: Create directories and stub files**

```bash
cd "/home/torres/JH_ALTERNATVAS/Asociación agroalimentara"
mkdir -p assets scripts
printf '%s\n' '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Asociación Agroalimentaria de Colombia</title><link rel="stylesheet" href="styles.css"></head><body><main id="inicio"></main><script src="script.js"></script></body></html>' > index.html
: > styles.css
: > script.js
```

- [ ] **Step 2: Copy logos into assets**

```bash
cp logo_horizontal_transparente.png assets/
cp logo_asociacion_agroalimentaria_transparente.png assets/
```

- [ ] **Step 3: Extract hero and section images from the brochure PDF**

Use `pdftoppm` on pages with strong field photography (pages 1–2 of the brochure). Export at ~150 DPI, then convert/crop to JPEG under 500KB each if possible:

```bash
pdftoppm -jpeg -r 150 -f 2 -l 2 "Green Modern Professional Future of Agriculture Presentation.pdf" assets/_pdf
# Rename/crop: page 2 landscape fields ? hero.jpg
# If ImageMagick available:
convert assets/_pdf-1.jpg -resize 1920x -quality 82 assets/hero.jpg
# Second image: tractor/cover page 1 or reuse a crop of page 2
pdftoppm -jpeg -r 150 -f 1 -l 1 "Green Modern Professional Future of Agriculture Presentation.pdf" assets/_pdf_cover
convert assets/_pdf_cover-1.jpg -resize 1600x -quality 80 assets/section-field.jpg
rm -f assets/_pdf*.jpg assets/_pdf_cover*.jpg
```

If `convert` is missing, use `python3` + Pillow to resize/save JPEG, or keep the pdftoppm JPEG and `mv` it to `assets/hero.jpg` after renaming.

Also remove temporary `_preview-*.png` from project root if still present (they were brainstorming aids).

- [ ] **Step 4: Write smoke verification script**

Create `scripts/verify-structure.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
missing=0
need() {
  if [[ ! -e "$ROOT/$1" ]]; then
    echo "MISSING: $1"
    missing=1
  else
    echo "OK: $1"
  fi
}
need index.html
need styles.css
need script.js
need assets/logo_horizontal_transparente.png
need assets/logo_asociacion_agroalimentaria_transparente.png
need assets/hero.jpg
need assets/section-field.jpg
exit "$missing"
```

```bash
chmod +x scripts/verify-structure.sh
./scripts/verify-structure.sh
```

Expected: all lines `OK:`; exit 0.

- [ ] **Step 5: Init git if absent (optional until human asks to commit)**

```bash
test -d .git || git init
```

Do not commit unless the human explicitly wants commits during execution.

---

### Task 2: HTML document shell — header, hero, section shells, footer, SEO

**Files:**
- Modify: `index.html`
- Modify: `scripts/verify-structure.sh` (add id checks)

**Interfaces:**
- Consumes: asset paths from Task 1
- Produces: DOM ids `#inicio`, `#quienes-somos`, `#compromiso`, `#que-hacemos`, `#capacidades`, `#por-que`, `#contacto`; form `#contact-form` with fields `name`, `email`, `phone`, `tipo`, `message`; CTAs with `data-tipo="Afiliado"` / `data-tipo="Aliado"`

- [ ] **Step 1: Extend verify script for required section ids**

Append to `scripts/verify-structure.sh` before `exit`:

```bash
for id in inicio quienes-somos compromiso que-hacemos capacidades por-que contacto; do
  if ! grep -q "id=\"$id\"" "$ROOT/index.html"; then
    echo "MISSING ID: $id"
    missing=1
  else
    echo "OK ID: $id"
  fi
done
```

Run and confirm it currently fails for missing ids (except `inicio` if stub still has it).

- [ ] **Step 2: Replace `index.html` with full shell + brochure copy**

Write complete `index.html` including:

- `<html lang="es">`
- Meta: charset, viewport, description (“Impulsando el desarrollo agropecuario y agroalimentario de Colombia.”), Open Graph (`og:title`, `og:description`, `og:image` ? logo or hero)
- Google Fonts link: Fraunces + Source Sans 3
- Header with:
  - `<img src="assets/logo_horizontal_transparente.png" alt="Asociación Agroalimentaria de Colombia">`
  - Nav links to `#quienes-somos`, `#que-hacemos`, `#capacidades`, `#contacto`
  - Button/link “Contactar” ? `#contacto`
  - Mobile menu button `aria-expanded`, `aria-controls="site-nav"`
- Hero `#inicio`:
  - Background via CSS using `assets/hero.jpg` (class `hero`)
  - Circular logo optional small mark OR rely on wordmark text — brand name as hero-level signal: “Asociación Agroalimentaria de Colombia”
  - Slogan paragraph
  - NIT small text
  - Buttons: `Únete` (`data-tipo="Afiliado" class="js-cta-tipo"`), `Sé aliado` (`data-tipo="Aliado" class="js-cta-tipo"`)
- Sections with one `h2` each and brochure paragraphs/lists (use exact brochure meaning):
  - `#quienes-somos`
  - `#compromiso` (six items numbered 01–06)
  - `#que-hacemos` (six activity blocks)
  - `#capacidades` (six capacity blocks)
  - `#por-que`
  - `#contacto` with contact details + form below
- Form `#contact-form` `action="https://formspree.io/f/PLACEHOLDER" method="POST"`:
  - `name` (required)
  - `email` (required, type=email)
  - `phone` (optional, type=tel)
  - `tipo` select: Afiliado | Aliado | Otro (required), `id="tipo"`
  - `message` textarea (required)
  - Submit button
  - `#form-status` region `aria-live="polite"`
- Footer with circular logo, NIT, phone, email, copyright year

Use semantic landmarks: `header`, `main`, `section`, `footer`, `nav`.

- [ ] **Step 3: Re-run structure verification**

```bash
./scripts/verify-structure.sh
```

Expected: exit 0; all files and ids OK.

- [ ] **Step 4: Open in browser for visual smoke**

```bash
# from project root
python3 -m http.server 5173
```

Open `http://localhost:5173` — confirm sections exist and images load (styles still minimal until Task 3).

---

### Task 3: Visual system + responsive layout (CSS)

**Files:**
- Modify: `styles.css`
- Modify: `index.html` (only if class hooks missing)

**Interfaces:**
- Consumes: class names from HTML (`site-header`, `hero`, `section`, `reveal`, `btn`, `btn--primary`, `btn--secondary`, `grid-commitments`, `grid-actions`, `grid-capabilities`, `contact`, `is-scrolled`, `nav-open`)
- Produces: complete visual system matching Global Constraints

- [ ] **Step 1: Write CSS custom properties and base**

In `styles.css`:

```css
:root {
  --green: #006837;
  --lime: #8CC63F;
  --ink: #14201a;
  --paper: #f3f7f1;
  --paper-2: #e7f0e4;
  --white: #ffffff;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Sans 3", "Source Sans Pro", sans-serif;
  --header-h: 4.5rem;
  --radius: 0;
  --shadow-soft: 0 12px 40px rgba(0, 40, 20, 0.12);
}

*,
*::before,
*::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(140, 198, 63, 0.18), transparent 60%),
    linear-gradient(180deg, var(--paper), var(--paper-2));
  line-height: 1.6;
}

img { max-width: 100%; height: auto; display: block; }

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: 1.15;
  font-weight: 600;
  color: var(--green);
}

a { color: var(--green); }

:focus-visible {
  outline: 3px solid var(--lime);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Header, hero, buttons**

Implement sticky translucent header; `.site-header.is-scrolled` reduces padding/height.  
Hero: `min-height: 100svh`, `background-image: url("assets/hero.jpg")`, cover/center, dark green gradient overlay for text contrast. Brand name largest; slogan one short line; CTA group. No cards in hero.

Buttons:

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.4rem;
  font-family: var(--font-body);
  font-weight: 600;
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn--primary { background: var(--lime); color: var(--ink); }
.btn--secondary { background: transparent; color: var(--white); border-color: var(--white); }
```

- [ ] **Step 3: Sections, grids, contact, footer, mobile nav**

- Section padding `clamp(3rem, 8vw, 6rem)` and max-width container ~72rem.
- Commitment / actions / capabilities: CSS grid, gap, light dividers — avoid heavy card chrome (no thick shadows/borders unless needed for form inputs).
- Contact: two columns on desktop (info | form); stack on mobile.
- Form inputs: full width, clear labels, padding, border using `--green`.
- Mobile: `.nav-toggle` visible under ~800px; `#site-nav` hidden until `.nav-open` on header.
- `.reveal` default `opacity: 0; transform: translateY(16px)`; `.reveal.is-visible` transitions to visible.

- [ ] **Step 4: Visual check**

Reload `http://localhost:5173`. Verify:

1. First viewport reads as one composition with strong brand.
2. Nav anchors scroll to sections.
3. Mobile width (~375px) shows hamburger and stacked layout.
4. Contrast of hero text is readable.

---

### Task 4: Interactions (script.js)

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `.nav-toggle`, `#site-nav`, `.site-header`, `.js-cta-tipo[data-tipo]`, `#tipo`, `#contact-form`, `#form-status`, `.reveal`
- Produces: functions wired on `DOMContentLoaded` — no exports needed

- [ ] **Step 1: Implement nav toggle + scrolled header + reveal**

```js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
});
```

- [ ] **Step 2: CTA tipo preselect**

Inside the same `DOMContentLoaded`:

```js
  const tipo = document.querySelector("#tipo");
  document.querySelectorAll(".js-cta-tipo").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const value = btn.getAttribute("data-tipo");
      if (tipo && value) tipo.value = value;
      // allow default hash navigation if href="#contacto"
    });
  });
```

Ensure Únete / Sé aliado are `<a href="#contacto" class="btn ... js-cta-tipo" data-tipo="...">`.

- [ ] **Step 3: Manual interaction check**

In browser:

1. Scroll ? header gets `is-scrolled`.
2. Click Únete ? lands on contact, `#tipo` = Afiliado.
3. Click Sé aliado ? `#tipo` = Aliado.
4. Sections fade in once.
5. Mobile menu opens/closes.

---

### Task 5: Formspree submit + status UX

**Files:**
- Modify: `script.js`
- Modify: `index.html` (hidden `_subject` optional)

**Interfaces:**
- Consumes: `#contact-form` with Formspree `action` URL
- Produces: async submit handler; status text in `#form-status`

- [ ] **Step 1: Add fetch submit handler**

```js
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const endpoint = form.getAttribute("action");
    status.textContent = "Enviando…";
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("send failed");
      status.textContent = "Mensaje enviado. Gracias por contactarnos.";
      form.reset();
    } catch (err) {
      status.textContent =
        "No se pudo enviar. Escríbenos a asociacionagroalimentaria79@gmail.com o WhatsApp +57 320-420-0954.";
    } finally {
      submitBtn.disabled = false;
    }
  });
```

Leave `action="https://formspree.io/f/PLACEHOLDER"` until the association creates a Formspree form. With PLACEHOLDER, submit should show the error path (acceptable for v1).

- [ ] **Step 2: Optional subject field for inbox clarity**

Inside the form markup:

```html
<input type="hidden" name="_subject" value="Contacto web — Asociación Agroalimentaria" />
```

- [ ] **Step 3: Verify validation + error path**

1. Submit empty form ? browser validation blocks.
2. Fill form and submit with PLACEHOLDER ? status shows failure message (or Formspree 404 JSON error handled by catch).
3. Confirm `mailto:` / tel links still work as fallback.

---

### Task 6: README + final polish pass

**Files:**
- Create: `README.md`
- Modify: `index.html` / `styles.css` as needed for polish
- Modify: `scripts/verify-structure.sh` (optional: check Formspree placeholder comment)

**Interfaces:**
- Consumes: final file tree
- Produces: documented run/deploy/Formspree steps

- [ ] **Step 1: Write README.md**

Create `README.md` with:

- Title: Asociación Agroalimentaria de Colombia — Web
- Local preview command: `python3 -m http.server 5173` ? open http://localhost:5173
- Formspree setup: create form to `asociacionagroalimentaria79@gmail.com`, replace `https://formspree.io/f/PLACEHOLDER` in `index.html`
- Deploy: upload `index.html`, `styles.css`, `script.js`, `assets/` to static hosting
- Point to spec path: `docs/superpowers/specs/2026-11-10-asociacion-agroalimentaria-landing-design.md`

- [ ] **Step 2: Final verification checklist**

```bash
./scripts/verify-structure.sh
```

Manual:

- [ ] Nav links: Quiénes somos, Qué hacemos, Capacidades, Contacto
- [ ] Dual CTAs preselect tipo
- [ ] Logos load (horizontal header, circular footer)
- [ ] Hero brand + slogan + two CTAs only in first viewport extras
- [ ] All brochure sections present
- [ ] Mobile menu works
- [ ] Form validation works
- [ ] Meta title/description present

- [ ] **Step 3: Ask human about git commit / deploy next steps**

Do not push or deploy unless asked. Offer: initialize commit, Netlify drop, or Formspree setup help.

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| One-page landing + anchors | 2, 3 |
| Dual audience CTAs | 2, 4 |
| Sections order incl. compromiso + por qué | 2 |
| Logos horizontal/circular | 1, 2 |
| Brochure images | 1 |
| Colors + fonts | 3 |
| Formspree form fields | 2, 5 |
| Motion (header, reveal, hover) | 3, 4 |
| SEO/a11y basics | 2, 3 |
| README | 6 |
| No backend/CMS | honored globally |

No TBD placeholders. Names (`#tipo`, `.js-cta-tipo`, `#contact-form`, `#form-status`) consistent across tasks 2–5.
