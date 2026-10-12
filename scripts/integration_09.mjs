import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const blocks=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(blocks.length>=5,'Index contains statute and catalog bootstraps');
assert.ok(scripts.indexOf('./special-09.js')<scripts.indexOf('./stages-08.js'));
assert.ok(scripts.indexOf('./coercive-07.js')<scripts.indexOf('./coercive-09.js'));
const warning=[];
const context=vm.createContext({window:{},console:{warn:(...x)=>warning.push(x.join(' ')),log:()=>{},error:(...x)=>warning.push(x.join(' '))}});
for(const i of [1,2,3])vm.runInContext(blocks[i],context,{filename:'index.html:base-'+i});
for(const file of scripts)vm.runInContext(readFileSync(resolve(root,file),'utf8'),context,{filename:file});
new vm.Script(blocks.at(-1),{filename:'index.html:ui'});
const w=context.window,cs=w.BK_DATA.crimes,co=w.BK_COERCIVE,stages=cs.filter(c=>!!c.stageType);
const find=t=>cs.find(c=>c.title.toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
const measure=id=>co.entries.find(e=>e.id===id);
const status=(title,id)=>co.score(find(title),measure(id));
assert.ok(cs.length>=950,'Broad catalog should be present: '+cs.length);
assert.ok(cs.filter(c=>!c.stageType).length>=280,'Expanded base catalog should be present');
assert.ok(stages.length>=800,'Stage catalog should be present');
assert.ok(scripts.indexOf('./stages-08.js')<scripts.indexOf('./field-07.js'),'Field notes must be applied after all generated crimes');

assert.equal(new Set(cs.map(c=>c.id)).size,cs.length,'No duplicate crime IDs');
assert.equal(new Set(cs.map(c=>c.title.toLocaleLowerCase('sv'))).size,cs.length,'No duplicate titles');
for(const c of cs){
 assert.ok(c.title&&c.id&&c.ref&&c.shortRef,'Mandatory entry attributes missing: '+c.title);
 if(c.penaltyRange)assert.ok(Number.isFinite(c.penaltyRange.min)&&Number.isFinite(c.penaltyRange.max)&&c.penaltyRange.min>=0&&c.penaltyRange.max>=c.penaltyRange.min,'Invalid penalty range: '+c.title);
 if(c.stageType&&['not-criminalized','unverified'].includes(c.stageStatus))assert.equal(c.penaltyRange,null,'Noncriminal/unverified stage has penalty range: '+c.title);
}
const cases=[
 ['Försök till mord','punishable'],
 ['Stämpling till mord','punishable'],
 ['Försök till ringa stöld','not-criminalized'],
 ['Försök till grov narkotikasmuggling','punishable'],
 ['Förberedelse till ringa narkotikasmuggling','punishable'],
 ['Stämpling till ringa narkotikasmuggling','not-criminalized'],
 ['Stämpling till penningtvättsbrott','punishable'],
 ['Förberedelse till grovt skattebrott','punishable'],
 ['Försök till grovt skattebrott','not-criminalized'],
 ['Försök till grovt brott mot tillståndsplikten för explosiva varor','punishable'],
 ['Försök till bidragsbrott','not-criminalized']
];
for(const [title,expected] of cases)assert.equal(find(title)?.stageStatus,expected,title);
const coercive=co.entries.filter(e=>!['hemlig','hemligo'].includes(e.id));
assert.equal(coercive.length,27,'27 visible RB23–28 measures');
for(const e of coercive){
 assert.ok(e.officerMode&&e.otherDecision&&e.decisionAuthority,'Officer authority missing: '+e.id);
 assert.ok(['direct','fid','both','none','special'].includes(e.officerMode),'Invalid decision code: '+e.id);
 assert.ok(/RB \d{2}:\d+/.test(e.ref),'Full statute reference: '+e.title);
}
assert.equal(measure('beslag').officerMode,'both');
assert.equal(measure('husrannsakan').officerMode,'fid');
assert.equal(measure('postbeslag').officerMode,'none');
assert.equal(measure('telefon').officerMode,'direct');
assert.equal(status('Ringa stöld','grupp').tone,'no');
assert.equal(status('Försök till mord','grupp').tone,'yes');
assert.equal(status('Ringa stöld','beslag').tone,'neutral');
assert.equal(status('Försök till ringa stöld','beslag').tone,'no');
for(const title of ['Grovt skattebrott','Grov vapensmuggling','Försök till ringa stöld'])assert.ok(find(title)?.investigation?.length>=3,'Missing field plan for '+title);
assert.equal(find('Grovt skattebrott').penaltyRange.min,1);
assert.equal(find('Grovt penningtvättsbrott').penaltyRange.min,1);
assert.equal(find('Grovt brott mot tillståndsplikten för explosiva varor').penaltyRange.min,4);
const offline=readFileSync(resolve(root,'service-worker.js'),'utf8');
for(const file of ['special-09.js','coercive-09.js','stages-08.js'])assert.ok(offline.includes(file),'Missing offline file: '+file);
assert.ok(html.includes("accordion('lag','Lagtext'"),'Law text first');
assert.ok(html.includes('coercive-filter')&&html.includes('measure-decision'),'Measure status UI missing');
console.log('PASS full 0.9 load:',JSON.stringify({total:cs.length,base:cs.length-stages.length,stages:stages.length,byStatus:stages.reduce((a,c)=>(a[c.stageStatus]=(a[c.stageStatus]||0)+1,a),{}),measures:coercive.length,legalCases:cases.length,warnings:warning.length}));
if(warning.length)console.log('CAVEAT unresolved legacy law-text imports:',warning.slice(0,6).join('; '));
