import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const scriptFiles=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.ok(scriptFiles.indexOf('brb14-expansion-15.js')>=0,'V1.5 extension must load');
assert.ok(scriptFiles.indexOf('brb14-expansion-15.js')<scriptFiles.indexOf('stages-08.js'),'V1.5 offences must load before stage generator');
assert.ok(sw.includes('./brb14-expansion-15.js'),'V1.5 data must be cached for offline use');
const w={BK_DATA:{crimes:[],categories:['Alla']},BK_STATUTES:{
 'BrB:14:8':{ref:'BrB 14 kap. 8 §',text:'8 § Test - official source provision imported'},
 'BrB:14:9':{ref:'BrB 14 kap. 9 §',text:'9 § Test - official source provision imported'},
 'BrB:14:5':{ref:'BrB 14 kap. 5 §',text:'5 § Test - signaturförfalskning'},
 'BrB:14:6':{ref:'BrB 14 kap. 6 §',text:'6 § Test - penningförfalskning'},
 'BrB:14:7':{ref:'BrB 14 kap. 7 §',text:'7 § Test - olovlig befattning med falska pengar'},
 'BrB:14:11':{ref:'BrB 14 kap. 11 §',text:'11 § Test - olaga spridande av efterbildning'}
}};
const context=vm.createContext({window:w,console});
vm.runInContext(readFileSync(resolve(root,'brb14-expansion-15.js'),'utf8'),context);
assert.equal(w.BK_DATA.crimes.length,11,'All eleven source-checked BrB 14 offence degrees included');
for(const crime of w.BK_DATA.crimes) {
 assert.ok(crime.penaltyRangeVerified,'Only independently crosschecked ranges should be indicated');
 assert.equal(crime.penaltyReviewScope,'range-only');
 assert.equal(crime.requisitesStatus,'pending-individual-legal-review');
 assert.equal(crime.lawMode,'machine');
 assert.deepEqual(Array.from(crime.typexempel15),[],'No intuitively dubious type cases');
 assert.ok(crime.stageReviewed,'Individual stage rule was looked up');
 assert.equal(crime.stageReviewDate,'2026-10-16');
}
const locate=title=>w.BK_DATA.crimes.find(c=>c.title===title);
assert.equal(locate('Märkesförfalskning')?.penaltyRange.max,2);
assert.equal(locate('Ringa märkesförfalskning')?.penaltyRange.fines,true);
assert.equal(locate('Grov märkesförfalskning')?.penaltyRange.min,.5);
assert.equal(locate('Förfalskning av fast märke')?.penaltyRange.max,4);
assert.equal(locate('Ringa förfalskning av fast märke')?.penaltyRange.max,.5);
assert.equal(locate('Ringa penningförfalskning')?.penaltyRange.max,.5);
assert.equal(locate('Grov signaturförfalskning')?.penaltyRange.min,.5);
assert.equal(locate('Grov olovlig befattning med falska pengar')?.penaltyRange.max,6);
assert.equal(locate('Olaga spridande av efterbildning')?.penaltyRange.max,0);
assert.equal(locate('Olaga spridande av efterbildning')?.penalty,'Böter');
vm.runInContext(readFileSync(resolve(root,'stages-08.js'),'utf8'),context);
const stages=w.BK_DATA.crimes.filter(c=>c.stageType);
assert.equal(stages.length,33);
const findStage=title=>stages.find(c=>c.title===title);
assert.equal(findStage('Försök till märkesförfalskning')?.stageStatus,'punishable');
assert.equal(findStage('Förberedelse till märkesförfalskning')?.stageStatus,'punishable');
assert.equal(findStage('Stämpling till märkesförfalskning')?.stageStatus,'not-criminalized');
assert.equal(findStage('Försök till ringa märkesförfalskning')?.stageStatus,'not-criminalized');
assert.equal(findStage('Försök till grov märkesförfalskning')?.stageStatus,'punishable');
assert.equal(findStage('Förberedelse till förfalskning av fast märke')?.stageStatus,'punishable');
assert.equal(findStage('Försök till ringa förfalskning av fast märke')?.stageStatus,'not-criminalized');
assert.equal(findStage('Försök till märkesförfalskning')?.stageReviewDate,'2026-10-16','Never replace stage-specific review dates with old global dates');
assert.equal(findStage('Försök till grov olovlig befattning med falska pengar')?.stageStatus,'punishable');
assert.equal(findStage('Försök till ringa penningförfalskning')?.stageStatus,'not-criminalized');
assert.equal(findStage('Försök till olaga spridande av efterbildning')?.stageStatus,'not-criminalized');
console.log('PASS V1.5: missing BrB14 crimes, source-scoped penalty/stage rules, deferred type examples and review dates');
