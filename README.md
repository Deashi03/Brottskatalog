# Brottskatalog 0.6 – juridiskt referensverk

**Öppna i Safari:** https://deashi03.github.io/Brottskatalog/

Utvecklingsversion. Materialet är inte fullständigt juridiskt kvalitetssäkrat och får inte användas som enda rättsliga beslutsunderlag vid polisarbete.

## Nyheter i 0.6

- 251 sökingångar för brott, plus separata sökbara hänvisningsbestämmelser.
- 113 juridiska och praktiska ordlistebegrepp.
- Kontextstyrd begreppsförklaring: underlåtenhet i rån är inte samma sak som underlåtenhetsansvar.
- Brottskorten har **Utredningsuppslag och beviskällor** med konkreta exempel; de specialiserade åtgärderna för olovlig energiavledning inkluderar hur begäran om mätvärden och kWh-beräkning kan göras.
- Djupare anteckningar med tydlig skillnad mellan kursmaterial och egen utredningsmetodik.
- Brottsspecifika kvalifikationsgrunder: bland annat knivlagen, grovt rattfylleri, grov fridskränkning, grovt olaga hot och grovt bokföringsbrott.
- Alternativa rubriceringar med förklaring av avgörande skillnader.
- Sökbara Knivlagen 1–3 §§ och RB 24:1, 24:2, 24:6 och 24:7, märkta som *lagrum – inte brott*.
- Vid kort för frihetsberövande visas rättsregler och möjliga scenarier med uttrycklig skillnad mellan häktning, anhållande och polisens gripande.
- Straffskala som enbart har ett max presenteras **Fängelse – HÖGST 2 år**, utan påhittat minimum.
- Symbol på brottskort för kopiering av en felrapport; ingen information om faktiska ärenden ska tas med.

## Datakvalitet och avgränsningar

Straffskalor är fortsatt under kvalitetssäkring. De senaste nya brottsposterna har straffskaleuppgifter knutna till konsoliderad lagtext, men individuell åtalsprövning återstår på flera. Ingen status ska antas vara godkänd enbart för att ett lagrum finns i databasen. Kvalifikationsgrunder och utredningsuppslag från pedagogiskt material är inte ordagrann lagtext.

Automatisk SFS-kontroll är en bevakningsfunktion, inte en ersättning för juridisk granskning. Lagtexten kan i vissa maskinimporterade utdrag vara ofullständig och dessa ska inte användas i stället för gällande författningstext.

Officiella källor: [Brottsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), [Knivlagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/) och [Rättegångsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740framtagen/).

## Implementationsfiler

- `catalog-06.js` – ytterligare brottsposter med flaggade åtalsvillkor.
- `references-06.js` – sökbara icke-straffrättsliga lagrum och hänvisningar.
- `context-terms-06.js` – termdefinitioner på rätt lagrum och förbud mot generiska felmatchningar.
- `investigation-06.js` – utredningsförslag, metodik och källseparation.
- `details-06.js` – brottsspecifika kvalifikationsgrunder, alternativa brott och ordlista.
- `index.html` – sökgränssnitt och detaljer.
- `scripts/ui_smoke.mjs` – automatiska iPhone-simulerade UI-tester.
- `service-worker.js` – lokal cache och nätbaserad uppdatering av resurser.

För offlineanvändning krävs en första lyckad installation och att iOS inte rensar webbläsarens data. Offlinegaranti kan inte lämnas.
