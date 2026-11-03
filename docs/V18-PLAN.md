# Brottskatalog 1.8 – plan: FU-ledning och åklagarkontakt

**Datum:** 2026-11-03
**Status:** genomförd i 1.8 (`fu-ledning-18.js`, tester `scripts/fu18_test.mjs` och `scripts/fu18_ui_test.mjs`). Frågeflödet förenklades vid genomförandet: målsägande under 15 år och hatbrottsmotiv ligger i flervalsskärmen, och de två försvararfrågorna är en fråga. Högst fem frågor.
**Mål:** ett verktyg som på några sekunder svarar på två frågor för det brott som är öppet:

1. **Leds förundersökningen av åklagare eller polis?**
2. **När ska åklagaren kontaktas?** Svaret skiljer sig beroende på om någon är gripen, och för en gripen person beroende på brottet och omständigheterna.

Inga långa listor per brott. Verktyget ställer bara de frågor som behövs, en i taget och i den ordning som gör vanliga fall snabbast.

---

## 1. Källor

| Källa | Status | Vad den styr |
|---|---|---|
| **RB 23:3** (Lag 2024:784) | Verifierad ordagrant mot data.riksdagen.se (RB t.o.m. SFS 2026:1657) | Åklagaren tar över när saken inte är av enkel beskaffenhet och någon är skäligen misstänkt, eller när särskilda skäl finns. |
| **RB 24:8** (Lag 2014:1410) | Verifierad ordagrant | Den gripne ska förhöras så snart som möjligt, och åklagaren ska skyndsamt underrättas och besluta om anhållande. Polisen får häva gripandet om skäl uppenbart saknas. |
| **PM 2019:11** – Polismyndighetens riktlinjer för ledning av förundersökning av brottmål, med bilaga (bifogad) | Läst i sin helhet. Gäller från 2019-04-01. Polisens tillämpning av ÅFS 2005:9 med samma innehåll. | Avsnitt 2: enkel beskaffenhet enligt bilagan. Avsnitt 3: åklagare leder alltid. Avsnitt 4: åklagaren övertar. Avsnitt 5: underrättelse när ingen är misstänkt. |
| **ÅFS 2005:9**, konsoliderad version (senast ändrad ÅFS 2019:2) | **Verifierad** mot aklagare.se. Åklagarmyndighetens regelförteckning från 2026-09-30 visar att ÅFS 2019:2 fortfarande är den senaste ändringen. Bilagan är identisk med bilagan i PM 2019:11. | Bindande föreskrift: 4 § enkel beskaffenhet (bilagan), 6 § alltid åklagare, 7–8 §§ övertagande, 10 § underrättelse utan misstänkt. |
| **Överenskommelse ÅM2017-2028 / A479.939/2017** om åklagarkontakt inför förhör med gripen (bifogad) | Läst i sin helhet. Omsatt i Polisens riktlinjer **PM 2018:5**, som JO hänvisar till 2024. PM 2018:5 publiceras inte externt, så bilagan du skickade är källan. | När åklagare ska kontaktas före respektive efter 24:8-förhöret. |
| **RåR 2017:3** Rätten till försvarare vid förhör med misstänkt över 18 år, konsoliderad (senast ändrad 2020-09-01) | **Verifierad** mot aklagare.se och regelförteckningen. | Åklagarledd FU: kontakta åklagaren före förhör (huvudregel). Gripen för brott av enkel beskaffenhet: förhör kan normalt hållas utan att åklagaren kontaktas först. Bekräftar överenskommelsen offentligt. |
| **RåR 2006:3** Handläggning av ungdomsärenden, konsoliderad (senast ändrad 2026-09-10) | **Verifierad** mot aklagare.se. Kapitel 4 och bilaga 2 (flödesschema vid anmält gripande av ungdom). | Ung misstänkt: försvarare vid förhör i sak i nästan alla fall. Om försvarare inte kan närvara hålls bara ett delgivningsförhör. Åklagaren bedömer anhållande, och gripandet hävs om straffvärdet ligger på bötesnivå. |
| **BrB 1:6 andra stycket** (Lag 2026:1528, gäller t.o.m. 2031-09-09) | Verifierad ordagrant. Finns redan i appen (`age14-offence-scope-15.js`). | En 14-åring är straffmyndig för brott med minimistraff ≥ 4 år. Används i ungdomsgrenen. |
| **LUL 2, 5, 23, 24, 35 §§** (Lag t.o.m. SFS 2026:1662) | Verifierade ordagrant | FU mot under 18 år leds av åklagare eller förordnad polis. Offentlig försvarare ska förordnas om behov inte uppenbart saknas. Under 15 år gäller särskilda regler. |
| **Förundersökningskungörelsen 2 §** (t.o.m. SFS 2026:1808) | Verifierad ordagrant | Vid FU mot under 18 år ska åklagaren alltid hållas underrättad, om det inte är obehövligt. |
| **Förordning 2014:1106** (t.o.m. SFS 2025:1068) | Verifierad ordagrant | Brott av anställda inom polisen, polisstudenter, vissa uppdragstagare samt åklagare, domare m.fl. ska omedelbart till Avdelningen för särskilda utredningar och vidare till åklagare. |

