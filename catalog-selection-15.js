/* Apply the user's catalogue scope after every importer and legal review.
 * Keep source/audit records intact: visibility is not a finding of impunity.
 * SmuglL 4, 6 b second paragraph and 9 checked against Riksdagen 2026-10-20.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const byId=new Map(D.crimes.map(c=>[c.id,c]));
const isBrB=c=>/^BrB(?::|\b)/i.test(String(c?.statute||c?.shortRef||''));
const onlyMoneyFine=c=>!isBrB(c)&&Boolean(c?.penaltyKind==='penningboter-only'
 ||c?.penaltyFineType15==='penningböter'
 ||/^(?:endast\s+)?penningböter\.?$/i.test(String(c?.penalty||'').trim()));
const included=c=>{
 if(!c)return false;
 // Stage cards belong to the same catalogue family. Do not infer their
 // criminalization or sentence from the completed offence's fine type.
 const parent=c.stageType?byId.get(c.stageParentId):c;
 return Boolean(parent&&!onlyMoneyFine(parent));
};
window.BK_CATALOG_SELECTION15={included,
 checked:'2026-10-20',scope:'catalogue-visibility-only',
 sourceURL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/',
 inventory:D.crimes.length,searchable:D.crimes.filter(included).length,
 excludedBaseIds:D.crimes.filter(c=>!c.stageType&&!included(c)).map(c=>c.id),
 excludedStageIds:D.crimes.filter(c=>c.stageType&&!included(c)).map(c=>c.id),
 legalStatusChanged:false};
})();
