import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),pathJs="./brb17-18-fulltext-15.js";
assert.ok(scripts.includes(pathJs)&&sw.includes(pathJs));assert.ok(scripts.indexOf(pathJs)>scripts.indexOf("./brb16-fulltext-15.js")&&scripts.indexOf(pathJs)<scripts.indexOf("./stages-08.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const pathJs of scripts)vm.runInContext(fs.readFileSync(path.join(root,pathJs),"utf8"),ctx,{filename:pathJs});
const report=ctx.window.BK_BRB1718_FULLTEXT15,src=ctx.window.BK_CURATED_LAWTEXT15,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(report&&report.sectionsChecked===18&&report.missing.length===0&&report.mismatch.length===0,JSON.stringify(report));
assert.equal(src.sectionsChecked,188);
for(const k of ["BrB:17:5","BrB:17:6","BrB:17:8","BrB:17:9","BrB:17:11","BrB:17:12","BrB:17:12a","BrB:17:13","BrB:17:15","BrB:17:16","BrB:18:1","BrB:18:2","BrB:18:3","BrB:18:4","BrB:18:5","BrB:18:6","BrB:18:7","BrB:18:8"]){const W=ctx.window.BK_STATUTES[k];assert.ok(W?.complete&&W?.checked==="2026-10-18"&&W?.completeTextProvenance==="manual-crosscheck-current-SFS-paragraph-only");for(const c of base.filter(x=>x.statute===k)){assert.equal(c.law,W.text);assert.equal(c.lawCompletenessVerified,true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}}
assert.equal(base.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==="unverified").length,12);
console.log("PASS V1.5: 18 additional current statutory paragraphs in BrB 17/18; complete legal review still pending");
