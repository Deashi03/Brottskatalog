import assert from'node:assert/strict';import fs from'node:fs';import vm from'node:vm';import path from'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const mod='./missing-stage-cards-15.js',outline='./stage-requisite-outlines-15.js',baseAudit='./missing-stage-base-audit-15.js';
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),w=ctx.window,rows=w.BK_DATA.crimes,base=rows.filter(c=>!c.stageType),st=rows.filter(c=>c.stageType),newStage=st.filter(c=>c.id.startsWith('stage-gap15-'));
assert.equal(rows.length,1557);assert.equal(base.length,390);assert.equal(st.length,1167);assert.equal(newStage.length,72);
assert.equal(w.BK_MISSING_STAGE_CARDS15.added,72);assert.equal(w.BK_MISSING_STAGE_CARDS15.positive,19);assert.equal(w.BK_MISSING_STAGE_CARDS15.negative,53);assert.equal(w.BK_MISSING_STAGE_CARDS15.held.length,0);
assert.equal(w.BK_STAGE_GENERAL_SOURCES15.completed,3);assert.equal(w.BK_STAGE_REQUISITE_OUTLINES15.completed,452);assert.equal(w.BK_MISSING_STAGE_BASE_AUDIT15.completed,24);
for(const c of base){const ss=st.filter(s=>s.stageParentId===c.id);if(c.isStandaloneInchoate){assert.equal(ss.length,0,'No recursively generated stages of standalone 4:9b');continue;}assert.equal(ss.length,3,c.title);assert.deepEqual(Array.from(ss,s=>s.stageType).sort(),['forberedelse','forsok','stampling']);}
for(const c of newStage){if(c.stagePreparationPenaltyReview15){assert.ok(c.title.includes('olaga frihetsberövande'));assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),{min:0,max:2,fines:true,life:false,maxExclusive:true});assert.equal(c.penaltyRangeVerified,true);}else{assert.equal(c.penaltyRange,null);assert.equal(c.penaltyRangeVerified,false);}assert.equal(c.custody,'unknown');assert.equal(c.prosecution,'unknown');assert.equal(c.individualLegalAudit15.scope.caseSpecificLiabilityApproved,false);assert.equal(c.individualLegalAudit15.consequences.punishmentRangeApproved,false);assert.equal(c.individualLegalAudit15.consequences.automaticCoercionApproved,false);
 if(c.stageStatus==='punishable'){assert.ok(c.rekvisit15.groups.length>=4);assert.equal(c.rekvisit15.legalReviewApproved,false);assert.equal(c.rekvisit15.verifiedOn,'2026-10-20');}
 const p=base.find(p=>p.id===c.stageParentId);assert.equal(p.legalAudit15.checkpoints.inchoate.status,'APPROVED');assert.equal(p.legalAudit15.fullLegalReviewApproved,false);
}
const by=t=>newStage.find(c=>c.title===t);
assert.equal(by('Försök till vapenbrott').stageStatus,'not-criminalized');assert.equal(by('Försök till grovt vapenbrott').stageStatus,'punishable');assert.equal(by('Försök till myteri').stageStatus,'not-criminalized');assert.equal(by('Stämpling till myteri').stageStatus,'punishable');
const nordic=by('Förberedelse till osann utsaga inför nordisk domstol');assert.equal(nordic.stageCriminalizationConditional15,true);assert.match(nordic.stageExplanation,/Partsutsaga/);assert.match(nordic.stageExplanation,/mindre allvarlig/);assert.equal(by('Förberedelse till ovarsam utsaga inför nordisk domstol').stageStatus,'not-criminalized');
assert.equal(w.BK_AGE14_CANDIDATE_SOURCE_AUDIT15.sourceReviewed,96);for(const c of newStage.filter(c=>c.stageParentMin>=4))assert.equal(c.age14Exception15.individualSourceScopeChecked,'2026-10-20');
const manifest=JSON.parse(read('data/stage-requisite-manifest-15.json')).records;
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_STAGE_REQUISITE_MANIFEST15)),manifest,'Review manifest and runtime identities must agree');
const positive=st.filter(c=>c.stageStatus==='punishable');assert.equal(positive.length,452);
for(const c of positive){assert.ok(c.rekvisit15.groups.length>=4,c.title);assert.equal(c.rekvisit15.legalReviewApproved,false);assert.match(c.rekvisit15.source,/23:1–3/);}
const summary=t=>st.find(c=>c.title===t).rekvisit15.groups.map(g=>g.label).join(' ');
for(const title of ['Försök till utpressning','Försök till ringa utpressning','Försök till grov utpressning'])assert.match(summary(title),/gäller inte BrB 23:3/);
assert.match(summary('Försök till urkundsförfalskning'),/om det fullbordats.*ringa/);
assert.match(summary('Försök till olovlig befattning med falska pengar'),/endast anskaffande eller mottagande/);
assert.match(summary('Försök till oredlighet mot borgenärer'),/tillgång bortförs ur landet/);
assert.match(summary('Försök till dataintrång'),/inte skulle ha varit ringa/);
assert.match(summary('Försök till barnpornografibrott'),/första stycket/);
// Source edits and broken parent provenance cannot create apparently certified cards.
for(const [key,left]of[['BrB:19:14',63],['BrB:15:15',60]]){const iso=load([mod,outline,baseAudit]);iso.window.BK_STATUTES[key].text+=' CHANGED';vm.runInContext(read(mod),iso);assert.equal(iso.window.BK_MISSING_STAGE_CARDS15.added,left,key);}
const sourceCtx=load([mod,outline,baseAudit]);sourceCtx.window.BK_DATA.crimes.find(c=>c.title==='Vapenbrott').law+=' CHANGED';vm.runInContext(read(mod),sourceCtx);assert.equal(sourceCtx.window.BK_MISSING_STAGE_CARDS15.added,69);
const outlineCtx=load([outline]);outlineCtx.window.BK_STATUTES['BrB:23:2'].text+=' CHANGED';vm.runInContext(read(outline),outlineCtx);assert.equal(outlineCtx.window.BK_STAGE_REQUISITE_OUTLINES15.completed,0);
const auditCtx=load([baseAudit]);auditCtx.window.BK_DATA.crimes.find(c=>c.id===nordic.id).stageStatus='not-criminalized';vm.runInContext(read(baseAudit),auditCtx);assert.equal(auditCtx.window.BK_MISSING_STAGE_BASE_AUDIT15.completed,23);
const authCtx=load([baseAudit]);authCtx.window.BK_STATUTES['BrB:19:14'].text+=' CHANGED';vm.runInContext(read(baseAudit),authCtx);assert.equal(authCtx.window.BK_MISSING_STAGE_BASE_AUDIT15.completed,21);
for(const f of[mod,outline,baseAudit,'./stage-general-sources-15.js'])assert.ok(read('service-worker.js').includes(f));
for(const script of inline)new Function(script);
assert.ok(html.includes('stage-overview-link'));assert.ok(html.includes('provisions[c.stageAuthorizingStatute15]'));
console.log('PASS: all 389 eligible base offences have three stage entries; 72 new bounded records, 452 study outlines, 24 parent checks and source mutation safeguards');
