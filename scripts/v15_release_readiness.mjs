// V1.5 release readiness: intentionally stronger than existing unit/UI CI.
// CI success means "the app runs", not "every BrB offence is legally certified".
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const warnings=[];
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:x=>warnings.push(String(x)),error:x=>warnings.push(String(x))}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of srcs)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const all=ctx.window.BK_DATA.crimes;
const base=all.filter(c=>!c.stageType);
const brb=base.filter(c=>/^BrB\s+\d+/i.test(c.shortRef||'')||String(c.statute||'').startsWith('BrB:'));
const stages=all.filter(c=>c.stageType);
const structured=c=>Boolean(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
const fullyReviewed=c=>Boolean(structured(c)&&c.rekvisit15?.scope==='full-legal-review'&&c.rekvisit15?.sourceURL&&c.rekvisit15?.legalReviewApproved===true);
// 'lawMode=full' means an embedded text was supplied, NOT that a
// human checked the whole currently effective paragraph. Count only
// records with source provenance and a valid nonfuture check date.
const embeddedFullText=c=>c.lawMode==='full'||c.lawCompletenessVerified===true;
const dateVerified=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d+'T00:00:00Z'))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d&&d<=new Date().toISOString().slice(0,10);
const exactText=c=>Boolean(c.lawMode==='full'&&c.lawCompletenessVerified===true&&
 c.lawCompletenessSourceURL?.startsWith('https://')&&dateVerified(c.lawCompletenessChecked));
