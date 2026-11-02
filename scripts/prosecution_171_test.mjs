import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),sw=read('service-worker.js');
const w={};vm.runInNewContext(read('prosecution-171.js'),{window:w});
const P=w.BK_PROSECUTION171;assert.ok(P);

// Två färger: grönt = allmänt åtal, gult = angivelseregel eller enskilt åtal.
for(const [key,r] of Object.entries(P.rules)){
 assert.ok(['green','yellow'].includes(r.tone),key);
 assert.equal(r.tone==='green',r.status==='Allmänt åtal',key+': grönt endast för allmänt åtal');
 assert.ok(r.short.length<=140,key+': beskedet vid tryck ska vara kort');
 assert.ok(r.law&&/^[A-Za-z]+:\d+[a-z]?(:\d+[a-z]?)?$/.test(r.law),key+': länk till lagrummet');
 const text=[r.status,r.short,...r.more.map(m=>m.label+' '+m.text)].join(' ');
 assert.ok(!/allmän synpunkt|ELLER|OCH|riksåklagaren|2:7|2:8|18:8|jurisdiktion/.test(text),key+': juridikjargong eller irrelevant text');
 // 1.7.2: inga dubbla negationer i samma mening.
 for(const sentence of text.split(/[.:!?]\s/))assert.ok((sentence.match(/\b(inte|ingen|inget|utan|aldrig)\b/gi)||[]).length<2,key+': dubbel negation: '+sentence);
 if(r.tone==='yellow'&&!['defamation'].includes(key))
  assert.ok(r.more.some(m=>m.label==='Hur'||m.text.includes('Vill du att brottet ska åtalas')),key+': säger hur angivelse tas upp');
}

const base=(title,rule,extra={})=>({id:title,title,prosecution:extra.prosecution||'general',prosecutionStatutoryReview15:rule?{rule}:undefined,...extra});
const cards=[
 base('Misshandel','ch3general'),base('Stöld','relative8',{prosecution:'conditional'}),base('Grov stöld','excluded8'),
 base('Hemfridsbrott','ch4normal',{prosecution:'conditional'}),base('Grovt hemfridsbrott','homeGross'),
 base('Ofredande','ch4place',{prosecution:'conditional'}),base('Förolämpning','insult',{prosecution:'conditional'}),
 base('Förtal','defamation',{prosecution:'conditional'}),base('Vållande till kroppsskada eller sjukdom','body',{prosecution:'conditional'}),
 base('Grovt olaga tvång',null,{prosecution:'conditional'}),
 base('Ringa skadegörelse',null,{prosecution:'conditional',prosecutionRule:'BrB 12:6',prosecutionLabel:'Endast enskild rätt: särskilda skäl + allmän synpunkt'}),
 base('Tagande av muta','bribery',{prosecution:'conditional'}),base('Rattfylleri','TBL')
];
const by=Object.fromEntries(cards.map(c=>[c.id,c]));
cards.push({id:'f1',title:'Försök till stöld',stageType:'forsok',stageStatus:'punishable',stageParentId:'Stöld',prosecution:'conditional'});
cards.push({id:'f2',title:'Försök till grov stöld',stageType:'forsok',stageStatus:'punishable',stageParentId:'Grov stöld',prosecution:'general'});
const titles=new Set(cards.map(c=>c.title.toLocaleLowerCase('sv')));
const v=t=>P.view(cards.find(c=>c.title===t),id=>by[id],titles);
const expect={
 'Misshandel':['green','Allmänt åtal','RB:20:3'],
 'Stöld':['yellow','Allmänt åtal – angivelseregel vid närstående','BrB:8:13'],
 'Grov stöld':['green','Allmänt åtal','BrB:8:13'],
 'Hemfridsbrott':['yellow','Fråga om angivelse','BrB:4:11'],
 'Grovt hemfridsbrott':['green','Allmänt åtal','BrB:4:11'],
 'Ofredande':['yellow','Allmänt åtal – angivelseregel utanför allmän plats','BrB:4:11'],
 'Förolämpning':['yellow','Enskilt åtal','BrB:5:5'],
 'Förtal':['yellow','Enskilt åtal','BrB:5:5'],
 'Vållande till kroppsskada eller sjukdom':['yellow','Angivelse krävs','BrB:3:12'],
 'Grovt olaga tvång':['yellow','Allmänt åtal – angivelseregel vid vissa hot','BrB:4:11'],
 'Ringa skadegörelse':['green','Allmänt åtal','BrB:12:6'],
 'Tagande av muta':['green','Allmänt åtal','BrB:10:10'],
 'Rattfylleri':['green','Allmänt åtal','RB:20:3'],
 'Försök till stöld':['yellow','Allmänt åtal – angivelseregel vid närstående','BrB:8:13'],
 'Försök till grov stöld':['green','Allmänt åtal','RB:20:3']
};
for(const [t,[tone,status,law]] of Object.entries(expect)){
 const x=v(t);assert.equal(x.tone,tone,t);assert.equal(x.status,status,t);assert.equal(x.law,law,t);
}
assert.match(v('Hemfridsbrott').more.find(m=>m.label==='När').text,/grova graden hör under allmänt åtal/);
assert.match(v('Stöld').short,/^Brottet hör under allmänt åtal\. Är gärningsmannen närstående/,'Huvudregeln allmänt åtal först, sedan den särskilda angivelseregeln');
assert.match(v('Förolämpning').more.map(m=>m.text).join(' '),/Förolämpning mot tjänsteman – allmänt åtal/);
assert.match(v('Vållande till kroppsskada eller sjukdom').more.map(m=>m.text).join(' '),/under 18 år/);
assert.equal(P.view(base('Okänd',null,{prosecution:'conditional'}),id=>by[id],titles).key,null,'Okänd villkorad regel får ingen påhittad text');
assert.equal(P.lawLabel('SkBrL:13b'),'Skattebrottslagen 13 b §');
assert.equal(P.lawLabel('Vapen:18:14'),'VapenL 18:14');

// Inkoppling: statusrad och ruta använder samma besked; länken öppnar lagrummet offline.
assert.ok(html.includes('<script src="./prosecution-171.js"></script>'));
assert.ok(html.indexOf('prosecution-171.js')>html.indexOf('final-prosecution-review-15.js'));
assert.ok(html.includes('data-pros-tone')&&html.includes('class="pros171-law" data-provision='));
assert.ok(html.includes("'</dl>'+law+'</details>'"),'1.7.2: lagtexten ligger sist inne i Mer');
assert.ok(!html.includes('prosecution-summary161')&&!html.includes('Fördjupning och lagstöd'),'Gamla åtalsvyn borttagen');
assert.ok(sw.includes('./prosecution-171.js'));
console.log('PASS 1.7.2 åtalsregler: '+Object.keys(P.rules).length+' regler, grönt/gult, kort besked, när/hur/säger nej och länk till lagrummet');
