// V1.5 individual legal audit dossiers. A dossier is NOT an approval.
// Keep independently sourced statutory text, teaching annotations, and unresolved legal conditions separate.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const script of scripts)vm.runInContext(fs.readFileSync(path.join(root,script),'utf8'),ctx,{filename:script});
const W=ctx.window.BK_STATUTES||{},all=ctx.window.BK_DATA?.crimes||[];
const base=all.filter(c=>!c.stageType),stages=all.filter(c=>c.stageType);
const policeFirst=new Set([
'Mord','Dråp','Misshandel','Ringa misshandel','Grov misshandel','Synnerligen grov misshandel',
'Våldtäkt','Grov våldtäkt','Våldtäkt mot barn','Sexuellt övergrepp mot barn','Grovt sexuellt övergrepp mot barn',
'Olaga hot','Grovt olaga hot','Olaga tvång','Ofredande','Hemfridsbrott',
'Stöld','Ringa stöld','Grov stöld','Rån','Grovt rån','Bedrägeri','Grovt bedrägeri',
'Skadegörelse','Ringa skadegörelse','Grov skadegörelse','Narkotikabrott',
'Våld eller hot mot tjänsteman','Grovt våld eller hot mot tjänsteman','Angrepp mot tjänsteman',
'Grovt angrepp mot tjänsteman','Våldsamt motstånd','Sabotage mot blåljusverksamhet',
'Övergrepp i rättssak','Barnfridsbrott','Grovt barnfridsbrott','Tjänstefel','Grovt tjänstefel']);
const front=base.filter(c=>policeFirst.has(c.title)&&c.statute?.startsWith('BrB:'))
 .sort((a,b)=>{const m=c=>Number(c.statute.match(/^BrB:(\d+):/)?.[1]||99);return m(a)-m(b)||a.title.localeCompare(b.title,'sv');});
