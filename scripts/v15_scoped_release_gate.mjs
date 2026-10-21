// Scoped core release gate for 1.5, not a complete legal certification.
// Retains independent full-audit queue in v15_release_readiness.mjs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
function test(script){execFileSync(process.execPath,[script],{cwd:root,stdio:'pipe',timeout:180000});}
for(const script of [
 'scripts/final_prosecution_review_15_test.mjs',
 'scripts/brb_prosecution_audit_15_test.mjs',
 'scripts/special_prosecution_audit_15_test.mjs',
 'scripts/brb_conditional_penalty_options_15_test.mjs',
 'scripts/base_inchoate_review_15_test.mjs',
 'scripts/catalog_selection_15_test.mjs',
 'scripts/v15_release_readiness.mjs'
])test(script);
const audit=JSON.parse(fs.readFileSync(path.join(root,'audit/v15-release-readiness.json'),'utf8'));
const {counts,blockers}=audit;
for(const [name,value] of Object.entries({base:390,brb:322,stages:1167,total:1557,structuredBrbRequisites:322,age14RulesCovered:1557}))assert.equal(counts[name],value,name);
for(const name of [
 'knownActiveOffencesWithoutOwnCard','baseCardsWithoutExactlyThreeStageEntries',
 'unverifiedInchoateStatus','unexpectedFutureStageCheckDates',
 'basePenaltyCasesNeedingIndividualVerification','age14OffenceCardsWithoutAgeAtActRule'
])assert.equal(blockers[name],0,name);
assert.equal(blockers.punishableStagesWithoutResolvedPenaltyRange,12,'Only the twelve alternative-dependent stage cases may lack a universal scalar range');
assert.equal(blockers.conditionalPenaltyCasesNeedingIndividualVerification,14,'Derived scales must remain conditional');
assert.equal(counts.fullyLegallyApprovedBrbRequisites,0,'Do not forge complete legal review');
assert.equal(audit.releaseReady,false,'Full legal audit stays outstanding and must be disclosed');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert.ok(html.includes('Version 1.5 · publicerad 2026-10-22'));
assert.ok(sw.includes("brottskatalog-v15-release-headerfix-20261022"));
assert.match(html, /<strong>Brottskatalog<\/strong><span>1\.5<\/span>/, 'Search header must match published release');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
assert.ok(manifest.description.startsWith('Brottskatalog 1.5'), 'PWA manifest version must agree with search header');
const research=JSON.parse(fs.readFileSync(path.join(root,'data/grovt-olaga-tvang-prosecution-research-15.json'),'utf8'));
assert.equal(research.prosecutionCheckpointApproved,false,'Do not certify the unresolved interpretation');
assert.equal(research.fullLegalApprovalGranted,false);
console.log('PASS scoped V1.5 release: full core coverage and charging/stage regressions; 390 independent legal signoffs remain open.');
