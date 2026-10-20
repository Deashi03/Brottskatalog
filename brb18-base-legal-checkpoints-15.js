/* BrB 18: current statutory offence-element/fault reviews only.
 * No legal certification of historic offence date, constitutional law, case
 * law, stages, prosecution, penalty application or custody.
 */
(()=>{'use strict';const D=window.BK_DATA,W=window.BK_STATUTES;if(!D?.crimes||!W)return;
const S='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const n=x=>String(x||'').normalize('NFC').toLocaleLowerCase('sv').replace(/\s+/g,' ').trim();
const specs=[
 {t:'Uppror',r:'18:1',needs:['med uppsåt att statsskicket','med vapenmakt','åtgärd eller beslut','handling som innebär fara','inte är högförräderi'],
  obj:'Uppror förutsätter en handling som innebär fara för att med våldsamma medel omstörta statsskicket eller framtvinga eller hindra beslut av konstitutionella organ. Brottet är subsidiärt till högförräderi och särskild mildare fara regleras uttryckligen.',
  sub:'Det krävs SÄRSKILT UPPÅT att med vapenmakt eller annars våldsamma medel omstörta statsskicket eller med sådana medel framtvinga eller hindra angivna organbeslut. Faran för just detta uppsåts förverkligande måste bedömas separat.'},
 {t:'Väpnat hot mot laglig ordning',r:'18:3',needs:['med uppsåt att brott skall förövas','allmän säkerhet eller medborgares frihet','samlar eller anför väpnat manskap','ammunition'],
  obj:'Väpnat hot mot laglig ordning omfattar att samla, anföra eller hålla väpnat manskap samlat eller förse manskapet med vapen, ammunition eller motsvarande utrustning eller utbildning, med anknytning till hot om brott mot allmän säkerhet eller medborgares frihet.',
  sub:'Utöver uppsåt till den konkreta militära organiserings- eller utrustningshandlingen krävs ett uttryckligt särskilt UPPÅT att brott ska förövas mot allmän säkerhet eller medborgares frihet. Vanlig föreningsverksamhet är inte samma gärning.'},
 {t:'Olovlig kårverksamhet',r:'18:4',needs:['bildar eller deltager i sammanslutning','maktmedel som militär trupp eller polisstyrka','utan vederbörligt tillstånd','understödjer den med penningar'],
  obj:'Olovlig kårverksamhet omfattar bildande, deltagande, hantering av vapen eller utrustning, upplåtelse av lokaler eller finansiering av organisation som är avsedd att eller lätt kan utvecklas till ett maktmedel som militär trupp eller polisstyrka och inte har behörigt offentligt tillstånd.',
  sub:'Uppsåt till den specifika organiserings- eller stödhandlingen och relevanta faktiska omständigheter krävs enligt 1:2. Att någon tillhör en vanlig förening utan det i lagen angivna militära eller polisiära maktmedelssyftet är otillräckligt.'},
 {t:'Brott mot medborgerlig frihet',r:'18:5',needs:['övar olaga tvång eller olaga hot','påverka den allmänna åsiktsbildningen','inom politisk organisation','föreningsfriheten i fara'],
  obj:'Brott mot medborgerlig frihet förutsätter olaga tvång eller olaga hot som faktiskt sätter yttrande-, församlings- eller föreningsfrihet i fara med inriktning på allmän åsiktsbildning eller handlingsfriheten inom vissa organisationer och yrkessammanslutningar.',
  sub:'Uppsåt till tvånget eller hotet och ett särskilt SYFTE att påverka åsiktsbildning eller inskränka den angivna organisatoriska handlingsfriheten krävs. Att framföra en politisk åsikt är inte i sig brott enligt 18:5.'},
 {t:'Svikande av försvarsplikt',r:'18:6',needs:['genom stympning eller annorledes','gör sig oduglig till tjänstgöring','föregiva sjukdom','annan vilseledande'],
  obj:'Svikande av försvarsplikt omfattar att genom självskada eller liknande göra sig oduglig för skyldig tjänstgöring i rikets försvar, eller att genom påstådd sjukdom eller annat vilseledande undandra sig den skyldigheten. Att riket är i krig påverkar paragrafens särskilda straffnivå.',
  sub:'Uppsåt till att genom självförvållad oduglighet eller vilseledande undandra sig en konkret laglig tjänstgöringsskyldighet krävs enligt 1:2. En verklig sjukdom utan sådan uppsåtlig undandragandegärning omfattas inte.'}
];
const valid=s=>{const v=W['BrB:'+s.r];return !!(v?.complete===true
 &&v.completeTextProvenance==='manual-crosscheck-current-SFS-paragraph-only'
 &&v.url===S&&/^2026-10-(17|18|19|20)$/.test(v.checked||'')
 &&v.text?.length>90&&s.needs.every(x=>n(v.text).includes(n(x))))};
const main=n(W['BrB:1:2']?.text).includes('endast då den begås uppsåtligen');
const result={planned:specs.length*2,completed:0,byKind:{objective:0,subjective:0},held:[],byOffence:[],
 sourceURL:S,checked:'2026-10-20',completeOffenceApprovals:0,historyApprovals:0,
 doctrineApprovals:0,prosecutionApprovals:0,coercionApprovals:0};
for(const spec of specs){
 const c=D.crimes.find(x=>!x.stageType&&x.title===spec.t),row={title:spec.t,done:[],held:[]};result.byOffence.push(row);
 if(!c||c.statute!=='BrB:'+spec.r||c.legalAudit15?.checkpoints){result.held.push({title:spec.t,reason:'absent/mismatched card or prior legal review'});continue;}
 const ready=valid(spec)&&main&&c.lawMode==='full'&&c.lawCompletenessVerified===true
 &&c.lawCompletenessSourceURL===S&&!!(c.rekvisit15?.groups?.length||c.rekvisit15?.routes?.length),done={};
 for(const [kind,body] of Object.entries({objective:spec.obj,subjective:spec.sub})){
  if(ready&&body.length>=120){done[kind]={status:'APPROVED',checked:'2026-10-20',sourceURL:S,sourceRefs:['BrB '+spec.r,...(kind==='subjective'?['BrB 1:2']:[])],
   finding:body,scope:'current-statutory-objective-or-specific-intent-only',
   offenceDateApproved:false,historicLawApproved:false,currentSupremeCourtDoctrineApproved:false,
   fullCriminalLiabilityApproved:false,chapter18SpecialChargeRulesApproved:false,
   inchoateStagesApproved:false,caseSpecificCoercionApproved:false};
   row.done.push(kind);result.completed++;result.byKind[kind]++;
  }else{row.held.push(kind);result.held.push({title:spec.t,kind,reason:'source or offence content precondition fails'});}
 }
 if(row.done.length)c.legalAudit15={schema:1,sourceAudit:'BrB18-2026-10-20',checkpoints:done,
  fullLegalReviewApproved:false,historyAndCaseLawPending:true,
  constitutionalAndCompetitionPending:true,stageProsecutionCoercionPending:true};
}
window.BK_BRB18_BASE_AUDIT15=result;
})();