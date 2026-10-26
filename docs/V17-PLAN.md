# Brottskatalog 1.7 – granskning av 1.6.2 och planerad uppdatering

**Granskat:** `main` @ `4eae461` (Brottskatalog 1.6.2), 2026-10-26
**Underlag:** hela katalogen (1 551 sökingångar: 393 grundkort, 1 158 förstadiekort) som den faktiskt laddas i webbläsaren, lagtexten som är lagrad i repot (`BK_STATUTES`, `data/procedural-source-review-15.json`, `brb-curated-lawtext-15.js`) samt de vyer användaren ser (detaljkort, häktningsvy, tvångsmedelslista).

**Avgränsning:** riksdagen.se och data.riksdagen.se gick inte att nå från granskningsmiljön. Appens uppgifter har därför jämförts mot repots egen lagrade lagtext och mot allmänt etablerad rätt. Punkter som kräver kontroll mot officiell källa är märkta **[verifiera]**. Det finns inga öppna issues i repot.

---

## 1. Sammanfattning

| Prio | Antal | Kärnan |
|---|---:|---|
| Kritisk | 1 | Häktningsvyn anger **"Endast särskild grund (RB 24:2)"** för 413 straffbara förstadier och 30 grundbrott där RB 24:1 i själva verket kan vara tillämplig, bland annat försök till stöld, rån, våldtäkt och grov misshandel samt landsförräderi. |
| Hög | 2 | Tvångsmedelslistan på förstadiekort ger inget positivt besked ens för åtgärder som saknar straffskalekrav. Häktningspresumtion visas utan förbehåll för brott med en privilegierad ("mindre grovt") straffskala. |
| Medel | 5 | Saknade eller otydliga förstadiebegränsningar (dataintrång, utpressning), motsägelsefulla straffskaletexter i 123 förstadiekort, trafikkort från 1.6 med rubriceringar som inte finns i lagen samt fel lagrum för åtal. |
| Låg/verifiera | 4 | Ringa vållande till annans död saknas, proportionalitet saknas i RB 24:2-kortet, en praxishänvisning och en rättegångsbalkslänk som troligen är trasig. |
| Övrigt | 9 | Inaktuell README, för många symboler med dubbel betydelse, utspridda versionssträngar, 7,9 MB JS per sidladdning, tester som cementerar felet, ogranskad lagändring i BrB. |

Det som fungerar bra: **förstadiernas straffbarhet** (stickprov på BrB 4, 6, 8, 9, 12, 14 och 17 stämmer med 4:10, 6:15, 8:12, 9:11, 12:5, 16:17 och 17:16), **åtalsreglerna** (4:11, 8:13, 9:12, 10:10, 12:6, 3:12 och 5:5 återges korrekt) och **straffskalorna för grundbrotten** stämmer med den lagrade lagtexten.

---

## 2. Juridiska fel

### J1 – KRITISK: Häktningsvyn gör ett "ej verifierat" till ett "ej tillämpligt"

**Var:** `index.html`, `custodyAssessment162()` och `custodyLabel()` (rad cirka 1004–1013 och 1451–1471).

**Felet:** RB 24:1 första stycket kräver att fängelse i ett år eller mer är föreskrivet för brottet. För försök döms straffet "högst till vad som gäller för fullbordat brott" (BrB 23:1 tredje stycket). Förberedelse och stämpling döms "under den högsta gränsen" för fullbordat brott (BrB 23:2). Har det fullbordade brottet ett maximum på minst ett år är alltså villkoret i 24:1 i regel uppfyllt även för förstadiet.

Appen kräver däremot `penaltyRangeVerified === true` och avsaknad av ett flertal granskningsflaggor. Om något av detta saknas sätts `ordinary = false`. Statusraden visar då **"Endast särskild grund (RB 24:2)"**, och 24:3-kortet visar "Endast via RB 24:2". En osäker uppgift blir på så sätt ett negativt rättsligt besked.

