/* V1.5 – BrB 14/15 practical legal distinctions, 18 October 2026.
 * A common object (document, banknote, official mark, evidence) is NOT
 * sufficient to identify a single offence. Each act type, special purpose
 * and evidential-risk condition must be independently considered.
 * This adds explanation only – NEVER offence grading or legal approval.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SOURCE='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const specs=[
 {title:'Hindrande av urkunds bevisfunktion',ref:'BrB:14:4',must:['förstör, gör obrukbar eller döljer','fara i bevishänseende','inte är att anse som bokföringsbrott'],other:'Bevisförvanskning',otherRef:'BrB 15:8',
  rule:'BrB 14:4 gäller att utan rätt förstöra, göra obrukbar eller dölja en urkund så att fara uppkommer i bevishänseende. Handlingen får inte i stället bedömas som bokföringsbrott. BrB 15:8 kräver däremot ett särskilt uppsåt att en oskyldig ska fällas till ansvar. Varken vanlig förlust av ett papper eller att en utredning försvåras innebär i sig att något av dessa brott är styrkt.'},
 {title:'Bevisförvanskning',ref:'BrB:15:8',must:['Förvanskar eller undanröjer','med uppsåt att oskyldig','åberopar någon med sådant uppsåt falskt bevis'],other:'Hindrande av urkunds bevisfunktion',otherRef:'BrB 14:4',
  rule:'BrB 15:8 gäller att förvanska eller undanröja bevis, alternativt åberopa falskt bevis, med särskilt uppsåt att en oskyldig ska fällas. Detta är inte liktydigt med all manipulation av bevismaterial. BrB 14:4 avser i stället vissa obehöriga åtgärder med en urkund och kräver fara i bevishänseende samt särskild gräns mot bokföringsbrott.'},
 {title:'Penningförfalskning',ref:'BrB:14:6',must:['eftergör eller på annat sätt förfalskar sedel eller mynt','ännu inte är gällande'],other:'Olovlig befattning med falska pengar',otherRef:'BrB 14:7',
  rule:'BrB 14:6 gäller att framställa eller annars förfalska sedlar eller mynt som gäller eller har beslutats för utgivning. BrB 14:7 gäller i stället anskaffande, mottagande, förvaring, transport eller liknande hantering av redan falska pengar, med särskilt uppsåt att de ska prånglas ut. Att någon innehar en misstänkt sedel räcker inte som automatisk slutsats om något av brotten.'},
 {title:'Olovlig befattning med falska pengar',ref:'BrB:14:7',must:['anskaffar, lämnar, tar emot, förvarar, transporterar','med uppsåt att det förfalskade ska prånglas ut'],other:'Penningförfalskning',otherRef:'BrB 14:6',
  rule:'BrB 14:7 kräver befattning med falsk sedel eller falskt mynt och uppsåt att förfalskningen ska prånglas ut. BrB 14:6 avser att framställa eller förfalska pengarna, medan BrB 14:10 kan gälla att faktiskt prångla ut falska pengar. Enligt BrB 14:13 är försöksansvaret för 14:7 särskilt begränsat till försök att anskaffa eller ta emot det förfalskade och gäller inte ringa fall.'},
 {title:'Brukande av det förfalskade',ref:'BrB:14:10',must:['åberopar falsk urkund','prånglar ut falsk sedel eller falskt mynt','som om han eller hon själv hade gjort förfalskningen'],other:'Urkundsförfalskning',otherRef:'BrB 14:1',
  rule:'BrB 14:10 gäller att använda eller åberopa ett förfalskat föremål på de sätt som anges i paragrafen med fara i bevishänseende. Det skiljer sig från själva framställningen enligt bland annat 14:1 och 14:6. Straffet härleds från just den förfalskning och grad som brukandet motsvarar; det finns inte en enda allmänt giltig numerisk straffskala. Förstadier kräver särskild kontroll enligt BrB 14:13 inklusive undantaget för ringa brott.'},
 {title:'Olaga spridande av efterbildning',ref:'BrB:14:11',must:['i annat fall än som avses i 10 §','bland allmänheten sprider','lätt kan förväxlas'],other:'Brukande av det förfalskade',otherRef:'BrB 14:10',
  rule:'BrB 14:11 gäller spridning bland allmänheten av en efterbildning som lätt kan förväxlas med en gällande sedel, ett mynt eller offentligt värdemärke, i ett annat fall än brukande enligt 14:10. Den har enbart böter i straffskalan. Den får inte slentrianmässigt jämställas med penningförfalskning enligt 14:6 eller brukande enligt 14:10.'},
 {title:'Märkesförfalskning',ref:'BrB:14:8',must:['gällande frimärke','kontrollmärkning','fara i bevishänseende'],other:'Förfalskning av fast märke',otherRef:'BrB 14:9',
  rule:'BrB 14:8 gäller särskilda offentliga värdemärken och kontrollmärkningar, med krav på fara i bevishänseende. BrB 14:9 gäller i stället fasta gräns- och mätningsmärken, bland annat fixpunkter. Att ett föremål kallas märke räcker inte för att välja rätt paragraf; märkets rättsliga funktion avgör vilken bestämmelse som behöver prövas.'},
 {title:'Förfalskning av fast märke',ref:'BrB:14:9',must:['gränsmärke, vattenmärke, fixpunkt','flyttar, tar bort, skadar eller förstör','fara i bevishänseende'],other:'Märkesförfalskning',otherRef:'BrB 14:8',
  rule:'BrB 14:9 avser bland annat att obehörigen anbringa ett förväxlingsbart fast märke eller flytta, ta bort, skada eller förstöra ett verkligt gräns- eller mätningsmärke, inklusive fixpunkt, när fara i bevishänseende uppkommer. Skilj från kontroll- och värdemärken i BrB 14:8. En obehörig fysisk förändring och faktisk fara måste analyseras var för sig.'}
];
const dates=new Set(['2026-10-17','2026-10-18']);
const checked=(ref,markers)=>{
 const p=W[ref];return Boolean(p?.complete===true&&p?.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&dates.has(p.checked)&&p.url===SOURCE&&markers.every(x=>p.text.includes(x)));
};
const report={planned:specs.length,reviewed:0,held:[],missing:[],source:SOURCE,date:'2026-10-18',
  fullLegalApprovals:0,penaltyChanges:0,prosecutionChanges:0,custodyChanges:0,stageEntriesModified:0};
for(const x of specs){
 const c=D.crimes.find(c=>!c.stageType&&c.title===x.title&&c.statute===x.ref);
 if(!c){report.missing.push(x.title);continue;}
 if(!checked(x.ref,x.must)||!c.rekvisit15||!c.lawCompletenessVerified){
  report.held.push({title:x.title,reason:'source-or-requisites-not-individually-checked'});continue;
 }
 const current=c.evidenceDistinction15;
 if(current?.sourceURL===SOURCE&&current?.note!==x.rule){
  report.held.push({title:x.title,reason:'earlier-verified-note-differs; individual-review-needed'});continue;
 }
 c.evidenceDistinction15={sourceRef:x.ref,otherRef:x.otherRef,compareWith:x.other,
   sourceURL:SOURCE,sourceDate:W[x.ref].checked,reviewed:'2026-10-18',note:x.rule,
   scope:'statutory-act-elements-only',legalReviewApproved:false,
   neverApprovesCoerciveMeasures:true,neverApprovesPenalty:false,
   caseSpecificDeterminationApproved:false};
 const prefix='Gränsdragning enligt 14–15 kap. BrB: ';
 if(!String(c.rekvisit15.note||'').includes(prefix))
  c.rekvisit15.note=String(c.rekvisit15.note||'')+' '+prefix+x.rule+
   ' Källa: '+SOURCE+' Detta är en avgränsning av lagtextens rekvisit, inte ett beslut i ett enskilt ärende.';
 c.rekvisit15.legalReviewApproved=false;
 report.reviewed++;
}
window.BK_BRB14_EVIDENCE_DISTINCTIONS15=report;
})();