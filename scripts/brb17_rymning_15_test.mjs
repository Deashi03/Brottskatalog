import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..'),html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const srcs=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(x=>x[1]);
assert.ok(srcs.indexOf('brb17-rymning-15.js')>0);
assert.ok(srcs.indexOf('brb17-rymning-15.js')<srcs.indexOf('stages-08.js'));
assert.ok(sw.includes('./brb17-rymning-15.js'));
const window={BK_DATA:{crimes:[{id:'original-flykt-id',title:'Främjande av flykt',shortRef:'BrB 17:12',aliases:['gammalt sökord'],category:'Rättsväsende'}],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
vm.runInNewContext(readFileSync(resolve(root,'brb17-rymning-15.js'),'utf8'),{window,console});
const base=window.BK_DATA.crimes;
const by=t=>base.find(c=>c.title===t);
assert.equal(base.length,4,'Four offence grades in current BrB 17:12–12a');
const migrated=by('Främjande av rymning eller flykt');
assert.equal(migrated.id,'original-flykt-id','Favorites and saved references must survive');
assert.equal(migrated.shortRef,'BrB 17:12a');
assert.ok(migrated.aliases.includes('Främjande av flykt'));
assert.ok(migrated.aliases.includes('gammalt sökord'));
for(const [title,ref,min,max,fines,permissions] of [
 ['Rymning','BrB 17:12',0,2,false,'F'],
 ['Grov rymning','BrB 17:12',.5,4,false,'F'],
 ['Främjande av rymning eller flykt','BrB 17:12a',0,1,true,'FP'],
 ['Grovt främjande av rymning eller flykt','BrB 17:12a',.5,4,false,'FP']
]) {
 const c=by(title);assert.ok(c,title);
 assert.equal(c.shortRef,ref);assert.equal(c.penaltyRange.min,min);
 assert.equal(c.penaltyRange.max,max);assert.equal(c.penaltyRange.fines,fines);
 assert.equal(c.stagePermissions,permissions);
 assert.equal(c.stageSource,'BrB 17:16');
 assert.equal(c.requisitesStatus,'pending-individual-legal-review');
 assert.ok(c.law.includes('2026:924'));
}
vm.runInNewContext(readFileSync(resolve(root,'stages-08.js'),'utf8'),{window,console});
const stages=window.BK_DATA.crimes.filter(c=>c.stageType);
assert.equal(stages.length,12);
for(const c of base){
 const s=stages.filter(x=>x.stageParentId===c.id);
 assert.equal(s.length,3);
 for(const x of s)assert.equal(x.stageStatus,c.stagePermissions.includes(x.stageType==='forsok'?'F':x.stageType==='forberedelse'?'P':'S')?'punishable':'not-criminalized',x.title);
}
console.log('PASS V1.5: Correct 2026 BrB 17:12a migration, four grades, penalty intervals, and 17:16 stage exceptions');