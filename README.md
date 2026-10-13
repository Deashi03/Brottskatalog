## Uppdatering 1.1 – Rättslig kontroll längst ned (2026-10-13)

- Brottskortets sista funktion före versionsfotnoten är nu **Rättslig kontroll**, en liten grå rad som är **stängd som standard**. Inget visas före lagtext, straffskala, häktning eller tvångsmedel.
- Detaljvyn redovisar lagtextens granskningsstatus, straffskalans kvalitet, åtalets källstatus, förstadiebedömningen, en officiell författningslänk och att historisk/gällande lagversion **inte** fastställs automatiskt.
- **Efter tre år** från en faktisk dokumenterad rättslig kontroll visas en lågmäld bärnstensfärgad markering **Äldre kontroll** på just den nedersta raden. Appen söker inte efter eller ändrar lagtext av sig själv. Användaren avgör när en ny uppdatering ska göras.
- En maskinimport, automatiskt genererat förstadium eller en generell åtalsklassificering räknas **inte** som individuell juridisk sakgranskning. Om kontrolltidpunkt saknas står det uttryckligen så. Det utlöser ingen falsk ”tre år gamla data”-varning.
- Straffskalorna för förberedelse och stämpling till särskilt grova brott har justerats där böter inte kan ingå och där de numeriska gränserna är villkorade av BrB 23:2. Tidigare automatiska värden ska fortsatt granskas mot rätt gärningsform.
- Saknat fält för källa vid redan registrerat allmänt åtal får en uttrycklig hänvisning till **RB 20:3 som huvudregel**, men med tydlig anteckning om att specialundantag inte är individuellt verifierade. Detta är inte ett bevis för att allmänt åtal är tillåtet i alla omständigheter.
- Ändringarna testas med `scripts/quality_11_test.mjs` (treårsgräns, saknade datum, rätt placering) samt befintliga katalog- och mobiltester.

**Viktigt:** En genomförd databasrevision gör inte 406 ogranskade förstadier eller 46 saknade offline-lagtexter juridiskt fullständiga. De redovisas fortsatt som granskningsbehov. Ingen kontrollmarkering ändras enbart för att en kodfil har uppdaterats.

# Brottskatalog 1.0 – tydligare straffskalor, beslutsbehörighet och åtalsregler

**Safari:** https://deashi03.github.io/Brottskatalog/

## Förändringar i denna uppdatering

- Straffbara förstadier har separata fält för **LÄGST** och **HÖGST**. Exempel: försök till mord visas som lägst fängelse 1 månad och högst fängelse 18 år eller livstid; detta bygger på BrB 23:1 jämförd med 26:1 och är inte samma straffminimum som för fullbordat mord.
- Tvångsmedelsmenyn visar nu **en kort beslutsväg**, exempelvis `Polisman beslutar`, `Polisman FID` eller `FU-ledare`. Åklagare och rätten göms från huvudlistan.
- Beslut med särskilda villkor får ett **tryckbart utropstecken**. Beslag enligt RB 27:4 redovisas som två olika beslutssituationer: föremål som påträffas vid en redan laglig tvångsåtgärd, respektive fristående fynd där FU-ledare/åklagare eller polisman vid FID beslutar. Andra villkorsberoende åtgärder har motsvarande korta förklaringar.
- Åtalsregler klassificeras bredare. **Grön bock** anger registrerat allmänt åtal; orange symbol anger åtalsvillkor/undantag; neutral informationssymbol betyder att regeln inte är slutligt verifierad.
- Ytterligare genomgång för bl.a. smugglingslagen 20 §, skattebrottslagen 13 och 13 b §§, bidragsbrottslagen 6 a § och BrB 19:16. Straffbara förstadier ärver en kontrollerad åtalsklassificering från grundbrottet när möjligt.
- Den befintliga kapitelindelningen RB 23–28, mörkt läge och scrollningen ovanför nedersta navigationsfältet behålls.

**Begränsningar:** Detta är ett juridiskt stödverktyg under utveckling. Allmänna åtalsregler innebär inte att brottet får åtalas utan hänsyn till specialbestämmelser, gärningstidpunkt och eventuell åtalsprövning i ett särskilt fall. En grön bock för tvångsmedel betyder endast att brottets automatiskt identifierbara villkor inte utesluter åtgärden. Företagna kontroller ersätter inte lagtext eller behörig beslutsprövning. Äldre poster och specialstraffrättsliga begränsningar återstår att slutgranska.

**Källor:** [Brottsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), [Rättegångsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740/), [Smugglingslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/), [Skattebrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/), [Bidragsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/).

## Tidigare version 0.9


**iPhone / Safari:** https://deashi03.github.io/Brottskatalog/

> Juridisk arbetsversion. Straffskalestatus är inte ett självständigt beslut om tvångsmedel. Kontrollera exakta lagrum, misstankegrad, gärningsform, beslutsbehörighet, proportionalitet och aktuellt rättsläge innan operativa beslut.

