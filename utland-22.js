/* Brottskatalog 2.2 – brott begånget utomlands: svensk domsrätt och åtalsförordnande (BrB 2 kap.).
 * En fråga i taget, på samma sätt som verktyget för FU-ledning. Resultatet visar om svensk domstol är behörig,
 * om dubbel straffbarhet krävs och om åtal kräver åtalsförordnande.
 * Källa: brottsbalken 2 kap. 1–8 §§ i lydelse t.o.m. SFS 2026:950. Kontrollerad mot gällande lydelse 2026-11-13.
 */
(()=>{'use strict';
const CHECKED='2026-11-13';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const byId=id=>(window.BK_APP17&&window.BK_APP17.crimes||[]).find(x=>x.id===id)||null;
const base=c=>c&&c.stageParentId?(byId(c.stageParentId)||c):c;

/* BrB 2:5 andra stycket 4 – brott där dubbel straffbarhet aldrig krävs (grundbrottets lagrum). */
const NO_DOUBLE=new Set(['BrB:4:1a','BrB:4:4c','BrB:4:4e','BrB:14:6','BrB:22:6a','BrB:22:6b']);
/* BrB 2:5 andra stycket 4 b – sexualbrott där dubbel straffbarhet inte krävs om brottet begåtts mot någon under 18 år. */
const SEX_CHILD=new Set(['BrB:6:1','BrB:6:1a','BrB:6:2','BrB:6:3','BrB:6:4','BrB:6:5','BrB:6:6','BrB:6:8','BrB:6:9','BrB:6:12']);
const SEX_CHILD_ATTEMPT=new Set(['BrB:6:1','BrB:6:2','BrB:6:4','BrB:6:5','BrB:6:6','BrB:6:8','BrB:6:9','BrB:6:12']);
/* BrB 2:3 punkt 6 – brott med universell domsrätt som går att känna igen på lagrummet. */
const UNIVERSAL=new Set(['BrB:13:5a','BrB:13:5b','BrB:15:4b']);
/* BrB 2:4 – lagar med egna regler om domsrätt för brott utomlands (SFS-nummer → hänvisning). */
const SPECIAL={'1998-808':'29 kap. 13 § miljöbalken','1966-314':'14 § lagen om kontinentalsockeln','1980-424':'10 kap. 10 § lagen om åtgärder mot förorening från fartyg',
 '1982-963':'5 § lagen om rymdverksamhet','1987-259':'51 a § jaktlagen','1992-1140':'17 § lagen om Sveriges ekonomiska zon','1993-787':'49 § fiskelagen',
 '1995-732':'5 § lagen om skydd för gravfriden vid vraket efter Estonia','2010-500':'13 kap. 11 § luftfartslagen','2010-696':'17 kap. 2 § radio- och tv-lagen',
 '2012-179':'2 § lagen om straff för olovlig befattning med klusterammunition','2014-406':'17 § lagen om straff för vissa internationella brott'};
const sfsOf=c=>{const m=/sfs-(\d{4}-\d+)/.exec(c&&c.sourceURL||'');return m?m[1]:null;};

function traits(c){
 const b=base(c),st=b.statute||'',r=b.penaltyRange||{},sfs=sfsOf(b),stage=c.stageType||null;
 const min=Number(r.min)||0,max=Number(r.max)||0;
 const sanction=sfs==='2025-327'&&/:(3|4|5|7|8|9|10)$/.test(st);
 const freeze=sfs==='2023-677'&&/:19$/.test(st);
 const fgm=sfs==='1982-316'&&/:2$/.test(st);
 const pornChild=st==='BrB:16:10a';
 return {statute:st,sfs,stage,min,max,life:!!r.life,
  over6m:!!r.life||max>0.5,prison:!!r.life||max>0,
  noDouble:min>=4||NO_DOUBLE.has(st)||sanction||freeze||fgm,
  noDoubleMaybe:pornChild,
  sexChild:stage==='forsok'?SEX_CHILD_ATTEMPT.has(st):(!stage&&SEX_CHILD.has(st)),
  universal:UNIVERSAL.has(st)&&(!stage||stage==='forsok'),
  intlCourt:st==='BrB:15:4b',
  special:SPECIAL[sfs]||null};
}

const Q={
 here:{text:'Handlade gärningspersonen i Sverige, eller inträdde brottets effekt här?',
  hint:'Brottet anses också begånget i Sverige om det är ovisst var det begicks men det finns skälig anledning att anta att det skedde här. Ett svenskt fartyg utomlands räknas inte som Sverige.',src:'BrB 2:1'},
 hereExc:{text:'Gäller något av följande?',items:[
   'Brottet har begåtts av en utlänning på ett utländskt fartyg eller luftfartyg och riktade sig mot en annan sådan utlänning eller mot utländskt intresse.',
   'Brottet har begåtts av en utlänning i tjänst eller uppdrag med allmän ställning hos en annan stat eller en mellanfolklig organisation.',
   'Gärningspersonen är här inom ramen för internationellt militärt samarbete eller internationell krishantering och omfattas av ett avtal med Sverige.',
   'Brottet är aggressionsbrott eller har riktats mot Internationella brottmålsdomstolens rättskipning.'],src:'BrB 2:2'},
 special:{text:'Begicks brottet i något av följande sammanhang?',items:[
   'Ombord på ett svenskt fartyg eller luftfartyg, eller i tjänsten av befälhavaren eller någon i besättningen.',
   'I tjänst eller uppdrag med svensk allmän ställning, till exempel av en svensk polis eller diplomat i tjänsten.',
   'Av någon som tillhör Försvarsmakten, på ett område där en avdelning av Försvarsmakten befann sig.',
   'I tjänsten av någon som är anställd av en svensk myndighet för en internationell militär insats eller civil krishantering.'],
  src:'BrB 2:3 punkt 1 och 4 b, 2:5 andra stycket 1–2 och 2:7 andra stycket 1–4'},
 state:{text:'Riktade sig brottet mot rikets säkerhet, svensk allmän verksamhet eller något annat särskilt skyddat svenskt intresse?',
  hint:'Till exempel spioneri, våld mot en svensk tjänsteman i tjänsten eller förfalskning av svenska pass.',src:'BrB 2:3 punkt 4 a'},
 universal:{text:'Är brottet ett av de internationella brott som svensk domstol alltid får pröva?',items:[
   'Folkmord, brott mot mänskligheten eller krigsförbrytelse.','Terroristbrott eller annat brott som begås med terroristuppsåt.',
   'Kapning, sjö- eller luftfartssabotage eller flygplatssabotage.','Tortyr enligt FN:s tortyrkonvention.','Brott mot Internationella brottmålsdomstolens rättskipning.'],src:'BrB 2:3 punkt 6'},
 swede:{text:'Är gärningspersonen svensk medborgare eller har hemvist i Sverige?',
  hint:'Det räcker att det gällde vid brottet eller gäller när åtal väcks.',src:'BrB 2:3 punkt 2 a–b'},
 present:{text:'Finns gärningspersonen i Sverige?',hint:'Då är svensk domstol behörig om brottet kan ge fängelse i mer än sex månader.',src:'BrB 2:3 punkt 2 c'},
 victim:{text:'Riktade sig brottet mot en svensk medborgare, någon med hemvist i Sverige eller en svensk juridisk person?',src:'BrB 2:3 punkt 3'},
 derived:{text:'Finns gärningspersonen i Sverige och gäller något av följande?',items:[
   'En annan stat har begärt att lagföringen ska överföras till Sverige.','En begäran om utlämning eller överlämnande för brottet har avslagits.',
   'Brottet omfattas av en internationell överenskommelse som kräver att Sverige prövar åtal om den misstänkte inte utlämnas.'],src:'BrB 2:3 punkt 5'},
 zone:{text:'Begicks brottet på en inrättning i Sveriges ekonomiska zon eller på Sveriges kontinentalsockel?',hint:'Till exempel en vindkraftpark eller en plattform till havs.',src:'BrB 2:3 punkt 1 d'},
 child:{text:'Var målsäganden under 18 år?',hint:'Då krävs inte dubbel straffbarhet för detta brott.',src:'BrB 2:5 andra stycket 4 b'},
 double:{text:'Är gärningen straffbar även enligt lagen där den begicks?',hint:'Är du osäker: svara ja och låt åklagaren kontrollera. Begicks brottet på ett område som inte tillhör någon stat, till exempel på internationellt vatten, räcker det att brottet kan ge fängelse enligt svensk lag.',src:'BrB 2:5 första stycket och 2:6'},
 nordic:{text:'Begicks brottet i Danmark, Finland, Island eller Norge?',hint:'Hit räknas också fartyg och flyg i reguljär trafik mellan Sverige och dessa länder.',src:'BrB 2:7 andra stycket 5'},
 nordicOffender:{text:'Är gärningspersonen svensk, dansk, finsk, isländsk eller norsk medborgare, eller utlänning med hemvist i Sverige?',src:'BrB 2:7 andra stycket 6'}
};

/* Förklaringar till frågorna, som i verktyget för FU-ledning. Texterna återger BrB 2 kap. i klartext. */
const INFO={
 "here": {
  "t": [
   "Ett brott anses begånget i Sverige om gärningspersonen handlade här. Vid underlåtenhet gäller det om personen borde ha handlat här eller befann sig här. Kräver brottet en viss effekt räcker det att effekten inträdde i Sverige, eller vid försök att den enligt brottsplanen sannolikt skulle ha inträtt här.",
   "Exempel: ett bedrägeri där gärningspersonen sitter utomlands men den vilseledde för över pengarna från Sverige anses begånget i Sverige.",
   "Medverkan anses begången i Sverige om den medverkande handlade här, eller om gärningspersonens brott anses begånget här.",
   "Är det ovisst var brottet begicks räcker det att det finns skälig anledning att anta att det skedde i Sverige."
  ],
  "src": "BrB 2:1: ”Ett brott anses ha begåtts i Sverige om gärningsmannen handlade här. … Om det för straffansvar krävs att gärningen medfört en viss effekt anses brottet ha begåtts i Sverige även i de fall effekten inträdde i Sverige”"
 },
 "hereExc": {
  "t": [
   "Huvudregeln är att brott som har begåtts i Sverige åtalas utan särskilt tillstånd. I de fall som räknas upp här krävs ändå ett åtalsförordnande, eftersom brottet har svag anknytning till Sverige eller rör en annan stats tjänstemän eller militär personal.",
   "Regeringen beslutar om åtalsförordnande i dessa fall. Vid brott mot Internationella brottmålsdomstolens rättskipning beslutar riksåklagaren.",
   "Undantaget för utländska tjänstemän gäller inte om gärningspersonen har försökt dölja i vilken egenskap han eller hon handlade, till exempel genom förklädnad eller vilseledande uppgifter."
  ],
  "src": "BrB 2:2: ”Åtal för brott som avses i 1 § får i följande fall väckas endast om åtalsförordnande har meddelats”"
 },
 "special": {
  "t": [
   "I dessa fyra sammanhang är svensk domstol behörig, det krävs inte att gärningen är straffbar där den begicks och åtal får väckas utan åtalsförordnande.",
   "Svenskt fartyg eller luftfartyg: brottet har begåtts ombord, eller i tjänsten av befälhavaren eller någon i besättningen, även i land.",
   "Svensk allmän ställning: brottet har begåtts i utövningen av tjänst eller uppdrag för svenska staten, en kommun eller en region.",
   "Försvarsmakten: brottet har begåtts av någon som tillhör Försvarsmakten på ett område där en avdelning av Försvarsmakten befann sig.",
   "Internationell insats: brottet har begåtts i tjänsten av någon som är anställd av en svensk myndighet för att delta i en internationell militär insats eller i internationell civil krishantering."
  ],
  "src": "BrB 2:3 punkt 1 och 4 b, 2:5 andra stycket 1–2 och 2:7 andra stycket 1–4"
 },
 "state": {
  "t": [
   "Här avses brott som angriper svenska staten eller dess verksamhet, inte enskilda personer. Exempel är brott mot rikets säkerhet (till exempel spioneri), våld eller hot mot en svensk tjänsteman i tjänsten, mened inför svensk domstol och förfalskning av svenska pass eller andra svenska myndighetshandlingar.",
   "Är svaret ja är svensk domstol behörig oavsett var brottet begicks och vem som begick det, och gärningen behöver inte vara straffbar på gärningsorten."
  ],
  "src": "BrB 2:3 punkt 4 a: ”riktat sig mot rikets säkerhet, allmän verksamhet eller annat av rättsordningen särskilt skyddat svenskt intresse”"
 },
 "universal": {
  "t": [
   "För vissa internationella brott har svensk domstol alltid behörighet, oavsett var brottet begicks, vem som begick det och mot vem. Gärningen behöver inte vara straffbar på gärningsorten.",
   "Hit hör brott enligt lagen om straff för vissa internationella brott (folkmord, brott mot mänskligheten och krigsförbrytelser, men inte aggressionsbrott), terroristbrott och brott som begås med terroristuppsåt, kapning, sjö- eller luftfartssabotage, flygplatssabotage, tortyr enligt FN:s tortyrkonvention och brott mot Internationella brottmålsdomstolens rättskipning.",
   "Åtal kräver ändå normalt åtalsförordnande."
  ],
  "src": "BrB 2:3 punkt 6"
 },
 "swede": {
  "t": [
   "Svensk domstol är behörig om gärningspersonen var svensk medborgare eller hade hemvist i Sverige när brottet begicks. Det räcker också att personen är svensk medborgare eller har hemvist här när åtal väcks.",
   "Hemvist betyder att personen är bosatt i Sverige med avsikt att stanna. Medborgarskapet saknar då betydelse.",
   "På den här grunden krävs normalt att gärningen också är straffbar där den begicks."
  ],
  "src": "BrB 2:3 punkt 2: ”av någon som vid gärningstillfället var svensk medborgare eller hade hemvist i Sverige” eller ”av någon som när åtal väcks för brottet är svensk medborgare eller har hemvist i Sverige”"
 },
 "present": {
  "t": [
   "Även en utlänning utan hemvist i Sverige kan lagföras här för brott utomlands, om han eller hon finns i Sverige och brottet enligt svensk lag kan ge fängelse i mer än sex månader.",
   "Det avgörande är brottets straffskala, inte det straff som kan väntas i det enskilda fallet. Appen läser av straffskalan på brottskortet.",
   "På den här grunden krävs normalt att gärningen också är straffbar där den begicks, och åtal kräver åtalsförordnande."
  ],
  "src": "BrB 2:3 punkt 2 c: ”av någon som finns i Sverige och det på brottet enligt svensk rätt kan följa fängelse i mer än sex månader”"
 },
 "victim": {
  "t": [
   "Svensk domstol är behörig om brottet har riktat sig mot en svensk medborgare, mot någon som har hemvist i Sverige eller mot en svensk juridisk person, till exempel ett svenskt aktiebolag.",
   "Exempel: en svensk turist blir misshandlad eller rånad utomlands.",
   "På den här grunden krävs normalt att gärningen också är straffbar där den begicks."
  ],
  "src": "BrB 2:3 punkt 3: ”en svensk medborgare eller någon som har hemvist i Sverige, eller … en svensk juridisk person”"
 },
 "derived": {
  "t": [
   "Sverige kan ta över lagföringen av ett brott som saknar annan anknytning hit, om gärningspersonen finns i Sverige. Det förutsätter att en annan stat har begärt att lagföringen ska överföras till Sverige, att en begäran om utlämning eller överlämnande för brottet har avslagits, eller att brottet omfattas av en internationell överenskommelse som kräver att Sverige prövar frågan om åtal om personen inte utlämnas.",
   "Frågan avgörs i praktiken av åklagare."
  ],
  "src": "BrB 2:3 punkt 5"
 },
 "zone": {
  "t": [
   "Svensk domstol är behörig över brott som har begåtts på en inrättning som med stöd av lag har kommit till i Sveriges ekonomiska zon eller på Sveriges kontinentalsockel, till exempel en vindkraftpark eller en plattform till havs.",
   "På den här grunden krävs inte att gärningen är straffbar enligt någon annan stats lag."
  ],
  "src": "BrB 2:3 punkt 1 d"
 },
 "child": {
  "t": [
   "För våldtäkt, sexuellt övergrepp, sexuellt utnyttjande av barn och flera andra sexualbrott krävs inte dubbel straffbarhet om brottet har begåtts mot någon som inte hade fyllt 18 år. Brottet kan alltså lagföras i Sverige även om gärningen är tillåten i det land där den begicks."
  ],
  "src": "BrB 2:5 andra stycket 4 b"
 },
 "double": {
  "t": [
   "Dubbel straffbarhet innebär att gärningen ska vara ett brott både enligt svensk lag och enligt lagen på den plats där den begicks. Brottet behöver inte ha samma namn eller samma straffskala i det andra landet.",
   "Har brottet begåtts på flera staters område räcker det att gärningen är straffbar i någon av dem.",
   "Straffet i Sverige får inte bli strängare än det svåraste straff som är föreskrivet på gärningsorten.",
   "Har brottet begåtts på ett område som inte tillhör någon stat, till exempel på internationellt vatten, krävs i stället att brottet kan ge fängelse enligt svensk lag."
  ],
  "src": "BrB 2:5 första stycket: ”svensk domstol [är] behörig endast om gärningen är straffbar även enligt lagen på gärningsorten (dubbel straffbarhet)” och BrB 2:6"
 },
 "nordic": {
  "t": [
   "Åtalsförordnande krävs inte för brott som har begåtts i Danmark, Finland, Island eller Norge. Detsamma gäller brott på fartyg eller luftfartyg i reguljär trafik mellan orter i Sverige och något av dessa länder, till exempel en färja mellan Sverige och Finland."
  ],
  "src": "BrB 2:7 andra stycket 5: ”har begåtts i Danmark, Finland, Island eller Norge eller på fartyg eller luftfartyg i reguljär trafik mellan orter belägna i Sverige eller någon av dessa stater”"
 },
 "nordicOffender": {
  "t": [
   "Åtalsförordnande krävs inte när brottet har begåtts mot svenskt intresse av en svensk, dansk, finsk, isländsk eller norsk medborgare, eller av en utlänning som har hemvist i Sverige.",
   "Med svenskt intresse avses både enskilda svenska intressen, till exempel en svensk målsägande, och svenska allmänna intressen."
  ],
  "src": "BrB 2:7 andra stycket 6: ”har begåtts mot svenskt intresse av en svensk, dansk, finsk, isländsk eller norsk medborgare eller av en utlänning med hemvist i Sverige”"
 }
};

/* assess(c, ans) → {question:{id,…}, step} eller {result:{…}} */
function assess(c,ans){
 const t=traits(c),a=ans||{};let step=0;
 const ask=id=>{step++;return a[id]===undefined?{question:{id,...Q[id]},step}:null;};
 const has=id=>a[id]===true;
 let q;
 const prosecution=base(c).prosecutionLabel||'Allmänt åtal';
 const done=r=>({result:{checked:CHECKED,prosecution,special:t.special,...r}});
 if((q=ask('here')))return q;
 if(has('here')){
  if((q=ask('hereExc')))return q;
  return done({place:'sweden',court:true,courtText:'Brottet anses begånget i Sverige',grounds:['BrB 2:1'],double:null,
   order:has('hereExc'),orderBy:has('hereExc')?'Regeringen beslutar om åtalsförordnande (BrB 2:2). Vid brott mot Internationella brottmålsdomstolens rättskipning beslutar riksåklagaren.':'',
   orderWhy:has('hereExc')?'Brottet hör till undantagen i BrB 2:2.':'Brott som har begåtts i Sverige åtalas utan åtalsförordnande.'});
 }
 /* Grunder för domsrätt utomlands (BrB 2:3). */
 const grounds=[];let strong=false;
 if((q=ask('special')))return q;
 if(has('special')){
  return done({place:'abroad',court:true,courtText:'Svensk domstol är behörig',grounds:['Svenskt fartyg eller luftfartyg, svensk allmän ställning, Försvarsmakten eller internationell insats (BrB 2:3 punkt 1, 2 eller 4 b)'],
   double:false,doubleWhy:'Dubbel straffbarhet krävs inte i dessa fall (BrB 2:5).',order:false,
   orderWhy:'Åtalsförordnande krävs inte i dessa fall (BrB 2:7 andra stycket 1–4).',orderBy:''});
 }
 if(t.universal){grounds.push('Internationellt brott med svensk domsrätt (BrB 2:3 punkt 6)');strong=true;}
 if((q=ask('state')))return q;
 if(has('state')){grounds.push('Svenskt allmänt intresse (BrB 2:3 punkt 4 a)');strong=true;}
 if((q=ask('swede')))return q;
 if(has('swede'))grounds.push('Svensk gärningsperson (BrB 2:3 punkt 2 a–b)');
 if((q=ask('victim')))return q;
 if(has('victim'))grounds.push('Svenskt enskilt intresse (BrB 2:3 punkt 3)');
 if(!strong){
  if((q=ask('universal')))return q;
  if(has('universal')){grounds.push('Internationellt brott med svensk domsrätt (BrB 2:3 punkt 6)');strong=true;}
 }
 if(!has('swede')&&!strong){
  if((q=ask('present')))return q;
  if(has('present')&&t.over6m)grounds.push('Gärningspersonen finns i Sverige och brottet kan ge fängelse i mer än sex månader (BrB 2:3 punkt 2 c)');
  if(!grounds.length&&has('present')){
   if((q=ask('derived')))return q;
   if(has('derived'))grounds.push('Härledd domsrätt (BrB 2:3 punkt 5)');
  }
 }
 if(!grounds.length){
  if((q=ask('zone')))return q;
  if(has('zone')){grounds.push('Inrättning i Sveriges ekonomiska zon eller på kontinentalsockeln (BrB 2:3 punkt 1 d)');strong=true;}
 }
 if(!grounds.length){
  return done({place:'abroad',court:false,courtText:'Svensk domstol är inte behörig enligt BrB 2:3',grounds:[],double:null,order:null,
   orderWhy:(has('present')&&!t.over6m?'Brottet kan inte ge fängelse i mer än sex månader, så det räcker inte att gärningspersonen finns i Sverige. ':'')+
    'Ingen av grunderna för svensk domsrätt är uppfylld.'+(t.special?' Kontrollera den särskilda regeln i '+t.special+'.':'')});
 }
 /* Dubbel straffbarhet (BrB 2:5 och 2:6) – krävs bara när domsrätten vilar enbart på punkt 2, 3 eller 5. */
 let double=null,doubleWhy='';
 if(strong){double=false;doubleWhy='Domsrätten vilar på en grund som inte kräver dubbel straffbarhet.';}
 else if(t.noDouble){double=false;doubleWhy=t.min>=4?'Det lindrigaste straffet för brottet är fängelse i fyra år eller mer (BrB 2:5 andra stycket 3).':'Brottet är undantaget från kravet (BrB 2:5 andra stycket 4).';}
 else{
  if(t.sexChild){if((q=ask('child')))return q;if(has('child')){double=false;doubleWhy='Brottet har begåtts mot någon under 18 år (BrB 2:5 andra stycket 4 b).';}}
  if(double===null){
   if((q=ask('double')))return q;
   if(!has('double'))return done({place:'abroad',court:false,courtText:'Svensk domstol är inte behörig',grounds,double:true,order:null,
    orderWhy:'Gärningen är inte straffbar där den begicks, och domsrätten kräver dubbel straffbarhet (BrB 2:5).'+(t.prison?'':' På ett område som inte tillhör någon stat krävs att brottet kan ge fängelse, vilket detta brott inte kan (BrB 2:6).')+(t.noDoubleMaybe?' Vid barnpornografibrott enligt BrB 16:10 a första stycket 1 och sjätte stycket krävs dock inte dubbel straffbarhet.':'')});
   double=true;doubleWhy='Gärningen ska vara straffbar även där den begicks. Straffet får inte bli strängare än det svåraste straffet på gärningsorten (BrB 2:5).';
  }
 }
 /* Åtalsförordnande (BrB 2:7). */
 let order=true,orderWhy='Åtal för brott utomlands kräver åtalsförordnande (BrB 2:7 första stycket).';
 const no=w=>{order=false;orderWhy=w;};
 if(t.intlCourt)no('Brottet är osann eller ovarsam utsaga inför en internationell domstol (BrB 2:7 andra stycket 7).');
 else{
  if((q=ask('nordic')))return q;
  if(has('nordic'))no('Brottet har begåtts i ett nordiskt land eller i reguljär trafik mellan Sverige och ett nordiskt land (BrB 2:7 andra stycket 5).');
  else if(has('state')||has('victim')){
   if(has('swede'))no('Brottet har begåtts mot svenskt intresse av en svensk medborgare eller någon med hemvist i Sverige (BrB 2:7 andra stycket 6).');
   else{
    if((q=ask('nordicOffender')))return q;
    if(has('nordicOffender'))no('Brottet har begåtts mot svenskt intresse av en nordisk medborgare eller en utlänning med hemvist i Sverige (BrB 2:7 andra stycket 6).');
   }
  }
 }
 const orderBy=order?'Riksåklagaren beslutar om åtalsförordnande (BrB 2:8).'+(has('swede')?' Eftersom gärningspersonen är svensk medborgare eller har hemvist i Sverige får riksåklagaren överlämna prövningen till en annan åklagare.':''):'';
 return done({place:'abroad',court:true,courtText:'Svensk domstol är behörig',grounds,double,doubleWhy,order,orderWhy,orderBy,
  icc:has('universal')||t.universal});
}

function help(id,label){
 const i=INFO[id];if(!i)return '';
 return '<details class="fu18-help ut22-help"><summary><span class="fu18-i" aria-hidden="true">i</span>'+esc(label||'Förklaring')+'</summary><div class="fu18-info">'+i.t.map(x=>'<p>'+esc(x)+'</p>').join('')+'<p class="fu18-info-src">Källa: '+esc(i.src)+'</p></div></details>';
}
/* Förklaringar till resultatet. */
const RESULT_INFO={
 court:{t:['Svensk domstol får döma över brott som har begåtts i Sverige och, när någon av grunderna i BrB 2:3 är uppfylld, över brott som har begåtts utomlands.','Att svensk domstol är behörig betyder inte att åtal alltid får väckas. Det kan också krävas dubbel straffbarhet och åtalsförordnande.','Vissa lagar har egna regler om domsrätt för brott utomlands, till exempel miljöbalken, fiskelagen och jaktlagen (BrB 2:4).'],src:'BrB 2:1, 2:3 och 2:4'},
 double:{t:INFO.double.t,src:INFO.double.src},
 order:{t:['Ett åtalsförordnande är ett särskilt beslut om att åtal får väckas. Utan det får åklagaren inte åtala, även om brottet i övrigt faller under allmänt åtal.','Riksåklagaren beslutar i de flesta fall. Gäller brottet en svensk medborgare eller någon med hemvist i Sverige får riksåklagaren överlämna prövningen till en annan åklagare. Regeringen beslutar i fall som har särskild betydelse för utrikes- eller säkerhetspolitiken och i de fall som anges i BrB 2:2.','Vid prövningen beaktas Sveriges folkrättsliga förpliktelser, anknytningen till Sverige, om lagföring pågår eller väntas i en annan stat och möjligheterna att utreda brottet här.','Polisen får inleda och bedriva förundersökning innan åtalsförordnande har meddelats. Kontakta åklagare tidigt.'],src:'BrB 2:7 och 2:8'},
 pros:{t:['Åtalsregeln anger om brottet faller under allmänt åtal eller om det krävs till exempel att målsäganden anger brottet. Den gäller på samma sätt när brottet har begåtts utomlands.','Åtalsförordnandet är ett ytterligare krav och ersätter inte åtalsregeln. Båda måste vara uppfyllda för att åtal ska få väckas.'],src:'Rättegångsbalken 20 kap. och brottets egen åtalsregel'}
};
function resultHelp(k){const i=RESULT_INFO[k];return '<details class="fu18-help ut22-help"><summary><span class="fu18-i" aria-hidden="true">i</span>Förklaring</summary><div class="fu18-info">'+i.t.map(x=>'<p>'+esc(x)+'</p>').join('')+'<p class="fu18-info-src">Källa: '+esc(i.src)+'</p></div></details>';}
function render(c,ans){
 const r=assess(c,ans);
 const back=Object.keys(ans||{}).length?'<button type="button" class="fu18-back" data-ut22="back">← Föregående fråga</button>':'';
 if(r.question){
  const q=r.question;
  const items=q.items?'<ul class="fu18-plain">'+q.items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul>':'';
  return '<div class="fu18 ut22" data-ut22-q="'+esc(q.id)+'"><p class="fu18-step">Fråga '+r.step+'</p><p class="fu18-q">'+esc(q.text)+'</p>'+
   (q.hint?'<p class="fu18-hint">'+esc(q.hint)+'</p>':'')+items+help(q.id)+
   '<div class="fu18-yn"><button type="button" class="fu18-btn" data-ut22="yes">Ja</button><button type="button" class="fu18-btn" data-ut22="no">Nej</button></div>'+back+'</div>';
 }
 const x=r.result;
 const row=(cls,label,head,text,info)=>'<div class="fu18-row '+cls+'"><small>'+label+'</small><strong>'+esc(head)+'</strong>'+(text?'<p>'+esc(text)+'</p>':'')+(info?resultHelp(info):'')+'</div>';
 let out='<div class="fu18 fu18-result ut22" data-ut22-court="'+(x.court?'ja':'nej')+'" data-ut22-order="'+(x.order===true?'ja':x.order===false?'nej':'-')+'">';
 out+=row(x.court?'pol':'ak','SVENSK DOMSRÄTT',x.courtText,x.grounds.length?'Grund: '+x.grounds.join('. ')+'.':(x.court?'':x.orderWhy),'court');
 if(x.court){
  if(x.place==='abroad')out+=row('when','DUBBEL STRAFFBARHET',x.double?'Krävs':'Krävs inte',x.doubleWhy,'double');
  out+=row(x.order?'ak':'pol','ÅTALSFÖRORDNANDE',x.order?'Krävs':'Krävs inte',x.orderWhy+(x.orderBy?' '+x.orderBy:''),'order');
  out+=row('when','ÅTALSREGEL FÖR BROTTET',x.prosecution,x.order?'Brottets vanliga åtalsregel gäller utöver kravet på åtalsförordnande.':'Brottets vanliga åtalsregel gäller som om brottet hade begåtts i Sverige.','pros');
 }
 const notes=[];
 if(x.court&&x.place==='abroad')notes.push('Polisen får inleda och bedriva förundersökning utan åtalsförordnande. Kontakta åklagare tidigt: en utredning som kräver internationellt rättsligt samarbete leds av åklagare.');
 if(x.icc)notes.push('Har brottet riktats mot Internationella brottmålsdomstolens rättskipning krävs alltid åtalsförordnande (BrB 2:7 tredje stycket).');
 if(x.special)notes.push('Lagen har en egen regel om domsrätt för brott utomlands: '+x.special+' (BrB 2:4). Den kan ge svensk domsrätt även när grunderna ovan saknas.');
 if(x.court)notes.push('Har gärningen redan prövats genom en utländsk dom som har fått laga kraft får den som huvudregel inte lagföras igen. Undantagen kräver åtalsförordnande (BrB 2:9–10).');
 notes.push('Folkrättsliga begränsningar, till exempel immunitet, ska alltid iakttas (BrB 2:12).');
 out+='<ul class="fu18-notes">'+notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>';
 out+='<p class="source-label">Brottsbalken 2 kap. 1–12 §§. Kontrollerad mot gällande lydelse '+esc(x.checked)+'.</p>';
 out+='<div class="fu18-end">'+back+'<button type="button" class="fu18-btn fu18-restart" data-ut22="restart">Börja om</button></div></div>';
 return out;
}
function available(c){return !!c&&(!c.stageStatus||c.stageStatus==='punishable');}
window.BK_UTLAND22={assess,render,traits,available,Q,INFO,RESULT_INFO,checked:CHECKED};
})();
