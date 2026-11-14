/* Brottskatalog 2.0 – preskription (BrB 35 kap. i lydelse från 2025-04-01, SFS 2025:151 och 2025:962).
 * Räknar ut preskriptionstid och absolut preskription från kortets straffskala och låter användaren
 * ange brottsdatum för att se om brottet är preskriberat. Kontrollerad mot gällande lydelse 2026-11-13.
 */
(()=>{'use strict';
const CHECKED='2026-11-13';
const NEW_RULES='2025-04-01';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
/* 35:10 – brott som aldrig preskriberas. */
const NEVER=new Set(['v03-drap','v03-valdtakt-mot-barn','v03-grov-valdtakt-mot-barn']);
/* 35:10 – preskriberas inte om brottet begåtts mot någon under 18 år. */
const NEVER_IF_CHILD=new Set(['v03-valdtakt','v03-grov-valdtakt','v19-konsstympning','v19-konsstympning-grovt']);
/* 35:6 – tiden räknas från målsägandens 18-årsdag när brottet begåtts mot någon under 18 år. */
const CHILD_START=new Set(['v03-valdtakt','v03-grov-valdtakt','v03-oaktsam-valdtakt','v03-sexuellt-overgrepp','v03-grovt-sexuellt-overgrepp',
 'v03-oaktsamt-sexuellt-overgrepp','v03-sexuellt-utnyttjande-av-barn','v03-sexuellt-overgrepp-mot-barn','v04-grovt-sexuellt-overgrepp-mot-barn',
 'v03-utnyttjande-av-barn-for-sexuell-posering','v04-grovt-utnyttjande-av-barn-for-sexuell-posering','v04-utnyttjande-av-barn-genom-kop-av-sexuell-handling',
 'v04-sexuellt-ofredande-mot-barn','v04-grovt-sexuellt-ofredande-mot-barn','v03-sexuellt-ofredande','v04-grovt-sexuellt-ofredande',
 'v03-koppleri','v03-grovt-koppleri','v19-konsstympning','v19-konsstympning-mindre-grovt','v19-konsstympning-grovt','v19-oskuldsingrepp',
 'v03-barnpornografibrott','v03-grovt-barnpornografibrott']);
/* 35:6 första stycket 16 – försök omfattas bara för vissa av brotten. */
const CHILD_START_ATTEMPT=new Set(['v03-valdtakt','v03-grov-valdtakt','v03-sexuellt-overgrepp','v03-grovt-sexuellt-overgrepp',
 'v03-sexuellt-utnyttjande-av-barn','v03-sexuellt-overgrepp-mot-barn','v04-grovt-sexuellt-overgrepp-mot-barn',
 'v03-utnyttjande-av-barn-for-sexuell-posering','v04-grovt-utnyttjande-av-barn-for-sexuell-posering','v04-utnyttjande-av-barn-genom-kop-av-sexuell-handling',
 'v03-koppleri','v03-grovt-koppleri','v19-konsstympning','v19-konsstympning-mindre-grovt','v19-konsstympning-grovt','v19-oskuldsingrepp',
 'v03-barnpornografibrott','v03-grovt-barnpornografibrott']);
const FRID=new Set(['v03-grov-fridskrankning','v03-grov-kvinnofridskrankning','v15-hedersfortryck']);
/* Skattebrottslagen 14 § – minst fem år för brott enligt 3 och 5–8 §§. */
const TAX5=new Set(['v09-skatteforseelse','v09-vardslos-skatteuppgift','v09-skatteavdragsbrott','v09-skatteredovisningsbrott','v09-vardslos-skatteredovisning']);
const TAX_ALL=/^v09-(skatte|grovt-skatte|vardslos-skatte|forsvarande-av-skatte|grovt-forsvarande-av-skatte)/;
const BOOK=new Set(['v03-bokforingsbrott','v03-grovt-bokforingsbrott']);

function byId(id){return (window.BK_APP17&&window.BK_APP17.crimes||[]).find(x=>x.id===id)||null;}
function base(c){return c&&c.stageParentId?c.stageParentId:c&&c.id;}
function yearsFor(max,life){if(life||max>8)return 25;if(max>5)return 15;if(max>2)return 10;if(max>1)return 5;return 2;}
function oldYearsFor(max,life){if(life)return 25;if(max>8)return 15;if(max>2)return 10;if(max>1)return 5;return 2;}
function absoluteFor(max,life,years){if(max===0&&!life&&years===2)return 5;if(!life&&max<=2)return 15;return 30;}

/* 2.1: villkorade straffskalor – varje gren i penaltyAlternatives15 får sin egen preskriptionstid. */
function scaleRange(t){
 t=String(t||'');const life=/livstid/i.test(t);let max=0;
 for(const m of t.matchAll(/(\d+)\s*(år|månader|mån)/g)){const v=m[2]==='år'?+m[1]:+m[1]/12;if(v>max)max=v;}
 if(!max&&!life&&!/böter/i.test(t))return null;
 return {max,life};
}
function branches(c){
 if(!c||c.stageType||(c.penaltyRange&&Number.isFinite(Number(c.penaltyRange.max))))return [];
 return (c.penaltyAlternatives15||[]).map(a=>({when:a.when,scale:a.scale,range:scaleRange(a.scale)})).filter(a=>a.range);
}
function compute(c,range){
 if(!c||(c.stageStatus&&c.stageStatus!=='punishable'))return null;
 const r=range||c.penaltyRange;if(!r||!Number.isFinite(Number(r.max)))return null;
 const max=Number(r.max),life=!!r.life,b=base(c),stage=c.stageType||null;
 const par=stage?byId(c.stageParentId):null;
 const parentLife=stage?!!(c.stageParentLife||(par&&par.penaltyRange&&par.penaltyRange.life)):life;
 const out={max,life,years:null,absolute:null,never:false,neverIfChild:false,childStart:false,notes:[],rule:'',checked:CHECKED};
 /* 35:10: livstidsbrott, dråp, våldtäkt mot barn – och försök till livstidsbrott och dråp. */
 const lifeCrime=stage?(stage==='forsok'&&parentLife):life;
 if(lifeCrime||(NEVER.has(b)&&(!stage||(stage==='forsok'&&b==='v03-drap')))){
  out.never=true;out.rule='BrB 35:10';
  out.notes.push('Undantaget gäller inte om gärningspersonen var under 18 år vid brottet. Då preskriberas brottet enligt de vanliga reglerna (BrB 35:10 andra stycket).');
 }
 if(!stage&&NEVER_IF_CHILD.has(b))out.neverIfChild=true;
 let years=yearsFor(max,life);
 if(TAX5.has(b)&&!stage&&years<5){years=5;out.notes.push('Skattebrottslagen 14 § ger fem års preskriptionstid för detta brott, trots att straffskalan annars skulle ge två år.');}
 out.years=years;out.absolute=absoluteFor(max,life,yearsFor(max,life));
 out.oldYears=TAX5.has(b)&&!stage?5:oldYearsFor(max,life);
 out.rule=out.never?out.rule:'BrB 35:2 och 35:4';
 if(stage?(stage==='forsok'&&CHILD_START_ATTEMPT.has(b)):CHILD_START.has(b)){
  out.childStart=true;
  out.notes.push('Har brottet begåtts mot någon som var under 18 år räknas tiden från den dag målsäganden fyller eller skulle ha fyllt 18 år (BrB 35:6).');
 }
 if(FRID.has(b))out.notes.push('För de gärningar som ingår i brottet räknas tiden från målsägandens 18-årsdag, om de har begåtts mot någon under 18 år (BrB 35:6).');
 if(BOOK.has(b))out.notes.push('Vid bokföringsbrott räknas tiden från konkurs, ackord eller betalningsinställelse om det sker inom fem år från brottet, eller från beslutet om revision om Skatteverket beslutar om revision inom fem år (BrB 35:5).');
 if(TAX_ALL.test(b))out.notes.push('För brott enligt skattebrottslagen räcker det att den misstänkte inom tiden har delgetts en underrättelse om skälig misstanke som åklagaren har utfärdat (skattebrottslagen 14 §).');
 if(/effekt|skada|död|kroppsskada/i.test(c.title||'')&&/vallande/.test(b))out.notes.push('Krävs en viss effekt för straffansvar räknas tiden från den dag effekten inträdde, till exempel dödsfallet (BrB 35:5).');
 return out;
}

function words(n){return({2:'två',5:'fem',10:'tio',15:'femton',25:'tjugofem',30:'trettio'})[n]||String(n);}
function parse(s){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;const d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));return d.getUTCFullYear()===+m[1]&&d.getUTCMonth()===+m[2]-1&&d.getUTCDate()===+m[3]?d:null;}
function iso(d){return d.toISOString().slice(0,10);}
function addYears(d,n){const x=new Date(Date.UTC(d.getUTCFullYear()+n,d.getUTCMonth(),d.getUTCDate()));if(x.getUTCMonth()!==d.getUTCMonth())x.setUTCDate(0);return x;}
function days(a,b){return Math.round((b-a)/86400000);}

