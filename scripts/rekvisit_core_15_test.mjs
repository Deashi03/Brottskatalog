import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert.ok(scripts.indexOf('./rekvisit-core-15.js')>scripts.indexOf('./rekvisit-typexempel-15.js'));
assert.ok(sw.includes('./rekvisit-core-15.js'),'New legal summaries must work offline');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const all=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const latest=ctx.window.BK_REKVISIT_CORE15;
assert.ok(latest,'New legal review summary must run');
assert.ok(latest.updated>=22,'Expected at least 22 new, distinct structured entries, got '+latest.updated);
assert.equal(latest.missing.length,0,'Do not silently ignore missing requested offences: '+latest.missing.join(', '));
const important=['Framkallande av fara för annan','Arbetsmiljöbrott','Olaga frihetsberövande','Olaga hot','Ofredande','Förtal','Bedrägeri','Häleri','Utpressning','Förskingring','Olovligt förfogande','Behörighetsmissbruk','Tjänstefel','Brott mot tystnadsplikt','Urkundsförfalskning','Kränkande fotografering','Olaga integritetsintrång','Mordbrand'];
for(const name of important){
 const c=all.find(x=>x.title===name);
 assert.ok(c,'Brott saknas: '+name);
 assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,'Saknar strukturerade rekvisit: '+name);
 assert.ok(c.rekvisit15.sourceURL?.includes('riksdagen.se'),'Official source link missing');
 assert.ok(c.rekvisit15.scope==='lagtext-jamford','Cannot auto-certify as comprehensive');
}
for(const name of ['Bedrägeri','Häleri','Egenmäktigt förfarande','Ocker','Våld eller hot mot tjänsteman','Brott mot tystnadsplikt']){
 const c=all.find(x=>x.title===name);
 assert.ok(c.rekvisit15.routes.length>=2,name+' must preserve statutory alternative acts');
}
for(const name of ['Framkallande av fara för annan','Olaga hot','Ofredande','Olovlig energiavledning','Förtal','Kränkande fotografering']){
 const c=all.find(x=>x.title===name);
 assert.ok(c.rekvisit15.groups.some(g=>g.mode==='any'),name+' must show alternative prerequisites');
}
const original=all.find(x=>x.title==='Märkesförfalskning');
assert.ok(original.rekvisit15.groups.length>0,'Existing verified case must survive');
const count=all.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length;
assert.ok(count>=42,'Structured legal summaries must expand beyond prior 16 posts');
console.log('PASS V1.5: '+latest.updated+' source-linked BrB requisite expansions and '+count+' structured cards with statutory alternative pathways');