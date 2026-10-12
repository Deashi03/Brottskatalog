# Brottskatalog 0.5

Brottskatalog är ett svenskt juridiskt uppslagsverk för iPhone. **Arbetsversion – inte juridiskt slutgranskad och inte avsedd som ensamt operativt beslutsunderlag.**

## Starta appen

**https://deashi03.github.io/Brottskatalog/**

Öppna webbplatsen i Safari på iPhone och välj **Dela → Lägg till på hemskärmen**. Du behöver inte logga in för att använda den publicerade webbappen. Cachelager kan rensas av iOS; fullständig offlinegaranti kan inte lämnas.

## Nytt i 0.5

- **237 sökingångar**, inklusive 45 nya brottsposter från brottsbalken.
- **99 begrepp i ordlistan** (35 nya).
- Djupare **kvalifikationsgrunder** och verklighetsnära bedömningsfrågor på 15 brott.
- **Anteckningar – snabbkoll** på 19 brott, med 28 korta förklaringar från *Straffrätt Lund* och *Brottsutredning*.
- Ett enhetligt straffskalekort: **LÄGST → HÖGST**, med tydlig skillnad mellan böter, fängelse och livstid. Ingen upprepad straffskaletext.
- Rättade äldre namn och kontroll av datum-/källberoenden från tidigare versioner.
- Kompletterad kontrollerad paragraftext för BrB 6:6, 6:10 a, 6:12 samt åtalsregler i 9:12.
- **data/review-summary-05.json** redovisar omfattning, maskinella kontroller och kvarvarande granskningsbehov.

## Datakällor och status

Lagtexten visas skild från praxis, kursanteckningar och bedömningsstöd. Brottsangivelse, åtalsbegränsning och häktningsmarkering ska granskas mot aktuell författning och omständigheter. Särskilt giltighetsdatum och övergångsregler måste beaktas vid historiska gärningar.

Källa: [Brottsbalken (1962:700), Sveriges riksdag](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

Vissa importerade lagrum är fortfarande ofullständiga; de är uttryckligen märkta. Straffskalor kan vara villkorade eller bero på en annan brottsrubricering. **En automatisk källkontroll innebär inte att rättslig tolkning har godkänts.**

## Teknik och uppdateringar

- `index.html` – mobilgränssnitt och ett tidigare urval av brott.
- `catalog-03.js`, `catalog-05.js` – brottskatalogens sökingångar.
- `legal-review-04.js`, `legal-validation-05.js` – straffskalor, åtalsvillkor och versionsberoenden.
- `glossary-03.js`, `glossary-05.js` – ordlista.
- `commentary-05.js` – juridiska kursanteckningar och kvalifikationsgrunder.
- `data/provisions-generated.js` – maskinellt importerade preliminära lagtexter.
- `data/provisions-reviewed-05.js` – manuellt jämförda lagtextsutdrag.
- `data/legal-review-baseline*.js` – kontrollfingeravtryck som utlöser granskning när källor ändras.
- `data/review-summary-05.json` – kvalitetsgranskningsstatus.
- `service-worker.js` – lokal offlinecache där iOS tillåter det.

Under GitHub Actions kan **Legal source synchronization** startas manuellt för att kontrollera officiell författningstext. Automatiska kontroller körs också enligt det schemalagda arbetsflödet. Appens lagtext, straffskala och tolkningsnoter ska inte blandas ihop eller betraktas som likvärdiga källor.
