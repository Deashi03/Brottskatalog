import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const crimes=['Tjänstefel','Grovt tjänstefel','Brott mot tystnadsplikt','Grovt brott mot tystnadsplikt']
 .map((title,i)=>({title,id:'pre-'+i,shortRef:i<2?'BrB 20:1':'BrB 20:3',ref:i<2?'BrB 20 kap. 1 §':'BrB 20 kap. 3 §',
 penaltyShort:'Ändrad lag',penalty:'Kräver kontroll',reviewStatus:'source-changed',prosecution:'unknown',category:'Tjänsteman'}));
const w={BK_DATA:{crimes,categories:['Alla']},BK_STATUTES:{
 'BrB:20:1':{ref:'BrB 20:1',text:'Utdrag ur tjänstefelsparagrafen'},
 'BrB:20:2':{ref:'BrB 20:2',text:'2 § Missbruk av offentlig ställning'},
 'BrB:20:3':{ref:'BrB 20:3',text:'Utdrag ur tystnadspliktsparagrafen'}
}};
const ctx={window:w,console};
vm.runInNewContext(readFileSync(resolve(root,'brb20-13.js'),'utf8'),ctx);
assert.equal(w.BK_BRB20_13.corrected,4);
assert.equal(w.BK_BRB20_13.inserted,2);
const get=t=>w.BK_DATA.crimes.find(c=>c.title.toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
assert.equal(get('Grovt tjänstefel').penaltyRange.min,1.5);
assert.equal(get('Grovt brott mot tystnadsplikt').penaltyRange.max,6);
assert.equal(get('Brott mot tystnadsplikt').prosecution,'conditional');
assert.match(get('Brott mot tystnadsplikt').prosecutionRule,/BrB 20:5/);
assert.equal(get('Missbruk av offentlig ställning').penaltyRange.max,2);
assert.equal(get('Grovt missbruk av offentlig ställning').penaltyRange.min,1.5);
assert.equal(get('Missbruk av offentlig ställning').introducedFrom,'2026-08-01');
assert.equal(get('Grovt missbruk av offentlig ställning').penaltySource,'BrB 20 kap. 2 § (SFS 2026:1420)');
assert.equal(get('Missbruk av offentlig ställning').lawMode,'machine','New offence may not masquerade as fully verified law text');
const current=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(current.indexOf('src="./brb20-13.js"')<current.indexOf('src="./stages-08.js"'),'Stage generator must see newly introduced offences');
vm.runInNewContext(readFileSync(resolve(root,'stages-08.js'),'utf8'),ctx);
for(const title of ['Missbruk av offentlig ställning','Grovt missbruk av offentlig ställning']){
 for(const kind of ['Försök till','Förberedelse till','Stämpling till']){
  const c=get(kind+' '+title);
  assert.ok(c,'New crime must be searchable as '+kind+' '+title);
  assert.equal(c.stageStatus,'not-criminalized','BrB 20:2 does not prescribe punishment for these stages');
  assert.equal(c.penaltyRange,null,'Noncriminal stage must not carry a penal range');
 }
}
vm.runInNewContext(readFileSync(resolve(root,'quality-11.js'),'utf8'),ctx);
const footer=w.BK_QUALITY11.metadata(get('Missbruk av offentlig ställning'),new Date('2026-10-13T12:00:00Z'));
assert.match(footer.effectiveNote,/2026-08-01/);
assert.equal(footer.stale,false);
for(const key of ['brb20-13.js','stages-08.js'])assert.ok(readFileSync(resolve(root,'service-worker.js'),'utf8').includes(key),'Offline cache missing '+key);
console.log('PASS BrB20 1.3: 2 new offences, 4 corrected scales, conditional secrecy prosecutions, 6 noncriminal stages, historical validity');
