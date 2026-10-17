/* V1.5: missing BrB 11:2 and 13:5a–b, including express graded offences.
 * For attempts to aggravated forms, stage classification must not be inferred
 * from a missing exact grade-name match: handled separately after stage generation.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
 ['Försvårande av konkurs eller exekutiv förrättning','11:2','Förmögenhet',0,2,false,false,
 'Uppsåt eller grov oaktsamhet enligt första stycket; vid annan exekutiv förrättning gäller andra styckets särskilda uppsåtsrekvisit. Lagstadgade rättelse- och ursäktsundantag måste beaktas.'],
 ['Grovt försvårande av konkurs eller exekutiv förrättning','11:2','Förmögenhet',1,6,false,false,
 'Kräver uppsåt och en självständig helhetsbedömning av grovhetsgrunderna; SFS 2026:1318 höjde minimistraffet till ett år från 2026-08-01.'],
 ['Kapning','13:5a','Allmänfarliga',0,4,false,false,
 'Särskilda slags transportmedel och angivna tillgrepps- eller manövreringsgärningar. Gäller även vissa plattformar i havet.'],
 ['Grov kapning','13:5a','Allmänfarliga',2,18,false,true,
 'Grovhetsgrad enligt tredje stycket; fara för flera människoliv eller gärning av särskilt farlig art är viktiga omständigheter.'],
 ['Sjö- eller luftfartssabotage','13:5a','Allmänfarliga',0,4,false,false,
 'Gäller andra styckets skadegörelse- och farogärningar mot angivna fartyg, plattformar eller luftfartyg.'],
 ['Grovt sjö- eller luftfartssabotage','13:5a','Allmänfarliga',2,18,false,true,
 'Grovhetsgrad enligt tredje stycket, med särskild fara för flera människoliv eller särskilt farlig gärning.'],
 ['Flygplatssabotage','13:5b','Allmänfarliga',0,4,false,false,
 'Förutsätter internationellt trafikerad flygplats och gärning som är ägnad att framkalla fara för flygplatsens funktion eller säkerhet.'],
 ['Grovt flygplatssabotage','13:5b','Allmänfarliga',2,18,false,true,
 'Grovhetsgrad enligt andra stycket, bland annat fara för flera människoliv eller särskilt farlig gärning.']
];
const seen=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
let added=0;
for(const [title,ref,category,min,max,fines,life,note] of rows){
 if(seen.has(title.toLocaleLowerCase('sv')))continue;
 const id='BrB:'+ref,source=window.BK_STATUTES?.[id];if(!source?.text)throw Error('Source missing '+id);
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 D.crimes.push({
  id:'v15-additional-'+slug,title,shortRef:'BrB '+ref,ref:'BrB '+ref.replace(':',' kap. ')+' §',category,statute:id,
  aliases:[],sourceURL:URL,law:source.text,lawSource:source.ref,lawMode:'machine',
  penalty:min?'Fängelse lägst '+min+' och högst '+max+' år'+(life?' eller livstid':''):'Fängelse högst '+max+' år',
  penaltyShort:min?'F '+min+'–'+max+' år'+(life?' / livstid':''):'F högst '+max+' år',
  penaltyRange:{min,max,fines,life},penaltyChecked:'2026-10-16',penaltyRangeVerified:true,
  penaltyReviewScope:'numerical-scale-only',penaltyNote:note,penaltySourceURL:URL,
  custody:min>=1.5?'presumption':max>=1?'possible':'none',
  prosecution:'general',prosecutionLabel:'Allmänt åtal',prosecutionRule:'RB 20:3; BrB '+ref,
  prosecutionDetails:['Allmänt åtal är huvudregel; pröva alla situationella undantag.'],
  prosecutionChecked:'2026-10-16',prosecutionSourceURL:URL,
  reviewStatus:'law-text-legal-review-pending',requisitesStatus:'pending-individual-legal-review',
  elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[],
  stageExtraCheck:title.toLocaleLowerCase('sv').startsWith('grov')&&ref.startsWith('13:')?'aggravated-13-12':'',
  legalDependencies:[id]
 });seen.add(title.toLocaleLowerCase('sv'));added++;
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB11_13_15={added,source:URL};
})();