/* V1.5: 2026-10-16 staged individual statutory review, separate gärningsvägar.
 * A structured study aid is not a comprehensive case-law verification.
 * Do not add speculative police typexempel for borderline crimes.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label});
const O=(label,...options)=>({mode:'any',label,options});
const R=(label,...groups)=>({label,groups});
const rows=[
 ['Människorov','4:1',[
  R('Grundgärning',
   O('Gärningsformen är:','Gärningspersonen bemäktigar sig och för bort en annan person.','Gärningspersonen spärrar in en annan person.'),
   O('Det särskilda syftet är:','Skada den andre till liv eller hälsa.','Tvinga den andre till tjänst.','Utöva utpressning.'),
   A('Gärningspersonen har uppsåt till gärningen och det särskilda syftet.'),
   A('Den lindrigare straffskalan vid mindre grovt brott kräver separat helhetsbedömning.'))
 ]],
 ['Människohandel','4:1a',[
  R('Vuxen utsatt person',
   O('Gärningspersonen:','Rekryterar.','Transporterar.','Överför.','Inhyser.','Tar emot personen.'),
   O('Ett otillbörligt medel används:','Olaga tvång.','Vilseledande.','Utnyttjande av utsatt belägenhet som allvarligt begränsar personens alternativ.','Annat sådant otillbörligt medel som allvarligt begränsar alternativen.'),
   O('Syftet är exploatering för:','Sexuella ändamål.','Avlägsnande av organ.','Krigstjänst.','Tvångsarbete.','Annan verksamhet i en situation som innebär nödläge för den utsatte.'),
   A('Gärningen omfattas inte av BrB 4:1. Gärningspersonen har uppsåt till de relevanta omständigheterna och exploateringssyftet.')),
  R('Utsatt person under 18 år',
   A('Samma gärning och exploateringssyfte som första stycket; otillbörligt medel behöver inte styrkas.'),
   A('Den utsatta personen är under 18 år. Uppsåt till åldern krävs inte om gärningspersonen har varit oaktsam om den.'),
   A('Gärningen omfattas inte i stället av BrB 4:1. Ringa/mindre grovt alternativ ska bedömas separat.'))
 ]],
 ['Människoexploatering','4:1b',[
  R('Vuxen utsatt person',
   O('Medlet är:','Olaga tvång.','Vilseledande.','Utnyttjande av beroendeställning.','Utnyttjande av skyddslöshet.','Utnyttjande av svår situation.'),
   O('Exploateringen sker i:','Tvångsarbete.','Arbete under uppenbart orimliga villkor.','Tiggeri.'),
   A('Gärningen omfattas inte av människohandel eller människorov enligt BrB 4:1–1 a. Gärningspersonen handlar uppsåtligen.')),
  R('Utsatt person under 18 år',
   O('Exploateringen sker i:','Tvångsarbete.','Arbete under uppenbart orimliga villkor.','Tiggeri.'),
   A('Personen är under 18 år; tvång, vilseledande eller utnyttjande behöver inte föreligga.'),
   A('Oaktsamhet i förhållande till barnets ålder kan räcka enligt bestämmelsen. Gärningen omfattas inte av BrB 4:1–1 a.'))
 ]],
 ['Olaga förföljelse','4:4b',[
  R('Upprepade särskilt angivna brott',
   A('En identifierbar person har förföljts genom flera brottsliga gärningar eller medverkansgärningar.'),
   O('Gärningarna hör till lagens uttömmande uppräkning (BrB 4:4 b p. 1–19):',
    'Misshandel eller försök till misshandel som inte är ringa.',
    'Olaga tvång eller olaga hot enligt angivna stycken.',
    'Hemfridsbrott eller olaga intrång.',
    'Kränkande fotografering, olovlig identitetsanvändning eller olaga integritetsintrång.',
    'Ofredande, uppmaning till självmord, oaktsam uppmaning till självmord eller psykiskt våld.',
    'Förtal, grovt förtal eller förolämpning.',
    'Sexuellt ofredande mot barn eller sexuellt ofredande.',
    'Skadegörelse eller försök till skadegörelse, eller ringa skadegörelse.',
    'Våld/hot mot tjänsteman eller försök; angrepp mot tjänsteman eller försök; förolämpning mot tjänsteman.',
    'Överträdelse av kontaktförbud enligt de uttryckligt angivna varianterna.'),
   A('Var och en av gärningarna har utgjort ett led i en upprepad kränkning av den utsattas integritet.'),
   A('Skuldformen bedöms för varje gärning; det krävs inte att gärningspersonen är närstående till den utsatta.'))
 ]],
 ['Ringa bedrägeri','9:2',[
  R('Ringa gärning enligt bedrägerirekvisiten',
   A('Rekvisiten för bedrägeri i BrB 9:1 är uppfyllda.'),
   A('Skadans omfattning och övriga omständigheter innebär att brottet är ringa.')),
  R('Tillgodogörande utan kontant betalning',
   O('Den erhållna nyttigheten utgör:','Husrum.','Förtäring.','Transport.','Tillträde till föreställning.','Annan liknande nyttighet som tillhandahålls mot kontant betalning.'),
   A('Gärningspersonen tillgodogör sig nyttigheten utan att göra rätt för sig. Vilseledande krävs inte i detta alternativ.'),
   A('Undantag gäller om värdet inte är ringa och gärningen i övrigt uppfyller BrB 9:1. Uppsåt ska prövas.'))
 ]],
 ['Utförselhäleri','9:6a',[
  R('Särskilt exportsyfte',
   A('Egendomen kan skäligen antas vara frånhänd en annan person genom brott.'),
   A('Gärningspersonen tar befattning med egendomen på sätt som är ägnat att försvåra ett återställande.'),
   A('Gärningspersonen har ett särskilt syfte att föra egendomen ut ur landet.'),
   A('Gärningspersonen handlar uppsåtligen till relevanta omständigheter.'))
 ]],
 ['Oredlighet mot borgenärer','11:1',[
  R('Avhändande/förstörande vid obestånd',
   O('Gäldenärens tillstånd är:','Obestånd.','Påtaglig fara för obestånd.','Obestånd eller påtaglig fara uppkommer genom den aktuella gärningen.'),
   O('Gärningspersonen avhänder sig egendom av betydande värde genom:','Förstörelse.','Gåva.','Annan liknande åtgärd.'),
   A('Gärningspersonen handlar uppsåtligen.')),
  R('Undanhållande av tillgångar inför eller under konkurs',
   O('Gärningsformen är:','Vid förestående konkurs förs tillgång av betydande värde ur riket med uppsåt att undanhålla den.','I konkurs undandras eller undanhålls tillgång från konkursförvaltningen.'),
   A('Gärningspersonen har rollen gäldenär och handlar uppsåtligen.')),
  R('Underlåten medverkan avseende tillgång utomlands',
   A('Gäldenären är i konkurs och en utländsk tillgång ingår i konkursboet.'),
   A('Konkursförvaltaren har uppmanat gäldenären att så långt möjligt medverka till att ställa tillgången till förfogande.'),
   A('Gäldenären underlåter i otillbörligt syfte att medverka så långt möjligt.'))
 ]],
 ['Försvårande av konkurs eller exekutiv förrättning','11:2',[
  R('Oriktig uppgift eller förtigande vid särskilt förfarande',
   O('Förfarandet är:','Konkurs.','Skuldsanering.','F-skuldsanering.','Planförhandling under företagsrekonstruktion.'),
   O('Åtgärden är:','Förtigande av en tillgång.','Uppgift om obefintlig skuld.','Annan sådan oriktig uppgift.'),
   O('Skuldformen är:','Uppsåt.','Grov oaktsamhet.'),
   A('Uppgiften har inte rättats innan den beedigas eller annars läggs till grund för förfarandet.'),
   A('Lagstadgade undantag för betydelselös uppgift och vissa ursäktade vägranden att yttra sig ska prövas.')),
  R('Skenavtal/oriktig handling vid annan exekutiv förrättning',
   A('Gäldenären åberopar uppsåtligen oriktig handling eller skenavtal vid annan exekutiv förrättning.'),
   A('Därigenom hindras att tillräcklig egendom tas i anspråk för borgenärs betalning eller säkerhet.'))
 ]],
 ['Mened','15:1',[
  R('Osann utsaga under lagföreskriven ed',
   A('Gärningspersonen har avlagt ed som är föreskriven i lag.'),
   O('Utsagehandlingen består av:','Osann uppgift.','Förtigande av sanningen.'),
   A('Gärningspersonen handlar uppsåtligen.'),
   A('Ansvar kan falla bort enligt BrB 15:4 om uppgiften är utan betydelse eller avser något man fick vägra att yttra sig om och skälig ursäkt föreligger.'),
   A('Mindre allvarligt och grovt brott har särskilda straffskalor; dessa bedöms separat.'))
 ]],
 ['Osann partsutsaga','15:2',[
  R('Oriktig utsaga vid sanningsförsäkran',
   A('Gärningspersonen hörs under sanningsförsäkran vid rättegång.'),
   O('Gärningen är:','Osann uppgift.','Förtigande av sanningen.'),
   A('Gärningspersonen handlar uppsåtligen.'),
   A('Undantagen i BrB 15:4 ska beaktas; ringa gärning medför lindrigare straffskala.'))
 ]],
 ['Ovarsam utsaga','15:3',[
  R('Grov oaktsamhet vid ed eller sanningsförsäkran',
   A('Utsagan eller förtigandet utgör en gärning som annars beskrivs i BrB 15:1 eller 15:2.'),
   A('Gärningspersonen är grovt oaktsam i fråga om oriktigheten eller förtigandet.'),
   A('Undantagen om betydelselös utsaga och ursäktat vägrande att yttra sig i BrB 15:4 måste beaktas.'))
 ]],
 ['Underlåtenhet att avvärja rättsfel','15:9',[
  R('Risk för oskyldig fällande dom eller avsevärt men',
   A('Gärningspersonen har genom en åtgärd av den typ som beskrivs tidigare i BrB 15 kap. framkallat fara.'),
   O('Faran gäller:','Att annan utan laga skäl döms till ansvar.','Att annan annars drabbas av avsevärt förfång.'),
   A('Gärningspersonen har efteråt insett att faran uppkommit.'),
   A('Trots insikten underlåter personen att göra vad som skäligen kan krävas för att avvärja faran.'),
   A('Gärningen omfattas inte av tidigare ansvarsbestämmelse i samma kapitel.'))
 ]],
 ['Upplopp','16:1',[
  R('Anstiftare eller anförare',
   A('En folksamling stör allmän ordning med uppsåt att genom förenat våld motsätta sig myndighet eller framtvinga/hindra en viss åtgärd.'),
   A('Gärningspersonen anstiftar eller anför folksamlingen.'),
   A('Om folkmassan skingrar sig på myndighets befallning kvarstår särskilt ansvar för anstiftare eller anförare men med annan straffskala.')),
  R('Annan deltagare',
   A('Folksamlingen stör allmän ordning med det särskilda uppsåtet att använda förenat våld.'),
   A('Folksamlingen skingrar sig inte på myndighets befallning.'),
   A('Gärningspersonen deltar i folksamlingens brottsliga förehavande.')),
 ]],
 ['Våldsamt upplopp','16:2',[
  R('Förenat våld – anstiftare/anförare',
   A('Folksamlingen har det särskilda uppsåt som anges i BrB 16:1.'),
   A('Folksamlingen har övergått till förenat våld mot person eller egendom.'),
   A('Gärningspersonen anstiftar eller anför; myndighetens närvaro krävs inte.')),
  R('Förenat våld – annan deltagare',
   A('Folksamlingen har det särskilda uppsåtet enligt BrB 16:1 och har övergått till förenat våld mot person eller egendom.'),
   A('Gärningspersonen deltar i dess förehavande; myndighetens närvaro krävs inte.'))
 ]],
 ['Störande av förrättning eller av allmän sammankomst','16:4',[
  R('Störning eller hindrande av angiven skyddad aktivitet',
   O('Skyddad aktivitet är bland annat:','Gudstjänst eller annan offentlig andakt.','Vigsel, begravning eller liknande akt.','Förhandling i domstol, inklusive vid Internationella brottmålsdomstolen.','Statlig eller kommunal förrättning.','Allmän sammankomst för överläggning, undervisning eller föredrag.'),
   O('Åtgärden sker genom:','Våldshandling.','Oljud.','Annat liknande sätt.'),
   A('Gärningspersonen stör eller försöker hindra den skyddade aktiviteten och handlar uppsåtligen.'))
 ]],
 ['Brott mot rösthemlighet','17:9',[
  R('Obehörigt försök att ta reda på hemlig rösträttsutövning',
   A('Uppgiften gäller något rörande rösträtt i ett allmänt ärende som ska hållas hemligt.'),
   A('Gärningspersonen försöker obehörigen skaffa sig kännedom om uppgiften.'),
   A('Gärningspersonen handlar uppsåtligen. Brottet är fullbordat redan när den otillåtna efterforskningen görs; faktisk kännedom behöver inte ha uppnåtts.'))
 ]],
 ['Dråp','3:2',[
  R('Uppsåtligt dödande som är mindre grovt än mord',
   A('Rekvisiten för uppsåtligt dödande i BrB 3:1 är uppfyllda.'),
   A('Brottet är med hänsyn till de omständigheter som föranlett gärningen eller andra omständigheter mindre grovt och ska därför rubriceras som dråp.'))
 ]],
 ['Grovt bokföringsbrott','11:5',[
  R('Grovhetsbedömning av bokföringsbrott',
   A('Grundbrottets rekvisit enligt BrB 11:5 är uppfyllda.'),
   A('Helhetsbedömningen ger grovt brott. Särskilt beaktas mycket betydande belopp, falsk handling, systematik eller annan särskilt farlig art; faktorerna är inte var för sig obligatoriska.'))
 ]],
 ['Grovt olaga integritetsintrång','4:6d',[
  R('Grovt fall av olaga integritetsintrång',
   A('Samtliga rekvisit för olaga integritetsintrång enligt BrB 4:6 c är uppfyllda.'),
   A('Brottet är grovt efter helhetsbedömning. Särskilt beaktas innehåll, spridningssätt eller omfattning som gör gärningen ägnad att medföra mycket allvarlig skada; inget enskilt exempel är automatiskt avgörande.'))
 ]]
];
const sourceMap=window.BK_STATUTES||{};
const by=name=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===name.toLocaleLowerCase('sv'));
const normalized=s=>String(s||'').replace(/\s/g,'').toLocaleLowerCase('sv');
let updated=0,preexisting=0;const missing=[],mismatch=[];
for(const [title,ref,routes] of rows){
 const c=by(title);
 if(!c){missing.push(title);continue;}
 if(normalized(c.shortRef)!=='brb'+ref){mismatch.push({title,actual:c.shortRef,expected:'BrB '+ref});continue;}
 if(!sourceMap['BrB:'+ref]?.text)throw Error('Lagtext saknas: '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){preexisting++;continue;}
 c.rekvisit15={
  groups:[],routes,
  source:'BrB '+ref+' (kontroll mot importerat SFS-underlag) och BrB 1:2 där tillämpligt',
  sourceURL:URL,scope:'lagtext-jamford',
  verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Juridiskt avgränsat studiestöd baserat på uttryckliga rekvisit och gärningsalternativ. Undantag, praxis, gärningsdatum, tillämplig skuldform och tillämplighet måste slutgranskas individuellt.'
 };
 updated++;
}
window.BK_REKVISIT_DEPTH15={updated,preexisting,missing,mismatch,reviewScope:'partial-statute-not-praxis-certification',source:URL};
})();