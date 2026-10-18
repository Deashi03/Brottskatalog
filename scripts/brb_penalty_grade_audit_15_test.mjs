import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const module='./brb-penalty-grade-audit-15.js';
assert.ok(scripts.includes(module)&&sw.includes(module),'247 grade-range legal crosschecks must be available offline');
assert.ok(scripts.indexOf(module)>scripts.indexOf('./brb-curated-lawtext-15.js'));
assert.ok(scripts.indexOf(module)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const stats=ctx.window.BK_PENALTY_GRADE_AUDIT15;
assert.ok(stats,'No source-checked penalty audit report');
assert.equal(stats.planned,247,'Unexpected count of offence-grade penalty crosschecks');
assert.deepEqual(Array.from(stats.missing),[],'Missing title in penalty source review');
assert.deepEqual(Array.from(stats.unreviewedSource),[],'No source verification for penalty review');
assert.deepEqual(Array.from(stats.held),[],'Penalty range held for source change');
assert.deepEqual(Array.from(stats.mismatch),[],'Current statutory penalty conflicts found – repair underlying entry, never stamp false approval');
assert.equal(stats.reviewed,247,'All 247 grade-range comparisons should match the actual catalogue');
const c=ctx.window.BK_DATA.crimes;
const base=c.filter(x=>!x.stageType);
const reviewed=base.filter(x=>x.penaltyReviewScope==='individual-current-grade-range-only');
assert.equal(reviewed.length,247,'No extra crime can silently acquire grade-range approval');
for(const p of reviewed){
 assert.equal(p.penaltyGradeReviewDate,p.lawCompletenessChecked);
 assert.ok(p.penaltyGradeReviewSource.includes('riksdagen.se'));
 assert.equal(p.lawCompletenessReviewScope,'current-paragraph-only','Do not approve penalty without complete current statute source');
 assert.equal(p.penaltyRangeVerified,true);
 assert.notEqual(p.rekvisit15?.legalReviewApproved,true,'Individual statutory penalty check is not full legal review');
 assert.ok(!p.penaltyReviewSafety.includes('fully reviewed'),'Do not overstate legal review scope');
}
const by=t=>base.find(c=>c.title===t);

const securityRanges=[{"title":"Spioneri","statute":"BrB:19:5","min":0,"max":6,"fines":false,"life":false},{"title":"Obehörig befattning med hemlig uppgift","statute":"BrB:19:7","min":0,"max":2,"fines":true,"life":false}];
for(const r of securityRanges){
 const c=by(r.title);assert.ok(c,r.title);
 assert.equal(c.statute,r.statute,'Wrong statutory provision');
 for(const p of ['min','max','fines','life'])assert.equal(c.penaltyRange[p],r[p],r.title+' '+p);
 assert.equal(c.penaltyReviewScope,'individual-current-grade-range-only');
 assert.equal(c.penaltyGradeReviewDate,c.lawCompletenessChecked);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'No full legal signoff from penalty interval');
}


