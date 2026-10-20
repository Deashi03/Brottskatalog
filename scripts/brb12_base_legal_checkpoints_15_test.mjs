import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=x=>fs.readFileSync(path.join(root,x),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const name='./brb12-base-legal-checkpoints-15.js',src=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(src.includes(name)&&sw.includes(name));
assert.ok(src.indexOf(name)>src.indexOf('./brb12-prosecution-review-15.js'));
assert.ok(src.indexOf(name)<src.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of src)vm.runInContext(read(s),ctx,{filename:s});
const report=ctx.window.BK_BRB12_BASE_AUDIT15;
assert.ok(report,'Missing BrB12 individual audit report');
assert.equal(report.planned,25);
assert.equal(report.completed,25,JSON.stringify(report));
assert.equal(report.held.length,0,JSON.stringify(report.held));
assert.equal(report.byCrime.length,5);
for(const k of ['objective','subjective','grade','inchoate','prosecution'])assert.equal(report.perType[k],5);
for(const k of ['legalCompleteCards','caseLiabilityApproved','coercionApprovals','historicLawApprovals','jurisprudenceApprovals'])assert.equal(report[k],0);
const all=ctx.window.BK_DATA.crimes,parents=all.filter(x=>!x.stageType);
const titles=['Skadegörelse','Ringa skadegörelse','Grov skadegörelse','Åverkan','Tagande av olovlig väg'];
const approved=parents.filter(c=>c.legalAudit15?.sourceAudit==='BrB12-2026-10-20');
assert.equal(approved.length,5);
assert.equal(parents.filter(c=>c.legalAudit15?.fullLegalReviewApproved===true).length,0);
for(const title of titles){
 const c=approved.find(x=>x.title===title);assert.ok(c,title);
 assert.equal(c.legalAudit15.relevantCaseLawStillPending,true);
 assert.equal(c.legalAudit15.historicalOffenceDateStillPending,true);
 assert.equal(c.legalAudit15.coercionDecisionStillPending,true);
 assert.equal(c.legalAudit15.competitionAndExceptionsStillPending,true);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
 const steps=c.legalAudit15.checkpoints;assert.deepEqual(Object.keys(steps),['objective','subjective','grade','inchoate','prosecution','coercion']);
 for(const [key,x] of Object.entries(steps)){
  assert.equal(x.status,'APPROVED');assert.equal(x.checked,'2026-10-20');
  assert.ok(x.sourceURL.includes('riksdagen.se'));
  assert.ok(x.finding.length>=95);
  assert.ok(x.sources.length>0);
  assert.equal(x.caseFactsEvaluated,false);assert.equal(x.offenceDateResolved,false);
  assert.equal(x.caseSpecificCustodyApproved,false);assert.equal(x.substantiveCaseLawReviewed,false);
  assert.equal(x.automaticOperationalAdviceApproved,false);
 }
}
const st=all.filter(c=>c.stageType);
assert.equal(st.filter(c=>c.stageStatus==='unverified').length,0);
assert.equal(st.filter(c=>c.individualLegalAudit15?.scope?.status==='APPROVED').length,1167);
// Primary-source tampering must block only the relevant independent review.
const source=read(name),clone=JSON.parse(JSON.stringify(all)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB12-2026-10-20')delete c.legalAudit15;
W['BrB:12:5'].text='TAMPERED UNVERIFIED';
const isolated=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(source,isolated);
assert.equal(isolated.window.BK_BRB12_BASE_AUDIT15.perType.inchoate,0);
assert.equal(isolated.window.BK_BRB12_BASE_AUDIT15.completed,20);
assert.ok(isolated.window.BK_BRB12_BASE_AUDIT15.held.length===5);
const W2=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES)),clone2=JSON.parse(JSON.stringify(all));
for(const c of clone2)if(c.legalAudit15?.sourceAudit==='BrB12-2026-10-20')delete c.legalAudit15;
W2['BrB:12:3'].text='CORRUPTED';
const isolated2=vm.createContext({window:{BK_DATA:{crimes:clone2},BK_STATUTES:W2}});
vm.runInContext(source,isolated2);
assert.equal(isolated2.window.BK_BRB12_BASE_AUDIT15.perType.grade,0);
assert.equal(isolated2.window.BK_BRB12_BASE_AUDIT15.perType.objective,4);
// A fabricated earlier checkpoint must not be overwritten by a new review.
// Start with a fresh clone; the previous tamper control has already mutated clone2.
const clone3=JSON.parse(JSON.stringify(all));
for(const c of clone3)if(c.legalAudit15?.sourceAudit==='BrB12-2026-10-20')delete c.legalAudit15;
const bad=clone3.find(c=>c.title==='Skadegörelse'&&!c.stageType);
bad.legalAudit15={checkpoints:{objective:{status:'APPROVED',checked:'1900-01-01'}}};
const iso3=vm.createContext({window:{BK_DATA:{crimes:clone3},BK_STATUTES:ctx.window.BK_STATUTES}});
vm.runInContext(source,iso3);
assert.equal(bad.legalAudit15.checkpoints.objective.checked,'1900-01-01');
assert.equal(iso3.window.BK_BRB12_BASE_AUDIT15.completed,20);
console.log('PASS V1.5: 25 BrB12 individually source-constrained checkpoints; tamper/duplicate approval regression; full legal review and coercion still blocked');
