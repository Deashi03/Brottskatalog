/* Individual BrB 6 current statutory requirements for 2026-10-20.
 * Objective sexual act/voluntariness/age and independently stated fault
 * are source-anchored per existing card. Explicit age-negligence
 * and peer exceptions are flagged; no date, doctrine, factual liability,
 * grade, punishment, prosecution, attempt or coercion certified.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const sections={
 '6:1':{words:['person som inte deltar frivilligt','vaginalt, analt eller oralt samlag','medvetslöshet, sömn','grov våldtäkt'],
 obj:'Våldtäkt enligt 6:1 omfattar vaginalt, analt eller oralt samlag eller likvärdigt allvarlig sexuell handling med någon som inte deltar frivilligt, eller att förmå personen att företa/tåla sådan handling. Frivilligheten måste prövas med alla lagstadgade undantag för våld/hot, särskilt utsatt situation och allvarligt missbruk av beroendeställning.',
 fault:'Huvudregeln är UPPÅT till den sexuella handlingen och de faktiska omständigheter som utesluter frivilligt deltagande. Enligt 6:1 a finns ett uttryckligt separat grov-oaktsamhetsbrott; det får inte göras till automatiskt likvärdigt med uppsåtlig våldtäkt.'},
 '6:1a':{words:['grovt oaktsam beträffande omständigheten','inte deltar frivilligt','mindre allvarlig'],
 obj:'Oaktsam våldtäkt avser en gärning som objektivt omfattas av 6:1, men där bristande frivillighet inte omfattas av uppsåt utan gärningspersonen i detta hänseende är grovt oaktsam. Är gärningen enligt lagtexten mindre allvarlig ska inget ansvar dömas ut.',
 fault:'GROV OAKTSAMHET måste särskilt konstateras beträffande den andra personens ofrivilliga deltagande; vanlig oaktsamhet räcker inte. Skillnaden mellan gärningshandlingen och insikten eller likgiltigheten inför ofrivillighet kräver självständig bedömning.'},
 '6:2':{words:['annan sexuell handling än som avses i 1 §','inte deltar frivilligt','grovt sexuellt övergrepp'],
 obj:'Sexuellt övergrepp omfattar annan sexuell handling än den jämförliga samlagshandlingen i 6:1, där personen inte deltar frivilligt eller förmås att företa/tåla handlingen. Hänvisningen till frivillighetsreglerna i 6:1 är uttrycklig; mindre grov och grov grad har särskilda villkor.',
 fault:'Uppsåt krävs till den sexuella handlingen och till de faktiska omständigheter som utesluter frivilligt deltagande. Att handlingen inte uppnår samlagsnivå är en objektiv brottsgräns och får inte utelämnas.'},
 '6:3':{words:['grovt oaktsam beträffande omständigheten','inte deltar frivilligt','mindre allvarlig'],
 obj:'Oaktsamt sexuellt övergrepp avser gärningshandlingen i 6:2 utan uppsåt till den andra personens ofrivillighet men med grov oaktsamhet i detta hänseende. Paragrafens uttryckliga mindre-allvarlig-undantag måste bedömas innan ansvar.',
 fault:'GROV OAKTSAMHET beträffande att den andra inte deltar frivilligt krävs uttryckligen enligt 6:3. Det räcker inte med vanlig oaktsamhet eller en objektiv sexuellt kränkande effekt utan övriga brottsrekvisit.'},
 '6:4':{words:['med ett barn under femton år','vaginalt, analt eller oralt samlag','fyllt femton men inte arton år','grov våldtäkt mot barn'],
 obj:'Våldtäkt mot barn omfattar samlag eller lika allvarlig sexuell handling med barn under 15, eller att otillbörligt förmå barnet att utföra/tåla sådan. Även vissa skydds- eller beroendeförhållanden till 15–17-åring eller särskilt utnyttjad nedsatt förmåga hos barn under 18 omfattas.',
 fault:'Uppsåt till den sexuella gärningen krävs som huvudregel. När ansvar beror på att den andra är under viss ålder ska BrB 6:13 tillämpas: OAKTSAMHET i fråga om åldersomständigheten kan räcka utan uppsåt till just den omständigheten.'},
 '6:5':{words:['brott som avses i 4 § första eller andra stycket','mindre grovt','sexuellt utnyttjande av barn'],
 obj:'Sexuellt utnyttjande av barn avser en gärning som uppfyller 6:4:s sexuella handling och tillämpliga barn- eller skyddsförhållanden, men som efter särskild helhetsbedömning är mindre grov. Den mildare rubriceringen ersätter inte ålders- eller gärningsrekvisiten.',
 fault:'Uppsåt till den sexuella gärningen krävs, med särskild oaktsamhetsreglering för barnets ålder enligt 6:13. Bedöm också det uttryckliga undantaget för klart icke övergrepp vid ringa ålders- och utvecklingsskillnad i 6:14.'},
 '6:7':{words:['vaginalt samlag med eget barn eller dess avkomling','vaginalt samlag med sitt helsyskon','förmåtts till gärningen genom olaga tvång'],
 obj:'Samlag med avkomling respektive samlag med syskon gäller endast vaginalt samlag i angivna biologiska familjerelationer och när tidigare sexualbrottsbestämmelser inte är tillämpliga. Den person som förmåtts genom olaga tvång eller annat otillbörligt sätt omfattas uttryckligen inte av ansvar enligt 6:7.',
 fault:'Uppsåt till den särskilda samlagsgärningen och relevanta faktiska släktskapsförhållanden krävs enligt 1:2. Den särskilda regeln om tvång/otillbörlig påverkan för den förmådde innebär en självständig ansvarsbegränsning.'},
 '6:8':{words:['främjar eller utnyttjar att ett barn under femton år','sexuell posering','fyllt femton men inte arton år','grovt utnyttjande'],
 obj:'Utnyttjande av barn för sexuell posering omfattar att främja eller utnyttja att barn under 15 poserar sexuellt, eller att försätta barnet i sådan situation. För 15–17-åring fordras att poseringen är ägnad att skada hälsa eller utveckling. Grov grad har särskilda vinst-, omfattnings- och hänsynslöshetsfaktorer.',
 fault:'Uppsåt till gärningshandlingen och dess faktiska omständigheter krävs, men beträffande barnets ålder ska 6:13:s uttryckliga OAKTSAMHETSREGEL prövas. Undantaget i 6:14 för vissa gärningar vid ringa ålders- och utvecklingsskillnad får inte förbises.'},
 '6:9':{words:['barn som inte fyllt arton år','mot ersättning företa eller tåla en sexuell handling','ersättningen har utlovats eller getts av någon annan'],
 obj:'Utnyttjande av barn genom köp av sexuell handling förutsätter att barn under 18 förmås att mot ersättning företa eller tåla sexuell handling. Ersättningen kan komma från någon annan; en särskild mindre grov grad regleras uttryckligen.',
 fault:'Uppsåt till den ersättningsanknutna sexhandlingens faktiska förhållanden krävs. Enligt 6:13 räcker OAKTSAMHET till att personen inte uppnått 18 år; det får inte ställas ett allmänt krav på medveten kännedom om barnets ålder.'},
 '6:10':{words:['sexuellt berör ett barn under femton år','handling med sexuell innebörd','blottar sig för någon annan','grovt sexuellt ofredande'],
 obj:'Sexuellt ofredande mot barn omfattar att sexuellt beröra barn under 15, förmå barnet till sexuell handling eller rikta handling enligt andra stycket mot barnet. Annat sexuellt ofredande omfattar blottning ägnad att väcka obehag eller ord/handling ägnad att kränka sexuell integritet.',
 fault:'Uppsåt till ofredandehandlingen och relevanta faktiska omständigheter krävs; för barns ålder gäller särskilda OAKTSAMHETSFÖRUTSÄTTNINGAR enligt 6:13. Grov grad och hänsynslöshet prövas separat från underliggande sexuella kränkning.'},
 '6:11':{words:['förmår en person att mot ersättning','i huvudsakligt syfte att delta i eller förevisas handlingen','ersättningen har utlovats eller getts av någon annan'],
 obj:'Köp av sexuell handling förutsätter att någon mot ersättning förmås att företa eller tåla en sexuell handling, i huvudsakligt syfte att gärningspersonen deltar i eller får handlingen förevisad. Betalning kan ha utlovats eller getts av någon annan; barnköp i 6:9 har specialregel.',
 fault:'Uppsåt till ersättningen, förmåendet och den sexuella handlingen krävs enligt 1:2; det huvudsakliga särskilda SYFTET att delta i eller få handlingen förevisad är ett eget subjektivt rekvisit.'}
};
const titles=[
 ['Våldtäkt','6:1'],['Grov våldtäkt','6:1'],['Oaktsam våldtäkt','6:1a'],
 ['Sexuellt övergrepp','6:2'],['Grovt sexuellt övergrepp','6:2'],['Oaktsamt sexuellt övergrepp','6:3'],
 ['Våldtäkt mot barn','6:4'],['Grov våldtäkt mot barn','6:4'],['Sexuellt utnyttjande av barn','6:5'],
 ['Samlag med avkomling','6:7'],['Samlag med syskon','6:7'],
 ['Utnyttjande av barn för sexuell posering','6:8'],['Grovt utnyttjande av barn för sexuell posering','6:8'],
 ['Utnyttjande av barn genom köp av sexuell handling','6:9'],
 ['Sexuellt ofredande mot barn','6:10'],['Grovt sexuellt ofredande mot barn','6:10'],
 ['Sexuellt ofredande','6:10'],['Grovt sexuellt ofredande','6:10'],
 ['Köp av sexuell handling','6:11']
];
const grade=' Vid grov grad krävs en självständig helhetsprövning av de uttryckliga kvalifikationsgrunderna; rubriceringen ersätter inte vare sig frivillighetskrav, barnålder, brottstyp eller särskild skuldform.';
const source=(ref,cl)=>{const p=W['BrB:'+ref];return !!(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>130&&cl.words.every(x=>n(p.text).includes(n(x))))};
const general=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 reviewed:'2026-10-20',sourceURL:SRC,fullyReviewedOffences:0,
 caseLawApprovals:0,historicalLawApprovals:0,prosecutionApprovals:0,
 custodyApprovals:0,stageApprovals:0,childAgeExceptionApprovals:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing or changed base offence or earlier checklist'});continue;}
 const cl=sections[ref],ok=source(ref,cl)&&general&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)
 &&(ref!=='6:4'&&ref!=='6:5'&&ref!=='6:8'&&ref!=='6:9'&&ref!=='6:10'||source('6:13',{words:['inte haft uppsåt till men varit oaktsam']}));
 const extra=/^(Grov |Grovt )/.test(title)?grade:'',out={};
 for(const [key,description] of Object.entries({objective:cl.obj+extra,subjective:cl.fault+extra})){
  if(ok&&description.length>=115){
   out[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sources:['BrB '+ref,...(ref==='6:4'||ref==='6:5'||ref==='6:8'||ref==='6:9'||ref==='6:10'?['BrB 6:13']:[]),...(key==='subjective'?['BrB 1:2']:[])],
    finding:description,scope:'current-sexual-offence-statutory-act-or-explicit-fault-only',
    caseSpecificLiabilityApproved:false,applicableHistoricalVersionApproved:false,
    consentAndAgeFactsVerified:false,caseLawApproved:false,
    allExceptionsIncluding6_14Approved:false,chapter6StageApproved:false,
    chargeConditionsApproved:false,custodyApproved:false};
   report.completed++;report.byType[key]++;row.done.push(key);
  }else{report.held.push({title,key,reason:'individually verified current source or card mismatch'});row.held.push(key);}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB6-2026-10-20',checkpoints:out,
  fullLegalReviewApproved:false,ageAndConsentFactsPending:true,
  legalVersionAndCaseLawPending:true,minorAgeDifferenceExceptionsPending:true,
  prosecutionAndCoercionStillBlocked:true};
}
window.BK_BRB6_BASE_AUDIT15=report;
})();