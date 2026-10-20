import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const module='./age14-offence-scope-15.js';
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(srcs.includes(module)&&sw.includes(module),'BrB 1:6 age14 safeguards must be bundled offline');
assert.ok(srcs.indexOf(module)>srcs.indexOf('./stage-scope-15.js'),'Read actual settled/unsettled stages first');
assert.ok(srcs.indexOf(module)<srcs.indexOf('./quality-11.js'),'Rule must be ready before UI');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of srcs)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const D=ctx.window.BK_DATA,stat=ctx.window.BK_AGE14_15;
assert.ok(stat);
assert.equal(stat.total,1485);
assert.equal(stat.base,390);
assert.equal(stat.stages,1095);
assert.equal(stat.from,'2026-09-10');
assert.equal(stat.toExclusive,'2031-09-10');
assert.equal(ctx.window.BK_STATUTES['BrB:1:6'].complete,true);
assert.ok(ctx.window.BK_STATUTES['BrB:1:6'].text.includes('fyra år'));
assert.ok(ctx.window.BK_STATUTES['BrB:1:6'].text.includes('Lag (2026:1555)'));
assert.ok(D.crimes.every(c=>c.age14Exception15?.neverApprovesCoerciveMeasures===true));
assert.ok(D.crimes.every(c=>c.age14Exception15?.caseSpecificApplicationApproved===false));
assert.ok(D.crimes.every(c=>c.age14Exception15?.provisionalOnly===true));
assert.ok(D.crimes.every(c=>c.age14Exception15?.neverApprovesInchoateCriminalization===true));
const by=t=>D.crimes.find(c=>!c.stageType&&c.title===t);
const robbery=by('Grovt rån');
assert.equal(robbery.penaltyRange.min,5);
assert.equal(robbery.age14Exception15.status,'minimum-threshold-met',
 'Individually reviewed 5-year minimum satisfies 4-year threshold');
const attempt=D.crimes.find(c=>c.stageType==='forsok'&&c.stageParentId===robbery.id);
assert.ok(attempt&&attempt.stageStatus==='punishable');
assert.equal(attempt.age14Exception15.status,'minimum-threshold-met');
assert.equal(attempt.age14Exception15.referenceIsCompletedOffence,true);
assert.equal(attempt.age14Exception15.completedOffenceMinimumYears,5,
 'Attempt uses FULL offence minimum, not lesser inchoate penalty');
assert.equal(by('Stöld').age14Exception15.status,'minimum-threshold-not-met');
assert.equal(by('Grovt tjänstefel').age14Exception15.status,'minimum-threshold-not-met');
const unresolved=D.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified');
assert.equal(unresolved.length,0);
assert.ok(unresolved.every(c=>c.age14Exception15.status==='inchoate-unverified'));
assert.ok(unresolved.every(c=>c.custody==='unknown'));
const panel=html.indexOf("accordion('age14','Särskild påföljdsregel vid 14 år'");
const details=html.indexOf("accordion('relaterade','Relaterade brott'");
const sources=html.indexOf("accordion('sources','Rättskällor");
assert.ok(details<panel&&panel<sources,'Age law panel stays near bottom to preserve fast police UI');
assert.ok(html.includes('Gärningsåldern, inte åldern vid rättegången'));
assert.ok(html.includes('Ingen automatisk bedömning av gripande, anhållande eller häktning'));
const source=fs.readFileSync(path.join(root,module),'utf8');
// Synthetic edge cases: actual statute minimum, inchoate authorization,
// conditional applicability, and missing legal penalty review are different.
const original=()=>({
 id:'a',title:'Syntetiskt kvalificerat brott',
 shortRef:'BrB 3:1',penaltyRange:{min:4,max:8,fines:false,life:false},
 penaltyRangeVerified:true,penaltyReviewScope:'individual-current-grade-range-only',
 penaltyGradeReviewDate:'2026-10-17',
 penaltyGradeReviewSource:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/'
});
const p=original(),small={...original(),id:'b',penaltyRange:{min:3.99,max:8}},
 pending={...original(),id:'c',penaltyRangeVerified:false},
 qualifiedStage={id:'stage-yes',stageType:'forsok',stageParentId:'a',stageStatus:'punishable',penaltyRange:{min:0,max:4}},
 unknownStage={id:'stage-question',stageType:'stampling',stageParentId:'a',stageStatus:'unverified'},
 notPunishable={id:'stage-no',stageType:'forberedelse',stageParentId:'a',stageStatus:'not-criminalized'},
 conditional={...original(),id:'war',applicabilityConditional:true};
const crimes=[p,small,pending,qualifiedStage,unknownStage,notPunishable,conditional];
const w={BK_DATA:{crimes},BK_STATUTES:{}};
vm.runInNewContext(source,{window:w,console},{filename:module});
const get=id=>crimes.find(x=>x.id===id).age14Exception15;
assert.equal(get('a').status,'minimum-threshold-met');
assert.equal(get('b').status,'minimum-threshold-not-met');
assert.equal(get('c').status,'underlying-penalty-review-required');
assert.equal(get('war').status,'conditional-applicability');
assert.equal(get('stage-yes').completedOffenceMinimumYears,4);
assert.equal(get('stage-yes').status,'minimum-threshold-met');
assert.equal(get('stage-question').status,'inchoate-unverified');
assert.equal(get('stage-no').status,'inchoate-not-established');
assert.equal(w.BK_AGE14_15.total,7);
assert.equal(w.BK_AGE14_15.thresholdMet,2);
console.log('PASS V1.5: BrB 1:6 offence-age window, 4-year completed minimum, stage-authorization uncertainties and no coercion approval');
