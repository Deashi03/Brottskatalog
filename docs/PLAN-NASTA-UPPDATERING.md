# Plan för nästa uppdatering av Brottskatalog

Framtagen 2026-11-13 mot version 1.9.1. Planen bygger på en genomgång av allt material i katalogen och av alla gällande författningar med straffbestämmelser hos Sveriges riksdag.

## 0. Läget efter version 2.1 (2026-11-14)

Planen är genomförd i två uppdateringar, 2.0 och 2.1.

**Gjort i 2.0**

- Rättningarna från granskningen, borttagna menyer, förstadiekort för alla kort med ärvd FU-ledning, 98 nya kort, preskription, närliggande brott, kommande lagändringar och utökad lagbevakning.

**Gjort i 2.1**

- 437 nya kort för alla återstående författningar i inventeringen (paket A–E, inklusive förordningarna) och de sista luckorna i lagar som redan fanns.
- Andra läsningen av rekvisiten på de 393 äldre korten: 38 sakfel rättade.
- Preskription för brott med villkorad straffskala.
- ÅFS 2005:9 kontrollerad mot aklagare.se (oförändrad sedan ÅFS 2019:2).

**Medvetet utelämnat**

- Författningar som inte gäller i dag: lagen (2026:1600) om omhändertagande för vård av barn och unga, elmarknadslagen (2026:1281) och lagen (2026:1283) om elektriska ledningar (alla från 2027-01-01), konsumentkreditlagen (2026:1011, från 2026-11-20) och folkbokföringslagen 42 a § (från 2026-12-01).
- Författningar som saknar tillämpning: lagen (1974:922) om kreditpolitiska medel, förordningen (1988:160) om betalningsvillkor vid kreditköp, lagen (1983:147) om djurstallar, lagen (1974:1080) om avveckling av hyresregleringen, valutaförordningen (1959:264) och förordningen (1989:263) om särskild hastighetsbegränsning.
- Bestämmelser med bötesbelopp i kronor som i praktiken är penningböter: lagen (1918:399) om tjur eller hingst på samfälld betesmark och delar av ägofredslagen och flottningslagen.
- Lagen (2026:786) om nordisk verkställighet var en felträff i inventeringen (ingen straffbestämmelse).

**Kvar att göra senare**

- Kort för de författningar som träder i kraft 2026-11-20, 2026-12-01 och 2027-01-01, när de har börjat gälla.
- Häktning, tvångsmedel och FU-ledning för de 13 korten med villkorad straffskala bygger fortfarande på en samlad bedömning och inte på vald gren.
- Granskningslistan i `docs/underlag/granskning-2-1.md`: kort där innehållet i en EU-förordning eller en myndighetsföreskrift inte står i den svenska lagtexten.

## 1. Sammanfattning

- **Granskningen** hittade två fel i sak, ett trettiotal kort där skuldformen måste kontrolleras och ett antal brister i enhetlighet, sökning och hjälptexter. Lagtexten på alla 561 kort stämmer mot dagens lydelse.
- **Saknade brott:** 293 gällande författningar har straffbestämmelser med dagsböter eller fängelse och saknas i katalogen. Av dem är 167 lagar med fängelse i straffskalan. Dessutom saknas ett trettiotal straffbestämmelser i lagar som redan finns i katalogen.
- **Förstadier:** 175 kort saknar förstadiekort i dag. Planen ger alla kort tre förstadiekort (äkta eller falska) och ger de äkta korten verktyget för FU-ledning.
- **Menyer som tas bort:** Lydelse och gärningstidpunkt samt Straffskala och beslutsvillkor.
- **Nya funktioner:** sju förslag i avsnitt 6. Jag rekommenderar preskriptionstid, närliggande brott och kort för allmänna ansvarsregler först.

Beslut jag behöver av dig står i avsnitt 8.

## 2. Granskning av befintligt material

### 2.1 Så gjordes granskningen

- Lagtexten på varje kort jämfördes maskinellt med dagens text hos riksdagen (hämtad 2026-11-13).
- Straffskalan på varje kort jämfördes med kortets lagtext.
- Rekvisiten jämfördes maskinellt med lagtexten i fråga om skuldform, undantag för ringa fall och omständigheter för brottets grad. Alla träffar kontrollerades för hand.
- Sökningen testades med 80 vardagsord, förkortningar och lagrum.
- Hjälptexter, kategorier, titlar och lagrumshänvisningar gicks igenom för enhetlighet.
- Rekvisiten för de vanligaste brotten lästes om för hand.

