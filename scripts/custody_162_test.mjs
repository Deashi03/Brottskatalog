import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=html.indexOf('function custodyAssessment162(c){');
const end=html.indexOf('function showCustody(c){',start);
assert.ok(start>0&&end>start,'Current RB 24 custody screen exists');
const context=vm.createContext({window:{BK_COERCIVE:{range:c=>c.penaltyRange,
 unresolvedForCoercion15:c=>c.penaltyRangeVerified!==true||!!c.conditionalPenalty||!!c.applicabilityConditional}}});
vm.runInContext(html.slice(start,end),context);
const assess=c=>context.custodyAssessment162(c);
const card=(min,max,extra={})=>({penaltyRange:{min,max},penaltyRangeVerified:true,...extra});
const ringa=assess(card(0,.5,{title:'Ringa stöld'}));
assert.equal(ringa.ordinary,false);
assert.equal(ringa.presumption,false);
assert.equal(ringa.exceptional,true);
assert.equal(ringa.investigation,true);
assert.equal(ringa.onlyVia24_2,true,'24:3 only through 24:2 where no ordinary penalty route');
const stold=assess(card(0,2,{title:'Stöld'}));
assert.equal(stold.ordinary,true);assert.equal(stold.onlyVia24_2,false);
assert.equal(assess(card(0,1)).ordinary,true);
assert.equal(assess(card(0,.99)).ordinary,false);
assert.equal(assess(card(1.5,6)).presumption,true);
assert.equal(assess(card(1.49,6)).presumption,false);
for(const title of ['Grov fridskränkning','Grov kvinnofridskränkning','Hedersförtryck'])
 assert.equal(assess(card(1,4,{title})).presumption,true,title+' listed by SFS 2026:1319');
assert.equal(assess(card(0,1,{title:'Hedersförtryck',stageType:'forsok',stageStatus:'punishable',stageParentMin:1})).presumption,false);
for(const stageType of ['forsok','forberedelse','stampling'])
 assert.equal(assess(card(0,18,{stageType,stageStatus:'punishable',stageParentMin:4,
  stageReviewDate:'2026-10-20',stageSource:'BrB 23'})).presumption,true);
assert.equal(assess(card(0,18,{stageType:'forsok',stageStatus:'unverified',stageParentMin:4})).presumption,false);
assert.equal(assess(card(0,18,{stageType:'forsok',stageStatus:'punishable',stageParentMin:4,conditionalPenalty:true})).presumption,false);
assert.equal(assess(card(0,0,{stageType:'forsok',stageStatus:'not-criminalized'})).exceptional,false);
assert.equal(assess(card(0,6,{applicabilityConditional:true})).exceptional,false);
assert.equal(assess(card(0,6,{penaltyRangeVerified:false})).ordinary,false);
for(const word of ['Endast via RB 24:2','Ny häktningsprövning senast inom en vecka','endast böter','LUL 23 §'])
 assert.ok(html.toLowerCase().includes(word.toLowerCase()),'Missing custody limitation '+word);
assert.ok(html.includes("card('Utredningshäktning','RB 24:3',x.investigation"),'RB24:3 not globally hardcoded');
assert.ok(html.includes("card('Särskilda grunder','RB 24:2',x.exceptional"),'RB24:2 not globally hardcoded');
console.log('PASS 1.6.2: current-law RB24:1/2/3 screening, special-stage presumption, only-24:2 route and caveats');