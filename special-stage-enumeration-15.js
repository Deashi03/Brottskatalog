/* V1.5 – source-bound preliminary inchoate classification, 46 named
 * special-law base entries x 3 stages = 138 independently checked rows.
 * Current law sections compared with Riksdagen 2026-10-18:
 * Smuggling 14 §, penningtvätt 8 §, skattebrott 11 §,
 * LBE 30 a § and entire bidragsbrottslagen 1–7 §§.
 * This is statutory LIST-OF-STAGES review only. It is NOT individual
 * liability, preparation offence scope, penalty, prosecution or custody.
 */
(()=>{'use strict';
const D=window.BK_DATA,docs=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!docs)return;
const sources={
 SmuglL:{v:'2026:1321',sec:'14',len:1016,digest:'256f2d37',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/'},
 PTBL:{v:'2026:1323',sec:'8',len:189,digest:'bdd1a052',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/'},
 SkBrL:{v:'2026:1531',sec:'11',len:127,digest:'2a2e70b4',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/'},
 BidrBrL:{v:'2026:1322',sec:'1–7',len:3220,digest:'42254daf',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/'},
 LBE:{v:'2026:1584',sec:'30a',len:166,digest:'df695d28',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/'}
};
const checks={
 SmuglL:['För försök till smuggling','för förberedelse eller stämpling till grov smuggling','förberedelse till ringa narkotikasmuggling eller ringa vapensmuggling'],
 PTBL:['För försök, förberedelse eller stämpling till penningtvättsbrott','näringspenningtvätt som inte är ringa'],
 SkBrL:['För förberedelse eller stämpling till grovt skattebrott'],
 LBE:['För försök, förberedelse eller stämpling till brott enligt 29 a § första eller andra stycket']
};
const familyRules=new Map();
const add=(family,types,names)=>{for(const title of names.split('|')){if(familyRules.has(title))throw Error('Duplicate special stage manifest: '+title);familyRules.set(title,{family,types})}};
add('SmuglL','F','Smuggling|Tullbrott|Ringa smuggling av explosiv vara');
add('SmuglL','FP','Ringa narkotikasmuggling|Ringa vapensmuggling');
add('SmuglL','FPS','Grov smuggling|Narkotikasmuggling|Narkotikasmuggling – avsedd att säljas|Grov narkotikasmuggling|Synnerligen grov narkotikasmuggling|Vapensmuggling|Grov vapensmuggling|Synnerligen grov vapensmuggling|Smuggling av explosiv vara|Grov smuggling av explosiv vara|Synnerligen grov smuggling av explosiv vara|Grovt tullbrott|Grov olovlig befattning med smuggelgods');
add('SmuglL','','Ringa smuggling|Olovlig införsel eller utförsel|Ringa tullbrott|Vårdslös tullredovisning|Olovlig befattning med smuggelgods');
add('PTBL','FPS','Penningtvättsbrott|Grovt penningtvättsbrott|Näringspenningtvätt|Grov näringspenningtvätt');
add('PTBL','','Penningtvättsförseelse|Ringa näringspenningtvätt');
add('SkBrL','PS','Grovt skattebrott');
add('SkBrL','','Skattebrott|Skatteförseelse|Vårdslös skatteuppgift|Skatteavdragsbrott|Skatteredovisningsbrott|Vårdslös skatteredovisning|Försvårande av skattekontroll|Grovt försvårande av skattekontroll');
add('BidrBrL','','Bidragsbrott|Ringa bidragsbrott|Grovt bidragsbrott|Vårdslöst bidragsbrott');
add('LBE','FPS','Grovt brott mot tillståndsplikten för explosiva varor|Synnerligen grovt brott mot tillståndsplikten för explosiva varor');
add('LBE','','Brott mot tillståndsplikten för brandfarliga varor|Brott mot tillståndsplikten för explosiva varor');
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++)h=Math.imul(h^str.charCodeAt(i),16777619);return (h>>>0).toString(16).padStart(8,'0')}
const bidrKeys=['1','2','3','4','5','6','6a','7'];
const sourceText=(fam,s)=>{
 if(fam==='BidrBrL')return bidrKeys.map(k=>docs[fam]?.sections?.[k]?.text||'').join('\n###\n');
 return docs[fam]?.sections?.[s.sec]?.text||'';
};
const sourceOK={};
for(const [family,s] of Object.entries(sources)){
 const t=sourceText(family,s),hasText=family==='BidrBrL'?t.includes('7 §'):t.startsWith(s.sec.replace(/(\d+)([a-z])/,'$1 $2')+' §');
 sourceOK[family]=docs[family]?.observedVersion===s.v&&t.length===s.len&&hash(t)===s.digest
  &&hasText&&(checks[family]||[]).every(x=>t.includes(x));
}
const stageDefs=[['forsok','F'],['forberedelse','P'],['stampling','S']];
const base=D.crimes.filter(c=>!c.stageType),baseMap=new Map(base.map(c=>[c.id,c]));
const report={plannedFamilies:5,plannedParents:familyRules.size,planned:familyRules.size*3,
 reviewed:0,criminalized:0,notCriminalized:0,held:[],sourceOK,
 reviewedOn:'2026-10-18',scope:'explicit-source-enumeration-only',
 individualConsequencesApproved:0,legalScopeApproved:0,coercionApproved:0};
for(const [title,{family,types}] of familyRules){
 const p=base.find(c=>c.title===title);
 const s=sources[family],expected=String(p?.stagePermissions||'').split('').sort().join('');
 const wanted=types.split('').sort().join('');
 const sameTitle=Boolean(p&&p.id?.startsWith('v09-')&&p.stageReviewed===true&&expected===wanted
   &&p.stageSource?.includes(family==='BidrBrL'?'BidrBrL':family)
   &&p.sourceURL===s.url);
 for(const [slug,abbr] of stageDefs){
  const c=p&&D.crimes.find(c=>c.stageType===slug&&c.stageParentId===p.id);
  const should=types.includes(abbr);
  const status=should?'punishable':'not-criminalized';
  const old=c?.stageStatus;
  const valid=sameTitle&&sourceOK[family]&&c?.stageSource===p.stageSource
   &&c.stageStatus===status&&!c.stageReviewDate
   &&c.stageSource&&c.stageParentId===p.id&&c.stageType===slug;
  if(!valid){report.held.push({title,slug,family,sourceOK:sourceOK[family],parentOK:sameTitle,expectedStatus:status,actual:old});continue;}
  c.stageReviewDate='2026-10-18';
  c.stageReviewBasis='Individuell kontroll av '+title+' ('+slug+') mot aktuell särskild förstadiebestämmelse '+family+' '+s.sec+' §; endast lagtextens uttryckliga uppräkning.';
  c.stagePreliminaryScope15={status:'SOURCE_ENUMERATION_REVIEWED',checked:'2026-10-18',
   sourceURL:s.url,version:s.v,section:s.sec,sourceFingerprint:s.digest,
   reviewKind:'specified-offence-and-specific-stage-enumeration',
   criminalizedInCurrentAct:should,offenceDateApplicabilityReviewed:false,
   individualCriminalizationFinalApproved:false,
   consequencesApproved:false,coercionApproved:false,
   note:'Endast förstadiernas uppräkning i aktuell SFS är kontrollerad. En konkret gärnings straffbarhet, rekvisit, särskilda undantag, gärningsdatum, straffskala och tvångsmedelsbeslut kräver separat kontroll.'};
  if(should){
   c.custody='unknown';
   c.prosecution='unknown';
   c.prosecutionLabel='Förstadiets åtalsförutsättningar måste kontrolleras';
  }
  report.reviewed++;if(should)report.criminalized++;else report.notCriminalized++;
 }
}
window.BK_SPECIAL_STAGE_ENUMERATION15=report;
})();