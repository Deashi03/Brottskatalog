/* V1.5 – 33 individually mapped special-law card texts from 20 directly
 * compared paragraphs on Sveriges riksdag, checked 2026-10-18.
 * Each frozen digest checks the FULL stored source string, not isolated
 * excerpt matches. A digest change, stale SFS consolidation, misplaced
 * section or previously approved card FAILS CLOSED.
 *
 * Current official sources: SFS 2000:1225 through 2026:1321;
 * SFS 2014:307 through 2026:1323; SFS 2010:1011 through 2026:1584.
 * Scope is complete CURRENT paragraph wording only, not historical
 * applicability, charge, custody, stage, offence grade or HD doctrine.
 */
(()=>{'use strict';const D=window.BK_DATA,P=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!P)return;
const sources={
 SmuglL:{version:'2026:1321',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/'},
 PTBL:{version:'2026:1323',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2014307-om-straff-for-penningtvattsbrott_sfs-2014-307/'},
 LBE:{version:'2026:1584',url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20101011-om-brandfarliga-och-explosiva_sfs-2010-1011/'}
};
const digests={
 SmuglL:{'3':['2b823b37',1862],'4':['0ae25fe7',79],'5':['08687415',521],
 '6':['e3a5317b',1275],'6a':['260d3f77',1162],'6b':['615fde5e',1213],
 '7':['80de331d',1242],'8':['b8d4df0e',1589],'9':['8f369f47',79],
 '10':['27aabcde',480],'11':['cf606efa',227],'12':['e7593cce',1020],
 '13':['fee92b89',666]},
 PTBL:{'3':['2359790d',604],'4':['5b18bb18',236],'5':['316ce711',410],
 '6':['47d7169f',306],'7':['dcf15bb8',598]},
 LBE:{'29':['965ceda1',332],'29a':['9631ba97',1052]}
};
const endings={
 'SmuglL:7':'\nTullbrott m.m.',
 'SmuglL:11':'\nOlovlig befattning med smuggelgods',
 'SmuglL:13':'\nFörsök, förberedelse och stämpling'
};
const expectedOpening=(code,sec)=>sec.replace(/(\d+)([a-z])/,'$1 $2')+' §\n';
function fingerprint(t){let h=2166136261;for(let i=0;i<t.length;i++)h=Math.imul(h^t.charCodeAt(i),16777619);
 return (h>>>0).toString(16).padStart(8,'0');}
const mapping=[
 ['Smuggling','SmuglL',['3']],
 ['Ringa smuggling','SmuglL',['4']],['Grov smuggling','SmuglL',['5']],
 ['Narkotikasmuggling','SmuglL',['6']],
 ['Narkotikasmuggling – avsedd att säljas','SmuglL',['6']],
 ['Ringa narkotikasmuggling','SmuglL',['6']],
 ['Grov narkotikasmuggling','SmuglL',['6']],
 ['Synnerligen grov narkotikasmuggling','SmuglL',['6']],
 ['Vapensmuggling','SmuglL',['6a']],['Ringa vapensmuggling','SmuglL',['6a']],
 ['Grov vapensmuggling','SmuglL',['6a']],
 ['Synnerligen grov vapensmuggling','SmuglL',['6a']],
 ['Smuggling av explosiv vara','SmuglL',['6b']],
 ['Ringa smuggling av explosiv vara','SmuglL',['6b']],
 ['Grov smuggling av explosiv vara','SmuglL',['6b']],
 ['Synnerligen grov smuggling av explosiv vara','SmuglL',['6b']],
 ['Olovlig införsel eller utförsel','SmuglL',['7']],
 ['Tullbrott','SmuglL',['8']],['Ringa tullbrott','SmuglL',['9']],
 ['Grovt tullbrott','SmuglL',['10']],
 ['Vårdslös tullredovisning','SmuglL',['11']],
 ['Olovlig befattning med smuggelgods','SmuglL',['12']],
 ['Grov olovlig befattning med smuggelgods','SmuglL',['13']],
 ['Penningtvättsbrott','PTBL',['3','4']],
 ['Grovt penningtvättsbrott','PTBL',['5']],
 ['Penningtvättsförseelse','PTBL',['6']],
 ['Näringspenningtvätt','PTBL',['7']],['Grov näringspenningtvätt','PTBL',['7']],
 ['Ringa näringspenningtvätt','PTBL',['7']],
 ['Brott mot tillståndsplikten för brandfarliga varor','LBE',['29']],
 ['Brott mot tillståndsplikten för explosiva varor','LBE',['29']],
 ['Grovt brott mot tillståndsplikten för explosiva varor','LBE',['29a']],
 ['Synnerligen grovt brott mot tillståndsplikten för explosiva varor','LBE',['29a']]
];
const report={planned:mapping.length,certified:0,sections:0,held:[],checked:'2026-10-18',
 status:'individually-reviewed-current-paragraph',sourceVersions:Object.fromEntries(Object.entries(sources).map(([k,v])=>[k,v.version])),
 finalLegalApproved:0,penaltyChanges:0,stageChanges:0,custodyChanges:0};
const verifiedKeys=new Set(),clean=new Map();
for(const [code,items] of Object.entries(digests))for(const [sec,[hash,len]] of Object.entries(items)){
 const source=P[code],x=source?.sections?.[sec],spec=sources[code],v=x?.text;
 if(source?.observedVersion!==spec.version||x?.complete!==false||typeof v!=='string'
  ||v.length!==len||fingerprint(v)!==hash||!v.startsWith(expectedOpening(code,sec)))
  continue;
 let candidate=v,ending=endings[code+':'+sec];
 if(ending){
  if(!candidate.endsWith(ending))continue;
  candidate=candidate.slice(0,-ending.length);
 }
 // The complete paragraph MUST remain after removal of a trailing imported heading.
 if(candidate.length<65||/^\d+\s*[a-z]?\s*§/.test(candidate.slice(-24)))continue;
 const key=code+':'+sec;
 verifiedKeys.add(key);clean.set(key,candidate);
}
for(const [title,code,keys] of mapping){
 const l=sources[code],c=D.crimes.find(x=>!x.stageType&&x.title===title);
 const raw=keys.map(k=>P[code]?.sections?.[k]?.text||'').join('\n\n');
 const full=keys.map(k=>clean.get(code+':'+k)).join('\n\n');
 const main=code+keys[0];
 if(!c||!keys.every(k=>verifiedKeys.has(code+':'+k))
  ||String(c.shortRef||'').replace(/\s+/g,'')!==main
    &&!(title==='Penningtvättsbrott'&&String(c.shortRef||'')==='PTBL 3–4')
  ||c.lawMode!=='machine'||c.lawCompletenessVerified===true
  ||c.rekvisit15?.legalReviewApproved===true
  ||c.law!==raw||!c.sourceURL?.includes('riksdagen.se')){
   report.held.push(title);continue;
 }
 Object.assign(c,{law:full,lawMode:'full',lawSource:l.url,
   lawCompletenessVerified:true,lawCompletenessChecked:'2026-10-18',
   lawCompletenessSourceURL:l.url,lawCompletenessReviewScope:'current-paragraph-only',
   lawProvenance:'current-official-SFS-direct-paragraph-review-with-locked-complete-extract-fingerprint',
   legalSourceVersion15:l.version,sourceURL:l.url});
 report.certified++;for(const k of keys)report.sections+=0,verifiedKeys.add(code+':'+k);
}
report.sections=verifiedKeys.size;
window.BK_SPECIAL_SMUGG_PTV_LBE_FULLTEXT15=report;
})();