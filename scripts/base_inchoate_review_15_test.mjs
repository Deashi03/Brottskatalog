import assert from'node:assert/strict';import fs from'node:fs';import vm from'node:vm';import path from'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),html=read('index.html');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const mod='./base-inchoate-review-15.js',patch='./stage-grade-corrections-15.js';
function load(skip=[]){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of files)if(!skip.includes(f))vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),w=ctx.window,all=w.BK_DATA.crimes,base=all.filter(c=>!c.stageType),st=all.filter(c=>c.stageType);
assert.equal(w.BK_BASE_INCHOATE_REVIEW15.planned,326);assert.equal(w.BK_BASE_INCHOATE_REVIEW15.completed,326);assert.equal(w.BK_BASE_INCHOATE_REVIEW15.held.length,0);assert.equal(w.BK_BASE_INCHOATE_REVIEW15.fullLegalApprovals,0);
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_BASE_INCHOATE_REVIEW15.byFamily)),{BrB:269,Nark:11,SmuglL:23,PTBL:6,SkBrL:9,BidrBrL:4,LBE:4});
assert.equal(base.filter(c=>c.legalAudit15?.checkpoints?.inchoate?.status==='APPROVED').length,390);
const manifest=JSON.parse(read('data/base-inchoate-review-15.json'));
assert.deepEqual(JSON.parse(JSON.stringify(w.BK_BASE_INCHOATE_RECORDS15)),manifest.records);
for(const r of manifest.records){const c=base.find(c=>c.id===r.id),a=c.legalAudit15.checkpoints.inchoate;assert.equal(c.legalAudit15.fullLegalReviewApproved,false);assert.equal(a.scope,manifest.scope);assert.equal(a.caseSpecificLiabilityApproved,false);assert.equal(a.historicLawApproved,false);assert.equal(a.jurisprudenceApproved,false);assert.equal(a.caseSpecificCustodyApproved,false);assert.equal(a.penaltyRangeApproved,false);assert.equal(a.fullChapter23CaseAssessmentApproved,false);assert.equal(c.baseInchoateReview15.allowed,r.allowed);assert.ok(a.finding.includes(r.title));assert.ok(c.baseInchoateReview15.note.length>60);}
const by=t=>base.find(c=>c.title===t).baseInchoateReview15;
for(const [title,code]of[['Ringa narkotikabrott · bruk',''],['Ringa narkotikabrott · innehav','FP'],['Narkotikabrott · innehav','FPS'],['Grovt skattebrott','PS'],['Skattebrott',''],['Ringa smuggling av explosiv vara','F'],['Ringa vapensmuggling','FP'],['Grov penningförfalskning','FP'],['Grov förgöring','FPS'],['Grovt bokföringsbrott','P'],['Grovt givande av muta','P'],['Grovt fordringsbedrägeri','P'],['Ringa tillgrepp av fortskaffningsmedel',''],['Mened','PS'],['Grovt främjande av rymning eller flykt','FP'],['Grov rymning','F']])assert.equal(by(title).allowed,code,title);
assert.match(by('Mened').note,/mindre allvarlig/);assert.match(by('Oredlighet mot borgenärer').note,/bortförande av tillgång ur landet/);assert.match(by('Olovlig befattning med falska pengar').note,/anskaffande eller mottagande/);assert.match(by('Barnpornografibrott').note,/första stycket/);assert.match(by('Bidragsbrott').note,/redan fullbordat/);assert.match(by('Landssvek').note,/hotas av krig/);
const standalone=base.find(c=>c.isStandaloneInchoate);assert.equal(standalone.baseInchoateReview15.standalone,true);assert.equal(st.filter(s=>s.stageParentId===standalone.id).length,0);
const corrections=w.BK_STAGE_GRADE_CORRECTIONS15;assert.equal(corrections.corrected,13);assert.equal(corrections.held.length,0);assert.equal(corrections.superseded.length,13);
assert.equal(st.filter(c=>c.stageStatus==='punishable').length,452);assert.equal(st.filter(c=>c.stageStatus==='not-criminalized').length,715);
for(const old of corrections.superseded){const c=st.find(c=>c.id===old.id);assert.equal(old.scope.finding,'NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER');assert.equal(c.stageStatus,'punishable');assert.equal(c.individualLegalAudit15.scope.finding,'CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE');assert.ok(!c.law.includes('Det finns inte någon särskild föreskrift'));assert.match(c.prosecutionRule,/Ej individuellt/);if(c.stageAttemptPenaltyReview15||c.stagePreparationPenaltyReview15||c.stageIntervalReview15){assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),JSON.parse(JSON.stringify((c.stageAttemptPenaltyReview15||c.stagePreparationPenaltyReview15||c.stageIntervalReview15).range)));assert.equal(c.penaltyRangeVerified,true);}else{assert.equal(c.penaltyRange,null);assert.equal(c.penaltyRangeVerified,false);}assert.equal(c.custody,'unknown');assert.equal(c.prosecution,'unknown');assert.equal(w.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');assert.ok(c.rekvisit15.groups.length>4);}
for(const title of ['Stämpling till grovt hindrande av urkunds bevisfunktion','Stämpling till grov penningförfalskning'])assert.equal(st.find(c=>c.title===title).stageStatus,'not-criminalized');
// Tampering with primary paragraphs, source versions, own text or a single
// expected stage must keep affected base checkpoints OPEN.
function rerun(mutate){const x=load([mod]);mutate(x.window);vm.runInContext(read(mod),x);return x.window;}
assert.equal(rerun(w=>{w.BK_STATUTES['BrB:19:14'].text+=' CHANGED';}).BK_BASE_INCHOATE_REVIEW15.completed,309);
assert.equal(rerun(w=>{w.BK_SPECIAL_EXCERPTS.SmuglL.sections['14'].text+=' CHANGED';}).BK_BASE_INCHOATE_REVIEW15.completed,303);
assert.equal(rerun(w=>{w.BK_SPECIAL_EXCERPTS.LBE.observedVersion='2099:1';}).BK_BASE_INCHOATE_REVIEW15.completed,322);
assert.equal(rerun(w=>{w.BK_STATUTES['BrB:20:6'].text+=' CHANGED';}).BK_BASE_INCHOATE_REVIEW15.completed,320);
assert.equal(rerun(w=>{w.BK_DATA.crimes.find(c=>c.title==='Mened').law+=' CHANGED';}).BK_BASE_INCHOATE_REVIEW15.completed,325);
assert.equal(rerun(w=>{w.BK_DATA.crimes.find(c=>c.title==='Försök till mened').stageStatus='punishable';}).BK_BASE_INCHOATE_REVIEW15.completed,325);
const before=load([mod]),preserve=JSON.parse(JSON.stringify(before.window.BK_DATA.crimes.filter(c=>!c.stageType).map(c=>({id:c.id,checkpoints:c.legalAudit15?.checkpoints}))));vm.runInContext(read(mod),before);
for(const r of preserve){const c=before.window.BK_DATA.crimes.find(c=>c.id===r.id);for(const [key,v]of Object.entries(r.checkpoints||{}))assert.deepEqual(JSON.parse(JSON.stringify(c.legalAudit15.checkpoints[key])),v,'Existing checkpoint preserved '+r.id+' '+key);}
for(const key of ['BrB:14:4','BrB:14:13']){const x=load([patch,mod,'./stage-requisite-outlines-15.js']);x.window.BK_STATUTES[key].text+=' CHANGED';vm.runInContext(read(patch),x);assert.equal(x.window.BK_STAGE_GRADE_CORRECTIONS15.corrected,key==='BrB:14:4'?11:9);assert.ok(x.window.BK_STAGE_GRADE_CORRECTIONS15.held.length>0);}
for(const f of[mod,patch])assert.ok(read('service-worker.js').includes(f));for(const s of inline)new Function(s);
assert.ok(html.includes('${inchoateSummary}${stageOverview}'));
console.log('PASS: 326 source-bound base checks, 13 traced grade corrections, 452 stage outlines, explicit branch limits and mutation controls; no full legal signoffs');

const rangeReport=w.BK_STAGE_ATTEMPT_PENALTY_REVIEW15;
assert.equal(rangeReport.reviewed,8);assert.equal(rangeReport.held.length,0);
const reviewed=st.filter(c=>c.stageAttemptPenaltyReview15);
assert.equal(reviewed.length,8);
for(const c of reviewed){assert.equal(c.stageType,'forsok');assert.equal(c.stageAttemptPenaltyReview15.coercionApproved,false);assert.equal(c.stageAttemptPenaltyReview15.caseSpecificLiabilityApproved,false);assert.equal(c.custody,'unknown');assert.equal(w.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');}
function attemptMutation(fn){const x=load();for(const c of x.window.BK_DATA.crimes.filter(c=>c.stageAttemptPenaltyReview15)){delete c.stageAttemptPenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}fn(x.window);vm.runInContext(read(mod),x);return x.window;}
assert.equal(attemptMutation(w=>w.BK_STATUTES['BrB:23:1'].text+=' CHANGED').BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,0);
assert.equal(attemptMutation(w=>w.BK_STATUTES['BrB:14:13'].complete=false).BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,4);
assert.equal(attemptMutation(w=>w.BK_STATUTES['BrB:15:8'].url='https://example.invalid').BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,7);
assert.equal(attemptMutation(w=>w.BK_DATA.crimes.find(c=>c.id==='v05-grov-forgoring').penaltyRange.max=8).BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,7);
assert.equal(attemptMutation(w=>w.BK_DATA.crimes.find(c=>c.id==='v05-grov-bevisforvanskning').law+=' CHANGED').BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,7);
vm.runInContext(read(mod),ctx);assert.equal(w.BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,0);assert.equal(w.BK_STAGE_ATTEMPT_PENALTY_REVIEW15.duplicates,8);
console.log('PASS: eight individually pinned ordinary attempt ranges, changed-source/grade holds and idempotence; no prosecution or coercion approval');

// The added range review must preserve every non-range field, including the
// existing prosecution classification, all legal checkpoints and all base cards.
const isolated=load(),crimes=isolated.window.BK_DATA.crimes;
for(const c of crimes.filter(c=>c.stageAttemptPenaltyReview15)){delete c.stageAttemptPenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}
const previous=JSON.parse(JSON.stringify(crimes));
const addedReview=read(mod).slice(read(mod).indexOf('/* Eight separately checked ordinary attempt ranges.'));
vm.runInContext(addedReview,isolated);
const allowedRangeFields=['penaltyRange','penaltyRangeVerified','penalty','penaltyShort','stagePenaltyLower','stagePenaltyUpper','penaltyNote','stageConsequenceNote15','penaltyChecked','penaltyReviewScope','stageAttemptPenaltyReview15'];
for(const[i,c]of crimes.entries()){const actual=JSON.parse(JSON.stringify(c)),prior=previous[i];if(c.stageAttemptPenaltyReview15)for(const key of allowedRangeFields){delete actual[key];delete prior[key];}assert.deepEqual(actual,prior,'Range review preserves every unrelated field: '+c.title);}

assert.equal(attemptMutation(w=>w.BK_STATUTES['BrB:19:14'].text+=' CHANGED').BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,6);
assert.equal(attemptMutation(w=>w.BK_STATUTES['BrB:14:7'].machine=true).BK_STAGE_ATTEMPT_PENALTY_REVIEW15.reviewed,7);
const moneyAttempt=st.find(c=>c.title==='Försök till grov olovlig befattning med falska pengar');
assert.equal(moneyAttempt.penaltyRange.max,6);assert.equal(moneyAttempt.penaltyRange.fines,true);
assert.ok(moneyAttempt.rekvisit15.groups.some(g=>(g.label||'').includes('ANSKAFFA')||(g.label||'').includes('anskaffande')));

const prepContext=load(),prepWindow=prepContext.window;
const prepReport=prepWindow.BK_STAGE_PREPARATION_PENALTY_REVIEW15;
assert.equal(prepReport.reviewed,20);assert.equal(prepReport.held.length,0);
const prep=st.filter(c=>c.stagePreparationPenaltyReview15);assert.equal(prep.length,20);assert.equal(prep.filter(c=>c.penaltyRange.maxExclusive).length,5);
for(const c of prep){const r=c.stagePreparationPenaltyReview15;assert.equal(r.upperEndpointIncluded,!c.penaltyRange.maxExclusive);assert.equal(r.coercionApproved,false);assert.equal(c.individualLegalAudit15.consequences.punishmentRangeApproved,false);assert.equal(w.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');assert.equal(c.stagePenaltyUpper.startsWith('Under '),!!c.penaltyRange.maxExclusive);}
function prepMutation(fn){const x=load();for(const c of x.window.BK_DATA.crimes.filter(c=>c.stagePreparationPenaltyReview15)){delete c.stagePreparationPenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_STAGE_PREPARATION_PENALTY_REVIEW15;}
assert.equal(prepMutation(w=>w.BK_STATUTES['BrB:23:2'].text+=' CHANGED').reviewed,0);
assert.equal(prepMutation(w=>w.BK_STATUTES['BrB:14:13'].complete=false).reviewed,16);
assert.equal(prepMutation(w=>w.BK_STATUTES['BrB:19:14'].checked='2099-01-01').reviewed,16);
assert.equal(prepMutation(w=>w.BK_STATUTES['BrB:4:10'].machine=true).reviewed,18);
assert.equal(prepMutation(w=>w.BK_DATA.crimes.find(c=>c.id==='v05-grov-forgoring').penaltyRange.max=4).reviewed,18);
const pi=load(),pc=pi.window.BK_DATA.crimes;
for(const c of pc.filter(c=>c.stagePreparationPenaltyReview15)){delete c.stagePreparationPenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}
const pb=JSON.parse(JSON.stringify(pc)),prepCode=read(mod).slice(read(mod).indexOf('/* Twelve original plus eight life-maximum preparation/conspiracy intervals;'));
vm.runInContext(prepCode,pi);
for(const[i,c]of pc.entries()){const current=JSON.parse(JSON.stringify(c)),prior=pb[i];if(c.stagePreparationPenaltyReview15)for(const key of [...allowedRangeFields,'stagePreparationPenaltyReview15']){delete current[key];delete prior[key];}assert.deepEqual(current,prior,'Preparation review preserves all unrelated fields: '+c.title);}
vm.runInContext(prepCode,pi);assert.equal(pi.window.BK_STAGE_PREPARATION_PENALTY_REVIEW15.reviewed,0);assert.equal(pi.window.BK_STAGE_PREPARATION_PENALTY_REVIEW15.duplicates,20);
console.log('PASS: twenty individually pinned preparation/conspiracy intervals, five open endpoints, source mutation guards, idempotence and unchanged powers');

// Thirteen further source-pinned intervals: nine attempts and four weapon
// preparations/conspiracies, with different fine thresholds and open maxima.
const extraCtx=load(),extraW=extraCtx.window,extra=extraW.BK_DATA.crimes.filter(c=>c.stageIntervalReview15);
assert.equal(extraW.BK_STAGE_INTERVAL_REVIEW15.reviewed,13);assert.equal(extraW.BK_STAGE_INTERVAL_REVIEW15.held.length,0);
assert.equal(extra.filter(c=>c.stageType==='forsok').length,9);assert.equal(extra.filter(c=>c.penaltyRange.maxExclusive).length,4);
assert.equal(extra.filter(c=>c.penaltyRange.life).length,4);assert.equal(extra.filter(c=>!c.penaltyRange.fines).length,9);
for(const c of extra){assert.equal(c.stageIntervalReview15.coercionApproved,false);assert.equal(c.custody,'unknown');assert.equal(extraW.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');assert.equal(c.penaltyRange.min,c.penaltyRange.fines?0:1/12);assert.equal(c.stagePenaltyLower,c.penaltyRange.fines?'Böter':'Fängelse 1 mån');assert.equal(c.stageIntervalReview15.upperEndpointIncluded,!c.penaltyRange.maxExclusive);}
const exBy=t=>extra.find(c=>c.title===t);
assert.equal(exBy('Förberedelse till grovt vapenbrott').penaltyRange.fines,true);
assert.equal(exBy('Förberedelse till synnerligen grovt vapenbrott').penaltyRange.fines,false);
assert.equal(exBy('Försök till grov kapning').stagePenaltyUpper,'18 år eller livstid');
assert.equal(exBy('Stämpling till synnerligen grovt vapenbrott').stagePenaltyUpper,'Under 10 år');
assert.equal(extraW.BK_STATUTES['BrB:26:1'].complete,false);assert.equal(extraW.BK_STATUTES['BrB:26:1'].machine,true);
function extraMutation(fn){const x=load();for(const c of x.window.BK_DATA.crimes.filter(c=>c.stageIntervalReview15)){delete c.stageIntervalReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_STAGE_INTERVAL_REVIEW15;}
assert.equal(extraMutation(w=>w.BK_STATUTES['BrB:23:1'].text+=' CHANGED').reviewed,4);
assert.equal(extraMutation(w=>w.BK_STATUTES['BrB:26:1'].text+=' CHANGED').reviewed,4);
assert.equal(extraMutation(w=>w.BK_STATUTES['BrB:26:1'].machine=false).reviewed,4);
assert.equal(extraMutation(w=>w.BK_STATUTES['Vapen:18:2'].text+=' CHANGED').reviewed,7);
assert.equal(extraMutation(w=>w.BK_STATUTES['Vapen:18:15'].checked='2099-01-01').reviewed,7);
assert.equal(extraMutation(w=>w.BK_DATA.crimes.find(c=>c.id==='v05-grovt-spridande-av-gift-eller-smitta').penaltyRange.max=19).reviewed,12);
const exIso=load(),exCrimes=exIso.window.BK_DATA.crimes;
for(const c of exCrimes.filter(c=>c.stageIntervalReview15)){delete c.stageIntervalReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}
const exBefore=JSON.parse(JSON.stringify(exCrimes)),exSources=JSON.stringify(exIso.window.BK_STATUTES),exCode=read(mod).slice(read(mod).indexOf('/* Thirteen additional fixed-ID statutory stage intervals.'));
vm.runInContext(exCode,exIso);assert.equal(JSON.stringify(exIso.window.BK_STATUTES),exSources,'Separate source review must not promote global completeness');
for(const[i,c]of exCrimes.entries()){const actual=JSON.parse(JSON.stringify(c)),prior=exBefore[i];if(c.stageIntervalReview15)for(const key of [...allowedRangeFields,'stageIntervalReview15']){delete actual[key];delete prior[key];}assert.deepEqual(actual,prior,'Extra interval review preserves unrelated fields: '+c.title);}
vm.runInContext(exCode,exIso);assert.equal(exIso.window.BK_STAGE_INTERVAL_REVIEW15.duplicates,13);assert.equal(exIso.window.BK_STAGE_INTERVAL_REVIEW15.reviewed,0);
console.log('PASS: thirteen additional fixed stage intervals, one-month minima, life alternatives, four open maxima, source mutation controls and unchanged legal powers');

const reloadCtx=load(),reloadBefore=JSON.stringify(reloadCtx.window.BK_DATA.crimes);vm.runInContext(read(mod),reloadCtx);assert.equal(JSON.stringify(reloadCtx.window.BK_DATA.crimes),reloadBefore,"Complete module reload preserves every reviewed range, including the thirteen originally reclassified cards");

assert.deepEqual(JSON.parse(JSON.stringify(extraW.BK_STAGE_INTERVAL_REVIEW_DATA15)),JSON.parse(read("data/additional-stage-intervals-15.json")),"Source pins and individual fixed-ID manifest match runtime");

const lifePrep=prep.filter(c=>c.stagePreparationPenaltyReview15.lifeMaximumAnalysis);assert.equal(lifePrep.length,8);for(const c of lifePrep){assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),{min:0,max:18,fines:true,life:false});assert.equal(c.stagePenaltyUpper,"18 år");assert.equal(c.stagePreparationPenaltyReview15.upperEndpointIncluded,true);assert.equal(c.stagePreparationPenaltyReview15.fullLegalReviewApproved,false);}
assert.equal(prepMutation(w=>w.BK_STATUTES["BrB:13:5a"].text+=" CHANGED").reviewed,16);
assert.equal(prepMutation(w=>w.BK_STATUTES["BrB:13:7"].machine=true).reviewed,18);

const wartimeCtx=load(),wartimeW=wartimeCtx.window,warRows=wartimeW.BK_DATA.crimes.filter(c=>c.stageWartimePenaltyReview15);
assert.equal(wartimeW.BK_STAGE_WARTIME_PENALTY_REVIEW15.reviewed,3);assert.equal(wartimeW.BK_STAGE_WARTIME_PENALTY_REVIEW15.held.length,0);
assert.deepEqual(JSON.parse(JSON.stringify(wartimeW.BK_STAGE_WARTIME_PENALTY_DATA15)),JSON.parse(read('data/war-stage-intervals-15.json')));
for(const c of warRows){assert.equal(c.applicabilityConditional,true);assert.ok(c.applicabilityWarning);assert.equal(c.stageWartimePenaltyReview15.applicabilityApproved,false);assert.equal(c.stageWartimePenaltyReview15.personalScopeApproved,false);assert.equal(c.custody,'unknown');assert.equal(wartimeW.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');const expected={min:0,max:6,fines:true,life:false};if(c.stageType!=='forsok')expected.maxExclusive=true;assert.deepEqual(JSON.parse(JSON.stringify(c.penaltyRange)),expected);}
function warMutation(fn){const x=load();for(const c of x.window.BK_DATA.crimes.filter(c=>c.stageWartimePenaltyReview15)){delete c.stageWartimePenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_STAGE_WARTIME_PENALTY_REVIEW15;}
assert.equal(warMutation(w=>w.BK_STATUTES['BrB:21:1'].text+=' CHANGED').reviewed,0);
assert.equal(warMutation(w=>w.BK_STATUTES['BrB:21:15'].complete=false).reviewed,0);
assert.equal(warMutation(w=>w.BK_DATA.crimes.find(c=>c.id==='v15-war-grovt-vald-eller-hot-mot-forman').applicabilityConditional=false).reviewed,0);
const warIso=load(),warCrimes=warIso.window.BK_DATA.crimes;for(const c of warCrimes.filter(c=>c.stageWartimePenaltyReview15)){delete c.stageWartimePenaltyReview15;c.penaltyRange=null;c.penaltyRangeVerified=false;}
const warBefore=JSON.parse(JSON.stringify(warCrimes)),warCode=read(mod).slice(read(mod).indexOf('/* Three statutory ranges conditional on BrB 21 applicability,'));vm.runInContext(warCode,warIso);
for(const[i,c]of warCrimes.entries()){const actual=JSON.parse(JSON.stringify(c)),prior=warBefore[i];if(c.stageWartimePenaltyReview15)for(const key of [...allowedRangeFields,'stageWartimePenaltyReview15']){delete actual[key];delete prior[key];}assert.deepEqual(actual,prior,'Wartime scales preserve applicability and all other legal fields: '+c.title);}
vm.runInContext(warCode,warIso);assert.equal(warIso.window.BK_STAGE_WARTIME_PENALTY_REVIEW15.duplicates,3);
const warReload=load(),warFullBefore=JSON.stringify(warReload.window.BK_DATA.crimes);vm.runInContext(read(mod),warReload);assert.equal(JSON.stringify(warReload.window.BK_DATA.crimes),warFullBefore);
console.log('PASS: three conditionally applicable wartime stage scales; no activation, personal-scope or coercion approvals; source and condition mutation guards');

const altCtx=load(),altW=altCtx.window,altRows=altW.BK_DATA.crimes.filter(c=>c.stagePenaltyAlternativeReview15);assert.equal(altRows.length,12);assert.equal(altW.BK_STAGE_PENALTY_ALTERNATIVES15.annotated,12);assert.equal(altW.BK_STAGE_PENALTY_ALTERNATIVES15.options,44);assert.equal(altW.BK_STAGE_PENALTY_ALTERNATIVES15.held.length,0);
assert.deepEqual(JSON.parse(JSON.stringify(altW.BK_STAGE_PENALTY_ALTERNATIVES_DATA15)),JSON.parse(read('data/stage-penalty-alternatives-15.json')));
for(const c of altRows){assert.equal(c.penaltyRange,null);assert.notEqual(c.penaltyRangeVerified,true);assert.equal(c.conditionalPenalty,true);assert.equal(c.stagePenaltyAlternativeReview15.automaticSelectionAllowed,false);assert.equal(c.stagePenaltyAlternativeReview15.fullLegalReviewApproved,false);assert.equal(altW.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');}
const altBy=t=>altRows.find(c=>c.title===t);
assert.equal(altBy('Förberedelse till osann utsaga inför nordisk domstol').penaltyAlternatives15.length,2);
assert.equal(altBy('Försök till brukande av det förfalskade').penaltyAlternatives15.length,9);
assert.deepEqual(JSON.parse(JSON.stringify(altBy('Förberedelse till högförräderi').penaltyAlternatives15.map(a=>a.range))),[{min:1/12,max:18,fines:false,life:false},{min:0,max:10,fines:true,life:false,maxExclusive:true}]);
assert.deepEqual(JSON.parse(JSON.stringify(altBy('Förberedelse till osann utsaga inför nordisk domstol').penaltyAlternatives15.map(a=>a.range))),[{min:0,max:2,fines:true,life:false},{min:0,max:8,fines:true,life:false,maxExclusive:true}]);
function altMutation(fn){const x=load();for(const c of x.window.BK_DATA.crimes.filter(c=>c.stagePenaltyAlternativeReview15)){delete c.stagePenaltyAlternativeReview15;delete c.penaltyAlternatives15;delete c.conditionalPenalty;}fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_STAGE_PENALTY_ALTERNATIVES15;}
assert.equal(altMutation(w=>w.BK_STATUTES['BrB:15:15'].text+=' CHANGED').annotated,8);
assert.equal(altMutation(w=>w.BK_STATUTES['BrB:14:10'].complete=false).annotated,10);
assert.equal(altMutation(w=>w.BK_STATUTES['BrB:23:2'].text+=' CHANGED').annotated,3);
assert.equal(altMutation(w=>w.BK_STATUTES['BrB:26:1'].text+=' CHANGED').annotated,8);
const altIso=load(),altCrimes=altIso.window.BK_DATA.crimes;for(const c of altCrimes.filter(c=>c.stagePenaltyAlternativeReview15)){delete c.stagePenaltyAlternativeReview15;delete c.penaltyAlternatives15;delete c.conditionalPenalty;}
const altBefore=JSON.parse(JSON.stringify(altCrimes)),altCode=read(mod).slice(read(mod).indexOf('/* Twelve individually described conditional stage scales,'));vm.runInContext(altCode,altIso);
const altFields=['conditionalPenalty','penaltyAlternatives15','penalty','penaltyShort','penaltyNote','penaltyReviewScope','stagePenaltyAlternativeReview15'];
for(const[i,c]of altCrimes.entries()){const actual=JSON.parse(JSON.stringify(c)),prior=altBefore[i];if(c.stagePenaltyAlternativeReview15)for(const key of altFields){delete actual[key];delete prior[key];}assert.deepEqual(actual,prior,'Alternative descriptions preserve other legal fields: '+c.title);}
vm.runInContext(altCode,altIso);assert.equal(altIso.window.BK_STAGE_PENALTY_ALTERNATIVES15.duplicates,12);
console.log('PASS: twelve conditional stage cards with 44 separately described branches, correct excluded alternatives, exact source holds and no automatic numeric selection');
