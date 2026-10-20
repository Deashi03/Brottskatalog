import assert from'node:assert/strict';import fs from'node:fs';import path from'node:path';import vm from'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),mod='./statutory-grade-review-15.js';
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),w=ctx.window,r=w.BK_STATUTORY_GRADE_REVIEW15,all=w.BK_DATA.crimes,base=all.filter(c=>!c.stageType),manifest=JSON.parse(read('data/statutory-grade-review-15.json'));
assert.equal(r.planned,174);assert.equal(r.completed,174);assert.equal(r.held.length,0);assert.equal(r.fullLegalApprovals,0);assert.equal(r.caseSpecificGradeApprovals,0);assert.equal(r.penaltyChanges,0);assert.equal(r.stageChanges,0);
assert.deepEqual(JSON.parse(JSON.stringify(r.byChapter)),{4:41,5:3,6:24,7:6,13:22,14:22,15:29,17:21,20:6});
assert.equal(Object.keys(manifest.sourcePins).length,101);assert.equal(manifest.families.length,94);assert.equal(manifest.records.length,174);
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_STATUTORY_GRADE_RECORDS15)),manifest.records);
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_STATUTORY_GRADE_FAMILIES15)),manifest.families);
assert.equal(base.filter(c=>c.legalAudit15?.checkpoints?.grade?.status==='APPROVED').length,179);assert.equal(all.length,1557);
for(const row of manifest.records){const c=base.find(c=>c.id===row.id),g=c.statutoryGradeReview15,a=c.legalAudit15.checkpoints.grade;
 assert.equal(c.title,row.title);assert.equal(g.scope,manifest.scope);assert.equal(a.scope,manifest.scope);assert.equal(a.status,'APPROVED');assert.equal(g.caseSpecificGradeApproved,false);assert.equal(g.fullLegalReviewApproved,false);assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 for(const k of ['caseSpecificGradeApproved','caseFactsEvaluated','historicLawApproved','jurisprudenceApproved','competitionApproved','caseSpecificLiabilityApproved','penaltyRangeApproved','caseSpecificCustodyApproved','automaticOperationalAdviceApproved'])assert.equal(a[k],false,k+' '+c.title);
 assert.ok(a.finding.includes(c.title));assert.deepEqual(Array.from(g.sourceRefs),row.sourceRefs);assert.ok(g.limits.some(x=>x.includes('Praxis')));assert.ok(g.branches.length>0);
}
const g=t=>base.find(c=>c.title===t).statutoryGradeReview15,txt=t=>JSON.stringify(g(t));
for(const [title,count]of[['Grovt tjänstefel',2],['Grovt missbruk av offentlig ställning',4],['Grovt angrepp mot tjänsteman',4],['Grovt övergrepp i rättssak',4],['Grov urkundsförfalskning',5],['Grov förgöring',2],['Grovt sexuellt ofredande mot barn',2],['Grov våldtäkt mot barn',3]])assert.equal(g(title).indicators.length,count,title);
assert.match(txt('Grovt tjänstefel'),/kräver.*uppsåtligen/);assert.match(txt('Grovt brott mot tystnadsplikt'),/ringa-undantag hör till oaktsamhetsalternativet/);
assert.match(txt('Rymning'),/Ringa är ansvarsfrihet/);assert.match(txt('Främjande av rymning eller flykt'),/noggrann planering/);
assert.match(txt('Ovarsam utsaga'),/Grov oaktsamhet är skuldformen/);assert.match(txt('Grov fridskränkning'),/Ordet grov i namnet/);
assert.match(txt('Sexuellt utnyttjande av barn'),/mindre grova fallet/);assert.match(txt('Våldtäkt mot barn'),/skiljer sig i ordalydelse från vuxenbrottets/);
assert.equal(g('Förfalskning av fast märke').branches.length,2);assert.equal(g('Förfalskning av fast märke').indicators.length,0);assert.match(txt('Förfalskning av fast märke'),/ingen särskild grov grad/);
assert.match(txt('Tagande av otillbörlig förmån vid röstning'),/får inte överföras/);assert.match(txt('Osann utsaga inför nordisk domstol'),/ingen grov menedsgrad/);assert.match(txt('Ovarsam utsaga inför en internationell domstol'),/Internationella brottmålsdomstolen/);
assert.equal(g('Brukande av det förfalskade').sourceRefs.length,10);assert.match(txt('Brukande av det förfalskade'),/Ingen enda automatisk brottsgrad/);
assert.match(txt('Föregivande av allmän ställning'),/grov grad i andra stycket/);assert.match(txt('Olaga integritetsintrång'),/faktisk sådan skada krävs inte/);
// Every existing field, requisites group, grade scale and other audit dimension
// is retained exactly; a grade-source review must never rewrite another area.
const before=load([mod]),old=JSON.parse(JSON.stringify(before.window.BK_DATA.crimes));vm.runInContext(read(mod),before);
for(const c of before.window.BK_DATA.crimes){const copy=JSON.parse(JSON.stringify(c));delete copy.statutoryGradeReview15;const prev=old.find(p=>p.id===c.id);if(!prev.legalAudit15?.checkpoints?.grade&&copy.legalAudit15?.checkpoints?.grade)delete copy.legalAudit15.checkpoints.grade;assert.deepEqual(copy,prev,'Preserve '+c.title);}
function changed(mutate){const x=load([mod]);mutate(x.window);vm.runInContext(read(mod),x);return x.window.BK_STATUTORY_GRADE_REVIEW15;}
assert.equal(changed(w=>{w.BK_STATUTES['BrB:14:3'].text+=' CHANGED';}).completed,170,'Three forgery grades and derivative must stay open');
assert.equal(changed(w=>{w.BK_STATUTES['BrB:15:1'].text+=' CHANGED';}).completed,168,'Both mened cards and four foreign-testimony cards need unmodified source');
assert.equal(changed(w=>{w.BK_STATUTES['BrB:20:1'].checked='2099-01-01';}).completed,172,'Future source date cannot approve public-office grades');
assert.equal(changed(w=>{w.BK_DATA.crimes.find(c=>c.title==='Grov förgöring').law+=' CHANGED';}).completed,173);
assert.equal(changed(w=>{w.BK_STATUTES['BrB:17:12'].complete=false;}).completed,172);
assert.equal(changed(w=>{w.BK_STATUTES['BrB:6:5'].url='https://example.invalid';}).completed,171,'All three child-rape family grades require current canonical source');
assert.equal(changed(w=>{w.BK_DATA.crimes.find(c=>c.title==='Ofredande').legalAudit15.checkpoints.grade={status:'PENDING',finding:'Separate reviewer hold'};}).completed,173,'Never replace an existing grade hold');
assert.ok(read('service-worker.js').includes(mod));assert.ok(html.includes('statutory-grade-review'));assert.ok(html.includes('+gradeReviewBody'));for(const s of inline)new Function(s);
console.log('PASS: 174 individual statutory grade reviews from 101 whole paragraphs; derivative branches, intent conditions, liability boundaries and unchanged other review dimensions');
