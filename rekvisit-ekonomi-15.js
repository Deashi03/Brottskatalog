/* V1.5: additional BrB 8–9 requisite routes, SFS checked 2026-10-16.
 * Distinguishes offence creation, holistic degrees and subsidiary rules.
 * Legal confirmation still requires praxis and offence-date verification.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const rows=[
 ['Ringa tillgrepp av fortskaffningsmedel','8:7',[
  R('Ringa tillgrepp av motorfordon',
   A('Gärningspersonen olovligen tar och brukar någon annans motorfordon eller annat motordrivet fortskaffningsmedel.'),
   A('Gärningen ska inte i stället omfattas av tillgreppsbrotten som anges i BrB 8:7.'),
   A('Gärningen är ringa efter en samlad bedömning.'),
   A('Gärningspersonen handlar uppsåtligen. Om gärningen bara nått försöksstadiet och skulle ha varit ringa som fullbordad gärning, följer straffrihet av BrB 8:12 andra stycket.'))]],
 ['Olovlig befattning med betalningsverktyg','9:3c',[
  R('Olovligt införskaffande',A('Gärningspersonen införskaffar ett betalningsverktyg olovligen.'),
   A('Med betalningsverktyg avses ett skyddat verktyg, handling eller uppgift som möjliggör överföring av pengar eller penningvärde.'),
   A('Gärningspersonen handlar uppsåtligen och brottet är inte redan straffbelagt med samma eller strängare straff enligt annan BrB-bestämmelse.')),
  R('Förfalskning för bedräglig användning',
   A('Ett betalningsverktyg förvanskas eller framställs falskt.'),
   A('Gärningspersonen har särskilt syfte att det ska användas bedrägligt.'),
   A('Gärningen är uppsåtlig; särskild subsidiaritetsregel i BrB 9:3 c sista stycket måste prövas.')),
  R('Användning eller annan befattning med obehörigt verktyg',
   O('Handlingen består av:', 'Användning av olovligen införskaffat, förvanskat eller falskt betalningsverktyg','Annan befattning med sådant betalningsverktyg'),
   A('Gärningspersonen handlar uppsåtligen. Samma eller strängare straff för gärningen enligt annan BrB-regel utesluter ansvar enligt denna paragraf.'))]],
 ['Företagskapning','9:3d',[
  R('Olovlig användning av juridisk persons identitet',
   A('En juridisk persons identitetsuppgifter används olovligen.'),
   A('Gärningspersonen utger sig genom användningen för att företräda den juridiska personen.'),
   A('Gärningspersonen har särskilt syfte att bereda sig själv eller någon annan vinning.'),
   O('Handlingen leder till:', 'Skada för den vars identitet används','Olägenhet för den vars identitet används'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Grovt fordringsbedrägeri','9:3a',[
  R('Bedrägliga betalningsuppmaningar till en vidare krets',
   A('Betalningsuppmaningar riktas till en vidare krets.'),
   A('Gärningspersonen har syfte att vilseleda mottagarna till handling.'),
   A('Den avsedda handlingen ska innebära vinning för gärningspersonen och skada för mottagaren eller någon i vars ställe denne är.'),
   A('Förfarandet har avsett betydande värde. Detta är ett särskilt brott och kräver inte att betalningen redan skett.'),
   A('Gärningspersonen handlar med det föreskrivna uppsåtet.'))]],
 ['Svindleri','9:9',[
  R('Vilseledande uppgift som påverkar marknadspris',
   A('Gärningspersonen offentliggör eller sprider annars bland allmänheten en vilseledande uppgift.'),
   A('Gärningspersonen har syfte att påverka priset på vara, värdepapper eller annan egendom.'),
   A('Gärningen omfattas av uppsåt. Första stycket kräver inte faktisk prisförändring.')),
  R('Vilseledande ekonomisk företagsinformation',
   A('Gärningspersonen medverkar vid företagsbildning eller har genom sin ställning särskild förväntad kännedom om företaget.'),
   A('En vilseledande uppgift offentliggörs eller sprids bland allmänheten eller företagets intressenter.'),
   A('Uppgiften är ägnad att påverka bedömningen av företaget ekonomiskt och därigenom medföra skada.'),
   O('Subjektivt rekvisit:', 'Uppsåt','Grov oaktsamhet'))]],
 ['Ringa svindleri','9:9',[
  R('Ringa fall av prisinverkande svindleri',
   A('Gärningsformen gäller uppsåtligt offentliggörande eller spridande av vilseledande uppgift för att påverka pris på egendom, som anges i BrB 9:9 första stycket.'),
   A('Efter samlad bedömning är denna gärning ringa. Straffalternativet står i anslutning till första stycket.'),
   A('Gärningspersonen har uppsåt.'))]],
 ['Ringa utpressning','9:4',[
  R('Utpressning med ringa allvar',
   A('Gärningspersonen genom olaga tvång förmår någon till handling eller underlåtenhet.'),
   A('Det framtvingade innebär vinning för gärningspersonen och skada för den tvingade eller någon i vars ställe denne är.'),
   A('Gärningen utgör inte i stället rån eller grovt rån.'),
   A('Brottet bedöms efter en helhetsbedömning som ringa; uppsåt krävs.'))]],
 ['Grovt svindleri','9:9',null,'Svindleri',
  'Grovhetsbedömningen sker samlat. Särskilt beaktas större omfattning, möjlighet till avsevärd skada eller annan särskilt farlig art. För andra styckets företagsinformation gäller även uttrycklig grov oaktsamhet som möjlig skuldform.'],
 ['Grov olovlig befattning med betalningsverktyg','9:3c',null,'Olovlig befattning med betalningsverktyg',
  'Efter helhetsbedömning särskilt beakta hänsynslöst utnyttjande av skyddslös/utsatt person, betydande värde eller risk för synnerligen kännbar skada, organisering/systematik eller särskilt farlig art. Subsidiaritetsundantaget gäller fortfarande.'],
 ['Grovt utförselhäleri','9:6a',null,'Utförselhäleri',
  'Efter samlad grovhetsbedömning särskilt beakta betydande värde, systematisk brottslighet eller annars särskilt farlig art. Det grundläggande utförselsyftet och att befattningen är ägnad att försvåra återställande kvarstår.']
];
const get=t=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
let added=0,already=0;const missing=[],mismatch=[],done=[];
for(const [title,ref,routes,parent,grade] of rows){
 const c=get(title);if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatch.push(title+': '+c.shortRef);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Missing SFS '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){already++;continue;}
 let groups=[],paths=routes||[];
 if(parent){
  const p=get(parent);
  if(!(p?.rekvisit15?.groups?.length||p?.rekvisit15?.routes?.length)){missing.push(title+' parent '+parent);continue;}
  const copy=JSON.parse(JSON.stringify(p.rekvisit15));
  groups=copy.groups||[];paths=copy.routes||[];
  const qualification=A('Särskild gradbedömning: '+grade);
  if(paths.length)paths=paths.map(r=>({...r,groups:[...(r.groups||[]),qualification]}));
  else groups=[...groups,qualification];
 }
 c.rekvisit15={groups,routes:paths,source:'BrB '+ref+' (aktuell SFS)',sourceURL:SRC,
  scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Lagtextanknuten rekvisitlista. Helhetsbedömning, subsidiaritet och subjektiva rekvisit får inte avgöras automatiskt. Kontrollera gärningsdatum, rättspraxis och undantag.'};
 added++;done.push(title);
}
window.BK_EKONOMI_REKVISIT15={added,already,missing,mismatch,done,source:SRC};
})();