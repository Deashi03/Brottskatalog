// V1.5: source-evidence inventory of exactly the currently unapproved direct
// penalty-grade checks. This script never changes a legal classification.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x);
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const grade=c=>Boolean(c.penaltyRangeVerified&&!c.conditionalPenalty
 &&c.penaltyReviewScope!=='range-only'&&c.penaltyChecked);
const direct=c=>grade(c)&&validDate(c.penaltyGradeReviewDate)
 &&c.penaltyGradeReviewSource?.startsWith('https://')&&c.penaltyGradeReviewProvision;
const pending=base.filter(c=>grade(c)&&!direct(c)).map(c=>({
 id:c.id,title:c.title,ref:c.shortRef,statute:c.statute,penaltyRange:c.penaltyRange,
 penalty:c.penalty,law:c.law,lawSource:c.lawCompletenessSourceURL,
 gradeRangeSource:c.penaltySource,gradeScope:c.penaltyReviewScope,
 checked:c.penaltyChecked,legalReviewApproved:c.rekvisit15?.legalReviewApproved===true
}));
const conditional=base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified).map(c=>({
 id:c.id,title:c.title,statute:c.statute,
 branchCount:c.penaltyAlternatives15?.length,
 sourceURL:c.penaltyAlternativeReview15?.sourceURL,
 dependsOn:c.penaltyAlternativeReview15?.dependsOn||[]
}));
const families=pending.reduce((a,c)=>{const k=(c.statute||'Special').split(':')[0];(a[k]??=[]).push(c.title);return a;},{});
const report={version:'V1.5',scopedTo:'source-verified-direct-penalty-reviews-only',
 counts:{basicAlreadyCertified:base.filter(direct).length,remainingDirect:pending.length,conditional:conditional.length},
 families,missingDirect:pending,conditional};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-penalty-direct-evidence-queue.json'),JSON.stringify(report,null,2)+'\n');
console.log('V1.5 DIRECT PENALTY GAP FAMILIES '+JSON.stringify(Object.fromEntries(Object.entries(families).map(([k,v])=>[k,{n:v.length,titles:v}]))));
console.log('V1.5 DIRECT PENALTY GAP ENTRIES '+JSON.stringify(pending.map(c=>({title:c.title,ref:c.ref,range:c.penaltyRange,scope:c.gradeScope,checked:c.checked}))));
if(pending.length!==33||conditional.length!==14||report.counts.basicAlreadyCertified!==340)
 throw Error('Unexpected direct penalty queue shape: '+JSON.stringify(report.counts));
