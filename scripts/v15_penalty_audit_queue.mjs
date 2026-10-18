// V1.5: detailed penalty review queue. Read-only: no automatically approved ranges or custody powers.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),src=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const name of src)vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx,{filename:name});
const base=ctx.window.BK_DATA.crimes.filter(x=>!x.stageType);
const w=ctx.window.BK_STATUTES||{};
const incomplete=base.filter(x=>(x.penaltyReviewScope==='range-only'||!x.penaltyRangeVerified)&&!x.conditionalPenalty);
const conditional=base.filter(x=>x.conditionalPenalty&&!x.penaltyRangeVerified);
const police=new Set(['Mord','Dråp','Misshandel','Ringa misshandel','Grov misshandel','Synnerligen grov misshandel','Våldtäkt','Grov våldtäkt','Våldtäkt mot barn','Grov våldtäkt mot barn','Olaga hot','Grovt olaga hot','Olaga tvång','Hemfridsbrott','Rån','Grovt rån','Stöld','Grov stöld','Ringa stöld','Bedrägeri','Grovt bedrägeri','Skadegörelse','Grov skadegörelse','Barnfridsbrott','Grovt barnfridsbrott','Tjänstefel','Grovt tjänstefel','Narkotikabrott']);
const entry=(c,kind)=>{const item=w[c.statute]||{};return {
 id:c.id,title:c.title,ref:c.shortRef||null,statute:c.statute||null,
 category:c.category||null,kind,priority:police.has(c.title)?'polisiar':'chapter-order',
 knownRange:c.penaltyRange||null,displayedPenalty:c.penalty||null,penaltyShort:c.penaltyShort||null,
 conditionDetails:c.conditionalPenalty||null,
 currentStatuteTextVerified:Boolean(c.lawCompletenessVerified),
 statuteSource:item.url||c.sourceURL||null,statuteDate:item.checked||c.lawCompletenessChecked||null,
 legalReviewApproved:c.rekvisit15?.legalReviewApproved===true,
 provisionalRangeOnly:c.penaltyReviewScope==='range-only',penaltyReviewScope:c.penaltyReviewScope||null,
 checks:['Fulltext mot aktuell officiell SFS','Tillämplig brottsgrad och särskilda straffskalefall','Böter och livstidsfängelse separat','Uttryckliga undantag och subsidiaritet','Gärningsdatum, ikraftträdande och övergångsbestämmelser','Förstadier med eget särskilt lagstöd','Åtal och tvångsmedel granskas separat'],
 status:'PENDING_INDIVIDUAL_SOURCE_COMPARISON',automaticApproval:false
}};
const numeric=incomplete.map(c=>entry(c,'basic-penalty')),special=conditional.map(c=>entry(c,'conditional-special-range'));
const parseCh=x=>Number(String(x.statute||'').match(/BrB:(\d+):/)?.[1]||999);
const sort=(a,b)=>(a.priority==='polisiar'?0:1)-(b.priority==='polisiar'?0:1)||parseCh(a)-parseCh(b)||String(a.title).localeCompare(String(b.title),'sv');
numeric.sort(sort);special.sort(sort);
const counts={basic:numeric.length,conditional:special.length,total:numeric.length+special.length,sourceTextVerified:numeric.filter(c=>c.currentStatuteTextVerified).length,criticalConflicts:numeric.filter(c=>c.legalReviewApproved).length};
const out={date:new Date().toISOString(),version:'V1.5',releaseReady:false,method:'Human legal audit required, never automatic coercion approval',counts,base:numeric,conditional:special};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-penalty-review-queue.json'),JSON.stringify(out,null,2)+'\n');
console.log('V1.5 PENALTY AUDIT QUEUE '+JSON.stringify({counts,policeFirst:numeric.filter(c=>c.priority==='polisiar').slice(0,30).map(c=>({title:c.title,ref:c.ref,range:c.knownRange})),firstTwenty:numeric.slice(0,20).map(c=>({title:c.title,ref:c.ref,range:c.knownRange}))}));
if(counts.basic!==159||counts.conditional!==12)throw Error('Unexpected penalty review queue totals: '+JSON.stringify(counts));
if(numeric.some(c=>c.automaticApproval||c.legalReviewApproved))throw Error('Unapproved penalty ranges were incorrectly marked as approved');
