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
const exactText=c=>c.lawMode==='full'||c.lawCompletenessVerified===true;
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
const incompletePenalty=base.filter(c=>c.penaltyReviewScope==='range-only'||!c.penaltyRangeVerified).filter(c=>!c.conditionalPenalty);
const dateMismatch=base.filter(c=>c.stageReviewed&&c.stageReviewDate&&c.stageReviewDate>new Date().toISOString().slice(0,10));
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
  brbPostsWithTypicalExamples:brb.filter(typecase).length,
  unverifiedStages:unverifiedStage.length,
  basePenaltyCasesNeedingIndividualVerification:incompletePenalty.length
 },
 blockers:{
  brbRequisitesNotIndividuallyApproved:pendingRequisites.length,
  brbLawTextNotIndividuallyCertified:pendingStatutes.length,
  unverifiedInchoateStatus:unverifiedStage.length,
  unexpectedFutureStageCheckDates:dateMismatch.length
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
 policy:{
  typecases:'Optional by design; withholding weak examples is correct and is not a release blocker.',
  statutoryText:'Machine-generated excerpts remain subject to individual version and completeness review.',
  requisites:'Summary of statutory wording is not the same as approved full legal requisites.',
  stages:'An unverified criminalization status is not a determination of non-criminalization.'
 },
 releaseReady:false
};
summaries.releaseReady=Object.values(summaries.blockers).every(n=>n===0);
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-release-readiness.json'),JSON.stringify(summaries,null,2)+'\n');
console.log('V1.5 RELEASE READINESS '+JSON.stringify({counts:summaries.counts,blockers:summaries.blockers,releaseReady:summaries.releaseReady}));
if(process.argv.includes('--release')&&!summaries.releaseReady){
 console.error('STOP: do not merge or publish V1.5 until legal release blockers are resolved.');
 process.exitCode=2;
}