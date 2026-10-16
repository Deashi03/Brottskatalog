/* V1.5 source-checked pedagogical requisite expansion – common BrB crimes.
 * Each group is compared against the cited SFS paragraph. This is expressly
 * NOT a full academic legal approval: exceptions, praxis and historic law
 * must be checked before that status can be asserted.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const specs=[
 ['Vållande till annans död','3:7',[
  A('En annan person har avlidit.'),
  A('Gärningspersonen har orsakat dödsfallet genom ett oaktsamt handlande eller en straffrättsligt relevant underlåtenhet.'),
  A('Oaktsamhet är styrkt i förhållande till dödandet; ringa respektive grov grad bedöms separat.')]],
 ['Vållande till kroppsskada eller sjukdom','3:8',[
  A('En annan person har orsakats kroppsskada eller sjukdom som inte är ringa.'),
  A('Gärningspersonens oaktsamma handlande eller straffrättsligt relevanta underlåtenhet har orsakat följden.')]],
 ['Framkallande av fara för annan','3:9',[
  O('En konkret fara har uppkommit för minst ett av följande:', 'En annan persons liv','Svår kroppsskada hos annan','Allvarlig sjukdom hos annan'),
  A('Gärningspersonen har genom grov oaktsamhet utsatt den andre för faran.')]],
 ['Arbetsmiljöbrott','3:10',[
  A('Något av brotten enligt BrB 3:7–9 är uppfyllt.'),
  A('Gärningen sker genom åsidosättande, uppsåtligen eller av oaktsamhet, av skyldighet enligt arbetsmiljölagen att förebygga ohälsa eller olycksfall.'),
  A('Åsidosättandet har ett relevant orsakssamband med skadan, dödsfallet eller den konkreta faran.')]],
 ['Olaga frihetsberövande','4:2',[
  O('Den drabbade har berövats sin frihet genom:', 'Bortförande','Inspärrning','Annat frihetsberövande'),
  A('Gärningen faller inte under bestämmelserna om människorov eller människohandel enligt de hänvisade paragraferna.'),
  A('Gärningspersonen har uppsåt till frihetsberövandet.')]],
 ['Olaga hot','4:5',[
  A('Ett hot om brottslig gärning riktas mot någon annan.'),
  A('Hotets beskaffenhet är ägnad att framkalla allvarlig rädsla för den hotades eller annans säkerhet till person, egendom, frihet eller frid.'),
  A('Gärningspersonen har uppsåt till den hotfulla gärningen och relevanta omständigheter.')]],
 ['Ofredande','4:7',[
  O('Gärningen består av:', 'Fysiskt antastande','Störande kontakter','Annat hänsynslöst agerande'),
  A('Gärningen är ägnad att kränka den drabbades frid på ett kännbart sätt.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Kränkande fotografering','4:6a',[
  A('En bild tas olovligen upp med tekniskt hjälpmedel och i hemlighet.'),
  A('Bilden avser en person som befinner sig inomhus i bostad, på toalett, i omklädningsrum eller annat liknande utrymme.'),
  A('Gärningspersonen handlar uppsåtligen.'),
  A('Gärningen är inte försvarlig med hänsyn till syfte och övriga omständigheter; särskilt undantag gäller fotografering som led i myndighetsverksamhet.')]],
 ['Olovlig identitetsanvändning','4:6b',[
  A('En annan persons identitetsuppgifter används olovligen.'),
  A('Gärningspersonen utger sig genom användningen för att vara den personen.'),
  O('Användningen ger upphov till:', 'Skada för personen','Olägenhet för personen'),
  A('Gärningspersonen har uppsåt till gärningen och relevanta omständigheter.')]],
 ['Olaga integritetsintrång','4:6c',[
  A('En bild eller uppgift som omfattas av lagens uppräkning sprids så att intrång i annans privatliv görs.'),
  O('Det som sprids avser:', 'Någons sexualliv','Någons hälsotillstånd','Att någon utsatts för angivet angrepp mot person, frihet eller frid','Bild av någon i mycket utsatt situation','Bild av någons helt eller delvis nakna kropp'),
  A('Spridningen är ägnad att medföra allvarlig skada för den bilden eller uppgiften rör.'),
  A('Gärningen är uppsåtlig och inte försvarlig med hänsyn till syfte och övriga omständigheter.')]],
 ['Brytande av post- eller telehemlighet','4:8',[
  A('Någon bereder sig olovligen tillgång till ett meddelande.'),
  A('Meddelandet förmedlas av ett post- eller telebefordringsföretag som postförsändelse eller i elektroniskt kommunikationsnät.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Intrång i förvar','4:9',[
  O('Det som öppnas eller görs tillgängligt är:', 'Brev eller telegram som bryts','Något annat som förvaras förseglat, under lås eller på annat sätt tillslutet'),
  A('Åtgärden sker olovligen och omfattas inte av BrB 4:8.'),
  A('Gärningspersonen har uppsåt.')]],
 ['Förtal','5:1',[
  O('En uppgift om en identifierbar annan person lämnas med innehåll som:', 'Utpekar denne som brottslig','Utpekar denne som klandervärd i sitt levnadssätt','Annars är ägnad att utsätta denne för andras missaktning'),
  A('Uppgiften lämnas till någon annan än den utpekade.'),
  A('Gärningspersonen har uppsåt.'),
  A('Ansvarsfrihetsregel: om det var försvarligt att lämna uppgiften eller fanns skyldighet att uttala sig, och uppgiften visas vara sann eller skälig grund föreligger, ska ansvar inte dömas ut. Sanningen ensam räcker inte som undantag.')]],
 ['Förolämpning','5:3',[
  O('Beteendet riktas mot annan genom:', 'Beskyllning','Nedsättande uttalande','Förödmjukande beteende'),
  A('Gärningen är ägnad att kränka den andres självkänsla eller värdighet.'),
  A('Gärningen omfattas inte av BrB 5:1–2 om förtal.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Egenmäktigt förfarande','8:8',[],[
  {label:'Alternativ A – olovligt tillgrepp eller brukande',groups:[
    O('Åtgärden utgör:', 'Olovligt tagande och brukande','Annat olovligt tillgrepp'),
    A('Gärningen straffbeläggs inte enligt en annan bestämmelse i BrB 8 kap.'),
    A('Gärningspersonen har uppsåt.') ]},
  {label:'Alternativ B – besittningsrubbning utan tillgrepp',groups:[
    A('Någon annans besittning rubbas olovligen utan tillgrepp, exempelvis genom att lås fästs eller bryts.'),
    O('Besittningsrubbningen medför:', 'Skada','Olägenhet'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ C – hindrande av retentionsrätt eller återtagande',groups:[
    A('En annan person hindras genom våld eller hot om våld från att utöva sin rätt att hålla kvar eller ta något.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Självtäkt','8:9',[
  A('Gärningspersonen vidtar någon av åtgärderna som anges i BrB 8:8.'),
  A('Åtgärden vidtas för att själv ta sig rätt i stället för att gå rättslig väg.'),
  A('Gärningspersonen har uppsåt till gärningen och rätttagandesyftet.')]],
 ['Olovlig energiavledning','8:10',[
  O('En av följande former av energi avleds olovligen:', 'Elektrisk kraft','Värmeenergi ur rörledningssystem för uppvärmning','Värmeenergi till rörledningssystem för kylning'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Bedrägeri','9:1',[],[
  {label:'Alternativ A – vilseledande av person',groups:[
    A('En annan person vilseleds.'),
    A('Vilseledandet förmår personen till handling eller underlåtenhet.'),
    A('Dispositionen innebär vinning för gärningspersonen och skada för den vilseledde eller någon i vars ställe denne är.'),
    A('Gärningspersonen har uppsåt till gärningen och följderna.') ]},
  {label:'Alternativ B – automatisk informationsbehandling',groups:[
    A('Resultatet av en automatisk informationsbehandling eller liknande process påverkas olovligen.'),
    O('Påverkan sker genom:', 'Oriktig eller ofullständig uppgift','Ändring i program eller upptagning','Annat olovligt sätt'),
    A('Påverkan innebär vinning för gärningspersonen och skada för någon annan.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Utpressning','9:4',[
  A('Någon förmås genom olaga tvång att göra eller underlåta något.'),
  A('Det framtvingade innebär vinning för gärningspersonen och skada för den tvingade eller någon i vars ställe denne är.'),
  A('Gärningen omfattas inte i stället av rån eller grovt rån.'),
  A('Gärningspersonen har uppsåt till tvång, disposition och följder.')]],
 ['Ocker','9:5',[],[
  {label:'Alternativ A – utnyttjande vid avtal/rättshandling',groups:[
    A('Vid avtal eller annan rättshandling utnyttjas annans trångmål, oförstånd, lättsinne eller beroendeställning.'),
    A('Gärningspersonen bereder sig en förmån utan motprestation eller i uppenbart missförhållande till motprestationen.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – oskälig kreditgivning',groups:[
    A('Ränta eller annan ekonomisk förmån uppbärs vid kreditgivning i näringsverksamhet eller vanemässig/större verksamhet.'),
    A('Förmånen står i uppenbart missförhållande till motprestationen.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Häleri','9:6',[],[
  {label:'Alternativ A – befattning med brottsgods',groups:[
    A('Egendom har frånhänts annan genom brott.'),
    A('Gärningspersonen tar befattning med egendomen på sätt som är ägnat att försvåra ett återställande.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – vinning av brottsligt förvärv',groups:[
    A('Gärningspersonen bereder sig otillbörlig vinning av annans brottsliga förvärv.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ C – brottsligt uppkommen fordran',groups:[
    A('En genom brott tillkommen fordran hävdas genom krav, överlåtelse eller liknande åtgärd.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ D – yrkesmässigt mottagande',groups:[
    A('Egendom som skäligen kan antas vara frånhänd annan genom brott förvärvas eller mottas i näringsverksamhet eller som led i vanemässig/större verksamhet.'),
    A('Befattningen är ägnad att försvåra återställande.'),
    A('Gärningspersonen handlar uppsåtligen till de omständigheter lagen kräver.') ]}
 ]],
 ['Oredligt förfarande','9:8',[
  A('Gärningen omfattas inte av tidigare bestämmelser i BrB 9 kap.'),
  A('Gärningspersonen vilseleder någon.'),
  A('Den vilseledde förmås att handla eller underlåta något, vilket orsakar skada för denne eller någon i vars ställe denne är.'),
  A('Gärningspersonen har uppsåt.')]],
 ['Förskingring','10:1',[
  A('Gärningspersonen har fått egendom i besittning för annans räkning genom avtal, tjänst eller liknande ställning.'),
  A('Det finns skyldighet att utge eller redovisa egendomen.'),
  O('Gärningspersonen:', 'Tillägnar sig egendomen','Åsidosätter annars vad som krävs för att kunna fullgöra utgivnings- eller redovisningsskyldigheten'),
  A('Gärningen innebär vinning för gärningspersonen och skada för den berättigade.'),
  A('Gärningspersonen har uppsåt.')]],
 ['Olovligt förfogande','10:4',[
  A('Gärningspersonen har en egendom i sin besittning, men ägande- eller säkerhetsrätt tillkommer någon annan.'),
  A('Åtgärden frånhänder den andre egendomen eller berövar denne sin rätt.'),
  A('Gärningen omfattas inte av förskingringsbestämmelserna BrB 10:1–3.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Behörighetsmissbruk','10:6',[],[
  {label:'Alternativ A – missbrukad behörighet att rättshandla',groups:[
    A('Gärningspersonen har behörighet att rättshandla i någon annans ställe.'),
    A('Behörigheten missbrukas och detta skadar den andre.'),
    A('Gärningspersonen handlar uppsåtligen; gärningen omfattas inte av en tidigare bestämmelse i BrB 10 kap.') ]},
  {label:'Alternativ B – skuldebrev, obefogade krav eller kvitto',groups:[
    A('Gärningspersonen missbrukar behörighet att göra gällande skuldebrev eller liknande handling, eller använder annat i BrB 10:6 uttryckligen angivet otillbörligt krav eller kvitto.'),
    A('Gärningspersonen handlar uppsåtligen; gärningen omfattas inte av tidigare straffbestämmelse i kapitlet.') ]}
 ]],
 ['Fyndförseelse','10:8',[
  A('Gärningspersonen får hittegods eller annan persons sak i sin besittning av misstag eller tillfällighet.'),
  A('Gällande lag föreskriver skyldighet att tillkännage fyndet eller innehavet.'),
  A('Gärningspersonen underlåter att fullgöra denna skyldighet.'),
  A('Om underlåtenheten sker med tillägnelseuppsåt eller egendomen annars förfogas över på sätt i BrB 10:4, gäller i stället den bestämmelsen.')]],
 ['Tagande av olovlig väg','12:4',[
  A('Gärningspersonen färdas olovligen och på annat än väg.'),
  O('Färden går över:', 'Tomt','Plantering','Annan mark som kan skadas av färden'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Mordbrand','13:1',[
  A('Gärningspersonen anlägger en brand.'),
  O('Branden medför fara för:', 'Annan persons liv eller hälsa','Omfattande förstörelse av någon annans egendom'),
  A('Gärningspersonen handlar uppsåtligen till gärningen och de relevanta fareomständigheterna.')]],
 ['Urkundsförfalskning','14:1',[
  A('Objektet är en urkund enligt BrB 14:1, inklusive de särskilda kraven på bevisfunktion och utställarangivelse/originalkaraktär eller tillförlitligt kontrollerbar elektronisk utställare.'),
  O('Gärningspersonen utför obehörigen en förfalskningsåtgärd:', 'Framställer en falsk urkund','Ändrar en äkta urkund','Fyller ut en äkta urkund'),
  A('Åtgärden innebär fara i bevishänseende.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Falsk angivelse','15:6',[
  A('En oskyldig person anges till åtal.'),
  A('Gärningspersonen har uppsåt att den angivne ska dömas till ansvar.'),
  A('Den angivne är oskyldig; grovhetsgrad eller alternativet obefogad angivelse prövas separat.')]],
 ['Våld eller hot mot tjänsteman','17:1',[],[
  {label:'Alternativ A – under myndighetsutövning',groups:[
    A('En tjänsteman angrips med våld eller hot om brottslig gärning vid myndighetsutövning.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – tvinga, hindra eller hämnas',groups:[
    A('En tjänsteman angrips med våld eller hot om brottslig gärning för att tvinga fram, hindra eller hämnas en åtgärd vid myndighetsutövning.'),
    A('Gärningspersonen handlar uppsåtligen och med det särskilda syftet.') ]},
  {label:'Alternativ C – tidigare myndighetsutövning',groups:[
    A('En tidigare myndighetsutövande tjänsteman angrips med våld eller hot om brottslig gärning för vad personen gjort eller inte gjort vid myndighetsutövningen.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Skyddande av brottsling','17:11',[
  O('Gärningspersonen motverkar att ett brott upptäcks eller att någon lagförs genom:', 'Dölja den som begått brott','Hjälpa personen att komma undan','Undanröja bevis','Annan liknande åtgärd'),
  A('Gärningspersonen har uppsåt. Brottet kan även omfatta vissa åtgärder avseende förfarande vid Internationella brottmålsdomstolen.'),
  A('Särskilt undantag: ringa gärning med hänsyn till relationen, den underliggande brottsligheten och övriga omständigheter utgör inte brott.')]],
 ['Tjänstefel','20:1',[
  A('Gärningen sker vid myndighetsutövning genom handling eller straffrättsligt relevant underlåtenhet.'),
  A('Gärningspersonen åsidosätter vad som gäller för den aktuella uppgiften.'),
  O('Skuldformen är:', 'Uppsåt','Oaktsamhet'),
  A('Gärningen är inte ringa utifrån bland annat befogenheter, samband med myndighetsutövningen och övriga omständigheter.'),
  A('Undantag gäller ledamot av beslutande statlig/kommunal församling i den egenskapen, och när annan bestämmelse ger samma eller strängare straff.')]],
 ['Brott mot tystnadsplikt','20:3',[],[
  {label:'Alternativ A – röjande',groups:[
    A('En uppgift omfattas av sekretesskyldighet enligt lag, författning eller med författningsstöd meddelat förordnande/förbehåll.'),
    A('Gärningspersonen röjer uppgiften i strid med skyldigheten.'),
    O('Skuldformen är:', 'Uppsåt','Oaktsamhet (särskild straffregel)'),
    A('Gärningen är inte ringa och straffas inte enligt en annan bestämmelse.') ]},
  {label:'Alternativ B – obehörigt nyttjande',groups:[
    A('Uppgiften omfattas av sådan sekretesskyldighet.'),
    A('Gärningspersonen utnyttjar hemligheten olovligen.'),
    O('Skuldformen är:', 'Uppsåt','Oaktsamhet (särskild straffregel)'),
    A('Gärningen är inte ringa och straffas inte enligt en annan bestämmelse.') ]}
 ]]
];
let updated=0,already=0,missing=[];
const seen=new Set();
for(const [title,ref,groups,routes] of specs){
 const c=D.crimes.find(x=>!x.stageType&&String(x.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
 if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref)throw Error('Lagrumsmismatch vid rekvisit: '+title+' / '+c.shortRef);
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Originalbestämmelse saknas: '+title);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){already++;continue;}
 c.rekvisit15={
  groups,routes:routes||[],source:'BrB '+ref+' och BrB 1:2 (om inget annat sägs)',sourceURL:URL,
  scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Punktvis rekvisitstöd jämfört med aktuell SFS-lydelse. Inga påståenden om fullständigt rättsligt godkännande: följ lagtext, förarbeten, praxis och gärningsdatum. Bedöm alltid konkurrens, undantag och särskilda gradindelningsgrunder.'
 };
 seen.add(title);updated++;
}
window.BK_REKVISIT_CORE15={updated,already,missing,source:URL,scope:'partial-current-statute-check'};
})();