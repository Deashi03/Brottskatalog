# V1.5 – obligatorisk policy för rekvisit och typexempel

Status: arbetsunderlag, **inte publicerad V1.5**. Huvudgrenen/main ska inte uppdateras med ofullständiga rekvisitposter.

## Systematisk inventering och typexempel – fortsättning

- `scripts/brb_inventory_15.mjs` går igenom alla tillgängliga lagtextparagrafer i brottsbalken 3–22 kap. och producerar `audit/brb-inventory-15.json` med en **manuell granskningskö**. En sådan kö får aldrig tolkas som en verifierad fullständig förteckning över saknade brott. Alla separata brottsgrader och särskilda gärningsformer måste också granskas.
- Nya saknade BrB 10:6–8-poster: **behörighetsmissbruk, olovligt brukande, grovt olovligt brukande och fyndförseelse**. Ringa eller grov gärning registreras bara om paragrafen faktiskt anger den särskilda graden.
- Nya BrB 4:4 f–g och 4:7 a-poster: **oskuldskontroll, intygande av sexuell oskuld, uppmaning till självmord och oaktsam uppmaning till självmord**. Inga egna typexempel har skrivits för dessa brott eftersom det krävs särskilt noggrann prövning av omständigheterna.
- **Ytterligare två typexempel från Brottsutredning.docx:** en minderårigs användning av annans äkta ID-kort vid nattklubb (BrB 15:12; fara i bevishänseende och uppsåt) samt olovlig användning av en lånad mobiltelefon för ett dyrt utlandssamtal till ägarens kostnad (BrB 10:7; skada/olägenhet). Dessa visas enbart för respektive förklarade gärningsform.
- **Straffskaleändring 2026-08-01:** BrB 10:5 lägst ett års fängelse för grov trolöshet mot huvudman. Äldre gärningar och övergångsregler ska kontrolleras separat.
- **Åtalsregler:** BrB 10:10 hänvisar till 8:13 för vissa närståendebrott. I vissa fall av olovligt brukande finns ytterligare särskilda åtalsvillkor. BrB 4:11 anger särskilda åtalsundantag men dessa avser inte de fyra nyinförda rubriceringarna i denna arbetsgren. Allmänt åtal är då huvudregel enligt RB 20:3.

## V1.5-inventering – kompletteringsomgång 2026-10-16

