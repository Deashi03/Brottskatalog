/* Brottskatalog 0.9 – verifierade specialstraffrättsliga brottsfamiljer.
 * Källor: SFS 2000:1225 senast 2026:1321; SFS 2014:307 senast 2026:1323.
 * Straffskalorna och särskild kriminalisering av förstadier bygger på angivna §§.
 * Åtalsvillkor och rekvisit kan kräva individuell kontroll. */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const laws={
 Smugl:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/',name:'Lag (2000:1225) om straff för smuggling',short:'SmuglL',checked:'2026-10-13'},
 PTV:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/',name:'Lag (2014:307) om straff för penningtvättsbrott',short:'PTBL',checked:'2026-10-13'}
};
// Kolumner: rubrik, lag, grundparagraf, min, max, böter, förstadier, noterad särskild regel, sökord, kvalifikation.
const rows=[
['Smuggling','Smugl','3',0,2,true,'F','14','olovlig införsel;olovlig utförsel',''],
['Ringa smuggling','Smugl','4',0,0,true,'','14','ringa varusmuggling;penningböter',''],
['Grov smuggling','Smugl','5',1,6,false,'FPS','14','systematisk smuggling',''],
['Narkotikasmuggling','Smugl','6',0,3,false,'FPS','14','smuggling av narkotika','Om narkotikan är avsedd att säljas: fängelse lägst 6 månader och högst 3 år.'],
['Narkotikasmuggling – avsedd att säljas','Smugl','6',.5,3,false,'FPS','14','narkotikasmuggling säljas;försäljning av narkotika','Straffskalevariant enligt 6 § andra stycket, inte en självständig brottsrubricering.'],
['Ringa narkotikasmuggling','Smugl','6',0,.5,true,'FP','14','ringa narkotikasmuggling','Förberedelse straffbar, men inte stämpling enligt 14 §.'],
['Grov narkotikasmuggling','Smugl','6',2,7,false,'FPS','14','grov knarksmuggling',''],
['Synnerligen grov narkotikasmuggling','Smugl','6',6,10,false,'FPS','14','synnerligen grov knarksmuggling',''],
['Vapensmuggling','Smugl','6 a',0,5,false,'FPS','14','smuggling av skjutvapen',''],
['Ringa vapensmuggling','Smugl','6 a',0,.5,true,'FP','14','ringa smuggling skjutvapen','Förberedelse straffbar, men inte stämpling enligt 14 §.'],
['Grov vapensmuggling','Smugl','6 a',4,7,false,'FPS','14','grov smuggling skjutvapen',''],
['Synnerligen grov vapensmuggling','Smugl','6 a',6,10,false,'FPS','14','synnerligen grov smuggling skjutvapen',''],
['Smuggling av explosiv vara','Smugl','6 b',0,5,true,'FPS','14','sprängämnessmuggling;smuggling sprängmedel',''],
['Ringa smuggling av explosiv vara','Smugl','6 b',0,0,true,'F','14','ringa explosiva varor;penningböter',''],
['Grov smuggling av explosiv vara','Smugl','6 b',4,7,false,'FPS','14','grova explosiva varor',''],
['Synnerligen grov smuggling av explosiv vara','Smugl','6 b',6,10,false,'FPS','14','synnerligen grova explosiva varor',''],
['Olovlig införsel eller utförsel','Smugl','7',0,2,true,'','14','grov oaktsamhet vid smuggling','Oaktsamhetsbrott; ringa gärning är inte straffbar enligt 7 §.'],
['Tullbrott','Smugl','8',0,2,true,'F','14','undandra tull;fel tull',''],
['Ringa tullbrott','Smugl','9',0,0,true,'','14','ringa tullbrott;penningböter',''],
['Grovt tullbrott','Smugl','10',1,6,false,'FPS','14','grovt tullbedrägeri',''],
['Vårdslös tullredovisning','Smugl','11',0,2,true,'','14','oaktsamt tullbrott','Ringa gärning medför inte ansvar enligt 11 §.'],
['Olovlig befattning med smuggelgods','Smugl','12',0,2,true,'','14','befattning smuggelgods','Ringa befattning medför inte ansvar enligt 12 §.'],
['Grov olovlig befattning med smuggelgods','Smugl','13',1,6,false,'FPS','14','grovt smuggelhäleri',''],
['Penningtvättsbrott','PTV','3–4',0,2,false,'FPS','8','tvätta pengar;dölja brottsvinster',''],
['Grovt penningtvättsbrott','PTV','5',1,6,false,'FPS','8','grov penningtvätt',''],
['Penningtvättsförseelse','PTV','6',0,.5,true,'','8','ringa penningtvätt',''],
['Näringspenningtvätt','PTV','7',0,2,false,'FPS','8','penningtvätt i näringsverksamhet',''],
['Grov näringspenningtvätt','PTV','7',1,6,false,'FPS','8','grov näringspenningtvätt',''],
['Ringa näringspenningtvätt','PTV','7',0,.5,true,'','8','ringa näringspenningtvätt','']
];
const fmt=n=>Number.isInteger(n)?n+' år':n<1?Math.round(n*12)+' mån':Math.floor(n)+' år '+Math.round((n%1)*12)+' mån';
const slug=t=>t.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const known=new Set(D.crimes.map(c=>c.title.toLocaleLowerCase('sv')));
for(const [title,k,section,min,max,fines,stages,stageSection,aliases,notes] of rows){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const law=laws[k],isFineOnly=max===0;
 const penalty=isFineOnly?'Penningböter':(fines?'Böter eller fängelse':'Fängelse')+(min>0?' '+fmt(min)+'–'+fmt(max):' högst '+fmt(max));
 const short=isFineOnly?'Penningböter':(fines?'B–F ': 'F ')+(min>0?fmt(min)+'–':'')+fmt(max);
 const record={
  id:'v09-'+slug(title),title,shortRef:law.short+' '+section,
  ref:law.name+' '+section+' §',category:k==='PTV'?'Ekonomisk brottslighet':'Smuggling',
  aliases:aliases.split(';'),penalty,penaltyShort:short,penaltyRange:{min,max,fines,life:false},
  penaltyNote:notes||'Straffskala enligt '+law.name+' '+section+' §.',
  penaltyChecked:law.checked,penaltySource:law.name+' '+section+' §',
  custody:min>=1.5?'presumption':max>=1?'possible':'none',
  prosecution:'unknown',prosecutionLabel:'Kontrollera särskilda åtalsvillkor',
  prosecutionDetails:k==='Smugl'?['Smugglingslagen 20 § innehåller särskilda åtalsvillkor när vissa avgifter eller tulltillägg kan tas ut. Pröva exakt brott och situation.']:['Kontrollera författningen och eventuella särskilda åtalsregler.'],
  prosecutionRule:k==='Smugl'?'Smugglingslagen 20 §':'Kontrollera tillämpliga bestämmelser',
  lawMode:'missing',law:'',lawSource:law.name+' '+section+' §',sourceURL:law.url,
  elements:notes?[notes]:[],facts:[],stages:[],variants:[],related:[],
  stageReviewed:true,stagePermissions:stages,stageSource:law.short+' '+stageSection,
  stageReference:law.name+' '+stageSection+' §',
  reviewStatus:'penalty-and-stage-verified-lawtext-pending',statute:null
 };
 D.crimes.push(record);known.add(title.toLocaleLowerCase('sv'));
}