**Omfattning, uppmätt i webbläsaren:**
- **413** straffbara förstadiekort där det fullbordade brottet har ett maximum på minst ett år. Exempel: försök till stöld, försök till rån, förberedelse till rån, försök till misshandel, försök till grov misshandel, försök till våldtäkt och försök till dataintrång.
- **60** förstadiekort visar *häktningspresumtion ✓* samtidigt som *huvudregeln 24:1 ✕*, till exempel försök till mord och försök till grovt rån. Det är internt motsägelsefullt eftersom presumtionen är en del av 24:1.
- **30** grundkort med ej verifierad eller härledd skala får samma etikett, bland annat:
  - Landsförräderi (lägst 4 år eller livstid, borde ge presumtion)
  - Vårdslöshet med hemlig uppgift (högst 1 år)
  - Brukande av det förfalskade (samma skala som förfalskningsbrottet enligt BrB 14:10)
  - Arbetsmiljöbrott
  - Grovt lydnadsbrott

**Risk:** En polis kan tro att häktning eller anhållande på grund av flyktfara, kollusionsfara eller recidivfara är utesluten, till exempel vid försök till våldtäkt.

**Åtgärd 1.7:** Gör bedömningen trevärd: `uppfyllt`, `ej uppfyllt` och `ej verifierat`.
- För förstadier beräknas villkoret i 24:1 utifrån fullbordat brotts maximum (`stageParentMax`/`stageParentLife`), med de begränsningar som följer av BrB 23:1–2.
- `ej verifierat` visas som grått "?" med texten *"Straffskalan är inte verifierad – kontrollera mot lagtext"*, aldrig som rött ✕ och aldrig som "Endast särskild grund".
- Presumtionen får inte visas grön om huvudregeln inte samtidigt visas grön (invariant i test).

### J2 – HÖG: Tvångsmedelslistan på förstadiekort ger inget positivt besked någonstans

**Var:** tvångsmedelslistan (`coercive-07.js`, `coercive-09.js`, `coercive-safety-15.js` och `unresolvedForCoercion15`).

**Felet:** "Försök till stöld" visar 0/6 för RB 23, 0/1 för RB 25, 0/2 för RB 26, 0/7 för RB 27 och 0/11 för RB 28. Alla rader visar *"Straffskala, förstadieansvar eller tillämplighet kräver individuell kontroll – inget positivt tvångsmedelsbesked"*. Det gäller även åtgärder som saknar straffskalekrav:
- medtagande till förhör från brottsplatsen (RB 23:8 första stycket)
- beslag (RB 27:1 och 27:4)
- bevarandeföreläggande (RB 27:16)
- husrannsakan i offentlig lokal (RB 28:3 första stycket)

Grundbrottet "Stöld" visar samtidigt 4/6, 7/7 och 10/11.

**Åtgärd 1.7:**
- Åtgärder med `scale:'any'` ska alltid visas som "Ingen straffskalegräns".
- För `f`/`one`/`four` används samma förstadieberäkning som i J1. Kravet på fyra år i RB 23:8 andra stycket, 23:8 a och 28:2 a omfattar uttryckligen "försök till sådant brott" men inte förberedelse eller stämpling. Det är redan rätt modellerat i `scale==='four'` och behålls.

### J3 – HÖG: Häktningspresumtion visas utan förbehåll vid privilegierad straffskala

RB 24:1 andra stycket 1 gäller brott för vilket det "inte är föreskrivet lindrigare straff än fängelse i ett år och sex månader". Följande kort visar "Häktningspresumtion" fast samma brott har en lindrigare skala för mindre grova eller mindre allvarliga fall (enligt den lagrade lagtexten):

| Brott | Privilegierad skala |
|---|---|
| Människorov (BrB 4:1) | mindre grovt: högst 6 år |
| Människohandel (BrB 4:1 a) | mindre grovt: 6 mån–4 år |
| Våldtäkt (BrB 6:1) | mindre grovt: 6 mån–4 år |
| Mordbrand (BrB 13:1) | mindre allvarligt: 1–3 år |
| Allmänfarlig ödeläggelse (BrB 13:3) | mindre allvarligt: 1–3 år |

Rån påverkas inte, eftersom ett mindre allvarligt fall enligt BrB 8:5 rubriceras som ett annat brott.

**Åtgärd 1.7:** Lägg till fältet `privilegedScale` och visa *"Presumtion – gäller inte om gärningen bedöms som mindre grov/mindre allvarlig"*. **[verifiera]** Hur presumtionen tillämpas vid privilegierad skala är en tolkningsfråga och bör stämmas av mot doktrin eller åklagare innan texten fastställs.

### J4 – MEDEL: Försök och förberedelse till dataintrång saknar ringa-begränsningen

