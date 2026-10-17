import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const mod='./brb-curated-lawtext-15.js';
assert.ok(sources.includes(mod)&&sw.includes(mod),'Curated paragraphs must be loaded and offline');
assert.ok(sources.indexOf(mod)<sources.indexOf('./stages-08.js'));
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx=vm.createContext({window:{},console:{log:()=>{},warn:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx);
for(const src of sources)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const W=ctx.window.BK_STATUTES;
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const stats=ctx.window.BK_CURATED_LAWTEXT15;
assert.ok(stats,'Curated lawtext report missing');
assert.equal(stats.sectionsChecked,115,'Exactly one-hundred-fifteen complete paragraphs must have been checked: '+JSON.stringify({missing:stats.missing,mismatch:stats.mismatch,sourceHeads:stats.mismatch.map(k=>({ref:k,text:W[k]?.text?.slice(0,110)}))}));
assert.equal(stats.missing.length,0,JSON.stringify(stats.missing));
assert.equal(stats.mismatch.length,0,JSON.stringify(stats.mismatch));
const addedCards=base.filter(c=>['BrB:13:5c','BrB:17:10'].includes(c.statute));
assert.ok(addedCards.length>=4,'Expected normal and aggravated criminal grades for both newly checked sections');
const propertyKeys=['BrB:8:1','BrB:8:2','BrB:8:4','BrB:8:4a','BrB:8:5','BrB:8:6','BrB:8:7','BrB:9:1','BrB:9:2','BrB:9:3','BrB:12:1','BrB:12:2','BrB:12:3'];
const propertyCards=base.filter(c=>propertyKeys.includes(c.statute));
assert.ok(propertyCards.length>=13,'Every additional official provision must have at least one catalogue card');
for(const key of propertyKeys)assert.ok(propertyCards.some(c=>c.statute===key),'Missing offence card for '+key);
const officeKeys=['BrB:4:6','BrB:4:7','BrB:17:3','BrB:20:1','BrB:20:2'];
const officeCards=base.filter(c=>officeKeys.includes(c.statute));
for(const key of officeKeys)assert.ok(officeCards.some(c=>c.statute===key),'Missing police/public-office card: '+key);
assert.ok(officeCards.length>=10,'Expected multiple grades in housing and official misconduct law');
const negligenceKeys=['BrB:3:7','BrB:3:8','BrB:3:9','BrB:3:10'];
const negligenceCards=base.filter(c=>negligenceKeys.includes(c.statute));
for(const key of negligenceKeys)assert.ok(negligenceCards.some(c=>c.statute===key),'Missing negligent offence card: '+key);
assert.ok(negligenceCards.length>=4,'Missing police-relevant negligence offence cards');
const newKeys=['BrB:5:1','BrB:5:2','BrB:5:3','BrB:5:4','BrB:5:5','BrB:14:1','BrB:14:2','BrB:14:3','BrB:14:8','BrB:15:1','BrB:15:2','BrB:15:3','BrB:15:4','BrB:15:15'];
const newCards=base.filter(c=>newKeys.includes(c.statute));
for(const key of ['BrB:5:1','BrB:5:2','BrB:5:3','BrB:14:1','BrB:14:2','BrB:14:3','BrB:14:8','BrB:15:1','BrB:15:2','BrB:15:3']) {
 assert.ok(newCards.some(c=>c.statute===key),'Expected an existing official offence card for '+key);
}
assert.ok(newCards.length>=10,'New SFS paragraphs must link to genuine searchable crime cards');
const economicKeys=['BrB:10:1','BrB:10:2','BrB:10:3','BrB:10:4','BrB:10:5','BrB:10:5a','BrB:10:5b','BrB:10:5c','BrB:10:5d','BrB:10:5e','BrB:10:9','BrB:10:10'];
const economicCards=base.filter(c=>economicKeys.includes(c.statute));
for(const key of economicKeys.filter(k=>!['BrB:10:9','BrB:10:10'].includes(k))){
 assert.ok(economicCards.some(c=>c.statute===key),'Missing source-checked economic crime card: '+key);
}
assert.ok(economicCards.length>=10,'BrB 10 catalogue cards must cover the economic offences');
const theftFraudKeys=['BrB:8:8','BrB:8:9','BrB:8:10','BrB:8:11','BrB:8:12','BrB:8:13','BrB:9:3a','BrB:9:3c','BrB:9:3d','BrB:9:4','BrB:9:5','BrB:9:6','BrB:9:6a','BrB:9:7','BrB:9:8','BrB:9:9','BrB:9:10','BrB:9:11'];
const theftFraudCards=base.filter(c=>theftFraudKeys.includes(c.statute));
for(const key of theftFraudKeys.filter(k=>!['BrB:8:11','BrB:8:12','BrB:8:13','BrB:9:11'].includes(k))) {
 assert.ok(theftFraudCards.some(c=>c.statute===key),'Missing substantive theft/fraud offence for '+key);
}
const creditorKeys=['BrB:11:1','BrB:11:2','BrB:11:3','BrB:11:4','BrB:11:5','BrB:11:6','BrB:11:7','BrB:11:8'];
const creditorCards=base.filter(c=>creditorKeys.includes(c.statute));
for(const key of creditorKeys.slice(0,5)){
 assert.ok(creditorCards.some(c=>c.statute===key),'Missing creditor crime card for '+key);
}
assert.ok(creditorCards.length>=7,'Chapter 11 offences must map to legal cards');
const extra12Keys=['BrB:12:2a','BrB:12:4','BrB:12:5','BrB:12:6'];
const extra12Cards=base.filter(c=>extra12Keys.includes(c.statute));
assert.ok(extra12Cards.some(c=>c.statute==='BrB:12:2a'),'Åverkan card missing');
assert.ok(extra12Cards.some(c=>c.statute==='BrB:12:4'),'Tagande av olovlig väg card missing');
const ch4Keys=['BrB:4:2','BrB:4:6a','BrB:4:6b','BrB:4:6c','BrB:4:6d','BrB:4:8','BrB:4:9','BrB:4:9a','BrB:4:9b','BrB:4:9c','BrB:4:10','BrB:4:11'];
const freedomKeys=['BrB:4:1','BrB:4:1a','BrB:4:1b','BrB:4:4','BrB:4:7a','BrB:4:7b'];
const freedomCards=base.filter(c=>freedomKeys.includes(c.statute));
for(const key of freedomKeys)assert.ok(freedomCards.some(c=>c.statute===key),'Missing freedom/psychological offence card for '+key);
const ch4Cards=base.filter(c=>ch4Keys.includes(c.statute));
for(const key of ch4Keys.filter(k=>!['BrB:4:10','BrB:4:11'].includes(k)))assert.ok(ch4Cards.some(c=>c.statute===key),'Missing verified Ch4 crime card: '+key);
assert.equal(stats.linkedCardsChecked,21+addedCards.length+propertyCards.length+officeCards.length+negligenceCards.length+newCards.length+economicCards.length+theftFraudCards.length+creditorCards.length+extra12Cards.length+ch4Cards.length+freedomCards.length,
 'All 115 current SFS paragraphs must cover their actual offence card counts');
const markers={
 'BrB:4:1':['bemäktigar sig och för bort eller spärrar in','människorov','på livstid','mindre grovt','Lag (2009:396).'],
 'BrB:4:1a':['allvarligt begränsar personens alternativ','inte har fyllt arton år','oaktsam beträffande','mindre grovt','Lag (2018:601).'],
 'BrB:4:1b':['arbete under uppenbart orimliga villkor','inte har fyllt arton år','grov människoexploatering','Lag (2018:601).'],
 'BrB:4:4':['hot att åtala eller ange någon annan för brott','om tvånget är otillbörligt','grovt olaga tvång','Lag (2023:257).'],
 'BrB:4:7a':['inte obetydlig fara','oaktsam uppmaning till självmord','mindre allvarlig','Lag (2021:225).'],
 'BrB:4:7b':['otillbörlig övervakning','ägnade att allvarligt skada personens självkänsla','är varaktig','Lag (2026:852).'],
 'BrB:4:2':['olaga frihetsberövande','mindre grovt','Lag (2002:436).'],
 'BrB:4:6a':['i hemlighet tar upp bild','med hänsyn till syftet','led i en myndighets verksamhet','Lag (2013:366).'],
 'BrB:4:6b':['olovligen använda en annan persons identitetsuppgifter','skada eller olägenhet','Lag (2016:485).'],
 'BrB:4:6c':['gör intrång i någon annans privatliv genom att sprida','sexualliv','helt eller delvis nakna kropp','försvarlig','Lag (2017:1136).'],
 'BrB:4:6d':['grovt olaga integritetsintrång','mycket allvarlig skada','Lag (2026:1318).'],
 'BrB:4:8':['post- eller telebefordringsföretag','elektroniskt kommunikationsnät','Lag (2012:280).'],
 'BrB:4:9':['olovligen bryter brev eller telegram','förseglat eller under lås','intrång i förvar'],
 'BrB:4:9a':['medelst tekniskt hjälpmedel','som han själv icke deltager i','olovlig avlyssning','Lag (1975:239).'],
 'BrB:4:9b':['anbringar tekniskt hjälpmedel','förberedelse till sådant brott','fullbordat brott','Lag (2013:366).'],
 'BrB:4:9c':['olovligen bereder sig tillgång till en uppgift','allvarligt stör eller hindrar','grovt dataintrång','Lag (2026:1318).'],
 'BrB:4:10':['För försök, förberedelse eller stämpling till människorov','olaga frihetsberövande','försök eller förberedelse till dataintrång','Lag (2026:950).'],
 'BrB:4:11':['kränkande fotografering eller förberedelse','olovlig identitetsanvändning','målsäganden anger brottet till åtal','olaga tvång genom hot','Lag (2022:661).'],
 'BrB:12:2a':['olovligen tar växande träd eller gräs','eller annat som inte är bearbetat','åverkan till böter','Lag (2017:442).'],
 'BrB:12:4':['på annat än väg färdas över tomt eller plantering','tagande av olovlig väg','Lag (2017:442).'],
 'BrB:12:5':['För försök eller förberedelse till grov skadegörelse','underlåtenhet att avslöja eller förhindra','Lag (2016:508).'],
 'BrB:12:6':['om brottet endast kränker enskilds rätt','åtal av särskilda skäl','Lag (2017:442).'],
 'BrB:11:1':['på obestånd','påtaglig fara','konkursförvaltningen','otillbörligt syfte','grov oredlighet mot borgenärer','Lag (2026:1318).'],
 'BrB:11:2':['F-\nskuldsanering','uppsåtligen eller av grov oaktsamhet','uppgiften inte rättas','rätt att vägra yttra sig','uppsåtligen och är grovt','Lag (2026:1318).'],
 'BrB:11:3':['utan motsvarande nytta för rörelsen','uppsåtligen eller av grov oaktsamhet','skälig anledning anta','Lag (2005:242).'],
 'BrB:11:4':['betala skuld som inte är förfallen','annan borgenärs rätt','i hemlighet lämnar eller utlovar','Lag (2022:965).'],
 'BrB:11:5':['uppsåtligen eller av oaktsamhet','rörelsens förlopp','i huvudsak bedömas','grovt bokföringsbrott','inte bedriver näringsverksamhet','Lag (2005:242).'],
 'BrB:11:6':['försök till oredlighet mot borgenärer','förberedelse eller stämpling till grov oredlighet','förberedelse till grovt bokföringsbrott','Lag (2016:508).'],
 'BrB:11:7':['gäldenärs ställe','endast om han brukar otillbörligt hot','hemligt samförstånd','Lag (1986:43).'],
 'BrB:11:8':['endast om åtal är påkallat från allmän synpunkt','endast om åtal av särskilda skäl','Lag (2013:216).'],
 'BrB:9:8':['i annat fall än förut i detta kapitel','förfar oredligt','Lag (1970:414).'],
 'BrB:9:9':['priset på vara, värdepapper','uppsåtligen eller av grov oaktsamhet','grovt svindleri','Lag (2026:1318).'],
 'BrB:9:10':['påtryckningsmedel vid krav','check utan täckning','ockerpantning'],
 'BrB:9:11':['försök eller förberedelse till bedrägeri','stämpling till grovt bedrägeri','23 kap. 3 § ska dock inte gälla','frivilligt avstått','Lag (2025:1269).'],
 'BrB:8:8':['olovligen rubbar någon annans besittning','rätt att hålla kvar eller ta något','grovt egenmäktigt förfarande','Lag (2017:442).'],
 'BrB:8:9':['åtgärd som avses i 8 §','för att själv ta sig rätt','Lag (2017:442).'],
 'BrB:8:10':['olovligen avleder elektrisk kraft','värmeenergi','grov olovlig energiavledning','Lag (2017:442).'],
 'BrB:8:11':['i skog eller mark','12 kap. 2 a §','Lag (2017:442).'],
 'BrB:8:12':['För försök eller förberedelse till stöld','stämpling till grov stöld','ringa','Lag (2021:35).'],
 'BrB:8:13':['grov stöld, inbrottsstöld, rån eller grovt rån','sammanbodde','målsäganden har angett','häleri eller häleriförseelse','Lag (2021:35).'],
 'BrB:9:3a':['till en vidare krets riktar betalningsuppmaningar','grovt fordringsbedrägeri','Lag (2026:1318).'],
 'BrB:9:3c':['skyddade verktyg, handlingar eller uppgifter','grov olovlig befattning med betalningsverktyg','samma eller strängare straff','Lag (2026:1318).'],
 'BrB:9:3d':['juridisk persons identitetsuppgifter','företagskapning','Lag (2024:1110).'],
 'BrB:9:4':['om inte brottet är att anse som rån eller grovt rån','ringa utpressning','grov utpressning','Lag (2023:257).'],
 'BrB:9:5':['trångmål, oförstånd, lättsinne eller beroendeställning','uppenbart missförhållande','grovt ocker','Lag (2026:1318).'],
 'BrB:9:6':['försvåra ett återställande','brottsliga förvärv','hävdar genom brott tillkommen fordran','grovt häleri','Lag (2026:1318).'],
 'BrB:9:6a':['syfte att föra det ut ur landet','grovt utförselhäleri','Lag (2026:1318).'],
 'BrB:9:7':['häleriförseelse','inte insåg men hade skälig anledning','medverkat vid det brott','Lag (2025:638).'],
 'BrB:20:5':['Utan hinder av vad som annars är föreskrivet','arbetstagare hos staten eller en kommun','Om det inte finns särskilda bestämmelser','riksdagsledamot, statsråd, justitieråd','Lag (2019:839).'],
 'BrB:10:1':['fått egendom i besittning för annan','vinning för honom och skada','förskingring'],
 'BrB:10:2':['det förskingrades värde','ringa förskingring','Lag (2017:442).'],
 'BrB:10:3':['grov förskingring','vilseledande bokföring','Lag (2026:1318).'],
 'BrB:10:4':['ägande- eller säkerhetsrätt','grovt olovligt förfogande','Lag (2017:442).'],
 'BrB:10:5':['självständigt hantera en kvalificerad teknisk uppgift','grov trolöshet mot huvudman','rättslig angelägenhet','Lag (2026:1318).'],
 'BrB:10:5a':['tar emot, godtar ett löfte om eller begär','innan gärningsmannen fått en sådan ställning','Lag (2026:1318).'],
 'BrB:10:5b':['lämnar, utlovar eller erbjuder','otillbörlig förmån','Lag (2026:1318).'],
 'BrB:10:5c':['grovt tagande av muta eller grovt givande av muta','ett år och sex månader','Lag (2026:1318).'],
 'BrB:10:5d':['handel med inflytande','offentlig upphandling','Lag (2026:1318).'],
 'BrB:10:5e':['av grov oaktsamhet','vårdslös finansiering av mutbrott','Lag (2012:301).'],
 'BrB:10:9':['försök till förskingring eller trolöshet mot huvudman','förberedelse till grovt givande av muta','Lag (2016:508).'],
 'BrB:10:10':['dock inte grov förskingring och grov trolöshet','åtal av särskilda skäl','20 kap. 5 §','Lag (2017:442).'],
 'BrB:5:1':['eljest lämnar uppgift','sann eller att han hade skälig grund'],
 'BrB:5:2':['grovt förtal','omfattningen av spridningen','Lag (2017:1136).'],
 'BrB:5:3':['förolämpning','självkänsla eller värdighet','Lag (2026:1318).'],
 'BrB:5:4':['Förtal av avliden','sårande för de efterlevande'],
 'BrB:5:5':['inte åtalas av någon annan än målsäganden','under arton år','allmän synpunkt','Lag (2018:540).'],
 'BrB:14:1':['Med urkund avses','elektronisk handling','bevismärke','Lag (2013:425).'],
 'BrB:14:2':['förvanskning av urkund','för att hjälpa någon till hans eller hennes rätt','Lag (2013:425).'],
 'BrB:14:3':['grov urkundsförfalskning','myndighets arkivhandling','Lag (2026:1318).'],
 'BrB:14:8':['märkesförfalskning','om åtgärden innebär fara i bevishänseende','Är brottet grovt','Lag (2013:425).'],
 'BrB:15:1':['efter att han eller hon har avlagt en ed','mindre allvarligt','grov mened','Lag (2026:1318).'],
 'BrB:15:2':['under sanningsförsäkran','osann partsutsaga','om brottet är ringa'],
 'BrB:15:3':['av grov oaktsamhet','ovarsam utsaga'],
 'BrB:15:4':['utan betydelse för saken','ägt vägra att yttra sig','skälig ursäkt'],
 'BrB:15:15':['För förberedelse eller stämpling till mened','för försök till bevisförvanskning','Lag (2026:1318).'],
 'BrB:3:7':['vållande till annans död','fängelse i lägst två och högst sex år','medvetet risktagande','Lag (2026:1318).'],
 'BrB:3:8':['kroppsskada eller sjukdom som inte är ringa','medvetet risktagande','Lag (2001:348).'],
 'BrB:3:9':['av grov oaktsamhet','livsfara','Lag (2026:1318).'],
 'BrB:3:10':['uppsåtligen eller av oaktsamhet','arbetsmiljölagen','Lag (1991:679).'],
 'BrB:3:11':['För försök eller förberedelse till mord','stämpling','Lag (2017:332).'],
 'BrB:3:12':['målsäganden anger brottet till åtal','inte har fyllt arton år','Lag (2003:408).'],
 'BrB:4:6':['hemfridsbrott','olaga intrång','en trädgård, på en gårdsplan','grovt hemfridsbrott','Lag (2022:661).'],
 'BrB:4:7':['fysiskt antastar','störande kontakter','kränka den utsattes frid','Lag (2017:1136).'],
 'BrB:17:3':['förolämpning mot tjänsteman','självkänsla eller värdighet','Lag (2025:579).'],
 'BrB:20:1':['uppsåtligen eller av oaktsamhet','om gärningen','uppsåtligen och är grovt','samma eller strängare straff','Lag (2026:1420).'],
 'BrB:20:2':['i annat fall än som avses i 1 §','otillbörligt missgynna','organiserad form eller systematiskt','Lag (2026:1420).'],
 'BrB:8:1':['olovligen tager vad annan tillhör','uppsåt att tillägna sig','om tillgreppet innebär skada'],
 'BrB:8:2':['det tillgripnas värde','omständigheter vid brottet','Lag (2017:442).'],
 'BrB:8:4':['grov stöld','brottslighet som utövats systematiskt','Lag (2026:1318).'],
 'BrB:8:4a':['intrång i bostad','mindre allvarlig art','Lag (2021:35).'],
 'BrB:8:5':['3. olovligen tar eller tvingar till sig ett betalningsverktyg','bar gärning','vanmakt','mindre allvarlig art','Lag (2023:257).'],
 'BrB:8:6':['grovt rån','svår kroppsskada','särskilt farlig art','Lag (2017:332).'],
 'BrB:8:7':['olovligen tar och brukar ett motorfordon','Om brottet är ringa','Är brottet grovt','Lag (2017:442).'],
 'BrB:9:1':['medelst vilseledande','automatisk informationsbehandling','Lag (1986:123).'],
 'BrB:9:2':['kontant betalning','oavsett om han eller hon vilseleder någon','Lag (2017:442).'],
 'BrB:9:3':['skyddslösa eller utsatta ställning','organiserad form eller systematiskt','Lag (2026:1318).'],
 'BrB:12:1':['förstör eller skadar egendom','till men för någon annans rätt','Lag (2017:442).'],
 'BrB:12:2':['skadans obetydlighet','övriga omständigheter','Lag (2017:442).'],
 'BrB:12:3':['kulturell eller ekonomisk betydelse','särskilt hänsynslös art','Lag (2026:1318).'],
 'BrB:13:5c':['stör polisverksamhet, räddningstjänst eller ambulanssjukvård','3. vidta annan otillbörlig åtgärd','allvarligt försvåra eller hindra','Lag (2019:1162).'],
 'BrB:17:10':['gjort anmälan, fört talan','Internationella brottmålsdomstolen','Om brottet med hänsyn till omständigheterna är mindre allvarligt','Lag (2022:792).'],
 'BrB:13:12':['försök, förberedelse eller stämpling','grov mordbrand','grovt sabotage mot blåljusverksamhet','Lag (2023:257).'],
 'BrB:3:5':['kroppsskada, sjukdom eller smärta','om brottet är ringa','Lag (1998:393).'],
 'BrB:3:6':['synnerligen grov misshandel','lägst sex och högst tolv år','Lag (2026:1318).'],
 'BrB:17:1':['tjänsteman vid hans eller hennes myndighetsutövning','lägst ett år och sex månader och högst åtta år','Lag (2025:579).'],
 'BrB:17:4':['motvärn','i 1 och 2 §§','Lag (2025:579).'],
 'BrB:3:1':['berövar annan livet','noggrann planering','Lag (2019:805).'],
 'BrB:3:2':['mindre grovt','fängelse, lägst sex och högst tio år.'],
 'BrB:4:5':['allvarlig rädsla','vapenattrapp','Lag (2023:257).'],
 'BrB:17:2':['tjänsteman eller dennes närstående','om brottet är grovt','Lag (2025:579).'],
 'BrB:6:7':['vaginalt samlag','helsyskon','otillbörligt sätt. Lag (2022:1043).'],
 'BrB:21:7':['grov olovlig avvikelse av krigsman','2. gått över till fienden','Lag (2026:924).'],
 'BrB:21:15':['underlåtenhet att avslöja eller förhindra','För medverkan till tjänstebrott','Lag (2026:924).'],
 'BrB:22:6a':['1. utvecklar, producerar','4. använder ämnen för kravallbekämpning','Lag (2021:1014).'],
 'BrB:22:6b':['Första stycket gäller endast minor','Sådan befattning med minor som är tillåten','Lag (2021:1014).']
};
for(const [ref,expected] of Object.entries(markers)){
 const item=W[ref];
 assert.equal(item.complete,true,'Source complete: '+ref);
 assert.equal(item.machine,false,'Not a machine-only excerpt: '+ref);
 assert.equal(item.checked,'2026-10-17');
 assert.equal(item.completeTextProvenance,'manual-crosscheck-current-SFS-paragraph-only');
 for(const phrase of expected)assert.ok(item.text.includes(phrase),ref+' lacks '+phrase);
 for(const c of base.filter(c=>c.statute===ref)){
  assert.equal(c.law,item.text,'Card should display full, not truncated paragraph: '+c.title);
  assert.equal(c.lawCompletenessVerified,true);
  assert.equal(c.lawCompletenessReviewScope,'current-paragraph-only');
  assert.notEqual(c.rekvisit15?.legalReviewApproved,true,'No full jurisprudential approval through source repair');
 }
}
assert.equal(base.filter(c=>c.rekvisit15?.legalReviewApproved===true).length,0);
const b=base.filter(c=>c.statute?.startsWith('BrB:'));
assert.equal(b.length,319);
const directCrosschecks=b.filter(c=>c.lawCompletenessVerified===true&&
 c.lawCompletenessReviewScope==='current-paragraph-only'&&
 c.lawCompletenessSourceURL?.includes('riksdagen.se'));
assert.equal(directCrosschecks.length,21+addedCards.length+propertyCards.length+officeCards.length+negligenceCards.length+newCards.length+economicCards.length+theftFraudCards.length+creditorCards.length+extra12Cards.length+ch4Cards.length+freedomCards.length,
 'All current SFS offence cards must carry narrow dated paragraph-crosscheck provenance');
assert.ok(!base.some(c=>c.statute==='BrB:13:12'),'13:12 is a stage authorization source, not a standalone completed crime');
assert.ok(b.some(c=>c.lawMode==='full'&&!c.lawCompletenessVerified),
 'Embedded full text without documented review must remain distinguishable');
console.log('PASS V1.5: one-hundred-fifteen complete current SFS paragraphs verified, without legal signoff');