/* 0.9 – ytterligare särskilt kontrollerade författningar. */
const extraLaws={
 SK:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/',name:'Skattebrottslag (1971:69)',short:'SkBrL',stageRef:'11'},
 BID:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/',name:'Bidragsbrottslag (2007:612)',short:'BidrBrL',stageRef:'Ingen särskild förstadiebestämmelse'},
 LBE:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/',name:'Lag (2010:1011) om brandfarliga och explosiva varor',short:'LBE',stageRef:'30 a'}
};
const more=[
 ['Skattebrott','SK','2',0,2,false,'','oriktig uppgift skatt',''],
 ['Skatteförseelse','SK','3',0,0,true,'','ringa skattebrott','Böter, inte nödvändigtvis enbart penningböter.'],
 ['Grovt skattebrott','SK','4',1,6,false,'PS','grovt skattefusk','Förberedelse och stämpling kriminaliseras i 11 §. Försök omfattas inte av den bestämmelsen.'],
 ['Vårdslös skatteuppgift','SK','5',0,1,true,'','oaktsam skatteuppgift','Grov oaktsamhet krävs.'],
 ['Skatteavdragsbrott','SK','6',0,1,true,'','underlåta skatteavdrag',''],
 ['Skatteredovisningsbrott','SK','7',0,.5,true,'','oriktiga uppgifter om skatt',''],
 ['Vårdslös skatteredovisning','SK','8',0,.5,true,'','grov oaktsamhet skatteredovisning',''],
 ['Försvårande av skattekontroll','SK','10',0,2,true,'','bokföringsbrister skatteverket',''],
 ['Grovt försvårande av skattekontroll','SK','10',.5,4,false,'','grovt försvårande skattekontroll',''],
 ['Bidragsbrott','BID','2',0,2,false,'','felaktigt bidrag;förmånsbedrägeri',''],
 ['Ringa bidragsbrott','BID','2',0,.5,true,'','ringa felaktigt bidrag',''],
 ['Grovt bidragsbrott','BID','3',1,6,false,'','grovt bidragsfusk',''],
 ['Vårdslöst bidragsbrott','BID','4',0,1,true,'','oaktsamt bidragsbrott','Grov oaktsamhet krävs.'],
 ['Brott mot tillståndsplikten för brandfarliga varor','LBE','29',0,1,true,'','brandfarliga varor utan tillstånd','Beskrivande sökbenämning för 29 § andra stycket 1.'],
 ['Brott mot tillståndsplikten för explosiva varor','LBE','29',0,5,true,'','explosiva varor utan tillstånd;sprängmedel utan tillstånd','Beskrivande sökbenämning för 29 § andra stycket 2.'],
 ['Grovt brott mot tillståndsplikten för explosiva varor','LBE','29 a',4,7,false,'FPS','grovt tillståndsbrott explosiva varor','Beskrivande sökbenämning. Förstadier kriminaliseras enligt 30 a §.'],
 ['Synnerligen grovt brott mot tillståndsplikten för explosiva varor','LBE','29 a',6,10,false,'FPS','synnerligen grovt explosiva varor','Beskrivande sökbenämning. Förstadier kriminaliseras enligt 30 a §.']
];
for(const [title,key,section,min,max,fines,stages,aliases,note] of more){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const law=extraLaws[key];
 const fineOnly=max===0;
 const short=fineOnly?'Böter':(fines?'B–F ':'F ')+(min?fmt(min)+'–':'')+fmt(max);
 const pen=fineOnly?'Böter':(fines?'Böter eller fängelse':'Fängelse')+(min?' '+fmt(min)+'–'+fmt(max):' högst '+fmt(max));
 const stageRef=law.stageRef;
 D.crimes.push({
  id:'v09-'+slug(title),title,category:key==='SK'?'Skattebrott':key==='BID'?'Bidragsbrott':'Explosiva varor',
  shortRef:law.short+' '+section,ref:law.name+' '+section+' §',aliases:aliases.split(';'),
  penalty:pen,penaltyShort:short,penaltyRange:{min,max,fines,life:false},penaltyNote:note||'Straffskala enligt '+law.name+' '+section+' §.',
  penaltyChecked:'2026-10-13',penaltySource:law.name+' '+section+' §',
  custody:min>=1.5?'presumption':max>=1?'possible':'none',
  prosecution:'unknown',prosecutionLabel:'Särskilda åtalsregler måste prövas',
  prosecutionRule:key==='SK'?'Skattebrottslagen 13, 13 b §§':key==='BID'?'Bidragsbrottslagen 6 a §':'Kontrollera specialbestämmelser',
  prosecutionDetails:key==='SK'?['Särskild åtalsprövning enligt 13 §; begränsningar vid skattetillägg enligt 13 b §.']:key==='BID'?['Beakta förbudet mot dubbla förfaranden enligt 6 a §, infört 2026.']:['Kontrollera specialregler, subsidiaritet och konkurrens.'],
  lawMode:'missing',law:'',lawSource:law.name+' '+section+' §',sourceURL:law.url,
  elements:note?[note]:[],facts:[],variants:[],stages:[],related:[],
  stageReviewed:true,stagePermissions:stages,stageSource:stageRef==='Ingen särskild förstadiebestämmelse'?'BidrBrL 1–7 §§; BrB 23 kap. (ingen särskild förstadiekriminalisering i den kontrollerade lagen)':law.short+' '+stageRef,
  stageReference:stageRef==='Ingen särskild förstadiebestämmelse'?law.name+' 1–7 §§ (särskild förstadiekriminalisering saknas)':law.name+' '+stageRef+' §',
  reviewStatus:'penalty-and-stage-verified-lawtext-pending',statute:null
 });known.add(title.toLocaleLowerCase('sv'));
}

D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_SPECIAL09={count:rows.length+more.length,laws:{...laws,...extraLaws},checked:'2026-10-13'};
})();