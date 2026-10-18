/* Brottskatalog offline cache – versioned so an incomplete update never replaces the active cache. */
const CACHE = 'brottskatalog-v15-draft-poison-stage-review-20261018';
const CORE = ["./","./index.html","./manifest.webmanifest","./icon.svg","./catalog-03.js","./glossary-03.js","./data/provisions-generated.js","./data/provisions-reviewed-05.js","./data/legal-review-baseline.js","./legal-review-04.js","./catalog-05.js","./commentary-05.js","./glossary-05.js","./data/legal-review-baseline-05.js","./legal-validation-05.js","./data/source-status.json","./data/review-summary-05.json","./catalog-06.js","./investigation-06.js","./context-terms-06.js","./references-06.js","./details-06.js","./data/legal-review-baseline-06.js","./validation-06.js","./penalty-normalize-12.js","./core-penalties-13.js","./coercive-07.js","./field-07.js","./brb20-13.js","./brb4-review-14.js","./brb17-review-14.js","./special-penalties-review-14.js","./special-penalty-grade-audit-15.js","./special-other-penalty-grades-15.js","./smuggling-penalty-grades-15.js","./special-09.js","./data/special-provisions-generated.js","./special-law-import-12.js","./brb4-expansion-15.js","./brb-core-coverage-15.js","./brb-family-15.js","./brb11-13-expansion-15.js","./brb-war-coverage-15.js","./brb-special-preparation-15.js","./brb17-rymning-15.js","./stage-scope-15.js","./brb14-stage-scope-15.js","./special-stage-enumeration-15.js","./brb20-stage-negative-source-15.js","./brb13-poison-stage-scope-hold-15.js","./age14-offence-scope-15.js","./brb14-expansion-15.js","./brb10-review-15.js","./stages-08.js","./coercive-09.js","./coercive-safety-15.js","./decisions-10.js","./sources-qa.js","./prosecution-10.js","./prosecution-final-12.js","./prosecution-review-15.js","./brb5-prosecution-review-15.js","./brb10-prosecution-review-15.js","./brb8-near-relative-prosecution-15.js","./brb12-prosecution-review-15.js","./brb4-prosecution-review-15.js","./brb11-prosecution-review-15.js","./rekvisit-typexempel-15.js","./rekvisit-simple-typecases-15.js","./rekvisit-core-15.js","./rekvisit-grader-15.js","./rekvisit-special-15.js","./rekvisit-polisiara-15.js","./rekvisit-alternativ-15.js","./brb4-fridtext-15.js","./brb-source-repairs-15.js","./brb-stage-source-repairs-15.js","./rekvisit-frid-luckor-15.js","./rekvisit-tjanst-15.js","./rekvisit-ekonomi-15.js","./rekvisit-fortsattning-15.js","./rekvisit-allmanfara-15.js","./rekvisit-ordning-15.js","./rekvisit-hogmal-15.js","./rekvisit-riket-15.js","./rekvisit-krig-15.js","./rekvisit-sista-15.js","./brb-curated-lawtext-15.js","./brb16-fulltext-15.js","./brb17-18-fulltext-15.js","./brb-truncated-source-repairs-15.js","./brb6-further-fulltext-15.js","./brb19-fulltext-15.js","./brb20-22-fulltext-15.js","./brb13-fulltext-15.js","./brb15-complete-fulltext-15.js","./brb4-frid-current-provenance-15.js","./brb-penalty-grade-audit-15.js","./brb-derivative-penalties-15.js","./brb-conditional-penalty-options-15.js","./brb-conditional-source-audit-15.js","./brb-direct-grade-clauses-15.js","./brb-direct-grade-remaining-15.js","./brb4-child-stalking-requisites-15.js","./brb15-false-report-requisites-15.js","./praxis-vapenbilden-15.js","./praxis-freja-electronic-urkund-15.js","./urkund-gransdragning-15.js","./brb14-evidence-distinctions-15.js","./praxis-alibit-15.js","./brb15-accusation-source-limits-15.js","./brb17-official-boundaries-15.js","./special-bidrag-skatt-fulltext-15.js","./special-bidrag-skatt-requisites-15.js","./special-smuggling-money-lbe-fulltext-15.js","./special-smuggling-money-lbe-requisites-15.js","./special-nark-vapen-trafik-kniv-fulltext-15.js","./special-nark-vapen-trafik-kniv-requisites-15.js","./rekvisit-fordjupning-15.js","./rekvisit-sexualbrott-15.js","./quality-11.js"];
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
