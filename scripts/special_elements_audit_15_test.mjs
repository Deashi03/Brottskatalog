import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),mod='./special-elements-audit-15.js',code=read(mod);
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const f of srcs)if(f!==mod)vm.runInContext(read(f),ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),before=copy(ctx.window.BK_DATA.crimes),W=copy(ctx.window.BK_STATUTES);
vm.runInContext(code,ctx);
const report=ctx.window.BK_SPECIAL_ELEMENTS_AUDIT15,all=ctx.window.BK_DATA.crimes;
assert.equal(report.planned,136);assert.equal(report.completed,136);assert.equal(report.held.length,0);
assert.deepEqual(copy(report.byFamily),{NSL:22,VapenL:10,TBL:8,KnivL:4,BidrBrL:8,SkBrL:18,SmuglL:46,PTBL:12,LBE:8});
const checked=all.filter(c=>c.legalAudit15?.sourceAudit==='special-elements-2026-10-20');assert.equal(checked.length,68);
for(const c of checked){
 const old=before.find(x=>x.id===c.id);assert.ok(!old.legalAudit15?.checkpoints?.objective&&!old.legalAudit15?.checkpoints?.subjective);
 assert.equal(c.rekvisit15.explanations15.length,2);assert.equal(c.legalAudit15.fullLegalReviewApproved,false);assert.notEqual(c.rekvisit15.legalReviewApproved,true);
 for(const key of ['objective','subjective']){const a=c.legalAudit15.checkpoints[key];assert.equal(a.status,'APPROVED');assert.ok(a.finding.length>=170);assert.ok(a.sourceURL.includes('riksdagen.se'));assert.ok(a.sourceRefs.length);assert.equal(a.caseSpecificLiabilityApproved,false);assert.equal(a.caseSpecificCustodyApproved,false);assert.equal(a.historicLawApproved,false);assert.equal(a.jurisprudenceApproved,false);}
 for(const key of ['time','exceptions','grade','jurisprudence','inchoate','prosecution','coercion'])assert.equal(c.legalAudit15.checkpoints[key],old.legalAudit15?.checkpoints?.[key]);
 const clone=copy(c);delete clone.legalAudit15;delete clone.rekvisit15.explanations15;const prior=copy(old);delete prior.legalAudit15;assert.deepEqual(clone,prior,'No hidden penalty, law, stage, prosecution or police power changes: '+c.title);
}
assert.equal(report.fullLegalApprovals,0);assert.equal(report.caseSpecificDecisions,0);
const note=(t,k)=>checked.find(c=>c.title===t).legalAudit15.checkpoints[k].finding;
assert.match(note('Rattfylleri','objective'),/inte det kliniska tredje stycket/);
assert.match(note('Vapenbrott av oaktsamhet','subjective'),/inte samma sak som uppsåtligt mindre allvarligt/);
assert.match(note('Narkotikabrott · transport\/förvaring','objective'),/gör inte ett samtidigt innehav/);
assert.match(note('Vårdslös skatteredovisning','objective'),/inte generellt det aktiva/);
assert.match(note('Ringa näringspenningtvätt','objective'),/inte ett obligatoriskt rekvisit/);
assert.match(note('Grovt brott mot tillståndsplikten för explosiva varor','subjective'),/kräver uttryckligen uppsåt/);
assert.match(note('Brott mot tillståndsplikten för explosiva varor','subjective'),/Vanlig oaktsamhet prövas enligt första styckets bötesregel/);
const rerun=(change)=>{const d=copy(before),w=copy(W);change(d,w);const c=vm.createContext({window:{BK_DATA:{crimes:d},BK_STATUTES:w}});vm.runInContext(code,c);return c.window.BK_SPECIAL_ELEMENTS_AUDIT15;};
assert.equal(rerun(d=>{d.find(c=>c.title==='Narkotikabrott · innehav').law+=' CHANGED';}).completed,114,'Changes in shared drug source invalidate dependent family');
assert.equal(rerun(d=>{d.find(c=>c.title==='Skattebrott').lawCompletenessVerified=false;}).completed,118,'Missing full base-tax source invalidates derivative grades');
assert.equal(rerun((d,w)=>{w['BrB:1:2'].text+=' CHANGED';}).completed,0,'A partial matching default-fault clause cannot validate reviews');
assert.equal(rerun(d=>{d.find(c=>c.title==='Vapenbrott').lawCompletenessChecked='2099-01-01';}).completed,126,'Future review date cannot validate weapon family');
assert.equal(rerun(d=>{d.find(c=>c.title==='Rattfylleri').lawCompletenessSourceURL='https://example.invalid';}).completed,128,'Wrong source identity blocks entire traffic family');
assert.ok(srcs.includes(mod)&&read('service-worker.js').includes(mod));
vm.runInNewContext(code,{window:{}});
console.log('PASS: 136 individually documented act/fault checks on 68 special-law cards, source-family mutations fail closed and complete legal signoff remains blocked');
