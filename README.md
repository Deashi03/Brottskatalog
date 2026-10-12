# Brottskatalog 0.3

**Status:** Under utveckling. 158 sökingångar (48 tidigare + 110 nya). Nya katalogposter är inte färdiggranskade juridiska brottskort. De kan sakna verifierad straffskala och åtals-/häktningsinformation. Använd inte appen som ensamt beslutsunderlag i tjänsten.

## Öppna på iPhone eller dator

https://deashi03.github.io/Brottskatalog/

På iPhone: öppna adressen i **Safari** → **Dela** → **Lägg till på hemskärmen**. Ingen Netlify-tjänst eller inloggning krävs för att använda den publicerade webbappen. Ett installerat offline-exemplar kan påverkas av iOS cache-rensning.

## Nytt i 0.3

- Kompakt söksida utan stor rubrik och informationsbanner över sökfältet.
- Söktangenten stänger tangentbordet i stället för att lämna det uppe.
- Fler rubriceringar och gärningsbaserade sökord; enkel tolerans för stavfel.
- 55 nya källmarkerade begreppsförklaringar från Brottsutredning, Straffprocessrätt, Straffrätt Lund och Juridikens grunder.
- I brottskortet finns separata menyer för jämförelse och utredningsfrågor.
- Sparade favoriter kan flyttas upp/ned; senast använda brott visas redan i appen.
- Under **Mer** finns den diskreta uppgiften om dagar sedan katalogens senaste uppdatering, samt datum för kontroller av officiella SFS-källor.

## Struktur

- `index.html`: UI och det tidigare urvalet med lokalt lagrade paragrafer.
- `catalog-03.js`: tillkommande brottsrubriceringar, tydligt märkta som under granskning.
- `glossary-03.js`: separata tolknings- och begreppsförklaringar med källa.
- `data/provisions-generated.js`: **maskinimporterat**, inte juridiskt godkänt material från Sveriges riksdag, med separata källmarkeringar.
- `data/law-sources.json`: konfiguration av de officiella författningskällorna och vilka andra uppgifter som berörs av ändringar.
- `data/source-status.json`: resultat från de senaste automatiska källkontrollerna.
- `scripts/sync_law_sources.py`: källkontroll och utkastimport av SFS-texter.
- `.github/workflows/sync-laws.yml`: kör kontrollen måndagar samt när den startas manuellt.
- `.github/workflows/ui-tests.yml`: automatiserade gränssnittstester.
- `service-worker.js`: offlinecache med försök till uppdatering när internet finns.

## Uppdatera lagtext och bedömningsuppgifter

1. Gå till **Actions → Legal source synchronization → Run workflow** för att kontrollera de officiella SFS-källorna direkt.
2. Granska eventuella markeringar i `data/source-status.json` och GitHub Actions-loggen.
3. Uppdatera uppgifterna i brottskatalogens datakällor efter juridisk kontroll. Straffskalor, häktningsregler och åtalsvillkor ska inte gissas eller godkännas automatiskt.
4. Efter commit bygger GitHub Pages om webbappen. Vid uppkoppling försöker appen hämta uppdaterade datafiler.

Källkontrollen upptäcker förändringar och kan uppdatera **lagtextutkast** automatiskt. Den uppdaterar däremot inte automatiskt juridiska tolkningar som kan kräva särskild bedömning. Det är en avsiktlig säkerhetsgräns.

## Urval

Brottsbalksbrott ska ingå oavsett straffskala. I specialstraffrätten ska brott som **enbart** ger penningböter utelämnas, medan bland annat dagsbötes- och fängelsebrott ska ingå. Databasen är fortfarande under utbyggnad.

## Juridiska källtyper

**Lagtext** är en separat källtyp och ska återges ordagrant. Maskinimport är inte liktydigt med granskning. **Rättspraxis**, **kursanteckningar** och **praktiskt bedömningsstöd** ska vara tydligt särskilda från själva författningstexten.
