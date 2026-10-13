#!/usr/bin/env python3
"""Machine import of paragraphs from official Riksdag SFS pages.

This is source *extraction*, not legal verification. Never changes penalties,
custody rules, stages, prosecution rules or review approval timestamps.
"""
import hashlib, json, re, sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parent.parent
TARGET=ROOT/'data'/'special-provisions-generated.js'
STATUS=ROOT/'data'/'special-provisions-status.json'
LAWS={
 'SmuglL':('2000-1225',8),
 'PTBL':('2014-307',5),
 'SkBrL':('1971-69',8),
 'BidrBrL':('2007-612',4),
 'LBE':('2010-1011',12)
}
SECTION=re.compile(r'^(\d{1,3})\s*([a-z]?)\s*§(?!§)(.*)$',re.I)
VERSION=re.compile(r'Ändrad\s*:\s*t\.?\s*o\.?\s*m\.?\s*SFS\s*(\d{4}:\d+)',re.I)
END=re.compile(r'^Övergångsbestämmelser|^Ikraftträdande',re.I)
def extract(raw):
    soup=BeautifulSoup(raw,'html.parser')
    for x in soup(['script','style','nav','noscript']):x.decompose()
    lines=[re.sub(r'[ \t]+',' ',p.replace('\xa0',' ')).strip() for p in soup.get_text('\n').splitlines()]
    found={};key=None;body=[]
    def flush():
        if key is None:return
        txt='\n'.join(body).strip()
        if 30<=len(txt)<=20000:
            # Preserve first occurrence: a later future version must not replace it.
            found.setdefault(key,{'text':txt,'machine':True,'complete':False})
    previous=''
    for line in lines:
        if not line:continue
        if key and END.search(line) and len(found)>3:
            flush();break
        m=SECTION.match(line)
        if m:
            after=m.group(3).strip()
            # A cross-reference at the beginning of a wrapped line is not a new section.
            # e.g. "6 § tullbefogenhetslagen" or standalone "7 §" following "enligt".
            is_reference=bool(after and after[0].islower())
            if not after and previous and not (
                previous.rstrip().endswith(('.',':',';','!','?',')'))
                or (previous[0].isupper() and len(previous)<65 and not previous.startswith('§'))
            ):
                is_reference=True
            if not is_reference:
                flush();key=m.group(1)+m.group(2).lower()
                body=[line]
                previous=line
                continue
        if key:body.append(line)
        previous=line
    else:flush()
    return found,'\n'.join(lines)

def main():
    previous={}
    if STATUS.exists():
        try:previous={r['code']:r for r in json.loads(STATUS.read_text('utf-8')).get('sources',[])}
        except (ValueError,KeyError):previous={}
    now=datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    data={};report=[];errors=[]
    for code,(sfs,minimum) in LAWS.items():
        url='https://data.riksdagen.se/dokument/sfs-'+sfs+'.html'
        try:
            req=Request(url,headers={'User-Agent':'BrottskatalogSourceExtractor/1.2','Accept':'text/html'})
            with urlopen(req,timeout=45) as res:
                body=res.read().decode('utf-8','replace')
            if len(body)<1500:raise ValueError('Unexpectedly short official response')
            sections,normalized=extract(body)
            if len(sections)<minimum:
                raise ValueError(f'Only {len(sections)} provisions; expected at least {minimum}')
            required={
                'SmuglL':{'3':400,'6':800,'6a':250,'6b':200,'14':300},
                'PTBL':{'3':350,'4':100,'5':250,'7':350,'8':100},
                'SkBrL':{'2':200,'4':200,'5':250,'7':500,'8':180,'10':300,'13':250},
                'BidrBrL':{'1':400,'2':300,'3':200,'6a':200},
                'LBE':{'29':300,'29a':300,'30a':100}
            }[code]
            missing=[k for k,v in required.items() if len(sections.get(k,{}).get('text',''))<v]
            if missing:
                raise ValueError('Missing or suspiciously short legal sections: '+', '.join(missing))
            match=VERSION.search(normalized)
            version=match.group(1) if match else None
            digest=hashlib.sha256(normalized.encode('utf-8')).hexdigest()
            data[code]={'sfs':sfs,'sourceURL':url,'sections':sections,'observedVersion':version,'digest':digest,'importedAt':now[:10]}
            report.append({'code':code,'sfs':sfs,'sourceURL':url,'paragraphCount':len(sections),'observedVersion':version,'digest':digest,'importedAt':now,'status':'imported-machine-unverified'})
            print(code,sfs,'paragraphs',len(sections),'version',version)
        except Exception as exc:
            errors.append(f'{code}: {exc}')
            print('ERROR',code,str(exc),file=sys.stderr)
            if code in previous:
                report.append({**previous[code],'status':'failed-new-fetch-prior-status-not-approved','error':str(exc)})
    if errors:
        # Never publish incomplete/mixed imports when remote retrieval is uncertain.
        for err in errors:print(err,file=sys.stderr)
        return 1
    payload=json.dumps(data,ensure_ascii=False,separators=(',',':'))
    js='/* MACHINE-EXTRACTED OFFICIAL SFS TEXT. NOT INDIVIDUALLY LEGALLY VERIFIED. */\n'
    js+='(()=>{window.BK_SPECIAL_EXCERPTS='+payload+';})();\n'
    TARGET.write_text(js,encoding='utf-8')
    STATUS.write_text(json.dumps({'schema':1,'importedAt':now,'sources':report,'warning':'Automatically imported excerpts. Do not infer current operative law, full text, penalties, stage criminalization or prosecutorial status without independent review.'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return 0

if __name__=='__main__':
    raise SystemExit(main())
