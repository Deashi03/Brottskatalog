/* V1.5 supplementary BrB 21–22 coverage.
 * 21 kap. requires war / Government activation under BrB 21:1; 22:2–3
 * require wartime circumstances for the underlying offence. These must
 * never yield automatic coercive-eligibility assertions.
 * 22:6c is NOT included (uncommenced law requiring Government decision).
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const WAR='BrB 21:1: Kapitlet tillämpas i krig eller när regeringen särskilt beslutar det under lagens förutsättningar. Kontrollera också att personen är krigsman enligt BrB 21:3.';
const LAND='Brott enligt 22:1–3 kräver tillämpning av de särskilda förutsättningarna under krig. För vissa förstadier finns utvidgat ansvar redan vid hot om krig enligt 22:7.';
const rows=[
 // title, ref, min, max, fines, life, applicability, caveat
 ['Lydnadsbrott','21:5',0,2,true,false,'war',WAR+' Ordern ska angå tjänsten.'],
 ['Grovt lydnadsbrott','21:6',0,10,false,true,'war',WAR+' Helhetsbedöm grovhetsgrunderna.'],
 ['Olovlig avvikelse av krigsman','21:7',0,2,true,false,'war',WAR+' Olovligt avvikande eller uteblivande från tjänstgöring.'],
 ['Grov olovlig avvikelse av krigsman','21:7',0,10,false,true,'war',WAR+' Bland annat avvikande i anslutning till strid eller övergång till fienden.'],
 ['Våld eller hot mot förman','21:8',0,2,true,false,'war',WAR+' Förman, vaktpost eller viss annan likställd krigsman.'],
 ['Grovt våld eller hot mot förman','21:8',0,6,false,false,'war',WAR+' Grovhetsgrunderna måste prövas särskilt.'],
 ['Samröre med fienden','21:9',0,2,true,false,'war',WAR+' Obehörigt meddelande/förbindelse med fiendens krigsmakt eller fiendekontrollerat område.'],
 ['Undergrävande av stridsviljan','21:10',0,10,false,true,'war',WAR+' Krav på krigssituation och inverkan på stridsviljan enligt lagtexten.'],
 ['Försummande av krigsförberedelse','21:11',0,10,false,true,'war',WAR+' Avser specificerade uppgifter inför en krigshandling.'],
 ['Obehörig kapitulation','21:12',0,10,false,true,'war',WAR+' Endast chef för avdelning i angiven tjänstgöring.'],
 ['Stridsförsumlighet','21:13',0,10,false,true,'war',WAR+' Gäller under eller i anslutning till strid.'],
 ['Tjänstebrott','21:14',0,2,false,false,'war',WAR+' Allvarligt åsidosättande uppsåtligen eller av grov oaktsamhet; subsidiärt till övriga bestämmelser i 21 kap.'],
 ['Landssvek','22:2',0,6,false,false,'land',LAND+' Gärningsformen är hänvisad till BrB 22:1 men har lägre grad av fara/bistånd åt fienden.'],
 ['Landsskadlig vårdslöshet','22:3',0,4,false,false,'land',LAND+' Oaktsam gärning enligt BrB 22:1 eller 22:2.'],
 ['Olovlig befattning med kemiska vapen','22:6a',0,4,false,false,'none','Får inte sammanblandas med krigsförbrytelse enligt 2014:406. Definitionen av kemiska vapen följer internationell konvention.'],
 ['Grov olovlig befattning med kemiska vapen','22:6a',0,18,false,true,'none','Grovhetsbedömning enligt BrB 22:6 a, bland annat fara kopplad till utveckling, spridning eller användning mot människor.'],
 ['Olovlig befattning med minor','22:6b',0,4,false,false,'none','Gäller konventionsdefinierade antipersonella minor. Undantag gäller befattning tillåten enligt konventionen och gärningar som ska bedömas som krigsförbrytelse.'],
 ['Grov olovlig befattning med minor','22:6b',0,18,false,true,'none','Grovhetsbedömning enligt BrB 22:6 b, bland annat om minorna kan ha utsatt många människor för fara.']
];
let added=0;const known=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
const fmt=n=>n===.5?'6 mån':n+' år';
for(const [title,ref,min,max,fines,life,applicability,note] of rows){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const statute='BrB:'+ref,source=window.BK_STATUTES?.[statute];
 if(!source?.text)throw Error('Missing legal text for '+statute);
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const war=applicability!=='none';
 const penalty=(fines?'Böter eller fängelse':'Fängelse')+' i högst '+fmt(max)+(life?' eller livstid':'');
 const short=(fines?'B–F ':'F ')+fmt(max)+(life?' / livstid':'');
 D.crimes.push({
  id:'v15-war-'+slug,title,shortRef:'BrB '+ref,ref:'BrB '+ref.replace(':',' kap. ')+' §',statute,
  category:ref.startsWith('21')?'Krigsmän':'Rikets säkerhet',aliases:[],sourceURL:URL,
  law:source.text,lawSource:source.ref,lawMode:'machine',
  penalty,penaltyShort:war?'Villkorat: '+short:short,
  penaltyRange:{min,max,fines,life},penaltyChecked:'2026-10-16',
  penaltyRangeVerified:true,penaltyReviewScope:'numeric-range-only-and-applicability-conditional',
  penaltySourceURL:URL,penaltyNote:note,
  applicabilityConditional:war,applicabilityType:applicability,
  custody:war?'unknown':max>=1?'possible':'none',
  prosecution:'general',prosecutionLabel:'Allmänt åtal – kontrollera särregler',
  prosecutionRule:'RB 20:3; BrB '+ref,
  prosecutionDetails:['Allmänt åtal som generell utgångspunkt. Kontrollera särskilda regler för krigsförhållanden, medverkan och tillämplighet.'],
  prosecutionChecked:'2026-10-16',prosecutionSourceURL:URL,
  reviewStatus:'law-text-legal-review-pending',requisitesStatus:'pending-individual-legal-review',
  elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[],
  legalDependencies:[statute,...(war?['BrB:21:1','BrB:21:3']:[])],
  applicabilityWarning:note
 });known.add(title.toLocaleLowerCase('sv'));added++;
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_WAR_OFFENCES15={added,source:URL,withheldFutureLaw:'BrB 22:6c',scopedApplicability:rows.filter(r=>r[6]!=='none').length};
})();