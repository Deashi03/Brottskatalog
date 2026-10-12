import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const crimes=[
  {id:'mord',title:'Mord',ref:'BrB 3 kap. 1 §',shortRef:'BrB 3:1',penaltyRange:{min:10,max:18,fines:false,life:true},category:'Person'},
  {id:'ringa-stold',title:'Ringa stöld',ref:'BrB 8 kap. 2 §',shortRef:'BrB 8:2',penaltyRange:{min:0,max:.5,fines:true},category:'Tillgrepp'},
  {id:'grov-stold',title:'Grov stöld',ref:'BrB 8 kap. 4 §',shortRef:'BrB 8:4',penaltyRange:{min:1,max:6,fines:false},category:'Tillgrepp'},
  {id:'vapenbrott',title:'Vapenbrott',ref:'VapenL 18:1',shortRef:'VapenL 18:1',penaltyRange:{min:0,max:5},category:'Vapen'},
  {id:'grovt-vapenbrott',title:'Grovt vapenbrott',ref:'VapenL 18:2',shortRef:'VapenL 18:2',penaltyRange:{min:4,max:7},category:'Vapen'},
  {id:'narkotika-bruk',title:'Ringa narkotikabrott · bruk',ref:'Narkotikastrafflagen 2 §',shortRef:'NSL 2',penaltyRange:{min:0,max:.5,fines:true},category:'Narkotika'},
  {id:'grovt-narkotikabrott',title:'Grovt narkotikabrott',ref:'NSL 3 §',shortRef:'NSL 3',penaltyRange:{min:2,max:7,fines:false},category:'Narkotika'},
  {id:'narkotika-innehav',title:'Ringa narkotikabrott · innehav',ref:'Narkotikastrafflagen 2 §',shortRef:'NSL 2',penaltyRange:{min:0,max:.5,fines:true},category:'Narkotika'},
  {id:'ofredande',title:'Ofredande',ref:'BrB 4 kap. 7 §',shortRef:'BrB 4:7',penaltyRange:{min:0,max:1,fines:true},category:'Frid'}
];
const window={BK_DATA:{crimes,categories:['Alla']},BK_COERCIVE:{range:c=>c.penaltyRange}};
vm.runInNewContext(readFileSync(new URL('../stages-08.js',import.meta.url),'utf8'),{window,console});
const stage=(type,id)=>window.BK_DATA.crimes.find(x=>x.id==='stadium-08-'+type+'-'+id);
assert.equal(stage('forsok','mord')?.stageStatus,'punishable');
assert.equal(stage('stampling','mord')?.stageStatus,'punishable');
assert.equal(stage('forsok','mord').stageParentMin,10);
assert.equal(stage('forsok','ringa-stold')?.stageStatus,'not-criminalized');
assert.match(stage('forsok','ringa-stold').stageSource,/8:12/);
assert.equal(stage('stampling','grov-stold')?.stageStatus,'punishable');
assert.equal(stage('forsok','vapenbrott')?.stageStatus,'not-criminalized');
assert.equal(stage('forsok','grovt-vapenbrott')?.stageStatus,'punishable');
assert.equal(stage('forsok','grovt-vapenbrott').stageParentMin,4);
assert.equal(stage('forsok','narkotika-bruk')?.stageStatus,'not-criminalized');
assert.equal(stage('forsok','narkotika-innehav')?.stageStatus,'punishable');
assert.equal(stage('stampling','narkotika-innehav')?.stageStatus,'not-criminalized');
assert.equal(stage('forsok','grovt-narkotikabrott')?.stageStatus,'punishable');
assert.equal(stage('stampling','grovt-narkotikabrott')?.stageStatus,'punishable');
assert.equal(stage('forsok','ofredande')?.stageStatus,'not-criminalized');
assert.equal(window.BK_DATA.crimes.length,9*4);
assert.equal(window.BK_STAGES.yes+window.BK_STAGES.no+window.BK_STAGES.unknown,9*3);
console.log('PASS: 9 ground offences, 27 stage statuses and their critical statutory distinctions.');
