import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
// 2.2: klickbara paragrafhänvisningar i lagtexten och menyn Brott begånget utomlands (BrB 2 kap.).
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
assert.ok(scripts.includes('./utland-22.js')&&sw.includes('./utland-22.js'));
assert.ok(html.includes("window.BK_RELEASE = '2.2.1';")&&sw.includes("'brottskatalog-v221-20261115'"));
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
const mk=new Function('provisions','window','ic','escapeHtml',fn+';return {provisionKey,lawRefs22,sfsSection22};');
const L=mk({'X:19:1':{url:'https://data.riksdagen.se/dokument/sfs-2018-1138.html',id:'X:19:1'},'X:19:3':{id:'X:19:3'},'X:2:4':{id:'X:2:4'},'Y:37':{id:'Y:37',url:'x/sfs-1993-787.html'},'Y:40':{id:'Y:40'},'Y:19':{id:'Y:19'},'Y:20':{id:'Y:20'},'Y:23':{id:'Y:23'},'BrB:8:1':{id:'BrB:8:1'}},{},()=>'',x=>x);
assert.equal(L.provisionKey('1 §','X:19:2'),'X:19:1');
assert.equal(L.provisionKey('2 kap. 4 §','X:19:2'),'X:2:4');
const refs=(t,c)=>L.lawRefs22(t,c).map(h=>h.mode==='ref'?h.key:'online '+h.sfs+'|'+h.chap+'|'+h.para).join();
assert.equal(refs('spel som avses i 1 § döms','X:19:2'),'X:19:1');
assert.equal(refs('brott enligt 37 eller 40 § är grovt','Y:40a'),'Y:37,Y:40');
assert.equal(refs('stöd av 19, 20 eller 23 § döms','Y:40'),'Y:19,Y:20,Y:23');
assert.equal(refs('som avses i 8 kap. 1 § brottsbalken','X:19:2'),'BrB:8:1','hänvisning till brottsbalken öppnar brottsbalken');
// Paragrafer som inte finns lagrade hämtas från riksdagen: andra lagar, och den egna lagens övriga paragrafer.
assert.equal(refs('enligt 23 kap. 3 § rättegångsbalken','X:19:2'),'online 1942-740|23|3');
assert.equal(refs('enligt 3 § lagen (2000:1225) om straff för smuggling','Y:40'),'online 2000-1225||3');
assert.equal(refs('enligt 29 kap. 1 § första stycket 2 miljöbalken','X:19:2'),'online 1998-808|29|1');
assert.equal(refs('som avses i 8 § narkotikastrafflagen (1968:64) i så stor mängd','X:19:2'),'online 1968-64||8');
assert.equal(refs('enligt 5 § döms','X:19:2'),'online 2018-1138|19|5','egen paragraf som inte finns lagrad');
assert.equal(refs('tillämpas 3 kap. 14 §, 16 § första stycket och 18 §','X:19:2'),'online 2018-1138|3|14,online 2018-1138|3|16,online 2018-1138|3|18','kapitlet gäller hela uppräkningen');
assert.equal(refs('1 § Den som kör','Z:1'),'','paragrafens eget nummer länkas inte');
assert.equal(refs('enligt 2 § samma lag','X:19:2'),'');
const h=L.lawRefs22('avses i 1 § döms','X:19:2')[0];assert.equal('avses i 1 § döms'.slice(h.s,h.e),'1 §');
const sample='Lag (2000:1) om test\n\nSFS nr: 2000:1\nKälla: Regeringskansliet / Lagrummet\n\n1 kap. Inledning\n\n1 § Första\nparagrafen.\n\n2 kap. Straff\n\n1 § /Träder i kraft I:2999-01-01/\nKommande lydelse.\n\n1 § Den som bryter\nmot 3 § döms till böter.\n\nAndra stycket.\n\nRubrik utan punkt\n\n2 § Nästa.\n\nÖvergångsbestämmelser\n\n1 § Gammalt.';
assert.equal(L.sfsSection22(sample,'2','1').text,'1 § Den som bryter mot 3 § döms till böter.\n\nAndra stycket.');
assert.equal(L.sfsSection22(sample,'1','1').text,'1 § Första paragrafen.');
assert.equal(L.sfsSection22(sample,'2','9'),null);
assert.ok(html.includes('data-online22')&&html.includes("https://data.riksdagen.se/dokument/sfs-'"),'hämtning från riksdagen vid tryck');

