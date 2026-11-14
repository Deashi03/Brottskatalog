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
def sections(text,chaptered=True):
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
    if paras:
      ls=[l for l in paras[-1].split('\n') if l.strip()]
      while len(ls)>1 and not re.search(r'[.:,;)]$',ls[-1].strip()) and ls[-2].strip().endswith('.'):ls.pop()
      paras[-1]='\n'.join(ls)
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
    mc=re.match(r'^(\d+(?: [a-z])?) kap\. [A-ZÅÄÖ]',ln)
    if mc and blank and len(ln)<120:
      flush();cur=None;buf=[];chap=mc.group(1).replace(' ','');continue
    mh=head.match(ln) if blank else None
    if mh:
      flush();num=mh.group(1).strip().replace(' ','')
      cur=(chap+':' if chap and chaptered else '')+num;buf=[ln];continue
    if cur is not None:buf.append(ln)
  flush();return out
OTHER=re.compile(r'^(?:\s*(?:första|andra|tredje|fjärde|femte|sjätte|sjunde)(?:\s*(?:,|eller|och|[–-]+)\s*(?:första|andra|tredje|fjärde|femte|sjätte|sjunde))*\s*(?:stycket|styckena)(?:\s*\d+(?:\s*[a-z]\b)?(?:\s*(?:,|eller|och|[–-]+)\s*\d+)*)?)?\s*(?:i\s+)?(?:[a-zåäö]*balken|lagen\s*\(|förordningen\s*\(|kungörelsen\s*\(|[a-zåäö-]+(?:lagen|förordningen|kungörelsen|stadgan)\b|samma\s+(?:lag|förordning)|regeringsformen|tryckfrihetsförordningen|yttrandefrihetsgrundlagen)',re.I)
GROUP=re.compile(r'(?:(\d+(?:\s[a-z])?)\s*kap\.\s*)?((?:\d+(?:\s?[a-z](?![a-zåäö]))?\s*(?:,|eller|och|samt|[–-]+)\s*)*\d+(?:\s?[a-z](?![a-zåäö]))?)\s*§§?')
def references(text,current,secs,limit=12):
  """Paragrafer i samma författning som texten hänvisar till. Hänvisningar till andra författningar hoppas över."""
  chap=current.split(':')[0] if ':' in current else None
  order=[k for k in secs if any(st=='now' for st,_ in secs[k])]
  out=[]
  for m in GROUP.finditer(text):
    if OTHER.match(text[m.end():m.end()+140]):continue
    c=(m.group(1) or '').replace(' ','') or chap
    parts=re.split(r'\s*(,|eller|och|samt|[–-]+)\s*',m.group(2))
    nums=[x.replace(' ','') for x in parts[0::2]];seps=parts[1::2]
    keys=[(c+':'+n) if c else n for n in nums]
    for i,k in enumerate(keys):
      if k in secs and k!=current:out.append(k)
      if i and re.fullmatch(r'[–-]+',seps[i-1]) and keys[i-1] in order and k in order:
        a,b=order.index(keys[i-1]),order.index(k)
        if 0<b-a<=limit:out.extend(x for x in order[a+1:b] if x!=current)
  return out
result={}
for law,info in laws.items():
  path=os.path.join(SRC,'sfs-'+info['sfs'].replace(':','-')+'.text')
  txt=open(path,encoding='utf-8').read()
  m=re.search(r'Ändrad:\s*t\.o\.m\. SFS (\S+)',txt)
  secs=sections(txt,any(':' in x for x in need[law]));got={}
  for s in sorted(need[law]):
    key=s.replace(' ','')
    vers=[t for st,t in secs.get(key,[]) if st=='now']
    if len(vers)!=1:raise SystemExit(f'{law} {s}: {len(vers)} gällande versioner')
    got[key]=vers[0]
  # 2.2: paragrafer som kortens lagtext hänvisar till följer med, så att hänvisningen går att öppna offline.
  for key in list(got):
    for ref in references(got[key],key,secs):
      if ref not in got:
        vers=[t for st,t in secs.get(ref,[]) if st=='now']
        if len(vers)==1:got[ref]=vers[0]
  result[law]={**info,'amended':m.group(1) if m else None,'url':'https://data.riksdagen.se/dokument/sfs-'+info['sfs'].replace(':','-')+'.html','sections':got}
json.dump(result,open(os.path.join(ROOT,'data/special19/lagtext.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('lagar',len(result),'paragrafer',sum(len(v['sections']) for v in result.values()))