Det som inte är gjort: en fullständig andra läsning av alla 561 korts rekvisit mot lagtext och förarbeten. Den föreslås som eget arbetspaket (AP2).

### 2.2 Det som stämmer

- Lagtexten är identisk med gällande lydelse på 559 av 561 kort. De två avvikelserna är formatering (en rubrikrad och ett kort som medvetet visar ett utdrag).
- Straffskalans högsta och lägsta värde finns i lagtexten på alla kort som har en fast skala.
- Alla 561 kort har rekvisit och typexempel. Inget kort innehåller formuleringen ”brott som anges i lagtexten”.
- Alla 386 äldre grundkort har tre förstadiekort var.

### 2.3 Fel i sak

| Nr | Kort | Fel | Rättning |
|---|---|---|---|
| F1 | Hindrande av förrättning (BrB 17:13) | Straffskalan visas som ”Böter eller fängelse i högst 0 år”. | Straffet är böter. Texten ska vara ”Böter”. |
| F2 | Fyndförseelse (BrB 10:8) | Rekvisiten anger ”Uppsåt eller oaktsamhet”. | Brottsbalksbrott kräver uppsåt om inget annat sägs (BrB 1:2). Raden ska vara ”Uppsåt”. |

### 2.4 Kort där innehållet måste kontrolleras

| Nr | Vad | Omfattning | Åtgärd |
|---|---|---|---|
| K1 | **Skuldform som lagen inte anger.** Kortet säger ”Uppsåt” (eller ”Uppsåt eller oaktsamhet”) fast paragrafen är tyst. | Cirka 30 kort i specialstraffrätten, bland annat överträdelse av kontaktförbud, överträdelse av tillträdesförbud, sjöfylleri, flygfylleri, smitning, folkbokföringsbrott, överträdelse av näringsförbud, spelfusk och brotten i sjölagen 20 kap. | Kontrollera varje kort mot förarbeten och praxis. Viktigast är **överträdelse av kontaktförbud**, där oaktsamhet sannolikt räcker. Där rättsläget är oklart ska kortet säga att lagen inte anger skuldform. |
| K2 | **Ringa-rutor som ser lagstadgade ut.** Rutan säger ”Bedöms med hänsyn till” följt av mina egna exempel, till exempel ”en örfil eller en knuff”. | Cirka 25 ringa kort, bland annat misshandel, tillgrepp av fortskaffningsmedel, bokföringsbrott och penningförfalskning. | Märk rutorna som exempel (”Lagen anger inga särskilda omständigheter. Exempel på vad som vägs in”), på samma sätt som redan görs för grova brott. |
| K3 | **Villkorade straffskalor.** Kortet visar ”Villkorad straffskala” och häktningsraden säger ”Straffskala ej verifierad”. | 14 kort: upplopp, våldsamt upplopp, myteri, svikande av försvarsplikt, högförräderi, egenmäktighet vid förhandling med främmande makt, olovlig värvning, vårdslöshet med hemlig uppgift, brukande av det förfalskade, arbetsmiljöbrott och fyra kort om osann utsaga inför nordisk eller internationell domstol. | Ge varje gren en egen skala som går att välja, eller dela korten per gren. Då fungerar häktning, tvångsmedel och FU-ledning även här. |
| K4 | **Krigsartiklarna visas som overifierade.** Häktningsraden säger ”Straffskala ej verifierad” fast skalan är kontrollerad. Orsaken är att kapitlet bara gäller i krig. | 16 kort i BrB 21 och 22 kap. | Visa i stället ”Gäller bara när riket är i krig eller när regeringen har beslutat det”. |
| K5 | **Upplysning om förstadier saknas** på nya kort där lagen straffbelägger försök eller förberedelse. | Olovlig befattning med narkotikaprekursorer (NSL 4 §), olovlig spelverksamhet, grovt brott, och spelfusk (spellagen 19:6), företagsspioneri och olovligt utnyttjande av teknisk företagshemlighet (FHL 26 b §). | Löses av förstadiekorten i avsnitt 4. |
| K6 | **Tillägnelseuppsåt** beskrivs som ”avsikt att behålla det tagna”. Det kan läsas som att avsiktsuppsåt krävs. | Stöld och kort som bygger på stöld. | Skriv ”Uppsåt att tillägna sig det tagna, det vill säga att behålla det eller förfoga över det som sitt eget”. |
| K7 | **ÅFS 2005:9.** Appen bygger på den konsoliderade versionen till och med ÅFS 2019:2. Jag kunde inte nå aklagare.se från den här miljön och har därför inte kunnat kontrollera om det finns senare ändringar. | FU-ledningsverktyget för alla kort. | Kontrollera mot aklagare.se innan nästa version byggs. |

