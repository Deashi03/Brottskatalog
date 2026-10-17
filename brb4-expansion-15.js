/* V1.5 completeness pass: additional BrB 4:4 f–g and 4:7 a offences.
 * Numeriska straffskalor kontrollerade mot aktuell konsoliderad SFS.
 * Inga konstruerade typexempel när gärningsvarianterna är juridiskt känsliga.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
 ['Oskuldskontroll','4:4f',0,1,false],
 ['Intygande av sexuell oskuld','4:4g',0,.5,true],
 ['Uppmaning till självmord','4:7a',0,2,false],
 ['Oaktsam uppmaning till självmord','4:7a',0,.5,true],
 ['Psykiskt våld','4:7b',0,4,false]
];
const known=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
for(const [title,ref,min,max,fines] of rows){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const statute='BrB:'+ref;
 const p=window.BK_STATUTES?.[statute];
 if(!p?.text)throw Error('V1.5 BrB4 saknar kontrollerat lagtextutdrag '+title);
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const span=n=>n===.5?'sex månader':n+' år';
 const note=ref==='4:7b'?'Bestämmelsen anger två alternativa gärningsformer: upprepade kränkningar, eller varaktig otillbörlig övervakning. Särskilt krav på att gärningen är ägnad att allvarligt skada personens självkänsla.':ref==='4:7a'?'Det finns ett särskilt krav på att gärningen är ägnad att medföra en inte obetydlig fara för självmord samt en särskild ansvarsregel för mindre allvarliga fall. Uppsåts- och oaktsamhetsformer ska hållas isär.':
   'Ringa gärning är inte kriminaliserad enligt paragrafen; den är inte en egen ringa brottsrubricering.';
 D.crimes.push({
  id:'v15-'+slug,title,ref:'BrB '+ref.replace(':',' kap. ')+' §',shortRef:'BrB '+ref,statute,
  category:'Person',aliases:[],
  penalty:fines?'Böter eller fängelse i högst '+span(max):'Fängelse i högst '+span(max),
  penaltyShort:fines?'B–F '+(max===.5?'6 mån':span(max)):'F högst '+span(max),
  penaltyRange:{min,max,fines,life:false},penaltyChecked:'2026-10-16',
  penaltyRangeVerified:true,penaltyReviewScope:'range-only',penaltySourceURL:URL,
  penaltyNote:'Numerisk straffskala jämförd mot BrB '+ref+'. '+note,
  prosecution:'unknown',prosecutionLabel:'Kontrollera åtalsregel',custody:max>=1?'possible':'none',
  sourceURL:URL,law:p.text,lawSource:p.ref,lawMode:'machine',
  reviewStatus:'law-text-legal-review-pending',typexempel15:[],elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],
  stageReviewed:true,stagePermissions:'',stageSource:'BrB 4:10',stageReviewDate:'2026-10-16',
  requisitesStatus:'pending-individual-legal-review'
 });
 known.add(title.toLocaleLowerCase('sv'));
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB4_EXPANSION15={source:URL,added:rows.length,examplesDeferred:true};
})();
