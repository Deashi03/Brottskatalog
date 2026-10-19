/* V1.5 coercive screening guard. Penalty thresholds never constitute a warrant or custody determination.
 * RB 24:1–3, RB 23–28 reviewed 2026-10-18; require individual offence applicability and the proper decision-maker.
 */
(()=>{'use strict';const R=window.BK_COERCIVE;if(!R)return;
const prevScore=R.score;
const unresolved=c=>!c||Boolean(c.conditionalPenalty||c.applicabilityConditional||c.penaltyCrosscheckIssue||
 (c.stageStatus&&c.stageStatus!=='punishable')||
 c.penaltyRangeVerified!==true||['source-penalty-range-conflict-hold','derivative-sfs-reference-conditional'].includes(c.penaltyReviewScope));
const unknown={
 label:'Straffskala, förstadieansvar eller tillämplighet kräver individuell kontroll – inget positivt tvångsmedelsbesked',tone:'unknown'
};
R.score=(c,e)=>{
 // An expressly unpunishable inchoate stage is NO, not UNKNOWN.  An
 // ambiguous stage remains unknown. Do not turn either into a green tick.
 if(c?.stageStatus==='not-criminalized')return {label:'Förstadiet är inte straffbelagt enligt den kontrollerade bestämmelsen',tone:'no'};
 if(c?.stageStatus==='unverified')return unknown;
 // A current-law named-grade inchoate audit is NOT a final factual threshold
 // or power review. Prevent the special four-year attempt fast path from
 // turning 21 newly enumerated (and 15 formerly unknown) stages green.
 if(c?.individualLegalAudit15?.scope?.finding==='CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE'){
  if(e?.scale==='four'&&c.stageType==='forsok'&&Number(c.stageParentMin)>=4&&
    !c.applicabilityConditional&&!c.conditionalPenalty)
   return {label:'Fyrårsgränsen kan vara uppfylld enligt det granskade brottsstadiet. Brottsgrad, gärningsdag och åtgärdens övriga rekvisit måste prövas.',tone:'conditional'};
  return unknown;
 }
 // RB 23:8 a–b expressly covers attempts to completed offences with
 // minimum four years. Here only a positively reviewed and criminalized
 // attempt may use its parent minimum as a *threshold*, not as a
 // verified general attempt sentence or a coercive decision.
 const explicitFourYearAttempt=Boolean(c?.stageType==='forsok'&&
   c.stageStatus==='punishable'&&c.stageReviewDate&&c.stageSource&&
   e?.scale==='four'&&Number(c.stageParentMin)>=4&&
   !c.conditionalPenalty&&!c.applicabilityConditional&&!c.penaltyCrosscheckIssue);
 if(explicitFourYearAttempt)return prevScore(c,e);
 if(unresolved(c))return unknown;
 return prevScore(c,e);
};
R.eligible=(c,e)=>['yes','neutral','conditional'].includes(R.score(c,e).tone);
R.unresolvedForCoercion15=unresolved;
window.BK_COERCIVE_SAFETY15={source:'RB 24:1–3 och 23–28 kap.',checked:'2026-10-18',scope:'negative-safety-gate',noAutomaticCustodyApproval:true};
})();