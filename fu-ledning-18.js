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
 afs5:{label:'ÅFS 2005:9 5 § och förordning (2014:1106)',url:F1106,quote:'Förundersökning mot anställd inom polisen ska i allmänhet ledas av åklagare. Ärendet lämnas omedelbart till Avdelningen för särskilda utredningar. Förordningen gäller även åklagare, domare och vissa andra befattningshavare.'},
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
 brb16:{label:'BrB 1:6 andra stycket (SFS 2026:1528, t.o.m. 2031-09-09)',url:'https://data.riksdagen.se/dokument/sfs-1962-700.html',quote:'För brott som någon har begått när han eller hon var fjorton år får det dömas till påföljd om det för brottet inte är föreskrivet lindrigare straff än fängelse i fyra år, eller om det är fråga om försök, förberedelse eller stämpling till sådant brott.'}
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
  finesOnly:max(c)===0,
  min4:min(c)>=4||!!c.penaltyRange?.life
 };
}

/* Rara omständigheter som gör att åklagaren tar över (ÅFS 5, 7, 8 och 11 §§). En skärm, flerval. */
const RARE=[
 {id:'mal15',text:'Målsäganden var under 15 år när brottet anmäldes, och den misstänkte är 15 år eller äldre',src:'afs7',reason:'Brottet riktar sig mot ett barn under 15 år och har straffmaximum två år eller mer (ÅFS 7 § 5).',only:'lhff'},
 {id:'hat',text:'Det finns sannolikt ett hatbrottsmotiv (ras, hudfärg, ursprung, tro, sexuell läggning, kön, könsidentitet m.m.)',src:'afs7',reason:'Det finns sannolikt ett hatbrottsmotiv (ÅFS 7 § 6).',only:'hate'},
 {id:'pol',text:'Den misstänkte är polisanställd, polisstudent, åklagare eller domare',src:'afs5',reason:'Den misstänkte omfattas av förordning (2014:1106). Lämna omedelbart till Avdelningen för särskilda utredningar.'},
 {id:'kf',text:'Kontaktförbud eller europeisk skyddsorder har sökts eller ska sökas',src:'afs8',reason:'Kontaktförbud har sökts (ÅFS 8 § 3).'},
 {id:'tvm',text:'Andra tvångsmedel behövs än gripande, beslag, kroppsvisitation, kroppsbesiktning, foto och fingeravtryck, avspärrning och mindre husrannsakan',src:'afs8',reason:'Andra tvångsmedel blir aktuella (ÅFS 8 § 4).'},
 {id:'barn',text:'Ett barn under 15 år ska höras och åklagaren behöver ta ställning till förhöret',src:'afs8',reason:'Ett barn under 15 år ska höras (ÅFS 8 § 1).'},
 {id:'psyk',text:'Den misstänktes psykiska status avviker påtagligt från det normala',src:'afs8',reason:'Den misstänktes psykiska status avviker påtagligt (ÅFS 8 § 2).',hideIfFines:true},
 {id:'int',text:'Internationellt: utlämning, överlämnande, europeisk utredningsorder, rättslig hjälp eller samordning med annat land',src:'afs7',reason:'Internationellt samarbete kan bli aktuellt (ÅFS 7 § 2).'},
 {id:'dom',text:'Annan domstolsåtgärd än offentlig försvarare eller målsägandebiträde behövs, t.ex. särskild företrädare för barn',src:'afs7',reason:'En domstolsåtgärd behövs (ÅFS 7 § 1).'},
 {id:'bevis',text:'Bevistalan eller företagsbot kan bli aktuellt',src:'afs7',reason:'Bevistalan eller företagsbot kan bli aktuellt (ÅFS 7 § 3 och 7).'},
 {id:'svar',text:'Brottet är svårbedömt eller utredningen omfattande, t.ex. många brott eller misstänkta när den misstänkte är under 18 år',src:'afs7',reason:'Brottet är svårbedömt eller utredningen omfattande (ÅFS 7 § 4).'},
 {id:'fub',text:'Förundersökningsbegränsning som åklagaren beslutar om kan bli aktuell',src:'afs11',reason:'Förundersökningsbegränsning som åklagaren beslutar om kan bli aktuell (ÅFS 11 §).'}
];

