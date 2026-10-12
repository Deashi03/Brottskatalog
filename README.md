# Brottskatalog 0.7 – polisiärt uppslagsverk

**Öppna i Safari:** https://deashi03.github.io/Brottskatalog/

Arbetsversion. Juridiskt innehåll är inte fullständigt slutgranskat. Använd inte appen som ensam grund för operativa beslut.

## Nyheter i 0.7

- **Tvångsmedel på varje brottskort:** separat meny med 26 tvångsmedel/åtgärder enligt RB 23–28 kap. Snabbkoll för reell husrannsakan, kroppsvisitation, kroppsbesiktning, beslag, avspärrning och kvarhållande av grupp. Övriga i expanderbara grupper.
- **Straffskaleindikatorer:** jämför brottskortets registrerade minimi- och maximistraff med huvudregeln för åtgärden. Indikatorn är inte en rättslig slutsats; misstankegrad, ändamål, undantag, proportionalitet och faktisk situation måste bedömas separat.
- **Beslutsbehörighet:** markering för när en polisman får besluta själv, vid FID (fara i dröjsmål), eller när beslut i princip tillkommer FU-ledare/åklagare/rätt. Särskilda begränsningar anges vid varje åtgärd.
- **Häktning i fyra korta rader:** 24:1, 24:2 punkt 1, 24:2 punkt 2 och sist 24:3 **utredningshäktning**. Inga allmänna gripandelektioner.
- **Praktiska utredningsuppslag:** första patrulls åtgärder prioriteras. Mer ingående uppsåtsprövning, teknisk bevisning och uppföljning flyttas till en egen expanderbar fortsättningsdel.
- **Dubblettstädning:** separata menyn ”Rekvisit att kontrollera” togs bort eftersom den duplicerade rekvisitmenyn. De detaljerade anteckningarna filtrerar också bort överlappande upprepningar; relevant fördjupning behålls.
- **Offline-cache:** båda nya filerna installeras med övriga resurser.

## Avgränsningar

26 åtgärder betyder inte att alla specialregler inom polisrätten och hemliga tvångsmedel är fullständigt modellerade. Hemliga tvångsmedel har katalogbrott och alternativa straffvärderegler, varför appen anger ”särskild prövning” i stället för felaktigt nej vid låg straffskala. Vissa FU-åtgärder kan ha särskild föreskriven beslutsordning. Sammanställningen är kontrollerad mot rättegångsbalkens lydelse den 12 oktober 2026, men inte en individuell juridisk certifiering. Kontrollera särskilda lagar, behörighetsföreskrifter och eventuella lagändringar.

Sökindex och brottsposter från 0.6 är bevarade: 251 sökingångar och 112 ordlistebegrepp. Kvarstående granskningspunkter finns i [kvalitetsrapporten](data/review-summary-06.json). Maskinimporterad lagtext kan vara ofullständig; använd länk till officiell författning vid tveksamhet.

Rättskällor: [Rättegångsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rattegangsbalk-1942740_sfs-1942-740/), [Brottsbalken](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/).

Källmaterial för fältförslag: *Brottsutredning* (kursanteckningar), bearbetat till stöd för första patrull; förslag är inte ett beslut om tvångsmedel.

## Filer

- `coercive-07.js`: tvångsmedelsregler, beslutsbehörighet och straffskaleindikatorer.
- `field-07.js`: brottsspecifikt fältstöd och kompletterande förundersökningsuppslag.
- `index.html`: brottskort, kort häktningsruta, menystädning och modal/dialog.
- `service-worker.js`: versionshanterad PWA-cache.
- `scripts/ui_smoke.mjs`: iPhone-emulerade gränssnittstester.

Offlineanvändning kräver att appen har laddats minst en gång medan nät finns. iOS kan rensa lagring.