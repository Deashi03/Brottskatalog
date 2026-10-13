/* Brottskatalog 1.1: metadata for bottom-of-card legal verification.
 * A bulk import or an automated prosecution classification is NOT a legal review.
 * No network requests or automatic modifications to verification dates.
 */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const isDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+'T00:00:00Z'));
 const dateOf=(s)=>isDate(s)?s:null;
 const reviewLevels=new Set(['law-and-penalty-reviewed','penalty-and-stage-verified-lawtext-pending','penalty-reviewed-source-excerpt','penalty-reviewed','penalty-and-stage-reviewed']);
 const sourceURL=c=>c.sourceURL||(/^BrB\b/i.test(c.shortRef||'')?'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/':null);
 const metadata=(c,now=new Date())=>{
   // The parent can be a better legal context for a generated stage.
   const parent=c.stageType?D.crimes.find(x=>x.id===c.stageParentId):null;
   const penaltyVerified=!!(c.penaltyChecked&&(reviewLevels.has(c.reviewStatus)||c.stageStatus==='punishable'&&parent&&reviewLevels.has(parent.reviewStatus)));
   const legalCheck=dateOf(c.legalVerifiedAt)||dateOf(c.lawReviewedAt)||((penaltyVerified&&dateOf(c.penaltyChecked))?dateOf(c.penaltyChecked):null);
   // Special legal text/metadata can supersede penalty timestamp when explicitly confirmed.
   const latest=Math.max(...[legalCheck, dateOf(c.lawReviewedAt)].filter(Boolean).map(d=>Date.parse(d+'T00:00:00Z')),0);
   const lastReview=latest?new Date(latest).toISOString().slice(0,10):null;
   const nowMs=now instanceof Date?now.getTime():new Date(now).getTime();
   const stale=!!(latest&&Number.isFinite(nowMs)&&nowMs>=new Date(
     new Date(latest).getUTCFullYear()+3,
     new Date(latest).getUTCMonth(),
     new Date(latest).getUTCDate()
   ).getTime());
   let lawStatus=c.lawMode==='missing'?'Saknas offline':c.lawMode==='machine'?'Maskinimporterad – ej slutgranskad':c.lawMode==='full'?'Lagtext inlagd – kontrollera aktuell lydelse':c.lawMode==='stage-reference'?'Förstadium – särskilt lagstöd måste kontrolleras':'Utdrag – kontrollera fulltext';
   if(c.reviewStatus==='source-changed')lawStatus='Källtext ändrad – kräver ny granskning';
   const penaltyStatus=c.reviewStatus==='source-changed'?'Kontroll krävs efter lagändring':penaltyVerified?'Dokumenterad kontroll '+dateOf(c.penaltyChecked):c.penaltyRange?'Strukturerad, men ej individuellt verifierad':'Straffskala inte maskinellt verifierad';
   const prosecutionStatus=c.stageStatus&&c.stageStatus!=='punishable'?'Inte relevant som självständig straffbar rubricering':c.prosecution==='unknown'?'Ej verifierad':c.prosecution==='general'?'Allmänt åtal registrerat – kontrollera undantag':'Särskilda åtalsvillkor registrerade';
   const stageStatus=!c.stageType?'Se särskilda förstadieposter':c.stageStatus==='punishable'?'Straffbart enligt registrerat lagstöd':c.stageStatus==='not-criminalized'?'Ej straffbart enligt registrerat lagstöd':'Ej verifierat – dra ingen slutsats om straffrihet';
   return {
     stale,lastReview,
     sourceURL:sourceURL(c)||sourceURL(parent||{}),
     law:lawStatus,penalty:penaltyStatus,prosecution:prosecutionStatus,stages:stageStatus,
     lastReviewLabel:lastReview?'Senaste dokumenterade sakgranskning: '+lastReview:'Ingen individuell kontrolltidpunkt dokumenterad',
     dateNotice:'Datumen avser dokumenterade kontroller, inte automatiskt uppdaterad lagtext. Rättsläget vid gärningstidpunkten behöver bedömas särskilt.',
     versionStatus:'Giltig lagversion för gärningsdatum: inte automatiskt fastställd.'
   };
 };
 window.BK_QUALITY11={metadata,thresholdYears:3,version:'1.1'};
})();