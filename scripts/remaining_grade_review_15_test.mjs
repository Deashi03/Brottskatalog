import assert from'node:assert/strict';import fs from'node:fs';import path from'node:path';import vm from'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html'),mod='./remaining-grade-review-15.js';
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),w=ctx.window,r=w.BK_REMAINING_GRADE_REVIEW15,base=w.BK_DATA.crimes.filter(c=>!c.stageType),data=JSON.parse(read('data/remaining-grade-review-15.json'));
assert.equal(r.planned,211);assert.equal(r.completed,211);assert.equal(r.held.length,0);assert.equal(r.fullLegalApprovals,0);assert.equal(r.caseSpecificGradeApprovals,0);assert.equal(r.penaltyChanges,0);assert.equal(r.stageChanges,0);
assert.deepEqual(JSON.parse(JSON.stringify(r.byFamily)),{BrB:143,Nark:11,Vapen:5,TBL:4,Kniv:2,SmuglL:23,PTBL:6,SkBrL:9,BidrBrL:4,LBE:4});
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_REMAINING_GRADE_RECORDS15)),data.records);assert.deepEqual(JSON.parse(JSON.stringify(w.BK_REMAINING_GRADE_FAMILIES15)),data.families);assert.equal(Object.keys(data.sourcePins).length,151);assert.equal(data.families.length,110);
assert.equal(base.filter(c=>c.legalAudit15?.checkpoints?.grade?.status==='APPROVED').length,390);
for(const row of data.records){const c=base.find(c=>c.id===row.id),g=c.statutoryGradeReview15,a=c.legalAudit15.checkpoints.grade;assert.equal(g.scope,data.scope);assert.equal(g.sourceURL,row.sourceURL);assert.equal(c.legalAudit15.fullLegalReviewApproved,false);assert.equal(g.caseSpecificGradeApproved,false);assert.equal(a.caseSpecificGradeApproved,false);assert.equal(a.penaltyRangeApproved,false);assert.equal(a.historicLawApproved,false);assert.equal(a.jurisprudenceApproved,false);assert.equal(a.caseSpecificCustodyApproved,false);assert.ok(a.finding.includes(c.title));assert.deepEqual(Array.from(g.sourceRefs),row.sourceRefs);}
const g=t=>base.find(c=>c.title===t).statutoryGradeReview15,txt=t=>JSON.stringify(g(t));
for(const[title,phrase]of[['Mord','Livstid är inte en egen grov brottsgrad'],['Arbetsmiljöbrott','en gemensam automatisk brottsgrad'],['Inbrottsstöld','inte för en ringa inbrottsstöld'],['Hets mot folkgrupp','OCH spridning'],['Myteri','anstiftare/anförare'],['Grovt försvårande av konkurs eller exekutiv förrättning','Grov grad kräver uttryckligen ett uppsåtligt brott'],['Vapenbrott av oaktsamhet','inte oaktsamhetsalternativet'],['Ringa narkotikabrott · innehav','avser 1 § första stycket'],['Näringspenningtvätt','ska inte utan stöd kopieras'],['Vårdslöst bidragsbrott','inte grovt bidragsbrott'],['Landsskadlig vårdslöshet','övertar inte de uppsåtliga brottens straffskalor'],['Tjänstebrott','ingen särskild ringa eller grov brottsgrad']])assert.ok(txt(title).toLocaleLowerCase('sv').includes(phrase.toLocaleLowerCase('sv')),title);
assert.equal(g('Grovt rattfylleri').indicators.length,3);assert.match(txt('Grovt rattfylleri'),/1,0 promille/);assert.match(txt('Grovt brott mot knivlagen'),/Ringa fall utgör inte brott/);
assert.match(txt('Grovt fordringsbedrägeri'),/Betydande värde är ett grundrekvisit/);assert.match(txt('Fyndförseelse'),/inte en grov fyndförseelsegrad/);
assert.equal(g('Egenmäktighet vid förhandling med främmande makt').branches.length,4);assert.equal(g('Svikande av försvarsplikt').kind,'context-dependent');
const before=load([mod]),old=JSON.parse(JSON.stringify(before.window.BK_DATA.crimes));vm.runInContext(read(mod),before);
for(const c of before.window.BK_DATA.crimes){const copy=JSON.parse(JSON.stringify(c)),prev=old.find(p=>p.id===c.id);if(!prev.statutoryGradeReview15)delete copy.statutoryGradeReview15;if(!prev.legalAudit15?.checkpoints?.grade&&copy.legalAudit15?.checkpoints?.grade)delete copy.legalAudit15.checkpoints.grade;assert.deepEqual(copy,prev,'Preserve '+c.title);}
function change(mutate){const x=load([mod]);mutate(x.window);vm.runInContext(read(mod),x);return x.window.BK_REMAINING_GRADE_REVIEW15;}
assert.equal(change(w=>{w.BK_STATUTES['BrB:3:7'].text+=' CHANGED';}).completed,208);
assert.equal(change(w=>{w.BK_SPECIAL_EXCERPTS.PTBL.sections['5'].text+=' CHANGED';}).completed,208);
assert.equal(change(w=>{w.BK_SPECIAL_EXCERPTS.SmuglL.observedVersion='2099:1';}).completed,188);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.id==='narkotikabrott-innehav').law+=' CHANGED';}).completed,200);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.id==='vapenbrott').legalSourceVersion15='2099:1';}).completed,206);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Djurplågeri').law+=' CHANGED';}).completed,210);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Stöld').legalAudit15.checkpoints.grade={status:'PENDING'};}).completed,210);
assert.ok(read('service-worker.js').includes(mod));for(const s of inline)new Function(s);
console.log('PASS: all 211 remaining statutory grade questions, 151 source pins, nine special laws and source/scale preservation controls');
