import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const rows=[
 ['Narkotikabrott · innehav',0,3,false],['Ringa narkotikabrott · bruk',0,.5,true],
 ['Narkotikabrott · överlåtelse',0,3,false],['Narkotikabrott · framställning',0,3,false],
 ['Narkotikabrott · förvärv i överlåtelsesyfte',0,3,false],['Narkotikabrott · transport/förvaring',0,3,false],
 ['Narkotikabrott · försäljning',.5,3,false],['Narkotikabrott · främjande av handel',.5,3,false],
 ['Ringa narkotikabrott · innehav',0,.5,true],['Grovt narkotikabrott',2,7,false],
 ['Synnerligen grovt narkotikabrott',6,10,false],['Vapenbrott',0,5,false],
 ['Mindre allvarligt vapenbrott',0,.5,true],['Vapenbrott av oaktsamhet',0,.5,true],
 ['Grovt vapenbrott',4,7,false],['Synnerligen grovt vapenbrott',6,10,false],
 ['Rattfylleri',0,.5,true],['Grovt rattfylleri',0,2,false],
 ['Olovlig körning',0,0,true],['Grov olovlig körning',0,.5,true],
 ['Brott mot knivlagen',0,1,true],['Grovt brott mot knivlagen',.5,2,false]
];
const original=()=>rows.map(([title,min,max,fines],i)=>({
 id:'source14-'+i,title,shortRef:'Special 1',ref:'Special 1',lawMode:'machine',
 penaltyRange:{min,max,fines,life:false},reviewStatus:'none'
}));
const load=(crimes)=>{
 const w={BK_DATA:{crimes}};
 vm.runInNewContext(readFileSync(resolve(root,'special-penalties-review-14.js'),'utf8'),{window:w,console});
 return w;
};
const full=load(original());
assert.equal(full.BK_SPECIAL_PENALTY14.planned,22);
assert.equal(full.BK_SPECIAL_PENALTY14.reviewed,22);
assert.equal(full.BK_SPECIAL_PENALTY14.mismatches.length,0);
assert.equal(full.BK_SPECIAL_PENALTY14.missing.length,0);
assert.ok(full.BK_DATA.crimes.every(c=>c.penaltyRangeVerified===true&&c.penaltyReviewScope==='range-only'));
assert.ok(full.BK_DATA.crimes.every(c=>c.penaltyChecked==='2026-10-15'));
assert.ok(full.BK_DATA.crimes.every(c=>c.lawMode==='machine'),'Range check must not bless machine law text');
const bad=original();bad.find(c=>c.title==='Grovt narkotikabrott').penaltyRange.min=1;
const b=load(bad);
assert.equal(b.BK_SPECIAL_PENALTY14.mismatches.length,1);
const crime=b.BK_DATA.crimes.find(c=>c.title==='Grovt narkotikabrott');
assert.equal(crime.penaltyRange.min,1,'Disagreement must never silently overwrite penalty');
assert.equal(crime.penaltyChecked,undefined,'Mismatched penalty must not gain false review date');
assert.equal(crime.reviewStatus,'penalty-crosscheck-pending');
const changed=original();changed[0].reviewStatus='source-changed';
const hold=load(changed);
assert.equal(hold.BK_SPECIAL_PENALTY14.held.length,1);
assert.equal(changed[0].reviewStatus,'source-changed');
assert.ok(!changed[0].penaltyChecked);
assert.match(full.BK_DATA.crimes.find(c=>c.title==='Narkotikabrott · överlåtelse').penaltySpecificCaution,/sex månader/);
const html=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(html.indexOf('src="./special-penalties-review-14.js"')<html.indexOf('src="./stages-08.js"'));
assert.ok(html.includes('m.penaltySpecificCaution?'));
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
assert.ok(sw.includes('./special-penalties-review-14.js'),'Verified range module must be offline');
// Published release must not regress to old prototype labels or return HTML to a JS request.
assert.match(html,/Version 1\.4 · publicerad 2026-10-16/);
assert.doesNotMatch(html,/Arbetsversion: 0\.6/);
assert.match(sw,/brottskatalog-v(?:14-20261016-release|15-draft-(?:rekvisit|brb10-typfall|brb4|prosecution|core|family|1113|war|complete-inventory|rymning|rekvisitcore|rekvisitgrader|rekv-special|polisiara|fordjupning|sexualbrott|alternativ|fridtext|source-repair|stage-source|fridluckor)-20261016)/);
assert.ok(sw.includes("event.request.mode === 'navigate' ? await cache.match('./index.html') : null"));
assert.ok(!sw.includes("return await cache.match('./index.html') || Response.error()"));
console.log('PASS 1.4: published app version labels and safe offline fallback');
console.log('PASS 1.4: twenty-two specialty penalty ranges, mismatch hold, official source provenance and stage load order');
