/* Minimal service worker for offline-first caching (static portfolio). */

const CACHE_VERSION = 'portfolio-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.webmanifest',
  './shared/site-chrome.js',
  './assets/img/bernard_favicon.webp',
  './assets/img/bernard_favicon_dark.webp',
  './assets/img/bernard_favicon_light.webp',
];

function isSkippableAsset(requestUrl) {
  const url = new URL(requestUrl);
  const pathname = url.pathname.toLowerCase();
  return (
    pathname.endsWith('.mp4') ||
    pathname.endsWith('.m4a') ||
    pathname.endsWith('.mp3') ||
    pathname.endsWith('.ogg')
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(CORE_ASSETS);
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('portfolio-') && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      );
      self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isSkippableAsset(request.url)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);

      if (request.mode === 'navigate') {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          if (response && response.ok) {
            cache.put(request, response.clone());
            return response;
          }
          const notFound = await cache.match('./404.html');
          return notFound || response;
        } catch {
          return (await cache.match('./index.html')) || (await cache.match('./404.html'));
        }
      }

      const cached = await cache.match(request);
      if (cached) {
        event.waitUntil(
          (async () => {
            try {
              const fresh = await fetch(request);
              if (fresh && fresh.ok) await cache.put(request, fresh.clone());
            } catch {
              // ignore
            }
          })()
        );
        return cached;
      }

      try {
        const response = await fetch(request);
        if (response && response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return new Response('', { status: 504 });
      }
    })()
  );
});

