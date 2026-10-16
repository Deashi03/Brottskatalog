import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.indexOf('./brb-source-repairs-15.js')>=0);
assert.ok(scripts.indexOf('./brb-source-repairs-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./brb-source-repairs-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const report=ctx.window.BK_TEXT_REPAIR15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(report);
assert.equal(report.refs.length,4);
assert.equal(report.restored,4,'Known machine-import truncation should be repaired for four SFS provisions');
const expect={
 'BrB:4:3': ['5. straffbart försök','barnfridsbrott','Lag (2026:852)'],
 'BrB:6:6': ['sexuellt övergrepp mot barn','Om brottet är mindre grovt','Lag (2025:586)'],
 'BrB:6:10a': ['föreslår en träff eller stämmer träff','Lag (2026:1318)'],
 'BrB:6:12': ['nyttjanderätt','verksamheten fortsätter eller återupptas','Lag (2025:586)']
};
for(const [ref,words] of Object.entries(expect)){
 const source=ctx.window.BK_STATUTES[ref];
 assert.ok(source.complete===true&&source.machine===false,'Source was not fully repaired '+ref);
 for(const w of words)assert.ok(source.text.includes(w),ref+' missing '+w);
 const items=base.filter(c=>c.statute===ref);
 assert.ok(items.length>0,'No crime cards for '+ref);
 for(const c of items){
   assert.equal(c.law,source.text,'Crime card must display corrected full current law '+c.title);
   assert.ok(c.lawCompletenessVerified,'Corrected item must have independent source verification');
   assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'Repair cannot certify all doctrinal requisites');
 }
}
const get=t=>base.find(c=>c.title===t);
for(const title of ['Barnfridsbrott','Grovt barnfridsbrott','Sexuellt övergrepp mot barn','Grovt sexuellt övergrepp mot barn']){
 assert.ok(get(title)?.lawCompletenessVerified,title+' must inherit full cited text');
}
const meeting=get('Kontakt för att träffa ett barn i sexuellt syfte');
assert.ok(meeting,'Missing contact offence');
assert.ok(meeting.law.includes('föreslår en träff')&&meeting.law.includes('stämmer träff'));
assert.equal(meeting.penaltyRange?.max,2,'6:10a maximum must reflect 2026:1318');
assert.ok(meeting.rekvisit15?.routes?.length||meeting.rekvisit15?.groups?.length,'6:10a detailed offence requisites missing');
for(const title of ['Koppleri','Grovt koppleri']){
 const c=get(title);assert.ok(c?.lawCompletenessVerified,title+' text missing');
 assert.ok(c.law.includes('lägenhet'),title+' special housing omission');
}
console.log('PASS V1.5: four verified full SFS provisions, 2026 child-contact alternative, correct statute grades and no false doctrinal approval');