// Brott begånget utomlands (omgjort i 2.2.1): tabeller per brott, reglerna i outcome(), frågor bara när svaret kan ändra resultatet.
const U=W.BK_UTLAND22,T=U.tables;
// 1. Tabellerna pekar på kort som finns, och på rätt brott.
for(const [name,t] of Object.entries(T)){if(name==='SPECIAL')continue;for(const id of (t instanceof Set?[...t]:Object.keys(t)))assert.ok(byId[id]&&!byId[id].stageType,name+': okänt kort '+id);}
for(const id of T.CHILD_ALWAYS)assert.ok(/barn/i.test(byId[id].title),'barnbrott: '+id);
for(const id of T.CHILD_ASK)assert.ok(!/barn/i.test(byId[id].title)&&byId[id].category==='Sexualbrott',id);
const dialog=(c,facts)=>{const a={},asked=[];for(let i=0;i<20;i++){const x=U.assess(c,a);if(x.result)return {...x.result,asked};asked.push(x.question.id);a[x.question.id]=!!facts[x.question.id];}throw new Error('slinga');};
const run=(id,facts)=>dialog(byId[id],facts||{});

// 2. Det brottet självt avgör frågas aldrig (felen som rapporterades för våldtäkt mot barn).
for(const id of T.CHILD_ALWAYS){
 const r=run(id,{swede:true});
 assert.ok(!r.asked.includes('exempt'),'frågar inte om målsägandens ålder: '+id);
 assert.ok(!r.asked.includes('doubleCrim'),'frågar inte om dubbel straffbarhet: '+id);
 assert.ok(r.court&&r.double===false&&/barn|fyra år/.test(r.doubleWhy),id);
}
for(const c of crimes){if(!U.available(c))continue;const q=U.assess(c,{here:false,special:false});
 if(q.question)assert.ok(!/internationell[at] brott|vilket brott/i.test(q.question.text),'frågar inte vilket brott det är: '+c.id);}
assert.ok(!Object.keys(U.Q).includes('universal'),'ingen fråga om brottstyp finns kvar');
// BrB 2:5 andra stycket 3 och 4: undantagen följer av brottet.
for(const id of ['v03-mord','v03-manniskohandel','v15-family-aktenskapstvang','v15-hedersfortryck','v05-penningforfalskning','v19-konsstympning','v21-sanktionsbrott','v21-brott-mot-frysningsbeslut','v15-war-olovlig-befattning-med-minor']){
 const r=run(id,{swede:true});assert.ok(r.court&&r.double===false&&!r.asked.includes('doubleCrim')&&!r.asked.includes('exempt'),'BrB 2:5: '+id);
}
assert.equal(U.card(byId['v19-oskuldsingrepp']).fixed.exempt,false,'oskuldsingrepp (3 §) är inte undantaget');
assert.equal(U.card(byId['v03-sexuellt-ofredande']).fixed.exempt,false,'6:10 står inte i BrB 2:5');
assert.equal(U.card(byId.misshandel).fixed.exempt,false);
// Åldern frågas där den inte följer av brottet, och bara där.
let r=run('v03-valdtakt',{swede:true,exempt:true});assert.ok(r.asked.includes('exempt')&&r.double===false&&!r.asked.includes('doubleCrim'));
r=run('v03-valdtakt',{swede:true,doubleCrim:true});assert.ok(r.asked.includes('exempt')&&r.asked.includes('doubleCrim')&&r.double===true);
assert.equal(U.assess(byId['v03-valdtakt'],{here:false,special:false,swede:true,victim:false}).question.text,'Var den som utsattes under 18 år?');
assert.ok(U.assess(byId['v03-barnpornografibrott'],{here:false,special:false,swede:true,victim:false}).question.text.includes('skildrat'));
// Förstadier: undantaget gäller försök men inte förberedelse och stämpling där lagen bara nämner försök.
const st=(pid,t)=>crimes.find(c=>c.stageParentId===pid&&c.stageType===t);
assert.equal(U.card(st('v03-valdtakt-mot-barn','forsok')).fixed.exempt,true);
assert.equal(U.card(st('v03-valdtakt-mot-barn','forberedelse')).fixed.exempt,false);
assert.equal(U.card(st('v19-konsstympning','stampling')).fixed.exempt,true);
assert.equal(U.card(st('v03-mord','forsok')).fixed.exempt,false,'försök till mord har inte minimistraff fyra år');
// Brott mot staten frågas bara för brottstyper där det kan vara så.
assert.ok(run('v03-spioneri',{}).asked.includes('state')&&!run('misshandel',{}).asked.includes('state')&&!run('v03-valdtakt-mot-barn',{}).asked.includes('state'));

