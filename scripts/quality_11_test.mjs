import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const sample=[
 {id:'sample',title:'Granskat brott',shortRef:'BrB 3:1',ref:'BrB 3:1',penaltyChecked:'2026-10-12',reviewStatus:'law-and-penalty-reviewed',penaltyRange:{min:10,max:18},prosecution:'general',lawMode:'machine',law:'4 § /Upphör att gälla U:2027-01-01/ Text enligt denna lagversion'},
 {id:'unreviewed',title:'Ogranskat brott',shortRef:'BrB 99:1',ref:'BrB 99:1',penaltyChecked:'2026-10-13',reviewStatus:'not-reviewed',prosecution:'unknown',lawMode:'missing'},
 {id:'stage',title:'Försök till granskat brott',stageType:'forsok',stageStatus:'punishable',stageParentId:'sample',shortRef:'BrB 3:1',penaltyChecked:'2026-10-13',reviewStatus:'stage-statute-reviewed',prosecution:'unknown',lawMode:'stage-reference'}
];
const w={BK_DATA:{crimes:sample}};
vm.runInNewContext(readFileSync(resolve(root,'quality-11.js'),'utf8'),{window:w,console});
const info=w.BK_QUALITY11;
assert.equal(info.thresholdYears,3);
const a=w.BK_DATA.crimes[0],b=w.BK_DATA.crimes[1],c=w.BK_DATA.crimes[2];
assert.equal(info.metadata(a,new Date('2029-10-11T23:59:59Z')).stale,false);
assert.equal(info.metadata(a,new Date('2029-10-12T00:00:00Z')).stale,true);
assert.equal(info.metadata(a,new Date('2026-10-13T12:00:00Z')).stale,false);
assert.equal(info.metadata(b,new Date('2035-10-13T00:00:00Z')).stale,false,'Unknown does not become fictitiously stale');
assert.equal(info.metadata(b).lastReview,null);
const future={...a,legalVerifiedAt:'2099-02-01'};
const futureResult=info.metadata(future,new Date('2026-10-15T10:00:00Z'));
assert.equal(futureResult.lastReview,'2026-10-12','Future date must not displace real check date');
assert.match(futureResult.futureReviewNote,/2099-02-01/);
assert.equal(futureResult.stale,false);
const invalid={...a,legalVerifiedAt:'2026-02-30'};
assert.match(info.metadata(invalid).invalidReviewNote,/ogiltigt/,'Impossible calendar date must not count');
assert.equal(info.metadata(invalid).lastReview,'2026-10-12');
const onlyFuture={...b,legalVerifiedAt:'2099-01-01'};
assert.equal(info.metadata(onlyFuture,new Date('2026-10-15T10:00:00Z')).lastReview,null,
  'Never present a future timestamp as completed legal review');
assert.equal(info.metadata(c).lastReview,null,'Generated stage dates do not count as legal review');
assert.match(info.metadata(a).law,/Maskinimporterad/);
assert.match(info.metadata(a).alternateVersionNote,/ikraftträdande/,'Future or alternative SFS wording must be flagged');
assert.match(info.metadata(a).alternateVersionNote,/Upphör 2027-01-01/,'The exact expiry marker belongs only in the expanded legal review');
const undatedEdition={...a,law:'7 § /Träder i kraft I:den dag som regeringen bestämmer/ Special version'};
assert.match(info.metadata(undatedEdition).alternateVersionNote,/den dag som regeringen bestämmer/,'Unknown commencement dates must not be guessed');
const ordinaryEdition={...a,law:'7 § Vanligt lagtextutdrag.'};
assert.equal(info.metadata(ordinaryEdition).alternateVersionNote,null,'Ordinary statute must not get future-version alert');
assert.equal(info.metadata(b).alternateVersionNote,null,'Ordinary excerpt needs no applicability warning');

const actualStatutes={};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window:actualStatutes,console});
const section=actualStatutes.BK_STATUTES?.['BrB:7:4']?.text;
assert.ok(section,'Actual BrB 7:4 law text is imported');
assert.match(section,/\/Upphör att gälla U:2027-01-01\//,'Historical/future law transition survives source import');
const actualExcerpt={...a,law:section};
assert.match(info.metadata(actualExcerpt).alternateVersionNote,/gärningsdagen/,'Alternate legal versions must be flagged in the real source excerpt');

const h=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(h.includes('qualityCard(c)}'),'Card renders separate bottom quality section');
assert.ok(h.indexOf("accordion('sources'")<h.indexOf('qualityCard(c)}'),'Quality follows sources');
assert.ok(h.includes('<details class="quality-footer"'),'Quality starts collapsed');
assert.ok(h.includes('m.stale?'),'Warning badge is conditioned on stale metadata');
console.log('PASS quality 1.1: review-date integrity, 3-year threshold, bottom placement, collapsed state');
