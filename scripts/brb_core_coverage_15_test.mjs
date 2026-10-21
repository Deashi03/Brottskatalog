import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.ok(scripts.includes('brb-core-coverage-15.js'));
assert.ok(scripts.indexOf('brb-core-coverage-15.js')<scripts.indexOf('stages-08.js'));
assert.ok(sw.includes('./brb-core-coverage-15.js'));
const window={BK_DATA:{crimes:[],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
vm.runInNewContext(readFileSync(resolve(root,'brb-core-coverage-15.js'),'utf8'),{window,console});
const all=window.BK_DATA.crimes;
assert.equal(all.length,28,'All missing common public order/security offences must be indexed');
const get=t=>all.find(c=>c.title===t);
const tests=[
 ['Involverande av en underårig i brottslighet',6,false],
 ['Olaga våldsskildring',2,true],
 ['Otillåten utlämning av teknisk upptagning',.5,true],
 ['Hindrande av förrättning',0,true],
 ['Väpnat hot mot laglig ordning',10,false],
 ['Krigsanstiftan',8,false],
 ['Utlandsspioneri',4,false],
 ['Grovt utlandsspioneri',8,false],
 ['Grov olovlig underrättelseverksamhet mot Sverige',4,false],
 ['Tagande av utländskt understöd',2,false]
];
for(const [title,max,fines] of tests){
 const c=get(title);assert.ok(c,'Missing '+title);
 assert.equal(c.penaltyRange.max,max,title);
 assert.equal(c.penaltyRange.fines,fines,title);
 assert.ok(c.penaltyRangeVerified,title);
 assert.equal(c.lawMode,'machine');
 assert.equal(c.requisitesStatus,'pending-individual-legal-review');
 assert.equal(c.typexempel15.length,0,'No unverified typecase allowed: '+title);
}
const tricky=['Upplopp','Våldsamt upplopp','Myteri','Svikande av försvarsplikt','Högförräderi','Egenmäktighet vid förhandling med främmande makt','Olovlig värvning'];
for(const title of tricky){
 const c=get(title);assert.ok(c,title);
 assert.equal(c.penaltyRange,null,title+' must not have false one-size-fits-all penalty');
 assert.equal(c.conditionalPenalty,true,title);
 assert.ok(c.penaltyNote.length>40,title+' must explain application');
 assert.notEqual(c.custody,'presumption');
}
assert.equal(get('Olovlig värvning').prosecutionRule,'BrB 19:16; RB 20:3');
assert.equal(get('Tagande av utländskt understöd').prosecution,'conditional');
for(const row of all){
 assert.ok(row.prosecutionRule, row.title+' missing prosecution authority');
 assert.ok(row.statute in window.BK_STATUTES,row.title+' missing official SFS source');
 assert.equal(row.penaltySourceURL,row.sourceURL);
}
console.log('PASS V1.5: twenty-eight BrB 16-19 provisions, application-sensitive penalties, prosecution exceptions and source provenance');