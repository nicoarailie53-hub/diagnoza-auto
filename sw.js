// Service Worker for Atelier Auto - Coduri OBD PWA
const CACHE_NAME = 'diagnoza-auto-v4';
const STATIC_ASSETS = [
  './', './index.html', './manifest.json', './favicon.svg',
  './media/icon-192.png', './media/icon-512.png',
  './data/codes.json', './app.js'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch((err) => {
      console.warn('[SW] Some assets failed to cache:', err);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                 .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-First strategy for all same-origin requests
  event.respondWith(
    fetch(request).then((response) => {
      // Cache fresh response for offline use
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
      return response;
    }).catch(() => {
      // Network failed, fall back to cache
      return caches.match(request).then((cached) => {
        return cached || null;
      });
    })
  );
});