BrB 4:10 andra stycket kriminaliserar bara försök eller förberedelse till dataintrång "som om det fullbordats inte skulle ha varit att anse som ringa". Kortet saknar begränsningen. Motsvarande begränsning för tillgrepp av fortskaffningsmedel (BrB 8:12) visas däremot korrekt.

**Åtgärd:** Lägg in begränsningen i `stageExplanation` för båda korten och lägg till ett regressionstest.

### J5 – MEDEL: Försök till utpressning – otydlig och motsägelsefull text om frivilligt tillbakaträdande

Enligt BrB 9:11 ska 23:3 **inte** tillämpas på försök till utpressning, ringa utpressning eller grov utpressning. Kortet skriver *"det särskilda undantaget från reglerna om frivilligt tillbakaträdande i 23:3 gäller"*, vilket kan läsas tvärtom. Samtidigt säger den generiska rekvisitlistan på samma kort *"Frivilligt tillbakaträdande enligt 23:3 ska prövas"*.

**Åtgärd:** Skriv uttryckligen *"Frivilligt tillbakaträdande (BrB 23:3) ger inte ansvarsfrihet vid försök till utpressning (BrB 9:11)"* och ta bort den generiska raden för dessa tre kort.

### J6 – MEDEL: Motsägelsefulla straffskaletexter för förstadier

- **24 kort** har en straffskaletext som börjar med "Böter eller fängelse…", medan den lagrade skalan saknar böter och förklaringen anger lägst en månads fängelse. Exempel: förberedelse eller stämpling till mord, dråp, synnerligen grov misshandel och synnerligen grovt narkotikabrott.
- **99 kort** har formuleringen *"lägre än X år och högst 2 år"*, till exempel "Förberedelse till narkotikabrott · innehav: lägre än 3 år och högst 2 år". Det är tekniskt härlett ur BrB 23:2, men svårläst och lätt att missförstå.

**Åtgärd:**
- Generera texten från en och samma källa (`penaltyRange` plus förstadieregel).
- Exempel på ny text: *"Under 2 år (BrB 23:2)"* och *"Under 3 år – högst 2 år eftersom fullbordat brott har max under 6 år (BrB 23:2)"*.
- Lägg till ett test som underkänner kort där texten säger "böter" men `fines === false`.

### J7 – MEDEL: Trafikkorten i 1.6 (`traffic-16.js`)

1. "Grov smitning från trafikolycksplats", "Tillåtande av olovlig körning" och "Onödigt hindrande av trafik" är beskrivande sökbenämningar, inte lagens rubriceringar. De ska märkas "Beskrivande sökbenämning", som appen redan gör för vissa andra brott, så att fel rubricering inte förs in i en anmälan.
2. Den återgivna texten för TBL 5 § saknar brottsbeteckningen "smitning från trafikolycksplats" men är ändå markerad `lawCompletenessVerified: true`. **[verifiera]** mot SFS 1951:649 och rätta antingen texten eller fullständighetsflaggan.
3. `prosecutionRule` hänvisar till **RB 20:2**. Allmänt åtal följer av **RB 20:3**, medan 20:2 anger vem som för talan.

### J8 – LÅG: RB 24:2-kortet saknar proportionalitet och bötesfrågan

Proportionalitetsregeln i RB 24:1 tredje stycket anses gälla all häktning, men den nämns bara i 24:1-korten.

**Åtgärd:** Lägg till *"Proportionalitet krävs alltid"* i 24:2-kortet. **[verifiera]** om och hur bötesförbudet i 24:1 fjärde stycket påverkar 24:2, och formulera texten därefter.

### J9 – LÅG: Ringa vållande till annans död saknas

BrB 3:7: om brottet är ringa döms till böter. Kortet visar "Fängelse högst 3 år" med `fines: false`.

**Åtgärd:** Lägg till ringa grad eller en not om den.

### J10 – Verifiera

- Ordlistan för "det tillgripnas värde" anger *"1 500 kr … enligt NJA 2025 s. 1024"*. Kontrollera referens och belopp.
- Länken till rättegångsbalken slutar på `…sfs-1942-740framtagen/`. Den förekommer på cirka 160 ställen, bland annat i "Mer"-vyn i `index.html`, i `references-06.js` och i `procedural-*.js`. Den är troligen trasig; korrekt adress bör vara `…rattegangsbalk-1942740_sfs-1942-740/`. Testa länken.
- `data/source-status.json` anger för BrB `observedChange: true` (observerad version 2026:1656, 2026-10-19) och `verifiedVersion: null`. Lagändringen har inte granskats. Gå igenom 2026:1656 före 1.7.

