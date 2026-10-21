/* V1.5: 23 SmuglL grade ranges source compared to Swedish Parliament SFS 2000:1225 through 2026:1321.
 * Numeric grades only; criminalization/attempts/coercion/legal history not approved.
 */
(()=>{'use strict';const D=window.BK_DATA,docs=window.BK_SPECIAL_EXCERPTS;if(!D?.crimes||!docs)return;
const rows=[["Grov narkotikasmuggling","6",2,7,false,"grov narkotikasmuggling till fängelse i lägst två och högst sju år",false],["Grov olovlig befattning med smuggelgods","13",1,6,false,"grov olovlig befattning med smuggelgods till fängelse i lägst ett och högst sex år",false],["Grov smuggling","5",1,6,false,"grov smuggling till fängelse i lägst ett och högst sex år",false],["Grov smuggling av explosiv vara","6b",4,7,false,"grov smuggling av explosiv vara till fängelse i lägst fyra och högst sju år",false],["Grov vapensmuggling","6a",4,7,false,"grov vapensmuggling till fängelse i lägst fyra och högst sju år",false],["Grovt tullbrott","10",1,6,false,"grovt tullbrott till fängelse i lägst ett och högst sex år",false],["Narkotikasmuggling","6",0,3,false,"narkotikasmuggling till fängelse i högst tre år",false],["Narkotikasmuggling – avsedd att säljas","6",0.5,3,false,"Om narkotikan är avsedd att säljas, döms till fängelse i lägst sex månader och högst tre år",false],["Olovlig befattning med smuggelgods","12",0,2,true,"olovlig befattning med smuggelgods till böter eller fängelse i högst två år",false],["Olovlig införsel eller utförsel","7",0,2,true,"olovlig införsel eller olovlig utförsel till böter eller fängelse i högst två år",false],["Ringa narkotikasmuggling","6",0,0.5,true,"ringa narkotikasmuggling till böter eller fängelse i högst sex månader",false],["Ringa smuggling","4",0,0,true,"Om ett brott som avses i 3 § är att anse som ringa, döms till penningböter",true],["Ringa smuggling av explosiv vara","6b",0,0,true,"ringa smuggling av explosiv vara till penningböter",true],["Ringa tullbrott","9",0,0,true,"Om ett brott som avses i 8 § är att anse som ringa, döms till penningböter",true],["Ringa vapensmuggling","6a",0,0.5,true,"ringa vapensmuggling till böter eller fängelse i högst sex månader",false],["Smuggling","3",0,2,true,"smuggling till böter eller fängelse i högst två år",false],["Smuggling av explosiv vara","6b",0,5,true,"smuggling av explosiv vara till böter eller fängelse i högst fem år",false],["Synnerligen grov narkotikasmuggling","6",6,10,false,"synnerligen grov narkotikasmuggling till fängelse i lägst sex och högst tio år",false],["Synnerligen grov smuggling av explosiv vara","6b",6,10,false,"synnerligen grov smuggling av explosiv vara till fängelse i lägst sex och högst tio år",false],["Synnerligen grov vapensmuggling","6a",6,10,false,"synnerligen grov vapensmuggling till fängelse i lägst sex och högst tio år",false],["Tullbrott","8",0,2,true,"tullbrott till böter eller fängelse i högst två år",false],["Vapensmuggling","6a",0,5,false,"vapensmuggling till fängelse i högst fem år",false],["Vårdslös tullredovisning","11",0,2,true,"vårdslös tullredovisning till böter eller fängelse i högst två år",false]];
const official="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/";
const imported=docs.SmuglL||{},base=D.crimes.filter(c=>!c.stageType),byTitle=new Map(base.map(c=>[c.title.toLocaleLowerCase('sv'),c]));
const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toLocaleLowerCase('sv');
const audit={planned:rows.length,reviewed:0,held:[],mismatch:[],missing:[],checked:'2026-10-18',sourceVersion:imported.observedVersion,sourceURL:official,scope:'individual-current-smuggling-grade-range-only',penningboter:0};
for(const [title,sec,min,max,fines,marker,penning] of rows){
 const c=byTitle.get(title.toLocaleLowerCase('sv'));if(!c){audit.missing.push(title);continue;}
 const section=imported.sections?.[sec];
 if(imported.observedVersion!=='2026:1321'||!section?.text||!norm(section.text).includes(norm(marker))){
  audit.held.push({title,sec,reason:'expected exact statutory grade not present'});continue;
 }
 const x=c.penaltyRange||{};
 if(x.min!==min||x.max!==max||Boolean(x.fines)!==fines||Boolean(x.life)){
  audit.mismatch.push({title,expected:{min,max,fines,life:false},stored:x});continue;
 }
 if(c.penaltyRangeVerified===true&&c.penaltyReviewScope!=='range-only'){
  audit.held.push({title,sec,reason:'already approved under different audit scope'});continue;
 }
 c.penaltyRangeVerified=true;
 c.penaltyReviewScope='individual-current-smuggling-grade-range-only';
 c.penaltyGradeReviewDate='2026-10-18';
 c.penaltyGradeReviewSource=official;c.penaltyGradeReviewSourceVersion=imported.observedVersion;
 c.penaltyGradeReviewProvision='SmuglL '+sec.replace(/(\d+)([a-z])/,'$1 $2')+' §';
 c.penaltyReviewSafety='Only the indicated SmuglL completed grade numeric range and fine type are independently checked; never approve an inchoate grade, custody, special penalty conditions or lawtext by inference.';
 c.penaltyGradeReviewCaveat=penning?'Straffbart ringa brott: endast penningböter, inte dagsböter eller fängelse.':'Egen gärningsform och brottsgrad måste prövas; försök/förberedelse/stämpling och åtalsregler granskas separat.';
 if(penning){c.penaltyFineType15='penningböter';audit.penningboter++;}
 if(c.lawMode==='machine'&&c.lawCompletenessVerified===true)throw Error('No machine-import legal certification without individual text review '+title);
 audit.reviewed++;
}
window.BK_SMUGLL_GRADES15=audit;})();