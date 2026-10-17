/* V1.5: BrB 4:11, differentiated public-prosecution restrictions.
 * Matching normal-grade completed offences only; no approval for
 * aggravated grades or generated inchoate stages via family inheritance.
 * For ofredande and olovlig avlyssning the public-place distinction is
 * a material factual condition and NOT a categorical no-prosecution rule.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const law=W['BrB:4:11'];
const report={planned:8,reviewed:0,held:[],missing:[],notExtendedToGross:true,stageEntriesModified:0,source:SRC,date:'2026-10-17'};
const current=Boolean(law?.complete&&law?.checked==='2026-10-17'&&
 law.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 law.text.includes('målsäganden anger brottet till åtal')&&
 law.text.includes('ofredande som inte förövats på allmän plats')&&
 law.text.includes('olovlig avlyssning som inte förövats på allmän plats'));
const names=[
 ['Hemfridsbrott','BrB:4:6',false],
 ['Olaga intrång','BrB:4:6',false],
 ['Kränkande fotografering','BrB:4:6a',false],
 ['Olovlig identitetsanvändning','BrB:4:6b',false],
 ['Olaga integritetsintrång','BrB:4:6c',false],
 ['Ofredande','BrB:4:7',true],
 ['Intrång i förvar','BrB:4:9',false],
 ['Olovlig avlyssning','BrB:4:9a',true]
];
for(const [title,ref,placeRestricted] of names){
 const c=D.crimes.find(c=>!c.stageType&&c.title===title);
 if(!c){report.missing.push(title);continue;}
 const source=W[ref];
 const own=Boolean(source?.complete&&source.checked==='2026-10-17'&&
 source.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only');
 if(!current||!own||c.statute!==ref){
  report.held.push({title,ref,reason:!current?'chapter4-prosecution-source-unverified':!own?'underlying-statute-not-reviewed':'offence-reference-mismatch'});
  continue;
 }
 c.prosecution='conditional';
 c.prosecutionLabel=placeRestricted
  ?'BrB 4:11 – särskilt åtalsvillkor utanför allmän plats'
  :'BrB 4:11 – angivelse eller allmän synpunkt';
 c.prosecutionRule='BrB 4:11 första stycket; RB 20:3';
 c.prosecutionDetails=[
  placeRestricted
   ?'Om brottet INTE förövats på allmän plats gäller BrB 4:11:s särskilda åtalsvillkor. Gäller det en allmän plats ska åtal bedömas enligt huvudregeln och övrig tillämplig lag; brottskortet avgör inte platsfrågan.'
   :'BrB 4:11 uppställer för denna brottsrubricering ett särskilt åtalsvillkor. Åklagare får åtala endast om målsäganden anger brottet till åtal ELLER om åtal är påkallat från allmän synpunkt.',
  placeRestricted
   ?'När särskilda villkoret gäller krävs målsägandens angivelse ELLER att åtal är påkallat från allmän synpunkt.'
   :'De alternativa grunderna är målsägandens angivelse respektive allmän synpunkt. Det krävs inte båda samtidigt.',
  'Bedöm gärningsdatum, konkret brottsform och andra undantag separat. Regeln medför ingen automatisk bedömning av rekvisit, straffbarhet för förstadier eller tvångsmedel.'
 ];
 c.prosecutionSource=c.prosecutionRule;
 c.prosecutionSourceURL=SRC;
 c.prosecutionChecked='2026-10-17';
 c.prosecutionReviewStatus='statute-4:11-special-prosecution-current-conditional';
 c.prosecutionRuleScope=placeRestricted?'conditional-if-not-public-place':'current-current-offence-only';
 report.reviewed++;
}
window.BK_BRB4_PROSECUTION15=report;
})();