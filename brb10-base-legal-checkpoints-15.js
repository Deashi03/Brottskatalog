/* Individual current-SFS checks for 16 BrB 10 base offences, 2026-10-20.
 * Exactly objective statutory route and subjective fault per base offence,
 * no certification of chapter-specific prosecution, stages, legal history,
 * penalty, competing offences or case-specific powers.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=t=>String(t||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const required={
 '10:1':['fått egendom i besittning för annan','skyldighet att utgiva egendomen eller redovisa','vinning för honom och skada'],
 '10:2':['med hänsyn till det förskingrades värde','övriga omständigheter','ringa förskingring'],
 '10:3':['grov förskingring','missbrukat ansvarsfull ställning','vilseledande bokföring','Lag (2026:1318)'],
 '10:4':['vidtar åtgärd med egendom','ägande- eller säkerhetsrätt','frånhänds den andre','grovt olovligt förfogande'],
 '10:5':['på grund av förtroendeställning','självständigt hantera en kvalificerad teknisk uppgift','skadar huvudmannen','grov trolöshet mot huvudman','gäller inte om gärningen är belagd'],
 '10:5a':['tar emot, godtar ett löfte om eller begär','otillbörlig förmån','deltagare eller funktionär i en tävling','innan gärningsmannen fått en sådan ställning'],
 '10:5b':['lämnar, utlovar eller erbjuder en otillbörlig förmån','fall som avses i 5 a §'],
 '10:5c':['grovt tagande av muta eller grovt givande av muta','särskilt ansvarsfull ställning','brottslighet som utövats systematiskt','Lag (2026:1318)'],
 '10:5d':['handel med inflytande','för att påverka annans beslut eller åtgärd','myndighetsutövning eller offentlig upphandling'],
 '10:5e':['näringsidkare som tillhandahåller pengar eller andra tillgångar','av grov oaktsamhet främjar givande av muta'],
 '10:6':['genom missbruk av behörighet','skadar denne','check'],
 '10:7':['olovligen bruka någon annans sak','vållar skada eller olägenhet','grovt olovligt brukande']
};
const source=(ref,words)=>{const p=W['BrB:'+ref];return Boolean(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>90&&words.every(w=>n(p.text).includes(n(w))));};
const available=Object.fromEntries(Object.entries(required).map(([k,words])=>[k,source(k,words)]));
const faultRule=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const entries=[
 {t:'Förskingring',ref:'10:1',needs:[],
 objective:'Gärningspersonen har fått egendom i besittning för någon annan genom avtal, tjänst eller liknande ställning med redovisnings- eller återlämnandeskuld. Tillägnelse eller annat åsidosättande av skyldigheten ska innebära vinning för gärningspersonen och motsvarande skada för den berättigade.',
 subjective:'Uppsåt till att tillägna sig eller åsidosätta förpliktelsen och till de faktiska omständigheterna för vinning och skada enligt 10:1 och 1:2. Blott en misslyckad återbetalning innebär inte automatiskt förskingringsuppsåt.'},
 {t:'Ringa förskingring',ref:'10:2',needs:['10:1'],
 objective:'Samma besittnings-, redovisnings-, vinning- och skaderekvisit som i 10:1 krävs. Ringa grad enligt 10:2 beror på en samlad prövning av det förskingrades värde och omständigheterna vid brottet, inte på ett isolerat fast prisbelopp.',
 subjective:'Samma uppsåt till det faktiska förskingringsförloppet som enligt 10:1. Ringa är en juridisk värdering av gärningen, inte ett särskilt krav på att gärningspersonen haft uppsåt till en obetydlig skada.'},
 {t:'Grov förskingring',ref:'10:3',needs:['10:1'],
 objective:'Grundgärningen i 10:1 ska vara uppfylld. Bedöm grov grad enligt 10:3, där bland annat missbruk av ansvarsfull ställning, falskt underlag eller vilseledande bokföring, särskilt farlig art, betydande värde eller synnerligen kännbar skada särskilt beaktas.',
 subjective:'Uppsåt till förskingringsgärningen och de relevanta faktiska omständigheterna krävs. Att brottet juridiskt ska klassificeras som grovt ersätter varken förskingringsuppsåtet eller de objektiva grundrekvisiten.'},
 {t:'Olovligt förfogande',ref:'10:4',needs:[],
 objective:'I annat fall än förskingring enligt 10:1–3 ska gärningspersonen med egendom i egen besittning vidta en åtgärd som avhänder någon annan egendomen eller berövar denne en skyddad ägande- eller säkerhetsrätt. Besittning och annans rätt är skilda rekvisit.',
 subjective:'Uppsåt till att förfoga över egendomen och till omständigheterna som innebär intrång i annans skyddade rätt krävs enligt 1:2. Att endast förfoga över egen egendom utan någon annans rätt till den uppfyller inte brottstypen.'},
 {t:'Grovt olovligt förfogande',ref:'10:4',needs:[],
 objective:'Samtliga grundrekvisit för olovligt förfogande enligt 10:4 ska föreligga. Graden blir grov efter helhetsprövning, med bland annat betydande värde, synnerligen kännbar skada eller särskilt farligt eller hänsynslöst tillvägagångssätt som individuella omständigheter.',
 subjective:'Uppsåt till den olovliga förfogandehandlingen och annans skyddade rätt krävs. Grova kvalifikationsfaktorer avser gärningens faktiska förhållanden, inte en särskild uppsåtsform eller ansvar enbart av följdens omfattning.'},
 {t:'Trolöshet mot huvudman',ref:'10:5',needs:[],
 objective:'En kvalificerad förtroendeställning att självständigt sköta annans ekonomiska angelägenhet, kvalificerad teknisk uppgift eller sådan övervakning missbrukas och orsakar huvudmannen skada. Bestämmelsen är uttryckligen subsidiär till 10:1–3.',
 subjective:'Uppsåt till missbruket av förtroendeställningen och skadan samt de relevanta förtroendeomständigheterna krävs enligt 1:2. Enbart dåligt resultat eller felaktigt beslut utan uppsåtligt missbruk räcker inte.'},
 {t:'Grov trolöshet mot huvudman',ref:'10:5',needs:[],
 objective:'Trolöshet enligt 10:5 första stycket ska föreligga och vara grov enligt andra styckets helhetsbedömning. Betydande eller synnerligen kännbar skada, falskt underlag eller vilseledande bokföring eller annars särskilt farlig art är särskilt angivna omständigheter.',
 subjective:'Uppsåt till förtroendemissbruket, skadan och relevanta faktiska omständigheter måste föreligga; beteckningen grovt tillåter inte att domstolen utgår från en fristående oaktsamhetsregel.'},
 {t:'Tagande av muta',ref:'10:5a',needs:[],
 objective:'En arbetstagare eller uppdragstagare tar emot, godtar ett löfte om eller begär en otillbörlig förmån för anställningens eller uppdragets utövning. Paragrafen täcker också angivna deltagare eller funktionärer i offentligt vadslagna tävlingar, samt förmåner till tredje man och före/efter ställningen.',
 subjective:'Uppsåt till att begära, motta eller godta den otillbörliga förmånen och dess samband med uppdrag eller anställning krävs. Den rättsliga otillbörlighetsbedömningen måste grundas på faktiska omständigheter, inte förmånens storlek ensam.'},
 {t:'Givande av muta',ref:'10:5b',needs:['10:5a'],
 objective:'Att lämna, utlova eller erbjuda en otillbörlig förmån till någon i den särskilt angivna situationen enligt 10:5 a. Givandet, erbjudandet och utfästelsen är alternativa fullbordanssätt; faktisk betalning eller mottagande krävs inte för alla varianter.',
 subjective:'Uppsåt till förmånshandlingen och de faktiska förhållanden som gör den otillbörlig och knuten till angiven ställning eller tävling krävs enligt huvudregeln. Rent oavsiktlig förmån räcker inte.'},
 {t:'Grovt tagande av muta',ref:'10:5c',needs:['10:5a'],
 objective:'Tagande av muta enligt 10:5 a ska vara grovt efter samlad prövning av bland annat särskilt ansvarsfull ställning, betydande värde, systematiskt eller omfattande tillvägagångssätt eller särskilt farlig art. Grundbrottets fullbordansalternativ kvarstår.',
 subjective:'Uppsåt till det grundläggande tagandet och de relevanta konkreta förhållandena krävs. Brottsgraden är en rättslig helhetsvärdering och inte en ersättning för uppsåt till en mutgärning.'},
 {t:'Grovt givande av muta',ref:'10:5c',needs:['10:5b','10:5a'],
 objective:'Givande, erbjudande eller utfästelse enligt 10:5 b jämförd med 10:5 a ska vara grovt efter en helhetsbedömning av ansvarsfull ställning, betydande värde, systematiskt eller omfattande tillvägagångssätt eller särskilt farlig art.',
 subjective:'Uppsåt till givande av muta och de faktiska omständigheterna som bär gärningen krävs. Den strängare brottsgraden enligt 10:5 c skapar ingen separat oaktsamhetsansvarsgrund.'},
 {t:'Handel med inflytande',ref:'10:5d',needs:[],
 objective:'Utanför fallen för muta enligt 10:5 a–b gäller två alternativ: motta/godta löfte/begära otillbörlig förmån för att påverka någon annans beslut eller åtgärd, eller lämna/utlova/erbjuda förmånen i samma syfte. Påverkan ska avse myndighetsutövning eller offentlig upphandling.',
 subjective:'Uppsåt till den otillbörliga förmånshandlingen och särskilt syfte att påverka annans beslut eller åtgärd i den lagstadgade offentliga situationen måste föreligga. Allmän lobbying utan förmån och detta syfte är inte tillräckligt.'},
 {t:'Vårdslös finansiering av mutbrott',ref:'10:5e',needs:['10:5b','10:5d'],
 objective:'En näringsidkare tillhandahåller pengar eller andra tillgångar till en företrädare i en viss angelägenhet och främjar därigenom givande av muta, grovt givande av muta eller 10:5 d andra punktens handel med inflytande i just denna angelägenhet. Förhållandet mellan finansiering och främjad gärning kräver prövning.',
 subjective:'Här föreskrivs uttryckligen GROV OAKTSAMHET beträffande främjandet, till skillnad från huvudregeln om uppsåt. Vanlig oaktsamhet får inte förväxlas med grov oaktsamhet; kravet på en näringsidkares relevanta tillgångsöverföring består.'},
 {t:'Behörighetsmissbruk',ref:'10:6',needs:[],
 objective:'Olika gärningsformer omfattas: missbruk av behörighet att företa rättshandling för annan som skadar denne; missbruk av behörighet att kräva skuldebrev eller liknande; och de särskilt uppräknade obefogade betalnings- eller utlämningskraven. Brottet är subsidiärt till tidigare kapitelbestämmelser.',
 subjective:'Uppsåt till behörighetsmissbruket eller det rättsstridiga kravet och till de relevanta omständigheterna krävs enligt 1:2. En oförutsedd avtalsförlust utan missbruk av den särskilda behörigheten räcker inte.'},
 {t:'Olovligt brukande',ref:'10:7',needs:[],
 objective:'Någon brukar olovligen en annans sak och vållar skada eller olägenhet; även olovligt brukande av en fastighet som brukaren innehar men som någon annan har nyttjanderätt eller annan rätt till omfattas. Att endast använda egendomen utan skada eller olägenhet uppfyller inte hela lydelsen.',
 subjective:'Uppsåt enligt 1:2 till det olovliga brukandet och relevanta skade- eller olägenhetsförhållanden krävs som utgångspunkt. Till skillnad från förskingring krävs inget särskilt tillägnelseuppsåt.'},
 {t:'Grovt olovligt brukande',ref:'10:7',needs:[],
 objective:'Grundgärningen i 10:7, olovligt brukande som orsakar skada eller olägenhet, ska vara grov. Särskilt farlig eller hänsynslös art, betydande värde eller synnerligen kännbar skada är uppräknade grovhetsomständigheter.',
 subjective:'Uppsåt till den grundläggande olovliga brukandegärningen krävs; omständigheter för grov bedömning är särskilda rättsliga gradfaktorer och innebär inte automatisk skuld enbart på grund av ett högt värde.'}
];
const report={planned:entries.length*2,completed:0,byKind:{objective:0,subjective:0},byOffence:[],held:[],
 checked:'2026-10-20',sourceURL:SRC,fullyApprovedCards:0,caseLiabilityApproved:0,caseLawApproved:0,
 historicLawApproved:0,prosecutionApproved:0,coercionApproved:0};
for(const spec of entries){
 const c=D.crimes.find(x=>!x.stageType&&x.title===spec.t);
 const rec={title:spec.t,done:[],held:[]};report.byOffence.push(rec);
 if(!c||c.statute!=='BrB:'+spec.ref||c.legalAudit15?.checkpoints){
  report.held.push({title:spec.t,reason:'missing or mismatched statute or conflict with earlier review'});continue;
 }
 const ready=available[spec.ref]&&spec.needs.every(k=>available[k])&&
  c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC&&c.lawMode==='full'&&
  Boolean(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const records={objective:ready,subjective:ready&&(spec.ref==='10:5e'||faultRule)};
 const notes={objective:spec.objective,subjective:spec.subjective},checkpoints={};
 for(const [key,passed] of Object.entries(records)){
  if(passed&&notes[key].length>=95){
   checkpoints[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
     sources:key==='subjective'?['BrB 1:2','BrB '+spec.ref,...spec.needs.map(k=>'BrB '+k)]:['BrB '+spec.ref,...spec.needs.map(k=>'BrB '+k)],
     scope:'current-SFS-objective-and-fault-elements-only',
     finding:notes[key],offenceDateVerified:false,caseSpecificLiabilityApproved:false,
     applicableCaseLawFullyReviewed:false,allSubsidiarityExceptionsReviewed:false,
     individualChargingPermissionApproved:false,coercivePowerApproved:false};
   report.completed++;report.byKind[key]++;rec.done.push(key);
  }else{report.held.push({title:spec.t,key,reason:'required complete individual source not verified'});rec.held.push(key);}
 }
 if(rec.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB10-2026-10-20',checkpoints,
  fullLegalReviewApproved:false,historicDatePending:true,jurisprudencePending:true,
  stageAndCompetitionPending:true,penaltyAndGradePending:true,
  prosecutionAndCoercionPending:true};
}
window.BK_BRB10_BASE_AUDIT15=report;
})();