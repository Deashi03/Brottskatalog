/* Brottskatalog 1.9 – rekvisitvyn.
 * Varje rekvisit har en typ med egen färg. Alla rader i en lista ska vara uppfyllda ("och").
 * Alternativ visas som "Minst ett av". Gärningsformer visas som flikar. Grova och ringa grader
 * visar grundbrottet som en utfällbar rad och därefter bara det som skiljer graden.
 * Förstadier (försök, förberedelse, stämpling) får rekvisit enligt BrB 23 kap.
 */
(()=>{'use strict';
const TYPES={gar:'Gärning',obj:'Objekt',foljd:'Följd',subj:'Uppsåt',krets:'Krets',plats:'Plats',undantag:'Inte brott om'};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
/* {{term}} eller {{term|visad text}} blir en knapp som visar lagens definition. */
function rich(text){
 const D=window.BK_DEF19||{};
 return esc(text).replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g,(m,id,shown)=>{
  const d=D[id];const label=shown||(d?d.term:id);
  return d?'<button type="button" class="rq-term" data-rq-def="'+esc(id)+'">'+esc(label)+'</button>':esc(label);
 });
}

/* Förstadier enligt BrB 23:1–3 (lydelse t.o.m. SFS 2026:94). */
const STAGE={
 forsok:{label:'Försök',ref:'BrB 23:1',items:[
  ['gar','Utförandet av brottet har påbörjats, men brottet har inte fullbordats.'],
  ['foljd','Minst ett av:',['Det fanns fara för att handlingen skulle leda till att brottet fullbordades.','Faran var utesluten bara på grund av tillfälliga omständigheter.','Faran var utesluten till följd av en myndighets åtgärd för att bekämpa brott, och gärningen är inte uppenbart mindre allvarlig.']],
  ['subj','Uppsåt till samtliga rekvisit i det fullbordade brottet.'],
  ['undantag','Gärningspersonen har frivilligt avbrutit utförandet eller på annat sätt gjort att brottet inte fullbordades (BrB 23:3).']]},
 forberedelse:{label:'Förberedelse',ref:'BrB 23:2 första stycket',items:[
  ['subj','Uppsåt att utföra eller främja brottet.'],
  ['gar','Minst ett av:',['Tar emot, lämnar, förmedlar eller utlovar betalning för brottet eller för att täcka kostnaderna för att utföra det.','Förvärvar, anskaffar, tillverkar, överlämnar, tar emot, förvarar, transporterar, sammanställer, överlåter eller tar annan liknande befattning med något som är särskilt ägnat att användas som hjälpmedel vid brottet eller att göra det möjligt.']],
  ['gar','Gärningspersonen har inte begått fullbordat brott eller försök till brottet.'],
  ['undantag','Faran för att brottet skulle fullbordas var ringa. Det gäller inte om faran var ringa eller utesluten till följd av en myndighets åtgärd för att bekämpa brott (BrB 23:2).'],
  ['undantag','Gärningen är med hänsyn till omständigheterna mindre allvarlig (BrB 23:2).'],
  ['undantag','Gärningspersonen har frivilligt gjort att brottet inte fullbordades (BrB 23:3).']]},
 stampling:{label:'Stämpling',ref:'BrB 23:2 andra stycket',items:[
  ['gar','Minst ett av:',['Kommer överens med någon annan om att gärningen ska utföras.','Försöker anstifta någon annan att utföra gärningen.','Åtar eller erbjuder sig att utföra gärningen.']],
  ['subj','Uppsåt till det brott som stämplingen avser.'],
  ['undantag','Faran för att brottet skulle fullbordas var ringa. Det gäller inte om faran var ringa eller utesluten till följd av en myndighets åtgärd för att bekämpa brott (BrB 23:2).'],
  ['undantag','Gärningen är med hänsyn till omständigheterna mindre allvarlig (BrB 23:2).'],
  ['undantag','Gärningspersonen har frivilligt gjort att brottet inte fullbordades (BrB 23:3).']]}
};

function itemsHtml(items){
 const main=items.filter(i=>i[0]!=='undantag'),unless=items.filter(i=>i[0]==='undantag');
 let h='';
 if(main.length)h+='<ol class="rq-list">'+main.map(([t,text,alt])=>'<li class="rq-row t-'+t+'"><span class="rq-tag">'+TYPES[t]+'</span><div class="rq-txt">'+
   (alt&&alt.length?'<span class="rq-any">'+rich(/^minst ett av:?$/i.test(text)?'Minst ett av':text)+'</span><ul class="rq-alt">'+alt.map(a=>'<li>'+rich(a)+'</li>').join('')+'</ul>':rich(text))+'</div></li>').join('')+'</ol>';
 if(unless.length)h+='<div class="rq-unless"><span class="rq-tag">Inte brott om</span><ul>'+unless.map(i=>'<li>'+rich(i[1])+'</li>').join('')+'</ul></div>';
 return h;
}
let tabSeq=0;
function formsHtml(forms){
 if(!forms||!forms.length)return '';
 if(forms.length===1)return itemsHtml(forms[0].i);
 const id='rq'+(++tabSeq);
 return '<div class="rq-forms" data-rq-tabs="'+id+'"><p class="rq-forms-h">Gärningsform – välj en</p><div class="rq-tabs" role="tablist">'+
  forms.map((f,i)=>'<button type="button" role="tab" class="rq-tab'+(i?'':' on')+'" aria-selected="'+(!i)+'" data-rq-tab="'+i+'">'+esc(f.n||('Form '+(i+1)))+'</button>').join('')+'</div>'+
  forms.map((f,i)=>'<div class="rq-panel" role="tabpanel"'+(i?' hidden':'')+'>'+itemsHtml(f.i)+'</div>').join('')+'</div>';
}
function gradeHtml(r,title){
 if(!r||!r.f||!r.f.length)return '';
 const free=/\*$/.test(r.t);r={t:r.t.replace('*',''),f:r.f};
 const grov=r.t==='grovt',ringa=r.t==='ringa'||r.t==='mindre';
 const head=grov?(/^synnerligen/i.test(title)?'Synnerligen grovt brott':'Grovt brott'):r.t==='mindre'?'Mindre grovt brott':ringa?(/^mindre/i.test(title)?'Mindre allvarligt brott':'Ringa brott'):'Gradbedömning';
 return '<div class="rq-grade '+(grov?'g-grov':ringa?'g-ringa':'g-grad')+'"><div class="rq-grade-h">'+head+' – helhetsbedömning</div><p>'+(free?'Lagen anger inga särskilda omständigheter. Exempel på vad som vägs in':grov?'Särskilt beaktas om':'Bedöms med hänsyn till')+':</p><ul>'+r.f.map(x=>'<li>'+rich(x)+'</li>').join('')+'</ul></div>';
}
function examplesHtml(c){
 const X=(window.BK_TYPEX19||{})[c.id];
 const list=X&&X.length?X:(c.typexempel15||[]).slice(0,1).map(t=>['typ',t.text]);
 if(!list.length)return '';
 const lab={typ:'Typexempel',variant:'Vanlig variant',form:'Gärningsform'};
 return '<div class="rq-ex">'+list.map(([k,text,form])=>'<div class="rq-ex-card k-'+esc(k)+'"><div class="rq-ex-h">'+esc(form||lab[k]||'Exempel')+'</div><p>'+rich(text)+'</p></div>').join('')+'</div>';
}
function render(c,byId,provisionLink){
 const R=window.BK_REKVISIT19||{};
 if(c.stageStatus&&c.stageStatus!=='punishable')return '<p class="rq-note">Förstadiet är inte straffbelagt.</p>';
 let d,baseId,title=c.title;
 if(c.stageType){const s=STAGE[c.stageType];if(!s)return '';d={f:[{n:'',i:s.items}]};baseId=c.stageParentId;}
 else{d=R[c.id];baseId=d&&d.g;}
 if(!d)return '<p class="rq-note">Rekvisit saknas för detta brott. Se lagtexten.</p>';
 const base=baseId&&byId?byId(baseId):null,bd=base&&R[base.id];
 let h='<div class="rq">';
 if(base&&bd)h+='<details class="rq-base"><summary><span class="rq-tag t-base">Grundbrott</span><span class="rq-base-t">'+esc(base.title)+'</span><small>'+esc(base.shortRef||'')+'</small></summary><div class="rq-base-body">'+formsHtml(bd.f)+'</div></details>';
 h+=formsHtml(d.f);
 h+=gradeHtml(d.r,title);
 h+=examplesHtml(c);
 const src=c.stageType?STAGE[c.stageType].ref+(base?' · '+(base.shortRef||''):''):(c.shortRef||'');
 h+='<p class="rq-src">Källa: '+esc(src)+(c.sourceURL?' · <a href="'+esc(c.sourceURL)+'" target="_blank" rel="noopener noreferrer">Lagtext</a>':'')+'</p>';
 return h+'</div>';
}
if(typeof document!=='undefined')document.addEventListener('click',e=>{
 const tab=e.target.closest('[data-rq-tab]');if(!tab)return;
 const box=tab.closest('[data-rq-tabs]');const i=Number(tab.dataset.rqTab);
 box.querySelectorAll(':scope > .rq-tabs > .rq-tab').forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',String(j===i));});
 box.querySelectorAll(':scope > .rq-panel').forEach((p,j)=>{p.hidden=j!==i;});
});
window.BK_RQ19={render,TYPES,STAGE};
})();
