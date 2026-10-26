/* V1.6: additional traffic offences absent from the existing catalogue.
   Statutory text and sentencing conditions: SFS 1951:649, current to 2024:715;
   individually checked 2026-10-22; wording re-verified against data.riksdagen.se 2026-10-26. No offences punished by penningböter only. */
(()=>{'use strict';
const url='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/';
const section1=`1 § Brister vägtrafikant, den som för spårvagn eller den som någon annanstans än på väg för motordrivet fordon i väsentlig mån i den omsorg och varsamhet som till förekommande av trafikolycka betingas av omständigheterna, döms för vårdslöshet i trafik till dagsböter.

Om någon vid förande av motordrivet fordon eller spårvagn gör sig skyldig till grov oaktsamhet eller visar uppenbar likgiltighet för andra människors liv eller egendom, döms för grov vårdslöshet i trafik till fängelse i högst två år. Lag (1994:1416).`;
const section2='2 § Hindrar eller stör vägtrafikant eller den som för spårvagn onödigtvis i väsentlig mån trafiken på väg, dömes, där ej gärningen är belagd med straff enligt 1 §, till böter. Lag (1975:611).';
const section3='3 § (tredje stycket) Om någon uppsåtligen eller av oaktsamhet såsom förare av körkortspliktigt fordon anställer och brukar den som inte äger rätt att föra fordonet, eller i annat fall tillåter någon annan att föra sådant fordon utan att denne är berättigad därtill, dömes likaledes till böter. Lag (2009:122).';
const section5=`5 § Om en vägtrafikant, som med eller utan skuld haft del i uppkomsten av en trafikolycka, genom att avlägsna sig från olycksplatsen undandrar sig att i mån av förmåga medverka till de åtgärder, vartill olyckan skäligen bör föranleda, eller om han undandrar sig att uppge namn och hemvist eller att lämna upplysningar om händelsen, döms till böter eller fängelse i högst sex månader.

Är brottet med hänsyn till omständigheterna att anse som grovt, döms till fängelse i högst ett år.

Bestämmelserna i första och andra styckena gäller även den som för spårvagn och den som annorstädes än på väg för motordrivet fordon. Lag (1986:1248).`;
const rows=[
 ['Vårdslöshet i trafik','1 § första stycket',0,0,'Dagsböter','Dagsböter','vårdslöshet;trafikfara',section1,['Väsentlig brist i den omsorg och varsamhet som omständigheterna kräver för att förekomma trafikolycka.']],
 ['Grov vårdslöshet i trafik','1 § andra stycket',0,2,'Fängelse i högst två år','F 2 år','grov vårdslöshet;grov oaktsamhet;trafikfarlig körning',section1,['Förande av motordrivet fordon eller spårvagn.','Grov oaktsamhet eller uppenbar likgiltighet för andras liv eller egendom.']],
 ['Onödigt hindrande av trafik','2 §',0,0,'Böter','Böter','onödigt hinder;störa trafiken',section2,['Vägtrafikant eller spårvagnsförare.','Onödigt hindra eller störa trafik på väg i väsentlig mån.','Gärningen får inte omfattas av straff enligt 1 §.']],
 ['Tillåtande av olovlig körning','3 § tredje stycket',0,0,'Böter','Böter','låna bil utan körkort;tillåta olovlig körning',section3,['Uppsåtligen eller oaktsamt tillåta någon som saknar behörighet att köra körkortspliktigt fordon.']],
 ['Smitning från trafikolycksplats','5 § första stycket',0,.5,'Böter eller fängelse i högst sex månader','B–F 6 mån','smitning;obehörigt avvikande från trafikolycksplats',section5,['Har med eller utan skuld haft del i uppkomsten av en trafikolycka.','Undandrar sig skyldigheten att medverka, uppge identitet eller lämna upplysningar enligt 5 §.']],
 ['Grov smitning från trafikolycksplats','5 § andra stycket',0,1,'Fängelse i högst ett år','F 1 år','grov smitning;grovt obehörigt avvikande från trafikolycksplats',section5,['Gärning enligt 5 § första stycket.','Brottet är grovt med hänsyn till omständigheterna.']]
];
// 1.7: söknamn som inte är lagens egen brottsbeteckning märks uttryckligen.
const designations={
 'Onödigt hindrande av trafik':'Beskrivande sökbenämning – lagen saknar egen brottsbeteckning. Ange brottet som brott mot 2 § lagen (1951:649) om straff för vissa trafikbrott.',
 'Tillåtande av olovlig körning':'Beskrivande sökbenämning – lagen saknar egen brottsbeteckning. Ange brottet som brott mot 3 § tredje stycket lagen (1951:649) om straff för vissa trafikbrott.',
 'Smitning från trafikolycksplats':'Beskrivande sökbenämning – lagen saknar egen brottsbeteckning. Ange brottet som brott mot 5 § första stycket lagen (1951:649) om straff för vissa trafikbrott.',
 'Grov smitning från trafikolycksplats':'Beskrivande sökbenämning – lagen saknar egen brottsbeteckning. Ange brottet som grovt brott enligt 5 § andra stycket lagen (1951:649) om straff för vissa trafikbrott.'
};
const entries=rows.map(([title,section,min,max,penalty,penaltyShort,aliases,law,elements],i)=>({
 id:'traffic16-'+i,title,shortRef:'TBL '+section,ref:'Lag (1951:649) om straff för vissa trafikbrott '+section,
 category:'Trafik',statute:'TBL:'+section,aliases:aliases.split(';'),
 penalty,penaltyShort,penaltyRange:{min,max,fines:/böter/i.test(penalty),life:false},
 penaltyKind:'statutory',penaltyNote:(designations[title]?designations[title]+' ':'')+'SFS 1951:649. Kontrollera tillämplig gärningsform och gärningsdatum.',
 descriptiveTitle17:!!designations[title],
 penaltyChecked:'2026-10-22',penaltySource:'1951:649 '+section,penaltyRangeVerified:true,
 custody:max>=1?'possible':'none',
 prosecution:'general',prosecutionLabel:'Allmänt åtal',prosecutionRule:'RB 20:3 – allmänt åtal, inget särskilt angivelsekrav i trafikbrottslagen',
 prosecutionDetails:['Allmänt åtal. Inget särskilt angivelsekrav i trafikbrottslagens aktuella bestämmelser.'],
 lawMode:i===3?'excerpt':'full',law,lawSource:'Trafikbrottslagen '+section,lawCompletenessVerified:i!==3,
 lawCompletenessChecked:i===3?null:'2026-10-26',lawCompletenessSourceURL:url,sourceURL:url,
 elements,rekvisit15:{groups:elements.map(label=>({mode:'all',label})),scope:'statute-summary-only',sourceURL:url,note:'Lagtextsbaserad sammanfattning; inte självständigt komplett praxisgodkännande.'},
 qualifications:[],facts:[],stages:[],related:[],typexempel15:[],investigation:[],variants:[],
 reviewStatus:'traffic16-offence-statute-reviewed-no-case-approval'
}));
window.BK_TRAFFIC16={entries,sourceURL:url,checked:'2026-10-22'};
const cats=window.BK_DATA?.categories;if(cats&&!cats.includes('Trafik'))cats.push('Trafik');
})();
