import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),mod='./brb-remaining-elements-15.js',code=read(mod),srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const f of srcs)if(f!==mod)vm.runInContext(read(f),ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),before=copy(ctx.window.BK_DATA.crimes),W=copy(ctx.window.BK_STATUTES);
vm.runInContext(code,ctx);
const a=ctx.window.BK_REMAINING_ELEMENTS_AUDIT15;assert.equal(a.completed,50);assert.equal(a.planned,50);assert.equal(a.held.length,0);assert.equal(a.fullApprovals,0);
const all=ctx.window.BK_DATA.crimes,checked=all.filter(c=>c.legalAudit15?.sourceAudit==='remaining-BrB-elements-2026-10-20');
assert.equal(checked.length,25);
for(const c of checked){
 const prior=before.find(x=>x.id===c.id);assert.ok(!prior.legalAudit15?.checkpoints?.objective&&!prior.legalAudit15?.checkpoints?.subjective);
 assert.equal(c.rekvisit15.explanations15.length,2);assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 for(const k of ['objective','subjective']){const q=c.legalAudit15.checkpoints[k];assert.equal(q.status,'APPROVED');assert.ok(q.finding.length>140);assert.ok(q.sourceRefs.length);assert.equal(q.caseSpecificLiabilityApproved,false);assert.equal(q.historicLawApproved,false);assert.equal(q.jurisprudenceApproved,false);}
 for(const k of ['time','exceptions','grade','jurisprudence','inchoate','prosecution','coercion'])assert.equal(c.legalAudit15.checkpoints[k],prior.legalAudit15?.checkpoints?.[k]);
 const clone=copy(c);delete clone.legalAudit15;delete clone.rekvisit15.explanations15;const old=copy(prior);delete old.legalAudit15;assert.deepEqual(clone,old,'No hidden penalty, stage, powers or law changes: '+c.title);
}
const by=t=>checked.find(c=>c.title===t),note=(t,k)=>by(t).legalAudit15.checkpoints[k].finding;
assert.match(note('Ringa tillgrepp av fortskaffningsmedel','objective'),/tagande OCH brukande/);
assert.match(note('Svindleri','subjective'),/grov oaktsamhet/);
assert.match(note('Kontakt för att träffa ett barn i sexuellt syfte','objective'),/Varken att mötet faktiskt äger rum/);
assert.match(note('Olovlig befattning med betalningsverktyg','subjective'),/inte okritiskt skrivas över/);
assert.match(note('Vårdslöshet med hemlig uppgift','objective'),/Anskaffande ensamt omfattas inte/);
assert.ok(html.includes('c.rekvisit15?.explanations15'),'Teach the reviewed distinctions inside the actual requisite panel');
assert.ok(read('service-worker.js').includes(mod));
const mutate=(key,patch)=>{const w=copy(W);Object.assign(w[key],patch);const x=vm.createContext({window:{BK_DATA:{crimes:copy(before)},BK_STATUTES:w}});vm.runInContext(code,x);return x.window.BK_REMAINING_ELEMENTS_AUDIT15;};
assert.equal(mutate('BrB:6:13',{text:'CHANGED'}).completed,44,'Changes to referred age rule revoke all dependent approvals');
assert.equal(mutate('BrB:9:6',{complete:false}).completed,44,'Incomplete handling source revokes both grades and the derivative minor offence');
assert.equal(mutate('BrB:6:12',{checked:'2099-01-01'}).completed,46,'Future date must not certify current law');
vm.runInNewContext(code,{window:{}});
console.log('PASS: 50 individual act/fault reviews on 25 remaining BrB cards; exact source dependency guards, visible explanations and no wider legal signoff');
