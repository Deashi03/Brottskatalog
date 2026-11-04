# Brottskatalog 1.9 – plan

**Datum:** 2026-11-04
**Huvudfokus:** en ny, lättöverskådlig rekvisitvy.
**Därtill:** granskning av tvångsmedelslistan och nya brottskort, främst i specialstraffrätten.

---

## 1. Rekvisitvyn – nuläge

Kartläggning av alla 393 grundbrott:

| Vad | Antal brott |
|---|---|
| Rekvisitlista med alternativa gärningsformer | 271 |
| Enkel rekvisitlista | 122 |
| Extra meny "Ansvarsbegränsningar och hänvisningar" | 387 |
| Extra meny "Förklara rekvisiten" | 387 |
| Extra meny "Brottsgrad och kvalifikationsgrunder", ibland i "Fördjupning om andra brottsgrader" | 382 |
| Extra meny "Förarbeten – 2026 års ändring" | 50 |
| Förklaringsrutor efter listan | 90 |
| Rekvisitrader som hänvisar till paragrafer i stället för att säga vad som gäller | 421 rader i 189 brott |

Före själva listan visas i dag:
- rubriken "Rekvisit – OCH om inget annat anges",
- en granskningsförbehållstext,
- "Rättslig grund: …",
- en länk till riksdagen,
- "Alternativa gärningsformer – minst en av följande strukturer måste vara uppfylld."

---

## 2. Ny rekvisitvy

### 2.1 Bort
1. Menyerna **Ansvarsbegränsningar och hänvisningar**, **Fördjupning om andra brottsgrader**, **Brottsgrad och kvalifikationsgrunder**, **Förklara rekvisiten**, **Förarbeten – 2026 års ändring** och smugglingskortens **Rättelse och åtalsvillkor**.
2. Allt som står före listan. Avsnittet börjar direkt med listan under den enda rubriken **Rekvisit**.
3. Granskningsförbehåll och "Rättslig grund" flyttas till en kort källrad längst ned, till exempel *Källa: BrB 8:1 · Lagtext ↗*.
4. Rader som inte är rekvisit tas bort ur listan, till exempel:
   - "Kontrollera …"
   - "Skilj från …"
   - "får inte mekaniskt blandas ihop med …"
   - "exemplen i lagtexten är inte automatiskt avgörande"

   Det som är juridiskt viktigt flyttas till rätt ställe i den nya strukturen (se 2.3).

### 2.2 Struktur och visuellt språk
Varje rekvisit blir en egen rad med en **färgad etikett**. Etiketten visar vilken typ av rekvisit det är:

| Etikett | Färg | Exempel |
|---|---|---|
| **Gärning** | blå | "tar olovligen", "innehar", "för ett motordrivet fordon" |
| **Objekt** | lila | "något som tillhör annan", "skjutvapen", "narkotika" |
| **Följd** | orange | "skada", "fara för annan", "kroppsskada" |
| **Uppsåt / oaktsamhet** | grön | "tillägnelseuppsåt", "av grov oaktsamhet" |
| **Krets** | grå | "tjänsteman", "den som är skyldig att …" |
| **Grovt om** | röd | kvalifikationsgrunder: "särskilt beaktas om …" |
| **Inte brott om** | streckad ram | ringa fall, befogat ändamål, undantag |

Övriga regler:
- **OCH / ELLER:**
  - Alla rader i en lista måste vara uppfyllda. Det visas med en tunn lodrät linje med texten *och* mellan raderna.
  - Alternativ samlas i en ruta märkt **"Minst ett av:"** med punkter.
- **Alternativa gärningsformer:** visas som flikar högst upp, till exempel *Innehav | Överlåtelse | Transport*. Användaren ser en form i taget i stället för långa staplade listor.
- **Grova och ringa grader:** högst upp står en kompakt rad *"Grundbrott: Stöld (BrB 8:1) ✓"* som kan fällas ut. Därefter följer bara det som skiljer graden från grundbrottet, i en röd **Grovt om**-ruta med texten *helhetsbedömning*.
- **Typexempel:** ligger kvar efter listan som infällt "Exempel".

**Arbetssätt:** jag tar först fram **tre designvarianter** och visar dem på samma tre brott:
- Stöld
- Grovt vapenbrott
- Narkotikabrott med flera gärningsformer

