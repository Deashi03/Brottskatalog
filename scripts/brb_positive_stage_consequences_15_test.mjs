import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./brb-positive-stage-consequences-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb-positive-stage-source-audit-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./age14-offence-scope-15.js'));
const inline=[...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const p of scripts)vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const r=ctx.window.BK_BRB_POSITIVE_STAGE_CONSEQUENCES15;
assert.equal(r.planned,301);assert.equal(r.approved,301);assert.equal(r.held.length,0);
assert.equal(r.automaticPenaltyApprovals,0);assert.equal(r.automaticProsecutionApprovals,0);
assert.equal(r.automaticCoercionApprovals,0);assert.equal(r.finalLegalApprovals,0);
const stages=ctx.window.BK_DATA.crimes.filter(c=>c.stageType);
const audited=stages.filter(c=>c.individualLegalAudit15?.consequences?.finding==='LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS');
assert.ok(audited.length>=301);
for(const c of audited){const a=c.individualLegalAudit15.consequences;
 assert.equal(a.status,'APPROVED');assert.equal(a.namedOffenceOnly,true);
 assert.equal(a.automaticCoercionApproved,false);assert.equal(a.punishmentRangeApproved,false);
 assert.equal(a.prosecutionAuthorityApproved,false);assert.equal(a.historicLawApproved===true,false);
 assert.equal(a.specificPenaltyRange,null);assert.equal(c.custody,'unknown');
}
const copy=JSON.parse(JSON.stringify(ctx.window.BK_DATA.crimes));
for(const c of copy)if(c.individualLegalAudit15?.scope?.finding==='CURRENT_BRB_CHAPTER_EXPLICIT_INCHOATE_LISTING')delete c.individualLegalAudit15.consequences;
const statutes=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
statutes['BrB:9:11'].text='ALTERED INCHOATE AUTHORIZATION';
const iso=vm.createContext({window:{BK_DATA:{crimes:copy},BK_STATUTES:statutes,
 BK_BRB_POSITIVE_STAGE_SOURCE_AUDIT15:ctx.window.BK_BRB_POSITIVE_STAGE_SOURCE_AUDIT15,
 BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15:ctx.window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15}});
vm.runInContext(fs.readFileSync(path.join(root,mod),'utf8'),iso);
assert.equal(iso.window.BK_BRB_POSITIVE_STAGE_CONSEQUENCES15.byChapter['9'].approved,0);
assert.equal(copy.filter(c=>c.statute?.startsWith('BrB:9:')&&c.individualLegalAudit15?.consequences?.finding==='LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS').length,0);
console.log('PASS V1.5: 301 individually gated BrB stage consequence boundaries, no approved numeric sentences, historic applicability, prosecution or coercion');
