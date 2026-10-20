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
for(const old of corrections.superseded){const c=st.find(c=>c.id===old.id);assert.equal(old.scope.finding,'NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER');assert.equal(c.stageStatus,'punishable');assert.equal(c.individualLegalAudit15.scope.finding,'CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE');assert.ok(!c.law.includes('Det finns inte någon särskild föreskrift'));assert.match(c.prosecutionRule,/Ej individuellt/);assert.equal(c.penaltyRange,null);assert.equal(c.penaltyRangeVerified,false);assert.equal(c.custody,'unknown');assert.equal(c.prosecution,'unknown');assert.equal(w.BK_COERCIVE.score(c,{id:'husrannsakan',scale:'any'}).tone,'unknown');assert.ok(c.rekvisit15.groups.length>4);}
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
