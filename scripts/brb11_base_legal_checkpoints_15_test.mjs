import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),module='./brb11-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(module)&&sw.includes(module));assert.ok(scripts.indexOf(module)>scripts.indexOf('./brb10-base-legal-checkpoints-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const p of scripts)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB11_BASE_AUDIT15;assert.ok(r);
assert.equal(r.planned,18);assert.equal(r.completed,18,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));assert.equal(r.byOffence.length,9);
assert.deepEqual(JSON.parse(JSON.stringify(r.byType)),{objective:9,subjective:9});
for(const k of ['completeLegalCards','historicApplicabilityApproved','prosecutionApproved','coercionApproved','stageApproved','jurisprudenceApproved'])assert.equal(r[k],0);
const all=ctx.window.BK_DATA.crimes;
const approved=all.filter(c=>!c.stageType&&c.legalAudit15?.sourceAudit==='BrB11-2026-10-20');assert.equal(approved.length,9);
for(const c of approved){
 const a=c.legalAudit15;
 assert.equal(a.fullLegalReviewApproved,false);
 assert.equal(a.historicalLawStillPending,true);assert.equal(a.caseLawStillPending,true);
 assert.equal(a.inchoateAndCompetitionStillPending,true);
 assert.equal(a.prosecutionAndCoercionStillPending,true);
 for(const k of ['objective','subjective']){
  const v=a.checkpoints[k];assert.equal(v.status,'APPROVED');
  assert.equal(v.checked,'2026-10-20');assert.ok(v.finding.length>=110);
  assert.equal(v.caseSpecificLiabilityApproved,false);
  assert.equal(v.caseSpecificCustodyApproved,false);
  assert.equal(v.historicVersionReviewed,false);
  assert.equal(v.doctrineAndPrecedentApproved,false);
  assert.equal(v.offencesInCompetitionAssessed,false);
  assert.equal(v.prosecutionConditionsReviewed,false);
 }
}
assert.match(approved.find(c=>c.title==='Försvårande av konkurs eller exekutiv förrättning').legalAudit15.checkpoints.subjective.finding,/grov oaktsamhet/);
assert.match(approved.find(c=>c.title==='Grovt försvårande av konkurs eller exekutiv förrättning').legalAudit15.checkpoints.subjective.finding,/uttryckligen uppsåt/);
assert.match(approved.find(c=>c.title==='Bokföringsbrott').legalAudit15.checkpoints.subjective.finding,/OAKTSAMT/);
const clone=JSON.parse(JSON.stringify(all)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB11-2026-10-20')delete c.legalAudit15;
W['BrB:11:2'].text='CORRUPTED SOURCE';
const iso=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(read(module),iso);
assert.equal(iso.window.BK_BRB11_BASE_AUDIT15.byType.objective,7);
assert.equal(iso.window.BK_BRB11_BASE_AUDIT15.byType.subjective,7);
assert.equal(iso.window.BK_BRB11_BASE_AUDIT15.held.length,4);
console.log('PASS V1.5: nine BrB11 individual current offence objective/fault reviews; 18 gated checkpoints; exceptions, chronology, charges and custody remain open');
