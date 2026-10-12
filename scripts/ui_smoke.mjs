import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';

const errors=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
page.on('pageerror',err=>errors.push(err.message));
const url='http://127.0.0.1:8765/';
const wait=async()=>{await page.waitForTimeout(400);};
try{
  await page.goto(url,{waitUntil:'networkidle'});
  assert.ok(await page.locator('#crime-search').count(),'Search must exist');
  assert.equal(await page.locator('h1:has-text("Vad vill du slå upp?")').count(),0,'Large hero removed');
  const search=page.locator('#crime-search');
  await search.fill('stöld');
  await search.press('Enter');
  await wait();
  const focused=await search.evaluate(el=>document.activeElement===el);
  assert.equal(focused,false,'Enter must dismiss search keyboard');
  assert.ok(await page.locator('.crime-card').count()>=3,'Expected theft results');
  await search.fill('Mord');
  await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.includes('Mord')),'Expanded catalog must include Mord');
  await page.locator('.crime-card').first().click();
  await wait();
  assert.ok((await page.locator('body').innerText()).includes('Fängelse 10 år–18 år'),'Reviewed murder penalty must appear');
  await page.locator('summary').filter({hasText:'Lagtext'}).click();
  await wait();
  assert.ok((await page.locator('body').innerText()).includes('Maskinimporterat')||(await page.locator('body').innerText()).includes('kontrollerad'),'Legal text status visible');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('ringa stöld');
  await wait();
  await page.locator('.crime-card').first().click();
  await page.locator('summary').filter({hasText:'Lagtext'}).click();
  const terms=page.locator('[data-term]');
  if(await terms.count()){
    await terms.first().click();
    assert.ok(await page.locator('[role="dialog"]').count(),'Definition overlay opens');
  }
  const pageWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert.ok(pageWidth<=400,'No horizontal overflow in mobile: '+pageWidth);
  // Whole-term matching must not turn utställarangivelse into angivelse till åtal.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('urkundsförfalskning');
  await wait();
  const urk=page.locator('.crime-card').filter({hasText:'Urkundsförfalskning'}).first();
  await urk.click();
  await page.locator('summary').filter({hasText:'Lagtext'}).click();
  await wait();
  assert.equal(await page.locator('.law-paper [data-term="angivelse"]').count(),0,'Do not match angivelse inside utställarangivelse');
  assert.ok(await page.locator('.law-paper [data-term="urkund"]').count()>0,'Stand-alone urkund should be linkable');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  const search2=page.locator('#crime-search');
  const fontSize=await search2.evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
  assert.ok(fontSize>=16,'iOS search should not cause auto zoom at font size '+fontSize);
  await search2.focus();
  const layout=await page.evaluate(()=>({width:document.documentElement.scrollWidth,inner:innerWidth}));
  assert.ok(layout.width<=layout.inner+1,'No horizontal viewport shift after search focus: '+JSON.stringify(layout));
  await page.goto(url+'#mer',{waitUntil:'networkidle'});
  const settings=await page.locator('body').innerText();
  assert.ok(settings.includes('Senaste kataloguppdatering'),'Update age in settings');
  assert.ok(settings.includes('LAGKONTROLL'),'Source checker in settings');
  assert.deepEqual(errors,[],'No JS page errors');
  console.log('PASS: iPhone search, keyboard, reviewed penalties, whole-term glossary, page focus, legal cross-references, update info.');
}finally{await browser.close();}