### 2.5 Hjälptexter som säger fel sak

| Nr | Var | Brist | Åtgärd |
|---|---|---|---|
| H1 | Rättslig kontroll, nya kort | Texten säger ”Ingen individuell kontrolltidpunkt dokumenterad” och ”Straffskala: strukturerad, men ej individuellt verifierad”. De 168 nya korten är kontrollerade 2026-11-04. | Läs kontrolldatum från kortet. |
| H2 | Rättslig kontroll, nya kort | Texten säger ”Förstadier: se särskilda förstadieposter”. Sådana finns inte för de nya korten. | Löses av avsnitt 4. |
| H3 | Lagtext, alla kort | Under lagtexten står ”Inte fullständig juridisk rekvisitgranskning”. Texten är från 1.5 och säger inget om dagens rekvisit. | Korta till ”Kontrollerad mot gällande lydelse ÅÅÅÅ-MM-DD”. |
| H4 | Straffskala, äldre kort | Under skalan står texter som ”Straffskala enligt brottsbalkens konsoliderade bestämmelse” eller ”Straffskalans grad enligt aktuell paragraf”. De tillför inget. | Ta bort tomma noteringar. Behåll noteringar med sakinnehåll. |
| H5 | Lagtext, fem kort | Avstavningar från källtexten står kvar mitt i ord, till exempel ”myndig-hets bud”. Gäller uppvigling, överträdelse av myndighets bud, hindrande av förrättning, svikande av försvarsplikt och egenmäktighet vid förhandling med främmande makt. | Rensa avstavningarna. |
| H6 | FU-ledning, narkotikabrott (innehav) | Raden hänvisar till ”1 § första stycket 6 narkotikastrafflagen”, som bilagan skriver. Innehav och bruk står sedan 2023 i punkt 5. | Lägg till ”(numera punkt 5)”. |

### 2.6 Enhetlighet

| Nr | Brist | Omfattning | Åtgärd |
|---|---|---|---|
| E1 | Straffskalan skrivs på cirka 50 olika sätt, till exempel ”Fängelse 1–6 år”, ”Fängelse 1 år – 6 år”, ”Fängelse i lägst ett och högst sex år” och ”Fängelse lägst 1 och högst 6 år”. Den korta formen i listan varierar på 25 sätt. | Alla kort | Ett format för den långa formen och ett för den korta, genererade ur skalans värden. |
| E2 | Lagrum skrivs olika: ”BrB 4:9c” och ”BrB 8:4 a”, ”SmuglL 6” och ”TerrL 4 §”, ”NSL 1 § 1 st. 1” och ”TBL 1 § första stycket”. | Alla kort | Ett format: ”BrB 8:4 a”, ”NSL 1 § st. 1 p. 1”. |
| E3 | 28 kategorier, flera överlappar: ”Allmänfarliga” (21 kort) och ”Allmänfarliga brott” (1), ”Person” (28) och ”Liv och hälsa” (4), ”Egendom” (5) och ”Förmögenhet” (48), ”Tjänsteman” (13) och ”Allmän verksamhet” (2). | Kategoriraden på startsidan | Slå ihop till cirka 15 kategorier. |
| E4 | 104 grundkort saknar sökord, till exempel sexuellt ofredande mot barn, obefogad angivelse och sabotage mot blåljusverksamhet. | 104 kort | Ge varje kort minst två vardagliga sökord. |
| E5 | Titeln ”Olovlig införsel eller utförsel” följer inte lagens beteckningar ”olovlig införsel” och ”olovlig utförsel” (smugglingslagen 7 §). | 1 kort | Rätta titeln. |
| E6 | ”Tillåtande av olovlig körning” visar ett utdrag i stället för hela paragrafen. | 1 kort | Lägg in hela TBL 3 §. |

### 2.7 Sökningen

- **Vardagsord utan träff:** bilstöld, fickstöld, personrån, barnporr, falskt körkort, drograttfylleri, handgranat, sprängning, pepparspray, batong, målvakt, åldringsbrott, mopedtrimning, svartbygge, medhjälp och anstiftan.
- **Rangordning:** ”brand” visar lagen om brandfarliga varor före mordbrand. ”8:1” visar vapenbrott (18:1) bland de första träffarna. ”hets” träffar olaga frihetsberövande, eftersom ordet finns inuti ”frihetsberövande”.
- **Åtgärd:** fler sökord (E4), exakt lagrumsträff först, träff på ordets början före träff inuti ord, och tolerans för felstavning.

### 2.8 Lagändringar på väg

