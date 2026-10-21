import assert from "node:assert/strict";import fs from "node:fs";import vm from "node:vm";import path from "node:path";
const root=path.resolve(import.meta.dirname,".."),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const src=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);const mod="./special-penalty-grade-audit-15.js";
assert.ok(src.includes(mod)&&sw.includes(mod));assert.ok(src.indexOf(mod)>src.indexOf("./special-penalties-review-14.js"));assert.ok(src.indexOf(mod)<src.indexOf("./stages-08.js"));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);for(const script of src)vm.runInContext(fs.readFileSync(path.join(root,script),"utf8"),ctx,{filename:script});
const r=ctx.window.BK_SPECIAL_PENALTY_AUDIT15,crimes=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.ok(r&&r.planned===22&&r.reviewed===22&&r.held.length===0&&r.mismatch.length===0&&r.missing.length===0,JSON.stringify(r));
const reviewed=crimes.filter(c=>c.penaltyReviewScope==="individual-current-special-grade-range-only");assert.equal(reviewed.length,22);
for(const c of reviewed){assert.equal(c.penaltyGradeReviewDate,"2026-10-18");assert.equal(c.penaltyRangeVerified,true);assert.ok(c.penaltyGradeReviewSource.includes("riksdagen.se"));assert.ok(c.penaltyGradeReviewProvision);assert.equal(c.penaltyReviewSafety.includes("not full lawtext"),true);assert.notEqual(c.rekvisit15?.legalReviewApproved,true);}
for(const title of ["Narkotikabrott · försäljning","Grovt vapenbrott","Grov olovlig körning","Grovt brott mot knivlagen"]){const c=reviewed.find(c=>c.title===title);assert.ok(c,title);assert.equal(c.lawCompletenessVerified,true,'Independently transcribed current SFS provision must now be certified');assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');}
assert.equal(ctx.window.BK_DATA.crimes.filter(c=>c.stageStatus==="unverified").length,0);
console.log("PASS V1.5: 22 current independently compared special-law penalty intervals; imported lawtext not certified and no custody inferred");
