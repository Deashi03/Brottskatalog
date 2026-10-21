/* V1.5: remaining four BrB 6 chapter offences.
 * Individual provisions BrB 6:6–7, 6:13–14, checked against consolidated SFS
 * 2026-10-17. No speculative typecase. No final legal certification.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const direct=[
 ['Sexuellt övergrepp mot barn','6:6',[
  R('Barn under 15 år',
   A('Den utsatta personen är under 15 år. Vid oaktsamhet om att barnet inte uppnått åldern kan 6:13 tillämpas.'),
   O('Gärningen består i:', 'Gärningspersonen genomför en sexuell handling med barnet','Gärningspersonen förmår på ett otillbörligt sätt barnet att företa eller tåla en sådan handling'),
   A('Den sexuella handlingen är inte en gärning som hör under BrB 6:4–5 (samlag eller jämförbar gärning).'),
   A('Gärningspersonen handlar uppsåtligen till gärningen; särskild åldersoaktsamhet i BrB 6:13 prövas.'),
   A('Om brottet bedöms som mindre grovt enligt 6:6 andra stycket kan undantaget i 6:14 vid uppenbart ringa ålders-/utvecklingsskillnad och avsaknad av övergrepp prövas. Detta undantag gäller inte automatiskt alla gärningar enligt 6:6.')),
  R('Barn 15–17 år, särskilda relationer i BrB 6:4 andra stycket 1',
   A('Den utsatta personen har fyllt 15 men inte 18 år.'),
   O('Barnets relation är:', 'Barnet är gärningspersonens avkomling','Barnet står under fostran av gärningspersonen eller har liknande förhållande','Gärningspersonen ansvarar för barnets vård eller tillsyn till följd av myndighetsbeslut'),
   O('Sexuell handling:', 'Gärningspersonen genomför annan sexuell handling än BrB 6:4–5','Barnet förmås otillbörligt att företa eller tåla sådan handling'),
   A('Gärningen är uppsåtlig med särskild regel i BrB 6:13 om oaktsamhet beträffande barnets ålder.')),
  R('Barn under 18 år med nedsatt förmåga att värna sexuell integritet',
   A('Barnet är under 18 år och gärningen är i annat fall än det särskilt uppräknade relationsfallet i BrB 6:4 andra stycket 1.'),
   A('Barnets förmåga att värna sin sexuella integritet är nedsatt på grund av psykisk ohälsa, funktionsnedsättning, missbruk, gärningspersonens auktoritet eller annan relevant omständighet.'),
   A('Gärningspersonen utnyttjar denna situation otillbörligt.'),
   O('Gärningen består i:', 'Genomförande av annan sexuell handling än i BrB 6:4–5','Otillbörligt förmå barnet att företa eller tåla sådan handling'),
   A('Gärningen är uppsåtlig; BrB 6:13 kan medge oaktsamhet om åldern.'))]],
 ['Samlag med avkomling','6:7',[
  R('Vaginalt samlag inom rätt upp- och nedstigande släktled',
   A('Ett vaginalt samlag genomförs med gärningspersonens eget barn eller dess avkomling.'),
   A('Gärningen omfattas inte i stället av tidigare bestämmelse i BrB 6 kap.'),
   A('Gärningspersonen handlar uppsåtligen.'),
   A('BrB 6:7 tredje stycket utesluter ansvar för den som förmåtts till gärningen genom olaga tvång eller på annat otillbörligt sätt. Straffskalan enligt 6:7 första stycket är högst två års fängelse.'))]],
 ['Samlag med syskon','6:7',[
  R('Vaginalt samlag mellan helsyskon',
   A('Gärningen består i vaginalt samlag med eget HELsyskon. Enbart halvsyskonskap uppfyller inte just detta släktskapsrekvisit.'),
   A('Gärningen omfattas inte i stället av tidigare bestämmelse i BrB 6 kap.'),
   A('Gärningspersonen handlar uppsåtligen.'),
   A('Person som förmåtts genom olaga tvång eller annat otillbörligt sätt ska inte dömas enligt BrB 6:7 tredje stycket. Straffskalan enligt andra stycket är högst ett års fängelse.'))]]
];
const degrees=[
 ['Grovt sexuellt övergrepp mot barn','6:6','Sexuellt övergrepp mot barn',
  'Efter en samlad bedömning är gärningen grov. Särskilt beakta närståenderelation, missbruk av ställning/särskilt förtroende, att flera deltagit eller att barnet utnyttjats hänsynslöst med hänsyn till tillvägagångssätt, låg ålder eller annat.'],
];
const out={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const structured=c=>Boolean(c?.rekvisit15?.routes?.length||c?.rekvisit15?.groups?.length);
const check=(title,ref)=>{
 const c=by(title);if(!c){out.missing.push(title);return null;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+' '+c.shortRef);return null;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS '+ref);return null;}
 return c;
};
function assign(c,ref,groups,routes){
 c.rekvisit15={groups,routes,source:'BrB '+ref+', jämför även BrB 6:13–14',
  sourceURL:SRC,verifiedOn:'2026-10-17',scope:'lagtext-jamford',legalReviewApproved:false,
  note:'Lagtextnära studiestöd för enskilda rekvisit, inte en fullständig rättslig analys. Kontrollera barnets ålder, särskilda relationer, otillbörligt utnyttjande, alternativa handlingsvägar, konkurrens, skuldform och undantagen i BrB 6:13–14. För BrB 6:7 gäller det särskilda undantaget vid otillbörlig påverkan på deltagaren. Inga spekulativa typfall.'};
 out.added.push(c.title);
}
for(const [title,ref,routes] of direct){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 assign(c,ref,[],routes);
}
for(const [title,ref,parentName,grading] of degrees){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 const p=by(parentName);if(!structured(p)){out.missingParent.push(title+' ← '+parentName);continue;}
 const prev=JSON.parse(JSON.stringify(p.rekvisit15));
 const qualifier=A('Separat gradindelning, inte nytt grundrekvisit: '+grading);
 // BrB 6:14 applies only to a lesser-serious offence under 6:6 second
 // paragraph, never to aggravated 6:6 third paragraph. Do NOT carry its
 // exception through when cloning the normal-grade route.
 const routes=prev.routes?.length?prev.routes.map(r=>({
  ...r,
  groups:[...(r.groups||[]).filter(g=>!String(g.label||'').includes('6:14')),qualifier]
 })):[];
 assign(c,ref,[],routes);
 c.rekvisit15.note='Grovt sexuellt övergrepp mot barn enligt BrB 6:6 tredje–fjärde styckena: kontrollera grundgärningen enligt första stycket och samlad grovhetsbedömning. Ansvarsfrihetsundantaget i 6:14 avser endast den mindre grova graden i 6:6 andra stycket och är INTE tillämpligt på den grova graden. Strukturen är inte en fullständig juridisk rättsutredning.';
}
window.BK_REKVISIT_SISTA15=out;
})();