/* Brottskatalog 2.0 – förstadiekort för alla grundkort som saknade dem.
 * Varje grundkort får tre kort: försök, förberedelse och stämpling. Ett kort är äkta (straffbart) bara om
 * lagen särskilt föreskriver ansvar för just det förstadiet (BrB 23:1–2). Annars är kortet falskt och
 * säger uttryckligen att förstadiet inte är straffbart.
 * Grundkortet anger vilka förstadier som är straffbara i stagePermissions (F, P, S) och lagstödet i stageSource.
 * Straffskalan följer BrB 23:1–2 och räknas på samma sätt som i stages-08.js.
 */
(()=>{'use strict';
const STAGES=[['forsok','Försök till','försök',1,'F'],['forberedelse','Förberedelse till','förberedelse',2,'P'],['stampling','Stämpling till','stämpling',2,'S']];
const duration=n=>Number.isInteger(n)?n+' år':Math.round(n*12)<12?Math.round(n*12)+' mån':Math.floor(n)+' år '+Math.round(n%1*12)+' mån';
const lower=t=>t.charAt(0).toLocaleLowerCase('sv')+t.slice(1);
function make(c){
 const r=c.penaltyRange;if(!r||!Number.isFinite(Number(r.max)))return [];
 const p={min:Number(r.min)||0,max:Number(r.max),life:!!r.life};
 const permit=new Set(String(c.stagePermissions||'').split(''));
 const src=c.stageSource||'Lagen saknar bestämmelse om försök, förberedelse och stämpling';
 const out=[];
 for(const [slug,prefix,word,para,code] of STAGES){
  const ok=permit.has(code);
  const hasFine=code==='F'?p.min<2:p.min<6;
  const min=hasFine?0:1/12;
  const max=code==='F'?p.max:(p.max>=6?p.max:Math.min(p.max,2));
  const strict=code!=='F'&&!p.life;
  const maxLabel=(p.life&&code==='F')?duration(p.max)+' / livstid':duration(max);
  const limitNote=code==='F'
   ?(p.min>=2?'Böter är uteslutna enligt BrB 23:1. Lägsta fängelsestraff är en månad.':'Straffet är högst detsamma som för fullbordat brott. Böter kan ingå (BrB 23:1).')
   :'Straffet ska sättas under det högsta straffet för fullbordat brott. Fängelse i mer än två år får dömas ut bara om fullbordat brott kan ge fängelse i sex år eller mer (BrB 23:2).';
  const why=ok?limitNote+(c.stageRestriction?' '+c.stageRestriction:'')
   :(c.stageSource?'Bestämmelsen om förstadier ('+src+') nämner inte '+word+' till detta brott. '+word.charAt(0).toUpperCase()+word.slice(1)+' är därför inte straffbart.'
    :'Lagen har ingen bestämmelse som straffbelägger '+word+' till detta brott. '+word.charAt(0).toUpperCase()+word.slice(1)+' är straffbart bara när det är särskilt föreskrivet (BrB 23:'+para+').')
   +' En annan rubricering kan ändå bli aktuell.';
  const penalty=ok?(code==='F'?(hasFine?'Böter':'Fängelse 1 mån')+' – högst '+maxLabel:(strict?'Böter eller fängelse, lägre än '+duration(p.max)+(p.max<6?' och högst 2 år':''):'Böter eller fängelse högst '+duration(max))):'Saknar straffskala – ej kriminaliserat';
  const short=ok?(hasFine?'B–F ':'F ')+(code==='F'&&!hasFine?'1 mån–':'')+(strict?'< ':'')+maxLabel:'Ej straffbart';
  out.push({
   id:'stadium-20-'+slug+'-'+c.id,title:prefix+' '+lower(c.title),ref:(c.ref||'')+'; '+(c.stageSource?src+'; ':'')+'BrB 23:'+para,
   shortRef:(c.shortRef||'')+' · 23:'+para,category:c.category,aliases:[word+' '+c.title].concat((c.aliases||[]).slice(0,3).map(a=>word+' '+a)),
   statute:c.statute,sourceURL:c.sourceURL,penalty,penaltyShort:short,
   penaltyRange:ok?{min,max,fines:hasFine,life:code==='F'&&p.life}:null,penaltyRangeVerified:ok?true:undefined,
   penaltyNote:why,penaltyChecked:c.penaltyChecked,
   stageType:slug,stageStatus:ok?'punishable':'not-criminalized',stageSource:src,stageParentId:c.id,
   stageReviewDate:c.penaltyChecked||null,stageReviewBasis:c.stageSource?'Lagens särskilda bestämmelse om förstadier och BrB 23:1–2':'Lagen saknar bestämmelse om förstadier; BrB 23:1–2',
   stageParentMin:p.min,stageParentMax:p.max,stageParentLife:p.life,
   stagePenaltyLower:ok?(hasFine?'Böter':'1 mån'):null,
   stagePenaltyUpper:ok?(code==='F'?maxLabel:p.life?'Under livstid':p.max>2&&p.max<6?'Högst 2 år':'Under '+maxLabel):null,
   stageExplanation:why,custody:ok?(p.min>=4?'presumption':max>=1?'possible':'none'):'none',
   prosecution:ok?c.prosecution:'unknown',prosecutionLabel:ok?c.prosecutionLabel:'Ej tillämpligt som egen straffbar rubricering',
   prosecutionRule:ok?c.prosecutionRule:undefined,prosecutionDetails:ok?c.prosecutionDetails:['Förstadiet är inte straffbart.'],
   prosecutionStatutoryReview15:ok?c.prosecutionStatutoryReview15:undefined,
   law:ok?('Straffansvar för '+word+' följer av '+src+' jämförd med BrB 23:'+para+'.'):('Ingen straffbestämmelse finns för denna kombination. '+why),
   lawSource:(c.stageSource?src+'; ':'')+'BrB 23:'+para,lawMode:'stage-reference',stageLawNotice:true,reviewStatus:'stage-statute-reviewed',
   elements:[],facts:[],stages:[],related:[c.id],variants:[],lawTerms:[],added20:true
  });
 }
 return out;
}
/* Trafikbrottslagen har ingen bestämmelse om förstadier. */
const traffic=(window.BK_TRAFFIC16?.entries||[]);
const special=(window.BK_SPECIAL19?.entries||[]);
const have=new Set((window.BK_DATA?.crimes||[]).filter(c=>c.stageParentId).map(c=>c.stageParentId));
const entries=[];
for(const c of traffic.concat(special)){if(c.stageType||have.has(c.id))continue;entries.push(...make(c));}
window.BK_STAGES20={entries,make,punishable:entries.filter(e=>e.stageStatus==='punishable').length,notCriminalized:entries.filter(e=>e.stageStatus!=='punishable').length};
})();
