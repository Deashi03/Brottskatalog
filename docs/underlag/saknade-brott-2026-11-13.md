# Underlag: straffbestämmelser i SFS som saknas i Brottskatalog

Framtaget 2026-11-13 för planen i `docs/PLAN-NASTA-UPPDATERING.md`.

## Så togs listan fram

- Riksdagens öppna data (data.riksdagen.se) söktes på orden fängelse, böter, dagsböter, döms, dömes, dömas, straff och ansvar bland alla SFS-dokument. Det gav 2 589 författningar.
- Alla texter laddades ner. Upphävda författningar och upphävda paragrafer sorterades bort.
- Varje paragraf som dömer ut fängelse eller böter togs med. Paragrafer med enbart penningböter togs inte med.
- Skriptet finns i `scripts/sfs_straffinventering.py`.

## Begränsningar

- Listan är maskinellt framtagen. Högsta straff och antal paragrafer är tolkade ur texten och ska kontrolleras mot lagtexten när korten skrivs.
- "Böter" utan närmare angivelse räknas som dagsböter (BrB 25:1) och är därför med. Några äldre författningar kan i praktiken avse penningböter.
- Kolumnen Straffparagrafer anger antal paragrafer, inte antal brottskort. En paragraf ger ofta flera kort (normalgrad, grovt och ringa).
- Lagar som redan finns i katalogen redovisas inte här. Luckorna i dem står i planen.

## Sammanfattning

| Grupp | Författningar | Straffparagrafer |
|---|---|---|
| Lagar med fängelse i två år eller mer | 66 | 186 |
| Lagar med fängelse i högst ett år | 56 | 100 |
| Lagar med fängelse i högst sex månader | 45 | 57 |
| Lagar med enbart böter | 80 | 91 |
| Förordningar (böter) | 46 | 54 |
| **Summa** | **293** | **488** |

## Lagar med fängelse i två år eller mer

