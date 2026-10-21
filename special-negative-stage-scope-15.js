/* V1.5 – individual CURRENT-ACT NEGATIVE stage scope and consequences
 * for 72 expressly excluded special-law offence/stage combinations.
 * Two separately checked questions:
 *  1. Is the named offence's inchoate stage enumerated as an offence?
 *  2. Can that non-enumerated stage supply its own punishment, prosecution
 *     or custody trigger? No, because it is not an offence under that act.
 * OTHER offences, historic versions, offender acts and coercion are NOT
 * adjudicated. These are legal SOURCE-SCOPE findings, not case advice.
 */
(()=>{'use strict';
const D=window.BK_DATA, r=window.BK_SPECIAL_STAGE_ENUMERATION15;
if(!D?.crimes||!r)return;
const families=[
 ['SmuglL','smugglingslagen 14 §','F:Smuggling|F:Tullbrott|F:Ringa smuggling av explosiv vara'],
 ['PTBL','penningtvättsbrottslagen 8 §',''],
 ['SkBrL','skattebrottslagen 11 §','P:Grovt skattebrott|S:Grovt skattebrott'],
 ['BidrBrL','bidragsbrottslagen 1–7 §§',''],
 ['LBE','lagen om brandfarliga och explosiva varor 30 a §',
   'F:Grovt brott mot tillståndsplikten för explosiva varor|P:Grovt brott mot tillståndsplikten för explosiva varor|S:Grovt brott mot tillståndsplikten för explosiva varor|F:Synnerligen grovt brott mot tillståndsplikten för explosiva varor|P:Synnerligen grovt brott mot tillståndsplikten för explosiva varor|S:Synnerligen grovt brott mot tillståndsplikten för explosiva varor']
];
const familyNames={
 SmuglL:['Smuggling','Ringa smuggling','Grov smuggling','Narkotikasmuggling','Narkotikasmuggling – avsedd att säljas','Ringa narkotikasmuggling','Grov narkotikasmuggling','Synnerligen grov narkotikasmuggling','Vapensmuggling','Ringa vapensmuggling','Grov vapensmuggling','Synnerligen grov vapensmuggling','Smuggling av explosiv vara','Ringa smuggling av explosiv vara','Grov smuggling av explosiv vara','Synnerligen grov smuggling av explosiv vara','Olovlig införsel eller utförsel','Tullbrott','Ringa tullbrott','Grovt tullbrott','Vårdslös tullredovisning','Olovlig befattning med smuggelgods','Grov olovlig befattning med smuggelgods'],
 PTBL:['Penningtvättsbrott','Grovt penningtvättsbrott','Penningtvättsförseelse','Näringspenningtvätt','Grov näringspenningtvätt','Ringa näringspenningtvätt'],
 SkBrL:['Skattebrott','Skatteförseelse','Grovt skattebrott','Vårdslös skatteuppgift','Skatteavdragsbrott','Skatteredovisningsbrott','Vårdslös skatteredovisning','Försvårande av skattekontroll','Grovt försvårande av skattekontroll'],
 BidrBrL:['Bidragsbrott','Ringa bidragsbrott','Grovt bidragsbrott','Vårdslöst bidragsbrott'],
 LBE:['Brott mot tillståndsplikten för brandfarliga varor','Brott mot tillståndsplikten för explosiva varor','Grovt brott mot tillståndsplikten för explosiva varor','Synnerligen grovt brott mot tillståndsplikten för explosiva varor']
};
const slugToAbbr={forsok:'F',forberedelse:'P',stampling:'S'};
const allowed={
 SmuglL:new Set([
 ...('F:Smuggling|F:Tullbrott|F:Ringa smuggling av explosiv vara|F:Ringa narkotikasmuggling|P:Ringa narkotikasmuggling|F:Ringa vapensmuggling|P:Ringa vapensmuggling').split('|'),
 ...['Grov smuggling','Narkotikasmuggling','Narkotikasmuggling – avsedd att säljas','Grov narkotikasmuggling','Synnerligen grov narkotikasmuggling','Vapensmuggling','Grov vapensmuggling','Synnerligen grov vapensmuggling','Smuggling av explosiv vara','Grov smuggling av explosiv vara','Synnerligen grov smuggling av explosiv vara','Grovt tullbrott','Grov olovlig befattning med smuggelgods'].flatMap(n=>['F','P','S'].map(t=>t+':'+n))
 ]),
 PTBL:new Set(['Penningtvättsbrott','Grovt penningtvättsbrott','Näringspenningtvätt','Grov näringspenningtvätt'].flatMap(n=>['F','P','S'].map(t=>t+':'+n))),
 SkBrL:new Set(['P:Grovt skattebrott','S:Grovt skattebrott']),
 BidrBrL:new Set(),
 LBE:new Set(['Grovt brott mot tillståndsplikten för explosiva varor','Synnerligen grovt brott mot tillståndsplikten för explosiva varor'].flatMap(n=>['F','P','S'].map(t=>t+':'+n)))
};
const report={plannedParents:46,planned:72,scopeApproved:0,consequencesApproved:0,held:[],
 byFamily:{},sourceChecked:'2026-10-18',independentSourceGuard:true,
 fullCaseLiabilityApproved:0,historicApplicabilityApproved:0,coercionDecisionApproved:0,
 statutoryReviewOnly:true};
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title,c]));
for(const [fam,label] of families){
 report.byFamily[fam]={planned:0,completed:0};
 for(const name of familyNames[fam]){
  const p=parents.get(name);
  for(const [slug,abbr] of Object.entries(slugToAbbr)){
   const key=abbr+':'+name,expectAllowed=allowed[fam].has(key);
   if(expectAllowed)continue;
   report.byFamily[fam].planned++;
   const c=D.crimes.find(x=>x.stageParentId===p?.id&&x.stageType===slug);
   const s=c?.stagePreliminaryScope15;
   const valid=Boolean(r.sourceOK?.[fam]===true&&r.held.length===0
     &&p?.stageReviewed===true&&!String(p.stagePermissions||'').includes(abbr));
   const sourceOK=Boolean(valid&&c?.stageStatus==='not-criminalized'
     &&c.stageReviewDate==='2026-10-18'&&c.stageSource===p?.stageSource
     &&s?.reviewKind==='specified-offence-and-specific-stage-enumeration'
     &&s.status==='SOURCE_ENUMERATION_REVIEWED'
     &&s.criminalizedInCurrentAct===false
     &&s.sourceURL===p?.sourceURL
     &&s.offenceDateApplicabilityReviewed===false
     &&s.individualCriminalizationFinalApproved===false
     &&!c.individualLegalAudit15?.scope&&!c.individualLegalAudit15?.consequences);
   if(!sourceOK){report.held.push({name,slug,fam,sourceVerified:r.sourceOK?.[fam],status:c?.stageStatus,permissions:p?.stagePermissions});continue;}
   c.individualLegalAudit15={
    scope:{
     status:'APPROVED',checked:'2026-10-18',sourceURL:s.sourceURL,
     section:label,lawVersion:s.version,sourceFingerprint:s.sourceFingerprint,
     question:'Saknas straffbeläggning av detta namngivna förstadium i det aktuella specialstraffbudet?',
     finding:'NO_NAMED_STAGE_OFFENCE_IN_CURRENT_SPECIAL_ACT',
     excludesOtherOffences:false,offenceDateChecked:false,caseSpecificLiabilityApproved:false,
     note:'Enbart frånvaron av särskilt förstadiestraffbud i nu kontrollerad SFS-version har verifierats. Detta innebär inte att hela gärningen är straffri eller att samma lag var gällande på gärningsdagen.'
    },
    consequences:{
     status:'APPROVED',checked:'2026-10-18',sourceURL:s.sourceURL,
     section:label,
     question:'Kan just ett ej straffbelagt förstadium enligt den namngivna författningen ensamt bära straffskala, åtal eller tvångsmedel?',
     finding:'NO_INDEPENDENT_PENALTY_PROSECUTION_OR_COERCION_FOR_UNENUMERATED_STAGE',
     namedOffenceOnly:true,otherOffencesMayApply:true,historicLawNotChecked:true,
     noCaseSpecificCustodyDecision:true,automaticCoercionApproved:false,
     note:'Ingen självständig påföljd, åtalsgrund eller tvångsmedelsgrund kan härledas ur just ett icke kriminaliserat namngivet förstadium. Andra brott och självständiga tvångsmedelsgrunder måste kontrolleras separat.'
    }
   };
   c.custody='unknown';
   c.prosecution='unknown';
   c.prosecutionLabel='Ej straffbelagt som detta förstadium enligt granskad aktuell lag. Kontrollera annat brott/lagversion.';
   c.stageConsequenceNote15='Ingen självständig straffskala eller tvångsmedelsgrund för det ej särskilt straffbelagda förstadiet enligt aktuellt lagrum. Kontrollera annan rubricering, gärningsdatum och annan lag.';
   report.scopeApproved++;report.consequencesApproved++;report.byFamily[fam].completed++;
  }
 }
}
window.BK_SPECIAL_NEGATIVE_STAGE_AUDIT15=report;
})();