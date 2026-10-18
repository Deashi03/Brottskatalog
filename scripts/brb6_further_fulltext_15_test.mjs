import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod="./brb6-further-fulltext-15.js";assert.ok(files.includes(mod)&&sw.includes(mod));assert.ok(files.indexOf(mod)>files.indexOf("./brb-truncated-source-repairs-15.js")&&files.indexOf(mod)<files.indexOf("./stages-08.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const src of files)vm.runInContext(fs.readFileSync(path.join(root,src),"utf8"),ctx,{filename:src});
const audit=ctx.window.BK_BRB6_FURTHER_SOURCE15,law=ctx.window.BK_STATUTES,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(audit&&audit.sectionsChecked===13&&audit.held.length===0,JSON.stringify(audit));assert.ok(ctx.window.BK_CURATED_LAWTEXT15.sectionsChecked>=205);
for(const key of ["BrB:6:1","BrB:6:1a","BrB:6:2","BrB:6:3","BrB:6:4","BrB:6:5","BrB:6:8","BrB:6:9","BrB:6:10","BrB:6:11","BrB:6:13","BrB:6:14","BrB:6:15"]){const w=law[key];assert.equal(w.complete,true);assert.equal(w.machine,false);assert.equal(w.checked,"2026-10-18");assert.equal(w.completeTextProvenance,"manual-crosscheck-current-SFS-paragraph-only");for(const c of base.filter(c=>c.statute===key)){assert.equal(c.law,w.text);assert.equal(c.lawCompletenessVerified,true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}}
assert.ok(law["BrB:6:14"].text.includes("ringa skillnaden i ålder"));assert.ok(law["BrB:6:15"].text.includes("stämpling"));
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==="unverified").length,12);
console.log("PASS V1.5: 13 further complete BrB 6 provisions crosschecked and indexed; no automatic criminalization or coercion approval");
