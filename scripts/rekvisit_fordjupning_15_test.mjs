import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert.ok(scripts.indexOf('./rekvisit-fordjupning-15.js')>scripts.indexOf('./rekvisit-polisiara-15.js'));
assert.ok(scripts.indexOf('./rekvisit-fordjupning-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./rekvisit-fordjupning-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const rows=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),stats=ctx.window.BK_REKVISIT_DEPTH15;
const by=t=>rows.find(c=>c.title===t);
assert.ok(stats,'Missing deep requisites module');
assert.equal(stats.missing.length,0,'Missing official offence cards: '+stats.missing.join(', '));
assert.equal(stats.mismatch.length,0,'Offence statute mismatch: '+JSON.stringify(stats.mismatch));
assert.ok(stats.updated>=10,'Too few new legal requisite cards: '+JSON.stringify(stats));
for(const name of ['Människorov','Människohandel','Människoexploatering','Olaga förföljelse','Ringa bedrägeri','Utförselhäleri','Oredlighet mot borgenärer','Försvårande av konkurs eller exekutiv förrättning','Mened','Osann partsutsaga','Ovarsam utsaga','Upplopp','Våldsamt upplopp','Brott mot rösthemlighet']){
 const c=by(name);assert.ok(c,'Missing: '+name);
 assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,'Missing elements '+name);
 assert.ok(c.rekvisit15.legalReviewApproved!==true,'No unsupported certification '+name);
}
for(const n of ['Människohandel','Människoexploatering','Ringa bedrägeri','Oredlighet mot borgenärer','Försvårande av konkurs eller exekutiv förrättning','Upplopp']){
 assert.ok(by(n).rekvisit15.routes.length>=2,'Alternative routes missing '+n);
}
const trafficking=by('Människohandel');
assert.ok(trafficking.rekvisit15.routes.some(x=>x.label.includes('under 18')),'Minor route omitted');
assert.ok(trafficking.rekvisit15.routes.some(x=>x.groups.some(g=>g.options?.some(v=>v.includes('allvarligt begränsar')))),'Adult restrictive means missing');
const stalking=by('Olaga förföljelse');
assert.ok(stalking.rekvisit15.routes[0].groups.some(g=>g.label.includes('upprepad kränkning')),'Repeated integrity violation missing');
assert.ok(stalking.rekvisit15.routes[0].groups.some(g=>g.options?.some(x=>x.includes('kontaktförbud'))),'Contact prohibition omitted');
for(const n of ['Mened','Osann partsutsaga','Ovarsam utsaga']){
 assert.ok(by(n).rekvisit15.routes.some(r=>r.groups.some(g=>g.label.includes('15:4'))),'Exception 15:4 omitted '+n);
}
assert.equal(by('Upplopp').rekvisit15.routes.length,2);
assert.equal(by('Våldsamt upplopp').rekvisit15.routes.length,2);
const count=rows.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length;
assert.ok(count>=135,'No material progress '+count);
console.log('PASS V1.5: '+stats.updated+' statutory deep-requisite cards, '+count+' structured crimes, age-specific routes, witness exceptions and riot roles');