Du väljer en variant, och den byggs sedan för hela katalogen. Samma upplägg användes för åtalsreglerna i 1.7.1.

### 2.3 Textregler (testas automatiskt)
1. Listan säger aldrig "brott som anges i lagtexten", "som avses i bestämmelsen", "enligt 4 §" eller liknande om det som avses kan skrivas ut.
2. Juridiskt viktiga förbehåll skrivs om till rekvisit:
   - "Ringa fall enligt 4 § är inte brott" blir en **Inte brott om**-rad: "fallet är ringa".
   - "Särskild grovhetsbedömning krävs …" blir rubriken i **Grovt om**-rutan.
3. Ett test underkänner rekvisitrader som innehåller "anges i lagtexten", "som avses i", "Kontrollera", "Skilj från" eller en egen paragrafhänvisning ("enligt 1 §").

### 2.4 Hänvisade paragrafer och definitioner
Det här gäller främst speciallagarna. Straffbestämmelsen hänvisar ofta till en annan paragraf ("i strid med 2 §") eller använder ett begrepp som lagen definierar på annat ställe.

- **Hänvisning till en förbudsparagraf:** innehållet skrivs in som egna rekvisit.
  - Exempel: fotoförbudet blir *"tar upp eller sprider bild från rättens sammanträde"* (förbudet i RB 5:9 b), inte "i strid med 5 kap. 9 b §".
- **Definierade begrepp:** visas understrukna i raden. Ett tryck visar lagens egen definition ordagrant, med lagrum och länk. Exempel:

  | Lag | Begrepp och var det definieras |
  |---|---|
  | Narkotikastrafflagen | **narkotika** (8 §) |
  | Vapenlagen (2026:408) | **skjutvapen**, **vapendelar**, **ammunition** (1 kap.) |
  | Lagen om straff för vissa trafikbrott | **motordrivet fordon**, **körkortspliktigt** (lagen om vägtrafikdefinitioner), **alkoholkoncentration** (4 §) |
  | Knivlagen | **allmän plats**, **befogat ändamål** (1 §) |
  | Lagen om brandfarliga och explosiva varor | **brandfarliga** och **explosiva varor** (6 §) |
  | Smugglingslagen | **införsel**, **utförsel**, **tullplikt** (2–3 §§) |
  | Bidragsbrottslagen | **ekonomisk förmån** (1 §) |

- **Grundbrott som en grövre grad hänvisar till:** visas som den utfällbara "Grundbrott"-raden i 2.2. Ett exempel är "rattfylleri enligt 4 § första–tredje styckena föreligger" i grovt rattfylleri.

Alla definitioner hämtas ordagrant från data.riksdagen.se och testas mot lagtexten offline.

---

## 3. Granskning av tvångsmedelslistan (genomförd)

Alla 29 poster är kontrollerade mot gällande rättegångsbalk (t.o.m. SFS 2026:1657). Kontrollen gällde lagrum och brottskrav, det vill säga krav på straffskala.

**Stämmer:**
- medtagande (23:8 första och andra stycket, minimistraff 4 år i andra stycket)
- kvarhållande av grupp (23:8 a)
- kvarstannande (23:9)
- telefon och visitation efter telefon (23:9 a, fängelse krävs för visitation)
- reell husrannsakan (28:1, fängelse)
- husrannsakan i transportmedel (28:2 a, minimistraff 4 år inklusive försök)
- offentlig lokal (28:3 första stycket) och gemensam brottslokal (28:3 andra stycket, 1 år)
- undersökning av annat ställe (28:10)
- genomsökning på distans (28:10 a–b, fängelse)
- biometrisk upplåsning (27:17 f)
- beslag och penningbeslag (27:1, 27:1 a)
- postbeslag (27:3)
- bevarandeföreläggande (27:16–16 a)
- kopiering (27:17 a–b)
- kvarstad och förvar (26 kap.)
- reseförbud (25 kap.)

