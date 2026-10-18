/* V1.5: 22 individually constrained preliminary requisites for
 * NSL (1968:64), 2026:408 VapenL, TBL (1951:649), KnivL (1988:254).
 * Source: current Riksdagen SFS and individually checked grade ranges.
 * The numeric grade review does NOT itself certify offence requisites.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const law={
 NSL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/',
 VapenL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/',
 TBL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/',
 KnivL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/'
};
const rows=[];
const add=(title,code,groups,note)=>rows.push({title,code,groups,note});
const drugScope='Narkotikadefinitionen i 8 § och olovligheten måste vara styrkta. Skilj 1 § första stycket från de högre straffskalorna för försäljning och främjande i andra och tredje stycket. Förstadier kräver separat prövning av 4 §, i synnerhet undantaget för narkotikabruk. Ett preparat eller en mängd fastställer inte automatiskt rubricering eller tvångsmedelsrätt.';
const narc=(action,n)=>R('Narkotikabrott enligt 1 § – '+action,A('Gärningen är olovlig och föremålet utgör narkotika enligt 8 §.'),A(n),A('Uppsåt ska omfatta den aktuella gärningen; föreskriven särskild straffskala beror på om varan ska säljas.'));
add('Narkotikabrott · innehav','NSL',[narc('innehav','Innehav av narkotika enligt 1 § första stycket 5 föreligger; egen användning är inte en generell undantagsregel för FULLBORDAT innehav.')],drugScope);
add('Ringa narkotikabrott · bruk','NSL',[R('Ringa narkotikabruk',A('Gärningen avser uppsåtligt, olovligt bruk av narkotika enligt 1 § första stycket 5.'),A('Ringa grad avgörs av art, mängd och övriga omständigheter enligt 2 §.'),A('Förstadieundantaget för bruk i 4 § måste hållas skilt från fullbordat bruk.'))],drugScope);
add('Narkotikabrott · överlåtelse','NSL',[narc('överlåtelse','Narkotika överlåts olovligen till någon annan enligt 1 § första stycket 1.')],drugScope);
add('Narkotikabrott · framställning','NSL',[narc('framställning','Narkotika framställs och är avsedd för missbruk enligt 1 § första stycket 2.')],drugScope);
add('Narkotikabrott · förvärv i överlåtelsesyfte','NSL',[narc('förvärv i överlåtelsesyfte','Narkotika förvärvas i syfte att överlåtas enligt 1 § första stycket 3; det särskilda syftet prövas självständigt.')],drugScope);
add('Narkotikabrott · transport/förvaring','NSL',[narc('transport eller förvaring','Gärningen gäller anskaffning, bearbetning, förpackning, transport, förvaring eller liknande befattning enligt 1 § första stycket 4 med narkotika som inte är avsedd för eget bruk.')],drugScope);
add('Narkotikabrott · försäljning','NSL',[R('Försäljning eller befattning med narkotika avsedd att säljas',A('Gärningen är någon av formerna i 1 § första stycket och är uppsåtlig.'),A('Gärningspersonen säljer narkotikan eller befattar sig annars med narkotika avsedd att säljas; den särskilda straffskalan följer av 1 § andra stycket.'),A('Skilj försäljningssyfte från blott innehav för eget bruk.'))],drugScope);
add('Narkotikabrott · främjande av handel','NSL',[R('Främjande av narkotikahandel enligt 1 § tredje stycket',O('En åtgärd som anges i bestämmelsen:','Bjuda ut narkotika till försäljning.','Förvara eller befordra vederlag för narkotika.','Förmedla kontakter mellan säljare och köpare.','Vidta annan jämförbar åtgärd.'),A('Förfarandet ska vara ägnat att främja narkotikahandel.'),A('Uppsåt krävs; all kontakt eller tillfällig närvaro i en narkotikamiljö uppfyller inte rekvisiten.'))],drugScope);
add('Ringa narkotikabrott · innehav','NSL',[R('Ringa innehav',A('Det uppsåtliga innehavet uppfyller 1 § första stycket 5.'),A('Brottet är ringa enligt art, mängd och samtliga övriga omständigheter i 2 §.'),A('Förstadier regleras separat i 4 § och brukundantaget innebär inte generell förstadiestraffrihet för ringa innehav.'))],drugScope);
const narcGrade=(degree,details)=>R('Grovhetsgrad enligt 3 §',A('En uppsåtlig gärning enligt 1 § är visad.'),A(details),A(degree==='grovt'?'Bedömningen av grovt brott görs i en helhet, med de uttryckligt angivna kvalifikationsgrunderna i 3 § första stycket.':'Synnerligen grov grad prövas mot andra stycket i 3 § och kräver samlad bedömning.'));
add('Grovt narkotikabrott','NSL',[narcGrade('grovt','Särskilt prövas yrkesmässighet/större omfattning, särskilt stor mängd eller särskilt farlig/hänsynslös art.')],drugScope);
add('Synnerligen grovt narkotikabrott','NSL',[narcGrade('synnerligen','Särskilt prövas organiserad storskalig handel, synnerligen stor mängd eller synnerligen farlig/hänsynslös art.')],drugScope);
const weaponScope='Vapenlag (2026:408), kap. 1–2 och 18 §§ ska läsas med tillämpliga undantag, licenser, rätt till innehav samt gärningsdatum. Efter 2026 års reform omfattar brottet även vissa tillverknings- och förmedlingssituationer. Ringa/mindre allvarligt, oaktsamhet, grov och synnerligen grov grad får inte sammanblandas. Inget automatiskt beslut om förstadier, häktning eller beslag.';
const weaponBase=R('Vapenbrott – alternativa gärningsformer i 18 kap. 1 §',O('Gärningen är:', 'Inneha eller tillverka skjutvapen utan rätt.', 'Överlåta, yrkesmässigt förmedla eller låna ut skjutvapen till någon utan rätt att inneha vapnet.'),A('Skjutvapendefinition och undantag prövas enligt 1–2 kap.'),A('Uppsåt krävs för normalgrad och grova grader; oaktsamhet behandlas särskilt.'));
add('Vapenbrott','VapenL',[weaponBase],weaponScope);
add('Mindre allvarligt vapenbrott','VapenL',[weaponBase,R('Mindre allvarligt – inte automatiskt ringa',A('Gärningen omfattas av 18 kap. 1 § första stycket.'),A('Risken att vapnet kommer till brottslig eller annan skadlig användning och övriga omständigheter talar för mindre allvarligt brott.'),A('Den särskilda graden har böter eller fängelse högst sex månader.'))],weaponScope);
add('Vapenbrott av oaktsamhet','VapenL',[R('Oaktsamhetsalternativ i 18 kap. 1 §',A('Någon av de gärningsformer som föreskrivs i 18 kap. 1 § första stycket är aktuell.'),A('Gärningspersonen har handlat oaktsamt. Denna skuldform har egen straffskala med böter eller fängelse högst sex månader.'),A('Oaktsamhet medför inte per automatik ansvar för grovt vapenbrott enligt 18 kap. 2 §.'))],weaponScope);
add('Grovt vapenbrott','VapenL',[weaponBase,R('Grovhetsbedömning enligt 18 kap. 2 §',A('Den uppsåtliga grundgärningen i 18 kap. 1 § första stycket är styrkt.'),O('Särskilt nämnda omständigheter:','Allmän plats eller annan samlingsplats, inklusive fordon där.','Särskilt farligt vapen.','Flera vapen.','Brottslighetsfrämjande miljö vid innehav eller tillverkning.','Annars särskilt farlig gärning.'),A('Helhetsbedömning krävs; ingen faktor är mekaniskt avgörande.'))],weaponScope);
add('Synnerligen grovt vapenbrott','VapenL',[weaponBase,R('Synnerligen grov grad enligt 18 kap. 2 §',A('Uppsåtlig gärning enligt 18 kap. 1 § första stycket.'),A('Särskilt stort antal vapen eller flera särskilt farliga vapen eller andra omständigheter i den samlade bedömningen.'),A('En kraftfull eller särskilt farlig konstruktion av enhandsvapen bedöms med det uttryckliga lagstadgade kriteriet.'))],weaponScope);
const trafficScope='Kontrollera fordonsklass, faktisk körning, gärningsdag, undantag och exakta straffskalealternativ enligt trafikbrottslagen. Detta är inte ett automatiskt körkortsbeslut, LOB-beslut eller beslut om tvångsmedel.';
add('Rattfylleri','TBL',[R('Alternativa gärningssätt i 4 §',A('Gärningspersonen för ett motordrivet fordon eller en spårvagn enligt bestämmelsens definition.'),O('Ett självständigt alternativ:','Alkoholhalt minst 0,2 promille blod eller 0,10 mg/l utandningsluft.','Narkotiskt ämne kvar i blod efter intag; särskilt undantag för ordinerat intag.','Så påverkad av alkohol eller annat medel att fordonet inte antas kunna framföras på ett betryggande sätt.'),A('Särskilda undantag för fordon avsett att föras av gående och vissa godkända undersökningar prövas för rätt alternativ.'))],trafficScope);
add('Grovt rattfylleri','TBL',[R('Grovt rattfylleri i 4 a §',A('Rattfylleri enligt 4 § första–tredje styckena föreligger.'),O('Särskilt utpekade grovhetsfaktorer:','Minst 1,0 promille blod eller 0,50 mg/l utandningsluft.','Annars avsevärt påverkad.','Påtaglig fara för trafiksäkerheten.'),A('Grad bedöms samlat; alkoholkoncentration eller farofaktor ersätter inte prövning av samtliga rekvisit.'))],trafficScope);
add('Olovlig körning','TBL',[R('Uppsåtlig körning utan behörighet, 3 §',A('Gärningen består i att faktiskt föra ett körkortspliktigt fordon eller annan jämställd fordonskategori enligt 3 §.'),A('Rätt att föra fordonet saknas och gärningspersonen har uppsåt till de relevanta omständigheterna.'),A('Skilj från 3 § andra–tredje styckena om föreskriftsöverträdelse och tillåtande av annans körning.'))],trafficScope);
add('Grov olovlig körning','TBL',[R('Grov olovlig körning enligt 3 §',A('Gärningsformen uppfyller uppsåtlig körning utan behörighet i 3 § första stycket.'),O('Omständighet som särskilt kan tala för grov grad:','Tidigare innehavt körkort har återkallats.','Körning utan behörighet har skett vanemässigt.','Övriga särskilda omständigheter gör gärningen grov.'),A('Helhetsbedömning krävs. Böter eller fängelsealternativ måste läsas i sin korrekta kontext.'))],trafficScope);
const knifeScope='Knivlagen 1–4 §§: Varuslag, allmän plats, skola eller fordon samt befogat innehav ska prövas var för sig. Vapenlagens föremål regleras i stället av vapenlagen enligt 3 §. Uppsåtligt och oaktsamt brott har olika straffskalor; ringa fall undantas helt enligt 4 §.';
const knife=R('Otillåten föremålsbefattning enligt knivlagen',O('Aktuell gärning:','Innehav av kniv, annat stick-/skärvapen eller föremål avsett som vapen på allmän plats, angivet skolområde eller fordon på allmän plats.','Otillåtet innehav av springkniv/springstilett av person under 21 år.','Otillåten överlåtelse eller saluhållande av knogjärn, kaststjärnor eller andra särskilt reglerade föremål till underårig eller i strid med 2 §.'),A('Kontrollera särskilt befogat innehav enligt 1 § och företräde för vapenlagen i 3 §.'),A('Ringa fall enligt 4 § är inte brott.'));
add('Brott mot knivlagen','KnivL',[knife,R('Grundgraden med uppsåt',A('Uppsåt krävs för den ordinarie straffskalan i 4 § första stycket.'),A('Oaktsamhetsalternativet i 4 § andra stycket har en egen lägre skala och får inte mekaniskt blandas ihop med grundgraden.'))],knifeScope);
add('Grovt brott mot knivlagen','KnivL',[knife,R('Grovt uppsåtligt knivlagsbrott',A('Uppsåtlig gärning som omfattas av 4 § första stycket.'),O('Särskilda försvårande omständigheter:','Risk att föremålet används vid brottsligt angrepp.','Särskilt farlig beskaffenhet.','Flera föremål.','Gärning annars av särskilt farlig art.'),A('Särskild helhetsbedömning krävs; 4 § tredje stycket får inte automatiskt användas på oaktsamhetsbrottet.'))],knifeScope);
const report={planned:rows.length,structured:0,held:[],already:[],status:'preliminary',
 fullTextUpgrades:0,finalLegalApprovals:0,penaltyChanges:0,coercionChanges:0};
for(const r of rows){
 const c=D.crimes.find(c=>!c.stageType&&c.title===r.title);
 if(!c||(c.lawCompletenessVerified===true&&c.lawProvenance!=='current-SFS-paragraph-independently-transcribed-reviewed-20261018')||c.rekvisit15?.legalReviewApproved===true
  ||c.penaltyRangeVerified!==true
  ||c.penaltyGradeReviewSource!==law[r.code]||c.penaltyGradeReviewDate!=='2026-10-18'
  ||c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length){
  if(c?.rekvisit15?.routes?.length||c?.rekvisit15?.groups?.length)report.already.push(r.title);
  else report.held.push(r.title);
  continue;
 }
 c.rekvisit15={groups:[],routes:r.groups,source:c.shortRef,sourceURL:law[r.code],
  scope:'preliminary-statutory-requisites-source-linked-only',legalReviewApproved:false,
  verifiedOn:'2026-10-18',note:r.note+' En individuell fullständig lagtext- och praxisgranskning återstår. Inget besked om tvångsmedelsbehörighet eller straffbara förstadier följer automatiskt av denna lista.'};
 c.requisitesStatus='preliminary-structured-special-law-awaiting-complete-legal-review';
 report.structured++;
}
window.BK_SPECIAL22_REQUISITES15=report;
})();