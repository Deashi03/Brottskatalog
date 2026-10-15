/* Brottskatalog 1.4: four police-relevant BrB 17 ranges checked
 * against consolidated BrB 17:1, 3-4 (Lag 2025:579) on 2026-10-15.
 * Review is limited to penalty ranges, not all interpretation issues. */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const checked='2026-10-15';
 const url='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
 const rows=[
  ['Våld eller hot mot tjänsteman','17:1',0,3,true,'B–F 3 år'],
  ['Grovt våld eller hot mot tjänsteman','17:1',1.5,8,false,'F 1,5–8 år'],
  ['Förolämpning mot tjänsteman','17:3',0,0.5,true,'B–F 6 mån'],
  ['Våldsamt motstånd','17:4',0,0.5,true,'B–F 6 mån']
 ];
 let updated=0;const missing=[];
 const lookup=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title.toLocaleLowerCase('sv'),c]));
 for(const [title,section,min,max,fines,short] of rows){
   const c=lookup.get(title.toLocaleLowerCase('sv'));
   if(!c){missing.push(title);continue;}
   c.penaltyRange={min,max,fines,life:false};c.penaltyShort=short;
   c.penaltySource='BrB '+section+'; Lag (2025:579), kontrollerad straffskala '+checked;
   c.penaltyChecked=checked;c.penaltyRangeVerified=true;
   c.reviewStatus='penalty-reviewed-source-excerpt';
   c.sourceURL=url;
   // No alterations to full text, charging conditions or degree assessment.
   updated++;
 }
 window.BK_BRB17_REVIEW14={updated,missing,checked,url};
})();