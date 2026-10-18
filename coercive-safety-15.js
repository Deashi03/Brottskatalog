/* V1.5 coercive screening guard. Penalty thresholds never constitute a warrant or custody determination.
 * RB 24:1–3, RB 23–28 reviewed 2026-10-18; require individual offence applicability and the proper decision-maker.
 */
(()=>{'use strict';const R=window.BK_COERCIVE;if(!R)return;
const prevScore=R.score;
const unresolved=c=>!c||Boolean(c.conditionalPenalty||c.applicabilityConditional||c.penaltyCrosscheckIssue||(c.stageStatus&&c.stageStatus!=='punishable')||
 c.penaltyRangeVerified!==true||['source-penalty-range-conflict-hold','derivative-sfs-reference-conditional'].includes(c.penaltyReviewScope));
R.score=(c,e)=>unresolved(c)?{
 label:'Straffskala, förstadieansvar eller tillämplighet kräver individuell kontroll – inget positivt tvångsmedelsbesked',tone:'unknown'
}:prevScore(c,e);
R.eligible=(c,e)=>['yes','neutral','conditional'].includes(R.score(c,e).tone);
R.unresolvedForCoercion15=unresolved;
window.BK_COERCIVE_SAFETY15={source:'RB 24:1–3 och 23–28 kap.',checked:'2026-10-18',scope:'negative-safety-gate',noAutomaticCustodyApproval:true};
})();