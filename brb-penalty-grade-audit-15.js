/* V1.5: explicit individual-range checks of 43 common BrB grades.
 * The controlling CURRENT complete SFS paragraphs are curated in
 * brb-curated-lawtext-15.js. Full legal/penalty applicability is NOT approved.
 * Date-dependent, inchoate and coercive rules remain separate work.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
 // Title, official SFS section, min/max years, fines permitted, life, special caveat.
 ['Vållande till annans död','3:7',0,3,false,false,'Ringa fall kan enligt samma paragraf ge böter; normalgraden avser fängelse i högst tre år.'],
 ['Grovt vållande till annans död','3:7',2,6,false,false,'Grov oaktsamhet med lagens kvalifikationsgrunder; SFS 2026:1318.'],
 ['Vållande till kroppsskada eller sjukdom','3:8',0,0.5,true,false,'Skada/sjukdom som inte är ringa; lagens oaktsamhetsrekvisit.'],
 ['Grovt vållande till kroppsskada eller sjukdom','3:8',0,4,false,false,'Grovhetsgrunden i 3:8, högst fyra års fängelse.'],
 ['Framkallande av fara för annan','3:9',0,3,true,false,'Kräver grov oaktsamhet och konkret skyddad fara, inte vanligt oaktsamhetsbrott.'],
 ['Förtal','5:1',0,0,true,false,'Böter enligt 5:1. Försvarlighet och sann/skälig uppgift måste prövas separat; enskilt åtal enligt 5:5 huvudregel.'],
 ['Grovt förtal','5:2',0,2,true,false,'Även grovt förtal kan ge böter. Spridningsomfattning och skada samt villkoren i 5:5 prövas särskilt.'],
 ['Förolämpning','5:3',0,0.5,true,false,'Särskilt åtalsfilter i 5:5. Förväxla inte 5:3 med förolämpning mot tjänsteman enligt 17:3.'],
 ['Urkundsförfalskning','14:1',0,2,false,false,'Krav på urkund och fara i bevishänseende; separera elektroniska handlingar och originalkaraktär.'],
 ['Förvanskning av urkund','14:2',0,0.5,true,false,'Ringa form av urkundsförfalskning; observera den särskilda lindringsgrunden i lagtexten.'],
 ['Grov urkundsförfalskning','14:3',1,6,false,false,'2026 års straffminimum; särskilt betydelsefull urkund eller farlig gärning ger grovhetsindikatorer.'],
 ['Märkesförfalskning','14:8',0,2,false,false,'Giltiga märken, falsk eller felaktigt anbringad äkta märkning och fara i bevishänseende.'],
 ['Ringa märkesförfalskning','14:8',0,0.5,true,false,'Ringa grad i andra stycket. Brottskortet är avgränsat från normala och grova graden.'],
 ['Grov märkesförfalskning','14:8',0.5,4,false,false,'Grov grad enligt tredje stycket. Full tillämpning och praxis kräver separat kontroll.'],
 ['Mened','15:1',0.5,4,false,false,'Normalgradens minimum är sex månader; mindre allvarligt menedsbrott har särskild skala i samma paragraf.'],
 ['Grov mened','15:1',2,8,false,false,'Grovt brott kräver särskild helhetsbedömning och lagens uppsåtsrelaterade kvalifikationsfaktorer.'],
 ['Osann partsutsaga','15:2',0,2,false,false,'Ringa variant har särskild bötesmöjlighet enligt 15:2. Separat vittnesed krävs inte för partsutsaga.'],
 ['Ovarsam utsaga','15:3',0,0.5,true,false,'Grov oaktsamhet krävs, jämför undantagen om betydelselös utsaga/rätt att tiga i 15:4.'],
 ['Stöld','8:1',0,2,false,false,'Uppsåt att tillägna sig och skada prövas separat.'],
 ['Ringa stöld','8:2',0,0.5,true,false,'Förutsätter 8:1 och helhetsbedömning av ringa grad.'],
 ['Grov stöld','8:4',1,6,false,false,'Kvalifikationsfaktorer är inte var och en obligatoriska; helhetsbedömning.'],
 ['Inbrottsstöld','8:4a',1,6,false,false,'Undantag vid mindre allvarlig integritetskränkning finns i andra stycket.'],
 ['Rån','8:5',1.5,6,false,false,'Råntvång, motvärnsrån och undantag för mindre allvarlig gärning.'],
 ['Grovt rån','8:6',5,10,false,false,'Utgår från 8:5 och särskild samlad grovhetsbedömning.'],
 ['Tillgrepp av fortskaffningsmedel','8:7',0,2,false,false,'Observera att ringa grad har en annan straffskala.'],
 ['Ringa tillgrepp av fortskaffningsmedel','8:7',0,0.5,true,false,'Ringa grad enligt samma paragraf; ringa försök straffas inte enligt 8:12.'],
 ['Grovt tillgrepp av fortskaffningsmedel','8:7',0.5,4,false,false,'Grovhetsfaktorer enligt andra stycket.'],
 ['Bedrägeri','9:1',0,2,false,false,'Både traditionellt vilseledande och olovlig påverkan på automatiskt förfarande.'],
 ['Ringa bedrägeri','9:2',0,0.5,true,false,'Särskilt tjänstebedrägerialternativ utan krav på vilseledande enligt andra stycket.'],
 ['Grovt bedrägeri','9:3',1,6,false,false,'Särskilda kvalifikationsfaktorer efter samlad prövning.'],
 ['Skadegörelse','12:1',0,2,false,false,'Förstörelse eller skada till men för någon annans rätt.'],
 ['Ringa skadegörelse','12:2',0,0.5,true,false,'Helhetsbedömning med hänsyn till skadans obetydlighet m.m.'],
 ['Grov skadegörelse','12:3',1,6,false,false,'Särskilda kvalifikationsfaktorer; uppsåtskrav enligt huvudregeln.'],
 ['Hemfridsbrott','4:6',0,1,true,false,'Innefattar även lagens gårds-, trädgårds- och andra liknande bostadsnära områden.'],
 ['Olaga intrång','4:6',0,1,true,false,'Alternativ till hemfridsbrott, avser andra skyddade platser enligt andra stycket.'],
 ['Grovt hemfridsbrott','4:6',0.5,3,false,false,'Även inbrott, våld/hot eller annan särskild hänsynslöshet/farlighet beaktas.'],
 ['Grovt olaga intrång','4:6',0.5,3,false,false,'Samma grovhetsparagraf, men grundgärningen avser olaga intrång.'],
 ['Ofredande','4:7',0,1,true,false,'Kräver att gärningen är ägnad att kränka den utsattes frid kännbart.'],
 ['Förolämpning mot tjänsteman','17:3',0,0.5,true,false,'2025 års särskilda brottsrubricering, myndighetsutövningsanknytning och lämplighetsrekvisit.'],
 ['Tjänstefel','20:1',0,2,true,false,'Både uppsåt och oaktsamhet kan räcka; ringa gärning undantagen.'],
 ['Grovt tjänstefel','20:1',1.5,6,false,false,'Det grova brottet kräver UPPSÅT: enbart oaktsamhet räcker INTE (BrB 20:1 andra stycket).'],
 ['Missbruk av offentlig ställning','20:2',0,2,true,false,'Subsidiärt till 20:1, brottsligt syfte att ge otillbörlig förmån eller missgynna.'],
 ['Grovt missbruk av offentlig ställning','20:2',1.5,6,false,false,'Grov grad enligt andra stycket; samlad bedömning, inte enbart högt värde.']
];
const byTitle=new Map(D.crimes.filter(c=>!c.stageType).map(c=>[String(c.title||'').toLocaleLowerCase('sv'),c]));
const out={planned:rows.length,reviewed:0,held:[],mismatch:[],missing:[],unreviewedSource:[],refs:[...new Set(rows.map(r=>r[1]))],scope:'individual-current-offence-grade-penalty-range-only',sourceURL:URL};
for(const [title,ref,min,max,fines,life,caveat] of rows){
 const c=byTitle.get(title.toLocaleLowerCase('sv'));
 if(!c){out.missing.push(title);continue;}
 if(c.statute!=='BrB:'+ref){out.mismatch.push({title,reason:'incorrect-statutory-reference',actual:c.statute,expected:'BrB:'+ref});continue;}
 const section=W['BrB:'+ref];
 if(!section?.complete||section.completeTextProvenance!=='manual-crosscheck-current-SFS-paragraph-only'||section.checked!=='2026-10-17'||!c.lawCompletenessVerified){
  out.unreviewedSource.push(title+' '+ref);continue;
 }
 const r=c.penaltyRange||{};
 const same=Number.isFinite(r.min)&&Number.isFinite(r.max)&&Math.abs(r.min-min)<1e-8&&Math.abs(r.max-max)<1e-8&&Boolean(r.fines)===fines&&Boolean(r.life)===life;
 if(!same){
  const issue={title,ref,expected:{min,max,fines,life},stored:c.penaltyRange||null};
  out.mismatch.push(issue);
  c.penaltyCrosscheckIssue=issue;
  c.penaltyRangeVerified=false;
  c.penaltyReviewScope='source-penalty-range-conflict-hold';
  continue;
 }
 if(c.reviewStatus==='source-changed'){out.held.push(title);continue;}
 c.penaltyRangeVerified=true;
 c.penaltyReviewScope='individual-current-grade-range-only';
 c.penaltyGradeReviewDate='2026-10-17';
 c.penaltyGradeReviewSource=URL;
 c.penaltyGradeReviewProvision='BrB '+ref;
 c.penaltyGradeReviewCaveat=caveat;
 c.penaltyReviewSafety='Only numeric offence-grade penalty interval and fines/life eligibility compared; no assumption on inchoate, coercive law, historical act date, prosecutor conditions or comprehensive liability.';
 out.reviewed++;
}
window.BK_PENALTY_GRADE_AUDIT15=out;
})();