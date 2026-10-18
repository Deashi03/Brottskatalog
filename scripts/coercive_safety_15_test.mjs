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
assert.ok(html.includes('const unresolved=Boolean(window.BK_COERCIVE?.unresolvedForCoercion15?.(c))'));
assert.ok(html.includes("card('Särskilda grunder','RB 24:2',null,'Oberoende av brottets straffskala'"));
assert.ok(html.includes("card('Utredningshäktning','RB 24:3',null,'Enligt 24:1 eller 24:2'"));
assert.ok(html.includes('yes===null?\'unknown\''),'Custody card needs three-state marker');
assert.ok(!html.includes("card('Särskilda grunder','RB 24:2',known&&pr.max>0"));
assert.ok(html.includes('.custody-mark.unknown'));
console.log('PASS V1.5: conditional and unreviewed cases never show green coercion eligibility; RB 24:2 remains crime-scale independent');