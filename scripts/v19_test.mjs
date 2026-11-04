import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
// 1.9: ny rekvisitvy, domrubricering, tvångsmedelsrättelser och nya brottskort.
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
for(const f of ['./rekvisit-19.js','./definitioner-19.js','./typexempel-19.js','./rekvisit-19-view.js','./special-19.js','./rubricering-19.js','./coercive-19.js']){
 assert.ok(scripts.includes(f),'index laddar '+f);assert.ok(sw.includes(f),'service worker cachar '+f);
}
assert.ok(scripts.indexOf('./special-19.js')>scripts.indexOf('./fu-ledning-18.js')&&scripts.indexOf('./special-19.js')>scripts.indexOf('./prosecution-171.js'));
assert.ok(scripts.indexOf('./coercive-19.js')>scripts.indexOf('./decisions-10.js'));
assert.ok(html.includes("window.BK_RELEASE = '1.9.0';")&&sw.includes("'brottskatalog-v190-20261104'"));
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const s of scripts)vm.runInContext(read(s),ctx,{filename:s});
const W=ctx.window;
const crimes=W.BK_DATA.crimes.filter(W.BK_CATALOG_SELECTION15.included)
 .concat((W.BK_TRAFFIC16.entries||[]).filter(c=>!W.BK_DATA.crimes.some(x=>x.title.toLocaleLowerCase('sv')===c.title.toLocaleLowerCase('sv'))))
 .concat(W.BK_SPECIAL19.entries);
crimes.forEach(W.BK_RUBRICERING19.apply);
const byId=Object.fromEntries(crimes.map(c=>[c.id,c]));
const base=crimes.filter(c=>!c.stageType),R=W.BK_REKVISIT19,X=W.BK_TYPEX19,D=W.BK_DEF19;

// Varje grundkort har strukturerade rekvisit och ett till två typexempel (högst tre vid speciallag med flera former).
const textOf=d=>JSON.stringify(d);
for(const c of base){
 const d=R[c.id];assert.ok(d,'rekvisit saknas: '+c.id);
 assert.ok((d.f&&d.f.length)||(d.g&&d.r),'tomma rekvisit: '+c.id);
 if(d.g)assert.ok(byId[d.g]&&R[d.g],'grundbrott saknas för '+c.id+': '+d.g);
 const ex=X[c.id];assert.ok(ex&&ex.length>=1&&ex.length<=(c.added19?3:2),'typexempel: '+c.id);
 assert.ok(['typ','form'].includes(ex[0][0]),'första exemplet ska vara typexemplet: '+c.id);
 const t=textOf(d)+textOf(ex);
 assert.ok(!/brott som anges i lagtexten/i.test(t),'förbjuden formulering: '+c.id);
 for(const m of t.matchAll(/\{\{([^}|]+)/g))assert.ok(D[m[1]],'definition saknas: '+m[1]+' i '+c.id);
}
// Inga rekvisit utan kort.
const ids=new Set(crimes.map(c=>c.id));
for(const k of Object.keys(R))assert.ok(ids.has(k),'rekvisit utan kort: '+k);

// Nya kort: fullständiga, rubricerade, ordagrann lagtext offline, åtalsregel och FU-klassning.
const S=W.BK_SPECIAL19.entries,P=W.BK_PROSECUTION171,F=W.BK_FU18;
assert.ok(S.length>=160,'nya kort: '+S.length);
const titles=new Set();
for(const c of S){
 assert.ok(!titles.has(c.title.toLocaleLowerCase('sv')),'dubbel titel: '+c.title);titles.add(c.title.toLocaleLowerCase('sv'));
 assert.ok(!W.BK_DATA.crimes.some(x=>!x.stageType&&W.BK_CATALOG_SELECTION15.included(x)&&x.title.toLocaleLowerCase('sv')===c.title.toLocaleLowerCase('sv')),'finns redan: '+c.title);
 assert.ok(c.category&&c.aliases.length&&c.shortRef&&c.ref,'metadata: '+c.id);
 const r=c.penaltyRange;assert.ok(Number.isFinite(r.min)&&Number.isFinite(r.max)&&r.min<=r.max,'straffskala: '+c.id);
 assert.ok(!(r.max===0&&!/böter/i.test(c.penalty)),'skala utan straff: '+c.id);
 assert.ok(!/penningböter/i.test(c.penalty),'endast penningböter ska inte vara med: '+c.id);
 assert.ok(r.max===0||/fängelse/i.test(c.penalty),'fängelse i texten: '+c.id);
 assert.ok(W.BK_STATUTES[c.statute]&&c.law.length>40&&c.lawMode==='full'&&c.lawCompletenessVerified,'lagtext: '+c.id);
 assert.ok(/^\d+ (?:[a-z] )?§ /.test(c.law),'lagtexten börjar med paragrafnummer: '+c.id);
 const v=P.view(c,id=>byId[id]);assert.ok(v.key&&P.rules[v.key],'åtalsregel: '+c.id);
 assert.ok(W.BK_STATUTES[v.law],'åtalsregelns lagrum offline: '+c.id+' '+v.law);
 const k=F.classify(c);assert.ok(k&&['enkel','ej','villkor'].includes(k.cls)&&k.row,'FU-klass: '+c.id);
 if(r.max<=0.5&&k.cls==='ej'&&!/^BrB/.test(c.shortRef))assert.fail('högst sex månader ska vara enkel: '+c.id);
}
// Exempel på exakt domrubricering och straffskala.
const t=x=>S.find(c=>c.title===x);
for(const [title,min,max] of [['Grov hets mot folkgrupp',0.5,4],['Ringa hets mot folkgrupp',0,0],['Brott mot rättegångsbalken (fotoförbud)',0,0.5],
 ['Vårdslöshet med narkotika',0,1],['Överträdelse av kontaktförbud',0,1],['Överträdelse av utvidgat eller särskilt utvidgat kontaktförbud',0,2],
 ['Olovlig försäljning av alkohol, grovt brott',0.5,6],['Grovt jaktbrott',0.5,4],['Brott mot djurskyddslagen',0,2],['Grovt miljöbrott',0.5,6],
 ['Grovt sjöfylleri',0,2],['Människosmuggling',0,2],['Grovt folkbokföringsbrott',0,2],['Terroristbrott',4,18],['Folkmord',4,18],['Olaga taxitrafik',0,1]]){
 const c=t(title);assert.ok(c,'saknas: '+title);assert.equal(c.penaltyRange.min,min,title);assert.equal(c.penaltyRange.max,max,title);
}
assert.equal(t('Terroristbrott').penaltyRange.life,true);
assert.equal(t('Överträdelse av kontaktförbud').penaltyRange.fines,false,'normalgraden saknar böter');
// FU: bilagan till ÅFS 2005:9.
assert.equal(F.classify(t('Jaktbrott')).cls,'enkel');assert.equal(F.classify(t('Grovt jaktbrott')).cls,'ej');
assert.equal(F.classify(t('Brukande av osann urkund')).cls,'enkel');
assert.equal(F.classify(t('Dopningsbrott')).cls,'villkor');assert.equal(F.classify(t('Människosmuggling')).cls,'ej');
assert.equal(F.classify(t('Nedskräpning')).cls,'enkel');assert.equal(F.classify(t('Grovt sjöfylleri')).cls,'enkel');
// Åtal: upphovsrätt och varumärken kräver att åtal är motiverat från allmän synpunkt, inte angivelse.
for(const x of ['Upphovsrättsbrott','Varumärkesbrott']){const v=P.view(t(x),id=>byId[id]);assert.equal(v.tone,'yellow');assert.match(v.status,/allmän synpunkt/);}
assert.equal(P.view(t('Miljöbrott'),id=>byId[id]).law,'MB:29:11');

// Domrubricering: grader utan egen beteckning skrivs som på domen; gamla titeln finns kvar som sökord.
const rm=byId['ringa-misshandel'];assert.equal(rm.title,'Misshandel, ringa brott');assert.ok(rm.aliases.includes('Ringa misshandel'));
assert.equal(byId['vapenbrott-oaktsamt'].title,'Vapenbrott (oaktsamhet)');
assert.ok(crimes.some(c=>c.stageType&&c.title==='Försök till förgöring, grovt brott'));
// Granskningsmodulerna ser lagens ursprungliga titlar innan appen startar.
const fresh=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],fresh);for(const s of scripts)vm.runInContext(read(s),fresh,{filename:s});
assert.equal(fresh.window.BK_DATA.crimes.find(c=>c.id==='ringa-misshandel').title,'Ringa misshandel');

