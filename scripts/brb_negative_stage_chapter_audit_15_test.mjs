import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const mod='./brb-negative-stage-chapter-audit-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb13-poison-stage-scope-hold-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./age14-offence-scope-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const r=ctx.window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15;
console.log('V1.5 EIGHT BRB CHAPTER SOURCE AUDIT '+JSON.stringify(r));
assert.deepEqual(Array.from(r.expectedChapters),[3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20]);
assert.equal(r.scopeApproved,r.consequencesApproved);
assert.equal(r.finalCaseLiabilityApprovals,0);
assert.equal(r.approvedAutomaticCoercionDecisions,0);
assert.ok(r.scopeApproved>=100,'Insufficient independently source-checked negative stage cards');
const cards=ctx.window.BK_DATA.crimes,stages=cards.filter(c=>c.stageType);
assert.equal(cards.length,1473);assert.equal(stages.length,1086);
assert.equal(stages.filter(c=>c.stageStatus==='unverified').length,15);
const approved=stages.filter(c=>c.individualLegalAudit15?.scope?.finding==='NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER');
assert.equal(approved.length,r.scopeApproved);
for(const c of approved){
 const a=c.individualLegalAudit15;
 assert.equal(c.stageStatus,'not-criminalized');
 assert.equal(a.scope.status,'APPROVED');
 assert.equal(a.scope.caseSpecificLiabilityApproved,false);
 assert.equal(a.scope.historicApplicabilityApproved,false);
 assert.equal(a.scope.excludesOtherOffences,false);
 assert.equal(a.scope.coercionApproved,false);
 assert.equal(a.consequences.status,'APPROVED');
 assert.equal(a.consequences.punishmentRangeApproved,false);
 assert.equal(a.consequences.automaticCoercionApproved,false);
 assert.equal(a.consequences.prosecutionAuthorizationApproved,false);
 assert.equal(a.consequences.otherOffencesMayApply,true);
 assert.equal(c.custody,'unknown');
}
const positive=stages.filter(c=>c.stageStatus==='punishable'&&c.individualLegalAudit15?.scope?.finding==='NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER');
assert.equal(positive.length,0);
// Negative-control: a tampered authorizing paragraph must invalidate its
// entire chapter's source review; the modification cannot elevate cards.
const copy=JSON.parse(JSON.stringify(cards));
for(const c of copy)if(c.individualLegalAudit15?.scope?.finding==='NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER')
 delete c.individualLegalAudit15;
const statutes=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
statutes['BrB:15:15'].text='ALTERED SOURCE NOT LEGALLY VERIFIED';
const isolated=vm.createContext({window:{BK_DATA:{crimes:copy},BK_STATUTES:statutes}});
vm.runInContext(fs.readFileSync(path.join(root,mod),'utf8'),isolated);
assert.equal(isolated.window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15.byChapter['15'].approved,0);
assert.equal(copy.filter(c=>c.individualLegalAudit15?.scope?.finding==='NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER'&&c.statute?.startsWith('BrB:15:')).length,0);
console.log('PASS V1.5: BrB chapter-by-chapter limited negative source and consequence checks, all 15 contested stages still open');
