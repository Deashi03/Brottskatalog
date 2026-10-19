/* BrB 4 independent current-law objective and subjective control.
 * Thirty-eight expressly listed offence variants are checked against their
 * current individual statutes and statutory fault form. Historical law,
 * qualified grades, exceptions, doctrine, charges, advanced stages and
 * coercive police powers never become automatically certified.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=t=>String(t||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const refs={
 '4:1':{need:['bemäktigar sig och för bort','spärrar in','uppsåt att skada','mindre grovt'],
 obj:'Människorov omfattar bemäktigande och bortförande eller inspärrning av någon med särskilt syfte att skada liv/hälsa, framtvinga tjänst eller utöva utpressning. Även en mindre grov brottsgrad regleras uttryckligen, men syftesrekvisitet faller inte bort.',
 fault:'För människorov krävs utöver uppsåt till bemäktigandet eller inspärrningen ett uttryckligt SYFTE att skada, tvinga till tjänst eller utöva utpressning. Olovligt frihetsberövande utan detta kvalificerade syfte bedöms separat.'},
 '4:1a':{need:['genom','olaga tvång','vilseledande','rekryterar, transporterar','person som inte har fyllt arton år'],
 obj:'Människohandel har skilda alternativ för rekrytering, transport, överföring, inhysning eller mottagande, med otillbörligt medel och särskilt exploateringssyfte. För barn under 18 behöver det otillbörliga medlet inte föreligga enligt den uttryckliga barnregeln.',
 fault:'Gärningspersonen ska ha exploateringssyftet och uppsåt till övriga relevanta gärningsförhållanden. Särskild regel ger OAKTSAMHETSANSVAR beträffande den minderåriges ålder, som inte får förväxlas med uppsåt till exploateringssyftet.'},
 '4:1b':{need:['människoexploatering','tvångsarbete','tiggeri','inte har fyllt arton år','grovt'],
 obj:'Människoexploatering omfattar utnyttjande genom tvång, vilseledande eller beroende-/skyddslöshet för tvångsarbete, arbete under uppenbart orimliga villkor eller tiggeri. Barnvarianten gäller utan kravet på otillbörligt medel och en grov grad har egna försvårande faktorer.',
 fault:'Uppsåt till exploateringen krävs, men vid barnvarianten finns en uttrycklig regel om OAKTSAMHET i fråga om personens ålder. Grovheten ska bedömas separat efter de omständigheter som gör exploateringen särskilt allvarlig.'},
 '4:2':{need:['för bort eller spärrar in','på annat sätt berövar','mindre grovt'],
 obj:'Olaga frihetsberövande innebär att någon förs bort, spärras in eller på annat sätt berövas friheten utanför 4:1 och 4:1 a. Paragrafen har ett mindre grovt alternativ men ingen ny särskild grov frihetsberövandegrad med den rubriceringen.',
 fault:'Uppsåt enligt 1:2 till det olovliga frihetsberövandet och relevanta faktiska förhållanden krävs. Det särskilda syftet i människorov fordras inte för 4:2 men förutsättningarna för rättsenlig frihetsinskränkning måste granskas separat.'},
 '4:3':{need:['barn som är närstående','brottslig gärning','bevittnats','barnfridsbrott'],
 obj:'Barnfridsbrott kräver en särskilt i 4:3 uppräknad grundgärning mot närstående eller tidigare närstående som ett barn är närstående till, att barnet bevittnar den brottsliga gärningen samt att gärningspersonen och den som brottet riktats mot båda har den i paragrafen angivna närståenderelationen till barnet. Ringa och grov grad kräver egen prövning.',
 fault:'Uppsåt enligt 1:2 till den straffbara gärningen och barnfridsbrottets relevanta faktiska omständigheter; att barnet faktiskt bevittnat brottet är ett självständigt rekvisit och får inte utläsas endast av att barnet befann sig i bostaden.'},
 '4:4':{need:['genom misshandel eller annars med våld','hot om brottslig gärning','tvingar någon att göra, tåla eller underlåta','grovt olaga tvång'],
 obj:'Olaga tvång kräver våld, misshandel eller hot om brottslig gärning som faktiskt tvingar någon att göra, tåla eller underlåta något. Hot om att åtala, ange någon för brott eller lämna menligt meddelande har särskilt otillbörlighetskrav; grovhetsgrunderna prövas separat.',
 fault:'Uppsåt krävs till tvångsmedlet och dess framtvingade effekt. För hot om angivelse eller menligt meddelande måste dessutom särskild otillbörlighet enligt 4:4 första stycket prövas, inte automatiskt antas av att ett sådant hot framförs.'},
 '4:4b':{need:['förföljer en person','upprepad kränkning','var och en av gärningarna har utgjort led'],
 obj:'Olaga förföljelse kräver upprepade straffbelagda gärningar eller medverkan till gärningar av en uttömmande uppräknad brottstyp. Varje enskild gärning ska vara ett led i en upprepad kränkning av målsägandens integritet; enstaka olämpligt beteende utan uppräknat brott räcker inte.',
 fault:'Uppsåt till de bakomliggande brottsliga gärningarna och relevanta omständigheter för det upprepade integritetsangreppet krävs. Det särskilda aggregationsrekvisitet får inte ersättas med enbart antagande om en konflikt eller ett stort antal kontakter.'},
 '4:4c':{need:['äktenskapstvång','barnäktenskapsbrott','olaga tvång','äktenskapsliknande förbindelse'],
 obj:'Äktenskapstvång innebär att genom olaga tvång, utnyttjad utsatt belägenhet eller vilseledande förmå någon att ingå lagens giltiga äktenskap eller äktenskapsliknande förbindelse. Barnäktenskapsbrott har särskild barnregel och får inte felaktigt likställas med enbart tvångsvillkoret för vuxen.',
 fault:'Uppsåt till den tvångs- eller förmåendegärning som äktenskapstvång reglerar krävs. Barnäktenskapsregeln innehåller särskilda förutsättningar knutna till ålder, och varje ålders- eller subjektivt särskilt rekvisit måste kontrolleras individuellt.'},
 '4:4d':{need:['förmår en person att resa till en annan stat','i syfte att personen ska utsättas','äktenskapsresebrott mot barn'],
 obj:'Äktenskapsresebrott är att genom angivna otillbörliga medel förmå någon att resa till annan stat i syfte att utsättas för tvångsäktenskap. Barnvarianten omfattar fler förmåendemetoder eller att tillåta ett barns resa; de geografiska och särskilda förutsättningarna består.',
 fault:'Gärningen har uttryckligt SYFTE att utsätta den resande för 4:4 c-brott. Barnresevarianten omfattar särskilda skuld- och åldersförhållanden enligt paragrafen; att ett barn reser utomlands är inte i sig tillräckligt.'},
 '4:4f':{need:['undersöker någon annans kvinnliga könsorgan','i syfte att','vaginalt samlag','om gärningen är ringa'],
 obj:'Oskuldskontroll innebär undersökning av en annan persons kvinnliga könsorgan för att bedöma om personen haft vaginalt samlag eller jämförbar penetration. Syftet med undersökningen är ett eget uttryckligt rekvisit; en ringa gärning utgör enligt lagtexten inte brott.',
 fault:'Det krävs uttryckligt SYFTE att bedöma så kallad sexuell oskuld genom undersökningen, utöver uppsåt till den faktiska undersökningsgärningen. En medicinskt indicerad undersökning med annat syfte träffas inte automatiskt.'},
 '4:4g':{need:['skriftligen eller muntligen','kvinnliga könsorganets beskaffenhet','intygar','om gärningen är ringa'],
 obj:'Intygande av sexuell oskuld avser skriftligt eller muntligt intygande med hänvisning till det kvinnliga könsorganets beskaffenhet att någon haft eller inte haft angivna penetrerande sexuella handlingar. Ringa gärningar är uttryckligen undantagna från straffansvar.',
 fault:'Uppsåt till intygandehandlingen och dess faktiska anknytning till kroppslig beskaffenhet krävs enligt 1:2. Ett vanligt samtal utan sådant särskilt intygande eller hänvisning räcker inte.'},
 '4:5':{need:['hotar någon annan med brottslig gärning','ägnat att hos den hotade framkalla allvarlig rädsla','grovt olaga hot'],
 obj:'Olaga hot förutsätter hot om brottslig gärning som är ägnat att framkalla ALLVARLIG rädsla för egen eller annans person, egendom, frihet eller frid. Grovhetsgrad har särskilt förstärkt hot med vapen, sprängmedel eller våldskapital eller annars särskilt hänsynslös/farlig art.',
 fault:'Uppsåt till att framföra hotet och dess faktiska innebörd och mottagarkontext krävs. Brottet förutsätter att hotet objektivt är ägnat att framkalla allvarlig rädsla, inte nödvändigtvis att målsäganden faktiskt blivit livrädd.'},
 '4:6':{need:['olovligen tränger in eller stannar kvar','hemfridsbrott','olaga intrång','brott som avses i första eller andra stycket är grovt'],
 obj:'Hemfridsbrott gäller olovligt intrång eller kvarstannande i bostad eller liknande boende, inklusive särskild bostadsanknuten tomt eller trädgård. Olaga intrång gäller vissa andra byggnader, fartyg eller inhägnade/liknande platser. Grova grader prövas var för sig från grundalternativet.',
 fault:'Uppsåt till inträngande eller kvarstannande och de faktiska förhållanden som gör det olovligt eller obehörigt krävs. En allmän rätt till offentlig plats eller annans bostad får inte antas; platsens skyddsstatus är avgörande.'},
 '4:6a':{need:['med tekniskt hjälpmedel i hemlighet tar upp bild','inomhus i en bostad','försvarlig','myndighets verksamhet'],
 obj:'Kränkande fotografering förutsätter hemlig bildupptagning med tekniskt hjälpmedel på särskilt skyddade platser: inomhus i bostad, toalett, omklädningsrum eller liknande. Försvarlighetsundantag och uttryckligt undantag för vissa myndighetsåtgärder måste prövas.',
 fault:'Uppsåt till den hemliga tekniska bildupptagningen och platsens faktiska karaktär krävs enligt 1:2. Fotografering med samtycke eller utanför skyddad plats är inte automatiskt straffbar enligt just detta lagrum.'},
 '4:6b':{need:['olovligen använda en annan persons identitetsuppgifter','utger sig för att vara','skada eller olägenhet'],
 obj:'Olovlig identitetsanvändning kräver att någon olovligen använder annans identitetsuppgifter och utger sig för att vara den personen, vilket orsakar skada eller olägenhet för personen. Både utgivandet och den uppkomna effekten är självständiga rekvisit.',
 fault:'Uppsåt till den obehöriga identitetsanvändningen och den faktiska utgivandehandlingen krävs; skadans eller olägenhetens relevans måste visas individuellt. Att använda uppgifter som råkar likna någon annans är inte automatisk identitetsanvändning.'},
 '4:6c':{need:['intrång i någon annans privatliv genom att sprida','sexualliv','hälsotillstånd','allvarlig skada','försvarlig'],
 obj:'Olaga integritetsintrång avser spridning av särskilt uppräknade privata uppgifter eller bilder om sexualliv, hälsa, brottsutsatthet, utsatt situation eller nakenhet. Spridningen ska vara ägnad att orsaka allvarlig skada och omfattas av ett uttryckligt försvarlighetsundantag.',
 fault:'Uppsåt till den aktuella spridningen och relevant uppgifts- eller bildkategori krävs. Även ett mycket privat foto som inte spridits uppfyller inte denna spridningsgärning, och det straffrättsliga försvarlighetsundantaget är separat.'},
 '4:6d':{need:['brott som avses i 6 c §','grovt olaga integritetsintrång','mycket allvarlig skada'],
 obj:'Grovt olaga integritetsintrång förutsätter fullbordat integritetsintrång enligt 4:6 c. En samlad grovhetsbedömning tar särskild hänsyn till bildens/uppgiftens innehåll, spridningssätt och omfattning och dess förmåga att medföra mycket allvarlig skada.',
 fault:'Uppsåt till den underliggande spridningsgärningen enligt 4:6 c krävs även för grov grad. Att en uppgift är mycket känslig ersätter inte villkoren om spridning, allvarlig integritetsskada och försvarlighetsbedömning.'},
 '4:7':{need:['fysiskt antastar någon annan','störande kontakter','kännbart sätt'],
 obj:'Ofredande omfattar fysiskt antastande, störande kontakter eller annat hänsynslöst agerande som är ägnat att kännbart kränka den utsattes frid. Enbart en upplevelse av irritation utan lagens kvalificerade gärnings- och kränkningsvillkor räcker inte.',
 fault:'Uppsåt till det fysiska antastandet, kontakterna eller hänsynslösa agerandet och relevanta faktiska omständigheter krävs enligt 1:2. Om gärningen objektivt är ägnad att kränka friden ska bedömas separat.'},
 '4:7a':{need:['uppmanar eller på annat liknande sätt utövar psykisk påverkan','inte obetydlig fara','oaktsam uppmaning till självmord'],
 obj:'Uppmaning till självmord kräver särskild psykisk påverkan på annan för att denne ska begå självmord, ägnad att medföra inte obetydlig fara för det. Oaktsam uppmaning avser samma grundgärning med särskild oaktsamhet till faroomständigheterna, och mindre allvarlig gärning är undantagen.',
 fault:'Normalvarianten förutsätter uppsåt till psykisk påverkan och de faroskapande faktiska omständigheterna. För särskild OAKTSAM uppmaning räcker uttrycklig oaktsamhet beträffande den fara som gärningen objektivt är ägnad att medföra.'},
 '4:7b':{need:['upprepat utsätter en annan person för kränkningar','otillbörlig övervakning','allvarligt skada personens självkänsla'],
 obj:'Psykiskt våld kan bestå av upprepade nedsättande uttalanden, förödmjukande beteende, hot, tvång eller övervakning som sammantaget är ägnat att allvarligt skada självkänslan. Även varaktig otillbörlig övervakning har en särskild fristående variant.',
 fault:'Uppsåt till de upprepade kränkande gärningarna eller varaktig otillbörlig övervakning samt relevanta faktiska omständigheter krävs enligt 1:2. En enstaka otrevlig kommentar kan inte direkt uppfylla upprepningskravet.'},
 '4:8':{need:['olovligen bereder sig tillgång till ett meddelande','post- eller telebefordringsföretag'],
 obj:'Brytande av post- eller telehemlighet omfattar obehörig tillgång till meddelande medan det befordras av post- eller telebefordringsföretag som försändelse eller i elektroniskt kommunikationsnät. Tidsmässig befordran måste särskiljas från lagring i avsändarens eller mottagarens egna system.',
 fault:'Uppsåt till den olovliga åtkomsten och de faktiska post- eller telebefordringsförhållandena krävs. En allmän misstanke om att någon sett en skärm räcker inte för detta specialiserade befordringsbrott.'},
 '4:9':{need:['utan att fall är för handen som i 8 § sägs','olovligen bryter brev','förseglat eller under lås'],
 obj:'Intrång i förvar är utanför 4:8 olovlig öppning av brev eller telegram eller åtkomst till något som hålls förseglat, låst eller på annat sätt tillslutet. Bestämmelsen är uttryckligen subsidiär till post- eller telehemlighetsbrottet.',
 fault:'Uppsåt till den olovliga brytningen eller åtkomsten till det särskilt skyddade tillslutna förvaret krävs enligt 1:2. Föremålets konkreta förslutning och den saknade rätten till tillträde måste utredas.'},
 '4:9a':{need:['olovligen medelst tekniskt hjälpmedel','i hemlighet avlyssnar','han själv icke deltager'],
 obj:'Olovlig avlyssning gäller hemlig teknisk avlyssning eller upptagning av enrumstal, samtal mellan andra eller vissa slutna förhandlingar som gärningspersonen inte deltar i eller som denne obehörigen tagit sig in till. Bestämmelsen gäller utanför 4:8.',
 fault:'Uppsåt till den hemliga tekniska avlyssningen och till relevanta faktiska förhållanden att personen saknar rätt att ta del i det skyddade samtalet krävs. Att själv öppet delta i ett samtal är en separat situation.'},
 '4:9b':{need:['anbringar tekniskt hjälpmedel','med uppsåt att bryta telehemlighet','om han eller hon inte gjort sig skyldig till fullbordat brott'],
 obj:'Förberedelse genom anbringande av tekniskt hjälpmedel är ett eget i 4:9 b föreskrivet brott: att placera teknisk utrustning med avsikt att senare bryta post-/telehemlighet eller begå kränkande fotografering eller olovlig avlyssning, om fullbordat brott ännu inte föreligger.',
 fault:'Ett uttryckligt SÄRSKILT UPPÅT att begå någon av de i lagrummet uppräknade efterföljande gärningarna krävs. All installation av teknisk utrustning innebär inte denna särskilt kriminaliserade förberedelsehandling.'},
 '4:9c':{need:['olovligen bereder sig tillgång','automatiserad behandling','utplånar, blockerar','grovt dataintrång'],
 obj:'Dataintrång omfattar olovlig åtkomst, ändring, utplåning, blockering, införande eller jämförbar allvarlig störning av automatiserat behandlade uppgifter. Grov grad bedöms bland annat efter allvarlig skada, många uppgifter eller särskilt farlig art.',
 fault:'Uppsåt till den olovliga uppgiftsåtkomsten eller manipulationsåtgärden och relevanta faktiska förhållanden krävs. En teknisk störning utan otillåten åtkomst eller angiven manipulationsgärning innebär inte automatiskt dataintrång.'}
};
const cases=[
 ['Människorov','4:1'],['Människohandel','4:1a'],['Människoexploatering','4:1b'],['Grov människoexploatering','4:1b'],
 ['Olaga frihetsberövande','4:2'],['Barnfridsbrott','4:3'],['Ringa barnfridsbrott','4:3'],['Grovt barnfridsbrott','4:3'],
 ['Olaga tvång','4:4'],['Grovt olaga tvång','4:4'],['Olaga hot','4:5'],['Grovt olaga hot','4:5'],
 ['Hemfridsbrott','4:6'],['Grovt hemfridsbrott','4:6'],['Olaga intrång','4:6'],['Grovt olaga intrång','4:6'],
 ['Kränkande fotografering','4:6a'],['Olovlig identitetsanvändning','4:6b'],
 ['Olaga integritetsintrång','4:6c'],['Grovt olaga integritetsintrång','4:6d'],
 ['Ofredande','4:7'],['Uppmaning till självmord','4:7a'],['Oaktsam uppmaning till självmord','4:7a'],['Psykiskt våld','4:7b'],
 ['Brytande av post- eller telehemlighet','4:8'],['Intrång i förvar','4:9'],
 ['Olovlig avlyssning','4:9a'],['Förberedelse genom anbringande av tekniskt hjälpmedel','4:9b'],
 ['Dataintrång','4:9c'],['Grovt dataintrång','4:9c'],['Olaga förföljelse','4:4b'],
 ['Äktenskapstvång','4:4c'],['Barnäktenskapsbrott','4:4c'],
 ['Äktenskapsresebrott','4:4d'],['Äktenskapsresebrott mot barn','4:4d'],
 ['Oskuldskontroll','4:4f'],['Intygande av sexuell oskuld','4:4g']
];
const source=(ref,cl)=>{const x=W['BrB:'+ref];return !!(x?.complete===true
 &&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&x.url===SRC&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')
 &&x.text?.length>=90&&cl.need.every(v=>n(x.text).includes(n(v))))};
const general=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:cases.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 checked:'2026-10-20',sourceURL:SRC,fullLegalSignoffs:0,
 historicApplicabilityApproved:0,allExceptionsApproved:0,caseLawApproved:0,
 stagesApproved:0,prosecutionApproved:0,coercionApproved:0};
for(const [title,ref] of cases){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,approved:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'absent/changed base crime or existing legal review'});continue;}
 const q=refs[ref],ready=source(ref,q)&&general&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const extra=/^(Grov |Grovt )/.test(title)?' Grov brottsgrad kräver en självständig helhetsprövning av gradrekvisit och får inte ersätta det bakomliggande grundbrottets rekvisit.':'';
 const notes={objective:q.obj+extra,subjective:q.fault+extra},out={};
 for(const [key,v] of Object.entries(notes)){
  if(ready&&v.length>=115){
   out[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceRefs:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
    finding:v,scope:'current-SFS-particular-act-and-statutory-fault-form-only',
    legalLiabilityForCaseApproved:false,offenceDateReviewed:false,
    allQualifyingConditionsAndSpecialExceptionsReviewed:false,caseLawReviewed:false,
    specialProsecutionReviewed:false,inchoateStageReviewed:false,
    specificCoercivePowerReviewed:false};
   report.completed++;report.byType[key]++;row.approved.push(key);
  }else{row.held.push(key);report.held.push({title,key,reason:'missing primary SFS or structure invariant'});}
 }
 if(row.approved.length)c.legalAudit15={schema:1,sourceAudit:'BrB4-2026-10-20',checkpoints:out,
  fullLegalReviewApproved:false,applicableLegalVersionPending:true,
  relevantCaseLawPending:true,qualifyingConditionsAndExceptionsPending:true,
  prosecutionStageAndCompetitionPending:true,coercionStillBlocked:true};
}
window.BK_BRB4_BASE_AUDIT15=report;
})();