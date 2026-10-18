#!/usr/bin/env python3
"""Check official Swedish SFS sources and prepare mechanically imported law provisions.

Do NOT auto-approve penalties, prosecution, custody or legal summaries.
Generated excerpts remain tagged 'machine' until manually checked.
"""
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
SOURCES = json.loads((DATA / "law-sources.json").read_text("utf-8"))["sources"]
STATUS = DATA / "source-status.json"
OUT = DATA / "provisions-generated.js"

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0
    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "nav", "noscript"):
            self.skip += 1
        elif tag in ("p", "div", "br", "h1", "h2", "h3", "h4", "li", "section", "article"):
            self.parts.append("\n")
    def handle_endtag(self, tag):
        if tag in ("script", "style", "nav", "noscript"):
            self.skip = max(0, self.skip - 1)
        elif tag in ("p", "div", "h1", "h2", "h3", "h4", "li", "section", "article"):
            self.parts.append("\n")
    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)
    def text(self):
        return unescape("".join(self.parts))

CHAPTER = re.compile(r"^\s*(\d{1,2})\s*kap\.\s*(?:[A-ZÅÄÖ].*)?$", re.I)
PARAGRAPH = re.compile(r"^\s*(\d+)\s*([a-z]?)\s*§(?!§)\s*(.*)$", re.I)
REVISION = re.compile(r"Ändrad\s*:\s*t\.?o\.?m\.?\s*SFS\s*(\d{4}:\d+)", re.I)

def parse_brb(html):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "noscript"]):
        tag.decompose()
    raw = soup.get_text("\n").replace("\xa0", " ")
    lines = [re.sub(r"[ \t]+", " ", x).strip() for x in raw.splitlines()]
    out, chapter, key, contents = {}, None, None, []
    def flush():
        if key is None or not contents:
            return
        val = "\n".join(x for x in contents if x).strip()
        if len(val) > 20 and len(val) < 14000:
            out.setdefault(key, val)
    for ln in lines:
        if not ln:
            continue
        if re.search(r"^Övergångsbestämmelser", ln, re.I) and len(out) > 100:
            flush(); break
        ch = CHAPTER.match(ln)
        if ch:
            flush()
            chapter=int(ch.group(1));key=None;contents=[]
            continue
        m = PARAGRAPH.match(ln) if chapter is not None else None
        # Split-line statutory citations such as "24 § lagen (1988:688)"
        # are not paragraph headings. Do not create phantom BrB:4:24.
        if m and re.match(r"(?i)^(?:lagen|förordningen|brottsbalken)\s*\(", m.group(3)):
            m = None
        # References to previously encountered paragraphs are commonly
        # wrapped onto a new HTML text line. They must not terminate the
        # active paragraph (for example BrB 6:6 referring to 4 §).
        if m and key is not None:
            # When the preceding line ends in an unfinished statutory
            # cross-reference, preserve the current paragraph even when
            # the cited section number is larger than the current number.
            # Compare with section transitions: a completed paragraph
            # ordinarily ends with punctuation or an SFS amendment marker.
            tail = contents[-1].rstrip() if contents else ""
            incomplete_cross_reference = bool(re.search(
                r"(?i)\b(?:i|av|enligt|eller|samt|till|från|jämför|i\s+enlighet\s+med)\s*$", tail
            ))
            if incomplete_cross_reference:
                m = None
        if m and key is not None and not re.match(r"^/Träder i kraft\b", m.group(3)):
            prev_sec = key.split(":")[-1]
            old_order = re.fullmatch(r"(\d+)([a-z]?)", prev_sec)
            if old_order:
                previous_rank = (int(old_order.group(1)), old_order.group(2))
                candidate_rank = (int(m.group(1)), m.group(2).lower())
                if candidate_rank <= previous_rank:
                    m = None
        if m:
            flush()
            sec = m.group(1) + m.group(2).lower()
            key = f"BrB:{chapter}:{sec}"
            contents = [ln]
        elif key:
            contents.append(ln)
    else:
        flush()
    return out, raw

