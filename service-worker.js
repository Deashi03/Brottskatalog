/* Brottskatalog offline cache – versioned so an incomplete update never replaces the active cache. */
const CACHE = 'brottskatalog-step2-20261012-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('brottskatalog-') && name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request, {ignoreSearch:true});
    if (event.request.mode === 'navigate') {
      try {
        const fresh = await fetch(event.request);
        if (fresh.ok) await cache.put(event.request, fresh.clone());
        return fresh;
      } catch (_) {
        return cached || await cache.match('./index.html') || Response.error();
      }
    }
    if (cached) return cached;
    try {
      const fresh = await fetch(event.request);
      if (fresh.ok) await cache.put(event.request, fresh.clone());
      return fresh;
    } catch (_) {
      return await cache.match('./index.html') || Response.error();
    }
  })());
});
