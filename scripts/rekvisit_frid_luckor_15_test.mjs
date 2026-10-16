import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const module='./rekvisit-frid-luckor-15.js';
assert.ok(scripts.includes(module)&&sw.includes(module));
assert.ok(scripts.indexOf(module)<scripts.indexOf('./stages-08.js'),'Prerequisites must be installed before inchoate generation');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const data=ctx.window.BK_DATA;
const brb=data.crimes.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:'));
const stats=ctx.window.BK_FRID_LUCKOR15;
assert.ok(stats,'OCH/ELLER requisite batch missing');
assert.equal(stats.rows,13);
assert.equal(stats.mismatch.length,0,stats.mismatch.join(' / '));
assert.equal(stats.missing.length,0,stats.missing.join(' / '));
assert.equal(stats.added+stats.already,13,'Every chapter 4 candidate must have a detailed requisites list');
const names=['Barnäktenskapsbrott','Dataintrång','Förberedelse genom anbringande av tekniskt hjälpmedel','Grovt dataintrång','Intygande av sexuell oskuld','Oaktsam uppmaning till självmord','Olovlig avlyssning','Oskuldskontroll','Ringa barnfridsbrott','Uppmaning till självmord','Äktenskapsresebrott','Äktenskapsresebrott mot barn','Äktenskapstvång'];
const get=t=>brb.find(x=>x.title===t);
for(const name of names){
 const c=get(name);
 assert.ok(c,name+' not indexed');
 assert.ok(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length,'Missing requisites: '+name);
 assert.notEqual(c.rekvisit15.legalReviewApproved,true,'Do not falsely certify incomplete legal review '+name);
 assert.ok(c.rekvisit15.sourceURL?.includes('riksdagen.se')||c.rekvisit15.source?.includes('BrB'),'Missing statutory source '+name);
}
assert.equal(get('Dataintrång').rekvisit15.routes.length,3,'Access/change/disturbance are three distinct routes');
assert.ok(get('Grovt dataintrång').rekvisit15.routes[0].groups.some(g=>g.label.includes('samlad bedömning')),'Aggravation requires holistic analysis');
assert.ok(get('Äktenskapsresebrott mot barn').rekvisit15.routes.length>=2,'Child-specific route must not require coercion');
assert.ok(get('Barnäktenskapsbrott').rekvisit15.routes.length>=2,'Special child variant must be kept independent');
assert.ok(get('Förberedelse genom anbringande av tekniskt hjälpmedel').isStandaloneInchoate,'No recursive stages');
assert.equal(data.crimes.filter(c=>c.stageType&&c.stageParentId===get('Förberedelse genom anbringande av tekniskt hjälpmedel').id).length,0);
for(const name of ['Oskuldskontroll','Intygande av sexuell oskuld','Uppmaning till självmord','Oaktsam uppmaning till självmord']){
 assert.equal(get(name).typexempel15?.length||0,0,'No invented borderline police typfall: '+name);
}
const structured=brb.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
assert.ok(structured.length>=187,'Expected at least 187 structured BrB cards, got '+structured.length);
const ch4=brb.filter(c=>c.statute.startsWith('BrB:4:'));
assert.equal(ch4.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).length,0,'Chapter 4 must have no missing structured offence cards');
console.log('PASS V1.5: 13 previously missing BrB 4 crime requisites, all 42 chapter-4 cards structured; '+structured.length+' BrB requisites in total');
