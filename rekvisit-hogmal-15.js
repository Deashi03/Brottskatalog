/* BrB 18 high-treason-related offences (2026-10-17): complete statutory
 * structure is NOT complete legal review. Requires contemporary case-law and
 * conditional penalty review before use; no examples fabricated.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const rows=[
 ['Uppror','18:1',[
  R('Våldsamt omstörtande av statsskicket',
   A('Gärningspersonen har det särskilda uppsåtet att statsskicket ska omstörtas med vapenmakt eller andra våldsamma medel.'),
   A('En handling företas som innebär fara för detta syftes förverkligande.'),
   A('Handlingen omfattas inte i stället av högförräderi enligt BrB 19:1.'),
   A('Om faran var ringa aktualiseras uttryckligen en särskild lägre straffskala, utan att detta är ett nytt fristående brott.')),
  R('Tvinga fram eller hindra statsorganens beslut med våld',
   A('Särskilt uppsåt att med vapenmakt eller andra våldsamma medel framtvinga eller hindra en åtgärd eller ett beslut av statschefen, regeringen, riksdagen eller den högsta domarmakten.'),
   A('En handling företas som innebär fara för detta syftes förverkligande.'),
   A('Gärningen omfattas inte i stället av högförräderi; lindrigare skala vid ringa fara prövas separat.'))]],
 ['Väpnat hot mot laglig ordning','18:3',[
  R('Väpnad samling med särskilt brottssyfte',
   A('Gärningspersonen har särskilt uppsåt att brott ska förövas mot allmän säkerhet eller medborgares frihet.'),
   O('Gärningen består av:', 'Samlar väpnat manskap','Anför väpnat manskap','Håller väpnat manskap samlat','Förser manskapet med vapen, ammunition eller liknande utrustning','Övar manskapet i vapens bruk'),
   A('Gärningen är uppsåtlig och sker med det särskilda brottssyftet. Detta är inte samma sak som enbart medlemskap i olovlig kår.'))]],
 ['Brott mot medborgerlig frihet','18:5',[
  R('Tvång eller hot riktat mot medborgerlig frihet',
   O('Medlet är:', 'Olaga tvång','Olaga hot'),
   O('Det särskilda uppsåtet är:', 'Att påverka den allmänna åsiktsbildningen','Att inskränka handlingsfriheten inom en politisk organisation','Att inskränka handlingsfriheten inom en yrkes- eller näringssammanslutning'),
   A('Gärningen medför konkret fara för yttrandefriheten, församlingsfriheten eller föreningsfriheten.'),
   A('De objektiva och subjektiva förutsättningarna för olaga tvång eller olaga hot måste vara uppfyllda.'))]],
 ['Svikande av försvarsplikt','18:6',[
  R('Avsiktlig oduglighet för försvarstjänst',
   A('Gärningspersonen har en skyldighet att fullgöra tjänstgöring vid Försvarsmakten eller annars för rikets försvar.'),
   O('Gärningsformen är:', 'Stympning','Annan åtgärd som gör personen oduglig för tjänstgöringen'),
   A('Odugligheten kan vara längre eller kortare tid; gärningen omfattas av uppsåt.'),
   A('Om Sverige var i krig har bestämmelsen en särskild högre straffgräns.')),
  R('Vilseledande för att undandra sig skyldig tjänstgöring',
   A('Gärningspersonen omfattas av tjänstgöringsskyldighet vid Försvarsmakten eller annars för rikets försvar.'),
   O('Vilseledandet består av:', 'Att föregiva sjukdom','Annat vilseledande'),
   A('Personen undandrar sig tjänstgöringsskyldigheten genom vilseledandet och handlar uppsåtligen.'),
   A('Kontrollera gärningsdatum och om Sverige var i krig, eftersom straffskalan är villkorad.'))]]
];
const by=t=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
const out={added:[],already:[],missing:[],mismatch:[]};
for(const [title,ref,routes] of rows){
 const c=by(title);if(!c){out.missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+' '+c.shortRef);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS '+ref);continue;}
 if(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length){out.already.push(title);continue;}
 c.rekvisit15={groups:[],routes,source:'BrB '+ref+' (1962:700)',sourceURL:SRC,
  scope:'lagtext-jamford',verifiedOn:'2026-10-17',legalReviewApproved:false,
  note:'Särskilda syftesrekvisit och konkret farobedömning prövas per handlingsalternativ. Uppgifter om statsorgan, krig, internationella relationer och den tillämpliga lagversionen kräver individuell rättslig analys före skarpt bruk. Rekvisitstrukturen innebär INTE fullständigt rättsligt godkännande.'};
 out.added.push(title);
}
window.BK_REKVISIT_HOGMAL15=out;
})();