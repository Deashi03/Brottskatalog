import assert from 'node:assert/strict';
import { chromium } from 'playwright';
// Kör över hela den laddade katalogen (alla grund- och förstadiekort) i en iPhone-vy.
const url=process.env.BK_URL||'http://127.0.0.1:8765/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(url+'#sok',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.BK_BOOT17?.ready===true&&window.BK_SCREEN17&&window.BK_CATALOG_SELECTION15,null,{timeout:60000});
 const r=await page.evaluate(()=>{
  const D=window.BK_DATA,S=window.BK_SCREEN17,R=window.BK_COERCIVE;
  const crimes=D.crimes.filter(window.BK_CATALOG_SELECTION15.included).concat(window.BK_TRAFFIC16?.entries||[]);
  const byId=Object.fromEntries(crimes.map(c=>[c.id,c]));
  const out={total:crimes.length,stageNo:[],presNoOrd:[],unknownNo:[],anyUnknown:[],textConflict:[],ambiguous:[],privileged:[],counts:{}};
  const noLimit=R.entries.filter(e=>e.scale==='any'&&e.id!=='hemlig'&&e.id!=='hemligo');
  for(const c of crimes){
   const x=S.custody(c),lab=S.label(c);out.counts[lab]=(out.counts[lab]||0)+1;
   if(x.presumption===true&&x.ordinary!==true)out.presNoOrd.push(c.title);
   if(x.ordinary===null&&lab==='Endast särskild grund (RB 24:2)')out.unknownNo.push(c.title);
   if(c.stageType&&c.stageStatus==='punishable'&&x.onlyVia24_2){
    const p=byId[c.stageParentId],pm=Number(p?.penaltyRange?.max);
    const reaches=c.stageType==='forsok'?(pm>=1||p?.penaltyRange?.life):(pm>1||p?.penaltyRange?.life);
    if(reaches)out.stageNo.push(c.title);
   }
   if((!c.stageStatus||c.stageStatus==='punishable')&&!c.applicabilityConditional)
    for(const e of noLimit)if(R.score(c,e).tone==='unknown')out.anyUnknown.push(c.title+' · '+e.id);
   if(c.stageType&&c.stageStatus==='punishable'&&c.penalty){
    if(/lägre än .* och högst/.test(c.penalty))out.ambiguous.push(c.title);
    if(/^böter/i.test(c.penalty)&&c.penaltyRange&&c.penaltyRange.fines===false)out.textConflict.push(c.title);
   }
   if(['Våldtäkt','Människorov','Människohandel','Mordbrand','Allmänfarlig ödeläggelse'].includes(c.title))out.privileged.push([c.title,lab]);
  }
  const named=t=>crimes.find(c=>c.title===t);
  out.samples=Object.fromEntries(['Försök till stöld','Försök till våldtäkt','Försök till grov misshandel','Förberedelse till rån','Försök till mord','Ringa stöld','Rån']
   .map(t=>[t,S.label(named(t))]));
  return out;
 });
 assert.ok(r.total>=1550,'Hela katalogen laddad: '+r.total);
 assert.deepEqual(r.stageNo,[],'Förstadier vars fullbordade brott når ettårsgränsen får inte visas som endast RB 24:2');
 assert.deepEqual(r.presNoOrd,[],'Presumtion kräver att huvudregeln är uppfylld');
 assert.deepEqual(r.unknownNo,[],'Ej verifierat får aldrig visas som endast RB 24:2');
 assert.deepEqual(r.anyUnknown,[],'Åtgärder utan straffskalegräns får inte bli ej verifierade');
 assert.deepEqual(r.ambiguous,[],'Otydlig formulering "lägre än … och högst …"');
 assert.deepEqual(r.textConflict,[],'Straffskaletext anger böter som skalan utesluter');
 for(const [t,l] of r.privileged)assert.equal(l,'Häktningspresumtion – ej vid mindre grovt fall',t);
 assert.equal(r.samples['Försök till stöld'],'Häktning kan vara möjlig');
 assert.equal(r.samples['Försök till våldtäkt'],'Häktning kan vara möjlig');
 assert.equal(r.samples['Försök till grov misshandel'],'Häktning kan vara möjlig');
 assert.equal(r.samples['Förberedelse till rån'],'Häktning kan vara möjlig');
 assert.equal(r.samples['Försök till mord'],'Häktningspresumtion – pröva skäl');
 assert.equal(r.samples['Ringa stöld'],'Endast särskild grund (RB 24:2)');
 assert.equal(r.samples['Rån'],'Häktningspresumtion – pröva skäl');

 // Gränssnitt: försök till stöld visar grön huvudregel, grå/grön/röd enligt tre lägen, och gripandekort.
 const search=page.locator('#crime-search');
 await search.fill('Försök till stöld');await page.waitForTimeout(400);
 await page.locator('.crime-card').filter({has:page.getByText('Försök till stöld',{exact:true})}).first().click();
 await page.waitForTimeout(400);
 assert.match(await page.locator('button.status-row[data-action="custody"]').innerText(),/Häktning kan vara möjlig/);
 await page.locator('button.status-row[data-action="custody"]').click();await page.waitForTimeout(300);
 const sheet=await page.locator('#sheet-root').innerText();
 for(const s of ['RB 24:1','RB 24:6','Envarsgripande','Fullbordat brotts max ≥ 1 år'])assert.ok(sheet.includes(s),'Häktningsvyn saknar '+s);
 assert.equal(await page.locator('#sheet-root .custody-mark.yes').count()>=4,true);
 assert.deepEqual(errors,[]);
 // Snabbstart: med kraftigt strypt processor ska sökvyn synas och gå att söka i innan appen är klar,
 // och ett tryck under laddningen ska öppna rätt brott när appen blivit klar.
 const ctx2=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const quick=await ctx2.newPage();const cdp=await ctx2.newCDPSession(quick);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:8});
 const t0=Date.now();await quick.goto(url+'#sok',{waitUntil:'commit'});
 await quick.waitForSelector('.crime-card',{timeout:20000});
 const visibleMs=Date.now()-t0;
 assert.equal(await quick.evaluate(()=>window.BK_BOOT17?.ready===true),false,'Startvyn ska synas innan appen är klar');
 await quick.waitForFunction(()=>window.BK_SEARCH_INDEX17,null,{timeout:30000});
 await quick.fill('#crime-search','grovt rån');
 await quick.waitForFunction(()=>document.querySelector('#results-area .crime-title')?.textContent==='Grovt rån',null,{timeout:10000});
 await quick.locator('.crime-card[data-open]').first().click();
 await quick.waitForFunction(()=>window.BK_BOOT17?.ready===true,null,{timeout:120000});
 await quick.waitForSelector('.detail-title',{timeout:20000});
 assert.equal((await quick.locator('.detail-title').innerText()).trim(),'Grovt rån');
 await ctx2.close();
 console.log('PASS 1.7 snabbstart: sökvy synlig efter '+visibleMs+' ms vid 8× strypning; sök och tryck under laddning fungerar');
 console.log('PASS 1.7 katalog: '+r.total+' kort · '+JSON.stringify(r.counts));
}finally{await browser.close();}
