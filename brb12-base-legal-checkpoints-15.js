/* BrB 12:1-6 current SFS, 2026-10-20. Twenty-five independently
 * checked substantive and procedure-law questions across five cards.
 * No historical version, precedent, competing offence, individual charge
 * or coercive power is certified by this CURRENT-statutory-text audit.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const checked=(ref,words)=>{const x=W['BrB:'+ref];
 return !!(x?.complete===true&&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&x.url===SRC&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')
  &&words.every(w=>n(x.text).includes(n(w))));
};
const shared={
 base:checked('12:1',['förstör eller skadar egendom','till men för någon annans rätt']),
 ringa:checked('12:2',['skadans obetydlighet','övriga omständigheter']),
 grov:checked('12:3',['betydande fara för någons liv eller hälsa','stor kulturell eller ekonomisk betydelse','synnerligen kännbar','särskilt hänsynslös art','Lag (2026:1318)']),
 nature:checked('12:2a',['i skog eller mark olovligen tar','inte är bearbetat','växande träd tar','tillgripnas värde','ringa']),
 passage:checked('12:4',['olovligen och på annat än väg','tomt eller plantering','annan mark som kan skadas']),
 stages:checked('12:5',['försök eller förberedelse till grov skadegörelse','för försök till skadegörelse','underlåtenhet att avslöja eller förhindra grov skadegörelse']),
 charge:checked('12:6',['ringa skadegörelse, åverkan eller tagande av olovlig väg','endast kränker enskilds rätt','särskilda skäl','från allmän synpunkt']),
 generalFault:n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen')
};
const specs=[
 {title:'Skadegörelse',ref:'12:1',type:'base',old:'general',inchoate:['forsok'],
  objective:'Förstöra eller skada egendom så att någon annans rätt till egendomen lider men. Egendomen behöver inte ägas av målsäganden; en skyddad rätt till den krävs. Pröva förstörelse/skada och rättsmen var för sig.',
  fault:'Uppsåt till skadandet eller förstörandet och till de omständigheter som innebär men för annans rätt. Oaktsam skada räcker inte för denna brottstyp.',
  grade:'Utgångspunkten är BrB 12:1, men bedöm även ringa enligt 12:2 (skadans obetydlighet och andra omständigheter) och grov enligt 12:3 (fyra särskilt angivna grovhetsindikatorer); ingen automatisk kronbeloppsgräns.',
  staging:'Enligt 12:5 är försök till normalgraden särskilt straffbelagt; förberedelse och stämpling till normalgraden anges inte. Utrednings- och underlåtenhetsregler i 23 kap. kräver separata rekvisit.',
  charging:'Allmänt åtal är utgångspunkten. Begränsningen i 12:6 räknar inte upp skadegörelse av normalgraden. Gärningsort, jurisdiktion och övriga allmänna åtalsförutsättningar måste kontrolleras.'},
 {title:'Ringa skadegörelse',ref:'12:2',type:'ringa',old:'conditional',inchoate:[],
  objective:'Samma grundgärning enligt 12:1: egendom förstörs eller skadas till men för annans rätt. Därutöver fordras en samlad ringabedömning enligt 12:2, inte endast en bedömning av kostnad.',
  fault:'Uppsåt enligt BrB 1:2 beträffande skadegörelsen och de faktiska omständigheterna. Ringa är en rättslig gradbedömning; ett fristående särskilt uppsåt att skadan ska vara obetydlig krävs inte.',
  grade:'Ringa grad enligt 12:2 kräver att skadan är obetydlig och/eller att övriga konkreta omständigheter sammantagna motiverar ringa. Avgränsa mot 12:1 och 12:3 utan fixerade beloppsschabloner.',
  staging:'BrB 12:5 anger försök till skadegörelse och försök/förberedelse till grov skadegörelse. Försök till ringa skadegörelse, förberedelse och stämpling till denna ringa grad räknas inte upp.',
  charging:'Särskilt åtalsvillkor enligt 12:6 bara om brottet ENDAST kränker enskilds rätt: åtal av åklagare fordrar då särskilda skäl som är motiverade från allmän synpunkt. I andra fall gäller huvudregeln.'},
 {title:'Grov skadegörelse',ref:'12:3',type:'grov',old:'general',inchoate:['forsok','forberedelse'],
  objective:'Alla objektiva rekvisit i 12:1 krävs: förstörelse eller skada på egendom till men för annans rätt. Omständigheter i 12:3 bedöms separat som grund för grov grad och ersätter inte grundbrottet.',
  fault:'Uppsåt enligt 1:2 till gärningen och de konkreta omständigheter som bär ansvar. Grovhetsgraden är en rättslig helhetsbedömning; ingen separat oaktsamhetsvariant av grov skadegörelse finns.',
  grade:'BrB 12:3: samlad grovhetsbedömning särskilt av betydande livs- eller hälsofara, särskilt kulturellt eller ekonomiskt betydelsefullt objekt, annars synnerligen kännbar skada eller särskilt hänsynslös art. 2026:1318: minimum ett år, maximum sex år.',
  staging:'Enligt 12:5 straffbeläggs både försök och förberedelse till grov skadegörelse; stämpling nämns inte. Underlåtenhet att avslöja eller förhindra grov skadegörelse nämns separat och är INTE ett synonymt förstadium.',
  charging:'Allmänt åtal enligt huvudregeln. BrB 12:6:s särskilda privatintressevillkor uppräknar inte grov skadegörelse. Individuell behörighets- och jurisdiktionskontroll återstår.'},
 {title:'Åverkan',ref:'12:2a',type:'nature',old:'conditional',inchoate:[],
  objective:'Endast de uppräknade naturprodukterna i skog eller mark, exempelvis växande träd eller gräs, vindfällda träd, obearbetad sten, grus eller torv; eller ris, grenar, näver, bark, löv, bast, ollon, nötter eller kåda från växande träd. Olovligt tillgrepp och ringa grad krävs.',
  fault:'Uppsåt enligt 1:2 till det olovliga tillgreppet och objektets faktiska karaktär. Att tillgreppet bedöms som ringa är en samlad rättslig kvalificering, inte ett särskilt uppsåtsrekvisit.',
  grade:'Endast ringa naturprodukttillgrepp ryms i 12:2 a, med värde och övriga omständigheter. Grövre tillgrepp är inte automatiskt grov åverkan; pröva i stället annat lagrum, däribland tillgreppsbrott.',
  staging:'BrB 12:5 räknar inte upp åverkan för försök, förberedelse eller stämpling. Enbart förekomsten av ett förstadiekort ger inte en egen straffbar gärning.',
  charging:'12:6 gäller om åverkan endast kränker enskilds rätt: åklagaren kräver då särskilda skäl motiverade från allmän synpunkt. Vid annat skyddsintresse gäller inte detta särskilda undantag automatiskt.'},
 {title:'Tagande av olovlig väg',ref:'12:4',type:'passage',old:'conditional',inchoate:[],
  objective:'Olovligen och på annat än väg färdas över tomt eller plantering eller annan mark som kan skadas av färden. Faktisk skada krävs inte för det senare alternativet, men marken måste vara av beskaffenhet att den kan skadas.',
  fault:'Uppsåt enligt 1:2 till färden, lovlösheten och markens relevanta förhållanden. Enbart oaktsam överfart är inte uttryckligen straffbelagd enligt 12:4.',
  grade:'Ingen ringa eller grov brottsgrad finns särskilt föreskriven i 12:4. Bestämmelsen har böter eller fängelse i högst sex månader; skilj från eventuella andra markskadebrott.',
  staging:'BrB 12:5 upptar inte försök, förberedelse eller stämpling till tagande av olovlig väg som egna straffbara förstadier.',
  charging:'12:6: Om enbart enskild rätt kränkts krävs särskilda skäl för åtal av åklagare, motiverade från allmän synpunkt. Om även allmänt intresse träffas måste bedömningen göras separat.'}
];
const report={planned:25,completed:0,perType:{objective:0,subjective:0,grade:0,inchoate:0,prosecution:0},
 byCrime:[],held:[],source:SRC,reviewed:'2026-10-20',legalCompleteCards:0,
 caseLiabilityApproved:0,coercionApprovals:0,historicLawApprovals:0,jurisprudenceApprovals:0};
const stages=D.crimes.filter(c=>c.stageType);
for(const x of specs){
 const c=D.crimes.find(v=>!v.stageType&&v.title===x.title);
 const audit={title:x.title,statute:x.ref,done:[],held:[]};report.byCrime.push(audit);
 if(!c||c.statute!=='BrB:'+x.ref||c.legalAudit15?.checkpoints){
  report.held.push({title:x.title,reason:'missing-card-or-existing-audit'});continue;
 }
 const sc={base:shared.base,ringa:shared.ringa,grov:shared.grov,nature:shared.nature,passage:shared.passage};
 const own=sc[x.type]&&(!['ringa','grov'].includes(x.type)||shared.base);
 const current=c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
  &&c.lawMode==='full'&&Array.isArray(c.rekvisit15?.groups||c.rekvisit15?.routes);
 const normalScope={offenceDateResolved:false,caseFactsEvaluated:false,
  separateJurisdictionCheckRequired:true,caseSpecificCustodyApproved:false,
  substantiveCaseLawReviewed:false};
 const groups={
  objective:{ready:own&&current,summary:x.objective,refs:x.type==='ringa'||x.type==='grov'?['BrB 12:1','BrB '+x.ref]:['BrB '+x.ref]},
  subjective:{ready:own&&current&&shared.generalFault,summary:x.fault,refs:['BrB 1:2','BrB '+x.ref]},
  grade:{ready:own&&current&&shared.base&&shared.ringa&&shared.grov,summary:x.grade,refs:['BrB 12:1','BrB 12:2','BrB 12:3',...(x.type==='nature'||x.type==='passage'?['BrB '+x.ref]:[])]},
  inchoate:{ready:own&&current&&shared.stages,summary:x.staging,refs:['BrB 12:5','BrB 23:1–2']},
  prosecution:{ready:own&&current&&shared.charge
    &&(x.old==='conditional'?c.prosecution==='conditional'&&String(c.prosecutionRule||'').includes('12:6'):
        c.prosecution==='general')
    ,summary:x.charging,refs:['BrB 12:6','RB 20:3']}
 };
 if(groups.inchoate.ready){
  const per=stages.filter(s=>s.stageParentId===c.id);
  for(const k of ['forsok','forberedelse','stampling']){
   const d=per.find(s=>s.stageType===k),wanted=x.inchoate.includes(k);
   if(wanted&&(!d||d.stageStatus!=='punishable'||d.individualLegalAudit15?.scope?.status!=='APPROVED'))groups.inchoate.ready=false;
   if(!wanted&&d&&d.stageStatus!=='not-criminalized')groups.inchoate.ready=false;
  }
 }
 const checkpoints={};
 for(const [key,entry] of Object.entries(groups)){
  if(entry.ready&&entry.summary.length>=95){
   checkpoints[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sources:entry.refs,scope:'current-statutory-paragraph-and-enumerated-conditions-only',
    finding:entry.summary,...normalScope,
    automaticOperationalAdviceApproved:false};
   audit.done.push(key);report.completed++;report.perType[key]++;
  }else{audit.held.push(key);report.held.push({title:x.title,key,reason:'statutory-source-or-existing-card-invariant-failed'});}
 }
 if(audit.done.length) c.legalAudit15={schema:1,sourceAudit:'BrB12-2026-10-20',checkpoints,
  fullLegalReviewApproved:false,caseSpecificLiabilityApproved:false,
  relevantCaseLawStillPending:true,historicalOffenceDateStillPending:true,
  coercionDecisionStillPending:true,competitionAndExceptionsStillPending:true};
}
window.BK_BRB12_BASE_AUDIT15=report;
})();