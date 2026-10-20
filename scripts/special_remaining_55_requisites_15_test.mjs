import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const a='./special-smuggling-money-lbe-requisites-15.js',b='./special-nark-vapen-trafik-kniv-requisites-15.js';
for(const s of [a,b]){assert.ok(scripts.includes(s),s);assert.ok(sw.includes(s),'missing offline: '+s);
 assert.ok(scripts.indexOf(s)>scripts.indexOf('./special-other-penalty-grades-15.js'));
 assert.ok(scripts.indexOf(s)<scripts.indexOf('./stages-08.js'));}
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const x=ctx.window.BK_SPECIAL33_REQUISITES15,y=ctx.window.BK_SPECIAL22_REQUISITES15;
assert.equal(x.planned,33,'33 law importer cards must be in audit');
assert.equal(x.added,33,'No unstructured imported special law cards: '+JSON.stringify(x));
assert.equal(x.held.length,0);assert.equal(x.already.length,0);
assert.equal(y.planned,22);assert.equal(y.structured,22,'22 other special cards: '+JSON.stringify(y));
assert.equal(y.held.length,0);assert.equal(y.already.length,0);
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.equal(base.length,390);
const specials=base.filter(c=>!c.statute?.startsWith('BrB:'));
assert.equal(specials.length,68);assert.equal(specials.filter(c=>c.rekvisit15?.routes?.length).length,68);
assert.equal(base.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length,390);
const others=specials.filter(c=>c.lawMode==='machine');
assert.equal(specials.filter(c=>!c.lawCompletenessVerified).length,0,'All 68 special-law base cards now have individually checked complete statutory paragraphs');
assert.equal(base.filter(c=>c.lawCompletenessVerified).length,390,'Do not certify machine-imported content from prerequisite summaries');
assert.equal(base.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);
assert.equal(ctx.window.BK_DATA.crimes.length,1485);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,0);
assert.equal(base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified).length,14);
function get(title){const c=base.find(x=>x.title===title);assert.ok(c,title);return c;}
for(const title of ['Penningtvättsbrott','Grovt penningtvättsbrott','Ringa näringspenningtvätt',
 'Grov smuggling','Narkotikasmuggling – avsedd att säljas','Grov olovlig befattning med smuggelgods',
 'Synnerligen grovt brott mot tillståndsplikten för explosiva varor','Grovt vapenbrott',
 'Rattfylleri','Grovt brott mot knivlagen']){
 const c=get(title);assert.ok(c.rekvisit15?.routes?.length>=1,title);
 assert.equal(c.rekvisit15.legalReviewApproved,false);
 assert.ok(c.rekvisit15.note.includes('återstår')||c.rekvisit15.note.includes('PRELIMINÄRA'));
}
assert.equal(get('Penningtvättsbrott').rekvisit15.routes.length,2);
assert.equal(get('Rattfylleri').rekvisit15.routes.length,1);
assert.ok(get('Våldsamt motstånd').rekvisit15.routes?.length||get('Våldsamt motstånd').rekvisit15.groups?.length);
// Negative proof: wrong source version must keep the card UNSTRUCTURED.
const c=JSON.parse(JSON.stringify(get('Smuggling')));delete c.rekvisit15;
const docs=JSON.parse(JSON.stringify(ctx.window.BK_SPECIAL_EXCERPTS));docs.SmuglL.observedVersion='UNVERIFIED';
const isolated=vm.createContext({window:{BK_DATA:{crimes:[c]},BK_SPECIAL_EXCERPTS:docs}});
vm.runInContext(fs.readFileSync(path.join(root,a),'utf8'),isolated);
assert.equal(isolated.window.BK_SPECIAL33_REQUISITES15.added,0);
assert.equal(isolated.window.BK_SPECIAL33_REQUISITES15.held.length,33);
assert.equal(c.rekvisit15,undefined);
console.log('PASS V1.5: source-scoped preliminary requisite paths for all 68 special-law base cards; 55 new, no invented legal approval');
