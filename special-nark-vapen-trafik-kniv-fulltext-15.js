/* V1.5: current full offence-section wording of NSL 1–3,
 * Vapenlagen 18:1–2, TBL 3,4,4a, KnivL 4.
 * 22 previously non-certified source-linked cards, 9 independently transcribed
 * complete statutory paragraphs reviewed against Riksdagen 2026-10-18.
 * This certifies current named paragraph text, NOT complete legal analysis
 * of cross-references, historic act dates, exceptions, stages or custody.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const laws={
 NSL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/narkotikastrafflag-196864_sfs-1968-64/',version:'2024:797'},
 VapenL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-2026408_sfs-2026-408/',version:'2026:1596'},
 TBL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1951649-om-straff-for-vissa-trafikbrott_sfs-1951-649/',version:'2024:715'},
 KnivL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1988254-om-forbud-betraffande-knivar-och_sfs-1988-254/',version:'2026:413'}
};
const texts={
 NSL:{
 '1':`1 §
Den som olovligen
1. överlåter narkotika,
2. framställer narkotika som är avsedd för missbruk,
3. förvärvar narkotika i överlåtelsesyfte,
4. anskaffar, bearbetar, förpackar, transporterar, förvarar eller tar annan sådan befattning med narkotika som inte är avsedd för eget bruk, eller
5. innehar, brukar eller tar annan befattning med narkotika
döms för narkotikabrott till fängelse i högst tre år.
Om en gärning som avses i första stycket innebär att gärningsmannen säljer narkotika eller annars befattar sig med narkotika som är avsedd att säljas, döms i stället till fängelse i lägst sex månader och högst tre år.
För narkotikabrott döms även den som olovligen bjuder ut narkotika till försäljning, förvarar eller befordrar vederlag för narkotika, förmedlar kontakter mellan säljare och köpare eller företar någon annan sådan åtgärd, om förfarandet är ägnat att främja narkotikahandel. Straffet är i ett sådant fall fängelse i lägst sex månader och högst tre år.
Bestämmelser om straff för olovlig införsel och utförsel av narkotika och olovlig befattning i vissa fall med narkotika finns i lagen (2000:1225) om straff för smuggling.
Lag (2023:258).`,
 '2':`2 §
Är brott som avses i 1 § första stycket med hänsyn till arten och mängden narkotika samt övriga omständigheter att anse som ringa, döms för ringa narkotikabrott till böter eller fängelse i högst sex månader. Lag (2016:488).`,
 '3':`3 §
Är brott som avses i 1 § att anse som grovt, döms för grovt narkotikabrott till fängelse i lägst två och högst sju år. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om brottet har utgjort ett led i en verksamhet som bedrivits i större omfattning eller yrkesmässigt, avsett en särskilt stor mängd narkotika eller annars varit av särskilt farlig eller hänsynslös art.
Är brottet att anse som synnerligen grovt, döms för synnerligen grovt narkotikabrott till fängelse i lägst sex och högst tio år. Vid bedömningen av om brottet är synnerligen grovt ska det särskilt beaktas om brottet har utgjort ett led i en verksamhet som utövats i organiserad form i syfte att i stor omfattning bedriva handel med narkotika, avsett en synnerligen stor mängd narkotika eller annars varit av synnerligen farlig eller hänsynslös art. Lag (2023:258).`
 },
 VapenL:{
 '18:1':`18 kap. 1 §
Den som uppsåtligen innehar eller tillverkar ett skjutvapen utan att ha rätt till det eller överlåter, yrkesmässigt förmedlar eller lånar ut ett skjutvapen till någon som inte har rätt att inneha vapnet döms för vapenbrott till fängelse i högst fem år.
Om brottet med hänsyn till risken för att vapnet skulle komma till brottslig eller annan skadlig användning och övriga omständigheter är att anse som mindre allvarligt, döms till böter eller fängelse i högst sex månader.
Till böter eller fängelse i högst sex månader döms också den som har begått gärningen av oaktsamhet. Lag (2026:1250).`,
 '18:2':`18 kap. 2 §
Om ett brott som avses i 1 § första stycket är grovt, döms för grovt vapenbrott till fängelse i lägst fyra och högst sju år. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om
1. vapnet har innehafts på allmän plats eller på en annan plats där människor brukar samlas eller har samlats eller i ett fordon på en sådan plats,
2. vapnet har varit av särskilt farlig beskaffenhet,
3. innehavet, tillverkningen, överlåtelsen, förmedlingen eller utlåningen har avsett flera vapen,
4. vapnet har innehafts eller tillverkats i en sådan miljö att det typiskt sett kan befaras komma till brottslig användning, eller
5. gärningen annars har varit av särskilt farlig art.
Om ett brott som avses i 1 § första stycket är synnerligen grovt, döms för synnerligen grovt vapenbrott till fängelse i lägst sex och högst tio år. Vid bedömningen av om brottet är synnerligen grovt ska det särskilt beaktas om innehavet, tillverkningen, överlåtelsen, förmedlingen eller utlåningen har avsett ett stort antal vapen eller flera vapen av särskilt farlig beskaffenhet.
Vid bedömningen enligt första och andra styckena ska ett enhandsvapen anses vara av särskilt farlig beskaffenhet, om det är kraftfullt eller har en särskilt farlig konstruktion eller utformning. Lag (2026:1250).`
 },
 TBL:{
 '3':`3 §
För någon uppsåtligen körkortspliktigt fordon utan att vara berättigad att föra sådant fordon, dömes för olovlig körning till böter. Har han tidigare innehaft körkort som blivit återkallat eller har brottet skett vanemässigt eller är det eljest att anse som grovt, må dömas till fängelse i högst sex månader.
För någon körkortspliktigt fordon med uppsåtligt eller oaktsamt åsidosättande av föreskrift, som meddelats i fråga om rätten att föra sådant fordon, dömes till böter.
Om någon uppsåtligen eller av oaktsamhet såsom förare av körkortspliktigt fordon anställer och brukar den som inte äger rätt att föra fordonet, eller i annat fall tillåter någon annan att föra sådant fordon utan att denne är berättigad därtill, dömes likaledes till böter.
Första-tredje styckena äger motsvarande tillämpning på förare av traktor, moped klass II, snöskoter, terränghjuling, motorredskap eller spårvagn och på den som anställer eller brukar sådan förare eller eljest tillåter någon att föra sådant fordon. Lag (2009:122).`,
 '4':`4 §
Den som för ett motordrivet fordon eller en spårvagn efter att ha intagit alkohol i så stor mängd att alkoholkoncentrationen under eller efter färden uppgår till minst 0,2 promille i blodet eller 0,10 milligram per liter i utandningsluften döms för rattfylleri till böter eller fängelse i högst sex månader.
För rattfylleri enligt första stycket döms också den som för ett motordrivet fordon eller en spårvagn efter att ha intagit narkotika som avses i 8 § narkotikastrafflagen (1968:64) i så stor mängd att det under eller efter färden finns något narkotiskt ämne kvar i blodet. Detta gäller dock inte om narkotikan intagits i enlighet med läkares eller annan behörig receptutfärdares ordination.
För rattfylleri enligt första stycket döms också den som för ett motordrivet fordon eller en spårvagn och då är så påverkad av alkohol att det kan antas att han eller hon inte kan framföra fordonet på ett betryggande sätt. Detsamma gäller om föraren är lika påverkad av något annat medel.
Första och andra styckena gäller inte förare av ett motordrivet fordon, som är avsett att föras av gående.
Första, andra och tredje styckena gäller inte om förandet av fordonet ingår som ett led i en vetenskaplig eller därmed jämförlig undersökning till vilken tillstånd har lämnats av regeringen eller den myndighet som regeringen bestämmer.
Lag (2019:346).`,
 '4a':`4 a §
Är ett brott som avses i 4 § första, andra eller tredje stycket att anse som grovt, skall föraren dömas för grovt rattfylleri till fängelse i högst två år. Vid bedömande av om brottet är grovt skall särskilt beaktas om
1. föraren har haft en alkoholkoncentration som uppgått till minst 1,0 promille i blodet eller 0,50 milligram per liter i utandningsluften,
2. föraren annars har varit avsevärt påverkad av alkohol eller något annat medel, eller
3. framförandet av fordonet har inneburit en påtaglig fara för trafiksäkerheten. Lag (1999:217).`
 },
 KnivL:{
 '4':`4 §
Den som uppsåtligen bryter mot 1 eller 2 § döms till böter eller fängelse i högst ett år.
Om gärningen har begåtts av oaktsamhet, döms till böter eller fängelse i högst sex månader.
Om ett brott som avses i första stycket är grovt, döms till fängelse i lägst sex månader och högst två år. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om
1. föremålet har innehafts i ett sammanhang där det kan befaras komma till användning vid brottsligt angrepp på någons liv, hälsa eller trygghet till person,
2. föremålet har varit av särskilt farlig beskaffenhet,
3. innehavet, överlåtelsen eller saluhållandet har avsett flera föremål, eller
4. gärningen på annat sätt har varit av särskilt farlig art.
Om det rör sig om ringa fall utgör gärningen dock inte brott.
Lag (2022:608).`
 }
};
const map=[
 ['Narkotikabrott · innehav','NSL','1'],['Ringa narkotikabrott · bruk','NSL','2'],
 ['Narkotikabrott · överlåtelse','NSL','1'],['Narkotikabrott · framställning','NSL','1'],
 ['Narkotikabrott · förvärv i överlåtelsesyfte','NSL','1'],
 ['Narkotikabrott · transport/förvaring','NSL','1'],
 ['Narkotikabrott · försäljning','NSL','1'],
 ['Narkotikabrott · främjande av handel','NSL','1'],
 ['Ringa narkotikabrott · innehav','NSL','2'],
 ['Grovt narkotikabrott','NSL','3'],['Synnerligen grovt narkotikabrott','NSL','3'],
 ['Vapenbrott','VapenL','18:1'],['Mindre allvarligt vapenbrott','VapenL','18:1'],
 ['Vapenbrott av oaktsamhet','VapenL','18:1'],
 ['Grovt vapenbrott','VapenL','18:2'],['Synnerligen grovt vapenbrott','VapenL','18:2'],
 ['Rattfylleri','TBL','4'],['Grovt rattfylleri','TBL','4a'],
 ['Olovlig körning','TBL','3'],['Grov olovlig körning','TBL','3'],
 ['Brott mot knivlagen','KnivL','4'],['Grovt brott mot knivlagen','KnivL','4']
];
const report={planned:map.length,certified:0,held:[],paragraphsReviewed:9,
 date:'2026-10-18',sourceFamilies:Object.keys(laws),
 legalApprovals:0,offenceDateApprovals:0,custodyApprovals:0,stageChanges:0,penaltyChanges:0};
for(const [title,key,sec] of map){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title);
 const l=laws[key],text=texts[key][sec];
 if(!c||!c.shortRef?.startsWith(key)||!c.penaltyRangeVerified
   ||c.penaltyGradeReviewDate!=='2026-10-18'
   ||c.penaltyGradeReviewSource!==l.url
   ||c.lawCompletenessVerified===true||c.rekvisit15?.legalReviewApproved===true
   ||!text?.startsWith(key==='VapenL'?'18 kap. '+sec.split(':')[1]+' §':sec.replace(/(\d+)([a-z])/,'$1 $2')+' §')
   ||text.length<120){
  report.held.push(title);continue;
 }
 Object.assign(c,{law:text,lawMode:'full',lawSource:l.url,
  lawCompletenessVerified:true,lawCompletenessChecked:'2026-10-18',
  lawCompletenessSourceURL:l.url,lawCompletenessReviewScope:'current-paragraph-only',
  legalSourceVersion15:l.version,
  lawProvenance:'current-SFS-paragraph-independently-transcribed-reviewed-20261018',
  sourceURL:l.url});
 report.certified++;
}
window.BK_OTHER22_SPECIAL_FULLTEXT15=report;
})();