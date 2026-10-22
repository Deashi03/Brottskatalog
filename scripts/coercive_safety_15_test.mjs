import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes('./coercive-safety-15.js')&&sw.includes('./coercive-safety-15.js'));
assert.ok(scripts.indexOf('./coercive-safety-15.js')>scripts.indexOf('./coercive-09.js'));
assert.ok(scripts.indexOf('./coercive-safety-15.js')<scripts.indexOf('./decisions-10.js'));
const w={BK_DATA:{crimes:[]}};
const ctx=vm.createContext({window:w,console});
for(const name of ['coercive-07.js','coercive-09.js','coercive-safety-15.js'])
 vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx,{filename:name});
const reg=w.BK_COERCIVE, entry=reg.entries.find(x=>x.id==='husrannsakan');
const ordinary={title:'Kontrollerat brott',penaltyRange:{min:2,max:8,fines:false,life:false},penaltyRangeVerified:true};
const cases=[
 {...ordinary,conditionalPenalty:true},
 {...ordinary,applicabilityConditional:true},
 {...ordinary,penaltyRangeVerified:false},
 {...ordinary,stageStatus:'unverified'},
 {...ordinary,penaltyCrosscheckIssue:{unresolved:true}}
];
assert.equal(reg.score(ordinary,entry).tone,'yes','Verified numeric threshold can be displayed as a preliminary screen');
for(const c of cases){assert.equal(reg.score(c,entry).tone,'unknown');assert.equal(reg.eligible(c,entry),false,'Unknown cannot count as eligible');}
const group=reg.entries.find(x=>x.id==='grupp');
const seized=reg.entries.find(x=>x.id==='beslag');
const murderAttempt={title:'Försök till mord',stageType:'forsok',stageStatus:'punishable',
 stageParentMin:10,stageReviewDate:'2026-10-18',stageSource:'BrB 3:11',
 penaltyRange:{min:1/12,max:18,fines:false,life:false},penaltyRangeVerified:false};
assert.equal(reg.score(murderAttempt,group).tone,'yes',
 'Review-confirmed attempt to a four-year-minimum offence meets the narrow 23:8a threshold');
assert.equal(reg.score(murderAttempt,seized).tone,'unknown',
 'A specific four-year threshold does not certify the attempt range for all measures');
assert.equal(reg.score({...murderAttempt,stageStatus:'unverified'},group).tone,'unknown',
 'Unverified inchoate stages must never be presumed punishable');
assert.equal(reg.score({...murderAttempt,stageReviewDate:null},group).tone,'unknown',
 'No source-reviewed attempt should give a positive threshold');
assert.equal(reg.score({...murderAttempt,stageStatus:'not-criminalized'},seized).tone,'no',
 'Confirmed noncriminalized attempts must show an explicit negative, not an unknown status');
assert.ok(html.includes('window.BK_COERCIVE?.unresolvedForCoercion15?.(c)'),'Verified-scope guard remains active');
assert.ok(html.includes('const fourYearStage=Boolean(applicable&&!uncertain&&'),'Four-year stage route remains separately reviewed');
assert.ok(html.includes('Number(c.stageParentMin)>=4'),'Four-year parent threshold remains required');
assert.ok(html.includes('const known=Boolean(applicable&&!uncertain&&'),'Uncertain statutory scales cannot get a green ordinary custody mark');

assert.ok(html.includes("card('Särskilda grunder','RB 24:2',x.exceptional,'Ingen särskild straffskalegräns'"));
assert.ok(html.includes("card('Utredningshäktning','RB 24:3',x.investigation,route,'Skälig misstanke'"));
assert.ok(html.includes('const ordinary=Boolean(known&&pr.max>=1)'),'RB24:1 remains dependent on a verified statutory threshold');
assert.ok(!html.includes("card('Särskilda grunder','RB 24:2',known&&pr.max>0"));
assert.ok(html.includes("const route=x.onlyVia24_2?'Endast via RB 24:2'"),'RB24:3 clearly identifies when RB24:2 is the only route');
console.log('PASS V1.5: conditional and unreviewed cases never show green coercion eligibility; RB 24:2 remains crime-scale independent');