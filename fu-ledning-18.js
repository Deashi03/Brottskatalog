/* Brottskatalog 1.8 – FU-ledning och åklagarkontakt.
 * Ger två konkreta svar för det öppna brottet:
 *   1. Leds förundersökningen av åklagare eller av polisiär förundersökningsledare?
 *   2. När ska åklagaren kontaktas?
 * Källor (kontrollerade 2026-11-03):
 *  - RB 23:3 och 24:8 (data.riksdagen.se, RB t.o.m. SFS 2026:1657).
 *  - ÅFS 2005:9, konsoliderad, senast ändrad ÅFS 2019:2. Regelförteckningen 2026-09-30 visar
 *    att ingen senare ändring finns. Bilagan är likalydande med Polisens PM 2019:11.
 *    Kontrollerad på nytt 2026-11-14 mot den konsoliderade versionen på aklagare.se: senast ändrad genom ÅFS 2019:2.
 *  - Överenskommelse ÅM2017-2028 (Polisens PM 2018:5) om åklagarkontakt inför förhör med gripen.
 *  - RåR 2017:3 (konsoliderad 2020-09-01) och RåR 2006:3 (konsoliderad 2026-09-10).
 *  - LUL 2 och 24 §§, FUK 2 §, förordning (2014:1106), BrB 1:6 (SFS 2026:1528).
 * Från 2.0 ärver straffbara förstadier klassningen från det fullbordade brottet.
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
 rb233:{label:'Rättegångsbalken 23 kap. 3 §',url:RB,quote:'Om förundersökningen har inletts av Polismyndigheten eller Säkerhetspolisen och saken inte är av enkel beskaffenhet, ska ledningen av förundersökningen om brottet övertas av åklagaren, så snart någon skäligen kan misstänkas för brottet. Åklagaren ska också i annat fall överta ledningen när det är motiverat av särskilda skäl.'},
 rb248:{label:'Rättegångsbalken 24 kap. 8 § andra och tredje styckena',url:RB,quote:'Har någon gripits enligt 7 §, ska han eller hon så snart som möjligt förhöras av en åklagare eller av en polisman eller annan anställd vid Polismyndigheten eller Ekobrottsmyndigheten som myndigheten har utsett. Har åklagaren inte redan underrättats om frihetsberövandet, ska det skyndsamt anmälas till honom eller henne. Åklagaren ska efter förhöret omedelbart besluta om den misstänkte ska anhållas. Anhålls inte den misstänkte, ska åklagaren omedelbart häva beslutet om gripande.\nInnan åklagaren har underrättats om frihetsberövandet, får beslutet om gripande hävas av Polismyndigheten, om det är uppenbart att det inte finns skäl för fortsatt frihetsberövande.'},
 afs4:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 4 § och bilagan',url:AFS,quote:'Brott som tagits upp i bilagan ska som regel anses vara av enkel beskaffenhet. Förundersökningen ska då, med undantagen i 5–8 §§, ledas av Polismyndigheten.'},
 afs5:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 5 § och förordning (2014:1106) 2–11 §§',url:F1106,quote:'Förundersökning mot anställd inom polisen ska i allmänhet ledas av åklagare. Ärenden om brott av anställda inom polisen, polisstudenter och vissa uppdragstagare ska omedelbart lämnas över till Avdelningen för särskilda utredningar, som genast lämnar ärendet vidare till åklagare. Förhör med den misstänkte ska hållas av åklagare eller polisman vid Avdelningen för särskilda utredningar. Förordningen gäller också ärenden om brott av åklagare, domare och vissa andra befattningshavare. Undantag: vissa trafikbrott (3 §) och brott med endast böter utan samband med anställningen (5 §), när polisen utfärdar ordningsbot eller inleder förundersökning.'},
 afs6:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 6 §',url:AFS,quote:'Oavsett om någon är skäligen misstänkt eller inte ska åklagare leda förundersökningen när 1. brottet innefattar våld eller hot om våld mot närstående eller tidigare närstående person eller 2. brottet innefattar en sexuell handling mot någon som är under arton år. Har Polismyndigheten inlett förundersökning ska den snarast överlämnas till åklagaren. (Närstående: som i BrB 4:4 a. Sexuell handling avser inte gärning enligt BrB 6:10.)'},
 afs7:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 7 §',url:AFS,quote:'Åklagare ska överta ledningen bl.a. när annan domstolsåtgärd än förordnande av offentlig försvarare eller målsägandebiträde krävs, vid internationellt samarbete, vid bevistalan, när brottet är svårbedömt, när någon är skäligen misstänkt för ett brott med straffmaximum fängelse två år eller mer mot målsägandens liv, hälsa, frihet eller frid och målsäganden inte har fyllt 15 år vid anmälan, vid sannolikt motiv enligt BrB 29:2 p. 7 och när talan om företagsbot kan bli aktuell.'},
 afs8:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 8 §',url:AFS,quote:'Åklagare ska också överta ledningen när någon under 15 år ska höras och detta påkallar det, när den misstänktes psykiska status påtagligt kan antas avvika och svårare straff än böter kan följa, när kontaktförbud eller europeisk skyddsorder har sökts, och när annat tvångsmedel enligt RB 24–28 kap. blir aktuellt än mindre husrannsakan, avspärrning, kroppsvisitation, kroppsbesiktning, beslag och fotografi eller fingeravtryck.'},
 afs10:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 10 §',url:AFS,quote:'Kan ingen skäligen misstänkas ska Polismyndigheten genast underrätta åklagare om det är sannolikt att åklagaren tar över ledningen, eller om brottet är av särskilt allvarligt slag: lägst fängelse fyra år samt försök, förberedelse och stämpling till sådant brott.'},
 afs11:{label:'Åklagarmyndighetens föreskrifter (ÅFS 2005:9) 11 §',url:AFS,quote:'Kan förundersökningsbegränsning som ska beslutas av åklagare bli aktuell i en polisledd förundersökning ska ärendet snarast överlämnas till åklagare.'},
 overens:{label:'Överenskommelse mellan Åklagarmyndigheten och Polismyndigheten om åklagarkontakt (ÅM2017-2028, Polisens PM 2018:5)',url:RAR17,quote:'Inför förhör med en gripen kontaktas åklagaren före förhöret om den misstänkte är eller kan vara under 18 år eller om brottet inte är av enkel beskaffenhet. Åklagaren kontaktas också före förhöret om den misstänkte vill ha försvarare eller om polisen bedömer att det finns behov av försvarare. I övriga fall, vid brott av enkel beskaffenhet, kan åklagaren kontaktas efter förhöret.'},
 rar17:{label:'Riksåklagarens riktlinjer RåR 2017:3',url:RAR17,quote:'I åklagarledda förundersökningar ska åklagaren som huvudregel kontaktas innan förhör med den misstänkte hålls, även när den misstänkte är gripen. Förhör med den som gripits för brott av enkel beskaffenhet kan normalt hållas utan att åklagaren först kontaktas.'},
 rar06:{label:'Riksåklagarens riktlinjer RåR 2006:3, kap. 4 och bilaga 2',url:RAR06,quote:'Försvarare ska i nästan alla fall vara närvarande vid förhör i sak med en ung misstänkt. Kan försvarare inte närvara hålls bara ett delgivningsförhör (misstanke och inställning, samt personliga förhållanden som behövs för anhållandefrågan). Åklagaren prövar anhållande och häver gripandet om straffvärdet ligger på bötesnivå.'},
 lul:{label:'Lagen med särskilda bestämmelser om unga lagöverträdare (LUL) 2 och 24 §§',url:LUL,quote:'En förundersökning mot den som inte har fyllt arton år ska ledas av en åklagare eller en anställd vid Polismyndigheten som myndigheten har förordnat. För en misstänkt som inte har fyllt arton år ska en offentlig försvarare förordnas, om det inte är uppenbart att han eller hon saknar behov av försvarare.'},
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
/* 1.9: egna förklaringar för brott som inte är av enkel beskaffenhet (fylls av special-19.js). */
const EJ={};
const LISTED_SPECIAL=/^(TBL|KnivL|BidrBrL|LBE|VapenL|NSL)\b/;
const ch=c=>{const m=String(c.shortRef||'').match(/^BrB (\d+):(\d+\s?[a-z]?)/);return m?{ch:Number(m[1]),p:m[2].replace(/\s/g,'')}:null;};
const max=c=>Number(c.penaltyRange?.max);
const min=c=>Number(c.penaltyRange?.min);

