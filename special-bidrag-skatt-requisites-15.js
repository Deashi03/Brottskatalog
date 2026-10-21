/* V1.5: objective/subjective routes for 13 SkBrL and BidrBrL cards.
 * Backed by 2026-10-18 independently compared complete official paragraphs.
 * Additional provisions about correction and administrative sanctions are
 * CONTEXT ONLY and are not promoted into automatic liability/charging tests.
 */
(()=>{'use strict';
const D=window.BK_DATA,P=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!P)return;
const A=label=>({mode:'all',label});
const O=(label,...options)=>({mode:'any',label,options});
const R=(label,...groups)=>({label,groups});
const SRC={
 BidrBrL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/',
 SkBrL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/'
};
const bidGeneral='Kontrollera alltid att förmånen eller stödet omfattas av 1 §. Fara för felaktig utbetalning eller tillgodoräknande räcker enligt 2 §; faktiskt utbetalda pengar är inte ett allmänt krav. Frivillig rättelse före utbetalning/tillgodoräknande kan enligt 5 § utesluta ansvar. En beslutad administrativ sanktionsavgift kan innebära processhinder enligt 6 a §. Pröva individens gärningsdag och beslutens identitet separat.';
const taxGeneral='Skattebrottslagen 1 § innehåller tillämpningsundantag, bland annat vid brott som är straffbelagda enligt smugglingslagen. Kontrollera frivillig rättelse på eget initiativ enligt 12 § samt 13 och 13 b §§ om särskild åtalsprövning respektive hinder vid skattetillägg. Historisk lagversion, preskription och gärningsdag kan påverka svaret.';
const rows=[
 {title:'Bidragsbrott',code:'BidrBrL',sec:'2',routes:[
  R('Oriktig uppgift',A('En oriktig uppgift lämnas i ett ärende om ekonomisk förmån eller ekonomiskt stöd som omfattas av lagens 1 §.'),A('Uppgiften orsakar konkret fara för felaktig utbetalning/tillgodoräknande eller ett för högt belopp.'),A('Uppsåt omfattar den relevanta gärningen och omständigheterna.')),
  R('Underlåten ändringsanmälan',A('En relevant förändring har inträffat och det finns uttrycklig skyldighet i lag eller förordning att anmäla ändringen.'),A('Ändringen anmäls inte och underlåtenheten orsakar den i 2 § föreskrivna faran.'),A('Uppsåt krävs; endast glömska prövas i så fall separat enligt 4 §.'))
 ],note:bidGeneral},
 {title:'Ringa bidragsbrott',code:'BidrBrL',sec:'2',routes:[
  R('Ringa grad av bidragsbrott',A('Gärning och fara uppfyller 2 § enligt något av alternativen för bidragsbrott.'),A('Uppsåt föreligger.'),A('Brottet bedöms sammantaget som ringa; den aktuella lydelsen föreskriver böter eller fängelse högst sex månader.'))],note:bidGeneral},
 {title:'Grovt bidragsbrott',code:'BidrBrL',sec:'3',routes:[
  R('Grovt brott, efter helhetsbedömning',A('En uppsåtlig gärning uppfyller samtliga rekvisit för bidragsbrott i 2 §.'),O('Särskilt angivna bedömningsomständigheter i 3 § (inte en obligatorisk checklista):','Brottet har rört betydande belopp','Falska handlingar har använts','Systematiskt förfarande eller större omfattning'),A('En samlad gradbedömning krävs; ingen ensam omständighet avgör automatiskt att brottet är grovt.'))],note:bidGeneral},
 {title:'Vårdslöst bidragsbrott',code:'BidrBrL',sec:'4',routes:[
  R('Grov oaktsamhet med bidragsfara',A('En gärning av den art som beskrivs i 2 § föreligger, genom oriktig uppgift eller underlåtenhet att anmäla en lagstadgat anmälningspliktig ändring.'),A('Gärningen ger upphov till fara för felaktig ekonomisk förmån eller stöd enligt 2 §.'),A('Gärningspersonen har agerat med grov oaktsamhet; vanlig oaktsamhet räcker inte.'),A('Om gärningen efter bedömning av beloppet, risken för slutlig ekonomisk skada och övriga omständigheter är mindre allvarlig föreligger inte ansvar enligt 4 §.'))],note:bidGeneral},
 {title:'Skattebrott',code:'SkBrL',sec:'2',routes:[
  R('Uppsåtlig oriktig skatteuppgift',A('En oriktig uppgift lämnas uppsåtligen till en myndighet.'),A('Uppgiften ger upphov till fara för att skatt undandras det allmänna eller felaktigt tillgodoräknas/återbetalas till någon.')),
  R('Uppsåtlig underlåtenhet att lämna föreskriven uppgift',A('Gärningspersonen lämnar inte deklaration, kontrolluppgift eller annan föreskriven uppgift till myndighet trots skyldighet att göra det.'),A('Underlåtenheten är uppsåtlig och medför den i 2 § angivna faran för skatteundandragande, tillgodoräknande eller återbetalning.'))
 ],note:taxGeneral},
 {title:'Skatteförseelse',code:'SkBrL',sec:'3',routes:[
  R('Ringa uppsåtligt skattebrott',A('Rekvisiten för skattebrott enligt 2 § är uppfyllda, inklusive uppsåt och fara för felaktig skattehantering.'),A('Gärningen är efter samlad bedömning ringa. Straffet är böter.'),A('Särskild åtalsprövning enligt 13 § måste kontrolleras separat.'))],note:taxGeneral},
 {title:'Grovt skattebrott',code:'SkBrL',sec:'4',routes:[
  R('Grovt skattebrott efter helhetsbedömning',A('En uppsåtlig gärning uppfyller skattebrottets rekvisit enligt 2 §.'),O('Särskilda försvårande faktorer enligt 4 §, som bedöms inom en helhet:','Mycket betydande belopp','Falska handlingar eller vilseledande bokföring','Systematisk brottslighet eller större omfattning','Annars synnerligen farlig art'),A('Brottet klassificeras som grovt först efter samlad bedömning; kvalifikationsfaktorerna är inte självständiga brott och inte en obligatorisk kumulativ lista.'))],note:taxGeneral},
 {title:'Vårdslös skatteuppgift',code:'SkBrL',sec:'5',routes:[
  R('Grov oaktsamhet vid aktiv oriktig skatteuppgift',A('Gärningspersonen lämnar en oriktig uppgift till myndighet. Bestämmelsens ordalydelse avser uppgiftslämnande, inte generellt varje utebliven deklaration.'),A('Uppgiften orsakar fara för skatteundandragande eller felaktigt tillgodoräknande/återbetalning.'),A('Grov oaktsamhet föreligger; vanlig oaktsamhet räcker inte.'),A('Ingen ansvarsskyldighet enligt paragrafen om gärningen med hänsyn till skattebelopp och övriga omständigheter är av mindre allvarlig art.'))],note:taxGeneral},
 {title:'Skatteavdragsbrott',code:'SkBrL',sec:'6',routes:[
  R('Underlåtet föreskrivet skatteavdrag',A('Skyldighet att göra skatteavdrag finns enligt skatteförfarandelagen (2011:1244).'),A('Gärningspersonen underlåter att fullgöra denna skyldighet.'),O('Skuldform:','Uppsåt','Grov oaktsamhet'),A('Ringa fall omfattas inte av straffansvar enligt 6 §.'))],note:taxGeneral},
 {title:'Skatteredovisningsbrott',code:'SkBrL',sec:'7',routes:[
  R('Oriktig uppgift till myndighet',A('I annat fall än 2 § lämnas uppsåtligen en oriktig uppgift till myndighet.'),A('Uppgiften gäller förhållande av betydelse för egen eller annans skyldighet att betala skatt.'),A('Ringa gärning är uttryckligen undantagen.')),
  R('Oriktig uppgift till avdragsskyldig eller kontrolluppgiftslämnare',A('En oriktig uppgift lämnas uppsåtligen till någon som ska innehålla skatt eller lämna kontrolluppgift eller motsvarande underrättelse.'),A('Uppgiften har den betydelse för skyldighetsfullgörandet eller skattebetalningen som anges i 7 § första stycket 2.'),A('Gärningen omfattas inte i stället av 2 § och är inte ringa.')),
  R('Underlåten föreskriven uppgift',A('I annat fall än 2 § underlåts uppsåtligen en föreskriven uppgift om en fråga som beskrivs i 7 § första stycket.'),A('Uppgiften ska lämnas utan föreläggande/uppmaning och gäller inte egen inkomstdeklaration.'),A('Ringa fall är undantagna enligt 7 §.'))
 ],note:taxGeneral},
 {title:'Vårdslös skatteredovisning',code:'SkBrL',sec:'8',routes:[
  R('Grov oaktsamhet inom 7 § första stycket 2 eller andra stycket',A('Den aktuella gärningen omfattas av 7 § första stycket 2 eller andra stycket; hänvisningen omfattar INTE generellt alla uppgifter till myndighet enligt 7 § första stycket 1.'),A('Grov oaktsamhet har förelegat, inte enbart vanlig oaktsamhet.'),A('Ringa fall är uttryckligen undantagna enligt 8 §.'))],note:taxGeneral},
 {title:'Försvårande av skattekontroll',code:'SkBrL',sec:'10',routes:[
  R('Åsidosättande som allvarligt försvårar kontrollen',O('Åsidosatt skyldighet:','Bokföringsskyldighet','Föreskriven skyldighet att föra och bevara räkenskaper'),A('Åsidosättandet leder till fara för att myndighetens kontroll vid beräkning eller uppbörd av skatt eller avgift ALLVARLIGT försvåras.'),O('Skuldform:','Uppsåt','Grov oaktsamhet'),A('Ringa fall är undantagna; grov grad prövas separat.'))],note:taxGeneral},
 {title:'Grovt försvårande av skattekontroll',code:'SkBrL',sec:'10',routes:[
  R('Grov grad av kontrollförsvårande gärning',A('Gärningen uppfyller samtliga objektiva och subjektiva rekvisit för försvårande av skattekontroll i 10 §.'),A('Gärningen bedöms efter samlade omständigheter som grov. Av paragrafens straffskala följer lägst sex månader och högst fyra års fängelse; det är inte ett generellt antagande om graden vid alla bokföringsbrister.'))],note:taxGeneral}
];
const report={planned:rows.length,structured:0,held:[],already:[],checked:'2026-10-18',
 fullLegalApprovals:0,stageChanges:0,penaltyChanges:0,coerciveChanges:0,
 deliberateNewTeachingTypecases:0,scope:'source-gated-preliminary-structure'};
for(const row of rows){
 const c=D.crimes.find(x=>!x.stageType&&x.title===row.title);
 const expected=row.code+row.sec;
 if(!c||String(c.shortRef||'').replace(/\s+/g,'')!==expected
  ||c.lawCompletenessVerified!==true||c.lawMode!=='full'
  ||c.lawCompletenessChecked!=='2026-10-18'
  ||c.lawCompletenessSourceURL!==SRC[row.code]
  ||!P[row.code]?.sections?.[row.sec]?.text
  ||c.rekvisit15?.legalReviewApproved===true){
   report.held.push(row.title);continue;
 }
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){report.already.push(row.title);continue;}
 c.rekvisit15={groups:[],routes:row.routes,source:c.shortRef,
  sourceURL:SRC[row.code],scope:'individual-current-statutory-paragraph-structured-only',
  verifiedOn:'2026-10-18',legalReviewApproved:false,
  note:row.note+' Källjämförd full paragraftext finns på kortet, men den fullständiga juridiska granskningen (praxis, konkurrens, tid, åtal och tvångsmedel) återstår.'};
 c.requisitesStatus='preliminary-structured-special-law-legal-review-pending';
 report.structured++;
}
window.BK_BIDRAG_SKATT_REQUISITES15=report;
})();