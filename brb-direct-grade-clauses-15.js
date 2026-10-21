/* V1.5 – independently checked literal legal penalty passages for
 * selected BrB grade cards. Each task validates the current SFS paragraph,
 * its exact relevant punishment words and expected numeric range.
 * No case-specific charge, historic applicability, pretrial detention,
 * offence-stage authorization or overall legal approval.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const data=[
 // title, BrB reference, minimum years, maximum years, fine, life, literal penalty anchor
 ['Rymning','BrB:17:12',0,2,false,false,'för rymning till fängelse i högst två år'],
 ['Grov rymning','BrB:17:12',0.5,4,false,false,'för grov rymning till fängelse i lägst sex månader och högst fyra år'],
 ['Främjande av rymning eller flykt','BrB:17:12a',0,1,true,false,'för främjande av rymning eller flykt till böter eller fängelse i högst ett år'],
 ['Grovt främjande av rymning eller flykt','BrB:17:12a',0.5,4,false,false,'för grovt främjande av rymning eller flykt till fängelse i lägst sex månader och högst fyra år'],
 ['Överträdelse av myndighets bud','BrB:17:13',0,1,true,false,'till böter eller fängelse i högst ett år'],
 ['Hindrande av förrättning','BrB:17:13',0,0,true,false,'för hindrande av förrättning till böter'],
 ['Brott mot tystnadsplikt','BrB:20:3',0,2,true,false,'för brott mot tystnadsplikt till böter eller fängelse i högst två år'],
 ['Grovt brott mot tystnadsplikt','BrB:20:3',1,6,false,false,'för grovt brott mot tystnadsplikt till fängelse i lägst ett och högst sex år'],
 ['Involverande av en underårig i brottslighet','BrB:16:5a',0,6,false,false,'för involverande av en underårig i brottslighet till fängelse i högst sex år'],
 ['Olaga våldsskildring','BrB:16:10c',0,2,true,false,'för olaga våldsskildring till böter eller fängelse i högst två år'],
 ['Otillåten utlämning av teknisk upptagning','BrB:16:10d',0,0.5,true,false,'för otillåten utlämning av teknisk upptagning till böter eller fängelse i högst sex månader'],
 ['Väpnat hot mot laglig ordning','BrB:18:3',6,10,false,false,'för väpnat hot mot laglig ordning till fängelse, lägst sex och högst tio år'],
 ['Olovlig kårverksamhet','BrB:18:4',0,2,true,false,'för olovlig kårverksamhet till böter eller fängelse i högst två år'],
 ['Brott mot medborgerlig frihet','BrB:18:5',0,6,false,false,'för brott mot medborgerlig frihet till fängelse i högst sex år'],
 ['Krigsanstiftan','BrB:19:2',2,8,false,false,'för krigsanstiftan till fängelse, lägst två och högst åtta år'],
 ['Trolöshet vid förhandling med främmande makt','BrB:19:3',2,18,false,true,'för trolöshet vid förhandling med främmande makt till fängelse på viss tid, lägst två och högst arton år, eller på livstid'],
 ['Utlandsspioneri','BrB:19:6a',0,4,false,false,'för utlandsspioneri till fängelse i högst fyra år'],
 ['Grovt utlandsspioneri','BrB:19:6b',2,8,false,false,'för grovt utlandsspioneri till fängelse i lägst två och högst åtta år'],
 ['Olovlig underrättelseverksamhet mot Sverige','BrB:19:10',0,2,false,false,'för olovlig underrättelseverksamhet mot Sverige till fängelse i högst två år'],
 ['Grov olovlig underrättelseverksamhet mot Sverige','BrB:19:10',0.5,4,false,false,'till fängelse i lägst sex månader och högst fyra år'],
 ['Olovlig underrättelseverksamhet mot främmande makt','BrB:19:10a',0,1,true,false,'för olovlig underrättelseverksamhet mot främmande makt till böter eller fängelse i högst ett år'],
 ['Grov olovlig underrättelseverksamhet mot främmande makt','BrB:19:10a',0.5,4,false,false,'till fängelse i lägst sex månader och högst fyra år'],
 ['Olovlig underrättelseverksamhet mot person','BrB:19:10b',0,1,false,false,'för olovlig underrättelseverksamhet mot person till fängelse i högst ett år'],
 ['Grov olovlig underrättelseverksamhet mot person','BrB:19:10b',0.5,4,false,false,'till fängelse i lägst sex månader och högst fyra år'],
 ['Tagande av utländskt understöd','BrB:19:13',0,2,false,false,'för tagande av utländskt understöd till fängelse i högst två år']
];
const normalize=t=>String(t||'').toLowerCase().replace(/\s+/g,' ').replace(/\s*–\s*/g,'-').trim();
const report={planned:data.length,checked:0,held:[],checkedDate:'2026-10-18',
 sourceURL:URL,scope:'literal-statutory-grade-range-only',
 caseSpecificCustodyApprovals:0,finalOffenceLegalApprovals:0,stageChanges:0};
for(const [title,ref,min,max,fines,life,anchor] of data){
 const c=D.crimes.find(c=>!c.stageType&&c.title===title),p=W[ref],r=c?.penaltyRange;
 const ok=Boolean(c&&c.statute===ref&&p?.complete===true
  &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&['2026-10-17','2026-10-18'].includes(p.checked)&&p.url===URL
  &&c.lawCompletenessVerified===true
  &&normalize(p.text).includes(normalize(anchor))
  &&c.penaltyRangeVerified===true&&!c.conditionalPenalty
  &&r?.min===min&&r?.max===max&&r?.fines===fines&&r?.life===life
  &&!c.penaltyGradeReviewDate&&c.rekvisit15?.legalReviewApproved!==true);
 if(!ok){report.held.push({title,ref,sourceComplete:p?.complete,
  paragraphChecked:p?.checked,foundAnchor:normalize(p?.text).includes(normalize(anchor)),
  scale:r,alreadyReviewed:Boolean(c?.penaltyGradeReviewDate)});continue;}
 c.penaltyGradeReviewDate='2026-10-18';
 c.penaltyGradeReviewSource=URL;
 c.penaltyGradeReviewProvision=ref+' ('+title+', individuellt lagtextuttryck)';
 c.penaltyGradeReviewScope15='current-SFS-exact-punishment-clause-only';
 c.penaltyGradeReviewLegalConclusionApproved=false;
 c.penaltyGradeReviewCustodyApproved=false;
 c.penaltyGradeReviewOffenceDateRequired=true;
 report.checked++;
}
window.BK_DIRECT_GRADE_CLAUSES15=report;
})();