// 3. Reglerna i BrB 2 kap.
const O=(f,i)=>U.keyOf(U.outcome(f,{over6m:true,prison:true,universal:false,intlCourt:false,...(i||{})}));
assert.equal(O({here:true}),'10');assert.equal(O({here:true,exc22:true}),'11');
assert.equal(O({}),'0-','ingen koppling till Sverige');
assert.equal(O({special:true}),'10','svenskt fartyg m.m.: behörig utan åtalsförordnande');
assert.equal(O({swede:true}),'0-','svensk gärningsperson men inte brott på gärningsorten');
assert.equal(O({swede:true,doubleCrim:true}),'11');
assert.equal(O({swede:true,exempt:true}),'11','undantag från dubbel straffbarhet');
assert.equal(O({swede:true,doubleCrim:true,victim:true}),'10','svenskt intresse och svensk gärningsperson (2:7 andra stycket 6)');
assert.equal(O({swede:true,doubleCrim:true,nordicPlace:true}),'10','Norden (2:7 andra stycket 5)');
assert.equal(O({victim:true,doubleCrim:true}),'11');assert.equal(O({victim:true,doubleCrim:true,nordicCitizen:true}),'10');
assert.equal(O({present:true,doubleCrim:true}),'11');assert.equal(O({present:true,doubleCrim:true},{over6m:false}),'0-','2:3 punkt 2 c kräver mer än sex månader');
assert.equal(O({present:true,derived:true,doubleCrim:true},{over6m:false}),'11','härledd domsrätt');
assert.equal(O({state:true}),'11','brott mot staten kräver inte dubbel straffbarhet');assert.equal(O({state:true,swede:true}),'10');
assert.equal(O({zone:true}),'11');assert.equal(O({},{universal:true}),'11');assert.equal(O({},{universal:true,intlCourt:true}),'10');

