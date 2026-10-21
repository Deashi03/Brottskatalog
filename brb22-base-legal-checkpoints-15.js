/* BrB22 individual current-text requisites, bounded and fail-closed:
 * No automatic assumption of armed conflict, occupation, offending date,
 * enemy status or conventions, case-law, stage, police power, or guilt.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const common={
 '22:4':['gärning som avses i 1--3 §§','befolkningens behov','ej anses otillbörlig'],
 '22:10':['riket är i krigsfara','regeringen föreskriva','ockuperat av främmande makt'],
 '22:11':['med fiende likställs','risk att riket kommer i krig']
};
const specs={
 '22:1':{need:['då riket är i krig','hindrar, missleder eller förråder','avsevärt men för totalförsvaret'],
 obj:'Landsförräderi förutsätter att Sverige är i krig eller att lagen särskilt satts i tillämpning och att gärningen genom förräderi, sabotage, fiendebistånd eller liknande är ägnad att orsaka avsevärt men för totalförsvaret eller avsevärt bistånd åt fienden. 22:4 undantar vissa försörjningshandlingar.',
 sub:'Uppsåt till den förrädiska handlingen och de relevanta faktiska krigs-, fara- eller fiendeförhållandena krävs enligt huvudregeln. Gärningens effekter ska bedömas enligt lagens avsevärt-men eller avsevärt-biståndsvillkor.'},
 '22:2':{need:['gärning som avses i 1 §','i mindre mån ägnad att medföra men','landssvek'],
 obj:'Landssvek förutsätter en 22:1-gärning, men med mindre fara för totalförsvaret eller lindrigare bistånd till fienden än i landsförräderi. En självständig gradbedömning och undantaget för viss försörjning i 22:4 måste beaktas.',
 sub:'Uppsåt till grundgärningen och relevanta faktiska krigs- och faraomständigheter krävs. Den mildare klassificeringen innebär inte att uppsåt till den aktuella skadliga eller fiendebistående handlingen bortfaller.'},
 '22:3':{need:['av oaktsamhet','gärning som avses i 1 eller 2 §','landsskadlig vårdslöshet'],
 obj:'Landsskadlig vårdslöshet avser oaktsamt begången gärning av de slag som uppräknas i 22:1 eller 22:2, med tillhörande krigs-, fara- och totalförsvarskontext. Undantaget för viss försörjningsverksamhet enligt 22:4 gäller också.',
 sub:'22:3 anger uttryckligen OAKTSAMHET som skuldform. Brottet får inte automatiskt behandlas som uppsåtligt landsförräderi och skuld kan inte presumeras bara av att en fara uppstått.'},
 '22:5':{need:['då riket är i krig','falska rykten eller andra osanna påståenden','fara för rikets säkerhet','trolöshet eller modlöshet'],
 obj:'Ryktesspridning till fara för rikets säkerhet förutsätter att under krig falska rykten eller osanna påståenden sprids bland allmänheten eller förmedlas till främmande makt och är ägnade att skapa fara för rikets säkerhet; alternativt sprids sådana uppgifter bland krigsmän och är ägnade att orsaka trolöshet eller modlöshet.',
 sub:'Uppsåt till spridningen eller förmedlingen och relevanta osannhets- och krigsomständigheter krävs enligt 1:2. Ett osäkert påstående utan den angivna säkerhetsfaran eller militärmoralsrisken är inte automatiskt brott enligt 22:5.'},
 '22:6a':{need:['kemiska vapen','kemiska vapen till någon','kravallbekämpning','inte är att bedöma som krigsförbrytelse','brottet grovt'],
 obj:'Olovlig befattning med kemiska vapen täcker uppräknade former av förbjuden utveckling, tillverkning, innehav, överföring eller användning av kemiska vapen eller särskilt förbjuden användning av kravallbekämpningsämnen i krigföring. Föremålets folkrättsliga definition och subsidiaritet till krigsförbrytelse måste prövas.',
 sub:'Uppsåt till den i lagen angivna befattningshandlingen och till de relevanta faktiska objektsförhållandena följer av 1:2. Internationell konventionsdefinition och undantagsfrågor kräver självständig prövning; grovhetsgraden är inte ett nytt oaktsamhetsbrott.'},
 '22:6b':{need:['antipersonella minor','konventionen den 18 september 1997','tillåten enligt den konvention','brottet grovt'],
 obj:'Olovlig befattning med minor gäller särskilt angivna handlingar med sådana antipersonella minor som definieras i 1997 års konvention. Åtgärder som konventionen tillåter är uttryckligen undantagna och straffbudet är subsidiärt till krigsförbrytelse.',
 sub:'Uppsåt till den förbjudna befattningen och relevanta faktiska egenskaper hos objektet krävs enligt 1:2. Frågan om den specifika minan omfattas av konventionen och om en konventionsenlig tillåtelse föreligger måste prövas separat.'}
};
const cfg=[
 ['Landsförräderi','22:1'],['Landssvek','22:2'],['Landsskadlig vårdslöshet','22:3'],
 ['Ryktesspridning till fara för rikets säkerhet','22:5'],
 ['Olovlig befattning med kemiska vapen','22:6a'],['Grov olovlig befattning med kemiska vapen','22:6a'],
 ['Olovlig befattning med minor','22:6b'],['Grov olovlig befattning med minor','22:6b']
];
const valid=(ref,words)=>{const p=W['BrB:'+ref];return !!(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===S&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>=90&&words.every(q=>n(p.text).includes(n(q))))};
const context=Object.fromEntries(Object.entries(common).map(([ref,v])=>[ref,valid(ref,v)]));
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const result={planned:cfg.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 checked:'2026-10-20',sourceURL:S,fullyApprovedOffences:0,
 offenceDateApprovals:0,armedConflictApplicabilityApproved:0,
 treatyExceptionsFullyReviewed:0,jurisprudenceApproved:0,coercionApproved:0,stageApproved:0};
for(const [title,ref] of cfg){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};result.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){result.held.push({title,reason:'missing or changed base offence, or existing individual approval'});continue;}
 const s=specs[ref],duringWar=['22:1','22:2','22:3','22:5'].includes(ref);
 const ready=valid(ref,s.need)&&fault&&(!duringWar||(context['22:10']&&context['22:11']))
 &&(!['22:1','22:2','22:3'].includes(ref)||context['22:4'])
 &&c.lawMode==='full'&&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===S
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const suffix=/^(Grov |Grovt )/.test(title)?
  ' Vid grovhetsprövning kvarstår alla grundbrottets objektiva, folkrättsliga och subjektiva krav. Brottsgraden är en självständig rättslig helhetsvärdering.':'';
 const completed={};
 for(const [key,body] of Object.entries({objective:s.obj+suffix,subjective:s.sub+suffix})){
  if(ready&&body.length>=110){completed[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,
   sourceRefs:['BrB '+ref,...(duringWar?['BrB 22:10','BrB 22:11']:[]),...(['22:1','22:2','22:3'].includes(ref)?['BrB 22:4']:[]),...(key==='subjective'?['BrB 1:2']:[])],
   finding:body,scope:'current-BrB22-statutory-conduct-or-explicit-fault-only',
   offenceDateApplicabilityApproved:false,warlikeSituationForCaseApproved:false,
   internationalTreatyExemptionApproved:false,fullCriminalLiabilityApproved:false,
   judicialPrecedentFullyReviewed:false,prosecutionAndStageApproved:false,
   caseSpecificCoercionApproved:false};
   result.completed++;result.byType[key]++;row.done.push(key);
  }else{row.held.push(key);result.held.push({title,key,reason:'current source, war context or individual card precondition unverified'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB22-2026-10-20',checkpoints:completed,
   fullLegalReviewApproved:false,armedConflictAndOffenceDatePending:true,
   internationalLawExceptionsPending:true,caseLawPending:true,
   stageProsecutionAndCoercionPending:true};
}
window.BK_BRB22_BASE_AUDIT15=result;
})();