| Ikraftträdande | Ändring | Berörda kort |
|---|---|---|
| 2026-12-01 | Folkbokföringslagen 42 § får ny lydelse. Nytt brott: främjande av oriktig folkbokföring (42 a §, fängelse i högst två år). | Folkbokföringsbrott, grovt folkbokföringsbrott, ett nytt kort |
| 2027-01-01 | BrB 7:4 hänvisar till den nya lagen (2026:1600) om omhändertagande för vård av barn och unga i stället för LVU. | Egenmäktighet med barn |
| 2027-01-01 | Miljöbalken 29:4 får ny lydelse. | Otillåten miljöverksamhet |
| 2027-03-01 | Lagen (2022:700) om särskild kontroll av vissa utlänningar får skärpta straff. | Nya kort i paket A |
| Dag som regeringen bestämmer | Stora delar av BrB 25–38 kap. (påföljdsreformen, SFS 2026:1654) och BrB 22:6 c (olovlig kärnsprängning). | Inga kort i dag. Bevakas. |

Den automatiska lagbevakningen (`data/source-status.json`) täcker bara sex lagar: BrB, RB, narkotikastrafflagen, vapenlagen, trafikbrottslagen och knivlagen. De övriga 34 lagarna i katalogen bevakas inte. Åtgärd: utöka bevakningen till alla lagar som har kort.

### 2.9 Mindre tekniska brister

- Rubrikraden i varje dragspelsmeny är 2 px bredare än sin ruta.
- Två interna kort-id har stavfel (`v15-yndo-rseelse`, `v15-beho-righetsmissbrk`). Det syns inte för användaren men försvårar underhåll.
- Byggskriptet för startsidan heter fortfarande ”1.7 shell”.

## 3. Brott som saknas

### 3.1 Metod

Jag sökte i riksdagens öppna data efter alla SFS-dokument som nämner fängelse, böter, straff eller ansvar. Det gav 2 589 författningar. Alla laddades ner och varje paragraf som dömer ut fängelse eller böter togs fram maskinellt. Upphävda författningar och paragrafer med enbart penningböter är bortsorterade.

Hela listan finns i [`docs/underlag/saknade-brott-2026-11-13.md`](underlag/saknade-brott-2026-11-13.md). Skriptet finns i `scripts/sfs_straffinventering.py`.

### 3.2 Resultat

| Grupp | Författningar | Straffparagrafer |
|---|---|---|
| Lagar med fängelse i två år eller mer | 66 | 186 |
| Lagar med fängelse i högst ett år | 56 | 100 |
| Lagar med fängelse i högst sex månader | 45 | 57 |
| Lagar med enbart böter | 80 | 91 |
| Förordningar (böter) | 46 | 54 |
| **Summa** | **293** | **488** |

En straffparagraf ger ofta flera kort (normalgrad, grovt och ringa). Min uppskattning är 600–750 nya grundkort om allt ska med.

### 3.3 Luckor i lagar som redan finns i katalogen

| Lag | Saknas | Straff |
|---|---|---|
| Brottsbalken 23:6 | Underlåtenhet att avslöja brott och underlåtenhet att förhindra brott | Högst två år |
| Brottsbalken 18:2 och 19:11 | Straffskärpning vid brott mot Konungen och mot främmande makts statsöverhuvud eller representant | Förhöjd skala enligt paragrafen |
| Brottsbalken 19:15 | Oaktsam underlåtenhet att avslöja högförräderi, spioneri med flera brott | Enligt paragrafen |
| Rättegångsbalken 9:6 | Brott mot tystnadsplikt enligt rättens eller undersökningsledarens förordnande (yppandeförbud) | Böter |
| Utlänningslagen 20:1 och 20:3 | Olovlig vistelse i Sverige och arbete utan arbetstillstånd | Böter |
| Folkbokföringslagen 42 a § | Främjande av oriktig folkbokföring (från 2026-12-01) | Högst två år |
| Lagen om brandfarliga och explosiva varor 28 § | Brott mot aktsamhetskravet i 6 § | Högst ett år |
| Miljöbalken 29:4 b | Otillåten fartygsåtervinning | Högst två år |
| Miljöbalken 29:2 a, 29:3 b och 29:9 | Förseelse mot områdesskydd, olovlig kemikaliehantering och övriga bötesbrott | Böter |
| Upphovsrättslagen 57 a § | Försäljning av hjälpmedel för att kringgå skydd för datorprogram | Högst sex månader |
| Sjölagen 20:9, 20:13, 20:14 och 20:14 a | Försummelse vid prejning samt försäkringsplikt | Högst sex månader |
| Sjölagen 20:10 och 20:11 | Befälhavarens övriga försummelser och dagboksföring | Böter |
| Luftfartslagen 13:5 och 13:6 | Lufttransport utan licens samt oriktiga uppgifter | Högst sex månader respektive böter |
| Vapenlagen 18:10 | Utebliven anmälan om utförsel eller utlåning | Böter |
| Ordningslagen 3:22 | Brott mot bestämmelserna om allmän plats (3 kap.) | Böter |
| Alkohollagen 11:8 | Försäljning av teknisk sprit i strid med föreskrifter | Böter |
| Jaktlagen 45 § | Övriga jaktförseelser | Böter |
| Djurskyddslagen 10:4 och 10:5 | Brott mot EU-bestämmelser och föreskrifter | Böter |
| Yrkestrafiklagen 5:3 och 5:4, taxitrafiklagen 5:2, 5:5 och 5:6 | Förarbehörighet och olaga taxiliknande trafik | Böter |
| Lagen om totalförsvarsplikt 10:4 och 10:5 | Oaktsam utevaro och oriktiga uppgifter | Böter |
| Lagen om säkerhet vid tunnelbana och spårväg 31 § | Utebliven rapportering | Böter |

