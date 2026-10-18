import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./age14-candidate-source-audit-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./age14-offence-scope-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./field-07.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const r=ctx.window.BK_AGE14_CANDIDATE_SOURCE_AUDIT15;
assert.equal(r.planned,86);
assert.equal(r.sourceReviewed,83,JSON.stringify(r));
assert.equal(r.unresolved.length,3);
assert.ok(r.unresolved.every(x=>x.title.includes('grovt spridande av gift eller smitta')));
const all=ctx.window.BK_DATA.crimes,approved=all.filter(c=>c.age14Exception15?.individualSourceScopeApproved===true);
assert.equal(approved.length,83);
for(const c of approved){
 const a=c.age14Exception15;
 assert.equal(a.statutoryThresholdIndividuallyChecked,true);
 assert.equal(a.completedOffencePenaltyIndividuallyVerified,true);
 assert.equal(a.caseSpecificApplicationApproved,false);
 assert.equal(a.inchoateCaseLegalAssessmentApproved,false);
 assert.equal(a.provisionalOnly,true);
 assert.equal(a.neverApprovesCoerciveMeasures,true);
 assert.equal(a.individualSourceScopeResult,'MINIMUM_4_YEARS_CONFIRMED_STATUTORY_ONLY');
 assert.equal(a.individualSourceScopeChecked,'2026-10-18');
 if(c.stageType)assert.equal(c.stageStatus,'punishable');
}
assert.equal(all.filter(c=>c.stageStatus==='unverified').length,15);
assert.equal(all.filter(c=>c.stageStatus==='unverified'&&c.age14Exception15?.individualSourceScopeApproved===true).length,0);
for(const title of ['Grovt vapenbrott','Synnerligen grovt narkotikabrott','Grov våldtäkt','Grovt rån','Mord']){
const c=all.find(x=>x.title===title&&!x.stageType);
assert.ok(c?.age14Exception15?.individualSourceScopeApproved,title);
}
const W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));W['BrB:1:6'].text='INVALID';
const clone=JSON.parse(JSON.stringify(all.filter(c=>c.age14Exception15?.completedOffenceMinimumYears>=4)));
for(const c of clone){delete c.age14Exception15.individualSourceScopeApproved;delete c.age14Exception15.individualSourceScopeChecked;}
const isolated=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(fs.readFileSync(path.join(root,mod),'utf8'),isolated);
assert.equal(isolated.window.BK_AGE14_CANDIDATE_SOURCE_AUDIT15.sourceReviewed,0);
assert.equal(clone.filter(c=>c.age14Exception15?.individualSourceScopeApproved).length,0);
console.log('PASS V1.5: 83 individual source-checked age-14 minimum threshold scopes; 3 gross poison stages held, zero automatic youth liability or coercion');
