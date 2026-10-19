/* Individual BrB 15 chapter current-law audit – source-limited only.
 * Variants are separate cards; objective statutory conduct and fault modes
 * are separately reviewed and guarded against current law-source tampering.
 * No case-law, historic offence date, exceptions/competition, stage status,
 * charge condition or coercive authority is certified by this module.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const SRC='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=s=>String(s||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const clauses={
 '15:1':{anchor:['avlagt en ed som är föreskriven i lag','lämnar osann uppgift eller förtiger sanningen','grov mened'],
 obj:'Mened förutsätter att personen avlagt en i lag föreskriven ed och därefter lämnar osann uppgift eller förtiger sanningen. Vid grov grad beaktas särskilt syfte att försvåra allvarlig brottsutredning eller lagföring, få oskyldig dömd eller annars medföra synnerlig skada.',
 subj:'Uppsåt enligt 1:2 till den oriktiga edsutsagan eller förtigandet och relevanta faktiska omständigheter krävs. Grov menedens särskilt angivna syften är kvalificerande faktorer; grov oaktsamhet hänförs i stället till 15:3.'},
 '15:2':{anchor:['förhör under sanningsförsäkran i rättegång','osann uppgift eller förtiger sanningen','brottet är ringa'],
 obj:'Osann partsutsaga kräver att personen hörs under sanningsförsäkran i rättegång och där lämnar osann uppgift eller förtiger sanningen. Den ringa graden bedöms enligt paragrafens uttryckliga särskilda regel, inte genom att sanningsförsäkran kan utelämnas.',
 subj:'Uppsåt enligt 1:2 till att den partsanknutna utsagan är osann eller förtigande krävs. Vårdslös feluppgift av grov grad kan i stället aktualisera 15:3 och ansvarsfrihetsundantagen i 15:4 måste kontrolleras separat.'},
 '15:3':{anchor:['av grov oaktsamhet','gärning som i 1 eller 2 § sägs','ovarsam utsaga'],
 obj:'Ovarsam utsaga omfattar gärningar av samma slag som mened eller osann partsutsaga enligt 15:1–2: en felaktig eller förtigen uppgift under föreskriven ed eller sanningsförsäkran. Den relevanta processuella formen måste vara uppfylld.',
 subj:'Lagtexten kräver uttryckligen GROV OAKTSAMHET till den felaktiga uppgiften eller förtigandet. Vanlig oaktsamhet är inte tillräcklig; undantagen i 15:4 om betydelselös uppgift eller ursäkt vid vägransrätt ska prövas för sig.'},
 '15:4a':{anchor:['domstol i danmark, finland, island eller norge','enligt 1 §','enligt 2 §','grov oaktsamhet'],
 obj:'Osann eller ovarsam utsaga under straffansvar inför domstol i Danmark, Finland, Island eller Norge kan medföra ansvar när motsvarande svensk utsaga hade omfattats av laga ed eller sanningsförsäkran. Paragrafen hänvisar till 15:1–3 och gör 15:4, 14, 15 tillämpliga.',
 subj:'Osann utsaga kräver uppsåt enligt 15:1 eller 15:2, medan den särskilda ovarsamma nordiska varianten kräver uttryckligen GROV OAKTSAMHET. Domstolsland och hypotetisk svensk ed måste vara separat verifierade.'},
 '15:4b':{anchor:['ett vittne eller en sakkunnig under ed','europeiska unionens domstol','internationella brottmålsdomstolen','grov oaktsamhet','ska dock inte dömas ut'],
 obj:'Särskild osann eller ovarsam edsutsaga inför EU-domstolen, dess tribunal, EFTA-domstolen eller Internationella brottmålsdomstolen. Lagtexten gäller vittne eller sakkunnig och innehåller ett uttryckligt undantag: oaktsamhetsansvar gäller inte utsagor vid ICC.',
 subj:'Uppsåt enligt 15:1 krävs för den osanna internationella edsutsagan. Den ovarsamma varianten kräver GROV OAKTSAMHET, men får aldrig tillämpas på utsaga vid Internationella brottmålsdomstolen enligt undantaget i 15:4 b.'},
 '15:5':{anchor:['väcker någon åtal mot oskyldig','uppsåt att denne må bliva fälld','obefogat åtal'],
 obj:'Falskt åtal innebär att åtal väcks mot en oskyldig person. Grovhetsfaktorer kan vara allvarlig brottslighet eller missbruk av tjänsteställning. Obefogat åtal är ett separat alternativ: att väcka åtal utan sannolika skäl, inte identiskt med positivt vetande om oskuld.',
 subj:'Falskt åtal fordrar uttryckligt UPPÅT att en oskyldig ska fällas. Obefogat åtal straffbelägger åtal trots bristande sannolika skäl utan samma särskilda syfte. Utgångspunkterna måste skiljas åt, även vid ringa eller grov rubricering.'},
 '15:6':{anchor:['anger en oskyldig till åtal','uppsåt att han eller hon ska bli dömd','obefogad angivelse'],
 obj:'Falsk angivelse är att ange oskyldig person till åtal med särskilt syfte att denne döms. Lagen innehåller ringa och grov grad samt obefogad angivelse om gärningspersonen inte insett oskuld men haft skälig anledning att anta den.',
 subj:'Falsk angivelse kräver särskilt UPPÅT att den oskyldige ska fällas. Obefogad angivelse kan aktualiseras om gärningspersonen saknat faktisk insikt men haft skälig anledning att anta oskulden. Skuldformerna får inte sammanblandas.'},
 '15:7':{anchor:['hos åklagare, polismyndigheten eller annan myndighet','besvärande omständighet','vårdslös beskyllning'],
 obj:'Falsk beskyllning omfattar osann myndighetsuppgift om annans brott, påstående om besvärande omständighet eller förnekande av friande eller mildrande omständighet, när myndigheten ska ta upp anmälan. Lagen har ringa, grov och vårdslös variant.',
 subj:'Uppsåt till den osanna beskyllningen enligt huvudregel; den särskilda VÅRDSLÖSA varianten förutsätter att personen inte insett osanningen men haft skälig anledning att anta den. Detta är inte samma skuldform som grov oaktsamhet vid edsutsaga.'},
 '15:8':{anchor:['förvanskar eller undanröjer någon bevis','med uppsåt att oskyldig','åberopar någon med sådant uppsåt falskt bevis','brottet grovt'],
 obj:'Bevisförvanskning består av förvanskande eller undanröjande av bevis eller åberopande av falskt bevis. Det är ett särskilt brott mot en oskyldigs rättssäkerhet med ringa och grov variant, och måste skiljas från generell urkundsförfalskning.',
 subj:'Lagtexten kräver uttryckligt UPPÅT att en oskyldig ska fällas till ansvar. Bevisåtgärden ensam utan detta specifika syfte räcker inte för den angivna brottstypen; andra brott kan då behöva prövas.'},
 '15:9':{anchor:['utan att vara förfallen till ansvar','framkallat fara för att annan','efter att hava kommit till insikt','göra vad skäligen kan begäras'],
 obj:'Den som utan annat ansvar i kapitlet framkallat fara för att en annan ska dömas utan laglig grund eller lida avsevärt förfång och därefter insett faran men inte gjort vad som skäligen kan krävas kan göra sig skyldig till underlåtenhet att avvärja rättsfel.',
 subj:'Ett faktiskt INSİKTSREKVISIT gäller efter att gärningspersonen själv framkallat faran. Ansvarsprövningen kräver därefter uppsåtlig underlåtenhet att vidta skäligt avvärjande, inte bara abstrakt möjlighet att känna till en fara.'},
 '15:10':{anchor:['på annat sätt än muntligen lämnar osann uppgift','heder och samvete','fara i bevishänseende','vårdslös försäkran'],
 obj:'Osann försäkran innebär icke muntlig oriktig uppgift eller förtigande när författning fordrar heder och samvete eller jämförlig försäkran, samt fara i bevishänseende. Den särskilda vårdslösa försäkran gäller samma objektiva gärning men annan skuldform.',
 subj:'Osann försäkran kräver uppsåt enligt 1:2 till feluppgift/förtigande och relevanta förhållanden. VÅRDSLÖS försäkran förutsätter i stället uttryckligen GROV OAKTSAMHET. Brottsgradens höjning ändrar inte skuldformsregeln.'},
 '15:11':{anchor:['ett intyg eller en annan urkund','annat än egna angelägenheter','upprättar en urkund rörande rättshandling','brukande av osann urkund'],
 obj:'Osant intygande omfattar oriktig uppgift om identitet eller annans angelägenheter i intyg/urkund, eller skenurkund om rättshandling, med fara i bevishänseende. Brukande av osann urkund kräver att sådan urkund åberopas eller används med bevisfara.',
 subj:'Uppsåt krävs till osann intygandehandling och faktiska omständigheter för bevisfara, eller till åberopandet/användningen av sådan oriktig urkund. Detta är skilt från att utställarangivelsen är falsk enligt BrB 14 kap.'},
 '15:12':{anchor:['sanningslöst åberopar pass, betyg, identitetshandling','lämnar ut sådan urkund','fara i bevishänseende','missbruk av handling'],
 obj:'Missbruk av urkund kan ske genom sanningslöst åberopande av pass, betyg eller identitetshandling som giltig för fel person, eller utlämnande för sådan användning. Missbruk av handling gäller i stället sanningslöst utgivande av kopia som riktig. Fara i bevishänseende krävs för båda.',
 subj:'Uppsåt till sanningslöst åberopande, utlämnande för missbruk eller utgivande som korrekt kopia samt de relevanta bevisfaroförhållandena krävs. Ringa eller grov grad medför inte att farokravet bortfaller.'},
 '15:13':{anchor:['förnekar sin underskrift på en urkund','utställarangivelse','fara i bevishänseende'],
 obj:'Förnekande av underskrift gäller att osant förneka sin underskrift på urkund eller tillförlitligt likställd utställarangivelse, under förutsättning att förnekandet innebär fara i bevishänseende. En grov grad följer separat av andra stycket.',
 subj:'Uppsåt till det sanningslösa förnekandet och de faktiska förhållandena som orsakar bevisfara krävs enligt 1:2. Att en person saknar minne av att ha skrivit under en handling är inte automatiskt straffbart förnekande.'}
};
const titles=[
 ['Mened','15:1'],['Grov mened','15:1'],
 ['Osann partsutsaga','15:2'],['Ringa osann partsutsaga','15:2'],['Ovarsam utsaga','15:3'],
 ['Osann utsaga inför nordisk domstol','15:4a'],['Ovarsam utsaga inför nordisk domstol','15:4a'],
 ['Osann utsaga inför en internationell domstol','15:4b'],['Ovarsam utsaga inför en internationell domstol','15:4b'],
 ['Falskt åtal','15:5'],['Grovt falskt åtal','15:5'],['Obefogat åtal','15:5'],
 ['Falsk angivelse','15:6'],['Ringa falsk angivelse','15:6'],['Grov falsk angivelse','15:6'],['Obefogad angivelse','15:6'],
 ['Falsk beskyllning','15:7'],['Ringa falsk beskyllning','15:7'],['Grov falsk beskyllning','15:7'],['Vårdslös beskyllning','15:7'],
 ['Bevisförvanskning','15:8'],['Ringa bevisförvanskning','15:8'],['Grov bevisförvanskning','15:8'],
 ['Underlåtenhet att avvärja rättsfel','15:9'],
 ['Osann försäkran','15:10'],['Grov osann försäkran','15:10'],['Vårdslös försäkran','15:10'],
 ['Osant intygande','15:11'],['Grovt osant intygande','15:11'],['Brukande av osann urkund','15:11'],
 ['Missbruk av urkund','15:12'],['Grovt missbruk av urkund','15:12'],['Missbruk av handling','15:12'],
 ['Förnekande av underskrift','15:13'],['Grovt förnekande av underskrift','15:13']
];
const grade={grov:'Vid den GROVA gradens tillämpning krävs dessutom en samlad gradprövning enligt det angivna lagrummet; graden ersätter aldrig objektiva gärningsrekvisit eller särskild skuldform.',
 ringa:'Vid RINGA grad finns alltjämt samma grundrekvisit och samma lagstadgade skuldform. Ringa-beteckningen är en separat helhetsbedömning och avskaffar inte grundbrottets ansvarsbegränsningar.'};
const relevantNotes=(title,ref)=>{const base=clauses[ref],variant=/^Ringa /.test(title)?'ringa':/^(Grov |Grovt )/.test(title)?'grov':null;
 let obj=base.obj,subj=base.subj;
 if(variant){obj+=' '+grade[variant];subj+=' '+grade[variant];}
 if(title==='Ovarsam utsaga inför en internationell domstol')subj+=' Ansvar för oaktsam utsaga vid ICC är uttryckligen undantaget även om motsvarande uppsåtligt brott kan vara straffbart.';
 if(title==='Brukande av osann urkund')obj+=' Användandet är en särskild gärningsform, skild från framställning av den materiellt osanna intygsurkunden.';
 if(title==='Obefogad angivelse')subj+=' Personen behöver inte ha vetat att den angivne var oskyldig, men ska ha haft skälig anledning att anta det.';
 return {objective:obj,subjective:subj};
};
const source=(ref,spec)=>{const p=W['BrB:'+ref];return !!(p?.complete===true
 &&p.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&p.url===SRC&&/^2026-10-(17|18|19|20)$/.test(p.checked||'')
 &&p.text?.length>75&&spec.anchor.every(x=>n(p.text).includes(n(x))))};
const fault=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const report={planned:titles.length*2,completed:0,byKind:{objective:0,subjective:0},byOffence:[],held:[],
 date:'2026-10-20',sourceURL:SRC,fullOffenceLegalSignoffs:0,
 historicLawSignoffs:0,precedentApprovals:0,inchoateSignoffs:0,prosecutionApprovals:0,coercionApprovals:0};
for(const [title,ref] of titles){
 const c=D.crimes.find(x=>!x.stageType&&x.title===title),row={title,completed:[],held:[]};report.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+ref||c.legalAudit15?.checkpoints){report.held.push({title,reason:'missing-or-changed-offence-or-existing-audit'});continue;}
 const ok=source(ref,clauses[ref])&&fault&&c.lawMode==='full'
 &&c.lawCompletenessVerified===true&&c.lawCompletenessSourceURL===SRC
 &&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length);
 const notes=relevantNotes(title,ref),checks={};
 for(const [key,text] of Object.entries(notes)){
  if(ok&&text.length>=115){
   checks[key]={status:'APPROVED',checked:'2026-10-20',sourceURL:SRC,
    sourceReferences:['BrB '+ref,...(key==='subjective'?['BrB 1:2']:[])],
    currentStatutoryScope:'BrB15-current-offence-element-or-specific-fault-only',
    finding:text,appliesToHistoricalOffenceDate:false,
    caseSpecificCriminalLiabilityApproved:false,caseSpecificCustodyApproved:false,
    relevantCaseLawFullyReviewed:false,allExceptionsAndProsecutionRulesReviewed:false,
    inchoateAndCompetitionApproved:false};
   row.completed.push(key);report.completed++;report.byKind[key]++;
  }else{row.held.push(key);report.held.push({title,key,reason:'primary-statute-or-offence-footprint-mismatch'});}
 }
 if(row.completed.length)c.legalAudit15={schema:1,sourceAudit:'BrB15-2026-10-20',checkpoints:checks,
  fullLegalReviewApproved:false,historicalLawStillOpen:true,
  caseLawAndProofBoundariesStillOpen:true,exceptionsAndCompetitionStillOpen:true,
  stagesAndProsecutionStillOpen:true,policePowerStillOpen:true};
}
window.BK_BRB15_BASE_AUDIT15=report;
})();