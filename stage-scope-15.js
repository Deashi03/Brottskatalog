/* Avoid a false "not criminalized" verdict where BrB 13:12
 * lists the normal offence while the parent is its aggravated grade.
 * A blanket inference of either punishability or non-punishability would
 * overstate the current scope of this specific review.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const parents=new Map(D.crimes.filter(c=>c.stageExtraCheck==='aggravated-13-12').map(c=>[c.id,c]));
let withheld=0;
for(const c of D.crimes){
 if(!c.stageType||!parents.has(c.stageParentId))continue;
 if(c.stageStatus!=='not-criminalized')continue;
 c.stageStatus='unverified';
 c.stageReviewDate=null;
 c.stageReviewBasis='BrB 13:12 nämner huvudrubriceringen. Omfattningen för den grova graden måste verifieras individuellt.';
 c.stageExplanation='Förstadiets straffbarhet för denna grova rubricering är ännu inte individuellt juridiskt avgjord. Avsaknad av verifiering betyder inte att gärningen är straffri.';
 c.penalty='Straffbarhet/straffskala ej verifierad';
 c.penaltyShort='Ej verifierat';
 c.penaltyNote=c.stageExplanation;
 c.penaltyRange=null;
 c.custody='unknown';
 c.prosecution='unknown';
 c.prosecutionLabel='Åtalsregel måste kontrolleras';
 c.prosecutionRule=null;
 c.prosecutionDetails=['Förstadieansvar och åtalsvillkor kräver individuell kontroll av BrB 13:12 och 23 kap.'];
 withheld++;
}
window.BK_STAGE_SCOPE15={withheld,reason:'BrB 13:12 and gross forms need dedicated legal determination'};
})();