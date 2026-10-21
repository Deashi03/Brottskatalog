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

## Verifierad tidsgranskning och samtidiga ändringar

Appcommit `6c79fbd2a7cf2447df6023d92e8ae2edad83ad8f` (träd `33fdaee23cf4c19cb11bc1f7c346619e1549429c`) verifierades med **145/145 godkända lokala Node-kommandon** och **grön GitHub Actions 1020**, inklusive iPhone-regression: https://github.com/Deashi03/Brottskatalog/actions/runs/39558857264 . Alla 33 nytillagda egna paragrafer matchar också nyhämtad officiell fulltext efter normalisering av HTML-mellanrum före skiljetecken.

Vid sista kontrollen fanns senare appändringar till `7c80def9f66ea5d92f73e64b6650935c9330e030`, med HD-exempel, separat registerpinne och ytterligare mobiltester. Dessa ändringar bevaras helt. Ovanstående gröna körning gäller **6c79fbd**, inte automatiskt det senare appträdet. För 7c80def pågår Actions 1022: https://github.com/Deashi03/Brottskatalog/actions/runs/39559455472 . Hämta dess slutresultat innan den senare versionen betecknas som verifierad.

Räkningen är fortsatt 11 548/11 957 = 96,6 %, med 409 moment öppna och noll fullständiga juridiska slutgodkännanden. Senare registerpinne innebär 95 tidskällposter. Inga publiceringsmoment stängs. Kontrollera faktiskt aktuellt huvud före nästa arbete och använd skyddad refuppdatering.

## Slutverifiering av sammanförd version

Datum: 21 oktober 2026. Appcommit `07683f8126a034e2651e0946df60d1356edd91f8` har **grön och avslutad GitHub Actions 1024**, inklusive hela Node-sviten och iPhone-regressionen: https://github.com/Deashi03/Brottskatalog/actions/runs/39596389485 . Körning 1022 hade ett testfel efter sammanfogningen: den sökte ISO-datum i svensk utskriven datumtext. Mobiltestet kontrollerar nu både den faktiska svenska texten och det exakta strukturerade ISO-datumet för de fem nya fallen. Databasens datum har inte ändrats av rättningen. De sex HD-exemplen, den separata registerpinnen och övriga parallella ändringar bevaras.

Detta ersätter tidigare noteringar om att 1022 pågår. Aktuellt avgränsat arbetsläge är fortsatt **11 548/11 957 = 96,6 %**, 390 tidskontroller och 95 tidskällposter. **409 räknade moment kvar:** 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 publiceringsmoment. 56 förstadieintervall, 14 villkorade grundskalor och oberoende juridisk slutgranskning kvarstår. Noll fullständiga juridiska slutgodkännanden. PR #2 förblir draft; ingen merge, tagg, deploy eller publicering har genomförts.


## Nytt arbetspass och bekräftad schemaläggning

Den 21 oktober har GitHub-huvudet `4275666a08b66cace3b367e5d8f86f44fb63bfe4` återställts lokalt. Progressscriptet har körts: 11 548/11 957, 96,6 %, 409 kvar. Releaseinventeringen bekräftar 56 olösta positiva förstadieintervall och 14 villkorade grundskalor. Ingen ändring av dessa siffror är motiverad av arbetet nedan.

16 timvisa fortsättningar har faktiskt skapats och bekräftats av Automations, med första start 2026-10-21 kl. 15.34 Europe/Stockholm och sista schemalagda tillfälle 2026-10-22 kl. 06.34. Uppgiftens titel är Färdigställ Brottskatalog 1.5. Kontrollera verkligt körningsutfall, inte bara uppgiftens existens. Vid nästa körning: läs aktuellt PR-huvud och denna fil. Ingen publicering är tillåten.

