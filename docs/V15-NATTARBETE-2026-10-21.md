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


### Verifierat GitHub-resultat för 17-intervallspaketet

Appcommit ce06764885938290684fd394b802f9443054baaa, träd de9d035ff69b65cb27ed84a7119ec2d093ef5172, har avslutad grön Actions 1029 inklusive hela Node-sviten och iPhone-regressionen: https://github.com/Deashi03/Brottskatalog/actions/runs/39608510636 . Den lokala fullständiga sviten körs separat; inget ännu obekräftat lokalt slutresultat räknas in här. Nästa förberedda block omfattar nio försöksintervall och fyra förstadieintervall till de två grova vapenbrottsgraderna, med självständigt läst aktuell BrB 26:1 (SFS 2026:1318 från 1 augusti 2026). Framtida lydelse 2026:1654 väljs inte automatiskt. Detta är en arbetsnotering, inte redan införd kod.


## Nytt paket: 13 ytterligare intervall och omladdningsrättelse

Den 21 oktober har ytterligare **nio försöksintervall och fyra förberedelse-/stämplingsintervall** integrerats. Tidigare saknades en individuellt kontrollerad numerisk skala för samtliga. Mappningarna, grundskalorna, hela textpinnarna och källornas ursprungliga kvalitetsflaggor finns i `data/additional-stage-intervals-15.json`.

| Förstadiekort | Aktuell ordinär skala | Individuellt lästa specialparagrafer |
|---|---|---|
| Försök till grovt spridande av gift eller smitta | Fängelse 1 mån – högst 18 år eller livstid | BrB:13:7; BrB:13:12 |
| Försök till grov penningförfalskning | Fängelse 1 mån – högst 8 år | BrB:14:6; BrB:14:13 |
| Försök till olovlig befattning med falska pengar | Böter – fängelse högst 2 år | BrB:14:7; BrB:14:13 |
| Försök till grov kapning | Fängelse 1 mån – högst 18 år eller livstid | BrB:13:5a; BrB:13:12 |
| Försök till grovt sjö- eller luftfartssabotage | Fängelse 1 mån – högst 18 år eller livstid | BrB:13:5a; BrB:13:12 |
| Försök till grovt flygplatssabotage | Fängelse 1 mån – högst 18 år eller livstid | BrB:13:5b; BrB:13:12 |
| Försök till grovt vapenbrott | Fängelse 1 mån – högst 7 år | Vapen:18:2; Vapen:18:15 |
| Förberedelse till grovt vapenbrott | Böter – fängelse under 7 år | Vapen:18:2; Vapen:18:15 |
| Stämpling till grovt vapenbrott | Böter – fängelse under 7 år | Vapen:18:2; Vapen:18:15 |
| Försök till synnerligen grovt vapenbrott | Fängelse 1 mån – högst 10 år | Vapen:18:2; Vapen:18:15 |
| Förberedelse till synnerligen grovt vapenbrott | Fängelse 1 mån – under 10 år | Vapen:18:2; Vapen:18:15 |
| Stämpling till synnerligen grovt vapenbrott | Fängelse 1 mån – under 10 år | Vapen:18:2; Vapen:18:15 |
| Försök till olaga frihetsberövande (mindre grovt fall) | Böter – fängelse högst 2 år | BrB:4:2; BrB:4:10 |

Försök följer BrB 23:1: högsta straff är samma som för fullbordat brott, och böter är uteslutna när fullbordansminimum är minst två år. Förberedelse och stämpling följer BrB 23:2: straffet ska ligga under fullbordansmaximum. Böter är möjliga för förberedelse till grovt vapenbrott, men inte till synnerligen grovt vapenbrott med fullbordansminimum sex år. De fyra vapenförberedelse-/stämplingsintervallen har därför öppna övre gränser, utan avrundning till inkluderade sju respektive tio år. Försöket till olovlig befattning med falska pengar är fortsatt begränsat till anskaffande eller mottagande; ringaundantaget består.

BrB 26:1 har självständigt lästs i den aktuella lydelsen SFS 2026:1318, som trädde i kraft den 1 augusti 2026: allmän fängelseminimitid är en månad. Den samtidigt visade framtida lydelsen SFS 2026:1654 väljs inte. Den befintliga maskinimportens `complete:false` och `machine:true` har bevarats; en separat daterad manuell textjämförelse stöder endast dessa fasta intervall. Vapenlagen 18:2 och 18:15 är jämförda mot officiell konsolidering; 2026:1250 gäller från den 1 augusti 2026.

