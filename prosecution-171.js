/* Brottskatalog 1.7.1 – åtalsregler för polis på plats.
 * Grönt = allmänt åtal. Gult = angivelseregel eller enskilt åtal.
 * Varje regel: kort besked vid tryck, fördjupning (när/hur/säger nej) och länk till lagrummet.
 * Texterna bygger på BrB 3:12, 4:11, 5:5, 8:13, 9:12, 10:10, 12:6, 20:5 m.fl. i lydelse
 * kontrollerad mot data.riksdagen.se 2026-10-26. Inget åtalsbeslut fattas av appen.
 */
(()=>{'use strict';
const HOW='Fråga: ”Vill du att brottet ska åtalas?” Ja = angivelse. Muntligt räcker – skriv in det i anmälan.';
const NO='Ta ändå upp anmälan. Åklagaren kan åtala om det finns allmänt intresse.';
const CLOSE='Sambo, make/maka, förälder, barn, syskon, svåger/svägerska eller liknande närstående.';
const WANT={label:'Om målsäganden inte vill medverka',text:'Brottet utreds ändå. Åklagaren beslutar om åtal oavsett vad målsäganden vill.'};
const green=(law,extra)=>({tone:'green',status:'Allmänt åtal',short:'Ingen angivelse krävs.',
 more:extra?[WANT,{label:'Bra att veta',text:extra}]:[WANT],law});
const relative=(law,extra)=>({tone:'yellow',status:'Allmänt åtal – angivelseregel vid närstående',
 short:'Brottet hör under allmänt åtal. Är gärningsmannen närstående till målsäganden gäller en särskild angivelseregel: fråga om angivelse.',
 more:[{label:'Närstående',text:CLOSE},{label:'Hur',text:HOW},{label:'Säger nej',text:NO}].concat(extra?[{label:'Också',text:extra}]:[]),law});
const RULES={
 relative8:relative('BrB:8:13'),
 relative9:relative('BrB:9:12'),
 relative10:relative('BrB:10:10'),
 rentalGross:relative('BrB:10:10'),
 grossBribery:relative('BrB:10:10'),
 fraud:relative('BrB:9:12','Uttag på eget konto i strid med avtal och vissa ringa bedrägerier: åklagaren avgör utan angivelse.'),
 rental:relative('BrB:10:10','Hyrd eller avbetalningsköpt egendom: åklagaren avgör utan angivelse.'),
 ch4normal:{tone:'yellow',status:'Fråga om angivelse',short:'Fråga målsäganden om hen vill att brottet åtalas.',
  more:[{label:'När',text:'Alltid vid detta brott.'},{label:'Hur',text:HOW},{label:'Säger nej',text:NO}],law:'BrB:4:11',grossNote:true},
 ch4place:{tone:'yellow',status:'Allmänt åtal – angivelseregel utanför allmän plats',short:'Brottet hör under allmänt åtal. Skedde det utanför allmän plats: fråga om angivelse.',
  more:[{label:'Utanför allmän plats',text:'Till exempel i en bostad eller via telefon eller sms.'},{label:'Hur',text:HOW},{label:'Säger nej',text:NO}],law:'BrB:4:11'},
 coercion:{tone:'yellow',status:'Allmänt åtal – angivelseregel vid vissa hot',short:'Brottet hör under allmänt åtal. Vid hot om att åtala, anmäla eller lämna menlig uppgift om någon: fråga om angivelse.',
  more:[{label:'Hur',text:HOW},{label:'Säger nej',text:NO}],law:'BrB:4:11'},
 coercionGross:{tone:'yellow',status:'Allmänt åtal – angivelseregel vid vissa hot',short:'Brottet hör under allmänt åtal. Vid hot om att åtala, anmäla eller lämna menlig uppgift om någon: fråga om angivelse.',
  more:[{label:'Hur',text:HOW},{label:'Säger nej',text:NO},{label:'Obs',text:'Om regeln gäller den grova graden är inte slutligt klarlagt. Fråga hellre en gång för mycket.'}],law:'BrB:4:11'},
 technical:{tone:'yellow',status:'Allmänt åtal – angivelseregel i vissa fall',short:'Brottet hör under allmänt åtal. Gäller förberedelsen kränkande fotografering eller avlyssning utanför allmän plats: fråga om angivelse.',
  more:[{label:'Hur',text:HOW},{label:'Säger nej',text:NO}],law:'BrB:4:11'},
 body:{tone:'yellow',status:'Angivelse krävs',short:'Åtal kräver angivelse från målsäganden. Fråga om angivelse.',
  more:[{label:'Undantag',text:'Är målsäganden under 18 år kan åklagaren åtala utan angivelse.'},{label:'Hur',text:HOW},
   {label:'Säger nej',text:'Då kan åtal bara väckas om målsäganden är under 18 år. Dokumentera svaret.'}],law:'BrB:3:12'},
 secrecy:{tone:'yellow',status:'Allmänt åtal – angivelseregel vid skydd för enskild',short:'Brottet hör under allmänt åtal. Skyddar tystnadsplikten en enskild person: fråga om angivelse.',
  more:[{label:'Hur',text:HOW},{label:'Säger nej',text:NO}],law:'BrB:20:5'},
 defamation:{tone:'yellow',status:'Enskilt åtal',short:'Målsäganden kan själv väcka åtal vid tingsrätten – eller ange brottet så att åklagaren kan åtala.',
  more:[{label:'När kan åklagaren åtala',text:'När målsäganden har angett brottet, eller är under 18 år, och det finns allmänt intresse.'},{label:'Hur',text:HOW}],law:'BrB:5:5'},
 insult:{tone:'yellow',status:'Enskilt åtal',short:'Målsäganden väcker själv åtal vid tingsrätten. Polisen utreder bara vid undantagen under Mer.',
  more:[{label:'Undantag – åklagaren kan åtala',text:'Förolämpningen gällde någons myndighetsutövning eller anspelade på ras, hudfärg, ursprung, tro, sexuell läggning eller könsidentitet.'},
   {label:'Hur',text:'Vid undantag: '+HOW+' Är målsäganden under 18 år kan åklagaren åtala utan angivelse.'},
   {label:'Polis i tjänst',text:'Välj Förolämpning mot tjänsteman – allmänt åtal.'}],law:'BrB:5:5'},
 excluded8:green('BrB:8:13','Allmänt åtal gäller också när gärningsmannen är närstående.'),
 excluded9:green('BrB:9:12','Allmänt åtal gäller också när gärningsmannen är närstående.'),
 excluded10:green('BrB:10:10','Allmänt åtal gäller också när gärningsmannen är närstående.'),
 homeGross:green('BrB:4:11','Angivelseregeln gäller bara brottet av normalgrad.'),
 bribery:green('BrB:10:10','Åklagaren prövar särskilt om åtal behövs (inte vid offentlig tjänst).'),
 familyChild:green('BrB:7:6','Åklagaren prövar särskilt om åtal behövs.'),
 creditor:green('BrB:11:8','Åklagaren prövar särskilt om åtal behövs.'),
 bookkeepingMinor:green('BrB:11:8','Åklagaren prövar särskilt om åtal behövs.'),
 government:green('BrB:19:16','Åtal kräver regeringens tillstånd. Utred som vanligt.'),
 VapenL:green('Vapen:18:14','Lämnas vapnet in frivilligt till polisen prövar åklagaren särskilt om åtal behövs.'),
 minorDamage:green('BrB:12:6','Drabbar brottet bara en enskild persons egendom prövar åklagaren särskilt om åtal behövs.'),
 taxThreshold:green('SkBrL:13','Särskilda åtalsvillkor kan gälla vid låga belopp eller skattetillägg – åklagaren prövar.'),
 taxMinor:green('SkBrL:13','Särskilda åtalsvillkor kan gälla vid låga belopp eller skattetillägg – åklagaren prövar.'),
 taxOther:green('SkBrL:13b','Särskilda åtalsvillkor kan gälla vid skattetillägg – åklagaren prövar.'),
 benefit:green('BidrBrL:6a','Särskilda åtalsvillkor kan gälla vid sanktionsavgift – åklagaren prövar.'),
 smuggleFee:green('SmuglL:20','Särskilda åtalsvillkor kan gälla vid avgift eller tulltillägg – åklagaren prövar.'),
 smuggleSurcharge:green('SmuglL:20','Särskilda åtalsvillkor kan gälla vid avgift eller tulltillägg – åklagaren prövar.'),
 plain:green('RB:20:3')
};
const NAMES={Vapen:'VapenL',SkBrL:'Skattebrottslagen',BidrBrL:'Bidragsbrottslagen',SmuglL:'Smugglingslagen'};
const label=k=>{const p=String(k||'').split(':');const n=NAMES[p[0]]||p[0];
 if(p.length===3)return n+' '+p[1]+':'+p[2].replace(/([0-9])([a-z])$/,'$1 $2');
 if(p.length===2)return n+' '+p[1].replace(/([0-9])([a-z])$/,'$1 $2')+' §';return n;};
function ruleKey(c,byId){
 const own=c.prosecutionStatutoryReview15?.rule;
 if(c.stageType){
  if(c.prosecution!=='conditional')return 'plain';
  const p=byId?.(c.stageParentId);
  return p?ruleKey(p,byId):'plain';
 }
 if(c.title==='Grovt olaga tvång')return 'coercionGross';
 if(own&&RULES[own])return own;
 if(c.prosecution==='conditional'&&/12:6|enskild rätt/i.test((c.prosecutionRule||'')+' '+(c.prosecutionLabel||'')))return 'minorDamage';
 if(c.prosecution==='conditional')return null;
 return 'plain';
}
function view(c,byId,allTitles){
 const key=ruleKey(c,byId);
 const r=RULES[key];
 if(!r)return {key:null,tone:'yellow',status:'Särskilda åtalsvillkor',short:c.prosecutionLabel||'Kontrollera åtalsregeln i lagtexten.',more:[],law:null,lawLabel:''};
 let more=r.more;
 if(r.grossNote&&allTitles&&allTitles.has(('grovt '+c.title).toLocaleLowerCase('sv')))
  more=more.map(m=>m.label==='När'?{label:'När',text:'Alltid vid detta brott. Den grova graden hör under allmänt åtal.'}:m);
 return {key,tone:r.tone,status:r.status,short:r.short,more,law:r.law,lawLabel:label(r.law)};
}
window.BK_PROSECUTION171={view,ruleKey,rules:RULES,lawLabel:label,checked:'2026-11-02'};
})();
