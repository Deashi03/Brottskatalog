# Brottskatalog V1.5 – mätbar väg till publicering

> **Aktuell arbetsavstämning 20 oktober: 85,0 % (10 159/11 949), 1 790 moment återstår.** Senaste blocket avslutar 174 lagtextsbundna granskningar av brottsgrader och uttryckliga kvalifikationsgrunder samt ett testkommando. Rekvisitfunktionen visar gradregler, ansvarsfrihetsgränser och hänvisade alternativ för dessa kort. Totalt är 1 738/3 510 juridiska delmoment begränsat avslutade. Ingen post är fullständigt juridiskt slutgodkänd; bland annat 56 positiva förstadiekorts individuella straffskalor återstår.

**Historisk baslinje (18 oktober):** 46,3 % (5 297/11 434). Denna siffra är ersatt av den aktuella CI-beräkningen ovan; äldre tabeller nedan är historiska ögonblicksbilder, inte senaste status.

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

---

## 18 oktober 2026 – milstolpe 50,3 %; 83 kontroller av 14-årsundantaget och 144 förstadiekällor

**Verifierad status: 5 757/11 448 åtgärder = 50,3 %. 5 691 återstår.** Förändringen sedan avstämningen 48,3 % (5 527/11 442) är **+230 slutförda åtgärder** och **+6 testmoment i den totala inventeringen**. Räkneregeln är fortfarande en självständig granskning per brottskort, förstadiekort eller CI-uppgift. **Samtliga 97/97 registrerade automatiska CI-tester har passerat** inklusive iPhone, se [Actions 39164907417](https://github.com/Deashi03/Brottskatalog/actions/runs/39164907417).

### Sammanhängande källgranskning: 144 förstadiekort

- **138 speciallagsförstadier** (46 brott × försök, förberedelse, stämpling) har fått varsin individuellt avgränsad preliminär källkoppling till en av fem familjer av straffbud: smugglingslagens 14 §, penningtvättsbrottslagens 8 §, skattebrottslagens 11 §, brandfarliga/explosiva varors 30 a § och bidragsbrottslagens uppräknade bestämmelser. **66** är enligt uttrycklig aktuellt lagstöd preliminärt markerade straffbelagda och **72** saknar sådan särskild kriminalisering i kontrollerad bestämmelse. Inte ett individuellt konstaterande av brottslig gärning.
- **Sex förstadier** till **missbruk av offentlig ställning och grovt missbruk av offentlig ställning** har fått egna dokumenterade negativa kontroller mot BrB 20:2 och kapitlets särskilda kriminaliseringsstöd.
- Den tidigare kategoriska **icke-straffbarhetsklassificeringen för tre förstadier till grovt spridande av gift eller smitta** har spärrats. BrB 13:7 anger grov grad och 13:12 kriminaliserar förstadier till spridande av gift eller smitta; gradens omfattning kräver rättslig tolkning. Det är **15**, inte 12, uttryckligen öppna förstadiefrågor nu. Katalogen visar `unverified`, okänd straffskala och ingen automatisk tvångsmedelsindikator för dessa tre. Se `brb13-poison-stage-scope-hold-15.js`.
- Den tidigare käll- och datumkön för 156 förstadier har krympt till **15 öppna**, utan att enbart fylla i ett datum på en juridiskt oavgjord fråga. Juridiska slutrevisioner av samtliga förstadier kvarstår enligt de fem uppgifterna per post.

### 14 år och BrB 1 kap. 6 § – 83 separata källavstämningar

- **86 kandidater** når det numeriska tröskelvärdet **fyra års minimistraff för det fullbordade brottet** och har identifierats för särskild kontroll.
- **83/86** har fått självständig källanknuten kontroll av den dokumenterade, aktuella fullbordade straffskalan och – för förstadier – en separat preliminär källkoppling till uttrycklig förstadiekriminalisering. Källmaterial: [BrB 1:6, SFS 2026:1528 och 2026:1555](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/) samt respektive brotts specialbestämmelse. Även speciallagarnas minimiintervalldokumentation har jämförts.
- **Tre kandidater**, just förstadierna till grovt spridande av gift eller smitta, är spärrade från ett källomfattningsintyg eftersom deras gradvisa förstadieansvar är rättsligt öppet.
- `individualSourceScopeApproved=true` innebär **endast en genomförd juridiskt avgränsad SFS-kontroll av minimistraff och förstadiekoppling**, aldrig att ett visst barn automatiskt kan dömas, att en gärning faktiskt är straffbar eller att tvångsmedel kan användas. Varje intyg har `caseSpecificApplicationApproved=false`, `provisionalOnly=true`, `neverApprovesCoerciveMeasures=true`. Gärningsdag, ålder, övergångsregler, särskilda tillämpningsvillkor och ungdomars processuella skydd måste bedömas i varje konkret fall.
- Nya handlingar: `special-stage-enumeration-15.js`, `brb20-stage-negative-source-15.js`, `brb13-poison-stage-scope-hold-15.js`, `age14-candidate-source-audit-15.js` samt fyra separata regressionsfiler och två separata inventeringsskript. Sex ytterligare CI-steg är installerade och gröna.

### Verifierad avstämning

| Grupp | Färdigt | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Grundbrottens sex inledande uppgifter | 2 322 | 2 322 | 0 |
| Grundbrottens nio juridiska slutkontroller | 0 | 3 483 | 3 483 |
| Förstadiernas fem uppgifter per post | 3 243 | 5 430 | 2 187 |
| 14-årsundantag: individuella källkontroller | 83 | 86 | 3 |
| Automatiserade CI-kontroller | 97 | 97 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Summa** | **5 757** | **11 448** | **5 691** |

**Närmast kvar:** hantera de 15 öppna grad-/förstadietolkningarna vars negativa eller positiva svar inte får bestämmas genom rubrikmatchning, gå därefter vidare med individuell källbaserad förstadiestraffskalegranskning och de nio rättsliga slutmomenten per grundbrott. Ingen ny automatisk prövning av häktning, åtal eller tvångsmedel; ingen juridisk slutrevision har ännu godkänts. **PR #2 är fortfarande draft och V1.4 på `main` opåverkad.**

---

## 18 oktober 2026 – 52,1 %, särskilda förstadiernas individuella lagstödsgranskning

**Verifierad status: 5 969 av 11 450 lika vägda åtgärder = 52,1 %. Återstår 5 481.** Föregående avstämning var **50,3 % (5 757/11 448)**. I denna omgång har **210 separata förstadieuppgifter** utförts och två nya CI-kontroller lagts till och genomgått fullständig testkörning. Totalt alltså **+212 avklarade uppgifter**.

### 72 särskilda förstadier utan uttrycklig kriminalisering

En separat, strikt källbunden granskning i `special-negative-stage-scope-15.js` jämför varje namn och förstadie med den aktuella specialförfattningens uttryckliga uppräkning. **72 individuella lagstödsprövningar** har fått ett snävt negativt rättskällebesked: förstadiet är inte särskilt straffbelagt **som just den namngivna brottstypen enligt den granskade gällande lagen**. De utgör 23 fall inom smugglingslagen, sex inom penningtvättsbrottslagen, 25 inom skattebrottslagen, tolv inom bidragsbrottslagen och sex inom lagen om brandfarliga och explosiva varor.

Samma 72 kort har fått en separat **begränsad konsekvenskontroll**: ett förstadium som inte är kriminaliserat genom just det granskade straffbudet får ingen egen påföljd, åtalspunkt eller självständig tvångsmedelsgrund **enbart genom det förstadiet**. Detta är inte ett frikännande, inte ett påstående om att gärningen inte kan omfattas av något annat brott och inte en tillämpningsbedömning av äldre lagversion. **Automatisk tvångsmedelsbefogenhet har inte godkänts.**

### 66 uttryckligt kriminaliserade speciallagsförstadier

Ytterligare **66 individuella lagstödsprövningar**, dokumenterade i `special-positive-stage-scope-15.js`, bekräftar att det namngivna förstadiet finns med i aktuellt särskilt kriminaliseringsstadgande: 46 enligt smugglingslagen, tolv enligt penningtvättsbrottslagen, två enligt skattebrottslagen och sex enligt lagen om brandfarliga och explosiva varor.

De 66 kortens **andra juridiska slutmoment (straffskala/åtal/tvångsmedel) är fortfarande oavgjort**. Hänvisningen till BrB 23 kap. måste prövas med faktiska omständigheter, gärningsdag, subjektiva rekvisit och övergångsregler. Godkännandet är enbart avgränsad **aktuell förstadieuppräkning**, inte ett fastställande av straffansvar för en konkret person.

Båda modulerna kräver oförändrad versionsbunden källa, godkänd individuell preliminär källkoppling och korrekt specifik brottstyp och förstadieform. Förändrad eller utebliven källa ger inget nytt intyg. Testerna omfattar negativa källmutationer och att de 66 positiva fallen inte av misstag får den negativa konsekvenskontrollens godkännande.

### Avstämning efter arbetet

| Grupp | Genomfört | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Grundbrottens inledande uppgifter | 2 322 | 2 322 | 0 |
| Grundbrottens nio individuella juridiska slutmoment | 0 | 3 483 | 3 483 |
| Förstadier: preliminära och individuella kontroller | 3 453 | 5 430 | 1 977 |
| Särskilda 14-årskontroller | 83 | 86 | 3 |
| Automatiserade CI-kontroller | 99 | 99 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Summa** | **5 969** | **11 450** | **5 481** |

**Verifierad testkörning inklusive iPhone:** [GitHub Actions 39166528537](https://github.com/Deashi03/Brottskatalog/actions/runs/39166528537). Samtliga 99 separata registrerade CI-steg godkända.

**Rättslig release-spärr kvar:** 0/3 483 juridiska slutkontroller av grundbrott, **15 särskilt oavgjorda förstadier**, 3 kontroller av 14-årsundantaget och 18 egentliga publiceringsåtgärder. Inget nytt automatiskt beslut om gripande, anhållande, häktning eller andra tvångsmedel. V1.5 fortsatt draft, V1.4 på `main` oförändrad.

Källor för gruppvis kontroll: [smugglingslagen 14 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/), [penningtvättsbrottslagen 8 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/), [skattebrottslagen 11 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/), [bidragsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/) och [lagen om brandfarliga och explosiva varor 30 a §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/).

---

## 19 oktober 2026 – 61,1 %, stor källrevision av brottsbalkens förstadier

**Senast godkända körning: 7 003 av 11 453 lika vägda åtgärder, 61,1 %, 4 450 återstår.** Jämförelsepunkt: 52,1 % och 5 969/11 450. Skillnaden är **1 034 faktiska avslutade arbetsinventeringsenheter**: 66 tidigare inlagda men då ännu ej grönt testade särskilda förstadiekonsekvenser, **399 individuella BrB-förstadier med särskilt kontrollerat negativt lagstöd och varsin avgränsad konsekvensprövning (798 moment)**, **167 individuella positiva förstadieuppräkningar i BrB** samt **tre nya CI-registrerade kontrollsteg**. Någon allmän juridisk slutrevision har **inte** godkänts av dessa moment. Omkring 965 av de 1 034 enheterna är nya direkta BrB-kortkontroller, inte dokumentationsändringar.

### BrB 5, 7–12 och 14–20 kap. – individuell paragraf- och brottsgradsavstämning

Ny modul `brb-negative-stage-chapter-audit-15.js` går igenom **14 kapitel och deras individuella grundbrott**, och kontrollerar faktisk förstadietyp mot kapitlets gällande, källverifierade förstadieparagraf: BrB 7:5, 8:12, 9:11, 10:9, 11:6, 12:5, 14:13, 15:15, 16:17, 17:16, 18:7, 19:14. För kap. 5 och 20 granskas de katalogförda paragraferna mot frånvaro av särskilt förstadiebud i det aktuella kapitlet. Varje kort måste ha fullständig daterad källtext, korrekt koppling till eget grundbrott, korrekt förstadieform och en motsvarande separat aktuell kapiteluppräkning. Misstänkt avvikelse spärrar det aktuella kortet.

**399 tidigare saknade negativa förstadiekontroller** har nu ett individuellt avgränsat aktuellt rättskällebesked. **399 separata konsekvensbedömningar** anger att ett förstadium som inte är kriminaliserat *som den namngivna kombinationen enligt det granskade aktuella kapitlet* inte ensamt kan bilda eget straffbud, åtal eller tvångsmedelsgrund. Andra rubriceringar, lagversionen på gärningsdagen och andra lagliga tvångsmedelsgrunder är uttryckligen undantagna från påståendet. Detta är inte ett frikännande eller en konkret häktningsbedömning.

`brb-positive-stage-source-audit-15.js` kontrollerar dessutom varje straffbelagt förstadium mot en **uttrycklig källa och namnankare** i samma gällande förstadieparagraf. **167 positiva aktuella lagstödsuppräkningar** har därmed individuellt källavstämts. De har **inte** blivit automatiskt godkända för viss straffskala, åtal eller tvångsmedel. I kortet hålls häktningsstatus fortsatt okänd och BrB 23 kap. måste prövas självständigt.

**Rättsliga avvikelser som inte godkänts:** Fem förstadieposter för grov signaturförfalskning, grov märkesförfalskning och grov olovlig befattning med falska pengar har avvikande positiv status jämfört med den direkt angivna förstadieuppräkningen i BrB 14:13. De är avsiktligt **källrevisionsspärrade** i den nya granskningen, inte felaktigt överförda till annan slutsats. Dessutom hålls försöksfrågan om grov bevisförvanskning öppen eftersom det bokstavliga ankaret inte stämmer med BrB 15:15. Dessa särskilda konflikter tillkommer utöver de 15 sedan tidigare uttryckligen olösta förstadieposterna och måste prövas mot systematik, förarbeten och praxis. Tidigare förstadieklassificering i katalogen räknas inte som nytt juridiskt godkännande för dessa fall.

### Pågående slutrevision och publikation

| Arbetsgrupp | Genomfört | Totalt | Återstår |
| --- | ---: | ---: | ---: |
| Grundbrottens sex inledande uppgifter | 2 322 | 2 322 | 0 |
| Grundbrottens nio självständiga juridiska slutmoment | 0 | 3 483 | 3 483 |
| Förstadiernas fem moment per post | 4 484 | 5 430 | 946 |
| 14-årsundantagets individuella källkontroller | 83 | 86 | 3 |
| CI-registrerade Node-teststeg | 102 | 102 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Summa** | **7 003** | **11 453** | **4 450** |

**Verifiering:** [Godkänd komplett GitHub Actions-körning 39177166788](https://github.com/Deashi03/Brottskatalog/actions/runs/39177166788), inklusive mobil/iPhone, kvalitetsskript och negativt test med manipulerad primärrättskälla. Slutlig individuell lag-/praxis-/straffskale-/tvångsmedelsrevision är fortsatt helt separat.

**Slutlig rättslig release-spärr:** 3 483 återstående oberoende grundbrottsdelmoment, 946 återstående förstadiedelmoment, tre osäkra 14-årskandidater och 18 releasekontroller. **PR #2 förblir draft, main/V1.4 oförändrad, V1.5 opublicerad.** Underlaget är [gällande BrB 1962:700 i Riksdagens SFS](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

---

## 19 oktober 2026 – utvidgad och grön källrevision till 62,6 %

Efter den tidigare avstämningen på 61,1 % tillkom **172 individuellt utförda kortmoment** med bibehållen försiktighetsprincip i BrB **3 och 6 kap.** De har källgranskats mot **BrB 3:11** (brott mot liv och hälsa) och **BrB 6:15** (sexualbrott), med förstadieform jämförd mot brottets exakta rubricering och den kompletta källparagrafen.

Därmed är **463 negativa förstadier** kontrollerade både i fråga om särskilt kriminaliseringsstöd (463 åtgärder) och den rättsligt avgränsade konsekvensen av att just det namngivna förstadiet inte är kriminaliserat enligt den aktuella bestämmelsen (463 åtgärder). **211 positiva förstadier** har separat stämts av mot sina uttryckligen nämnda aktuella lagstödsbestämmelser. Sammantaget **1 137 individuella BrB-kortmoment** i den här större granskningsetappen.

Tillsammans med **66 tidigare inlagda men först nu grönt verifierade speciallagskonsekvenser** och tre nytillkomna CI-kontroller innebär detta **1 206 faktiskt avklarade inventeringsuppgifter sedan den tidigare verifierade 52,1 %-nivån**. Den **fullständiga juridiska slutrevisionen är fortfarande 0/3 483**, och källavgränsade förstadieintyg är inte någon bedömning av konkret uppsåt, farekrav, straffskala, åtalsbehörighet, historisk lag eller tvångsmedelsrätt.

**Kvarstående särskilda osäkerheter** är fortfarande 15 tidigare uttryckligen öppna förstadier, fem bokstavliga brottsgrad-/lagstödsavvikelser i BrB 14:13 samt ett ofullständigt namnankare för försöksfrågan om grov bevisförvanskning i BrB 15:15. Ingen av dessa har godkänts eller utjämnats bara för att förbättra procenttalet.

| Grupp | Färdiga | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Grundbrottens inledande genomgång | 2 322 | 2 322 | 0 |
| Nio separat granskade juridiska slutmoment per grundbrott | 0 | 3 483 | 3 483 |
| Förstadier – fem individuella moment per kort | 4 656 | 5 430 | 774 |
| Särskilda kontroller av 14-årsundantaget | 83 | 86 | 3 |
| Automatiserade tester (CI-steg) | 102 | 102 | 0 |
| Teknik/logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Totalt** | **7 175** | **11 453** | **4 278** |

**Grön slutlig CI-regression inkl. iPhone:** [GitHub Actions 39177493062](https://github.com/Deashi03/Brottskatalog/actions/runs/39177493062). Testerna verifierar också att ändrat lagtextunderlag inte kan ge ett positivt källgodkännande. Aktuell grundkälla är [Riksdagens brottsbalk (1962:700)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

**Viktig avgränsning:** Detta är ett stort genomfört och verifierat *aktuellt lagstödsarbete för förstadier*, inte 1 137 fullständiga slutligt rättsligt godkända brottsbedömningar. Alla rättsliga slutkontroller av grundbrotten, öppna förstadiefrågor och formella publiceringsuppgifter är fortsatt blockerande. V1.5 är ännu endast draft, V1.4 på `main` är oförändrad.

---

## 19 oktober 2026 – 65,7 %, 348 nya individuellt verifierade förstadieåtgärder

Efter den tidigare godkända avstämningen **62,6 % (7 175/11 453)** har **348 nya individuella lagstöds- och konsekvensåtgärder** slutförts och verifierats i CI, utan att några juridiska grundbrottsslutkontroller ommärkts som färdiga.

- **BrB 4 kap.**: 78 negativa förstadieprövningar med 78 separata konsekvensprövningar samt 39 positiva uttryckliga förstadieuppräkningar; totalt **195** individuella uppgifter. Källa: **BrB 4:10** enligt 2026:950. Villkoret att dataintrång inte skulle vara ringa måste fortfarande bedömas individuellt; någon automatisk straffskala eller gripandebefogenhet har inte godkänts.
- **BrB 13 kap.**: 12 negativa källavstämningar med 12 separata konsekvensprövningar samt 39 uttryckliga positiva uppräkningar; totalt **63** uppgifter. Källa: **BrB 13:12**. De 12 tidigare spärrade osäkra förstadierna för grova grader är fortfarande **uttryckligen olösta**, inte felaktigt klassificerade.
- **BrB 21–22 kap.**: 39 negativa förstadieprövningar med 39 separata konsekvensprövningar och 12 uttryckliga positiva lagstödsuppräkningar; totalt **90** uppgifter. Källor: **BrB 21:15 och 22:7**. Krigstillämplighet, lagversion och eventuellt särskilt ikraftträdande är fortfarande separat nödvändiga kontroller. Inga automatiska tvångsmedelsbesked.

**Summering:** 348 nya avgränsade BrB-kortmoment. Endast faktiskt CI-verifierade poster räknas. Källkontrollerna är inte en fullständig prövning av förstadieansvar i ett enskilt fall. De 15 tidigare `unverified`-förstadierna och de fem avvikande förfalskningsgraderna samt grov bevisförvanskning kräver fortfarande självständig rättslig granskning.

| Grupp | Färdiga | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Grundbrottens sex inledande moment | 2 322 | 2 322 | 0 |
| Nio oberoende juridiska slutmoment per grundbrott | 0 | 3 483 | 3 483 |
| Förstadiernas fem moment per post | 5 004 | 5 430 | 426 |
| Särskilda kontroller för 14-årsundantaget | 83 | 86 | 3 |
| CI-registrerade Node-kontroller | 102 | 102 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Totalt** | **7 523** | **11 453** | **3 930** |

**Verifiering:** [Godkänd GitHub Actions-körning 39213295096](https://github.com/Deashi03/Brottskatalog/actions/runs/39213295096) inklusive iPhone och revisions-/källmanipulationstester. Rättskälla: [Brottsbalk (1962:700), Sveriges riksdag](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

**Publiceringsspärr:** 0/3 483 juridiska grundbrottsslutkontroller, 426 återstående förstadieåtgärder, tre särskilda 14-årskontroller och 18 releaseåtgärder. PR #2 är fortfarande draft, `main`/V1.4 orörd, V1.5 inte publicerad.

---

## 19 oktober 2026 – 68,3 %, 301 individuella BrB-förstadiekonsekvenskontroller

**Utgångspunkt:** 7 523/11 453 (65,7 %). **Verifierat nytt läge:** 7 825/11 454 (68,3 %). **Nya avgränsade kortåtgärder:** 301; **nytt separat automatiserat test:** 1. **Inga slutligt juridiskt godkända grundbrott eller fullständiga förstadiekort** har tillkommit.

De **301 individuellt redan källkontrollerade positiva BrB-förstadierna** har nu fått en separat, käll- och brottsspecifikt låst **konsekvensgränskontroll**. För varje enskilt förstadiekort kontrolleras dess föräldragrundbrott, typ (försök/förberedelse/stämpling), aktuellt kapitels särskilda kriminaliseringsparagraf, fulltextproveniens och befintlig positiv lagstödsrevision. Slutsatsen är uttryckligen begränsad: en laguppräkning fastställer **inte** en konkret straffskala, straffansvar, åtalsordning eller tvångsmedelsbefogenhet. Straffskala och skuldvillkor kräver särskild analys enligt 23 kap. BrB och aktuellt straffbud; gärningsdag, brottsgrad och eventuella specialvillkor kvarstår.

Detta är **301 verkliga individuella negativa konsekvenskontroller**, inte 301 slutligt godkända straffskalor. Den tidigare avsaknaden av särskilda konsekvensposter är åtgärdad utan att godkänna numeriska påföljder eller polisiär befogenhet. En källmanipulationskontroll visar att ändrad auktoriserande paragraf spärrar motsvarande nya konsekvensbedömningar.

| Arbetsområde | Färdigt | Totalt | Återstår |
| --- | ---: | ---: | ---: |
| Grundbrottens sex inledande moment | 2 322 | 2 322 | 0 |
| Juridisk slutrevision, nio moment per grundbrott | 0 | 3 483 | 3 483 |
| Förstadier, fem moment per post | 5 305 | 5 430 | 125 |
| Särskilda 14-årskontroller | 83 | 86 | 3 |
| CI-registrerade Node-kontroller | 103 | 103 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Totalt** | **7 825** | **11 454** | **3 629** |

**Verifiering:** [Godkänd GitHub Actions 39214356417](https://github.com/Deashi03/Brottskatalog/actions/runs/39214356417), inklusive 103 CI-registrerade Node-tester och iPhone-regression. **Frisläppningsspärren kvarstår:** 0/3 483 fullständiga juridiska grundbrottsslutkontroller, 125 förstadieuppgifter, 3 särskilda ålderskontroller och 18 publiceringsuppgifter. PR #2 förblir draft, V1.4 på `main` orörd.

---

## 19 oktober 2026 – 68,9 %, 66 nya individuella NSL-förstadieåtgärder

Sedan senast godkända **68,3 % (7 825/11 454)** har **33 förstadiekort i narkotikastrafflagen** fått varsin **individuell källavstämning mot 4 §** och varsin **separat begränsad konsekvensbedömning**: **66 faktiska kortåtgärder**. Två nya CI-kontroller har lagts till, vilket också ökar arbetsinventeringens nämnare med två.

Källa: [Narkotikastrafflagen (1968:64), 4 §, Sveriges riksdag](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/) i lydelse till och med SFS 2024:797.

**Källavgränsningar per individuell post:**
- Försök/förberedelse omfattar enligt aktuell 4 § narkotikabrott, ringa narkotikabrott, grovt och synnerligen grovt narkotikabrott, men endast när gärningen gäller annat än bruk.
- Stämpling är uppräknad för narkotikabrott, grovt och synnerligen grovt narkotikabrott, inte för ringa narkotikabrott.
- De tre korten för ringa narkotikabrott genom **bruk** får inte felaktigt godkännas som straffbara förstadier; de tre korten för ringa narkotikabrott genom **innehav** skiljer mellan försök/förberedelse och stämpling.
- Varken en källuppräkning eller ett negativt besked fastställer påföljd, allmänt åtal, tvångsmedel eller konkret straffansvar; gärningsdatum och BrB 23 kap. måste fortfarande prövas.
- Ett regressionsprov manipulerar källhänvisningen på ett av 33 kort och kräver att den individuella kontrollen underkänns.

| Grupp | Färdiga | Totalt | Kvar |
| --- | ---: | ---: | ---: |
| Grundbrottens sex inledande moment | 2 322 | 2 322 | 0 |
| Nio juridiska slutmoment per grundbrott | 0 | 3 483 | 3 483 |
| Förstadiernas fem moment per kort | 5 371 | 5 430 | 59 |
| Särskilda 14-årskontroller | 83 | 86 | 3 |
| CI-registrerade Node-kontroller | 105 | 105 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Slutpublicering | 0 | 18 | 18 |
| **Totalt** | **7 893** | **11 456** | **3 563** |

**Återstående förstadier:** 22 ännu inte slutligt avgränsade BrB-kort (44 individuella lagstöds-/konsekvensmoment) samt 15 förstadier med oavgjord preliminär straffbarhetsstatus (15 moment), totalt 59 moment. Osäkra brottsgrader får inte massgodkännas.

**Verifiering:** [GitHub Actions 39227402981](https://github.com/Deashi03/Brottskatalog/actions/runs/39227402981) grön, inklusive 105 CI-registrerade Node-kontroller och iPhone-regression. **Publiceringsspärren kvarstår**: inga av 3 483 grundbrottsslutkontroller är godkända, och 18 releaseåtgärder återstår. PR #2 är draft, V1.4 på `main` är orörd.

---

## 19 oktober 2026 – 69,4 %, tidigare öppna grova BrB-förstadier källavgränsade

**Godkänd status:** **7 956/11 457 arbetsmoment (69,4 %)**, varav **3 501 återstår**. Förändring från föregående CI-godkända commit: **+60 avgränsade juridiska kortmoment**, **+1 nytt självständigt automatiserat test**. Detta är inte 60 kompletta juridiska slutrevisioner.

- **21 individuella källavstämningar** av aktuellt förstadielagstöd för nio grova BrB-grupper (13:7, 13:5 a, 13:5 b, 21:8, 14:5, 14:7, 14:8 och 15:8 med respektive förstadiebestämmelse). Källhanteringen omfattar för varje kort både grundbrottets aktuella gradbestämmelse och den specifika förstadietyp som särskilt anges.
- **21 separata negativa konsekvensgränskontroller** dokumenterar uttryckligen att källavstämning av den namngivna brottsgraden inte godkänner ett numeriskt förstadiestraff, konkret straffansvar, åtalsbehörighet, äldre lagversion eller tvångsmedel.
- **15 tidigare oavgjorda preliminära förstadieklassificeringar** har fått aktuell lagtextanknuten avgränsning. De tidigare rättsliga källdossiererna och deras uttryckliga förbehåll om fullständig prövning har behållits.
- **3 särskilda 14-årströskelkontroller** avser nu även BrB 13:7:s tre aktuellt källprövade grova förstadier. Ingen tillämpning på en konkret 14-åring eller befogenhet till frihetsberövande är godkänd.
- **En ny Node-regression** prövar samtliga 21 kort individuellt och underkänner manipulerad huvudlagtext eller ändrad gradbestämmelse. Äldre regressioner har justerats utan att lagrumsgranskningar ommärkts som fullständigt godkända. Kvalitetsrevisionen håller nu **21 numeriska förstadiestraffskalor uttryckligen öppna**, i stället för att felaktigt kräva en uppfunnen fixerad straffskala.

| Område | Färdigt | Totalt | Återstår |
| --- | ---: | ---: | ---: |
| Grundbrottens sex grunduppgifter | 2 322 | 2 322 | 0 |
| Grundbrottens nio oberoende juridiska slutkontroller | 0 | 3 483 | 3 483 |
| Förstadieuppgifter (begränsat käll-/konsekvensomfång) | 5 430 | 5 430 | 0 |
| Särskilda källkontroller av 14-årströskeln | 86 | 86 | 0 |
| Automatiserade CI-kontroller | 106 | 106 | 0 |
| Teknik och logistik | 12 | 12 | 0 |
| Frisläppning och efterkontroll | 0 | 18 | 18 |
| **Totalt** | **7 956** | **11 457** | **3 501** |

**Godkänd regression:** [GitHub Actions 39330330500](https://github.com/Deashi03/Brottskatalog/actions/runs/39330330500) – samtliga CI-steg, integrerad kataloggranskning och iPhone-webbläsartest passerade. Aktuell rättskälla för avstämningen: [Brottsbalk (1962:700), Sveriges riksdag](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

**Releaseblockering kvarstår:** **3 483** självständiga slutkontroller av **387 grundbrott** och **18** frisläppningsuppgifter, inklusive detaljerade prövningar av gärningsdatum, rekvisit, brottsgrader, praxis, påföljder, åtalsvillkor och tvångsmedel. Att de avgränsade förstadie- och ålderströskelmomenten är räknemässigt färdiga innebär **inte** att något förstadiekort är slutligt godkänt för polisiärt beslutsstöd i enskilt ärende. PR #2 är fortfarande utkast, V1.4 på `main` är oförändrad och version 1.5 är inte publicerad.


## 20 oktober 2026 – kursunderlag och återstående BrB-rekvisit

De fyra tillhandahållna kursdokumenten identifieras med filnamn och SHA-256 i `data/course-source-manifest-15.json`. Originaldokumenten publiceras inte i repositoryt. DOCX-hänvisningar anger stycken från 1, inklusive tomma stycken i huvudtexten; PDF-hänvisningar anger fysisk sida från 1. Hänvisningarna pekar på just de tillhandahållna filversionerna.

- **59 begreppsförklaringar**, lagrade en gång per begrepp och betydelse, med referenser från rekvisitfältet i **387 grundbrottskort**. Brottsspecifika kopplingar används för att hålla exempelvis råntvång och bevisfara i rätt sammanhang. Befintliga understrukna ord i lagtexten använder fortfarande sin tidigare kontextfunktion.
- **25 tidigare återstående BrB-kort** har fått två individuella, uttryckligt avgränsade delkontroller vardera: objektiva rekvisit och uppsåt/oaktsamhet. **50 nya juridiska kontrollmoment**, inte 25 fullständiga brottsgodkännanden. Förklaringarna visas även inne i respektive rekvisitfält.
- Särskilda gränser har kontrollerats: alternativa häleribrott, koppleriets lägenhetsalternativ, betalningsverktygens bedrägliga användningssyfte, arbetsmiljöbrottets dubbla hänvisning, svindleriets skilda skuldformer, hedersmotiv och kränkningsserier samt hemliga uppgifters begränsade oaktsamhetsansvar.
- De nya kontrollerna binds till exakt text i **31 hänvisade BrB-paragrafer**; ändrad/ofullständig källa eller fel granskningsdatum blockerar de beroende delkontrollerna. Nytt källmanipulationstest och utökat mobiltest ingår i CI.

**Avgränsning:** Samtliga grundbrott saknar fortfarande fullständig slutgranskning. Gärningsdatum och övergångsregler, all relevant praxis, undantag/konkurrens och individuella tvångsmedelsförutsättningar har inte slutgodkänts genom dessa delkontroller. De 68 speciallagskortens separata objektiva/subjektiva slutmoment kvarstår också. Publiceringsspärren och utkaststatusen för PR #2 består.

Inventeringen ökar med två separata registrerade CI-kontroller. Begreppsförklaringarna, kopplingarna och mobiltestets delassertioner har inte gjorts om till juridiska poäng. Sedan avstämningen före detta arbete är räknarens förändring därför **+50 juridiska moment och +2 testmoment**, från 8 614/11 477 till 8 666/11 479.


## 20 oktober 2026 – 136 speciallagskontroller

Samtliga 68 befintliga speciallagskort har fått en individuell objektiv och en individuell subjektiv delkontroll i `special-elements-audit-15.js`, med två läsbara förklaringar i rekvisitfältet. De kompletterar tidigare strukturerade listor och ger inte fullständigt juridiskt godkännande.

| Författning | Kort | Nya delkontroller |
| --- | ---: | ---: |
| Narkotikastrafflagen | 11 | 22 |
| Vapenlagen | 5 | 10 |
| Trafikbrottslagen | 4 | 8 |
| Knivlagen | 2 | 4 |
| Bidragsbrottslagen | 4 | 8 |
| Skattebrottslagen | 9 | 18 |
| Smugglingslagen | 23 | 46 |
| Penningtvättsbrottslagen | 6 | 12 |
| Brandfarliga och explosiva varor | 4 | 8 |
| **Summa** | **68** | **136** |

Granskningen håller bland annat isär faktisk besittning och bruk, egetbruksbegränsningen för viss narkotikahantering, uppsåtligt mindre allvarligt respektive oaktsamt vapenbrott, rattfylleriets olika undantag, skatteredovisningens hänvisningar, penningtvättens alternativa syfteskonstruktioner och det separata bötesansvaret för vanlig oaktsamhet enligt LBE.

Varje delkontroll binds till dess fullständiga, tidigare manuellt källjämförda paragraftext och rättsliga källidentitet. Ändrad källa i en lagfamilj spärrar även beroende grader. Regeln om uppsåt i BrB 1:2 har jämförts som hel paragraf; tidigare importstatus ändras inte till ett påhittat globalt fulltextintyg.

128 lokala Node-kommandon har passerat, inklusive negativa tester för ändrad narkotikatext, ofullständig skattelagstext, framtida granskningsdatum, fel källadress och ändrad allmän uppsåtsregel. Ett nytt separat CI-steg tillkommer; räkneförändringen är **+136 juridiska delmoment och +1 testmoment**, från 8 666/11 479 till 8 803/11 480.

**Fortfarande öppet:** historik/övergångsregler, fullständig undantags- och konkurrensprövning, brottsgrader, relevanta förarbeten/praxis, åtal och tvångsmedel. En särskild urvalsavvikelse att hantera i återstående katalogkontroll är att ringa smuggling, ringa tullbrott och ringa smuggling av explosiv vara har egna befintliga sökposter trots att straffet endast är penningböter. De aktuella rättsliga förklaringarna är granskade, men frågan om deras placering som sökposter respektive relaterade grader är inte markerad som löst. Ingen publicering har gjorts.


## 20 oktober – slutligt katalogurval och rättelseförklaringar

Urvalsregeln tillämpas nu efter samtliga importer och granskningar. Tre specialstraffrättsliga penningbötesgrader (ringa smuggling, ringa tullbrott och ringa smuggling av explosiv vara) samt deras nio förstadiekort visas inte längre i sökning, sparade poster, historik eller jämförelser. Alla 319 BrB-grader behålls, även förargelseväckande beteende. Dagsböter och ospecificerade böter är fortfarande inkluderade.

Arbetsinventeringen med 1 473 poster behålls som granskningsunderlag, medan **1 461 sökingångar, varav 384 grundkort**, nu uppfyller katalogurvalet. De tidigare 387 grundkorten och 1 086 förstadiekorten används fortfarande som fast revisionsbas. Rapportschemat skiljer nu uttryckligen `inventory`, `searchable` och `excludedBySelection`; de två indexmomentens etiketter säger arbetsinventering. Urvalsrättningen räknas inte som nya juridiska godkännanden.

Att dölja en familj ändrar inga rättsliga källor eller straffbarhetsbesked. Särskilt bevaras uppgiften att 14 § uttryckligen nämner försök till ringa smuggling av explosiv vara. Den uteslutna familjens förstadiekort bedöms inte som straffritt genom urvalsbeslutet.

Smugglingslagens 12, 15 och 20 §§ har lästs i Riksdagens konsoliderade text den 20 oktober. **23 grundkort** får förklaringar om frivillig rättelse, den skilda räckvidden för ansvarsfrihet respektive åtalsbegränsning och relevanta ringa-/subsidiaritetsregler. Förklaringarna visas i en stängd panel under rekvisit. Hela de tre referensparagrafernas text, källidentitet och författningsversion måste stämma; fel stoppar förklaringarna. Kursanteckningarna ersätter inte originalbestämmelserna.

Detta är innehållsförbättringar och en urvalsrättning, **inte** 23 fullständiga undantags-, åtals- eller historikgodkännanden. Den juridiska kön är oförändrad: **824/3 483**, med **2 677 återstående arbetsmoment**. Två nya CI-kontroller ändrar den tekniska inventeringen till **8 805/11 482 (76,7 %)**. V1.5 är fortsatt utkast.

## 20 oktober – individuella kontroller av åtalsregler för 313 BrB-kort

Ett nytt block innehåller **313 fasta poster med individuella id:n, rubriceringar, brottsgrader, författningshänvisningar och kontrollerad regelklass**. För varje post jämförs den egna lagtexten och alla använda stödparagrafer. Underlaget omfattar 226 olika paragrafer och särskilda tolkningsanteckningar från fyra propositioner. De fem redan registrerade åtalskontrollerna i 12 kap. räknas inte igen. Totalt är därmed **318/319 BrB-korts aktuella lagtextsregler för åtal kontrollerade**. Grovt olaga tvång hålls öppet i just denna kontroll eftersom förhållandet mellan den grova graden och den särskilda hotformen i 4:11 kräver ytterligare tolkningsunderlag.

Kontrollerna omfattar bland annat:

- 3:12: angivelse **och** allmän synpunkt för icke grovt vållande till kroppsskada/sjukdom; angivelseundantaget för barn lämnar allmänsynpunktskravet kvar. Arbetsmiljöbrott enligt 3:10 hålls skilt från ett alternativt vanligt vållandebrott, med stöd av prop. 1990/91:140 s. 130–131.
- 4:11: normalgradsregler, allmän plats, särskilda tvångsformer och de tre alternativa avsikterna bakom hjälpmedelsförberedelse enligt 4:9 b. **Grovt hemfridsbrott och grovt olaga intrång rättas från villkorat till allmänt åtal** enligt normal utgångspunkt, med uttryckligt stöd i prop. 2021/22:194 s. 43.
- 5:5: enskilt åtal som huvudregel, åklagarens begränsade undantag, avlidna och främmande makt. Förolämpning enligt 5:3 blandas inte ihop med 17:3.
- 7:6 och 8:13: allmän synpunkt respektive närståendekrets, alternativa grunder samt de uttryckliga undantagen för grov stöld, inbrottsstöld och rån.
- 9:12: närståendehänvisningen skiljs från kontouttags-/ringa-fallen. **Grovt fordringsbedrägeri rättas till villkorad status vid relevanta närståendeförhållanden**; det är inte ett av de två namngivna undantagen grovt bedrägeri och grov utpressning.
- 10:10: närståenderegel, hyres-/kreditköpsregeln och mutbrottsfiltret hålls isär. De grova rubriceringarna för olovligt förfogande/brukande omfattas inte av andra styckets hyres-/kreditköpsfilter (prop. 2016/17:131 s. 104–105). Grovt tagande/givande av muta omfattas inte av tredje styckets särskilda filter (prop. 2011/12:79 s. 50); första styckets generella närståendehänvisning prövas separat.
- 11:8, 19:16 och 20:5: särskilda skäl för ringa bokföringsbrott, regeringens förordnande för namngivna säkerhetsbrott, offentlig tjänst och tystnadsplikt till förmån för enskild. Felaktig hänvisning till sista stycket i 20:5 rättas till tredje stycket.

Gemensamma, nu fullständigt återgivna stödtexter omfattar BrB 2:2, 2:7 och 2:8 samt RB 20:2–6. Även BrB 9:12 får fullständig aktuell källproveniens. Den nya textmodulen ändrar inte brottsrekvisit eller straffskalor. Kontrollblocket tar dessutom hänsyn till de källbundna särskilda personfallen i 18:2/8 och 19:11/16 där de kan beröra 3–5 kap.

**Fyra statusklassificeringar rättas och elva kort får rättade/förtydligade åtalsuppgifter.** I åtalsrutan visas nu den granskade huvudförklaringen och officiella länkar. Jurisdiktion, ytterligare villkor och beslutsordning ligger i en från början stängd underpanel. De nya åtalskontrollerna ändrar inga förstadiekort, straffskalor eller tvångsmedelsbesked.

Negativa tester stoppar kontroller vid ändrad gemensam RB-text, fel källadress, framtida granskningsdatum, ändrade närstående-/förordnanderegler, ändrad egen brottstext eller saknat tolkningsunderlag. En tidigare bevarandekontroll använder nu djupjämförelse för redan existerande kontrollobjekt; en JSON-kopia kan inte jämföras med objektreferens. Innebörden av bevarandekravet är oförändrad.

**Räkning:** 313 nya juridiska delmoment och två nya CI-kontroller ger **9 120/11 484 (79,4 %)**, jämfört med föregående 8 805/11 482. Förklaringsstycken, källänkar och upprepade lagtextkopplingar ger inga extra poäng. **1 137/3 483 juridiska moment** är klara; **2 364 totala arbetsmoment** återstår. Lagtextskontroll av åtalsfilter är inte ett beslut om konkret åtalsrätt, historisk tillämplighet, immunitet, preskription, bevisläge, åtalsunderlåtelse eller fullständig praxisgranskning. V1.5 är fortfarande utkast.

## 20 oktober – ytterligare 68 åtalskontroller i specialstraffrätten

Efter BrB-blocket har samtliga **68 grundkort i de nio specialstraffrättsliga familjerna** fått egna fasta källkontroller av lagtextens åtalsregler: NSL 11, VapenL 5, TBL 4, KnivL 2, SmuglL 23, PTBL 6, SkBrL 9, BidrBrL 4 och LBE 4. Även de tre penningbötesgrader som uteslutits från appens katalogurval granskas i arbetsinventeringen. Ingen av de tidigare objektiva/subjektiva kontrollerna eller förklaringarna räknas igen.

**Ett nytt faktiskt fel rättas:** samtliga fem vapenposter saknade hänsyn till 18 kap. 14 § vapenlagen. Vid frivillig inlämning av de angivna vapnen/föremålen till Polismyndigheten kräver åtal för olovligt innehav att det är motiverat från allmän synpunkt. Korten får nu villkorad åtalsstatus med förklaring av just detta fall. Regeln medför varken automatisk vapenamnesti eller ett generellt undantag för tillverkning, överlåtelse, beslag eller andra brott.

**Andra individuellt prövade avgränsningar:** SkBrL 13 § kräver särskilda skäl för skatteförseelse och, under två kumulativa förutsättningar, vissa brott enligt 2, 5 och 6 §§. Prisbasbeloppet knyts till gärningsåret. 13 b § är en separat person-/gärningsbunden sanktionsspärr och omfattar även de angivna fallen kring juridiska personers skattetillägg och rapportavgifter. BidrBrL 6 § om myndighetens anmälningsskyldighet och 6 a § om åklagarens sanktionsspärr hålls isär. SmuglL 20 § prövas bara för de angivna rubriceringarna och rätt avgifts-/tulltilläggsfall. De övriga fem familjernas aktuella bestämmelser har kontrollerats utan att hitta något särskilt angivelsefilter för katalogens poster.

Sex stödparagrafer återges med komplett aktuell källproveniens: VapenL 18:14, SmuglL 20, SkBrL 13/13 b och BidrBrL 6/6 a. Textkontrollerna omfattar också kortens egna fullständiga texter, officiella adresser och tillgängliga importerade författningsversioner. Förklaringar och beslutsgång använder samma expanderbara åtalsruta som BrB; länkarna namnges efter rätt speciallag. Förstadier, straffskalor, rekvisit och tvångsmedelsbesked ändras inte.

Den första externa mobilkörningen stoppade vid den befintliga navigationsmätningen. Testet inväntar nu att sidans öppningsanimation är färdig innan fasta layoutgränser jämförs; överlappningskravet är oförändrat och felutskriften innehåller faktisk geometri. Upprepade datum- och paragrafkontroller görs en gång per initiering i respektive granskningsblock, utan att källkraven ändras. Mobilregressionen kontrollerar tio konkreta BrB-/speciallagsrutor, stängda underpaneler, beslutsordning, källänkar och iPhone-bredd.

**Sammanlagt under denna arbetsomgång:** 313 + 68 = **381 nya lagtextsbundna juridiska delkontroller**, nio rättade statusklassificeringar och ytterligare förtydliganden. Tre nya CI-kommandon ger totalt **9 189/11 485 (80,0 %)**. Den juridiska kön har **1 205/3 483** avslutade delmoment; **2 296 totala arbetsmoment** återstår. Grovt olaga tvång hålls fortsatt öppet i åtalsblocket. Aktuella lagtextskontroller ersätter inte historik, praxis, konkret åtalsbeslut, immunitets-/jurisdiktionsprövning eller fullständig juridisk slutgranskning. Ingen publicering eller mergning har gjorts.


### Upptäckta katalogluckor utanför procentbaslinjen

Inventeringens tidigare mönster kände igen ”döms”/”dömes” men missade vissa straffbud med ”dömas”, exempelvis ”skall han dömas”. Efter rättning och separat avgränsning av strafflindrings-, ansvarsfrihets- och medverkansregler identifieras **tre verkliga huvudbrott utan egen grundpost**: vårdslöshet med gift eller smittämne (13:9), landsförräderi (22:1) och ryktesspridning till fara för rikets säkerhet (22:5). De aktuella straffbuden har jämförts med Riksdagens text den 20 oktober och lagts i ett beständigt källunderlag för täckningskrav.

Releasekontrollen blockerar nu uttryckligen publicering så länge dessa tre saknar egna kort. Inventeringstestet kräver att de syns i kön; när de införs ska hela tillhörande databasarbete, förstadier och revisionsmoment läggas till och procentbaslinjen räknas om. **80,0 % gäller därför den hittills låsta inventeringen, inte 80,0 % av en bevisat komplett förteckning över alla aktuella brott.** Dessa nyupptäckta luckor räknas inte som färdigställda juridiska kontroller och inte heller bort ur nämnaren för att höja procenten.

## Tillägg 20 oktober: tre inventeringsluckor stängda

Den föregående luckrapporten ovan är ersatt: **vårdslöshet med gift eller smittämne (13:9), landsförräderi (22:1) och ryktesspridning till fara för rikets säkerhet (22:5)** har nu egna grundkort och nio förstadieposter. Det uttryckliga minimikravet i `data/v15-required-offence-coverage.json` kvarstår som regression; det är inte ett bevis för att varje tänkbar brottsrubricering är inventerad.

Rekvisitfunktionen visar två skilda alternativ för oaktsam allmänfara (människor respektive djur/växter), landsförräderiets fyra handlingsalternativ med det ytterligare men-/biståndskravet och ryktesspridningens skilda mottagar- och farerekvisit. Befintliga begreppsförklaringar om oaktsamhet, orsakssamband och ”ägnat att” har kopplats till relevanta nya kort. Inga komplexa typexempel har uppfunnits.

Straffskalorna är separat kontrollerade: böter eller högst två års fängelse för 13:9 och 22:5; fyra–tio år eller livstid för 22:1. Krigs-, ockupations- och föreskriftsvillkor hålls uttryckliga och ger inget automatiskt tvångsmedelsbesked. Sex negativa förstadiekombinationer och landsförräderiets tre positiva uppräkningar är kontrollerade mot 13:12 respektive nu gällande 22:7. Framtida lydelse om kärnsprängning har inte lagts till som gällande brott.

**Ombasering:** +3 grundkort × 15 moment, +9 förstadiekort × 5 moment, +4 ålderskandidater och +1 separat testkommando = **95 nya arbetsmoment**. Av dessa är 77 färdiga; 18 återstår i de nya kortens öppna juridiska revisionsdimensioner. Totalt blir det 9 266 av 11 580, med 2 314 kvar. Den avrundade andelen är fortfarande 80,0 %, trots större faktisk omfattning. Källa: aktuell körning av `scripts/v15_publication_progress.mjs`.

GitHub Actions körning 1005 verifierade föregående mobilfix inklusive åtalsrutornas iPhone-bredd. Den utökade katalogen ska dessutom passera en ny fullständig körning före slutavstämning.

## Tillägg 20 oktober: saknade förstadieingångar och rekvisit

Inventeringen av grundkort mot förstadiekort visade en tidigare oupptäckt lucka: 24 grundkort hade inte några förstadieposter. Orsakerna var äldre referensnamn, krav på numerisk grundstraffskala och en generell spärr för ett mindre grovt fall. Nu finns **72 nya poster**: **19 med särskilt lagstöd (ibland bara angivna gärningsalternativ) och 53 utan särskild kriminalisering**. Samtliga har egna aktuella käll-/konsekvenskontroller, utan beslut om konkret ansvar, historisk lag, åtal eller tvångsmedel.

De omfattar fem vapenbrottsvarianter, fyra trafikbrott, två knivbrott, arbetsmiljöbrott, upplopp, våldsamt upplopp, myteri, svikande av försvarsplikt, högförräderi, egenmäktighet vid förhandling med främmande makt, olovlig värvning, mindre grovt olaga frihetsberövande och fyra nordiska/internationella utsagevarianter. De senare har uttryckliga hänvisningar till 15:15 i 15:4 a–b; partsutsage-, mindre-allvarlighets- och oaktsamhetsalternativ hålls åtskilda.

Samtliga **439 positiva förstadiekombinationer** har nu strukturerat rekvisitstöd för försök, förberedelse respektive stämpling, med ett fast granskningsmanifest. Ringa-undantag, begränsade gärningsformer och utpressningsförsökens undantag från 23:3 anges särskilt. De 420 ytterligare rekvisitstrukturerna ger ingen extra kredit i den låsta procentmodellen och innebär inga nya juridiska slutgodkännanden. Komplett aktuell text i 23:1–3 är separat jämförd med Riksdagen och kan läsas offline. Grundkortens expanderbara förstadieavsnitt länkar direkt till samtliga tre kombinationer. De nya kortens lagtextavsnitt visar även grundbrottets fullständiga text. Om straffskalan saknar färdig individuell prövning visar gränssnittet det; en tom straffskala omvandlas inte längre till ett påhittat bötesminimum.

**Ombasering från föregående avstämning:** 72 nya förstadiekort × fem arbetsmoment, sex nya ålderskandidater och ett separat testkommando ger 367 tillkommande moment. Därutöver har de 24 grundbrottens särskilda förstadiefråga delgranskats. Det ger 391 färdigställda arbetsmoment enligt den befintliga räkneregeln, till 9 657/11 947 (80,8 %). Detta är avklarade avgränsade käll-/datafrågor, inte 391 fullständiga juridiska slutgodkännanden.

Den nya kontrollen kräver tre förstadieposter per relevant grundbrott och blockerar saknade eller dubbla kombinationer. En separat publiceringsspärr synliggör **43 positiva förstadiekort med kvarstående straffskaleprövning**, varav 19 är nya. De källgranskade uppräkningarna ger inget numeriskt straffskalegodkännande. Fullständig juridisk slutrevision och publiceringsåtgärder kvarstår.


## Tillägg 20 oktober: 326 grundbrottskontroller och rättade grova förstadier

**83,6 %: 9 984/11 948 moment, 1 964 kvar.** Detta pass avslutar 326 befintliga grundbrottsmoment och lägger till ett testkommando som också avslutas: **327 fler färdiga moment**, +1 i nämnaren. Grund- och förstadieinventeringen ändras inte. De 13 sakrättningarna och deras nya rekvisitöversikter får ingen extra procentkredit.

De 326 grundbrotten består av 269 BrB-poster, elva narkotikabrottsvarianter och 46 poster i smugglings-, penningtvätts-, skattebrotts-, bidragsbrotts- och brandfarlig/explosivvarulagstiftningen. Varje fast manifestpost anger identitet, egen kontrollerad paragraftext, tillämpliga F/P/S-former, kriminaliseringsbestämmelse och uttryckliga begränsningar. Källtext, befintliga tre förstadieposter och grundbrottets lagtext måste stämma innan den avgränsade revisionsfrågan kan stängas. 4:9 b behandlas separat som ett självständigt förberedelsebrott och får inga rekursiva förstadiekort.

Särskilt redovisas ringa-undantag, mened som inte är mindre allvarlig, begränsningen till anskaffande/mottagande av falska pengar, bortförande ur landet vid viss oredlighet mot borgenärer, barnpornografibrottets gärningsformer, narkotikabrukets undantag, de skilda småbrottsreglerna i smugglingslagen och enbart PS för grovt skattebrott. Grundkortens hopfällda förstadieavsnitt visar den kontrollerade förklaringen och källan. Äldre generella förstadienoteringar ersätts i visningen för dessa 326 kort.

**Fem grova grader hade felaktigt negativa besked:** grov förgöring (FPS), grovt hindrande av urkunds bevisfunktion (FP), grov penningförfalskning (FP), grov olovlig underrättelseverksamhet mot främmande makt (FPS) och mot person (FPS). Den grova graden definieras i samma straffbestämmelse som den brottstyp som räknas upp i 13:12, 14:13 respektive 19:14. Sammanlagt 13 kombinationer ändras; de båda stämplingskombinationerna i 14 kap. förblir negativa. Det gamla negativa intyget sparas i ett separat ersättningsregister och räknas inte som ett nytt godkännande. Föräldraparagraf och kriminaliseringsparagraf jämförs i sin helhet; ändrade källor lämnar korrigeringen ogjord.

Det finns nu **452 positiva och 715 negativa förstadiekombinationer**. Alla 452 positiva har strukturerat rekvisitstöd, utan fullständigt juridiskt godkännande. De 13 omklassificerade kortens gamla negativa lagtextbesked ersätts. Straffskala, åtalsregel och tvångsmedelsgrund hålls öppna tills separat prövning är färdig; **56** positiva kort saknar därför färdig individuell straffskala mot tidigare 43. Det är en synlig rättelse av arbetsbehovet och ingen ny generell straffskaleutfästelse.

Grundbrottens nio juridiska dimensioner har **1 564/3 510** begränsat avslutade moment, varav förstadiefrågan nu 390/390. **1 946 juridiska moment och 18 publiceringsmoment återstår.** Praxis, historisk lag, ansvarsfrihet och konkret 23 kap.-prövning har inte godkänts genom detta pass. Fullständiga juridiska slutgodkännanden är alltjämt noll.

Primärkällor: Riksdagens aktuella [BrB](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), [NSL 4 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/), [smugglingslagen 14 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/), [PTBL 8 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/), [SkBrL 11 §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/), [bidragsbrottslagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/) och [LBE 30 a §](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/), kontrollerade 20 oktober. Ursprungliga kurskällor behåller sin tidigare roll; de ersätter inte författningens aktuella kriminaliseringsuppräkning.


## Tillägg 20 oktober: 85 procent och 174 separata gradgranskningar

**10 159/11 949 moment = 85,0 %, 1 790 kvar.** Senaste blocket avslutar **174 befintliga grundbrottsmoment och ett nytt regressionstest**, totalt 175 moment. Nämnaren ökar endast med testkommandot. Exakt andel överstiger 85 procent före avrundning. Ingen grundpost eller förstadiepost läggs till eller tas bort.

Varje grundkort har en egen fast manifestpost med identitet, brottstyp, fullständig egen paragraftext och de fullständiga källparagrafer som gradfrågan beror på. De 174 kontrollerna omfattar 41 kort i 4 kap., tre i 5 kap., 24 i 6 kap., sex i 7 kap., 22 i 13 kap., 22 i 14 kap., 29 i 15 kap., 21 i 17 kap. och sex i 20 kap. Underlaget består av **101 kompletta paragrafer och 94 uttryckligt avgränsade bestämmelsefamiljer**. Familjernas delade underlag ger inte egna procentpoäng; poängen tillhör varje separat grundkorts avslutade gradfråga.

Rekvisitavsnittet får en hopfälld fördjupning om brottsgrad och kvalifikationsgrunder. Den visar relevanta grader/alternativ, lagens särskilt angivna omständigheter, uttryckliga avgränsningar, källa och datum. Ingen automatisk grovhetsbedömning görs. Ringa-undantag utan straffbar bötesgrad skiljs från faktisk ringa brottsgrad. Grov oaktsamhet skiljs från grov brottsgrad. En uttrycklig lägre skala vid mindre allvarligt brott skiljs från ansvarsfrihet vid mindre allvarlig gärning.

Särskilt redovisas uppsåtsvillkoret för grovt tjänstefel, tystnadspliktsbrottets skilda uppsåts-/oaktsamhetsalternativ, ringa rymning som inte utgör brott, gradindikatorernas skillnader mellan vuxen- och barnsexualbrott, menedens särskilda uppsåtsindikatorer, normalgradens och den grova gradens gräns vid angrepp mot tjänsteman och den ringa urkundsförfalskningens rubricering förvanskning av urkund. Brukande av det förfalskade har ett eget kontrollerat hänvisningsträd till förfalskningstypens gradregler. Nordiska och internationella utsagor behåller skilda eds-, partsutsage- och oaktsamhetsalternativ; menedens grova grad förs inte över till partsutsaga eller ovarsam utsaga.

Kontrollen gäller **aktuella lagtextens gradgrenar och uttryckliga indikatorer**. Enskild gärning, rättspraxis, historiska lydelser, konkurrens och fullständig juridisk gradbedömning kvarstår. Även en bestämmelse utan särskild indikatorlista anges uttryckligen som sådan; inga beloppsgränser eller andra egna kriterier har uppfunnits. Befintliga rekvisitgrupper, kvalifikationsanteckningar, straffskalor, förstadier och övriga revisionsdimensioner bevaras.

Källförändring, ofullständig lagtext, fel källadress, framtida granskningsdatum eller ändrad grundtext lämnar berörda moment öppna. En befintlig separat gradspärr skrivs inte över. Ändrad urkundsförfalskningskälla spärrar även hänvisningsbrottet; ändrad menedskälla spärrar också berörda nordiska/internationella utsagor.

Brottsgradsdimensionen har nu **179/390** källavgränsade moment avslutade, inklusive fem tidigare i 12 kap. Totalt **1 738/3 510 juridiska delmoment**, med **1 772 juridiska och 18 publiceringsmoment kvar**. Fullständiga juridiska slutgodkännanden är fortfarande noll. De 56 öppna förstadiestraffskalorna och 14 villkorade grundstraffskalefallen kvarstår. Källa: [Riksdagens aktuella BrB](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), jämförd 20 oktober.