// 4. Maskinell kontroll för varje typ av brott: rätt resultat för alla tänkbara svar, och ingen onödig fråga.
const sig=c=>{const k=U.card(c);return JSON.stringify([k.info.over6m,k.info.prison,k.info.universal,k.info.intlCourt,!!k.info.condText,k.fixed]);};
const types=new Map();for(const c of crimes)if(U.available(c)&&!types.has(sig(c)))types.set(sig(c),c);
assert.ok(types.size>=8,'brottstyper: '+types.size);
let dialogs=0,longest=0;
for(const c of types.values()){
 const {info,fixed}=U.card(c),free=U.FACTS.filter(k=>fixed[k]===undefined),memo=new Map();
 const nextQ=known=>{const key=JSON.stringify(known);if(!memo.has(key))memo.set(key,U.next(known,info));return memo.get(key);};
 for(let m=0;m<(1<<free.length);m++){
  const full={...fixed};free.forEach((k,i)=>full[k]=!!(m>>i&1));
  const known={...fixed};let n=0,q;
  while((q=nextQ(known))){
   assert.ok(known[q]===undefined,'samma fråga två gånger');
   // Frågan är nödvändig: det finns svar på resten där just den här frågan avgör resultatet.
   const rest=free.filter(k=>known[k]===undefined&&k!==q);let matters=false;
   for(let x=0;x<(1<<rest.length)&&!matters;x++){const f={...known};rest.forEach((k,i)=>f[k]=!!(x>>i&1));
    f[q]=true;const a1=U.keyOf(U.outcome(f,info));f[q]=false;if(a1!==U.keyOf(U.outcome(f,info)))matters=true;}
   assert.ok(matters,'onödig fråga: '+q+' för '+c.id);
   known[q]=full[q];n++;
  }
  // När frågorna är slut är resultatet detsamma oavsett de obesvarade frågorna – och lika med facit.
  const shown={};for(const k of U.FACTS)shown[k]=known[k]===true;
  assert.equal(U.keyOf(U.outcome(shown,info)),U.keyOf(U.outcome(full,info)),'fel resultat för '+c.id+' '+JSON.stringify(full));
  dialogs++;longest=Math.max(longest,n);
 }
}
assert.ok(longest<=10,'högst tio frågor: '+longest);

// 5. Vanliga fall och texter.
r=run('misshandel',{here:true});assert.ok(r.court&&r.order===false&&r.place==='sweden'&&r.asked.join()==='here,exc22');
r=run('misshandel',{swede:true,victim:true,doubleCrim:true});assert.ok(r.court&&r.double===true&&r.order===false&&r.asked.length===5);
r=run('misshandel',{swede:true,doubleCrim:true});assert.ok(r.order===true&&r.orderBy.includes('lämna över'));
r=run('misshandel',{special:true});assert.equal(r.asked.join(),'here,special');
r=run('ringa-stold',{present:true});assert.ok(!r.court&&r.courtWhy.includes('sex månader'));
r=run('v03-valdtakt-mot-barn',{swede:true,victim:true});assert.equal(r.asked.join(),'here,special,swede,victim','våldtäkt mot barn: fyra frågor');assert.ok(r.court&&r.order===false);
r=run('v15-additional-kapning',{});assert.ok(r.court&&r.double===false&&r.order===true&&r.grounds[0].includes('2:3 punkt 6'));
assert.ok(run('v20-olovligt-fiske',{}).special.includes('fiskelagen'));
const fs1=crimes.find(c=>c.stageParentId==='ringa-stold'&&c.stageType==='forsok');
assert.ok(!U.available(fs1)&&U.available(byId.stold));
for(const [id,q] of Object.entries(U.Q)){
 const text=typeof q.text==='function'?'Var den som utsattes under 18 år?':q.text;
 assert.ok(text.endsWith('?')&&text.length<=80&&/^BrB 2:/.test(q.src),'kort fråga: '+id);
 if(id!=='exempt')assert.ok(U.INFO[id]&&U.INFO[id].t[0].startsWith('Frågan ')&&/^BrB 2:/.test(U.INFO[id].src),'förklaring saknas: '+id);
}
assert.ok(U.INFO.child&&U.INFO.porn);
assert.ok(U.render(byId.stold,{}).includes('ut22-help')&&U.render(byId.stold,{}).includes('Begicks brottet i Sverige?'));
assert.ok(U.render(byId['v03-valdtakt'],{here:false,special:false,swede:true,victim:false}).includes('ut22-help'),'även åldersfrågan har förklaring');
assert.equal((U.render(byId.misshandel,{here:false,special:false,swede:true,victim:true,doubleCrim:true}).match(/ut22-help/g)||[]).length,4,'varje del av resultatet har en förklaring');
console.log('utland OK',types.size,'brottstyper',dialogs,'dialoger, längsta',longest,'frågor');
console.log('v22_test OK',secs,'paragrafer offline');
