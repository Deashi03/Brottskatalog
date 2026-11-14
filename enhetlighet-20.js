/* Brottskatalog 2.0 – enhetlig presentation och rättningar från granskningen av 1.9.1.
 * Appen anropar apply() på sin brottslista när den startar (efter rubricering-19.js), så att äldre
 * granskningsmoduler arbetar med originaldata.
 *  - Straffskalan skrivs på ett sätt, genererat ur skalans värden.
 *  - Lagrum skrivs på ett sätt: "BrB 8:4 a", "NSL 1 § st. 1 p. 5".
 *  - Kategorierna är sammanslagna.
 *  - Sökord för kort som saknade dem och för vanliga vardagsord.
 *  - Enstaka rättningar (F1, E5, H4, H5 i docs/PLAN-NASTA-UPPDATERING.md).
 */
(()=>{'use strict';
const yr=n=>{const y=Math.floor(n+1e-9),m=Math.round((n-y)*12);
 if(!y)return m===1?'en månad':m+' månader';
 return (y===1?'1 år':y+' år')+(m?' och '+m+' månader':'');};
const yrShort=n=>{const y=Math.floor(n+1e-9),m=Math.round((n-y)*12);
 if(!y)return m+' mån';if(!m)return y+' år';return m===6?y+',5 år':y+' år '+m+' mån';};
const span=(a,b)=>{ // "1–6 år", "6 mån–4 år"
 const A=yrShort(a),B=yrShort(b);
 return /år$/.test(A)&&/år$/.test(B)?A.replace(/ år$/,'')+'–'+B:A+'–'+B;};
/* Bara enkla skalor skrivs om. Texter med villkor (krig, ledare, försvårande omständigheter) lämnas. */
const SIMPLE=/^(böter( eller| –|–)? ?)?(fängelse)?[ ,a-zåäö0-9–\-]*$/i,SPECIAL=/\b(om|när|vid|villkor|beror|se |eller,|ledning|hänvis|dagsböter|penningböter)\b/i;
function penalty(c){
 const r=c.penaltyRange;if(!r||c.stageType||c.conditionalPenalty||c.applicabilityConditional)return;
 const p=String(c.penalty||'');if(!SIMPLE.test(p)||SPECIAL.test(p))return;
 const min=Number(r.min)||0,max=Number(r.max);if(!Number.isFinite(max))return;
 if(max===0){if(/^böter$/i.test(p.trim())){c.penalty='Böter';c.penaltyShort='Böter';}return;}
 const life=r.life?' eller på livstid':'';
 if(r.fines&&min===0){c.penalty='Böter eller fängelse i högst '+yr(max)+life;c.penaltyShort='B–F '+yrShort(max)+(r.life?' / livstid':'');}
 else if(min===0){c.penalty='Fängelse i högst '+yr(max)+life;c.penaltyShort='F '+yrShort(max)+(r.life?' / livstid':'');}
 else{c.penalty='Fängelse i lägst '+yr(min)+' och högst '+yr(max)+life;c.penaltyShort='F '+span(min,max)+(r.life?' / livstid':'');}
}
const ORD={första:'1',andra:'2',tredje:'3',fjärde:'4',femte:'5'};
function ref(c){
 let s=String(c.shortRef||'');if(!s)return;
 const tail=s.includes(' · ')?s.slice(s.indexOf(' · ')):'';if(tail)s=s.slice(0,s.indexOf(' · '));
 s=s.replace(/(\d+:\d+)([a-e])\b/,'$1 $2');                                  // BrB 4:9c → BrB 4:9 c
 s=s.replace(/(första|andra|tredje|fjärde|femte) stycket/g,(m,o)=>'st. '+ORD[o]);
 s=s.replace(/§ (\d) st\. (\d)$/,'§ st. $1 p. $2').replace(/§ (\d) st\.$/,'§ st. $1'); // NSL 1 § 1 st. 1 → NSL 1 § st. 1 p. 1
 s=s.replace(/^(SmuglL|PTBL|SkBrL|BidrBrL|LBE) (\d+(?: [a-z])?)$/,'$1 $2 §');     // SmuglL 6 a → SmuglL 6 a §
 s=s.replace(/^(KnivL \d+) § jfr (\d+) §$/,'$1 § jfr $2 §');
 c.shortRef=s+tail;
}
const CAT={'Allmänfarliga brott':'Allmänfarliga','Liv och hälsa':'Person','Familj':'Person','Egendom':'Skadegörelse',
 'Tjänsteman':'Allmän verksamhet','Krigsmän':'Rikets säkerhet','Explosiva varor':'Vapen och explosiva varor','Vapen':'Vapen och explosiva varor',
 'Narkotika':'Narkotika och alkohol','Alkohol':'Narkotika och alkohol','Skattebrott':'Ekonomisk brottslighet','Bidragsbrott':'Ekonomisk brottslighet'};
const ORDER=['Tillgrepp','Person','Frid','Sexualbrott','Narkotika och alkohol','Trafik','Förmögenhet','Skadegörelse','Vapen och explosiva varor','Allmän ordning','Allmän verksamhet','Urkund','Rättsväsende','Allmänfarliga','Ekonomisk brottslighet','Smuggling','Utlänningsbrott','Djur och natur','Rikets säkerhet'];
/* Sökord: vardagsord som saknades (granskningen 2.7) och kort utan sökord (E4). */
const ALIAS={
 'stold':['bilstöld','cykelstöld','butiksstöld','stöld ur bil'],'grov-stold':['fickstöld','väskryckning','åldringsbrott','stöld från äldre'],
 'ran':['personrån','butiksrån','väskryckning med våld','rån mot butik','ungdomsrån'],'grovt-ran':['värdetransportrån','väpnat rån'],
 'v03-barnpornografibrott':['barnporr','övergreppsmaterial','dokumenterade sexuella övergrepp på barn'],'v03-grovt-barnpornografibrott':['grov barnporr'],
 'v03-urkundsforfalskning':['falskt körkort','falskt pass','falsk legitimation','förfalskat intyg'],'v03-brukande-av-falsk-urkund':['använda falskt körkort','falskt id'],
 'rattfylleri':['drograttfylleri','köra påverkad','alkohol i trafiken','narkotika i blodet'],'grovt-rattfylleri':['grov rattfylla'],
 'v09-brott-mot-tillstandsplikten-for-explosiva-varor':['handgranat','sprängmedel','sprängning','dynamit','bangers','fyrverkerier utan tillstånd'],
 'v09-grovt-brott-mot-tillstandsplikten-for-explosiva-varor':['handgranat grovt','sprängdåd','sprängning'],
 'v03-allmanfarlig-odelaggelse':['sprängning','sprängdåd','detonation'],'v04-grov-allmanfarlig-odelaggelse':['sprängning','sprängdåd'],
 'vapenbrott':['pistol','revolver','olaga vapeninnehav','soft air','pepparspray','elpistol','startpistol'],'knivbrott':['batong','knogjärn','kaststjärna','butterfly','machete'],
 'v03-bokforingsbrott':['målvakt','bulvan','saknad bokföring'],'v09-penningtvattsbrott':['målvakt','låna ut konto','swish åt annan'],
 'bedrageri':['telefonbedrägeri','kortbedrägeri','vishing','blocket','romansbedrägeri','fakturabedrägeri'],'grovt-bedrageri':['åldringsbrott','bedrägeri mot äldre','telefonbedrägeri'],
 'misshandel':['slag','spark','våld i nära relation','misshandel i nära relation','knuff'],'v03-grov-kvinnofridskrankning':['våld i nära relation','misshandel i nära relation'],'v03-grov-fridskrankning':['våld i nära relation'],
 'olovlig-korning':['kört utan körkort','mopedtrimning','trimmad moped','a-traktor utan körkort'],
 'v03-mordbrand':['brand','anlagd brand','bilbrand'],'v03-grov-mordbrand':['brand','anlagd brand'],'skadegorelse':['klotter','vandalisering','krossad ruta','bilbrand'],
 'v19-brott-mot-omradesskydd':['svartbygge vid strand','strandskydd'],
 'v04-sexuellt-ofredande-mot-barn':['blottning inför barn','sexuella meddelanden till barn'],'v04-grovt-sexuellt-ofredande':['grov blottning'],'v04-grovt-sexuellt-ofredande-mot-barn':['grovt ofredande av barn'],
 'v04-grovt-sexuellt-overgrepp-mot-barn':['grovt övergrepp mot barn'],'v04-grovt-utnyttjande-av-barn-for-sexuell-posering':['posering barn grovt','nakenbilder barn'],
 'v04-utnyttjande-av-barn-genom-kop-av-sexuell-handling':['sexköp av barn','köp av sex av minderårig'],'v04-kontakt-for-att-traffa-ett-barn-i-sexuellt-syfte':['gromning','grooming','stämma träff med barn'],
 'v04-grov-manniskoexploatering':['tvångsarbete','tiggeri','arbetskraftsexploatering'],'v04-ringa-utpressning':['utpressning ringa'],'v04-grovt-ocker':['ockerlån','ocker'],
 'v04-utforselhaleri':['stöldgods utomlands','utförsel av stöldgods'],'v04-grovt-utforselhaleri':['stöldgods utomlands grovt'],'v04-foretagskapning':['bolagskapning','kapat bolag'],
 'v04-grovt-fordringsbedrageri':['bluffaktura grovt'],'v04-grovt-olovligt-forfogande':['olovligt förfogande grovt','leasingbil'],'v04-grovt-tagande-av-muta':['mutbrott grovt','korruption'],'v04-grovt-givande-av-muta':['bestickning grovt','korruption'],
 'v04-vardslos-finansiering-av-mutbrott':['finansiering av muta'],'v04-allmanfarlig-vardsloshet':['oaktsam brand','vållande till brand'],'v04-sabotage-mot-blaljusverksamhet':['blåljussabotage','stenkastning mot ambulans','angrepp mot räddningstjänst'],
 'v04-grovt-sabotage-mot-blaljusverksamhet':['grovt blåljussabotage'],'v04-grov-falsk-angivelse':['falsk anmälan grovt'],'v04-ringa-falsk-angivelse':['falsk anmälan ringa'],'v04-obefogad-angivelse':['oaktsam falsk anmälan'],
 'v04-rymning':['rymma från anstalt','avvika från häkte'],'v04-grov-rymning':['fritagning egen','rymning med våld'],'v04-grovt-framjande-av-rymning-eller-flykt':['fritagning','hjälpa intagen att rymma'],
 'v04-grovt-skyddande-av-brottsling':['gömma brottsling','undanröja bevis'],'v04-grovt-gravfridsbrott':['likskändning','gravskändning'],'v04-grovt-brott-mot-tystnadsplikt':['sekretessbrott grovt','läcka uppgifter'],
 'v04-arbetsmiljobrott':['arbetsplatsolycka','arbetsolycka'],'v15-oskuldskontroll':['oskuldskontroll','mödomskontroll'],'v15-intygande-av-sexuell-oskuld':['oskuldsintyg'],
 'v15-uppmaning-till-sjalvmord':['uppmana till självmord','ta livet av dig'],'v15-oaktsam-uppmaning-till-sjalvmord':['självmord oaktsam'],
 'v15-cover-upplopp':['upplopp','kravaller'],'v15-cover-valdsamt-upplopp':['kravaller','stenkastning','huliganer'],'v15-cover-involverande-av-en-underarig-i-brottslighet':['anlita barn för brott','rekrytera unga','springpojke'],
 'v15-cover-myteri':['myteri'],'v15-cover-olaga-valdsskildring':['våldsfilm','sprida våldsvideo'],'v15-cover-otillaten-utlamning-av-teknisk-upptagning':['film till barn'],
 'v15-cover-overtradelse-av-myndighets-bud':['bryta försegling','ta beslagtaget','avspärrning'],'v15-cover-hindrande-av-forrattning':['vägra tillträde','kronofogden'],
 'v15-cover-vapnat-hot-mot-laglig-ordning':['väpnat uppror'],'v15-cover-olovlig-karverksamhet':['privatarmé','milis'],'v15-cover-brott-mot-medborgerlig-frihet':['hot mot politiker','hot mot åsiktsfrihet'],
 'v15-cover-svikande-av-forsvarsplikt':['undandra sig värnplikt'],'v15-cover-hogforraderi':['högförräderi'],'v15-cover-krigsanstiftan':['krigsanstiftan'],
 'v15-cover-troloshet-vid-forhandling-med-frammande-makt':['trolöshet främmande makt'],'v15-cover-egenmaktighet-vid-forhandling-med-frammande-makt':['egenmäktig förhandling'],
 'v15-cover-utlandsspioneri':['spioneri utomlands'],'v15-cover-grovt-utlandsspioneri':['grovt spioneri utomlands'],'v15-cover-grov-obehorig-befattning-med-hemlig-uppgift':['hemliga handlingar'],
 'v15-cover-rojande-av-hemlig-uppgift-i-internationellt-samarbete':['läcka hemlig uppgift','nato'],'v15-cover-olovlig-underrattelseverksamhet-mot-sverige':['spion','underrättelseverksamhet'],
 'v15-cover-olovlig-underrattelseverksamhet-mot-frammande-makt':['spion','underrättelseverksamhet'],'v15-cover-olovlig-underrattelseverksamhet-mot-person':['flyktingspionage','kartläggning av personer'],
 'v15-cover-olovlig-varvning':['värvning till främmande krigstjänst'],'v15-cover-tagande-av-utlandskt-understod':['pengar från främmande makt','påverkansoperation'],
 'v15-family-aktenskapstvang':['tvångsäktenskap','tvångsgifte','hedersbrott'],'v15-family-barnaktenskapsbrott':['barnäktenskap','barngifte'],'v15-family-aktenskapsresebrott':['bortgifte utomlands','vilseledande till äktenskapsresa'],
 'v15-family-aktenskapsresebrott-mot-barn':['bortgifte barn'],'v15-family-samlag-med-avkomling':['incest'],'v15-family-samlag-med-syskon':['incest syskon'],
 'v15-family-osann-utsaga-infor-nordisk-domstol':['mened nordisk domstol'],'v15-family-ovarsam-utsaga-infor-nordisk-domstol':['ovarsam utsaga nordisk'],
 'v15-family-osann-utsaga-infor-en-internationell-domstol':['mened internationell domstol'],'v15-family-ovarsam-utsaga-infor-en-internationell-domstol':['ovarsam utsaga internationell'],
 'v15-additional-forsvarande-av-konkurs-eller-exekutiv-forrattning':['gömma tillgångar för kronofogden','konkursbrott'],'v15-additional-grovt-forsvarande-av-konkurs-eller-exekutiv-forrattning':['konkursbrott grovt'],
 'v15-additional-kapning':['flygkapning','kapa buss','kapa fartyg'],'v15-additional-sjo-eller-luftfartssabotage':['sabotage flygplan','sabotage fartyg'],'v15-additional-flygplatssabotage':['sabotage flygplats','drönare flygplats'],
 'v15-war-lydnadsbrott':['ordervägran i krig'],'v15-war-grovt-lydnadsbrott':['grov ordervägran'],'v15-war-olovlig-avvikelse-av-krigsman':['desertering','rymma från förband'],'v15-war-grov-olovlig-avvikelse-av-krigsman':['grov desertering'],
 'v15-war-vald-eller-hot-mot-forman':['våld mot befäl'],'v15-war-samrore-med-fienden':['fraternisering'],'v15-war-undergravande-av-stridsviljan':['defaitism'],'v15-war-forsummande-av-krigsforberedelse':['försummelse krigsförberedelse'],
 'v15-war-obehorig-kapitulation':['kapitulation'],'v15-war-stridsforsumlighet':['feghet i strid'],'v15-war-tjanstebrott':['tjänstefel krigsman'],'v15-war-landssvek':['landssvek'],'v15-war-landsskadlig-vardsloshet':['oaktsamt landsförräderi'],
 'v15-war-olovlig-befattning-med-kemiska-vapen':['kemvapen','stridsgas','nervgas'],'v15-war-olovlig-befattning-med-minor':['truppminor','landminor'],
 'v15-markesforfalskning':['falska frimärken','falsk kontrollstämpel','falska biljetter'],'v15-forfalskning-av-fast-marke':['flytta gränsmärke','råmärke'],'v15-olaga-spridande-av-efterbildning':['låtsaspengar','reklamsedlar'],
 'v15-beho-righetsmissbrk':['missbruk av fullmakt','behörighetsmissbruk'],'v15-olovligt-brkande':['låna utan lov','använda annans sak'],'v15-grovt-olovligt-brkande':['ockupation','olovlig andrahandsuthyrning'],
 'v15-yndo-rseelse':['hittegods','behålla hittad plånbok'],'v15-inventory-13-9':['oaktsam smittspridning','giftutsläpp oaktsamt'],'v15-inventory-22-1':['landsförräderi'],'v15-inventory-22-5':['ryktesspridning i krig','desinformation'],
 'v15-grov-oredlighet-mot-borgenarer':['konkursbrott','tömma bolag'],'v15-hedersfortryck':['hedersförtryck','hedersrelaterat våld','hederskontroll'],'v15-vardsloshet-hemlig-uppgift':['tappa hemlig handling']
};
const TITLE={'v09-olovlig-inforsel-eller-utforsel':'Olovlig införsel eller olovlig utförsel'};
const EMPTY_NOTE=/^(Straffskala enligt brottsbalkens konsoliderade bestämmelse\.|Straffskalans grad enligt aktuell paragraf\.|Böter eller fängelse enligt angiven straffskala\.|Straffskala enligt (Lag|Skattebrottslag|Bidragsbrottslag)[^.]*\.|(Böter – f|F)ängelse [^.]*)$/;
function apply(c){
 if(c.id==='v15-cover-hindrande-av-forrattning'){c.penalty='Böter';c.penaltyShort='Böter';c.penaltyNote='';}
 if(TITLE[c.id]&&c.title!==TITLE[c.id]){(c.aliases=c.aliases||[]).push(c.title);c.title=TITLE[c.id];}
 penalty(c);ref(c);
 if(CAT[c.category])c.category=CAT[c.category];
 const add=ALIAS[c.id]||(c.stageType?null:null);
 if(add){c.aliases=Array.isArray(c.aliases)?c.aliases:[];for(const a of add)if(!c.aliases.includes(a))c.aliases.push(a);}
 if(typeof c.penaltyNote==='string'&&EMPTY_NOTE.test(c.penaltyNote.trim()))c.penaltyNote='';
 if(typeof c.law==='string'&&/[a-zåäö]-\s*\n\s*[a-zåäö]/.test(c.law))c.law=c.law.replace(/([a-zåäö])-\s*\n\s*([a-zåäö])/g,'$1$2');
}
function categories(list,crimes){
 const used=new Set(crimes.map(c=>c.category));
 const out=['Alla'].concat(ORDER.filter(x=>used.has(x)),[...used].filter(x=>!ORDER.includes(x)).sort((a,b)=>a.localeCompare(b,'sv')));
 list.length=0;list.push(...out);return list;
}
window.BK_ENHETLIGHET20={apply,categories,ALIAS,CAT,ORDER,yr,yrShort};
})();
