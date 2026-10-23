/* ---------- language switch: English / தமிழ் ----------
   The Tamil dictionary ships gzipped inside the page (window.RG_TA). Choosing a language
   stores it and reloads; on start the data strings are swapped before the app renders and
   a DOM pass translates interface text and converts scripture book names. */
(function () {
  "use strict";
  var RULES = window.RGI18N_RULES, KEY = "rga.lang";
  function getLang() {
    try { var v = localStorage.getItem(KEY); if (v) return v; } catch (e) { /* storage unavailable */ }
    var m = /(?:^|;)rgalang=(\w+)/.exec(window.name || "");
    return m ? m[1] : "en";
  }
  function setLang(l) {
    try { localStorage.setItem(KEY, l); } catch (e) { /* storage unavailable */ }
    try { window.name = "rgalang=" + l; } catch (e) { /* ignore */ }
  }
  var lang = window.RG_TA && getLang() === "ta" ? "ta" : "en";

  /* ---------- scripture book names ---------- */
  var BOOKS = [
    ["Genesis|Gen", "ஆதியாகமம்"], ["Exodus|Exod|Ex", "யாத்திராகமம்"], ["Leviticus|Lev", "லேவியராகமம்"], ["Numbers|Num", "எண்ணாகமம்"],
    ["Deuteronomy|Deut|Dt", "உபாகமம்"], ["Joshua|Josh", "யோசுவா"], ["Judges|Judg", "நியாயாதிபதிகள்"], ["Ruth", "ரூத்"],
    ["Samuel|Sam", "சாமுவேல்"], ["Kings|Kgs", "இராஜாக்கள்"], ["Chronicles|Chron|Chr", "நாளாகமம்"], ["Ezra", "எஸ்றா"],
    ["Nehemiah|Neh", "நெகேமியா"], ["Esther|Esth", "எஸ்தர்"], ["Job", "யோபு"], ["Psalms|Psalm|Pss|Ps", "சங்கீதம்"],
    ["Proverbs|Prov", "நீதிமொழிகள்"], ["Ecclesiastes|Eccles|Eccl|Ecc", "பிரசங்கி"], ["Song of Songs|Song of Solomon|Song", "உன்னதப்பாட்டு"],
    ["Isaiah|Isa", "ஏசாயா"], ["Jeremiah|Jer", "எரேமியா"], ["Lamentations|Lam", "புலம்பல்"], ["Ezekiel|Ezek", "எசேக்கியேல்"],
    ["Daniel|Dan", "தானியேல்"], ["Hosea|Hos", "ஓசியா"], ["Joel", "யோவேல்"], ["Amos", "ஆமோஸ்"], ["Obadiah|Obad", "ஒபதியா"],
    ["Jonah", "யோனா"], ["Micah|Mic", "மீகா"], ["Nahum|Nah", "நாகூம்"], ["Habakkuk|Hab", "ஆபகூக்"], ["Zephaniah|Zeph", "செப்பனியா"],
    ["Haggai|Hag", "ஆகாய்"], ["Zechariah|Zech", "சகரியா"], ["Malachi|Mal", "மல்கியா"],
    ["Matthew|Matt|Mt", "மத்தேயு"], ["Mark|Mk", "மாற்கு"], ["Luke|Lk", "லூக்கா"], ["John|Jn", "யோவான்"], ["Acts", "அப்போஸ்தலர்"],
    ["Romans|Rom", "ரோமர்"], ["Corinthians|Cor", "கொரிந்தியர்"], ["Galatians|Gal", "கலாத்தியர்"], ["Ephesians|Eph", "எபேசியர்"],
    ["Philippians|Phil", "பிலிப்பியர்"], ["Colossians|Col", "கொலோசெயர்"], ["Thessalonians|Thess", "தெசலோனிக்கேயர்"],
    ["Timothy|Tim", "தீமோத்தேயு"], ["Titus", "தீத்து"], ["Philemon|Phlm", "பிலேமோன்"], ["Hebrews|Heb", "எபிரெயர்"],
    ["James|Jas", "யாக்கோபு"], ["Peter|Pet", "பேதுரு"], ["Jude", "யூதா"], ["Revelation|Rev", "வெளிப்படுத்தின விசேஷம்"]
  ];
  var BOOK = {}, alts = [];
  BOOKS.forEach(function (b) { b[0].split("|").forEach(function (n) { BOOK[n] = b[1]; alts.push(n); }); });
  alts.sort(function (a, b) { return b.length - a.length; });
  var REF = new RegExp("\\b(" + alts.join("|").replace(/ /g, "\\s") + ")\\.?(?=\\s?\\d+(?::\\d|[\\s,;)–-]|$))", "g");
  function refs(s) { return s.replace(REF, function (m, b) { return BOOK[b.replace(/\s+/g, " ")] || m; }); }

  /* ---------- dictionaries ---------- */
  var D = {}, U = {}, REV = {};
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  var RUN = /[A-Za-z][A-Za-z0-9'’‘\-–—.,:;!?&\/() ]*[A-Za-z0-9.!?)…]|[A-Za-z]/g;
  function piece(p) {
    var t = norm(p); if (!t) return p;
    var r = U[t] || U[t.replace(/[.:,;!?…]+$/, "")] && U[t.replace(/[.:,;!?…]+$/, "")] + t.match(/[.:,;!?…]+$/)[0];
    if (!r) return p;
    return p.match(/^\s*/)[0] + r + p.match(/\s*$/)[0];
  }
  function trRun(run) {
    var t = norm(run);
    if (U[t]) return U[t];
    var r = refs(run);
    var whole = piece(r); if (whole !== r) return whole;
    return r.split(/(\s*\d[\d:,.–\-]*\s*)/).map(function (p, i) { return i % 2 ? p : piece(p); }).join("");
  }
  function trText(s) {
    if (!/[A-Za-z]/.test(s)) return s;
    var t = norm(s);
    if (U[t]) return s.match(/^\s*/)[0] + U[t] + s.match(/\s*$/)[0];
    return s.replace(RUN, trRun);
  }

  /* ---------- data swap ---------- */
  function applyData(RG) {
    function walk(o) {
      if (Array.isArray(o)) { for (var i = 0; i < o.length; i++) visit(o, i, o.__k); return; }
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) visit(o, k, k);
    }
    function visit(o, i, k) {
      var v = o[i];
      if (typeof v === "string") {
        if (RULES.wanted(v, k)) { var t = D[RULES.hash(v)]; if (t) { o[i] = t; REV[t] = v; } }
      } else if (v && typeof v === "object") {
        if (Array.isArray(v)) { for (var j = 0; j < v.length; j++) visit(v, j, k); } else walk(v);
      }
    }
    walk(RG);
  }

  /* ---------- DOM pass ---------- */
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, CODE: 1 };
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  function trEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (a && /[A-Za-z]/.test(a)) { var n = trText(a); if (n !== a) el.setAttribute(ATTRS[i], n); }
    }
  }
  function skip(n) { for (var p = n; p && p.nodeType === 1; p = p.parentNode) { if (SKIP[p.nodeName] || (p.hasAttribute && p.hasAttribute("data-noi18n"))) return true; } return false; }
  function trTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skip(root.parentNode)) { var v = root.nodeValue, n = trText(v); if (n !== v) root.nodeValue = n; } return; }
    if (root.nodeType !== 1 || skip(root)) return;
    trEl(root);
    var w = document.createTreeWalker(root, 5, { acceptNode: function (x) { return x.nodeType === 1 && (SKIP[x.nodeName] || x.hasAttribute("data-noi18n")) ? 2 : 1; } }), x;
    while ((x = w.nextNode())) {
      if (x.nodeType === 1) trEl(x);
      else if (/[A-Za-z]/.test(x.nodeValue)) { var nv = trText(x.nodeValue); if (nv !== x.nodeValue) x.nodeValue = nv; }
    }
  }
  function observe() {
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === "childList") for (var j = 0; j < m.addedNodes.length; j++) trTree(m.addedNodes[j]);
        else if (m.type === "characterData") trTree(m.target);
        else if (m.type === "attributes") trEl(m.target);
      }
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  /* ---------- decode ---------- */
  function decode(b64) {
    var bin = atob(b64), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    if (window.DecompressionStream) return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js";
      s.onload = function () { res(new TextDecoder().decode(window.fflate.gunzipSync(u))); };
      s.onerror = rej; document.head.appendChild(s);
    });
  }

  /* ---------- switch ---------- */
  function mountSwitch() {
    var bar = document.querySelector(".top-actions"); if (!bar || !window.RG_TA) return;
    var w = document.createElement("div");
    w.className = "lang-switch"; w.setAttribute("role", "group"); w.setAttribute("aria-label", "Language · மொழி"); w.setAttribute("data-noi18n", "");
    w.innerHTML = '<button type="button" data-lang="en" lang="en" aria-pressed="' + (lang === "en") + '">EN</button><button type="button" data-lang="ta" lang="ta" aria-pressed="' + (lang === "ta") + '">தமிழ்</button>';
    bar.appendChild(w);
    w.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lang]"); if (!b || b.getAttribute("data-lang") === lang) return;
      setLang(b.getAttribute("data-lang"));
      document.documentElement.classList.add("lang-busy");
      location.reload();
    });
  }

  window.RGen = function (s) { return REV[s] || s; };
  window.RGI18N = { lang: function () { return lang; }, t: trText };

  window.RGboot = function (start) {
    mountSwitch();
    if (lang !== "ta") { start(); return; }
    var root = document.documentElement;
    root.setAttribute("lang", "ta"); root.classList.add("lang-busy");
    decode(window.RG_TA).then(function (txt) {
      var P = JSON.parse(txt); D = P.d || {}; U = P.u || {};
      applyData(window.RG || {});
      document.title = trText(document.title);
      trTree(document.body); observe();
      start();
      root.classList.remove("lang-busy");
    }).catch(function () {
      lang = "en"; root.setAttribute("lang", "en"); root.classList.remove("lang-busy"); start();
    });
  };
})();
