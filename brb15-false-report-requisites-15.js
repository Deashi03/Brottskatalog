/* 2026-10-18: Source-specific distinctions between false angivelse
 * BrB 15:6 and false beskyllning BrB 15:7. The statutory 15:14
 * voluntary-correction mitigation does NOT automatically absolve.
 * OCH/ELLER is a police-oriented aid, never complete legal approval.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const complete=key=>{
 const s=W[key];
 return Boolean(s?.complete&&s.checked==='2026-10-18'&&
 s.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&s.url===SRC);
};
const review=complete('BrB:15:6')&&complete('BrB:15:7')&&complete('BrB:15:14');
const note='BrB 15:14 ger under vissa förutsättningar möjlighet till lindrigare straff efter frivillig rättelse före avsevärd olägenhet. Endast om faran är ringa OCH brottet inte har strängare föreskrivet straff än fängelse sex månader kan paragrafens särskilda ansvarsfrihet aktualiseras. Detta är inte ett automatiskt polisbeslut. Kontrollera alltid relevanta lagversioner och förhållandena i det konkreta fallet.';
const specs=[
 ['Falsk angivelse','15:6',[
  A('En OSKYLDIG person anges till åtal. Skilj angivelse TILL åtal från att faktiskt väcka åtal enligt BrB 15:5.'),
  A('Gärningspersonen har det SÄRSKILDA uppsåtet att den oskyldiga personen ska dömas till ansvar.'),
  A('Ringa/grov grad och särskilda konkurrens- och ansvarsfrågor bedöms separat.')
 ]],
 ['Obefogad angivelse','15:6',[
  A('En oskyldig person anges till åtal.'),
  A('Gärningspersonen insåg INTE oskulden men hade SKÄLIG ANLEDNING ATT ANTA att personen var oskyldig.'),
  A('Till skillnad från falsk angivelse krävs inte den uppsåtliga avsikten att den oskyldiga ska dömas.')
 ]],
 ['Falsk beskyllning','15:7',[
  A('Det är fråga om ett annat fall än angivelse enligt BrB 15:6.'),
  A('Uppgiften lämnas hos åklagare, Polismyndigheten eller annan myndighet som SKA ta upp anmälan i en sådan sak.'),
  O('Den osanna gärningen består av:', 'Att beskylla annan för en brottslig gärning','Att påstå en besvärande omständighet','Att förneka en friande eller mildrande omständighet'),
  A('Osanningen omfattas av uppsåt; ringa och grov grad prövas separat.')
 ]],
 ['Vårdslös beskyllning','15:7',[
  A('Uppgiften lämnas hos åklagare, Polismyndigheten eller annan myndighet som SKA ta upp anmälan i en sådan sak.'),
  O('Den osanna gärningen består av:', 'Att beskylla annan för en brottslig gärning','Att påstå en besvärande omständighet','Att förneka en friande eller mildrande omständighet'),
  A('Gärningspersonen insåg INTE att utsagan var osann men hade SKÄLIG ANLEDNING ATT ANTA att den var osann.'),
  A('Till skillnad från falsk beskyllning bygger denna grad på en särskild skuldregel, inte uppsåtlig osanning.')
 ]]
];
const report={planned:specs.length,updated:0,held:[],missing:[],allSourceChecked:review,date:'2026-10-18',source:SRC,coercionAuthorized:false,stageEntriesModified:0};
for(const [title,ref,groups] of specs){
 const c=D.crimes.find(c=>!c.stageType&&c.title===title);
 if(!c){report.missing.push(title);continue;}
 if(c.statute!=='BrB:'+ref||!review){report.held.push({title,reason:!review?'unverified-current-full-statute':'title-statute-mismatch'});continue;}
 c.rekvisit15={groups,routes:[],source:'BrB '+ref,
  sourceURL:SRC,scope:'current-statutory-requisites-only',
  verifiedOn:'2026-10-18',legalReviewApproved:false,
  note:'Lagtextbaserad OCH/ELLER-kontroll. '+note+' Fullständig prövning av gärningsdatum, praxis, åtal, skuld och bevisning återstår.'};
 c.requisitesStatus='statute-structured-legal-review-pending';
 report.updated++;
}
window.BK_BRB15_FALSE_REPORT_REQUISITES15=report;
})();