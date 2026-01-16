# Portfolio (Bernard Choong)

Clean, Apple-style portfolio site built as a static Bootstrap website with a shared header/footer and a few lightweight interactive components.

## Highlights
- Dark/light theme toggle (Apple link blue `#0a84ff`).
- Shared navbar + footer injected via `shared/site-chrome.js`.
- Hero video background (responsive sources).
- Projects carousel with dots + arrows + swipe + autoplay.
- Background music toggle (persists preference).
- WhatsApp contact link + floating WhatsApp button.
- Trust count-up animation.
- PWA support (manifest + service worker).
- Custom `404.html` + Apache `.htaccess` handler.

## Local development
This is a static site — no build step required.

### Option A: XAMPP (recommended for this repo)
- Place this folder under your XAMPP web root (example: `C:\xampp\htdocs\portfolio`).
- Open `http://localhost/portfolio/`.

### Option B: Any static server
Serve the folder as a static site root and open the served URL.

## Structure
- `index.html` — homepage
- `shared/site-chrome.js` — shared UI injection + global behaviors (theme, music, carousel, WhatsApp, etc.)
- `assets/` — images, audio, and media files
- `404.html` — not found page
- `manifest.webmanifest` — PWA manifest
- `sw.js` — service worker (offline caching)
- `.htaccess` — Apache 404 routing (adjust path if deployed at a different root)

## PWA notes
- Install prompt / “Add to Home Screen” works when served over HTTPS (or `http://localhost` during development).
- If you update assets and want clients to refresh the offline cache, bump the `CACHE_VERSION` in `sw.js`.

## Pricing (Design-Only)
This section is a **design-only** cost breakdown (UI/UX + visual system + interaction states). It excludes implementation/dev work unless stated.

### Total: **RM 2,900**
**How it adds up**
- **Base design (RM 1,800)**: 1 theme (dark or light) + EN only, covering desktop+mobile layout and component styling for:
  - Shared nav/footer + key sections (hero, about, projects, approach, trust, FAQ, contact)
  - Typewriter hero roles, projects carousel (dots/arrows/autoplay), count-up stats
  - Music toggle button + floating WhatsApp button (UI states only)
- **Add-on: Light/Dark mode variant (+RM 600)**: full second-theme pass across all components (colors, surfaces, borders, icons, contrast checks).
- **Add-on: Multi-language UI pass (+RM 500)**: EN/BM/中文 UI readiness (spacing tolerance, button widths, nav/dropdown layouts, long-string handling). Translation writing is not included.
