/* October 2026: ten independently scoped BrB 9 base-card reviews.
 * Only CURRENT statutory objective alternatives, individual fault/intent
 * and special chapter-9 criminalization enumeration are signed off.
 * Practical application, 9:12 charging, doctrine, historic applicability,
 * penalty and coercion are NOT certified or inferred.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const source=(ref,phrases)=>{const p=W['BrB:'+ref];return !!(p?.complete===true&&p.url===SRC
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&/^2026-10-(17|18|19|20)$/.test(p.checked||'')&&p.text?.length>60
 &&phrases.every(x=>n(p.text).includes(n(x))));};
const ok={
 '9:1':source('9:1',['medelst vilseledande förmår någon','vinning för gärningsmannen och skada','automatisk informationsbehandling']),
 '9:2':source('9:2',['skadans omfattning','oavsett om han eller hon vilseleder någon eller inte','kontant betalning']),
 '9:3':source('9:3',['grovt bedrägeri','missbrukat allmänt förtroende','skyddslösa eller utsatta ställning','organiserad form eller systematiskt','Lag (2026:1318)']),
 '9:4':source('9:4',['genom olaga tvång förmår någon','om inte brottet är att anse som rån eller grovt rån','ringa utpressning','grov utpressning']),
 '9:5':source('9:5',['trångmål, oförstånd, lättsinne eller beroendeställning','uppenbart missförhållande','vid kreditgivning','grovt ocker']),
 '9:8':source('9:8',['i annat fall än förut i detta kapitel','medelst vilseledande','därigenom skadar']),
 '9:10':source('9:10',['för användning såsom påtryckningsmedel vid krav','handling som är falsk','check utan täckning'])
};
const auth=W['BrB:9:11'];
const sourceAuth=Boolean(auth?.complete&&auth?.machine===false&&auth.url===SRC
 &&['2026-10-16','2026-10-17','2026-10-18'].includes(auth.checked)
 &&window.BK_STAGE_SOURCE_REPAIR15?.refs?.includes('BrB:9:11')
 &&['försök eller förberedelse till bedrägeri','ringa utpressning','grovt ocker',
 'stämpling till grovt bedrägeri','stämpling till grov utpressning',
 '23 kap. 3 § ska dock inte gälla','för att bedra försäkringsgivare'].every(x=>n(auth.text).includes(n(x))));
const defaultFault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const specs=[
 {title:'Bedrägeri',ref:'9:1',par:[],positive:'FP',
 obj:'Två alternativa gärningsvägar: medelst vilseledande förmå en människa till en handling/underlåtenhet som innebär vinning och skada; eller olovligen påverka resultatet av automatisk informationsbehandling eller jämförbar process med samma vinning och skada. En vanlig avtalskonflikt räcker inte.',
 subj:'Uppsåt till vilseledande, påverkan, den aktuella dispositionen eller dataprocessen och vinning/skada krävs enligt 1:2. Den tekniska automatiserade vägen kräver inte att en fysisk person vilseleds genom samtal.',
 stage:'BrB 9:11 straffbelägger försök och förberedelse till bedrägeri, men inte stämpling till normalgraden. Paragrafen innehåller dessutom ett särskilt försäkringsbedrägerianknutet förberedelsefall med villkor om frivilligt avstående.'},
 {title:'Ringa bedrägeri',ref:'9:2',par:['9:1'],positive:'',
 obj:'Antingen rekvisiten för bedrägeri enligt 9:1 som vid en samlad prövning är ringa med hänsyn till skadans omfattning och övriga omständigheter, eller särskild snyltning på husrum, förtäring, transport eller liknande kontantbetalningstjänster utan betalning även utan vilseledande. Paragrafens värde- och hänvisningsundantag måste beaktas.',
 subj:'Uppsåt till att utan att göra rätt för sig tillgodogöra sig den kontantbetalda nyttigheten räcker i andra styckets särskilda väg, även om inget aktivt vilseledande förekommit. I den första vägen krävs bedrägeriets uppsåt enligt 9:1.',
 stage:'BrB 9:11 räknar inte upp ringa bedrägeri bland straffbara försök, förberedelser eller stämpling. Straffbarheten kan inte härledas från att normalgraden bedrägeri uttryckligen uppräknas.'},
 {title:'Grovt bedrägeri',ref:'9:3',par:['9:1'],positive:'FPS',
 obj:'En bedrägerigärning enligt något av alternativen i 9:1 ska dessutom vara grov. Särskilt missbruk av allmänt förtroende eller bevismedel, hänsynslöst utnyttjande av utsatt offer, betydande värde eller synnerligen kännbar skada, organiserat eller systematiskt förfarande och särskilt farlig art vägs in var för sig.',
 subj:'Uppsåt till bedrägeriet och de relevanta faktiska omständigheterna enligt 9:1. En juridisk kvalifikation som grov är inte ett särskilt fristående avsiktsrekvisit och oaktsam ekonomisk skada är inte automatiskt bedrägeri.',
 stage:'BrB 9:11 räknar upp försök, förberedelse och stämpling till grovt bedrägeri. Även det uttryckliga särskilda förberedelsefallet genom skada för att bedra försäkringsgivare måste hanteras separat och restriktivt.'},
 {title:'Utpressning',ref:'9:4',par:[],positive:'FP',
 obj:'Olaga tvång ska förmå någon till handling eller underlåtenhet som innebär vinning för gärningspersonen och skada för den tvingade eller någon i dennes ställe. Brottet är subsidiärt till rån och grovt rån; faktiskt ekonomiskt resultat och orsakssamband ska prövas.',
 subj:'Uppsåt krävs till tvångsgärningen, det framtvingade beteendet och omständigheterna för vinning och skada. Att endast uttala ett hot utan att uppnå lagens övriga effekt rekvisit ger inte fullbordad utpressning.',
 stage:'BrB 9:11 straffbelägger försök och förberedelse till utpressning, inte stämpling till normalgraden. I fråga om försök till utpressning gäller uttryckligt undantag från BrB 23:3, vilket måste läsas som en specialregel.'},
 {title:'Ringa utpressning',ref:'9:4',par:[],positive:'FP',
 obj:'Gärningen ska uppfylla de grundläggande rekvisiten för utpressning i 9:4, men i en självständig helhetsbedömning klassificeras som ringa. Kraven på olaga tvång, handling/underlåtenhet, vinning, skada och subsidiaritet till rån består.',
 subj:'Samma krav på uppsåt till tvånget och de relevanta effekterna som för normalgraden. Att utfallet eller beloppet är lägre avskaffar inte kravet på uppsåtlig utpressningsgärning.',
 stage:'BrB 9:11 uppräknar uttryckligen försök och förberedelse till ringa utpressning, till skillnad från ringa bedrägeri. BrB 23:3 är särskilt undantaget vid försök även till ringa utpressning.'},
 {title:'Grov utpressning',ref:'9:4',par:[],positive:'FPS',
 obj:'Grundbrottet enligt 9:4 ska vara grovt efter en samlad bedömning av bland annat allvarligt våld, vapenförstärkt eller annars allvarligt hot inklusive vapenattrapp eller anspelning på våldskapital, eller särskilt hänsynslös eller farlig art. Rånsubsidiariteten måste prövas före rubricering.',
 subj:'Uppsåt till olaga tvång, förmående till disposition och vinning/skada krävs. De grova omständigheterna är rättsliga bedömningsfaktorer, inte en automatisk presumtion om viss avsikt eller om frihetsberövande.',
 stage:'BrB 9:11 upptar försök, förberedelse och stämpling till grov utpressning, med ett särskilt undantag från 23:3 just för försöksgärningen. Gärning och straffvärde får inte bedömas utifrån gradnamnet ensamt.'},
 {title:'Ocker',ref:'9:5',par:[],positive:'FP',
 obj:'Två olika handlingsvägar: otillbörligt utnyttjande av trångmål, oförstånd, lättsinne eller beroende vid avtal eller rättshandling för uppenbart oproportionerlig förmån; alternativt kreditgivning i näring eller vanemässig/större verksamhet med uppenbart oproportionerlig ränta eller annan ekonomisk förmån.',
 subj:'Uppsåt enligt 1:2 till utnyttjandet eller kreditgivningen och den orimliga förmånen krävs. De två alternativen är självständiga och inget automatiskt antagande om ocker får göras enbart av hög räntesats.',
 stage:'Försök och förberedelse till ocker uppräknas i BrB 9:11. Stämpling till ocker av normalgraden anges inte. Även ett avtal under förhandling fordrar självständigt prövade rekvisit för eventuellt förstadium.'},
 {title:'Grovt ocker',ref:'9:5',par:[],positive:'FP',
 obj:'Grundformen ocker enligt någon av de två gärningsvägarna i 9:5 med en samlad grovhetsbedömning där betydande värde eller särskilt farlig eller hänsynslös art särskilt beaktas. Bevisning om ekonomisk disproportion och de konkreta omständigheterna ska särskiljas.',
 subj:'Uppsåt till ockergärningen och relevanta faktiska omständigheter krävs även för grov grad. Betydande värde eller ett utnyttjande innebär inte i sig en separat oaktsamhetsvariant.',
 stage:'BrB 9:11 räknar upp försök och förberedelse till grovt ocker men inte stämpling. Grunden i 9:5 och förstadiekraven i BrB 23 kap. måste prövas var för sig.'},
 {title:'Oredligt förfarande',ref:'9:8',par:[],positive:'',
 obj:'I annat fall än som tidigare straffbeläggs i kapitel 9 ska gärningspersonen genom vilseledande förmå någon till handling eller underlåtenhet och därigenom skada den vilseledde eller någon i dennes ställe. Bedrägeriets krav på ekonomisk vinning finns inte som ett självständigt rekvisit här.',
 subj:'Uppsåt till vilseledande, den framkallade handlingen/underlåtenheten och den skada som följer krävs enligt 1:2. Subsidiariteten till föregående bestämmelser i kapitlet är uttrycklig och får inte förbigås.',
 stage:'BrB 9:11 tar inte upp oredligt förfarande bland brotten vars försök, förberedelse eller stämpling är straffbelagda; statusen får inte lånas från bedrägeri eller utpressning.'},
 {title:'Ockerpantning',ref:'9:10',par:[],positive:'',
 obj:'Någon mottar en falsk, skenbart upprättad eller annars oriktig handling eller en check utan täckning med ett särskilt ändamål: att använda den som påtryckningsmedel vid krav. Själva mottagandet med det angivna syftet måste vara styrkt.',
 subj:'Uppsåt krävs till mottagandet och de relevanta dokumentomständigheterna, med särskilt syfte att använda handlingen eller checken som påtryckningsmedel vid ett krav. En vanlig mottagning utan detta syfte räcker inte.',
 stage:'BrB 9:11 föreskriver inte särskilt straff för försök, förberedelse eller stämpling till ockerpantning. Detta förändras inte av att dokumentet kan användas i annan straffbar gärning.'}
];
const stageCode={F:'forsok',P:'forberedelse',S:'stampling'};
const report={planned:specs.length*3,completed:0,byKind:{objective:0,subjective:0,inchoate:0},
 byOffence:[],held:[],reviewed:'2026-10-20',source: SRC,
 finalCasesApproved:0,historicVersionsApproved:0,coercionApproved:0,prosecutionApproved:0};
for(const sp of specs){
 const c=D.crimes.find(v=>!v.stageType&&v.title===sp.title);
 const row={title:sp.title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+sp.ref||c.legalAudit15?.checkpoints){
  report.held.push({title:sp.title,reason:'missing/card statute mismatch or earlier checkpoint'});continue;
 }
 const own=ok[sp.ref]&&sp.par.every(p=>ok[p])&&c.lawMode==='full'&&
  c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC&&
  !!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 let stagesOK=own&&sourceAuth;
 const existing=D.crimes.filter(v=>v.stageType&&v.stageParentId===c.id);
 for(const [code,kind] of Object.entries(stageCode)){
  const s=existing.find(v=>v.stageType===kind),expected=sp.positive.includes(code);
  if(expected&&(!s||s.stageStatus!=='punishable'||s.individualLegalAudit15?.scope?.status!=='APPROVED'))stagesOK=false;
  if(!expected&&s&&s.stageStatus!=='not-criminalized')stagesOK=false;
 }
 const conditions={objective:own,subjective:own&&defaultFault,inchoate:stagesOK};
 const notes={objective:sp.obj,subjective:sp.subj,inchoate:sp.stage};
 const steps={};
 for(const [key,ready] of Object.entries(conditions)){
  if(ready&&notes[key].length>=95){
   steps[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceRefs:key==='inchoate'?['BrB 9:11','BrB 23:1–3']:key==='subjective'?['BrB 1:2','BrB '+sp.ref,...sp.par.map(p=>'BrB '+p)]:['BrB '+sp.ref,...sp.par.map(p=>'BrB '+p)],
    scope:'current-enumerated-statute-only',finding:notes[key],
    applicabilityToOffenceDateApproved:false,caseSpecificLiabilityApproved:false,
    preparatoryWorkAndCaseLawApproved:false,allExceptionsAndCompetitionApproved:false,
    caseSpecificProsecutionApproved:false,caseSpecificCustodyApproved:false};
   report.completed++;report.byKind[key]++;row.done.push(key);
  }else{row.held.push(key);report.held.push({title:sp.title,check:key,reason:'source or individual prior record does not corroborate finding'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB9-2026-10-20',checkpoints:steps,
  fullLegalReviewApproved:false,caseLawStillPending:true,
  historicalOffenceDateStillPending:true,crimeGradesAndExceptionsStillPending:true,
  chargingAndCoercionStillPending:true};
}
window.BK_BRB9_BASE_AUDIT15=report;
})();