/* Frågor. kind: 'yn' (ja/nej), 'pick' (val), 'multi' (flerval). */
function Q(id,c,k,tr){
 switch(id){
  case 'gripen':return {id,kind:'yn',text:'Är någon gripen?'};
  case 'misstankt':return {id,kind:'yn',text:'Finns det någon som är skäligen misstänkt?'};
  case 'villkor':return {id,kind:'yn',text:k.cond.q,hint:k.cond.hint||''};
  case 'narstaende':return {id,kind:'yn',text:'Innefattar brottet våld eller hot om våld mot en närstående eller tidigare närstående?',hint:'Till exempel make, sambo, partner, barn, förälder eller en tidigare partner (som i BrB 4:4 a).'};
  case 'mal18':return {id,kind:'yn',text:'Är målsäganden under 18 år?'};
  case 'rare':return {id,kind:'multi',text:'Gäller något av följande?',options:RARE.filter(o=>!(o.hideIfFines&&tr.finesOnly)&&(!o.only||tr[o.only]))};
  case 'ung':return {id,kind:'yn',text:'Är den gripne under 18 år, eller kan vara det?'};
  case 'forsvarare':return {id,kind:'yn',text:'Vill den gripne ha en försvarare, eller bedömer du att en försvarare behövs?'};
 }
}

