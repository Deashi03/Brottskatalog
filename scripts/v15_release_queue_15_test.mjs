import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
execFileSync(process.execPath,['scripts/v15_release_readiness.mjs'],{cwd:root,stdio:'pipe'});
const file=JSON.parse(fs.readFileSync(path.join(root,'audit/v15-release-readiness.json'),'utf8'));
assert.equal(file.counts.brb,file.byChapter.reduce((n,c)=>n+c.total,0),'Every BrB post must be assigned to one chapter');
assert.equal(file.counts.structuredBrbRequisites,file.byChapter.reduce((n,c)=>n+c.structured,0));
assert.equal(file.counts.brbPostsWithoutStructuredRequisites,file.byChapter.reduce((n,c)=>n+c.missingStructured,0));
assert.equal(file.counts.brbPostsWithoutStructuredRequisites,file.reviewQueue.length,'Review queue must include all missing legal summaries');
assert.ok(file.byChapter.length>=17,'Missing code review of multiple chapters');
assert.ok(file.byChapter.some(x=>x.chapter===17),'Police-oriented offences in chapter 17 must be visible');
assert.ok(file.byChapter.some(x=>x.chapter===21),'War-contingent chapter must be tracked, without being marked fully verified');
assert.equal(file.counts.fullyLegallyApprovedBrbRequisites,0,'Do not silently mass-certify legal precision');
assert.ok(!file.releaseReady,'Unreviewed crimes and uncertain stages must block V1.5 public release');
for(const c of file.byChapter){
 assert.equal(c.structured+c.missingStructured,c.total);
 assert.ok(c.pendingTitles.length===c.missingStructured);
}
for(const c of file.reviewQueue){
 assert.ok(c.title&&c.ref&&c.chapter);
 assert.ok(c.task.includes('rättspraxis'),'Legal review must extend beyond literal SFS');
}
assert.equal(file.legalAuditQueue.length,319,
 'All 319 structurally complete BrB crimes still require individual legal audit');
assert.equal(file.counts.brbOffencesInLegalAuditQueue,file.legalAuditQueue.length);
assert.equal(file.legalAuditSummary.auditPending,319);
assert.equal(file.byChapter.filter(c=>c.missingStructured>0).length,0,
 'Structure should be complete but must NOT imply individual legal approval');
assert.equal(new Set(file.legalAuditQueue.map(c=>c.id)).size,319,
 'Legal audit queue must not omit or duplicate any BrB base offence');
assert.ok(file.legalAuditQueue.some(c=>c.title==='Sexuellt övergrepp mot barn'));
assert.ok(file.legalAuditQueue.some(c=>c.title==='Våldsamt motstånd'));
for(const crime of file.legalAuditQueue){
 assert.equal(crime.completeLegalReviewApproved,false);
 assert.ok(crime.missing.includes('individual-requisite-and-case-law-approval'));
 assert.ok(crime.requiresCaseLawAndEffectiveDateCheck);
 assert.ok(crime.sourceURL,'Auditors need a source link: '+crime.title);
}
assert.ok(file.blockers.basePenaltyCasesNeedingIndividualVerification>0,
 'Incomplete penalty verification must block legal release');
assert.equal(file.counts.basePenaltyCasesNeedingIndividualVerification,
 file.blockers.basePenaltyCasesNeedingIndividualVerification);
assert.equal(file.counts.conditionallyScopedPenaltyCasesNeedingReview,
 file.blockers.conditionalPenaltyCasesNeedingIndividualVerification);

console.log('PASS V1.5: per-chapter legal review queue, truthful source scopes, '+file.counts.brbPostsWithoutStructuredRequisites+' still missing structures, Pages release blocked');