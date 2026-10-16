/* V1.5 full Brottsbalken inventory: explicit overlooked BrB 4, 6 and 15 offences.
 * Source-constrained penalty structures. Nordic/international sworn testimony has
 * cross-referenced punishment scales: NEVER fabricate a single generic range.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const marriage='SFS 2026:950 gäller från 2026-07-02. För äldre gärningar måste den tidigare lydelsen kontrolleras. Gärningar mot barn omfattar även särskilt reglerad oaktsamhet om barnets ålder.';
const rows=[
 ['Äktenskapstvång','4:4c','Person',.5,6,false,marriage],
 ['Barnäktenskapsbrott','4:4c','Person',.5,6,false,marriage],
 ['Äktenskapsresebrott','4:4d','Person',0,4,false,marriage],
 ['Äktenskapsresebrott mot barn','4:4d','Person',0,4,false,marriage],
 ['Samlag med avkomling','6:7','Person',0,2,false,'Förutsätter specifik släktrelation och vaginalt samlag; subsidiär till tidigare straffbestämmelser i kapitlet. Tvång eller otillbörlig påverkan kan utesluta ansvar för den utsatta.'],
 ['Samlag med syskon','6:7','Person',0,1,false,'Avser helsyskon och vaginalt samlag, subsidiärt till tidigare bestämmelser i kapitlet. Den som förmåtts med olaga tvång eller på annat otillbörligt sätt ska inte dömas enligt denna paragraf.'],
 ['Osann utsaga inför nordisk domstol','15:4a','Rättsväsende',null,null,false,'Straff enligt BrB 15:1 eller 15:2 beroende på utsagans karaktär och processuell roll. Krav på motsvarande svensk laga ed/sanningsförsäkran.'],
 ['Ovarsam utsaga inför nordisk domstol','15:4a','Rättsväsende',null,null,false,'Grov oaktsamhet. Straff enligt BrB 15:3; tillämpliga undantag enligt BrB 15:4, 14 och 15.'],
 ['Osann utsaga inför en internationell domstol','15:4b','Rättsväsende',null,null,false,'Kräver vittne eller sakkunnig under ed vid angiven internationell domstol; straff enligt BrB 15:1 och angivna processvillkor.'],
 ['Ovarsam utsaga inför en internationell domstol','15:4b','Rättsväsende',null,null,false,'Grov oaktsamhet, straff enligt BrB 15:3. Regeln om detta särskilda oaktsamhetsbrott gäller inte utsagor vid Internationella brottmålsdomstolen.']
];
const seen=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
const span=n=>n===.5?'6 mån':n+' år';
let added=0;
for(const [title,ref,category,min,max,fines,caution] of rows){
 if(seen.has(title.toLocaleLowerCase('sv')))continue;
 const statute='BrB:'+ref,source=window.BK_STATUTES?.[statute];
 if(!source?.text)throw Error('Missing statute '+statute);
 const conditional=min===null||max===null;
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const c={
 id:'v15-family-'+slug,title,shortRef:'BrB '+ref,ref:'BrB '+ref.replace(':',' kap. ')+' §',
 statute,category,aliases:[],sourceURL:URL,
 penalty:conditional?'Straff följer angivna hänvisningar i BrB 15:1–3':min?'Fängelse lägst '+span(min)+' och högst '+span(max):'Fängelse högst '+span(max),
 penaltyShort:conditional?'Hänvisningsstraff – se lagtext':min?'F '+span(min)+'–'+span(max):'F högst '+span(max),
 penaltyRange:conditional?null:{min,max,fines,life:false},penaltyChecked:conditional?null:'2026-10-16',
 penaltyRangeVerified:!conditional,penaltyReviewScope:conditional?'cross-reference-not-numerically-reviewed':'numerical-scale-only',
 penaltySourceURL:URL,conditionalPenalty:conditional,penaltyNote:caution,
 custody:conditional?'unknown':max>=1?'possible':'none',
 prosecution:'general',prosecutionLabel:'Allmänt åtal',prosecutionRule:'RB 20:3; BrB '+ref,
 prosecutionDetails:['Allmänt åtal är huvudregel. Kontrollera eventuella person- och gärningsspecifika åtalsvillkor.'],
 prosecutionChecked:'2026-10-16',prosecutionSourceURL:URL,
 law:source.text,lawSource:source.ref,lawMode:'machine',reviewStatus:'law-text-legal-review-pending',
 elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[],
 requisitesStatus:'pending-individual-legal-review',legalDependencies:[statute],
 applicabilityWarning:caution
 };
 D.crimes.push(c);seen.add(title.toLocaleLowerCase('sv'));added++;
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB_FAMILY15={added,expected:rows.length,source:URL};
})();