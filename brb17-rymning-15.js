/* V1.5 – SFS 2026:924 BrB 17:12–12a.
 * Preserve old item ID and stored favorites while correcting obsolete 17:12
 * Främjande av flykt (now 17:12a) and adding all four current grades.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const config=[
 ['Rymning','17:12',0,2,false,'F'],
 ['Grov rymning','17:12',.5,4,false,'F'],
 ['Främjande av rymning eller flykt','17:12a',0,1,true,'FP'],
 ['Grovt främjande av rymning eller flykt','17:12a',.5,4,false,'FP']
];
const old=D.crimes.find(c=>String(c.title||'').toLocaleLowerCase('sv')==='främjande av flykt'&&!c.stageType);
if(old&&old.shortRef!=='BrB 17:12')throw Error('Unexpected old offence law reference; refuse unsafe migration');
for(const [title,ref,min,max,fines,stagePermissions] of config){
 const statute='BrB:'+ref,source=window.BK_STATUTES?.[statute];
 if(!source?.text||!source.text.includes('2026:924'))throw Error('Missing current SFS 2026:924 for '+title);
 let c=title==='Främjande av rymning eller flykt'?old:
   D.crimes.find(x=>!x.stageType&&String(x.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
 if(!c){
  const id='v15-rymning-'+title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
  c={id,title,category:'Rättsväsende',aliases:[],elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[]};
  D.crimes.push(c);
 }
 const isOld=c===old;
 c.title=title;
 if(isOld)c.aliases=[...new Set([...(c.aliases||[]),'Främjande av flykt'])];
 c.shortRef='BrB '+ref;c.ref='BrB '+ref.replace(':',' kap. ')+' §';c.statute=statute;
 c.law=source.text;c.lawSource=source.ref;c.lawMode='machine';c.sourceURL=URL;
 c.penalty=(fines?'Böter eller fängelse':'Fängelse')+(min?' i lägst sex månader och högst '+max+' år':' i högst '+max+' år');
 c.penaltyShort=(fines?'B–F ':min?'F 6 mån–':'F högst ')+max+' år';
 c.penaltyRange={min,max,fines,life:false};c.penaltyRangeVerified=true;
 c.penaltyChecked='2026-10-16';c.penaltyReviewScope='numerical-scale-only';c.penaltySourceURL=URL;
 c.penaltyNote='SFS 2026:924. Gäller från ikraftträdandet 2026; äldre gärningstidpunkt kräver kontroll av tidigare lagtext. Brottet är inte straffbart om gärningen är ringa (17:12 respektive 17:12 a).';
 c.custody=max>=1?'possible':'none';
 c.prosecution='general';c.prosecutionLabel='Allmänt åtal';
 c.prosecutionRule='RB 20:3; BrB 17:'+ref.split(':')[1];
 c.prosecutionDetails=['Allmänt åtal enligt RB 20:3; kontrollera tillämpligt rättsläge och om gärningen faktiskt omfattas av frihetsberövande i BrB 17:12 respektive 12 a.'];
 c.prosecutionChecked='2026-10-16';c.prosecutionSourceURL=URL;
 c.stageReviewed=true;c.stagePermissions=stagePermissions;c.stageSource='BrB 17:16';
 c.stageReviewDate='2026-10-16';c.reviewStatus='law-text-legal-review-pending';
 c.requisitesStatus='pending-individual-legal-review';c.legalDependencies=[statute,'BrB:17:16'];
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_RYMNINGS_REFORM15={sfs:'2026:924',checked:'2026-10-16',entries:config.length,migratedHistoricId:old?.id||null};
})();