/* V1.5 arbetsgren – individuellt begränsade rekvisitstrukturer och typfall.
 * Kontrollomfattning: tillämplig paragraftext, INTE uttömmande doktrin/praxis.
 * Äldre kursanteckningar används som förklaringsunderlag, aldrig som lagtext.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const content={
 'mord':{
   source:'BrB 3:1 och 1:2',groups:[
     {mode:'all',label:'En annan människa har berövats livet.'},
     {mode:'all',label:'Gärningspersonen hade uppsåt till dödandet.'}
   ],cases:[['En person skjuter avsiktligt en annan person till döds.','Eget enkelt typexempel, med stöd i BrB 3:1 och 1:2.']]
 },
 'misshandel':{
   source:'BrB 3:5 och 1:2',groups:[
     {mode:'all',label:'Gärningen tillfogas en annan person.'},
     {mode:'any',label:'Minst en av följande följder har orsakats:',options:['Kroppsskada','Sjukdom','Smärta','Vanmakt eller något annat sådant tillstånd']},
     {mode:'all',label:'Gärningspersonen har uppsåt till de relevanta omständigheterna och följderna.'}
   ],cases:[['En person slår avsiktligt en annan på armen så att det gör ont.','Eget enkelt typexempel. Om brottet är ringa prövas separat.']]
 },
 'stöld':{
   source:'BrB 8:1 och 1:2',groups:[
     {mode:'all',label:'Något som tillhör någon annan tas olovligen.'},
     {mode:'all',label:'Tillgreppet innebär en besittningsrubbning och skada i stöldbestämmelsens mening.'},
     {mode:'all',label:'Gärningspersonen har tillägnelseuppsåt vid tillgreppet och uppsåt till övriga nödvändiga omständigheter.'}
   ],cases:[['En person tar någon annans värdefulla klocka och för den ur ägarens besittning för att behålla den.','Eget typfall. Rekvisit om skada och besittning finns beskrivna i Straffrätt Lund.']]
 },
 'ringa stöld':{
   source:'BrB 8:1–2',groups:[
     {mode:'all',label:'Samtliga rekvisit för stöld enligt BrB 8:1 är uppfyllda.'},
     {mode:'all',label:'Med hänsyn till det tillgripnas värde och övriga omständigheter bedöms brottet som ringa.'}
   ],cases:[['En person stoppar varor för ett lågt belopp i fickan och passerar butikens sista betalningsmöjlighet utan att betala, med avsikt att behålla dem.','Typexempel från Brottsutredning och Straffrätt Lund; annan rubricering kan bero på omständigheterna.']]
 },
 'rån':{
   source:'BrB 8:5',groups:[],
   cases:[['En person hotar en kassör med en kniv för att få kassörens kontanter och tar pengarna.','Stöldfallet med råntvång, utifrån Straffrätt Lund F48.'],
          ['En person hotar en annan med omedelbart våld om denne inte för över pengar till gärningspersonen, varpå överföringen görs.','Utpressningsfallet med råntvång, utifrån Straffrätt Lund F48.']]
 },
 'skadegörelse':{
   source:'BrB 12:1 och 1:2',groups:[
     {mode:'any',label:'Något av följande sker med egendom:',options:['Egendom förstörs','Egendom skadas']},
     {mode:'all',label:'Gärningen sker till men för någon annans rätt till egendomen.'},
     {mode:'all',label:'Gärningspersonen handlar med uppsåt.'}
   ],cases:[['En person slår avsiktligt sönder vindrutan på en bil som tillhör någon annan.','Eget enkelt typexempel, förutsatt att gärningen sker till men för annans rätt.']]
 },
 'tillgrepp av fortskaffningsmedel':{
   source:'BrB 8:7',groups:[
     {mode:'all',label:'Ett motordrivet fortskaffningsmedel som tillhör någon annan tas olovligen.'},
     {mode:'all',label:'Fordonet brukas utan lov.'},
     {mode:'all',label:'Det är inte fråga om stöld eller rån och gärningspersonen har uppsåt.'}
   ],cases:[['En person tar utan lov en annans bil, kör omkring och lämnar den senare, utan att ha haft för avsikt att tillägna sig bilen.','Typfall från Straffrätt Lund F49.']]
 }
};
const seen=new Set();
for(const crime of D.crimes){
 if(crime.stageType)continue;
 const key=String(crime.title||'').toLocaleLowerCase('sv');
 const item=content[key];if(!item)continue;
 seen.add(key);
 crime.rekvisit15=item.groups.length?{
  groups:item.groups,source:item.source,sourceURL:SFS,
  scope:'lagtext-jamford','verifiedOn':'2026-10-16',
  note:'Rekvisitöversikt kontrollerad mot bestämmelsens ordalydelse. Full rättslig tolkning, praxis och undantag är inte slutgranskade.'
 }:null;
 crime.typexempel15=item.cases.map(([text,source])=>({
  text,source,sourceURL:SFS,
  kind:'typfall',status:'illustrative-legally-checked-2026-10-16'
 }));
}
window.BK_REKVISIT15={examples:seen.size,scope:'initial-low-ambiguity-cases',deferredExamples:['Märkesförfalskning – byte av registreringsskylt','Angrepp mot tjänsteman – spottning/knuff']};
})();
