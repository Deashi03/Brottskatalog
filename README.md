# Brottskatalog – steg 2 (testversion)

Brottskatalog är en mobilanpassad svensk brotts- och lagrumsprototyp. **Detta är ännu inte en fullständig eller juridiskt kvalitetssäkrad brottskatalog och får inte användas som ensamt beslutsunderlag i tjänsten.**

## Öppna som webbapp

Efter att GitHub Pages aktiverats under **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**:

**https://deashi03.github.io/Brottskatalog/**

Öppna adressen i Safari på iPhone. När den öppnas korrekt: Dela → Lägg till på hemskärmen.

## Prova funktionerna

- Sök på brottsrubricering, lagrum och vardagliga synonymer
- Läs tydlig straffskala och tryckbara statusrader för häktning och åtal
- Öppna förklaringar genom understrukna begrepp och laghänvisningar
- Spara favoriter och ändra visningstäthet
- Automatiskt mörkt tema 22.00–06.00 enligt telefonens lokala tid, eller välj manuellt
- Efter första lyckade installation och offlinecache: öppna utan uppkoppling

## Offline

`service-worker.js` förlagrar `index.html`, `manifest.webmanifest` och `icon.svg`. Appens exempelbrott, lagtexter och sökindex finns i `index.html`. Utan en första lyckad öppning med internet och fullständig installation fungerar inte offlineåtkomsten. Safari/iOS kan rensa webbdata, så permanent offlineåtkomst är inte garanterad.

## Om innehållet

Det finns 48 sökingångar för UI-test, inte samtliga svenska brott. Specialstraffrättsliga brott med enbart penningböter ingår inte i det planerade urvalet; brottsbalksbrott ska med oavsett straffskala. Flera uppgifter är från kursanteckningar och ska inte sammanblandas med ordagrann lagtext. Uppgifterna behöver kontrolleras mot gällande rätt och rättspraxis före operativ användning.

## Projektfiler

- `index.html` – hela gränssnittet med lokalt inbäddat exempelmaterial
- `manifest.webmanifest` – metadata för installering på hemskärm
- `service-worker.js` – offlinecache
- `icon.svg` – appikon

Ingen Netlify-tjänst och ingen inloggning behövs för att besöka den publicerade sidan.
