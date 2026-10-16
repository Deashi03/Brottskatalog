/* Brottskatalog offline cache – versioned so an incomplete update never replaces the active cache. */
const CACHE = 'brottskatalog-v15-draft-brb4-20261016';
const CORE = ["./","./index.html","./manifest.webmanifest","./icon.svg","./catalog-03.js","./glossary-03.js","./data/provisions-generated.js","./data/provisions-reviewed-05.js","./data/legal-review-baseline.js","./legal-review-04.js","./catalog-05.js","./commentary-05.js","./glossary-05.js","./data/legal-review-baseline-05.js","./legal-validation-05.js","./data/source-status.json","./data/review-summary-05.json","./catalog-06.js","./investigation-06.js","./context-terms-06.js","./references-06.js","./details-06.js","./data/legal-review-baseline-06.js","./validation-06.js","./penalty-normalize-12.js","./core-penalties-13.js","./coercive-07.js","./field-07.js","./brb20-13.js","./brb4-review-14.js","./brb17-review-14.js","./special-penalties-review-14.js","./special-09.js","./data/special-provisions-generated.js","./special-law-import-12.js","./brb4-expansion-15.js","./brb14-expansion-15.js","./brb10-review-15.js","./stages-08.js","./coercive-09.js","./decisions-10.js","./sources-qa.js","./prosecution-10.js","./prosecution-final-12.js","./rekvisit-typexempel-15.js","./quality-11.js"];
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
    if (event.request.mode === 'navigate' || /\.(?:html|js|json|webmanifest)$/i.test(url.pathname)) {
      try {
        const fresh = await fetch(event.request, {cache:'no-store'});
        if (fresh.ok) await cache.put(event.request, fresh.clone());
        return fresh;
      } catch (_) {
        return cached || (event.request.mode === 'navigate' ? await cache.match('./index.html') : null) || Response.error();
      }
    }
    if (cached) return cached;
    try {
      const fresh = await fetch(event.request);
      if (fresh.ok) await cache.put(event.request, fresh.clone());
      return fresh;
    } catch (_) {
      return Response.error();
    }
  })());
});
