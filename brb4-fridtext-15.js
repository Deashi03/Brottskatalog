/* V1.5: BrB 4:4a and 4:4e – full Riksdagen text replaces known truncated machine import. */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const src=window.BK_STATUTES||{};
const texts={
 'BrB:4:4a':[
 '4 a § Den som mot en närstående eller tidigare närstående person begår eller på annat sätt medverkar till',
 '1. brottsliga gärningar enligt 3-6 eller 12 kap. eller enligt 24 § lagen (1988:688) om kontaktförbud, eller',
 '2. gärningar som utgör straffbart försök eller straffbar förberedelse eller stämpling till brott enligt 1',
 'döms, om var och en av gärningarna utgjort led i en upprepad kränkning av personens integritet och gärningarna varit ägnade att allvarligt skada personens självkänsla, för grov fridskränkning till fängelse i lägst ett och högst sex år.',
 'Har gärningar som anges i första stycket begåtts av en man mot en kvinna som han är eller har varit gift med eller som han bor eller har bott tillsammans med under äktenskapsliknande förhållanden, ska han i stället dömas för grov kvinnofridskränkning till samma straff. Lag (2026:852).'
 ].join('\n'),
 'BrB:4:4e':[
 '4 e § Den som mot en person begår eller på annat sätt medverkar till',
 '1. brottsliga gärningar enligt 3-6 eller 12 kap. eller enligt 24 § lagen (1988:688) om kontaktförbud, eller',
 '2. gärningar som utgör straffbart försök eller straffbar förberedelse eller stämpling till brott enligt 1',
 'döms, om ett motiv varit att bevara eller återupprätta en persons eller familjs, släkts eller annan liknande grupps heder, var och en av gärningarna utgjort led i en upprepad kränkning av personens integritet och gärningarna varit ägnade att allvarligt skada personens självkänsla, för hedersförtryck till fängelse i lägst ett och högst sex år. Lag (2026:852).'
 ].join('\n')
};
let repaired=0;
for(const [key,full] of Object.entries(texts)){
 const item=src[key];if(!item)throw Error('Missing SFS import '+key);
 if(item.text.length<full.length){
  if(!/enligt\s*$/.test(item.text.trim()))throw Error('Unexpected truncated source; require manual verification of '+key);
  item.text=full;item.complete=true;item.machine=false;item.url=SFS;item.checked='2026-10-16';repaired++;
 }
 if(!item.text.includes('Lag (2026:852)'))throw Error('Wrong statute version '+key);
}
const by=t=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
if(!by('Hedersförtryck')){
 const info=src['BrB:4:4e'];
 if(!info?.text?.includes('hedersförtryck'))throw Error('Cannot insert honor crime with incomplete statute');
 D.crimes.push({
  id:'v15-hedersfortryck',title:'Hedersförtryck',shortRef:'BrB 4:4e',ref:'BrB 4 kap. 4 e §',
  statute:'BrB:4:4e',category:'Person',aliases:[],sourceURL:SFS,
  law:info.text,lawMode:'full',lawSource:info.ref,
  lawCompletenessVerified:true,lawCompletenessSourceURL:SFS,lawCompletenessChecked:'2026-10-16',
  penalty:'Fängelse i lägst ett och högst sex år',penaltyShort:'F 1–6 år',
  penaltyRange:{min:1,max:6,fines:false,life:false},penaltyRangeVerified:true,
  penaltyReviewScope:'numerical-scale-only',penaltyChecked:'2026-10-16',penaltySourceURL:SFS,
  penaltyNote:'Hedersmotiv och upprepade integritetskränkningar enligt BrB 4:4 e; ikraftträdandefrågor och äldre gärningar måste kontrolleras.',
  custody:'possible',prosecution:'general',prosecutionLabel:'Allmänt åtal',
  prosecutionRule:'RB 20:3; BrB 4:4e',prosecutionDetails:['Generell åtalsregel; pröva konkurrens och omständigheterna i varje ingående gärning.'],
  prosecutionChecked:'2026-10-16',prosecutionSourceURL:SFS,
  reviewStatus:'law-text-and-range-reviewed',requisitesStatus:'pending-individual-legal-review',
  elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[]
 });
}
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const ordinary=[
 O('Varje underliggande gärning ska omfattas av någon av lagens grupper:', 'Brott enligt 3–6 kap. BrB','Brott enligt 12 kap. BrB','Överträdelse enligt 24 § kontaktförbudslagen','Straffbart försök, förberedelse eller stämpling till brott enligt de angivna grupperna'),
 A('Varje gärning har utgjort led i en upprepad kränkning av personens integritet.'),
 A('Gärningarna har varit ägnade att allvarligt skada den utsatta personens självkänsla.'),
 A('De ingående gärningarna och ytterligare förutsättningar omfattas av tillämpliga subjektiva brottskrav.')
];
const entries=[
 ['Grov fridskränkning','4:4a',[
  A('Den utsatta är närstående eller tidigare närstående till gärningspersonen.'),...ordinary
 ]],
 ['Grov kvinnofridskränkning','4:4a',[
  A('Gärningspersonen är en man och den utsatta en kvinna.'),
  O('Relationen är eller har varit:', 'Gifta med varandra','Sammanboende under äktenskapsliknande förhållanden'),
  ...ordinary,
  A('När dessa villkor är uppfyllda används särskild kvinnofridsrubricering i stället för grov fridskränkning.')
 ]],
 ['Hedersförtryck','4:4e',[
  ...ordinary,
  A('Ett motiv har varit att bevara eller återupprätta en persons, familjs, släkts eller jämförbar grupps heder.'),
  A('Närståenderelation är inte ett självständigt krav enligt BrB 4:4 e.')
 ]],
 ['Barnfridsbrott','4:3',[
  A('En grundgärning som uttryckligen omfattas av BrB 4:3 har begåtts.'),
  A('Ett barn har bevittnat gärningen.'),
  A('Barnet är närstående eller tidigare närstående till både gärningspersonen och personen som utsatts för grundgärningen.'),
  A('Nödvändiga objektiva omständigheter och subjektiva rekvisit måste vara styrkta.')
 ]],
 ['Grovt barnfridsbrott','4:3',[
  A('Grundrekvisiten för barnfridsbrott är uppfyllda.'),
  A('Grovhetsgraden fastställs efter helhetsbedömning. Särskilt beaktas om den bevittnade gärningen var av mycket allvarlig art eller gärningspersonen visat särskild hänsynslöshet.')
 ]]
];
let updated=0,existing=0,missing=[],mismatch=[];
for(const [title,ref,groups] of entries){
 const c=by(title);if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatch.push(title+':'+c.shortRef);continue;}
 const source=src['BrB:'+ref];if(!source?.text)throw Error('No statutory source for '+title);
 if(ref==='4:4a'||ref==='4:4e'){
  c.law=source.text;c.lawSource=source.ref;c.lawMode='full';
  c.lawCompletenessVerified=true;c.lawCompletenessSourceURL=SFS;c.lawCompletenessChecked='2026-10-16';c.sourceURL=SFS;
 }
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){existing++;continue;}
 c.rekvisit15={groups,routes:[],source:'BrB '+ref+' enligt aktuell lagtext',
   sourceURL:SFS,scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
   note:'Sammansatt brott med flera ingripande tilläggskrav: fullständig rättsutredning, prövning av underbrott, praxis och rättsligt relevant gärningstidpunkt återstår.'};
 updated++;
}
window.BK_FRID15={repaired,updated,existing,missing,mismatch,source:SFS};
})();