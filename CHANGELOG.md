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

### Teknik
- Ny modul `v17-legal-screen.js` med samlad screening (`window.BK_SCREEN17`). `window.BK_CUSTODY162.assess` finns kvar för bakåtkompatibilitet.
- Versionsnumret anges på ett ställe (`window.BK_RELEASE`). Ny cache: `brottskatalog-v17-20261026`.
- Länken till rättegångsbalken är rättad: `…sfs-1942-740framtagen/` har ändrats till `…sfs-1942-740/`.
- Nya tester: `scripts/v17_screen_test.mjs` (utan webbläsare) och `scripts/v17_catalog_test.mjs` (iPhone-vy, hela katalogen). `custody_162_test.mjs` är ersatt eftersom det krävde det felaktiga beteendet.

### Kvar att kontrollera mot officiell källa
Granskningsmiljön kunde inte nå riksdagen.se. Följande är därför inte slutverifierat:
- lagändringen SFS 2026:1656 i brottsbalken (`data/source-status.json`, `requiresReview`)
- ordalydelsen i TBL 5 § och brottsbeteckningen för grovt brott
- referensen NJA 2025 s. 1024 (1 500 kr) i ordlistan
- hur presumtionen tillämpas vid privilegierad skala (tolkningsfråga), och om bötesförbudet i RB 24:1 fjärde stycket påverkar 24:2
- texten i RB 24:8, som inte finns i repots källunderlag (anhållande- och gripandekorten bygger på RB 24:6–7, som finns där)

## 1.6.2 – 2026-10-22
Granskade häktningsgrunder enligt RB 24:1–3, inklusive utredningshäktning som bara är möjlig via 24:2.

## 1.6.1 – 2026-10-22
Menyerna återställs per brott, och åtalsreglerna är förtydligade.

## 1.6 – 2026-10-22
Kompakt visning och sex trafikbrott.

Äldre historik finns i [README.md](README.md).
