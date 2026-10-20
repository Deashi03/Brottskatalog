# Brottskatalog V1.4 – publiceringsversion (16 oktober 2026)

**Öppna i Safari:** https://deashi03.github.io/Brottskatalog/  
**Källkod:** https://github.com/Deashi03/Brottskatalog

V1.4 är publicerad från `main` för GitHub Pages. Det är en version av det tekniska referensverket, **inte** ett intyg om fullständig juridisk sakgranskning av samtliga poster. Vid operativa beslut ska gällande författning, gärningsdatum, särskilda rekvisit och beslutsbehörighet kontrolleras självständigt.

### Publiceringsavslut 2026-10-16

- Versionsuppgifter i sök- och inställningsvyn har samordnats till **V1.4**. Den kvarvarande etiketten `Arbetsversion 0.6` är rättad, liksom den gamla beskrivningen av appen som en designprototyp.
- Den installerade iPhone-appens offlinecache har fått nytt versions-ID. En frånkopplad förfrågan om JavaScript/JSON får inte längre webbplatsens HTML som felaktigt reservsvar.
- Befintliga tester av 22 särskilt kontrollerade specialstraffrättsliga straffskalor omfattar nu också versionsetikett och offline-reservsvar.
- Brottskortets viktiga funktioner, det hopfällda `Rättslig kontroll` längst ned och påminnelse först tre år efter dokumenterad sakgranskning är oförändrade.
- **Fortfarande ej slutgranskat:** maskinimporterade lagtextutdrag, alla förstadiebedömningars faktiska tillämpningsområde, historiska lydelser, övergångsbestämmelser och individuellt obekräftade straffskalor/åtalsundantag. Versionspubliceringen skapar inga nya juridiska kontrollintyg.

Se `scripts/special_penalties_14_test.mjs` och katalogens övriga testskript för maskinell regression. Testernas resultat måste verifieras i GitHub Actions; publicering är inte liktydig med godkänt testresultat.

---

# Brottskatalog 1.4 – straffskalor, juridisk spårbarhet och kvalitetstester (2026-10-15)

## Slutkomplettering 1.4 – 22 specialstraffrättsliga straffskalor (15 oktober 2026)

- **22 straffskalor jämförda mot officiella konsoliderade SFS:** 11 narkotikabrott (NSL 1–3 §§), 5 vapenbrott (VapenL 18 kap. 1–2 §§), 4 trafikbrott (TBL 3–4 a §§) och 2 knivbrott (KnivL 4 §). Kontroll gäller **numerisk straffskala och bötesstatus**, inte alla brottsrekvisit, tillämpliga gärningsformer eller lagtextens fullständighet.
- **Ingen tyst rättelse:** Om en registrerad straffskala avviker från kontrolltabellen registreras avvikelsen utan att ett nytt kontroll­datum anges; värdet skrivs aldrig över automatiskt. Motsvarande regressionstester finns i `scripts/special_penalties_14_test.mjs`.
- **Narkotika och särskild försäljningsvariant:** Den allmänna straffskalan i NSL 1 § första stycket får inte förväxlas med den särskilda lägstanivån sex månaders fängelse enligt andra stycket. Denna anmärkning är tillgänglig längst ned i den hopfällda `Rättslig kontroll`, utan ytterligare störande symboler i sökresultaten.
- **Kraschskydd för saknad källa:** `Rättslig kontroll` öppnas även om ett brott eller ett förstadium saknar egen laglänk eller en genererad förstadiepost saknar kopplad grundpost. Källfältet visar i sådana fall neutralt att underlaget saknas, i stället för att kasta ett JavaScript-fel.
- Offlinelagringen är versionsuppdaterad och testerna för de nya juridiska kontrollerna körs automatiskt med resten av appen.

**Viktigt:** Datum i straffskalegranskningen styr inte giltigheten för tidigare gärningar. Äldre lagversioner och eventuella övergångsregler måste fortfarande kontrolleras vid operativ användning.