| Författning | Högsta straff | Straffparagrafer | Brott eller första straffbestämmelse |
|---|---|---|---|
| Lag (2012:179) om straff för olovlig befattning med klusterammunition | 18 år eller livstid | 1 | olovlig befattning med klusterammunition |
| Mönsterskyddslag (1970:485) | 6 år | 2 | grovt mönsterskyddsbrott |
| Sjömanslag (1973:282) | 6 år | 8 | Gör sjöman myteri genom att visa uppsåt att med förenat våld sätta sig upp mot befälhavaren, dömes anstiftare och … |
| Lag (1992:1300) om krigsmateriel | 6 år | 4 | Om brott enligt 25 § har begåtts uppsåtligen och är grovt döms till fängelse i lägst sex månader och högst sex år. Vid … |
| Lag (1992:1685) om skydd för kretsmönster för halvledarprodukter | 6 år | 1 | kretsmönsterbrott, grovt kretsmönsterbrott |
| Växtförädlarrättslag (1997:306) | 6 år | 2 | växtförädlarrättsbrott, grovt växtförädlarrättsbrott |
| Lag (2000:1064) om kontroll av produkter med dubbla användningsområden och av tekniskt bistånd | 6 år | 5 | Till böter eller fängelse i högst två år döms den som uppsåtligen utan tillstånd 1. exporterar produkter med dubbla … |
| Lag (2006:1329) om handel med vissa varor som kan användas till dödsstraff eller tortyr, m.m. | 6 år | 2 | Den som utan nödvändigt tillstånd tillhandahåller eller tar emot tekniskt bistånd i strid med artiklarna 3 och 4 i … |
| Lag (2006:924) om Antarktis | 6 år | 2 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av oaktsamhet 1. bryter mot ett förbud i 3, 5, … |
| Lag (2013:385) om ingripande mot marknadsmissbruk vid handel med grossistenergiprodukter | 6 år | 6 | Den som bryter mot något av förbuden mot insiderhandel i artikel 3.1 a och c i förordning (EU) nr 1227/2011 döms till … |
| Lag (2016:1307) om straff för marknadsmissbruk på värdepappersmarknaden | 6 år | 3 | grovt insiderbrott, insiderbrott, grov marknadsmanipulation, marknadsmanipulation |
| Lag (2018:1653) om företagsnamn | 6 år | 1 | grovt företagsnamnsbrott |
| Lag (2023:677) om frysning av tillgångar | 6 år | 1 | Den som uppsåtligen eller av grov oaktsamhet bryter mot ett beslut om frysning enligt 4 § döms till fängelse i högst … |
| Patentlag (2024:945) | 6 år | 1 | grovt patentbrott |
| Subventionsbrottslag (2025:1267) | 6 år | 5 | ringa subventionsbrott, grovt subventionsbrott, vårdslöst subventionsbrott, subventionsmissbruk, grovt subventionsmissbruk |
| Lag (2025:327) om internationella sanktioner | 6 år | 4 | sanktionsbrott, sanktionsförseelse, grovt sanktionsbrott, upprepat sanktionsbrott |
| Lag (2026:56) om straff för olovlig finansiell verksamhet | 6 år | 2 | olovlig finansiell verksamhet, grov olovlig finansiell verksamhet |
| Jordabalk (1970:994) | 4 år | 4 | Den som begär, träffar avtal om eller tar emot en särskild ersättning för att upplåta en bostadslägenhet eller för att … |
| Abortlag (1974:595) | 4 år | 2 | illegal abort |
| Lag (1984:3) om kärnteknisk verksamhet | 4 år | 4 | Har någon med uppsåt begått brott enligt 25 § och är brottet att anse som grovt skall han dömas till fängelse i lägst … |
| Kulturmiljölag (1988:950) | 4 år | 4 | grovt fornminnesbrott |
| Lag (1992:1402) om undanförsel och förstöring | 4 år | 2 | Den som uppsåtligen underlåter att fullgöra sina skyldigheter enligt 8 § eller bryter mot föreskrifter eller beslut som … |
| Lag (1998:506) om flyttning och kontroll av vissa punktskattepliktiga | 4 år | 3 | grov olovlig befattning med punktskattepliktiga varor |
| Lag (2006:546) om utrymning och inkvartering m.m. under höjd beredskap | 4 år | 1 | Den som uppsåtligen eller av oaktsamhet som inte är ringa underlåter att fullgöra sina skyldigheter enligt 4 kap. 1 och … |
| Lag (2013:283) om bevakning ombord på svenskt fartyg | 4 år | 4 | Till fängelse i högst ett år döms den i säkerhetspersonalen som i samband med bevakning som omfattas av denna lag … |
| Lag (2014:799) om sprängämnesprekursorer | 4 år | 2 | Den som uppsåtligen eller av oaktsamhet bryter mot förbudet i artikel 5.1 i EU:s förordning om sprängämnesprekursorer … |
| Lag (2026:440) om skyddsrum och skyddade utrymmen | 4 år | 2 | Den som uppsåtligen eller av oaktsamhet inte fullgör sin skyldighet enligt 4 kap. 5 § första stycket döms till böter … |
| Lag (1962:120) om straff i vissa fall för oriktigt ursprungsintyg m.m. | 2 år | 1 | Den som i ursprungsintyg eller annan handling, som åberopas till bevis för vinnande av förmånsbehandling enligt … |
| Krigshandelslag (1964:19) | 2 år | 3 | Har någon dömts till påföljd för brott som avses i denna lag och begår han, sedan domen vunnit laga kraft, ånyo sådant … |
| Förfogandelag (1978:262) | 2 år | 1 | Till böter eller fängelse i högst sex månader dömes, om ej gärningen är belagd med straff i brottsbalken, den som … |
| Ransoneringslag (1978:268) | 2 år | 2 | Till böter eller fängelse i högst sex månader dömes, om ej gärningen är belagd med straff i brottsbalken, den som … |
| Lag (1980:424) om åtgärder mot förorening från fartyg | 2 år | 6 | Till böter eller fängelse i högst två år döms den som uppsåtligen eller av oaktsamhet bryter mot förbud som gäller … |
| Lag (1985:354) om förbud mot juridiskt eller ekonomiskt biträde i vissa fall | 2 år | 3 | vårdslöst biträde |
| Prisregleringslag (1989:978) | 2 år | 6 | Om ett brott som avses i 39 eller 40 § är att anse som grovt, skall dömas till fängelse i högst två år, om gärningen … |
| Lag (1990:52) med särskilda bestämmelser om vård av unga | 2 år | 2 | Den som för ut ett barn ur Sverige i strid med ett utreseförbud eller ett tillfälligt utreseförbud döms till fängelse i … |
| Lag (1992:1602) om valuta- och kreditreglering | 2 år | 4 | Om ett brott som avses i 8 § första stycket är att anse som grovt, döms till fängelse i högst två år. Vid bedömningen … |
| Fiskelag (1993:787) | 2 år | 10 | Om ett brott enligt 37 eller 40 § är att anse som grovt döms till fängelse i högst två år i andra fall än som avses i … |
| Stiftelselag (1994:1220) | 2 år | 1 | Till böter eller fängelse i högst två år döms den som medverkar till ett beslut att utse en styrelseledamot eller … |
| Lag (1994:1776) om skatt på energi | 2 år | 1 | Den som från oljeprodukter avlägsnar märkämne som avses i 2 kap. 9 a § eller på annat sätt tar befattning med … |
| Lag (1995:732) om skydd för gravfriden vid vraket efter passagerarfartyget Estonia | 2 år | 1 | Den som uppsåtligen bryter mot 2 § döms till böter eller fängelse i högst två år. För försök döms till ansvar enligt 23 … |
| Lag (1998:112) om ansvar för elektroniska anslagstavlor | 2 år | 2 | Den som uppsåtligen eller av grov oaktsamhet bryter mot 5 § första stycket döms till böter eller fängelse i högst sex … |
| Körkortslag (1998:488) | 2 år | 1 | Den som utan tillstånd bedriver utbildning som avses i 4 kap. 9 § döms till fängelse i högst två år. Om brottet är … |
| Lag (1998:493) om trafikskolor | 2 år | 1 | Den som driver trafikskola utan tillstånd döms till fängelse i högst två år. Om brottet är ringa döms till böter eller … |
| Lag (1998:811) om införande av miljöbalken | 2 år | 2 | Tillstånd, godkännanden, lagligförklaringar, undantag, dispenser, beslut om överlåtelse av tillsynsansvar, medgivanden, … |
| Lag (1999:988) om förhör m.m. hos kommissionen för granskning av de svenska säkerhetstjänsternas författningsskyddande verksamhet | 2 år | 1 | Den som hörs vid ett förhör inför kommissionen och som därvid lämnar en osann uppgift eller förtiger sanningen döms … |
| Lag (2000:171) om förbud beträffande viss avkodningsutrustning | 2 år | 1 | Den som på annat sätt än genom import bryter mot 5 § första stycket ska dömas till böter eller fängelse i högst två år. … |
| Lag (2003:460) om etikprövning av forskning som avser människor | 2 år | 2 | Den som med uppsåt bryter mot 6 § första stycket eller mot ett villkor som har meddelats med stöd av 6 § första stycket … |
| Aktiebolagslag (2005:551) | 2 år | 2 | Till böter eller fängelse i högst ett år döms den som 1. uppsåtligen bryter mot 1 kap. 7 eller 8 §, 2. uppsåtligen … |
| Lag (2006:351) om genetisk integritet m.m. | 2 år | 5 | Den som i vinstsyfte tar, överlämnar, tar emot eller förmedlar biologiskt material från en levande eller avliden … |
| Livsmedelslag (2006:804) | 2 år | 2 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av oaktsamhet 1. producerar, bearbetar, … |
| Lag (2006:805) om foder och animaliska biprodukter | 2 år | 2 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av oaktsamhet 1. producerar, bearbetar, … |
| Lag (2007:1157) om yrkesförarkompetens | 2 år | 2 | Den som utan tillstånd bedriver tillståndspliktig utbildning som avses i denna lag döms till fängelse i högst två år. … |
| Barlastvattenlag (2009:1165) | 2 år | 5 | Till böter eller fängelse i högst två år döms den som uppsåtligen eller av oaktsamhet släpper ut barlastvatten som inte … |
| Lag (2009:121) om utbildning till förare av mopeder, snöskotrar och terränghjulingar | 2 år | 1 | Den som utan tillstånd bedriver utbildning som avses i denna lag döms till fängelse i högst två år. Om brottet är ringa … |
| Lag (2009:366) om handel med läkemedel | 2 år | 2 | Den som uppsåtligen eller av oaktsamhet utan tillstånd 1. bedriver sådan detaljhandel med läkemedel som anges i 2 kap. … |
| Lag (2011:1200) om elcertifikat | 2 år | 2 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen 1. bryter mot skyldigheten att göra en anmälan … |
| Drivmedelslag (2011:319) | 2 år | 1 | Den som med uppsåt eller av oaktsamhet bryter mot förbudet i 16 § döms till böter eller fängelse i högst två år. Lag … |
| Strålskyddslag (2018:396) | 2 år | 4 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av grov oaktsamhet bryter mot 3 kap. 13 §, 14 § … |
| Lag (2018:672) om ekonomiska föreningar | 2 år | 1 | Till böter eller fängelse i högst ett år döms den som 1. uppsåtligen eller av oaktsamhet inte för en medlemsförteckning … |
| Lag (2020:1173) om vissa utsläpp av växthusgaser | 2 år | 5 | otillåtet utsläpp av växthusgaser, försvårande av tillståndsprövning, försvårande av kontroll av växthusgasutsläpp, brott mot anmälningsskyldighet, försvårande av utsläppsrättstilldelning |
| Lag (2021:600) med kompletterande bestämmelser till EU:s förordningar om medicintekniska produkter | 2 år | 2 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av oaktsamhet påbörjar eller genomför en klinisk … |
| Järnvägssäkerhetslag (2022:367) | 2 år | 3 | Om ett brott som avses i 2 § är att anse som grovt, ska föraren dömas till fängelse i högst två år. När det bedöms om … |
| Lag (2022:368) om nationella järnvägssystem | 2 år | 3 | Om ett brott som avses i 2 § är att anse som grovt, ska föraren dömas till fängelse i högst två år. När det bedöms om … |
| Lag (2022:700) om särskild kontroll av vissa utlänningar | 2 år | 6 | Till fängelse i högst två år eller, om brottet är ringa, till böter döms en utlänning som uppehåller sig i Sverige … |
| Växtskyddslag (2022:725) | 2 år | 7 | Till böter eller fängelse i högst två år döms den som med uppsåt eller av grov oaktsamhet utan tillstånd, eller i strid … |
| Lag (2026:1600) om omhändertagande för vård av barn och unga | 2 år | 2 | Den som för ut ett barn ur Sverige i strid med ett utreseförbud eller ett tillfälligt utreseförbud döms till fängelse i … |

