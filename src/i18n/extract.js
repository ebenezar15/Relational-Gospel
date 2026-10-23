const fs=require('fs'),vm=require('vm'),path=require('path');
const R='/home/user/Relational-Gospel/';const OUT=path.join(__dirname,'in');
const {hash,wanted,REF_RE}=require(R+'src/i18n/common.js');
const order=JSON.parse(fs.readFileSync(R+'build.js','utf8').match(/const order = (\[.*?\]);/)[1]);
const data=new Map(), single=new Set(), refs=new Set(), byFile=[];
for(const n of order){const p=R+'src/data/'+n+'.js';if(!fs.existsSync(p))continue;
  const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(p,'utf8'),ctx);
  const list=[];
  (function walk(v,k){if(typeof v==='string'){
      if(wanted(v,k)){const h=hash(v);if(data.has(h)&&data.get(h)!==v)throw 'collision '+h;if(!data.has(h)){data.set(h,v);list.push(h)}}
      else if(/[A-Za-z]{2}/.test(v)&&!/^https?:/.test(v)&&k!=='id'&&k!=='url'&&k!=='source'){ if(REF_RE.test(v))refs.add(v); else if(!/^[a-z0-9-]+$/.test(v)&&!/^[a-z]+(-[a-z0-9]+)+$/.test(v)) single.add(v);}
    }else if(Array.isArray(v))v.forEach(x=>walk(x,k));else if(v&&typeof v==='object')for(const kk in v)walk(v[kk],kk)})(ctx.window.RG,'');
  byFile.push([n,list]);}
// chunk data strings in file order, ~CH chars each
const CH=+process.argv[2]||90000;let chunks=[],cur=[],sz=0;
for(const [n,list] of byFile)for(const h of list){cur.push({k:h,en:data.get(h)});sz+=data.get(h).length;if(sz>=CH){chunks.push(cur);cur=[];sz=0}}
if(cur.length)chunks.push(cur);
chunks.forEach((c,i)=>fs.writeFileSync(path.join(OUT,'d'+String(i+1).padStart(2,'0')+'.json'),JSON.stringify(c,null,0).replace(/\},\{/g,'},\n{')));
fs.writeFileSync(path.join(__dirname,'single.json'),JSON.stringify([...single]));
fs.writeFileSync(path.join(__dirname,'refs.json'),JSON.stringify([...refs]));
let tot=0;for(const v of data.values())tot+=v.length;
console.log('data strings',data.size,'chars',tot,'chunks',chunks.length,'single',single.size,'refs',refs.size);
