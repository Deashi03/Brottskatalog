/* v0.5 source-dependent safeguard. An updated SFS paragraph invalidates older legal metadata. */
(()=>{
 const D=window.BK_DATA, baseline=window.BK_REVIEW_BASELINE_05;
 if(!D||!baseline)return;
 const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return(h>>>0).toString(16).padStart(8,'0');};
 for(const c of D.crimes){
   if(!c.id.startsWith('v05-'))continue;
   const old=baseline[c.statute], p=window.BK_STATUTES?.[c.statute];
   if(!old||!p?.text||hash(p.text)!==old){
      c.penalty='Lagtext ändrad – kontroll krävs';
      c.penaltyShort='Kontroll krävs';
      c.penaltyNote='Den underliggande paragrafen har ändrats sedan straffskalan kontrollerades.';
      c.custody='unknown';
      c.prosecution='unknown';
      c.prosecutionLabel='Åtalsregler måste kontrolleras';
      c.prosecutionDetails=['Lydelsen av lagrummet skiljer sig från den tidigare granskade. Varken straffskala eller åtalsregler får anses kontrollerade.'];
      c.reviewStatus='source-changed';
   }
 }
 for(const c of D.crimes){
   if(!c.prosecutionDetails?.length && c.prosecution==='general')
      c.prosecutionDetails=['Allmänt åtal som huvudregel. Kontrollera om särskilda åtalsvillkor finns i den aktuella författningen.'];
 }
})();