const source="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/";
const questionSet=[
 {id:'time',label:'Kontrollera gärningstidpunkt och författningslydelse',status:'PENDING'},
 {id:'objective',label:'Pröva samtliga objektiva rekvisit och alternativ',status:'PENDING'},
 {id:'subjective',label:'Pröva uppsåt eller särskilt föreskriven oaktsamhet',status:'PENDING'},
 {id:'exceptions',label:'Pröva rekvisitbegränsningar, undantag, subsidiaritet och konkurrens',status:'PENDING'},
 {id:'grade',label:'Pröva brottsgraden och samtliga kvalifikationsgrunder',status:'PENDING'},
 {id:'jurisprudence',label:'Pröva relevanta förarbeten, HD-praxis och andra rättskällor',status:'PENDING'},
 {id:'inchoate',label:'Kontrollera särskilt lagstöd och tillämpningsvillkor för varje förstadium',status:'PENDING'},
 {id:'prosecution',label:'Kontrollera särskilda åtalsregler och beslutande befogenheter',status:'PENDING'},
 {id:'coercion',label:'Pröva tvångsmedel, proportionalitet, behörighet och konkreta rekvisit självständigt',status:'PENDING'}
];
// Scoped legal-source notes are PROGRESS INDICATORS, not completion of any of
// the nine independent legal review steps. Never infer completed legal signoff.
const scopedSourceReviewsFor=c=>{
 const p=W[c.statute];
 if(!c.lawCompletenessVerified||!p?.complete
    ||p.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'
    ||!p.checked||p.url!==source)return [];
 const candidates=[
  {kind:'HD_ALIBIT_DISTINCTION',data:c.praxisAlibit15,
   link:x=>x.sourceURL,verified:x=>x.legalReviewApproved===false
    &&x.statuteChecked===p.checked&&x.statuteSourceURL===source},
  {kind:'BRB15_ACCUSATION_LIMITS',data:c.accusationLimits15,
   link:x=>x.preparatoryWorks,verified:x=>x.finalLegalReviewApproved===false
    &&x.checked===p.checked&&x.sourceURL===source},
  {kind:'BRB14_EVIDENCE_DISTINCTIONS',data:c.evidenceDistinction15,
   link:x=>x.sourceURL,verified:x=>x.legalReviewApproved===false
    &&x.sourceDate===p.checked},
  {kind:'BRB17_OFFICIAL_FUNCTION_BOUNDARIES',data:c.officialFunctionBoundaries15,
   link:x=>x.preparatorySourceURL,verified:x=>x.individuallyApproved===false
    &&x.statuteChecked===p.checked&&x.sourceURL===source}
 ];
 return candidates.filter(x=>{
  const d=x.data;return Boolean(d&&x.verified(d)&&
   typeof d.note==='string'&&d.note.length>=90&&
   typeof x.link(d)==='string'&&x.link(d).startsWith('https://'));
 }).map(x=>({
  kind:x.kind,status:'SCOPED_SOURCE_NOTE_ONLY',
  lawRef:c.statute,statutoryTextChecked:p.checked,
  statutorySourceURL:source,additionalSourceURL:x.link(x.data),
  finding:x.data.note,finalLegalConclusionApproved:false,
  legalChecklistCompletedByThisNote:0,
  offenceDateAndCompetingProvisionsStillRequireReview:true
 }));
};
const toDossier=c=>{
 const p=W[c.statute],ts=p?.text||'',q=c.rekvisit15||{};
 const stageCards=stages.filter(s=>s.stageParentId===c.id);
 return {
 id:c.id,title:c.title,ref:c.shortRef,statute:c.statute,sourceURL:p?.url||c.lawCompletenessSourceURL||source,
 statutoryText:ts,statuteTextChecked:p?.checked||null,statuteFullTextIndividuallyVerified:Boolean(p?.complete&&c.lawCompletenessVerified),
 gradeRange:c.penaltyRange||null,gradeReviewScope:c.penaltyReviewScope||null,gradeSource:c.penaltyGradeReviewSource||null,
 gradeCaveat:c.penaltyGradeReviewCaveat||c.penaltyNote||null,
 listedStatutoryRequisites:q.groups||[],listedAlternativeRoutes:q.routes||[],
 requisitesSource:q.sourceURL||c.sourceURL||null,existingTeachingExamples:c.typexempel15||[],
 scopedSourceNotes:scopedSourceReviewsFor(c),
 inchoateCards:stageCards.map(s=>({id:s.id,title:s.title,status:s.stageStatus||null,source:s.stageSource||null})),
 prosecutionSummary:c.prosecutionDetails||[],existingProsecutionRule:c.prosecutionRule||null,
 age14Applicability:c.age14Exception15||null,
 legalChecklist:questionSet.map(x=>{
  const a=c.legalAudit15?.checkpoints?.[x.id];
  // Reflect only individually dated, source-linked and unambiguously scoped
  // checkpoints; do not mistake a partial checklist for full legal certification.
  if(a?.status==='APPROVED'&&/^2026-10-\d{2}$/.test(a.checked||'')&&a.sourceURL===source
    &&a.caseSpecificLiabilityApproved!==true&&a.caseSpecificCustodyApproved!==true)
   return {...x,status:'APPROVED',sourceURL:a.sourceURL,checked:a.checked,
    scope:a.scope,finding:a.finding,caseSpecificLegalConclusionApproved:false};
  return {...x};
 }),
 unresolvedQuestions:[],
 finalLegalConclusionApproved:false,sourceTextIsNotCaseLawApproval:true,
 independentHumanLegalReviewRequired:true,
 operationalCustodyAdviceApproved:false,status:'LEGAL_AUDIT_PENDING'
 };
};
const crimes=front.map(toDossier);
const brbAll=base.filter(c=>c.statute?.startsWith('BrB:'));
const priorityIds=new Set(front.map(c=>c.id));
const remainingBrB=brbAll.filter(c=>!priorityIds.has(c.id))
 .sort((a,b)=>Number(a.statute.match(/^BrB:(\d+):/)?.[1]||99)-Number(b.statute.match(/^BrB:(\d+):/)?.[1]||99)||a.title.localeCompare(b.title,'sv')).map(toDossier);
const allDossiers=[...crimes,...remainingBrB];
const scopedSourceSummary=(()=>{
 const byKind={},cards=new Set();let count=0;
 for(const d of allDossiers)for(const note of d.scopedSourceNotes){
  byKind[note.kind]=(byKind[note.kind]||0)+1;count++;cards.add(d.id);
 }
 return {entries:count,cardsWithAtLeastOneNote:cards.size,byKind,
  allNotesArePartial:true,fullLegalReviewApprovalsFromNotes:0,
  outstandingIndividualFinalReviews:allDossiers.length};
})();