/* 2.0: förstadier ärver klassningen från det fullbordade brottet. Ett brott som är åklagarlett som
 * fullbordat är åklagarlett också som försök, förberedelse eller stämpling, och ett brott i bilagan är
 * polislett också som förstadium. Falska förstadiekort (ej straffbara) klassas inte. */
const STAGE_WORD={forsok:'Försök',forberedelse:'Förberedelse',stampling:'Stämpling'};
function classify(c){
 if(!c)return null;
 if(c.stageType){
  if(c.stageStatus!=='punishable'||!c.fuParent20)return null;
  const k=classify(c.fuParent20);if(!k)return null;
  return {...k,row:STAGE_WORD[c.stageType]+' till: '+k.row,stage:true};
 }
 if(ENKEL[c.id])return {...ENKEL[c.id]};
 if(VILLKOR[c.id])return {...VILLKOR[c.id],cond:{...VILLKOR[c.id].cond}};
 if(EJ[c.id])return {...EJ[c.id]};
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
  // ÅFS 10 §: även försök, förberedelse och stämpling till brott med minst fyra års minimistraff.
  min4:(c.stageType?Number(c.stageParentMin)>=4||!!c.stageParentLife:min(c)>=4||!!c.penaltyRange?.life)
 };
}

/* Förklaringar bakom ⓘ-knapparna, skrivna med egna ord för polisen på plats.
 * Rader som börjar med "• " visas som punktlista, rader som börjar med "## " som underrubrik. */
