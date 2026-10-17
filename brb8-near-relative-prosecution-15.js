/* V1.5 source check: BrB 8:13 near-relative offence prosecution filter.
 * The text excludes grov stöld, inbrottsstöld, rån and grovt rån;
 * last sentence expressly extends the rule to häleri/häleriförseelse.
 * Not extended by conjecture to utförselhäleri (9:6a).
 * Only named source-checked completed offences, never inchoate stages.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const covered8=/^BrB:8:/,excluded=new Set(['BrB:8:4','BrB:8:4a','BrB:8:5','BrB:8:6']);
const q=W['BrB:8:13'];
const current=Boolean(q?.complete===true&&q?.checked==='2026-10-17'&&
 q?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 q?.text.includes('annat i detta kapitel angivet brott än grov stöld, inbrottsstöld, rån eller grovt rån')&&
 q?.text.includes('häleri eller häleriförseelse')&&
 q?.text.includes('målsäganden har angett brottet till åtal'));
const report={scoped:0,excluded:0,held:[],source:SRC,date:'2026-10-17',stageEntriesModified:0};
for(const c of D.crimes){
 if(c.stageType)continue;
 const key=c.statute||'',family=covered8.test(key);
 const special=key==='BrB:9:6'||key==='BrB:9:7';
 if(!family&&!special)continue;
 if(family&&excluded.has(key)){report.excluded++;continue;}
 // A compound card may refer to a different provision and must not be
 // certified without a full documented direct paragraph check.
 const own=W[key],reliable=own?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 own?.checked==='2026-10-17';
 if(!current||!reliable){report.held.push({title:c.title,key,reason:!current?'special-prosecution-source-unverified':'offence-law-source-not-fully-reviewed'});continue;}
 c.prosecution='conditional';
 c.prosecutionLabel='Närståendebrott – kontrollera angivelse/allmän synpunkt';
 c.prosecutionRule='BrB 8:13; RB 20:3'+(special?'; hänvisning häleri/häleriförseelse i BrB 8:13':'');
 c.prosecutionDetails=[
  'Allmänt åtal är huvudregeln för denna brottsrubricering. Om brottet förövats mot person i den särskilt angivna närståendekretsen i BrB 8:13 gäller dock särskilt åtalsvillkor.',
  'För närståendegärning får åklagare väcka åtal endast om målsäganden angett brottet till åtal ELLER åtal är påkallat ur allmän synpunkt. Pröva faktisk familjerelation/samboende och gärningsdatum i varje ärende.',
  ...(special?['Sista meningen i BrB 8:13 likställer vid åtalsprövningen även gärningsperson för häleri/häleriförseelse. Utförselhäleri enligt 9:6 a har inte automatiskt inkluderats.']:['BrB 8:13 undantar uttryckligen grov stöld, inbrottsstöld, rån och grovt rån. Dessa behåller sin ordinarie åtalsbedömning.'])
 ];
 c.prosecutionChecked='2026-10-17';c.prosecutionSourceURL=SRC;
 c.prosecutionReviewStatus='statute-8:13-near-relative-condition-source-checked';
 c.prosecutionScopeReviewed='conditional-if-near-relative; no factual or historical approval';
 report.scoped++;
}
window.BK_BRB8_PROSECUTION15=report;
})();