---

## 3. Andra fel och otydligheter

| # | Problem | Risk | Förslag |
|---|---|---|---|
| O1 | README har fortfarande rubriken "V1.5", saknar ändringslogg för 1.6–1.6.2 och anger 390 grundkort mot 393 i appen. | Användaren får fel bild av vad som är granskat. | Ny README-topp för 1.7 och en separat `CHANGELOG.md`. |
| O2 | `QUALITY-REVIEW-2026-10-13.md` innehåller inaktuella siffror (1 149/1 157 poster). | Föråldrade uppgifter kan citeras. | Markera som historisk och länka till denna plan. |
| O3 | Teckenförklaringen "✕ = brottskravet ej styrkt" blandar ihop *ej uppfyllt* och *ej verifierat*. | Samma grundorsak som J1 och J2. | Tre symboler: ✓ uppfyllt, ✕ ej uppfyllt, ? ej verifierat. |
| O4 | Versionssträngen är hårdkodad på minst 6 ställen i `index.html` och dessutom i manifest, service worker och tester. | Versioner kommer ur fas. | En enda konstant `BK_RELEASE` som allt annat läser. |
| O5 | 180 skriptfiler laddas i följd och skriver över varandras fält (`*-15.js`). | Svårt att veta vilket lager som gäller, och regressioner som J1 slinker igenom. | Bygg ett konsoliderat `data/catalog-1.7.json` och behåll lagren som byggkällor, inte som körtidspatchar. |
| O6 | 7,9 MB JS laddas vid varje sidladdning. Stora filer finns dubbelt som `.js` och `.json`, till exempel `base-coercion-review-15` (1,3 MB + 1,7 MB). | Långsam start på iPhone och att iOS rensar cachen. | Ladda granskningsdata först när kortet öppnas. Leverera bara konsoliderad data till klienten. |
| O7 | `scripts/custody_162_test.mjs` kräver att `penaltyRangeVerified:false` ger `ordinary:false`. | Testet cementerar J1. | Skriv om testet enligt avsnitt 5. |
| O8 | Polisens vanligaste frihetsberövanden saknas: gripande (RB 24:7, inklusive envarsgripande som kräver fängelse i straffskalan) och anhållande (RB 24:6). | Lucka i det praktiska användningsfallet. | Se förslag F1. |
| O9 | `data/law-sources.json` har `verifiedVersion: null` för alla källor. | Det finns ingen spårbar "granskad mot SFS X"-uppgift. | Fyll i vid release, och låt release-spärren kräva det. |

---

## 4. Förbättringsförslag

- **F1. Gripande och anhållande.** Lägg till kort för RB 24:6 (anhållande), 24:7 första stycket (polisgripande) och 24:7 andra stycket (envarsgripande, kräver fängelse i straffskalan). Den lagrade lagtexten finns redan i `BK_STATUTES`.
- **F2. Tydligare statusrad.** Visa "Häktning: kan vara möjlig / presumtion / endast 24:2 / **ej verifierat**" med samma tre färger som tvångsmedelslistan.
- **F3. Varningsflaggor i straffskalepanelen** för privilegierad skala (J3), ringa-undantag (J4) och undantag från 23:3 (J5).
- **F4. Konsekvenstester över hela katalogen** (avsnitt 5) i stället för fler punkttester per version.
- **F5. Felrapport via GitHub-issue-mall** (`.github/ISSUE_TEMPLATE/felrapport.yml`) med samma fält som appens kopierade mall.
- **F6. Synlig granskningsstatus per kort:** "Lagtext kontrollerad mot SFS ____ den ____". Detta efterfrågas redan i kvalitetsrapporten (avsnitt D).

---

## 5. Planerad uppdatering – Brottskatalog 1.7

### Mål

Inga negativa rättsliga besked som bygger på bristande verifiering, konsekvent förstadielogik i häktnings- och tvångsmedelsvyerna, rättade texter och aktuell dokumentation.

### Arbetspaket

