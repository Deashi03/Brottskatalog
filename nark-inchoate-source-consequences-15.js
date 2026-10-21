/* Narkotikastrafflag (1968:64) 4 §: individually checked current statutory
 * stage enumeration for the eleven indexed NSL variants (33 stage cards).
 * Checked against current SFS 2024:797 on 2026-10-19. Only the narrow
 * named offence and stage source scope, plus absence of automatic penalty,
 * prosecution and coercion consequences, are certified. No fact-specific
 * criminal liability, sentence, age exception or historic law is approved.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/';
const section='4 §';
const sourceText='För försök eller förberedelse till narkotikabrott, ringa narkotikabrott, grovt narkotikabrott eller synnerligen grovt narkotikabrott liksom för stämpling till narkotikabrott, grovt narkotikabrott eller synnerligen grovt narkotikabrott döms det, om gärningen avser annat än bruk av narkotika, till ansvar enligt 23 kap. brottsbalken. För försök till olovlig befattning med narkotikaprekursorer döms det, om gärningen avser annan befattning än som avses i 3 b § första stycket 2, till ansvar enligt 23 kap. brottsbalken. Lag (2023:258).';
const kinds={forsok:'F',forberedelse:'P',stampling:'S'};
const names={
 'Narkotikabrott · innehav':'FPS',
 'Ringa narkotikabrott · bruk':'',
 'Narkotikabrott · överlåtelse':'FPS',
 'Narkotikabrott · framställning':'FPS',
 'Narkotikabrott · förvärv i överlåtelsesyfte':'FPS',
 'Narkotikabrott · transport/förvaring':'FPS',
 'Narkotikabrott · försäljning':'FPS',
 'Narkotikabrott · främjande av handel':'FPS',
 'Ringa narkotikabrott · innehav':'FP',
 'Grovt narkotikabrott':'FPS',
 'Synnerligen grovt narkotikabrott':'FPS'
};
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title,c]));
const report={planned:33,scopeApproved:0,consequencesApproved:0,held:[],reviewed:'2026-10-19',
 sourceURL:URL,statutoryText:sourceText,sourceVersion:'2024:797',
 stagePunishmentApproved:0,prosecutionApproved:0,coercionApproved:0,
 historicLawApproved:0,individualLiabilityApproved:0};
const validSource=sourceText.includes('ringa narkotikabrott')&&
 sourceText.includes('om gärningen avser annat än bruk av narkotika')&&
 sourceText.includes('för stämpling till narkotikabrott')&&
 !sourceText.includes('stämpling till ringa narkotikabrott');
for(const [name,permitted] of Object.entries(names)){
 const parent=parents.get(name);
 for(const [stage,letter] of Object.entries(kinds)){
  const c=D.crimes.find(x=>x.stageParentId===parent?.id&&x.stageType===stage);
  const positive=permitted.includes(letter);
  const valid=Boolean(validSource&&parent&&c
   &&parent.statute?.startsWith('Nark:')&&parent.lawMode==='full'
   &&parent.lawCompletenessVerified===true
   &&parent.lawCompletenessSourceURL===URL
   &&parent.lawCompletenessChecked==='2026-10-18'
   &&c.stageSource==='Narkotikastrafflagen 4 §'
   &&c.stageStatus===(positive?'punishable':'not-criminalized')
   &&c.stageReviewDate==='2026-10-13'
   &&!c.individualLegalAudit15
   &&c.stageParentId===parent.id);
  if(!valid){report.held.push({name,stage,existingStatus:c?.stageStatus,source:c?.stageSource,checked:c?.stageReviewDate});continue;}
  const scope={
   status:'APPROVED',checked:'2026-10-19',sourceURL:URL,
   sourceVersion:'2024:797',section,stageType:stage,parentStatute:parent.statute,
   finding:positive?'CURRENT_ACT_EXPLICIT_INCHOATE_ENUMERATION_CONFIRMED':'NO_NAMED_STAGE_OFFENCE_IN_CURRENT_SPECIAL_ACT',
   caseSpecificLiabilityApproved:false,offenceDateChecked:false,
   historicApplicabilityApproved:false,coercionApproved:false,
   sourceScope:'current-NSL-4-specific-stage-only',
   note:positive
    ?'Narkotikastrafflagen 4 § räknar upp denna förstadieform för den aktuella brottsgraden. Bestämmelsen undantar gärningar som avser bruk. Försök/förberedelse/stämpling kräver separat prövning enligt 23 kap. BrB, gärningsdag och faktiska omständigheter.'
    :'Narkotikastrafflagen 4 § straffbelägger inte den namngivna förstadieformen i denna variant. Andra gärningar, andra brott och äldre lagversioner är inte prövade.'
  };
  const consequences={
   status:'APPROVED',checked:'2026-10-19',sourceURL:URL,section,
   finding:positive?'LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS':'NO_INDEPENDENT_PENALTY_PROSECUTION_OR_COERCION_FOR_UNENUMERATED_STAGE',
   namedOffenceOnly:true,automaticCoercionApproved:false,punishmentRangeApproved:false,
   prosecutionAuthorityApproved:false,custodyAuthorityApproved:false,
   individualLegalLiabilityApproved:false,historicLawApproved:false,
   specificPenaltyRange:null,
   note:positive
    ?'Uppräkningen i 4 § avgör inte självständigt påföljdsram, åtal, gärningsdag, straffansvar eller tvångsmedelsbefogenhet. BrB 23 kap. och brottsgradens särskilda regler kräver individuell prövning.'
    :'Ingen självständig påföljd, åtalsgrund eller tvångsmedelsgrund kan grundas på just detta icke straffbelagda förstadium enligt den granskade aktuella paragrafen. Andra brott och lagversioner måste kontrolleras.'
  };
  c.individualLegalAudit15={scope,consequences};
  c.custody='unknown';
  // Do not erase an independently established restrictive prosecution condition.
  if(c.prosecution!=='conditional')c.prosecution='unknown';
  c.stageSourceScopeNote15='Narkotikastrafflagen 4 §: '+(positive?'uttryckligt lagstöd för förstadiet; undantag för bruk.':'inte särskilt kriminaliserat som detta förstadium.')+' Ingen automatisk tvångsmedelsbedömning.';
  c.stageConsequenceNote15=consequences.note;
  report.scopeApproved++;report.consequencesApproved++;
 }
}
window.BK_NARK_INCHOATE_SOURCE_CONSEQUENCES15=report;
})();