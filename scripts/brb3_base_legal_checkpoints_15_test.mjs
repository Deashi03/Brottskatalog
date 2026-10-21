import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js'),mod='./brb3-base-legal-checkpoints-15.js';
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb12-base-legal-checkpoints-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB3_BASE_AUDIT15;
assert.ok(r);
assert.equal(r.planned,36);
assert.equal(r.completed,36,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.deepEqual(JSON.parse(JSON.stringify(r.byCheck)),{objective:12,subjective:12,inchoate:12});
assert.equal(r.byOffence.length,12);
for(const name of ['completeLegalCards','historicChecks','coercionApprovals','prosecutionApprovals','jurisprudenceApprovals'])assert.equal(r[name],0);
const all=ctx.window.BK_DATA.crimes,base=all.filter(c=>!c.stageType),stage=all.filter(c=>c.stageType);
const reviewed=base.filter(c=>c.legalAudit15?.sourceAudit==='BrB3-2026-10-20');
assert.equal(reviewed.length,12);
for(const c of reviewed){
 assert.equal(c.lawCompletenessVerified,true);
 assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 assert.equal(c.legalAudit15.applicabilityDatePending,true);
 assert.equal(c.legalAudit15.caseLawPending,true);
 assert.equal(c.legalAudit15.chargeAndCoercionPending,true);
 assert.equal(c.legalAudit15.gradeAndPenaltyPending,true);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
 for(const key of ['objective','subjective','inchoate']){
  const x=c.legalAudit15.checkpoints[key];
  assert.equal(x.status,'APPROVED');assert.equal(x.checked,'2026-10-20');
  assert.ok(x.finding.length>=95&&x.sourceSections.length>=1);
  assert.equal(x.caseSpecificLiabilityApproved,false);
  assert.equal(x.offenceDateOrTransitionsApproved,false);
  assert.equal(x.supportingCaseLawReviewed,false);
  assert.equal(x.caseSpecificCustodyApproved,false);
  assert.equal(x.prosecutionPermissionApproved,false);
 }
}
assert.equal(stage.filter(c=>c.stageStatus==='unverified').length,0);
assert.equal(stage.filter(c=>c.individualLegalAudit15?.scope?.status==='APPROVED').length,1167);
// Mutated special attempt law must not cause positive or negative certification.
const copy=JSON.parse(JSON.stringify(all)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of copy)if(c.legalAudit15?.sourceAudit==='BrB3-2026-10-20')delete c.legalAudit15;
W['BrB:3:11'].text='TAMPERED';
const iso=vm.createContext({window:{BK_DATA:{crimes:copy},BK_STATUTES:W}});
vm.runInContext(read(mod),iso);
assert.equal(iso.window.BK_BRB3_BASE_AUDIT15.byCheck.inchoate,0);
assert.equal(iso.window.BK_BRB3_BASE_AUDIT15.completed,24);
assert.equal(iso.window.BK_BRB3_BASE_AUDIT15.held.length,12);
// One provision cannot independently authorize a different provision's card.
const copy2=JSON.parse(JSON.stringify(all)),W2=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of copy2)if(c.legalAudit15?.sourceAudit==='BrB3-2026-10-20')delete c.legalAudit15;
W2['BrB:3:6'].text='TAMPERED';
const iso2=vm.createContext({window:{BK_DATA:{crimes:copy2},BK_STATUTES:W2}});
vm.runInContext(read(mod),iso2);
assert.equal(iso2.window.BK_BRB3_BASE_AUDIT15.byCheck.objective,10);
assert.equal(iso2.window.BK_BRB3_BASE_AUDIT15.byCheck.subjective,10);
assert.equal(iso2.window.BK_BRB3_BASE_AUDIT15.byCheck.inchoate,10);
console.log('PASS V1.5: 36 independently sourced BrB3 objective, fault and stage source checks; no fabricated doctrine, penalty, prosecution, custody or case liability');
