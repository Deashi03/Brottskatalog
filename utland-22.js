/* Brottskatalog 2.2.1 – brott begånget utomlands: svensk domsrätt och åtalsförordnande (BrB 2 kap.).
 *
 * Omgjort från grunden. Tre principer:
 *  1. Det brottskortet redan avgör frågas aldrig. Tabellerna nedan anger per brott vad som följer av brottet självt
 *     (till exempel att målsäganden är ett barn vid våldtäkt mot barn, och undantagen från dubbel straffbarhet i BrB 2:5).
 *  2. Rättsreglerna står på ett ställe, i outcome(): fakta in, resultat ut.
 *  3. En fråga ställs bara om svaret kan ändra resultatet. Det räknas ut maskinellt: verktyget prövar alla tänkbara svar
 *     på de frågor som återstår och ställer nästa fråga bara om något svar ger ett annat resultat.
 *
 * Källa: brottsbalken 2 kap. 1–8 §§ i lydelse t.o.m. SFS 2026:950. Kontrollerad mot gällande lydelse 2026-11-13.
 */
(()=>{'use strict';
const CHECKED='2026-11-13';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const byId=id=>(window.BK_APP17&&window.BK_APP17.crimes||[]).find(x=>x.id===id)||null;

/* ---------- 1. Vad brottet självt avgör ---------- */
/* BrB 2:5 andra stycket 4: brott där det aldrig krävs att gärningen är straffbar på gärningsorten.
 * Värdet anger vilka förstadier som också omfattas: 'F' = försök, 'FPS' = alla, '' = bara fullbordat brott. */
const NO_DOUBLE={
 'v03-manniskohandel':'F','v15-family-aktenskapstvang':'F','v15-family-barnaktenskapsbrott':'F','v15-hedersfortryck':'F',   // a) BrB 4:1 a, 4:4 c, 4:4 e
 'v05-penningforfalskning':'F','v05-grov-penningforfalskning':'F','v15-ringa-penningforfalskning':'F',                       // c) BrB 14:6
 'v15-war-olovlig-befattning-med-kemiska-vapen':'','v15-war-grov-olovlig-befattning-med-kemiska-vapen':'',                   // d) BrB 22:6 a
 'v15-war-olovlig-befattning-med-minor':'','v15-war-grov-olovlig-befattning-med-minor':'',                                   // d) BrB 22:6 b
 'v19-konsstympning':'FPS','v19-konsstympning-mindre-grovt':'FPS','v19-konsstympning-grovt':'FPS',                           // e) könsstympningslagen 2 §
 'v21-sanktionsbrott':'F','v21-sanktionsforseelse':'F','v21-sanktionsbrott-grovt':'F','v21-upprepat-sanktionsbrott':'',      // f) sanktionslagen 3–5 och 7–10 §§
 'v21-brott-mot-frysningsbeslut':'','v21-brott-mot-frysningsbeslut-grovt':'','v21-brott-mot-frysningsbeslut-ringa':''        // g) frysningslagen 19 §
};
/* BrB 2:5 andra stycket 4 b: sexualbrott där kravet faller bort om brottet har begåtts mot någon under 18 år.
 * CHILD_ALWAYS: målsäganden är per definition under 18 år. CHILD_ASK: åldern måste frågas. Försök omfattas (utom 6:1 a och 6:3). */
const CHILD_ALWAYS=new Set(['v03-valdtakt-mot-barn','v03-grov-valdtakt-mot-barn','v03-sexuellt-utnyttjande-av-barn','v03-sexuellt-overgrepp-mot-barn',
 'v04-grovt-sexuellt-overgrepp-mot-barn','v03-utnyttjande-av-barn-for-sexuell-posering','v04-grovt-utnyttjande-av-barn-for-sexuell-posering',
 'v04-utnyttjande-av-barn-genom-kop-av-sexuell-handling']);
const CHILD_ASK=new Set(['v03-valdtakt','v03-grov-valdtakt','v03-oaktsam-valdtakt','v03-sexuellt-overgrepp','v03-grovt-sexuellt-overgrepp',
 'v03-oaktsamt-sexuellt-overgrepp','v03-koppleri','v03-grovt-koppleri']);
/* BrB 2:5 andra stycket 4 a: barnpornografibrott är undantaget bara när brottet består i att skildra barn i pornografisk bild. */
const PORN_ASK=new Set(['v03-barnpornografibrott','v03-grovt-barnpornografibrott']);
/* BrB 2:3 punkt 6: brott som svensk domstol alltid får pröva. Värdet anger vilka förstadier som omfattas. */
const UNIVERSAL={'v15-additional-kapning':'F','v15-additional-grov-kapning':'F','v15-additional-sjo-eller-luftfartssabotage':'F',
 'v15-additional-grovt-sjo-eller-luftfartssabotage':'F','v15-additional-flygplatssabotage':'F','v15-additional-grovt-flygplatssabotage':'F',
 'v15-family-osann-utsaga-infor-en-internationell-domstol':'','v15-family-ovarsam-utsaga-infor-en-internationell-domstol':'',
 'v19-terroristbrott':'FPS','v19-terroristbrott-mindre-grovt':'FPS','v19-deltagande-terroristorganisation':'FPS','v19-deltagande-terroristorganisation-grovt':'FPS',
 'v19-samrore-terroristorganisation':'FPS','v19-samrore-terroristorganisation-grovt':'FPS','v19-finansiering-terrorism':'FPS','v19-finansiering-terrorism-grovt':'FPS',
 'v19-offentlig-uppmaning-terrorism':'FPS','v19-offentlig-uppmaning-terrorism-grovt':'FPS','v19-rekrytering-terrorism':'FPS','v19-rekrytering-terrorism-grovt':'FPS',
 'v19-utbildning-terrorism':'FPS','v19-utbildning-terrorism-grovt':'FPS','v19-resa-terrorism':'FPS'};
/* BrB 2:7 andra stycket 7: osann eller ovarsam utsaga inför en internationell domstol kräver inget åtalsförordnande. */
const INTL_COURT=new Set(['v15-family-osann-utsaga-infor-en-internationell-domstol','v15-family-ovarsam-utsaga-infor-en-internationell-domstol']);
/* BrB 2:3 punkt 4 a: frågan om brottet riktade sig mot svenska staten ställs bara för brottstyper där det kan vara så. */
const STATE_CATEGORIES=new Set(['Rikets säkerhet','Allmän verksamhet','Rättsväsende','Urkund','Smuggling']);
const STATE_IDS=/^v09-(skatte|grovt-skatte|vardslos-skatte|forsvarande-av-skatte|grovt-forsvarande|bidragsbrott|grovt-bidragsbrott|vardslost-bidragsbrott)/;
/* Våldsbrott där terroristuppsåt eller tortyr kan ge svensk domsrätt enligt BrB 2:3 punkt 6. Det frågas inte, men nämns i svaret. */
const TERROR_NOTE=new Set(['v03-mord','v03-drap','grov-misshandel','synnerligen-grov-misshandel','v03-manniskorov','v03-olaga-frihetsberovande',
 'v03-mordbrand','v03-grov-mordbrand','v03-allmanfarlig-odelaggelse','v04-grov-allmanfarlig-odelaggelse','v03-sabotage','v03-grovt-sabotage','v03-grovt-olaga-tvang','v03-grovt-olaga-hot']);
/* BrB 2:4: lagar med egna regler om domsrätt för brott utomlands (SFS-nummer → hänvisning). */
const SPECIAL={'1998-808':'29 kap. 13 § miljöbalken','1966-314':'14 § lagen om kontinentalsockeln','1980-424':'10 kap. 10 § lagen om åtgärder mot förorening från fartyg',
 '1982-963':'5 § lagen om rymdverksamhet','1987-259':'51 a § jaktlagen','1992-1140':'17 § lagen om Sveriges ekonomiska zon','1993-787':'49 § fiskelagen',
 '1995-732':'5 § lagen om skydd för gravfriden vid vraket efter Estonia','2010-500':'13 kap. 11 § luftfartslagen','2010-696':'17 kap. 2 § radio- och tv-lagen',
 '2012-179':'2 § lagen om straff för olovlig befattning med klusterammunition','2014-406':'17 § lagen om straff för vissa internationella brott'};

const STAGE_CODE={forsok:'F',forberedelse:'P',stampling:'S'};
/* card(c) → det som brottet självt avgör. fixed = fakta som inte ska frågas. */
function card(c){
 const b=c&&c.stageParentId?(byId(c.stageParentId)||c):c,id=b.id,code=c.stageType?STAGE_CODE[c.stageType]:'';
 const covers=v=>v!==undefined&&(code===''||String(v).includes(code));
 const r=c.penaltyRange||{},min=Number(r.min)||0,max=Number(r.max)||0,life=!!r.life;
 const sfs=(/sfs-(\d{4}-\d+)/.exec(b.sourceURL||'')||[])[1]||null;
 const attemptOnly=code===''||code==='F';
 const info={id,stage:c.stageType||null,over6m:life||max>0.5,prison:life||max>0,
  universal:covers(UNIVERSAL[id]),intlCourt:INTL_COURT.has(id)&&code==='',
  special:SPECIAL[sfs]||null,terrorNote:TERROR_NOTE.has(id),
  exemptWhy:null,condText:null,condHint:null,condWhy:null,condInfo:null};
 const fixed={};
 /* Dubbel straffbarhet: undantag som följer av brottet (BrB 2:5 andra stycket 3 och 4). */
 if(min>=4){fixed.exempt=true;info.exemptWhy='Det lindrigaste straffet för brottet är fängelse i fyra år eller mer (BrB 2:5 andra stycket 3).';}
 else if(covers(NO_DOUBLE[id])){fixed.exempt=true;info.exemptWhy='Brottet är undantaget från kravet (BrB 2:5 andra stycket 4).';}
 else if(CHILD_ALWAYS.has(id)&&attemptOnly){fixed.exempt=true;info.exemptWhy='Brottet riktar sig mot ett barn. Då gäller inte kravet (BrB 2:5 andra stycket 4 b).';}
 else if(CHILD_ASK.has(id)&&attemptOnly&&!(code==='F'&&/oaktsam/.test(id))){
  info.condText='Var den som utsattes under 18 år?';info.condHint='Då spelar det ingen roll om gärningen är tillåten i landet där den begicks.';
  info.condWhy='Den som utsattes var under 18 år (BrB 2:5 andra stycket 4 b).';info.condInfo='child';
 }else if(PORN_ASK.has(id)&&attemptOnly){
  info.condText='Har gärningspersonen själv skildrat ett barn i pornografisk bild?';info.condHint='Till exempel fotograferat eller filmat. Svara nej om brottet bara gäller innehav, spridning eller annan befattning.';
  info.condWhy='Brottet består i att skildra barn i pornografisk bild (BrB 2:5 andra stycket 4 a).';info.condInfo='porn';
 }else fixed.exempt=false;
 if(!(STATE_CATEGORIES.has(b.category)||STATE_IDS.test(id)))fixed.state=false;
 return {info,fixed};
}

/* ---------- 2. Rättsreglerna ---------- */
/* Fakta (ja/nej). Ordningen är den ordning frågorna ställs i, när de behövs. */
const FACTS=['here','exc22','special','state','swede','victim','present','derived','exempt','doubleCrim','zone','nordicPlace','nordicCitizen'];
/* outcome(f, info) → {court, order}. f innehåller alla fakta som true/false. */
function outcome(f,info){
 if(f.here)return {court:true,order:!!f.exc22};                                             // BrB 2:1 och 2:2
 const strong=f.special||info.universal||f.state||f.zone;                                   // BrB 2:3 punkt 1, 4 och 6: ingen dubbel straffbarhet
 const weak=f.swede||f.victim||(f.present&&(info.over6m||f.derived));                       // BrB 2:3 punkt 2, 3 och 5
 const court=!!(strong||(weak&&(f.exempt||f.doubleCrim)));                                  // BrB 2:5
 if(!court)return {court:false,order:null};
 const noOrder=f.special||info.intlCourt||f.nordicPlace||((f.state||f.victim)&&(f.swede||f.nordicCitizen)); // BrB 2:7 andra stycket
 return {court:true,order:!noOrder};
}
const keyOf=o=>(o.court?'1':'0')+(o.order===null?'-':o.order?'1':'0');

/* ---------- 3. Vilken fråga behövs härnäst ---------- */
/* next(known, info) → namnet på nästa fakta som kan ändra resultatet, eller null när resultatet är klart. */
function next(known,info){
 const unknown=FACTS.filter(k=>known[k]===undefined),n=unknown.length,total=1<<n;
 const keys=new Array(total),f={...known};
 for(let m=0;m<total;m++){for(let i=0;i<n;i++)f[unknown[i]]=!!(m>>i&1);keys[m]=keyOf(outcome(f,info));}
 for(let i=0;i<n;i++){const bit=1<<i;
  for(let m=0;m<total;m++)if(!(m&bit)&&keys[m]!==keys[m|bit])return unknown[i];
 }
 return null;
}

/* ---------- 4. Frågor och förklaringar ---------- */
const Q={
 here:{text:'Begicks brottet i Sverige?',
  hint:'Svara ja om gärningspersonen var i Sverige när han eller hon handlade, eller om brottets följd uppstod här.',src:'BrB 2:1'},
 exc22:{text:'Stämmer något av de här undantagen?',hint:'De är ovanliga. Svara nej om inget stämmer.',items:[
   'Gärningspersonen är utlänning ombord på ett utländskt fartyg eller flygplan, och brottet drabbade en annan utlänning eller ett utländskt intresse.',
   'Gärningspersonen är utlänning och handlade i tjänsten för en annan stat eller en internationell organisation.',
   'Gärningspersonen är i Sverige som del av ett internationellt militärt samarbete eller en internationell krisinsats.',
   'Brottet är aggressionsbrott eller riktar sig mot Internationella brottmålsdomstolen.'],src:'BrB 2:2'},
 special:{text:'Begicks brottet i något av de här sammanhangen?',hint:'Svara nej om inget stämmer.',items:[
   'Ombord på ett svenskt fartyg eller flygplan, eller av besättningen i tjänsten.',
   'I tjänsten av någon med svensk offentlig anställning, till exempel en polis eller en diplomat.',
   'Av någon i Försvarsmakten, på en plats där ett svenskt förband fanns.',
   'I tjänsten av någon som en svensk myndighet har anställt för en internationell insats.'],
  src:'BrB 2:3 punkt 1 och 4 b, 2:5 andra stycket 1–2 och 2:7 andra stycket 1–4'},
 state:{text:'Riktade sig brottet mot svenska staten eller en svensk myndighet?',
  hint:'Till exempel mot Sveriges säkerhet, mot en svensk tjänsteman i tjänsten, mot en svensk domstol eller mot svenska pass och andra svenska myndighetshandlingar.',src:'BrB 2:3 punkt 4 a'},
 swede:{text:'Är gärningspersonen svensk medborgare eller bosatt i Sverige?',
  hint:'Det räcker att det gällde när brottet begicks eller att det gäller i dag.',src:'BrB 2:3 punkt 2 a–b'},
 victim:{text:'Riktade sig brottet mot någon svensk?',
  hint:'Med svensk menas en svensk medborgare, någon som bor i Sverige eller ett svenskt företag eller en svensk förening. Svara nej om brottet inte har någon målsägande.',src:'BrB 2:3 punkt 3'},
 present:{text:'Finns gärningspersonen i Sverige nu?',
  hint:i=>i.over6m?'Brottet kan ge fängelse i mer än sex månader. Då räcker det att gärningspersonen finns här.'
   :'Brottet kan inte ge fängelse i mer än sex månader. Då räcker det inte att gärningspersonen finns här, men svaret behövs för nästa fråga.',src:'BrB 2:3 punkt 2 c'},
 derived:{text:'Har Sverige tagit över ärendet från ett annat land?',hint:'Svara ja om något av detta stämmer.',items:[
   'Ett annat land har bett Sverige att ta över lagföringen.','Sverige har sagt nej till att utlämna eller överlämna personen för brottet.',
   'En internationell överenskommelse kräver att Sverige prövar åtal när personen inte utlämnas.'],src:'BrB 2:3 punkt 5'},
 exempt:{text:i=>i.condText,hint:i=>i.condHint,src:'BrB 2:5 andra stycket 4'},
 doubleCrim:{text:'Är gärningen ett brott även i landet där den begicks?',
  hint:i=>'Är du osäker: svara ja och låt åklagaren kontrollera. Begicks brottet på internationellt vatten eller på annat område som inte tillhör något land: svara '+
   (i.prison?'ja, eftersom brottet kan ge fängelse i Sverige.':'nej, eftersom brottet inte kan ge fängelse i Sverige.'),src:'BrB 2:5 första stycket och 2:6'},
 zone:{text:'Begicks brottet på en anläggning till havs i Sveriges ekonomiska zon?',
  hint:'Till exempel en vindkraftpark eller en plattform på Sveriges kontinentalsockel.',src:'BrB 2:3 punkt 1 d'},
 nordicPlace:{text:'Begicks brottet i Danmark, Finland, Island eller Norge?',
  hint:'Svara också ja om brottet begicks på en färja eller ett flyg i reguljär trafik mellan Sverige och något av de länderna.',src:'BrB 2:7 andra stycket 5'},
 nordicCitizen:{text:'Är gärningspersonen dansk, finsk, isländsk eller norsk medborgare?',src:'BrB 2:7 andra stycket 6'}
};
/* Förklaringar till frågorna. Första stycket säger varför frågan ställs. */
const INFO={
 here:{t:['Frågan avgör om de vanliga reglerna gäller. Ett brott som har begåtts i Sverige får alltid prövas här.',
   'Brottet räknas som begånget i Sverige om gärningspersonen handlade här. Det räcker också att följden av brottet uppstod här.',
   'Exempel: en bedragare sitter utomlands och lurar en person som för över pengarna från sitt konto i Sverige. Brottet räknas som begånget i Sverige.',
   'Den som hjälper till från Sverige har också begått sin del av brottet här.',
   'Vet du inte säkert var brottet begicks? Svara ja om det finns skälig anledning att tro att det var i Sverige. Ett svenskt fartyg utomlands räknas inte som Sverige. Det kommer i nästa fråga.'],
  src:'BrB 2:1: ”Ett brott anses ha begåtts i Sverige om gärningsmannen handlade här. … Om det för straffansvar krävs att gärningen medfört en viss effekt anses brottet ha begåtts i Sverige även i de fall effekten inträdde i Sverige”'},
 exc22:{t:['Frågan avgör om åtal kräver ett särskilt tillstånd, ett åtalsförordnande, trots att brottet begicks i Sverige.',
   'Det krävs bara i de fyra fall som räknas upp. Gemensamt för dem är att brottet har svag koppling till Sverige eller rör en annan stats personal.',
   'Regeringen beslutar om tillståndet. Gäller brottet Internationella brottmålsdomstolen beslutar riksåklagaren.',
   'Undantaget för utländska tjänstemän gäller inte om personen har försökt dölja vem han eller hon arbetar för, till exempel med falska uppgifter eller förklädnad.'],
  src:'BrB 2:2: ”Åtal för brott som avses i 1 § får i följande fall väckas endast om åtalsförordnande har meddelats”'},
 special:{t:['Frågan sorterar ut fyra situationer där Sverige alltid får pröva brottet. Svarar du ja är du klar.',
   'I de här situationerna spelar det ingen roll om gärningen är ett brott i landet där den begicks, och åtal får väckas utan särskilt tillstånd.',
   'Fartyg och flygplan: brottet begicks ombord på ett svenskt fartyg eller flygplan. Hit räknas också brott som befälhavaren eller besättningen begår i tjänsten, även i land.',
   'Offentlig anställning: brottet begicks i tjänsten av någon som arbetar för staten, en kommun eller en region.',
   'Försvarsmakten och internationella insatser: brottet begicks av någon i Försvarsmakten där ett svenskt förband fanns, eller i tjänsten av någon som en svensk myndighet har anställt för en internationell militär insats eller civil krisinsats.'],
  src:'BrB 2:3 punkt 1 och 4 b, 2:5 andra stycket 1–2 och 2:7 andra stycket 1–4'},
 state:{t:['Frågan avgör om Sverige får pröva brottet oavsett vem som begick det och var.',
   'Det gäller brott som angriper svenska staten eller dess verksamhet. Exempel: spioneri mot Sverige, våld eller hot mot en svensk tjänsteman i tjänsten, mened inför svensk domstol och förfalskning av svenska pass.',
   'Brott mot enskilda personer och företag räknas inte hit.',
   'Svarar du ja spelar det ingen roll om gärningen är ett brott i landet där den begicks.'],
  src:'BrB 2:3 punkt 4 a: ”riktat sig mot rikets säkerhet, allmän verksamhet eller annat av rättsordningen särskilt skyddat svenskt intresse”'},
 swede:{t:['Frågan avgör om Sverige får pröva brottet därför att gärningspersonen hör hemma här.',
   'Svara ja om personen var svensk medborgare eller bosatt i Sverige när brottet begicks. Svara också ja om personen är det i dag.',
   'Bosatt betyder att personen bor här stadigvarande. Lagen kallar det hemvist. Medborgarskapet spelar då ingen roll.'],
  src:'BrB 2:3 punkt 2: ”av någon som vid gärningstillfället var svensk medborgare eller hade hemvist i Sverige” eller ”av någon som när åtal väcks för brottet är svensk medborgare eller har hemvist i Sverige”'},
 victim:{t:['Frågan avgör om brottet har en svensk målsägande. Det kan ge Sverige rätt att pröva brottet, och det kan göra att åtal får väckas utan särskilt tillstånd.',
   'Svara ja om brottet riktade sig mot en svensk medborgare, någon som bor i Sverige eller ett svenskt företag, en svensk förening eller en annan svensk organisation.',
   'Exempel: en svensk turist blir rånad eller misshandlad utomlands.'],
  src:'BrB 2:3 punkt 3: ”en svensk medborgare eller någon som har hemvist i Sverige, eller … en svensk juridisk person” och BrB 2:7 andra stycket 6'},
 present:{t:['Frågan avgör om Sverige får pröva brottet därför att gärningspersonen befinner sig här.',
   'En utlänning som inte bor i Sverige kan lagföras här för ett brott utomlands om han eller hon finns i Sverige och brottet kan ge fängelse i mer än sex månader.',
   'Det är brottets straffskala som räknas, inte det straff som kan väntas i det enskilda fallet. Appen läser av straffskalan på brottskortet.'],
  src:'BrB 2:3 punkt 2 c: ”av någon som finns i Sverige och det på brottet enligt svensk rätt kan följa fängelse i mer än sex månader”'},
 derived:{t:['Frågan avgör om Sverige får pröva ett brott som annars saknar koppling hit.',
   'Det förutsätter att gärningspersonen finns i Sverige och att ett annat land har lämnat över ärendet, att Sverige har sagt nej till utlämning eller att en internationell överenskommelse kräver att Sverige prövar åtal.',
   'I praktiken är det åklagaren som känner till detta. Svara nej om du inte vet.'],
  src:'BrB 2:3 punkt 5'},
 child:{t:['Frågan avgör om gärningen måste vara ett brott också i landet där den begicks.',
   'För våldtäkt, sexuellt övergrepp, koppleri och flera andra sexualbrott gäller inte det kravet när den som utsattes var under 18 år. Brottet kan alltså prövas i Sverige även om gärningen är tillåten i det andra landet.'],
  src:'BrB 2:5 andra stycket 4 b'},
 porn:{t:['Frågan avgör om gärningen måste vara ett brott också i landet där den begicks.',
   'Kravet gäller inte när barnpornografibrottet består i att skildra ett barn i pornografisk bild, till exempel att fotografera eller filma. För innehav, spridning och annan befattning gäller kravet.'],
  src:'BrB 2:5 andra stycket 4 a'},
 doubleCrim:{t:['Frågan avgör om Sverige får pröva brottet. I det här fallet krävs att gärningen är ett brott både i Sverige och i landet där den begicks. Lagen kallar det dubbel straffbarhet.',
   'Brottet behöver inte heta samma sak eller ha samma straff i det andra landet. Det räcker att gärningen är straffbar där.',
   'Begicks brottet i flera länder räcker det att gärningen är straffbar i ett av dem.',
   'Straffet i Sverige får inte bli strängare än det strängaste straffet i det andra landet.',
   'Begicks brottet på ett område som inte tillhör något land, till exempel på internationellt vatten, krävs i stället att brottet kan ge fängelse i Sverige.'],
  src:'BrB 2:5 första stycket: ”svensk domstol [är] behörig endast om gärningen är straffbar även enligt lagen på gärningsorten (dubbel straffbarhet)” och BrB 2:6'},
 zone:{t:['Frågan avgör om Sverige får pröva brottet därför att det begicks på en svensk anläggning till havs.',
   'Det gäller anläggningar som har byggts med stöd av lag i Sveriges ekonomiska zon eller på Sveriges kontinentalsockel, till exempel vindkraftparker och plattformar.'],
  src:'BrB 2:3 punkt 1 d'},
 nordicPlace:{t:['Frågan avgör om åtal får väckas utan särskilt tillstånd.',
   'För brott i Danmark, Finland, Island och Norge krävs inget tillstånd. Samma sak gäller brott på fartyg och flyg i reguljär trafik mellan Sverige och de länderna, till exempel färjan mellan Stockholm och Helsingfors.'],
  src:'BrB 2:7 andra stycket 5: ”har begåtts i Danmark, Finland, Island eller Norge eller på fartyg eller luftfartyg i reguljär trafik mellan orter belägna i Sverige eller någon av dessa stater”'},
 nordicCitizen:{t:['Frågan avgör om åtal får väckas utan särskilt tillstånd.',
   'Det krävs inget tillstånd när brottet har riktat sig mot ett svenskt intresse och gärningspersonen är medborgare i Sverige, Danmark, Finland, Island eller Norge, eller är bosatt i Sverige.'],
  src:'BrB 2:7 andra stycket 6: ”har begåtts mot svenskt intresse av en svensk, dansk, finsk, isländsk eller norsk medborgare eller av en utlänning med hemvist i Sverige”'}
};
const infoKey=(id,info)=>id==='exempt'?info.condInfo:id;

/* ---------- 5. Bedömning och resultat ---------- */
/* assess(c, ans) → {question:{id,text,hint,items,src,info}, step} eller {result:{…}} */
function assess(c,ans){
 const {info,fixed}=card(c),a=ans||{};
 const known={...fixed};for(const k of FACTS)if(a[k]!==undefined&&fixed[k]===undefined)known[k]=!!a[k];
 const id=next(known,info);
 const val=v=>typeof v==='function'?v(info):v;
 if(id){const q=Q[id];return {question:{id,text:val(q.text),hint:val(q.hint),items:q.items,src:q.src,info:infoKey(id,info)},step:FACTS.filter(k=>a[k]!==undefined&&fixed[k]===undefined).length+1};}
 const f={};for(const k of FACTS)f[k]=known[k]===true;
 const o=outcome(f,info),b=c&&c.stageParentId?(byId(c.stageParentId)||c):c;
 const r={checked:CHECKED,prosecution:b.prosecutionLabel||'Allmänt åtal',special:info.special,terrorNote:info.terrorNote&&!info.universal,
  court:o.court,order:o.order,place:f.here?'sweden':'abroad',grounds:[],double:null,doubleWhy:'',orderWhy:'',orderBy:'',courtWhy:''};
 if(f.here){
  r.courtText='Brottet räknas som begånget i Sverige';r.grounds=['BrB 2:1'];
  r.orderWhy=o.order?'Brottet hör till undantagen i BrB 2:2.':'Brott som har begåtts i Sverige åtalas utan åtalsförordnande.';
  r.orderBy=o.order?'Regeringen beslutar om åtalsförordnande (BrB 2:2). Gäller brottet Internationella brottmålsdomstolen beslutar riksåklagaren.':'';
  return {result:r};
 }
 const strong=f.special||info.universal||f.state||f.zone;
 if(f.special)r.grounds.push('Svenskt fartyg eller flygplan, svensk offentlig anställning, Försvarsmakten eller internationell insats (BrB 2:3 punkt 1, 2 eller 4 b)');
 if(info.universal)r.grounds.push('Internationellt brott som Sverige alltid får pröva (BrB 2:3 punkt 6)');
 if(f.state)r.grounds.push('Brott mot svenska staten (BrB 2:3 punkt 4 a)');
 if(f.zone)r.grounds.push('Anläggning i Sveriges ekonomiska zon eller på kontinentalsockeln (BrB 2:3 punkt 1 d)');
 if(f.swede)r.grounds.push('Svensk gärningsperson (BrB 2:3 punkt 2 a–b)');
 if(f.victim)r.grounds.push('Svensk målsägande (BrB 2:3 punkt 3)');
 if(f.present&&info.over6m)r.grounds.push('Gärningspersonen finns i Sverige och brottet kan ge fängelse i mer än sex månader (BrB 2:3 punkt 2 c)');
 if(f.present&&f.derived)r.grounds.push('Sverige har tagit över ärendet (BrB 2:3 punkt 5)');
 if(!o.court){
  r.courtText='Svensk domstol är inte behörig';
  if(r.grounds.length){r.double=true;r.courtWhy='Gärningen är inte ett brott i landet där den begicks. Det krävs i det här fallet (BrB 2:5).';}
  else r.courtWhy=(f.present&&!info.over6m?'Brottet kan inte ge fängelse i mer än sex månader. Då räcker det inte att gärningspersonen finns i Sverige. ':'')+
   'Brottet saknar den koppling till Sverige som krävs enligt BrB 2:3.';
  if(info.special)r.courtWhy+=' Kontrollera den särskilda regeln i '+info.special+'.';
  return {result:r};
 }
 r.courtText='Svensk domstol är behörig';
 if(strong){r.double=false;r.doubleWhy=f.special?'I de här situationerna krävs inte att gärningen är ett brott i det andra landet (BrB 2:5).':'Grunden för svensk domsrätt kräver inte att gärningen är ett brott i det andra landet.';}
 else if(f.exempt){r.double=false;r.doubleWhy=info.exemptWhy||info.condWhy;}
 else{r.double=true;r.doubleWhy='Gärningen ska vara ett brott även i landet där den begicks. Straffet får inte bli strängare än det strängaste straffet där (BrB 2:5).';}
 if(o.order){
  r.orderWhy='Åtal för brott utomlands kräver åtalsförordnande (BrB 2:7 första stycket).';
  r.orderBy='Riksåklagaren beslutar om åtalsförordnande (BrB 2:8).'+(f.swede?' Eftersom gärningspersonen är svensk medborgare eller bosatt i Sverige får riksåklagaren lämna över prövningen till en annan åklagare.'
   :known.swede===undefined?' Är gärningspersonen svensk medborgare eller bosatt i Sverige får riksåklagaren lämna över prövningen till en annan åklagare.':'');
 }else r.orderWhy=f.special?'I de här situationerna krävs inget åtalsförordnande (BrB 2:7 andra stycket 1–4).'
  :info.intlCourt?'Brottet är osann eller ovarsam utsaga inför en internationell domstol (BrB 2:7 andra stycket 7).'
  :f.nordicPlace?'Brottet har begåtts i ett nordiskt land eller i reguljär trafik mellan Sverige och ett nordiskt land (BrB 2:7 andra stycket 5).'
  :f.swede?'Brottet har riktat sig mot ett svenskt intresse och gärningspersonen är svensk medborgare eller bosatt i Sverige (BrB 2:7 andra stycket 6).'
  :'Brottet har riktat sig mot ett svenskt intresse och gärningspersonen är nordisk medborgare (BrB 2:7 andra stycket 6).';
 return {result:r};
}

/* ---------- 6. Visning ---------- */
function helpBox(i){return i?'<details class="fu18-help ut22-help"><summary><span class="fu18-i" aria-hidden="true">i</span>Förklaring</summary><div class="fu18-info">'+i.t.map(x=>'<p>'+esc(x)+'</p>').join('')+'<p class="fu18-info-src">Källa: '+esc(i.src)+'</p></div></details>':'';}
/* Förklaringar till resultatet. */
const RESULT_INFO={
 court:{t:['Svensk domstol får alltid pröva brott som har begåtts i Sverige. Brott som har begåtts utomlands får prövas här när de har en koppling till Sverige som räknas upp i BrB 2:3.',
   'Att svensk domstol är behörig betyder inte alltid att åtal får väckas. Det kan också krävas att gärningen är ett brott i det andra landet och att det finns ett åtalsförordnande.',
   'Vissa lagar har egna regler om brott utomlands, till exempel miljöbalken, fiskelagen och jaktlagen (BrB 2:4).'],src:'BrB 2:1, 2:3 och 2:4'},
 double:{t:INFO.doubleCrim.t.slice(1).concat(['Kravet gäller inte för brott där det lindrigaste straffet är fängelse i fyra år eller mer, och inte heller för de brott som räknas upp i BrB 2:5 andra stycket 4, till exempel människohandel, äktenskapstvång, könsstympning och sexualbrott mot barn.']),src:'BrB 2:5 och 2:6'},
 order:{t:['Ett åtalsförordnande är ett särskilt beslut om att åtal får väckas. Utan det får åklagaren inte åtala, även om brottet annars faller under allmänt åtal.',
   'Riksåklagaren beslutar i de flesta fall. Är gärningspersonen svensk medborgare eller bosatt i Sverige får riksåklagaren lämna över prövningen till en annan åklagare.',
   'Vid prövningen vägs bland annat in hur stark kopplingen till Sverige är, om brottet utreds i ett annat land och om det går att utreda brottet här.',
   'Polisen får inleda och bedriva förundersökning innan det finns ett åtalsförordnande. Kontakta åklagare tidigt.'],src:'BrB 2:7 och 2:8'},
 pros:{t:['Åtalsregeln anger om brottet faller under allmänt åtal eller om det till exempel krävs att målsäganden anger brottet. Den gäller på samma sätt när brottet har begåtts utomlands.',
   'Åtalsförordnandet är ett krav utöver åtalsregeln. Båda måste vara uppfyllda för att åtal ska få väckas.'],src:'Rättegångsbalken 20 kap. och brottets egen åtalsregel'}
};
function render(c,ans){
 const r=assess(c,ans);
 const back=Object.keys(ans||{}).length?'<button type="button" class="fu18-back" data-ut22="back">← Föregående fråga</button>':'';
 if(r.question){
  const q=r.question;
  const items=q.items?'<ul class="fu18-plain">'+q.items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul>':'';
  return '<div class="fu18 ut22" data-ut22-q="'+esc(q.id)+'"><p class="fu18-step">Fråga '+r.step+'</p><p class="fu18-q">'+esc(q.text)+'</p>'+
   (q.hint?'<p class="fu18-hint">'+esc(q.hint)+'</p>':'')+items+helpBox(INFO[q.info])+
   '<div class="fu18-yn"><button type="button" class="fu18-btn" data-ut22="yes">Ja</button><button type="button" class="fu18-btn" data-ut22="no">Nej</button></div>'+back+'</div>';
 }
 const x=r.result;
 const row=(cls,label,head,text,info)=>'<div class="fu18-row '+cls+'"><small>'+label+'</small><strong>'+esc(head)+'</strong>'+(text?'<p>'+esc(text)+'</p>':'')+helpBox(RESULT_INFO[info])+'</div>';
 let out='<div class="fu18 fu18-result ut22" data-ut22-court="'+(x.court?'ja':'nej')+'" data-ut22-order="'+(x.order===true?'ja':x.order===false?'nej':'-')+'">';
 out+=row(x.court?'pol':'ak','SVENSK DOMSRÄTT',x.courtText,x.court?(x.grounds.length?'Grund: '+x.grounds.join('. ')+'.':''):x.courtWhy,'court');
 if(x.court){
  if(x.place==='abroad')out+=row('when','BROTT ÄVEN I DET ANDRA LANDET',x.double?'Krävs':'Krävs inte',x.doubleWhy,'double');
  out+=row(x.order?'ak':'pol','ÅTALSFÖRORDNANDE',x.order?'Krävs':'Krävs inte',x.orderWhy+(x.orderBy?' '+x.orderBy:''),'order');
  out+=row('when','ÅTALSREGEL FÖR BROTTET',x.prosecution,x.order?'Brottets vanliga åtalsregel gäller utöver kravet på åtalsförordnande.':'Brottets vanliga åtalsregel gäller som om brottet hade begåtts i Sverige.','pros');
 }
 const notes=[];
 if(x.court&&x.place==='abroad')notes.push('Polisen får inleda och bedriva förundersökning utan åtalsförordnande. Kontakta åklagare tidigt: en utredning som kräver internationellt rättsligt samarbete leds av åklagare.');
 if(x.terrorNote&&x.place==='abroad'&&(!x.court||x.double))notes.push('Har brottet begåtts med terroristuppsåt, eller är det tortyr utförd av en offentlig tjänsteman, får svensk domstol pröva det oavsett svaren ovan (BrB 2:3 punkt 6). Kontakta åklagare.');
 if(x.special&&x.place==='abroad')notes.push('Lagen har en egen regel om brott utomlands: '+x.special+' (BrB 2:4). Den kan ge svensk domsrätt även när kopplingen ovan saknas.');
 if(x.court&&x.place==='abroad')notes.push('Har gärningen redan prövats i en utländsk dom som har fått laga kraft får den som huvudregel inte prövas igen. Undantagen kräver åtalsförordnande (BrB 2:9–10).');
 if(x.place==='abroad')notes.push('Folkrättsliga begränsningar, till exempel immunitet, gäller alltid (BrB 2:12).');
 if(notes.length)out+='<ul class="fu18-notes">'+notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>';
 out+='<p class="source-label">Brottsbalken 2 kap. 1–12 §§. Kontrollerad mot gällande lydelse '+esc(x.checked)+'.</p>';
 out+='<div class="fu18-end">'+back+'<button type="button" class="fu18-btn fu18-restart" data-ut22="restart">Börja om</button></div></div>';
 return out;
}
function available(c){return !!c&&(!c.stageStatus||c.stageStatus==='punishable');}
window.BK_UTLAND22={assess,render,available,card,outcome,next,keyOf,FACTS,Q,INFO,RESULT_INFO,
 tables:{NO_DOUBLE,CHILD_ALWAYS,CHILD_ASK,PORN_ASK,UNIVERSAL,INTL_COURT,TERROR_NOTE,SPECIAL},checked:CHECKED};
})();
