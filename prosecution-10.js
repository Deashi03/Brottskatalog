/* Brottskatalog 1.0 – Åtalsregler. Rättslig huvudregel RB 20:3.
  Förstudie juridiskt: konsoliderad BrB, smugglingslagen 20 §, skattebrottslagen
  13/13b §§, bidragsbrottslagen 6a §. Rättsläge/källa: 2026-10-13.
  Ingen automatisk konvertering av genuint ogranskade speciallagar till grönt. */
(()=>{'use strict';
 const D=window.BK_DATA;if(!D?.crimes)return;
 const map=new Map(D.crimes.map(c=>[c.id,c]));
 const rb='RB 20 kap. 3 §';
 const set=(c,kind,label,ref,lines)=>{
  c.prosecution=kind;c.prosecutionLabel=label;c.prosecutionRule=ref;
  c.prosecutionDetails=lines;c.prosecutionChecked='2026-10-13';
  c.prosecutionSource=ref;
 };
 const general=(c,ref=rb,extra=[])=>set(c,'general','Allmänt åtal',ref,
  ['Huvudregel: åklagare får väcka allmänt åtal. Något särskilt åtalsvillkor för denna rubricering har inte identifierats i de angivna bestämmelserna.',...extra]);
 const condition=(c,label,ref,lines)=>set(c,'conditional',label,ref,lines);
 const sect=c=>(c.shortRef||'').match(/(?:SmuglL|PTBL|SkBrL|BidrBrL|LBE)\s+([\d]+[a-z]?)/i)?.[1]||'';
 const rbChapter=c=>Number((c.shortRef||'').match(/^BrB\s+(\d+):/)?.[1]||0);
 const maybeBrBGeneral=new Set([6,13,14,15,18,19]);
 let counts={general:0,conditional:0,unknown:0,inherit:0};
 // Huvudbrotten – bevara redan källgranskade specialregler. Undanta ändrade källor.
 for(const c of D.crimes){
  if(c.stageType)continue;
  if(c.reviewStatus==='source-changed')continue;
  const short=c.shortRef||'',chapter=rbChapter(c);
  const sc=sect(c);
  if(/^PTBL\s/i.test(short)){
    general(c,rb+'; penningtvättsbrottslagen 3–8 §§',
      ['Kontrollera vilket penningtvättsbrott som är aktuellt; föreskrivna förstadier har egna straffbarhetsvillkor.']);
  }else if(/^SmuglL\s/i.test(short)){
    if(['3','4','7','8','9','11'].includes(sc)){
      condition(c,'Villkor vid avgift eller tulltillägg','Smugglingslagen 20 §; '+rb,
       ['Åtal för de särskilt angivna brotten får väckas endast om det är påkallat av särskilda skäl, när gärningen kan medföra relevant avgift eller tulltillägg.', 'Om dessa omständigheter inte föreligger tillämpas huvudregeln om allmänt åtal.']);
    }else general(c,rb+'; smugglingslagen 20 §',
       ['Begränsningen i 20 § gäller endast de gärningar som räknas upp där och under de där föreskrivna förutsättningarna.']);
  }else if(/^SkBrL\s/i.test(short)){
    if(sc==='3'){
      condition(c,'Åtal av särskilda skäl','Skattebrottslagen 13, 13 b §§',
       ['Skatteförseelse får åtalas endast om det är påkallat av särskilda skäl.', 'Om ett skattetillägg redan beslutats för samma fysiska person och samma felaktighet kan åtal vara spärrat enligt 13 b §.']);
    }else if(['2','5','6'].includes(sc)){
      condition(c,'Villkorat skatteåtal','Skattebrottslagen 13, 13 b §§',
       ['Särskilda skäl krävs om undandraget belopp understiger två prisbasbelopp och samma felaktighet/passivitet kan ligga till grund för skattetillägg.', 'Åtal kan dessutom vara spärrat om skattetillägg redan har beslutats för samma fysiska person och samma felaktighet.']);
    }else{
      condition(c,'Kontrollera skattetillägg','Skattebrottslagen 13 b §; '+rb,
       ['Brottet hör i princip under allmänt åtal.', 'Åtal för samma felaktighet/passivitet kan vara spärrat efter skattetilläggsbeslut enligt 13 b §. Kontrollera person och gärningsidentitet.']);
    }
  }else if(/^BidrBrL\s/i.test(short)){
    condition(c,'Kontrollera sanktionsavgift','Bidragsbrottslagen 6 a §; '+rb,
     ['Allmänt åtal är huvudregeln.', 'Åtal får inte väckas för samma person och samma uppgiftslämnande eller underlåtenhet som redan legat till grund för beslut om administrativ sanktionsavgift enligt 6 a §.']);
  }else if(/^LBE\s/i.test(short)){
    general(c,rb+'; lagen (2010:1011) om brandfarliga och explosiva varor 29–30 a §§',
     ['Verifiera straffbarhet, rätt brottstyp och eventuella specialbestämmelser.']);
  }else if(chapter===19 && /olovlig underrättelseverksamhet mot främmande makt|tagande av utländskt understöd|olovlig värvning/i.test(c.title)){
    condition(c,'Regeringens förordnande','BrB 19 kap. 16 §; RB 20 kap. 3 §',
      ['Åtal får väckas först efter regeringens förordnande i de fall som anges i BrB 19:16.', 'Bestämmelsen omfattar även vissa straffbara försök, förberedelser och stämplingar.']);
  }else if((c.prosecution==='unknown'||!c.prosecution)&&chapter&&maybeBrBGeneral.has(chapter)){
    general(c,rb+'; BrB '+chapter+' kap.',
      ['Den ordinarie åtalsregeln gäller enligt de genomgångna bestämmelserna i detta kapitel.']);
  }
 }
 // Källhänvisning där huvudregeln redan hade angetts utan ett separat rättskällefält.
 // Detta är INTE ny juridisk verifiering eller en garanti att specialundantag saknas.
 for(const c of D.crimes){
  if(c.stageType||c.prosecution!=='general'||c.prosecutionRule)continue;
  c.prosecutionRule=rb+' – generell utgångspunkt, pröva särskilda åtalsvillkor';
  c.prosecutionSourceTier='general-rule-only';
  c.prosecutionDetails=[...(c.prosecutionDetails||[]),'Källhänvisning till RB 20:3 är en generell rättslig utgångspunkt. Särskilda åtalsbegränsningar är inte individuellt slutgranskade för denna post.'];
 }
 // Straffbara förstadier – ingen särskild okänd åtalsstatus om parent är rättsligt granskad.
 // Villkorad åtalsregel ärvs som riskmarkering och prövas utifrån aktuell gärningsform.
 for(const c of D.crimes){
  if(!c.stageType||c.stageStatus!=='punishable')continue;
  // BrB 14:10/14:13: the underlying forgery and non-ringa prerequisite
  // are unresolved. Do not turn that into unconditional general prosecution.
  if(c.forgeryStageScope15?.finalCriminalityApproved===false){
    c.prosecution='unknown';c.prosecutionLabel='Åtalsvillkor måste prövas';
    c.prosecutionDetails=['Fastställ först lagstöd, icke-ringa gärning, konkret förfalskning och aktuell åtalsregel.'];
    continue;
  }
  const parent=map.get(c.stageParentId);if(!parent)continue;
  if(parent.prosecution==='general'){
    general(c,parent.prosecutionRule||rb,
      ['Förstadiet är särskilt straffbelagt. Pröva eventuell åtalsbegränsning utifrån gärningsform och fullbordat brotts bestämmelser.']);
    counts.inherit++;
  }else if(parent.prosecution==='conditional'){
    condition(c,parent.prosecutionLabel||'Särskilt åtalsvillkor',parent.prosecutionRule||rb,
      ['Straffbart förstadium till '+parent.title+'. Pröva om åtalsvillkoren omfattar just detta förstadium och den aktuella gärningsformen.',...(parent.prosecutionDetails||[])]);
    counts.inherit++;
  }else{
    c.prosecution='unknown';c.prosecutionLabel='Åtalsregel ej verifierad';
    c.prosecutionDetails=['Förstadiet är straffbart men aktuell åtalsregel har inte granskats tillräckligt.'];
  }
 }
 for(const c of D.crimes){
  counts[c.prosecution]= (counts[c.prosecution]||0)+1;
  if(c.prosecution==='unknown'){
   c.prosecutionLabel='Åtalsregel ej verifierad';
   if(!c.prosecutionDetails?.length)c.prosecutionDetails=['Kontrollera tillämplig författning och särskilda åtalsbestämmelser.'];
  }
 }
 window.BK_PROSECUTION10={counts,checked:'2026-10-13',default:rb};
})();