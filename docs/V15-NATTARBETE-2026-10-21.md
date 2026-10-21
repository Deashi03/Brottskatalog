# Återuppta Brottskatalog 1.5 utan publicering

Användarens instruktion den 21 oktober 2026: färdigställ arbetet så långt det kan verifieras, sikta på färdig utveckling, avvakta helt med publicering och skriv en något detaljerad rapport om exakt vad som skiljer mot 1.4. Rapporten ska beskriva verkligt genomförda ändringar och öppna frågor. Inga påhittade procentsatser eller juridiska godkännanden för att möta ett mål.

## Var arbetet finns

- Repository: `Deashi03/Brottskatalog`, draft PR #2.
- Arbetsgren: `v15-komplett-brb-rekvisit-typexempel`.
- Publicerad 1.4-baslinje på `main`: `0bbbe45d70d01a92a7874c74862cc7d21bae2355`.
- Senaste verifierade appändring: GitHub-commit `50e59cb01c9b0a02ae55dfd68a3a624f63af685f`, träd `19a2da43a86dfbd9f862c074409dc41ebbc3e7cb`.
- Grön CI 1016: https://github.com/Deashi03/Brottskatalog/actions/runs/39506352021. Alla 145 lokala Node-kontroller passerade; CI inkluderar även mobilkommandot. 146 kommandon är registrerade totalt.
- Föregående grön CI 1015: https://github.com/Deashi03/Brottskatalog/actions/runs/39505688856.
- Jämförelserapport: `docs/V15-JAMFORELSE-MED-V14.md`; exakt maskinläsbar bilaga: `data/v15-v14-change-inventory.json`.

Hämta alltid aktuellt grenhuvud först. Senare dokumentations- eller arbetscommits kan finnas. Lokala och GitHub-skapade commit-ID:n kan skilja medan träd-ID:n är lika. Skriv med förväntat huvud/lease; skriv inte över parallella ändringar.

## Fasta begränsningar

1. Ingen merge till `main`, ingen release-tag, ingen Pages-publicering och inget anrop som startar deploy. PR förblir draft.
2. Bevara användarens tidigare urval och källkrav. Svåra typexempel ska inte hittas på. Källbunden undervisningstext är inte fullständig rättslig acceptans.
3. Läs och jämför primärkällan för varje saklig ändring. Lagtext, förarbeten och avgöranden har olika roller. Frånvaro av en hittad dom är inte bevis för att relevant praxis saknas.
4. Slå inte på fullständiga juridiska markeringar, operativa befogenheter eller automatiskt gren-/lagversionsval genom generella mallar. Repo-akter kräver fortfarande oberoende juridisk slutgranskning.
5. Inga subagenter är auktoriserade. Arbeta i en följd och spara verifierade resultat i grenen.
6. Räkna bara faktiskt avslutade moment enligt den befintliga metoden. Publikationsmoment förblir öppna enligt den senaste instruktionen. Om en ny utvecklingsmätare behövs, redovisa den separat med tydlig nämnare.

## Verifierat nuläge

390 grundkort (322 BrB, 68 speciallag), 1 167 förstadiekort, 1 557 revisionsposter och 1 545 synliga poster. 452 positiva och 715 negativa förstadiekombinationer. 59 begreppsförklaringar. 390 grundkort har strukturerade rekvisit, daterad fulltext och lagtextbundna begränsningsanteckningar. 376 numeriska grundskalor samt 14 villkorade/härledda skalor; ingen automatisk gren väljs.

Den befintliga progressrapporten ger 11 503/11 957 = 96,2 %, 454 moment kvar. De 3 074 avslutade juridiska delmomenten är uttryckligen källavgränsade. Noll grundkort är fullständigt juridiskt slutgodkända.

Återstående räknade frågor: 45 tids-/ikraftträdandefrågor, 390 förarbets-/praxisfrågor, ett åtalsfilter (grovt olaga tvång) och 18 release-/publiceringsmoment. 56 positiva förstadiekort saknar löst individuellt numeriskt intervall och är fortsatt en releaseblockering. Allmänna ansvarsfrihetsgrunder, konkret konkurrens, faktisk gärningsdag och full historisk jämförelse ingår inte i tidigare snäva godkännanden.

## Senaste utförda arbete