const policeAndOrderGrades=[{"title":"Ohörsamhet mot ordningsmakten","statute":"BrB:16:3","min":0,"max":0.5,"fines":true,"life":false},{"title":"Olaga diskriminering","statute":"BrB:16:9","min":0,"max":1,"fines":true,"life":false},{"title":"Otillåtet förfarande med pornografisk bild","statute":"BrB:16:11","min":0,"max":0.5,"fines":true,"life":false},{"title":"Störande av förrättning eller av allmän sammankomst","statute":"BrB:16:4","min":0,"max":0.5,"fines":true,"life":false},{"title":"Uppvigling","statute":"BrB:16:5","min":0,"max":0.5,"fines":true,"life":false},{"title":"Angrepp mot tjänsteman","statute":"BrB:17:2","min":0,"max":2,"fines":true,"life":false},{"title":"Brott mot rösthemlighet","statute":"BrB:17:9","min":0,"max":0.5,"fines":true,"life":false},{"title":"Föregivande av allmän ställning","statute":"BrB:17:15","min":0,"max":0.5,"fines":true,"life":false},{"title":"Grovt angrepp mot tjänsteman","statute":"BrB:17:2","min":0.5,"max":6,"fines":false,"life":false},{"title":"Grovt otillbörligt verkande vid röstning","statute":"BrB:17:8","min":0,"max":4,"fines":false,"life":false},{"title":"Grovt skyddande av brottsling","statute":"BrB:17:11","min":1,"max":6,"fines":false,"life":false},{"title":"Grovt övergrepp i rättssak","statute":"BrB:17:10","min":2,"max":8,"fines":false,"life":false},{"title":"Otillbörligt verkande vid röstning","statute":"BrB:17:8","min":0,"max":0.5,"fines":true,"life":false},{"title":"Skyddande av brottsling","statute":"BrB:17:11","min":0,"max":2,"fines":true,"life":false},{"title":"Tagande av otillbörlig förmån vid röstning","statute":"BrB:17:8","min":0,"max":0.5,"fines":true,"life":false},{"title":"Övergrepp i rättssak","statute":"BrB:17:10","min":0.5,"max":4,"fines":false,"life":false},{"title":"Uppror","statute":"BrB:18:1","min":10,"max":18,"fines":false,"life":true},{"title":"Grovt spioneri","statute":"BrB:19:6","min":4,"max":18,"fines":false,"life":true}];
for(const row of policeAndOrderGrades){
 const card=by(row.title);
 assert.ok(card,'Missing 16-19 BrB card '+row.title);
 assert.equal(card.statute,row.statute,'Wrong statutory ref '+row.title);
 for(const k of ['min','max','fines','life'])assert.equal(card.penaltyRange[k],row[k],'Wrong '+k+' '+row.title);
 assert.equal(card.penaltyReviewScope,'individual-current-grade-range-only','Source pending '+row.title);
 assert.equal(card.penaltyGradeReviewDate,card.lawCompletenessChecked,'Source date mismatch '+row.title);
 assert.notEqual(card.rekvisit15?.legalReviewApproved,true,'Not fully reviewed '+row.title);
}
assert.equal(by('Grovt angrepp mot tjänsteman').penaltyRange.min,0.5);
assert.equal(by('Grovt övergrepp i rättssak').penaltyRange.min,2);
assert.equal(by('Uppror').penaltyRange.life,true);
assert.equal(by('Grovt spioneri').penaltyRange.life,true);


const courtroomAndOrderGrades=[{"title":"Grovt missbruk av urkund","ref":"BrB:15:12","min":0,"max":2,"fines":false,"life":false},{"title":"Missbruk av handling","ref":"BrB:15:12","min":0,"max":0.5,"fines":true,"life":false},{"title":"Ringa falsk angivelse","ref":"BrB:15:6","min":0,"max":0.5,"fines":true,"life":false},{"title":"Ringa falsk beskyllning","ref":"BrB:15:7","min":0,"max":0.5,"fines":true,"life":false},{"title":"Ringa osann partsutsaga","ref":"BrB:15:2","min":0,"max":0.5,"fines":true,"life":false},{"title":"Underlåtenhet att avvärja rättsfel","ref":"BrB:15:9","min":0,"max":0.5,"fines":true,"life":false},{"title":"Barnpornografibrott","ref":"BrB:16:10a","min":0,"max":2,"fines":false,"life":false},{"title":"Djurplågeri","ref":"BrB:16:13","min":0,"max":2,"fines":true,"life":false},{"title":"Falskt larm","ref":"BrB:16:15","min":0,"max":1,"fines":true,"life":false},{"title":"Förargelseväckande beteende","ref":"BrB:16:16","min":0,"max":0,"fines":true,"life":false},{"title":"Förledande av ungdom","ref":"BrB:16:12","min":0,"max":0.5,"fines":true,"life":false},{"title":"Gravfridsbrott","ref":"BrB:16:10","min":0,"max":2,"fines":true,"life":false},{"title":"Grovt barnpornografibrott","ref":"BrB:16:10a","min":1,"max":6,"fines":false,"life":false},{"title":"Grovt djurplågeri","ref":"BrB:16:13","min":0.5,"max":4,"fines":false,"life":false},{"title":"Grovt falskt larm","ref":"BrB:16:15","min":0.5,"max":4,"fines":false,"life":false},{"title":"Grovt gravfridsbrott","ref":"BrB:16:10","min":0.5,"max":4,"fines":false,"life":false},{"title":"Hets mot folkgrupp","ref":"BrB:16:8","min":0,"max":2,"fines":false,"life":false},{"title":"Missbruk av larmanordning","ref":"BrB:16:15","min":0,"max":0.5,"fines":true,"life":false}];
for(const x of courtroomAndOrderGrades){
 const c=by(x.title);assert.ok(c,'Missing crime card '+x.title);
 assert.equal(c.statute,x.ref,'Wrong provision '+x.title);
 for(const k of ['min','max','fines','life'])assert.equal(c.penaltyRange[k],x[k],'Wrong '+k+' for '+x.title);
 assert.equal(c.penaltyReviewScope,'individual-current-grade-range-only','No grade signoff '+x.title);
 assert.equal(c.penaltyGradeReviewDate,c.lawCompletenessChecked,'Source text and penalty date mismatch '+x.title);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'Whole-case legal review is pending '+x.title);
}
assert.equal(by('Förargelseväckande beteende').penaltyRange.max,0);
assert.ok(by('Förargelseväckande beteende').penaltyGradeReviewCaveat.includes('penningböter'));
assert.notEqual(by('Hets mot folkgrupp').penaltyRange.fines,true,'Do not mix normal and ringa grade');


