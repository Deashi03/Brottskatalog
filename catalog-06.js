/* Brottskatalog 0.6 — 16 supplemental BrB offences with source-tied penalties. */
(()=>{const D=window.BK_DATA;if(!D)return;const rows=[["Brott mot rösthemlighet","17:9","Allmän ordning","BF0.5","röja valhemlighet"],["Förolämpning mot tjänsteman","17:3","Tjänsteman","BF0.5","förolämpa polis i tjänst"],["Våldsamt motstånd","17:4","Tjänsteman","BF0.5","motvärn vid myndighetsutövning"],["Underlåtenhet att avvärja allmänfara","13:10","Allmänfarliga","BF1","inte avvärja fara"],["Otillåtet förfarande med pornografisk bild","16:11","Allmän ordning","BF0.5","otillåten offentlig visning"],["Falskt larm","16:15","Allmän ordning","BF1","oriktig fara för människor"],["Grovt falskt larm","16:15","Allmän ordning","F0.5-4","grovt falskt brandlarm"],["Missbruk av larmanordning","16:15","Allmän ordning","BF0.5","obefogat nödlarm"],["Osann partsutsaga","15:2","Rättsväsende","F2","ljuga under sanningsförsäkran"],["Ringa osann partsutsaga","15:2","Rättsväsende","BF0.5","ringa osann partsutsaga"],["Ovarsam utsaga","15:3","Rättsväsende","BF0.5","grovt oaktsam osann utsaga"],["Missbruk av urkund","15:12","Urkund","BF0.5","använda någon annans legitimation"],["Grovt missbruk av urkund","15:12","Urkund","F2","grovt falskt legitimation"],["Missbruk av handling","15:12","Urkund","BF0.5","falsk kopia"],["Otillbörligt gynnande av borgenär","11:4","Förmögenhet","F2","gynna en borgenär vid konkurs"],["Tagande av otillbörlig förmån vid röstning","17:8","Allmän ordning","BF0.5","ta pengar för att rösta"]];
const known=new Set(D.crimes.map(x=>x.title.toLocaleLowerCase('sv')));
const duration=n=>n===.5?'6 mån':Number.isInteger(n)?n+' år':Math.floor(n)+' år '+Math.round(n%1*12)+' mån';
for(const [title,ref,category,pen,aliases] of rows){
 if(known.has(title.toLocaleLowerCase('sv')))continue;
 const key='BrB:'+ref.split(':').join(':'),stat=window.BK_STATUTES?.[key];
 if(!stat?.text){console.warn('Skipping crime without statute',title);continue;}
 const matches=pen.match(/^(BF|F)([0-9.]+)(?:-([0-9.]+))?$/);
 if(!matches)continue;
 const fine=matches[1]==='BF',min=matches[3]?+matches[2]:0,max=matches[3]?+matches[3]:+matches[2];
 const slug=title.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
 const c={
 id:'v06-'+slug,title,ref:'BrB '+ref.split(':')[0]+' kap. '+ref.split(':')[1]+' §',shortRef:'BrB '+ref,category,aliases:aliases.split(';'),
 statute:key,penalty:fine?'Böter eller fängelse högst '+duration(max):min?'Fängelse '+duration(min)+' – '+duration(max):'Fängelse högst '+duration(max),
 penaltyShort:fine?'B–F '+duration(max):min?'F '+duration(min)+'–'+duration(max):'F högst '+duration(max),
 penaltyRange:{min,max,fines:fine,life:false},
 penaltyNote:'Kontrollera de alternativa graderna i lagtexten; källan är den konsoliderade brottsbalken.',penaltyChecked:'2026-10-12',
 custody:min>=1.5?'presumption':max>=1?'possible':'none',
 prosecution:'unknown',prosecutionLabel:'Kontrollera åtalsregel',
 prosecutionDetails:['Åtalsregeln har inte genomgått fullständig individuell kontroll mot kapitelvisa och andra särskilda åtalsbestämmelser. Allmän åtalsrätt får inte antas endast för att brottet återfinns i brottsbalken.'],
 law:stat.text,lawSource:stat.ref,lawMode:stat.machine?'machine':'full',sourceURL:'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/',
 elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],reviewStatus:'penalty-crosscheck-pending'};
 D.crimes.push(c);known.add(title.toLocaleLowerCase('sv'));
}
D.categories=['Alla',...new Set(D.crimes.map(x=>x.category))];
})();