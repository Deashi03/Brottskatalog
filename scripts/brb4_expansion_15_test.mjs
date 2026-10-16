import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const refs=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.ok(refs.includes('brb4-expansion-15.js'));
assert.ok(refs.indexOf('brb4-expansion-15.js')<refs.indexOf('stages-08.js'));
assert.ok(sw.includes('./brb4-expansion-15.js'));
const window={BK_DATA:{crimes:[],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
vm.runInNewContext(readFileSync(resolve(root,'brb4-expansion-15.js'),'utf8'),{window,console});
const rows=window.BK_DATA.crimes;
assert.equal(rows.length,5);
for(const c of rows){
 assert.ok(c.penaltyRangeVerified&&c.penaltyReviewScope==='range-only');
 assert.equal(c.requisitesStatus,'pending-individual-legal-review');
 assert.deepEqual(Array.from(c.typexempel15),[],'No sensitive speculative typecases');
 assert.ok(c.lawMode==='machine');
}
for(const [title,max,fines] of [
 ['Oskuldskontroll',1,false],['Intygande av sexuell oskuld',.5,true],
 ['Uppmaning till självmord',2,false],['Oaktsam uppmaning till självmord',.5,true],['Psykiskt våld',4,false]
]){
 const c=rows.find(x=>x.title===title);
 assert.ok(c,'Offence missing: '+title);
 assert.equal(c.penaltyRange.max,max);
 assert.equal(c.penaltyRange.fines,fines);
}
vm.runInNewContext(readFileSync(resolve(root,'stages-08.js'),'utf8'),{window,console});
assert.equal(window.BK_DATA.crimes.filter(c=>c.stageType).length,15);
for(const s of window.BK_DATA.crimes.filter(c=>c.stageType))assert.equal(s.stageStatus,'not-criminalized','No unsupported stage criminalization');
console.log('PASS V1.5: four 2025/2026 BrB4 offences with penalty evidence, noncriminalized lesser acts and deferred typecases');
