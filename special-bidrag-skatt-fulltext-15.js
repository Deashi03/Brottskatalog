/* V1.5: independent current-SFS full paragraph checks for BidrBrL 2–4
 * and SkBrL 2–8,10. Text transcribed from the Riksdag's current consolidated
 * provisions (checked 2026-10-18), not derived from the machine SFS importer.
 * Exact source text compared with imported text before replacing or certifying.
 * This certifies PARAGRAPH WORDING ONLY, not offence-grade/praxis/coercion.
 */
(()=>{'use strict';const D=window.BK_DATA,P=window.BK_SPECIAL_EXCERPTS;
if(!D?.crimes||!P)return;
const laws={
 BidrBrL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bidragsbrottslag-2007612_sfs-2007-612/',version:'2026:1322',paragraphs:{
 '2':`2 § Den som lämnar oriktiga uppgifter eller inte anmäler ändrade förhållanden som han eller hon är skyldig att anmäla enligt lag eller förordning, och på så sätt orsakar fara för att en ekonomisk förmån eller ett ekonomiskt stöd felaktigt betalas ut, felaktigt tillgodoräknas, betalas ut med ett för högt belopp eller tillgodoräknas med ett för högt belopp, döms för bidragsbrott till fängelse i högst två år eller, om brottet är ringa, till böter eller fängelse i högst sex månader. Lag (2019:652).`,
 '3':`3 § Om brott som avses i 2 § är grovt, döms för grovt bidragsbrott till fängelse i lägst ett och högst sex år.
Vid bedömningen av om brottet är grovt ska det särskilt beaktas om
1. brottet rört betydande belopp,
2. den som begått brottet använt falska handlingar, eller
3. gärningen ingått i en brottslighet som utövats systematiskt eller i större omfattning. Lag (2026:1322).`,
 '4':`4 § Den som av grov oaktsamhet begår en sådan gärning som avses i 2 §, döms för vårdslöst bidragsbrott till böter eller fängelse i högst ett år.
Om gärningen med hänsyn till beloppet, risken för slutlig ekonomisk skada och övriga omständigheter är mindre allvarlig, döms inte till ansvar. Lag (2019:652).`
 }},
 SkBrL:{url:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skattebrottslag-197169_sfs-1971-69/',version:'2026:1531',paragraphs:{
 '2':`2 § Den som uppsåtligen lämnar oriktig uppgift till en myndighet eller låter bli att till en myndighet lämna deklaration, kontrolluppgift eller annan föreskriven uppgift och därigenom ger upphov till fara för att skatt undandras det allmänna eller felaktigt tillgodoräknas eller återbetalas till personen själv eller annan, döms för skattebrott till fängelse i högst två år. Lag (2026:109).`,
 '3':`3 § Om brott som avses i 2 § är att anse som ringa, döms för skatteförseelse till böter. Lag (1996:658).`,
 '4':`4 § Om brott som avses i 2 § är att anse som grovt, döms för grovt skattebrott till fängelse i lägst ett och högst sex år.
Vid bedömningen av om brottet är grovt ska det särskilt beaktas om det rört mycket betydande belopp, om gärningsmannen använt falska handlingar eller vilseledande bokföring eller om förfarandet ingått som ett led i en brottslighet som utövats systematiskt eller i större omfattning eller i annat fall varit av synnerligen farlig art. Lag (2026:1320).`,
 '5':`5 § Den som av grov oaktsamhet lämnar oriktig uppgift till en myndighet och därigenom ger upphov till fara för att skatt undandras det allmänna eller felaktigt tillgodoräknas eller återbetalas till uppgiftslämnaren eller annan döms för vårdslös skatteuppgift till böter eller fängelse i högst ett år.
Om gärningen med hänsyn till skattebeloppet och övriga omständigheter är av mindre allvarlig art, ska det inte dömas till ansvar enligt första stycket. Lag (2026:109).`,
 '6':`6 § Den som uppsåtligen eller av grov oaktsamhet underlåter att fullgöra skyldighet att göra skatteavdrag på sätt som föreskrivs i skatteförfarandelagen (2011:1244) döms för skatteavdragsbrott till böter eller fängelse i högst ett år.
I ringa fall ska inte dömas till ansvar enligt första stycket. Lag (2011:1247).`,
 '7':`7 § Den som, i annat fall än som avses i 2 §, uppsåtligen lämnar oriktig uppgift till
1. en myndighet, om uppgiften rör förhållande som har betydelse för skyldigheten för uppgiftslämnaren eller annan att betala skatt,
2. någon som är skyldig att för henne eller honom innehålla skatt eller lämna kontrolluppgift eller motsvarande underrättelse, om uppgiften rör förhållande som har betydelse för skyldighetens fullgörande eller för skyldigheten för uppgiftslämnaren eller annan att betala skatt,
döms för skatteredovisningsbrott till böter eller fängelse i högst sex månader.
Detsamma gäller den som, i annat fall än som avses i 2 §, uppsåtligen låter bli att lämna en föreskriven uppgift angående sådant förhållande som anges i första stycket 1 eller 2 till någon som avses där. Detta gäller dock endast under förutsättning att uppgiften ska lämnas utan föreläggande eller uppmaning och inte avser egen inkomstdeklaration.
I ringa fall ska det inte dömas till ansvar enligt första eller andra stycket. Lag (2026:109).`,
 '8':`8 § Den som av grov oaktsamhet begår en gärning som avses i 7 § första stycket 2 eller andra stycket döms för vårdslös skatteredovisning till böter eller fängelse i högst sex månader.
I ringa fall ska det inte dömas till ansvar enligt första stycket. Lag (2026:109).`,
 '10':`10 § Den som uppsåtligen eller av grov oaktsamhet åsidosätter bokföringsskyldighet eller sådan skyldighet att föra och bevara räkenskaper, som föreskrivs för vissa uppgiftsskyldiga och därigenom ger upphov till fara för att myndighets kontrollverksamhet vid beräkning eller uppbörd av skatt eller avgift allvarligt försvåras, döms för försvårande av skattekontroll till böter eller fängelse i högst två år eller, om brottet är grovt, till fängelse i lägst sex månader och högst fyra år.
I ringa fall ska det inte dömas till ansvar enligt första stycket. Lag (2026:109).`
 }}};
