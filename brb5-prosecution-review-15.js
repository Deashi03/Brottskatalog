/* V1.5, BrB 5:5. A complete statutory prosecution source is required.
 * Private prosecution is the norm for ch.5 offences, but exceptions are
 * legally significant and cannot be generalized. Compare BrB 5:1–5
 * effective 2026-10-17. Offence-date and international exceptions pending.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const law=W['BrB:5:5'];
const report={reviewed:0,missing:[],hold:[],date:'2026-10-17',source:SRC,scope:'statutory-chapter5-prosecution-conditions-only'};
const verified=Boolean(law?.complete&&law?.checked==='2026-10-17'&&
 law?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 law?.text.includes('målsäganden')&&law?.text.includes('allmän synpunkt')&&law?.text.includes('avlidne'));
const rules=[
 ['Förtal','BrB:5:1','Ärekränkning – i första hand enskilt åtal',[
  'Huvudregel BrB 5:5: målsäganden väcker själv enskilt åtal. En sann uppgift är inte automatiskt ansvarsfri; skilj från försvarlighetsprövningen i 5:1.',
  'Åklagare får väcka allmänt åtal om målsäganden är under 18 år, eller annars har angett brottet till åtal, OCH åtal anses påkallat från allmän synpunkt.',
  'För förtal av avliden finns särskild talerätt för efterlevande och möjlighet till allmänt åtal av särskilda skäl. Särregler för utländskt statsöverhuvud/representant kräver särskilt förordnande.']],
 ['Grovt förtal','BrB:5:2','Ärekränkning – i första hand enskilt åtal',[
  'Huvudregel BrB 5:5: privat/enskilt åtal från målsäganden; brottets grova grad ger inte i sig ovillkorligt allmänt åtal.',
  'Åklagare får väcka åtal när målsäganden är under 18 år eller en vuxen målsägande angett brottet till åtal, OCH åtalet är påkallat från allmän synpunkt.',
  'Särskilda regler gäller för förtal av avliden respektive vissa utländska dignitärer; pröva dessa separat.']],
 ['Förolämpning','BrB:5:3','Ärekränkning – begränsat allmänt åtal',[
  'Huvudregel BrB 5:5: målsäganden får själv väcka enskilt åtal.',
  'Åklagare får väcka åtal först när personen är under 18 år eller en vuxen har angett brottet, OCH allmän synpunkt talar för åtal, OCH förolämpningen avser någon i/för myndighetsutövning eller anknyter till de skyddade diskrimineringsgrunderna i BrB 5:5 första stycket 2–3.',
  'För angrepp mot tjänsteman ska även BrB 17:3:s särskilda brott förolämpning mot tjänsteman bedömas självständigt, inte sammanblandas med BrB 5:3.',
  'Undantag för främmande makts statsöverhuvud eller representant kan aktualisera regeringens förordnande.']]
];
for(const [title,ref,label,details] of rules){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title);
 if(!c){report.missing.push(title);continue;}
 if(c.statute!==ref||!verified){report.hold.push({title,statute:c.statute,reason:!verified?'source-5:5-not-current-complete':'offence-section-mismatch'});continue;}
 c.prosecution='conditional';
 c.prosecutionLabel=label;
 c.prosecutionRule='BrB 5:5 jämförd med BrB '+ref.slice(4).replace(':',':')+'; RB 20:3';
 c.prosecutionDetails=details;
 c.prosecutionSource=c.prosecutionRule;
 c.prosecutionSourceURL=SRC;
 c.prosecutionChecked='2026-10-17';
 c.prosecutionReviewStatus='statute-prosecution-5:5-individual-source-checked';
 c.prosecutionRuleScope='source-checked-chapter5-special-prosecution, no historical/date/case approval';
 report.reviewed++;
}
window.BK_BRB5_PROSECUTION15=report;
})();