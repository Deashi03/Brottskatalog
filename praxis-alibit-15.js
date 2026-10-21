/* V1.5 – NJA 2019 s. 294 (Alibit): avgränsning av osanna polisuppgifter.
 * 2019 års prejudikat läses tillsammans med aktuell lydelse av BrB 15:1,
 * 15:7 och 17:11. Inga nya brottsgrader, förstadier eller tvångsmedelsbesked.
 * Ett illustrativt typfall (inte själva rättsfallet) ges bara när lagtexten
 * är dokumenterat fullständig och brottskortet inte redan har ett typfall.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;
if(!D?.crimes||!W)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const HD='https://www.domstol.se/hogsta-domstolen/avgoranden2/2019/20599/';
const rows=[
 {title:'Skyddande av brottsling',ref:'BrB:17:11',
  markers:['döljer den som begått brott','undanröjer bevis','inte brott'],
  note:'HD i NJA 2019 s. 294 (Alibit) slog fast att en oriktig uppgift i polisförhör som ger en skyldig person ett falskt alibi, men ENDAST påverkar bevisläget, inte i sig är skyddande av brottsling. Det skiljer sig från att fysiskt dölja den som begått brott eller hjälpa personen att bli oåtkomlig för polisen. Bevisundanröjande prövas som en särskild gärningsform. BrB 17:11 har även ett oaktsamhetsliknande ansvarsalternativ och ett uttryckligt undantag för ringa gärning; samtliga villkor måste bedömas i det enskilda fallet.',
  typecase:'En person som vet att en bekant har begått ett brott gömmer medvetet personen i sin bostad när polisen söker efter denne, så att personen blir oåtkomlig för polisen. Om gärningen är ringa eller någon annan ansvarsbegränsning är tillämplig måste prövas separat.'},
 {title:'Falsk beskyllning',ref:'BrB:15:7',
  markers:['i annat fall än som avses i 6 §','osant beskyller','förnekar en friande'],
  note:'HD förklarar i NJA 2019 s. 294 att osanna uppgifter i polisförhör inte generellt är straffbara. BrB 15:7 är ett särskilt undantag när någon osant beskyller en annan för brott, påstår en besvärande omständighet eller förnekar en friande eller mildrande omständighet inför behörig myndighet. Pröva uttryckligen att 15:6 inte är tillämplig och att myndigheten ska ta upp uppgifter i en sådan sak. Ett falskt alibi som ENDAST gynnar den verklige gärningspersonen är inte utan vidare falsk beskyllning.'},
 {title:'Mened',ref:'BrB:15:1',
  markers:['avlagt en ed','lämnar osann uppgift'],
  note:'HD framhåller i NJA 2019 s. 294 att osanna svar vid ett vanligt polisförhör inte automatiskt är mened. Mened enligt BrB 15:1 förutsätter en ed föreskriven i lag; andra förhörssituationer och eventuella särskilda ansvarsstadganden måste prövas var för sig. Detta är ingen allmän straffrihet för lögner inför polisen. Undantag och begränsningar i BrB 15:4 prövas separat.'}
];
const report={planned:rows.length,annotated:0,illustrativeCases:0,held:[],source:HD,statuteSource:SFS,checked:'2026-10-18',legalApprovals:0,stageChanges:0,coerciveApprovals:0};
for(const row of rows){
 const p=W[row.ref];
 const c=D.crimes.find(x=>!x.stageType&&x.title===row.title&&x.statute===row.ref);
 if(!c||!p?.complete||p.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'
    ||!['2026-10-17','2026-10-18'].includes(p.checked)||p.url!==SFS
    ||row.markers.some(m=>!String(p.text||'').includes(m))
    ||c.lawCompletenessVerified!==true||!c.rekvisit15
    ||c.rekvisit15.legalReviewApproved===true){
  report.held.push(row.title);continue;
 }
 c.praxisAlibit15={court:'Högsta domstolen',case:'NJA 2019 s. 294',caseNumber:'B 5577-18',
  decided:'2019-04-17',sourceURL:HD,statuteSourceURL:SFS,statuteChecked:p.checked,
  scope:'specific-holding-and-statutory-contrast-only',note:row.note,
  legalReviewApproved:false,offenceClassificationApproved:false,
  custodyApproved:false,offenceDateReviewPending:true};
 const prefix='Rättspraxis – NJA 2019 s. 294 (Alibit): ';
 if(!String(c.rekvisit15.note||'').includes(prefix))
  c.rekvisit15.note=String(c.rekvisit15.note||'')+' '+prefix+row.note+
   ' Källa: '+HD+' Prejudikatet är inte en helhetsgranskning av brottskortet.';
 if(row.typecase&&!c.typexempel15?.length){
  c.typexempel15=[{text:row.typecase,
   source:'Illustrativt typfall utifrån ett handlingssätt som HD beskriver i NJA 2019 s. 294, p. 20. Inte gärningsfakta från det målet.',
   sourceURL:HD,lawSourceURL:SFS,kind:'typfall',
   status:'draft-case-law-guided-example-needs-final-juridical-approval',
   typecaseReviewed:'2026-10-18',legalReviewApproved:false}];
  report.illustrativeCases++;
 }
 report.annotated++;
}
window.BK_PRAXIS_ALIBIT15=report;
})();