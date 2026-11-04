/* Rose Window skin behaviour (main build): navigator groups + filter, breadcrumbs, "On this page"
   thread with scrollspy, previous/next pager, colour schemes, appearance, text size, reading focus,
   highlighter, reading progress, copyable references, spotlight + tilt, ripples, count-ups,
   scroll reveals, phone contents sheet, swipe-to-close sheets and menu filter. Pure enhancement:
   the app renders exactly as before and this script decorates what it renders. */
(function () {
  var root = document.documentElement, doc = document;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function get(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ic(d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"; }

  var GROUPS = [
    { c: "var(--accent)", s: "var(--accent-soft)", i: ic('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>') },
    { c: "var(--gold)", s: "var(--gold-soft)", i: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>') },
    { c: "var(--dawn)", s: "var(--dawn-soft)", i: ic('<circle cx="12" cy="8.5" r="4.5"/><circle cx="8" cy="15" r="4.5"/><circle cx="16" cy="15" r="4.5"/>') },
    { c: "var(--wine)", s: "var(--wine-soft)", i: ic('<path d="M12 3v18M5 21h14M7 7h10M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>') },
    { c: "var(--gold)", s: "var(--gold-soft)", i: ic('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>') },
    { c: "var(--accent)", s: "var(--accent-soft)", i: ic('<path d="M4 19V6a2 2 0 0 1 2-2h12v15H6a2 2 0 0 0-2 2z"/><path d="M8 8h6"/>') },
    { c: "var(--dawn)", s: "var(--dawn-soft)", i: ic('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>') },
    { c: "var(--wine)", s: "var(--wine-soft)", i: ic('<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>') }
  ];
  function G(i) { return GROUPS[i % GROUPS.length]; }
  var CHEV = ic('<path d="m9 6 6 6-6 6"/>');
  var SEARCH = ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>');

  /* ---------- toast ---------- */
  var toastT = 0;
  function toast(msg) {
    var old = $(".sk-toast"); if (old) old.remove();
    var t = doc.createElement("div"); t.className = "sk-toast"; t.setAttribute("role", "status"); t.textContent = msg; doc.body.appendChild(t);
    clearTimeout(toastT); toastT = setTimeout(function () { t.remove(); }, 2300);
  }

  /* ---------- navigator ---------- */
  var openSet = get("rga.sk.open", null), filterQ = "", NAV = [];
  function hashOf(a) { return (a.getAttribute("href") || "").slice(1); }
  function buildRail() {
    var rail = $("#rail"); if (!rail || rail.querySelector(".sk-filter")) return;
    var groups = [], cur = null;
    Array.prototype.forEach.call(rail.children, function (el) {
      if (el.classList.contains("rail-group")) { cur = { name: el.textContent, links: [] }; groups.push(cur); }
      else if (el.tagName === "A" && cur) cur.links.push(el);
    });
    if (!groups.length) return;
    NAV = [];
    groups.forEach(function (g, gi) { g.links.forEach(function (a) { NAV.push({ hash: hashOf(a), text: a.textContent, group: g.name, gi: gi, cur: a.getAttribute("aria-current") === "page" }); }); });
    var curG = -1; groups.forEach(function (g, gi) { if (g.links.some(function (a) { return a.getAttribute("aria-current") === "page"; })) curG = gi; });
    if (!openSet) openSet = [0, 1];
    var frag = doc.createDocumentFragment();
    var f = doc.createElement("div"); f.className = "sk-filter";
    f.innerHTML = '<label>' + SEARCH + '<input id="sk-rail-q" type="search" placeholder="Filter regions" autocomplete="off" aria-label="Filter regions"></label>';
    frag.appendChild(f);
    groups.forEach(function (g, gi) {
      var col = G(gi), box = doc.createElement("div");
      box.className = "sk-grp" + (openSet.indexOf(gi) > -1 || gi === curG ? " open" : ""); box.dataset.gi = gi;
      box.style.setProperty("--c", col.c); box.style.setProperty("--c-soft", col.s);
      box.innerHTML = '<button type="button" class="sk-gh" aria-expanded="' + box.classList.contains("open") + '"><span class="sk-gi">' + col.i + '</span><span>' + esc(g.name) + '</span><span class="sk-gn">' + g.links.length + "</span>" + CHEV.replace("<svg", '<svg class="sk-chev"') + '</button><div class="sk-items"><div></div></div>';
      var inner = box.querySelector(".sk-items > div");
      g.links.forEach(function (a) { inner.appendChild(a); });
      frag.appendChild(box);
    });
    var none = doc.createElement("p"); none.className = "sk-none"; none.hidden = true; none.textContent = "No region matches that. Try a shorter word."; frag.appendChild(none);
    rail.innerHTML = ""; rail.appendChild(frag);
    var q = $("#sk-rail-q"); q.value = filterQ; if (filterQ) applyFilter();
    q.addEventListener("input", function () { filterQ = q.value; applyFilter(); });
    q.addEventListener("keydown", function (e) { if (e.key === "Enter") { var a = $$(".rail a").filter(function (x) { return !x.hidden; })[0]; if (a) a.click(); } if (e.key === "Escape") { q.value = ""; filterQ = ""; applyFilter(); } });
    var ca = rail.querySelector('a[aria-current="page"]');
    if (ca && !filterQ) setTimeout(function () { var r = ca.getBoundingClientRect(), rr = rail.getBoundingClientRect(); if (r.top < rr.top + 60 || r.bottom > rr.bottom - 20) rail.scrollTop += r.top - rr.top - rr.height / 3; }, 30);
  }
  function applyFilter() {
    var q = filterQ.trim().toLowerCase(), any = false;
    $$(".sk-grp").forEach(function (g) {
      var hit = 0;
      $$(".sk-items a", g).forEach(function (a) { var m = !q || a.textContent.toLowerCase().indexOf(q) > -1; a.hidden = !m; if (m) hit++; });
      g.hidden = !!q && !hit; if (hit) any = true;
      g.classList.toggle("sk-forced", !!q && hit > 0);
      if (q && hit) g.classList.add("open"); else if (!q) g.classList.toggle("open", openSet.indexOf(+g.dataset.gi) > -1 || !!g.querySelector('a[aria-current="page"]'));
    });
    var n = $(".sk-none"); if (n) n.hidden = !q || any;
  }
  doc.addEventListener("click", function (e) {
    var h = e.target.closest && e.target.closest(".sk-gh"); if (!h) return;
    var g = h.parentNode, gi = +g.dataset.gi, on = !g.classList.contains("open");
    g.classList.toggle("open", on); h.setAttribute("aria-expanded", String(on));
    var i = openSet.indexOf(gi); if (on && i < 0) openSet.push(gi); if (!on && i > -1) openSet.splice(i, 1); put("rga.sk.open", openSet);
  });

  /* ---------- per-view decorations ---------- */
  var heads = [], tocLinks = [], tocSheetLinks = [];
  function curIndex() { var h = decodeURIComponent(location.hash.slice(1)) || "atlas"; for (var i = 0; i < NAV.length; i++) if (NAV[i].hash === h) return i; for (var j = 0; j < NAV.length; j++) if (NAV[j].cur) return j; return -1; }
  function decorate() {
    var main = $("#main"); if (!main || main.dataset.sk === "1") return;
    main.dataset.sk = "1";
    var plate = $(".plate", main); if (!plate) return;
    var ci = curIndex(), cn = NAV[ci];
    // breadcrumb inside the eyebrow
    var lab = $(".view-head > .label", plate);
    if (lab && cn) {
      var col = G(cn.gi), crumb = doc.createElement("div"); crumb.className = "label sk-crumb"; crumb.style.setProperty("--c", col.c);
      var gs = doc.createElement("span"), ls = doc.createElement("span"); gs.innerHTML = "<i></i> "; gs.appendChild(doc.createTextNode(cn.group));
      while (lab.firstChild) ls.appendChild(lab.firstChild);
      crumb.appendChild(gs); var lt = ls.textContent.trim(); if (lt && lt.toLowerCase() !== String(cn.group).trim().toLowerCase()) crumb.appendChild(ls);
      lab.replaceWith(crumb);
    }
    // section thread
    heads = $$(".plate h2", main).filter(function (h) { return h.offsetParent !== null && h.textContent.trim(); });
    tocLinks = []; tocSheetLinks = [];
    var old = $(".sk-toc", main); if (old) old.remove();
    main.classList.remove("sk-has-toc");
    var isAtlas = (decodeURIComponent(location.hash.slice(1)) || "atlas") === "atlas";
    if (heads.length >= 3 && !isAtlas) {
      var toc = doc.createElement("nav"); toc.className = "sk-toc"; toc.setAttribute("aria-label", "On this page");
      toc.innerHTML = '<div class="label">On this page</div>' + heads.map(function (h, i) { h.classList.add("sk-h2"); return '<a href="#" data-sk-to="' + i + '">' + esc(h.textContent) + "</a>"; }).join("");
      main.appendChild(toc); main.classList.add("sk-has-toc");
      tocLinks = $$("a", toc);
    }
    if (isAtlas) heads = [];
    var tb = $(".sk-tocbtn"); if (tb) tb.hidden = heads.length < 3;
    // previous / next
    var pg = $(".sk-pager", main); if (pg) pg.remove();
    if (ci > -1) {
      var prev = NAV[ci - 1], next = NAV[ci + 1], p = doc.createElement("nav"); p.className = "sk-pager"; p.setAttribute("aria-label", "Previous and next region");
      p.innerHTML = (prev ? '<a class="prev" href="#' + esc(prev.hash) + '"><small><kbd>[</kbd> Previous</small><b>' + esc(prev.text) + "</b></a>" : "") +
        (next ? '<a class="next" href="#' + esc(next.hash) + '"><small>Next <kbd>]</kbd></small><b>' + esc(next.text) + "</b></a>" : "");
      plate.insertAdjacentElement("afterend", p);
    }
    // references you can copy
    $$(".ref", plate).forEach(function (r) { if (!r.closest("[data-open], a, button")) { r.classList.add("sk-copyable"); r.title = "Copy this reference"; } });
    reveal(plate);
    countUp(plate);
    applyHL(plate);
    spy();
  }
  doc.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-sk-to]"); if (!a) return;
    e.preventDefault(); closeTocSheet();
    var h = heads[+a.dataset.skTo]; if (h) h.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });
  doc.addEventListener("click", function (e) {
    var r = e.target.closest && e.target.closest(".ref.sk-copyable"); if (!r) return;
    var txt = r.textContent.trim(), done = function () { toast("Copied " + txt); };
    try { navigator.clipboard.writeText(txt).then(done, function () { selectText(r); toast("Selected " + txt + ". Press copy to keep it."); }); } catch (err) { selectText(r); }
  });
  function selectText(el) { try { var rg = doc.createRange(); rg.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(rg); } catch (e) { /* no selection API */ } }

  /* ---------- reveal on scroll (starts visible; animates only as it enters) ---------- */
  var io = !reduced && "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("sk-rv"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -6% 0px" }) : null;
  function reveal(plate) {
    if (!io) return;
    var vh = innerHeight;
    $$(":scope > .section, :scope > section, .grid > .card, .path > a", plate).slice(0, 400).forEach(function (el) { if (el.getBoundingClientRect().top > vh) io.observe(el); });
  }

  /* ---------- scroll: progress, spy, header, back to top ---------- */
  var bar = null, lastY = 0, ticking = false;
  function spy() {
    var top = $(".top"), y = scrollY, h = doc.documentElement.scrollHeight - innerHeight;
    if (!bar && top) { bar = doc.createElement("div"); bar.className = "sk-progress"; top.appendChild(bar); }
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    if (top) { var small = innerWidth <= 980; top.classList.toggle("sk-hide", small && y > lastY + 4 && y > 240 && !$("#layer").children.length); if (y < lastY - 4 || y < 240) top.classList.remove("sk-hide"); }
    lastY = y;
    var up = $(".sk-up"); if (up) { up.classList.toggle("show", y > 900); up.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(3) : 0); }
    if (heads.length) {
      var on = -1; for (var i = 0; i < heads.length; i++) if (heads[i].getBoundingClientRect().top < 150) on = i;
      tocLinks.forEach(function (a, j) { a.classList.toggle("on", j === on); });
      tocSheetLinks.forEach(function (a, j) { a.classList.toggle("on", j === on); });
      var act = tocLinks[on]; if (act && act.parentNode.scrollHeight > act.parentNode.clientHeight) { var p = act.parentNode, r = act.offsetTop - p.clientHeight / 2; if (Math.abs(p.scrollTop - r) > 60) p.scrollTop = r; }
    }
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; spy(); }); } }, { passive: true });
  addEventListener("resize", spy);

  /* ---------- phone contents sheet ---------- */
  function openTocSheet() {
    if (!heads.length) return;
    var layer = $("#layer"); layer.innerHTML = '<div class="scrim" data-close></div><div class="sk-tocsheet" role="dialog" aria-label="On this page"><div class="label" style="margin-bottom:6px">On this page</div>' +
      heads.map(function (h, i) { return '<a href="#" data-sk-to="' + i + '"><span>' + (i + 1) + "</span>" + esc(h.textContent) + "</a>"; }).join("") + "</div>";
    tocSheetLinks = $$(".sk-tocsheet a"); spy();
  }
  function closeTocSheet() { var s = $(".sk-tocsheet"); if (s) { $("#layer").innerHTML = ""; tocSheetLinks = []; } }

  /* ---------- pointer spotlight + tilt ---------- */
  var fine = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  doc.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card"); if (!c) return;
    var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
    if (fine && !reduced) { c.style.setProperty("--ry", ((x / r.width - 0.5) * 6).toFixed(2) + "deg"); c.style.setProperty("--rx", ((0.5 - y / r.height) * 5).toFixed(2) + "deg"); }
  }, { passive: true });

  /* ---------- ripple on press ---------- */
  doc.addEventListener("pointerdown", function (e) {
    if (reduced) return;
    var b = e.target.closest && e.target.closest(".btn, .chip, .su-toggle button, .tabbar a, .tabbar button, .sk-gh, .jx-nav button"); if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = doc.createElement("span");
    s.className = "sk-ripple"; s.style.width = s.style.height = d + "px"; s.style.left = (e.clientX - r.left - d / 2) + "px"; s.style.top = (e.clientY - r.top - d / 2) + "px";
    b.appendChild(s); setTimeout(function () { s.remove(); }, 650);
  }, { passive: true });

  /* ---------- count-up for the atlas figures ---------- */
  function countUp(plate) {
    if (reduced || !("IntersectionObserver" in window)) return;
    var els = $$(".card h3", plate).filter(function (h) { return /^\d{1,4}\b/.test(h.textContent.trim()); });
    if (!els.length) return;
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; cio.unobserve(en.target);
        var h = en.target, tn = h.firstChild; if (!tn || tn.nodeType !== 3) return;
        var m = /^(\d+)/.exec(tn.nodeValue); if (!m) return;
        var end = +m[1], rest = tn.nodeValue.slice(m[1].length), t0 = performance.now();
        (function step(now) { var k = Math.min(1, (now - t0) / 1100), e2 = 1 - Math.pow(1 - k, 3); tn.nodeValue = Math.round(end * e2) + rest; if (k < 1) requestAnimationFrame(step); })(t0);
      });
    }, { threshold: 0.4 });
    els.forEach(function (h) { cio.observe(h); });
  }

  /* ---------- text size, focus mode ---------- */
  var SIZES = [0.93, 1, 1.08, 1.16], SZ_LABEL = ["Small", "Normal", "Large", "Larger"], sz = get("rga.sk.size2", 1);
  function applySize() { root.style.setProperty("--sk-z", SIZES[sz] || 1); }
  var focusOn = !!get("rga.sk.focus", false);
  function applyFocus() { doc.body.classList.toggle("sk-focus", focusOn); }

  /* ---------- colour schemes ---------- */
  var SCHEMES = [
    ["rose", "Rose window", "linear-gradient(90deg,#12132a 0 40%,#a3abff 40% 60%,#f2bd5c 60% 80%,#58d7b7 80%)"],
    ["jordan", "Jordan", "linear-gradient(90deg,#0b1d22 0 40%,#62d2e2 40% 60%,#f5c060 60% 80%,#74e08e 80%)"],
    ["gethsemane", "Gethsemane", "linear-gradient(90deg,#20261a 0 40%,#b9d670 40% 60%,#f0c25e 60% 80%,#62d4bb 80%)"],
    ["byzantine", "Byzantine", "linear-gradient(90deg,#261a3b 0 40%,#d4a8ff 40% 60%,#f4c062 60% 80%,#5ad6b8 80%)"],
    ["sunrise", "Sunrise", "linear-gradient(90deg,#fbf3f2 0 40%,#c2255c 40% 60%,#9e5f08 60% 80%,#0f7b6c 80%)"],
    ["contrast", "High contrast", "linear-gradient(90deg,#000 0 40%,#ffd400 40% 60%,#fff 60% 80%,#0033cc 80%)"]
  ];
  var scheme = get("rga.sk.scheme", "rose");
  function modeNow() { var t = root.getAttribute("data-theme"); return t === "light" || t === "dark" ? t : "system"; }
  function withTransition(fn) { if (doc.startViewTransition && !reduced) doc.startViewTransition(fn); else fn(); }
  function applyScheme() { if (scheme && scheme !== "rose") root.setAttribute("data-scheme", scheme); else root.removeAttribute("data-scheme"); }
  function setMode(m) {
    if (m === "system") { root.removeAttribute("data-theme"); try { localStorage.removeItem("rga.theme"); } catch (e) { /* storage unavailable */ } }
    else { root.setAttribute("data-theme", m); put("rga.theme", m); }
  }
  var pal = null;
  function palHTML() {
    var m = modeNow();
    return '<div><h3>Colour scheme</h3><div class="sk-sw">' + SCHEMES.map(function (s) { return '<button type="button" data-sks="' + s[0] + '" aria-pressed="' + (scheme === s[0]) + '"><i style="--sw:' + s[2] + '"></i>' + s[1] + "</button>"; }).join("") + "</div></div>" +
      '<div><h3>Appearance</h3><div class="sk-seg" role="group" aria-label="Appearance">' + [["light", "Light"], ["dark", "Dark"], ["system", "Match device"]].map(function (x) { return '<button type="button" data-skm="' + x[0] + '" aria-pressed="' + (m === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div></div>" +
      '<div><h3>Text size</h3><div class="sk-seg" role="group" aria-label="Text size">' + SZ_LABEL.map(function (l, i) { return '<button type="button" data-skz="' + i + '" aria-pressed="' + (sz === i) + '" style="font-size:' + (12 + i * 1.5) + 'px">' + l + "</button>"; }).join("") + "</div></div>" +
      '<div class="sk-row sk-focus-row"><span>Reading focus<small>Hide the side panels so the study fills the page. Shortcut: F</small></span><button type="button" class="sk-switch" data-skf aria-pressed="' + focusOn + '" aria-label="Reading focus"></button></div>';
  }
  function openPal() {
    if (pal) { closePal(); return; }
    pal = doc.createElement("div"); pal.className = "sk-pal"; pal.setAttribute("role", "dialog"); pal.setAttribute("aria-label", "Colours and reading"); pal.innerHTML = palHTML();
    doc.body.appendChild(pal);
    pal.addEventListener("click", function (e) {
      e.stopPropagation();
      var s = e.target.closest("[data-sks]"), m = e.target.closest("[data-skm]"), z = e.target.closest("[data-skz]"), f = e.target.closest("[data-skf]");
      if (s) { scheme = s.dataset.sks; put("rga.sk.scheme", scheme); withTransition(applyScheme); }
      else if (m) withTransition(function () { setMode(m.dataset.skm); });
      else if (z) { sz = +z.dataset.skz; put("rga.sk.size2", sz); applySize(); }
      else if (f) { focusOn = !focusOn; put("rga.sk.focus", focusOn); applyFocus(); }
      else return;
      pal.innerHTML = palHTML();
    });
    var b = $(".sk-palbtn"); if (b) b.setAttribute("aria-expanded", "true");
  }
  function closePal() { if (pal) { pal.remove(); pal = null; var b = $(".sk-palbtn"); if (b) b.setAttribute("aria-expanded", "false"); } }
  doc.addEventListener("click", function (e) { if (pal && !e.target.closest(".sk-pal, .sk-palbtn")) closePal(); });

  /* ---------- highlighter ---------- */
  var HL = get("rga.sk.hl", []), HLC = [["gold", "Gold"], ["dawn", "Green"], ["accent", "Accent"], ["wine", "Red"]], bar = null, barRange = null, barMark = null;
  function saveHL() { put("rga.sk.hl", HL); var b = $(".sk-hlbadge"); if (b) { b.textContent = HL.length; b.hidden = !HL.length; } }
  function scopeOf(node) { var el = node && (node.nodeType === 1 ? node : node.parentElement); return el && el.closest ? el.closest(".sheet-body, #main .plate") : null; }
  function keyOf(scope) {
    if (scope.classList.contains("sheet-body")) { var sv = scope.parentNode.querySelector(".sheet-head [data-save]"); return sv ? sv.dataset.save.replace(":", ".") : null; }
    return decodeURIComponent(location.hash.slice(1)) || "atlas";
  }
  function titleOf(scope) { var h = scope.classList.contains("sheet-body") ? scope.parentNode.querySelector("h2") : scope.querySelector("h1"); return h ? h.textContent.trim() : "This page"; }
  function textNodes(scope) {
    var w = doc.createTreeWalker(scope, NodeFilter.SHOW_TEXT, { acceptNode: function (n) { var p = n.parentElement; return p && !p.closest("script, style, button, svg, .sk-pager, .sk-toc") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } }), out = [], n;
    while ((n = w.nextNode())) out.push(n); return out;
  }
  function wrap(range, c, id, fresh) {
    var nodes = textNodes(range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode).filter(function (n) { return range.intersectsNode(n); });
    if (range.commonAncestorContainer.nodeType === 3) nodes = [range.commonAncestorContainer];
    var first = null;
    nodes.forEach(function (n) {
      var s = n === range.startContainer ? range.startOffset : 0, e = n === range.endContainer ? range.endOffset : n.nodeValue.length;
      if (e <= s || !n.nodeValue.slice(s, e).trim()) return;
      var mid = n.splitText(s); mid.splitText(e - s);
      var m = doc.createElement("mark"); m.className = "sk-hl" + (fresh ? " sk-new" : ""); m.dataset.c = c; m.dataset.hl = id;
      mid.parentNode.insertBefore(m, mid); m.appendChild(mid); if (!first) first = m;
    });
    return first;
  }
  function locate(scope, h) {
    var nodes = textNodes(scope), full = "", map = [];
    nodes.forEach(function (n) { map.push([n, full.length]); full += n.nodeValue; });
    var i = h.pre ? full.indexOf(h.pre + h.text) : -1; i = i > -1 ? i + h.pre.length : full.indexOf(h.text);
    if (i < 0) return null;
    function at(off, end) { for (var k = map.length - 1; k >= 0; k--) if (map[k][1] < off || (!end && map[k][1] === off)) return [map[k][0], off - map[k][1]]; return [map[0][0], 0]; }
    var a = at(i, false), b = at(i + h.text.length, true), r = doc.createRange();
    try { r.setStart(a[0], a[1]); r.setEnd(b[0], b[1]); } catch (e) { return null; }
    return r;
  }
  function applyHL(scope) {
    if (!scope) return; var key = keyOf(scope); if (!key) return;
    HL.forEach(function (h) { if (h.key === key && !scope.querySelector('[data-hl="' + h.id + '"]')) { var r = locate(scope, h); if (r) wrap(r, h.c, h.id, false); } });
  }
  function unwrap(id) { $$('mark[data-hl="' + id + '"]').forEach(function (m) { var p = m.parentNode; while (m.firstChild) p.insertBefore(m.firstChild, m); p.removeChild(m); p.normalize(); }); }
  function hideBar() { if (bar) { bar.remove(); bar = null; } barRange = null; barMark = null; }
  function showBar(x, y, forMark) {
    hideBar();
    bar = doc.createElement("div"); bar.className = "sk-hlbar"; bar.setAttribute("role", "toolbar"); bar.setAttribute("aria-label", "Highlight");
    var cur = forMark ? forMark.dataset.c : "";
    bar.innerHTML = HLC.map(function (c) { return '<button type="button" class="c" data-c="' + c[0] + '" aria-pressed="' + (cur === c[0]) + '" aria-label="Highlight ' + c[1] + '" title="' + c[1] + '"></button>'; }).join("") +
      (forMark ? '<button type="button" class="t" data-hlx>Remove</button>' : '<button type="button" class="t" data-hlcopy>Copy</button>');
    bar.style.left = Math.max(110, Math.min(doc.documentElement.clientWidth - 110, x)) + "px"; bar.style.top = (y + scrollY) + "px";
    doc.body.appendChild(bar); barMark = forMark || null;
  }
  function onSelect() {
    var sel = getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    var r = sel.getRangeAt(0), txt = r.toString().trim(), sc = scopeOf(r.startContainer);
    if (!sc || sc !== scopeOf(r.endContainer) || txt.length < 2 || txt.length > 800) return;
    var rect = r.getBoundingClientRect(); barRange = r.cloneRange();
    showBar(rect.left + rect.width / 2, rect.top, null); barRange = r.cloneRange();
  }
  doc.addEventListener("mouseup", function (e) { if (e.target.closest && e.target.closest(".sk-hlbar")) return; setTimeout(onSelect, 10); });
  doc.addEventListener("touchend", function (e) { if (e.target.closest && e.target.closest(".sk-hlbar")) return; setTimeout(onSelect, 350); }, { passive: true });
  doc.addEventListener("selectionchange", function () { var s = getSelection(); if (bar && !barMark && (!s || s.isCollapsed)) setTimeout(function () { var s2 = getSelection(); if (bar && !barMark && (!s2 || s2.isCollapsed)) hideBar(); }, 200); });
  doc.addEventListener("scroll", function () { if (bar && barMark) hideBar(); }, { passive: true });
  doc.addEventListener("pointerdown", function (e) { if (bar && !e.target.closest(".sk-hlbar")) { if (!e.target.closest("mark.sk-hl")) hideBar(); } });
  doc.addEventListener("click", function (e) {
    var mk = e.target.closest && e.target.closest("mark.sk-hl");
    if (mk && !(getSelection() && !getSelection().isCollapsed)) { e.preventDefault(); e.stopPropagation(); var r = mk.getBoundingClientRect(); showBar(r.left + r.width / 2, r.top, mk); return; }
    if (!bar || !e.target.closest(".sk-hlbar")) return;
    e.stopPropagation();
    var c = e.target.closest("[data-c]");
    if (barMark) {
      var id = barMark.dataset.hl, h = HL.filter(function (x) { return x.id === id; })[0];
      if (e.target.closest("[data-hlx]")) { HL = HL.filter(function (x) { return x.id !== id; }); unwrap(id); saveHL(); toast("Highlight removed"); }
      else if (c && h) { h.c = c.dataset.c; $$('mark[data-hl="' + id + '"]').forEach(function (m) { m.dataset.c = h.c; }); saveHL(); }
      hideBar(); return;
    }
    if (!barRange) { hideBar(); return; }
    if (e.target.closest("[data-hlcopy]")) { var t = barRange.toString(); try { navigator.clipboard.writeText(t).then(function () { toast("Copied"); }, function () {}); } catch (er) { /* clipboard refused */ } hideBar(); return; }
    if (c) {
      var sc = scopeOf(barRange.startContainer), key = sc && keyOf(sc); if (!key) { hideBar(); return; }
      var pre = (function () { var r2 = doc.createRange(); r2.setStart(sc, 0); r2.setEnd(barRange.startContainer, barRange.startOffset); var s = r2.toString(); return s.slice(-32); })();
      var nid = "h" + Date.now().toString(36);
      HL.unshift({ id: nid, key: key, title: titleOf(sc), text: barRange.toString(), pre: pre, c: c.dataset.c, t: Date.now() });
      wrap(barRange, c.dataset.c, nid, true); saveHL();
      try { getSelection().removeAllRanges(); } catch (er) { /* no selection */ }
      hideBar(); toast("Highlighted. Find it under Highlights.");
    }
  }, true);
  function openHL() {
    closePal();
    var groups = {}, order = [];
    HL.forEach(function (h) { if (!groups[h.key]) { groups[h.key] = { title: h.title, items: [] }; order.push(h.key); } groups[h.key].items.push(h); });
    var X = ic('<path d="M6 6l12 12M18 6 6 18"/>');
    $("#layer").innerHTML = '<div class="scrim" data-close></div><aside class="sheet sk-hlpanel" role="dialog" aria-modal="true" aria-label="Highlights" tabindex="-1"><div class="sheet-head"><div><div class="label">Your study</div><h2>Highlights</h2></div><button class="save" type="button" data-close aria-label="Close">' + X + '</button></div><div class="sk-hlist" style="margin-top:18px">' +
      (order.length ? order.map(function (k) { return "<section><h3>" + esc(groups[k].title) + "</h3>" + groups[k].items.map(function (h) { return '<div class="sk-hli" data-c="' + h.c + '"><i></i><button type="button" class="go" data-hlgo="' + h.id + '">' + esc(h.text.length > 240 ? h.text.slice(0, 240) + "…" : h.text) + '</button><button type="button" class="x" data-hldel="' + h.id + '" aria-label="Remove highlight">' + X + "</button></div>"; }).join("") + "</section>"; }).join("")
        : '<p class="sk-empty">Select any words in a study, then pick a colour to highlight them. Your highlights are kept in this browser and gathered here.</p>') + "</div></aside>";
    var p = $(".sk-hlpanel"); if (p) p.focus();
  }
  doc.addEventListener("click", function (e) {
    var d = e.target.closest && e.target.closest("[data-hldel]"), g = e.target.closest && e.target.closest("[data-hlgo]");
    if (d) { var id = d.dataset.hldel; HL = HL.filter(function (x) { return x.id !== id; }); unwrap(id); saveHL(); var row = d.closest(".sk-hli"), sec = row.parentNode; row.remove(); if (!sec.querySelector(".sk-hli")) sec.remove(); if (!HL.length) openHL(); return; }
    if (g) {
      var h = HL.filter(function (x) { return x.id === g.dataset.hlgo; })[0]; if (!h) return;
      $("#layer").innerHTML = "";
      var cur = decodeURIComponent(location.hash.slice(1)) || "atlas";
      if (cur !== h.key) location.hash = h.key;
      setTimeout(function () { var m = $('mark[data-hl="' + h.id + '"]'); if (m) { m.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); m.classList.add("sk-flash"); setTimeout(function () { m.classList.remove("sk-flash"); }, 1700); } }, 450);
    }
  });

  /* ---------- swipe a phone sheet down to close it ---------- */
  doc.addEventListener("touchstart", function (e) {
    var sh = e.target.closest && e.target.closest(".sheet"); if (!sh || innerWidth > 720 || sh.scrollTop > 0) return;
    var y0 = e.touches[0].clientY, dy = 0;
    function mv(ev) { dy = Math.max(0, ev.touches[0].clientY - y0); if (dy > 6) { sh.classList.add("sk-drag"); sh.style.transform = "translateY(" + dy + "px)"; } }
    function end() { sh.removeEventListener("touchmove", mv); sh.removeEventListener("touchend", end); sh.classList.remove("sk-drag");
      if (dy > 110) { var s = $("#layer .scrim"); if (s) s.click(); } else { sh.style.transition = "transform .25s"; sh.style.transform = ""; setTimeout(function () { sh.style.transition = ""; }, 260); } }
    sh.addEventListener("touchmove", mv, { passive: true }); sh.addEventListener("touchend", end);
  }, { passive: true });

  /* ---------- menu sheet: filter and colour dots ---------- */
  function enhanceMenu() {
    var m = $(".menu-sheet"); if (!m || m.dataset.sk) return; m.dataset.sk = "1";
    var labs = $$(":scope > .label", m);
    labs.forEach(function (l, i) { l.style.setProperty("--c", G(i).c); l.insertAdjacentHTML("afterbegin", "<i></i>"); });
    var cur = decodeURIComponent(location.hash.slice(1)) || "atlas";
    $$("a", m).forEach(function (a) { if (hashOf(a) === cur) a.setAttribute("aria-current", "page"); });
    var box = doc.createElement("div"); box.className = "sk-msearch";
    box.innerHTML = '<label class="field">' + SEARCH + '<input id="sk-menu-q" type="search" placeholder="Filter regions" autocomplete="off" aria-label="Filter regions"></label>';
    m.insertBefore(box, m.firstChild);
    var q = $("#sk-menu-q");
    q.addEventListener("input", function () {
      var v = q.value.trim().toLowerCase();
      labs.forEach(function (l) { var g = l.nextElementSibling, hit = 0; $$("a", g).forEach(function (a) { var ok = !v || a.textContent.toLowerCase().indexOf(v) > -1; a.hidden = !ok; if (ok) hit++; }); l.hidden = g.hidden = !hit; });
    });
  }

  /* ---------- header & floating controls ---------- */
  function init() {
    var top = $(".top"), acts = $(".top-actions"), brand = $(".brand");
    if (!top || !acts || top.dataset.sk) return; top.dataset.sk = "1";
    var mark = $(".brand-mark");
    if (mark) mark.outerHTML = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><g class="bm-ring"><circle cx="16" cy="16" r="14.5" fill="none" stroke="var(--line-2)" stroke-dasharray="2 3"/></g>' +
      '<g class="bm-tri"><circle cx="16" cy="11.4" r="6" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="1.4"/><circle cx="12" cy="18.6" r="6" fill="var(--wine-soft)" stroke="var(--wine)" stroke-width="1.4"/><circle cx="20" cy="18.6" r="6" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="1.4"/></g><circle cx="16" cy="16.2" r="2.2" fill="var(--gold)"/></svg>';
    var s = doc.createElement("button"); s.type = "button"; s.className = "sk-search"; s.setAttribute("aria-label", "Search the atlas");
    s.innerHTML = SEARCH + "<span>Search laws, customs, sayings, voices…</span><span class=\"kbd\">/</span>";
    top.insertBefore(s, acts);
    s.addEventListener("click", function () { var o = $("#open-search"); if (o) o.click(); });
    var hb = doc.createElement("button"); hb.type = "button"; hb.className = "icon-btn sk-hlbtn"; hb.setAttribute("aria-label", "Your highlights");
    hb.innerHTML = ic('<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>') + '<span class="sk-badge sk-hlbadge" hidden>0</span>';
    var pb = doc.createElement("button"); pb.type = "button"; pb.className = "icon-btn sk-palbtn"; pb.setAttribute("aria-label", "Colours and reading"); pb.setAttribute("aria-expanded", "false");
    pb.innerHTML = ic('<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.7-1.3-.7-2.2 0-.9.8-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.9 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>');
    var th = $("#theme-toggle"); acts.insertBefore(hb, th || acts.firstChild); acts.insertBefore(pb, th || acts.firstChild);
    hb.addEventListener("click", openHL);
    pb.addEventListener("click", function (e) { e.stopPropagation(); openPal(); });
    if (th) th.addEventListener("click", function () { if (pal) pal.innerHTML = palHTML(); });
    applySize(); applyFocus(); applyScheme(); saveHL();
    var fl = doc.createElement("div"); fl.className = "sk-float";
    fl.innerHTML = '<button type="button" class="sk-tocbtn" hidden aria-label="On this page">' + ic('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>') + "<span>Contents</span></button>" +
      '<button type="button" class="sk-up" aria-label="Back to top">' + ic('<path d="m6 15 6-6 6 6"/>') + "</button>";
    doc.body.appendChild(fl);
    $(".sk-up", fl).addEventListener("click", function () { scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
    $(".sk-tocbtn", fl).addEventListener("click", openTocSheet);

    doc.addEventListener("keydown", function (e) {
      var t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (e.key === "Escape") { closePal(); hideBar(); }
      if (typing || e.metaKey || e.ctrlKey || e.altKey || $("#layer").children.length) return;
      if (e.key === "f" || e.key === "F") { if (innerWidth > 980) { focusOn = !focusOn; put("rga.sk.focus", focusOn); applyFocus(); toast(focusOn ? "Reading focus on" : "Reading focus off"); } return; }
      if (e.key === "[" || e.key === "]") { var a = $(".sk-pager ." + (e.key === "[" ? "prev" : "next")); if (a) { e.preventDefault(); a.click(); } }
    });

    var rail = $("#rail"), main = $("#main"), layer = $("#layer");
    if (window.MutationObserver) {
      new MutationObserver(function () { buildRail(); }).observe(rail, { childList: true });
      new MutationObserver(function (recs) {
        var fresh = recs.some(function (r) { return Array.prototype.some.call(r.addedNodes, function (n) { return n.classList && n.classList.contains("plate"); }); });
        if (fresh) { main.dataset.sk = ""; setTimeout(decorate, 40); }
      }).observe(main, { childList: true });
      new MutationObserver(function () { enhanceMenu(); hideBar(); if (!$(".sk-tocsheet")) tocSheetLinks = []; var sb = $("#layer .sheet-body"); if (sb) setTimeout(function () { applyHL(sb); }, 30); }).observe(layer, { childList: true });
    }
    buildRail(); decorate(); spy();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); }); else setTimeout(init, 0);
})();
