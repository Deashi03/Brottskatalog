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
const crimes=front.map(c=>{
 const p=W[c.statute],ts=p?.text||'',q=c.rekvisit15||{};
 const stageCards=stages.filter(s=>s.stageParentId===c.id);
 return {
 id:c.id,title:c.title,ref:c.shortRef,statute:c.statute,sourceURL:p?.url||c.lawCompletenessSourceURL||source,
 statutoryText:ts,statuteTextChecked:p?.checked||null,statuteFullTextIndividuallyVerified:Boolean(p?.complete&&c.lawCompletenessVerified),
 gradeRange:c.penaltyRange||null,gradeReviewScope:c.penaltyReviewScope||null,gradeSource:c.penaltyGradeReviewSource||null,
 gradeCaveat:c.penaltyGradeReviewCaveat||c.penaltyNote||null,
 listedStatutoryRequisites:q.groups||[],listedAlternativeRoutes:q.routes||[],
 requisitesSource:q.sourceURL||c.sourceURL||null,existingTeachingExamples:c.typexempel15||[],
 inchoateCards:stageCards.map(s=>({id:s.id,title:s.title,status:s.stageStatus||null,source:s.stageSource||null})),
 prosecutionSummary:c.prosecutionDetails||[],existingProsecutionRule:c.prosecutionRule||null,
 age14Applicability:c.age14Exception15||null,
 legalChecklist:questionSet.map(x=>({...x})),
 unresolvedQuestions:[],
 finalLegalConclusionApproved:false,sourceTextIsNotCaseLawApproval:true,
 independentHumanLegalReviewRequired:true,
 operationalCustodyAdviceApproved:false,status:'LEGAL_AUDIT_PENDING'
 };
});
const pending=stages.filter(s=>s.stageStatus==='unverified').map(s=>{
 const parent=base.find(c=>c.id===s.stageParentId),e=s.stageEvidence15||{};
 const sourceRef=parent?.statute?.startsWith('BrB:21:')?'BrB:21:15':'BrB:13:12';
 const chapter=sourceRef==='BrB:13:12'?13:21;
 const statutoryLaw=chapter===13?['BrB:13:5a','BrB:13:5b']:['BrB:21:8'];
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
 counts:{policePriorityBrBCards:crimes.length,unverifiedStageCases:pending.length,
 policeCardsWithCompleteStatute:crimes.filter(x=>x.statuteFullTextIndividuallyVerified).length,
 policeCardsFullyLegallyApproved:crimes.filter(x=>x.finalLegalConclusionApproved).length},
 policePriority:crimes,ambiguousInchoate:pending,
 releaseReady:false,automaticCustodyAuthorization:false};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-priority-legal-dossiers.json'),JSON.stringify(output,null,2)+'\n');
console.log('V1.5 LEGAL DOSSIERS '+JSON.stringify({counts:output.counts,examples:crimes.slice(0,5).map(x=>x.title),
 stageGroups:pending.reduce((acc,x)=>{acc[x.authorizingProvision]=(acc[x.authorizingProvision]||0)+1;return acc;},{})}));
if(crimes.length!==37||pending.length!==12)throw Error('Review coverage changed; audit dossiers need reconciliation');
if(crimes.some(x=>!x.statuteFullTextIndividuallyVerified||!x.statutoryText||x.legalChecklist.length!==9))
 throw Error('Incomplete primary law or audit checkpoints');
if(pending.some(x=>!x.authorizingFullText||!x.parentFullText||x.stageStatus!=='unverified'||x.finalLegalConclusionApproved))
 throw Error('Unresolved stage must have complete statutory evidence and remain without approval');
if(output.releaseReady||output.automaticCustodyAuthorization)throw Error('Unsafe inferred release or detention authority');
