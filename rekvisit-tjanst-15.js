/* V1.5: all eight previously unstructured BrB chapter 17 offences.
 * Source: official consolidated BrB 17:2, 8, 10, 11, 13.
 * Grave-factor lists are not conjunctive statutory predicates.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const rows=[
 ['Otillbörligt verkande vid röstning','17:8',[
  R('Påverkan på allmän omröstning',
   A('Gärningen sker vid val till allmän befattning eller annan utövning av rösträtt i allmänt ärende.'),
   O('Gärningspersonen försöker:', 'Hindra omröstningen','Förvanska omröstningens utgång','På annat sätt otillbörligen inverka på omröstningen'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Tagande av otillbörlig förmån vid röstning','17:8',[
  R('Otillbörlig förmån för röst eller avstående',
   O('Gärningspersonen:', 'Tar emot en otillbörlig förmån','Godtar löfte om otillbörlig förmån','Begär en otillbörlig förmån'),
   A('Förmånen gäller att i ett allmänt ärende rösta på ett visst sätt eller att inte rösta.'),
   A('Gärningen är inte i stället tagande av muta och omfattas av uppsåt.'))]],
 ['Överträdelse av myndighets bud','17:13',[
  R('Otillåten disposition över egendom vid tvångsåtgärd',
   A('Egendomen är föremål för utmätning, kvarstad, betalningssäkring, beslag eller en jämförbar myndighetsåtgärd.'),
   O('Gärningspersonen handlar olovligen genom att:', 'Rubba egendomen','Skada egendomen','Annars förfoga över egendomen'),
   A('Gärningen omfattas av uppsåt.')),
  R('Myndighets anslag, försegling eller tillslutning',
   O('Gärningsformen är:', 'Skada myndighets anslag','Ta bort myndighets anslag','Skada myndighets försegling','Ta bort myndighets försegling','Olovligen öppna något myndighet tillslutit'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Annat jämförbart myndighetsförbud',
   A('Ett förbud av sådan art som paragrafen beskriver har meddelats av behörig myndighet.'),
   A('Gärningspersonen överträder förbudet uppsåtligen.'))]],
 ['Hindrande av förrättning','17:13',[
  R('Vägrat tillträde för förrättningsman',
   A('En förrättningsman har rätt att fordra inträde i den aktuella situationen.'),
   A('Gärningspersonen vägrar förrättningsmannen det inträde som denne har rätt att fordra.'),
   A('Gärningspersonen handlar uppsåtligen. Straffskalan i BrB 17:13 andra stycket är enbart böter.'))]],
 ['Grovt angrepp mot tjänsteman','17:2',null,'Angrepp mot tjänsteman',
  'Om brottet efter en samlad bedömning är grovt ska särskilt beaktas allvarligt våld mot tjänstemannens närstående, särskilt förstärkt/allvarligt hot mot sådan närstående, betydande värde eller synnerligen kännbar skada, eller annan särskilt hänsynslös/farlig art.'],
 ['Grovt otillbörligt verkande vid röstning','17:8',null,'Otillbörligt verkande vid röstning',
  'Efter en samlad grovhetsbedömning ska särskilt beaktas om gärningen skett med våld, hot om våld eller missbruk av tjänsteställning.'],
 ['Grovt skyddande av brottsling','17:11',null,'Skyddande av brottsling',
  'Grovhetsgraden kräver helhetsbedömning. Särskilt beaktas betydande men eller risk för sådant men för det allmänna, eller annan särskilt farlig art. Den särskilda oaktsamhetsliknande bötesvarianten i BrB 17:11 är inte i sig grund för den grova graden.'],
 ['Grovt övergrepp i rättssak','17:10',null,'Övergrepp i rättssak',
  'Efter helhetsbedömning ska särskilt beaktas betydande men eller risk för sådant men för det allmänna eller enskild, våld av allvarligt slag, kraftigt förstärkt eller allvarligt hot, eller särskilt hänsynslös/farlig art. Regeln om mindre allvarligt brott är en annan gradbedömning.']
];
const get=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
let added=0,already=0;const missing=[],mismatch=[],completed=[];
for(const [title,ref,routes,parent,grade] of rows){
 const c=get(title);if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatch.push(title+' '+c.shortRef);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('SFS provision missing: BrB '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){already++;continue;}
 let groups=[],selected=routes||[];
 if(parent){
  const p=get(parent);
  if(!p?.rekvisit15 || !(p.rekvisit15.groups?.length||p.rekvisit15.routes?.length)){
   missing.push(title+' parent '+parent);continue;
  }
  const prev=JSON.parse(JSON.stringify(p.rekvisit15));
  groups=prev.groups||[];selected=prev.routes||[];
  const requirement=A('Särskild gradbedömning: '+grade);
  if(selected.length)selected=selected.map(r=>({...r,groups:[...(r.groups||[]),requirement]}));
  else groups=[...groups,requirement];
 }
 c.rekvisit15={groups,routes:selected,source:'BrB '+ref+' samt hänvisat grundbrott',sourceURL:SRC,
  scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Lagtextbaserat rekvisitstöd. ”Särskilt beaktas” avser exempel på grovhetsfaktorer, inte villkor som alla ska vara uppfyllda. Kontrollera relevant praxis, ändringsdatum, konkurrens och subjektiva rekvisit.'};
 added++;completed.push(title);
}
window.BK_REKVISIT_TJANST15={added,already,missing,mismatch,completed,source:SRC};
})();