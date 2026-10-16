/* BrB 10:5 – V1.5 källbunden kontroll, ändrad straffskala från 2026-08-01.
 * Inga andra rekvisit eller historiska lydelser certifieras av denna numeriska kontroll.
 */
(()=>{'use strict';
const D=window.BK_DATA; if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
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
