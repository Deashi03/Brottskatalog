// Regression: BrB 5, 10, 11, 14 and 15 gain statute-linked, not falsely approved, requisites.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const module='./rekvisit-fortsattning-15.js';
assert.ok(scripts.includes(module),'Missing requisite-module loader');
assert.ok(sw.includes(module),'Missing offline module cache');
assert.ok(scripts.indexOf(module)<scripts.indexOf('./stages-08.js'),'Requisites need to load before stage-generation');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{warn:()=>{},log:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const all=ctx.window.BK_DATA.crimes;
const brb=all.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:'));
const report=ctx.window.BK_REKVISIT_FORTS15;
assert.ok(report,'Missing statutory batch report');
assert.deepEqual(Array.from(report.mismatch),[],'Never attribute a checklist to the wrong paragraph');
assert.deepEqual(Array.from(report.missing),[],'Offence or source missing in draft');
assert.deepEqual(Array.from(report.missingParent),[],'Do not copy an unstructured parent');
assert.equal(report.added.length+report.already.length,35,'All 35 explicitly scoped offences must be accounted for');
for(const name of [...report.added,...report.already]){
 const crime=brb.find(c=>c.title===name);
 assert.ok(crime?.rekvisit15?.routes?.length||crime?.rekvisit15?.groups?.length,'Missing structured checklist: '+name);
 assert.equal(crime.rekvisit15.legalReviewApproved,false,'No unearned full legal certification: '+name);
 assert.ok(crime.rekvisit15.sourceURL?.includes('riksdagen.se'),'Current statutory source missing: '+name);
 assert.equal(crime.typexempel15?.length||0,0,'Do not fabricate a typical police case for: '+name);
}
const get=t=>brb.find(c=>c.title===t);
assert.ok(JSON.stringify(get('Vårdslös finansiering av mutbrott').rekvisit15).includes('grov oaktsamhet'));
assert.ok(JSON.stringify(get('Grovt tagande av muta').rekvisit15).includes('särskilt ansvarsfull'));
assert.ok(JSON.stringify(get('Brukande av det förfalskade').rekvisit15).includes('som om personen själv'));
assert.ok(JSON.stringify(get('Ovarsam utsaga inför en internationell domstol').rekvisit15).includes('INTE utsaga inför Internationella brottmålsdomstolen'));
assert.equal(get('Osann utsaga inför nordisk domstol').rekvisit15.routes.length,2,'Witness and civil-party variants differ');
for(const chap of [5,10,11,14,15]){
 const offences=brb.filter(c=>c.statute.startsWith('BrB:'+chap+':'));
 assert.ok(offences.length>0,'Chapter not found: '+chap);
 const unstructured=offences.filter(c=>!c.rekvisit15?.routes?.length&&!c.rekvisit15?.groups?.length);
 assert.equal(unstructured.length,0,'Missing structured offences in BrB chapter '+chap+': '+unstructured.map(x=>x.title).join(', '));
}
const structured=brb.filter(c=>c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length).length;
assert.ok(structured>=240,'Need at least 240 of 319 structured BrB offences; found '+structured);
assert.ok(brb.every(c=>c.rekvisit15?.legalReviewApproved!==true),'Full legal certification requires distinct review');
console.log('PASS V1.5: 35 further statutory outlines, five more complete chapters, '+structured+'/'+brb.length+' BrB structured offences');
