"""Nya brottskort i Brottskatalog 1.9 (data/special19/*.txt) – läsning och generering av special-19.js.
Används av scripts/rekvisit19_build.py.

Källformat (en rad per uppgift):
  LAW nyckel | författningens namn | SFS-nummer | kortnamn i hänvisningar
  X  paragrafer som också behövs offline (till exempel åtalsregler och definitioner)
  @ id | rubricering som på domen | lagrum (utan lagnamn) | paragrafer (kommaseparerade)
  PEN minimum | maximum (år) | straffskala | kort straffskala
  C  kategori
  A  sökord;sökord
  Q  åtalsregel (plain eller en nyckel i RULES nedan eller i prosecution-171.js)
  ST förstadier (F, P, S eller -) | lagstöd | begränsning   (äkta och falska förstadiekort, se stages-20.js)
  FU enkel|bilagerad   eller   villkor|bilagerad|fråga|ja/nej|tips   eller   ej|förklaring
  N  upplysning om förstadier eller annat som visas på kortet
  Därefter rekvisit i samma DSL som data/rekvisit19 (B, R, -, ##, G, O, F, S, K, P, U, |)
  och typexempel: T text, V text, TF etikett | text.
"""
import os,re,json,glob
CHECKED='2026-11-04'
META=('LAW ','X ','PEN ','C ','A ','Q ','FU ','N ','T ','V ','TF ')

# Åtalsregler för speciallagar med särskilda åtalsvillkor. Samma form som prosecution-171.js.
def allman(law,what):
  return {'tone':'yellow','status':'Allmänt åtal – bara om det är motiverat från allmän synpunkt','short':'Åklagaren får åtala bara om åtal är motiverat från allmän synpunkt. Angivelse krävs inte, men ta reda på vad rättighetshavaren vill.',
          'more':[{'label':'Rättighetshavare','text':what},{'label':'Allmän synpunkt','text':'Till exempel vid omfattande eller organiserad brottslighet, risk för hälsa eller säkerhet, eller när rättighetshavaren vill att brottet ska lagföras.'},{'label':'Utred ändå','text':'Ta upp anmälan och säkra bevis. Åklagaren gör bedömningen.'}],'law':law}
RULES={
 'upphovsratt':allman('UpphL:59','Upphovspersonen eller den som har övertagit rätten, till exempel ett förlag, skivbolag eller filmbolag.'),
 'varumarke':allman('VmL:8:1','Varumärkesinnehavaren eller den som har licens att använda varumärket.'),
 'miljo':{'tone':'green','status':'Allmänt åtal','short':'Ingen angivelse krävs.',
   'more':[{'label':'Miljösanktionsavgift','text':'Kan gärningen leda till miljösanktionsavgift och väntas den inte ge annat än böter, får åklagaren åtala bara om åtal är påkallat från allmän synpunkt (MB 29:11). Utred ändå som vanligt.'}],'law':'MB:29:11'},
 'internationella':{'tone':'green','status':'Allmänt åtal','short':'Ingen angivelse krävs.',
   'more':[{'label':'Brott utomlands','text':'Är brottet begånget utomlands kan åtal kräva särskilt förordnande enligt BrB 2:7 a. Det påverkar inte polisens utredning i Sverige.'}],'law':'RB:20:3'}
}

ORD={'första':'1','andra':'2','tredje':'3','fjärde':'4','femte':'5'}
def compact(ref):
  """Kort lagrum i listor, samma stil som övriga kort: 'BrB 15:11 st. 3 jfr st. 2'."""
  r=re.sub(r'(första|andra|tredje|fjärde|femte)–(första|andra|tredje|fjärde|femte) styckena',lambda m:'st. '+ORD[m.group(1)]+'–'+ORD[m.group(2)],ref)
  r=re.sub(r'(första|andra|tredje|fjärde|femte) stycket',lambda m:'st. '+ORD[m.group(1)],r)
  return r.replace('jämfört med','jfr')

