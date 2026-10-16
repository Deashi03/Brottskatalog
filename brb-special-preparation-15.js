/* V1.5: BrB 4:9b is an EXPRESSLY punishable preparatory act.
 * It is not a new underlying completed offence and must not recursively
 * generate "attempted preparation" catalogue entries.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const title='Förberedelse genom anbringande av tekniskt hjälpmedel';
const existing=D.crimes.find(c=>c.title?.toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
if(existing)return;
const p=window.BK_STATUTES?.['BrB:4:9b'];
if(!p?.text)throw Error('BrB 4:9b missing source text');
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
D.crimes.push({
 id:'v15-brb4-9b',title,shortRef:'BrB 4:9b',ref:'BrB 4 kap. 9 b §',
 statute:'BrB:4:9b',category:'Person',
 aliases:['Förberedelse till brytande av telehemlighet','Förberedelse till kränkande fotografering','Förberedelse till olovlig avlyssning','Förberedelse med teknisk utrustning'],
 penalty:'Böter eller fängelse i högst två år',penaltyShort:'B–F högst 2 år',
 penaltyRange:{min:0,max:2,fines:true,life:false},penaltyChecked:'2026-10-16',
 penaltyRangeVerified:true,penaltyReviewScope:'numerical-scale-and-special-preparation-only',
 penaltySourceURL:URL,
 penaltyNote:'Särskilt straffbelagd förberedelsegärning: tekniskt hjälpmedel ska anbringas med uppsåt att bryta telehemlighet enligt BrB 4:8 eller att utföra gärning enligt 4:6 a eller 4:9 a. Bestämmelsen gäller endast om fullbordat brott inte begåtts. Detta är inte en allmän straffbarhet för alla förberedelser till dessa brott.',
 prosecution:'general',prosecutionLabel:'Allmänt åtal',prosecutionRule:'RB 20:3; BrB 4:9b',
 prosecutionDetails:['Inget separat generellt krav på målsägandeangivelse följer av BrB 4:9 b. Kontrollera särskilda processuella undantag.'],
 prosecutionChecked:'2026-10-16',prosecutionSourceURL:URL,
 custody:'possible',
 law:p.text,lawSource:p.ref,lawMode:'machine',sourceURL:URL,
 reviewStatus:'law-text-legal-review-pending',requisitesStatus:'pending-individual-legal-review',
 elements:[],variants:[],facts:[],stages:['Denna post avser redan en särskilt kriminaliserad förberedelsegärning, inte ett fullbordat grundbrott.'],related:[],lawTerms:[],
 typexempel15:[],isStandaloneInchoate:true,
 legalDependencies:['BrB:4:9b','BrB:4:8','BrB:4:6a','BrB:4:9a']
});
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_SPECIAL_PREPARATION15={added:1,source:URL,recursiveStagesPrevented:true};
})();