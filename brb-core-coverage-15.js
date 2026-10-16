/* V1.5: BrB 16–19 – explicit source-scoped additions.
 * No invented single numeric scale for role/war-dependent punishments.
 * Machine-imported statutes and special conditions still need final human review.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const rows=[
 // title | ref | category | minYears | maxYears | fines | life | caution | prosecution
 ['Upplopp','16:1','Allmän ordning',null,null,null,false,'Anstiftare och anförare: upp till fyra års fängelse om folksamlingen inte skingras på myndighets befallning; om den skingras: böter eller fängelse högst två år. Annan deltagare: böter eller fängelse högst två år. Pröva roll och skingringsförlopp.','general'],
 ['Våldsamt upplopp','16:2','Allmän ordning',null,null,null,false,'Anstiftare och anförare: fängelse högst tio år; övriga deltagare: böter eller fängelse högst fyra år. Rollberoende straffskala – inget generellt intervall.','general'],
 ['Involverande av en underårig i brottslighet','16:5a','Allmän ordning',0,6,false,false,'Barnets ålder kan omfattas av oaktsamhet; om gärningen är uppenbart mindre allvarlig döms inte till ansvar.','general'],
 ['Myteri','16:6','Allmän ordning',null,null,null,true,'Alternativa straffskalor för deltagare respektive anstiftare och anförare, och för våldsanvändning samt grovt brott; möjlighet till livstid. Pröva gärningsform och roll.','general'],
 ['Olaga våldsskildring','16:10c','Allmän ordning',0,2,true,false,'Lagtextens särskilda försvarlighetsundantag gäller. Oaktsam spridning är straffbelagd endast inom angiven yrkesmässig eller förvärvsmässig verksamhet.','general'],
 ['Otillåten utlämning av teknisk upptagning','16:10d','Allmän ordning',0,.5,true,false,'Gäller angiven spridning till barn under femton år i yrkesmässig verksamhet eller förvärvssyfte, med lagtextens undantag och uppsåt eller grov oaktsamhet.','general'],
 ['Överträdelse av myndighets bud','17:13','Allmän verksamhet',0,1,true,false,'Pröva att ett myndighetsförbud, förrättning, anslag, försegling eller annan åtgärd omfattas av paragrafen och att åtgärden var olovlig.','general'],
 ['Hindrande av förrättning','17:13','Allmän verksamhet',0,0,true,false,'Endast böter; vägran av inträde som förrättningsmannen har rätt att fordra.','general'],
 ['Väpnat hot mot laglig ordning','18:3','Rikets säkerhet',6,10,false,false,'Särskilt uppsåt att brott skall förövas mot allmän säkerhet eller medborgares frihet; inte alla privata väpnade grupper uppfyller rekvisiten.','general'],
 ['Olovlig kårverksamhet','18:4','Rikets säkerhet',0,2,true,false,'Förutsätter sammanslutning med kapacitet som kan liknas vid militär trupp eller polisstyrka och som inte med behörigt tillstånd förstärker försvar eller ordningsmakt.','general'],
 ['Brott mot medborgerlig frihet','18:5','Rikets säkerhet',0,6,false,false,'Utöver olaga tvång/hot krävs uppsåt att påverka åsiktsbildning eller organisationsfrihet samt att friheten sätts i fara.','general'],
 ['Svikande av försvarsplikt','18:6','Rikets säkerhet',null,null,null,false,'Böter eller fängelse högst två år; om Sverige är i krig böter eller fängelse högst fyra år. Straffskalan beror på om krig råder.','general'],
 ['Högförräderi','19:1','Rikets säkerhet',null,null,null,true,'Huvudalternativ fängelse 10–18 år eller livstid; om faran var ringa fängelse 4–10 år. Förutsätter särskilda förräderiuppsåt och konkret fara enligt bestämmelsen.','general'],
 ['Krigsanstiftan','19:2','Rikets säkerhet',2,8,false,false,'Subsidiär till högförräderi; kräver fara för att Sverige invecklas i krig eller andra fientligheter genom angivna medel.','general'],
 ['Trolöshet vid förhandling med främmande makt','19:3','Rikets säkerhet',2,18,false,true,'Kräver särskilt svenskt uppdrag, missbruk av behörighet/förtroendeställning och avsevärt men för Sverige.','general'],
 ['Egenmäktighet vid förhandling med främmande makt','19:4','Rikets säkerhet',null,null,null,true,'Straffskala varierar vid krig och vid fara för Sveriges självbestämmanderätt eller fredliga förhållande med främmande makt. Läs samtliga stycken.','general'],
 ['Utlandsspioneri','19:6a','Rikets säkerhet',0,4,false,false,'Gäller särskilt skyddade uppgifter i internationellt samarbete, med främmande makt-tillhanda-syfte och försvarlighetsundantag.','general'],
 ['Grovt utlandsspioneri','19:6b','Rikets säkerhet',2,8,false,false,'Gradindelningen kräver helhetsbedömning av omständigheterna i BrB 19:6 b.','general'],
 ['Grov obehörig befattning med hemlig uppgift','19:8','Rikets säkerhet',0,4,false,false,'Avser grov grad av gärningar enligt BrB 19:7; kontrollera särskilda gradindelningsgrunder.','general'],
 ['Röjande av hemlig uppgift i internationellt samarbete','19:9a','Rikets säkerhet',0,1,true,false,'Uppsåtligt röjande: böter/fängelse högst ett år. Grovt oaktsamt röjande enligt andra stycket: enbart böter. Särskilt försvarlighetsundantag.','general'],
 ['Olovlig underrättelseverksamhet mot Sverige','19:10','Rikets säkerhet',0,2,false,false,'Särskilt uppsåt att gå främmande makt tillhanda, hemligt eller svikligt underrättelsearbete om Sveriges säkerhet.','general'],
 ['Grov olovlig underrättelseverksamhet mot Sverige','19:10','Rikets säkerhet',.5,4,false,false,'Grovhetsbedömning av gärningar enligt BrB 19:10.','general'],
 ['Olovlig underrättelseverksamhet mot främmande makt','19:10a','Rikets säkerhet',0,1,true,false,'Avser underrättelseverksamhet i Sverige riktad mot annan främmande makts säkerhet. Regeringens förordnande kan krävas för åtal (19:16).','conditional'],
 ['Grov olovlig underrättelseverksamhet mot främmande makt','19:10a','Rikets säkerhet',.5,4,false,false,'Grovhetsgrad enligt BrB 19:10 a. Regeringens förordnande kan krävas för åtal (19:16).','conditional'],
 ['Olovlig underrättelseverksamhet mot person','19:10b','Rikets säkerhet',0,1,false,false,'Förutsätter bland annat uppsåt att gå främmande makt tillhanda och hemliga, svikliga eller otillbörliga medel.','general'],
 ['Grov olovlig underrättelseverksamhet mot person','19:10b','Rikets säkerhet',.5,4,false,false,'Grovhetsgrad enligt BrB 19:10 b.','general'],
 ['Olovlig värvning','19:12','Rikets säkerhet',null,null,null,false,'I fredstid böter/fängelse högst ett år; om Sverige är i krig fängelse högst två år. Regeringens förordnande krävs för allmänt åtal (19:16).','conditional'],
 ['Tagande av utländskt understöd','19:13','Rikets säkerhet',0,2,false,false,'Särskilt syfte att påverka allmänna meningen i fråga som anges i paragrafen. Regeringens förordnande krävs för allmänt åtal (19:16).','conditional']
];
const seen=new Set(D.crimes.map(c=>String(c.title||'').toLocaleLowerCase('sv')));
const span=n=>n===.5?'6 mån':Number.isInteger(n)?n+' år':(n*12)+' mån';
let added=0;
for(const [title,ref,category,min,max,fines,life,caution,prosecution] of rows){
 if(seen.has(title.toLocaleLowerCase('sv'))){continue;}
 const statute='BrB:'+ref, source=window.BK_STATUTES?.[statute];
 if(!source?.text)throw Error('Saknat lagtextunderlag för '+title+' i '+statute);
 const variable=min===null||max===null;
 const range=variable?null:{min,max,fines,life};
 const pen=variable?'Villkorad straffskala – se lagtext och tillämpningsvillkor':
  (fines?'Böter eller fängelse':'Fängelse')+(min>0?' i lägst '+span(min)+' och högst '+span(max):' i högst '+span(max))+(life?' eller livstid':'');
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const stageDependencies=variable?['Särskilt kontrollbehov för eventuellt förstadieansvar på grund av alternativ straffskala.']:[];
 const c={
   id:'v15-cover-'+slug,title,shortRef:'BrB '+ref,ref:'BrB '+ref.replace(':',' kap. ')+' §',statute,category,aliases:[],
   penalty:pen,penaltyShort:variable?'Villkorad – se lagtext':fines?'B–F '+span(max):min?'F '+span(min)+'–'+span(max):'F högst '+span(max),
   penaltyRange:range,penaltyChecked:variable?null:'2026-10-16',penaltyRangeVerified:!variable,
   penaltyReviewScope:variable?'variable-range-awaits-role-specific-review':'numerical-scale-only',
   penaltyNote:caution,penaltySourceURL:URL,
   custody:variable?'unknown':min>=1.5?'presumption':max>=1?'possible':'none',
   prosecution:prosecution==='conditional'?'conditional':'general',
   prosecutionLabel:prosecution==='conditional'?'Regeringens förordnande kan krävas':'Allmänt åtal',
   prosecutionRule:prosecution==='conditional'?'BrB 19:16; RB 20:3':'RB 20:3; BrB '+ref,
   prosecutionDetails:prosecution==='conditional'?['Regeringens förordnande enligt BrB 19:16 krävs i de situationer som bestämmelsen omfattar.']:['Allmänt åtal är huvudregel. Kontrollera person- och situationella undantag.'],
   prosecutionChecked:'2026-10-16',prosecutionSourceURL:URL,prosecutionReviewStatus:'named-statute-section-checked',
   law:source.text,lawSource:source.ref,lawMode:'machine',sourceURL:URL,
   reviewStatus:'law-text-legal-review-pending',requisitesStatus:'pending-individual-legal-review',
   elements:[],variants:[],facts:[],stages:stageDependencies,related:[],lawTerms:[],
   typexempel15:[],legalDependencies:[statute],
   conditionalPenalty:variable,applicabilityWarning:caution
 };
 D.crimes.push(c);seen.add(title.toLocaleLowerCase('sv'));added++;
}
D.categories=['Alla',...new Set(D.crimes.map(c=>c.category))];
window.BK_BRB_COVERAGE15={added,expected:rows.length,source:URL,variableRanges:rows.filter(r=>r[3]===null).length};
})();