// V1.5 – stable atomic public-release progress accounting.
// One crime-card task, one inchoate-card task, or one operations/test task = one unit.
// Preliminary completeness is NEVER independent final legal signoff.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const file=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=file('index.html'),workflow=file('.github/workflows/ui-tests.yml');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of sources)vm.runInContext(file(src),ctx,{filename:src});
const all=ctx.window.BK_DATA.crimes;
const base=all.filter(c=>!c.stageType);
const brb=base.filter(c=>c.statute?.startsWith('BrB:'));
const special=base.filter(c=>!c.statute?.startsWith('BrB:'));
const stages=all.filter(c=>c.stageType);
const structured=c=>Boolean(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x))&&x<=new Date().toISOString().slice(0,10);
const datedFullText=c=>c.lawMode==='full'&&c.lawCompletenessVerified===true
  &&validDate(c.lawCompletenessChecked)&&c.lawCompletenessSourceURL?.startsWith('https://');
// A conditional/cross-referenced scale may be APPROVED as conditional,
// without inventing a numerical range or enabling coercive-measure advice.
const safeConditional=c=>Boolean(c.conditionalPenalty===true
  &&c.penaltyRangeVerified===false
  &&c.conditionalPenaltyFinalAudit15?.status==='APPROVED'
  &&validDate(c.conditionalPenaltyFinalAudit15.checked)
  &&c.conditionalPenaltyFinalAudit15.sourceURL?.startsWith('https://')
  &&c.conditionalPenaltyFinalAudit15.approvedScope==='complete-current-SFS-branch-and-cross-reference-description-only'
  &&c.conditionalPenaltyFinalAudit15.branchCount===c.penaltyAlternatives15?.length
  &&c.conditionalPenaltyFinalAudit15.caseSpecificScaleResolved===false
  &&c.conditionalPenaltyFinalAudit15.caseSpecificBranchSelectionApproved===false
  &&c.conditionalPenaltyFinalAudit15.automaticCustodyDecisionApproved===false
  &&c.conditionalPenaltyFinalAudit15.legalLiabilityApproved===false
  &&c.conditionalPenaltyFinalAudit15.offenceDateStillRequired===true
  &&c.penaltyAlternativeReview15?.automaticSelectionAllowed===false
  &&c.penaltyAlternativeReview15?.custodyApproved===false);
const ordinaryRange=c=>c.penaltyRangeVerified===true&&!c.conditionalPenalty
  &&c.penaltyReviewScope!=='range-only'&&Boolean(c.penaltyChecked);
const statuteGrade=c=>ordinaryRange(c)||safeConditional(c);
const directGrade=c=>Boolean(ordinaryRange(c)&&validDate(c.penaltyGradeReviewDate)
  &&c.penaltyGradeReviewSource?.startsWith('https://')
  &&c.penaltyGradeReviewProvision)
  ||Boolean(safeConditional(c)&&c.conditionalPenaltyFinalAudit15.directSourceCheckApproved===true);
const age=c=>c.age14Exception15?.sourceRef==='BrB 1:6'
  &&c.age14Exception15?.caseSpecificApplicationApproved===false;
const work=[];
function add(group,label,completed,total,basis){
 if(!Number.isInteger(completed)||!Number.isInteger(total)||completed<0||completed>total)
   throw Error('Invalid task count '+group+': '+label+' '+completed+'/'+total);
 work.push({group,label,completed,total,remaining:total-completed,basis});
}
if(base.length!==387||brb.length!==319||special.length!==68||stages.length!==1086)
 throw Error('Catalog footprint changed; rebaseline before publishing percentages');
