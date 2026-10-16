import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes('./rekvisit-polisiara-15.js'));
assert.ok(scripts.indexOf('./rekvisit-polisiara-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./rekvisit-polisiara-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const crimes=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),stats=ctx.window.BK_POLICE_REKVISIT15;
assert.ok(stats,'Police-focused statute correction must load');
assert.ok(stats.added>=12,'Expected at least 12 new structured requisites: '+JSON.stringify(stats));
assert.equal(stats.missing.length,0,'No listed crime should silently lack a catalog entry: '+stats.missing.join(', '));
const get=t=>crimes.find(c=>c.title===t);
for(const title of ['Våldsamt motstånd','Angrepp mot tjänsteman','Övergrepp i rättssak','Bevisförvanskning','Tillgrepp av fortskaffningsmedel','Skadegörelse','Tagande av muta','Givande av muta','Spioneri']){
 const c=get(title);assert.ok(c,'Missing crime '+title);
 assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,'Missing requisites '+title);
 assert.notEqual(c.rekvisit15.legalReviewApproved,true,'No unsupported full legal certification');
 assert.ok(c.rekvisit15.sourceURL===stats.source||c.rekvisit15.source?.includes('BrB'),'Source must identify statutory authority');
}
for(const title of ['Angrepp mot tjänsteman','Övergrepp i rättssak','Häleriförseelse','Tagande av muta','Otillbörligt gynnande av borgenär','Spioneri']){
 const c=get(title);assert.ok(c.rekvisit15.routes?.length>=2,'Statutory variants merged in '+title);
}
const violence=get('Våldsamt motstånd');
assert.ok(violence.rekvisit15.groups.some(g=>g.label.includes('passivt motstånd')),'No blanket criminalization of passive resistance');
const extortion=get('Övergrepp i rättssak');
assert.ok(extortion.rekvisit15.routes.every(r=>r.groups.some(g=>/uppsåt|syfte|hämnas|avsikt/i.test(g.label)||g.options?.some(o=>/hämnas|hindra/i.test(o)))),'Protected witness intent omitted');
const structured=crimes.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length;
assert.ok(structured>=116,'Requisites count failed to expand materially: '+structured);
console.log('PASS V1.5: '+stats.added+' police-oriented requisite cards; '+structured+' total structured cards; subjective/situational protection preserved');