const highRiskGrades=[{"title":"Utnyttjande av barn för sexuell posering","statute":"BrB:6:8","min":0,"max":2,"fines":false,"life":false},{"title":"Utnyttjande av barn genom köp av sexuell handling","statute":"BrB:6:9","min":0.5,"max":4,"fines":false,"life":false},{"title":"Allmänfarlig vårdslöshet","statute":"BrB:13:6","min":0,"max":0.5,"fines":true,"life":false},{"title":"Allmänfarlig ödeläggelse","statute":"BrB:13:3","min":2,"max":8,"fines":false,"life":false},{"title":"Förgöring","statute":"BrB:13:8","min":0,"max":2,"fines":true,"life":false},{"title":"Grov allmänfarlig ödeläggelse","statute":"BrB:13:3","min":6,"max":18,"fines":false,"life":true},{"title":"Grov förgöring","statute":"BrB:13:8","min":0.5,"max":6,"fines":false,"life":false},{"title":"Grov mordbrand","statute":"BrB:13:2","min":6,"max":18,"fines":false,"life":true},{"title":"Grovt allmänfarlig vårdslöshet","statute":"BrB:13:6","min":0,"max":2,"fines":false,"life":false},{"title":"Grovt sabotage","statute":"BrB:13:5","min":2,"max":18,"fines":false,"life":true},{"title":"Grovt sabotage mot blåljusverksamhet","statute":"BrB:13:5c","min":2,"max":18,"fines":false,"life":true},{"title":"Grovt spridande av gift eller smitta","statute":"BrB:13:7","min":4,"max":18,"fines":false,"life":true},{"title":"Mordbrand","statute":"BrB:13:1","min":2,"max":8,"fines":false,"life":false},{"title":"Sabotage","statute":"BrB:13:4","min":0,"max":4,"fines":false,"life":false},{"title":"Sabotage mot blåljusverksamhet","statute":"BrB:13:5c","min":0,"max":4,"fines":false,"life":false},{"title":"Spridande av gift eller smitta","statute":"BrB:13:7","min":0,"max":6,"fines":false,"life":false},{"title":"Underlåtenhet att avvärja allmänfara","statute":"BrB:13:10","min":0,"max":1,"fines":true,"life":false}];
for(const x of highRiskGrades){
 const c=by(x.title);assert.ok(c,'Missing individually reviewed risk grade '+x.title);
 assert.equal(c.statute,x.statute,'Wrong section '+x.title);
 assert.equal(c.penaltyRange.min,x.min,'Wrong minimum '+x.title);
 assert.equal(c.penaltyRange.max,x.max,'Wrong maximum '+x.title);
 assert.equal(c.penaltyRange.fines,x.fines,'Wrong fine eligibility '+x.title);
 assert.equal(c.penaltyRange.life,x.life,'Wrong life eligibility '+x.title);
 assert.equal(c.penaltyReviewScope,'individual-current-grade-range-only','Unverified grade '+x.title);
 assert.equal(c.penaltyGradeReviewDate,c.lawCompletenessChecked,'Official source mismatch '+x.title);
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'Inchoate/criminal law review has not been finished');
}
assert.ok(by('Grov mordbrand').penaltyRange.life,'Grov mordbrand must retain life imprisonment');
assert.ok(!by('Grovt allmänfarlig vårdslöshet').penaltyRange.fines,'Grov allmänfarlig vårdslöshet is not a fine offence');
assert.ok(by('Allmänfarlig vårdslöshet').penaltyRange.fines,'Ordinary negligence must retain fine alternative');
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==='unverified').length,12,
 'Stage legal audit cannot be automatically passed by grading 13th chapter');


