/* Brottskatalog 1.5 – BrB positive pre-offence authorization review.
 * Scope: only an explicit current statutory reference to the NAMED
 * offence and the NAMED form (F/P/S), not compliance with BrB 23:1–2,
 * historic applicability, a stage's penal limits or a police decision.
 *
 * Each card is checked against its actual chapter authorizing paragraph,
 * its existing separately-checked full parent paragraph and the
 * literal title/variant within the complete authorization source.
 * Cross-references and title variants that cannot be matched are HELD.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES,prior=window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15;
if(!D?.crimes||!W||!prior?.currentStatutoryStageManifest)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const kinds={forsok:'F',forberedelse:'P',stampling:'S'};
const aliases={
 'Brukande av det förfalskade':'brukande av vad som förfalskats',
 'Förvanskande av familjeställning':'förvanskande av familjeställning',
 'Grov egenmäktighet med barn':'egenmäktighet med barn som är grovt'
};
const norm=s=>String(s||'').toLowerCase().normalize('NFC').replace(/\s+/g,' ').trim();
const certified=x=>Boolean(x?.complete&&x.url===SOURCE
 &&/^2026-10-(1[5-9])$/.test(x.checked||'')&&String(x.text||'').length>=45);
const report={planned:0,approved:0,held:[],byChapter:{},
 approvedCaseLiabilityDecisions:0,approvedPunishmentRanges:0,
 approvedCustodyDecisions:0,approvedPublicProsecutionConclusions:0,
 scope:'current-BrB-chapter-express-inchoate-listing-only',reviewed:'2026-10-18'};
for(const [chapter,rule] of Object.entries(prior.currentStatutoryStageManifest)){
 const g={eligible:0,approved:0,held:0};report.byChapter[chapter]=g;
 if(!rule.section||!prior.chapterReady[chapter])continue;
 const source=W['BrB:'+rule.section],text=norm(source?.text);
 for(const c of D.crimes.filter(x=>x.stageType&&x.stageStatus==='punishable'
  &&x.statute?.startsWith('BrB:'+chapter+':'))){
  const p=parents.get(c.stageParentId),perm=rule.allowed[p?.title],abbr=kinds[c.stageType];
  if(!perm?.includes(abbr))continue;g.eligible++;report.planned++;
  const heading=norm(aliases[p.title]||p.title);
  const valid=Boolean(certified(source)&&certified(W[p.statute])
   &&text.includes(heading)
   &&c.stageSource?.includes('BrB '+rule.section)
   &&['2026-10-13','2026-10-16','2026-10-18'].includes(c.stageReviewDate)
   &&!c.individualLegalAudit15&&c.stageParentId===p.id);
  if(!valid){g.held++;report.held.push({chapter:Number(chapter),title:p.title,stage:c.stageType,
   hasTerm:text.includes(heading),primaryChecked:certified(W[p.statute]),stageSource:c.stageSource,
   stageDate:c.stageReviewDate});continue;}
  c.individualLegalAudit15={
   scope:{status:'APPROVED',checked:'2026-10-18',sourceURL:SOURCE,
    finding:'CURRENT_BRB_CHAPTER_EXPLICIT_INCHOATE_LISTING',
    offenceTitle:p.title,offenceStatute:p.statute,authorizingProvision:'BrB '+rule.section,
    namedStage:c.stageType,sourceTextAnchor:heading,
    sourceScope:'current-enumerated-inchoate-stage-only',
    caseSpecificLiabilityApproved:false,
    chapter23ConditionsReviewed:false,historicApplicabilityApproved:false,
    coercionApproved:false,
    note:'BrB '+rule.section+' nämner '+c.stageType+' till '+p.title+
     '. Prövningen gäller endast att det aktuella straffbudet räknar upp förstadiet. '+
     'Ingen bedömning av de konkreta rekvisiten enligt 23 kap., gärningsdagen, brottsgraden, åtalsförutsättningar, påföljd eller tvångsmedelsbefogenhet görs.'}
  };
  c.stageSourceScopeNote15='Kontrollerad uttrycklig förstadiekriminalisering enligt BrB '+rule.section+
   '. Straffskala och tvångsmedelsstatus får inte avgöras utifrån denna uppgift.';
  c.custody='unknown';
  // A previously source-restricted prosecution must never be broadened
  // by a review limited to inchoate criminalization.
  if(c.prosecution!=='conditional')c.prosecution='unknown';
  if(c.prosecution!=='conditional')c.prosecutionLabel='Kontrollera åtal och 23 kap. BrB individuellt';
  g.approved++;report.approved++;
 }
}
window.BK_BRB_POSITIVE_STAGE_SOURCE_AUDIT15=report;
})();