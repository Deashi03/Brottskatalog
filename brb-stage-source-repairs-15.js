/* V1.5 complete statutory-stage sources and war-sensitive penalty wording.
 * BrB 9:11, 19:9, 19:14 checked against the Riksdag's current SFS on
 * 2026-10-16. This does not individually certify every generated stage.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SFS='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const texts={"BrB:9:11":"11 §\nFör försök eller förberedelse till bedrägeri, grovt bedrägeri, olovlig befattning med betalningsverktyg, grov olovlig befattning med betalningsverktyg, utpressning, ringa utpressning, grov utpressning, ocker, grovt ocker, häleri, grovt häleri, utförselhäleri eller grovt utförselhäleri och för stämpling till grovt bedrägeri, grov utpressning, häleri, grovt häleri, utförselhäleri eller grovt utförselhäleri döms det till ansvar enligt 23 kap. Bestämmelserna i 23 kap. 3 § ska dock inte gälla i fråga om försök till utpressning, ringa utpressning eller grov utpressning. För förberedelse till grovt fordringsbedrägeri döms det också till ansvar enligt 23 kap.\nSom för förberedelse till bedrägeri eller grovt bedrägeri döms den som för att bedra försäkringsgivare eller annars med uppsåt att begå bedrägeri skadar sig eller någon annan till person eller egendom. Detsamma ska gälla, om någon med samma uppsåt försöker åstadkomma sådan skada. Har han eller hon innan skadan uppstått frivilligt avstått från att fullfölja gärningen, ska han eller hon inte dömas till ansvar.\nLag (2025:1269).","BrB:19:9":"9 §\nDen som av grov oaktsamhet begår en gärning som avses i 7 § döms, om gärningen består i att personen obehörigen befordrar, lämnar eller röjer en uppgift, för vårdslöshet med hemlig uppgift till böter eller fängelse i högst ett år eller, om Sverige var i krig, till böter eller fängelse i högst två år.\nEn gärning ska inte utgöra brott, om den är sådan som avses i 7 § andra stycket och den med hänsyn till syftet och övriga omständigheter är försvarlig. Lag (2022:1519).","BrB:19:14":"14 §\nFör försök, förberedelse eller stämpling till högförräderi, trolöshet vid förhandling med främmande makt, spioneri, grovt spioneri, utlandsspioneri, grovt utlandsspioneri, grov obehörig befattning med hemlig uppgift, olovlig underrättelseverksamhet mot främmande makt eller olovlig underrättelseverksamhet mot person döms det till ansvar enligt 23 kap. Detsamma gäller för försök eller förberedelse till obehörig befattning med hemlig uppgift.\nSom stämpling till högförräderi ska även anses att träda i förbindelse med främmande makt för att förbereda, möjliggöra eller underlätta att sådant brott kan begås.\nDen som underlåter att avslöja eller förhindra högförräderi, trolöshet vid förhandling med främmande makt, spioneri, grovt spioneri, utlandsspioneri, grovt utlandsspioneri eller grov obehörig befattning med hemlig uppgift döms till ansvar enligt 23 kap. Detsamma gäller även om han eller hon inte insett men borde ha insett att brottet var förestående eller pågick. Lag (2022:1519)."};
let restored=0,cards=0;
for(const [key,full] of Object.entries(texts)){
 const item=W[key];if(!item)throw Error('Missing legal source '+key);
 const prefix=s=>String(s).replace(/\s+/g,' ').trim().slice(0,35);
 if(prefix(item.text)!==prefix(full))throw Error('Unexpected legal section heading '+key);
 if(item.text.length<full.length)restored++;
 else if(!item.text.includes(full.slice(-22)))throw Error('Source may have changed; manual review '+key);
 item.text=full;item.complete=true;item.machine=false;item.checked='2026-10-16';item.url=SFS;
 for(const c of D.crimes.filter(c=>!c.stageType&&c.statute===key)){
  c.law=full;c.lawMode='full';c.lawSource=item.ref;
  c.lawCompletenessVerified=true;c.lawCompletenessChecked='2026-10-16';
  c.lawCompletenessSourceURL=SFS;c.sourceURL=SFS;cards++;
 }
}
if(!D.crimes.some(c=>!c.stageType&&c.statute==='BrB:19:9')){
 const provision=W['BrB:19:9'];
 D.crimes.push({
  id:'v15-vardsloshet-hemlig-uppgift',title:'Vårdslöshet med hemlig uppgift',
  shortRef:'BrB 19:9',ref:'BrB 19 kap. 9 §',statute:'BrB:19:9',
  category:'Rikets säkerhet',aliases:[],sourceURL:SFS,
  law:provision.text,lawSource:provision.ref,lawMode:'full',
  lawCompletenessVerified:true,lawCompletenessChecked:'2026-10-16',lawCompletenessSourceURL:SFS,
  penalty:'Böter eller fängelse i högst ett år; om Sverige var i krig: böter eller fängelse i högst två år.',
  penaltyShort:'Villkorad 1–2 år',penaltyRange:{min:0,max:2,fines:true,life:false},
  conditionalPenalty:true,penaltyRangeVerified:false,penaltyReviewScope:'war-dependent-statutory-condition',
  penaltyChecked:'2026-10-16',penaltySourceURL:SFS,
  penaltyNote:'BrB 19:9: kräver grov oaktsamhet beträffande obehörigt befordrande, lämnande eller röjande av hemlig uppgift enligt 19:7. Försvarlighetsundantaget och krigsberoende maxstraff måste prövas.',
  custody:'unknown',prosecution:'general',prosecutionLabel:'Allmänt åtal – kontrollera specialbestämmelser',
  prosecutionRule:'RB 20:3; BrB 19 kap.',prosecutionDetails:['Kontrollera åtalsförordnande och specialundantag i 19 kap.'],
  prosecutionChecked:'2026-10-16',prosecutionSourceURL:SFS,
  reviewStatus:'law-text-verified-only',requisitesStatus:'pending-individual-legal-review',
  elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[]
 });
}
let conditional=0;
for(const c of D.crimes.filter(c=>!c.stageType&&c.statute==='BrB:19:9')){
 c.conditionalPenalty=true;
 c.penaltyReviewScope='war-dependent-statutory-condition';
 c.penaltyRangeVerified=false;
 c.penalty='Böter eller fängelse i högst ett år; om Sverige var i krig: böter eller fängelse i högst två år.';
 c.penaltyShort='Villkorad 1–2 år';
 c.penaltyNote='BrB 19:9: krigstidens straffmaximum två år gäller bara när Sverige var i krig. Även försvarlighetsundantaget i andra stycket måste prövas. Tvångsmedelsindikatorer kräver separat prövning.';
 c.custody='unknown';conditional++;
}
window.BK_STAGE_SOURCE_REPAIR15={restored,cards,conditional,refs:Object.keys(texts),source:SFS};
})();