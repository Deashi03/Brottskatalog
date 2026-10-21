/* Individual legal-source review of nine BrB 11 base offences.
 * Only statutory objective branches and individual fault form receive
 * limited signoff. Case-law, offence-time, offence competition, charging,
 * stages, coercion and full offence certification remain explicitly open.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const norm=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const source=(ref,words)=>{const p=W['BrB:'+ref];
 return Boolean(p?.complete===true&&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&p.url===S&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')&&p.text?.length>=125
  &&words.every(w=>norm(p.text).includes(norm(w))));};
const anchors={
 '11:1':['på obestånd eller när det finns en påtaglig fara','egendom av betydande värde','ur riket bortför','i otillbörligt syfte underlåter','grov oredlighet mot borgenärer'],
 '11:2':['vid konkurs, skuldsanering eller f-','uppsåtligen eller av grov oaktsamhet','uppgiften inte rättas','utan betydelse för saken','grovt försvårande av konkurs'],
 '11:3':['fortsätter rörelse under förbrukande av avsevärda medel','uppsåtligen eller av grov oaktsamhet','skälig anledning anta'],
 '11:4':['betala skuld som inte är förfallen','påtaglig fara för att en annan borgenärs rätt','i otillbörligt syfte','i hemlighet lämnar eller utlovar'],
 '11:5':['uppsåtligen eller av oaktsamhet','bokföringsskyldighet enligt bokföringslagen','inte kan i huvudsak bedömas','om brottet är ringa','om brottet är grovt','gäller inte om bokföringsskyldigheten']
};
const valid=Object.fromEntries(Object.entries(anchors).map(([ref,words])=>[ref,source(ref,words)]));
const general=norm(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const specs=[
 ['Oredlighet mot borgenärer','11:1',[],
 'Den som är på obestånd eller riskerar att hamna där avhänder sig egendom av betydande värde genom förstöring eller gåva; alternativt undanhålls tillgång vid förestående konkurs, eller utlandsbelägen tillgång ställs inte till förvaltarens förfogande trots uppmaning. Varje alternativ har egna begränsningar.',
 'Uppsåt enligt huvudregeln i 1:2 krävs för de relevanta gärningsomständigheterna; andra styckets bortförande ur riket fordrar uttryckligt syfte att undanhålla egendomen från konkursen, och sista alternativet fordrar otillbörligt syfte.'],
 ['Grov oredlighet mot borgenärer','11:1',[],
 'Gärningen måste först omfattas av någon i 11:1 specificerad borgenärsskadlig förmögenhetsdisposition eller undanhållande. Grovhet bedöms sedan utifrån falsk beedigad uppgift, vilseledande bokföring, betydande omfattning eller särskilt farlig art, utan att dessa faktorer ersätter grundbrottets krav.',
 'Gärningspersonen måste ha uppsåt till gärningen och de relevanta faktiska omständigheterna. Gärningens samlade grovhet utgör inte ett särskilt krav på uttryckligt uppsåt att dömas för den grövre rubriceringen.'],
 ['Försvårande av konkurs eller exekutiv förrättning','11:2',[],
 'I konkurs, skuldsanering eller planförhandling kan en gäldenär förtiga tillgång, ange obefintlig skuld eller lämna annan oriktig uppgift som inte rättas i tid. Annan exekutiv förrättning avser uppsåtligt åberopande av falsk handling eller skenavtal som hindrar utmätning. Undantag för betydelselös uppgift eller ursäkt i konkurs ska beaktas.',
 'För första styckets uppgiftsgärningar räcker enligt uttrycklig lydelse uppsåt ELLER grov oaktsamhet. Det särskilda alternativet i andra stycket kräver uppsåt. Den grova brottsgraden enligt sista stycket förutsätter uttryckligen uppsåt.'],
 ['Grovt försvårande av konkurs eller exekutiv förrättning','11:2',[],
 'Brott enligt 11:2 ska vara begånget uppsåtligen och grovt efter en samlad prövning av bl.a. beedigande av oriktig uppgift, falsk handling, vilseledande bokföring eller särskilt stor omfattning. Betydelselösa uppgifter och vissa ursäktliga konkursförhållanden undantas alltjämt.',
 'Till skillnad från normalgradens första stycke fordrar grov grad uttryckligen uppsåt. Enbart grov oaktsamhet kan alltså inte ens med betydande konsekvenser fylla den uttryckliga skuldformen i grovhetsstycket.'],
 ['Vårdslöshet mot borgenärer','11:3',[],
 'Gärningspersonen är på obestånd eller det föreligger påtaglig risk för obestånd och fortsätter verksamhet med stora kostnader utan motsvarande nytta, lever slösaktigt eller vidtar annat liknande äventyrligt förfarande. Förmögenhetsställningen försämras avsevärt och orsakssambandet måste styrkas.',
 'Det krävs uppsåt eller GROV oaktsamhet för den avsevärda förmögenhetsförsämringen; även en person som inte faktiskt insett obeståndet kan omfattas om det funnits skälig anledning att anta detta. Vanlig oaktsamhet för samtliga rekvisit får inte presumeras.'],
 ['Otillbörligt gynnande av borgenär','11:4',[],
 'En gäldenär på obestånd gynnar viss borgenär genom förtidsbetalning, onormalt betalningsmedel, oavtalad säkerhet eller jämförbar åtgärd som påtagligt riskerar annan borgenärs rätt; alternativt annan otillbörlig favorisering eller hemligt lämnad förmån i samband med ackord eller rekonstruktion.',
 'Uppsåt krävs i regel enligt 1:2 till gärningen och de faktiska förhållandena. Andra styckets favoritbehandling har därutöver uttryckligt otillbörligt syfte och tredje styckets förmån ska ske i hemlighet för att främja särskild uppgörelse.'],
 ['Bokföringsbrott','11:5',[],
 'En bokföringsskyldig person underlåter bokföring eller bevarande, lämnar oriktiga uppgifter eller åsidosätter bokföringsskyldigheten på annat sätt. Rörelsens förlopp, resultat eller ställning ska därigenom inte i huvudsak kunna bedömas. Undantaget för vissa icke-näringsdrivande juridiska personer måste kontrolleras.',
 'BrB 11:5 straffbelägger uttryckligen både UPPÅTLIGT och OAKTSAMT åsidosättande av bokföringsskyldigheten. Vanlig oaktsamhet kan räcka här; den får inte förväxlas med grov oaktsamhet i 11:2–3.'],
 ['Ringa bokföringsbrott','11:5',[],
 'Samtliga bokföringsbrottsrekvisit enligt 11:5 första stycket ska föreligga, inklusive att den ekonomiska situationen inte i huvudsak går att bedöma av bokföringen. Därtill krävs att gärningen vid en samlad bedömning är ringa, inte bara att ett enskilt belopp är litet.',
 'Även för ringa bokföringsbrott uttrycker 11:5 både uppsåt och vanlig oaktsamhet som möjliga skuldformer. Ringa graden undanröjer inte skuldrekvisitet eller kravet på påtaglig bokföringsbrist.'],
 ['Grovt bokföringsbrott','11:5',[],
 'Bokföringsbrott med otillräckligt bedömbar redovisning ska vara grovt. Särskilt mycket betydande belopp, användning av falsk handling, systematisk brottslighet eller annars särskilt farlig art ska vägas in utan att bli automatiska rekvisit för alla fall.',
 'BrB 11:5 kriminaliserar såväl uppsåt som oaktsamhet även för den grova brottsgraden; kräver alltid individuellt konstaterad skuld och underlåtenhet eller felaktig bokföring. Grovhetsfaktorerna är inte ett separat krav på grov oaktsamhet.']
];
const report={planned:specs.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 verifiedSourceDate:'2026-10-20',sourceURL:S,completeLegalCards:0,historicApplicabilityApproved:0,
 prosecutionApproved:0,coercionApproved:0,stageApproved:0,jurisprudenceApproved:0};
for(const [title,ref,deps,objective,subjective] of specs){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,steps:[],blocked:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,why:'Missing/changed offence or conflicting review'});continue;}
 const ready=valid[ref]&&deps.every(d=>valid[d])&&c.lawMode==='full'&&c.lawCompletenessVerified===true
 &&c.lawCompletenessSourceURL===S&&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const checks={objective:ready,subjective:ready&&general},texts={objective,subjective},done={};
 for(const [key,yes] of Object.entries(checks)){
  if(yes&&texts[key].length>=110){
   done[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,
    sourceRefs:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
    scope:'current-statutory-objective-or-fault-requisites-only',finding:texts[key],
    caseSpecificLiabilityApproved:false,caseSpecificCustodyApproved:false,
    historicVersionReviewed:false,doctrineAndPrecedentApproved:false,
    offencesInCompetitionAssessed:false,prosecutionConditionsReviewed:false};
   row.steps.push(key);report.completed++;report.byType[key]++;
  }else{row.blocked.push(key);report.held.push({title,key,why:'Statutory provenance or per-crime preconditions not verified'});}
 }
 if(row.steps.length)c.legalAudit15={schema:1,sourceAudit:'BrB11-2026-10-20',checkpoints:done,
  fullLegalReviewApproved:false,historicalLawStillPending:true,caseLawStillPending:true,
  inchoateAndCompetitionStillPending:true,prosecutionAndCoercionStillPending:true};
}
window.BK_BRB11_BASE_AUDIT15=report;
})();