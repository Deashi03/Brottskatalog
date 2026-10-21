import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const js=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(x=>x[1]);
for(const s of ['brb11-13-expansion-15.js','stage-scope-15.js'])assert.ok(js.includes(s)&&sw.includes('./'+s));
assert.ok(js.indexOf('brb11-13-expansion-15.js')<js.indexOf('stages-08.js'));
assert.ok(js.indexOf('stages-08.js')<js.indexOf('stage-scope-15.js'));
const window={BK_DATA:{crimes:[],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
for(const script of ['brb11-13-expansion-15.js','stages-08.js','stage-scope-15.js'])
 vm.runInNewContext(readFileSync(resolve(root,script),'utf8'),{window,console});
const base=window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.equal(base.length,8);
const by=t=>base.find(x=>x.title===t);
const check=[
 ['Försvårande av konkurs eller exekutiv förrättning',0,2,false],
 ['Grovt försvårande av konkurs eller exekutiv förrättning',1,6,false],
 ['Kapning',0,4,false],
 ['Grov kapning',2,18,true],
 ['Sjö- eller luftfartssabotage',0,4,false],
 ['Grovt sjö- eller luftfartssabotage',2,18,true],
 ['Flygplatssabotage',0,4,false],
 ['Grovt flygplatssabotage',2,18,true]
];
for(const [name,min,max,life] of check){
 const c=by(name);assert.ok(c,name);
 assert.equal(c.penaltyRange.min,min);
 assert.equal(c.penaltyRange.max,max);
 assert.equal(c.penaltyRange.life,life);
 assert.ok(c.penaltyRangeVerified);
 assert.equal(c.typexempel15.length,0,'No contrived police typecase');
 assert.ok(c.prosecutionRule);
}
const stages=window.BK_DATA.crimes.filter(c=>c.stageType);
assert.equal(stages.filter(x=>x.stageStatus==='unverified').length,9);
assert.equal(window.BK_STAGE_SCOPE15.withheld,9);
for(const c of base.filter(x=>x.stageExtraCheck==='aggravated-13-12')){
 for(const slug of ['forsok','forberedelse','stampling']){
  const entry=stages.find(x=>x.stageParentId===c.id&&x.stageType===slug);
  assert.ok(entry);
  assert.equal(entry.stageStatus,'unverified',c.title+' must not falsely claim absence of stage criminalization');
  assert.equal(entry.penaltyRange,null);
 }
}
for(const title of ['Kapning','Sjö- eller luftfartssabotage','Flygplatssabotage'])
 assert.equal(stages.find(x=>x.title==='Försök till '+title.toLocaleLowerCase('sv'))?.stageStatus,'punishable');
console.log('PASS V1.5: BrB 11/13 eight offences, original stages and nine aggravated stage statuses withheld pending review');