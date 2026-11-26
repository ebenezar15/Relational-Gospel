// Builds an English-only study workbook PDF from the app's data.
// Usage: node tools/workbook.js   ->  workbook/Relational-Gospel-Workbook.pdf (+ .html)
const fs = require("fs"), vm = require("vm"), path = require("path");
const R = path.join(__dirname, "..");
const order = eval(fs.readFileSync(path.join(R, "build.js"), "utf8").match(/const order = (\[[^\]]*\])/)[1]);
const ctx = { window: {} }; vm.createContext(ctx);
for (const n of order) { const p = path.join(R, "src/data", n + ".js"); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx); }
const RG = ctx.window.RG, S = RG.studies;

const PARTS = [
  { name: "Who God Is", color: "#b7791f", icon: "sun", intro: "Jesus shows us exactly what the Father is like. These studies test common pictures of God against the face of Christ.", ids: ["sovereign", "authored", "question", "name", "ecstasy"] },
  { name: "The Finished Work", color: "#9b2c2c", icon: "cross", intro: "What God did in Christ for the whole world: reconciliation, inclusion, the cross, death defeated, and the hope of restoration.", ids: ["reconcile", "inclusion", "lamb", "incarnation", "tenses", "facets", "covenant", "allsaved", "deathless"] },
  { name: "New Life in Christ", color: "#2f855a", icon: "sprout", intro: "Living from union with Christ: new birth, sonship, healing, faith, receiving God’s promises and the gifts of the Spirit.", ids: ["unfold", "sons", "healing", "belief", "receive", "enforce", "gifts", "miracles"] },
  { name: "Reading the Bible Well", color: "#2b6cb0", icon: "book", intro: "How to read Scripture through Jesus, avoid common fallacies and misuses, and disagree well.", ids: ["conflate", "misuse", "trees", "heresy", "lies", "sorry", "wmx"] },
  { name: "Kingdom and Church", color: "#6b46c1", icon: "crown", intro: "The kingdom of God, its parables, the church’s mission and the restoration of the ekklesia.", ids: ["realm", "parables", "mission", "sozo"] },
  { name: "Living It Out", color: "#c05621", icon: "hands", intro: "Relationships, boundaries, suffering, healing and hope in everyday life.", ids: ["boundaries", "resist"] }
];
const all = PARTS.flatMap(p => p.ids); const missing = Object.keys(S).filter(k => !all.includes(k));
if (missing.length) { PARTS[PARTS.length - 1].ids.push(...missing); }

