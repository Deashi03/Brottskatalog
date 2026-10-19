/* BrB 8:1-12, current Swedish criminal code, Oct 2026.
 * THIRTEEN independently specified offence cards: objective alternatives,
 * subjective statutory fault/intent and enumerated inchoate-stage scope.
 * The narrower BrB 8:13 prosecution rule, gradpraxis, historical text,
 * competing offences and police powers remain separately pending.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const norm=t=>String(t||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const full=(ref,phrases)=>{const p=W['BrB:'+ref];return Boolean(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===URL&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')&&p.text?.length>80
 &&phrases.every(q=>norm(p.text).includes(norm(q))));};
const ok={
 '8:1':full('8:1',['olovligen tager vad annan tillhör','uppsåt att tillägna sig','innebär skada']),
 '8:2':full('8:2',['med hänsyn till det tillgripnas värde','övriga omständigheter','ringa stöld']),
 '8:4':full('8:4',['grov stöld','hade i sin omedelbara närhet','sprängämne','systematiskt']),
 '8:4a':full('8:4a',['efter intrång i bostad eller annat liknande boende','av mindre allvarlig art']),
 '8:5':full('8:5',['hot som innebär eller för den hotade framstår som trängande fara','betalningsverktyg','anträffats på bar gärning','motvärn','mindre allvarlig art']),
 '8:6':full('8:6',['grovt rån','våldet har varit livsfarligt','särskilt farlig art']),
 '8:7':full('8:7',['olovligen tar och brukar ett motorfordon','inte är belagd med straff enligt 1, 2 eller 4-6 §§','grovt tillgrepp av fortskaffningsmedel']),
 '8:8':full('8:8',['olovligen tar och brukar eller på annat sätt tillgriper','rubbar någon annans besittning','hålla kvar eller ta något','grovt egenmäktigt förfarande']),
 '8:9':full('8:9',['för att själv ta sig rätt','självtäkt']),
 '8:10':full('8:10',['olovligen avleder elektrisk kraft','värmeenergi','grov olovlig energiavledning']),
 '8:12':full('8:12',['försök eller förberedelse till stöld','för stämpling till grov stöld eller inbrottsstöld','stämpling till eller underlåtenhet att avslöja eller förhindra rån','skulle tillgrepp av fortskaffningsmedel','ringa'])
};
const defaultFault=norm(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const specs=[
 {t:'Stöld',ref:'8:1',parents:[],stages:'FP',objective:'Olovligt tagande av ett föremål som tillhör någon annan, med en inträffad besittnings- eller egendomsförlust som innebär skada. Objektet, olovligheten, tillgreppshandlingen och skadan måste prövas självständigt.',
 fault:'Uppsåt enligt 1:2 och uttryckligt tillägnelseuppsåt i 8:1: gärningspersonen ska ha avsett att förfoga över det tagna som sitt. Att bara låna och bruka utan tillägnelseuppsåt kan i stället aktualisera annat brott.',
 inchoate:'BrB 8:12 medger försök och förberedelse till stöld. Stämpling till stöld av normalgraden är inte uppräknad. En konkret prövning enligt BrB 23 kap. behövs för varje positivt förstadium.'},
 {t:'Ringa stöld',ref:'8:2',parents:['8:1'],stages:'',objective:'Stöldgrundrekvisiten i 8:1 måste vara uppfyllda: olovligt tillgrepp, främmande tillhörighet, tillägnelseuppsåt och skada. Graden är ringa efter värde och övriga gärningsomständigheter; ett enskilt värde får inte ersätta helhetsbedömningen.',
 fault:'Det uttryckliga tillägnelseuppsåtet i 8:1 kvarstår även vid ringa grad och bedöms tillsammans med uppsåt till tillgreppet och andra objektiva omständigheter.',
 inchoate:'BrB 8:12 nämner stöld men inte ringa stöld i uppräkningen av straffbara förstadier. Ringa stöld får därför inte automatiskt ges försöks-, förberedelse- eller stämplingsansvar.'},
 {t:'Grov stöld',ref:'8:4',parents:['8:1'],stages:'FPS',objective:'Stöld enligt 8:1 med en självständig grovhetsbedömning enligt 8:4. Särskilt beakta egendom buren av någon eller i omedelbar närhet, vapen eller sprängmedel, systematiskt förfarande, särskilt farligt eller hänsynslöst tillvägagångssätt, betydande värde eller synnerligen kännbar skada.',
 fault:'Uppsåt till stöldrekvisiten inklusive tillägnelse enligt 8:1. Grovhetsgrunderna är en samlad rättslig värdering av gärningens faktiska omständigheter, inte ett fristående oaktsamhetsbrott.',
 inchoate:'BrB 8:12 upptar försök, förberedelse och stämpling till grov stöld. Straffskalor för förstadier och konkret risk eller beredningsgärning följer BrB 23 kap. och får inte härledas mekaniskt.'},
 {t:'Inbrottsstöld',ref:'8:4a',parents:['8:1'],stages:'FPS',objective:'Fullbordad stöld enligt 8:1 ska ha skett efter intrång i bostad eller liknande boende. Är integritetskränkningen eller omständigheterna av mindre allvarlig art ska rubriceringen inte användas; bedöm då de andra brott gärningen innehåller.',
 fault:'Uppsåt till stölden, dess tillägnelse och de faktiska intrångs- och boendeförhållandena enligt 8:1 och 8:4 a krävs. Ett intrång utan stöldens övriga rekvisit blir inte inbrottsstöld.',
 inchoate:'BrB 8:12 uppräknar försök, förberedelse och stämpling till inbrottsstöld. Skyddet för boendets integritet och den särskilda mindre-allvarlig-regeln måste avgränsas i den konkreta prövningen.'},
 {t:'Rån',ref:'8:5',parents:['8:1'],stages:'FPS',objective:'Brottet omfattar flera skilda gärningsvägar: stöld med våld eller hot om trängande fara, framtvingad disposition med vinning och skada, tillgrepp av betalningsverktyg med särskilt vinningssyfte, eller motvärnsrån på bar gärning. Vanmakt likställs med våld; mindre allvarlig gärning faller utanför rån.',
 fault:'Uppsåt till våldet/hotet och den valda tillgrepps- eller tvångsvägen. Tillgrepp av betalningsverktyg enligt tredje alternativet fordrar särskilt syfte att använda verktyget till vinning. Stöldalternativet innefattar stöldens tillägnelseuppsåt.',
 inchoate:'BrB 8:12 straffbelägger försök, förberedelse och stämpling till rån samt särskilt underlåtenhet att avslöja eller förhindra rån. Sistnämnda underlåtenhetsansvar är inte samma sak som stämpling.'},
 {t:'Grovt rån',ref:'8:6',parents:['8:5'],stages:'FPS',objective:'Ett rån enligt någon av gärningsvägarna i 8:5 och därutöver en samlad grovhetsvärdering. Särskilt livsfarligt våld, svår kroppsskada eller allvarlig sjukdom, synnerlig råhet eller hänsynslöst utnyttjande av skyddslöshet eller annan särskilt farlig art beaktas.',
 fault:'Uppsåt till rångärningen och dess faktiska omständigheter enligt 8:5, inklusive särskilt vinningssyfte för betalningsverktygsalternativet. Grovheten är ingen fristående oaktsamhetsform.',
 inchoate:'BrB 8:12 räknar upp försök, förberedelse och stämpling även till grovt rån samt underlåtenhet att avslöja eller förhindra. Den konkreta brottsgraden och villkoren i 23 kap. kräver separat bedömning.'},
 {t:'Tillgrepp av fortskaffningsmedel',ref:'8:7',parents:[],stages:'FP',objective:'Olovligt tagande OCH brukande av ett motorfordon eller annat motordrivet fortskaffningsmedel som tillhör en annan. Straffbudet är subsidiärt till stöld, ringa stöld, grov stöld, inbrottsstöld och rån enligt 8:1, 2, 4–6.',
 fault:'Uppsåt till att ta och bruka någon annans motordrivna fortskaffningsmedel olovligen. Något uttryckligt tillägnelseuppsåt enligt 8:1 behövs inte, vilket skiljer detta brott från stöld.',
 inchoate:'BrB 8:12 ger försök och förberedelse till tillgrepp av fortskaffningsmedel endast i icke-ringa fullbordanshypotes. Stämpling är inte upptagen; när fullbordat brott skulle vara ringa föreskriver 8:12 ett uttryckligt undantag.'},
 {t:'Grovt tillgrepp av fortskaffningsmedel',ref:'8:7',parents:[],stages:'FP',objective:'Olovligt tagande och brukande enligt 8:7 med förhöjd grad. Särskilt våld eller hot, särskilt farlig/hänsynslös art, betydande värde eller synnerligen kännbar skada ska beaktas. Även den föreskrivna subsidiariteten mot 8:1–2 och 4–6 gäller.',
 fault:'Uppsåt till det olovliga tagandet och brukandet, samt de faktiska omständigheter som åberopas för grov grad. Grovhet följer en särskild helhetsbedömning och ersätter inte grundgärningen.',
 inchoate:'BrB 8:12 anger försök och förberedelse även till grovt tillgrepp av fortskaffningsmedel, men inte stämpling. Undantaget i 8:12 för hypotetiskt ringa fullbordansbrott påverkar inte grov grad.'},
 {t:'Egenmäktigt förfarande',ref:'8:8',parents:[],stages:'',objective:'Tre olika gärningsvägar: olovligt tagande och brukande eller annat tillgrepp i annat fall än 8 kap. i övrigt; utan tillgrepp olovlig besittningsrubbning som vållar skada eller olägenhet; eller våld/hot som hindrar en person från att utöva sin rätt att hålla kvar eller ta något.',
 fault:'Uppsåt till den valda olovliga tillgrepps- eller besittningsrubbningshandlingen och dess omständigheter. Egenmäktigt förfarande kräver inte alltid stöldens tillägnelseuppsåt.',
 inchoate:'BrB 8:12 räknar inte upp egenmäktigt förfarande för försök, förberedelse eller stämpling. Att gärningen är otillbörlig eller har ett stort värde skapar inte ensamt förstadiestraffbarhet.'},
 {t:'Grovt egenmäktigt förfarande',ref:'8:8',parents:[],stages:'',objective:'Gärningen måste omfattas av en av de tre formerna i 8:8; vid grov grad beaktas särskilt våld eller hot, särskilt farligt/hänsynslöst tillvägagångssätt, betydande värde eller synnerligen kännbar skada. Graden får inte ersätta besittningsrubbningens rekvisit.',
 fault:'Uppsåt till en olovlig gärning enligt 8:8 och dess faktiska omständigheter. Grövre effekt eller ekonomiskt värde medför inte någon separat vårdslöshetsform i samma brott.',
 inchoate:'Varken försök, förberedelse eller stämpling till grovt egenmäktigt förfarande finns uppräknat i 8:12. Den grova gradens högre straffskala ersätter inte krav på särskilt förstadielagstöd.'},
 {t:'Självtäkt',ref:'8:9',parents:['8:8'],stages:'',objective:'Gärningspersonen vidtar en handling av det slag som anges i 8:8, men gör det i syfte att själv ta sig rätt. Den underliggande handlingens rekvisit och det särskilda självrättelseändamålet måste föreligga.',
 fault:'Uppsåt till den olovliga besittningspåverkande handlingen samt ett uttryckligt särskilt syfte att själv ta sig rätt. Enbart upplevd rätt till egendomen medför inte generell rätt att använda tvång.',
 inchoate:'Självtäkt räknas inte upp bland de brott vars försök, förberedelse eller stämpling är straffbelagda enligt BrB 8:12.'},
 {t:'Olovlig energiavledning',ref:'8:10',parents:[],stages:'FP',objective:'Olovlig avledning av elektrisk kraft eller av värmeenergi ur ett uppvärmningssystem eller till ett kylsystem genom rörledning. Den särskilda energihandlingen måste identifieras; ett generellt obehörigt elanvändande får inte utan vidare likställas med avledning.',
 fault:'Uppsåt till den olovliga energiavledningen och de faktiska energiförhållandena krävs enligt BrB 1:2. Gärningen är inte kriminaliserad som ren oaktsamhet i 8:10.',
 inchoate:'BrB 8:12 anger försök och förberedelse till olovlig energiavledning. Stämpling är inte uppräknad för normalgraden, trots att annan brottslighet kan tänkas beroende på omständigheterna.'},
 {t:'Grov olovlig energiavledning',ref:'8:10',parents:[],stages:'FP',objective:'En olovlig avledning av el eller särskilt angiven värmeenergi enligt 8:10 ska vara grov efter en samlad bedömning. Särskilt farlig art, betydande värde eller synnerligen kännbar skada anges som viktiga indikatorer.',
 fault:'Uppsåt till den olovliga energiavledningen och dess relevanta faktiska omständigheter krävs; grovhetsgrunden är en bedömning av gärningen, inte ett separat oaktsamhetsbrott.',
 inchoate:'BrB 8:12 omfattar försök och förberedelse till grov olovlig energiavledning men inte stämpling. Även ett brott med högt straffmaximum kräver uttryckligt stadgande för stämpling.'}
];
const codes={F:'forsok',P:'forberedelse',S:'stampling'};
const report={planned:specs.length*3,completed:0,byKind:{objective:0,subjective:0,inchoate:0},
 reviewed:'2026-10-20',held:[],byOffence:[],source:URL,
 caseSpecificLiabilityApprovals:0,completedOffenceReviews:0,
 historicApplicabilityApprovals:0,prosecutionApprovals:0,coercionApprovals:0};
for(const x of specs){
 const c=D.crimes.find(v=>!v.stageType&&v.title===x.t);
 const a={title:x.t,done:[],held:[]};report.byOffence.push(a);
 if(!c||c.statute!=='BrB:'+x.ref||c.legalAudit15?.checkpoints){
  report.held.push({title:x.t,why:'missing/offence mismatch or earlier evidence'});continue;
 }
 const baseReady=ok[x.ref]&&x.parents.every(y=>ok[y])&&
  c.lawMode==='full'&&c.lawCompletenessVerified===true
  &&c.lawCompletenessSourceURL===URL&&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 let stageReady=baseReady&&ok['8:12'];
 const related=D.crimes.filter(s=>s.stageType&&s.stageParentId===c.id);
 for(const [code,kind] of Object.entries(codes)){
  const s=related.find(v=>v.stageType===kind),positive=x.stages.includes(code);
  if(positive&&(!s||s.stageStatus!=='punishable'||s.individualLegalAudit15?.scope?.status!=='APPROVED'))stageReady=false;
  if(!positive&&s&&s.stageStatus!=='not-criminalized')stageReady=false;
 }
 const tests={objective:baseReady,subjective:baseReady&&defaultFault,inchoate:stageReady};
 const notes={objective:x.objective,subjective:x.fault,inchoate:x.inchoate};
 const steps={};
 for(const [kind,pass] of Object.entries(tests)){
  if(pass&&notes[kind].length>=95){
   steps[kind]={status:'APPROVED',checked:'2026-10-20',sourceURL:URL,
    sourceRefs:kind==='inchoate'?['BrB 8:12','BrB 23:1–2']:kind==='subjective'?['BrB 1:2','BrB '+x.ref,...x.parents.map(v=>'BrB '+v)]:['BrB '+x.ref,...x.parents.map(v=>'BrB '+v)],
    finding:notes[kind],scope:'current-legal-text-element-only',
    caseSpecificLiabilityApproved:false,offenceDateAndTransitionalLawApproved:false,
    jurisprudenceApproved:false,caseSpecificCustodyApproved:false,
    caseSpecificProsecutionApproved:false,allCompetingOffencesReviewed:false};
   report.completed++;report.byKind[kind]++;a.done.push(kind);
  }else{report.held.push({title:x.t,kind,why:'individually required statute or catalog stage did not validate'});a.held.push(kind);}
 }
 if(a.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB8-2026-10-20',checkpoints:steps,
 fullLegalReviewApproved:false,crimeDateStillPending:true,
 caseLawAndCompetitorsStillPending:true,prosecutionAndCoercionPending:true,
 criminalGradeAndPenaltyStillPending:true};
}
window.BK_BRB8_BASE_AUDIT15=report;
})();