**Officiella källor:** [Narkotikastrafflagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/), [Vapenlagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/), [Trafikbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/), [Knivlagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/).

## Uppdatering 1.4 – straffskalor i BrB 4 kap. och källversionsgranskning (15 oktober 2026)

Den här versionen tillför källkontrollerade straffskalor till tio polisrelevanta brottsrubriceringar: sex i BrB 4 kap. (ofredande, hemfridsbrott, olaga intrång, grovt hemfridsbrott, grovt olaga intrång och psykiskt våld) och fyra i BrB 17 kap. (våld eller hot mot tjänsteman, grovt våld eller hot mot tjänsteman, förolämpning mot tjänsteman och våldsamt motstånd). Straffskalorna har jämförts med Sveriges riksdags konsoliderade brottsbalk. Psykiskt våld har särskilt ikraftträdande `2026-07-01` markerat längst ned i Rättslig kontroll. Kontroll av straffskala innebär inte att maskinimporterad lagtext är juridiskt fullständighetsgranskad.

Den hopfällda rättsliga kontrollen redovisar nu även de explicita datum och obestämda ikraftträdandetidpunkter som förekommer i textutdrag. Ogiltiga kalenderdatum och framtida "sakgranskningsdatum" ignoreras som verifiering. Helkataloggranskningen listar samtliga återstående poster med okontrollerade straffskalor och omfattar källversionsinventering av inlästa bestämmelser. Kritiska och högprioriterade dataintegritetsfel stoppar numera katalogens CI-test.

**Begränsningar:** Versionsdatumen visas som källmetadata; appen väljer inte automatiskt rätt lydelse för gärningsdagen. Kvarstående automatimporterade lagtexter och ännu inte individuellt kontrollerade straffskalor står kvar som öppna granskningspunkter.


## Fortsatt kvalitetskontroll – 15 oktober 2026

- Rättslig kontroll, som ligger **sist och hopfälld** i brottskortet, kan visa exakta datum från lagtextens markeringar `Träder i kraft` och `Upphör att gälla`. Markeringarna är källuppgifter och innebär inte att appen automatiskt väljer rätt lydelse för en given gärningsdag.
- Ett **framtida** eller kalendermässigt **ogiltigt** datum får inte längre registreras som genomförd sakgranskning. Avvikelsen förklaras endast inne i den hopfällda kontrollpanelen. Treårspåminnelsen bygger fortfarande på senaste faktiskt daterade granskning.
- Kataloggranskningen kör nu en separat **källversionsinventering** för alla inlästa paragrafer. Rapporten listar vilka som innehåller alternativa lydelser och vilka ikraftträdanden som är beroende av regeringsbeslut.
- CI kontrollerar med regressionstester både verkliga och artificiella datumfall, inklusive 2027-01-01 och en obestämd regeringsdag. Offlinelagringen använder ett nytt cache-ID.
- Fortsatt begränsning: detta är en kontroll av **metadata och källversioner**, inte en garanti för att alla importerade lydelser eller förstadier har juridiskt slutgranskats.



## Slutkontroll 1.3 – rättslig giltighet och offline (15 oktober 2026)

- **1 157 sökbara poster:** 299 grundbrott och 858 förstadier.
- **Teknisk helgranskning:** 0 kritiska datafel i senast godkända genomgången. Strukturell granskning är inte juridisk sakkunnigverifiering.
- **Kvar att verifiera individuellt:** 251 maskinimporterade lagtextutdrag och 34 grundposter utan dokumenterad straffskalegranskning. Två brottsposter har importerad lagtext med markeringar om gällande/framtida lydelse och behöver särskild kontroll av gärningsdatum.
- **Rättslig kontroll** ligger fortfarande sist och hopfälld. En diskret markering visas bara efter tre år från en dokumenterad kontrolltidpunkt; saknas datum så påstår appen inte att posten har granskats.
- **Versionssäkring:** importerade bestämmelser som innehåller markeringar som ”Träder i kraft” eller ”Upphör att gälla” visas med förklaring i den nedersta kontrollpanelen. Appen väljer inte automatiskt rätt lagversion för ett gammalt eller framtida gärningsdatum.
- **Nya och ändrade BrB 20-brott:** missbruk av offentlig ställning och grovt missbruk av offentlig ställning har införts som egna poster; tjänstefel och brott mot tystnadsplikt har uppdaterats. Straffskalorna för 16 vanliga brott har dessutom kontrollerats separat.
- **Testskydd:** en regression läser den faktiskt importerade BrB 7:4-texten och kontrollerar att en framtida ikraftträdandemarkering upptäcks. Testkedjan kör även lagrum, förstadier, dataintegritet och mobila interaktioner.