`remaining-statutory-limits-review-15.js` och dess JSON-manifest: 130 individuellt mappade kort i BrB 8, 9, 10, 11, 16, 18, 19, 21 och 22 kap.; 98 egna paragrafer och 110 källparagrafer. De 110 texterna har även jämförts direkt mot hämtad officiell konsolidering. Fem granskade tryckavstavningar i tre paragrafer normaliserades i jämförelsen (vil-ken, miss-förhållande, Det-samma, om-fattning, lydnads-brott); inga sakskillnader återstod.

`preparatory-reform-notes-15.js`: 50 avgränsade anteckningar till prop. 2025/26:218 avsnitt 10.1, mappade till 32 straffparagrafer. Dessa anteckningar ger uttryckligen INGA poäng i förarbets-/praxisblocket. De syns i en hopfälld del under Rekvisit. Regressionen testar källavvikelse, ofullständigt underlag, saknat datum och bevarande av alla tidigare uppgifter.

## Lämplig fortsättning

- Kör progress- och releaseinventering för aktuellt grenhuvud. Läs öppna poster i `data/base-temporal-review-15.json` och revisionsakterna; anta inte att siffrorna ovan fortfarande är aktuella efter andra körningar.
- Lös tidsfrågorna med verkliga ikraftträdandekällor. 37 kort saknar explicit ändringsidentifierare i egen text; härled inte originaldatum enbart av saknad Lag-fotnot. Åtta äldre kort saknar fastställd dag för sex äldre ändringslagar.
- En konkret verifierad källa att arbeta vidare med är den ursprungliga SFS 1975:239: https://www.lagboken.se/documentfile/getfile?docId=2590635&download=1&portalId=56&propId=5 . Den återger officiellt tryck, 4 kap. 9 a–9 b och 11 §§ samt ikraftträdande **1 juli 1975**. Kontrollera själva dokumentet innan integration; metadata från sekundärsida räcker inte. Nuvarande öppna kort är olovlig avlyssning.
- Utred grovt olaga tvångs åtalsfilter med lagtext och relevant historik. Den separata beteckningen infördes genom 2016 års reform; aktuell 4:11 har ett särskilt gärningssättsvillkor. Dra inte slutsatsen enbart från brottsnamnet. Prop. 2015/16:113 avsnitt 7.5 har lästs men löser inte ensam tolkningsfrågan.
- Fortsätt individvis med relevanta förarbeten OCH praxis. Prioritera vanliga brott och konkreta tolkningsfrågor. Läs själva primärkällan, ange avgörande/avsnitt och pröva om resonemanget fortfarande gäller efter senare lagändringar. En ensam reformanteckning är inte en färdig helhetsgranskning.
- Uppdatera jämförelserapporten efter verkliga nya ändringar och redovisa kvarstående spärrar. Ändra inte baslinjen 1.4 i tysthet. Nytt grenhuvud kan jämföras mot samma baslinje.

## Verifiering och beständighet

Arbetskatalog kan behöva återställas från GitHub; anta inte att tidigare scratch-filer eller node_modules finns kvar. Använd GitHub-kopplingen för sparande om vanlig git-push saknar autentisering. `create_tree`, `create_commit`, `update_ref` med verifierat basträd och expected_sha har fungerat. Lokal git och GitHub ska ge samma träd. Granska befintliga filer innan redigering.

Workflow `.github/workflows/ui-tests.yml` anger alla kontrollkommandon. Kör relevanta saktester och efter genomförda kodändringar hela lämpliga sviten samt GitHub-mobilregressionen. Dokumentationsändringar behöver inte skapa extra speglingstester. Testutskrifter och `audit/` är genererade arbetsfiler och ska inte rutinmässigt committas. Spara en tydlig status i denna fil och rapporten innan körningen avslutas.

Om arbete inte kan slutföras med tillräckligt underlag, skriv exakt vad som är öppet och vilken källa eller oberoende prövning som saknas. Fortsätt andra oberoende uppgifter. Beskriv inte nästa schemalagda körning som en garanti om 100 % färdigställande.

## Överlämning efter fortsättning den 21 oktober

Tolv tidsfrågor lösta med sju nya originalkällor; 357 kontroller, 90 källposter, 185 egna BrB-paragrafpinnar och 33 öppna tidsfrågor. Nya källor/kort har checked 2026-10-21 och asOf 2026-10-21; gamla kontroller behåller datumet 2026-10-20. Delmoment 11 515/11 957 = 96,3 %, 442 kvar (33 tid, 390 förarbeten/praxis, ett åtalsfilter, 18 publicering). Inga nya fullständiga juridiska godkännanden. Rapporten innehåller exakt lista på de tolv korten.

