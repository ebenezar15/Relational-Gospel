/* Atlas 2 shell: colour schemes, header, grouped sidebar with filter, phone dock and drawer, study header,
   study map, sticky table of contents, scrollspy and progress, previous/next, route transitions. */
(function () {
  var root = document.documentElement, KEY = "rga.ui2";
  var A2 = window.A2 = window.A2 || {};
  var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  A2.reduced = RM;
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function put(o) { try { localStorage.setItem(KEY, JSON.stringify({ scheme: o.scheme, mode: o.mode, rg: o.rg })); } catch (e) {} }
  function learn() { try { var L = JSON.parse(localStorage.getItem("rga.learn") || "{}") || {}; L.seen = L.seen || {}; L.learned = L.learned || {}; return L; } catch (e) { return { seen: {}, learned: {} }; } }
  function T(t, v) { return window.RGtr ? RGtr(t, v) : t.replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function hash() { try { return decodeURIComponent(location.hash.slice(1)) || "atlas"; } catch (e) { return location.hash.slice(1) || "atlas"; } }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var st = get();
  function isDark() { var mode = st.mode || "system"; return mode === "dark" || (mode === "system" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches); }
  function apply() {
    root.setAttribute("data-scheme", st.scheme || "parchment");
    root.setAttribute("data-theme", isDark() ? "dark" : "light");
  }
  apply();
  if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { if ((st.mode || "system") === "system") apply(); });
  A2.toggleTheme = function () { st.mode = isDark() ? "light" : "dark"; put(st); apply(); };
  A2.setScheme = function (s) { st.scheme = s; put(st); apply(); };
  A2.SCHEMES = [["parchment", "Parchment", "#b8892b"], ["byzantine", "Byzantine", "#6a2a8a"], ["lapis", "Lapis", "#1d4ea6"], ["iona", "Iona", "#2f6b4a"], ["desert", "Desert", "#b0541c"], ["monastic", "Monastic", "#5a5243"], ["rose", "Rose", "#a3374d"]];

  function svg(d) { return "url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>") + "\")"; }
  function ic(d, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"; }
  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.7-1.3-.7-2.2 0-.9.8-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.9 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
    star: '<path d="M12 3l1.8 4.9L19 9.7l-4 3.3 1.3 5.2L12 15.4 7.7 18.2 9 13 5 9.7l5.2-1.8z"/>',
    spark: '<path d="M12 2.5l1.9 6.1a2 2 0 0 0 1.5 1.5l6.1 1.9-6.1 1.9a2 2 0 0 0-1.5 1.5L12 21.5l-1.9-6.1a2 2 0 0 0-1.5-1.5L2.500 12l6.100-1.900a2 2 0 0 0 1.500-1.500z"/>',
    home: '<path d="M4 10.5 12 4l8 6.500V19a1 1 0 0 1-1 1h-4.500v-5.500h-5V20H5a1 1 0 0 1-1-1z"/>',
    books: '<path d="M5 4h4v16H5zM10.500 4h4v16h-4z"/><path d="m16 6.200 3.400-.900 3 13.500-3.400.900z" transform="translate(-1.500 0)"/>',
    cards: '<rect x="3" y="6" width="13" height="14" rx="2.500"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/><path d="M7 12h5M7 15.500h3"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.500" cy="6" r="1.200"/><circle cx="4.500" cy="12" r="1.200"/><circle cx="4.500" cy="18" r="1.200"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.500v7l5.500-3.500z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.500 9.300a2.600 2.600 0 1 1 3.600 2.400c-.700.400-1.100.900-1.100 1.800M12 16.800v.200"/>',
    check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
    eye: '<path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
  };
  A2.icon = function (n, w) { return ic(P[n] || "", w); };
  var IC = [
    svg('<circle cx="12" cy="12" r="9"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>'),
    svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/>'),
    svg('<circle cx="12" cy="8" r="4"/><circle cx="8" cy="15" r="4"/><circle cx="16" cy="15" r="4"/>'),
    svg('<path d="M12 3v18M5 21h14M7 7h10M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>'),
    svg('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
    svg('<path d="M20 4c-6 0-11 4-12 11l-3 5"/><path d="M8 15c4 0 7-2 8-6"/>'),
    svg('<path d="M21 12a8 8 0 0 1-11.600 7.100L4 20l1.100-4.600A8 8 0 1 1 21 12z"/>')
  ];

  /* ---------- sidebar: collapsible groups, filter, progress dots ---------- */
  function railLinks() { return Array.prototype.slice.call(document.querySelectorAll("#rail a[href^='#']")); }
  A2.pages = function () {
    return railLinks().map(function (a) { var g = a.closest(".u2-rg"), t = g && g.querySelector(".u2-rgh .t"); return { id: a.getAttribute("href").slice(1), label: a.textContent.trim(), group: t ? t.textContent.trim() : "", gi: g ? +g.getAttribute("data-g") : 0 }; });
  };
  function buildRail() {
    var rail = document.getElementById("rail"); if (!rail || rail.querySelector(".u2-rg") || !rail.querySelector(".rail-group")) return;
    var L = learn(), kids = Array.prototype.slice.call(rail.children), frag = document.createDocumentFragment(), gi = -1, sec = null, list = null, hasCur = false, secs = [];
    var tools = document.createElement("div"); tools.className = "u2-rtools";
    tools.innerHTML = '<input class="u2-rfilter" type="search" autocomplete="off" spellcheck="false" placeholder="Filter studies…" aria-label="Filter studies">';
    frag.appendChild(tools);
    function close() { if (!sec) return; var n = list.children.length; sec.querySelector("em").textContent = n; var o = st.rg && st.rg[gi] != null ? !!st.rg[gi] : gi === 0; if (hasCur) o = true; sec.classList.toggle("open", o); sec.querySelector(".u2-rgh").setAttribute("aria-expanded", o); }
    kids.forEach(function (k) {
      if (k.classList.contains("rail-group")) {
        close(); gi++; hasCur = false;
        sec = document.createElement("section"); sec.className = "u2-rg"; sec.setAttribute("data-g", gi);
        var b = document.createElement("button"); b.type = "button"; b.className = "u2-rgh";
        b.innerHTML = '<span class="ic" style=\'--ic:' + IC[gi % IC.length] + '\'></span><span class="t"></span><em></em>';
        var t = b.querySelector(".t"); while (k.firstChild) t.appendChild(k.firstChild);
        var wrap = document.createElement("div"); wrap.className = "u2-rgl"; list = document.createElement("div"); wrap.appendChild(list);
        sec.appendChild(b); sec.appendChild(wrap); frag.appendChild(sec); secs.push(sec);
      } else if (k.tagName === "A" && list) {
        var id = k.getAttribute("href").slice(1);
        if (L.learned[id]) k.classList.add("learned"); else if (L.seen[id]) k.classList.add("seen");
        if (k.getAttribute("aria-current") === "page") hasCur = true;
        list.appendChild(k);
      }
    });
    close();
    var none = document.createElement("p"); none.className = "u2-rnone"; none.textContent = "No study matches that."; frag.appendChild(none);
    var f = document.createElement("p"); f.className = "u2-railfoot"; f.textContent = "An atlas of the relational gospel: the Father, Son and Spirit drawing the world into their love."; frag.appendChild(f);
    rail.textContent = ""; rail.appendChild(frag); rail.classList.remove("u2-filtering", "u2-empty");
    var cur = rail.querySelector('a[aria-current="page"]');
    if (cur) setTimeout(function () { var r = cur.getBoundingClientRect(), rr = rail.getBoundingClientRect(); if (r.top < rr.top + 60 || r.bottom > rr.bottom - 20) rail.scrollTop += r.top - rr.top - rr.height / 2.6; }, 380);
  }
  function railEvents(rail) {
    rail.addEventListener("click", function (e) {
      var h = e.target.closest(".u2-rgh");
      if (h) { var s = h.parentNode, o = !s.classList.contains("open"); s.classList.toggle("open", o); h.setAttribute("aria-expanded", o); st.rg = st.rg || {}; st.rg[s.getAttribute("data-g")] = o ? 1 : 0; put(st); return; }
      if (e.target.closest("a")) document.body.classList.remove("u2-open");
    });
    rail.addEventListener("input", function (e) {
      if (!e.target.classList || !e.target.classList.contains("u2-rfilter")) return;
      var q = e.target.value.trim().toLowerCase(), n = 0;
      railLinks().forEach(function (a) { var t = a.textContent.toLowerCase(), en = window.RGen ? String(RGen(a.textContent.trim())).toLowerCase() : ""; var ok = !q || t.indexOf(q) > -1 || en.indexOf(q) > -1; a.classList.toggle("u2-hide", !ok); if (ok) n++; });
      rail.classList.toggle("u2-filtering", !!q); rail.classList.toggle("u2-empty", !!q && !n);
    });
    rail.addEventListener("keydown", function (e) {
      if (!e.target.classList || !e.target.classList.contains("u2-rfilter")) return;
      if (e.key === "Enter") { var a = rail.querySelector("a:not(.u2-hide)"); if (a && rail.classList.contains("u2-filtering")) { document.body.classList.remove("u2-open"); go(a.getAttribute("href").slice(1)); } }
      else if (e.key === "Escape") { e.target.value = ""; e.target.dispatchEvent(new Event("input", { bubbles: true })); e.target.blur(); }
    });
  }

  /* ---------- route transitions ---------- */
  function go(h) {
    if (!h) return; if (h === location.hash.slice(1)) { scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); return; }
    if (RM || !document.startViewTransition || !window.RGrender || !history.pushState) { location.hash = h; return; }
    try {
      document.startViewTransition(function () {
        var ok = false; try { history.pushState(null, "", "#" + h); ok = true; } catch (e) {}
        if (ok) window.RGrender(); else location.hash = h;
      });
    } catch (e) { location.hash = h; }
  }
  A2.go = go;
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || a.target === "_blank") return;
    var h = a.getAttribute("href").slice(1); if (!h || h === location.hash.slice(1)) return;
    if (RM || !document.startViewTransition || !window.RGrender) return;
    e.preventDefault(); go(h);
  });

  /* ---------- reveal on scroll (hands each section to the choreographer in fx2.js) ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (A2.play) A2.play(e.target); } }); }, { rootMargin: "0px 0px -7% 0px" }) : null;
  function reveal() {
    document.querySelectorAll("#main .section, #main .st-b, #main .card, #main .u2-pn, #main .l2-path").forEach(function (el) {
      if (el.hasAttribute("data-u2r")) return; el.setAttribute("data-u2r", "1");
      if (!io || RM) { el.classList.add("in"); return; }
      var r = el.getBoundingClientRect(); if (r.top < innerHeight * 0.95) { el.classList.add("in"); if (A2.play) A2.play(el); return; }
      el.classList.add("u2-reveal"); io.observe(el);
    });
  }
  A2.reveal = reveal;

  /* ---------- study header: split title, emblem, meta chips, numbered sections ---------- */
  // the sections of the current page: the study's own section bar if it has one, else its top-level headed sections
  function items(main) {
    var nav = main.querySelector(".jx-nav"), out = [];
    if (nav) { nav.querySelectorAll("button[data-jxgo]").forEach(function (b) { var id = b.getAttribute("data-jxgo"); if (document.getElementById(id)) out.push({ id: id, label: b.textContent.trim(), btn: b }); }); if (out.length) return out; }
    var hh = hash(); if (hh === "atlas" || hh === "home") return [];
    var k = 0; main.querySelectorAll(".plate > .section, .plate > section").forEach(function (sec) {
      if (sec.classList.contains("u2-map") || sec.classList.contains("l2-tools") || sec.classList.contains("l2-dash")) return;
      var h = sec.querySelector(":scope > h2, :scope > .row > h2, :scope > header > h2"); if (!h) return; var tx = h.textContent.trim(); if (!tx) return;
      if (!sec.id) sec.id = "u2s-" + (k++); out.push({ id: sec.id, label: tx.length > 46 ? tx.slice(0, 44).replace(/\s+\S*$/, "") + "…" : tx });
    });
    return out.length >= 3 ? out : [];
  }
  function head() {
    var main = document.getElementById("main"); if (!main) return;
    var vh = main.querySelector(".plate > .view-head"); if (!vh || vh.hasAttribute("data-u2h")) return;
    vh.setAttribute("data-u2h", "1");
    var h = hash(), h1 = vh.querySelector("h1"), S = window.RG && RG.studies && RG.studies[h];
    if (h1 && h1.childNodes.length === 1 && h1.firstChild.nodeType === 3) {
      var tx = h1.textContent, m = /^(.{6,}?)(:|\s[—–]\s)\s*(.{8,})$/.exec(tx);
      vh.setAttribute("data-title", m ? m[1] : tx.split(/[:?]/)[0]);
      if (m) { h1.textContent = ""; h1.appendChild(document.createTextNode(m[1])); var co = document.createElement("span"); co.className = "u2-sr"; co.textContent = m[2].trim() === ":" ? ": " : " – "; h1.appendChild(co); var sp = document.createElement("span"); sp.className = "u2-h1b"; sp.textContent = m[3]; h1.appendChild(sp); }
    }
    if (A2.emblem) { var d = document.createElement("div"); d.innerHTML = A2.emblem(h, true); if (d.firstChild) { vh.appendChild(d.firstChild); vh.classList.add("u2-hd"); } }
    var btns = items(main), chips = [];
    if (btns.length > 1) chips.push("<span>" + ic(P.layers) + esc(T("{n} sections", { n: btns.length })) + "</span>");
    var plate = main.querySelector(".plate"), len = plate ? plate.textContent.length : 0;
    if (len > 3000) chips.push("<span>" + ic(P.clock) + esc(T("{n} min read", { n: Math.max(2, Math.round(len / 1150)) })) + "</span>");
    if (S && S.blocks) { var q = 0; S.blocks.forEach(function (b) { if (b.type === "quiz" && b.items) q += b.items.length; }); if (q) chips.push("<span>" + ic(P.quiz) + esc(T("{n} quiz questions", { n: q })) + "</span>"); }
    var L = learn();
    if (L.learned[h]) chips.push('<span class="ok">' + ic(P.check, 2.6) + esc(T("Learned")) + "</span>");
    if (chips.length) { var mt = document.createElement("div"); mt.className = "u2-meta"; mt.innerHTML = chips.join(""); var e = vh.querySelector(".a2-emblem"); vh.insertBefore(mt, e || null); }
    btns.forEach(function (b, i) { var t = document.getElementById(b.id); if (t && t.classList.contains("section") && t.querySelector(":scope > h2")) t.setAttribute("data-n", pad(i + 1)); });
  }

  /* ---------- study map (radial on wide screens, metro line on phones) ---------- */
  function title(main) { var vh = main.querySelector(".view-head"), h1 = main.querySelector(".view-head h1"); return (vh && vh.getAttribute("data-title")) || (h1 ? h1.textContent.split(/[:?]/)[0] : ""); }
  function stops(btns) { return btns.map(function (b, i) { return '<button type="button" class="u2-stop" style="--k:' + i + '" data-u2go="' + b.id + '"><i>' + (i + 1) + "</i><span>" + esc(b.label) + "</span></button>"; }).join(""); }
  function studyMap() {
    var main = document.getElementById("main"); if (!main) return;
    var nav = main.querySelector(".jx-nav"); if (!nav || nav.hasAttribute("data-u2m")) return;
    nav.setAttribute("data-u2m", "1");
    var btns = items(main); if (btns.length < 3) return;
    var n = btns.length, dense = n > 12, W = 1000, H = 430, cx = W / 2, cy = H / 2, rx = dense ? 430 : 372, ry = dense ? 182 : 168;
    var pts = btns.map(function (b, i) { var a = -Math.PI / 2 + i / n * Math.PI * 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
    var lines = pts.map(function (p, i) { var mx = (cx + p[0]) / 2 + (p[1] - cy) * 0.12, my = (cy + p[1]) / 2 - (p[0] - cx) * 0.12; return '<path d="M' + cx + " " + cy + " Q" + mx.toFixed(0) + " " + my.toFixed(0) + " " + p[0].toFixed(0) + " " + p[1].toFixed(0) + '" pathLength="1" style="animation-delay:' + (i * 0.045).toFixed(2) + 's"/>'; }).join("");
    var ring = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" class="u2-ring"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx * 0.62).toFixed(0) + '" ry="' + (ry * 0.62).toFixed(0) + '" class="u2-ring b"/>';
    var nodes = btns.map(function (b, i) { var p = pts[i]; return '<button type="button" class="u2-node" data-u2go="' + b.id + '" style="left:' + (p[0] / W * 100).toFixed(2) + "%;top:" + (p[1] / H * 100).toFixed(2) + "%;animation-delay:" + (0.25 + i * 0.045).toFixed(2) + 's"><b>' + (i + 1) + "</b><span>" + esc(b.label) + "</span></button>"; }).join("");
    var box = document.createElement("section"); box.className = "u2-map";
    box.innerHTML = '<div class="label">Study map · tap a section</div><div class="u2-radial' + (dense ? " dense" : "") + '"><svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">' + ring + lines + '</svg><div class="u2-core"><span>' + esc(title(main)) + "</span><small>" + esc(T("{n} sections", { n: n })) + "</small></div>" + nodes + '</div><div class="u2-metro' + (n > 8 ? " clip" : "") + '">' + stops(btns) + '<button type="button" class="u2-more" data-u2more>' + esc(T("Show all {n} sections", { n: n })) + "</button></div>";
    nav.parentNode.insertBefore(box, nav);
  }
  function jump(id) { var t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" }); }
  A2.jump = jump;
  document.addEventListener("click", function (e) {
    var mo = e.target.closest && e.target.closest("[data-u2more]"); if (mo) { mo.parentNode.classList.remove("clip"); return; }
    var b = e.target.closest && e.target.closest("[data-u2go]"); if (!b) return;
    var sh = document.querySelector(".u2-sheet"); if (sh) sh.remove();
    jump(b.getAttribute("data-u2go"));
  });

  /* ---------- sticky table of contents ---------- */
  function toc() {
    var main = document.getElementById("main"); if (!main || main.querySelector(".u2-toc")) return;
    var btns = items(main); main.classList.toggle("u2-has-toc", btns.length >= 3); if (btns.length < 3) return;
    var a = document.createElement("aside"); a.className = "u2-toc"; a.setAttribute("aria-label", "On this page");
    a.innerHTML = '<div class="u2-toc-h"><div class="label">On this page</div><b>0%</b><svg viewBox="0 0 26 26" aria-hidden="true"><circle class="bg" cx="13" cy="13" r="10"/><circle class="fg" cx="13" cy="13" r="10"/></svg></div><ol>' +
      btns.map(function (b, i) { return '<li><button type="button" data-u2go="' + b.id + '"><i>' + (i + 1) + "</i><span>" + esc(b.label) + "</span></button></li>"; }).join("") +
      '</ol><div class="u2-toc-f"><span class="kbd" data-noi18n>J</span><span class="kbd" data-noi18n>K</span><span>Move between sections</span></div>';
    main.appendChild(a);
  }

  /* ---------- previous / next study ---------- */
  function prevNext() {
    var main = document.getElementById("main"), plate = main && main.querySelector(".plate"); if (!plate || plate.querySelector(".u2-pn")) return;
    var h = hash(); if (h === "atlas" || h === "home") return;
    var L = railLinks(), i = -1; L.forEach(function (a, k) { if (a.getAttribute("href").slice(1) === h) i = k; }); if (i < 0) return;
    var p = L[i - 1], n = L[i + 1], nv = document.createElement("nav"); nv.className = "u2-pn"; nv.setAttribute("aria-label", "More studies");
    nv.innerHTML = (p ? '<a class="p" href="' + esc(p.getAttribute("href")) + '"><small>← Previous</small><b>' + esc(p.textContent.trim()) + "</b></a>" : "") + (n ? '<a class="n" href="' + esc(n.getAttribute("href")) + '"><small>Next →</small><b>' + esc(n.textContent.trim()) + "</b></a>" : "");
    plate.appendChild(nv);
  }
  A2.step = function (d) { var h = hash(), L = railLinks(), i = -1; L.forEach(function (a, k) { if (a.getAttribute("href").slice(1) === h) i = k; }); var t = L[i + d]; if (t) go(t.getAttribute("href").slice(1)); };
  A2.section = function (d) {
    var main = document.getElementById("main"), btns = main ? items(main) : []; if (!btns.length) { scrollBy({ top: d * innerHeight * 0.8, behavior: RM ? "auto" : "smooth" }); return; }
    var cur = -1; btns.forEach(function (b, i) { var t = document.getElementById(b.id); if (t && t.getBoundingClientRect().top < 170) cur = i; });
    var k = Math.max(0, Math.min(btns.length - 1, cur + d)); if (cur + d < 0) { scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); return; }
    jump(btns[k].id);
  };

  /* ---------- progress + scrollspy ---------- */
  var bar = null, up = null, lastY = 0, lastCur = null, ticking = false;
  function spy() {
    ticking = false;
    if (!bar) { bar = document.createElement("div"); bar.className = "u2-progress"; document.body.appendChild(bar); }
    var y = scrollY, h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? Math.min(1, y / h) : 0;
    bar.style.transform = "scaleX(" + p + ")";
    document.body.classList.toggle("u2-scrolled", y > 8);
    if (up) { up.classList.toggle("show", y > 700); up.style.setProperty("--p", p.toFixed(3)); }
    if (Math.abs(y - lastY) > 14) { document.body.classList.toggle("u2-dockhide", y > lastY && y > 300 && y < h - 80); lastY = y; }
    var main = document.getElementById("main"); if (!main) return;
    var btns = items(main); if (!btns.length) { lastCur = null; return; }
    var nav = main.querySelector(".jx-nav"), cur = null, ci = -1;
    btns.forEach(function (b, i) { var t = document.getElementById(b.id); if (t && t.getBoundingClientRect().top < 170) { cur = b; ci = i; } });
    var tc = main.querySelector(".u2-toc");
    if (tc) { var hd = tc.querySelector(".u2-toc-h"); hd.style.setProperty("--p", p.toFixed(3)); hd.querySelector("b").textContent = Math.round(p * 100) + "%"; tc.querySelector("ol").style.setProperty("--tp", btns.length > 1 ? Math.max(0, ci) / (btns.length - 1) : 0); }
    var id = cur ? cur.id : "";
    if (id === lastCur) return; lastCur = id;
    if (nav) {
      nav.querySelectorAll("button.u2-on").forEach(function (b) { if (!cur || b !== cur.btn) b.classList.remove("u2-on"); });
      if (cur && cur.btn) { cur.btn.classList.add("u2-on"); if (nav.offsetParent) nav.scrollTo({ left: cur.btn.offsetLeft - nav.clientWidth / 2 + cur.btn.clientWidth / 2, behavior: RM ? "auto" : "smooth" }); }
    }
    var ord = {}; btns.forEach(function (b, i) { ord[b.id] = i; });
    document.querySelectorAll(".u2-node, .u2-stop, .u2-toc li button").forEach(function (n) { var k = ord[n.getAttribute("data-u2go")]; n.classList.toggle("u2-on", k === ci); n.classList.toggle("u2-done", k < ci); });
    main.querySelectorAll(".u2-radial path").forEach(function (pa, k) { pa.classList.toggle("u2-on", k === ci); });
    var on = tc && tc.querySelector("button.u2-on"), ol = tc && tc.querySelector("ol");
    if (on && ol && ol.scrollHeight > ol.clientHeight) ol.scrollTo({ top: on.parentNode.offsetTop - ol.clientHeight / 2, behavior: RM ? "auto" : "smooth" });
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  addEventListener("resize", function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });

  /* ---------- colour scheme popover ---------- */
  function paletteHTML() {
    var M = [["light", "Light"], ["dark", "Dark"], ["system", "System"]];
    return '<div class="label">Colour scheme</div><div class="sw">' + A2.SCHEMES.map(function (s) { return '<button type="button" data-u2s="' + s[0] + '" aria-pressed="' + ((st.scheme || "parchment") === s[0]) + '"><i style="background:' + s[2] + '"></i>' + s[1] + "</button>"; }).join("") + '</div><div class="label">Appearance</div><div class="mode">' + M.map(function (m) { return '<button type="button" data-u2m="' + m[0] + '" aria-pressed="' + ((st.mode || "system") === m[0]) + '">' + m[1] + "</button>"; }).join("") + "</div>";
  }

  /* ---------- phone dock ---------- */
  function dockSync() {
    var d = document.querySelector(".u2-dock"); if (!d) return;
    var h = hash(), main = document.getElementById("main"), has = main && items(main).length >= 3, L = learn(), last = L.last && L.last !== h ? L.last : null;
    var home = d.querySelector('[data-d="home"]'); if (h === "atlas" || h === "home") home.setAttribute("aria-current", "page"); else home.removeAttribute("aria-current");
    d.querySelector('[data-d="toc"]').hidden = !has;
    var c = d.querySelector('[data-d="cont"]'); c.hidden = !!has; c.setAttribute("href", "#" + (last || "reconcile"));
  }
  function sections() {
    var main = document.getElementById("main"), btns = main ? items(main) : []; if (!btns.length) return;
    var s = document.createElement("div"); s.className = "u2-sheet";
    s.innerHTML = '<div role="dialog" aria-modal="true" aria-label="On this page"><div class="label">On this page</div><div class="u2-metro" style="display:grid">' + stops(btns) + "</div></div>";
    s.addEventListener("click", function (e) { if (e.target === s) s.remove(); });
    document.body.appendChild(s); lastCur = null; spy();
  }

  function decorate() { buildRail(); head(); studyMap(); toc(); prevNext(); reveal(); dockSync(); lastCur = null; spy(); }
  A2.refresh = function () { var r = document.getElementById("rail"); if (r) { var L = learn(); railLinks().forEach(function (a) { var id = a.getAttribute("href").slice(1); a.classList.toggle("learned", !!L.learned[id]); a.classList.toggle("seen", !L.learned[id] && !!L.seen[id]); }); } };

  function init() {
    var top = document.querySelector(".top"), acts = document.querySelector(".top-actions"), brand = document.querySelector(".brand");
    if (!top || !acts || top.getAttribute("data-u2")) return;
    top.setAttribute("data-u2", "1");
    var aura = document.createElement("div"); aura.className = "u2-aura"; aura.setAttribute("aria-hidden", "true"); aura.innerHTML = "<i></i><i></i><i></i>"; document.body.appendChild(aura);
    var mark = document.createElement("span"); mark.className = "u2-mark"; mark.setAttribute("aria-hidden", "true");
    mark.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><g class="o" stroke-width="1" opacity=".75"><circle cx="12" cy="12" r="9.500" stroke-dasharray="2 4.200"/></g><path d="M12 5.500v13M7.500 10h9" stroke-width="2.200"/></svg>';
    brand.insertBefore(mark, brand.firstChild);
    var bn = document.querySelector(".brand-name"); if (bn) bn.innerHTML = 'Relational Gospel <span>Atlas · the gospel of union</span>';
    var burger = document.createElement("button"); burger.type = "button"; burger.className = "icon-btn u2-burger"; burger.setAttribute("aria-label", "Open menu");
    burger.innerHTML = ic(P.menu);
    top.insertBefore(burger, brand);
    var mac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    var search = document.createElement("button"); search.type = "button"; search.className = "u2-search"; search.setAttribute("aria-label", "Search or jump to a study");
    search.innerHTML = ic(P.search) + '<span>Search or jump to a study…</span><span class="kbd" data-noi18n>' + (mac ? "⌘K" : "Ctrl K") + "</span>";
    brand.parentNode.insertBefore(search, acts);
    var pal = document.createElement("button"); pal.type = "button"; pal.className = "icon-btn u2-palbtn"; pal.setAttribute("aria-label", "Colour scheme");
    pal.innerHTML = ic(P.palette);
    acts.insertBefore(pal, acts.firstChild);
    var scrim = document.createElement("div"); scrim.className = "u2-scrim"; document.body.appendChild(scrim);
    var fab = document.createElement("button"); fab.type = "button"; fab.className = "u2-fab"; fab.setAttribute("aria-label", "Explore the atlas");
    fab.innerHTML = ic(P.spark) + "<span>Explore</span>";
    document.body.appendChild(fab);
    up = document.createElement("button"); up.type = "button"; up.className = "u2-top"; up.setAttribute("aria-label", "Back to top");
    up.innerHTML = '<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="bg" cx="22" cy="22" r="19"/><circle class="fg" cx="22" cy="22" r="19"/></svg>'; document.body.appendChild(up);
    var dock = document.createElement("nav"); dock.className = "u2-dock"; dock.setAttribute("aria-label", "Quick navigation");
    dock.innerHTML = '<a href="#atlas" data-d="home">' + ic(P.home) + "<span>Atlas</span></a>" +
      '<button type="button" data-d="menu">' + ic(P.books) + "<span>Studies</span></button>" +
      '<button type="button" class="mid" data-d="explore" aria-label="Explore the atlas"><i>' + ic(P.spark) + "</i></button>" +
      '<button type="button" data-d="review">' + ic(P.cards) + "<span>Review</span></button>" +
      '<button type="button" data-d="toc" hidden>' + ic(P.list) + "<span>Sections</span></button>" +
      '<a href="#reconcile" data-d="cont">' + ic(P.play) + "<span>Continue</span></a>";
    document.body.appendChild(dock);
    var openS = function () { if (A2.palette) A2.palette(); else { var o = document.getElementById("open-search"); if (o) o.click(); } };
    A2.fullSearch = function (q) { var o = document.getElementById("open-search"); if (!o) return; o.click(); var i = document.getElementById("sq"); if (i && q) { i.value = q; i.dispatchEvent(new Event("input", { bubbles: true })); } };
    search.addEventListener("click", openS); fab.addEventListener("click", openS);
    up.addEventListener("click", function () { scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); });
    burger.addEventListener("click", function () { document.body.classList.toggle("u2-open"); });
    scrim.addEventListener("click", function () { document.body.classList.remove("u2-open"); });
    dock.addEventListener("click", function (e) {
      var b = e.target.closest("[data-d]"); if (!b) return; var k = b.getAttribute("data-d");
      if (k === "menu") document.body.classList.toggle("u2-open");
      else if (k === "explore") openS();
      else if (k === "review") { if (A2.daily) A2.daily(); }
      else if (k === "toc") sections();
      else if (k === "home" && (hash() === "atlas")) { e.preventDefault(); scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); }
    });
    var pop = null;
    function closePop() { if (pop) { pop.remove(); pop = null; } }
    function openPop() {
      if (pop) { closePop(); return; }
      pop = document.createElement("div"); pop.className = "u2-pal"; pop.innerHTML = paletteHTML(); document.body.appendChild(pop);
      pop.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var s = ev.target.closest("[data-u2s]"), m = ev.target.closest("[data-u2m]");
        if (s) st.scheme = s.getAttribute("data-u2s"); else if (m) st.mode = m.getAttribute("data-u2m"); else return;
        put(st); apply(); pop.innerHTML = paletteHTML();
      });
    }
    A2.schemes = function () { setTimeout(openPop, 0); };
    pal.addEventListener("click", function (e) { e.stopPropagation(); openPop(); });
    document.addEventListener("click", closePop);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closePop(); document.body.classList.remove("u2-open"); var sh = document.querySelector(".u2-sheet"); if (sh) sh.remove(); } });
    var rail = document.getElementById("rail"), main = document.getElementById("main");
    railEvents(rail);
    var pend = 0;
    if (window.MutationObserver) {
      new MutationObserver(buildRail).observe(rail, { childList: true });
      new MutationObserver(function () { if (!st._a) { st._a = 1; apply(); } decorate(); clearTimeout(pend); pend = setTimeout(decorate, 120); }).observe(main, { childList: true });
    }
    apply(); decorate();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); }); else setTimeout(init, 0);
})();
