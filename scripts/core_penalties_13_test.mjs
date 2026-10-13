import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const source=readFileSync(resolve(root,'core-penalties-13.js'),'utf8');
const cases=[
 ['Ringa stöld',0,.5,true],['Stöld',0,2,false],['Grov stöld',1,6,false],
 ['Inbrottsstöld',1,6,false],['Rån',1.5,6,false],['Grovt rån',5,10,false],
 ['Misshandel',0,2,false],['Ringa misshandel',0,.5,true],
 ['Grov misshandel',1.5,7,false],['Synnerligen grov misshandel',6,12,false],
 ['Bedrägeri',0,2,false],['Ringa bedrägeri',0,.5,true],['Grovt bedrägeri',1,6,false],
 ['Skadegörelse',0,2,false],['Ringa skadegörelse',0,.5,true],['Grov skadegörelse',1,6,false]
];
const sample=()=>cases.map(([title,min,max,fines],i)=>({
 id:'core-'+i,title,shortRef:'BrB 8:1',
 penaltyRange:{min,max,fines,life:false},category:'Test',reviewStatus:null
}));
let w={BK_DATA:{crimes:sample()}};
vm.runInNewContext(source,{window:w,console});
assert.equal(w.BK_CORE_PENALTIES13.reviewed,16);
assert.equal(w.BK_CORE_PENALTIES13.missing.length,0);
assert.equal(w.BK_CORE_PENALTIES13.discrepancies.length,0);
assert.ok(w.BK_DATA.crimes.every(c=>c.penaltyChecked==='2026-10-13'&&c.penaltyRangeVerified===true));
assert.ok(w.BK_DATA.crimes.every(c=>c.penaltyReviewScope==='range-only'));
const broken=sample();broken[1].penaltyRange.max=5;
w={BK_DATA:{crimes:broken}};
vm.runInNewContext(source,{window:w,console});
assert.equal(w.BK_CORE_PENALTIES13.reviewed,15);
assert.equal(w.BK_CORE_PENALTIES13.discrepancies.length,1);
assert.equal(w.BK_DATA.crimes[1].penaltyRange.max,5,'Never replace questionable legal content automatically');
assert.equal(w.BK_DATA.crimes[1].reviewStatus,'penalty-crosscheck-pending');
assert.ok(!w.BK_DATA.crimes[1].penaltyChecked,'Mismatch cannot gain a false review date');
const changed=sample();changed[0].reviewStatus='source-changed';
w={BK_DATA:{crimes:changed}};
vm.runInNewContext(source,{window:w,console});
assert.equal(w.BK_CORE_PENALTIES13.reviewed,15);
assert.equal(w.BK_CORE_PENALTIES13.held.length,1);
assert.equal(w.BK_DATA.crimes[0].reviewStatus,'source-changed');
const html=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(html.indexOf('src="./penalty-normalize-12.js"')<html.indexOf('src="./core-penalties-13.js"'));
assert.ok(html.indexOf('src="./core-penalties-13.js"')<html.indexOf('src="./stages-08.js"'));
console.log('PASS: 16 independently reviewed BrB common-crime penalty intervals; safe mismatch and changed-source behavior.');
