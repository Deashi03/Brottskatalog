import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),mod='./brb9-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),paths=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(paths.includes(mod)&&sw.includes(mod));
assert.ok(paths.indexOf(mod)>paths.indexOf('./brb8-base-legal-checkpoints-15.js'));
assert.ok(paths.indexOf(mod)<paths.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of paths)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB9_BASE_AUDIT15;assert.ok(r);
assert.equal(r.planned,30);assert.equal(r.completed,30,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.equal(r.byOffence.length,10);
assert.deepEqual(JSON.parse(JSON.stringify(r.byKind)),{objective:10,subjective:10,inchoate:10});
for(const k of ['finalCasesApproved','historicVersionsApproved','coercionApproved','prosecutionApproved'])assert.equal(r[k],0);
const all=ctx.window.BK_DATA.crimes,base=all.filter(c=>!c.stageType),stages=all.filter(c=>c.stageType);
const audited=base.filter(c=>c.legalAudit15?.sourceAudit==='BrB9-2026-10-20');
assert.equal(audited.length,10);
for(const c of audited){
 assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 assert.equal(c.legalAudit15.caseLawStillPending,true);
 assert.equal(c.legalAudit15.historicalOffenceDateStillPending,true);
 assert.equal(c.legalAudit15.crimeGradesAndExceptionsStillPending,true);
 assert.equal(c.legalAudit15.chargingAndCoercionStillPending,true);
 for(const k of ['objective','subjective','inchoate']){
  const a=c.legalAudit15.checkpoints[k];
  assert.equal(a.status,'APPROVED');
  assert.equal(a.checked,'2026-10-20');
  assert.equal(a.sourceURL,r.source);
  assert.ok(a.finding.length>=95);assert.ok(a.sourceRefs.length);
  assert.equal(a.applicabilityToOffenceDateApproved,false);
  assert.equal(a.caseSpecificLiabilityApproved,false);
  assert.equal(a.preparatoryWorkAndCaseLawApproved,false);
  assert.equal(a.allExceptionsAndCompetitionApproved,false);
  assert.equal(a.caseSpecificProsecutionApproved,false);
  assert.equal(a.caseSpecificCustodyApproved,false);
 }
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
assert.equal(stages.filter(c=>c.stageStatus==='unverified').length,0);
const source=read(mod);
const W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES)),clone=JSON.parse(JSON.stringify(all));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB9-2026-10-20')delete c.legalAudit15;
W['BrB:9:11'].text='TAMPERED AUTHORIZATION';
const iso=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W,
 BK_STAGE_SOURCE_REPAIR15:ctx.window.BK_STAGE_SOURCE_REPAIR15}});
vm.runInContext(source,iso);
assert.equal(iso.window.BK_BRB9_BASE_AUDIT15.byKind.inchoate,0);
assert.equal(iso.window.BK_BRB9_BASE_AUDIT15.completed,20);
const W2=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES)),copy2=JSON.parse(JSON.stringify(all));
for(const c of copy2)if(c.legalAudit15?.sourceAudit==='BrB9-2026-10-20')delete c.legalAudit15;
W2['BrB:9:4'].text='TAMPERED EXTORTION';
const iso2=vm.createContext({window:{BK_DATA:{crimes:copy2},BK_STATUTES:W2,
 BK_STAGE_SOURCE_REPAIR15:ctx.window.BK_STAGE_SOURCE_REPAIR15}});
vm.runInContext(source,iso2);
assert.equal(iso2.window.BK_BRB9_BASE_AUDIT15.byKind.objective,7);
assert.equal(iso2.window.BK_BRB9_BASE_AUDIT15.byKind.subjective,7);
assert.equal(iso2.window.BK_BRB9_BASE_AUDIT15.byKind.inchoate,7);
console.log('PASS V1.5: ten BrB9 offences, 30 independent objective, intent, and chapter-9 stage checks with no case approval or false sentencing');
