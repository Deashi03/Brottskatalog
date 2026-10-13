/* Brottskatalog: machine-extracted special SFS excerpts, kept distinct from legally verified text. */
(()=>{'use strict';
const D=window.BK_DATA, docs=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!docs)return;
let linked=0,missing=0;
for(const c of D.crimes){
 if(c.stageType||c.lawMode!=='missing')continue;
 const ref=String(c.shortRef||'');
 const m=ref.match(/^(SmuglL|PTBL|SkBrL|BidrBrL|LBE)\s+(\d+\s*[a-z]?)(?:\s*[–-]\s*(\d+\s*[a-z]?))?/i);
 if(!m)continue;
 const code=m[1],start=m[2].replace(/\s+/g,''),end=m[3]?.replace(/\s+/g,'');
 const parsed=docs[code];if(!parsed){missing++;continue;}
 const first=parsed.sections?.[start],second=end?parsed.sections?.[end]:null;
 if(!first?.text){missing++;continue;}
 const parts=[first.text];if(end&&second?.text)parts.push(second.text);
 const text=parts.join('\n\n');
 if(text.length<30||text.length>24000){missing++;continue;}
 c.law=text;
 c.lawMode='machine';
 c.lawSource=c.lawSource+' · automatiskt importerat från SFS '+parsed.sfs+' (kontrollerat källformat, ej juridiskt slutgranskat)';
 c.lawImportedAt=parsed.importedAt||null;
 c.lawTextVersion=parsed.observedVersion||null;
 c.lawProvenance='official-sfs-machine-excerpt';
 c.lawCompletenessVerified=false;
 c.sourceURL=c.sourceURL||parsed.sourceURL;
 // Deliberately leave penaltyChecked, prosecutionChecked, reviewStatus and any existing approvals unchanged.
 linked++;
}
window.BK_SPECIAL_IMPORT12={linked,missing,version:'1.2'};
})();