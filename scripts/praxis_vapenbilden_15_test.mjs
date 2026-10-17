import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const mod='./praxis-vapenbilden-15.js';
assert.ok(srcs.includes(mod),'Referenced HD teaching example script absent');
assert.ok(sw.includes(mod),'HD teaching case must work offline');
assert.ok(srcs.indexOf(mod)>srcs.indexOf('./rekvisit-polisiara-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of srcs)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const p=base.find(c=>c.title==='Grovt våld eller hot mot tjänsteman');
assert.ok(p,'Missing police-official aggravated offence');
assert.equal(p.shortRef,'BrB 17:1');
const items=p.typexempel15||[];
const sourced=items.filter(c=>c.sourceURL==='https://www.domstol.se/nyheter/2025/10/grovt-hot-mot-tjansteman/');
assert.equal(sourced.length,1,'HD B 2105-25 must be attached once and only once');
assert.ok(sourced[0].text.includes('inte att bilden i sig direkt omfattades')||
 sourced[0].text.includes('inte att bilden i sig direkt omfattades'), 'Must preserve HD distinction: weapon image does not directly meet weapon-use statutory marker');
assert.ok(sourced[0].text.includes('helhetsbedömning')||sourced[0].text.includes('samlad prövning'),
 'Aggravated grading must be based on a whole-case assessment');
assert.ok(sourced[0].source.includes('NJA 2025 s. 992')&&sourced[0].source.includes('B 2105-25'));
assert.equal(p.rekvisit15.legalReviewApproved,false,'One HD case is not whole-card legal signoff');
assert.equal(ctx.window.BK_HD_PREJUDIKAT15.added,1);
const resistance=base.find(c=>c.title==='Våldsamt motstånd');
const options=resistance?.rekvisit15?.groups?.find(g=>g.mode==='any'&&g.options?.length===2)?.options;
assert.ok(options&&options[0].includes('sätta sig till motvärn'));
assert.ok(options[1].includes('annars med våld'));
assert.ok(!options[0].includes('motvärn med våld'),'Do not invent an express violence condition for motvärn route');
const finalReport=ctx.window.BK_CURATED_LAWTEXT15;
assert.equal(finalReport.sectionsChecked,97,'Curated SFS library includes 97 sections, including BrB 11 creditor offences');
for(const k of ['BrB:13:5c','BrB:17:10']) {
 const law=ctx.window.BK_STATUTES[k];
 assert.equal(law.complete,true);
 assert.equal(law.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
 assert.ok(base.filter(c=>c.statute===k).length>=2);
 assert.ok(base.filter(c=>c.statute===k).every(c=>c.lawCompletenessVerified&&
  c.rekvisit15?.legalReviewApproved!==true));
}
assert.equal(base.filter(c=>c.statute?.startsWith('BrB:')).length,319);
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,12,
 'Inchoate grades require separate source analysis; do not auto-resolve');
console.log('PASS V1.5: HD Vapenbilden authentic precedent, BrB 17:4 corrected, two full current police SFS sections, no unjustified legal approval');
