/* 2026-10-19: separate primary-SFS source review for 21 formerly open
 * BrB stage combinations. The authorizing clause names the offence's
 * statutory base while the grade is expressly defined in that SAME
 * substantive paragraph. This establishes ONLY the present statutory
 * named-stage coverage, not a historical/case-specific conviction,
 * 23 kap. prerequisites, penalty range, public prosecution or coercion.
 * Every card is independently compared with its own grade paragraph,
 * authorizer, named stage and old state; source edits fail closed.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;
if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const norm=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const source=(ref,phrases)=>{
 const s=W['BrB:'+ref],text=norm(s?.text);
 return !!(s?.complete===true&&s.url===URL&&/^2026-10-(17|18|19)$/.test(s.checked||'')
 &&s.text?.length>45&&phrases.every(x=>text.includes(norm(x))));
};
const specs=[
 {parent:'Grovt spridande av gift eller smitta',ref:'13:7',auth:'13:12',title:'spridande av gift eller smitta',grade:['Är brottet grovt','fängelse på viss tid, lägst fyra'],kinds:'FPS',old:'unverified',caveat:'BrB 13:7 andra stycket är uttryckligen den grova graden av spridande av gift eller smitta. 13:12 hänvisar till samma brottstyp.'},
 {parent:'Grov kapning',ref:'13:5a',auth:'13:12',title:'kapning',grade:['Är brott som avses i första eller andra stycket att anse som grovt','kapning'],kinds:'FPS',old:'unverified',caveat:'BrB 13:5 a tredje stycket graderar kapning enligt första stycket. BrB 13:12 använder namnet kapning; detta är inte en fristående ny gärning.'},
 {parent:'Grovt sjö- eller luftfartssabotage',ref:'13:5a',auth:'13:12',title:'sjö- eller luftfartssabotage',grade:['Är brott som avses i första eller andra stycket att anse som grovt','sjö- eller luftfartssabotage'],kinds:'FPS',old:'unverified',caveat:'BrB 13:5 a tredje stycket graderar även sjö- eller luftfartssabotage enligt andra stycket; 13:12 använder brottstypens namn.'},
 {parent:'Grovt flygplatssabotage',ref:'13:5b',auth:'13:12',title:'flygplatssabotage',grade:['Är brottet att anse som grovt','flygplatssabotage'],kinds:'FPS',old:'unverified',caveat:'BrB 13:5 b andra stycket är den grova graden av samma flygplatssabotage som räknas upp i 13:12.'},
 {parent:'Grovt våld eller hot mot förman',ref:'21:8',auth:'21:15',title:'våld eller hot mot förman',grade:['Är brottet att anse som grovt','våld eller hot mot förman'],kinds:'FPS',old:'unverified',caveat:'BrB 21:8 tredje och fjärde styckena reglerar grov grad av det i 21:15 nämnda brottet. Hela kapitel 21 förutsätter de särskilda förhållandena enligt 21:1–4.'},
 {parent:'Grov signaturförfalskning',ref:'14:5',auth:'14:13',title:'signaturförfalskning',grade:['Är brottet grovt','signaturförfalskning'],kinds:'FP',old:'punishable',caveat:'BrB 14:5 innehåller grovhetsgraden; BrB 14:13 anger försök och förberedelse, aldrig stämpling. Även undantaget för ringa gärning i 14:13 måste beaktas.'},
 {parent:'Grov olovlig befattning med falska pengar',ref:'14:7',auth:'14:13',title:'olovlig befattning med falska pengar',grade:['Är brottet grovt','falsk sedel eller falskt mynt'],kinds:'F',old:'punishable',caveat:'BrB 14:7 innehåller den grova graden. BrB 14:13 omfattar endast försök att ANSKAFFA eller TA EMOT de falska pengarna, inte försök till övriga befattningsformer. Ringa försök undantas.'},
 {parent:'Grov märkesförfalskning',ref:'14:8',auth:'14:13',title:'märkesförfalskning',grade:['Är brottet grovt','märkesförfalskning'],kinds:'FP',old:'punishable',caveat:'Grovhetsgraden finns i BrB 14:8 andra–tredje styckena. BrB 14:13 omfattar bara försök/förberedelse och undantar ringa fullbordanshypotes.'},
 {parent:'Grov bevisförvanskning',ref:'15:8',auth:'15:15',title:'bevisförvanskning som inte är ringa',grade:['Är brottet grovt','bevisförvanskning'],kinds:'F',old:'punishable',caveat:'BrB 15:15, i lydelsen 2026:1318, omfattar försök till bevisförvanskning som inte är ringa; den grova graden i 15:8 är inte ringa. Ingen förberedelse/stämpling är angiven.'}
];
const kindCode={forsok:'F',forberedelse:'P',stampling:'S'};
const parents=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.title,c]));
const report={planned:21,scopeApproved:0,consequencesApproved:0,preliminaryStatusResolved:0,held:[],byParent:[],reviewed:'2026-10-19',sourceURL:URL,finalLegalLiabilityApprovals:0,automaticPenaltyApprovals:0,automaticProsecutionApprovals:0,automaticCoercionApprovals:0};
for(const x of specs){
 const p=parents.get(x.parent),authReady=source(x.auth,[x.title]),gradeReady=source(x.ref,x.grade);
 const relevant=D.crimes.filter(c=>c.stageParentId===p?.id&&c.stageType&&x.kinds.includes(kindCode[c.stageType]));
 const by={parent:x.parent,expected:x.kinds.length,approved:0,held:0,gradeProvision:x.ref,authProvision:x.auth};
 for(const c of relevant){
  const legal=c.individualLegalAudit15,valid=!!(authReady&&gradeReady&&p?.statute==='BrB:'+x.ref
   &&p.lawCompletenessVerified===true&&p.lawCompletenessSourceURL===URL
   &&c.stageStatus===x.old&&c.stageSource?.includes('BrB '+x.auth)
   &&c.stageParentId===p.id&&!legal
   &&((x.old==='unverified'&&c.stageReviewDate===null)||(x.old==='punishable'&&c.stageReviewDate)));
  if(!valid){report.held.push({id:c.id,parent:x.parent,stage:c.stageType,authReady,gradeReady,status:c.stageStatus});by.held++;continue;}
  const evidence='Kontroll av gällande BrB '+x.ref+' jämförd med '+x.auth+': '+x.caveat;
  if(x.old==='unverified'){
   c.stageStatus='punishable';c.stageReviewDate='2026-10-19';
   c.stageReviewBasis=evidence+' Endast aktuell lagtextstruktur är fastställd.';
   report.preliminaryStatusResolved++;
  }
  c.stageEvidence15={...(c.stageEvidence15||{}),
   currentSourceInterpretation:evidence,
   currentNamedGradeStageChecked:'2026-10-19',
   source:URL,statutoryStageCovered:true,
   finalLegalConclusionApproved:false,caseSpecificLiabilityApproved:false,
   offenceDateAndTransitionalLawReviewed:false};
  c.individualLegalAudit15={
   scope:{status:'APPROVED',checked:'2026-10-19',sourceURL:URL,
    finding:'CURRENT_BRB_SAME_SECTION_GRADE_COVERED_BY_NAMED_STAGE',
    currentOnly:true,authorizingProvision:'BrB '+x.auth,
    gradeProvision:'BrB '+x.ref,parentStatute:p.statute,stageType:c.stageType,
    primaryTextBasis:evidence,
    criminalizationScope:'current-grade-of-explicitly-named-base-offence',
    chapter23ConditionsReviewed:false,historicApplicabilityApproved:false,
    caseSpecificLiabilityApproved:false,coercionApproved:false},
   consequences:{status:'APPROVED',checked:'2026-10-19',sourceURL:URL,
    finding:'LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS',
    namedOffenceOnly:true,automaticCoercionApproved:false,
    punishmentRangeApproved:false,prosecutionAuthorityApproved:false,
    custodyAuthorityApproved:false,individualLegalLiabilityApproved:false,
    offenceDateReviewed:false,specificPenaltyRange:null,
    note:'Den kontrollerade uppräkningen och brottsgradsdefinitionen ger ingen automatisk straffskala, åtalsbefogenhet eller tvångsmedelsgrund. BrB 23 kap., brottsrekvisit, undantag och gärningsdagens lag måste prövas självständigt.'}
  };
  c.stageSourceScopeNote15=evidence+' Historisk lagversion och konkret ansvar ej bedömda.';
  c.stageConsequenceNote15=c.individualLegalAudit15.consequences.note;
  c.penaltyRange=null;c.stagePenaltyLower=null;c.stagePenaltyUpper=null;
  c.penalty='Straffskala enligt 23 kap. BrB måste prövas individuellt';
  c.penaltyShort='Individuell prövning';
  c.penaltyNote=evidence+' Ingen numerisk förstadiestraffskala har godkänts.';
  c.custody='unknown';
  if(c.prosecution!=='conditional')c.prosecution='unknown';
  c.prosecutionLabel='Åtalsvillkor måste kontrolleras';
  c.stageExplanation=evidence+' Den specifika gärningens ansvar, påföljd, åtal och tvångsmedel är inte slutgranskade.';
  by.approved++;report.scopeApproved++;report.consequencesApproved++;
 }
 if(relevant.length!==x.kinds.length)report.held.push({parent:x.parent,reason:'Missing stage cards',found:relevant.length,expected:x.kinds.length});
 report.byParent.push(by);
}
window.BK_BRB_GRADE_STAGE_SOURCE_AUDIT15=report;
})();