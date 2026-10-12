/* v0.6 invalidation: do not retain a reviewed-looking penalty once official BrB source changes. */
(()=>{const D=window.BK_DATA,base=window.BK_REVIEW_BASELINE_06;if(!D||!base)return;
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16).padStart(8,'0')};
for(const c of D.crimes){
 if(!c.id.startsWith('v06-'))continue;
 const current=window.BK_STATUTES?.[c.statute]?.text;
 if(!current||hash(current)!==base[c.statute]){
 c.penalty='Lagrum ändrat – kontroll krävs';c.penaltyShort='Kontroll krävs';
 c.penaltyRange=null;c.custody='unknown';c.prosecution='unknown';c.prosecutionLabel='Ny granskning krävs';
 c.prosecutionDetails=['Den kopplade paragrafen har ändrats; straffskala, åtals- och häktningsregler måste kontrolleras innan status återställs.'];
 c.reviewStatus='source-changed';
 }
}
})();