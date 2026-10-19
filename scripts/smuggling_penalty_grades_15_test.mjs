import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod='./smuggling-penalty-grades-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf('./special-other-penalty-grades-15.js')&&scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const a=ctx.window.BK_SMUGLL_GRADES15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(a&&a.planned===23&&a.reviewed===23&&a.missing.length===0&&a.held.length===0&&a.mismatch.length===0,JSON.stringify(a));
assert.equal(a.penningboter,3);
const verified=base.filter(c=>c.penaltyReviewScope==='individual-current-smuggling-grade-range-only');assert.equal(verified.length,23);
for(const c of verified){assert.equal(c.penaltyGradeReviewDate,'2026-10-18');assert.equal(c.penaltyRangeVerified,true);assert.equal(c.penaltyGradeReviewSourceVersion,'2026:1321');assert.equal(c.lawCompletenessVerified,true);assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}
for(const t of ['Ringa smuggling','Ringa smuggling av explosiv vara','Ringa tullbrott']){
 const c=verified.find(c=>c.title===t);assert.ok(c);assert.equal(c.penaltyFineType15,'penningböter');assert.equal(c.penaltyRange.max,0);
}
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
console.log('PASS V1.5: 23 full-current numerical SmuglL grades sourced from official 2026:1321, no overbroad stage/penalty signoff');