const AFS_NAME='Åklagarmyndighetens föreskrifter om ledning av förundersökning (ÅFS 2005:9)';
const F1106_NAME='Förordning (2014:1106) om handläggning av ärenden om brott av anställda inom polisen och vissa andra befattningshavare';
const INFO={
 misstankt:{t:['"Skäligen misstänkt" är en misstankegrad. Den är uppnådd när det finns konkreta omständigheter som med viss styrka pekar på att just den personen har begått brottet, till exempel vittnesuppgifter, bilder, spår eller att personen påträffas på platsen. En känsla, ett rykte eller ett allmänt tips räcker inte.','## Varför frågan spelar roll','Är brottet inte av enkel beskaffenhet tar åklagaren över ledningen så snart någon är skäligen misstänkt. Innan dess leder polisen.'],src:'Rättegångsbalken 23 kap. 3 §. Misstankegraden är inte definierad i lag utan i praxis och doktrin.'},
 pol:{t:['Brott av vissa personer utreds inte av den vanliga polisen. De utreds av Polismyndighetens Avdelning för särskilda utredningar (SU) tillsammans med en åklagare. Det gäller enligt '+F1106_NAME+'.','## Svara ja om den misstänkte är','• anställd inom polisen, även civilanställd,','• polisstudent eller antagen till polisutbildningen,','• uppdragstagare som på särskilt förordnande arbetar för Polismyndigheten under ledning av en polis,','• åklagare, domare eller vissa andra offentliga befattningshavare vars brott utreds av de särskilt utsedda åklagarna för sådana ärenden.','Det spelar ingen roll om brottet begicks i tjänsten eller på fritiden.','## Undantag','• Brott där bara böter kan följa och som saknar samband med tjänsten. Appen frågar i så fall vidare.','• Vissa mindre trafikbrott, till exempel vårdslöshet i trafik.','Undantagen gäller när polisen utfärdar ordningsbot eller inleder förundersökning.'],src:F1106_NAME+', 2–6 §§'},
 polTjanst:{t:['Brottet har samband med anställningen om det har koppling till arbetet, till exempel om det begicks i tjänsten, vid myndighetsutövning eller med hjälp av information eller befogenheter från jobbet.','• Har det samband med jobbet går ärendet till SU.','• Saknar ett bötesbrott koppling till jobbet utreds det på vanligt sätt. En sådan förundersökning får bara läggas ned av åklagare.'],src:F1106_NAME+', 2, 4 och 5 §§'},
 narstaende:{t:['Gäller brottet våld eller hot om våld mot någon som är eller har varit närstående till gärningspersonen leder åklagaren alltid förundersökningen. Det gäller även om ingen är misstänkt ännu.','## Vem är närstående?','• make, maka, sambo eller partner,','• pojkvän eller flickvän, även om de inte bor ihop, när relationen är nära,','• barn, föräldrar och syskon,','• andra med en nära och förtroendefull relation till gärningspersonen.','Tidigare närstående är till exempel en före detta partner.','## Vad räknas inte?','Andra brott mot en närstående än våld eller hot om våld, till exempel en stöld eller skadegörelse utan hot.'],src:AFS_NAME+', 6 § 1. Närstående har samma betydelse som i brottsbalken 4 kap. 4 a § enligt dess förarbeten.'},
 mal18:{t:['Innefattar brottet en sexuell handling mot någon som är under 18 år leder åklagaren alltid förundersökningen, även om ingen är misstänkt ännu.','Undantag: sexuellt ofredande (brottsbalken 6 kap. 10 §) räknas inte hit.'],src:AFS_NAME+', 6 § 2 med allmänna råd'},
 mal15:{t:['Åklagaren tar över så snart någon är skäligen misstänkt om alla tre villkoren är uppfyllda:','• målsäganden var under 15 år när brottet anmäldes,','• brottet riktade sig mot målsägandens liv, hälsa, frihet eller frid, till exempel misshandel eller olaga hot,','• brottet kan ge fängelse i två år eller mer.','Undantag: är även den misstänkte under 15 år leder polisen, om inte något annat skäl gör att åklagaren ska leda. Svara då nej.'],src:AFS_NAME+', 1 och 7 §§'},
 hat:{t:['Ett hatbrottsmotiv finns när ett av motiven för brottet är att kränka någon på grund av ras, hudfärg, nationellt eller etniskt ursprung, trosbekännelse, sexuell läggning, kön, könsidentitet eller könsuttryck eller liknande. Det behöver inte vara det enda motivet. Det räcker att motivet är sannolikt.','## Tecken som kan tala för det','• kränkande uttalanden om målsägandens grupp före, under eller efter brottet,','• symboler, klotter eller annat material som pekar på motivet,','• att målsäganden verkar ha valts ut på grund av sin tillhörighet,','• att målsäganden själv uppfattar brottet så.'],src:AFS_NAME+', 7 § 6; brottsbalken 29 kap. 2 § 7'},
 kf:{t:['Ett kontaktförbud förbjuder en person att besöka, kontakta eller följa efter någon annan. Åklagaren beslutar om kontaktförbud. Målsäganden kan ansöka om det, eller så tar polis eller åklagare upp frågan.','## När kan det bli aktuellt?','Kontaktförbud kan beslutas när det finns risk att personen kommer att begå brott mot, förfölja eller allvarligt trakassera den andra. Typfall:','• hot eller våld mot en nuvarande eller tidigare partner,','• upprepade trakasserier eller förföljelse.','Har en ansökan gjorts, eller vill målsäganden ansöka, tar åklagaren över ledningen. Detsamma gäller en ansökan om europeisk skyddsorder.'],src:AFS_NAME+', 8 § 3; lag (1988:688) om kontaktförbud 1 §'},
 barn:{t:['Ska ett barn under 15 år höras, som målsägande eller vittne, tar åklagaren över om åklagaren behöver:','• vara med vid förhöret,','• ta ställning till hur förhöret ska gå till, eller','• ta ställning till om barnet över huvud taget ska höras.','Typfall: ett barn som har sett eller hört våld i hemmet, eller som själv har utsatts.'],src:AFS_NAME+', 8 § 1 med allmänna råd'},
 psyk:{t:['Finns det tecken på att den misstänkte har en påtaglig psykisk avvikelse, och brottet kan ge mer än böter, tar åklagaren över.','## Tecken som kan tala för det','• tydlig förvirring, vanföreställningar eller hallucinationer,','• mycket avvikande beteende som inte förklaras av berusning,','• känd allvarlig psykisk sjukdom.','Föreskriften anger inga närmare kriterier. Är du osäker, kontakta åklagaren.'],src:AFS_NAME+', 8 § 2'},
 tvm:{t:['Polisen får leda förundersökningen så länge bara de vanliga tvångsmedlen i listan behövs. Behövs något mer tar åklagaren över.','## Exempel på tvångsmedel som gör att åklagaren tar över','• husrannsakan av större omfattning,','• reseförbud,','• kvarstad,','• hemliga tvångsmedel, till exempel avlyssning eller övervakning av telefon.','Föreskriften anger inte exakt var gränsen går för en husrannsakan av större omfattning. Är du osäker, kontakta åklagaren.'],gripen:'Den gripne: åklagaren prövar anhållande när gripandet anmäls. Anhålls den gripne tar åklagaren över ledningen.',src:AFS_NAME+', 8 § 4'},
 ung:{t:['Är den gripne under 18 år ska åklagaren alltid kontaktas före förhöret.','En misstänkt under 18 år ska nästan alltid få en offentlig försvarare.','Är du osäker på åldern, svara ja.'],src:'Överenskommelse mellan Åklagarmyndigheten och Polismyndigheten om åklagarkontakt (ÅM2017-2028, Polisens PM 2018:5); lag (1964:167) med särskilda bestämmelser om unga lagöverträdare 24 §'},
 forsvarare:{t:['Kontakta åklagaren före förhöret om den gripne vill ha en försvarare, eller om du bedömer att en försvarare behövs. Åklagaren tar då ställning till försvararfrågan innan förhöret hålls.','## En offentlig försvarare ska enligt lag förordnas bland annat när','• den misstänkte begär det och brottet har ett minimistraff på minst sex månaders fängelse,','• den misstänkte behöver försvarare för att utredningen är komplicerad,','• påföljdsvalet är tveksamt och det kan bli fråga om strängare påföljd än böter eller villkorlig dom,','• det finns särskilda skäl i den misstänktes personliga förhållanden, till exempel språksvårigheter, psykisk ohälsa eller missbruk, eller i vad målet gäller.','Blir den gripne anhållen ska offentlig försvarare förordnas om han eller hon begär det.'],src:'Rättegångsbalken 21 kap. 3 a §; överenskommelse mellan Åklagarmyndigheten och Polismyndigheten om åklagarkontakt (ÅM2017-2028, Polisens PM 2018:5)'}
};
/* Punkterna i frågan om svårbedömt eller ovanligt. Var och en har en egen förklaring. */
const SVAR_ITEMS=[
 {text:'Internationellt samarbete',t:['Åklagaren tar över om något i utredningen behöver göras i ett annat land, eller tillsammans med myndigheter i ett annat land.','## Det kan bli aktuellt om','• den misstänkte har lämnat Sverige, eller är på väg att lämna, och behöver hämtas tillbaka (utlämning eller europeisk arresteringsorder),','• bevis eller vittnen finns i ett annat land, till exempel uppgifter från ett utländskt företag eller en utländsk bank, eller förhör med någon som bor utomlands,','• pengar eller egendom från brottet finns i ett annat land och behöver säkras,','• den misstänkte bor utomlands och lagföringen kan behöva flyttas till det landet,','• brottsligheten är gränsöverskridande och polis eller åklagare i ett annat land behöver samordna med svensk åklagare.','Att den misstänkte eller målsäganden är utländsk medborgare räcker inte. Det avgörande är om någon åtgärd behöver vidtas utomlands.'],src:AFS_NAME+', 7 § 2 med allmänna råd'},
 {text:'En domstolsåtgärd behövs, t.ex. särskild företrädare för barn eller sakkunnig',t:['Vissa beslut under förundersökningen fattas av domstol. Behövs något annat sådant beslut än att förordna en offentlig försvarare eller ett målsägandebiträde tar åklagaren över.','## Det kan bli aktuellt om','• en särskild företrädare för barn behövs. Det gäller när ett barn under 18 år har utsatts för ett brott som kan ge fängelse och en vårdnadshavare är misstänkt, eller kan antas inte ta tillvara barnets rätt på grund av sitt förhållande till den misstänkte. Företrädaren kan då samtycka till att barnet hörs och undersöks i stället för vårdnadshavaren.','• domstolen behöver utse en sakkunnig.','Att en offentlig försvarare eller ett målsägandebiträde ska förordnas gör inte i sig att åklagaren tar över.'],src:AFS_NAME+', 7 § 1; lag (1999:997) om särskild företrädare för barn 1 §'},
 {text:'Bevistalan',only:'min4',t:['Bevistalan betyder att åklagaren ber domstolen pröva om ett barn har begått ett brott, trots att barnet inte kan dömas till straff.','## Det kan bli aktuellt om','• den misstänkte var under 15 år när brottet begicks, och','• brottet har ett minimistraff på minst fyra års fängelse, till exempel mord, dråp, grovt rån eller grov våldtäkt, eller är försök, förberedelse eller stämpling till ett sådant brott.'],src:AFS_NAME+', 7 § 3; lag (1964:167) med särskilda bestämmelser om unga lagöverträdare 38 §'},
 {text:'Företagsbot',t:['Företagsbot är ett bötesstraff för ett företag, alltså inte för en person, när ett brott har begåtts i företagets verksamhet.','## Det kan bli aktuellt om','• brottet har begåtts i en näringsverksamhet eller annan verksamhet som ett företag bedriver, till exempel arbetsmiljöbrott, miljöbrott eller brott för att företaget ska tjäna pengar,','• brottet kan ge strängare straff än penningböter, och','• företaget inte har gjort tillräckligt för att förebygga brottet, eller brottet har begåtts av någon i ledande ställning eller med ansvar för tillsyn eller kontroll.','Företagsbot gäller inte brott som riktats mot företaget självt.'],src:AFS_NAME+', 7 § 7; brottsbalken 36 kap. 23 §'},
 {text:'Förundersökningsbegränsning som åklagaren beslutar om',t:['Förundersökningsbegränsning betyder att en utredning läggs ned, eller inte inleds, trots att brottet kanske kan utredas, eftersom det inte är rimligt att fortsätta.','Polisen får själv besluta om det i vissa fall. Kan det bli aktuellt i ett fall där åklagaren ska besluta, ska ärendet snarast till åklagaren.','## Åklagaren beslutar till exempel när','• fortsatt utredning skulle kosta orimligt mycket i förhållande till brottet och straffvärdet kan antas vara högst fängelse tre månader,','• det kan bli aktuellt med åtalsunderlåtelse av andra skäl än dem polisen själv får tillämpa.'],src:AFS_NAME+', 11 §; rättegångsbalken 23 kap. 4 a §'},
 {text:'Brottet är svårbedömt',t:['Åklagaren tar över om brottet är juridiskt svårt att bedöma, eller om utredningen av annat skäl kräver att åklagaren leder den. Det finns ingen fast lista.','## Exempel','• ekonomisk brottslighet,','• svårbedömda brott utanför brottsbalken, till exempel miljöbrott,','• fall där det är oklart om gärningen alls är brottslig, eller vilket brott det är.'],src:AFS_NAME+', 7 § 4 och allmänna råd till 10 §'},
 {text:'Den misstänkte är under 18 år och utredningen gäller flera brott eller flera misstänkta',only:'suspect',t:['Är den misstänkte under 18 år och utredningen gäller många brott eller många misstänkta bör åklagaren leda den.','Detsamma gäller när utredningen gäller fler än ett brott eller fler än en misstänkt och man behöver avgöra om brotten ska utredas och lagföras i omgångar eller tillsammans.'],src:AFS_NAME+', 7 § 4, allmänna råd'}
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
  // 1.8.4: förklara att gripandet inte i sig gör förundersökningen åklagarledd.
  reasons.push('Att någon är gripen gör inte förundersökningen åklagarledd. Gripandet ska anmälas till åklagaren, som beslutar om anhållande (RB 24:8). Anhåller åklagaren den gripne tar åklagaren över ledningen.');
  if(ans.ung){reasons.push('Att den gripne är eller kan vara under 18 år ändrar inte heller vem som leder. Förundersökningen kan vara polisledd, men undersökningsledaren ska vara särskilt förordnad för unga (LUL 2 §).');src.add('lul');}
 }else{
  when='Ingen kontakt nu';whenText='Ingen åklagarkontakt behövs nu. Polisen leder förundersökningen.';
 }
 if(ans.gripen&&ans.ung!==false){
  notes.push((ans.ung?'':'Om den gripne är under 18 år: ')+'Försvarare ska i nästan alla fall närvara vid förhör i sak med en ung misstänkt. Kan försvarare inte komma hålls bara ett delgivningsförhör (RåR 2006:3).');src.add('rar06');
 }
 if(lead==='polis'&&suspect&&!ans.gripen)notes.push('Om den misstänkte är under 18 år: åklagaren ska hållas underrättad om förundersökningen (FUK 2 §) och undersökningsledaren ska vara förordnad för unga (LUL 2 §).'),src.add('fuk2'),src.add('lul');
 // Vad som senare gör att åklagaren tar över (RB 23:3, ÅFS 6–8 §§, förordning 2014:1106). Bara det som kan inträffa för brottet.
 const later=[];
 if(lead==='polis'||lead==='polis-tills'){
  if(lead==='polis-tills')later.push('Någon blir skäligen misstänkt för brottet.');
  if(ans.gripen)later.push('Åklagaren beslutar att anhålla den gripne.');
  if(tr.violence)later.push('Det visar sig att brottet innefattar våld eller hot mot en närstående eller tidigare närstående.');
  if(tr.person)later.push('Kontaktförbud söks.');
  later.push('Det behövs andra tvångsmedel än beslag, kroppsvisitation, kroppsbesiktning, fotografering och fingeravtryck, avspärrning och mindre husrannsakan.');
  if(tr.violence)later.push('Ett barn under 15 år behöver höras.');
  if(tr.hate)later.push('Det framkommer ett sannolikt hatbrottsmotiv.');
  if(!tr.finesOnly)later.push('Den misstänktes psykiska status visar sig avvika påtagligt.');
  later.push('Brottet visar sig vara svårbedömt, eller kräver till exempel internationellt samarbete.');
  if(!suspect&&!SU_EXEMPT.has(c.id))later.push('Den misstänkte visar sig vara polisanställd, åklagare eller domare. Ärendet går då till SU.');
  src.add('afs8');src.add('afs7');
 }
 const leadText={ak:'Åklagarledd',polis:'Polisledd','polis-tills':'Polisledd tills vidare'}[lead];
 return {result:{lead,leadText,reasons,when,whenText,checklist:check,notes:[...new Set(notes)],later,sources:[...src].map(s=>SOURCES[s]),classification:k}};
}

