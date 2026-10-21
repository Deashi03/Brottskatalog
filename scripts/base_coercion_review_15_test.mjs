import assert from'node:assert/strict';import fs from'node:fs';import path from'node:path';import vm from'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html'),mod='./base-coercion-review-15.js';
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const plain=x=>JSON.parse(JSON.stringify(x)),ctx=load(),w=ctx.window,data=JSON.parse(read('data/base-coercion-review-15.json')),base=w.BK_DATA.crimes.filter(c=>!c.stageType),r=w.BK_BASE_COERCION_REVIEW15;
assert.equal(r.planned,390);assert.equal(r.completed,390);assert.equal(r.held.length,0);assert.equal(r.conditionalScreens,30);assert.equal(r.automaticPowerApprovals,0);assert.equal(r.fullLegalApprovals,0);assert.equal(r.penaltyChanges,0);assert.equal(r.stageChanges,0);
assert.equal(Object.keys(data.procedurePins).length,55);assert.equal(Object.keys(data.offencePins).length,213);assert.equal(data.rules.length,10);assert.deepEqual(plain(w.BK_BASE_COERCION_RECORDS15),data.records);assert.deepEqual(plain(w.BK_COERCION_THRESHOLD_RULES15),data.rules);
assert.deepEqual(plain(w.BK_PROCEDURAL_SOURCES15),JSON.parse(read('data/procedural-source-review-15.json')).records);
const expected=(yes,pending)=>pending?'requires-case-selection':yes?'threshold-met':'ordinary-threshold-not-met';
for(const c of base){const g=c.coercionThresholdReview15,a=c.legalAudit15.checkpoints.coercion,p=c.penaltyRange,pending=Boolean(c.conditionalPenalty||c.applicabilityConditional||!c.penaltyRangeVerified);
 assert.equal(g.scope,data.scope);assert.equal(a.scope,data.scope);assert.equal(a.currentStatutoryThresholdsReviewed,true);
 for(const key of['caseSpecificScaleSelectionApproved','caseSpecificCustodyApproved','automaticOperationalAdviceApproved','allCoerciveMeasuresApproved','youthApplicabilityApproved','historicLawApproved','jurisprudenceApproved','fullLegalReviewApproved'])assert.equal(a[key],false,c.title+' '+key);
 assert.equal(g.screens.f,expected(Boolean(p&&p.max>0),pending));assert.equal(g.screens.one,expected(Boolean(p&&p.max>=1),pending));assert.equal(g.screens.four,expected(Boolean(p&&p.min>=4),pending));
 assert.equal(g.screens.presumption,expected(Boolean(p&&(p.min>=1.5||['Grov fridskränkning','Grov kvinnofridskränkning','Hedersförtryck'].includes(c.title))),pending));
 assert.equal(g.screens.specialCustody,'individual-exception');assert.equal(g.screens.investigativeCustody,'individual-exception');assert.equal(g.screens.noGeneral,'no-general-penalty-threshold');assert.equal(g.screens.secret,'separate-secret-measure-review');assert.ok(g.assessmentNote.includes('proportionalitet'));assert.ok(g.finding.includes(c.title));assert.equal(c.legalAudit15.fullLegalReviewApproved,false);
}
const g=t=>base.find(c=>c.title===t).coercionThresholdReview15;
assert.equal(g('Förtal').screens.f,'ordinary-threshold-not-met');assert.equal(g('Förtal').screens.specialCustody,'individual-exception');assert.equal(g('Ringa stöld').screens.one,'ordinary-threshold-not-met');assert.equal(g('Ofredande').screens.one,'threshold-met');assert.equal(g('Stöld').screens.presumption,'ordinary-threshold-not-met');assert.equal(g('Grov misshandel').screens.presumption,'threshold-met');assert.equal(g('Grov fridskränkning').screens.presumption,'threshold-met');assert.equal(g('Hedersförtryck').screens.presumption,'threshold-met');assert.equal(g('Grovt vapenbrott').screens.four,'threshold-met');
for(const t of['Arbetsmiljöbrott','Brukande av det förfalskade','Myteri','Lydnadsbrott'])assert.equal(g(t).screens.f,'requires-case-selection');
assert.match(g('Grovt bedrägeri').secretFinding,/elektronisk kommunikation/);assert.match(g('Utpressning').secretFinding,/tre månaders/);assert.match(g('Mened').secretFinding,/inte är mindre allvarlig/);assert.match(g('Sexuellt ofredande mot barn').secretFinding,/Katalogspår/);assert.match(g('Grovt penningtvättsbrott').secretFinding,/punkt 15/);assert.match(g('Mord').secretFinding,/Minimistraffet når två år/);
assert.match(data.rules.find(x=>x.id==='one').detail,/maximistraffet/);assert.match(data.rules.find(x=>x.id==='four').detail,/inte generellt förberedelse/);assert.match(data.rules.find(x=>x.id==='authority').detail,/Under 15 år/);
// A new record must not change any prior data or computed power indicator.
const before=load([mod]),old=plain(before.window.BK_DATA.crimes),scores=before.window.BK_DATA.crimes.map(c=>before.window.BK_COERCIVE.entries.map(e=>plain(before.window.BK_COERCIVE.score(c,e))));vm.runInContext(read(mod),before);
for(const [i,c]of before.window.BK_DATA.crimes.entries()){const copy=plain(c),prev=old[i];delete copy.coercionThresholdReview15;if(!prev.legalAudit15?.checkpoints?.coercion&&copy.legalAudit15?.checkpoints?.coercion)delete copy.legalAudit15.checkpoints.coercion;assert.deepEqual(copy,prev,'Preserve '+c.title);assert.deepEqual(before.window.BK_COERCIVE.entries.map(e=>plain(before.window.BK_COERCIVE.score(c,e))),scores[i],'No indicator change '+c.title);}
function change(fn){const x=load([mod]);fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_BASE_COERCION_REVIEW15;}
assert.equal(change(w=>{w.BK_PROCEDURAL_SOURCES15['RB:24:1'].text+=' changed';}).completed,0);
assert.equal(change(w=>{w.BK_PROCEDURAL_SOURCES15['RB:28:10d'].checked='2099-01-01';}).completed,0);
assert.equal(change(w=>{w.BK_PROCEDURAL_SOURCES15['LUL:23'].complete=false;}).completed,0);
assert.equal(change(w=>{w.BK_STATUTES['BrB:8:1'].text+=' changed';}).completed,389);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Stöld').penaltyRange.max=3;}).completed,389);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Förtal').law+=' changed';}).completed,389);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Arbetsmiljöbrott').conditionalPenalty=false;}).completed,389);
assert.equal(change(w=>{w.BK_DATA.crimes.find(c=>c.title==='Stöld').legalAudit15.checkpoints.coercion={status:'PENDING'};}).completed,389);
for(const p of[mod,'./procedural-source-review-15.js'])assert.ok(read('service-worker.js').includes(p));for(const s of inline)new Function(s);
console.log('PASS: 390 individual current threshold reviews; 30 unresolved branch/applicability cases retained, 55 procedure pins, unchanged indicators and no automatic power approval');

const workplace=base.find(c=>c.title==='Arbetsmiljöbrott');assert.equal(workplace.coercionThresholdReview15.checked,'2026-10-21');assert.equal(workplace.penaltyAlternatives15.length,6);for(const key of['f','one','presumption','four','travel'])assert.equal(workplace.coercionThresholdReview15.screens[key],'requires-case-selection');
