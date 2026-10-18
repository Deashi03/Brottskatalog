# Brottskatalog V1.5 – mätbar väg till publicering

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
