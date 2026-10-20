/* Current BrB20 public office and secrecy statutory checks.
 * SFS 2026:1420 was effective 2026-08-01 (RKR statutes/Prop
 * 2025/26:217); controls are not valid for earlier act dates.
 * Historic law, official-duty definitions, precedent, charging authority,
 * overlap and police coercion remain unapproved.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=t=>String(t||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const p={
 '20:1':{need:['uppsåtligen eller av oaktsamhet vid myndighetsutövning','åsidosätter vad som gäller för uppgiften','är att anse som ringa','brott enligt första stycket har begåtts uppsåtligen och är grovt','samma eller strängare straff'],
 obj:'Tjänstefel kräver att gärningspersonen vid myndighetsutövning genom handling eller underlåtenhet åsidosätter vad som gäller för uppgiften. Ringa gärning är uttryckligen straffri; särskilda undantag gäller ledamöter av beslutande församlingar och gärningar belagda med samma eller strängare straff i annat lagrum.',
 sub:'Normalt tjänstefel kan begås UPPÅTLIGEN eller av VANLIG OAKTSAMHET. Grovt tjänstefel förutsätter däremot enligt det uttryckliga andra stycket UPPÅT och grov gärning; det är inte ett självständigt grovt oaktsamhetsbrott.'},
 '20:2':{need:['i annat fall än som avses i 1 §','vid utövandet av offentlig tjänst','otillbörlig förmån','otillbörligt missgynna','grovt missbruk av offentlig ställning'],
 obj:'Missbruk av offentlig ställning är ett kompletterande brott utanför tjänstefel enligt 20:1. Det omfattar författningsstridigt handlande eller underlåtenhet inom offentlig verksamhet för att erhålla otillbörlig förmån till sig eller annan eller för att otillbörligt missgynna någon, även när gärningen inte utgör myndighetsutövning.',
 sub:'Uppsåt till det författningsstridiga handlandet och ett uttryckligt SÄRSKILT SYFTE att få otillbörlig förmån eller otillbörligt missgynna någon krävs. Brottets grova grad ska bedömas efter de särskilt angivna försvårande omständigheterna; vanlig oaktsamhet räcker inte.'},
 '20:3':{need:['skyldig att hemlighålla enligt lag','olovligen utnyttjar sådan hemlighet','av oaktsamhet','ringa utgör den inte brott','grovt brott mot tystnadsplikt'],
 obj:'Brott mot tystnadsplikt förutsätter röjande eller olovligt utnyttjande av uppgift som personen är skyldig att hemlighålla enligt lag, författning eller författningsgrundat beslut/förbehåll. Brottet är subsidiärt till annan straffbestämmelse och ringa oaktsam gärning är uttryckligen straffri.',
 sub:'Uppsåtlig gärning omfattas av första stycket och OAKTSAM gärning av andra stycket. Den GROVA graden hänvisar uttryckligen till första styckets brott och ska därför inte behandlas som en separat grov-oaktsamhetsgrad.'}
};
const cfg=[
 ['Tjänstefel','20:1'],['Grovt tjänstefel','20:1'],
 ['Missbruk av offentlig ställning','20:2'],['Grovt missbruk av offentlig ställning','20:2'],
 ['Brott mot tystnadsplikt','20:3'],['Grovt brott mot tystnadsplikt','20:3']
];
const isValid=(ref,q)=>{const x=W['BrB:'+ref];return !!(x?.complete===true
 &&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&x.url===S&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')
 &&x.text?.length>110&&q.need.every(t=>n(x.text).includes(n(t))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:cfg.length*2,completed:0,byKind:{objective:0,subjective:0},held:[],byOffence:[],
 checked:'2026-10-20',sourceURL:S,change20_1_2Effective:'2026-08-01',
 offenceDateApprovals:0,fullyApprovedOffences:0,publicDutyDoctrineApprovals:0,
 specialChargingApprovals:0,coercionApprovals:0,competitionApprovals:0};
for(const [title,ref] of cfg){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing/mismatched catalogue offence or existing audit'});continue;}
 const q=p[ref],ready=isValid(ref,q)&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===S
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const suff=/^(Grov |Grovt )/.test(title)?' För den grova graden ska en särskild samlad bedömning göras, utan att något grundrekvisit eller den uttryckliga skuldformen får utelämnas.':'',done={};
 for(const [k,val] of Object.entries({objective:q.obj+suff,subjective:q.sub+suff})){
  if(ready&&val.length>115){done[k]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,
   statute:'BrB '+ref,sourceFault:k==='subjective'?'BrB 1:2':null,
   finding:val,scope:'current-law-act-or-fault-form-only',
   offenceDateAndTransitionalLawReviewed:false,allOfficerDutyRequirementsReviewed:false,
   fullOffenceLiabilityApproved:false,precedentAndDoctrineApproved:false,
   prosecutionConditions20_5Approved:false,competitionReviewed:false,
   operationalCoercionApproved:false};
   report.completed++;report.byKind[k]++;row.done.push(k);
  }else{row.held.push(k);report.held.push({title,k,reason:'individual provenance or underlying offence missing'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB20-2026-10-20',checkpoints:done,
  fullLegalReviewApproved:false,effectiveDateAndOlderOffencesPending:true,
  mensReaAndOfficialDutyContextPending:true,prosecutionAndCompetitionPending:true,
  operationalCustodyPending:true};
}
window.BK_BRB20_BASE_AUDIT15=report;
})();