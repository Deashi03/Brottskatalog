import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const mod='./brb14-evidence-distinctions-15.js';
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes(mod)&&sw.includes(mod),'Eight forensic statute distinctions must be available offline');
assert.ok(scripts.indexOf(mod)>scripts.indexOf('./urkund-gransdragning-15.js'),'Retain the earlier, checked legal distinctions');
assert.ok(scripts.indexOf(mod)<scripts.indexOf('./stages-08.js'),'Do not silently manipulate inchoate records');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const script of scripts)vm.runInContext(fs.readFileSync(path.join(root,script),'utf8'),ctx,{filename:script});
const report=ctx.window.BK_BRB14_EVIDENCE_DISTINCTIONS15;
assert.ok(report,'BrB 14/15 forensic review report missing');
assert.equal(report.planned,8);
assert.equal(report.reviewed,8,JSON.stringify(report));
assert.equal(report.missing.length,0,JSON.stringify(report.missing));
assert.equal(report.held.length,0,JSON.stringify(report.held));
for(const key of ['fullLegalApprovals','penaltyChanges','prosecutionChanges','custodyChanges','stageEntriesModified'])
 assert.equal(report[key],0,key+' must remain blocked');
const D=ctx.window.BK_DATA;
const by=t=>D.crimes.find(c=>!c.stageType&&c.title===t);
const expected=[
 ['Hindrande av urkunds bevisfunktion','BrB:14:4','Bevisförvanskning','bokföringsbrott'],
 ['Bevisförvanskning','BrB:15:8','Hindrande av urkunds bevisfunktion','oskyldig'],
 ['Penningförfalskning','BrB:14:6','Olovlig befattning med falska pengar','prånglas ut'],
 ['Olovlig befattning med falska pengar','BrB:14:7','Penningförfalskning','anskaffa eller ta emot'],
 ['Brukande av det förfalskade','BrB:14:10','Urkundsförfalskning','enda allmänt giltig numerisk straffskala'],
 ['Olaga spridande av efterbildning','BrB:14:11','Brukande av det förfalskade','enbart böter'],
 ['Märkesförfalskning','BrB:14:8','Förfalskning av fast märke','värdemärken'],
 ['Förfalskning av fast märke','BrB:14:9','Märkesförfalskning','fixpunkt']
];
for(const [title,ref,other,distinguishing] of expected){
 const c=by(title);assert.ok(c,'Missing '+title);
 assert.equal(c.statute,ref);
 assert.equal(c.evidenceDistinction15?.compareWith,other);
 assert.equal(c.evidenceDistinction15?.sourceRef,ref);
 assert.ok(c.evidenceDistinction15?.sourceURL.includes('riksdagen.se'));
 assert.ok(c.evidenceDistinction15?.note.includes(distinguishing),title+' missing act-specific caveat');
 assert.equal(c.evidenceDistinction15.legalReviewApproved,false);
 assert.equal(c.evidenceDistinction15.caseSpecificDeterminationApproved,false);
 assert.equal(c.evidenceDistinction15.neverApprovesCoerciveMeasures,true);
 assert.equal(c.rekvisit15.legalReviewApproved,false);
 assert.ok(c.rekvisit15.note.includes('Gränsdragning enligt 14–15 kap. BrB'));
}
assert.ok(!Number.isFinite(by('Brukande av det förfalskade').penaltyRange?.min)&&!Number.isFinite(by('Brukande av det förfalskade').penaltyRange?.max),'Derivative penalty must have no fixed numeric interval, whether missing or null');
assert.equal(D.crimes.filter(c=>c.stageType&&c.stageStatus==='unverified').length,12,'Uncertain stages must remain uncertain');
assert.equal(D.crimes.filter(c=>c.stageType).length,1086,'Forensic notes must not create new stage cards');
const originalSource=fs.readFileSync(path.join(root,mod),'utf8');
// Fail closed when the source text, provenance or requisites are not available.
const fake={title:'Penningförfalskning',statute:'BrB:14:6',rekvisit15:{legalReviewApproved:false,note:'preexisting note'}};
const win={BK_DATA:{crimes:[fake]},BK_STATUTES:{'BrB:14:6':{
 complete:true,completeTextProvenance:'manual-crosscheck-current-SFS-paragraph-only',checked:'2026-10-18',
 url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/',
 text:'shortened incomplete'
}}};
vm.runInNewContext(originalSource,{window:win,console},{filename:mod});
assert.equal(win.BK_BRB14_EVIDENCE_DISTINCTIONS15.reviewed,0);
assert.equal(win.BK_BRB14_EVIDENCE_DISTINCTIONS15.held.length,1);
assert.equal(fake.evidenceDistinction15,undefined);
assert.equal(fake.rekvisit15.note,'preexisting note');
console.log('PASS V1.5: eight source-checked forgery/evidence act distinctions, offline, no legal certification or stage changes');
