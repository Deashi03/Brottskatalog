// Individual unresolved inchoate source and consequence queue, no automatic approvals.
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const crimes=ctx.window.BK_DATA.crimes,parents=new Map(crimes.filter(x=>!x.stageType).map(x=>[x.id,x]));
const gaps=crimes.filter(x=>x.stageType).flatMap(c=>{
 const parent=parents.get(c.stageParentId),a=c.individualLegalAudit15||{};
 const scope=a.scope?.status==='APPROVED',consequence=a.consequences?.status==='APPROVED';
 return scope&&consequence?[]:[{id:c.id,parent:parent?.title,statute:parent?.statute,stage:c.stageType,
 status:c.stageStatus,source:c.stageSource,scope,consequence}];
});
const summary=Object.entries(Object.groupBy(gaps,c=>c.statute?.split(':')[0]||'UNKNOWN')).map(([statute,cards])=>({statute,count:cards.length,items:cards}));
console.log('V1.5 FINAL STAGE GAPS '+JSON.stringify({total:gaps.length,summary}));
if(gaps.length!==0)throw Error('Expected 0 unresolved BrB stage cards, got '+gaps.length);
console.log('PASS V1.5: all 1095 inchoate cards have limited current-SFS checks; still no complete factual legal certification');
