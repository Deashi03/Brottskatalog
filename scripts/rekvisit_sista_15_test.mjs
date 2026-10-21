import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./rekvisit-sista-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod),'Complete BrB 6 coverage must load and be cached');
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const D=ctx.window.BK_DATA,stats=ctx.window.BK_REKVISIT_SISTA15;
assert.ok(stats);
assert.equal(stats.missing.length,0,JSON.stringify(stats.missing));
assert.equal(stats.mismatch.length,0,JSON.stringify(stats.mismatch));
assert.equal(stats.missingParent.length,0,JSON.stringify(stats.missingParent));
assert.equal(stats.added.length+stats.already.length,4,'Expected four previously unstructured BrB 6 cards');
const brb=D.crimes.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:'));
assert.equal(brb.length,322,'322 BrB base offences inventory must be preserved');
assert.equal(brb.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).length,0,'No missing STRUCTURAL BrB requisites remain');
const chapters=[...new Set(brb.map(c=>Number(c.statute.match(/^BrB:(\d+):/)[1])))];
assert.equal(chapters.length,20);
for(const chapter of chapters){
 const rows=brb.filter(c=>c.statute.startsWith('BrB:'+chapter+':'));
 assert.ok(rows.every(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length),'Incomplete structure in chapter '+chapter);
}
const by=t=>brb.find(c=>c.title===t);
const child=by('Sexuellt övergrepp mot barn');
assert.equal(child.rekvisit15.routes.length,3,'Different minor age/relationship conditions must not be mixed');
assert.ok(JSON.stringify(child.rekvisit15).includes('6:14'),'Limited youth exception must be disclosed');
const grave=by('Grovt sexuellt övergrepp mot barn');
assert.equal(grave.rekvisit15.routes.length,3);
assert.ok(JSON.stringify(grave.rekvisit15).includes('Separat gradindelning'));
assert.ok(grave.rekvisit15.routes.every(r=>r.groups.every(g=>!String(g.label||'').includes('6:14'))),
  'BrB 6:14 minor-offence exception MUST NOT become an aggravated-offence requisite');
assert.ok(grave.rekvisit15.note.includes('INTE tillämpligt på den grova graden'),
  'Explain why BrB 6:14 cannot be used for gross offence');
assert.ok(child.rekvisit15.routes[0].groups.some(g=>String(g.label).includes('6:14')),
  'Maintain limited 6:14 note in normal-grade context');

for(const name of ['Samlag med avkomling','Samlag med syskon']){
 const c=by(name);assert.equal(c.rekvisit15.routes.length,1);
 assert.ok(JSON.stringify(c.rekvisit15).includes('vaginalt'),'Special 6:7 act restriction required');
 assert.ok(JSON.stringify(c.rekvisit15).includes('olaga tvång'),'Exemption for compelled person required');
}
assert.ok(JSON.stringify(by('Samlag med syskon').rekvisit15).includes('HELsyskon'));
assert.ok(brb.every(c=>c.rekvisit15?.legalReviewApproved!==true),'Structure is not evidence of complete independent legal certification');
assert.equal(D.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,0,'Do not infer case-specific guilt from source-limited stage review');
assert.equal(D.crimes.length,1557,'Offence/stage inventory must remain unchanged');
console.log('PASS V1.5: all 322 BrB base offences carry statutory OCH/ELLER structures, still NO full legal approval');
