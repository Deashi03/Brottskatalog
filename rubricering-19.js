/* Brottskatalog 1.9 – rubricering som på domen.
 * När lagen inte har en egen brottsbeteckning för en grad ("Är brottet grovt, döms till fängelse …")
 * skriver domstolen grundbrottets beteckning följt av graden, till exempel "Misshandel, ringa brott".
 * För viss specialstraffrätt anges gärningsformen inom parentes efter den formella rubriceringen.
 * Appen anropar apply() på sin brottslista när den startar, så att granskningsmodulerna arbetar med
 * lagens ursprungliga beteckningar. Den gamla titeln ligger kvar som sökord.
 * Kontrollerat mot BrB t.o.m. SFS 2026:1656 och respektive speciallag 2026-11-04. */
(()=>{'use strict';
const R={
 'ringa-misshandel':'Misshandel, ringa brott',
 'v03-grovt-vallande-till-annans-dod':'Vållande till annans död, grovt brott',
 'v03-grovt-vallande-till-kroppsskada-eller-sjukdom':'Vållande till kroppsskada eller sjukdom, grovt brott',
 'v15-olaga-frihetsberovande-mindre-grovt':'Olaga frihetsberövande, mindre grovt brott',
 'v05-ringa-barnfridsbrott':'Barnfridsbrott, ringa brott',
 'v05-grov-egenmaktighet-med-barn':'Egenmäktighet med barn, grovt brott',
 'v04-ringa-tillgrepp-av-fortskaffningsmedel':'Tillgrepp av fortskaffningsmedel, ringa brott',
 'v05-ringa-svindleri':'Svindleri, ringa brott',
 'v04-ringa-bokforingsbrott':'Bokföringsbrott, ringa brott',
 'v04-grovt-allmanfarlig-vardsloshet':'Allmänfarlig vårdslöshet, grovt brott',
 'v05-grovt-spridande-av-gift-eller-smitta':'Spridande av gift eller smitta, grovt brott',
 'v05-grov-forgoring':'Förgöring, grovt brott',
 'v15-additional-grov-kapning':'Kapning, grovt brott',
 'v15-additional-grovt-sjo-eller-luftfartssabotage':'Sjö- eller luftfartssabotage, grovt brott',
 'v15-additional-grovt-flygplatssabotage':'Flygplatssabotage, grovt brott',
 'v05-ringa-hindrande-av-urkunds-bevisfunktion':'Hindrande av urkunds bevisfunktion, ringa brott',
 'v05-grovt-hindrande-av-urkunds-bevisfunktion':'Hindrande av urkunds bevisfunktion, grovt brott',
 'v15-ringa-signaturforfalskning':'Signaturförfalskning, ringa brott',
 'v15-grov-signaturforfalskning':'Signaturförfalskning, grovt brott',
 'v15-ringa-penningforfalskning':'Penningförfalskning, ringa brott',
 'v05-grov-penningforfalskning':'Penningförfalskning, grovt brott',
 'v15-ringa-olovlig-befattning-med-falska-pengar':'Olovlig befattning med falska pengar, ringa brott',
 'v15-grov-olovlig-befattning-med-falska-pengar':'Olovlig befattning med falska pengar, grovt brott',
 'v15-ringa-markesforfalskning':'Märkesförfalskning, ringa brott',
 'v15-grov-markesforfalskning':'Märkesförfalskning, grovt brott',
 'v15-ringa-forfalskning-av-fast-marke':'Förfalskning av fast märke, ringa brott',
 'v06-ringa-osann-partsutsaga':'Osann partsutsaga, ringa brott',
 'v05-grovt-falskt-atal':'Falskt åtal, grovt brott',
 'v05-grov-bevisforvanskning':'Bevisförvanskning, grovt brott',
 'v06-grovt-missbruk-av-urkund':'Missbruk av urkund, grovt brott',
 'v06-grovt-falskt-larm':'Falskt larm, grovt brott',
 'v05-grovt-otillborligt-verkande-vid-rostning':'Otillbörligt verkande vid röstning, grovt brott',
 'v15-cover-grov-olovlig-underrattelseverksamhet-mot-sverige':'Olovlig underrättelseverksamhet mot Sverige, grovt brott',
 'v15-cover-grov-olovlig-underrattelseverksamhet-mot-frammande-makt':'Olovlig underrättelseverksamhet mot främmande makt, grovt brott',
 'v15-cover-grov-olovlig-underrattelseverksamhet-mot-person':'Olovlig underrättelseverksamhet mot person, grovt brott',
 'v15-war-grovt-vald-eller-hot-mot-forman':'Våld eller hot mot förman, grovt brott',
 'v15-war-grov-olovlig-befattning-med-kemiska-vapen':'Olovlig befattning med kemiska vapen, grovt brott',
 'v15-war-grov-olovlig-befattning-med-minor':'Olovlig befattning med minor, grovt brott',
 'grov-olovlig-korning':'Olovlig körning, grovt brott',
 'traffic16-5':'Smitning från trafikolycksplats, grovt brott',
 'grovt-knivbrott':'Brott mot knivlagen, grovt brott',
 'vapenbrott-mindre':'Vapenbrott, mindre allvarligt brott',
 'vapenbrott-oaktsamt':'Vapenbrott (oaktsamhet)',
 'v09-grov-naringspenningtvatt':'Näringspenningtvätt, grovt brott',
 'v09-ringa-naringspenningtvatt':'Näringspenningtvätt, ringa brott',
 'v09-grovt-forsvarande-av-skattekontroll':'Försvårande av skattekontroll, grovt brott',
 'narkotikabrott-innehav':'Narkotikabrott (innehav)',
 'narkotikabrott-overlatelse':'Narkotikabrott (överlåtelse)',
 'narkotikabrott-framstallning':'Narkotikabrott (framställning)',
 'narkotikabrott-forvarv':'Narkotikabrott (förvärv i överlåtelsesyfte)',
 'narkotikabrott-transport':'Narkotikabrott (transport eller förvaring)',
 'narkotikabrott-forsaljning':'Narkotikabrott (försäljning)',
 'narkotikabrott-framja':'Narkotikabrott (främjande av narkotikahandel)',
 'ringa-narkotikabrott-bruk':'Ringa narkotikabrott (bruk)',
 'ringa-narkotikabrott-innehav':'Ringa narkotikabrott (innehav)',
 'v09-narkotikasmuggling-avsedd-att-saljas':'Narkotikasmuggling (avsedd att säljas)',
 'v09-brott-mot-tillstandsplikten-for-brandfarliga-varor':'Brott mot lagen om brandfarliga och explosiva varor (brandfarliga varor)',
 'v09-brott-mot-tillstandsplikten-for-explosiva-varor':'Brott mot lagen om brandfarliga och explosiva varor (explosiva varor)',
 'v09-grovt-brott-mot-tillstandsplikten-for-explosiva-varor':'Brott mot lagen om brandfarliga och explosiva varor, grovt brott (explosiva varor)',
 'v09-synnerligen-grovt-brott-mot-tillstandsplikten-for-explosiva-varor':'Brott mot lagen om brandfarliga och explosiva varor, synnerligen grovt brott (explosiva varor)'
};
const STAGE={forsok:'Försök till ',forberedelse:'Förberedelse till ',stampling:'Stämpling till '};
const lower=t=>t.charAt(0).toLocaleLowerCase('sv')+t.slice(1);
function apply(c){
 let t=R[c.id];
 if(!t&&c.stageType&&R[c.stageParentId])t=STAGE[c.stageType]+lower(R[c.stageParentId]);
 if(!t||t===c.title)return;
 c.aliases=Array.isArray(c.aliases)?c.aliases:[];
 if(!c.aliases.includes(c.title))c.aliases.push(c.title);
 c.titleBefore19=c.title;c.title=t;
}
window.BK_RUBRICERING19={map:R,apply};
})();
