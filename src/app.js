(function () {
  "use strict";
  var RG = window.RG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var A = function (k) { return RG[k] || []; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var strip = function (s) { return String(s || "").replace(/<[^>]+>/g, ""); };
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- storage (best effort) ---------- */
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ } }
  var saved = load("rga.saved", []);
  function isSaved(k) { return saved.indexOf(k) > -1; }
  function toggleSaved(k) { var i = saved.indexOf(k); if (i > -1) saved.splice(i, 1); else saved.unshift(k); store("rga.saved", saved); }

  /* ---------- icons ---------- */
  var ICON = {
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    atlas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>',
    lens: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/></svg>',
    law: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l4 4v14H7z"/><path d="M10 11h5M10 15h5"/></svg>',
    culture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19c2-6 5-9 9-11 2-1 4 0 5 1-1 5-6 10-14 10z"/><path d="M5 19 13 11"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  /* ---------- item types ---------- */
  var TYPES = {
    theme: { key: "themes", view: "theme", title: function (x) { return x.title; }, sub: function (x) { return x.tagline; }, label: "Theme" },
    law: { key: "laws", view: "law", title: function (x) { return x.name; }, sub: function (x) { return x.ref; }, label: "Law" },
    culture: { key: "culture", view: "culture", title: function (x) { return x.title; }, sub: function (x) { return (x.refs || []).join(" · "); }, label: "Culture" },
    saying: { key: "sayings", view: "sayings", title: function (x) { return x.saying; }, sub: function (x) { return x.ref; }, label: "Jesus said" },
    violence: { key: "violence", view: "violence", title: function (x) { return x.title; }, sub: function (x) { return x.ref; }, label: "Hard passage" },
    framework: { key: "frameworks", view: "violence", title: function (x) { return x.name; }, sub: function (x) { return x.proponents; }, label: "Framework" },
    teaching: { key: "teachings", view: "teachings", title: function (x) { return x.title; }, sub: function (x) { return (x.refs || []).join(" · "); }, label: "Teaching" },
    strawman: { key: "strawmen", view: "debate", title: function (x) { return strip(x.claim); }, sub: function () { return "Strawman"; }, label: "Strawman" },
    argument: { key: "arguments", view: "debate", title: function (x) { return x.question; }, sub: function () { return "Debate"; }, label: "Debate" },
    contrast: { key: "contrasts", view: "lens", title: function (x) { return x.topic; }, sub: function (x) { return x.ot.ref + " ↔ " + x.nt.ref; }, label: "Old & New" },
    moment: { key: "misunderstandings", view: "journey", title: function (x) { return x.title; }, sub: function (x) { return x.era + " · " + x.ref; }, label: "Misunderstood God" },
    principle: { key: "hermeneutics", view: "read", title: function (x) { return x.principle; }, sub: function () { return "Reading principle"; }, label: "How to read" }
  };
  function find(type, id) { var t = TYPES[type]; return t ? A(t.key).filter(function (x) { return x.id === id; })[0] : null; }

  /* ---------- navigation model ---------- */
  var VIEWS = [
    { group: "Begin", items: [["atlas", "The Atlas"], ["read", "How to read the Bible"]] },
    { group: "The God Jesus reveals", items: [["theme.perfect-theology", "Jesus, perfect theology"], ["lens", "Old & New Testament tensions"], ["journey", "How people misread God"], ["violence", "The violent passages"]] },
    { group: "Law & culture", items: [["law", "Why God gave the Law"], ["culture", "Culture decoder"], ["sayings", "The words of Jesus"]] },
    { group: "The great themes", items: [["themes", "All themes"]] },
    { group: "The conversation", items: [["teachings", "What is taught"], ["debate", "Debates & strawmen"], ["saved", "Saved"]] }
  ];
  function railHTML() {
    var cur = route.view === "theme" ? "theme." + route.id : route.view;
    return VIEWS.map(function (g) {
      var items = g.items.slice();
      if (g.group === "The great themes") A("themes").forEach(function (t) { if (t.id !== "perfect-theology") items.push(["theme." + t.id, t.title]); });
      return '<div class="rail-group label">' + g.group + "</div>" + items.map(function (it) {
        return '<a href="#' + it[0] + '"' + (cur === it[0] ? ' aria-current="page"' : "") + '><span class="dot"></span>' + esc(it[1]) + "</a>";
      }).join("");
    }).join("");
  }
  function tabbarHTML() {
    var t = [["atlas", "Atlas", ICON.atlas], ["lens", "Lens", ICON.lens], ["law", "Law", ICON.law], ["culture", "Culture", ICON.culture]];
    return t.map(function (x) { return '<a href="#' + x[0] + '"' + (route.view === x[0] ? ' aria-current="page"' : "") + ">" + x[2] + x[1] + "</a>"; }).join("") +
      '<button type="button" id="open-menu">' + ICON.menu + "More</button>";
  }

  var route = { view: "atlas", id: null, item: null };
  function parseHash() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!h) return { view: "atlas" };
    var dot = h.indexOf(".");
    if (dot === -1) return { view: h };
    var type = h.slice(0, dot), id = h.slice(dot + 1);
    if (type === "theme") return { view: "theme", id: id };
    if (TYPES[type]) return { view: TYPES[type].view, item: { type: type, id: id } };
    return { view: "atlas" };
  }
  function go(hash) { if (location.hash.slice(1) === hash) render(); else location.hash = hash; }

  /* ---------- shared bits ---------- */
  function saveBtn(type, id) {
    var k = type + ":" + id;
    return '<button type="button" class="save" data-save="' + k + '" aria-pressed="' + isSaved(k) + '" aria-label="Save">' + ICON.star + "</button>";
  }
  function head(eyebrow, title, lede) {
    return '<header class="view-head"><div class="label">' + eyebrow + "</div><h1>" + title + "</h1>" + (lede ? '<p class="lede">' + lede + "</p>" : "") + "</header>";
  }
  function field(id, ph) { return '<label class="field">' + ICON.search + '<input id="' + id + '" type="search" placeholder="' + ph + '" autocomplete="off"></label>'; }
  function card(type, x, extra) {
    var t = TYPES[type];
    return '<div class="card" role="button" tabindex="0" data-open="' + type + "." + x.id + '">' + saveBtn(type, x.id) +
      (extra && extra.top ? extra.top : "") +
      '<h3 style="padding-right:34px">' + esc(strip(t.title(x))) + "</h3>" +
      (t.sub(x) ? '<div class="ref">' + esc(t.sub(x)) + "</div>" : "") +
      (extra && extra.text ? "<p>" + extra.text + "</p>" : "") + "</div>";
  }
  function blk(label, html, cls) { return html ? '<div class="blk ' + (cls || "") + '"><div class="label">' + label + "</div><p>" + html + "</p></div>" : ""; }
  function panel(cls, label, html) { return html ? '<div class="panel ' + cls + '"><div class="label">' + label + "</div><p>" + html + "</p></div>" : ""; }
  function clip(s, n) { s = strip(s); return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; }

  /* ---------- glyphs for themes ---------- */
  function glyph(id) {
    var g = "#e0ae55";
    var c = 'fill="none" stroke="var(--gold)" stroke-width="1.2"';
    var map = {
      "triune-dance": '<g class="spin"><circle cx="100" cy="62" r="26" ' + c + '/><circle cx="66" cy="122" r="26" ' + c + '/><circle cx="134" cy="122" r="26" ' + c + '/></g><circle cx="100" cy="102" r="7" fill="var(--dawn)"><animate attributeName="r" values="5;9;5" dur="4s" repeatCount="indefinite"/></circle>',
      "separation-union": '<circle cx="70" cy="100" r="34" ' + c + '><animate attributeName="cx" values="52;86;52" dur="7s" repeatCount="indefinite"/></circle><circle cx="130" cy="100" r="34" fill="none" stroke="var(--dawn)" stroke-width="1.2"><animate attributeName="cx" values="148;114;148" dur="7s" repeatCount="indefinite"/></circle>',
      "undoing-adam": '<path d="M30 150 Q100 40 170 150" ' + c + ' stroke-dasharray="4 5"/><circle r="6" fill="var(--wine)"><animateMotion dur="6s" repeatCount="indefinite" path="M30 150 Q100 40 170 150"/></circle><circle cx="170" cy="150" r="5" fill="var(--dawn)"/>',
      "across-all-worlds": [30, 55, 80].map(function (r, i) { return '<circle cx="100" cy="100" r="' + r + '" ' + c + ' opacity=".8"><animate attributeName="r" values="' + (r - 20) + ";" + (r + 10) + '" dur="5s" begin="' + i + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="5s" begin="' + i + 's" repeatCount="indefinite"/></circle>'; }).join("") + '<circle cx="100" cy="100" r="8" fill="' + g + '"/>',
      "resurrection": '<path d="M20 140 H180" ' + c + '/><circle cx="100" cy="140" r="34" fill="var(--gold-soft)" stroke="var(--gold)"><animate attributeName="cy" values="150;95;150" dur="8s" repeatCount="indefinite"/></circle>',
      "incarnation": '<circle cx="100" cy="128" r="44" fill="none" stroke="var(--dawn)" stroke-width="1.2"/><circle cx="100" r="7" fill="' + g + '"><animate attributeName="cy" values="20;128;20" dur="7s" repeatCount="indefinite"/></circle>',
      "apokatastasis": '<circle cx="100" cy="100" r="70" ' + c + ' stroke-dasharray="6 8"><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="40s" repeatCount="indefinite"/></circle>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<circle cx="' + (100 + 70 * Math.cos(a)).toFixed(1) + '" cy="' + (100 + 70 * Math.sin(a)).toFixed(1) + '" r="4" fill="var(--dawn)"><animate attributeName="r" values="2;5;2" dur="3s" begin="' + (i * 0.35) + 's" repeatCount="indefinite"/></circle>'; }).join("") + '<circle cx="100" cy="100" r="10" fill="' + g + '"/>'
    };
    var inner = map[id] || ('<circle cx="100" cy="100" r="64" ' + c + ' opacity=".5"/><circle cx="100" cy="100" r="40" ' + c + '/><circle cx="100" cy="100" r="9" fill="' + g + '"><animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite"/></circle><circle r="4" fill="var(--dawn)"><animateMotion dur="9s" repeatCount="indefinite" path="M100 36 A64 64 0 1 1 99.9 36"/></circle>');
    return '<div class="glyph" aria-hidden="true"><svg viewBox="0 0 200 200">' + inner + "</svg></div>";
  }

  /* ---------- separation vs union scene ---------- */
  function suScene() {
    return '<div class="su-switch" id="su"><div class="row" style="justify-content:space-between"><div class="label">Two gospels, one picture</div>' +
      '<div class="su-toggle" role="group" aria-label="Choose a gospel"><button type="button" class="s" data-su="sep" aria-pressed="true">Separation</button><button type="button" class="u" data-su="uni" aria-pressed="false">Union</button></div></div>' +
      '<div class="su-scene"><svg viewBox="0 0 640 280" aria-hidden="true">' +
      '<defs><radialGradient id="glow"><stop offset="0" stop-color="#e0ae55" stop-opacity=".9"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="gap"><path d="M300 280 L310 140 L300 30 M340 280 L330 140 L340 30" stroke="var(--wine)" fill="none" stroke-width="1.5" stroke-dasharray="5 6"/><text x="320" y="16" text-anchor="middle" fill="var(--wine)" font-family="IBM Plex Mono, monospace" font-size="12" letter-spacing="2">THE GULF</text></g>' +
      '<g class="fig f-god" style="transform:translateX(-140px)"><circle cx="320" cy="130" r="70" fill="url(#glow)"/><circle cx="320" cy="130" r="26" fill="#e0ae55"/><text x="320" y="225" text-anchor="middle" fill="var(--ink)" font-family="Marcellus, serif" font-size="18">Father, Son &amp; Spirit</text></g>' +
      '<g class="fig f-us" style="transform:translateX(150px)"><circle cx="320" cy="140" r="18" fill="none" stroke="var(--dawn)" stroke-width="2"/><text x="320" y="186" text-anchor="middle" fill="var(--ink)" font-family="Marcellus, serif" font-size="18">Humanity</text></g>' +
      "</svg></div><p class=\"su-text\" id=\"su-text\"></p></div>";
  }
  var SU = {
    sep: "In the separation story, sin opened a gulf. God is far off, holy and offended; we must cross back by belief, effort or ritual, and many never will.",
    uni: "In the union story, the Son crossed the gulf himself. In the Incarnation God joined humanity to himself; the cross and resurrection carried us into the life of the Trinity. Faith wakes us to where we already stand."
  };
  function bindSU() {
    var root = $("#su"); if (!root) return;
    function set(m) {
      $$("[data-su]", root).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.su === m)); });
      $(".f-god", root).style.transform = m === "sep" ? "translateX(-140px)" : "translateX(0)";
      $(".f-us", root).style.transform = m === "sep" ? "translateX(150px)" : "translateX(0) translateY(-10px)";
      $(".gap", root).style.opacity = m === "sep" ? "1" : "0";
      $("#su-text").textContent = SU[m];
    }
    $$("[data-su]", root).forEach(function (b) { b.addEventListener("click", function () { set(b.dataset.su); }); });
    set("sep");
  }

  /* ================= VIEWS ================= */
  var V = {};

  V.atlas = function () {
    var steps = [
      ["read", "How to read", "Jesus is the Word; the Bible is the witness to him."],
      ["theme.perfect-theology", "Jesus, perfect theology", "If you have seen him, you have seen the Father."],
      ["journey", "How people misread God", "From Eden's hiding to Peter's sword."],
      ["violence", "The violent passages", "Reading the war stories through the cross."],
      ["law", "Why God gave the Law", "A guardian for a child, until the Seed came."],
      ["culture", "Culture decoder", "Sandals, hair, veils, and what they meant."],
      ["sayings", "The words of Jesus", "The cultural world behind his sayings."],
      ["theme.separation-union", "Separation or union", "The fork where two gospels part ways."],
      ["themes", "The great themes", "Incarnation to apokatastasis."],
      ["debate", "Debates & strawmen", "The strongest objections, answered."]
    ];
    return '<section class="atlas"><div class="atlas-stage" id="stage"><canvas id="sky" aria-label="Star map of the atlas. Choose a star to open a region."></canvas><div class="atlas-tip" id="tip" hidden></div></div>' +
      '<div class="atlas-copy"><div class="label">An atlas of the relational gospel</div>' +
      "<h1>Every road on this map leads to <em>Jesus</em></h1>" +
      '<p class="lede">Explore how the Bible\'s hardest passages, its laws, its customs and its contradictions read when Jesus is the clearest picture of who God is.</p>' +
      '<div class="verse-band">"No one has seen God at any time. The one and only Son, who is in the bosom of the Father, he has declared him."<span class="ref">John 1:18 · WEB</span></div>' +
      '<div class="legend label"><span><i style="background:var(--gold)"></i>Themes</span><span><i style="background:var(--dawn)"></i>Regions</span><span><i style="background:#fff6dc;box-shadow:0 0 8px var(--gold)"></i>Christ at the centre</span></div>' +
      '<div class="row"><a class="btn" href="#read">Begin the journey</a><button class="btn ghost" type="button" data-search>Search everything</button></div></div></section>' +
      '<section class="section"><h2>A suggested path</h2><div class="path">' + steps.map(function (s) { return '<a href="#' + s[0] + '"><b>' + s[1] + "</b><small>" + s[2] + "</small></a>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>What is in the atlas</h2><div class="grid">' + [
        ["themes", A("themes").length + " great themes", "Union, Incarnation, the Triune dance, Apokatastasis, Life and immortality"],
        ["law", A("laws").length + " laws explained", "What each law meant, why it was given, and where it points"],
        ["culture", A("culture").length + " customs decoded", "Cultural forms the church turned into doctrine"],
        ["sayings", A("sayings").length + " sayings of Jesus", "The setting that makes each one land"],
        ["violence", A("violence").length + " hard passages", A("frameworks").length + " ways Christians reconcile them"],
        ["debate", A("strawmen").length + " strawmen, " + A("arguments").length + " debates", "Arguments and counter-arguments, side by side"]
      ].map(function (x) { return '<a class="card" href="#' + x[0] + '"><h3>' + x[1] + "</h3><p>" + x[2] + "</p></a>"; }).join("") + "</div></section>";
  };

  V.themes = function () {
    return head("The great themes", "The shape of the gospel", "Each theme is one facet of a single story: the Father, Son and Spirit drawing humanity into their shared life.") +
      suScene() + '<div class="grid">' + A("themes").map(function (t) {
        return '<a class="card" href="#theme.' + t.id + '"><h3>' + esc(t.title) + "</h3><p>" + t.tagline + "</p></a>";
      }).join("") + "</div>";
  };

  V.theme = function () {
    var t = find("theme", route.id);
    if (!t) return head("Not found", "That theme is not on the map yet", '<a href="#themes">See all themes</a>');
    var list = A("themes"), i = list.indexOf(t), prev = list[i - 1], next = list[i + 1];
    return '<section class="theme-hero"><div><div class="label">Theme ' + (i + 1) + " of " + list.length + '</div><div class="row" style="margin-top:8px"><h1>' + esc(t.title) + "</h1>" + saveBtn("theme", t.id) + '</div><p class="tagline">' + t.tagline + "</p></div>" + glyph(t.id) + "</section>" +
      (t.id === "separation-union" ? suScene() : "") +
      '<div class="verses">' + (t.keyVerses || []).map(function (v) { return '<div class="verse"><span class="ref">' + esc(v.ref) + "</span>" + v.text + "</div>"; }).join("") + "</div>" +
      '<div class="prose">' + (t.body || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<div class="split">' + panel("sep", "The gospel of separation says", t.separation) + panel("uni", "The gospel of union says", t.union) + "</div>" +
      ((t.voices || []).length ? '<section class="section"><h2>Voices through history</h2><div class="voices">' + t.voices.map(function (v) { return '<div class="voice"><b>' + esc(v.name) + "</b><span>" + v.note + "</span></div>"; }).join("") + "</div></section>" : "") +
      ((t.objections || []).length ? '<section class="section"><h2>Objections, honestly answered</h2><div class="qa">' + t.objections.map(function (o) { return "<details><summary>" + o.q + '</summary><div class="ans"><p>' + o.a + "</p></div></details>"; }).join("") + "</div></section>" : "") +
      ((t.related || []).length ? '<section class="section"><div class="label">Connected stars</div><div class="chips">' + t.related.map(function (r) { var x = find("theme", r); return x ? '<a class="chip" href="#theme.' + r + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>" : "") +
      '<div class="row" style="justify-content:space-between">' + (prev ? '<a class="btn ghost" href="#theme.' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="#theme.' + next.id + '">' + esc(next.title) + " →</a>" : "") + "</div>";
  };

  V.lens = function () {
    var pt = find("theme", "perfect-theology");
    return head("The lens", "Old & New Testament tensions", "Some passages pull against each other. Hebrews 1 says God spoke in many portions and many ways, but has now spoken in a Son. Turn the lens on each pair to see the earlier word in the light of the later one.") +
      (pt ? '<div class="panel gold"><div class="label">Why Jesus is the lens</div><p>' + pt.tagline + ' <a href="#theme.perfect-theology">Read the theme →</a></p></div>' : "") +
      '<div class="row"><button class="chip" type="button" id="lens-all" aria-pressed="false">Turn every lens on</button></div>' +
      '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,460px),1fr))">' + A("contrasts").map(function (c) {
        return '<article class="contrast" id="c-' + c.id + '"><div class="row" style="justify-content:space-between"><h3>' + esc(c.topic) + "</h3>" + saveBtn("contrast", c.id) + "</div>" +
          '<div class="split"><div class="panel sep lens-ot"><div class="label">Then · ' + esc(c.ot.ref) + "</div><p><em>" + c.ot.text + '</em></p></div><div class="panel uni lens-nt"><div class="label">In Christ · ' + esc(c.nt.ref) + "</div><p><em>" + c.nt.text + "</em></p></div></div>" +
          '<button type="button" class="chip" data-lens="' + c.id + '" aria-pressed="false">View through Jesus</button>' +
          '<p class="note">' + c.note + "</p></article>";
      }).join("") + "</div>";
  };
  function setLens(el, on) {
    var ot = $(".lens-ot", el), nt = $(".lens-nt", el), b = $("[data-lens]", el);
    ot.style.opacity = on ? ".45" : "1"; ot.style.filter = on ? "saturate(.4)" : "";
    nt.style.boxShadow = on ? "0 0 0 1px var(--dawn), 0 0 30px var(--dawn-soft)" : "";
    b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Lens on" : "View through Jesus";
  }

  V.journey = function () {
    var era = null;
    return head("A history of misreading", "How people misunderstood God", "Again and again, people in Scripture projected their fear onto God. Again and again, God answered with something better. Follow the thread from Eden to the early church.") +
      '<div class="timeline">' + A("misunderstandings").map(function (m) {
        var e = m.era !== era ? '<div class="t-era">' + esc(m.era) + "</div>" : ""; era = m.era;
        return e + '<article class="t-item"><div class="row" style="justify-content:space-between"><div><h3>' + esc(m.title) + '</h3><div class="ref">' + esc(m.ref) + "</div></div>" + saveBtn("moment", m.id) + "</div>" +
          '<div class="t-cols"><div class="a"><span class="label">What they thought</span>' + m.thought + '</div><div class="b"><span class="label">What God revealed</span>' + m.revealed + '</div><div class="c"><span class="label">What Jesus shows</span>' + m.jesus + "</div></div></article>";
      }).join("") + "</div>";
  };

  var violenceLens = "all";
  V.violence = function () {
    return head("The hard passages", "Reading the violent texts", "Floods, conquests, bears and stonings. Christians have reconciled these texts in several ways. Choose a framework to compare how each one reads the passages.") +
      '<section class="section"><div class="label">Frameworks</div><div class="grid">' + A("frameworks").map(function (f) { return card("framework", f, { text: clip(f.explanation, 150) }); }).join("") + "</div></section>" +
      '<section class="section"><h2>The passages</h2><div class="chips" id="vlens"><button class="chip" type="button" data-vl="all" aria-pressed="' + (violenceLens === "all") + '">Every framework</button>' +
      A("frameworks").map(function (f) { return '<button class="chip" type="button" data-vl="' + f.id + '" aria-pressed="' + (violenceLens === f.id) + '">' + esc(f.name) + "</button>"; }).join("") + "</div>" +
      '<div class="grid" id="vgrid">' + vGrid() + "</div></section>";
  };
  function vGrid() {
    return A("violence").map(function (v) {
      var r = violenceLens === "all" ? null : (v.readings || []).filter(function (x) { return x.lens === violenceLens; })[0];
      var txt = r ? "<strong>" + esc(fwName(r.lens)) + ":</strong> " + clip(r.text, 170) : (violenceLens === "all" ? clip(v.problem, 150) : "<em>This framework is not applied to this passage. Open it to see the others.</em>");
      return card("violence", v, { text: txt });
    }).join("");
  }
  function fwName(id) { var f = find("framework", id); return f ? f.name : id; }

  var lawCat = "all";
  V.law = function () {
    var lp = find("theme", "law-purpose");
    return head("Shadow and substance", "Why God gave the Law", "\"The law has become our tutor to bring us to Christ.\" Galatians 3:24. Each law below shows what it meant then, why it was given, and how it points to Jesus.") +
      (lp ? '<div class="verses">' + (lp.keyVerses || []).slice(0, 3).map(function (v) { return '<div class="verse"><span class="ref">' + esc(v.ref) + "</span>" + v.text + "</div>"; }).join("") + '</div><div class="prose">' + (lp.body || []).slice(0, 3).map(function (p) { return "<p>" + p + "</p>"; }).join("") + '<p><a href="#theme.law-purpose">Read the full theme on the purpose of the Law →</a></p></div>' : "") +
      '<section class="section"><h2>The Law, one command at a time</h2><div class="toolbar">' + field("law-q", "Search laws, e.g. shellfish, Jubilee, tassels") + '<span class="count" id="law-count"></span></div>' +
      '<div class="chips" id="lawcats"><button class="chip" type="button" data-cat="all" aria-pressed="' + (lawCat === "all") + '">All</button>' +
      A("lawCategories").map(function (c) { return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="' + (lawCat === c.id) + '" title="' + esc(strip(c.blurb)) + '">' + esc(c.name) + "</button>"; }).join("") + "</div>" +
      '<p class="count" id="cat-blurb"></p><div class="grid" id="lawgrid"></div></section>';
  };
  function lawGrid() {
    var q = ($("#law-q") || {}).value || ""; q = q.toLowerCase().trim();
    var list = A("laws").filter(function (l) {
      return (lawCat === "all" || l.category === lawCat) && (!q || [l.name, l.ref, l.text, l.meaning, l.why].join(" ").toLowerCase().indexOf(q) > -1);
    });
    $("#lawgrid").innerHTML = list.map(function (l) { return card("law", l, { text: clip(l.why, 130) }); }).join("") || '<p class="count">No laws match that search. Try a broader word.</p>';
    $("#law-count").textContent = list.length + " of " + A("laws").length;
    var c = A("lawCategories").filter(function (x) { return x.id === lawCat; })[0];
    $("#cat-blurb").innerHTML = c ? c.blurb : "";
  }

  var culVerdict = "all";
  V.culture = function () {
    var f = A("culture")[0];
    return head("Culture decoder", "What it meant then", "Much of what the church turned into rules was a cultural form carrying a spiritual meaning. Decode the custom, find the thread through Scripture, and keep the principle.") +
      (f ? '<section class="contrast" id="feature"><div class="row" style="justify-content:space-between"><div><div class="label">Featured thread</div><h2 style="font-size:32px;margin-top:6px">' + esc(f.title) + '</h2></div><button class="btn ghost" type="button" data-open="culture.' + f.id + '">Open the full entry</button></div>' +
        '<p class="note">' + f.thread + "</p>" + trail(f) + "</section>" : "") +
      '<section class="section"><div class="toolbar">' + field("cul-q", "Search customs, e.g. hair, veil, tithe") + '<span class="count" id="cul-count"></span></div>' +
      '<div class="chips" id="culv">' + [["all", "All"], ["cultural", "Cultural form"], ["mixed", "Mixed"], ["principle", "Lasting principle"]].map(function (x) { return '<button class="chip" type="button" data-v="' + x[0] + '" aria-pressed="' + (culVerdict === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div class="grid" id="culgrid"></div></section>';
  };
  function verdict(v) { var n = { cultural: "Cultural form", mixed: "Mixed", principle: "Lasting principle" }[v] || v; return '<span class="pill ' + v + '"><i></i>' + n + "</span>"; }
  function trail(f) {
    var links = f.links || [];
    return '<div class="trail" style="display:grid;gap:12px"><div class="label">Follow the thread · tap a step</div><div style="overflow-x:auto"><svg viewBox="0 0 ' + Math.max(600, links.length * 150) + ' 70" style="min-width:' + links.length * 120 + 'px;width:100%;height:70px" aria-hidden="true">' +
      '<path d="M40 35 H' + (links.length * 150 - 110) + '" stroke="var(--gold)" stroke-dasharray="3 6" fill="none"/>' +
      links.map(function (l, i) { return '<g data-step="' + i + '" style="cursor:pointer"><circle cx="' + (40 + i * 150) + '" cy="35" r="11" fill="var(--bg)" stroke="var(--gold)" stroke-width="2"/><circle class="sd" cx="' + (40 + i * 150) + '" cy="35" r="5" fill="var(--gold)" opacity="' + (i === 0 ? 1 : 0.25) + '"/><text x="' + (40 + i * 150) + '" y="64" text-anchor="middle" fill="var(--muted)" font-family="IBM Plex Mono, monospace" font-size="11">' + esc(l.ref) + "</text></g>"; }).join("") +
      '</svg></div><div class="links"><div id="trail-note">' + (links[0] ? '<span class="ref">' + esc(links[0].ref) + "</span> " + links[0].note : "") + "</div></div>" +
      '<div class="row"><button class="chip" type="button" id="trail-play">Walk the whole thread</button></div></div>';
  }
  function bindTrail() {
    var f = A("culture")[0]; if (!f || !$("#feature")) return;
    var links = f.links || [], timer = null;
    function show(i) {
      $$("#feature .sd").forEach(function (d, j) { d.setAttribute("opacity", j <= i ? 1 : 0.25); });
      $("#trail-note").innerHTML = '<span class="ref">' + esc(links[i].ref) + "</span> " + links[i].note;
    }
    $$("#feature [data-step]").forEach(function (g) { g.addEventListener("click", function () { clearInterval(timer); show(+g.dataset.step); }); });
    $("#trail-play").addEventListener("click", function () {
      var i = 0; clearInterval(timer); show(0);
      timer = setInterval(function () { i++; if (i >= links.length) { clearInterval(timer); return; } show(i); }, 2600);
    });
  }
  function culGrid() {
    var q = (($("#cul-q") || {}).value || "").toLowerCase().trim();
    var list = A("culture").filter(function (c) {
      return (culVerdict === "all" || c.verdict === culVerdict) && (!q || [c.title, c.practice, c.culture, (c.refs || []).join(" ")].join(" ").toLowerCase().indexOf(q) > -1);
    });
    $("#culgrid").innerHTML = list.map(function (c) { return card("culture", c, { top: verdict(c.verdict), text: clip(c.principle, 130) }); }).join("") || '<p class="count">Nothing matches. Try another word.</p>';
    $("#cul-count").textContent = list.length + " of " + A("culture").length;
  }

  V.sayings = function () {
    return head("In their world", "The words of Jesus", "Jesus spoke to farmers, fishermen, priests and occupied subjects of Rome. Their customs give his words their edge.") +
      '<div class="toolbar">' + field("say-q", "Search sayings, e.g. cheek, camel, yoke") + '<span class="count" id="say-count"></span></div><div class="grid" id="saygrid"></div>';
  };
  function sayGrid() {
    var q = (($("#say-q") || {}).value || "").toLowerCase().trim();
    var list = A("sayings").filter(function (s) { return !q || [s.saying, s.ref, s.setting, s.meaning].join(" ").toLowerCase().indexOf(q) > -1; });
    $("#saygrid").innerHTML = list.map(function (s) { return card("saying", s, { text: clip(s.setting, 140) }); }).join("") || '<p class="count">Nothing matches. Try another word.</p>';
    $("#say-count").textContent = list.length + " of " + A("sayings").length;
  }

  V.teachings = function () {
    return head("What is taught", "Common relational-gospel teachings", "The recurring notes in this stream of teaching, each with its scriptures and the main pushback it receives.") +
      '<div class="grid">' + A("teachings").map(function (t) { return card("teaching", t, { text: clip(t.summary, 150) }); }).join("") + "</div>";
  };

  var debateTab = "strawmen";
  V.debate = function () {
    return head("The conversation", "Debates & strawmen", "Critics often attack positions relational-gospel teachers do not hold. Flip each card to see the accusation answered, then weigh the real debates side by side.") +
      '<div class="chips" id="dtabs"><button class="chip" type="button" data-dt="strawmen" aria-pressed="' + (debateTab === "strawmen") + '">Strawmen (' + A("strawmen").length + ')</button><button class="chip" type="button" data-dt="arguments" aria-pressed="' + (debateTab === "arguments") + '">Real debates (' + A("arguments").length + ")</button></div>" +
      '<div id="dpane">' + (debateTab === "strawmen" ? strawPane() : argPane()) + "</div>";
  };
  function strawPane() {
    return '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + A("strawmen").map(function (s) {
      return '<button type="button" class="flip" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The accusation</div><h3>' + s.claim + '</h3><span class="label">Tap to see the reply</span></div>' +
        '<div class="flip-face back"><div class="label">What is actually held</div><p>' + clip(s.actual, 360) + '</p><span class="chip" data-open="strawman.' + s.id + '" role="link">Read in full</span></div></div></button>';
    }).join("") + "</div>";
  }
  function argPane() {
    return '<div style="display:grid;gap:16px">' + A("arguments").map(function (a) {
      return '<article class="scale"><div class="row" style="justify-content:space-between"><h3>' + esc(a.question) + "</h3>" + saveBtn("argument", a.id) + "</div>" +
        '<div class="split"><div class="panel uni"><div class="label">The relational case</div><ul>' + (a.forView || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div><div class="panel sep"><div class="label">The strongest counter-case</div><ul>' + (a.againstView || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div></div>" +
        '<div class="qa"><details><summary>The response</summary><div class="ans"><p>' + a.response + "</p>" + (a.openQuestions ? '<p><strong>Still open:</strong> ' + a.openQuestions + "</p>" : "") + "</div></details></div></article>";
    }).join("") + "</div>";
  }

  var notes = load("rga.notes", { passage: "", step: 0, answers: {} });
  V.read = function () {
    var H = A("hermeneutics"), i = Math.min(notes.step || 0, Math.max(0, H.length - 1)), h = H[i];
    return head("How to approach the Bible", "The reading compass", "Fourteen questions to carry into any passage. Name the passage you are studying, then walk through them. Your notes stay in this browser.") +
      '<div class="passage-field"><label class="label" for="passage">Passage</label><label class="field" style="max-width:420px"><input id="passage" type="text" placeholder="e.g. Exodus 3:1-6" value="' + esc(notes.passage) + '"></label></div>' +
      '<div class="compass"><div class="compass-list" id="clist">' + H.map(function (x, j) {
        var done = notes.answers[x.id] && notes.answers[x.id].trim();
        return '<button type="button" data-step="' + j + '" aria-current="' + (j === i) + '" class="' + (done ? "done" : "") + '"><b>' + String(j + 1).padStart(2, "0") + "</b>" + esc(x.principle) + "</button>";
      }).join("") + "</div>" +
      (h ? '<article class="compass-card"><div class="label">Question ' + (i + 1) + " of " + H.length + "</div><h2>" + esc(h.principle) + "</h2><p>" + h.explanation + "</p>" +
        '<div class="panel gold"><div class="label">Worked example</div><p>' + h.example + "</p></div>" +
        '<label class="label" for="ans">Ask the text: ' + strip(h.ask) + '</label><textarea id="ans" placeholder="Write what you notice…">' + esc(notes.answers[h.id] || "") + "</textarea>" +
        '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-move="-1"' + (i === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-move="1"' + (i === H.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>" : "") +
      "</div>";
  };

  V.saved = function () {
    var items = saved.map(function (k) { var p = k.split(":"); return { type: p[0], x: find(p[0], p[1]) }; }).filter(function (o) { return o.x; });
    return head("Your collection", "Saved", "Tap the star on any card to keep it here. Saved items live in this browser only.") +
      (items.length ? '<div class="grid">' + items.map(function (o) {
        if (o.type === "theme") return '<a class="card" href="#theme.' + o.x.id + '"><div class="label">Theme</div><h3>' + esc(o.x.title) + "</h3></a>";
        return card(o.type, o.x, { top: '<div class="label">' + TYPES[o.type].label + "</div>" });
      }).join("") + "</div>" : '<div class="panel"><p>Nothing saved yet. Open the <a href="#culture">Culture decoder</a> or the <a href="#law">Law</a> and tap a star.</p></div>');
  };

  /* ================= SHEET ================= */
  var SHEET = {
    law: function (x) {
      var cat = A("lawCategories").filter(function (c) { return c.id === x.category; })[0];
      return '<div class="verse"><span class="ref">' + esc(x.ref) + "</span>" + x.text + "</div>" + blk("Category", cat ? cat.name : x.category) +
        blk("What it meant then", x.meaning) + blk("Why God gave it", x.why) + panel("uni", "How it points to Christ", x.christ) + panel("sep", "How it has been misused", x.misuse);
    },
    culture: function (x) {
      return '<div class="row">' + verdict(x.verdict) + '<span class="ref">' + esc((x.refs || []).join(" · ")) + "</span></div>" +
        blk("The practice", x.practice) + blk("The cultural reason", x.culture) + panel("gold", "The spiritual thread", x.thread) +
        ((x.links || []).length ? '<div class="blk"><div class="label">Cross-references</div><div class="links">' + x.links.map(function (l) { return '<div><span class="ref">' + esc(l.ref) + "</span> " + l.note + "</div>"; }).join("") + "</div></div>" : "") +
        panel("sep", "How it was misread", x.misread) + panel("uni", "The lasting principle", x.principle);
    },
    saying: function (x) { return '<div class="ref">' + esc(x.ref) + "</div>" + blk("The setting", x.setting) + panel("uni", "What it meant", x.meaning) + panel("sep", "Common misreading", x.misread); },
    violence: function (x) {
      var rs = x.readings || [];
      return '<div class="ref">' + esc(x.ref) + "</div>" + blk("What the text says", x.summary) + panel("sep", "Why it troubles readers", x.problem) +
        (rs.length ? '<div class="blk"><div class="label">Readings · choose a framework</div><div class="tabs" id="rtabs">' + rs.map(function (r, i) { return '<button class="chip" type="button" data-rt="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(fwName(r.lens)) + "</button>"; }).join("") + '</div><div class="tab-panel" id="rpanel">' + rs[0].text + "</div></div>" : "") +
        panel("uni", "Through the lens of Jesus", x.jesusLens) + panel("gold", "Takeaway", x.takeaway);
    },
    framework: function (x) { return '<div class="ref">' + esc(x.proponents) + "</div>" + blk("The idea", x.explanation) + panel("uni", "Strengths", x.strengths) + panel("sep", "Critiques", x.critiques); },
    teaching: function (x) { return '<div class="ref">' + esc((x.refs || []).join(" · ")) + "</div>" + blk("The teaching", x.summary) + panel("sep", "The main pushback", x.pushback); },
    strawman: function (x) { return panel("sep", "Why it is a strawman", x.why) + panel("uni", "What is actually held", x.actual) + blk("Scriptures", esc((x.refs || []).join(" · "))) + panel("gold", "A fair point remains", x.tension); },
    argument: function (x) {
      return '<div class="panel uni"><div class="label">The relational case</div><ul>' + (x.forView || []).map(function (y) { return "<li>" + y + "</li>"; }).join("") + '</ul></div><div class="panel sep"><div class="label">The counter-case</div><ul>' + (x.againstView || []).map(function (y) { return "<li>" + y + "</li>"; }).join("") + "</ul></div>" + blk("The response", x.response) + blk("Still open", x.openQuestions);
    },
    contrast: function (x) { return panel("sep", "Then · " + esc(x.ot.ref), "<em>" + x.ot.text + "</em>") + panel("uni", "In Christ · " + esc(x.nt.ref), "<em>" + x.nt.text + "</em>") + blk("Holding them together", x.note); },
    moment: function (x) { return '<div class="ref">' + esc(x.era + " · " + x.ref) + "</div>" + panel("sep", "What they thought", x.thought) + panel("gold", "What God revealed", x.revealed) + panel("uni", "What Jesus shows", x.jesus); },
    principle: function (x) { return blk("The principle", x.explanation) + panel("gold", "Worked example", x.example) + panel("uni", "Ask the text", x.ask); }
  };
  var lastFocus = null;
  function openSheet(type, id) {
    var x = find(type, id), t = TYPES[type];
    if (!x || !SHEET[type]) return;
    lastFocus = document.activeElement;
    $("#layer").innerHTML = '<div class="scrim" data-close></div><aside class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1">' +
      '<div class="sheet-head"><div><div class="label">' + t.label + '</div><h2 id="sheet-title">' + esc(strip(t.title(x))) + '</h2></div><div class="row">' + saveBtn(type, id) +
      '<button class="save" type="button" data-close aria-label="Close">' + ICON.close + '</button></div></div><div class="sheet-body">' + SHEET[type](x) + "</div></aside>";
    var sh = $(".sheet"); sh.focus();
    var rs = x.readings || [];
    $$("[data-rt]", sh).forEach(function (b) {
      b.addEventListener("click", function () {
        $$("[data-rt]", sh).forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        $("#rpanel").innerHTML = rs[+b.dataset.rt].text;
      });
    });
    var h = type + "." + id;
    if (location.hash.slice(1) !== h) history.replaceState(null, "", "#" + h);
    route.item = { type: type, id: id };
  }
  function closeLayer() {
    if (!$("#layer").innerHTML) return;
    $("#layer").innerHTML = "";
    if (route.item) { route.item = null; history.replaceState(null, "", "#" + (route.view === "theme" ? "theme." + route.id : route.view)); }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ================= SEARCH ================= */
  var INDEX = null;
  function buildIndex() {
    INDEX = [];
    Object.keys(TYPES).forEach(function (type) {
      var t = TYPES[type];
      A(t.key).forEach(function (x) {
        var text = strip(Object.keys(x).map(function (k) { var v = x[k]; return typeof v === "string" ? v : JSON.stringify(v); }).join(" ")).replace(/[{}\[\]"]/g, " ");
        INDEX.push({ type: type, id: x.id, title: strip(t.title(x)), sub: t.label + (t.sub(x) ? " · " + strip(t.sub(x)) : ""), text: text, lt: strip(t.title(x)).toLowerCase(), lx: text.toLowerCase() });
      });
    });
  }
  function openSearch() {
    if (!INDEX) buildIndex();
    lastFocus = document.activeElement;
    $("#layer").innerHTML = '<div class="scrim" data-close></div><div class="search-box" role="dialog" aria-modal="true" aria-label="Search the atlas">' + field("sq", "Search sandals, Jubilee, apokatastasis, hair…") + '<div class="results" id="sres"></div></div>';
    var input = $("#sq"), active = 0, hits = [];
    function run() {
      var q = input.value.toLowerCase().trim();
      if (q.length < 2) { $("#sres").innerHTML = '<div class="empty">Type at least two letters. Try <em>sandals</em>, <em>Gehenna</em>, <em>tithe</em> or <em>Boaz</em>.</div>'; hits = []; return; }
      var words = q.split(/\s+/);
      hits = INDEX.map(function (e) {
        var s = 0;
        for (var i = 0; i < words.length; i++) { var w = words[i]; if (e.lt.indexOf(w) > -1) s += 10; else if (e.lx.indexOf(w) > -1) s += 1; else return null; }
        return { e: e, s: s };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 40);
      active = 0;
      $("#sres").innerHTML = hits.length ? hits.map(function (h, i) {
        var pos = h.e.lx.indexOf(words[0]), snip = h.e.text.slice(Math.max(0, pos - 50), pos + 120);
        var re = new RegExp("(" + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
        return '<button type="button" data-hit="' + i + '" class="' + (i === 0 ? "active" : "") + '"><span class="label">' + esc(h.e.sub) + "</span><b>" + esc(h.e.title).replace(re, "<mark>$1</mark>") + "</b><small>" + (pos > 50 ? "…" : "") + esc(snip).replace(re, "<mark>$1</mark>") + "…</small></button>";
      }).join("") : '<div class="empty">Nothing found for that. Try a single word, or a Bible book like <em>Ruth</em>.</div>';
    }
    function pick(i) { var h = hits[i]; if (!h) return; closeLayer(); go(h.e.type === "theme" ? "theme." + h.e.id : h.e.type + "." + h.e.id); }
    input.addEventListener("input", run);
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault(); active = Math.max(0, Math.min(hits.length - 1, active + (ev.key === "ArrowDown" ? 1 : -1)));
        $$("#sres [data-hit]").forEach(function (b, i) { b.classList.toggle("active", i === active); if (i === active) b.scrollIntoView({ block: "nearest" }); });
      } else if (ev.key === "Enter") pick(active);
    });
    $("#sres").addEventListener("click", function (ev) { var b = ev.target.closest("[data-hit]"); if (b) pick(+b.dataset.hit); });
    run(); input.focus();
  }

  function openMenu() {
    $("#layer").innerHTML = '<div class="scrim" data-close></div><div class="menu-sheet" role="dialog" aria-label="All regions">' + VIEWS.map(function (g) {
      var items = g.items.slice(); if (g.group === "The great themes") A("themes").forEach(function (t) { if (t.id !== "perfect-theology") items.push(["theme." + t.id, t.title]); });
      return '<div class="label" style="margin:14px 0 8px">' + g.group + '</div><div class="grid">' + items.map(function (it) { return '<a href="#' + it[0] + '" data-close>' + esc(it[1]) + "</a>"; }).join("") + "</div>";
    }).join("") + "</div>";
  }

  /* ================= ATLAS CANVAS ================= */
  var sky = null;
  function startSky() {
    var cv = $("#sky"); if (!cv) return;
    var ctx = cv.getContext("2d"), stage = $("#stage"), tip = $("#tip");
    var themes = A("themes"), regions = [["read", "Reading"], ["lens", "Old & New"], ["journey", "Misreadings"], ["violence", "Violence"], ["law", "The Law"], ["culture", "Culture"], ["sayings", "Jesus' words"], ["teachings", "Teachings"], ["debate", "Debates"]];
    var nodes = [], W = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), hover = null, t0 = performance.now(), raf = 0;
    var stars = []; for (var i = 0; i < 160; i++) stars.push({ a: Math.random() * Math.PI * 2, r: Math.sqrt(Math.random()), s: Math.random() * 1.3 + 0.2, p: Math.random() * 6 });
    themes.forEach(function (t, i) { nodes.push({ kind: "theme", id: t.id, label: t.title, ring: 0.36, a: (i / themes.length) * Math.PI * 2, rel: t.related || [] }); });
    regions.forEach(function (r, i) { nodes.push({ kind: "region", id: r[0], label: r[1], ring: 0.7, a: (i / regions.length) * Math.PI * 2 + 0.3 }); });
    function size() { W = stage.clientWidth; cv.width = W * dpr; cv.height = W * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
    function pos(n, rot) { var a = n.a + rot * (n.kind === "theme" ? 1 : -0.55); return { x: W / 2 + Math.cos(a) * n.ring * W / 2 * 1.25, y: W / 2 + Math.sin(a) * n.ring * W / 2 * 1.25 }; }
    function draw(now) {
      var tt = (now - t0) / 1000, rot = reduced ? 0 : tt * 0.02, gold = css("--gold"), dawn = css("--dawn"), ink = css("--ink"), muted = css("--muted"), line = css("--line");
      ctx.clearRect(0, 0, W, W);
      var c = W / 2;
      stars.forEach(function (s) { var r = s.r * W * 0.5; ctx.globalAlpha = 0.25 + 0.35 * Math.sin(tt * 0.8 + s.p) * 0.5 + 0.2; ctx.fillStyle = muted; ctx.beginPath(); ctx.arc(c + Math.cos(s.a + rot * 0.3) * r, c + Math.sin(s.a + rot * 0.3) * r, s.s, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1;
      [0.36, 0.7].forEach(function (rg) { ctx.strokeStyle = line; ctx.setLineDash([2, 6]); ctx.beginPath(); ctx.arc(c, c, rg * W / 2 * 1.25, 0, 7); ctx.stroke(); });
      ctx.setLineDash([]);
      var P = {}; nodes.forEach(function (n) { P[n.kind + n.id] = pos(n, rot); });
      nodes.forEach(function (n) {
        if (n.kind !== "theme") return;
        n.rel.forEach(function (r) { var q = P["theme" + r]; if (!q) return; var p = P["theme" + n.id]; ctx.strokeStyle = gold; ctx.globalAlpha = hover && (hover.id === n.id || hover.id === r) ? 0.6 : 0.08; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.quadraticCurveTo(c, c, q.x, q.y); ctx.stroke(); });
      });
      ctx.globalAlpha = 1;
      nodes.forEach(function (n) { var p = P[n.kind + n.id]; ctx.strokeStyle = n.kind === "theme" ? gold : dawn; ctx.globalAlpha = hover === n ? 0.7 : 0.14; ctx.beginPath(); ctx.moveTo(c, c); ctx.lineTo(p.x, p.y); ctx.stroke(); });
      ctx.globalAlpha = 1;
      var pulse = reduced ? 1 : 1 + Math.sin(tt * 1.4) * 0.08, g = ctx.createRadialGradient(c, c, 0, c, c, W * 0.16 * pulse);
      g.addColorStop(0, "rgba(255,246,220,1)"); g.addColorStop(0.18, "rgba(224,174,85,.9)"); g.addColorStop(1, "rgba(224,174,85,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c, c, W * 0.16 * pulse, 0, 7); ctx.fill();
      ctx.fillStyle = "#1a1408"; ctx.font = (W > 420 ? 15 : 12) + "px Marcellus, Georgia, serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Jesus", c, c);
      nodes.forEach(function (n) {
        var p = P[n.kind + n.id], hv = hover === n, r = n.kind === "theme" ? (hv ? 7 : 4.5) : (hv ? 9 : 6.5);
        ctx.fillStyle = n.kind === "theme" ? gold : dawn; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = hv ? 18 : 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
        if (n.kind === "region" || hv) {
          ctx.fillStyle = hv ? ink : muted; ctx.font = (W > 420 ? 12 : 10) + "px IBM Plex Mono, monospace"; ctx.textAlign = "center";
          ctx.fillText(n.label.toUpperCase(), p.x, p.y + (p.y > c ? 20 : -18));
        }
        n.p = p;
      });
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    function hit(ev) {
      var b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, best = null, bd = 22;
      nodes.forEach(function (n) { if (!n.p) return; var d = Math.hypot(n.p.x - x, n.p.y - y); if (d < bd) { bd = d; best = n; } });
      if (!best && Math.hypot(x - W / 2, y - W / 2) < W * 0.07) best = { kind: "center", id: "perfect-theology", label: "Jesus, perfect theology" };
      return best;
    }
    cv.addEventListener("pointermove", function (ev) {
      var n = hit(ev); hover = n && n.kind !== "center" ? n : null;
      cv.style.cursor = n ? "pointer" : "default";
      if (n) { var b = cv.getBoundingClientRect(); tip.hidden = false; tip.textContent = n.label; tip.style.left = (ev.clientX - b.left) + "px"; tip.style.top = (ev.clientY - b.top) + "px"; } else tip.hidden = true;
      if (reduced) draw(performance.now());
    });
    cv.addEventListener("pointerleave", function () { hover = null; tip.hidden = true; if (reduced) draw(performance.now()); });
    cv.addEventListener("click", function (ev) { var n = hit(ev); if (!n) return; go(n.kind === "region" ? n.id : "theme." + n.id); });
    size(); window.addEventListener("resize", size);
    draw(performance.now());
    sky = { stop: function () { cancelAnimationFrame(raf); window.removeEventListener("resize", size); } };
  }

  /* ================= RENDER ================= */
  function render() {
    var r = parseHash(); route.view = V[r.view] ? r.view : "atlas"; route.id = r.id || null;
    if (sky) { sky.stop(); sky = null; }
    $("#layer").innerHTML = "";
    $("#main").innerHTML = '<div class="plate">' + V[route.view]() + '</div><footer class="footer"><p>Relational Gospel Atlas. A study companion presenting the relational, incarnational reading of Scripture alongside its strongest objections. Scripture quotations are from the World English Bible or KJV unless paraphrased.</p></footer>';
    $("#rail").innerHTML = railHTML(); $("#tabbar").innerHTML = tabbarHTML();
    window.scrollTo(0, 0);
    if (route.view === "atlas") startSky();
    if (route.view === "law") lawGrid();
    if (route.view === "culture") { culGrid(); bindTrail(); }
    if (route.view === "sayings") sayGrid();
    bindSU();
    if (r.item) openSheet(r.item.type, r.item.id);
    var ttl = route.view === "theme" ? (find("theme", route.id) || {}).title : null;
    document.title = (ttl ? ttl + " · " : "") + "Relational Gospel Atlas";
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (ev) {
    var t = ev.target;
    var sv = t.closest("[data-save]"); if (sv) { ev.stopPropagation(); toggleSaved(sv.dataset.save); $$('[data-save="' + sv.dataset.save + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(isSaved(sv.dataset.save))); }); return; }
    if (t.closest("[data-close]")) { var a = t.closest("a[data-close]"); closeLayer(); if (a) return; ev.preventDefault(); return; }
    var op = t.closest("[data-open]"); if (op) { ev.preventDefault(); ev.stopPropagation(); var p = op.dataset.open.split("."); openSheet(p[0], p.slice(1).join(".")); return; }
    if (t.closest("[data-search]") || t.closest("#open-search")) { openSearch(); return; }
    if (t.closest("#open-menu")) { openMenu(); return; }
    var fl = t.closest("[data-flip]"); if (fl) { fl.classList.toggle("on"); return; }
    var ln = t.closest("[data-lens]"); if (ln) { var el = ln.closest(".contrast"); setLens(el, ln.getAttribute("aria-pressed") !== "true"); return; }
    if (t.closest("#lens-all")) { var b = $("#lens-all"), on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Turn every lens off" : "Turn every lens on"; $$(".contrast").forEach(function (c) { setLens(c, on); }); return; }
    var vl = t.closest("[data-vl]"); if (vl) { violenceLens = vl.dataset.vl; $$("[data-vl]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === vl)); }); $("#vgrid").innerHTML = vGrid(); return; }
    var lc = t.closest("[data-cat]"); if (lc) { lawCat = lc.dataset.cat; $$("[data-cat]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === lc)); }); lawGrid(); return; }
    var cv = t.closest("[data-v]"); if (cv) { culVerdict = cv.dataset.v; $$("[data-v]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === cv)); }); culGrid(); return; }
    var dt = t.closest("[data-dt]"); if (dt) { debateTab = dt.dataset.dt; $$("[data-dt]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === dt)); }); $("#dpane").innerHTML = debateTab === "strawmen" ? strawPane() : argPane(); return; }
    var st = t.closest("#clist [data-step]"); if (st) { notes.step = +st.dataset.step; store("rga.notes", notes); render(); return; }
    var mv = t.closest("[data-move]"); if (mv) { notes.step = Math.max(0, (notes.step || 0) + +mv.dataset.move); store("rga.notes", notes); render(); return; }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closeLayer();
    if (ev.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { ev.preventDefault(); openSearch(); }
    if ((ev.key === "Enter" || ev.key === " ") && document.activeElement.matches && document.activeElement.matches(".card[data-open]")) { ev.preventDefault(); document.activeElement.click(); }
  });
  document.addEventListener("input", function (ev) {
    var id = ev.target.id;
    if (id === "law-q") lawGrid();
    else if (id === "cul-q") culGrid();
    else if (id === "say-q") sayGrid();
    else if (id === "passage") { notes.passage = ev.target.value; store("rga.notes", notes); }
    else if (id === "ans") {
      var H = A("hermeneutics"), h = H[notes.step || 0]; if (!h) return;
      notes.answers[h.id] = ev.target.value; store("rga.notes", notes);
      var btn = $('#clist [data-step="' + (notes.step || 0) + '"]'); if (btn) btn.classList.toggle("done", !!ev.target.value.trim());
    }
  });
  $("#theme-toggle").addEventListener("click", function () {
    var root = document.documentElement, cur = root.getAttribute("data-theme");
    var dark = cur ? cur === "dark" : !(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark"); store("rga.theme", dark ? "light" : "dark");
  });
  var th = load("rga.theme", null); if (th) document.documentElement.setAttribute("data-theme", th);
  window.addEventListener("hashchange", render);
  render();
})();