// Vyn: inga extramenyer, flikar, gemensamma rader, grundbrott och förstadier enligt BrB 23 kap.
assert.ok(!/gradeReviewBody|limitsReviewBody|reformNoteBody|requisiteConceptButtons|class=\"requisite-explanations smuggling-limits/.test(html),'gamla extramenyer borttagna');
const V=W.BK_RQ19;
const h1=V.render(byId['v19-dopningsbrott'],id=>byId[id]);
assert.ok(h1.includes('data-rq-tabs')&&h1.includes('rq-common')&&h1.includes('data-rq-def="narkotika"')===false);
const h2=V.render(byId['grov-misshandel'],id=>byId[id]);assert.ok(h2.includes('rq-base')&&h2.includes('Grovt brott'));
const h3=V.render(byId['v19-ol-idrottsarrangemang'],id=>byId[id]);assert.ok(h3.indexOf('t-plats')<h3.indexOf('data-rq-tabs'),'gemensam plats ovanför flikarna');
const st=crimes.find(c=>c.stageType==='forsok'&&c.stageStatus==='punishable');
assert.ok(V.render(st,id=>byId[id]).includes('Utförandet av brottet har påbörjats'));
assert.ok(V.render(byId['v09-tullbrott'],id=>byId[id]).includes('SmuglL 15 §'),'frivillig rättelse i smuggling');
for(const c of base.slice(0,400))assert.ok(!/undefined|\[object/.test(V.render(c,id=>byId[id])),'renderingsfel: '+c.id);

// Tvångsmedel: hämtning, kvarhållande av försändelse, RB 28:14–14 b och tidsgränser i RB 28:13 a.
const C=W.BK_COERCIVE,e=id=>C.entries.find(x=>x.id===id);
assert.ok(e('hamtning')&&e('hamtning').ref==='RB 23:7'&&/tio mil/.test(e('hamtning').info));
assert.equal(C.decisionPaths(e('hamtning')).map(x=>x.id).join(),'fu,fid');
assert.ok(e('kvarhallande-forsandelse')&&e('kvarhallande-forsandelse').ref==='RB 27:9');
assert.equal(C.decisionPaths(e('kvarhallande-forsandelse')).map(x=>x.id).join(),'court');
assert.equal(e('daktning').ref,'RB 28:14–14 b');assert.match(e('daktning').info,/röstprov/);
assert.match(e('visitation').info,/tre timmar/);assert.match(e('besiktning').info,/sex timmar/);
assert.equal(C.score(t('Grovt folkbokföringsbrott'),e('kvarhallande-forsandelse')).tone,'yes');
console.log('PASS 1.9: '+base.length+' grundkort med rekvisit och typexempel, '+S.length+' nya kort med lagtext, åtal och FU-klass, domrubricering, ny vy och tvångsmedel');