En faktisk omladdningsrättelse ingår också: den äldre återställningen av 13 omklassificerade förstadiekort kunde tömma redan separat granskade intervall vid ny modulstart. De separata intervallgranskningarna återställer nu skalan efter förnyad validering av textpinnar, grad och grundskala. Ett regressionstest jämför samtliga kort före och efter fullständig omladdning. Inga åtalsbesked, häktningsmarkeringar, tvångsmedelsbesked eller övriga revisionsfält ändras av intervalltillägget.

**33 av de ursprungliga 56 intervalluckorna är nu lösta; 23 återstår.** De återstående gäller åtta förberedelse-/stämplingsskalor med livstid i grundskalan, tre krigsvillkorade förstadier och tolv förstadier med alternativa eller härledda grundskalor. Dessa 23 är fortsatt öppna. De 14 villkorade grundskalorna består. Arbetsinventeringen är oförändrad **11 548/11 957 = 96,6 %**, med 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 publiceringsmoment öppna. Inga nya juridiska slutgodkännanden eller progresspoäng.

Teststatus för detta senare paket redovisas först när dess egna körningar är verifierade. Det föregående 17-intervallspaketet har **145/145 godkända lokala Node-kommandon och grön avslutad Actions 1029 inklusive iPhone-regression** på ce06764885938290684fd394b802f9443054baaa.


Nästa arbetsblock: undersök åtta förberedelse-/stämplingsintervall med livstid i grundskalan. Primärkälla att läsa vidare: riksåklagarens svarsskrivelse 14 april 2020, ÅM 2020/2540, https://www.aklagare.se/globalassets/dokument/verksamheten-i-hogsta-domstolen/svarsskrivelser-och-forklaringar/2020/amr-2540-20-forberedelse-till-mord.pdf . Sökutdrag säger att förberedelse till mord har maximum arton år. Hela skrivelsen och aktuell lagändringspåverkan är ännu inte färdiglästa. Uppgiften ska inte behandlas som tillräckligt stöd för automatisk tillämpning på samtliga livstidsskalor. Tre förstadier till grovt våld/hot mot förman kräver bibehållet krigsvillkor enligt BrB 21:1. Tolv alternativ-/härledda förstadier måste granskas per rättsligt alternativ, inte få ett godtyckligt samlat maximum.

Riktade tester för 13-intervallspaketet passerade: base_inchoate_review_15_test (inklusive källmutationer, samtliga 33 nya intervall, full omladdning och exakt manifest), brb_grade_stage_source_audit_15_test, missing_stage_cards_15_test, rekvisit_grader_15_test, coercive_safety_15_test och v15_release_queue_15_test. Den nya direkta runtimejämförelsen mot 1.4 bekräftar 400 tillagda och 1 157 ändrade tidigare poster, noll borttagna, noll ändrade tidigare grundintervall eller custody-huvudvärden. SHA-256 beräknas nu uttryckligen med samma normaliserade sökvägsalgoritm för båda versionerna; tidigare fingeravtryck sparas som historik. Föregående paket ce067 har även 145/145 lokala Node-kommandon. Full CI för det nya paketet ska kontrolleras efter sparning.


### CI-rättelse efter införandet

Intervallpaketet sparades som fadf73377a9e5db0dc5aa0b7c43fe910c2acbb07 (träd 8a6a0b2c0851c62dac8344ab1d26cfa7929b2f21). Actions 1030 stannade vid brb14_stage_scope_15_test, som fortfarande krävde nullskala för det nu separat granskade penningförsöket. Det testet och två liknande äldre källhistoriktester (brb13_poison_stage_scope_hold_15_test och brb_stage_source_repairs_15_test) jämför nu de exakta nya intervallen, utan att godkänna ansvar eller tvångsmedel. Alla tre passerar lokalt. Ny fullständig lokal svit och CI krävs; 1030 är inte grönt. Appkoden ändras inte av denna testanpassning.

