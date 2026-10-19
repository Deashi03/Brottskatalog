import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js'),mod='./brb-grade-stage-source-audit-15.js';
const paths=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(paths.includes(mod)&&sw.includes(mod));
assert.ok(paths.indexOf(mod)>paths.indexOf('./brb-positive-stage-consequences-15.js'));
assert.ok(paths.indexOf(mod)<paths.indexOf('./age14-offence-scope-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline'+i});
for(const p of paths)vm.runInContext(read(p),ctx,{filename:p});
const r=ctx.window.BK_BRB_GRADE_STAGE_SOURCE_AUDIT15;
assert.ok(r);
assert.equal(r.planned,21);
assert.equal(r.scopeApproved,21,JSON.stringify(r));
assert.equal(r.consequencesApproved,21);
assert.equal(r.preliminaryStatusResolved,15);
assert.equal(r.held.length,0,JSON.stringify(r.held));
assert.equal(r.byParent.length,9);
assert.ok(r.byParent.every(x=>x.approved===x.expected&&x.held===0));
for(const k of ['finalLegalLiabilityApprovals','automaticPenaltyApprovals','automaticProsecutionApprovals','automaticCoercionApprovals'])assert.equal(r[k],0);
const all=ctx.window.BK_DATA.crimes,stages=all.filter(c=>c.stageType);
assert.equal(stages.length,1086);
assert.equal(stages.filter(c=>c.stageStatus==='unverified').length,0);
const parents=new Map(all.filter(c=>!c.stageType).map(c=>[c.id,c]));
const audited=stages.filter(c=>c.individualLegalAudit15?.scope?.finding==='CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE');
assert.equal(audited.length,21);
assert.equal(stages.filter(c=>c.individualLegalAudit15?.scope?.status==='APPROVED'&&c.individualLegalAudit15?.consequences?.status==='APPROVED').length,1086);
for(const c of audited){
 const a=c.individualLegalAudit15,p=parents.get(c.stageParentId);
 assert.ok(p);assert.equal(c.stageStatus,'punishable');
 assert.equal(c.custody,'unknown');assert.equal(c.penaltyRange,null);
 assert.equal(c.stagePenaltyLower,null);assert.equal(c.stagePenaltyUpper,null);
 assert.equal(a.scope.parentStatute,p.statute);
 assert.equal(a.scope.caseSpecificLiabilityApproved,false);
 assert.equal(a.scope.historicApplicabilityApproved,false);
 assert.equal(a.scope.chapter23ConditionsReviewed,false);
 assert.equal(a.scope.coercionApproved,false);
 assert.equal(a.consequences.punishmentRangeApproved,false);
 assert.equal(a.consequences.prosecutionAuthorityApproved,false);
 assert.equal(a.consequences.automaticCoercionApproved,false);
 assert.equal(a.consequences.individualLegalLiabilityApproved,false);
 assert.equal(a.consequences.specificPenaltyRange,null);
 assert.equal(c.stageEvidence15.finalLegalConclusionApproved,false);
}
// A current-law grade-stage result must NOT reach the old green four-year
// offence-attempt shortcut without independent case and coercion evaluation.
const fourYear=audited.filter(c=>c.stageType==='forsok'&&Number(c.stageParentMin)>=4&&!c.applicabilityConditional&&!c.conditionalPenalty);
assert.ok(fourYear.length>=1);
for(const c of audited){
 const baseline=ctx.window.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'});
 assert.equal(baseline.tone,'unknown',c.title);
}
for(const c of fourYear){
 const threshold=ctx.window.BK_COERCIVE.score(c,{id:'medtagande-omrade',scale:'four'});
 assert.equal(threshold.tone,'conditional',c.title);
}
assert.equal(ctx.window.BK_AGE14_CANDIDATE_SOURCE_AUDIT15.sourceReviewed,86);
assert.equal(ctx.window.BK_AGE14_CANDIDATE_SOURCE_AUDIT15.unresolved.length,0);
// Negative-control: reset each of the 21 newly approved cards, then corrupt
// two primary legal sources and verify no reapproval for affected chapters.
const copy=JSON.parse(JSON.stringify(all));
const contested=new Set(['Grovt spridande av gift eller smitta','Grov kapning','Grovt sjö- eller luftfartssabotage','Grovt flygplatssabotage','Grovt våld eller hot mot förman']);
for(const c of copy){
 if(c.individualLegalAudit15?.scope?.finding!=='CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE')continue;
 if(contested.has(parents.get(c.stageParentId)?.title)){
  c.stageStatus='unverified';c.stageReviewDate=null;
 }
 delete c.individualLegalAudit15;
}
const W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
W['BrB:13:12'].text='UNTRUSTED';
W['BrB:21:8'].text='UNTRUSTED';
const iso=vm.createContext({window:{BK_DATA:{crimes:copy},BK_STATUTES:W}});
vm.runInContext(read(mod),iso,{filename:mod});
assert.equal(iso.window.BK_BRB_GRADE_STAGE_SOURCE_AUDIT15.scopeApproved,6);
assert.equal(copy.filter(c=>c.stageType&&c.stageStatus==='unverified').length,15);
assert.ok(iso.window.BK_BRB_GRADE_STAGE_SOURCE_AUDIT15.held.length>=15);
console.log('PASS: 21 current-BrB grade-stage scope/consequence pairs, 15 previously uncertain classifications; no sentence, custody, youth-liability or offence-date approval');
