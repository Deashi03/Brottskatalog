import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),mod='./case-law-boundaries-15.js';
const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const plain=x=>JSON.parse(JSON.stringify(x));
function load(skip=false){const ctx=vm.createContext({window:{},console:{log(){},warn(){},error(){}}});for(const i of[1,2,3])vm.runInContext(inline[i],ctx);for(const f of srcs)if(!skip||f!==mod)vm.runInContext(read(f),ctx,{filename:f});return ctx;}
const ctx=load(),data=JSON.parse(read('data/case-law-boundaries-15.json'));
assert.equal(data.cases.length,3);assert.equal(data.records.length,6);
assert.equal(Object.keys(data.sourcePins).length,4);
assert.deepEqual(plain(ctx.window.BK_CASE_LAW_BOUNDARIES15),{planned:6,added:6,duplicates:0,held:[],fullLegalApprovals:0,jurisprudenceCheckpointsApproved:0});
for(const k of data.cases){assert.match(k.downloadSHA256,/^[a-f0-9]{64}$/);assert.ok(k.url.startsWith('https://www.domstol.se/globalassets/'));assert.ok(k.locator);}
const before=load(true),old=plain(before.window.BK_DATA.crimes);
vm.runInContext(read(mod),before);
for(const[i,c]of before.window.BK_DATA.crimes.entries()){
 const prev=old[i],copy=plain(c),row=data.records.find(r=>r.id===c.id&&!c.stageType);
 if(row){const example=copy.typexempel15.pop(),k=data.cases.find(k=>k.id===row.case);assert.equal(example.sourceURL,k.url);assert.equal(example.fullLegalReviewApproved,false);assert.equal(example.fullJurisprudenceReviewApproved,false);assert.equal(c.legalAudit15?.checkpoints?.jurisprudence,undefined);if(!prev.typexempel15)delete copy.typexempel15;}
 assert.deepEqual(copy,prev,'Preserve penalties, approvals, stages and all other fields: '+c.title);
}
vm.runInContext(read(mod),before);assert.equal(before.window.BK_CASE_LAW_BOUNDARIES15.added,0);assert.equal(before.window.BK_CASE_LAW_BOUNDARIES15.duplicates,6);
function altered(fn){const x=load(true);fn(x.window);vm.runInContext(read(mod),x);return x.window.BK_CASE_LAW_BOUNDARIES15;}
assert.equal(altered(w=>w.BK_STATUTES['BrB:4:5'].text+=' changed').added,4);
assert.equal(altered(w=>w.BK_STATUTES['BrB:13:5c'].machine=true).added,4);
assert.equal(altered(w=>delete w.BK_STATUTES['BrB:4:6'].checked).added,5);
assert.equal(altered(w=>w.BK_STATUTES['BrB:16:2'].complete=false).added,5);
assert.equal(altered(w=>w.BK_DATA.crimes.find(c=>c.title==='Grovt olaga hot'&&!c.stageType).law+=' changed').added,5);
assert.equal(altered(w=>w.BK_DATA.crimes.find(c=>c.title==='Olaga intrång'&&!c.stageType).statute='BrB:4:5').added,5);
assert.ok(data.cases.find(k=>k.id==='vinkelslipen').note.includes('ingen fast straffnivå'));
assert.ok(data.cases.find(k=>k.id==='demonstranten').text.includes('ingen generell minutgräns'));
assert.ok(data.cases.find(k=>k.id==='paskupploppet').text.includes('inte automatiskt'));
assert.ok(read('service-worker.js').includes(mod));
console.log('PASS: three primary HD judgments, six guarded boundary examples, idempotence, no other fields or approvals changed');
