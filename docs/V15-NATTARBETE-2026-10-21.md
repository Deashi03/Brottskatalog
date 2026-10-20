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
