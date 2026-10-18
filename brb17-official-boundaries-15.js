/* V1.5: BrB 17:1–5 statutory routes and Prop. 2024/25:141.
 * Bounded explanatory material for six existing police-priority cards.
 * Not a final review, charge recommendation or permission to use force.
 */
(()=>{'use strict';
const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const LAW='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const PROP='https://www.regeringen.se/contentassets/861bd0de88764d2aa4a8f523f523d674/ett-starkare-skydd-for-offentliganstallda-mot-vald-hot-och-trakasserier-m.m.-prop.-202425141.pdf';
const scope='BrB 17:5 skiljer på två skyddskretsar: personer med särskilt lagstöd för motsvarande myndighetsutövningsskydd omfattas av 17:1–4, medan de uttryckligen uppräknade samhällsnyttiga funktionerna (sjukvård, socialtjänst, räddningstjänst, utbildning) genom paragrafens andra stycke endast omfattas av 17:1–2. Att arbeta i en sådan funktion innebär inte automatiskt att 17:3 eller 17:4 gäller. Pröva tjänsteutövning, eventuell specialreglering och de övriga rekvisiten.';
const notes=[
 {title:'Våld eller hot mot tjänsteman',ref:'BrB:17:1',
  must:['hot om brottslig gärning','tidigare har utövat myndighet','tre år'],
  note:'BrB 17:1 omfattar angrepp med våld eller hot om brottslig gärning vid myndighetsutövning eller med syfte att framtvinga, hindra eller hämnas en sådan åtgärd. Efter 2025 års reform kan hotet även avse t.ex. skadegörelse och är inte begränsat till hot om personvåld. Lagtexten omfattar i angivna fall även den som tidigare har utövat myndighet. Om det i stället är en fullbordad skadegörelse med särskilt tjänstekopplat syfte kan BrB 17:2 aktualiseras; brotten får inte blandas ihop.'},
 {title:'Grovt våld eller hot mot tjänsteman',ref:'BrB:17:1',
  must:['våld av allvarligt slag','vapenattrapp','särskilt hänsynslös'],
  note:'Grovt brott enligt BrB 17:1 bedöms i sin helhet. Lagen pekar särskilt på allvarligt våld, allvarligt eller påtagligt förstärkt hot (bl.a. genom vapen, sprängämne, vapenattrapp eller anspelning på våldskapital) och särskilt hänsynslös eller farlig art. En omständighet är inte automatiskt tillräcklig för grov grad; faktisk gärning, uppsåt och gärningstidpunkt måste prövas.'},
 {title:'Angrepp mot tjänsteman',ref:'BrB:17:2',
  must:['i annat fall än som avses i 1 och 3 §§','brottslig gärning','någon annan otillbörlig gärning'],
  note:'BrB 17:2 är uttryckligen subsidiär till 17:1 och 17:3. Vid angrepp genom en annan i sig brottslig gärning, t.ex. skadegörelse eller ofredande, krävs efter 2025 års reform inte dessutom att tjänstemannen lidit särskild skada eller olägenhet: brottsrekvisiten och tjänstekopplingen prövas separat. För den ALTERNATIVA gärningsformen annan otillbörlig gärning eller hot om en sådan kräver lagtexten däremot lidande, skada eller annan olägenhet för tjänstemannen. Blandar man alternativen riskerar man att felaktigt fria eller misstänka. Konkurrens med bakomliggande brott avgörs särskilt.'},
 {title:'Grovt angrepp mot tjänsteman',ref:'BrB:17:2',
  must:['våld av allvarligt slag mot tjänstemannens närstående','betydande värde','särskilt hänsynslös'],
  note:'BrB 17:2 anger särskilda grovhetsomständigheter: allvarligt våld eller förstärkta/allvarliga hot mot tjänstemannens närstående, betydande värde, synnerligen kännbar skada eller särskilt hänsynslös/farlig art. Grovhetsgrad är en samlad bedömning. Det bakomliggande brottets rubricering behöver inte ha samma grad som angrepp mot tjänsteman; konkurrens och dubbelbedömning kräver individuell rättslig analys.'},
 {title:'Förolämpning mot tjänsteman',ref:'BrB:17:3',
  must:['nedsättande uttalande','förödmjukande beteende','självkänsla eller värdighet'],
  note:'BrB 17:3 avser beskyllning, nedsättande uttalande eller förödmjukande beteende riktat mot tjänsteman med lagens myndighetskoppling, NÄR gärningen är ägnad att kränka självkänsla eller värdighet. Inte varje kritik, irritation eller otrevlighet mot polis är därför automatiskt detta brott. Regeln omfattar inte utan vidare närstående och ska inte automatiskt utvidgas till samhällsnyttiga funktioner enligt BrB 17:5 andra stycket. Förolämpning och våldsamt motstånd kan i vissa fall bedömas i konkurrens; inget generellt krav finns att 17:4 viker för 17:3.'},
 {title:'Våldsamt motstånd',ref:'BrB:17:4',
  must:['i annat fall än som avses i 1 och 2 §§','sätta sig till motvärn','annars med våld'],
  note:'BrB 17:4 innehåller två alternativa sätt att FÖRSÖKA hindra myndighetsutövning: att sätta sig till aktivt motvärn eller annars med våld. Trots brottets namn kan motvärnsalternativet vara aktuellt utan särskilt våld. Enbart passiv vägran är inte automatiskt tillräcklig. Bestämmelsen är subsidiär till 17:1 och 17:2, men INTE generellt till 17:3 (förolämpning mot tjänsteman): konkurrensen med 17:3 bedöms enligt förarbetena utifrån omständigheterna, och ibland kan båda brotten föreligga.'}
];
const verified=(ref,markers)=>{
 const p=W[ref];return Boolean(p?.complete===true
  &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
  &&['2026-10-17','2026-10-18'].includes(p.checked)
  &&p.url===LAW&&markers.every(m=>String(p.text||'').includes(m)));
};
const common=verified('BrB:17:5',['Bestämmelserna i 1-4 §§','Bestämmelserna i 1 och 2 §§','hälso- och sjukvårdspersonal'])
 &&verified('BrB:17:16',['försök, förberedelse eller stämpling','angrepp mot tjänsteman']);
const report={planned:notes.length,annotated:0,held:[],sourceLAW:LAW,sourcePreparatory:PROP,
 lawCheckDate:'2026-10-18',legalApprovals:0,penaltyChanges:0,stageChanges:0,
 prosecutionChanges:0,coercionApprovals:0,examplesAdded:0,commonSourcesComplete:common};
for(const x of notes){
 const c=D.crimes.find(c=>!c.stageType&&c.title===x.title&&c.statute===x.ref);
 if(!common||!c||!c.rekvisit15||!c.lawCompletenessVerified
    ||c.rekvisit15.legalReviewApproved===true||!verified(x.ref,x.must)){
  report.held.push(x.title);continue;
 }
 c.officialFunctionBoundaries15={statute:x.ref,sourceURL:LAW,preparatorySourceURL:PROP,
  preparatorySection:'Prop. 2024/25:141 avsnitt 6–9, s. 44–73',
  statuteChecked:W[x.ref].checked,scope:'statute-and-reform-preparatory-material-only',
  note:x.note,protectedRoles:scope,individuallyApproved:false,
  requiresOffenceDate:true,caseSpecificClassificationApproved:false,
  penaltyApproved:false,stageCriminalizationApproved:false,coercionApproved:false};
 const tag='Gränsdragning BrB 17:1–5 (prop. 2024/25:141): ';
 if(!String(c.rekvisit15.note||'').includes(tag)){
  c.rekvisit15.note=String(c.rekvisit15.note||'')+' '+tag+x.note+' '+scope+
   ' Förarbeten: '+PROP+' Hänvisningen är en tolkningshjälp, inte helhetsgodkännande.';
 }
 report.annotated++;
}
window.BK_BRB17_OFFICIAL_BOUNDARIES15=report;
})();