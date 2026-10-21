/* V1.5 – avoid THREE false negative inchoate rulings for the gross grade
 * of BrB 13:7. BrB 13:12 enumerates "spridande av gift eller smitta";
 * BrB 13:7 defines the gross grade within the same offence provision.
 * Whether the qualified grade is encompassed is an unresolved legal
 * interpretation, NOT affirmative non-criminalization. Source 2026-10-18.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const p=W['BrB:13:12'],base=W['BrB:13:7'];
const legalSource=Boolean(p?.complete&&base?.complete&&p.url===URL&&base.url===URL
 &&p.text?.includes('spridande av gift eller smitta')
 &&base.text?.includes('Är brottet grovt')
 &&['2026-10-17','2026-10-18'].includes(p.checked)
 &&['2026-10-17','2026-10-18'].includes(base.checked));
const parent=D.crimes.find(c=>!c.stageType&&c.title==='Grovt spridande av gift eller smitta');
const report={planned:3,withheld:0,held:[],sourceVerified:legalSource,checked:'2026-10-18',
 releaseReady:false,criminalizationFinalApproved:0,custodyApproved:0};
for(const type of ['forsok','forberedelse','stampling']){
 const c=parent&&D.crimes.find(x=>x.stageParentId===parent.id&&x.stageType===type);
 if(!legalSource||parent?.statute!=='BrB:13:7'||!c||c.stageStatus!=='not-criminalized'){
  report.held.push({type,sourceVerified:legalSource,status:c?.stageStatus,parentRef:parent?.statute});continue;
 }
 c.stageStatus='unverified';c.stageReviewDate=null;c.stageSource='BrB 13:12 jämförd med BrB 13:7 och BrB 23:1–2';
 c.stageReviewBasis='BrB 13:7 andra stycket jämfört med BrB 13:12, som anger spridande av gift eller smitta, medan grov grad finns i 13:7 andra stycket. Gradtäckningen måste avgöras genom separat juridisk bedömning, inte genom namnmatchning.';
 c.stageExplanation='Förstadiets omfattning för den grova graden är ännu INTE fastställt i en slutlig rättslig bedömning. Katalogens tidigare besked om att detta förstadium inte är straffbart saknade tillräckligt stöd. Kontrollera gärningsdatum, lagtextens systematik, förarbeten och praxis.';
 c.penalty='Straffbarhet/straffskala ej verifierad';c.penaltyShort='Ej verifierat';
 c.penaltyRange=null;c.penaltyNote=c.stageExplanation;c.custody='unknown';
 c.prosecution='unknown';c.prosecutionLabel='Åtalsregel måste kontrolleras';
 c.reviewStatus='stage-statute-grade-scope-pending';
 c.stageEvidence15={status:'open-individual-legal-interpretation',
  question:'Omfattar BrB 13:12 även brottets grova grad enligt 13:7?',
  legalProvisions:['BrB 13:7','BrB 13:12','BrB 23:1–2'],
  officialSource:URL,checked:'2026-10-18',
  preliminaryAssessment:'same-paragraph-gross-grade-may-be-covered; no automatic verdict',
  finalLegalConclusionApproved:false,caseSpecificCustodyApproved:false};
 report.withheld++;
}
window.BK_GROSS_POISON_STAGE_HOLD15=report;
})();