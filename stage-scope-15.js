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
const warParents=new Map(D.crimes.filter(c=>!c.stageType&&c.applicabilityConditional).map(c=>[c.id,c]));
let warStages=0;
for(const c of D.crimes){
 if(!c.stageType)continue;
 const p=warParents.get(c.stageParentId);
 if(!p)continue;
 c.applicabilityConditional=true;
 c.applicabilityType=p.applicabilityType;
 const exception=p.applicabilityType==='land'&&(c.stageType==='forberedelse'||c.stageType==='stampling');
 c.applicabilityWarning=exception
  ?'Enligt BrB 22:7 kan förberedelse eller stämpling till landssvek/landsförräderi vara straffbar även när landet hotas av krig eller andra angivna fientligheter. Kontrollera de särskilda förutsättningarna.'
  :'Krigs- eller beredskapsrelaterade tillämpningsförutsättningar måste fastställas innan straffbarheten bedöms.';
 c.stageExplanation=(c.stageExplanation||'')+' '+c.applicabilityWarning;
 c.penaltyNote=(c.penaltyNote||'')+' '+c.applicabilityWarning;
 c.custody='unknown';
 warStages++;
}
// BrB 21:15 uses the principal offence name in the stage provision;
// do not silently infer a definitive negative verdict for the separately
// indexed aggravated grade until scope has been examined individually.
let gross21Withheld=0;
for(const c of D.crimes.filter(c=>c.stageType)){
 const p=D.crimes.find(x=>x.id===c.stageParentId);
 if(p?.title!=='Grovt våld eller hot mot förman'||c.stageStatus!=='not-criminalized')continue;
 c.stageStatus='unverified';c.penaltyRange=null;c.penalty='Straffbarhet ej verifierad';
 c.penaltyShort='Ej verifierat';c.stageReviewDate=null;c.custody='unknown';
 c.stageExplanation='BrB 21:15 nämner våld eller hot mot förman. Förstadieansvaret för den grova graden måste utredas särskilt. '+(c.applicabilityWarning||'');
 c.penaltyNote=c.stageExplanation;
 gross21Withheld++;
}
window.BK_STAGE_SCOPE15={withheld,warStages,gross21Withheld,reason:'BrB 13:12 and gross forms need dedicated legal determination'};
})();