Klimatblockaden har nu integrerats på Sabotagekortet från HD:s officiella engelska domsöversättning, inte från en nyhetsnotis. Fil: https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/engelska-oversattningar/b-3626-24-eng.pdf . SHA-256: 588afa88646c118995588d110bfad6ae94a0ad3675f40d6c1fa5c2b739507bdb. Lästa sidor 6–12, särskilt 10–12. Domens avgränsning är sabotageprövningen. Ingen generell minutgräns eller straffrihet för vägblockader härleds. Svensk originaldom är fortfarande inte hämtad; översättningsstatus framgår uttryckligen i manifest och användartext. Detta ersätter tidigare noteringen att endast nyheten lästs. Noll praxispoäng eller slutgodkännanden tillförs.

Gränsdragningsmanifestet innehåller nu fyra domar (varav en officiell översättning), sju kortexempel och fem paragrafpinnar. 32 grundkort har typexempel15. Regression och mobilfall för sabotage är tillagda. Åtalsfrågan för grovt olaga tvång har sökts vidare i 2016 års reform; inget tillräckligt uttryckligt stöd för att stänga den hittades. Den är fortsatt öppen.

Jämförelserapporten har en aktuell avstämning överst. data/v15-v14-current-snapshot.json dokumenterar en ny full runtimejämförelse mot den återhämtade 1.4-baslinjen 0bbbe45: 400 nya poster, 1 157 ändrade tidigare poster, inga borttagna ID:n, inga ändrade numeriska grundintervall eller custody-huvudvärden. Bevara äldre ögonblicksbilder som historik.


### Fortsatt sakarbete: tre försöksintervall

Efter c430b8f tillkommer tre separat primärkällkontrollerade ordinarie försöksintervall: grov förgöring (böter–fängelse högst sex år), grovt hindrande av urkunds bevisfunktion och grov bevisförvanskning (båda böter–fängelse högst fyra år). Varje fast ID mappas till egen paragraf, särskild förstadieparagraf och exakt fulltext i BrB 23:1. Grundminimistraff sex månader innebär att böter inte utesluts av tvåårsgränsen i 23:1. Underlag: aktuell officiell konsolidering läst den 21 oktober.

Tillägget ligger som en separat IIFE sist i base-inchoate-review-15.js, efter den äldre återställningen av tretton korrigerade förstadiekort. Det får inte flyttas före den återställningen. Tre befintliga kort får penaltyRange och en avgränsad stageAttemptPenaltyReview15. Inga grundskalor, åtalsklassificeringar, ansvarsgodkännanden eller tvångsmedelsbesked ändras. Regressioner prövar ändrad primärkälla/grundskala, ofullständig källa, upprepad inläsning och bevarande av alla andra fält. Inga nya CI-kommandon eller progresspoäng tillkommer.

**Aktuell konkret releasebegränsning: 53, inte 56, positiva förstadieintervall saknar numerisk skala.** 14 villkorade grundskalor kvarstår. Arbetsräkningen är fortsatt 11 548/11 957, 96,6 %. Förra avsnittens 56 är historiska före detta tillägg. 390 förarbeten/praxis, ett åtalsfilter och 18 release-/publiceringsmoment är fortsatt öppna.

Appcommit c430b8f har grön avslutad Actions 1026 inklusive iPhone-regression: https://github.com/Deashi03/Brottskatalog/actions/runs/39601855925 . Dess 145 lokala Node-kontroller passerade också. Detta bevis gäller rättsfallstillägget och första jämförelsesnapshoten, inte automatiskt de senare tre försöksintervallen. Senare paket kräver egna tester.


Nästa konkreta intervallblock att kontrollera individuellt: försök till grov signaturförfalskning (BrB 14:5), grov olovlig befattning med falska pengar (14:7), grov märkesförfalskning (14:8), grov olovlig underrättelseverksamhet mot främmande makt (19:10 a) och mot person (19:10 b). De egna grova skalorna har lästs i officiell konsolidering: minimistraff sex månader; maximum fyra år utom grov olovlig befattning med falska pengar, som har maximum sex år. Detta är endast en konkret fortsatt arbetskö, inga ännu godkända försöksintervall. Kontrollera aktuell fulltext och särskilt lagstöd igen innan integration. För falska pengar består 14:13:s begränsning till anskaffande eller mottagande; för 19 kap. måste särskilda åtalsvillkor hållas separata. Inga förberedelse-/stämplingsintervall eller generella numeriska schabloner godkänns av denna notering.


