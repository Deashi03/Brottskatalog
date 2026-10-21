import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),mod='./special-prosecution-audit-15.js',support='./special-prosecution-sources-15.js',code=read(mod);
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of sources)if(![mod,support].includes(s))vm.runInContext(read(s),ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),beforeSources=JSON.stringify(ctx.window.BK_DATA),oldW=copy(ctx.window.BK_STATUTES);
vm.runInContext(read(support),ctx);
const sourceReport=ctx.window.BK_SPECIAL_PROSECUTION_SOURCES15;
assert.equal(sourceReport.reviewed.length,6);assert.equal(sourceReport.caseSpecificChargingApproved,false);
assert.equal(JSON.stringify(ctx.window.BK_DATA),beforeSources);
for(const [key,p] of Object.entries(ctx.window.BK_STATUTES)){
 if(!sourceReport.reviewed.includes(key))assert.deepEqual(copy(p),oldW[key]);
 else {assert.equal(p.complete,true);assert.equal(p.machine,false);assert.equal(p.checked,'2026-10-20');assert.equal(p.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');assert.ok(p.url.startsWith('https://www.riksdagen.se/'));}
}
const before=copy(ctx.window.BK_DATA.crimes),W=copy(ctx.window.BK_STATUTES),docs=copy(ctx.window.BK_SPECIAL_EXCERPTS);
vm.runInContext(code,ctx);const all=ctx.window.BK_DATA.crimes,r=ctx.window.BK_SPECIAL_PROSECUTION_AUDIT15;
assert.equal(r.planned,68);assert.equal(r.completed,68);assert.equal(r.held.length,0);
assert.deepEqual(copy(r.byFamily),{NSL:11,VapenL:5,TBL:4,KnivL:2,SmuglL:23,PTBL:6,SkBrL:9,BidrBrL:4,LBE:4});
assert.equal(r.correctedModes.length,5);assert.equal(r.fullLegalApprovals,0);assert.equal(r.caseSpecificChargingApprovals,0);assert.equal(r.coercionApprovals,0);
const specials=all.filter(c=>!c.stageType&&!c.statute?.startsWith('BrB:'));
assert.equal(specials.filter(c=>c.legalAudit15?.checkpoints?.prosecution?.status==='APPROVED').length,68);
assert.equal(all.filter(c=>!c.stageType&&c.legalAudit15?.checkpoints?.prosecution?.status==='APPROVED').length,389);
const changes=new Set(r.correctedModes),fields=['prosecution','prosecutionLabel','prosecutionRule','prosecutionDetails','prosecutionSource','prosecutionSourceURL','prosecutionChecked','prosecutionReviewStatus'];
for(const c of all){const old=before.find(x=>x.id===c.id),a=copy(c),b=copy(old);
 if(specials.includes(c)){const p=c.legalAudit15.checkpoints.prosecution;assert.equal(old.legalAudit15.checkpoints.prosecution,undefined);assert.equal(p.checked,'2026-10-20');assert.equal(p.caseSpecificChargingApproved,false);assert.equal(p.caseSpecificCustodyApproved,false);assert.equal(p.jurisprudenceApproved,false);assert.ok(p.finding.startsWith(c.title+' ('));
  const afterAudit=copy(c.legalAudit15);delete afterAudit.checkpoints.prosecution;assert.deepEqual(afterAudit,old.legalAudit15);
  delete a.legalAudit15;delete b.legalAudit15;delete a.prosecutionStatutoryReview15;
  if(changes.has(c.title))for(const k of fields){delete a[k];delete b[k];}
 }
 assert.deepEqual(a,b,'No hidden changes to BrB records, stages, penalties, requisites or powers: '+c.title);
}
const by=t=>specials.find(c=>c.title===t),note=t=>by(t).prosecutionStatutoryReview15.finding;
for(const t of r.correctedModes){assert.equal(by(t).prosecution,'conditional');assert.match(note(t),/18:14/);assert.match(note(t),/ingen automatisk vapenamnesti/);assert.match(note(t),/andra gärningsformer/);}
assert.match(note('Skattebrott'),/OCH/);assert.match(note('Skattebrott'),/det år då brottet begicks/);
assert.match(note('Skatteförseelse'),/inte först när ett visst belopp/);assert.match(note('Grovt skattebrott'),/räknas inte upp/);
assert.match(note('Bidragsbrott'),/samma person/);assert.match(note('Bidragsbrott'),/ett annat undantag/);
assert.match(note('Tullbrott'),/5 kap. 5–10/);assert.match(note('Grovt tullbrott'),/inte upp/);
assert.match(note('Narkotikabrott · innehav'),/allmänt åtal/);
const rerun=(change)=>{const a=copy(before),w=copy(W),d=copy(docs);change(a,w,d);const c=vm.createContext({window:{BK_DATA:{crimes:a},BK_STATUTES:w,BK_SPECIAL_EXCERPTS:d}});vm.runInContext(code,c);return c.window.BK_SPECIAL_PROSECUTION_AUDIT15;};
for(const k of ['RB:20:3','BrB:2:8'])assert.equal(rerun((a,w)=>{w[k].text+=' CHANGED';}).completed,0);
assert.equal(rerun((a,w)=>{w['Vapen:18:14'].text+=' CHANGED';}).completed,63);
assert.equal(rerun((a,w)=>{w['SkBrL:13b'].complete=false;}).completed,59);
assert.equal(rerun((a,w)=>{w['BidrBrL:6a'].text+=' CHANGED';}).completed,64);
assert.equal(rerun((a,w)=>{w['SmuglL:20'].url='https://example.invalid';}).completed,45);
assert.equal(rerun((a,w)=>{w['RB:20:3'].checked='2099-01-01';}).completed,0);
assert.equal(rerun((a,w,d)=>{d.LBE.observedVersion='2099:1';}).completed,64);
assert.equal(rerun(a=>{a.find(c=>c.title==='Vapenbrott').law+=' CHANGED';}).completed,67);
assert.equal(rerun(a=>{a.find(c=>c.title==='Vapenbrott').lawCompletenessChecked='2099-01-01';}).completed,67);
assert.ok(sources.indexOf(support)<sources.indexOf(mod));assert.ok(sources.indexOf(mod)<sources.indexOf('./catalog-selection-15.js'));
assert.ok(read('service-worker.js').includes(mod)&&read('service-worker.js').includes(support));
assert.ok(html.includes("review.sourceLabel||'Brottsbalkens åtalsregler'"),'Special-law source links must have accurate labels');
vm.runInNewContext(code,{window:{}});vm.runInNewContext(read(support),{window:{}});
console.log('PASS: 68 current statutory prosecution-filter reviews across nine special-law families, five weapon corrections, six complete supporting provisions and strict source mutation holds');
