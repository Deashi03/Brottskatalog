/* Brottskatalog 1.0: Beslutsbehörighet – fältvänlig översikt.
   Ett fältbesked är inte ett beslut i ett konkret fall.
   Rättskällor RB 23:8–9, 25:1–3, 26:1–3, 27:1–4/15/17 a–f, 28 kap. */
(()=>{'use strict';const reg=window.BK_COERCIVE;if(!reg)return;
const guide={
 beslag:{complex:true,ref:'RB 27:4',lines:[
 'VID LAGLIG TVÅNGSÅTGÄRD: Den som med laga rätt griper eller anhåller en misstänkt eller verkställer häktning, husrannsakan, kroppsvisitation eller kroppsbesiktning får besluta om beslag av föremål som påträffas därvid.',
 'ANNAT FYND, t.ex. på gatan: Beslut av undersökningsledare eller åklagare. Polisman får besluta endast vid fara i dröjsmål (undantaget postförsändelse hos befordringsföretag).',
 'EFTER POLISBESLUT: Anmälan skyndsamt till undersökningsledaren/åklagaren för omedelbar prövning av om beslaget ska bestå. Beslagsskäl enligt 27:1 krävs alltid.'
 ]},
 penningbeslag:{complex:true,ref:'RB 27:1 a, 4',lines:[
 'Penningbeslag gäller egendom av särskilt slag (pengar, fordringar eller annan rättighet) enligt 27:1 a.',
 'Beslagsreglerna tillämpas i övrigt i relevanta delar. Polisens beslut i samband med laglig grundåtgärd måste skiljas från beslut vid ett fristående fynd.',
 'Vid annat fynd är utgångspunkten beslut av FU-ledare/åklagare; polisman endast vid fara i dröjsmål. Kontrollera vad som faktiskt får omfattas av penningbeslag.'
 ]},
 avsparrning:{complex:true,ref:'RB 27:15 jämfört med 27:4',lines:[
 'För att säkra en brottsutredning kan plats spärras av eller tillträde förbjudas enligt 27:15.',
 'Polisens egen beslutskompetens måste bedömas utifrån hänvisningen till beslagsreglerna i 27:4: laglig bakomliggande åtgärd respektive fara i dröjsmål.',
 'I andra fall: FU-ledare/åklagare. Åtgärdens syfte, behov och proportionalitet måste prövas.'
 ]},
 kopiera:{complex:true,ref:'RB 27:17 a–b',lines:[
 'Detta är inte en fristående rätt att kopiera valfri handling.',
 'Den som med laga rätt verkställer ett beslag, en husrannsakan eller en genomsökning på distans får under bestämmelsens förutsättningar besluta om kopiering.',
 'Om grundåtgärden inte är laglig finns ingen självständig beslutsrätt om kopiering enligt denna bestämmelse.'
 ]},
 distans:{complex:true,ref:'RB 28:10 b, 10 d',lines:[
 'Huvudbeslutet fattas av behörig undersökningsledare, åklagare eller rätten.',
 'Polisman får besluta vid fara i dröjsmål under de ytterligare begränsningar som följer av 28:10 d.',
 'Kontrollera att åtgärden inte antas bli av stor omfattning eller medföra synnerlig olägenhet.'
 ]},
 forvar:{complex:true,ref:'RB 26:3',lines:[
 'Förvar för att säkerställa kvarstad beslutas som huvudregel av åklagare.',
 'Polisman får vid fara i dröjsmål ta lös egendom i förvar under bestämmelsens förutsättningar.',
 'Förvar och kvarstad har skilda beslutskompetenser.'
 ]},
 biometri:{complex:true,ref:'RB 27:17 f',lines:[
 'Polismans beslut förutsätter att en relevant laglig grundåtgärd finns.',
 'Beslutet får inte förväxlas med en fristående rätt att söka igenom enheter.'
 ]},
 telefon:{complex:true,ref:'RB 23:9 a–b',lines:[
 'Polismans befogenhet bygger på förhörssituationen och lagens nödvändighetsvillkor.',
 'Omhändertagandet måste skiljas från beslag av samma utrustning.'
 ]},
 telefonvis:{complex:true,ref:'RB 23:9 a',lines:[
 'Kroppsvisitationen får ske för att söka efter utrustning som lagligen får omhändertas.',
 'Pröva samtliga särskilda rekvisit för tvångsåtgärden.'
 ]},
 husrannsakan:{complex:true,ref:'RB 28:4–5',lines:[
 'Huvudregel: undersökningsledaren, åklagaren eller rätten beslutar.',
 'Polisman kan besluta vid fara i dröjsmål, men inte om husrannsakan för delgivning.',
 'Större omfattning eller synnerlig olägenhet kan aktualisera särskild beslutsordning.'
 ]},
 daktning:{complex:true,ref:'RB 28:14–14 b',lines:[
 'Reglerna för fingeravtryck och fotografering har särskilda ändamål och ibland andra beslutsregler.',
 'Kontrollera aktuell åtgärd och beslutsbehörighet innan beslut.'
 ]},
 dna:{complex:true,ref:'RB 28:12 a–c, 13',lines:[
 'Prov för utredningsändamål och prov för registerändamål kan omfattas av olika beslutsregler.',
 'Kontrollera vilken provtagning och misstankegrad som är aktuell.'
 ]}
};
const generic=e=>{
 const paths=reg.decisionPaths?.(e)||[];
 const police=paths.find(p=>p.id==='own'||p.id==='fid');
 const fu=paths.some(p=>p.id==='fu');
 const prosecutor=paths.some(p=>p.id==='prosecutor');
 const court=paths.some(p=>p.id==='court');
 const brief=e.officerMode==='direct'||e.officerMode==='both'?'Polisman beslutar':e.officerMode==='fid'?'Polisman FID':fu?'FU-ledare':'Särskild behörighet';
 const other=[fu?'FU-ledare':null,prosecutor?'åklagare':null,court?'rätten':null].filter(Boolean);
 return {brief,other,paths};
};
reg.decisionGuide=e=>{
 const info=guide[e.id]||{};
 const basic=generic(e);
 const paths=basic.paths;
 const complexity=!!info.complex||e.officerMode==='both'||paths.filter(x=>!['fu','prosecutor','court'].includes(x.id)).length>1||e.officerMode==='special'||(!['own','fid'].some(id=>paths.some(x=>x.id===id))&&paths.length>1);
 const fallback=info.lines||[
  basic.brief==='Polisman FID'?'Polisman får fatta beslut endast vid fara i dröjsmål; annars fattar behörig undersökningsledare/åklagare beslut.':
  basic.brief==='Polisman beslutar'?'Polismans självständiga beslutskompetens gäller endast under de särskilda förutsättningar som framgår av lagrummet.':
  'Polisman har inte en allmän självständig beslutsrätt enligt denna bestämmelse.',
  'Andra beslutsfattare: '+(basic.other.join(', ')||'se lagrummet')+'.',
  e.decisionCaution||e.info
 ];
 return {...basic,complex:complexity,ref:info.ref||e.decisionAuthority||e.ref,lines:fallback};
};
window.BK_DECISIONS10={count:reg.entries.length,complex:Object.keys(guide).length};
})();