def load(root):
  cards=[];dsl={};examples={};laws={};law=None
  for f in sorted(glob.glob(os.path.join(root,'data/special19/*.txt'))):
    lines=[];cur=None
    for raw in open(f,encoding='utf-8').read().split('\n'):
      line=raw.rstrip()
      if not line.strip() or (line.startswith('#') and not line.startswith('## ')):lines.append('');continue
      if line.startswith('LAW '):
        p=[x.strip() for x in line[4:].split('|')];law=p[0];laws[law]={'name':p[1],'sfs':p[2],'short':p[3]};continue
      if line.startswith('X '):continue
      if line.startswith('@ '):
        p=[x.strip() for x in line[2:].split('|')]
        if len(p)!=4:raise SystemExit(f+': @-raden ska ha fyra fält: '+line)
        cur={'id':p[0],'title':p[1],'ref':p[2],'sections':[s.strip().replace(' ','') for s in p[3].split(',')],'law':law,
             'notes':[],'aliases':[],'file':os.path.basename(f)}
        cards.append(cur);examples[cur['id']]=[];lines.append('@ '+p[0]+' | '+p[1]+' | '+p[2]);continue
      if cur is None:raise SystemExit(f+': rad före första kortet: '+line)
      if line.startswith('PEN '):
        p=[x.strip() for x in line[4:].split('|')];cur['min']=float(p[0]);cur['max']=float(p[1]);cur['penalty']=p[2];cur['penaltyShort']=p[3];continue
      if line.startswith('C '):cur['category']=line[2:].strip();continue
      if line.startswith('A '):cur['aliases']=[a.strip() for a in line[2:].split(';') if a.strip()];continue
      if line.startswith('Q '):
        q=[y.strip() for y in line[2:].split('|',1)];cur['rule']=q[0]
        if len(q)>1:cur['ruleNote']=q[1]
        continue
      if line.startswith('ST '):
        x=[y.strip() for y in line[3:].split('|')];cur['st']=x;continue
      if line.startswith('FU '):cur['fu']=[x.strip() for x in line[3:].split('|')];continue
      if line.startswith('N '):cur['notes'].append(line[2:].strip());continue
      if line.startswith('TF '):lab,txt=line[3:].split('|',1);examples[cur['id']].append(['form',txt.strip(),lab.strip()]);continue
      if line.startswith('T '):examples[cur['id']].append(['typ',line[2:].strip()]);continue
      if line.startswith('V '):examples[cur['id']].append(['variant',line[2:].strip()]);continue
      lines.append(line)
    dsl[f]=lines
  ids=[c['id'] for c in cards]
  if len(ids)!=len(set(ids)):raise SystemExit('dubbla kort-id')
  for c in cards:
    for k in ('min','max','penalty','category','rule'):
      if k not in c:raise SystemExit(c['id']+': saknar '+k)
    ex=examples[c['id']]
    if not ex or ex[0][0] not in ('typ','form') or len(ex)>3:raise SystemExit(c['id']+': typexempel ska börja med T (eller TF) och vara högst tre')
  return {'cards':cards,'dsl':dsl,'examples':examples,'laws':laws}

