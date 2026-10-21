/* V1.5 – four accusation offences: primary statute plus Prop. 2021/22:186
 * pp. 72–75 (section 7). Interpretive notes only; no automatic legal signoff.
 * This supplementary source distinguishes actual innocence, prosecution
 * requests, positive denial versus silence and subjective fault states.
 * SFS wording as at 2026-10-18 must remain individually certified.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const LAW='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const PROP='https://data.riksdagen.se/fil/0C7F6285-D67F-423E-9EB8-EB9DC2B43339';
const notes=[
 {title:'Falsk angivelse',ref:'BrB:15:6',must:['anger en oskyldig till åtal','uppsåt','skälig anledning att anta'],note:
 'En angivelse enligt BrB 15:6 är en anmälan till en mottagare som får ta upp brottsanmälningar, med utpekande av att annan begått brott. Den utpekade måste faktiskt vara oskyldig till gärningen. Nedlagd förundersökning, preskription eller otillräcklig bevisning visar inte i sig oskuld. Falsk angivelse kräver dessutom det särskilda uppsåtet att den oskyldiga ska dömas till ansvar. Skilj från att själv väcka åtal enligt BrB 15:5.'},
 {title:'Obefogad angivelse',ref:'BrB:15:6',must:['inte insåg','skälig anledning att anta','oskyldig'],note:
 'Samma grundkrav på en angivelse och på den utpekades faktiska oskuld gäller som för falsk angivelse. För obefogad angivelse insåg gärningspersonen inte att den andre var oskyldig men hade skälig anledning att anta det. Bristande bevisning mot en person är inte automatiskt bevisning om personens oskuld eller anmälarens skuldform.'},
 {title:'Falsk beskyllning',ref:'BrB:15:7',must:['i annat fall än som avses i 6 §','besvärande omständighet','förnekar en friande'],note:
 'BrB 15:7 gäller i andra fall än angivelse enligt 15:6. Det krävs inte att någon begär åtal och inte heller alltid att den utpekade är helt oskyldig till brott. Ett medvetet osant utpekande, en osann besvärande uppgift eller ett uttryckligt förnekande av en friande eller mildrande omständighet kan omfattas, om uppgiften lämnas till rätt myndighet. Ren tystnad om en friande omständighet är inte detsamma som att uttryckligen förneka den. Situationen för en redan misstänkt person och rätten att inte belasta sig själv kräver självständig rättslig prövning.'},
 {title:'Vårdslös beskyllning',ref:'BrB:15:7',must:['inte insåg','skälig anledning att anta','utsagan var osann'],note:
 'Gärningsformen och myndighetskraven följer BrB 15:7, men gärningspersonen insåg inte att utsagan var osann och hade skälig anledning att anta detta. Skilj från uppsåtlig falsk beskyllning, enbart obestyrkta misstankar och från att någon endast underlåter att lämna en friande uppgift. Beakta även den misstänktes processuella rättigheter.'}
];
const report={planned:notes.length,annotated:0,held:[],statuteSource:LAW,preparatorySource:PROP,
 reviewed:'2026-10-18',caseFactsResolved:0,fullLegalSignoffs:0,penaltyChanges:0,stageChanges:0,custodyApprovals:0};
for(const r of notes){
 const p=W[r.ref],c=D.crimes.find(x=>!x.stageType&&x.title===r.title&&x.statute===r.ref);
 if(!c||!p?.complete||p.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'
   ||!['2026-10-17','2026-10-18'].includes(p.checked)||p.url!==LAW
   ||r.must.some(s=>!String(p.text||'').includes(s))
   ||c.lawCompletenessVerified!==true||!c.rekvisit15
   ||c.rekvisit15.legalReviewApproved===true){report.held.push(r.title);continue;}
 c.accusationLimits15={sourceRef:r.ref,sourceURL:LAW,preparatoryWorks:PROP,
  preparatorySection:'Prop. 2021/22:186 avsnitt 7, särskilt s. 72–75',
  checked:p.checked,scope:'statute-and-preparatory-scope-only',note:r.note,
  finalLegalReviewApproved:false,offenceGradeApproved:false,
  automaticCustodyDecisionAllowed:false,noInchoateConclusion:true};
 const prefix='Förarbetsstöd (prop. 2021/22:186): ';
 if(!String(c.rekvisit15.note||'').includes(prefix))
  c.rekvisit15.note=String(c.rekvisit15.note||'')+' '+prefix+r.note+
   ' Läs: '+PROP+' (avsnitt 7). Detta ersätter inte juridisk individuell bedömning.';
 report.annotated++;
}
window.BK_BRB15_ACCUSATION_LIMITS15=report;
})();