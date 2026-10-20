import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
execFileSync(process.execPath,['scripts/v15_priority_legal_dossiers.mjs'],{cwd:root,stdio:'pipe'});
const r=JSON.parse(fs.readFileSync(path.join(root,'audit/v15-priority-legal-dossiers.json'),'utf8'));
const all=[...r.policePriority,...r.remainingBrB],sum=r.scopedSourceSummary;
assert.equal(all.length,319);
assert.equal(new Set(all.map(c=>c.id)).size,319);
const expected={
 HD_ALIBIT_DISTINCTION:3,
 BRB15_ACCUSATION_LIMITS:4,
 BRB14_EVIDENCE_DISTINCTIONS:8,
 BRB17_OFFICIAL_FUNCTION_BOUNDARIES:6
};
for(const [kind,n] of Object.entries(expected))assert.equal(sum.byKind[kind],n,kind);
assert.equal(sum.entries,21);
assert.equal(sum.cardsWithAtLeastOneNote,20);
assert.equal(r.counts.scopedSourceNoteEntries,21);
assert.equal(r.counts.brbCardsWithScopedSourceNotes,20);
assert.equal(sum.allNotesArePartial,true);
assert.equal(sum.fullLegalReviewApprovalsFromNotes,0);
assert.equal(sum.outstandingIndividualFinalReviews,319);
assert.equal(r.counts.individuallySourceCheckedLegalChecklistSteps,614);
assert.equal(r.counts.cardsWithPartiallyCheckedLegalChecklist,282);
for(const c of all){
 const notes=c.scopedSourceNotes;
 assert.ok(Array.isArray(notes));
 assert.equal(c.finalLegalConclusionApproved,false);
 assert.equal(c.status,'LEGAL_AUDIT_PENDING');
 assert.equal(c.legalChecklist.length,9);
 assert.ok(c.legalChecklist.every(s=>['PENDING','APPROVED'].includes(s.status)&&
 (s.status==='PENDING'||(s.sourceURL&&s.checked&&s.caseSpecificLegalConclusionApproved===false))));
 for(const note of notes){
  assert.equal(note.status,'SCOPED_SOURCE_NOTE_ONLY');
  assert.equal(note.lawRef,c.statute);
  assert.ok(note.statuteChecked===undefined,'Expected field name statutoryTextChecked');
  assert.ok(note.statutoryTextChecked);
  assert.ok(note.statutorySourceURL.includes('riksdagen.se'));
  assert.ok(note.additionalSourceURL.startsWith('https://'));
  assert.ok(note.finding.length>=90);
  assert.equal(note.legalChecklistCompletedByThisNote,0);
  assert.equal(note.finalLegalConclusionApproved,false);
  assert.equal(note.offenceDateAndCompetingProvisionsStillRequireReview,true);
 }
}
assert.ok(all.find(c=>c.title==='Falsk beskyllning').scopedSourceNotes.length===2,
 'One card can hold separate, noncertifying precedent and preparatory source notes');
assert.ok(all.find(c=>c.title==='Våldsamt motstånd').scopedSourceNotes
 .some(x=>x.kind==='BRB17_OFFICIAL_FUNCTION_BOUNDARIES'));
assert.equal(r.counts.allBrBCardsFullyLegallyApproved,0);
assert.equal(r.counts.unverifiedStageCases,0);
assert.equal(r.releaseReady,false);
assert.equal(r.automaticCustodyAuthorization,false);
console.log('PASS V1.5: 21 distinct source-scoped notes across 20 BrB cards; all 319 individual signoffs still pending');
