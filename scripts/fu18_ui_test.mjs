import assert from 'node:assert/strict';
import { chromium } from 'playwright';
// 1.8: FU-ledning och åklagarkontakt i iPhone-vy, över hela katalogen och genom gränssnittet.
const url=process.env.BK_URL||'http://127.0.0.1:8765/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(url+'#sok',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.BK_BOOT17?.ready===true&&window.BK_FU18,null,{timeout:60000});
 // Hela katalogen: varje grundbrott klassas och varje svarskombination ger ett resultat inom fem frågor.
 const r=await page.evaluate(()=>{
  const F=window.BK_FU18,crimes=window.BK_APP17.crimes.filter(c=>!c.stageType&&(!c.stageStatus||c.stageStatus==='punishable'));
  const bad=[],counts={};let maxQ=0;
  const sig=r=>r.lead+'|'+r.when+'|'+r.whenText;
  const walk=(c,a,depth)=>{const r=F.assess(c,a);if(r.result){if(!r.result.when||!r.result.reasons.length)bad.push(c.title+': tomt resultat');return new Set([sig(r.result)]);}
   if(depth>12){bad.push(c.title+': fler än 12 frågor');return new Set();}maxQ=Math.max(maxQ,depth);
   const q=r.question.id;if(r.question.kind!=='yn')bad.push(c.title+': inte ja/nej');
   const y=walk(c,{...a,[q]:true},depth+1),n=walk(c,{...a,[q]:false},depth+1);
   if([...y].every(x=>n.has(x))&&[...n].every(x=>y.has(x)))bad.push(c.title+': onödig fråga '+q);
   return new Set([...y,...n]);};
  for(const c of crimes){const k=F.classify(c);if(!k){bad.push(c.title+': ingen klassning');continue;}counts[k.cls]=(counts[k.cls]||0)+1;walk(c,{},1);}
  return {n:crimes.length,bad,counts,maxQ};
 });
 assert.ok(r.n>=390,'Alla grundbrott: '+r.n);
 assert.deepEqual(r.bad,[]);
 assert.ok(r.counts.enkel>=70&&r.counts.villkor===10&&r.counts.ej>=290,JSON.stringify(r.counts));
 // Gränssnitt: Ringa stöld → Tvångsmedel → Starta → fyra svar → resultat.
 await page.fill('#crime-search','Ringa stöld');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Ringa stöld',{exact:true})}).first().click();
 await page.waitForSelector('#app #sec-fu18 .fu18-open');
 assert.equal(await page.locator('#app #sec-tvang .fu18-start').count(),0,'Inte inne i Tvångsmedel-menyn');
 const start=page.locator('#app #sec-fu18 .fu18-open');
 assert.equal((await start.innerText()).trim(),'FU-ledning och åklagarkontakt');
 await start.click();
 const q=()=>page.locator('#sheet-root .fu18-q').innerText();
 assert.equal(await q(),'Är någon gripen?');
 const answer=async(v,expect)=>{await page.click('#sheet-root [data-fu18="'+v+'"]');if(expect)assert.match(await q(),expect);};
 await answer('yes',/anställd inom polisen/);
 await answer('no',/psykiska status/);
 await answer('no',/tvångsmedel/);
 await page.click('#sheet-root [data-fu18="back"]');
 assert.match(await q(),/psykiska status/,'Bakåt visar föregående fråga');
 await answer('no',/tvångsmedel/);
 assert.match(await page.locator('#sheet-root .fu18').innerText(),/anhållande/,'Gripen: anhållande nämns i tvångsmedelsfrågan');
 await answer('no');
 assert.equal(await q(),'Gäller något av följande?');
 await page.locator('#sheet-root .fu18-item').first().locator('summary').click();
 assert.match(await page.locator('#sheet-root .fu18-item').first().innerText(),/ÅFS 2005:9 7 § 2/,'ⓘ visar förklaringen');
 await answer('no',/under 18/);
 await page.locator('#sheet-root .fu18-help summary').click();
 assert.match(await page.locator('#sheet-root .fu18-help').innerText(),/LUL 24 §/);
 await answer('no',/försvarare/);
 await answer('no');
 const result=await page.locator('#sheet-root .fu18-result').innerText();
 for(const s of ['Polisledd','Efter förhöret','Inför kontakten','ÅFS 8 § 4'])assert.ok(result.includes(s),'Resultatet saknar '+s);
 await page.click('#sheet-root [data-fu18="restart"]');
 assert.equal(await q(),'Är någon gripen?');
 // Grov misshandel, gripen: ett tryck till svaret.
 await page.click('#sheet-root .sheet-close');
 await page.locator('[data-action="back"]').first().click();
 await page.fill('#crime-search','Grov misshandel');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Grov misshandel',{exact:true})}).first().click();
 await page.waitForSelector('#app #sec-fu18 .fu18-open');await page.locator('#app #sec-fu18 .fu18-open').click();
 await page.click('#sheet-root [data-fu18="yes"]');await page.click('#sheet-root [data-fu18="no"]');
 const r2=await page.locator('#sheet-root .fu18-result').innerText();
 assert.ok(r2.includes('Åklagarledd')&&r2.includes('Före förhöret'),r2);
 // Förstadier visar inte verktyget.
 await page.click('#sheet-root .sheet-close');
 await page.locator('[data-action="back"]').first().click();
 await page.fill('#crime-search','Försök till stöld');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Försök till stöld',{exact:true})}).first().click();
await page.waitForSelector('#app #sec-tvang > summary');
 assert.equal(await page.locator('#app #sec-fu18').count(),0,'Förstadier ingår inte i 1.8');
 assert.deepEqual(errors,[]);
 console.log('PASS 1.8.2 FU-ledning i webbläsaren: '+r.n+' brott '+JSON.stringify(r.counts)+', högst '+r.maxQ+' frågor, ingen onödig fråga, gränssnittsflöde och förstadier');
}finally{await browser.close();}
