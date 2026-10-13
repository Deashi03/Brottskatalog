/* Brottskatalog 1.3: BrB 20 kap. – reviewed against consolidated BrB and SFS registers
   on 2026-10-13. SFS 2026:1420 entered into force 2026-08-01.
   SFS 2026:1318 (20:3) entered into force 2026-08-01.
   Retain excerpt provenance: imported consolidated text is not guaranteed complete. */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const checked='2026-10-13',p20='BrB 20 kap.';
const cases=[
 ['Tjänstefel','20:1',0,2,true,'B–F 2 år','SFS 2026:1420','2026-08-01',
 ['Uppsåtligt eller oaktsamt åsidosättande av vad som gäller för uppgiften vid myndighetsutövning.','Ringa gärningar är undantagna.','Subsidiaritet: strängare eller lika strängt straffbelagd gärning bedöms enligt det andra straffbudet.']],
 ['Grovt tjänstefel','20:1',1.5,6,false,'F 1,5–6 år','SFS 2026:1420','2026-08-01',
 ['Grovt tjänstefel kräver uppsåt.','Särskilt ska beaktas allvarligt missbruk av ställning eller avsevärd skada/olägenhet eller betydande otillbörlig förmån.']],
 ['Brott mot tystnadsplikt','20:3',0,2,true,'B–F 2 år','SFS 2026:1318','2026-08-01',
 ['Uppsåtligt röjande eller utnyttjande av uppgift som omfattas av föreskriven tystnadsplikt.','Vid oaktsamhet gäller en särskild bötesregel. Ringa gärning är straffri.']],
 ['Grovt brott mot tystnadsplikt','20:3',1,6,false,'F 1–6 år','SFS 2026:1318','2026-08-01',
 ['Särskilt beaktas om gärningen kunnat medföra allvarlig skada, avsett ett stort antal uppgifter eller annars varit av särskilt farlig art.']]
];
const existing=new Map(D.crimes.map(c=>[c.title.toLocaleLowerCase('sv'),c]));
let corrected=0,missing=[];
for(const [title,ref,min,max,fines,short,sfs,effective,elems] of cases){
 const c=existing.get(title.toLocaleLowerCase('sv'));
 if(!c){missing.push(title);continue;}
 c.penaltyRange={min,max,fines,life:false};
 c.penaltyShort=short;
 c.penalty=(fines?'Böter eller fängelse':'Fängelse')+(min>0?' lägst '+(min===1.5?'1 år 6 mån':min+' år')+' och högst '+max+' år':' i högst '+max+' år');
 c.penaltyChecked=checked;
 c.penaltySource='BrB '+ref+'; '+sfs+', ikraft '+effective;
 c.penaltyRangeVerified=true;
 c.reviewStatus='penalty-reviewed-source-excerpt';
 c.sourceURL=URL;c.effectiveFrom=effective;
 c.custody=min>=1.5?'presumption':max>=1?'possible':'none';
 c.penaltyNote='Straffskala enligt '+p20+ref.slice(3)+'; '+sfs+' gäller från '+effective+'.';
 const excerpt=window.BK_STATUTES?.['BrB:'+ref];
 if(excerpt?.text){c.law=excerpt.text;c.lawMode='machine';c.lawSource=excerpt.ref+' · maskinimporterad ordalydelse, ej fullständighetsgranskad';}
 c.elements=elems;
 c.legalNote='Straffskala kontrollerad för gärningar från '+effective+'. Äldre gärningar kräver äldre lagversion.';
 corrected++;
}
const law='BrB 20 kap. 2 § (SFS 2026:1420)';
const common={
 ref:'BrB 20 kap. 2 §',shortRef:'BrB 20:2',statute:'BrB:20:2',category:'Tjänsteman',
 sourceURL:URL,effectiveFrom:'2026-08-01',penaltyChecked:checked,penaltySource:law,
 penaltyRangeVerified:true,reviewStatus:'penalty-reviewed-source-excerpt',
 prosecution:'general',prosecutionLabel:'Allmänt åtal',
 prosecutionRule:'RB 20:3; BrB 20:5',prosecutionSource:'RB 20:3; BrB 20:5',
 prosecutionChecked:checked,
 prosecutionDetails:['Allmänt åtal är huvudregel. Kontrollera gärningsrelaterade åtalsförutsättningar och särskilda beslut.'],
 aliases:['offentlig ställning','missbruk av offentligt uppdrag','offentligt maktmissbruk'],
 elements:[
  'Uppsåtligt handlande eller underlåtenhet i offentlig tjänst, offentligt uppdrag eller annan offentlig verksamhet.',
  'Åtgärden ska strida mot lag eller annan författning.',
  'Syfte att bereda otillbörlig förmån åt sig själv eller annan, eller att otillbörligt missgynna någon.',
  'Brottet är subsidiärt till tjänstefel enligt BrB 20:1.'
 ],
 stageReviewed:true,stagePermissions:'',stageSource:'BrB 20 kap. – ingen särskild förstadiekriminalisering i 20:2',
 variants:[],stages:[],facts:[],related:[],investigation:[],
};
const provisions=window.BK_STATUTES?.['BrB:20:2'];
const lawText=provisions?.text||'';
const entries=[
 {id:'v13-missbruk-offentlig-stallning',title:'Missbruk av offentlig ställning',
  penalty:'Böter eller fängelse i högst två år',penaltyShort:'B–F 2 år',
  penaltyRange:{min:0,max:2,fines:true,life:false},
  penaltyNote:'Gärningar enligt första stycket av BrB 20:2. Uppsåt krävs. Gäller från 1 augusti 2026.',
  custody:'possible'},
 {id:'v13-grovt-missbruk-offentlig-stallning',title:'Grovt missbruk av offentlig ställning',
  penalty:'Fängelse i lägst ett år och sex månader och högst sex år',
  penaltyShort:'F 1,5–6 år',penaltyRange:{min:1.5,max:6,fines:false,life:false},
  penaltyNote:'Kvalificerande omständigheter i BrB 20:2 andra stycket. Gäller från 1 augusti 2026.',
  custody:'presumption',
  elements:[...common.elements,'Särskilt beakta ansvarsfull ställning, värde/vinning/skada, organiserat eller systematiskt utförande, eller särskilt farlig art.']
 }
];
let inserted=0;
for(const e of entries){
 if(existing.has(e.title.toLocaleLowerCase('sv')))continue;
 D.crimes.push({...common,...e,aliases:[...common.aliases,e.title],
  law:lawText,lawMode:lawText?'machine':'missing',
  lawSource:lawText?'BrB 20:2 · maskinimporterad konsoliderad text; kontrollera fullständighet':law,
  lawCompletenessVerified:false,
  penaltyRangeVerified:true,
  reviewStatus:'penalty-reviewed-source-excerpt'
 });
 inserted++;
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB20_13={corrected,inserted,missing,source:URL,verified:'2026-10-13'};
})();