/* V1.5 – 33 source-scoped preliminary special-law requisite cards.
 * See SFS 2000:1225 3–13; 2014:307 2–8; 2010:1011 16,29–30a.
 * Machine-extracted paragraphs remain machine-EXCERPTS: nothing here
 * certifies complete text, full offence liability or custody.
 */
(()=>{'use strict';const D=window.BK_DATA,P=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!P)return;
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options}),R=(label,...groups)=>({label,groups});
const LAW={
 SmuglL:{version:'2026:1321',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/'},
 PTBL:{version:'2026:1323',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/'},
 LBE:{version:'2026:1584',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/'}
};
const smuggle=R('Alternativa gärningssätt enligt smugglingslagens 3 §',
 A('Varan måste omfattas av ett särskilt förbud eller villkor för införsel eller utförsel. Kontrollera 1–2 §§ och eventuell företrädesregel för annan författning.'),
 O('Ett av de lagstadgade sätten måste prövas med dess SÄRSKILDA följdvillkor:',
 'Underlåten anmälan vid införsel i strid med införselförbud eller villkor.',
 'Oriktig eller utelämnad uppgift vid tullbehandling som orsakar den i 3 § andra stycket angivna faran.',
 'Utförsel eller efterföljande förfogande i strid med utförselförbud eller villkor.',
 'Olovligt förfogande under tullbehandling som föranleder att otillåten införsel fullföljs.',
 'In- eller utförsel med tillstånd utverkat genom oriktig eller utelämnad uppgift.',
 'Förfogande som strider mot särskilda villkor vid införsel eller utförsel.'),
 A('Uppsåt krävs till den aktuella gärningsformen. När tullbehandling inte gäller inom EU kan den särskilda inregränslagen aktualiseras.'));
const grade=(parent,grade,other)=>R('Brottsgrad – helhetsbedömning',A('Rekvisiten för '+parent+' och dess särskilda varu-/farokrav måste vara uppfyllda.'),
 A(grade==='ringa'?'Gärningen är ringa enligt den angivna paragrafen.':grade==='grovt'?'Särskild grovhetsbedömning krävs; exemplen i lagtexten är inte automatiskt eller kumulativt avgörande.':'Synnerligen grov grad kräver särskild helhetsbedömning utifrån den lagstadgade kvalifikationsgrunden.'),
 A(other));
const smBase='Kontrollera varuslag, införsel-/utförselsituation, särskilt förbud/villkor och subsidiaritet enligt 1–3 §§. Ett styrkt smugglingstillfälle fastställer inte automatiskt brottsgrad. Särskild kriminalisering av försök/förberedelse/stämpling följer 14 § med olika listor; frivillig rättelse och åtalsvillkor följer 15 och 20 §§. Inga tvångsmedelsbefogenheter intygas.';
const dutyBase='Tullbrott enligt 8 § gäller risk för undandragande eller felaktig återbetalning av tull, skatt eller avgift som Tullverket ska besluta. Skilj från smugglingens införsel-/utförselförbud och från skattebrottslagen. Kontrollera frivillig rättelse enligt 15 § och särskilda åtalsregler enligt 20 §.';
const laundering='Kontrollera lagens 2 § om förbrott i Sverige eller motsvarande gärning utomlands. Särskilda syftesrekvisit i 3 § är ALTERNATIVA till otillbörlighetsrekvisitet i 4 §, inte samma kumulativa rekvisit. Egenbrottslighet, konkurs/återtagande och brottskonkurrens kräver bedömning; 8 § kriminaliserar särskilda förstadier men gör inte ringa näringspenningtvätt automatiskt straffbar i förstadium.';
const explos='Kontrollera den materiella tillståndsplikten och eventuellt undantag i 16 §, varudefinition i 4 § och särskild tillståndsreglering. 30 § utesluter ringa gärningar, vissa redan straffbelagda smuggling-/BrB-gärningar och överträdelser som omfattas av vitesföreläggande. 30 a § föreskriver förstadieansvar enbart för grova brott enligt 29 a §; tvinga inte ut ett positivt besked för andra grader.';
const rows=[];
const add=(title,code,sections,groups,note)=>rows.push({title,code,sections,groups,note});
add('Smuggling','SmuglL',['3'],[smuggle],smBase);
add('Ringa smuggling','SmuglL',['4','3'],[smuggle,grade('smuggling','ringa','4 § föreskriver penningböter, inte en särskild förstadierätt i 14 §.')],smBase);
add('Grov smuggling','SmuglL',['5','3'],[smuggle,grade('smuggling','grovt','5 § nämner systematik, större omfattning, särskilt farligt utförande och betydande samhällsintresse.')],smBase);
function product(kind,s,base,qualify){
 const [normal,ring,gross,syn]=kind;
 add(normal,'SmuglL',[s,'3'],[smuggle,R('Särskilt varuslag och straffregel',A(base),A('3 §-gärningen och dess uppsåt måste också föreligga.'),A(qualify||'Grundgärningens övriga villkor ska prövas.'))],smBase);
 add(ring,'SmuglL',[s,'3'],[smuggle,grade(normal,'ringa','Särskilda bötesalternativ i '+s+' §; kriminaliserade förstadier enligt 14 § kontrolleras individuellt.')],smBase);
 add(gross,'SmuglL',[s,'3'],[smuggle,grade(normal,'grovt','Beakta den särskilda kvalifikationslistan i '+s+' § avseende mängd, varans egenskaper, organiserad hantering och farlighet.')],smBase);
 add(syn,'SmuglL',[s,'3'],[smuggle,grade(normal,'synnerligen','Den uttryckliga kvalifikationslistan i '+s+' § gäller och en sammanvägd bedömning ska göras.')],smBase);
}
add('Narkotikasmuggling','SmuglL',['6','3'],[smuggle,R('Narkotika enligt 6 §',A('3 §-gärningen gäller narkotika enligt lagens definition.'),A('För grundfallet är uppsåtlig narkotikasmuggling straffbelagd utan ett allmänt krav på att narkotikan ska vara avsedd att säljas.'),A('Om den är avsedd att säljas gäller särskilt högre straffminimum i andra stycket.'))],smBase);
add('Narkotikasmuggling – avsedd att säljas','SmuglL',['6','3'],[smuggle,R('Särskild straffskalevariant i 6 § andra stycket',A('Gärningen uppfyller rekvisiten för narkotikasmuggling enligt 3 och 6 §§.'),A('Narkotikan är avsedd att säljas; detta är en straffskalevariant, inte ett ytterligare lagrum eller nytt fristående brott.'),A('Brottsgraden måste skiljas från ringa, grovt och synnerligen grovt.'))],smBase);
add('Ringa narkotikasmuggling','SmuglL',['6','3'],[smuggle,grade('narkotikasmuggling','ringa','Särskild förberedelsekriminalisering enligt 14 §; ringa grad kräver helhetsbedömning av gärningen.')],smBase);
add('Grov narkotikasmuggling','SmuglL',['6','3'],[smuggle,grade('narkotikasmuggling','grovt','Bland annat särskilt stor mängd, yrkesmässighet eller särskilt farlig/hänsynslös art enligt 6 §.')],smBase);
add('Synnerligen grov narkotikasmuggling','SmuglL',['6','3'],[smuggle,grade('narkotikasmuggling','synnerligen','Bland annat organiserad storskalig handel och synnerligen stor mängd i 6 §.')],smBase);
product(['Vapensmuggling','Ringa vapensmuggling','Grov vapensmuggling','Synnerligen grov vapensmuggling'],'6a','Gärningen enligt 3 § avser skjutvapen/vapen som omfattas av 2 och 6 a §§.','Tillstånd och gränspassage prövas separat.');
product(['Smuggling av explosiv vara','Ringa smuggling av explosiv vara','Grov smuggling av explosiv vara','Synnerligen grov smuggling av explosiv vara'],'6b','Gärningen enligt 3 § avser explosiv vara som omfattas av 2 och 6 b §§.','Ringa brott har penningböter, inte 6 a §-skalan.');
add('Olovlig införsel eller utförsel','SmuglL',['7','3'],[
 R('Grov oaktsamhet till angiven smugglingsgärning',A('Gärningen hänför sig till något av de uttryckliga alternativen i 7 §, som anknyter till 3, 6, 6 a eller 6 b §§.'),A('Grov oaktsamhet krävs. Vanlig oaktsamhet räcker inte.'),A('Vid alternativa oriktiga/uteblivna uppgifter krävs särskild föreskriven fara där 7 § anger det.'),A('Ringa gärning medför inte ansvar enligt 7 §.'))],smBase);
const duty=R('Uppsåtligt tullundandragande eller felaktig återbetalning',
 O('En tullbehandlingsgärning enligt 8 §:','Underlåten anmälan eller oriktig/utebliven uppgift vid införsel.','En särskild utförselsituation eller obehörigt förfogande under pågående tullbehandling.','Brott mot särskilt villkor för tullbefrielse eller nedsättning.'),A('Det uppstår den i 8 § föreskrivna faran för undandragande eller felaktigt tillgodoräknande/återbetalning.'),A('Uppsåt krävs; 8 § gäller endast tullar/skatter/avgifter som Tullverket ska besluta.'));
add('Tullbrott','SmuglL',['8'],[duty],dutyBase);
add('Ringa tullbrott','SmuglL',['9','8'],[duty,grade('tullbrott','ringa','9 § föreskriver penningböter.')],dutyBase);
add('Grovt tullbrott','SmuglL',['10','8'],[duty,grade('tullbrott','grovt','10 § pekar på mycket betydande belopp, falska handlingar, systematik eller särskild farlighet.')],dutyBase);
add('Vårdslös tullredovisning','SmuglL',['11','8'],[R('Oaktsam gärning enligt 8 §',A('De materiella gärningsformerna och faran i 8 § måste vara uppfyllda.'),A('Grov oaktsamhet krävs; rent misstag med vanlig oaktsamhet räcker inte.'),A('Ringa gärning medför inte ansvar enligt 11 §.'))],dutyBase);
const smugGoods=R('Olovlig hantering av smuggelgods',O('Befattningen enligt 12 §:','Emballera, transportera, förvara, dölja eller bearbeta.','Förvärva, överlåta eller ingå avtal om upplåtelse av panträtt.'),
 A('Varan har varit föremål för något av de föregående brotten enligt 3–11 §§.'),A('Ringa-undantag och särskilda företrädesregler för narkotika, vapen och explosiva varor i 12 § måste kontrolleras.'),
 O('Skuldform med olikartad straffskala:','Uppsåt till den angivna befattningen och föremålets brottsliga ursprung.','Insåg inte men hade skälig anledning att anta ursprunget (särskild bötesvariant enligt 12 §).'));
add('Olovlig befattning med smuggelgods','SmuglL',['12'],[smugGoods],smBase);
add('Grov olovlig befattning med smuggelgods','SmuglL',['13','12'],[smugGoods,grade('uppsåtlig olovlig befattning med smuggelgods','grovt','13 § grovhetsbedömning förutsätter gärning enligt 12 § FÖRSTA stycket; inte den oaktsamhetsliknande bötesvarianten.')],smBase);
const p3=R('Penningtvätt med särskilt syfte, 3 §',A('Egendomen härrör från brott eller brottslig verksamhet enligt 2–3 §§.'),A('Åtgärden syftar till att dölja egendomens brottsliga ursprung eller främja att någon tillgodogör sig egendomen eller dess värde.'),O('Gärningsformer enligt 3 §:','Överlåta, förvärva, omsätta, förvara eller liknande befattning.','Skapa eller hantera förklarande handling, skentransaktion, agera bulvan eller liknande.'));
const p4=R('Otillbörligt främjande utan 3 §-syftet, 4 §',A('Egendomen härrör från brott eller brottslig verksamhet.'),A('Åtgärden främjar på ett otillbörligt sätt någon annans möjlighet att omsätta egendomen.'),A('4 §-gärningen förutsätter inte samma särskilda syfte som 3 §.'));
add('Penningtvättsbrott','PTBL',['3','4'],[p3,p4],laundering);
add('Grovt penningtvättsbrott','PTBL',['5','3','4'],[p3,p4,grade('penningtvättsbrott enligt 3 eller 4 §','grovt','5 § nämner betydande värden, systematik, större omfattning och särskilt farlig art.')],laundering);
add('Penningtvättsförseelse','PTBL',['6','3','4'],[p3,p4,grade('penningtvättsbrott enligt 3 eller 4 §','ringa','6 § innehåller DESSUTOM en särskild ansvarsväg där den tilltalade inte insåg, men hade skälig anledning att anta, det brottsliga ursprunget.')],laundering);
const commerce=R('Näringspenningtvätt i verksamhet',O('Verksamhetskoppling:','I näringsverksamhet.','Som led i vanemässigt bedriven verksamhet.','Som led i annars mer omfattande verksamhet.'),A('Medverkan till åtgärd som skäligen kan antas vara vidtagen i det särskilda syfte som beskrivs i 3 §.'),A('Detta är en särskild konstruktion, inte ett krav att uppfylla alla 3 §-rekvisit för egen befattning.'));
add('Näringspenningtvätt','PTBL',['7','3'],[commerce],laundering);
add('Grov näringspenningtvätt','PTBL',['7','3'],[commerce,grade('näringspenningtvätt','grovt','7 § andra stycket föreskriver grov grad; bedöm gärningen i sin helhet.')],laundering);
add('Ringa näringspenningtvätt','PTBL',['7','3'],[commerce,R('Ringa eller särskilt utanförstående fall',O('Två separata grunder i 7 § tredje stycket:','Näringspenningtvätt som är ringa.','En person som annars, utanför första stycket, medverkar till åtgärd som skäligen kan antas vara vidtagen i sådant syfte enligt 3 §.'),A('Särskilda straffskale- och förstadieundantag för ringa fall måste kontrolleras.'))],laundering);
const permit=R('Tillståndsöverträdelse enligt 16 och 29 §§',A('Hantering, överföring, import eller export omfattas av tillståndsplikten i 16 § första stycket, utan tillämpligt undantag.'),A('Gärningspersonen bryter mot den tillståndsplikten.'),O('Skuldform enligt 29 § andra stycket:','Uppsåt','Grov oaktsamhet'),A('Kontrollera 30 § om ringa gärning, subsidiaritet och vite.'));
add('Brott mot tillståndsplikten för brandfarliga varor','LBE',['29','16','30'],[permit,R('Varuslag: brandfarliga varor',A('Överträdelsen gäller brandfarliga varor; straffskalan i 29 § andra stycket 1 skiljer sig från den för explosiva varor.'))],explos);
add('Brott mot tillståndsplikten för explosiva varor','LBE',['29','16','30'],[permit,R('Varuslag: explosiva varor',A('Överträdelsen gäller explosiva varor enligt 4 § och 29 § andra stycket 2.'))],explos);
add('Grovt brott mot tillståndsplikten för explosiva varor','LBE',['29a','29','16','30'],[permit,grade('uppsåtligt tillståndsbrott avseende explosiva varor','grovt','29 a § kräver UPPSÅT för grov grad; grov oaktsamhet räcker inte. Bedöm farlighet, mängd, miljö och allmän fara enligt paragrafen.')],explos);
add('Synnerligen grovt brott mot tillståndsplikten för explosiva varor','LBE',['29a','29','16','30'],[permit,grade('uppsåtligt tillståndsbrott avseende explosiva varor','synnerligen','29 a § anger särskilt antal/mängd och särskilt farliga varor. Brottet bedöms självständigt, inte automatiskt av 29 §-skalan.')],explos);
const report={planned:rows.length,added:0,held:[],already:[],fullTextPromotions:0,penaltyChanges:0,coercionApprovals:0,legalApprovals:0,
 laws:LAW,scope:'source-gated-preliminary-requisites-only'};
for(const r of rows){
 const c=D.crimes.find(c=>!c.stageType&&c.title===r.title);
 const l=LAW[r.code],docs=P[r.code];
 const extracted=r.sections.every(sec=>docs?.sections?.[sec]?.text?.length>20
  &&docs.sections[sec].text.startsWith(sec.replace(/([0-9]+)([a-z])/,'$1 $2')+' §'));
 const expectedRef=r.code+r.sections[0];
 if(!c||!l||docs?.observedVersion!==l.version||!extracted
   ||String(c.shortRef||'').replace(/\s+/g,'')!==expectedRef
   &&!(r.title==='Penningtvättsbrott'&&String(c.shortRef||'').startsWith('PTBL 3'))
   ||!['machine','full'].includes(c.lawMode)||c.rekvisit15?.legalReviewApproved===true){
  report.held.push(r.title);continue;
 }
 if(c.rekvisit15?.routes?.length||c.rekvisit15?.groups?.length){report.already.push(r.title);continue;}
 c.rekvisit15={groups:[],routes:r.groups,source:c.shortRef,sourceURL:l.url,
  verifiedOn:'2026-10-18',scope:'source-linked-preliminary-special-law-routes',
  legalReviewApproved:false,note:r.note+
   ' REKVISITEN ÄR PRELIMINÄRA och paragraferna endast maskinimporterade om separat fulltextcertifiering saknas; kontrollera självständigt mot gällande SFS, gärningsdag och rättspraxis.'};
 c.requisitesStatus='preliminary-special-law-not-final-approved';
 report.added++;
}
window.BK_SPECIAL33_REQUISITES15=report;
})();