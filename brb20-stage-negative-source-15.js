/* V1.5 – six inchoate negatives for new BrB 20:2.
 * BrB 20 kap. 1–5 (checked against Riksdagen 2026-10-18) contains
 * no express attempt, preparation or conspiracy provision for
 * missbruk av offentlig ställning, including gross grade.
 * BrB 23:1–2 requires special criminalization. This records
 * ONLY the absence of statutory stage coverage for these names,
 * not general innocence or the applicability of other offences.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const url='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const p=W['BrB:20:2'];
const names=['Missbruk av offentlig ställning','Grovt missbruk av offentlig ställning'];
const types=['forsok','forberedelse','stampling'];
const report={planned:6,reviewed:0,held:[],source:url,checked:'2026-10-18',reviewScope:'current-BrB-20-statute-absence-only',
 fullLegalApprovals:0,coercionApprovals:0,positiveInchoateApprovals:0};
const confirmed=Boolean(p?.complete&&p.url===url
 &&['2026-10-17','2026-10-18'].includes(p.checked)
 &&p.text?.includes('för missbruk av offentlig ställning')
 &&p.text?.includes('för grovt missbruk av offentlig ställning')
 &&p.text?.includes('Lag (2026:1420).')
 &&!/(försök|förberedelse|stämpling) till (grovt )?missbruk av offentlig ställning/i.test(p.text));
for(const title of names){
 const parent=D.crimes.find(c=>!c.stageType&&c.title===title);
 for(const type of types){
  const c=parent&&D.crimes.find(x=>x.stageParentId===parent.id&&x.stageType===type);
  if(!confirmed||parent?.statute!=='BrB:20:2'||!c||c.stageStatus!=='not-criminalized'
    ||c.stageReviewDate||c.individualLegalAudit15?.scope?.status==='APPROVED'){
   report.held.push({title,type,sourceOK:confirmed,status:c?.stageStatus,parentRef:parent?.statute});continue;
  }
  c.stageReviewDate='2026-10-18';
  c.stageSource='BrB 20:2 jämfört med 20 kap. 1–5 §§ och BrB 23:1–2';
  c.stageReviewBasis='Individuell negativ förstadieklassificering: BrB 20 kap. anger ingen uttrycklig kriminalisering av '+type+' till '+title+'. Jämför BrB 23:1–2. Gäller endast aktuell paragrafsituation, inte annan tänkbar brottstyp eller historisk lagversion.';
  c.stagePreliminaryScope15={status:'SOURCE_ENUMERATION_REVIEWED',sourceURL:url,checked:'2026-10-18',
   reviewedMainSection:'BrB 20:2',reviewedChapter:'BrB 20 kap. 1–5',
   stageKind:type,positiveCriminalizationUnderNamedProvisions:false,
   historicalApplicabilityApproved:false,finalIndividualScopeApproved:false,coercionApproved:false,
   note:'Ingen särskild förstadiekriminalisering finns i kontrollerade BrB 20 kap. för denna rubricering. Ett annat brott kan bli aktuellt; juridisk slutrevision återstår.'};
  report.reviewed++;
 }
}
window.BK_BRB20_INCHOATE_NEGATIVES15=report;
})();