const revisedFamilyEconomic=[{"title":"Egenmäktighet med barn","statute":"BrB:7:4","min":0,"max":2,"fines":true,"life":false},{"title":"Grov egenmäktighet med barn","statute":"BrB:7:4","min":1,"max":6,"fines":false,"life":false},{"title":"Förvanskande av familjeställning","statute":"BrB:7:3","min":0,"max":2,"fines":true,"life":false},{"title":"Olovligt ingående av äktenskap","statute":"BrB:7:1","min":0,"max":2,"fines":true,"life":false},{"title":"Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn","statute":"BrB:7:2","min":0,"max":2,"fines":true,"life":false},{"title":"Tvegifte","statute":"BrB:7:1","min":0,"max":2,"fines":true,"life":false},{"title":"Grovt svindleri","statute":"BrB:9:9","min":1,"max":6,"fines":false,"life":false},{"title":"Ockerpantning","statute":"BrB:9:10","min":0,"max":2,"fines":true,"life":false},{"title":"Oredligt förfarande","statute":"BrB:9:8","min":0,"max":2,"fines":true,"life":false},{"title":"Ringa svindleri","statute":"BrB:9:9","min":0,"max":0.5,"fines":true,"life":false},{"title":"Svindleri","statute":"BrB:9:9","min":0,"max":2,"fines":false,"life":false},{"title":"Behörighetsmissbruk","statute":"BrB:10:6","min":0,"max":2,"fines":true,"life":false},{"title":"Fyndförseelse","statute":"BrB:10:8","min":0,"max":0,"fines":true,"life":false},{"title":"Grovt olovligt brukande","statute":"BrB:10:7","min":0.5,"max":4,"fines":false,"life":false},{"title":"Olovligt brukande","statute":"BrB:10:7","min":0,"max":1,"fines":true,"life":false}];
for(const entry of revisedFamilyEconomic){
 const card=by(entry.title);
 assert.ok(card,'Missing individually reviewed grade '+entry.title);
 assert.equal(card.statute,entry.statute,'Incorrect legal reference '+entry.title);
 assert.deepEqual(JSON.parse(JSON.stringify(card.penaltyRange)),{min:entry.min,max:entry.max,fines:entry.fines,life:entry.life},'Wrong penalty grade '+entry.title);
 assert.equal(card.penaltyReviewScope,'individual-current-grade-range-only','No unauthorized approval '+entry.title);
 assert.equal(card.penaltyGradeReviewDate,card.lawCompletenessChecked,'Penalty date inconsistent with current SFS '+entry.title);
 assert.notEqual(card.rekvisit15?.legalReviewApproved,true,'No final legal signoff from range check '+entry.title);
}
assert.ok(by('Egenmäktighet med barn').law.includes('Upphör att gälla U:2027-01-01'),'Do not apply next year version in advance');
assert.equal(by('Fyndförseelse').penaltyRange.max,0,'Fines-only grade must not imply six months imprisonment');
assert.notEqual(by('Ringa svindleri').penaltyRange.fines,by('Svindleri').penaltyRange.fines,'Ringa svindleri not conflated with ordinary grade');

const familyPenalty=[{"title":"Grov fridskränkning","ref":"BrB:4:4a","min":1,"max":6,"fines":false,"life":false},{"title":"Grov kvinnofridskränkning","ref":"BrB:4:4a","min":1,"max":6,"fines":false,"life":false},{"title":"Hedersförtryck","ref":"BrB:4:4e","min":1,"max":6,"fines":false,"life":false}];
for(const row of familyPenalty){const card=by(row.title);assert.ok(card,'Missing reviewed family crime '+row.title);assert.equal(card.statute,row.ref);assert.equal(card.penaltyRange.min,row.min);assert.equal(card.penaltyRange.max,row.max);assert.equal(card.penaltyRange.fines,row.fines);assert.equal(card.penaltyRange.life,row.life);assert.equal(card.penaltyReviewScope,'individual-current-grade-range-only');assert.equal(card.penaltyGradeReviewDate,card.lawCompletenessChecked);assert.notEqual(card.rekvisit15?.legalReviewApproved,true);}


