/* BrB 14:10, 14:12, 14:13 (2026-10-18).
 * Correct the OFFENCE-NAME mismatch in 0.8 stage-generation:
 * law says "brukande av vad som förfalskats" but the searchable card is
 * "Brukande av det förfalskade". Only non-ringa stages qualify under
 * the final sentence of 14:13. 14:7 attempt is limited to acquisition
 * and receipt. The penalty for 14:10 is derivative, so no single safe
 * numeric stage range or custody power may be inferred. This component
 * can narrow claims; it can never grant criminalization or coercion.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const sourceValid=(key,required)=>{const p=W[key];return Boolean(p?.complete&&
 p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 ['2026-10-17','2026-10-18'].includes(p.checked)&&p.url===SOURCE&&
 required.every(s=>p.text.includes(s)));};
const statuteOK=sourceValid('BrB:14:10',['brukande av det förfalskade','som om han eller hon själv hade gjort förfalskningen'])&&
 sourceValid('BrB:14:12',['frivilligt och innan avsevärd olägenhet','fara i bevishänseende'])&&
 sourceValid('BrB:14:13',['brukande av vad som förfalskats','försök till anskaffande eller mottagande','ha varit att anse som ringa']);
const base=D.crimes.filter(c=>!c.stageType),stages=D.crimes.filter(c=>c.stageType);
const specs=[
 {title:'Brukande av det förfalskade',law:'BrB:14:10',allowed:['forsok','forberedelse'],
  qualifier:'Straffbarhet enligt BrB 14:13 kan gälla FÖRSÖK eller FÖRBEREDELSE till brukande av det förfalskade, men endast om det fullbordade brottet inte skulle ha varit ringa. Straffskalan beror på VILKEN förfalskning och grad som konkret åberopats; den är inte ett fast intervall för alla urkunder eller andra förfalskade föremål.'},
 {title:'Olovlig befattning med falska pengar',law:'BrB:14:7',allowed:['forsok'],
  qualifier:'BrB 14:13 omfattar FÖRSÖK till olovlig befattning med falska pengar ENDAST när försöket består i att ANSKAFFA eller TA EMOT de förfalskade pengarna. Att endast försöka förvara, transportera eller lämna ut falska pengar omfattas inte automatiskt av detta särskilda försöksstadgande. Ringa gärning är undantagen.'}
];
const report={source:SOURCE,reviewed:'2026-10-18',sourceOK:statuteOK,planned:6,seen:0,
 correctedFalseNegative:0,conditionalRestricted:0,nonPunishableRetained:0,
 held:[],missing:[],unexpected:[],newLegalApprovals:0,
 numericDerivativeApprovals:0,coerciveApprovals:0};
for(const spec of specs){
 const parent=base.find(c=>c.title===spec.title&&c.statute===spec.law);
 if(!parent){report.missing.push(spec.title);continue;}
 // The generic generator skips derivative-penalty base cards with no fixed
 // numeric range. Create the THREE structurally valid catalogue entries
 // directly with unknown custody/range: never manufacture a number merely
 // to force 0.8's generator to include a source-authorized stage.
 if(spec.law==='BrB:14:10'&&statuteOK){
  for(const [kind,prefix,ref23] of [
   ['forsok','Försök till','23:1'],
   ['forberedelse','Förberedelse till','23:2'],
   ['stampling','Stämpling till','23:2']
  ]){
   if(D.crimes.some(x=>x.stageType===kind&&x.stageParentId===parent.id))continue;
   const allowed=spec.allowed.includes(kind);
   D.crimes.push({
    id:'stadium-08-'+kind+'-'+parent.id,
    title:prefix+' '+parent.title.toLocaleLowerCase('sv'),
    ref:(parent.ref||'BrB 14:10')+'; BrB 14:13; BrB '+ref23,
    shortRef:(parent.shortRef||'BrB 14:10')+' · '+ref23,
    statute:parent.statute,sourceURL:SOURCE,
    category:parent.category,aliases:[kind+' '+parent.title],
    stageType:kind,stageParentId:parent.id,stageSource:'BrB 14:13',
    stageStatus:allowed?'punishable':'not-criminalized',
    stageReviewDate:'2026-10-18',
    stageReviewBasis:'BrB 14:10 och 14:13 – uttryckligt försök/förberedelse men ingen stämpling',
    penaltyRange:null,penalty:'Straffskalan kräver val av konkret förfalskning och grad',
    penaltyShort:allowed?'Villkorad skala':'Ej straffbart',
    penaltyChecked:'2026-10-18',custody:'unknown',
    prosecution:'unknown',prosecutionLabel:'Åtalsregler måste kontrolleras',
    prosecutionDetails:['Pröva lagstöd, ringa-undantag och tillämpliga åtalsvillkor.'],
    law:allowed?'Straffbarhet för '+kind+' beror på BrB 14:10 och 14:13.':'BrB 14:13 föreskriver inte stämpling för detta brott.',
    lawSource:'BrB 14:13 och '+ref23,lawMode:'stage-reference',
    stageLawNotice:true,reviewStatus:'stage-statute-reviewed',
    elements:[],facts:[],stages:[],related:[parent.id],variants:[],lawTerms:[],
    penaltyNote:spec.qualifier,stageExplanation:spec.qualifier,
    stagePenaltyLower:null,stagePenaltyUpper:null
   });
   report.created=(report.created||0)+1;
  }
 }
 const related=D.crimes.filter(c=>c.stageType&&c.stageParentId===parent.id);
 for(const kind of ['forsok','forberedelse','stampling']){
  const c=related.find(x=>x.stageType===kind);
  if(!c){report.missing.push(kind+' till '+spec.title);continue;}
  report.seen++;
  if(!statuteOK){report.held.push(c.title);continue;}
  const allowed=spec.allowed.includes(kind);
  const expected=allowed?'punishable':'not-criminalized';
  if(c.stageStatus!==expected){
   report.unexpected.push({title:c.title,status:c.stageStatus,expected});
   // Never convert a negative into a positive in a postprocessor.
   continue;
  }
  c.forgeryStageScope15={
   source:'BrB 14:10, 14:12 och 14:13',sourceURL:SOURCE,
   reviewed:'2026-10-18',kind,enumeratedStatutoryRouteOnly:true,
   statutoryRingaExclusion:true,
   underlingForgeryGradeMustBeEstablished:spec.law==='BrB:14:10',
   limitedToAcquisitionOrReceipt:spec.law==='BrB:14:7',
   finalCriminalityApproved:false,caseSpecificCustodyApproved:false,
   description:spec.qualifier
  };
  const warning=' Individuell avgränsning BrB 14:13: '+spec.qualifier+
   ' BrB 14:12 har dessutom en SÄRSKILD möjlighet till strafflindring eller i snäva fall ansvarsfrihet om fara i bevishänseende frivilligt avvärjs innan avsevärd olägenhet; det är inte automatiskt tillämpligt.';
  if(!String(c.stageExplanation||'').includes('Individuell avgränsning BrB 14:13'))c.stageExplanation=(c.stageExplanation||'')+warning;
  if(allowed){
   // Even though the statutory STAGE type is covered, its concrete factual
   // route, the non-ringa requirement and any derived penalty are not decided.
   c.custody='unknown';
   c.penaltyRange=null;
   c.penalty='Straffskala kräver individuell prövning av BrB 14:13 och fullbordat brott';
   c.penaltyShort='Villkorad skala';
   c.penaltyNote=spec.qualifier;
   c.stagePenaltyLower=null;
   c.stagePenaltyUpper=null;
   c.prosecution='unknown';
   c.prosecutionLabel='Åtalsvillkor måste prövas';
   report.conditionalRestricted++;
   if(spec.law==='BrB:14:10')report.correctedFalseNegative++;
  }else report.nonPunishableRetained++;
 }
}
window.BK_BRB14_STAGE_SCOPE15=report;
})();