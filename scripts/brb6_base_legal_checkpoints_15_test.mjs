import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),module='./brb6-base-legal-checkpoints-15.js';
const html=read('index.html'),sw=read('service-worker.js'),scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(module)&&sw.includes(module));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const f of scripts)vm.runInContext(read(f),ctx,{filename:f});
const r=ctx.window.BK_BRB6_BASE_AUDIT15;
assert.ok(r);assert.equal(r.planned,38);assert.equal(r.completed,38,JSON.stringify(r));
assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.deepEqual(JSON.parse(JSON.stringify(r.byType)),{objective:19,subjective:19});
const cards=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType&&c.legalAudit15?.sourceAudit==='BrB6-2026-10-20');
assert.equal(cards.length,19);
for(const c of cards){const a=c.legalAudit15;assert.equal(a.fullLegalReviewApproved,false);
 assert.equal(a.legalVersionAndCaseLawPending,true);assert.equal(a.minorAgeDifferenceExceptionsPending,true);
 for(const key of ['objective','subjective']){const v=a.checkpoints[key];assert.equal(v.status,'APPROVED');
 assert.equal(v.checked,'2026-10-20');assert.ok(v.finding.length>=115);assert.equal(v.caseSpecificLiabilityApproved,false);
 assert.equal(v.applicableHistoricalVersionApproved,false);assert.equal(v.consentAndAgeFactsVerified,false);
 assert.equal(v.caseLawApproved,false);assert.equal(v.allExceptionsIncluding6_14Approved,false);
 assert.equal(v.chapter6StageApproved,false);assert.equal(v.chargeConditionsApproved,false);
 assert.equal(v.custodyApproved,false);}}
for(const title of ['Våldtäkt mot barn','Sexuellt utnyttjande av barn','Utnyttjande av barn genom köp av sexuell handling']){
 assert.match(cards.find(c=>c.title===title).legalAudit15.checkpoints.subjective.finding,/OAKTSAM/);
}
const clone=JSON.parse(JSON.stringify(ctx.window.BK_DATA.crimes)),W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
for(const c of clone)if(c.legalAudit15?.sourceAudit==='BrB6-2026-10-20')delete c.legalAudit15;
W['BrB:6:13'].text='TAMPERED AGE';const iso=vm.createContext({window:{BK_DATA:{crimes:clone},BK_STATUTES:W}});
vm.runInContext(read(module),iso);assert.ok(iso.window.BK_BRB6_BASE_AUDIT15.completed<r.completed);
console.log('PASS: 38 separately statutory BrB6 act and culpability checks, age exception fail closed, no operational approvals');
