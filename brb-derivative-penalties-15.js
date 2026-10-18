/* V1.5: derivative penalty reference treatment; no numeric grade or coercion approval.
 * Compared to Riksdagen SFS BrB 3:10 and 14:10 on 2026-10-18.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const official='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const cases=[
 {title:'Arbetsmiljöbrott',ref:'BrB:3:10',expected:'straff som i nämnda lagrum sägs',
  dependencies:['BrB:3:7','BrB:3:8','BrB:3:9'],
  rule:'Straffskalan är samma som för den tillämpliga gärningen enligt BrB 3:7, 3:8 eller 3:9. Fastställ först grundbrott, oaktsamhetsgrad och eventuell grov grad. Därefter kan brottets straffskala och tvångsmedel prövas separat.'},
 {title:'Brukande av det förfalskade',ref:'BrB:14:10',expected:'som om han eller hon själv hade gjort förfalskningen',
  dependencies:['BrB:14:1','BrB:14:2','BrB:14:3','BrB:14:5','BrB:14:6','BrB:14:7','BrB:14:8','BrB:14:9'],
  rule:'Straffet följer den förfalskning som objektet och gärningen konkret motsvarar. Ingen enhetlig skala gäller för alla urkunder, pengar, signaturer eller märken. Välj tillämplig förfalskningsbestämmelse och grad före häktnings- och tvångsmedelsbedömning.'}
];
const base=D.crimes.filter(c=>!c.stageType);
const report={planned:cases.length,classified:0,held:[],checks:[],source:official,checked:'2026-10-18',numericApprovals:0};
for(const cfg of cases){
 const c=base.find(x=>x.title===cfg.title),p=W[cfg.ref];
 if(!c||!p?.complete||p.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'||!p.text.includes(cfg.expected)||!c.lawCompletenessVerified){
  report.held.push(cfg.title);continue;
 }
 if(c.penaltyRangeVerified||c.penaltyGradeReviewDate){report.held.push(cfg.title+' (unexpected numeric signoff)');continue;}
 if(!cfg.dependencies.every(ref=>W[ref]?.text)){report.held.push(cfg.title+' (missing dependent text)');continue;}
 c.conditionalPenalty=true;
 c.penaltyRangeVerified=false;
 c.penaltyReviewScope='derivative-sfs-reference-conditional';
 c.penaltyDerivation15={kind:'statutory-cross-reference',source:cfg.ref,dependsOn:cfg.dependencies.slice(),
  rule:cfg.rule,checked:'2026-10-18',sourceURL:official,numericRangeResolved:false,
  offenceDateRequired:true,judicialReviewPending:true,custodyApproved:false};
 c.penaltyNote=cfg.rule;
 c.penaltySpecificCaution=cfg.rule;
 c.penaltyChecked='2026-10-18';
 c.penaltyCrosscheckIssue=undefined;
 report.checks.push({title:c.title,ref:cfg.ref,dependentSources:cfg.dependencies.length,numericVerified:c.penaltyRangeVerified});
 report.classified++;
}
window.BK_DERIVATIVE_SCALES15=report;
})();