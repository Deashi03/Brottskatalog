/* V1.5: police-oriented additional source-scoped requisite cards.
 * These are faithful, bounded explanations of specific statutory wording,
 * not generalized police powers, evidence of guilt or completed case-law review.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label});
const O=(label,...options)=>({mode:'any',label,options});
const specs=[
 ['Våldsamt motstånd','17:4',[
  A('En tjänsteman utför myndighetsutövning. Även en person med motsvarande lagstadgat skydd enligt 17:5 kan omfattas.'),
  O('Gärningspersonen försöker hindra tjänstemannen genom:', 'Att sätta sig till motvärn med våld','Annat våld som används för att hindra myndighetsutövningen'),
  A('Gärningen omfattas inte i stället av BrB 17:1 eller 17:2.'),
  A('Gärningspersonen handlar uppsåtligen; passivt motstånd utan våld uppfyller inte i sig detta brotts rekvisit.')
 ]],
 ['Angrepp mot tjänsteman','17:2',[],[
  {label:'Brottsligt angrepp på tjänsteman eller närstående',groups:[
   A('En tjänsteman eller dennes närstående angrips genom en brottslig gärning.'),
   O('Kopplingen till myndighetsutövningen är:', 'Angreppet sker vid myndighetsutövningen','Angreppet sker i syfte att framtvinga, hindra eller hämnas en åtgärd vid myndighetsutövningen','Angreppet riktas mot tidigare tjänsteman eller närstående på grund av vad tjänstemannen tidigare gjort eller inte gjort vid myndighetsutövning'),
   A('Gärningen omfattas inte av den särskilda bestämmelsen i BrB 17:1 eller 17:3. Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Annan otillbörlig gärning eller hot',groups:[
   A('Gärningen riktas mot tjänsteman eller närstående för att framtvinga, hindra eller hämnas en åtgärd vid myndighetsutövningen.'),
   O('Angreppet består av:', 'Annan otillbörlig gärning som innebär lidande, skada eller olägenhet för tjänstemannen','Hot om en sådan otillbörlig gärning'),
   A('Gärningspersonen har uppsåt till gärningen och det särskilda syftet.') ]}
 ]],
 ['Övergrepp i rättssak','17:10',[],[
  {label:'Angrepp genom våld eller hot om våld',groups:[
   O('Våld eller hot om våld sker för att:', 'Hämnas anmälan, talan, vittnesmål eller annan utsaga vid förhör inför domstol eller myndighet','Hindra anmälan, talan, vittnesmål eller annan sådan åtgärd'),
   A('Angreppet riktas mot någon person med koppling till den skyddade rättsliga åtgärden.'),
   A('Gärningspersonen handlar med uppsåt, inklusive det särskilda avsiktsrekvisitet.') ]},
  {label:'Annan skade- eller olägenhetsgärning, eller hot om sådan',groups:[
   A('Det skyddade sammanhanget gäller vittnesmål eller annan utsaga vid förhör hos myndighet.'),
   O('Angreppet består av:', 'Annan gärning som orsakar lidande, skada eller olägenhet','Hot om en sådan gärning'),
   A('Gärningspersonen handlar för att hindra eller hämnas ett vittnesmål eller en sådan utsaga och har uppsåt.') ]}
 ]],
 ['Bevisförvanskning','15:8',[
  O('Gärningen avser:', 'Förvanskning av bevis','Undanröjande av bevis','Åberopande av falskt bevis'),
  A('Gärningspersonen har särskilt uppsåt att en oskyldig person ska fällas till ansvar.'),
  A('Frågan om ringa eller grovt brott måste bedömas särskilt.')
 ]],
 ['Obefogad angivelse','15:6',[
  A('En oskyldig person anges till åtal.'),
  A('Gärningspersonen insåg inte oskulden men hade skälig anledning att anta att personen var oskyldig.'),
  A('Den särskilda skuldformen i andra delen av BrB 15:6 ska hållas isär från uppsåtlig falsk angivelse.')
 ]],
 ['Vårdslös beskyllning','15:7',[
  O('Hos behörig myndighet lämnas:', 'Osann beskyllning om annans brottsliga gärning','Osann uppgift om besvärande omständighet','Osant förnekande av friande eller mildrande omständighet'),
  A('Myndigheten ska ta upp en anmälan i sådan sak.'),
  A('Gärningspersonen insåg inte osanningen men hade skälig anledning att anta att uppgiften var osann. Uppsåtsformen rubriceras i stället som falsk beskyllning.')
 ]],
 ['Tillgrepp av fortskaffningsmedel','8:7',[
  A('Ett motorfordon eller annat motordrivet fortskaffningsmedel tillhör någon annan.'),
  A('Fordonet tas och brukas olovligen.'),
  A('Gärningen är inte straffbar som stöld, rån eller annan i BrB 8:7 uttryckligen prioriterad tillgreppsrubricering.'),
  A('Gärningspersonen handlar uppsåtligen. Ringa och grov grad prövas separat.')
 ]],
 ['Skadegörelse','12:1',[
  O('Gärningspersonen:', 'Förstör egendom','Skadar egendom'),
  A('Åtgärden innebär men för någon annans rätt till egendomen.'),
  A('Gärningspersonen handlar uppsåtligen. Ringa och grov grad bedöms separat.')
 ]],
 ['Allmänfarlig vårdslöshet','13:6',[],[
  {label:'Brand eller annan angiven ofärd',groups:[
   A('Gärningspersonen handlar oaktsamt, exempelvis genom ovarsam hantering av eld eller sprängämne.'),
   O('Gärningen orsakar:', 'Brand eller ofärd enligt BrB 13:1–3','Fara för en sådan brand eller ofärd'),
   A('Det finns ett relevant orsakssamband mellan oaktsamheten och följden/faran.') ]},
  {label:'Samhällsfarlig skada eller hinder',groups:[
   A('Gärningspersonen handlar oaktsamt.'),
   A('Oaktsamheten orsakar skada eller hinder enligt BrB 13:4 eller de särskilda gärningar i 13:5 a–b som omfattas av BrB 13:6.'),
   A('Lagtextens hänvisningar måste vara uppfyllda.')}
 ]],
 ['Häleriförseelse','9:7',[],[
  {label:'Alternativ A – ringa häleri eller utförselhäleri',groups:[
   A('Gärningen uppfyller rekvisiten för häleri eller utförselhäleri enligt BrB 9:6 eller 6 a.'),
   A('Gärningen är ringa vid en samlad bedömning.') ]},
  {label:'Alternativ B – misstänkt brottsgods',groups:[
   A('Något som skäligen kan antas vara frånhänt annan genom brott förvärvas eller mottas.'),
   A('Åtgärden är ägnad att försvåra återställande, men faller utanför 9:6 andra stycket.'),
   A('Gärningspersonen handlar uppsåtligen till relevanta omständigheter.') ]},
  {label:'Alternativ C – skälig anledning att anta brott',groups:[
   A('Gärningsformen omfattas av BrB 9:6 första stycket eller den särskilt angivna medverkanssituationen.'),
   A('Gärningspersonen insåg inte brottet men hade skälig anledning att anta att sådant brott förelåg.')}
 ]],
 ['Tagande av muta','10:5a',[],[
  {label:'Arbetstagare eller uppdragstagare',groups:[
   A('Gärningspersonen är arbetstagare eller utövar ett uppdrag; även tiden före eller efter ställningen kan omfattas enligt paragrafen.'),
   O('Gärningspersonen:', 'Tar emot en förmån','Godtar ett löfte om en förmån','Begär en förmån'),
   A('Förmånen är otillbörlig och har anknytning till utövandet av anställningen eller uppdraget.'),
   A('Gärningspersonen handlar uppsåtligen. Förmånen kan vara avsedd för någon annan.') ]},
  {label:'Deltagare eller funktionär vid vadhållningstävling',groups:[
   A('Personen deltar i eller är funktionär i tävling med allmänt anordnad vadhållning.'),
   A('En otillbörlig förmån begärs, mottas eller utlovas i samband med uppgifter vid tävlingen.'),
   A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Givande av muta','10:5b',[
  O('Gärningspersonen:', 'Lämnar en otillbörlig förmån','Utlovar en otillbörlig förmån','Erbjuder en otillbörlig förmån'),
  A('Förmånen lämnas i en sådan anställnings-, uppdrags- eller tävlingssituation som avses i BrB 10:5 a.'),
  A('Gärningspersonen handlar uppsåtligen.')
 ]],
 ['Handel med inflytande','10:5d',[],[
  {label:'Alternativ A – mottar eller begär förmån',groups:[
   O('Gärningspersonen:', 'Tar emot en otillbörlig förmån','Godtar löfte om otillbörlig förmån','Begär otillbörlig förmån'),
   A('Syftet är att påverka någon annans beslut eller åtgärd vid myndighetsutövning eller offentlig upphandling.'),
   A('Gärningen omfattas inte av tagande/givande av muta enligt BrB 10:5 a–b och är uppsåtlig.') ]},
  {label:'Alternativ B – lämnar eller erbjuder förmån',groups:[
   O('Gärningspersonen:', 'Lämnar otillbörlig förmån','Utlovar otillbörlig förmån','Erbjuder otillbörlig förmån'),
   A('Syftet är att mottagaren ska påverka någon annans beslut eller åtgärd vid myndighetsutövning eller offentlig upphandling.'),
   A('Gärningen omfattas inte av BrB 10:5 a–b och är uppsåtlig.') ]}
 ]],
 ['Vårdslöshet mot borgenärer','11:3',[
  A('Gärningspersonen är på obestånd eller påtaglig fara för obestånd föreligger; lagtexten omfattar även särskilt fall där denne borde ha insett situationen.'),
  O('Handlandet består bland annat av:', 'Fortsatt rörelse med avsevärd resursförbrukning utan motsvarande nytta','Slösaktigt levnadssätt','Äventyrligt företag','Lättsinnig ansvarsförbindelse','Annan liknande åtgärd'),
  A('Gärningen försämrar förmögenhetsställningen i avsevärd mån.'),
  O('Skuldformen till den relevanta försämringen är:', 'Uppsåt','Grov oaktsamhet')
 ]],
 ['Otillbörligt gynnande av borgenär','11:4',[],[
  {label:'Alternativ A – särskilt betalnings- eller säkerhetsgynnande',groups:[
   A('Gäldenären är på obestånd.'),
   O('En borgenär gynnas genom:', 'Betalning av oförfallen skuld','Betalning med annat än sedvanligt betalningsmedel','Säkerhet som inte betingades vid skuldens uppkomst','Annan jämförbar åtgärd'),
   A('Åtgärden skapar påtaglig fara för att en annan borgenärs rätt ska förringas avsevärt.'),
   A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – annan otillbörlig förmånsbehandling',groups:[
   A('Gäldenären är på obestånd och gynnar en viss borgenär i otillbörligt syfte på annat sätt.'),
   A('Påtaglig fara uppstår för att en annan borgenärs rätt ska förringas avsevärt.'),
   A('Gärningspersonen har uppsåt till gärningen och det särskilda syftet.') ]},
  {label:'Alternativ C – hemlig förmån vid ackord/planförhandling',groups:[
   A('Gäldenären lämnar eller utlovar i hemlighet betalning eller annan förmån för att främja ackord eller skulduppgörelse vid planförhandling.'),
   A('Gärningspersonen handlar uppsåtligen med det angivna syftet.') ]}
 ]],
 ['Köp av sexuell handling','6:11',[
  A('En person förmås mot ersättning att företa eller tåla en sexuell handling.'),
  A('Syftet är huvudsakligen att delta i eller förevisas handlingen.'),
  A('Ersättningen kan ha lämnats eller utlovats av gärningspersonen eller någon annan.'),
  A('Gärningen omfattas inte av tidigare bestämmelse i BrB 6 kap., och gärningspersonen handlar uppsåtligen.')
 ]],
 ['Olovlig kårverksamhet','18:4',[
  A('En sammanslutning är avsedd att vara eller kan lätt utvecklas till ett maktmedel likt militär trupp eller polisstyrka.'),
  A('Sammanslutningen förstärker inte med behörigt tillstånd försvar eller ordningsmakt.'),
  O('Gärningspersonen deltar genom:', 'Att bilda sammanslutningen','Att delta i den','Att för sammanslutningen hantera vapen, ammunition eller liknande utrustning','Att upplåta lokal eller mark','Att understödja den ekonomiskt eller på annat sätt'),
  A('Gärningspersonen handlar uppsåtligen.')
 ]],
 ['Spioneri','19:5',[],[
  {label:'Alternativ A – uppgift',groups:[
   A('Uppgiften avser förhållande vars uppenbarande för främmande makt eller motsvarande kan medföra men för Sveriges säkerhet.'),
   O('Gärningspersonen agerar obehörigen genom:', 'Anskaffande','Befordrande','Lämnande','Röjande'),
   A('Gärningspersonen har särskilt syfte att gå främmande makt eller motsvarande tillhanda.') ]},
  {label:'Alternativ B – skrift, teckning eller annat föremål',groups:[
   A('Föremålet innefattar en uppgift som omfattas av BrB 19:5.'),
   O('Gärningspersonen obehörigen:', 'Framställer föremålet','Tar befattning med föremålet'),
   A('Gärningspersonen har syfte att gå främmande makt eller motsvarande tillhanda.') ]}
 ]],
 ['Förvanskande av familjeställning','7:3',[
  O('Gärningen sker genom:', 'Att understicka eller förbyta barn','Oriktig anmälan till myndighet','Underlåten anmälan'),
  A('Gärningen tillvällar någon falsk familjeställning eller berövar någon den rätta familjeställningen.'),
  A('Gärningspersonen handlar uppsåtligen.')
 ]],
 ['Barnadråp','3:3',[
  A('En kvinna dödar sitt eget barn vid födelsen eller vid tid då hon på grund av nedkomsten befinner sig i upprivet sinnestillstånd eller svårt trångmål.'),
  A('Dödandet är uppsåtligt.'),
  A('Den särskilda person- och situationella avgränsningen i BrB 3:3 måste vara uppfylld.')
 ]]
];
const normalize=s=>String(s||'').replace(/\s/g,'').toLocaleLowerCase('sv');
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
let added=0,existing=0;const missing=[];
for(const [title,ref,groups,routes] of specs){
 const c=by(title);
 if(!c){missing.push(title);continue;}
 if(normalize(c.shortRef)!=='brb'+ref)throw Error('Brottsrubriceringen har annat lagrum än källan: '+title+' har '+c.shortRef+' väntat BrB '+ref);
 const law=window.BK_STATUTES?.['BrB:'+ref]?.text;
 if(!law)throw Error('Lagtext saknas för BrB '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){existing++;continue;}
 c.rekvisit15={groups,routes:routes||[],source:'BrB '+ref+' och BrB 1:2 (där tillämpligt)',
  sourceURL:SFS,scope:'lagtext-jamford',legalReviewApproved:false,verifiedOn:'2026-10-16',
  note:'Punktvis stöd mot gällande lagtext. Begränsningar, subsidiaritet, skuldformer, praxis och gärningsdagens lydelse måste kontrolleras; detta är inte ett fullständigt juridiskt godkännande.'};
 added++;
}
window.BK_POLICE_REKVISIT15={added,existing,missing,source:SFS,scope:'partial-statute-requisites'};
})();