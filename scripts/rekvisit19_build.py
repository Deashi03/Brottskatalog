"""Bygger rekvisit-19.js, typexempel-19.js och special-19.js från de granskade källfilerna i
data/rekvisit19, data/typexempel19 och data/special19 (nya brottskort i 1.9).
Kör: python3 scripts/rekvisit19_build.py
Lagtexten för de nya korten hämtas först med scripts/special19_lagtext.py."""
import json,re,glob,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T={'G':'gar','O':'obj','F':'foljd','S':'subj','K':'krets','U':'undantag','P':'plats'}
def parse(path,lines=None):
  data={};cur=None;form=None;last=None
  for raw in (lines if lines is not None else open(path,encoding='utf-8').read().split('\n')):
    line=raw.rstrip()
    if not line.strip():continue
    if line.startswith('@ '):
      p=[x.strip() for x in line[2:].split('|')];cur={'g':None,'r':None,'f':[]};data[p[0]]=cur;form=None;continue
    if line.startswith('B '):cur['g']=line[2:].strip();continue
    if line.startswith('R '):cur['r']={'t':line[2:].strip(),'f':[]};continue
    if line.startswith('- '):cur['r']['f'].append(line[2:].strip());continue
    if line.startswith('## '):form={'n':line[3:].strip(),'i':[]};cur['f'].append(form);continue
    if line.startswith('  | '):last.append(line[4:].strip());continue
    m=re.match(r'^([GOFSKUP]) (.*)$',line)
    if not m:raise SystemExit(path+': okänd rad: '+line)
    if form is None:form={'n':'','i':[]};cur['f'].append(form)
    alts=[];form['i'].append([T[m.group(1)],m.group(2).strip(),alts]);last=alts
  for c in data.values():
    for f in c['f']:
      for it in f['i']:
        if not it[2]:it.pop()
  return data
data={}
for f in sorted(glob.glob(os.path.join(ROOT,'data/rekvisit19/*.dsl'))):data.update(parse(f))
import special19
SPECIAL=special19.load(ROOT)
for f,lines in SPECIAL['dsl'].items():
  d=parse(f,lines);dup=set(d)&set(data)
  if dup:raise SystemExit('dubbla id: '+', '.join(sorted(dup)))
  data.update(d)
out={k:{kk:v[kk] for kk in ('g','r','f') if v[kk]} for k,v in data.items()}
open(os.path.join(ROOT,'rekvisit-19.js'),'w',encoding='utf-8').write('/* Brottskatalog 1.9 – rekvisit. Genereras av scripts/rekvisit19_build.py från data/rekvisit19; redigera källfilerna. */\nwindow.BK_REKVISIT19='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
ex={};cur=None
for f in sorted(glob.glob(os.path.join(ROOT,'data/typexempel19/*.txt'))):
  for line in open(f,encoding='utf-8'):
    line=line.rstrip('\n')
    if line.startswith('@ '):cur=line[2:].strip();ex.setdefault(cur,[]);continue
    if line.startswith('T '):ex[cur].append(['typ',line[2:].strip()])
    elif line.startswith('V '):ex[cur].append(['variant',line[2:].strip()])
    elif line.startswith('F '):lab,txt=line[2:].split('|',1);ex[cur].append(['form',txt.strip(),lab.strip()])
    elif line.strip():raise SystemExit(f+': okänd rad: '+line)
for k,v in SPECIAL['examples'].items():
  if k in ex:raise SystemExit('dubbla typexempel: '+k)
  ex[k]=v
missing=[c['id'] for c in SPECIAL['cards'] if c['id'] not in out or c['id'] not in ex]
if missing:raise SystemExit('nya kort utan rekvisit eller typexempel: '+', '.join(missing))
special19.write(ROOT,SPECIAL)
open(os.path.join(ROOT,'typexempel-19.js'),'w',encoding='utf-8').write('/* Brottskatalog 1.9 – typexempel. Genereras av scripts/rekvisit19_build.py från data/typexempel19. */\nwindow.BK_TYPEX19='+json.dumps(ex,ensure_ascii=False,separators=(',',':'))+';\n')
print('rekvisit',len(out),'typexempel',len(ex),'nya kort',len(SPECIAL['cards']))
