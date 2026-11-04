/* Home & study companion: registers the #home dashboard and the #you ("Your study") view,
   groups every study into topics (used by the sidebar, the home topic map and the pager),
   tracks what you have explored, draws the animated topic illustrations and flowcharts, the heart
   check-in and the guide chat. Loaded after the app script and before skin.js (which reads RGRooms). */
(function () {
  var doc = document, reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function get(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ic(d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"; }
  function curHash() { return decodeURIComponent(location.hash.slice(1)); }

  /* ---------- topics (sidebar groups, home topic map, pager order) ---------- */
  var ROOMS = [
    { id: "entrance", name: "Start here", c: "accent", scene: "door", tag: "How to read the Bible, the atlas map, and the good news the apostles announced.",
      prompt: "What picture of God did you grow up with? Write it down before you walk further in.", items: ["read", "atlas", "theme.bible-narratives", "theme.undiluted-gospel"] },
    { id: "revelation", name: "Who God is", c: "gold", scene: "sun", tag: "Jesus shows us the Father. Love is God's one nature, and the hard passages read differently in his light.",
      prompt: "Which picture of God in these studies surprised you most, and why?", items: ["story", "theme.perfect-theology", "love", "apostles", "lens", "journey", "violence", "authored", "question", "sovereign", "ways"] },
    { id: "union", name: "Union & the Trinity", c: "dawn", scene: "trinity", tag: "Father, Son and Spirit, and a humanity drawn into their shared life. The relational gospel at its heart.",
      prompt: "If you are already included in the life of the Trinity, what changes about today?", items: ["theme.trinitarian-gospel", "trinity", "theme.union-sonship", "compare", "trees", "newcreation", "incarnation", "theme.designed-for-connection", "embrace", "doxa", "ecstasy"] },
    { id: "cross", name: "The cross & new birth", c: "wine", scene: "cross", tag: "What the cross did, what was defeated, and what it means to be born from above.",
      prompt: "How would you explain what the cross did to a friend who has never been to church?", items: ["saviour", "lamb", "blood", "facets", "tenses", "deathless", "reborn", "allsaved"] },
    { id: "healing", name: "Healing & freedom", c: "dawn", scene: "heal", tag: "Heart healing, forgiveness, boundaries, habits, and hope while you are still growing.",
      prompt: "Where do you need healing or repair right now? Name it gently.", items: ["identity", "unfold", "forgive", "sorry", "boundaries", "recover", "healing", "resist", "justice"] },
    { id: "kingdom", name: "Kingdom & church", c: "accent", scene: "seed", tag: "Ekklesia, the parables of the kingdom, mission, and the ministry of reconciliation.",
      prompt: "What would the church look like if it lived as a family and a kingdom colony?", items: ["kingdom", "realm", "parables", "theme.church-now", "sozo", "reconcile", "mission", "share", "miracles"] },
    { id: "blessing", name: "Blessing & promise", c: "gold", scene: "cup", tag: "Covenant blessing, God's heart for provision, faith, promises, gifts and the sons of God.",
      prompt: "Which promise do you find hardest to receive, and what stands in the way?", items: ["blessing", "covenant", "name", "belief", "receive", "enforce", "gifts", "sons"] },
    { id: "living", name: "Everyday life", c: "ember", scene: "path", tag: "Worship, work, money, family, manners, and love with a spine on a Monday.",
      prompt: "Pick one practice from this room to try this week. What is it?", items: ["living", "life", "worship", "paths", "design", "woman", "why"] },
    { id: "library", name: "Law, culture & Scripture", c: "accent", scene: "scroll", tag: "Why the Law was given, the customs behind the text, the words of Jesus, and common misreadings.",
      prompt: "Which verse have you heard misused? How does its setting change it?", items: ["law", "culture", "sayings", "myths", "misuse", "conflate", "lies"] },
    { id: "themes", name: "The great themes", c: "gold", scene: "sun", tag: "Incarnation, union, the Triune dance, resurrection and the restoration of all things, one theme at a time.",
      prompt: "", items: ["themes"] },
    { id: "council", name: "Voices & debates", c: "wine", scene: "voices", tag: "Church fathers and teachers, frameworks compared, big questions, and the strongest objections answered.",
      prompt: "Which objection still troubles you? Write it as honestly as you can.", items: ["voices", "embodied", "models", "big", "religion", "teachings", "debate"] },
    { id: "you", name: "Your study", c: "gold", scene: "lamp", tag: "Saved studies, highlights, notes and progress, kept in this browser.", prompt: "", items: ["saved"] }
  ];
  var MORE = { id: "more", name: "More studies", c: "muted", scene: "door", tag: "Studies added since these topics were arranged.", prompt: "", items: [] };
  var MAP = {}; ROOMS.forEach(function (r) { r.items.forEach(function (h) { MAP[h] = r.id; }); });
  function room(id) { for (var i = 0; i < ROOMS.length; i++) if (ROOMS[i].id === id) return ROOMS[i]; return id === "more" ? MORE : null; }
  function roomOf(h) { if (MAP[h]) return MAP[h]; if (/^theme\./.test(h)) return "themes"; return "more"; }
  function col(r) { return "var(--" + (r.c === "muted" ? "muted" : r.c) + ")"; }

  /* ---------- titles and descriptions from the app ---------- */
  var TITLE = {}, DESC = {};
  function loadMeta() {
    (window.RGVIEWS || []).forEach(function (g) { g.items.forEach(function (it) { TITLE[it[0]] = it[1]; }); });
    ((window.RG || {}).themes || []).forEach(function (t) { if (!TITLE["theme." + t.id]) TITLE["theme." + t.id] = t.title; DESC["theme." + t.id] = DESC["theme." + t.id] || t.tagline; });
    (window.RGsteps || []).forEach(function (s) { DESC[s[0]] = s[2]; if (!TITLE[s[0]]) TITLE[s[0]] = s[1]; });
    TITLE.atlas = "The atlas map"; DESC.atlas = DESC.atlas || "A rose-window map of every theme and region, with Christ at the centre.";
    DESC.saved = DESC.saved || "Everything you starred, in one place.";
    // any study the app lists that no room claims goes to the right room or "More studies"
    MORE.items = [];
    Object.keys(TITLE).forEach(function (h) { if (!MAP[h]) { var r = roomOf(h); if (r === "themes" && room("themes").items.indexOf(h) < 0) room("themes").items.push(h); else if (r === "more") MORE.items.push(h); } });
  }
  function title(h) { return TITLE[h] || h; }
  function allRooms() { return MORE.items.length ? ROOMS.concat([MORE]) : ROOMS; }

  /* ---------- progress ---------- */
  var seen = get("rga.r.seen", {}), hist = get("rga.r.hist", []), days = get("rga.r.days", []);
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function isMine(h) { return !h || h === "home" || h === "you"; }
  function track(h) {
    if (isMine(h) || !TITLE[h]) return;
    seen[h] = Date.now(); hist = [h].concat(hist.filter(function (x) { return x !== h; })).slice(0, 12);
    var t = today(); if (days[0] !== t) { days.unshift(t); days = days.slice(0, 90); }
    put("rga.r.seen", seen); put("rga.r.hist", hist); put("rga.r.days", days);
  }
  function streak() {
    if (!days.length) return 0;
    var n = 0, d = new Date(); d.setHours(0, 0, 0, 0);
    var set = {}; days.forEach(function (x) { set[x] = 1; });
    var k = function (dt) { return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(); };
    if (!set[k(d)]) d.setDate(d.getDate() - 1);
    while (set[k(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function prog(r) { var n = r.items.length, s = r.items.filter(function (h) { return seen[h]; }).length; return { n: n, s: s, p: n ? s / n : 0 }; }
  function ring(p, size) {
    var R = 16, C = 2 * Math.PI * R;
    return '<svg class="rm-ring" viewBox="0 0 40 40" width="' + (size || 40) + '" height="' + (size || 40) + '" aria-hidden="true"><circle cx="20" cy="20" r="' + R + '" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="20" cy="20" r="' + R + '" fill="none" stroke="var(--c, var(--accent))" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - p)).toFixed(1) + '" transform="rotate(-90 20 20)" class="rm-ring-v"/></svg>';
  }

  /* ---------- animated topic illustrations ---------- */
  function scene(key) {
    var S = {
      door: '<path d="M30 132 H170" stroke="var(--line-2)" stroke-width="2"/><polygon class="sc-beam" points="74,132 126,132 176,140 24,140" fill="var(--gold-soft)"/><path d="M68 132 V62 a32 32 0 0 1 64 0 V132 Z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/><path d="M74 132 V64 a26 26 0 0 1 52 0 V132 Z" fill="var(--gold-hi)" class="sc-pulse"/><g class="sc-door"><path d="M74 132 V64 a26 26 0 0 1 26 -26 V132 Z" fill="var(--surface)" stroke="var(--line-2)"/><circle cx="93" cy="92" r="2.4" fill="var(--gold)"/></g><g class="sc-door r"><path d="M126 132 V64 a26 26 0 0 0 -26 -26 V132 Z" fill="var(--surface)" stroke="var(--line-2)"/></g>',
      sun: '<path d="M10 104 H190" stroke="var(--line-2)" stroke-width="2"/><g class="sc-rays">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { return '<path d="M100 100 L' + (100 + Math.cos(i * Math.PI / 6) * 90).toFixed(1) + " " + (100 + Math.sin(i * Math.PI / 6) * 90).toFixed(1) + '" stroke="var(--gold)" stroke-width="1.5" opacity=".45"/>'; }).join("") + '</g><circle class="sc-rise" cx="100" cy="100" r="26" fill="var(--gold)"/><circle class="sc-rise sc-pulse" cx="100" cy="100" r="40" fill="var(--gold-soft)"/><rect x="0" y="105" width="200" height="40" fill="var(--sc-bg, var(--bg-2))"/><path d="M20 118 H70 M110 118 H180 M40 128 H150" stroke="var(--line-2)" stroke-width="2" stroke-linecap="round" class="sc-shimmer"/>',
      trinity: '<g class="sc-orbit"><circle cx="100" cy="50" r="30" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/><circle cx="74" cy="95" r="30" fill="var(--wine-soft)" stroke="var(--wine)" stroke-width="2"/><circle cx="126" cy="95" r="30" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/></g><circle cx="100" cy="80" r="7" fill="var(--accent)" class="sc-beat"/><circle cx="100" cy="80" r="7" fill="none" stroke="var(--accent)" class="sc-wave"/>',
      cross: '<circle cx="100" cy="64" r="56" fill="var(--gold-soft)" class="sc-pulse"/><g class="sc-veil l"><path d="M10 10 H98 V136 H10 Z" fill="var(--wine-soft)" stroke="var(--wine)" stroke-opacity=".4"/></g><g class="sc-veil r"><path d="M102 10 H190 V136 H102 Z" fill="var(--wine-soft)" stroke="var(--wine)" stroke-opacity=".4"/></g><rect x="94" y="22" width="12" height="104" rx="3" fill="var(--gold)"/><rect x="66" y="46" width="68" height="12" rx="3" fill="var(--gold)"/><path d="M40 136 Q100 118 160 136" stroke="var(--line-2)" stroke-width="2" fill="none"/>',
      heal: '<path class="sc-draw" pathLength="1" d="M10 84 H60 L72 58 L86 112 L100 70 L110 84 H130 C140 84 146 70 150 60" fill="none" stroke="var(--dawn)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g class="sc-leaf"><path d="M150 60 C150 34 170 22 188 22 C188 44 172 60 150 60 Z" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/><path d="M150 60 C162 48 172 38 182 28" stroke="var(--dawn)" stroke-width="1.5" fill="none"/></g><g class="sc-leaf d2"><path d="M136 80 C124 62 104 62 94 72 C108 86 126 88 136 80 Z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/></g>',
      seed: '<path d="M10 128 H190" stroke="var(--line-2)" stroke-width="2"/><ellipse cx="100" cy="128" rx="9" ry="5" fill="var(--ember)"/><path class="sc-draw" pathLength="1" d="M100 128 C100 104 98 86 100 62" stroke="var(--dawn)" stroke-width="4" fill="none" stroke-linecap="round"/><path class="sc-draw d2" pathLength="1" d="M100 92 C88 84 78 82 66 84 M100 78 C112 70 122 68 134 70" stroke="var(--dawn)" stroke-width="3" fill="none" stroke-linecap="round"/><g class="sc-grow"><circle cx="100" cy="46" r="26" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/><circle cx="72" cy="66" r="18" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/><circle cx="128" cy="62" r="20" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/></g><g class="sc-bird"><path d="M30 30 q6 -6 12 0 q6 -6 12 0" stroke="var(--muted)" stroke-width="2" fill="none"/></g>',
      cup: [0, 1, 2, 3, 4].map(function (i) { return '<ellipse class="sc-drop" style="animation-delay:' + (i * 0.45) + 's" cx="' + (78 + i * 11) + '" cy="10" rx="3" ry="5" fill="var(--accent)"/>'; }).join("") + '<path d="M60 58 H140 L132 112 Q130 124 118 124 H82 Q70 124 68 112 Z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/><path class="sc-fill" d="M64 72 Q100 66 136 72 L132 112 Q130 124 118 124 H82 Q70 124 68 112 Z" fill="var(--gold)" opacity=".55"/><path class="sc-spill" d="M138 60 C150 70 152 96 146 132" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" fill="none" pathLength="1"/><path d="M80 130 H120 M100 124 V130" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>',
      path: '<path d="M10 130 C60 120 70 80 110 76 S160 50 186 30" stroke="var(--line-2)" stroke-width="10" fill="none" stroke-linecap="round" opacity=".5"/>' + [[30, 124], [52, 114], [70, 98], [92, 82], [118, 74], [140, 62], [160, 48]].map(function (p, i) { return '<ellipse class="sc-step" style="animation-delay:' + (i * 0.35) + 's" cx="' + p[0] + '" cy="' + p[1] + '" rx="4" ry="6.5" fill="var(--ember)" transform="rotate(' + (40 + i * 4) + " " + p[0] + " " + p[1] + ')"/>'; }).join("") + '<path d="M168 30 L186 16 L204 30 V48 H168 Z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2" transform="translate(-14 -4)"/><rect x="179" y="34" width="8" height="10" fill="var(--gold)" class="sc-pulse"/>',
      scroll: '<rect x="40" y="30" width="120" height="90" rx="4" fill="var(--surface)" stroke="var(--line-2)" stroke-width="2"/><rect x="30" y="22" width="14" height="106" rx="7" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/><rect x="156" y="22" width="14" height="106" rx="7" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2"/>' + [0, 1, 2, 3, 4].map(function (i) { return '<path class="sc-draw" style="animation-delay:' + (i * 0.5) + 's" pathLength="1" d="M56 ' + (48 + i * 15) + " H" + (i === 4 ? 112 : 144) + '" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>'; }).join(""),
      voices: '<circle cx="100" cy="82" r="20" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2" class="sc-pulse"/><g class="sc-bub"><path d="M14 20 H74 a8 8 0 0 1 8 8 V50 a8 8 0 0 1 -8 8 H34 L22 68 V58 H14 a8 8 0 0 1 -8 -8 V28 a8 8 0 0 1 8 -8 Z" fill="var(--wine-soft)" stroke="var(--wine)" stroke-width="2"/></g><g class="sc-bub d2"><path d="M126 14 H186 a8 8 0 0 1 8 8 V44 a8 8 0 0 1 -8 8 H178 V62 L166 52 H126 a8 8 0 0 1 -8 -8 V22 a8 8 0 0 1 8 -8 Z" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2"/></g><g class="sc-bub d3"><path d="M120 104 H180 a8 8 0 0 1 8 8 V130 a8 8 0 0 1 -8 8 H120 a8 8 0 0 1 -8 -8 V112 a8 8 0 0 1 8 -8 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/></g><path class="sc-draw d2" pathLength="1" d="M60 62 L86 74 M150 56 L116 72 M140 104 L116 92" stroke="var(--gold)" stroke-width="2" fill="none"/>',
      lamp: '<path d="M30 126 H170" stroke="var(--line-2)" stroke-width="2"/><path d="M50 122 Q75 108 100 122 Q125 108 150 122 V96 Q125 84 100 96 Q75 84 50 96 Z" fill="var(--surface)" stroke="var(--line-2)" stroke-width="2"/><path d="M100 96 V122" stroke="var(--line-2)"/><circle cx="140" cy="44" r="34" fill="var(--gold-soft)" class="sc-pulse"/><path d="M140 30 C150 42 148 54 140 60 C132 54 130 42 140 30 Z" fill="var(--gold)" class="sc-flame"/><rect x="134" y="60" width="12" height="28" rx="2" fill="var(--surface)" stroke="var(--line-2)" stroke-width="2"/>'
    };
    return '<svg class="rs rs-' + key + '" viewBox="0 0 200 140" aria-hidden="true">' + (S[key] || S.door) + "</svg>";
  }

  /* ---------- content: check-in, story flow, guide ---------- */
  var CHECK = [
    { k: "curious", t: "Curious", m: "Good place to start. These three give you the big picture fast.", go: ["big", "story", "theme.perfect-theology"] },
    { k: "anxious", t: "Anxious", m: "You are held. These studies look at God's heart, and at whether he is behind what frightens you.", go: ["love", "ways", "sovereign"] },
    { k: "guilty", t: "Guilty", m: "Guilt is heavy. See what the cross actually dealt with, and how to tell true guilt from false.", go: ["forgive", "saviour", "sorry"] },
    { k: "hurt", t: "Hurt", m: "Being hurt by people, or by church, is real. These rooms talk about repair, boundaries and healing.", go: ["forgive", "boundaries", "identity"] },
    { k: "doubting", t: "Doubting", m: "Questions are welcome here. These take the hardest ones head on.", go: ["question", "authored", "violence"] },
    { k: "tired", t: "Tired of religion", m: "Many people are. Here is what religion misses, and the good news underneath it.", go: ["religion", "lies", "theme.undiluted-gospel"] },
    { k: "hungry", t: "Hungry for more", m: "Go deeper into union, joy and worship.", go: ["embrace", "ecstasy", "worship"] },
    { k: "stuck", t: "Stuck in a habit", m: "You are not your habit. These look at renewal, help and the new self.", go: ["recover", "unfold", "newcreation"] }
  ];
  var FLOW = [
    { t: "Made for union", r: "Genesis 1:26-31", d: "Humanity is made in God's image, made to share the life and love of the Father, Son and Spirit.", go: "theme.designed-for-connection" },
    { t: "We hide", r: "Genesis 3:8-10", d: "Adam and Eve hide in fear. The break is on our side: God comes walking in the garden, calling, “Where are you?”", go: "journey" },
    { t: "God meets us where we are", r: "Galatians 3:24", d: "Covenants, a tabernacle and a Law that acts as a guardian for a child until the promised Seed arrives.", go: "law" },
    { t: "The Word becomes flesh", r: "John 1:14", d: "God joins humanity to himself. Jesus is the exact picture of the Father.", go: "incarnation" },
    { t: "The cross", r: "2 Corinthians 5:19", d: "God was in Christ reconciling the world to himself, not counting their trespasses against them. Love absorbs our violence.", go: "lamb" },
    { t: "Resurrection", r: "2 Timothy 1:10", d: "Death is abolished and life and immortality are brought to light. Humanity rises with Christ.", go: "deathless" },
    { t: "The Spirit poured out", r: "Acts 2:17", d: "The Spirit is poured out on all flesh, and we wake up to sonship: beloved children, not orphans.", go: "theme.union-sonship" },
    { t: "All things made new", r: "Colossians 1:19-20", d: "Through him God reconciles all things to himself, making peace through the blood of his cross.", go: "newcreation" }
  ];
  var SYN = {
    hell: ["allsaved", "debate", "big"], wrath: ["love", "authored", "lamb"], angry: ["love", "authored", "ways"], anger: ["love", "authored"], punish: ["love", "lamb", "trees"],
    law: ["law", "compare", "trees"], tithe: ["compare", "blessing"], heal: ["healing", "identity", "resist"], sick: ["healing", "resist"], forgive: ["forgive", "sorry", "saviour"],
    addiction: ["recover", "unfold"], habit: ["recover", "unfold"], evil: ["authored", "boundaries", "sovereign"], suffer: ["authored", "resist", "sovereign"], suffering: ["authored", "resist", "sovereign"],
    trinity: ["trinity", "theme.trinitarian-gospel"], baptism: ["compare", "reborn"], women: ["woman", "design", "culture"], woman: ["woman", "design"], marriage: ["design", "woman"],
    death: ["deathless", "allsaved"], die: ["deathless", "newcreation"], cross: ["lamb", "facets", "blood"], atonement: ["lamb", "facets", "tenses"], blood: ["blood", "lamb"],
    saved: ["allsaved", "saviour", "tenses"], salvation: ["tenses", "saviour", "allsaved"], born: ["reborn", "unfold"], prayer: ["living", "ecstasy", "paths"], pray: ["living", "ecstasy"],
    church: ["kingdom", "sozo", "theme.church-now"], money: ["living", "blessing"], sin: ["trees", "newcreation", "saviour"], devil: ["big"], satan: ["big"], demon: ["big", "healing"],
    violence: ["violence", "authored"], war: ["violence", "authored"], genocide: ["violence"], "old": ["lens", "violence", "law"], testament: ["lens", "story"], sabbath: ["law", "compare"],
    hair: ["culture"], veil: ["culture"], head: ["culture"], sandals: ["culture"], jesus: ["theme.perfect-theology", "sayings", "incarnation"], father: ["theme.perfect-theology", "question", "trinity"],
    spirit: ["trinity", "worship", "ecstasy"], worship: ["worship"], fear: ["love", "ways", "living"], afraid: ["love", "ways"], anxious: ["love", "living"], doubt: ["question", "doxa", "big"],
    control: ["sovereign", "boundaries"], sovereign: ["sovereign"], boundaries: ["boundaries", "life"], abuse: ["sozo", "boundaries", "justice"], justice: ["love", "justice"], kingdom: ["kingdom", "realm", "parables"],
    evangelism: ["mission", "share"], share: ["share", "mission"], prophecy: ["receive", "gifts"], gifts: ["gifts"], faith: ["belief", "receive"], grace: ["lies", "compare"], identity: ["identity", "doxa"],
    shame: ["identity", "doxa", "forgive"], guilt: ["sorry", "forgive", "saviour"], adam: ["newcreation", "big"], eve: ["woman"], glory: ["doxa"], union: ["theme.union-sonship", "embrace"], joy: ["ecstasy"], healing: ["healing", "identity"]
  };
  var STOP = { the: 1, a: 1, an: 1, is: 1, are: 1, of: 1, to: 1, and: 1, in: 1, on: 1, do: 1, does: 1, i: 1, my: 1, me: 1, what: 1, why: 1, how: 1, who: 1, about: 1, god: 1, bible: 1, it: 1, for: 1, with: 1, can: 1, will: 1, be: 1, that: 1, this: 1, was: 1, did: 1, if: 1, or: 1, at: 1 };
  function answer(q) {
    var words = q.toLowerCase().replace(/[^a-z0-9஀-௿\s'-]/g, " ").split(/\s+/).filter(function (w) { return w.length > 1 && !STOP[w]; });
    var score = {};
    function add(h, n) { if (TITLE[h]) score[h] = (score[h] || 0) + n; }
    words.forEach(function (w) {
      var stem = w.replace(/(ing|ed|es|s)$/, "");
      Object.keys(SYN).forEach(function (k) { if (k === w || k === stem) SYN[k].forEach(function (h, i) { add(h, 6 - i); }); });
      Object.keys(TITLE).forEach(function (h) {
        var t = (TITLE[h] || "").toLowerCase(), d = (DESC[h] || "").toLowerCase();
        if (t.indexOf(stem) > -1) add(h, 4); else if (d.indexOf(stem) > -1) add(h, 1.5);
      });
    });
    return Object.keys(score).sort(function (a, b) { return score[b] - score[a]; }).slice(0, 4);
  }

  /* ---------- markup helpers ---------- */
  function studyCard(h, i) {
    var r = room(roomOf(h)) || MORE;
    return '<a class="rm-card' + (seen[h] ? " seen" : "") + '" href="#' + esc(h) + '" style="--c:' + col(r) + (i != null ? ";--i:" + i : "") + '"><span class="rm-card-k">' + esc(r.name) + (seen[h] ? ' <i class="rm-tick" aria-label="Explored">' + ic('<path d="m5 12 5 5 9-10"/>') + "</i>" : "") + "</span><b>" + esc(title(h)) + "</b>" + (DESC[h] ? "<small>" + esc(DESC[h]) + "</small>" : "") + "</a>";
  }
  function flow(nodes, kind) {
    return '<div class="rm-flow ' + (kind || "") + '" data-flow><svg class="rm-flow-svg" aria-hidden="true"><path class="rm-flow-p"/><path class="rm-flow-lit"/><circle class="rm-flow-dot" r="6"/></svg><ol class="rm-flow-list">' +
      nodes.map(function (n, i) { return '<li style="--i:' + i + '"><button type="button" class="rm-node' + (n.on ? " on" : "") + (n.seen ? " seen" : "") + '" data-node="' + i + '"' + (n.href ? ' data-href="' + esc(n.href) + '"' : "") + '><span class="rm-node-n">' + (n.seen ? ic('<path d="m5 12 5 5 9-10"/>') : i + 1) + "</span><span class=\"rm-node-t\">" + esc(n.t) + (n.r ? "<small>" + esc(n.r) + "</small>" : "") + "</span></button></li>"; }).join("") + "</ol></div>";
  }
  function topicTile(r, i, on) {
    var p = prog(r);
    return '<button type="button" class="rm-tile t-' + r.id + '" data-topic="' + r.id + '" aria-pressed="' + !!on + '" style="--c:' + col(r) + ";--i:" + i + '"><span class="rm-tile-sc">' + scene(r.scene) + '</span><span class="rm-tile-tx"><b>' + esc(r.name) + '</b><span class="rm-meter"><i style="width:' + Math.round(p.p * 100) + '%"></i></span><span class="rm-tile-n">' + p.s + " of " + p.n + " explored</span></span></button>";
  }
  function topicMap(id) {
    var r = room(id); if (!r) return "";
    var list = r.items.filter(function (h) { return TITLE[h]; }), p = prog(r), next = list.filter(function (h) { return !seen[h]; })[0] || list[0];
    return '<div class="rm-topic" style="--c:' + col(r) + '"><div class="rm-topic-h"><div class="rm-topic-sc">' + scene(r.scene) + '</div><div><h3>' + esc(r.name) + '</h3><p>' + esc(r.tag) + '</p><div class="rm-prog">' + ring(p.p, 40) + "<span><b>" + p.s + " of " + p.n + "</b> explored</span>" + (next ? '<a class="btn sm" href="#' + esc(next) + '">' + (p.s ? "Continue: " : "Start: ") + esc(title(next)) + "</a>" : "") + "</div></div></div>" +
      flow(list.map(function (h) { return { t: title(h), href: "#" + h, seen: !!seen[h], on: h === next }; }), "room") +
      '<div class="rm-cards">' + list.map(function (h, i) { return studyCard(h, i); }).join("") + "</div></div>";
  }
  function greet() { var h = new Date().getHours(); return h < 5 ? "Peace to you tonight" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; }
  function verseToday() {
    var V = [];
    ((window.RG || {}).themes || []).forEach(function (t) { (t.keyVerses || []).forEach(function (v) { if (v && v.text && v.text.length < 260) V.push({ v: v, t: t }); }); });
    if (!V.length) return "";
    var d = new Date(), n = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5), x = V[n % V.length];
    return '<div class="rm-vt"><div class="label">Verse for today</div><blockquote>' + esc(x.v.text) + '</blockquote><div class="rm-vt-f"><span class="ref">' + esc(x.v.ref) + '</span><a href="#theme.' + esc(x.t.id) + '">Read the theme: ' + esc(x.t.title) + "</a></div></div>";
  }
  function hero() {
    // a large animated picture of union: Father, Son and Spirit in a dance, with humanity drawn into the centre
    return '<svg class="rm-hero-art" viewBox="0 0 400 360" role="img" aria-label="Father, Son and Spirit in a circling dance, with humanity drawn into the centre">' +
      '<circle cx="200" cy="180" r="168" fill="none" stroke="var(--line)" stroke-dasharray="3 7" class="sc-orbit slow"/>' +
      '<circle cx="200" cy="180" r="120" fill="var(--gold-soft)" class="sc-pulse"/>' +
      '<g class="sc-orbit"><circle cx="200" cy="112" r="66" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="2.5"/><circle cx="141" cy="214" r="66" fill="var(--wine-soft)" stroke="var(--wine)" stroke-width="2.5"/><circle cx="259" cy="214" r="66" fill="var(--dawn-soft)" stroke="var(--dawn)" stroke-width="2.5"/>' +
      '<text x="200" y="84" text-anchor="middle" class="rm-art-t">Father</text><text x="112" y="244" text-anchor="middle" class="rm-art-t">Son</text><text x="288" y="244" text-anchor="middle" class="rm-art-t">Spirit</text></g>' +
      '<path class="rm-art-in" d="M20 340 C80 300 140 260 200 182" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="6 8" pathLength="1"/>' +
      '<circle cx="200" cy="182" r="13" fill="var(--accent)" class="sc-beat"/><circle cx="200" cy="182" r="13" fill="none" stroke="var(--accent)" class="sc-wave"/>' +
      '<text x="200" y="217" text-anchor="middle" class="rm-art-t us">us</text></svg>';
  }

  /* ---------- views ---------- */
  function vHome() {
    var s = streak(), ex = Object.keys(seen).filter(function (h) { return TITLE[h]; }).length, tot = Object.keys(TITLE).length;
    var cont = hist.filter(function (h) { return TITLE[h]; }).slice(0, 3);
    var ck = get("rga.r.check", null); if (ck && ck.d !== today()) ck = null;
    var tp = get("rga.r.topic", "revelation"), tps = allRooms().filter(function (r) { return r.id !== "you"; });
    if (!room(tp)) tp = tps[0].id;
    return '<div class="rm-page" data-rm="home">' +
      '<section class="rm-hero"><div class="rm-hero-tx"><div class="rm-greet"><span>' + greet() + "</span>" + (s ? '<span class="rm-chip">' + s + "-day streak</span>" : "") + (ex ? '<span class="rm-chip">' + ex + " of " + tot + " explored</span>" : "") + "</div>" +
      "<h1>See God the way Jesus shows him</h1>" +
      '<p class="lede">Studies, animated diagrams and honest questions on the relational gospel: a Father who was never against you, a Son who joined humanity, and a Spirit who draws you into their life.</p>' +
      '<blockquote class="rm-quote">“No one has seen God at any time. The one and only Son, who is in the bosom of the Father, he has declared him.”<span class="ref">John 1:18 · WEB</span></blockquote>' +
      '<div class="row"><a class="btn" href="#rm-story" data-jump>Walk through the story</a><a class="btn ghost" href="#atlas">Open the atlas map</a><button class="btn ghost" type="button" data-guide>Ask the guide</button></div></div>' +
      '<div class="rm-hero-fig">' + hero() + "</div></section>" +
      '<section class="section rm-check"><h2>How is your heart today?</h2><p class="note">Pick one and we will suggest where to start.</p><div class="chips" role="group" aria-label="How you feel">' +
      CHECK.map(function (c) { return '<button type="button" class="chip" data-check="' + c.k + '" aria-pressed="' + (!!ck && ck.k === c.k) + '">' + c.t + "</button>"; }).join("") + '</div><div id="rm-check-out" aria-live="polite">' + (ck ? checkOut(ck.k) : "") + "</div></section>" +
      (cont.length ? '<section class="section"><h2>Pick up where you left off</h2><div class="rm-cards">' + cont.map(function (h, i) { return studyCard(h, i); }).join("") + "</div></section>" : "") +
      '<section class="section" id="rm-story"><h2>The whole story in one flow</h2><p class="note">Eight movements from Eden to all things made new. Tap a step to read it and open the study behind it.</p>' +
      flow(FLOW.map(function (f) { return { t: f.t, r: f.r }; }), "story") + '<div class="rm-flow-out" id="rm-story-out">' + storyOut(0) + "</div></section>" +
      '<section class="section"><h2>Explore by topic</h2><p class="note">Choose a topic to see its studies as a path. The bars show how much you have explored.</p><div class="rm-plan" role="group" aria-label="Topics">' + tps.map(function (r, i) { return topicTile(r, i, r.id === tp); }).join("") + '</div><div id="rm-topic-out" aria-live="polite">' + topicMap(tp) + "</div></section>" +
      '<section class="section rm-duo">' + verseToday() + '<form class="rm-askcard" data-askform><div class="label">The guide</div><h3>Ask anything</h3><p class="note">“Is God angry with me?” “What about hell?” “Why did Jesus die?” The guide points you to the studies that answer it.</p><label class="field">' + ic('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>') + '<input id="rm-ask-home" type="text" placeholder="Type a question" autocomplete="off"></label><button class="btn" type="submit">Ask</button></form></section>' +
      "</div>";
  }
  function checkOut(k) {
    var c = CHECK.filter(function (x) { return x.k === k; })[0]; if (!c) return "";
    return '<div class="rm-check-out"><p>' + esc(c.m) + '</p><div class="rm-cards">' + c.go.filter(function (h) { return TITLE[h]; }).map(function (h, i) { return studyCard(h, i); }).join("") + "</div></div>";
  }
  function storyOut(i) {
    var f = FLOW[i]; if (!f) return "";
    return '<div class="rm-step-card"><span class="rm-step-n">' + (i + 1) + ' of 8</span><h3>' + esc(f.t) + '</h3><p>' + esc(f.d) + '</p><div class="row"><span class="ref">' + esc(f.r) + "</span>" + (TITLE[f.go] ? '<a class="btn sm" href="#' + esc(f.go) + '">Open: ' + esc(title(f.go)) + "</a>" : "") + "</div></div>";
  }
  function vYou() {
    var ex = Object.keys(seen).filter(function (h) { return TITLE[h]; }).length, tot = Object.keys(TITLE).length, hl = get("rga.sk.hl", []), sv = get("rga.saved", []);
    var started = allRooms().filter(function (r) { return r.id !== "you" && prog(r).s; }).length, note = get("rga.r.j.notes", "");
    return '<div class="rm-page" data-rm="you" style="--c:var(--gold)"><section class="rm-banner"><div class="rm-banner-sc">' + scene("lamp") + '</div><div class="rm-banner-tx"><div class="label">Your study</div><h1>Your study</h1><p class="lede">Your progress, highlights, saved studies and notes. Everything here is kept in this browser only.</p></div></section>' +
      '<section class="rm-stats">' + [[ex, "of " + tot + " studies explored"], [started, "topics started"], [streak(), "day streak"], [hl.length, "highlights"], [sv.length, "saved items"]].map(function (s) { return '<div><b class="rm-num">' + s[0] + "</b><span>" + s[1] + "</span></div>"; }).join("") + "</section>" +
      '<section class="section"><h2>Progress by topic</h2><div class="rm-bars">' + allRooms().filter(function (r) { return r.id !== "you"; }).map(function (r) { var p = prog(r); return '<button type="button" data-gotopic="' + r.id + '" style="--c:' + col(r) + '"><span>' + esc(r.name) + '</span><span class="rm-meter"><i style="width:' + Math.round(p.p * 100) + '%"></i></span><b>' + p.s + "/" + p.n + "</b></button>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Your shelf</h2><div class="row"><a class="btn" href="#saved">Open saved studies</a><button class="btn ghost" type="button" data-openhl>Open highlights (' + hl.length + ")</button></div></section>" +
      (hist.length ? '<section class="section"><h2>Recently explored</h2><div class="rm-cards">' + hist.filter(function (h) { return TITLE[h]; }).slice(0, 6).map(function (h, i) { return studyCard(h, i); }).join("") + "</div></section>" : "") +
      '<section class="section rm-reflect"><h2>Notes</h2><p class="rm-prompt">What is God showing you? Write questions, prayers or anything you want to remember.</p><textarea id="rm-j-notes" data-journal="rga.r.j.notes" placeholder="Only you can see this; it stays in this browser.">' + esc(note) + '</textarea><span class="note" data-jstate>' + (note ? "Saved in this browser" : "") + "</span></section></div>";
  }

  /* ---------- binding after each render ---------- */
  function layoutFlow(box) {
    var svg = $(".rm-flow-svg", box), list = $(".rm-flow-list", box), nodes = $$(".rm-node", box); if (!svg || !nodes.length) return;
    // serpentine: left to right, then right to left on the next row
    var cols = parseInt(getComputedStyle(box).getPropertyValue("--cols"), 10) || 4;
    $$(":scope > li", list).forEach(function (li, i) { var row = Math.floor(i / cols), c = i % cols; li.style.gridRow = row + 1; li.style.gridColumn = row % 2 ? cols - c : c + 1; });
    var b = box.getBoundingClientRect(), pts = nodes.map(function (n) { var r = n.getBoundingClientRect(); var dot = $(".rm-node-n", n).getBoundingClientRect(); return [dot.left + dot.width / 2 - b.left, dot.top + dot.height / 2 - b.top]; });
    svg.setAttribute("viewBox", "0 0 " + b.width + " " + b.height); svg.setAttribute("width", b.width); svg.setAttribute("height", b.height);
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], c = pts[i];
      if (Math.abs(a[1] - c[1]) < 8) d += " L" + c[0].toFixed(1) + " " + c[1].toFixed(1);
      else { var my = (a[1] + c[1]) / 2; d += " C" + a[0].toFixed(1) + " " + my.toFixed(1) + " " + c[0].toFixed(1) + " " + my.toFixed(1) + " " + c[0].toFixed(1) + " " + c[1].toFixed(1); }
    }
    $(".rm-flow-p", svg).setAttribute("d", d);
    var lit = $(".rm-flow-lit", svg); lit.setAttribute("d", d);
    var on = nodes.map(function (n) { return n.classList.contains("on"); }).indexOf(true);
    var L = $(".rm-flow-p", svg).getTotalLength ? $(".rm-flow-p", svg).getTotalLength() : 0;
    lit.style.strokeDasharray = L; lit.style.strokeDashoffset = L;
    var upto = on > -1 ? on : box.classList.contains("room") ? Math.max(0, nodes.filter(function (n) { return n.classList.contains("seen"); }).length - 1) : nodes.length - 1;
    var frac = nodes.length > 1 ? upto / (nodes.length - 1) : 1;
    requestAnimationFrame(function () { lit.style.transition = reduced ? "none" : "stroke-dashoffset 2.2s cubic-bezier(.3,.7,.2,1)"; lit.style.strokeDashoffset = (L * (1 - frac)).toFixed(1); });
    var dot = $(".rm-flow-dot", svg), old = $("animateMotion", dot); if (old) old.remove();
    if (!reduced && L) { var am = doc.createElementNS("http://www.w3.org/2000/svg", "animateMotion"); am.setAttribute("dur", Math.max(6, nodes.length * 1.4) + "s"); am.setAttribute("repeatCount", "indefinite"); am.setAttribute("path", d); dot.appendChild(am); try { am.beginElement(); } catch (e) { /* SMIL not ready */ } }
    else { dot.setAttribute("cx", pts[0][0]); dot.setAttribute("cy", pts[0][1]); }
  }
  var flowRO = null;
  function bind() {
    var page = $("#main .rm-page"); if (!page) return;
    $$("[data-flow]", page).forEach(function (f) { layoutFlow(f); });
    if (window.ResizeObserver) { if (flowRO) flowRO.disconnect(); flowRO = new ResizeObserver(function () { $$("[data-flow]", page).forEach(layoutFlow); }); $$("[data-flow]", page).forEach(function (f) { flowRO.observe(f); }); }
    if (page.dataset.rm === "home") { var st = $('.rm-flow.story .rm-node[data-node="0"]', page); if (st) st.classList.add("on"); }
  }
  doc.addEventListener("click", function (e) {
    var t = e.target;
    var ck = t.closest && t.closest("[data-check]");
    if (ck) { $$("[data-check]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === ck)); }); put("rga.r.check", { k: ck.dataset.check, d: today() }); $("#rm-check-out").innerHTML = checkOut(ck.dataset.check); return; }
    var nd = t.closest && t.closest(".rm-node");
    if (nd) {
      if (nd.dataset.href) { location.hash = nd.dataset.href.slice(1); return; }
      var box = nd.closest(".rm-flow"); $$(".rm-node", box).forEach(function (n) { n.classList.toggle("on", n === nd); });
      var out = $("#rm-story-out"); if (out) { out.innerHTML = storyOut(+nd.dataset.node); }
      layoutFlow(box); return;
    }
    var tp = t.closest && t.closest("[data-topic]");
    if (tp) { put("rga.r.topic", tp.dataset.topic); $$("[data-topic]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === tp)); }); var o = $("#rm-topic-out"); o.innerHTML = topicMap(tp.dataset.topic); $$("[data-flow]", o).forEach(layoutFlow); if (flowRO) $$("[data-flow]", o).forEach(function (f) { flowRO.observe(f); }); return; }
    var gt = t.closest && t.closest("[data-gotopic]");
    if (gt) { put("rga.r.topic", gt.dataset.gotopic); location.hash = "home"; setTimeout(function () { var o = $("#rm-topic-out"); if (o) o.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }, 350); return; }
    var jp = t.closest && t.closest("[data-jump]");
    if (jp) { e.preventDefault(); var tg = $(jp.getAttribute("href")); if (tg) tg.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    if (t.closest && t.closest("[data-guide]")) { openGuide(""); return; }
    if (t.closest && t.closest("[data-openhl]")) { var hb = $(".sk-hlbtn"); if (hb) hb.click(); return; }
  });
  doc.addEventListener("submit", function (e) {
    var f = e.target.closest && e.target.closest("[data-askform]"); if (!f) return;
    e.preventDefault(); var q = $("input", f).value.trim(); openGuide(q);
  });
  var jT = 0;
  doc.addEventListener("input", function (e) {
    var ta = e.target; if (!ta.dataset || !ta.dataset.journal) return;
    clearTimeout(jT); var st = ta.parentNode.querySelector("[data-jstate]"); if (st) st.textContent = "Saving…";
    jT = setTimeout(function () { put(ta.dataset.journal, ta.value); if (st) st.textContent = ta.value ? "Saved in this browser" : ""; }, 400);
  });

  /* ---------- the guide (chat) ---------- */
  var SUGGEST = ["Is God angry with me?", "What about hell?", "Why did Jesus have to die?", "Why is the Old Testament so violent?", "How do I forgive someone?", "Does God cause suffering?"];
  function guideMsg(html, who) { var log = $("#rm-log"); if (!log) return; var m = doc.createElement("div"); m.className = "rm-msg " + (who || "bot"); m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; m.scrollIntoView({ block: "end" }); }
  function reply(q) {
    guideMsg(esc(q), "me");
    var typing = doc.createElement("div"); typing.className = "rm-msg bot typing"; typing.innerHTML = "<i></i><i></i><i></i>"; $("#rm-log").appendChild(typing);
    setTimeout(function () {
      typing.remove();
      var hits = answer(q);
      if (hits.length) guideMsg("<p>Here are the studies that speak to that:</p><div class=\"rm-cards mini\">" + hits.map(function (h) { return studyCard(h).replace('<a class="rm-card', '<a data-close class="rm-card'); }).join("") + '</div><button type="button" class="chip" data-gsearch="' + esc(q) + '">Search every word for “' + esc(q.length > 30 ? q.slice(0, 30) + "…" : q) + "”</button>");
      else guideMsg('<p>I could not match that to a study. Try a single word like <em>hell</em>, <em>Law</em> or <em>healing</em>, or search every word in the atlas.</p><button type="button" class="chip" data-gsearch="' + esc(q) + '">Search the atlas</button>');
    }, reduced ? 50 : 650);
  }
  function openGuide(q) {
    var layer = $("#layer");
    layer.innerHTML = '<div class="scrim" data-close></div><aside class="sheet rm-guide" role="dialog" aria-modal="true" aria-label="Ask the guide" tabindex="-1"><div class="sheet-head"><div class="rm-guide-id"><span class="rm-guide-av">' + scene("door").replace('class="rs rs-door"', 'class="rs rs-door mini"') + '</span><div><div class="label">The guide</div><h2>Ask anything</h2></div></div><button class="save" type="button" data-close aria-label="Close">' + ic('<path d="M6 6l12 12M18 6 6 18"/>') + '</button></div>' +
      '<div class="rm-log" id="rm-log" aria-live="polite"></div><form class="rm-ask" data-guideform><label class="field"><input id="rm-ask" type="text" placeholder="Ask about God or the Bible" autocomplete="off" aria-label="Your question"></label><button class="btn" type="submit" aria-label="Send">' + ic('<path d="M5 12h14M13 6l6 6-6 6"/>') + "</button></form></aside>";
    guideMsg("<p>Peace to you. Ask me anything about God or the Bible, and I will point you to the studies that answer it.</p><div class=\"chips\">" + SUGGEST.map(function (s) { return '<button type="button" class="chip" data-gq="' + esc(s) + '">' + esc(s) + "</button>"; }).join("") + "</div>");
    var inp = $("#rm-ask"); if (q) reply(q); else if (inp && matchMedia("(pointer: fine)").matches) inp.focus();
  }
  doc.addEventListener("submit", function (e) {
    var f = e.target.closest && e.target.closest("[data-guideform]"); if (!f) return;
    e.preventDefault(); var inp = $("#rm-ask"), q = inp.value.trim(); if (!q) return; inp.value = ""; reply(q);
  });
  doc.addEventListener("click", function (e) {
    var g = e.target.closest && e.target.closest("[data-gq]"); if (g) { reply(g.dataset.gq); return; }
    var s = e.target.closest && e.target.closest("[data-gsearch]");
    if (s) { var q = s.dataset.gsearch; $("#layer").innerHTML = ""; var o = $("#open-search"); if (o) o.click(); setTimeout(function () { var i = $("#sq"); if (i) { i.value = q.replace(/[?!.,]/g, ""); i.dispatchEvent(new Event("input", { bubbles: true })); } }, 60); }
  });

  /* ---------- dock (phones and tablets) ---------- */
  function dock() {
    if ($(".rm-dock")) return;
    var d = doc.createElement("nav"); d.className = "rm-dock"; d.setAttribute("aria-label", "Main");
    d.innerHTML = '<a href="#home" data-d="home">' + ic('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>') + "<span>Home</span></a>" +
      '<button type="button" data-dbrowse>' + ic('<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/>') + "<span>Browse</span></button>" +
      '<button type="button" class="rm-dock-ask" data-guide aria-label="Ask the guide">' + ic('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>') + "<span>Ask</span></button>" +
      '<button type="button" data-dsearch>' + ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>') + "<span>Search</span></button>" +
      '<a href="#you" data-d="you">' + ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>') + "<span>You</span></a>";
    doc.body.appendChild(d);
    d.addEventListener("click", function (e) { if (e.target.closest("[data-dsearch]")) { var o = $("#open-search"); if (o) o.click(); } if (e.target.closest("[data-dbrowse]")) { var m = $("#open-menu"); if (m) m.click(); } });
    mark();
  }
  function mark() {
    var h = curHash() || "home";
    $$(".rm-dock [data-d]").forEach(function (a) { if (a.dataset.d === h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }

  /* ---------- register with the app ---------- */
  var tries = 0;
  function boot() {
    var V = window.RGV;
    if (!V || !window.RGrender) { if (tries++ < 400) return setTimeout(boot, 25); return; }
    loadMeta();
    V.home = vHome; V.you = vYou;
    var main = $("#main");
    if (window.MutationObserver) new MutationObserver(function (recs) {
      if (!recs.some(function (r) { return Array.prototype.some.call(r.addedNodes, function (n) { return n.classList && n.classList.contains("plate"); }); })) return;
      track(curHash()); mark(); setTimeout(bind, 30);
    }).observe(main, { childList: true });
    dock();
    var h = curHash();
    if (!h || isMine(h)) window.RGrender(); else { track(h); mark(); }
  }
  window.RGTopics = { ROOMS: ROOMS, room: room, roomOf: roomOf, all: allRooms, title: title, prog: prog, ring: ring, scene: scene, col: col, isMine: isMine, openGuide: openGuide };
  boot();
})();
