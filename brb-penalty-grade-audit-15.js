/* V1.5: explicit individual-range checks of 105 common BrB grades.
 * The controlling CURRENT complete SFS paragraphs are curated in
 * brb-curated-lawtext-15.js. Full legal/penalty applicability is NOT approved.
 * Date-dependent, inchoate and coercive rules remain separate work.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
 // Title, official SFS section, min/max years, fines permitted, life, special caveat.
 ['Vållande till annans död','3:7',0,3,false,false,'Ringa fall kan enligt samma paragraf ge böter; normalgraden avser fängelse i högst tre år.'],
 ['Grovt vållande till annans död','3:7',2,6,false,false,'Grov oaktsamhet med lagens kvalifikationsgrunder; SFS 2026:1318.'],
 ['Vållande till kroppsskada eller sjukdom','3:8',0,0.5,true,false,'Skada/sjukdom som inte är ringa; lagens oaktsamhetsrekvisit.'],
 ['Grovt vållande till kroppsskada eller sjukdom','3:8',0,4,false,false,'Grovhetsgrunden i 3:8, högst fyra års fängelse.'],
 ['Framkallande av fara för annan','3:9',0,3,true,false,'Kräver grov oaktsamhet och konkret skyddad fara, inte vanligt oaktsamhetsbrott.'],
 ['Förtal','5:1',0,0,true,false,'Böter enligt 5:1. Försvarlighet och sann/skälig uppgift måste prövas separat; enskilt åtal enligt 5:5 huvudregel.'],
 ['Grovt förtal','5:2',0,2,true,false,'Även grovt förtal kan ge böter. Spridningsomfattning och skada samt villkoren i 5:5 prövas särskilt.'],
 ['Förolämpning','5:3',0,0.5,true,false,'Särskilt åtalsfilter i 5:5. Förväxla inte 5:3 med förolämpning mot tjänsteman enligt 17:3.'],
 ['Urkundsförfalskning','14:1',0,2,false,false,'Krav på urkund och fara i bevishänseende; separera elektroniska handlingar och originalkaraktär.'],
 ['Förvanskning av urkund','14:2',0,0.5,true,false,'Ringa form av urkundsförfalskning; observera den särskilda lindringsgrunden i lagtexten.'],
 ['Grov urkundsförfalskning','14:3',1,6,false,false,'2026 års straffminimum; särskilt betydelsefull urkund eller farlig gärning ger grovhetsindikatorer.'],
 ['Märkesförfalskning','14:8',0,2,false,false,'Giltiga märken, falsk eller felaktigt anbringad äkta märkning och fara i bevishänseende.'],
 ['Ringa märkesförfalskning','14:8',0,0.5,true,false,'Ringa grad i andra stycket. Brottskortet är avgränsat från normala och grova graden.'],
 ['Grov märkesförfalskning','14:8',0.5,4,false,false,'Grov grad enligt tredje stycket. Full tillämpning och praxis kräver separat kontroll.'],
 ['Mened','15:1',0.5,4,false,false,'Normalgradens minimum är sex månader; mindre allvarligt menedsbrott har särskild skala i samma paragraf.'],
 ['Grov mened','15:1',2,8,false,false,'Grovt brott kräver särskild helhetsbedömning och lagens uppsåtsrelaterade kvalifikationsfaktorer.'],
 ['Osann partsutsaga','15:2',0,2,false,false,'Ringa variant har särskild bötesmöjlighet enligt 15:2. Separat vittnesed krävs inte för partsutsaga.'],
 ['Ovarsam utsaga','15:3',0,0.5,true,false,'Grov oaktsamhet krävs, jämför undantagen om betydelselös utsaga/rätt att tiga i 15:4.'],
 ['Förskingring','10:1',0,2,false,false,'Besittning för annans räkning, redovisningsskyldighet, vinning och skada måste särskiljas från stöld och trolöshet.'],
 ['Ringa förskingring','10:2',0,0.5,true,false,'Ringa grad enligt förskingringsrekvisiten i BrB 10:1. I vissa hyres-/kreditköpsfall gäller särskild åtalsbegränsning i 10:10.'],
 ['Grov förskingring','10:3',1,6,false,false,'Grov grad med samlad bedömning, särskilt ansvarsfull ställning, handlingar/bokföring, betydande värde eller kännbar skada.'],
 ['Olovligt förfogande','10:4',0,1,true,false,'Gärning med annans egendoms- eller säkerhetsrätt i förhållande till egendom i gärningspersonens besittning, i annat fall än 10:1–3.'],
 ['Grovt olovligt förfogande','10:4',0.5,4,false,false,'Samlad grovhetsbedömning enligt 10:4 andra stycket.'],
 ['Trolöshet mot huvudman','10:5',0,2,true,false,'Förtroendeställning, kvalificerad ekonomisk, teknisk eller rättslig angelägenhet, skada/förfång samt subsidiaritet till 10:1–3.'],
 ['Grov trolöshet mot huvudman','10:5',1,6,false,false,'Särskild grovhetsbedömning och alltjämt subsidiär mot förskingring i 10:1–3.'],
 ['Tagande av muta','10:5a',0,2,false,false,'Tar emot, begär eller godtar löfte; offentlig anställning eller allmänt anordnad vadhållning; särskilt åtalsvillkor 10:10/20:5.'],
 ['Givande av muta','10:5b',0,2,false,false,'Lämnar, utlovar eller erbjuder otillbörlig förmån; särskilt åtalsvillkor 10:10/20:5.'],
 ['Grovt tagande av muta','10:5c',1.5,6,false,false,'Grovhetsbedömning av 10:5a-typ enligt 10:5c; åtalsfrågan i grov grad måste bedömas särskilt.'],
 ['Grovt givande av muta','10:5c',1.5,6,false,false,'Grovhetsbedömning av 10:5b-typ enligt 10:5c; särskilt lagstöd för förberedelse i 10:9.'],
 ['Handel med inflytande','10:5d',0,2,false,false,'Otillbörlig förmån för påverkan på myndighetsutövning/offentlig upphandling, i annat fall än 10:5a–b; åtalsvillkor enligt 10:10.'],
 ['Vårdslös finansiering av mutbrott','10:5e',0,2,true,false,'Grov oaktsamhet vid finansiering av vissa bestämda mutbrott; särskilt åtalsvillkor enligt 10:10 och 20:5.'],
 ['Egenmäktigt förfarande','8:8',0,1,true,false,'Tre lagstadgade tillvägagångssätt: tillgrepp/brukande, olovlig besittningsrubbning med skada eller olägenhet, och våld/hot vid annans rätt att hålla kvar eller ta egendom.'],
 ['Grovt egenmäktigt förfarande','8:8',0.5,4,false,false,'Grovhetsbedömning enligt 8:8 tredje stycket. Även våld, hot, betydande värde och särskild hänsynslöshet ska beaktas.'],
 ['Självtäkt','8:9',0,0.5,true,false,'8:9 kräver en gärning som anges i 8:8 med syfte att själv ta sig rätt; egen rätt gör inte tvångsingripandet tillåtet.'],
 ['Olovlig energiavledning','8:10',0,1,true,false,'Omfattar även viss olovlig värmeenergiavledning, inte bara elektricitet.'],
 ['Grov olovlig energiavledning','8:10',0.5,4,false,false,'Samlad kvalifikationsbedömning; fara, betydande värde och synnerligen kännbar skada.'],
 ['Grovt fordringsbedrägeri','9:3a',1,6,false,false,'Till vidare krets riktade betalningsuppmaningar i vilseledandesyfte och betydande värde.'],
 ['Olovlig befattning med betalningsverktyg','9:3c',0,2,true,false,'Skyddade betalningsverktyg, även uppgifter; lagens uttryckliga subsidiaritetsklausul prövas separat.'],
 ['Grov olovlig befattning med betalningsverktyg','9:3c',1,6,false,false,'2026 års grovhetsindikatorer och uttryckligt subsidiaritetsvillkor enligt 9:3 c.'],
 ['Företagskapning','9:3d',0,2,true,false,'Utge sig för att företräda en juridisk person genom otillåten användning av identitetsuppgifter; faktisk skada eller olägenhet.'],
 ['Utpressning','9:4',0,3,false,false,'Olaga tvång med förmögenhetsöverföring och skada; subsidiärt till rån eller grovt rån. Ringa grad har annan skala.'],
 ['Ringa utpressning','9:4',0,0.5,true,false,'Särskild ringa grad av 9:4 med bötesmöjlighet; förstadielagstöd i 9:11.'],
 ['Grov utpressning','9:4',2,8,false,false,'Hot med vapen/vapenattrapp eller anspelning på våldskapital är kvalifikationsfaktorer; bedömningen är samlad.'],
 ['Ocker','9:5',0,2,true,false,'Utnyttjande av trångmål/oförstånd m.m. eller kreditgivning i näringsverksamhet i lagens alternativa form.'],
 ['Grovt ocker','9:5',1,6,false,false,'Särskilt värde eller hänsynslös/farlig art; helhetsbedömning.'],
 ['Häleri','9:6',0,2,false,false,'Tre lagstadgade huvudalternativ och separat näringsverksamhetsalternativ som täcker skäligen kan antas.'],
 ['Grovt häleri','9:6',1,6,false,false,'Särskilt betydande värde, systematik eller annan särskilt farlig art.'],
 ['Utförselhäleri','9:6a',0,2,false,false,'Syfte att föra den misstänkt brottshärrörande egendomen ut ur landet enligt 9:6 a.'],
 ['Grovt utförselhäleri','9:6a',1,6,false,false,'Särskild utlandsavsikt och samlad grovhetsbedömning enligt 9:6 a.'],
 ['Häleriförseelse','9:7',0,0.5,true,false,'Inbegriper ringa häleri/utförselhäleri och separat brottsinsikt med skälig anledning att anta.'],
 ['Oredlighet mot borgenärer','11:1',0,2,false,false,'Alternativ: obestånd/påtaglig obeståndsfara, undanröjande av betydande värde eller viss konkursundandragning; återstående rekvisit och gärningstid separat.'],
 ['Grov oredlighet mot borgenärer','11:1',1,6,false,false,'Grovhetsbedömning efter 11:1 fjärde stycket; förstadierna i 11:6 har särskilda gärningsformsvillkor.'],
 ['Försvårande av konkurs eller exekutiv förrättning','11:2',0,2,false,false,'Uppsåt eller grov oaktsamhet i första stycket; särskilt uppsåtsfall i andra. Rättelse och saknat betydelse/ursäkt kan utesluta ansvar.'],
 ['Grovt försvårande av konkurs eller exekutiv förrättning','11:2',1,6,false,false,'Grova formen kräver uttryckligen uppsåt enligt fjärde stycket; grov oaktsamhet ensam räcker inte.'],
 ['Vårdslöshet mot borgenärer','11:3',0,2,false,false,'Uppsåt eller grov oaktsamhet vid avsevärd förmögenhetsförsämring; särskild åtalsbegränsning i 11:8.'],
 ['Otillbörligt gynnande av borgenär','11:4',0,2,false,false,'Särskild risk att annan borgenärs rätt avsevärt förringas eller otillbörligt hemligt gynnande.'],
 ['Bokföringsbrott','11:5',0,2,false,false,'Uppsåt eller vanlig oaktsamhet, men rörelsens resultat/förlopp/ställning ska inte i huvudsak kunna bedömas. Ej ringa fall.'],
 ['Ringa bokföringsbrott','11:5',0,0.5,true,false,'Särskild ringa grad med böter; 11:8 kräver särskilda skäl och allmän synpunkt för åklagaråtal.'],
 ['Grovt bokföringsbrott','11:5',0.5,6,false,false,'Grova graden har lägst sex månaders fängelse; kvalifikationsfaktorer enligt andra stycket; förberedelse enligt 11:6.'],
 ['Åverkan','12:2a',0,0,true,false,'Ringa olovligt tillgrepp av särskilda obearbetade naturprodukter i skog/mark; endast böter, särskild åtalsbegränsning i 12:6 vid enbart enskild rätt.'],
 ['Tagande av olovlig väg','12:4',0,0.5,true,false,'Olovlig färd på annat än väg över tomt, plantering eller annan mark som kan skadas; 12:6 åtalsvillkor bara när enskilds rätt ensam kränks.'],
 ['Olaga frihetsberövande','4:2',1,10,false,false,'Grundgradens straffminimum ett års fängelse; mindre grovt brott har separat bötes-/fängelseskala som måste särskiljas.'],
 ['Kränkande fotografering','4:6a',0,2,true,false,'Kräver olovlig hemlig bildtagning med tekniskt hjälpmedel i angivet utrymme. Försvarlighet och myndighetsundantaget prövas.'],
 ['Olovlig identitetsanvändning','4:6b',0,2,true,false,'Användning av annans identitetsuppgifter och skada/olägenhet. Blanda inte ihop med företagskapning i 9:3 d.'],
 ['Olaga integritetsintrång','4:6c',0,2,true,false,'Spridning inom fem uppräknade kategorier, allvarlig skaderisk, med uttryckligt försvarlighetsundantag.'],
 ['Grovt olaga integritetsintrång','4:6d',0.5,6,false,false,'Kvalificerad mycket allvarlig skaderisk; 2026 års aktuella straffminimum sex månader.'],
 ['Brytande av post- eller telehemlighet','4:8',0,2,true,false,'Gäller förmedlat post-/telemeddelande; skilj från intrång i förvar och dataintrång.'],
 ['Intrång i förvar','4:9',0,2,true,false,'Subsidiärt till brytande av post-/telehemlighet i 4:8; gäller förseglat, under lås eller tillslutet.'],
 ['Olovlig avlyssning','4:9a',0,2,true,false,'Hemlig avlyssning med tekniskt ljudhjälpmedel av särskilt skyddade samtal; platsvillkoret i 4:11 påverkar åtal.'],
 ['Dataintrång','4:9c',0,2,true,false,'Olovligt förfarande med uppgift avsedd för automatiserad behandling, inklusive allvarlig störning/hinder enligt lagtexten.'],
 ['Grovt dataintrång','4:9c',1,8,false,false,'Allvarlig skada, många uppgifter eller särskilt farlig art; 2026 års fängelseskala 1–8 år.'],
 ['Människorov','4:1',4,18,false,true,'Människorov enligt huvudgraden har minimum fyra år och kan ge livstid; mindre grovt fall har särskild skala högst sex år.'],
 ['Människohandel','4:1a',2,10,false,false,'Ändamål att exploatera, särskilda otillbörliga medel; barnundantag från medelkravet och oaktsamhet i fråga om ålder.'],
 ['Människoexploatering','4:1b',0,4,false,false,'Tvångsarbete, arbete under uppenbart orimliga villkor eller tiggeri; barnundantag från tvångs-/utnyttjandekrav.'],
 ['Grov människoexploatering','4:1b',2,10,false,false,'Grov bedömning med bland annat omfattning, vinning eller särskilt hänsynslöst utnyttjande.'],
 ['Olaga tvång','4:4',0,2,true,false,'Våld eller brottsligt hot, eller otillbörligt hot om åtal, anmälan eller menligt meddelande; det sistnämnda alternativet har särskild åtalsregel i 4:11.'],
 ['Grovt olaga tvång','4:4',1,6,false,false,'Allvarligt våld/hot inklusive förstärkt vapenhot eller särskild farlighet; sammanvägd grovhetsbedömning.'],
 ['Uppmaning till självmord','4:7a',0,2,false,false,'Uppmaning/psykisk påverkan med inte obetydlig farorisk, undantag när gärningen är mindre allvarlig.'],
 ['Oaktsam uppmaning till självmord','4:7a',0,0.5,true,false,'Oaktsamhet beträffande omständigheter som innebär sådan fara, även här gäller undantaget för mindre allvarlig gärning.'],
 ['Psykiskt våld','4:7b',0,4,false,false,'Upprepade kränkningar som är ägnade att allvarligt skada självkänslan, alternativt varaktig otillbörlig övervakning.'],
 ['Stöld','8:1',0,2,false,false,'Uppsåt att tillägna sig och skada prövas separat.'],
 ['Ringa stöld','8:2',0,0.5,true,false,'Förutsätter 8:1 och helhetsbedömning av ringa grad.'],
 ['Grov stöld','8:4',1,6,false,false,'Kvalifikationsfaktorer är inte var och en obligatoriska; helhetsbedömning.'],
 ['Inbrottsstöld','8:4a',1,6,false,false,'Undantag vid mindre allvarlig integritetskränkning finns i andra stycket.'],
 ['Rån','8:5',1.5,6,false,false,'Råntvång, motvärnsrån och undantag för mindre allvarlig gärning.'],
 ['Grovt rån','8:6',5,10,false,false,'Utgår från 8:5 och särskild samlad grovhetsbedömning.'],
 ['Tillgrepp av fortskaffningsmedel','8:7',0,2,false,false,'Observera att ringa grad har en annan straffskala.'],
 ['Ringa tillgrepp av fortskaffningsmedel','8:7',0,0.5,true,false,'Ringa grad enligt samma paragraf; ringa försök straffas inte enligt 8:12.'],
 ['Grovt tillgrepp av fortskaffningsmedel','8:7',0.5,4,false,false,'Grovhetsfaktorer enligt andra stycket.'],
 ['Bedrägeri','9:1',0,2,false,false,'Både traditionellt vilseledande och olovlig påverkan på automatiskt förfarande.'],
 ['Ringa bedrägeri','9:2',0,0.5,true,false,'Särskilt tjänstebedrägerialternativ utan krav på vilseledande enligt andra stycket.'],
 ['Grovt bedrägeri','9:3',1,6,false,false,'Särskilda kvalifikationsfaktorer efter samlad prövning.'],
 ['Skadegörelse','12:1',0,2,false,false,'Förstörelse eller skada till men för någon annans rätt.'],
 ['Ringa skadegörelse','12:2',0,0.5,true,false,'Helhetsbedömning med hänsyn till skadans obetydlighet m.m.'],
 ['Grov skadegörelse','12:3',1,6,false,false,'Särskilda kvalifikationsfaktorer; uppsåtskrav enligt huvudregeln.'],
 ['Hemfridsbrott','4:6',0,1,true,false,'Innefattar även lagens gårds-, trädgårds- och andra liknande bostadsnära områden.'],
 ['Olaga intrång','4:6',0,1,true,false,'Alternativ till hemfridsbrott, avser andra skyddade platser enligt andra stycket.'],
 ['Grovt hemfridsbrott','4:6',0.5,3,false,false,'Även inbrott, våld/hot eller annan särskild hänsynslöshet/farlighet beaktas.'],
 ['Grovt olaga intrång','4:6',0.5,3,false,false,'Samma grovhetsparagraf, men grundgärningen avser olaga intrång.'],
 ['Ofredande','4:7',0,1,true,false,'Kräver att gärningen är ägnad att kränka den utsattes frid kännbart.'],
 ['Förolämpning mot tjänsteman','17:3',0,0.5,true,false,'2025 års särskilda brottsrubricering, myndighetsutövningsanknytning och lämplighetsrekvisit.'],
 ['Tjänstefel','20:1',0,2,true,false,'Både uppsåt och oaktsamhet kan räcka; ringa gärning undantagen.'],
 ['Grovt tjänstefel','20:1',1.5,6,false,false,'Det grova brottet kräver UPPSÅT: enbart oaktsamhet räcker INTE (BrB 20:1 andra stycket).'],
 ['Missbruk av offentlig ställning','20:2',0,2,true,false,'Subsidiärt till 20:1, brottsligt syfte att ge otillbörlig förmån eller missgynna.'],
 ['Grovt missbruk av offentlig ställning','20:2',1.5,6,false,false,'Grov grad enligt andra stycket; samlad bedömning, inte enbart högt värde.']
];
const byTitle=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[String(c.title||'').toLocaleLowerCase('sv'),c]));
const out={planned:rows.length,reviewed:0,held:[],mismatch:[],missing:[],unreviewedSource:[],refs:[...new Set(rows.map(r=>r[1]))],scope:'individual-current-offence-grade-penalty-range-only',sourceURL:URL};
for(const [title,ref,min,max,fines,life,caveat] of rows){
 const c=byTitle.get(title.toLocaleLowerCase('sv'));
 if(!c){out.missing.push(title);continue;}
 if(c.statute!=='BrB:'+ref){out.mismatch.push({title,reason:'incorrect-statutory-reference',actual:c.statute,expected:'BrB:'+ref});continue;}
 const section=W['BrB:'+ref];
 if(!section?.complete||section.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'||section.checked!=='2026-10-17'||!c.lawCompletenessVerified){
  out.unreviewedSource.push(title+' '+ref);continue;
 }
 const r=c.penaltyRange||{};
 const same=Number.isFinite(r.min)&&Number.isFinite(r.max)&&Math.abs(r.min-min)<1e-8&&Math.abs(r.max-max)<1e-8&&Boolean(r.fines)===fines&&Boolean(r.life)===life;
 if(!same){
  const issue={title,ref,expected:{min,max,fines,life},stored:c.penaltyRange||null};
  out.mismatch.push(issue);
  c.penaltyCrosscheckIssue=issue;
  c.penaltyRangeVerified=false;
  c.penaltyReviewScope='source-penalty-range-conflict-hold';
  continue;
 }
 if(c.reviewStatus==='source-changed'){out.held.push(title);continue;}
 c.penaltyRangeVerified=true;
 c.penaltyReviewScope='individual-current-grade-range-only';
 c.penaltyGradeReviewDate='2026-10-17';
 c.penaltyGradeReviewSource=URL;
 c.penaltyGradeReviewProvision='BrB '+ref;
 c.penaltyGradeReviewCaveat=caveat;
 c.penaltyReviewSafety='Only numeric offence-grade penalty interval and fines/life eligibility compared; no assumption on inchoate, coercive law, historical act date, prosecutor conditions or comprehensive liability.';
 out.reviewed++;
}
window.BK_PENALTY_GRADE_AUDIT15=out;
})();