import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
// 2.0: förstadiekort för alla kort, FU-ledning på förstadier, preskription, närliggande brott, nya kort och borttagna menyer.
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
for(const f of ['./stages-20.js','./enhetlighet-20.js','./preskription-20.js','./narliggande-20.js']){
 assert.ok(scripts.includes(f),'index laddar '+f);assert.ok(sw.includes(f),'service worker cachar '+f);
}
assert.ok(html.includes("window.BK_RELEASE = '2.1';")&&sw.includes("'brottskatalog-v210-20261114'"));
assert.ok(!/accordion\([^)]*(Lydelse och gärningstidpunkt|Straffskala och beslutsvillkor)/.test(html),'de två menyerna är borttagna');
assert.ok(html.includes("accordion('preskription','Preskription'")&&html.includes("accordion('narliggande','Närliggande brott'"));
assert.ok(html.indexOf('fu18-menu')<html.indexOf("accordion('preskription'")&&html.indexOf("accordion('preskription'")<html.indexOf("accordion('narliggande'"),'ordning: FU-ledning, preskription, närliggande brott');

const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of scripts)vm.runInContext(read(s),ctx,{filename:s});
const W=ctx.window;
const crimes=W.BK_DATA.crimes.filter(W.BK_CATALOG_SELECTION15.included)
 .concat((W.BK_TRAFFIC16.entries||[]).filter(c=>!W.BK_DATA.crimes.some(x=>x.title.toLocaleLowerCase('sv')===c.title.toLocaleLowerCase('sv'))))
 .concat(W.BK_SPECIAL19.entries).concat(W.BK_STAGES20.entries);
crimes.forEach(W.BK_RUBRICERING19.apply);crimes.forEach(W.BK_ENHETLIGHET20.apply);
const byId=Object.fromEntries(crimes.map(c=>[c.id,c]));
for(const c of crimes)if(c.stageParentId)Object.defineProperty(c,'fuParent20',{value:byId[c.stageParentId],enumerable:false});
W.BK_APP17={crimes};
const base=crimes.filter(c=>!c.stageType);
assert.equal(new Set(crimes.map(c=>c.id)).size,crimes.length,'unika id');
assert.ok(base.length>=650,'minst 650 grundkort: '+base.length);
assert.ok(base.filter(c=>c.id.startsWith('v20-')).length>=95,'nya 2.0-kort');

// Förstadier: varje grundkort har försök, förberedelse och stämpling, och varje kort är straffbart eller uttryckligen inte.
for(const c of base){
 const st=crimes.filter(s=>s.stageParentId===c.id);
 if(!c.penaltyRange||!Number.isFinite(Number(c.penaltyRange.max)))continue;
 if(c.id==='v15-brb4-9b')continue; // BrB 4:9 b är självt ett förberedelsebrott.
 for(const t of ['forsok','forberedelse','stampling'])assert.ok(st.some(s=>s.stageType===t),'förstadiekort saknas: '+t+' '+c.id);
 for(const s of st)assert.ok(['punishable','not-criminalized'].includes(s.stageStatus),'oklart förstadium: '+s.id);
}
const F=W.BK_FU18;
const fs1=byId['stadium-08-forsok-stold']||crimes.find(c=>c.stageParentId==='stold'&&c.stageType==='forsok');
assert.equal(fs1.stageStatus,'punishable');assert.equal(F.classify(fs1).klass,F.classify(byId.stold).klass,'försök till stöld följer stöld');
const frs=crimes.find(c=>c.stageParentId==='ringa-stold'&&c.stageType==='forsok');
assert.equal(frs.stageStatus,'not-criminalized');assert.equal(F.classify(frs),null,'falska kort har ingen FU-ledning');
for(const s of crimes.filter(c=>c.stageStatus==='punishable'&&c.fuParent20)){
 const a=F.classify(s),b=F.classify(s.fuParent20);assert.equal(a&&a.klass,b&&b.klass,'förstadiet ärver FU-klass: '+s.id);
}
assert.equal(byId['stadium-20-forsok-v20-illegal-abort'].stageStatus,'punishable');
assert.equal(byId['stadium-20-forberedelse-v20-illegal-abort'].stageStatus,'not-criminalized');
assert.equal(byId['stadium-20-forberedelse-v20-grovt-fornminnesbrott'].stageStatus,'punishable');

