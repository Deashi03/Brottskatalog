import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);const mod="./brb15-complete-fulltext-15.js";
assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf("./brb13-fulltext-15.js")&&scripts.indexOf(mod)<scripts.indexOf("./stages-08.js"));
const inlines=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inlines[i],ctx);for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),"utf8"),ctx,{filename:src});
const A=ctx.window.BK_BRB15_COMPLETE_SOURCE15,P=ctx.window.BK_CURATED_LAWTEXT15,W=ctx.window.BK_STATUTES,base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),brb=base.filter(c=>c.statute?.startsWith("BrB:"));
assert.ok(A&&A.sectionsChecked===2&&A.held.length===0&&A.linkedCardsChecked===4,JSON.stringify(A));assert.equal(P.sectionsChecked,265);
assert.equal(brb.length,319);assert.equal(brb.filter(c=>c.lawMode==="full"&&c.lawCompletenessVerified&&c.lawCompletenessSourceURL?.includes("riksdagen.se")).length,319);
for(const k of ["BrB:15:4a","BrB:15:4b"]){const w=W[k];assert.equal(w.complete,true);assert.equal(w.machine,false);assert.equal(w.checked,"2026-10-18");assert.equal(w.completeTextProvenance,"manual-crosscheck-current-SFS-paragraph-only");for(const c of brb.filter(x=>x.statute===k)){assert.equal(c.law,w.text);assert.equal(c.lawCompletenessVerified,true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}}
assert.equal(brb.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==="unverified").length,12);
console.log("PASS V1.5: BrB source-text coverage 319/319; never confuse complete text with individual legal certification");