const sexualAndFamilyGrades=[{"title":"Ringa barnfridsbrott","statute":"BrB:4:3","min":0,"max":0.5,"fines":true,"life":false},{"title":"Grovt koppleri","statute":"BrB:6:12","min":2,"max":10,"fines":false,"life":false},{"title":"Grovt sexuellt ofredande","statute":"BrB:6:10","min":0.5,"max":3,"fines":false,"life":false},{"title":"Grovt sexuellt ofredande mot barn","statute":"BrB:6:10","min":0.5,"max":3,"fines":false,"life":false},{"title":"Grovt sexuellt övergrepp","statute":"BrB:6:2","min":1,"max":6,"fines":false,"life":false},{"title":"Grovt sexuellt övergrepp mot barn","statute":"BrB:6:6","min":1.5,"max":6,"fines":false,"life":false},{"title":"Grovt utnyttjande av barn för sexuell posering","statute":"BrB:6:8","min":0.5,"max":6,"fines":false,"life":false},{"title":"Kontakt för att träffa ett barn i sexuellt syfte","statute":"BrB:6:10a","min":0,"max":2,"fines":false,"life":false},{"title":"Koppleri","statute":"BrB:6:12","min":0,"max":4,"fines":false,"life":false},{"title":"Köp av sexuell handling","statute":"BrB:6:11","min":0,"max":1,"fines":false,"life":false},{"title":"Oaktsam våldtäkt","statute":"BrB:6:1a","min":0,"max":4,"fines":false,"life":false},{"title":"Oaktsamt sexuellt övergrepp","statute":"BrB:6:3","min":0,"max":4,"fines":false,"life":false},{"title":"Sexuellt ofredande","statute":"BrB:6:10","min":0,"max":2,"fines":true,"life":false},{"title":"Sexuellt ofredande mot barn","statute":"BrB:6:10","min":0,"max":2,"fines":false,"life":false},{"title":"Sexuellt utnyttjande av barn","statute":"BrB:6:5","min":0,"max":4,"fines":false,"life":false},{"title":"Sexuellt övergrepp","statute":"BrB:6:2","min":0.5,"max":2,"fines":false,"life":false},{"title":"Sexuellt övergrepp mot barn","statute":"BrB:6:6","min":0.5,"max":2,"fines":false,"life":false}];
for(const g of sexualAndFamilyGrades) {
 const crime=by(g.title);assert.ok(crime,'Missing current offence card: '+g.title);
 assert.equal(crime.statute,g.statute,'Wrong statutory provision: '+g.title);
 assert.equal(crime.penaltyRange.min,g.min,'Minimum penalty mismatch: '+g.title);
 assert.equal(crime.penaltyRange.max,g.max,'Maximum penalty mismatch: '+g.title);
 assert.equal(crime.penaltyRange.fines,g.fines,'Fine eligibility mismatch: '+g.title);
 assert.equal(crime.penaltyRange.life,g.life,'Life imprisonment mismatch: '+g.title);
 assert.equal(crime.penaltyReviewScope,'individual-current-grade-range-only','Unreviewed penalty scope: '+g.title);
 assert.equal(crime.penaltyGradeReviewDate,crime.lawCompletenessChecked,'Source timestamp mismatch: '+g.title);
 assert.notEqual(crime.rekvisit15?.legalReviewApproved,true,'Full legal review cannot be assumed: '+g.title);
}
assert.notEqual(by('Sexuellt ofredande').penaltyRange.fines,by('Sexuellt ofredande mot barn').penaltyRange.fines,'Adult and child-specific fines may NOT be conflated');
assert.notEqual(by('Grovt sexuellt övergrepp').penaltyRange.min,by('Grovt sexuellt övergrepp mot barn').penaltyRange.min,'Adult and child gross minima must stay separate');


const priorityGrades=[{"title":"Mord","section":"3:1","min":10,"max":18,"fines":false,"life":true},{"title":"Dråp","section":"3:2","min":6,"max":10,"fines":false,"life":false},{"title":"Misshandel","section":"3:5","min":0,"max":2,"fines":false,"life":false},{"title":"Ringa misshandel","section":"3:5","min":0,"max":0.5,"fines":true,"life":false},{"title":"Grov misshandel","section":"3:6","min":1.5,"max":7,"fines":false,"life":false},{"title":"Synnerligen grov misshandel","section":"3:6","min":6,"max":12,"fines":false,"life":false},{"title":"Olaga hot","section":"4:5","min":0,"max":2,"fines":true,"life":false},{"title":"Grovt olaga hot","section":"4:5","min":1,"max":4,"fines":false,"life":false},{"title":"Våldtäkt","section":"6:1","min":3,"max":6,"fines":false,"life":false},{"title":"Grov våldtäkt","section":"6:1","min":5,"max":12,"fines":false,"life":false},{"title":"Våldtäkt mot barn","section":"6:4","min":3,"max":6,"fines":false,"life":false},{"title":"Grov våldtäkt mot barn","section":"6:4","min":5,"max":12,"fines":false,"life":false}];
for(const entry of priorityGrades){
 const card=base.find(c=>c.title===entry.title);
 assert.ok(card,'Expected police-priority penalty card '+entry.title);
 assert.equal(card.statute,'BrB:'+entry.section,'Wrong statute for '+entry.title);
 assert.equal(card.penaltyRange.min,entry.min,'Incorrect minimum: '+entry.title);
 assert.equal(card.penaltyRange.max,entry.max,'Incorrect maximum: '+entry.title);
 assert.equal(card.penaltyRange.fines,entry.fines,'Incorrect fine availability: '+entry.title);
 assert.equal(card.penaltyRange.life,entry.life,'Incorrect life availability: '+entry.title);
 assert.equal(card.penaltyGradeReviewDate,card.lawCompletenessChecked,'Official SFS date mismatch: '+entry.title);
 assert.equal(card.penaltyReviewScope,'individual-current-grade-range-only','No loose grade stamp: '+entry.title);
 assert.notEqual(card.rekvisit15?.legalReviewApproved,true,'Not a full legal signoff: '+entry.title);
}

