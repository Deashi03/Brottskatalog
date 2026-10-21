import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.indexOf('./rekvisit-sexualbrott-15.js')>scripts.indexOf('./rekvisit-fordjupning-15.js'));
assert.ok(scripts.indexOf('./rekvisit-sexualbrott-15.js')<scripts.indexOf('./stages-08.js'));
assert.ok(sw.includes('./rekvisit-sexualbrott-15.js'),'Sex offence requisites must work offline');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType),stat=ctx.window.BK_SEXUAL_REKVISIT15;
const get=t=>base.find(c=>c.title===t);
assert.ok(stat,'Sex crime source-backed module did not execute');
assert.equal(stat.missing.length,0,'Unmatched sex offence titles: '+stat.missing.join(', '));
assert.equal(stat.mismatch.length,0,'Statutory mismatches: '+JSON.stringify(stat.mismatch));
assert.ok(stat.added>=9,'Too few new, grounded sex-offence summaries: '+JSON.stringify(stat));
for(const title of ['Våldtäkt','Grov våldtäkt','Oaktsam våldtäkt','Sexuellt övergrepp','Grovt sexuellt övergrepp','Oaktsamt sexuellt övergrepp','Våldtäkt mot barn','Grov våldtäkt mot barn','Sexuellt utnyttjande av barn','Utnyttjande av barn för sexuell posering','Grovt utnyttjande av barn för sexuell posering','Utnyttjande av barn genom köp av sexuell handling','Sexuellt ofredande mot barn','Sexuellt ofredande','Grovt sexuellt ofredande mot barn','Grovt sexuellt ofredande']){
 const c=get(title);assert.ok(c,title);
 assert.ok(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length,'No structured elements: '+title);
 assert.ok(c.rekvisit15.legalReviewApproved!==true,'No automatic case-law approval: '+title);
}
const child=get('Våldtäkt mot barn');
assert.ok(child.rekvisit15.routes.length>=3,'Must separate three age/protection pathways under BrB 6:4');
assert.ok(child.rekvisit15.routes.some(x=>x.label.includes('15–17')),'15–17 abuse-of-trust pathway missing');
assert.ok(child.rekvisit15.routes.some(x=>x.label.includes('under 18')),'Vulnerable under-18 pathway missing');
assert.ok(child.rekvisit15.routes.some(x=>x.label.includes('under 15')),'Under-15 pathway missing');
for(const title of ['Oaktsam våldtäkt','Oaktsamt sexuellt övergrepp']){
 const c=get(title);assert.ok(c.rekvisit15.routes.some(x=>x.groups.some(g=>g.label.includes('grovt oaktsam'))),'Gross-negligence subjective criterion missing');
}
for(const title of ['Sexuellt utnyttjande av barn','Utnyttjande av barn för sexuell posering']){
 const c=get(title);assert.ok(c.rekvisit15.routes.some(x=>x.groups.some(g=>g.label.includes('6:14'))),'Statutory narrow age difference exception must be visible');
}
const total=base.filter(c=>c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length).length;
assert.ok(total>=152,'Insufficient new BrB requisite coverage: '+total);
console.log('PASS V1.5: '+stat.added+' bounded BrB 6 sex-offence requisite summaries, '+total+' total structured; age, negligence, nonvoluntary and narrow exceptions distinguished');