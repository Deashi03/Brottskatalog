/* Twenty-two BrB 13 source-specific offence reviews, 2026-10-20.
 * Each offence separately checks the current wording of its own paragraph
 * and assesses its enumerated objective route and fault classification.
 * NO full historical, case-law, culpability, prosecution or coercion signoff.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const norm=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const anchors={
 '13:1':['anlägger brand','fara för annans liv eller hälsa','omfattande förstörelse av annans egendom'],
 '13:2':['brott som avses i 1 §','anlagts i tättbebyggt samhälle','fara för flera människor'],
 '13:3':['åstadkommer explosion, översvämning','framkallar fara','grov allmänfarlig ödeläggelse'],
 '13:4':['avsevärd betydelse för rikets försvar','allvarligt stör eller hindrar','allmänna samfärdseln'],
 '13:5':['brott som avses i 4 §','fara för rikets säkerhet','flera människoliv'],
 '13:5a':['genom olaga tvång eller olovligen med tekniskt hjälpmedel','sjö- eller luftfartssabotage','brott som avses i första eller andra stycket'],
 '13:5b':['flygplats som är öppen för internationell trafik','ägnad att framkalla fara för flygplatsens funktion','brottet att anse som grovt'],
 '13:5c':['polisverksamhet, räddningstjänst eller ambulanssjukvård','allvarligt försvåra eller hindra','grovt sabotage mot blåljusverksamhet'],
 '13:6':['den som av oaktsamhet','allmänfarlig vårdslöshet','är brottet grovt'],
 '13:7':['framkallar allmän fara för människors liv eller hälsa','sprida gift eller dylikt','överföra eller sprida allvarlig sjukdom','är brottet grovt'],
 '13:8':['framkallar någon allmän fara för djur eller växter','skadedjur eller ogräs','är brottet grovt'],
 '13:9':['av oaktsamhet en gärning som anges i 7 eller 8 §','vårdslöshet med gift eller smittämne'],
 '13:10':['utan att vara förfallen till ansvar','efter att hava kommit till insikt','göra vad skäligen kan begäras']};
const checked=(ref,phrase)=>{const p=W['BrB:'+ref];
 return !!(p?.complete===true&&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')&&p.text?.length>=130
 &&(anchors[ref]||[]).every(x=>norm(p.text).includes(norm(x)))&&norm(p.text).includes(norm(phrase)))};
const general=norm(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const specs=[
 ['Mordbrand','13:1','anlägger brand',['13:1'],
 'Brand anläggs av gärningspersonen och innebär fara för någon annans liv eller hälsa, alternativt för omfattande förstörelse av annans egendom. Själva branden och den konkreta faran är skilda rekvisit; en mindre allvarlig nivå regleras inom 13:1.',
 'Uppsåt till brandanläggningen och relevanta faroförhållanden enligt BrB 1:2 är huvudregeln. Oaktsamhet kring brand eller ofärd regleras separat i 13:6; fara för annans liv eller egendom får inte presumeras enbart av att en eld uppstått.'],
 ['Grov mordbrand','13:2','anlagts i tättbebyggt samhälle',['13:1','13:2'],
 'Det måste först föreligga en mordbrand enligt 13:1. Vid den självständiga grovhetsvärderingen i 13:2 ska särskilt beaktas spridningsrisk vid tät bebyggelse, fara för flera människor eller egendom av särskild betydenhet.',
 'Gärningen ska vara uppsåtlig i fråga om mordbrandens förlopp och dess faktiska faroorsakande. Den grova graden är en samlad rättslig bedömning av omständigheterna och medför inte oaktsamhetsansvar för uppsåtsbrottet.'],
 ['Allmänfarlig ödeläggelse','13:3','åstadkommer explosion',['13:3'],
 'Genom explosion, översvämning, ras, skeppsbrott, flyg- eller tågolycka eller annan jämförbar ofärd orsakas fara för liv eller hälsa eller omfattande förstörelse av annans egendom. Även mindre allvarlig grad är särskilt angiven.',
 'Uppsåt till det ofärdsframkallande förloppet och dess relevanta faroorsakande enligt 1:2 är huvudregel. För enbart oaktsamt vållad ofärd måste de uttryckliga rekvisiten i 13:6 prövas i stället.'],
 ['Grov allmänfarlig ödeläggelse','13:3','grov allmänfarlig ödeläggelse',['13:3'],
 'Ofärd och fara enligt 13:3 krävs även för grov grad. Vid en självständig helhetsbedömning beaktas bland annat fara för flera människor, egendom av särskild betydelse eller annars särskilt farlig eller allvarlig gärning.',
 'Uppsåt till det faroframkallande förloppet krävs enligt 1:2, och de omständigheter som motiverar grovhetsklassificering ska prövas särskilt. Grovhetsrubriceringen är inte en självständig vårdslöshetsvariant.'],
 ['Sabotage','13:4','allvarligt stör eller hindrar',['13:4'],
 'Förstörelse, skadegörelse eller annat angrepp mot egendom av avsevärd betydelse för försvar, försörjning, rättskipning, förvaltning eller allmän ordning kan vara sabotage. Alternativt allvarligt störande av allmänna transport- eller försörjningsfunktioner enligt andra meningen.',
 'Uppsåt till sabotagehandlingen och till dess relevanta funktionsstörande eller skadande omständigheter krävs enligt huvudregeln i 1:2. Endast uteblivet arbete eller uppmaning att avstå från arbete är uttryckligen undantaget i första meningen.'],
 ['Grovt sabotage','13:5','fara för rikets säkerhet',['13:4','13:5'],
 'Först ska ett sabotage enligt 13:4 vara uppfyllt. Bedöm sedan om gärningen är grov, särskilt om den framkallat fara för rikets säkerhet, flera människoliv eller egendom av särskild betydenhet; faktorerna är inte automatisk presumtion.',
 'Uppsåt till gärningen och relevanta faktiska funktions- eller egendomseffekter krävs. Grovhetsfaran enligt 13:5 prövas rättsligt vid rubriceringen och ersätter inte de grundläggande ansvarsrekvisiten.'],
 ['Kapning','13:5a','bemäktigar sig eller ingriper i manövreringen',['13:5a'],
 'Genom olaga tvång eller otillåtet tekniskt hjälpmedel bemäktigar sig gärningspersonen eller ingriper i manövreringen av lagens särskilt angivna luftfartyg, fartyg eller yrkesfordon. För havsplattformar krävs i stället bemäktigande genom olaga tvång.',
 'Uppsåt till bemäktigandet eller manövreringsingreppet och de för respektive fordonskategori särskilda faktiska villkoren enligt 1:2. Tekniskt påverkan av en havsplattform ska inte förväxlas med den separat angivna tvångsvägen.'],
 ['Grov kapning','13:5a','brott som avses i första eller andra stycket',['13:5a'],
 'Kapning enligt 13:5 a första stycket ska föreligga och vara grov. Särskild fara för flera människoliv eller annars särskilt farlig gärning är framhållna omständigheter; andra styckets sjö- eller luftfartssabotage är ett alternativt grundbrott.',
 'Uppsåt till kapningsförloppet och relevanta faktiska omständigheter enligt första stycket krävs. Om gärningen bedöms grov ändrar det inte den särskilda fordons- eller plattformskategorins förutsättningar.'],
 ['Sjö- eller luftfartssabotage','13:5a','förstör eller allvarligt skadar',['13:5a'],
 'Antingen förstörs eller allvarligt skadas ett särskilt skyddat fartyg, en havsplattform eller ett luftfartyg i trafik; eller åtgärd vidtas som är ägnad att framkalla fara för säkerheten hos de uttryckligen uppräknade transportobjekten. Alternativen följer andra stycket.',
 'Uppsåt till den särskilda skade- eller säkerhetsriskgärningen och objektets faktiska typ krävs enligt 1:2. Att ett objekt är ett fartyg räcker inte utan lagens särskilda användnings- eller säkerhetsförutsättningar.'],
 ['Grovt sjö- eller luftfartssabotage','13:5a','fara för flera människoliv',['13:5a'],
 'Sjö- eller luftfartssabotage enligt andra stycket ska föreligga och vara grovt. Bedöm särskilt fara för flera människoliv eller särskilt farlig art; den alternativa grundhandlingen förstöring/allvarlig skada eller säkerhetsfarlig åtgärd består.',
 'Uppsåt till sabotagegärningen och relevanta faktiska objekts- och skadeförhållanden krävs. Att andra styckets handling kvalificeras som grov skapar inte ett nytt oaktsamhetsbrott.'],
 ['Flygplatssabotage','13:5b','flygplats som är öppen för internationell trafik',['13:5b'],
 'Tre alternativa gärningsvägar: allvarligt våld eller hot mot person på internationell flygplats; förstörelse/allvarlig skada på flygplatsanordning eller uppställt flygplan; eller omintetgörande av verksamhet med våld eller hot. Dessutom ska gärningen vara ägnad att framkalla fara för funktion eller säkerhet.',
 'Uppsåt till den valda gärningsvägen och till de faktiska omständigheter som gör den farlig vid internationell flygplats krävs enligt 1:2. En ordinär ordningsstörning utan dessa kvalificerande rekvisit är inte automatiskt sabotage.'],
 ['Grovt flygplatssabotage','13:5b','är brottet att anse som grovt',['13:5b'],
 'Fullbordat flygplatssabotage enligt någon av 13:5 b:s tre alternativa gärningsformer måste vara grovt. Särskilt fara för flera människoliv och särskilt farlig art ska beaktas vid helhetsbedömning.',
 'Uppsåt till den bakomliggande sabotagehandlingen och dess faktiska flygplats- och faregenskaper krävs. Grov rubricering får inte användas som genväg runt lagens krav på internationell trafik och fara för verksamhetens funktion eller säkerhet.'],
 ['Sabotage mot blåljusverksamhet','13:5c','polisverksamhet, räddningstjänst eller ambulanssjukvård',['13:5c'],
 'Handlingen består av våld/hot mot personal eller biträden, tillgrepp/skada av fordon eller hjälpmedel eller annan otillbörlig åtgärd som är ägnad att allvarligt försvåra eller hindra polisens, räddningstjänstens eller ambulanssjukvårdens skyddade verksamhet.',
 'Uppsåt till den valda angreppshandlingen och relevanta verksamhetsförhållanden krävs. Att gärningen är otillbörlig räcker inte om kravet att den är ägnad att allvarligt hindra eller försvåra verksamheten saknas.'],
 ['Grovt sabotage mot blåljusverksamhet','13:5c','grovt sabotage mot blåljusverksamhet',['13:5c'],
 'Grundbrottet mot polis, räddningstjänst eller ambulansverksamhet ska vara grovt. Särskilt våld av allvarligt slag, särskild fara för personer eller egendom eller särskilt farlig eller hänsynslös art vägs in utifrån gradbestämmelsen.',
 'Uppsåt till det konkreta angreppet mot skyddad blåljusverksamhet krävs även för grov grad; den grova faran ska styrkas genom omständigheterna och ersätter inte krav på verksamhetens beskaffenhet.'],
 ['Allmänfarlig vårdslöshet','13:6','den som av oaktsamhet',['13:6'],
 'Genom ovarsamt hanterande av eld/sprängämnen eller annat vårdslöst förfarande vållas brand, ofärd, fara eller de specificerade skade- och hindersituationerna i 13:1–4, 13:5 a andra stycket 1 eller 13:5 b första stycket 2. Skada och fara måste motsvara ett uppräknat alternativ.',
 'Skuldformen är uttryckligen OAKTSAMHET i 13:6. Uppsåt enligt 1:2 är därför inte ensamt den exklusiva skuldformen för detta brott, och objektivt inträffad brand utan relevant oaktsamhet är otillräcklig.'],
 ['Grovt allmänfarlig vårdslöshet','13:6','är brottet grovt',['13:6'],
 'Allmänfarlig vårdslöshet enligt 13:6 ska vara grov efter en självständig helhetsbedömning av den oaktsamma handlingen och dess relevanta faro- eller skadeomständigheter. Inga uppsåtsrekvisit får importeras från mordbrand eller sabotage.',
 'Även för grov grad är skuldformen OAKTSAMHET enligt 13:6. Graden avgörs av samlad straffrättslig värdering av gärning och risk; uttryckligt uppsåt till branden krävs inte.'],
 ['Spridande av gift eller smitta','13:7','förgifta eller infektera livsmedel',['13:7'],
 'Genom att förgifta eller infektera livsmedel, vatten eller annat, sprida gift eller dylikt, eller överföra/sprida allvarlig sjukdom framkallas allmän fara för människors liv eller hälsa. Enbart kontakt med smittämne utan allmänfara fyller inte bestämmelsen.',
 'Huvudregel om UPPÅT till den gift- eller smittspridande gärningen och relevanta faroförhållanden enligt 1:2. Oaktsam handling med motsvarande verkningar prövas i 13:9 i stället för att utan vidare klassificeras enligt 13:7.'],
 ['Grovt spridande av gift eller smitta','13:7','om många människor utsatts för fara',['13:7'],
 'Grundbrottets allmänfara för människor enligt 13:7 ska föreligga. Grovhet bedöms särskilt med hänsyn till uppsåt att skada liv eller hälsa eller att många människor utsatts för fara. Grova graden är inte en ren funktion av antalet exponerade.',
 'Uppsåt till gift- eller smittspridningen enligt grundregeln, och ett särskilt skadeuppsåt kan fungera som kvalifikationsomständighet. Många utsatta är ett alternativt grovhetskriterium; det ersätter inte den uppsåtliga grundgärningen.'],
 ['Förgöring','13:8','framkallar någon allmän fara för djur eller växter',['13:8'],
 'Allmän fara för djur eller växter framkallas genom gift, elakartad sjukdom, skadedjur, ogräs eller jämförbart medel. Det skyddade intresset är allmän fara för djur/växter, skilt från människors hälsa enligt 13:7.',
 'Huvudregeln i 1:2 föreskriver UPPÅT till den faroorsakande gärningen enligt 13:8. Oaktsamhet som uppfyller den uppräknade gärningsformen bedöms enligt den separata 13:9-bestämmelsen.'],
 ['Grov förgöring','13:8','är brottet grovt',['13:8'],
 'Förgöring enligt 13:8 måste vara grov. Särskilt uppsåt att skada eller risk för egendom av betydande värde ska beaktas. En skada med högt värde innebär inte automatiskt att övriga allmänfarerekvisit kan utelämnas.',
 'Huvudregeln är UPPÅT till gärningen och relevanta faktiska förhållanden. Särskilt uppsåt att skada kan vara en grovhetsfaktor; enbart oaktsamt framkallad smittfara måste skiljas från 13:9.'],
 ['Vårdslöshet med gift eller smittämne','13:9','av oaktsamhet en gärning som anges i 7 eller 8 §',['13:7','13:8','13:9'],
 'En gärning av det slag som avses i 13:7 eller 13:8 framkallar relevant allmänfara för människor, djur eller växter, men sker med lagens särskilt angivna oaktsamhetsform. Farotyp och gärningsmedel hämtas från den hänvisade paragrafen.',
 'Gärningen ska vara OAKTSAM enligt 13:9. Det särskilda oaktsamhetsbrottet är åtskilt från de uppsåtliga gift- och smittbrotten; olyckliga resultat utan skuldrekvisit eller relevant allmänfara räcker inte.'],
 ['Underlåtenhet att avvärja allmänfara','13:10','efter att hava kommit till insikt',['13:10'],
 'Gärningspersonen har själv framkallat viss fara genom hantering av eld, sprängämnen, gift eller jämförbart förfarande och fått faktisk insikt om faran, men underlåter vad som skäligen kan krävas för att avvärja den. Personen får inte redan träffas av ansvar enligt föregående bestämmelser.',
 'Personen ska efter faktisk INSİKT om den egna framkallade faran uppsåtligen underlåta det skäliga avvärjandet. Enbart abstrakt möjlighet att upptäcka en fara är inte detsamma som det insiktsrekvisit som anges i 13:10.']
];
const report={planned:specs.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 date:'2026-10-20',sourceURL:SRC,
 finalOffenceApprovals:0,offenceDateApprovals:0,prosecutionApprovals:0,coercionApprovals:0,
 jurisprudenceApprovals:0,stageSignoffs:0};
for(const [title,ref,phrase,dependencies,objective,subjective] of specs){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'Missing/mismatched individual base-card or existing audit'});continue;}
 const ready=checked(ref,phrase)&&dependencies.every(r=>checked(r,anchors[r][0]))
  &&c.lawMode==='full'&&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
  &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const checks={objective:ready,subjective:ready&&general},notes={objective,subjective},completed={};
 for(const [key,yes] of Object.entries(checks)){
  if(yes&&notes[key].length>=110){
   completed[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceRefs:[...new Set(['BrB '+ref,...dependencies.map(d=>'BrB '+d),...(key==='subjective'?['BrB 1:2']:[])])],
    scope:'current-13kap-statutory-element-or-specific-fault-only',
    finding:notes[key],caseSpecificLiabilityApproved:false,
    currentOffenceDateApproved:false,preparatoryWorksAndCaseLawApproved:false,
    competitionAndExceptionsCompleted:false,caseSpecificCustodyApproved:false,
    chargingConditionsCompleted:false,stageLiabilityReviewed:false};
   report.completed++;report.byType[key]++;row.done.push(key);
  }else{report.held.push({title,key,reason:'Primary source or card dependency did not validate'});row.held.push(key);}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB13-2026-10-20',checkpoints:completed,
  fullLegalReviewApproved:false,offenceDatePending:true,
  jurisprudencePending:true,stageAndExceptionsPending:true,
  prosecutionAndCoercionPending:true};
}
window.BK_BRB13_BASE_AUDIT15=report;
})();