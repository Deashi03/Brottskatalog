import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes('./rekvisit-ekonomi-15.js')&&sw.includes('./rekvisit-ekonomi-15.js'));
assert.ok(scripts.indexOf('./rekvisit-ekonomi-15.js')<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),summary=ctx.window.BK_EKONOMI_REKVISIT15;
assert.ok(summary);
assert.equal(summary.mismatch.length,0,JSON.stringify(summary.mismatch));
assert.equal(summary.missing.length,0,JSON.stringify(summary.missing));
assert.equal(summary.added+summary.already,10,'All ten statutory source paths must be structured');
const names=['Ringa tillgrepp av fortskaffningsmedel','Företagskapning','Grov olovlig befattning med betalningsverktyg','Grovt fordringsbedrägeri','Grovt svindleri','Grovt utförselhäleri','Olovlig befattning med betalningsverktyg','Ringa svindleri','Ringa utpressning','Svindleri'];
const by=t=>base.find(c=>c.title===t);
for(const n of names){
 const c=by(n);assert.ok(c,n);
 assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,'Missing requisites '+n);
 assert.notEqual(c.rekvisit15.legalReviewApproved,true,'Full legal approval needs individual authority '+n);
 assert.ok(c.rekvisit15.sourceURL?.includes('riksdagen.se')||c.rekvisit15.source?.includes('BrB'));
}
assert.equal(by('Olovlig befattning med betalningsverktyg').rekvisit15.routes.length,3,'Acquisition, falsification and use must stay separate');
assert.equal(by('Svindleri').rekvisit15.routes.length,2,'Public market price and enterprise insider information are different acts');
assert.ok(by('Ringa tillgrepp av fortskaffningsmedel').rekvisit15.routes[0].groups.some(g=>g.label.includes('försöksstadiet')),'Inchoate exemption for minor vehicle theft must be visible');
assert.ok(by('Ringa svindleri').rekvisit15.routes[0].groups.some(g=>g.label.includes('första stycket')));
for(const n of ['Grovt svindleri','Grovt utförselhäleri','Grov olovlig befattning med betalningsverktyg']){
 assert.ok(JSON.stringify(by(n).rekvisit15).includes('Särskild gradbedömning'),'Gross legal classification must be reviewed holistically');
}
for(const chapter of [8,9]){
 const rows=base.filter(c=>c.statute?.startsWith('BrB:'+chapter+':'));
 assert.ok(rows.length>=14);
 assert.equal(rows.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).length,0,'Chapter '+chapter+' still lacks structured requisites');
}
const total=base.filter(c=>c.statute?.startsWith('BrB:')&&(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)).length;
assert.ok(total>=205,'Expected 205 of 319 BrB requisite summaries, got '+total);
console.log('PASS V1.5: 10 newly scoped economic crime requisite cards, fully structured chapters 8 and 9, '+total+' BrB structured overall');
