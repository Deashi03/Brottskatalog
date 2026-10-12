# Brottskatalog 0.9 – tvångsmedel och utökad specialstraffrätt

**iPhone / Safari:** https://deashi03.github.io/Brottskatalog/

> Juridisk arbetsversion. Straffskalestatus är inte ett självständigt beslut om tvångsmedel. Kontrollera exakta lagrum, misstankegrad, gärningsform, beslutsbehörighet, proportionalitet och aktuellt rättsläge innan operativa beslut.

## Nyheter 0.9

- **✓ / ✕ direkt på varje tvångsmedel** för om brottets straffskala eller brottstyp kan medge den aktuella åtgärden. Grön bock innebär **inte** att person- eller situationsberoende rekvisit har prövats.
- **Polisbeslut separat:** `Direkt`, `FID`, `Direkt / FID`, `Nej` eller `Särskild regel`. Andra beslutsfattare och exakta regler syns i expanderbar detalj. FID = fara i dröjsmål.
- **Visa endast ✓** kan filtrera listan. Grupperingen RB 23–28 behålls; hemliga tvångsmedel visas inte. Fasta paragrafhänvisningar visas utan att avslutande bokstäver i t.ex. 23:8 a, 23:9 a och 27:1 a kapas.
- **27 synliga åtgärder:** tidigare 24 plus 3 kompletteringar i RB 23:8–9 om medtagande och kvarstannande vid förhör. Strukturerad beslutsmetadata finns för samtliga.
- **46 nya sökbara grundposter**, med straffskalor och särskild förstadiekriminalisering enligt:
  - Lag (2000:1225) om straff för smuggling, inklusive narkotika-, vapen- och explosivvarusmuggling och tullbrott.
  - Lag (2014:307) om straff för penningtvättsbrott.
  - Skattebrottslag (1971:69).
  - Bidragsbrottslag (2007:612).
  - Lag (2010:1011) om brandfarliga och explosiva varor.
- Förstadieposterna omfattar försök, förberedelse och stämpling till tillämpliga brott. **Ej straffbart** förutsätter kontrollerad särskild regel eller ett explicit granskat undantag. **Ej verifierat** används annars.
- Lagtext först i brottskortet. Sökresultaten är fortsatt avskalade till brottsrubricering, lagrum och straffskala, med röd/grå markering för förstadier som kräver det.
- Offline-cachen laddar de nya JS-modulerna vid första uppkopplade besöket.

## Kontroller

- `scripts/stage_rules_test.mjs` provar uttryckligen centrala kriminaliseringsgränser och undantag.
- `scripts/integration_09.mjs` läser in samtliga brottsdata och kontrollerar ID:n, straffskalor, förstadier, lagrumsreferenser, tvångsmedel, polisbeslut, beroenden och cache.
- `scripts/ui_smoke.mjs` kör iPhone-liknande Playwright-test för sökning, lagtext, häktning, ✓/✕, FID och filter. GitHub Actions startas för push på main som berör dessa filer.
- Därutöver har urval av straffskalor och förstadier jämförts mot Riksdagens konsoliderade lydelser per 2026-10-13.

## Kvarstående begränsningar och granskningspunkter

- **Ny specialstraffrättslig lagtext visas via officiella källänkar, inte som fullständigt offline-inläst lagtext.** Dessa poster har `lawMode: missing`; inga genererade parafraser presenteras som ordagrann lagtext.
- Äldre katalogposter och vissa förstadieundantag behöver fortfarande individuell lagtext- och åtalsgranskning. Vissa äldre maskinimporterade lagtexter kan vara ofullständiga. Tidigare granskningsrapport finns i `data/review-summary-06.json`.
- ✓ gäller brottets identifierbara villkor, medan t.ex. syfte, misstankegrad, skyndsamhet och särskilda undantag kräver bedömning av polis/behörig beslutsfattare. `Direkt` betyder inte att polis alltid kan besluta utan övriga rekvisit; till exempel kräver beslag en laglig grundåtgärd.
- För brott med okänd straffskala eller otydlig lagklassificering bör systemet inte visa ett definitivt ja/nej som kan uppfattas som ett tillstånd.
- Övergångsbestämmelser och rättsläget vid gärningstillfället kan medföra att dagens straffskala inte kan användas bakåt.

**Officiella rättskällor:** [RB](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740/), [BrB](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), [Smugglingslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/), [Penningtvättsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/), [Skattebrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/), [Bidragsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/), [LBE](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/).

## Implementationsfiler

- `special-09.js`: 46 brott/straffskalor/förstadiekopplingar.
- `stages-08.js`: genererad, sökbar förstadiedatabas med separata statusar.
- `coercive-07.js`, `coercive-09.js`: tvångsmedel och strukturerad beslutsbehörighet.
- `index.html`: iPhone UI med kapitelindelning, filter och fyra häktningskort.
- `service-worker.js`: versionshanterad offline-cache.