### Slutverifiering för paketet med tre försöksintervall

Appcommit **4e8f572accf6db3dbb5b45fd5b0b033a9a4f9734**, träd **1729fe4a41a855a9f04fe7a6781175610e7e0200**, har **145/145 passerade lokala Node-kommandon och avslutad grön Actions 1027, inklusive iPhone-regression**: https://github.com/Deashi03/Brottskatalog/actions/runs/39603170302 . Detta ersätter noteringen att paketet väntar på full testning. Alla tre straffskaleintervallen och sabotageexemplet ingår. Inga ändringar av appkoden efter denna testkörning.

Nattuppgiften har återlästs och dess faktiska återkommande regel är nu uttryckligen begränsad med UNTIL till 2026-10-22T04:34:41Z (06.34 svensk tid), med första start den 21 oktober kl. 15.34. Den är aktiv. Uppgiftens instruktion har uppdaterats till 53 kvarstående intervall och kräver omräkning mot nästa aktuella grenhuvud. Körningshistorik var ännu tom vid återläsningen; inga framtida arbetsresultat eller 100 procent påstås.

Slutstatus för detta pass: **96,6 % enligt oförändrad arbetsinventering; 409 räknade moment kvar. 53 olösta positiva förstadieintervall, 14 villkorade grundskalor och oberoende juridisk slutgranskning kvarstår. Inga nya fullständiga juridiska godkännanden. Ingen merge, tagg, release eller publicering.** Fortsätt med den individuella intervallkön ovan och faktisk förarbets-/praxisgranskning, inte med att flytta befintliga poäng eller nämnare.


## Fortsättning på uttrycklig begäran: 17 ytterligare intervall

Arbetet har fortsatt efter användarens förnyade instruktion att färdigställa. Fem ytterligare individuella försöksintervall är kontrollerade: grov signaturförfalskning (14:5), grov olovlig befattning med falska pengar (14:7, begränsad till anskaffande/mottagande), grov märkesförfalskning (14:8), grov olovlig underrättelseverksamhet mot främmande makt (19:10 a) och mot person (19:10 b). Egen fullbordansminimiskala är sex månader för samtliga; försök kan omfatta böter enligt 23:1. Högsta straff fyra år, utom befattningen med falska pengar där det är sex år. Totalt åtta separata försöksintervall i IIFE:n.

Dessutom tolv förberedelse-/stämplingsintervall i en separat efterföljande IIFE i base-inchoate-review-15.js. Mappningarna finns även i data/v15-v14-current-snapshot.json. Fem har öppen övre gräns (maxExclusive), sju har inkluderat maximum två år. Ingen gräns ska avrundas upp till ett inkluderat maximum. Varje ID har egen grundbrotts- och förstadieparagraf, full textpinne och 23:2. Straffskalorna är ordinära aktuella skalor, inte historisk eller konkret ansvarsbedömning. SOU 2024:55 beskriver bötesmöjligheten när fullbordansminimum understiger sex år. Prop. 2025/26:218 avvisar utredningens föreslagna sänkning av maxgränsen sex år till fyra år. Aktuell 23:2 behåller sexårsgränsen.

coercive-safety-15.js håller även separat granskade skalor öppna för självständig tvångsmedelsprövning. Befintliga åtalsklassificeringar och begränsade tidigare revisionsakter bevaras. Riktade källmutations-, databevarande- och gränsvärdestester är utökade; tre mobilfall prövar exakt Under 6 år, 2 år respektive Under 2 år. Alla senare uppgifter om testutfall ska gälla den nya appversionen, inte endast 4e8f572.

**Aktuell återstående intervallkö är 36**, inte tidigare 53 eller 56. 14 villkorade grundskalor och 391 juridiska delmoment (390 förarbeten/praxis och åtalsfiltret för grovt olaga tvång) samt 18 publiceringssteg kvarstår. Arbetsräkningen är oförändrad 96,6 procent; inga poäng eller nämnare ändras för de nytillkomna intervallen. Inget publicerat.