/* Kärnan: ger nästa fråga eller resultatet. Rena funktioner, all hopplogik här. */
function assess(c,ans={}){
 const k=classify(c);if(!k)return {unsupported:true};
 const tr=traits(c),src=new Set(),reasons=[],notes=[];
 const ask=id=>({question:Q(id,c,k,tr),step:Object.keys(ans).length+1});
 if(ans.gripen===undefined)return ask('gripen');
 if(!ans.gripen&&ans.misstankt===undefined)return ask('misstankt');
 const suspect=!!(ans.gripen||ans.misstankt);
 let enkel=k.cls==='enkel';
 if(k.cls==='villkor'){if(ans.villkor===undefined)return ask('villkor');enkel=ans.villkor===k.cond.yes;}
 let lead=null; // 'ak' | 'polis' | 'polis-tills'
 // ÅFS 6 §: gäller oavsett misstanke. Frågas bara när svaret annars skulle bli polisledning.
 if(tr.childSexual){lead='ak';reasons.push('Brottet innefattar en sexuell handling mot ett barn (ÅFS 6 § 2).');src.add('afs6');}
 const wouldBePolice=enkel||!suspect;
 if(!lead&&tr.violence&&wouldBePolice){
  if(ans.narstaende===undefined)return ask('narstaende');
  if(ans.narstaende){lead='ak';reasons.push('Brottet innefattar våld eller hot mot en närstående (ÅFS 6 § 1).');src.add('afs6');}
 }
 if(!lead&&tr.sexual&&!suspect){
  if(ans.mal18===undefined)return ask('mal18');
  if(ans.mal18){lead='ak';reasons.push('Brottet innefattar en sexuell handling mot någon under 18 år (ÅFS 6 § 2).');src.add('afs6');}
 }
 if(!lead&&suspect&&!enkel){
  lead='ak';reasons.push(k.cls==='villkor'?'Villkoret i bilagan är inte uppfyllt, så brottet är inte av enkel beskaffenhet, och någon är skäligen misstänkt (RB 23:3).':'Brottet är inte av enkel beskaffenhet och någon är skäligen misstänkt (RB 23:3).');src.add('rb233');src.add('afs4');
 }
 if(!lead&&suspect&&enkel){
  if(!lead){
   if(ans.rare===undefined)return ask('rare');
   const hit=RARE.filter(o=>(ans.rare||[]).includes(o.id));
   if(hit.length){lead='ak';for(const o of hit){reasons.push(o.reason);src.add(o.src);}}
  }
  if(!lead){lead='polis';reasons.push('Brottet är av enkel beskaffenhet ('+k.row+') och inget av undantagen gäller (ÅFS 4 §).');src.add('afs4');}
 }
 if(!lead){ // ingen misstänkt
  if(enkel){lead='polis';reasons.push('Brottet är av enkel beskaffenhet och ingen är skäligen misstänkt.');src.add('afs4');}
  else{lead='polis-tills';reasons.push('Brottet är inte av enkel beskaffenhet, men ingen är skäligen misstänkt ännu. Åklagaren tar över när någon blir skäligen misstänkt (RB 23:3).');src.add('rb233');}
 }
 if(k.note)notes.push(k.note);

 // ---- Åklagarkontakt ----
 let when,whenText,check=false;
 if(lead==='ak'){
  check=true;
  if(ans.gripen){when='Före förhöret';whenText='Kontakta åklagaren före förhöret med den gripne. Åklagaren leder förundersökningen och tar ställning till försvarare och till förhörets omfattning.';src.add('rar17');src.add('overens');}
  else if(suspect){when='Snarast';whenText='Överlämna till åklagaren snarast och alltid före förhör med den misstänkte.';src.add('rar17');}
  else{when='Snarast';whenText='Överlämna till åklagaren snarast. Åklagaren leder förundersökningen även om ingen är misstänkt.';}
 }else if(lead==='polis-tills'){
  if(tr.min4){check=true;when='Genast';whenText='Underrätta åklagaren genast. Brottet har minimistraff fängelse fyra år eller mer (ÅFS 10 §). Åklagaren beslutar om ledningen ska tas över redan nu.';src.add('afs10');}
  else{when='När någon blir misstänkt';whenText='Ingen åklagarkontakt behövs nu. Kontakta åklagaren så snart någon blir skäligen misstänkt. Är det redan nu sannolikt att åklagaren tar över, underrätta genast (ÅFS 10 §).';src.add('afs10');}
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
  notes.push((ans.ung?'':'Är den gripne under 18 år: ')+'Försvarare ska i nästan alla fall närvara vid förhör i sak med en ung misstänkt. Kan försvarare inte komma hålls bara ett delgivningsförhör (RåR 2006:3).');src.add('rar06');
  notes.push('Kan den gripne vara under 15 år? En 14-åring är straffmyndig bara för brott med minimistraff fängelse fyra år eller mer (BrB 1:6), annars inte alls, och gripandet ska då hävas.'+(c.age14Exception15?.status==='minimum-threshold-met'?' Detta brott når gränsen.':' Detta brott når inte gränsen.'));src.add('brb16');
 }
 if(lead==='polis'&&suspect&&!ans.gripen)notes.push('Är den misstänkte under 18 år ska åklagaren hållas underrättad om förundersökningen (FUK 2 §) och undersökningsledaren vara förordnad för unga (LUL 2 §).'),src.add('fuk2'),src.add('lul');
 if(lead==='ak'&&!reasons.some(r=>/2014:1106/.test(r)))notes.push('Är den misstänkte polisanställd, polisstudent, åklagare eller domare lämnas ärendet omedelbart till Avdelningen för särskilda utredningar (förordning 2014:1106).');
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
  let body;
  if(q.kind==='multi')body='<button type="button" class="fu18-btn fu18-none" data-fu18="none">Inget av detta</button>'+
   '<div class="fu18-multi">'+q.options.map(o=>'<label class="fu18-opt"><input type="checkbox" value="'+esc(o.id)+'"><span>'+esc(o.text)+'</span></label>').join('')+'</div>'+
   '<button type="button" class="fu18-btn fu18-go" data-fu18="multi">Fortsätt med markerade</button>';
  else body='<div class="fu18-yn"><button type="button" class="fu18-btn" data-fu18="yes">Ja</button><button type="button" class="fu18-btn" data-fu18="no">Nej</button></div>';
  return '<div class="fu18" data-fu18-q="'+esc(q.id)+'"><p class="fu18-step">Fråga '+r.step+'</p><p class="fu18-q">'+esc(q.text)+'</p>'+(q.hint?'<p class="fu18-hint">'+esc(q.hint)+'</p>':'')+body+back+'</div>';
 }
 const x=r.result;
 const checklist=x.checklist?'<div class="fu18-check"><strong>Inför kontakten</strong><ul><li>Registrera brottsmisstanken och gör elektronisk lottning.</li><li>Kör MR/BR.</li><li>Var påläst om vilka beslut och tvångsmedel som redan har verkställts.</li></ul></div>':'';
 const src=x.sources.map(s=>'<div class="fu18-src"><strong>'+esc(s.label)+'</strong><p>'+esc(s.quote).replace(/\n/g,'</p><p>')+'</p><a class="source-link" href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">Öppna källan</a></div>').join('');
 return '<div class="fu18 fu18-result" data-fu18-lead="'+esc(x.lead)+'">'+
  '<div class="fu18-row '+(x.lead==='ak'?'ak':'pol')+'"><small>FÖRUNDERSÖKNINGSLEDARE</small><strong>'+esc(x.leadText)+'</strong><p>'+x.reasons.map(esc).join(' ')+'</p></div>'+
  '<div class="fu18-row when"><small>ÅKLAGARKONTAKT</small><strong>'+esc(x.when)+'</strong><p>'+esc(x.whenText)+'</p></div>'+
  checklist+
  (x.notes.length?'<ul class="fu18-notes">'+x.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>':'')+
  '<details class="pros171-more"><summary>Källor</summary>'+src+'<p class="source-label">ÅFS 2005:9 kontrollerad mot Åklagarmyndighetens regelförteckning 2026-09-30. Riktlinjer återges i sammanfattning.</p></details>'+
  '<div class="fu18-end">'+back+'<button type="button" class="fu18-btn fu18-restart" data-fu18="restart">Börja om</button></div></div>';
}

window.BK_FU18={release:'1.8',classify,traits,assess,render,RARE,SOURCES,ENKEL,VILLKOR};
})();