Riksåklagarens hela sexsidiga svarsskrivelse AMR-2540-20 har nu lästs, särskilt sidan 4. Den anger högst arton år för förberedelse till mord, men är en partsinlaga från 2020, inte ett prejudikat eller en självständig kontroll av 2026 års generella straffskaleändringar. Ingen av de åtta livstidsrelaterade luckorna stängs enbart med den källan. Tidigare notering att endast sökutdrag lästs är därmed historisk.


## Fortsatt sakarbete: elva ytterligare intervall

Ytterligare **elva** tidigare öppna förstadieintervall har fått individuella textpinnar och avgränsad straffskalegranskning den 21 oktober. Dessa tillkommer efter det verifierade paketet med 13 intervall nedan.

| Förstadiekort | Ordinär aktuell skala | Individuella lagrum |
|---|---|---|
| Förberedelse till grovt spridande av gift eller smitta | Böter – fängelse högst 18 år | BrB:13:7; BrB 13:12 och 23:2 |
| Stämpling till grovt spridande av gift eller smitta | Böter – fängelse högst 18 år | BrB:13:7; BrB 13:12 och 23:2 |
| Förberedelse till grov kapning | Böter – fängelse högst 18 år | BrB:13:5a; BrB 13:12 och 23:2 |
| Stämpling till grov kapning | Böter – fängelse högst 18 år | BrB:13:5a; BrB 13:12 och 23:2 |
| Förberedelse till grovt sjö- eller luftfartssabotage | Böter – fängelse högst 18 år | BrB:13:5a; BrB 13:12 och 23:2 |
| Stämpling till grovt sjö- eller luftfartssabotage | Böter – fängelse högst 18 år | BrB:13:5a; BrB 13:12 och 23:2 |
| Förberedelse till grovt flygplatssabotage | Böter – fängelse högst 18 år | BrB:13:5b; BrB 13:12 och 23:2 |
| Stämpling till grovt flygplatssabotage | Böter – fängelse högst 18 år | BrB:13:5b; BrB 13:12 och 23:2 |

För dessa åtta kort är fullbordansmaximum livstid. Förberedelse och stämpling ska ligga under detta maximum. Det tidsbestämda maximistraffet är **18 år, med inkluderad gräns**, och livstid ingår inte. Fullbordansminimistraffen understiger sex år, vilket medger böter i förstadieskalan. Egen paragraf, BrB 13:12 och aktuell 23:2 är jämförda var för sig. Prop. 2025/26:218, avsnitt 5.3.1 s. 64–65 och s. 120–121, behåller 18-årsgränsen och förstadieskalornas grundkonstruktion. Förarbetsanalysen och de exakta källpinnarna finns i `data/life-stage-interval-research-15.json`.

Den lästa originaldomen GPS-puckarna (NJA 2020 s. 703, B 1371-20) skiljs från riksåklagarens tidigare partsinlaga. Domens tredjedelsriktlinje för straffvärde är inget lagstadgat maximum och används inte som en automatisk beräkning. Inga praxischeckpoints eller fullständiga juridiska godkännanden stängs genom detta tillägg.

| Krigsvillkorat förstadiekort | Skala endast om 21 kap. BrB är tillämpligt |
|---|---|
| Försök till grovt våld eller hot mot förman | Böter – fängelse högst 6 år |
| Förberedelse till grovt våld eller hot mot förman | Böter – fängelse under 6 år |
| Stämpling till grovt våld eller hot mot förman | Böter – fängelse under 6 år |

Här behålls uttryckligen villkoret i BrB 21:1 och kortens befintliga varning. Ingen bedömning görs att kapitlet faktiskt är tillämpligt eller att personen omfattas av dess personkrets. Mobilvyn visar fortfarande **Tillämpningen är villkorad**, följt av skalan och tillämpningsvarningen. Numerisk kontroll ger inga nya positiva tvångsmedelsmarkeringar och ändrar inga åtalsklassificeringar. Källpinnar och tre fasta ID:n finns i `data/war-stage-intervals-15.json`.

**44 av de ursprungliga 56 intervalluckorna har nu fått individuellt kontrollerade skalor; tolv återstår.** Dessa tolv gäller brukande av det förfalskade, myteri, svikande av försvarsplikt, högförräderi samt osann utsaga inför nordisk respektive internationell domstol. De kräver alternativa eller härledda skalor och får inte fyllas med ett godtyckligt gemensamt maximum. Antalet villkorade grundskalor är fortfarande 14. Arbetsinventeringen är oförändrad **11 548/11 957 = 96,6 %**, med 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 publiceringsmoment kvar. Ingen publicering har skett.

