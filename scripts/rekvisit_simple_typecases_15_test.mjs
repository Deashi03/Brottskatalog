import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]),mod='./rekvisit-simple-typecases-15.js';
assert.ok(scripts.includes(mod)&&sw.includes(mod));assert.ok(scripts.indexOf(mod)>scripts.indexOf('./rekvisit-typexempel-15.js')&&scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]),ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of scripts)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const report=ctx.window.BK_SIMPLE_TYPECASES15,base=ctx.window.BK_DATA.crimes.filter(x=>!x.stageType);
assert.ok(report&&report.added===9&&report.held.length===0&&report.existing.length===0,JSON.stringify(report));
const titles=["Olaga hot","Hemfridsbrott","Olaga intrång","Bedrägeri","Olaga frihetsberövande","Mordbrand","Falskt larm","Tvegifte","Dataintrång"];
for(const title of titles){
 const c=base.find(x=>x.title===title);
 assert.ok(c?.typexempel15?.length===1,title);
 const x=c.typexempel15[0];
 assert.equal(x.status,'draft-simple-example-needs-final-juridical-approval');assert.equal(x.legalReviewApproved,false);
 assert.ok(x.text.length>70&&x.source.includes('Eget konstruerat'));
 assert.ok(x.lawSourceURL.includes('riksdagen.se'));assert.notEqual(c.rekvisit15?.legalReviewApproved,true);
}
assert.ok(!base.find(x=>x.title==='Psykiskt våld').typexempel15?.length,'Nontrivial new crime remains held');
assert.ok(!base.find(x=>x.title==='Angrepp mot tjänsteman').typexempel15?.length,'Nonintuitive police assault example remains held');
assert.equal(ctx.window.BK_DATA.crimes.filter(x=>x.stageStatus==='unverified').length,0);
console.log('PASS V1.5: nine low-ambiguity police teaching typfall with no implicit legal certification');