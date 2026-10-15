/* Brottskatalog 1.4: source-matched SPECIAL penalty scales, not new interpretations.
 * Compared against Swedish Parliament consolidated SFS on 2026-10-15:
 * NSL 1968:64 (1–3 §§), Vapenlag 2026:408 (18:1–2),
 * TBL 1951:649 (3–4 a §§), Knivlag 1988:254 (4 §).
 * Never overwrite disagreeing data or claim that a machine-imported entire legal
 * text is verified. Check exact offence and grade; record penalty range only.
 */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const refs={
  NSL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/',
  VapenL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/',
  TBL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/',
  KnivL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/'
 };
 // title, family, precise primary source, min years, max years, fines.
 const cases=[
  ['Narkotikabrott · innehav','NSL','1 § första stycket 5',0,3,false],
  ['Ringa narkotikabrott · bruk','NSL','2 § jämförd med 1 §',0,.5,true],
  ['Narkotikabrott · överlåtelse','NSL','1 § första stycket 1',0,3,false],
  ['Narkotikabrott · framställning','NSL','1 § första stycket 2',0,3,false],
  ['Narkotikabrott · förvärv i överlåtelsesyfte','NSL','1 § första stycket 3',0,3,false],
  ['Narkotikabrott · transport/förvaring','NSL','1 § första stycket 4',0,3,false],
  ['Narkotikabrott · försäljning','NSL','1 § andra stycket',.5,3,false],
  ['Narkotikabrott · främjande av handel','NSL','1 § tredje stycket',.5,3,false],
  ['Ringa narkotikabrott · innehav','NSL','2 § jämförd med 1 §',0,.5,true],
  ['Grovt narkotikabrott','NSL','3 § första stycket',2,7,false],
  ['Synnerligen grovt narkotikabrott','NSL','3 § andra stycket',6,10,false],
  ['Vapenbrott','VapenL','18 kap. 1 § första stycket',0,5,false],
  ['Mindre allvarligt vapenbrott','VapenL','18 kap. 1 § andra stycket',0,.5,true],
  ['Vapenbrott av oaktsamhet','VapenL','18 kap. 1 § tredje stycket',0,.5,true],
  ['Grovt vapenbrott','VapenL','18 kap. 2 § första stycket',4,7,false],
  ['Synnerligen grovt vapenbrott','VapenL','18 kap. 2 § andra stycket',6,10,false],
  ['Rattfylleri','TBL','4 §',0,.5,true],
  ['Grovt rattfylleri','TBL','4 a §',0,2,false],
  ['Olovlig körning','TBL','3 § första stycket – normalgrad',0,0,true],
  ['Grov olovlig körning','TBL','3 § första stycket – grov',0,.5,true],
  ['Brott mot knivlagen','KnivL','4 § första stycket',0,1,true],
  ['Grovt brott mot knivlagen','KnivL','4 § tredje stycket',.5,2,false]
 ];
 const byName=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title.toLocaleLowerCase('sv'),c]));
 let reviewed=0;
 const missing=[],mismatches=[],held=[];
 for(const [title,family,section,min,max,fines] of cases){
  const c=byName.get(title.toLocaleLowerCase('sv'));
  if(!c){missing.push(title);continue;}
  const range=c.penaltyRange;
  const agrees=!!range&&Number.isFinite(range.min)&&Number.isFinite(range.max)
   &&Math.abs(range.min-min)<1e-8&&Math.abs(range.max-max)<1e-8
   &&!!range.fines===fines&&!range.life;
  if(!agrees){
   const issue={title,expected:{min,max,fines,life:false},actual:range||null,source:family+' '+section};
   mismatches.push(issue);c.penaltyCrosscheckIssue=issue;c.penaltyRangeVerified=false;
   c.reviewStatus='penalty-crosscheck-pending';continue;
  }
  if(c.reviewStatus==='source-changed'){held.push(title);continue;}
  c.penaltyChecked='2026-10-15';
  c.penaltySource=family+' '+section+' – numeriskt straffskaleintervall jämfört med konsoliderad SFS 2026-10-15';
  c.penaltyRangeVerified=true;c.penaltyReviewScope='range-only';
  c.reviewStatus='penalty-reviewed-source-excerpt';
  c.sourceURL=c.sourceURL||refs[family];
  // The broad NSL first paragraph has a six-month minimum for a sales purpose.
  // Preserve the separate sales grade and do not suggest that the 0–3 interval
  // captures every factual variant of the same physical dealing.
  if(family==='NSL'&&/överlåtelse|transport\/förvaring|förvärv i överlåtelsesyfte/.test(title)){
   c.penaltySpecificCaution='Vid försäljning eller befattning med narkotika avsedd att säljas gäller enligt NSL 1 § andra stycket i stället fängelse i lägst sex månader och högst tre år. Kontrollera gärningsformen.';
  }
  reviewed++;
 }
 window.BK_SPECIAL_PENALTY14={planned:cases.length,reviewed,missing,mismatches,held,checked:'2026-10-15',scope:'penalty-range-only'};
})();