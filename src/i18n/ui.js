const fs=require('fs'),path=require('path');
const acorn=require('/opt/node-tools/node_modules/acorn'),walk=require('/opt/node-tools/node_modules/acorn-walk');
const R='/home/user/Relational-Gospel/';
const out=new Set();
const ent=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').replace(/&middot;/g,'·').replace(/&rarr;/g,'→');
function keep(t,raw){
  if(!/[A-Za-z]{2}/.test(t))return false;
  if(/^\[|-$/.test(t))return false;
  if(/[{};=<>\\]|^[.#]|--|\bpx\b|rgba|var\(|https?:|\$\{|^\w+\(|\.(js|css|svg|png)\b/.test(t))return false;
  if(/^[a-z][a-zA-Z0-9-]*$/.test(t))return /^\s+[a-z]+\s*$|^\s*[a-z]+\s+$/.test(raw);
  if(/^[a-z0-9-]+( [a-z0-9-]+)+$/.test(t)&&!/^\s|\s$/.test(raw)&&t.split(' ').every(w=>/-/.test(w)||w.length<9)&&/^(pill|chip|btn|card|row|label|ref|note|is|has|mode|panel|sec)/.test(t))return false;
  if(/^[A-Z][A-Za-z]+\d*$/.test(t)&&/^(Arrow|Enter|Escape|Tab|Backspace)/.test(t))return false;
  return true;}
function addText(s){
  s=String(s);
  // attributes
  s.replace(/(?:placeholder|aria-label|title|alt|data-label)="([^"]*)"/g,(m,v)=>{const t=ent(v).trim();if(keep(t,v))out.add(t.replace(/\s+/g,' '));});
  // remove tags and partial tags
  let x=s.replace(/<[^>]*>/g,'\u0001').replace(/^[^<]*?>/, m=>/["=]/.test(m)?'\u0001':m).replace(/<[^>]*$/,'\u0001');
  for(const seg of x.split('\u0001')){const raw=ent(seg);const t=raw.trim().replace(/\s+/g,' ');if(t&&keep(t,raw))out.add(t);}
}
const code=fs.readFileSync(R+'src/app.js','utf8');
const ast=acorn.parse(code,{ecmaVersion:2022});
walk.full(ast,n=>{if(n.type==='Literal'&&typeof n.value==='string')addText(n.value);else if(n.type==='TemplateElement')addText(n.value.cooked);});
addText(fs.readFileSync(R+'src/index.html','utf8').replace(/<style>[\s\S]*?<\/style>|<script>[\s\S]*?<\/script>/g,''));
// single-token data labels
for(const s of require(path.join(__dirname,'single.json')))out.add(s.trim());
const arr=[...out].filter(t=>!/^\d/.test(t)||/[A-Za-z]{3}/.test(t));
fs.writeFileSync(path.join(__dirname,'ui.json'),JSON.stringify(arr,null,0).replace(/","/g,'",\n"'));
console.log(arr.length,arr.join('').length);
console.log(arr.filter((_,i)=>i%40==0).join(' | '));