- **BrB 16–19 kap.:** 28 saknade sökbara grundposter har införts, bland annat upplopp, våldsamt upplopp, involverande av en underårig i brottslighet, olaga våldsskildring, överträdelse av myndighets bud och ett flertal brott mot Sveriges säkerhet. Straffskalor beroende på roll (upplopp, myteri), krigstillstånd (vissa 18–19 kap.) eller flera allvarlighetsalternativ visas **som villkorade**, inte med en falsk gemensam numerisk straffskala.
- **BrB 4, 6 och 15 kap.:** tio saknade poster för äktenskapstvång, barnäktenskapsbrott, äktenskapsresebrott, samlag med avkomling/syskon och utsagebrott inför nordiska/internationella domstolar. SFS 2026:950 trädde i kraft 2026-07-02 och styr aktuell straffskala för äktenskapsbrotten; äldre gärningstidpunkter behöver separat kontroll. De nordiska/internationella utsagebrottens straff anges genom hänvisning till BrB 15:1–3.
- **BrB 11:2 och 13:5 a–b:** åtta grundposter om försvårande av konkurs/exekutiv förrättning, kapning, sjö- eller luftfartssabotage och flygplatssabotage, inklusive grova grader. Uppsåts-/oaktsamhetsvarianter och särskilda kvalifikationsgrunder måste hållas isär. För grova transportbrott har nio förstadieposter **markerats ej individuellt verifierade**, i stället för att felaktigt påstå att alla är straffria när BrB 13:12 bara nämner huvudrubriceringen.
- **Systematisk kontroll:** `scripts/brb_inventory_15.mjs` markerar BrB:4:24 som en felimporterad hänvisning till kontaktförbudslagen, BrB 11:7 som en regel om ansvar för den som träder i gäldenärens ställe och BrB 22:7 som en särskild förstadiebestämmelse – inga egna huvudbrott. BrB 22:6 c har ikraftträdande först den dag regeringen bestämmer; den får inte införas som ett aktivt brott förrän ikraftträdandet verifierats.
- **BrB 21 och 22 kap.:** 18 grundposter (brott av krigsmän, landssvek, landsskadlig vårdslöshet och brott beträffande kemiska vapen/minor) har fått källanknutna straffskalor. För 14 krigsberoende huvudposter och deras förstadier krävs separat tillämpningsprövning och neutrala tvångsmedelsindikatorer. BrB 21:1 reglerar när hela 21 kap. gäller; BrB 22:7 kan kriminalisera vissa förberedelser och stämplingar även innan krig brutit ut. Inga konstruerade typexempel.
- **BrB 4:9 b:** Särskilt straffbelagd förberedelse genom anbringande av tekniskt hjälpmedel har tillkommit som en egen sökpost, men ska inte generera rekursiva "förstadier till förstadiet". Bestämmelsen omfattar endast dess specifika rekvisit. 
- **Återstående fullständighetsarbete:** Inventering av att varje *gärningsvariant* och särskild *brottsgrad* är korrekt representerad och individuell granskning av rekvisit, historiska lydelser, åtalsregler, förstadier och undantag. En nollad paragrafbaserad granskningskö är inte ett bevis på juridisk totalfullständighet.
- **Testpolicyn:** En grön CI-körning intygar bara maskinell dataintegritet och riktade lagrumskontroller. Den innebär inte att samtliga rekvisit, straffskalor, förstadier och historiska lydelser har granskats juridiskt.

