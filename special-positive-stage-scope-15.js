/* V1.5: 66 named POSITIVE special-law inchoate statutory LISTINGS.
 * Independently compares each expected title and stage kind against the
 * explicit enumerations of the five source-locked special statutes.
 * 'APPROVED' means only "the current enactment explicitly lists this
 * category of attempt/preparation/conspiracy". It does NOT decide
 * culpability, facts, BrB 23:1-2 prerequisites, offence-date legality,
 * public prosecution, stage-specific punishment or coercion.
 */
(()=>{'use strict';const D=window.BK_DATA,docs=window.BK_SPECIAL_EXCERPTS;
const prior=window.BK_SPECIAL_STAGE_ENUMERATION15;
if(!D?.crimes||!docs||!prior)return;
const law={
 SmuglL:{section:'14',names:{
  'Smuggling':'F','Tullbrott':'F','Ringa smuggling av explosiv vara':'F',
  'Ringa narkotikasmuggling':'FP','Ringa vapensmuggling':'FP',
  'Grov smuggling':'FPS','Narkotikasmuggling':'FPS','Narkotikasmuggling – avsedd att säljas':'FPS',
  'Grov narkotikasmuggling':'FPS','Synnerligen grov narkotikasmuggling':'FPS',
  'Vapensmuggling':'FPS','Grov vapensmuggling':'FPS','Synnerligen grov vapensmuggling':'FPS',
  'Smuggling av explosiv vara':'FPS','Grov smuggling av explosiv vara':'FPS',
  'Synnerligen grov smuggling av explosiv vara':'FPS','Grovt tullbrott':'FPS',
  'Grov olovlig befattning med smuggelgods':'FPS'
 }},
 PTBL:{section:'8',names:{
  'Penningtvättsbrott':'FPS','Grovt penningtvättsbrott':'FPS',
  'Näringspenningtvätt':'FPS','Grov näringspenningtvätt':'FPS'
 }},
 SkBrL:{section:'11',names:{'Grovt skattebrott':'PS'}},
 LBE:{section:'30a',names:{
  'Grovt brott mot tillståndsplikten för explosiva varor':'FPS',
  'Synnerligen grovt brott mot tillståndsplikten för explosiva varor':'FPS'
 }}
};
const distinctions={
 SmuglL:{'Narkotikasmuggling – avsedd att säljas':'narkotikasmuggling',
   'Ringa smuggling av explosiv vara':'ringa smuggling av explosiv vara'},
 PTBL:{'Grov näringspenningtvätt':'näringspenningtvätt som inte är ringa'},
 LBE:{'Synnerligen grovt brott mot tillståndsplikten för explosiva varor':'brott enligt 29 a § första eller andra stycket'}
};
const stages=[['forsok','F'],['forberedelse','P'],['stampling','S']];
const parentMap=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title,c]));
const checked={planned:0,scopeApproved:0,withheld:[],sourceFamilies:Object.keys(law),
 byLaw:{},checkedOn:'2026-10-18',reviewScope:'current-act-named-stage-enumeration-only',
 approvedStagePenaltyConsequences:0,caseSpecificLiabilityApprovals:0,coercionApprovals:0};
for(const [fam,entry] of Object.entries(law)){
 checked.byLaw[fam]={planned:0,approved:0};
 const provision=docs[fam]?.sections?.[entry.section]?.text||'';
 for(const [name,allowed] of Object.entries(entry.names)){
  const p=parentMap.get(name);
  for(const [slug,abbr] of stages){
   if(!allowed.includes(abbr))continue;
   checked.planned++;checked.byLaw[fam].planned++;
   const c=D.crimes.find(x=>x.stageParentId===p?.id&&x.stageType===slug);
   const r=c?.stagePreliminaryScope15;
   const anchor=distinctions[fam]?.[name]||name.toLowerCase();
   const sourceOK=Boolean(prior.sourceOK?.[fam]===true&&prior.held.length===0
      &&provision.toLowerCase().includes(anchor.toLowerCase())
      &&p?.stageReviewed===true&&p?.stagePermissions?.includes(abbr)
      &&c?.stageStatus==='punishable'&&c.stageReviewDate==='2026-10-18'
      &&c.stageSource===p?.stageSource&&c.custody==='unknown'
      &&r?.status==='SOURCE_ENUMERATION_REVIEWED'
      &&r.sourceURL===p?.sourceURL
      &&r.criminalizedInCurrentAct===true
      &&r.individualCriminalizationFinalApproved===false
      &&!c.individualLegalAudit15);
   if(!sourceOK){checked.withheld.push({fam,name,slug,hasSource:prior.sourceOK?.[fam],anchor,anchorFound:provision.toLowerCase().includes(anchor.toLowerCase()),reviewStatus:r?.status});continue;}
   c.individualLegalAudit15={
    scope:{status:'APPROVED',checked:'2026-10-18',sourceURL:r.sourceURL,
     section:fam+' '+entry.section+' §',lawVersion:r.version,sourceFingerprint:r.sourceFingerprint,
     question:'Omfattas det namngivna förstadiet uttryckligen av särskild kriminalisering i nu gällande specialförfattning?',
     finding:'CURRENT_ACT_EXPLICIT_INCHOATE_ENUMERATION_CONFIRMED',
     namedOffence:name,stageType:slug,
     chapter23ConditionsReviewed:false,caseSpecificLiabilityApproved:false,
     historicApplicabilityApproved:false,coercionApproved:false,
     note:'Förstadiet är uttryckligen omnämnt i aktuell specialförfattnings uppräkning, men detta visar inte att en viss gärning uppfyller BrB 23 kap. eller brottsrekvisiten. Kontrollera gärningsdag, övergångsregler, konkret skuld och eventuella inskränkningar.'}
   };
   c.stageSourceScopeNote15='Uttryckligt lagstöd för detta förstadium i aktuell '+fam+' '+entry.section+' § har kontrollerats. Det innebär inte fastställd straffbarhet för en konkret gärning, beslutad straffskala, allmänt åtal eller rätt till tvångsmedel.';
   c.custody='unknown';c.prosecution='unknown';
   checked.scopeApproved++;checked.byLaw[fam].approved++;
  }
 }
}
window.BK_SPECIAL_POSITIVE_STAGE_AUDIT15=checked;
})();