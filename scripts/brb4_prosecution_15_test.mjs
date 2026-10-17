import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const mod='./brb4-prosecution-review-15.js';
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(srcs.includes(mod)&&sw.includes(mod),'Ch4 charging safeguards must work offline');
assert.ok(srcs.indexOf(mod)>srcs.indexOf('./brb12-prosecution-review-15.js'));
assert.ok(srcs.indexOf(mod)<srcs.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of srcs)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const q=ctx.window.BK_BRB4_PROSECUTION15;
assert.ok(q);
assert.equal(q.planned,8);
assert.equal(q.reviewed,8,'Every Ch4 special-prosecution completed-offence card must pass source guard');
assert.deepEqual(Array.from(q.missing),[]);
assert.deepEqual(Array.from(q.held),[]);
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const by=t=>base.find(c=>c.title===t);
for(const [title,ref] of [
 ['Hemfridsbrott','BrB:4:6'],['Olaga intrång','BrB:4:6'],
 ['Kränkande fotografering','BrB:4:6a'],
 ['Olovlig identitetsanvändning','BrB:4:6b'],
 ['Olaga integritetsintrång','BrB:4:6c'],['Ofredande','BrB:4:7'],
 ['Intrång i förvar','BrB:4:9'],['Olovlig avlyssning','BrB:4:9a']
]){
 const c=by(title);assert.ok(c,'Missing '+title);
 assert.equal(c.statute,ref);
 assert.equal(c.prosecution,'conditional');
 assert.match(c.prosecutionRule,/BrB 4:11/);
 assert.equal(c.prosecutionChecked,'2026-10-17');
 assert.ok(c.prosecutionDetails.some(x=>x.includes('målsäganden')));
 assert.ok(c.prosecutionDetails.some(x=>x.includes('allmän synpunkt')));
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
for(const title of ['Ofredande','Olovlig avlyssning']){
 const c=by(title);
 assert.equal(c.prosecutionRuleScope,'conditional-if-not-public-place');
 assert.ok(c.prosecutionDetails[0].includes('INTE förövats på allmän plats'));
}
for(const title of ['Grovt hemfridsbrott','Grovt olaga intrång','Grovt olaga integritetsintrång','Grovt dataintrång','Olaga frihetsberövande']){
 const c=by(title);assert.ok(c,'Missing '+title);
 assert.notEqual(c.prosecutionReviewStatus,'statute-4:11-special-prosecution-current-conditional',
  'Do not generalize conditional charging to distinct aggravated or detainment offence '+title);
}
assert.equal(q.stageEntriesModified,0);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,12);
const law=ctx.window.BK_STATUTES['BrB:4:11'];
assert.equal(law.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
assert.ok(law.text.includes('ofredande som inte förövats på allmän plats'));
assert.ok(law.text.includes('Detsamma gäller olaga tvång genom hot'));
const bogus=[{title:'Kränkande fotografering',statute:'BrB:4:6a',prosecution:'unknown'}];
const test={BK_DATA:{crimes:bogus},BK_STATUTES:{
 'BrB:4:11':{complete:false,text:'incomplete'},
 'BrB:4:6a':{checked:'2026-10-17',completeTextProvenance:'manual-crosscheck-current-SFS-paragraph-only'}
}};
vm.runInNewContext(fs.readFileSync(path.join(root,mod),'utf8'),{window:test,console},{filename:mod});
assert.equal(test.BK_BRB4_PROSECUTION15.reviewed,0);
assert.equal(test.BK_BRB4_PROSECUTION15.held.length,1);
assert.equal(bogus[0].prosecution,'unknown','Incomplete source must never grant charging approval');
console.log('PASS V1.5: BrB 4:11 eight completed-offence special prosecution cases, public-place caveat, explicit holds');
