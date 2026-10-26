# Ändringslogg – Brottskatalog

## 1.7 – 2026-10-26

Bygger på granskningen i [docs/V17-PLAN.md](docs/V17-PLAN.md). Föregående version finns oförändrad i grenen `backup/v1.6.2` (commit `4eae461`).

### Juridiska rättelser
- **Häktning för förstadier (J1).** Försök, förberedelse och stämpling prövas nu mot det fullbordade brottets verifierade straffskala. Försök döms högst som fullbordat brott (BrB 23:1). Förberedelse och stämpling döms under det fullbordade brottets högsta straff, och över två år bara om det fullbordade brottet kan ge sex år eller mer (BrB 23:2). Därmed visar till exempel försök till stöld, rån, våldtäkt och grov misshandel att RB 24:1 kan vara tillämplig. Tidigare stod det "Endast särskild grund (RB 24:2)" på 413 sådana kort.
- **Ej verifierat är inte ett nej.** En straffskala som inte kan verifieras visas som grått "Straffskala ej verifierad – kontrollera". Den visas aldrig som rött ✕ eller som "Endast särskild grund". Det gäller i häktningsvyn och i tvångsmedelslistan.
- **Presumtionen kräver huvudregeln.** Häktningspresumtion (RB 24:1 andra stycket) visas aldrig samtidigt som en röd huvudregel.
- **Privilegierad straffskala (J3).** För våldtäkt, människorov, människohandel, mordbrand och allmänfarlig ödeläggelse står det nu "Häktningspresumtion – ej vid mindre grovt fall", med den lindrigare skalan angiven.
- **Tvångsmedel för förstadier (J2).** Åtgärder utan straffskalegräns visas alltid som "Ingen allmän straffskalegräns", till exempel beslag, medtagande till förhör från brottsplatsen och bevarandeföreläggande. Gränserna "fängelse kan följa" och "ett år eller mer" prövas via det fullbordade brottet. Fyraårsgränsen i RB 23:8 andra stycket, 23:8 a och 28:2 a gäller försök men inte förberedelse eller stämpling.
- **Dataintrång (J4).** Försök och förberedelse anger att de bara är straffbara om gärningen inte hade varit ringa vid fullbordan (BrB 4:10).
- **Utpressning (J5).** Försökskorten anger entydigt att frivilligt tillbakaträdande (BrB 23:3) inte ger ansvarsfrihet (BrB 9:11).
- **Förstadiernas straffskaletext (J6).** Texten genereras från samma gränser som detaljvyn. Formuleringar som "lägre än 3 år och högst 2 år" och "böter" där böter är uteslutet är borta.
- **Trafik (J7).** Söknamn som inte är lagens brottsbeteckning är märkta "Beskrivande sökbenämning". Åtalsregeln hänvisar till RB 20:3. Texten till TBL 5 § är markerad som utdrag tills ordalydelsen har kontrollerats.
- **Vållande till annans död (J9).** Kortet anger att ringa brott ger böter.
- **RB 24:2 (J8).** Kortet påminner om att proportionalitet alltid ska beaktas.

### Nytt
- I häktningsvyn finns nu kort för **anhållande (RB 24:6)**, **gripande av polisman (RB 24:7 första stycket)** och **envarsgripande (RB 24:7 andra stycket)**. Envarsgripande kräver att fängelse kan följa på brottet, utom när personen är efterlyst.
- Tvångsmedelslistan har en tredje markering, ⓘ (ej verifierat), och kapitlens räknare visar antalet ⓘ separat.

### Snabbstart
- **Sökvyn visas direkt.** Startvyn ligger förrenderad i `index.html` och målas upp omedelbart. Ett litet sökindex (`search-index-17.js`) gör att man kan söka och trycka på ett brott redan medan appen laddar. Brottskortet öppnas så snart laddningen är klar.
- Appens cirka 180 moduler körs i oförändrad ordning, men först efter att vyn har visats (`type="bk-defer"`, startladdare i `<head>`).
- Mätt med 4× processorstrypning: första vy efter cirka 0,3 s, mot cirka 5 s tidigare.
- Den tyngsta modulen (`base-coercion-review-15.js`) gick från cirka 320 ms till under 20 ms, eftersom källkontrollen nu görs en gång per lagrum i stället för en gång per brott och lagrum. Resultatet är detsamma.
- **Viktigt vid ändringar:** efter varje ändring av data eller gränssnitt måste du köra `node scripts/build_shell_17.mjs` (kräver Playwright). Testet `shell17_fresh_test.mjs` stoppar publiceringen om startvyn eller sökindexet är inaktuellt.

