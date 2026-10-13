/* Brottskatalog 0.7 – prioriterade åtgärder på plats. Ingen automatiserad tvångsmedelsbehörighet. */
(()=>{'use strict';const D=window.BK_DATA;if(!D)return;
const A={
'missbruk av offentlig ställning':[
 ['Offentlig funktion och tillämplig författning','Dokumentera tjänst, uppdrag eller annan offentlig verksamhet och vilket konkret handlande eller vilken underlåtenhet som strider mot lag eller annan författning.'],
 ['Syfte och otillbörlig förmån eller nackdel','Anteckna vilka konkreta omständigheter som talar för avsikten att gynna sig själv/annan otillbörligt eller otillbörligt missgynna någon annan. Registrera även uppgifter som talar emot uppsåt.'],
 ['Beslut och spårbarhet','Identifiera beslut, diarienummer, behörighetsnivå, dokumenterade kontakter och tidslinje. Säkring av loggar eller handlingar kräver eget lagligt stöd.'],
 ['Avgränsning mot tjänstefel','Pröva först om gärningen ligger inom myndighetsutövning och kan omfattas av BrB 20:1. Missbruk av offentlig ställning enligt 20:2 är subsidiärt. Beakta gärningsdatum från 2026-08-01.',1]],
'tjänstefel':[
 ['Myndighetsutövning','Precisera den myndighetsutövning handlingen eller underlåtenheten hör till och vilken bestämmelse, instruktion eller uppgift som åsidosatts.'],
 ['Handlingsförlopp och beslutsmaterial','Bevara uppgifter om tidslinje, beslut, ansvarsfördelning, eventuella kontakter och relevanta handlingar. Särskilt dokumentera egna objektiva iakttagelser.'],
 ['Uppsåt eller oaktsamhet','Identifiera faktiska omständigheter kring gärningspersonens kunskap, uppdrag och möjliga förklaringar; gör inte automatiskt oaktsamhet till uppsåt.'],
 ['Ringa eller grovt','Pröva undantaget för ringa gärningar, och vid grovt tjänstefel särskilt uppsåt samt kvalificerande omständigheter. Gällande minimistraff sedan 2026-08-01: 1 år 6 månader.',1]],
'brott mot tystnadsplikt':[
 ['Uppgift och författningsstöd','Identifiera exakt uppgift, hur den röjts eller utnyttjats, och tillämplig sekretess- eller tystnadspliktsregel.'],
 ['Mottagare och tidslinje','Dokumentera vem som fick informationen, i vilket sammanhang, uppgiftens skyddsintresse och vilka spår som finns.'],
 ['Uppsåt, oaktsamhet och undantag','Separera uppsåtligt röjande/utnyttjande från oaktsam gärning (särskild bötesregel). Ringa gärning är inte straffbar.'],
 ['Åtalsvillkor och grad','Kontrollera om tystnadsplikten gäller till förmån för enskild målsägande enligt BrB 20:5. Vid grovt brott: allvarlig skada, många uppgifter eller särskilt farlig art.',1]],
'stöld':[
['Gods och fyndplats','Notera vad som tagits, var det fanns och vem som hade det. Fotografera relevanta fyndförhållanden.'],
['Värde och ägare','Identifiera målsägande, vara och ungefärligt värde; notera om kvitto eller märkning finns.'],
['Vittnen och kamera','Ta kontaktuppgifter till personal/vittnen och lokalisera kameror. Se till att film kan bevaras innan den skrivs över.'],
['Fortsatt prövning','Vid oklara fall: besittningsövergång, fullbordan och tillägnelseuppsåt.',1]],
'grov stöld':[
['Plats och tillvägagångssätt','Dokumentera om godset tagits från person, omedelbar närhet eller i samband med bostadsintrång.'],
['Gods och följder','Identifiera egendom, ungefärligt värde och eventuella särskilt kännbara följder.'],
['Vittnen och farliga moment','Notera hot, vapen, skador, flera gärningspersoner och möjliga kameror.'],
['Fortsatt gradbedömning','Sammanväg kvalifikationsgrunder, värde och alternativa rubriceringar.',1]],
'misshandel':[
['Skador och vård','Fråga om smärta och vårdbehov. Fotografera synliga skador och notera var på kroppen de finns.'],
['Våldsförlopp','Notera slag/sparkar, tillhyggen, träffpunkter och om någon legat ned eller saknat möjlighet att värja sig.'],
['Vittnen och andra versioner','Ta kontaktuppgifter till vittnen och kolla kameror. Anteckna spontana uppgifter om nödvärn eller alternativt händelseförlopp.'],
['Medicinsk komplettering','Säkerställ vid behov att relevanta vårduppgifter och rättsintyg inhämtas senare.',1]],
'grov misshandel':[
['Akut vård och skador','Prioritera vård och säkerhet. Dokumentera synliga skador och uppgiven smärta.'],
['Hur våldet utförts','Notera våld mot huvud/hals, tillhyggen, sparkar mot liggande, flera angripare eller fortsatt våld.'],
['Vittnen och spår','Identifiera möjliga vittnen, film och tillhyggen; dokumentera fyndplats.'],
['Fördjupning','Medicinsk analys av livsfara och slutlig gradbedömning kan göras senare.',1]],
'rån':[
['Våld och ordagranna hot','Klargör vad som sades och gjordes, vilket föremål som visades och eventuella skador.'],
['Gods eller framtvingad handling','Notera vad som togs, eller vilken överföring/handling målsäganden tvingades göra.'],
['Signalement, flykt och kamera','Ta färska signalement, flyktväg och vittnesuppgifter och lokalisera möjliga filmer.'],
['Senare gradbedömning','Vid behov utreds motvärn och särskilda kvalifikationsgrunder.',1]],
'olaga hot':[
['Ordagranna hot','Dokumentera uttrycken, gester, eventuella vapen och situationen.'],
['Målsägandens reaktion','Fråga hur hotet uppfattades, vad som inträffade före/efter och om skyddsbehov finns.'],
['Bevarbara spår','Ta kontaktuppgifter till vittnen och notera meddelanden eller inspelningar som finns.']],
'ofredande':[
['Vad hände?','Dokumentera exakt handling, plats, tidpunkt och eventuella upprepningar.'],
['Hur upplevdes beteendet?','Anteckna konkret påverkan på den utsatte utan att dra slutsatser åt personen.'],
['Spår','Identifiera vittnen, meddelanden och inspelningar.']],
'rattfylleri':[
['Förare och färd','Fastställ vem som körde, när och var. Notera egna iakttagelser eller vittnen.'],
['Tidslinje och prov','Dokumentera körtid och provtider; följ gällande rutiner och beslutsordning.'],
['Efterförtäring','Dokumentera om personen uppger intag efter körningen eller om andra uppgifter påverkar tidslinjen.']],
'olovlig körning':[
['Vem körde?','Fastställ förare, fordon, plats och faktisk körning.'],
['Behörighet','Kontrollera körkort, giltighet, återkallelse, spärrtid och eventuella villkor.'],
['Grov variant','Notera återkallelse och tillgängliga uppgifter om upprepade gärningar.']],
'brott mot knivlagen':[
['Plats och bärande','Ange var föremålet fanns, hur tillgängligt det var och platsens karaktär.'],
['Beskriv föremålet','Fotografera och notera typ, storlek och relevanta egenskaper.'],
['Möjlig legitim förklaring','Fråga kort om arbete, fritidsaktivitet eller transport. Notera eventuell pågående konflikt.']],
'bedrägeri':[
['Vilken uppgift var fel?','Dokumentera vad som påstods, av vem och i vilken kontakt med målsäganden.'],
['Betalning och mottagare','Anteckna belopp, datum, mottagarkonto och vilken disposition som gjorts.'],
['Bevara original','Notera chattar, kvitton, annonser och transaktions-ID som målsäganden kan bevara.'],
['Ekonomisk vidareutredning','Fortsatt spårning och prövning av uppsåt/avtalsinvändningar kan behövas.',1]],
'skadegörelse':[
['Fotografera skadan','Dokumentera plats och konkret skada samt vad som förstörts eller förändrats.'],
['Tid och personer','Identifiera ägare, möjliga vittnen, kamera och ungefärlig tidpunkt.'],
['Kostnad och tidigare skick','Notera uppgiven skadekostnad och om tidigare bilder eller reparationsunderlag finns.']],
'narkotikabrott':[
['Fyndplats och innehav','Ange var substansen påträffats och vilka faktiska iakttagelser som knyter den till personen.'],
['Typ och mängd','Notera utseende, uppskattad mängd, förpackning samt hantering av eventuellt beslag/prov.'],
['Synlig gärningsform','Dokumentera observationer av bruk, innehav eller överlåtelse utan att anta syftet.'],
['Analys och vidareutredning','Substansanalys och eventuell digital eller ekonomisk spårning sker i fortsatt utredning.',1]],
'urkundsförfalskning':[
['Vad användes?','Dokumentera fysisk eller digital handling och vem som anges som utställare.'],
['Avvikelser','Notera synliga avvikelser och hur handlingen visades eller användes.'],
['Personer och original','Identifiera den som använde handlingen, relevanta vittnen och var originalet finns.']],
'olovlig energiavledning':[
['Plats och synliga spår','Dokumentera mätare, plombering och synliga förbindelser utan att röra elinstallation.'],
['Ansvarig och åtkomst','Notera abonnent, användare och vilka som haft tillgång till anläggningen.'],
['Kontakt med nätägare','Identifiera tekniskt ansvarig som kan bevara mätdata och bedöma elsäkerhet.'],
['Teknisk beräkning','Nätägare/sakkunnig får senare bedöma mätserier, förbrukning och felkällor.',1]]
};
const G={
'Person':[['Skador och händelse','Dokumentera konkret handlande, uppgiven effekt och eventuella vårdbehov.'],['Vittnen och plats','Identifiera personer som sett något, relevanta kameror och möjliga spår.'],['Säkerhet','Notera om någon behöver akut skydd eller vård.']],
'Tillgrepp':[['Gods och rådighet','Notera vad som togs, var det fanns och vem som förfogade över det.'],['Värde och målsägande','Dokumentera varans identitet och ungefärliga värde.'],['Bevissäkring','Identifiera vittnen, kamera och var eventuell film kan bevaras.']],
'Narkotika':A['narkotikabrott'],
'Vapen':[['Föremål och plats','Dokumentera vad som påträffats, var och hos vem. Prioritera säker hantering.'],['Tillstånd','Kontrollera relevanta innehavs- och tillståndsuppgifter.'],['Vittnen och kontext','Notera vem som sett innehavet och om hot eller farligt sammanhang förekommit.']],
'Trafik':[['Förare och fordon','Identifiera vem som körde, fordonet och färdsträckan.'],['Direkta kontroller','Kontrollera relevanta behörigheter och omständigheter.'],['Vittnen och tider','Dokumentera när händelsen inträffade och relevanta iakttagelser.']],
'Sexualbrott':[['Trygghet och vård','Prioritera den utsattes säkerhet, vårdbehov och tillämpliga särskilda rutiner.'],['Färska uppgifter','Notera tider, platser, möjliga vittnen och vilka digitala spår som riskerar försvinna. Undvik ledande frågor.'],['Spårsäkring','Initiera vid behov rätt medicinsk spårsäkring genom behörig personal.']],
'Förmögenhet':A['bedrägeri'],
'Egendom':A['skadegörelse'],
'Frid':A['olaga hot'],
'Smuggling':[
 ['Varans art och mängd','Notera vad varan är, antal/vikt, märkning, emballage, förvaring och vem som hade rådighet över den. Hantera farliga ämnen genom behörig personal.'],
 ['Gränspassage och deklaration','Dokumentera var, när och hur varan förts in/ut eller skulle föras; notera tillgängliga tullhandlingar, deklarationer och tillstånd.'],
 ['Personer och transport','Notera förare, mottagare, avsändare, transportmedel, färdväg och möjliga vittnen/kameror.'],
 ['Fördjupning','Kontrollera särskild brottsvariant och eventuellt konkurrerande vapen-, narkotika- eller explosivvarubrott; tulluppgifter och förstadier kräver vidare kontroll.',1]],
'Ekonomisk brottslighet':[
 ['Pengar och egendom','Identifiera egendom och eventuellt belopp, konton, betalningsmottagare och tidpunkt. Registrera uppgifternas källa.'],
 ['Transaktionskedja','Säkra uppgift om betalningsvägar, överföringar, kontanter, handlingar och berörda personer. Spara originalmeddelanden och kvitton.'],
 ['Misstänkt samband','Notera konkreta uppgifter om egendomens möjliga brottsliga ursprung eller annan otillbörlig hantering utan att förutsätta att sambandet är bevisat.'],
 ['Fortsatt ekonomisk utredning','Spårning, transaktionsanalys och kontroll av bakomliggande brottslighet prövas i fortsatt förundersökning.',1]],
'Skattebrott':[
 ['Uppgift och skyldighet','Precisera vilken deklaration, skatteuppgift, bokföringsskyldighet eller underlåtenhet som berörs samt relevant tidsperiod.'],
 ['Underlag och avvikelse','Dokumentera belopp och tillgängliga originalhandlingar, verifikationer eller uppgifter som påstås vara felaktiga.'],
 ['Beslut och datum','Notera relevanta beslut, betalningar och kontroller utan att anta brott enbart för att en deklaration är fel.'],
 ['Vidare kontroll','Skatteverket och FU-ledaren får bedöma skatteberäkning, fara för skatteundandragande och särskilda regler om rättelse/åtalsprövning.',1]],
'Bidragsbrott':[
 ['Förmån och beslut','Notera aktuell ersättning eller förmån, beslutsfattande myndighet samt utbetalningar och tidsperioder.'],
 ['Lämnad uppgift och förändring','Identifiera exakt uppgift eller anmälningsskyldighet som kan vara aktuell och vilka förändringar som har inträffat.'],
 ['Dokumentation','Anteckna handlingar, kommunikation och eventuella motsägande eller förklarande uppgifter.'],
 ['Fördjupning','Kontrollera med berörd myndighet vad som varit avgörande för utbetalningen och särskilda rättelse-/åtalsförutsättningar.',1]],
'Explosiva varor':[
 ['Omedelbar säkerhet','Rör inte misstänkt instabila explosiva ämnen. Prioritera avstånd, avspärrning och kontakt med relevant specialistfunktion.'],
 ['Föremål och plats','Dokumentera säkerhetsmässigt möjliga observationer av föremål, emballage, antal, plats och åtkomst utan att manipulera föremålet.'],
 ['Tillstånd och ansvar','Identifiera ansvarig innehavare, eventuell verksamhet, förvaring och uppgifter om tillstånd och hantering.'],
 ['Fortsatt utredning','Låt sakkunnig bedöma explosivvaruklassning, konstruktion, mängd och säker provhantering; pröva relevanta grader samt förhållandet till smugglingslagen.',1]]

};
const fallback=[['Vad har hänt?','Dokumentera plats, tid, konkret gärning och berörda personer.'],['Vittnen och spår','Identifiera relevanta iakttagelser, inspelningar och bevis som riskerar att försvinna.'],['Avvikande uppgifter','Anteckna spontana uppgifter som talar för annat händelseförlopp eller annan rubricering.']];
for(const c of D.crimes){
 const t=String(c.title||'').toLocaleLowerCase('sv');
 const base=t.replace(/^(?:synnerligen grovt?|grovt?|ringa)\s+/,'');
 let plan=A[t]||A[base]||G[c.category]||fallback;
 c.investigation=plan.map(([title,how,later])=>({title,how,phase:later?'followup':'field'}));
}
D.release='1.3';
})();