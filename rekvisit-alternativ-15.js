/* V1.5: statutory offence alternatives in chapters 4, 6, 8, 9, 10 and 11.
 * Current SFS wording controls. These are pedagogical, limited-extent
 * statutory checklists, not court findings or full legal certification.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const norm=s=>String(s||'').toLocaleLowerCase('sv').trim();
const by=t=>D.crimes.find(c=>!c.stageType&&norm(c.title)===norm(t));
const specs=[
 ['Människorov','4:1',[],[
  {label:'Bemäktigande och bortförande',groups:[
   A('Gärningspersonen bemäktigar sig en person och för bort denne.'),
   O('Särskilt uppsåt föreligger att:', 'Skada den bortförde till liv eller hälsa','Tvinga personen till tjänst','Utöva utpressning'),
   A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Inspärrning',groups:[
   A('Gärningspersonen spärrar in en person.'),
   O('Särskilt uppsåt föreligger att:', 'Skada den instängde till liv eller hälsa','Tvinga personen till tjänst','Utöva utpressning'),
   A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Människohandel','4:1a',[],[
  {label:'Vuxen: gärningshandling, otillbörligt medel och exploateringssyfte',groups:[
   O('Handlingen består i att:', 'Rekrytera','Transportera','Överföra','Inhysa','Ta emot'),
   O('Medlet är:', 'Olaga tvång','Vilseledande','Utnyttjande av utsatt belägenhet som allvarligt begränsar den utsattes alternativ','Annat sådant otillbörligt medel med motsvarande allvarlig begränsning'),
   O('Särskilt syfte att exploatera personen för:', 'Sexuella ändamål','Avlägsnande av organ','Krigstjänst','Tvångsarbete','Annan verksamhet i en situation som innebär nödläge för den utsatte'),
   A('Gärningen är inte människorov enligt BrB 4:1 och omfattas av gärningspersonens uppsåt.') ]},
  {label:'Barn under 18 år: inget otillbörligt medel krävs',groups:[
   A('Personen som utsätts har inte fyllt 18 år. För åldersomständigheten räcker oaktsamhet enligt specialregeln.'),
   O('Gärningspersonen:', 'Rekryterar','Transporterar','Överför','Inhyser','Tar emot'),
   O('Syftet är exploatering för:', 'Sexuella ändamål','Avlägsnande av organ','Krigstjänst','Tvångsarbete','Annan verksamhet i en situation som innebär nödläge'),
   A('Krav på det otillbörliga medlet i första stycket gäller inte för barnvarianten; övriga nödvändiga omständigheter måste vara styrkta.') ]}
 ]],
 ['Människoexploatering','4:1b',[],[
  {label:'Person utan särskild barnregel',groups:[
   O('Medlet är:', 'Olaga tvång','Vilseledande','Utnyttjande av beroendeställning','Utnyttjande av skyddslöshet','Utnyttjande av svår situation'),
   O('Personen exploateras genom:', 'Tvångsarbete','Arbete under uppenbart orimliga villkor','Tiggeri'),
   A('Gärningen omfattas inte i stället av BrB 4:1 eller 4:1 a. Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Barn under 18: exploatering utan otillbörligt medel',groups:[
   A('Den exploaterade personen är under 18 år; för åldern gäller en uttrycklig oaktsamhetsregel.'),
   O('Gärningsformen är exploatering i:', 'Tvångsarbete','Arbete under uppenbart orimliga villkor','Tiggeri'),
   A('För barn krävs inte olaga tvång, vilseledande eller utnyttjande av beroende-/skyddslöshet/svår situation.'),
   A('Gärningen omfattas inte av BrB 4:1 eller 4:1 a; pröva uppsåt till övriga omständigheter.') ]}
 ]],
 ['Grov människoexploatering','4:1b',[],null,'Människoexploatering','Omfattande verksamhet, betydande vinning eller särskilt hänsynslöst utnyttjande är exempel på faktorer som ska särskilt beaktas vid en samlad grovhetsbedömning.'],
 ['Olaga förföljelse','4:4b',[
  A('Gärningspersonen begår eller medverkar till mer än en straffbelagd gärning av det slag som uttömmande räknas upp i BrB 4:4 b.'),
  O('De uppräknade gärningarna kan bland annat bestå av:', 'Misshandel eller straffbart försök till misshandel','Olaga tvång, olaga hot eller hemfridsbrott/olaga intrång','Kränkande fotografering, olovlig identitetsanvändning eller olaga integritetsintrång','Ofredande, psykiskt våld eller de särskilt angivna självmordsbrotten','Förtal, grovt förtal eller förolämpning','Sexuellt ofredande eller sexuellt ofredande mot barn','Skadegörelse eller ringa skadegörelse (samt angivet försöksbrott)','Angivna brott mot tjänsteman','Angivna överträdelser av kontaktförbud'),
  A('Var och en av de brottsliga gärningarna ska vara ett led i en upprepad kränkning av den utsattes integritet.'),
  A('Gärningspersonen handlar uppsåtligen. Den uttömmande uppräkningen och särskilda lagrum/stycken måste läsas före bedömning.')
 ]],
 ['Inbrottsstöld','8:4a',[
  A('Samtliga rekvisit för stöld enligt BrB 8:1 är uppfyllda.'),
  A('Stölden har skett efter intrång i bostad eller annat liknande boende.'),
  A('Integritetskränkningen och omständigheterna är inte av mindre allvarlig art; i sådana fall används annan tillämplig rubricering enligt lagtexten.'),
  A('Gärningspersonen har uppsåt till de relevanta omständigheterna.')
 ]],
 ['Rån','8:5',[],[
  {label:'Stöld med råntvång',groups:[
   O('Råntvång används:', 'Våld på person','Hot som innebär eller för den hotade framstår som trängande fara','Försättande i vanmakt eller liknande tillstånd, vilket lagen jämställer med våld'),
   A('Gärningen innebär stöld enligt BrB 8:1.'),
   A('Råntvånget och stölden omfattas av uppsåt. Om gärningen är av mindre allvarlig art ska annan rubricering prövas.') ]},
  {label:'Tvingad disposition med vinning och skada',groups:[
   O('Råntvång används:', 'Våld på person','Hot om trängande fara','Försättande i vanmakt eller motsvarande tillstånd'),
   A('Den hotade tvingas till handling eller underlåtenhet.'),
   A('Den framtvingade dispositionen innebär vinning för gärningspersonen och skada för den tvingade eller någon i dennes ställe.'),
   A('Gärningspersonen handlar uppsåtligen. Mindre allvarlig gärning ska särbedömas.') ]},
  {label:'Tillgrepp av betalningsverktyg',groups:[
   O('Råntvång används:', 'Våld på person','Hot om trängande fara','Försättande i vanmakt eller liknande'),
   A('Gärningspersonen tar olovligen eller tvingar till sig ett betalningsverktyg.'),
   A('Särskild avsikt finns att använda betalningsverktyget för att bereda sig själv eller annan vinning.'),
   A('Gärningspersonen handlar uppsåtligen. Mindre allvarlig gärning ska särbedömas.') ]},
  {label:'Motvärnsrån',groups:[
   A('Gärningspersonen har redan begått stöld eller olovligen tagit ett betalningsverktyg.'),
   A('Gärningspersonen blir anträffad på bar gärning och någon vill återta det tillgripna.'),
   O('Motvärnet består av:', 'Våld på person','Hot om trängande fara','Försättande i vanmakt eller motsvarande'),
   A('Gärningspersonen handlar uppsåtligen. Bedöm om gärningen är av mindre allvarlig art.') ]}
 ]],
 ['Grovt rån','8:6',[],null,'Rån','Brottet ska vara rån enligt BrB 8:5 och grovt efter helhetsbedömning. Särskilt beaktas livsfarligt våld, svår kroppsskada, allvarlig sjukdom, synnerlig råhet, hänsynslöst utnyttjande av skyddslöshet eller särskilt farlig art.'],
 ['Ringa bedrägeri','9:2',[],[
  {label:'Ringa fall av vanligt eller datorrelaterat bedrägeri',groups:[
   A('Rekvisiten för ett av gärningsalternativen i BrB 9:1 är uppfyllda.'),
   A('Med hänsyn till skadans omfattning och övriga omständigheter är brottet ringa.') ]},
  {label:'Smitning från kontantbetalning (utan att betala)',groups:[
   A('Gärningspersonen tillgodogör sig utan att betala husrum, förtäring, transport, tillträde till föreställning eller jämförbar kontantbetald nyttighet.'),
   A('Bestämmelsen gäller oavsett om någon vilseletts.'),
   A('Undantaget för värde som inte är ringa och gärning som samtidigt omfattas av 9:1 måste beaktas.'),
   A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Grovt bedrägeri','9:3',[],null,'Bedrägeri','Grundbrottets rekvisit måste vara uppfyllda. Grovhet bedöms samlat; särskilt beaktas förtroendemissbruk, oriktig handling/bokföring, hänsynslöst utnyttjande av utsatt ställning, betydande värde, kännbar skada, systematik eller särskild farlighet.'],
 ['Oredlighet mot borgenärer','11:1',[],[
  {label:'Betydande egendom försvinner i eller inför obestånd',groups:[
   O('Obeståndsförhållandet är:', 'Gäldenären är på obestånd','Påtaglig fara för obestånd föreligger','Gäldenären blir genom den aktuella åtgärden insolvent eller i påtaglig fara för obestånd'),
   O('Gärningspersonen:', 'Förstör egendom av betydande värde','Avhänder sig sådan egendom genom gåva eller jämförbar åtgärd'),
   A('Gärningspersonen handlar uppsåtligen till gärningen och relevanta förhållanden.') ]},
  {label:'Utförsel inför konkurs',groups:[
   A('Gäldenären står inför en förestående konkurs.'),
   A('En tillgång av betydande värde förs ut ur Sverige.'),
   A('Gärningspersonen har särskilt uppsåt att hålla tillgången undan konkursen.') ]},
  {label:'Undanhållande under konkurs',groups:[
   A('Gäldenären är i konkurs.'),
   O('Gärningen sker genom:', 'Att undandra konkursförvaltningen tillgång','Att undanhålla konkursförvaltningen tillgång'),
   A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Utländska tillgångar i konkurs',groups:[
   A('Tillgång i utlandet ingår i konkursen och konkursförvaltaren har uppmanat gäldenären att medverka.'),
   A('Gäldenären underlåter i otillbörligt syfte att så långt möjligt medverka till att tillgången ställs till konkursförvaltningens förfogande.'),
   A('Gärningspersonen handlar uppsåtligen med det särskilda otillbörliga syftet.') ]}
 ]],
 ['Grov oredlighet mot borgenärer','11:1',[],null,'Oredlighet mot borgenärer','Särskilt ska beaktas beedigad oriktig uppgift, falsk handling, vilseledande bokföring, betydande omfattning eller särskilt farlig art; helhetsbedömning avgör.'],
 ['Försvårande av konkurs eller exekutiv förrättning','11:2',[],[
  {label:'Oriktig uppgift vid konkurs, skuldsanering eller planförhandling',groups:[
   A('Gäldenären befinner sig i något av de i BrB 11:2 angivna förfarandena: konkurs, skuldsanering, F-skuldsanering eller planförhandling under företagsrekonstruktion.'),
   O('Gärningen består av:', 'Förtigande av tillgång','Uppgift om obefintlig skuld','Annan jämförbar oriktig uppgift'),
   O('Skuldform:', 'Uppsåt','Grov oaktsamhet'),
   A('Uppgiften har inte rättats innan den beedigas eller annars läggs till grund för förfarandet.'),
   A('Undantag gäller om uppgiften saknar betydelse för saken eller särskilt ursäktligt förtigande vid konkurs där gäldenären hade rätt att vägra yttra sig.') ]},
  {label:'Exekutiv förrättning med oriktig handling',groups:[
   A('Annan exekutiv förrättning pågår.'),
   O('Gäldenären uppsåtligen åberopar:', 'Oriktig handling','Skenavtal'),
   A('Åberopandet hindrar att erforderlig egendom tas i anspråk för borgenärens betalning eller säkerhet.') ]}
 ]],
 ['Grovt försvårande av konkurs eller exekutiv förrättning','11:2',[],null,'Försvårande av konkurs eller exekutiv förrättning','Grov form kräver uppsåt; grov oaktsamhet ensam räcker inte. Helhetsbedömning: beedigad oriktig uppgift, falsk handling, vilseledande bokföring eller betydande omfattning.'],
 ['Sexuellt ofredande','6:10',[],[
  {label:'Blottande',groups:[
   A('En person blottar sig för någon annan.'),
   A('Gärningen är ägnad att väcka obehag.'),
   A('Gärningen omfattas inte av tidigare bestämmelse i BrB 6 kap. och gärningspersonen handlar uppsåtligen.') ]},
  {label:'Ofredande av sexuell integritet',groups:[
   O('Handlingsformen är:', 'Ord','Handlande'),
   A('Gärningen är ägnad att kränka personens sexuella integritet.'),
   A('Gärningen omfattas inte av tidigare bestämmelse i BrB 6 kap.; gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Sexuellt ofredande mot barn','6:10',[],[
  {label:'Sexuell beröring eller att förmå ett barn till handling',groups:[
   A('Den utsatte är ett barn under 15 år. Barnets ålder och tillämpliga subjektiva åldersregel måste prövas.'),
   O('Gärningsformen är:', 'Sexuell beröring','Att förmå barnet att företa en handling med sexuell innebörd','Att förmå barnet att medverka i en sådan handling'),
   A('Gärningen omfattas inte av tidigare bestämmelse i BrB 6 kap.') ]},
  {label:'Blottande eller annat sexuellt ofredande mot barn',groups:[
   A('Den utsatte är ett barn under 15 år.'),
   A('Handlingen är en sådan gärning som enligt BrB 6:10 andra stycket innebär sexuellt ofredande.'),
   A('Tidigare bestämmelser i BrB 6 kap. har företräde och åldersbestämmelserna måste kontrolleras.') ]}
 ]],
 ['Grovt olaga integritetsintrång','4:6d',[],null,'Olaga integritetsintrång','Brott enligt BrB 4:6 c och grovhet efter helhetsbedömning. Särskilt ska beaktas om innehåll, spridningssätt eller omfattning är ägnade att orsaka mycket allvarlig skada.'],
 ['Grovt bokföringsbrott','11:5',[],null,'Bokföringsbrott','Vid helhetsbedömningen beaktas särskilt mycket betydande belopp, falsk handling, systematisk brottslighet eller särskilt farlig art.'],
 ['Grovt sexuellt ofredande','6:10',[],null,'Sexuellt ofredande','Grovhet efter helhetsbedömning; särskilt beaktas flera deltagande förövare eller särskild hänsynslöshet med hänsyn till offrets låga ålder eller annan omständighet.'],
 ['Grovt sexuellt ofredande mot barn','6:10',[],null,'Sexuellt ofredande mot barn','Grovhet efter helhetsbedömning; särskilt beaktas flera deltagande förövare eller särskild hänsynslöshet med hänsyn till barnets låga ålder eller annan omständighet.']
];
// BrB 11:1 explicitly creates a separately named aggravated grade; index it
// if earlier inventory omitted it, before building derived inchoate cards.
if(!D.crimes.some(c=>!c.stageType&&c.title==='Grov oredlighet mot borgenärer')){
 const parent=D.crimes.find(c=>!c.stageType&&c.title==='Oredlighet mot borgenärer');
 const statute=window.BK_STATUTES?.['BrB:11:1'];
 if(!parent||!statute?.text?.includes('grov oredlighet mot borgenärer'))throw Error('Cannot safely add aggravated BrB 11:1: official law or base offence missing');
 D.crimes.push({
  id:'v15-grov-oredlighet-mot-borgenarer',title:'Grov oredlighet mot borgenärer',
  shortRef:'BrB 11:1',ref:'BrB 11 kap. 1 §',statute:'BrB:11:1',
  category:parent.category||'Förmögenhet',aliases:[],
  law:statute.text,lawSource:statute.ref,lawMode:'machine',sourceURL:SFS,
  penalty:'Fängelse i lägst ett och högst sex år',penaltyShort:'F 1–6 år',
  penaltyRange:{min:1,max:6,fines:false,life:false},
  penaltyRangeVerified:true,penaltyReviewScope:'numerical-scale-only',
  penaltyChecked:'2026-10-16',penaltySourceURL:SFS,
  penaltyNote:'Grovhetsbedömningen sker med stöd av BrB 11:1 efter helhetsbedömning; från 2026-08-01 gäller lägst ett års fängelse för grov form.',
  custody:'possible',prosecution:'general',prosecutionLabel:'Allmänt åtal',
  prosecutionRule:'RB 20:3; BrB 11:1',prosecutionSourceURL:SFS,
  prosecutionDetails:['Kontrollera särskilda förutsättningar och gärningsdatum.'],
  prosecutionChecked:'2026-10-16',reviewStatus:'law-text-legal-review-pending',
  elements:[],variants:[],facts:[],stages:[],related:[parent.id],lawTerms:[],typexempel15:[],
  requisitesStatus:'pending-individual-legal-review'
 });
}
let updated=0,exists=0,missing=[],mismatched=[],inherited=0;
const bind=(c,ref,obj)=>{
 c.rekvisit15={...obj,source:'BrB '+ref+' och BrB 1:2, där tillämpligt',
  sourceURL:SFS,scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Punktvis rekvisitstöd för gällande paragraftext, inte fullständig juridisk certifiering. Kontrollera gärningsdatum, förarbeten, rättspraxis, gradindelning, skuldformer, undantag och konkurrens.'};
};
for(const [title,ref,groups,routes,parent,qualification] of specs){
 const c=D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
 if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatched.push(title+': '+c.shortRef+' / BrB '+ref);continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Source not loaded for '+title);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){exists++;continue;}
 if(parent){
   const p=D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===parent.toLocaleLowerCase('sv'));
   if(!p?.rekvisit15 || !(p.rekvisit15.groups?.length||p.rekvisit15.routes?.length)){missing.push(title+' [parent '+parent+']');continue;}
   const copy=JSON.parse(JSON.stringify(p.rekvisit15));
   const qualifier=A('Särskild gradbedömning: '+qualification);
   if(copy.routes?.length)copy.routes=copy.routes.map(r=>({...r,groups:[...r.groups,qualifier]}));
   else copy.groups=[...(copy.groups||[]),qualifier];
   // BrB 11:2 gross requires intent, not merely gross negligence.
   if(title==='Grovt försvårande av konkurs eller exekutiv förrättning'){
     const forceIntent=g=>g.map(x=>x.mode==='any'&&/Skuldform/i.test(x.label)?A('Brottet begås uppsåtligen. Grov oaktsamhet räcker inte för grov grad.'):x);
     copy.routes=(copy.routes||[]).map(r=>({...r,groups:forceIntent(r.groups)}));
   }
   bind(c,ref,copy);inherited++;
 }else bind(c,ref,{groups,routes:routes||[]});
 updated++;
}
window.BK_REKVISIT_ALTERNATIVES15={updated,exists,inherited,missing,mismatched,source:SFS,scope:'partial-statutory-analysis'};
})();