/* Brottskatalog 2.0 – närliggande brott ("skilj från") och kommande lagändringar.
 * GROUPS är handskrivna grupper av brott som ofta förväxlas, med en rad om vad som kännetecknar varje brott.
 * Dessutom visas andra grader av samma brott (ringa, grovt och så vidare) automatiskt.
 */
(()=>{'use strict';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const GROUPS=[
 {name:'Tillgrepp och olovligt förfogande',items:[
  ['stold','Tar något som tillhör någon annan, med uppsåt att tillägna sig det.'],
  ['v03-tillgrepp-av-fortskaffningsmedel','Tar och brukar ett motorfordon utan uppsåt att behålla det.'],
  ['v03-egenmaktigt-forfarande','Tar, brukar eller rubbar någon annans besittning utan tillägnelseuppsåt.'],
  ['v03-olovligt-forfogande','Har redan saken i sin besittning men någon annan har äganderätt eller säkerhetsrätt, till exempel en hyrd sak.'],
  ['v03-forskingring','Har fått egendomen med skyldighet att lämna ut eller redovisa den och tillägnar sig den.'],
  ['v15-yndo-rseelse','Behåller något upphittat utan att anmäla fyndet.'],
  ['v03-haleri','Tar befattning med egendom som någon annan har kommit över genom brott.'],
  ['ran','Stjäl med våld eller med hot som innebär trängande fara.']]},
 {name:'Bedrägeri och liknande',items:[
  ['bedrageri','Vilseleder någon till en handling som ger vinning för gärningspersonen och skada för den vilseledde.'],
  ['v05-oredligt-forfarande','Vilseleder någon till skada, men utan krav på egen vinning.'],
  ['v03-utpressning','Tvingar fram handlingen med olaga tvång i stället för vilseledande.'],
  ['v03-ocker','Utnyttjar någons trångmål, oförstånd eller beroendeställning för en oskälig förmån.'],
  ['v03-troloshet-mot-huvudman','Missbrukar en förtroendeställning och skadar huvudmannen.'],
  ['v03-forskingring','Tillägnar sig egendom som har anförtrotts gärningspersonen.'],
  ['v03-olovlig-identitetsanvandning','Använder någon annans identitetsuppgifter och utger sig för att vara den personen.'],
  ['v05-olovlig-befattning-med-betalningsverktyg','Tar befattning med kort, kortuppgifter eller andra betalningsverktyg som tillhör någon annan.'],
  ['v03-urkundsforfalskning','Framställer en falsk urkund eller ändrar en äkta.']]},
 {name:'Våld mot person',items:[
  ['misshandel','Tillfogar kroppsskada, sjukdom eller smärta eller försätter någon i vanmakt.'],
  ['ofredande','Antastar någon fysiskt eller utsätter någon för hänsynslöst agerande, utan att smärta eller skada uppstår.'],
  ['v03-vallande-till-kroppsskada-eller-sjukdom','Orsakar skadan av oaktsamhet, inte med uppsåt.'],
  ['v03-framkallande-av-fara-for-annan','Utsätter någon för livsfara eller fara för svår skada av grov oaktsamhet, utan att skada behöver uppstå.'],
  ['v03-olaga-tvang','Tvingar någon att göra, tåla eller underlåta något genom våld eller hot.'],
  ['vald-hot-tjansteman','Våldet eller hotet riktas mot någon i hans eller hennes myndighetsutövning.'],
  ['ran','Våldet används för att stjäla.']]},
 {name:'Dödligt våld',items:[
  ['v03-mord','Berövar någon livet med uppsåt.'],
  ['v03-drap','Uppsåtligt dödande som är mindre grovt.'],
  ['v03-vallande-till-annans-dod','Orsakar dödsfallet av oaktsamhet.'],
  ['synnerligen-grov-misshandel','Uppsåtet omfattar skadan men inte döden. Kombineras ofta med vållande till annans död.'],
  ['v15-uppmaning-till-sjalvmord','Uppmanar eller utövar psykisk påverkan mot någon att ta sitt liv.']]},
 {name:'Hot, trakasserier och kränkningar',items:[
  ['v03-olaga-hot','Hotar med brottslig gärning på ett sätt som är ägnat att framkalla allvarlig rädsla.'],
  ['ofredande','Hänsynslöst agerande eller störande kontakter som kränker friden på ett kännbart sätt.'],
  ['v03-olaga-tvang','Hotet används för att tvinga fram något.'],
  ['v03-overgrepp-i-rattssak','Våld eller hot på grund av en anmälan, ett vittnesmål eller en utsaga.'],
  ['v03-olaga-forfoljelse','Upprepade brott mot samma person som är led i en förföljelse.'],
  ['v19-overtradelse-av-kontaktforbud','Kontakt eller besök i strid med ett meddelat kontaktförbud.'],
  ['v03-forolampning','Beskyllning, nedsättande uttalande eller förödmjukande beteende riktat direkt mot personen.'],
  ['v03-fortal','Pekar ut någon som brottslig eller klandervärd inför andra.'],
  ['v03-olaga-integritetsintrang','Sprider integritetskänsliga bilder eller uppgifter.'],
  ['v03-grov-fridskrankning','Upprepade brott mot en närstående som är led i en kränkning av integriteten.']]},
 {name:'Intrång',items:[
  ['hemfridsbrott','Tränger in eller stannar kvar i någons bostad.'],
  ['olaga-intrang','Tränger in eller stannar kvar i kontor, fabrik, annan byggnad, fartyg, upplagsplats eller liknande.'],
  ['inbrottsstold','Stöld efter intrång i bostad.'],
  ['v03-tagande-av-olovlig-vag','Tar väg över tomt, plantering eller annan ägo som kan skadas.'],
  ['v19-overtradelse-av-tilltradesforbud','Går in på en idrottsanläggning trots tillträdesförbud.'],
  ['v20-overtradelse-av-tilltradesforbud-butik','Går in i en butik, en badanläggning eller ett bibliotek trots tillträdesförbud.'],
  ['v19-obehorigt-tilltrade-skyddsobjekt','Går in på ett skyddsobjekt utan tillstånd.']]},
 {name:'Skada på egendom',items:[
  ['skadegorelse','Förstör eller skadar någon annans egendom.'],
  ['v03-averkan','Tar eller skadar växande träd, gräs eller annat i skog och mark.'],
  ['v03-mordbrand','Anlägger brand som innebär fara för liv eller hälsa eller för omfattande förstörelse.'],
  ['v03-allmanfarlig-odelaggelse','Framkallar fara genom sprängning, ras, översvämning eller liknande.'],
  ['v04-allmanfarlig-vardsloshet','Orsakar branden eller faran av oaktsamhet.'],
  ['v03-sabotage','Skadar egendom av betydelse för försvar, folkförsörjning, ordning eller samfärdsel.'],
  ['v19-nedskrapning','Skräpar ned på en plats som allmänheten har tillträde till eller insyn till.']]},
 {name:'Brott mot tjänsteman',items:[
  ['vald-hot-tjansteman','Våld eller hot om våld mot någon i myndighetsutövning.'],
  ['forolampning-tjansteman','Förolämpar en tjänsteman i eller för myndighetsutövningen.'],
  ['valdsamt-motstand','Sätter sig till motvärn eller försöker hindra tjänstemannen, utan våld eller hot mot personen.'],
  ['v03-ohorsamhet-mot-ordningsmakten','Lyder inte en befallning från polisman vid en folksamling som stör ordningen.'],
  ['v15-cover-hindrande-av-forrattning','Vägrar tillträde eller hindrar en förrättning utan våld eller motstånd.'],
  ['v04-sabotage-mot-blaljusverksamhet','Angriper eller hindrar polis, räddningstjänst eller ambulanssjukvård i deras verksamhet.'],
  ['v03-foregivande-av-allman-stallning','Ger sig ut för att utöva myndighet eller bär uniform obehörigen.']]},
 {name:'Urkunder och osanna uppgifter',items:[
  ['v03-urkundsforfalskning','Framställer en falsk urkund eller ändrar en äkta.'],
  ['v03-brukande-av-falsk-urkund','Använder en urkund som någon annan har förfalskat.'],
  ['v03-osant-intygande','Lämnar osann uppgift i en äkta urkund om vem man är eller om annat än egna angelägenheter.'],
  ['v19-brukande-av-osann-urkund','Använder en osann urkund som om den vore riktig.'],
  ['v06-missbruk-av-urkund','Använder en äkta urkund som gäller en annan person.'],
  ['v03-osann-forsakran','Lämnar osann uppgift i en handling som avges på heder och samvete.'],
  ['v05-hindrande-av-urkunds-bevisfunktion','Förstör, gömmer eller undanhåller en urkund.'],
  ['v03-olovlig-identitetsanvandning','Använder någon annans identitetsuppgifter.']]},
 {name:'Brott mot rättsväsendet',items:[
  ['v03-mened','Lämnar osann uppgift eller förtiger sanningen under ed.'],
  ['v03-falsk-angivelse','Anger en oskyldig person till åtal.'],
  ['v05-falsk-beskyllning','Beskyller en oskyldig person för brott hos polis eller annan myndighet, utan formell angivelse.'],
  ['v03-skyddande-av-brottsling','Hjälper den som har begått brott att undkomma eller döljer brottet.'],
  ['v05-bevisforvanskning','Förvanskar eller undanröjer bevis för att få en oskyldig fälld.'],
  ['v03-overgrepp-i-rattssak','Angriper någon för en anmälan eller ett vittnesmål.'],
  ['v20-underlatenhet-att-avsloja-brott','Anmäler inte ett förestående eller pågående allvarligt brott.']]},
 {name:'Narkotika och andra preparat',items:[
  ['narkotikabrott-innehav','Innehar narkotika.'],
  ['ringa-narkotikabrott-bruk','Brukar narkotika.'],
  ['narkotikabrott-overlatelse','Överlåter narkotika till någon annan.'],
  ['v09-narkotikasmuggling','För in eller ut narkotika över gränsen.'],
  ['v19-dopningsbrott','Hanterar dopningsmedel, till exempel anabola steroider.'],
  ['v19-halsofarliga-varor','Hanterar varor som är klassade som hälsofarliga men inte som narkotika.'],
  ['v20-olovlig-lakemedelshandel','Säljer läkemedel utan tillstånd.'],
  ['v20-olovlig-hantering-av-lustgas','Säljer lustgas för berusning eller till minderåriga.'],
  ['rattfylleri','Kör motordrivet fordon med narkotika i blodet.']]},
 {name:'Vapen och farliga föremål',items:[
  ['vapenbrott','Innehar skjutvapen utan tillstånd.'],
  ['knivbrott','Innehar kniv eller annat farligt föremål på allmän plats, vid skola eller i fordon på allmän plats.'],
  ['v19-olovlig-befattning-ammunition','Innehar ammunition utan rätt till det.'],
  ['v09-vapensmuggling','För in eller ut skjutvapen över gränsen.'],
  ['v09-brott-mot-tillstandsplikten-for-explosiva-varor','Hanterar explosiva varor utan tillstånd.'],
  ['v20-lbe-aktsamhetskravet','Hanterar brandfarliga eller explosiva varor vårdslöst.'],
  ['v03-olaga-hot','Hotar någon med vapnet.']]},
 {name:'Trafik',items:[
  ['rattfylleri','Kör med alkohol eller narkotika i kroppen.'],
  ['olovlig-korning','Kör utan körkort eller rätt behörighet.'],
  ['traffic16-0','Brister i väsentlig mån i omsorg och varsamhet i trafiken.'],
  ['traffic16-1','Grov oaktsamhet eller uppenbar likgiltighet för andras liv eller egendom.'],
  ['traffic16-4','Avlägsnar sig från en trafikolycka utan att medverka till åtgärder.'],
  ['traffic16-3','Tillåter någon annan att köra utan körkort.'],
  ['v03-tillgrepp-av-fortskaffningsmedel','Tar fordonet utan lov.'],
  ['v03-vallande-till-annans-dod','Orsakar ett dödsfall genom oaktsam körning.']]},
 {name:'Sexualbrott',items:[
  ['v03-valdtakt','Samlag eller jämförlig sexuell handling med någon som inte deltar frivilligt.'],
  ['v03-oaktsam-valdtakt','Som våldtäkt, men gärningspersonen är grovt oaktsam om att den andra inte deltar frivilligt.'],
  ['v03-sexuellt-overgrepp','Annan sexuell handling än samlag med någon som inte deltar frivilligt.'],
  ['v03-sexuellt-ofredande','Blottar sig, berör eller uttalar sig på ett sätt som kränker den sexuella integriteten.'],
  ['v03-valdtakt-mot-barn','Samlag eller jämförlig handling med barn under 15 år. Frivillighet saknar betydelse.'],
  ['v03-sexuellt-overgrepp-mot-barn','Annan sexuell handling med barn under 15 år.'],
  ['v04-kontakt-for-att-traffa-ett-barn-i-sexuellt-syfte','Föreslår eller stämmer träff med barn under 15 år i sexuellt syfte.'],
  ['v03-kop-av-sexuell-tjanst','Skaffar sig en tillfällig sexuell förbindelse mot ersättning.'],
  ['v03-krankande-fotografering','Fotograferar eller filmar någon i hemlighet i bostad, på toalett eller i omklädningsrum.']]},
 {name:'Frihetsberövande och tvång',items:[
  ['v03-manniskorov','För bort eller spärrar in någon med uppsåt att skada, tvinga till tjänst eller utöva utpressning.'],
  ['v03-olaga-frihetsberovande','För bort eller spärrar in någon utan sådant särskilt uppsåt.'],
  ['v03-olaga-tvang','Tvingar någon till något utan att beröva personen friheten.'],
  ['v03-manniskohandel','Rekryterar, transporterar eller inhyser någon genom otillbörliga medel i syfte att exploatera personen.'],
  ['v03-manniskoexploatering','Exploaterar någon i tvångsarbete eller tiggeri utan att kraven för människohandel är uppfyllda.'],
  ['v05-egenmaktighet-med-barn','Skiljer ett barn under 15 år från vårdnadshavaren.']]},
 {name:'Ordningsstörningar',items:[
  ['v03-forargelsevackande-beteende','Uppträder på offentlig plats på ett sätt som är ägnat att väcka förargelse.'],
  ['ofredande','Beteendet riktas mot en viss person och kränker hans eller hennes frid.'],
  ['v03-ohorsamhet-mot-ordningsmakten','Lyder inte polismans befallning vid en folksamling.'],
  ['v15-cover-upplopp','En folksamling stör ordningen och skingrar sig inte på myndighets befallning.'],
  ['v15-cover-valdsamt-upplopp','Folksamlingen går med förenat våld mot person eller egendom.'],
  ['v03-hets-mot-folkgrupp','Hotar eller uttrycker missaktning för en folkgrupp i ett uttalande som sprids.'],
  ['v19-brott-mot-maskeringslagen','Täcker ansiktet vid en allmän sammankomst där ordningen störs.'],
  ['v20-ol-offentlig-plats','Använder offentlig plats utan tillstånd eller bryter mot polisens villkor.']]},
 {name:'Djur',items:[
  ['v03-djurplageri','Utsätter ett djur för lidande, uppsåtligen eller av grov oaktsamhet.'],
  ['v19-brott-mot-djurskyddslagen','Bryter mot djurskyddslagens krav på hur djur ska hållas och skötas.'],
  ['v20-djurskydd-foreskrifter','Bryter mot detaljföreskrifter om djurhållning.'],
  ['v20-overtradelse-av-hundforbud','Har hand om hund trots förbud.'],
  ['v19-jaktbrott','Jagar utan jakträtt eller i strid med jakttider och andra jaktregler.'],
  ['v20-jaktl-ovriga-bestammelser','Ofredar vilt, underlåter eftersök eller bryter mot andra jaktregler.'],
  ['v19-artskyddsbrott','Dödar, skadar eller handlar med skyddade arter.']]},
 {name:'Utlänningsbrott',items:[
  ['v19-manniskosmuggling','Hjälper en utlänning att resa in i eller genom Sverige utan tillstånd.'],
  ['v19-organiserande-manniskosmuggling','Planerar eller organiserar resor till Sverige för utlänningar utan tillstånd, i vinstsyfte.'],
  ['v19-utll-hjalp-olovlig-vistelse','Hjälper en utlänning att stanna olovligen i Sverige, i vinstsyfte.'],
  ['v20-utll-olovlig-vistelse','Utlänningen själv uppehåller sig i Sverige utan tillstånd.'],
  ['v20-utll-arbete-utan-arbetstillstand','Utlänningen själv arbetar utan arbetstillstånd.'],
  ['v19-utll-anstallning','Arbetsgivaren har en utlänning anställd som saknar rätt att vistas eller arbeta i Sverige.'],
  ['v03-manniskohandel','Personen förs hit genom otillbörliga medel för att exploateras.']]},
 {name:'Smuggling och tull',items:[
  ['v09-smuggling','För in eller ut en vara som omfattas av förbud eller villkor utan att anmäla den.'],
  ['v09-tullbrott','Undandrar tull, skatt eller avgift vid införsel.'],
  ['v09-olovlig-inforsel-eller-utforsel','Bryter av grov oaktsamhet mot förbud eller villkor för in- eller utförsel.'],
  ['v09-olovlig-befattning-med-smuggelgods','Tar befattning med en vara som har smugglats.'],
  ['v09-narkotikasmuggling','Smugglingen avser narkotika.']]},
 {name:'Skatt och bokföring',items:[
  ['v09-skattebrott','Lämnar oriktig uppgift eller underlåter att lämna deklaration, med uppsåt och fara för skatteundandragande.'],
  ['v09-vardslos-skatteuppgift','Lämnar oriktig uppgift av grov oaktsamhet.'],
  ['v09-forsvarande-av-skattekontroll','Åsidosätter bokföringsskyldighet eller liknande så att skattekontrollen försvåras.'],
  ['v03-bokforingsbrott','Åsidosätter bokföringsskyldigheten så att rörelsens förlopp eller ställning inte kan bedömas.'],
  ['v03-oredlighet-mot-borgenarer','Avhänder sig egendom vid obestånd eller påtaglig fara för obestånd.']]}
];
/* Kommande lagändringar som berör kort i katalogen. Kontrollerade mot ikraftträdandemarkeringar 2026-11-13. */
const UPCOMING=[
 {date:'2026-12-01',ids:['v19-folkbokforingsbrott','v19-grovt-folkbokforingsbrott'],text:'Folkbokföringslagen 42 § får ny lydelse. Samtidigt införs brottet främjande av oriktig folkbokföring (42 a §, fängelse i högst två år).'},
 {date:'2027-01-01',ids:['v05-egenmaktighet-med-barn','v05-grov-egenmaktighet-med-barn'],text:'BrB 7:4 hänvisar från detta datum till lagen (2026:1600) om omhändertagande för vård av barn och unga i stället för LVU.'},
 {date:'2027-01-01',ids:['v19-otillaten-miljoverksamhet'],text:'Miljöbalken 29:4 får ny lydelse.'},
 {date:'2027-01-01',ids:['v20-lvu-utreseforbud','v20-lvu-flyttningsforbud'],text:'LVU ersätts av lagen (2026:1600) om omhändertagande för vård av barn och unga. Motsvarande straffbestämmelser finns i den nya lagen.'},
 {date:'2027-03-01',ids:['v20-lsu-atervandande','v20-lsu-hjalp-inresa','v20-lsu-anmalningsskyldighet','v20-lsu-hindrande-verkstallighet'],text:'Straffen i lagen om särskild kontroll av vissa utlänningar skärps.'}
];
const crimes=()=>(window.BK_APP17&&window.BK_APP17.crimes)||[];
/* Grundtiteln utan gradbeteckning, så att ringa, grovt och synnerligen grovt brott hittar varandra. */
function root(t){return String(t||'').toLocaleLowerCase('sv')
 .replace(/,\s*(synnerligen\s+)?(grovt|ringa|mindre grovt|mindre allvarligt)\s+brott/g,'')
 .replace(/^(synnerligen\s+)?(grov|grovt|ringa)\s+/,'').replace(/\s+/g,' ').trim();}
let cache=null;
function index(){
 if(cache)return cache;
 const by=new Map(),roots=new Map();
 for(const c of crimes()){by.set(c.id,c);if(c.stageType)continue;const k=(c.category||'')+'|'+root(c.title);if(!roots.has(k))roots.set(k,[]);roots.get(k).push(c);}
 cache={by,roots};return cache;
}
function find(c){
 const {by,roots}=index();
 const b=c.stageParentId?by.get(c.stageParentId)||c:c;
 const sib=(roots.get((b.category||'')+'|'+root(b.title))||[]).filter(x=>x.id!==b.id);
 const fam=new Set([b.id].concat(sib.map(x=>x.id)));
 const seen=new Set(fam),groups=[];
 for(const g of GROUPS){
  if(!g.items.some(([id])=>fam.has(id)))continue;
  const items=g.items.filter(([id])=>!seen.has(id)&&by.has(id)).map(([id,text])=>{seen.add(id);return {card:by.get(id),text};});
  if(items.length)groups.push({name:g.name,items});
 }
 const other=(b.related||[]).filter(id=>!seen.has(id)&&by.has(id)&&!by.get(id).stageType).map(id=>{seen.add(id);return {card:by.get(id),text:''};});
 return {base:b,isStage:b!==c,grades:sib,groups,other};
}
function has(c){if(!c||(c.stageStatus&&c.stageStatus!=='punishable'&&!c.stageParentId))return false;const f=find(c);return !!(f.grades.length||f.groups.length||f.other.length||f.isStage);}
function button(x,text){return '<button type="button" class="related near20" data-open="'+esc(x.id)+'"><span class="near20-copy"><span class="near20-title">'+esc(x.title)+'</span>'+(text?'<span class="near20-text">'+esc(text)+'</span>':'')+'</span><span class="near20-pen">'+esc(x.penaltyShort||'')+'</span></button>';}
function html(c){
 const f=find(c);let out='';
 if(f.isStage)out+='<div class="near20-group"><div class="near20-head">Fullbordat brott</div>'+button(f.base,'')+'</div>';
 if(f.grades.length)out+='<div class="near20-group"><div class="near20-head">Andra grader av samma brott</div>'+f.grades.map(x=>button(x,'')).join('')+'</div>';
 for(const g of f.groups)out+='<div class="near20-group"><div class="near20-head">Skilj från · '+esc(g.name)+'</div>'+g.items.map(i=>button(i.card,i.text)).join('')+'</div>';
 if(f.other.length)out+='<div class="near20-group"><div class="near20-head">Se även</div>'+f.other.map(i=>button(i.card,'')).join('')+'</div>';
 return out?'<div class="near20">'+out+'</div>':'';
}
function upcoming(c,today){
 const b=c&&(c.stageParentId||c.id),t=today||new Date().toISOString().slice(0,10);
 return UPCOMING.filter(u=>u.date>t&&u.ids.includes(b));
}
function upcomingHtml(c,today){
 return upcoming(c,today).map(u=>'<div class="upcoming20" role="note"><strong>Kommande lagändring '+esc(u.date)+'</strong><span>'+esc(u.text)+'</span></div>').join('');
}
window.BK_NEAR20={GROUPS,UPCOMING,find,has,html,root,upcoming,upcomingHtml,reset(){cache=null;}};
})();