## Lagar med fängelse i högst ett år

| Författning | Högsta straff | Straffparagrafer | Brott eller första straffbestämmelse |
|---|---|---|---|
| Lag (1939:299) om förbud i vissa fall mot överlåtelse eller upplåtelse av fartyg m.m. | 1 år | 2 | Den som uppsåtligen eller av oaktsamhet överlåter eller upplåter egendom i strid med bestämmelserna i 2 § 1 mom. döms … |
| Lag (1940:176) med vissa bestämmelser om fraktfart med svenska fartyg | 1 år | 1 | En befälhavare som uppsåtligen eller av oaktsamhet utan tillstånd företar en resa med ett fartyg trots att tillstånd … |
| Tryckfrihetsförordning (1949:105) | 1 år | 6 | Till böter eller fängelse i högst ett år döms den som 1. uppsåtligen eller av oaktsamhet bryter mot sin tystnadsplikt … |
| Lag (1971:1078) om försvarsuppfinningar | 1 år | 1 | Den som bryter mot 10 § ska, om gärningen inte är belagd med straff enligt brottsbalken, dömas till böter eller … |
| Kreditupplysningslag (1973:1173) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet 1. bedriver … |
| Lag (1974:1080) om avveckling av hyresregleringen | 1 år | 1 | Den som bryter mot vad som sägs i 3 § första stycket dömes till böter eller fängelse i högst ett år. Gärningen får icke … |
| Lag (1974:13) om vissa anställningsfrämjande åtgärder | 1 år | 2 | Den som i varsel enligt denna lag eller i underrättelse eller i uppgift som avses i 6 och 7 §§ uppsåtligen eller av … |
| Inkassolag (1974:182) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet 1. utan föreskrivet tillstånd … |
| Arbetsmiljölag (1977:1160) | 1 år | 2 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet bryter mot ett föreläggande eller … |
| Containerlag (1980:152) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen bryter mot förbud som har meddelats med stöd av 9 … |
| Lag (1982:1004) om skyldighet för näringsidkare, arbetsmarknadsorganisationer m.fl. att delta i totalförsvarsplaneringen | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av grov oaktsamhet har lämnat oriktiga … |
| Arbetstidslag (1982:673) | 1 år | 2 | Till böter eller fängelse i högst ett år döms en arbetsgivare som uppsåtligen eller av oaktsamhet bryter mot ett … |
| Lag (1982:963) om rymdverksamhet | 1 år | 1 | Den som uppsåtligen eller av oaktsamhet bedriver rymdverksamhet utan att ha erforderligt tillstånd döms till böter … |
| Lag (1983:293) om inrättande, utvidgning och avlysning av allmän farled och allmän hamn | 1 år | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot en föreskrift som har meddelats med stöd av 3 § döms till böter … |
| Lag (1983:294) om inrättande, utvidgning och avlysning av allmän | 1 år | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot en föreskrift som har meddelats med stöd av 3 § döms till böter … |
| Lag (1985:277) om vissa bulvanförhållanden | 1 år | 1 | Kringgår en huvudman eller bulvan uppsåtligen ett sådant hinder som avses i 1 § första stycket, skall han dömas till … |
| Konkurslag (1987:672) | 1 år | 2 | En borgenär som för sin röst vid ett sammanträde i samband med ackord i konkurs har betingat sig någon särskild förmån … |
| Lag (1989:532) om tillstånd för anställning på fartyg | 1 år | 1 | Den som har en utlänning i sin tjänst trots att utlänningen inte har föreskrivet anställningstillstånd döms till böter … |
| Yttrandefrihetsgrundlag (1991:1469) | 1 år | 5 | Till böter eller fängelse i högst ett år döms den som 1. uppsåtligen eller av oaktsamhet bryter mot sin tystnadsplikt … |
| Lag (1991:1559) med föreskrifter på tryckfrihetsförordningens och yttrandefrihetsgrundlagens områden | 1 år | 3 | Den som uppsåtligen eller av oaktsamhet lämnar oriktig uppgift i en ansökan om utgivningsbevis för en databas ska dömas … |
| Lag (1992:1512) om elektromagnetisk kompatibilitet | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet bryter mot en föreskrift som … |
| Lag (1992:860) om kontroll av narkotika | 1 år | 1 | Till böter eller fängelse i högst ett år döms, om gärningen inte är belagd med straff enligt narkotikastrafflagen … |
| Lag (1994:1709) om EU:s förordningar om den gemensamma fiskeripolitiken | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av grov oaktsamhet bryter mot EU:s förordningar … |
| Ellag (1997:857) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 2 kap. 1 eller 3 §, … |
| Lag (1998:293) om utländska försäkringsgivares och tjänstepensionsinstituts verksamhet i Sverige | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet till Finansinspektionen meddelar … |
| Lag (1998:492) om biluthyrning | 1 år | 2 | Den som uppsåtligen driver uthyrningsrörelse enligt denna lag utan tillstånd döms till böter eller fängelse i högst ett … |
| Epizootilag (1999:657) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som med uppsåt eller av oaktsamhet 1. underlåter att göra anmälan … |
| Zoonoslag (1999:658) | 1 år | 2 | Till böter eller fängelse i högst ett år döms den som med uppsåt eller av oaktsamhet 1. bryter mot en föreskrift som … |
| Lag (1999:678) om utstationering av arbetstagare | 1 år | 1 | Om ett transportföretag som är etablerat i ett annat land än Sverige utför en transport med en utstationerad förare … |
| Lag (2001:99) om den officiella statistiken | 1 år | 1 | olovlig identifiering |
| Fartygssäkerhetslag (2003:364) | 1 år | 3 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet bryter mot 1. ett förbud enligt 6 … |
| Lag (2003:367) om lastning och lossning av bulkfartyg | 1 år | 2 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet bryter mot ett förbud som har … |
| Lag (2004:487) om sjöfartsskydd | 1 år | 3 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet bryter mot ett förbud eller … |
| Lag (2005:395) om arbetstid vid visst vägtransportarbete | 1 år | 3 | Till böter eller fängelse i högst ett år döms den arbetsgivare eller den egenföretagare som uppsåtligen eller av … |
| Naturgaslag (2005:403) | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 2 kap. 1, 2 eller 3 … |
| Lag (2005:426) om arbetstid m.m. för flygpersonal inom civilflyget | 1 år | 1 | Till böter eller fängelse i högst ett år döms den arbetsgivare som uppsåtligen eller av oaktsamhet bryter mot ett … |
| Lag (2006:496) om blodsäkerhet | 1 år | 1 | Den som uppsåtligen bedriver blodverksamhet utan tillstånd enligt 6 § döms till böter eller fängelse i högst ett år. I … |
| Lag (2007:1150) om tillsyn över hundar och katter | 1 år | 3 | överträdelse av hundförbud |
| Lag (2008:286) om kvalitets- och säkerhetsnormer vid hantering av mänskliga vävnader och celler | 1 år | 1 | Den som uppsåtligen bedriver en vävnadsinrättning utan tillstånd enligt 9 § döms till böter eller fängelse i högst ett … |
| Lag (2008:475) om kör- och vilotid vid internationell järnvägstrafik | 1 år | 2 | Till böter eller fängelse i högst ett år döms den arbetsgivare som uppsåtligen eller av oaktsamhet bryter mot ett … |
| Lag (2009:302) om verksamhet inom djurens hälso- och sjukvård | 1 år | 4 | obehörig utövning av veterinäryrket |
| Offentlighets- och sekretesslag (2009:400) | 1 år | 1 | Den som uppsåtligen ingriper i strid med 13 kap. 2 § första stycket 2 döms, om åtgärden utgör avskedande, uppsägning, … |
| Försäkringsrörelselag (2010:2043) | 1 år | 3 | Den som uppsåtligen eller av oaktsamhet bryter mot 14 § döms till böter eller fängelse i högst ett … |
| Fängelselag (2010:610) | 1 år | 2 | Den som olovligen överlämnar eller försöker överlämna ett vapen eller annat farligt föremål till en intagen döms till … |
| Patientsäkerhetslag (2010:659) | 1 år | 6 | Till böter eller fängelse i högst ett år döms den som 1. bryter mot någon av bestämmelserna i 5 kap. 1 § 1-7, eller 2. … |
| Lag (2011:725) om behörighet för lokförare | 1 år | 1 | Den som uppsåtligen eller av grov oaktsamhet i sin verksamhet anlitar en förare som inte har ett giltigt förarbevis … |
| Läkemedelslag (2015:315) | 1 år | 3 | Till böter eller fängelse i högst ett år döms den som med uppsåt eller av oaktsamhet 1. bryter mot 5 kap. 1 § första … |
| Lag (2015:642) om europeisk skyddsorder | 1 år | 1 | överträdelse av europeisk skyddsorder |
| Lag (2016:319) om skydd för geografisk information | 1 år | 1 | Den som uppsåtligen eller av oaktsamhet utför sjömätning i strid med 3 §, utför fotografering eller liknande … |
| Elsäkerhetslag (2016:732) | 1 år | 2 | Till böter eller fängelse i högst ett år döms den som med uppsåt eller av oaktsamhet bryter mot 1. en skyldighet som en … |
| Lag (2017:151) om meddelarskydd i vissa enskilda verksamheter | 1 år | 1 | Den som uppsåtligen ingriper i strid med 4 § första stycket 2 döms, om åtgärden utgör avskedande, uppsägning, … |
| Lag (2019:508) om behandling av personuppgifter i det fördelningsanalytiska statistiksystemet för inkomster och transfereringar | 1 år | 1 | olovlig identifiering |
| Lag (2022:964) om företagsrekonstruktion | 1 år | 1 | En berörd part som för sin röst vid ett plansammanträde enligt 4 kap. har betingat sig någon särskild förmån av … |
| Lag (2024:7) om preventiva vistelseförbud | 1 år | 2 | överträdelse av vistelseförbud, hindrande av elektronisk övervakning av vistelseförbud |
| Lag (2026:1274) om åtgärder mot manipulation och missbruk av färdskrivare | 1 år | 2 | färdskrivarmanipulation |
| Lag (2026:1283) om elektriska ledningar | 1 år | 1 | Till böter eller fängelse i högst ett år döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 2 kap. 1 eller 2 §, … |

