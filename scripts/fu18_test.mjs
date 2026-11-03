import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const w={};vm.runInNewContext(read('fu-ledning-18.js'),{window:w});
const F=w.BK_FU18;assert.ok(F&&F.release==='1.8');

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

// Kör ett frågeflöde med givna svar. Kastar om en fråga ställs som inte har ett svar.
const run=(c,answers)=>{const a={},asked=[];for(let i=0;i<12;i++){const r=F.assess(c,a);if(r.result)return {asked,...r.result};const id=r.question.id;
 assert.ok(id in answers,c.title+': oväntad fråga '+id+' efter '+asked.join(','));asked.push(id);a[id]=answers[id];}throw new Error('loop');};
const adultGripen={gripen:true,narstaende:false,rare:[],ung:false,forsvarare:false};

// 1) Snatteri, gripen vuxen utan försvararfråga: polis, efter förhöret. 4 frågor.
let x=run(C.snatteri,adultGripen);
assert.equal(x.lead,'polis');assert.equal(x.when,'Efter förhöret');assert.deepEqual(x.asked,['gripen','rare','ung','forsvarare']);
assert.ok(x.notes.some(n=>/ÅFS 8 § 4/.test(n)),'Anhållande ⇒ åklagaren tar över');
assert.ok(x.sources.some(s=>s.label.startsWith('RB 24:8')));
// 2) Försvararfråga eller ung ⇒ före förhöret.
assert.equal(run(C.snatteri,{...adultGripen,forsvarare:true}).when,'Före förhöret');
x=run(C.snatteri,{...adultGripen,ung:true});assert.equal(x.when,'Före förhöret');assert.ok(!x.asked.includes('forsvarare'),'Ung ⇒ försvararfrågan behövs inte');
assert.ok(x.notes.some(n=>/delgivningsförhör/.test(n))&&x.notes.some(n=>/14-åring/.test(n)&&/inte gränsen/.test(n)));
// 3) Inte enkel + gripen: åklagarledd, före förhöret, bara en fråga.
x=run(C.grovMiss,{gripen:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Före förhöret');assert.deepEqual(x.asked,['gripen']);
x=run(C.inbrott,{gripen:true});assert.equal(x.lead,'ak');
// 4) Inte gripen men misstänkt, inte enkel: snarast och före förhör.
x=run(C.grovMiss,{gripen:false,misstankt:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Snarast');assert.match(x.whenText,/före förhör/);
// 5) Ingen misstänkt: polis tills vidare; minimistraff ≥ 4 år ⇒ underrätta genast.
x=run(C.grovMiss,{gripen:false,misstankt:false,narstaende:false});assert.equal(x.lead,'polis-tills');assert.equal(x.when,'När någon blir misstänkt');
x=run(C.mord,{gripen:false,misstankt:false,narstaende:false});assert.equal(x.lead,'polis-tills');assert.equal(x.when,'Genast');
// 6) Närståendevåld ⇒ åklagarledd även utan misstänkt.
x=run(C.misshandel,{gripen:false,misstankt:false,narstaende:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Snarast');
x=run(C.misshandel,{gripen:true,narstaende:true});assert.equal(x.lead,'ak');assert.equal(x.when,'Före förhöret');assert.deepEqual(x.asked,['gripen','narstaende']);
// 7) Sexualbrott mot barn ⇒ åklagare utan frågor om ålder; sexualbrott utan misstänkt ⇒ fråga om målsägandens ålder.
x=run(C.valdtaktBarn,{gripen:false,misstankt:false});assert.equal(x.lead,'ak');
x=run(C.valdtakt,{gripen:false,misstankt:false,narstaende:false,mal18:true});assert.equal(x.lead,'ak');
x=run(C.valdtakt,{gripen:false,misstankt:false,narstaende:false,mal18:false});assert.equal(x.lead,'polis-tills');
// 8) Undantag från polisledning (flerval): målsägande under 15, hatbrott, polisanställd, kontaktförbud.
for(const id of ['mal15','hat','pol','kf','tvm']){x=run(C.misshandel,{gripen:false,misstankt:true,narstaende:false,rare:[id]});assert.equal(x.lead,'ak',id);}
const opts=c=>{let a={gripen:false,misstankt:true,narstaende:false,villkor:false};let r;for(let i=0;i<6;i++){r=F.assess(c,a);if(r.question?.id==='rare')return r.question.options.map(o=>o.id);a[r.question.id]=a[r.question.id]??false;}};
assert.ok(opts(C.misshandel).includes('mal15')&&opts(C.misshandel).includes('hat'));
assert.ok(!opts(C.snatteri).includes('mal15')&&!opts(C.snatteri).includes('hat'),'Snatteri: inga irrelevanta alternativ');
assert.ok(!opts(C.ratt).includes('hat'));
// 9) Villkor i bilagan.
assert.equal(run(C.skadeg,{gripen:true,villkor:true}).lead,'ak','Genom brand ⇒ inte enkel');
assert.equal(run(C.skadeg,{...adultGripen,villkor:false}).lead,'polis');
assert.equal(run(C.vht,{gripen:true,villkor:true}).lead,'ak','Mot polis ⇒ inte enkel');
assert.equal(run(C.vallande,{gripen:true,villkor:false}).lead,'ak','Inte trafikolycka ⇒ inte enkel');
assert.equal(run(C.vallande,{...adultGripen,villkor:true}).lead,'polis');
// 10) Polisledd, misstänkt men inte gripen: ingen kontakt nu, underrättelse om unga.
x=run(C.snatteri,{gripen:false,misstankt:true,rare:[]});assert.equal(x.when,'Ingen kontakt nu');assert.ok(x.notes.some(n=>/FUK 2 §/.test(n)));
// 11) Aldrig fler än 5 frågor och aldrig samma fråga två gånger i något fall ovan.
for(const c of Object.values(C).filter(c=>!c.stageType))for(const ans of [adultGripen,{gripen:false,misstankt:true,narstaende:false,rare:[],villkor:false,mal18:false},{gripen:false,misstankt:false,narstaende:false,villkor:false,mal18:false}]){
 const r=run(c,{villkor:false,mal18:false,...ans});assert.ok(r.asked.length<=5,c.title);assert.equal(new Set(r.asked).size,r.asked.length);
 assert.ok(['ak','polis','polis-tills'].includes(r.lead)&&r.when&&r.whenText&&r.reasons.length,c.title);}
// 12) Renderingen: frågor och resultat, bakåt och börja om.
assert.match(F.render(C.snatteri,{}),/data-fu18-q="gripen"/);
const res=F.render(C.grovMiss,{gripen:true});
assert.match(res,/Åklagarledd/);assert.match(res,/Före förhöret/);assert.match(res,/data-fu18="restart"/);assert.match(res,/Inför kontakten/);assert.match(res,/lottning/);
// Källor: ÅFS-länken pekar på Åklagarmyndighetens konsoliderade version.
assert.ok(Object.values(F.SOURCES).every(s=>/^https:\/\/(www\.aklagare\.se|data\.riksdagen\.se)\//.test(s.url)));
// Inkoppling.
assert.ok(html.includes('<script src="./fu-ledning-18.js"></script>')&&html.indexOf('fu-ledning-18.js')>html.indexOf('prosecution-171.js'));
assert.ok(html.includes('data-action="fu18"')&&html.includes("if(action==='fu18'){showFu18(byId[id]);return;}"));
assert.ok(html.indexOf("const fu18=window.BK_FU18")>html.indexOf('function coerciveSection'),'Startknappen ligger i Tvångsmedel-menyn');
assert.ok(sw.includes('./fu-ledning-18.js'));
console.log('PASS 1.8 FU-ledning: klassning mot ÅFS-bilagan, frågeflöden, hoppregler, åklagarkontakt och inkoppling');
