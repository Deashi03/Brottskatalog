import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),code=read('requisite-concepts-15.js');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of srcs)if(!src.includes('requisite-concepts-15'))vm.runInContext(read(src),ctx);
// A teaching supplement must not mutate legal state, law text, or existing definitions.
const before=JSON.stringify(ctx.window.BK_DATA),glossaryKeys=Object.keys(ctx.window.BK_DATA.glossary);
const priorGlossary=JSON.parse(JSON.stringify(ctx.window.BK_DATA.glossary));
const contexts=JSON.stringify(ctx.window.BK_TERM_CONTEXT);
vm.runInContext(code,ctx);
const R=ctx.window.BK_REQUISITE_CONCEPTS15,rows=ctx.window.BK_DATA.crimes,manifest=JSON.parse(read('data/course-source-manifest-15.json'));
const withoutLinks=JSON.parse(JSON.stringify(ctx.window.BK_DATA));
for(const c of withoutLinks.crimes)delete c.requisiteConcepts15;
withoutLinks.glossary=priorGlossary;
assert.equal(JSON.stringify(withoutLinks),before,'Concept links must not change law, powers or legal approvals');
assert.deepEqual(Object.keys(ctx.window.BK_DATA.glossary),glossaryKeys,'No new automatic global term matching');
assert.equal(JSON.stringify(ctx.window.BK_TERM_CONTEXT),contexts,'Statute-specific meanings are preserved');
assert.equal(ctx.window.BK_DATA.glossary['täckningsprincipen'],R['bk:tackning'],'Panel and glossary use the same canonical definition object');
assert.ok(ctx.window.BK_REQUISITE_CONCEPT_REPORT15.sharedGlossaryMeanings>=20);
for(const c of Object.values(R)){
 assert.ok(c.id&&c.senseId&&c.text&&c.lawRef&&c.courseSources.length);
 assert.ok(/^https:\/\/(www\.)?(riksdagen.se|domstol.se)\//.test(c.sourceURL));
 for(const s of c.courseSources){
  const m=manifest.sources.find(m=>m.filename===s.file);assert.ok(m,'Source file missing: '+s.file);
  const range=s.paragraphs||s.pages,max=s.paragraphs?m.paragraphCount:m.pageCount;
  assert.ok(range[0]>=1&&range[0]<=range[1]&&range[1]<=max,'Invalid document locator '+JSON.stringify(s));
 }
}
const by=t=>rows.find(c=>!c.stageType&&c.title===t),has=(t,id)=>by(t)?.requisiteConcepts15?.some(r=>r.conceptId==='bk:'+id);
assert.ok(has('Stöld','tillagnelse'));assert.ok(has('Stöld','forsokspunkt'));
assert.ok(!has('Egenmäktigt förfarande','tillagnelse'),'Different theft requirements must not leak into possession offences');
assert.ok(has('Rån','motvarnsran'));assert.ok(!has('Bedrägeri','motvarnsran'));
assert.ok(has('Urkundsförfalskning','falsk-osann'));assert.ok(has('Missbruk av urkund','akta-id'));
assert.ok(!has('Misshandel','bevisfara'),'Proof danger is not bodily harm causality');
assert.match(R['bk:sanningsplikt'].text,/inte begränsat till huvudförhandling/,'Do not reproduce inaccurate course shortcut');
assert.match(R['bk:motvarnsran'].text,/betalningsverktyg/,'Current statutory alternative must not be omitted');
const mapped=rows.filter(c=>c.requisiteConcepts15?.length),base=rows.filter(c=>!c.stageType&&c.rekvisit15);
assert.equal(mapped.length,base.length,'Every structured base card has accessible core explanations');
assert.ok(mapped.length>=387);
for(const c of mapped){
 assert.ok(!c.stageType,'No inherited completed-offence doctrine on inchoate cards');
 assert.equal(new Set(c.requisiteConcepts15.map(r=>r.conceptId)).size,c.requisiteConcepts15.length,'Duplicate button on '+c.title);
 for(const r of c.requisiteConcepts15)assert.equal(r.senseId,R[r.conceptId]?.senseId);
}
assert.ok(read('service-worker.js').includes('./requisite-concepts-15.js'));
assert.ok(html.includes('requisiteConceptButtons(c)'));
assert.ok(html.includes('showRequisiteConcept(concept.dataset.requisiteConcept,concept.dataset.requisiteSense)'));
// A missing data bundle must fail closed rather than breaking the app.
vm.runInNewContext(code,{window:{}});
console.log('PASS: '+Object.keys(R).length+' source-linked concepts across '+mapped.length+' base cards; distinct meanings, locator bounds, shared canonical glossary, unchanged legal state and offline integration');
