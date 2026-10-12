# Brottskatalog 0.8 – förstadier och fältstöd

**Safari:** https://deashi03.github.io/Brottskatalog/

**Arbetsversion:** Materialet är inte fullständigt juridiskt slutgranskat. Använd inte appen som ensam grund för operativa beslut.

## Nyheter i 0.8

- Egna sökbara poster för försök, förberedelse och stämpling till brott. Förstadieposterna visas vid sökning på ett förstadium, inte i grundlistan.
- Tydlig röd märkning **Ej straffbart** för förstadier som saknar särskild kriminalisering enligt genomgångna kapitelbestämmelser; grå märkning **Ej verifierat** i andra fall. Ej verifierat betyder inte straffritt.
- Förstadiestraffskalor följer BrB 23:1–2. Straffet för försök kan högst motsvara fullbordat brott; böter utesluts vid försök till brott med minimistraff om minst två år. Straff för förberedelse/stämpling ska vara under fullbordat brotts maximistraff, och mer än två års fängelse förutsätter att fullbordat brott kan ge fängelse i minst sex år.
- Häktningspresumtionen för straffbara förstadier prövas enligt RB 24:1 andra stycket punkt 2 utifrån **fullbordat brotts** minimistraff om minst fyra år.
- Sökresultat innehåller enbart rubricering, lagrum och straffskala, med nödvändig särskild markering för icke straffbara/ogranskade förstadier.
- Lagtext ligger först i brottskortets meny. Tvångsmedel sorteras därefter efter RB-kapitel 23–28, med tydligare paragrafnummer och beslutsbehörighet. Hemliga tvångsmedel döljs.
- Häktningsöversikten har fyra kort: RB 24:1 huvudregel, 24:1 presumtion, 24:2 särskilda grunder och 24:3 utredningshäktning; bock/kryss samt korta rekvisit, separat straffskala och misstankegrad.
- Offline-cachen innehåller nu förstadiedata.

## Kvarstående rättsliga begränsningar

Genomgången av Brottsbalken prioriterar 3, 7–9, 11–14 och 17–19 kap. Där finns breda kartläggningar av förstadiernas särskilda kriminalisering. Reglerna i övriga kapitel och specialstraffrätt är inte uttömmande kontrollerade. Narkotikastrafflagens 4 § har lagts till med undantaget för gärningar som avser enbart bruk. Särskilda rekvisit, alternativa rubriceringar och ändringar över tid måste alltid kontrolleras.

Rättskällor: [Brottsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), [Rättegångsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740/) och [Narkotikastrafflagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/).

## Filer

- stages-08.js: brottsförstadier och statusar.
- index.html: gränssnittet.
- coercive-07.js: tvångsmedelsmetadata.
- service-worker.js: offline-cache.
- scripts/ui_smoke.mjs: mobiltester.
