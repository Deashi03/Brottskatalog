import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const sw=readFileSync(resolve(root,'service-worker.js'),'utf8');
const refs=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.ok(refs.includes('brb-war-coverage-15.js')&&sw.includes('./brb-war-coverage-15.js'));
assert.ok(refs.indexOf('brb-war-coverage-15.js')<refs.indexOf('stages-08.js'));
assert.ok(refs.indexOf('stages-08.js')<refs.indexOf('stage-scope-15.js'));
const window={BK_DATA:{crimes:[],categories:['Alla']}};
vm.runInNewContext(readFileSync(resolve(root,'data/provisions-generated.js'),'utf8'),{window});
for(const src of ['brb-war-coverage-15.js','stages-08.js','stage-scope-15.js']){
 vm.runInNewContext(readFileSync(resolve(root,src),'utf8'),{window,console});
}
const base=window.BK_DATA.crimes.filter(c=>!c.stageType);
assert.equal(base.length,18,'All 18 active BrB 21–22 statutory crime grades must be present');
assert.ok(!base.some(c=>c.title.toLocaleLowerCase('sv').includes('kärnsprängning')),'Uncommenced 22:6c must be withheld');
assert.equal(base.filter(c=>c.applicabilityConditional).length,14);
for(const c of base.filter(c=>c.applicabilityConditional)){
 assert.equal(c.custody,'unknown','War-contingent offence cannot automatically show a detention indicator');
 assert.ok(c.penaltyShort.startsWith('Villkorat: '));
 assert.ok(c.applicabilityWarning.length>45);
 assert.equal(c.typexempel15.length,0,'No fabricated wartime typecases');
}
const by=t=>base.find(c=>c.title===t);
assert.equal(by('Grov olovlig avvikelse av krigsman')?.penaltyRange.life,true);
assert.equal(by('Lydnadsbrott')?.penaltyRange.fines,true);
assert.equal(by('Grov olovlig befattning med kemiska vapen')?.penaltyRange.max,18);
assert.equal(by('Olovlig befattning med minor')?.penaltyRange.max,4);
assert.equal(by('Landsskadlig vårdslöshet')?.penaltyRange.max,4);
const stages=window.BK_DATA.crimes.filter(c=>c.stageType);
assert.ok(window.BK_STAGE_SCOPE15.warStages>0);
for(const stage of stages.filter(c=>c.applicabilityConditional)){
 assert.equal(stage.custody,'unknown');
 assert.ok(stage.applicabilityWarning,'Stages cannot drop parent wartime precondition');
}
for(const t of ['Förberedelse till landssvek','Stämpling till landssvek']){
 const x=stages.find(s=>s.title===t);assert.ok(x);
 assert.ok(x.applicabilityWarning.includes('hotas av krig'));
}
for(const stage of stages.filter(c=>c.stageParentId===by('Grovt våld eller hot mot förman').id)){
 assert.equal(stage.stageStatus,'unverified','Do not infer negative coverage for gross military superior assault');
}
assert.ok(html.includes("c.applicabilityConditional?{tone:'unknown'"),'Coercive menu must be neutral for contingent offences');
assert.ok(html.indexOf("if(c.stageStatus&&c.stageStatus!=='punishable')")<html.indexOf('if(c.applicabilityConditional)return'),'Unpunishable stage override must precede war notice');
console.log('PASS V1.5: 18 BrB wartime/disarmament offences, legal applicability gating, 22:7 stages and uncommenced-law exclusion');