import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);const mod='./brb-conditional-penalty-options-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb-derivative-penalties-15.js')&&scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const report=ctx.window.BK_CONDITIONAL_PENALTY_OPTIONS15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(report&&report.planned===12&&report.annotated===12&&report.derived===2&&report.held.length===0,JSON.stringify(report));
const conditional=base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified);assert.equal(conditional.length,14);
for(const c of conditional){
 assert.ok(c.penaltyAlternatives15?.length>=1,'Every conditional case must expose options: '+c.title);
 assert.equal(c.penaltyAlternativeReview15.requiresCaseFacts,true);
 assert.equal(c.penaltyAlternativeReview15.automaticSelectionAllowed,false);
 assert.equal(c.penaltyAlternativeReview15.custodyApproved,false);
 assert.equal(c.penaltyAlternativeReview15.legalReviewPending,true);
 assert.equal(c.penaltyRangeVerified,false);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
 for(const a of c.penaltyAlternatives15){assert.ok(a.when&&a.scale&&a.source,'Readable statutory choice: '+c.title);}
}
const find=x=>conditional.find(c=>c.title===x);
assert.equal(find('Myteri').penaltyAlternatives15.length,5);
assert.equal(find('Egenmäktighet vid förhandling med främmande makt').penaltyAlternatives15.length,4);
assert.equal(find('Upplopp').penaltyAlternatives15.length,3);
assert.ok(find('Ovarsam utsaga inför en internationell domstol').penaltyAlternatives15[0].when.includes('ej ICC'));
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
assert.ok(html.includes('c.penaltyAlternatives15'),'UI must show alternative scales when card is opened');
console.log('PASS V1.5: fourteen conditional penalty cases have explicit source-anchored alternatives without automatic choice or coercion approval');