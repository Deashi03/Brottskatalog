import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes('./rekvisit-tjanst-15.js')&&sw.includes('./rekvisit-tjanst-15.js'));
assert.ok(scripts.indexOf('./rekvisit-tjanst-15.js')<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const data=ctx.window.BK_DATA,base=data.crimes.filter(c=>!c.stageType),stats=ctx.window.BK_REKVISIT_TJANST15;
assert.ok(stats);
assert.deepEqual(Array.from(stats.mismatch),[]);
assert.deepEqual(Array.from(stats.missing),[]);
assert.equal(stats.added+stats.already,8,'All eight missing officer, voting and official-order offences must have structured elements');
const names=['Grovt angrepp mot tjänsteman','Grovt otillbörligt verkande vid röstning','Grovt skyddande av brottsling','Grovt övergrepp i rättssak','Hindrande av förrättning','Otillbörligt verkande vid röstning','Tagande av otillbörlig förmån vid röstning','Överträdelse av myndighets bud'];
const by=t=>base.find(c=>c.title===t);
for(const name of names){
 const c=by(name);
 assert.ok(c,'Missing crime '+name);
 assert.ok(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length,'Unstructured '+name);
 assert.equal(c.rekvisit15.legalReviewApproved,false);
 assert.ok(c.rekvisit15.sourceURL?.includes('riksdagen.se'));
}
assert.equal(by('Överträdelse av myndighets bud').rekvisit15.routes.length,3,'Official seizure/notice/ban have distinct lawful grounds');
assert.ok(by('Hindrande av förrättning').rekvisit15.routes[0].groups.some(g=>g.label.includes('enbart böter')));
const grave=names.filter(n=>n.startsWith('Grovt '));
for(const n of grave){
 assert.ok(JSON.stringify(by(n).rekvisit15).includes('Särskild gradbedömning'),'Gross crime must separately evaluate aggravation');
 assert.ok(by(n).rekvisit15.note.includes('inte villkor'),'Legislative examples should not become mandatory checkboxes');
}
const ch17=base.filter(c=>c.statute?.startsWith('BrB:17:'));
assert.equal(ch17.length,21,'Unexpected chapter 17 catalogue size – re-audit');
assert.equal(ch17.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).length,0,'Every chapter 17 card should now have structured requisites');
const brb=base.filter(c=>c.statute?.startsWith('BrB:'));
const structured=brb.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length;
assert.ok(structured>=195,'Expected 195 structured BrB cards, got '+structured);
console.log('PASS V1.5: 8 BrB 17 officer/voting/judicial process crime requisite lists, 21/21 chapter 17, '+structured+' BrB structured overall');