### 3.4 Förslag till paket

Jag har sorterat de saknade lagarna efter hur ofta en polis i yttre tjänst eller en utredare kan väntas möta dem. Antalen är ungefärliga.

**Paket A – polisnära (cirka 45 lagar, cirka 140 kort)**

- **Förbud och övervakning:**
  - lagen (2024:7) om preventiva vistelseförbud (överträdelse av vistelseförbud, hindrande av elektronisk övervakning)
  - lagen (2015:642) om europeisk skyddsorder
  - lagen (2021:34) om tillträdesförbud till butiker, badanläggningar och bibliotek
  - lagen (2007:1150) om tillsyn över hundar och katter (överträdelse av hundförbud)
- **Frihetsberövade och utlänningar:**
  - fängelselagen 15 kap. (vapen, alkohol och narkotika till intagen)
  - lagen (2022:700) om särskild kontroll av vissa utlänningar
  - lagen om tillstånd för anställning på fartyg
- **Barn och unga:**
  - LVU 44–45 §§ och lagen (2026:1600) om omhändertagande för vård av barn och unga (utreseförbud, flyttningsförbud)
  - socialtjänstlagen 18 kap.
- **Trafik och fordon:**
  - järnvägssäkerhetslagen och lagen om nationella järnvägssystem (onykterhet i järnvägstrafik)
  - körkortslagen, lagen om trafikskolor, lagen om utbildning till förare av mopeder, lagen om yrkesförarkompetens
  - lagen (2026:1274) om färdskrivare (färdskrivarmanipulation)
  - lagen om förarbevis för vattenskoter (olovligt förande av vattenskoter)
  - lagen om biluthyrning, lagen om radar- och laserinstrument, fordonslagen, terrängkörningslagen, vägtrafikskattelagen, lagen om vägavgift
  - trafikförordningen, förordningen om fordons registrering och användning, sjötrafikförordningen (de delar som ger dagsböter)
- **Droger, läkemedel och farliga ämnen:**
  - lagen (2025:621) om lustgas, lagen om tobaksfria nikotinprodukter
  - lagen om kontroll av narkotika 13 §, läkemedelslagen, lagen om handel med läkemedel, lagen om sprutor och kanyler
  - lagen (2014:799) om sprängämnesprekursorer
- **Ordning och säkerhetsbranschen:**
  - lagen om bevakningsföretag, lagen om ordningsvakter, lagen om larmanläggningar
  - lagen om handel med begagnade varor, lagen om dyrkverktyg, lagen om kampsportsmatcher
  - lagen om skydd mot olyckor (eldningsförbud)
- **Natur och kultur:**
  - fiskelagen, kulturmiljölagen (fornminnesbrott), skogsvårdslagen, lagen om Estonias gravfrid, begravningslagen
- **Vård och kropp:**
  - abortlagen, steriliseringslagen, lagen om omskärelse av pojkar, lagen om estetiska ingrepp
  - patientsäkerhetslagen (obehörig yrkesutövning), lagen om genetisk integritet (handel med biologiskt material), transplantationslagen
- **Bostad och bulvaner:**
  - jordabalken 12:65–65 c (handel med hyreskontrakt)
  - lagen om förbud mot juridiskt eller ekonomiskt biträde, lagen om bulvanförhållanden, aktiebolagslagen 30 kap.
