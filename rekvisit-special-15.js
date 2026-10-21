/* V1.5 source-anchored expansion for documents, public-order and professional offences.
 * Explicitly separate statutory disjunctions and keep final legal approval false.
 */
(()=>{'use strict';const D=window.BK_DATA;if(!D?.crimes)return;
const URL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const A=label=>({mode:'all',label}),O=(label,...options)=>({mode:'any',label,options});
const by=t=>D.crimes.find(c=>!c.stageType&&String(c.title||'').toLocaleLowerCase('sv')===t.toLocaleLowerCase('sv'));
const older=by('Brott mot griftefrid');
if(older&&!by('Gravfridsbrott')){
 const p=window.BK_STATUTES?.['BrB:16:10'];
 if(!p?.text?.includes('gravfridsbrott'))throw Error('2022 grave peace reform not available');
 older.title='Gravfridsbrott';older.shortRef='BrB 16:10';older.ref='BrB 16 kap. 10 §';
 older.statute='BrB:16:10';
 older.aliases=[...new Set([...(older.aliases||[]),'Brott mot griftefrid'])];
 older.law=p.text;older.lawMode='machine';older.lawSource=p.ref;older.sourceURL=URL;
 older.penalty='Böter eller fängelse i högst två år';older.penaltyShort='B–F högst 2 år';
 older.penaltyRange={min:0,max:2,fines:true,life:false};older.penaltyRangeVerified=true;
 older.penaltyChecked='2026-10-16';older.penaltyReviewScope='numerical-scale-only';older.penaltySourceURL=URL;
 older.penaltyNote='Lag (2022:607) införde rubriceringen gravfridsbrott i stället för äldre brott mot griftefrid.';
 older.reviewStatus='law-text-legal-review-pending';
}
if(!by('Grovt gravfridsbrott')){
 const p=window.BK_STATUTES?.['BrB:16:10'];
 if(p?.text?.includes('grovt gravfridsbrott')){
  D.crimes.push({
   id:'v15-grovt-gravfridsbrott',title:'Grovt gravfridsbrott',shortRef:'BrB 16:10',
   ref:'BrB 16 kap. 10 §',statute:'BrB:16:10',category:'Allmän ordning',aliases:[],
   law:p.text,lawMode:'machine',lawSource:p.ref,sourceURL:URL,penalty:'Fängelse i lägst sex månader och högst fyra år',
   penaltyShort:'F 6 mån–4 år',penaltyRange:{min:.5,max:4,fines:false,life:false},
   penaltyRangeVerified:true,penaltyChecked:'2026-10-16',penaltyReviewScope:'numerical-scale-only',penaltySourceURL:URL,
   penaltyNote:'Särskilt grovhetsfaktorer i BrB 16:10, inte automatiska rekvisit.',
   prosecution:'general',prosecutionLabel:'Allmänt åtal',prosecutionRule:'RB 20:3',
   prosecutionDetails:['Kontrollera särskilda omständigheter och relevant gärningsdatum.'],
   custody:'possible',reviewStatus:'law-text-legal-review-pending',
   elements:[],variants:[],facts:[],stages:[],related:[],lawTerms:[],typexempel15:[],requisitesStatus:'pending-individual-legal-review'
  });
 }
}
const specs=[
 ['Tvegifte','7:1',[
  O('En av följande två handlingar sker:','En gift person ingår ytterligare ett äktenskap','En ogift person ingår äktenskap med någon som redan är gift'),
  A('Gärningspersonen har uppsåt till de relevanta förhållandena.')]],
 ['Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn','7:2',[
  A('Det gäller en annan persons adoption av ett barn under 18 år.'),
  O('Samtycke eller tillstånd utverkas genom:', 'Olaga tvång','Vilseledande','Löfte om otillbörlig ersättning','Erläggande av otillbörlig ersättning'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Ockerpantning','9:10',[
  A('Gärningspersonen mottar en handling för användning som påtryckningsmedel vid ett krav.'),
  O('Handlingen är:', 'Falsk','Upprättad för skens skull','Annars oriktig','Check utan täckning'),
  A('Gärningspersonen har uppsåt till mottagandet och användningssyftet.')]],
 ['Bokföringsbrott','11:5',[
  A('Bokföringsskyldighet finns enligt bokföringslagen.'),
  O('Skyldigheten åsidosätts genom:', 'Underlåten bokföring av affärshändelser','Underlåtenhet att bevara räkenskapsinformation','Oriktig uppgift i bokföring','Annat åsidosättande'),
  A('Till följd av åsidosättandet kan rörelsens förlopp, ekonomiska resultat eller ställning inte i huvudsak bedömas med ledning av bokföringen.'),
  O('Gärningen begås:', 'Uppsåtligen','Av oaktsamhet'),
  A('Undantaget för vissa juridiska personer som inte bedriver näringsverksamhet ska prövas.')]],
 ['Åverkan','12:2a',[
  A('Något av de i BrB 12:2 a uppräknade naturföremålen i skog eller mark tas olovligen.'),
  O('Gärningsföremålet avser:', 'Växande träd/gräs, stormfällt träd, sten, grus, torv eller annat obearbetat','Ris, gren, näver, bark, löv, bast, ollon, nötter eller kåda från växande träd'),
  A('Tillgreppet bedöms som ringa utifrån värde och övriga omständigheter.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Allmänfarlig ödeläggelse','13:3',[
  O('Gärningen innebär att gärningspersonen åstadkommer:', 'Explosion','Översvämning','Ras','Skeppsbrott','Flygolycka','Tågolycka','Annan liknande ofärd'),
  O('Gärningen framkallar konkret fara för:', 'Annans liv eller hälsa','Omfattande förstörelse av annans egendom'),
  A('Gärningspersonen handlar uppsåtligen i relevant omfattning.')]],
 ['Sabotage','13:4',[],[
  {label:'Alternativ A – egendom av betydelse för grundläggande samhällsfunktion',groups:[
    A('Egendomen har avsevärd betydelse för rikets försvar, folkförsörjning, rättsskipning, förvaltning eller ordning/säkerhet.'),
    O('Gärningen består av:', 'Förstörelse eller skada av egendomen','Annan åtgärd som allvarligt stör/hindrar användningen (inte endast undanhållande av arbetskraft)'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – allmän samfärdsel eller försörjningsanläggning',groups:[
    A('Allmän samfärdsel eller angiven samhällsviktig kommunikations- eller försörjningsanläggning allvarligt störs eller hindras.'),
    A('Störningen orsakas genom skadegörelse eller annan handling som omfattas av bestämmelsen.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Hindrande av urkunds bevisfunktion','14:4',[
  O('Gärningspersonen gör något av följande med en urkund:', 'Förstör','Gör obrukbar','Döljer'),
  A('Gärningspersonen saknar rätt att vid tillfället vidta åtgärden.'),
  A('Åtgärden innebär fara i bevishänseende och utgör inte bokföringsbrott.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Signaturförfalskning','14:5',[
  A('En annans signatur eller namnteckning på konst, brukskonst eller jämförbart verk anbringas eller förfalskas olovligen.'),
  A('Det framstår därigenom som att personen angett sig vara verkets upphovsman.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Penningförfalskning','14:6',[
  O('En sedel eller ett mynt:', 'Eftergörs','Förfalskas på annat sätt'),
  A('Sedeln/myntet gäller i Sverige eller utomlands eller har beslutats för utgivning men är ännu inte giltigt.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Olovlig befattning med falska pengar','14:7',[
  A('Falska sedlar eller mynt enligt BrB 14:6 är föremål för gärningen.'),
  O('Befattningen sker genom:', 'Anskaffande','Lämnande','Mottagande','Förvarande','Transport','Annan liknande befattning'),
  A('Gärningspersonen har särskilt uppsåt att det förfalskade ska prånglas ut.')]],
 ['Förfalskning av fast märke','14:9',[
  O('Gärningspersonen:', 'Anbringar obehörigen märke/föremål som kan förväxlas med skyddat fast märke','Flyttar, tar bort, skadar eller förstör skyddat fast märke'),
  A('Märket är sådant gränsmärke, vattenmärke, fixpunkt eller märke för plan-/höjdmätning som skyddas enligt BrB 14:9.'),
  A('Åtgärden innebär fara i bevishänseende.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Falsk beskyllning','15:7',[
  A('Annan person blir osant beskyllt hos åklagare, Polismyndigheten eller myndighet som ska ta upp anmälan i saken.'),
  O('Den osanna utsagan består av:', 'Beskyllning om brottslig gärning','Uppgift om besvärande omständighet','Förnekande av friande eller mildrande omständighet'),
  A('Gärningspersonen handlar uppsåtligen. Lagtexten anger särskilda brott för den som hade skälig anledning att anta utsagans osanning.')]],
 ['Osann försäkran','15:10',[
  A('En uppgift lämnas på annat sätt än muntligen under heder och samvete eller liknande försäkran enligt lag eller författning.'),
  O('Gärningspersonen:', 'Lämnar osann uppgift','Förtiger sanningen'),
  A('Åtgärden innebär fara i bevishänseende.'),
  A('Gärningspersonen handlar uppsåtligen; grov oaktsamhet utgör i stället vårdslös försäkran.')]],
 ['Osant intygande','15:11',[
  O('Gärningsformen är:', 'I intyg eller urkund osann uppgift om vem man är eller annat än egna angelägenheter','För skens skull upprättad urkund rörande rättshandling'),
  A('Åtgärden innebär fara i bevishänseende.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Ohörsamhet mot ordningsmakten','16:3',[
  A('Gärningspersonen deltar i en folksamling som stör allmän ordning.'),
  O('Personen:', 'Underlåter att följa befallning som meddelats för ordningens upprätthållande','Tränger in på för ordningens upprätthållande fridlyst eller avspärrat område'),
  A('Gärningen utgör inte upplopp och personen handlar uppsåtligen.')]],
 ['Uppvigling','16:5',[
  A('Gärningspersonen uppmanar eller söker annars förleda andra genom sådant offentligt meddelande eller sådant meddelande till krigsmän som lagtexten anger.'),
  O('Det som eftersträvas är:', 'Brottslig gärning','Svikande av medborgerlig skyldighet','Ohörsamhet mot myndighet','I särskild krigsmannasituation åsidosättande av skyldigheter i tjänsten'),
  A('Gärningen är inte ringa enligt lagens undantag; faran för efterföljd är relevant.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Olaga diskriminering','16:9',[],[
  {label:'Alternativ A – näringsidkare eller annan likställd verksamhet',groups:[
    A('Gärningspersonen är näringsidkare, anställd/representant i näringsverksamhet, offentligt anställd eller har offentligt uppdrag.'),
    A('Någon nekas villkor som normalt gäller för andra i motsvarande verksamhet.'),
    A('Missgynnandet sker på grund av någon av de diskrimineringsgrunder som räknas upp i BrB 16:9.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – offentlig tillställning/sammankomst',groups:[
    A('Gärningspersonen är anordnare eller dennes medhjälpare vid allmän sammankomst eller offentlig tillställning.'),
    A('Någon nekas tillträde på villkor som gäller för andra på grund av en skyddad diskrimineringsgrund enligt paragrafen.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Gravfridsbrott','16:10',[],[
  {label:'Alternativ A – kvarlevor',groups:[
    O('Gärningspersonen obehörigen:', 'Flyttar en avlidens lik/aska','Skadar lik/aska','Behandlar lik/aska skymfligen'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – grav eller minnesanordning',groups:[
    O('Gärningspersonen obehörigen:', 'Öppnar grav','Förstör, skadar eller gör ofog på kista, urna, grav, vilorum eller gravvård'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Förargelseväckande beteende','16:16',[
  O('Handlingen består av:', 'Oljud på allmän plats','Annat offentligt beteende som är ägnat att väcka förargelse hos allmänheten'),
  A('Gärningspersonen handlar uppsåtligen. Att en enskild subjektivt irriteras är inte i sig tillräckligt.')]],
 ['Förolämpning mot tjänsteman','17:3',[
  O('Gärningen sker genom riktad:', 'Beskyllning','Nedsättande uttalande','Förödmjukande beteende'),
  A('Det gäller tjänsteman vid myndighetsutövning, eller ett angrepp för att tvinga, hindra eller hämnas åtgärd i myndighetsutövning.'),
  A('Gärningen är ägnad att kränka tjänstemannens självkänsla eller värdighet.'),
  A('Gärningspersonen handlar uppsåtligen.')]],
 ['Föregivande av allmän ställning','17:15',[],[
  {label:'Alternativ A – obehörigt myndighetsutövande',groups:[
    A('Gärningspersonen ger sig utan behörighet ut för att utöva myndighet.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – obehörig uniform eller tjänstetecken',groups:[
    A('Gärningspersonen bär obehörigen uniform, märke eller annat tjänstetecken som ger sken av tillhörighet till någon av de angivna offentliga eller samhällsviktiga kårerna.'),
    A('Gärningspersonen handlar uppsåtligen.') ]}
 ]],
 ['Missbruk av offentlig ställning','20:2',[],[
  {label:'Alternativ A – förmånsändamål',groups:[
    A('Gärningspersonen handlar vid offentlig tjänst, offentligt uppdrag eller annan offentlig verksamhet och gärningen omfattas inte av tjänstefel enligt BrB 20:1.'),
    A('En åtgärd vidtas eller underlåts i strid med lag eller författning.'),
    A('Syftet är att skaffa otillbörlig förmån åt sig själv eller någon annan.'),
    A('Gärningspersonen handlar uppsåtligen.') ]},
  {label:'Alternativ B – otillbörligt missgynnande',groups:[
    A('Gärningspersonen handlar vid offentlig tjänst, offentligt uppdrag eller annan offentlig verksamhet; BrB 20:1 är inte tillämplig.'),
    A('En åtgärd vidtas eller underlåts i strid med lag eller författning.'),
    A('Syftet är att otillbörligt missgynna någon annan och gärningspersonen handlar uppsåtligen.') ]}
 ]]
];
let updated=0,missing=[],mismatch=[];
for(const [title,ref,groups,routes] of specs){
 const c=by(title);
 if(!c){missing.push(title);continue;}
 if(String(c.shortRef||'').replace(/\s/g,'')!=='BrB'+ref){mismatch.push(title+' '+c.shortRef);continue;}
 const p=window.BK_STATUTES?.['BrB:'+ref];if(!p?.text)throw Error('No actual SFS text '+ref);
 if(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length)continue;
 c.rekvisit15={groups,routes:routes||[],source:'BrB '+ref+' samt BrB 1:2 om inte annat följer av lag',
  sourceURL:URL,scope:'lagtext-jamford',verifiedOn:'2026-10-16',legalReviewApproved:false,
  note:'Ordalydelsebaserade rekvisit och gärningsalternativ. Kontrollera specialundantag, subjektiva rekvisit, konkurrens, praxis och lydelsen vid gärningsdatum före operativ tillämpning.'};
 updated++;
}
const grave=by('Gravfridsbrott'),gross=by('Grovt gravfridsbrott');
if(grave?.rekvisit15&&gross&&!gross.rekvisit15){
 gross.rekvisit15={...JSON.parse(JSON.stringify(grave.rekvisit15)),
  routes:grave.rekvisit15.routes.map(r=>({...r,groups:[...r.groups,A('Grovheten måste bedömas samlat. Särskilt beaktas svår skada på lik, omfattande förstörelse eller särskild hänsynslöshet/farlighet; dessa är inte var för sig obligatoriska faktorer.')]})),
  source:'BrB 16:10 andra stycket',legalReviewApproved:false};
}
const impersonator=by('Föregivande av allmän ställning');
if(impersonator&&!impersonator.typexempel15?.length){
 impersonator.typexempel15=[{
  kind:'typfall',status:'source-attributed-typical-example',typecaseReviewed:'2026-10-16',
  text:'En person som inte är polis tar på sig en polisuniform med polisens tjänstetecken på allmän plats så att det framstår som om personen tillhör Polismyndigheten.',
  source:'Eget enkelt typexempel, BrB 17:15 andra gärningsalternativet.',
  sourceURL:URL
 }];
}
window.BK_REKVISIT_SPECIAL15={updated,missing,mismatch,graveReformed:!!grave,grossAdded:!!gross,source:URL};
})();