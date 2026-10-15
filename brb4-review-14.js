/* Brottskatalog 1.4: selected BrB 4 kap. penalty ranges verified against
 * Sveriges riksdag's current consolidated text 2026-10-15.
 * Not a certification of imported statutory excerpts or factual guilt.
 */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const source='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
 const checked='2026-10-15';
 const cases=[
  ['Ofredande','4:7',0,1,true,'B–F 1 år','2017:1136',null],
  ['Hemfridsbrott','4:6',0,1,true,'B–F 1 år','2022:661',null],
  ['Olaga intrång','4:6',0,1,true,'B–F 1 år','2022:661',null],
  ['Grovt hemfridsbrott','4:6',0.5,3,false,'F 0,5–3 år','2022:661',null],
  ['Grovt olaga intrång','4:6',0.5,3,false,'F 0,5–3 år','2022:661',null],
  ['Psykiskt våld','4:7 b',0,4,false,'F 4 år','2026:852','2026-07-01']
 ];
 const byTitle=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title.toLocaleLowerCase('sv'),c]));
 const missing=[];
 let updated=0;
 for(const [title,section,min,max,fines,short,sfs,introduced] of cases){
  const c=byTitle.get(title.toLocaleLowerCase('sv'));
  if(!c){missing.push(title);continue;}
  c.penaltyRange={min,max,fines,life:false};
  c.penaltyShort=short;
  c.penaltyChecked=checked;
  c.penaltySource='BrB '+section+'; Lag ('+sfs+') – kontrollerad straffskala '+checked;
  c.penaltyRangeVerified=true;
  c.reviewStatus='penalty-reviewed-source-excerpt';
  c.sourceURL=source;
  if(introduced){c.introducedFrom=introduced;c.effectiveFrom=introduced;}
  // Keep all existing wording, explanatory notes and imported law text unchanged.
  updated++;
 }
 window.BK_BRB4_REVIEW14={updated,missing,checked,source};
})();