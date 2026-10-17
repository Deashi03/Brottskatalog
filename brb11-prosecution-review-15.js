/* V1.5 — Individual statutory prosecution exceptions under BrB 11:8.
 * Do not apply the bokföringsbrott exception to non-ringa / gross forms.
 * SFS source cross-check covers text, not any particular incident facts.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rule=W['BrB:11:8'];
const sourceVerified=Boolean(rule?.complete&&rule?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 rule?.checked==='2026-10-17'&&rule.text.includes('Vårdslöshet mot borgenärer får åtalas')&&
 rule.text.includes('Bokföringsbrott som är ringa får åtalas')&&rule.text.includes('av särskilda skäl'));
const report={source:SRC,date:'2026-10-17',reviewed:0,held:[],normalGradesKept:0,sourceVerified,chapter:'BrB 11:8'};
for(const c of D.crimes){
 if(c.stageType)continue;
 const carelessness=c.statute==='BrB:11:3'&&c.title==='Vårdslöshet mot borgenärer';
 const ringa=c.statute==='BrB:11:5'&&/\bringa\b/i.test(c.title);
 const bookOther=c.statute==='BrB:11:5'&&!ringa;
 if(bookOther){report.normalGradesKept++;continue;}
 if(!carelessness&&!ringa)continue;
 const own=W[c.statute];
 if(!sourceVerified||own?.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'||own?.checked!=='2026-10-17'){
  report.held.push({title:c.title,reason:'statutory-text-not-directly-reviewed'});continue;
 }
 c.prosecution='conditional';
 c.prosecutionLabel=carelessness?'Särskild åtalsprövning – allmän synpunkt':'Särskild åtalsprövning – särskilda skäl';
 c.prosecutionRule='BrB 11:8; RB 20:3';
 c.prosecutionDetails=carelessness?[
  'Vårdslöshet mot borgenärer får enligt BrB 11:8 första stycket åtalas av åklagare endast om åtal är påkallat från allmän synpunkt.',
  'Pröva de aktuella omständigheterna. Enbart brottsrubriceringen eller straffskalan ger inte ett automatiskt åtalsbeslut.'
 ]:[
  'Ringa bokföringsbrott får enligt BrB 11:8 andra stycket åtalas av åklagare endast om åtal av särskilda skäl är påkallat från allmän synpunkt.',
  'Detta villkor avser endast ringa bokföringsbrott, inte normalt eller grovt bokföringsbrott. Kontrollera också undantaget i BrB 11:5 för vissa icke-näringsdrivande juridiska personer.'
 ];
 c.prosecutionChecked='2026-10-17';c.prosecutionSourceURL=SRC;
 c.prosecutionReviewStatus='current-section11:8-individual-source-conditional';
 c.prosecutionScopeReviewed='section11:8-prosecution-rule-only-factual-applicability-not-certified';
 report.reviewed++;
}
window.BK_BRB11_PROSECUTION15=report;
})();