- **Luckorna i avsnitt 3.3.**

**Paket B – ekonomi, finans och immaterialrätt (cirka 45 lagar, cirka 130 kort)**

- **Marknadsmissbruk:** lagen (2016:1307) om straff för marknadsmissbruk (insiderbrott, marknadsmanipulation, obehörigt röjande) och lagen (2013:385) om grossistenergiprodukter.
- **Stöd och finans:** subventionsbrottslagen, lagen (2026:56) om olovlig finansiell verksamhet, lagen om internationella sanktioner, lagen om frysning av tillgångar.
- **Skatt och tull:** lagen om punktskattekontroll, lagen om skatt på energi (märkt olja), lagen om tobaksskatt, lagen om oriktigt ursprungsintyg, tullagen (tullförseelse).
- **Immaterialrätt:** patentlagen, mönsterskyddslagen, lagen om företagsnamn, lagen om kretsmönster, växtförädlarrättslagen, lagen om avkodningsutrustning.
- **Bolag och kredit:** lagen om ekonomiska föreningar, stiftelselagen, konkurslagen, lagen om företagsrekonstruktion, kreditupplysningslagen, inkassolagen, försäkringsrörelselagen, fastighetsmäklarlagen, revisorslagen och meddelandeförbuden i finansmarknadslagarna.
- **Reglering:** lagen om valuta- och kreditreglering, prisregleringslagen, lagen om elektronisk kommunikation, radio- och tv-lagen, lagen om elektroniska anslagstavlor.

**Paket C – säkerhet, försvar och grundlagar (cirka 30 lagar, cirka 80 kort)**

- **Vapen och export:** lagen om klusterammunition (fängelse i upp till 18 år eller på livstid), lagen om krigsmateriel, lagen om produkter med dubbla användningsområden, lagen om varor som kan användas till dödsstraff eller tortyr.
- **Kärnteknik och strålning:** lagen om kärnteknisk verksamhet, strålskyddslagen.
- **Totalförsvar:** förfogandelagen, ransoneringslagen, lagen om undanförsel och förstöring, lagen om skyddsrum, lagen om utrymning och inkvartering, lagen om försvarsuppfinningar, krigshandelslagen.
- **Skyddad information:** lagen om skydd för geografisk information, lagen om kontinentalsockeln, lagen om Antarktis.
- **Yttrandefrihet och sekretess:** tryckfrihetsförordningen och yttrandefrihetsgrundlagen (efterforskningsförbud, spridning av beslagtagen skrift), offentlighets- och sekretesslagen 14:1, lagen om meddelarskydd.

**Paket D – miljö, sjöfart, livsmedel och arbetsliv (cirka 50 lagar, cirka 150 kort)**

- **Sjöfart:** lagen om åtgärder mot förorening från fartyg, barlastvattenlagen, fartygssäkerhetslagen, lagen om sjöfartsskydd, sjömanslagen (bland annat myteri), lagen om hamnskydd.
- **Miljö och energi:** lagen om utsläpp av växthusgaser, drivmedelslagen, ellagen, elsäkerhetslagen, naturgaslagen, minerallagen.
- **Livsmedel, djur och växter:** livsmedelslagen, lagen om foder, växtskyddslagen, epizootilagen, zoonoslagen, lagen om djurens hälso- och sjukvård.
- **Arbetsliv:** arbetsmiljölagen 8 kap., arbetstidslagen och lagarna om arbetstid i transportsektorn.

**Paket E – övriga bötesbrott (cirka 120 författningar, cirka 150 kort)**

- De 80 lagar och 46 förordningar som bara har böter och inte ingår i paket A–D.

## 4. Förstadier

### 4.1 Falska och äkta förstadiekort för alla kort

**Läget i dag**

- 386 grundkort har tre förstadiekort var (försök, förberedelse och stämpling). Av de 1 158 korten är 451 äkta (straffbara) och 707 falska (inte straffbara).
- 175 grundkort saknar förstadiekort: de 168 nya korten från 1.9, sex trafikbrott och förberedelse genom anbringande av tekniskt hjälpmedel.

**Förslag**

- Alla grundkort får tre förstadiekort. För de 175 korten blir det 525 nya kort, varav ungefär 90 äkta och 435 falska. Det exakta antalet fastställs mot lagtexten.
- Nya brottskort i avsnitt 3 får förstadiekort från början.
- Ett falskt kort säger tydligt **Ej straffbart**, anger vilken paragraf som räknar upp de straffbara förstadierna i lagen (eller att lagen saknar en sådan paragraf) och visar inga tvångsmedel.
- Ett äkta kort visar lagstödet, straffskalan enligt BrB 23 kap., rekvisiten för förstadiet och grundbrottet som utfällbar rad.

