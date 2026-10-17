/* V1.5: BrB 10:10 third paragraph and 20:5 special public-office exception.
 * All these crimes have conditional prosecutorial filters; do not silently
 * treat them as unconditional general-prosecution cases. Even where BrB
 * 20:5 may apply, facts of employment/duties must be established.
 * Gross offences in BrB 10:5c need separate jurisprudential scope review.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const cases=[
 ['Tagande av muta','BrB:10:5a'],
 ['Givande av muta','BrB:10:5b'],
 ['Handel med inflytande','BrB:10:5d'],
 ['Vårdslös finansiering av mutbrott','BrB:10:5e']
];
const P=W['BrB:10:10'],O=W['BrB:20:5'];
const hasSource=p=>Boolean(p?.complete===true&&p?.checked==='2026-10-17'&&p?.url===SRC&&
 p?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only');
const bothCurrent=hasSource(P)&&hasSource(O)&&
 P.text.includes('Tagande av muta, givande av muta, handel med inflytande och vårdslös finansiering av mutbrott')&&
 P.text.includes('20 kap. 5 §')&&O.text.includes('arbetstagare hos staten eller en kommun')&&
 O.text.includes('Utan hinder av bestämmelserna i första stycket');
const report={planned:cases.length,reviewed:0,held:[],missing:[],source:SRC,date:'2026-10-17',
 scope:'individual-statute-10:10-and-20:5-prosecution-filter, factual applicability unresolved'};
for(const [title,ref] of cases){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title);
 if(!c){report.missing.push(title);continue;}
 if(c.statute!==ref||!bothCurrent){
  report.held.push({title,reason:c.statute!==ref?'offence-section-mismatch':'source-not-completely-current'});
  continue;
 }
 c.prosecution='conditional';
 c.prosecutionLabel='Allmän synpunkt – kontrollera undantag för offentlig tjänst';
 c.prosecutionRule='BrB 10:10 tredje stycket; BrB 20:5; RB 20:3';
 c.prosecutionDetails=[
  'Enligt BrB 10:10 tredje stycket får åklagare normalt väcka åtal för denna gärning endast om åtal är motiverat från allmän synpunkt.',
  'BrB 20:5 första stycket kan undanröja begränsningen för vissa offentliga anställda, uppdragstagare och myndighetsutövare som åsidosatt skyldigheter i tjänsten eller uppdraget. Pröva personens faktiska ställning, uppgifter och kopplingen till gärningen.',
  '20:5 har dessutom undantag för åtalsförordnanden och särskilda bestämmelser i annan författning. Gör aldrig bedömningen enbart från brottsrubriceringen eller straffskalan.',
  'Om brottet gäller en grov mutbrottsrubricering enligt BrB 10:5 c krävs särskild kontroll av åtalsreglernas omfattning för den grova graden.'
 ];
 c.prosecutionSource=c.prosecutionRule;
 c.prosecutionSourceURL=SRC;
 c.prosecutionChecked='2026-10-17';
 c.prosecutionReviewStatus='section10:10-20:5-individual-statute-conditional';
 c.prosecutionScopeReviewed='current-paragraph-condition-only; factual and degree cases require separate review';
 report.reviewed++;
}
window.BK_BRB10_PROSECUTION15=report;
})();