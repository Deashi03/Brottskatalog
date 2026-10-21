import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const mod='./brb8-near-relative-prosecution-15.js';
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(srcs.includes(mod)&&sw.includes(mod),'BrB 8:13 relatives rules must work offline');
assert.ok(srcs.indexOf(mod)>srcs.indexOf('./brb10-prosecution-review-15.js'));
assert.ok(srcs.indexOf(mod)<srcs.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of srcs)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const D=ctx.window.BK_DATA,stats=ctx.window.BK_BRB8_PROSECUTION15;
assert.ok(stats,'Missing special prosecution report');
const base=D.crimes.filter(c=>!c.stageType);
const by=t=>base.find(c=>c.title===t);
const expected=['Stöld','Ringa stöld','Tillgrepp av fortskaffningsmedel','Egenmäktigt förfarande','Grovt egenmäktigt förfarande','Självtäkt','Olovlig energiavledning','Häleri','Grovt häleri','Häleriförseelse'];
for(const title of expected){
 const c=by(title);assert.ok(c,'Expected card '+title);
 assert.equal(c.prosecution,'conditional','Near-relative BrB 8:13 should be clearly conditional: '+title);
 assert.match(c.prosecutionRule,/BrB 8:13/);
 assert.ok(c.prosecutionDetails.some(x=>x.includes('målsäganden angett')));
 assert.ok(c.prosecutionDetails.some(x=>x.includes('allmän synpunkt')));
 assert.equal(c.prosecutionChecked,'2026-10-17');
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
const excludes=['Grov stöld','Inbrottsstöld','Rån','Grovt rån'];
for(const title of excludes){
 const c=by(title);assert.ok(c,'Missing '+title);
 assert.notEqual(c.prosecutionReviewStatus,'statute-8:13-near-relative-condition-source-checked',
  'BrB 8:13 expressly excludes '+title);
}
for(const title of ['Utförselhäleri','Grovt utförselhäleri']){
 const c=by(title);if(!c)continue;
 assert.notEqual(c.prosecutionReviewStatus,'statute-8:13-near-relative-condition-source-checked',
  '8:13 mentions häleri/häleriförseelse, not 9:6a; do not extrapolate without independent source');
}
assert.ok(stats.scoped>=10,'Expected 8 and 9 chapter source-reviewed covered crimes');
assert.ok(stats.excluded>=4,'All four excluded categories should remain outside scope');
assert.ok(stats.held.every(x=>!expected.includes(x.title)),
 'Do not claim named covered cards are source-checked if their paragraph has not been examined');
assert.equal(stats.stageEntriesModified,0);
assert.equal(D.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,0);
const w=ctx.window.BK_STATUTES;
assert.equal(w['BrB:8:13'].completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
assert.ok(w['BrB:8:13'].text.includes('häleri eller häleriförseelse'));
assert.ok(w['BrB:8:12'].text.includes('stämpling till grov stöld eller inbrottsstöld'));
const source=fs.readFileSync(path.join(root,mod),'utf8');
const synthetic=[{title:'Självtäkt',statute:'BrB:8:9',prosecution:'unknown'}];
vm.runInNewContext(source,{window:{BK_DATA:{crimes:synthetic},BK_STATUTES:{
 'BrB:8:9':{complete:true,checked:'2026-10-17',completeTextProvenance:'manual-crosscheck-current-SFS-paragraph-only'},
 'BrB:8:13':{complete:false,checked:'2026-10-17'}
}},console},{filename:mod});
assert.equal(synthetic[0].prosecution,'unknown','No charging upgrade based on incomplete special rule');
console.log('PASS V1.5: BrB 8:13 near-relative prosecution scope, robbery exclusions, häleri inclusion and source holds');
