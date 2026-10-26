/* Brottskatalog 1.7 – samlad straffskalescreening för häktning, gripande och tvångsmedel.
 * Grundprincip: en uppgift som appen inte kan verifiera visas som "ej verifierad" (?),
 * aldrig som "ej uppfyllt" (✕). Förstadier prövas mot det fullbordade brottets verifierade
 * straffskala enligt BrB 23:1 tredje stycket (försök: högst som fullbordat brott) och
 * BrB 23:2 fjärde stycket (förberedelse/stämpling: under fullbordat brotts högsta straff).
 * Screeningen är aldrig ett beslut om häktning eller tvångsmedel i det enskilda fallet.
 */
(()=>{'use strict';
const D=window.BK_DATA,R=window.BK_COERCIVE;if(!D)return;
const RELEASE='1.7';
const STAGES=['forsok','forberedelse','stampling'];
const PRESUMPTION_TITLES=['Grov fridskränkning','Grov kvinnofridskränkning','Hedersförtryck'];
// Brott där samma brottsbeteckning har en lindrigare skala för mindre grova/allvarliga fall.
// Häktningspresumtionen (RB 24:1 andra stycket 1) visas därför med förbehåll.
const PRIVILEGED={
 'Människorov':'Mindre grovt brott: fängelse i högst sex år (BrB 4:1 andra stycket).',
 'Människohandel':'Mindre grovt brott: fängelse i lägst sex månader och högst fyra år (BrB 4:1 a tredje stycket).',
 'Våldtäkt':'Mindre grovt brott: fängelse i lägst sex månader och högst fyra år (BrB 6:1).',
 'Mordbrand':'Mindre allvarligt brott: fängelse i lägst ett och högst tre år (BrB 13:1 andra stycket).',
 'Allmänfarlig ödeläggelse':'Mindre allvarligt brott: fängelse i lägst ett och högst tre år (BrB 13:3).'
};
const all=()=>D.crimes.concat(window.BK_TRAFFIC16?.entries||[]);
let index=null;
const byId=id=>{if(!index)index=Object.fromEntries(all().map(c=>[c.id,c]));return index[id];};
const punishable=c=>!!c&&(!c.stageStatus||c.stageStatus==='punishable');
const isStage=c=>STAGES.includes(c?.stageType);
const rangeOf=c=>R?.range?.(c)||c.penaltyRange;

// En grundposts straffskala räknas som verifierad på samma villkor som i 1.6.2.
function verifiedBaseRange(c){
 if(!punishable(c)||isStage(c))return null;
 if(c.conditionalPenalty||c.applicabilityConditional||c.penaltyCrosscheckIssue)return null;
 if(c.penaltyRangeVerified!==true||R?.unresolvedForCoercion15?.(c))return null;
 const pr=rangeOf(c);
 if(!pr||!Number.isFinite(Number(pr.min))||!Number.isFinite(Number(pr.max)))return null;
 return {min:Number(pr.min),max:Number(pr.max),life:!!pr.life};
}

// Straffskaletrösklar för kortet. null = kan inte verifieras.
function thresholds(c){
 if(!punishable(c))return null;
 if(!isStage(c)){
  const r=verifiedBaseRange(c);if(!r)return null;
  return {basis:'verified',min:r.min,max:r.max,life:r.life,prison:r.max>0||r.life,oneYear:r.max>=1||r.life};
 }
 if(c.applicabilityConditional||c.conditionalPenalty||c.stageWartimePenaltyReview15)return null;
 const parent=byId(c.stageParentId);
 const p=parent&&verifiedBaseRange(parent);
 if(!p)return null;
 // Konflikt mellan förstadiets lagrade föräldraskala och föräldrakortet ⇒ ej verifierat.
 if(Number.isFinite(Number(c.stageParentMax))&&Number(c.stageParentMax)!==p.max)return null;
 const attempt=c.stageType==='forsok';
 return {basis:'parent',parentTitle:parent.title,min:p.min,max:p.max,life:p.life,
  prison:p.max>0||p.life,
  // Försök: högst fullbordat brotts maximum. Förberedelse/stämpling: under maximum,
  // över två år endast om fullbordat brott kan ge sex år eller mer.
  oneYear:attempt?(p.max>=1||p.life):(p.life||p.max>1)};
}

function custody(c){
 if(!punishable(c))return {ordinary:false,presumption:false,exceptional:false,investigation:false,
  onlyVia24_2:false,unknown:false,notPunishable:true,privileged:'',arrestByAnyone:false};
 const t=thresholds(c),cond=!!c.applicabilityConditional,stage=isStage(c);
 let presumption=null;
 if(!cond&&!stage&&PRESUMPTION_TITLES.includes(c.title))presumption=true;
 else if(t&&stage)presumption=Boolean(c.stageSource&&c.stageReviewDate&&t.min>=4);
 else if(t)presumption=t.min>=1.5;
 let ordinary=t?t.oneYear:null;
 if(presumption===true)ordinary=true; // presumtionen är en del av RB 24:1
 const exceptional=cond?null:true;
 const investigation=ordinary===true||exceptional===true?true:null;
 const parentTitle=stage?byId(c.stageParentId)?.title:null;
 const privileged=presumption===true?(PRIVILEGED[c.title]||PRIVILEGED[parentTitle]||''):'';
 return {ordinary,presumption,exceptional,investigation,
  onlyVia24_2:exceptional===true&&ordinary===false,unknown:ordinary===null,
  notPunishable:false,privileged,basis:t?.basis||null,
  // RB 24:7 andra stycket: brott på vilket fängelse kan följa.
  arrestByAnyone:t?t.prison:null};
}
function label(c){
 if(c.stageStatus==='not-criminalized')return 'Ej straffbart';
 if(c.stageStatus==='unverified')return 'Straffbarhet ej verifierad';
 const x=custody(c);
 if(x.presumption)return x.privileged?'Häktningspresumtion – ej vid mindre grovt fall':'Häktningspresumtion – pröva skäl';
 if(x.ordinary===true)return 'Häktning kan vara möjlig';
 if(x.ordinary===null)return 'Straffskala ej verifierad – kontrollera';
 return 'Endast särskild grund (RB 24:2)';
}
function icon(c){const x=custody(c);return x.ordinary===true?'scale':x.ordinary===null?'info':'minus-circle';}

// Tvångsmedel: ingen straffskalegräns ⇒ aldrig "ej verifierat"; förstadier via fullbordat brott.
if(R&&!R.v17){
 const prev=R.score;
 R.score=(c,e)=>{
  const v=prev(c,e);
  if(!punishable(c)||v.tone!=='unknown'||c.applicabilityConditional)return v;
  if(e?.scale==='any')return {label:'Ingen allmän straffskalegräns',tone:'neutral'};
  if(!isStage(c))return v;
  const t=thresholds(c);if(!t)return v;
  if(e?.scale==='f')return t.prison?{label:'Fängelse ingår i det fullbordade brottets straffskala (BrB 23:1–2)',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
  if(e?.scale==='one')return t.oneYear?{label:'Ettårsgränsen uppfylld via det fullbordade brottets straffskala (BrB 23:1–2)',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
  // RB 23:8 st. 2, 23:8 a och 28:2 a omfattar försök – men inte förberedelse eller stämpling –
  // till brott med minst fyra års fängelse som lägsta straff.
  if(e?.scale==='four')return c.stageType==='forsok'&&t.min>=4?{label:'Försök till brott med minimistraff ≥ 4 år',tone:'yes'}:{label:'Inte enligt huvudregel',tone:'no'};
  if(e?.scale==='fSpecial')return t.prison?{label:'Fängelse kan följa (RB 25:1 första stycket)',tone:'yes'}:{label:'Endast vid risk att personen lämnar riket (RB 25:1)',tone:'conditional'};
  if(e?.scale==='specific')return {label:'Brottstypen utesluter inte – särskilda villkor',tone:'conditional'};
  return v;
 };
 R.eligible=(c,e)=>['yes','neutral','conditional'].includes(R.score(c,e).tone);
 R.v17=true;
}

// Förstadiernas straffskaletext genereras ur samma gränser som detaljvyn visar.
function stageText(c){
 const low=String(c.stagePenaltyLower||''),up=String(c.stagePenaltyUpper||'');
 if(!low||!up)return null;
 const fines=/^böter/i.test(low);
 const lowPart=low.replace(/^Fängelse\s+/i,'');
 const strict=/^under\s/i.test(up);
 const upPart=/^(under|högst)\s/i.test(up)?up.charAt(0).toLowerCase()+up.slice(1):'högst '+up;
 const upShort=up.replace(/^(under|högst)\s+/i,'');
 return {penalty:fines?'Böter eller fängelse '+upPart:'Fängelse '+lowPart+' – '+upPart,
  short:(fines?'B–F ':'F '+lowPart+'–')+(strict?'< ':'')+upShort,fines};
}
const STAGE_LIMITS={
 'dataintrång':{forsok:'BrB 4:10: straffbart endast om gärningen inte skulle ha varit att anse som ringa om den fullbordats.',
  forberedelse:'BrB 4:10: straffbart endast om gärningen inte skulle ha varit att anse som ringa om den fullbordats.'},
 'utpressning':{forsok:'BrB 9:11: frivilligt tillbakaträdande (BrB 23:3) ger inte ansvarsfrihet vid försök till utpressning.'},
 'ringa utpressning':{forsok:'BrB 9:11: frivilligt tillbakaträdande (BrB 23:3) ger inte ansvarsfrihet vid försök till ringa utpressning.'},
 'grov utpressning':{forsok:'BrB 9:11: frivilligt tillbakaträdande (BrB 23:3) ger inte ansvarsfrihet vid försök till grov utpressning.'}
};
const changes={stageTexts:0,stageLimits:0,notes:0};
for(const c of D.crimes){
 if(isStage(c)&&c.stageStatus==='punishable'&&!c.conditionalPenalty){
  const s=stageText(c);
  if(s){
   if(c.penalty!==s.penalty||c.penaltyShort!==s.short)changes.stageTexts++;
   c.penalty=s.penalty;c.penaltyShort=s.short;
   if(c.penaltyRange)c.penaltyRange={...c.penaltyRange,fines:s.fines};
  }
  const parent=byId(c.stageParentId);
  const limit=STAGE_LIMITS[String(parent?.title||'').toLocaleLowerCase('sv')]?.[c.stageType];
  if(limit){
   const clean=t=>String(t||'').replace(/\s*Begränsning: BrB 9:11:[^.]*\./g,'').replace(/\s*Begränsning: BrB 4:10:[^.]*\./g,'').trim();
   c.stageExplanation=(clean(c.stageExplanation)+' Begränsning: '+limit).trim();
   c.penaltyNote=(clean(c.penaltyNote)+' Begränsning: '+limit).trim();
   changes.stageLimits++;
  }
 }
 if(!isStage(c)&&c.title==='Vållande till annans död'&&!/ringa/i.test(c.penaltyNote||'')){
  c.penaltyNote=((c.penaltyNote||'')+' Om brottet är ringa döms till böter (BrB 3:7 första stycket).').trim();changes.notes++;
 }
}
window.BK_SCREEN17={release:RELEASE,thresholds,custody,label,icon,privileged:PRIVILEGED,changes,
 checked:'2026-10-26',source:'RB 24:1–3, 6–7; BrB 23:1–2; RB 23, 27–28',noAutomaticDecision:true};
})();
