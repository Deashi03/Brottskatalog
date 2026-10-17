/* V1.5, 2026-10-17: five COMPLETE individual paragraph texts checked
 * against Riksdagen's current consolidated BrB. Not doctrinal certification.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const full={
  "BrB:6:7": "7 §\nDen som, i annat fall än som avses förut i detta kapitel, har vaginalt samlag med eget barn eller dess avkomling, döms för samlag med avkomling till fängelse i högst två år.\n\nDen som, i annat fall än som avses förut i detta kapitel, har vaginalt samlag med sitt helsyskon, döms för samlag med syskon till fängelse i högst ett år.\n\nVad som sägs i denna paragraf gäller inte den som förmåtts till gärningen genom olaga tvång eller på annat otillbörligt sätt. Lag (2022:1043).",
  "BrB:21:7": "7 §\nOm en krigsman olovligen avviker eller uteblir från tjänstgöringen döms han eller hon för olovlig avvikelse av krigsman till böter eller fängelse i högst två år.\n\nOm brottet är grovt döms för grov olovlig avvikelse av krigsman till fängelse i högst tio år eller på livstid. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om krigsmannen\n1. avvikit under eller i anslutning till strid, eller\n2. gått över till fienden eller annars överlämnat sig frivilligt till denne. Lag (2026:924).",
  "BrB:21:15": "15 §\nFör försök, förberedelse eller stämpling till eller underlåtenhet att avslöja eller förhindra olovlig avvikelse av krigsman eller grov olovlig avvikelse av krigsman samt för försök, förberedelse eller stämpling till våld eller hot mot förman döms det till ansvar enligt 23 kap.\n\nFör medverkan till tjänstebrott får dömas endast den som därigenom åsidosatt tjänsteplikt. Lag (2026:924).",
  "BrB:22:6a": "6 a §\nDen som\n1. utvecklar, producerar eller på annat sätt förvärvar, lagrar eller bibehåller kemiska vapen eller överför, direkt eller indirekt, kemiska vapen till någon,\n2. använder kemiska vapen,\n3. deltar i militära förberedelser för användning av kemiska vapen, eller\n4. använder ämnen för kravallbekämpning som en metod för krigföring\ndöms för olovlig befattning med kemiska vapen till fängelse i högst fyra år, om gärningen inte är att bedöma som krigsförbrytelse enligt lagen (2014:406) om straff för vissa internationella brott.\n\nSom kemiska vapen enligt första stycket 1-3 ska anses sådant som definieras som kemiska vapen i Förenta nationernas konvention om förbud mot utveckling, produktion, innehav och användning av kemiska vapen samt om deras förstöring.\n\nÄr brottet grovt, döms till fängelse i högst arton år eller på livstid. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om gärningen varit ägnad att i väsentlig grad bidra till utveckling, produktion eller spridning av kemiska vapen eller till att sådana vapen används mot människor. Lag (2021:1014).",
  "BrB:22:6b": "6 b §\nDen som använder, utvecklar, tillverkar, förvärvar, innehar eller överlåter antipersonella minor (truppminor), döms för olovlig befattning med minor till fängelse i högst fyra år, om gärningen inte är att bedöma som krigsförbrytelse enligt lagen (2014:406) om straff för vissa internationella brott.\n\nFörsta stycket gäller endast minor som avses i konventionen den 18 september 1997 om förbud mot användning, lagring, produktion och överföring av antipersonella minor (truppminor) samt om deras förstöring.\n\nSådan befattning med minor som är tillåten enligt den konvention som avses i andra stycket utgör inte brott.\n\nÄr brottet grovt döms till fängelse i högst arton år eller på livstid. Vid bedömningen av om brottet är grovt ska det särskilt beaktas om gärningen väsentligt bidragit till att minor kommit att användas på ett sätt som inneburit fara för många människors liv eller hälsa. Lag (2021:1014)."
};
const report={refs:Object.keys(full),sectionsChecked:0,linkedCardsChecked:0,missing:[],mismatch:[],scope:'individually-compared-current-statutory-paragraph-text-only'};
const heading={'BrB:6:7':/^7\s*§/,'BrB:21:7':/^7\s*§/,'BrB:21:15':/^15\s*§/,'BrB:22:6a':/^6\s*a\s*§/,'BrB:22:6b':/^6\s*b\s*§/};
for(const [key,text] of Object.entries(full)){
 const item=W[key];
 if(!item?.text){report.missing.push(key);continue;}
 // Guard against future source import changes being silently re-certified.
 if(!heading[key].test(String(item.text).trim())||!heading[key].test(text)){
  report.mismatch.push(key);continue;
 }
 item.text=text;item.complete=true;item.machine=false;
 item.checked='2026-10-17';item.url=URL;
 item.completeTextProvenance='manual-crosscheck-current-SFS-paragraph-only';
 report.sectionsChecked++;
 for(const c of D.crimes.filter(c=>!c.stageType&&c.statute===key)){
  if(c.rekvisit15?.legalReviewApproved===true)throw Error('Unexpected full approval '+c.title);
  c.law=text;c.lawMode='full';c.lawSource=item.ref;
  c.lawCompletenessVerified=true;c.lawCompletenessChecked='2026-10-17';
  c.lawCompletenessSourceURL=URL;c.lawCompletenessReviewScope='current-paragraph-only';
  c.sourceURL=URL;
  // Penalty, prosecution, inchoate and legal-review approval are UNTOUCHED.
  report.linkedCardsChecked++;
 }
}
window.BK_CURATED_LAWTEXT15=report;
})();