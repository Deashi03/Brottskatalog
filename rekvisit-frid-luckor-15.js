/* V1.5: remaining 13 BrB chapter 4 offence requisite lists.
 * Compare current statutory forms including 2026:950 and 2026:1318.
 * A study checklist is not an individual full legal analysis or certification.
 * No speculative typecases for sensitive or complex crimes.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label});
const O=(label,...options)=>({mode:'any',label,options});
const R=(label,...groups)=>({label,groups});
const legalMarriage=O('Förbindelsen omfattas av:', 'Ett äktenskap giltigt i staten där det ingås, enligt den valda lagens stat eller staten där minst en make har medborgarskap eller hemvist.','En äktenskapsliknande förbindelse med gruppregler som ger makar inbördes rättigheter/skyldigheter och reglerar upplösning.');
const routes=[
 ['Äktenskapstvång','4:4c',[
 R('Giltigt äktenskap',O('Otillbörligt sätt:', 'Olaga tvång','Utnyttjande av utsatt belägenhet','Vilseledande om äktenskapet eller förutsättningarna för dess upplösning'),
 A('Gärningspersonen förmår någon att ingå det aktuella äktenskapet.'),
 A('Äktenskapet har sådan giltighet i minst en stat som krävs i BrB 4:4 c första stycket.'),
 A('Gärningspersonen handlar uppsåtligen; annan tillämplig rubricering enligt BrB 4:1 a har företräde.')),
 R('Äktenskapsliknande förbindelse',O('Otillbörligt sätt:', 'Olaga tvång','Utnyttjande av utsatt belägenhet','Vilseledande om förbindelsen eller villkoren för upplösning'),
 A('Gärningspersonen förmår någon att ingå förbindelsen.'),
 A('Förbindelsen ingås enligt gruppregler där parterna betraktas som makar och anses ha rättigheter/skyldigheter, och där upplösningen regleras.'),
 A('Gärningen omfattas av uppsåt och utgör inte i stället människohandel.'))]],
 ['Barnäktenskapsbrott','4:4c',[
 R('Barnäktenskap genom tvång, utsatthet eller vilseledande',
 A('Den person som ingår förbindelsen är under 18 år. Oaktsamhet om åldersomständigheten kan vara tillräckligt enligt specialregeln.'),
 O('Den otillbörliga påverkan är:', 'Olaga tvång','Utnyttjande av utsatt belägenhet','Vilseledande om äktenskap eller upplösning'),
 A('Gärningspersonen förmår barnet att ingå ett äktenskap eller en äktenskapsliknande förbindelse som omfattas av BrB 4:4 c första eller andra stycket.')),
 R('Barnäktenskap utan föregående otillbörlig påverkan',
 A('Personen som ingår förbindelsen är under 18 år; gärningspersonen har uppsåt till eller är oaktsam beträffande åldern.'),
 O('Handlingen består i att:', 'Förmå barnet att ingå förbindelsen','Tillåta barnet att ingå förbindelsen'),
 A('Äktenskapet är giltigt enligt första stycket eller den äktenskapsliknande förbindelsen uppfyller andra styckets gruppregler.'),
 A('Det krävs inte att olaga tvång, utsatthet eller vilseledande kan styrkas för detta särskilda alternativ.'))]],
 ['Äktenskapsresebrott','4:4d',[
 R('Otillbörligt framkallad utlandsresa',
 A('Gärningspersonen förmår någon att resa till en annan stat än där personen bor.'),
 O('Medlet är:', 'Olaga tvång','Utnyttjande av utsatt belägenhet','Vilseledande'),
 A('Syftet är att den resande ska utsättas för gärning som anges i BrB 4:4 c.'),
 A('Gärningspersonen handlar uppsåtligen med angivet syfte; lagens undantag för människohandel enligt BrB 4:1 a måste prövas.'))]],
 ['Äktenskapsresebrott mot barn','4:4d',[
 R('Resa framkallad med otillbörligt medel',
 A('Barnet har inte fyllt 18 år; åldersomständigheten kan omfattas av oaktsamhet enligt specialregeln.'),
 A('Barnet förmås resa till en annan stat än där barnet bor.'),
 O('Medel:', 'Olaga tvång','Utnyttjande av utsatt belägenhet','Vilseledande'),
 A('Syftet är att barnet ska utsättas för gärning som anges i BrB 4:4 c.')),
 R('Förmå eller tillåta resa utan sådant medel',
 A('Barnet har inte fyllt 18 år. Oaktsamhet om åldern kan vara tillräckligt.'),
 O('Gärningspersonen:', 'Förmår barnet att resa','Tillåter barnet att resa'),
 A('Resan sker till en annan stat än där barnet bor med syfte att barnet ska utsättas för barnäktenskapsbrott enligt BrB 4:4 c tredje stycket.'),
 A('Här krävs inte att olaga tvång, utnyttjande eller vilseledande visas.'))]],
 ['Oskuldskontroll','4:4f',[
 R('Undersökning med särskilt syfte',
 A('Gärningspersonen undersöker en annan persons kvinnliga könsorgan.'),
 O('Syftet är att bedöma om personen:', 'Har haft vaginalt samlag','Framstår som om personen har haft vaginalt samlag','Har deltagit i jämförbara penetrerande sexuella handlingar eller framstår ha gjort det'),
 A('Syftet kan vara för egen eller annans del. Bedömningen måste avse det lagen skyddar, inte en annan medicinsk eller vårdrelaterad undersökning.'),
 A('Gärningen är uppsåtlig och inte ringa; en ringa gärning utgör inte brott enligt paragrafen.'))]],
 ['Intygande av sexuell oskuld','4:4g',[
 R('Intyg om sexuell erfarenhet eller avsaknad',
 O('Intygandet lämnas:', 'Skriftligen','Muntligen'),
 A('Intygandet gäller en annan person och grundas uttryckligen på det kvinnliga könsorganets beskaffenhet.'),
 O('Innehållet intygar att den andre:', 'Har haft vaginalt samlag eller jämförbar penetrerande handling','Inte har haft vaginalt samlag eller jämförbar penetrerande handling'),
 A('Gärningen är uppsåtlig och inte ringa; ringa gärning är uttryckligen undantagen.'))]],
 ['Uppmaning till självmord','4:7a',[
 R('Uppsåtlig uppmaning eller psykisk påverkan',
 O('Handlingen består av:', 'Uppmaning till en annan person att begå självmord','Annan liknande psykisk påverkan mot personen att begå självmord'),
 A('Handlingen är ägnad att medföra en inte obetydlig fara för självmord. Det är inte ett krav att självmord eller försök faktiskt sker.'),
 A('Gärningspersonen har uppsåt till de objektiva fareomständigheterna.'),
 A('En gärning som är mindre allvarlig enligt paragrafens tredje stycke ska inte leda till ansvar.'))]],
 ['Oaktsam uppmaning till självmord','4:7a',[
 R('Psykisk påverkan med oaktsamhet om fareomständigheterna',
 O('Gärningsformen motsvarar första stycket:', 'Uppmaning till självmord','Annan liknande psykisk påverkan'),
 A('Gärningen är ägnad att medföra en inte obetydlig fara för självmord.'),
 A('Gärningspersonen har inte uppsåt men är oaktsam i fråga om de omständigheter som gör gärningen farlig på detta sätt.'),
 A('Mindre allvarlig gärning enligt tredje stycket ska inte leda till ansvar.'))]],
 ['Olovlig avlyssning','4:9a',[
 R('Hemlig avlyssning eller ljudupptagning',
 A('En teknisk anordning för återgivning av ljud används olovligen och i hemlighet.'),
 O('Gärningen avser:', 'Tal i enrum','Samtal mellan andra','Förhandlingar vid sammanträde eller annan sammankomst som allmänheten inte har tillträde till'),
 A('Tal, samtal eller sammankomst uppfyller paragrafens krav på att gärningspersonen inte själv deltar eller obehörigen berett sig tillträde.'),
 A('Bestämmelsen tillämpas bara om BrB 4:8 inte är tillämplig. Gärningen omfattas av uppsåt.'))]],
 ['Dataintrång','4:9c',[
 R('Olovlig åtkomst',
 A('Uppgiften är avsedd för automatiserad behandling.'),
 A('Gärningspersonen bereder sig olovligen tillgång till uppgiften.'),
 A('Gärningspersonen har uppsåt.')),
 R('Olovlig påverkan av uppgifter',
 A('Uppgiften är avsedd för automatiserad behandling.'),
 O('Olovlig åtgärd:', 'Ändrar uppgift','Utplånar uppgift','Blockerar uppgift','För in en sådan uppgift i register'),
 A('Gärningspersonen har uppsåt.')),
 R('Annan allvarlig störning',
 A('En uppgift är avsedd för automatiserad behandling.'),
 A('Gärningspersonen använder olovligen en annan jämförbar åtgärd som allvarligt stör eller hindrar användningen av uppgiften.'),
 A('Gärningspersonen har uppsåt.'))]],
 ['Grovt dataintrång','4:9c',[
 R('Dataintrång som är grovt',
 A('Samtliga tillämpliga grundrekvisit för dataintrång enligt BrB 4:9 c första stycket är uppfyllda.'),
 A('Gärningen bedöms som grov efter en samlad bedömning.'),
 O('Omständigheter som enligt paragrafen särskilt ska beaktas – inte var för sig obligatoriska:', 'Allvarlig skada','Ett stort antal uppgifter','Annars särskilt farlig art'),
 A('Straffskalan i gällande lydelse är fängelse lägst ett år och högst åtta år; kontrollera gärningsdatum.'))]],
 ['Förberedelse genom anbringande av tekniskt hjälpmedel','4:9b',[
 R('Särskilt straffbelagd anbringandegärning',
 A('Gärningspersonen anbringar ett tekniskt hjälpmedel.'),
 O('Särskilt uppsåt att med hjälpmedlet:', 'Bryta telehemlighet enligt BrB 4:8','Begå kränkande fotografering enligt BrB 4:6 a','Begå olovlig avlyssning enligt BrB 4:9 a'),
 A('Gärningen har inte övergått i ett fullbordat brott enligt bestämmelsen.'),
 A('Den särskilt kriminaliserade anbringandegärningen ska inte sammanblandas med generell förberedelse enligt BrB 23 kap.'))]],
 ['Ringa barnfridsbrott','4:3',[
 R('Barnfridsbrott som är ringa',
 A('Samtliga tillämpliga grundrekvisit för barnfridsbrott enligt BrB 4:3 är uppfyllda, inklusive bevittnande, dubbel närståenderelation och en uttryckligen omfattad grundgärning.'),
 A('Brottet bedöms som ringa efter en samlad bedömning. Detta är en lindrigare grad, inte en fristående ny gärningsform.'))]]
];
let added=0,already=0;const missing=[],mismatch=[],touched=[];
for(const [title,ref,branches] of routes){
 const c=D.crimes.find(x=>!x.stageType&&String(x.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
 if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatch.push(title+': '+c.shortRef+' ≠ BrB '+ref);continue;}
 const law=window.BK_STATUTES?.['BrB:'+ref]?.text;
 if(!law)throw Error('Lagtext saknas: BrB '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){already++;continue;}
 c.rekvisit15={
  groups:[],routes:branches,source:'BrB '+ref+' (gällande SFS)',
  sourceURL:SRC,scope:'lagtext-jamford',verifiedOn:'2026-10-16',
  legalReviewApproved:false,
  note:'Lagtextbaserad OCH/ELLER-översikt, inte en uttömmande rättsutredning. Bedöm originalbestämmelsen, gärningsdatum, straffbarhet, skuldform, praxis och särskilda undantag innan slutsatser dras.'
 };
 added++;touched.push(title);
}
window.BK_FRID_LUCKOR15={added,already,missing,mismatch,touched,source:SRC,rows:routes.length};
})();