## Lagar med fängelse i högst sex månader

| Författning | Högsta straff | Straffparagrafer | Brott eller första straffbestämmelse |
|---|---|---|---|
| Lag (1966:314) om kontinentalsockeln | 6 mån | 1 | Den som utan lov utforskar kontinentalsockeln eller utvinner naturtillgångar från denna eller vidtager åtgärd för sådan … |
| Fastighetsbildningslag (1970:988) | 6 mån | 1 | Den som uppsåtligen överträder förordnande som meddelats med stöd av 21 § dömes till böter eller fängelse i högst sex … |
| Förvaltningsprocesslag (1971:291) | 6 mån | 2 | Den som tar upp eller sprider bild i strid med 16 § jämfört med 5 kap. 9 b § rättegångsbalken döms till böter eller … |
| Väglag (1971:948) | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet bryter mot ett förbud i 39 … |
| Lag (1974:191) om bevakningsföretag | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet bedriver verksamhet som … |
| Oljekrislag (1975:197) | 6 mån | 1 | Till böter eller fängelse i högst sex månader dömes den som uppsåtligen eller av oaktsamhet, som ej är ringa, 1. … |
| Steriliseringslag (1975:580) | 6 mån | 1 | Den som uppsåtligen utför sterilisering i strid med 2, 3, 5 eller 6 § döms till böter eller fängelse i högst sex … |
| Lag (1975:88) med bemyndigande att meddela föreskrifter om trafik, transporter och kommunikationer | 6 mån | 1 | Den som överträder föreskrift, som regeringen har meddelat med stöd av 1 § första stycket 5 eller 6 att gälla då riket … |
| Lag (1976:295) om skyldighet för näringsidkare att medverka vid lagring för försörjningsberedskap | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet, som ej är ringa, underlåter att följa föreskrift som har meddelats enligt … |
| Lag (1978:160) om vissa rörledningar | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet framdrager eller begagnar ledning utan att inneha koncession, där sådan kräves, … |
| Lag (1979:357) om yrkesmässig försäljning av dyrkverktyg | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet 1. bedriver yrkesmässig … |
| Skogsvårdslag (1979:429) | 6 mån | 2 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 6 b § första … |
| Lag (1983:1097) med vissa bestämmelser om larmanläggningar m.m. | 6 mån | 1 | Den som bryter mot 2 § eller mot förbud som avses i 4 § andra meningen döms till böter eller fängelse i högst sex … |
| Lag (1985:126) om åtgärder till skydd för svensk sjöfart | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot en föreskrift som har meddelats med stöd av denna lag döms till … |
| Lag (1988:15) om förbud mot vissa radar- och laserinstrument | 6 mån | 1 | Den som uppsåtligen bryter mot 2 § skall dömas till böter eller fängelse i högst sex månader. Lag … |
| Begravningslag (1990:1144) | 6 mån | 1 | Den som uppsåtligen bryter mot föreskrifterna i 3 kap. 3 § eller 5 kap. 5 § döms till böter eller fängelse i högst sex … |
| Minerallag (1991:45) | 6 mån | 1 | Till böter eller fängelse i högst sex månader ska den dömas som uppsåtligen eller av oaktsamhet 1. bedriver … |
| Lag (1993:440) om privat arbetsförmedling | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 3 eller 6 § döms till böter eller fängelse i högst sex månader. Lag … |
| Lag (1994:1710) om EG:s förordningar om jordbruksprodukter | 6 mån | 2 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av grov oaktsamhet bryter mot 1. … |
| Lag (1994:2077) om arbetsförmedlingstvång | 6 mån | 1 | Den som uppsåtligen bryter mot ett förbud enligt 2 § eller 3 § första stycket första meningen skall dömas till böter … |
| Lag (1997:1137) om vägavgift för vissa tunga fordon | 6 mån | 1 | Ägaren av ett fordon som brukas i strid mot 25 § sedan fordonets registreringsskyltar har tagits om hand enligt 28 § … |
| Lag (1997:239) om arbetslöshetskassor | 6 mån | 1 | Om en förening eller en annan organisation utan att vara registrerad enligt denna lag handhar frågor om … |
| Elberedskapslag (1997:288) | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet inte fullgör anmälnings-skyldighet enligt 6 § döms till böter eller fängelse i … |
| Lag (1997:825) om EG:s förordning om skydd mot | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som 1. med uppsåt eller av grov oaktsamhet underlåter att lämna … |
| Lag (1998:1707) om åtgärder mot buller och avgaser från mobila maskiner | 6 mån | 3 | Till böter eller fängelse i högst sex månader döms den som med uppsåt eller av oaktsamhet yrkesmässigt saluför mobila … |
| Lag (1999:271) om handel med begagnade varor | 6 mån | 2 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet 1. driver sådan yrkesmässig … |
| Lag (2001:499) om omskärelse av pojkar | 6 mån | 1 | Den som utför en omskärelse av en pojke utan att vara legitimerad läkare eller utan att ha särskilt tillstånd döms till … |
| Lag (2006:1006) om tillståndsplikt för vissa kampsportsmatcher | 6 mån | 2 | Den som uppsåtligen eller av oaktsamhet anordnar kampsportsmatch utan tillstånd enligt 1 § eller i strid mot ett … |
| Lag (2006:1209) om hamnskydd | 6 mån | 2 | Till böter eller fängelse i högst sex månader döms hamninnehavare eller hamnskyddsorgan som uppsåtligen utövar … |
| Vägtrafikskattelag (2006:227) | 6 mån | 1 | En fordonsägare som uppsåtligen eller av oaktsamhet använder fordonet eller låter det användas i strid mot 1 § sedan … |
| Lag (2009:730) om handel med vissa receptfria läkemedel | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 9 eller 12 § första stycket döms till böter eller fängelse i högst … |
| Lag (2010:1882) om åldersgränser för film som ska visas offentligt | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som uppsåtligen eller av oaktsamhet 1. vid en allmän sammankomst … |
| Radio- och tv-lag (2010:696) | 6 mån | 2 | Den som uppsåtligen eller av oaktsamhet sänder program utan tillstånd där sådant krävs enligt denna lag döms till böter … |
| Lag (2010:950) om ansvar och ersättning vid radiologiska olyckor | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet åsidosätter sin skyldighet enligt denna lag att ha en ansvarsförsäkring eller … |
| Lag (2014:1009) om handel med timmer och trävaror | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som med uppsåt eller av oaktsamhet bryter mot förbudet i artikel … |
| Lag (2014:812) om skydd för kännetecken i den internationella humanitära rätten | 6 mån | 1 | Den som i strid med denna lag använder ett kännetecken i 2 § för varor, tjänster eller verksamheter eller för … |
| Lag (2021:34) om tillträdesförbud till butiker, badanläggningar | 6 mån | 1 | överträdelse av tillträdesförbud |
| Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar | 6 mån | 1 | Till böter eller fängelse i högst sex månader döms den som med uppsåt eller av oaktsamhet 1. utför ett estetiskt … |
| Fastighetsmäklarlag (2021:516) | 6 mån | 1 | Den som yrkesmässigt förmedlar fastigheter i strid mot det som föreskrivs i 2 kap. om fastighetsmäklares skyldighet att … |
| Lag (2022:1257) om tobaksfria nikotinprodukter | 6 mån | 3 | olovlig hantering av tobaksfria nikotinprodukter, olovlig försäljning av tobaksfria nikotinprodukter |
| Lag (2022:155) om tobaksskatt | 6 mån | 1 | Den som tillhandahåller cigaretter till försäljning på annat sätt än i originalförpackning försedd med särskild … |
| Lag (2022:482) om elektronisk kommunikation | 6 mån | 2 | Till böter eller fängelse i högst sex månader ska den dömas som med uppsåt eller av oaktsamhet 1. använder radiosändare … |
| Lag (2023:421) om ordningsvakter | 6 mån | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot kravet på tillstånd i 3 § eller mot ett villkor som har meddelats … |
| Lag (2025:621) om lustgas | 6 mån | 1 | olovlig hantering av lustgas |
| Lag (2026:786) om nordisk verkställighet i brottmål | fängelse | 1 | Om någon som villkorligt frigetts från ett fängelsestraff i en annan nordisk stat ska dömas för annan brottslighet i … |

