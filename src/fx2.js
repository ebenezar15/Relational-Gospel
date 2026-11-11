/* Atlas 2 motion + speed layer: procedural study emblems, block choreography, card tilt,
   quick switcher (command palette), keyboard shortcuts. Atlas 2 build only. */
(function () {
  var A2 = window.A2 = window.A2 || {};
  var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var HOVER = !!(window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches);
  var EASE = "cubic-bezier(.2,.7,.2,1)", SPRING = "cubic-bezier(.34,1.4,.64,1)";
  function T(t, v) { return window.RGtr ? RGtr(t, v) : t.replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function hash() { try { return decodeURIComponent(location.hash.slice(1)) || "atlas"; } catch (e) { return location.hash.slice(1) || "atlas"; } }
  function learn() { try { var L = JSON.parse(localStorage.getItem("rga.learn") || "{}") || {}; L.seen = L.seen || {}; L.learned = L.learned || {}; return L; } catch (e) { return { seen: {}, learned: {} }; } }

  /* ---------- seeded emblem: a rosette, a star polygon and a small constellation per study ---------- */
  function rng(str) {
    var h = 1779033703 ^ str.length; for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
  }
  var uid = 0;
  function petal(R, w, b) { return "M0 0C" + w.toFixed(1) + " " + (-R * b).toFixed(1) + " " + (w * 0.75).toFixed(1) + " " + (-R * 0.86).toFixed(1) + " 0 " + (-R).toFixed(1) + "C" + (-w * 0.75).toFixed(1) + " " + (-R * 0.86).toFixed(1) + " " + (-w).toFixed(1) + " " + (-R * b).toFixed(1) + " 0 0Z"; }
  function bead(R, r) { return "M" + (-r).toFixed(1) + " " + (-R).toFixed(1) + "a" + r.toFixed(1) + " " + r.toFixed(1) + " 0 1 0 " + (2 * r).toFixed(1) + " 0a" + r.toFixed(1) + " " + r.toFixed(1) + " 0 1 0 " + (-2 * r).toFixed(1) + " 0Z"; }
  function kite(R, w) { return "M0 0L" + w.toFixed(1) + " " + (-R * 0.55).toFixed(1) + "L0 " + (-R).toFixed(1) + "L" + (-w).toFixed(1) + " " + (-R * 0.55).toFixed(1) + "Z"; }
  A2.emblem = function (id, big) {
    var r = rng(String(id)), k = 3 + Math.floor(r() * 6), u = "em" + (++uid), R1 = 64 + r() * 22, w1 = 10 + r() * 14, R2 = R1 * (0.5 + r() * 0.2), w2 = 7 + r() * 9, style = Math.floor(r() * 3), belly = 0.16 + r() * 0.4, rot = r() * 360 / k, skip = k > 4 ? 2 : 1, i, out = "";
    var p1 = petal(R1, w1, belly), p2 = style === 1 ? bead(R2 * 1.05, 3 + w2 * 0.45) : style === 2 ? kite(R2 * 1.15, w2 * 1.1) : petal(R2, w2, belly), pet = "", pet2 = "";
    for (i = 0; i < k; i++) { pet += '<path d="' + p1 + '" pathLength="1" transform="rotate(' + (rot + i * 360 / k).toFixed(1) + ')" style="--i:' + i + '"/>'; pet2 += '<path d="' + p2 + '" pathLength="1" transform="rotate(' + (rot + (i + 0.5) * 360 / k).toFixed(1) + ')" style="--i:' + i + '"/>'; }
    if (!big) return '<svg class="a2-emblem thumb" viewBox="-100 -100 200 200" aria-hidden="true"><circle r="96" class="em-disc"/><g class="em-p1">' + pet + '</g><g class="em-p2">' + pet2 + '</g><circle r="9" class="em-dot"/></svg>';
    var poly = []; for (i = 0; i < k; i++) { var a = (i * skip % k) * 2 * Math.PI / k - Math.PI / 2 + rot * Math.PI / 180; poly.push((98 * Math.cos(a)).toFixed(1) + " " + (98 * Math.sin(a)).toFixed(1)); }
    var ns = 5 + Math.floor(r() * 4), stars = [], sv = "", ln = "";
    for (i = 0; i < ns; i++) { var an = (i + r() * 0.8) / ns * Math.PI * 2, rad = 52 + r() * 54; stars.push([rad * Math.cos(an), rad * Math.sin(an), 1.6 + r() * 2.2]); }
    stars.forEach(function (s, j) { sv += '<circle cx="' + s[0].toFixed(1) + '" cy="' + s[1].toFixed(1) + '" r="' + s[2].toFixed(1) + '" style="--i:' + j + '"/>'; if (j) ln += "L" + s[0].toFixed(1) + " " + s[1].toFixed(1); else ln = "M" + s[0].toFixed(1) + " " + s[1].toFixed(1); });
    var ticks = ""; for (i = 0; i < 48; i++) { var ta = i * 7.5, l = i % 4 === 0 ? 7 : 3; ticks += '<path d="M0 ' + (-116) + "v" + l + '" transform="rotate(' + ta + ')"/>'; }
    out = '<svg class="a2-emblem" viewBox="-124 -124 248 248" aria-hidden="true"><defs><radialGradient id="' + u + '"><stop offset="0" class="em-s0"/><stop offset=".6" class="em-s1"/><stop offset="1" class="em-s2"/></radialGradient></defs>' +
      '<circle r="122" fill="url(#' + u + ')"/>' +
      '<g class="em-ticks">' + ticks + "</g>" +
      '<circle r="108" class="em-r1"/><circle r="' + (R1 + 8).toFixed(0) + '" class="em-r2"/>' +
      '<g class="em-orbit"><circle cx="108" cy="0" r="4"/><circle cx="-108" cy="0" r="2.4"/></g>' +
      '<polygon class="em-poly" pathLength="1" points="' + poly.join(" ") + '"/>' +
      '<g class="em-rot"><g class="em-p1">' + pet + '</g></g><g class="em-rot b"><g class="em-p2">' + pet2 + "</g></g>" +
      '<path class="em-line" pathLength="1" d="' + ln + '"/><g class="em-stars">' + sv + "</g>" +
      '<circle r="15" class="em-dot"/><path class="em-cross" d="M0 -7.500v15M-5 -2.500h10"/></svg>';
    return out;
  };

  /* ---------- choreography: one-shot entrance for each study block as it scrolls into view ---------- */
  function anim(el, kf, o) { try { return el.animate(kf, { duration: o.d || 560, delay: o.delay || 0, easing: o.e || EASE, fill: "backwards", pseudoElement: o.pseudo }); } catch (e) { return null; } }
  function stag(root, sel, kf, o) {
    o = o || {}; var els = typeof sel === "string" ? root.querySelectorAll(sel) : sel, step = o.s == null ? 60 : o.s, max = o.max || 900;
    Array.prototype.forEach.call(els, function (el, i) { anim(el, kf, { d: o.d, e: o.e, delay: (o.delay || 0) + Math.min(max, i * step) }); });
    return els.length;
  }
  var UP = [{ opacity: 0, translate: "0 18px" }, { opacity: 1, translate: "0 0" }];
  var LEFT = [{ opacity: 0, translate: "-22px 0" }, { opacity: 1, translate: "0 0" }];
  var RIGHT = [{ opacity: 0, translate: "22px 0" }, { opacity: 1, translate: "0 0" }];
  var POP = [{ opacity: 0, scale: ".4" }, { opacity: 1, scale: "1" }];
  var FLIP = [{ opacity: 0, transform: "perspective(900px) rotateX(-16deg) translateY(14px)" }, { opacity: 1, transform: "perspective(900px) rotateX(0) translateY(0)" }];
  function countUp(el) {
    var tn = el.firstChild; if (!tn || el.childNodes.length !== 1 || tn.nodeType !== 3) return;
    var m = /^(\D{0,3})(\d{1,3}(?:,\d{3})*|\d+)(\D{0,12})$/.exec(tn.nodeValue.trim()); if (!m) return;
    var to = +m[2].replace(/,/g, ""), comma = m[2].indexOf(",") > -1; if (!(to > 1)) return;
    var t0 = performance.now(), D = 1100, fin = tn.nodeValue;
    (function tick(t) { var p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3), v = Math.round(to * e); if (!tn.parentNode) return; tn.nodeValue = p >= 1 ? fin : m[1] + (comma ? v.toLocaleString("en-US") : v) + m[3]; if (p < 1) requestAnimationFrame(tick); })(t0);
  }
  A2.play = function (sec) {
    if (RM || !sec || !sec.animate || sec.hasAttribute("data-fx")) return;
    sec.setAttribute("data-fx", "1");
    var q = function (s) { return sec.querySelector(s); };
    stag(sec, ".chips > .chip", POP, { s: 28, d: 380, e: SPRING, max: 420, delay: 80 });
    var f = q(".st-flow");
    if (f) { anim(f, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { d: 300 + f.children.length * 120, pseudo: "::before", delay: 100 }); stag(f, ":scope > .st-step", LEFT, { s: 110, delay: 150, max: 1600 }); stag(f, ":scope > .st-step > i", POP, { s: 110, delay: 220, e: SPRING, max: 1600, d: 420 }); }
    var tl = q(".rc-time");
    if (tl) { anim(tl, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { d: 1300, pseudo: "::before", delay: 100 }); stag(tl, ".rc-tn", UP, { s: 90, delay: 200, max: 1400 }); }
    var mm = q(".st-mind");
    if (mm) { var c = mm.querySelector(".st-mcenter"); if (c) anim(c, POP, { d: 620, e: SPRING }); stag(mm, ".st-mnode", POP, { s: 70, delay: 380, e: SPRING, d: 480 }); }
    var mt = q(".st-mtree"); if (mt) { stag(mt, ".st-mb", LEFT, { s: 55, delay: 120 }); }
    var pr = q(".st-prism"); if (pr) { var core = pr.querySelector(".st-core"); if (core) anim(core, [{ opacity: 0, scale: ".7", rotate: "-40deg" }, { opacity: 1, scale: "1", rotate: "0deg" }], { d: 800, e: SPRING }); stag(pr, ".st-facet", LEFT, { s: 55, delay: 200 }); }
    var rg = q(".rc-loopring"); if (rg) { var rt = rg.querySelector(".rc-root"); if (rt) anim(rt, POP, { d: 600, e: SPRING }); stag(rg, ".jx-node", POP, { s: 90, delay: 300, e: SPRING, d: 480 }); }
    stag(sec, ".rc-sk > .rc-col", UP, { s: 120 }); stag(sec, ".rc-step", UP, { s: 55, delay: 200, max: 1000 });
    stag(sec, ".grid > .gterm, .grid > .card", FLIP, { s: 70, d: 640, max: 840 });
    stag(sec, ".st-quotes > .st-quote", FLIP, { s: 90, d: 680 });
    stag(sec, ".rc-three > .panel, .cmp-pair > .panel", FLIP, { s: 110, d: 620, delay: 180 });
    if (stag(sec, ".rc-data > .rc-stat", UP, { s: 90 })) { sec.querySelectorAll(".rc-num").forEach(countUp); stag(sec, ".rc-track > i", [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { s: 80, d: 900, delay: 300 }); }
    stag(sec, ".st-quiz > .st-q", UP, { s: 70, max: 700 });
    stag(sec, ".st-spines > .st-sn.l", LEFT, { s: 60, delay: 100 }); stag(sec, ".st-spines > .st-sn.r", RIGHT, { s: 60, delay: 100 }); stag(sec, ".st-spines > .st-link", POP, { s: 60, delay: 260, e: SPRING });
    stag(sec, ".st-rail > .st-part", UP, { s: 80 });
    stag(sec, ".qa > details", UP, { s: 45, max: 540 });
    var ly = q(".ly-svg"); if (ly) anim(ly, [{ opacity: 0, scale: ".8", rotate: "-12deg" }, { opacity: 1, scale: "1", rotate: "0deg" }], { d: 900, e: SPRING });
    stag(sec, ".st-decide > .vph-card, .st-reveal", UP, { delay: 120 });
    stag(sec, ".u2-pn > a", UP, { s: 100 });
  };

  /* ---------- pointer tilt + moving highlight on cards ---------- */
  var TILT = ".gterm, .rc-stat, .st-quote, .card, .l2-rc, .l2-stat, .l2-path, .u2-pn a, .l2-next", tiltEl = null, tiltRaf = 0, tx = 0, ty = 0;
  function tiltApply() {
    tiltRaf = 0; var el = tiltEl; if (!el) return;
    var r = el.getBoundingClientRect(), px = (tx - r.left) / r.width, py = (ty - r.top) / r.height, big = r.width > 520;
    el.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    el.style.setProperty("--ry", ((px - 0.5) * (big ? 2 : 5)).toFixed(2) + "deg"); el.style.setProperty("--rx", ((0.5 - py) * (big ? 2 : 5)).toFixed(2) + "deg");
  }
  function tiltOff() { if (!tiltEl) return; tiltEl.classList.remove("a2-tilt"); tiltEl.style.removeProperty("--rx"); tiltEl.style.removeProperty("--ry"); tiltEl = null; }
  if (HOVER && !RM) {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest ? e.target.closest(TILT) : null;
      if (el !== tiltEl) { tiltOff(); tiltEl = el; if (el) el.classList.add("a2-tilt"); }
      if (!el) return; tx = e.clientX; ty = e.clientY; if (!tiltRaf) tiltRaf = requestAnimationFrame(tiltApply);
    }, { passive: true });
    document.addEventListener("pointerleave", tiltOff);
    addEventListener("scroll", tiltOff, { passive: true });
  }

  /* ---------- quick switcher ---------- */
  var cmd = null, items = [], act = 0, lastFocus = null;
  function score(q, words, text) {
    var t = text.toLowerCase(), s = 0;
    for (var i = 0; i < words.length; i++) { var w = words[i], p = t.indexOf(w); if (p < 0) return 0; s += p === 0 ? 30 : /[\s(“"'&:-]/.test(t.charAt(p - 1)) ? 18 : 8; }
    if (t === q) s += 50; return s + Math.max(0, 12 - t.length / 8);
  }
  function mark(text, words) {
    if (!words.length) return esc(text);
    var re; try { re = new RegExp("(" + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi"); } catch (e) { return esc(text); }
    return esc(text).replace(re, "<mark>$1</mark>");
  }
  function actions(q) {
    var L = learn(), dark = document.documentElement.getAttribute("data-theme") === "dark", out = [];
    if (q) out.push({ k: "search", t: T("Search inside every study for “{q}”", { q: q }), ic: "search", run: function () { A2.fullSearch && A2.fullSearch(q); } });
    out.push({ k: "review", t: T("Today’s review"), s: T("Three questions, new each day"), ic: "cards", run: function () { A2.daily && A2.daily(); } });
    out.push({ k: "theme", t: T(dark ? "Switch to light mode" : "Switch to dark mode"), ic: "eye", run: function () { A2.toggleTheme && A2.toggleTheme(); } });
    out.push({ k: "scheme", t: T("Colour scheme"), s: T("Seven palettes"), ic: "palette", run: function () { A2.schemes && A2.schemes(); } });
    if (HOVER) out.push({ k: "keys", t: T("Keyboard shortcuts"), ic: "list", hint: "?", run: function () { setTimeout(keysSheet, 0); } });
    return out;
  }
  function draw() {
    if (!cmd) return;
    var inp = cmd.querySelector("input"), q = inp.value.trim(), ql = q.toLowerCase(), words = ql ? ql.split(/\s+/) : [], pages = A2.pages ? A2.pages() : [], L = learn(), cur = hash(), html = "", n = 0;
    items = [];
    function row(it) { var i = items.length; items.push(it); return '<button type="button" role="option" class="a2-it' + (i === act ? " on" : "") + '" data-i="' + i + '">' + (it.id ? '<span class="g">' + A2.emblem(it.id, false) + "</span>" : '<span class="g a">' + (A2.icon ? A2.icon(it.ic) : "") + "</span>") + '<span class="t"><b>' + (it.html || esc(it.t)) + "</b>" + (it.s ? "<small>" + esc(it.s) + "</small>" : "") + "</span>" + (it.badge ? '<i class="' + it.badge + '"></i>' : "") + (it.hint ? '<span class="kbd" data-noi18n>' + esc(it.hint) + "</span>" : "") + "</button>"; }
    function page(p) { return row({ id: p.id, t: p.label, html: mark(p.label, words), s: p.group, badge: L.learned[p.id] ? "learned" : L.seen[p.id] ? "seen" : "", run: function () { A2.go(p.id); } }); }
    function sect(name, body) { if (body) html += '<div class="a2-gh">' + esc(name) + "</div>" + body; }
    if (!q) {
      var rec = Object.keys(L.seen).filter(function (id) { return id !== cur; }).sort(function (a, b) { return L.seen[b] - L.seen[a]; }).slice(0, 5), by = {}; pages.forEach(function (p) { by[p.id] = p; });
      sect(T("Recently viewed"), rec.filter(function (id) { return by[id]; }).map(function (id) { return page(by[id]); }).join(""));
      sect(T("Quick actions"), actions("").map(row).join(""));
      var g = null, buf = ""; pages.forEach(function (p) { if (p.group !== g) { sect(g, buf); g = p.group; buf = ""; } buf += page(p); }); sect(g, buf);
    } else {
      var hits = pages.map(function (p) { var en = window.RGen ? String(RGen(p.label)) : p.label; return { p: p, s: Math.max(score(ql, words, p.label), en !== p.label ? score(ql, words, en) : 0, score(ql, words, p.group) * 0.3) }; }).filter(function (h) { return h.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 30);
      sect(T("Studies"), hits.map(function (h) { return page(h.p); }).join(""));
      var ac = actions(q).filter(function (a) { return a.k === "search" || score(ql, words, a.t) > 0; });
      sect(T("Quick actions"), ac.map(row).join(""));
    }
    if (act >= items.length) act = 0;
    var list = cmd.querySelector(".a2-cmd-list"); list.innerHTML = html || '<div class="a2-none">' + esc(T("No study matches that.")) + "</div>";
    var on = list.querySelector(".a2-it.on"); if (!on && items.length) { act = 0; on = list.querySelector(".a2-it"); if (on) on.classList.add("on"); }
  }
  function move(d) {
    if (!cmd || !items.length) return; act = (act + d + items.length) % items.length;
    var list = cmd.querySelector(".a2-cmd-list"); list.querySelectorAll(".a2-it.on").forEach(function (b) { b.classList.remove("on"); });
    var b = list.querySelector('.a2-it[data-i="' + act + '"]'); if (b) { b.classList.add("on"); b.scrollIntoView({ block: "nearest" }); }
  }
  function closeCmd() { if (!cmd) return; cmd.remove(); cmd = null; document.body.classList.remove("a2-lock"); if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  function runItem(i) { var it = items[i]; if (!it) return; closeCmd(); it.run(); }
  A2.palette = function () {
    if (cmd) { closeCmd(); return; }
    var lay = document.getElementById("layer"); if (lay && lay.firstChild) return;
    lastFocus = document.activeElement; act = 0;
    cmd = document.createElement("div"); cmd.className = "a2-cmd";
    cmd.innerHTML = '<div class="a2-cmd-box" role="dialog" aria-modal="true" aria-label="Quick switcher"><div class="a2-cmd-in">' + (A2.icon ? A2.icon("search") : "") + '<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Jump to a study, or type to search…" aria-label="Jump to a study, or type to search…"><button type="button" class="kbd" data-a2x data-noi18n>Esc</button></div><div class="a2-cmd-list" role="listbox"></div><div class="a2-cmd-foot"><span><span class="kbd" data-noi18n>↑</span><span class="kbd" data-noi18n>↓</span><span>Move</span></span><span><span class="kbd" data-noi18n>↵</span><span>Open</span></span><span><span class="kbd" data-noi18n>?</span><span>Keyboard shortcuts</span></span></div></div>';
    document.body.appendChild(cmd); document.body.classList.add("a2-lock"); draw();
    var inp = cmd.querySelector("input"); inp.focus();
    inp.addEventListener("input", function () { act = 0; draw(); cmd.querySelector(".a2-cmd-list").scrollTop = 0; });
    cmd.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); } else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); runItem(act); } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeCmd(); }
      else if (e.key === "Tab") { e.preventDefault(); move(e.shiftKey ? -1 : 1); }
    });
    cmd.addEventListener("click", function (e) {
      if (e.target === cmd || e.target.closest("[data-a2x]")) { closeCmd(); return; }
      var b = e.target.closest(".a2-it"); if (b) runItem(+b.getAttribute("data-i"));
    });
    cmd.addEventListener("pointermove", function (e) { var b = e.target.closest && e.target.closest(".a2-it"); if (b && !b.classList.contains("on")) { act = +b.getAttribute("data-i"); cmd.querySelectorAll(".a2-it.on").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); } });
  };

  /* ---------- keyboard shortcuts ---------- */
  var KEYS = [["⌘K", "Jump to any study"], ["/", "Search inside every study"], ["J  K", "Next or previous section"], ["N  P", "Next or previous study"], ["H", "Go to the home page"], ["T", "Switch light or dark"], ["R", "Today’s review"], ["?", "Keyboard shortcuts"]];
  function keysSheet() {
    var old = document.querySelector(".a2-keys"); if (old) { old.remove(); return; }
    var mac = /Mac|iPhone|iPad/.test(navigator.platform || ""), s = document.createElement("div"); s.className = "a2-cmd a2-keys";
    s.innerHTML = '<div class="a2-cmd-box" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts"><div class="a2-keys-h"><b>Keyboard shortcuts</b><button type="button" class="kbd" data-a2x data-noi18n>Esc</button></div><dl>' + KEYS.map(function (k) { return "<div><dt>" + (k[0] === "⌘K" && !mac ? "Ctrl K" : k[0]).split("  ").map(function (x) { return '<span class="kbd" data-noi18n>' + x + "</span>"; }).join("") + "</dt><dd>" + k[1] + "</dd></div>"; }).join("") + "</dl></div>";
    s.addEventListener("click", function (e) { if (e.target === s || e.target.closest("[data-a2x]")) s.remove(); });
    document.body.appendChild(s);
  }
  A2.keys = keysSheet;
  function busy() { var lay = document.getElementById("layer"); return !!((lay && lay.firstChild) || document.getElementById("l2-modal") || document.querySelector(".u2-sheet")); }
  document.addEventListener("keydown", function (e) {
    var k = e.key;
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && (k === "k" || k === "K")) { e.preventDefault(); A2.palette(); return; }
    if (k === "Escape") { var ks = document.querySelector(".a2-keys"); if (ks) ks.remove(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || cmd) return;
    var a = document.activeElement, tag = a && a.tagName; if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag || "") || (a && a.isContentEditable)) return;
    if (busy()) return;
    if (k === "?") { e.preventDefault(); keysSheet(); return; }
    if (document.querySelector(".a2-keys")) return;
    if (k === "j" || k === "J") { e.preventDefault(); A2.section && A2.section(1); }
    else if (k === "k" || k === "K") { e.preventDefault(); A2.section && A2.section(-1); }
    else if (k === "n" || k === "N") { A2.step && A2.step(1); }
    else if (k === "p" || k === "P") { A2.step && A2.step(-1); }
    else if (k === "h" || k === "H") { A2.go && A2.go("atlas"); }
    else if (k === "t" || k === "T") { A2.toggleTheme && A2.toggleTheme(); }
    else if (k === "r" || k === "R") { A2.daily && A2.daily(); }
  });
})();
