/* Brottskatalog 1.1: metadata for bottom-of-card legal verification.
 * A bulk import or an automated prosecution classification is NOT a legal review.
 * No network requests or automatic modifications to verification dates.
 */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const isDate=s=>{
   if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
   const stamp=Date.parse(s+'T00:00:00Z');
   return Number.isFinite(stamp)&&new Date(stamp).toISOString().slice(0,10)===s;
 };
 const dateOf=(s)=>isDate(s)?s:null;
 const reviewLevels=new Set(['law-and-penalty-reviewed','penalty-and-stage-verified-lawtext-pending','penalty-reviewed-source-excerpt','penalty-reviewed','penalty-and-stage-reviewed']);
 const sourceURL=c=>c.sourceURL||(/^BrB\b/i.test(c.shortRef||'')?'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/':null);
 const legalEditionMarkers=text=>{
   const raw=String(text||'');
   const found=[];
   // A statute page can contain both the currently applicable and a future paragraph.
   // This parser ONLY reports labels present in the supplied excerpt; never chooses the active edition.
   for(const m of raw.matchAll(/\/(?:Rubriken |Kapitlet )?(Träder i kraft|Upphör att gälla)\s+[IU]:([^/]+)\//gi)){
     const kind=m[1].toLocaleLowerCase('sv').includes('upphör')?'Upphör':'Träder i kraft';
     const datum=m[2].trim();
     if(!found.some(e=>e.kind===kind&&e.when===datum))found.push({kind,when:datum});
   }
   return found.slice(0,8);
 };
 const metadata=(c,now=new Date())=>{
   // A future or invalid verification date must not be used as evidence of review.
   const nowMs=now instanceof Date?now.getTime():new Date(now).getTime();
   const validNow=Number.isFinite(nowMs)?nowMs:Date.now();
   const possible=[c.legalVerifiedAt,c.lawReviewedAt,
      !c.stageType&&reviewLevels.has(c.reviewStatus)?c.penaltyChecked:null].filter(Boolean);
   const badDates=possible.filter(x=>!isDate(x));
   const dates=possible.map(dateOf).filter(Boolean);
   const futureDates=dates.filter(d=>Date.parse(d+'T00:00:00Z')>validNow);
   const eligibleDates=dates.filter(d=>Date.parse(d+'T00:00:00Z')<=validNow);
   const latest=Math.max(0,...eligibleDates.map(d=>Date.parse(d+'T00:00:00Z')));
   const lastReview=latest?new Date(latest).toISOString().slice(0,10):null;
   const penaltyVerified=!!(!c.stageType&&reviewLevels.has(c.reviewStatus)&&dateOf(c.penaltyChecked)
     &&Date.parse(c.penaltyChecked+'T00:00:00Z')<=validNow);
   const stale=!!(latest&&Number.isFinite(nowMs)&&nowMs>=Date.UTC(
     new Date(latest).getUTCFullYear()+3,
     new Date(latest).getUTCMonth(),
     new Date(latest).getUTCDate()
   ));
   let lawStatus=c.lawMode==='missing'?'Saknas offline':c.lawMode==='machine'?'Maskinimporterad – ej slutgranskad':c.lawMode==='full'?'Lagtext inlagd – kontrollera aktuell lydelse':c.lawMode==='stage-reference'?'Förstadium – särskilt lagstöd måste kontrolleras':'Utdrag – kontrollera fulltext';
   if(c.reviewStatus==='source-changed')lawStatus='Källtext ändrad – kräver ny granskning';
   const editionMarkers=legalEditionMarkers(c.law);
   const parallelVersions=editionMarkers.length>0;
   const penaltyStatus=c.reviewStatus==='source-changed'?'Kontroll krävs efter lagändring':penaltyVerified?'Dokumenterad kontroll '+dateOf(c.penaltyChecked):c.penaltyRange?'Strukturerad, men ej individuellt verifierad':'Straffskala inte maskinellt verifierad';
   const prosecutionStatus=c.stageStatus&&c.stageStatus!=='punishable'?'Inte relevant som självständig straffbar rubricering':c.prosecution==='unknown'?'Ej verifierad':c.prosecutionSourceTier==='general-rule-only'?'Allmänt åtal enligt huvudregel – undantag ej individuellt kontrollerade':c.prosecution==='general'?'Allmänt åtal registrerat – kontrollera undantag':'Särskilda åtalsvillkor registrerade';
   const stageStatus=!c.stageType?'Se särskilda förstadieposter':c.stageStatus==='punishable'?'Straffbart enligt registrerat lagstöd':c.stageStatus==='not-criminalized'?'Ej straffbart enligt registrerat lagstöd':'Ej verifierat – dra ingen slutsats om straffrihet';
   return {
     stale,lastReview,
     sourceURL:sourceURL(c)||sourceURL(parent||{}),
     law:lawStatus,penalty:penaltyStatus,prosecution:prosecutionStatus,stages:stageStatus,
     lastReviewLabel:lastReview?'Senaste dokumenterade sakgranskning: '+lastReview:'Ingen individuell kontrolltidpunkt dokumenterad',
     invalidReviewNote:badDates.length?'Varning: ogiltigt dokumenterat kontroll­datum. Tidsstämpeln har inte använts för att bedöma aktuell rättslig kontroll.':null,
     futureReviewNote:futureDates.length?'Varning: registrerat kontroll­datum ligger i framtiden ('+futureDates.join(', ')+'). Det används inte som bevis på genomförd granskning.':null,
     alternateVersionNote:parallelVersions?'Källutdraget innehåller särskilda ikraftträdande- eller upphörandemarkeringar ('+editionMarkers.map(m=>m.kind+' '+m.when).join(' · ')+'). Kontrollera vilken lydelse som gäller på gärningsdagen.':null,
     effectiveNote:c.introducedFrom?'Brottstypen infördes '+c.introducedFrom+'. Gäller inte gärningar före ikraftträdandet.':c.effectiveFrom?'Den registrerade straffskaleversionen gäller från '+c.effectiveFrom+'. Äldre gärningar kräver äldre lagversion.':null,
     dateNotice:'Datumen avser dokumenterade kontroller, inte automatiskt uppdaterad lagtext. Rättsläget vid gärningstidpunkten behöver bedömas särskilt.',
     versionStatus:'Giltig lagversion för gärningsdatum: inte automatiskt fastställd.'
   };
 };
 window.BK_QUALITY11={metadata,thresholdYears:3,version:'1.1'};
})();