// node validate.js d01   -> checks out/d01.*.json against in/d01.json
const fs=require('fs'),path=require('path');
const c=process.argv[2];const IN=JSON.parse(fs.readFileSync(path.join(__dirname,'in',c+'.json'),'utf8'));
const OUT={};let bad=[];
for(const f of fs.readdirSync(path.join(__dirname,'out')).filter(f=>f.startsWith(c+'.')&&f.endsWith('.json')).sort()){
  try{Object.assign(OUT,JSON.parse(fs.readFileSync(path.join(__dirname,'out',f),'utf8')))}catch(e){bad.push('JSON ERROR in '+f+': '+e.message)}}
const tags=s=>(s.match(/<\/?[a-z][^>]*>/gi)||[]).map(t=>t.replace(/\s+/g,' ')).sort().join('');
const refs=s=>(s.match(/\b(?:[1-3] )?[A-Z][a-z]+\.? \d+:\d+(?:[–-]\d+)?/g)||[]).sort().join('|');
let missing=[],noTa=[],tagErr=[],refErr=[],extra=0;
const keys=new Set(IN.map(x=>x.k));for(const k in OUT)if(!keys.has(k))extra++;
for(const {k,en} of IN){const ta=OUT[k];
  if(typeof ta!=='string'||!ta.trim()){missing.push(k);continue}
  if(!/[஀-௿]/.test(ta)&&/[a-z]{3,} [a-z]{3,}/.test(en.replace(/<[^>]+>/g,'')))noTa.push(k);
  if(tags(en)!==tags(ta))tagErr.push(k);
  if(refs(en)!==refs(ta))refErr.push(k);}
console.log(c+': '+IN.length+' strings, translated '+(IN.length-missing.length)+', missing '+missing.length+(extra?', unknown keys '+extra:''));
bad.forEach(b=>console.log(b));
if(missing.length)console.log('MISSING: '+missing.slice(0,40).join(' ')+(missing.length>40?' …':''));
if(noTa.length)console.log('NO TAMIL TEXT: '+noTa.join(' '));
if(tagErr.length)console.log('HTML TAG MISMATCH: '+tagErr.join(' '));
if(refErr.length)console.log('SCRIPTURE REFERENCE CHANGED/MISSING (keep refs exactly as in English): '+refErr.join(' '));
if(!missing.length&&!bad.length&&!noTa.length&&!tagErr.length&&!refErr.length)console.log('ALL OK');
