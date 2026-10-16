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
     {mode:'all',label:'Gärningen riktas mot en annan person.'},
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
          ['En person hotar en annan med omedelbart våld om denne inte för över pengar till gärningspersonen, varpå överföringen görs.','Utpressningsfallet med råntvång, utifrån Straffrätt Lund F48.'],
          ['En gärningsperson hotar en person med våld som framstår som omedelbart överhängande och tvingar till sig personens bankkort i avsikt att använda det för egna betalningar.','Betalningsverktygsfallet med råntvång enligt BrB 8:5 första stycket 3 och Straffrätt Lund F48.'],
          ['En person som just har stulit i en butik upptäcks på bar gärning och använder våld mot en butiksvakt som försöker återta det tillgripna.','Motvärnsfallet enligt BrB 8:5 andra stycket och Straffrätt Lund F48.']]
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
const SOU_MARK='https://www.regeringen.se/contentassets/30fcbaf6af924a2d8693b063c5aabc9c/en-straffreform-sou-202566-vol-3.pdf';
const SOU_LOYAL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/statens-offentliga-utredningar/mutbrott_gyb338/html/';
const COURT='https://www.domstol.se/nyheter/2025/06/36-arig-man-doms-till-fangelse-for-grov-troloshet-mot-huvudman/';
content['märkesförfalskning']={
 source:'BrB 14:8, BrB 1:2 och SOU 2025:66 vol. 3',groups:[
  {mode:'any',label:'Det förfalskade avser ett skyddat slags märke:',options:[
   'Gällande frimärke, beläggningsstämpel eller annat offentligt eller för allmänheten avsett värdemärke',
   'Offentlig svensk eller utländsk kontrollmärkning, exempelvis registreringsskylt'
  ]},
  {mode:'any',label:'En av de i paragrafen angivna förfalskningsåtgärderna:',options:[
   'Eftergöra sådant märke','Anbringa ett falskt sådant märke',
   'Obehörigen anbringa ett äkta sådant märke',
   'På annat sätt förfalska märket eller det märkta'
  ]},
  {mode:'all',label:'Åtgärden innebär fara i bevishänseende.'},
  {mode:'all',label:'Gärningspersonen har uppsåt till omständigheterna i de objektiva rekvisiten.'}
 ],cases:[[
  'En person monterar utan behörighet en äkta registreringsskylt från en annan bil på sitt eget fordon, för att det vid en kontroll ska framstå som att bilen har den andra bilens registreringsidentitet. Det innebär fara i bevishänseende.',
  'Förlaga: Brottsutredning (14:8). Rättsligt stöd: BrB 14:8 och SOU 2025:66, volym 3.',
  SOU_MARK
 ]]
};
const troRoutes=[
 {label:'Alternativ A: ekonomisk angelägenhet eller kvalificerad teknisk uppgift',groups:[
  {mode:'all',label:'Gärningspersonen har en förtroendeställning.'},
  {mode:'any',label:'På grund av förtroendeställningen har personen fått till uppgift att:',options:[
   'Sköta någon annans ekonomiska angelägenhet',
   'Självständigt hantera en kvalificerad teknisk uppgift för någon annan',
   'Övervaka skötseln av en sådan angelägenhet eller uppgift'
  ]},
  {mode:'all',label:'Gärningspersonen missbrukar sin förtroendeställning.'},
  {mode:'all',label:'Missbruket orsakar huvudmannen skada.'},
  {mode:'all',label:'Uppsåt föreligger till rekvisiten; förskingringsbestämmelserna i BrB 10:1–3 har företräde om de är tillämpliga.'}
 ]},
 {label:'Alternativ B: rättslig angelägenhet',groups:[
  {mode:'all',label:'Gärningspersonen har fått i uppgift att sköta en rättslig angelägenhet för någon annan.'},
  {mode:'all',label:'Personen missbrukar sin förtroendeställning vid uppdraget.'},
  {mode:'all',label:'Missbruket sker till förfång för huvudmannen (behöver inte vara av ekonomisk eller teknisk art).'},
  {mode:'all',label:'Uppsåt föreligger till rekvisiten; förskingringsbestämmelserna i BrB 10:1–3 har företräde om de är tillämpliga.'}
 ]}
];
content['trolöshet mot huvudman']={
 source:'BrB 10:5 (SFS 2026:1318), BrB 1:2, SOU 2025:87',groups:[],routes:troRoutes,
 cases:[[
  'En inköpschef som självständigt får ingå leverantörsavtal för sin arbetsgivare tar en otillbörlig förmån och beställer medvetet varor till kraftigt överpris, vilket skadar arbetsgivaren ekonomiskt.',
  'Typfall beskrivet i SOU 2010:38 om trolöshet mot huvudman och mutbrott.',
  SOU_LOYAL
 ]]
};
content['grov trolöshet mot huvudman']={
 source:'BrB 10:5 andra stycket (SFS 2026:1318); Stockholms tingsrätt, mål B 19103-24',
 groups:[],routes:troRoutes,
 cases:[[
  'En ekonomiassistent med förtroendeställning gör under flera år systematiskt obehöriga betalningar från arbetsgivarens konton till sina egna. Skadan uppgår till tiotals miljoner kronor.',
  'Verkligt brottsupplägg: Stockholms tingsrätt, B 19103-24 (2025). Grovhetsgraden förutsätter helhetsbedömning.',
  COURT
 ]]
};
content['missbruk av urkund']={
 source:'BrB 15:12 och BrB 1:2',groups:[],
 routes:[
  {label:'Alternativ A: användning av annans äkta identitetshandling',groups:[
   {mode:'all',label:'En personlig urkund (exempelvis pass eller ID-kort) är utställd för någon annan.'},
   {mode:'all',label:'Gärningspersonen åberopar sanningslöst urkunden som gällande för sig själv eller annan.'},
   {mode:'all',label:'Åtgärden innebär fara i bevishänseende och gärningspersonen har uppsåt.'}
  ]},
  {label:'Alternativ B: utlämnande för sådan användning',groups:[
   {mode:'all',label:'Gärningspersonen lämnar ut en sådan personlig urkund för att den sanningslöst ska användas som gällande för annan.'},
   {mode:'all',label:'Åtgärden innebär fara i bevishänseende och gärningspersonen har uppsåt.'}
  ]}
 ],cases:[[
  'En minderårig använder medvetet en äldre bekants äkta ID-kort och visar det som sitt eget för att bli insläppt på en nattklubb. Det finns fara att ålderskontrollen vilseleds om identiteten.',
  'Förlaga: Brottsutredning, avsnitt 15:12 – användning av annans äkta ID-handling. Lagstöd: BrB 15:12.'
 ]]
};
content['olovligt brukande']={
 source:'BrB 10:7 och BrB 1:2',groups:[],
 routes:[
  {label:'Alternativ A: annans sak',groups:[
   {mode:'all',label:'Gärningspersonen brukar olovligen en sak som tillhör någon annan.'},
   {mode:'any',label:'Brukandet orsakar:',options:['Skada','Olägenhet']},
   {mode:'all',label:'Uppsåt finns till brukandet och relevanta omständigheter.'}
  ]},
  {label:'Alternativ B: fastighet med annan rättighetshavare',groups:[
   {mode:'all',label:'Gärningspersonen innehar en fastighet men någon annan har nyttjanderätt eller annan rätt till den.'},
   {mode:'all',label:'Fastigheten brukas olovligen i strid med den andres rätt.'},
   {mode:'any',label:'Brukandet orsakar:',options:['Skada','Olägenhet']},
   {mode:'all',label:'Uppsåt finns till brukandet och relevanta omständigheter.'}
  ]}
 ],cases:[[
  'En person får låna en bekants telefon för ett kort lokalsamtal men ringer utan lov ett dyrt utlandssamtal som belastar ägarens abonnemang.',
  'Förlaga: Brottsutredning, BrB 10:7 – olovlig användning av lånad telefon och kostnad för ägaren.'
 ]]
};
content['psykiskt våld']={
 source:'BrB 4:7 b och BrB 1:2 (SFS 2026:852)',groups:[],
 routes:[
  {label:'Alternativ A – upprepade kränkningar',groups:[
   {mode:'all',label:'En annan person utsätts upprepade gånger för kränkningar.'},
   {mode:'any',label:'Kränkningarna utgörs av minst ett av de angivna beteendena:',options:['Beskyllning','Nedsättande uttalande','Förödmjukande beteende','Otillbörligt hot','Otillbörligt tvång','Otillbörlig övervakning']},
   {mode:'all',label:'Kränkningarna sammantagna är ägnade att allvarligt skada personens självkänsla.'},
   {mode:'all',label:'Gärningspersonen har uppsåt till de objektiva omständigheterna.'}
  ]},
  {label:'Alternativ B – varaktig övervakning',groups:[
   {mode:'all',label:'En annan person utsätts för otillbörlig övervakning som är varaktig.'},
   {mode:'all',label:'Gärningen är ägnad att allvarligt skada personens självkänsla.'},
   {mode:'all',label:'Gärningspersonen har uppsåt till de objektiva omständigheterna.'}
  ]}
 ],cases:[]
};
content['rymning']={
 source:'BrB 17:12, 17:16 och BrB 1:2 (SFS 2026:924)',groups:[
  {mode:'any',label:'Gärningspersonen har en sådan frihetsberövandestatus som uttryckligen anges i BrB 17:12:',options:[
   'Intagen i kriminalvårdsanstalt eller särskilt ungdomshem enligt angiven lag',
   'Intagen i häkte/polisarrest i avvaktan på förpassning till sådan anstalt eller sådant hem',
   'Häktad på grund av misstanke om brott',
   'Tagen i förvar enligt de i paragrafen angivna lagarna'
  ]},
  {mode:'all',label:'Personen rymmer från ett sådant ställe eller från sådan uppsikt som omfattas av paragrafen.'},
  {mode:'all',label:'Gärningen har begåtts med uppsåt. Om gärningen är ringa utgör den inte brott.'}
 ],cases:[[
  'En person som är häktad för brott klättrar medvetet ut ur häktets rastgård, tar sig förbi säkerhetsstängslet och avviker utan tillstånd.',
  'Eget enkelt typexempel med uttryckligt stöd i BrB 17:12. Gärningens ringa karaktär måste alltid bedömas.'
 ]]
};
content['grov rymning']={
 source:'BrB 17:12 andra stycket (SFS 2026:924)',groups:[
  {mode:'all',label:'Samtliga rekvisit för rymning enligt första stycket är uppfyllda.'},
  {mode:'all',label:'Brottet är grovt efter en helhetsbedömning. Särskilt beaktas noggrann planering eller organisation, alternativt särskilt hänsynslöst eller farligt tillvägagångssätt.'}
 ],cases:[]
};
content['främjande av rymning eller flykt']={
 source:'BrB 17:12 a och BrB 1:2 (SFS 2026:924)',groups:[
  {mode:'any',label:'Ett av följande handlingsalternativ föreligger:',options:[
   'Gärningspersonen hjälper en person som omfattas av lagtextens frihetsberövanden (eller annars är med laga rätt berövad friheten) att komma lös.',
   'Gärningspersonen främjar, genom att dölja personen eller annan sådan åtgärd, rymningen eller flykten efter att en frihetsberövad person har avvikit.'
  ]},
  {mode:'all',label:'Gärningspersonen handlar uppsåtligen och gärningen är inte ringa.'}
 ],cases:[[
  'En person vet att en häktad bekant har rymt och gömmer därefter medvetet den häktade i sin källare för att försvåra att personen hittas.',
  'Eget enkelt typexempel med stöd i BrB 17:12 a andra handlingsalternativet.'
 ]]
};
content['grovt främjande av rymning eller flykt']={
 source:'BrB 17:12 a andra stycket (SFS 2026:924)',groups:[
  {mode:'all',label:'Rekvisiten för främjande av rymning eller flykt enligt första stycket är uppfyllda.'},
  {mode:'all',label:'Gärningen är grov efter en helhetsbedömning. Särskilt beaktas noggrann planering/organisation eller särskilt hänsynslös eller farlig gärning.'}
 ],cases:[]
};
const seen=new Set();
for(const crime of D.crimes){
 if(crime.stageType)continue;
 const key=String(crime.title||'').toLocaleLowerCase('sv');
 const item=content[key];if(!item)continue;
 seen.add(key);
 crime.rekvisit15=(item.groups.length||item.routes?.length)?{
  groups:item.groups,routes:item.routes||[],source:item.source,sourceURL:SFS,
  scope:'lagtext-jamford','verifiedOn':'2026-10-16',
  note:'Rekvisitöversikt kontrollerad mot bestämmelsens ordalydelse. Full rättslig tolkning, praxis och undantag är inte slutgranskade.'
 }:null;
 crime.typexempel15=item.cases.map(([text,source,legalSourceURL])=>({
  text,source,sourceURL:legalSourceURL||SFS,lawSourceURL:SFS,
  kind:'typfall',status:'source-attributed-typical-example',typecaseReviewed:'2026-10-16'
 }));
}
window.BK_REKVISIT15={examples:seen.size,scope:'initial-low-ambiguity-cases',deferredExamples:['Angrepp mot tjänsteman – spottning/knuff'],juridicallySourceChecked:['märkesförfalskning','trolöshet mot huvudman','grov trolöshet mot huvudman']};
})();
