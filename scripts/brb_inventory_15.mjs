// V1.5 systematic per-paragraph BrB inventory – detection queue, not legal certification.
// Covers all BrB 3–22 paragraphs in the offline official SFS import.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const sources=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
const ctx=vm.createContext({window:{},console:{warn:()=>{},log:()=>{},error:()=>{}}});
for(const i of [1,2,3])vm.runInContext(inline[i],ctx,{filename:'inline-'+i});
for(const src of sources)vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),ctx,{filename:src});
const statutes=ctx.window.BK_STATUTES||{};
const base=ctx.window.BK_DATA.crimes.filter(c=>!c.stageType);
const paragraphs=[];
const nonOffenceReviewed=new Map([
 ['BrB:11:7','Ansvarsutvidgning till person i gäldenärs ställe och medverkansregel; ingen separat brottsrubricering.'],
 ['BrB:22:7','Särskild kriminalisering av försök, förberedelse och stämpling; inte ett eget fullbordat huvudbrott.']
]);
const nonCurrentReviewed=new Map([
 ['BrB:22:6c','Olovlig kärnsprängning har uppskjutet ikraftträdande till dag regeringen bestämmer; inget säkert fastställt ikraftträdande. Granska innan aktiv brottspost.']
]);
const malformedSourceReviewed=new Map([
 ['BrB:4:24','Importerad felaktig paragrafnyckel: 24 § lagen om kontaktförbud förekommer som hänvisning inne i BrB 4 kap. och är INTE BrB 4 kap. 24 §.']
]);
const sanitize=s=>String(s||'').replace(/\/\/.*?$/gm,' ').replace(/\s+/g,' ').trim();
for(const [key,data] of Object.entries(statutes)){
 const match=key.match(/^BrB:(\d+):(\d+[a-z]?)$/i);if(!match)continue;
 const ch=Number(match[1]);if(ch<3||ch>22)continue;
 const provision=sanitize(data.text);
 const exists=base.filter(c=>String(c.statute||'')===key || String(c.shortRef||'').match(new RegExp('^BrB '+ch+':'+match[2]+'(?![0-9a-z])','i')));
 const hasPenaltyWords=/(?:döms|dömes|straffas|skall dömas|ska dömas)[\s\S]{0,220}?(?:för\s+[a-zåäö]|till\s+böter|till\s+fängelse)/i.test(provision);
 const isCrossReferenceOnly=/^(?:\d+[a-z]?\s*§\s*)?(?:För\s+(?:försök|förberedelse|stämpling)|Det\s+som\s+föreskrivs)/i.test(provision)&&!exists.length;
 const excluded=nonOffenceReviewed.get(key)||nonCurrentReviewed.get(key)||malformedSourceReviewed.get(key);
 const suspectedUncovered=hasPenaltyWords&&!exists.length&&!isCrossReferenceOnly&&!excluded;
 paragraphs.push({ref:key,source:data.url||null,crimeTitles:exists.map(c=>c.title),
  penaltyLanguageDetected:hasPenaltyWords,scope:data.complete?'complete':'machine-or-excerpt',
  status:malformedSourceReviewed.has(key)?'invalid-import-key':nonCurrentReviewed.has(key)?'non-current-law-deferred':nonOffenceReviewed.has(key)?'reviewed-non-offence':
   suspectedUncovered?'manual-inventory-needed':exists.length?'at-least-one-linked-post':'no-linked-post',
  excludedReason:excluded||undefined,
  excerpt: suspectedUncovered?provision.slice(0,280):undefined
 });
}
paragraphs.sort((a,b)=>a.ref.localeCompare(b.ref,'sv',{numeric:true}));
const missing=paragraphs.filter(p=>p.status==='manual-inventory-needed');
const report={
 generatedAt:new Date().toISOString(),purpose:'V1.5 coverage triage; NOT proof of statutory completeness',
 notes:[
 'Paragrafvis maskinell indikation. Separata grader, senare stycken, straffskärpningar och renodlade bötesbrott kan behöva manuella poster även vid status at-least-one-linked-post.',
 'Ingen misstänkt lucka får autoimporteras som rättsligt kontrollerad brottsrubricering.',
 'Kontrollera källans gällande lydelse per gärningsdatum samt samtliga aktiva gärningsalternativ och konkurrens-/åtalsregler.'
 ],
 scannedParagraphs:paragraphs.length,validParagraphKeys:paragraphs.filter(p=>p.status!=='invalid-import-key').length,
 nonOffenceOrInactive:paragraphs.filter(p=>['invalid-import-key','non-current-law-deferred','reviewed-non-offence'].includes(p.status)),
 baseCrimes:base.length,possibleUncoveredParagraphs:missing.length,
 missingReviewQueue:missing,paragraphs
};
fs.mkdirSync(path.join(root,'audit'),{recursive:true});
fs.writeFileSync(path.join(root,'audit/brb-inventory-15.json'),JSON.stringify(report,null,2)+'\n');
console.log('V1.5 BRB COVERAGE '+JSON.stringify({scannedParagraphs:report.scannedParagraphs,baseCrimes:report.baseCrimes,possibleUncoveredParagraphs:report.possibleUncoveredParagraphs,candidates:missing.slice(0,80).map(x=>x.ref)}));
if(paragraphs.length<200)throw Error('Too few scanned BrB paragraphs; official import incomplete');
for(const key of ['BrB:4:24','BrB:11:7','BrB:22:7','BrB:22:6c'])if(!paragraphs.find(p=>p.ref===key&&p.status!=='manual-inventory-needed'))throw Error('Manual legal exclusion not applied '+key);
for(const name of ['Märkesförfalskning','Förvanskning av urkund','Brukande av det förfalskade','Trolöshet mot huvudman'])if(!base.some(c=>c.title===name))throw Error('Core Brottsbalken rubricering missing: '+name);