const pending=stages.filter(s=>s.stageStatus==='unverified').map(s=>{
 const parent=base.find(c=>c.id===s.stageParentId),e=s.stageEvidence15||{};
 const sourceRef=parent?.statute?.startsWith('BrB:21:')?'BrB:21:15':'BrB:13:12';
 const chapter=sourceRef==='BrB:13:12'?13:21;
 const statutoryLaw=chapter===13?['BrB:13:5a','BrB:13:5b','BrB:13:7']:['BrB:21:8'];
 return {
 id:s.id,title:s.title,stageType:s.stageType,parent:parent?.title||null,parentStatute:parent?.statute||null,
 authorizingProvision:sourceRef,authorizingFullText:W[sourceRef]?.text||null,
 sourceURL:W[sourceRef]?.url||source,
 parentFullText:parent?.statute?W[parent.statute]?.text||null:null,
 sourceReferences:e.legalProvisions||[],preparatorySource:e.preparatorySource||null,
 additionalPrimaryStatutes:statutoryLaw.filter(k=>W[k]?.text).map(ref=>({ref,fullText:W[ref].text})),
 preliminaryLegalAssessment:e.preliminaryAssessment||'NOT_DETERMINED',
 openIssue:'Fastställ om det namngivna grundbrottet i den särskilda förstadieparagrafen omfattar den i samma brottsbestämmelse reglerade grova graden.',
 requiredSteps:['Jämför uttryckligt kriminaliseringsstöd med den tillämpliga gradens fullständiga lagtext.',
 'Granska förarbeten och praxis om förstadieansvar för denna grad, utan analogisk utvidgning av straffansvar.',
 'Verifiera gärningsdatum, eventuella övergångsbestämmelser samt villkoren i BrB 23:1–3.',
 'Pröva separat om krigsanknutna tillämpningsvillkor enligt BrB 21 kap. är uppfyllda där det är aktuellt.',
 'Pröva tvångsmedelsrekvisiten och beslutsbehörigheten självständigt.'],
 status:'INCHOATE_CRIMINALIZATION_UNVERIFIED',
 stageStatus:s.stageStatus,finalLegalConclusionApproved:false,automatedCustodyAdviceApproved:false,
 noNegativeInferencesFromMissingApproval:true
 };
});
const output={schema:1,version:'1.5',generatedAt:new Date().toISOString(),
 purpose:'Individuell juridisk arbetsakt, utan automatisk saklig godkännandeeffekt',
 counts:{policePriorityBrBCards:crimes.length,otherBrBCards:remainingBrB.length,
 allBrBCards:allDossiers.length,allBrBCardsWithCompleteStatute:allDossiers.filter(x=>x.statuteFullTextIndividuallyVerified).length,
 unverifiedStageCases:pending.length,
 policeCardsWithCompleteStatute:crimes.filter(x=>x.statuteFullTextIndividuallyVerified).length,
 policeCardsFullyLegallyApproved:crimes.filter(x=>x.finalLegalConclusionApproved).length,
 scopedSourceNoteEntries:scopedSourceSummary.entries,
 brbCardsWithScopedSourceNotes:scopedSourceSummary.cardsWithAtLeastOneNote,
 allBrBCardsFullyLegallyApproved:allDossiers.filter(x=>x.finalLegalConclusionApproved).length,
 individuallySourceCheckedLegalChecklistSteps:allDossiers.reduce((n,d)=>n+d.legalChecklist.filter(c=>c.status==='APPROVED').length,0),
 cardsWithPartiallyCheckedLegalChecklist:allDossiers.filter(d=>d.legalChecklist.some(c=>c.status==='APPROVED')).length},
 policePriority:crimes,remainingBrB,scopedSourceSummary,ambiguousInchoate:pending,
 releaseReady:false,automaticCustodyAuthorization:false};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-priority-legal-dossiers.json'),JSON.stringify(output,null,2)+'\n');
console.log('V1.5 LEGAL DOSSIERS '+JSON.stringify({counts:output.counts,examples:crimes.slice(0,5).map(x=>x.title),
 stageGroups:pending.reduce((acc,x)=>{acc[x.authorizingProvision]=(acc[x.authorizingProvision]||0)+1;return acc;},{})}));
if(crimes.length!==37||remainingBrB.length!==282||allDossiers.length!==319||pending.length!==0)throw Error('Review coverage changed; audit dossiers need reconciliation');
if(allDossiers.some(x=>!x.statuteFullTextIndividuallyVerified||!x.statutoryText||x.legalChecklist.length!==9))
 throw Error('Incomplete primary law or audit checkpoints');
if(pending.some(x=>!x.authorizingFullText||!x.parentFullText||x.stageStatus!=='unverified'||x.finalLegalConclusionApproved))
 throw Error('Unresolved stage must have complete statutory evidence and remain without approval');
if(new Set(allDossiers.map(x=>x.id)).size!==319)throw Error('Duplicate or missing BrB legal dossiers');
if(scopedSourceSummary.entries!==Object.values(scopedSourceSummary.byKind).reduce((a,b)=>a+b,0)
 ||scopedSourceSummary.cardsWithAtLeastOneNote>319
 ||allDossiers.some(d=>d.scopedSourceNotes.some(n=>n.finalLegalConclusionApproved
  ||n.legalChecklistCompletedByThisNote!==0)))throw Error('Scoped review is not final legal signoff');
if(output.releaseReady||output.automaticCustodyAuthorization)throw Error('Unsafe inferred release or detention authority');
if(output.counts.individuallySourceCheckedLegalChecklistSteps!==180
 ||output.counts.cardsWithPartiallyCheckedLegalChecklist!==65
 ||allDossiers.some(d=>d.legalChecklist.some(q=>q.status==='APPROVED'&&(!q.sourceURL||!q.checked||q.caseSpecificLegalConclusionApproved))))
 throw Error('Individual partial BrB3/12 source checks have not reconciled against the legal audit queue');
