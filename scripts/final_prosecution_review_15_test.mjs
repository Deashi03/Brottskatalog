import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),mod='./final-prosecution-review-15.js';
const html=read('index.html'),srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]),inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const src of srcs)if(src!==mod)vm.runInContext(read(src),ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),before=copy(ctx.window.BK_DATA.crimes),statutes=copy(ctx.window.BK_STATUTES),code=read(mod);
vm.runInContext(code,ctx);const all=ctx.window.BK_DATA.crimes,by=t=>all.find(c=>c.title===t),r=ctx.window.BK_FINAL_PROSECUTION15;
const manifest=JSON.parse(read('data/final-prosecution-stage-review-15.json'));
assert.equal(manifest.rows.length,452);assert.equal(manifest.reconciliation.changedModes,43);
assert.deepEqual(JSON.parse(code.slice(code.indexOf('const data=')+11,code.indexOf(';\nconst norm='))),manifest);
assert.equal(r.completed,452);assert.equal(r.held.length,0);assert.equal(r.fullLegalApprovals,0);assert.equal(r.changed.length,43);
assert.equal(all.filter(c=>c.prosecution==='unknown'&&(!c.stageType||c.stageStatus==='punishable')).length,0);
for(const t of ['Grovt hemfridsbrott','Grovt olaga intrång'])for(const prefix of ['Försök till ','Förberedelse till ','Stämpling till '])assert.equal(by(prefix+t.toLowerCase()).prosecution,'general');
assert.equal(by('Förberedelse till grovt fordringsbedrägeri').prosecution,'conditional');
for(const prefix of ['Försök till ','Förberedelse till ']){assert.equal(by(prefix+'grovt olaga tvång').prosecution,'conditional');assert.equal(by(prefix+'grovt olaga tvång').prosecutionFinalReview15.interpretationPending,true);}
assert.equal(by('Stämpling till grovt olaga tvång').prosecution,'general');
assert.equal(by('Grovt olaga tvång').legalAudit15.checkpoints.prosecution,undefined,'Systematic interpretation is not an independently completed legal checkpoint');
assert.equal(by('Grovt olaga tvång').prosecutionFinalReview15.interpretationPending,true);
for(const t of ['grovt vapenbrott','synnerligen grovt vapenbrott'])for(const prefix of ['Försök till ','Förberedelse till ','Stämpling till '])assert.equal(by(prefix+t).prosecution,'general','Do not inherit voluntary possession hand-in rule');
assert.equal(by('Försök till grov olovlig underrättelseverksamhet mot främmande makt').prosecution,'conditional');
assert.equal(by('Försök till grov olovlig underrättelseverksamhet mot person').prosecution,'general');
const allowed=['prosecution','prosecutionLabel','prosecutionRule','prosecutionDetails','prosecutionSourceURL','prosecutionChecked','prosecutionFinalReview15'];
for(const c of all){const a=copy(c),b=copy(before.find(p=>p.id===c.id));for(const k of allowed){delete a[k];delete b[k];}assert.deepEqual(a,b,'Preserve criminalization, ranges, powers, sources and approvals: '+c.title);}
const rerun=change=>{const a=copy(before),W=copy(statutes);change(a,W);const cx=vm.createContext({window:{BK_DATA:{crimes:a},BK_STATUTES:W}});vm.runInContext(code,cx);return cx.window;};
let out=rerun((a,W)=>W['BrB:4:11'].text+=' SOURCE DRIFT');assert.equal(out.BK_DATA.crimes.find(c=>c.title==='Grovt olaga tvång').prosecution,'unknown');assert.ok(out.BK_FINAL_PROSECUTION15.held.length>0);
out=rerun((a,W)=>W['RB:20:3'].complete=false);assert.equal(out.BK_FINAL_PROSECUTION15.completed,0);assert.equal(out.BK_FINAL_PROSECUTION15.held.length,452);
out=rerun(a=>a.find(c=>c.title==='Grovt hemfridsbrott').law+=' DRIFT');assert.equal(out.BK_DATA.crimes.find(c=>c.title==='Försök till grovt hemfridsbrott').prosecution,'unknown');
out=rerun((a,W)=>W['RB:20:3'].checked='2099-01-01');assert.equal(out.BK_FINAL_PROSECUTION15.completed,0);
assert.ok(read('service-worker.js').includes(mod));assert.ok(srcs.indexOf(mod)>srcs.indexOf('./base-inchoate-review-15.js'));
console.log('PASS: 452 final stage prosecution classifications, 43 stale modes corrected, source drift closed, independent gross-coercion interpretation still open');