assert.ok(by('Ringa bedrägeri').penaltyGradeReviewCaveat.includes('utan krav på vilseledande'));
assert.ok(by('Rån').penaltyGradeReviewCaveat.includes('motvärnsrån'));
assert.ok(by('Grovt tjänstefel').penaltyGradeReviewCaveat.includes('UPPSÅT'));
assert.ok(by('Tjänstefel').penaltyGradeReviewCaveat.includes('oaktsamhet'));
assert.equal(by('Grovt rån').penaltyRange.min,5);
for(const [name,min,max,fines] of [
 ['Hindrande av urkunds bevisfunktion',0,2,false],
 ['Ringa hindrande av urkunds bevisfunktion',0,0.5,true],
 ['Grovt hindrande av urkunds bevisfunktion',0.5,4,false],
 ['Signaturförfalskning',0,2,false],
 ['Ringa signaturförfalskning',0,0.5,true],
 ['Grov signaturförfalskning',0.5,4,false],
 ['Penningförfalskning',0,4,false],
 ['Ringa penningförfalskning',0,0.5,true],
 ['Grov penningförfalskning',2,8,false],
 ['Olovlig befattning med falska pengar',0,2,false],
 ['Ringa olovlig befattning med falska pengar',0,0.5,true],
 ['Grov olovlig befattning med falska pengar',0.5,6,false],
 ['Förfalskning av fast märke',0,4,false],
 ['Ringa förfalskning av fast märke',0,0.5,true],
 ['Olaga spridande av efterbildning',0,0,true]
]){
 const c=by(name);
 assert.ok(c,'Expected independently source reviewed forgery grade '+name);
 assert.equal(c.penaltyRange.min,min,name+' min');
 assert.equal(c.penaltyRange.max,max,name+' max');
 assert.equal(c.penaltyRange.fines,fines,name+' fines');
 assert.equal(c.penaltyGradeReviewDate,'2026-10-18',name+' review date');
}
const forgeryUse=by('Brukande av det förfalskade');
assert.ok(forgeryUse,'Missing BrB 14:10 distinct offence card');
assert.equal(forgeryUse.statute,'BrB:14:10');
assert.notEqual(forgeryUse.penaltyReviewScope,'individual-current-grade-range-only',
 '14:10 has derivative penalty from the underlying forged item: never certify arbitrary single interval');

for(const [name,min,max,fine] of [
 ['Falskt åtal',0,2,false],
 ['Grovt falskt åtal',0.5,4,false],
 ['Obefogat åtal',0,0.5,true],
 ['Falsk angivelse',0,2,false],
 ['Grov falsk angivelse',0.5,4,false],
 ['Obefogad angivelse',0,0.5,true],
 ['Falsk beskyllning',0,2,false],
 ['Grov falsk beskyllning',0.5,4,false],
 ['Vårdslös beskyllning',0,0.5,true],
 ['Bevisförvanskning',0,2,false],
 ['Grov bevisförvanskning',0.5,4,false],
 ['Osann försäkran',0,0.5,true],
 ['Osant intygande',0,0.5,true],
 ['Missbruk av urkund',0,0.5,true],
 ['Förnekande av underskrift',0,0.5,true]
]) {
 const card=by(name); assert.ok(card,'Expected existing police-relevant justice card: '+name);
 assert.equal(card.penaltyRange.min,min,name+' min');
 assert.equal(card.penaltyRange.max,max,name+' max');
 assert.equal(card.penaltyRange.fines,fine,name+' fines');
 assert.equal(card.penaltyGradeReviewDate,'2026-10-18',name+' dated source comparison');
}
assert.ok(by('Vårdslös beskyllning').penaltyGradeReviewCaveat.includes('skälig anledning'));
assert.ok(by('Falsk angivelse').penaltyGradeReviewCaveat.includes('oskyldig'));

