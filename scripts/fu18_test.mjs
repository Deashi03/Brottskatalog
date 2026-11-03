import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const w={};vm.runInNewContext(read('fu-ledning-18.js'),{window:w});
const F=w.BK_FU18;assert.ok(F&&F.release==='1.8.1');

const card=(id,title,shortRef,min,max,extra={})=>({id,title,shortRef,penaltyRange:{min,max},...extra});
const C={
 snatteri:card('ringa-stold','Ringa stöld','BrB 8:2',0,.5),
 grovStold:card('grov-stold','Grov stöld','BrB 8:4',1,6),
 inbrott:card('inbrottsstold','Inbrottsstöld','BrB 8:4 a',1,6),
 misshandel:card('misshandel','Misshandel','BrB 3:5',0,2),
 grovMiss:card('grov-misshandel','Grov misshandel','BrB 3:6',1.5,7),
 mord:card('v03-mord','Mord','BrB 3:1',10,18,{penaltyRange:{min:10,max:18,life:true},age14Exception15:{status:'minimum-threshold-met'}}),
 valdtakt:card('v03-valdtakt','Våldtäkt','BrB 6:1',3,6),
 valdtaktBarn:card('v03-valdtakt-mot-barn','Våldtäkt mot barn','BrB 6:4',3,6),
 sexOfr:card('v03-sexuellt-ofredande','Sexuellt ofredande','BrB 6:10',0,2),
 sexOfrBarn:card('v04-sexuellt-ofredande-mot-barn','Sexuellt ofredande mot barn','BrB 6:10',0,2),
 skadeg:card('skadegorelse','Skadegörelse','BrB 12:1',0,2),
 vht:card('vald-hot-tjansteman','Våld eller hot mot tjänsteman','BrB 17:1',0,3),
 vallande:card('v03-vallande-till-annans-dod','Vållande till annans död','BrB 3:7',0,3),
 ratt:card('rattfylleri','Rattfylleri','TBL 4 §',0,.5),
 vapen:card('vapenbrott','Vapenbrott','VapenL 18:1',0,5),
 grovtVapen:card('grovt-vapenbrott','Grovt vapenbrott','VapenL 18:2',4,7),
 grovtKniv:card('grovt-knivbrott','Grovt brott mot knivlagen','KnivL 4 § st. 3',.5,2),
 ringaNark:card('ringa-narkotikabrott-innehav','Ringa narkotikabrott · innehav','NSL 2 § jfr 1 §',0,.5),
 narkFramst:card('narkotikabrott-framstallning','Narkotikabrott · framställning','NSL 1 § 1 st. 2',0,3),
 smuggel:card('v09-ringa-narkotikasmuggling','Ringa narkotikasmuggling','SmuglL 6',0,.5),
 stage:{id:'forsok-stold',title:'Försök till stöld',stageType:'forsok',shortRef:'BrB 8:1'}
};
// Klassning mot bilagan.
const cls=c=>F.classify(c)?.cls;
assert.equal(cls(C.snatteri),'enkel');assert.equal(cls(C.grovStold),'enkel','Grov stöld står i bilagan');
assert.equal(cls(C.inbrott),'ej','Inbrottsstöld (2021) finns inte i bilagan');
assert.equal(cls(C.misshandel),'enkel');assert.equal(cls(C.grovMiss),'ej');
assert.equal(cls(C.sexOfr),'enkel');assert.equal(cls(C.sexOfrBarn),'ej','Bara 6:10 andra stycket');
assert.equal(cls(C.skadeg),'villkor');assert.equal(cls(C.vht),'villkor');assert.equal(cls(C.vallande),'villkor');
assert.equal(cls(C.ratt),'enkel');assert.equal(cls(C.vapen),'enkel');assert.equal(cls(C.grovtVapen),'ej');assert.equal(cls(C.grovtKniv),'ej');
assert.equal(cls(C.ringaNark),'enkel','Övrig specialstraffrätt högst 6 månader');assert.equal(cls(C.narkFramst),'ej');
assert.equal(cls(C.smuggel),'enkel');assert.match(F.classify(C.smuggel).note,/Tullverket/);
assert.equal(F.classify(C.stage),null,'Förstadier ingår inte i 1.8');
assert.equal(F.assess(C.stage,{}).unsupported,true);

// Kör ett frågeflöde. Frågor som inte finns i answers besvaras med nej; listan över ställda frågor kontrolleras.
const run=(c,answers)=>{const a={},asked=[];for(let i=0;i<20;i++){const r=F.assess(c,a);if(r.result)return {asked,...r.result};const id=r.question.id;
 assert.equal(r.question.kind,'yn',id+': bara ja/nej-frågor');asked.push(id);a[id]=answers[id]??false;}throw new Error('loop');};
