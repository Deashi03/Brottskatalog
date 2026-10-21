/* Verified case-law teaching example, never a substitute for case-specific legal review.
 * HD NJA 2025 s. 992, 'Vapenbilden', mål B 2105-25.
 * Riksdagens consolidated BrB 17:1 in force 2026-10-17.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const TITLE='Grovt våld eller hot mot tjänsteman';
const SOURCE='https://www.domstol.se/nyheter/2025/10/grovt-hot-mot-tjansteman/';
const c=D.crimes.find(x=>!x.stageType&&x.title===TITLE);
const stats={title:TITLE,found:Boolean(c),added:0,duplicates:0,source:SOURCE,reference:'NJA 2025 s. 992, B 2105-25'};
if(c){
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB17:1')throw Error('HD case attached to wrong provision');
 const item={
  text:'I NJA 2025 s. 992 skickade en man mycket allvarliga dödshot till en socialtjänsthandläggare genom sms och röstmeddelanden samt en bild där han riktade ett vapen mot kameran. HD ansåg inte att bilden i sig direkt omfattades av kvalifikationsgrunden om att hot förstärkts med hjälp av vapen, men bedömde gärningen som grov efter en samlad prövning av hotens allvar, bilden och kännedom om mannens våldskapital.',
  source:'Rättsfallsbaserat typexempel: Högsta domstolen, NJA 2025 s. 992 (Vapenbilden), B 2105-25, publicerat 2025-10-08. En bild av ett vapen är inte automatiskt liktydig med användning av vapen enligt gradindelningen.',
  sourceURL:SOURCE,
  lawSourceURL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/',
  kind:'praxisgrundat-typexempel',
  status:'cited-supreme-court-example',
  typecaseReviewed:'2026-10-17'
 };
 const existing=Array.isArray(c.typexempel15)?c.typexempel15:[];
 if(existing.some(x=>String(x.sourceURL||'')===SOURCE||String(x.source||'').includes('B 2105-25'))){stats.duplicates++;}
 else {c.typexempel15=[...existing,item];stats.added++;}
 if(c.rekvisit15){
  const extra=' HD NJA 2025 s. 992 (Vapenbilden): En bild av ett vapen utlöser inte automatiskt kvalifikationsgrunden om att hotet har förstärkts med hjälp av ett vapen. Den konkreta helhetsbedömningen kan ändå göra brottet grovt. Rättsfall: '+SOURCE;
  if(!String(c.rekvisit15.note||'').includes('NJA 2025 s. 992'))c.rekvisit15.note=String(c.rekvisit15.note||'')+extra;
  c.rekvisit15.legalReviewApproved=false;
 }
}
window.BK_HD_PREJUDIKAT15=stats;
})();