**Avgränsning:** Uppdateringen innebär inte fullständig juridisk granskning av samtliga 1 157 poster. För polisiärt beslut måste gällande lagtext vid gärningstidpunkt, beslutsbehörighet och situationens rekvisit fortfarande kontrolleras.

---


## Kompletterande sakgranskning av 16 vanliga brott – 2026-10-13

Ett separat verifieringslager `core-penalties-13.js` har jämfört angivna numeriska straffskaleintervall mot brottsbalkens konsoliderade lagtext för **ringa stöld, stöld, grov stöld, inbrottsstöld, rån, grovt rån, misshandel, ringa misshandel, grov misshandel, synnerligen grov misshandel, bedrägeri, ringa bedrägeri, grovt bedrägeri, skadegörelse, ringa skadegörelse och grov skadegörelse**.

Samtliga **16** överensstämde med databasens lagrade min-/maxvärden och bötesstatus. Granskningsfält har därför knutits till just **straffskalan**, inte till lagtextens fullständighet eller alla rekvisit. Kodens säkerhetsspärr `scripts/core_penalties_13_test.mjs` förhindrar att en avvikande eller källändrad straffskala tilldelas nytt verifieringsdatum. Helkatalogens senaste gröna maskinella revision visar att antalet grundposter utan dokumenterad straffskalekontroll minskat från **50 till 34**; de **251 maskinimporterade lagtextutdragen** förblir en separat granskningskö.

