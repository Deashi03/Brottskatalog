/* Brottskatalog QA: officiella lagkällor för äldre specialstraffrättsliga sökposter. */
(()=>{'use strict';
const D=window.BK_DATA;if(!D)return;
const links={
 nark:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/',
 vapen:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/',
 trafik:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/',
 kniv:'https://data.riksdagen.se/dokument/sfs-1988-254.html'
};
let assigned=0;
for(const c of D.crimes){
 if(c.stageType||c.sourceURL)continue;
 const ref=String(c.shortRef||c.ref||'');
 const isNark=/^(NSL|Nark)/i.test(ref)||/narkotikastrafflag/i.test(ref);
 const isVapen=/^VapenL/i.test(ref)||/vapenlagen/i.test(ref);
 const isTrafik=/^(TBL|TrBL|Trafikbrottslagen)/i.test(ref)||/1951:649/i.test(ref);
 const isKnife=/^(KnivL|Kniv)/i.test(ref)||/1988:254/i.test(ref);
 const url=isNark?links.nark:isVapen?links.vapen:isTrafik?links.trafik:isKnife?links.kniv:null;
 if(url){c.sourceURL=url;assigned++;}
}
window.BK_QA_SOURCES={assigned,links};
})();