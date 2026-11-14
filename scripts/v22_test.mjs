import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
// 2.2: klickbara paragrafhänvisningar i lagtexten och menyn Brott begånget utomlands (BrB 2 kap.).
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
assert.ok(scripts.includes('./utland-22.js')&&sw.includes('./utland-22.js'));
assert.ok(html.includes("window.BK_RELEASE = '2.2';")&&sw.includes("'brottskatalog-v220-20261114'"));
assert.ok(html.indexOf('id="sec-fu18"')<html.indexOf('id="sec-utland22"')&&html.indexOf('id="sec-utland22"')<html.indexOf("accordion('preskription'"),'ordning: FU-ledning, utomlands, preskription');
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of scripts)vm.runInContext(read(s),ctx,{filename:s});
const W=ctx.window;
const crimes=W.BK_DATA.crimes.filter(W.BK_CATALOG_SELECTION15.included)
 .concat((W.BK_TRAFFIC16.entries||[]).filter(c=>!W.BK_DATA.crimes.some(x=>x.title.toLocaleLowerCase('sv')===c.title.toLocaleLowerCase('sv'))))
 .concat(W.BK_SPECIAL19.entries).concat(W.BK_STAGES20.entries);
const byId=Object.fromEntries(crimes.map(c=>[c.id,c]));W.BK_APP17={crimes};
const P=W.BK_STATUTES;

// Hänvisade paragrafer följer med offline. Exemplet från användaren: spellagen 19:2 hänvisar till 19:1.
assert.ok(P['SpelL:19:1']&&P['SpelL:19:1'].text.includes('olovlig spelverksamhet'),'spellagen 19:1 finns offline');
assert.ok(byId['v19-framjande-av-olovligt-spel'].law.includes('1 §'));
const lt=JSON.parse(read('data/special19/lagtext.json'));
let secs=0;for(const l of Object.values(lt))secs+=Object.keys(l.sections).length;
assert.ok(secs>=2300,'hänvisade paragrafer är med: '+secs);
// Länklogiken: samma kapitel ärvs i alla lagar med kapitel, uppräkningar länkas var för sig, andra författningar länkas inte fel.
const fn=html.slice(html.indexOf('function provisionKey(fragment, current){'),html.indexOf('function lawMarkup(text,current,terms=[]){'));
const mk=new Function('provisions',fn+';return {provisionKey,lawRefs22};');
const L=mk({'X:19:1':{},'X:19:3':{},'X:2:4':{},'Y:37':{},'Y:40':{},'Y:19':{},'Y:20':{},'Y:23':{},'BrB:8:1':{},'BrB:23:3':{}});
assert.equal(L.provisionKey('1 §','X:19:2'),'X:19:1');
assert.equal(L.provisionKey('2 kap. 4 §','X:19:2'),'X:2:4');
const keys=(t,c)=>L.lawRefs22(t,c).map(h=>h.key).join();
assert.equal(keys('spel som avses i 1 § döms','X:19:2'),'X:19:1');
assert.equal(keys('brott enligt 37 eller 40 § är grovt','Y:40a'),'Y:37,Y:40');
assert.equal(keys('stöd av 19, 20 eller 23 § döms','Y:40'),'Y:19,Y:20,Y:23');
assert.equal(keys('enligt 23 kap. 3 § rättegångsbalken','X:19:2'),'','annan författning utan lagtext länkas inte till den egna lagen');
assert.equal(keys('som avses i 8 kap. 1 § brottsbalken','X:19:2'),'BrB:8:1','hänvisning till brottsbalken öppnar brottsbalken');
assert.equal(keys('enligt 3 § lagen (2000:1225) om straff för smuggling','Y:40'),'');
assert.equal(keys('enligt 1 § första stycket 2 miljöbalken','X:19:2'),'');
const h=L.lawRefs22('avses i 1 § döms','X:19:2')[0];assert.equal('avses i 1 § döms'.slice(h.s,h.e),'1 §');

// Brott begånget utomlands.
const U=W.BK_UTLAND22;
const run=(id,yes)=>{const a={},pathQ=[];for(let i=0;i<30;i++){const x=U.assess(byId[id],a);if(x.result)return {...x.result,path:pathQ};pathQ.push(x.question.id);a[x.question.id]=!!yes[x.question.id];}throw new Error('slinga');};
let r=run('misshandel',{here:true});assert.ok(r.court&&r.order===false&&r.place==='sweden');
r=run('misshandel',{here:true,hereExc:true});assert.equal(r.order,true);assert.ok(r.orderBy.includes('Regeringen'));
r=run('misshandel',{swede:true,victim:true,double:true});assert.ok(r.court&&r.double===true&&r.order===false,'svensk mot svensk utomlands: inget åtalsförordnande');
r=run('misshandel',{swede:true,double:true});assert.ok(r.court&&r.order===true&&r.orderBy.includes('överlämna'),'svensk gärningsperson mot utländskt intresse: åtalsförordnande');
r=run('misshandel',{swede:true,double:true,nordic:true});assert.equal(r.order,false,'Norden');
r=run('misshandel',{swede:true});assert.ok(!r.court&&r.double===true,'dubbel straffbarhet saknas');
r=run('misshandel',{victim:true,double:true,nordicOffender:true});assert.equal(r.order,false);
r=run('misshandel',{victim:true,double:true});assert.equal(r.order,true);
r=run('misshandel',{present:true,double:true});assert.ok(r.court,'misshandel kan ge fängelse i mer än sex månader');
r=run('ringa-stold',{present:true});assert.ok(!r.court,'ringa stöld: högst sex månader räcker inte');
r=run('misshandel',{});assert.ok(!r.court&&r.grounds.length===0);
r=run('misshandel',{special:true});assert.ok(r.court&&r.double===false&&r.order===false);
r=run('v03-mord',{swede:true});assert.ok(r.court&&r.double===false&&!r.path.includes('double'),'minimistraff fyra år eller mer: ingen dubbel straffbarhet');assert.equal(r.order,true);
r=run('v03-valdtakt',{swede:true,child:true});assert.ok(r.path.includes('child')&&r.double===false);
r=run('v03-valdtakt',{swede:true,double:true});assert.equal(r.double,true);
r=run('v03-spioneri',{state:true});assert.ok(r.court&&r.double===false&&r.order===true);
r=run('v03-spioneri',{state:true,swede:true});assert.equal(r.order,false,'svenskt intresse och svensk gärningsperson');
assert.ok(run('v20-olovligt-fiske',{}).special.includes('fiskelagen'));
assert.ok(U.traits(byId['v05-penningforfalskning']).noDouble,'penningförfalskning är undantagen');
assert.ok(U.traits(byId['v15-additional-kapning']).universal);
const fs1=crimes.find(c=>c.stageParentId==='ringa-stold'&&c.stageType==='forsok');
assert.ok(!U.available(fs1)&&U.available(byId.stold));
assert.ok(U.render(byId.stold,{}).includes('data-ut22="yes"')&&U.render(byId.stold,{here:true,hereExc:false}).includes('ÅTALSFÖRORDNANDE'));
for(const q of Object.values(U.Q))assert.ok(q.text.endsWith('?')&&/^BrB 2:/.test(q.src));
console.log('v22_test OK',secs,'paragrafer offline');
