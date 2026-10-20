/* BrB19: individually checked current statutory conduct and mens rea.
 * Scope is narrow: case-specific criminal liability, secrets classification,
 * international scope, constitutional/press exemptions, old law, stages,
 * prosecution authorizations, penalties and coercion all stay unapproved.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const law={
 '19:1':{need:['med uppsåt att riket eller del därav','med utländskt bistånd','handling som innebär fara','högförräderi'],
 obj:'Högförräderi omfattar en handling som medför fara för att riket ska underordnas främmande makt, bli beroende av den eller att en del ska lösryckas med våldsamma, annars lagstridiga medel eller utländskt bistånd. Även fara för påtvingade eller hindrade statsbeslut genom utländskt bistånd omfattas.',
 sub:'Ett uttryckligt SÄRSKILT UPPÅT att uppnå något av rikets underkastelse-, lösrycknings- eller statsmaktsbeslutssyftena krävs. Därutöver ska den konkreta handlingen innebära fara för att just detta syfte förverkligas.'},
 '19:2':{need:['med våldsamma medel eller utländskt bistånd','invecklas i krig eller andra fientligheter','högförräderi'],
 obj:'Krigsanstiftan förutsätter att gärningspersonen genom våldsamma medel eller utländskt bistånd framkallar fara för att Sverige ska dras in i krig eller andra fientligheter. Ansvar enligt bestämmelsen förutsätter att gärningen inte utgör högförräderi.',
 sub:'Uppsåt enligt 1:2 till det faroskapande handlandet och relevanta faktiska omständigheter krävs. Ett rent opinionsyttrande utan angivna våldsamma medel eller utländskt bistånd är inte automatiskt krigsanstiftan.'},
 '19:3':{need:['fått i uppdrag att för riket förhandla','missbrukar behörighet att företräda riket','orsakar riket avsevärt men'],
 obj:'Trolöshet vid förhandling med främmande makt förutsätter särskilt uppdrag att företräda eller bevaka rikets intressen, missbruk av behörighet eller av förtroendeställningen och därigenom avsevärt men för riket. Skada och dess samband med missbruket är självständiga objektiva krav.',
 sub:'Uppsåt till behörighets- eller förtroendemissbruket och relevanta faktiska omständigheter, däribland den avsevärda skadan för riket, måste bedömas enligt 1:2. En ogynnsam förhandling utan sådant uppsåtligt missbruk räcker inte.'},
 '19:4':{need:['svensk medborgare','utan tillstånd av regeringen','ombud för främmande makt','föregiven egenskap'],
 obj:'Egenmäktighet vid förhandling med främmande makt omfattar svensk medborgare som utan föreskrivet tillstånd blir ombud i diplomatisk angelägenhet om Sverige eller någon som utan behörighet förhandlar under sken av att vara behörigt ombud. Uttrycklig fara för självbestämning eller fredliga relationer kan påverka svårhetsgraden.',
 sub:'Uppsåt till det obehöriga ombudskapet eller den skenbara förhandlingshandlingen och relevanta faktiska förhållanden krävs. Legitima privata internationella kontakter är inte utan vidare diplomatisk representation enligt paragrafen.'},
 '19:5':{need:['för att gå en främmande makt eller motsvarande tillhanda','obehörigen anskaffar, befordrar, lämnar eller röjer','men för sveriges säkerhet'],
 obj:'Spioneri omfattar obehörig anskaffning, befordran, lämnande eller röjande av säkerhetsrelevant uppgift, eller framställning/befattning med föremål som innehåller sådan uppgift, när röjandet kan medföra men för Sveriges säkerhet och gärningen sker i främmande makts intresse.',
 sub:'Paragrafen kräver SÄRSKILT SYFTE att gå en främmande makt eller motsvarande tillhanda, utöver uppsåt till den obehöriga informationsgärningen. Detta särskilda syfte skiljer spioneri från obehörig befattning med hemlig uppgift enligt 19:7.'},
 '19:6':{need:['brott som avses i 5 §','grovt spioneri','synnerligen farlig beskaffenhet'],
 obj:'Grovt spioneri förutsätter samtliga grundrekvisit i 19:5, särskilt säkerhetsmen och främmandemaktssyfte. Vid grovhetsprövningen vägs bl.a. krigsläge, information av stor betydelse eller att gärningspersonen röjt förtrolig tjänsteuppgift.',
 sub:'Samma uttryckliga SYFTE att bistå främmande makt som i 19:5 krävs även för grov grad. Den rättsliga klassificeringen som grov ersätter inte prövningen av uppsåt och säkerhetsmen.'},
 '19:6a':{need:['i annat fall än som avses i 5 §','hemlig uppgift','mellanfolklig organisation','försvarlig'],
 obj:'Utlandsspioneri omfattar hemliga uppgifter i visst internationellt samarbete, där obehörigt röjande eller befattning i främmande makts intresse är ägnat att allvarligt skada Sveriges förhållanden till stat eller organisation. Brottet är subsidiärt till spioneri och har uttryckligt försvarlighetsundantag.',
 sub:'Ett uttryckligt SÄRSKILT SYFTE att gå främmande makt eller motsvarande tillhanda krävs utöver uppsåt till gärningen. Det lagstadgade försvarlighetsundantaget och skyddet för yttrande- och tryckfrihet är separata, ännu inte slutgranskade villkor.'},
 '19:6b':{need:['brott som avses i 6 a § är grovt','grovt utlandsspioneri','förhållande av stor betydelse'],
 obj:'Grovt utlandsspioneri förutsätter utlandsspioneri enligt 19:6 a, inklusive internationell sekretess, kvalificerad fara för Sveriges förhållanden och försvarlighetsundantaget. Grovhet bedöms särskilt med hänsyn till krigsläge, uppgifternas betydelse och förtroendeställning.',
 sub:'Det särskilda främmandemaktssyftet i 19:6 a består också vid grovt utlandsspioneri. Uppsåt till den obehöriga gärningen och de relevanta faktiska förhållandena ska prövas självständigt.'},
 '19:7':{need:['utan syfte att gå en främmande makt','hemlig natur','gäller också den som','försvarlig'],
 obj:'Obehörig befattning med hemlig uppgift gäller utan det särskilda syftet att bistå främmande makt, men kräver en gärning enligt 19:5 avseende uppgift av hemlig natur eller gärning enligt 19:6 a. Den internationella varianten har uttrycklig försvarlighetsbedömning.',
 sub:'Gärningspersonen handlar UTAN särskilt främmandemaktssyfte, vilket avgränsar paragrafen mot spioneri, men uppsåt till den obehöriga informationshandlingen och dess relevanta omständigheter krävs enligt huvudregeln.'},
 '19:8':{need:['brott som avses i 7 § är grovt','grov obehörig befattning','synnerligen farlig beskaffenhet'],
 obj:'Grov obehörig befattning med hemlig uppgift kräver grundgärning enligt 19:7 och separat grovhetsbedömning, med särskild hänsyn till risk för främmande makts intresse, krig, uppgiftens betydelse och missbruk av tjänstebaserat förtroende.',
 sub:'Uppsåt till grundgärningens obehöriga befattning krävs. Även här ersätter graderingen som grov inte kravet att grundbrottets särskilda objekt och förhållanden föreligger.'},
 '19:9a':{need:['för sveriges räkning deltar i ett samarbete','obehörigen röjer en hemlig uppgift','av grov oaktsamhet','försvarlig'],
 obj:'Röjande av hemlig uppgift i internationellt samarbete gäller en särskild svensk representant eller tjänstgörande i internationellt samarbete som obehörigen röjer hemlig uppgift ägnad att störa Sveriges internationella relationer, i andra fall än angivna grövre säkerhetsbrott. Försvarligt handlande undantas.',
 sub:'Paragrafen kriminaliserar uttryckligen UPPÅT eller GROV OAKTSAMHET i fråga om gärningen. Enbart vanlig oaktsamhet räcker inte för den särskilda grov-oaktsamhetsvarianten; försvarlighet och subsidiaritet prövas separat.'},
 '19:10':{need:['för att gå en främmande makt eller motsvarande tillhanda','hemligen eller med användande av svikliga medel','mer än tillfälligt','brottet är grovt'],
 obj:'Olovlig underrättelseverksamhet mot Sverige omfattar hemlig eller svikligt genomförd insamlingsverksamhet om säkerhetsskadliga uppgifter eller mer än tillfällig medverkan i sådan verksamhet. Grov grad kräver separat helhetsbedömning.',
 sub:'Ett uttryckligt SYFTE att gå främmande makt eller motsvarande tillhanda är rekvisit utöver uppsåt till den dolda verksamheten. Enstaka passiv uppgiftskännedom utan angiven verksamhet/medverkan är inte automatiskt detta brott.'},
 '19:10a':{need:['för att gå en främmande makt eller motsvarande tillhanda','här i landet','annan främmande makts säkerhet','brottet är grovt'],
 obj:'Olovlig underrättelseverksamhet mot främmande makt gäller här i Sverige bedriven uppgiftsinsamling eller mer än tillfällig medverkan som kan skada en annan främmande makts säkerhet. Gärningens geografiska förutsättning och särskilda uppgiftstyp måste konstateras.',
 sub:'Det krävs uttryckligt SYFTE att gå främmande makt eller motsvarande tillhanda och uppsåt till bedriven eller understödd informationsverksamhet. Särskild åtalsbegränsning finns i 19:16 och är ännu inte slutgodkänd.'},
 '19:10b':{need:['med uppsåt att gå en främmande makt','här i landet','personliga förhållanden','mer än tillfälligt'],
 obj:'Olovlig underrättelseverksamhet mot person omfattar i Sverige hemligen eller med svikliga eller otillbörliga medel bedriven verksamhet för information om annans personliga förhållanden, eller mer än tillfällig medverkan i sådan verksamhet. Grov grad regleras separat.',
 sub:'Ett uttryckligt SÄRSKILT UPPÅT att gå främmande makt eller motsvarande tillhanda måste visas, samtidigt som de hemliga eller otillbörliga metoderna och den personliga informationsinriktningen omfattas av relevant uppsåt.'},
 '19:12':{need:['utan regeringens tillstånd','här i landet värvar','främmande krigstjänst'],
 obj:'Olovlig värvning är utan regeringens tillstånd i Sverige utförd värvning av annan till främmande krigstjänst eller jämförbar tjänst. Paragrafen har särskild regel för om Sverige var i krig; värvningsgärningen och platsen är objektiva avgränsningar.',
 sub:'Uppsåt till själva värvningen och tjänstens faktiska karaktär samt omständigheterna kring avsaknad av tillstånd måste prövas enligt 1:2. Särskilt åtalsförordnande enligt 19:16 är ett självständigt fortsatt kontrollkrav.'},
 '19:13':{need:['tar emot pengar eller annan egendom','påverka den allmänna meningen','sveriges statsskick'],
 obj:'Tagande av utländskt understöd omfattar mottagande av pengar eller annan egendom från främmande makt eller dess mellanhand, med särskild anknytning till spridning/påverkan i fråga om grundläggande statsskick eller säkerhetspolitiska frågor som beslutas av riksdag/regering.',
 sub:'Uppsåt krävs till mottagandet och dess särskilda koppling till påverkansändamålet. Mottagande av utländska medel i allmänhet, utan detta specificerade syfte och koppling till främmande makt, omfattas inte automatiskt.'}
};
const titles=[
 ['Högförräderi','19:1'],['Krigsanstiftan','19:2'],['Trolöshet vid förhandling med främmande makt','19:3'],
 ['Egenmäktighet vid förhandling med främmande makt','19:4'],
 ['Spioneri','19:5'],['Grovt spioneri','19:6'],
 ['Utlandsspioneri','19:6a'],['Grovt utlandsspioneri','19:6b'],
 ['Obehörig befattning med hemlig uppgift','19:7'],['Grov obehörig befattning med hemlig uppgift','19:8'],
 ['Röjande av hemlig uppgift i internationellt samarbete','19:9a'],
 ['Olovlig underrättelseverksamhet mot Sverige','19:10'],['Grov olovlig underrättelseverksamhet mot Sverige','19:10'],
 ['Olovlig underrättelseverksamhet mot främmande makt','19:10a'],['Grov olovlig underrättelseverksamhet mot främmande makt','19:10a'],
 ['Olovlig underrättelseverksamhet mot person','19:10b'],['Grov olovlig underrättelseverksamhet mot person','19:10b'],
 ['Olovlig värvning','19:12'],['Tagande av utländskt understöd','19:13']
];
const extra=' Den grova graden kräver en egen helhetsprövning av grovhetsomständigheter; ansvarsgrund, särskilt syfte och den skyddade uppgiftens/relationsförhållandets art ska fortfarande vara uppfyllda.';
const source=(ref,v)=>{const x=W['BrB:'+ref];return !!(x?.complete===true
 &&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&x.url===SRC&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')
 &&x.text?.length>110&&v.need.every(x=>n(x).length>3&&n(W['BrB:'+ref].text).includes(n(x))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 sourceURL:SRC,checked:'2026-10-20',fullLegalCards:0,offenceDatesReviewed:0,
 constitutionalReviewApproved:0,specialProsecutionApproved:0,stageApprovals:0,coercionApproved:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,completed:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing/changed offence or prior review'});continue;}
 const cl=law[ref],ok=source(ref,cl)&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const suf=/^(Grov |Grovt )/.test(title)?extra:'',checks={};
 for(const [k,finding] of Object.entries({objective:cl.obj+suf,subjective:cl.sub+suf})){
  if(ok&&finding.length>=115){checks[k]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
   sourceReferences:['BrB '+ref,...(k==='subjective'?['BrB 1:2']:[])],finding,
   scope:'current-BrB19-statutory-conduct-or-specific-fault-only',
   caseSpecificCriminalLiabilityApproved:false,offenceDateVersionApproved:false,
   allSecrecyAndConstitutionalExceptionsApproved:false,caseLawApproved:false,
   specialProsecution19_16Approved:false,inchoateStagesApproved:false,
   caseSpecificCoercivePowerApproved:false};
   report.completed++;report.byType[k]++;row.completed.push(k);
  }else{report.held.push({title,k,reason:'source or individual card invariant not verified'});row.held.push(k);}
 }
 if(row.completed.length)c.legalAudit15={schema:1,sourceAudit:'BrB19-2026-10-20',checkpoints:checks,
  fullLegalReviewApproved:false,historicApplicabilityPending:true,
  securityAndConstitutionalDoctrinePending:true,internationalAndSecrecyExceptionsPending:true,
  stageProsecution19_16AndCoercionPending:true};
}
window.BK_BRB19_BASE_AUDIT15=report;
})();