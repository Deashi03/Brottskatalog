import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const names=['Ofredande','Hemfridsbrott','Olaga intrång','Grovt hemfridsbrott','Grovt olaga intrång','Psykiskt våld'];
const crimes=names.map((title,i)=>({
 id:'p14-'+i,title,shortRef: ['BrB 4:7','BrB 4:6','BrB 4:6','BrB 4:6','BrB 4:6','BrB 4:7 b'][i],
 ref:'BrB 4 kap.',category:'Frid',penaltyShort:'Kontroll väntar',lawMode:'machine',
 law:'Maskinimporterad och ännu ej individuellt fullständighetsgranskad.',
 reviewStatus:'not-reviewed',penaltyRange:{min:0,max:1,fines:true,life:false}
}));
const w={BK_DATA:{crimes,categories:['Alla']}};
const ctx={window:w,console};
vm.runInNewContext(readFileSync(resolve(root,'brb4-review-14.js'),'utf8'),ctx);
assert.equal(w.BK_BRB4_REVIEW14.updated,6);
assert.equal(w.BK_BRB4_REVIEW14.missing.length,0);
const get=name=>w.BK_DATA.crimes.find(x=>x.title.toLocaleLowerCase('sv')===name.toLocaleLowerCase('sv'));
for(const title of names){
 const x=get(title);
 assert.equal(x.penaltyChecked,'2026-10-15','Date must refer to this checked source');
 assert.equal(x.penaltyRangeVerified,true);
 assert.equal(x.reviewStatus,'penalty-reviewed-source-excerpt','Statute is not certified as fully complete');
 assert.equal(x.lawMode,'machine','Never convert machine excerpt into verified law text');
}
assert.equal(get('Grovt hemfridsbrott').penaltyRange.min,.5);
assert.equal(get('Grovt olaga intrång').penaltyRange.max,3);
assert.equal(get('Ofredande').penaltyRange.fines,true);
assert.equal(get('Psykiskt våld').penaltyRange.max,4);
assert.equal(get('Psykiskt våld').introducedFrom,'2026-07-01');
assert.equal(get('Hemfridsbrott').introducedFrom,undefined,'Older crimes may not be labeled as newly introduced');
assert.ok(readFileSync(resolve(root,'index.html'),'utf8').indexOf('src="./brb4-review-14.js"')<
          readFileSync(resolve(root,'index.html'),'utf8').indexOf('src="./stages-08.js"'),
          'Stages must see reviewed penalties');
const cache=readFileSync(resolve(root,'service-worker.js'),'utf8');
assert.ok(cache.includes('./brb4-review-14.js'),'Updated legal source must be available offline');
console.log('PASS BrB 4.14: six ranges checked, psychic violence effective date, legal provenance, offline load order');