const directlyCrosschecked=c=>Boolean(exactText(c)&&c.lawCompletenessReviewScope==='current-paragraph-only');
const typecase=c=>Boolean(c.typexempel15?.length);
const pendingRequisites=brb.filter(c=>!fullyReviewed(c));
const notStructured=brb.filter(c=>!structured(c));
const limitedStructured=brb.filter(c=>structured(c)&&!fullyReviewed(c));
const chapterOf=c=>{
 const match=String(c.statute||c.shortRef||'').match(/(?:BrB:|BrB\s+)(\d+)/);
 return match?Number(match[1]):null;
};
const chapters=[...new Set(brb.map(chapterOf))].filter(Number.isFinite).sort((a,b)=>a-b);
const perChapter=chapters.map(ch=>{
 const rows=brb.filter(c=>chapterOf(c)===ch);
 return {
  chapter:ch,total:rows.length,structured:rows.filter(structured).length,
  missingStructured:rows.filter(c=>!structured(c)).length,
  fullyLegallyReviewed:rows.filter(fullyReviewed).length,
  completeLawText:rows.filter(exactText).length,
  pendingTitles:rows.filter(c=>!structured(c)).map(c=>({title:c.title,ref:c.shortRef})),
  sourceNote:'Full lagtext/rekvisitintyg fordrar självständig juridisk sakgranskning.'
 };
});
const reviewOrder=[3,4,17,8,9,10,12,15,20,6,11,14,5,7,13,16,18,19,21,22];
const workQueue=notStructured.slice().sort((a,b)=>{
 const ai=reviewOrder.indexOf(chapterOf(a)),bi=reviewOrder.indexOf(chapterOf(b));
 return (ai<0?99:ai)-(bi<0?99:bi)||String(a.title).localeCompare(String(b.title),'sv');
}).map(c=>({
 title:c.title,ref:c.shortRef,chapter:chapterOf(c),
 task:'Kontrollera ordalydelse, objektiva och subjektiva rekvisit, alternativa gärningsformer, undantag och relevant rättspraxis. Överför först därefter till strukturerad rekvisitlista.',
 lawMode:c.lawMode||'unknown',
 penaltyReviewScope:c.penaltyReviewScope||'unknown',
 requireProvenance:true
}));
const pendingStatutes=brb.filter(c=>!exactText(c));
const unverifiedStage=stages.filter(c=>c.stageStatus==='unverified');
const stageAuditQueue=unverifiedStage.map(c=>{
 const parent=base.find(p=>p.id===c.stageParentId);
 const source=String(c.stageSource||c.stageReviewBasis||'');
 const m=source.match(/BrB\s+(13:12|21:15)\b/i);
 const key=m?'BrB:'+m[1]:null;
 const paragraph=key?ctx.window.BK_STATUTES?.[key]:null;
 return {
  title:c.title,stageType:c.stageType,
  parent:parent?.title||null,parentRef:parent?.shortRef||null,
  sourceRef:key,sourceTextIndividuallyChecked:Boolean(paragraph?.complete&&paragraph?.checked==='2026-10-17'),
  sourceURL:paragraph?.url||parent?.sourceURL||null,
  status:'INCHOATE_CRIMINALIZATION_UNVERIFIED',
  reason:c.stageReviewBasis||c.stageExplanation||null,
  requiredAction:'Bedöm självständigt om den grova graden omfattas av kriminaliseringen i BrB 13:12 eller BrB 21:15 jämförd med 23 kap., tillämplig praxis och förarbeten. Dra ingen automatisk slutsats av rubrikens ordval.'
 };
});
const incompletePenalty=base.filter(c=>c.penaltyReviewScope==='range-only'||!c.penaltyRangeVerified).filter(c=>!c.conditionalPenalty);
const dateMismatch=base.filter(c=>c.stageReviewed&&c.stageReviewDate&&c.stageReviewDate>new Date().toISOString().slice(0,10));
// The old "reviewQueue" represents *missing structure* only. It becomes
// empty after 319/319 and MUST NOT be presented as a finished legal audit.
// A separate queue tracks EVERY offence still needing individual legal signoff.
const policeFirst=new Set([
 'Mord','Dråp','Misshandel','Ringa misshandel','Grov misshandel',
 'Våldtäkt','Grov våldtäkt','Våldtäkt mot barn','Sexuellt övergrepp mot barn','Grovt sexuellt övergrepp mot barn',
 'Olaga hot','Grovt olaga hot','Olaga tvång','Ofredande','Hemfridsbrott',
 'Stöld','Ringa stöld','Grov stöld','Rån','Grovt rån','Bedrägeri','Grovt bedrägeri',
 'Skadegörelse','Ringa skadegörelse','Grov skadegörelse','Narkotikabrott',
 'Våld eller hot mot tjänsteman','Grovt våld eller hot mot tjänsteman',
 'Angrepp mot tjänsteman','Grovt angrepp mot tjänsteman',
 'Våldsamt motstånd','Sabotage mot blåljusverksamhet','Övergrepp i rättssak',
 'Barnfridsbrott','Grovt barnfridsbrott','Tjänstefel','Grovt tjänstefel'
]);
const hasPenaltyReview=c=>Boolean(c.penaltyRangeVerified&&c.penaltyReviewScope!=='range-only'&&!c.conditionalPenalty);
const legalAuditQueue=pendingRequisites.slice().sort((a,b)=>{
 const pa=policeFirst.has(a.title)?0:1,pb=policeFirst.has(b.title)?0:1;
 if(pa!==pb)return pa-pb;
 const ac=reviewOrder.indexOf(chapterOf(a)),bc=reviewOrder.indexOf(chapterOf(b));
 return (ac<0?99:ac)-(bc<0?99:bc)||String(a.title).localeCompare(String(b.title),'sv');
}).map(c=>{
 const missing=[];
 if(!structured(c))missing.push('structured-requisites');
 if(!exactText(c))missing.push('complete-current-statutory-text');
 if(!hasPenaltyReview(c))missing.push('individually-reviewed-penalty-or-conditional-scale');
 missing.push('individual-requisite-and-case-law-approval');
 return {
  title:c.title,ref:c.shortRef,chapter:chapterOf(c),
  id:c.id,priority:policeFirst.has(c.title)?'polisiar-first':'chapter-batch',
  statute:c.statute||null,sourceURL:c.rekvisit15?.sourceURL||c.sourceURL||null,
  status:'LEGAL_AUDIT_PENDING',missing,
  statutoryTextCertified:exactText(c),
  directParagraphCrosscheck:directlyCrosschecked(c),
  merelyEmbeddedFullText:embeddedFullText(c)&&!exactText(c),
  requisitesStructured:structured(c),
  completeLegalReviewApproved:fullyReviewed(c),
  legalTextScope:c.lawMode||'unknown',
  penaltyReviewScope:c.penaltyReviewScope||'unknown',
  requiresCaseLawAndEffectiveDateCheck:true,
  signoffRequired:'Individual check against applicable statutory version and relevant preparatory works/case law; verify exceptions, subjective elements, charges, inchoate criminalization and penalty.'
 };
});
const outstandingConditionalPenalty=base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified);
const summaries={
 generatedAt:new Date().toISOString(),
 title:'Brottskatalog V1.5 – juridisk publiceringskontroll',
 principle:'Grön testkörning och noll paragrafsluckor betyder inte juridiskt godkänd komplett katalog.',
 counts:{
  base:base.length,brb:brb.length,stages:stages.length,total:all.length,
  structuredBrbRequisites:brb.filter(structured).length,
  fullyLegallyApprovedBrbRequisites:brb.filter(fullyReviewed).length,
  brbPostsWithoutStructuredRequisites:notStructured.length,
  brbPostsWithLimitedStructuredRequisites:limitedStructured.length,
  brbPostsWithVerifiedCompleteLegalText:brb.filter(exactText).length,
  brbPostsWithEmbeddedFullTextOrPriorFlag:brb.filter(embeddedFullText).length,
  brbPostsWithDirectCurrentParagraphCrosscheck:brb.filter(directlyCrosschecked).length,
  brbPostsWithTypicalExamples:brb.filter(typecase).length,
  unverifiedStages:unverifiedStage.length,
  inchoateLegalAuditQueueEntries:stageAuditQueue.length,
  basePenaltyCasesNeedingIndividualVerification:incompletePenalty.length,
  brbOffencesInLegalAuditQueue:legalAuditQueue.length,
  conditionallyScopedPenaltyCasesNeedingReview:outstandingConditionalPenalty.length
 },
 blockers:{
  brbRequisitesNotIndividuallyApproved:pendingRequisites.length,
  brbLawTextNotIndividuallyCertified:pendingStatutes.length,
  unverifiedInchoateStatus:unverifiedStage.length,
  unexpectedFutureStageCheckDates:dateMismatch.length,
  basePenaltyCasesNeedingIndividualVerification:incompletePenalty.length,
  conditionalPenaltyCasesNeedingIndividualVerification:outstandingConditionalPenalty.length
 },
 samples:{
  missingRequisites:notStructured.slice(0,30).map(c=>({title:c.title,ref:c.shortRef})),
  unverifiedStages:unverifiedStage.slice(0,20).map(c=>({
    title:c.title,ref:c.stageSource,source:c.stageReviewBasis||c.stageExplanation||null,
    requiredAction:'Separat bedömning av förstadiekriminalisering enligt aktuellt BrB-kapitel och BrB 23:1–2.'
  }))
 },
 byChapter:perChapter,
 reviewQueue:workQueue,
 legalAuditQueue,
 stageAuditQueue,
 legalAuditSummary:{
  auditPending:legalAuditQueue.length,
  policePriorityPending:legalAuditQueue.filter(c=>c.priority==='polisiar-first').length,
  allStructuredDoesNotMeanAllReviewed:true,
  legalAuditDefinition:'Individuell lagversions-, rekvisit-, skuldforms-, undantags-, praxis-, påföljds-, åtals- och förstadiegranskning krävs före juridiskt slutgodkännande.'
 },
 policy:{
  typecases:'Optional by design; withholding weak examples is correct and is not a release blocker.',
  statutoryText:'Embedded full text alone is not verification. Count only complete legal text with an individual dated provenance and source URL; case-law review is separate.',
  requisites:'Summary of statutory wording is not the same as approved full legal requisites.',
  stages:'An unverified criminalization status is not a determination of non-criminalization.'
 },
 releaseReady:false
};
summaries.releaseReady=Object.values(summaries.blockers).every(n=>n===0);
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-release-readiness.json'),JSON.stringify(summaries,null,2)+'\n');
console.log('V1.5 RELEASE READINESS '+JSON.stringify({counts:summaries.counts,blockers:summaries.blockers,releaseReady:summaries.releaseReady}));
console.log('V1.5 STAGE LEGAL TRIAGE '+JSON.stringify({pending:stageAuditQueue.length,items:stageAuditQueue.map(({title,sourceRef,sourceTextIndividuallyChecked})=>({title,sourceRef,sourceTextIndividuallyChecked}))}));
console.log('V1.5 LEGAL AUDIT QUEUE '+JSON.stringify({pending:legalAuditQueue.length,policeFirst:legalAuditQueue.filter(c=>c.priority==='polisiar-first').length,first25:legalAuditQueue.slice(0,25).map(c=>({title:c.title,ref:c.ref,missing:c.missing}))}));
console.log('V1.5 REVIEW QUEUE '+JSON.stringify({first45:summaries.reviewQueue.slice(0,45).map(({title,ref})=>({title,ref})),unverified:summaries.samples.unverifiedStages,chapters:summaries.byChapter.map(({chapter,total,missingStructured,completeLawText})=>({chapter,total,missingStructured,completeLawText}))}));
if(process.argv.includes('--release')&&!summaries.releaseReady){
 console.error('STOP: do not merge or publish V1.5 until legal release blockers are resolved.');
 process.exitCode=2;
}