### Teknik
- Ny modul `v17-legal-screen.js` med samlad screening (`window.BK_SCREEN17`). `window.BK_CUSTODY162.assess` finns kvar för bakåtkompatibilitet.
- Versionsnumret anges på ett ställe (`window.BK_RELEASE`). Ny cache: `brottskatalog-v17-20261026`.
- Länken till rättegångsbalken är rättad: `…sfs-1942-740framtagen/` har ändrats till `…sfs-1942-740/`.
- Nya tester: `scripts/v17_screen_test.mjs` (utan webbläsare) och `scripts/v17_catalog_test.mjs` (iPhone-vy, hela katalogen). `custody_162_test.mjs` är ersatt eftersom det krävde det felaktiga beteendet.

### Kontroll mot officiell källa (data.riksdagen.se, 2026-10-26)
- **Brottsbalken (t.o.m. SFS 2026:1656) och rättegångsbalken (t.o.m. SFS 2026:1657):** 621 av 632 lagtexter som är lagrade i appen är ordagrant identiska med den officiella lydelsen, inklusive parallella framtida lydelser. De 11 avvikande var fel i den maskinimporterade offline-lagtexten:
  - 6 påhittade paragrafnycklar, till exempel "BrB 23:12" som innehöll BrB 9:12, och "BrB 4:24" som egentligen var en hänvisning till 24 § lagen om kontaktförbud
  - 5 påföljdsparagrafer (BrB 26:3, 26:7, 28:21, 38:8 och 38:9) där fel text var lagrad

  Alla 11 tas bort från offline-texten i `statute-corrections-17.js`. Ingen av dem används av något brottskort. SFS 2026:1656 finns bara i dokumenthuvudet och ändrar ingen paragraf som appen använder.
- **Specialstraffrätt:** de lagrade texterna ur narkotikastrafflagen (2024:797), vapenlagen 18 kap. (2026:1596), knivlagen (2026:413), trafikbrottslagen (2024:715) och smugglingslagen 20 § (2026:1321) är identiska med officiell lydelse.
- `verifiedVersion` är ifylld i `data/law-sources.json` och `data/source-status.json`. Kontrollen gäller lagtexten, inte juridiska slutsatser.
- **TBL 5 §:** appens text är ordagrant korrekt. Lagen har ingen egen brottsbeteckning för smitning, så både "Smitning från trafikolycksplats" och "Grov smitning från trafikolycksplats" är nu märkta som beskrivande sökbenämningar. Lagtexten är återställd som fullständig.
- **RB 24:8:** gripandekortet följer nu officiell lydelse. Den gripne förhörs så snart som möjligt, åklagaren underrättas skyndsamt och beslutar sedan om anhållande, och polisen får häva gripandet om skäl uppenbart saknas.
- **Häktningsregler:** texten i RB 24:1 (Lag 2026:1319) och de lindrigare straffskalorna i BrB 4:1, 4:1 a, 6:1, 13:1 och 13:3 är bekräftade.

- **Automatisk omimport på `main` (220dc59, 2026-10-26):** sammanslagen, men **den nya lagtextfilen används inte i 1.7**. Den nya importen har fullständigare text på vissa ställen, till exempel BrB 4:3, men ändrar format och nycklar så att 38 av appens källkontroller underkänner den. På `main` stoppade den redan publiceringskontrollerna. 1.7 behåller därför den verifierade importen från 2026-10-19 med rättelserna ovan. Endast tidsstämplarna i `data/source-status.json` är övertagna. Att anpassa källkontrollerna till den nya importen är en uppgift för 1.7.1.
- Vakten i `brb-source-repairs-15.js` bortser nu från blanksteg och radbrytningar, så att en omformaterad import inte i onödan stoppar reparationerna av BrB 4:3, 6:6, 6:10 a och 6:12.

### Kvar att kontrollera
- Referensen NJA 2025 s. 1024 (1 500 kr) i ordlistan. Rättsfall publiceras inte hos riksdagen.
- Tolkningsfrågorna: hur presumtionen tillämpas vid mindre grova fall, och om bötesförbudet i RB 24:1 fjärde stycket påverkar 24:2. Bör stämmas av med åklagare eller doktrin.
- Om webblänkarna till www.riksdagen.se fungerar. Den adressen är fortfarande blockerad i granskningsmiljön.

## 1.6.2 – 2026-10-22
Granskade häktningsgrunder enligt RB 24:1–3, inklusive utredningshäktning som bara är möjlig via 24:2.

## 1.6.1 – 2026-10-22
Menyerna återställs per brott, och åtalsreglerna är förtydligade.

## 1.6 – 2026-10-22
Kompakt visning och sex trafikbrott.

Äldre historik finns i [README.md](README.md).
