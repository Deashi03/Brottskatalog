import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js'),manifest=read('manifest.webmanifest');

// Syntetiska kort: verifierade grundbrott och deras förstadier.
const base=(id,title,min,max,extra={})=>({id,title,penaltyRange:{min,max,fines:min===0,life:!!extra.life},penaltyRangeVerified:true,...extra});
const stage=(type,parent,extra={})=>({id:type+'-'+parent.id,title:type+' '+parent.title,stageType:type,stageStatus:'punishable',
 stageParentId:parent.id,stageParentMin:parent.penaltyRange.min,stageParentMax:parent.penaltyRange.max,stageParentLife:!!parent.penaltyRange.life,
 stageSource:'BrB 23',stageReviewDate:'2026-10-13',penaltyRange:{min:0,max:parent.penaltyRange.max,fines:true},...extra});
const stold=base('stold','Stöld',0,2),ringa=base('ringa','Ringa stöld',0,.5),mord=base('mord','Mord',10,18,{life:true}),
 valdtakt=base('valdtakt','Våldtäkt',3,6),ran=base('ran','Rån',1.5,6),ett=base('ett','Ettårsbrott',0,1),
 okand=base('okand','Okänd skala',0,2,{penaltyRangeVerified:null}),krig=base('krig','Krigsbrott',0,10,{applicabilityConditional:true}),
 frid=base('frid','Grov fridskränkning',1,6),utpr=base('utpr','Utpressning',0,3),data=base('data','Dataintrång',0,2);
const fs1=stage('forsok',stold,{stagePenaltyLower:'Böter',stagePenaltyUpper:'2 år',penalty:'Böter – högst 2 år'});
const fb1=stage('forberedelse',stold,{stagePenaltyLower:'Böter',stagePenaltyUpper:'Under 2 år',penalty:'Böter eller fängelse, lägre än 2 år och högst 2 år'});
const fm=stage('forsok',mord,{stagePenaltyLower:'1 mån',stagePenaltyUpper:'18 år / livstid'});
const fbm=stage('forberedelse',mord,{stagePenaltyLower:'1 mån',stagePenaltyUpper:'Under livstid',penalty:'Böter eller fängelse högst 18 år'});
const fv=stage('forsok',valdtakt,{stagePenaltyLower:'1 mån',stagePenaltyUpper:'6 år'});
const fbett=stage('forberedelse',ett,{stagePenaltyLower:'Böter',stagePenaltyUpper:'Under 1 år'});
const fokand=stage('forsok',okand,{stagePenaltyLower:'Böter',stagePenaltyUpper:'2 år'});
const fkrig=stage('forsok',krig,{applicabilityConditional:true});
const fu=stage('forsok',utpr,{stagePenaltyLower:'Böter',stagePenaltyUpper:'3 år',stageExplanation:'Böter kan ingå. Begränsning: BrB 9:11: det särskilda undantaget från reglerna om frivilligt tillbakaträdande i 23:3 gäller för försök till utpressning.'});
const fd=stage('forsok',data,{stagePenaltyLower:'Böter',stagePenaltyUpper:'2 år',stageExplanation:'Böter kan ingå enligt BrB 23:1.'});
const ej={id:'ej',title:'Försök till ringa stöld',stageType:'forsok',stageStatus:'not-criminalized',stageParentId:'ringa'};
const crimes=[stold,ringa,mord,valdtakt,ran,ett,okand,krig,frid,utpr,data,fs1,fb1,fm,fbm,fv,fbett,fokand,fkrig,fu,fd,ej,
 base('vadd','Vållande till annans död',0,3,{penaltyNote:'Straffskala enligt brottsbalken.'})];
const w={BK_DATA:{crimes,categories:['Alla']}};
const ctx={window:w};
vm.runInNewContext(read('coercive-07.js'),ctx);
vm.runInNewContext(read('coercive-09.js'),ctx);
vm.runInNewContext(read('coercive-safety-15.js'),ctx);
vm.runInNewContext(read('v17-legal-screen.js'),ctx);
const S=w.BK_SCREEN17,R=w.BK_COERCIVE;
assert.ok(S&&S.release==='1.7');
const a=c=>S.custody(c);

// J1: förstadier prövas mot fullbordat brotts skala; "ej verifierat" blir aldrig ett nej.
assert.equal(a(fs1).ordinary,true,'Försök till stöld: RB 24:1 via fullbordat brott (BrB 23:1)');
assert.equal(a(fs1).onlyVia24_2,false);
assert.equal(a(fb1).ordinary,true,'Förberedelse till stöld: under 2 år ⇒ fängelse i ett år eller mer föreskrivet');
assert.equal(a(fv).ordinary,true,'Försök till våldtäkt');
assert.equal(a(fbett).ordinary,false,'Förberedelse till brott med max 1 år: under 1 år');
assert.equal(a(fokand).ordinary,null,'Ej verifierad föräldraskala ⇒ null, inte false');
assert.equal(a(fokand).onlyVia24_2,false);
assert.equal(a(okand).ordinary,null);
assert.equal(S.label(okand),'Straffskala ej verifierad – kontrollera');
assert.equal(S.label(fokand),'Straffskala ej verifierad – kontrollera');
assert.equal(a(fkrig).ordinary,null);assert.equal(a(fkrig).exceptional,null);
assert.equal(a(ringa).ordinary,false);assert.equal(S.label(ringa),'Endast särskild grund (RB 24:2)');
assert.equal(a(stold).ordinary,true);assert.equal(S.label(stold),'Häktning kan vara möjlig');
// Presumtion ⇒ huvudregel
for(const c of crimes){const x=a(c);if(x.presumption===true)assert.equal(x.ordinary,true,c.title);}
assert.equal(a(fm).presumption,true);assert.equal(a(fbm).presumption,true);
assert.equal(a(fv).presumption,false,'Försök till våldtäkt: minimum 3 år < 4 år');
assert.equal(a(ran).presumption,true);assert.equal(a(ran).privileged,'');
assert.equal(a(frid).presumption,true);
// J3: privilegierad skala
assert.match(a(valdtakt).privileged,/mindre grovt/i);
assert.equal(S.label(valdtakt),'Häktningspresumtion – ej vid mindre grovt fall');
// Envarsgripande: fängelse kan följa
assert.equal(a(stold).arrestByAnyone,true);assert.equal(a(fokand).arrestByAnyone,null);
assert.equal(a(ej).notPunishable,true);assert.equal(S.label(ej),'Ej straffbart');

