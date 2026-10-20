/* Current statutory teaching notes, not a complete exceptions/competition audit.
 * SmuglL 12, 15 and 20 individually read at Riksdagen 2026-10-20.
 */
(()=>{'use strict';const D=window.BK_DATA,doc=window.BK_SPECIAL_EXCERPTS?.SmuglL;
if(!D?.crimes||!doc)return;
const sourceURL='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20001225-om-straff-for-smuggling_sfs-2000-1225/';
const pins={"12":"12 § Den som uppsåtligen emballerar, transporterar, förvarar, döljer, bearbetar, förvärvar, överlåter eller ingår avtal om upplåtelse av panträtt i en vara som varit föremål för brott enligt 3-11 §§, döms för olovlig befattning med smuggelgods till böter eller fängelse i högst två år. Gärningen ska inte medföra ansvar, om den är ringa med hänsyn till befattningen, omständigheterna kring denna, egendomens beskaffenhet och värde samt övriga omständigheter. Om gärningsmannen inte inser men har skälig anledning att anta att varan varit föremål för brott, döms till böter. Om gärningen är ringa, ska den inte medföra ansvar. Ansvar enligt första eller andra stycket ska inte dömas ut, om gärningen är belagd med straff i - 1 § första stycket 1, 3 eller 4 narkotikastrafflagen (1968:64) eller i 2 eller 3 a § narkotikastrafflagen jämförd med dessa bestämmelser, - 18 kap. 1 eller 2 § vapenlagen (2026:408), eller - 29 § andra stycket 2 eller 29 a § lagen (2010:1011) om brandfarliga och explosiva varor. Lag (2026:417) .","15":"15 § Den som frivilligt undanröjer sådan fara som avses i 3 § andra stycket eller 6, 6 a eller 6 b § tillsammans med den bestämmelsen eller i 7 §, döms inte till ansvar enligt den bestämmelsen. Den som frivilligt vidtar en åtgärd som leder till att tull, annan skatt eller avgift som avses i 8-11 §§ kan påföras, tillgodoräknas eller återbetalas med rätt belopp, döms inte till ansvar enligt 8-13 §§. Lag (2020:901) .","20":"20 § Kan brott som avses i 1. 3 eller 4 § eller försök till sådant brott eller 7 § föranleda att en sådan avgift som avses i 3 § lagen (1975:85) med bemyndigande att meddela föreskrifter om in- eller utförsel av varor påförs, eller 2. 8 eller 9 § eller försök till sådant brott eller 11 § föranleda att tulltillägg enligt 5 kap. 5-10 §§ tullagen (2016:253) påförs får åtal för brottet väckas endast om det är påkallat av särskilda skäl. Vad som sägs i första stycket gäller även talan om förverkande på grund av brott enligt denna lag. Lag (2024:842) ."};
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const clean=(s,k)=>norm(s).replace(k==='15'?/ Särskilda bestämmelser om förverkande$/:/$^/,'');
const sourceOK=doc.observedVersion==='2026:1321'&&doc.sourceURL==='https://data.riksdagen.se/dokument/sfs-2000-1225.html'
 &&Object.entries(pins).every(([k,v])=>clean(doc.sections?.[k]?.text,k)===v);
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')&&!Number.isNaN(Date.parse(s))&&s<=new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Stockholm'});
const report={planned:23,explained:0,held:[],checked:'2026-10-20',sourceURL,
 scope:'current-statutory-rectification-and-prosecution-explanations-only',
 completeExceptionAudits:0,completeProsecutionAudits:0,fullLegalApprovals:0};
