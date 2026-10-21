/* Three active offences missed by the former döms/dömes-only inventory.
 * Current statutory outlines, not final legal or wartime applicability approval.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const war='Sverige är i krig, eller en föreskrift enligt BrB 22:10 gör krigsregeln tillämplig. Pröva även ockupationsregeln i 22:10, likställande av fiende i 22:11 och allierad stat enligt 22:9. Inget aktuellt krig eller regeringsbeslut förutsätts här.';
const rows=[
 {title:'Vårdslöshet med gift eller smittämne',ref:'13:9',min:0,max:2,fines:true,life:false,
 category:'Allmänfarliga brott',dependencies:['13:7','13:8','13:9','13:11','13:12'],
 note:'Oaktsamhetsbrott med hänvisning till gärningsformerna och allmänfaran i 13:7 eller 13:8. Frivilligt avvärjande kan medföra strafflindring enligt 13:11. Regeln om ansvarsfrihet där kräver bland annat ett straffmaximum på högst ett år och gäller därför inte automatiskt denna tvåårsskala.',
 routes:[R('Allmän fara för människors liv eller hälsa',
 O('Gärningsmedel enligt 13:7:', 'Förgifta eller infektera livsmedel, vatten eller annat','På annat sätt sprida gift eller dylikt','Överföra eller sprida allvarlig sjukdom'),
 A('Gärningen framkallar allmän fara för människors liv eller hälsa. Enbart hantering av ett ämne räcker inte.'),A('Gärningen begås av oaktsamhet enligt 13:9.')),
 R('Allmän fara för djur eller växter',
 O('Gärningsmedel enligt 13:8:', 'Gift','Överföra eller sprida elakartad sjukdom','Sprida skadedjur eller ogräs','Annat dylikt sätt'),
 A('Gärningen framkallar allmän fara för djur eller växter.'),A('Gärningen begås av oaktsamhet enligt 13:9.'))]},
 {title:'Landsförräderi',ref:'22:1',min:4,max:10,fines:false,life:true,
 category:'Rikets säkerhet',dependencies:['22:1','22:2','22:4','22:7','22:9','22:10','22:11'],
 note:war+' Särskild ansvarsfrihet i 22:4 gäller visst anskaffande av egendom eller tjänster inom ett fiendebesatt område. Mindre men eller ringare bistånd prövas som landssvek enligt 22:2.',
 routes:[R('Förrädisk gärning under lagens krigsförutsättningar',A(war),
 O('Gärningen består av något av följande:',
 'Hindra, missleda eller förråda dem som är verksamma för rikets försvar, eller förleda dem till myteri, trolöshet eller modlöshet',
 'Förråda, förstöra eller skada egendom av betydelse för totalförsvaret',
 'Anskaffa krigsfolk, egendom eller tjänster åt fienden','Annan liknande förrädisk gärning'),
 O('Dessutom krävs:', 'Gärningen är ägnad att medföra avsevärt men för totalförsvaret','Gärningen innefattar avsevärt bistånd åt fienden'),
 A('Gärningen begås uppsåtligen enligt BrB 1:2. Oaktsamhet prövas separat i 22:3.'),
 A('Undantaget i 22:4 ska prövas vid anskaffande av egendom eller tjänster åt fienden inom ett fiendebesatt område; gärningen får inte vara tillåten enligt den bestämmelsen.'))]},
 {title:'Ryktesspridning till fara för rikets säkerhet',ref:'22:5',min:0,max:2,fines:true,life:false,
 category:'Rikets säkerhet',dependencies:['22:5','22:7','22:9','22:10','22:11'],note:war+' Två skilda mottagar- och farealternativ. Gäller falska rykten eller andra osanna påståenden, inte varje kritiskt uttalande.',
 routes:[R('Allmänheten eller främmande makt',A(war),
 O('Falska rykten eller andra osanna påståenden:', 'Sprids bland allmänheten','Framförs till främmande makt','Låts framkomma till främmande makt'),
 A('Uppgifterna är ägnade att framkalla fara för rikets säkerhet.'),A('Uppsåt enligt BrB 1:2 krävs; osannhet och relevanta faktiska omständigheter ska omfattas.')),
 R('Spridning bland krigsmän',A(war),A('Falska rykten eller andra osanna påståenden sprids bland krigsmän.'),
 A('Uppgifterna är ägnade att framkalla trolöshet eller modlöshet.'),A('Gärningen begås uppsåtligen enligt BrB 1:2.'))]}
];
const out={planned:3,added:[],held:[],checked:'2026-10-20',fullLegalApprovals:0};
for(const r of rows){const statute='BrB:'+r.ref;
 if(D.crimes.some(c=>!c.stageType&&(c.statute===statute||c.title===r.title))){out.held.push(r.title);continue;}
 const p=W[statute];if(!p?.text){out.held.push(r.title);continue;}
 const wartime=r.ref.startsWith('22:');
 const penalty=r.min?'Fängelse på viss tid, lägst fyra och högst tio år, eller på livstid':'Böter eller fängelse i högst två år';
 const c={id:'v15-inventory-'+r.ref.replace(':','-'),title:r.title,shortRef:'BrB '+r.ref,
 ref:'BrB '+r.ref.replace(':',' kap. ')+' §',statute,category:r.category,aliases:[],
 penalty,penaltyShort:r.min?'F 4–10 år / livstid':'B–F 2 år',penaltyRange:{min:r.min,max:r.max,fines:r.fines,life:r.life},
 penaltyRangeVerified:false,penaltyChecked:null,penaltyReviewScope:'awaits-individual-current-source-check',penaltySourceURL:S,penaltyNote:r.note,
 applicabilityConditional:wartime,applicabilityWarning:r.note,applicabilityType:wartime?'land':'none',custody:'unknown',
 prosecution:'general',prosecutionLabel:'Allmänt åtal – särskilda villkor måste prövas',prosecutionRule:'RB 20:3; BrB '+r.ref,
 prosecutionDetails:['Utgångspunkt: allmänt åtal. Behörighet, åtalsförordnande och särskilda personförhållanden prövas separat.'],
 law:p.text,lawSource:p.ref,lawMode:'machine',sourceURL:S,
 rekvisit15:{groups:[],routes:r.routes,source:'BrB '+r.ref+' och hänvisade paragrafer',sourceURL:S,verifiedOn:'2026-10-20',scope:'lagtext-jamford',legalReviewApproved:false,note:r.note},
 typexempel15:[],elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],
 legalDependencies:r.dependencies.map(x=>'BrB:'+x),reviewStatus:'law-text-legal-review-pending',requisitesStatus:'current-outline-final-review-pending'};
 D.crimes.push(c);out.added.push(r.title);
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];window.BK_INVENTORY_COMPLETION15=out;
})();
