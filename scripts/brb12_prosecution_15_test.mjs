import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const module='./brb12-prosecution-review-15.js';
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(sources.includes(module)&&sw.includes(module),'BrB 12:6 charging check must work offline');
assert.ok(sources.indexOf(module)>sources.indexOf('./brb8-near-relative-prosecution-15.js'));
assert.ok(sources.indexOf(module)<sources.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of sources)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const report=ctx.window.BK_BRB12_PROSECUTION15;
assert.ok(report);
assert.equal(report.reviewed,3,'All three limited-charge offences must be explicitly source-checked');
assert.equal(report.held.length,0,JSON.stringify(report.held));
assert.equal(report.missing.length,0,JSON.stringify(report.missing));
const cards=ctx.window.BK_DATA.crimes;
const by=t=>cards.find(c=>!c.stageType&&c.title===t);
for(const [title,ref] of [['Ringa skadegörelse','BrB:12:2'],['Åverkan','BrB:12:2a'],['Tagande av olovlig väg','BrB:12:4']]){
 const c=by(title);
 assert.ok(c,'Missing '+title);
 assert.equal(c.statute,ref);
 assert.equal(c.prosecution,'conditional');
 assert.equal(c.prosecutionChecked,'2026-10-17');
 assert.match(c.prosecutionRule,/BrB 12:6/);
 assert.ok(c.prosecutionDetails.some(x=>x.includes('endast när brottet enbart kränker enskilds rätt')));
 assert.ok(c.prosecutionDetails.some(x=>x.includes('särskilda skäl')));
 assert.ok(c.prosecutionDetails.some(x=>x.includes('allmän synpunkt')));
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
for(const title of ['Skadegörelse','Grov skadegörelse']){
 const c=by(title);assert.ok(c,'Missing '+title);
 assert.notEqual(c.prosecutionReviewStatus,'section-12:6-private-right-condition-statute-checked',
  'BrB 12:6 does not cover normal/gross skadegörelse');
}
assert.equal(report.stageEntriesModified,0);
assert.equal(cards.filter(c=>c.stageType&&c.stageStatus==='unverified').length,12);
const statute=ctx.window.BK_STATUTES['BrB:12:6'];
assert.ok(statute?.text.includes('endast kränker enskilds rätt'));
assert.equal(statute.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
const source=fs.readFileSync(path.join(root,module),'utf8');
const bogus=[{title:'Åverkan',statute:'BrB:12:2a',prosecution:'unknown'}];
const simulated={window:{BK_DATA:{crimes:bogus},BK_STATUTES:{
 'BrB:12:2a':{checked:'2026-10-17',completeTextProvenance:'manual-crosscheck-current-SFS-paragraph-only'},
 'BrB:12:6':{complete:false,text:'incomplete'}
}},console};
vm.runInNewContext(source,simulated,{filename:module});
assert.equal(bogus[0].prosecution,'unknown','Never stamp special prosecution approval from incomplete 12:6');
assert.equal(simulated.window.BK_BRB12_PROSECUTION15.held.length,1);
console.log('PASS V1.5: BrB 12:6 ringa damage, åverkan and unlawful passage private-right prosecution conditions');
