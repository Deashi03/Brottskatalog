// V1.5 – stage evidence gaps; read-only, fails closed without source/date.
// This does not certify criminalization, punishment, prosecution or coercion.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const p of scripts)vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const all=ctx.window.BK_DATA.crimes,base=new Map(all.filter(c=>!c.stageType).map(c=>[c.id,c]));
const stages=all.filter(c=>c.stageType);
const validDate=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\d$/.test(x);
const gaps=stages.filter(c=>c.stageStatus==='unverified'||!c.stageSource||!validDate(c.stageReviewDate));
const g=gaps.map(c=>{const p=base.get(c.stageParentId);return {id:c.id,title:c.title,stageType:c.stageType,status:c.stageStatus,
  parent:p?.title,statute:p?.statute,source:c.stageSource,reviewDate:c.stageReviewDate,
  reviewed:Boolean(p?.stageReviewed),category:p?.category,
  isException:Boolean(c.stageEvidence15?.preliminaryAssessment),
  reason:c.stageReviewBasis||c.stageExplanation||null}});
const byStatute=g.reduce((a,c)=>{const key=String(c.statute||'UNKNOWN').replace(/:\d+(:.*)?$/,'');(a[key]??=[]).push(c);return a;},{});
const byStatus=g.reduce((a,c)=>(a[c.status]=(a[c.status]||0)+1,a),{});
const report={date:'2026-10-18',gaps:g.length,byStatus,
 byStatute:Object.fromEntries(Object.entries(byStatute).map(([k,v])=>[k,{count:v.length,titles:v.map(x=>x.title)}])),
 items:g,sourceStatus:'NOT_A_LEGAL_APPROVAL'};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-stage-evidence-gaps.json'),JSON.stringify(report,null,2)+'\n');
console.log('V1.5 STAGE EVIDENCE GAPS '+JSON.stringify({total:g.length,byStatus,byStatute:report.byStatute}));
if(stages.length!==1086||g.length!==18||g.filter(x=>x.status==='unverified').length!==12)
 throw Error('Stage review baseline mismatch '+JSON.stringify({total:stages.length,gaps:g.length,byStatus}));
console.log('PASS: independent source/date inventory with no implied inchoate signoff');
