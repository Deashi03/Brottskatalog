import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes('./brb4-fridtext-15.js'));
assert.ok(scripts.indexOf('./brb4-fridtext-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./brb4-fridtext-15.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const stats=ctx.window.BK_FRID15;
assert.ok(stats);
assert.equal(stats.mismatch.length,0,stats.mismatch.join(';'));
assert.equal(stats.missing.length,0,'No compound crime should be absent: '+stats.missing.join(';'));
assert.equal(stats.repaired,2,'Both truncated 2026 law paragraphs must be fully repaired');
assert.ok(stats.updated>=3,'Expected important compound offences to have new structured requisites');
for(const ref of ['BrB:4:4a','BrB:4:4e']){
 const src=ctx.window.BK_STATUTES[ref];
 assert.ok(src.complete&&src.text.includes('Lag (2026:852)')&&src.text.length>350);
 assert.ok(src.text.includes('kontaktförbud')&&src.text.includes('upprepad kränkning'));
}
const base=ctx.window.BK_DATA.crimes.filter(x=>!x.stageType),by=t=>base.find(x=>x.title===t);
for(const title of ['Grov fridskränkning','Grov kvinnofridskränkning','Hedersförtryck']){
 const c=by(title);
 assert.ok(c,title);
 assert.ok(c.lawMode==='full'&&c.lawCompletenessVerified,'No truncated law should be displayed');
 assert.ok(c.rekvisit15?.groups?.length,'Statutory elements must be structured');
 assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'No unsupported full court-law approval');
 assert.ok(c.rekvisit15.groups.some(g=>g.label.includes('upprepad kränkning')),'Missing repeated violation: '+title);
}
assert.ok(by('Grov kvinnofridskränkning').rekvisit15.groups.some(g=>g.label.includes('man')));
assert.ok(by('Hedersförtryck').rekvisit15.groups.some(g=>g.label.includes('heder')));
assert.ok(by('Barnfridsbrott')?.rekvisit15?.groups?.length);
assert.ok(by('Grovt barnfridsbrott')?.rekvisit15?.groups?.length);
console.log('PASS V1.5: complete 2026:852 SFS imports for BrB 4:4a/4:4e; compound offences, relationship, repeated acts and honor motive represented');