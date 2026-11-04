"""Hämtar ordagrann paragraftext för de nya brottskorten i 1.9 till data/special19/lagtext.json.
Kör: python3 -I scripts/special19_lagtext.py <katalog med sfs-ÅÅÅÅ-NNN.text från data.riksdagen.se>
Endast lydelser som gäller i dag tas med (en version märkt "Träder i kraft" med ett framtida datum hoppas över,
en version märkt "Upphör att gälla" med ett framtida datum används)."""
import sys,os,re,json,glob,datetime
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=sys.argv[1]
TODAY=datetime.date.today().isoformat()
laws={};need={}
for f in sorted(glob.glob(os.path.join(ROOT,'data/special19/*.txt'))):
  law=None
  for line in open(f,encoding='utf-8'):
    line=line.rstrip('\n')
    if line.startswith('LAW '):
      p=[x.strip() for x in line[4:].split('|')];law=p[0]
      laws[law]={'name':p[1],'sfs':p[2],'short':p[3]};need.setdefault(law,set())
    elif line.startswith('X '):
      for x in line[2:].split(','):need[law].add(x.strip())
    elif line.startswith('@ '):
      p=[x.strip() for x in line[2:].split('|')]
      for s in p[3].split(','):need[law].add(s.strip())
def norm(block):
  return re.sub(r'[ \t]*\n[ \t]*',' ',block.strip())
def sections(text):
  """Returnerar {nyckel:[(status,text)]} där nyckel är 'kap:par' eller 'par'."""
  body=text.split('Källa: Regeringskansliet / Lagrummet',1)[-1]
  body=body.split('\nÖvergångsbestämmelser',1)[0]
  lines=body.split('\n');out={};chap=None;cur=None;buf=[]
  head=re.compile(r'^(\d+ (?:[a-z] )?)§ ')
  def flush():
    if cur is None:return
    paras=[p for p in re.split(r'\n\s*\n','\n'.join(buf)) if p.strip()]
    # rubriker mellan paragrafer saknar avslutande skiljetecken
    while len(paras)>1 and not re.search(r'[.:,;)]$',norm(paras[-1])):paras.pop()
    t='\n\n'.join(norm(p) for p in paras)
    status='now'
    m=re.match(r'^(\S+ (?:[a-z] )?§) /Träder i kraft I:([^/]+)/',t)
    if m:
      d=m.group(2).strip();status='future' if (not re.match(r'\d{4}-\d{2}-\d{2}',d) or d>TODAY) else 'now'
    t=re.sub(r'^(\S+ (?:[a-z] )?§) (?:/[^/]+/ ?)+',r'\1 ',t)
    out.setdefault(cur,[]).append((status,t))
  prev=''
  for ln in lines:
    blank=not prev.strip();prev=ln
    mc=re.match(r'^(\d+) kap\. [A-ZÅÄÖ]',ln)
    if mc and blank and not ln.rstrip().endswith((',','och','eller')) and len(ln)<120:
      flush();cur=None;buf=[];chap=mc.group(1);continue
    mh=head.match(ln) if blank else None
    if mh:
      flush();num=mh.group(1).strip().replace(' ','')
      cur=(chap+':' if chap else '')+num;buf=[ln];continue
    if cur is not None:buf.append(ln)
  flush();return out
result={}
for law,info in laws.items():
  path=os.path.join(SRC,'sfs-'+info['sfs'].replace(':','-')+'.text')
  txt=open(path,encoding='utf-8').read()
  m=re.search(r'Ändrad:\s*t\.o\.m\. SFS (\S+)',txt)
  secs=sections(txt);got={}
  for s in sorted(need[law]):
    key=s.replace(' ','')
    vers=[t for st,t in secs.get(key,[]) if st=='now']
    if len(vers)!=1:raise SystemExit(f'{law} {s}: {len(vers)} gällande versioner')
    got[key]=vers[0]
  result[law]={**info,'amended':m.group(1) if m else None,'url':'https://data.riksdagen.se/dokument/sfs-'+info['sfs'].replace(':','-')+'.html','sections':got}
json.dump(result,open(os.path.join(ROOT,'data/special19/lagtext.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('lagar',len(result),'paragrafer',sum(len(v['sections']) for v in result.values()))
