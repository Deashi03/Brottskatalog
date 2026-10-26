// Gemensam källsumma för den förrenderade startvyn och sökindexet (1.7 snabbstart).
// Summan täcker alla moduler som appen kör (i <template id="bk17-modules">) i deras ordning.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
export function shellSourceHash(root){
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const h=crypto.createHash('sha256');
 const start=html.indexOf('<template id="bk17-modules">'),end=html.indexOf('</template>',start);
 if(start<0||end<0)throw Error('Modulmallen bk17-modules saknas i index.html');
 for(const m of html.slice(start,end).matchAll(/<script src="([^"]+)"><\/script>|<script>([\s\S]*?)<\/script>/g)){
  if(m[1])h.update('F:'+m[1]+'\n'+fs.readFileSync(path.join(root,m[1]),'utf8'));
  else h.update('I:\n'+m[2]);
 }
 return h.digest('hex').slice(0,24);
}
