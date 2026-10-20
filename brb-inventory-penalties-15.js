/* Current offence-grade scale only. Wartime applicability remains conditional. */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/",pins={"BrB:13:9":"9 §\nBegår någon av oaktsamhet en gärning som anges i 7 eller 8 §, skall han dömas för vårdslöshet med gift eller smittämne till böter eller fängelse i högst två år.\nLag (1998:809).","BrB:22:1":"1 §\nDen som, då riket är i krig,\n1. hindrar, missleder eller förråder dem som är verksamma för rikets försvar eller förleder dem till myteri, trolöshet eller modlöshet,\n2. förråder, förstör eller skadar egendom som är av betydelse för totalförsvaret,\n3. åt fienden anskaffar krigsfolk, egendom eller tjänster, eller\n4. begår annan liknande förrädisk gärning,\nskall, om gärningen är ägnad att medföra avsevärt men för totalförsvaret eller innefattar avsevärt bistånd åt fienden, dömas för landsförräderi till fängelse på viss tid, lägst fyra och högst tio år, eller på livstid.\nLag (1986:645).","BrB:22:5":"5 §\nOm någon, då riket är i krig, bland allmänheten sprider eller till främmande makt framför eller låter framkomma falska rykten eller andra osanna påståenden som är ägnade att framkalla fara för rikets säkerhet, skall han dömas för ryktesspridning till fara för rikets säkerhet till böter eller fängelse i högst två år.\nDetsamma skall gälla om någon då riket är i krig bland krigsmän sprider falska rykten eller andra osanna påståenden som är ägnade att framkalla trolöshet eller modlöshet.\nLag (1986:645)."};
const n=s=>String(s||'').normalize('NFC').replace(/\s+/g,' ').trim();
const rows=[['13:9',0,2,true,false],['22:1',4,10,false,true],['22:5',0,2,true,false]];
const report={planned:3,completed:0,held:[],checked:'2026-10-20',caseSpecificScaleApprovals:0};
for(const [ref,min,max,fines,life] of rows){const key='BrB:'+ref,c=D.crimes.find(c=>!c.stageType&&c.id==='v15-inventory-'+ref.replace(':','-')),p=W[key];
 if(!c)continue;c.penaltyRangeVerified=false;
 const r=c.penaltyRange,ready=p?.complete===true&&p.machine===false&&p.url===S
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&/^2026-10-(18|19|20)$/.test(p.checked||'')&&n(p.text)===n(pins[key])
 &&c.lawMode==='full'&&c.lawCompletenessVerified===true&&n(c.law)===n(p.text)
 &&r?.min===min&&r.max===max&&r.fines===fines&&r.life===life;
 if(!ready){report.held.push(key);continue;}
 Object.assign(c,{penaltyRangeVerified:true,penaltyChecked:'2026-10-20',penaltyReviewScope:'individual-current-grade-range-only',
 penaltyGradeReviewDate:'2026-10-20',penaltyGradeReviewSource:S,penaltyGradeReviewProvision:'BrB '+ref,
 penaltyGradeReviewCaveat:c.penaltyNote,penaltyReviewSafety:'Current numerical statutory scale only; no historic, case liability, war activation or coercion decision.'});report.completed++;
}
window.BK_INVENTORY_PENALTIES15=report;
})();