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
// Every measure has at most one police decision label; own decision takes precedence over FID.
for(const measureRow of coercive){
 const allPaths=co.decisionPaths(measureRow),ids=allPaths.map(x=>x.id);
 assert.ok(!(ids.includes('own')&&ids.includes('fid')),'Overlapping own/FID labels on '+measureRow.id);
 if(ids.includes('own'))assert.ok(allPaths.some(x=>x.label==='Polisman beslutar'),'Wrong direct decision label for '+measureRow.id);
 if(ids.includes('fid'))assert.ok(allPaths.some(x=>x.label==='Polisman FID'),'Wrong urgent decision label for '+measureRow.id);
}
assert.ok(co.decisionPaths(measure('beslag')).some(x=>x.label==='Polisman beslutar'));
assert.ok(!co.decisionPaths(measure('beslag')).some(x=>x.label==='Polisman FID'));
assert.equal(JSON.stringify(co.decisionPaths(measure('husrannsakan')).map(x=>x.id).filter(x=>x==='fid')),JSON.stringify(['fid']));

assert.equal(measure('beslag').officerMode,'both');
assert.equal(measure('husrannsakan').officerMode,'fid');
assert.equal(measure('postbeslag').officerMode,'none');
assert.equal(measure('telefon').officerMode,'direct');
assert.equal(status('Ringa stöld','grupp').tone,'no');
assert.equal(status('Försök till mord','grupp').tone,'yes');
assert.equal(status('Ringa stöld','beslag').tone,'neutral');
assert.equal(status('Försök till ringa stöld','beslag').tone,'no');
for(const title of ['Grovt skattebrott','Grov vapensmuggling','Försök till ringa stöld'])assert.ok(find(title)?.investigation?.length>=3,'Missing field plan for '+title);
assert.equal(find('Försök till mord').stagePenaltyLower,'1 mån','Attempted murder must not show 18 years as minimum');
assert.equal(find('Försök till mord').penaltyRange.min,1/12);
assert.ok(find('Försök till mord').stagePenaltyUpper.includes('18 år'));
assert.equal(find('Människorov').prosecution,'general','Ordinary public prosecution must get a green check');
assert.equal(find('Smuggling').prosecution,'conditional','Conditional special smuggling prosecution');
assert.equal(find('Penningtvättsbrott').prosecution,'general','General prosecution for money-laundering');
assert.equal(find('Skattebrott').prosecution,'conditional','Tax charge restriction must be displayed');
assert.equal(find('Bidragsbrott').prosecution,'conditional','Admin sanction restriction must be displayed');
assert.equal(w.BK_PROSECUTION12?.resolved,12,'All 12 previously unreviewed BrB prosecution rules must be classified');
assert.equal(cs.filter(c=>!c.stageType&&c.prosecution==='unknown').length,0,'All base crimes require explicit prosecution rule classification');
assert.equal(find('Ringa bokföringsbrott').prosecution,'conditional');
assert.equal(find('Vårdslöshet mot borgenärer').prosecution,'conditional');
assert.equal(find('Bokföringsbrott').prosecution,'general');
assert.equal(find('Falskt larm').prosecution,'general');

assert.ok(co.decisionGuide(measure('beslag')).complex,'Beslag must show warning icon for conditions');
assert.ok(co.decisionGuide(measure('beslag')).lines.join(' ').includes('gatan'),'Beslag must explain free-standing street discoveries');
assert.equal(co.decisionGuide(measure('husrannsakan')).brief,'Polisman FID');
assert.equal(co.decisionGuide(measure('beslag')).brief,'Polisman beslutar');
assert.equal(find('Grovt skattebrott').penaltyRange.min,1);
assert.equal(find('Grovt penningtvättsbrott').penaltyRange.min,1);
assert.equal(find('Grovt brott mot tillståndsplikten för explosiva varor').penaltyRange.min,4);
// A downloaded statute may be displayed only as a MACHINE excerpt, never full verified text.
const imp=w.BK_SPECIAL_IMPORT12, generated=w.BK_SPECIAL_EXCERPTS;
if(generated&&Object.keys(generated).length){
 assert.equal(imp?.linked,46,'All 46 special-law base entries must receive a source excerpt');
 assert.equal(imp?.missing,0,'No missing source excerpt in the verified extraction set');
 for(const c of cs.filter(x=>x.id.startsWith('v09-')&&!x.stageType)){
  assert.equal(c.lawMode,'machine','Special-law extract must not be labeled full/verified: '+c.title);
  assert.equal(c.lawCompletenessVerified,false,'Extract still requires legal review: '+c.title);
  assert.ok(c.law?.length>=35,'Missing special-law paragraph: '+c.title);
 }
 const smuggling=generated.SmuglL.sections['6']?.text||'';
 const tax=generated.SkBrL.sections['8']?.text||'';
 assert.ok(smuggling.includes('narkotikasmuggling')&&smuggling.length>800,'Smuggling 6 § extraction corrupted');
 assert.ok(tax.includes('vårdslös skatteredovisning')&&tax.length>180,'Tax 8 § extraction corrupted');
}
const offline=readFileSync(resolve(root,'service-worker.js'),'utf8');
for(const file of ['special-09.js','coercive-09.js','stages-08.js'])assert.ok(offline.includes(file),'Missing offline file: '+file);
assert.ok(html.includes("accordion('lag','Lagtext'"),'Law text first');
assert.ok(html.includes('coercive-filter')&&html.includes('decision-help'),'Measure status UI missing');
assert.ok(html.includes('data-decision-info')&&html.includes('status-icon.good'),'Conditional help and green prosecution UI missing');
assert.ok(html.includes('.app-shell.nav-layout>main.page'),'Scroll viewport CSS missing');
assert.ok(html.includes('.app-shell.nav-layout>.bottom-nav'),'Non-overlay navigation CSS missing');
assert.equal((html.match(/app.className='app-shell nav-layout '/g)||[]).length,3,'All three tabs must use content viewport');

console.log('PASS full 0.9 load:',JSON.stringify({total:cs.length,base:cs.length-stages.length,stages:stages.length,byStatus:stages.reduce((a,c)=>(a[c.stageStatus]=(a[c.stageStatus]||0)+1,a),{}),measures:coercive.length,legalCases:cases.length,warnings:warning.length}));
if(warning.length)console.log('CAVEAT unresolved legacy law-text imports:',warning.slice(0,6).join('; '));
