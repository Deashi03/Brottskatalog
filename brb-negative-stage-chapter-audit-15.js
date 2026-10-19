/* Brottskatalog V1.5. Chapter-by-chapter source audit of BrB 5,7–12,14–20,
 * 12,15,16,20 negative inchoate entries (current SFS only).
 *
 * For every candidate, compare the exact parent offence, kind of inchoate
 * offence and source status with a separately documented exhaustive chapter
 * enumeration. The manifest is anchored in the actual statutory authorizing
 * provision and checked complete primary text. Do NOT infer the presence or
 * absence of some OTHER offence or what law applied on a historic offence
 * date. This is a narrow CURRENT-STATUTE finding, not substantive liability,
 * public-prosecution or police coercion authorization.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const spec={
 3:{section:'3:11',allowed:{
 'Mord':'FPS','Dråp':'FPS','Barnadråp':'FP',
 'Misshandel':'FP','Grov misshandel':'FPS','Synnerligen grov misshandel':'FPS'}},
 4:{section:'4:10',allowed:{
 'Människorov':'FPS','Människohandel':'FPS',
 'Grov människoexploatering':'FPS','Människoexploatering':'FPS',
 'Olaga frihetsberövande':'FPS',
 'Äktenskapstvång':'FPS','Barnäktenskapsbrott':'FPS',
 'Grovt olaga tvång':'FPS','Grovt olaga hot':'FPS',
 'Grovt hemfridsbrott':'FPS','Grovt olaga intrång':'FPS',
 'Äktenskapsresebrott':'F','Äktenskapsresebrott mot barn':'F',
 'Dataintrång':'FP','Grovt dataintrång':'FP'}},
 5:{section:null,allowed:{}},
 6:{section:'6:15',allowed:{
 'Våldtäkt':'FPS','Grov våldtäkt':'FPS',
 'Sexuellt övergrepp':'F','Grovt sexuellt övergrepp':'F',
 'Våldtäkt mot barn':'FPS','Grov våldtäkt mot barn':'FPS',
 'Sexuellt utnyttjande av barn':'F','Sexuellt övergrepp mot barn':'F',
 'Grovt sexuellt övergrepp mot barn':'F',
 'Utnyttjande av barn för sexuell posering':'F',
 'Grovt utnyttjande av barn för sexuell posering':'FPS',
 'Utnyttjande av barn genom köp av sexuell handling':'F',
 'Köp av sexuell handling':'F','Koppleri':'FP','Grovt koppleri':'FPS'}},
 7:{section:'7:5',allowed:{
 'Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn':'F',
 'Förvanskande av familjeställning':'F','Grov egenmäktighet med barn':'F'}},
 8:{section:'8:12',allowed:{
 'Stöld':'FP','Grov stöld':'FPS','Inbrottsstöld':'FPS','Rån':'FPS','Grovt rån':'FPS',
 'Tillgrepp av fortskaffningsmedel':'FP','Grovt tillgrepp av fortskaffningsmedel':'FP',
 'Olovlig energiavledning':'FP','Grov olovlig energiavledning':'FP'}},
 9:{section:'9:11',allowed:{
 'Bedrägeri':'FP','Grovt bedrägeri':'FPS',
 'Olovlig befattning med betalningsverktyg':'FP','Grov olovlig befattning med betalningsverktyg':'FP',
 'Utpressning':'FP','Ringa utpressning':'FP','Grov utpressning':'FPS',
 'Ocker':'FP','Grovt ocker':'FP','Häleri':'FPS','Grovt häleri':'FPS',
 'Utförselhäleri':'FPS','Grovt utförselhäleri':'FPS','Grovt fordringsbedrägeri':'P'}},
 10:{section:'10:9',allowed:{
 'Förskingring':'F','Grov förskingring':'FPS',
 'Trolöshet mot huvudman':'F','Grov trolöshet mot huvudman':'FPS',
 'Grovt givande av muta':'P'}},
 11:{section:'11:6',allowed:{
 'Oredlighet mot borgenärer':'F','Grov oredlighet mot borgenärer':'FPS',
 'Grovt bokföringsbrott':'P'}},
 12:{section:'12:5',allowed:{
 'Skadegörelse':'F','Grov skadegörelse':'FP'}},
 13:{section:'13:12',allowed:{
 'Mordbrand':'FPS','Grov mordbrand':'FPS',
 'Allmänfarlig ödeläggelse':'FPS','Grov allmänfarlig ödeläggelse':'FPS',
 'Sabotage':'FPS','Grovt sabotage':'FPS',
 'Kapning':'FPS','Sjö- eller luftfartssabotage':'FPS',
 'Flygplatssabotage':'FPS','Sabotage mot blåljusverksamhet':'FPS',
 'Grovt sabotage mot blåljusverksamhet':'FPS',
 'Spridande av gift eller smitta':'FPS','Förgöring':'FPS'}},
 14:{section:'14:13',allowed:{
 'Urkundsförfalskning':'FP','Grov urkundsförfalskning':'FP',
 'Hindrande av urkunds bevisfunktion':'FP','Signaturförfalskning':'FP',
 'Penningförfalskning':'FP','Märkesförfalskning':'FP',
 'Förfalskning av fast märke':'FP','Brukande av vad som förfalskats':'FP',
 'Brukande av det förfalskade':'FP','Olovlig befattning med falska pengar':'F'}},
 15:{section:'15:15',allowed:{
 'Mened':'PS','Grov mened':'PS',
 'Bevisförvanskning':'F','Grov bevisförvanskning':'F'}},
 16:{section:'16:17',allowed:{
 'Myteri':'PS',
 'Gravfridsbrott':'F','Grovt gravfridsbrott':'FPS',
 'Barnpornografibrott':'F','Grovt barnpornografibrott':'FP'}},
 17:{section:'17:16',allowed:{
 'Våld eller hot mot tjänsteman':'FPS','Grovt våld eller hot mot tjänsteman':'FPS',
 'Angrepp mot tjänsteman':'FPS','Grovt angrepp mot tjänsteman':'FPS',
 'Övergrepp i rättssak':'FPS','Grovt övergrepp i rättssak':'FPS',
 'Skyddande av brottsling':'FPS','Grovt skyddande av brottsling':'FPS',
 'Främjande av rymning eller flykt':'FP','Grovt främjande av rymning eller flykt':'FP',
 'Rymning':'F','Grov rymning':'F'}},
 18:{section:'18:7',allowed:{
 'Uppror':'FPS','Väpnat hot mot laglig ordning':'FPS',
 'Brott mot medborgerlig frihet':'F','Svikande av försvarsplikt':'F'}},
 19:{section:'19:14',allowed:{
 'Högförräderi':'FPS','Trolöshet vid förhandling med främmande makt':'FPS',
 'Spioneri':'FPS','Grovt spioneri':'FPS','Utlandsspioneri':'FPS','Grovt utlandsspioneri':'FPS',
 'Grov obehörig befattning med hemlig uppgift':'FPS',
 'Olovlig underrättelseverksamhet mot främmande makt':'FPS',
 'Olovlig underrättelseverksamhet mot person':'FPS',
 'Obehörig befattning med hemlig uppgift':'FP'}},
 20:{section:null,allowed:{}},
 21:{section:'21:15',allowed:{
 'Olovlig avvikelse av krigsman':'FPS',
 'Grov olovlig avvikelse av krigsman':'FPS',
 'Våld eller hot mot förman':'FPS'}},
 22:{section:'22:7',allowed:{
 'Landsförräderi':'FPS','Landssvek':'FPS'}}
};
const stageAbbr={forsok:'F',forberedelse:'P',stampling:'S'};
const originals=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[c.id,c]));
const statuteOK=p=>Boolean(p&&p.complete===true&&p.url===SOURCE&&
 /^2026-10-(1[5-9])$/.test(p.checked||'')&&
 typeof p.text==='string'&&p.text.length>=45);
const chapterReady={};
for(const [chapter,v] of Object.entries(spec)){
 if(v.section){
  const ref='BrB:'+v.section,statute=W[ref],txt=String(statute?.text||'').toLowerCase();
  const required=['försök','förberedelse','stämpling'].filter(word=>
    Object.values(v.allowed).some(x=>x.includes(({försök:'F',förberedelse:'P',stämpling:'S'})[word])));
  chapterReady[chapter]=statuteOK(statute)&&required.every(term=>txt.includes(term))
   &&new Set(Object.keys(v.allowed)).size===Object.keys(v.allowed).length;
 }else{
  // Validate the complete text of every indexed chapter provision, and fail
  // closed if a new explicit special inchoate liability paragraph appears.
  const all=Object.entries(W).filter(([ref])=>ref.startsWith('BrB:'+chapter+':'))
    .filter(([_,p])=>p?.complete);
  const candidates=D.crimes.filter(c=>!c.stageType&&c.statute?.startsWith('BrB:'+chapter+':'));
  const hasAuthorizer=all.some(([_,p])=>/för (?:försök|förberedelse|stämpling) till/i.test(p.text||''));
  chapterReady[chapter]=all.length>=3&&!hasAuthorizer
    &&candidates.every(c=>statuteOK(W[c.statute]));
 }
}
const report={expectedChapters:Object.keys(spec).map(Number),checked:'2026-10-18',
 planned:0,alreadyReviewed:0,scopeApproved:0,consequencesApproved:0,
 currentStatutoryStageManifest:spec,
 held:[],byChapter:{},chapterReady,failedClosed:true,
 finalCaseLiabilityApprovals:0,sourceAndHistoricLawApprovals:0,
 approvedAutomaticCoercionDecisions:0};
for(const [ch,rule] of Object.entries(spec)){
 const group={planned:0,existing:0,approved:0,held:0,mismatchedPositive:0};
 report.byChapter[ch]=group;
 const chapterStages=D.crimes.filter(c=>c.stageType&&
   c.statute?.startsWith('BrB:'+ch+':'));
 for(const c of chapterStages){
  const p=originals.get(c.stageParentId),allowed=String(rule.allowed[p?.title]||''),
    abbr=stageAbbr[c.stageType],shouldBePositive=allowed.includes(abbr);
  const negative=c.stageStatus==='not-criminalized';
  const positive=c.stageStatus==='punishable';
  // Independent manifest must agree with all recorded positive and negative
  // statuses in the chapter before any new source result is certified.
  if((shouldBePositive&&!positive)||(!shouldBePositive&&!negative)){
   group.mismatchedPositive++;report.held.push({chapter:Number(ch),title:p?.title,
    stage:c.stageType,reason:'chapter-vs-existing-stage-status-mismatch'});continue;
  }
  if(positive)continue;
  if(c.individualLegalAudit15?.scope?.status==='APPROVED'){
   group.existing++;report.alreadyReviewed++;continue;
  }
  report.planned++;group.planned++;
  const primary=W[p?.statute],permit=rule.section?W['BrB:'+rule.section]:null;
  const valid=Boolean(chapterReady[ch]&&statuteOK(primary)
    &&(!permit||statuteOK(permit))
    &&c.stageStatus==='not-criminalized'
    &&['2026-10-13','2026-10-16','2026-10-18'].includes(c.stageReviewDate)
    &&(c.stageSource?.includes(rule.section?'BrB '+rule.section:'BrB '+ch+' kap.')
      ||(ch==='20'&&p.statute==='BrB:20:2'
        &&c.stageSource?.startsWith('BrB 20:2')
        &&c.stagePreliminaryScope15?.positiveCriminalizationUnderNamedProvisions===false))
    &&p?.statute?.startsWith('BrB:'+ch+':')
    &&(c.custody==='none'||((ch==='21'||ch==='22')&&c.custody==='unknown'))
    &&c.penaltyRange===null&&c.stageParentId===p.id
    &&c.stageType in stageAbbr);
  if(!valid){group.held++;report.held.push({chapter:Number(ch),title:p?.title,stage:c.stageType,
   reason:'unverified-dated-statute-or-parent-link',chapterReady:chapterReady[ch],
   source:c.stageSource,stageDate:c.stageReviewDate,
   primaryComplete:primary?.complete,primaryDate:primary?.checked});continue;}
  const section=rule.section?'BrB '+rule.section:'BrB '+ch+' kap. (ingen särskild förstadiekriminalisering)';
  const note='Aktuell SFS-kontroll av '+p.title+' och '+c.stageType+
   ': i '+section+' finns inget uttryckligt särskilt straffansvar för denna kombination. '+
   'Denna slutsats gäller endast det namngivna brottet i den granskade lagversionen. '+
   'Andra brott och äldre lagversioner är inte prövade.';
  c.individualLegalAudit15={
   scope:{status:'APPROVED',checked:'2026-10-18',sourceURL:SOURCE,
    finding:'NO_NAMED_STAGE_OFFENCE_IN_CURRENT_BRB_CHAPTER',
    parentStatute:p.statute,chapterStatute:section,stageType:c.stageType,
    legalScope:'negative-current-statutory-enumeration-only',
    caseSpecificLiabilityApproved:false,historicApplicabilityApproved:false,
    excludesOtherOffences:false,coercionApproved:false,reviewNote:note},
   consequences:{status:'APPROVED',checked:'2026-10-18',sourceURL:SOURCE,
    finding:'NO_INDEPENDENT_PENALTY_PROSECUTION_OR_COERCION_FOR_UNENUMERATED_STAGE',
    namedOffenceOnly:true,otherOffencesMayApply:true,
    historicLawNotChecked:true,automaticCoercionApproved:false,
    punishmentRangeApproved:false,prosecutionAuthorizationApproved:false,
    noCaseSpecificCustodyDecision:true,
    question:'Har ett i aktuellt brottsbalkskapitel inte kriminaliserat förstadium egen straffskala eller tvångsmedelsgrund?',
    note:'Inte enligt det granskade straffbudet. Annan brottslighet, annan tillämplig lagversion och självständiga tvångsmedelsförutsättningar kräver separat prövning.'}
  };
  c.stageConsequenceNote15='Ingen självständig straffskala eller tvångsmedelsgrund för det här ej uttryckligen kriminaliserade förstadiet. Kontrollera annan rubricering och gärningsdag.';
  c.custody='unknown';c.prosecution='unknown';
  report.scopeApproved++;report.consequencesApproved++;group.approved++;
 }
}
window.BK_BRB_NEGATIVE_STAGE_CHAPTER_AUDIT15=report;
})();