[Godkänd testkedja med 16 kontroller och iPhone-test](https://github.com/Deashi03/Brottskatalog/actions/runs/38421089784).

**Källa:** [Brottsbalk (1962:700)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), kapitel 3, 8, 9 och 12. Historisk lagversion och särskilda övergångsregler måste fortfarande prövas efter gärningsdatum.

---

**[Öppna appen](https://deashi03.github.io/Brottskatalog/)** · [Senast verifierad grön testkedja](https://github.com/Deashi03/Brottskatalog/actions/runs/38419339176)

Den här uppdateringen har lagt till **missbruk av offentlig ställning** och **grovt missbruk av offentlig ställning** enligt **BrB 20 kap. 2 §**, med ikraftträdande den **1 augusti 2026**. Straffskalor och källuppgifter för tjänstefel, grovt tjänstefel och två grader av brott mot tystnadsplikt har jämförts med 2026 års lagändringar i BrB 20:1 och 20:3. Särskilt åtalsvillkor för tystnadsplikt till skydd för enskild har förtydligats enligt 20:5. Fältanteckningar har kompletterats för dessa tre näraliggande brottsgrupper.

**Rättslig kontroll ligger fortsatt hopfälld sist i brottskortet.** Endast där redovisas ikraftträdandedatum och uppmärksammas om ett maskinimporterat lagtextutdrag innehåller markeringar om parallella, framtida eller upphörande lydelser. Ingen grön status eller nytt juridiskt kontroll­datum skapas av en automatisk import. Den diskreta treårsmarkeringen är oförändrad.

Efter uppdateringen innehåller katalogen **1 157 sökbara poster**: **299 grundbrott**, **858 förstadier**. Databasen klassificerar 337 förstadier som straffbara och 521 som ej straffbara, men detta är **inte liktydigt med att varje slutsats juridiskt slutgranskats individuellt**. Öppna brister är fortfarande omkring **251 maskinimporterade lagtextutdrag**, **34 poster utan individuell dokumenterad straffskalekontroll**, samt två beroende/variabla straffskalor. En ny revisionsregel söker särskilt efter framtida giltighetsmarkeringar.

Källor: [Brottsbalken 20 kap.](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/) · [SFS 2026:1420 och ikraftträdandedatum](https://rkrattsbaser.gov.se/sfsr?bet=1962:700) · [Prop. 2025/26:217](https://www.regeringen.se/rattsliga-dokument/proposition/2026/04/prop.-202526217).

**Nästa prioritet:** individuell juridisk verifiering av maskinimporterade och tidsbundna lagtexter, inte utökning av de centrala menyerna.

---

# Brottskatalog 1.2 – färdigställande av databasens struktur (2026-10-13)

Senaste **hela** godkända integrations-, data- och iPhone-körning: [GitHub Actions](https://github.com/Deashi03/Brottskatalog/actions/runs/38414940218).

| Område | Nuvarande utfall |
|---|---|
| Sökbara poster | 1 149 (297 grundbrott, 852 förstadier) |
| Förstadier, kriminalisering enligt databasen | 337 straffbara; 515 ej kriminaliserade; 0 utan registrerad slutsats |
| Grundbrott med åtalsklassificering | 297/297 (215 allmänt åtal, 82 med särskilt villkor) |
| Offline lagtextutdrag | 297/297 grundposter (48 manuellt inlagda, 249 **maskinimporterade, ej juridiskt slutgranskade**) |
| Strukturerade straffskalor | 295/297. Två rubriker har ingen enda generell straffskala: brukande av falsk urkund samt arbetsmiljöbrott. |
| Fortsatta juridiska granskningsbehov | Minst 50 posters straffskaleverifikation saknas och 249 lagtextutdrag är maskinimporterade; de tidigare 12 otillräckliga negativa hänvisningarna för bidragsbrott har kompletterats med paragrafintervall. |

**Viktig skillnad:** Siffrorna visar strukturell datatäckning och maskinellt kontrollerade klassificeringar. De innebär **inte** att varje brottsrekvisit, förstadium, lagversion, straffskala eller åtalsregel har fått en oberoende fullständig juridisk sakkunniggranskning. Tillämplig lagversion på gärningsdagen måste fortfarande fastställas.

### Genomförda arbetsmoment

- Förstadier har klassificerats utifrån särskilda bestämmelser i BrB:s kapitel 3–22 samt tidigare granskade specialförfattningar. Poster behåller hänvisning till aktuell kriminaliseringsbestämmelse och separat granskningsunderlag. Särskilda gärningsformsundantag måste fortfarande prövas.
- Officiella SFS-texter har importerats för smugglingslagen, penningtvättsbrottslagen, skattebrottslagen, bidragsbrottslagen och lagen om brandfarliga och explosiva varor. Extraheringen kör kontroller som hindrar publicering av felklippta paragrafutdrag.
- De sista 12 oklassificerade grundbrottens åtalsregler har kompletterats utifrån BrB 11:8, 16 och 17 kap., inklusive villkor för vårdslöshet mot borgenärer och ringa bokföringsbrott.
- De tidigare visade straffskalorna har normaliserats till numeriska intervall där detta är entydigt möjligt; importerad/normaliserad information får inte automatiskt ett datum för juridisk sakgranskning.
- Katalogens juridiska kontrollmeny ligger fortfarande hopfälld längst ned på kortet med diskret treårsmarkering när ett faktiskt dokumenterat kontrolltidpunkt finns.

### Nästa krav för en juridiskt slutgranskad release

1. Individuell rättskällejämförelse av de **249 maskinimporterade** lagtextutdragen inklusive rätt lydelse för gärningsdatum och övergångsbestämmelser.
2. Kontroll av varje förstadies tillämpningsområde, gärningsform och eventuella negativa undantag; särskilt relevanta undantag och gärningsformer.
3. Dokumentera och granska de **50** poster vars straffskaleverifikation ännu saknas.
4. Bevara synliga villkor för de två brott där straffskalan beror på det underliggande brottet – ange **aldrig** ett enda fabricerat intervall.

---
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


### V1.5 arbetsavstämning 20 oktober – 83,6 %

Arbetsgrenen har nu 9 984/11 948 avslutade moment, 1 964 återstår. Detta pass avslutar 326 befintliga grundbrottskontroller av aktuell förstadiekriminalisering och en ny regression. Fem grova brottsgrader hade felaktigt negativa förstadiebesked; 13 kombinationer är rättade mot grund- och kriminaliseringsparagrafen med bevarat ersättningsregister. Alla 452 positiva förstadiekombinationer har rekvisitöversikter. Grundkortens förstadieavsnitt visar daterade källförklaringar och uttryckliga undantag.

56 positiva förstadier har fortfarande öppen individuell straffskaleprövning. 1 946 juridiska delmoment och 18 publiceringsmoment återstår; inga fullständiga juridiska slutgodkännanden har tillkommit. V1.5 är fortsatt utkast i PR #2. Se den senaste avstämningen i `docs/V15-PUBLICERINGSPROGRESS.md`.


### V1.5 arbetsavstämning 20 oktober – 85,0 %

174 individuella aktuella gradfrågor är källgranskade och visas som hopfälld fördjupning i rekvisitfunktionen. 101 fullständiga BrB-paragrafer ligger till grund för gradregler, uttryckliga indikatorer och gränser mot andra gärningsformer eller ansvarsfrihet. Hänvisningsbrott får separata källberoenden. Ändrad källtext eller en befintlig granskarspärr lämnar kontrollen öppen.

10 159/11 949 arbetsmoment är avslutade, 1 790 återstår. Det nya blocket avslutar 174 befintliga moment och ett testkommando, utan ändrad brottsinventering. Samtliga grundrekvisit, straffskalor och övriga revisionsdimensioner är bevarade. Ingen konkret brottsgrad eller fullständigt juridiskt slutgodkännande har fastställts genom dessa lagtextskontroller. V1.5 förblir utkast i PR #2.


### V1.5 arbetsavstämning 20 oktober – 95,1 %

345 individuella kontroller kopplar paragraftextens angivna ändringslag till dess ikraftträdande och publicerade övergångsbestämmelser. Underlaget består av 83 primära register-/tidskällor. 45 kort utan säkert kartlagd ändringshänvisning eller ikraftträdandedag hålls öppna. En hopfälld fördjupning under lagtexten förklarar datum, äldre lydelse, senare lindrigare lag och aviserad framtida lydelse. Gärningstidpunkten och äldre lagversioner väljs inte automatiskt.

18 ytterligare kontroller av uttryckliga begränsningar i BrB 3 och 12 kap. använder 17 källparagrafer. Rekvisitfunktionen har nu sådana förklaringar för 260 grundkort. Skillnaderna mellan ringa oaktsam personskada, straffbar ringa gärning, åverkan/tillgrepp och färd över mark hålls uttryckliga.

11 371/11 955 arbetsmoment är avslutade, 584 återstår. Senaste passet avslutar 363 befintliga databasfrågor och två nya testkommandon. Inventeringen är oförändrad. Aktuell källavgränsad delgranskning ersätter inte praxis, full historisk lagjämförelse eller konkret tillämpning. Ingen brottspost är fullständigt juridiskt slutgodkänd. V1.5 är fortsatt utkast i PR #2.

### 20 oktober 2026 – återstående uttryckliga begränsningar

**96,2 %: 11 502 av 11 956 arbetsmoment.** Ökningen från 95,1 % består av **130 individuella lagtextbundna begränsningskontroller** och ett nytt regressionskommando. Målet 97,5 % är ännu inte uppnått; ytterligare 156 avslutade moment skulle krävas med denna nämnare. Inga förarbets-/praxisdelgranskningar räknas som färdiga slutmoment.

`remaining-statutory-limits-review-15.js` omfattar 130 grundkort, 98 egna straffparagrafer och 110 låsta källparagrafer. Fördelning: BrB 8 kap. 14 kort, 9 kap. 22, 10 kap. 17, 11 kap. 9, 16 kap. 23, 18 kap. 5, 19 kap. 20, 21 kap. 12 och 22 kap. 8. Tillsammans med tidigare kontroller har alla **390 grundkort** nu lagtextbundna avgränsningsanteckningar i den expanderbara Rekvisitfunktionen.

Särskilt kontrollerat: mindre allvarlig inbrottsstöld/rån leder till prövning av annat brott, inte automatisk straffrihet; betalningsverktygsbrottets uttryckliga subsidiaritet; rättelse och ursäkt i BrB 11:2; barnpornografibrottets hänvisning till 16:10 b; försvarlighetsregelns olika räckvidd i 19 kap.; krigsmannakrets och kapiteltillämplighet i 21:1–4; det utvidgade fiendebegreppet i 21:16; samt ockupationsundantaget i 22:4. 22:10:s utsträckning av krigsvillkor överförs inte automatiskt till 18 kap. Konventionsdefinitioner för kemiska vapen och minor lämnas uttryckligen till fortsatt självständig kontroll.

Regressionen provar både sakliga gränser och att ändrad/inkomplett källa, fel källadress, maskintext eller en redan öppen kontroll stoppar nytt godkännande. Övriga uppgifter på samtliga 1 557 poster bevaras. Mobiltestet har ytterligare elva avgränsningsfall och datumförväntningen för egenmäktighet med barn följer appens svenska datumformat.

**3 074/3 510 juridiska delmoment** är källavgränsat avslutade. **454 arbetsmoment återstår:** 45 tidsfrågor, 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 frisläppningsmoment. Fullständig konkurrens, allmänna ansvarsfrihetsgrunder, historisk jämförelse och konkret rättslig tillämpning ingår inte i dessa begränsningskontroller. Inga fullständiga juridiska slutgodkännanden utfärdas; 56 individuella förstadiestraffskalor förblir releaseblockerande.

### 21 oktober 2026 – författningskommentarer utan nya praxisgodkännanden

50 grundkort har fått individuellt kopplade anteckningar till **prop. 2025/26:218, avsnitt 10.1**, i en egen expanderbar del av Rekvisit. Underlaget avser 32 egna straffparagrafer. Förklaringar om bibehållna gradgränser, borttagen grov förolämpning, mindre allvarlig mened och gemensamt livstidsstraff för flerfaldig brottslighet ska motverka att reformens straffnivåer uppfattas som nya automatiska rekvisit.

Anteckningarna är kontrollerade mot respektive aktuella fullständiga SFS-paragraf och stoppas vid käll- eller textavvikelse. De ändrar inga befintliga rekvisit, straffskalor, förstadier, åtalsvillkor, tvångsmedelsstatus eller juridiska kontrollmarkeringar. **Ingen av de 390 förarbets-/praxisfrågorna avslutas genom dessa avgränsade anteckningar.**

Ett nytt regressionskommando och fem ytterligare mobilfall ingår. Den räknade statusen är **11 503/11 957 = 96,2 %**, med **454 moment kvar**. Det är fortfarande 156 avslutade moment till avrundade 97,5 % enligt nuvarande nämnare; målet är inte uppnått. Fullständig juridisk acceptans och publicering kvarstår.

Primärkälla: [Riksdagens proposition 2025/26:218](https://data.riksdagen.se/dokument/HD03218), respektive paragrafkommentar i avsnitt 10.1. Källans hämtade text har SHA-256 dokumenterad i `data/preparatory-reform-notes-15.json`.
