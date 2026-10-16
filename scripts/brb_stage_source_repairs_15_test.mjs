import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(files.includes('./brb-stage-source-repairs-15.js'));
assert.ok(files.indexOf('./brb-stage-source-repairs-15.js')<files.indexOf('./stages-08.js'));
assert.ok(sw.includes('./brb-stage-source-repairs-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of files)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const rep=ctx.window.BK_STAGE_SOURCE_REPAIR15;
assert.ok(rep&&rep.refs.length===3);
assert.ok(rep.restored>=1);
const s=ctx.window.BK_STATUTES;
for(const key of ['BrB:9:11','BrB:19:9','BrB:19:14']){
 assert.ok(s[key]?.complete&&s[key]?.machine===false,key+' must be verified complete');
 assert.ok(s[key].text.includes('Lag ('),'Statute amendment note missing '+key);
}
assert.ok(s['BrB:9:11'].text.includes('23 kap. 3 § ska dock inte gälla'),'Special extortion withdrawal exception missing');
assert.ok(s['BrB:9:11'].text.includes('för att bedra försäkringsgivare'),'Insurance fraud preparatory act omitted');
assert.ok(s['BrB:19:14'].text.includes('Som stämpling till högförräderi'),'Wartime inchoate scope missing');
assert.ok(s['BrB:19:14'].text.includes('borde ha insett'),'Disclosure-prevention duty negligent variant missing');
assert.ok(s['BrB:19:9'].text.includes('om Sverige var i krig'),'Wartime alternative penalty absent');
assert.ok(s['BrB:19:9'].text.includes('försvarlig'),'Justification exception absent');
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const linked=base.filter(c=>c.statute==='BrB:19:9');
assert.ok(linked.length>=1,'Vårdslöshet med hemlig uppgift must have a search card');
for(const c of linked){
 assert.ok(c.conditionalPenalty&&c.custody==='unknown','Wartime-sensitive imprisonment cannot be automatically presented as unconditional');
 assert.equal(c.law,s['BrB:19:9'].text);
 assert.equal(c.penaltyRangeVerified,false,'Do not treat one numeric range as exhaustive when alternate wartime maximum applies');
}
assert.ok(ctx.window.BK_DATA.crimes.filter(c=>c.stageType).length>1000);
console.log('PASS V1.5: 9:11 and 19:14 complete stage-support provisions, 19:9 exception and neutral conditional imprisonment');