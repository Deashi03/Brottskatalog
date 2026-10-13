/* 1.2: Normalize preexisting, already displayed penalty shorthand into typed ranges.
 * Data-format transformation ONLY. It does NOT independently verify the legal scale.
 * Ambiguous source-changed or cross-reference scales remain unresolved.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
let converted=0,skipped=[];
function years(str){
 const s=String(str||'').trim().toLocaleLowerCase('sv');
 const number=s.match(/^(\d+(?:[,.]\d+)?)/);
 if(!number)return null;
 const val=Number(number[1].replace(',','.'));
 if(!Number.isFinite(val))return null;
 return /mån/.test(s)?val/12:val;
}
for(const c of D.crimes){
 if(c.stageType||c.penaltyRange)continue;
 const text=String(c.penaltyShort||'').trim();
 let range=null;
 if(/^(?:B|Böter|Penningböter)$/i.test(text)){
   range={min:0,max:0,fines:true,life:false};
 }else{
   const match=text.match(/^(B[–-]F|F)\s+(.+)$/i);
   if(!match){skipped.push([c.title,text]);continue;}
   const fines=match[1]!=='F',life=/livstid/i.test(match[2]);
   const clean=match[2].replace(/(?:\s*\/\s*)livstid/i,'').trim();
   const dash=clean.split(/\s*[–-]\s*/);
   if(dash.length>2){skipped.push([c.title,text]);continue;}
   const min=dash.length===2?years(dash[0]):0;
   const max=years(dash.length===2?dash[1]:dash[0]);
   if(min===null||max===null||max<min){skipped.push([c.title,text]);continue;}
   range={min,max,fines,life};
 }
 c.penaltyRange=range;
 c.penaltyRangeDerivedFrom='existing-user-visible-short-label';
 c.penaltyRangeVerified=false;
 // Preserve human-entered descriptions, original source dates and review status.
 converted++;
}
window.BK_PENALTY_NORMALIZATION12={converted,skipped};
})();