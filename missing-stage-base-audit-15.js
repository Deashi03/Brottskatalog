/* A separate current statutory inchoate question for each restored parent.
 * Preserve its other eight legal audit dimensions and all stage evidence.
 */
(()=>{'use strict';const D=window.BK_DATA,R=window.BK_MISSING_STAGE_RULES15,W=window.BK_STATUTES;if(!D?.crimes||!R||!W)return;
const pins=window.BK_MISSING_STAGE_SOURCE_PINS15||{};
const n=s=>String(s||'').normalize('NFC').replace(/\s+/g,' ').trim();
const report={planned:24,completed:0,held:[],checked:'2026-10-20',fullLegalApprovals:0};
const code={forsok:'F',forberedelse:'P',stampling:'S'},names={F:'försök',P:'förberedelse',S:'stämpling'};
for(const r of R){const p=D.crimes.find(c=>!c.stageType&&c.id===r.id),ss=D.crimes.filter(c=>c.stageParentId===r.id);
 const auth=pins[r.authorizer],v=W[r.authorizer];
 const authorizerReady=r.authorizer.endsWith(':whole')||!!(auth&&v?.complete===true&&v.url===auth.url&&n(v.text)===n(auth.text));
 const ready=!!(authorizerReady&&p&&p.title===r.title&&p.statute===r.statute&&p.lawCompletenessVerified===true&&p.lawMode==='full'&&n(p.law)===n(r.ownText)&&ss.length===3&&new Set(ss.map(s=>s.stageType)).size===3&&ss.every(s=>code[s.stageType]&&s.stageStatus===(r.allowed.includes(code[s.stageType])?'punishable':'not-criminalized')&&s.individualLegalAudit15?.scope?.status==='APPROVED'&&s.individualLegalAudit15.scope.checked==='2026-10-20'&&s.individualLegalAudit15.scope.caseSpecificLiabilityApproved===false&&s.individualLegalAudit15.consequences?.punishmentRangeApproved===false));
 if(!ready||p.legalAudit15?.checkpoints?.inchoate){report.held.push(r.title);continue;}
 for(const s of ss){s.prosecution='unknown';s.prosecutionLabel=s.stageStatus==='punishable'?'Förstadiets åtalsvillkor måste prövas':'Ingen egen straffbar rubricering';s.custody='unknown';s.penaltyRange=null;s.penaltyRangeVerified=false;}
 const yes=[...r.allowed].map(k=>names[k]),no=Object.entries(names).filter(([k])=>!r.allowed.includes(k)).map(([,v])=>v);
 const finding=p.title+': '+(yes.length?'Särskilt lagstöd för '+yes.join(', ')+'. ':'Inget särskilt lagstöd för försök, förberedelse eller stämpling. ')+(yes.length&&no.length?'Inte uppräknat: '+no.join(', ')+'. ':'')+r.caveat+' Kontrollen gäller gällande uppräkning och uttryckliga avgränsningar; 23 kap., brottsrekvisit och gärningsdatum ska prövas i det enskilda fallet.';
 p.legalAudit15={...p.legalAudit15,fullLegalReviewApproved:false,checkpoints:{...p.legalAudit15?.checkpoints,inchoate:{status:'APPROVED',checked:report.checked,sourceURL:r.sourceURL,sourceRefs:[p.shortRef,r.authorizer,'BrB 23:1–3'],finding,scope:'current-statutory-inchoate-listing-and-express-branch-limits-only',caseSpecificLiabilityApproved:false,historicLawApproved:false,jurisprudenceApproved:false,caseSpecificCustodyApproved:false,penaltyRangeApproved:false,fullChapter23CaseAssessmentApproved:false}}};report.completed++;
}window.BK_MISSING_STAGE_BASE_AUDIT15=report;
})();