**Brister som rättas i 1.9:**
1. **"Fingeravtryck och foto" (RB 28:14–14 a) är inaktuell** efter SFS 2025:128. 28:14 omfattar nu fingeravtryck (även handavtryck), fotografi, video, röstprov och handstilsprov, samt avtryck av fot och öra. Fingeravtryck och ansiktsfoto **ska** tas av den som är anhållen eller häktad. Beslutsregeln finns i 28:14 b: polisman vid fara i dröjsmål, och Polismyndigheten för registrering. Posten byter namn, lagrum (28:14–14 b) och text.
2. **Hämtning till förhör (RB 23:7) saknas.** Den som utan giltig orsak inte följer en kallelse får hämtas, inom tio mil. Den läggs till under RB 23.
3. **Kvarhållande av försändelse (RB 27:9) saknas.** Rätten beslutar. Den läggs till under RB 27 för fullständighetens skull.
4. **Tidsgränserna i RB 28:13 a** (kroppsvisitation högst 3 + 3 timmar, kroppsbesiktning högst 6 + 6 timmar) skrivs in i respektive post.
5. Beslutsordningen i alla poster kontrolleras rad för rad mot lagtexten under genomförandet. Avvikelser listas i PR:en.

---

## 4. Nya brottskort

### 4.1 Brottsbalken
Appen ska innehålla alla brott i brottsbalken. En maskinell jämförelse av varje "döms för …" i gällande brottsbalk mot katalogen visar att dessa saknas:

| Brott | Lagrum | Straff |
|---|---|---|
| Grov hets mot folkgrupp | BrB 16:8 | fängelse 6 mån – 4 år |
| Ringa hets mot folkgrupp | BrB 16:8 | böter |
| Vårdslös försäkran | BrB 15:10 andra stycket | böter – fängelse 6 mån |
| Brukande av osann urkund | BrB 15:11 tredje stycket | som osant intygande |

*Olovlig kärnsprängning (BrB 22:6 c) läggs **inte** in. Paragrafen har inte trätt i kraft; den gäller från den dag regeringen bestämmer.*

### 4.2 Rättegångsbalken
| Brott | Lagrum | Straff |
|---|---|---|
| Brott mot fotograferingsförbud vid rättens sammanträde | RB 9:5 a jfr 5:9 b | böter – fängelse 6 mån; ringa fall inte brott |

RB 9:5 (störande av förhandling) ger bara penningböter och utelämnas.

### 4.3 Specialstraffrätt
I dag finns bara nio speciallagar i katalogen:
- narkotikastrafflagen
- vapenlagen
- lagen om straff för vissa trafikbrott
- knivlagen
- smugglingslagen
- skattebrottslagen
- penningtvättslagen
- bidragsbrottslagen
- lagen om brandfarliga och explosiva varor

Genomsökningen av gällande lagtext (data.riksdagen.se) visar många polisrelevanta brott med fängelse i straffskalan som saknas.

**Prioritet 1 – vardagligt polisarbete (förslag till 1.9):**

| Lag | Brott (urval) |
|---|---|
| Lag (1988:688) om kontaktförbud 24–25 §§ | överträdelse av kontaktförbud (fängelse 1 år); överträdelse av utvidgat eller särskilt utvidgat kontaktförbud (2 år); hindrande eller försvårande av elektronisk övervakning, även av oaktsamhet |
| Alkohollag (2010:1622) 11 kap. | olovlig befattning med sprit, olovlig försäljning av alkohol (även grovt), olovligt innehav, olovligt anskaffande (även grovt), olovlig hantering |
| Lag (1991:1969) om förbud mot vissa dopningsmedel | dopningsbrott, ringa och grovt dopningsbrott |
| Lag (1999:42) om förbud mot vissa hälsofarliga varor | brott mot lagen (fängelse 1 år) |
| Ordningslag (1993:1617) | de brott som har fängelse i straffskalan (fängelse 6 mån) |
| Lag (2005:900) om förbud mot maskering | brott mot maskeringsförbudet |
| Lag (2005:321) om tillträdesförbud vid idrottsarrangemang | överträdelse av tillträdesförbud |
| Jaktlag (1987:259) | jaktbrott, grovt jaktbrott, jakthäleri (även grovt) |
| Djurskyddslag (2018:1192) 10 kap. | brott mot djurskyddslagen (fängelse 2 år) |
| Miljöbalk (1998:808) 29 kap. | miljöbrott, grovt miljöbrott, nedskräpning, artskyddsbrott, otillåten miljöverksamhet m.fl. |
| Sjölag (1994:1009) 20 kap. | sjöfylleri, grovt sjöfylleri, vårdslöshet i sjötrafik |
| Luftfartslag (2010:500) 13 kap. | flygfylleri, grovt flygfylleri, grov vårdslöshet i flygtrafik |
| Lag (1990:1157) om säkerhet vid tunnelbana och spårväg | onykterhet i spårtrafik m.m. |
| Skyddslag (2010:305) | obehörigt tillträde till skyddsobjekt, olovlig avbildning av skyddsobjekt, olovlig vattenaktivitet, lämnande av osann uppgift |
| Utlänningslag (2005:716) 20 kap. | människosmuggling (även grov), organiserande av människosmuggling, exploatering av utländsk arbetskraft, handel med arbetstillstånd m.fl. |
| Folkbokföringslag (1991:481) | folkbokföringsbrott (även grovt), främjande av oriktig folkbokföring |
| Lag (1982:316) om förbud mot könsstympning | könsstympning (även grov) |

