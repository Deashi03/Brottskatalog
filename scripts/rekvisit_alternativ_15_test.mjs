import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes('./rekvisit-alternativ-15.js'));
assert.ok(scripts.indexOf('./rekvisit-alternativ-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./rekvisit-alternativ-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const crimes=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),by=t=>crimes.find(c=>c.title===t);
const stats=ctx.window.BK_REKVISIT_ALTERNATIVES15;
assert.ok(stats,'Alternative-offence requisite module did not initialize');
console.log('V1.5 NEW ALTERNATIVE CANDIDATES '+JSON.stringify(stats));
assert.equal(stats.mismatched.length,0,'Citation mismatch in existing crime cards: '+stats.mismatched.join(' / '));
assert.equal(stats.missing.length,0,'Missing required legal alternative offences: '+stats.missing.join(' / '));
assert.ok(stats.updated>=5,'Expected supplemental progress after more extensively reviewed modules: '+stats.updated);
const required=['Människorov','Människohandel','Människoexploatering','Olaga förföljelse','Inbrottsstöld','Rån','Grovt rån','Ringa bedrägeri','Oredlighet mot borgenärer','Försvårande av konkurs eller exekutiv förrättning','Sexuellt ofredande'];
for(const t of required){
 const c=by(t);assert.ok(c,'Missing '+t);
 assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,'Missing actual structured elements: '+t);
 assert.notEqual(c.rekvisit15.legalReviewApproved,true,'Never mass-certify statute/doctrine: '+t);
}
assert.equal(by('Rån').rekvisit15.routes.length,4,'All four independent BrB 8:5 acts must remain visible');
assert.ok(by('Människohandel').rekvisit15.routes.some(r=>/under 18|barn/i.test(r.label)),'The under-18 criminalization exception must remain visible');
const adultroutes=by('Människohandel').rekvisit15.routes;
assert.ok(adultroutes.some(r=>r.groups.some(g=>g.options?.some(v=>v.startsWith('Olaga tvång')))));
const minor=by('Ringa bedrägeri').rekvisit15;
assert.ok(minor.routes.length>=2,'Payment evasion can occur without deception');
for(const grade of ['Grovt rån','Grovt bedrägeri','Grovt försvårande av konkurs eller exekutiv förrättning']){
 const c=by(grade);assert.ok(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length,grade+' missing detailed base act');
 assert.ok(JSON.stringify(c.rekvisit15).includes('helhetsbedömning'),'Grade classification cannot be inferred from only one criterion');
}
const gross=by('Grovt försvårande av konkurs eller exekutiv förrättning');
assert.ok(JSON.stringify(gross.rekvisit15).includes('Grov oaktsamhet räcker inte'),'Intent-only gross variant must not inherit gross negligence');
const structured=crimes.filter(c=>c.statute?.startsWith('BrB:')&& (c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)).length;
assert.ok(structured>=134,'Structured legal support should increase meaningfully: '+structured);
console.log('PASS V1.5: '+stats.updated+' new offence summaries including 4-way robbery, child-trafficking exceptions, economic crime and selected grade safeguards. Structured '+structured+'.');