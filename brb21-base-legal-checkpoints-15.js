/* Individual BrB 21 military wartime offences:
 * Statutory act and legally specified culpability only. Every source check
 * also requires the separate chapter activation, covered-person and where
 * necessary enemy-scope provisions, without certifying a real wartime event.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const context={
 '21:1':['detta kapitel träder i tillämpning när riket kommer i krig','regeringen föreskriva'],
 '21:3':['krigsmän alla som är tjänstgöringsskyldiga','polismän som utan att vara tjänstgöringsskyldiga'],
 '21:4':['krigsfångar','krigsdeltagare som har internerats'],
 '21:16':['vid tillämpningen av 7, 9, 10 och 12 §§','med fienden likställas']
};
const sections={
 '21:5':{need:['vägrar eller underlåter en krigsman','lyda en förmans order','uppenbart att ordern inte angår tjänsten'],
 obj:'Lydnadsbrott kräver krigsman, relevant förmansorder och vägran, underlåtenhet eller otillbörligt dröjsmål. Ansvar utesluts uttryckligen om det är uppenbart att ordern inte rör tjänsten. Kapitel 21 måste vara tillämpligt och personkretsen verifierad.',
 sub:'Uppsåt till den relevanta ordervägran eller fördröjningen och till de faktiska tjänste- och orderförhållandena krävs enligt 1:2. Det särskilda undantaget för uppenbart tjänstefrämmande order måste alltid prövas.'},
 '21:6':{need:['brott som avses i 5 §','grovt lydnadsbrott','under strid'],
 obj:'Grovt lydnadsbrott förutsätter samma vägran eller underlåtenhet i 21:5 samt självständig bedömning av grovhet, särskilt gärning under strid eller en situation där brott mot krigslydnad medför särskild fara.',
 sub:'Uppsåt till det grundläggande lydnadsbrottet och dess relevanta faktiska omständigheter krävs. Att vägran bedöms grov är inte ett fristående oaktsamhetsansvar; tjänsteanknytningen i 21:5 består.'},
 '21:7':{need:['olovligen avviker eller uteblir från tjänstgöringen','grov olovlig avvikelse av krigsman','gått över till fienden'],
 obj:'Olovlig avvikelse av krigsman är obehörig avvikelse från eller utebliven militär tjänstgöring av en person inom kapitlets krigsmannabegrepp. Grovhet kan följa av avvikande under/vid strid eller övergång/frivilligt överlämnande till fienden.',
 sub:'Uppsåt till den otillåtna avvikelsen eller utevaron och den konkreta tjänstgöringsskyldigheten krävs enligt huvudregeln. Grovhetsomständigheter ska prövas för sig, särskilt vid det angivna fiendeförhållandet.'},
 '21:8':{need:['förgriper sig en krigsman med våld eller hot om våld','mot en förman','med förmän likställs vaktposter','brottet att anse som grovt'],
 obj:'Våld eller hot mot förman kräver våld eller hot om våld mot förman i tjänsteutövning eller för att förmå/hindra tjänsteåtgärd eller på grund av tjänsten. Skyddet gäller även vissa vaktposter och ordningskrigsmän; grovheten kan bero på strid eller särskild fara.',
 sub:'Uppsåt till våldet eller hotet och relevanta tjänsteanknutna omständigheter krävs. Vid tvång eller hinder ska den kvalificerade kopplingen till förmannens tjänsteåtgärd bedömas självständigt.'},
 '21:9':{need:['avsänder en krigsman obehörigen ett meddelande','fiendens krigsmakt','fiendens område'],
 obj:'Samröre med fienden avser att en krigsman obehörigen avsänder meddelande till eller annars träder i förbindelse med fiendens krigsmakt eller någon på fiendens område. Fiendebegreppet har särskild utvidgning i 21:16.',
 sub:'Uppsåt till den obehöriga kontakthandlingen och relevanta faktiska fiende- eller områdesförhållanden krävs. Enbart en soldats kunskap om fiendens verksamhet innebär inte att kontaktgärningen är fullbordad.'},
 '21:10':{need:['krigsman under strid','råder','andra krigsmän','trolöshet eller modlöshet'],
 obj:'Undergrävande av stridsviljan innebär att krigsman under strid eller annars särskilt farligt krigslydnadsläge råder andra att ge sig till fienden eller i andra krigsmäns närvaro otillbörligen gör något ägnat att skapa trolöshet eller modlöshet.',
 sub:'Uppsåt till rådandet eller den andra otillåtna stridsviljeundergrävande handlingen och relevanta stridsförhållanden krävs. Endast ett allmänt negativt omdöme är inte automatiskt gärning enligt 21:10.'},
 '21:11':{need:['underlåter en krigsman','sätta en försvarsanläggning i stridsberedskap','förbereda en krigshandling'],
 obj:'Försummande av krigsförberedelse kräver särskild tjänsteplikt för krigsman att inom sitt ansvarsområde bereda försvarsanläggning, stridsbereda avdelning, anskaffa egendom eller annars förbereda krigshandling och underlåtenhet att uppfylla den.',
 sub:'Uppsåt till den aktuella underlåtenheten och de faktiska omständigheter som aktualiserar den individuella plikten krävs enligt 1:2. Den som inte faktiskt har uppgiften i sin tjänst uppfyller inte detta särskilda brott enbart genom ett dåligt resultat.'},
 '21:12':{need:['krigsman under tjänstgöring som chef','obehörigen till fienden överlämnar','ger sig och sin avdelning åt fienden'],
 obj:'Obehörig kapitulation förutsätter att en krigsman leder militär avdelning och obehörigen överlämnar position eller viktig materiel till fienden eller överlämnar sig och avdelningen. Den särskilda befälsrollen och gärningens militära betydelse är egna krav.',
 sub:'Uppsåt till den obehöriga överlämnandehandlingen och relevanta fiende-, befäls- och materielomständigheter krävs. Laglig kapitulation enligt tillämplig rätt och order kan inte likställas med obehörig kapitulation.'},
 '21:13':{need:['krigsman under eller i anslutning till strid','till det yttersta uppfylla sin plikt','stridsförsumlighet'],
 obj:'Stridsförsumlighet avser underlåtenhet av krigsman under eller i anslutning till strid att till det yttersta uppfylla konkret plikt att främja krigföring. Tidsmässig stridsanknytning och den individuella tjänsteplikten måste konstateras.',
 sub:'Uppsåt till underlåtenheten att uppfylla den särskilda stridsplikten och relevanta faktiska omständigheter krävs enligt 1:2. Bristande framgång i strid eller objektivt farligt läge är inte ensamt tillräckligt.'},
 '21:14':{need:['uppsåtligen eller av grov oaktsamhet','felet av allvarlig natur','någon annan bestämmelse i detta kapitel'],
 obj:'Tjänstebrott i krig förutsätter att krigsman åsidosätter en konkret tjänsteplikt på ett fel av allvarlig natur. Brottet är subsidiärt till övriga kapitel 21-bestämmelser; vanlig mindre betydande tjänsteförseelse räcker inte.',
 sub:'21:14 kräver uttryckligen UPPÅT eller GROV OAKTSAMHET; vanlig oaktsamhet räcker inte. Subsidiariteten innebär att brottet inte får läggas ovanpå ett annat straffbelagt brott i samma kapitel för samma gärning.'}
};
const cfg=[
 ['Lydnadsbrott','21:5'],['Grovt lydnadsbrott','21:6'],
 ['Olovlig avvikelse av krigsman','21:7'],['Grov olovlig avvikelse av krigsman','21:7'],
 ['Våld eller hot mot förman','21:8'],['Grovt våld eller hot mot förman','21:8'],
 ['Samröre med fienden','21:9'],['Undergrävande av stridsviljan','21:10'],
 ['Försummande av krigsförberedelse','21:11'],['Obehörig kapitulation','21:12'],
 ['Stridsförsumlighet','21:13'],['Tjänstebrott','21:14']
];
const approved=(ref,phrases)=>{const v=W['BrB:'+ref];return !!(v?.complete===true
 &&v.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&v.url===S&&/^2026-10-(17|18|19|20)$/.test(v.checked||'')
 &&v.text?.length>=65&&phrases.every(x=>n(v.text).includes(n(x))))};
const contextGood=Object.entries(context).every(([ref,p])=>approved(ref,p));
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:cfg.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],sourceURL:S,
 checked:'2026-10-20',fullyApprovedCards:0,
 chapterActiveInSpecificSituationApproved:0,personActuallyCoveredApproved:0,
 historicalLawApproved:0,caseLawApproved:0,prosecutionApproved:0,coercionApproved:0};
for(const [title,ref] of cfg){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing/changed base offence or prior review'});continue;}
 const cl=sections[ref],ready=contextGood&&approved(ref,cl.need)&&fault
 &&c.lawMode==='full'&&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===S
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const notes={objective:cl.obj,subjective:cl.sub},completed={};
 for(const [kind,body] of Object.entries(notes)){
  if(ready&&body.length>=110){completed[kind]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,
   sourceRefs:['BrB '+ref,'BrB 21:1','BrB 21:3','BrB 21:4','BrB 21:16',...(kind==='subjective'?['BrB 1:2']:[])],
   finding:body,scope:'current-statutory-war-offence-act-and-fault-only',
   applicabilityOfWarChapterToCaseApproved:false,personIsKrigsmanApproved:false,
   fullLegalLiabilityApproved:false,offenceDateLegalVersionApproved:false,
   caseLawApproved:false,allSpecificDutyAndOrderExceptionsApproved:false,
   inchoateAndProsecutionApproved:false,policeCustodyPowerApproved:false};
   report.completed++;report.byType[kind]++;row.done.push(kind);
  }else{row.held.push(kind);report.held.push({title,kind,reason:'source, chapter context or card invariant not verified'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB21-2026-10-20',checkpoints:completed,
  fullLegalReviewApproved:false,actualWartimeApplicabilityPending:true,
  actualProtectedPersonAndOfficialDutyPending:true,
  caseLawAndOffenceDatePending:true,
  inchoateChargingAndCoercionPending:true};
}
window.BK_BRB21_BASE_AUDIT15=report;
})();