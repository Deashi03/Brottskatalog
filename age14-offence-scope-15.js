/* V1.5: temporary 14-year-old exception, BrB 1:6. SFS 2026:1528
 * applies from 2026-09-10; SFS 2026:1555 restores the age-15 rule from
 * 2031-09-10, retaining transitional law for pre-repeal acts.
 * Age at OFFENCE, NOT age at trial. Four-year threshold on completed
 * offence, NOT inchoate penalty. This module never approves inchoate
 * criminalization, detention or other coercive measures.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const START='2026-09-10',END='2031-09-10';
const statute=[
'6 § /Upphör att gälla U:2031-09-10/',
'För brott som någon har begått innan han eller hon fyllt femton år får det inte dömas till påföljd.',
'För brott som någon har begått när han eller hon var fjorton år får det dock dömas till påföljd om',
'1. det för brottet inte är föreskrivet lindrigare straff än fängelse i fyra år, eller',
'2. det är fråga om försök, förberedelse eller stämpling till sådant brott som avses i 1. Lag (2026:1528).',
'',
'6 § /Träder i kraft I:2031-09-10/',
'För brott som någon har begått innan han eller hon fyllt femton år får det inte dömas till påföljd. Lag (2026:1555).'
].join('\n');
if(window.BK_STATUTES){
 window.BK_STATUTES['BrB:1:6']={
  id:'BrB:1:6',ref:'BrB 1 kap. 6 §',text:statute,complete:true,machine:false,
  checked:'2026-10-17',url:SRC,
  sourceAmendments:['SFS 2026:1528','SFS 2026:1555'],
  currentLawScope:'2026-09-10 to 2031-09-09, act-date-specific; prior offences remain under prior law'
 };
}
const base=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const stats={total:0,base:0,stages:0,thresholdMet:0,thresholdNotMet:0,stageNotCriminalized:0,stageUnverified:0,reviewNeeded:0,conditional:0,unknownParent:0,from:START,toExclusive:END,source:SRC};
const hasReliableGrade=c=>Boolean(c?.penaltyRangeVerified===true&&
 c.penaltyReviewScope==='individual-current-grade-range-only'&&
 c.penaltyGradeReviewDate==='2026-10-17'&&
 c.penaltyGradeReviewSource===SRC&&
 Number.isFinite(c.penaltyRange?.min));
for(const c of D.crimes){
 const stage=Boolean(c.stageType);
 const parent=stage?base.get(c.stageParentId):c;
 const min=parent?.penaltyRange?.min;
 const verified=hasReliableGrade(parent);
 const conditional=Boolean(parent?.conditionalPenalty||parent?.applicabilityConditional||c.applicabilityConditional);
 let status,reason;
 if(stage&&!parent){
  status='missing-parent';
  reason='Grundbrottet saknas. Bedömningen kan inte göras.';
 }else if(stage&&c.stageStatus==='unverified'){
  status='inchoate-unverified';
  reason='Förstadiets straffbarhet är ännu inte juridiskt avgjord. Undantaget för 14-åringar får inte tolkas som en särskild kriminaliseringsregel.';
 }else if(stage&&c.stageStatus!=='punishable'){
  status='inchoate-not-established';
  reason='Förstadiet är inte markerat som straffbart i katalogen. Enligt BrB 1:6 krävs även separat straffbeläggning enligt relevant förstadiebestämmelse.';
 }else if(conditional){
  status='conditional-applicability';
  reason='Utöver åldersundantaget krävs separat granskning av tidsbundna tillämpningsvillkor, exempelvis krigsförhållanden eller villkorad straffskala.';
 }else if(!verified){
  status='underlying-penalty-review-required';
  reason='Grundbrottets aktuella lägsta föreskrivna straff har inte individuellt verifierats tillräckligt. En preliminär straffskala får inte automatiskt användas för 14-årsgränsen.';
 }else if(min>=4){
  status='minimum-threshold-met';
  reason=stage
   ?'Grundbrottets individuellt kontrollerade straffminimum är minst fyra års fängelse. Katalogen markerar även detta förstadium som straffbart. Åldersundantaget kan därför vara tillämpligt, om de övriga lagförutsättningarna är uppfyllda.'
   :'Brottets individuellt kontrollerade straffminimum är minst fyra års fängelse. Åldersundantaget kan därför vara tillämpligt, om övriga lagförutsättningar är uppfyllda.';
 }else{
  status='minimum-threshold-not-met';
  reason='Brottets individuellt kontrollerade straffminimum understiger fyra års fängelse. Detta särskilda undantag för gärningar vid 14 års ålder omfattar då inte rubriceringen.';
 }
 const record={
  status,description:reason,sourceRef:'BrB 1:6',sourceURL:SRC,
  statuteVersion:'Lag (2026:1528)',futureAmendment:'Lag (2026:1555)',
  effectiveFrom:START,effectiveToExclusive:END,
  appliesToAgeAtAct:14,
  referenceIsCompletedOffence:stage,
  parentRef:stage?(parent?.shortRef||null):null,
  stageStatus:stage?(c.stageStatus||'unknown'):null,
  completedOffenceMinimumYears:Number.isFinite(min)?min:null,
  completedOffencePenaltyIndividuallyVerified:verified,
  provisionalOnly:status!=='minimum-threshold-met'&&status!=='minimum-threshold-not-met',
  neverApprovesInchoateCriminalization:true,
  neverApprovesCoerciveMeasures:true,
  reviewNote:'Bedöm ålder och gärningsdatum separat. Regeln gäller gärningar från 2026-09-10 till före 2031-09-10. För äldre gärningar gäller äldre regler. Från 2031-09-10 återställs 15-årsgränsen för nya gärningar; tidigare begångna gärningar omfattas av övergångsregeln i SFS 2026:1555 även om prövningen sker senare. Straffminimum avser huvudbrottet även när prövningen gäller förstadier.'
 };
 c.age14Exception15=record;
 stats.total++;
 if(stage)stats.stages++;else stats.base++;
 if(status==='minimum-threshold-met')stats.thresholdMet++;
 else if(status==='minimum-threshold-not-met')stats.thresholdNotMet++;
 else if(status==='inchoate-unverified')stats.stageUnverified++;
 else if(status==='inchoate-not-established')stats.stageNotCriminalized++;
 else if(status==='conditional-applicability')stats.conditional++;
 else if(status==='missing-parent')stats.unknownParent++;
 else stats.reviewNeeded++;
}
window.BK_AGE14_15=stats;
})();