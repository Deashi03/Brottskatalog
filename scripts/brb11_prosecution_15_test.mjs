import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const mod='./brb11-prosecution-review-15.js';
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod),'BrB 11:8 must be available offline');
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./brb8-near-relative-prosecution-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline'+i});
for(const s of scripts)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
const D=ctx.window.BK_DATA,W=ctx.window.BK_STATUTES,report=ctx.window.BK_BRB11_PROSECUTION15;
assert.ok(report?.sourceVerified,'BrB 11:8 requires a fully source-reviewed current paragraph');
const base=D.crimes.filter(c=>!c.stageType);
const cand=base.filter(c=>c.statute==='BrB:11:3'||c.statute==='BrB:11:5');
assert.ok(cand.length>=3,'Chapter 11 liability grades should be indexed');
assert.equal(report.held.length,0,'No special prosecution approval with unchecked source');
const care=base.find(c=>c.title==='Vårdslöshet mot borgenärer');
assert.ok(care&&care.statute==='BrB:11:3');
assert.equal(care.prosecution,'conditional');
assert.equal(care.prosecutionReviewStatus,'current-section11:8-individual-source-conditional');
assert.ok(care.prosecutionDetails.some(t=>t.includes('allmän synpunkt')));
const ringa=base.find(c=>c.statute==='BrB:11:5'&&/\bringa\b/i.test(c.title));
assert.ok(ringa,'Must have indexed ringa bokföringsbrott');
assert.equal(ringa.prosecution,'conditional');
assert.ok(ringa.prosecutionDetails.some(t=>t.includes('särskilda skäl')));
assert.equal(ringa.prosecutionReviewStatus,'current-section11:8-individual-source-conditional');
for(const p of base.filter(c=>c.statute==='BrB:11:5'&&!/\bringa\b/i.test(c.title))){
 assert.notEqual(p.prosecutionReviewStatus,'current-section11:8-individual-source-conditional',
  'Normal or gross bokföringsbrott must not inherit special ringa prosecution limitation');
}
assert.equal(report.reviewed,2,'Exactly two source-checked chapter11 special prosecution cards');
assert.ok(report.normalGradesKept>=2,'Keep normal and gross bookkeeping prosecutions separate');
const source=W['BrB:11:8'];
assert.equal(source.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
assert.ok(source.text.includes('endast om åtal av särskilda skäl'));
const fake=[{title:'Vårdslöshet mot borgenärer',statute:'BrB:11:3',prosecution:'unknown'},
 {title:'Ringa bokföringsbrott',statute:'BrB:11:5',prosecution:'unknown'}];
const x={BK_DATA:{crimes:fake},BK_STATUTES:{'BrB:11:8':{complete:false,text:'outdated'},'BrB:11:3':{},'BrB:11:5':{}}};
vm.runInNewContext(fs.readFileSync(path.join(root,mod),'utf8'),{window:x,console},{filename:mod});
assert.equal(x.BK_BRB11_PROSECUTION15.reviewed,0);
assert.equal(x.BK_BRB11_PROSECUTION15.held.length,2);
assert.ok(fake.every(c=>c.prosecution==='unknown'),'No false prosecution approval on source drift');
assert.equal(D.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,0);
console.log('V1.5 BRB11 SOURCE PENALTY TRIAGE '+JSON.stringify(base.filter(c=>/^BrB:11:/.test(c.statute||'')).map(c=>({title:c.title,statute:c.statute,penaltyRange:c.penaltyRange,scope:c.penaltyReviewScope,verified:c.penaltyRangeVerified}))));
console.log('PASS V1.5: BrB 11:8 source-bound exceptions distinguish carelessness, ringa bookkeeping, other grades, and stage holds');