const ICON = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  cross: '<path d="M12 2v20M6 8h12"/>',
  sprout: '<path d="M12 22V11"/><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7z"/><path d="M12 13c0-3 2.5-6 7-6 0 3.5-2.5 6-7 6z"/>',
  book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
  crown: '<path d="M3 18h18M4 18l-1-10 5 4 4-7 4 7 5-4-1 10"/>',
  hands: '<path d="M7 11V6a2 2 0 0 1 4 0v5"/><path d="M11 9V4a2 2 0 0 1 4 0v7"/><path d="M15 8a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L3 13a2 2 0 0 1 3.4-2L8 13"/>'
};
const ico = (n, s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c || "currentColor"}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[n] || ""}</svg>`;
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// study text may hold simple inline tags (b, em, i, br); keep those, escape the rest
const rich = s => esc(s).replace(/&lt;(\/?)(b|em|i|strong|br)\s*\/?&gt;/g, "<$1$2>");
const ref = r => r ? `<div class="ref">${esc(Array.isArray(r) ? r.join("; ") : r)}</div>` : "";
const lines = n => `<div class="lines">${"<i></i>".repeat(n)}</div>`;
const answers = []; // quiz answer key

function wrapSvgText(t, max) { const w = String(t).split(/\s+/), out = []; let cur = ""; for (const x of w) { if ((cur + " " + x).trim().length > max && cur) { out.push(cur); cur = x; } else cur = (cur + " " + x).trim(); } if (cur) out.push(cur); return out; }

const B = {
  flow: b => `<ol class="flow">${(b.steps || []).map((s, i) => `<li><span class="n">${i + 1}</span><div><b>${rich(s.label)}</b>${s.tag ? `<em class="tag">${rich(s.tag)}</em>` : ""}<p>${rich(s.text)}</p>${ref(s.ref)}</div></li>`).join("")}</ol>`,
  layers: b => {
    const L = b.steps, n = L.length, R0 = 26, R1 = 120, st = (R1 - R0) / n;
    const rings = L.map((x, j) => { const r = R1 - (n - 1 - j) * st; return `<circle cx="130" cy="130" r="${r.toFixed(1)}" fill="hsl(38 60% ${92 - j * 3}%)" stroke="#b7791f" stroke-width="1.2"/>`; }).reverse().join("");
    const nums = L.map((x, j) => { const r = R1 - (n - 1 - j) * st - st / 2, a = -Math.PI / 2 + j * 0.62; return `<text x="${(130 + Math.cos(a) * r).toFixed(1)}" y="${(134 + Math.sin(a) * r).toFixed(1)}" class="sv-n">${j + 1}</text>`; }).join("");
    return `<div class="layers"><svg viewBox="0 0 260 260" width="230" height="230">${rings}<circle cx="130" cy="130" r="${R0 - 3}" fill="#b7791f"/>${wrapSvgText(b.center, 10).map((l, i, a) => `<text x="130" y="${133 + (i - (a.length - 1) / 2) * 11}" class="sv-c">${esc(l)}</text>`).join("")}${nums}</svg>${B.flow({ steps: L })}</div>`;
  },
  ring: b => {
    const it = b.items, n = it.length;
    const nodes = it.map((x, j) => { const a = -Math.PI / 2 + j / n * Math.PI * 2, X = 130 + Math.cos(a) * 92, Y = 130 + Math.sin(a) * 92; return `<line x1="130" y1="130" x2="${X.toFixed(1)}" y2="${Y.toFixed(1)}" stroke="#d6bc8a"/><circle cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" r="16" fill="#fff" stroke="#b7791f" stroke-width="1.5"/><text x="${X.toFixed(1)}" y="${(Y + 4).toFixed(1)}" class="sv-n">${j + 1}</text>`; }).join("");
    return `<div class="ringbox"><svg viewBox="0 0 260 260" width="210" height="210"><circle cx="130" cy="130" r="92" fill="none" stroke="#e6d3ad" stroke-dasharray="4 4"/>${nodes}<circle cx="130" cy="130" r="40" fill="#b7791f"/>${wrapSvgText(b.center.label, 11).map((l, i, a) => `<text x="130" y="${133 + (i - (a.length - 1) / 2) * 11}" class="sv-c">${esc(l)}</text>`).join("")}</svg><div><div class="center-note"><b>${rich(b.center.label)}</b><p>${rich(b.center.text)}</p>${ref(b.center.ref)}</div><ol class="mini">${it.map(x => `<li><b>${rich(x.label)}</b> ${rich(x.text)}${ref(x.ref)}</li>`).join("")}</ol></div></div>`;
  },
  mindmap: b => {
    const br = b.branches, n = br.length, cols = ["#b7791f", "#9b2c2c", "#2f855a", "#2b6cb0", "#6b46c1", "#c05621", "#319795", "#b83280", "#4a5568", "#2c7a7b", "#975a16"];
    const nodes = br.map((x, j) => { const a = -Math.PI / 2 + j / n * Math.PI * 2, X = 200 + Math.cos(a) * 140, Y = 120 + Math.sin(a) * 88, c = cols[j % cols.length]; return `<path d="M200 120 Q${((200 + X) / 2).toFixed(0)} ${((120 + Y) / 2 - 18).toFixed(0)} ${X.toFixed(0)} ${Y.toFixed(0)}" stroke="${c}" stroke-width="2" fill="none"/><circle cx="${X.toFixed(0)}" cy="${Y.toFixed(0)}" r="11" fill="${c}"/><text x="${X.toFixed(0)}" y="${(Y + 4).toFixed(0)}" class="sv-w">${j + 1}</text>`; }).join("");
    return `<div class="mind"><svg viewBox="0 0 400 240" width="100%" height="200">${nodes}<ellipse cx="200" cy="120" rx="62" ry="28" fill="#2d2416"/>${wrapSvgText(b.center, 16).map((l, i, a) => `<text x="200" y="${124 + (i - (a.length - 1) / 2) * 12}" class="sv-c">${esc(l)}</text>`).join("")}</svg><div class="branches">${br.map((x, j) => `<div class="branch" style="--c:${cols[j % cols.length]}"><b><span>${j + 1}</span>${rich(x.branch)}</b><ul>${(x.leaves || []).map(l => `<li>${rich(l)}</li>`).join("")}</ul></div>`).join("")}</div></div>`;
  },
  compare: b => `<table class="cmp"><thead><tr><th></th>${(b.labels || []).map(l => `<th>${rich(l)}</th>`).join("")}</tr></thead><tbody>${b.items.map(r => `<tr><th>${rich(r.topic)}</th>${(r.cols || []).map(c => `<td>${rich(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  words: b => `<div class="words">${b.items.map(w => `<div class="word"><div class="w-h"><b>${rich(w.word)}</b><small>${rich(w.lang || "")}</small></div><div class="gloss">${rich(w.gloss || "")}</div><p>${rich(w.meaning || "")}</p>${ref(w.ref)}</div>`).join("")}</div>`,
  cards: b => `<div class="cards">${b.items.map(c => `<div class="card"><b>${rich(c.title)}</b><p>${rich(c.text)}</p>${ref(c.ref)}</div>`).join("")}</div>`,
  timeline: b => `<div class="tl">${b.items.map(t => `<div class="tl-i ${t.kind === "mixed" ? "mixed" : ""}"><div class="tl-y">${rich(t.year)}</div><div class="tl-b"><b>${rich(t.label)}</b><p>${rich(t.text)}</p>${ref(t.ref)}</div></div>`).join("")}</div>${b.legend ? `<div class="legend">${b.legend.map(l => `<span class="${l[0] === "mixed" ? "mixed" : ""}"><i></i>${rich(l[1])}</span>`).join("")}</div>` : ""}`,
  args: b => b.items.map(a => `<div class="arg"><div class="a-q"><span>Objection</span>${rich(a.arg)}</div>${a.truth ? `<div class="a-t"><span>What is true</span>${rich(a.truth)}</div>` : ""}<div class="a-a"><span>Answer</span>${rich(a.answer)}</div>${ref(a.ref)}</div>`).join(""),
  quiz: (b, ctx) => `<ol class="quiz">${b.items.map(q => { answers.push({ study: ctx.num, title: ctx.short, q: q.q, a: q.options[q.answer], why: q.why }); return `<li><p>${rich(q.q)}</p><div class="opts">${q.options.map((o, i) => `<span><i>${"ABCDE"[i]}</i>${rich(o)}</span>`).join("")}</div></li>`; }).join("")}</ol><p class="hint">Answers are in the answer key at the back of the workbook.</p>`,
  decide: b => {
    const N = b.nodes, ids = Object.keys(N), lab = {}; let qi = 0, ei = 0;
    ids.forEach(k => lab[k] = N[k].end ? String.fromCharCode(65 + ei++) : "Q" + ++qi);
    return `<div class="dec">${ids.map(k => { const x = N[k]; return x.end ? `<div class="dec-e"><span>${lab[k]}</span><div><b>${rich(x.title)}</b><p>${rich(x.text)}</p>${ref(x.ref)}</div></div>` : `<div class="dec-q"><span>${lab[k]}</span><div><b>${rich(x.q)}</b>${x.text ? `<p>${rich(x.text)}</p>` : ""}<div class="dec-o">${x.options.map(o => `<em>${rich(o.label)} → <b>${lab[o.to] || "?"}</b></em>`).join("")}</div>${ref(x.ref)}</div></div>`; }).join("")}</div>`;
  },
  data: b => `<div class="data">${b.items.map(d => `<div class="dt"><div class="dt-v">${rich(d.value)}</div><b>${rich(d.label)}</b>${(d.bars || []).map(x => `<div class="bar"><small>${rich(x.label)}</small><div><i style="width:${Math.max(4, Math.min(100, x.pct))}%"></i></div><em>${rich(x.show || "")}</em></div>`).join("")}<p>${rich(d.text || "")}</p>${d.meaning ? `<p class="m">${rich(d.meaning)}</p>` : ""}</div>`).join("")}</div>`,
  reveal: b => `${b.intro ? `<p>${rich(b.intro)}</p>` : ""}<ol class="mini">${b.items.map(x => `<li><b>${rich(x.label)}</b> ${rich(x.text)}${ref(x.ref)}</li>`).join("")}</ol>`,
  prism: b => `<div class="center-note"><b>${rich(b.center && (b.center.label || b.center))}</b>${b.center && b.center.text ? `<p>${rich(b.center.text)}</p>` : ""}</div><div class="cards">${b.items.map(c => `<div class="card"><b>${rich(c.label)}</b><p>${rich(c.text)}</p>${c.now ? `<p><em>Now:</em> ${rich(c.now)}</p>` : ""}${c.later ? `<p><em>Later:</em> ${rich(c.later)}</p>` : ""}${ref(c.ref)}</div>`).join("")}</div>`,
  quotes: b => b.items.map(q => `<blockquote><p>${rich(q.quote)}</p><cite>${rich(q.who || "")}${q.work ? ", " + rich(q.work) : ""}</cite>${q.comment ? `<p class="m">${rich(q.comment)}</p>` : ""}</blockquote>`).join(""),
  columns: b => `<div class="cols">${b.cols.map(c => `<div class="col"><b>${rich(c.label)}</b><ol class="mini">${(c.steps || []).map(s => `<li><b>${rich(s.s)}</b> ${rich(s.t)}</li>`).join("")}</ol></div>`).join("")}</div>`,
  spines: b => `<table class="cmp"><thead><tr><th>${rich(b.left || "")}</th><th>${rich(b.right || "")}</th></tr></thead><tbody>${b.items.map(r => `<tr><td>${rich(r.l)}</td><td>${rich(r.r)}${ref(r.ref)}</td></tr>`).join("")}</tbody></table>`,
  series: b => b.parts.map((p, i) => `<div class="part"><h4>Part ${i + 1}: ${rich(p.title)}</h4>${p.thesis ? `<p class="thesis-s">${rich(p.thesis)}</p>` : ""}${p.summary ? `<p>${rich(p.summary)}</p>` : ""}${p.flow ? B.flow({ steps: p.flow.map(f => ({ label: f.step, text: f.text })) }) : ""}${p.teachings ? `<div class="cards">${p.teachings.map(t => `<div class="card"><b>${rich(t.title)}</b><p>${rich(t.body)}</p>${ref(t.refs)}</div>`).join("")}</div>` : ""}${p.words ? `<div class="words">${p.words.map(w => `<div class="word"><div class="w-h"><b>${rich(w.word)}</b><small>${rich(w.lang || "")}</small></div><p><em>Claimed:</em> ${rich(w.claimed || "")}</p><p><em>Lexicon:</em> ${rich(w.lexicon || "")}</p></div>`).join("")}</div>` : ""}${p.fair ? p.fair.map(f => `<div class="fair"><b>Fair note:</b> ${rich(f.claim)} ${rich(f.note)}</div>`).join("") : ""}</div>`).join("")
};

function blockHTML(b, ctx) {
  const f = B[b.type]; if (!f) return "";
  if (b.items && !b.items.length) return "";
  return `<section class="blk blk-${b.type}"><h3>${rich(b.title || b.nav || "")}</h3>${b.note ? `<p class="note">${rich(b.note)}</p>` : ""}${f(b, ctx)}</section>`;
}

let num = 0;
function studyHTML(id, part) {
  const s = S[id]; num++;
  const short = id === "wmx" ? "Eve and life (Genesis 2–3)" : s.short;
  const title = id === "wmx" ? "Eve and life: Genesis 2–3" : s.title;
  const ctx = { num, short };
  const qa = (s.qa || []);
  const reflect = [
    "In one or two sentences, what is the main idea of this study?",
    ...qa.slice(0, 3).map(q => q.q),
    "Which scripture in this study stood out to you most, and why?",
    "What is one way this changes how you see the Father, yourself or others this week?"
  ];
  return `<article class="study" style="--pc:${part.color}" id="s-${id}">
  <header class="s-head"><div class="s-num">${num}</div><div><div class="eyebrow">${esc(part.name)}${s.eyebrow ? " · " + rich(s.eyebrow) : ""}</div><h2>${rich(title)}</h2></div></header>
  ${s.lede ? `<p class="lede">${rich(s.lede)}</p>` : ""}
  ${s.thesis ? `<div class="thesis"><div class="t-h">The short answer</div><p>${rich(s.thesis)}</p></div>` : ""}
  ${s.blocks.map(b => blockHTML(b, ctx)).join("")}
  ${qa.length ? `<section class="blk"><h3>Questions and answers</h3>${qa.map(q => `<div class="qa"><b>${rich(q.q)}</b><p>${rich(q.short)}</p>${(q.sections || []).map(x => `<p><em>${rich(x.title)}:</em> ${(x.body || []).map(rich).join(" ")}</p>`).join("")}${ref(q.refs)}</div>`).join("")}</section>` : ""}
  <section class="work"><div class="w-title">${ico("book", 18, part.color)} Workbook: ${rich(short)}</div>
    ${reflect.map((r, i) => `<div class="rq"><b>${i + 1}. ${rich(r)}</b>${lines(i === 0 ? 3 : 2)}</div>`).join("")}
    <div class="mv"><b>Memory verse</b><span>Choose one verse from this study and write it out.</span>${lines(2)}</div>
  </section></article>`;
}

function themesHTML() {
  const T = RG.themes || [];
  return `<article class="study foundations" style="--pc:#2d2416"><header class="s-head"><div class="s-num">★</div><div><div class="eyebrow">Foundations</div><h2>The great themes at a glance</h2></div></header>
  <p class="lede">The relational gospel in ${T.length} themes. Each is a doorway into the studies that follow.</p>
  <div class="themes">${T.map((t, i) => `<div class="theme"><div class="th-n">${i + 1}</div><div><b>${rich(t.title)}</b><p>${rich(t.tagline || "")}</p>${(t.keyVerses || []).slice(0, 2).map(v => `<div class="kv"><em>${esc(v.ref)}</em> ${rich(v.text)}</div>`).join("")}</div></div>`).join("")}</div></article>`;
}

const cover = `<div class="cover"><svg viewBox="0 0 300 300" width="300" height="300"><defs><radialGradient id="g" cx="50%" cy="45%"><stop offset="0" stop-color="#f6d98b"/><stop offset="1" stop-color="#b7791f"/></radialGradient></defs>
${Array.from({ length: 36 }, (_, i) => { const a = i / 36 * Math.PI * 2; return `<line x1="${150 + Math.cos(a) * 112}" y1="${150 + Math.sin(a) * 112}" x2="${150 + Math.cos(a) * (i % 3 ? 124 : 134)}" y2="${150 + Math.sin(a) * (i % 3 ? 124 : 134)}" stroke="#b7791f" stroke-width="1.4"/>`; }).join("")}
<circle cx="150" cy="150" r="104" fill="none" stroke="#e2c27a" stroke-dasharray="3 5"/>
<circle cx="130" cy="138" r="44" fill="none" stroke="#9b2c2c" stroke-width="3"/><circle cx="170" cy="138" r="44" fill="none" stroke="#2b6cb0" stroke-width="3"/><circle cx="150" cy="172" r="44" fill="none" stroke="#2f855a" stroke-width="3"/>
<circle cx="150" cy="150" r="22" fill="url(#g)"/><path d="M150 138v24M142 146h16" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
<div class="c-eyebrow">A study workbook</div><h1>The Relational Gospel</h1><div class="c-sub">Father, Son and Spirit drawing the world into their love</div>
<div class="c-meta">${Object.keys(S).length} studies · ${PARTS.length} parts · diagrams, word studies, discussion guides, quizzes and reflection pages</div></div>`;

const howto = `<article class="study howto"><h2>How to use this workbook</h2>
<div class="steps4">${[["Read", "Start with the lede and “The short answer” to see the whole study in a paragraph."], ["Look", "Walk through the diagrams: flowcharts, maps, rings, timelines and comparison tables."], ["Test", "Weigh the objections and fair notes, look up every reference, and take the quiz."], ["Reflect", "Use the workbook page at the end of each study, alone or with a group."]].map((s, i) => `<div><span>${i + 1}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join("")}</div>
<h3>For group leaders</h3><ul><li>One study per session works well; longer studies can be split at their section headings.</li><li>Ask the group to read the short answer aloud, then choose two or three diagrams to discuss.</li><li>Let people disagree well: each study includes fair notes on where Christians differ.</li><li>End with the reflection questions and the memory verse.</li></ul>
<h3>Contents</h3>${(() => { let n = 0; return PARTS.map((p, pi) => `<div class="toc-p" style="--pc:${p.color}"><div class="toc-h">${ico(p.icon, 16, p.color)} Part ${pi + 1}: ${p.name}</div><ol start="${n + 1}">${p.ids.map(id => { n++; return `<li>${esc(id === "wmx" ? "Eve and life (Genesis 2–3)" : S[id].short)}</li>`; }).join("")}</ol></div>`).join(""); })()}</article>`;

let body = cover + howto + themesHTML();
PARTS.forEach((p, pi) => {
  body += `<div class="part-page" style="--pc:${p.color}"><div class="pp-icon">${ico(p.icon, 64, "#fff")}</div><div class="pp-n">Part ${pi + 1}</div><h1>${p.name}</h1><p>${p.intro}</p><ol>${p.ids.map(id => `<li>${esc(id === "wmx" ? "Eve and life (Genesis 2–3)" : S[id].short)}</li>`).join("")}</ol></div>`;
  for (const id of p.ids) body += studyHTML(id, p);
});
body += `<article class="study key"><h2>Answer key</h2>${(() => { let cur = 0, out = ""; for (const a of answers) { if (a.study !== cur) { cur = a.study; out += `<h4>${a.study}. ${esc(a.title)}</h4>`; } out += `<p><b>${rich(a.q)}</b><br>${rich(a.a)}${a.why ? ` <span class="why">${rich(a.why)}</span>` : ""}</p>`; } return out; })()}</article>`;
body += `<article class="study notes"><h2>Notes</h2>${lines(30)}</article>`;

const css = fs.readFileSync(path.join(__dirname, "workbook.css"), "utf8");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The Relational Gospel: A Study Workbook</title><style>${css}</style></head><body>${body}</body></html>`;
fs.mkdirSync(path.join(R, "workbook"), { recursive: true });
const htmlPath = path.join(R, "workbook", "workbook.html"); fs.writeFileSync(htmlPath, html);

(async () => {
  const { chromium } = require("playwright");
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("file://" + htmlPath); await p.waitForTimeout(500);
  const out = path.join(R, "workbook", "Relational-Gospel-Workbook.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, outline: true, tagged: true, displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: '<div style="width:100%;font:8px Inter,sans-serif;color:#8a7a5c;padding:0 14mm;display:flex;justify-content:space-between"><span>The Relational Gospel · Study Workbook</span><span class="pageNumber"></span></div>',
    margin: { top: "14mm", bottom: "16mm", left: "14mm", right: "14mm" } });
  await b.close(); console.log("wrote", out, (fs.statSync(out).size / 1048576).toFixed(1) + " MB");
})();
