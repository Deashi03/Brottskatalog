/* V1.5: Sexbrott i 6 kap. BrB – rekvisit enligt uttrycklig lagtext.
 * Inga påhittade gärningsfall. Full rättsdogmatisk/praktisk prövning återstår.
 * Extra viktigt: åldersgränser, särskilda rättsliga undantag och subjektiv täckning.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const R=(label,...groups)=>({label,groups});
const willing='Deltagandet är inte frivilligt. Vid bedömningen ska frivillighetsuttryck i ord, handling eller annat beaktas. Vid de i 6:1 uppräknade tvångs-, utnyttjande- eller beroendesituationerna kan deltagandet aldrig anses frivilligt.';
const compare='Den sexuella handlingen är ett vaginalt, analt eller oralt samlag, eller en annan sexuell handling med motsvarande allvarlig kränkning.';
const sexAct='Den sexuella handlingen är en annan sexuell handling än vad som omfattas av BrB 6:1.';
const childAge='När brottet är beroende av barnets ålder ska även BrB 6:13 prövas: oaktsamhet om att barnet inte uppnått åldersgränsen kan vara tillräcklig.';
const grades='Grovhet måste följa en helhetsbedömning. Särskilt beaktas lagtextens våld/hot, flera gärningspersoner eller särskild hänsynslöshet/råhet; faktorerna är inte var för sig obligatoriska.';
const rows=[
 ['Våldtäkt','6:1',[
  R('Gärningsalternativ',
   O('Gärningspersonen:','Genomför samlag eller likvärdig sexuell handling med personen.','Förmår personen att företa eller tåla samlag eller likvärdig sexuell handling.'),
   A(compare),A(willing),
   A('Gärningspersonen handlar uppsåtligen till de relevanta omständigheterna. Oaktsamhetsfallet i BrB 6:1 a är ett särskilt brott.'))
 ]],
 ['Grov våldtäkt','6:1',[
  R('Grundgärning och grovhetsgrad',A('Samtliga rekvisit för våldtäkt enligt BrB 6:1 första stycket är uppfyllda.'),A(grades),
   A('Detta brott omfattar inte varje situation där vapen eller hot förekommer; grovhetsbedömning görs med alla omständigheter.'))
 ]],
 ['Oaktsam våldtäkt','6:1a',[
  R('Grov oaktsamhet om bristande frivillighet',A('Gärningsformen och den sexuella handlingen motsvarar BrB 6:1.'),
   A('Den andre deltar inte frivilligt enligt rekvisiten i BrB 6:1.'),
   A('Gärningspersonen är grovt oaktsam beträffande just omständigheten att den andre inte deltar frivilligt.'),
   A('Om gärningen är mindre allvarlig ska det inte dömas till ansvar enligt BrB 6:1 a.'))
 ]],
 ['Sexuellt övergrepp','6:2',[
  R('Sexuell handling som inte omfattas av våldtäktsparagrafen',
   O('Gärningspersonen:','Genomför en sexuell handling med personen.','Förmår personen att företa eller tåla en sexuell handling.'),
   A(sexAct),A(willing),
   A('Gärningspersonen har uppsåt till gärningen och de relevanta omständigheterna. Bedöm särskilt mindre grovt fall.'))
 ]],
 ['Grovt sexuellt övergrepp','6:2',[
  R('Grundgärning och grovhetsgrad',A('Samtliga rekvisit för sexuellt övergrepp enligt BrB 6:2 är uppfyllda.'),
   A(grades),A('Särskild hänsyn till tillvägagångssättet och offrets ålder ingår i lagens helhetsbedömning.'))
 ]],
 ['Oaktsamt sexuellt övergrepp','6:3',[
  R('Grov oaktsamhet om bristande frivillighet',
   A('Den sexuella handlingen och frivillighetsbristen omfattas av BrB 6:2.'),
   A('Gärningspersonen är grovt oaktsam i förhållande till att den andre inte deltar frivilligt.'),
   A('Mindre allvarlig gärning är uttryckligen undantagen från ansvar enligt BrB 6:3.'))
 ]],
 ['Våldtäkt mot barn','6:4',[
  R('Barn under 15 år',
   A('Den utsatta personen är under 15 år.'),
   O('Gärningspersonen:','Genomför vaginalt, analt eller oralt samlag, eller annan jämförligt allvarlig sexuell handling, med barnet.','Förmår på otillbörligt sätt barnet att företa eller tåla en sådan sexuell handling.'),
   A('Frivillighetsbedömning enligt vuxenbestämmelsen ersätter inte den särskilda åldersbestämmelsen.'),
   A(childAge)),
  R('Barn 15–17 år i särskilt förhållande till gärningspersonen',
   A('Barnet har fyllt 15 men inte 18 år.'),
   O('Förhållandet är:','Barnet är gärningspersonens avkomling.','Barnet står under gärningspersonens fostran eller liknande förhållande.','Gärningspersonen ansvarar för barnets vård eller tillsyn enligt myndighetsbeslut.'),
   A('En sexuell handling enligt BrB 6:4 första stycket genomförs, eller förmås på det sätt som anges där.'),
   A(childAge)),
  R('Barn under 18 år med särskilt nedsatt förmåga',
   A('Barnet har ännu inte fyllt 18 år.'),
   A('Barnet har nedsatt förmåga att värna sin sexuella integritet på grund av psykisk ohälsa, funktionsnedsättning, missbruk, gärningspersonens auktoritet eller annan motsvarande omständighet.'),
   A('Gärningspersonen utnyttjar detta otillbörligen till en gärning enligt BrB 6:4 första stycket.'),
   A(childAge))
 ]],
 ['Grov våldtäkt mot barn','6:4',[
  R('Grundgärning och grovhetsgrad',A('Rekvisiten för våldtäkt mot barn enligt BrB 6:4 första eller andra stycket är uppfyllda.'),
   A('Brottet är grovt efter samlad bedömning. Särskilt beaktas våld eller hot om brottslig gärning, flera förövare, tillvägagångssätt, barnets låga ålder eller särskild hänsynslöshet/råhet.'),
   A(childAge))
 ]],
 ['Sexuellt utnyttjande av barn','6:5',[
  R('Mindre grovt fall av våldtäkt mot barn',
   A('Rekvisiten för gärning enligt BrB 6:4 första eller andra stycket är uppfyllda.'),
   A('Brottet är mindre grovt med hänsyn till samtliga omständigheter vid gärningen.'),
   A(childAge),
   A('BrB 6:14 anger en snäv ansvarsfrihetsregel vid bland annat denna rubricering när det är uppenbart att gärningen inte inneburit något övergrepp med hänsyn till ålder, utveckling och omständigheterna i övrigt.'))
 ]],
 ['Utnyttjande av barn för sexuell posering','6:8',[
  R('Barn under 15 år',
   A('Barnet är under 15 år.'),
   O('Gärningsformen är:','Främjar att barnet utför eller medverkar i sexuell posering.','Utnyttjar att barnet utför eller medverkar i sexuell posering.','Försätter barnet i en situation av sexuell posering.','Utnyttjar att någon annan försätter barnet i en sådan situation.'),
   A(childAge),
   A('BrB 6:14:s särskilda undantag kan vara tillämpligt för gärning enligt första stycket i de snävt angivna fallen.')),
  R('Barn mellan 15 och 17 år',
   A('Barnet har fyllt 15 men inte 18 år.'),
   A('En gärning enligt första stycket föreligger och poseringen är ägnad att skada barnets hälsa eller utveckling.'),
   A(childAge))
 ]],
 ['Grovt utnyttjande av barn för sexuell posering','6:8',[
  R('Grovhetsbedömning',
   A('Gärningen uppfyller rekvisiten för utnyttjande av barn för sexuell posering enligt BrB 6:8.'),
   A('Helhetsbedömningen gör brottet grovt. Särskilt beaktas större omfattning, betydande vinning eller hänsynslöst utnyttjande av barnet.'),
   A(childAge))
 ]],
 ['Utnyttjande av barn genom köp av sexuell handling','6:9',[
  R('Sexuell handling mot ersättning',
   A('Ett barn under 18 år förmås att mot ersättning företa eller tåla en sexuell handling.'),
   A('Ersättningen kan lämnas eller utlovas av gärningspersonen eller någon annan.'),
   A(childAge),A('Mindre grovt fall har särskild straffskala och bedöms separat.'))
 ]],
 ['Sexuellt ofredande mot barn','6:10',[
  R('Sexuell beröring eller handling med barn under 15 år',
   A('Barnet är under 15 år.'),
   O('Gärningsformen är:','Gärningspersonen berör barnet sexuellt.','Gärningspersonen förmår barnet att företa eller medverka i en handling med sexuell innebörd.'),
   A('Gärningen omfattas inte av tidigare straffbestämmelse i BrB 6 kap.'),
   A(childAge)),
  R('Blottande eller sexuell integritetskränkning mot barn under 15 år',
   A('Barnet är under 15 år.'),
   O('Gärningsformen är:','Blottande som är ägnat att väcka obehag.','Ofredande genom ord eller handling ägnat att kränka personens sexuella integritet.'),
   A('Gärningen omfattas inte av tidigare straffbestämmelse i BrB 6 kap.'),
   A(childAge))
 ]],
 ['Sexuellt ofredande','6:10',[
  R('Blottande',A('Gärningspersonen blottar sig för någon annan på ett sätt som är ägnat att väcka obehag.'),
   A('Gärningen är inte straffbar under tidigare bestämmelse i BrB 6 kap. Gärningspersonen handlar uppsåtligen.')),
  R('Annat sexuellt integritetskränkande ofredande',
   A('Gärningspersonen ofredar någon annan genom ord eller handlande på sätt som är ägnat att kränka personens sexuella integritet.'),
   A('Gärningen faller inte under tidigare bestämmelse i BrB 6 kap. Gärningspersonen handlar uppsåtligen.'))
 ]],
 ['Grovt sexuellt ofredande mot barn','6:10',[
  R('Grundgärning och grovhet',A('Gärningen uppfyller BrB 6:10 första styckets rekvisit för sexuellt ofredande mot barn.'),
   A('Grovhetsbedömning görs samlat. Särskilt beaktas flera förövare, offrets låga ålder eller annan särskild hänsynslöshet.'),
   A(childAge))
 ]],
 ['Grovt sexuellt ofredande','6:10',[
  R('Grundgärning och grovhet',A('Gärningen uppfyller BrB 6:10 andra styckets rekvisit för sexuellt ofredande.'),
   A('Grovhetsbedömning görs samlat. Särskilt beaktas flera förövare eller särskild hänsynslöshet.'))
 ]]
];
let added=0,existing=0;const missing=[],mismatch=[];
const by=title=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv'));
const norm=s=>String(s||'').replace(/\s/g,'').toLocaleLowerCase('sv');
for(const [title,ref,routes] of rows){
 const c=by(title);if(!c){missing.push(title);continue;}
 if(norm(c.shortRef)!=='brb'+ref){mismatch.push({title,actual:c.shortRef,ref});continue;}
 if(!window.BK_STATUTES?.['BrB:'+ref]?.text)throw Error('Lagtext saknas: BrB '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length){existing++;continue;}
 c.rekvisit15={groups:[],routes,source:'BrB '+ref+' med relevanta hänvisningar till 6:13–14 och 1:2',
   sourceURL:URL,scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
   note:'Lagtextsbaserat rekvisitstöd med separata ålders- och handlingsalternativ. Samtliga relevanta rättsfall, förarbeten, frivillighets-/oaktsamhetsbedömningar och gärningstidpunkt måste granskas innan operativ slutsats. Typexempel utelämnas avsiktligt.'};
 added++;
}
window.BK_SEXUAL_REKVISIT15={added,existing,missing,mismatch,source:URL,reviewScope:'statute-only-no-fabricated-cases'};
})();