const G={gripen:true};

// 1) Snatteri, gripen vuxen: polis, efter förhöret. Bara frågor som kan ändra svaret.
let x=run(C.snatteri,G);
assert.equal(x.lead,'polis');assert.equal(x.when,'Efter förhöret');
assert.deepEqual(x.asked,['gripen','pol','psyk','tvm','svar','ung','forsvarare']);
assert.ok(x.notes.some(n=>/ÅFS 8 § 4/.test(n)),'Anhållande ⇒ åklagaren tar över');
assert.ok(x.sources.some(s=>s.label.startsWith('RB 24:8')));
// 2) Försvararfråga eller ung ⇒ före förhöret.
assert.equal(run(C.snatteri,{...G,forsvarare:true}).when,'Före förhöret');
x=run(C.snatteri,{...G,ung:true});assert.equal(x.when,'Före förhöret');assert.ok(!x.asked.includes('forsvarare'),'Ung ⇒ försvararfrågan behövs inte');
assert.ok(x.notes.some(n=>/delgivningsförhör/.test(n))&&x.notes.some(n=>/14-åring/.test(n)&&/inte fyraårsgränsen/.test(n)));
// 3) Inte enkel + gripen: åklagarledd, före förhöret. Bara gripen och SU-frågan.
x=run(C.grovMiss,G);assert.equal(x.lead,'ak');assert.equal(x.when,'Före förhöret');assert.deepEqual(x.asked,['gripen','pol']);
assert.equal(run(C.inbrott,G).lead,'ak');
// 4) SU: polisanställd ⇒ eget resultat, förhöret hålls inte av patrullen.
x=run(C.grovMiss,{...G,pol:true});assert.equal(x.lead,'su');assert.equal(x.when,'Omedelbart');assert.match(x.whenText,/Håll inte förhör/);assert.match(x.whenText,/RB 24:8/);
x=run(C.snatteri,{gripen:false,misstankt:true,pol:true});assert.equal(x.lead,'su');assert.deepEqual(x.asked,['gripen','misstankt','pol']);
// Bötesbrott: SU bara vid samband med anställningen (5 §).
const boter=card('v03-forargelsevackande-beteende','Förargelseväckande beteende','BrB 16:16',0,0);
assert.equal(run(boter,{...G,pol:true,polTjanst:true}).lead,'su');
x=run(boter,{...G,pol:true,polTjanst:false});assert.equal(x.lead,'polis');assert.ok(x.notes.some(n=>/5 §/.test(n)));
// Trafikbrott som förordningen undantar: SU-frågan ställs inte.
assert.ok(!run(card('traffic16-0','Vårdslöshet i trafik','TBL 1 § första stycket',0,0),G).asked.includes('pol'));
// Ingen misstänkt ⇒ ingen SU-fråga.
assert.ok(!run(C.snatteri,{gripen:false,misstankt:false}).asked.includes('pol'));
// 5) Inte gripen men misstänkt, inte enkel: snarast och före förhör.
x=run(C.grovMiss,{gripen:false,misstankt:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Snarast');assert.match(x.whenText,/före förhör/);
// 6) Ingen misstänkt: polis tills vidare; minimistraff ≥ 4 år ⇒ underrätta genast.
x=run(C.grovMiss,{gripen:false,misstankt:false});assert.equal(x.lead,'polis-tills');assert.equal(x.when,'När någon blir misstänkt');
x=run(C.mord,{gripen:false,misstankt:false});assert.equal(x.lead,'polis-tills');assert.equal(x.when,'Genast');
// ÅFS 7/8 §§ kan ge övertagande även utan misstänkt (t.ex. tvångsmedel).
assert.equal(run(C.mord,{gripen:false,misstankt:false,tvm:true}).lead,'ak');
// 7) Närståendevåld ⇒ åklagarledd även utan misstänkt; efter ja ställs inga fler ledningsfrågor.
x=run(C.misshandel,{gripen:false,misstankt:false,narstaende:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Snarast');
x=run(C.misshandel,{...G,narstaende:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Före förhöret');assert.deepEqual(x.asked,['gripen','pol','narstaende']);
// 8) Sexualbrott mot barn ⇒ åklagare utan åldersfråga; sexualbrott utan misstänkt ⇒ fråga om målsägandens ålder.
assert.equal(run(C.valdtaktBarn,{gripen:false,misstankt:false}).lead,'ak');
assert.equal(run(C.valdtakt,{gripen:false,misstankt:false,mal18:true}).lead,'ak');
assert.equal(run(C.valdtakt,{gripen:false,misstankt:false}).lead,'polis-tills');
// 9) Övertagandefrågor en i taget; första ja avslutar ledningsfrågorna.
for(const id of ['mal15','hat','kf','barn','psyk','tvm','svar']){
 x=run(C.misshandel,{gripen:false,misstankt:true,[id]:true});assert.equal(x.lead,'ak',id);
 const rest=F.TAKEOVER.map(t=>t.id).slice(F.TAKEOVER.findIndex(t=>t.id===id)+1);
 assert.ok(rest.every(r=>!x.asked.includes(r)),id+': inga fler övertagandefrågor efter ja');
}
x=run(C.snatteri,G);assert.ok(!x.asked.includes('mal15')&&!x.asked.includes('hat')&&!x.asked.includes('kf')&&!x.asked.includes('barn'),'Snatteri: inga irrelevanta frågor');
assert.ok(!run(C.ratt,G).asked.includes('hat'));
// 10) Villkor i bilagan.
assert.equal(run(C.skadeg,{...G,villkor:true}).lead,'ak','Genom brand ⇒ inte enkel');
assert.equal(run(C.skadeg,{...G,villkor:false}).lead,'polis');
assert.equal(run(C.vht,{...G,villkor:true}).lead,'ak','Mot polis ⇒ inte enkel');
assert.equal(run(C.vallande,{...G,villkor:false}).lead,'ak','Inte trafikolycka ⇒ inte enkel');
assert.equal(run(C.vallande,{...G,villkor:true}).lead,'polis');
// 11) Polisledd, misstänkt men inte gripen: ingen kontakt nu, underrättelse om unga.
x=run(C.snatteri,{gripen:false,misstankt:true});assert.equal(x.when,'Ingen kontakt nu');assert.ok(x.notes.some(n=>/FUK 2 §/.test(n)));
// 11b) Ingen onödig fråga: för varje fråga kan ja och nej leda till olika resultat.
const sig=r=>r.lead+'|'+r.when+'|'+r.whenText;
for(const c of Object.values(C).filter(c=>!c.stageType)){
 const outs=a=>{const r=F.assess(c,a);if(r.result){assert.ok(['ak','polis','polis-tills','su'].includes(r.result.lead)&&r.result.reasons.length,c.title);return new Set([sig(r.result)]);}
  const q=r.question.id;assert.ok(!(q in a),c.title+': samma fråga två gånger');const y=outs({...a,[q]:true}),n=outs({...a,[q]:false});
  assert.ok(![...y].every(s=>n.has(s))||![...n].every(s=>y.has(s)),c.title+': frågan '+q+' påverkar inte resultatet');return new Set([...y,...n]);};
 outs({});
}
// 12) Renderingen: frågor och resultat, bakåt och börja om.
assert.match(F.render(C.snatteri,{}),/data-fu18-q="gripen"/);
const res=F.render(C.grovMiss,{gripen:true,pol:false});
assert.match(res,/Åklagarledd/);assert.match(res,/Före förhöret/);assert.match(res,/data-fu18="restart"/);assert.match(res,/Inför kontakten/);assert.match(res,/lottning/);
// Källor: ÅFS-länken pekar på Åklagarmyndighetens konsoliderade version.
assert.ok(Object.values(F.SOURCES).every(s=>/^https:\/\/(www\.aklagare\.se|data\.riksdagen\.se)\//.test(s.url)));
// Inkoppling.
assert.ok(html.includes('<script src="./fu-ledning-18.js"></script>')&&html.indexOf('fu-ledning-18.js')>html.indexOf('prosecution-171.js'));
assert.ok(html.includes('data-action="fu18"')&&html.includes("if(action==='fu18'){showFu18(byId[id]);return;}"));
assert.ok(html.includes("accordion('fu18','FU-ledning och åklagarkontakt'")&&html.indexOf("accordion('fu18'")>html.indexOf("accordion('tvang'"),'1.8.1: egen meny direkt under Tvångsmedel');
assert.ok(!html.slice(html.indexOf('function coerciveSection'),html.indexOf('function alternativesSection')).includes('fu18'),'Inte inne i Tvångsmedel-menyn');
assert.ok(sw.includes('./fu-ledning-18.js'));
console.log('PASS 1.8.1 FU-ledning: klassning mot ÅFS-bilagan, frågeflöden, hoppregler, åklagarkontakt och inkoppling');
