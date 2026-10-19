import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
execFileSync(process.execPath,['scripts/v15_priority_legal_dossiers.mjs'],{cwd:root,stdio:'pipe'});
const f=JSON.parse(fs.readFileSync(path.join(root,'audit/v15-priority-legal-dossiers.json'),'utf8'));
assert.equal(f.counts.policePriorityBrBCards,37);
assert.equal(f.counts.otherBrBCards,282);
assert.equal(f.counts.allBrBCards,319);
assert.equal(f.counts.allBrBCardsWithCompleteStatute,319);
assert.equal(f.counts.allBrBCardsFullyLegallyApproved,0);
assert.equal(f.remainingBrB.length,282);
assert.equal(new Set([...f.policePriority,...f.remainingBrB].map(x=>x.id)).size,319);
for(const c of f.remainingBrB){
 assert.ok(c.statuteFullTextIndividuallyVerified&&c.statutoryText.length>30,c.title);
 assert.equal(c.legalChecklist.length,9);
 assert.ok(c.legalChecklist.every(x=>['PENDING','APPROVED'].includes(x.status)));
 assert.equal(c.finalLegalConclusionApproved,false);
 assert.equal(c.operationalCustodyAdviceApproved,false);
}
assert.equal(f.counts.unverifiedStageCases,0);
assert.equal(f.counts.policeCardsWithCompleteStatute,37);
assert.equal(f.counts.policeCardsFullyLegallyApproved,0);
assert.equal(f.counts.individuallySourceCheckedLegalChecklistSteps,224);
assert.equal(f.counts.cardsWithPartiallyCheckedLegalChecklist,87);
assert.equal([...f.policePriority,...f.remainingBrB].reduce((n,d)=>n+d.legalChecklist.filter(x=>x.status==='APPROVED').length,0),224);
assert.equal(f.releaseReady,false);
assert.equal(f.automaticCustodyAuthorization,false);
assert.equal(new Set(f.policePriority.map(x=>x.id)).size,37);
assert.equal(new Set(f.ambiguousInchoate.map(x=>x.id)).size,0);
for(const c of f.policePriority){
 assert.ok(c.id&&c.title&&c.statute.startsWith('BrB:'));
 assert.ok(c.statuteTextChecked&&c.statuteFullTextIndividuallyVerified);
 assert.ok(c.sourceURL.startsWith('https://')&&c.statutoryText.length>30);
 assert.equal(c.status,'LEGAL_AUDIT_PENDING');
 assert.equal(c.finalLegalConclusionApproved,false);
 assert.equal(c.operationalCustodyAdviceApproved,false);
 assert.equal(c.legalChecklist.length,9);
 assert.ok(c.legalChecklist.every(q=>['PENDING','APPROVED'].includes(q.status)&&
 (q.status==='PENDING'||(q.sourceURL&&q.checked&&q.caseSpecificLegalConclusionApproved===false))),
 'Only individually sourced, non-case-specific legal steps may be approved');
 assert.ok(c.legalChecklist.some(q=>q.id==='jurisprudence'));
 assert.ok(c.legalChecklist.some(q=>q.id==='coercion'));
}
for(const s of f.ambiguousInchoate){
 assert.equal(s.status,'INCHOATE_CRIMINALIZATION_UNVERIFIED');
 assert.equal(s.stageStatus,'unverified');
 assert.equal(s.finalLegalConclusionApproved,false);
 assert.equal(s.automatedCustodyAdviceApproved,false);
 assert.ok(['BrB:13:12','BrB:21:15'].includes(s.authorizingProvision));
 assert.ok(s.authorizingFullText.length>130&&s.parentFullText.length>130);
 assert.ok(s.sourceURL.includes('riksdagen.se'));
 assert.ok(s.requiredSteps.some(q=>q.includes('praxis')));
 assert.ok(s.requiredSteps.some(q=>q.includes('tvångsmedel')));
 assert.ok(s.noNegativeInferencesFromMissingApproval);
}
assert.equal(f.ambiguousInchoate.filter(x=>x.authorizingProvision==='BrB:13:12').length,0);
assert.equal(f.ambiguousInchoate.filter(x=>x.authorizingProvision==='BrB:21:15').length,0);
assert.ok(f.policePriority.some(c=>c.title==='Våldsamt motstånd'));
assert.ok(f.policePriority.some(c=>c.title==='Barnfridsbrott'));
console.log('PASS V1.5: 37 police priority legal dossiers plus 282 remaining and zero residual uncertain-status inchoate dossiers, all held for independent review');
