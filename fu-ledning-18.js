/* Brottskatalog 1.8 – FU-ledning och åklagarkontakt.
 * Ger två konkreta svar för det öppna brottet:
 *   1. Leds förundersökningen av åklagare eller av polisiär förundersökningsledare?
 *   2. När ska åklagaren kontaktas?
 * Källor (kontrollerade 2026-11-03):
 *  - RB 23:3 och 24:8 (data.riksdagen.se, RB t.o.m. SFS 2026:1657).
 *  - ÅFS 2005:9, konsoliderad, senast ändrad ÅFS 2019:2. Regelförteckningen 2026-09-30 visar
 *    att ingen senare ändring finns. Bilagan är likalydande med Polisens PM 2019:11.
 *  - Överenskommelse ÅM2017-2028 (Polisens PM 2018:5) om åklagarkontakt inför förhör med gripen.
 *  - RåR 2017:3 (konsoliderad 2020-09-01) och RåR 2006:3 (konsoliderad 2026-09-10).
 *  - LUL 2 och 24 §§, FUK 2 §, förordning (2014:1106), BrB 1:6 (SFS 2026:1528).
 * Förstadier (försök, förberedelse, stämpling) ingår inte i 1.8.
 */
(()=>{'use strict';
const AFS='https://www.aklagare.se/globalassets/dokument/afs-forfattningssamling-enbart-konsoliderade/afs-2005-09.pdf';
const RAR17='https://www.aklagare.se/globalassets/dokument/ovriga-dokument/rar/rar-20173.pdf';
const RAR06='https://www.aklagare.se/globalassets/dokument/ovriga-dokument/rar/nyrar-2006-03-handlaggning-av-ungdomsarenden.pdf';
const RB='https://data.riksdagen.se/dokument/sfs-1942-740.html';
const LUL='https://data.riksdagen.se/dokument/sfs-1964-167.html';
const FUK='https://data.riksdagen.se/dokument/sfs-1947-948.html';
const F1106='https://data.riksdagen.se/dokument/sfs-2014-1106.html';

/* Källor som visas i resultatet. Lagtext är ordagrann; riktlinjer återges som sammanfattning. */
const SOURCES={
 rb233:{label:'RB 23:3',url:RB,quote:'Om förundersökningen har inletts av Polismyndigheten eller Säkerhetspolisen och saken inte är av enkel beskaffenhet, ska ledningen av förundersökningen om brottet övertas av åklagaren, så snart någon skäligen kan misstänkas för brottet. Åklagaren ska också i annat fall överta ledningen när det är motiverat av särskilda skäl.'},
 rb248:{label:'RB 24:8 andra och tredje styckena',url:RB,quote:'Har någon gripits enligt 7 §, ska han eller hon så snart som möjligt förhöras av en åklagare eller av en polisman eller annan anställd vid Polismyndigheten eller Ekobrottsmyndigheten som myndigheten har utsett. Har åklagaren inte redan underrättats om frihetsberövandet, ska det skyndsamt anmälas till honom eller henne. Åklagaren ska efter förhöret omedelbart besluta om den misstänkte ska anhållas. Anhålls inte den misstänkte, ska åklagaren omedelbart häva beslutet om gripande.\nInnan åklagaren har underrättats om frihetsberövandet, får beslutet om gripande hävas av Polismyndigheten, om det är uppenbart att det inte finns skäl för fortsatt frihetsberövande.'},
 afs4:{label:'ÅFS 2005:9 4 § och bilagan',url:AFS,quote:'Brott som tagits upp i bilagan ska som regel anses vara av enkel beskaffenhet. Förundersökningen ska då, med undantagen i 5–8 §§, ledas av Polismyndigheten.'},
 afs5:{label:'ÅFS 2005:9 5 § och förordning (2014:1106) 2–11 §§',url:F1106,quote:'Förundersökning mot anställd inom polisen ska i allmänhet ledas av åklagare. Ärenden om brott av anställda inom polisen, polisstudenter och vissa uppdragstagare ska omedelbart lämnas över till Avdelningen för särskilda utredningar, som genast lämnar ärendet vidare till åklagare. Förhör med den misstänkte ska hållas av åklagare eller polisman vid Avdelningen för särskilda utredningar. Förordningen gäller också ärenden om brott av åklagare, domare och vissa andra befattningshavare. Undantag: vissa trafikbrott (3 §) och brott med endast böter utan samband med anställningen (5 §), när polisen utfärdar ordningsbot eller inleder förundersökning.'},
 afs6:{label:'ÅFS 2005:9 6 §',url:AFS,quote:'Oavsett om någon är skäligen misstänkt eller inte ska åklagare leda förundersökningen när 1. brottet innefattar våld eller hot om våld mot närstående eller tidigare närstående person eller 2. brottet innefattar en sexuell handling mot någon som är under arton år. Har Polismyndigheten inlett förundersökning ska den snarast överlämnas till åklagaren. (Närstående: som i BrB 4:4 a. Sexuell handling avser inte gärning enligt BrB 6:10.)'},
 afs7:{label:'ÅFS 2005:9 7 §',url:AFS,quote:'Åklagare ska överta ledningen bl.a. när annan domstolsåtgärd än förordnande av offentlig försvarare eller målsägandebiträde krävs, vid internationellt samarbete, vid bevistalan, när brottet är svårbedömt, när någon är skäligen misstänkt för ett brott med straffmaximum fängelse två år eller mer mot målsägandens liv, hälsa, frihet eller frid och målsäganden inte har fyllt 15 år vid anmälan, vid sannolikt motiv enligt BrB 29:2 p. 7 och när talan om företagsbot kan bli aktuell.'},
 afs8:{label:'ÅFS 2005:9 8 §',url:AFS,quote:'Åklagare ska också överta ledningen när någon under 15 år ska höras och detta påkallar det, när den misstänktes psykiska status påtagligt kan antas avvika och svårare straff än böter kan följa, när kontaktförbud eller europeisk skyddsorder har sökts, och när annat tvångsmedel enligt RB 24–28 kap. blir aktuellt än mindre husrannsakan, avspärrning, kroppsvisitation, kroppsbesiktning, beslag och fotografi eller fingeravtryck.'},
 afs10:{label:'ÅFS 2005:9 10 §',url:AFS,quote:'Kan ingen skäligen misstänkas ska Polismyndigheten genast underrätta åklagare om det är sannolikt att åklagaren tar över ledningen, eller om brottet är av särskilt allvarligt slag: lägst fängelse fyra år samt försök, förberedelse och stämpling till sådant brott.'},
 afs11:{label:'ÅFS 2005:9 11 §',url:AFS,quote:'Kan förundersökningsbegränsning som ska beslutas av åklagare bli aktuell i en polisledd förundersökning ska ärendet snarast överlämnas till åklagare.'},
 overens:{label:'Överenskommelse ÅM2017-2028 (Polisens PM 2018:5)',url:RAR17,quote:'Inför förhör med en gripen kontaktas åklagaren före förhöret om den misstänkte är eller kan vara under 18 år eller om brottet inte är av enkel beskaffenhet. Åklagaren kontaktas också före förhöret om den misstänkte vill ha försvarare eller om polisen bedömer att det finns behov av försvarare. I övriga fall, vid brott av enkel beskaffenhet, kan åklagaren kontaktas efter förhöret.'},
 rar17:{label:'RåR 2017:3',url:RAR17,quote:'I åklagarledda förundersökningar ska åklagaren som huvudregel kontaktas innan förhör med den misstänkte hålls, även när den misstänkte är gripen. Förhör med den som gripits för brott av enkel beskaffenhet kan normalt hållas utan att åklagaren först kontaktas.'},
 rar06:{label:'RåR 2006:3 kap. 4 och bilaga 2',url:RAR06,quote:'Försvarare ska i nästan alla fall vara närvarande vid förhör i sak med en ung misstänkt. Kan försvarare inte närvara hålls bara ett delgivningsförhör (misstanke och inställning, samt personliga förhållanden som behövs för anhållandefrågan). Åklagaren prövar anhållande och häver gripandet om straffvärdet ligger på bötesnivå.'},
 lul:{label:'LUL 2 och 24 §§',url:LUL,quote:'En förundersökning mot den som inte har fyllt arton år ska ledas av en åklagare eller en anställd vid Polismyndigheten som myndigheten har förordnat. För en misstänkt som inte har fyllt arton år ska en offentlig försvarare förordnas, om det inte är uppenbart att han eller hon saknar behov av försvarare.'},
 fuk2:{label:'Förundersökningskungörelsen 2 §',url:FUK,quote:'Vid förundersökning mot någon som inte fyllt 18 år ska åklagaren alltid underrättas om förundersökningens gång, om det inte är obehövligt.'},
};

/* ---------- Klassning mot bilagan till ÅFS 2005:9 ----------
 * 'enkel'  = brottet står i bilagan.
 * 'villkor'= står i bilagan med ett villkor (frågas i verktyget).
 * Allt annat i brottsbalken är 'ej' (inte enkel beskaffenhet).
 * Specialstraffrätt utanför de listade lagarna: enkel om straffet inte kan bli svårare än fängelse sex månader.
 * note = upplysning som visas i resultatet. */
const B=(row,note)=>({cls:'enkel',row,note});
const ENKEL={
 'misshandel':B('3 kap. misshandel'),
 'ringa-misshandel':B('3 kap. misshandel (ringa brott är samma brottsbeteckning)'),
 'v03-framkallande-av-fara-for-annan':B('3 kap. framkallande av fara för annan'),
 'v03-olaga-hot':B('4 kap. olaga hot, ej grovt brott'),
 'hemfridsbrott':B('4 kap. hemfridsbrott'),
 'olaga-intrang':B('4 kap. olaga intrång'),
 'ofredande':B('4 kap. ofredande'),
 'v03-olovlig-identitetsanvandning':B('4 kap. olovlig identitetsanvändning'),
 'v03-sexuellt-ofredande':B('6 kap. sexuellt ofredande enligt 10 § andra stycket'),
 'v03-kop-av-sexuell-tjanst':B('6 kap. köp av sexuell tjänst (numera köp av sexuell handling)'),
 'stold':B('8 kap. stöld'),'ringa-stold':B('8 kap. ringa stöld'),'grov-stold':B('8 kap. grov stöld'),
 'v03-tillgrepp-av-fortskaffningsmedel':B('8 kap. tillgrepp av fortskaffningsmedel'),
 'v04-ringa-tillgrepp-av-fortskaffningsmedel':B('8 kap. tillgrepp av fortskaffningsmedel (ringa brott är samma brottsbeteckning)'),
 'v03-egenmaktigt-forfarande':B('8 kap. egenmäktigt förfarande'),
 'v03-sjalvtakt':B('8 kap. självtäkt'),
 'v03-olovlig-energiavledning':B('8 kap. olovlig energiavledning'),
 'bedrageri':B('9 kap. bedrägeri'),'ringa-bedrageri':B('9 kap. ringa bedrägeri'),
 'v03-haleriforseelse':B('9 kap. häleriförseelse'),
 'v05-oredligt-forfarande':B('9 kap. oredligt förfarande'),
 'v03-ringa-forskingring':B('10 kap. ringa förskingring'),
 'v03-olovligt-forfogande':B('10 kap. olovligt förfogande'),
 'v15-olovligt-brkande':B('10 kap. olovligt brukande'),
 'v15-yndo-rseelse':B('10 kap. fyndförseelse'),
 'ringa-skadegorelse':B('12 kap. ringa skadegörelse'),
 'v03-averkan':B('12 kap. åverkan'),
 'v03-tagande-av-olovlig-vag':B('12 kap. tagande av olovlig väg'),
 'v04-allmanfarlig-vardsloshet':B('13 kap. allmänfarlig vårdslöshet'),
 'v04-grovt-allmanfarlig-vardsloshet':B('13 kap. allmänfarlig vårdslöshet (grovt brott är samma brottsbeteckning)','Bilagan undantar inte grova fall. Är brottet svårbedömt tar åklagaren över (ÅFS 7 § 4).'),
 'v03-urkundsforfalskning':B('14 kap. urkundsförfalskning'),
 'v03-ringa-urkundsforfalskning':B('14 kap. förvanskning av urkund'),
 'v05-hindrande-av-urkunds-bevisfunktion':B('14 kap. undertryckande av urkund (numera hindrande av urkunds bevisfunktion)'),
 'v05-ringa-hindrande-av-urkunds-bevisfunktion':B('14 kap. undertryckande av urkund (numera hindrande av urkunds bevisfunktion)'),
 'v05-grovt-hindrande-av-urkunds-bevisfunktion':B('14 kap. undertryckande av urkund (numera hindrande av urkunds bevisfunktion; grovt brott är samma brottsbeteckning)','Bilagan undantar inte grova fall. Är brottet svårbedömt tar åklagaren över (ÅFS 7 § 4).'),
 'v15-markesforfalskning':B('14 kap. märkesförfalskning'),
 'v15-ringa-markesforfalskning':B('14 kap. märkesförfalskning (ringa brott är samma brottsbeteckning)'),
 'v15-grov-markesforfalskning':B('14 kap. märkesförfalskning (grovt brott är samma brottsbeteckning)','Bilagan undantar inte grova fall. Är brottet svårbedömt tar åklagaren över (ÅFS 7 § 4).'),
 'v03-osant-intygande':B('15 kap. osant intygande'),
 'v06-missbruk-av-urkund':B('15 kap. missbruk av urkund'),
 'v06-grovt-missbruk-av-urkund':B('15 kap. missbruk av urkund (grovt brott är samma brottsbeteckning)','Bilagan undantar inte grova fall. Är brottet svårbedömt tar åklagaren över (ÅFS 7 § 4).'),
 'v03-brott-mot-griftefrid':B('16 kap. brott mot griftefrid (numera gravfridsbrott)'),
 'v06-falskt-larm':B('16 kap. falskt larm'),
 'v06-grovt-falskt-larm':B('16 kap. falskt larm (grovt brott är samma brottsbeteckning)','Bilagan undantar inte grova fall. Är brottet svårbedömt tar åklagaren över (ÅFS 7 § 4).'),
 'v06-missbruk-av-larmanordning':B('16 kap. missbruk av larmanordning'),
 'v03-forargelsevackande-beteende':B('16 kap. förargelseväckande beteende'),
 'valdsamt-motstand':B('17 kap. våldsamt motstånd'),
 'v15-cover-overtradelse-av-myndighets-bud':B('17 kap. överträdelse av myndighets bud'),
 'v15-cover-hindrande-av-forrattning':B('17 kap. hindrande av förrättning'),
 'v03-foregivande-av-allman-stallning':B('17 kap. föregivande av allmän ställning'),
 // Specialstraffrätt som bilagan räknar upp.
 'rattfylleri':B('Lag (1951:649) om straff för vissa trafikbrott'),'grovt-rattfylleri':B('Lag (1951:649) om straff för vissa trafikbrott'),
 'olovlig-korning':B('Lag (1951:649) om straff för vissa trafikbrott'),'grov-olovlig-korning':B('Lag (1951:649) om straff för vissa trafikbrott'),
 'traffic16-0':B('Lag (1951:649) om straff för vissa trafikbrott'),'traffic16-1':B('Lag (1951:649) om straff för vissa trafikbrott'),
 'traffic16-2':B('Lag (1951:649) om straff för vissa trafikbrott'),'traffic16-3':B('Lag (1951:649) om straff för vissa trafikbrott'),
 'traffic16-4':B('Lag (1951:649) om straff för vissa trafikbrott'),'traffic16-5':B('Lag (1951:649) om straff för vissa trafikbrott'),
 'knivbrott':B('Lag (1988:254) om förbud beträffande knivar och andra farliga föremål'),
 'narkotikabrott-innehav':B('1 § första stycket 6 narkotikastrafflagen'),
 'narkotikabrott-overlatelse':B('1 § första stycket 1 narkotikastrafflagen'),
 'vapenbrott':B('Vapenlagen (1996:67), ersatt av vapenlagen (2026:408)','Bilagan nämner den upphävda vapenlagen (1996:67). Appen behandlar motsvarande brott i nya vapenlagen som enkla, men inte grova eller synnerligen grova brott.'),
 'vapenbrott-mindre':B('Vapenlagen (1996:67), ersatt av vapenlagen (2026:408)','Bilagan nämner den upphävda vapenlagen (1996:67). Appen behandlar motsvarande brott i nya vapenlagen som enkla.'),
 'vapenbrott-oaktsamt':B('Vapenlagen (1996:67), ersatt av vapenlagen (2026:408)','Bilagan nämner den upphävda vapenlagen (1996:67). Appen behandlar motsvarande brott i nya vapenlagen som enkla.'),
 'v09-brott-mot-tillstandsplikten-for-brandfarliga-varor':B('Lag (2010:1011) om brandfarliga och explosiva varor'),
 'v09-brott-mot-tillstandsplikten-for-explosiva-varor':B('Lag (2010:1011) om brandfarliga och explosiva varor','Straffskalan för explosiva varor skärptes 2023, efter bilagan. Vid allvarligare fall tar åklagaren över om brottet är svårbedömt (ÅFS 7 § 4).'),
 'v09-bidragsbrott':B('2 § bidragsbrottslagen'),'v09-ringa-bidragsbrott':B('2 § bidragsbrottslagen'),
 'v09-vardslost-bidragsbrott':B('4 § bidragsbrottslagen')
};
/* Brott med villkor i bilagan. yes = svaret som gör brottet enkelt. */
const V=(row,q,yes,hint)=>({cls:'villkor',row,cond:{q,yes,hint}});
const TRAFIK='Skedde det i samband med en trafikolycka?';
const BRAND='Skedde skadegörelsen genom brand?';
const TJM='Var tjänstemannen polis, åklagare eller domare?';
const VILLKOR={
 'v03-vallande-till-annans-dod':V('3 kap. vållande till annans död i samband med trafikolycka',TRAFIK,true),
 'v03-grovt-vallande-till-annans-dod':V('3 kap. vållande till annans död i samband med trafikolycka (grovt brott är samma brottsbeteckning)',TRAFIK,true),
 'v03-vallande-till-kroppsskada-eller-sjukdom':V('3 kap. vållande till kroppsskada eller sjukdom i samband med trafikolycka',TRAFIK,true),
 'v03-grovt-vallande-till-kroppsskada-eller-sjukdom':V('3 kap. vållande till kroppsskada eller sjukdom i samband med trafikolycka (grovt brott är samma brottsbeteckning)',TRAFIK,true),
 'skadegorelse':V('12 kap. skadegörelse, ej genom brand',BRAND,false),
 'grov-skadegorelse':V('12 kap. grov skadegörelse, ej genom brand',BRAND,false),
 'vald-hot-tjansteman':V('17 kap. våld och hot mot tjänsteman, ej mot polis, åklagare eller domare',TJM,false),
 'v05-angrepp-mot-tjansteman':V('17 kap. förgripelse mot tjänsteman (numera angrepp mot tjänsteman), ej mot polis, åklagare eller domare',TJM,false),
 'v03-haleri':V('9 kap. häleri avseende något som är frånhänt annan genom brott','Gäller häleriet egendom som någon har frånhänts genom brott?',true,'Inte till exempel penninghäleri eller näringshäleri.'),
 'v03-brukande-av-falsk-urkund':V('14 kap. brukande av falsk urkund','Gäller brukandet en falsk urkund?',true,'Inte till exempel falska pengar eller falsk signatur.')
};
const LISTED_SPECIAL=/^(TBL|KnivL|BidrBrL|LBE|VapenL|NSL)\b/;
const ch=c=>{const m=String(c.shortRef||'').match(/^BrB (\d+):(\d+\s?[a-z]?)/);return m?{ch:Number(m[1]),p:m[2].replace(/\s/g,'')}:null;};
const max=c=>Number(c.penaltyRange?.max);
const min=c=>Number(c.penaltyRange?.min);

function classify(c){
 if(!c||c.stageType)return null;
 if(ENKEL[c.id])return {...ENKEL[c.id]};
 if(VILLKOR[c.id])return {...VILLKOR[c.id],cond:{...VILLKOR[c.id].cond}};
 const ref=String(c.shortRef||'');
 if(/^BrB\b/.test(ref))return {cls:'ej',row:'Brottet finns inte i bilagan till ÅFS 2005:9.'};
 const tull=/^SmuglL/.test(ref)?'Tullverket kan leda förundersökningen om smugglingsbrott (ÅFS 2013:3). Svaret här gäller när Polismyndigheten leder.':undefined;
 if(Number.isFinite(max(c))&&max(c)<=0.5)return {cls:'enkel',row:'Övrig specialstraffrätt: straffet kan inte bli svårare än fängelse sex månader.',note:tull};
 if(/^(KnivL|LBE)/.test(ref))return {cls:'ej',row:'Den grova brottsformen infördes efter bilagan och straffet kan bli svårare än fängelse sex månader.'};
 return {cls:'ej',row:'Brottet eller brottsformen finns inte i bilagan och straffet kan bli svårare än fängelse sex månader.',note:tull};
}

/* Brottstypens egenskaper som styr vilka frågor som behövs. */
function traits(c){
 const x=ch(c),t=String(c.title||'').toLowerCase();
 // ÅFS 6 § 2 avser inte BrB 6:10. Kontakt för att träffa barn (6:10 a) och köp av sexuell handling (6:11) innefattar ingen sexuell handling mot barn.
 const sexual=!!x&&x.ch===6&&!['10','10a','11'].includes(x.p);
 const childSexual=sexual&&/barn/.test(t);
 const has=(n,list)=>!!x&&x.ch===n&&list.includes(x.p);
 return {
  violence:has(3,['1','2','3','5','6','9'])||has(4,['1','2','4','4a','4b','4e','5','6','7'])||(!!x&&x.ch===6)||has(8,['5','6'])||has(9,['4']),
  sexual:sexual&&!childSexual,childSexual,
  lhff:!!x&&(x.ch===3||x.ch===4)&&max(c)>=2,
  hate:!!x&&[3,4,6,12,16,17].includes(x.ch),
  person:!!x&&[3,4,6].includes(x.ch)&&!(x.ch===3&&['7','8','10'].includes(x.p)),
  finesOnly:max(c)===0,
  min4:min(c)>=4||!!c.penaltyRange?.life
 };
}

/* Förklaringar bakom ⓘ-knapparna. Lagtext citeras ordagrant; riktlinjer och förarbeten anges som sådana. */
const INFO={
 misstankt:{t:['Lagen definierar inte "skäligen misstänkt". Enligt praxis och doktrin krävs konkreta omständigheter som med viss styrka talar för att personen har begått brottet. En allmän eller vag misstanke räcker inte.','Det är först när någon är skäligen misstänkt som åklagaren ska ta över ledningen av en förundersökning om ett brott som inte är av enkel beskaffenhet (RB 23:3).'],src:'RB 23:3'},
 pol:{t:['Förordningen omfattar:','• alla anställda inom polisen, inte bara poliser (2 och 4 §§),','• uppdragstagare som med stöd av ett särskilt förordnande från Polismyndigheten utför arbete för myndigheten under ledning av en polisman (2 §),','• den som antagits till eller genomgår grundutbildning till polisman (4 §),','• ärenden om brott av åklagare, domare och vissa andra offentliga befattningshavare som handläggs av de särskilt avdelade åklagarna (6 §).','Förordningen gäller både brott med och utan samband med anställningen. Undantag finns för vissa trafikbrott (3 §) och för brott med endast böter i straffskalan utan samband med anställningen (5 §), när polisen utfärdar ordningsbot eller inleder förundersökning.'],src:'Förordning (2014:1106) 2–6 §§'},
 polTjanst:{t:['Förordningen gäller brott som har samband med anställningen, till exempel ett brott i tjänsten eller vid myndighetsutövning (2 §). Brott utan sådant samband omfattas också (4 §), men inte om endast böter är föreskrivet för brottet och Polismyndigheten utfärdar ordningsbot eller inleder förundersökning (5 §). Ett beslut att lägga ned en sådan förundersökning fattas av åklagare.'],src:'Förordning (2014:1106) 2, 4 och 5 §§'},
 narstaende:{t:['ÅFS 2005:9 6 § 1: åklagaren ska leda förundersökningen när brottet innefattar våld eller hot om våld mot närstående eller tidigare närstående person, oavsett om någon är skäligen misstänkt.','Enligt de allmänna råden avses med närstående detsamma som i BrB 4:4 a (grov fridskränkning). Lagen definierar inte begreppet. Enligt förarbetena avses främst make, sambo, partner, barn, föräldrar och syskon, men även andra som har en nära och förtroendefull relation till gärningsmannen, till exempel en pojkvän eller flickvän man inte bor med. Tidigare närstående omfattar till exempel en före detta partner.','Regeln gäller bara våld eller hot om våld. Andra brott mot en närstående, till exempel en stöld, omfattas inte.'],src:'ÅFS 2005:9 6 § med allmänna råd; BrB 4:4 a'},
 mal18:{t:['ÅFS 2005:9 6 § 2: åklagaren ska leda förundersökningen när brottet innefattar en sexuell handling mot någon som är under arton år, oavsett om någon är skäligen misstänkt. Enligt de allmänna råden avses inte en gärning enligt BrB 6:10 (sexuellt ofredande).'],src:'ÅFS 2005:9 6 § med allmänna råd'},
 mal15:{t:['ÅFS 2005:9 7 § 5: åklagaren ska överta ledningen när någon är skäligen misstänkt för ett brott för vilket det är föreskrivet fängelse två år eller mer och brottet riktats mot målsägandens liv, hälsa, frihet eller frid, om målsäganden vid tiden för anmälan inte har fyllt femton år.','Regeln gäller inte utredningar enligt LUL 31 §, det vill säga när även den misstänkte är under 15 år (ÅFS 1 §). Polisen leder då, om inte någon annan regel ger åklagarledning.'],src:'ÅFS 2005:9 1 och 7 §§'},
 hat:{t:['ÅFS 2005:9 7 § 6: åklagaren ska överta ledningen när någon är skäligen misstänkt för ett brott där det är sannolikt att det finns ett motiv enligt BrB 29:2 p. 7.','BrB 29:2 p. 7 (ordagrant): "om ett motiv för brottet varit att kränka en person, en folkgrupp eller en annan sådan grupp av personer på grund av ras, hudfärg, nationellt eller etniskt ursprung, trosbekännelse, sexuell läggning, kön, könsidentitet eller könsuttryck eller annan liknande omständighet".','Motivet behöver inte vara det enda motivet ("ett motiv"), men det ska vara sannolikt.'],src:'ÅFS 2005:9 7 § 6; BrB 29:2 p. 7'},
 kf:{t:['ÅFS 2005:9 8 § 3: åklagaren ska överta ledningen när en ansökan om kontaktförbud eller europeisk skyddsorder har gjorts.','Lag (1988:688) om kontaktförbud 1 §: ett kontaktförbud får meddelas om det på grund av särskilda omständigheter finns risk för att den som förbudet avses gälla mot kommer att begå brott mot, förfölja, otillbörligt övervaka eller på annat sätt allvarligt trakassera den som förbudet avses skydda, eller utsätta denne för påverkan för att hindra att han eller hon lämnar uppgifter till domstol eller brottsbekämpande myndighet.'],src:'ÅFS 2005:9 8 § 3; lag (1988:688) om kontaktförbud 1 §'},
 barn:{t:['ÅFS 2005:9 8 § 1: åklagaren ska överta ledningen när någon som är under femton år ska höras under förundersökningen och detta påkallar att åklagare leder förundersökningen.','Enligt de allmänna råden bör bestämmelsen tillämpas om åklagarens närvaro krävs vid förhöret, åklagaren bör ta ställning till formerna för förhöret eller åklagaren bör ta ställning till om den unge över huvud taget ska höras.'],src:'ÅFS 2005:9 8 § 1 med allmänna råd'},
 psyk:{t:['ÅFS 2005:9 8 § 2: åklagaren ska överta ledningen när den misstänktes psykiska status påtagligt kan antas avvika från det normala och svårare straff än böter kan följa på brottet.','Föreskriften ger ingen närmare vägledning om vad som är en påtaglig avvikelse. Är du osäker, kontakta åklagaren.'],src:'ÅFS 2005:9 8 § 2'},
 tvm:{t:['ÅFS 2005:9 8 § 4: åklagaren ska överta ledningen när fråga uppkommer om användande av annat tvångsmedel enligt RB 24–28 kap. än husrannsakan som inte är av större omfattning, avspärrning, förbud m.m. för säkerställande av utredning om brott, kroppsvisitation, kroppsbesiktning, beslag samt tagande av fotografi, fingeravtryck och annan dylik åtgärd.','Föreskriften anger inte närmare var gränsen för en husrannsakan av större omfattning går.'],gripen:'Anhållande av den gripne prövas av åklagaren när gripandet anmäls (RB 24:8). Anhålls den gripne tar åklagaren över ledningen.',src:'ÅFS 2005:9 8 § 4'},
 ung:{t:['Enligt överenskommelsen ska åklagaren kontaktas före förhöret om den misstänkte är under 18 år eller kan vara det. Är du osäker på åldern, svara ja.','För en misstänkt under 18 år ska offentlig försvarare förordnas, om det inte är uppenbart att han eller hon saknar behov av försvarare (LUL 24 §).'],src:'Överenskommelse ÅM2017-2028 (PM 2018:5); LUL 24 §'},
 forsvarare:{t:['Enligt överenskommelsen ska åklagaren kontaktas före förhöret om den misstänkte begär försvarare eller om polisen bedömer att det finns behov av försvarare.','RB 21:3 a (ordagrant, i urval): "Offentlig försvarare ska också på begäran förordnas för den som är misstänkt för ett brott, för vilket det inte är stadgat lindrigare straff än fängelse i sex månader."','"Offentlig försvarare ska därutöver förordnas','1. om den misstänkte är i behov av försvarare med hänsyn till utredningen om brottet,','2. om försvarare behövs med hänsyn till att det är tveksamt vilken påföljd som ska väljas och det finns anledning att döma till en annan påföljd än böter eller villkorlig dom eller sådana påföljder i förening, eller','3. om det i övrigt finns särskilda skäl med hänsyn till den misstänktes personliga förhållanden eller till vad målet rör."','Är den misstänkte anhållen eller häktad ska offentlig försvarare förordnas om han eller hon begär det (RB 21:3 a första stycket).'],src:'RB 21:3 a; överenskommelse ÅM2017-2028 (PM 2018:5)'}
};
/* Punkterna i frågan om svårbedömt eller ovanligt. Var och en har en egen förklaring. */
const SVAR_ITEMS=[
 {text:'Internationellt samarbete',t:['ÅFS 2005:9 7 § 2: när det kan bli aktuellt att göra en framställning om utlämning eller överlämnande, att utfärda ett europeiskt frysningsbeslut, att utfärda en europeisk utredningsorder, att begära eller lämna internationell rättslig hjälp i brottmål, att överföra lagföringen till annat land eller annars när förundersökningen är av sådan art att samordning bör ske mellan svensk åklagare och åklagare eller motsvarande i ett annat land.'],src:'ÅFS 2005:9 7 § 2'},
 {text:'En domstolsåtgärd behövs, t.ex. särskild företrädare för barn eller sakkunnig',t:['ÅFS 2005:9 7 § 1: när det under förundersökningen krävs annan åtgärd av domstol än förordnande av offentlig försvarare eller målsägandebiträde, till exempel förordnande av särskild företrädare för barn eller utseende av sakkunnig.','Att offentlig försvarare eller målsägandebiträde ska förordnas gör alltså inte i sig att åklagaren tar över.'],src:'ÅFS 2005:9 7 § 1'},
 {text:'Bevistalan',only:'min4',t:['ÅFS 2005:9 7 § 3: när fråga om bevistalan aktualiseras.','LUL 38 §: åklagaren ska begära prövning i domstol av om den unge har begått ett brott (bevistalan) om brottet har begåtts innan den unge fyllt femton år, det inte är föreskrivet lindrigare straff än fängelse i fyra år för brottet (eller det är fråga om straffbelagt försök, förberedelse eller stämpling till ett sådant brott), en utredning enligt LUL 31 § har slutförts och det skulle ha funnits tillräckliga skäl för åtal om brottet hade begåtts efter femton års ålder.'],src:'ÅFS 2005:9 7 § 3; LUL 38 §'},
 {text:'Företagsbot',t:['ÅFS 2005:9 7 § 7: när ett brott kan föranleda talan om företagsbot.','BrB 36:23 (i sammandrag): ett företag (enskild näringsidkare eller juridisk person) ska åläggas företagsbot för brott med strängare straff än penningböter som har begåtts i utövningen av näringsverksamhet, jämförbar offentlig verksamhet eller annan verksamhet som företaget bedriver om brottet varit ägnat att leda till ekonomisk fördel för företaget. Det krävs också att företaget inte gjort vad som skäligen kunnat krävas för att förebygga brottet, eller att brottet begåtts av en person i ledande ställning eller med särskilt ansvar för tillsyn eller kontroll. Gäller inte brott riktade mot företaget.'],src:'ÅFS 2005:9 7 § 7; BrB 36:23'},
 {text:'Förundersökningsbegränsning som åklagaren beslutar om',t:['ÅFS 2005:9 11 §: kan förundersökningsbegränsning bli aktuell och beslutet ska fattas av åklagare, ska ärendet snarast överlämnas till åklagare.','RB 23:4 a: en förundersökning får läggas ned 1. om fortsatt utredning skulle kräva kostnader som inte står i rimligt förhållande till sakens betydelse och brottets straffvärde kan antas inte överstiga fängelse i tre månader, eller 2. om det kan antas att åtal inte skulle ske på grund av reglerna om åtalsunderlåtelse eller särskild åtalsprövning och inget väsentligt allmänt eller enskilt intresse åsidosätts. Polisen beslutar själv bara när beslutet grundas på åtalsunderlåtelse enligt RB 20:7 första stycket eller särskild åtalsprövning. Övriga beslut fattas av åklagare.'],src:'ÅFS 2005:9 11 §; RB 23:4 a'},
 {text:'Brottet är svårbedömt',t:['ÅFS 2005:9 7 § 4: när brottet är svårbedömt eller det annars med hänsyn till utredningens art är påkallat att åklagaren leder förundersökningen.','Föreskriften definierar inte "svårbedömt". Enligt de allmänna råden till 10 § bör polisen underrätta åklagaren tidigt i ärenden som kräver komplicerade juridiska bedömningar, till exempel ekonomisk brottslighet eller svårbedömda specialstraffrättsliga brott.'],src:'ÅFS 2005:9 7 § 4 och allmänna råd till 10 §'},
 {text:'Den misstänkte är under 18 år och utredningen gäller flera brott eller flera misstänkta',only:'suspect',t:['Enligt de allmänna råden till ÅFS 2005:9 7 § bör 7 § 4 tillämpas när den misstänkte är under arton år och utredningen är komplex med hänsyn till att den rör många brott eller många misstänkta.','Den bör också tillämpas när den misstänkte är under arton år och utredningen rör fler än ett brott eller fler än en misstänkt och särskilda avvägningar bör göras om utredning och lagföring ska ske successivt eller i ett sammanhang.'],src:'ÅFS 2005:9 7 § 4, allmänna råd'}
];
/* Omständigheter som gör att åklagaren ska överta ledningen (ÅFS 7 och 8 §§).
 * Varje omständighet är en egen ja/nej-fråga. Frågan ställs bara när svaret kan ändra resultatet,
 * det vill säga när förundersökningen annars skulle ledas av polis. needs = krav för att frågan ska ställas. */
const TAKEOVER=[
 {id:'mal15',needs:t=>t.suspect&&t.lhff,src:'afs7',reason:'Brottet riktar sig mot ett barn under 15 år och har straffmaximum fängelse två år eller mer (ÅFS 7 § 5).',
  q:'Var målsäganden under 15 år när brottet anmäldes?',hint:'Gäller inte om även den misstänkte är under 15 år (ÅFS 1 §). Svara då nej.'},
 {id:'hat',needs:t=>t.suspect&&t.hate,src:'afs7',reason:'Det finns sannolikt ett hatbrottsmotiv (ÅFS 7 § 6).',
  q:'Finns det sannolikt ett hatbrottsmotiv?',hint:'Motiv att kränka någon på grund av ras, hudfärg, nationellt eller etniskt ursprung, trosbekännelse, sexuell läggning, kön, könsöverskridande identitet eller uttryck eller annan liknande omständighet (BrB 29:2 p. 7).'},
 {id:'kf',needs:t=>t.suspect&&t.person,src:'afs8',reason:'Kontaktförbud eller europeisk skyddsorder har sökts (ÅFS 8 § 3).',
  q:'Har kontaktförbud sökts, eller ska det sökas?'},
 {id:'barn',needs:t=>t.violence,src:'afs8',reason:'Ett barn under 15 år ska höras och det påkallar att åklagaren leder förundersökningen (ÅFS 8 § 1).',
  q:'Ska ett barn under 15 år höras?',hint:'Svara ja om åklagaren behöver närvara vid förhöret eller ta ställning till om och hur barnet ska höras.'},
 {id:'psyk',needs:t=>t.suspect&&!t.finesOnly,src:'afs8',reason:'Den misstänktes psykiska status kan antas avvika påtagligt från det normala (ÅFS 8 § 2).',
  q:'Avviker den misstänktes psykiska status påtagligt från det normala?'},
 {id:'tvm',needs:()=>true,src:'afs8',reason:'Tvångsmedel utöver de som polisen får använda i en polisledd förundersökning behövs (ÅFS 8 § 4).',
  q:'Behövs något annat tvångsmedel än dessa?',items:g=>['Beslag','Kroppsvisitation','Kroppsbesiktning','Fotografering och fingeravtryck','Avspärrning','Husrannsakan av mindre omfattning'].concat(g?['Gripandet och ett eventuellt anhållande']:[]).map(text=>({text}))},
 {id:'svar',needs:()=>true,src:'afs7',reason:'Brottet är svårbedömt eller utredningen kräver åklagarens ledning (ÅFS 7 och 11 §§).',
  q:'Gäller något av följande?',items:(g,tr)=>SVAR_ITEMS.filter(i=>!i.only||tr[i.only])}
];
/* Trafikbrott som förordning (2014:1106) undantar (3 § och 5 §): TBL 1 § första stycket och 2 §, endast böter. */
const SU_EXEMPT=new Set(['traffic16-0','traffic16-2']);

function Q(id,c,k,tr,ans){
 const q=Q0(id,c,k,tr,ans);const i=INFO[id];
 if(i)q.info={t:i.t.concat(i.gripen&&ans.gripen?[i.gripen]:[]),src:i.src};
 return q;
}
function Q0(id,c,k,tr,ans){
 const t=TAKEOVER.find(x=>x.id===id);
 if(t)return {id,kind:'yn',text:t.q,hint:t.hint||'',items:t.items?t.items(!!ans.gripen,{...tr,suspect:!!(ans.gripen||ans.misstankt)}):null};
 switch(id){
  case 'gripen':return {id,kind:'yn',text:'Är någon gripen?'};
  case 'misstankt':return {id,kind:'yn',text:'Är någon skäligen misstänkt?'};
  case 'pol':return {id,kind:'yn',text:'Är den misstänkte anställd inom polisen, polisstudent, åklagare eller domare?',hint:'Även uppdragstagare som arbetar under ledning av en polisman och vissa andra offentliga befattningshavare.'};
  case 'polTjanst':return {id,kind:'yn',text:'Har brottet samband med den misstänktes anställning?'};
  case 'villkor':return {id,kind:'yn',text:k.cond.q,hint:k.cond.hint||''};
  case 'narstaende':return {id,kind:'yn',text:'Har brottet riktats mot en närstående eller tidigare närstående, med våld eller hot om våld?',hint:'Till exempel make, sambo, partner, tidigare partner, barn eller förälder (som i BrB 4:4 a).'};
  case 'mal18':return {id,kind:'yn',text:'Är målsäganden under 18 år?'};
  case 'ung':return {id,kind:'yn',text:'Är den gripne under 18 år, eller kan vara det?'};
  case 'forsvarare':return {id,kind:'yn',text:'Vill den gripne ha en försvarare, eller bedömer du att en försvarare behövs?'};
 }
}

/* Kärnan: ger nästa fråga eller resultatet. Rena funktioner, all hopplogik här. */
function assess(c,ans={}){
 const k=classify(c);if(!k)return {unsupported:true};
 const tr=traits(c),src=new Set(),reasons=[],notes=[];
 const ask=id=>({question:Q(id,c,k,tr,ans),step:Object.keys(ans).length+1});
 if(ans.gripen===undefined)return ask('gripen');
 if(!ans.gripen&&ans.misstankt===undefined)return ask('misstankt');
 const suspect=!!(ans.gripen||ans.misstankt);
 if(k.note)notes.push(k.note);

 // Förordning (2014:1106): ger alltid ett eget resultat (SU och förhör av åklagare eller SU). Frågas därför först.
 if(suspect&&!SU_EXEMPT.has(c.id)){
  if(ans.pol===undefined)return ask('pol');
  let su=ans.pol;
  if(su&&tr.finesOnly){ // 5 §: bötesbrott utan samband med anställningen omfattas inte.
   if(ans.polTjanst===undefined)return ask('polTjanst');
   if(!ans.polTjanst){su=false;notes.push('Förordning (2014:1106) gäller inte bötesbrott utan samband med anställningen när polisen utfärdar ordningsbot eller inleder förundersökning (5 §). Ett beslut att lägga ned en sådan förundersökning fattas av åklagare.');src.add('afs5');}
  }
  if(su){
   src.add('afs5');
   return {result:{lead:'su',leadText:'Åklagarledd – via Avdelningen för särskilda utredningar',
    reasons:['Den misstänkte omfattas av förordning (2014:1106). Ärendet handläggs av Avdelningen för särskilda utredningar (SU) och åklagare (ÅFS 5 §).'],
    when:'Omedelbart',
    whenText:'Lämna ärendet omedelbart till SU, som genast lämnar det vidare till åklagare. Håll inte förhör med den misstänkte själv: förhöret ska hållas av åklagare eller av en polisman vid SU (förordning 2014:1106 9 och 11 §§).'+(ans.gripen?' Gripandet ska skyndsamt anmälas till åklagaren (RB 24:8).':''),
    checklist:false,notes:[...new Set(notes)],sources:[...src,...(ans.gripen?['rb248']:[])].map(s=>SOURCES[s]),classification:k}};
  }
 }

 let enkel=k.cls==='enkel';
 let lead=null; // 'ak' | 'polis' | 'polis-tills'
 if(tr.childSexual){lead='ak';reasons.push('Brottet innefattar en sexuell handling mot ett barn (ÅFS 6 § 2).');src.add('afs6');}
 // Villkoret i bilagan avgör om brottet är enkelt. Det spelar ingen roll om åklagaren redan leder.
 if(!lead&&k.cls==='villkor'){if(ans.villkor===undefined)return ask('villkor');enkel=ans.villkor===k.cond.yes;}
 // ÅFS 6 §: gäller oavsett misstanke. Frågas bara när svaret annars skulle bli polisledning.
 const wouldBePolice=enkel||!suspect;
 if(!lead&&tr.violence&&wouldBePolice){
  if(ans.narstaende===undefined)return ask('narstaende');
  if(ans.narstaende){lead='ak';reasons.push('Brottet innefattar våld eller hot om våld mot en närstående (ÅFS 6 § 1).');src.add('afs6');}
 }
 if(!lead&&tr.sexual&&!suspect){
  if(ans.mal18===undefined)return ask('mal18');
  if(ans.mal18){lead='ak';reasons.push('Brottet innefattar en sexuell handling mot någon under 18 år (ÅFS 6 § 2).');src.add('afs6');}
 }
 if(!lead&&suspect&&!enkel){
  lead='ak';reasons.push(k.cls==='villkor'?'Villkoret i bilagan är inte uppfyllt, så brottet är inte av enkel beskaffenhet, och någon är skäligen misstänkt (RB 23:3).':'Brottet är inte av enkel beskaffenhet och någon är skäligen misstänkt (RB 23:3).');src.add('rb233');src.add('afs4');
 }
 // ÅFS 7 och 8 §§: en fråga i taget, bara så länge förundersökningen annars skulle ledas av polis.
 if(!lead){
  const ctx={...tr,suspect};
  for(const t of TAKEOVER){
   if(!t.needs(ctx))continue;
   if(ans[t.id]===undefined)return ask(t.id);
   if(ans[t.id]){lead='ak';reasons.push(t.reason);src.add(t.src);if(t.id==='svar')src.add('afs11');break;}
  }
 }
 if(!lead){
  if(enkel){lead='polis';reasons.push((suspect?'Brottet är av enkel beskaffenhet ('+k.row+') och inget undantag gäller':'Brottet är av enkel beskaffenhet ('+k.row+') och ingen är skäligen misstänkt')+' (ÅFS 4 §).');src.add('afs4');}
  else{lead='polis-tills';reasons.push('Brottet är inte av enkel beskaffenhet, men ingen är skäligen misstänkt ännu. Åklagaren tar över när någon blir skäligen misstänkt (RB 23:3).');src.add('rb233');}
 }

 // ---- Åklagarkontakt ----
 let when,whenText,check=false;
 if(lead==='ak'){
  check=true;
  if(ans.gripen){when='Före förhöret';whenText='Kontakta åklagaren före förhöret med den gripne. Åklagaren leder förundersökningen och tar ställning till försvarare och till förhörets omfattning.';src.add('rar17');src.add('overens');}
  else if(suspect){when='Snarast';whenText='Överlämna till åklagaren snarast och alltid före förhör med den misstänkte.';src.add('rar17');}
  else{when='Snarast';whenText='Överlämna till åklagaren snarast. Åklagaren leder förundersökningen även om ingen är misstänkt.';}
 }else if(lead==='polis-tills'){
  if(tr.min4){check=true;when='Genast';whenText='Underrätta åklagaren genast. Brottet har minimistraff fängelse fyra år eller mer (ÅFS 10 §). Åklagaren beslutar om ledningen ska tas över redan nu.';src.add('afs10');}
  else{when='När någon blir misstänkt';whenText='Ingen åklagarkontakt behövs nu. Kontakta åklagaren så snart någon blir skäligen misstänkt.';src.add('rb233');}
 }else if(ans.gripen){
  if(ans.ung===undefined)return ask('ung');
  if(ans.ung){check=true;when='Före förhöret';whenText='Kontakta åklagaren före förhöret. Den gripne är eller kan vara under 18 år.';src.add('overens');src.add('rar06');src.add('lul');}
  else{
   if(ans.forsvarare===undefined)return ask('forsvarare');
   check=true;
   if(ans.forsvarare){when='Före förhöret';whenText='Kontakta åklagaren före förhöret för beslut i försvararfrågan.';src.add('overens');}
   else{when='Efter förhöret';whenText='Håll förhöret så snart som möjligt och anmäl därefter gripandet skyndsamt till åklagaren, som beslutar om anhållande. Polisen får häva gripandet innan åklagaren underrättats, om det är uppenbart att skäl för fortsatt frihetsberövande saknas.';src.add('overens');src.add('rar17');}
  }
  src.add('rb248');
  notes.push('Anhåller åklagaren den gripne tar åklagaren över ledningen av förundersökningen (ÅFS 8 § 4).');src.add('afs8');
 }else{
  when='Ingen kontakt nu';whenText='Ingen åklagarkontakt behövs nu. Polisen leder förundersökningen.';
 }
 if(ans.gripen&&ans.ung!==false){
  notes.push((ans.ung?'':'Om den gripne är under 18 år: ')+'Försvarare ska i nästan alla fall närvara vid förhör i sak med en ung misstänkt. Kan försvarare inte komma hålls bara ett delgivningsförhör (RåR 2006:3).');src.add('rar06');
 }
 if(lead==='polis'&&suspect&&!ans.gripen)notes.push('Om den misstänkte är under 18 år: åklagaren ska hållas underrättad om förundersökningen (FUK 2 §) och undersökningsledaren ska vara förordnad för unga (LUL 2 §).'),src.add('fuk2'),src.add('lul');
 if(lead==='polis'||lead==='polis-tills')notes.push('Uppstår senare någon av omständigheterna i ÅFS 6–8 §§, till exempel att kontaktförbud söks eller att andra tvångsmedel behövs, tar åklagaren över.');
 const leadText={ak:'Åklagarledd',polis:'Polisledd','polis-tills':'Polisledd tills vidare'}[lead];
 return {result:{lead,leadText,reasons,when,whenText,checklist:check,notes:[...new Set(notes)],sources:[...src].map(s=>SOURCES[s]),classification:k}};
}

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

/* Gränssnitt: renderar en skärm som HTML. Händelser hanteras via data-fu18-attribut. */
function render(c,ans){
 const r=assess(c,ans);
 if(r.unsupported)return '<p>Verktyget finns inte för förstadier ännu.</p>';
 const back=Object.keys(ans).length?'<button type="button" class="fu18-back" data-fu18="back">← Föregående fråga</button>':'';
 if(r.question){
  const q=r.question;
  const infoBox=(i)=>'<div class="fu18-info">'+i.t.map(p=>'<p>'+esc(p)+'</p>').join('')+'<p class="fu18-info-src">'+esc(i.src)+'</p></div>';
  const items=!q.items?'':q.items.some(it=>it.t)?'<ul class="fu18-items">'+q.items.map(it=>'<li><details class="fu18-item"><summary><span>'+esc(it.text)+'</span><span class="fu18-i" aria-label="Förklaring">i</span></summary>'+infoBox(it)+'</details></li>').join('')+'</ul>'
   :'<ul class="fu18-plain">'+q.items.map(it=>'<li>'+esc(it.text)+'</li>').join('')+'</ul>';
  const help=q.info?'<details class="fu18-help"><summary><span class="fu18-i" aria-hidden="true">i</span>Förklaring</summary>'+infoBox(q.info)+'</details>':'';
  const body='<div class="fu18-yn"><button type="button" class="fu18-btn" data-fu18="yes">Ja</button><button type="button" class="fu18-btn" data-fu18="no">Nej</button></div>';
  return '<div class="fu18" data-fu18-q="'+esc(q.id)+'"><p class="fu18-step">Fråga '+r.step+'</p><p class="fu18-q">'+esc(q.text)+'</p>'+(q.hint?'<p class="fu18-hint">'+esc(q.hint)+'</p>':'')+items+help+body+back+'</div>';
 }
 const x=r.result;
 const checklist=x.checklist?'<div class="fu18-check"><strong>Inför kontakten</strong><ul><li>Registrera brottsmisstanken och gör elektronisk lottning.</li><li>Kör MR/BR.</li><li>Var påläst om vilka beslut och tvångsmedel som redan har verkställts.</li></ul></div>':'';
 const src=x.sources.map(s=>'<div class="fu18-src"><strong>'+esc(s.label)+'</strong><p>'+esc(s.quote).replace(/\n/g,'</p><p>')+'</p><a class="source-link" href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">Öppna källan</a></div>').join('');
 return '<div class="fu18 fu18-result" data-fu18-lead="'+esc(x.lead)+'">'+
  '<div class="fu18-row '+(x.lead==='ak'||x.lead==='su'?'ak':'pol')+'"><small>FÖRUNDERSÖKNINGSLEDARE</small><strong>'+esc(x.leadText)+'</strong><p>'+x.reasons.map(esc).join(' ')+'</p></div>'+
  '<div class="fu18-row when"><small>ÅKLAGARKONTAKT</small><strong>'+esc(x.when)+'</strong><p>'+esc(x.whenText)+'</p></div>'+
  checklist+
  (x.notes.length?'<ul class="fu18-notes">'+x.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>':'')+
  '<details class="pros171-more"><summary>Källor</summary>'+src+'<p class="source-label">ÅFS 2005:9 kontrollerad mot Åklagarmyndighetens regelförteckning 2026-09-30. Riktlinjer återges i sammanfattning.</p></details>'+
  '<div class="fu18-end">'+back+'<button type="button" class="fu18-btn fu18-restart" data-fu18="restart">Börja om</button></div></div>';
}

window.BK_FU18={release:'1.8.2',classify,traits,assess,render,TAKEOVER,INFO,SVAR_ITEMS,SOURCES,ENKEL,VILLKOR};
})();
