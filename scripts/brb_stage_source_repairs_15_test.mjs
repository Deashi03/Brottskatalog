import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(files.includes('./brb-stage-source-repairs-15.js'));
assert.ok(files.indexOf('./brb-stage-source-repairs-15.js')<files.indexOf('./stages-08.js'));
assert.ok(sw.includes('./brb-stage-source-repairs-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of files)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const rep=ctx.window.BK_STAGE_SOURCE_REPAIR15;
assert.ok(rep&&rep.refs.length===3);
assert.ok(rep.restored>=1);
const s=ctx.window.BK_STATUTES;
for(const key of ['BrB:9:11','BrB:19:9','BrB:19:14']){
 assert.ok(s[key]?.complete&&s[key]?.machine===false,key+' must be verified complete');
 assert.ok(s[key].text.includes('Lag ('),'Statute amendment note missing '+key);
}
assert.ok(s['BrB:9:11'].text.includes('23 kap. 3 § ska dock inte gälla'),'Special extortion withdrawal exception missing');
assert.ok(s['BrB:9:11'].text.includes('för att bedra försäkringsgivare'),'Insurance fraud preparatory act omitted');
assert.ok(s['BrB:19:14'].text.includes('Som stämpling till högförräderi'),'Wartime inchoate scope missing');
assert.ok(s['BrB:19:14'].text.includes('borde ha insett'),'Disclosure-prevention duty negligent variant missing');
assert.ok(s['BrB:19:9'].text.includes('om Sverige var i krig'),'Wartime alternative penalty absent');
assert.ok(s['BrB:19:9'].text.includes('försvarlig'),'Justification exception absent');
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const linked=base.filter(c=>c.statute==='BrB:19:9');
assert.ok(linked.length>=1,'Vårdslöshet med hemlig uppgift must have a search card');
for(const c of linked){
 assert.ok(c.conditionalPenalty&&c.custody==='unknown','Wartime-sensitive imprisonment cannot be automatically presented as unconditional');
 assert.equal(c.law,s['BrB:19:9'].text);
 assert.equal(c.penaltyRangeVerified,false,'Do not treat one numeric range as exhaustive when alternate wartime maximum applies');
 assert.ok(c.rekvisit15?.groups?.length>=4,'Gross negligence and exception checkboxes must be present');
 assert.ok(c.rekvisit15.groups.some(g=>g.label.includes('grov oaktsamhet')),'Never accidentally use mere negligence');
}
assert.ok(ctx.window.BK_DATA.crimes.filter(c=>c.stageType).length>1000);
const uncertain=ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified');
assert.equal(uncertain.length,0,'Source-repaired grade stages require a later separately evidenced stage audit');
assert.equal(ctx.window.BK_STAGE_SCOPE15.gradeEvidenceAdded,12,
 'All twelve ambiguous grades must receive specific, source-linked evidence');
// Historical bibliography from the earlier conservative hold must survive
// the later, separately evidenced CURRENT-SFS grade-stage classification.
// No full offence-date or case-specific approval is implied.
const carried=ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageEvidence15?.preliminaryAssessment);
assert.equal(carried.length,15,'All fifteen historical gross-grade evidence files, including the separately held poison triad, must survive source review');
assert.equal(carried.filter(c=>c.stageEvidence15?.preparatorySource?.includes('riksdagen.se')).length,9,
 'Nine BrB 13:12 grade questions must retain the SOU 2024:55 source');
assert.equal(carried.filter(c=>c.stageEvidence15?.legalProvisions?.some(s=>s.includes('21:15'))).length,3,
 'Three BrB 21:15 grade questions must retain the wartime references');
for(const c of carried){
 assert.ok(c.stageEvidence15?.officialSource?.includes('riksdagen.se'),c.title);
 assert.equal(c.stageEvidence15.finalLegalConclusionApproved,false);
 assert.equal(c.stageStatus,'punishable','Current statutory named-grade scope was separately checked later');
 assert.equal(c.individualLegalAudit15?.scope?.status,'APPROVED');
 assert.equal(c.individualLegalAudit15?.scope?.caseSpecificLiabilityApproved,false);
 assert.equal(c.individualLegalAudit15?.consequences?.punishmentRangeApproved,false);
 assert.equal(c.custody,'unknown','Never infer coercive authorization from current grade coverage');
 if(c.stageWartimePenaltyReview15){const expected={min:0,max:6,fines:true,life:false};if(c.stageType!=="forsok")expected.maxExclusive=true;assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),expected);assert.equal(c.applicabilityConditional,true);assert.equal(c.stageWartimePenaltyReview15.applicabilityApproved,false);}else if(c.stageIntervalReview15){assert.equal(c.stageType,"forsok");assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),{min:1/12,max:18,fines:false,life:true});assert.equal(c.stageIntervalReview15.fullLegalReviewApproved,false);}else if(c.stagePreparationPenaltyReview15){assert.ok(["forberedelse","stampling"].includes(c.stageType));assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),{min:0,max:18,fines:true,life:false});assert.equal(c.stagePreparationPenaltyReview15.fullLegalReviewApproved,false);}else assert.equal(c.penaltyRange,null);
}
console.log('PASS V1.5: 9:11 and 19:14 complete stage-support provisions, 19:9 exception and neutral conditional imprisonment');