## Nyheter 0.9

- **✓ / ✕ direkt på varje tvångsmedel** för om brottets straffskala eller brottstyp kan medge den aktuella åtgärden. Grön bock innebär **inte** att person- eller situationsberoende rekvisit har prövats.
- **Polisbeslut separat:** `Direkt`, `FID`, `Direkt / FID`, `Nej` eller `Särskild regel`. Andra beslutsfattare och exakta regler syns i expanderbar detalj. FID = fara i dröjsmål.
- **Snabbare färgkodning i ljus och mörk vy:** grön ✓ för möjlig prövning utifrån brottet, rött ✕ när brottsvillkoret inte är uppfyllt, grå informationssymbol när uppgiften inte är verifierad. Status för beslutsbehörighet visas som egna etiketter under åtgärden.
- **Beslutsfattare i klartext:** `Polisman beslutar` (polisman med egen beslutsbehörighet), `Polisman FID`, `FU-ledare`. Där tillämpligt visas också `Åklagare` eller `Rätten`. Flera etiketter betyder alternativa behörighetsvägar med olika förutsättningar, inte att alla kan besluta i samma situation.
- **Visa endast ✓** kan filtrera listan. Grupperingen RB 23–28 behålls; hemliga tvångsmedel visas inte. Fasta paragrafhänvisningar visas utan att avslutande bokstäver i t.ex. 23:8 a, 23:9 a och 27:1 a kapas.
- **27 synliga åtgärder:** tidigare 24 plus 3 kompletteringar i RB 23:8–9 om medtagande och kvarstannande vid förhör. Strukturerad beslutsmetadata finns för samtliga.
- **46 nya sökbara grundposter**, med straffskalor och särskild förstadiekriminalisering enligt:
  - Lag (2000:1225) om straff för smuggling, inklusive narkotika-, vapen- och explosivvarusmuggling och tullbrott.
  - Lag (2014:307) om straff för penningtvättsbrott.
  - Skattebrottslag (1971:69).
  - Bidragsbrottslag (2007:612).
  - Lag (2010:1011) om brandfarliga och explosiva varor.
- Förstadieposterna omfattar försök, förberedelse och stämpling till tillämpliga brott. **Ej straffbart** förutsätter kontrollerad särskild regel eller ett explicit granskat undantag. **Ej verifierat** används annars. Ett fel i normalisering av svenska tecken (t.ex. ä i ringa stöld) upptäcktes och rättades under regressionstestningen.
- Lagtext först i brottskortet. Sökresultaten är fortsatt avskalade till brottsrubricering, lagrum och straffskala, med röd/grå markering för förstadier som kräver det.
- De nya brottsfamiljerna och förstadierna får utredningsuppslag efter att databasen är färdigladdad. Fältstödet innehåller särskilda anteckningar för smuggling, penningtvätt, skattebrott, bidragsbrott och explosiva varor.
- Offline-cachen laddar de nya JS-modulerna vid första uppkopplade besöket.

**Visningsregel:** En och samma åtgärd visar aldrig både `Polisman beslutar` och `Polisman FID`. När polisman kan besluta direkt visas enbart `Polisman beslutar`; FID-vägen kan i förekommande fall framgå av den expanderade beskrivningen. Andra beslutande organ får fortfarande egna etiketter.

**Navigering på iPhone:** Sökresultat, Sparat och Mer skrollar i ett eget område ovanför navigationsfältet. Baren är inte längre ett flytande lager över korten, så inget sökresultat döljs under den.

## Kontroller

- `scripts/stage_rules_test.mjs` provar uttryckligen centrala kriminaliseringsgränser och undantag.
- `scripts/integration_09.mjs` läser in samtliga brottsdata och kontrollerar ID:n, straffskalor, förstadier, lagrumsreferenser, tvångsmedel, polisbeslut, beroenden och cache.
- `scripts/ui_smoke.mjs` kör iPhone-liknande Playwright-test för sökning, lagtext, häktning, ✓/✕, FID och filter. GitHub Actions startas för push på main som berör dessa filer.
- Därutöver har urval av straffskalor och förstadier jämförts mot Riksdagens konsoliderade lydelser per 2026-10-13.

## Kvarstående begränsningar och granskningspunkter

- **Ny specialstraffrättslig lagtext visas via officiella källänkar, inte som fullständigt offline-inläst lagtext.** Dessa poster har `lawMode: missing`; inga genererade parafraser presenteras som ordagrann lagtext.
- Äldre katalogposter och vissa förstadieundantag behöver fortfarande individuell lagtext- och åtalsgranskning. Vissa äldre maskinimporterade lagtexter kan vara ofullständiga. Tidigare granskningsrapport finns i `data/review-summary-06.json`.
- Om ett straffskaleunderlag saknar verifiering visas en neutral informationssymbol i stället för ett missvisande rött kryss.
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