**Lagar bland de nya korten där förstadier är straffbara**

| Lag | Straffbart förstadium |
|---|---|
| Narkotikastrafflagen 4 § | Försök till olovlig befattning med narkotikaprekursorer (inte ren förvaring eller innehav) |
| Alkohollagen 11:11 | Försök och förberedelse till olovlig befattning med sprit, olovlig försäljning av alkohol och olovligt anskaffande av alkohol |
| Dopningslagen 4 § | Försök och förberedelse till dopningsbrott som inte är ringa (inte innehav eller bruk) |
| Jaktlagen 46 a § | Försök och förberedelse till grovt jaktbrott och grovt jakthäleri |
| Miljöbalken 29 kap. | Försök och förberedelse till grovt miljöbrott och grovt artskyddsbrott, försök till dumpning |
| Utlänningslagen 20:7 och 20:8 | Försök till hjälp till olovlig vistelse, försök och förberedelse till människosmuggling |
| Spellagen 19:6 | Försök och förberedelse till olovlig spelverksamhet, grovt brott, och spelfusk |
| Upphovsrättslagen 53 § och varumärkeslagen 8:1 | Försök och förberedelse |
| Lagen om företagshemligheter 26 b § | Försök och förberedelse till företagsspioneri och olovligt utnyttjande eller röjande av teknisk företagshemlighet |
| Terroristbrottslagen 11 § | Försök, förberedelse och stämpling till terroristbrott, försök till brotten i 4 a–6 §§ |
| Lagen om internationella brott 16 § | Försök, förberedelse och stämpling till folkmord, brott mot mänskligheten, aggressionsbrott och krigsförbrytelse |
| Könsstympningslagen 2 § | Försök, förberedelse och stämpling |

Övriga 21 lagar bland de nya korten straffbelägger inga förstadier. Alla deras förstadiekort blir falska.

### 4.2 FU-ledning på förstadiekort

**Läget i dag**

- Verktyget FU-ledning och åklagarkontakt visas inte på förstadiekort.

**Förslag**

- Alla äkta förstadiekort får verktyget. Falska kort får det inte, eftersom det inte finns något brott att utreda.
- Det som gör förundersökningen åklagarledd för det fullbordade brottet gör den åklagarledd också för förstadiet:
  - Brott som inte står i bilagan till ÅFS 2005:9 är inte av enkel beskaffenhet. Det gäller också försök, förberedelse och stämpling till dem.
  - Reglerna i ÅFS 6–8 §§ gäller oavsett om brottet är fullbordat. Exempel: våld eller hot mot närstående, sexuell handling mot barn, målsägande under 15 år, hatbrottsmotiv, anhållande och andra tvångsmedel.
  - ÅFS 10 § nämner uttryckligen försök, förberedelse och stämpling till brott med minst fyra års minimistraff. Underrättelseplikten gäller alltså också för dem.
  - Reglerna för unga misstänkta (LUL) och för anhållna gäller likadant.
- Frågorna i verktyget ställs på samma sätt som för det fullbordade brottet. Brottstypens egenskaper (våld, sexualbrott, hatbrott) ärvs från grundbrottet.

**En fråga som måste avgöras**

Bilagan till ÅFS 2005:9 nämner inte förstadier. Det påverkar förstadier till brott som står i bilagan, till exempel försök till stöld.

- **Alternativ 1 (min rekommendation):** förstadiet behandlas som grundbrottet. Kortet visar ”Polisledd” med upplysningen att bilagan inte nämner förstadier uttryckligen.
- **Alternativ 2:** förstadiet räknas inte som enkelt eftersom det inte står i bilagan. Kortet visar ”Åklagarledd om någon är skäligen misstänkt”.

Du vet hur det hanteras i praktiken. Jag har inte hittat någon källa som avgör frågan.

## 5. Menyer som tas bort

| Meny | Var | Vad som händer med innehållet |
|---|---|---|
| **Lydelse och gärningstidpunkt** | Under lagtexten på grundkort | Menyn och raden ”Källkontroll” tas bort. Kommande lagändringar visas i stället som en kort rad på de kort som berörs (se förslag 4 i avsnitt 6). |
| **Straffskala och beslutsvillkor** | Under tvångsmedelsöversikten | Menyn tas bort. Varje tvångsmedel visar redan om brottskravet är uppfyllt. |