assert.equal(by('Människorov').penaltyRange.min,4);
assert.equal(by('Människorov').penaltyRange.max,18);
assert.equal(by('Människorov').penaltyRange.life,true);
assert.equal(by('Människohandel').penaltyRange.min,2);
assert.equal(by('Människoexploatering').penaltyRange.max,4);
assert.equal(by('Grov människoexploatering').penaltyRange.min,2);
assert.equal(by('Olaga tvång').penaltyRange.fines,true);
assert.equal(by('Grovt olaga tvång').penaltyRange.min,1);
assert.equal(by('Uppmaning till självmord').penaltyRange.max,2);
assert.equal(by('Oaktsam uppmaning till självmord').penaltyRange.fines,true);
assert.equal(by('Psykiskt våld').penaltyRange.max,4);
assert.ok(by('Människohandel').penaltyGradeReviewCaveat.includes('barnundantag'));
assert.ok(by('Olaga tvång').penaltyGradeReviewCaveat.includes('4:11'));

assert.equal(by('Olaga frihetsberövande').penaltyRange.min,1);
assert.equal(by('Olaga frihetsberövande').penaltyRange.max,10);
assert.equal(by('Kränkande fotografering').penaltyRange.fines,true);
assert.equal(by('Olovlig identitetsanvändning').penaltyRange.max,2);
assert.equal(by('Olaga integritetsintrång').penaltyRange.fines,true);
assert.equal(by('Grovt olaga integritetsintrång').penaltyRange.min,0.5);
assert.equal(by('Brytande av post- eller telehemlighet').penaltyRange.max,2);
assert.equal(by('Intrång i förvar').penaltyRange.fines,true);
assert.equal(by('Olovlig avlyssning').penaltyRange.max,2);
assert.equal(by('Dataintrång').penaltyRange.max,2);
assert.equal(by('Grovt dataintrång').penaltyRange.min,1);
assert.equal(by('Grovt dataintrång').penaltyRange.max,8);
assert.ok(by('Kränkande fotografering').penaltyGradeReviewCaveat.includes('myndighetsundantaget'));
assert.ok(by('Olovlig avlyssning').penaltyGradeReviewCaveat.includes('platsvillkoret'));

assert.equal(by('Åverkan').penaltyRange.fines,true);
assert.equal(by('Åverkan').penaltyRange.max,0);
assert.equal(by('Tagande av olovlig väg').penaltyRange.max,0.5);
assert.equal(by('Tagande av olovlig väg').penaltyRange.fines,true);
assert.ok(by('Åverkan').penaltyGradeReviewCaveat.includes('12:6'));
assert.ok(by('Tagande av olovlig väg').penaltyGradeReviewCaveat.includes('enskilds rätt'));
assert.equal(by('Oredlighet mot borgenärer').penaltyRange.max,2);
assert.equal(by('Grov oredlighet mot borgenärer').penaltyRange.min,1);
assert.equal(by('Försvårande av konkurs eller exekutiv förrättning').penaltyRange.max,2);
assert.equal(by('Grovt försvårande av konkurs eller exekutiv förrättning').penaltyRange.min,1);
assert.equal(by('Vårdslöshet mot borgenärer').penaltyRange.max,2);
assert.equal(by('Otillbörligt gynnande av borgenär').penaltyRange.max,2);
assert.equal(by('Bokföringsbrott').penaltyRange.max,2);
assert.equal(by('Ringa bokföringsbrott').penaltyRange.fines,true);
assert.equal(by('Grovt bokföringsbrott').penaltyRange.min,0.5);
assert.ok(by('Grovt försvårande av konkurs eller exekutiv förrättning').penaltyGradeReviewCaveat.includes('uppsåt'));
assert.ok(by('Ringa bokföringsbrott').penaltyGradeReviewCaveat.includes('särskilda skäl'));

assert.equal(by('Egenmäktigt förfarande').penaltyRange.max,1);
assert.equal(by('Grovt egenmäktigt förfarande').penaltyRange.min,0.5);
assert.equal(by('Självtäkt').penaltyRange.fines,true);
assert.equal(by('Olovlig energiavledning').penaltyRange.fines,true);
assert.equal(by('Grov olovlig energiavledning').penaltyRange.max,4);
assert.equal(by('Grovt fordringsbedrägeri').penaltyRange.min,1);
assert.equal(by('Olovlig befattning med betalningsverktyg').penaltyRange.fines,true);
assert.equal(by('Grov olovlig befattning med betalningsverktyg').penaltyRange.min,1);
assert.equal(by('Företagskapning').penaltyRange.fines,true);
assert.equal(by('Utpressning').penaltyRange.max,3);
assert.equal(by('Ringa utpressning').penaltyRange.max,0.5);
assert.equal(by('Grov utpressning').penaltyRange.min,2);
assert.equal(by('Ocker').penaltyRange.fines,true);
assert.equal(by('Grovt ocker').penaltyRange.min,1);
assert.equal(by('Häleri').penaltyRange.max,2);
assert.equal(by('Grovt häleri').penaltyRange.min,1);
assert.equal(by('Utförselhäleri').penaltyRange.max,2);
assert.equal(by('Grovt utförselhäleri').penaltyRange.min,1);
assert.equal(by('Häleriförseelse').penaltyRange.fines,true);
assert.ok(by('Häleriförseelse').penaltyGradeReviewCaveat.includes('skälig anledning'));
assert.ok(by('Självtäkt').penaltyGradeReviewCaveat.includes('själv ta sig rätt'));
assert.ok(by('Grov utpressning').penaltyGradeReviewCaveat.includes('våldskapital'));

