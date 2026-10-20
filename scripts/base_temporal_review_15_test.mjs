import assert from'node:assert/strict';import fs from'node:fs';import path from'node:path';import vm from'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html'),mod='./base-temporal-review-15.js';
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const plain=x=>JSON.parse(JSON.stringify(x)),ctx=load(),w=ctx.window,data=JSON.parse(read('data/base-temporal-review-15.json')),base=w.BK_DATA.crimes.filter(c=>!c.stageType),r=w.BK_TEMPORAL_REVIEW15;
assert.equal(r.planned,345);assert.equal(r.completed,345);assert.equal(r.held.length,0);assert.equal(r.unresolved.length,45);assert.equal(r.brb,282);assert.equal(r.special,63);assert.equal(r.fullHistoricalCaseApprovals,0);assert.equal(r.fullLegalApprovals,0);assert.equal(Object.keys(data.sourcePins).length,83);assert.equal(Object.keys(data.offencePins).length,180);
assert.deepEqual(plain(w.BK_TEMPORAL_RECORDS15),data.records);assert.deepEqual(plain(w.BK_TEMPORAL_SOURCES15),data.sourcePins);assert.deepEqual(plain(r.unresolved),data.unresolved);
for(const row of data.records){const c=base.find(c=>c.id===row.id),t=c.temporalReview15,a=c.legalAudit15.checkpoints.time;assert.equal(t.wordingFrom,row.wordingFrom);assert.deepEqual(Array.from(t.amendments),row.amendments);assert.deepEqual(Array.from(t.sourceRefs),row.sourceRefs);assert.equal(a.scope,data.scope);assert.equal(t.scope,data.scope);assert.equal(a.currentCommencementReviewed,true);
 for(const k of['caseFactsEvaluated','offenceDateResolved','historicalOffenceDateResolved','historicLawApproved','allReferencedRulesTemporallyApproved','automaticLawSelectionApproved','substantiveCaseLawReviewed','caseSpecificCustodyApproved','automaticOperationalAdviceApproved','fullLegalReviewApproved'])assert.equal(a[k],false,c.title+' '+k);
 const earliest=row.amendments.map(k=>data.sourcePins[k].commencement).sort().at(-1);assert.equal(row.wordingFrom,earliest);assert.ok(earliest<='2026-10-20');assert.ok(t.assessmentNote.includes('senare lindrigare lag'));assert.ok(t.assessmentNote.includes('7 § BrP'));assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
 const before=new Date(Date.parse(earliest)-86400000).toISOString().slice(0,10);
 assert.equal(w.BK_TEMPORAL_SCREEN15(c,before).status,'older-wording-required');assert.equal(w.BK_TEMPORAL_SCREEN15(c,earliest).status,'within-reviewed-wording-period');assert.equal(w.BK_TEMPORAL_SCREEN15(c,'2026-10-20').status,'within-reviewed-wording-period');assert.equal(w.BK_TEMPORAL_SCREEN15(c,'2026-10-21').status,'after-source-check');
 for(const date of[before,earliest,'2026-10-21','2027-01-01','2026-02-30','bad']){const q=w.BK_TEMPORAL_SCREEN15(c,date);assert.equal(q.caseSpecificLiabilityApproved,false);assert.equal(q.automaticOperationalAdviceApproved,false);assert.equal(q.automaticLawSelectionApproved,false);}
}
for(const p of data.unresolved){const c=base.find(c=>c.id===p.id);assert.ok(c);assert.equal(c.temporalReview15,undefined);assert.equal(c.legalAudit15.checkpoints.time,undefined);assert.equal(w.BK_TEMPORAL_SCREEN15(c,'2026-10-20').status,'unreviewed');}
const c=t=>base.find(c=>c.title===t),t=title=>c(title).temporalReview15;
assert.equal(t('Mord').wordingFrom,'2020-01-01');assert.equal(t('Grov misshandel').wordingFrom,'2026-08-01');assert.equal(t('Ofredande').wordingFrom,'2018-01-01');assert.equal(t('Psykiskt våld').wordingFrom,'2026-07-01');assert.equal(t('Rymning').wordingFrom,'2026-07-02');assert.equal(t('Missbruk av offentlig ställning').wordingFrom,'2026-08-01');
assert.equal(t('Vapenbrott').wordingFrom,'2026-08-01');assert.match(t('Vapenbrott').note,/november 2026/);assert.equal(t('Vårdslös skatteuppgift').wordingFrom,'2026-04-01');assert.equal(t('Grovt skattebrott').wordingFrom,'2026-08-01');assert.match(t('Tullbrott').transitions[0].text,/deklarationer/);assert.match(t('Arbetsmiljöbrott').note,/ingen enhetlig straffskala/);assert.match(t('Lydnadsbrott').note,/Krigs/);
assert.equal(t('Egenmäktighet med barn').future.effectiveFrom,'2027-01-01');assert.equal(w.BK_TEMPORAL_SCREEN15(c('Egenmäktighet med barn'),'2027-01-01').status,'future-wording-required');assert.equal(w.BK_TEMPORAL_SCREEN15(c('Mord'),'2026-02-30').status,'date-required');assert.equal(w.BK_TEMPORAL_SCREEN15(w.BK_DATA.crimes.find(c=>c.stageType),'2026-10-20').status,'unreviewed');
// All prior fields, penalties and source-specific stage controls are preserved.
const before=load([mod]),old=plain(before.window.BK_DATA.crimes);vm.runInContext(read(mod),before);
for(const[i,c]of before.window.BK_DATA.crimes.entries()){const copy=plain(c),prev=old[i];delete copy.temporalReview15;if(!prev.legalAudit15?.checkpoints?.time&&copy.legalAudit15?.checkpoints?.time)delete copy.legalAudit15.checkpoints.time;assert.deepEqual(copy,prev,'Preserve '+c.title);}
function change(fn){const x=load([mod]);fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_TEMPORAL_REVIEW15;}
assert.equal(change(w=>{w.BK_TEMPORAL_SOURCES15['2026:1318'].commencement='2099-01-01';}).completed,295);
assert.equal(change(w=>{w.BK_TEMPORAL_SOURCES15['BrP:5'].text+=' changed';}).completed,0);
assert.equal(change(w=>{w.BK_TEMPORAL_SOURCES15['2026:1604'].commencement='2099-01-01';}).completed,343);
assert.equal(change(w=>{w.BK_TEMPORAL_SOURCES15['2026:1250'].transitionText+=' changed';}).completed,340);
assert.equal(change(w=>{w.BK_STATUTES['BrB:3:7'].text+=' changed';}).completed,343);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Mord').law+=' changed';}).completed,344);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Mord').lawCompletenessChecked='2099-01-01';}).completed,344);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Mord').legalAudit15.checkpoints.time={status:'PENDING'};}).completed,344);
for(const p of[mod,'./temporal-sources-15.js'])assert.ok(read('service-worker.js').includes(p));for(const s of inline)new Function(s);
console.log('PASS: 345 individually dated current paragraph reviews, 83 primary temporal source pins, 45 honestly unresolved cards, date-boundary and no automatic-law-selection safeguards');