def write(root,S):
  lt=json.load(open(os.path.join(root,'data/special19/lagtext.json'),encoding='utf-8'))
  statutes={};entries=[];fu={}
  for c in S['cards']:
    L=lt[c['law']];info=S['laws'][c['law']]
    texts=[]
    for s in c['sections']:
      if s not in L['sections']:raise SystemExit(c['id']+': lagtext saknas för '+c['law']+' '+s+' – kör special19_lagtext.py')
      texts.append(L['sections'][s])
    for s,t in L['sections'].items():
      parts=s.split(':')
      ref=L['name']+' '+(parts[0]+' kap. '+re.sub(r'([0-9])([a-z])$',r'\1 \2',parts[1]) if len(parts)==2 else re.sub(r'([0-9])([a-z])$',r'\1 \2',parts[0]))+' §'
      statutes[c['law']+':'+s]={'id':c['law']+':'+s,'ref':ref,'text':t,'url':L['url'],'complete':True,'machine':False,'source':'Sveriges riksdag','checked':CHECKED}
    rule=c['rule']
    if c.get('ruleNote'):
      # Eget åtalsvillkor på kortet: "Q plain | text" (grön) eller "Q villkor | text" (gul).
      yellow=rule!='plain';key='x20_'+c['id'].replace('-','_')
      RULES[key]={'tone':'yellow' if yellow else 'green','status':'Särskilt åtalsvillkor' if yellow else 'Allmänt åtal','short':c['ruleNote'] if yellow else 'Ingen angivelse krävs.',
                  'more':[{'label':'Åtalsvillkor','text':c['ruleNote']}],'law':c['law']+':'+c['sections'][-1]}
      rule=key if yellow else key
      c['_custom']=key;c['_yellow']=yellow
    general=rule=='plain' or rule=='internationella' or (c.get('_custom') and not c.get('_yellow'))
    short=info['short']+' '+compact(c['ref'])
    e={'id':c['id'],'title':c['title'],'shortRef':short,'ref':info['name']+' '+c['ref'],'category':c['category'],
       'statute':c['law']+':'+c['sections'][0],'aliases':c['aliases'],
       'penalty':c['penalty'],'penaltyShort':c['penaltyShort'],
       'penaltyRange':{'min':c['min'],'max':c['max'],'fines':bool(re.search(r'böter',c['penalty'],re.I)),'life':bool(re.search(r'livstid',c['penalty'],re.I))},
       'penaltyKind':'statutory','penaltyNote':'Straffskalan enligt '+info['name']+' '+c['ref']+'. Kontrollerad mot aktuell SFS '+CHECKED+'.',
       'penaltyChecked':CHECKED,'penaltySource':info['sfs']+' '+c['ref'],'penaltyRangeVerified':True,
       'custody':'presumption' if c['min']>=1.5 else ('possible' if c['max']>=1 else 'none'),
       'prosecution':'general' if general else 'conditional',
       'prosecutionLabel':'Allmänt åtal' if general else 'Särskilda åtalsvillkor',
       'prosecutionRule':'RB 20:3 – allmänt åtal' if general else 'Se åtalsregeln i '+info['name'],
       'prosecutionDetails':['Allmänt åtal.' if general else RULES.get(rule,{}).get('short','Särskilda åtalsvillkor.')],
       'lawMode':'full','law':'\n\n'.join(texts),'lawSource':info['name']+' '+c['ref'],
       'lawCompletenessVerified':True,'lawCompletenessChecked':CHECKED,'lawCompletenessSourceURL':L['url'],'sourceURL':L['url'],
       'elements':[],'qualifications':[],'facts':[],'stages':c['notes'],'related':[],'typexempel15':[],'investigation':[],'variants':[],
       'reviewStatus':'v19-statute-checked','added19':True}
    if rule!='plain':e['prosecutionStatutoryReview15']={'rule':rule}
    if 'st' in c:
      st=c['st'];e['stagePermissions']='' if st[0]=='-' else st[0]
      if len(st)>1 and st[1]:e['stageSource']=st[1]
      if len(st)>2 and st[2]:e['stageRestriction']=st[2]
    entries.append(e)
    if 'fu' in c:
      f=c['fu']
      if f[0]=='enkel':fu[c['id']]={'cls':'enkel','row':f[1],'note':f[2] if len(f)>2 else None}
      elif f[0]=='villkor':fu[c['id']]={'cls':'villkor','row':f[1],'cond':{'q':f[2],'yes':f[3]=='ja','hint':f[4] if len(f)>4 else None}}
      elif f[0]=='ej':fu[c['id']]={'cls':'ej','row':f[1]}
      else:raise SystemExit(c['id']+': okänd FU-klass')
  js=('/* Brottskatalog 1.9 – nya brottskort (BrB, RB och specialstraffrätt).\n'
      ' * Genereras av scripts/rekvisit19_build.py från data/special19; redigera källfilerna.\n'
      ' * Lagtexten är ordagrann från data.riksdagen.se och kontrollerad '+CHECKED+'. */\n'
      "(()=>{'use strict';\n"
      'const entries='+json.dumps(entries,ensure_ascii=False,separators=(',',':'))+';\n'
      'const statutes='+json.dumps(statutes,ensure_ascii=False,separators=(',',':'))+';\n'
      'const rules='+json.dumps(RULES,ensure_ascii=False,separators=(',',':'))+';\n'
      'const fu='+json.dumps(fu,ensure_ascii=False,separators=(',',':'))+';\n'
      'const W=window.BK_STATUTES=window.BK_STATUTES||{};\n'
      'for(const [k,v] of Object.entries(statutes))if(!W[k])W[k]=v;\n'
      'const P=window.BK_PROSECUTION171;if(P)for(const [k,v] of Object.entries(rules))if(!P.rules[k])P.rules[k]=v;\n'
      'const F=window.BK_FU18;if(F)for(const [id,v] of Object.entries(fu)){if(v.cls===\'villkor\')F.VILLKOR[id]=v;else if(v.cls===\'enkel\')F.ENKEL[id]=v;else if(F.EJ)F.EJ[id]=v;}\n'
      'const cats=window.BK_DATA?.categories;if(cats)for(const e of entries)if(!cats.includes(e.category))cats.push(e.category);\n'
      "window.BK_SPECIAL19={entries,checked:'"+CHECKED+"'};\n"
      '})();\n')
  open(os.path.join(root,'special-19.js'),'w',encoding='utf-8').write(js)
