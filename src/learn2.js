/* Atlas 2 learning layer: dashboard (progress, continue, learning paths, daily review),
   study tools (reading progress, mark as learned, review flashcards, next in path). Atlas 2 build only. */
(function () {
  var KEY = "rga.learn";
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var S = load(); S.seen = S.seen || {}; S.learned = S.learned || {}; S.rev = S.rev || {};
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function T(t, v) { return window.RGtr ? RGtr(t, v) : t.replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function studies() { var R = window.RG && RG.studies || {}; return Object.keys(R).filter(function (k) { return !R[k].hidden && R[k].blocks; }); }
  function label(id) { var a = document.querySelector('#rail a[href="#' + id + '"]'); if (a) return a.textContent.trim(); var s = RG.studies && RG.studies[id]; return s ? s.short : id; }
  function exists(id) { return !!document.querySelector('#rail a[href="#' + id + '"]') || !!(RG.studies && RG.studies[id]); }

  var PATHS = [
    { id: "god", name: "Who God is", icon: "sun", ids: ["love", "trinity", "authored", "question", "sovereign", "ways"] },
    { id: "work", name: "The finished work", icon: "cross", ids: ["reconcile", "inclusion", "lamb", "facets", "tenses", "allsaved"] },
    { id: "life", name: "New life in Christ", icon: "sprout", ids: ["reborn", "newcreation", "unfold", "identity", "healing", "sons"] },
    { id: "read", name: "Reading the Bible well", icon: "book", ids: ["conflate", "misuse", "trees", "myths", "lens", "violence"] },
    { id: "live", name: "Living it out", icon: "hands", ids: ["boundaries", "forgive", "justice", "resist", "gifts", "mission"] }
  ];
  var ICON = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    cross: '<path d="M12 2v20M6 8h12"/>',
    sprout: '<path d="M12 22V11"/><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7z"/><path d="M12 13c0-3 2.5-6 7-6 0 3.5-2.5 6-7 6z"/>',
    book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    hands: '<path d="M7 11V6a2 2 0 0 1 4 0v5"/><path d="M11 9V4a2 2 0 0 1 4 0v7"/><path d="M15 8a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L3 13a2 2 0 0 1 3.4-2L8 13"/>'
  };
  function ico(n, c) { return '<svg class="' + (c || "l2-ico") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[n] || "") + "</svg>"; }

  /* ---------- flashcards from quiz items ---------- */
  function cardsFor(ids) { var out = []; ids.forEach(function (id) { var s = RG.studies[id]; if (!s) return; s.blocks.forEach(function (b) { if (b.type === "quiz") b.items.forEach(function (q) { out.push({ id: id, q: q.q, a: q.options[q.answer], why: q.why || "" }); }); }); }); return out; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function dailyCards() {
    var all = cardsFor(studies()); if (!all.length) return [];
    var t = today(), seed = 0; for (var i = 0; i < t.length; i++) seed = (seed * 31 + t.charCodeAt(i)) >>> 0;
    var pick = []; for (var j = 0; j < 3; j++) { seed = (seed * 1103515245 + 12345) >>> 0; pick.push(all[seed % all.length]); }
    return pick;
  }
  function flashHTML(c, i, n) {
    return '<div class="l2-flip" data-l2flip tabindex="0" role="button" aria-label="Flip card"><div class="l2-face l2-front"><small>' + esc(T("{a} of {b}", { a: i + 1, b: n })) + " · " + esc(label(c.id)) + "</small><p>" + esc(c.q) + '</p><span class="l2-hint">Tap to reveal</span></div><div class="l2-face l2-back"><small>Answer</small><p><b>' + esc(c.a) + "</b></p><p>" + esc(c.why) + "</p></div></div>";
  }
  var deck = null, di = 0;
  function openDeck(cards, title) {
    if (!cards.length) return; deck = cards; di = 0; closeDeck();
    var m = document.createElement("div"); m.className = "l2-modal"; m.id = "l2-modal";
    m.innerHTML = '<div class="l2-sheet" role="dialog" aria-modal="true"><div class="l2-sheet-h"><b>' + esc(title) + '</b><button type="button" class="l2-x" data-l2close aria-label="Close">×</button></div><div id="l2-deck"></div><div class="l2-row"><button type="button" class="btn ghost" data-l2prev>← Previous</button><button type="button" class="btn" data-l2next>Next →</button></div></div>';
    document.body.appendChild(m); drawDeck();
  }
  function drawDeck() { var d = document.getElementById("l2-deck"); if (d && deck) d.innerHTML = flashHTML(deck[di], di, deck.length) + '<div class="l2-dots">' + deck.map(function (_, k) { return "<i" + (k === di ? ' class="on"' : "") + "></i>"; }).join("") + "</div>"; }
  function closeDeck() { var m = document.getElementById("l2-modal"); if (m) m.remove(); }

  /* ---------- dashboard ---------- */
  function ring(p, big, small) {
    var r = 46, c = 2 * Math.PI * r, off = c * (1 - p);
    return '<svg class="l2-ring" viewBox="0 0 110 110"><circle cx="55" cy="55" r="' + r + '" class="l2-ring-bg"/><circle cx="55" cy="55" r="' + r + '" class="l2-ring-fg" style="stroke-dasharray:' + c.toFixed(1) + ";--off:" + off.toFixed(1) + '"/><text x="55" y="56" class="l2-ring-n">' + big + '</text><text x="55" y="73" class="l2-ring-s">' + small + "</text></svg>";
  }
  function pathHTML(P) {
    var ids = P.ids.filter(exists), n = ids.length, done = ids.filter(function (i) { return S.seen[i]; }).length;
    var W = 600, gap = W / (n - 1 || 1), far = -1; ids.forEach(function (id, k) { if (S.seen[id]) far = k; }); var fill = far < 0 ? 0 : Math.max(12, far / (n - 1 || 1) * 600).toFixed(0);
    var stops = ids.map(function (id, k) { var x = (k * gap / W * 100).toFixed(2); return '<a class="l2-stop' + (S.seen[id] ? " seen" : "") + (S.learned[id] ? " learned" : "") + '" href="#' + id + '" style="left:' + x + "%;--k:" + k + '"><i></i><span>' + esc(label(id)) + "</span></a>"; }).join("");
    return '<article class="l2-path" data-l2p="' + P.id + '"><header>' + ico(P.icon) + "<div><b>" + esc(T(P.name)) + "</b><small>" + esc(T("{a} of {b} explored", { a: done, b: n })) + '</small></div></header><div class="l2-line"><svg viewBox="0 0 600 8" preserveAspectRatio="none"><line x1="0" y1="4" x2="600" y2="4" class="l2-track"/><line x1="0" y1="4" x2="' + fill + '" y2="4" class="l2-fill"/></svg>' + stops + "</div></article>";
  }
  function dashHTML() {
    var ids = studies(), n = ids.length, seen = ids.filter(function (i) { return S.seen[i]; }).length, learned = ids.filter(function (i) { return S.learned[i]; }).length;
    var last = S.last && exists(S.last) ? S.last : null;
    var orbit = PATHS.map(function (P, k) { var a = k / PATHS.length * 360; return '<a class="l2-orb" href="#' + P.ids.filter(exists)[0] + '" style="--a:' + a + 'deg" title="' + esc(T(P.name)) + '">' + ico(P.icon) + "</a>"; }).join("");
    var daily = dailyCards();
    return '<section class="l2-dash" id="l2-dash">' +
      '<div class="l2-hero"><div class="l2-hero-t"><div class="label">Your learning space</div><h2>Learn the relational gospel, one step at a time</h2><p>Follow a path, pick up where you left off, and review a few questions each day. Your progress stays on this device.</p>' +
        (last ? '<a class="btn" href="#' + last + '">' + esc(T("Continue: {t}", { t: label(last) })) + " →</a>" : '<a class="btn" href="#reconcile">Start here →</a>') + '</div>' +
        '<div class="l2-orbit" aria-hidden="true"><div class="l2-core">✝</div><div class="l2-orbs">' + orbit + "</div></div></div>" +
      '<div class="l2-stats"><div class="l2-stat">' + ring(n ? seen / n : 0, seen, T("of {n}", { n: n })) + '<b>Studies explored</b></div><div class="l2-stat">' + ring(n ? learned / n : 0, learned, T("learned")) + '<b>Marked as learned</b></div><div class="l2-stat l2-daily"><b>Today’s review</b><p>Three questions from across the atlas, new each day.</p><button type="button" class="btn" data-l2daily' + (daily.length ? "" : " disabled") + '>Start review</button></div></div>' +
      '<h2 class="l2-h">Learning paths</h2><p class="note">Six studies each, in a helpful order. Filled stations are ones you have explored.</p><div class="l2-paths">' + PATHS.map(pathHTML).join("") + "</div></section>";
  }

  /* ---------- study tools ---------- */
  function nextInPath(id) { for (var i = 0; i < PATHS.length; i++) { var ids = PATHS[i].ids.filter(exists), k = ids.indexOf(id); if (k > -1 && k < ids.length - 1) return { path: PATHS[i], next: ids[k + 1] }; } return null; }
  function toolsHTML(id) {
    var s = RG.studies[id], q = cardsFor([id]).length, np = nextInPath(id), L = !!S.learned[id];
    return '<section class="section l2-tools" id="l2-tools"><div class="l2-tools-g"><div class="l2-read"><div class="label">Reading progress</div><div class="l2-bar"><i id="l2-bar" style="width:0%"></i></div><small id="l2-bar-t">0%</small></div>' +
      '<button type="button" class="btn' + (L ? "" : " ghost") + '" data-l2learn="' + id + '">' + (L ? "✓ Learned" : "Mark as learned") + "</button>" +
      (q ? '<button type="button" class="btn ghost" data-l2rev="' + id + '">' + esc(T("Review this study ({n})", { n: q })) + "</button>" : "") +
      "</div>" + (np ? '<a class="l2-next" href="#' + np.next + '">' + ico(np.path.icon) + "<span><small>" + esc(T("Next in “{t}”", { t: T(np.path.name) })) + "</small><b>" + esc(label(np.next)) + "</b></span><em>→</em></a>" : "") + "</section>";
  }
  var readIO = null, seenB = {};
  function trackReading(id) {
    if (readIO) readIO.disconnect(); seenB = {};
    var B = document.querySelectorAll("#main .st-b"); if (!B.length || !("IntersectionObserver" in window)) return;
    readIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) seenB[e.target.id] = 1; }); var p = Math.round(Object.keys(seenB).length / B.length * 100), bar = document.getElementById("l2-bar"), t = document.getElementById("l2-bar-t"); if (bar) bar.style.width = p + "%"; if (t) t.textContent = p + "%"; }, { threshold: 0.35 });
    B.forEach(function (b) { readIO.observe(b); });
  }

  /* ---------- routing ---------- */
  var busy = false;
  function route() {
    if (busy) return; var main = document.getElementById("main"); if (!main) return;
    var h = decodeURIComponent(location.hash.slice(1)) || "atlas";
    busy = true;
    try {
      if (window.RG && RG.studies && RG.studies[h] && !RG.studies[h].hidden) {
        S.seen[h] = Date.now(); S.last = h; save();
        if (!document.getElementById("l2-tools")) { var qa = main.querySelector('[id$="-qa"]'); var wrap = document.createElement("div"); wrap.innerHTML = toolsHTML(h); (qa && qa.parentNode === main ? main.insertBefore(wrap.firstChild, qa) : main.appendChild(wrap.firstChild)); trackReading(h); }
      } else if (h === "atlas" || h === "home") {
        if (!document.getElementById("l2-dash")) { var d = document.createElement("div"); d.innerHTML = dashHTML(); var host = main.querySelector(".plate") || main; host.insertBefore(d.firstChild, host.firstElementChild); }
      } else if (S.last !== h && document.querySelector('#rail a[href="#' + h + '"]')) { S.seen[h] = Date.now(); save(); }
    } finally { setTimeout(function () { busy = false; }, 0); }
  }
  function refresh(sel, html) { var el = document.getElementById(sel); if (!el) return; var d = document.createElement("div"); d.innerHTML = html; el.replaceWith(d.firstChild); }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-l2daily]")) { openDeck(dailyCards(), T("Today’s review")); return; }
    var rv = t.closest("[data-l2rev]"); if (rv) { openDeck(cardsFor([rv.dataset.l2rev]), T("Review: {t}", { t: label(rv.dataset.l2rev) })); return; }
    var lr = t.closest("[data-l2learn]"); if (lr) { var id = lr.dataset.l2learn; if (S.learned[id]) delete S.learned[id]; else S.learned[id] = Date.now(); save(); lr.classList.toggle("ghost", !S.learned[id]); lr.textContent = S.learned[id] ? T("✓ Learned") : T("Mark as learned"); if (S.learned[id] && !RM) burst(lr); return; }
    if (t.closest("[data-l2flip]")) { t.closest("[data-l2flip]").classList.toggle("flipped"); return; }
    if (t.closest("[data-l2next]")) { if (deck && di < deck.length - 1) { di++; drawDeck(); } else closeDeck(); return; }
    if (t.closest("[data-l2prev]")) { if (deck && di > 0) { di--; drawDeck(); } return; }
    if (t.closest("[data-l2close]") || t.classList.contains("l2-modal")) { closeDeck(); return; }
  });
  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("l2-modal")) return;
    if (e.key === "Escape") closeDeck(); else if (e.key === "ArrowRight") { if (deck && di < deck.length - 1) { di++; drawDeck(); } } else if (e.key === "ArrowLeft") { if (di > 0) { di--; drawDeck(); } } else if (e.key === " " || e.key === "Enter") { var f = document.querySelector("#l2-deck [data-l2flip]"); if (f) { e.preventDefault(); f.classList.toggle("flipped"); } }
  });
  function burst(el) {
    var r = el.getBoundingClientRect(), box = document.createElement("div"); box.className = "l2-burst"; box.style.left = r.left + r.width / 2 + "px"; box.style.top = r.top + r.height / 2 + "px";
    for (var i = 0; i < 12; i++) { var s = document.createElement("i"); s.style.setProperty("--a", i * 30 + "deg"); box.appendChild(s); }
    document.body.appendChild(box); setTimeout(function () { box.remove(); }, 900);
  }

  function init() {
    var main = document.getElementById("main"); if (!main) { setTimeout(init, 100); return; }
    new MutationObserver(function () { setTimeout(route, 80); }).observe(main, { childList: true });
    addEventListener("hashchange", function () { setTimeout(route, 120); });
    setTimeout(route, 300);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
