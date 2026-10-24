const fs=require('fs'),vm=require('vm'),path=require('path');
const R='/home/user/Relational-Gospel/';const {hash,wanted}=require(R+'src/i18n/common.js');
const TA=JSON.parse(fs.readFileSync(R+'src/i18n/ta.json','utf8'));
const order=JSON.parse(fs.readFileSync(R+'build.js','utf8').match(/const order = (\[.*?\]);/)[1]);
const seen=new Set(),out=[];
const ctx={window:{}};vm.createContext(ctx);for(const n of order){const p=R+'src/data/'+n+'.js';if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),ctx);}
{(function walk(v,k){if(typeof v==='string'){if(wanted(v,k)){const h=hash(v);if(!TA.d[h]&&!seen.has(h)){seen.add(h);out.push({k:h,en:v})}}}else if(Array.isArray(v))v.forEach(x=>walk(x,k));else if(v&&typeof v==='object')for(const kk in v)walk(v[kk],kk)})(ctx.window.RG,'');}
const tag=process.argv[2];const N=Math.ceil(out.length/2);
if(out.length){fs.writeFileSync('in/'+tag+'a.json',JSON.stringify(out.slice(0,N)).replace(/\},\{/g,'},\n{'));fs.writeFileSync('in/'+tag+'b.json',JSON.stringify(out.slice(N)).replace(/\},\{/g,'},\n{'));}
// ui
require('child_process').execSync('node '+__dirname+'/ui.js');
const ui=JSON.parse(fs.readFileSync(__dirname+'/ui.json','utf8'));const nu=ui.filter(s=>!TA.u[s.replace(/\s+/g,' ').trim()]&&/[a-z]{2}/i.test(s));
const old=new Set(JSON.parse(fs.readFileSync('in/ui.json','utf8')).map(x=>x.en));
const nu2=nu.filter(s=>!old.has(s));
fs.writeFileSync('in/u'+tag+'.json',JSON.stringify(nu2.map((s,i)=>({k:tag+'u'+i,en:s}))).replace(/\},\{/g,'},\n{'));
console.log('data',out.length,out.reduce((a,b)=>a+b.en.length,0),'ui',nu2.length);
