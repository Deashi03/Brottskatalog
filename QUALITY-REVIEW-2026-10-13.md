> **Historiskt dokument.** Siffrorna nedan gäller version 1.3–1.4. Aktuell granskning finns i [docs/V17-PLAN.md](docs/V17-PLAN.md), och ändringarna står i [CHANGELOG.md](CHANGELOG.md).

# Brottskatalog – kvalitetsgranskning 2026-10-13
## Kompletterande sakgranskning av 16 vanliga brott – 2026-10-13

Ett separat verifieringslager `core-penalties-13.js` har jämfört angivna numeriska straffskaleintervall mot brottsbalkens konsoliderade lagtext för **ringa stöld, stöld, grov stöld, inbrottsstöld, rån, grovt rån, misshandel, ringa misshandel, grov misshandel, synnerligen grov misshandel, bedrägeri, ringa bedrägeri, grovt bedrägeri, skadegörelse, ringa skadegörelse och grov skadegörelse**.

Samtliga **16** överensstämde med databasens lagrade min-/maxvärden och bötesstatus. Granskningsfält har därför knutits till just **straffskalan**, inte till lagtextens fullständighet eller alla rekvisit. Kodens säkerhetsspärr `scripts/core_penalties_13_test.mjs` förhindrar att en avvikande eller källändrad straffskala tilldelas nytt verifieringsdatum. Helkatalogens senaste gröna maskinella revision visar att antalet grundposter utan dokumenterad straffskalekontroll minskat från **50 till 34**; de **251 maskinimporterade lagtextutdragen** förblir en separat granskningskö.

