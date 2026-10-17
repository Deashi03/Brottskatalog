/* V1.5 continuation 2026-10-17: remaining 10, 11, 14 and 15 chapter offences.
 * Source: consolidated Brottsbalk (1962:700), checked against 2026 text.
 * This is a structured statutory learning aid, NOT a full legal certification.
 * No typecases are invented for uncertain or non-routine offences.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label});
const O=(label,...options)=>({mode:'any',label,options});
const R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const direct=[
 ['Vårdslös finansiering av mutbrott','10:5e',[
  R('Grov oaktsamhet vid tillhandahållande av tillgångar',
   A('Gärningspersonen är näringsidkare och tillhandahåller pengar eller andra tillgångar.'),
   A('Tillgångarna lämnas åt någon som företräder näringsidkaren i en viss angelägenhet.'),
   O('Tillhandahållandet främjar i den angelägenheten:', 'Givande av muta','Grovt givande av muta','Handel med inflytande genom lämnande/erbjudande av förmån enligt BrB 10:5 d p. 2'),
   A('Främjandet har skett av grov oaktsamhet. Brottet kräver inte att näringsidkaren själv haft uppsåt att muta.'))]],
 ['Brukande av det förfalskade','14:10',[
  R('Bruk av förfalskat bevis eller föremål',
   O('Gärningspersonen brukar något som förfalskats enligt 14 kap., exempelvis genom att:', 'Åberopa en falsk urkund','Bjuda ut eller saluföra ett verk med falsk signatur','Prångla ut falska sedlar eller mynt','Använda falskt värde- eller kontrollmärke','Åberopa ett falskt fast märke','På annat sätt använda något som förfalskats enligt kapitlet'),
   A('Brukandet innebär fara i bevishänseende.'),
   A('Gärningspersonen handlar uppsåtligen. Straffansvaret bedöms som om personen själv hade gjort den aktuella förfalskningen; det är inte en fristående automatisk straffskala.'))]],
 ['Olaga spridande av efterbildning','14:11',[
  R('Spridning av en lätt förväxlingsbar efterbildning',
   A('Något sprids bland allmänheten.'),
   O('Efterbildningen kan lätt förväxlas med:', 'Gällande sedel','Gällande mynt','Offentligt värdemärke'),
   A('Gärningen omfattas inte i stället av brukande av det förfalskade enligt BrB 14:10.'),
   A('Gärningspersonen handlar uppsåtligen. Straffskalan är enbart böter.'))]],
 ['Falskt åtal','15:5',[
  R('Åtal mot en oskyldig med syfte att få en fällande dom',
   A('Gärningspersonen väcker åtal mot en oskyldig person.'),
   A('Gärningspersonen har det särskilda uppsåtet att den oskyldige ska bli fälld till ansvar.'),
   A('Grov och ringa grad kräver separat samlad bedömning; väckande av åtal skiljer detta brott från angivelse enligt BrB 15:6.'))]],
 ['Obefogat åtal','15:5',[
  R('Åtal utan sannolika skäl',
   A('Gärningspersonen väcker åtal.'),
   A('Det saknas sannolika skäl för åtalet.'),
   A('Gärningspersonen har uppsåt till de omständigheter som krävs enligt BrB 1:2. Brottet är inte samma sak som falskt åtal, som har ett särskilt syfte att en oskyldig ska fällas.'))]],
 ['Förnekande av underskrift','15:13',[
  R('Förnekande som skapar bevissvårighet',
   O('Gärningspersonen förnekar:', 'Sin egen underskrift på en urkund','Sin egen utställarangivelse på en urkund, när den kan likställas med en underskrift'),
   A('Förnekandet innebär fara i bevishänseende.'),
   A('Gärningspersonen handlar uppsåtligen. Grov grad bedöms separat enligt samma paragraf.'))]],
 ['Missbruk av handling','15:12',[
  R('Falskt påstådd överensstämmelse med original',
   A('Gärningspersonen ger sanningslöst ut en handling som en riktig kopia av en viss urkund.'),
   A('Handlingen innebär fara i bevishänseende.'),
   A('Gärningspersonen handlar uppsåtligen. Straffet följer första eller andra stycket i 15:12 beroende på grad.'))]],
 ['Osann utsaga inför nordisk domstol','15:4a',[
  R('Utsaga motsvarande ed i svensk rätt',
   A('Gärningspersonen lämnar en utsaga under straffansvar inför domstol i Danmark, Finland, Island eller Norge.'),
   O('Gärningen består av:', 'Osann uppgift','Förtigande av sanningen'),
   A('Utsagan skulle i Sverige ha avgetts under laga ed.'),
   A('Gärningen är uppsåtlig. Påföljd följer BrB 15:1 och undantag/övriga regler i 15:4, 14–15 ska prövas.')),
  R('Part i tvistemål',
   A('Gärningspersonen är part i tvistemål och yttrar sig under straffansvar inför nordisk domstol.'),
   O('Gärningen består av:', 'Osann uppgift','Förtigande av sanningen'),
   A('Gärningen är uppsåtlig. Påföljd följer BrB 15:2 och lagens uttryckliga undantagsregler.'))]],
 ['Ovarsam utsaga inför nordisk domstol','15:4a',[
  R('Grov oaktsamhet vid utsaga inför nordisk domstol',
   A('Utsaga lämnas under straffansvar i Danmark, Finland, Island eller Norge i situation som motsvarar lagföreskriven ed eller partsutsaga i svenskt tvistemål.'),
   O('Gärningen består av:', 'Osann uppgift','Förtigande av sanningen'),
   A('Gärningspersonen är grovt oaktsam. Straff följer BrB 15:3, inte uppsåtliga 15:1–2.'),
   A('Bestämmelserna i BrB 15:4, 14–15 kan vara tillämpliga.'))]],
 ['Osann utsaga inför en internationell domstol','15:4b',[
  R('Uppsåtlig osann edsutsaga',
   A('Gärningspersonen är vittne eller sakkunnig under ed inför EU-domstolen, dess tribunal, EFTA-domstolen eller Internationella brottmålsdomstolen.'),
   O('Gärningen består av:', 'Osann uppgift','Förtigande av sanningen'),
   A('Utsagan skulle i Sverige ha avgetts under laga ed och är uppsåtligt osann.'),
   A('Påföljd följer BrB 15:1; tillämpliga undantag och regler i BrB 15:4, 14–15 ska prövas.'))]],
 ['Ovarsam utsaga inför en internationell domstol','15:4b',[
  R('Grov oaktsamhet inför särskilt angivna internationella domstolar',
   A('Gärningspersonen är vittne eller sakkunnig under ed inför EU-domstolen, dess tribunal eller EFTA-domstolen.'),
   O('Gärningen består av:', 'Osann uppgift','Förtigande av sanningen'),
   A('Oriktigheten eller förtigandet sker genom grov oaktsamhet.'),
   A('Oaktsamhetsansvar enligt detta stycke gäller uttryckligen INTE utsaga inför Internationella brottmålsdomstolen.'),
   A('Påföljd följer BrB 15:3; tillämpliga undantag i 15:4, 14–15 måste prövas.'))]]
];
const grades=[
 // BrB 10:5 c – alternative primary conduct must be kept separate.
 ['Grovt tagande av muta','10:5c','Tagande av muta',
  'Helhetsbedömning som grovt brott. Särskilt beakta missbruk av särskilt ansvarsfull ställning, betydande värde, systematik/större omfattning eller särskilt farlig art.'],
 ['Grovt givande av muta','10:5c','Givande av muta',
  'Helhetsbedömning som grovt brott. Särskilt beakta angrepp på särskilt ansvarsfull ställning, betydande värde, systematik/större omfattning eller särskilt farlig art.'],
 ['Ringa bokföringsbrott','11:5','Bokföringsbrott',
  'Om bokföringsbrottets samtliga rekvisit är uppfyllda måste brottet efter en självständig helhetsbedömning vara ringa. Bedöm bland annat omfattning, karaktär och betydelse; ingen enskild värdegräns är automatiskt avgörande.'],
 ['Grovt förtal','5:2','Förtal',
  'Helhetsbedömning som grovt förtal. Beakta särskilt uppgiftens innehåll, spridningens omfattning, sättet för spridning och om gärningen annars var ägnad att medföra allvarlig skada. Ansvarsfrihetsprövningen enligt BrB 5:1 gäller även här.'],
 ['Grov märkesförfalskning','14:8','Märkesförfalskning','Efter en samlad bedömning är den styrkta märkesförfalskningen grov. BrB 14:8 ger ingen uttömmande lista med obligatoriska grovhetsfaktorer.'],
 ['Grov olovlig befattning med falska pengar','14:7','Olovlig befattning med falska pengar','Efter en samlad bedömning är befattningen grov. Det särskilda uppsåtet att falska pengar ska prånglas ut krävs även för denna grad.'],
 ['Grov penningförfalskning','14:6','Penningförfalskning','Efter en samlad bedömning är den styrkta penningförfalskningen grov. De övriga rekvisiten från grundbrottet måste alltjämt vara uppfyllda.'],
 ['Grov signaturförfalskning','14:5','Signaturförfalskning','Efter en samlad bedömning är signaturförfalskningen grov. Ingen obligatorisk enskild kvalifikationsfaktor anges i paragrafen.'],
 ['Grovt hindrande av urkunds bevisfunktion','14:4','Hindrande av urkunds bevisfunktion','Efter en samlad bedömning är hindrandet grovt. Fara i bevishänseende och undantaget vid bokföringsbrott måste fortsatt prövas.'],
 ['Ringa förfalskning av fast märke','14:9','Förfalskning av fast märke','Efter en samlad bedömning är förfalskningen ringa; fara i bevishänseende måste fortfarande föreligga.'],
 ['Ringa hindrande av urkunds bevisfunktion','14:4','Hindrande av urkunds bevisfunktion','Efter en samlad bedömning är hindrandet ringa; åtgärden måste fortfarande innebära fara i bevishänseende.'],
 ['Ringa märkesförfalskning','14:8','Märkesförfalskning','Efter en samlad bedömning är märkesförfalskningen ringa; fara i bevishänseende måste fortfarande föreligga.'],
 ['Ringa olovlig befattning med falska pengar','14:7','Olovlig befattning med falska pengar','Efter en samlad bedömning är befattningen ringa; uppsåtet att det falska ska prånglas ut krävs fortfarande.'],
 ['Ringa penningförfalskning','14:6','Penningförfalskning','Efter en samlad bedömning är penningförfalskningen ringa; föremålet måste omfattas av BrB 14:6.'],
 ['Ringa signaturförfalskning','14:5','Signaturförfalskning','Efter en samlad bedömning är signaturförfalskningen ringa; skenet av annans upphovsmannaskap kvarstår som grundrekvisit.'],
 ['Grov bevisförvanskning','15:8','Bevisförvanskning','Efter en samlad bedömning är bevisförvanskningen grov; särskilt uppsåt att oskyldig ska fällas krävs alltjämt.'],
 ['Grov falsk angivelse','15:6','Falsk angivelse','Efter en samlad bedömning är den uppsåtliga angivelsen grov. Särskilt beakta om angivelsen avsett allvarlig brottslighet.'],
 ['Grov falsk beskyllning','15:7','Falsk beskyllning','Efter en samlad bedömning är den uppsåtliga beskyllningen grov. Särskilt beakta om den avsett allvarlig brottslighet.'],
 ['Grov mened','15:1','Mened','Efter en samlad bedömning är meneden grov. Särskilt beakta uppsåt att försvåra utredning/lagföring av allvarlig brottslighet, få oskyldig dömd för sådan brottslighet eller tillfoga synnerlig skada.'],
 ['Grovt falskt åtal','15:5','Falskt åtal','Efter en samlad bedömning är det uppsåtliga falska åtalet grovt. Särskilt beakta åtal om allvarligt brott eller missbruk av tjänsteställning.'],
 ['Grovt missbruk av urkund','15:12','Missbruk av urkund','Efter en samlad bedömning är missbruket grovt; fara i bevishänseende krävs fortfarande.'],
 ['Ringa falsk angivelse','15:6','Falsk angivelse','Efter en samlad bedömning är den uppsåtliga falska angivelsen ringa.'],
 ['Ringa falsk beskyllning','15:7','Falsk beskyllning','Efter en samlad bedömning är den uppsåtliga falska beskyllningen ringa.'],
 ['Ringa osann partsutsaga','15:2','Osann partsutsaga','Efter en samlad bedömning är den uppsåtliga partsutsagan ringa; den måste fortsatt ha avgetts under sanningsförsäkran i rättegång.']
];
const results={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const assign=(c,ref,groups,routes)=>{
 c.rekvisit15={groups,routes,source:'Brottsbalken (1962:700), '+ref+' samt BrB 1:2 där tillämpligt',
  sourceURL:SRC,scope:'lagtext-jamford',verifiedOn:'2026-10-17',legalReviewApproved:false,
  note:'Lagtextnära studiestöd. För gradindelning krävs en samlad bedömning; undantag, gärningsdatum, konkurrens, förarbeten och praxis är inte fullständigt granskade. Ej juridiskt slutcertifierat.'};
 results.added.push(c.title);
};
for(const [title,ref,routes] of direct){
 const c=by(title);if(!c){results.missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){results.mismatch.push(title+': '+c.shortRef);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){results.missing.push('lagtext: '+ref);continue;}
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){results.already.push(title);continue;}
 assign(c,ref,[],routes);
}
for(const [title,ref,parentName,qualification] of grades){
 const c=by(title);if(!c){results.missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){results.mismatch.push(title+': '+c.shortRef);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){results.missing.push('lagtext: '+ref);continue;}
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){results.already.push(title);continue;}
 const p=by(parentName);
 if(!p?.rekvisit15 || !(p.rekvisit15.groups?.length||p.rekvisit15.routes?.length)){
  results.missingParent.push(title+' ← '+parentName);continue;
 }
 const parent=JSON.parse(JSON.stringify(p.rekvisit15));
 const qualifier=A('Gradindelning – ej självständig gärningsväg: '+qualification);
 const groups=parent.groups?.length?[...parent.groups,qualifier]:[];
 const routes=parent.routes?.length?parent.routes.map(route=>({...route,groups:[...(route.groups||[]),qualifier]})):[];
 assign(c,ref,groups,routes);
}
window.BK_REKVISIT_FORTS15=results;
})();