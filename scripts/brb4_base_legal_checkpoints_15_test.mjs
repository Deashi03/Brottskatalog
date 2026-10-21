import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),module='./brb4-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(module)&&sw.includes(module));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const f of scripts)vm.runInContext(read(f),ctx,{filename:f});
const r=ctx.window.BK_BRB4_BASE_AUDIT15;
assert.ok(r);assert.equal(r.planned,74);assert.equal(r.completed,74,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.deepEqual(JSON.parse(JSON.stringify(r.byType)),{objective:37,subjective:37});
const reviewed=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType&&c.legalAudit15?.sourceAudit==='BrB4-2026-10-20');
assert.equal(reviewed.length,37);
for(const c of reviewed){const a=c.legalAudit15;
 assert.equal(a.fullLegalReviewApproved,false);
 assert.equal(a.qualifyingConditionsAndExceptionsPending,true);
 assert.equal(a.prosecutionStageAndCompetitionPending,true);
 assert.equal(a.coercionStillBlocked,true);
 for(const key of ['objective','subjective']){const v=a.checkpoints[key];
 assert.equal(v.status,'APPROVED');assert.equal(v.checked,'2026-10-20');
 assert.ok(v.finding.length>=115);assert.equal(v.legalLiabilityForCaseApproved,false);
 assert.equal(v.offenceDateReviewed,false);
 assert.equal(v.allQualifyingConditionsAndSpecialExceptionsReviewed,false);
 assert.equal(v.caseLawReviewed,false);
 assert.equal(v.specialProsecutionReviewed,false);assert.equal(v.inchoateStageReviewed,false);
 assert.equal(v.specificCoercivePowerReviewed,false);}}
for(const title of ['Människohandel','Människoexploatering','Oaktsam uppmaning till självmord']){
 assert.match(reviewed.find(c=>c.title===title).legalAudit15.checkpoints.subjective.finding,/OAKTSAM/);
}
const c=JSON.parse(JSON.stringify(ctx.window.BK_DATA.crimes)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const x of c)if(x.legalAudit15?.sourceAudit==='BrB4-2026-10-20')delete x.legalAudit15;
W['BrB:4:6'].text='MUTATED LAW';
const iso=vm.createContext({window:{BK_DATA:{crimes:c},BK_STATUTES:W}});
vm.runInContext(read(module),iso);
assert.equal(iso.window.BK_BRB4_BASE_AUDIT15.byType.objective,33);
assert.equal(iso.window.BK_BRB4_BASE_AUDIT15.byType.subjective,33);
assert.equal(iso.window.BK_BRB4_BASE_AUDIT15.held.length,8);
console.log('PASS: 74 current-SFS individual BrB4 act/fault reviews; tampered 4:6 source blocks its four cards, all case-specific powers withheld');
