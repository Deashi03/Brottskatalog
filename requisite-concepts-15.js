/* Source-linked course explanations inside the requisite panel.
 * Canonical definitions live here once; each card stores concept references.
 * This module never changes statutory text, legal approvals or police powers.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const HD='https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2019/b-1200-19.pdf';
const AG='https://www.domstol.se/nyheter/2022/11/oaktsamhet-betraffande-malsagandens-alder-i-ett-mal-om-valdtakt-mot-barn/';
const L=(start,end)=>({file:'Straffrätt Lund 2.docx',paragraphs:[start,end]});
const P=(start,end)=>({file:'Straffprocessrätt 2.docx',paragraphs:[start,end]});
const B=(start,end)=>({file:'Brottsutredning(2).docx',paragraphs:[start,end]});
const J=(start,end)=>({file:'Juridikens grunder(1).pdf',pages:[start,end]});
const entries=[
['beviskrav','Rekvisit och beviskrav','Rekvisiten anger vad som måste vara uppfyllt; beviskravet anger hur säkert detta ska vara visat. För fällande brottmålsdom gäller som huvudregel ställt utom rimligt tvivel, med bevisbördan på åklagaren. Misstankegrader under utredningen är en annan fråga.',[P(427,453)],'HD B 5057-18; skilj från RB 24 kap.','https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2019/b-5057-18.pdf'],
['rekvisit','Rekvisit','Ett krav i brottsbeskrivningen. Skilj krav som alla måste vara uppfyllda från alternativa gärningsformer. En gärning kan stämma med beskrivningen utan att medföra ansvar, exempelvis på grund av nödvärn.',[L(80,112),J(28,29)],'BrB 1:1–2 och 24 kap.'],
['objektiva','Objektiva rekvisit','Krav på den yttre gärningen: vad någon gjort eller underlåtit, omständigheterna och eventuella följder eller faror. Att de är uppfyllda avgör inte ensamt uppsåt, oaktsamhet eller ansvarsfrihet.',[L(91,111),J(28,29)],'BrB 1:1–2'],
['subjektiva','Subjektiva rekvisit','Krav på gärningspersonens uppsåt eller, när det är särskilt föreskrivet, oaktsamhet. Pröva personens inställning till de relevanta faktiska omständigheterna vid gärningen.',[L(108,124),J(30,31)],'BrB 1:2'],
['avsikt','Avsiktsuppsåt','Gärningspersonen har en viss följd som mål med handlandet och uppfattar den som möjlig. Följden behöver inte vara säker. Särskilda syftesrekvisit kan begränsa vilka uppsåtsformer som räcker.',[L(288,291)],'BrB 1:2; uppsåtsbegreppet utvecklas i praxis'],
['insikt','Insiktsuppsåt','Gärningspersonen uppfattar en följd som säker eller praktiskt taget säker, eller inser att en relevant omständighet föreligger. Följden behöver inte vara målet med handlingen.',[L(293,295)],'BrB 1:2; uppsåtsbegreppet utvecklas i praxis'],
['likgiltighet','Likgiltighetsuppsåt','Två led ska visas: personen insåg risken för följden eller omständigheten och var likgiltig inför att den faktiskt förverkligades eller förelåg. Att bara ta en medveten risk räcker inte.',[L(297,305)],'BrB 1:2; HD B 1200-19 p. 22–26',HD],
['medveten-oaktsamhet','Medveten oaktsamhet','Personen inser risken men är inte likgiltig inför att den förverkligas. Bedöm vad personen faktiskt uppfattade och varför handlandet ändå var oaktsamt. En insedd risk bevisar inte ensam uppsåt.',[L(118,120),L(297,301)],'BrB 1:2; HD B 1200-19 p. 22–26',HD],
['omedveten-oaktsamhet','Omedveten oaktsamhet','Personen insåg inte risken. Fråga vad personen kunde ha gjort för att upptäcka den och om det också kunde begäras att personen gjorde detta. Ansvar kräver att den aktuella bestämmelsen straffbelägger oaktsamhet.',[L(118,120),L(1999,2001)],'BrB 1:2; HD B 402-22',AG],
['tackning','Täckningsprincipen','Uppsåtet ska som huvudregel täcka de objektiva rekvisitens faktiska innehåll. Personen behöver inte känna till brottsrubriceringen eller dela domstolens juridiska värdering. Särskilt föreskrivna oaktsamhetskrav och andra undantag prövas separat.',[L(310,335)],'BrB 1:2'],
['overskjutande','Överskjutande uppsåt','Ett särskilt krav på syfte eller uppsåt som går utöver vad som redan måste ha inträffat. Vid stöld ska tillägnelseuppsåtet finnas vid tillgreppet; det avsedda slutliga tillägnandet behöver då inte vara genomfört.',[L(126,127),L(2115,2117),J(29,29)],'BrB 8:1 och 23:7'],
['varde-rekvisit','Värderingsrekvisit','Krav som fordrar en rättslig värdering, exempelvis otillbörlig eller hänsynslös. Utred de faktiska omständigheter som värderingen bygger på. Gärningspersonen behöver inte själv använda samma juridiska beteckning.',[L(333,335)],'BrB 1:2; respektive straffbestämmelse'],
['orsak','Orsakssamband','När brottet kräver en följd ska gärningen ha orsakat den. Att handlingen och skadan inträffat nära varandra i tid räcker inte. Bedöm även alternativa skadeorsaker och om just den straffrättsligt relevanta gärningen bidrog till följden.',[L(232,237)],'Exempelvis BrB 3:5, 3:7–8'],
['effekt','Effektrekvisit','Ett krav på en faktisk följd. Misshandel kan exempelvis fullbordas genom smärta utan synlig skada. Vållande till kroppsskada kräver däremot kroppsskada eller sjukdom som inte är ringa; enbart smärta räcker inte där.',[L(97,100),L(1312,1332)],'BrB 3:5 och 3:8'],
['konkret-fara','Konkret fara','En verklig risk i den aktuella situationen för den följd som lagrummet anger. Skadan behöver inte inträffa. Det krävs både en möjlighet till följden och en tillräcklig risk, bedömd utifrån de faktiska omständigheterna.',[L(205,216)],'Exempelvis BrB 3:9'],
['abstrakt-fara','Abstrakt fara / ägnad att','Bedöm om gärningen typiskt sett har den förmåga som lagen beskriver. Det är inte automatiskt ett krav på att en viss person faktiskt blivit rädd eller skadad. Uttrycket är ett objektivt krav, inte ett särskilt avsiktskrav.',[L(218,219),L(1641,1665)],'Exempelvis BrB 4:5 och 4:7'],
['underlatenhet','Underlåtenhet','Att avstå från en handling. Ibland straffbelägger lagen uttryckligen detta; annars krävs att straffbudet kan omfatta underlåtenheten och ofta en särskild skyldighet att ingripa. Vid bedrägeri och rån kan ordet i stället avse vad offret förmås att avstå från.',[L(161,200)],'BrB 9:1, 15:1 och 23:6; respektive straffbud'],
['garant','Garantställning','En särskild skyldighet att skydda någon eller kontrollera en farokälla kan göra en underlåtenhet straffrättsligt relevant. Pröva skyldighetens grund, faktisk möjlighet att handla, orsakssamband och skuldform. Ett yrke eller en relation avgör inte ensamt alla dessa frågor.',[L(190,199)],'Respektive straffbud; underlåtenhetsansvar utvecklas i praxis'],
['skyddsgarant','Skyddsgarant','En person med särskild skyldighet att skydda någon mot fara, exempelvis en vårdnadshavare i förhållande till sitt barn. Omfattningen beror på den konkreta skyldigheten och situationen; inte varje olycka medför straffansvar.',[L(194,199)],'Respektive straffbud och skyddsskyldighet'],
['overvakningsgarant','Övervakningsgarant','En person med särskilt ansvar för en farokälla, exempelvis inom en arbetsuppgift. Utred vem som faktiskt hade kontroll och skyldighet att ingripa samt vilka åtgärder som varit möjliga.',[L(194,199)],'Respektive straffbud och kontrollskyldighet'],
['besittning','Besittning','Faktisk rådighet över en sak, direkt eller indirekt. Ägaren och besittaren kan vara olika personer. Utred vem som hade kontroll före och efter gärningen; ägaruppgiften ensam avgör inte om ett tillgrepp har skett.',[L(2060,2077)],'BrB 8:1 och 8:8'],
['sambesittning','Sambesittning','Flera personer kan samtidigt ha besittning till samma sak. Om en av dem utestänger den andre kan en besittningsrubbning uppkomma. Sambesittning är inte samma sak som att flera äger föremålet.',[L(2072,2075)],'BrB 8:1 och 8:8'],
['tillhor-annan','Tillhör annan','Kravet avser äganderätten, inte bara vem som höll i saken. Även en samägd sak kan i relevant del tillhöra någon annan. Att olovligen återta sin egen sak kan aktualisera andra brott än stöld.',[L(2109,2114)],'BrB 8:1'],
['tillagnelse','Tillägnelseuppsåt','Uppsåt att tillgodogöra sig saken som sin egen eller för någon annan. Det ska finnas vid tillgreppet. En plan att endast tillfälligt använda saken kan leda till en annan rubricering och behöver skiljas från ett tillägnande.',[L(2115,2119),L(2233,2239)],'BrB 8:1, 8:7 och 23:7'],
['skada','Ekonomisk skada','En förmögenhetsmässig nackdel enligt det aktuella brottets skadekrav. Skilj sakens ekonomiska betydelse från affektionsvärde och från fristående följdkostnader. Olika förmögenhetsbrott har olika konstruktioner; en ersättningskostnad avgör inte ensam rubriceringen.',[L(2120,2127),L(2281,2287)],'BrB 8:1 och 9:1'],
['fullbordan','Fullbordanspunkt','Den tidpunkt då brottets samtliga fullbordanskrav är uppfyllda. Vid butikstillgrepp är sista betalningsmöjligheten en praktisk utgångspunkt, men butikens utformning och det konkreta besittningsförloppet måste bedömas.',[L(2078,2085)],'BrB 8:1; skilj från försök enligt 23:1'],
['besittningsrubbning','Besittningsrubbning','Att ingripa i någon annans faktiska rådighet, exempelvis genom att stänga ute personen från saken. Vid egenmäktigt förfarande finns olika gärningsalternativ; skada eller olägenhet krävs särskilt för alternativet rubbning utan tillgrepp.',[L(2254,2272)],'BrB 8:8'],
['sjalm-ratt','Att själv ta sig rätt','Vid självtäkt vidtas en sådan åtgärd som omfattas av egenmäktigt förfarande i syfte att själv genomdriva en påstådd rätt. Att ha ett berättigat anspråk innebär inte att varje metod för återtagande är tillåten.',[L(2254,2272)],'BrB 8:8–9'],
['rantvang','Råntvång','Våld på person eller hot som innebär, eller för den hotade framstår som, trängande fara. Tvånget ska knytas till något av rånets gärningsalternativ. Varje hot eller motstånd i anslutning till ett tillgrepp blir inte automatiskt rån.',[L(2152,2225),B(273,280)],'BrB 8:5'],
['motvarnsran','Motvärnsrån','Den som begått stöld eller olovligen tagit ett betalningsverktyg kan dömas för rån om personen på bar gärning använder sådant våld eller hot som lagen anger mot någon som vill återta det tillgripna. Tidssamband, återtagandesyfte och tvångets styrka ska bedömas.',[L(2152,2225),B(273,275)],'BrB 8:5'],
['vilseledande','Vilseledande','Att framkalla, förstärka eller vidmakthålla en felaktig föreställning hos en person. Vid personbedrägeri ska den felaktiga föreställningen ha orsakat dispositionen. En lögn utan sådan påverkan räcker inte för fullbordat bedrägeri.',[L(2274,2293),B(299,301)],'BrB 9:1 första stycket'],
['disposition','Disposition vid förmögenhetsbrott','En handling eller underlåtenhet som påverkar förmögenheten. Vid bedrägeri ska den orsakas av vilseledandet, vid utpressning av det olaga tvånget. Utred konkret vad personen gjorde eller avstod från och varför.',[L(2288,2293),L(2351,2359)],'BrB 9:1 och 9:4'],
['vinning-skada','Vinning och skada','Vid bedrägeri och utpressning ska den aktuella dispositionen innebära både relevant vinning och skada. Värdera båda leden; enbart obehag eller enbart en fördel räcker inte. Vinningsbestämmelsen i 23:7 kan även omfatta vinning för annan.',[L(2288,2293),L(2351,2359)],'BrB 9:1, 9:4 och 23:7'],
['automatbedrageri','Automatbedrägeri','Det särskilda alternativet i bedrägeribestämmelsen gäller olovlig påverkan på automatisk informationsbehandling eller en liknande process, med vinning och skada. Någon människa behöver inte vilseledas, men processpåverkan och förmögenhetsföljderna måste visas.',[L(2303,2316),B(299,302)],'BrB 9:1 andra stycket'],
['forbrott','Förbrott vid häleri','Den föregående brottslighet som egendomen eller förvärvet härrör från. Häleribestämmelsen har flera gärningsalternativ med olika krav. Skilj bland annat faktiskt brottsligt frånhänd egendom från yrkesmässiga mottagandefall med särskilt angivet misstankekrav.',[B(318,323)],'BrB 9:6'],
['aterstallande','Ägnat att försvåra återställande','Befattningen ska ha sådan förmåga som häleribestämmelsen kräver. Det behöver inte visas att ägaren definitivt förlorat saken. Utred exempelvis mottagande, förvaring eller vidareförsäljning och vilket lagalternativ som åberopas.',[B(318,323)],'BrB 9:6'],
['anförtrodd','Anförtrodd egendom','Förskingring utgår från att personen redan fått egendom i besittning för någon annans räkning och med skyldighet att lämna ut eller redovisa den. Detta skiljer brottet från att först olovligen ta saken ur annans besittning.',[B(328,331)],'BrB 10:1'],
['fortroende','Förtroendeställning','Vid trolöshet mot huvudman krävs en anförtrodd ekonomisk eller kvalificerad teknisk uppgift och ett missbruk som skadar huvudmannen. Lagen omfattar även rättsliga uppdrag där missbruket är till förfång för huvudmannen. Enbart anställning eller allmänt förtroende räcker inte.',[L(2037,2043)],'BrB 10:5'],
['men-ratt','Till men för annans rätt','Vid skadegörelse ska förstörandet eller skadan innebära nackdel för någon annans rätt till egendomen. Vem som äger saken och vilka andra rättigheter som finns kan därför ha betydelse; enbart en fysisk förändring avgör inte frågan.',[B(341,348)],'BrB 12:1'],
['urkund','Urkund','Lagens definition omfattar vissa handlingar, elektroniska handlingar och bevismärken. Pröva bevisbetydelse, utställarangivelse och det original- eller tillförlitlighetskrav som gäller för respektive kategori. Alla skärmbilder eller kopior är inte automatiskt urkunder.',[B(357,375)],'BrB 14:1'],
['utstallare','Utställarangivelse','Det ska framgå vem som står bakom handlingen som utställare. Det är inte nödvändigtvis den som fysiskt skrev texten. För elektroniska handlingar gäller lagens särskilda krav på tillförlitlig kontroll.',[B(370,374)],'BrB 14:1'],
['original','Originalkaraktär','För de urkundskategorier där originalkaraktär krävs ska handlingen framstå som ett original med egen bevisfunktion. Elektroniska handlingar prövas enligt sin särskilda definition. En kopia eller bild ska därför inte bedömas enbart efter sitt utseende.',[B(358,374)],'BrB 14:1'],
['falsk-osann','Falsk eller osann urkund','Falsk avser främst att handlingen inte härrör från den utställare den ger sken av, eller har ändrats obehörigen. Osann avser innehållet. En äkta handling med felaktiga uppgifter är därför inte automatiskt en urkundsförfalskning.',[B(378,408)],'BrB 14:1 och 15:11–12'],
['bevisfara','Fara i bevishänseende','En risk för att det falska, osanna eller missbrukade får betydelse som bevis på det sätt den aktuella bestämmelsen avser. Fullbordat brott kräver inte att någon faktiskt lurats eller lidit ekonomisk skada. Föremålets kvalitet och användningssammanhang kan vara viktiga.',[B(378,380),B(405,408)],'BrB 14:1, 14:8 och 15:12'],
['kontrollmarke','Kontrollmärke','Ett sådant offentligt eller för allmänheten avsett märke som lagen tar sikte på, exempelvis vissa fordonsmärken. Märkesförfalskning gäller inte vanliga klädlogotyper bara för att de kallas märken. Föremålets rättsliga funktion och faran i bevishänseende ska prövas.',[B(387,389)],'BrB 14:8'],
['sanningsplikt','Ed och sanningsplikt','Mened förutsätter att personen avlagt en ed som är föreskriven i lag och lämnar osann uppgift eller förtiger sanningen. Det är inte begränsat till huvudförhandling: även ett annat lagenligt edsförhör kan omfattas. Undantagen i 15:4 ska prövas.',[B(396,403)],'BrB 15:1 och 15:4'],
['akta-id','Äkta handling som används för fel person','Vid missbruk av urkund kan en äkta identitetshandling åberopas som gällande för någon annan än innehavaren. Skilj detta från att själva handlingen är falsk. Även utlämnande för missbruk kan omfattas när lagens krav, inklusive bevisfara, är uppfyllda.',[B(405,408)],'BrB 15:12'],
['grovhet','Kvalifikationsgrund och helhetsbedömning','En omständighet som lagen anger ska beaktas särskilt vid val av brottsgrad. Förekomsten av en sådan omständighet innebär inte alltid automatiskt grovt brott. Pröva grundbrottets rekvisit och värdera gärningen som helhet.',[L(2138,2143),B(278,281)],'Respektive graderingsbestämmelse'],
['frivillighet','Frivilligt deltagande','Deltagandet i den sexuella handlingen bedöms utifrån hela situationen och hur frivilligheten kommit till uttryck. Vissa i lagen angivna omständigheter utesluter frivillighet. Frånvaro av fysiskt motstånd visar inte i sig frivillighet.',[L(1666,1737)],'BrB 6:1'],
['alder-oaktsamhet','Oaktsamhet beträffande ålder','Vissa sexualbrott har ett särskilt oaktsamhetsansvar för att barnet är under en viss ålder. Det ersätter inte uppsåtskraven för gärningen i övrigt. Utred vilken åldersgräns som gäller och vad personen kunde och borde ha gjort för att upptäcka risken.',[L(1994,2008)],'BrB 6:13; HD B 402-22',AG],
['angivelse','Angivelse till åtal','Målsägandens uttryckta vilja att brottet ska åtalas när lagen kräver angivelse. En anmälan och en angivelse är inte alltid samma sak. Kontrollera det aktuella brottets regel, närståendekrets och alternativet påkallat från allmän synpunkt.',[B(291,308)],'Exempelvis BrB 8:13 och 9:12'],
['atavgransning','Åtalsvillkor och brottsrekvisit','Ett särskilt åtalsvillkor reglerar när åklagaren får föra talan. Det är en annan fråga än om gärningen uppfyller brottsrekvisiten. Skilj därför ett straffbart brott med åtalsbegränsning från en gärning som inte är kriminaliserad.',[B(291,308)],'Respektive åtalsbestämmelse'],
['forsokspunkt','Försökspunkt','Utförandet av ett visst brott ska ha påbörjats; en plan eller avsikt ensam räcker inte. Brottet ska inte vara fullbordat, särskild försökskriminalisering ska finnas och de övriga kraven i 23:1 ska vara uppfyllda.',[L(889,905)],'BrB 23:1 och särskild förstadiebestämmelse'],
['medverkan','Främjande med råd eller dåd','Medverkan kan bestå av psykiskt eller fysiskt främjande av en straffbelagd gärning. Varje persons handlande och skuld ska prövas individuellt. Enbart närvaro eller anknytning till gärningspersonen räcker inte automatiskt.',[L(1031,1094)],'BrB 23:4'],
['ansvarsfrihet','Ansvarsfrihetsgrund','En gärning som i övrigt motsvarar brottsbeskrivningen kan vara tillåten, exempelvis på grund av nödvärn eller nöd. Varje grund har egna villkor och gränser. Pröva dem separat från om de objektiva och subjektiva rekvisiten är uppfyllda.',[L(496,554)],'BrB 24 kap.'],
['putativ','Putativ situation','Personen misstar sig om faktiska omständigheter som, om de varit verkliga, kunnat ge rätt att handla exempelvis i nödvärn. Skilj en sådan faktisk villfarelse från att personen känner till händelsen men missförstår vad lagen tillåter.',[L(611,613)],'BrB 1:2, 24:1 och 24:9; praxis'],
['nodvarn','Nödvärn','Pröva först om någon av nödvärnssituationerna i 24:1 föreligger. Därefter bedöms om försvarshandlingen är uppenbart oförsvarlig med hänsyn till angreppet, det angripnas betydelse och omständigheterna i övrigt. Rätten upphör när angreppssituationen upphör.',[L(555,610)],'BrB 24:1'],
['nod','Nöd','Fara hotar liv, hälsa, egendom eller annat viktigt rättsligt skyddat intresse. Nödhandlingen är otillåten om den är oförsvarlig vid lagens avvägning. Kravet är alltså inte samma som nödvärnets uppenbart oförsvarlig.',[L(634,653)],'BrB 24:4'],
['excess','Excess','Den som går längre än vad som är tillåtet i vissa försvarssituationer kan ändå slippa ansvar om personen svårligen kunde besinna sig. Bedöm bland annat faran och tiden för övervägande. Rädsla eller ilska medför inte automatiskt ansvarsfrihet.',[L(708,723)],'BrB 24:6']
];
const concepts={};for(const [id,title,text,courseSources,lawRef,sourceURL] of entries){
 if(concepts[id])throw Error('Duplicate requisite concept '+id);
 concepts[id]={id:'bk:'+id,senseId:'bk:'+id+':criminal-law',title,text,courseSources,lawRef,sourceURL:sourceURL||S,checked:'2026-10-20',type:'Pedagogisk begreppsförklaring'};
}
// Reuse canonical meanings for existing glossary keys. Preserve the existing
// key set and all statute-specific overrides: no new global word matching.
const norm=s=>s.normalize('NFC').toLocaleLowerCase('sv');
const aliases={'täckningsprincipen':'tackning','tillägnelseuppsåt':'tillagnelse','abstrakt fara':'abstrakt-fara','ägnat att':'abstrakt-fara','kausalitet':'orsak','fara i bevishänseende':'bevisfara','utställarangivelse':'utstallare','originalkaraktär':'original','ekonomisk skada':'skada','kvalifikationsgrund':'grovhet'};
let sharedGlossaryMeanings=0;
for(const key of Object.keys(D.glossary||{})){
 const id=aliases[norm(key)]||Object.keys(concepts).find(id=>norm(concepts[id].title)===norm(key));
 if(!id)continue;const c=concepts[id];
 c.source=c.lawRef+'; '+c.courseSources.map(s=>s.file.normalize('NFC')+' '+(s.pages?'s. ':'stycke ')+(s.pages||s.paragraphs).join('–')).join('; ');
 D.glossary[key]=c;sharedGlossaryMeanings++;
}
// Explicit statute maps prevent ambiguous words from crossing between offences.
const maps=[
['3:1 3:2 3:3',['effekt','orsak','tackning','garant','skyddsgarant','ansvarsfrihet','avsikt','insikt','likgiltighet']],
['3:5 3:6',['effekt','orsak','tackning','grovhet','nodvarn','nod','excess','putativ','medverkan']],
['3:7 3:8',['effekt','orsak','medveten-oaktsamhet','omedveten-oaktsamhet','garant']],
['3:9',['konkret-fara','medveten-oaktsamhet','grovhet']],
['3:10',['garant','overvakningsgarant','orsak']],
['4:5 4:7',['abstrakt-fara','tackning','grovhet']],
['4:6 4:6a 4:6b 4:6c',['objektiva','subjektiva','tackning']],
['4:1 4:1a 4:1b 4:2 4:4',['objektiva','tackning','orsak']],
['6:1 6:2',['frivillighet','tackning','likgiltighet']],
['6:1a 6:3',['frivillighet','medveten-oaktsamhet','omedveten-oaktsamhet']],
['6:4 6:5 6:6 6:8 6:9 6:10 6:10a',['alder-oaktsamhet','tackning']],
['8:1 8:2 8:4 8:4a',['besittning','tillhor-annan','tillagnelse','overskjutande','skada','fullbordan','forsokspunkt','grovhet']],
['8:5 8:6',['rantvang','motvarnsran','disposition','vinning-skada','grovhet']],
['8:7',['besittning','tillagnelse','tackning']],
['8:8',['besittning','sambesittning','besittningsrubbning']],
['8:9',['sjalm-ratt','besittningsrubbning']],
['9:1 9:2 9:3',['vilseledande','disposition','vinning-skada','automatbedrageri','grovhet']],
['9:4',['disposition','vinning-skada','rantvang']],
['9:6 9:7',['forbrott','aterstallande','tackning']],
['9:8',['vilseledande','disposition','skada']],
['10:1 10:2 10:3',['anförtrodd','tillagnelse','vinning-skada']],
['10:4',['besittning','tillhor-annan','tackning']],
['10:5',['fortroende','skada','grovhet']],
['12:1 12:2 12:3',['men-ratt','effekt','orsak','grovhet']],
['13:1 13:2 13:3',['konkret-fara','orsak','grovhet']],
['13:10',['underlatenhet','garant']],
['14:1 14:2 14:3',['urkund','utstallare','original','falsk-osann','bevisfara']],
['14:8',['kontrollmarke','bevisfara']],
['14:10',['falsk-osann','bevisfara']],
['15:1 15:2 15:3',['sanningsplikt','underlatenhet','tackning']],
['15:11',['urkund','falsk-osann','bevisfara']],
['15:12',['akta-id','urkund','bevisfara']],
['17:1 17:2 17:3 17:4',['objektiva','tackning','grovhet']]
];
const byStatute={};for(const [refs,ids] of maps)for(const r of refs.split(' '))byStatute['BrB:'+r]=ids;
let cards=0,links=0;for(const c of D.crimes){
 if(c.stageType||!c.rekvisit15)continue;
 const ids=[...new Set([...(byStatute[c.statute]||[]),'rekvisit','objektiva','subjektiva','tackning','beviskrav'])];
 if(c.prosecution==='conditional')ids.push('angivelse','atavgransning');
 if(byStatute[c.statute]?.includes('grovhet'))ids.push('varde-rekvisit');
 c.requisiteConcepts15=ids.map(id=>({conceptId:'bk:'+id,senseId:concepts[id].senseId,displayTerm:concepts[id].title}));cards++;links+=ids.length;
}
window.BK_REQUISITE_CONCEPTS15=Object.fromEntries(Object.values(concepts).map(c=>[c.id,c]));
window.BK_REQUISITE_CONCEPT_REPORT15={concepts:entries.length,cards,links,checked:'2026-10-20',fullLegalApprovals:0,sharedGlossaryMeanings};
})();
