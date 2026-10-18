/* V1.5 — bounded final STATUTORY BRANCH-SCALE review for 14 non-numeric
 * cases. Current official BrB 1962:700, compared 2026-10-18. APPROVED
 * means only that the conditional statutory branch wording/range has been
 * checked against current SFS; NEVER an automatic case-fact selection,
 * legal conclusion on a historic offence or a custody/coercion decision.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const cases=[
 ['Arbetsmiljöbrott','BrB:3:10',0,['straff som i nämnda lagrum sägs'],['BrB:3:7','BrB:3:8','BrB:3:9']],
 ['Brukande av det förfalskade','BrB:14:10',0,['som om han eller hon själv hade gjort förfalskningen','fara i bevishänseende'],['BrB:14:1','BrB:14:2']],
 ['Osann utsaga inför nordisk domstol','BrB:15:4a',5,['påföljd enligt 1 §','enligt 2 §','under straffansvar'],['BrB:15:1','BrB:15:2']],
 ['Ovarsam utsaga inför nordisk domstol','BrB:15:4a',1,['grov oaktsamhet','påföljd enligt 3 §'],['BrB:15:3']],
 ['Osann utsaga inför en internationell domstol','BrB:15:4b',3,['vittne eller en sakkunnig under ed','påföljd enligt 1 §'],['BrB:15:1']],
 ['Ovarsam utsaga inför en internationell domstol','BrB:15:4b',1,['grov oaktsamhet','Internationella brottmålsdomstolen','Ansvar enligt detta stycke ska dock inte dömas ut'],['BrB:15:3']],
 ['Myteri','BrB:16:6',5,['samling av krigsmän','anförare','gemensamt brukat våld','på livstid'],[]],
 ['Upplopp','BrB:16:1',3,['folksamling','anstiftare','annan deltagare','skingrar sig'],[]],
 ['Våldsamt upplopp','BrB:16:2',2,['folksamling','anförare','annan deltagare'],['BrB:16:1']],
 ['Svikande av försvarsplikt','BrB:18:6',2,['svikande av försvarsplikt','i krig','högst fyra år'],[]],
 ['Egenmäktighet vid förhandling med främmande makt','BrB:19:4',4,['egenmäktighet vid förhandling med främmande makt','lägst fyra och högst tio år','på livstid'],[]],
 ['Högförräderi','BrB:19:1',2,['högförräderi','lägst tio och högst arton år','om faran var ringa'],[]],
 ['Olovlig värvning','BrB:19:12',2,['olovlig värvning','Sverige var i krig'],[]],
 ['Vårdslöshet med hemlig uppgift','BrB:19:9',2,['grov oaktsamhet','Sverige var i krig','försvarlig'],['BrB:19:7']]
];
const out={planned:cases.length,approved:0,held:[],branchCount:0,sourceURL:URL,
 reviewDate:'2026-10-18',status:'statutory-branch-only',
 caseSpecificSelections:0,automaticCustodyApproval:0,finalLegalLiabilityApprovals:0,
 historicalApplicabilityApprovals:0};
for(const [title,ref,n,phrases,deps] of cases){
 const c=D.crimes.find(c=>!c.stageType&&c.title===title),p=W[ref],
 a=c?.penaltyAlternatives15,detail=c?.penaltyAlternativeReview15;
 const sourceOK=!!p?.complete&&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&p.checked==='2026-10-18'&&p.url===URL
  &&phrases.every(s=>String(p.text).includes(s))
  &&deps.every(k=>W[k]?.complete&&W[k].completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
     &&W[k].url===URL)
  &&c?.lawCompletenessVerified===true&&c.statute===ref;
 const branchOK=c?.conditionalPenalty===true&&c.penaltyRangeVerified===false&&Array.isArray(a)
  &&a.length===(n||1)&&a.every(x=>typeof x.when==='string'&&x.when.length>=8
      &&typeof x.scale==='string'&&x.scale.length>=10
      &&typeof x.source==='string'&&x.source.startsWith('BrB'))
  &&detail?.sourceURL===URL&&detail.checked==='2026-10-18'
  &&detail.automaticSelectionAllowed===false&&detail.custodyApproved===false
  &&c.rekvisit15?.legalReviewApproved!==true;
 const deriv=n===0&&c?.penaltyDerivation15?.kind==='statutory-cross-reference'
   &&c.penaltyDerivation15.numericRangeResolved===false
   &&c.penaltyDerivation15.custodyApproved===false
   &&c.penaltyDerivation15.dependsOn.every(k=>W[k]?.complete);
 if(!sourceOK||!branchOK||(n===0&&!deriv)){
  out.held.push({title,sourceOK,branchOK,deriv:n===0?deriv:null,actual:a?.length,sourceChecks:{statuteComplete:p?.complete,statuteDate:p?.checked,statuteProvenance:p?.completeTextProvenance,statuteURL:p?.url,depChecks:deps.map(k=>({ref:k,complete:W[k]?.complete,provenance:W[k]?.completeTextProvenance,url:W[k]?.url}))}});continue;
 }
 // This is APPROVAL OF SOURCE-DEPENDENT BRANCH DESCRIPTION; a case-specific
 // numeric scale and coercive-measure eligibility remain explicitly unresolved.
 c.conditionalPenaltyFinalAudit15={
  status:'APPROVED',approvedScope:'complete-current-SFS-branch-and-cross-reference-description-only',
  checked:'2026-10-18',sourceURL:URL,sourceRef:ref,
  reviewedDependentSections:deps,branchCount:a.length,
  directSourceCheckApproved:true,offenceDateStillRequired:true,
  caseSpecificBranchSelectionApproved:false,caseSpecificScaleResolved:false,
  legalLiabilityApproved:false,automaticCustodyDecisionApproved:false,
  legalReviewApproved:false,
  safetyText:'Endast villkorade straffskalealternativ har källgranskats. Välj inte straffskala, åtal eller tvångsmedel automatiskt utan fakta, gärningstidpunkt och separat rättslig prövning.'
 };
 out.approved++;out.branchCount+=a.length;
}
window.BK_CONDITIONAL_GRADE_SOURCE_AUDIT15=out;
})();