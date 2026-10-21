import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);const mod='./brb-derivative-penalties-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb-penalty-grade-audit-15.js')&&scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const source of scripts)vm.runInContext(fs.readFileSync(path.join(root,source),'utf8'),ctx,{filename:source});
const report=ctx.window.BK_DERIVATIVE_SCALES15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(report&&report.classified===2&&report.held.length===0&&report.numericApprovals===0,JSON.stringify(report));
for(const name of ['Arbetsmiljöbrott','Brukande av det förfalskade']){
 const c=base.find(x=>x.title===name);assert.ok(c,name);
 assert.equal(c.conditionalPenalty,true);assert.equal(c.penaltyRangeVerified,false);
 assert.equal(c.penaltyReviewScope,'derivative-sfs-reference-conditional');
 assert.equal(c.penaltyDerivation15.numericRangeResolved,false);
 assert.equal(c.penaltyDerivation15.custodyApproved,false);
 assert.equal(c.penaltyDerivation15.judicialReviewPending,true);
 assert.ok(c.penaltySpecificCaution.length>100);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
assert.deepEqual(Array.from(base.find(c=>c.title==='Arbetsmiljöbrott').penaltyDerivation15.dependsOn),['BrB:3:7','BrB:3:8','BrB:3:9']);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
console.log('PASS V1.5: derivative BrB 3:10 and 14:10 safely categorized without fictitious fixed ranges or coercion signoff');