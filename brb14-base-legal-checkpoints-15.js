/* Twenty-two individually bounded BrB 14 document/evidence offence reviews.
 * Objective alternatives and legal fault purpose only; never infer
 * historical applicability, proof, inchoate liability or custody decisions.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const p={
 '14:1':{need:['framställer en falsk urkund','ändrar eller fyller ut en äkta urkund','fara i bevishänseende','elektronisk handling'],
  obj:'Den som obehörigen skapar falsk urkund genom annans namngivning eller motsvarande, eller ändrar eller fyller ut en äkta urkund, måste därigenom skapa fara i bevishänseende. Lagtexten definierar både pappersurkund, tillförlitligt verifierbar elektronisk urkund och bevismärke.',
  subj:'Uppsåt enligt BrB 1:2 krävs till förfalskningshandlingen och de faktiska förhållanden som skapar bevisfaran. Skillnaden mellan falsk utställarangivelse och osant materiellt innehåll måste avgöras särskilt; all osann information är inte urkundsförfalskning.'},
 '14:2':{need:['brott som avses i 1 §','förvanskning av urkund','urkund är av mindre vikt'],
  obj:'Förvanskning av urkund är uttryckligen ringa grad av gärning som avses i 14:1, med samma krav på obehörig urkundsförfalskning och bevisfara. Vid ringabedömningen beaktas särskilt en mindre viktig urkund och om gärningen syftat till att hjälpa någon till sin rätt.',
  subj:'Förvanskningens uppsåtsrekvisit följer 14:1 jämförd med 1:2. Den ringa brottsgraden är en rättslig helhetsbedömning, inte en ny laglig möjlighet att ändra annans dokument genom ett välmenande motiv.'},
 '14:3':{need:['grov urkundsförfalskning','myndighets arkivhandling av vikt','särskilt betydelsefull i den allmänna omsättningen'],
  obj:'En urkundsförfalskning enligt 14:1 med bevisfara ska vara grov. Särskilt viktiga myndighetsarkiv, mycket betydelsefulla omsättningsurkunder och annars särskilt farlig art bedöms som självständiga kvalifikationsomständigheter.',
  subj:'Uppsåt till urkundsförfalskningen och dess relevanta faktiska omständigheter krävs. Bedömningen att handlingen är särskilt betydelsefull är en rättslig värdering och ursäktar inte bortfall av bevisfaran.'},
 '14:4':{need:['förstör, gör obrukbar eller döljer en urkund','fara i bevishänseende','inte är att anse som bokföringsbrott'],
  obj:'Den som utan rätt förstör, gör obrukbar eller döljer en urkund kan hindra urkundens bevisfunktion om gärningen skapar fara i bevishänseende. Bestämmelsen är uttryckligen subsidiär till bokföringsbrott och har särskilda ringa och grova grader.',
  subj:'Uppsåt till att utan rätt påverka urkundens tillgänglighet eller funktion samt relevanta bevisfaroförhållanden krävs enligt 1:2. Bristande förvaring utan uppsåt är inte automatiskt detta brott.'},
 '14:5':{need:['olovligen anbringar eller annars förfalskar någon annans namnteckning eller signatur','alster av konst eller brukskonst','ger sken av'],
  obj:'Signaturförfalskning innebär att någon olovligen anbringar eller ändrar annans signatur på konst- eller brukskonstverk eller liknande, så att verket framstår som om den andre utgett sig för att vara upphovsman. Det är skenet om upphovsmannaskapet som är särskilt rekvisit.',
  subj:'Uppsåt till olovlig signaturanbringning och till de faktiska omständigheter som ger sken av en annan upphovsman krävs. Detta är inte identiskt med vanlig urkundsförfalskning eller allmänt användande av signatur.'},
 '14:6':{need:['förfalskar sedel eller mynt','gäller i sverige eller utomlands','beslutats för utgivning'],
  obj:'Penningförfalskning är att eftergöra eller förfalska sedel eller mynt som gäller i Sverige eller utomlands eller som beslutats för utgivning men ännu inte gäller. Lagtexten har normal, ringa och grov grad och fordrar det särskilda skyddade pengaobjektet.',
  subj:'Uppsåt enligt 1:2 krävs till eftergörandet eller förfalskningen och till objektets relevanta faktiska karaktär. All hantering av en kopia är inte utan vidare sedel- eller myntförfalskning.'},
 '14:7':{need:['anskaffar, lämnar, tar emot, förvarar','falsk sedel eller falskt mynt','med uppsåt att det förfalskade ska prånglas ut'],
  obj:'Särskilda befattningshandlingar med falska sedlar eller mynt: anskaffande, lämnande, mottagande, förvaring, transport eller liknande. För samtliga krävs att objekten är falska pengar enligt 14:6 och att förfalskningen ska prånglas ut.',
  subj:'Paragrafen har ett uttryckligt särskilt UPPÅT att de falska pengarna ska prånglas ut. Enbart fysisk besittning eller vetskap om förfalskningen utan denna ytterligare avsikt uppfyller inte de uppräknade ansvarsvillkoren.'},
 '14:8':{need:['eftergör gällande frimärke','anbringar falskt sådant märke','fara i bevishänseende'],
  obj:'Märkesförfalskning avser gällande svenska eller utländska värde- och kontrollmärken eller det märkta, bland annat eftergöring och obehörig anbringning av äkta eller falskt märke. Åtgärden måste innebära fara i bevishänseende, utöver särskilt objektkrav.',
  subj:'Uppsåt till den förbjudna märkesåtgärden och de faktiska förhållanden som utgör bevisfara krävs enligt 1:2. En märkesförväxling utan förfalskande handling uppfyller inte automatiskt bestämmelsen.'},
 '14:9':{need:['gränsmärke, vattenmärke, fixpunkt','flyttar, tar bort, skadar eller förstör','fara i bevishänseende'],
  obj:'Förfalskning av fast märke omfattar obehörigt anbringande av förväxlingsbart gräns-, vatten- eller mätningsmärke samt flyttande, borttagande, skadande eller förstörande av ett sådant skyddat märke. Även här krävs fara i bevishänseende.',
  subj:'Uppsåt till den obehöriga märkesåtgärden och bevisfarans relevanta faktiska omständigheter följer BrB 1:2. Ett slumpartat markarbete utan avsiktlig märkesåtgärd är inte automatiskt förfalskning av fast märke.'},
 '14:10':{need:['åberopar falsk urkund','prånglar ut falsk sedel','annars brukar något som förfalskats','fara i bevishänseende'],
  obj:'Brukande av det förfalskade har flera uttryckligt uppräknade former: åberopa falsk urkund eller märke, saluföra verk med falsk signatur, prångla ut falska pengar eller annars bruka förfalskade föremål enligt kapitlet. Åtgärden ska innebära fara i bevishänseende.',
  subj:'Uppsåt till brukandet av det falska objektet och de faktiska omständigheter som utgör bevisfara krävs. Att en person en gång påträffat en förfalskad handling är inte samma sak som att denne åberopar den som äkta.'},
 '14:11':{need:['i annat fall än som avses i 10 §','bland allmänheten sprider','lätt kan förväxlas'],
  obj:'Olaga spridande av efterbildning omfattar bland allmänheten spritt föremål som lätt kan förväxlas med gällande sedel, mynt eller offentligt värdemärke, men endast utanför 14:10:s särskilda brukandebrott. Spridning, förväxlingsrisk och objektkategori prövas självständigt.',
  subj:'Uppsåt enligt 1:2 till spridningen och förväxlingsobjektets relevanta faktiska utformning krävs. Att framställa ett föremål utan att sprida det bland allmänheten uppfyller inte det särskilda spridningsrekvisitet.'}
};
const titles=[
 ['Urkundsförfalskning','14:1'],['Förvanskning av urkund','14:2'],['Grov urkundsförfalskning','14:3'],
 ['Hindrande av urkunds bevisfunktion','14:4'],['Ringa hindrande av urkunds bevisfunktion','14:4'],['Grovt hindrande av urkunds bevisfunktion','14:4'],
 ['Signaturförfalskning','14:5'],['Ringa signaturförfalskning','14:5'],['Grov signaturförfalskning','14:5'],
 ['Penningförfalskning','14:6'],['Ringa penningförfalskning','14:6'],['Grov penningförfalskning','14:6'],
 ['Olovlig befattning med falska pengar','14:7'],['Ringa olovlig befattning med falska pengar','14:7'],['Grov olovlig befattning med falska pengar','14:7'],
 ['Märkesförfalskning','14:8'],['Ringa märkesförfalskning','14:8'],['Grov märkesförfalskning','14:8'],
 ['Förfalskning av fast märke','14:9'],['Ringa förfalskning av fast märke','14:9'],
 ['Brukande av det förfalskade','14:10'],['Olaga spridande av efterbildning','14:11']
];
const ext={ringa:'Ringa grad enligt denna paragraf måste utredas utifrån den samlade gärningen. De uttryckliga grundrekvisiten är oförändrade och graden ger inte ett självständigt undantag från ansvarsförutsättningarna.',
 grov:'Grov grad är en särskild, samlad kvalifikationsprövning enligt lagrummet. Att grovhetsbeteckningen finns i lagtexten ersätter inte något av de fullbordade brottets objektiva grundrekvisit.'};
const hasSource=(ref,spec)=>{const x=W['BrB:'+ref],fragments=spec.need;
 return !!(x?.complete===true&&x.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&x.url===SRC&&/^2026-10-(17|18|19|20)$/.test(x.checked||'')
 &&x.text?.length>90&&fragments.every(v=>n(x.text).includes(n(v))))};
const general=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byKind:{objective:0,subjective:0},held:[],byOffence:[],
 currentSourceChecked:'2026-10-20',sourceURL:SRC,finalLegalApprovals:0,
 precedentReviews:0,offenceDateReviews:0,criminalizedStageReviews:0,prosecutionApprovals:0,coercionApprovals:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(v=>!v.stageType&&v.title===title),r={title,done:[],held:[]};report.byOffence.push(r);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing or changed card or previously reviewed'});continue;}
 const spec=p[ref],ok=hasSource(ref,spec)&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const grade=/^(Ringa |Förvanskning av)/.test(title)?'ringa':/^(Grov |Grovt )/.test(title)?'grov':null;
 const suffix=grade?' '+ext[grade]:'';
 const findings={objective:spec.obj+suffix,subjective:spec.subj+suffix},checks={};
 for(const [kind,ready] of Object.entries({objective:ok,subjective:ok&&general})){
  if(ready&&findings[kind].length>=105){
   checks[kind]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    statute:'BrB '+ref,additionalSource:kind==='subjective'?'BrB 1:2':null,
    finding:findings[kind],scope:'current-SFS-objective-or-subjective-offence-route-only',
    caseSpecificLiabilityApproved:false,offenceDateAndHistoricLawApproved:false,
    precedenceOrProofTheoryApproved:false,chapter14VoluntaryAvertingTestApproved:false,
    inchoateAuthorizationApproved:false,chargingAuthorityApproved:false,
    caseSpecificCustodyApproved:false};
   report.completed++;report.byKind[kind]++;r.done.push(kind);
  }else{report.held.push({title,kind,reason:'individual full statutory provenance or offence data not verified'});r.held.push(kind);}
 }
 if(r.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB14-2026-10-20',checkpoints:checks,
  fullLegalReviewApproved:false,offenceDateStillPending:true,
  allEvidenceAndExceptionsStillPending:true,individualStageAndChargesStillPending:true,
  coercionAndCompetitionStillPending:true};
}
window.BK_BRB14_BASE_AUDIT15=report;
})();