[Godkänd testkedja med 16 kontroller och iPhone-test](https://github.com/Deashi03/Brottskatalog/actions/runs/38421089784).

**Källa:** [Brottsbalk (1962:700)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/), kapitel 3, 8, 9 och 12. Historisk lagversion och särskilda övergångsregler måste fortfarande prövas efter gärningsdatum.

---

## Tillägg – faktisk status efter 1.3

Den aktuella katalogen har **1 157 sökingångar (299 grundposter och 858 förstadier)**, varav 337 förstadier är markerade straffbara och 521 inte straffbara. Åtal: 215 grundposter allmänt åtal, 84 har åtalsvillkor. Den tekniska revisionsrapporten identifierar fortsatt **251 maskinimporterade lagtextutdrag** och **50 poster utan dokumenterad straffskalekontroll**. Dessa är kvarvarande juridiska granskningsuppgifter, inte lika många bekräftade faktafel.

**Åtgärdat:** BrB 20:2 tillagd med två grader och giltighetsdatum 1 augusti 2026. Tjänstefel (20:1) och brott mot tystnadsplikt (20:3) har uppdaterade straffskalor. 20:5:s särskilda åtalsregel för uppgifter till skydd för enskild redovisas. En ny granskare identifierar SFS-utdrag med alternativa eller ännu ej ikraftträdda lagtextversioner. Alla sådana uppgifter visas bara i den hopfällda rättsliga kontrollen längst ned.

**Verifieringsbegränsning:** Kodbasens klassificering av samtliga förstadier bygger på kapitelvis kartläggning och är inte en juridisk handgranskning av vart och ett. Framtida ikraftträdanden eller gärningsdatum kräver fortfarande separat kontroll. Grön CI testar intern konsistens och utvalda fall, inte lagligheten i varje konkret ingripande.

[Senaste verifierade godkända tekniska testkedja](https://github.com/Deashi03/Brottskatalog/actions/runs/38419339176).

---


## Aktuell uppföljning 1.4 – 15 oktober 2026

Den senaste genomförda kvalitetsomgången finns i [godkänd CI-körning 38730837855](https://github.com/Deashi03/Brottskatalog/actions/runs/38730837855).

- **1 157 sökbara poster** (299 grundbrott och 858 förstadier) samt 27 synliga tvångsmedel.
- **10 tidigare odaterade straffskalor** har källkontrollerats och fått separata regressionstester: sex i BrB 4 kap. och fyra i BrB 17 kap.
- **24 grundposter** återstår med straffskala som saknar dokumenterad kontroll, jämfört med 34 före denna granskningsomgång.
- **251 maskinimporterade lagtextutdrag** är ännu inte individuellt fullständighetsgranskade.
- **2 grundposter** har källtext med alternativa/framtida laglydelser.
- Bland **587 inlästa källavsnitt** har **49** källmarkeringar om alternativa ikraftträdanden/upphöranden. **44** av dessa är kopplade till obestämt ikraftträdande beroende av regeringsbeslut. Dessa är inte automatiskt framtida brottsrubriceringar.
- Ingen post har för närvarande statusen `unverified` för förstadiets **maskinella klassificering**. Det betyder inte att varje enskilt negativt eller positivt förstadiebesked är juridiskt slutgranskat.
- Tekniska regressionstester, hela datakatalogens strukturgranskning och iPhone-test har passerat. Kritiska och höga integritetsfel blockerar katalogens testjobb. GitHub Pages använder separat publicering och bör **inte** tolkas som automatiskt blockerad av dessa tester.
- Kontrolldatum som är ogiltiga eller ligger i framtiden används inte som juridisk verifiering. Källans egna ikraftträdandemarkeringar visas enbart i hopfällda `Rättslig kontroll` längst ned i brottskortet.

Kvarvarande uppgifter ska prioriteras enligt faktisk juridisk användning och granskas mot officiell gällande lydelse, aktuell gärningstidpunkt, straffskalans grader och eventuella förstadie- och åtalsundantag.

---

## Tillägg – status efter databasuppdatering 1.2

Granskningsrapporten nedan dokumenterar **äldre tillstånd** och ska inte läsas som aktuell briststatistik. Vid [godkänd automatiserad testkörning 38414940218](https://github.com/Deashi03/Brottskatalog/actions/runs/38414940218) var databasens täckning:

- **297** grundbrott, **852** sökbara förstadier, totalt **1 149** poster.
- Förstadier: **337** registrerat straffbara, **515** registrerat icke straffbara, **0** utan registrerad klassificering. Kapitelregler och specialundantag kan fortsatt kräva individuell juridisk sakgranskning.
- Åtal: **215** grundposter märkta med allmänt åtal, **82** med åtalsvillkor, **0** oklassificerade.
- Straffskaleformat: **295 av 297** med numeriskt intervall; **2** legitimt beroende av ett underliggande brott eller straffbud.
- Offline lagtext: **48** poster med tidigare manuellt lagtextläge, **249** med maskinimporterat utdrag, **0** utan något textutdrag. Ett maskinimporterat utdrag är inte juridiskt slutgranskat.
- Öppna sakgranskningspunkter: **249 maskinimporterade utdrag**, **50 poster utan dokumenterad straffskalekontroll** och **0 negativa förstadiebesked med den tidigare dokumenterade källhänvisningsluckan**. Samma post kan förekomma i flera kategorier.

Automatisk granskning och godkända tester är inte likvärdiga med juridisk sakkunniggranskning. Historisk lagversion och framtida ikraftträdanden måste fortsatt hanteras separat.

---


## Slutsats och avgränsning

**Tekniskt:** Katalogens 1 149 sökbara poster har genomgått maskinell kontroll av struktur, lagrum, penaltyRange, status, relations-ID, lagtextläge, länkar, åtalsmetadata och metadata för tvångsmedel. Playwright-test har passerat på GitHub Actions, tillsammans med förstadie- och integrationstester. En framgångsrik teknisk kontroll är **inte** en individuell juridisk sakkunniggranskning av varje rad.

**Juridiskt:** Viktiga brottsfamiljer och centrala förstadiebestämmelser har stickprovskontrollerats mot gällande konsoliderad lagtext. Många poster återstår att verifiera på paragraf-/gärningsformsnivå. Produkten ska inte användas som enda beslutsunderlag för polisiära ingripanden.

Projektstatus för denna granskning: [grön CI-körning](https://github.com/Deashi03/Brottskatalog/actions/runs/38401937729) och [maskinläsbar granskningsrapport](https://github.com/Deashi03/Brottskatalog/actions/runs/38401937729/artifacts/11816056386). Körningen omfattade 1 149 poster innan följande små senare lagtextkommentarer lades in, vilka inte ändrar de redovisade övergripande antalen.

## Inventering

| Posttyp | Antal |
|---|---:|
| Brottsrubriceringar (grundposter) | 297 |
| Förstadieposter (försök, förberedelse, stämpling) | 852 |
| Totalt sökbara poster | 1 149 |
| Förstadier klassade straffbelagda (maskinell status) | 337 |
| Förstadier klassade ej straffbelagda | 109 |
| Förstadier som saknar individuell verifiering | **406** |
| Grundposter med allmänt åtal i katalogen | 205 |
| Grundposter med specialvillkor för åtal | 80 |
| Grundposter med ej verifierad åtalsregel | **12** |
| Grundposter med fullständigt lokalt lagtextläge | 48 |
| Grundposter med maskinimporterat lagtextläge | 203 |
| Grundposter som saknar fullständig offline-lagtext | **46** |
| Grundposter med maskinläsbar numerisk straffskala | 247 |
| Registrerade tvångsmedel utan hemliga | 27 |

Åtalsregler för icke straffbara eller ej verifierade förstadier ska inte jämföras direkt med grundposternas åtalsandelar. Kategorierna överlappar på ett sätt som kan ge missvisande totalsiffror.

## Identifierade kvalitetsluckor

Antalen är **kontrolluppgifter** som kan överlappa, inte verifierade fel i lika många lagrum.

| Prioritet | Typ | Antal vid skanningen | Rekommenderad åtgärd |
|---|---|---:|---|
| P0 | Fel val av gällande lagversion på gärningsdagen | Ej kvantifierat | Lägg till giltighetsperioder, publiceringsdatum och automatiska versionskontroller; skilj kommande/upphörd/gällande text. |
| P0 | Ej individuellt juridiskt granskade förstadier | 406 | Kontrollera särskild föreskrift paragraf för paragraf, inklusive undantag för gärningsformer och grader. |
| P0 | Maskinimporterade textutdrag | 203 | Validera mot komplett ordagrann lagtext, stycken, hänvisningar och ändringar. |
| P1 | Fullständig lagtext saknas offline | 46 | Importera rätt paragraf med säker versionsmärkning och automatiserad kontroll av fullständighet. |
| P1 | Straffskalegranskning saknar dokumenterad verifiering | 50 | Koppla minimistraff/maximistraff, böter, livstid, straffvärdesregler, ikraftträdande och rättskälla. |
| P1 | Straffskala kan inte maskinparsas från databasfält | 48 | Strukturera gränser och undantag; lämna rättsligt oklara som ”ej verifierat”. |
| P1 | Källstöd för åtalsregel saknas i separat fält | 45 | Ange exakt särskilt lagstöd eller RB 20:3 och tillämplig specialbestämmelse. |
| P1 | Grundbrottens åtalsregel ej verifierad | 12 | Individuell åklagar-/processrättslig granskning. |
| P1 | Icke straffbara förstadier med svagt dokumenterat negativt stöd | 12 | Kräv uttryckligt granskat lagrum, lagversion och förklaring till varför kriminalisering saknas. |
| P2 | Separat käll-URL saknades på äldre specialstraffrättsliga poster | 22 före rättning | Fixat genom sources-qa.js. Nya länkar måste testas och bevakas för avvikelse. |

### Särskilda juridiska risker

1. **Förstadiestraffskalor:** BrB 23:1–2 skiljer mellan högsta möjliga straff, förbud mot böter vid vissa försök, och kravet att förberedelse/stämpling ska ligga under fullbordat brotts maximum. Straffskalans form, livstid och rättslig verkan för häktning ska kontrolleras separat.
2. **Gärningsformsberoende undantag:** BrB 8:12 – försök till tillgrepp av fortskaffningsmedel omfattas inte när det fullbordade tillgreppet hade varit ringa. BrB 9:11 – särskilda regler för frivilligt tillbakaträdande vid försök till utpressning. Dessa är nu synliggjorda i förstadiekommentarerna.
3. **Narkotika:** NSL 4 § har olika kriminalisering för försök/förberedelse kontra stämpling och undantag för bruk. Ett klassificeringsfel upptäcktes via CI och rättades.
4. **Beslagsbeslut:** RB 27:4 har olika beslutsvägar för föremål som påträffats vid laglig grundåtgärd och fristående fynd, där polisman i senare fallet endast får agera vid FID; sakligt beslagsändamål enligt RB 27:1 krävs alltid.
5. **Beslutsbehörighet är inte brottsskalevillkor:** Grön bock ska aldrig betyda att själva tvångsmedlet är tillåtet i det enskilda fallet. Ändamål, misstankegrad, behov, proportionalitet och befattningskompetens måste bedömas.
6. **Åtal:** Fler gröna bockar har tillkommit via huvudregeln om allmänt åtal, men specialvillkor enligt BrB, smugglingslagen, skattebrottslagen och bidragsbrottslagen ska granskas mot rätt brottstyp och gärningsform.
7. **Framtida bestämmelser:** Riksdagens konsoliderade BrB visar i vissa paragrafer parallella gällande och framtida lydelser. En automatisk ”senaste text”-import kan därmed ge fel uppgifter om gärningen.

### Tekniska fel som verifierats och åtgärdats

- Regressionsfel: ringa narkotikabrotts otillåtna förstadier kunde stå som "ej verifierade" i stället för "ej straffbara"; behörig kriminaliseringsregel i NSL 4 § styr nu markeringen.
- UI-test klickade fel sökresultat för ”försök till ringa stöld”: välj uttrycklig rubricering.
- UI-test hade en icke unik selector för häktningsknapp: välj huvudknappen i statusraden.
- UI-test sökte efter äldre beslutsrubrik, som ersatts med ”Beslut i korthet”: test har synkroniserats med appens nya text.
- Officiella rättskällelänkar saknades på ett antal äldre specialstraffrättsliga poster: kompletterad källmappning för NSL, VapenL, trafikbrottslag och knivlag.

## Rekommenderad ordning för de kommande uppdateringarna

**A. Juridiskt release-stopp:**
- Ingen ny lagändring får läggas in utan lagrum, ikraftträdandedatum, gammal/ny lydelse och kontroll av brottets förstadier och åtalsregler.
- Särskilj rättsligt **kontrollerad**, **automatiskt härledd**, **delvis kontrollerad** och **ogranskad** information, både i datamodellen och vid detaljvyn.
- Börja med de 406 ogranskade förstadierna och 12 okontrollerade åtalsreglerna; prioritera oftast förekommande brott.

**B. Offline fullständighet:**
- Fyll de 46 saknade lagtextposterna med fullständigt aktuell lydelse och giltighetsintervall.
- Jämför de 203 maskinimporterade utdragen mot officiella källor; komplettera varje stycke och rättskällemarkör.
- Normalisera straffskaleformat till intervallobjekt plus undantag, inte fri text.

**C. Automatisering och källkedja:**
- Verifiera att varje juridiskt faktum pekar till konkret paragraf och version; bygg en maskinell ändringsrapport för alla följdeffekter på förstadier, tvångsmedel, häktning, åtal och fältanteckningar.
- Låt CI blockera publicering vid felaktiga regressionstester och juridiskt riskabla ändringar.
- Lägg till daterad rättskälleverifikation och permanent granskningsprotokoll (vem/vad/när/källversion), inte bara en allmän ”kontrollerad”-flagga.

**D. Produkt och UX:**
- Behåll avskalade sökresultat med brott/lagrum/straffskala.
- Behåll lagtext först och kapitelindelade tvångsmedel; inga hemliga tvångsmedel.
- Behåll fyra häktningskort med separata straffskale-/misstankegradsfält.
- Behåll separata beslutslägen för polisman och ett litet utropstecken för svåra beslutsvägar.
- Lägg *endast* till en liten källa/giltighetsstatus i detaljvyn. Låt söksidan förbli så ren som möjligt.

## Produktbedömning

Appen **uppfyller gränssnittsintentionen**: snabb brottssökning, tydligt lagrum och straffskala, förstadier, häktning och relevanta tvångsmedel utan onödig polisgrundkurs.

Appen är **inte juridiskt färdig**, främst på grund av opålitlig tidsversionshantering, många maskinimporterade/ofullständiga lagtexter och en betydande volym ännu ogranskade förstadier. Nästa funktion bör vara **”Gällande lag + verifieringsstatus”** och därefter automatisk versionsövervakning. Fler ikoner, kategorier eller avancerade menyer är inte prioriterade.

## Källor och testning

- [Brottsbalk (1962:700)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/)
- [Rättegångsbalk (1942:740)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740/)
- [Narkotikastrafflag (1968:64)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/)
- [GitHub Actions – framgångsrik granskning](https://github.com/Deashi03/Brottskatalog/actions/runs/38401937729)
- [Detaljerad JSON-granskningsrapport (Actions-artefakt)](https://github.com/Deashi03/Brottskatalog/actions/runs/38401937729/artifacts/11816056386)

Denna rapport avser *kodbasen och ett systematiskt maskinellt kvalitetstest av varje post*, med manuella juridiska stickprov. Den gör inte anspråk på att 1 149 enskilda juridiska slutsatser har sakgranskats av rättslig expert.