const rows=[];
const add=(titles,rectification,prosecution,extra='')=>{
 for(const title of titles.split('|'))rows.push({title,rectification,prosecution,extra});
};
const danger='15 § första meningen gäller frivilligt undanröjande av den föreskrivna faran. Vid uppsåtlig smuggling pekar bestämmelsen på uppgiftsfallen i 3 § andra stycket och på 6, 6 a eller 6 b § tillsammans med det stycket. En senare anmälan befriar därför inte generellt från ansvar för varje införsel-, utförsel- eller förfogandegärning. Kontrollera gärningsalternativ, farans undanröjande och frivilligheten var för sig.';
const tax='15 § andra meningen gäller en frivillig åtgärd som leder till att rätt tull, annan skatt eller avgift enligt 8–11 §§ kan påföras, tillgodoräknas eller återbetalas. Det är inte tillräckligt att bara kalla en ny uppgift för rättelse. Bestämmelsen anger ansvarsfrihet enligt 8–13 §§; den är skild från åtalsbegränsningen i 20 §.';
const fee='20 § första stycket 1 kräver särskilda skäl för åtal när just en gärning enligt 3 eller 4 §, försök till sådant brott eller 7 § kan föranleda den angivna in- eller utförselavgiften enligt lagen (1975:85). Kravet gäller inte automatiskt alla smugglingsrubriceringar eller bara därför att någon avgift förekommer. Andra stycket omfattar även talan om förverkande i de angivna fallen.';
const surcharge='20 § första stycket 2 kräver särskilda skäl för åtal när just en gärning enligt 8 eller 9 §, försök till sådant brott eller 11 § kan föranleda tulltillägg enligt 5 kap. 5–10 §§ tullagen. En faktisk eller möjlig avgift är inte utan vidare ett sådant tulltillägg. Andra stycket omfattar även talan om förverkande i de angivna fallen.';
const notListed='Denna rubricering finns inte i uppräkningen i 20 § första stycket. Bestämmelsens krav på särskilda skäl får inte utsträckas enbart därför att brottet regleras i smugglingslagen. Det är en kontroll av just 20 §, inte ett besked att alla andra processhinder, åtals- eller förverkandefrågor är avgjorda.';
add('Smuggling|Ringa smuggling',danger,fee);
add('Grov smuggling',danger,notListed,'Grov smuggling regleras i 5 §. Skilj den hänvisningen från de uttryckliga hänvisningarna till 3 och 4 §§ i 20 §.');
add('Narkotikasmuggling|Narkotikasmuggling – avsedd att säljas|Ringa narkotikasmuggling|Grov narkotikasmuggling|Synnerligen grov narkotikasmuggling',danger,notListed,'6 § tillsammans med 3 § andra stycket anges i 15 §. Detta är inte ett allmänt undantag för narkotikainnehav eller andra brott enligt narkotikastrafflagen.');
add('Vapensmuggling|Ringa vapensmuggling|Grov vapensmuggling|Synnerligen grov vapensmuggling',danger,notListed,'6 a § tillsammans med 3 § andra stycket anges i 15 §. Eventuellt separat vapenbrott måste bedömas för sig; rättelse av tulluppgiften avgör inte det ansvaret.');
add('Smuggling av explosiv vara|Ringa smuggling av explosiv vara|Grov smuggling av explosiv vara|Synnerligen grov smuggling av explosiv vara',danger,notListed,'6 b § tillsammans med 3 § andra stycket anges i 15 §. Frågor om separat tillståndsbrott för explosiva varor omfattas inte automatiskt av denna regel.');
add('Olovlig införsel eller utförsel','15 § första meningen hänvisar också till faran i 7 §. Frivilligheten och det faktiska undanröjandet av den relevanta faran måste prövas. Dessutom anger 7 § själv att ringa gärning inte medför ansvar; detta är ett annat undantag än frivillig rättelse.',fee);
add('Tullbrott|Ringa tullbrott',tax,surcharge);
add('Grovt tullbrott',tax,notListed,'10 § omfattas av rättelseregelns hänvisning till 8–13 §§ men nämns inte i åtalsbegränsningens uppräkning. Reglernas räckvidd får inte likställas.');
add('Vårdslös tullredovisning',tax,surcharge,'11 § undantar ringa gärning från ansvar. Pröva det separat från frivillig rättelse enligt 15 § och särskilda skäl för åtal enligt 20 §.');
add('Olovlig befattning med smuggelgods',tax,notListed,'12 § undantar ringa gärning och är uttryckligen subsidiär till de angivna narkotika-, vapen- och explosivvarubrotten. Skilj första styckets uppsåt från andra styckets skäliga anledning att anta ursprunget. Hänvisningen till 8–13 §§ i 15 § gör inte varje slags ånger till ansvarsfri rättelse.');
add('Grov olovlig befattning med smuggelgods',tax,notListed,'13 § hänvisar till 12 § första stycket. Kontrollera grundgärningens subsidiaritet i 12 § samt grovhetsgraden separat. Rättelse enligt 15 § och åtalsbegränsningen i 20 § har olika uppräkningar.');
for(const row of rows){
 const c=D.crimes.find(c=>!c.stageType&&c.title===row.title);
 if(!sourceOK||!c||c.lawCompletenessVerified!==true||!validDate(c.lawCompletenessChecked)||c.lawCompletenessSourceURL!==sourceURL){report.held.push(row.title);continue;}
 c.smugglingLimits15={checked:report.checked,sourceURL,sourceRefs:['SmuglL 12 §','SmuglL 15 §','SmuglL 20 §'],
  scope:report.scope,fullLegalReviewApproved:false,
  notes:[{title:'Frivillig rättelse – avgränsning',text:row.rectification},
   {title:'Särskilda åtalsvillkor – avgränsning',text:row.prosecution},
   ...(row.extra?[{title:'Skilj reglernas räckvidd åt',text:row.extra}]:[])]};
 report.explained++;
}
window.BK_SMUGGLING_LIMITS15=report;
})();
