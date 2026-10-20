import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),w=ctx.window,base=w.BK_DATA.crimes.filter(c=>!c.stageType),requirements=JSON.parse(read('data/v15-required-offence-coverage.json')).records;
assert.equal(base.length,390);assert.equal(base.filter(c=>c.statute?.startsWith('BrB:')).length,322);
assert.equal(w.BK_INVENTORY_COMPLETION15.added.length,3);assert.equal(w.BK_INVENTORY_PENALTIES15.completed,3);
assert.equal(w.BK_INVENTORY_FINAL_SCOPE15.prosecution,3);assert.equal(w.BK_INVENTORY_FINAL_SCOPE15.stageScopes,9);assert.equal(w.BK_INVENTORY_FINAL_SCOPE15.stageConsequences,9);assert.equal(w.BK_INVENTORY_FINAL_SCOPE15.held.length,0);
for(const r of requirements){const c=base.find(c=>c.statute===r.statute);assert.equal(c.title,r.title);assert.ok(c.lawCompletenessVerified);assert.equal(c.lawMode,'full');assert.ok(c.rekvisit15.routes.length);assert.ok(c.penaltyRangeVerified);assert.equal(c.penaltyGradeReviewDate,'2026-10-20');assert.equal(c.custody,'unknown');assert.equal(c.typexempel15.length,0);assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 for(const key of ['objective','subjective','prosecution'])assert.equal(c.legalAudit15.checkpoints[key].status,'APPROVED');
 const stages=w.BK_DATA.crimes.filter(s=>s.stageParentId===c.id);assert.equal(stages.length,3);
 for(const s of stages){assert.equal(s.stageStatus,r.statute==='BrB:22:1'?'punishable':'not-criminalized');assert.equal(s.individualLegalAudit15.scope.checked,'2026-10-20');assert.equal(s.individualLegalAudit15.consequences.checked,'2026-10-20');assert.equal(s.individualLegalAudit15.scope.caseSpecificLiabilityApproved,false);assert.equal(s.individualLegalAudit15.consequences.automaticCoercionApproved,false);}
 if(r.statute.startsWith('BrB:22:'))assert.equal(c.applicabilityConditional,true);
}
const land=base.find(c=>c.statute==='BrB:22:1');assert.deepEqual(JSON.parse(JSON.stringify(land.penaltyRange)),{min:4,max:10,fines:false,life:true});assert.equal(land.age14Exception15.status,'conditional-applicability');assert.equal(land.age14Exception15.individualSourceScopeChecked,'2026-10-20');
assert.equal(w.BK_AGE14_CANDIDATE_SOURCE_AUDIT15.sourceReviewed,96);
assert.ok(base.find(c=>c.statute==='BrB:13:9').requisiteConcepts15.some(c=>c.conceptId==='bk:medveten-oaktsamhet'));
assert.ok(base.find(c=>c.statute==='BrB:22:5').requisiteConcepts15.some(c=>c.conceptId==='bk:abstrakt-fara'));
// A changed own paragraph or supporting prosecution/stage paragraph cannot retain approval.
const mod='./brb-inventory-final-scope-15.js';
for(const [key,prosecution,stages] of [['RB:20:3',0,9],['BrB:22:7',3,3],['BrB:13:12',3,6],['BrB:22:1',2,6]]){
 const iso=load([mod]);iso.window.BK_STATUTES[key].text+=' CHANGED';vm.runInContext(read(mod),iso);
 assert.equal(iso.window.BK_INVENTORY_FINAL_SCOPE15.prosecution,prosecution,key);assert.equal(iso.window.BK_INVENTORY_FINAL_SCOPE15.stageScopes,stages,key);
}
const pmod='./brb-inventory-penalties-15.js',iso=load([pmod]);iso.window.BK_STATUTES['BrB:22:1'].text+=' CHANGED';vm.runInContext(read(pmod),iso);assert.equal(iso.window.BK_INVENTORY_PENALTIES15.completed,2);assert.equal(iso.window.BK_DATA.crimes.find(c=>c.statute==='BrB:22:1'&&!c.stageType).penaltyRangeVerified,false);
for(const f of ['./brb-inventory-completion-15.js',pmod,mod])assert.ok(read('service-worker.js').includes(f));
console.log('PASS: three missing active offences, distinct requisite routes, current scales and nine bounded stage checks; source changes block approvals');
