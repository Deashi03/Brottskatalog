# Brottskatalog 1.5 jämfört med publicerad 1.4

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

## Senaste tillägget: tolv förstadiekort med 44 separata straffskalealternativ

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

Det föregående elva-intervallspaketet finns på e6fc7f8fcce6ee0c6c859c41c61845c50a851421. Actions 1032 är grön; efterföljande fel och rättelser i alternativpaketet redovisas i det senaste testspåret ovan. Äldre gröna körningar används inte som bevis för senare appkod.

## Föregående sakpaket: åtta livstidsrelaterade och tre krigsvillkorade förstadieskalor

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

## Föregående paket: 13 individuella straffskaleintervall

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

Detta paket är verifierat på 278ccfb316e08c499924f76027d92acd97f51661 med 145/145 lokala Node-kommandon och grön avslutad Actions 1031 inklusive iPhone-regression. Det föregående 17-intervallspaketet har **145/145 godkända lokala Node-kommandon och grön avslutad Actions 1029 inklusive iPhone-regression** på ce06764885938290684fd394b802f9443054baaa.

Avstämning den 21 oktober 2026. **1.5 är sparad som utkast och är inte publicerad eller fullständigt juridiskt slutgodkänd.** Rapporten beskriver genomförda ändringar; kvarstående arbete redovisas separat.

## Tidigare paket: 17 förstadieintervall

Fem ytterligare försök har fått individuell källkontroll: grov signaturförfalskning, grov märkesförfalskning, grov olovlig befattning med falska pengar samt grov olovlig underrättelseverksamhet mot främmande makt respektive mot person. Den ordinära skalan är böter–fängelse högst fyra år, utom befattningen med falska pengar som har högst sex år. Den sistnämnda försöksformen är fortfarande begränsad till anskaffande eller mottagande enligt 14:13.

Tolv förberedelse-/stämplingskort har därutöver fått separat prövade intervall:

| Kort | Övre gräns | Ingår gränsen? |
|---|---|---|
| Förberedelse till grov förgöring | 6 år | Nej |
| Stämpling till grov förgöring | 6 år | Nej |
| Förberedelse till grovt hindrande av urkunds bevisfunktion | 2 år | Ja |
| Förberedelse till grov penningförfalskning | 8 år | Nej |
| Förberedelse till grov olovlig underrättelseverksamhet mot främmande makt | 2 år | Ja |
| Stämpling till grov olovlig underrättelseverksamhet mot främmande makt | 2 år | Ja |
| Förberedelse till grov olovlig underrättelseverksamhet mot person | 2 år | Ja |
| Stämpling till grov olovlig underrättelseverksamhet mot person | 2 år | Ja |
| Förberedelse till grov signaturförfalskning | 2 år | Ja |
| Förberedelse till grov märkesförfalskning | 2 år | Ja |
| Förberedelse till olaga frihetsberövande (mindre grovt fall) | 2 år | Nej |
| Stämpling till olaga frihetsberövande (mindre grovt fall) | 2 år | Nej |

Alla dessa tolv skalor kan omfatta böter. Fem har öppen övre gräns, uttryckt med `maxExclusive: true` i data och **Under** i visningen. En gräns under två år får därmed inte förväxlas med högst två år. Samtliga egna paragrafer, särskilda förstadieparagrafer och 23:2 har individuella textpinnar. Aktuell lagtext jämförs med förarbetsbeskrivningen i SOU 2024:55 och prop. 2025/26:218 avsnittet om oförändrade förstadiestraffskalor. Utredningens föreslagna sänkning av sexårsgränsen behandlas inte som gällande rätt.

Hittills har alltså **20** av de ursprungliga 56 intervalluckorna lösts (tre i föregående pass och 17 i detta). **Då återstod 36.** Befintliga åtalsklassificeringar och rättsliga revisionsakter bevaras. Även efter en separat skalegranskning visar tvångsmedelsmenyn fortsatt att en självständig befogenhetsprövning behövs. Inga juridiska slutgodkännanden eller extra progresspoäng har tilldelats.

