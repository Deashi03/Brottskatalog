import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const mod='./special-smuggling-money-lbe-fulltext-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./special-law-import-12.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./special-smuggling-money-lbe-requisites-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const report=ctx.window.BK_SPECIAL_SMUGG_PTV_LBE_FULLTEXT15;
assert.equal(report.planned,33);assert.equal(report.certified,33,JSON.stringify(report));
assert.equal(report.sections,20);assert.equal(report.held.length,0);
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.equal(base.filter(c=>c.lawMode==='full'&&c.lawCompletenessVerified===true).length,390);
assert.equal(base.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length,390);
const get=t=>{const c=base.find(c=>c.title===t);assert.ok(c,t);return c;};
for(const t of ['Smuggling','Narkotikasmuggling','Vapensmuggling','Smuggling av explosiv vara',
 'Olovlig införsel eller utförsel','Vårdslös tullredovisning','Grov olovlig befattning med smuggelgods',
 'Penningtvättsbrott','Grovt penningtvättsbrott','Penningtvättsförseelse','Näringspenningtvätt',
 'Brott mot tillståndsplikten för brandfarliga varor',
 'Synnerligen grovt brott mot tillståndsplikten för explosiva varor']){
 const c=get(t);assert.equal(c.lawMode,'full');assert.equal(c.lawCompletenessVerified,true);
 assert.ok(c.lawCompletenessSourceURL?.includes('riksdagen.se'));
 assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');
 assert.equal(c.rekvisit15?.legalReviewApproved,false);
}
assert.ok(!get('Olovlig införsel eller utförsel').law.endsWith('Tullbrott m.m.'));
assert.ok(!get('Vårdslös tullredovisning').law.endsWith('Olovlig befattning med smuggelgods'));
assert.ok(!get('Grov olovlig befattning med smuggelgods').law.endsWith('Försök, förberedelse och stämpling'));
assert.ok(get('Penningtvättsbrott').law.includes('4 §'));
assert.equal(get('Penningtvättsbrott').rekvisit15.routes.length,2);
assert.equal(base.filter(c=>c.lawCompletenessVerified===true&&c.rekvisit15?.legalReviewApproved===true).length,0);
assert.equal(ctx.window.BK_DATA.crimes.length,1557);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
const wrong=get('Smuggling');
const testEntry=JSON.parse(JSON.stringify(wrong));testEntry.lawMode='machine';testEntry.lawCompletenessVerified=false;testEntry.law=ctx.window.BK_SPECIAL_EXCERPTS.SmuglL.sections['3'].text;
const docs=JSON.parse(JSON.stringify(ctx.window.BK_SPECIAL_EXCERPTS));docs.SmuglL.sections['3'].text+=' MUTATION';
const isolated=vm.createContext({window:{BK_DATA:{crimes:[testEntry]},BK_SPECIAL_EXCERPTS:docs}});
vm.runInContext(fs.readFileSync(path.join(root,mod),'utf8'),isolated);
assert.equal(isolated.window.BK_SPECIAL_SMUGG_PTV_LBE_FULLTEXT15.certified,0);
assert.equal(isolated.window.BK_SPECIAL_SMUGG_PTV_LBE_FULLTEXT15.held.length,33);
assert.equal(testEntry.lawCompletenessVerified,false);
console.log('PASS V1.5: exact locked source paragraph evidence for 33 special-law cards; 20 distinct paragraphs; no false legal approval');
