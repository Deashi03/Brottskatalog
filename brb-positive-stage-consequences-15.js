/* BrB 1.5: independently scoped consequence review of every already-confirmed
 * positive BrB inchoate listing. This is a NEGATIVE certification: the
 * chapter enumeration does not itself resolve the stage-specific sentence,
 * prosecution prerequisites, liability or police powers. Each card must
 * pass its own source, parent, stage and authorization checks.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;
const previous=window.BK_BRB_POSITIVE_STAGE_SOURCE_AUDIT15;
const chapterAudit=window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15;
if(!D?.crimes||!W||!previous||!chapterAudit)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const kinds={forsok:'F',forberedelse:'P',stampling:'S'};
const validSource=x=>Boolean(x?.complete===true&&x.url===SOURCE
 &&/^2026-10-(1[5-9])$/.test(x.checked||'')
 &&typeof x.text==='string'&&x.text.length>=45);
const report={planned:0,approved:0,held:[],byChapter:{},reviewed:'2026-10-19',
 scope:'named-stage-only-negative-automatic-consequence-review',
 automaticPenaltyApprovals:0,automaticProsecutionApprovals:0,
 automaticCoercionApprovals:0,finalLegalApprovals:0};
for(const c of D.crimes.filter(x=>x.stageType&&x.individualLegalAudit15?.scope?.finding==='CURRENT_BRB_CHAPTER_EXPLICIT_INCHOATE_LISTING')){
 const p=parents.get(c.stageParentId),ch=String(p?.statute||'').match(/^BrB:(\d+):/)?.[1],
 rule=chapterAudit.currentStatutoryStageManifest[ch],source=rule?.section&&W['BrB:'+rule.section],
 scope=c.individualLegalAudit15.scope,letter=kinds[c.stageType];
 report.planned++;const g=report.byChapter[ch]??={planned:0,approved:0,held:0};g.planned++;
 const valid=Boolean(p&&ch&&rule&&source&&chapterAudit.chapterReady[ch]===true
   &&validSource(source)&&validSource(W[p.statute])
   &&rule.allowed[p.title]?.includes(letter)
   &&scope.offenceStatute===p.statute
   &&scope.authorizingProvision==='BrB '+rule.section
   &&scope.namedStage===c.stageType
   &&scope.sourceURL===SOURCE&&scope.caseSpecificLiabilityApproved===false
   &&scope.historicApplicabilityApproved===false&&scope.coercionApproved===false
   &&c.stageStatus==='punishable'&&c.custody==='unknown'
   &&c.individualLegalAudit15.consequences===undefined);
 if(!valid){g.held++;report.held.push({id:c.id,chapter:ch,stage:c.stageType,sourceReady:validSource(source)});continue;}
 c.individualLegalAudit15.consequences={
  status:'APPROVED',checked:'2026-10-19',sourceURL:SOURCE,
  finding:'LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS',
  namedOffenceOnly:true,sourceProvision:'BrB '+rule.section,
  stageType:c.stageType,parentStatute:p.statute,
  automaticCoercionApproved:false,punishmentRangeApproved:false,
  prosecutionAuthorityApproved:false,custodyAuthorityApproved:false,
  individualLegalLiabilityApproved:false,caseSpecificSentenceApproved:false,
  historicLawApproved:false,specificPenaltyRange:null,
  question:'Ger denna uppräkning ensam en färdig straffskala, åtalsbedömning eller tvångsmedelsbefogenhet?',
  note:'Nej. BrB '+rule.section+' anger endast särskilt lagstöd för '+c.stageType+
   ' till '+p.title+'. Försök respektive förberedelse/stämpling prövas enligt olika rekvisit i 23 kap. BrB. Den konkreta straffskalan, gärningsdagens lag, skuldform, eventuella undantag, åtalsregler och tvångsmedelsvillkor har inte fastställts. Ingen automatisk numerisk straffskala eller tvångsmedelsbehörighet får härledas ur uppräkningen.'
 };
 c.stageConsequenceNote15='Uttryckligt förstadielagstöd är inte en färdig straffskala eller tvångsmedelsgrund. Pröva 23 kap. BrB, gärningsdag, aktuell brottsgrad och särskilda åtalsvillkor individuellt.';
 if(c.prosecution!=='conditional')c.prosecution='unknown';
 c.custody='unknown';report.approved++;g.approved++;
}
window.BK_BRB_POSITIVE_STAGE_CONSEQUENCES15=report;
})();