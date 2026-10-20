// Read-only manifest of candidate offence/attempt 14-year-old threshold checks.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of sources)vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const cases=ctx.window.BK_DATA.crimes.filter(c=>Number(c.age14Exception15?.completedOffenceMinimumYears)>=4);
const by=cases.reduce((a,c)=>{const k=c.age14Exception15.status;(a[k]??=[]).push({title:c.title,ref:c.shortRef,min:c.age14Exception15.completedOffenceMinimumYears,
 stage:c.stageType||null,verified:c.age14Exception15.completedOffencePenaltyIndividuallyVerified,
 stageSource:c.stageSource||null,sourceDate:c.stageReviewDate||null});return a;},{});
const summary=Object.fromEntries(Object.entries(by).map(([k,v])=>[k,{count:v.length,sample:v.slice(0,10)}]));
const report={scope:'READ_ONLY_PROVISIONAL_ELIGIBILITY',total:cases.length,summary,cases:by};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-age14-candidate-inventory.json'),JSON.stringify(report,null,2)+'\n');
console.log('V1.5 AGE14 CANDIDATES '+JSON.stringify(summary));
const byId=new Map(ctx.window.BK_DATA.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const parents=new Map();
for(const c of cases){
 const p=c.stageType?byId.get(c.stageParentId):c;
 if(!p)throw Error('Missing age14 parent '+c.title);
 const x=parents.get(p.id)||{title:p.title,statute:p.statute,ref:p.shortRef,min:p.penaltyRange?.min,
   gradeVerified:p.penaltyRangeVerified,gradeScope:p.penaltyReviewScope,
   gradeReviewedDate:p.penaltyGradeReviewDate,gradeReviewedSource:p.penaltyGradeReviewSource,
   gradeReviewedProvision:p.penaltyGradeReviewProvision,
   gradeReviewScope15:p.penaltyGradeReviewScope15,
   lawCompletenessVerified:p.lawCompletenessVerified,
   lawCompletenessSourceURL:p.lawCompletenessSourceURL,stageCount:0,gradeCases:0};
 if(c.stageType)x.stageCount++;
 x.gradeCases++;parents.set(p.id,x);
}
console.log('V1.5 AGE14 UNIQUE PARENTS '+JSON.stringify([...parents.values()].sort((a,b)=>a.title.localeCompare(b.title,'sv'))));
if(cases.length!==96)throw Error('Age14 source checklist baseline changed: '+cases.length);
console.log('PASS V1.5: 96 age14 threshold candidates inventoried; not a criminal-responsibility decision');
