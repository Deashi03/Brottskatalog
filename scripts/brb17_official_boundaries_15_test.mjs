import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./brb17-official-boundaries-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod),'Script and offline cache must include source-bound distinctions');
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb17-18-fulltext-15.js'));
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./rekvisit-tjanst-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const r=ctx.window.BK_BRB17_OFFICIAL_BOUNDARIES15;
assert.equal(r.planned,6);assert.equal(r.annotated,6,JSON.stringify(r));
assert.equal(r.held.length,0);assert.equal(r.commonSourcesComplete,true);
const all=ctx.window.BK_DATA.crimes,base=all.filter(c=>!c.stageType),get=t=>base.find(c=>c.title===t);
for(const title of ['Våld eller hot mot tjänsteman','Grovt våld eller hot mot tjänsteman',
 'Angrepp mot tjänsteman','Grovt angrepp mot tjänsteman','Förolämpning mot tjänsteman','Våldsamt motstånd']){
 const c=get(title);assert.ok(c,title);
 const x=c.officialFunctionBoundaries15;
 assert.ok(x?.sourceURL.includes('riksdagen.se'),title);
 assert.ok(x.preparatorySourceURL.includes('regeringen.se'));
 assert.equal(x.individuallyApproved,false);
 assert.equal(x.coercionApproved,false);
 assert.equal(x.stageCriminalizationApproved,false);
 assert.equal(c.rekvisit15.legalReviewApproved,false);
 assert.ok(x.protectedRoles.includes('endast omfattas av 17:1–2'));
 assert.ok(c.rekvisit15.note.includes('Gränsdragning BrB 17:1–5'));
}
assert.ok(get('Våldsamt motstånd').officialFunctionBoundaries15.note.includes('passiv vägran'));
assert.ok(get('Våldsamt motstånd').officialFunctionBoundaries15.note.includes('INTE generellt till 17:3'));
assert.ok(get('Angrepp mot tjänsteman').officialFunctionBoundaries15.note.includes('däremot lidande'));
assert.ok(get('Förolämpning mot tjänsteman').officialFunctionBoundaries15.note.includes('Inte varje kritik'));
assert.equal(all.length,1557);
assert.equal(all.filter(c=>c.stageStatus==='unverified').length,0);
assert.equal(base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified).length,14);
// Fail closed when any cross-referenced protective-scope source is no longer certified.
const subset=JSON.parse(JSON.stringify(get('Våldsamt motstånd')));delete subset.officialFunctionBoundaries15;
const W=JSON.parse(JSON.stringify(ctx.window.BK_STATUTES));
W['BrB:17:5'].complete=false;
const isolated=vm.createContext({window:{BK_DATA:{crimes:[subset]},BK_STATUTES:W}});
vm.runInContext(fs.readFileSync(path.join(root,mod),'utf8'),isolated);
assert.equal(isolated.window.BK_BRB17_OFFICIAL_BOUNDARIES15.annotated,0);
assert.equal(isolated.window.BK_BRB17_OFFICIAL_BOUNDARIES15.held.length,6);
assert.equal(subset.officialFunctionBoundaries15,undefined);
console.log('PASS V1.5: six BrB 17:1–4 boundaries, alternative act, scope of protected roles and nonautomatic legal signoff');