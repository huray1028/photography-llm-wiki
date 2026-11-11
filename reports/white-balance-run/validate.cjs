const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '../..');
const files = ['reports/white-balance-run.md', ...['claims-initial.md','claims-reviewed.md','source-draft.md','concept-draft.md'].map(x=>'reports/white-balance-run/'+x)];
const broken = [];
let links=0;
for (const file of files) {
  const text=fs.readFileSync(path.join(root,file),'utf8');
  for (const m of text.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(m[1])) continue;
    links++;
    if (!fs.existsSync(path.resolve(root,path.dirname(file),m[1].split('#')[0]))) broken.push({file,target:m[1]});
  }
}
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const ids=name=>[...read(name).matchAll(/^\| (WB-\d+) \|/gm)].map(x=>x[1]);
const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'raw/SRC-06-white-balance.txt'))).digest('hex').toUpperCase();
const initial=ids('claims-initial.md'), reviewed=ids('claims-reviewed.md');
const result={raw_sha256:hash,raw_hash_matches:hash==='16140BBEA32AFFA52E78FEA89457D3BE7016D9AD4CA5E584E55CF939AB6F16C1',initial_claims:initial.length,reviewed_claims:reviewed.length,ids_match:JSON.stringify(initial)===JSON.stringify(reviewed),unique_ids:new Set(reviewed).size===reviewed.length,corrected_rows:read('claims-reviewed.md').split('\n').filter(x=>x.startsWith('| WB-')&&x.includes('已修正')).length,relative_links_checked:links,broken_links:broken,human_review:'pending',semantic_review:'model review, not automated fact verification'};
console.log(JSON.stringify(result,null,2));
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(result,null,2)+'\n');
if(!result.raw_hash_matches||!result.ids_match||!result.unique_ids||broken.length)process.exitCode=1;