const mapping=[
 ['Bidragsbrott','BidrBrL','2'],['Ringa bidragsbrott','BidrBrL','2'],
 ['Grovt bidragsbrott','BidrBrL','3'],['Vårdslöst bidragsbrott','BidrBrL','4'],
 ['Skattebrott','SkBrL','2'],['Skatteförseelse','SkBrL','3'],
 ['Grovt skattebrott','SkBrL','4'],['Vårdslös skatteuppgift','SkBrL','5'],
 ['Skatteavdragsbrott','SkBrL','6'],['Skatteredovisningsbrott','SkBrL','7'],
 ['Vårdslös skatteredovisning','SkBrL','8'],
 ['Försvårande av skattekontroll','SkBrL','10'],
 ['Grovt försvårande av skattekontroll','SkBrL','10']
];
const normalized=t=>String(t||'').replace(/\s+/g,' ').replace(/Lag\s*\((\d+:\d+)\)\s*\.?\s*$/,'Lag ($1).').trim();
const attest={planned:mapping.length,approved:0,held:[],sectionsChecked:0,
 sourceVersions:{BidrBrL:laws.BidrBrL.version,SkBrL:laws.SkBrL.version},
 checked:'2026-10-18',scope:'complete-paragraph-wording-only',
 caseLawApprovals:0,penaltyGradeApprovals:0,stageChanges:0,coerciveApprovals:0};
const verified=new Set();
for(const [title,code,sec] of mapping){
 const l=laws[code],x=P[code]?.sections?.[sec],text=l?.paragraphs[sec];
 const c=D.crimes.find(c=>!c.stageType&&c.title===title);
 const key=code+':'+sec;
 if(!c||String(c.shortRef||'').replace(/\s+/g,'')!==code+sec
  ||P[code]?.observedVersion!==l.version||!text||!x?.text||x.complete!==false
  ||normalized(x.text)!==normalized(text)
  ||!['missing','machine'].includes(c.lawMode)
  ||c.lawCompletenessVerified===true
  ||(c.lawMode==='machine'&&normalized(c.law)!==normalized(text))){
   attest.held.push({title,reason:'full official wording or importer provenance mismatch'});continue;
 }
 Object.assign(c,{law:text,lawMode:'full',lawSource:l.url,
  lawCompletenessVerified:true,lawCompletenessChecked:'2026-10-18',
  lawCompletenessSourceURL:l.url,lawCompletenessReviewScope:'current-paragraph-only',
  legalSourceVersion15:l.version,
  lawProvenance:'independently-transcribed-current-official-SFS-paragraph-compared-to-import',
  sourceURL:l.url});
 if(!verified.has(key)){verified.add(key);attest.sectionsChecked++;}
 attest.approved++;
}
window.BK_SPECIAL_BIDRAG_SKATT_FULLTEXT15=attest;
})();