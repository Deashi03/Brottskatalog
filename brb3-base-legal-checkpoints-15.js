/* BrB 3:1-3, 5-9, 11, current SFS. Per-card and per-checkpoint
 * current-law review of objective alternatives, statutory fault forms
 * and enumerated inchoate liability. This is not case-law, offence-date,
 * charge permission, penalty or coercive-measure certification.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const norm=s=>String(s||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const source=(ref,fragments)=>{
 const x=W['BrB:'+ref];return Boolean(x?.complete===true&&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&x.url===URL&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')&&x.text?.length>90
  &&fragments.every(v=>norm(x.text).includes(norm(v))));
};
const stat={
 '3:1':source('3:1',['berövar annan livet','som skäl för livstids fängelse']),
 '3:2':source('3:2',['brott som i 1 § sägs','mindre grovt']),
 '3:3':source('3:3',['Dödar kvinna sitt barn','på grund av nedkomsten','upprivet sinnestillstånd','svårt trångmål']),
 '3:5':source('3:5',['tillfogar en annan person kroppsskada, sjukdom eller smärta','vanmakt eller något annat sådant tillstånd','om brottet är ringa']),
 '3:6':source('3:6',['om gärningen var livsfarlig','svår kroppsskada eller allvarlig sjukdom','kroppsskadan är bestående','synnerligt lidande','Lag (2026:1318)']),
 '3:7':source('3:7',['av oaktsamhet orsakar annans död','medvetet risktagande av allvarligt slag','försummelse av allvarligt slag']),
 '3:8':source('3:8',['av oaktsamhet orsakar annan person','kroppsskada eller sjukdom som inte är ringa','medvetet risktagande av allvarligt slag']),
 '3:9':source('3:9',['av grov oaktsamhet','livsfara eller fara för svår kroppsskada eller allvarlig sjukdom']),
 '3:11':source('3:11',['försök eller förberedelse till mord, dråp, barnadråp','sådan misshandel som inte är ringa','stämpling till mord, dråp, grov misshandel eller synnerligen grov misshandel'])
};
const fault=norm(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const cfg=[
 {title:'Mord',ref:'3:1',extra:[],allow:'FPS',method:'uppsåt',
 objective:'En levande annan person berövas livet; gärningen är orsak till döden. Frågan om dråp enligt 3:2 är en särskild gradbedömning. Planering och särskild hänsynslöshet är straffmätningsfaktorer, inte villkor för att själva mordet ska vara fullbordat.',
 subjective:'Uppsåt enligt 1:2 avseende dödandet och det faktum att någon annan dör; oaktsamhet är inte tillräckligt för mord. Eventuella ansvarsfrihetsgrunder prövas utanför denna kontroll.',
 stage:'BrB 3:11 kriminaliserar försök, förberedelse och stämpling till mord, med BrB 23 kap. som obligatorisk separat prövning av varje förstadium.'},
 {title:'Dråp',ref:'3:2',extra:['3:1'],allow:'FPS',method:'uppsåt',
 objective:'Uppsåtligt dödande av en annan människa enligt 3:1, men gärningen är mindre grov med hänsyn till dess föranledande omständigheter eller omständigheterna i övrigt. Dråp är en kvalifikation av samma livsberövande gärning, inte bara ett dödande utan planering.',
 subjective:'Uppsåt till annans död krävs enligt 1:2 och 3:1–2. Bedömningen att gärningen ska rubriceras som dråp bygger på en helhetsvärdering av omständigheterna, inte en självständig oaktsamhetsregel.',
 stage:'BrB 3:11 upptar försök, förberedelse och stämpling även till dråp. Den mindre grova gradens tillämplighet, rekvisit enligt 23 kap. och historisk lagversion måste prövas separat.'},
 {title:'Barnadråp',ref:'3:3',extra:[],allow:'FP',method:'uppsåt',
 objective:'En kvinna dödar sitt eget barn vid födelsen eller under den tid då hon på grund av nedkomsten befinner sig i upprivet sinnestillstånd eller svårt trångmål. Tidpunkt, modersrelation, dödsorsak och tillämpligt tillstånd ska bedömas självständigt.',
 subjective:'Uppsåtligt dödande enligt huvudregeln i 1:2; den födelseanknutna situationen är ett särskilt objektivt kvalifikationsvillkor. Varken enbart oaktsamt dödande eller allmänt psykiskt lidande utan samband med nedkomsten uppfyller brottet.',
 stage:'Försök och förberedelse till barnadråp är uttryckligen straffbara enligt 3:11. Stämpling till barnadråp är inte uppräknad i den särskilda förstadiebestämmelsen.'},
 {title:'Misshandel',ref:'3:5',extra:[],allow:'FP',method:'uppsåt',
 objective:'Gärningen tillfogar en annan människa kroppsskada, sjukdom eller smärta, eller försätter personen i vanmakt eller annat jämförligt tillstånd. Det är alternativa skade-/tillståndsrekvisit; faktisk skada behöver inte föreligga om alternativet vanmakt är uppfyllt.',
 subjective:'Uppsåt enligt 1:2 krävs till den misshandlande gärningen och de relevanta skade- eller vanmaktseffekterna; oaktsam personskada bedöms i förekommande fall enligt 3:8 i stället.',
 stage:'Enligt 3:11 är försök och förberedelse till misshandel som inte är ringa straffbara. Stämpling till misshandel av normalgraden anges inte; ringa misshandel omfattas inte.'},
 {title:'Ringa misshandel',ref:'3:5',extra:[],allow:'',method:'uppsåt',
 objective:'Samma handlings- och effektalternativ som vid misshandel enligt 3:5 måste föreligga. Därutöver ska hela gärningen utifrån skadeeffekten och övriga omständigheter kunna klassificeras som ringa.',
 subjective:'Uppsåt till den kroppsliga skadan, smärtan, sjukdomen eller motsvarande tillstånd måste föreligga. Ringa är en rättslig gradbedömning och fordrar inte särskild avsikt att tillfoga endast en lindrig skada.',
 stage:'BrB 3:11 undantar uttryckligen ringa misshandel från försök/förberedelse-regeln och räknar inte upp stämpling till ringa misshandel.'},
 {title:'Grov misshandel',ref:'3:6',extra:['3:5'],allow:'FPS',method:'uppsåt',
 objective:'Samtliga skade- eller vanmaktsrekvisit i 3:5 kvarstår. Vid en samlad bedömning enligt 3:6 vägs särskilt livsfarlig gärning, svår kroppsskada eller allvarlig sjukdom samt särskild hänsynslöshet eller råhet in som alternativ, inte kumulativa villkor.',
 subjective:'Uppsåt till misshandeln och dess relevanta faktiska omständigheter krävs enligt huvudregeln. Grovhetsklassificeringen är en helhetsbedömning; ingen fristående vårdslöshetsvariant av grov misshandel finns.',
 stage:'BrB 3:11 omfattar försök, förberedelse och stämpling till grov misshandel. Rättslig prövning av gärningsdag, brottsgrad och varje förstadiums särskilda rekvisit enligt 23 kap. återstår.'},
 {title:'Synnerligen grov misshandel',ref:'3:6',extra:['3:5'],allow:'FPS',method:'uppsåt',
 objective:'En uppsåtlig misshandel enligt 3:5 ska genom samlad kvalifikation nå synnerligen grov nivå. Särskilt bestående kroppsskada, synnerligt lidande eller synnerlig hänsynslöshet enligt 3:6 andra stycket vägs in; de är alternativa kvalifikationsfaktorer.',
 subjective:'Samma uppsåtsprincip enligt 1:2 som för misshandel, inklusive relevanta faktiska omständigheter. Gärningens rättsliga kvalifikation som synnerligen grov är inte en självständig skuldform.',
 stage:'BrB 3:11 upptar försök, förberedelse och stämpling även till synnerligen grov misshandel. Straffskalan och det enskilda förstadiets villkor får inte härledas automatiskt.'},
 {title:'Vållande till annans död',ref:'3:7',extra:[],allow:'',method:'oaktsamhet',
 objective:'En annan människa har avlidit och gärningspersonens oaktsamma handlande eller straffrättsligt relevanta underlåtenhet har orsakat döden. Brottet kan vara ringa beroende på omständigheter; dödsresultatet ensamt avgör inte graden.',
 subjective:'Oaktsamhet är uttryckligen föreskriven i 3:7 och måste vara straffrättsligt relevant i förhållande till dödsorsaken. Uppsåt att döda är inte ett krav för vållande och kan aktualisera annat brott.',
 stage:'BrB 3:11 upptar endast särskilt uppräknade uppsåtliga dödande- och misshandelsbrott. Vållande till annans död är inte uppräknat för försök, förberedelse eller stämpling.'},
 {title:'Grovt vållande till annans död',ref:'3:7',extra:[],allow:'',method:'oaktsamhet',
 objective:'En annan människa har avlidit till följd av relevant oaktsamhet. För grov grad prövas särskilt medvetet allvarligt risktagande eller alkohol-/drogpåverkan eller annan allvarlig försummelse när särskild uppmärksamhet eller skicklighet krävdes.',
 subjective:'Oaktsamhet till dödsresultatet krävs fortfarande enligt 3:7. En grovhetsomständighet kan utgöras av medvetet allvarligt risktagande, men allvarliga följder ensamma gör inte oaktsamheten grov.',
 stage:'BrB 3:11 upptar inte grovt vållande till annans död för försök, förberedelse eller stämpling; enbart grovheten skapar inget förstadieansvar.'},
 {title:'Vållande till kroppsskada eller sjukdom',ref:'3:8',extra:[],allow:'',method:'oaktsamhet',
 objective:'En annan människa orsakas kroppsskada eller sjukdom som inte är ringa. Den oaktsamma gärningen eller relevant underlåtenhet ska orsaka följden; enbart smärta utan kroppsskada eller sjukdom räcker inte enligt denna bestämmelse.',
 subjective:'Enligt 3:8 är skuldformen oaktsamhet i förhållande till en kroppsskada eller sjukdom som inte är ringa. Brottet ska skiljas från uppsåtlig misshandel enligt 3:5 och från 3:9:s grova oaktsamhet kring fara.',
 stage:'BrB 3:11 räknar inte upp oaktsamt vållande till kroppsskada eller sjukdom för försök, förberedelse eller stämpling. Åtalsinskränkningen i 3:12 är separat och påverkar inte dessa förstadier.'},
 {title:'Grovt vållande till kroppsskada eller sjukdom',ref:'3:8',extra:[],allow:'',method:'oaktsamhet',
 objective:'Samma grundresultat enligt 3:8, kroppsskada eller sjukdom som inte är ringa. En grovhetsbedömning görs utifrån särskilt medvetet risktagande av allvarligt slag eller allvarlig försummelse i situation med krav på särskild omsorg och förmåga.',
 subjective:'Oaktsamhet till skade- eller sjukdomsresultatet kvarstår även vid grov grad. Grovhetsgrunderna är inte en ersättning för orsakssamband, utan uppsåtliga brott ska avgränsas separat.',
 stage:'BrB 3:11 saknar uppräkning av förstadier till grovt vållande till kroppsskada eller sjukdom. Det förhållandet att straffmaximum är fyra år innebär inte i sig förstadiekriminalisering.'},
 {title:'Framkallande av fara för annan',ref:'3:9',extra:[],allow:'',method:'grov oaktsamhet',
 objective:'En annan person utsätts faktiskt för livsfara eller fara för svår kroppsskada eller allvarlig sjukdom. Det krävs fara av angivet slag, men inte att död, kroppsskada eller sjukdom faktiskt inträffar.',
 subjective:'Grov oaktsamhet är uttryckligt rekvisit enligt 3:9; vanlig oaktsamhet räcker inte. Den grova oaktsamheten ska hänföra sig till den farliga gärningen och de omständigheter som skapar faran.',
 stage:'BrB 3:11 räknar inte upp framkallande av fara för annan för försök, förberedelse eller stämpling. Ett påstått försök får därför inte ges positiv straffbarhetsstatus med stöd enbart av 3:9.'}
];
const types={F:'forsok',P:'forberedelse',S:'stampling'};
const report={planned:cfg.length*3,completed:0,byCheck:{objective:0,subjective:0,inchoate:0},
 reviewed:'2026-10-20',sourceURL:URL,byOffence:[],held:[],
 completeLegalCards:0,historicChecks:0,coercionApprovals:0,prosecutionApprovals:0,jurisprudenceApprovals:0};
for(const x of cfg){
 const c=D.crimes.find(v=>!v.stageType&&v.title===x.title);
 const r={title:x.title,done:[],held:[]};report.byOffence.push(r);
 if(!c||c.statute!=='BrB:'+x.ref||c.legalAudit15?.checkpoints){
  report.held.push({title:x.title,reason:'missing, conflicting statute or earlier checkpoint'});continue;
 }
 const ready=Boolean(stat[x.ref]&&x.extra.every(k=>stat[k])&&c.lawCompletenessVerified===true
 &&c.lawCompletenessSourceURL===URL&&c.lawMode==='full'&&
 (c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length));
 const own=D.crimes.filter(v=>v.stageType&&v.stageParentId===c.id);
 let stageReady=ready&&stat['3:11'];
 if(stageReady)for(const [k,t] of Object.entries(types)){
  const s=own.find(v=>v.stageType===t),positive=x.allow.includes(k);
  if(positive&&(!s||s.stageStatus!=='punishable'||s.individualLegalAudit15?.scope?.status!=='APPROVED'))stageReady=false;
  if(!positive&&s&&s.stageStatus!=='not-criminalized')stageReady=false;
 }
 const by={objective:ready,subjective:ready&&fault,inchoate:stageReady};
 const explanation={objective:x.objective,subjective:x.subjective,inchoate:x.stage};
 const checkpoints={};
 for(const [key,pass] of Object.entries(by)){
  if(pass&&explanation[key]?.length>=95){
   checkpoints[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:URL,
    sourceSections:key==='subjective'?['BrB 1:2','BrB '+x.ref]:key==='inchoate'?['BrB 3:11','BrB 23:1–2']:['BrB '+x.ref,...x.extra.map(k=>'BrB '+k)],
    scope:'current-SFS-statutory-elements-only',finding:explanation[key],
    offenceDateOrTransitionsApproved:false,caseSpecificLiabilityApproved:false,
    supportingCaseLawReviewed:false,caseSpecificCustodyApproved:false,
    prosecutionPermissionApproved:false,conditionalOnFacts:true};
   report.completed++;report.byCheck[key]++;r.done.push(key);
  }else{r.held.push(key);report.held.push({title:x.title,check:key,reason:'current-fulltext-or-card-status-unverified'});}
 }
 if(r.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB3-2026-10-20',checkpoints,
  fullLegalReviewApproved:false,applicabilityDatePending:true,
  lawOfOffencesAndCompetitionPending:true,caseLawPending:true,
  chargeAndCoercionPending:true,gradeAndPenaltyPending:true};
}
window.BK_BRB3_BASE_AUDIT15=report;
})();