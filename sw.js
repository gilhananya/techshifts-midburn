// Service Worker — מאפשר שימוש מלא באפליקציה גם ללא קליטה/אינטרנט (חשוב מאוד במידברן).
const CACHE_NAME = 'techshifts26-v3';
// Files that change with app updates — always check the network first so
// visitors get the latest version while online; fall back to cache offline.
const NETWORK_FIRST = ['./index.html', './style.css', './app.js'];
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// index.html/style.css/app.js: try network first so visitors always get the
// latest version while online; fall back to cache when offline (no signal
// at the event). Everything else same-origin (icons, manifest): cache-first,
// refreshed in the background — they barely ever change, so speed wins.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // let cross-origin (fonts) pass through normally

  const isNetworkFirst = req.mode === 'navigate' ||
    NETWORK_FIRST.some((p) => url.pathname.endsWith(p.slice(1)));

  if (isNetworkFirst) {
    const cacheKey = req.mode === 'navigate' ? './index.html' : req;
    event.respondWith(
      // 'reload' forces an actual network round-trip, bypassing the browser's
      // own HTTP cache — GitHub Pages serves these with Cache-Control: max-age
      // set, so a plain fetch() here could silently return a stale cached
      // response instead of ever reaching the network.
      fetch(req.url, {cache: 'reload'})
        .then((res) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, res.clone()));
          return res;
        })
        .catch(() => caches.match(cacheKey))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((res) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(req, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