add('Grundbrott','Sökbar grundpost',base.filter(c=>c.id&&c.title&&c.ref).length,base.length,'en grundpost = en färdig indexåtgärd');
add('Grundbrott','Åldersregel/metadata i brottskort',base.filter(age).length,base.length,'metadata, inte individuell tillämpningsbedömning');
add('Grundbrott','Komplett daterad lagtext med källhänvisning',base.filter(datedFullText).length,base.length,'specialförfattningars maskintext är inte verifierad fulltext');
add('Grundbrott','Strukturerad inledande rekvisitgenomgång',base.filter(structured).length,base.length,'rekvisitstruktur är inte juridiskt slutgodkännande');
add('Grundbrott','Grundläggande straffskaleavstämning',base.filter(statuteGrade).length,base.length,'villkorade eller härledda straffskalor får inte tvingas in i numeriskt intervall');
add('Grundbrott','Separat direktkontroll av brottsgradens straffskala',base.filter(directGrade).length,base.length,'en särskild direktkontroll, utöver preliminär datagranskning');
const checkpoints=[
 ['time','Tillämplig lagversion och övergångsregler'],
 ['objective','Alla objektiva rekvisit och alternativ'],
 ['subjective','Uppsåt/oaktsamhet och särskild skuldform'],
 ['exceptions','Undantag, subsidiaritet och brottskonkurrens'],
 ['grade','Fullständig brottsgradsprövning'],
 ['jurisprudence','Relevanta förarbeten och praxis'],
 ['inchoate','Förstadier och särskilt kriminaliseringsstöd'],
 ['prosecution','Åtalsförutsättningar och beslutsordning'],
 ['coercion','Straffskalevillkor och tvångsmedelsbefogenheter']
];
for(const [key,label] of checkpoints){
 // Pending by design until distinct, source-linked, dated manual signoff exists.
 const approved=base.filter(c=>c.legalAudit15?.checkpoints?.[key]?.status==='APPROVED'
   &&validDate(c.legalAudit15.checkpoints[key].checked)
   &&c.legalAudit15.checkpoints[key].sourceURL?.startsWith('https://')).length;
 add('Juridisk slutrevision',label,approved,base.length,'separat avslutad kontroll per grundbrott; delgranskning ger ingen automatisk kredit');
}
add('Förstadier','Sökbart förstadiekort',stages.filter(c=>c.id&&c.title&&c.stageParentId).length,stages.length,'en sökbar post per förstadium');
add('Förstadier','Åldersregel/metadata för förstadiet',stages.filter(age).length,stages.length,'endast dokumentation om åldersgräns');
add('Förstadier','Preliminär källkopplad straffbarhetsstatus',stages.filter(c=>
 c.stageStatus!=='unverified'&&Boolean(c.stageSource)&&validDate(c.stageReviewDate)).length,
 stages.length,'preliminär klassificering; inte juridisk slutkontroll');
add('Förstadier','Individuellt godkänd kriminaliseringsprövning',stages.filter(c=>
 c.individualLegalAudit15?.scope?.status==='APPROVED'
 &&validDate(c.individualLegalAudit15.scope.checked)
 &&c.individualLegalAudit15.scope.sourceURL?.startsWith('https://')
 &&c.individualLegalAudit15.scope.caseSpecificLiabilityApproved===false
 &&c.individualLegalAudit15.scope.coercionApproved!==true).length,
 stages.length,'en individuell lagstödsprövning per förstadium');
add('Förstadier','Individuell kontroll av straffskala/åtal/tvångsmedel',stages.filter(c=>
 c.individualLegalAudit15?.consequences?.status==='APPROVED'
 &&validDate(c.individualLegalAudit15.consequences.checked)
 &&c.individualLegalAudit15.consequences.sourceURL?.startsWith('https://')
 &&c.individualLegalAudit15.consequences.automaticCoercionApproved===false
 &&c.individualLegalAudit15.consequences.namedOffenceOnly===true
 &&(c.individualLegalAudit15.consequences.finding==='NO_INDEPENDENT_PENALTY_PROSECUTION_OR_COERCION_FOR_UNENUMERATED_STAGE'||c.individualLegalAudit15.consequences.finding==='LISTED_STAGE_REQUIRES_SEPARATE_BR_B_23_AND_INDIVIDUAL_PENALTY_ANALYSIS')).length,
 stages.length,'en konsekvenskontroll per förstadium, även bekräftad icke-straffbarhet');
const ageCandidates=all.filter(c=>Number(c.age14Exception15?.completedOffenceMinimumYears)>=4);
add('Särskilda kontroller','Individuellt källgranskad tillämplighet för 14-årsundantag',ageCandidates.filter(c=>
 c.age14Exception15?.individualSourceScopeApproved===true
 &&validDate(c.age14Exception15?.individualSourceScopeChecked)).length,
 ageCandidates.length,'källgranskning, inte påstådd beslutanderätt i en konkret situation');
// Regression jobs are already implemented and passed in the most recent
// external successful CI; this script verifies their wiring, not runtime success.
const runs=[...workflow.matchAll(/run:\s*node\s+(scripts\/[a-zA-Z0-9_-]+\.mjs)/g)].map(m=>m[1]);
const tests=[...new Set(runs)];
add('Automatiserade tester','Separata CI-registrerade Node-kontroller',tests.filter(p=>fs.existsSync(path.join(root,p))).length,
 tests.length,'färdiga testkommandon; slutlig grön releasekörning separat åtgärd');
const built=[
 ['Offlinelagring','service-worker.js'],
 ['PWA-manifest','manifest.webmanifest'],
 ['Sökgränssnitt','index.html'],
 ['Versionskontrollerade rättskällor','data/source-status.json'],
 ['Systematisk kvalitetsrapport','scripts/audit_catalog.mjs'],
 ['Release-spärr i revisionsscript','scripts/v15_release_readiness.mjs'],
 ['Individuella BrB-revisionsakter','scripts/v15_priority_legal_dossiers.mjs'],
 ['Straffskalegranskningskö','scripts/v15_penalty_audit_queue.mjs'],
 ['Förstadiegranskningskö','scripts/v15_release_queue_15_test.mjs'],
 ['Mobilregression','scripts/ui_smoke.mjs'],
 ['Publiceringsflöde',' .github/workflows/deploy-pages.yml'.trim()],
 ['Pågående PR-revisionsdokument','docs/V15-REKVISIT-TYPEXEMPEL.md']
];
add('Teknik och logistik','Implementerad infrastruktur och revisionslogistik',
 built.filter(([_,p])=>fs.existsSync(path.join(root,p))).length,built.length,
 'en fristående verifierbar repo-funktion per punkt');