> **Verifieringen är klar.** Bilagan är från 2017–2019 och nämner till exempel *vapenlagen (1996:67)*, som ersatts av 2026:408. Verktyget behandlar efterträdande lagar så här: brott enligt nya vapenlagen 2026:408 klassas som enkla bara i de fall som motsvarar de tidigare enkla brotten, alltså inte grova eller synnerligen grova brott, och kortet får en notis. Brott som tillkommit efter 2019 och inte nämns i bilagan räknas som **inte enkla**, utom specialstraffrättsliga brott med max ≤ 6 månader.

---

## 2. Placering i appen

- En ny rad direkt under **"Tvångsmedel – översikt"** i brottskortet: **"FU-ledning och åklagarkontakt"**.
- Raden öppnar en kort startruta med knappen **"Starta"**.
- Verktyget öppnas i den vanliga bottenrutan. Varje skärm har en fråga och stora **Ja/Nej**-knappar, en bakåtknapp och en enkel stegindikator.
- Resultatet visas på **två rader**, med en knapp till lagrummet eller riktlinjen bakom varje svar och knappen "Börja om".

---

## 3. Vad appen redan vet om brottet

Detta fylls i automatiskt från brottskortet och frågas aldrig:

| Uppgift | Används till |
|---|---|
| Om brottet står i **bilagan** (enkel beskaffenhet), med villkor som "ej grovt" och "ej genom brand" | Avgör om omständighetsfrågorna behövs alls |
| **Brottstyp:** brott mot liv/hälsa/frihet/frid, sexualbrott, egendomsbrott | Avgör vilka omständighetsfrågor som är relevanta |
| **Straffskala:** max ≥ 2 år, min ≥ 4 år | Avsnitt 4.1 p.5 (målsägande under 15) och avsnitt 5 (underrättelse utan misstänkt) |
| **Specialstraffrätt:** listad lag eller max ≤ 6 månader | Bilagans regel för övriga specialstraffrättsliga brott |

Ett nytt datalager, `fu-ledning-18.js`, kopplar alla cirka 393 grundbrott till bilagan. Ett test kräver att varje kort har en klassning: *enkel*, *enkel med villkor* eller *inte enkel*.

---

## 4. Frågorna – i ordning och med hoppregler

Frågorna med * ställs **bara** när de kan ändra svaret.

