/* V1.5 – base elements and careful grading of statutory aggravated/minor forms.
 * Qualifying factors introduced by "ska särskilt beaktas" are INDICATORS,
 * not independent mandatory conjunctions. Every grade requires holistic review.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const base=[
 ['Olaga tvång','4:4',[
  {label:'Alternativ A – våld eller hot om brottslig gärning',groups:[
   O('Tvångsmedlet består av:','Misshandel eller annat våld','Hot om brottslig gärning'),
   A('Någon tvingas att göra, tåla eller underlåta något.'),
   A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – särskilda hot som är otillbörliga',groups:[
   O('Hotet avser:', 'Att åtala eller ange någon annan för brott','Att lämna menligt meddelande om någon annan'),
   A('Tvånget får personen att göra, tåla eller underlåta något.'),
   A('Tvånget är otillbörligt och gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Hemfridsbrott','4:6',[
  {label:'Alternativ A – bostaden',groups:[
   O('Någon olovligen:', 'Tränger in i annans bostad eller liknande boende','Stannar kvar i annans bostad eller liknande boende'),
   A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – bostadens område',groups:[
   O('Någon olovligen:', 'Tränger in i trädgård, gårdsplan eller liknande plats som tillhör bostaden','Stannar kvar på sådan plats'),
   A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Olaga intrång','4:6',[
  {label:'Intrång eller kvarstannande utanför hemfridsskyddat utrymme',groups:[
   O('Gärningen utgör:', 'Obehörigt inträngande','Obehörigt kvarstannande'),
   A('Platsen är byggnad, fartyg, gårdsplan eller annan liknande plats och inte en plats som omfattas av hemfridsbrottets särskilda stycke.'),
   A('Gärningspersonen handlar uppsåtligen.') ]}
 ]]
];
const by=t=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
let baseAdded=0;
for(const [title,ref,routes] of base){
 const c=by(title);if(!c)continue;
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref)throw Error('Ref mismatch '+title);
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Missing statutory text for '+title);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)continue;
 c.rekvisit15={groups:[],routes,source:'BrB '+ref+' och 1:2',sourceURL:URL,scope:'lagtext-jamford',
  verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Varje alternativ är en egen gärningsväg. Se originalbestämmelsen, relevanta rättsfall och gärningsdatum; denna struktur är inte juridiskt slutcertifierad.'};
 baseAdded++;
}
// Earlier experimental catalogue mislabelled the less-serious form as
// "Grovt olaga frihetsberövande". BrB 4:2 has only a LESS GROSS
// alternative penalty, not an offence named "Grovt olaga frihetsberövande".
const oldGrave=by('Grovt olaga frihetsberövande');
if(oldGrave){
 const source=window.BK_STATUTES?.['BrB:4:2']?.text||'';
 if(!source.includes('mindre grovt'))throw Error('Cannot repair BrB 4:2 without current statutory source');
 oldGrave.title='Olaga frihetsberövande (mindre grovt fall)';
 oldGrave.shortRef='BrB 4:2';oldGrave.ref='BrB 4 kap. 2 §';
 oldGrave.penalty='Böter eller fängelse i högst två år';
 oldGrave.penaltyShort='B–F högst 2 år';
 oldGrave.penaltyRange={min:0,max:2,fines:true,life:false};
 oldGrave.penaltyRangeVerified=true;oldGrave.penaltyChecked='2026-10-16';
 oldGrave.penaltyReviewScope='numeric-range-only';oldGrave.penaltySourceURL=URL;
 oldGrave.penaltyNote='Lagtextens mindre grova fall har egen straffskala. Detta är ingen självständig brottsrubricering ”grovt olaga frihetsberövande”.';
 oldGrave.skipStageGeneration=true; // Only a penalty branch; not an independently named crime.
 oldGrave.aliases=[...(oldGrave.aliases||[]).filter(x=>!/grovt olaga frihetsberövande/i.test(x))];
 oldGrave.legalDependencies=['BrB:4:2'];
 const p=by('Olaga frihetsberövande');
 if(p?.rekvisit15){
  oldGrave.rekvisit15={...JSON.parse(JSON.stringify(p.rekvisit15)),
   groups:[...(p.rekvisit15.groups||[])],
   routes:(p.rekvisit15.routes||[]).map(r=>({...r,groups:[...r.groups,A('Vid helhetsbedömningen ska gärningen anses mindre grov för den lindrigare straffskalan.')]})),
   source:'BrB 4:2 (mindre grovt fall)',scope:'lagtext-jamford',legalReviewApproved:false};
 }
}
// Grade type: the requirement to assess the crime holistically cannot be
// replaced by an automatic checkbox for "weapon", "value" or "injury".
const grades=[
 ['Ringa misshandel','Misshandel','3:5','Vid en samlad bedömning är den uppsåtliga misshandeln ringa; ringa-graden är ingen egen gärningsform.'],
 ['Grov misshandel','Misshandel','3:6','Grovhet efter helhetsbedömning. Särskilt beakta livsfarlig gärning, svår kroppsskada/allvarlig sjukdom eller särskild hänsynslöshet/råhet.'],
 ['Synnerligen grov misshandel','Misshandel','3:6','Synnerligen grov efter helhetsbedömning. Särskilt beakta bestående skada, synnerligt lidande eller synnerlig hänsynslöshet.'],
 ['Grovt vållande till annans död','Vållande till annans död','3:7','Grovt oaktsamt vållande efter helhetsbedömning. Särskilt beakta medvetet allvarligt risktagande eller allvarlig försummelse, exempelvis vid påverkan.'],
 ['Grovt vållande till kroppsskada eller sjukdom','Vållande till kroppsskada eller sjukdom','3:8','Grovhetsbedömning: särskilt beakta medvetet risktagande av allvarligt slag, påverkan eller försummelse av allvarligt slag.'],
 ['Grovt olaga tvång','Olaga tvång','4:4','Grovt brott efter helhetsbedömning: särskilt våld av allvarligt slag, kraftigt förstärkt eller annat allvarligt hot, eller särskild hänsynslöshet/farlighet.'],
 ['Grovt olaga hot','Olaga hot','4:5','Grovt brott efter helhetsbedömning: särskilt förstärkt hot med vapen, sprängämne, vapenattrapp eller anspelning på våldskapital eller särskilt hänsynslöst/farligt beteende.'],
 ['Grovt hemfridsbrott','Hemfridsbrott','4:6','Grovt brott efter helhetsbedömning: särskilt inbrott, våld/hot/ofredande/skadegörelse eller särskild hänsynslöshet/farlighet.'],
 ['Grovt olaga intrång','Olaga intrång','4:6','Grovt brott efter helhetsbedömning: särskilt inbrott, våld/hot/ofredande/skadegörelse eller särskild hänsynslöshet/farlighet.'],
 ['Ringa stöld','Stöld','8:2','Tillgreppet är ringa efter samlad bedömning av tillgripet värde och övriga omständigheter.'],
 ['Grov stöld','Stöld','8:4','Grovt brott efter helhetsbedömning: särskilt nära-eller-på-buren egendom, vapen eller hjälpmedel, systematik, betydande värde, synnerligen kännbar skada eller särskild hänsynslöshet/farlighet.'],
 ['Grovt tillgrepp av fortskaffningsmedel','Tillgrepp av fortskaffningsmedel','8:7','Grovhet bedöms utifrån bland annat våld/hot, särskild farlighet/hänsynslöshet, betydande värde eller synnerligen kännbar skada.'],
 ['Grovt egenmäktigt förfarande','Egenmäktigt förfarande','8:8','Grovhet bedöms samlat, särskilt våld/hot, särskild farlighet/hänsynslöshet, betydande värde eller synnerligen kännbar skada.'],
 ['Grov olovlig energiavledning','Olovlig energiavledning','8:10','Grovhet bedöms samlat, särskilt farlig gärning, betydande värde eller synnerligen kännbar skada.'],
 ['Grovt bedrägeri','Bedrägeri','9:3','Grovt brott efter helhetsbedömning: särskilt förtroendemissbruk, falska handlingar, utsatt offer, betydande värde, synnerlig skada, organisering/systematik eller särskild farlighet.'],
 ['Grov utpressning','Utpressning','9:4','Grovhet: särskilt allvarligt våld, kraftigt förstärkt eller annat allvarligt hot, eller särskild hänsynslöshet/farlighet.'],
 ['Grovt ocker','Ocker','9:5','Grovt brott efter helhetsbedömning, särskilt betydande värde, särskild farlighet eller hänsynslöshet.'],
 ['Grovt häleri','Häleri','9:6','Grovt brott efter helhetsbedömning: särskilt betydande värde, systematisk brottslighet eller särskild farlighet.'],
 ['Ringa förskingring','Förskingring','10:2','Förskingringen är ringa med hänsyn till värdet och övriga omständigheter.'],
 ['Grov förskingring','Förskingring','10:3','Grovhet efter helhetsbedömning: ansvarsfull ställning, falsk urkund, vilseledande bokföring, särskild farlighet, betydande värde eller synnerligen kännbar skada.'],
 ['Grovt olovligt förfogande','Olovligt förfogande','10:4','Grovhet efter helhetsbedömning: särskilt betydande värde, synnerligen kännbar skada eller farlig/hänsynslös art.'],
 ['Grovt olovligt brukande','Olovligt brukande','10:7','Grovhet efter helhetsbedömning: särskilt farlig/hänsynslös art, betydande värde eller synnerligen kännbar skada.'],
 ['Ringa skadegörelse','Skadegörelse','12:2','Ringa brott med hänsyn till skadans obetydlighet och övriga omständigheter.'],
 ['Grov skadegörelse','Skadegörelse','12:3','Grovt brott efter helhetsbedömning: fara för liv/hälsa, kulturellt/ekonomiskt värde, synnerligen kännbar skada eller särskild hänsynslöshet.'],
 ['Grov urkundsförfalskning','Urkundsförfalskning','14:3','Grovt brott efter helhetsbedömning: pröva särskilda kvalifikationsomständigheter i BrB 14:3.'],
 ['Förvanskning av urkund','Urkundsförfalskning','14:2','Ringa förfalskningsbrott: bedöm samlat, särskilt urkundens mindre vikt eller syfte att hjälpa annan till sin rätt.'],
 ['Grovt våld eller hot mot tjänsteman','Våld eller hot mot tjänsteman','17:1','Grovhet efter helhetsbedömning: särskilt allvarligt våld, förstärkt/allvarligt hot eller hänsynslös/farlig art.'],
 ['Grovt tjänstefel','Tjänstefel','20:1','För grovt tjänstefel krävs uppsåt (vanligt tjänstefel kan även begås av oaktsamhet) och en helhetsbedömning, särskilt allvarligt missbruk av ställning eller avsevärd skada/olägenhet eller betydande otillbörlig förmån.'],
 ['Grovt brott mot tystnadsplikt','Brott mot tystnadsplikt','20:3','För grovt brott mot tystnadsplikt krävs uppsåt. Särskilt beakta allvarlig skaderisk, stort antal uppgifter eller särskild farlighet.']
];
let added=0,notFound=[],parentMissing=[];
const removeLastOaktsamhet=(group)=>group.filter(g=>!g.label.includes('Skuldformen'));
for(const [title,parentName,ref,grade] of grades){
 const c=by(title);
 if(!c){notFound.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){
  // Some earlier catalog cards have stale law numbers: a mismatch is a
  // legal defect and should fail CI rather than relabel a random offence.
  throw Error('Gradens lagrum avviker för '+title+': '+c.shortRef+' förväntat BrB '+ref);
 }
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Lagdokument saknas BrB '+ref);
 const parent=by(parentName);
 if(!parent?.rekvisit15 || !(parent.rekvisit15.groups?.length||parent.rekvisit15.routes?.length)){
  parentMissing.push(parentName);continue;
 }
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)continue;
 const core=JSON.parse(JSON.stringify(parent.rekvisit15));
 const isGrov=title.startsWith('Grov')||title.startsWith('Synnerligen grov');
 const last=A('Gradindelning (helhetsbedömning): '+grade);
 const groups=(core.groups||[]).map(g=>({...g}));
 let routes=(core.routes||[]).map(r=>({label:r.label,groups:[...r.groups.map(g=>({...g})),last]}));
 if(isGrov&&title==='Grovt tjänstefel'){
  // Do not accidentally preserve oaktsamhet as a permissible subjective
  // fault form for the aggravated, intent-only offence.
  routes=routes.map(r=>({...r,groups:removeLastOaktsamhet(r.groups)}));
  const idx=groups.findIndex(g=>g.mode==='any'&&g.label.startsWith('Skuldformen'));
  if(idx>=0)groups[idx]=A('Gärningen begås uppsåtligen; oaktsamhet ensam räcker inte för grovt tjänstefel.');
 }
 if(isGrov&&title==='Grovt brott mot tystnadsplikt'){
  routes=routes.map(r=>({...r,groups:r.groups.map(g=>g.mode==='any'&&g.label.startsWith('Skuldformen')?A('Gärningspersonen handlar uppsåtligen; oaktsamhet är inte tillräcklig för grovt brott.'):g)}));
 }
 if(!routes.length)groups.push(last);
 c.rekvisit15={groups,routes,source:'BrB '+ref+' samt grundbrottet '+parent.shortRef,
  sourceURL:URL,scope:'lagtext-jamford',legalReviewApproved:false,verifiedOn:'2026-10-16',
  note:'Grundbrottets rekvisit återges med särskild gradbedömning. Exemplen i lagtextens ”ska särskilt beaktas” är bedömningsfaktorer och inte var för sig obligatoriska rekvisit. Full juridisk slutgranskning återstår.'};
 added++;
}
window.BK_REKVISIT_GRADES15={baseAdded,added,notFound,parentMissing,source:URL,fullLegalReview:false};
})();