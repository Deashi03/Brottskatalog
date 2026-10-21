import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const refs=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(x=>x[1]);
assert.ok(refs.indexOf('prosecution-final-12.js')<refs.indexOf('prosecution-review-15.js'));
assert.ok(sw.includes('./prosecution-review-15.js'));
const names=['Oskuldskontroll','Intygande av sexuell oskuld','Uppmaning till självmord','Oaktsam uppmaning till självmord','Psykiskt våld','Behörighetsmissbruk','Olovligt brukande','Grovt olovligt brukande','Fyndförseelse'];
const crimes=names.map((title,i)=>({title,shortRef:i<5?'BrB 4:7a':'BrB 10:7',prosecution:'unknown'}));
const window={BK_DATA:{crimes}};
vm.runInNewContext(readFileSync(resolve(root,'prosecution-review-15.js'),'utf8'),{window,console});
assert.equal(window.BK_PROSECUTION15.reviewed,9);
for(const c of crimes)assert.ok(c.prosecutionRule&&c.prosecutionChecked==='2026-10-16');
for(const c of crimes.slice(0,5))assert.equal(c.prosecution,'general');
for(const c of crimes.slice(5))assert.equal(c.prosecution,'conditional');
assert.ok(crimes.find(c=>c.title==='Olovligt brukande').prosecutionDetails.some(x=>x.includes('hyra')));
console.log('PASS V1.5: all eight new BrB4/10 prosecution rules, relative exception and source date');

// Final classification must follow all later base-card and stage source reviews.
await import('./final_prosecution_review_15_test.mjs');
