import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const titles=['Våld eller hot mot tjänsteman','Grovt våld eller hot mot tjänsteman','Förolämpning mot tjänsteman','Våldsamt motstånd'];
const crimes=titles.map((title,i)=>({
 id:'p17-'+i,title,shortRef:['BrB 17:1','BrB 17:1','BrB 17:3','BrB 17:4'][i],
 ref:'BrB 17 kap.',category:'Tjänsteman',penaltyRange:{min:0,max:1,fines:true},reviewStatus:'needs-review',
 lawMode:'machine',law:'Importerad lagtext'
}));
const w={BK_DATA:{crimes,categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'brb17-review-14.js'),'utf8'),{window:w,console});
assert.equal(w.BK_BRB17_REVIEW14.updated,4);
assert.equal(w.BK_BRB17_REVIEW14.missing.length,0);
const get=t=>w.BK_DATA.crimes.find(x=>x.title===t);
assert.equal(get(titles[0]).penaltyRange.max,3);
assert.equal(get(titles[1]).penaltyRange.min,1.5);
assert.equal(get(titles[1]).penaltyRange.max,8);
assert.equal(get(titles[2]).penaltyRange.max,.5);
assert.equal(get(titles[3]).penaltyRange.fines,true);
for(const c of crimes){
 assert.equal(c.penaltyChecked,'2026-10-15');
 assert.equal(c.reviewStatus,'penalty-reviewed-source-excerpt','Do not imply complete legal text verification');
 assert.equal(c.lawMode,'machine');
}
const html=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(html.indexOf('src="./brb17-review-14.js"')<html.indexOf('src="./stages-08.js"'),'Review before stages');
assert.ok(readFileSync(resolve(root,'service-worker.js'),'utf8').includes('./brb17-review-14.js'),'Offline source missing');
console.log('PASS BrB17 1.4: four ranges, legal provenance, correct staging and offline support');