/* check(c,{crime,eighteen,child,today}) → resultat för datumkontrollen. */
function check(c,o){
 const br=branches(c);
 if(br.length&&!(o&&o.branch!==''&&o.branch!=null&&br[+o.branch]))return {status:'none',text:'Välj vilken gren av brottet som gäller.'};
 const p=compute(c,br.length?br[+o.branch].range:null);if(!p)return null;
 const crime=parse(o&&o.crime),today=parse(o&&o.today)||parse(iso(new Date()));
 if(!crime)return {status:'none',text:'Ange datum för brottet.'};
 if(crime>today)return {status:'none',text:'Datumet ligger i framtiden.'};
 const child=!!(o&&o.child),e18=parse(o&&o.eighteen);
 if(p.never||(p.neverIfChild&&child))return {status:'never',text:'Brottet preskriberas inte.',detail:['Gäller inte om gärningspersonen var under 18 år vid brottet.','Brott som begicks före den 1 april 2025 kan redan ha preskriberats enligt äldre regler. Kontrollera med åklagare.']};
 let start=crime,startNote='';
 if(p.childStart&&child){
  if(!e18)return {status:'none',text:'Ange den dag målsäganden fyller 18 år.'};
  if(e18>crime){start=e18;startNote='Tiden räknas från målsägandens 18-årsdag '+iso(e18)+'.';}
 }
 /* Övergångsregeln till SFS 2025:151: nya tider gäller äldre brott som inte redan var preskriberade 2025-04-01. */
 const limit=parse(NEW_RULES);
 if(crime<limit){
  const oldEnd=addYears(start,p.oldYears);
  if(oldEnd<limit)return {status:'out',end:iso(oldEnd),text:'Preskriberat enligt äldre regler.',detail:['Preskriptionstiden var '+words(p.oldYears)+' år och gick ut '+iso(oldEnd)+', före lagändringen den 1 april 2025.',startNote].filter(Boolean)};
 }
 const end=addYears(start,p.years),abs=addYears(start,p.absolute);
 const detail=[startNote,'Absolut preskription: '+iso(abs)+' ('+words(p.absolute)+' år).'].filter(Boolean);
 if(today>abs)return {status:'out',end:iso(abs),text:'Preskriberat. Den absoluta preskriptionstiden gick ut '+iso(abs)+'.',detail:[startNote].filter(Boolean)};
 if(today>end)return {status:'out',end:iso(end),abs:iso(abs),text:'Preskriberat sedan '+iso(end)+', om den misstänkte inte dessförinnan har häktats, fått del av åtal eller godkänt ett strafföreläggande.',detail};
 const left=days(today,end);
 return {status:left<=90?'soon':'ok',end:iso(end),abs:iso(abs),left,text:'Inte preskriberat. Sista dag: '+iso(end)+' ('+left+' '+(left===1?'dag':'dagar')+' kvar).',detail};
}

