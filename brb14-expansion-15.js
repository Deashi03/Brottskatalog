/* V1.5 arbetsgren: saknade brottsrubriceringar enligt BrB 14:8-9.
 * Numeriska straffskalor och särskilda förstadier jämförda med konsoliderad BrB per 2026-10-16.
 * Maskinimporterad lagtext är INTE därigenom juridiskt slutgranskad.
 * Ingen osäker registreringsskyltssituation används som typexempel.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
  ['Ringa signaturförfalskning','14:5',0,.5,true,''],
  ['Grov signaturförfalskning','14:5',.5,4,false,'FP'],
  ['Ringa penningförfalskning','14:6',0,.5,true,''],
  ['Ringa olovlig befattning med falska pengar','14:7',0,.5,true,''],
  ['Grov olovlig befattning med falska pengar','14:7',.5,6,false,''],
    ['Märkesförfalskning','14:8',0,2,false,'FP'],
  ['Ringa märkesförfalskning','14:8',0,.5,true,''],
  ['Grov märkesförfalskning','14:8',.5,4,false,'FP'],
  ['Förfalskning av fast märke','14:9',0,4,false,'FP'],
  ['Ringa förfalskning av fast märke','14:9',0,.5,true,''],
  ['Olaga spridande av efterbildning','14:11',0,0,true,'']
];
const known=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
const duration=y=>Number.isInteger(y)?y+' år':(y*12)+' mån';
for(const [title,short,min,max,fines,permissions] of rows){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const statute='BrB:'+short;
 const provision=window.BK_STATUTES?.[statute];
 if(!provision?.text){console.warn('V1.5: no verifiable provision for '+title);continue;}
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const penalty=fines?(max===0?'Böter':'Böter eller fängelse i högst '+duration(max)):min?'Fängelse i lägst '+duration(min)+' och högst '+duration(max):'Fängelse i högst '+duration(max);
 const c={
  id:'v15-'+slug,title,shortRef:'BrB '+short,ref:'BrB '+short.replace(':',' kap. ')+' §',
  statute,category:'Urkund',aliases:[],
  penalty,penaltyShort:(fines?(max===0?'Böter':'B–F '+duration(max)):min?'F '+duration(min)+'–'+duration(max):'F högst '+duration(max)),
  penaltyRange:{min,max,fines,life:false},penaltyChecked:'2026-10-16',
  penaltyRangeVerified:true,penaltyReviewScope:'range-only',penaltySourceURL:URL,
  penaltyNote:'Straffskalan har jämförts med BrB '+short+'. Lagtext, rekvisit och tillämpning kräver separat juridisk granskning.',
  custody:min>=4?'presumption':max>=1?'possible':'none',
  prosecution:'unknown',prosecutionLabel:'Åtalsregel kräver kontroll',
  prosecutionDetails:['Åtalsregeln och eventuella undantag är inte individuellt sakgranskade.'],
  law:provision.text,lawSource:provision.ref,lawMode:'machine',sourceURL:URL,
  elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],
  reviewStatus:'law-text-legal-review-pending',
  stageReviewed:true,stagePermissions:permissions,stageSource:'BrB 14:13',stageReviewDate:'2026-10-16',
  legalDependencies:[statute,'BrB:14:13'],typexempel15:[],
  requisitesStatus:'pending-individual-legal-review'
 };
 D.crimes.push(c);known.add(title.toLocaleLowerCase('sv'));
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB14_15={rows:rows.length,source:URL,reviewScope:'penalty-and-stage-statutory-text-only',examplesDeferred:true};
})();