const finalRelease=[
 'Dokumentera full rättslig acceptans för specialförfattningars maskinimport',
 'Konsekvensgranska öppna undantag och historiska ikraftträdanden',
 'Färdigställ gemensam konsistenskontroll av ändringar mot publicerad V1.4',
 'Verifikation av länkar och åldrade/ändrade källor för frisläppningsdagen',
 'Granska åtalsregel/tvångsmedelsvisning och negativa fall i slutpaketet',
 'Slutlig språk- och begreppskontroll i expanderbara detaljer',
 'Slutlig fysisk iPhone-kontroll med verklig tryck-/scrollinteraktion',
 'Slutlig PWA-offlinekontroll på installerad telefon',
 'Genomför negativ kontroll för källändringar och censurerade data',
 'Verifiera att alla juridiska signoffs har spårbar källa och datum',
 'Kontrollera fullständig release-audit utan kvarvarande blockeringar',
 'Slutlig grön CI-körning på avsedd merge-commit',
 'Formellt godkännande av 1.5-release efter oberoende granskning',
 'Besluta och dokumentera release-tag/versionsnummer',
 'Mergning av granskad PR till main',
 'Godkänd GitHub Pages-publicering',
 'Verifierat produktions-smoketest i mobilvyn',
 'Dokumentera färdig 1.5-release och rollbackrutin'
];
add('Slutpublicering','Frisläppning, slutlig kontroll och efterkontroll',0,finalRelease.length,
 'dessa steg kan inte räknas förrän den juridiska revisionskön är stängd');
const total=work.reduce((n,x)=>n+x.total,0),completed=work.reduce((n,x)=>n+x.completed,0);
const byGroup=[...new Set(work.map(x=>x.group))].map(group=>{
 const rows=work.filter(x=>x.group===group),total=rows.reduce((n,x)=>n+x.total,0),
 completed=rows.reduce((n,x)=>n+x.completed,0);
 return {group,total,completed,remaining:total-completed,percent:Math.round(completed/total*1000)/10};
});
const report={
 version:'1.5',schema:1,generatedAt:new Date().toISOString(),
 method:'Alla åtgärder väger en (1) enhet. Separat åtgärd per kort och juridiskt moment, test och logistikpunkt. Ingen viktning efter tidsåtgång. Status gäller den låsta arbetsinventeringen, inte ett löfte om tidsåtgång.',
 baseline:{base:base.length,brb:brb.length,special:special.length,stages:stages.length,
   searchable:all.length,ageCandidates:ageCandidates.length,automatedTestCommands:tests.length},
 counts:{completed,total,remaining:total-completed,percent:Math.round(completed/total*1000)/10},
 byGroup,work,legalChecklist:checkpoints.map(([id,label])=>({id,label})),
 finalReleaseActions:finalRelease,knownBlockers:{
  brbFullFinalApproved:brb.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,
  unverifiedStages:stages.filter(c=>c.stageStatus==='unverified').length,
  conditionalPenaltyCases:base.filter(c=>c.conditionalPenalty&&!c.penaltyRangeVerified).length,
  specialBaseCardsWithoutCertifiedCompleteLaw:special.filter(c=>!datedFullText(c)).length,
  noAutomaticReleaseApproval:true
 },
 assumptions:[
  'Ett brottskorts olika arbetsmoment räknas individuellt; typfall är frivilliga och läggs inte till som fiktiva obligatoriska luckor.',
  'Preliminär förstadieklassificering och maskinimporterade straffskalor räknas inte som juridiskt slutgodkända.',
  '9 juridiska slutmoment per grundbrott och 2 individuella slutmoment per förstadium behövs för publiceringsgranskning.',
  'Granskningar av händelsespecifika omständigheter ger ingen schablonmässig klarteckenstatus; säker villkorad information kan slutgodkännas utan påhittad straffskala.',
  'Tillkommande verkliga rättsliga fel kräver egna poster och ombasering om åtgärdsomfattningen ändras.'
 ]};
if(report.knownBlockers.brbFullFinalApproved!==0)throw Error('Reconcile signoff source before publishing new percentage');
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/v15-publication-progress.json'),JSON.stringify(report,null,2)+'\n');
console.log('V1.5 ATOMIC PROGRESS '+JSON.stringify({baseline:report.baseline,counts:report.counts,byGroup:report.byGroup,blockers:report.knownBlockers}));
if(process.argv.includes('--release')&&report.counts.remaining!==0)
 process.exitCode=2;
