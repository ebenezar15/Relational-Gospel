const fs=require('fs'),path=require('path');
const d={},u={};let bad=[];
const outs=fs.readdirSync(path.join(__dirname,'out')).filter(f=>f.endsWith('.json')).sort();
const read=f=>{try{return JSON.parse(fs.readFileSync(path.join(__dirname,'out',f),'utf8'))}catch(e){bad.push(f);return{}}};
const uiIn={};for(const f of fs.readdirSync(path.join(__dirname,'in')).filter(f=>/^u/.test(f)))for(const x of JSON.parse(fs.readFileSync(path.join(__dirname,'in',f),'utf8')))uiIn[x.k]=x.en;
for(const f of outs){const o=read(f);if(/^u/.test(f)){for(const k in o){const en=uiIn[k];if(en&&o[k]&&o[k]!==en)u[en.replace(/\s+/g,' ').trim()]=o[k].trim()}}else Object.assign(d,o);}
Object.assign(u,JSON.parse(fs.readFileSync('/home/user/Relational-Gospel/src/i18n/ui-extra.json','utf8')));
fs.writeFileSync('/home/user/Relational-Gospel/src/i18n/ta.json',JSON.stringify({d,u}));
console.log('data',Object.keys(d).length,'ui',Object.keys(u).length,bad.length?'BAD '+bad:'');