| # | Fråga | Ställs när | Konsekvens |
|---|---|---|---|
| **1** | **Är någon gripen?** | Alltid | Styr hela åklagarkontakten. |
| **2** | **Är någon skäligen misstänkt?** | Bara om ingen är gripen. Den som är gripen är alltid misstänkt. | RB 23:3: övertagandet sker först när någon är skäligen misstänkt. |
| 3* | **Villkor i bilagan**, till exempel *"Skedde det i samband med en trafikolycka?"*, *"Var tjänstemannen polis, åklagare eller domare?"* eller *"Skedde skadegörelsen genom brand?"* | Bara för de få brott som har sådana villkor | Avgör om brottet är av enkel beskaffenhet. |
| 4* | **Var det våld eller hot om våld mot en närstående eller tidigare närstående?** | Brottet är av enkel beskaffenhet och kan innefatta våld eller hot (t.ex. misshandel, olaga hot, ofredande, hemfridsbrott) | Ja → **åklagarledd**, även utan misstänkt (avsnitt 3 p.1). |
| 5* | **Hur gammal var målsäganden?** (Under 15 / 15–17 / 18 eller äldre) | a) Sexualbrott som är av enkel beskaffenhet, eller b) brott mot liv/hälsa/frihet/frid med max ≥ 2 år när någon är misstänkt | Sexualbrott och under 18 → åklagarledd (avsnitt 3 p.2). Under 15 och fall b → åklagarledd (avsnitt 4.1 p.5). |
| 6* | **Finns tecken på hatbrottsmotiv?** (ras, hudfärg, ursprung, tro, sexuell läggning, könsöverskridande identitet m.m.) | Någon är misstänkt och brottet är av enkel beskaffenhet | Ja → åklagarledd (avsnitt 4.1 p.6). |
| 7* | **Är den misstänkte polisanställd, polisstudent, åklagare eller domare?** | Någon är misstänkt | Ja → åklagarledd. Lämna omedelbart till Avdelningen för särskilda utredningar (förordning 2014:1106). Undantag för vissa trafik- och ordningsbotsfall visas i fördjupningen. |
| 8* | **Gäller något av följande?** (flerval på en skärm, med "Inget av detta" överst) – kontaktförbud har sökts; tvångsmedel utöver gripande, beslag, kroppsvisitation, kroppsbesiktning, foto/fingeravtryck, avspärrning och husrannsakan av mindre omfattning behövs; barn under 15 ska höras och åklagare bör leda; den misstänktes psykiska status avviker påtagligt; internationellt (utlämning, EIO, frysning); bevistalan eller företagsbot; brottet är svårbedömt | Brottet är av enkel beskaffenhet och inget ovan har redan gett åklagarledd | Någon markerad → åklagarledd (avsnitt 4 st.1–2). |
| 9* | **Är den misstänkte under 18 år, eller kan vara det?** | Bara om någon är gripen och FU:n är polisledd | Ja → kontakta åklagare **före** förhöret (överenskommelsen, LUL 24 §, RåR 2006:3). Är den misstänkte under 15 visas en varning: en 14-åring är straffmyndig bara om brottet har minimistraff ≥ 4 år (BrB 1:6), och annars gäller LUL 31 §. Appen vet redan om brottet når gränsen. |
| 10* | **Vill den misstänkte ha försvarare?** | Gripen, polisledd och vuxen | Ja → kontakta åklagare **före** förhöret för prövning av försvararfrågan. |
| 11* | **Bedömer du ändå att det finns behov av försvarare?** | Svaret på fråga 10 var nej | Ja → kontakta åklagare **före** förhöret. |

**Så kort blir det i vanliga fall:**
- **Grov stöld, inte gripen, misstänkt finns:** 2 frågor. Brottet är inte av enkel beskaffenhet → åklagarledd, kontakta åklagare snarast.
- **Snatteri (ringa stöld), gripen vuxen som inte vill ha försvarare:** cirka 6 frågor → polisledd, förhör först och därefter skyndsam anmälan till åklagare.
- **Misshandel mot sambo, gripen:** 2 frågor (fråga 1 och 4) → åklagarledd, kontakta åklagare före förhöret.

---

## 5. Resultatet

Två rader, utan scenarielistor:

**1. FU-ledning:** *Åklagarledd* eller *Polisledd*, med en mening om skälet, till exempel "Brottet är inte av enkel beskaffenhet och någon är misstänkt (RB 23:3)".

**2. Åklagarkontakt:**

| Läge | Besked |
|---|---|
| Gripen + åklagarledd | **Före förhöret** med den gripne. |
| Gripen + polisledd + (under 18 eller försvararfråga) | **Före förhöret.** |
| Gripen + polisledd + vuxen + ingen försvararfråga | **Efter förhöret:** anmäl gripandet skyndsamt till åklagaren, som beslutar om anhållande (RB 24:8). Polisen får häva gripandet om skäl uppenbart saknas. |
| Inte gripen + åklagarledd | **Snarast:** överlämna ärendet till åklagare. |
| Inte gripen + ingen misstänkt + brott med min ≥ 4 år (eller försök, förberedelse, stämpling till sådant) | **Underrätta åklagare genast** (avsnitt 5). |
| Inte gripen + ingen misstänkt + brott som inte är av enkel beskaffenhet | Polisen leder tills vidare. **Kontakta åklagare när någon blir skäligen misstänkt.** |
| Inte gripen + polisledd | **Ingen åklagarkontakt behövs nu.** Misstänkt under 18: håll åklagaren underrättad om utredningen (FUK 2 §). |

