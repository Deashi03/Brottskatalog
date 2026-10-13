/* Brottskatalog 1.2: residual BrB chapter-wise prosecution review.
 * Verified 2026-10-13 against BrB 11:8, 16 kap., 17 kap. and RB 20:3.
 * Applies only to named entries previously marked unknown.
 */
(()=>{'use strict';
const D=window.BK_DATA;if(!D?.crimes)return;
const official='https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/brottsbalk-1962700_sfs-1962-700/';
const targets=new Map([
 ['Bokföringsbrott',['general','Allmänt åtal','RB 20:3; BrB 11:8','BrB 11:8 begränsar åtal för ringa bokföringsbrott, men inte för bokföringsbrott av normalgraden.']],
 ['Grovt bokföringsbrott',['general','Allmänt åtal','RB 20:3; BrB 11:8','Ringa-gränsen i BrB 11:8 gäller inte grovt bokföringsbrott.']],
 ['Oredlighet mot borgenärer',['general','Allmänt åtal','RB 20:3; BrB 11:8','Åtalsvillkoren i BrB 11:8 avser vårdslöshet mot borgenärer och ringa bokföringsbrott.']],
 ['Vårdslöshet mot borgenärer',['conditional','Allmän synpunkt krävs','BrB 11:8','Åklagaren får väcka åtal endast om åtal är påkallat från allmän synpunkt.']],
 ['Ringa bokföringsbrott',['conditional','Särskilda skäl + allmän synpunkt','BrB 11:8','Ringa bokföringsbrott får åtalas endast om åtal av särskilda skäl är påkallat från allmän synpunkt.']],
 ['Brott mot rösthemlighet',['general','Allmänt åtal','RB 20:3; BrB 17 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 17 kap.']],
 ['Otillåtet förfarande med pornografisk bild',['general','Allmänt åtal','RB 20:3; BrB 16 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 16 kap.']],
 ['Falskt larm',['general','Allmänt åtal','RB 20:3; BrB 16 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 16 kap.']],
 ['Grovt falskt larm',['general','Allmänt åtal','RB 20:3; BrB 16 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 16 kap.']],
 ['Missbruk av larmanordning',['general','Allmänt åtal','RB 20:3; BrB 16 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 16 kap.']],
 ['Otillbörligt gynnande av borgenär',['general','Allmänt åtal','RB 20:3; BrB 11:8','Åtalsbegränsningarna i 11:8 avser andra brott i kapitlet.']],
 ['Tagande av otillbörlig förmån vid röstning',['general','Allmänt åtal','RB 20:3; BrB 17 kap.','Inget särskilt åtalsvillkor för denna rubricering identifierat i BrB 17 kap.']]
]);
let resolved=0,stages=0;
const parents=new Map();
for(const c of D.crimes){
 if(c.stageType||c.prosecution!=='unknown')continue;
 const entry=targets.get(c.title);if(!entry)continue;
 const [kind,label,ref,why]=entry;
 c.prosecution=kind;c.prosecutionLabel=label;c.prosecutionRule=ref;
 c.prosecutionSource=ref;c.prosecutionChecked='2026-10-13';
 c.prosecutionDetails=[why,'Gäller huvudregeln för åtal. Pröva även person-, plats- och gärningsspecifika processhinder där sådana aktualiseras.'];
 c.prosecutionReviewStatus='individual-statute-section-checked';
 c.prosecutionSourceURL=official;
 parents.set(c.id,c);resolved++;
}
for(const c of D.crimes){
 if(!c.stageType||c.stageStatus!=='punishable'||c.prosecution!=='unknown')continue;
 const p=parents.get(c.stageParentId);if(!p)continue;
 c.prosecution=p.prosecution;
 c.prosecutionLabel=p.prosecutionLabel;
 c.prosecutionRule=p.prosecutionRule;
 c.prosecutionDetails=['Straffbart förstadium till '+p.title+'.',...p.prosecutionDetails];
 c.prosecutionSource=p.prosecutionSource;
 c.prosecutionChecked=p.prosecutionChecked;
 c.prosecutionReviewStatus='inherited-parent-rule-check-stage-applicability';
 stages++;
}
window.BK_PROSECUTION12={resolved,stages,source:official,checked:'2026-10-13'};
})();