**Prioritet 2 (förslag till 1.9.1):**
- spellagen: olovlig spelverksamhet, främjande av olovligt spel, spelfusk
- tobakslagen: olovlig tobaksverksamhet m.m.
- upphovsrättslagen: upphovsrättsbrott, även grovt
- varumärkeslagen (2010:1877): varumärkesintrång
- lagen om företagshemligheter: företagsspioneri, olovlig befattning
- lagen om näringsförbud: överträdelse av näringsförbud
- yrkestrafiklagen och taxitrafiklagen: olaga yrkesmässig trafik och olaga taxitrafik
- lagen om transport av farligt gods
- lagen om totalförsvarsplikt
- terroristbrottslagen
- lagen om straff för vissa internationella brott: folkmord, brott mot mänskligheten, krigsförbrytelse

**Bonus:** flera av lagarna står i ÅFS-bilagan, till exempel alkohollagen, jaktlagen, dopningslagen, utlänningslagen, sjölagen och luftfartslagen. FU-ledningsverktyget klassar därför de nya korten rätt direkt.

Varje nytt kort får verifierad straffskala, lagtext offline, åtalsregel, tvångsmedelsprövning, rekvisit i den nya designen och FU-klassning. Allt kontrolleras mot gällande lydelse.

---

## 5. Genomförande

| Steg | Innehåll |
|---|---|
| **AP1 Designval** | Tre varianter av den nya rekvisitvyn på Stöld, Grovt vapenbrott och Narkotikabrott. Du väljer. |
| **AP2 Datamodell** | Varje rekvisit får en typ (gärning, objekt, följd, uppsåt, krets, grovt om, inte brott om). Grader får en hänvisning till grundbrottet. Begrepp kopplas till definitioner. |
| **AP3 Omskrivning** | Alla 393 brott går igenom textreglerna i 2.3. De 421 hänvisningsraderna skrivs ut. |
| **AP4 Gränssnitt** | Ny rekvisitvy, de extra menyerna tas bort och den kompakta källraden läggs till. |
| **AP5 Tvångsmedel** | Rättelserna i avsnitt 3. |
| **AP6 Nya brott** | BrB (4), RB (1) och prioritet 1 i specialstraffrätten. |
| **AP7 Tester** | Textregler, att varje rekvisit har en typ, att definitionerna är ordagranna, att varje nytt kort är komplett, att versionen är rätt, och skärmtest på iPhone. |

**Omfattning:** rekvisitomskrivningen är det största arbetet, med 393 brott och cirka 1 150 förstadiekort som delvis ärver listor. Prioritet 1 är cirka 45 nya kort.

---

## 6. Frågor till dig

1. **Designvarianter:** vill du se tre varianter innan jag bygger (mitt förslag), eller ska jag bygga direkt efter beskrivningen i 2.2?
2. **Speciallagar:** räcker prioritet 1 i 1.9 och prioritet 2 i 1.9.1? Saknas någon lag du vill ha med?
3. **RB 9:1–3 och RB 8:10** (rättegångsmissbruk och obehörig advokattitel) har dagsböter, inte bara penningböter. Enligt appens urvalsregel ska de då med, men de är knappast polisrelevanta. Ska de med eller utelämnas?
4. **Typexempel** efter listan: behålla som infällt "Exempel" (mitt förslag) eller ta bort?