// Preskription (BrB 35 kap. i lydelse från 2025-04-01).
const P=W.BK_PRESK20,pc=id=>P.compute(byId[id]);
assert.deepEqual([P.yearsFor(0),P.yearsFor(1),P.yearsFor(2),P.yearsFor(5),P.yearsFor(6),P.yearsFor(8),P.yearsFor(10),P.yearsFor(18,true)],[2,2,5,10,15,15,25,25]);
assert.equal(pc('stold').years,5);assert.equal(pc('stold').absolute,15);
assert.equal(pc('ringa-stold').years,2);assert.equal(pc('ran').years,15);assert.equal(pc('ran').absolute,30);
assert.equal(pc('traffic16-0').absolute,5,'bötesbrott: absolut preskription fem år');
assert.ok(pc('v03-mord').never&&pc('v03-drap').never&&pc('v03-valdtakt-mot-barn').never);
assert.ok(pc('v03-valdtakt').neverIfChild&&pc('v03-valdtakt').childStart);
assert.equal(pc('v09-skatteforseelse').years,5,'skattebrottslagen 14 §');
assert.equal(P.compute(frs),null,'falska förstadiekort har ingen preskription');
const T='2026-11-14',ck=(id,o)=>P.check(byId[id],{today:T,...o});
assert.equal(ck('stold',{crime:'2024-06-01'}).end,'2029-06-01');assert.equal(ck('stold',{crime:'2024-06-01'}).status,'ok');
assert.equal(ck('ringa-stold',{crime:'2024-06-01'}).status,'out');
assert.equal(ck('stold',{crime:'2022-01-10'}).status,'soon');
assert.equal(ck('ran',{crime:'2012-01-01'}).status,'out','äldre regler: tio år för rån gick ut före 2025-04-01');
assert.equal(ck('ran',{crime:'2016-01-01'}).end,'2031-01-01','nya regler gäller brott som inte var preskriberade 2025-04-01');
assert.equal(ck('v03-valdtakt',{crime:'2015-01-01',child:true}).status,'never');
assert.equal(ck('v03-sexuellt-ofredande',{crime:'2020-01-01',child:true,eighteen:'2026-05-01'}).end,'2031-05-01');
assert.equal(ck('stold',{crime:'2030-01-01'}).status,'none');
assert.equal(ck('stold',{crime:'2024-02-29'}).end,'2029-02-28','skottdag');
assert.ok(P.html(byId.stold).includes('data-presk20="crime"'));

// Närliggande brott och kommande lagändringar.
const N=W.BK_NEAR20;
for(const g of N.GROUPS){assert.ok(g.items.length>=3,g.name);for(const [id,text] of g.items){assert.ok(byId[id]&&!byId[id].stageType,'okänt kort i grupp '+g.name+': '+id);assert.ok(text.length>10&&text.endsWith('.'),id);}}
const fn=N.find(byId.stold);
assert.ok(fn.grades.some(x=>x.id==='ringa-stold')&&fn.grades.some(x=>x.id==='grov-stold'),'grader av stöld');
assert.ok(fn.groups[0].items.some(i=>i.card.id==='v03-egenmaktigt-forfarande')&&!fn.groups[0].items.some(i=>i.card.id==='stold'));
assert.ok(N.html(byId.stold).includes('data-open="v03-forskingring"'));
assert.ok(N.find(fs1).isStage&&N.html(fs1).includes('Fullbordat brott'));
for(const u of N.UPCOMING){assert.match(u.date,/^\d{4}-\d{2}-\d{2}$/);for(const id of u.ids)assert.ok(byId[id],'okänt kort i kommande lagändring: '+id);}
assert.equal(N.upcoming(byId['v19-folkbokforingsbrott'],'2026-11-14').length,1);
assert.equal(N.upcoming(byId['v19-folkbokforingsbrott'],'2026-12-01').length,0,'raden försvinner när ändringen har trätt i kraft');
assert.equal(N.upcoming(byId.stold,'2026-11-14').length,0);

// Lagbevakningen omfattar alla lagar som har kort i special19.
const src=new Set(JSON.parse(read('data/law-sources.json')).sources.map(s=>s.sfs));
for(const f of fs.readdirSync(path.join(root,'data/special19')).filter(f=>f.endsWith('.txt')))
 for(const m of read('data/special19/'+f).matchAll(/^LAW [^|]+\|[^|]+\|\s*(\d{4}):(\d+)\s*\|/gm))assert.ok(src.has(m[1]+'-'+m[2]),'lagen bevakas inte: '+m[1]+':'+m[2]);
console.log('v20_test OK',base.length,'grundkort',crimes.length,'kort');

// 2.1: kort för alla återstående författningar, andra läsningen av rekvisiten och preskription för villkorade straffskalor.
assert.ok(base.length>=1090,'2.1: minst 1 090 grundkort: '+base.length);
assert.ok(base.filter(c=>c.id.startsWith('v21-')).length>=430,'nya 2.1-kort');
for(const id of ['v21-insiderbrott','v21-marknadsmanipulation','v21-subventionsbrott','v21-tullforseelse','v21-forgripelse-mot-konungen'])assert.ok(byId[id],'kort saknas: '+id);
for(const c of base)assert.ok(P.html(c),'preskription saknas: '+c.id);
const up=byId['v15-cover-upplopp'],bu=P.branches(up);
assert.equal(bu.length,3);assert.equal(bu.map(b=>P.compute(up,b.range).years).join(),'10,5,5');
assert.equal(P.check(up,{crime:'2026-01-01',today:T}).status,'none','gren måste väljas');
assert.equal(P.check(up,{crime:'2026-01-01',today:T,branch:'0'}).end,'2036-01-01');
assert.equal(JSON.stringify(P.scaleRange('Fängelse 10–18 år eller livstid')),'{"max":18,"life":true}');
assert.equal(JSON.stringify(P.scaleRange('Böter')),'{"max":0,"life":false}');
const R=W.BK_REKVISIT19,flat=id=>JSON.stringify(R[id]);
assert.ok(flat('v03-olaga-forfoljelse').includes('oaktsam uppmaning till självmord'),'AP2: olaga förföljelse');
assert.ok(flat('v09-bidragsbrott').includes('frivillig rättelse'),'AP2: bidragsbrott');
assert.ok(!flat('v03-grov-urkundsforfalskning').includes('sedel'),'AP2: sedel är inte urkund');
assert.ok(flat('v15-inventory-22-1').includes('BrB 22:4'),'AP2: landsförräderi');
assert.equal(N.upcoming(byId['v21-ellagen-natkoncession'],'2026-11-14').length,1);
console.log('v21 OK',base.length,'grundkort');