## Lagar med enbart böter

| Författning | Högsta straff | Straffparagrafer | Brott eller första straffbestämmelse |
|---|---|---|---|
| Lag (1918:163) med vissa bestämmelser om sjöfynd | böter | 1 | Underlåter bärgare att göra sådan anmälan, som i 1 § sägs, eller underlåter befälhavare eller redare att, på sätt i 2 § … |
| Lag (1918:399) om förbud mot utsläppande av tjur eller hingst å samfälld betesmark | böter | 1 | Den som bryter mot förordnande, som meddelats med stöd av 1 §, dömes till böter, högst femhundra kronor. Lag … |
| Lag (1919:426) om flottning i allmän flottled | böter | 3 | Idkas utan behörigt tillstånd flottning i allmän flottled, innan densamma blivit till allmänt begagnande upplåten, … |
| Lag (1932:242) om skyldighet i vissa fall att tillhandahålla förnödenheter m.m. för ordningsmaktens behov | böter | 1 | Vägrar eller försummar någon att fullgöra anfordran enligt denna lag, äger vederbörande polisbefäl låta uttaga det … |
| Lag (1932:55) om viktmärkning i vissa fall av gods som skall inlastas å fartyg | böter | 1 | viktmärkningen ansvarige |
| Lag (1933:269) om ägofred | böter | 1 | Bryter någon uppsåtligen mot bestämmelsen i 10 § tredje stycket eller mot betesförbud, varom i 11 § förmäles, dömes … |
| Lag (1963:583) om avveckling av fideikommiss | böter | 1 | Den som försummar vad som åligger honom enligt 21 §, döms till böter. Allmänt åtal får väckas endast efter medgivande … |
| Lag (1967:531) om tryggande av pensionsutfästelse m.m. | böter | 1 | Arbetsgivare, som uppsåtligen eller av grov oaktsamhet minskar posten Avsatt till pensioner i strid med 7 §, dömes till … |
| Lag (1970:299) om skydd mot flyghavre | böter | 1 | Till böter dömes den som uppsåtligen eller av oaktsamhet bryter mot 3 eller 5-7 §, 8 § andra stycket eller föreskrift … |
| Lag (1970:498) om skydd för vapen och vissa andra officiella beteckningar | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 1 eller 2 § eller mot ett förbud som gäller på grund av en … |
| Lag (1970:943) om arbetstid m.m. i husligt arbete | böter | 1 | En arbetsgivare som inte rättar sig efter ett föreläggande eller förbud enligt 17 § döms till böter. Detta gäller dock … |
| Rennäringslag (1971:437) | böter | 2 | Till böter döms den som med uppsåt eller av oaktsamhet 1. stänger av fastställd eller annars gällande flyttningsväg för … |
| Handelsregisterlag (1974:157) | böter | 1 | Den som uppsåtligen eller av grov oaktsamhet meddelar oriktig eller vilseledande uppgift i ansökan eller anmälan till … |
| Bisjukdomslag (1974:211) | böter | 1 | Till böter dömes den som uppsåtligen eller av oaktsamhet 1. underlåter att göra anmälan enligt 2 §, 2. underlåter att … |
| Lag (1974:922) om kreditpolitiska medel | böter | 1 | Den som uppsåtligen eller av grov oaktsamhet lämnar oriktig uppgift i samband med fullgörande av skyldighet enligt 28 § … |
| Lag (1975:1083) om uppgiftsskyldighet rörande mottagande av olja | böter | 1 | Den som uppsåtligen eller av oaktsamhet lämnar oriktig uppgift döms till böter, om gärningen inte är belagd med straff … |
| Terrängkörningslag (1975:1313) | böter | 1 | Den som med uppsåt eller av oaktsamhet bryter mot någon av bestämmelserna i 1 § första stycket 1-3 eller mot förbud … |
| Lag (1975:424) om uppgiftsskyldighet vid grundvattentäktsundersökning och brunnsborrning | böter | 1 | Den som uppsåtligen eller av oaktsamhet underlåter att fullgöra uppgiftsskyldighet eller lämnar oriktig uppgift dömes, … |
| Utsädeslag (1976:298) | böter | 2 | Den som till Statens jordbruksverk uppsåtligen eller av grov oaktsamhet lämnar oriktig uppgift om en varas slag eller … |
| Lag (1976:357) om motortävlingsförsäkring | böter | 1 | Den som underlåter att fullgöra sin skyldighet att taga motortävlingsförsäkring dömes till … |
| Lag (1978:800) om namn och bild i reklam | böter | 1 | Den som uppsåtligen eller av grov oaktsamhet bryter mot 1 § skall dömas till böter. I fråga om medverkan till sådan … |
| Utsökningsbalk (1981:774) | böter | 1 | En arbetsgivare som uppsåtligen eller av oaktsamhet underlåter att inom föreskriven tid tillställa … |
| Lag (1983:1046) om skyldighet för vissa bostadsföreningar och bostadsaktiebolag att föra lägenhetsförteckning m.m. | böter | 1 | En styrelseledamot eller likvidator som inte iakttar föreskrifterna i 3 § döms till böter. … |
| Lag (1983:147) om förbud under viss tid mot | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 1 § eller åsidosätter villkor som har meddelats vid medgivande av … |
| Mönstringslag (1983:929) | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot bestämmelserna i 9--14 §§ eller 24 § döms till … |
| Lag (1990:712) om undersökning av olyckor | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 11 eller 12 § döms till böter, om gärningen inte är belagd med … |
| Lag (1990:783) om skydd för beteckningen svenskt arkiv | böter | 1 | Den som märker skrivmateriel eller förvaringsmedel med orden svenskt arkiv antingen ensamma, i sammansättning eller i … |
| Lag (1991:1047) om sjuklön | böter | 1 | En arbetsgivare som inte fullgör sin skyldighet enligt 12 § döms till böter. Om ansvar för den som bryter mot 18 § … |
| Bostadsrättslag (1991:614) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. upplåter andelsrätt i strid med 1 kap. 8 §, 2. upplåter … |
| Lag (1992:1140) om Sveriges ekonomiska zon | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet 1. underlåter att iaktta en föreskrift som har meddelats med … |
| Lag (1992:160) om utländska filialer m.m. | böter | 1 | Till böter döms 1. den som för ett utländskt företags räkning driver eller förestår näringsverksamhet i Sverige utan … |
| Lag (1993:1392) om pliktexemplar av dokument | böter | 1 | Den som underlåter att fullgöra sin skyldighet att föra en förteckning enligt 31 § tredje stycket eller den som … |
| Lag (1993:387) om stöd och service till vissa funktionshindrade | böter | 1 | Till böter döms den som 1. uppsåtligen bryter mot 6 § tredje stycket, 2. uppsåtligen eller av oaktsamhet bryter mot 23 … |
| Lag (1995:831) om transplantation m.m. | böter | 1 | Den som med uppsåt utför ingrepp på eller tar biologiskt material från en levande eller avliden människa eller använder … |
| Lag (1995:832) om obduktion m.m. | böter | 1 | ingrepp på en avliden människa i strid med denna lag |
| Lag (1996:19) om begränsning av rätten att bedriva linjesjöfart på Gotland | böter | 1 | Den som bryter mot föreskrift som har meddelats med stöd av 1 § döms till … |
| Inregränslag (1996:701) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. låter bli att göra en anmälan enligt 3 § när en vara som … |
| Lag (1997:192) om internationell adoptionsförmedling | böter | 1 | Den som förmedlar en internationell adoption i strid med 3 § döms till böter. Detsamma gäller den som i strid med 4 § … |
| Lag (1998:1479) om värdepapperscentraler och kontoföring av finansiella instrument | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 4 §. Lag … |
| Lag (1998:814) med särskilda bestämmelser om gaturenhållning och skyltning | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet 1. inte fullgör sin skyldighet enligt 2 § andra stycket eller 3 … |
| Revisorslag (2001:883) | böter | 1 | att vara auktoriserad eller godkänd revisor |
| Fordonslag (2002:574) | böter | 1 | Den som uppsåtligen hindrar eller försvårar en inspektion eller kontroll enligt 2 kap. 10-14 §§ döms till böter. I … |
| Lag (2003:778) om skydd mot olyckor | böter | 1 | Till böter skall den dömas som 1. uppsåtligen eller av oaktsamhet bryter mot förbud mot eldning utomhus som har … |
| Lag (2004:297) om bank- och finansieringsrörelse | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 12 §. Lag … |
| Lag (2004:46) om värdepappersfonder | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 20 a §. Lag … |
| Lag (2006:1570) om skydd mot internationella hot mot människors hälsa | böter | 1 | Till böter döms den som åsidosätter sin skyldighet att lämna information om hälsotillståndet ombord på fartyg eller … |
| Lag (2006:449) om skydd för störningskänslig forskning | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot förbud enligt 3 § döms till böter. I ringa fall skall inte dömas … |
| Lag (2006:531) om särskild tillsyn över finansiella konglomerat | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 6 kap. 9 §. … |
| Lag (2006:647) om finansiering av kärntekniska restprodukter | böter | 1 | Den som med uppsåt eller av grov oaktsamhet åsidosätter sina skyldigheter enligt 21 § 3 genom att lämna oriktig uppgift … |
| Lag (2006:806) om provtagning på djur, m.m. | böter | 1 | Till böter döms den som med uppsåt eller av grov oaktsamhet 1. bryter mot en föreskrift eller ett beslut som har … |
| Lag (2006:807) om kontroll av husdjur, m.m. | böter | 1 | Till böter döms den som med uppsåt eller av grov oaktsamhet bryter mot en föreskrift som har meddelats med stöd av 3 § … |
| Lag (2007:528) om värdepappersmarknaden | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 13 §. … |
| Lag (2008:1049) om förbud mot utsläppande på marknaden av päls av katt och hund m.m. | böter | 1 | Till böter döms den som med uppsåt bryter mot Europaparlamentets och rådets förordning (EG) nr 1523/2007 genom att på … |
| Lag (2010:1052) om auktorisation av patentombud | böter | 1 | att vara auktoriserat patentombud |
| Socialförsäkringsbalk (2010:110) | böter | 1 | Arbetsgivare eller arbetsföreståndare som underlåter att fullgöra anmälningsskyldighet i fråga om arbetsskada enligt 42 … |
| Konsumentkreditlag (2010:1846) | böter | 1 | Vid kreditköp får kreditgivaren inte ta emot en av köparen ingången växelförbindelse som avser en fordran på grund av … |
| Lag (2010:751) om betaltjänster | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 15 §. … |
| Lag (2011:1070) om handel med sälprodukter | böter | 1 | Till böter döms den som med uppsåt eller av grov oaktsamhet bryter mot Europaparlamentets och rådets förordning (EG) nr … |
| Avgasreningslag (2011:318) | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet 1. i samband med ett typgodkännandeförfarande, ett genomförande … |
| Lag (2011:755) om elektroniska pengar | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 15 §. … |
| Lag (2011:791) om ackreditering och teknisk kontroll | böter | 1 | Den som med uppsåt eller av oaktsamhet bryter mot 15 § döms till böter, om gärningen inte är belagd med straff enligt … |
| Lag (2011:914) om konsumentskydd vid avtal om tidsdelat boende eller långfristig semesterprodukt | böter | 1 | Näringsidkaren får inte kräva att konsumenten lämnar betalning till eller ställer säkerhet hos näringsidkaren eller … |
| Lag (2012:595) om införsel av och handel med sprutor och kanyler | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 3 eller 4 § döms till böter. Den som inte har rättat sig efter ett … |
| Lag (2013:561) om förvaltare av alternativa investeringsfonder | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 26 §. Principer för … |
| Lag (2014:968) om särskild tillsyn över kreditinstitut och värdepappersbolag | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 6 kap. 12 … |
| Tullag (2016:253) | böter | 1 | tullförseelse |
| Lag (2018:1854) om den internationella fonden för farliga och skadliga ämnen | böter | 1 | Den som uppsåtligen eller av oaktsamhet lämnar oriktig uppgift vid fullgörande av skyldighet enligt 7-9 §§ döms till … |
| Lag (2019:742) om tjänstepensionsföretag | böter | 2 | Till böter döms den som uppsåtligen eller av oaktsamhet bryter mot 65 § andra … |
| Lag (2021:626) om förarbevis för vattenskoter | böter | 2 | olovligt förande av vattenskoter |
| Lag (2021:899) med kompletterande bestämmelser till EU:s förordning om gräsrotsfinansiering | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 8 §. … |
| Lag (2022:1746) med kompletterande bestämmelser till EU:s förordning om en paneuropeisk privat pensionsprodukt (PEPP-produkt) | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 7 §. … |
| Lag (2022:900) om registrering av idéburna organisationer | böter | 2 | Till böter döms den som uppsåtligen eller av oaktsamhet gör värdeöverföringar i strid med 8 §. Till ansvar enligt denna … |
| Biobankslag (2023:38) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. använder ett prov i strid med 2 kap. 5 § andra eller tredje … |
| Lag (2024:114) om clearing och avveckling av betalningar | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 5 … |
| Lag (2024:1159) med kompletterande bestämmelser till EU:s förordning om marknader för kryptotillgångar | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 6 … |
| Tullbefogenhetslag (2024:710) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. bryter mot ett förbud enligt 3 kap. 3 eller 4 §, eller 2. … |
| Socialtjänstlag (2025:400) | böter | 5 | Den som överträder ett förbud eller en begränsning av möjligheterna att i hemmet ta emot någon annans barn döms till … |
| Konsumentkreditlag (2026:1011) | böter | 1 | Vid ett kreditköp får kreditgivaren inte ta emot en av konsumenten ingången växelförbindelse som avser en fordran på … |
| Elmarknadslag (2026:1281) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet bryter mot föreskrifter som har meddelats med stöd av 3 kap. 17 … |
| Lag (2026:333) om uppgiftsskyldighet för vissa e-legitimationsföretag | böter | 1 | Till böter döms den som uppsåtligen eller av grov oaktsamhet bryter mot ett meddelandeförbud enligt 5 §. Hur … |

