/* BrB 7 family offences: individually bounded act and fault review.
 * 7:4 currently has a distinct future replacement at 2027-01-01.
 * Do not confer historic/future liability, stage, charging or police powers.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const law={
 '7:1':{need:['ingår den som är gift nytt äktenskap','ingår ogift äktenskap med den som är gift','registrerat partnerskap'],
 obj:'Tvegifte omfattar dels att en redan gift person ingår nytt äktenskap, dels att någon ogift ingår äktenskap med en person som är gift. Andra stycket reglerar separat olovligt ingående av äktenskap när person i registrerat partnerskap gifter sig.',
 sub:'Uppsåt till själva äktenskapsingåendet och de faktiska civilståndsförhållandena krävs enligt 1:2. Att ett förhållande är otroget eller att en person samlever med flera innebär inte i sig att äktenskap i lagens mening ingåtts.'},
 '7:2':{need:['vid annans adoption av en person under arton år','genom olaga tvång eller vilseledande','otillbörlig ersättning','samtycke eller tillstånd'],
 obj:'Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn kräver att någon vid en annans adoption av person under 18 genom tvång, vilseledande eller löfte/lämnande av otillbörlig ersättning skaffar det samtycke eller tillstånd som behövs. Ålder, adoption och metod är självständiga krav.',
 sub:'Uppsåt till den otillbörliga åtgärden och utverkandet av samtycke eller tillstånd samt relevanta faktiska adoption- och åldersomständigheter krävs enligt 1:2. Ett i och för sig tillåtet ekonomiskt bidrag är inte utan vidare otillbörlig ersättning.'},
 '7:3':{need:['understicker eller förbyter barn','oriktig anmälan till myndighet','falsk familjeställning'],
 obj:'Förvanskande av familjeställning kan begås genom understickande eller förbytande av barn eller genom oriktig myndighetsanmälan eller underlåtenhet att anmäla, så att personen själv eller annan ges falsk familjeställning eller någon berövas riktig sådan. Effekten på familjeställningen måste föreligga.',
 sub:'Uppsåt till den angivna förvanskningshandlingen och de relevanta faktiska relationer som påverkar den juridiska familjeställningen krävs. En oavsiktlig administrativ feluppgift utan uppsåtligt ändrat familjerättsligt förhållande är inte automatiskt detta brott.'},
 '7:4':{need:['upphör att gälla u:2027-01-01','obehörigen skiljer ett barn under femton år','den andra vårdnadshavaren','vård av unga','brottet som avses i första eller andra stycket är grovt'],
 obj:'Egenmäktighet med barn omfattar olovligt skiljande av barn under 15 från vårdnadshavare eller vissa LVU-vårdare, obehörigt undanhållande för att hindra vård och i gemensam vårdnad egenmäktigt skiljande från andra vårdnadshavaren utan beaktansvärt skäl. Brottet är subsidiärt till angivna frihetsbrott, och grov grad kräver särskild prövning.',
 sub:'Uppsåt till den otillåtna separations- eller undanhållandegärningen och faktiska barn-, vårdnads- eller LVU-förhållanden krävs. Vid gemensam vårdnad är avsaknad av beaktansvärt skäl ett särskilt rekvisit; enbart konflikt mellan vårdnadshavare räcker inte.'}
};
const cfg=[
 ['Tvegifte','7:1'],['Olovligt ingående av äktenskap','7:1'],
 ['Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn','7:2'],
 ['Förvanskande av familjeställning','7:3'],
 ['Egenmäktighet med barn','7:4'],['Grov egenmäktighet med barn','7:4']
];
const ready=(ref,s)=>{const q=W['BrB:'+ref];return !!(q?.complete===true
 &&q.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&q.url===S&&/^2026-10-(17|18|19|20)$/.test(q.checked||'')
 &&q.text?.length>100&&s.need.every(x=>n(q.text).includes(n(x))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:cfg.length*2,completed:0,byType:{objective:0,subjective:0},held:[],byOffence:[],
 sourceURL:S,checked:'2026-10-20',fullOffenceApprovals:0,
 current2027ReformVerifiedForFutureActs:0,allCustodyConditionsReviewed:0,
 caseLawApproved:0,prosecution7_6Approved:0,stageApproved:0};
for(const [title,ref] of cfg){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,done:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing/mismatched base card or prior audit'});continue;}
 const s=law[ref],ok=ready(ref,s)&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===S
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const extra=/^Grov /.test(title)?' Grovhetsbedömningen kräver en egen helhetsprövning och befriar inte från de bakomliggande vårdnads-, ålders- eller undantagsrekvisiten.':'';
 const done={};
 for(const [key,text] of Object.entries({objective:s.obj+extra,subjective:s.sub+extra})){
  if(ok&&text.length>=110){done[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,
   sourceRefs:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
   finding:text,scope:'current-family-law-offence-elements-or-fault-only',
   fullCriminalLiabilityForActApproved:false,caseDateVerified:false,
   legislationAfter2027Reviewed:false,allFamilyCustodyFactsReviewed:false,
   supremeCourtCaseLawApproved:false,charging7_6Approved:false,
   inchoateStageApproved:false,caseSpecificPolicePowersApproved:false};
   report.completed++;report.byType[key]++;row.done.push(key);
  }else{row.held.push(key);report.held.push({title,key,reason:'current source/card invariant not checked'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB7-2026-10-20',checkpoints:done,
  fullLegalReviewApproved:false,legalTransition2027Pending:true,
  custodyAndFamilyLawPending:true,caseLawPending:true,
  specialProsecution7_6AndCoercionPending:true};
}
window.BK_BRB7_BASE_AUDIT15=report;
})();