- Testerna som kräver menyerna skrivs om, på samma sätt som när extramenyerna i rekvisiten togs bort i 1.9.
- Datamodulerna bakom menyerna ligger kvar tills vidare, eftersom andra kontroller läser dem.

## 6. Förslag på nya funktioner

1. **Preskriptionstid (rekommenderas).** Varje kort visar när brottet preskriberas, uträknat ur straffskalan enligt BrB 35 kap., med undantagen för brott som inte preskriberas och för brott mot barn. Det är en fråga som ofta avgör om en gammal anmälan ska utredas, och den går att räkna ut automatiskt.
2. **Närliggande brott (rekommenderas).** Varje kort får en rad ”Skilj från” med länkar till de brott man oftast förväxlar det med och en mening om skillnaden. Exempel: stöld, egenmäktigt förfarande och olovligt brukande. Det hjälper till med rubriceringen på plats.
3. **Allmänna ansvarsregler (rekommenderas).** Egna kort för medhjälp och anstiftan (BrB 23:4), underlåtenhet att avslöja eller förhindra brott (BrB 23:6), nödvärn, nöd och laga befogenhet (BrB 24 kap.). Sökning på ”medhjälp” och ”anstiftan” ger i dag ingen träff.
4. **Kommande lagändringar.** En kort rad på berörda kort, till exempel ”Ny lydelse från 2026-12-01”, hämtad automatiskt ur lagtextens ikraftträdandemarkeringar. Den ersätter menyn Lydelse och gärningstidpunkt.
5. **Kopiera rubricering.** En knapp som kopierar rubricering och lagrum i den form som används i anmälan och stämningsansökan, till exempel ”Stöld, 8 kap. 1 § brottsbalken”.
6. **Försvarare och målsägandebiträde.** En rad som visar när offentlig försvarare ska förordnas på begäran (minimistraff sex månader, RB 21:3 a) och när målsägandebiträde normalt förordnas (sexualbrott, brott mot närstående). Underlaget finns redan i straffskalan och brottstypen.
7. **Rubriceringsguide.** Ett frågeflöde som börjar i händelsen (”någon har tagit något”, ”någon har hotat”) och leder fram till rätt kort. Det är det största förslaget och bör vänta tills katalogen är komplett.

## 7. Arbetspaket

| Paket | Innehåll | Omfattning |
|---|---|---|
| **AP1 Rättningar** | F1–F2, K1–K7, H1–H6 och E1–E6 i avsnitt 2 | Liten till medelstor |
| **AP2 Andra läsning** | Alla 561 korts rekvisit läses om mot lagtext, kapitel för kapitel, med en checklista för skuldform, undantag, grad och hänvisningar | Stor |
| **AP3 Menyer** | Ta bort de två menyerna, skriv om tester | Liten |
| **AP4 Förstadier** | 525 nya förstadiekort, FU-ledning på äkta förstadiekort | Medelstor |
| **AP5 Sökning** | Sökord, rangordning, felstavning | Liten till medelstor |
| **AP6 Lagbevakning** | Bevakning av alla lagar med kort, rad för kommande lagändringar | Liten |
| **AP7 Nya brott** | Paket A–E i avsnitt 3.4, med förstadiekort | Mycket stor |
| **AP8 Nya funktioner** | De förslag du väljer i avsnitt 6 | Liten till stor |

**Förslag till ordning**

- **Nästa uppdatering:** AP1, AP3, AP4, AP5, AP6, paket A och luckorna i 3.3, samt förslag 1–4 i avsnitt 6. Det ger ungefär 140 nya grundkort och 950 nya förstadiekort.
- **Därefter:** AP2 parallellt med paket B och C.
- **Sist:** paket D och E.

Allt går att bygga i en enda uppdatering, men då blir granskningen av varje kort tunnare. Katalogen växer från 1 719 till uppskattningsvis 4 500 sökposter när allt är med. Startsidans laddtid behöver mätas då.

## 8. Beslut jag behöver

1. **Omfång för nästa uppdatering.** Ska jag följa förslaget (paket A först), eller ska alla 293 författningar med i samma uppdatering?
2. **Böter i förordningar.** Ska förordningarnas bötesbrott med (paket E), till exempel trafikförordningen? De flesta överträdelser där ger penningböter och faller utanför, men några ger dagsböter.
3. **Förstadier till brott i ÅFS-bilagan.** Alternativ 1 eller 2 i avsnitt 4.2?
4. **Straffskärpningsregler.** Ska BrB 18:2 och 19:11 bli egna kort, eller en upplysning på de berörda grundkorten?
5. **Nya funktioner.** Vilka av förslagen i avsnitt 6 ska med?
6. **Versionsnamn.**
