/* V1.5 — individually source-checked age-14 statutory threshold only.
 * BrB 1:6 (SFS 2026:1528 until 2031-09-09) refers to the FULL offence's
 * minimum >= 4 years and to punishable attempts/preparations/conspiracy.
 * Each candidate must be linked to an independently source-checked parent
 * grade, dated stage authorization where relevant, and complete BrB 1:6.
 * NO case-specific application, detention or general legal signoff.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const source='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const age=W['BrB:1:6'];
const lawReady=Boolean(age?.complete&&age?.url===source&&age.checked==='2026-10-17'&&
  age.text.includes('fyra år')&&age.text.includes('försök, förberedelse eller stämpling')&&
  age.text.includes('Lag (2026:1528)')&&age.text.includes('Lag (2026:1555)'));
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const recordReady=(p)=>{
 if(!p?.penaltyRangeVerified||!p.lawCompletenessVerified
   ||!Number.isFinite(p.penaltyRange?.min)||p.penaltyRange.min<4
   ||!['2026-10-17','2026-10-18','2026-10-20'].includes(p.penaltyGradeReviewDate)
   ||!p.penaltyGradeReviewProvision
   ||!p.penaltyGradeReviewSource?.startsWith('https://www.riksdagen.se/')
   ||p.penaltyGradeReviewSource!==p.lawCompletenessSourceURL)return false;
 const s=String(p.penaltyReviewScope||'');
 if(s==='numerical-scale-only')return p.penaltyGradeReviewScope15==='current-SFS-exact-punishment-clause-only';
 return [
  'individual-current-grade-range-only',
  'individual-current-smuggling-grade-range-only',
  'individual-current-special-statute-grade-range-only',
  'individual-current-special-grade-range-only'
 ].includes(s);
};
const cases=D.crimes.filter(c=>Number(c.age14Exception15?.completedOffenceMinimumYears)>=4);
const report={planned:cases.length,sourceReviewed:0,unresolved:[],currentActStart:'2026-09-10',
 futureRepeal:'2031-09-10',sourceURL:source,sourceReady:lawReady,
 decisionsOnIndividualLiability:0,automaticInchoateCriminalizations:0,coercionApprovals:0,
 sourceReviewScope:'completed-offence-minimum-and-enumerated-stage-only'};
for(const c of cases){
 const stage=Boolean(c.stageType),p=stage?parents.get(c.stageParentId):c;
 const a=c.age14Exception15;
 const stageReady=!stage||Boolean(c.stageStatus==='punishable'&&c.stageSource&&c.stageReviewDate
   &&(c.stagePreliminaryScope15?.status!=='SOURCE_ENUMERATION_REVIEWED'
    ||(c.stagePreliminaryScope15.criminalizedInCurrentAct===true&&c.stagePreliminaryScope15.sourceURL?.startsWith('https://'))));
 const valid=Boolean(lawReady&&recordReady(p)&&stageReady
   &&p?.penaltyRange.min===a?.completedOffenceMinimumYears
   &&a?.effectiveFrom==='2026-09-10'&&a.effectiveToExclusive==='2031-09-10'
   &&a.appliesToAgeAtAct===14
   &&a.caseSpecificApplicationApproved===false&&a.neverApprovesCoerciveMeasures===true);
 if(!valid){report.unresolved.push({title:c.title,kind:c.stageType||'fullbordat',
    sourceReady:lawReady,parentGradeReady:recordReady(p),stageReady,oldStatus:a?.status});continue;}
 a.individualSourceScopeApproved=true;
 a.individualSourceScopeChecked=(p.penaltyGradeReviewDate==='2026-10-20'||c.id.startsWith('stage-gap15-'))?'2026-10-20':'2026-10-18';
 a.individualSourceScopeSources=[source,p.penaltyGradeReviewSource,...(stage?[c.stagePreliminaryScope15?.sourceURL||c.sourceURL]:[])];
 a.individualSourceScopeResult='MINIMUM_4_YEARS_CONFIRMED_STATUTORY_ONLY';
 a.completedOffencePenaltyIndividuallyVerified=true;
 a.statutoryThresholdIndividuallyChecked=true;
 a.statuteVersion='Lag (2026:1528)';
 a.sourceCheckedParentProvision=p.penaltyGradeReviewProvision;
 a.sourceCheckedParentMinimumYears=p.penaltyRange.min;
 a.inchoateStatutoryListingReviewed=stage;
 a.inchoateCaseLegalAssessmentApproved=false;
 a.caseSpecificApplicationApproved=false;
 a.neverApprovesCoerciveMeasures=true;
 a.provisionalOnly=true;
 if(!p.conditionalPenalty&&!p.applicabilityConditional&&!c.applicabilityConditional)a.status='minimum-threshold-met';
 else a.status='conditional-applicability';
 a.reviewNote='Källgranskat '+a.individualSourceScopeChecked+': endast den aktuella BrB 1:6-regelns lägsta fullbordatsstraff och det namngivna förstadiets preliminära straffbeläggning. Inte beslut om ansvar: pröva gärningsdatum, ålder, faktisk straffbarhet, övergångsregler, kapitelundantag och ungdomens särskilda processuella skydd. Inte beslut om tvångsmedel.';
 report.sourceReviewed++;
}
window.BK_AGE14_CANDIDATE_SOURCE_AUDIT15=report;
})();