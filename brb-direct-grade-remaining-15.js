/* V1.5: remaining 33 directly compared statutory grade clauses, including
 * chapters 21–22. Checks CURRENT statutory text and specific numerical range
 * ONLY; armed-forces/wartime provisions retain independent applicability,
 * jurisdiction, exception, offence-date and coercion review requirements.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
['Våld eller hot mot tjänsteman','BrB:17:1',0,3,1,0,'för våld eller hot mot tjänsteman till böter eller fängelse i högst tre år'],
['Grovt våld eller hot mot tjänsteman','BrB:17:1',1.5,8,0,0,'för grovt våld eller hot mot tjänsteman till fängelse i lägst ett år och sex månader och högst åtta år'],
['Våldsamt motstånd','BrB:17:4',0,.5,1,0,'för våldsamt motstånd till böter eller fängelse i högst sex månader'],
['Grov obehörig befattning med hemlig uppgift','BrB:19:8',0,4,0,0,'för grov obehörig befattning med hemlig uppgift till fängelse i högst fyra år'],
['Röjande av hemlig uppgift i internationellt samarbete','BrB:19:9a',0,1,1,0,'för röjande av hemlig uppgift i internationellt samarbete till böter eller fängelse i högst ett år'],
['Samlag med avkomling','BrB:6:7',0,2,0,0,'för samlag med avkomling till fängelse i högst två år'],
['Samlag med syskon','BrB:6:7',0,1,0,0,'för samlag med syskon till fängelse i högst ett år'],
['Kapning','BrB:13:5a',0,4,0,0,'för kapning till fängelse i högst fyra år'],
['Grov kapning','BrB:13:5a',2,18,0,1,'Är brott som avses i första eller andra stycket att anse som grovt, döms till fängelse på viss tid, lägst två och högst arton år, eller på livstid'],
['Sjö- eller luftfartssabotage','BrB:13:5a',0,4,0,0,'för sjö- eller luftfartssabotage till fängelse i högst fyra år'],
['Grovt sjö- eller luftfartssabotage','BrB:13:5a',2,18,0,1,'Är brott som avses i första eller andra stycket att anse som grovt, döms till fängelse på viss tid, lägst två och högst arton år, eller på livstid'],
['Flygplatssabotage','BrB:13:5b',0,4,0,0,'för flygplatssabotage till fängelse i högst fyra år'],
['Grovt flygplatssabotage','BrB:13:5b',2,18,0,1,'Är brottet att anse som grovt, döms till fängelse på viss tid, lägst två och högst arton år, eller på livstid'],
['Lydnadsbrott','BrB:21:5',0,2,1,0,'för lydnadsbrott till böter eller fängelse i högst två år'],
['Grovt lydnadsbrott','BrB:21:6',0,10,0,1,'för grovt lydnadsbrott till fängelse i högst tio år eller på livstid'],
['Olovlig avvikelse av krigsman','BrB:21:7',0,2,1,0,'för olovlig avvikelse av krigsman till böter eller fängelse i högst två år'],
['Grov olovlig avvikelse av krigsman','BrB:21:7',0,10,0,1,'för grov olovlig avvikelse av krigsman till fängelse i högst tio år eller på livstid'],
['Våld eller hot mot förman','BrB:21:8',0,2,1,0,'för våld eller hot mot förman till böter eller fängelse i högst två år'],
['Grovt våld eller hot mot förman','BrB:21:8',0,6,0,0,'Är brottet att anse som grovt, skall dömas till fängelse i högst sex år'],
['Samröre med fienden','BrB:21:9',0,2,1,0,'för samröre med fienden till böter eller fängelse i högst två år'],
['Undergrävande av stridsviljan','BrB:21:10',0,10,0,1,'för undergrävande av stridsviljan till fängelse i högst tio år eller på livstid'],
['Försummande av krigsförberedelse','BrB:21:11',0,10,0,1,'för försummande av krigsförberedelse till fängelse i högst tio år eller på livstid'],
['Obehörig kapitulation','BrB:21:12',0,10,0,1,'för obehörig kapitulation till fängelse i högst tio år eller på livstid'],
['Stridsförsumlighet','BrB:21:13',0,10,0,1,'för stridsförsumlighet till fängelse i högst tio år eller på livstid'],
['Tjänstebrott','BrB:21:14',0,2,0,0,'för tjänstebrott till fängelse i högst två år'],
['Landssvek','BrB:22:2',0,6,0,0,'för landssvek till fängelse i högst sex år'],
['Landsskadlig vårdslöshet','BrB:22:3',0,4,0,0,'för landsskadlig vårdslöshet till fängelse i högst fyra år'],
['Olovlig befattning med kemiska vapen','BrB:22:6a',0,4,0,0,'för olovlig befattning med kemiska vapen till fängelse i högst fyra år'],
['Grov olovlig befattning med kemiska vapen','BrB:22:6a',0,18,0,1,'till fängelse i högst arton år eller på livstid'],
['Olovlig befattning med minor','BrB:22:6b',0,4,0,0,'för olovlig befattning med minor till fängelse i högst fyra år'],
['Grov olovlig befattning med minor','BrB:22:6b',0,18,0,1,'till fängelse i högst arton år eller på livstid'],
['Förberedelse genom anbringande av tekniskt hjälpmedel','BrB:4:9b',0,2,1,0,'för förberedelse till sådant brott till böter eller fängelse i högst två år'],
['Olaga frihetsberövande (mindre grovt fall)','BrB:4:2',0,2,1,0,'Är brottet mindre grovt, döms till böter eller fängelse i högst två år']
];
const norm=s=>String(s||'').toLowerCase().replace(/\s+/g,' ').trim();
const report={planned:rows.length,checked:0,held:[],checkedOn:'2026-10-18',
 sourceURL:URL,scope:'current-full-SFS-grade-clause-only',
 applicabilityApprovals:0,caseSpecificCustodyApprovals:0,fullLegalApprovals:0};
for(const [title,ref,min,max,fine,life,passage] of rows){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),p=W[ref],r=c?.penaltyRange;
 const ok=Boolean(c&&c.statute===ref&&p?.complete===true
  &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&['2026-10-17','2026-10-18'].includes(p.checked)&&p.url===URL
  &&c.lawCompletenessVerified===true&&norm(p.text).includes(norm(passage))
  &&c.penaltyRangeVerified===true&&c.conditionalPenalty!==true
  &&r?.min===min&&r?.max===max&&r?.fines===Boolean(fine)&&r?.life===Boolean(life)
  &&!c.penaltyGradeReviewDate&&c.rekvisit15?.legalReviewApproved!==true);
 if(!ok){report.held.push({title,sourceOK:p?.complete,refOK:c?.statute===ref,
   foundPassage:norm(p?.text).includes(norm(passage)),
   range:r,expected:{min,max,fines:Boolean(fine),life:Boolean(life)},
   preexistingDate:c?.penaltyGradeReviewDate});continue;}
 c.penaltyGradeReviewDate='2026-10-18';
 c.penaltyGradeReviewSource=URL;
 c.penaltyGradeReviewProvision=ref+' ('+title+', individuell straffsats)';
 c.penaltyGradeReviewScope15='independently-source-matched-current-SFS-punishment-clause-only';
 c.penaltyGradeReviewOffenceDateRequired=true;
 c.penaltyGradeReviewHistoricLawApproved=false;
 c.penaltyGradeReviewLiabilityApproved=false;
 c.penaltyGradeReviewCustodyApproved=false;
 c.penaltyGradeReviewApplicabilityPending=ref.startsWith('BrB:21:')||ref.startsWith('BrB:22:');
 report.checked++;
}
window.BK_REMAINING_DIRECT_GRADE_CLAUSES15=report;
})();