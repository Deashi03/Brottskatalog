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
  'En uppgift är osann i ett intyg eller en annan urkund om identitet eller om något ANNAT ÄN egna angelägenheter, alternativt upprättas en skenhandling om rättshandling. Fara i bevishänseende krävs. Andra stycket gäller också brukande av sådan osann urkund. En skenbart äkta falsk utställare hör i stället till urkundsfrågan i 14:1.',
  'osann uppgift i urkund / annans angelägenheter eller identitet'],
 ['BrB:15:12','Missbruk av urkund',
  'En personlig urkund, exempelvis pass, betyg eller identitetshandling, åberopas sanningslöst som gällande för sig eller någon annan, eller lämnas ut i detta syfte. Bestämmelsen omfattar också särskilt sanningslöst påstående om riktig kopia. Fara i bevishänseende krävs; detta är inte samma sak som att tillverka en falsk urkund.',
  'felaktigt bruk av personlig urkund / påstådd riktig kopia']
];
const report={planned:details.length,annotated:0,held:[],missing:[],source:SRC,
 reviewed:'2026-10-18',certified:false,stageEntriesModified:0,
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
  label:contrast,statute:ref,sourceURL:SRC,checked:'2026-10-18',
  note:rule,individuallyCertified:false,noAutomaticProsecutionAdvice:true,
  noAutomaticCustodyAdvice:true
 };
 c.rekvisit15.legalReviewApproved=false;
 report.annotated++;
}
window.BK_URKUND_DISTINCTION15=report;
})();