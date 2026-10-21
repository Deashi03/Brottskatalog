/* BrB 5:1–4 current statutory defamation/insult checks, not doctrine or charge.
 * Individual objective versus subjective requirements, plaintiff's proof/
 * truth-and-defensibility exception, and protection of deceased persons remain
 * separate; prosecution in 5:5 is NOT automatically approved.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const cfg=[
 ['Förtal','5:1',['utpekar någon såsom brottslig eller klandervärd','ägnad att utsätta denne för andras missaktning','försvarligt att lämna uppgift','sann eller att han hade skälig grund'],
  'Förtal förutsätter en uppgift som utpekar en annan som brottslig eller klandervärd eller annars är ägnad att utsätta denne för andras missaktning. Den dubbla ansvarsfria vägen kräver både skyldighet/försvarlighet att lämna uppgiften och sanningsbevisning eller skälig grund.',
  'Uppsåt till den uppgiftslämnande handlingen och relevanta faktiska förhållanden krävs enligt BrB 1:2. Att uppgiften är sann räcker inte ensamt till ansvarsfrihet; även försvarlighet eller skyldighet att lämna den måste prövas.'],
 ['Grovt förtal','5:2',['brott som avses i 1 § är grovt','allvarlig skada'], 
  'Grovt förtal förutsätter samma ärekränkande uppgift som 5:1 och en särskild helhetsprövning av innehållet, spridningssättet eller spridningens omfattning och den allvarliga skada som uppgiften varit ägnad att medföra. Undantaget i 5:1 består.',
  'Uppsåt till de faktiska uppgifts- och spridningsomständigheterna enligt 5:1 krävs. Rättslig grovhetsklassificering är inte ett separat uppsåtskrav och ger inte presumtion om skadlig avsikt enbart av antalet mottagare.'],
 ['Förolämpning','5:3',['i annat fall än som avses i 1 eller 2 §','riktar beskyllning, nedsättande uttalande eller förödmjukande beteende','ägnad att kränka'],
  'Förolämpning gäller utanför förtal/grovt förtal att rikta beskyllning, nedsättande uttalande eller förödmjukande beteende mot någon annan på ett sätt som är ägnat att kränka dennes självkänsla eller värdighet. Den utsattes reaktion är inte ensam avgörande.',
  'Uppsåt till uttrycket eller beteendet och dess faktiska förhållanden krävs. Att ett yttrande subjektivt uppfattas som otrevligt bevisar inte att det är ägnat att kränka i paragrafens rättsliga mening.']
];
const source=(ref,words)=>{const p=W['BrB:'+ref];return !!(p?.complete===true&&p.url===SRC
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>95&&words.every(x=>n(p.text).includes(n(x))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:cfg.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 source:SRC,checked:'2026-10-20',fullLegalCards:0,chargeApprovals:0,custodyApprovals:0,historyOrCaseLawApprovals:0};
for(const [title,ref,words,objective,subjective] of cfg){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'Missing or changed offence, or duplicate legal approval'});continue;}
 const ok=source(ref,words)&&(ref==='5:1'||source('5:1',cfg[0][2]))&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const approved={};
 for(const [key,v] of Object.entries({objective,subjective})){
  if(ok&&v.length>105){approved[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
   sources:['BrB '+ref,...(ref==='5:2'?['BrB 5:1']:[]),...(key==='subjective'?['BrB 1:2']:[])],
   finding:v,scope:'current-statutory-elements-only',
   historicActDateApproved:false,caseSpecificLiabilityApproved:false,
   constitutionalAndSupremeCourtDoctrineApproved:false,chargeConditions5_5Approved:false,
   allDefamationExceptionsApproved:false,coercivePowerApproved:false};
   report.completed++;report.byType[key]++;row.done.push(key);
  }else{report.held.push({title,key,reason:'current statute or record not verified'});row.held.push(key);}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB5-2026-10-20',checkpoints:approved,
 fullLegalReviewApproved:false,historyCaseLawAndConstitutionalContextPending:true,
 truthDefenceAndProsecution5_5Pending:true,caseSpecificCoercionBlocked:true};
}
window.BK_BRB5_BASE_AUDIT15=report;
})();