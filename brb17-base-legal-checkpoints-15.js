/* Independently source-checked current BrB 17 protection-of-authorities offences.
 * Objective route and special mental state individually limited to SFS.
 * Different protected persons, voting, detention and escape provisions have
 * independent statutory anchors. NO case-by-case operational signoff.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const sections={
 '17:1':{words:['med våld eller hot om brottslig gärning','tvinga fram, hindra eller hämnas','grovt våld eller hot mot tjänsteman'],
 obj:'Våld eller hot mot tjänsteman förutsätter angrepp genom fysiskt våld eller hot om BROTTSLIG gärning i anslutning till myndighetsutövning eller i syfte att tvinga fram, hindra eller hämnas en åtgärd där. Även före detta myndighetsutövare skyddas vid angrepp för tidigare myndighetsutövning; grov grad har egna faktorer.',
 fault:'Uppsåt till våldet/hotet och relevanta faktiska skyddsförhållanden krävs. Vid åtgärdsanknutna angrepp ska särskilt syfte att hindra, framtvinga eller hämnas myndighetsutövningen prövas; ett vanligt gräl ger inte automatiskt brottet.'},
 '17:2':{words:['i annat fall än som avses i 1 och 3 §§','angriper en tjänsteman eller dennes närstående','någon annan otillbörlig gärning','grovt angrepp mot tjänsteman'],
 obj:'Angrepp mot tjänsteman är subsidiärt till våld/hot respektive förolämpning enligt 17:1 och 17:3. Det omfattar annan brottslig gärning eller kvalificerad otillbörlig gärning mot tjänstemannen eller närstående, med lidande, skada eller olägenhet och myndighetsutövningsanknytning; grovhet prövas separat.',
 fault:'Uppsåt till den konkreta angreppshandlingen och relevanta skyddade omständigheter krävs, inklusive särskilt syfte när angreppet riktas för att hindra, tvinga fram eller hämnas myndighetsutövning. Även äldre myndighetsutövning kan skyddas.'},
 '17:3':{words:['genom att rikta beskyllning','förödmjukande beteende','ägnad att kränka tjänstemannens självkänsla'],
 obj:'Förolämpning mot tjänsteman avser beskyllning, nedsättande uttalande eller förödmjukande beteende mot tjänsteman vid eller med särskilt samband till myndighetsutövning, vilket är ägnat att kränka tjänstemannens självkänsla eller värdighet. Ett allmänt otrevligt uttalande utan dessa rekvisit räcker inte.',
 fault:'Uppsåt till den kränkande uttryckshandlingen och dess relevanta myndighetsutövningskontext krävs. Vid hämnd eller hindrande är den särskilda åtgärdsanknytningen en egen prövningsfråga, inte en generell presumtion av tjänstemannens yrke.'},
 '17:4':{words:['i annat fall än som avses i 1 och 2 §§','sätta sig till motvärn','med våld försöker hindra'],
 obj:'Våldsamt motstånd omfattar att sätta sig till motvärn eller annars med våld försöka hindra tjänsteman vid myndighetsutövning. Det är ett subsidiärt alternativ till 17:1–2 och kräver verkligt våldsamt motstånd, inte enbart verbal protest eller passiv vägran.',
 fault:'Uppsåt till det våldsamma motståndet och dess hinderinriktning på en tjänstemans pågående myndighetsutövning krävs enligt 1:2. Enbart reflexmässig kroppsrörelse utan relevant uppsåt ska inte automatiskt kvalificeras som våldsamt motstånd.'},
 '17:8':{words:['söker hindra omröstningen','förvanska dess utgång','otillbörlig förmån','grovt'],
 obj:'Otillbörligt verkande vid röstning avser att hindra eller förvanska omröstning eller otillbörligt påverka dess utgång vid allmänt val eller annan allmän rösträtt; grov grad har våld/hot eller tjänstemissbruk som särskilda faktorer. En självständig alternativgärning är att ta emot/godta löfte/begära förmån för att rösta visst.',
 fault:'Uppsåt till att hindra, förvanska eller otillbörligt påverka omröstningen, alternativt till att ta emot/kräva otillbörlig förmån för en viss röst eller underlåten röstning, krävs. Mottagandealternativet är subsidiärt till mutbrott.'},
 '17:9':{words:['obehörigen skaffa sig kännedom','utövning av rösträtt','hållas hemligt'],
 obj:'Brott mot rösthemlighet förutsätter att någon obehörigen försöker skaffa sig kännedom om sådant kring rösträtt i allmänt ärende som enligt lag ska hållas hemligt. Det är den obehöriga efterforskningshandlingen som straffbeläggs, inte nödvändigtvis en lyckad uppgiftsspridning.',
 fault:'Uppsåt till det obehöriga efterforskandet och omständigheterna kring den lagstadgade rösthemligheten måste föreligga. Frivilligt delgiven information utan förbjuden efterforskningsgärning uppfyller inte automatiskt brottets handlingsrekvisit.'},
 '17:10':{words:['med våld eller hot om våld angriper','gjort anmälan','avlagt vittnesmål','grovt övergrepp i rättssak'],
 obj:'Övergrepp i rättssak avser våld eller hot mot någon på grund av eller för att hindra anmälan, talan, vittnesmål eller myndighetsförhör. Andra lidande- eller skadeframkallande gärningar och hot om sådant skyddar särskilt redan avgiven eller hindrad utsaga. Grovhet har egna men- och farofaktorer.',
 fault:'Uppsåt till den angivna angreppsgärningen samt särskilt samband eller syfte att förhindra eller hämnas skyddade rättsliga åtgärder ska bedömas självständigt. Att parter är i konflikt utan skyddad rättslig åtgärd ger inte i sig övergrepp i rättssak.'},
 '17:11':{words:['döljer den som begått brott','undanröjer bevis','grovt skyddande av brottsling','skälig anledning att anta'],
 obj:'Skyddande av brottsling omfattar döljande, hjälp till undanröjande, bevisundanröjande eller jämförbar åtgärd som motverkar upptäckt eller lagföring. Även ICC-förfaranden omfattas. Grov grad och nära relationer som kan ge särskilda undantag måste beaktas.',
 fault:'Huvudregeln bygger på uppsåt till skyddande av brottsling. Paragrafen har en särskild lindrigare reglering för den som inte insett men haft skälig anledning att anta den andres brottslighet; de två skuldformerna får inte sammanblandas.'},
 '17:12':{words:['intagen i kriminalvårdsanstalt','häktad på grund av misstanke','tagen i förvar','rymning','grov rymning'],
 obj:'Rymning omfattar person i ett av särskilt uppräknade lagliga frihetsberövanden som avviker från anstalt, ungdomshem, häkte, arrest, vård-, undersöknings- eller förvarsenhet eller från laglig tillsyn. Grov grad omfattar särskilt planerad eller organiserad rymning; frihetsberövandets lagliga grund är central.',
 fault:'Uppsåt till det faktiska rymmandet från en lagligen upprätthållen frihetsinskränkning och dess relevanta omständigheter krävs enligt 1:2. Att en person lämnar en institution där den får gå fritt enligt andra regler utgör inte automatiskt rymning.'},
 '17:12a':{words:['hjälper den som är intagen, häktad eller tagen i förvar','efter att en frihetsberövad person avvikit','grovt främjande','om gärningen är ringa'],
 obj:'Främjande av rymning eller flykt kan ske genom att hjälpa frihetsberövad enligt uppräknad ordning att komma lös eller efter rymning dölja personen eller liknande främja fortsatt flykt. Grov grad har särskild planerings- och farobedömning; en ringa gärning ska inte utgöra brott.',
 fault:'Uppsåt till den hjälpande eller skyddande flyktgärningen och till relevanta faktiska frihetsberövandeomständigheter krävs. Enbart vänskap med rymd person eller kännedom om rymningen räcker inte utan en sådan aktivt främjande handling.'},
 '17:13':{words:['olovligen rubbar, skadar eller annars förfogar','myndighets anslag eller försegling','hindrande av förrättning'],
 obj:'Överträdelse av myndighets bud omfattar förbjuden rubbning av utmätt, beslagtagen eller annars myndighetssäkrad egendom, försegling och föreskrivet förbud. Hindrande av förrättning är en annan gärningsväg: obefogad vägran att lämna förrättningsman inträde som denne lagligen får kräva.',
 fault:'Uppsåt till den olovliga myndighetsåtgärdsöverträdelsen eller inträdesvägran samt relevanta faktiska förutsättningar krävs enligt 1:2. Den rättsliga behörigheten att kräva inträde måste vara förankrad i det konkreta förrättningsförfarandet.'},
 '17:15':{words:['obehörigen ut för att utöva myndighet','obehörigen bär uniform, märke','medfört betydande men'],
 obj:'Föregivande av allmän ställning innebär att obehörigen utge sig för att utöva myndighet eller bära uniform, märke eller tjänstetecken som ger sken av tillhörighet till offentlig eller annan särskilt skyddad kår. Grov grad bedöms bland annat utifrån betydande men för allmänheten eller enskild.',
 fault:'Uppsåt till det obehöriga utgivandet eller bärandet som skapar sken av skyddad befattning krävs enligt 1:2. Oavsiktlig likhet mellan en persons vanliga kläder och ett tjänstetecken är inte automatiskt föregivande av allmän ställning.'}
};
const titles=[
 ['Våld eller hot mot tjänsteman','17:1'],['Grovt våld eller hot mot tjänsteman','17:1'],
 ['Angrepp mot tjänsteman','17:2'],['Grovt angrepp mot tjänsteman','17:2'],['Förolämpning mot tjänsteman','17:3'],['Våldsamt motstånd','17:4'],
 ['Otillbörligt verkande vid röstning','17:8'],['Grovt otillbörligt verkande vid röstning','17:8'],['Tagande av otillbörlig förmån vid röstning','17:8'],
 ['Brott mot rösthemlighet','17:9'],['Övergrepp i rättssak','17:10'],['Grovt övergrepp i rättssak','17:10'],
 ['Skyddande av brottsling','17:11'],['Grovt skyddande av brottsling','17:11'],
 ['Rymning','17:12'],['Grov rymning','17:12'],
 ['Främjande av rymning eller flykt','17:12a'],['Grovt främjande av rymning eller flykt','17:12a'],
 ['Överträdelse av myndighets bud','17:13'],['Hindrande av förrättning','17:13'],
 ['Föregivande av allmän ställning','17:15'],['Grovt föregivande av allmän ställning','17:15']
];
const grade=' Vid grov grad ska en självständig bedömning ske med hänsyn till angivna kvalifikationsfaktorer och hela gärningen. Grovhetsrubriceringen ersätter inte de objektiva grundvillkoren eller skuldrekvisitet.';
const source=(ref,cl)=>{const p=W['BrB:'+ref];return !!(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>115&&cl.words.every(q=>n(p.text).includes(n(q))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byKind:{objective:0,subjective:0},held:[],byOffence:[],
 checked:'2026-10-20',sourceURL:SRC,offenceApprovals:0,caseLawApprovals:0,historyApprovals:0,
 stageApprovals:0,prosecutionApprovals:0,coercionApprovals:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(v=>!v.stageType&&v.title===title),row={title,completed:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing/changed card or duplicate checklist'});continue;}
 const cl=sections[ref],ok=source(ref,cl)&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const isGrov=/^(Grov |Grovt )/.test(title);
 const notes={objective:cl.obj+(isGrov?grade:''),subjective:cl.fault+(isGrov?grade:'')},out={};
 for(const [key,v] of Object.entries(notes)){
  if(ok&&v.length>=110){
   out[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceRefs:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
    finding:v,scope:'current-chapter17-offence-element-or-fault-only',
    fullLegalLiabilityApproved:false,offenceDateApplicabilityApproved:false,
    currentCaseLawApproved:false,allSpecialProtectionPersonsReviewed:false,
    allCriminalStagesApproved:false,chargingDecisionApproved:false,
    caseSpecificCustodyApproved:false};
   report.completed++;report.byKind[key]++;row.completed.push(key);
  }else{report.held.push({title,key,reason:'primary-source wording or card invariant unverified'});row.held.push(key);}
 }
 if(row.completed.length)c.legalAudit15={schema:1,sourceAudit:'BrB17-2026-10-20',checkpoints:out,
 fullLegalReviewApproved:false,historicalVersionPending:true,
 protectionPersonAndExceptionReviewPending:true,jurisprudencePending:true,
 inchoateAndProsecutionPending:true,coercionDecisionPending:true};
}
window.BK_BRB17_BASE_AUDIT15=report;
})();