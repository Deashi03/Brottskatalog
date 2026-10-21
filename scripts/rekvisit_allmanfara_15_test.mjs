import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./rekvisit-allmanfara-15.js';
assert.ok(scripts.includes(mod),'BrB 13 requisite module not included');
assert.ok(sw.includes(mod),'BrB 13 offline module not cached');
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'),'Load legal requisites before generating inchoate cards');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const D=ctx.window.BK_DATA,report=ctx.window.BK_REKVISIT_ALLMANFARA15;
assert.ok(report,'BrB 13 completion summary missing');
assert.equal(report.missing.length,0,JSON.stringify(report.missing));
assert.equal(report.mismatch.length,0,JSON.stringify(report.mismatch));
assert.equal(report.missingParent.length,0,JSON.stringify(report.missingParent));
assert.equal(report.added.length+report.already.length,17,'All 17 previously unstructured Chapter 13 titles must be accounted for');
const ch13=D.crimes.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:13:'));
assert.equal(ch13.length,22,'BrB 13 inventory count unexpectedly changed');
assert.equal(ch13.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).length,0,
  'Chapter 13 remains structurally incomplete: '+ch13.filter(c=>!c.rekvisit15?.groups?.length&&!c.rekvisit15?.routes?.length).map(x=>x.title).join(', '));
const by=t=>ch13.find(c=>c.title===t);
for(const name of [...report.added,...report.already]){
 const c=by(name);assert.ok(c);
 assert.equal(c.rekvisit15.legalReviewApproved,false,'No unearned complete legal certification');
 assert.equal(c.rekvisit15.scope,'lagtext-jamford');
 assert.ok(c.rekvisit15.sourceURL.includes('riksdagen.se'));
 const expectedHD=['Sabotage mot blåljusverksamhet','Grovt sabotage mot blåljusverksamhet'].includes(name);
 assert.equal(c.typexempel15?.length||0,expectedHD?1:0,'Chapter 13 permits only individually checked authentic HD examples');
 for(const example of c.typexempel15||[]){
  assert.equal(example.status,'cited-supreme-court-example');
  assert.equal(example.sourceURL,'https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2023/b-6185-22.pdf');
  assert.equal(example.fullLegalReviewApproved,false);
  assert.equal(example.fullJurisprudenceReviewApproved,false);
 }
}
assert.equal(by('Kapning').rekvisit15.routes.length,2);
assert.equal(by('Sjö- eller luftfartssabotage').rekvisit15.routes.length,2);
assert.equal(by('Flygplatssabotage').rekvisit15.routes.length,3);
assert.equal(by('Sabotage mot blåljusverksamhet').rekvisit15.routes.length,3);
assert.equal(by('Spridande av gift eller smitta').rekvisit15.routes.length,2);
assert.equal(by('Underlåtenhet att avvärja allmänfara').rekvisit15.routes.length,1);
assert.ok(JSON.stringify(by('Grovt allmänfarlig vårdslöshet').rekvisit15).includes('Oaktsamhet är skuldformen'));
assert.ok(JSON.stringify(by('Grov kapning').rekvisit15).includes('samlad'));
const total=D.crimes.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:')&&(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length)).length;
assert.ok(total>=261,'Expected at least 261 structured BrB card requisites, got '+total);
console.log('PASS V1.5: 17 further chapter 13 offences with alternate routes, no false legal approval; '+total+'/322 total');
