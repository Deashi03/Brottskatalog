/* V1.5: exact 2026 statutory alternatives for child-peace and stalking
 * BrB 4:3 and 4:4 b. Full current paragraphs source-checked 2026-10-18.
 * Pedagogical OCH/ELLER assistance only; not legal certification or an
 * automatic finding of criminality, offence grade, guilt or custody.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const valid=key=>{const s=W[key];return Boolean(s?.complete&&
 s.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 s.checked==='2026-10-18'&&s.url===SRC);};
const childGroups=[
 A('Ett brott eller ett straffbart försök som omfattas av den uttömmande listan i BrB 4:3 ska föreligga.'),
 O('Den bevittnade gärningen tillhör någon av lagens FEM uttryckliga kategorier:',
  'BrB 3:1, 3:2, 3:5 eller 3:6 – mord, dråp, misshandel, grov misshandel eller synnerligen grov misshandel.',
  'BrB 4:1, 4:2, 4:4, 4:5, 4:6, 4:7 eller 4:7 b – människorov, olaga frihetsberövande, olaga tvång, grovt olaga tvång, olaga hot, grovt olaga hot, hemfridsbrott, grovt hemfridsbrott, ofredande eller psykiskt våld.',
  'BrB 6:1, 6:2, 6:4, 6:5, 6:6 eller 6:10 – de uttryckligen angivna sexualbrotten, inklusive relevanta grova grader och brott mot barn.',
  'BrB 12:1 eller 12:3 – skadegörelse eller grov skadegörelse.',
  'Ett straffbart försök till ett sådant brott som anges i någon av de fyra föregående kategorierna.'
 ),
 A('Ett barn har BEVITTNAT den aktuella brottsliga gärningen (det räcker inte att barnet bara har befunnit sig någon annanstans i bostaden).'),
 A('Barnet är närstående eller tidigare närstående till BÅDE gärningspersonen och den person som den bevittnade gärningen riktats mot.'),
 A('Uppsåt enligt BrB 1:2 och övriga tillämpliga ansvarsrekvisit måste bedömas särskilt; bevittnande och de båda närståendeförhållandena ska prövas i det konkreta ärendet.')
];
const stalkingOptions=[
 'Misshandel enligt BrB 3:5 eller STRAFFBART försök till misshandel som inte är ringa.',
 'Olaga tvång enligt BrB 4:4 första stycket.',
 'Olaga hot enligt BrB 4:5 första stycket.',
 'Hemfridsbrott enligt BrB 4:6 första stycket eller olaga intrång enligt andra stycket.',
 'Kränkande fotografering enligt BrB 4:6 a.',
 'Olovlig identitetsanvändning enligt BrB 4:6 b.',
 'Olaga integritetsintrång enligt BrB 4:6 c.',
 'Ofredande enligt BrB 4:7.',
 'Uppmaning till självmord eller oaktsam uppmaning till självmord enligt BrB 4:7 a.',
 'Psykiskt våld enligt BrB 4:7 b.',
 'Förtal eller grovt förtal enligt BrB 5:1 eller 5:2.',
 'Förolämpning enligt BrB 5:3.',
 'Sexuellt ofredande mot barn enligt BrB 6:10 första stycket eller sexuellt ofredande enligt andra stycket.',
 'Skadegörelse enligt BrB 12:1 eller straffbart försök till sådan skadegörelse.',
 'Ringa skadegörelse enligt BrB 12:2.',
 'Våld eller hot mot tjänsteman enligt BrB 17:1 FÖRSTA stycket eller straffbart försök.',
 'Angrepp mot tjänsteman enligt BrB 17:2 FÖRSTA och ANDRA styckena eller straffbart försök.',
 'Förolämpning mot tjänsteman enligt BrB 17:3.',
 'Överträdelse av kontaktförbud, utvidgat eller särskilt utvidgat kontaktförbud enligt 24 § kontaktförbudslagen.'
];
const stalkingGroups=[
 A('Gärningspersonen förföljer en och samma person genom att begå eller på annat sätt medverka till flera brottsliga gärningar.'),
 O('Varje beaktad gärning måste självständigt motsvara minst EN av de 19 uttryckligen uppräknade brottstyperna i BrB 4:4 b:',...stalkingOptions),
 A('VAR OCH EN av gärningarna har utgjort ett led i en upprepad kränkning av den utsatta personens integritet.'),
 A('Uppsåt, brottslig medverkan och respektive grundbrotts egna rekvisit måste prövas, inklusive uttryckliga begränsningar till vissa stycken och straffbara försök.')
];
const report={planned:4,updated:0,missing:[],held:[],source:SRC,date:'2026-10-18',
  statute4_3Checked:valid('BrB:4:3'),statute4_4bChecked:valid('BrB:4:4b'),
  stalkingStatutoryAlternatives:stalkingOptions.length,stageEntriesModified:0};
const specs=[
 ['Barnfridsbrott','BrB:4:3',childGroups,null],
 ['Ringa barnfridsbrott','BrB:4:3',childGroups,'Den bevittnade gärningen och omständigheterna bedöms särskilt vid fråga om ringa grad. Lagens rubricering har en särskild bötes-/fängelseskala.'],
 ['Grovt barnfridsbrott','BrB:4:3',childGroups,'Särskilt beaktas om den bevittnade gärningen varit av mycket allvarlig art eller om gärningspersonen visat särskild hänsynslöshet. Detta är en SAMMANVÄGD gradbedömning.'],
 ['Olaga förföljelse','BrB:4:4b',stalkingGroups,null]
];
for(const [title,key,groups,gradeNote] of specs){
 const c=D.crimes.find(c=>!c.stageType&&c.title===title);
 if(!c){report.missing.push(title);continue;}
 if(c.statute!==key||!valid(key)){report.held.push({title,ref:c.statute,reason:'source-review-or-reference-mismatch'});continue;}
 c.rekvisit15={
  groups:groups.map(g=>({...g,options:g.options?[...g.options]:undefined})),
  routes:[],
  source:key.replace(/:/g,' ').replace('BrB ','BrB '),
  sourceURL:SRC,
  scope:'current-statutory-OCH-ELLER-2026-10-18',
  verifiedOn:'2026-10-18',
  legalReviewApproved:false,
  note:(gradeNote?gradeNote+' ':'')+'Endast källjämfört rekvisitstöd. Kontrollera tillämpligt gärningsdatum, brottens lagstöd och praxis; denna checklista fastställer inte skuld, grad, straffbarhet för förstadier eller rätt till tvångsmedel.'
 };
 c.requisitesStatus='statute-structured-legal-review-pending';
 report.updated++;
}
window.BK_BRB4_CHILD_STALKING_REQUISITES15=report;
})();