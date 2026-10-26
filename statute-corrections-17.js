/* Brottskatalog 1.7 – rättelser av den maskinimporterade offline-lagtexten.
 * Kontrollerat 2026-10-26 mot data.riksdagen.se (BrB t.o.m. SFS 2026:1656, RB t.o.m. SFS 2026:1657):
 * 621 av 632 lagrade BrB/RB-texter är identiska med officiell lydelse. Följande nycklar togs bort:
 * - påhittade paragrafnycklar som uppstått när importen tolkat en hänvisning i löptext
 *   (till exempel "24 § lagen om kontaktförbud") som början på en ny paragraf;
 * - verkliga påföljdsparagrafer vars lagrade text var ett fragment av en annan paragraf.
 *   Kapitel 26–28 och 38 har parallella lydelser under omstrukturering och läses hos riksdagen.
 */
(()=>{'use strict';
const S=window.BK_STATUTES;if(!S)return;
const removed={
 'BrB:2:11a':'Finns inte i gällande BrB; fragment av en uppräkning i 2 kap.',
 'BrB:4:24':'Finns inte; hänvisning till 24 § lagen (1988:688) om kontaktförbud i 4 kap. 4 a och 4 e §§.',
 'BrB:23:12':'Finns inte; texten var BrB 9:12.',
 'BrB:27:15':'Fragment av hänvisning till 15 § bötesverkställighetslagen.',
 'BrB:31:15':'Fragment av hänvisning i 31 kap.',
 'BrB:37:13':'Fragment av hänvisning i 37 kap.',
 'BrB:26:3':'Lagrad text var ett fragment av en annan paragraf.',
 'BrB:26:7':'Lagrad text var ett fragment av en annan paragraf.',
 'BrB:28:21':'Lagrad text var ett fragment av en annan paragraf.',
 'BrB:38:8':'Lagrad text var ett fragment av en annan paragraf.',
 'BrB:38:9':'Lagrad text var ett fragment av en annan paragraf.'
};
for(const k of Object.keys(removed))delete S[k];
window.BK_STATUTE_CORRECTIONS17={checked:'2026-10-26',source:'https://data.riksdagen.se/dokument/sfs-1962-700.text',
 verified:{BrB:'2026:1656',RB:'2026:1657',Nark:'2024:797',Vapen:'2026:1596',Kniv:'2026:413',TBL:'2024:715',SmuglL:'2026:1321'},
 identicalBrBRb:621,comparedBrBRb:632,removed};
})();