// J2: tvångsmedel utan straffskalegräns är aldrig "ej verifierat"; förstadier via fullbordat brott.
const entry=id=>R.entries.find(e=>e.id===id);
for(const id of ['beslag','medtagande-plats','bevara','publik','kvarstannande'])
 assert.notEqual(R.score(fs1,entry(id)).tone,'unknown',id+' saknar straffskalekrav');
assert.equal(R.score(fs1,entry('visitation')).tone,'yes','Kroppsvisitation: fängelse kan följa');
assert.equal(R.score(fs1,entry('brottslokal')).tone,'yes','RB 28:3: ett år eller mer');
assert.equal(R.score(fs1,entry('grupp')).tone,'no','RB 23:8 a: kräver minimistraff 4 år');
assert.equal(R.score(fm,entry('grupp')).tone,'yes','RB 23:8 a omfattar försök');
assert.equal(R.score(fbm,entry('grupp')).tone,'no','RB 23:8 a omfattar inte förberedelse');
assert.equal(R.score(fokand,entry('visitation')).tone,'unknown');
assert.equal(R.score(ej,entry('visitation')).tone,'no');

// J6: förstadiernas straffskaletext är entydig och följer detaljvyn.
assert.equal(fs1.penalty,'Böter eller fängelse högst 2 år');
assert.equal(fb1.penalty,'Böter eller fängelse under 2 år');
assert.equal(fbm.penalty,'Fängelse 1 mån – under livstid');
assert.equal(fbm.penaltyShort,'F 1 mån–< livstid');
for(const c of crimes.filter(c=>c.stageType&&c.penalty)){
 assert.ok(!/lägre än .* och högst/.test(c.penalty),c.title);
 if(/^böter/i.test(c.penalty))assert.notEqual(c.penaltyRange?.fines,false,c.title);
}
// J4/J5
assert.match(fd.stageExplanation,/BrB 4:10: straffbart endast om gärningen inte skulle ha varit att anse som ringa/);
assert.match(fu.stageExplanation,/ger inte ansvarsfrihet/);
assert.ok(!/det särskilda undantaget/.test(fu.stageExplanation));
assert.match(crimes.at(-1).penaltyNote,/ringa döms till böter/);

// Inkoppling, versioner, källor
assert.ok(html.includes('<script src="./v17-legal-screen.js"></script>'));
assert.ok(html.indexOf('v17-legal-screen.js')>html.indexOf('coercive-safety-15.js'));
assert.ok(html.includes("window.BK_RELEASE = '1.7';"));
assert.ok(!html.includes('1.6.2'),'Ingen kvarglömd 1.6.2-version i index.html');
assert.ok(html.includes("card('Envarsgripande','RB 24:7 andra stycket'"));
assert.ok(html.includes('ⓘ = ej verifierat'));
assert.ok(sw.includes("'brottskatalog-v17-20261026'")&&sw.includes('./v17-legal-screen.js'));
assert.match(manifest,/Brottskatalog 1\.7/);
for(const f of fs.readdirSync(root).filter(f=>/\.(js|html)$/.test(f)))
 assert.ok(!read(f).includes('sfs-1942-740framtagen'),'Trasig RB-länk i '+f);
const t={BK_DATA:{categories:['Alla'],crimes:[]}};vm.runInNewContext(read('traffic-16.js'),{window:t});
for(const x of t.BK_TRAFFIC16.entries)assert.match(x.prosecutionRule,/RB 20:3/);
for(const title of ['Onödigt hindrande av trafik','Tillåtande av olovlig körning','Smitning från trafikolycksplats','Grov smitning från trafikolycksplats']){
 const x=t.BK_TRAFFIC16.entries.find(e=>e.title===title);assert.ok(x.descriptiveTitle17&&/Beskrivande sökbenämning/.test(x.penaltyNote),title);
}
// Offline-lagtext: felaktiga maskinimporterade nycklar tas bort (kontrollerat mot data.riksdagen.se).
const st={BK_STATUTES:{'BrB:23:12':{text:'x'},'BrB:4:24':{text:'x'},'BrB:8:1':{text:'1 §'}}};
vm.runInNewContext(read('statute-corrections-17.js'),{window:st});
assert.ok(!st.BK_STATUTES['BrB:23:12']&&!st.BK_STATUTES['BrB:4:24']&&st.BK_STATUTES['BrB:8:1']);
assert.equal(st.BK_STATUTE_CORRECTIONS17.verified.BrB,'2026:1656');
assert.ok(html.indexOf('statute-corrections-17.js')>html.indexOf('provisions-generated.js')&&sw.includes('./statute-corrections-17.js'));
console.log('PASS 1.7: förstadier via fullbordat brott, ej verifierat ≠ nej, presumtion ⇒ huvudregel, privilegierade skalor, tvångsmedel, förstadietexter, trafik och version');
