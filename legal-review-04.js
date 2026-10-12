/* Brottskatalog 0.4: reviewed penalty ranges and conditional prosecution rules.
   Status derived from current consolidated Swedish BrB (2026-10-12), with exceptions explicitly flagged.
   Legal text stays in separate statute source; no reinterpretation via the parser. */
(()=>{
const D=window.BK_DATA;if(!D)return;
const rows=D.crimes.filter(c=>c.id.startsWith('v03-'));
const codes=["F10-18L","F6-10","F6","F3","F2-6","BF.5","F4","BF3","F4-18L","F2-10","F4","F1-10","X","BF2","F1-6","BF2","F1-4","F1-6","F1-6","F4","BF2","BF2","BF2","F.5-6","BF2","BF2","BF2","BF2","F1-8","B","BF2","BF.5","F3-6","F5-12","F4","F.5-2","F1-6","F4","F3-6","F5-12","F4","F.5-2","BF2","F1","F4","F2-10","F2","F2","F.5-4","BF1","F.5-4","BF.5","BF1","F.5-4","F3","F2-8","BF2","F2","F1-6","BF.5","F2","BF.5","F1-6","BF1","BF2","F1-6","F2","F2","F2","F2","F.5-6","F2","F2","B","BF.5","F2-8","F6-18L","F2-8","F4","F2-18L","F2","BF.5","F1-6","REF","F.5-4","F2-8","F2","BF.5","BF.5","BF.5","F2","BF1","BF2","F2","F1-6","BF2","F.5-4","PB","BF.5","F.5-4","F2-8","BF2","BF1","BF.5","BF2","F1.5-6","BF2","F6","F4-18L","BF2"];
if(rows.length!==codes.length){console.warn('Penalty review table length mismatch');return;}
const names={
  'Köp av sexuell tjänst':'Köp av sexuell handling',
  'Ringa urkundsförfalskning':'Förvanskning av urkund',
  'Brott mot griftefrid':'Gravfridsbrott',
  'Främjande av flykt':'Främjande av rymning eller flykt'
};
function setCode(c,code){
 if(code==='X'||code==='REF')return;
 const fines=code==='B'||code==='PB'||code.startsWith('BF');
 let min=0,max=0,life=false,range;
 if(code==='B'){range='Böter';}
 else if(code==='PB'){range='Penningböter';}
 else{
   const f=code.startsWith('BF')?code.slice(2):code.slice(1);
   life=f.endsWith('L');
   const clean=f.replace(/L$/,'');
   let [low,hi]=clean.includes('-')?clean.split('-'):['0',clean];
   min=Number(low);max=Number(hi);
   const duration=n=>n===.5?'6 månader':n===1.5?'1 år 6 månader':n+' år';
   const core=(min?'fängelse '+duration(min)+'–'+duration(max):'fängelse högst '+duration(max))+(life?' eller livstid':'');
   range=fines?'Böter eller '+core:core.replace(/^fängelse/,'Fängelse');
 }
 c.penalty=range;
 c.penaltyShort=code==='PB'?'Penningböter':code==='B'?'Böter':code.startsWith('BF')?'B–F '+(max===.5?'6 mån':max+' år'):(min?'F '+String(min).replace('.5',',5')+'–'+max+' år':'F '+(max===.5?'6 mån':max+' år'))+(life?' / livstid':'');
 c.penaltyNote=code.startsWith('BF')?'Böter eller fängelse enligt angiven straffskala.':code==='B'||code==='PB'?'Brottet har böter som straffskala.':'Straffskala enligt brottsbalkens konsoliderade bestämmelse.';
 c.custody=min>=1.5?'presumption':max>=1?'possible':'none';
 c.penaltyChecked='2026-10-12';
 c.penaltySource='Brottsbalken (1962:700), aktuell konsolidering, '+c.shortRef;
 c.reviewStatus='penalty-reviewed';
 c.penaltyRange={min,max,fines,life};
}
for(let i=0;i<rows.length;i++){
 const c=rows[i];
 if(c.title==='Grovt olaga frihetsberövande'){D.crimes=D.crimes.filter(x=>x!==c);continue;}
 if(names[c.title]){
  c.aliases=[...(c.aliases||[]),c.title];
  c.title=names[c.title];
 }
 if(c.title==='Främjande av rymning eller flykt'){
   c.statute='BrB:17:12a';
   c.ref='BrB 17 kap. 12 a §';
   c.shortRef='BrB 17:12a';
 }
 setCode(c,codes[i]);
 if(codes[i]==='REF'){
  c.penalty='Beror på det underliggande förfalskningsbrottet';
  c.penaltyShort='Se 14 kap.';
  c.penaltyNote='BrB 14:10 hänvisar till straffskalan för den aktuella förfalskningen. Ingen enda generell straffskala.';
  c.custody='unknown';
  c.reviewStatus='variable-penalty';
 }
 if(c.title==='Grov fridskränkning'||c.title==='Grov kvinnofridskränkning')c.custody='presumption';
 if(c.title==='Olaga frihetsberövande')c.penaltyNote='Huvudregel 1–10 år; mindre grovt brott: böter eller fängelse högst 2 år.';
 if(c.title==='Människorov')c.penaltyNote='Huvudregel 4–18 år eller livstid; mindre grovt brott: fängelse högst 6 år.';
 if(c.title==='Sexuellt övergrepp'||c.title==='Våldtäkt'||c.title==='Våldtäkt mot barn'||c.title==='Mened'||c.title==='Mordbrand')c.penaltyNote+=' En särskild straffskala kan gälla för mindre grova/mindre allvarliga fall.';
 c.prosecution='general';c.prosecutionLabel='Allmänt åtal';
 c.prosecutionRule='Huvudregel: allmänt åtal';
 c.prosecutionDetails=['Ingen särskild åtalsbegränsning har identifierats för denna rubricering vid genomgången av brottsbalkens kapitelvisa åtalsbestämmelser. Äldre gärningar och särskilda omständigheter kan kräva annan bedömning.'];
}
function condition(c,rule,heading,details,code='conditional'){
 c.prosecution=code;c.prosecutionLabel=heading;c.prosecutionRule=rule;c.prosecutionDetails=details;
}
for(const c of rows){
 if(!D.crimes.includes(c))continue;
 const chapter=Number(c.shortRef.match(/^BrB (\d+):/)?.[1]||0);
 const title=c.title.toLowerCase();
 if(chapter===3 && c.statute==='BrB:3:8' && !title.startsWith('grovt')){
   condition(c,'BrB 3:12','Angivelse + allmän synpunkt',['Åklagaren får åtala endast om målsäganden anger brottet till åtal OCH åtal är påkallat ur allmän synpunkt.','Angivelse krävs inte när brottet riktats mot någon under 18 år.']);
 }
 if(chapter===4){
   if(['BrB:4:6a','BrB:4:6b','BrB:4:6c','BrB:4:9'].includes(c.statute)){
     condition(c,'BrB 4:11','Angivelse eller allmän synpunkt',['Åklagare får åtala om målsäganden anger brottet till åtal ELLER åtal är påkallat från allmän synpunkt.','Detta är en åtalsbegränsning, inte ett krav på att brott inte får anmälas.']);
   }
   if(c.statute==='BrB:4:9a')condition(c,'BrB 4:11','Särskild regel utanför allmän plats',['För olovlig avlyssning som inte förövats på allmän plats får åklagaren åtala om målsäganden anger brottet till åtal ELLER åtal är påkallat från allmän synpunkt.']);
   if(c.statute==='BrB:4:4')condition(c,'BrB 4:11','Villkor vid vissa hot',['Olaga tvång genom hot om åtal, brottsanmälan eller menligt meddelande omfattas av särskild åtalsbegränsning.','Åtal för dessa gärningar kräver angivelse eller allmän synpunkt. Andra varianter av olaga tvång omfattas inte av just detta villkor.']);
 }
 if(chapter===5){
    condition(c,'BrB 5:5','Enskilt åtal / särskilda undantag',
    ['Huvudregel: målsäganden själv får väcka åtal.','Vid vissa förutsättningar får åklagare åtala när målsäganden är under 18 år, eller om målsäganden har angett brottet till åtal, OCH åtal är påkallat från allmän synpunkt.','Förtal och grovt förtal kan omfattas; för förolämpning gäller särskilt begränsade situationer som anges i 5 kap. 5 §.']);
 }
 if(chapter===8 && !['Grov stöld','Inbrottsstöld','Rån','Grovt rån'].includes(c.title)){
    condition(c,'BrB 8:13','Särskild regel vid närstående',['Vid brott mot närstående som anges i BrB 8:13 får åklagaren åtala endast efter målsägandens angivelse ELLER om åtal är påkallat ur allmän synpunkt.','Grov stöld, inbrottsstöld, rån och grovt rån undantas.']);
 }
 if(chapter===9 && !['Grovt bedrägeri','Grov utpressning'].includes(c.title)){
    condition(c,'BrB 9:12, 8:13','Särskild regel vid närstående',['Vid brott mot närstående enligt BrB 8:13 gäller särskilda åtalsvillkor.','För vissa bedrägerier, bl.a. kreditkontouttag och ringa snyltning, gäller dessutom krav på åtal motiverat från allmän synpunkt.']);
 }
 if(chapter===10){
    if(['Tagande av muta','Givande av muta','Handel med inflytande'].includes(c.title)){
      condition(c,'BrB 10:10 och 20:5','Åtal ur allmän synpunkt',['Åklagare får som huvudregel åtala endast om åtal är motiverat från allmän synpunkt.','Undantag finns i 20 kap. 5 § BrB.']);
    }else if(!['Grov förskingring','Grov trolöshet mot huvudman'].includes(c.title)){
      condition(c,'BrB 10:10, 8:13','Särskild regel / närstående',['Närståendebegränsningen i BrB 8:13 gäller som huvudregel även här.','Vissa fall av ringa förskingring och olovligt förfogande vid hyra eller kreditköp kräver att åtal av särskilda skäl är motiverat från allmän synpunkt.']);
    }
 }
 if(chapter===12 && ['Åverkan','Tagande av olovlig väg'].includes(c.title)){
   condition(c,'BrB 12:6','Åtal av särskilda skäl',['Om brottet endast kränker enskilds rätt får åklagaren åtala bara om åtal av särskilda skäl är motiverat från allmän synpunkt.']);
 }
 if(chapter===11){ // retain caution in creditor/bankruptcy settings until special conditions are checked individually
    condition(c,'BrB 11 kap.','Kontrollera åtalsförutsättningarna',['De särskilda processförutsättningarna för borgenärsbrott behöver kontrolleras före operativ användning.'],'unknown');
 }
}
for(const c of D.crimes){
 if(c.id.startsWith('v03-'))continue;
 if(!c.penaltyChecked)c.penaltySource=c.penaltySource||'Befintlig datapost – kompletterande kontroll återstår';
}
// Link reference and variants; no claims that review extends beyond statute text
D.date='2026-10-12';
D.release='0.4';
})();