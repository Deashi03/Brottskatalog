// Systematic full-catalog quality audit. Every stored entry, including unverified stages, is inspected.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const refs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const warnings=[];
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:(...a)=>warnings.push(a.join(' ')),error:(...a)=>warnings.push(a.join(' '))}});
const issues=[];const flag=(id,severity,category,message)=>issues.push({id,severity,category,message});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const ref of refs){
 const p=path.join(root,ref);
 if(!fs.existsSync(p)){flag(ref,'critical','missing-dependency','Script absent in repo');continue;}
 try{vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:ref});}
 catch(e){flag(ref,'critical','script-load',String(e));}
}
try{new vm.Script(inline.at(-1),{filename:'application'});}
catch(e){flag('index.html','critical','syntax',e.message)}
const D=ctx.window.BK_DATA||{},all=D.crimes||[],base=all.filter(x=>!x.stageType),stages=all.filter(x=>x.stageType),ids=new Map(),titles=new Map();
const counts=(rows,cb)=>Object.fromEntries(Object.entries(rows.reduce((a,c)=>(a[cb(c)]=(a[cb(c)]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]));
for(const c of all){
 const id=c.id||'(missing id)';
 if(ids.has(id))flag(id,'critical','duplicate-id','Also '+ids.get(id)); else ids.set(id,c.title);
 const title=String(c.title||'').toLocaleLowerCase('sv');
 if(titles.has(title))flag(id,'high','duplicate-title','Also '+titles.get(title));else titles.set(title,id);
 if(!c.title||!c.ref||!c.shortRef)flag(id,'high','missing-core','Missing title, law ref or shortRef');
 if(!c.sourceURL&&!String(c.statute||'').startsWith('BrB:')&&!/BrB /.test(c.ref||''))flag(id,'high','missing-source-url','No statute URL for non-BrB offence');
 const p=c.penaltyRange;
 if(p&&(!Number.isFinite(p.min)||!Number.isFinite(p.max)||p.min<0||p.max<p.min))flag(id,'critical','invalid-penalty','Malformed penaltyRange');
 if(!c.stageType){
  if(!p&&!/kontroll|hänvisar|ändrad|Beror på/i.test(c.penalty||''))flag(id,'medium','unparsed-penalty','No structured penalty range');
  if(c.lawMode==='missing'||!c.law?.trim())flag(id,'medium','missing-offline-law','Full legal text unavailable in offline crime detail');
  if(c.lawMode==='machine')flag(id,'low','machine-law-excerpt','Statute excerpt machine imported, no independent proof of completeness');
  if(/\/(?:Träder i kraft|Upphör att gälla|Kapitlet träder i kraft|Kapitlet upphör att gälla|Rubriken träder i kraft|Rubriken upphör att gälla)/i.test(String(c.law||'')))flag(id,'medium','alternate-effective-law-text','Imported SFS contains applicability markers; examine offence date and active wording.');
  if(c.prosecution==='unknown'||!c.prosecution)flag(id,'medium','prosecution-unverified','Prosecution rule not final');
  if(!c.prosecutionRule)flag(id,'medium','prosecution-source-missing','No explicit statute authority for prosecution');
  if(!c.penaltyChecked)flag(id,'medium','penalty-not-reviewed','Penalty data has no verified check date');
  if(c.reviewStatus==='source-changed')flag(id,'high','source-changed','Known source change; fields cannot be considered verified');
  const meta=ctx.window.BK_QUALITY11?.metadata?.(c,new Date());
  if(meta?.futureReviewNote)flag(id,'high','future-review-date','Registered legal verification date lies in the future and cannot prove review');
  if(meta?.invalidReviewNote)flag(id,'high','invalid-review-date','Invalid legal verification date found');
 }else{
  if(!ids.has(c.stageParentId))flag(id,'critical','orphan-stage','Parent ID missing');
  if(c.stageStatus==='punishable'&&!c.penaltyRange)flag(id,'high','punishable-no-penalty','Punishable stage has no structured penalty');
  if(c.stageStatus!=='punishable'&&c.penaltyRange)flag(id,'critical','noncriminal-has-penalty','Stage without verified criminalization has penalty');
  if(!c.stageSource)flag(id,'medium','stage-source-missing','No linked stage-specific criminalization provision');
  if(c.stageStatus==='unverified')flag(id,'medium','stage-not-reviewed','Needs statute-specific status verification');
  if(c.stageStatus==='not-criminalized'&&!String(c.stageSource||'').match(/^(BrB|NSL|Narkotikastrafflagen|VapenL|PTBL|SmuglL|SkBrL|BidrBrL|LBE)/i))
    flag(id,'medium','noncriminal-source-weak','Noncriminal stage not tied to precise law');
  if(c.stageStatus==='punishable'&&c.stageType==='forsok'&&c.stageParentMin>=2&&c.penaltyRange?.min!==1/12)
    flag(id,'high','attempt-minimum','Attempt with fängelse ≥ 2y parent should carry 1mo floor');
 }
}
if(!ctx.window.BK_COERCIVE?.entries?.length)flag('RB','critical','measures','Coercive catalog unavailable');
const active=ctx.window.BK_COERCIVE?.entries?.filter(x=>!['hemlig','hemligo'].includes(x.id))||[];
for(const e of active){
 if(!e.decisionAuthority)flag(e.id,'medium','decision-source','No exact source for decision-maker');
 if(!e.ref?.match(/RB \d+:/))flag(e.id,'high','invalid-measure-ref','Bad reference');
 if(!ctx.window.BK_COERCIVE?.decisionGuide?.(e))flag(e.id,'high','decision-help','No authority guide');
}
// Source integrity/status and targeted semantic exceptions
const find=t=>all.find(c=>c.title?.toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
const cases=[
 ['Försök till mord','punishable'],
 ['Försök till ringa stöld','not-criminalized'],
 ['Försök till grov narkotikasmuggling','punishable'],
 ['Förberedelse till grovt skattebrott','punishable'],
 ['Försök till grovt skattebrott','not-criminalized'],
 ['Stämpling till ringa narkotikasmuggling','not-criminalized'],
 ['Förberedelse till ringa narkotikasmuggling','punishable']
];
for(const [t,expected] of cases)if(find(t)?.stageStatus!==expected)flag(t,'critical','stage-rule-mismatch','Expected '+expected+', actual '+find(t)?.stageStatus);
const sourceSections=Object.entries(ctx.window.BK_STATUTES||{});
const sourceMarkers=[];
for(const [ref,provision] of sourceSections){
  const text=String(provision?.text||'');
  const labels=[...text.matchAll(/\/(?:Rubriken |Kapitlet )?(?:Träder i kraft|Upphör att gälla)\s+[IU]:([^/]+)\//gi)].map(m=>m[1].trim());
  if(labels.length)sourceMarkers.push({ref,markers:[...new Set(labels)]});
}
const sourceAudit={
  importedSections:sourceSections.length,
  sectionsWithAlternativeOrFutureVersions:sourceMarkers.length,
  sectionsRequiringGovernmentCommencement:sourceMarkers.filter(x=>x.markers.some(y=>/regeringen/i.test(y))).length,
  affectedSections:sourceMarkers
};
const issueCounts=counts(issues,x=>x.category),severities=counts(issues,x=>x.severity);
const summary={
 generatedAt:new Date().toISOString(),release:D.release,total:all.length,base:base.length,stages:stages.length,
 prosecution:{base:counts(base,x=>x.prosecution||'none'),stages:counts(stages,x=>x.prosecution||'none')},
 stageStatus:counts(stages,x=>x.stageStatus),
 lawText:counts(base,x=>x.lawMode||'none'),
 reviewStatus:counts(base,x=>x.reviewStatus||'none'),
 penaltyStructured:base.filter(c=>c.penaltyRange&&Number.isFinite(c.penaltyRange.max)).length,
 byCategory:counts(base,x=>x.category||'none'),
 auditedMeasures:active.length,issuesByCategory:issueCounts,issuesBySeverity:severities,
 runtimeWarnings:warnings.length,
 sourceAudit,
 issues
};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit','quality-report.json'),JSON.stringify(summary,null,2)+'\n');
const headline=Object.entries(issueCounts).map(([k,n])=>k+':'+n).join(' · ');
console.log('FULL CATALOG AUDIT '+JSON.stringify({total:summary.total,base:summary.base,stages:summary.stages,prosecution:summary.prosecution,stageStatus:summary.stageStatus,lawText:summary.lawText,reviewStatus:summary.reviewStatus,structuredPenalty:summary.penaltyStructured,issueCounts,issueSeverities:severities,topIssues:issues.filter(x=>x.severity==='critical'||x.severity==='high').slice(0,60)},null,2));
console.log('REVIEW TASK CATEGORIES: '+headline);
console.log('STATUTE EDITION AUDIT '+JSON.stringify({importedSections:sourceAudit.importedSections,versions:sourceAudit.sectionsWithAlternativeOrFutureVersions,government:sourceAudit.sectionsRequiringGovernmentCommencement}));
console.log('UNVERIFIED STAGES: '+JSON.stringify(stages.filter(c=>c.stageStatus==='unverified').map(c=>({title:c.title,source:c.stageSource,parent:c.stageParentId}))));
console.log('UNKNOWN PROSECUTIONS: '+JSON.stringify(base.filter(c=>c.prosecution==='unknown').map(c=>({title:c.title,ref:c.shortRef,reviewStatus:c.reviewStatus}))));
console.log('STRAFFSKALOR SOM SAKNAR DOKUMENTERAD KONTROLL: '+JSON.stringify(base.filter(c=>!c.penaltyChecked).map(c=>({title:c.title,ref:c.shortRef,penalty:c.penaltyShort,source:c.penaltySource||null}))));
console.log('UNSTRUCTURED BASE PENALTIES: '+JSON.stringify(base.filter(c=>!c.penaltyRange).map(c=>({title:c.title,ref:c.shortRef,penalty:c.penaltyShort,reviewStatus:c.reviewStatus}))));

if(issues.some(x=>x.severity==='critical')){console.error('CRITICAL DATA QUALITY ISSUE PRESENT');process.exitCode=1;}