assert.equal(by('Förskingring').penaltyRange.max,2);
assert.equal(by('Ringa förskingring').penaltyRange.fines,true);
assert.equal(by('Grov förskingring').penaltyRange.min,1);
assert.equal(by('Olovligt förfogande').penaltyRange.max,1);
assert.equal(by('Grovt olovligt förfogande').penaltyRange.min,0.5);
assert.equal(by('Trolöshet mot huvudman').penaltyRange.fines,true);
assert.equal(by('Grov trolöshet mot huvudman').penaltyRange.min,1);
assert.equal(by('Tagande av muta').penaltyRange.fines,false);
assert.equal(by('Givande av muta').penaltyRange.max,2);
assert.equal(by('Grovt tagande av muta').penaltyRange.min,1.5);
assert.equal(by('Grovt givande av muta').penaltyRange.min,1.5);
assert.equal(by('Handel med inflytande').penaltyRange.max,2);
assert.equal(by('Vårdslös finansiering av mutbrott').penaltyRange.fines,true);
assert.ok(by('Vårdslös finansiering av mutbrott').penaltyGradeReviewCaveat.includes('Grov oaktsamhet'));
assert.ok(by('Trolöshet mot huvudman').penaltyGradeReviewCaveat.includes('subsidiaritet'));

assert.equal(by('Förtal').penaltyRange.max,0,'Ordinary defamation carries fines only');
assert.equal(by('Grovt förtal').penaltyRange.fines,true,'Gross defamation allows fine');
assert.equal(by('Förolämpning').penaltyRange.max,0.5);
assert.equal(by('Urkundsförfalskning').penaltyRange.max,2);
assert.equal(by('Förvanskning av urkund').penaltyRange.fines,true);
assert.equal(by('Grov urkundsförfalskning').penaltyRange.min,1);
assert.equal(by('Märkesförfalskning').penaltyRange.max,2);
assert.equal(by('Ringa märkesförfalskning').penaltyRange.max,0.5);
assert.equal(by('Grov märkesförfalskning').penaltyRange.min,0.5);
assert.equal(by('Mened').penaltyRange.min,0.5);
assert.equal(by('Grov mened').penaltyRange.min,2);
assert.equal(by('Osann partsutsaga').penaltyRange.max,2);
assert.equal(by('Ovarsam utsaga').penaltyRange.fines,true);
assert.ok(by('Mened').penaltyGradeReviewCaveat.includes('mindre allvarligt'),'Do not conflate lesser mened grade with ordinary');
assert.ok(by('Ovarsam utsaga').penaltyGradeReviewCaveat.includes('Grov oaktsamhet'));
assert.ok(by('Grovt förtal').penaltyGradeReviewCaveat.includes('5:5'));

assert.equal(by('Vållande till annans död').penaltyRange.max,3);
assert.equal(by('Grovt vållande till annans död').penaltyRange.min,2);
assert.equal(by('Vållande till kroppsskada eller sjukdom').penaltyRange.max,0.5);
assert.equal(by('Grovt vållande till kroppsskada eller sjukdom').penaltyRange.max,4);
assert.equal(by('Framkallande av fara för annan').penaltyRange.max,3);
assert.ok(by('Framkallande av fara för annan').penaltyGradeReviewCaveat.includes('grov oaktsamhet'));

assert.equal(by('Inbrottsstöld').penaltyRange.min,1);
assert.equal(by('Grovt missbruk av offentlig ställning').penaltyRange.max,6);
assert.equal(base.filter(c=>c.statute?.startsWith('BrB:')).length,319);
assert.equal(c.filter(x=>x.stageType&&x.stageStatus==='unverified').length,12,'No implicit inchoate review via base penalty scales');
console.log('PASS V1.5: 247 current-grade BrB penalty scales source-verified; no silent conflicts or overbroad approvals');