## Förordningar

| Författning | Högsta straff | Straffparagrafer | Brott eller första straffbestämmelse |
|---|---|---|---|
| Kungl. Maj:ts Förordning (1933:78) | böter | 1 | Den som bryter mot vad i 1 § föreskrivits döms till böter. Har någon under tid, då han är ställd under åtal för … |
| Förordning (1956:413) om klassificering av kött | 6 mån | 2 | Den som utlämnar kött utan iakttagande av föreskrifterna i 1 §, eller bryter mot i 4, 6 eller 7 § meddelat förbud, döms … |
| Förordning (1958:272) om tjänstekort | 6 mån | 1 | Den som skaffar sig tjänstekort i någon annans namn eller som lämnar annan oriktig eller vilseledande uppgift för att … |
| Valutaförordning (1959:264) | böter | 1 | Den som åsidosätter föreskrift, som med stöd av denna förordning meddelats av riksbanken, dömes, där ej gärningen är … |
| Kontinentalsockelförordning (1966:315) | böter | 1 | Den som underlåter att göra anmälan enligt 3 § tredje stycket dömes till böter. … |
| Förordning (1970:340) om skolskjutsning | böter | 1 | Om ett fordon används för skolskjutsning uppsåtligen eller av oaktsamhet i strid mot 5 § eller en föreskrift som har … |
| Kungörelse (1970:344) om kompetenskrav för förare av större fritidsbåtar | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 1 § döms till böter. Förordning … |
| Förordning (1974:235) om tillstånd till sjöfart i inrikes trafik med utländskt fartyg m.m. | böter | 1 | Används fartyg uppsåtligen eller av oaktsamhet i strid mot de bestämmelser som anges i 1 § första stycket utan att … |
| Kungörelse (1974:661) om uppgifter för galt- och betäckningsstatistiken | böter | 1 | Den som uppsåtligen eller av grov oaktsamhet lämnat oriktig uppgift dömes till böter, om ej gärningen är belagd med … |
| Förordning (1975:49) om gemensam kontrollstämpel m.m. för arbeten av guld, silver eller platina | böter | 1 | Efter kontrollstämpling får inte tillverkarstämpel eller finhaltsstämpel ändras eller utplånas eller sådan stämpel … |
| Fartygsregisterförordning (1975:927) | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 5 kap. 2 eller 3 § döms till penningböter. Befälhavare och redare … |
| Förordning (1975:929) med vissa bestämmelser om fartygs identifiering | böter | 1 | Den som uppsåtligen eller av oaktsamhet bryter mot 7-10 §§ döms till böter. Förordning (1999:363). … |
| Förordning (1977:945) om trädgårdsväxters sundhet, sortäkthet och kvalitet | böter | 1 | Den som bryter mot 1 eller 2 § dömes till … |
| Förordning (1979:1036) om högsta pris för vissa lastbilstransporter | böter | 1 | Den som bryter mot någon föreskrift som har beslutats med stöd av denna förordning döms till … |
| Förordning (1982:569) om lotsning m.m. | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 2 §, 2. lotsar fartyg eller på annat sätt utför … |
| Förordning (1984:14) om kärnteknisk verksamhet | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet åsidosätter föreskrifter som Strålsäkerhetsmyndigheten har … |
| Förordning (1985:613) om auktorisation av tolkar och översättare | böter | 1 | att vara auktoriserad enligt denna förordning |
| Förordning (1986:172) om luftfartygsregistret m.m. | böter | 1 | Till böter döms den som i fråga om luftfartygsregistret 1. lämnar oriktiga uppgifter i samband med en ansökan eller … |
| Sjötrafikförordning (1986:300) | böter | 1 | Till böter döms 1. den befälhavare som uppsåtligen eller av oaktsamhet a) bryter mot bestämmelse i de internationella … |
| Svävarfartsförordning (1986:305) | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. använder en svävare utan föreskrivet tillstånd eller … |
| Förordning (1988:160) | böter | 1 | Den som lämnar ut en vara i strid mot bestämmelserna i denna förordning skall böta en tiondel av varans värde, dock … |
| Förordning (1989:263) om särskild hastighetsbegränsning | böter | 1 | Den som bryter mot 2 § skall dömas till böter, högst ettusen kronor. Detta gäller dock inte om straff kan ådömas enligt … |
| Förordning (1990:717) om undersökning av olyckor | böter | 1 | Den som på annat sätt än som anges i 20 kap. 10 § första stycket 3 sjölagen (1994:1009) uppsåtligen eller av oaktsamhet … |
| Mineralförordning (1992:285) | böter | 1 | När gruvarbete eller motsvarande arbete påbörjas, nedläggs, avbryts för en längre tid än sex månader eller återupptas, … |
| Förordning (1993:185) om arbetsförhållanden vid vissa internationella vägtransporter | böter | 1 | Till böter döms den som uppsåtligen hindrar eller försvårar en kontroll enligt denna förordning. Förordning … |
| Förordning (1994:1162) om skeppsmätning | böter | 1 | Den som låter bli att göra anmälan enligt 10--12, 23 eller 24 § skall dömas till … |
| Förordning (1994:1830) om införsel av levande djur m.m. | böter | 1 | Bestämmelser om påföljd för olovlig införsel av djur eller produkter av djur och för försök därtill finns i lagen … |
| Förordning (1994:542) om utförsel av levande djur m.m. | böter | 1 | Om påföljd för olovlig utförsel av djur eller produkter av djur och för försök därtill finns bestämmelser i lagen … |
| Förordning (1994:795) om tillstånd för kraftverk avsedda att drivas med oljebränsle | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet påbörjar en åtgärd som anges i 3 § utan att tillstånd meddelats, … |
| Förordning (1995:1256) om mästarbrev för hantverkare | böter | 1 | att ha mästarbrev |
| Förordning (1997:1121) om farledsavgift | böter | 1 | Den som uppsåtligen eller av oaktsamhet låter bli att fullgöra deklarationsskyldighet enligt 6 § eller lämnar oriktig … |
| Trafikförordning (1998:1276) | böter | 1 | Den som uppsåtligen eller av oaktsamhet anordnar tävling på väg utan tillstånd enligt 3 kap. 84 § eller i strid mot ett … |
| Förordning (1998:1355) om trafik med höghastighetsfartyg | böter | 1 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. bryter mot 2 §, 2. bryter mot de särskilda trafikregler som … |
| Förordning (1998:786) om internationella vägtransporter inom Europeiska ekonomiska samarbetsområdet (EES) | böter | 3 | Till böter döms den som uppsåtligen 1. driver trafik utan sådant a) tillstånd som avses i artikel 4 eller 6 i … |
| Förordning (2000:281) om regionalt transportbidrag | böter | 1 | Ansökan om transportbidrag skall göras skriftligen hos Tillväxtverket för varje kalenderhalvår och innehålla de … |
| Fartygssäkerhetsförordning (2003:438) | böter | 1 | Befälhavare eller redare som uppsåtligen eller av oaktsamhet bryter mot bestämmelsen i 36 § första stycket döms till … |
| Förordning (2004:865) om kör- och vilotider samt färdskrivare, m.m. | böter | 2 | Till böter döms den som uppsåtligen hindrar eller försvårar en kontroll enligt denna förordning. Förordning … |
| Bilskrotningsförordning (2007:186) | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet 1. bedriver yrkesmässig bilskrotning utan att vara auktoriserad, … |
| Vägmärkesförordning (2007:90) | böter | 1 | Till penningböter döms den som uppsåtligen eller av oaktsamhet bryter mot 1 kap. 5 §, om det olovligt uppsatta medför … |
| Fordonsförordning (2009:211) | böter | 3 | Till böter döms den som uppsåtligen eller av oaktsamhet lämnar oriktig uppgift 1. i en ansökan om typgodkännande, 2. i … |
| Luftfartsförordning (2010:770) | böter | 2 | Till böter döms den som uppsåtligen eller av oaktsamhet 1. bryter mot Transportstyrelsens föreskrifter eller beslut om … |
| Förordning (2017:309) om försöksverksamhet med automatiserade fordon | böter | 1 | Den som uppsåtligen eller av oaktsamhet bedriver försöksverksamhet med automatiserade fordon utan tillstånd eller i … |
| Förordning (2019:383) om fordons registrering och användning | böter | 2 | En innehavare av en saluvagnslicens som uppsåtligen eller av oaktsamhet låter någon annan obehörigen använda en … |
| Förordning (2022:1276) om producentansvar för elutrustning | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet inte fullgör sina skyldigheter att 1. se till att elutrustningen … |
| Förordning (2023:132) om producentansvar för bilar | böter | 1 | Till böter döms den som med uppsåt eller av oaktsamhet inte fullgör sina skyldigheter att lämna upplysningar 1. enligt … |
| Vapenförordning (2026:409) | böter | 1 | Till böter döms den som bryter mot bestämmelserna om 1. krav för vapentillverkare, vapenhandlare och vapenmäklare … |
