/* V1.5 statutory source repair – BrB 4:3, 6:6, 6:10a, 6:12.
 * Verified against the consolidated Swedish Riksdag SFS 2026-10-16.
 * Retains complete literal wording of the active provision, does not
 * represent doctrine/praxis or earlier offence dates as certified.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;
if(!D?.crimes||!W)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const current={"BrB:4:3":"3 §\nDen som begår en brottslig gärning som utgör\n1. mord, dråp, misshandel, grov misshandel eller synnerligen grov misshandel enligt 3 kap. 1, 2, 5 eller 6 §,\n2. människorov, olaga frihetsberövande, olaga tvång, grovt olaga tvång, olaga hot, grovt olaga hot, hemfridsbrott, grovt hemfridsbrott, ofredande eller psykiskt våld enligt 4 kap. 1, 2, 4, 5, 6, 7 eller 7 b §,\n3. våldtäkt, grov våldtäkt, sexuellt övergrepp, grovt sexuellt övergrepp, våldtäkt mot barn, grov våldtäkt mot barn, sexuellt utnyttjande av barn, sexuellt övergrepp mot barn, grovt sexuellt övergrepp mot barn, sexuellt ofredande mot barn, sexuellt ofredande, grovt sexuellt ofredande mot barn eller grovt sexuellt ofredande enligt 6 kap. 1, 2, 4, 5, 6 eller 10 §,\n4. skadegörelse eller grov skadegörelse enligt 12 kap. 1 eller 3 §, eller\n5. straffbart försök till brott enligt någon av 1-4\ndöms, om gärningen har bevittnats av ett barn som är närstående eller tidigare närstående till både gärningsmannen och den som gärningen begås mot, för barnfridsbrott till fängelse i högst två år. Om brottet är ringa, döms till böter eller fängelse i högst sex månader.\nOm brottet är grovt, döms för grovt barnfridsbrott till fängelse i lägst ett och högst sex år. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om den gärning som har bevittnats har varit av mycket allvarlig art eller om gärningsmannen visat särskild hänsynslöshet. Lag (2026:852).","BrB:6:6":"6 §\nDen som, med ett barn under femton år, eller med ett barn under arton år och där omständigheterna är sådana som avses i 4 § andra stycket, genomför en annan sexuell handling än som avses i 4 och 5 §§, döms för sexuellt övergrepp mot barn till fängelse i lägst sex månader och högst två år. Detsamma gäller den som på ett otillbörligt sätt förmår barnet att företa eller tåla en sådan handling.\nOm brottet är mindre grovt, döms till fängelse i högst ett år.\nOm brottet är grovt, döms för grovt sexuellt övergrepp mot barn till fängelse i lägst ett år och sex månader och högst sex år.\nVid bedömningen av om brottet är grovt ska det särskilt beaktas om gärningsmannen är närstående till barnet eller i övrigt utnyttjat sin ställning eller missbrukat ett särskilt förtroende eller om fler än en förgripit sig på barnet eller på annat sätt deltagit i övergreppet eller om brottet med hänsyn till tillvägagångssättet eller barnets låga ålder eller annars inneburit ett hänsynslöst utnyttjande av barnet. Lag (2025:586).","BrB:6:10a":"10 a §\nDen som, i syfte att mot ett barn under femton år begå en gärning för vilken straff föreskrivs i 4, 5, 6, 8 eller 10 §, föreslår en träff eller stämmer träff med barnet, döms för kontakt för att träffa ett barn i sexuellt syfte till fängelse i högst två år. Lag (2026:1318).","BrB:6:12":"12 §\nDen som främjar eller på ett otillbörligt sätt ekonomiskt utnyttjar att en person förmås att mot ersättning företa eller tåla sexuella handlingar, på det sätt som avses i 9 eller 11 §, döms för koppleri till fängelse i högst fyra år.\nOm en person som med nyttjanderätt har upplåtit en lägenhet får veta att lägenheten helt eller till väsentlig del används för sexuella handlingar mot ersättning, på det sätt som avses i 9 eller 11 §, och inte gör vad som skäligen kan begäras för att få upplåtelsen att upphöra, ska han eller hon, om verksamheten fortsätter eller återupptas i lägenheten, anses ha främjat verksamheten och dömas till ansvar enligt första stycket.\nÄr brott som avses i första eller andra stycket att anse som grovt, döms för grovt koppleri till fängelse i lägst två och högst tio år. Vid bedömande av om brottet är grovt ska det särskilt beaktas om brottet avsett en verksamhet som bedrivits i större omfattning, medfört betydande vinning eller inneburit ett hänsynslöst utnyttjande av annan. Lag (2025:586)."};
let restored=0,cards=0;
for(const [key,full] of Object.entries(current)){
 const item=W[key];
 if(!item)throw Error('Missing BrB source '+key);
 const currentHead=s=>String(s).replace(/\s+/g,' ').trim().slice(0,70);
 if(!full.replace(/\s+/g,' ').startsWith(currentHead(item.text).slice(0,35)))throw Error('Unexpected statute start '+key);
 if(item.text.length<full.length){
   restored++;
 }else if(!item.text.replace(/\s+/g,'').includes(full.replace(/\s+/g,'').slice(-20))){ // 1.7: radbrytningar i nyare import är inte en innehållsändring
   throw Error('Source newer than curated text, requires checking '+key);
 }
 // The prior modules may already have restored a source. Whether it was
 // repaired here or earlier, display the same checked statutory wording.
 item.text=full;item.complete=true;item.machine=false;
 item.checked='2026-10-16';item.url=SFS;
 for(const c of D.crimes.filter(x=>!x.stageType&&x.statute===key)){
   c.law=item.text;c.lawSource=item.ref;c.lawMode='full';
   c.lawCompletenessVerified=true;c.lawCompletenessChecked='2026-10-16';
   c.lawCompletenessSourceURL=SFS;c.sourceURL=SFS;
   cards++;
 }
}
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
let structures=0, existing=0;
const by=t=>D.crimes.find(c=>!c.stageType&&c.title?.toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
const specs=[
 ['Kontakt för att träffa ett barn i sexuellt syfte','BrB:6:10a',[],[
   {label:'Förslag eller överenskommelse om träff',groups:[
     A('Gärningspersonen föreslår en träff eller stämmer träff med barnet; efter lagändringen 2026 krävs inte en ytterligare åtgärd för att främja mötet.'),
     A('Barnet har inte fyllt 15 år; den särskilda åldersregeln i BrB 6:13 måste beaktas.'),
     O('Syftet gäller brott enligt något av lagrummen:', '6 kap. 4 §','6 kap. 5 §','6 kap. 6 §','6 kap. 8 §','6 kap. 10 §'),
     A('Gärningspersonen har särskilt uppsåt att begå en av de angivna gärningarna mot barnet.'),
     A('Undantaget i BrB 6:14 andra stycket ska prövas när det gäller syftet och ringa ålders-/utvecklingsskillnad.')
   ]}
 ]],
 ['Koppleri','BrB:6:12',[],[
   {label:'Främjande eller otillbörligt ekonomiskt utnyttjande',groups:[
     O('Gärningsform:', 'Främja att annan förmås till sexuella handlingar mot ersättning','Otillbörligt ekonomiskt utnyttja att annan förmås till sådana handlingar'),
     A('De sexuella handlingarna och ersättningssituationen omfattas av hänvisningarna till BrB 6:9 eller 6:11.'),
     A('Gärningspersonen handlar uppsåtligen.')
   ]},
   {label:'Särskild lägenhetsupplåtelse',groups:[
     A('Gärningspersonen har upplåtit en lägenhet med nyttjanderätt och får vetskap om att den helt eller till väsentlig del används för angivna sexuella handlingar mot ersättning.'),
     A('Gärningspersonen gör inte vad som skäligen kan begäras för att få upplåtelsen att upphöra.'),
     A('Verksamheten fortsätter eller återupptas i lägenheten.'),
     A('De tillämpliga subjektiva rekvisiten måste vara uppfyllda.')
   ]}
 ]],
 ['Grovt koppleri','BrB:6:12',[
   A('Gärningen omfattas av grundbrottet koppleri enligt BrB 6:12 första eller andra stycket.'),
   A('Vid helhetsbedömningen är brottet grovt. Särskilt beaktas omfattande verksamhet, betydande vinning eller hänsynslöst utnyttjande av annan; dessa faktorer är inte var och en obligatoriska.')
 ],[]]
];
for(const [title,key,groups,routes] of specs){
 const c=by(title);
 if(!c)continue;
 if(c.statute!==key)throw Error('Offence source mismatch '+title);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){existing++;continue;}
 c.rekvisit15={groups,routes,source:key,sourceURL:SFS,scope:'lagtext-jamford',
  verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Rekvisitöversikt mot gällande SFS. Undantag, praxis och tidigare laglydelse måste kontrolleras före operativ användning.'};
 structures++;
}
window.BK_TEXT_REPAIR15={restored,cards,structures,existing,refs:Object.keys(current)};
})();