**Testbevis för föregående paket:** appcommit `278ccfb316e08c499924f76027d92acd97f51661`, träd `46d7707d30e2ebb3a455d0fb1c59069a2afe9e33`, har **145/145 passerade lokala Node-kommandon och grön avslutad [Actions 1031 inklusive iPhone-regression](https://github.com/Deashi03/Brottskatalog/actions/runs/39611251207)**. Det gäller de tidigare 33 ifyllda intervallen och omladdningsrättelsen. De elva senaste tilläggen får eget fullständigt testbevis efter avslutad körning.


Nästa konkret återstående kö: tolv alternativ-/härledda förstadier. BrB 15:4 a omfattar både menedsalternativ och partsutsaga, men 15:15 omfattar bara mened som inte är mindre allvarlig och grov mened. Partsutsaga och mindre allvarligt menedsfall får inte få förberedelse-/stämplingsskala. BrB 15:4 b har motsvarande begränsning till de tillämpliga menedsalternativen. Kontrollera även 14:13:s ringaundantag för brukande. Använd inte en maxskala som täcker flera rättsligt olika alternativ. Bevara numeriska luckor tills alternativen är särskilt genomgångna. Övriga 390 praxisfrågor och åtalsfrågan kvarstår; inga progresspoäng för intervallpaketen.


## Fortsättning: individuella alternativ för de sista tolv korten

De tolv återstående korten utan ett gemensamt numeriskt intervall har nu fått **44 förstadiespecifika alternativ**. Tidigare visades endast en allmän hänvisning till individuell straffskaleprövning. Nu kan användaren öppna en kompakt meny och läsa rätt alternativ efter egen rekvisitprövning.

| Brottsfamilj | Förstadiekort | Alternativ per kort | Vad som särskiljs |
|---|---:|---:|---|
| Brukande av det förfalskade | 2 | 9 | Urkund, signatur, pengar, värde-/kontrollmärke eller fast märke samt tillämplig grad |
| Myteri | 2 | 5 | Deltagare, anstiftare/anförare, gemensamt våld och annars grovt brott |
| Svikande av försvarsplikt | 1 | 2 | Freds- respektive krigsalternativet |
| Högförräderi | 3 | 2 | Faran ringa respektive inte ringa |
| Osann utsaga inför nordisk domstol | 2 | 2 | Tillämplig normal mened respektive grov mened |
| Osann utsaga inför en internationell domstol | 2 | 2 | Tillämplig normal mened respektive grov mened |

Exempel: förberedelse till högförräderi har en alternativskala med fängelse från en månad till högst 18 år och en annan med böter–fängelse under tio år. Förberedelse till den menedsanknutna normalgraden har högst två år, medan den grova menedsgrenen har böter–fängelse under åtta år. Brukandealternativen skiljer bland annat försöket till brukande motsvarande grov penningförfalskning (fängelse en månad–åtta år) från dess förberedelseskala (böter–fängelse under åtta år).

Ringa fullbordansfall enligt BrB 14:13 är inte med bland de positiva förfalskningsalternativen. För de två domstolsutsagefamiljerna utesluts mindre allvarlig mened, ovarsam utsaga och, i det nordiska fallet, partsutsaga. De får inte av misstag ärva en positiv förberedelse-/stämplingsskala från grundkortet.

Alla tolv kort behåller `penaltyRange:null`; ingen global numerisk skala verifieras eller väljs. Befintliga åtalsbesked, häktningsfält, ansvarsvillkor och revisionsakter bevaras. De 14 villkorade **grundskalorna** behåller sin villkorade status. Underlaget innehåller egen paragraf, särskilt förstadielagrum, aktuella 23:1/23:2 och, där en fängelseminimitid behövs, separat läst aktuell 26:1. Hela mappningen och de ordagranna textpinnarna finns i `data/stage-penalty-alternatives-15.json`.

Av de ursprungliga 56 luckorna har därmed **44 fasta eller uttryckligen tillämpningsvillkorade numeriska intervall och tolv alternativberoende kort med 44 beskrivna grenar** fått särskilt stöd. De tolv saknar fortfarande en enda gemensam numerisk skala av rättsliga skäl; detta omklassificeras inte till ett falskt numeriskt godkännande. Arbetsinventeringen är fortsatt **11 548/11 957 = 96,6 %**, med 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 publiceringsmoment kvar. Inga fullständiga juridiska slutgodkännanden eller nya progresspoäng.

Det föregående elva-intervallspaketet finns på e6fc7f8fcce6ee0c6c859c41c61845c50a851421. Fullständiga testresultat för respektive paket redovisas när körningarna är avslutade; äldre gröna körningar används inte som bevis för senare appkod.


Nästa arbete: verifiera aktuell CI för e6fc7f8 och det senare alternativpaketet; ta därefter itu med verkliga individuella förarbets-/praxisfrågor och åtalsfiltret, inte med att fylla de tolv korten med en falsk gemensam skala. De 44 alternativen måste alltid hållas skilda från automatisk faktisk tillämpning. Fullständiga juridiska godkännanden är fortsatt noll och publicering är inte tillåten.


## Fortsatt primärkällegranskning och visningsrättelse den 21 oktober

Två fel i befintliga förklaringar har rättats efter jämförelse med aktuell BrB 15:11–12 och prop. 2012/13:74, författningskommentaren s. 74–76:

| Kort | Före | Efter |
|---|---|---|
| Osant intygande | Brukande av osann urkund hänfördes till andra stycket | Brukande regleras i tredje stycket; andra stycket avser den grova graden av intygande |
| Missbruk av urkund | Påstådd riktig kopia beskrevs som del av samma brott | Tredje styckets särskilda brott missbruk av handling skiljs uttryckligen ut |

Originaldomarna **NJA 2025 s. 1029, Freja (B 920-25, 4 november 2025, sex sidor)** och **NJA 2018 s. 378, De upprepade förfalskningarna (B 3924-17, 11 juni 2018, tretton sidor)** har lästs. Freja-exemplet länkar nu direkt till domen, med punktangivelse 6–17 i granskningsunderlaget. På korten urkundsförfalskning och grov urkundsförfalskning har en avgränsad förklaring tillkommit om brottsenhet, gradindelning och separat samlat straffvärde, med hänvisning till den senare domens p. 14–28. Upprepning ensam ger normalt inte grov grad; serieframställning och andra försvårande omständigheter kräver egen bedömning. Domens historiska fjortondagars- och sexmånadersminimum importeras inte som aktuella skalor. PDF-filerna har verifierbara SHA-256 i `data/urkund-primary-review-15.json`.

**Visningsfel upptäckt och rättat:** den äldre tidiga returen för villkorad tillämpning dolde de nya alternativen för bland annat myteri. Nu visas både den befintliga tillämpningsvarningen och den expanderbara alternativlistan. Ett äldre test som letade efter exakt kodtext har ersatts med körning av den riktiga renderingsfunktionen: ej straffbart ska ha företräde, och villkor plus alternativ ska båda visas. Mobiltesterna kontrollerar fortsatt varningen och avsaknad av en påhittad gemensam skala.

Åtalsfrågan för **grovt olaga tvång är fortfarande öppen**. Prop. 2015/16:113 s. 79–80 har kompletterats med jämförelsestöd från prop. 2021/22:194 s. 10 och 31: egna grova brottsbeteckningar kan påverka hur 4:11 ska läsas. Den senare propositionen avser dock hemfridsbrott och olaga intrång och avgör inte uttryckligen tvångsformen i andra meningen. Klassificeringen ändras därför inte genom en automatisk analogi. Exakt fråga och läst underlag sparas i `data/grovt-olaga-tvang-prosecution-research-15.json`.

Arbetet ger **inga nya juridiska slutgodkännanden eller progresspoäng**. De 390 förarbets-/praxischeckpunkterna är inte slutgodkända genom dessa avgränsade noteringar. De 14 villkorade grundskalorna kvarstår; 12 förstadiekort saknar med rätta ett enda numeriskt intervall men har tillsammans 44 separata alternativ. Ingen publicering.

**Testspår:** Actions 1032 på e6fc7f8 är avslutad grön inklusive mobil. Actions 1033 på c6f17f3 upptäckte det dolda alternativblocket i mobilvyn. Actions 1034 på 4e6229c avbröts på det äldre kodtexttestet för krigsvillkor. Båda orsakerna är rättade; de tidigare körningarna redovisas inte som gröna. Ny fullständig verifiering av rättelserna görs på nästa appcommit.

Nästa körning ska börja från faktiskt PR-huvud och läsa det senaste testspåret. Bevara samtidiga ändringar med `expected_sha`. Kontrollera särskilt full CI inklusive de sex nya mobilfallen efter visningsrättelsen. Fortsätt därefter med individuellt källarbete: NJA 2009 s. 111 återstår i urkundsdossiern och åtalsfrågan behöver ett uttryckligt stöd om den grova tvångsgraden. Tilldela ingen komplett praxischeckpunkt enbart för att ett rättsfall har lästs. Använd inte 2018 års straffminima som 2026 års värden. De tolv alternativberoende korten ska fortsatt ha `penaltyRange:null` och aldrig välja en gren automatiskt. Nämnaren är kvar 11 957; de 18 publiceringsmomenten är separat avsiktligt ogjorda.


## Arbetsmiljöbrott: sex kontrollerade härledda alternativ

Grundkortet hade tidigare ett enda generellt alternativ: ”Straff följer hänvisad brottstyp; ingen enhetlig straffskala”. Det har nu ersatts med följande sex separata alternativ, kontrollerade mot aktuell BrB 3:7–10 den 21 oktober 2026:

| Tillämplig undergärning | Straffskala som visas |
|---|---|
| Vållande till annans död, normalgrad | Fängelse högst 3 år |
| Vållande till annans död, ringa | Böter |
| Vållande till annans död, grovt | Fängelse 2–6 år |
| Vållande till kroppsskada/sjukdom, normalgrad | Böter eller fängelse högst 6 månader |
| Vållande till kroppsskada/sjukdom, grovt | Fängelse högst 4 år |
| Framkallande av fara för annan | Böter eller fängelse högst 3 år |

Detta ändrar inte grundkortets globala numeriska fält, väljer inte undergärning eller grad och ger inget positivt tvångsmedelsbesked. Alternativen ligger i en stängd expanderbar lista. En ny förklaring skiljer oaktsamhet/uppsåt till åsidosättandet av arbetsmiljöskyldigheten från vållandet av effekt respektive grov oaktsamhet till konkret fara. BrB 3:8:s krav att skadan/sjukdomen inte är ringa framgår i båda skadealternativen. Originalförarbetet prop. 1990/91:140 s. 129–131 har lästs; aktuella skalor hämtas från dagens lagtext, inte från propositionens historiska straffnivåer. Exakta textpinnar och alternativ finns i `data/workplace-derived-penalty-options-15.json`.

Antalet villkorade grundkort är fortfarande **14**, nu med sammanlagt **39 alternativbeskrivningar** i stället för 34. Ett av de två generellt beskrivna härledningskorten har fått sex konkreta alternativ; brukande av det förfalskade har fortsatt ett generellt grundkortsalternativ och separat utvecklade förstadiealternativ. Ingen fullständig praxischeckpunkt eller juridisk slutgranskning godkänns genom denna förbättring. Nämnaren 11 957 och 409 kvarstående moment behålls.

Urkundsdossiern har också kompletterats med hela originaldomen **De vita korten, NJA 2009 s. 111, B 4608-07, 24 mars 2009, tio sidor**. Majoritetens fällande bedömning hålls uttryckligen skild från den skiljaktiga meningen och det särskilda tillägget. Domen rör äldre lagtext före 2013 och ger inget automatiskt undantag eller automatiskt ansvar enligt dagens elektroniska urkundsbegrepp. Denna komplettering ändrar inga appklassificeringar.

**Verifiering:** Riktade tester för de sex alternativen, varje ändrad källpinne, omladdning, 14 grundkorts källkontroll och bevarade krigsvillkor har passerat. Den fulla lokala Node-sviten för föregående apppaket genomfördes med 144/145 direkt godkända kommandon; det enda felet var en testhänvisning till Frejas tidigare nyhetssida och det testet passerade efter byte till originaldomen. Det är testbevis för föregående urkundspaket, inte för senare arbetsmiljökod. Ny full CI inklusive mobil kontrolleras separat.

Nästa handläggning: utgå från aktuellt PR-huvud och verifiera full CI för arbetsmiljöpaktet, inklusive den nya sexalternativsmenyn på iPhone. Överskriv inte generella numeriska värden för att försöka lösa ett villkorat grundkort. Urkundsdossierns NJA 2009 s. 111 är nu läst, inklusive majoritet och skiljaktighet; den ska inte längre tas upp som oläst. Fortsatt urkundspraxis och arbetsmiljöfrågorna om ansvarsfördelning/delegering och kausalitet återstår. Åtalsfiltret för grovt olaga tvång är fortfarande öppet. Bevara 14 villkorade grundkort, 12 förstadier med alternativa skalor och inga nya progresspoäng utan självständig kontroll av den faktiska checkpunkten.


## Senaste testavstämning och fortsatt arbetsmiljöpraxis

Den sparade appkoden på **f1e63d46e07b10347dd22f24b97dab2abd1fade7**, träd **4ac11a812c8633304cb5c1bcf5b375ba7c227d67**, har **145/145 passerade lokala Node-kommandon**. Kommandon, utfall och SHA-256 för respektive testutskrift finns i `data/v15-workplace-verification-2026-10-21.json`. Även den fullständiga [Actions 1037](https://github.com/Deashi03/Brottskatalog/actions/runs/39647518407) är avslutad grön inklusive iPhone-testet. Detta gäller f1e63d4 med arbetsmiljöalternativen, före det senare paketet med 14 brukandealternativ.

Utökningen av arbetsmiljöbrottets alternativ krävde även en ny avstämning av dess tvångsmedelsunderlag. Den gamla textpinnen pekade på det tidigare enda generella alternativet och höll därför korrekt inne kontrollen när sex alternativ infördes. Pinnen har ersatts med de sex individuellt källkontrollerade alternativen och datum 21 oktober. Alla straffskaleberoende besked kräver fortfarande val av konkret gärningsgren; inga befogenheter eller häktningsbesked har blivit positiva. Detta återställer den tidigare granskningens giltighet, ger ingen extra progresspoäng och behåller **11 548/11 957, 409 kvar**.

I mobiltestet jämförs myteri och svikande av försvarsplikt nu med deras verkliga varningstexter. Det tidigare testet antog felaktigt att båda skulle visa krigskapitlens generella varning. Vyn bevarar de faktiska varningarna och visar samtidigt alternativen.

Fyra hela originaldomar om arbetsmiljöbrott har dessutom lästs och sparats som avgränsat granskningsunderlag med PDF-hashar i `data/workplace-primary-case-review-15.json`:

| Dom | Avgränsad slutsats som behöver hållas isär |
|---|---|
| B 4471-02, 5 februari 2004, nio sidor | Arbetsmiljöansvar och orsakssamband kunde konstateras, men tillräckligt klandervärd oaktsamhet saknades i det konkreta fallet |
| B 3184-03, 23 mars 2004, nio sidor | Majoriteten fällde platschefen efter tidigare olycka och oklara ansvarsgränser; den skiljaktiga frikännande bedömningen är inte domslutet |
| B 2011-03, 24 februari 2004, sju sidor | Rektorns säkerhetsansvar medförde inte automatiskt straffansvar; den erforderliga oaktsamheten var inte styrkt |
| B 1609-06, 31 maj 2007, sju sidor | Bristande rutiner för signalman kunde orsaka dödsfallet; HD dömde för normalgraden och prövade dåvarande företagsbotsregler separat |

Inga historiska AFS-nummer, straffnivåer eller företagsbotsregler återges som aktuella 2026-regler. Detta kompletterar granskningen men utgör inte en uttömmande praxisinventering eller ett fullständigt juridiskt godkännande.

Konkret överlämning: kontrollera först aktuellt PR-huvud och Actions för f1e63d4 eller senare huvud. Läs det senaste testbeviset; äldre misslyckade körningar är historik, inte godkänd testning. Appens dåvarande runtimehash var `8d2ef40a75a7674c63ce35ce573ecf5c82cf26b27d65699077f67589603b8e4c`; publicerad 1.4 har hash `b4059fb41c1da166a15f0baf2ced33551075cca206944b26fc17994f1f90700f` enligt metoden i snapshotfilen. De fyra arbetsmiljödomarna ovan och NJA 2009 s. 111 är nu lästa. Fortsätt med nästa faktiskt olästa källa, t.ex. NJA 1991 s. 247, 1993 s. 245 och senare ansvarspraxis; återanvänd inte sökträffar som om originalen lästs. Gör fortsatt separat undersökning av åtalsfrågan i BrB 4:11 för grovt olaga tvång. 390 praxischeckpunkter, ett åtalsfilter och 18 avsiktligt orörda publiceringsmoment kvarstår. Ingen main-merge, release, tagg eller deploy.


## Alla 14 villkorade grundkort har nu konkreta alternativ

Även grundkortet **Brukande av det förfalskade** har nu fått konkreta skalor. Den tidigare enda generella hänvisningen har ersatts med **14 alternativ** efter individuell kontroll av BrB 14:1–3, 5–6 och 8–10:

| Den förfalskning brukandet motsvarar | Antal grundkortsalternativ |
|---|---:|
| Urkundsförfalskning/förvanskning/grov urkundsförfalskning | 3 |
| Signaturförfalskning, ringa/normal/grov | 3 |
| Penningförfalskning, ringa/normal/grov | 3 |
| Märkesförfalskning, ringa/normal/grov | 3 |
| Förfalskning av fast märke, ringa/normal | 2 |

Här ingår fem ringa fullbordansalternativ. Försöks- och förberedelsekorten behåller däremot sina nio alternativ var och undantar ringa fullbordansfall enligt 14:13. Grundkortets 14 alternativ får alltså inte kopieras rakt till förstadierna. Olovlig befattning med falska pengar enligt 14:7 är inte en egen förfalskningstyp i denna lista. Samtliga skalor och exakta lagtextpinnar finns i `data/forged-use-derived-penalty-options-15.json`.

Tillsammans med arbetsmiljöbrottets sex alternativ innebär det **52 konkreta alternativbeskrivningar på 14 villkorade grundkort**. De två tidigare generella hänvisningsalternativen har utvecklats till 20 konkreta beskrivningar. Alla 14 grundkort behåller sin villkorade status. Ingen gemensam numerisk skala tilldelas, ingen faktisk gren väljs och ingen brottsgrad eller befogenhet godkänns automatiskt. Både grundkortens och förstadiernas längre listor kan öppnas vid behov.

Straffskaleberoende tvångsmedelskontroller har stämts av mot respektive nya alternativlista och kräver fortfarande eget val av konkret gren. Förstadiernas källkontroller är uppdaterade till det nya grundkortets alternativ utan att tilldela ringa förstadier straffansvar. Det tillkommer inga progresspoäng: **11 548/11 957 = 96,6 %, 409 kvar**, varav 18 avsiktligt ogjorda publiceringsmoment. Fullständiga juridiska godkännanden är fortfarande noll. Ny fullständig testning av detta sista alternativpaket görs separat från föregående paket.

Överlämning efter grundkortens alternativarbete: utgå från faktiskt PR-huvud; bekräfta att alla 14 grundkort har sammanlagt 52 konkreta alternativ, att brukandets grundkort har 14 inklusive fem ringa, och att dess två positiva förstadier fortfarande har nio var utan ringa. Kontrollera full CI inklusive den nya mobilmenyn för grundkortet. Dossiern för arbetsmiljöbrott omfattar nu även hela B 3184-03, majoritet och skiljaktighet. Nästa källarbete gäller ännu olästa relevanta avgöranden och aktuellt föreskriftsstöd, samt den uttryckliga åtalsfrågan för grovt olaga tvång. Skapa inga fullständiga praxisgodkännanden genom att enbart räkna källor eller anteckningar. De villkorade korten är inte längre generella tomma hänvisningar, men faktisk tillämpning och juridisk slutrevision är fortfarande separata frågor.

Senaste alternativpaketets aktuella runtimehash: `9ee8139fc2520e2c6e5a474a112b98729268677d8acfe5b611687631d44188c7`. Jämför alltid aktuell snapshot med faktiskt apphuvud; en senare dokumentationscommit ändrar inte appens runtimehash.
