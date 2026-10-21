/* Brottskatalog V1.5: legal-text-based BrB 16 chapter structure, 2026-10-17.
 * Keep statutory alternatives, fault standards, and special exemptions separate.
 * Not a complete case-law review; typecases deliberately withheld.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const direct=[
 ['Barnpornografibrott','16:10a',[
  R('Framställning av pornografisk bild av barn',
   A('Ett barn skildras i en pornografisk bild.'),
   A('Barn enligt BrB 16:10 a innebär under 18 år eller ofullbordad pubertetsutveckling; åldersbedömningen är lagreglerad.'),
   A('Ansvar kan följa även om gärningspersonen inte haft uppsåt till att barnet är under 18 år, om denne har varit oaktsam beträffande åldern.'),
   A('Undantag i BrB 16:10 b om ringa ålders-/utvecklingsskillnad, visst eget hantverksmässigt framställande och försvarlig gärning måste prövas.')),
  R('Tillgängliggörande av bild',
   O('Gärningen består av:', 'Sprida bilden','Överlåta bilden','Upplåta bilden','Förevisa bilden','På annat sätt tillgängliggöra bilden'),
   A('Bilden avser barn i lagens mening. Om pubertetsutvecklingen är fullbordad krävs för denna handlingsväg att det framgår av bilden och omständigheterna kring den att personen är under 18 år.'),
   A('Uppsåt krävs enligt huvudregeln; oaktsam spridning i yrkesmässig verksamhet eller förvärvssyfte är särskilt kriminaliserad.'),
   A('Den allmänna försvarlighetsregeln i BrB 16:10 b tredje stycket måste beaktas.')),
  R('Förvärv eller utbjudande',
   O('Gärningspersonen:', 'Förvärvar bild av barn','Bjuder ut bild av barn'),
   A('Om den avbildade har fullbordad pubertetsutveckling ska minderårigheten framgå av bilden och omständigheterna kring den.'),
   A('Gärningen är uppsåtlig; försvarlighetsundantaget i BrB 16:10 b prövas.')),
  R('Främjande av handel med bilder',
   O('Gärningen består av:', 'Förmedlar kontakter mellan köpare och säljare','Annan jämförbar åtgärd som syftar till att främja handel'),
   A('Objektet är pornografiska bilder av barn i paragrafens mening; fullbordad pubertet kräver åldersförhållande synligt av bilden och kringomständigheterna.'),
   A('Gärningen är uppsåtlig och det särskilda handelssyftet ska prövas.')),
  R('Innehav eller uppsåtligt åtkomlig betraktelse',
   O('Gärningsformen är:', 'Innehav av bild av barn','Betraktar bild av barn som gärningspersonen själv berett sig tillgång till'),
   A('Om pubertetsutvecklingen är fullbordad ska minderårigheten framgå av bilden och omständigheterna kring den.'),
   A('Gärningen är uppsåtlig; särskilda undantag för visst eget framställande/innehav och försvarlighet enligt BrB 16:10 b ska prövas.'))]],
 ['Djurplågeri','16:13',[
  R('Otillbörligt lidande för djur',
   O('Gärningen sker genom:', 'Misshandel av djur','Överansträngning av djur','Vanvård av djur','Annat otillbörligt tillvägagångssätt'),
   A('Ett djur utsätts för lidande och lidandet orsakas av den otillbörliga gärningen.'),
   O('Skuldformen är:', 'Uppsåt','Grov oaktsamhet'))]],
 ['Falskt larm','16:15',[
  R('Oriktig uppgift som orsakar onödig säkerhetsåtgärd',
   O('Den oriktiga uppgiften påstår fara för:', 'En eller flera människors liv','En eller flera människors hälsa','Omfattande förstörelse av egendom'),
   A('Uppgiften orsakar en onödig säkerhetsåtgärd.'),
   A('Gärningspersonen handlar uppsåtligen. Enbart missbruk av larmanordning utan en sådan uppgift bedöms separat.'))]],
 ['Förledande av ungdom','16:12',[
  R('Spridning av förråande material till unga',
   A('En skrift, bild eller teknisk upptagning sprids bland barn eller ungdom.'),
   A('Innehållet kan verka förråande eller annars medföra allvarlig fara för de ungas sedliga fostran.'),
   A('Gärningspersonen handlar uppsåtligen till spridningen och de relevanta omständigheterna.'))]],
 ['Hets mot folkgrupp','16:8',[
  R('Spritt uttalande med hot, våldsuppmaning eller missaktning',
   A('Ett uttalande eller annat meddelande sprids.'),
   O('Innehållet:', 'Uppmanar till våld','Hotar','Uttrycker missaktning'),
   A('Meddelandet riktas mot folkgrupp, annan sådan grupp eller enskild person i en sådan grupp med anspelning på en skyddad grund enligt BrB 16:8.'),
   O('Grunden är:', 'Ras eller hudfärg','Nationellt eller etniskt ursprung','Trosbekännelse','Sexuell läggning','Könsöverskridande identitet eller uttryck'),
   A('Gärningen är uppsåtlig. Yttrandefrihetsrättsliga sammanhang och relevant praxis måste prövas.')),
  R('Förnekande, ursäktande eller uppenbart förringande av viss internationell kärnbrottslighet',
   A('Ett uttalande eller annat meddelande sprids.'),
   O('Gärningspersonen:', 'Förnekar aktuellt brott','Ursäktar aktuellt brott','Uppenbart förringar aktuellt brott'),
   A('Det avser folkmord, brott mot mänskligheten, krigsförbrytelse eller aggressionsbrott enligt lagakraftvunnet avgörande från svensk domstol eller erkänd internationell domstol för brott mot folkrätten.'),
   A('Gärningen är ägnad att uppmana till våld mot, hota eller uttrycka missaktning för skyddad grupp eller enskild i sådan grupp.'),
   A('Gärningen är uppsåtlig; läs uttryckligen BrB 16:8 andra stycket och tillämplig yttrandefrihetspraxis.'))]],
 ['Involverande av en underårig i brottslighet','16:5a',[
  R('Barn rekryteras eller används i brottslighet',
   A('Den involverade personen är under 18 år.'),
   O('Gärningspersonen:', 'Anlitar den underårige','Betalar den underårige','Instruerar den underårige','Överlämnar egendom till den underårige','Agerar på annat liknande sätt'),
   A('Åtgärden innebär att den underårige involveras i brott eller brottslig verksamhet.'),
   A('Gärningspersonen handlar uppsåtligen i fråga om gärningen. Beträffande att den andre inte fyllt 18 år räcker oaktsamhet.'),
   A('Undantag: gärningen är uppenbart mindre allvarlig med hänsyn till ringa ålders-/utvecklingsskillnad eller andra omständigheter.'))]],
 ['Missbruk av larmanordning','16:15',[
  R('Missbruk orsakar onödig myndighetsutryckning',
   O('Det som missbrukas är:', 'Larm','Nödsignal','Annan jämförbar anordning'),
   A('Missbruket leder till en onödig utryckning av Polismyndigheten, kommunal räddningstjänst, ambulans, militär, sjöräddning eller annat organ för allmän bevakningstjänst.'),
   A('Gärningspersonen handlar uppsåtligen. Detta är en separat gärningsform från falskt larm enligt första stycket.'))]],
 ['Myteri','16:6',[
  R('Gemensamt hot från krigsmän',
   A('En samling av krigsmän hotar gemensamt med våld att sätta sig upp mot en förman.'),
   A('Gärningspersonen deltar uppsåtligen; ledarrollen har särskild straffskala även utan genomfört våld.')),
  R('Anstiftare eller anförare för gemensamt hot',
   A('En samling av krigsmän hotar gemensamt med våld att sätta sig upp mot förman.'),
   A('Gärningspersonen anstiftar eller anför myteriet.'),
   A('Ledarrollens särskilda straffskala måste användas.')),
  R('Myteri där förenat våld faktiskt används',
   A('En samling krigsmän har begått myteri enligt paragrafen och använder gemensamt våld mot person eller egendom.'),
   A('Gärningspersonen deltar uppsåtligen. Straffskalan för genomfört våld skiljer sig från enbart hot.')),
  R('Anstiftare eller anförare vid gemensamt våld',
   A('En samling krigsmän har gått från gemensamt hot till gemensamt våld mot person eller egendom.'),
   A('Gärningspersonen anstiftar eller anför. Särskild straffskala upp till livstid kan aktualiseras.'),
   A('Särskild grovhetsbedömning gäller även annars, särskilt vid strid eller annan allvarlig krigslydnadsfara.'))]],
 ['Olaga våldsskildring','16:10c',[
  R('Sexuellt våld eller tvång i bild',
   O('Gärningen är:', 'Att framställa bild som skildrar sexuellt våld eller tvång med avsikt att sprida','Att sprida sådan skildring'),
   A('Gärningen är inte försvarlig med hänsyn till omständigheterna.'),
   A('Uppsåt krävs; särskild regel omfattar oaktsam spridning i yrkesmässig verksamhet eller annars i förvärvssyfte.')),
  R('Närgången eller utdragen skildring av grovt våld i rörlig bild',
   A('Skildringen avser i rörliga bilder grovt våld mot människor eller djur, återgivet närgånget eller utdraget.'),
   O('Gärningen är:', 'Framställning med uppsåt att bilderna sprids','Spridning av sådana rörliga bilder'),
   A('Gärningen är inte försvarlig; vid yrkesmässig/förvärvsinriktad spridning kan oaktsamhet räcka.'))]],
 ['Otillåten utlämning av teknisk upptagning','16:10d',[
  R('Yrkesmässig eller förvärvsinriktad utlämning till barn under 15 år',
   A('I yrkesmässig verksamhet eller annars i förvärvssyfte lämnas film, videogram eller annan teknisk upptagning med rörliga bilder ut till person under 15 år.'),
   A('Materialet innehåller ingående skildringar av verklighetstrogen karaktär av våld eller hot om våld mot människor eller djur.'),
   O('Skuldformen är:', 'Uppsåt','Grov oaktsamhet'),
   A('Undantag: relevant innehåll godkänt för visning för någon åldersgrupp under 15 år av Mediemyndigheten.'),
   A('Undantag: offentlig förevisning. Särskild regel om godkännandeintyg, oriktigt intyg och insikt/oaktsamhet ska prövas.'))]],
 ['Otillåtet förfarande med pornografisk bild','16:11',[
  R('Allmän förevisning som är ägnad att väcka anstöt',
   A('En pornografisk bild förevisas på eller vid allmän plats genom skyltning eller liknande förfarande.'),
   A('Förevisningen är ägnad att väcka allmän anstöt.'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Oombedd tillställning av pornografisk bild',
   A('Pornografisk bild sänds med post eller tillställs annars någon.'),
   A('Mottagaren har inte dessförinnan beställt bilden.'),
   A('Gärningspersonen handlar uppsåtligen.'))]]
];
const degrees=[
 ['Grovt barnpornografibrott','16:10a','Barnpornografibrott',
  'Helhetsbedömning. Särskilt beakta yrkesmässigt/vinstsyfte, systematisk eller omfattande brottslighet, särskilt stor mängd bilder, särskilt unga barn eller barn som utsatts för våld, tvång eller annan särskild hänsynslöshet. BrB 16:10 b kan fortfarande aktualiseras.'],
 ['Grovt djurplågeri','16:13','Djurplågeri',
  'Helhetsbedömning. Särskilt beakta allvarligt lidande, stort antal djur eller särskilt hänsynslös/farlig art. Skuldformen i grunden är uppsåt eller grov oaktsamhet.'],
 ['Grovt falskt larm','16:15','Falskt larm',
  'Helhetsbedömning av den oriktiga uppgiften, den onödiga säkerhetsåtgärden och dess allvar. Grovhetsgraden anges i BrB 16:15 andra stycket utan uttömmande obligatoriska särskilda faktorer.']
];
const out={added:[],already:[],missing:[],mismatch:[],missingParent:[]};
const structured=c=>Boolean(c?.rekvisit15?.groups?.length||c?.rekvisit15?.routes?.length);
const check=(title,ref)=>{
 const c=by(title);if(!c){out.missing.push(title);return null;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){out.mismatch.push(title+' '+c.shortRef);return null;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text){out.missing.push('SFS-text '+ref);return null;}
 return c;
};
const assign=(c,ref,groups,routes)=>{
 c.rekvisit15={groups,routes,source:'Brottsbalk (1962:700), BrB '+ref,sourceURL:SRC,scope:'lagtext-jamford',
  verifiedOn:'2026-10-17',legalReviewApproved:false,
  note:'Läs alltid gällande paragraf, skuldform, de uttryckliga undantagen och tillämplig rättspraxis. Denna lagtextnära OCH/ELLER-struktur är inte en fullständig rättsdogmatisk granskning. Inga osäkra typexempel har tillkommit.'};
 out.added.push(c.title);
};
for(const [title,ref,routes] of direct){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 assign(c,ref,[],routes);
}
for(const [title,ref,parent,grading] of degrees){
 const c=check(title,ref);if(!c)continue;
 if(structured(c)){out.already.push(title);continue;}
 const p=by(parent);if(!structured(p)){out.missingParent.push(title+' ← '+parent);continue;}
 const old=JSON.parse(JSON.stringify(p.rekvisit15));
 const qualifier=A('Gradbedömning, inte ytterligare självständig gärningsväg: '+grading);
 assign(c,ref,old.groups?.length?[...old.groups,qualifier]:[],
  old.routes?.length?old.routes.map(r=>({...r,groups:[...(r.groups||[]),qualifier]})):[]);
}
window.BK_REKVISIT_ORDNING15=out;
})();