# Brottskatalog 1.5 jämfört med publicerad 1.4

Avstämning den 21 oktober 2026. **1.5 är sparad som utkast och är inte publicerad eller fullständigt juridiskt slutgodkänd.** Rapporten beskriver genomförda ändringar; kvarstående arbete redovisas separat.

## Jämförelsens underlag

Baslinjen är `main` vid `0bbbe45d70d01a92a7874c74862cc7d21bae2355`, vars README anger **V1.4 – publiceringsversion**. Remote-huvudet har kontrollerats mot samma commit. Jämförelsen avser 1.5-trädet `19a2da43a86dfbd9f862c074409dc41ebbc3e7cb`, sparat i GitHub som `50e59cb01c9b0a02ae55dfd68a3a624f63af685f`. Rapporten och dess bilagor tillkommer efter detta jämförelseläge.

Båda versionernas data har laddats med deras egna skript, i samma ordning som appen använder. Det gör jämförelsen av faktiskt inlästa brottskort mer rättvisande än enbart fil- eller radantal. Samma post-ID används för att identifiera befintliga poster. En ändrad metadatauppgift räknas inte som en ny brottspost.

[Granskningsutkast PR #2](https://github.com/Deashi03/Brottskatalog/pull/2) · [Fullständig kodjämförelse](https://github.com/Deashi03/Brottskatalog/compare/0bbbe45d70d01a92a7874c74862cc7d21bae2355...50e59cb01c9b0a02ae55dfd68a3a624f63af685f) · [Maskinläsbar ändringsinventering](../data/v15-v14-change-inventory.json)

## Katalogens omfattning

| Område | 1.4 | 1.5-utkast | Skillnad |
|---|---:|---:|---:|
| Grundkort | 299 | 390 | +91 |
| Grundkort enligt BrB | 231 | 322 | +91 |
| Specialstraffrättsliga grundkort | 68 | 68 | +0 |
| Förstadiekort | 858 | 1 167 | +309 |
| Samtliga revisionsposter | 1 157 | 1 557 | +400 |
| Synliga/sökbara poster efter katalogurval | 1 157 | 1 545 | +388 |
| Förstadier med särskilt kriminaliseringsstöd | 337 | 452 | +115 |
| Förstadier utan särskild kriminalisering för rubriceringen | 521 | 715 | +194 |
| CI-registrerade Node-kommandon  inklusive mobilkommandot | 10 | 146 | +136 |

Det har tillkommit **91 grundkort och 309 förstadiekort**, totalt 400 poster. Inga av 1.4:s 1 157 post-ID:n har tagits bort. Alla befintliga poster har någon data- eller metadataändring; det betyder inte att alla tidigare brottsbeskrivningar eller straffskalor har ändrats.

**Katalogurval:** Ringa smuggling, ringa smuggling av explosiv vara och ringa tullbrott samt deras nio förstadiekort hålls utanför det synliga urvalet eftersom grundbrotten endast har penningböter. De tolv revisionsposterna bevaras för spårbarhet. Detta är en visningsregel och inget påstående om straffrihet. Därför är nettot i den synliga katalogen +388, trots att revisionsinventeringen växer med 400.

389 relevanta grundkort har nu försök, förberedelse och stämpling som egna ingångar. BrB 4:9 b är ett självständigt förberedelsebrott och får inte egna rekursiva förstadier.

## Rekvisitfunktionen

**Alla 390 grundkort har nu det strukturerade 1.5-formatet för rekvisit.** Krav som ska vara uppfyllda tillsammans skiljs från alternativa gärningsformer. Skuldformer, särskilda syften, åldersvillkor, resultat och farekrav förklaras med anknytning till respektive lagrum. I 1.4 fanns äldre rekvisit-/elementuppgifter; att det nya datafältet saknas där betyder inte att 1.4 helt saknade rekvisitinformation.

Rekvisitfunktionen har utökats med:

- **59 källbundna begreppsförklaringar**, bland annat uppsåtsformer, oaktsamhet, täckning, garantställning, besittning, tillägnelse, vinning/skada, urkund, bevisfara, frivillighet och ansvarsfrihet. Kursanteckningar används som pedagogiskt underlag med bestämda sid-/styckehänvisningar.
- **390 avgränsningsanteckningar** om uttryckliga lagtextbegränsningar och angivna hänvisningar. Exempel är subsidiaritet, ringa fall, rättelse, försvarlighet och särskilda personkretsar. De ersätter inte fullständig konkurrens- eller ansvarsfrihetsanalys.
- **385 särskilda gradpaneler** i data, jämte fem tidigare särlösningar för återstående gradfrågor. De sammanlagt 390 källavgränsade gradkontrollerna är inte automatiska avgöranden om brottsgrad.
- **50 nya förarbetsanteckningar** om 2026 års reform, kopplade till 32 egna paragrafer och författningskommentarerna i prop. 2025/26:218. De skiljer straffskärpningar från ändringar i gränsen mellan grader och håller gemensamt straff för flera brott isär från skalan för ett enskilt brott.
- **452 positiva förstadiekombinationer med strukturerade rekvisitöversikter**. En positiv uppräkning i lag är inte i sig bevis för att förstadiets samtliga rekvisit är uppfyllda i ett ärende.

Nya förklaringar ligger i expanderbara delar under Rekvisit. Ett stort antal textstycken behöver därför inte visas samtidigt på en liten skärm.

## Lagtext, tid och straffskalor

**Lagtext:** 390 grundkort har nu en dokumenterad individuell fulltextjämförelse. 252 av de 299 befintliga grundkortens `law`-fält har ändrats. Detta omfattar kompletterade/trunkerade texter, uppdaterade lydelser och rättelser; det är inte 252 nya kriminaliseringar. Maskinimporterad text får inte automatiskt ärva en manuell granskningsmarkering.

**Gärningstidpunkt:** 390 grundkort har fått särskilda anteckningar om den återgivna paragrafens ändringslag, ikraftträdande och publicerade övergångsbestämmelser. Samtliga tidigare öppna tidsfrågor i detta avgränsade kontrollblock är lösta. Ett datum för en ändringslag är inte automatiskt dagen då brottstypen först infördes, och appen väljer inte lagversion för en konkret gärning. För 7 kap. 4 § hålls den kommande lydelsen från 2027 isär från den nu återgivna lydelsen.

**Straffskalor:** 376 grundkort har kontrollerade numeriska intervall. Ytterligare 14 grundkort har villkorade eller härledda skalor vars grenar beskrivs utan ett påhittat gemensamt numeriskt intervall. De 14 fallen är inte färdigbedömda för konkret grenval.

**Viktig faktisk skillnad mot 1.4:** Inget av de befintliga grundkortens `penaltyRange`-objekt har ändrats i denna jämförelse. Däremot har deras kontrollunderlag och granskningsstatus utökats. Sex befintliga grundkorts strafftexter har ändrats i formuleringen, utan ändrat numeriskt intervall:

| Grundkort | Text i 1.4 | Text i 1.5 |
|---|---|---|
| Trolöshet mot huvudman | Böter eller fängelse högst 2 år | Böter eller fängelse i högst två år |
| Grov trolöshet mot huvudman | Fängelse 1 år–6 år | Fängelse i lägst ett och högst sex år |
| Främjande av rymning eller flykt | Böter eller fängelse högst 1 år | Böter eller fängelse i högst 1 år |
| Grov rymning | Fängelse 6 månader–4 år | Fängelse i lägst sex månader och högst 4 år |
| Rymning | Fängelse högst 2 år | Fängelse i högst 2 år |
| Grovt främjande av rymning eller flykt | Fängelse 6 månader–4 år | Fängelse i lägst sex månader och högst 4 år |

Två befintliga förstadiekorts tidigare numeriska intervall har tagits bort i stället för att godkännas utan tillräckligt stöd: försök till olovlig befattning med falska pengar samt försök till grov bevisförvanskning. Nollvärde eller avsaknad av intervall ska inte läsas som straffrihet. Totalt saknar 56 positiva förstadiekort ännu löst individuellt straffintervall, vilket fortsatt blockerar release.

## Åtalsvillkor och tvångsmedel

Åtalsreglerna har fått individuella källbundna förklaringar för 389 av 390 grundkort. Grovt olaga tvång är fortfarande öppet i detta kontrollblock. Angivelse, allmän synpunkt, närståenderegler, frivillig inlämning och särskilda beslutsordningar hålls isär.

Åtta befintliga grundkort har ändrad huvudklassificering för åtalsvisningen:

| Grundkort | 1.4 | 1.5 | Innebörd |
|---|---|---|---|
| Grovt hemfridsbrott | conditional | general | Normalgradens särskilda åtalsbegränsning överförs inte till den namngivna grova graden. |
| Grovt olaga intrång | conditional | general | Normalgradens särskilda åtalsbegränsning överförs inte till den namngivna grova graden. |
| Vapenbrott | general | conditional | Särskild åtalsprövning vid frivillig inlämning enligt VapenL 18:14; ingen allmän angivelseregel eller automatisk amnesti. |
| Mindre allvarligt vapenbrott | general | conditional | Särskild åtalsprövning vid frivillig inlämning enligt VapenL 18:14; ingen allmän angivelseregel eller automatisk amnesti. |
| Vapenbrott av oaktsamhet | general | conditional | Särskild åtalsprövning vid frivillig inlämning enligt VapenL 18:14; ingen allmän angivelseregel eller automatisk amnesti. |
| Grovt vapenbrott | general | conditional | Särskild åtalsprövning vid frivillig inlämning enligt VapenL 18:14; ingen allmän angivelseregel eller automatisk amnesti. |
| Synnerligen grovt vapenbrott | general | conditional | Särskild åtalsprövning vid frivillig inlämning enligt VapenL 18:14; ingen allmän angivelseregel eller automatisk amnesti. |
| Grovt fordringsbedrägeri | general | conditional | Närståenderegel enligt BrB 9:12 och 8:13; ordet grovt är inte ett generellt undantag. |

**Tvångsmedel:** 390 grundkort har fått separata beskrivningar av lagstadgade straffskaletrösklar och beslutsvägar. Underlaget omfattar bland annat RB och LUL. Straffskala, misstankegrad, ändamål, proportionalitet, personens ålder och behörig beslutsfattare ska fortfarande prövas var för sig. Ingen ändring av ett befintligt grundkorts `custody`-huvudvärde finns i jämförelsen; tilläggen gäller främst förklaringar och skydd mot automatiska slutsatser.

## Typexempel, praxis och källor

31 grundkort har nu material i det nya `typexempel15`-fältet. Detta är inte jämförbart rakt av med 1.4:s äldre faktarutor. Svåra typfall har inte fyllts på enbart för att öka täckningssiffror. Källbundna anteckningar behandlar bland annat HD-avgörandena Vapenbilden, Freja, Alibit, Vinkelslipen, Demonstranten som stannade kvar och Påskupploppet i Örebro samt skillnaden mellan förfalskad urkund, osant innehåll, brukande och falska polisuppgifter. Avgränsade prejudikatanteckningar är inte fullständig praxisgranskning av ett brottskort.

Fyra lämnade kursunderlag är dokumenterade i `data/course-source-manifest-15.json`: Straffrätt Lund 2.docx, Brottsutredning(2).docx, Juridikens grunder(1).pdf och Straffprocessrätt 2.docx. Filfingeravtryck och hänvisningssystem har sparats. Originaldokumenten har inte lagts in i det publika repositoryt. Lagtext och rättsliga slutsatser ska kontrolleras mot officiella primärkällor.

En befintlig rubrik har ändrats: **Brukande av falsk urkund → Brukande av det förfalskade**, med oförändrat post-ID. Benämningen och kopplingen till det förfalskade föremålet förtydligas.

## Teknik, mobilvy och testning

Det jämförda programträdet berör **306 filer**  med 100 628 tillagda och 45 borttagna rader. Många tillägg är datamanifest och tester; radantalet är inte ett kvalitetsmått eller antal juridiska bedömningar.

CI har utökats från 10 till 146 Node-kommandon, där mobilkommandot ingår. Den senaste appändringen har **145 godkända lokala kontroller samt godkänd GitHub Actions-körning 1016**, inklusive det automatiserade mobiltestet. Körning 1015 verifierade föregående paket med de 130 sista lagtextavgränsningarna.

- [Grön körning 1016](https://github.com/Deashi03/Brottskatalog/actions/runs/39506352021)
- [Grön körning 1015](https://github.com/Deashi03/Brottskatalog/actions/runs/39505688856)

Mobiltesterna öppnar och använder de expanderbara delarna och kontrollerar innehåll och bredd i iPhone-stor viewport. Detta är ett automatiserat webbläsartest, inte en fysisk iPhone-kontroll. Offlinecachen har versionsuppdaterats och nya moduler ingår i cachelistan.

Publiceringsflödet innehåller en releasekontroll som ska stoppa ofärdig 1.5. PR #2 förblir draft. Ingen merge, release-tag eller Pages-publicering har genomförts för 1.5.

## Vad som faktiskt återstår

**Den rapporterade arbetsstatusen är 11 548/11 957 = 96,6 %.** Måttet avser den befintliga arbetsinventeringen och inkluderar många avgränsade delkontroller. Det betyder inte att 96,6 % av brottskorten är fullständigt juridiskt godkända. Antalet fullständiga juridiska slutgodkännanden är fortfarande noll.

| Kvarstående räknat område | Antal |
|---|---:|
| Tids-/ikraftträdandefrågor | 0 |
| Individuella förarbets-/praxisfrågor | 390 |
| Åtalsfilter | 1 |
| Release-, publicerings- och efterkontroller | 18 |
| Summa kvar i den befintliga räkningen | 409 |

Därutöver ska de 56 olösta individuella förstadiestraffskalorna och de 14 villkorade grundskalorna fortsatt behandlas som verkliga begränsningar. De får inte döljas bakom att andra avgränsade förstadie- eller gradkontroller är räknemässigt klara.

Användarens nya mål är att färdigställa utvecklingen och avvakta med publicering. De delar av den befintliga 100-procentsräkningen som uttryckligen gäller merge, publicering och produktionskontroll ska därför förbli öppna. En framtida separat status för färdigutvecklad men opublicerad version måste redovisas öppet och får inte ersätta den nuvarande nämnaren i tysthet.

## Fortsatt källgranskning den 21 oktober: tolv tidsfrågor lösta

Originaltryck har tillförts för sju författningar. Fem kort har kontrollerats mot både originalförfattning, aktuell konsolidering och ändringsregistrets omfattningsuppgifter. De övriga sju korten har en uttrycklig ändringshänvisning som nu har fått ett kontrollerat ikraftträdande. Totalt finns 357 daterade paragrafkontroller och 90 tidskällor. Alla sju nya källposter och tolv kortkontroller är daterade 2026-10-21; äldre kontroller behåller sina tidigare datum.

| Kort | Kontrollerad egen paragraf | Lydelsen gäller från | Originaltryck |
|---|---|---|---|
| Olovlig avlyssning | BrB 4:9 a | 1975-07-01 | SFS 1975:239 |
| Egenmäktighet vid förhandling med främmande makt | BrB 19:4 | 1976-07-01 | SFS 1976:509 |
| Oredligt förfarande | BrB 9:8 | 1971-01-01 | SFS 1970:414 |
| Osann utsaga inför nordisk domstol | BrB 15:4 a | 1976-01-01 | SFS 1975:1292 |
| Ovarsam utsaga inför nordisk domstol | BrB 15:4 a | 1976-01-01 | SFS 1975:1292 |
| Överträdelse av myndighets bud | BrB 17:13 | 1982-01-01 | SFS 1981:827 |
| Hindrande av förrättning | BrB 17:13 | 1982-01-01 | SFS 1981:827 |
| Ringa smuggling | Smugglingslagen 4 § | 2001-01-01 | SFS 2000:1225 |
| Ringa tullbrott | Smugglingslagen 9 § | 2001-01-01 | SFS 2000:1225 |
| Vårdslös tullredovisning | Smugglingslagen 11 § | 2001-01-01 | SFS 2000:1225 |
| Penningtvättsbrott | Penningtvättsbrottslagen 3–4 §§ | 2014-07-01 | SFS 2014:307 |
| Penningtvättsförseelse | Penningtvättsbrottslagen 6 § | 2014-07-01 | SFS 2014:307 |

SFS 1976:509 har ett särskilt datum för 19:4; andra delar började gälla 1978-01-01. Källposten är därför uttryckligen begränsad till 19:4. SFS 1975:1292 föreskriver äldre bestämmelser för tidigare gärningar. SFS 1981:827 har särskilda övergångsregler för andra paragrafer som inte får behandlas som egna undantag i 17:13. Smugglingslagens fem ursprungliga övergångspunkter återges med avgränsning mot dagens befogenheter.

Regressionen omfattar dagen före, själva ikraftträdandedagen, källkontrolldagen och dagen efter samt ändrad källtext, övergångstext, originaladress och paragraftext. Ingen automatisk lagversions-, ansvars- eller tvångsmedelsbedömning tillkommer.

Vid denna första delavstämning återstod Otillåtet förfarande med pornografisk bild och 32 kort med möjlig originallydelse. Dessa har därefter kontrollerats enligt nästa avsnitt; skadad OCR har inte använts som bevis för textöverensstämmelse.

## Fortsatt granskning mot 99-procentsmålet: alla tidsfrågor lösta

Ytterligare **33 tidsfrågor** är kontrollerade. 32 grundkort med 27 egna BrB-paragrafer har jämförts visuellt mot originaltrycket SFS 1962:700 och följts genom det officiella ändringsregistret, granskat den 21 oktober 2026 med 370 registrerade ändringsförfattningar. BrP 1 § bekräftar ikraftträdandet den 1 januari 1965. Registrets frånvaro av ändringar används tillsammans med den positiva originaljämförelsen, aldrig som ensamt belägg.

| Grundkort | Egen paragraf | Kontrollerad lydelse från |
|---|---|---|
| Barnadråp | BrB:3:3 | 1965-01-01 |
| Behörighetsmissbruk | BrB:10:6 | 1965-01-01 |
| Bevisförvanskning | BrB:15:8 | 1965-01-01 |
| Brott mot medborgerlig frihet | BrB:18:5 | 1965-01-01 |
| Brott mot rösthemlighet | BrB:17:9 | 1965-01-01 |
| Dråp | BrB:3:2 | 1965-01-01 |
| Falskt åtal | BrB:15:5 | 1965-01-01 |
| Fyndförseelse | BrB:10:8 | 1965-01-01 |
| Förgöring | BrB:13:8 | 1965-01-01 |
| Förskingring | BrB:10:1 | 1965-01-01 |
| Förtal | BrB:5:1 | 1965-01-01 |
| Förvanskande av familjeställning | BrB:7:3 | 1965-01-01 |
| Grov bevisförvanskning | BrB:15:8 | 1965-01-01 |
| Grov förgöring | BrB:13:8 | 1965-01-01 |
| Grovt falskt åtal | BrB:15:5 | 1965-01-01 |
| Intrång i förvar | BrB:4:9 | 1965-01-01 |
| Krigsanstiftan | BrB:19:2 | 1965-01-01 |
| Obefogat åtal | BrB:15:5 | 1965-01-01 |
| Ockerpantning | BrB:9:10 | 1965-01-01 |
| Ohörsamhet mot ordningsmakten | BrB:16:3 | 1965-01-01 |
| Olovlig kårverksamhet | BrB:18:4 | 1965-01-01 |
| Osann partsutsaga | BrB:15:2 | 1965-01-01 |
| Ovarsam utsaga | BrB:15:3 | 1965-01-01 |
| Ringa osann partsutsaga | BrB:15:2 | 1965-01-01 |
| Sabotage | BrB:13:4 | 1965-01-01 |
| Stöld | BrB:8:1 | 1965-01-01 |
| Svikande av försvarsplikt | BrB:18:6 | 1965-01-01 |
| Underlåtenhet att avvärja allmänfara | BrB:13:10 | 1965-01-01 |
| Underlåtenhet att avvärja rättsfel | BrB:15:9 | 1965-01-01 |
| Upplopp | BrB:16:1 | 1965-01-01 |
| Väpnat hot mot laglig ordning | BrB:18:3 | 1965-01-01 |
| Våldsamt upplopp | BrB:16:2 | 1965-01-01 |

För **Otillåtet förfarande med pornografisk bild (BrB 16:11)** är datumet **1971-02-17** nu bekräftat genom originalet SFS 1970:225 och prop. 1978/79:179 s. 20. Källorna skiljer grundlagsanknutet ikraftträdande från den 1 juli 1970, som gäller andra paragrafer. Den historiska propositionen används för just denna datumuppgift, inte som dagens lagtext.

Tidsblocket omfattar nu **390 grundkort, 95 källposter och 213 egna BrB-paragrafpinnar**, med noll olösta tidsfrågor. Regressionen stoppar markering vid avvikande original-, register- eller övergångsuppgift. Historisk ansvarsbedömning och automatiskt lagversionsval är fortfarande inte godkända.

Dessutom har **tre lästa HD-domar gett sex källbundna gränsdragningsexempel** på Olaga hot, Grovt olaga hot, Olaga intrång, Sabotage mot blåljusverksamhet, Grovt sabotage mot blåljusverksamhet och Våldsamt upplopp. Fyra av korten saknade tidigare `typexempel15`; antalet grundkort med detta fält är nu 31. Varje exempel anger mål, datum, exakt avsnitt och primärkälla. Testet kontrollerar fel lagrum, ändrad källtext, otillräcklig proveniens, upprepade inläsningar och att befintliga straffskalor och juridiska markeringar bevaras. Dessa exempel ger **noll** nya poäng i blocket för fullständig förarbets-/praxisgranskning.

Den fasta inventeringen är oförändrad: **11 548/11 957 = 96,6 %, 409 moment kvar**. För minst 99 % krävs 11 838 avslutade moment, alltså ytterligare 290. Kvar är 390 förarbets-/praxisfrågor, åtalsfiltret för grovt olaga tvång och 18 publiceringsmoment. Inga självständiga rättsliga slutgodkännanden har utfärdats.

## Bilaga: samtliga 91 nya grundkort

| Kapitel | Nytt grundkort | Lagrum |
|---|---|---|
| 4 | Barnäktenskapsbrott | BrB 4 kap. 4c § |
| 4 | Förberedelse genom anbringande av tekniskt hjälpmedel | BrB 4 kap. 9 b § |
| 4 | Hedersförtryck | BrB 4 kap. 4 e § |
| 4 | Intygande av sexuell oskuld | BrB 4 kap. 4g § |
| 4 | Oaktsam uppmaning till självmord | BrB 4 kap. 7a § |
| 4 | Olaga frihetsberövande (mindre grovt fall) | BrB 4 kap. 2 § |
| 4 | Oskuldskontroll | BrB 4 kap. 4f § |
| 4 | Uppmaning till självmord | BrB 4 kap. 7a § |
| 4 | Äktenskapsresebrott | BrB 4 kap. 4d § |
| 4 | Äktenskapsresebrott mot barn | BrB 4 kap. 4d § |
| 4 | Äktenskapstvång | BrB 4 kap. 4c § |
| 6 | Samlag med avkomling | BrB 6 kap. 7 § |
| 6 | Samlag med syskon | BrB 6 kap. 7 § |
| 10 | Behörighetsmissbruk | BrB 10 kap. 6 § |
| 10 | Fyndförseelse | BrB 10 kap. 8 § |
| 10 | Grovt olovligt brukande | BrB 10 kap. 7 § |
| 10 | Olovligt brukande | BrB 10 kap. 7 § |
| 11 | Försvårande av konkurs eller exekutiv förrättning | BrB 11 kap. 2 § |
| 11 | Grov oredlighet mot borgenärer | BrB 11 kap. 1 § |
| 11 | Grovt försvårande av konkurs eller exekutiv förrättning | BrB 11 kap. 2 § |
| 13 | Flygplatssabotage | BrB 13 kap. 5b § |
| 13 | Grov kapning | BrB 13 kap. 5a § |
| 13 | Grovt flygplatssabotage | BrB 13 kap. 5b § |
| 13 | Grovt sjö- eller luftfartssabotage | BrB 13 kap. 5a § |
| 13 | Kapning | BrB 13 kap. 5a § |
| 13 | Sjö- eller luftfartssabotage | BrB 13 kap. 5a § |
| 13 | Vårdslöshet med gift eller smittämne | BrB 13 kap. 9 § |
| 14 | Förfalskning av fast märke | BrB 14 kap. 9 § |
| 14 | Grov märkesförfalskning | BrB 14 kap. 8 § |
| 14 | Grov olovlig befattning med falska pengar | BrB 14 kap. 7 § |
| 14 | Grov signaturförfalskning | BrB 14 kap. 5 § |
| 14 | Märkesförfalskning | BrB 14 kap. 8 § |
| 14 | Olaga spridande av efterbildning | BrB 14 kap. 11 § |
| 14 | Ringa förfalskning av fast märke | BrB 14 kap. 9 § |
| 14 | Ringa märkesförfalskning | BrB 14 kap. 8 § |
| 14 | Ringa olovlig befattning med falska pengar | BrB 14 kap. 7 § |
| 14 | Ringa penningförfalskning | BrB 14 kap. 6 § |
| 14 | Ringa signaturförfalskning | BrB 14 kap. 5 § |
| 15 | Osann utsaga inför en internationell domstol | BrB 15 kap. 4b § |
| 15 | Osann utsaga inför nordisk domstol | BrB 15 kap. 4a § |
| 15 | Ovarsam utsaga inför en internationell domstol | BrB 15 kap. 4b § |
| 15 | Ovarsam utsaga inför nordisk domstol | BrB 15 kap. 4a § |
| 16 | Involverande av en underårig i brottslighet | BrB 16 kap. 5a § |
| 16 | Myteri | BrB 16 kap. 6 § |
| 16 | Olaga våldsskildring | BrB 16 kap. 10c § |
| 16 | Otillåten utlämning av teknisk upptagning | BrB 16 kap. 10d § |
| 16 | Upplopp | BrB 16 kap. 1 § |
| 16 | Våldsamt upplopp | BrB 16 kap. 2 § |
| 17 | Hindrande av förrättning | BrB 17 kap. 13 § |
| 17 | Överträdelse av myndighets bud | BrB 17 kap. 13 § |
| 18 | Brott mot medborgerlig frihet | BrB 18 kap. 5 § |
| 18 | Olovlig kårverksamhet | BrB 18 kap. 4 § |
| 18 | Svikande av försvarsplikt | BrB 18 kap. 6 § |
| 18 | Väpnat hot mot laglig ordning | BrB 18 kap. 3 § |
| 19 | Egenmäktighet vid förhandling med främmande makt | BrB 19 kap. 4 § |
| 19 | Grov obehörig befattning med hemlig uppgift | BrB 19 kap. 8 § |
| 19 | Grov olovlig underrättelseverksamhet mot Sverige | BrB 19 kap. 10 § |
| 19 | Grov olovlig underrättelseverksamhet mot främmande makt | BrB 19 kap. 10a § |
| 19 | Grov olovlig underrättelseverksamhet mot person | BrB 19 kap. 10b § |
| 19 | Grovt utlandsspioneri | BrB 19 kap. 6b § |
| 19 | Högförräderi | BrB 19 kap. 1 § |
| 19 | Krigsanstiftan | BrB 19 kap. 2 § |
| 19 | Olovlig underrättelseverksamhet mot Sverige | BrB 19 kap. 10 § |
| 19 | Olovlig underrättelseverksamhet mot främmande makt | BrB 19 kap. 10a § |
| 19 | Olovlig underrättelseverksamhet mot person | BrB 19 kap. 10b § |
| 19 | Olovlig värvning | BrB 19 kap. 12 § |
| 19 | Röjande av hemlig uppgift i internationellt samarbete | BrB 19 kap. 9a § |
| 19 | Tagande av utländskt understöd | BrB 19 kap. 13 § |
| 19 | Trolöshet vid förhandling med främmande makt | BrB 19 kap. 3 § |
| 19 | Utlandsspioneri | BrB 19 kap. 6a § |
| 19 | Vårdslöshet med hemlig uppgift | BrB 19 kap. 9 § |
| 21 | Försummande av krigsförberedelse | BrB 21 kap. 11 § |
| 21 | Grov olovlig avvikelse av krigsman | BrB 21 kap. 7 § |
| 21 | Grovt lydnadsbrott | BrB 21 kap. 6 § |
| 21 | Grovt våld eller hot mot förman | BrB 21 kap. 8 § |
| 21 | Lydnadsbrott | BrB 21 kap. 5 § |
| 21 | Obehörig kapitulation | BrB 21 kap. 12 § |
| 21 | Olovlig avvikelse av krigsman | BrB 21 kap. 7 § |
| 21 | Samröre med fienden | BrB 21 kap. 9 § |
| 21 | Stridsförsumlighet | BrB 21 kap. 13 § |
| 21 | Tjänstebrott | BrB 21 kap. 14 § |
| 21 | Undergrävande av stridsviljan | BrB 21 kap. 10 § |
| 21 | Våld eller hot mot förman | BrB 21 kap. 8 § |
| 22 | Grov olovlig befattning med kemiska vapen | BrB 22 kap. 6a § |
| 22 | Grov olovlig befattning med minor | BrB 22 kap. 6b § |
| 22 | Landsförräderi | BrB 22 kap. 1 § |
| 22 | Landsskadlig vårdslöshet | BrB 22 kap. 3 § |
| 22 | Landssvek | BrB 22 kap. 2 § |
| 22 | Olovlig befattning med kemiska vapen | BrB 22 kap. 6a § |
| 22 | Olovlig befattning med minor | BrB 22 kap. 6b § |
| 22 | Ryktesspridning till fara för rikets säkerhet | BrB 22 kap. 5 § |

Den maskinläsbara bilagan listar samtliga 400 nya poster, alla 1 157 befintliga poster med ändrade fältnamn, före-/eftervärden för centrala användarsynliga uppgifter samt samtliga 306 berörda programfiler i jämförelseträdet. Fullständiga textskillnader per fil finns i GitHub-jämförelsen ovan.

Verifierat slut på detta arbetspass: GitHub Actions https://github.com/Deashi03/Brottskatalog/actions/runs/39555657372 är grön på appcommit `4635ff970a3379708aedeb0e859f43c7d6dfe090` (träd `3449dfe00a6a615afcace16cdf5a9e0a33688aef`), inklusive full Node-svit och iPhone-regression. Alla 145 lokala Node-kontroller passerade, och berörda tids-/progress-/revisionskontroller kördes även om efter sista tillägget. Ingen merge, release eller publicering.

## Verifieringsnotering för de 33 sista tidskontrollerna

Appcommit [`6c79fbd`](https://github.com/Deashi03/Brottskatalog/commit/6c79fbd2a7cf2447df6023d92e8ae2edad83ad8f) har **145/145 godkända lokala Node-kontroller och grön [Actions 1020](https://github.com/Deashi03/Brottskatalog/actions/runs/39558857264)**, inklusive automatiserad iPhone-regression. Alla 33 nya egna paragrafer matchar även en nyhämtad officiell fulltext; endast HTML-mellanrum före skiljetecken normaliserades i jämförelsen.

Senare parallella ändringar, inklusive sex HD-exempel och separat registerpinne, har bevarats till `7c80def`. Deras [Actions 1022](https://github.com/Deashi03/Brottskatalog/actions/runs/39559455472) pågår vid denna notering. Den gröna körningen på 6c79fbd ska inte redovisas som slutverifiering av det senare appträdet. Arbetsräkningen är fortsatt 96,6 %; 98,5 % är inte uppnått. Ingen merge, tagg, deploy eller publicering har genomförts.
