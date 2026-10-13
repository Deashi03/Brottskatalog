/* Brottskatalog 1.3 – targeted independent penalty cross-check of 16 common BrB offences.
 * Checked against official BrB consolidated wording as at 2026-10-13.
 * Only matching penalty ranges gain review metadata; a mismatch is flagged, never silently overwritten.
 * This is NOT a full review of actus reus, all applicability exceptions, or imported legal excerpts.
 */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
 // Title, statutory section, minimum (years), maximum (years), fines permitted.
 const cases=[
 ['Ringa stöld','8:2',0,.5,true],
 ['Stöld','8:1',0,2,false],
 ['Grov stöld','8:4',1,6,false],
 ['Inbrottsstöld','8:4 a',1,6,false],
 ['Rån','8:5',1.5,6,false],
 ['Grovt rån','8:6',5,10,false],
 ['Misshandel','3:5',0,2,false],
 ['Ringa misshandel','3:5',0,.5,true],
 ['Grov misshandel','3:6',1.5,7,false],
 ['Synnerligen grov misshandel','3:6',6,12,false],
 ['Bedrägeri','9:1',0,2,false],
 ['Ringa bedrägeri','9:2',0,.5,true],
 ['Grovt bedrägeri','9:3',1,6,false],
 ['Skadegörelse','12:1',0,2,false],
 ['Ringa skadegörelse','12:2',0,.5,true],
 ['Grov skadegörelse','12:3',1,6,false]
 ];
 const names=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title.toLocaleLowerCase('sv'),c]));
 let reviewed=0,missing=[],discrepancies=[],held=[];
 for(const [name,section,min,max,fines] of cases){
  const c=names.get(name.toLocaleLowerCase('sv'));
  if(!c){missing.push(name);continue;}
  const r=c.penaltyRange;
  const matches=!!r && Math.abs(r.min-min)<1e-8 && Math.abs(r.max-max)<1e-8 &&
    !!r.fines===fines && !r.life;
  if(!matches){
    const issue={title:name,ref:c.shortRef,expected:{min,max,fines,life:false},
      stored:r||null,source:'BrB '+section};
    discrepancies.push(issue);
    c.penaltyCrosscheckIssue=issue;
    c.penaltyRangeVerified=false;
    c.reviewStatus='penalty-crosscheck-pending';
    continue;
  }
  if(c.reviewStatus==='source-changed'){
    held.push(name);
    c.penaltyCrosscheckIssue={title:name,reason:'source-changed-review-required'};
    continue;
  }
  c.penaltySource='Brottsbalken (1962:700), '+section+' § – straffskalans intervall kontrollerat mot officiell konsolidering';
  c.penaltyChecked='2026-10-13';
  c.penaltyRangeVerified=true;
  c.penaltyReviewScope='range-only';
  c.reviewStatus='penalty-reviewed-source-excerpt';
  c.sourceURL=c.sourceURL||URL;
  reviewed++;
 }
 window.BK_CORE_PENALTIES13={reviewed,missing,discrepancies,held,planned:cases.length,scope:'penalty range only'};
})();