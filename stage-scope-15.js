/* Avoid a false "not criminalized" verdict where BrB 13:12
 * lists the normal offence while the parent is its aggravated grade.
 * A blanket inference of either punishability or non-punishability would
 * overstate the current scope of this specific review.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const parents=new Map(D.crimes.filter(c=>c.stageExtraCheck==='aggravated-13-12').map(c=>[c.id,c]));
let withheld=0;
for(const c of D.crimes){
 if(!c.stageType||!parents.has(c.stageParentId))continue;
 if(c.stageStatus!=='not-criminalized')continue;
 c.stageStatus='unverified';
 c.stageReviewDate=null;
 c.stageReviewBasis='BrB 13:12 nämner huvudrubriceringen. Omfattningen för den grova graden måste verifieras individuellt.';
 c.stageExplanation='Förstadiets straffbarhet för denna grova rubricering är ännu inte individuellt juridiskt avgjord. Avsaknad av verifiering betyder inte att gärningen är straffri.';
 c.penalty='Straffbarhet/straffskala ej verifierad';
 c.penaltyShort='Ej verifierat';
 c.penaltyNote=c.stageExplanation;
 c.penaltyRange=null;
 c.custody='unknown';
 c.prosecution='unknown';
 c.prosecutionLabel='Åtalsregel måste kontrolleras';
 c.prosecutionRule=null;
 c.prosecutionDetails=['Förstadieansvar och åtalsvillkor kräver individuell kontroll av BrB 13:12 och 23 kap.'];
 withheld++;
}
const warParents=new Map(D.crimes.filter(c=>!c.stageType&&c.applicabilityConditional).map(c=>[c.id,c]));
let warStages=0;
for(const c of D.crimes){
 if(!c.stageType)continue;
 const p=warParents.get(c.stageParentId);
 if(!p)continue;
 c.applicabilityConditional=true;
 c.applicabilityType=p.applicabilityType;
 const exception=p.applicabilityType==='land'&&(c.stageType==='forberedelse'||c.stageType==='stampling');
 c.applicabilityWarning=exception
  ?'Enligt BrB 22:7 kan förberedelse eller stämpling till landssvek/landsförräderi vara straffbar även när landet hotas av krig eller andra angivna fientligheter. Kontrollera de särskilda förutsättningarna.'
  :'Krigs- eller beredskapsrelaterade tillämpningsförutsättningar måste fastställas innan straffbarheten bedöms.';
 c.stageExplanation=(c.stageExplanation||'')+' '+c.applicabilityWarning;
 c.penaltyNote=(c.penaltyNote||'')+' '+c.applicabilityWarning;
 c.custody='unknown';
 warStages++;
}
// BrB 21:15 uses the principal offence name in the stage provision;
// do not silently infer a definitive negative verdict for the separately
// indexed aggravated grade until scope has been examined individually.
let gross21Withheld=0;
for(const c of D.crimes.filter(c=>c.stageType)){
 const p=D.crimes.find(x=>x.id===c.stageParentId);
 if(p?.title!=='Grovt våld eller hot mot förman'||c.stageStatus!=='not-criminalized')continue;
 c.stageStatus='unverified';c.penaltyRange=null;c.penalty='Straffbarhet ej verifierad';
 c.penaltyShort='Ej verifierat';c.stageReviewDate=null;c.custody='unknown';
 c.stageExplanation='BrB 21:15 nämner våld eller hot mot förman. Förstadieansvaret för den grova graden måste utredas särskilt. '+(c.applicabilityWarning||'');
 c.penaltyNote=c.stageExplanation;
 gross21Withheld++;
}
// Per-grade ambiguity analysis: text and travaux preparatoires point to
// coverage of the qualified grade, but no definitive catalogue verdict
// should be stamped before specialist review of the offence/date/praxis.
// This does not alter "unverified" status, penalty or custody.
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const SOU='https://data.riksdagen.se/dokument/hcb355';
const hypotheses={
 'Grov kapning':{
  section:'BrB 13:5 a tredje stycket',
  base:'kapning i BrB 13:12',
  detail:'13:5 a anger en grov grad av kapning inom samma paragraf. 13:12 kriminaliserar försök, förberedelse och stämpling till kapning, utan att särskriva den grova graden.'
 },
 'Grovt sjö- eller luftfartssabotage':{
  section:'BrB 13:5 a tredje stycket',
  base:'sjö- eller luftfartssabotage i BrB 13:12',
  detail:'13:5 a anger en grov grad av sjö- eller luftfartssabotage inom samma paragraf, medan 13:12 hänvisar till grundrubriceringen.'
 },
 'Grovt flygplatssabotage':{
  section:'BrB 13:5 b andra stycket',
  base:'flygplatssabotage i BrB 13:12',
  detail:'13:5 b andra stycket anger en grov grad av samma gärning, medan 13:12 nämner flygplatssabotage.'
 },
 'Grovt våld eller hot mot förman':{
  section:'BrB 21:8 tredje–fjärde styckena',
  base:'våld eller hot mot förman i BrB 21:15',
  detail:'21:8 reglerar normalgrad och grovhetsbedömning under samma brottsbeteckning. 21:15 nämner försök, förberedelse och stämpling till våld eller hot mot förman. Särskilda villkor för 21 kap. framgår av 21:1–4.'
 }
};
let gradeEvidenceAdded=0;
for(const c of D.crimes.filter(x=>x.stageType&&x.stageStatus==='unverified')){
 const parent=D.crimes.find(p=>!p.stageType&&p.id===c.stageParentId);
 const hyp=hypotheses[parent?.title];if(!hyp)continue;
 const chapter=parent.title==='Grovt våld eller hot mot förman'?21:13;
 const note=hyp.detail+' Lagtextens hänvisning ger stöd för att kvalificeringsgraden hör till brottstypen, men denna katalog har INTE fastställt en bindande slutsats om förstadiets rubricering, straffskala eller tvångsmedel. Kontrollera gärningstidpunkt och relevant praxis.';
 c.stageEvidence15={
  question:'Omfattas grovhetsgraden av förstadiekriminaliseringen för namngivet grundbrott?',
  legalProvisions:[hyp.section,hyp.base,'BrB 23:1–2'],
  officialSource: SRC,
  preparatorySource:chapter===13?SOU:null,
  preliminaryAssessment:'text-and-systematics-suggest-coverage-not-finally-approved',
  finalLegalConclusionApproved:false,
  status:'open-individual-legal-interpretation'
 };
 c.stageReviewBasis=hyp.section+' jämfört med '+hyp.base+
  (chapter===13?'; SOU 2024:55 diskuterar 13:12 och samtliga uppsåtliga allmänfarliga brott.':'')+
  '. Brottets grova grad kräver separat juridisk slutgranskning.';
 c.stageExplanation=note+(c.applicabilityWarning?' '+c.applicabilityWarning:'');
 c.penaltyNote=c.stageExplanation;
 c.custody='unknown';
 gradeEvidenceAdded++;
}
window.BK_STAGE_SCOPE15={withheld,warStages,gross21Withheld,gradeEvidenceAdded,reason:'BrB 13:12 and 21:15 degree scope has source-linked open legal questions'};
})();