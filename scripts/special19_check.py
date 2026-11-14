"""Kontrollerar en enskild källfil för brottskort (data/special19/*.txt) utan att röra de genererade filerna.
Kör: python3 -I scripts/special19_check.py <källfil.txt> <katalog med sfs-ÅÅÅÅ-NNN.text>
Bygger filen i en tillfällig katalog: paragraferna måste finnas i gällande lydelse och rekvisiten måste gå att tolka."""
import sys,os,shutil,subprocess,tempfile,json,re
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src,txt=os.path.abspath(sys.argv[1]),os.path.abspath(sys.argv[2])
tmp=tempfile.mkdtemp(prefix='s19check-')
try:
  os.makedirs(tmp+'/scripts');os.makedirs(tmp+'/data/special19');os.makedirs(tmp+'/data/rekvisit19');os.makedirs(tmp+'/data/typexempel19')
  for f in ('special19.py','special19_lagtext.py','rekvisit19_build.py'):shutil.copy(os.path.join(ROOT,'scripts',f),tmp+'/scripts/'+f)
  shutil.copy(src,tmp+'/data/special19/'+os.path.basename(src))
  for cmd in ([sys.executable,'-I',tmp+'/scripts/special19_lagtext.py',txt],[sys.executable,tmp+'/scripts/rekvisit19_build.py']):
    r=subprocess.run(cmd,cwd=tmp+'/scripts',capture_output=True,text=True)
    if r.returncode:print('FEL:',(r.stderr or r.stdout).strip().split('\n')[-1]);sys.exit(1)
  js=open(tmp+'/special-19.js',encoding='utf-8').read()
  ids=re.findall(r'^@ (\S+)',open(src,encoding='utf-8').read(),re.M)
  bad=[i for i in ids if not re.match(r'^v2[01]-[a-z0-9-]+$',i)]
  if bad:print('FEL: id ska vara v21-… med a–z, 0–9 och bindestreck:',bad);sys.exit(1)
  if len(set(ids))!=len(ids):print('FEL: dubbla id');sys.exit(1)
  t=open(src,encoding='utf-8').read()
  for w in ('brott som anges i lagtexten','enligt lagtexten','se lagtexten'):
    if w in t.lower():print('FEL: otillåten formulering:',w);sys.exit(1)
  print('OK',len(ids),'kort')
finally:
  shutil.rmtree(tmp,ignore_errors=True)
