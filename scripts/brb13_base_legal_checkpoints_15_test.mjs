import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),mod='./brb13-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb11-base-legal-checkpoints-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB13_BASE_AUDIT15;
assert.ok(r);assert.equal(r.planned,44);assert.equal(r.completed,44,JSON.stringify(r));
assert.equal(r.byOffence.length,22);assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.deepEqual(JSON.parse(JSON.stringify(r.byType)),{objective:22,subjective:22});
for(const k of ['finalOffenceApprovals','offenceDateApprovals','prosecutionApprovals','coercionApprovals','jurisprudenceApprovals','stageSignoffs'])assert.equal(r[k],0);
const all=ctx.window.BK_DATA.crimes;
const reviewed=all.filter(c=>!c.stageType&&c.legalAudit15?.sourceAudit==='BrB13-2026-10-20');
assert.equal(reviewed.length,22);
for(const c of reviewed){
 const a=c.legalAudit15;assert.equal(a.fullLegalReviewApproved,false);
 assert.equal(a.offenceDatePending,true);assert.equal(a.jurisprudencePending,true);
 assert.equal(a.stageAndExceptionsPending,true);assert.equal(a.prosecutionAndCoercionPending,true);
 for(const key of ['objective','subjective']){
  const q=a.checkpoints[key];assert.equal(q.status,'APPROVED');assert.equal(q.checked,'2026-10-20');
  assert.equal(q.sourceURL,r.sourceURL);assert.ok(q.finding.length>=110);
  assert.equal(q.caseSpecificLiabilityApproved,false);
  assert.equal(q.currentOffenceDateApproved,false);
  assert.equal(q.preparatoryWorksAndCaseLawApproved,false);
  assert.equal(q.competitionAndExceptionsCompleted,false);
  assert.equal(q.caseSpecificCustodyApproved,false);
  assert.equal(q.chargingConditionsCompleted,false);
  assert.equal(q.stageLiabilityReviewed,false);
 }
}
for(const t of ['Allmänfarlig vårdslöshet','Grovt allmänfarlig vårdslöshet'])
 assert.match(reviewed.find(x=>x.title===t).legalAudit15.checkpoints.subjective.finding,/OAKTSAMHET|OAKTSAM/);
const clone=JSON.parse(JSON.stringify(all)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB13-2026-10-20')delete c.legalAudit15;
W['BrB:13:5a'].text='TAMPERED';
const iso=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(read(mod),iso);
assert.equal(iso.window.BK_BRB13_BASE_AUDIT15.byType.objective,18);
assert.equal(iso.window.BK_BRB13_BASE_AUDIT15.byType.subjective,18);
assert.equal(iso.window.BK_BRB13_BASE_AUDIT15.held.length,8);
console.log('PASS V1.5: 44 individually sourced BrB13 offence and fault checks, guarded against corrupted current SFS; no premature operational certification');
