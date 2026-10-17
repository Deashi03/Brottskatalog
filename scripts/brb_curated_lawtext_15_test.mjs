import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const mod='./brb-curated-lawtext-15.js';
assert.ok(sources.includes(mod)&&sw.includes(mod),'Curated paragraphs must be loaded and offline');
assert.ok(sources.indexOf(mod)<sources.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of sources)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const W=ctx.window.BK_STATUTES;
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const stats=ctx.window.BK_CURATED_LAWTEXT15;
assert.ok(stats,'Curated lawtext report missing');
assert.equal(stats.sectionsChecked,5,'Exactly five complete paragraphs must have been checked');
assert.equal(stats.missing.length,0,JSON.stringify(stats.missing));
assert.equal(stats.mismatch.length,0,JSON.stringify(stats.mismatch));
assert.equal(stats.linkedCardsChecked,8,'Two 6:7, two 21:7, two 22:6a and two 22:6b cards; 21:15 is stage reference only');
const markers={
 'BrB:6:7':['vaginalt samlag','helsyskon','otillbörligt sätt. Lag (2022:1043).'],
 'BrB:21:7':['grov olovlig avvikelse av krigsman','2. gått över till fienden','Lag (2026:924).'],
 'BrB:21:15':['underlåtenhet att avslöja eller förhindra','För medverkan till tjänstebrott','Lag (2026:924).'],
 'BrB:22:6a':['1. utvecklar, producerar','4. använder ämnen för kravallbekämpning','Lag (2021:1014).'],
 'BrB:22:6b':['Första stycket gäller endast minor','Sådan befattning med minor som är tillåten','Lag (2021:1014).']
};
for(const [ref,expected] of Object.entries(markers)){
 const item=W[ref];
 assert.equal(item.complete,true,'Source complete: '+ref);
 assert.equal(item.machine,false,'Not a machine-only excerpt: '+ref);
 assert.equal(item.checked,'2026-10-17');
 assert.equal(item.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
 for(const phrase of expected)assert.ok(item.text.includes(phrase),ref+' lacks '+phrase);
 for(const c of base.filter(c=>c.statute===ref)){
  assert.equal(c.law,item.text,'Card should display full, not truncated paragraph: '+c.title);
  assert.equal(c.lawCompletenessVerified,true);
  assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');
  assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'No full jurisprudential approval through source repair');
 }
}
assert.equal(base.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);
const b=base.filter(c=>c.statute?.startsWith('BrB:'));
assert.equal(b.length,319);
assert.ok(b.filter(c=>c.lawMode==='full'||c.lawCompletenessVerified===true).length>=46,
 'At least eight additional linked cards should now have complete current paragraph text');
console.log('PASS V1.5: five additional complete current SFS paragraphs verified, without legal signoff');
