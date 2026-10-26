// Bygger 1.7-snabbstarten: förrenderad sökvy i index.html och search-index-17.js.
// Kör efter varje ändring av data eller gränssnitt:  node scripts/build_shell_17.mjs
// (kräver Playwright). Testet shell17_fresh_test.mjs underkänner inaktuella filer.
import fs from 'node:fs';import path from 'node:path';import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { shellSourceHash } from './shell17_hash.mjs';
const root=path.resolve(import.meta.dirname,'..');
const hash=shellSourceHash(root);
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(root,'index.html')).href+'#sok');
 await page.waitForFunction(()=>window.BK_BOOT17?.ready===true,null,{timeout:120000});
 if(errors.length)throw Error('Sidfel vid bygge: '+errors.join('; '));
 const out=await page.evaluate(()=>{
  const app=document.getElementById('app');
  const rows=window.BK_APP17.crimes.map(c=>[c.id,c.title,c.ref||'',c.shortRef||'',c.aliases||[],c.category||'',c.stageType||'',c.stageStatus||'',c.penaltyShort||'']);
  return {cls:app.className,html:app.innerHTML,rows};
 });
 fs.writeFileSync(path.join(root,'search-index-17.js'),'/* Genererad av scripts/build_shell_17.mjs – redigera inte för hand. */\nwindow.BK_SEARCH_INDEX17='+JSON.stringify({hash,rows:out.rows})+';\n');
 const p=path.join(root,'index.html');let html=fs.readFileSync(p,'utf8');
 html=html.replace(/<div id="app" class="[^"]*"( data-bk17-hash="[^"]*")? aria-live="polite"><!--BK17-SHELL-->[\s\S]*?<!--\/BK17-SHELL--><\/div>/,
  ()=>'<div id="app" class="'+out.cls+'" data-bk17-hash="'+hash+'" aria-live="polite"><!--BK17-SHELL-->'+out.html+'<!--/BK17-SHELL--></div>');
 if(!html.includes('data-bk17-hash="'+hash+'"'))throw Error('Startvyns markörer saknas i index.html');
 fs.writeFileSync(p,html);
 if(shellSourceHash(root)!==hash)throw Error('Källsumman ändrades av bygget – kontrollera markörerna');
 console.log('BUILT 1.7 shell: '+out.rows.length+' sökposter, '+Math.round(out.html.length/1024)+' kB förrenderad vy, hash '+hash);
}finally{await browser.close();}