Original SFS 1970:225 har lästs: 16:11 omfattas av grundlagsanknutet ikraftträdande, inte datumet 1970-07-01 för andra paragrafer. Fortsatt öppen tills primär bekräftelse på grundlagsändringens verkan hämtats. Original SFS 1962:700 finns på https://www.lagboken.se/documentfile/getfile?docId=2683604&download=1&portalId=56&propId=5 men OCR-texten är mycket skadad. De 32 kvarvarande kortens originalparagrafer måste jämföras visuellt och följas genom ändringsregistret; frånvaro av Lag-fotnot räcker fortfarande inte.

Lokal Playwright finns, men Chromium-nedladdningen gav ogiltigt zip-innehåll. Mobilregression måste därför verifieras genom GitHub Actions i detta pass. Ingen publicering eller merge är tillåten.

Verifierat slut på detta arbetspass: GitHub Actions https://github.com/Deashi03/Brottskatalog/actions/runs/39555657372 är grön på appcommit `4635ff970a3379708aedeb0e859f43c7d6dfe090` (träd `3449dfe00a6a615afcace16cdf5a9e0a33688aef`), inklusive full Node-svit och iPhone-regression. Alla 145 lokala Node-kontroller passerade, och berörda tids-/progress-/revisionskontroller kördes även om efter sista tillägget. Ingen merge, release eller publicering.

## Fortsättning mot användarens 99-procentsmål

Den 21 oktober har ytterligare 33 tidsfrågor avslutats: 32 visuella originaljämförelser mot SFS 1962:700, 27 egna paragrafer med separat registerkontroll och BrP 1 §, samt BrB 16:11 med datum 1971-02-17 bekräftat i prop. 1978/79:179 s. 20. Totalt 390 tidskontroller, 95 källposter, 213 egna BrB-paragrafpinnar, noll öppna tidsfrågor. Alla nygranskade poster är daterade 2026-10-21. Originaljämförelse har separata sidangivelser och registervillkor i manifestet.

`case-law-boundaries-15.js` och JSON-manifestet tillför sex avgränsade undervisningsexempel från tre lästa primärdomar: B 406-24, B 4926-23 och B 6185-22. Antalet grundkort med typexempel15 är 31. Ny regression körs genom import från befintliga praxis_vapenbilden_15_test.mjs, så CI omfattar fortfarande 146 unika Node-kommandon. Modulen tillför inga juridiska godkännanden eller praxispoäng.

Status: 11 548/11 957 = 96,6 %, 409 kvar (390 förarbeten/praxis, ett åtalsfilter, 18 publicering). För minst 99 % krävs ytterligare 290 avslutade moment enligt samma metod. Målet är inte uppnått; redovisa detta öppet. Försök inte ersätta fullständig förarbets-/praxisgranskning med enstaka domsexempel. Grovt olaga tvångs åtalsfråga är fortfarande öppen; prop. 2016/17:108 s. 39 diskuterar grov utpressning och avgör inte tvångsfrågan.

Källor för vidare arbete: Klimatblockaden, B 3626-24/NJA 2025 s. 761, har endast lästs i HD:s nyhet och sekundär återgivning; primärdomen har inte hämtats och har därför INTE integrerats. HD:s nyhet anger uttryckligen att endast sabotage prövades, inte ohörsamhet mot ordningsmakten. Sök rättspraxis nya post är f94bbaea-955a-4308-9eb8-2c384960ad31. Ge inte ett nytt prejudikatgodkännande från nyheten ensam.

Parallell commit `6c79fbd2a7cf2447df6023d92e8ae2edad83ad8f` har sammanförts: dess källänkar i tidsvyn, utökade mobilkontroller och maskinläsbara jämförelseinventering bevaras. Den här versionen bevarar även den separata registerpinnen och originaljämförelsens stoppvillkor (95 källposter). Tidigare testkörning korsade sammanfogningen och används inte som slutbevis; hela sviten körs om på det sammanförda trädet. Inventeringsbilagan är den parallella tidsgranskningens ögonblicksbild; de sex HD-exemplen redovisas i jämförelserapporten.
