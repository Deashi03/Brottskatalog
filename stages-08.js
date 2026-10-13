/* Brottskatalog 0.8 — förstadier. Källor: BrB 23:1–3 och särskilda kriminaliseringsbestämmelser. */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const BRB='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const NARK='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/';
const GUN='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/';
const norm=s=>String(s||'').toLocaleLowerCase('sv').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
const STAGES=[['forsok','Försök till','försök',1],['forberedelse','Förberedelse till','förberedelse',2],['stampling','Stämpling till','stämpling',2]];
const permission=new Map(), checkedChapters=new Set([3,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
const add=(ref,types,names)=>{
 for(const name of names.split('|')){
  const key=norm(name);const record=permission.get(key)||{types:new Set(),source:ref};
  for(const t of types)record.types.add(t);
  if(!record.source)record.source=ref;
  permission.set(key,record);
 }
};
add('BrB 3:11','FP','Mord|Dråp|Barnadråp|Misshandel|Grov misshandel|Synnerligen grov misshandel');
add('BrB 3:11','S','Mord|Dråp|Grov misshandel|Synnerligen grov misshandel');
add('BrB 4:10','FPS','Människorov|Människohandel|Människoexploatering|Grov människoexploatering|Olaga frihetsberövande|Äktenskapstvång|Barnäktenskapsbrott|Grovt olaga tvång|Grovt olaga hot|Grovt hemfridsbrott|Grovt olaga intrång');
add('BrB 4:10','F','Äktenskapsresebrott|Äktenskapsresebrott mot barn');
add('BrB 4:10','FP','Dataintrång|Grovt dataintrång');
add('BrB 6:15','F','Våldtäkt|Grov våldtäkt|Sexuellt övergrepp|Grovt sexuellt övergrepp|Våldtäkt mot barn|Grov våldtäkt mot barn|Sexuellt utnyttjande av barn|Sexuellt övergrepp mot barn|Grovt sexuellt övergrepp mot barn|Utnyttjande av barn för sexuell posering|Grovt utnyttjande av barn för sexuell posering|Utnyttjande av barn genom köp av sexuell handling|Köp av sexuell handling|Koppleri|Grovt koppleri');
add('BrB 6:15','P','Koppleri');
add('BrB 6:15','PS','Våldtäkt|Grov våldtäkt|Våldtäkt mot barn|Grov våldtäkt mot barn|Grovt utnyttjande av barn för sexuell posering|Grovt koppleri');
add('BrB 10:9','F','Förskingring|Trolöshet mot huvudman|Grov förskingring|Grov trolöshet mot huvudman');
add('BrB 10:9','PS','Grov förskingring|Grov trolöshet mot huvudman');
add('BrB 10:9','P','Grovt givande av muta');
add('BrB 15:15','PS','Mened|Grov mened');
add('BrB 15:15','F','Bevisförvanskning|Grov bevisförvanskning');
add('BrB 16:17','PS','Myteri');
add('BrB 16:17','F','Gravfridsbrott|Grovt gravfridsbrott|Barnpornografibrott|Grovt barnpornografibrott');
add('BrB 16:17','PS','Grovt gravfridsbrott');
add('BrB 16:17','P','Grovt barnpornografibrott');
add('BrB 7:5','F','Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn|Förvanskande av familjeställning|Grov egenmäktighet med barn');
add('BrB 8:12','FP','Stöld|Grov stöld|Inbrottsstöld|Rån|Grovt rån|Tillgrepp av fortskaffningsmedel|Grovt tillgrepp av fortskaffningsmedel|Olovlig energiavledning|Grov olovlig energiavledning');
add('BrB 8:12','S','Grov stöld|Inbrottsstöld|Rån|Grovt rån');
add('BrB 9:11','FP','Bedrägeri|Grovt bedrägeri|Olovlig befattning med betalningsverktyg|Grov olovlig befattning med betalningsverktyg|Utpressning|Ringa utpressning|Grov utpressning|Ocker|Grovt ocker|Häleri|Grovt häleri|Utförselhäleri|Grovt utförselhäleri');
add('BrB 9:11','S','Grovt bedrägeri|Grov utpressning|Häleri|Grovt häleri|Utförselhäleri|Grovt utförselhäleri');
add('BrB 9:11','P','Grovt fordringsbedrägeri');
add('BrB 11:6','F','Oredlighet mot borgenärer|Grov oredlighet mot borgenärer');
add('BrB 11:6','PS','Grov oredlighet mot borgenärer');
add('BrB 11:6','P','Grovt bokföringsbrott');
add('BrB 12:5','F','Skadegörelse|Grov skadegörelse');
add('BrB 12:5','P','Grov skadegörelse');
add('BrB 13:12','FPS','Mordbrand|Grov mordbrand|Allmänfarlig ödeläggelse|Grov allmänfarlig ödeläggelse|Sabotage|Grovt sabotage|Kapning|Sjö- eller luftfartssabotage|Flygplatssabotage|Sabotage mot blåljusverksamhet|Grovt sabotage mot blåljusverksamhet|Spridande av gift eller smitta|Förgöring');
add('BrB 14:13','FP','Urkundsförfalskning|Grov urkundsförfalskning|Hindrande av urkunds bevisfunktion|Signaturförfalskning|Penningförfalskning|Märkesförfalskning|Förfalskning av fast märke|Brukande av vad som förfalskats');
add('BrB 14:13','F','Olovlig befattning med falska pengar');
add('BrB 17:16','FPS','Våld eller hot mot tjänsteman|Grovt våld eller hot mot tjänsteman|Angrepp mot tjänsteman|Grovt angrepp mot tjänsteman|Övergrepp i rättssak|Grovt övergrepp i rättssak|Skyddande av brottsling|Grovt skyddande av brottsling');
add('BrB 17:16','FP','Främjande av rymning eller flykt|Grovt främjande av rymning eller flykt');
add('BrB 17:16','F','Rymning|Grov rymning');
add('BrB 18:7','FPS','Uppror|Väpnat hot mot laglig ordning');
add('BrB 18:7','F','Brott mot medborgerlig frihet|Svikande av försvarsplikt');
add('BrB 19:14','FPS','Högförräderi|Trolöshet vid förhandling med främmande makt|Spioneri|Grovt spioneri|Utlandsspioneri|Grovt utlandsspioneri|Grov obehörig befattning med hemlig uppgift|Olovlig underrättelseverksamhet mot främmande makt|Olovlig underrättelseverksamhet mot person');
add('BrB 19:14','FP','Obehörig befattning med hemlig uppgift');
// Explicit icke-straffbarhet för de efterfrågade kombinationerna; övriga BrB-kapitel får inte falskt nekande.
const explicitNo=new Set(['ringa stöld','ringa misshandel','ringa bedrägeri','ringa skadegörelse','åverkan','ofredande','våldsamt motstånd','tjänstefel','olaga hot','hemfridsbrott','olaga intrång','ringa narkotikabrott · bruk','narkotikabrott · bruk'].map(norm));
const chapterSource={3:'BrB 3:11',6:'BrB 6:15',7:'BrB 7:5',8:'BrB 8:12',9:'BrB 9:11',10:'BrB 10:9',11:'BrB 11:6',12:'BrB 12:5',13:'BrB 13:12',14:'BrB 14:13',15:'BrB 15:15',16:'BrB 16:17',17:'BrB 17:16',18:'BrB 18:7',19:'BrB 19:14'};
const stageScope={
 'oredlighet mot borgenärer':{forsok:'BrB 11:6 omfattar försök till 11:1 första stycket och försök till andra stycket endast om tillgång förs ut ur landet.'},
 'grov oredlighet mot borgenärer':{forsok:'BrB 11:6 omfattar bara de särskilt angivna gärningsformerna i 11:1.'},
 'olovlig befattning med falska pengar':{forsok:'BrB 14:13: endast försök till anskaffande eller mottagande av det förfalskade.'},
 'barnpornografibrott':{forsok:'BrB 16:17: försöksansvar är begränsat till brott enligt 16:10 a första stycket.'},
 'dataintrång':{forsok:'BrB 4:10: endast om gärningen inte skulle ha varit ringa vid fullbordan.',forberedelse:'BrB 4:10: endast om gärningen inte skulle ha varit ringa vid fullbordan.'}
};
const base=D.crimes.slice(),known=new Set(base.map(c=>norm(c.title)));
const duration=n=>Number.isInteger(n)?n+' år':Math.round(n*12)<12?Math.round(n*12)+' mån':Math.floor(n)+' år '+Math.round(n%1*12)+' mån';
const isBrB=c=>/^BrB\s+\d+/i.test(c.shortRef||c.ref||'');
const ch=c=>{const m=(c.shortRef||c.ref||'').match(/BrB\s+(\d+)/i);return m?+m[1]:0;};
const parentMin=c=>Number(c.penaltyRange?.min)||0;
const original=c=>{const r=c.penaltyRange||window.BK_COERCIVE?.range?.(c);return r&&Number.isFinite(r.max)?{min:Number(r.min)||0,max:Number(r.max),fines:!!r.fines||/^(Böter|Penningböter)/i.test(c.penalty||''),life:!!r.life||/livstid/i.test(c.penalty||'')}:null;};
let yes=0,no=0,unknown=0,unavailable=0;
for(const c of base){
 if(c.stageType||!c.title||!original(c)) {unavailable++;continue;}
 const chapter=ch(c),brb=isBrB(c);
 if(!brb && !/narkotikabrott/i.test(c.title)&&!/VapenL\s+18:/i.test(c.ref||'')&&!c.stageReviewed)continue;
 const key=norm(c.title.replace(/\s*·.*$/,''));
 const rule=permission.get(key);
 const narc=/narkotikabrott/i.test(c.title)&&(/narkotikastrafflag|^NSL\s/i.test(c.ref||'')||/^Nark:/i.test(c.statute||''));
 const narcUse=narc&&/bruk/i.test(c.title);
 const gun=/VapenL\s+18:/i.test(c.ref||'');
 // 4 § narkotikastrafflagen: försöks- och förberedelseansvar även vid ringa; undantag eget bruk.
 const permit=c.stageReviewed?{types:new Set(String(c.stagePermissions||'').split('')),source:c.stageSource||'Kontrollerad förstadiebestämmelse'}:narc?{types:new Set(narcUse?[]:(/ringa/i.test(c.title)?['F','P']:['F','P','S'])),source:'Narkotikastrafflagen 4 §'}:gun?{types:new Set(/^(grovt|synnerligen grovt) vapenbrott$/.test(key)?['F','P','S']:[]),source:'VapenL 18:15'}:rule;
 for(const [slug,prefix,word,para] of STAGES){
  const code=slug==='forsok'?'F':slug==='forberedelse'?'P':'S';
  const approved=!!permit?.types.has(code);
  const negative=!approved&&(c.stageReviewed||explicitNo.has(norm(c.title))||narc||gun);
  // Ogranskade kombinationer görs sökbara vid en uttrycklig sökning, men visas inte i huvudkatalogen.
  const status=approved?'punishable':negative?'not-criminalized':'unverified';
  if(status==='punishable')yes++;else if(status==='not-criminalized')no++;else unknown++;
  const p=original(c), hasFine=code==='F'?p.min<2:true;
  const min=code==='F'&&p.min>=2 ? 1/12 : 0;
  const max=code==='F'?p.max:(p.max>=6?p.max:Math.min(p.max,2));
  const maxStrict=code!=='F'&&!p.life;
  const maxLabel=(p.life&&code==='F')?duration(p.max)+' / livstid':duration(max);
  const minLabel=hasFine?'Böter':'Fängelse 1 mån';
  const limit=code==='F'?'Högst samma straff som fullbordat brott.':'Under fullbordat brotts maximistraff; över 2 års fängelse bara om fullbordat brott har maximum minst 6 år.';
  const limitNote=code==='F'?(p.min>=2?'Böter uteslutna enligt BrB 23:1. Lägsta tidsbestämda fängelsestraff är 1 månad enligt BrB 26:1.':'Böter kan ingå enligt BrB 23:1.'):('BrB 23:2: '+limit);
  const penalty=status==='punishable'?(code==='F'?minLabel+' – högst '+maxLabel:(maxStrict?'Böter eller fängelse, lägre än '+duration(p.max)+(p.max<6?' och högst 2 år':''):'Böter eller fängelse högst '+duration(max))):status==='not-criminalized'?'Saknar straffskala – ej kriminaliserat':'Straffbarhet/straffskala ej verifierad';
  const short=status==='punishable'?(hasFine?'B–F ':'F ')+(code==='F'&&!hasFine?'1 mån–':'')+(maxStrict?'< ':'')+maxLabel:status==='not-criminalized'?'Ej straffbart':'Ej verifierat';
  const src=permit?.source|| (brb?(chapterSource[chapter]||'BrB '+chapter+' kap. (särskild kriminalisering ej slutgranskad)'):'Specialstraffrätt – kontroll krävs');
  const restriction=stageScope[key]?.[slug]||'';
  const why=status==='not-criminalized'?'Det finns inte någon särskild föreskrift om ansvar för '+word+' till just denna rubricering i den kontrollerade kriminaliseringsbestämmelsen. Det utesluter inte att en annan brottsrubricering kan bli aktuell.':status==='unverified'?'Förstadiets straffbarhet har inte granskats tillräckligt för en säker slutsats. Avsaknad av verifiering betyder INTE att gärningen är straffri.':limitNote+(restriction?' Begränsning: '+restriction:'');
  const stageTitle=prefix+' '+c.title.toLocaleLowerCase('sv');
  const baseLaw=(c.law||'').trim();
  const law=status==='punishable' ? ('Straffansvar för '+word+' regleras i '+src+' jämförd med BrB 23:'+para+'. Den fullständiga lydelsen finns via den officiella rättskällan.'):('Ingen egen straffbestämmelse återges för denna kombination. '+why);
  const entry={
   id:'stadium-08-'+slug+'-'+c.id,title:stageTitle,ref:(c.ref||'')+'; '+src+'; BrB 23:'+para,
   shortRef:(c.shortRef||'')+' · 23:'+para,category:c.category,aliases:[prefix.toLocaleLowerCase('sv')+' '+c.title,slug+' '+c.title],
   statute:c.statute,sourceURL:c.stageReviewed?c.sourceURL:narc?NARK:gun?GUN:BRB,penalty,penaltyShort:short,
   penaltyRange:status==='punishable'?{min,max,fines:hasFine,life:code==='F'&&!!p.life}:null,
   penaltyNote:why,penaltyChecked:'2026-10-12',
   stageType:slug,stageStatus:status,stageSource:src,stageParentId:c.id,
   stageParentMin:p.min,stageParentMax:p.max,stageParentLife:!!p.life,
   stagePenaltyLower:status==='punishable'?(hasFine?'Böter':'1 mån'):null,
   stagePenaltyUpper:status==='punishable'?(code==='F'?maxLabel:'Under fullbordat brotts max'):null,
   stageExplanation:why,
   custody:status==='punishable'?(p.min>=4?'presumption':max>=1?'possible':'none'):'none',
   prosecution:'unknown',prosecutionLabel:status==='punishable'?'Åtalsregler måste kontrolleras':'Ej tillämpligt som egen straffbar rubricering',
   prosecutionDetails:status==='punishable'?['Kontrollera särskilda åtalsvillkor för det aktuella brottet och förstadiet.']:['Inget straffansvar är verifierat för detta förstadium.'],
   law,lawSource:src+'; BrB 23:'+para,lawMode:'stage-reference',
   stageLawNotice:true,reviewStatus:status==='unverified'?'not-reviewed':'stage-statute-reviewed',
   elements:restriction?[restriction]:[],facts:[],stages:[],related:[c.id],variants:[],lawTerms:[]
  };
  D.crimes.push(entry);
 }
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_STAGES={yes,no,unknown,unavailable,source:'BrB 23 kap. och respektive särskild kriminaliseringsbestämmelse',version:'0.8'};
})();