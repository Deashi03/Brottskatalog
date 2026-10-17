/* V1.5: consolidated BrB 19 chapter source-scoped study structures.
 * Source: 1962:700, consolidated through SFS 2026:1656 (2026-10-17).
 * Do not mistake generic economic/political contact for espionage: specific
 * purpose, secrecy, harmfulness, territory and statutory exceptions matter.
 * No independent legal certification, no imaginary police case scenarios.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const direct=[
 ['Högförräderi','19:1',[
  R('Rikets underkastelse, beroende eller avskiljande',
   O('Det särskilda uppsåtet avser:', 'Att riket eller del därav ska underkastas främmande makt','Att riket eller del därav ska bringas i beroende av främmande makt','Att del av riket ska lösryckas'),
   O('Det avsedda genomförandemedlet är:', 'Våldsamma medel','Andra lagstridiga medel','Utländskt bistånd'),
   A('En handling företas som innebär fara för detta uppsåts förverkligande.'),
   A('Den lindrigare straffskalan vid ringa fara måste hållas isär från grundbrottets struktur.')),
  R('Utländskt bistånd för att styra statsorganen',
   A('Gärningspersonen avser att med utländskt bistånd framtvinga eller hindra åtgärd eller beslut av statschefen, regeringen, riksdagen eller den högsta domarmakten.'),
   A('En handling företas som innebär fara för att detta syfte förverkligas.'),
   A('Uppsåt till det särskilda syftet och farerekvisitet ska prövas individuellt.'))]],
 ['Krigsanstiftan','19:2',[
  R('Fara för krig eller andra fientligheter',
   O('Gärningen sker genom:', 'Våldsamma medel','Utländskt bistånd'),
   A('Gärningen framkallar fara för att Sverige invecklas i krig eller andra fientligheter.'),
   A('Gärningen omfattas inte i stället av högförräderi enligt BrB 19:1.'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Trolöshet vid förhandling med främmande makt','19:3',[
  R('Missbruk av svenskt förhandlings- eller bevakningsuppdrag',
   O('Personen har fått i uppdrag att:', 'För Sveriges räkning förhandla med främmande makt','Annars bevaka svenska angelägenheter hos företrädare för främmande makts intresse'),
   O('Missbruket består av:', 'Missbruk av behörigheten att företräda Sverige','Annat missbruk av förtroendeställningen'),
   A('Missbruket orsakar Sverige avsevärt men.'),
   A('Gärningspersonen handlar uppsåtligen. Den kvalificerade skadan är obligatorisk.'))]],
 ['Egenmäktighet vid förhandling med främmande makt','19:4',[
  R('Svensk medborgare är obehörigt diplomatiskt ombud',
   A('Gärningspersonen är svensk medborgare och agerar som ombud för främmande makt i diplomatisk angelägenhet som rör Sverige.'),
   A('Behörigt tillstånd från regeringen eller den regeringen bemyndigat saknas.'),
   A('Gärningen är uppsåtlig.')),
  R('Föregivet behörigt svenskt ombud förhandlar',
   A('Gärningspersonen uppträder som om personen vore behörigt ombud i en diplomatisk angelägenhet som rör Sverige.'),
   A('Personen inlåter sig i underhandling med någon som företräder främmande makts intresse.'),
   A('Gärningen är uppsåtlig.')),
  R('Särskilda straffskalefaktorer, inte nya brottstyper',
   A('Denna post återger tillämpningsförutsättningarna ovan; bestämmelsens särskilda högre straffskala vid fara för självbestämmanderätt eller fredligt förhållande till främmande makt ska prövas separat.'),
   A('Straffmaximum/minimum beror också på om Sverige var i krig. Denna upplysning är ingen fristående gärningsväg.'))]],
 ['Utlandsspioneri','19:6a',[
  R('Uppgift i internationellt samarbete eller organisation',
   A('Gärningen omfattas inte i stället av spioneri enligt BrB 19:5.'),
   A('En hemlig uppgift förekommer inom Sveriges samarbete med annan stat eller mellanfolklig organisation eller i mellanfolklig organisation där Sverige är medlem.'),
   A('Uppenbarandet för främmande makt eller motsvarande är ägnat att medföra allvarligt men för Sveriges förhållande till annan stat eller mellanfolklig organisation.'),
   O('Gärningen består av obehörigt:', 'Anskaffande av uppgiften','Befordrande av uppgiften','Lämnande av uppgiften','Röjande av uppgiften'),
   A('Gärningspersonen handlar med särskilt syfte att gå främmande makt eller motsvarande tillhanda.'),
   A('Ansvarsfrihet gäller om gärningen med hänsyn till syftet och omständigheterna i övrigt är försvarlig.')),
  R('Skrift, teckning eller annat föremål',
   A('Föremålet innefattar en hemlig uppgift av den kvalificerade internationella typen enligt BrB 19:6 a.'),
   O('Gärningspersonen:', 'Framställer obehörigen föremålet','Tar obehörigen befattning med föremålet'),
   A('Särskilt syfte att gå främmande makt eller motsvarande tillhanda föreligger; 19:5 är inte tillämplig.'),
   A('Om gärningen med hänsyn till syfte och omständigheter är försvarlig utgör den inte brott.'))]],
 ['Obehörig befattning med hemlig uppgift','19:7',[
  R('Hemlig svensk säkerhetsuppgift utan utländskt tillhandagåendesyfte',
   A('Gärningen är sådan som avses i BrB 19:5 men utan syfte att gå främmande makt eller motsvarande tillhanda.'),
   A('Uppgiften rör något förhållande av hemlig natur.'),
   O('Det obehöriga handlandet är:', 'Anskaffande','Befordrande','Lämnande','Röjande','Framställning av föremål med uppgiften','Annan befattning med sådant föremål'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Internationell hemlig uppgift utan utländskt tillhandagåendesyfte',
   A('Gärningen är sådan som avses i BrB 19:6 a men saknar syftet att gå främmande makt eller motsvarande tillhanda.'),
   A('Den hemliga uppgiften hör till internationellt samarbete eller organisation som omfattas av 19:6 a.'),
   A('Gärningen är uppsåtlig och inte försvarlig med hänsyn till syftet och övriga omständigheter.'))]],
 ['Röjande av hemlig uppgift i internationellt samarbete','19:9a',[
  R('Uppsåtligt obehörigt röjande inom internationellt samarbete',
   A('Gärningspersonen deltar för Sveriges räkning i samarbete med annan stat/mellanfolklig organisation eller tjänstgör i en mellanfolklig organisation som Sverige är medlem i.'),
   A('En hemlig uppgift inom samarbetet eller organisationen röjs obehörigen.'),
   A('Uppenbarandet för främmande makt eller motsvarande är ägnat att störa Sveriges förhållande till annan stat eller mellanfolklig organisation.'),
   A('Gärningen omfattas inte av BrB 19:5, 6 a, 7 eller 9.'),
   A('Gärningen är uppsåtlig och inte försvarlig med hänsyn till syfte och övriga omständigheter.')),
  R('Grov oaktsamhet i samma röjandegärning',
   A('Samma deltagar-, hemlighets-, röjande- och störningsrekvisit som första stycket är uppfyllda.'),
   A('Röjandet sker av grov oaktsamhet, och är inte försvarligt.'),
   A('Den särskilda oaktsamhetsvarianten har straffet böter, vilket måste skiljas från uppsåtlig normalgrad.'))]],
 ['Olovlig underrättelseverksamhet mot Sverige','19:10',[
  R('Hemlig/sviklig verksamhet för underrättelseinhämtning',
   A('Gärningspersonen agerar för att gå främmande makt eller motsvarande tillhanda.'),
   O('Sättet är:', 'Hemligen','Med svikliga medel'),
   O('Personen:', 'Bedriver verksamhet med syfte att anskaffa säkerhetsskadliga uppgifter','Medverkar mer än tillfälligt till sådan verksamhet'),
   A('Uppgifterna avser förhållanden vars uppenbarande för främmande makt eller motsvarande kan medföra men för Sveriges säkerhet.'),
   A('Gärningen omfattas av uppsåt och det särskilda syftet.'))]],
 ['Olovlig underrättelseverksamhet mot främmande makt','19:10a',[
  R('Underrättelseverksamhet i Sverige om annan främmande makt',
   A('Gärningen utförs här i landet.'),
   A('Gärningspersonen syftar till att gå främmande makt eller motsvarande tillhanda.'),
   O('Personen:', 'Bedriver verksamhet vars syfte är anskaffande av uppgifter','Medverkar mer än tillfälligt till sådan verksamhet'),
   A('Uppgifterna avser förhållanden vars uppenbarande kan medföra men för en ANNAN främmande makts säkerhet.'),
   A('Gärningen är uppsåtlig. Hemlighet/svikliga metoder är inte ett separat uttryckligt nödvändigt rekvisit i BrB 19:10 a.'))]],
 ['Olovlig underrättelseverksamhet mot person','19:10b',[
  R('Personuppgiftsunderrättelseverksamhet i Sverige',
   A('Gärningen sker i Sverige i syfte att gå främmande makt eller motsvarande tillhanda.'),
   O('Metoden är:', 'Hemlig verksamhet','Svikliga medel','Otillbörliga medel'),
   O('Personen:', 'Bedriver verksamhet vars syfte är att anskaffa uppgifter om någon annans personliga förhållanden','Medverkar mer än tillfälligt till sådan verksamhet'),
   A('Särskilt uppsåt till att gå främmande makt eller motsvarande tillhanda måste finnas.'))]],
 ['Olovlig värvning','19:12',[
  R('Obehörig värvning i Sverige',
   A('Gärningspersonen värvar här i landet någon annan till främmande krigstjänst eller därmed jämförlig tjänst.'),
   A('Regeringens tillstånd saknas.'),
   A('Gärningen är uppsåtlig. Straffskalan skiljer mellan fredstid och när Sverige var i krig.'),
   A('Åtal kräver regeringens förordnande enligt BrB 19:16.'))]],
 ['Tagande av utländskt understöd','19:13',[
  R('Utländsk finansiering för särskild opinionspåverkan',
   O('Pengar eller annan egendom mottas från:', 'En främmande makt eller motsvarande','Någon utomlands som handlar i syfte att gå främmande makt eller motsvarande tillhanda'),
   A('Gärningspersonen tar emot tillgångarna med syftet att påverka allmänna meningen genom skrifter eller på annat sätt.'),
   O('Den avsedda opinionsfrågan gäller:', 'Någon av grunderna för Sveriges statsskick','En angelägenhet av betydelse för Sveriges säkerhet som riksdagen eller regeringen ska besluta om'),
   A('Gärningen är uppsåtlig; mottagande av utländska pengar är inte ensamt tillräckligt.'),
   A('Åtal fordrar regeringens förordnande enligt BrB 19:16.'))]]
];
const degrees=[
 ['Grovt spioneri','19:6','Spioneri','Helhetsbedömning. Särskilt beakta synnerligen farligt handlande vid krig, förhållande av stor betydelse eller röjande av förtrodd tjänsteuppgift.'],
 ['Grovt utlandsspioneri','19:6b','Utlandsspioneri','Helhetsbedömning. Särskilt beakta synnerligen farlig art under krig, förhållanden av stor betydelse eller röjande av uppgift som anförtrotts i offentlig/enskild tjänst. Försvarlighetsundantaget i BrB 19:6 a kvarstår.'],
 ['Grov obehörig befattning med hemlig uppgift','19:8','Obehörig befattning med hemlig uppgift','Helhetsbedömning. Särskilt beakta tillhandagående av främmande makt/motsvarande, synnerligen farligt handlande vid krig, uppgift av stor betydelse eller röjande av förtrodd tjänsteuppgift. Självständigt syfte att gå främmande makt tillhanda får inte felaktigt läggas till grundbrottet.'],
 ['Grov olovlig underrättelseverksamhet mot Sverige','19:10','Olovlig underrättelseverksamhet mot Sverige','Samlad grovhetsbedömning enligt BrB 19:10; inget särskilt ytterligare obligatoriskt tillvägagångssätt anges i paragrafen.'],
 ['Grov olovlig underrättelseverksamhet mot främmande makt','19:10a','Olovlig underrättelseverksamhet mot främmande makt','Samlad grovhetsbedömning enligt BrB 19:10 a. Territorialitetskravet (i Sverige) och kravet att uppgiften berör en annan främmande makt kvarstår.'],
 ['Grov olovlig underrättelseverksamhet mot person','19:10b','Olovlig underrättelseverksamhet mot person','Samlad grovhetsbedömning enligt BrB 19:10 b. Territoriellt krav, särskilt utlandssyfte och hemliga/svikliga/otillbörliga metoder kvarstår.']
];
const out={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const structured=c=>Boolean(c?.rekvisit15?.groups?.length||c?.rekvisit15?.routes?.length);
const check=(title,ref)=>{
 const c=by(title);
 if(!c){out.missing.push(title);return null;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+' '+c.shortRef);return null;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS '+ref);return null;}
 return c;
};
const assign=(c,ref,groups,routes)=>{
 c.rekvisit15={groups,routes,source:'Brottsbalk (1962:700), BrB '+ref,sourceURL:SRC,
  scope:'lagtext-jamford',verifiedOn:'2026-10-17',legalReviewApproved:false,
  note:'Lagtextjämförd studieöversikt. Statssäkerhet, utlandssyfte, hemlighetskrav, försvarlighetsundantag och särskilda åtalsförordnanden kräver individuell juridisk bedömning. Ingen fullständig certifiering eller förstadieklassning har gjorts här.'};
 out.added.push(c.title);
};
for(const [title,ref,routes] of direct){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 // Distinguish sentencing caveats from statutory OR act routes.
 const clean=title==='Egenmäktighet vid förhandling med främmande makt'?routes.slice(0,2):routes;
 assign(c,ref,[],clean);
 if(title==='Egenmäktighet vid förhandling med främmande makt')c.rekvisit15.note+=' Särskild kvalificerad straffskala beror på fara för självbestämmanderätt eller fredliga internationella relationer och på om Sverige var i krig; detta är inte en tredje gärningsväg.';
}
for(const [title,ref,parentName,grade] of degrees){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 const p=by(parentName);if(!structured(p)){out.missingParent.push(title+' ← '+parentName);continue;}
 const prev=JSON.parse(JSON.stringify(p.rekvisit15));
 const qualifier=A('Gradbedömning efter helhet, utan automatiskt obligatoriska faktorer: '+grade);
 const groups=prev.groups?.length?[...prev.groups,qualifier]:[];
 const routes=prev.routes?.length?prev.routes.map(r=>({...r,groups:[...(r.groups||[]),qualifier]})):[];
 assign(c,ref,groups,routes);
}
window.BK_REKVISIT_RIKET15=out;
})();