**Inför kontakten** (visas när åklagare ska kontaktas): gör elektronisk lottning (registrera brottsmisstanken först), kör MR/BR och var påläst om vilka beslut och tvångsmedel som redan har verkställts.

---

## 6. Genomförande

| Steg | Innehåll |
|---|---|
| **AP1 Data** | `fu-ledning-18.js`: bilageklassning för alla grundbrott, villkor (ej grovt, trafikolycka m.m.), brottstyp och flaggor. **Förstadier ingår inte i 1.8** (se avsnitt 7). |
| **AP2 Logik** | En ren funktion `assess(brott, svar)` som returnerar nästa fråga eller resultatet. All hopplogik på ett ställe. |
| **AP3 Gränssnitt** | Ny rad under Tvångsmedel, frågeruta, resultatruta och länkar till lagrum och riktlinjer. Riktlinjernas text visas som sammanfattning med källhänvisning, inte som lagtext. |
| **AP4 Tester** | Enhetstester av alla grenar, inklusive att onödiga frågor aldrig ställs, och ett webbläsartest av fem typfall. Täckningstest: alla kort har bilageklassning. |
| **AP5 Slutkontroll** | Varje bilagerad i datan citeras med sidhänvisning till ÅFS 2005:9 (konsoliderad). Ett test kontrollerar att alla 60-tal bilagerader har en träff i katalogen. |

**Uppskattad omfattning:** som 1.7.1 (en ny modul, en ny ruta, cirka 300 rader logik och data plus tester).

---

## 7. Beslut

| Fråga | Beslut |
|---|---|
| Bilagans aktualitet | Verifierad mot www.aklagare.se: ÅFS 2005:9 är oförändrad sedan 2019-04-01 enligt regelförteckningen från 2026-09-30. |
| Förstadier (försök, förberedelse, stämpling) | **Avvaktar** tills du har fått svar från en åklagare. I 1.8 visas raden inte på förstadiekort. Undantaget är underrättelseregeln när ingen är misstänkt (ÅFS 10 §), som uttryckligen omfattar förstadier till brott med minimistraff ≥ 4 år. Den visas i stället som en upplysning på huvudbrottets kort. |
| Lokala rutiner | Inga. Verktyget bygger enbart på nationella regler. |

## 8. Klassning av katalogens brott mot bilagan

| Klass | Regel | Exempel |
|---|---|---|
| **Enkel** | Brottet står i bilagan utan villkor. | Misshandel, stöld, grov stöld, ringa stöld, bedrägeri, skadegörelse, olaga intrång, rattfylleri |
| **Enkel med villkor** | Villkoret frågas i fråga 3. | *Vållande till annans död / kroppsskada:* bara i samband med trafikolycka. *Skadegörelse, grov skadegörelse:* inte genom brand. *Våld eller hot mot / förgripelse mot tjänsteman:* inte mot polis, åklagare eller domare. *Sexuellt ofredande:* bara enligt 6:10 andra stycket. *Häleri:* bara avseende egendom som frånhänts annan genom brott. |
| **Enkel genom grad** | Bara den grad som bilagan nämner. | Olaga hot (inte grovt), jaktbrott (inte grovt), narkotikabrott bara enligt 1 § första stycket 1 och 6 NSL (överlåtelse respektive innehav, bruk eller annan befattning). Om ringa narkotikabrott (2 §, som hänvisar till 1 §) omfattas markeras för granskning, och grovt narkotikabrott är inte enkelt |
| **Specialstraffrätt** | Listad lag, eller max ≤ fängelse 6 månader. | Knivlagen, alkohollagen, trafikbrottslagen. Utlänningslagen utom 20:7–9. |
| **Inte enkel** | Allt annat, inklusive nya brott efter 2019. | Rån, grov misshandel, våldtäkt, olaga tvång, grovt olaga hot, narkotikabrott genom framställning eller förvärv i överlåtelsesyfte |

Varje kort i datan får en källhänvisning till bilagans rad. Osäkra fall märks för manuell granskning innan publicering och listas i PR:en.