Paketet med 17 intervall är verifierat på appcommit **ce06764885938290684fd394b802f9443054baaa**, träd **de9d035ff69b65cb27ed84a7119ec2d093ef5172**: [GitHub Actions 1029](https://github.com/Deashi03/Brottskatalog/actions/runs/39608510636) är avslutad och grön, inklusive samtliga Node-kontroller och iPhone-regressionen. Äldre testuppgifter nedan gäller sina uttryckligen angivna tidigare versioner.

## Tidigare avstämning före de följande intervalltilläggen

**Tidigare verifierad appversion:** `4e8f572accf6db3dbb5b45fd5b0b033a9a4f9734` (träd `1729fe4a41a855a9f04fe7a6781175610e7e0200`). Alla **145/145 lokala Node-kommandon** passerade. [GitHub Actions 1027](https://github.com/Deashi03/Brottskatalog/actions/runs/39603170302) är avslutad och grön, inklusive iPhone-regressionen. Det gäller både Klimatblockaden och de tre nya försöksintervallen. Senare rapport-/överlämningsändringar ändrar inte appträdet. **Ingen publicering har genomförts.**

Den senaste direkta körningen av båda versionernas egna inläsningskedjor bekräftar **299 → 390 grundkort**, **858 → 1 167 förstadiekort** och **1 157 → 1 545 synliga poster**. Det är 91 nya grundkort och 309 nya förstadiekort; tolv revisionsposter hålls utanför visningsurvalet. Inga tidigare post-ID:n har tagits bort. Inga befintliga grundkorts numeriska `penaltyRange` eller huvudvärde `custody` har ändrats. Detta är en jämförelse av datafält, inte ett intyg om deras fullständiga juridiska korrekthet.

Dagens aktualiserade inventering finns i `data/v15-v14-current-snapshot.json`. Den verifierar att den äldre fullständiga bilagans listor över samtliga 400 tillägg och samtliga 1 157 ändrade tidigare post-ID:n fortfarande gäller. Aktuella fullständiga fältskillnader finns i GitHub-jämförelsen. Den anger också SHA-256 över hela den inlästa appkoden och behåller tidigare ögonblicksbilder med deras egna jämförelsedatum. Baslinjen `0bbbe45` är på nytt hämtad från GitHub och dess README identifierar den som publicerad 1.4. Tekniska verifieringsflaggor beskrivs som flaggor, aldrig som juridiska slutgodkännanden.

Aktuellt innehåll: 390 strukturerade rekvisitkort, 390 fulltextkontroller, 390 tidsanteckningar, 390 anteckningar om lagtextens begränsningar, 390 tvångsmedelströskelgenomgångar och **32 grundkort med det nya typexempelfältet**. 452 förstadier är markerade som särskilt kriminaliserade och 715 som utan särskilt kriminaliseringsstöd för just den rubriceringen. Negativa markeringar utesluter inte att en annan rubricering kan vara aktuell.

### Nytillagt i detta arbetspass

Sabotagekortet har fått ett sjunde avgränsat rättsfallsbaserat exempel i den nya gränsdragningsmodulen: **Klimatblockaden, NJA 2025 s. 761, B 3626-24, den 9 juli 2025**. Underlaget är [HD:s officiella engelska domsöversättning, s. 6–12](https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/engelska-oversattningar/b-3626-24-eng.pdf), vars nedladdade fil har fingeravtryck i manifestet. Den svenska originallydelsen av 13 kap. 4 § har samtidigt jämförts mot aktuell officiell konsolidering.

Exemplet visar att trafikstörning inte automatiskt innebär sabotage och avgränsar HD:s prövning från ohörsamhet mot ordningsmakten. Det ger ingen generell minutgräns, ingen allmän straffrihet för blockader och inga nya juridiska godkännanden. Straffskalor och förstadieklassificeringar är oförändrade. Regressionen omfattar förändrad lagtext, saknad fulltextverifiering, upprepad inläsning och bevarande av alla andra kortfält. Mobiltestet öppnar även det nya sabotageexemplet. Offlinecachens versionsnamn har uppdaterats.

### Tre tidigare öppna försöksintervall har fått separat källkontroll

| Försökskort | Tidigare visning | Nuvarande ordinarie skala | Individuellt kontrollerade paragrafer |
|---|---|---|---|
| Försök till grov förgöring | Individuell straffskaleprövning | Böter–fängelse högst 6 år | BrB 13:8, 13:12 och 23:1 |
| Försök till grovt hindrande av urkunds bevisfunktion | Individuell straffskaleprövning | Böter–fängelse högst 4 år | BrB 14:4, 14:13 och 23:1 |
| Försök till grov bevisförvanskning | Individuell straffskaleprövning | Böter–fängelse högst 4 år | BrB 15:8, 15:15 och 23:1 |

Detta gäller den ordinära straffskalan för det aktuella försöksbrottet. Grundbrottens minimistraff är sex månader. BrB 23:1 sätter taket vid fullbordansbrottets straff och utesluter inte böter för dessa tre brott. Kontrollerna väljer ingen lagversion för en historisk gärning och avgör inte ansvar eller konkret påföljd. Allmänna straffskalemodifieringar kräver separat prövning.

De tidigare kontrollerna av själva förstadieuppräkningen bevaras. En separat, källbunden straffskalegranskning tillkommer. Alla andra fält, inklusive befintliga åtalsklassificeringar, är oförändrade. Tvångsmedelskontrollen ger fortfarande inget positivt besked för dessa kort. Tester stoppar intervallen vid ändrad grundskala, ändrad eller ofullständig primärkälla och ändrad brottstext.

Antalet positiva förstadiekort utan ett numeriskt intervall minskar **56 → 53**. Arbetsinventeringens nämnare och poäng är oförändrade; detta konkreta borttagande av en releasebegränsning räknas inte som nya poäng i den redan låsta räkningen.

### Nattens upplägg och faktisk begränsning

16 fortsättningskörningar med en timmes mellanrum har bekräftats av schemaläggningstjänsten. Uppgiften börjar den 21 oktober kl. 15.34 svensk tid och omfattar natten till den 22 oktober. Skapad schemaläggning är inte bevis för att en framtida körning lyckas; utfallet ska kontrolleras separat. Varje körning ska hämta aktuellt GitHub-huvud, genomföra och testa verkliga ändringar, bevara parallellt arbete och uppdatera överlämningen. Ingen merge, tagg, release eller publicering är auktoriserad.

Räkningen är fortsatt **11 548/11 957 = 96,6 %**, med 409 moment öppna. Det nya exemplet och rapportarbetet ger inga progresspoäng. Det återstår 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 release-/publiceringsmoment. Dessutom kvarstår 36 olösta individuella förstadieintervall, 14 villkorade grundskalor och oberoende juridisk slutgranskning. Detta pass har **inte** uppnått 100 %.

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

32 grundkort har nu material i det nya `typexempel15`-fältet. Detta är inte jämförbart rakt av med 1.4:s äldre faktarutor. Svåra typfall har inte fyllts på enbart för att öka täckningssiffror. Källbundna anteckningar behandlar bland annat HD-avgörandena Vapenbilden, Freja, Alibit, Vinkelslipen, Demonstranten som stannade kvar och Påskupploppet i Örebro samt skillnaden mellan förfalskad urkund, osant innehåll, brukande och falska polisuppgifter. Avgränsade prejudikatanteckningar är inte fullständig praxisgranskning av ett brottskort.

Fyra lämnade kursunderlag är dokumenterade i `data/course-source-manifest-15.json`: Straffrätt Lund 2.docx, Brottsutredning(2).docx, Juridikens grunder(1).pdf och Straffprocessrätt 2.docx. Filfingeravtryck och hänvisningssystem har sparats. Originaldokumenten har inte lagts in i det publika repositoryt. Lagtext och rättsliga slutsatser ska kontrolleras mot officiella primärkällor.

En befintlig rubrik har ändrats: **Brukande av falsk urkund → Brukande av det förfalskade**, med oförändrat post-ID. Benämningen och kopplingen till det förfalskade föremålet förtydligas.

## Teknik, mobilvy och testning

Det jämförda programträdet berör **306 filer**  med 100 628 tillagda och 45 borttagna rader. Många tillägg är datamanifest och tester; radantalet är inte ett kvalitetsmått eller antal juridiska bedömningar.

CI har utökats från 10 till 146 Node-kommandon, där mobilkommandot ingår. Den äldre jämförelseversionen har **145 godkända lokala kontroller samt godkänd GitHub Actions-körning 1016**, inklusive det automatiserade mobiltestet. Körning 1015 verifierade föregående paket med de 130 sista lagtextavgränsningarna.

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

Därutöver ska de 36 olösta individuella förstadiestraffskalorna och de 14 villkorade grundskalorna fortsatt behandlas som verkliga begränsningar. De får inte döljas bakom att andra avgränsade förstadie- eller gradkontroller är räknemässigt klara.

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

## Slutverifiering av sammanförd version

Datum: 21 oktober 2026. Appcommit `07683f8126a034e2651e0946df60d1356edd91f8` har **grön och avslutad GitHub Actions 1024**, inklusive hela Node-sviten och iPhone-regressionen: https://github.com/Deashi03/Brottskatalog/actions/runs/39596389485 . Körning 1022 hade ett testfel efter sammanfogningen: den sökte ISO-datum i svensk utskriven datumtext. Mobiltestet kontrollerar nu både den faktiska svenska texten och det exakta strukturerade ISO-datumet för de fem nya fallen. Databasens datum har inte ändrats av rättningen. De sex HD-exemplen, den separata registerpinnen och övriga parallella ändringar bevaras.

Detta ersätter tidigare noteringar om att 1022 pågår. Aktuellt avgränsat arbetsläge är fortsatt **11 548/11 957 = 96,6 %**, 390 tidskontroller och 95 tidskällposter. **409 räknade moment kvar:** 390 förarbets-/praxisfrågor, ett åtalsfilter och 18 publiceringsmoment. 56 förstadieintervall, 14 villkorade grundskalor och oberoende juridisk slutgranskning kvarstår. Noll fullständiga juridiska slutgodkännanden. PR #2 förblir draft; ingen merge, tagg, deploy eller publicering har genomförts.
