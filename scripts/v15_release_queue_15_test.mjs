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
console.log('PASS V1.5: per-chapter legal review queue, truthful source scopes, '+file.counts.brbPostsWithoutStructuredRequisites+' still missing structures, Pages release blocked');