Rättskälla: [Brottsbalken (1962:700), Sveriges riksdag](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/). Lagändring [SFS 2026:950](https://svenskforfattningssamling.se/sites/default/files/sfs/2026-06/SFS2026-950.pdf).

---

## Juridisk publiceringskontroll – 2026-10-16

**BLOCKERAR PUBLICERING.** Den automatiska inventeringen av paragrafer är inte ett intyg om fullständig brottskatalog. Ett separat release-test har införts: `node scripts/v15_release_readiness.mjs --release`. Det misslyckas avsiktligt tills juridiska krav är uppfyllda. GitHub Pages-flödet i arbetsgrenen ska stoppa publicering om en ofärdig version av misstag läggs på `main`.

Senaste gröna databas- och iPhone-körning: [GitHub Actions](https://github.com/Deashi03/Brottskatalog/actions/runs/38899259448).

Resultat från `audit/v15-release-readiness.json`:
- 383 grundposter; **315 BrB-poster**, där övriga 68 hör till specialstraffrätt eller andra kategorier.
- **16/315 BrB-poster** har en strukturerad rekvisitmodell med OCH/ELLER.
- **0/315 BrB-poster** har ännu fått den nya, uttryckliga markeringen `scope=full-legal-review` och `legalReviewApproved=true`. Tidigare partiella kontroller får inte misstolkas som fullständigt godkända.
- **26/315 BrB-poster** har enligt maskinell klassificering fullständighetskontrollerad lagtext; övriga **289** kräver individuell kontroll av utdrag, gällande lydelse och varianter.
- **12 förstadieposter** är uttryckligen `unverified` i fråga om straffbarhet. Detta ska inte göras om till ett kategoriskt ja eller nej utan rättskällegranskning.
- **14 BrB-poster** har redan källförsedda typexempel. Typexempel för juridiskt svårbegripliga brott kan med rätta lämnas tomma.
- Nya kontrollfynd: `Främjande av flykt` var historiskt kopplat till BrB 17:12 trots ändring 2026:924 till 17:12 a, och `Psykiskt våld` (4:7 b) saknades som separat sökpost trots att lagtexten fanns. Båda korrigerade i arbetsgrenen, med OCH/ELLER-rekvisit och utan att hitta på osäkra typexempel.

**Återstår:** juridisk individualgranskning och fastställande av rekvisit för hundratals Brottsbalksposter, verifiering av lagtextutdrag och 12 förstadiebedömningar, kontroll av gradindelning/straffskalor/åtalsregler samt slutlig appversionsmärkning. `V1.4` är tills vidare den enda publicerade versionen.

---

## Fördjupad rekvisitomgång – 2026-10-16

**Godkänd arbetsgrens- och iPhone-regression:** https://github.com/Deashi03/Brottskatalog/actions/runs/38902338202

Senaste juridiska inventering omfattar **384 grundposter**, varav **316 BrB-grundposter**, och **1 074 sökbara förstadier**: totalt **1 458 poster**. Rekvisitstödet har utökats från **16 till 82 BrB-poster** (26 procent av BrB-grundposterna). Resterande grundposter utan individuellt strukturerad rekvisitöversikt är fortfarande öppet arbete. Ingen post har i denna omgång fått status **fullständigt juridiskt slutgodkänd** enligt den strikta release-grinden.

Kompletterad källanknuten OCH/ELLER-struktur bland annat för vållande, framkallande av fara, olaga hot/tvång, ofredande, kränkande fotografering, olovlig identitetsanvändning, olaga integritetsintrång, förtal, förolämpning, egenmäktigt förfarande, bedrägeri, utpressning, ocker, häleri, förskingring, behörighetsmissbruk, fyndförseelse, urkundsförfalskning, skyddande av brottsling, tjänstefel och brott mot tystnadsplikt.

**Grader:** 28 ringa-/grovgradsrekvisit kompletterade med grundbrottets rekvisit och separat helhetsbedömning. Kvalifikationsfaktorer som ska *särskilt beaktas* är inte var och en obligatoriska; automatiserad slutsats om grovhet ska inte dras utifrån en ensam faktor. För grovt tjänstefel och grovt brott mot tystnadsplikt får oaktsamhet inte felaktigt anges som tillräcklig skuldform.

**Rättad felrubricering:** BrB 4:2 innehåller *olaga frihetsberövande* och ett *mindre grovt fall* med lindrigare straffskala, inte ett självständigt brott med rubriken `Grovt olaga frihetsberövande`. En särskild pedagogisk sökpost för den lindrigare straffskalan har införts, märkt som *straffskalealternativ, inte självständig brottsrubricering*. Den genererar inte egna försöks-/förberedelse-/stämplingsposter. Se [BrB 4:2](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

**Slutgranskningsskuld:** Av 316 BrB-grundposter saknar samtliga uttrycklig fullständighetscertifiering enligt den nya modellen, **290** saknar individuell certifiering av komplett lagtext och **12** förstadier har fortfarande oklar straffbarhetsstatus. **82 strukturerade rekvisitstöd är lagtextbaserade, men inte fullständiga rättsutredningar.** Appen får aldrig behandla en skapad punktlista som likvärdig med rättsligt fastställda rekvisit i komplicerade praxisfrågor.

Det som **inte** gjorts: inga påhittade typexempel för svårtolkade eller sällsynta brott, ingen masscertifiering, ingen ändring av publicerade V1.4 och ingen merge av draft PR. `node scripts/v15_release_readiness.mjs --release` ska fortsatt stoppa publicering.

---

## Huvudkrav

1. Samtliga straffbestämmelser i BrB 3–22 kap. inventeras paragraf för paragraf, inklusive särskilda brottsgrader, namngivna ringa brott och straffbestämmelser utan självständig rubrik. En katalogpost ska ha lagrum, aktuell straffskala eller uttryckligen **villkorad**, relevant åtalsregel och förstadier med uttryckligt lagstöd, samt källmetadata.
2. **Rekvisit** är lagstadgade objektiva och subjektiva förutsättningar. Straffvärde-/gradindelningsfaktorer, typiska utredningsåtgärder, presumtioner och relevanta bevisfakta visas **separat**. Rekvisit kan behöva visas som OCH/ELLER-grupper, inte som en platt lista.
3. Ingen rekvisitlista märks juridiskt verifierad utan individuell jämförelse med aktuell SFS och nödvändiga förarbeten/praxis. Automatiskt genererad text får inte ärva kvalitetsdatum. Saknad verifiering ska synas neutralt i Rättslig kontroll.
4. **Typexempel** (inte hypotetiska spets-/gränsfall): typiskt och okomplicerat gärningsförlopp där relevanta rekvisit framgår. Typexemplet har egen proveniens, prövat lagrum och granskningsstatus. Om det finns väsentlig tolkningsrisk eller exemplet ligger långt från polisiär verklighet visas inget exempel.
5. Underlag i användarens tidigare anteckningar är pedagogiskt underlag, inte rättskälleverifikation. Märkta kursanteckningar får inte tillskrivas rättskällevärde.
6. Rekvisit placeras direkt efter lagtext, före tvångsmedelsöversikten. Typfall visas som en diskret underrubrik inuti samma expanderbara rekvisitsektion; underlag och osäkerheter finns i kontrollpanelen längst ner. Brottskortets sökvy förblir avskalad.
7. Befintlig granskningstatus och 3-årsnotis påverkas inte av V1.5-databasarbetet.

## Inventerade typexempel från användarens anteckningar

* **Straffrätt Lund**, F48 Rån: fyra rättsliga typfall: stöld med råntvång, utpressningsrån (bl.a. framtvingad banköverföring), rån beträffande betalningsverktyg och motvärnsrån på bar gärning. Kontrollera 8:5 inklusive situation, tvångstidpunkt och undantag om mindre allvarligt handlande före publicering.
* **Straffrätt Lund**, stöld och RH 1992:79: besittningsrubbning och tidpunkten för fullbordad stöld. Exempel på butikstillgrepp där sista betalningstillfället passerats finns i **Brottsutredning.docx**. Äldre kursförenklingar är inte en universell beslutsregel.
* **Straffrätt Lund**, F49: tillgrepp av fortskaffningsmedel: olovligt tillgrepp och brukande av annans bil utan tillägnelseuppsåt, därefter övergivande. Kontrollera BrB 8:7 och gärningens konkreta omständigheter.
* **Straffrätt Lund**, F50: självtäkt och egenmäktigt förfarande: återtagande av uthyrt föremål före hyrestidens slut; använd bara efter individuellt kontrollerad gränsdragning.
* **Straffrätt Lund**, F51: bedrägeri: förfalskad betalningshandling eller försäljning av egendom som inte disponeras. Publicera enbart fall som uppfyller vilseledande, disposition och förmögenhetsöverföring.
* **Brottsutredning.docx** avsnitt 14:8: anteckningen anger byte av registreringsskylt som ett typexempel på märkesförfalskning. **KÄLLSTÖD FUNNET** i SOU 2025:66 vol. 3 som uttryckligen klassificerar registreringsskyltar som kontrollmärken enligt BrB 14:8. Rekvisiten *obehörig förfalskningsåtgärd*, *fara i bevishänseende* och uppsåt ska uttryckligen anges i exemplet; vanligt legitimt byte utgör inte brott. [SOU 2025:66](https://www.regeringen.se/contentassets/30fcbaf6af924a2d8693b063c5aabc9c/en-straffreform-sou-202566-vol-3.pdf).
* **Brottsutredning.docx** avsnitt 17 kap: spotta eller knuffa polis nämns som typfall vid angrepp mot tjänsteman. **AVVAKTA** till kontroll av rätt gärningsvariant, effekter och konkurrens med andra brott.
* **Brottsutredning.docx** avsnitt 3 kap: ringa/normal/grov misshandel illustreras av smärtans varaktighet, våld mot huvud, sparkningar och tillhyggen. **AVVAKTA** som påstådda fasta gränser; gradindelningen bygger på helhetsbedömning.

## Trolöshet mot huvudman – särskilt källstöd (2026-10-16)

Sökning i de tillgängliga anteckningarna *Brottsutredning.docx*, *Straffrätt Lund (1).docx* och *Juridikens grunder.pdf* gav **inget uttryckligt typexempel** på trolöshet mot huvudman. Exemplen i V1.5 får därför **inte** källmärkas som hämtade från användarens anteckningar.

- **Normalgraden**: en inköpschef med självständigt uppdrag tar otillbörlig förmån och gör avsiktligen inköp till överpris vilket skadar huvudmannen. Underlag: [SOU 2010:38, avsnitt 6.3](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/statens-offentliga-utredningar/mutbrott_gyb338/html/).
- **Grovt brott**: ekonomiassistent med tillräcklig förtroendeställning gör systematiska obehöriga överföringar till sig själv som orsakar mycket stor skada. Underlag: [Stockholms tingsrätt, B 19103-24 (2025)](https://www.domstol.se/nyheter/2025/06/36-arig-man-doms-till-fangelse-for-grov-troloshet-mot-huvudman/). Ett dokumenterat domstolsreferat är inte i sig ett prejudikat.
- **Aktuell lag:** BrB 10:5 ändrades 2026-08-01 genom SFS 2026:1318. Grov trolöshet har nu lägst ett och högst sex års fängelse, medan normalgradens skala är böter–fängelse två år. Det nyinförda alternativet för rättslig angelägenhet ska **inte** blandas ihop med kravet på ekonomisk skada i första stycket.
- **Konkurrens:** BrB 10:5 är subsidiär till förskingring enligt 10:1–3; ett typexempel får inte automatiskt påstå att trolöshet är rätt rubricering utan att förskingringsfrågan beaktas.
- **Källor:** [BrB 10:5](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/) och [SOU 2025:87](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/statens-offentliga-utredningar/straffrattsliga-atgarder-mot-korruption-och_hdb387/html/).

### Genomförda kompletteringar i BrB 14 kap.

Denna arbetsgren har också kompletterat ringa/grova grader för signaturförfalskning, penningförfalskning och olovlig befattning med falska pengar, plus **olaga spridande av efterbildning (14:11, endast böter)**. Dessa ska ligga kvar som BrB-brott även om en tidigare specialstraffrättslig urvalsregel annars skulle ha filtrerat bort rent bötesbelagda brott. Fortsatt inventering av återstående kapitel behövs.

---
## Egenproducerade, enkla typexempel som kan källgranskas

* Mord: gärningsperson skjuter en annan person med avsikt att döda och personen avlider (BrB 3:1, 1:2).
* Stöld: gärningsperson tar och behåller någon annans egendom utan lov, med tillägnelseuppsåt och ekonomisk skada (BrB 8:1).
* Misshandel: gärningsperson slår någon och orsakar avsiktligen fysisk smärta (BrB 3:5).
* Skadegörelse: gärningsperson slår sönder någon annans bilruta med uppsåt så att ägarens rätt till bilen skadas (BrB 12:1).

Samtliga eget formulerade fall måste verifieras mot gällande paragraf och specifika undantag före synlig publicering.

## Checklista för varje införsel

- [ ] Originaltext och korrekt lagversion (inklusive särskilda övergångsregler) kontrollerad.
- [ ] Brottsgrad, rekvisit och eventuella OCH/ELLER-gärningsalternativ uttryckligen angivna.
- [ ] Uppsåt/oaktsamhet, gradindelning och specialrekvisit framgår utan att blandas ihop.
- [ ] Typexempel hämtat från tidigare anteckningar eller förenklat typfall; verifierat mot rättsliga rekvisit; realistiskt i polisär verksamhet.
- [ ] Exemplet saknas hellre än är tvivelaktigt. Inget konstruerat gränsfall publiceras.
- [ ] Straffskala, åtalsvillkor och förstadier verifierade individuellt eller neutralt märkta.
- [ ] Test för att nya data inte ändrar kvalitetsmetadata för ogranskade poster.
- [ ] Katalogomfattande revisionsrapport och iPhone-regression godkända före publicering.
