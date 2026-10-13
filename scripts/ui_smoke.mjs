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

  // v0.9.1: Sök/Sparat/Mer do not cover the scrolling content on iPhone.
  const navGeometry=await page.evaluate(()=>{
    const app=document.querySelector('.app-shell.nav-layout'),main=app?.querySelector(':scope > main.page'),nav=app?.querySelector(':scope > nav.bottom-nav');
    if(!app||!main||!nav)return null;
    main.scrollTop=main.scrollHeight;
    const a=app.getBoundingClientRect(),m=main.getBoundingClientRect(),n=nav.getBoundingClientRect();
    return {scrollable:main.scrollHeight>main.clientHeight,offset:main.scrollTop,
      mainBottom:m.bottom,navTop:n.top,navBottom:n.bottom,viewport:innerHeight,
      navPosition:getComputedStyle(nav).position,appHeight:a.height,
      lastCardBottom:main.querySelector('.crime-card:last-child')?.getBoundingClientRect().bottom};
  });
  assert.ok(navGeometry,'Tabbed layout must exist');
  assert.ok(navGeometry.scrollable&&navGeometry.offset>0,'Search results scroll inside their own viewport');
  assert.equal(navGeometry.navPosition,'relative','Navigation must participate in layout, not overlay the list');
  assert.ok(navGeometry.mainBottom<=navGeometry.navTop+1,'List viewport must end above navigation');
  assert.ok(navGeometry.navBottom<=navGeometry.viewport+2,'Navigation must remain inside mobile viewport');
  assert.ok(navGeometry.lastCardBottom<=navGeometry.navTop+1,'Last result cannot be hidden underneath navigation');
  await page.locator('.app-shell.nav-layout > main.page').evaluate(el=>el.scrollTop=0);
  for(const name of ['sparat','mer','sok']){
    await page.locator('[data-tab="'+name+'"]').click();
    assert.ok(await page.locator('.app-shell.nav-layout > main.page').count(),
      'Tab '+name+' must use an independent content viewport');
  }

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
  assert.ok((await page.locator('body').innerText()).includes('LÄGST'),'Penalty minimum heading must show');
  assert.ok((await page.locator('body').innerText()).includes('HÖGST'),'Penalty maximum heading must show');
  assert.ok((await page.locator('.penalty-bound').allTextContents()).some(x=>x.includes('10 år')),'Murder lower bound must be ten years');
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
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('grov misshandel');
  await wait();
  await page.locator('.crime-card').filter({hasText:'Grov misshandel'}).first().click();
  await wait();
  const bounds=await page.locator('.penalty-bound').allTextContents();
  assert.equal(bounds.length,2,'All prison ranges must have exactly two visible bounds');
  assert.ok(bounds[0].includes('1 år 6 mån'),'Lower bound for gross assault');
  assert.ok(bounds[1].includes('7 år'),'Upper bound for gross assault');
  await page.locator('summary').filter({hasText:'Kvalifikationsgrunder'}).click();
  assert.ok((await page.locator('body').innerText()).includes('Livsfarlig gärning'),'Qualification notes exist');
  await page.locator('summary').filter({hasText:'Anteckningar'}).click();
  assert.ok((await page.locator('body').innerText()).includes('Samlad förklaring')||(await page.locator('body').innerText()).includes('Kursanteckning'),'Non-redundant course explanation available');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('Tvegifte');
  await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.includes('Tvegifte')),'Newly added family law offence must be searchable');
  // v0.6: existing penalty with only a ceiling must not show a fake lower bound.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('urkundsförfalskning');
  await wait();
  await page.locator('.crime-card').filter({hasText:'Urkundsförfalskning'}).first().click();
  await wait();
  assert.ok((await page.locator('.penalty-only').allTextContents()).some(x=>x.includes('HÖGST')&&x.includes('2 år')),'Max-only penalty is concise');
  assert.equal((await page.locator('.penalty-panel').innerText()).includes('Ej särskilt angivet'),false,'No confusing lower bound text');
  // v0.8: försök, förberedelse och stämpling som egna sökbara poster.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('försök till mord');
  await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.toLowerCase().includes('försök till mord')),'Försök till mord ska gå att hitta');
  await page.locator('.crime-card').filter({hasText:'Försök till mord'}).first().click();
  assert.ok((await page.locator('.penalty-panel').innerText()).includes('1 mån'),'Attempted murder has explicit one-month minimum');
  assert.ok((await page.locator('.penalty-panel').innerText()).includes('18 år'),'Attempted murder retains maximum');

  assert.equal((await page.locator('.accordion').first().innerText()).includes('Lagtext'),true,'Lagtext är första menyvalet');
  await page.locator('[data-action="custody"]').first().click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('Häktningspresumtion'),'Presumtionen har ett eget kort');
  assert.ok(await page.locator('[role="dialog"] .custody-mark.yes').count()>=2,'Försök till mord ska ge presumtionsbock');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('stämpling till mord');
  await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.toLowerCase().includes('stämpling till mord')),'Stämpling till mord är sökbart');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('försök till ringa stöld');
  await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.includes('Ej straffbart')),'Ej straffbart ska synas i sökresultat');
  await page.locator('.crime-card').filter({hasText:'Försök till ringa stöld'}).first().click();
  assert.ok((await page.locator('.detail-title').innerText()).includes('Försök till ringa stöld'),'Correct noncriminal item opened');
  assert.ok((await page.locator('body').innerText()).includes('EJ STRAFFBART'),'Icke straffbar post ska kunna öppnas');
  assert.equal(await page.locator('[data-action="custody"]:not([disabled])').count(),0,'Ingen häktningsåtgärd på icke straffbart förstadium');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.crime-card').filter({hasText:'Försök till mord'}).count(),0,'Förstadier syns inte i huvudlistan');
  // v0.6: search noncriminal references directly.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('KnivL 1');
  await wait();
  assert.ok((await page.locator('#results-area').innerText()).includes('Andra lagrum'),'Separate legal reference results');
  await page.locator('[data-provision="Kniv:1"]').first().click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('Knivlagen 1 §'),'Open noncriminal prohibition provision');
  await page.locator('.sheet-close').click();
  // v0.6: context-specific use of "underlåtenhet" in robbery law.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('rån');
  await wait();
  await page.locator('.crime-card').filter({hasText:'Rån'}).first().click();
  await page.locator('summary').filter({hasText:'Lagtext'}).click();
  const omission=page.locator('.law-paper [data-term="underlåtenhet"]');
  assert.ok(await omission.count(),'Rån should link the distinct omission in coerced disposition');
  await omission.first().click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('Underlåtenhet vid rån'),'Rån-specific definition');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('olovlig energiavledning');
  await wait();
  await page.locator('.crime-card').first().click();
  await page.locator('summary').filter({hasText:'Utredningsuppslag'}).click();
  assert.ok((await page.locator('body').innerText()).includes('synliga spår'),'Energy field checklist focuses on observable evidence');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('ringa stöld');
  await wait();
  await page.locator('.crime-card').first().click();
  await page.locator('.status-block [data-action="custody"]').click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('24:2'),'Identification custody/urgent grip scenario');
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('Utredningshäktning'),'Custody includes investigative detention at end');
  assert.equal((await page.locator('[role="dialog"]').innerText()).includes('24:7'),false,'No redundant arrest explanation');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('grovt brott mot knivlagen');
  await wait();
  await page.locator('.crime-card').first().click();
  await page.locator('summary').filter({hasText:'Kvalifikationsgrunder'}).click();
  assert.ok((await page.locator('body').innerText()).includes('Annan särskilt farlig art'),'Four knife crime factors explained');

  // v0.7: coercive-measures statuses are per crime, separate from actual case facts.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('ringa stöld');await wait();
  await page.locator('.crime-card').first().click();
  assert.equal(await page.locator('summary').filter({hasText:'Rekvisit att kontrollera'}).count(),0,'Remove duplicated elements menu');
  await page.locator('summary').filter({hasText:'Tvångsmedel – översikt'}).click();
  const chapters=page.locator('.coercive-chapter');
  assert.equal(await chapters.count(),6,'Two measures groups omitted and RB 23–28 shown');
  await chapters.filter({hasText:'RB 23'}).locator('summary').first().click();
  await chapters.filter({hasText:'RB 28'}).locator('summary').first().click();
  const force=await page.locator('body').innerText();
  assert.ok(force.includes('Kroppsvisitation')&&force.includes('Kvarhållande av grupp'),'Core coercive measures by chapter');
  await chapters.filter({hasText:'RB 23'}).locator('.coercive-entry').first().locator('summary').click();
  assert.ok((await page.locator('body').innerText()).includes('Polismans beslut:'),'Decision maker is accessible per measure');
  // v0.9: visible ✓/✕ and officer badges in the chapter list.
  // Version 1.0 – complex decision pathways must be accessible without visual clutter.
  const measureBeslag=page.locator('.coercive-entry').filter({hasText:'Beslag'}).first();
  assert.ok(await measureBeslag.locator('.decision-help').count()>0,'Beslag must display special-condition exclamation');
  await measureBeslag.locator('.decision-help').click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('gatan'),'Decision explanation must distinguish street from legal underlying search');
  await page.locator('[data-action="close-sheet"]').last().click();
  assert.ok((await page.locator('.coercive-entry').allTextContents()).some(x=>x.includes('Polisman beslutar')),'List has one clear police primary decision');
  const items=page.locator('.coercive-entry');
  assert.ok(await items.count()>15,'Broad non-secret coercive index should render');
  assert.ok(await page.locator('.coercive-entry[data-eligible="true"] .measure-icon.yes').count()>0,'Eligible measures show check mark');
  assert.ok(await page.locator('.coercive-entry[data-eligible="false"] .measure-icon.no').count()>0,'Ineligible measures show cross');
  assert.ok((await page.locator('.coercive-entry').allTextContents()).some(x=>x.includes('FID')),'Police FID badges are visible');
  // v0.9: high-contrast crime eligibility and explicit decision-maker wording.
  const decisionTexts=await page.locator('.coercive-entry').allTextContents();
  assert.ok(decisionTexts.some(x=>x.includes('Polisman beslutar')),'Direct police decision must read Polisman beslutar');
  assert.ok(decisionTexts.some(x=>x.includes('Polisman FID')),'Police urgency decision must read Polisman FID');
  assert.ok(decisionTexts.some(x=>x.includes('FU-ledare')),'Investigation leader must be labeled FU-ledare');
  const beslag=page.locator('.coercive-entry').filter({hasText:'27:1'}).filter({hasText:'Beslag'}).first();
  assert.ok((await beslag.locator('.decision-pill').allTextContents()).includes('Polisman beslutar'),'Beslag must show one police decision');
  assert.equal((await beslag.locator('.decision-pill').allTextContents()).includes('Polisman FID'),false,'Beslag must not show both police decision modes');
  const colors=await page.evaluate(()=>({
    yes:getComputedStyle(document.querySelector('.measure-icon.yes')).color,
    no:getComputedStyle(document.querySelector('.measure-icon.no')).color
  }));
  assert.notEqual(colors.yes,colors.no,'Green checks and red crosses must have distinct computed colors');
  assert.ok(await page.locator('.decision-pill.own').count()>0,'Own decision badges must exist');
  assert.ok(await page.locator('.decision-pill.fid').count()>0,'FID badges must exist');
  assert.equal(await page.locator('.coercive-entry:has(.decision-pill.own):has(.decision-pill.fid)').count(),0,'Direct and FID police labels must never coexist in one measure');

  const filter=page.locator('.coercive-filter');
  await filter.check();
  assert.equal(await page.locator('.coercive-entry[data-eligible="false"]:visible').count(),0,'Only-check filter hides ineligible measures');
  await filter.uncheck();
  const mobileWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
  assert.ok(mobileWidth.scroll<=mobileWidth.inner+1,'No overflow after open coercive list');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('grov vapensmuggling');await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.includes('Grov vapensmuggling')),'New special offence is searchable');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('försök till grov vapensmuggling');await wait();
  assert.ok((await page.locator('.crime-card').allTextContents()).some(x=>x.toLowerCase().includes('försök till grov vapensmuggling')),'New special offence attempt is searchable');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('mord');await wait();
  await page.locator('.crime-card').filter({hasText:'Mord'}).first().click();
  await page.locator('summary').filter({hasText:'Tvångsmedel – översikt'}).click();
  await page.locator('.coercive-chapter').filter({hasText:'RB 28'}).locator('summary').first().click();
  await page.locator('.coercive-chapter').filter({hasText:'RB 28'}).locator('.coercive-entry').first().locator('summary').click();
  assert.ok((await page.locator('body').innerText()).includes('Straffskalekrav uppfyllt'),'Major offences should satisfy ordinary scale thresholds');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('människorov');await wait();
  await page.locator('.crime-card').filter({hasText:'Människorov'}).first().click();
  assert.ok((await page.locator('.status-block').innerText()).includes('Allmänt åtal'),'General prosecution must be explicit');
  assert.ok(await page.locator('.status-icon.good').count()>0,'General prosecution has green check');
  await page.goto(url+'#mer',{waitUntil:'networkidle'});
  const settings=await page.locator('body').innerText();
  assert.ok(settings.includes('Senaste kataloguppdatering'),'Update age in settings');
  assert.ok(settings.includes('LAGKONTROLL'),'Source checker in settings');
  assert.deepEqual(errors,[],'No JS page errors');
  console.log('PASS: iPhone search, keyboard, reviewed penalties, whole-term glossary, page focus, legal cross-references, update info.');
}finally{await browser.close();}
