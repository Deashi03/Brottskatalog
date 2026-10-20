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
assert.equal(file.blockers.basePenaltyCasesNeedingIndividualVerification,0,
 'All base-grade numeric intervals should now be individually source-checked');
assert.equal(file.blockers.conditionalPenaltyCasesNeedingIndividualVerification,14,
 'Fourteen derivative or special-case grades still require separate legal review');
assert.equal(file.releaseReady,false,
 'Even after basic grade checks, full individual legal review and stage uncertainty block release');
assert.equal(file.counts.basePenaltyCasesNeedingIndividualVerification,
 file.blockers.basePenaltyCasesNeedingIndividualVerification);
assert.equal(file.counts.conditionallyScopedPenaltyCasesNeedingReview,
 file.blockers.conditionalPenaltyCasesNeedingIndividualVerification);


assert.equal(file.stageAuditQueue.length,0,'No unresolved current-SFS stage classifications remain; full legal review still required');
assert.equal(file.counts.inchoateLegalAuditQueueEntries,file.counts.unverifiedStages);
for(const entry of file.stageAuditQueue){
 assert.equal(entry.status,'INCHOATE_CRIMINALIZATION_UNVERIFIED');
 assert.ok(['BrB:13:12','BrB:21:15'].includes(entry.sourceRef),'Ambiguous stage must cite 13:12 or 21:15');
 assert.ok(entry.sourceTextIndividuallyChecked,'Checked source provision must remain accessible to legal reviewer');
 assert.ok(entry.sourceURL?.includes('riksdagen.se'));
 assert.ok(entry.requiredAction.includes('praxis'),'Scope must not be decided from title alone');
}
assert.ok(file.blockers.unverifiedInchoateStatus===0,'Unresolved degrees must block release, despite complete source wording');

assert.equal(file.counts.age14RulesCovered,1473,
 'Every base offence and inchoate card needs an offence-age metadata warning');
assert.equal(file.blockers.age14OffenceCardsWithoutAgeAtActRule,0,
 'Any missing BrB 1:6 age exception metadata blocks publication');
assert.equal(file.age14Triage.legalWindow.from,'2026-09-10');
assert.equal(file.age14Triage.legalWindow.toExclusive,'2031-09-10');
assert.equal(file.age14Triage.totalIndexed,1473);
assert.ok(file.age14Triage.potentialCandidates.some(c=>c.title==='Grovt rån'));
assert.ok(file.age14Triage.potentialCandidates.every(c=>c.offenceDateRequired===true));
assert.ok(file.age14Triage.potentialCandidates.every(c=>!c.safeForCustodyDetermination));
assert.ok(file.age14Triage.potentialCandidates.every(c=>c.inchoateAuthorizationIsIndependent));
assert.equal(file.age14Triage.pendingWithinCandidates,
 file.counts.age14FourYearCandidatesAwaitingIndividualApplicabilityReview);
assert.equal(file.age14Triage.noAge14StatuteCard,0);
assert.equal(file.releaseReady,false);
console.log('PASS V1.5: per-chapter legal review queue, truthful source scopes, '+file.counts.brbPostsWithoutStructuredRequisites+' still missing structures, Pages release blocked');
assert.equal(file.blockers.knownActiveOffencesWithoutOwnCard,3);
assert.deepEqual(file.knownCoverageGaps.map(x=>x.statute),['BrB:13:9','BrB:22:1','BrB:22:5']);
