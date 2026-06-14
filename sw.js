const CACHE = 'podlist-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/fonts/nove.ttf',
  '/fonts/sf-ui-display-light.otf',
  '/fonts/sf-ui-display-medium.otf',
  '/fonts/sf-ui-display-semibold.otf',
  '/fonts/sf-ui-display-bold.otf',
  '/fonts/sf-ui-display-heavy.otf',
  '/assets/icone-preto.png',
  '/assets/anderson.jpg',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/favicon-32.png',
  '/assets/favicon-16.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
