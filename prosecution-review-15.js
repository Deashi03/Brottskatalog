/* V1.5 – uttryckliga källbundna åtalsregler för nya BrB 4- och 10-poster.
 * Bedömning av relation, angivelse och allmän synpunkt måste ske i ärendet.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const gen=['Oskuldskontroll','Intygande av sexuell oskuld','Uppmaning till självmord','Oaktsam uppmaning till självmord'];
const relative=['Behörighetsmissbruk','Olovligt brukande','Grovt olovligt brukande','Fyndförseelse'];
let reviewed=0;
for(const c of D.crimes){
 if(c.stageType)continue;
 if(gen.includes(c.title)){
  if(!/^BrB 4:/.test(c.shortRef||''))throw Error('Invalid 4 kap. prosecution source: '+c.title);
  c.prosecution='general';c.prosecutionLabel='Allmänt åtal';c.prosecutionRule='RB 20:3; BrB 4:11';
  c.prosecutionDetails=['Allmänt åtal enligt huvudregeln RB 20:3. Brottet tillhör inte de angivna gärningarna med särskild åtalsbegränsning i BrB 4:11.'];
 }else if(relative.includes(c.title)){
  if(!/^BrB 10:/.test(c.shortRef||''))throw Error('Invalid 10 kap. prosecution source: '+c.title);
  c.prosecution='conditional';c.prosecutionLabel='Särskilda villkor för vissa närståendebrott';
  c.prosecutionRule='BrB 10:10 jämförd med 8:13 och RB 20:3';
  c.prosecutionDetails=[
   'Allmänt åtal är huvudregeln, men särskilda åtalsvillkor kan gälla om gärningen begåtts mot en närstående som anges i BrB 8:13, genom hänvisningen i BrB 10:10.',
   'Pröva i sådant fall målsägandens angivelse eller om åtal är påkallat från allmän synpunkt.',
   ...(c.title==='Olovligt brukande'?['Vid vissa innehavsförhållanden (bland annat hyra eller kreditköp) innehåller BrB 10:10 dessutom en särskild begränsning: åtal kräver särskilda skäl och allmän synpunkt.']:[])
  ];
 }else continue;
 c.prosecutionSource=c.prosecutionRule;c.prosecutionChecked='2026-10-16';
 c.prosecutionSourceURL=URL;c.prosecutionReviewStatus='named-statute-section-checked';
 reviewed++;
}
window.BK_PROSECUTION15={reviewed,source:URL,date:'2026-10-16'};
})();
