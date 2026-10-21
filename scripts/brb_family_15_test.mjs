import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(x=>x[1]);
assert.ok(scripts.indexOf('brb-family-15.js')>=0);
assert.ok(scripts.indexOf('brb-family-15.js')<scripts.indexOf('stages-08.js'));
assert.ok(sw.includes('./brb-family-15.js'));
const window={BK_DATA:{crimes:[],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
vm.runInNewContext(readFileSync(resolve(root,'brb-family-15.js'),'utf8'),{window,console});
const rows=window.BK_DATA.crimes;
assert.equal(rows.length,10);
const find=t=>rows.find(c=>c.title===t);
for(const [name,max,min] of [
 ['Äktenskapstvång',6,.5],['Barnäktenskapsbrott',6,.5],
 ['Äktenskapsresebrott',4,0],['Äktenskapsresebrott mot barn',4,0],
 ['Samlag med avkomling',2,0],['Samlag med syskon',1,0]
]){
 const c=find(name);assert.ok(c,'Missing '+name);
 assert.equal(c.penaltyRange.max,max,name);assert.equal(c.penaltyRange.min,min,name);
 assert.equal(c.penaltyRange.fines,false);
 assert.ok(c.penaltyRangeVerified);
 assert.equal(c.lawMode,'machine');
 assert.equal(c.typexempel15.length,0,'No speculative typecases for '+name);
}
for(const name of [
 'Osann utsaga inför nordisk domstol','Ovarsam utsaga inför nordisk domstol',
 'Osann utsaga inför en internationell domstol','Ovarsam utsaga inför en internationell domstol'
]){
 const c=find(name);assert.ok(c,name);
 assert.equal(c.conditionalPenalty,true,'Do not pretend BrB 15:4a-b have same static penalty');
 assert.equal(c.penaltyRange,null);
 assert.ok(c.penaltyNote.includes('15:')||c.penalty.includes('15:'));
}
vm.runInNewContext(readFileSync(resolve(root,'stages-08.js'),'utf8'),{window,console});
const stage=window.BK_DATA.crimes.filter(c=>c.stageType);
assert.equal(stage.find(x=>x.title==='Försök till äktenskapstvång')?.stageStatus,'punishable');
assert.equal(stage.find(x=>x.title==='Stämpling till barnäktenskapsbrott')?.stageStatus,'punishable');
assert.equal(stage.find(x=>x.title==='Försök till äktenskapsresebrott mot barn')?.stageStatus,'punishable');
assert.equal(stage.find(x=>x.title==='Försök till samlag med syskon')?.stageStatus,'not-criminalized');
console.log('PASS V1.5: 10 missing BrB 4/6/15 offences, 2026 marriage reform, correct inchoate status and conditional foreign court penalties');