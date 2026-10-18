# Brottskatalog V1.5 – mätbar väg till publicering

> **Senaste avstämning: 48,3 % (5 527/11 442), 5 915 åtgärder återstår.** Se avstämningen längst ned; äldre procentsiffror nedan är sparade som revisionshistorik.

**Beräknad status: 46,3 % (5 297 av 11 434 jämnt räknade åtgärder).** Återstår **6 137**. Avser arbetsgren `v15-komplett-brb-rekvisit-typexempel`, avstämd 18 oktober 2026. Testad i [GitHub Actions 39154276028](https://github.com/Deashi03/Brottskatalog/actions/runs/39154276028).

## Räkneregel

**En sakligt separat åtgärd = en poäng**, oberoende av tidsåtgång och omfattning. Exempelvis är en lagtextavstämning för ett brott ett moment, en förstadiekontroll för samma brott ett annat, en genomförd CI-regression ett tredje. Detta är **andel av en låst arbetsinventering**, inte en prognos i timmar och inte juridisk kvalitetspoäng. Nytt faktiskt juridiskt fel kan medföra ytterligare arbete, och då revideras inventeringen öppet; procentsatsen är en uppskattning baserad på den nu kartlagda omfattningen.

Lagtext, inledande rekvisitstrukturer och numeriska straffskaleavstämningar är **förarbetade arbetsmoment**. De får **inte** tillgodoräknas som de nio oberoende momenten i den avslutande juridiska granskningen. Tidigare riktade rättsfallsanteckningar (21 anteckningar på 20 BrB-kort) redovisas i revisionen men skapar inte automatiskt extra generella publiceringskrav eller slutgodkännande. Svårbedömda/kontraintuitiva typexempel är frivilliga och uppfinns inte för att uppnå ett procentmål.

## Inventering den 18 oktober 2026

| Arbetsområde | Utförda | Totalt | Återstår | Färdigt |
| --- | ---: | ---: | ---: | ---: |
| Grundbrott: sökpost, åldersmetadata, lagtext, inledande rekvisit, straffskaleavstämning och separat direktkontroll | 2 100 | 2 322 | 222 | 90,4 % |
| Nio särskilda juridiska slutkontroller för vart och ett av 387 grundbrott | 0 | 3 483 | 3 483 | 0 % |
| Förstadier: sökpost, åldersmetadata, preliminär klassificering och två individuella slutkontroller för vart och ett av 1 086 kort | 3 102 | 5 430 | 2 328 | 57,1 % |
| Individuell källgranskning av tillämplighetsmarkering för 14-årsregeln hos 86 kandidater | 0 | 86 | 86 | 0 % |
| Separata registrerade automatiserade Node-teststeg i CI | 83 | 83 | 0 | 100 % |
| Implementerad PWA, revisions-, offline- och publiceringsinfrastruktur | 12 | 12 | 0 | 100 % |
| Slutliga kvalitetssäkrings-, gransknings-, PR-, deploy- och produktionsåtgärder | 0 | 18 | 18 | 0 % |
| **Summa** | **5 297** | **11 434** | **6 137** | **46,3 %** |

### Hur posterna beräknas

För **387 grundbrott** (319 i BrB och 68 i andra författningar) räknas först sex inledande kortåtgärder:

1. Sökbart brottskort – **387/387**.
2. Särskild åldersmetadata – **387/387**, inte slutlig tillämpning i varje fall.
3. Daterad och källverifierad fullständig lagtext – **319/387**; de 68 andra författningarna har ännu inte motsvarande fulltextcertifiering.
4. Strukturerade inledande rekvisit – **319/387**.
5. Grundläggande straffskaleavstämning – **373/387**; 14 villkorade/härledda fall kräver separat rättslig acceptans av sina alternativ och tillämpningsvillkor, utan påhittat numeriskt intervall. Procentmätaren stöder uttryckligen källbelagt godkännande av en sådan villkorad skala utan automatiskt tvångsmedelsbesked.
6. Separat dokumenterad direktkontroll av straffskalan – **315/387**. Resterande 72 innebär inte automatiskt att nuvarande straffskalor är fel.

Därefter ska **nio distinkta slutkontroller för varje grundbrott** göras: gärningsdatum och rätt lydelse; objektiva rekvisit; subjektiva rekvisit; undantag och konkurrens; brottsgrad; relevanta förarbeten och praxis; förstadieansvar; åtalsregler; samt straffskalevillkor och tvångsmedelsbehörighet. Totalt **3 483 moment**, hittills **inga slutligt intygade**. De 319 redan skapade BrB-arbetsakterna håller dessa steg uttryckligen öppna. Även 68 speciallagsbrott behöver motsvarande individuella slutkontroll.

För **1 086 förstadieposter** krävs fem insatser per kort: sökbar post (**1 086 klara**), åldersmetadata (**1 086 klara**), preliminär klassificering med daterad källanknytning (**930 klara**), individuell slutsats om kriminalisering (**0 slutgodkända**) och individuell konsekvenskontroll för tillämplig straffskala/åtal/tvångsmedel eller uttrycklig icke-straffbarhet (**0 slutgodkända**). **12 uttryckligen oavgjorda förstadier** ingår i denna kö och dubbelräknas inte.

**86 möjliga åldersundantagskandidater** behöver särskild kontroll av lagversion, grader och förstadiekoppling. Detta är genomgång av katalogens generella rättsliga gräns, inte ett automatiskt påstående om ansvar eller tvångsmedel i en konkret situation.

## Prioriterad fortsatt arbetsordning

1. **Färdigställ grunddatans 222 luckor**, med de 68 specialförfattningsfulltexterna och deras rekvisit främst. Behåll villkorade straffskalor där ett enda numeriskt intervall inte är sakligt möjligt.
2. **Stäng de mest riskfyllda förstadiekorten först:** bland 156 ännu inte tillräckligt källdokumenterade preliminära klassificeringar ingår 12 uttryckligen oavgjorda fall. Fortsätt därefter med systematisk individuell genomgång av alla 1 086 kortens lagstöd och påföljdskonsekvenser.
3. **Arbeta kapitelvis genom de nio juridiska slutkontrollerna**, med de 37 polisprioriterade BrB-korten först, därefter 282 övriga BrB-kort och 68 brott i särskild strafflagstiftning. Slutgranskningsmoment får bara bockas av med faktisk daterad sakprövning och källhänvisning.
4. **Granska 86 åldersundantagskandidater** och beroenden till individuella brottsgrader och förstadier.
5. **Slutför 18 frisläppningssteg**: historiska lagversioner, slutlig källförändringskontroll, negativ rättighets-/tvångsmedelskontroll, produktionsdata och källänkar, verklig iPhone/offline-verifiering, sista regressionskörning, releasegodkännande, PR-merge, Pages-deploy, efterkontroll och rollbackdokumentation.

Räknaren används genom `node scripts/v15_publication_progress.mjs`. Verifiera med `node scripts/v15_publication_progress_test.mjs`. Den skriver hela inventeringen och blockeringarna till **`audit/v15-publication-progress.json`**, automatiskt arkiverad med varje GitHub Actions-körning.

**Release-spärr:** V1.5 ligger kvar som **draft** tills slutkontrollerna är genomförda, källfrågor sakligt hanterade och GitHub Actions/produktionskontroller godkända. V1.4 på `main` lämnas oförändrad. Ett grönt automatiskt test ersätter aldrig en juridisk granskning.

---

## Arbetsavstämning 18 oktober 2026 – 46,6 %

**Ny verifierad status:** **5 324 av 11 435 åtgärder (46,6 %)**, **6 111 återstår**. Förändring mot låst baslinje 46,3 % (5 297/11 434): **26 tidigare återstående brottskortsuppgifter har slutförts**, och **ett nytt automatiskt test har lagts till och passerat**. Därmed har antalet arbetsuppgifter i inventeringen ökat med ett, så den nya jämförelsen avser samma katalogomfattning med ytterligare ett självständigt CI-test.

### Genomförd utbyggnad: bidrags- och skattebrott

- **13 brottskort** har fått var sin **individuellt källjämförd, fullständig aktuell paragraftext**, och var sin **strukturerad inledande rekvisitöversikt**.
- Detta är **26 avklarade kortuppgifter**, inte 26 juridiska slutgodkännanden.
- **Bidragsbrottslag (2007:612):** bidragsbrott, ringa bidragsbrott, grovt bidragsbrott, vårdslöst bidragsbrott; jämförda officiella paragrafer **2–4 §§**, med särskilda förklaringar om farekvisit, uppgift/ändringsanmälan, grov oaktsamhet, 1 § tillämpningsområde, frivillig rättelse enligt 5 § samt åtalsbegränsning enligt 6 a §. Lagversion vid kontroll: t.o.m. **SFS 2026:1322**.
- **Skattebrottslag (1971:69):** skattebrott, skatteförseelse, grovt skattebrott, vårdslös skatteuppgift, skatteavdragsbrott, skatteredovisningsbrott, vårdslös skatteredovisning, försvårande av skattekontroll samt grovt försvårande av skattekontroll; jämförda **2–8 och 10 §§**, med förbehåll om 1 §, frivillig rättelse enligt 12 §, särskild åtalsprövning enligt 13 § och skattetilläggsspärren i 13 b §. Lagversion vid kontroll: t.o.m. **SFS 2026:1531**.
- Brottskorten har fått alternativ där lagtexten ställer upp alternativa gärningsformer. Inga nya svårbedömda typfall har uppfunnits. Straffskalor, förstadier och tvångsmedel har inte getts någon ny automatisk slutsats.
- Källor: [bidragsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/) och [skattebrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/).
- Nya filer: `special-bidrag-skatt-fulltext-15.js`, `special-bidrag-skatt-requisites-15.js`, `scripts/special_bidrag_skatt_15_test.mjs`. Källjämförelsen kräver exakt motsvarande lagtext, en känd observerad författningsversion och källhänvisning. Ett ändrat eller trasigt importerad stycke spärrar både fulltextstatus och rekvisitklassificering.
- Äldre tester har uppdaterats så att **endast dessa 13 poster** kan gå från maskinimporterad text till fulltextverifiering på det nya underlaget. Övriga 33 av de ursprungliga 46 maskinimporterade speciallagsposterna förblir maskinimporterade. Även övriga 22 speciallagskort utan denna certifiering måste granskas individuellt.
- [GitHub Actions – fullständigt godkänd regression inklusive iPhone och progressberäkning](https://github.com/Deashi03/Brottskatalog/actions/runs/39155718440).

| Område | Förra mätningen | Nu | Kvar |
| --- | ---: | ---: | ---: |
| Inledande grundbrottsuppgifter | 2 100/2 322 | 2 126/2 322 | 196 |
| Daterad och certifierad fullständig paragraftext, grundbrott | 319/387 | 332/387 | 55 |
| Inledande strukturerade rekvisit, grundbrott | 319/387 | 332/387 | 55 |
| Juridisk helhetsgranskning | 0/3 483 | 0/3 483 | 3 483 |
| Förstadieuppgifter | 3 102/5 430 | 3 102/5 430 | 2 328 |
| Specialkontroll av 14-årsundantag | 0/86 | 0/86 | 86 |
| Automatiserade CI-tester | 83/83 | 84/84 | 0 |
| Infrastruktur | 12/12 | 12/12 | 0 |
| Slutrelease | 0/18 | 0/18 | 18 |
| **Summa** | **5 297/11 434 (46,3 %)** | **5 324/11 435 (46,6 %)** | **6 111** |

**Fortsatt spärr:** 319 BrB-brott och 68 speciallagsbrott kräver fortfarande separata juridiska slutkontroller. Tolv uttryckligen osäkra förstadier samt 14 villkorade straffskaleärenden kvarstår. Juridiskt godkänd release: **nej**.

---

## 18 oktober 2026 – större gemensamt speciallagsblock, 47,5 %

**Verifierad status: 5 437/11 438 åtgärder = 47,5 %. 6 001 återstår.** Förändring sedan 46,6 % (5 324/11 435): **110 nya slutförda brottskortsuppgifter**, **3 nya CI-kontroller**. Totalt antal inventerade åtgärder har ökat med tre därför att varje ny separat regression räknas som en enhet.

### Genomfört

- **55/55** kvarvarande grundbrott i specialstraffrätten har fått individuellt källanknutna **preliminära strukturerade rekvisit**: **23** smugglingskort, **6** penningtvättskort, **4** kort för brandfarliga/explosiva varor, **11** narkotikabrott, **5** vapenbrott, **4** trafikbrott och **2** knivlagsbrott.
- **33/33** maskinimporterade speciallagskort för smuggling, penningtvätt och explosivvaruhantering har fått avgränsad kontroll av **fullständig nutida paragraftext** mot primära källor. Tjugo distinkta paragrafer har källgranskats med versions- och innehållslås. Tre importerade efterföljande rubriker har avlägsnats ur felaktigt inkluderad lagtext.
- **22/22** återstående speciallagskort för narkotika, vapen, trafik och knivlagen har fått individuellt transkriberad och källkontrollerad aktuell paragraftext från Riksdagen. Nio distinkta bestämmelser har granskats. **Fulltextstatus och inledande rekvisitstruktur är nu 387/387 för grundbrotten.**
- **Tre nya regressionssviter** verifierar att ändringar i importversioner, lagtext, källhänvisningar och tidigare ofullständiga avgränsningar inte tyst ger falskt godkännande, samt att katalog, offlinecache och iPhone fungerar. Äldre tester som avsiktligt låste gamla lägre antal har uppdaterats. Alla **87/87 CI-steg** godkända, inklusive iPhone.
- Källor: [smugglingslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/), [penningtvättsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/), [brandfarliga och explosiva varor](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/), [narkotikastrafflagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/), [vapenlagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/), [trafikbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/), [knivlagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/).
- [Verifierad komplett GitHub Actions-körning 39157921972](https://github.com/Deashi03/Brottskatalog/actions/runs/39157921972).

### Revisionsstatus

| Moment | Färdigt | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Sökbara grundbrott | 387 | 387 | 0 |
| Åldersmetadata grundbrott | 387 | 387 | 0 |
| Komplett daterad aktuell paragraftext | 387 | 387 | 0 |
| Preliminära strukturerade rekvisit | 387 | 387 | 0 |
| Grundläggande straffskaleavstämning | 373 | 387 | 14 |
| Separata direktkontroller av straffskala | 315 | 387 | 72 |
| Nio juridiska slutkontroller per grundbrott | 0 | 3 483 | 3 483 |
| Förstadieposter, fem kontroller per post | 3 102 | 5 430 | 2 328 |
| Särskild åldersundantagskontroll | 0 | 86 | 86 |
| Registrerade automatiserade tester | 87 | 87 | 0 |
| Infrastruktur och revisionslogistik | 12 | 12 | 0 |
| Slutrelease | 0 | 18 | 18 |
| **Summa** | **5 437** | **11 438** | **6 001** |

**VIKTIG AVGRÄNSNING:** Komplett paragraftext avser den kontrollerade aktuella rättskällans angivna paragraf(er), inte automatisk slutsats om gärningsdag, hänvisade rättsregler eller fullständig juridisk tillämplighet. Rekvisitlistorna är preliminära, och fullständigt individuellt juridiskt slutgodkännande är alltjämt **0/387 grundbrott**. Tolv osäkra förstadier och fjorton villkorade straffskalefall kvarstår. Inga automatiska nya beslutsbefogenheter, tvångsmedelsbesked eller straffbarhetsbeslut har markerats. Version 1.5 är fortfarande draft och publiceringsspärren gäller.

### Nästa prioriterade arbetsblock

1. Åtgärda återstående **86 grundbrottsrelaterade straffskalekontroller**, där 14 är villkorade och 72 ännu saknar separat direktintyg.
2. Genomför **individuell rättslig käll- och förstadiegranskning** i större, välavgränsade familjegrupper. Kontrollera de 12 explicit osäkra förstadierna först men dra inte negativa slutsatser utan särskilt lagstöd.
3. Slutför polisprioriterade grundbrotts individuella nio juridiska slutmoment och fortsätt systematiskt i kapitelordning. Ingen automatisk helhetscertifiering från full lagtext och preliminära rekvisit.




---

## 18 oktober 2026 – 48,3 %, inledande grundbrottsmoment fullständiga

**Aktuell avstämning: 5 527 av 11 442 jämnt räknade åtgärder = 48,3 %. Återstår 5 915.** Sedan föregående avstämning 47,5 % (5 437/11 438) har **86 tidigare öppna kortuppgifter stängts**, och fyra nya separata CI-kontroller tillkommit och passerat. Detta är samma fastlagda räkneregel: en individuell kortåtgärd eller en fristående kontroll motsvarar en enhet.

### 14 villkorade straffskalor – individuellt källkontrollerade grenar

Nya `brb-conditional-source-audit-15.js` jämför 14 fall med aktuella paragrafer i [BrB (1962:700)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), inklusive hänvisade straffbestämmelser. Arbetsmiljöbrott och brukande av det förfalskade behåller uttryckligen sin härledda straffskala. Tio andra bestämmelser har skilda grenar beroende på bland annat krigstillstånd, gärningsgrad, deltagarroll och typ av utsaga.

**28 kortmoment slutförda:** 14 källkontrollerade villkorade skalmodeller och 14 separata direkta hänvisnings-/grenjämförelser. `penaltyRangeVerified` förblir **false** för alla 14: en enda siffra skulle vara felaktig. `conditionalPenaltyFinalAudit15.status=APPROVED` betyder **enbart källavstämning av de villkorade lagstadgade alternativen**, inte att något alternativ automatiskt gäller för en konkret gärning. Programmet måste fortfarande kräva relevant gärningsdatum, de konkreta omständigheterna och individuell kontroll av åtal och tvångsmedel. Dessa 14 fall räknas fortfarande som juridiska villkorsfrågor i det slutliga revisionsarbetet.

### 58 separata direktkontroller – individuellt jämförda med straffskala i SFS

Två nya moduler `brb-direct-grade-clauses-15.js` och `brb-direct-grade-remaining-15.js` anger för varje brottskort **ett eget källstyrkt straffsatsparti** och jämför dess bötesmöjlighet, lägsta/högsta fängelsestraff, livstidsalternativ och källproveniens. Först granskades 25 poster i 16–20 kap. BrB; därefter 33 poster inom 4, 6, 13, 17, 19, 21 och 22 kap. BrB. Källavvikelser, fel straffskala eller saknad fulltext spärrar godkännandet.

**58 kortmoment slutförda:** alla tidigare saknade direkta straffskaleintyg är nu källkontrollerade. För brott i 21–22 kap. är särskilda krigs- och tjänstgöringsförutsättningar fortfarande uttryckligen märkta **som oprövade**. Inga grader är automatiskt tillämpliga utan konkreta omständigheter och gärningsdatum. Inte heller dessa intyg är fullständig juridisk slutgranskning.

`scripts/v15_penalty_direct_evidence_queue.mjs` genererar en spårbar lista på ej direktintygade poster: nu **0 kvar**. Detta är ett kontrollresultat om grundbrottens **straffskaleuppgift**, inte en friande eller fällande bedömning eller ett tvångsmedelsbesked.

### Status efter avstämningen

| Delmoment | Före | Nu |
| --- | ---: | ---: |
| Grundbrott – sökpost, åldersmetadata, lagtext, rekvisit och straffskalor | 2 236/2 322 | **2 322/2 322 (100 %)** |
| Grundläggande straffskaleavstämningar | 373/387 | **387/387** |
| Individuella direktkontroller, inklusive korrekt villkorad hänvisning | 315/387 | **387/387** |
| Juridisk slutrevision: nio självständiga moment per grundbrott | 0/3 483 | **0/3 483** |
| Förstadier: fem uppgifter per post | 3 102/5 430 | **3 102/5 430** |
| Åldersundantagets individuella kandidater | 0/86 | **0/86** |
| Automatiserade CI-kontroller | 87/87 | **91/91** |
| Infrastruktur | 12/12 | **12/12** |
| Slutpublicering | 0/18 | **0/18** |
| **Totalt** | **5 437/11 438 (47,5 %)** | **5 527/11 442 (48,3 %)** |

**CI med komplett iPhone-regression:** [körning 39159735439](https://github.com/Deashi03/Brottskatalog/actions/runs/39159735439). De fyra nya kontrollstegen granskar 14 villkorade rättskällegrenar, 25 och 33 individuellt avgränsade straffskalor samt nollrapportering av oavklarade direkta intervall.

**Fortsatt publiceringsspärr:** 0/3 483 juridiska slutkontroller, 2 328 förstadieåtgärder, 86 särskilda åldersundantagskontroller och 18 releaseåtgärder återstår. Tolv förstadier är särskilt osäkra. Samtliga 14 villkorade straffskalor måste fortfarande ges en villkorad, inte en automatiskt numerisk, tillämpning i det konkreta fallet. Ingen merge eller publicering av v1.5 är gjord; V1.4 på `main` lämnas oförändrad.
