import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),mod='./brb-prosecution-audit-15.js',code=read(mod);
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of sources)if(s!==mod)vm.runInContext(read(s),ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),before=copy(ctx.window.BK_DATA.crimes),W=copy(ctx.window.BK_STATUTES),interpret=copy(ctx.window.BK_PROSECUTION_INTERPRETATIONS15);
vm.runInContext(code,ctx);const all=ctx.window.BK_DATA.crimes,r=ctx.window.BK_BRB_PROSECUTION_AUDIT15;
assert.equal(r.planned,313);assert.equal(r.completed,313);assert.equal(r.held.length,0);assert.equal(r.sourceParagraphs,226);
assert.equal(Object.values(r.byChapter).reduce((a,b)=>a+b,0),313);
assert.equal(Object.values(r.byRule).reduce((a,b)=>a+b,0),313);
assert.equal(r.fullLegalApprovals,0);assert.equal(r.caseSpecificChargingApprovals,0);assert.equal(r.coercionApprovals,0);
assert.equal(all.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:')&&c.legalAudit15?.checkpoints?.prosecution?.status==='APPROVED').length,318);
assert.deepEqual(copy(r.correctedModes).sort(),['Grovt hemfridsbrott','Grovt olaga intrång','Grovt fordringsbedrägeri','Förberedelse genom anbringande av tekniskt hjälpmedel'].sort());
assert.equal(r.clarifiedCards.length,11);
const changed=new Set(r.clarifiedCards),allowed=['prosecutionStatutoryReview15','legalAudit15'],fixFields=['prosecution','prosecutionLabel','prosecutionRule','prosecutionDetails','prosecutionSource','prosecutionSourceURL','prosecutionChecked','prosecutionReviewStatus'];
for(const c of all){const old=before.find(x=>x.id===c.id);const current=copy(c),prior=copy(old);
 if(c.prosecutionStatutoryReview15&&c.statute?.startsWith('BrB:')){const p=c.legalAudit15.checkpoints.prosecution;
  assert.equal(p.status,'APPROVED');assert.equal(p.checked,'2026-10-20');assert.equal(p.caseSpecificChargingApproved,false);assert.equal(p.jurisdictionAndImmunityInConcreteCaseApproved,false);assert.equal(p.caseSpecificCustodyApproved,false);assert.equal(p.jurisprudenceApproved,false);
  assert.ok(p.finding.startsWith(c.title+' ('));assert.ok(p.sourceRefs.includes(c.statute)&&p.sourceRefs.includes('RB:20:3'));
  const oldAudit=copy(old.legalAudit15);const newAudit=copy(c.legalAudit15);delete newAudit.checkpoints.prosecution;assert.deepEqual(newAudit,oldAudit,'Other eight legal checkpoints are preserved');
  for(const k of allowed){delete current[k];delete prior[k];}
  if(changed.has(c.title))for(const k of fixFields){delete current[k];delete prior[k];}
 }
 assert.deepEqual(current,prior,'No hidden changes to penalties, stage support, requisites or powers: '+c.title);
}
const by=t=>all.find(c=>c.title===t),finding=t=>by(t).prosecutionStatutoryReview15.finding;
for(const t of ['Grovt hemfridsbrott','Grovt olaga intrång']){assert.equal(by(t).prosecution,'general');assert.match(finding(t),/inte.*normalgradernas/);}
assert.equal(by('Grovt fordringsbedrägeri').prosecution,'conditional');assert.match(finding('Grovt fordringsbedrägeri'),/bara grovt bedrägeri och grov utpressning/);
assert.equal(by('Förberedelse genom anbringande av tekniskt hjälpmedel').prosecution,'conditional');assert.match(finding('Förberedelse genom anbringande av tekniskt hjälpmedel'),/telehemlighet.*räknas inte upp/);
assert.match(finding('Vållande till kroppsskada eller sjukdom'),/OCH/);assert.match(finding('Vållande till kroppsskada eller sjukdom'),/kravet på allmän synpunkt kvarstår/);
assert.match(finding('Ringa stöld'),/ELLER/);assert.match(finding('Grovt häleri'),/bara grovt bedrägeri och grov utpressning/);
assert.match(finding('Grovt tagande av muta'),/tredje styckets.*inte omfattar/);assert.match(finding('Grovt tagande av muta'),/Första styckets/);
for(const t of ['Grovt olovligt förfogande','Grovt olovligt brukande']){assert.match(finding(t),/andra stycket inte tillämpas/);assert.match(finding(t),/Första styckets/);}
assert.match(finding('Arbetsmiljöbrott'),/omfattas inte av 3:12/);assert.match(finding('Arbetsmiljöbrott'),/arbetsmiljörättslig skyldighet/);
assert.match(finding('Brott mot tystnadsplikt'),/inte paragrafens sista stycke/);
for(const t of ['Grovt olaga tvång'])assert.equal(by(t).legalAudit15.checkpoints.prosecution,undefined,'Unresolved branch must remain open');
const rerun=(change)=>{const data=copy(before),statutes=copy(W),interpretations=copy(interpret);change(data,statutes,interpretations);const c=vm.createContext({window:{BK_DATA:{crimes:data},BK_STATUTES:statutes,BK_PROSECUTION_INTERPRETATIONS15:interpretations}});vm.runInContext(code,c);return c.window.BK_BRB_PROSECUTION_AUDIT15;};
for(const key of ['RB:20:3','BrB:2:8','BrB:20:5'])assert.equal(rerun((a,w)=>{w[key].text+=' CHANGED';}).completed,0,'Changed complete common source blocks all dependent findings');
assert.equal(rerun((a,w)=>{w['BrB:4:11'].complete=false;}).completed,273);
assert.equal(rerun((a,w)=>{w['BrB:9:12'].text+=' CHANGED';}).completed,291);
assert.equal(rerun((a,w)=>{w['BrB:18:8'].text+=' CHANGED';}).completed,257);
assert.equal(rerun((a,w)=>{w['RB:20:3'].checked='2099-01-01';}).completed,0);
assert.equal(rerun((a,w)=>{w['RB:20:3'].url='https://example.invalid';}).completed,0);
assert.equal(rerun(a=>{a.find(c=>c.title==='Mord').law+=' CHANGED';}).completed,312);
assert.equal(rerun((a,w,i)=>{i.homeGross.finding+=' CHANGED';}).completed,311);
assert.equal(rerun((a,w,i)=>{delete i.grossBribery;}).completed,311);
assert.equal(rerun(a=>{a.find(c=>c.title==='Mord').prosecution='unknown';}).completed,312);
assert.ok(read('service-worker.js').includes(mod));assert.ok(html.includes('prosecution-conditions'));
vm.runInNewContext(code,{window:{}});
console.log('PASS: 313 individually identified current statutory prosecution findings; four classification repairs, eleven clarified cards, five preserved checks, one unresolved branch and no full legal/police-power approval');
