import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const a='./special-bidrag-skatt-fulltext-15.js',b='./special-bidrag-skatt-requisites-15.js';
assert.ok(scripts.includes(a)&&scripts.includes(b)&&sw.includes(a)&&sw.includes(b));
assert.ok(scripts.indexOf(a)>scripts.indexOf('./special-law-import-12.js'));
assert.ok(scripts.indexOf(b)>scripts.indexOf(a)&&scripts.indexOf(b)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const full=ctx.window.BK_SPECIAL_BIDRAG_SKATT_FULLTEXT15,req=ctx.window.BK_BIDRAG_SKATT_REQUISITES15;
assert.equal(full.planned,13);assert.equal(full.approved,13,JSON.stringify(full));
assert.equal(full.sectionsChecked,11);assert.equal(full.held.length,0);
assert.equal(req.planned,13);assert.equal(req.structured,13,JSON.stringify(req));
assert.equal(req.held.length,0);assert.equal(req.already.length,0);
const all=ctx.window.BK_DATA.crimes,base=all.filter(c=>!c.stageType),get=x=>base.find(c=>c.title===x);
const names=[
 'Bidragsbrott','Ringa bidragsbrott','Grovt bidragsbrott','Vårdslöst bidragsbrott',
 'Skattebrott','Skatteförseelse','Grovt skattebrott','Vårdslös skatteuppgift',
 'Skatteavdragsbrott','Skatteredovisningsbrott','Vårdslös skatteredovisning',
 'Försvårande av skattekontroll','Grovt försvårande av skattekontroll'];
for(const n of names){
 const c=get(n);assert.ok(c,n);
 assert.equal(c.lawMode,'full');assert.equal(c.lawCompletenessVerified,true);
 assert.equal(c.lawCompletenessChecked,'2026-10-18');
 assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');
 assert.ok(c.lawCompletenessSourceURL.includes('riksdagen.se'));
 assert.equal(c.legalSourceVersion15,c.shortRef.startsWith('BidrBrL')?'2026:1322':'2026:1531');
 assert.equal(c.rekvisit15.legalReviewApproved,false);
 assert.ok(c.rekvisit15.routes.length>=1&&c.rekvisit15.note.includes('fullständiga juridiska granskningen'));
 assert.ok(!c.typexempel15?.length,'No manufactured hard special-law examples: '+n);
}
const sk=get('Skattebrott');assert.equal(sk.rekvisit15.routes.length,2);
assert.equal(get('Bidragsbrott').rekvisit15.routes.length,2);
assert.equal(get('Skatteredovisningsbrott').rekvisit15.routes.length,3);
assert.ok(get('Vårdslös skatteredovisning').rekvisit15.routes[0].groups.some(g=>g.label.includes('INTE generellt')));
assert.ok(get('Vårdslös skatteuppgift').rekvisit15.routes[0].groups.some(g=>g.label.includes('inte generellt varje utebliven deklaration')));
assert.ok(get('Vårdslöst bidragsbrott').rekvisit15.routes[0].groups.some(g=>g.label.includes('mindre allvarlig')));
assert.ok(get('Skatteavdragsbrott').rekvisit15.routes[0].groups.some(g=>g.mode==='any'&&g.options.includes('Grov oaktsamhet')));
assert.equal(all.length,1473);
assert.equal(all.filter(c=>c.stageStatus==='unverified').length,12);
assert.equal(base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified).length,14);
assert.equal(base.filter(c=>c.lawCompletenessVerified===true&&c.lawMode==='full').length,365,'13 tax/benefit + 33 import family cards verified against current SFS');
assert.equal(base.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length,387,'All 68 special-law cards now have separate preliminary structures');
assert.equal(base.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);
// Fail closed: a single wrong imported section must not get fulltext or requisite approval.
const parent=JSON.parse(JSON.stringify(get('Bidragsbrott')));
parent.lawMode='machine';parent.law=ctx.window.BK_SPECIAL_EXCERPTS.BidrBrL.sections['2'].text;
parent.lawCompletenessVerified=false;delete parent.rekvisit15;
const docs=JSON.parse(JSON.stringify(ctx.window.BK_SPECIAL_EXCERPTS));
docs.BidrBrL.sections['2'].text+=' WRONG';
const isolated=vm.createContext({window:{BK_DATA:{crimes:[parent]},BK_SPECIAL_EXCERPTS:docs}});
vm.runInContext(fs.readFileSync(path.join(root,a),'utf8'),isolated);
vm.runInContext(fs.readFileSync(path.join(root,b),'utf8'),isolated);
assert.equal(isolated.window.BK_SPECIAL_BIDRAG_SKATT_FULLTEXT15.approved,0);
assert.equal(isolated.window.BK_BIDRAG_SKATT_REQUISITES15.structured,0);
assert.equal(parent.lawCompletenessVerified,false);assert.equal(parent.rekvisit15,undefined);
console.log('PASS V1.5: 13 official special-law fulltexts and individual preliminary requisites, no stage/custody or final signoff');
