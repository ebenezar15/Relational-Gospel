/* Rose Window skin behaviour (main build): navigator groups + filter, breadcrumbs, "On this page"
   thread with scrollspy, previous/next pager, text size, reading progress, copyable references,
   pointer spotlight, scroll reveals, phone contents sheet and menu filter. Pure enhancement:
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
    var up = $(".sk-up"); if (up) up.classList.toggle("show", y > 900);
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

  /* ---------- pointer spotlight ---------- */
  doc.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card"); if (!c) return;
    var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---------- text size ---------- */
  var SIZES = [1, 1.08, 1.16, 0.93], sz = get("rga.sk.size", 0);
  function applySize() {
    root.style.setProperty("--sk-z", SIZES[sz] || 1);
    var b = $(".sk-size"); if (b) { b.setAttribute("aria-label", "Text size " + Math.round((SIZES[sz] || 1) * 100) + "%. Change text size"); b.innerHTML = "A<small>" + (sz === 0 ? "" : sz === 3 ? "−" : "+".repeat(sz)) + "</small>"; }
  }

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
      '<circle cx="16" cy="11.4" r="6" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="1.4"/><circle cx="12" cy="18.6" r="6" fill="var(--wine-soft)" stroke="var(--wine)" stroke-width="1.4"/><circle cx="20" cy="18.6" r="6" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="1.4"/><circle cx="16" cy="16.2" r="2.2" fill="var(--gold)"/></svg>';
    var s = doc.createElement("button"); s.type = "button"; s.className = "sk-search"; s.setAttribute("aria-label", "Search the atlas");
    s.innerHTML = SEARCH + "<span>Search laws, customs, sayings, voices…</span><span class=\"kbd\">/</span>";
    top.insertBefore(s, acts);
    s.addEventListener("click", function () { var o = $("#open-search"); if (o) o.click(); });
    var size = doc.createElement("button"); size.type = "button"; size.className = "icon-btn sk-size";
    var th = $("#theme-toggle"); acts.insertBefore(size, th || acts.firstChild);
    size.addEventListener("click", function () { sz = (sz + 1) % SIZES.length; put("rga.sk.size", sz); applySize(); toast("Text size " + Math.round(SIZES[sz] * 100) + "%"); });
    applySize();
    var fl = doc.createElement("div"); fl.className = "sk-float";
    fl.innerHTML = '<button type="button" class="sk-tocbtn" hidden aria-label="On this page">' + ic('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>') + "<span>Contents</span></button>" +
      '<button type="button" class="sk-up" aria-label="Back to top">' + ic('<path d="m6 15 6-6 6 6"/>') + "</button>";
    doc.body.appendChild(fl);
    $(".sk-up", fl).addEventListener("click", function () { scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
    $(".sk-tocbtn", fl).addEventListener("click", openTocSheet);

    doc.addEventListener("keydown", function (e) {
      var t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing || e.metaKey || e.ctrlKey || e.altKey || $("#layer").children.length) return;
      if (e.key === "[" || e.key === "]") { var a = $(".sk-pager ." + (e.key === "[" ? "prev" : "next")); if (a) { e.preventDefault(); a.click(); } }
    });

    var rail = $("#rail"), main = $("#main"), layer = $("#layer");
    if (window.MutationObserver) {
      new MutationObserver(function () { buildRail(); }).observe(rail, { childList: true });
      new MutationObserver(function (recs) {
        var fresh = recs.some(function (r) { return Array.prototype.some.call(r.addedNodes, function (n) { return n.classList && n.classList.contains("plate"); }); });
        if (fresh) { main.dataset.sk = ""; setTimeout(decorate, 40); }
      }).observe(main, { childList: true });
      new MutationObserver(function () { enhanceMenu(); if (!$(".sk-tocsheet")) tocSheetLinks = []; }).observe(layer, { childList: true });
    }
    buildRail(); decorate(); spy();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); }); else setTimeout(init, 0);
})();
