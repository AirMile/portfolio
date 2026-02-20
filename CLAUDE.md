# Portfolio — mileszeilstra.nl

React 19 + TypeScript portfolio site, gedeployd op Vercel.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

Image conversie (eenmalig na toevoegen nieuwe images):

```bash
node scripts/convert-images.mjs
```

## Tech stack

- React 19, React Router 7, TypeScript 5.7
- Tailwind CSS 4 (via @tailwindcss/vite plugin, config in index.css @theme, font: Sora)
- Animation: motion/react (component animations), GSAP + ScrollTrigger (Hero), Lenis (smooth scroll + snap)
- i18n: i18next met URL-based locale (`/:locale/...`), vertalingen in `src/locales/{en,nl}.json`
- Deployment: Vercel (serverless functions in `api/`)
- Email: Resend API (contact form) — vereist `RESEND_API_KEY` env var (kopieer `.env.example` → `.env`)

## Project structuur

```
src/
  pages/          # Home, ProjectDetail (lazy-loaded)
  components/
    ui/           # Button, ProjectCard, ContactForm, ImageLightbox, Tag, FormInput
    sections/     # Hero, About, Projects, Skills, Contact
    animation/    # FadeIn, StaggerContainer, StaggerItem, PageTransition
    background/   # Starfield (canvas-based met parallax + warp effect)
    providers/    # LenisProvider (smooth scroll)
    routing/      # LanguageRedirect
  hooks/          # useLocale, useLocalePath, useTranslatedProjects, useSEO, useStructuredData, useImageLightbox
  data/           # projectsBase array (project metadata, content via i18n keys)
  locales/        # en.json, nl.json
  lib/            # constants, i18n config, gsap setup, animation presets
api/              # Vercel serverless: contact.ts (rate-limited, honeypot spam check)
scripts/          # convert-images.mjs (PNG/JPG → WebP via sharp)
```

## Routing

`/` → detecteert browser language → redirect naar `/en` of `/nl`
`/:locale` → Home (alle secties)
`/:locale/projects/:slug` → Project detail

## Non-obvious patterns

- **Path alias**: `@/` → `src/` (vite.config.ts + tsconfig.json)
- **Starfield state**: Module-level state (buiten React) voor canvas performance — persisteert across re-renders
- **Page transitions**: Direction-aware animaties — forward (dieper navigeren) vs back (terugkeren). Starfield warp effect synct mee
- **Project data**: `projectsBase` in `src/data/projects.ts` bevat slugs/images/tags. Alle vertaalbare content komt via i18n keys in `src/locales/`
- **Hero animatie**: GSAP character-by-character + ScrollTrigger lift-off effect. Niet Motion-based
- **Lenis snap**: Proximity-based, desktop-only, downward-only snapping. Snap points updaten bij resize. Uitgeschakeld op project detail pagina's
- **Pin mode**: Shift+Click multi-select in inspect overlay. `pinnedElements` array, Alt+C kopieert alle pins, MAX_PINS=20 soft cap. Outlines direct op elementen (`el.style.outline`)
- **Contact API rate limit**: 5 submissions per IP per uur, honeypot veld `company_fax`
- **Images**: Alle project images in WebP formaat in `public/images/`. Conversie via `node scripts/convert-images.mjs`
- **SECTIONS array**: Centrale section-volgorde in `lib/constants.ts` — gebruikt door ScrollArrow, Lenis snap, en navigatie. Nieuwe sectie toevoegen vereist update van dit array
- **Button component**: Polymorf — rendert als `<a>` (href), `<Link>` (to), of `<button>` (default). Altijd `Button` gebruiken, nooit raw HTML elementen
- **Animation presets**: Gedeelde constanten in `lib/animation.ts` (SPRING_DEFAULT, EASE_DEFAULT, DURATION_FAST/NORMAL). Gebruik deze voor consistentie, geen hardcoded waarden
- **SEO**: Statische meta tags in `index.html` + dynamische via `useSEO` hook + JSON-LD structured data via `useStructuredData`
