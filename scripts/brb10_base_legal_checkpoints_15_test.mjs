import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),mod='./brb10-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb9-base-legal-checkpoints-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB10_BASE_AUDIT15;assert.ok(r);
assert.equal(r.planned,32);assert.equal(r.completed,32,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));assert.equal(r.byOffence.length,16);
assert.deepEqual(JSON.parse(JSON.stringify(r.byKind)),{objective:16,subjective:16});
for(const k of ['fullyApprovedCards','caseLiabilityApproved','caseLawApproved','historicLawApproved','prosecutionApproved','coercionApproved'])assert.equal(r[k],0);
const all=ctx.window.BK_DATA.crimes,parents=all.filter(c=>!c.stageType),reviewed=parents.filter(c=>c.legalAudit15?.sourceAudit==='BrB10-2026-10-20');assert.equal(reviewed.length,16);
for(const c of reviewed){
 const a=c.legalAudit15;
 assert.equal(a.fullLegalReviewApproved,false);assert.equal(a.historicDatePending,true);
 assert.equal(a.jurisprudencePending,true);assert.equal(a.stageAndCompetitionPending,true);
 assert.equal(a.penaltyAndGradePending,true);assert.equal(a.prosecutionAndCoercionPending,true);
 for(const key of ['objective','subjective']){
  const x=a.checkpoints[key];assert.equal(x.status,'APPROVED');assert.equal(x.checked,'2026-10-20');
  assert.equal(x.sourceURL,r.sourceURL);assert.ok(x.finding.length>=95&&x.sources.length>0);
  assert.equal(x.offenceDateVerified,false);
  assert.equal(x.caseSpecificLiabilityApproved,false);
  assert.equal(x.applicableCaseLawFullyReviewed,false);
  assert.equal(x.allSubsidiarityExceptionsReviewed,false);
  assert.equal(x.individualChargingPermissionApproved,false);
  assert.equal(x.coercivePowerApproved,false);
 }
}
const negligent=reviewed.find(c=>c.title==='Vårdslös finansiering av mutbrott');assert.ok(negligent);
assert.match(negligent.legalAudit15.checkpoints.subjective.finding,/GROV OAKTSAMHET/);
const controls=read(mod),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES)),clone=JSON.parse(JSON.stringify(all));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB10-2026-10-20')delete c.legalAudit15;
W['BrB:10:5c'].text='ALTERED GROV MUT';
const iso=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(controls,iso);
assert.equal(iso.window.BK_BRB10_BASE_AUDIT15.byKind.objective,14);
assert.equal(iso.window.BK_BRB10_BASE_AUDIT15.byKind.subjective,14);
const clone2=JSON.parse(JSON.stringify(all)),W2=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of clone2)if(c.legalAudit15?.sourceAudit==='BrB10-2026-10-20')delete c.legalAudit15;
W2['BrB:10:5a'].text='ALTERED TAGANDE';
const iso2=vm.createContext({window:{BK_DATA:{crimes:clone2},BK_STATUTES:W2}});
vm.runInContext(controls,iso2);
assert.equal(iso2.window.BK_BRB10_BASE_AUDIT15.byKind.objective,12);
assert.equal(iso2.window.BK_BRB10_BASE_AUDIT15.byKind.subjective,12);
console.log('PASS V1.5: 32 chapter-10 source-checked objective and fault requirements, no false full legal, case or custody approvals');
