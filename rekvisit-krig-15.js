/* V1.5: BrB 21–22 statutory learning outlines (2026-10-17).
 * 21:1 activation, 21:3–4 covered persons and 21:16 enemy equivalence
 * are integral prerequisites; 22:4 and treaty/war-crime exemptions retained.
 * No assertion of full academic legal review or live wartime applicability.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const chapter21Activation='BrB 21 kap. får tillämpas när Sverige är i krig eller efter föreskrift från regeringen vid krigsfara eller angivna extraordinära förhållanden (21:1–2). Krigsmannabegreppet och utvidgningen till vissa andra personer i 21:3–4 ska prövas; dessa regler är inte en förutsättning för självständiga brott i 22 kap.';
const direct=[
 ['Lydnadsbrott','21:5',[
  R('Order inte lydd i rätt tid',
   A('Gärningspersonen omfattas som krigsman eller likställd av BrB 21 kap.; kapitlet är tillämpligt enligt BrB 21:1.'),
   A('Ordern kommer från en förman.'),
   O('Gärningsformen är:', 'Vägrar att lyda order','Underlåter att lyda order','Dröjer otillbörligen med att fullgöra ordern'),
   A('Om det är uppenbart att ordern inte angår tjänsten ska ansvar inte dömas ut.'),
   A('Gärningen är uppsåtlig; grov grad bedöms separat i BrB 21:6.'))]],
 ['Olovlig avvikelse av krigsman','21:7',[
  R('Olovlig frånvaro från tjänstgöring',
   A('Gärningspersonen är krigsman eller likställd och BrB 21 kap. är tillämpligt.'),
   O('Personen:', 'Avviker olovligen från tjänstgöringen','Uteblir olovligen från tjänstgöringen'),
   A('Gärningen är uppsåtlig. Den särskilda grova graden och 21:16 om fiendebegreppet ska hållas isär.'))]],
 ['Våld eller hot mot förman','21:8',[
  R('Angrepp mot förman eller likställd',
   A('Gärningspersonen är krigsman eller likställd när BrB 21 kap. är tillämpligt.'),
   O('Gärningen består av:', 'Våld','Hot om våld'),
   O('Kopplingen till förmannen är:', 'Angrepp under förmannens tjänsteutövning','Angrepp för att tvinga fram eller hindra en tjänsteåtgärd','Angrepp annars med anledning av förmannens tjänst'),
   A('Vaktposter och andra krigsmän som tjänstgör för bevakning eller ordningsupprätthållande likställs med förman.'),
   A('Gärningen är uppsåtlig.'))]],
 ['Samröre med fienden','21:9',[
  R('Obehörig kontakt med fienden',
   A('Gärningspersonen är krigsman eller likställd och BrB 21 kap. är tillämpligt.'),
   O('Gärningspersonen:', 'Avsänder obehörigen meddelande','Träder annars obehörigen i förbindelse'),
   A('Mottagaren tillhör fiendens krigsmakt eller vistas på fiendens område.'),
   A('BrB 21:16 likställer under angivna förhållanden en främmande makt som Sverige inte är i krig med när det finns risk för krig med denna makt.'),
   A('Gärningen är uppsåtlig.'))]],
 ['Undergrävande av stridsviljan','21:10',[
  R('Råder krigsmän att ge sig åt fienden',
   A('Gärningspersonen är krigsman eller likställd och BrB 21 kap. gäller.'),
   A('Gärningen sker under strid eller när brott mot krigslydnaden annars medför särskild fara.'),
   A('Gärningspersonen råder andra krigsmän att ge sig åt fienden.'),
   A('Gärningen är uppsåtlig. BrB 21:16 om fiendebegreppet kan vara relevant.')),
  R('Annan otillbörlig stridsviljepåverkan',
   A('Gärningspersonen är krigsman eller likställd och BrB 21 kap. gäller.'),
   A('Gärningen sker under strid eller när brott mot krigslydnaden annars medför särskild fara.'),
   A('Personen företar obehörigen en handling i andra krigsmäns närvaro.'),
   A('Handlingen är ägnad att framkalla trolöshet eller modlöshet och är uppsåtlig.'))]],
 ['Försummande av krigsförberedelse','21:11',[
  R('Underlåten nödvändig förberedelse av krigshandling',
   A('Gärningspersonen är krigsman eller likställd när BrB 21 kap. är tillämpligt.'),
   O('Det som inom personens ansvarsområde underlåts är:', 'Sätta en försvarsanläggning i stridsberedskap','Göra en avdelning stridsberedd','Anskaffa egendom','På annat sätt förbereda krigshandling'),
   A('Underlåtenheten gäller vad som faktiskt ankommer på gärningspersonen.'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Obehörig kapitulation','21:12',[
  R('Obehörigt överlämnande av stridsställning eller materiel',
   A('Gärningspersonen tjänstgör som chef för en avdelning av Försvarsmakten; BrB 21 kap. är tillämpligt.'),
   O('Det som överlämnas obehörigen till fienden är:', 'Stridsställning','Krigsmateriel','Annat av avsevärd betydelse för krigföringen'),
   A('Gärningen är uppsåtlig. BrB 21:16 om fiendebegreppet ska vid behov prövas.')),
  R('Chef ger sig och sin avdelning åt fienden',
   A('Gärningspersonen tjänstgör som chef för en avdelning av Försvarsmakten och 21 kap. är tillämpligt.'),
   A('Personen ger obehörigen sig själv och sin avdelning åt fienden.'),
   A('Gärningen är uppsåtlig; särskild fiendebegreppsregel finns i BrB 21:16.'))]],
 ['Stridsförsumlighet','21:13',[
  R('Underlåtenhet att till det yttersta fullgöra stridsplikt',
   A('Gärningspersonen är krigsman eller likställd; BrB 21 kap. är tillämpligt.'),
   A('Underlåtenheten sker under eller i anslutning till strid.'),
   A('Gärningspersonen uppfyller inte sin plikt att till det yttersta främja krigföringen. Den konkreta tjänsteplikten måste fastställas.'),
   A('Gärningspersonen handlar uppsåtligen.'))]],
 ['Tjänstebrott','21:14',[
  R('Allvarligt åsidosättande av militär tjänsteplikt',
   A('Gärningspersonen är krigsman eller likställd under tid då BrB 21 kap. är tillämpligt.'),
   A('Personen åsidosätter vad som åligger honom eller henne.'),
   A('Felet är av allvarlig natur.'),
   O('Skuldformen är:', 'Uppsåt','Grov oaktsamhet'),
   A('Brottet är subsidiärt: inget ansvar enligt BrB 21:14 om gärningen är straffbelagd enligt annan bestämmelse i samma kapitel.'),
   A('Särskilt medverkansvillkor i 21:15 gäller: medverkande ska själv därigenom ha åsidosatt tjänsteplikt.'))]],
 ['Landssvek','22:2',[
  R('Gärning av typ landsförräderi med mindre kvalificerat men',
   A('Sverige är i krig; gärningen är sådan som beskrivs i BrB 22:1.'),
   O('Gärningsformen är:', 'Hindrar, missleder eller förråder personer verksamma för försvaret eller förleder dem till myteri/trolöshet/modlöshet','Förråder, förstör eller skadar egendom av betydelse för totalförsvaret','Anskaffar åt fienden krigsfolk, egendom eller tjänster','Annan liknande förrädisk gärning'),
   A('Gärningen är endast i mindre mån ägnad att medföra men för totalförsvaret eller innefattar ringare bistånd åt fienden än vad som krävs för landsförräderi.'),
   A('Gärningspersonen är uppsåtlig; särskilt undantag i BrB 22:4 kan gälla anskaffande inom fiendeockuperat område.'))]],
 ['Landsskadlig vårdslöshet','22:3',[
  R('Oaktsam krigsskada eller otillbörligt bistånd åt fienden',
   A('Gärningspersonen av oaktsamhet begår en gärning av det slag som anges i BrB 22:1 eller 22:2.'),
   O('Gärningen består i:', 'Hindrande, vilseledande eller förräderi avseende försvaret eller förledande till myteri/trolöshet/modlöshet','Angrepp eller förräderi avseende egendom som är viktig för totalförsvaret','Anskaffande av krigsfolk, egendom eller tjänster åt fienden','Liknande förrädisk gärning'),
   A('Sverige är i krig. Kvalificeringen av men eller fiendebistånd enligt 22:1–2 måste prövas.'),
   A('Skuldformen är oaktsamhet, inte uppsåt.'),
   A('Undantag i BrB 22:4 för försvarligt anskaffande av egendom/tjänster i ockuperat område kan vara aktuellt.'))]],
 ['Olovlig befattning med kemiska vapen','22:6a',[
  R('Otillåten utveckling, innehav eller överföring',
   O('Gärningsformen är:', 'Utvecklar kemiska vapen','Producerar kemiska vapen','Förvärvar kemiska vapen på annat sätt','Lagrar eller bibehåller kemiska vapen','Överför kemiska vapen direkt eller indirekt'),
   A('Föremålet uppfyller definitionen av kemiska vapen i FN:s kemvapenkonvention såsom den hänvisas till i BrB 22:6 a.'),
   A('Gärningen omfattas inte i stället av krigsförbrytelse enligt lagen (2014:406).'),
   A('Gärningen är uppsåtlig.'),
  ),
  R('Användning eller militära förberedelser',
   O('Gärningen består av:', 'Använder kemiska vapen','Deltar i militära förberedelser för användning av kemiska vapen','Använder ämnen för kravallbekämpning som en metod för krigföring'),
   A('Kemvapendefinitionen i FN-konventionen gäller när så anges i 22:6 a.'),
   A('Gärningen omfattas inte i stället av krigsförbrytelse enligt lagen (2014:406).'),
   A('Gärningen är uppsåtlig.'))]],
 ['Olovlig befattning med minor','22:6b',[
  R('Förbjuden befattning med antipersonella minor',
   O('Gärningen består av:', 'Använder','Utvecklar','Tillverkar','Förvärvar','Innehar','Överlåter'),
   A('Föremålet är en antipersonell mina (truppmina) enligt 1997 års konvention som anges i BrB 22:6 b.'),
   A('Befattningen är inte tillåten enligt den angivna konventionen.'),
   A('Gärningen ska inte i stället bedömas som krigsförbrytelse enligt lagen (2014:406).'),
   A('Gärningen är uppsåtlig. Detta brott är INTE generellt villkorat av att Sverige befinner sig i krig.'))]]
];
const degrees=[
 ['Grovt lydnadsbrott','21:6','Lydnadsbrott','Helhetsbedömning. Särskilt beakta gärning under strid eller när brott mot krigslydnad annars medför särskild fara.'],
 ['Grov olovlig avvikelse av krigsman','21:7','Olovlig avvikelse av krigsman','Helhetsbedömning. Särskilt beakta avvikelse under/i anslutning till strid eller övergång/överlämnande till fienden.'],
 ['Grovt våld eller hot mot förman','21:8','Våld eller hot mot förman','Helhetsbedömning. Särskilt beakta gärning under strid eller annars särskilt farligt brott mot krigslydnaden.'],
 ['Grov olovlig befattning med kemiska vapen','22:6a','Olovlig befattning med kemiska vapen','Helhetsbedömning. Särskilt beakta om gärningen varit ägnad att i väsentlig grad bidra till utveckling, produktion, spridning eller användning av kemiska vapen mot människor.'],
 ['Grov olovlig befattning med minor','22:6b','Olovlig befattning med minor','Helhetsbedömning. Särskilt beakta väsentligt bidrag till att minor används med fara för många människors liv eller hälsa. Konventionsundantaget gäller även vid denna grad.']
];
const out={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const structured=c=>Boolean(c?.rekvisit15?.routes?.length||c?.rekvisit15?.groups?.length);
const check=(title,ref)=>{
 const c=by(title);if(!c){out.missing.push(title);return null;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+': '+c.shortRef);return null;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS BrB '+ref);return null;}
 return c;
};
const assign=(c,ref,groups,routes)=>{
 c.rekvisit15={groups,routes,source:'BrB '+ref+' enligt Brottsbalk (1962:700)',
  sourceURL:SRC,verifiedOn:'2026-10-17',scope:'lagtext-jamford',legalReviewApproved:false,
  note:'Lagtextnära studiestöd utan fullständig rättsdogmatisk certifiering. BrB 21:1–4 avgör kapitlets tillämpningsförutsättningar och vilka personer som omfattas. För 21:7, 9, 10, 12 kan 21:16 utvidga fiendebegreppet. BrB 22:4 föreskriver särskild ansvarsfrihet vid visst anskaffande inom ockuperat område. För 22:6 a–b är krig inte i sig ett villkor: kontrollera krigsförbrytelsekonkurrens samt konventionsdefinitioner/undantag.'};
 out.added.push(c.title);
};
for(const [title,ref,routes] of direct){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 assign(c,ref,[],routes);
 if(ref.startsWith('21:'))c.rekvisit15.note+=' '+chapter21Activation;
}
for(const [title,ref,parentName,grading] of degrees){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 const p=by(parentName);
 if(!structured(p)){out.missingParent.push(title+' ← '+parentName);continue;}
 const old=JSON.parse(JSON.stringify(p.rekvisit15));
 const extra=A('Gradindelning efter helhet, inte nytt grundbrott: '+grading);
 const groups=old.groups?.length?[...old.groups,extra]:[];
 const routes=old.routes?.length?old.routes.map(r=>({...r,groups:[...(r.groups||[]),extra]})):[];
 assign(c,ref,groups,routes);
 if(ref.startsWith('21:'))c.rekvisit15.note+=' '+chapter21Activation;
}
window.BK_REKVISIT_KRIG15=out;
})();