import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,"..");const html=fs.readFileSync(path.join(root,"index.html"),"utf8");const sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);const module="./brb-truncated-source-repairs-15.js";
assert.ok(scripts.includes(module)&&sw.includes(module));assert.ok(scripts.indexOf(module)<scripts.indexOf("./stages-08.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),"utf8"),ctx,{filename:src});
const out=ctx.window.BK_BRB_TRUNCATION_REPAIRS15,statutes=ctx.window.BK_STATUTES;
assert.equal(out.sectionsChecked,4,JSON.stringify(out));assert.equal(out.held.length,0);
assert.ok(ctx.window.BK_CURATED_LAWTEXT15.sectionsChecked>=192);
for(const key of ["BrB:6:6","BrB:6:10a","BrB:6:12","BrB:19:9"]){const item=statutes[key];assert.equal(item.complete,true);assert.equal(item.checked,"2026-10-18");assert.equal(item.completeTextProvenance,"manual-crosscheck-current-SFS-paragraph-only");assert.ok(item.text.length>200);for(const c of ctx.window.BK_DATA.crimes.filter(x=>!x.stageType&&x.statute===key)){assert.equal(c.law,item.text);assert.equal(c.lawCompletenessVerified,true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}}
assert.ok(statutes["BrB:6:6"].text.includes("Lag (2025:586)."));assert.ok(statutes["BrB:6:10a"].text.includes("8 eller 10 §"));
assert.ok(statutes["BrB:6:12"].text.includes("9 eller 11 §"));assert.ok(statutes["BrB:19:9"].text.includes("Sverige var i krig"));
assert.equal(ctx.window.BK_DATA.crimes.filter(x=>x.stageStatus==="unverified").length,15);console.log("PASS V1.5: four formerly truncated SFS paragraphs fully restored; legal stages remain held");