| AP | Innehåll | Filer (huvudsakligen) | Ref |
|---|---|---|---|
| AP1 | Ny häktningsbedömning: trevärd, förstadier via fullbordat brotts skala, invariant presumtion ⇒ huvudregel, privilegierad skala | `index.html` (`custodyAssessment162` → `custodyAssessment17`), ny `data/privileged-scales-17.json` | J1, J3, J8 |
| AP2 | Tvångsmedelslistan: `any` alltid neutral, förstadieberäkning delad med AP1, ny teckenförklaring ✓/✕/? | `coercive-07.js`, `coercive-safety-15.js`, `index.html` | J2, O3 |
| AP3 | Förstadietexter: generera straffskaletext ur en källa; rätta dataintrång och utpressning | ny `stage-text-17.js`, `missing-stage-cards-15.js`, `stages-08.js` | J4, J5, J6 |
| AP4 | Trafikkort: sökbenämningar, TBL 5 § fulltext, RB 20:3 | `traffic-16.js` | J7 |
| AP5 | Mindre rättelser: ringa vållande till annans död, RB-länk, verifiering av NJA-referens | `catalog-*.js`, `references-06.js`, `index.html`, `glossary-03.js` | J9, J10 |
| AP6 | Granska lagändringen SFS 2026:1656 (BrB) och sätt `verifiedVersion` | `data/source-status.json`, `data/law-sources.json` | J10, O9 |
| AP7 | Gripande- och anhållandekort | `index.html` / ny `arrest-17.js` | O8, F1 |
| AP8 | Dokumentation: README 1.7, `CHANGELOG.md`, markera kvalitetsrapporten som historisk | `README.md`, `QUALITY-REVIEW-2026-10-13.md` | O1, O2 |
| AP9 | Teknik: `BK_RELEASE`-konstant och ny cachenamn i service workern. Konsolidering och lazy loading (O5, O6) **skjuts till 1.8** för att hålla 1.7 juridiskt fokuserad. | `index.html`, `service-worker.js`, `manifest.webmanifest` | O4 |

### Nya och ändrade tester (måste vara gröna före publicering)

1. `scripts/custody_17_test.mjs` körs över hela katalogen i webbläsaren och kräver:
   - att inget straffbart förstadium med fullbordat max ≥ 1 år (eller livstid) får `onlyVia24_2`
   - att `presumption ⇒ ordinary`
   - att `unknown` aldrig ger etiketten "Endast särskild grund"
   - att landsförräderi ger presumtion
   - att våldtäkt, människorov, människohandel, mordbrand och allmänfarlig ödeläggelse ger presumtion med förbehåll
2. `scripts/coercive_17_test.mjs`: beslag, RB 23:8 första stycket, RB 27:16 och RB 28:3 första stycket är aldrig ✕ eller "inget positivt besked" på förstadiekort.
3. `scripts/stage_text_17_test.mjs`:
   - ingen text med "böter" när `fines === false`
   - ingen formulering av typen "lägre än X år och högst Y år"
   - dataintrång innehåller "ringa"
   - utpressning innehåller "ger inte ansvarsfrihet"
4. `scripts/traffic_17_test.mjs`: beskrivande titlar är märkta och `prosecutionRule` innehåller "RB 20:3".
5. `custody_162_test.mjs` ersätts av test 1. `ui_smoke.mjs` och `v16_smoke_test.mjs` uppdateras till 1.7-texterna.
6. Release-spärren (`v15_scoped_release_gate.mjs` → `v17_release_gate.mjs`) kräver `verifiedVersion` för BrB och RB.

### Acceptanskriterier

- Webbläsartesterna i punkt 1–4 är gröna på alla 1 551 kort.
- Manuell kontroll av 20 vanliga kort före och efter, både statusrad och häktningsvy: försök, förberedelse och fullbordat för stöld, rån, misshandel, våldtäkt, mord, narkotikabrott, vapenbrott och rattfylleri.
- Punkterna märkta [verifiera] i J3, J7, J8 och J10 är avstämda mot officiell källa eller åklagare, och resultatet är dokumenterat i CHANGELOG.
- README, manifest, service worker och appens versionsuppgift visar alla 1.7.

### Föreslagen ordning

AP1 → AP2 → AP3 (ger störst juridisk effekt och delar logik) → AP4 och AP5 → AP6 → AP8 och AP9 → AP7 (kan brytas ut till 1.7.1 om tiden inte räcker).
