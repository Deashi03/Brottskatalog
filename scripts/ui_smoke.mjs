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
  assert.equal((await page.locator('.bk03-brand span').innerText()).trim(),'1.6','Search header must display current release 1.6');
  assert.equal(await page.evaluate(()=>window.BK_DATA.crimes.length),1557,'The V1.5 full database must be loaded');

  const finalCharging=await page.evaluate(()=>({reviewed:window.BK_FINAL_PROSECUTION15?.completed,held:window.BK_FINAL_PROSECUTION15?.held.length,stampling:window.BK_DATA.crimes.find(c=>c.title==='Stämpling till grovt olaga tvång')?.prosecution,attempt:window.BK_DATA.crimes.find(c=>c.title==='Försök till grovt hemfridsbrott')?.prosecution}));
  assert.deepEqual(finalCharging,{reviewed:452,held:0,stampling:'general',attempt:'general'},'Final charging classifications must survive browser load order');

  // Measure settled layout, after the page's translateY entrance animation.
  await page.locator('.app-shell.nav-layout > main.page').evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished)));
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
  assert.ok(navGeometry.mainBottom<=navGeometry.navTop+1,'List viewport must end above navigation: '+JSON.stringify(navGeometry));
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
  for(const title of ['Ringa smuggling','Ringa tullbrott','Ringa smuggling av explosiv vara','Försök till ringa smuggling av explosiv vara']){
    await search.fill(title);await wait();
    const titles=await page.locator('.crime-title').allTextContents();
    assert.equal(titles.some(t=>t.trim().toLocaleLowerCase('sv')===title.toLocaleLowerCase('sv')),false,'Excluded family cannot reappear through search: '+title);
  }
  await search.fill('Tullbrott');await wait();
  await page.locator('.crime-card').filter({has:page.getByText('Tullbrott',{exact:true})}).click();
  await page.locator('#sec-rekvisit > summary').click();
  const limits=page.locator('.smuggling-limits');
  assert.equal(await limits.getAttribute('open'),null,'Detailed statutory limits stay collapsed initially');
  await limits.locator(':scope > summary').click();
  assert.ok((await limits.innerText()).includes('5 kap. 5–10 §§'),'Exact customs surcharge condition is visible');
  assert.ok((await limits.innerText()).includes('frivillig åtgärd'),'Rectification requires a voluntary effective action');
  assert.ok(await limits.locator('a[href*="riksdagen.se"]').count());
  assert.equal(await limits.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Expanded limits fit iPhone width');
  await page.locator('[data-action="back"]').click();await wait();
  // Current statutory prosecution rules must distinguish grades and alternatives.
  for(const [title,phrase] of [
    ['Grovt hemfridsbrott','omfattas inte av normalgradernas begränsning'],
    ['Grovt fordringsbedrägeri','bara grovt bedrägeri och grov utpressning'],
    ['Förberedelse genom anbringande av tekniskt hjälpmedel','vilket av de tre brotten'],
    ['Grovt tagande av muta','särskilda mutbrottsfilter inte omfattar'],
    ['Grovt olovligt brukande','andra stycket inte tillämpas'],
    ['Arbetsmiljöbrott','omfattas inte av 3:12'],
    ['Vapenbrott','18:14 gäller när någon frivilligt'],
    ['Skattebrott','OCH samma felaktighet'],
    ['Skatteförseelse','inte först när ett visst belopp'],
    ['Bidragsbrott','6 a § hindrar åtal'],
    ['Vårdslöshet med gift eller smittämne','inget eget angivelse-'],
    ['Landsförräderi','inget eget angivelse-'],
    ['Ryktesspridning till fara för rikets säkerhet','inget eget angivelse-']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});
    await page.locator('#crime-search').fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Crime detail fits iPhone width: '+title);
    if(title==='Grovt hemfridsbrott')assert.ok((await page.locator('.status-block').innerText()).includes('Allmänt åtal'));
    await page.locator('[data-action="prosecution"]').click();
    const dialog=page.locator('[role="dialog"]');
    await dialog.locator('.prosecution-conditions > summary').click();
    assert.ok((await dialog.innerText()).includes(phrase),'Specific current prosecution distinction: '+title);
    const conditions=dialog.locator('.prosecution-conditions');
    assert.equal(await conditions.getAttribute('open'),'','Detailed conditions opened by test after initially collapsed');
    assert.ok((await conditions.innerText()).includes('riksåklagaren'),'Competent decision-maker and referral conditions are accessible');
    assert.ok(await dialog.locator('a[href*="riksdagen.se"]').count()>=2,'Both official statutory sources are accessible');
    const dialogWidth=await dialog.evaluate(el=>({client:el.clientWidth,scroll:el.scrollWidth,overflow:[...el.querySelectorAll('*')].filter(n=>n.clientWidth&&n.scrollWidth>n.clientWidth+1).slice(0,3).map(n=>({tag:n.tagName,class:n.className,text:n.textContent.slice(0,80),client:n.clientWidth,scroll:n.scrollWidth}))}));
    assert.ok(dialogWidth.scroll<=dialogWidth.client+1,'Prosecution explanation fits iPhone width: '+title+' '+JSON.stringify(dialogWidth));
    await page.getByRole('button',{name:'Stäng',exact:true}).click();
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  // Every restored parent has direct links to all three stage cards.
  for(const [parent,kind,punishable,phrase] of [
    ['Grovt vapenbrott','Försök',true,'Utförandet av ett visst brott har påbörjats'],
    ['Vapenbrott','Försök',false,'endast grovt och synnerligen grovt'],
    ['Myteri','Försök',false,'men inte försök till myteri'],
    ['Myteri','Stämpling',true,'Kommer överens med någon annan'],
    ['Osann utsaga inför nordisk domstol','Förberedelse',true,'Partsutsaga enligt 15:2'],
    ['Osann utsaga inför en internationell domstol','Förberedelse',true,'mindre allvarligt fall omfattas inte'],
    ['Högförräderi','Stämpling',true,'förbindelse med främmande makt'],
    ['Grov förgöring','Försök',true,'den grova graden definieras i samma paragraf'],
    ['Grovt hindrande av urkunds bevisfunktion','Försök',true,'den grova graden definieras i samma paragraf'],
    ['Grov penningförfalskning','Förberedelse',true,'den grova graden definieras i samma paragraf'],
    ['Grov olovlig underrättelseverksamhet mot person','Stämpling',true,'den grova graden definieras i samma paragraf']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(parent);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(parent,{exact:true})}).click();
    const overview=page.locator('#sec-stadier');await overview.locator(':scope > summary').click();
    assert.equal(await overview.locator('.stage-overview-link').count(),3,'Three direct stage links: '+parent);
    const link=overview.locator('.stage-overview-link').filter({hasText:kind+' ·'});
    if(parent.startsWith('Osann utsaga'))assert.ok((await link.innerText()).includes('i angivna fall'));
    await link.click();await wait();
    assert.ok((await page.locator('h1').innerText()).startsWith(kind+' till'));
    if(punishable){await page.locator('#sec-rekvisit > summary').click();assert.ok((await page.locator('#sec-rekvisit').innerText()).includes(phrase),'Stage-specific requisites: '+parent);}
    else assert.ok((await page.locator('.stage-alert').innerText()).includes('EJ STRAFFBART'));
    await page.locator('#sec-lag > summary').click();
    const lawPhrase=parent==='Grovt vapenbrott'?'18:15 räknar uttryckligen':parent==='Myteri'&&punishable?'16:17 räknar upp förberedelse':phrase;
    assert.ok((await page.locator('#sec-lag').innerText()).includes(lawPhrase),'Specific statutory restriction visible: '+parent);
    if(parent==='Grovt vapenbrott'){assert.ok((await page.locator('#sec-lag').innerText()).includes('synnerligen grovt vapenbrott'));assert.ok((await page.locator('.penalty-panel').innerText()).includes('Fängelse 1 mån'));assert.equal(await page.locator('.penalty-panel .penalty-bounds').count(),1,'Individually checked attempted gross weapon range');assert.equal((await page.locator('.penalty-panel').innerText()).includes('Böter'),false,'No invented fine minimum for attempted gross weapon offence');}
    if(kind==='Försök'&&['Grov förgöring','Grovt hindrande av urkunds bevisfunktion'].includes(parent)){const panel=page.locator('.penalty-panel');assert.ok((await panel.innerText()).includes('Böter'));assert.ok((await panel.innerText()).includes(parent==='Grov förgöring'?'6 år':'4 år'));assert.ok((await panel.innerText()).includes('ordinära lagstadgade försöksskalan'));assert.equal(await panel.locator('.penalty-bounds').count(),1);}
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Restored stage fits iPhone: '+parent);
  }
  for(const [parent,kind,upper]of[
    ['Grov förgöring','Förberedelse','Under 6 år'],
    ['Grovt hindrande av urkunds bevisfunktion','Förberedelse','2 år'],
    ['Olaga frihetsberövande (mindre grovt fall)','Stämpling','Under 2 år'],
    ['Grovt spridande av gift eller smitta','Förberedelse','18 år'],
    ['Grov kapning','Stämpling','18 år']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(parent);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(parent,{exact:true})}).click();
    const overview=page.locator('#sec-stadier');await overview.locator(':scope > summary').click();
    await overview.locator('.stage-overview-link').filter({hasText:kind+' ·'}).click();await wait();
    const bounds=page.locator('.penalty-panel .penalty-bound');assert.equal(await bounds.count(),2);
    assert.equal(await bounds.last().locator('strong').innerText(),upper,'Exact open/closed upper endpoint: '+parent);
    assert.ok((await page.locator('.penalty-panel').innerText()).includes('ordinära lagstadgade skalan'));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Preparation bounds fit iPhone: '+parent);
  }
  for(const [parent,kind,lower,upper]of[
    ['Grov kapning','Försök','Fängelse 1 mån','18 år eller livstid'],
    ['Grov penningförfalskning','Försök','Fängelse 1 mån','8 år'],
    ['Grovt vapenbrott','Förberedelse','Böter','Under 7 år'],
    ['Synnerligen grovt vapenbrott','Stämpling','Fängelse 1 mån','Under 10 år']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(parent);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(parent,{exact:true})}).click();
    const overview=page.locator('#sec-stadier');await overview.locator(':scope > summary').click();
    await overview.locator('.stage-overview-link').filter({hasText:kind+' ·'}).click();await wait();
    const bounds=page.locator('.penalty-panel .penalty-bound strong');assert.deepEqual(await bounds.allTextContents(),[lower,upper],'Individually reviewed interval: '+parent);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Additional stage interval fits iPhone: '+parent);
  }
  for(const [kind,scale]of[['Försök','högst 6 år'],['Förberedelse','under 6 år']]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill('Grovt våld eller hot mot förman');await wait();
    await page.locator('.crime-card').filter({has:page.getByText('Grovt våld eller hot mot förman',{exact:true})}).click();
    const overview=page.locator('#sec-stadier');await overview.locator(':scope > summary').click();await overview.locator('.stage-overview-link').filter({hasText:kind+' ·'}).click();await wait();
    const text=await page.locator('.penalty-panel').innerText();assert.ok(text.includes('Tillämpningen är villkorad'));assert.ok(text.includes(scale));assert.ok(text.includes('Krigs- eller beredskapsrelaterade'));
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill('Arbetsmiljöbrott');await wait();await page.locator('.crime-card').filter({has:page.getByText('Arbetsmiljöbrott',{exact:true})}).click();
  {const choices=page.locator('.penalty-alternative-details');assert.equal(await choices.getAttribute('open'),null);await choices.locator(':scope > summary').click();assert.equal(await choices.locator('li').count(),6);const text=await choices.innerText();assert.ok(text.includes('Fängelse högst 3 år')&&text.includes('Fängelse 2–6 år')&&text.includes('konkret arbetsmiljöskyldighet'));assert.equal(await page.locator('.penalty-panel .penalty-bounds').count(),0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Workplace branches fit iPhone');}
  await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill('Brukande av det förfalskade');await wait();await page.locator('.crime-card').filter({has:page.getByText('Brukande av det förfalskade',{exact:true})}).click();
  {const choices=page.locator('.penalty-alternative-details');assert.equal(await choices.getAttribute('open'),null);await choices.locator(':scope > summary').click();assert.equal(await choices.locator('li').count(),14);const text=await choices.innerText();assert.ok(text.includes('Fängelse 1–6 år')&&text.includes('14:13 undantar')&&text.includes('ringa brott'));assert.equal(await page.locator('.penalty-panel .penalty-bounds').count(),0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Completed forged-use branches fit iPhone');}
  for(const [parent,kind,count,phrase]of[
    ['Brukande av det förfalskade','Försök',9,'Fängelse 1 mån – högst 8 år'],
    ['Myteri','Förberedelse',5,'Böter – fängelse högst 18 år'],
    ['Svikande av försvarsplikt','Försök',2,'högst 4 år'],
    ['Högförräderi','Förberedelse',2,'fängelse under 10 år'],
    ['Osann utsaga inför nordisk domstol','Förberedelse',2,'Partsutsaga i tvistemål enligt 15:2 omfattas inte'],
    ['Osann utsaga inför en internationell domstol','Stämpling',2,'fängelse under 8 år']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(parent);await wait();await page.locator('.crime-card').filter({has:page.getByText(parent,{exact:true})}).click();
    const overview=page.locator('#sec-stadier');await overview.locator(':scope > summary').click();await overview.locator('.stage-overview-link').filter({hasText:kind+' ·'}).click();await wait();
    const details=page.locator('.penalty-alternative-details');assert.equal(await details.getAttribute('open'),null,'Alternatives start collapsed: '+parent);await details.locator(':scope > summary').click();
    if(['Myteri','Svikande av försvarsplikt'].includes(parent)){const panel=await page.locator('.penalty-panel').innerText();assert.ok(panel.includes('Tillämpningen är villkorad'),'Applicability warning preserved: '+parent);assert.ok(panel.includes(parent==='Myteri'?'Pröva gärningsform och roll.':'18:7 kriminaliserar endast försök'),'Original applicability caveat preserved: '+parent);}
    assert.equal(await details.locator('li').count(),count);assert.ok((await details.innerText()).includes(phrase),'Specific stage alternatives: '+parent);
    assert.equal(await page.locator('.penalty-panel .penalty-bounds').count(),0,'No single synthetic range for alternative-dependent stage');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Stage alternatives fit iPhone: '+parent);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  for(const [title,phrase,links]of[
    ['Ringa narkotikabrott · bruk','undantar bruk av narkotika',3],
    ['Grovt skattebrott','endast förberedelse och stämpling',3],
    ['Bidragsbrott','redan fullbordat brott',3],
    ['Förberedelse genom anbringande av tekniskt hjälpmedel','självständigt förberedelsebrott',0]
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    const section=page.locator('#sec-stadier');assert.equal(await section.getAttribute('open'),null);
    await section.locator(':scope > summary').click();assert.ok((await section.innerText()).includes(phrase),title);
    assert.equal(await section.locator('.stage-overview-link').count(),links);
    assert.equal(await section.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Source-bound overview fits iPhone: '+title);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  // Statutory degree guidance stays inside the expanded requisite section.
  for(const [title,phrase]of[
    ['Grovt tjänstefel','kräver att brottet enligt första stycket har begåtts uppsåtligen'],
    ['Brott mot tystnadsplikt','ringa-undantag hör till oaktsamhetsalternativet'],
    ['Rymning','Ringa är ansvarsfrihet'],
    ['Ovarsam utsaga','Grov oaktsamhet är skuldformen'],
    ['Grov urkundsförfalskning','hjälpa någon till hans eller hennes rätt'],
    ['Brukande av det förfalskade','Ingen enda automatisk brottsgrad'],
    ['Grov våldtäkt mot barn','skiljer sig i ordalydelse från vuxenbrottets'],
    ['Osann utsaga inför nordisk domstol','ingen grov menedsgrad']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();if(await page.locator('.grade-secondary').count())await page.locator('.grade-secondary > summary').click();const grades=page.locator('.statutory-grade-review');
    assert.equal(await grades.getAttribute('open'),null,'Degree detail starts collapsed: '+title);
    await grades.locator(':scope > summary').click();assert.ok((await grades.innerText()).includes(phrase),'Precise statutory degree distinction: '+title);
    assert.ok((await grades.innerText()).includes('konkret gärning'));
    assert.ok(await grades.locator('a[href*="riksdagen.se"]').count());
    assert.equal(await grades.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Degree qualifiers fit iPhone: '+title);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Degree detail fits viewport: '+title);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  for(const [title,phrase]of[
    ['Grov misshandel','synnerligt lidande'],
    ['Arbetsmiljöbrott','en gemensam automatisk brottsgrad'],
    ['Inbrottsstöld','inte för en ringa inbrottsstöld'],
    ['Hets mot folkgrupp','OCH spridning'],
    ['Grovt rattfylleri','1,0 promille'],
    ['Vapenbrott av oaktsamhet','inte oaktsamhetsalternativet'],
    ['Näringspenningtvätt','ska inte utan stöd kopieras'],
    ['Grovt fordringsbedrägeri','Betydande värde är ett grundrekvisit']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();if(await page.locator('.grade-secondary').count())await page.locator('.grade-secondary > summary').click();const grades=page.locator('.statutory-grade-review');
    assert.equal(await grades.getAttribute('open'),null);await grades.locator(':scope > summary').click();
    assert.ok((await grades.innerText()).includes(phrase),'Remaining grade route: '+title);
    assert.equal(await grades.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Remaining grade fits iPhone: '+title);
  }
  for(const [title,phrase]of[
    ['Förtal','OCH att uppgiften visas sann'],
    ['Kränkande fotografering','ett led i myndighets verksamhet'],
    ['Sexuellt utnyttjande av barn','FÖRSTA MENINGEN'],
    ['Kapning','endast 5 a § andra stycket 2'],
    ['Förvanskning av urkund','sex månaders fängelse'],
    ['Mened','betydelse för saken'],
    ['Förolämpning mot tjänsteman','utvidgar 1–2 §§, inte 3 §'],
    ['Osant intygande','falska identitetsuppgifter']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();const limits=page.locator('.statutory-limits-review');
    assert.equal(await limits.getAttribute('open'),null,'Explicit limits start collapsed: '+title);
    await limits.locator(':scope > summary').click();assert.ok((await limits.innerText()).includes(phrase),'Precise statutory limitation: '+title);
    assert.ok((await limits.innerText()).includes('24 kap.'));assert.ok(await limits.locator('a[href*="riksdagen.se"]').count());
    assert.equal(await limits.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Statutory limitation fits iPhone: '+title);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  for(const [title,phrase]of[
    ['Rattfylleri','utesluter inte tredje styckets'],
    ['Grovt rattfylleri','endast första och andra'],
    ['Brott mot knivlagen','inte samma prövning'],
    ['Vapenbrott','inte generell ansvarsfrihet'],
    ['Smuggling','ANDRA STYCKET'],
    ['Vårdslös skatteuppgift','Mindre allvarlig gärning'],
    ['Vårdslöst bidragsbrott','FÖRE utbetalning'],
    ['Grovt brott mot tillståndsplikten för explosiva varor','till BrB endast för 28 och 29']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();const limits=page.locator('.statutory-limits-review');
    assert.equal(await limits.getAttribute('open'),null);await limits.locator(':scope > summary').click();
    assert.ok((await limits.innerText()).includes(phrase),'Special-law limit: '+title);
    assert.ok(await limits.locator('a[href*="riksdagen.se"]').count());
    assert.equal(await limits.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Special-law limits fit iPhone: '+title);
  }
  for(const [title,rule,phrase]of[
    ['Förtal','Särskilda häktningsgrunder','ingen allmän straffskalegräns'],
    ['Ringa stöld','Ett år i straffskalan','Ordinarie straffskaletröskel ej uppfylld'],
    ['Ofredande','Ett år i straffskalan','Straffskaletröskeln uppfylld'],
    ['Grov fridskränkning','Häktningspresumtion','Straffskaletröskeln uppfylld'],
    ['Grovt vapenbrott','Fyra års minimistraff','Straffskaletröskeln uppfylld'],
    ['Arbetsmiljöbrott','Fängelse i straffskalan','Välj tillämplighet och straffskalegren'],
    ['Lydnadsbrott','Fängelse i straffskalan','Välj tillämplighet och straffskalegren'],
    ['Grovt bedrägeri','Hemlig avlyssning – särskild prövning','elektronisk kommunikation']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-tvang > summary').click();const review=page.locator('.coercion-threshold-review');
    assert.equal(await review.getAttribute('open'),null,'Threshold review starts collapsed: '+title);
    await review.locator(':scope > summary').click();
    const row=review.locator('li').filter({has:page.getByText(rule,{exact:true})});
    assert.ok((await row.innerText()).includes(phrase),'Source-specific threshold distinction: '+title);
    assert.ok((await review.innerText()).includes('Inget beslut om tvångsmedel'));
    assert.equal(await review.locator('a[href*="riksdagen.se"]').count(),2);
    assert.equal(await review.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Threshold review fits iPhone: '+title);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  }
  for(const [title,number,file]of[
    ['Olaga hot','B 406-24','2024/b-406-24'],
    ['Grovt olaga hot','B 406-24','2024/b-406-24'],
    ['Olaga intrång','B 4926-23','2023/b-4926-23'],
    ['Sabotage mot blåljusverksamhet','B 6185-22','2023/b-6185-22'],
    ['Grovt sabotage mot blåljusverksamhet','B 6185-22','2023/b-6185-22'],
    ['Våldsamt upplopp','B 6185-22','2023/b-6185-22'],
    ['Sabotage','B 3626-24','engelska-oversattningar/b-3626-24-eng']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();
    const example=page.locator('#sec-rekvisit .fact-card').filter({hasText:number});
    assert.equal(await example.count(),1,'One primary HD example: '+title);
    assert.ok((await example.innerText()).includes('ingen fullständig förarbets- och praxisgranskning'));
    assert.equal(await example.locator('a[href="https://www.domstol.se/globalassets/filer/domstol/hogstadomstolen/avgoranden/'+file+'.pdf"]').count(),1);
    assert.equal(await example.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'HD example fits iPhone: '+title);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  for(const [title,phrase,date]of[
    ['Otillåtet förfarande med pornografisk bild','17 februari 1971','1971-02-17'],
    ['Stöld','1 januari 1965','1965-01-01'],
    ['Förtal','1 januari 1965','1965-01-01'],
    ['Våldsamt upplopp','1 januari 1965','1965-01-01'],
    ['Svikande av försvarsplikt','1 januari 1965','1965-01-01'],
    ['Mord','2020-01-01'],
    ['Ofredande','2018-01-01'],
    ['Grov misshandel','2026-08-01'],
    ['Psykiskt våld','2026-07-01'],
    ['Rymning','2026-07-02'],
    ['Vapenbrott','november 2026'],
    ['Egenmäktighet med barn','1 januari 2027'],
    ['Tullbrott','deklarationer']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-lag > summary').click();const temporal=page.locator('.law-temporal-review');
    assert.equal(await temporal.getAttribute('open'),null,'Temporal review starts collapsed: '+title);
    await temporal.locator(':scope > summary').click();assert.ok((await temporal.innerText()).includes(phrase),'Temporal distinction: '+title);
    if(date)assert.equal(await page.evaluate(title=>window.BK_DATA.crimes.find(c=>!c.stageType&&c.title===title)?.temporalReview15?.wordingFrom,title),date,'Structured commencement remains exact: '+title);
    assert.ok((await temporal.innerText()).includes('Ingen lagversion väljs automatiskt'));
    assert.equal(await temporal.locator('a[href*="rkrattsbaser.gov.se"], a[href*="docId=2667840"]').count(),1);
    if(title==='Otillåtet förfarande med pornografisk bild'){assert.equal(await temporal.getByRole('link',{name:'Bekräftelse av ikraftträdandet'}).count(),1);assert.equal(await temporal.getByRole('link',{name:'Ikraftträdandekälla – originaltryck'}).count(),1);}
    if(title==='Stöld')assert.equal(await temporal.getByRole('link',{name:'Originaltryck – SFS'}).count(),1);
    assert.equal(await temporal.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Temporal review fits iPhone: '+title);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  }
  for(const [title,phrase]of[
    ['Mord','grundgärningen'],
    ['Dråp','inte ansvarsfrihet'],
    ['Barnadråp','sitt eget barn'],
    ['Vållande till kroppsskada eller sjukdom','INTE är ringa'],
    ['Arbetsmiljöbrott','krav på skada/sjukdom som inte är ringa'],
    ['Skadegörelse','Äganderätten ensam avgör'],
    ['Åverkan','8:11'],
    ['Tagande av olovlig väg','faktisk skada'],
    ['Inbrottsstöld','annat brott'],
    ['Rån','bar gärning'],
    ['Ringa bedrägeri','även utan vilseledande'],
    ['Olovlig befattning med betalningsverktyg','samma eller strängare'],
    ['Fyndförseelse','tillägnelseuppsåt'],
    ['Bokföringsbrott','inte bedriver näringsverksamhet'],
    ['Upplopp','skingras'],
    ['Barnpornografibrott','10 b'],
    ['Vårdslöshet med hemlig uppgift','Varje oaktsamt anskaffande'],
    ['Lydnadsbrott','uppenbart att ordern inte angår tjänsten'],
    ['Landsförräderi','22:4']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();const limits=page.locator('.statutory-limits-review');
    assert.equal(await limits.getAttribute('open'),null);await limits.locator(':scope > summary').click();
    assert.ok((await limits.innerText()).includes(phrase),'Life/property limitation: '+title);
    assert.equal(await limits.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Life/property limits fit iPhone: '+title);
  }
  for(const [title,phrase]of[
    ['Grov stöld','inte ändra gränsen'],
    ['Förolämpning','grova svårhetsgraden tas bort'],
    ['Mened','utan särskilt brottsnamn'],
    ['Tagande av muta','varje förmån'],
    ['Grov våldtäkt','flerfaldig brottslighet']
  ]){
    await page.goto(url+'#sok',{waitUntil:'networkidle'});await search.fill(title);await wait();
    await page.locator('.crime-card').filter({has:page.getByText(title,{exact:true})}).click();
    await page.locator('#sec-rekvisit > summary').click();const note=page.locator('.preparatory-reform-note');
    assert.equal(await note.getAttribute('open'),null);await note.locator(':scope > summary').click();
    assert.ok((await note.innerText()).includes(phrase),'Preparatory reform distinction: '+title);
    assert.ok((await note.innerText()).includes('inget nytt juridiskt slutgodkännande'));
    assert.equal(await note.locator('a[href="https://data.riksdagen.se/dokument/HD03218"]').count(),1);
    assert.equal(await note.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Reform note fits iPhone: '+title);
  }
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
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
  // v1.5: a structured summary must visibly distinguish statute comparison from final legal review.
  const requisites=page.locator('#sec-rekvisit');
  assert.equal(await requisites.count(),1,'Rekvisit must be accessible from every offence card');
  await requisites.locator(':scope > summary').click();
  const requisiteText=await requisites.innerText();
  assert.ok(requisiteText.includes('Lagtextsbaserat rekvisitstöd'),'An unapproved summary must never appear legally certified');
  assert.ok(requisiteText.includes('Rättslig grund: BrB 3:1'),'Murder requisite summary must cite the actual penal provision');
  assert.ok(await requisites.locator('a[href*="riksdagen.se"]').count()>=1,'Requisite panel needs a direct official SFS link');
  const explanations=requisites.locator('.requisite-explanations').filter({has:page.locator('[data-requisite-concept]')});
  assert.equal(await explanations.getAttribute('open'),null,'Concept list collapsed initially');
  await explanations.locator(':scope > summary').click();
  await explanations.locator('[data-requisite-concept="bk:likgiltighet"]').click();
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('faktiskt förverkligades'),'Concept explains indifference to outcome, not just risk');
  assert.ok((await page.locator('[role="dialog"]').innerText()).includes('Straffrätt Lund 2.docx'),'Readable document locator is shown');
  assert.ok(await page.locator('[role="dialog"] a[href*="domstol.se"]').count(),'Primary source opens from the explanation');
  await page.getByRole('button',{name:'Stäng',exact:true}).click();
  assert.equal(await page.locator('[role="dialog"]').count(),0);
  assert.equal(await explanations.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'Concept buttons wrap on iPhone');
  await requisites.locator(':scope > summary').click();
  // v1.1: legal review is AFTER the ordinary details and never steals initial space.
  const quality=page.locator('#sec-quality');
  assert.equal(await quality.count(),1,'Card must offer a legal review details area');
  assert.equal(await quality.evaluate(el=>el.hasAttribute('open')),false,'Legal review collapsed by default');
  assert.ok(await quality.evaluate(el=>el.previousElementSibling?.classList.contains('detail-body')),'Review footer follows all primary crime sections');
  assert.ok(await quality.evaluate(el=>el.nextElementSibling?.classList.contains('detail-footer')),'Review footer appears immediately before version footnote');
  assert.ok(await quality.evaluate(el=>el.compareDocumentPosition(document.querySelector('.penalty-panel'))&Node.DOCUMENT_POSITION_PRECEDING),'Penalty remains above review footer');
  assert.equal(await quality.locator('.qa-old').count(),0,'Recently reviewed crime has no stale icon');
  await quality.locator('summary').click();
  assert.ok((await quality.innerText()).includes('Giltig lagversion'),'Details explain date and version limitations');
  await quality.locator('summary').click();
  assert.ok((await page.evaluate(()=>window.BK_QUALITY11?.thresholdYears))===3,'Three-year limit is active');
  assert.ok((await page.locator('body').innerText()).includes('LÄGST'),'Penalty minimum heading must show');
  assert.ok((await page.locator('body').innerText()).includes('HÖGST'),'Penalty maximum heading must show');
  assert.ok((await page.locator('.penalty-bound').allTextContents()).some(x=>x.includes('10 år')),'Murder lower bound must be ten years');
  await page.locator('summary').filter({hasText:'Lagtext'}).click();
  await wait();
  const lawTextStatus=(await page.locator('body').innerText());
  assert.ok(lawTextStatus.includes('Paragraftext individuellt kontrollerad mot aktuell SFS'),'Murder must show individually checked statute text');
  assert.ok(lawTextStatus.includes('Inte fullständig juridisk rekvisitgranskning'),'Current-paragraph validation must not be presented as full legal clearance');
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
  await page.locator('#sec-kvalifikation > summary').click();
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
  // V1.5: RB 24:2 is an individual identity/domicile exception, even for
  // a fine-only offence. RB 24:3 requires separate reasonable suspicion.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('förargelseväckande beteende');
  await wait();
  const fineCard=page.locator('.crime-card').filter({hasText:'Förargelseväckande beteende'}).first();
  assert.ok(await fineCard.count(),'Fine-only offence must be searchable');
  await fineCard.click();
  await wait();
  await page.locator('[data-action="custody"]').first().click();
  const fineCustody=page.locator('[role="dialog"] .custody-box');
  assert.equal(await fineCustody.count(),4,'All four RB 24 approaches must be separately visible');
  assert.ok(await fineCustody.nth(0).locator('.custody-mark.no').count(),'Ordinary RB 24:1 threshold cannot apply to fine-only offences');
  assert.ok(await fineCustody.nth(2).locator('.custody-mark.yes').count(),'RB 24:2 does not exclude fine-only offences by statutory range; person-specific criteria still required');
  assert.ok(await fineCustody.nth(3).locator('.custody-mark.yes').count(),'RB 24:3 can be considered via RB 24:2; case-specific conditions remain necessary');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('försök till mord');
  await wait();
  await page.locator('.crime-card').filter({hasText:'Försök till mord'}).first().click();
  await page.locator('[data-action="custody"]').first().click();
  assert.ok(await page.locator('[role="dialog"] .custody-box').nth(1).locator('.custody-mark.yes').count(),
    'Verified attempted murder should retain the explicit statutory four-year presumption route');
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
  await page.locator('#sec-kvalifikation > summary').click();
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
  assert.ok((await page.locator('body').innerText()).includes('Beslut i korthet:'),'Decision maker is accessible per measure');
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
  // v1.3 – updated BrB 20 offences must be searchable and carry correct dates.
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('missbruk av offentlig ställning');await wait();
  assert.ok(await page.locator('.crime-title').filter({hasText:'Missbruk av offentlig ställning'}).count()>0,'New public-office misuse offence must be searchable');
  assert.ok(await page.locator('.crime-title').filter({hasText:'Grovt missbruk av offentlig ställning'}).count()>0,'Aggravated public-office misuse offence must be searchable');
  await page.locator('.crime-card[data-open="v13-missbruk-offentlig-stallning"]').click();
  assert.ok((await page.locator('.detail-ref').innerText()).includes('20 kap. 2'),'Correct offence statute ref must be shown');
  assert.ok((await page.locator('.status-block').innerText()).includes('Allmänt åtal'),'Offence must display general prosecution');
  const legalReview=page.locator('#sec-quality');
  assert.equal(await legalReview.evaluate(el=>el.open),false,'Effective-date note stays collapsed');
  await legalReview.locator('summary').click();
  assert.ok((await legalReview.innerText()).includes('2026-08-01'),'Offence commencement date must be discoverable at bottom');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('brott mot tystnadsplikt');await wait();
  await page.locator('.crime-card').filter({has:page.locator('.crime-title:text-is("Brott mot tystnadsplikt")')}).first().click();
  assert.ok((await page.locator('.status-block').innerText()).includes('Villkor för viss tystnadsplikt'),'Special BrB 20:5 prosecution rule must be visible');
  await page.goto(url+'#sok',{waitUntil:'networkidle'});
  await page.locator('#crime-search').fill('svindleri');await wait();
  await page.locator('.crime-card').filter({has:page.locator('.crime-title:text-is("Svindleri")')}).first().click();
  await page.locator('#sec-rekvisit > summary').click();
  const fraudPanel=await page.locator('#sec-rekvisit').innerText();
  assert.ok(fraudPanel.toLocaleLowerCase('sv').includes('objektiva krav – förklaring')&&fraudPanel.toLocaleLowerCase('sv').includes('subjektiva krav – förklaring'),'Both reviewed explanation blocks render inside requisite panel');
  assert.ok(fraudPanel.includes('Företagsalternativet straffbelägger uttryckligen både uppsåt och grov oaktsamhet'),'Alternative statutory fault forms are taught in actual UI');
  assert.equal(await page.evaluate(()=>window.BK_DATA.glossary['täckningsprincipen']===window.BK_REQUISITE_CONCEPTS15['bk:tackning']),true,'Glossary and requisite popup share one canonical definition');
  await page.goto(url+'#mer',{waitUntil:'networkidle'});
  const settings=await page.locator('body').innerText();
  assert.ok(settings.includes('Version 1.6 · publicerad 2026-10-22'),'Published version must be visible in settings');
  assert.ok(settings.includes('Grunddata:'),'Source dataset age must be shown in settings');
  assert.ok(settings.includes('LAGKONTROLL'),'Source checker in settings');
  assert.deepEqual(errors,[],'No JS page errors');
  console.log('PASS: iPhone search, keyboard, reviewed penalties, whole-term glossary, page focus, legal cross-references, update info.');
}finally{await browser.close();}
