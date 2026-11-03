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
  const walk=(c,a,depth)=>{const r=F.assess(c,a);if(r.result){if(!r.result.when||!r.result.reasons.length)bad.push(c.title+': tomt resultat');return;}
   if(depth>5){bad.push(c.title+': fler än 5 frågor');return;}maxQ=Math.max(maxQ,depth);
   const q=r.question;const vals=q.kind==='multi'?[[],[q.options[0].id]]:[true,false];for(const v of vals)walk(c,{...a,[q.id]:v},depth+1);};
  for(const c of crimes){const k=F.classify(c);if(!k){bad.push(c.title+': ingen klassning');continue;}counts[k.cls]=(counts[k.cls]||0)+1;walk(c,{},1);}
  return {n:crimes.length,bad,counts,maxQ};
 });
 assert.ok(r.n>=390,'Alla grundbrott: '+r.n);
 assert.deepEqual(r.bad,[]);
 assert.ok(r.counts.enkel>=70&&r.counts.villkor===10&&r.counts.ej>=290,JSON.stringify(r.counts));
 // Gränssnitt: Ringa stöld → Tvångsmedel → Starta → fyra svar → resultat.
 await page.fill('#crime-search','Ringa stöld');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Ringa stöld',{exact:true})}).first().click();
 await page.waitForSelector('#app #sec-tvang > summary');await page.locator('#app #sec-tvang > summary').click();
 const start=page.locator('#app #sec-tvang .fu18-start');
 assert.match(await start.innerText(),/FU-ledning och åklagarkontakt/);
 await start.click();
 const q=()=>page.locator('#sheet-root .fu18-q').innerText();
 assert.equal(await q(),'Är någon gripen?');
 await page.click('#sheet-root [data-fu18="yes"]');
 assert.equal(await q(),'Gäller något av följande?');
 await page.click('#sheet-root [data-fu18="none"]');
 assert.match(await q(),/under 18/);
 await page.click('#sheet-root [data-fu18="back"]');
 assert.equal(await q(),'Gäller något av följande?','Bakåt visar föregående fråga');
 await page.click('#sheet-root [data-fu18="none"]');
 await page.click('#sheet-root [data-fu18="no"]');
 assert.match(await q(),/försvarare/);
 await page.click('#sheet-root [data-fu18="no"]');
 const result=await page.locator('#sheet-root .fu18-result').innerText();
 for(const s of ['Polisledd','Efter förhöret','Inför kontakten','ÅFS 8 § 4'])assert.ok(result.includes(s),'Resultatet saknar '+s);
 await page.click('#sheet-root [data-fu18="restart"]');
 assert.equal(await q(),'Är någon gripen?');
 // Grov misshandel, gripen: ett tryck till svaret.
 await page.click('#sheet-root .sheet-close');
 await page.locator('[data-action="back"]').first().click();
 await page.fill('#crime-search','Grov misshandel');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Grov misshandel',{exact:true})}).first().click();
 await page.waitForSelector('#app #sec-tvang > summary');await page.locator('#app #sec-tvang > summary').click();await page.locator('#app #sec-tvang .fu18-start').click();
 await page.click('#sheet-root [data-fu18="yes"]');
 const r2=await page.locator('#sheet-root .fu18-result').innerText();
 assert.ok(r2.includes('Åklagarledd')&&r2.includes('Före förhöret'),r2);
 // Förstadier visar inte verktyget.
 await page.click('#sheet-root .sheet-close');
 await page.locator('[data-action="back"]').first().click();
 await page.fill('#crime-search','Försök till stöld');await page.waitForTimeout(300);
 await page.locator('.crime-card').filter({has:page.getByText('Försök till stöld',{exact:true})}).first().click();
 await page.waitForSelector('#app #sec-tvang > summary');
 assert.equal(await page.locator('.fu18-start').count(),0,'Förstadier ingår inte i 1.8');
 assert.deepEqual(errors,[]);
 console.log('PASS 1.8 FU-ledning i webbläsaren: '+r.n+' brott '+JSON.stringify(r.counts)+', högst '+r.maxQ+' frågor, gränssnittsflöde och förstadier');
}finally{await browser.close();}
