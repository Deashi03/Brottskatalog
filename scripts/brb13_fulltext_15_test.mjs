import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod="./brb13-fulltext-15.js";assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf("./brb20-22-fulltext-15.js")&&scripts.indexOf(mod)<scripts.indexOf("./stages-08.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),"utf8"),ctx,{filename:src});
const A=ctx.window.BK_BRB13_FULLTEXT15,P=ctx.window.BK_CURATED_LAWTEXT15,W=ctx.window.BK_STATUTES,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(A&&A.sectionsChecked===13&&A.held.length===0,JSON.stringify(A));assert.ok(P.sectionsChecked>=263);
for(const k of ["BrB:13:1","BrB:13:2","BrB:13:3","BrB:13:4","BrB:13:5","BrB:13:5a","BrB:13:5b","BrB:13:6","BrB:13:7","BrB:13:8","BrB:13:9","BrB:13:10","BrB:13:11"]){const s=W[k];assert.equal(s.complete,true);assert.equal(s.checked,"2026-10-18");for(const c of base.filter(x=>x.statute===k)){assert.equal(c.law,s.text);assert.equal(c.lawCompletenessVerified,true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}}
assert.ok(W["BrB:13:11"].text.includes("frivilligt"));assert.ok(W["BrB:13:5c"].complete,"existing 5 c remains source certified");assert.ok(W["BrB:13:12"].complete,"stage authorization source retained");assert.equal(ctx.window.BK_DATA.crimes.filter(x=>x.stageStatus==="unverified").length,0);
console.log("PASS V1.5: 13 additional current BrB 13 paragraphs verified with no stage coercion inference");
