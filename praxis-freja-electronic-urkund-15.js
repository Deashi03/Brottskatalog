/* Brottskatalog V1.5 – source-grounded HD example, not legal signoff.
 * NJA 2025 s. 1029, "Freja", HD B 920-25, judgment 2025-11-04.
 * Electronic false urkund must APPEAR to permit reliable verification of
 * issuer in its STORED form. A visual screenshot is not alone enough.
 * This does not exempt all forged electronic IDs or ordinary documents.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SOURCE='https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2025/b-920-25.pdf';
const LAW='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const card=D.crimes.find(x=>!x.stageType&&x.statute==='BrB:14:10');
const one=D.crimes.find(x=>!x.stageType&&x.statute==='BrB:14:1');
const sourceChecked=['BrB:14:1','BrB:14:10'].every(key=>{
 const p=W[key];return p?.complete===true&&
 p?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 p?.url===LAW&&p.text?.includes('utställarangivelse')=== (key==='BrB:14:1');
});
const outcome={found:Boolean(card),foundUnderlying:Boolean(one),sourceChecked,added:0,duplicates:0,noteAdded:0,
 reference:'NJA 2025 s. 1029, B 920-25',source:SOURCE,reviewed:'2026-10-18',stageEntriesModified:0,
 legalApprovalGranted:false};
if(card&&one&&sourceChecked){
 if(String(card.shortRef||'')!=='BrB 14:10')throw Error('Freja HD example must only attach to BrB 14:10');
 const entry={
  text:'En person visade en skärmbild som såg ut som en Freja eID-legitimation, med bild och namn men falsk ålder, vid ett restaurangbesök och för polisen. HD frikände från brukande av falsk urkund: det var inte visat att utställarangivelsen hos den ELEKTRONISKA HANDLINGEN I DESS LAGRADE FORM kunde kontrolleras på ett sätt som åtminstone framstod som tillförlitligt. Den läsbara skärmbilden räckte inte ensam.',
  source:'HD NJA 2025 s. 1029 (Freja), mål B 920-25, dom 4 november 2025. Avgränsat rättsfallsbaserat typfall för elektroniska urkunder enligt BrB 14:1 andra stycket 2 och brukande enligt BrB 14:10.',
  sourceURL:SOURCE,lawSourceURL:LAW,kind:'praxisgrundat-typexempel',
  status:'cited-supreme-court-acquittal',typecaseReviewed:'2026-10-18',
  caution:'Frikännandet berodde på bristande utredning om kontroll av den lagrade utställarangivelsen. Det innebär inte att alla skärmbilder, förfalskade legitimationer eller elektroniska handlingar faller utanför straffansvar.'
 };
 const prior=Array.isArray(card.typexempel15)?card.typexempel15:[];
 if(prior.some(x=>x.sourceURL===SOURCE||String(x.source||'').includes('B 920-25')))outcome.duplicates++;
 else {card.typexempel15=[...prior,entry];outcome.added++;}
 const note=' HD NJA 2025 s. 1029 (Freja): För en falsk elektronisk URKUND ska utställarangivelsen på den lagrade handlingen kunna kontrolleras på ett sätt som åtminstone FRAMSTÅR som tillförlitligt. En läsbar skärmbild av en falsk e-legitimation räckte inte på egen hand i målet. Detta är en särskild bedömning av elektronisk urkund; ett annat bevisläge kan ge en annan utgång. Källhänvisning: '+SOURCE;
 for(const c of [card,one]){
  if(!c.rekvisit15){continue;}
  if(!String(c.rekvisit15.note||'').includes('NJA 2025 s. 1029')){
   c.rekvisit15.note=String(c.rekvisit15.note||'')+note;
   outcome.noteAdded++;
  }
  c.rekvisit15.legalReviewApproved=false;
 }
 card.digitalUrkundCaseReview15={
  reference:outcome.reference,source:SOURCE,originalJudgmentRead:'2026-10-21',paragraphs:'6–17',
  proofIssue:'reliable-looking verification of issuer on stored electronic document',
  independentOfPhysicalDocumentOriginality:true,
  allScreenshotsExempt:false,
  noAutomaticCriminalityConclusion:true,
  noAutomaticCustodyConclusion:true
 };
}
window.BK_HD_FREJA15=outcome;
})();