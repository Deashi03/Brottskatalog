import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod='./special-other-penalty-grades-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf('./special-penalty-grade-audit-15.js')&&scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const report=ctx.window.BK_SPECIAL_OTHER_GRADES15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(report&&report.planned===23&&report.reviewed===23&&report.held.length===0&&report.mismatch.length===0&&report.missing.length===0,JSON.stringify(report));
const rows=base.filter(c=>c.penaltyReviewScope==='individual-current-special-statute-grade-range-only');assert.equal(rows.length,23);
for(const c of rows){
 assert.equal(c.penaltyGradeReviewDate,'2026-10-18');assert.ok(c.penaltyGradeReviewSource.startsWith('https://'));
 assert.equal(c.penaltyRangeVerified,true);assert.equal(c.penaltyReviewSafety.includes('Only numeric'),true);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
 const verifiedNames=new Set(['Bidragsbrott','Ringa bidragsbrott','Grovt bidragsbrott','Vårdslöst bidragsbrott',
  'Skattebrott','Skatteförseelse','Grovt skattebrott','Vårdslös skatteuppgift','Skatteavdragsbrott',
  'Skatteredovisningsbrott','Vårdslös skatteredovisning','Försvårande av skattekontroll',
  'Grovt försvårande av skattekontroll']);
 if(verifiedNames.has(c.title)||c.lawProvenance==='current-official-SFS-direct-paragraph-review-with-locked-complete-extract-fingerprint'){
  assert.equal(c.lawCompletenessVerified,true,'New independent SFS paragraph audit: '+c.title);
  assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');
  assert.ok(c.lawCompletenessSourceURL?.includes('riksdagen.se'));
  assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
 }else assert.notEqual(c.lawCompletenessVerified,true);
}
assert.equal(base.find(c=>c.title==='Grovt penningtvättsbrott').penaltyRange.min,1);
assert.equal(base.find(c=>c.title==='Grovt bidragsbrott').penaltyRange.min,1);
assert.equal(base.find(c=>c.title==='Skatteförseelse').penaltyRange.max,0);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
console.log('PASS V1.5: 23 numerically source-compared BidrBrL/PTBL/SkBrL/LBE grades, no full legal or coerced approval');