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
assert.equal(stats.sectionsChecked,29,'Exactly twenty-nine complete paragraphs must have been checked: '+JSON.stringify({missing:stats.missing,mismatch:stats.mismatch,sourceHeads:stats.mismatch.map(k=>({ref:k,text:W[k]?.text?.slice(0,110)}))}));
assert.equal(stats.missing.length,0,JSON.stringify(stats.missing));
assert.equal(stats.mismatch.length,0,JSON.stringify(stats.mismatch));
const addedCards=base.filter(c=>['BrB:13:5c','BrB:17:10'].includes(c.statute));
assert.ok(addedCards.length>=4,'Expected normal and aggravated criminal grades for both newly checked sections');
const propertyKeys=['BrB:8:1','BrB:8:2','BrB:8:4','BrB:8:4a','BrB:8:5','BrB:8:6','BrB:8:7','BrB:9:1','BrB:9:2','BrB:9:3','BrB:12:1','BrB:12:2','BrB:12:3'];
const propertyCards=base.filter(c=>propertyKeys.includes(c.statute));
assert.ok(propertyCards.length>=13,'Every additional official provision must have at least one catalogue card');
for(const key of propertyKeys)assert.ok(propertyCards.some(c=>c.statute===key),'Missing offence card for '+key);
assert.equal(stats.linkedCardsChecked,21+addedCards.length+propertyCards.length,
 'All 29 current SFS paragraphs must cover every related criminal offence card');
const markers={
 'BrB:8:1':['olovligen tager vad annan tillhör','uppsåt att tillägna sig','om tillgreppet innebär skada'],
 'BrB:8:2':['det tillgripnas värde','omständigheter vid brottet','Lag (2017:442).'],
 'BrB:8:4':['grov stöld','brottslighet som utövats systematiskt','Lag (2026:1318).'],
 'BrB:8:4a':['intrång i bostad','mindre allvarlig art','Lag (2021:35).'],
 'BrB:8:5':['3. olovligen tar eller tvingar till sig ett betalningsverktyg','bar gärning','vanmakt','mindre allvarlig art','Lag (2023:257).'],
 'BrB:8:6':['grovt rån','svår kroppsskada','särskilt farlig art','Lag (2017:332).'],
 'BrB:8:7':['olovligen tar och brukar ett motorfordon','Om brottet är ringa','Är brottet grovt','Lag (2017:442).'],
 'BrB:9:1':['medelst vilseledande','automatisk informationsbehandling','Lag (1986:123).'],
 'BrB:9:2':['kontant betalning','oavsett om han eller hon vilseleder någon','Lag (2017:442).'],
 'BrB:9:3':['skyddslösa eller utsatta ställning','organiserad form eller systematiskt','Lag (2026:1318).'],
 'BrB:12:1':['förstör eller skadar egendom','till men för någon annans rätt','Lag (2017:442).'],
 'BrB:12:2':['skadans obetydlighet','övriga omständigheter','Lag (2017:442).'],
 'BrB:12:3':['kulturell eller ekonomisk betydelse','särskilt hänsynslös art','Lag (2026:1318).'],
 'BrB:13:5c':['stör polisverksamhet, räddningstjänst eller ambulanssjukvård','3. vidta annan otillbörlig åtgärd','allvarligt försvåra eller hindra','Lag (2019:1162).'],
 'BrB:17:10':['gjort anmälan, fört talan','Internationella brottmålsdomstolen','Om brottet med hänsyn till omständigheterna är mindre allvarligt','Lag (2022:792).'],
 'BrB:13:12':['försök, förberedelse eller stämpling','grov mordbrand','grovt sabotage mot blåljusverksamhet','Lag (2023:257).'],
 'BrB:3:5':['kroppsskada, sjukdom eller smärta','om brottet är ringa','Lag (1998:393).'],
 'BrB:3:6':['synnerligen grov misshandel','lägst sex och högst tolv år','Lag (2026:1318).'],
 'BrB:17:1':['tjänsteman vid hans eller hennes myndighetsutövning','lägst ett år och sex månader och högst åtta år','Lag (2025:579).'],
 'BrB:17:4':['motvärn','i 1 och 2 §§','Lag (2025:579).'],
 'BrB:3:1':['berövar annan livet','noggrann planering','Lag (2019:805).'],
 'BrB:3:2':['mindre grovt','fängelse, lägst sex och högst tio år.'],
 'BrB:4:5':['allvarlig rädsla','vapenattrapp','Lag (2023:257).'],
 'BrB:17:2':['tjänsteman eller dennes närstående','om brottet är grovt','Lag (2025:579).'],
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
const directCrosschecks=b.filter(c=>c.lawCompletenessVerified===true&&
 c.lawCompletenessReviewScope==='current-paragraph-only'&&
 c.lawCompletenessSourceURL?.includes('riksdagen.se'));
assert.equal(directCrosschecks.length,21+addedCards.length+propertyCards.length,
 'All source-checked criminal offence cards must carry current-paragraph-only provenance');
assert.ok(!base.some(c=>c.statute==='BrB:13:12'),'13:12 is a stage authorization source, not a standalone completed crime');
assert.ok(b.some(c=>c.lawMode==='full'&&!c.lawCompletenessVerified),
 'Embedded full text without documented review must remain distinguishable');
console.log('PASS V1.5: twenty-nine complete current SFS paragraphs verified, without legal signoff');
