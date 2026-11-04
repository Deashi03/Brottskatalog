/* Brottskatalog 1.9 – rättelser i tvångsmedelslistan.
 * Kontrollerat mot RB t.o.m. SFS 2026:1657 och förundersökningskungörelsen 6 § den 2026-11-04.
 *  - RB 28:14–14 b ändrades genom SFS 2025:128 (fler underlag, obligatorisk upptagning vid anhållande/häktning, ny beslutsregel i 14 b §).
 *  - Hämtning till förhör (RB 23:7) och kvarhållande av försändelse (RB 27:9) saknades.
 *  - Tidsgränserna för kvarhållande vid kroppsvisitation och kroppsbesiktning (RB 28:13 a) skrivs in.
 */
(()=>{'use strict';
const reg=window.BK_COERCIVE;if(!reg)return;
const byId=id=>reg.entries.find(e=>e.id===id);
const d=byId('daktning');
if(d)Object.assign(d,{
 title:'Fingeravtryck, foto, video, röst- och handstilsprov',ref:'RB 28:14–14 b',decisionAuthority:'RB 28:14 b',
 info:'Skäligen misstänkt för brott med fängelse i straffskalan: fingeravtryck (även handavtryck), fotografi, video, röstprov och handstilsprov får tas för utredningen eller för registrering i biometriregister. Avtryck av fot och öra får tas för utredningen. Fingeravtryck och fotografi av ansiktet ska tas av den som är anhållen eller häktad. Annan än misstänkt: endast vid synnerlig anledning (28:14 a). Polisman får besluta vid fara i dröjsmål; Polismyndigheten får besluta om upptagning för registrering (28:14 b).'
});
const v=byId('visitation');if(v&&!/13 a/.test(v.info))v.info+=' Den som ska kroppsvisiteras får hållas kvar högst tre timmar, och ytterligare tre timmar om det finns synnerliga skäl (RB 28:13 a).';
const b=byId('besiktning');if(b&&!/13 a/.test(b.info))b.info+=' Den som ska kroppsbesiktigas får hållas kvar högst sex timmar, och ytterligare sex timmar om det finns synnerliga skäl (RB 28:13 a).';
const added=[
 {id:'hamtning',group:'Utredningsåtgärder',title:'Hämtning till förhör',ref:'RB 23:7',scale:'any',officerMode:'fid',
  otherDecision:'Undersökningsledare',decisionAuthority:'RB 23:7; förundersökningskungörelsen 6 §',
  decisionCaution:'Förhörsledaren beslutar själv om han eller hon får gripa eller medta personen enligt RB 23:8, eller vid fara i dröjsmål. Annars prövar undersökningsledaren frågan.',
  info:'Den som utan giltig orsak inte följer en kallelse till förhör får hämtas, om förhöret hålls inom tio mil från bostaden eller vistelseorten. Utan föregående kallelse får hämtning ske om brottet kan ge fängelse och det skäligen kan befaras att personen inte skulle följa kallelsen eller skulle försvåra utredningen. Vid synnerlig vikt gäller ingen avståndsgräns. Vittnen och andra som inte är misstänkta bör hämtas bara vid skäl av särskild vikt.'},
 {id:'kvarhallande-forsandelse',group:'Föremål och digitalt',title:'Kvarhållande av försändelse',ref:'RB 27:9',scale:'one',officerMode:'none',
  otherDecision:'Rätten, på yrkande av undersökningsledare eller åklagare',decisionAuthority:'RB 27:9',
  info:'Rätten får förordna att en försändelse som får tas i beslag och som väntas komma in till ett befordringsföretag ska hållas kvar tills frågan om beslag har avgjorts. Förordnandet gäller högst en månad. Samma brottskrav som för beslag hos befordringsföretag: fängelse i ett år eller mer.'}
];
for(const e of added)if(!byId(e.id))reg.entries.push(e);
const paths={hamtning:['fu','fid'],'kvarhallande-forsandelse':['court']};
const names={fu:'FU-ledare',fid:'Polisman FID',court:'Rätten'};
const prev=reg.decisionPaths;
reg.decisionPaths=e=>paths[e.id]?paths[e.id].map(id=>({id,label:names[id]})):(prev?prev(e):[]);
window.BK_COERCIVE19={added:added.map(e=>e.id),checked:'2026-11-04'};
})();
