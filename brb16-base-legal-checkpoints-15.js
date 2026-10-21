/* Individual BrB 16 current-law offence and fault controls; fail closed.
 * All findings limited to published statutory paragraphs and explicitly
 * require separate doctrine, constitutional contexts, prosecution, history,
 * offence competition, child exceptions, inchoate and coercion review.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const sections={
 '16:1':{words:['stör folksamling allmän ordning','uppsåt att med förenat våld','skingrar den sig ej'],obj:'Upplopp kräver folksamling som stör allmän ordning, ett ådagalagt kollektivt uppsåt att genom förenat våld motsätta sig myndighet eller framtvinga/hindra åtgärd, samt särskilda villkor om skingring på myndighets befallning. Anstiftare, ledare och övriga deltagare regleras olika.',fault:'Lagtexten fordrar uttryckligen det kollektiva UPPÅTET att med förenat våld sätta sig upp mot myndighet eller förmå en åtgärd. Deltagande i folksamling räcker inte utan de individuella omständigheterna för den straffbara rollen.'},
 '16:2':{words:['har folksamling, med uppsåt som i 1 § sägs','gått till förenat våld'],obj:'Våldsamt upplopp förutsätter en folksamling med samma kvalificerade uppsåt som i 16:1 som också gått till faktiskt förenat våld mot person eller egendom. Paragrafen tillämpas även utan myndighet närvarande och skiljer ledare/anstiftare från deltagare.',fault:'Uppsåt till den gemensamma våldsliga handlingen och till de faktiska gruppomständigheterna krävs, med särskild hänvisning till 16:1:s kollektiva syfte. Spontan närvaro utan relevant delaktighet är inte automatiskt ansvar.'},
 '16:3':{words:['deltagare i folksamling som stör allmän ordning','efterkomma för ordningens upprätthållande','om ej upplopp föreligger'],obj:'Ohörsamhet mot ordningsmakten förutsätter deltagare i folksamling som stör allmän ordning och en för ordningens upprätthållande meddelad befallning som inte följs, eller intrång på område särskilt fredat/avspärrat för det ändamålet. Bestämmelsen är subsidiär till upplopp.',fault:'Uppsåt till underlåtenheten att följa befallningen eller det olovliga intrånget och relevanta faktiska ordningsomständigheter krävs. Brottet förutsätter inte att deltagaren själv begår våldshandling.'},
 '16:4':{words:['genom våldshandling eller oljud','stör eller söker hindra','internationella brottmålsdomstolen'],obj:'Störande av förrättning eller allmän sammankomst omfattar våld, oljud eller jämförbart sätt som stör eller söker hindra allmän gudstjänst, vigsel, begravning, domstol, myndighetsförrättning eller allmän sammankomst. Även angivna ICC-förhandlingar omfattas.',fault:'Uppsåt enligt 1:2 till den störande eller hindrande handlingen och dess relevanta sammanhang är huvudregeln. Enbart att ett möte upplevs störande utan lagens skyddade förrättning eller angivet angreppssätt är otillräckligt.'},
 '16:5':{words:['muntligen inför menighet eller folksamling','uppmanar eller annars söker förleda','i ringa fall ska det inte dömas till ansvar','är att anse som grovt'],obj:'Uppvigling avser offentlig eller motsvarande lagstadgad uppmaning/förledande till brottslig gärning, svikande av medborgerlig skyldighet eller ohörsamhet mot myndighet, med särskild krigsmannavariant. Ringa fall undantas helt efter prövning av risken för efterföljd; grov nivå har särskilt rekvisit.',fault:'Uppsåt till det offentliga meddelandet och dess uppmanande eller förledande innebörd krävs. Att en opinion väcker kontrovers är inte ensamt det särskilda uppmanings- och riskrekvisit som anges i 16:5.'},
 '16:5a':{words:['för brott eller brottslig verksamhet anlitar','inte har fyllt arton år','varit oaktsam','uppenbart mindre allvarligt'],obj:'Involverande av underårig omfattar att för brottslighet anlita, betala, instruera eller överlämna egendom till någon under 18 år och därigenom eller på liknande sätt involvera barnet. Undantag om ringa ålders-/utvecklingsskillnad eller annars uppenbart mindre allvarlig gärning måste prövas.',fault:'Uppsåt till involveringsgärningen krävs som huvudregel. Beträffande omständigheten att barnet är UNDER 18 ÅR omfattar lagtexten uttryckligen OAKTSAMHET, inte en automatisk uppsåtsfordran till barnets ålder.'},
 '16:6':{words:['samling av krigsmän gemensamt hotar','brukat våld','myteri'],obj:'Myteri förutsätter samling av krigsmän som gemensamt hotar att med våld motsätta sig förman. Faktiskt kollektivt våld ger särskild ansvarsnivå, och vid grovhet beaktas bland annat gärning under strid eller särskild fara för krigslydnaden.',fault:'Uppsåt till det gemensamma hotet eller våldet mot förman och deltagarens relevanta roll krävs enligt BrB 1:2. Ställningen som krigsman och den kollektiva gärningens samband med förman måste bevisas var för sig.'},
 '16:8':{words:['uttalande eller i ett annat meddelande som sprids','uppmanar till våld mot','folkgrupp','förnekar, ursäktar eller uppenbart förringar'],obj:'Hets mot folkgrupp omfattar spritt uttalande eller meddelande som hotar, uppmanar till våld eller uttrycker missaktning för skyddad grupp eller enskild där, med anspelning på uppräknad grund. Även angiven förnekelse/förringande av internationella brott kan omfattas med särskilda förutsättningar.',fault:'Uppsåt till spridningen, meddelandets relevanta innebörd och anspelning på skyddad grupp måste prövas enligt 1:2. Yttrandefrihetsrätt, det konkreta sammanhanget och HD-praxis är separata avgörande frågor, inte godkända av denna lagtextkontroll.'},
 '16:9':{words:['näringsidkare som i sin verksamhet diskriminerar','sexuell läggning','tillträde till sammankomsten'],obj:'Olaga diskriminering omfattar angivna näringsidkare, medverkande arbetstagare och vissa offentligt verksamma som på skyddad grund nekar lika villkor, samt särskilda anordnare som nekar inträde vid allmän sammankomst eller offentlig tillställning.',fault:'Uppsåt till den diskriminerande särbehandlingen och dess faktiska samband med skyddad grund krävs enligt 1:2. En ojämn serviceupplevelse utan en i paragrafen skyddad diskrimineringsgrund räcker inte.'},
 '16:10':{words:['flyttar, skadar eller skymfligen behandlar ett lik','öppnar en grav','grovt gravfridsbrott'],obj:'Gravfridsbrott omfattar obehörig flyttning, skada eller skymflig behandling av lik eller aska samt obehörig öppning eller skada på grav, kista, urna, annat vilorum eller gravvård. Grov grad prövas särskilt mot svår likskada, omfattande förstörelse eller särskilt hänsynslös/farlig art.',fault:'Uppsåt enligt 1:2 till den obehöriga gärningen och dess relevanta faktiska grav- eller kvarleveförhållanden krävs. Grovhetsbedömningen kan inte ersätta att den förbjudna åtgärden faktiskt riktats mot skyddat gravföremål.'},
 '16:10a':{words:['skildrar barn i pornografisk bild','sprider, överlåter, upplåter','betraktar en sådan bild','pubertetsutveckling','oaktsam'],obj:'Barnpornografibrott avser fem alternativa gärningar: skildring, tillgängliggörande, förvärv/utbjudande, handelsfrämjande och innehav eller aktivt åtkomstförberedd betraktelse. Barnets ålder eller pubertetsutveckling regleras med särskilda avbildnings- och bildbedömningskrav.',fault:'Uppsåt till den valda bildgärningen krävs som huvudregel. För barnets ÅLDER gäller särskilda uttryckliga OAKTSAMHETSVILLKOR, och spridning i yrkesmässig verksamhet eller förvärvssyfte har en särskild oaktsamhetsvariant. Undantag enligt 16:10 b måste prövas.'},
 '16:10c':{words:['i bild skildrar sexuellt våld eller tvång','med uppsåt att bilden','av oaktsamhet','yrkesmässig verksamhet'],obj:'Olaga våldsskildring omfattar visst sexuellt våld/tvång i bild eller närgången/utdragen skildring av grovt våld i rörliga bilder med syfte till spridning, eller själva spridningen. Försvarlig gärning undantas uttryckligen.',
 fault:'Framställning ska ske med uttryckligt UPPÅT att sprida bilden eller bilderna, medan spridning i yrkesverksamhet eller förvärvssyfte kan vara straffbar redan vid OAKTSAMHET. Skillnaden mellan bildframställning och spridning är central.'},
 '16:10d':{words:['uppsåtligen eller av grov oaktsamhet','under femton år','yrkesmässig verksamhet','mediemyndigheten'],obj:'Otillåten utlämning av teknisk upptagning kräver att en näringsverksam aktör lämnar teknisk rörlig bildupptagning med ingående verklighetstrogna vålds- eller hotskildringar till person under 15 år. Särskilda undantag gäller för visningsgodkänt innehåll och offentliga visningar.',
 fault:'Det är ett uttryckligt brott som kan begås uppsåtligen eller av GROV OAKTSAMHET. Mottagarens ålder, materialets beskaffenhet och godkännande enligt Mediemyndigheten måste prövas separat; ett generellt förbud mot våldsfilmer följer inte.'},
 '16:11':{words:['på eller vid allmän plats','förevisar pornografisk bild','utan föregående beställning'],obj:'Otillåtet förfarande med pornografisk bild omfattar allmän skyltning eller jämförbar förevisning som är ägnad att väcka allmän anstöt, samt att sända eller tillställa någon sådan bild utan föregående beställning. Dessa är alternativa gärningsvägar.',
 fault:'Uppsåt till offentligt förevisande eller till avsändande av bilden utan beställning krävs enligt 1:2. Att en bild är pornografisk uppfyller inte automatiskt kriterierna om allmän plats, allmän anstöt eller obeställd försändelse.'},
 '16:12':{words:['bland barn eller ungdom sprider','kan verka förråande','sedliga fostran'],obj:'Förledande av ungdom förutsätter spridning bland barn eller ungdom av skrift, bild eller teknisk upptagning vars innehåll kan verka förråande eller medföra allvarlig fara för ungas sedliga fostran. Den särskilda effekten och mottagarkretsen måste prövas.',
 fault:'Uppsåt till spridningen och de relevanta faktiska omständigheterna krävs enligt 1:2. Enbart en subjektiv åsikt att innehåll är olämpligt kan inte ersätta lagens särskilda krav på spridning och farlighet.'},
 '16:13':{words:['uppsåtligen eller av grov oaktsamhet','otillbörligen utsätter djur för lidande','grovt djurplågeri'],obj:'Djurplågeri förutsätter att ett djur otillbörligen utsätts för lidande genom misshandel, överansträngning, vanvård eller jämförbar gärning. Grov grad bedöms särskilt mot allvarligt lidande, flera djur eller särskilt hänsynslös/farlig art.',
 fault:'BrB 16:13 anger både UPPÅT och GROV OAKTSAMHET som skuldformer. Enbart att djuret är skadat visar inte vilken skuldform eller otillbörlighet som föreligger; de måste prövas konkret.'},
 '16:15':{words:['oriktig uppgift att det föreligger fara','onödig säkerhetsåtgärd','missbruk av larm, nödsignal'],obj:'Falskt larm kräver en oriktig uppgift om fara för liv, hälsa eller omfattande förstörelse och att den orsakar onödig säkerhetsåtgärd; grov grad är särskilt angiven. Missbruk av larmanordning kräver i stället larmanordningsmissbruk som föranleder onödig myndighetsutryckning.',
 fault:'Uppsåt till feluppgiften och dess konsekvens eller till missbruket av larmanordningen krävs enligt 1:2. Att ett larm varit obefogat innebär inte automatiskt att den som larmade hade uppsåtligt lämnat en oriktig uppgift.'},
 '16:16':{words:['oljud på allmän plats','offentligen beter sig','ägnat att väcka förargelse'],obj:'Förargelseväckande beteende omfattar oljud på allmän plats eller annat offentligt beteende som är ägnat att väcka allmänhetens förargelse. Handlingen måste ske under lagens offentlighetsförutsättningar; privat ovänskap utan sådant sammanhang är inte denna brottstyp.',
 fault:'Uppsåt till det offentliga störande beteendet och dess faktiska omständigheter krävs enligt 1:2. Att någon faktiskt känner sig förolämpad är inte i sig det objektiva kriteriet att handlingen är ägnad att väcka allmän förargelse.'}
};
const titles=[
 ['Upplopp','16:1'],['Våldsamt upplopp','16:2'],['Ohörsamhet mot ordningsmakten','16:3'],
 ['Störande av förrättning eller av allmän sammankomst','16:4'],
 ['Uppvigling','16:5'],['Grov uppvigling','16:5'],
 ['Involverande av en underårig i brottslighet','16:5a'],['Myteri','16:6'],
 ['Hets mot folkgrupp','16:8'],['Ringa hets mot folkgrupp','16:8'],['Grov hets mot folkgrupp','16:8'],
 ['Olaga diskriminering','16:9'],['Gravfridsbrott','16:10'],['Grovt gravfridsbrott','16:10'],
 ['Barnpornografibrott','16:10a'],['Ringa barnpornografibrott','16:10a'],['Grovt barnpornografibrott','16:10a'],
 ['Olaga våldsskildring','16:10c'],['Otillåten utlämning av teknisk upptagning','16:10d'],
 ['Otillåtet förfarande med pornografisk bild','16:11'],['Förledande av ungdom','16:12'],
 ['Djurplågeri','16:13'],['Grovt djurplågeri','16:13'],['Falskt larm','16:15'],
 ['Grovt falskt larm','16:15'],['Missbruk av larmanordning','16:15'],
 ['Förargelseväckande beteende','16:16']
];
const suffix={grov:'Grovhetsprövningen måste vara självständig och bygga på lagens gradbestämmelse. Ett högt straffvärde får aldrig användas som ersättning för grundbrottets fullbordansrekvisit.',
 ringa:'Ringa-beteckningen innebär en självständig grad- eller undantagsprövning enligt det specifika straffbudet. De grundläggande gärningsrekvisiten kvarstår och måste dokumenteras.'};
const source=(ref,cl)=>{const p=W['BrB:'+ref];return !!(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>85&&cl.words.every(x=>n(p.text).includes(n(x))))};
const general=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byKind:{objective:0,subjective:0},held:[],byOffence:[],
 checked:'2026-10-20',sourceURL:SRC,completeOffenceLegalApprovals:0,
 historicDateApprovals:0,caseLawApprovals:0,policePowerApprovals:0,
 prosecutionApprovals:0,inchoateStageApprovals:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),a={title,done:[],held:[]};report.byOffence.push(a);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'absent or mismatched base card'});continue;}
 const o=sections[ref],ready=source(ref,o)&&general&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const g=/^(Grov |Grovt )/.test(title)?'grov':/^Ringa /.test(title)?'ringa':null;
 const texts={objective:o.obj+(g?' '+suffix[g]:''),subjective:o.fault+(g?' '+suffix[g]:'')},out={};
 for(const [key,v] of Object.entries(texts)){
  if(ready&&v.length>=115){
   out[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceRefs:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
    finding:v,scope:'current-statutory-element-or-special-fault-only',
    fullOffenceLiabilityApproved:false,offenceDateOrTransitionalLawApproved:false,
    allExceptionsAndConstitutionalContextApproved:false,caseLawApproved:false,
    chargingPermissionApproved:false,coercivePowerApproved:false,
    inchoateStagesReviewed:false};
   report.completed++;report.byKind[key]++;a.done.push(key);
  }else{a.held.push(key);report.held.push({title,key,reason:'primary source or card structure mismatch'});}
 }
 if(a.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB16-2026-10-20',checkpoints:out,
  fullLegalReviewApproved:false,effectiveLawDatePending:true,
  caseLawAndConstitutionalReviewPending:true,offenceExceptionsPending:true,
  inchoateProsecutionAndPolicePowersPending:true};
}
window.BK_BRB16_BASE_AUDIT15=report;
})();