// Read-only stage audit targeting by individual BrB chapter and provision.
// Deliberately makes no legal approval or automatic penalty decisions.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of srcs)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const D=ctx.window.BK_DATA,W=ctx.window.BK_STATUTES,parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const groups=new Map();
for(const c of D.crimes.filter(x=>x.stageType&&x.statute?.startsWith('BrB:'))){
 const p=parents.get(c.stageParentId),ch=Number(c.statute.match(/^BrB:(\d+):/)?.[1]);
 const k=String(ch),g=groups.get(k)||{chapter:ch,total:0,negative:0,positive:0,unverified:0,unreviewedNegative:[],unreviewedPositive:[],checkedParentStatutes:[],specialStageLaw:null};
 g.total++;if(c.stageStatus==='not-criminalized')g.negative++;else if(c.stageStatus==='punishable')g.positive++;else g.unverified++;
 if(!c.individualLegalAudit15?.scope?.status&&c.stageStatus==='not-criminalized')g.unreviewedNegative.push({title:p?.title,stage:c.stageType,statute:p?.statute,source:c.stageSource,parentId:p?.id,sourceDate:c.stageReviewDate});
 if(!c.individualLegalAudit15?.scope?.status&&c.stageStatus==='punishable')g.unreviewedPositive.push({title:p?.title,stage:c.stageType,statute:p?.statute,source:c.stageSource,parentId:p?.id,sourceDate:c.stageReviewDate});
 groups.set(k,g);
}
const by=[...groups.values()].sort((a,b)=>a.chapter-b.chapter).map(g=>({...g,unreviewedNegativeCount:g.unreviewedNegative.length,unreviewedPositiveCount:g.unreviewedPositive.length}));
console.log('V1.5 BRB STAGE CHAPTERS '+JSON.stringify(by.map(({chapter,total,negative,positive,unverified,unreviewedNegativeCount,unreviewedPositiveCount})=>({chapter,total,negative,positive,unverified,unreviewedNegativeCount,unreviewedPositiveCount}))));
for(const g of by)console.log('V1.5 BRB STAGE DETAILS '+g.chapter+' '+JSON.stringify({neg:g.unreviewedNegative,pos:g.unreviewedPositive}).slice(0,12000));
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-brb-stage-queue.json'),JSON.stringify({by},null,2)+'\n');