def main():
    old = json.loads(STATUS.read_text("utf-8")) if STATUS.exists() else {}
    old_checks = {x["id"]:x for x in old.get("sourceChecks", [])}
    checked_at=datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    checks=[]
    generated={}
    errors=[]
    for src in SOURCES:
        sid = src["id"]
        url=f'https://data.riksdagen.se/dokument/sfs-{src["sfs"]}.html'
        prev=old_checks.get(sid,{})
        try:
            request=Request(url, headers={"User-Agent":"BrottskatalogLegalChecker/0.3 (+GitHub project)","Accept":"text/html"})
            with urlopen(request, timeout=35) as response:
                body=response.read().decode("utf-8",errors="replace")
            if len(body)<1000:
                raise ValueError("Source response is too short")
            text=unescape(re.sub(r"<[^>]+>"," ",body)).replace("\xa0"," ")
            version=(REVISION.search(text) or REVISION.search(body))
            version=version.group(1) if version else None
            digest=hashlib.sha256(re.sub(r"\s+"," ",text).encode("utf-8")).hexdigest()
            observed_change=bool(prev.get("observedVersion") and (version != prev.get("observedVersion") or digest != prev.get("digest")))
            verified=src.get("verifiedVersion")
            item={"id":sid,"name":src["name"],"sourceURL":url,"observedVersion":version,
                  "verifiedVersion":verified,"digest":digest,"lastChecked":checked_at,
                  "observedChange":observed_change,
                  "requiresReview":not verified or version != verified,
                  "dependentFields":["lagtext","straffskala","häktning","åtalsregler","rubricering","kvalifikationsgrunder"],
                  "status":"ok"}
            checks.append(item)
            if sid=="BrB":
                parsed,_=parse_brb(body)
                if len(parsed)<100:
                    print("DEBUG sample chapter lines:", repr([x for x in _.splitlines() if "kap." in x][:30]), file=sys.stderr)
                    print("DEBUG sample sections:", repr([x for x in _.splitlines() if "§" in x][:30]), file=sys.stderr)
                    raise ValueError(f"Too few BrB provisions parsed: {len(parsed)}; no new data published")
                for key,value in parsed.items():
                    generated[key]={"id":key,"ref":f"BrB {key.split(':')[1]} kap. {key.split(':')[2]} §",
                                    "text":value,"url":url,"complete":False,"machine":True,"checked":checked_at[:10]}
                print(f"BrB: extracted {len(parsed)} candidate provisions")
            print(f"{sid}: {version or 'version unknown'}; changed={observed_change}")
        except Exception as err:
            errors.append(f"{sid}: {err}")
            checks.append({**prev,"id":sid,"name":src["name"],"sourceURL":url,"status":"error",
                           "error":str(err),"lastAttempt":checked_at,"requiresReview":True})
            print(f"ERROR: {sid}: {err}",file=sys.stderr)
    STATUS.write_text(json.dumps({"schema":1,"lastChecked":checked_at,"sourceChecks":checks,
                                  "note":"Automatisk ändringskontroll. Straffskalor, åtalsregler och tolkningar kräver juridisk granskning."},
                                  ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    if generated:
        payload=json.dumps(generated,ensure_ascii=False,separators=(",",":"))
        OUT.write_text("/* Maskinimporterat underlag från Sveriges riksdag. Ej granskat. */\n"
          +"(()=>{const docs="+payload+";window.BK_STATUTES=window.BK_STATUTES||{};"
          +"for(const [id,p] of Object.entries(docs)){if(!window.BK_STATUTES[id])window.BK_STATUTES[id]=p;}})();\n",
          encoding="utf-8")
    if errors:
        print("\n".join(errors),file=sys.stderr)
        # Avoid silently claiming complete success, while retaining successful checks.
        return 1
    return 0

if __name__=="__main__":
    raise SystemExit(main())
