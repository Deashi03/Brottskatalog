/* V1.5: 23 individual numerical grades from official consolidated BidrBrL, PTBL, SkBrL, LBE, 2026-10-18.
 * Does not approve imported special SFS text, individual liability, offences with extraordinary grading, or coercion.
 */
(()=>{'use strict';const D=window.BK_DATA,docs=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!docs)return;
const rows=[["Bidragsbrott","BidrBrL",["2"],0,2,false,"bidragsbrott till fängelse i högst två år"],["Grovt bidragsbrott","BidrBrL",["3"],1,6,false,"grovt bidragsbrott till fängelse i lägst ett och högst sex år"],["Ringa bidragsbrott","BidrBrL",["2"],0,0.5,true,"om brottet är ringa, till böter eller fängelse i högst sex månader"],["Vårdslöst bidragsbrott","BidrBrL",["4"],0,1,true,"vårdslöst bidragsbrott till böter eller fängelse i högst ett år"],["Grov näringspenningtvätt","PTBL",["7"],1,6,false,"Är brottet grovt, döms till fängelse i lägst ett och högst sex år"],["Grovt penningtvättsbrott","PTBL",["5"],1,6,false,"grovt penningtvättsbrott till fängelse i lägst ett och högst sex år"],["Näringspenningtvätt","PTBL",["7"],0,2,false,"näringspenningtvätt till fängelse i högst två år"],["Penningtvättsbrott","PTBL",["3","4"],0,2,false,"Straffet är fängelse i högst två år"],["Penningtvättsförseelse","PTBL",["6"],0,0.5,true,"penningtvättsförseelse till böter eller fängelse i högst sex månader"],["Ringa näringspenningtvätt","PTBL",["7"],0,0.5,true,"Är brottet ringa, döms till böter eller fängelse i högst sex månader"],["Försvårande av skattekontroll","SkBrL",["10"],0,2,true,"försvårande av skattekontroll till böter eller fängelse i högst två år"],["Grovt försvårande av skattekontroll","SkBrL",["10"],0.5,4,false,"om brottet är grovt, till fängelse i lägst sex månader och högst fyra år"],["Grovt skattebrott","SkBrL",["4"],1,6,false,"grovt skattebrott till fängelse i lägst ett och högst sex år"],["Skatteavdragsbrott","SkBrL",["6"],0,1,true,"skatteavdragsbrott till böter eller fängelse i högst ett år"],["Skattebrott","SkBrL",["2"],0,2,false,"skattebrott till fängelse i högst två år"],["Skatteförseelse","SkBrL",["3"],0,0,true,"skatteförseelse till böter"],["Skatteredovisningsbrott","SkBrL",["7"],0,0.5,true,"skatteredovisningsbrott till böter eller fängelse i högst sex månader"],["Vårdslös skatteredovisning","SkBrL",["8"],0,0.5,true,"vårdslös skatteredovisning till böter eller fängelse i högst sex månader"],["Vårdslös skatteuppgift","SkBrL",["5"],0,1,true,"vårdslös skatteuppgift till böter eller fängelse i högst ett år"],["Brott mot tillståndsplikten för brandfarliga varor","LBE",["29"],0,1,true,"böter eller fängelse i högst ett år om brottet avser brandfarliga varor"],["Brott mot tillståndsplikten för explosiva varor","LBE",["29"],0,5,true,"böter eller fängelse i högst fem år om brottet avser explosiva varor"],["Grovt brott mot tillståndsplikten för explosiva varor","LBE",["29a"],4,7,false,"att anse som grovt döms till fängelse i lägst fyra och högst sju år"],["Synnerligen grovt brott mot tillståndsplikten för explosiva varor","LBE",["29a"],6,10,false,"synnerligen grovt döms till fängelse i lägst sex och högst tio år"]],sources={"BidrBrL":["2026:1322","https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/"],"PTBL":["2026:1323","https://rkrattsbaser.gov.se/sfst?bet=2014:307"],"SkBrL":["2026:1531","https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/"],"LBE":["2026:1584","https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/"]};
const base=D.crimes.filter(c=>!c.stageType),map=new Map(base.map(c=>[c.title.toLocaleLowerCase('sv'),c]));
const normal=s=>String(s||'').replace(/\s+/g,' ').trim().toLocaleLowerCase('sv');
const audit={planned:rows.length,reviewed:0,missing:[],held:[],mismatch:[],checked:'2026-10-18',groups:{},sourceScope:'individual-special-penalty-grade-only',notFullLegalSignoff:true};
for(const [title,family,sections,min,max,fines,marker] of rows){
 const c=map.get(title.toLocaleLowerCase('sv')),doc=docs[family],def=sources[family];
 if(!c){audit.missing.push(title);continue;}
 if(!doc||doc.observedVersion!==def[0]||sections.some(s=>!doc.sections?.[s]?.text)){
  audit.held.push({title,reason:'changed or missing SFS source'});continue;}
 const texts=sections.map(s=>doc.sections[s].text).join(' ');
 if(!normal(texts).includes(normal(marker))){
  audit.held.push({title,reason:'source phrase has changed',marker});continue;}
 const range=c.penaltyRange||{};
 if(range.min!==min||range.max!==max||Boolean(range.fines)!==fines||Boolean(range.life)){
  audit.mismatch.push({title,expected:{min,max,fines,life:false},stored:range});continue;}
 if(c.penaltyRangeVerified===true&&c.penaltyReviewScope!=='range-only'){
  audit.held.push({title,reason:'already certified under different standard'});continue;}
 c.penaltyRangeVerified=true;
 c.penaltyReviewScope='individual-current-special-statute-grade-range-only';
 c.penaltyGradeReviewDate='2026-10-18';
 c.penaltyGradeReviewSource=def[1];c.penaltyGradeReviewSourceVersion=doc.observedVersion;
 c.penaltyGradeReviewProvision=family+' '+sections.join('–')+' §';
 c.penaltyReviewSafety='Only numeric penalty range/fines for a specifically named statutory grade; special act, criminalization, inchoate powers, charge permission and date of conduct require separate review.';
 c.penaltyGradeReviewCaveat='Kontrollerat intervall för angiven grad. Undantag, subsidiaritet, gärningstidpunkt och särskilda åtalsvillkor måste prövas separat.';
 if(c.lawMode==='machine'&&c.lawCompletenessVerified===true)throw Error('Unjustified full-source approval on '+title);
 audit.groups[family]=(audit.groups[family]||0)+1;audit.reviewed++;
}
window.BK_SPECIAL_OTHER_GRADES15=audit;})();