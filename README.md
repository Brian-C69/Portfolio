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
