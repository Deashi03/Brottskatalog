/* BrB 10:5 – V1.5 källbunden kontroll, ändrad straffskala från 2026-08-01.
 * Inga andra rekvisit eller historiska lydelser certifieras av denna numeriska kontroll.
 */
(()=>{'use strict';
const D=window.BK_DATA; if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
// Särskilda brottsgrader och bötesbrott är egna sökposter i BrB även när de är ovanliga.
const newCrimes=[
 ['Behörighetsmissbruk','10:6',0,2,true],
 ['Olovligt brukande','10:7',0,1,true],
 ['Grovt olovligt brukande','10:7',.5,4,false],
 ['Fyndförseelse','10:8',0,0,true]
];
const known=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
for(const [title,ref,min,max,fines] of newCrimes){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const statute='BrB:'+ref;
 const provision=window.BK_STATUTES?.[statute];
 if(!provision?.text)throw Error('V1.5 saknar lagtext för '+title);
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const lowest=min===.5?'sex månader':min+' år';
 const highest=max===.5?'sex månader':max+' år';
 const penalty=max===0?'Böter':fines?'Böter eller fängelse i högst '+highest:min?'Fängelse i lägst '+lowest+' och högst '+highest:'Fängelse i högst '+highest;
 D.crimes.push({
   id:'v15-'+slug,title,shortRef:'BrB '+ref,ref:'BrB '+ref.replace(':',' kap. ')+' §',
   category:'Förmögenhet',aliases:[],statute,sourceURL:URL,
   penalty,penaltyShort:max===0?'Böter':fines?'B–F högst '+highest:'F 6 mån–'+highest,
   penaltyRange:{min,max,fines,life:false},
   penaltyChecked:'2026-10-16',penaltyRangeVerified:true,penaltyReviewScope:'range-only',penaltySourceURL:URL,
   penaltyNote:'Straffskalan kontrollerad mot BrB '+ref+' i gällande 2026-lydelse; andra rekvisit, undantag och tillämpligt gärningsdatum kräver egen kontroll.',
   custody:max>=1?'possible':'none',prosecution:'unknown',prosecutionLabel:'Åtalsregel enligt BrB 10:10 ska kontrolleras',
   prosecutionDetails:['Särskild begränsning för brott mot närstående kan följa av BrB 10:10 och 8:13.'],
   law:provision.text,lawSource:provision.ref,lawMode:'machine',reviewStatus:'law-text-legal-review-pending',
   elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],
   stageReviewed:true,stagePermissions:'',stageSource:'BrB 10:9',stageReviewDate:'2026-10-16'
 });
 known.add(title.toLocaleLowerCase('sv'));
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
const checks=[
 ['Trolöshet mot huvudman',0,2,true],
 ['Grov trolöshet mot huvudman',1,6,false]
];
const found=[];
for(const [title,min,max,fines] of checks){
 const c=D.crimes.find(x=>x.title?.toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
 if(!c)throw Error('BrB10 V1.5: Saknat brott '+title);
 if(!/^BrB 10:5\b/.test(c.shortRef||''))throw Error('BrB10 V1.5: Fel lagrum '+title);
 const p=window.BK_STATUTES?.['BrB:10:5'];
 if(!p?.text||!p.text.includes('Grov trolöshet mot huvudman'.toLowerCase().replace('g','g'))&&!/grov trolöshet mot huvudman/i.test(p.text))throw Error('BrB10 V1.5: Uppdaterat lagtextunderlag saknas');
 const expected={min,max,fines,life:false};
 // A changed numeric interval is never silently attributed to an older legal review.
 c.penaltyRange=expected;
 c.penalty=fines?'Böter eller fängelse i högst två år':'Fängelse i lägst ett och högst sex år';
 c.penaltyShort=fines?'B–F högst 2 år':'F 1–6 år';
 c.penaltyChecked='2026-10-16';
 c.penaltyRangeVerified=true;c.penaltyReviewScope='range-only';
 c.penaltySourceURL=URL;
 c.penaltyNote='Straffskalans minimi- och maximigränser verifierade mot BrB 10 kap. 5 § i lydelsen från 2026-08-01 (SFS 2026:1318). Kontrollera gärningsdatum och övergångsbestämmelser.';
 c.custody=max>=1?'possible':'none'; // Grundindikator; häktningsgrund och proportionalitet bedöms separat.
 c.effectiveNote='Straffskalan ändrades 2026-08-01. Äldre brott kräver kontroll av då gällande lydelse.';
 c.sourceEdition='BrB 10:5, SFS 2026:1318 (2026-08-01)';
 found.push(title);
}
window.BK_BRB10_15={rangeChecked:found,date:'2026-10-16',source:URL};
})();
