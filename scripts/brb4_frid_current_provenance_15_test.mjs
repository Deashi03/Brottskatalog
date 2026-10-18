import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod="./brb4-frid-current-provenance-15.js";assert.ok(files.includes(mod)&&sw.includes(mod));
assert.ok(files.indexOf(mod)>files.indexOf("./brb15-complete-fulltext-15.js")&&files.indexOf(mod)<files.indexOf("./brb-penalty-grade-audit-15.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),"utf8"),ctx,{filename:file});
const a=ctx.window.BK_FRID_CURRENT_PROVENANCE15,p=ctx.window.BK_CURATED_LAWTEXT15,base=ctx.window.BK_DATA.crimes.filter(x=>!x.stageType),brb=base.filter(x=>x.statute?.startsWith("BrB:"));
assert.ok(a&&a.sectionsChecked===2&&a.linkedCardsChecked===3&&a.held.length===0,JSON.stringify(a));assert.equal(p.sectionsChecked,267);
assert.equal(brb.filter(x=>x.lawCompletenessVerified&&x.lawCompletenessReviewScope==="current-paragraph-only").length,319);
assert.equal(brb.filter(x=>x.rekvisit15?.legalReviewApproved===true).length,0);
for(const key of ["BrB:4:4a","BrB:4:4e"]){const s=ctx.window.BK_STATUTES[key];assert.equal(s.checked,"2026-10-18");assert.equal(s.completeTextProvenance,"manual-crosscheck-current-SFS-paragraph-only");assert.ok(s.text.includes("Lag (2026:852)."));}
console.log("PASS V1.5: all 319 BrB cards with direct source-crosschecked complete statutory text; legal certification remains pending");
