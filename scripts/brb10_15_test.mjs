import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const refs=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.ok(refs.includes('brb10-review-15.js'));
assert.ok(refs.indexOf('brb10-review-15.js')<refs.indexOf('stages-08.js'));
assert.ok(sw.includes('./brb10-review-15.js'));
const window={};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
const p=window.BK_STATUTES['BrB:10:5'];
assert.match(p?.text||'',/grov trolöshet mot huvudman/i,'Statute must include 2026 second paragraph');
const originals=[
 {title:'Trolöshet mot huvudman',shortRef:'BrB 10:5',penaltyRange:{min:0,max:2,fines:false},custody:'none'},
 {title:'Grov trolöshet mot huvudman',shortRef:'BrB 10:5',penaltyRange:{min:.5,max:6,fines:false},custody:'none'}
];
window.BK_DATA={crimes:originals};
vm.runInNewContext(readFileSync(resolve(root,'brb10-review-15.js'),'utf8'),{window,console});
assert.deepEqual(JSON.parse(JSON.stringify(originals.map(x=>x.penaltyRange))),[
 {min:0,max:2,fines:true,life:false},{min:1,max:6,fines:false,life:false}
]);
assert.ok(originals.every(x=>x.penaltyChecked==='2026-10-16'&&x.penaltyReviewScope==='range-only'));
assert.ok(originals.every(x=>x.penaltyNote.includes('2026-08-01')));
assert.equal(originals[1].penaltyShort,'F 1–6 år');
console.log('PASS V1.5: 2026-08-01 BrB 10:5 source, correct minimum for gross breach and no overbroad review status');