/* Rader med "• " blir punktlista, rader med "## " blir underrubrik. */
function richText(lines){let h='',ul=false;for(const l of lines){if(l.startsWith('• ')){if(!ul){h+='<ul>';ul=true;}h+='<li>'+esc(l.slice(2))+'</li>';continue;}if(ul){h+='</ul>';ul=false;}h+=l.startsWith('## ')?'<p class="fu18-info-h">'+esc(l.slice(3))+'</p>':'<p>'+esc(l)+'</p>';}return h+(ul?'</ul>':'');}
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

/* Gränssnitt: renderar en skärm som HTML. Händelser hanteras via data-fu18-attribut. */
function render(c,ans){
 const r=assess(c,ans);
 if(r.unsupported)return '<p>Verktyget finns inte för förstadier ännu.</p>';
 const back=Object.keys(ans).length?'<button type="button" class="fu18-back" data-fu18="back">← Föregående fråga</button>':'';
 if(r.question){
  const q=r.question;
  const infoBox=(i)=>'<div class="fu18-info">'+richText(i.t)+'<p class="fu18-info-src">Källa: '+esc(i.src)+'</p></div>';
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
  (x.later&&x.later.length?'<div class="fu18-later"><strong>Åklagaren tar över ledningen om</strong><ul>'+x.later.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul></div>':'')+
  (x.notes.length?'<ul class="fu18-notes">'+x.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>':'')+
  '<details class="pros171-more"><summary>Källor</summary>'+src+'<p class="source-label">ÅFS 2005:9 kontrollerad mot Åklagarmyndighetens regelförteckning 2026-09-30. Riktlinjer återges i sammanfattning.</p></details>'+
  '<div class="fu18-end">'+back+'<button type="button" class="fu18-btn fu18-restart" data-fu18="restart">Börja om</button></div></div>';
}

window.BK_FU18={release:'2.1',classify,traits,assess,render,TAKEOVER,INFO,SVAR_ITEMS,SOURCES,ENKEL,VILLKOR,EJ};
})();
