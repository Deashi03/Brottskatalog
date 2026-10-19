import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const mod='./brb10-prosecution-review-15.js';
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod),'BrB 10:10 / 20:5 must work offline');
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./prosecution-review-15.js'));
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./quality-11.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const report=ctx.window.BK_BRB10_PROSECUTION15;
assert.ok(report);
assert.equal(report.planned,4);
assert.equal(report.reviewed,4,'All four BrB 10:10 bribery offences must get source-aware conditional rules');
assert.equal(report.held.length,0,JSON.stringify(report.held));
assert.equal(report.missing.length,0,JSON.stringify(report.missing));
const b=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const cases=[
 ['Tagande av muta','BrB:10:5a'],
 ['Givande av muta','BrB:10:5b'],
 ['Handel med inflytande','BrB:10:5d'],
 ['Vårdslös finansiering av mutbrott','BrB:10:5e']
];
for(const [title,ref] of cases){
 const c=b.find(c=>c.title===title);
 assert.ok(c);
 assert.equal(c.statute,ref);
 assert.equal(c.prosecution,'conditional','Never silently mark ordinary bribery prosecution unconditional');
 assert.ok(c.prosecutionRule.includes('BrB 10:10')&&c.prosecutionRule.includes('BrB 20:5'));
 assert.ok(c.prosecutionDetails.some(s=>s.includes('allmän synpunkt')));
 assert.ok(c.prosecutionDetails.some(s=>s.includes('offentliga')||s.includes('offentliga anställda')));
 assert.equal(c.prosecutionChecked,'2026-10-17');
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
const source10=ctx.window.BK_STATUTES['BrB:10:10'];
const source20=ctx.window.BK_STATUTES['BrB:20:5'];
assert.equal(source10.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
assert.equal(source20.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
assert.ok(source10.text.includes('dock inte grov förskingring och grov trolöshet'));
assert.ok(source10.text.includes('åtal av särskilda skäl'));
assert.ok(source20.text.includes('regeringen'));
for(const title of ['Grovt tagande av muta','Grovt givande av muta']){
 const c=b.find(c=>c.title===title);
 if(c)assert.notEqual(c.prosecutionReviewStatus,'section10:10-20:5-individual-statute-conditional',
  'Do not infer statutory scope of aggravated bribery solely from ordinary title');
}
// Source mismatch must never overwrite a pre-existing conservative status.
const fake=cases.map(([title,ref])=>({title,statute:ref,prosecution:'unknown'}));
const w={BK_DATA:{crimes:fake},BK_STATUTES:{
 'BrB:10:10':{complete:false,text:'incomplete 10:10',checked:'2026-10-17'},
 'BrB:20:5':{complete:false,text:'incomplete 20:5',checked:'2026-10-17'}
}};
vm.runInNewContext(fs.readFileSync(path.join(root,mod),'utf8'),{window:w,console},{filename:mod});
assert.equal(w.BK_BRB10_PROSECUTION15.reviewed,0);
assert.equal(w.BK_BRB10_PROSECUTION15.held.length,4);
assert.ok(fake.every(c=>c.prosecution==='unknown'));
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,0);
const penaltyTitles=["Förskingring","Ringa förskingring","Grov förskingring","Olovligt förfogande","Grovt olovligt förfogande","Trolöshet mot huvudman","Grov trolöshet mot huvudman","Tagande av muta","Givande av muta","Grovt tagande av muta","Grovt givande av muta","Handel med inflytande","Vårdslös finansiering av mutbrott"];
console.log('V1.5 BRB10 PENALTY TRIAGE '+JSON.stringify(penaltyTitles.map(title=>{
 const c=b.find(c=>c.title===title);
 return {title,statute:c?.statute,range:c?.penaltyRange||null,verified:c?.penaltyRangeVerified||false,scope:c?.penaltyReviewScope||null};
})));
console.log('PASS V1.5: BrB 10:10/20:5 prosecution cases, conditional public interest, public service exceptions, source holds and untouched gross grades');
