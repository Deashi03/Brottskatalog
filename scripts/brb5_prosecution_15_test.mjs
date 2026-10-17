import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./brb5-prosecution-review-15.js';
assert.ok(sources.includes(mod)&&sw.includes(mod),'BrB 5:5 must work entirely offline');
assert.ok(sources.indexOf(mod)>sources.indexOf('./prosecution-review-15.js'));
assert.ok(sources.indexOf(mod)<sources.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of sources)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const report=ctx.window.BK_BRB5_PROSECUTION15;
assert.ok(report);
assert.equal(report.reviewed,3,'All three Ch5 categories must be individually checked');
assert.equal(report.missing.length,0);
assert.equal(report.hold.length,0);
const b=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
for(const title of ['Förtal','Grovt förtal','Förolämpning']){
 const c=b.find(x=>x.title===title);
 assert.ok(c,'Missing '+title);
 assert.equal(c.prosecution,'conditional','Ch5 is not unconditional general prosecution');
 assert.match(c.prosecutionRule,/BrB 5:5/);
 assert.equal(c.prosecutionChecked,'2026-10-17');
 assert.ok(c.prosecutionDetails.some(s=>s.includes('under 18')));
 assert.ok(c.prosecutionDetails.some(s=>s.includes('allmän synpunkt')));
 assert.ok(c.prosecutionSourceURL?.includes('riksdagen.se'));
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
const insult=b.find(c=>c.title==='Förolämpning');
assert.ok(insult.prosecutionDetails.some(s=>s.includes('myndighetsutövning')));
assert.ok(insult.prosecutionDetails.some(s=>s.includes('diskrimineringsgrunder')));
const official=b.find(c=>c.title==='Förolämpning mot tjänsteman');
assert.ok(official&&official.statute==='BrB:17:3');
assert.notEqual(official.prosecutionReviewStatus,'statute-prosecution-5:5-individual-source-checked',
 'New Chapter 17:3 offence must not be categorized as Chapter 5:3');
const law=ctx.window.BK_STATUTES['BrB:5:5'];
assert.ok(law.text.includes('den avlidnes efterlevande'));
assert.ok(law.text.includes('regeringen'));
assert.equal(law.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
// Source drift or mismatch must result in a hold rather than false verified metadata.
const testRows=['Förtal','Grovt förtal','Förolämpning'].map((title,i)=>({
 title,statute:'BrB:5:'+(i+1),prosecution:'unknown',prosecutionReviewStatus:'none'
}));
const synthetic={BK_DATA:{crimes:testRows},BK_STATUTES:{'BrB:5:5':{
 complete:false,checked:'2026-10-17',text:'old or missing text'
}}};
vm.runInNewContext(fs.readFileSync(path.join(root,mod),'utf8'),{window:synthetic,console});
assert.equal(synthetic.BK_BRB5_PROSECUTION15.reviewed,0);
assert.equal(synthetic.BK_BRB5_PROSECUTION15.hold.length,3);
assert.ok(testRows.every(c=>c.prosecution==='unknown'),'Source mismatch must NEVER grant a prosecution approval');
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,12);
const penaltyTitles=["Förtal","Grovt förtal","Förolämpning","Urkundsförfalskning","Förvanskning av urkund","Grov urkundsförfalskning","Märkesförfalskning","Ringa märkesförfalskning","Grov märkesförfalskning","Mened","Grov mened","Osann partsutsaga","Ovarsam utsaga"];
console.log('V1.5 PENALTY SOURCE TRIAGE '+JSON.stringify(penaltyTitles.map(title=>{
 const p=b.find(c=>c.title===title);
 return {title,statute:p?.statute,range:p?.penaltyRange||null,verified:p?.penaltyRangeVerified||false,reviewScope:p?.penaltyReviewScope||null};
})));
console.log('PASS V1.5: BrB 5:5 private prosecution, juvenile/public-interest exceptions, official-offence separation and source holds');
