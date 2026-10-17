/* BrB 12:6, individual statutory prosecution rule: only if the
 * offence infringes PRIVATE rights alone does the extra public-interest
 * plus special-reasons condition apply. Otherwise retain general charging.
 * Source: current BrB 12:6 SFS 1962:700, 2026-10-17.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;
if(!D?.crimes||!W)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const cases=[
 ['Ringa skadegörelse','BrB:12:2'],
 ['Åverkan','BrB:12:2a'],
 ['Tagande av olovlig väg','BrB:12:4']
];
const statute=W['BrB:12:6'];
const authorized=Boolean(statute?.complete&&
 statute.checked==='2026-10-17'&&
 statute.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 statute.text.includes('endast kränker enskilds rätt')&&
 statute.text.includes('särskilda skäl')&&
 statute.text.includes('från allmän synpunkt'));
const report={reviewed:0,held:[],missing:[],source:SOURCE,provision:'BrB 12:6',date:'2026-10-17',stageEntriesModified:0};
for(const [title,ref] of cases){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title);
 if(!c){report.missing.push(title);continue;}
 const own=W[ref],ownCurrent=own?.checked==='2026-10-17'&&
 own?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only';
 if(!authorized||!ownCurrent||c.statute!==ref){
  report.held.push({title,reason:!authorized?'source-12:6-not-verified':!ownCurrent?'offence-source-not-verified':'wrong-statute'});
  continue;
 }
 c.prosecution='conditional';
 c.prosecutionLabel='Endast enskild rätt: särskilda skäl + allmän synpunkt';
 c.prosecutionRule='BrB 12:6; RB 20:3';
 c.prosecutionDetails=[
  'Allmänt åtal enligt RB 20:3 är utgångspunkten. BrB 12:6 innehåller ett extra åtalsvillkor endast när brottet enbart kränker enskilds rätt.',
  'I det fallet får åklagare väcka åtal endast om åtal av särskilda skäl är motiverat från allmän synpunkt. Båda delarna måste prövas konkret.',
  'Om gärningen också kränker ett allmänt intresse kan denna särskilda begränsning inte tillämpas automatiskt. Bedöm tillämplig lagversion vid gärningstillfället.'
 ];
 c.prosecutionSource=c.prosecutionRule;
 c.prosecutionSourceURL=SOURCE;
 c.prosecutionChecked='2026-10-17';
 c.prosecutionReviewStatus='section-12:6-private-right-condition-statute-checked';
 c.prosecutionRuleScope='current-section-specific: factual private/public right and offence date unverified';
 report.reviewed++;
}
window.BK_BRB12_PROSECUTION15=report;
})();