function branchHtml(c,br){
 const rows=br.map(b=>{const p=compute(c,b.range);return '<tr><td>'+esc(b.when)+'<span>'+esc(b.scale)+'</span></td><td>'+(p.never?'Preskriberas inte':p.years+' år')+'</td><td>'+(p.never?'–':p.absolute+' år')+'</td></tr>';}).join('');
 const opts='<option value="">Välj gren</option>'+br.map((b,i)=>'<option value="'+i+'">'+esc(b.when)+'</option>').join('');
 return '<div class="presk20"><p class="presk20-text">Straffskalan beror på vilken gren av brottet som gäller. Preskriptionstiden följer grenens högsta straff.</p>'+
  '<table class="presk20-table"><thead><tr><th>Gren</th><th>Preskription</th><th>Absolut</th></tr></thead><tbody>'+rows+'</tbody></table>'+
  '<div class="presk20-tool" data-presk20-card="'+esc(c.id)+'"><div class="presk20-tool-title">Är brottet preskriberat?</div>'+
  '<label class="presk20-field">Gren<select data-presk20="branch">'+opts+'</select></label>'+
  '<label class="presk20-field">Datum för brottet<input type="date" data-presk20="crime" max="'+iso(new Date())+'"></label>'+
  '<div class="presk20-result" data-presk20="result" role="status" aria-live="polite">Välj gren och ange datum för brottet.</div></div>'+
  '<p class="source-label">Preskriptionstid enligt BrB 35:2 och absolut preskription enligt BrB 35:4. Kontrollerad mot gällande lydelse '+CHECKED+'.</p></div>';
}
function html(c){
 const br=branches(c);if(br.length)return branchHtml(c,br);
 const p=compute(c);if(!p)return '';
 const id=esc(c.id);
 const head=p.never
  ?'<div class="presk20-main never"><strong>Preskriberas inte</strong><span>'+esc(p.rule)+'</span></div>'
  :'<div class="presk20-main"><strong>'+p.years+' år</strong><span>från den dag brottet begicks</span></div>'+
   '<dl class="presk20-facts"><div><dt>Preskriptionstid</dt><dd>'+words(p.years).replace(/^./,m=>m.toUpperCase())+' år (BrB 35:2)</dd></div>'+
   '<div><dt>Absolut preskription</dt><dd>'+words(p.absolute).replace(/^./,m=>m.toUpperCase())+' år (BrB 35:4)</dd></div></dl>'+
   '<p class="presk20-text">Brottet preskriberas om den misstänkte inte inom tiden har häktats, fått del av åtal eller godkänt ett strafföreläggande. Efter den absoluta tiden får påföljd aldrig dömas ut.</p>';
 const extra=(p.neverIfChild?['Har brottet begåtts mot någon som var under 18 år preskriberas det inte (BrB 35:10).']:[]).concat(p.notes);
 const notes=extra.length?'<ul class="presk20-notes">'+extra.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>':'';
 const childBox=(p.childStart||p.neverIfChild)?'<label class="presk20-check"><input type="checkbox" data-presk20="child"> Målsäganden var under 18 år vid brottet</label>'+
   (p.childStart?'<label class="presk20-field presk20-e18" hidden>Målsäganden fyller 18 år<input type="date" data-presk20="eighteen"></label>':''):'';
 const tool='<div class="presk20-tool" data-presk20-card="'+id+'"><div class="presk20-tool-title">Är brottet preskriberat?</div>'+
   '<label class="presk20-field">Datum för brottet<input type="date" data-presk20="crime" max="'+iso(new Date())+'"></label>'+childBox+
   '<div class="presk20-result" data-presk20="result" role="status" aria-live="polite">Ange datum för brottet.</div></div>';
 return '<div class="presk20">'+head+notes+tool+'<p class="source-label">Flera brott i samma gärning: påföljd får dömas ut för alla så länge något av dem inte är preskriberat (BrB 35:2 andra stycket). Kontrollerad mot gällande lydelse '+CHECKED+'.</p></div>';
}

function update(box){
 const c=byId(box.getAttribute('data-presk20-card'));if(!c)return;
 const q=n=>box.querySelector('[data-presk20="'+n+'"]');
 const child=!!(q('child')&&q('child').checked);
 const e18=box.querySelector('.presk20-e18');if(e18)e18.hidden=!child;
 const r=check(c,{crime:q('crime').value,child,eighteen:q('eighteen')?q('eighteen').value:'',branch:q('branch')?q('branch').value:''});
 const out=q('result');if(!r||!out)return;
 out.className='presk20-result '+r.status;
 out.innerHTML='<strong>'+esc(r.text)+'</strong>'+((r.detail||[]).map(d=>'<span>'+esc(d)+'</span>').join(''));
}
if(typeof document!=='undefined'){
 const on=e=>{const t=e.target;if(!t||!t.getAttribute||!t.getAttribute('data-presk20'))return;const box=t.closest('[data-presk20-card]');if(box)update(box);};
 document.addEventListener('input',on);document.addEventListener('change',on);
}
window.BK_PRESK20={compute,check,html,branches,scaleRange,checked:CHECKED,yearsFor,absoluteFor};
})();
