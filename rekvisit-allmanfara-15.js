/* V1.5 source-scoped coverage for BrB 13 chapter: SFS 1962:700 13:1–12
 * Reviewed against Riksdagen consolidated text 2026-10-17.
 * Each "route" is a separate legal method, not cumulative alternatives.
 * Complete legal review is deliberately NOT asserted.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const direct=[
 ['Kapning','13:5a',[
  R('Bemäktigande eller manövreringsingripande genom tvång eller teknik',
   O('Gärningen sker genom:', 'Olaga tvång','Olovligt tekniskt hjälpmedel'),
   O('Gärningspersonen bemäktigar sig eller ingriper i manövreringen av:', 'Luftfartyg','Fartyg för civil yrkesmässig befordran, bogsering, bärgning, fiske eller annan fångst','Yrkesmässigt brukad buss, lastbil eller maskindrivet spårfordon för gods eller passagerare'),
   A('Gärningspersonen handlar uppsåtligen. De angivna fordonens användning och art måste vara uppfyllda.')),
  R('Bemäktigande av havsplattform',
   A('Föremålet är en plattform i havet avsedd för utforskning eller utvinning av naturtillgångar eller annat ekonomiskt ändamål.'),
   A('Gärningspersonen bemäktigar sig plattformen genom olaga tvång. Denna handlingsväg omfattar inte enbart teknisk påverkan.'),
   A('Gärningen är uppsåtlig.'))]],
 ['Sjö- eller luftfartssabotage','13:5a',[
  R('Förstörelse eller allvarlig skada',
   O('Gärningsföremålet är:', 'Fartyg som omfattas av BrB 13:5 a första stycket','Havsplattform som omfattas av paragrafen','Luftfartyg i trafik'),
   O('Gärningen består av:', 'Förstörelse','Allvarlig skada'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Fara för fartygs, plattforms eller luftfartygs säkerhet',
   A('En åtgärd vidtas som är ägnad att framkalla fara för den säkerhet som anges i BrB 13:5 a andra stycket 2.'),
   O('Skyddsobjektet är:', 'Fartyg enligt paragrafens första stycke','Havsplattform enligt samma stycke','Luftfartygs säkerhet under flygning'),
   A('Gärningen är uppsåtlig och bedömningen av om åtgärden är ägnad att skapa fara måste göras konkret.'))]],
 ['Flygplatssabotage','13:5b',[
  R('Allvarligt våld eller hot på internationell flygplats',
   A('Personen som angrips befinner sig på en flygplats öppen för internationell trafik.'),
   O('Gärningsformen är:', 'Allvarligt våld mot personen','Hot om sådant allvarligt våld'),
   A('Gärningen är ägnad att framkalla fara för flygplatsens funktion eller för säkerheten där.'),
   A('Gärningen begås uppsåtligen.')),
  R('Förstör eller skadar anordning eller flygplan',
   O('Angreppet avser:', 'Anordning som hör till eller används för den internationella flygplatsens trafik','Luftfartyg som är uppställt på flygplatsen men inte i trafik'),
   O('Handlingen är:', 'Förstörelse','Allvarlig skada'),
   A('Handlingen är ägnad att framkalla fara för flygplatsens funktion eller säkerhet och begås uppsåtligen.')),
  R('Våldsamt omintetgörande av flygplatsverksamhet',
   A('Verksamhet på en flygplats öppen för internationell trafik omintetgörs.'),
   O('Medlet är:', 'Våld','Hot om våld'),
   A('Gärningen är ägnad att framkalla fara för flygplatsens funktion eller säkerheten vid denna och är uppsåtlig.'))]],
 ['Sabotage mot blåljusverksamhet','13:5c',[
  R('Våld eller hot mot personal',
   A('Den skyddade verksamheten är polisverksamhet, räddningstjänst eller ambulanssjukvård.'),
   O('Våld eller hot om våld riktas mot:', 'Verksamhetens personal','Person som bistår verksamheten'),
   A('Gärningen är ägnad att allvarligt försvåra eller hindra utryckningsverksamhet eller brottsbekämpande verksamhet.'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Tillgrepp eller skada på verksamhetens hjälpmedel',
   A('Fordonet eller hjälpmedlet används eller ska användas i skyddad polis-, räddnings- eller ambulansverksamhet.'),
   O('Gärningspersonen:', 'Tillgriper fordon eller hjälpmedel','Skadar fordon eller hjälpmedel'),
   A('Gärningen är ägnad att allvarligt försvåra eller hindra utryckningsverksamhet eller brottsbekämpande verksamhet.'),
   A('Gärningen är uppsåtlig.')),
  R('Annan otillbörlig åtgärd',
   A('Annan otillbörlig åtgärd angriper eller stör skyddad polisverksamhet, räddningstjänst eller ambulanssjukvård.'),
   A('Åtgärden är ägnad att allvarligt försvåra eller hindra utryckningsverksamhet eller brottsbekämpande verksamhet.'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Spridande av gift eller smitta','13:7',[
  R('Förgiftning eller infektion',
   O('Gärningspersonen förgiftar eller infekterar:', 'Livsmedel','Vatten','Annat föremål eller medium som kan medföra allmän fara'),
   A('Gärningen framkallar allmän fara för människors liv eller hälsa.'),
   A('Gärningspersonen handlar uppsåtligen till relevanta omständigheter och fara.')),
  R('Annan gift- eller smittspridning',
   O('Gärningsformen är:', 'Att på annat sätt sprida gift eller dylikt','Att överföra allvarlig sjukdom','Att sprida allvarlig sjukdom'),
   A('En allmän fara för människors liv eller hälsa uppkommer.'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Förgöring','13:8',[
  R('Allmän fara för djur eller växter',
   O('Medlet är:', 'Gift','Överföring eller spridning av elakartad sjukdom','Spridning av skadedjur eller ogräs','Annat därmed jämförbart sätt'),
   A('Gärningen framkallar allmän fara för djur eller växter.'),
   A('Gärningen begås uppsåtligen.'))]],
 ['Underlåtenhet att avvärja allmänfara','13:10',[
  R('Egen framkallad fara med senare insikt',
   A('Gärningspersonen har genom handhavande av eld, sprängämnen, gift eller på annat sätt framkallat fara för brand eller ofärd som avses i BrB 13:1–3 eller allmän fara enligt 13:7–8.'),
   A('Gärningspersonen har därefter faktiskt fått insikt om den uppkomna faran.'),
   A('Personen underlåter att göra vad som skäligen kan krävas för att avvärja faran.'),
   A('Personen har inte redan gjort sig skyldig till annat ansvar enligt tidigare bestämmelser i BrB 13 kap.'),
   A('Underlåtenheten omfattas av uppsåt efter att insikten om faran uppkom.'))]]
];
const degrees=[
 ['Grov mordbrand','13:2','Mordbrand','Samlad grovhetsbedömning av branden. Särskilt beakta brand i tätbebyggelse där spridning lätt kunde ske, fara för flera människor eller egendom av särskild betydelse.'],
 ['Grov allmänfarlig ödeläggelse','13:3','Allmänfarlig ödeläggelse','Helhetsbedömning. Särskilt beakta fara för flera människor, egendom av särskild betydelse eller särskilt farlig/allvarlig art.'],
 ['Grovt sabotage','13:5','Sabotage','Helhetsbedömning. Särskilt beakta fara för Sveriges säkerhet, flera människoliv eller egendom av särskild betydelse.'],
 ['Grov kapning','13:5a','Kapning','Helhetsbedömning. Särskilt beakta framkallad fara för flera människoliv eller gärning av särskilt farlig art.'],
 ['Grovt sjö- eller luftfartssabotage','13:5a','Sjö- eller luftfartssabotage','Helhetsbedömning. Särskilt beakta fara för flera människoliv eller annars särskilt farlig art.'],
 ['Grovt flygplatssabotage','13:5b','Flygplatssabotage','Helhetsbedömning. Särskilt beakta fara för flera människoliv eller annars särskilt farlig art.'],
 ['Grovt sabotage mot blåljusverksamhet','13:5c','Sabotage mot blåljusverksamhet','Helhetsbedömning. Särskilt beakta fara för flera människoliv, egendom av särskild betydelse eller annars särskilt farlig art.'],
 ['Grovt allmänfarlig vårdslöshet','13:6','Allmänfarlig vårdslöshet','Oaktsamhet är skuldformen även vid grovt brott. Den samlade grovhetsbedömningen får inte göras om till ett uppsåtsrekvisit.'],
 ['Grovt spridande av gift eller smitta','13:7','Spridande av gift eller smitta','Helhetsbedömning. Särskilt beakta uppsåt att skada annans liv/hälsa eller fara för ett stort antal människor.'],
 ['Grov förgöring','13:8','Förgöring','Helhetsbedömning. Särskilt beakta uppsåt att skada eller fara för egendom av betydande värde.']
];
const out={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const structured=c=>Boolean(c?.rekvisit15?.groups?.length||c?.rekvisit15?.routes?.length);
function add(c,ref,groups,routes){
 c.rekvisit15={groups,routes,source:'BrB 13:'+ref.split(':')[1]+' i brottsbalk (1962:700)',sourceURL:SRC,
  verifiedOn:'2026-10-17',scope:'lagtext-jamford',legalReviewApproved:false,
  note:'Lagtextnära strukturerad studieöversikt, inte fullständig rättslig certifiering. Kontrollera gärningsdatum, befintliga undantag, konkurrens, rättspraxis och förarbeten. Vid tillämpliga fall prövas även BrB 13:11 om frivilligt avvärjande av fara och 13:12 om förstadier.'};
 out.added.push(c.title);
}
function check(title,ref){
 const c=by(title);
 if(!c){out.missing.push(title);return null;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+' '+c.shortRef);return null;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS-text BrB '+ref);return null;}
 return c;
}
for(const [title,ref,routes] of direct){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 add(c,ref,[],routes);
}
for(const [title,ref,parent,grading] of degrees){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 const p=by(parent);if(!structured(p)){out.missingParent.push(title+' ← '+parent);continue;}
 const original=JSON.parse(JSON.stringify(p.rekvisit15));
 const qualifier=A('Gradbedömning (samlad, inga automatiskt obligatoriska indikatorer): '+grading);
 const groups=original.groups?.length?[...original.groups,qualifier]:[];
 const routes=original.routes?.length?original.routes.map(route=>({...route,groups:[...(route.groups||[]),qualifier]})):[];
 add(c,ref,groups,routes);
}
window.BK_REKVISIT_ALLMANFARA15=out;
})();