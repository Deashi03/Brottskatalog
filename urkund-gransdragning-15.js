/* 2026-10-18: source-scoped comparison of forgery, use of forged material,
 * false certification and misuse of personal documents. Unlike generic
 * "fake document" labels, these sections have DIFFERENT act requirements.
 * NJA 2025 s. 1029 (Freja) supplements only the electronic-urkund route.
 * No new legal certification, prosecution, penalty or coercive authority.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const details=[
 ['BrB:14:1','Urkundsförfalskning',
  'En falsk urkund framställs obehörigen, eller en äkta urkund ändras eller fylls ut. Urkundens utställarangivelse/originalkaraktär respektive digitala kontrollbarhet och fara i bevishänseende måste prövas. Enbart ett osant sakpåstående är inte automatiskt urkundsförfalskning.',
  'ursprung / skenbart äkta urkund'],
 ['BrB:14:10','Brukande av det förfalskade',
  'Förfalskad urkund eller ANNAT enligt 14 kap. åberopas eller används på lagens uppräknade sätt med fara i bevishänseende. Straffet bestäms som om användaren själv utfört just den förfalskningen; ingen enda generell straffskala får visas. Freja-domen avser endast digital-urkundsfrågan.',
  'brukande / hänvisning till konkret förfalskning'],
 ['BrB:15:11','Osant intygande',
  'En uppgift är osann i ett intyg eller en annan urkund om identitet eller om något ANNAT ÄN egna angelägenheter, alternativt upprättas en skenhandling om rättshandling. Fara i bevishänseende krävs. Tredje stycket gäller brukande av sådan osann urkund; andra stycket reglerar den grova graden av osant intygande. En skenbart äkta falsk utställare hör i stället till urkundsfrågan i 14:1.',
  'osann uppgift i urkund / annans angelägenheter eller identitet'],
 ['BrB:15:12','Missbruk av urkund',
  'En personlig urkund, exempelvis pass, betyg eller identitetshandling, åberopas sanningslöst som gällande för sig eller någon annan, eller lämnas ut i detta syfte. Tredje stycket reglerar separat missbruk av handling: ett sanningslöst påstående om att en handling är en riktig kopia av en viss urkund. Fara i bevishänseende krävs; detta är inte samma sak som att tillverka en falsk urkund.',
  'felaktigt bruk av personlig urkund / påstådd riktig kopia']
];
const report={planned:details.length,annotated:0,held:[],missing:[],source:SRC,
 reviewed:'2026-10-21',certified:false,stageEntriesModified:0,
 noGeneralSinglePenaltyFor14_10:true};
const required=details.every(([ref])=>{const s=W[ref];return Boolean(s?.complete===true&&
 s.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'&&
 ['2026-10-17','2026-10-18'].includes(s.checked)&&s.url===SRC)});
for(const [ref,title,rule,contrast] of details){
 const c=D.crimes.find(x=>!x.stageType&&x.statute===ref&&x.title===title);
 if(!c){report.missing.push(title);continue;}
 if(!required||!c.rekvisit15){report.held.push({title,reason:!required?'missing-source-verification':'missing-requisites'});continue;}
 const summary=' Gränsdragning BrB '+ref.slice(4)+': '+rule+' Jämför BrB 14:1, 14:10, 15:11 och 15:12. Källa: '+SRC;
 if(!String(c.rekvisit15.note||'').includes('Gränsdragning BrB '+ref.slice(4)))c.rekvisit15.note=String(c.rekvisit15.note||'')+summary;
 c.urkundDistinction15={
  label:contrast,statute:ref,sourceURL:SRC,checked:'2026-10-21',
  note:rule,individuallyCertified:false,noAutomaticProsecutionAdvice:true,
  noAutomaticCustodyAdvice:true
 };
 c.rekvisit15.legalReviewApproved=false;
 report.annotated++;
}
window.BK_URKUND_DISTINCTION15=report;
})();
/* Independently read original judgment, not a complete jurisprudence signoff. */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const pins={"BrB:14:1": "1 §\nDen som obehörigen, genom att skriva eller på liknande sätt ange en annan persons namn eller på annat sätt, framställer en falsk urkund eller ändrar eller fyller ut en äkta urkund döms, om åtgärden innebär fara i bevishänseende, för urkundsförfalskning till fängelse i högst två år.\nMed urkund avses\n1. en handling som upprättats till bevis eller annars är av betydelse som bevis och som har en utställarangivelse och originalkaraktär,\n2. en elektronisk handling som upprättats till bevis eller annars är av betydelse som bevis och som har en utställarangivelse som kan kontrolleras på ett tillförlitligt sätt, och\n3. ett märke som ställts ut till bevis om en persons identitet eller om en viss rättighet eller prestation och som har originalkaraktär (bevismärke). Lag (2013:425).", "BrB:14:3": "3 §\nÄr brott som avses i 1 § att anse som grovt, döms för grov urkundsförfalskning till fängelse i lägst ett och högst sex år.\nVid bedömningen av om brottet är grovt ska det särskilt beaktas om förfalskningen avsett en myndighets arkivhandling av vikt eller en urkund som är särskilt betydelsefull i den allmänna omsättningen eller om gärningen annars varit av särskilt farlig art. Lag (2026:1318)."};
const report={planned:2,annotated:0,held:[],reference:"NJA 2018 s. 378, B 3924-17",checked:"2026-10-21",fullLegalApprovals:0,progressCredit:0};
const valid=Object.entries(pins).every(([k,text])=>W[k]?.text===text&&W[k]?.complete===true&&W[k]?.completeTextProvenance==="manual-crosscheck-current-SFS-paragraph-only");
const note="HD NJA 2018 s. 378, De upprepade förfalskningarna, p. 14–28: Varje förfalskning är normalt ett eget brott. Upprepning ensam gör normalt inte brottet grovt; andra försvårande omständigheter kan ge annan grad. Ett enhetligt förfarande vid serieframställning kan undantagsvis utgöra en brottsenhet. Håll rubriceringen av varje gärning skild från straffvärdet för den samlade brottsligheten. Domens historiska straffskalor används inte som aktuella skalor. Källa: https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2018/b-3924-17.pdf";
for(const [ref,title]of[["BrB:14:1","Urkundsförfalskning"],["BrB:14:3","Grov urkundsförfalskning"]]){const c=D.crimes.find(x=>!x.stageType&&x.statute===ref&&x.title===title);if(!valid||!c?.rekvisit15){report.held.push(title);continue;}
if(!c.rekvisit15.note.includes("HD NJA 2018 s. 378, De upprepade förfalskningarna"))c.rekvisit15.note+=" "+note;
c.urkundGradeCaseReview15={reference:report.reference,sourceURL:"https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/2018/b-3924-17.pdf",paragraphs:"14–28",checked:report.checked,note,automaticGradingAllowed:false,historicalPenaltyImported:false,fullLegalApprovalGranted:false,jurisprudenceCheckpointCompleted:false};report.annotated++;}
window.BK_URKUND_GRADE_CASE15=report;
})();
