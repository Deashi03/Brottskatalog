/* v0.7. Straffskaleindikatorer är INTE automatiska tvångsmedelsbeslut. Källa: RB 23–28 kap. 2026-10-12. */
(()=>{'use strict';
const D=window.BK_DATA;if(!D)return;
const entries=[
{id:'husrannsakan',group:'Plats',title:'Reell husrannsakan',ref:'RB 28:1, 4–5',scale:'f',decision:'FU-ledare/åklagare · polis FID',info:'Fängelse i straffskalan och anledning att anta brott. Hos skäligen misstänkt eller, med ytterligare rekvisit, hos annan. Polisman endast vid fara i dröjsmål.'},
{id:'personell',group:'Plats',title:'Personell husrannsakan',ref:'RB 28:2, 4–5',scale:'specific',decision:'FU-ledare/åklagare · polis FID',info:'För att söka person som ska gripas, anhållas, häktas, hämtas eller genomgå viss åtgärd. Förutsättningarna för den bakomliggande åtgärden avgör. Särskilda villkor hos tredje man.'},
{id:'publik',group:'Plats',title:'Husrannsakan i offentlig lokal',ref:'RB 28:3 st. 1, 4–5',scale:'any',decision:'FU-ledare/åklagare · polis FID',info:'Endast lokaler som är tillgängliga för allmänheten. Ändamålet måste motsvara RB 28:1–2. Inte automatiskt hela byggnaden.'},
{id:'brottslokal',group:'Plats',title:'Husrannsakan i gemensam brottslokal',ref:'RB 28:3 st. 2, 4–5',scale:'one',decision:'FU-ledare/åklagare · polis FID',info:'Gemensamt nyttjad lokal för misstänkt brottslig verksamhet; normalt fängelse minst ett år i straffskalan och särskild anledning att nå ändamålet. Inte huvudsaklig bostad.'},
{id:'transport',group:'Plats',title:'Husrannsakan i transportmedel för eftersökt person',ref:'RB 28:2 a, 4–5',scale:'four',decision:'FU-ledare/åklagare · polis FID',info:'För eftersökande av någon som ska gripas, anhållas eller häktas vid brott med minst fyra års minimistraff eller försök till sådant brott, och särskild anledning att personen passerar platsen.'},
{id:'undersokning',group:'Plats',title:'Undersökning av annat ställe',ref:'RB 28:10',scale:'any',decision:'Polisman direkt',info:'Undersökning av andra platser än hus, rum eller slutna förvaringsställen, för ändamål i RB 28:1–2. Annat tvångsmedel kan behövas för att få tillträde.'},
{id:'avsparrning',group:'Plats',title:'Avspärrning och tillträdesförbud',ref:'RB 27:15 jfr 27:4',scale:'any',decision:'FU-ledare/åklagare · polis enligt beslagsregler',info:'För att säkra brottsutredning, t.ex. avspärrning av plats. RB 27:4 tillämpas i tillämpliga delar; kontrollera polisens beslut i den konkreta situationen.'},
{id:'visitation',group:'Person',title:'Kroppsvisitation',ref:'RB 28:11, 13',scale:'f',decision:'FU-ledare/åklagare · polis FID',info:'Anledning att anta fängelsebrott och som regel skäligen misstänkt. För visitation av annan krävs synnerlig anledning enligt bestämmelsen.'},
{id:'besiktning',group:'Person',title:'Kroppsbesiktning',ref:'RB 28:12–13',scale:'f',decision:'FU-ledare/åklagare · polis FID',info:'Skäligen misstänkt för brott som kan ge fängelse. Exempelvis undersökning/prov för utredningen; särskilda genomföranderegler.'},
{id:'dna',group:'Person',title:'DNA-prov',ref:'RB 28:12 a–c, 13',scale:'f',decision:'FU-ledare/åklagare · polis FID; vissa beslut Polismyndigheten',info:'DNA på skäligen misstänkt vid fängelsebrott för lagens ändamål; separat regel för andra personer med synnerlig anledning. Särskilda DNA-register- och beslutsregler.'},
{id:'daktning',group:'Person',title:'Fingeravtryck och foto',ref:'RB 28:14–14 a',scale:'f',decision:'Särskild beslutsordning – kontrollera',info:'Skäligen misstänkt för fängelsebrott. Vid anhållande/häktning gäller obligatoriska upptagningar. Annan än misstänkt har särskilda regler.'},
{id:'grupp',group:'Person',title:'Kvarhållande av grupp',ref:'RB 23:8 a–b',scale:'four',decision:'FU-ledare/åklagare',info:'Brott med minst fyra års minimistraff eller försök till sådant brott, nyligen begånget på eller vid platsen. Synnerlig anledning att identifiering är av betydelse. Max en timme, ytterligare en vid synnerlig vikt.'},
{id:'telefon',group:'Person',title:'Omhänderta telefon vid förhör',ref:'RB 23:9 a–b',scale:'any',decision:'Polisman direkt',info:'Om utredningen annars kan antas försvåras. En polisman får ta utrustningen vid vägran. Särskild kroppsvisitation för att söka utrustningen kräver fängelse i straffskalan.'},
{id:'telefonvis',group:'Person',title:'Visitation efter telefon vid förhör',ref:'RB 23:9 a',scale:'f',decision:'Polisman direkt',info:'Endast om det är nödvändigt att finna utrustningen och utredningen annars kan försvåras. För annan än skäligen misstänkt krävs synnerlig anledning.'},
{id:'beslag',group:'Föremål och digitalt',title:'Beslag',ref:'RB 27:1, 4',scale:'any',decision:'Polis vid laglig åtgärd eller FID; annars FU-ledare/åklagare',info:'Inget generellt krav på fängelse i straffskalan. Måste finnas särskilt beslagsskäl. Beslag vid lagligt ingripande kan beslutas av verkställande polis; annars FID eller beslut av FU-ledare/åklagare.'},
{id:'penningbeslag',group:'Föremål och digitalt',title:'Penningbeslag',ref:'RB 27:1 a, 4',scale:'any',decision:'Som beslag; särskild försiktighet vid fordringar',info:'Särskild reglering för pengar, fordringar och rättigheter som någon fråntagits genom brott eller som kan förverkas. Ingen allmän fängelsegräns.'},
{id:'postbeslag',group:'Föremål och digitalt',title:'Beslag av postförsändelse hos befordrare',ref:'RB 27:3–4',scale:'one',decision:'FU-ledare/åklagare; polis normalt inte FID',info:'Fängelse minst ett år i straffskalan och försändelsen skulle kunna beslagtas hos mottagaren. Begränsning i RB 27:4 för polisens FID-beslag.'},
{id:'kopiera',group:'Föremål och digitalt',title:'Kopiering av handling',ref:'RB 27:17 a–b',scale:'any',decision:'Polisman som lagligen verkställer grundåtgärd',info:'Handling i beslag eller påträffad vid husrannsakan/distansgenomsökning får kopieras vid lagens förutsättningar. Inget självständigt straffskalekrav.'},
{id:'distans',group:'Föremål och digitalt',title:'Genomsökning på distans',ref:'RB 28:10 a–i',scale:'f',decision:'FU-ledare/åklagare · polis FID med begränsningar',info:'Fängelse i straffskalan. Distanslagrade handlingar; teknisk och juridisk avgränsning från lokal sökning i beslagtagen enhet. Polisman FID bara om åtgärden inte är omfattande/synnerligen olägen.'},
{id:'biometri',group:'Föremål och digitalt',title:'Biometrisk upplåsning',ref:'RB 27:17 f',scale:'specific',decision:'Polisman direkt',info:'När en person antas kunna låsa upp ett relevant system och en laglig genomsökning annars försvåras. Åtgärden förutsätter underliggande laglig genomsökning.'},
{id:'bevara',group:'Föremål och digitalt',title:'Föreläggande att bevara digital uppgift',ref:'RB 27:16–16 a',scale:'any',decision:'FU-ledare/åklagare',info:'Digital uppgift som skäligen kan antas ha betydelse för brottsutredningen. Får inte riktas till misstänkt eller angivna närstående. Ingen generell fängelsegräns.'},
{id:'forvar',group:'Ekonomi och rörelse',title:'Förvar inför kvarstad',ref:'RB 26:3',scale:'any',decision:'Åklagare · polis FID',info:'I avvaktan på rättens kvarstadsbeslut. Polisman får ta lös egendom i förvar vid fara i dröjsmål och ska skyndsamt anmäla till åklagare.'},
{id:'kvarstad',group:'Ekonomi och rörelse',title:'Kvarstad',ref:'RB 26:1–2',scale:'any',decision:'Rätten (på yrkande)',info:'Skäligen misstänkt och konkret risk att undandra egendom från betalning av anspråk. Ingen allmän minimistraffskala.'},
{id:'reseforbud',group:'Ekonomi och rörelse',title:'Reseförbud och anmälningsskyldighet',ref:'RB 25:1–3',scale:'fSpecial',decision:'Åklagare eller rätten',info:'Fängelsebrott är normalfall. Även utan fängelsekrav kan reseförbud eller anmälningsskyldighet bli aktuellt vid risk att personen lämnar Sverige för att undandra sig lagföring eller straff. Inte polisiärt FID-beslut.'},
{id:'hemlig',group:'Hemliga åtgärder',title:'Hemlig avlyssning av elektronisk kommunikation',ref:'RB 27:18 a m.fl.',scale:'twoSpecial',decision:'Rätten; i vissa akuta fall åklagare',info:'Grundspår: minst två års minimistraff. Många uttryckliga katalogbrott, försöksformer och alternativa straffvärderegler: låg straffskala utesluter INTE automatiskt. Alltid särskild prövning.'},
{id:'hemligo',group:'Hemliga åtgärder',title:'Övriga hemliga tvångsmedel',ref:'RB 27 kap. och särskild lag',scale:'specific',decision:'Rätten eller åklagare enligt respektive regel',info:'Hemlig övervakning, kamera- och rumsavlyssning och hemlig dataavläsning har olika brottskataloger, straffskalor och undantag. Appen ger därför inte automatiskt ja/nej för dessa.'}
];
const legacyRange=(raw)=>{
 const p=String(raw||'').toLocaleLowerCase('sv').trim();
 if(/^böter$/.test(p))return {min:0,max:0};
 if(!p.startsWith('fängelse')&&!p.startsWith('böter'))return null;
 const number=t=>{
   const y=t.match(/(\d+)\s*år/),m=t.match(/(\d+)\s*mån/);
   if(y||m)return Number(y?.[1]||0)+Number(m?.[1]||0)/12;
   const n=t.match(/\b(\d+)\b/);return n?Number(n[1]):NaN;
 };
 const chunks=p.split(/\s*[–-]\s*/);
 if(chunks.length===2){
   const minimum=p.startsWith('böter')?0:number(chunks[0]);
   const maximum=number(chunks[1]);
   return Number.isFinite(minimum)&&Number.isFinite(maximum)?{min:minimum,max:maximum}:null;
 }
 if(/högst/.test(p)){
   const maximum=number(p.split('högst').pop());
   return Number.isFinite(maximum)?{min:0,max:maximum}:null;
 }
 return null;
};
const score=(c,e)=>{
 const pr=c.penaltyRange||legacyRange(c.penalty);
 const min=Number(pr?.min),max=Number(pr?.max);
 if(!pr||!Number.isFinite(max)||!Number.isFinite(min))return {label:'Straffskala ej verifierad',tone:'unknown'};
 if(e.scale==='any')return {label:'Ingen allmän straffskalegräns',tone:'neutral'};
 if(e.scale==='specific')return {label:'Beror på annan förutsättning',tone:'conditional'};
 if(e.scale==='twoSpecial')return min>=2?{label:'Grundregelns straffskala uppfylld',tone:'yes'}:{label:'Pröva katalogbrott / undantag',tone:'conditional'};
 if(e.scale==='f')return max>0?{label:'Straffskalekrav uppfyllt',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
 if(e.scale==='fSpecial')return max>0?{label:'Huvudregelns straffskala uppfylld',tone:'yes'}:{label:'Undantag utan fängelsekrav finns',tone:'conditional'};
 if(e.scale==='one')return max>=1?{label:'Straffskalekrav uppfyllt',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
 if(e.scale==='four')return min>=4?{label:'Straffskalekrav uppfyllt',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
 return {label:'Kräver prövning',tone:'conditional'};
};
window.BK_COERCIVE={entries,score,range:c=>c.penaltyRange||legacyRange(c.penalty)};
})();