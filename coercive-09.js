/* Brottskatalog 0.9: strukturerad beslutsbehörighet och extra RB 23-åtgärder.
   Lagrum kontrollerade mot RB ändrad t.o.m. SFS 2026:1657. */
(()=>{'use strict';
 const reg=window.BK_COERCIVE;if(!reg)return;
 const decisions={
 husrannsakan:['fid','FU-ledare / åklagare / rätten','RB 28:4–5'],
 personell:['fid','FU-ledare / åklagare / rätten','RB 28:2, 4–5; särskilda fall i 28:4'],
 publik:['fid','FU-ledare / åklagare / rätten','RB 28:3–5'],
 brottslokal:['fid','FU-ledare / åklagare / rätten','RB 28:3–5'],
 transport:['fid','FU-ledare / åklagare / rätten','RB 28:2 a, 4–5'],
 undersokning:['direct','FU-ledare / åklagare / polisman','RB 28:10'],
 avsparrning:['both','FU-ledare / åklagare','RB 27:15 jämfört med 27:4','Direktbeslut endast vid laglig åtgärd enligt tillämpliga beslagsregler; annars fara i dröjsmål.'],
 visitation:['fid','FU-ledare / åklagare / rätten','RB 28:11, 13'],
 besiktning:['fid','FU-ledare / åklagare / rätten','RB 28:12–13'],
 dna:['fid','FU-ledare / åklagare / rätten; vissa registreringsbeslut av Polismyndigheten','RB 28:12 a–c, 13','Prov för registreringsändamål har särskild beslutsordning.'],
 daktning:['fid','FU-ledare / åklagare / rätten; vissa registreringsbeslut av Polismyndigheten','RB 28:14–14 b'],
 grupp:['none','Undersökningsledare / åklagare','RB 23:8 a–b'],
 telefon:['direct','Polisman','RB 23:9 a–b','Om personen vägrar lämna ifrån sig utrustningen och lagens övriga krav är uppfyllda.'],
 telefonvis:['direct','Polisman','RB 23:9 a','Förutsätter lagens nödvändighets- och misstankevillkor.'],
 beslag:['both','Undersökningsledare / åklagare','RB 27:4','Direkt i samband med laglig verkställighet som räknas upp i 27:4; annars polis endast vid fara i dröjsmål.'],
 penningbeslag:['both','Undersökningsledare / åklagare','RB 27:1 a, 4','Beslagsreglerna gäller i övrigt; fordringar/rättigheter har särskilda förutsättningar.'],
 postbeslag:['none','Undersökningsledare / åklagare','RB 27:3–4','Undantaget från polismans FID-beslag gäller försändelser hos befordringsföretag.'],
 kopiera:['direct','Den som lagligen verkställer grundåtgärden','RB 27:17 a–b','Inget självständigt polisbeslut utan en laglig grundåtgärd.'],
 distans:['fid','Undersökningsledare / åklagare / rätten','RB 28:10 b, 10 d','Polisman FID endast om åtgärden inte kan antas bli av stor omfattning eller medföra synnerlig olägenhet.'],
 biometri:['direct','Polisman','RB 27:17 f','Kräver laglig genomsökning; villkoren knyts till den bakomliggande åtgärden.'],
 bevara:['none','Undersökningsledare / åklagare','RB 27:16–16 a'],
 forvar:['fid','Åklagare','RB 26:3','Polis vid FID endast lös egendom.'],
 kvarstad:['none','Rätten','RB 26:1–2'],
 reseforbud:['none','Åklagare / rätten','RB 25:1–3']
 };
 const idMap=Object.fromEntries(reg.entries.map(e=>[e.id,e]));
 for(const [id,[officer,other,authority,caution='']] of Object.entries(decisions)){
  const e=idMap[id];if(!e)continue;
  e.officerMode=officer;e.otherDecision=other;e.decisionAuthority=authority;e.decisionCaution=caution;e.reviewed09=true;
 }
 const additional=[
 {id:'medtagande-plats',group:'Utredningsåtgärder',title:'Medtagande till omedelbart förhör – brottsplatsen',ref:'RB 23:8 st. 1',scale:'any',officerMode:'direct',otherDecision:'Polisman',decisionAuthority:'RB 23:8 st. 1',info:'Den som befinner sig där brott förövas ska på polismans tillsägelse följa med till förhör omedelbart därefter. Vägran utan giltig orsak är förutsättning för tvångsvis medtagande. Även före FU.'},
 {id:'medtagande-omrade',group:'Utredningsåtgärder',title:'Medtagande till förhör – anslutande område',ref:'RB 23:8 st. 2',scale:'four',officerMode:'direct',otherDecision:'Polisman',decisionAuthority:'RB 23:8 st. 2',info:'Den som finns i anslutning till platsen för ett nyligen begånget brott med minst fyra års minimistraff, eller försök till sådant brott, kan medtas vid vägran utan giltig orsak. Även före FU.'},
 {id:'kvarstannande',group:'Utredningsåtgärder',title:'Kvarstannande för förhör – tidsgränser',ref:'RB 23:9',scale:'any',officerMode:'special',otherDecision:'Lagstadgad skyldighet; inte ett generellt fristående polisbeslut',decisionAuthority:'RB 23:9',info:'Den som inte är anhållen/häktad behöver inte stanna längre än sex timmar; vid synnerlig vikt för fortsatt förhör kan den som kan misstänkas vara skyldig att stanna ytterligare sex timmar. Särskilda regler för unga personer.'}
 ];
 reg.entries.unshift(...additional);
 const savedScore=reg.score;
 reg.score=(c,e)=>{
  if(c?.stageStatus&&c.stageStatus!=='punishable')return {label:'Brottets straffbarhet ej verifierad eller saknas',tone:'no'};
  if(e.scale==='fSpecial')return {label:'Ingen absolut straffskalegräns (RB 25:1)',tone:'yes'};
  if(e.scale==='specific')return {label:'Brottstypen utesluter inte – särskilda villkor',tone:'yes'};
  if(e.scale==='four'){
   const parentAttempt=c?.stageType==='forsok'&&Number(c.stageParentMin)>=4;
   if(parentAttempt)return {label:'Försök till brott med minimistraff ≥ 4 år',tone:'yes'};
  }
  return savedScore(c,e);
 };
 // Separera varje beslutsväg. "Nej" avser aldrig en beslutsfattare.
 // Dessa uppgifter beskriver behörighet, inte att en åtgärd är tillåten i det enskilda fallet.
 const paths={
  husrannsakan:['fu','prosecutor','court','fid'],
  personell:['fu','prosecutor','court','fid'],
  publik:['fu','prosecutor','court','fid'],
  brottslokal:['fu','prosecutor','court','fid'],
  transport:['fu','prosecutor','court','fid'],
  undersokning:['own','fu','prosecutor'],
  avsparrning:['own','fid','fu','prosecutor'],
  visitation:['fu','prosecutor','court','fid'],
  besiktning:['fu','prosecutor','court','fid'],
  dna:['fu','prosecutor','court','fid'],
  daktning:['fu','prosecutor','court','fid'],
  grupp:['fu','prosecutor'],
  telefon:['own'],telefonvis:['own'],
  beslag:['own','fid','fu','prosecutor'],
  penningbeslag:['own','fid','fu','prosecutor'],
  postbeslag:['fu','prosecutor'],
  kopiera:['own'],
  distans:['fu','prosecutor','court','fid'],
  biometri:['own'],
  bevara:['fu','prosecutor'],
  forvar:['fid','prosecutor'],
  kvarstad:['court'],
  reseforbud:['prosecutor','court'],
  'medtagande-plats':['own'],
  'medtagande-omrade':['own'],
  kvarstannande:['special']
 };
 const decisionNames={fu:'FU-ledare',fid:'Polisman FID',own:'Eget beslut',prosecutor:'Åklagare',court:'Rätten',special:'Särskild regel'};
 reg.decisionPaths=e=>(paths[e.id]||['special']).map(id=>({id,label:decisionNames[id]}));
 reg.officerSummary=e=>{
  const val=e.officerMode||'special';
  return val==='direct'?'Eget beslut':val==='fid'?'Polisman FID':val==='both'?'Eget beslut / Polisman FID':val==='none'?'Annans beslut':'Särskild regel';
 };
 reg.eligible=(c,e)=>{
  const v=reg.score(c,e);
  return v.tone==='yes'||v.tone==='neutral'||v.tone==='conditional';
 };
 window.BK_COERCIVE09={version:'0.9',verifiedDecisions:Object.keys(decisions).length,extra:additional.length};
})();