"""Inventerar straffbestämmelser i nedladdade SFS-texter (data.riksdagen.se, formatet .text).
Kör: python3 -I scripts/sfs_straffinventering.py <katalog med sfs-*.text> <utfil.json>
Tar med paragrafer som dömer ut fängelse eller böter i gällande författningar. Paragrafer med enbart
penningböter och upphävda författningar tas inte med. Resultatet är ett maskinellt underlag och ska
kontrolleras mot lagtexten. Se docs/underlag/saknade-brott-2026-11-13.md."""
import re,os,sys,json,glob,datetime
TODAY='2026-11-13'
NUM={'en':1,'ett':1,'två':2,'tre':3,'fyra':4,'fem':5,'sex':6,'sju':7,'åtta':8,'nio':9,'tio':10,'tolv':12,'fjorton':14,'sexton':16,'arton':18}
def yrs(a,unit):
    v=NUM.get(a)
    if v is None:
        try:v=int(a)
        except:return None
    return v if unit.startswith('år') else v/12
res=[]
for f in sorted(glob.glob(sys.argv[1]+'/*.text')):
    t=open(f,encoding='utf-8',errors='replace').read()
    if len(t)<200:continue
    head,_,body=t.partition('Källa: Regeringskansliet / Lagrummet')
    title=t.split('\n',1)[0].strip()
    m=re.search(r'Upphävd:\s*(\d{4}-\d{2}-\d{2})',head);upph=m.group(1) if m else None
    if upph and upph<=TODAY:continue
    m=re.search(r'Ändrad:\s*t\.o\.m\. SFS (\S+)',head);amended=m.group(1) if m else None
    m=re.search(r'SFS nr:\s*(\S+)',head);sfs=m.group(1) if m else os.path.basename(f)[4:-5].replace('-',':',1)
    m=re.search(r'Departement/myndighet:\s*(.*)',head);dep=m.group(1).strip() if m else ''
    i=body.rfind('\nÖvergångsbestämmelser')
    if i>len(body)*0.5:body=body[:i]
    body=re.sub(r'[ \t]+\n','\n',body)
    parts=re.split(r'\n\n(?=(?:\d+ (?:[a-z] )?kap\. [A-ZÅÄÖ]|\d+ (?:[a-z] )?§ ))',body)
    chap=None;items=[]
    for p in parts:
        mc=re.match(r'(\d+(?: [a-z])?) kap\. [A-ZÅÄÖ]',p)
        if mc:
            chap=mc.group(1).replace(' ','')
            # a chapter heading may be followed directly by sections in same part
        ms=re.search(r'(?:^|\n)(\d+ (?:[a-z] )?)§ ',p)
        if not ms:continue
        pp=re.sub(r'\s+',' ',p)
        if not re.search(r'fängelse|böter',pp):continue
        if not re.search(r'\b(döms|dömes|dömas|straffet är|är straffet|straffas|bestraffas|skall dömas|ska dömas)\b',pp,re.I):continue
        if re.search(r'/Upphör att gälla U:(\d{4}-\d{2}-\d{2})',pp) and re.search(r'/Upphör att gälla U:(\d{4}-\d{2}-\d{2})',pp).group(1)<=TODAY:continue
        future=bool(re.search(r'/Träder i kraft I:',pp[:120]))
        fang=[yrs(a,u) for a,u in re.findall(r'fängelse(?:,| i| på viss tid,)? (?:lägst [\w ]{2,40}? och )?högst (\w+) (år|månader|månad)',pp)]
        fang+=[yrs(a,u) for a,u in re.findall(r'fängelse i (?:lägst )?(\w+) (år|månader) eller',pp)]
        fang=[x for x in fang if x]
        life='livstid' in pp
        hasf=bool(re.search(r'(döms|dömes|dömas|straffet är|skall dömas|ska dömas)[^.]{0,400}fängelse|fängelse[^.]{0,200}(döms|dömes|dömas)',pp))
        b_all=len(re.findall(r'böter',pp));b_pen=len(re.findall(r'penningböter',pp))
        boter=b_all>b_pen
        names=re.findall(r'(?:döms|dömes|dömas)(?: [^.,;]{0,60}?)? för ((?:grov[at]? |synnerligen grov[at]? |ringa )?[a-zåäö][a-zåäö\- ]{3,70}?) till ',pp)
        names+=re.findall(r'[Ff]ör ([a-zåäö][a-zåäö\- ]{3,60}?) döms',pp)
        names=[n for n in dict.fromkeys(names) if not re.match(r'(brott som|det |den |försök|förberedelse|stämpling|medhjälp|medverkan|sådan|ansvar|gärning)',n)]
        if not (hasf or boter):continue
        items.append({'sec':((chap+':') if chap else '')+ms.group(1).strip(),'max':max(fang) if (fang and hasf) else (0 if not hasf else None),'life':life and hasf,'fang':hasf,'boter':boter,'penonly':(not hasf and not boter),'names':names,'future':future,'snip':pp[:260]})
    items=[i for i in items if not i['penonly']]
    if items:
        kind='lag' if re.match(r'(Lag|.*lag|.*balk|.*[Bb]alken|.*ordning) \(',title) and not re.match(r'Förordning|Kungörelse|.*förordning|.*kungörelse|.*instruktion|.*stadga',title) else ('förordning' if re.match(r'(Förordning|.*förordning|Kungörelse|.*kungörelse|.*stadga|.*instruktion)',title) else 'annat')
        res.append({'sfs':sfs,'title':title,'kind':kind,'dep':dep,'amended':amended,'upph':upph,'items':items})
json.dump(res,open(sys.argv[2],'w'),ensure_ascii=False)
import collections
print(len(res),collections.Counter(r['kind'] for r in res))
print('med fängelse',collections.Counter(r['kind'] for r in res if any(i['fang'] for i in r['items'])))
