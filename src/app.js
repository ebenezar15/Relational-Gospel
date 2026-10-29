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
    principle: { key: "hermeneutics", view: "read", title: function (x) { return x.principle; }, sub: function () { return "Reading principle"; }, label: "How to read" },
    voice: { key: "voices", view: "voices", title: function (x) { return x.name; }, sub: function (x) { return x.years + " · " + x.tradition; }, label: "Voice" },
    model: { key: "models", view: "models", title: function (x) { return x.name; }, sub: function (x) { return FAMILY[x.family] || x.family; }, label: "Framework" },
    age: { key: "ages", view: "story", title: function (x) { return x.stage; }, sub: function (x) { return x.era + " · " + x.ref; }, label: "How God met us" },
    revealed: { key: "revealed", view: "story", title: function (x) { return x.title; }, sub: function (x) { return x.ref; }, label: "Fully revealed" },
    apostle: { key: "apostles", view: "apostles", title: function (x) { return x.name; }, sub: function (x) { return x.writings; }, label: "Apostle" },
    act: { key: "trinityActs", view: "trinity", title: function (x) { return x.moment; }, sub: function (x) { return x.ref; }, label: "The Trinity at work" },
    lovePassage: { key: "lovePassages", view: "love", title: function (x) { return x.ref; }, sub: function (x) { return x.testament === "OT" ? "Old Testament" : "New Testament"; }, label: "Justice passage" },
    loveObj: { key: "loveObjections", view: "love", title: function (x) { return strip(x.q); }, sub: function () { return "Objection answered"; }, label: "Love & justice" },
    loveWord: { key: "justiceWords", view: "love", title: function (x) { return x.word + " · " + x.translit; }, sub: function (x) { return x.lang + " · " + x.original; }, label: "Word study" },
    loveVoice: { key: "loveVoices", view: "love", title: function (x) { return x.name; }, sub: function (x) { return x.source; }, label: "Voice on love & justice" },
    ncq: { key: "ncQuestions", view: "newcreation", title: function (x) { return x.q; }, sub: function (x) { return NCG[x.group] || x.group; }, label: "New creation study" },
    ncterm: { key: "ncTerms", view: "newcreation", title: function (x) { return x.term + " · " + x.translit; }, sub: function (x) { return x.original; }, label: "Key term" },
    cmp: { key: "compare", view: "compare", title: function (x) { return x.topic; }, sub: function (x) { return x.group; }, label: "Legal vs relational" },
    mconcept: { key: "embConcepts", view: "embodied", title: function (x) { return x.term; }, sub: function (x) { return x.group; }, label: "Embodied gospel · concept" },
    msermon: { key: "embStudies", view: "embodied", title: function (x) { return x.title; }, sub: function (x) { return x.theme; }, label: "Embodied gospel · study" },
    kconcept: { key: "kingConcepts", view: "kingdom", title: function (x) { return x.term; }, sub: function (x) { return x.group; }, label: "Ekklesia & kingdom" },
    kpractice: { key: "kingPractice", view: "kingdom", title: function (x) { return x.title; }, sub: function () { return "What we do"; }, label: "Kingdom practice" },
    kview: { key: "kingViews", view: "kingdom", title: function (x) { return x.name; }, sub: function () { return "View of the end"; }, label: "Eschatology" },
    ldesign: { key: "lifeDesign", view: "life", title: function (x) { return x.feature; }, sub: function () { return "Human design"; }, label: "Designed to live" },
    ltrait: { key: "lifeTraits", view: "life", title: function (x) { return x.trait; }, sub: function () { return "A trait of Jesus"; }, label: "The way of Jesus" },
    lsit: { key: "lifeSituations", view: "life", title: function (x) { return x.situation; }, sub: function () { return "How Jesus handled it"; }, label: "The way of Jesus" },
    shist: { key: "shareHistory", view: "share", title: function (x) { return x.group; }, sub: function (x) { return x.years + " · " + x.era; }, label: "Gospel through history" },
    ssermon: { key: "shareSermons", view: "share", title: function (x) { return x.speaker + ", " + x.ref; }, sub: function (x) { return x.audience; }, label: "Sermon in Acts" },
    sjesus: { key: "shareJesus", view: "share", title: function (x) { return x.person; }, sub: function (x) { return x.ref; }, label: "How Jesus shared" },
    saccuse: { key: "shareAccusations", view: "share", title: function (x) { return x.accusation; }, sub: function () { return "Accusation answered"; }, label: "Sharing the gospel" },
    wdesign: { key: "whyDesign", view: "why", title: function (x) { return x.area; }, sub: function (x) { return x.group; }, label: "The why of design" },
    wcf: { key: "whyCounterfeits", view: "why", title: function (x) { return x.design + " → " + x.counterfeit; }, sub: function () { return "Counterfeit"; }, label: "The why of design" },
    wq: { key: "whyQuestions", view: "why", title: function (x) { return x.q; }, sub: function () { return "Hard question"; }, label: "The why of design" },
    bq: { key: "bigAllQA", view: "big", title: function (x) { return x.q; }, sub: function () { return "Big question"; }, label: "Big questions" },
    bterm: { key: "bigGlossary", view: "big", title: function (x) { return x.term; }, sub: function (x) { return x.group; }, label: "Two gospels glossary" },
    bacc: { key: "bigAccept", view: "big", title: function (x) { return x.situation; }, sub: function () { return "Accept the person"; }, label: "Accepting people" },
    fq: { key: "fgAllQA", view: "forgive", title: function (x) { return x.q; }, sub: function () { return "Forgiveness & repair"; }, label: "Forgiveness & repair" },
    wq2: { key: "worAllQA", view: "worship", title: function (x) { return x.q; }, sub: function () { return "Worship in Spirit & truth"; }, label: "Worship in Spirit & truth" },
    wword: { key: "worWords", view: "worship", title: function (x) { return x.word + " · " + x.translit; }, sub: function (x) { return x.posture; }, label: "Worship word" },
    lq: { key: "lvAllQA", view: "living", title: function (x) { return x.q; }, sub: function () { return "Living it out"; }, label: "Living it out" },
    lval: { key: "lvValues", view: "living", title: function (x) { return x.value; }, sub: function () { return "Moral value"; }, label: "Living it out" },
    lman: { key: "lvManners", view: "living", title: function (x) { return x.manner; }, sub: function () { return "Manners"; }, label: "Living it out" },
    pq: { key: "paAllQA", view: "paths", title: function (x) { return x.q; }, sub: function () { return "Ancient paths & encounters"; }, label: "Ancient paths" },
    penc: { key: "paEncounters", view: "paths", title: function (x) { return x.who; }, sub: function (x) { return x.when + " · " + x.kind; }, label: "Encounter" },
    pprac: { key: "paPractices", view: "paths", title: function (x) { return x.name; }, sub: function (x) { return x.era + " · " + x.category; }, label: "Spiritual practice" },
    pobj: { key: "paObjections", view: "paths", title: function (x) { return x.objection; }, sub: function () { return "Objection answered"; }, label: "Ancient paths" },
    pword: { key: "paWords", view: "paths", title: function (x) { return x.word + " · " + x.translit; }, sub: function (x) { return x.gloss; }, label: "Word for encounter" },
    iq: { key: "idAllQA", view: "identity", title: function (x) { return x.q; }, sub: function () { return "Identity & heart healing"; }, label: "Identity & healing" },
    iic: { key: "idInChrist", view: "identity", title: function (x) { return x.phrase; }, sub: function (x) { return x.ref + " · " + x.category; }, label: "In Christ" },
    ilie: { key: "idLies", view: "identity", title: function (x) { return x.lie; }, sub: function () { return "Lie and truth"; }, label: "Identity & healing" },
    iapp: { key: "idApproaches", view: "identity", title: function (x) { return x.name; }, sub: function (x) { return x.origin; }, label: "Heart-healing approach" },
    iwof: { key: "idWof", view: "identity", title: function (x) { return x.teaching; }, sub: function () { return "Word of Faith"; }, label: "Word of Faith" },
    sq: { key: "svAllQA", view: "saviour", title: function (x) { return x.q; }, sub: function () { return "Why a Saviour?"; }, label: "Why a Saviour?" },
    sfrom: { key: "svFrom", view: "saviour", title: function (x) { return "Saved from: " + x.from; }, sub: function () { return "Why a Saviour?"; }, label: "Saved from" },
    sppl: { key: "svPeople", view: "saviour", title: function (x) { return x.who; }, sub: function () { return "A good person"; }, label: "Why a Saviour?" },
    snot: { key: "svNots", view: "saviour", title: function (x) { return x.not; }, sub: function () { return "An “I am not”"; }, label: "Why a Saviour?" },
    sobj: { key: "svObjections", view: "saviour", title: function (x) { return x.objection; }, sub: function () { return "Objection answered"; }, label: "Why a Saviour?" },
    safter: { key: "svAfter", view: "saviour", title: function (x) { return x.area; }, sub: function () { return "After saying yes"; }, label: "Why a Saviour?" },
    rq: { key: "rbQA", view: "reborn", title: function (x) { return x.q; }, sub: function () { return "Born again"; }, label: "Born again" },
    rview: { key: "rbViews", view: "reborn", title: function (x) { return x.tradition; }, sub: function () { return "View of new birth"; }, label: "Born again" },
    dq: { key: "dsQA", view: "design", title: function (x) { return x.q; }, sub: function () { return "Made for each other"; }, label: "Made for each other" },
    drel: { key: "dsDesign", view: "design", title: function (x) { return x.rel; }, sub: function () { return "Relationship design"; }, label: "Made for each other" },
    dex: { key: "dsExamples", view: "design", title: function (x) { return x.who; }, sub: function (x) { return x.kind + " · " + x.relation; }, label: "Bible relationship" },
    dcor: { key: "dsCorrupt", view: "design", title: function (x) { return x.label; }, sub: function () { return "Counterfeit"; }, label: "Made for each other" },
    skc: { key: "svKrugerCrit", view: "saviour", title: function (x) { return x.criticism; }, sub: function () { return "Criticism of Kruger"; }, label: "Why a Saviour?" },
    wq1: { key: "wyQA1", view: "ways", title: function (x) { return x.q; }, sub: function () { return "How God works"; }, label: "How God works" },
    wq3: { key: "wyQA2", view: "ways", title: function (x) { return x.q; }, sub: function () { return "How God works"; }, label: "How God works" },
    wchar: { key: "wyChar", view: "ways", title: function (x) { return "God is " + x.trait.toLowerCase(); }, sub: function () { return "Seen in Jesus"; }, label: "God’s character" },
    wcase: { key: "wyCases", view: "ways", title: function (x) { return x.title; }, sub: function () { return "Case study"; }, label: "How God works" },
    wprov: { key: "wyProvidence", view: "ways", title: function (x) { return x.label; }, sub: function () { return "View of providence"; }, label: "How God works" },
    blwq: { key: "blWasteQA", view: "blood", title: function (x) { return x.q; }, sub: function () { return "The life is in the blood"; }, label: "The life is in the blood" },
    wmq: { key: "wmQA", view: "woman", title: function (x) { return x.q; }, sub: function () { return "Man, woman & Genesis"; }, label: "Man, woman & Genesis" },
    wmw: { key: "wmWomen", view: "woman", title: function (x) { return x.name; }, sub: function (x) { return x.role + " · " + x.ref; }, label: "Women in Scripture" },
    jq1: { key: "jxQA1", view: "justice", title: function (x) { return x.q; }, sub: function () { return "Harm, justice and revenge"; }, label: "Justice & conflict" },
    jq2: { key: "jxQA2", view: "justice", title: function (x) { return x.q; }, sub: function () { return "Call-out culture"; }, label: "Justice & conflict" },
    jq3: { key: "jxQA3", view: "justice", title: function (x) { return x.q; }, sub: function () { return "The legal gospel’s confusion"; }, label: "Justice & conflict" },
    bsq: { key: "bsQA", view: "blessing", title: function (x) { return x.q; }, sub: function () { return "Blessing & the spiritual life"; }, label: "Blessing & matter" },
    bsarg: { key: "bsArgs", view: "blessing", title: function (x) { return x.arg; }, sub: function () { return "Argument answered"; }, label: "Blessing & matter" },
    rcq: { key: "rcQA", view: "recover", title: function (x) { return x.q; }, sub: function () { return "Habits, healing & help"; }, label: "Habits & healing" },
    rccase: { key: "rcCases", view: "recover", title: function (x) { return x.title + ": three lenses"; }, sub: function () { return "Case study"; }, label: "Habits & healing" },
    jcase: { key: "jxCases", view: "justice", title: function (x) { return x.title; }, sub: function () { return "Case study"; }, label: "Justice & conflict" },
    blq: { key: "blQA", view: "blood", title: function (x) { return x.q; }, sub: function () { return "The life is in the blood"; }, label: "The life is in the blood" },
    blst: { key: "blStory", view: "blood", title: function (x) { return x.title; }, sub: function (x) { return x.ref; }, label: "Blood in Scripture" },
    dxpart: { key: "dxParts", view: "doxa", title: function (x) { return "Doxa, part " + x.n + ": " + x.title; }, sub: function () { return "Doxa: from glory to glory"; }, label: "Doxa" },
    dech: { key: "deChapters", view: "embrace", title: function (x) { return "Ch. " + x.n + ": " + x.title; }, sub: function () { return "The Divine Embrace"; }, label: "The Divine Embrace" },
    mmyth: { key: "mmMyths", view: "myths", title: function (x) { return x.myth; }, sub: function (x) { return x.kind + " #" + x.n + " · " + x.category; }, label: "Myths & mistranslations" },
    miss: { key: "misses", view: "religion", title: function (x) { return x.title; }, sub: function (x) { return (x.refs || []).join(" · "); }, label: "What religion misses" }
  };
  var NCG = { "old-self": "The old self", "new-creation": "New creation", "heart-and-mind": "Heart & mind", "born-again": "Born again", cosmic: "The cosmic gospel", adam: "Adam & the plan" };
  var FAMILY = { atonement: "Atonement", salvation: "Salvation", hell: "Judgement & hell", scripture: "Scripture", "end-times": "End times", "law-covenant": "Law & covenant" };
  var ERA = { early: "Early church", medieval: "Medieval", reformation: "Reformation", modern: "Modern", contemporary: "Contemporary" };
  function find(type, id) { var t = TYPES[type]; return t ? A(t.key).filter(function (x) { return x.id === id; })[0] : null; }

  /* ---------- navigation model ---------- */
  var VIEWS = [
    { group: "Begin", items: [["atlas", "The Atlas"], ["read", "How to read the Bible"], ["theme.bible-narratives", "Reading the Bible's story"], ["theme.undiluted-gospel", "The undiluted gospel"]] },
    { group: "The God Jesus reveals", items: [["story", "How God met humanity"], ["theme.perfect-theology", "Jesus, perfect theology"], ["love", "God is love: one nature"], ["apostles", "Did the apostles see it?"], ["lens", "Old & New Testament tensions"], ["journey", "How people misread God"], ["violence", "The violent passages"]] },
    { group: "Trinity & union", items: [["newcreation", "New creation & the old self"], ["compare", "Legal vs relational gospel"], ["trinity", "The Trinity at work"], ["theme.trinitarian-gospel", "The Trinitarian gospel"], ["theme.union-sonship", "Union & sonship"], ["theme.designed-for-connection", "Made for connection"], ["theme.church-now", "The church now"], ["worship", "Worship in Spirit & truth"], ["living", "Living it out"], ["justice", "Justice, conflict & call-outs"], ["paths", "Ancient paths & encounters"], ["identity", "Identity & heart healing"], ["recover", "Habits, healing & help"], ["blessing", "Blessing, matter & spiritual life"], ["facets", "The gospel’s facets & finished work"], ["covenant", "The Blessing & covenant"], ["sons", "Manifestation of the sons"], ["healing", "Divine healing"], ["name", "The name of the Lord"], ["deathless", "Deathless: the defeat of death"], ["trees", "Two trees: legal vs relational doctrine"], ["misuse", "“But it’s biblical”: Scripture misused"], ["sorry", "Sorry when you did nothing wrong?"], ["belief", "Does what you believe manifest?"], ["enforce", "From truth to reality: possessing the land"], ["receive", "Receiving promises & prophecy"], ["gifts", "Gifts without relationship?"], ["parables", "The kingdom of God & its parables"], ["mission", "Evangelism, mission & the kingdom"], ["tenses", "Penalty, power, presence? Three tenses of salvation"], ["saviour", "Why a Saviour?"], ["reborn", "Born again"], ["design", "Made for each other"], ["blood", "The life is in the blood"], ["woman", "Man, woman & Genesis"], ["ways", "How God works"], ["embrace", "The Divine Embrace"], ["doxa", "Doxa: from glory to glory"], ["kingdom", "Ekklesia & the Kingdom"], ["life", "Designed to live: love with a spine"], ["share", "Sharing the good news"], ["why", "The why of design"], ["big", "Big questions"], ["forgive", "Forgiveness & repair"]] },
    { group: "Law & culture", items: [["law", "Why God gave the Law"], ["culture", "Culture decoder"], ["sayings", "The words of Jesus"], ["myths", "Myths & mistranslations"]] },
    { group: "The great themes", items: [["themes", "All themes"]] },
    { group: "Voices & frameworks", items: [["voices", "Church fathers & teachers"], ["embodied", "The Embodied Gospel"], ["models", "Frameworks compared"]] },
    { group: "The conversation", items: [["religion", "What religion misses"], ["teachings", "What is taught"], ["debate", "Debates & strawmen"], ["saved", "Saved"]] }
  ];
  var PINNED = ["perfect-theology", "bible-narratives", "undiluted-gospel", "trinitarian-gospel", "union-sonship", "designed-for-connection", "church-now"];
  function railHTML() {
    var cur = route.view === "theme" ? "theme." + route.id : route.view;
    return VIEWS.map(function (g) {
      var items = g.items.slice();
      if (g.group === "The great themes") A("themes").forEach(function (t) { if (PINNED.indexOf(t.id) === -1) items.push(["theme." + t.id, t.title]); });
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
      "trinitarian-gospel": null, "trinity-restoration": null, "triune-dance": '<g class="spin"><circle cx="100" cy="62" r="26" ' + c + '/><circle cx="66" cy="122" r="26" ' + c + '/><circle cx="134" cy="122" r="26" ' + c + '/></g><circle cx="100" cy="102" r="7" fill="var(--dawn)"><animate attributeName="r" values="5;9;5" dur="4s" repeatCount="indefinite"/></circle>',
      "separation-union": '<circle cx="70" cy="100" r="34" ' + c + '><animate attributeName="cx" values="52;86;52" dur="7s" repeatCount="indefinite"/></circle><circle cx="130" cy="100" r="34" fill="none" stroke="var(--dawn)" stroke-width="1.2"><animate attributeName="cx" values="148;114;148" dur="7s" repeatCount="indefinite"/></circle>',
      "undoing-adam": '<path d="M30 150 Q100 40 170 150" ' + c + ' stroke-dasharray="4 5"/><circle r="6" fill="var(--wine)"><animateMotion dur="6s" repeatCount="indefinite" path="M30 150 Q100 40 170 150"/></circle><circle cx="170" cy="150" r="5" fill="var(--dawn)"/>',
      "across-all-worlds": [30, 55, 80].map(function (r, i) { return '<circle cx="100" cy="100" r="' + r + '" ' + c + ' opacity=".8"><animate attributeName="r" values="' + (r - 20) + ";" + (r + 10) + '" dur="5s" begin="' + i + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="5s" begin="' + i + 's" repeatCount="indefinite"/></circle>'; }).join("") + '<circle cx="100" cy="100" r="8" fill="' + g + '"/>',
      "resurrection": '<path d="M20 140 H180" ' + c + '/><circle cx="100" cy="140" r="34" fill="var(--gold-soft)" stroke="var(--gold)"><animate attributeName="cy" values="150;95;150" dur="8s" repeatCount="indefinite"/></circle>',
      "incarnation": '<circle cx="100" cy="128" r="44" fill="none" stroke="var(--dawn)" stroke-width="1.2"/><circle cx="100" r="7" fill="' + g + '"><animate attributeName="cy" values="20;128;20" dur="7s" repeatCount="indefinite"/></circle>',
      "sacred-biology": '<path d="M20 110 H70 L85 70 L100 150 L115 90 L125 110 H180" fill="none" stroke="var(--dawn)" stroke-width="2" stroke-dasharray="320" stroke-dashoffset="320"><animate attributeName="stroke-dashoffset" values="320;0;0" dur="3.5s" repeatCount="indefinite"/></path><circle cx="100" cy="100" r="72" ' + c + ' opacity=".5"/>',
      "designed-for-connection": [[100, 40], [160, 85], [140, 160], [60, 160], [40, 85]].map(function (p, i, arr) { return arr.slice(i + 1).map(function (q) { return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="var(--gold)" stroke-opacity=".4"/>'; }).join("") + '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" fill="var(--dawn)"><animate attributeName="r" values="5;9;5" dur="3s" begin="' + i * 0.6 + 's" repeatCount="indefinite"/></circle>'; }).join(""),
      "mystical-union": '<circle cx="100" cy="100" r="60" fill="var(--gold-soft)"><animate attributeName="r" values="40;80;40" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.3;1" dur="6s" repeatCount="indefinite"/></circle><circle cx="100" cy="100" r="16" fill="' + g + '"/>',
      "apokatastasis": '<circle cx="100" cy="100" r="70" ' + c + ' stroke-dasharray="6 8"><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="40s" repeatCount="indefinite"/></circle>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<circle cx="' + (100 + 70 * Math.cos(a)).toFixed(1) + '" cy="' + (100 + 70 * Math.sin(a)).toFixed(1) + '" r="4" fill="var(--dawn)"><animate attributeName="r" values="2;5;2" dur="3s" begin="' + (i * 0.35) + 's" repeatCount="indefinite"/></circle>'; }).join("") + '<circle cx="100" cy="100" r="10" fill="' + g + '"/>'
    };
    if (map[id] === null) map[id] = map["triune-dance"];
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
      '<g class="fig f-god" style="transform:translateX(-140px)"><circle cx="320" cy="130" r="70" fill="url(#glow)"/><circle cx="320" cy="130" r="26" fill="#e0ae55"/><text x="320" y="225" text-anchor="middle" fill="var(--ink)" font-family="Avenir Next, Nunito Sans, sans-serif" font-weight="600" font-size="18">Father, Son &amp; Spirit</text></g>' +
      '<g class="fig f-us" style="transform:translateX(150px)"><circle cx="320" cy="140" r="18" fill="none" stroke="var(--dawn)" stroke-width="2"/><text x="320" y="186" text-anchor="middle" fill="var(--ink)" font-family="Avenir Next, Nunito Sans, sans-serif" font-weight="600" font-size="18">Humanity</text></g>' +
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
      ["story", "How God met humanity", "From a garden to a face: the light rising through the ages."],
      ["theme.perfect-theology", "Jesus, perfect theology", "If you have seen him, you have seen the Father."],
      ["love", "God is love, one nature", "Why justice is love setting things right, not a rival nature."],
      ["apostles", "Did the apostles see it?", "Witnesses who grew into the light."],
      ["journey", "How people misread God", "From Eden's hiding to Peter's sword."],
      ["violence", "The violent passages", "Reading the war stories through the cross."],
      ["law", "Why God gave the Law", "A guardian for a child, until the Seed came."],
      ["culture", "Culture decoder", "Sandals, hair, veils, and what they meant."],
      ["sayings", "The words of Jesus", "The cultural world behind his sayings."],
      ["theme.separation-union", "Separation or union", "The fork where two gospels part ways."],
      ["newcreation", "New creation & the old self", "Why Adam's race had to die, and what rose with Christ."],
      ["compare", "Legal vs relational", "How two gospels read baptism, tithe, prayer, the cross and more."],
      ["trinity", "The Trinity at work", "Father, Son and Spirit engaged in our restoration."],
      ["kingdom", "Ekklesia & the Kingdom", "Seated with Christ, reigning in life, until the last enemy is under his feet."],
      ["life", "Love with a spine", "Boundaries, dignity and self-worth, and how Jesus lived them."],
      ["share", "Sharing the good news", "How Jesus and the apostles announced it, and how we can."],
      ["why", "The why of design", "Why God made the body, needs, rest, work, family and more."],
      ["big", "Big questions", "Why we need God, the devil, the finished work, Adam, and every term defined."],
      ["forgive", "Forgiveness & repair", "Forgiving, repairing, boundaries, and living after harm."],
      ["facets", "The gospel’s facets & finished work", "Every facet of the gospel, the finished work, and the church fathers."],
      ["covenant", "The Blessing & covenant", "The Blessing from Eden to the new creation, and the covenants."],
      ["sons", "Manifestation of the sons", "Romans 8:19: adoption, maturity, now and not yet."],
      ["healing", "Divine healing", "The LORD who heals: Jesus, history, practice and hard questions."],
      ["trees", "Two trees: legal vs relational doctrine", "Both doctrinal skeletons, where they split, their contradictions, and what the legal gospel misses."],
      ["misuse", "“But it’s biblical”: Scripture misused", "How the Bible was used to defend slavery, war and cruelty, what conscience rejects, and the Christ test."],
      ["sorry", "Sorry when you did nothing wrong?", "Apology, peace-making, false guilt and the fawn response, with a flowchart for real situations."],
      ["belief", "Does what you believe manifest?", "Faith, agreement and God’s will: how belief shapes outcomes, and its limits."],
      ["enforce", "From truth to reality: possessing the land", "How what is true in Christ becomes lived experience, pictured by Israel possessing the Promised Land."],
      ["receive", "Receiving promises & prophecy", "Twenty stories of people who received or missed God’s word, and ten keys to receiving."],
      ["gifts", "Gifts without relationship?", "How powerful ministry can coexist with sin or wrong doctrine, and how to discern by fruit."],
      ["parables", "The kingdom of God & its parables", "Every kingdom parable, the Jewish and Roman context, and why the kingdom is present and growing."],
      ["mission", "Evangelism, mission & the kingdom", "How many texts command evangelism, what Jesus and the apostles emphasised, and how soul-winning became central."],
      ["tenses", "Penalty, power, presence? Three tenses of salvation", "The three-tense formula of salvation examined through Scripture, the Jewish lens and the relational gospel, with defenders’ responses."],
      ["deathless", "Deathless: the defeat of death", "An 8-part series on law, cross, identity and death, studied in depth."],
      ["name", "The name of the Lord", "Calling on and proclaiming the name: God revealed."],
      ["blessing", "Blessing, matter & spiritual life", "Spiritual blessing, Gnostic splits, and God’s heart for healing and provision."],
      ["recover", "Habits, healing & help", "Secular help, the legal gospel and the relational gospel on addiction, habits and trauma."],
      ["justice", "Justice, conflict & call-outs", "Harassment, stepping in, revenge, exposing ministries, and the legal gospel’s contradictions."],
      ["woman", "Man, woman & Genesis", "Man first, Genesis 1 and 2, eyes opened, and women’s dignity."],
      ["blood", "The life is in the blood", "Blood’s design, its meaning in the Old Testament, and how Christ’s blood cleanses."],
      ["doxa", "Doxa: from glory to glory", "Glory, identity, perspective and doubt, from 2 Corinthians 3."],
      ["embrace", "The Divine Embrace", "A chapter-by-chapter journey into union, the mirror and our true design."],
      ["myths", "Myths & mistranslations", "Sayings and translations many repeat without checking, busted one by one."],
      ["ways", "How God works", "His character, his boundaries, his voice, and why some are spared."],
      ["reborn", "Born again", "Born from above: John 3, why and how, and every tradition compared."],
      ["design", "Made for each other", "Man and woman, marriage, children, family and friendship by design."],
      ["saviour", "Why a Saviour?", "Saved from what, why good people need Jesus, and what comes after yes."],
      ["identity", "Identity & heart healing", "In Christ realities, confession, renewing the mind, healing the heart."],
      ["paths", "Ancient paths & encounters", "The old paths, the practices, and the encounters of Scripture and history."],
      ["living", "Living it out", "Money, respect, rules, prayer, fear and faith on a Monday."],
      ["worship", "Worship in Spirit & truth", "A living sacrifice, Spirit and truth, and the human spirit."],
      ["theme.union-sonship", "Union & sonship", "From orphan to beloved child."],
      ["theme.undiluted-gospel", "The undiluted gospel", "Recovering the good news the apostles announced."],
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
        ["debate", A("strawmen").length + " strawmen, " + A("arguments").length + " debates", "Arguments and counter-arguments, side by side"],
        ["love", A("lovePassages").length + " justice passages answered", A("loveObjections").length + " objections, " + A("justiceWords").length + " Hebrew and Greek word studies"],
        ["newcreation", A("ncQuestions").length + " questions on new creation", "The old self, born again, Adam, the cosmic gospel"],
        ["compare", A("compare").length + " topics, two gospels", "Baptism, tithe, forgiveness, prayer, work and more"],
        ["blessing", "Blessing, matter & spiritual life", A("bsArgs").length + " arguments answered, the Gnostic timeline, the shalom wheel, " + A("bsQA").length + " deep questions"],
        ["recover", "Habits, healing & help", A("rcCases").length + " case studies, the habit loop, two cycles, a visual map, " + A("rcQA").length + " deep questions"],
        ["justice", "Justice, conflict & call-outs", A("jxScenes").length + " situations to practise, the 5 Ds, the revenge cycle, " + A("jxQA1").concat(A("jxQA2"), A("jxQA3")).length + " deep questions"],
        ["woman", "Man, woman & Genesis", A("wmQA").length + " deep questions, Genesis 1 and 2 compared, " + A("wmWomen").length + " women in God’s story"],
        ["blood", "The life is in the blood", "An animated journey of blood, " + A("blStory").length + " moments in the scarlet thread, " + A("blQA").length + " deep questions"],
        ["doxa", "Doxa: from glory to glory", dxAll().length + " parts, two glories, a glory-to-glory journey and a quiz"],
        ["embrace", "The Divine Embrace", deAll().length + " chapters with stories, word studies and questions"],
        ["myths", "Myths & mistranslations", A("mmMyths").length + " myths and mistranslations to bust, " + A("mmCannot").length + " things God cannot do"],
        ["ways", "How God works", A("wyChar").length + " traits seen in Jesus, a voice quiz, a change skeleton, " + A("wyQA1").concat(A("wyQA2")).length + " deep questions"],
        ["reborn", "Born again", A("rbQA").length + " deep questions, John 3 line by line, " + A("rbViews").length + " traditions compared"],
        ["design", "Made for each other", A("dsDesign").length + " relationships by design, " + A("dsExamples").length + " Bible stories through the relational lens"],
        ["saviour", "Why a Saviour?", A("svFrom").length + " things Jesus saves from, two flowcharts, " + A("svNots").length + " “I am not’s”, " + A("svQA1").concat(A("svQA2")).length + " deep questions"],
        ["identity", "Identity & heart healing", A("idInChrist").length + " in-Christ truths, " + A("idLies").length + " lies exchanged, " + A("idQA1").concat(A("idQA2")).length + " deep questions, Word of Faith examined"],
        ["paths", "Ancient paths & encounters", A("paPractices").length + " practices, " + A("paEncounters").length + " encounters, a guided prayer player, " + A("paObjections").length + " objections answered"],
        ["living", "Living it out", A("lvQA1").concat(A("lvQA2"), A("lvQA3"), A("lvQA4")).length + " questions, a love balance, " + A("lvRespond").length + " real situations, " + A("lvValues").length + " moral values"],
        ["worship", "Worship in Spirit & truth", "Romans 12:1 phrase by phrase, John 4, " + A("worWords").length + " worship words, before and after Christ"],
        ["forgive", "Forgiveness & repair", A("fgAllQA").length + " questions, two paths of healing, a decision guide, David's story mapped"],
        ["big", "Big questions", A("bigAllQA").length + " deep answers, a two-gospel flowchart, " + A("bigGlossary").length + " terms defined both ways"],
        ["why", "The why of design", A("whyDesign").length + " designs explained, " + A("whyCounterfeits").length + " counterfeits, " + A("whyQuestions").length + " hard questions"],
        ["share", "Sharing the good news", A("shareSermons").length + " Acts sermons mapped, " + A("shareHistory").length + " moments in history, " + A("shareAccusations").length + " accusations answered"],
        ["life", "Designed to live", A("lifeMyths").length + " myths, " + A("lifeTraits").length + " traits of Jesus, " + A("lifeSituations").length + " situations he handled"],
        ["kingdom", "Ekklesia & the Kingdom", A("kingConcepts").length + " concepts, " + A("kingPractice").length + " practices, " + A("kingViews").length + " views of the end"],
        ["embodied", "The Embodied Gospel", A("embStudies").length + " in-depth studies, " + A("embConcepts").length + " key concepts"],
        ["story", A("ages").length + " stages of revelation", "How God met the human condition, age by age"],
        ["voices", A("voices").length + " fathers & teachers", "Irenaeus to Kruger, MacDonald, Crowder and today's New Creation teachers"],
        ["models", A("models").length + " frameworks compared", "Atonement, salvation, hell, Scripture, end times"],
        ["religion", A("misses").length + " things religion misses", "Religion beside revelation"],
        ["apostles", A("apostles").length + " apostles & witnesses", "What they grasped and where they struggled"],
        ["trinity", A("trinityActs").length + " moments of the Trinity", "Father, Son and Spirit, from before creation to the end"]
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
      deepHTML(t.id) +
      ((t.related || []).length ? '<section class="section"><div class="label">Connected stars</div><div class="chips">' + t.related.map(function (r) { var x = find("theme", r); return x ? '<a class="chip" href="#theme.' + r + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>" : "") +
      '<div class="row" style="justify-content:space-between">' + (prev ? '<a class="btn ghost" href="#theme.' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="#theme.' + next.id + '">' + esc(next.title) + " →</a>" : "") + "</div>";
  };

  function deepHTML(id) {
    var d = (RG.deep || {})[id]; if (!d) return "";
    return '<section class="section deep"><div class="row" style="justify-content:space-between"><h2>Deep study</h2><span class="label">' + (d.sections || []).length + " sections · " + (d.evidence || []).length + ' sources</span></div><div class="qa">' +
      (d.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + '><summary>' + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + (sec.refs && sec.refs.length ? '<div class="ref">' + esc(sec.refs.join(" · ")) + "</div>" : "") + "</div></details>"; }).join("") + "</div>" +
      ((d.evidence || []).length ? '<div class="blk"><div class="label">Evidence and sources</div><div class="evidence">' + d.evidence.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></div>" : "") + "</section>";
  }
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


  /* ---------- God is love: one nature ---------- */
  var loveTab = "passages", loveTest = "all", scaleMode = "two";
  V.love = function () {
    var C = A("loveCase");
    return head("One nature, not two", "God is love", "Many teach that God holds love and justice in tension, and that the cross settled the conflict. The relational gospel answers that God has one nature, love, and that his justice is love setting the world right. Here is the case, the passages people bring against it, and the strongest objections, answered.") +
      scalesHTML() +
      (C.length ? '<section class="section"><h2>The case, step by step</h2><div class="chips" id="casenav">' + C.map(function (c, i) { return '<button class="chip" type="button" data-case="' + c.id + '">' + (i + 1) + ". " + esc(c.title) + "</button>"; }).join("") + '</div><div class="case">' +
        C.map(function (c, i) {
          return '<article class="case-step" id="case-' + c.id + '"><div class="case-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</div><div class="case-body"><div class="label">' + esc(c.kicker) + "</div><h3>" + esc(c.title) + '</h3><div class="prose">' + c.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div><div class="ref">' + esc((c.refs || []).join(" · ")) + "</div></div></article>";
        }).join("") + "</div></section>" : "") +
      '<section class="section"><h2>Go deeper</h2><div class="chips" id="lovetabs">' +
      [["passages", "Passages answered (" + A("lovePassages").length + ")"], ["objections", "Objections (" + A("loveObjections").length + ")"], ["words", "Word studies (" + A("justiceWords").length + ")"], ["voices", "Voices (" + A("loveVoices").length + ")"]].map(function (t) { return '<button class="chip" type="button" data-lt="' + t[0] + '" aria-pressed="' + (loveTab === t[0]) + '">' + t[1] + "</button>"; }).join("") +
      '</div><div id="lovepane">' + lovePane() + "</div></section>";
  };
  function scalesHTML() {
    return '<section class="scales" id="scales"><div class="row" style="justify-content:space-between"><div class="label">Two pictures of God</div><div class="su-toggle" role="group" aria-label="Choose a picture"><button type="button" class="s" data-scale="two" aria-pressed="true">Two natures</button><button type="button" class="u" data-scale="one" aria-pressed="false">One nature</button></div></div>' +
      '<div class="scales-stage"><svg viewBox="0 0 640 300" aria-hidden="true"><defs><radialGradient id="flame"><stop offset="0" stop-color="#fff6dc"/><stop offset=".35" stop-color="#e0ae55"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="sc-two"><path d="M320 60 V250 M270 262 H370" stroke="var(--muted)" stroke-width="3" fill="none"/><polygon points="308,60 332,60 320,44" fill="var(--muted)"/>' +
      '<g class="beam"><line x1="150" y1="64" x2="490" y2="64" stroke="var(--ink)" stroke-width="3"/>' +
      '<g class="pan-l"><path d="M150 64 L110 150 M150 64 L190 150" stroke="var(--muted)" fill="none"/><path d="M100 150 H200 Q150 185 100 150z" fill="var(--dawn-soft)" stroke="var(--dawn)"/><text x="150" y="210" text-anchor="middle" class="sc-t" style="fill:var(--dawn)">LOVE</text><text x="150" y="228" text-anchor="middle" class="sc-s">wants to forgive</text></g>' +
      '<g class="pan-r"><path d="M490 64 L450 150 M490 64 L530 150" stroke="var(--muted)" fill="none"/><path d="M440 150 H540 Q490 185 440 150z" fill="var(--wine-soft)" stroke="var(--wine)"/><text x="490" y="210" text-anchor="middle" class="sc-t" style="fill:var(--wine)">JUSTICE</text><text x="490" y="228" text-anchor="middle" class="sc-s">demands punishment</text></g></g></g>' +
      '<g class="sc-one"><circle cx="320" cy="140" r="120" fill="url(#flame)" class="sc-glow"/><circle cx="320" cy="140" r="34" fill="#e0ae55"/><text x="320" y="146" text-anchor="middle" class="sc-t" style="fill:#1a1408">LOVE</text>' +
      [["Justice", "love setting things right", 320, 20], ["Holiness", "love's purity", 520, 110], ["Wrath", "love against what destroys", 500, 250], ["Mercy", "love toward the undeserving", 140, 250], ["Judgement", "love exposing and healing", 120, 110]].map(function (r) {
        return '<line x1="320" y1="140" x2="' + r[2] + '" y2="' + (r[3] + (r[3] < 140 ? 14 : -14)) + '" stroke="var(--gold)" stroke-opacity=".5" stroke-dasharray="3 5"/><text x="' + r[2] + '" y="' + r[3] + '" text-anchor="middle" class="sc-t" style="font-size:13px">' + r[0].toUpperCase() + '</text><text x="' + r[2] + '" y="' + (r[3] + 16) + '" text-anchor="middle" class="sc-s">' + r[1] + "</text>";
      }).join("") + "</g></svg></div>" +
      '<p class="su-text" id="scale-text"></p></section>';
  }
  var SCALE = {
    two: "In the two-natures picture, God's love and God's justice pull against each other. Love wants to forgive; justice demands that someone be punished. The cross tips the balance by punishing the Son so that love may go free.",
    one: "In the one-nature picture there is nothing to balance. God is love, and every other word describes love in action: justice is love setting things right, holiness is love's purity, wrath is love's fire against what destroys the beloved, and judgement is love exposing evil in order to heal."
  };
  function setScale(m) {
    var root = $("#scales"); if (!root) return;
    scaleMode = m;
    $$("[data-scale]", root).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.scale === m)); });
    root.classList.toggle("one", m === "one");
    $("#scale-text").textContent = SCALE[m];
  }
  function lovePane() {
    if (loveTab === "passages") {
      return '<div class="toolbar">' + field("lp-q", "Search passages, e.g. vengeance, Nahum, Lamb, Gehenna") + '<span class="count" id="lp-count"></span></div><div class="chips">' +
        [["all", "Whole Bible"], ["OT", "Old Testament"], ["NT", "New Testament"]].map(function (t) { return '<button class="chip" type="button" data-lpt="' + t[0] + '" aria-pressed="' + (loveTest === t[0]) + '">' + t[1] + "</button>"; }).join("") + '</div><div class="grid" id="lpgrid"></div>';
    }
    if (loveTab === "objections") return '<div class="qa">' + A("loveObjections").map(function (o) { return "<details><summary>" + o.q + '</summary><div class="ans"><p>' + o.a + '</p><div class="ref">' + esc((o.refs || []).join(" · ")) + "</div></div></details>"; }).join("") + "</div>";
    if (loveTab === "words") return '<div class="grid">' + A("justiceWords").map(function (w) { return '<div class="card" role="button" tabindex="0" data-open="loveWord.' + w.id + '"><div class="label">' + esc(w.lang) + '</div><div class="orig">' + esc(w.original) + "</div><h3>" + esc(w.word) + ' <span class="ref">' + esc(w.translit) + "</span></h3><p>" + clip(w.meaning, 140) + "</p></div>"; }).join("") + "</div>";
    return '<div class="grid">' + A("loveVoices").map(function (v) { return '<div class="voicecard ' + (v.side === "traditional" ? "trad" : "rel") + '"><div class="label">' + (v.side === "traditional" ? "Traditional view" : "Relational view") + '</div><blockquote>' + v.text + "</blockquote><b>" + esc(v.name) + '</b><span class="ref">' + esc(v.source) + "</span>" + (v.note ? '<p class="note">' + v.note + "</p>" : "") + "</div>"; }).join("") + "</div>";
  }
  function lpGrid() {
    if (!$("#lpgrid")) return;
    var q = (($("#lp-q") || {}).value || "").toLowerCase().trim();
    var list = A("lovePassages").filter(function (p) { return (loveTest === "all" || p.testament === loveTest) && (!q || [p.ref, p.text, p.claim, p.response].join(" ").toLowerCase().indexOf(q) > -1); });
    $("#lpgrid").innerHTML = list.map(function (p) { return card("lovePassage", p, { top: '<div class="label">' + (p.testament === "OT" ? "Old Testament" : "New Testament") + "</div>", text: "<em>" + clip(p.text, 120) + "</em>" }); }).join("") || '<p class="count">No passage matches. Try a book name.</p>';
    $("#lp-count").textContent = list.length + " of " + A("lovePassages").length;
  }


  /* ---------- New creation & the old self ---------- */
  var ncStage = 0, ncGroup = "all";
  V.newcreation = function () {
    var S = A("ncStages");
    return head("Death, resurrection, new creation", "New creation & the old self", "If the old self died with Christ, why do we still need a healed heart and a renewed mind? Why did God make us new instead of repairing Adam? Was the Incarnation an afterthought? Walk through the story, then study each question.") +
      (S.length ? '<section class="nc" id="nc"><div class="nc-stage"><svg viewBox="0 0 760 200" aria-hidden="true">' +
        '<path d="M40 150 C180 150 230 150 300 150 C330 150 350 60 380 60 C410 60 430 150 460 150 C540 150 600 110 720 70" fill="none" stroke="var(--line)" stroke-width="2"/>' +
        '<path class="nc-trail" d="M40 150 C180 150 230 150 300 150 C330 150 350 60 380 60 C410 60 430 150 460 150 C540 150 600 110 720 70" fill="none" stroke="var(--gold)" stroke-width="3" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>' +
        '<g transform="translate(380 40)"><path d="M0 -24 V44 M-18 -6 H18" stroke="var(--ink)" stroke-width="3"/></g>' +
        S.map(function (st, i) { var xy = [[60, 150], [380, 60], [470, 150], [710, 74]][i] || [60, 150]; return '<g class="nc-pt" data-ncs="' + i + '" style="cursor:pointer"><circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="13" fill="var(--bg)" stroke="' + (i === 0 ? "var(--wine)" : "var(--dawn)") + '" stroke-width="2"/><circle class="nc-dot" cx="' + xy[0] + '" cy="' + xy[1] + '" r="6" fill="' + (i === 0 ? "var(--wine)" : "var(--dawn)") + '"/><text x="' + xy[0] + '" y="' + (xy[1] + 34) + '" text-anchor="middle" class="tl">' + esc(st.title.toUpperCase()) + "</text></g>"; }).join("") +
        '</svg></div><div class="chips">' + S.map(function (st, i) { return '<button class="chip" type="button" data-ncs="' + i + '" aria-pressed="' + (i === ncStage) + '">' + (i + 1) + ". " + esc(st.title) + "</button>"; }).join("") + '</div><article class="dawn-card" id="nc-card"></article></section>' : "") +
      '<section class="section"><h2>Study questions</h2><div class="toolbar">' + field("nc-q", "Search, e.g. old self, Romans 7, Scotus, born again") + '<span class="count" id="nc-count"></span></div><div class="chips">' +
      [["all", "Every question"]].concat(Object.keys(NCG).map(function (k) { return [k, NCG[k]]; })).map(function (g) { return '<button class="chip" type="button" data-ncg="' + g[0] + '" aria-pressed="' + (ncGroup === g[0]) + '">' + g[1] + "</button>"; }).join("") +
      '</div><div class="qa" id="nc-list"></div></section>' +
      (A("ncTerms").length ? '<section class="section"><h2>The words that matter</h2><p class="note">How a legal gospel and a relational gospel read the key terms of biblical anthropology.</p><div class="grid">' + A("ncTerms").map(function (t) { return '<div class="card" role="button" tabindex="0" data-open="ncterm.' + t.id + '"><div class="orig">' + esc(t.original) + "</div><h3>" + esc(t.term) + ' <span class="ref">' + esc(t.translit) + "</span></h3><p>" + clip(t.relational, 130) + "</p></div>"; }).join("") + "</div></section>" : "");
  };
  function showNC() {
    var S = A("ncStages"), st = S[ncStage]; if (!st || !$("#nc")) return;
    $$("#nc .chip[data-ncs]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.ncs === ncStage)); });
    $$("#nc .nc-dot").forEach(function (d, i) { d.setAttribute("opacity", i <= ncStage ? "1" : ".25"); });
    $(".nc-trail").style.strokeDashoffset = String(100 - [8, 45, 62, 100][ncStage]);
    $("#nc-card").innerHTML = '<div class="label">Stage ' + (ncStage + 1) + " of " + S.length + " · " + esc(st.ref) + '</div><h3 style="font-size:26px">' + esc(st.title) + "</h3><p>" + st.text + "</p>";
  }
  function ncList() {
    if (!$("#nc-list")) return;
    var q = (($("#nc-q") || {}).value || "").toLowerCase().trim();
    var list = A("ncQuestions").filter(function (x) { return (ncGroup === "all" || x.group === ncGroup) && (!q || [x.q, x.short, (x.answer || []).join(" "), (x.refs || []).join(" ")].join(" ").toLowerCase().indexOf(q) > -1); });
    $("#nc-list").innerHTML = list.map(function (x) {
      return '<details><summary><span class="label" style="display:block;margin-bottom:2px">' + esc(NCG[x.group] || x.group) + "</span>" + esc(x.q) + '</summary><div class="ans"><p style="color:var(--ink)"><strong>' + x.short + "</strong></p>" + (x.answer || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") +
        '<div class="ref">' + esc((x.refs || []).join(" · ")) + "</div>" + (x.objection ? '<div class="panel sep"><div class="label">Pushback: ' + esc(strip(x.objection.q)) + "</div><p>" + x.objection.a + "</p></div>" : "") + "</div></details>";
    }).join("") || '<p class="count">No question matches. Try a broader word.</p>';
    $("#nc-count").textContent = list.length + " of " + A("ncQuestions").length;
  }

  /* ---------- Legal vs relational ---------- */
  var cmpGroup = "all", cmpMode = "both";
  V.compare = function () {
    var groups = []; A("compare").forEach(function (c) { if (groups.indexOf(c.group) === -1) groups.push(c.group); });
    return head("Two gospels, every topic", "Legal vs relational gospel", "The same words, baptism, faith, grace, the cross, the tithe, mean different things depending on which story they belong to. Compare how a legal, transactional gospel and a relational, union gospel read each one.") +
      '<div class="toolbar">' + field("cmp-q", "Search topics, e.g. baptism, tithe, self-love, prayer") + '<div class="su-toggle" role="group" aria-label="Choose a view"><button type="button" class="s" data-cm="legal" aria-pressed="' + (cmpMode === "legal") + '">Legal</button><button type="button" data-cm="both" aria-pressed="' + (cmpMode === "both") + '">Side by side</button><button type="button" class="u" data-cm="relational" aria-pressed="' + (cmpMode === "relational") + '">Relational</button></div></div>' +
      '<div class="chips">' + ["all"].concat(groups).map(function (g) { return '<button class="chip" type="button" data-cg="' + esc(g) + '" aria-pressed="' + (cmpGroup === g) + '">' + (g === "all" ? "Every topic" : esc(g)) + "</button>"; }).join("") + '<span class="count" id="cmp-count"></span></div>' +
      '<div class="cmp-list" id="cmp-list"></div>';
  };
  function cmpList() {
    if (!$("#cmp-list")) return;
    var q = (($("#cmp-q") || {}).value || "").toLowerCase().trim();
    var list = A("compare").filter(function (c) { return (cmpGroup === "all" || c.group === cmpGroup) && (!q || [c.topic, c.legal, c.relational, (c.refs || []).join(" ")].join(" ").toLowerCase().indexOf(q) > -1); });
    $("#cmp-list").className = "cmp-list mode-" + cmpMode;
    $("#cmp-list").innerHTML = list.map(function (c) {
      return '<article class="cmp"><div class="row" style="justify-content:space-between"><div><div class="label">' + esc(c.group) + "</div><h3>" + esc(c.topic) + "</h3></div>" + saveBtn("cmp", c.id) + '</div><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">Legal gospel</div><p>' + c.legal + '</p></div><div class="panel uni cmp-r"><div class="label">Relational gospel</div><p>' + c.relational + "</p></div></div>" +
        (c.practice ? '<p class="note"><strong>In practice:</strong> ' + c.practice + "</p>" : "") + '<div class="row" style="justify-content:space-between"><span class="ref">' + esc((c.refs || []).join(" · ")) + '</span><button class="chip" type="button" data-open="cmp.' + c.id + '">Fair point & details</button></div></article>';
    }).join("") || '<p class="count">No topic matches. Try another word.</p>';
    $("#cmp-count").textContent = list.length + " of " + A("compare").length;
  }









  /* ---------- Worship in Spirit & truth ---------- */
  var vSel = 0, vTimer = null, wPlace = 0, wPost = "all", wwQ = 0;
  V.worship = function () {
    RG.worAllQA = A("worQA1").concat(A("worQA2"));
    var VV = A("worVerse"), P = A("worPlaces"), W = A("worWords"), posts = [];
    W.forEach(function (w) { if (posts.indexOf(w.posture) === -1) posts.push(w.posture); });
    return head("Bodies, spirit, truth", "Worship in Spirit & truth", "What does it mean to offer our bodies as a living sacrifice? What did Jesus mean by worship in spirit and truth? What is the human spirit, and what changes when we come to Christ? Read Romans 12 phrase by phrase and walk through John 4.") +
      (VV.length ? '<section class="section"><h2>Romans 12:1-2, phrase by phrase</h2><p class="note">Tap any phrase, or let it read slowly.</p><div class="vrs" id="vrs">' + VV.map(function (v, i) { return '<button type="button" class="vph' + (i === vSel ? " on" : "") + '" data-vph="' + i + '">' + esc(v.phrase) + "</button>"; }).join(" ") + '</div><div class="row"><button class="btn" type="button" id="vrs-play">Read it slowly</button></div><div id="vph-card"></div></section>' : "") +
      (P.length ? '<section class="section"><h2>John 4: where do we worship?</h2><div class="chips">' + P.map(function (p, i) { return '<button class="chip" type="button" data-wp="' + i + '" aria-pressed="' + (i === wPlace) + '">' + (i + 1) + ". " + esc(p.place) + "</button>"; }).join("") + '</div><div class="j4" id="j4"><svg viewBox="0 0 760 240" aria-hidden="true"><defs><radialGradient id="j4g"><stop offset="0" stop-color="#e0ae55" stop-opacity=".9"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs>' +
        '<path d="M0 220 L140 110 L260 220 Z" class="j4-hill h-ger"/><text x="140" y="96" text-anchor="middle" class="tl">GERIZIM</text>' +
        '<path d="M500 220 L620 100 L760 220 Z" class="j4-hill h-jer"/><rect x="600" y="80" width="40" height="22" class="j4-temple"/><text x="620" y="70" text-anchor="middle" class="tl">JERUSALEM</text>' +
        '<g transform="translate(380 170)"><circle r="8" fill="var(--dawn)"/><text y="34" text-anchor="middle" class="tl">THE WELL AT SYCHAR</text></g>' +
        '<circle class="j4-glow" cx="380" cy="160" r="20" fill="url(#j4g)"/></svg><div id="j4-text"></div></div></section>' : "") +
      (RG.worAllQA.length ? '<section class="section"><h2>The questions</h2><div class="compass"><div class="compass-list" id="wwq-list"></div><div id="wwq-card"></div></div></section>' : "") +
      (W.length ? '<section class="section"><h2>The many ways Scripture worships</h2><div class="chips">' + ["all"].concat(posts).map(function (p) { return '<button class="chip" type="button" data-wpost="' + esc(p) + '" aria-pressed="' + (wPost === p) + '">' + (p === "all" ? "Every form" : esc(p)) + "</button>"; }).join("") + '</div><div class="grid" id="wwords"></div></section>' : "") +
      (A("worBeforeAfter").length ? '<section class="section"><h2>A person before and after Christ</h2><div class="su-toggle" role="group" aria-label="Choose a view"><button type="button" class="s" data-ba="legal" aria-pressed="false">Before</button><button type="button" data-ba="both" aria-pressed="true">Both</button><button type="button" class="u" data-ba="relational" aria-pressed="false">After</button></div><div class="cmp-list mode-both" id="ba">' + A("worBeforeAfter").map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">Before</div><p>' + r.before + '</p></div><div class="panel uni cmp-r"><div class="label">After</div><p>' + r.after + '</p></div></div><div class="ref">' + esc((r.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (A("worEvidence1").concat(A("worEvidence2")).length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("worEvidence1").concat(A("worEvidence2")).map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#embodied">The Embodied Gospel</a><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#big">Big questions</a>' + ["mystical-union", "sacred-secular", "church-now"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>";
  };
  function showVph() {
    var VV = A("worVerse"), v = VV[vSel]; if (!v || !$("#vph-card")) return;
    $$("#vrs .vph").forEach(function (b, i) { b.classList.toggle("on", i === vSel); b.classList.toggle("past", i < vSel); });
    $("#vph-card").innerHTML = '<article class="vph-card"><div class="label">Phrase ' + (vSel + 1) + " of " + VV.length + '</div><h3>"' + esc(v.phrase) + '"</h3><div class="gorig">' + esc(v.greek) + " · " + esc(v.translit) + "</div><p>" + v.meaning + '</p><div class="panel gold"><div class="label">In its world</div><p>' + v.culture + "</p></div></article>";
  }
  function showJ4() {
    var P = A("worPlaces"), p = P[wPlace]; if (!p || !$("#j4")) return;
    $$("[data-wp]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wp === wPlace)); });
    $("#j4").className = "j4 st-" + wPlace; var gl = $(".j4-glow"); if (gl) gl.setAttribute("r", wPlace === 2 ? "420" : "20");
    $("#j4-text").innerHTML = '<div class="label">' + esc(p.ref) + '</div><h3 style="font-size:22px">' + esc(p.place) + "</h3><p>" + p.text + "</p>";
  }
  function showWords() {
    if (!$("#wwords")) return;
    $("#wwords").innerHTML = A("worWords").filter(function (w) { return wPost === "all" || w.posture === wPost; }).map(function (w, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><span class="pill principle"><i></i>' + esc(w.posture) + '</span><div class="orig">' + esc(w.original) + "</div><h3>" + esc(w.word) + ' <span class="ref">' + esc(w.translit) + " · " + esc(w.lang) + "</span></h3><p>" + w.meaning + '</p><div class="verse">' + w.example + "</div></article>"; }).join("");
  }
  function wwqShow() {
    var Q = RG.worAllQA || []; if (!Q.length || !$("#wwq-list")) return;
    $("#wwq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-wwq="' + i + '" aria-current="' + (i === wwQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[wwQ];
    $("#wwq-card").innerHTML = '<article class="compass-card"><div class="label">Question ' + (wwQ + 1) + " of " + Q.length + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? '<div class="evidence">' + q.evidence.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-wwqm="-1"' + (wwQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-wwqm="1"' + (wwQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }

  /* ---------- shared question explorer ---------- */
  var QX = {}, QXL = {};
  function qxSection(p, list, title) { QXL[p] = list; QX[p] = Math.min(QX[p] || 0, Math.max(0, list.length - 1)); return list.length ? '<section class="section"><h2>' + (title || "The deep questions") + '</h2><div class="compass"><div class="compass-list" id="' + p + '-list"></div><div id="' + p + '-card"></div></div></section>' : ""; }
  function qxShow(p, save) {
    var Q = QXL[p] || [], i = QX[p] || 0; if (!Q.length || !$("#" + p + "-list")) return;
    $("#" + p + "-list").innerHTML = Q.map(function (q, j) { return '<button type="button" data-qx="' + p + ":" + j + '" aria-current="' + (j === i) + '"><b>' + String(j + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[i];
    $("#" + p + "-card").innerHTML = '<article class="compass-card"><div class="row" style="justify-content:space-between"><div class="label">Question ' + (i + 1) + " of " + Q.length + "</div>" + (save ? saveBtn(save, q.id) : "") + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, k) { return "<details" + (k === 0 ? " open" : "") + "><summary>" + sec.title + '</summary><div class="ans">' + sec.body.map(function (x) { return '<p style="color:var(--ink)">' + x + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? evGrid(q.evidence) : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-qxm="' + p + ':-1"' + (i === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-qxm="' + p + ':1"' + (i === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }
  var QXSAVE = { bsq: "bsq", rcq: "rcq", rbq: "rq", dsq: "dq", wyq1: "wq1", wyq2: "wq3", blq: "blq", blwq: "blwq", wmq: "wmq", jxq1: "jq1", jxq2: "jq2", jxq3: "jq3" };

  /* ---------- Blood: the cleansing transport ---------- */
  var blW = 0;
  var BLO = { lungs: [600, 40], kidneys: [600, 105], liver: [600, 170], spleen: [600, 235], skin: [600, 300], immune: [600, 365] };
  function blWastePath(o) { var p = BLO[o] || BLO.liver; return "M120 205 C 200 205, 260 205, 330 205 S 470 " + p[1] + ", " + (p[0] - 22) + " " + p[1]; }
  function blWasteHTML() {
    var W = A("blWaste"), O = A("blOrgans"); if (!W.length) return "";
    return '<section class="section"><h2>Carried away: the body’s cleansing system</h2><p class="note">Blood is a transport system: it picks up waste and toxins from every cell and carries them to the organs that filter and remove them. Choose a waste to watch its journey.</p><div class="chips">' + W.map(function (w, i) { return '<button class="chip" type="button" data-blw="' + i + '" aria-pressed="' + (i === blW) + '">' + esc(w.waste) + "</button>"; }).join("") + '</div><div class="blw" id="blw"><svg viewBox="0 0 720 400" aria-hidden="true"><rect x="20" y="170" width="100" height="70" rx="14" class="blw-cells"/><text x="70" y="210" text-anchor="middle" class="tl">EVERY CELL</text><path d="M120 205 L 330 205" class="blw-vessel"/><text x="225" y="192" text-anchor="middle" class="tl">BLOODSTREAM</text>' + Object.keys(BLO).map(function (k) { var p = BLO[k]; return '<path d="' + blWastePath(k) + '" class="blw-route r-' + k + '"/><g class="blw-org o-' + k + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="22"/><text x="' + (p[0] + 32) + '" y="' + (p[1] + 4) + '" class="tl">' + k.toUpperCase() + "</text></g>"; }).join("") + '<circle r="9" class="blw-dot" id="blw-dot"><animateMotion id="blw-anim" dur="2.6s" begin="indefinite" fill="freeze" path="' + blWastePath("liver") + '"/></circle></svg><div id="blw-card"></div></div>' +
      (O.length ? '<div class="blw-organs">' + O.map(function (o) { return '<article class="blw-o" data-org="' + esc(o.id) + '"><h3>' + esc(o.label) + "</h3><p>" + o.role + '</p><p class="note" style="font-size:14px">' + o.fact + '</p><p style="color:var(--dawn);font-size:14.5px">' + o.parallel + "</p></article>"; }).join("") + "</div>" : "") + "</section>";
  }
  function blwShow() {
    var W = A("blWaste"), w = W[blW]; if (!w || !$("#blw")) return;
    $$("[data-blw]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.blw === blW)); });
    $$(".blw-org").forEach(function (g) { g.classList.toggle("on", g.classList.contains("o-" + w.organ)); });
    $$(".blw-route").forEach(function (g) { g.classList.toggle("on", g.classList.contains("r-" + w.organ)); });
    $$(".blw-o").forEach(function (a) { a.classList.toggle("on", a.dataset.org === w.organ); });
    var an = $("#blw-anim"); if (an) { an.setAttribute("path", blWastePath(w.organ)); try { if (!reduced) an.beginElement(); } catch (e) {} }
    $("#blw-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(w.waste) + " → " + esc(w.organ) + '</div><div class="blw-flow"><div><b>Where it comes from</b><p>' + w.from + '</p></div><div><b>How blood carries it</b><p>' + w.how + '</p></div><div><b>How it leaves</b><p>' + w.out + '</p></div></div><div class="panel uni"><div class="label">A picture of the gospel</div><p>' + w.parallel + '</p></div><div class="verse">' + w.ref + '</div><a class="ref" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + esc(w.source) + " ↗</a></article>";
  }

  /* ---------- Man, woman & Genesis ---------- */
  var wmS = 0, wmEra = "all", wmOpen = -1, wmV = 3;
  V.woman = function () {
    var G = A("wmGenesis"), S = A("wmGen3"), W = A("wmWomen"), H = A("wmHistory"), VW = A("wmViews"), E = A("wmEvidence1").concat(A("wmEvidence2"));
    return head("Design of creation", "Man, woman & Genesis", "Why the man was formed first and then the woman; whether Genesis 1 and 2 contradict; why both their eyes opened only after Adam ate; how women have been oppressed in God’s name; and how Jesus, Scripture and the relational gospel answer, with every view stated fairly.") +
      (G.length ? '<section class="section"><h2>Genesis 1 and Genesis 2, side by side</h2><p class="note">Two accounts, two camera angles. Toggle to read one at a time, or both together.</p>' + cmode("wmg", 0, 0, "Genesis 1", "Genesis 2") + '<div class="cmp-list mode-both" id="wmg">' + G.map(function (r) { return '<article class="cmp"><h3>' + esc(r.row) + '</h3><div class="cmp-pair"><div class="panel gold cmp-l"><div class="label">Genesis 1</div><p>' + r.g1 + '</p></div><div class="panel uni cmp-r"><div class="label">Genesis 2</div><p>' + r.g2 + '</p></div></div><p style="font-size:15px"><strong>Together:</strong> ' + r.together + "</p></article>"; }).join("") + "</div></section>" : "") +
      (S.length ? '<section class="section"><h2>Genesis 3: why were their eyes opened only after Adam ate?</h2><p class="note">Walk through the text slowly. Highlighted verses hold the key.</p><div class="wm-steps" id="wm-steps"></div><div id="wm-step"></div></section>' : "") +
      (H.length ? '<section class="section"><h2>Said and done “in God’s name”</h2><p class="note">How women were diminished through history, and what Scripture and the gospel actually show. Tap each card.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + H.map(function (h) { return '<button type="button" class="flip wm-h" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">' + esc(strip(h.who)) + "</div><h3>" + esc(strip(h.claim)) + "</h3>" + (h.quote ? '<p style="font-size:15px;font-style:italic">“' + h.quote + '”</p>' : "") + '<span class="note" style="font-size:14px">Tap for the answer</span></div><div class="flip-face back"><div class="label">What Scripture and the gospel show</div><p>' + h.answer + "</p>" + (h.url ? '<span class="ref">Source checked</span>' : "") + "</div></div></button>"; }).join("") + "</div></section>" : "") +
      (W.length ? '<section class="section"><h2>Women in God’s story</h2><div class="chips">' + ["all"].concat(uniq(W, "era")).map(function (k) { return '<button class="chip" type="button" data-wme="' + esc(k) + '" aria-pressed="' + (wmEra === k) + '">' + (k === "all" ? "Every era" : esc(k)) + "</button>"; }).join("") + '</div><div class="wm-women" id="wm-women"></div></section>' : "") +
      (VW.length ? '<section class="section"><h2>Four views on men and women</h2><p class="note">Each in its own best words, with strengths and weaknesses.</p><div class="lvp"><div class="lvp-track pa-sp"><i id="wmv-dot"></i></div><div class="lvp-stops">' + VW.map(function (v, i) { return '<button type="button" class="chip" data-wmv="' + i + '" aria-pressed="' + (i === wmV) + '">' + esc(v.label) + "</button>"; }).join("") + '</div><div id="wmv-card"></div></div></section>' : "") +
      qxSection("wmq", A("wmQA")) +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">If teaching about “headship” or “submission” is being used to control or harm you, your safety comes first: reach out to someone you trust, a qualified professional, or your local emergency services.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#design">Made for each other</a><a class="chip" href="#why">The why of design</a><a class="chip" href="#culture">Culture decoder</a><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#justice">Justice & call-outs</a></div></section>';
  };
  function wmStepShow() {
    var S = A("wmGen3"), s = S[wmS]; if (!s || !$("#wm-steps")) return;
    $("#wm-steps").innerHTML = S.map(function (x, i) { return '<button type="button" class="wm-sd' + (i === wmS ? " on" : "") + (i < wmS ? " past" : "") + (x.highlight ? " hl" : "") + '" data-wms="' + i + '" aria-label="' + esc(x.ref) + '">' + (i + 1) + "</button>"; }).join("");
    $("#wm-step").innerHTML = '<article class="vph-card' + (s.highlight ? " wm-hl" : "") + '"><div class="label">' + esc(s.ref) + (s.highlight ? " · key verse" : "") + '</div><h3>“' + s.text + '”</h3><p>' + s.note + '</p><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-wmsm="-1"' + (wmS === 0 ? " disabled" : "") + '>← Back</button><button class="btn" type="button" data-wmsm="1"' + (wmS === S.length - 1 ? " disabled" : "") + ">Next verse →</button></div></article>";
  }
  function wmWomenShow() {
    if (!$("#wm-women")) return;
    $("#wm-women").innerHTML = A("wmWomen").map(function (w, i) { if (wmEra !== "all" && w.era !== wmEra) return ""; return '<button type="button" class="wm-w' + (i === wmOpen ? " on" : "") + '" data-wmw="' + i + '"><small>' + esc(w.era) + " · " + esc(w.ref) + "</small><b>" + esc(w.name) + '</b><span class="pill principle"><i></i>' + esc(w.role) + "</span>" + (i === wmOpen ? "<p>" + w.story + '</p><p style="color:var(--dawn)">' + w.point + "</p>" : "") + "</button>"; }).join("");
  }
  function wmvShow() {
    var VW = A("wmViews"), v = VW[wmV]; if (!v || !$("#wmv-card")) return;
    $$("[data-wmv]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wmv === wmV)); });
    $("#wmv-dot").style.left = (VW.length > 1 ? wmV / (VW.length - 1) * 100 : 50) + "%";
    $("#wmv-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(strip(v.who)) + "</div><h3>" + esc(v.label) + "</h3><p>" + v.view + '</p><div class="ref">' + esc(strip(v.texts)) + '</div><div class="cmp-pair"><div class="panel uni"><div class="label">Strength</div><p>' + v.strength + '</p></div><div class="panel sep"><div class="label">Weakness</div><p>' + v.weakness + "</p></div></div></article>";
  }

  /* ---------- Justice, conflict & call-out culture ---------- */
  var jxD = 0, jxS = 0, jxSAns = {}, jxH = 0, jxRing = "cycle", jxRi = 0, jxCase = 0, jxT = {}, jxAns = 0;
  var JXD = { distract: "D1", delegate: "D2", document: "D3", delay: "D4", direct: "D5" };
  V.justice = function () {
    var D = A("jx5D"), SC = A("jxScenes"), H = A("jxHarass"), R = RG.jxRevenge || {}, CS = A("jxCases"), T = A("jxTests"), F = A("jxFactors"), VO = A("jxVoices"), FR = A("jxFreedom"), CT = RG.jxContra || {};
    var E = A("jxEvidence1").concat(A("jxEvidence2"), A("jxEvidence3"), A("jxEvidence4"), A("jxEvidence5"));
    return head("Love that protects", "Justice, conflict & call-out culture", "What to do about harassment, exploitation and danger; when to step in even at a cost; why people take revenge and how the cross breaks the cycle; why “exposing” culture and division grow, and how to correct and be corrected in love; and the contradictions at the heart of the legal gospel.") +
      '<nav class="jx-nav"><button type="button" data-jxgo="jx-harm">Harm & justice</button><button type="button" data-jxgo="jx-call">Call-out culture</button><button type="button" data-jxgo="jx-free">Freedom & contradictions</button></nav>' +
      '<div id="jx-harm"></div>' +
      (D.length ? '<section class="section"><h2>When you see someone in trouble: the 5 Ds</h2><p class="note">Five safe ways to step in, from the bystander-intervention framework popularised by Right To Be. Safety first: if anyone is in immediate danger, call your local emergency services.</p><div class="jx-d">' + D.map(function (d, i) { return '<button type="button" class="jx-db' + (i === jxD ? " on" : "") + '" data-jxd="' + i + '"><b>' + esc(d.label.charAt(0)) + "</b><span>" + esc(d.label) + "</span></button>"; }).join("") + '</div><div id="jxd-card"></div></section>' : "") +
      (SC.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>What would love do here?</h2><span class="count" id="jxs-score"></span></div><p class="note">Real situations. Choose a response, then see why.</p><div class="chips" id="jxs-tabs"></div><div id="jxs-card"></div></section>' : "") +
      (H.length ? '<section class="section"><h2>If you are being harassed</h2><div class="jx-steps" id="jx-steps">' + H.map(function (h, i) { return '<button type="button" class="jx-step' + (i <= jxH ? " done" : "") + (i === jxH ? " on" : "") + '" data-jxh="' + i + '"><b>' + (i + 1) + "</b><span>" + esc(h.step) + "</span></button>"; }).join("") + '</div><div id="jxh-card"></div></section>' : "") +
      ((R.cycle || []).length ? '<section class="section"><h2>Why people take revenge, and how the cross breaks the cycle</h2><div class="su-toggle" role="group" aria-label="Choose a ring"><button type="button" class="s" data-jxr="cycle" aria-pressed="' + (jxRing === "cycle") + '">The revenge cycle</button><button type="button" class="u" data-jxr="cross" aria-pressed="' + (jxRing === "cross") + '">The cross breaks it</button></div><div class="jx-ringwrap"><div class="jx-ring" id="jx-ring"></div><div id="jxr-card"></div></div></section>' : "") +
      (CS.length ? '<section class="section"><h2>Case studies and solutions</h2><p class="note">Composite stories, not real people.</p><div class="chips">' + CS.map(function (c, i) { return '<button class="chip" type="button" data-jxc="' + i + '" aria-pressed="' + (i === jxCase ? "true" : "false") + '">' + esc(c.title) + "</button>"; }).join("") + '</div><div id="jxc-card"></div></section>' : "") +
      qxSection("jxq1", A("jxQA1"), "Harm, justice and revenge: the deep questions") +
      '<div id="jx-call"></div>' +
      (T.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Is this correction biblical?</h2><span class="count" id="jxt-score"></span></div><p class="note">Think of a call-out you have seen, or one you want to make. Tick each test it passes.</p><div class="pa-meter"><i id="jxt-meter"></i></div><div class="pa-tests">' + T.map(function (x) { return '<label class="pa-test"><input type="checkbox" data-jxt="' + esc(x.id) + '"' + (jxT[x.id] ? " checked" : "") + '><span><b>' + esc(x.test) + '</b> <span class="ref">' + esc(x.ref) + "</span><small>" + x.why + "</small></span></label>"; }).join("") + '</div><div id="jxt-out"></div></section>' : "") +
      (F.length ? '<section class="section"><h2>Why call-out culture grows</h2><p class="note">These patterns appear in every camp, not only one. Each has a healthy version.</p><div class="grid">' + F.map(function (f, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><h3>' + esc(f.label) + "</h3><p>" + f.text + '</p><p style="font-size:14.5px;color:var(--muted)"><strong>Where it shows up:</strong> ' + f.cuts + '</p><div class="panel uni"><div class="label">The healthy version</div><p>' + f.healthy + "</p></div></article>"; }).join("") + "</div></section>" : "") +
      (VO.length ? '<section class="section"><h2>Engaging common kinds of online critics</h2><p class="note">Four common kinds of apologetics and discernment voices: what each focuses on, what such work gets right, and how to engage any critique respectfully. This is not a judgement of anyone’s heart or motives.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + VO.map(function (v) { return '<article class="lvpp"><h3>' + esc(v.name) + '</h3><div class="ref">' + esc(strip(v.tradition)) + '</div><p style="font-size:15.5px">' + v.focus + '</p><div class="panel gold"><div class="label">What their work gets right</div><p>' + v.right + '</p></div><div class="panel uni"><div class="label">How to engage</div><p>' + v.engage + "</p></div>" + (v.url ? '<a class="ref" href="' + esc(v.url) + '" target="_blank" rel="noopener">Their own words ↗</a>' : "") + "</article>"; }).join("") + "</div></section>" : "") +
      qxSection("jxq2", A("jxQA2"), "Exposing, division and criticism: the deep questions") +
      '<div id="jx-free"></div>' +
      (FR.length ? '<section class="section"><h2>Set free from… or not?</h2><p class="note">What Christ set us free from, how performance religion often takes it back, and the relational answer.</p>' + cmode("jxfr", 0, 0, "Legal gospel in practice", "Relational gospel") + '<div class="cmp-list mode-both" id="jxfr">' + FR.map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="panel gold"><div class="label">The promise</div><p>' + r.promise + '</p></div><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">Legal gospel in practice</div><p>' + r.legal + '</p></div><div class="panel uni cmp-r"><div class="label">Relational gospel</div><p>' + r.relational + '</p></div></div><div class="ref">' + esc((r.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      ((CT.legal || []).length ? '<section class="section"><h2>The contradiction, mapped</h2><p class="note">The popular legal message, step by step, beside the relational resolution. Red steps are where the tension appears.</p><div class="svfl"><div class="svfl-col legal"><div class="label">The popular legal message</div>' + CT.legal.map(function (s, i) { return (i ? '<div class="svfl-arrow in" aria-hidden="true">↓</div>' : "") + '<div class="svfl-step in k-' + esc(s.kind) + '"><b>' + esc(s.step) + "</b><p>" + s.text + "</p></div>"; }).join("") + '</div><div class="svfl-col rel"><div class="label">The relational resolution</div>' + (CT.relational || []).map(function (s, i) { return (i ? '<div class="svfl-arrow in" aria-hidden="true">↓</div>' : "") + '<div class="svfl-step in k-rest"><b>' + esc(s.step) + "</b><p>" + s.text + '</p><span class="ref">' + esc(strip(s.ref || "")) + "</span></div>"; }).join("") + "</div></div>" + ((CT.answers || []).length ? '<h3 style="margin-top:14px">How the traditions answer the tension</h3><div class="chips">' + CT.answers.map(function (a, i) { return '<button class="chip" type="button" data-jxa="' + i + '" aria-pressed="' + (i === jxAns) + '">' + esc(a.tradition) + "</button>"; }).join("") + '</div><div id="jxa-card"></div>' : "") + "</section>" : "") +
      qxSection("jxq3", A("jxQA3"), "The legal gospel’s confusion: the deep questions") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">If you or someone else is in danger, contact your local emergency services. For harassment or abuse, keep records and seek trusted, qualified help.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#forgive">Forgiveness & repair</a><a class="chip" href="#living">Living it out</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#debate">Debates & strawmen</a></div></section>';
  };
  function jxdShow() { var D = A("jx5D"), d = D[jxD]; if (!d || !$("#jxd-card")) return; $$(".jx-db").forEach(function (b, i) { b.classList.toggle("on", i === jxD); }); $("#jxd-card").innerHTML = '<article class="vph-card"><h3>' + esc(d.label) + "</h3><p>" + d.what + '</p><p style="font-size:15px"><strong>When it fits:</strong> ' + d.when + '</p><div class="panel sep"><div class="label">Stay safe</div><p>' + d.caution + '</p></div><p style="font-size:15px"><strong>Example:</strong> ' + d.example + '</p><div class="verse">' + d.ref + "</div></article>"; }
  function jxsShow() {
    var R = A("jxScenes"), r = R[jxS]; if (!r || !$("#jxs-card")) return;
    var n = 0, ok = 0; R.forEach(function (x) { if (jxSAns[x.id] != null) { n++; if (x.options[jxSAns[x.id]].verdict === "right") ok++; } });
    $("#jxs-score").textContent = n ? ok + " of " + n + " wise and loving" : R.length + " situations";
    $("#jxs-tabs").innerHTML = R.map(function (x, i) { return '<button class="chip" type="button" data-jxs="' + i + '" aria-pressed="' + (i === jxS) + '">' + (jxSAns[x.id] != null ? "✓ " : "") + (i + 1) + "</button>"; }).join("");
    var a = jxSAns[r.id], done = a != null;
    $("#jxs-card").innerHTML = '<article class="sc lvr' + (done ? " answered" : "") + '"><div class="label">Situation ' + (jxS + 1) + " of " + R.length + '</div><h3 style="font-size:21px">' + r.scenario + '</h3><div class="lvr-opts">' + r.options.map(function (o, j) { return '<button type="button" class="chip' + (o.verdict === "right" ? " right" : "") + '" data-jxo="' + j + '" aria-pressed="' + (a === j) + '">' + esc(o.label) + "</button>"; }).join("") + "</div>" +
      (done ? '<div class="sc-out"><div class="label">' + (r.options[a].verdict === "right" ? "Wise, safe and loving" : r.options[a].verdict === "partial" ? "Part of the way there" : "Love would choose differently") + "</div><p>" + r.options[a].why + "</p>" + r.options.filter(function (o, j) { return j !== a; }).map(function (o) { return '<p style="font-size:14.5px;color:var(--muted)"><strong>' + esc(o.label) + ":</strong> " + o.why + "</p>"; }).join("") + '</div><div class="panel uni"><div class="label">The way of Jesus</div><p>' + r.jesus + "</p></div>" : "") +
      '<div class="ref">' + esc((r.refs || []).join(" · ")) + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-jxsm="-1"' + (jxS === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-jxsm="1"' + (jxS === R.length - 1 ? " disabled" : "") + ">Next situation →</button></div></article>";
  }
  function jxhShow() { var H = A("jxHarass"), h = H[jxH]; if (!h || !$("#jxh-card")) return; $$(".jx-step").forEach(function (b, i) { b.classList.toggle("done", i <= jxH); b.classList.toggle("on", i === jxH); }); $("#jx-steps").style.setProperty("--p", (H.length > 1 ? jxH / (H.length - 1) * 100 : 100) + "%"); $("#jxh-card").innerHTML = '<article class="vph-card"><div class="label">Step ' + (jxH + 1) + " of " + H.length + "</div><h3>" + esc(h.step) + "</h3><p>" + h.text + '</p><div class="verse">' + h.ref + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-jxhm="-1"' + (jxH === 0 ? " disabled" : "") + '>← Back</button><button class="btn" type="button" data-jxhm="1"' + (jxH === H.length - 1 ? " disabled" : "") + ">Next step →</button></div></article>"; }
  function jxrShow() {
    var R = RG.jxRevenge || {}, L = R[jxRing] || []; if (!$("#jx-ring") || !L.length) return;
    $$("[data-jxr]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.jxr === jxRing)); });
    jxRi = Math.min(jxRi, L.length - 1);
    $("#jx-ring").className = "jx-ring r-" + jxRing;
    $("#jx-ring").innerHTML = '<div class="jx-orbit" aria-hidden="true"></div><div class="jx-core">' + (jxRing === "cycle" ? "Revenge" : "The cross") + "</div>" + L.map(function (s, i) { var ang = -Math.PI / 2 + i / L.length * Math.PI * 2; return '<button type="button" class="jx-node' + (i === jxRi ? " on" : "") + '" data-jxri="' + i + '" style="left:' + (50 + 38 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 38 * Math.sin(ang)).toFixed(1) + '%"><b>' + (i + 1) + "</b>" + esc(s.label) + "</button>"; }).join("");
    var s = L[jxRi]; $("#jxr-card").innerHTML = '<article class="vph-card"><div class="label">' + (jxRing === "cycle" ? "The revenge cycle" : "How the cross breaks it") + " · " + (jxRi + 1) + " of " + L.length + "</div><h3>" + esc(s.label) + "</h3><p>" + s.text + "</p>" + (s.ref ? '<div class="verse">' + s.ref + "</div>" : "") + "</article>";
  }
  function jxcShow() { var C = A("jxCases"), c = C[jxCase]; if (!c || !$("#jxc-card")) return; $$("[data-jxc]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.jxc === jxCase)); }); $("#jxc-card").innerHTML = '<article class="vph-card"><h3>' + esc(c.title) + "</h3><p>" + c.story + '</p><div class="cmp-pair"><div class="panel sep"><div class="label">Where the legal gospel goes wrong</div><p>' + c.legal + '</p></div><div class="panel uni"><div class="label">The relational solution</div><p>' + c.relational + '</p></div></div><ol class="steps">' + (c.steps || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol></article>"; }
  function jxtShow() { var T = A("jxTests"); if (!$("#jxt-meter")) return; var n = T.filter(function (x) { return jxT[x.id]; }).length, pct = T.length ? n / T.length : 0; $("#jxt-meter").style.width = (pct * 100).toFixed(0) + "%"; $("#jxt-meter").className = pct === 1 ? "full" : pct >= 0.7 ? "good" : ""; $("#jxt-score").textContent = n + " of " + T.length; $("#jxt-out").innerHTML = n === 0 ? "" : '<div class="panel ' + (pct === 1 ? "uni" : pct >= 0.7 ? "gold" : "sep") + '"><p>' + (pct === 1 ? "This looks like biblical correction: truthful, humble, proportionate and aimed at restoration and protection. Speak it, then leave room for God to work." : pct >= 0.7 ? "Much here is healthy. Look again at the tests it misses before speaking publicly; a private word or a gentler tone may be all that is needed." : "Pause. Correction that skips private conversation, distorts, mocks or builds a brand is more likely to wound than to heal. Pray, check the facts, talk to the person or to wise friends first.") + "</p></div>"; }
  function jxaShow() { var A2 = (RG.jxContra || {}).answers || [], a = A2[jxAns]; if (!a || !$("#jxa-card")) return; $$("[data-jxa]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.jxa === jxAns)); }); $("#jxa-card").innerHTML = '<article class="vph-card"><h3>' + esc(a.tradition) + "</h3><p>" + a.answer + "</p></article>"; }

  /* ---------- The life is in the blood ---------- */
  var blS = 0, blT = null, blP = 1, blSt = 0, blV = 3;
  var BLPOS = { heart: [320, 170], lungs: [320, 42], arteries: [520, 200], cells: [470, 318], veins: [170, 318], kidneys: [118, 205], liver: [210, 245], marrow: [430, 262], wound: [600, 300] };
  var BLA = "M320 170 C 560 170, 590 330, 320 335 C 50 330, 80 170, 320 170", BLB = "M320 170 C 190 170, 190 42, 320 42 C 450 42, 450 170, 320 170";
  V.blood = function () {
    var P = A("blParts"), S = A("blStations"), F = A("blFacts"), ST = A("blStory"), W = A("blWords"), VW = A("blViews");
    var E = A("blEvidence1").concat(A("blEvidence2"), A("blEvidence3"));
    var tot = P.reduce(function (a, p) { return a + Math.max(p.pct, 6); }, 0);
    return head("Design of creation", "The life is in the blood", "How blood is designed to carry life, cleanse, defend and heal every cell of the body, and why Scripture says “the life of the flesh is in the blood”. From Abel to the Passover, the Day of Atonement and the cup of the new covenant: what blood meant in its world, and how Jesus’s blood cleanses, heals and unites. (Biological parallels are offered as pictures, not proofs.)") +
      (S.length ? '<section class="section"><h2>The journey of blood</h2><p class="note">Watch blood circulate. Tap any station, or follow one cell on its journey.</p><div class="bl-map" id="bl-map"><svg viewBox="0 0 680 370" aria-hidden="true"><path d="' + BLA + '" class="bl-loop body"/><path d="' + BLB + '" class="bl-loop lung"/>' +
        [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) { return '<circle r="5" class="bl-cell ' + (k % 2 ? "blue" : "red") + '"><animateMotion dur="9s" repeatCount="indefinite" begin="-' + (k * 1.125).toFixed(2) + 's" path="' + BLA + '"/></circle>'; }).join("") +
        [0, 1, 2, 3].map(function (k) { return '<circle r="4.5" class="bl-cell ' + (k % 2 ? "red" : "blue") + '"><animateMotion dur="5s" repeatCount="indefinite" begin="-' + (k * 1.25).toFixed(2) + 's" path="' + BLB + '"/></circle>'; }).join("") +
        S.map(function (s, i) { var p = BLPOS[s.id] || [320, 170]; return '<g class="bl-st' + (s.id === "heart" ? " heart" : "") + '" data-bls="' + i + '" tabindex="0" role="button" aria-label="' + esc(s.label) + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (s.id === "heart" ? 24 : 15) + '"/><text x="' + p[0] + '" y="' + (p[1] + (s.id === "heart" ? 42 : 30)) + '" text-anchor="middle">' + esc(s.label.toUpperCase()) + "</text></g>"; }).join("") +
        '</svg><div class="row"><button class="btn" type="button" id="bl-play">Follow one cell</button><span class="count" id="bl-cnt"></span></div><div id="bl-card"></div></div></section>' : "") +
      (P.length ? '<section class="section"><h2>What blood is made of</h2><p class="note">Tap each part. (White cells and platelets are less than 1% of the volume; they are widened here so you can tap them.)</p><div class="bl-bar">' + P.map(function (p, i) { return '<button type="button" class="bl-seg s-' + esc(p.id) + (i === blP ? " on" : "") + '" data-blp="' + i + '" style="flex:' + (Math.max(p.pct, 6) / tot * 100).toFixed(1) + '"><b>' + esc(p.label) + "</b><small>" + (p.pct >= 1 ? "~" + p.pct + "%" : "&lt;1%") + "</small></button>"; }).join("") + '</div><div id="bl-pcard"></div></section>' : "") +
      blWasteHTML() +
      (F.length ? '<section class="section"><h2>Wonder in numbers</h2><div class="bl-facts">' + F.map(function (f, i) { return '<article class="bl-fact" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"><b>' + esc(f.num) + "</b><span>" + esc(f.label) + "</span><p>" + f.text + '</p><a class="ref" href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.source) + " ↗</a></article>"; }).join("") + "</div></section>" : "") +
      (ST.length ? '<section class="section"><h2>The scarlet thread through Scripture</h2><p class="note">Fourteen moments where blood appears in the story. Tap one to see its world, its meaning, and how it points to Jesus.</p><div class="bl-thread">' + ST.map(function (s, i) { return '<button type="button" class="bl-tm' + (i === blSt ? " on" : "") + '" data-blt="' + i + '"><i aria-hidden="true"></i><b>' + esc(s.title) + '</b><span class="ref">' + esc(s.ref) + "</span>" + (i === blSt ? '<div class="bl-tm-in"><p>' + s.scene + '</p><div class="panel gold"><div class="label">In its world</div><p>' + s.culture + '</p></div><div class="panel uni"><div class="label">Through the relational lens</div><p>' + s.relational + '</p></div><p style="font-size:15px"><strong>In Christ:</strong> ' + s.fulfilled + "</p></div>" : "") + "</button>"; }).join("") + "</div></section>" : "") +
      (W.length ? '<section class="section"><h2>The words</h2><div class="grid">' + W.map(function (w, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><div class="orig">' + esc(w.word) + "</div><h3>" + esc(w.translit) + ' <span class="ref">' + esc(w.lang + " · " + w.gloss) + "</span></h3><p>" + w.meaning + '</p><div class="verse">' + w.example + "</div></article>"; }).join("") + "</div></section>" : "") +
      (VW.length ? '<section class="section"><h2>How does the blood of Christ save?</h2><p class="note">Four readings Christians hold, each with its strength and weakness.</p><div class="lvp"><div class="lvp-track bl-track"><i id="blv-dot"></i></div><div class="lvp-stops">' + VW.map(function (v, i) { return '<button type="button" class="chip" data-blv="' + i + '" aria-pressed="' + (i === blV) + '">' + esc(v.label) + "</button>"; }).join("") + '</div><div id="blv-card"></div></div></section>' : "") +
      qxSection("blq", A("blQA")) +
      qxSection("blwq", A("blWasteQA"), "The cleansing system: two more questions") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#why">The why of design</a><a class="chip" href="#design">Made for each other</a><a class="chip" href="#law">Why God gave the Law</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#love">God is love: one nature</a></div></section>';
  };
  function blShow() {
    var S = A("blStations"), s = S[blS]; if (!s || !$("#bl-card")) { clearInterval(blT); return; }
    $$(".bl-st").forEach(function (g, i) { g.classList.toggle("on", i === blS); });
    $("#bl-cnt").textContent = "Station " + (blS + 1) + " of " + S.length;
    $("#bl-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(s.label) + '</div><div class="cmp-pair"><div class="panel gold"><div class="label">The design</div><p>' + s.body + '</p></div><div class="panel uni"><div class="label">A picture of the gospel</div><p>' + s.parallel + '</p></div></div><div class="verse">' + s.ref + "</div></article>";
  }
  function blpShow() {
    var P = A("blParts"), p = P[blP]; if (!p || !$("#bl-pcard")) return;
    $$(".bl-seg").forEach(function (b, i) { b.classList.toggle("on", i === blP); });
    $("#bl-pcard").innerHTML = '<article class="vph-card"><h3>' + esc(p.label) + "</h3><p>" + p.body + '</p><div class="panel uni"><div class="label">A picture of the gospel</div><p>' + p.parallel + '</p></div><div class="verse">' + p.ref + "</div></article>";
  }
  function blvShow() {
    var VW = A("blViews"), v = VW[blV]; if (!v || !$("#blv-card")) return;
    $$("[data-blv]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.blv === blV)); });
    $("#blv-dot").style.left = (VW.length > 1 ? blV / (VW.length - 1) * 100 : 50) + "%";
    $("#blv-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(strip(v.who)) + "</div><h3>" + esc(v.label) + "</h3><p>" + v.view + '</p><div class="ref">' + esc(strip(v.texts)) + '</div><div class="cmp-pair"><div class="panel uni"><div class="label">Strength</div><p>' + v.strength + '</p></div><div class="panel sep"><div class="label">Weakness</div><p>' + v.weakness + "</p></div></div></article>";
  }

  /* ---------- Doxa: glory and identity ---------- */
  var dxP = 0, dxTab = "big", dxRead = {}, dxVeil = false, dxG = 0, dxSt = 0, dxStT = null, dxQ = 0, dxQA = {};
  var DXT = [["big", "Big idea"], ["points", "Key teachings"], ["stories", "Stories"], ["words", "Words"], ["questions", "Questions"], ["practice", "Practice"], ["scriptures", "Scriptures"], ["reflect", "Reflect"]];
  function dxAll() { return A("dxParts1").concat(A("dxParts2")).sort(function (a, b) { return a.n - b.n; }); }
  V.doxa = function () {
    RG.dxParts = dxAll();
    var P = RG.dxParts, I = RG.dxIntro || {}, G = A("dxGlories"), S = A("dxSteps"), W = A("dxWords"), SH = A("dxShifts"), Q = A("dxQuiz"), E = A("dxEvidence");
    return head("A series on glory and identity", "Doxa: from glory to glory", (I.key ? esc(strip(I.key)) + " " : "") + "A five-part series on 2 Corinthians 3, glory (doxa), perspective and doubt, condensed and made interactive.") +
      '<section class="section"><div class="dx-hero' + (dxVeil ? " lifted" : "") + '" id="dx-hero"><svg viewBox="0 0 260 300" aria-hidden="true"><defs><radialGradient id="dxg"><stop offset="0" stop-color="#fff6dc"/><stop offset=".45" stop-color="#e0ae55" stop-opacity=".85"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs><circle cx="130" cy="140" r="125" fill="url(#dxg)" class="dx-shine"/><ellipse cx="130" cy="140" rx="92" ry="120" class="dx-frame"/><ellipse cx="130" cy="140" rx="82" ry="110" class="dx-pane"/><circle cx="130" cy="112" r="30" class="dx-face"/><path d="M80 210 Q130 160 180 210" class="dx-face"/><rect x="34" y="18" width="192" height="250" rx="40" class="dx-veil"/></svg><div class="dx-copy"><div class="label">2 Corinthians 3:18</div><p class="dx-verse">“But we all, with unveiled face seeing the glory of the Lord as in a mirror, are transformed into the same image from glory to glory, even as from the Lord, the Spirit.”</p><button class="btn" type="button" id="dx-veil">' + (dxVeil ? "Veil again" : "Lift the veil") + "</button></div></div>" + ((I.summary || []).length ? '<div class="panel gold" style="margin-top:14px"><div class="label">The series in brief</div>' + I.summary.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" : "") + "</section>" +
      (G.length ? '<section class="section"><h2>Two glories</h2><p class="note">Drag the slider: the glory that was fading gives way to the glory that remains (2 Corinthians 3:7-11).</p><input type="range" id="dx-gr" min="0" max="100" value="' + dxG + '" aria-label="From fading glory to surpassing glory"><div class="dx-gl" id="dx-gl" style="--t:' + (dxG / 100) + '">' + G.map(function (g) { return '<article class="dx-row"><div class="dx-l"><small>' + esc(g.label) + "</small><b>" + esc(g.left) + '</b></div><div class="dx-arrow" aria-hidden="true">→</div><div class="dx-r"><small>' + esc(g.label) + "</small><b>" + esc(g.right) + '</b></div><p class="dx-note">' + g.note + ' <span class="ref">' + esc(strip(g.ref)) + "</span></p></article>"; }).join("") + "</div></section>" : "") +
      (S.length ? '<section class="section"><h2>From glory to glory</h2><p class="note">Climb the stairs. Tap a step or watch the journey.</p><div class="dx-stairs" id="dx-stairs">' + S.map(function (s, i) { return '<button type="button" class="dx-st' + (i <= dxSt ? " lit" : "") + (i === dxSt ? " on" : "") + '" data-dxs="' + i + '" style="--i:' + i + '"><b>' + (i + 1) + "</b><span>" + esc(s.label) + "</span></button>"; }).join("") + '</div><div class="row"><button class="btn" type="button" id="dx-play">Climb the stairs</button></div><div id="dxs-card"></div></section>' : "") +
      (P.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>The series, part by part</h2><span class="count" id="dx-count"></span></div><div class="de-rail" id="dx-rail"></div><div id="dx-card"></div></section>' : "") +
      (SH.length ? '<section class="section"><h2>Shift your perspective</h2><p class="note">Tap each card to turn an old way of seeing into the new.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))">' + SH.map(function (s) { return '<button type="button" class="flip dx-sh" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">Old lens</div><h3>“' + esc(s.from) + '”</h3><span class="note" style="font-size:14px">Tap to shift</span></div><div class="flip-face back"><div class="label">New lens</div><h3 style="font-size:20px">“' + esc(s.to) + '”</h3><p style="font-size:15px">' + s.why + '</p><div class="ref">' + esc(strip(s.ref)) + "</div></div></div></button>"; }).join("") + "</div></section>" : "") +
      (W.length ? '<section class="section"><h2>Words behind the series</h2><div class="grid">' + W.map(function (w, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><h3>' + esc(w.word) + ' <span class="ref">' + esc(w.lang + " · " + w.gloss) + "</span></h3><p>" + w.meaning + '</p><div class="ref">' + esc(strip(w.ref || "")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (Q.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Check your understanding</h2><span class="count" id="dxq-score"></span></div><div id="dxq-card"></div></section>' : "") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">This section condenses a sermon series in our own words; Scripture is quoted from the World English Bible.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#embrace">The Divine Embrace</a><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#embodied">The Embodied Gospel</a></div></section>';
  };
  function dxStepShow() { var S = A("dxSteps"), s = S[dxSt]; if (!s || !$("#dxs-card")) { clearInterval(dxStT); return; } $$(".dx-st").forEach(function (b, i) { b.classList.toggle("lit", i <= dxSt); b.classList.toggle("on", i === dxSt); }); $("#dxs-card").innerHTML = '<article class="vph-card"><div class="label">Step ' + (dxSt + 1) + " of " + S.length + "</div><h3>" + esc(s.title) + "</h3><p>" + s.text + '</p><div class="ref">' + esc(strip(s.ref)) + "</div></article>"; }
  function dxShow() {
    var P = RG.dxParts || [], c = P[dxP]; if (!c || !$("#dx-rail")) return;
    dxRead[c.id] = true; $("#dx-count").textContent = Object.keys(dxRead).length + " of " + P.length + " parts opened";
    $("#dx-rail").innerHTML = P.map(function (x, i) { return '<button type="button" class="de-dot' + (i === dxP ? " on" : "") + (dxRead[x.id] ? " read" : "") + '" data-dxp="' + i + '"><b>' + x.n + "</b><span>" + esc(x.title) + "</span></button>"; }).join("");
    var body = "";
    if (dxTab === "big") body = '<p class="de-big">' + c.big + "</p><p>" + c.summary + "</p>";
    if (dxTab === "points") body = '<div class="de-pts">' + (c.points || []).map(function (p, i) { return '<div class="de-pt" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><b>' + esc(p.head) + "</b><p>" + p.text + "</p></div>"; }).join("") + "</div>";
    if (dxTab === "stories") body = (c.illustrations || []).length ? c.illustrations.map(function (s) { return '<div class="panel gold"><div class="label">' + esc(s.title) + "</div><p>" + s.text + "</p></div>"; }).join("") : '<p class="note">No featured story in this part.</p>';
    if (dxTab === "words") body = (c.words || []).length ? '<div class="grid">' + c.words.map(function (w) { return '<article class="gterm"><h3>' + esc(w.word) + "</h3><p>" + w.meaning + "</p></article>"; }).join("") + "</div>" : '<p class="note">No word studies in this part.</p>';
    if (dxTab === "questions") body = '<div class="qa">' + (c.questions || []).map(function (q, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + q.q + '</summary><div class="ans"><p style="color:var(--ink)">' + q.a + "</p></div></details>"; }).join("") + "</div>";
    if (dxTab === "practice") body = '<ol class="steps">' + (c.practice || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>";
    if (dxTab === "scriptures") body = '<div class="chips">' + (c.scriptures || []).map(function (r) { return '<span class="chip">' + esc(r) + "</span>"; }).join("") + "</div>";
    if (dxTab === "reflect") body = '<div class="panel uni"><div class="label">Pause and reflect</div><p style="font-size:19px">' + c.reflect + "</p></div>";
    $("#dx-card").innerHTML = '<article class="de-card"><div class="row" style="justify-content:space-between"><div class="label">Part ' + c.n + " of " + P.length + "</div>" + saveBtn("dxpart", c.id) + "</div><h3>" + esc(c.title) + '</h3><div class="chips de-tabs">' + DXT.map(function (t) { return '<button class="chip" type="button" data-dxtab="' + t[0] + '" aria-pressed="' + (dxTab === t[0]) + '">' + t[1] + "</button>"; }).join("") + '</div><div class="de-body">' + body + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-dxpm="-1"' + (dxP === 0 ? " disabled" : "") + '>← Previous part</button><button class="btn" type="button" data-dxpm="1"' + (dxP === P.length - 1 ? " disabled" : "") + ">Next part →</button></div></article>";
  }
  function dxqShow() {
    var Q = A("dxQuiz"), q = Q[dxQ]; if (!q || !$("#dxq-card")) return;
    var n = 0, r = 0; Q.forEach(function (x) { if (dxQA[x.id] != null) { n++; if (dxQA[x.id] === x.answer) r++; } }); $("#dxq-score").textContent = n ? r + " of " + n + " correct" : Q.length + " questions";
    var a = dxQA[q.id], done = a != null;
    $("#dxq-card").innerHTML = '<article class="sc' + (done ? " answered" : "") + '"><div class="label">Question ' + (dxQ + 1) + " of " + Q.length + '</div><h3 style="font-size:20px">' + q.q + '</h3><div class="lvr-opts">' + q.options.map(function (o, j) { return '<button type="button" class="chip' + (j === q.answer ? " right" : "") + '" data-dxo="' + j + '" aria-pressed="' + (a === j) + '">' + esc(o) + "</button>"; }).join("") + "</div>" + (done ? '<div class="sc-out"><div class="label">' + (a === q.answer ? "Correct" : "Not quite") + "</div><p>" + q.why + "</p></div>" : "") + '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-dxqm="-1"' + (dxQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-dxqm="1"' + (dxQ === Q.length - 1 ? " disabled" : "") + ">Next →</button></div></article>";
  }

  /* ---------- Deep studies (data-driven: RG.studies) ---------- */
  var SS = {}, SQ = {}, SR = {};
  function stSel(v, bi, n) { var k = v + "|" + bi; return Math.max(0, Math.min(n - 1, SS[k] == null ? 0 : SS[k])); }
  function stRef(r) { return r ? '<div class="ref">' + esc(r) + "</div>" : ""; }
  function stHead(b) { return (b.title ? "<h2>" + esc(b.title) + "</h2>" : "") + (b.note ? '<p class="note">' + b.note + "</p>" : ""); }
  function stCard(x) { return '<article class="vph-card">' + (x.kicker ? '<div class="label">' + esc(x.kicker) + "</div>" : "") + "<h3>" + esc(x.label || x.title || x.word || "") + "</h3>" + (x.text ? "<p>" + x.text + "</p>" : "") + (x.now ? '<div class="cmp-pair"><div class="panel uni"><div class="label">Now</div><p>' + x.now + '</p></div><div class="panel gold"><div class="label">Not yet</div><p>' + x.later + "</p></div></div>" : "") + (x.father ? '<div class="panel"><div class="label">From the church fathers</div><p>' + x.father + "</p></div>" : "") + (x.note ? '<div class="panel gold"><div class="label">Keep in balance</div><p>' + x.note + "</p></div>" : "") + stRef(x.ref) + "</article>"; }
  var STB = {
    prism: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), n = b.items.length;
      return stHead(b) + '<div class="st-prism"><div class="st-core"><span>' + esc(b.center || "") + "</span></div><div class=\"st-facets\">" + b.items.map(function (x, j) { return '<button type="button" class="st-facet' + (j === i ? " on" : "") + '" style="--h:' + Math.round(j / n * 330) + '" data-sx="' + v + "|" + bi + "|" + j + '"><b>' + (j + 1) + "</b>" + esc(x.label) + "</button>"; }).join("") + "</div></div>" + stCard(b.items[i]);
    },
    ring: function (v, bi, b) {
      var all = [b.center].concat(b.items), i = stSel(v, bi, all.length), ring = b.items;
      return stHead(b) + '<div class="jx-ringwrap"><div class="rc-loopring relational"><div class="jx-orbit" aria-hidden="true"></div><button type="button" class="rc-root' + (i === 0 ? " on" : "") + '" data-sx="' + v + "|" + bi + '|0">' + esc(b.center.label) + "</button>" + ring.map(function (s, j) { var ang = -Math.PI / 2 + j / ring.length * Math.PI * 2; return '<button type="button" class="jx-node' + (j + 1 === i ? " on" : "") + '" data-sx="' + v + "|" + bi + "|" + (j + 1) + '" style="left:' + (50 + 39 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 39 * Math.sin(ang)).toFixed(1) + '%">' + esc(s.label) + "</button>"; }).join("") + "</div>" + stCard(all[i]) + "</div>";
    },
    flow: function (v, bi, b) {
      var i = stSel(v, bi, b.steps.length);
      return stHead(b) + '<div class="row"><button class="btn" type="button" data-sxp="' + v + "|" + bi + '">▶ Play the story</button></div><div class="st-flow">' + b.steps.map(function (s, j) { return '<button type="button" class="st-step' + (j === i ? " on" : "") + (j < i ? " past" : "") + '" data-sx="' + v + "|" + bi + "|" + j + '"><i>' + (j + 1) + "</i><span><b>" + esc(s.label) + "</b>" + (s.tag ? "<small>" + esc(s.tag) + "</small>" : "") + "</span></button>"; }).join("") + "</div>" + stCard(b.steps[i]);
    },
    columns: function (v, bi, b) {
      return stHead(b) + '<div class="rc-sk' + (b.cols.length === 2 ? " c2" : "") + '">' + b.cols.map(function (c) { return '<div class="rc-col ' + esc(c.cls || "") + '"><div class="label">' + esc(c.label) + "</div>" + c.steps.map(function (s, j) { return (j ? '<div class="rc-arrow" aria-hidden="true">↓</div>' : "") + '<div class="rc-step k-' + esc(s.k || "ok") + '" style="animation-delay:' + (j * 0.07).toFixed(2) + 's"><b>' + esc(s.s) + "</b><p>" + s.t + "</p></div>"; }).join("") + "</div>"; }).join("") + "</div>";
    },
    words: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), w = b.items[i];
      return stHead(b) + '<div class="chips">' + b.items.map(function (x, j) { return '<button class="chip" type="button" data-sx="' + v + "|" + bi + "|" + j + '" aria-pressed="' + (j === i) + '">' + esc(x.word) + "</button>"; }).join("") + '</div><article class="vph-card"><div class="label">' + esc(w.lang) + " · " + esc(w.gloss) + "</div><h3>" + esc(w.word) + "</h3><p>" + w.meaning + "</p>" + (w.note ? '<div class="panel gold"><div class="label">Note</div><p>' + w.note + "</p></div>" : "") + stRef(w.ref) + "</article>";
    },
    timeline: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), t = b.items[i];
      return stHead(b) + (b.legend ? '<p class="note">' + b.legend.map(function (l) { return '<span class="rc-key ' + esc(l[0]) + '">' + esc(l[1]) + "</span>"; }).join(" ") + "</p>" : "") + '<div class="rc-time">' + b.items.map(function (x, j) { return '<button type="button" class="rc-tn ' + esc(x.kind || "") + (j === i ? " on" : "") + '" data-sx="' + v + "|" + bi + "|" + j + '"><small>' + esc(x.year) + "</small><span>" + esc(x.label) + "</span></button>"; }).join("") + '</div><article class="vph-card"><div class="label">' + esc(t.year) + "</div><h3>" + esc(t.label) + "</h3><p>" + t.text + "</p>" + stRef(t.ref) + "</article>";
    },
    quotes: function (v, bi, b) {
      return stHead(b) + '<div class="st-quotes">' + b.items.map(function (q, j) { return '<figure class="st-quote" style="animation-delay:' + (j * 0.05).toFixed(2) + 's"><blockquote>' + q.quote + "</blockquote><figcaption><b>" + esc(q.who) + "</b> · " + esc(q.work) + "</figcaption>" + (q.comment ? "<p>" + q.comment + "</p>" : "") + (q.url ? '<a href="' + esc(q.url) + '" target="_blank" rel="noopener">Read the source ↗</a>' : "") + "</figure>"; }).join("") + "</div>";
    },
    cards: function (v, bi, b) {
      return stHead(b) + '<div class="grid">' + b.items.map(function (x, j) { return '<article class="gterm" style="animation-delay:' + (j * 0.04).toFixed(2) + 's"><h3>' + esc(x.title) + "</h3><p>" + x.text + "</p>" + stRef(x.ref) + "</article>"; }).join("") + "</div>";
    },
    compare: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), x = b.items[i], cls = ["sep", "gold", "uni"];
      return stHead(b) + '<div class="chips">' + b.items.map(function (y, j) { return '<button class="chip" type="button" data-sx="' + v + "|" + bi + "|" + j + '" aria-pressed="' + (j === i) + '">' + esc(y.topic) + "</button>"; }).join("") + '</div><article class="vph-card"><h3>' + esc(x.topic) + "</h3>" + (x.intro ? '<p style="color:var(--ink)">' + x.intro + "</p>" : "") + '<div class="rc-three">' + b.labels.map(function (l, k) { return '<div class="panel ' + cls[k % 3] + '"><div class="label">' + esc(l) + "</div><p>" + x.cols[k] + "</p></div>"; }).join("") + "</div>" + stRef(x.ref) + "</article>";
    },
    args: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), a = b.items[i];
      return stHead(b) + '<div class="chips">' + b.items.map(function (y, j) { return '<button class="chip" type="button" data-sx="' + v + "|" + bi + "|" + j + '" aria-pressed="' + (j === i) + '">' + (j + 1) + "</button>"; }).join("") + '</div><article class="vph-card"><div class="label">Question ' + (i + 1) + " of " + b.items.length + '</div><div class="panel sep"><div class="label">The objection</div><p>“' + a.arg + '”</p></div><div class="panel gold"><div class="label">What is true in it</div><p>' + a.truth + '</p></div><div class="panel uni"><div class="label">The answer</div><p>' + a.answer + "</p></div>" + stRef(a.ref) + '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-sxm="' + v + "|" + bi + '|-1"' + (i === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-sxm="' + v + "|" + bi + '|1"' + (i === b.items.length - 1 ? " disabled" : "") + ">Next →</button></div></article>";
    },
    reveal: function (v, bi, b) {
      var k = v + "|" + bi, n = SR[k] || 0;
      return stHead(b) + '<div class="st-reveal">' + (b.intro ? '<p class="st-rintro">' + b.intro + "</p>" : "") + b.items.slice(0, n).map(function (x, j) { return '<div class="st-rline" style="animation-delay:' + (j === n - 1 ? 0 : 0) + 's"><b>' + esc(x.label) + "</b><p>" + x.text + "</p>" + stRef(x.ref) + "</div>"; }).join("") + '<div class="row">' + (n < b.items.length ? '<button class="btn" type="button" data-sxr="' + k + '">' + esc(b.button || "Reveal the next line") + " (" + (n + 1) + "/" + b.items.length + ")</button>" : '<button class="btn ghost" type="button" data-sxr0="' + k + '">Start again</button>') + "</div></div>";
    },
    quiz: function (v, bi, b) {
      var k = v + "|" + bi, ans = SQ[k] || {}, ok = 0, done = 0;
      b.items.forEach(function (q, j) { if (ans[j] != null) { done++; if (ans[j] === q.answer) ok++; } });
      return '<div class="row" style="justify-content:space-between">' + stHead(b) + '<span class="count">' + (done ? ok + " of " + done + " correct" : b.items.length + " questions") + '</span></div><div class="st-quiz">' + b.items.map(function (q, j) { var a = ans[j]; return '<article class="st-q' + (a != null ? (a === q.answer ? " right" : " wrong") : "") + '"><h3>' + (j + 1) + ". " + esc(q.q) + '</h3><div class="lvr-opts">' + q.options.map(function (o, m) { return '<button type="button" class="chip' + (a != null && m === q.answer ? " right" : "") + '" data-sxq="' + k + "|" + j + "|" + m + '" aria-pressed="' + (a === m) + '">' + esc(o) + "</button>"; }).join("") + "</div>" + (a != null ? '<p class="st-why">' + q.why + "</p>" : "") + "</article>"; }).join("") + "</div>";
    },
    data: function (v, bi, b) {
      return stHead(b) + '<div class="rc-data">' + b.items.map(function (d, i) { return '<article class="rc-stat" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><div class="rc-num">' + esc(d.value) + "</div><h3>" + esc(d.label) + "</h3>" + (d.bars ? '<div class="rc-bars">' + d.bars.map(function (x) { return '<div class="rc-bar"><span>' + esc(x.label) + '</span><div class="rc-track"><i style="--w:' + Math.max(2, Math.min(100, x.pct)) + '%"></i></div><b>' + esc(x.show || x.pct + "%") + "</b></div>"; }).join("") + "</div>" : "") + "<p>" + d.text + "</p>" + (d.meaning ? '<div class="panel uni"><div class="label">What it means</div><p>' + d.meaning + "</p></div>" : "") + '<div class="ref">' + esc(d.source) + "</div></article>"; }).join("") + "</div>";
    },
    evidence: function (v, bi, b) { return stHead(b) + evGrid(b.items); },
    decide: function (v, bi, b) {
      var k = v + "|" + bi, path = SS[k + "|path"] || [b.start], cur = b.nodes[path[path.length - 1]], ch = SS[k + "|ch"] || [];
      var trail = path.slice(0, -1).map(function (id, j) { return '<div class="st-dstep"><span class="st-dq">' + esc(b.nodes[id].q) + '</span><span class="st-da">' + esc(ch[j] || "") + "</span></div>"; }).join("");
      var body = cur.end ? '<article class="vph-card st-dend"><div class="panel ' + esc(cur.tone || "uni") + '"><div class="label">' + esc(b.endLabel || "Where this leads") + "</div><h3>" + esc(cur.title) + "</h3><p>" + cur.text + "</p></div>" + stRef(cur.ref) + "</article>" : '<article class="vph-card st-dnode"><div class="label">' + esc(b.stepLabel || "Step") + " " + path.length + "</div><h3>" + esc(cur.q) + "</h3>" + (cur.text ? "<p>" + cur.text + "</p>" : "") + stRef(cur.ref) + '<div class="row st-dopts">' + cur.options.map(function (o) { return '<button class="btn" type="button" data-sxd="' + k + "|" + esc(o.to) + '" data-sxdl="' + esc(o.label) + '">' + esc(o.label) + "</button>"; }).join("") + "</div></article>";
      return stHead(b) + '<div class="st-decide">' + trail + body + (path.length > 1 ? '<div class="row"><button class="btn ghost" type="button" data-sxdb="' + k + '">← Back</button><button class="btn ghost" type="button" data-sxd0="' + k + '">Start again</button></div>' : "") + "</div>";
    },
    spines: function (v, bi, b) {
      var i = stSel(v, bi, b.items.length), x = b.items[i], cls = ["sep", "gold", "uni"];
      return stHead(b) + '<div class="st-spines"><div class="st-sph l">' + esc(b.left) + '</div><div></div><div class="st-sph r">' + esc(b.right) + "</div>" + b.items.map(function (y, j) { var on = j === i; return '<button type="button" class="st-sn l' + (on ? " on" : "") + (y.l ? "" : " empty") + '" data-sx="' + v + "|" + bi + "|" + j + '">' + esc(y.l || "—") + '</button><span class="st-link' + (on ? " on" : "") + '" aria-hidden="true">' + (y.shift ? "⇄" : "↔") + '</span><button type="button" class="st-sn r' + (on ? " on" : "") + (y.r ? "" : " empty") + '" data-sx="' + v + "|" + bi + "|" + j + '">' + esc(y.r || "—") + "</button>"; }).join("") + '</div><article class="vph-card"><div class="label">' + (i + 1) + " / " + b.items.length + "</div><h3>" + esc((x.l || "—") + " ⇄ " + (x.r || "—")) + '</h3><div class="rc-three">' + b.labels.map(function (l, k) { return '<div class="panel ' + cls[k % 3] + '"><div class="label">' + esc(l) + "</div><p>" + x.cols[k] + "</p></div>"; }).join("") + "</div>" + stRef(x.ref) + '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-sxm="' + v + "|" + bi + '|-1"' + (i === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-sxm="' + v + "|" + bi + '|1"' + (i === b.items.length - 1 ? " disabled" : "") + ">Next →</button></div></article>";
    },
    mindmap: function (v, bi, b) { return stHead(b) + stMind(v + "|" + bi, b.center, b.branches); },
    series: function (v, bi, b) {
      var k = v + "|" + bi, P = b.parts, i = stSel(v, bi, P.length), p = P[i], tabs = [["summary", "Summary & map"], ["flow", "Argument flow"], ["teachings", "Key teachings"], ["stories", "Stories"], ["words", "Word studies"], ["scriptures", "Scriptures"], ["questions", "Questions"], ["practice", "Practice"], ["fair", "Fair notes"]];
      tabs = tabs.filter(function (t) { return t[0] === "summary" || (p[t[0]] || []).length; });
      var tb = SS[k + "|tab"] || "summary"; if (!tabs.some(function (t) { return t[0] === tb; })) tb = "summary";
      var body = "";
      if (tb === "summary") body = '<div class="panel gold"><div class="label">Core claim</div><p>' + (p.thesis || "") + "</p></div><p>" + (p.summary || "") + "</p>" + ((p.mindmap || []).length ? stMind(k + "|m" + i, p.title, p.mindmap) : "");
      else if (tb === "flow") body = '<div class="st-flow">' + p.flow.map(function (f, j) { return '<div class="st-step past"><i>' + (j + 1) + "</i><span><b>" + esc(f.step) + "</b><small>" + f.text + "</small></span></div>"; }).join("") + "</div>";
      else if (tb === "teachings") body = '<div class="qa">' + p.teachings.map(function (t, j) { return "<details" + (j === 0 ? " open" : "") + "><summary>" + (j + 1) + ". " + esc(t.title) + '</summary><div class="ans"><p style="color:var(--ink)">' + t.body + "</p>" + stRef((t.refs || []).join(" · ")) + "</div></details>"; }).join("") + "</div>";
      else if (tb === "stories") body = '<div class="grid">' + p.stories.map(function (t) { return '<article class="gterm"><h3>' + esc(t.title) + "</h3><p>" + t.text + "</p></article>"; }).join("") + "</div>";
      else if (tb === "words") body = '<div class="grid">' + p.words.map(function (w) { var vd = String(w.verdict || "").toLowerCase(); return '<article class="gterm st-word ' + (vd.indexOf("not") === 0 ? "bad" : vd.indexOf("part") === 0 ? "mid" : "good") + '"><h3>' + esc(w.word) + ' <span class="ref">' + esc(w.lang || "") + '</span></h3><p><strong>The series says:</strong> ' + w.claimed + '</p><p><strong>Lexicons:</strong> ' + w.lexicon + '</p><span class="pill">' + esc(w.verdict || "") + "</span></article>"; }).join("") + "</div>";
      else if (tb === "scriptures") body = '<div class="st-scr">' + p.scriptures.map(function (r) { return '<div><b class="ref">' + esc(r.ref) + "</b><p>" + r.use + "</p></div>"; }).join("") + "</div>";
      else if (tb === "questions") body = '<div class="qa">' + p.questions.map(function (q) { return "<details><summary>" + esc(q.q) + '</summary><div class="ans"><p style="color:var(--ink)">' + q.a + "</p></div></details>"; }).join("") + "</div>";
      else if (tb === "practice") body = '<ul class="st-prac">' + p.practice.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      else if (tb === "fair") body = p.fair.map(function (f) { return '<div class="panel sep"><div class="label">Debated claim</div><p><strong>' + f.claim + "</strong></p><p>" + f.note + "</p>" + stRef((f.refs || []).join(" · ")) + "</div>"; }).join("");
      return stHead(b) + '<div class="st-rail">' + P.map(function (x, j) { return '<button type="button" class="st-part' + (j === i ? " on" : "") + (j < i ? " past" : "") + '" data-sx="' + v + "|" + bi + "|" + j + '"><b>' + (j + 1) + "</b><span>" + esc(x.title) + "</span></button>"; }).join("") + '</div><article class="vph-card st-pcard"><div class="label">Part ' + (i + 1) + " of " + P.length + "</div><h3>" + esc(p.title) + '</h3><div class="chips st-tabs">' + tabs.map(function (t) { return '<button class="chip" type="button" data-sxt="' + k + "|" + t[0] + '" aria-pressed="' + (t[0] === tb) + '">' + esc(t[1]) + ((p[t[0]] || []).length && t[0] !== "summary" ? " <small>(" + p[t[0]].length + ")</small>" : "") + "</button>"; }).join("") + "</div>" + body + '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-sxm="' + v + "|" + bi + '|-1"' + (i === 0 ? " disabled" : "") + '>← Previous part</button><button class="btn" type="button" data-sxm="' + v + "|" + bi + '|1"' + (i === P.length - 1 ? " disabled" : "") + ">Next part →</button></div></article>";
    }
  };
  function stMind(key, center, branches) {
    if (window.innerWidth < 640 || branches.length > 9) {
      var sel0 = SS[key] == null ? -1 : SS[key], n0 = branches.length;
      return '<div class="st-mtree"><div class="st-mcenter t">' + esc(center) + '</div><div class="st-mbranches">' + branches.map(function (x, j) { var on = j === sel0; return '<div class="st-mb' + (on ? " on" : "") + '" style="--h:' + Math.round(j / n0 * 330) + '"><button type="button" class="st-mnode t" data-sxk="' + key + "|" + j + '" aria-expanded="' + on + '">' + esc(x.branch) + "</button>" + (on ? '<ul>' + x.leaves.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>" : "") + "</div>"; }).join("") + "</div></div>";
    }
    var n = branches.length, sel = SS[key] == null ? -1 : SS[key], pts = branches.map(function (x, j) { var a = -Math.PI / 2 + j / n * Math.PI * 2; var rx = window.innerWidth < 560 ? 30 : 36; return [50 + rx * Math.cos(a), 50 + 34 * Math.sin(a)]; });
    var sb = branches[sel];
    return '<div class="st-mind"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + pts.map(function (q, j) { return '<path class="' + (j === sel ? "on" : "") + '" d="M50 50 Q ' + ((50 + q[0]) / 2 + (q[1] - 50) * 0.15).toFixed(1) + " " + ((50 + q[1]) / 2 - (q[0] - 50) * 0.15).toFixed(1) + " " + q[0].toFixed(1) + " " + q[1].toFixed(1) + '" style="--h:' + Math.round(j / n * 330) + '"/>'; }).join("") + '</svg><div class="st-mcenter">' + esc(center) + "</div>" + branches.map(function (x, j) { return '<button type="button" class="st-mnode' + (j === sel ? " on" : "") + '" style="left:' + pts[j][0].toFixed(1) + "%;top:" + pts[j][1].toFixed(1) + "%;--h:" + Math.round(j / n * 330) + '" data-sxk="' + key + "|" + j + '">' + esc(x.branch) + "</button>"; }).join("") + "</div>" + (sb ? '<article class="vph-card st-mleaves" style="--h:' + Math.round(sel / n * 330) + '"><h3>' + esc(sb.branch) + "</h3><ul>" + sb.leaves.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul></article>" : '<p class="note">Tap a branch to open it.</p>');
  }
  function stBlock(v, bi) { var b = RG.studies[v].blocks[bi], f = STB[b.type]; return f ? f(v, bi, b) : ""; }
  function stView(v) {
    var S = RG.studies[v], B = S.blocks || [];
    return head(S.eyebrow, S.title, S.lede) +
      '<nav class="jx-nav">' + B.map(function (b, bi) { return b.nav && !(b.items && !b.items.length) ? '<button type="button" data-jxgo="sb-' + v + "-" + bi + '">' + esc(b.nav) + "</button>" : ""; }).join("") + ((S.qa || []).length ? '<button type="button" data-jxgo="sb-' + v + '-qa">Questions</button>' : "") + "</nav>" +
      (S.thesis ? '<div class="panel gold"><div class="label">The short answer</div><p>' + S.thesis + "</p></div>" : "") +
      B.map(function (b, bi) { return b.items && !b.items.length ? "" : '<section class="section st-b" id="sb-' + v + "-" + bi + '">' + stBlock(v, bi) + "</section>"; }).join("") +
      '<div id="sb-' + v + '-qa"></div>' + qxSection("sq" + v, S.qa || [], "Every question, answered") +
      ((S.evidence || []).length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(S.evidence) + "</section>" : "") +
      ((S.related || []).length ? '<section class="section"><div class="label">Related in this atlas</div><div class="chips">' + S.related.map(function (r) { return '<a class="chip" href="#' + esc(r[0]) + '">' + esc(r[1]) + "</a>"; }).join("") + "</div></section>" : "");
  }
  function stRedraw(v, bi) { var el = document.getElementById("sb-" + v + "-" + bi); if (el) el.innerHTML = stBlock(v, bi); }
  var stTimer = null;
  function stPlay(v, bi) {
    var b = RG.studies[v].blocks[bi], k = v + "|" + bi, j = 0; clearInterval(stTimer);
    SS[k] = 0; stRedraw(v, bi);
    if (reduced) return;
    stTimer = setInterval(function () { j++; if (j >= b.steps.length || location.hash.slice(1) !== v) { clearInterval(stTimer); return; } SS[k] = j; stRedraw(v, bi); }, 2200);
  }
  /* ---------- Blessing, matter & the spiritual life ---------- */
  var bsW = 0, bsSp = 2, bsT = 1, bsS = {}, bsWh = -1, bsLf = "split", bsA = 0, bsY = 0, bsV = 4, bsAct = {}, bsC = 0;
  var BSKIND = { whole: "christian", split: "split", mixed: "mixed" };
  V.blessing = function () {
    var I = RG.bsIntro || {}, W = A("bsWords"), SP = A("bsSpectrum"), T = A("bsTimeline"), S = A("bsSigns"), WH = A("bsWheel"), LF = RG.bsLife || {}, AR = A("bsArgs"), H = A("bsHeart"), Y = A("bsWhy"), VW = A("bsViews"), AC = A("bsActions"), CS = A("bsCases"), DA = A("bsData"), E = A("bsEvidence");
    return head("Blessing, matter & the spiritual life", "Spiritual blessing, Gnostic splits, and God’s heart for healing and provision", I.lede || "") +
      '<nav class="jx-nav"><button type="button" data-jxgo="bs-words">What blessing means</button><button type="button" data-jxgo="bs-gnostic">The Gnostic split</button><button type="button" data-jxgo="bs-args">The arguments</button><button type="button" data-jxgo="bs-heart">God’s heart</button><button type="button" data-jxgo="bs-why">Why not seen?</button><button type="button" data-jxgo="bs-church">What the church can do</button><button type="button" data-jxgo="bs-qa">Questions</button></nav>' +
      (I.thesis ? '<div class="panel gold"><div class="label">The short answer</div><p>' + I.thesis + "</p></div>" : "") +
      '<div id="bs-words"></div>' +
      (W.length ? '<section class="section"><h2>What “blessing” and “spiritual” mean</h2><p class="note">Seven words that change how we read the promises. Tap one.</p><div class="chips">' + W.map(function (w, i) { return '<button class="chip" type="button" data-bsw="' + i + '" aria-pressed="' + (i === bsW) + '">' + esc(w.word) + "</button>"; }).join("") + '</div><div id="bsw-card"></div></section>' : "") +
      (SP.length ? '<section class="section"><h2>The spectrum: from escape to greed</h2><p class="note">Two opposite errors pull away from biblical shalom. Tap a position.</p><div class="bs-spec">' + SP.map(function (s, i) { return '<button type="button" class="bs-sp p' + i + (i === bsSp ? " on" : "") + '" data-bssp="' + i + '"><b>' + esc(s.label) + "</b><small>" + esc(s.short) + "</small></button>"; }).join("") + '</div><div id="bssp-card"></div></section>' : "") +
      (WH.length ? '<section class="section"><h2>The shalom wheel: what blessing covers</h2><p class="note">Sonship is the centre; every other blessing flows from it. Tap the centre or a spoke.</p><div class="jx-ringwrap"><div class="rc-loopring relational bs-wheel" id="bs-wheel"></div><div id="bswh-card"></div></div></section>' : "") +
      ((LF.whole || []).length ? '<section class="section"><h2>What is spiritual life?</h2><div class="su-toggle" role="group" aria-label="Choose a picture"><button type="button" class="s" data-bslf="split" aria-pressed="' + (bsLf === "split") + '">The split picture</button><button type="button" class="u" data-bslf="whole" aria-pressed="' + (bsLf === "whole") + '">The biblical picture</button></div><div id="bslf-card"></div><div class="panel uni"><div class="label">Definition</div><p>' + LF.definition + "</p></div></section>" : "") +
      '<div id="bs-gnostic"></div>' +
      (T.length ? '<section class="section"><h2>The Gnostic split: then and now</h2><p class="note">How the spirit–matter divide entered Christian thinking, and how Scripture answers it. <span class="rc-key christian">Whole-person</span> <span class="rc-key split">Spirit–matter split</span> <span class="rc-key mixed">Mixed</span></p><div class="rc-time">' + T.map(function (t, i) { return '<button type="button" class="rc-tn ' + (BSKIND[t.kind] || "") + (i === bsT ? " on" : "") + '" data-bst="' + i + '"><small>' + esc(t.year) + "</small><span>" + esc(t.label) + "</span></button>"; }).join("") + '</div><div id="bst-card"></div></section>' : "") +
      (S.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Has the split shaped me?</h2><span class="count" id="bss-score"></span></div><p class="note">A private self-check. Tick any that sound like you.</p><div class="pa-meter"><i id="bss-meter"></i></div><div class="pa-tests">' + S.map(function (x) { return '<label class="pa-test"><input type="checkbox" data-bss="' + esc(x.id) + '"' + (bsS[x.id] ? " checked" : "") + "><span>" + esc(x.text) + "</span></label>"; }).join("") + '</div><div id="bss-out"></div></section>' : "") +
      '<div id="bs-args"></div>' +
      (AR.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>The arguments against healing and provision, answered</h2><span class="count">' + AR.length + ' arguments</span></div><p class="note">Each argument, what is true in it, and the answer.</p><div class="chips">' + AR.map(function (a, i) { return '<button class="chip" type="button" data-bsa="' + i + '" aria-pressed="' + (i === bsA) + '">' + (i + 1) + "</button>"; }).join("") + '</div><div id="bsa-card"></div></section>' : "") +
      '<div id="bs-heart"></div>' +
      (H.length ? '<section class="section"><h2>God’s heart: the evidence</h2><div class="grid">' + H.map(function (h, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><h3>' + esc(h.label) + "</h3><p>" + h.text + '</p><div class="ref">' + esc(h.ref) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (DA.length ? '<section class="section"><h2>Clear data</h2><p class="note">What surveys and studies show. Sources are listed below.</p><div class="rc-data">' + DA.map(function (d, i) { return '<article class="rc-stat" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><div class="rc-num">' + esc(d.value) + "</div><h3>" + esc(d.label) + "</h3>" + (d.bars ? '<div class="rc-bars">' + d.bars.map(function (b) { return '<div class="rc-bar"><span>' + esc(b.label) + '</span><div class="rc-track"><i style="--w:' + Math.max(2, Math.min(100, b.pct)) + '%"></i></div><b>' + esc(b.show || b.pct + "%") + "</b></div>"; }).join("") + "</div>" : "") + "<p>" + d.text + '</p><div class="panel uni"><div class="label">What it means</div><p>' + d.meaning + '</p></div><div class="ref">' + esc(d.source) + "</div></article>"; }).join("") + "</div></section>" : "") +
      '<div id="bs-why"></div>' +
      (Y.length ? '<section class="section"><h2>Why blessing is not always seen</h2><p class="note">Nine factors. Tap one to see the relational view, the Word of Faith emphasis and a caution.</p><div class="rc-tiles bs-why">' + Y.map(function (y, i) { return '<button type="button" class="rc-tile' + (i === bsY ? " on" : "") + '" data-bsy="' + i + '">' + esc(y.label) + "</button>"; }).join("") + '</div><div id="bsy-card"></div></section>' : "") +
      (VW.length ? '<section class="section"><h2>Five perspectives</h2><p class="note">What each gets right, and what to watch for.</p><div class="chips">' + VW.map(function (v, i) { return '<button class="chip" type="button" data-bsv="' + i + '" aria-pressed="' + (i === bsV) + '">' + esc(v.name) + "</button>"; }).join("") + '</div><div id="bsv-card"></div></section>' : "") +
      '<div id="bs-church"></div>' +
      (AC.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>What the church can do</h2><span class="count" id="bsac-score"></span></div><p class="note">Tick what your church or group already does; the rest are next steps.</p><div class="pa-meter"><i id="bsac-meter"></i></div><div class="bs-acts">' + AC.map(function (a) { return '<label class="bs-act"><input type="checkbox" data-bsac="' + esc(a.id) + '"' + (bsAct[a.id] ? " checked" : "") + "><span><b>" + esc(a.label) + "</b>" + a.text + '<em class="ref">' + esc(a.ref) + "</em></span></label>"; }).join("") + "</div></section>" : "") +
      (CS.length ? '<section class="section"><h2>Case studies</h2><p class="note">Composite stories, not real people. Three ways to respond to each.</p><div class="chips">' + CS.map(function (c, i) { return '<button class="chip" type="button" data-bsc="' + i + '" aria-pressed="' + (i === bsC) + '">' + esc(c.title) + "</button>"; }).join("") + '</div><div id="bsc-card"></div></section>' : "") +
      '<div id="bs-qa"></div>' +
      qxSection("bsq", A("bsQA"), "Every question, answered") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">Keep taking prescribed medicine unless your doctor advises otherwise; prayer and medicine work together.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#recover">Habits, healing & help</a><a class="chip" href="#ways">How God works</a><a class="chip" href="#blood">The life is in the blood</a><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#kingdom">Ekklesia & the Kingdom</a><a class="chip" href="#embodied">The embodied gospel</a></div></section>';
  };
  function bswShow() { var W = A("bsWords"), w = W[bsW]; if (!w || !$("#bsw-card")) return; $$("[data-bsw]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === bsW)); }); $("#bsw-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(w.lang) + " · " + esc(w.gloss) + "</div><h3>" + esc(w.word) + "</h3><p>" + w.meaning + '</p><div class="panel sep"><div class="label">The common misreading</div><p>' + w.misread + '</p></div><div class="ref">' + esc(w.ref) + "</div></article>"; }
  function bsspShow() { var S = A("bsSpectrum"), s = S[bsSp]; if (!s || !$("#bssp-card")) return; $$(".bs-sp").forEach(function (b, i) { b.classList.toggle("on", i === bsSp); }); $("#bssp-card").innerHTML = '<article class="vph-card' + (bsSp === 2 ? " bs-good" : "") + '"><h3>' + esc(s.label) + "</h3><p><strong>Belief:</strong> " + s.belief + "</p><p><strong>Fruit:</strong> " + s.fruit + '</p><div class="panel ' + (bsSp === 2 ? "uni" : "gold") + '"><div class="label">Scripture</div><p>' + s.scripture + "</p></div></article>"; }
  function bswhShow() {
    var W = A("bsWheel"); if (!$("#bs-wheel") || !W.length) return;
    var ring = W.slice(1), i0 = bsWh < 0 ? 0 : bsWh;
    $("#bs-wheel").innerHTML = '<div class="jx-orbit" aria-hidden="true"></div><button type="button" class="rc-root' + (i0 === 0 ? " on" : "") + '" data-bswh="0">' + esc(W[0].label) + "</button>" + ring.map(function (s, i) { var ang = -Math.PI / 2 + i / ring.length * Math.PI * 2; return '<button type="button" class="jx-node' + (i + 1 === i0 ? " on" : "") + '" data-bswh="' + (i + 1) + '" style="left:' + (50 + 39 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 39 * Math.sin(ang)).toFixed(1) + '%">' + esc(s.label) + "</button>"; }).join("");
    var s = W[i0]; $("#bswh-card").innerHTML = '<article class="vph-card"><h3>' + esc(s.label) + "</h3><p>" + s.text + '</p><div class="panel gold"><div class="label">Keep in balance</div><p>' + s.caution + '</p></div><div class="ref">' + esc(s.ref) + "</div></article>";
  }
  function bslfShow() {
    var L = RG.bsLife || {}; if (!$("#bslf-card")) return;
    $$("[data-bslf]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.bslf === bsLf)); });
    $("#bslf-card").innerHTML = bsLf === "split" ? '<div class="bs-split">' + (L.split || []).map(function (c, i) { return '<div class="bs-half h' + i + '"><div class="label">' + esc(c.label) + "</div><ul>" + c.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"; }).join('<div class="bs-wall" aria-hidden="true"></div>') + '</div><p class="note">This sacred–secular wall is not in the Bible. It makes most of life “unspiritual”.</p>' : '<div class="bs-whole">' + (L.whole || []).map(function (w, i) { return '<article class="bs-seg" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"><b>' + esc(w.area) + "</b><p>" + w.text + '</p><div class="ref">' + esc(w.ref) + "</div></article>"; }).join("") + "</div>";
  }
  function bstShow() { var T = A("bsTimeline"), t = T[bsT]; if (!t || !$("#bst-card")) return; $$("[data-bst]").forEach(function (b, i) { b.classList.toggle("on", i === bsT); }); $("#bst-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(t.year) + " · " + (t.kind === "whole" ? "Whole-person" : t.kind === "mixed" ? "Mixed" : "Spirit–matter split") + "</div><h3>" + esc(t.label) + "</h3><p>" + t.text + "</p></article>"; }
  function bssShow() {
    var S = A("bsSigns"); if (!$("#bss-out")) return; var n = S.filter(function (x) { return bsS[x.id]; }).length;
    $("#bss-score").textContent = n + " of " + S.length; $("#bss-meter").style.width = (n / S.length * 100) + "%";
    $("#bss-out").innerHTML = '<div class="panel ' + (n === 0 ? "uni" : n < 4 ? "gold" : "sep") + '"><div class="label">' + (n === 0 ? "No ticks yet" : n < 4 ? "Some split thinking" : "The split has shaped you") + "</div><p>" + (n === 0 ? "Tick any statement that sounds like you." : "You are not alone; many sincere believers were taught this way. Read the word studies and the biblical picture of spiritual life above, and thank God for one ordinary gift today.") + "</p></div>";
  }
  function bsaShow() { var R = A("bsArgs"), a = R[bsA]; if (!a || !$("#bsa-card")) return; $$("[data-bsa]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === bsA)); }); $("#bsa-card").innerHTML = '<article class="vph-card"><div class="label">Argument ' + (bsA + 1) + " of " + R.length + '</div><div class="panel sep"><div class="label">The argument</div><p>“' + a.arg + '”</p></div><div class="panel gold"><div class="label">What is true in it</div><p>' + a.truth + '</p></div><div class="panel uni"><div class="label">The answer</div><p>' + a.answer + '</p></div><div class="ref">' + esc(a.ref) + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-bsam="-1"' + (bsA === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-bsam="1"' + (bsA === R.length - 1 ? " disabled" : "") + ">Next argument →</button></div></article>"; }
  function bsyShow() { var Y = A("bsWhy"), y = Y[bsY]; if (!y || !$("#bsy-card")) return; $$("[data-bsy]").forEach(function (b) { b.classList.toggle("on", +b.dataset.bsy === bsY); }); $("#bsy-card").innerHTML = '<article class="vph-card"><h3>' + esc(y.label) + "</h3><p>" + y.text + '</p><div class="rc-three"><div class="panel uni"><div class="label">Relational gospel</div><p>' + y.rel + '</p></div><div class="panel gold"><div class="label">Word of Faith / dominion / sons emphasis</div><p>' + y.wof + '</p></div><div class="panel sep"><div class="label">Caution</div><p>' + y.caution + '</p></div></div><div class="ref">' + esc(y.ref) + "</div></article>"; }
  function bsvShow() { var V2 = A("bsViews"), v = V2[bsV]; if (!v || !$("#bsv-card")) return; $$("[data-bsv]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === bsV)); }); $("#bsv-card").innerHTML = '<article class="vph-card"><h3>' + esc(v.name) + "</h3><p>" + v.core + '</p><div class="cmp-pair"><div class="panel uni"><div class="label">What it gets right</div><p>' + v.right + '</p></div><div class="panel sep"><div class="label">What to watch for</div><p>' + v.risk + '</p></div></div><div class="ref">' + esc(v.ref) + "</div></article>"; }
  function bsacShow() { var AC = A("bsActions"); if (!$("#bsac-score")) return; var n = AC.filter(function (x) { return bsAct[x.id]; }).length; $("#bsac-score").textContent = n + " of " + AC.length; $("#bsac-meter").style.width = (n / AC.length * 100) + "%"; }
  function bscShow() { var C = A("bsCases"), c = C[bsC]; if (!c || !$("#bsc-card")) return; $$("[data-bsc]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === bsC)); }); $("#bsc-card").innerHTML = '<article class="vph-card"><h3>' + esc(c.title) + '</h3><p style="color:var(--ink)">' + c.who + '</p><div class="rc-three"><div class="panel sep"><div class="label">Heaven-only answer</div><p>' + c.old + '</p></div><div class="panel gold"><div class="label">Prosperity-formula answer</div><p>' + c.swing + '</p></div><div class="panel uni"><div class="label">Whole-gospel answer</div><p>' + c.whole + '</p></div></div><div class="ref">' + esc(c.ref) + "</div></article>"; }

  /* ---------- Habits, healing & help ---------- */
  var rcD = 0, rcLens = "relational", rcN = 0, rcV = "all", rcRt = 2, rcCyc = "shame", rcCi = 0, rcB = 2, rcC = 0, rcLv = 0, rcMy = {};
  var RCLENS = { secular: "Secular help", legal: "Legal gospel", relational: "Relational gospel" };
  var RCVSHORT = { s: "Secular", l: "Legal", r: "Relational", sl: "S + L", sr: "S + R", lr: "L + R", all: "All three" };
  var RCVPOS = { s: [24, 30], l: [76, 30], r: [50, 80], sl: [50, 24], sr: [33, 58], lr: [67, 58], all: [50, 46] };
  V.recover = function () {
    var I = RG.rcIntro || {}, DO = A("rcDoors"), L = A("rcLoop"), G = A("rcGrace"), LV = A("rcLevels"), VZ = A("rcVenn"), RT = A("rcRoots"), CY = RG.rcCycles || {}, SK = RG.rcSkeleton || {}, B = A("rcBalance"), M = A("rcMyths"), CS = A("rcCases"), DA = A("rcData"), E = A("rcEvidence");
    var lens = '<div class="su-toggle" role="group" aria-label="Choose an approach">' + ["secular", "legal", "relational"].map(function (k) { return '<button type="button" class="' + (k === "legal" ? "s" : k === "relational" ? "u" : "") + '" data-rclens="' + k + '" aria-pressed="' + (rcLens === k) + '">' + RCLENS[k] + "</button>"; }).join("") + "</div>";
    return head("Habits, healing & help", "Secular help, the legal gospel and the relational gospel", I.lede || "") +
      '<nav class="jx-nav"><button type="button" data-jxgo="rc-compare">Compare</button><button type="button" data-jxgo="rc-why">Why help works</button><button type="button" data-jxgo="rc-roots">Who borrowed?</button><button type="button" data-jxgo="rc-life">In a life</button><button type="button" data-jxgo="rc-cases">Case studies</button><button type="button" data-jxgo="rc-qa">Questions</button></nav>' +
      (I.thesis ? '<div class="panel gold"><div class="label">The short answer</div><p>' + I.thesis + "</p></div>" : "") +
      '<div id="rc-compare"></div>' +
      (DO.length ? '<section class="section"><h2>Three approaches, side by side</h2><p class="note">Pick a topic to see how each approach answers it.</p><div class="chips">' + DO.map(function (d, i) { return '<button class="chip" type="button" data-rcd="' + i + '" aria-pressed="' + (i === rcD) + '">' + esc(d.topic) + "</button>"; }).join("") + '</div><div id="rcd-card"></div></section>' : "") +
      (VZ.length ? '<section class="section"><h2>Where they overlap: a visual map</h2><p class="note">Tap a region of the map. The overlaps explain why the relational gospel can look like therapy, and why it isn’t.</p><div class="rc-vennwrap"><div class="rc-venn"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="c-s" cx="36" cy="38" r="27"/><circle class="c-l" cx="64" cy="38" r="27"/><circle class="c-r" cx="50" cy="62" r="27"/><text x="14" y="10">Secular help</text><text x="62" y="10">Legal gospel</text><text x="34" y="98">Relational gospel</text></svg>' + VZ.map(function (v) { var p = RCVPOS[v.id] || [50, 50]; return '<button type="button" class="rc-vb' + (v.id === rcV ? " on" : "") + '" data-rcv="' + esc(v.id) + '" style="left:' + p[0] + "%;top:" + p[1] + '%" aria-label="' + esc(v.zone) + '">' + esc(RCVSHORT[v.id] || v.id) + "</button>"; }).join("") + '</div><div id="rcv-card"></div></div></section>' : "") +
      (L.length ? '<section class="section"><h2>The habit loop: where each approach steps in</h2><p class="note">Every habit runs a loop. Tap a step, then switch the lens to see how each approach intervenes.</p>' + lens + '<div class="rc-loop" id="rc-loop"></div><div id="rcl-card"></div></section>' : "") +
      '<div id="rc-why"></div>' +
      (LV.length ? '<section class="section"><h2>Two levels of healing</h2><p class="note">God heals on the creation level through his design, for everyone, and on the new-creation level through Christ. Tap a layer.</p><div class="rc-levels"><div class="rc-band new"><div class="label">New creation · saving grace · only in Christ</div><div class="rc-tiles">' + LV.filter(function (x) { return x.level === "new"; }).map(function (x) { var i = LV.indexOf(x); return '<button type="button" class="rc-tile' + (i === rcLv ? " on" : "") + '" data-rclv="' + i + '">' + esc(x.label) + "</button>"; }).join("") + '</div></div><div class="rc-band cr"><div class="label">Creation · common grace · for everyone</div><div class="rc-tiles">' + LV.filter(function (x) { return x.level === "creation"; }).map(function (x) { var i = LV.indexOf(x); return '<button type="button" class="rc-tile' + (i === rcLv ? " on" : "") + '" data-rclv="' + i + '">' + esc(x.label) + "</button>"; }).join("") + '</div></div></div><div id="rclv-card"></div></section>' : "") +
      (G.length ? '<section class="section"><h2>Why secular help works: common grace</h2><div class="grid">' + G.map(function (g, i) { return '<article class="gterm' + (g.id === "limits" ? " rc-limit" : "") + '" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><h3>' + esc(g.title) + "</h3><p>" + g.text + '</p><div class="ref">' + esc(g.ref) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (DA.length ? '<section class="section"><h2>Clear data</h2><p class="note">What research shows about change, relapse, shame and connection. Each figure links to its source below.</p><div class="rc-data">' + DA.map(function (d, i) { return '<article class="rc-stat" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><div class="rc-num">' + esc(d.value) + "</div><h3>" + esc(d.label) + "</h3>" + (d.bars ? '<div class="rc-bars">' + d.bars.map(function (b) { return '<div class="rc-bar"><span>' + esc(b.label) + '</span><div class="rc-track"><i style="--w:' + Math.max(2, Math.min(100, b.pct)) + '%"></i></div><b>' + esc(b.show || b.pct + "%") + "</b></div>"; }).join("") + "</div>" : "") + "<p>" + d.text + '</p><div class="panel uni"><div class="label">What it means</div><p>' + d.meaning + '</p></div><div class="ref">' + esc(d.source) + "</div></article>"; }).join("") + "</div></section>" : "") +
      '<div id="rc-roots"></div>' +
      (RT.length ? '<section class="section"><h2>Who borrowed from whom?</h2><p class="note">A timeline of where recovery and healing methods came from. <span class="rc-key christian">Christian roots</span> <span class="rc-key other">Other roots</span> <span class="rc-key mixed">Mixed</span></p><div class="rc-time">' + RT.map(function (r, i) { return '<button type="button" class="rc-tn ' + esc(r.root) + (i === rcRt ? " on" : "") + '" data-rcrt="' + i + '"><small>' + esc(r.year) + "</small><span>" + esc(r.method) + "</span></button>"; }).join("") + '</div><div id="rcrt-card"></div></section>' : "") +
      '<div id="rc-life"></div>' +
      ((CY.shame || []).length ? '<section class="section"><h2>Two cycles: shame and grace</h2><p class="note">Shame keeps the habit alive; grace starves it. Tap a step.</p><div class="su-toggle" role="group" aria-label="Choose a cycle"><button type="button" class="s" data-rccy="shame" aria-pressed="' + (rcCyc === "shame") + '">The shame cycle</button><button type="button" class="u" data-rccy="grace" aria-pressed="' + (rcCyc === "grace") + '">The grace cycle</button></div><div class="jx-ringwrap"><div class="jx-ring" id="rc-ring"></div><div id="rccy-card"></div></div></section>' : "") +
      ((SK.relational || []).length ? '<section class="section"><h2>The skeleton: how each works in a life</h2><p class="note">Follow each column from top to bottom. Gold steps help; red steps are where it breaks down.</p><div class="rc-sk">' + [["secular", "Secular help"], ["legal", "Legal gospel"], ["relational", "Relational gospel"]].map(function (c) { return '<div class="rc-col ' + c[0] + '"><div class="label">' + c[1] + "</div>" + (SK[c[0]] || []).map(function (s, i) { return (i ? '<div class="rc-arrow" aria-hidden="true">↓</div>' : "") + '<div class="rc-step k-' + esc(s.k) + '" style="animation-delay:' + (i * 0.08).toFixed(2) + 's"><b>' + esc(s.s) + "</b><p>" + s.t + "</p></div>"; }).join("") + "</div>"; }).join("") + "</div></section>" : "") +
      (B.length ? '<section class="section"><h2>Is inner healing over-emphasised?</h2><p class="note">Slide along the scale from neglecting wounds to making healing the gospel.</p><div class="rc-scale"><input type="range" id="rc-bal" min="0" max="' + (B.length - 1) + '" step="1" value="' + rcB + '" aria-label="Emphasis on inner healing"><div class="rc-scale-l">' + B.map(function (b) { return "<span>" + esc(b.label) + "</span>"; }).join("") + '</div></div><div id="rcb-card"></div></section>' : "") +
      '<div id="rc-cases"></div>' +
      (CS.length ? '<section class="section"><h2>Case studies</h2><p class="note">Composite stories, not real people. Each shows the same struggle through three lenses.</p><div class="chips">' + CS.map(function (c, i) { return '<button class="chip" type="button" data-rcc="' + i + '" aria-pressed="' + (i === rcC) + '">' + esc(c.title) + "</button>"; }).join("") + '</div><div id="rcc-card"></div></section>' : "") +
      (M.length ? '<section class="section"><h2>Common misunderstandings</h2><p class="note">Tap a card to see the truth.</p><div class="grid">' + M.map(function (m, i) { return '<button type="button" class="rc-myth' + (rcMy[i] ? " flip" : "") + '" data-rcmy="' + i + '"><span class="label">' + (rcMy[i] ? "The truth" : "Myth") + "</span><span>" + (rcMy[i] ? m.truth : esc(m.myth)) + "</span></button>"; }).join("") + "</div></section>" : "") +
      '<div id="rc-qa"></div>' +
      qxSection("rcq", A("rcQA"), "Every question, answered") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">Safety first: heavy daily drinkers should not stop suddenly without medical advice, and nobody should stop prescribed medication without talking to their doctor. If you or someone else is in danger, contact local emergency services.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#reborn">Born again</a><a class="chip" href="#forgive">Forgiveness & repair</a><a class="chip" href="#blood">The life is in the blood</a><a class="chip" href="#compare">Legal vs relational</a></div></section>';
  };
  function rcdShow() {
    var D = A("rcDoors"), d = D[rcD]; if (!d || !$("#rcd-card")) return;
    $$("[data-rcd]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === rcD)); });
    $("#rcd-card").innerHTML = '<article class="vph-card"><h3>' + esc(d.topic) + '</h3><div class="rc-three"><div class="panel"><div class="label">Secular help</div><p>' + d.secular + '</p></div><div class="panel sep"><div class="label">Legal gospel</div><p>' + d.legal + '</p></div><div class="panel uni"><div class="label">Relational gospel</div><p>' + d.relational + "</p></div></div></article>";
  }
  function rcvShow() {
    var V2 = A("rcVenn"), v = V2.filter(function (x) { return x.id === rcV; })[0]; if (!v || !$("#rcv-card")) return;
    $$(".rc-vb").forEach(function (b) { b.classList.toggle("on", b.dataset.rcv === rcV); });
    $("#rcv-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(v.zone) + "</div><ul>" + v.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><p>" + v.note + "</p></article>";
  }
  function rclShow() {
    var L = A("rcLoop"); if (!$("#rc-loop") || !L.length) return;
    $$("[data-rclens]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.rclens === rcLens)); });
    var ring = L.slice(1);
    $("#rc-loop").innerHTML = '<div class="rc-loopring ' + rcLens + '"><div class="jx-orbit" aria-hidden="true"></div><button type="button" class="rc-root' + (rcN === 0 ? " on" : "") + '" data-rcn="0">' + esc(L[0].label) + "</button>" + ring.map(function (s, i) { var ang = -Math.PI / 2 + i / ring.length * Math.PI * 2; return '<button type="button" class="jx-node' + (i + 1 === rcN ? " on" : "") + '" data-rcn="' + (i + 1) + '" style="left:' + (50 + 39 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 39 * Math.sin(ang)).toFixed(1) + '%"><b>' + (i + 1) + "</b>" + esc(s.label) + "</button>"; }).join("") + "</div>";
    var s = L[rcN];
    $("#rcl-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(s.label) + "</div><p>" + s.text + '</p><div class="panel ' + (rcLens === "legal" ? "sep" : rcLens === "relational" ? "uni" : "") + '"><div class="label">' + RCLENS[rcLens] + "</div><p>" + s[rcLens] + '</p></div><div class="ref">' + esc(s.ref) + "</div></article>";
  }
  function rclvShow() {
    var L = A("rcLevels"), x = L[rcLv]; if (!x || !$("#rclv-card")) return;
    $$("[data-rclv]").forEach(function (b) { b.classList.toggle("on", +b.dataset.rclv === rcLv); });
    $("#rclv-card").innerHTML = '<article class="vph-card"><div class="label">' + (x.level === "new" ? "New creation level" : "Creation level") + "</div><h3>" + esc(x.label) + "</h3><p>" + x.text + '</p><p style="font-size:15px"><strong>Through:</strong> ' + esc(x.who) + '</p><div class="ref">' + esc(x.ref) + "</div></article>";
  }
  function rcrtShow() {
    var R = A("rcRoots"), r = R[rcRt]; if (!r || !$("#rcrt-card")) return;
    $$(".rc-tn").forEach(function (b, i) { b.classList.toggle("on", i === rcRt); });
    $("#rcrt-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(r.year) + " · " + (r.root === "christian" ? "Christian roots" : r.root === "mixed" ? "Mixed roots" : "Other roots") + "</div><h3>" + esc(r.method) + '</h3><p><strong>Origin:</strong> ' + r.origin + '</p><p><strong>Today:</strong> ' + r.today + '</p><div class="panel uni"><div class="label">Verdict</div><p>' + r.conclusion + '</p></div><div class="ref">' + esc(r.ref) + "</div></article>";
  }
  function rccyShow() {
    var C = (RG.rcCycles || {})[rcCyc] || []; if (!$("#rc-ring") || !C.length) return;
    $$("[data-rccy]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.rccy === rcCyc)); });
    rcCi = Math.min(rcCi, C.length - 1);
    $("#rc-ring").className = "jx-ring " + (rcCyc === "shame" ? "r-cycle" : "r-cross");
    $("#rc-ring").innerHTML = '<div class="jx-orbit" aria-hidden="true"></div><div class="jx-core">' + (rcCyc === "shame" ? "Shame" : "Grace") + "</div>" + C.map(function (s, i) { var ang = -Math.PI / 2 + i / C.length * Math.PI * 2; return '<button type="button" class="jx-node' + (i === rcCi ? " on" : "") + '" data-rcci="' + i + '" style="left:' + (50 + 38 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 38 * Math.sin(ang)).toFixed(1) + '%"><b>' + (i + 1) + "</b>" + esc(s.label) + "</button>"; }).join("");
    var s = C[rcCi]; $("#rccy-card").innerHTML = '<article class="vph-card"><div class="label">' + (rcCyc === "shame" ? "The shame cycle" : "The grace cycle") + " · " + (rcCi + 1) + " of " + C.length + "</div><h3>" + esc(s.label) + "</h3><p>" + s.text + "</p></article>";
  }
  function rcbShow() {
    var B = A("rcBalance"), b = B[rcB]; if (!b || !$("#rcb-card")) return;
    $("#rcb-card").innerHTML = '<article class="vph-card rc-bal b' + rcB + '"><div class="label">' + esc(b.label) + "</div><h3>" + esc(b.title) + "</h3><ul>" + b.signs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><div class="panel ' + (rcB === 2 ? "uni" : "gold") + '"><div class="label">' + (rcB === 2 ? "Why this is healthy" : "The way back") + "</div><p>" + b.fix + "</p></div></article>";
  }
  function rccShow() {
    var C = A("rcCases"), c = C[rcC]; if (!c || !$("#rcc-card")) return;
    $$("[data-rcc]").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === rcC)); });
    $("#rcc-card").innerHTML = '<article class="vph-card"><h3>' + esc(c.title) + '</h3><p style="color:var(--ink)">' + c.who + '</p><div class="rc-three"><div class="panel sep"><div class="label">Legal gospel</div><p>' + c.legal + '</p></div><div class="panel"><div class="label">Secular help</div><p>' + c.secular + '</p></div><div class="panel uni"><div class="label">Relational gospel</div><p>' + c.relational + '</p></div></div><div class="label">Practical steps</div><ol class="rc-steps">' + c.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + '</ol><div class="ref">' + esc(c.refs.join(" · ")) + "</div></article>";
  }

  /* ---------- The Divine Embrace ---------- */
  var deC = 0, deTab = "big", deRead = {}, deLie = 0, deMir = false, deWq = "", deQq = "", deStory = -1;
  var DET = [["big", "Big idea"], ["points", "Key teachings"], ["stories", "Stories"], ["words", "Word studies"], ["questions", "Questions"], ["scriptures", "Scriptures"], ["reflect", "Reflect"]];
  function deAll() { return A("deCh1").concat(A("deCh2"), A("deCh3"), A("deCh4"), A("deCh5"), A("deCh6")).sort(function (a, b) { return a.n - b.n; }); }
  V.embrace = function () {
    RG.deChapters = deAll();
    var C = RG.deChapters, I = RG.deIntro || {}, ST = [], W = [], Q = [];
    C.forEach(function (c) { (c.illustrations || []).forEach(function (s) { ST.push({ s: s, c: c }); }); (c.words || []).forEach(function (w) { W.push({ w: w, c: c }); }); (c.questions || []).forEach(function (q) { Q.push({ q: q, c: c }); }); });
    RG.deStories = ST; RG.deWords = W; RG.deQs = Q;
    return head("A celebration of union", "The Divine Embrace", "A chapter-by-chapter journey through a study of God’s embrace of humanity in Christ: the mirror of our true design, the end of distance and delay, our inclusion in Jesus’ death and resurrection, and the life of oneness that follows. Every chapter summarised, with its stories, word studies and questions.") +
      '<section class="section"><h2>Religion thrives on two lies</h2><p class="note">Tap each lie to see what the gospel replaces it with.</p><div class="de-lies"><button type="button" class="de-lie' + (deLie & 1 ? " flip" : "") + '" data-delie="1"><span class="a">Distance</span><span class="b">Oneness</span><small>' + esc((I.distance || "God is not far away; he has already embraced humanity in Christ.")) + '</small></button><button type="button" class="de-lie' + (deLie & 2 ? " flip" : "") + '" data-delie="2"><span class="a">Delay</span><span class="b">Now</span><small>' + esc((I.delay || "Union is not a future reward; it is the present truth to wake up to.")) + "</small></button></div>" + ((I.summary || []).length ? '<div class="panel gold" style="margin-top:14px"><div class="label">The heart of the book</div>' + I.summary.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" : "") + "</section>" +
      '<section class="section"><h2>As in a mirror</h2><p class="note">James 1:23-25 pictures two people looking into the same mirror. Tap the mirror.</p><div class="de-mirror' + (deMir ? " on" : "") + '" id="de-mirror"><button type="button" class="de-glass" id="de-glass" aria-label="Look into the mirror"><svg viewBox="0 0 200 260" aria-hidden="true"><defs><radialGradient id="deg"><stop offset="0" stop-color="#fff6dc"/><stop offset=".5" stop-color="#e0ae55" stop-opacity=".7"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="125" rx="80" ry="110" class="de-frame"/><ellipse cx="100" cy="125" rx="70" ry="100" class="de-pane"/><circle cx="100" cy="100" r="26" class="de-face"/><path d="M58 190 Q100 140 142 190" class="de-face"/><circle cx="100" cy="125" r="90" fill="url(#deg)" class="de-shine"/></svg></button><div class="de-two"><div class="panel sep"><div class="label">The spectator</div><p>Hears the word, glimpses their true face, then walks away and forgets what kind of person they are.</p></div><div class="panel uni"><div class="label">The participator</div><p>Keeps gazing until what they see in Christ becomes the way they live: free, spontaneous, at home in their real identity.</p></div></div></div></section>' +
      (C.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>The journey, chapter by chapter</h2><span class="count" id="de-count"></span></div><div class="de-rail" id="de-rail"></div><div id="de-card"></div></section>' : "") +
      (ST.length ? '<section class="section"><h2>The stories and pictures</h2><p class="note">The illustrations the book uses to make the truth land. Tap one.</p><div class="de-stories">' + ST.map(function (x, i) { return '<button type="button" class="de-st' + (i === deStory ? " on" : "") + '" data-dest="' + i + '"><small>Chapter ' + x.c.n + "</small><b>" + esc(x.s.title) + "</b>" + (i === deStory ? "<p>" + x.s.text + "</p>" : "") + "</button>"; }).join("") + "</div></section>" : "") +
      (W.length ? '<section class="section"><h2>Word studies</h2><input type="search" id="de-wq" class="de-search" placeholder="Search Greek and Hebrew words…" aria-label="Search word studies" value="' + esc(deWq) + '"><div class="grid" id="de-words"></div></section>' : "") +
      (Q.length ? '<section class="section"><h2>Questions the book answers</h2><input type="search" id="de-qq" class="de-search" placeholder="Search the questions…" aria-label="Search questions" value="' + esc(deQq) + '"><div class="qa" id="de-qs"></div></section>' : "") +
      '<section class="section"><p class="note">This section summarises a published study in our own words; Scripture is quoted from the World English Bible or KJV.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#reborn">Born again</a>' + ["union-sonship", "mystical-union"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>";
  };
  function deShow() {
    var C = RG.deChapters || [], c = C[deC]; if (!c || !$("#de-rail")) return;
    deRead[c.id] = true;
    $("#de-count").textContent = Object.keys(deRead).length + " of " + C.length + " chapters opened";
    $("#de-rail").innerHTML = C.map(function (x, i) { return '<button type="button" class="de-dot' + (i === deC ? " on" : "") + (deRead[x.id] ? " read" : "") + '" data-dec="' + i + '" title="' + esc(x.title) + '"><b>' + x.n + "</b><span>" + esc(x.title) + "</span></button>"; }).join("");
    var body = "";
    if (deTab === "big") body = '<p class="de-big">' + c.big + "</p><p>" + c.summary + "</p>";
    if (deTab === "points") body = '<div class="de-pts">' + (c.points || []).map(function (p, i) { return '<div class="de-pt" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"><b>' + esc(p.head) + "</b><p>" + p.text + "</p></div>"; }).join("") + "</div>";
    if (deTab === "stories") body = (c.illustrations || []).length ? (c.illustrations || []).map(function (s) { return '<div class="panel gold"><div class="label">' + esc(s.title) + "</div><p>" + s.text + "</p></div>"; }).join("") : '<p class="note">This chapter teaches directly, without a featured story.</p>';
    if (deTab === "words") body = (c.words || []).length ? '<div class="grid">' + c.words.map(function (w) { return '<article class="gterm"><h3>' + esc(w.word) + "</h3><p>" + w.meaning + "</p></article>"; }).join("") + "</div>" : '<p class="note">No word studies in this chapter.</p>';
    if (deTab === "questions") body = (c.questions || []).length ? '<div class="qa">' + c.questions.map(function (q, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + q.q + '</summary><div class="ans"><p style="color:var(--ink)">' + q.a + "</p></div></details>"; }).join("") + "</div>" : '<p class="note">No questions in this chapter.</p>';
    if (deTab === "scriptures") body = '<div class="chips">' + (c.scriptures || []).map(function (r) { return '<span class="chip">' + esc(r) + "</span>"; }).join("") + "</div>";
    if (deTab === "reflect") body = '<div class="panel uni"><div class="label">Pause and reflect</div><p style="font-size:19px">' + c.reflect + "</p></div>";
    $("#de-card").innerHTML = '<article class="de-card"><div class="row" style="justify-content:space-between"><div class="label">Chapter ' + c.n + " of " + C.length + "</div>" + saveBtn("dech", c.id) + "</div><h3>" + esc(c.title) + '</h3><div class="chips de-tabs">' + DET.map(function (t) { return '<button class="chip" type="button" data-detab="' + t[0] + '" aria-pressed="' + (deTab === t[0]) + '">' + t[1] + "</button>"; }).join("") + '</div><div class="de-body" key="' + deTab + '">' + body + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-decm="-1"' + (deC === 0 ? " disabled" : "") + '>← Previous chapter</button><button class="btn" type="button" data-decm="1"' + (deC === C.length - 1 ? " disabled" : "") + ">Next chapter →</button></div></article>";
    var on = $("#de-rail .de-dot.on"), rl = $("#de-rail"); if (on && rl) rl.scrollTo({ left: on.offsetLeft - rl.clientWidth / 2 + on.clientWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }
  function fold(s) { return strip(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function deWordsShow() { if (!$("#de-words")) return; var q = fold(deWq); $("#de-words").innerHTML = (RG.deWords || []).filter(function (x) { return !q || fold(x.w.word + " " + x.w.meaning).indexOf(q) !== -1; }).map(function (x, i) { return '<article class="gterm" style="animation-delay:' + (Math.min(i, 20) * 0.03).toFixed(2) + 's"><h3>' + esc(x.w.word) + ' <span class="ref">Ch. ' + x.c.n + "</span></h3><p>" + x.w.meaning + "</p></article>"; }).join("") || '<p class="note">No word matches.</p>'; }
  function deQsShow() { if (!$("#de-qs")) return; var q = fold(deQq); $("#de-qs").innerHTML = (RG.deQs || []).filter(function (x) { return !q || fold(x.q.q + " " + x.q.a).indexOf(q) !== -1; }).map(function (x) { return "<details><summary>" + x.q.q + ' <span class="ref">Ch. ' + x.c.n + '</span></summary><div class="ans"><p style="color:var(--ink)">' + x.q.a + "</p></div></details>"; }).join("") || '<p class="note">No question matches.</p>'; }

  /* ---------- Myths & mistranslations ---------- */
  var mmI = 0, mmCat = "all", mmKind = "all", mmQ = "", mmBust = {}, mmBel = {}, mmShown = false;
  function mmList() { var q = mmQ.toLowerCase(); return A("mmMyths").filter(function (m) { return (mmCat === "all" || m.category === mmCat) && (mmKind === "all" || m.kind === mmKind) && (!q || strip(m.myth + " " + m.truth + " " + m.detail + " " + m.scripture).toLowerCase().indexOf(q) !== -1); }); }
  V.myths = function () {
    var M = A("mmMyths"), I = RG.mmIntro || {}, CN = A("mmCannot"), CL = A("mmClosing");
    return head("Myths and mistranslations", "Myths & mistranslations", "Sayings, traditions and translation choices many Christians repeat without checking, set beside what the text and its world actually say. Bust them one by one.") +
      ((I.summary || []).length ? '<section class="section"><div class="panel gold"><div class="label">Why this matters</div>' + I.summary.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div></section>" : "") +
      (M.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Bust the myths</h2><span class="count" id="mm-score"></span></div><div class="mm-tools"><input type="search" id="mm-q" placeholder="Search the myths…" aria-label="Search the myths" value="' + esc(mmQ) + '"><div class="chips">' + ["all"].concat(uniq(M, "category")).map(function (k) { return '<button class="chip" type="button" data-mmc="' + esc(k) + '" aria-pressed="' + (mmCat === k) + '">' + (k === "all" ? "Every topic" : esc(k)) + "</button>"; }).join("") + '</div><div class="chips">' + ["all", "Myth", "Mistranslation"].map(function (k) { return '<button class="chip" type="button" data-mmk="' + k + '" aria-pressed="' + (mmKind === k) + '">' + (k === "all" ? "Both" : k + "s") + "</button>"; }).join("") + '</div></div><div id="mm-deck"></div><div class="mm-bar" aria-hidden="true"><i id="mm-bar"></i></div><details class="mm-all"><summary>See every myth at a glance</summary><div class="mm-grid" id="mm-grid"></div></details></section>' : "") +
      (CN.length ? '<section class="section"><h2>Things God cannot do</h2><p class="note">Tap each one to see where Scripture says it.</p><div class="mm-cannot">' + CN.map(function (c, i) { return '<button type="button" class="mm-cn" data-mmcn style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><b>' + esc(c.text) + "</b><small>" + esc(c.ref) + "</small></button>"; }).join("") + "</div></section>" : "") +
      (CL.length ? '<section class="section"><div class="panel uni"><div class="label">Closing thoughts</div>' + CL.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><p class="note">The contents of this section summarise a published study in our own words. Where scholars debate a point, a note says so.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#culture">Culture decoder</a><a class="chip" href="#sayings">The words of Jesus</a><a class="chip" href="#debate">Debates & strawmen</a><a class="chip" href="#ways">How God works</a></div></section>';
  };
  function mmShow() {
    var L = mmList(), all = A("mmMyths"); if (!$("#mm-deck")) return;
    var nb = Object.keys(mmBust).length; $("#mm-score").textContent = nb + " of " + all.length + " busted" + (Object.keys(mmBel).length ? " · you believed " + Object.keys(mmBel).filter(function (k) { return mmBel[k]; }).length : "");
    $("#mm-bar").style.width = (all.length ? nb / all.length * 100 : 0) + "%";
    if (!L.length) { $("#mm-deck").innerHTML = '<p class="note">No myth matches your search.</p>'; $("#mm-grid").innerHTML = ""; return; }
    mmI = Math.max(0, Math.min(mmI, L.length - 1));
    var m = L[mmI], busted = !!mmBust[m.id];
    $("#mm-deck").innerHTML = '<article class="mm-card' + (busted ? " busted" : "") + '"><div class="row" style="justify-content:space-between"><span class="pill ' + (m.kind === "Mistranslation" ? "cultural" : "principle") + '"><i></i>' + esc(m.kind) + " #" + esc(String(m.n)) + " · " + esc(m.category) + "</span>" + saveBtn("mmyth", m.id) + '</div><div class="mm-myth"><div class="label">The ' + (m.kind === "Mistranslation" ? "common reading" : "myth") + '</div><h3>“' + esc(m.myth) + '”</h3>' + (busted ? '<span class="mm-stamp" aria-hidden="true">BUSTED</span>' : "") + "</div>" +
      (busted ? '<div class="panel uni mm-in"><div class="label">What is actually true</div><p>' + m.truth + '</p></div><div class="mm-in"><p>' + m.detail + '</p><div class="ref">' + esc(strip(m.scripture)) + "</div>" + (m.note ? '<p class="note" style="font-size:14.5px"><strong>Note:</strong> ' + m.note + "</p>" : "") + "</div>" :
        '<div class="row"><button class="btn ghost" type="button" data-mmb="1">I believed this</button><button class="btn ghost" type="button" data-mmb="0">I never did</button><button class="btn" type="button" id="mm-bust">Bust it</button></div>') +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-mmm="-1"' + (mmI === 0 ? " disabled" : "") + '>← Previous</button><span class="count">' + (mmI + 1) + " / " + L.length + '</span><button class="btn" type="button" data-mmm="1"' + (mmI === L.length - 1 ? " disabled" : "") + ">Next →</button></div></article>";
    $("#mm-grid").innerHTML = L.map(function (x, i) { return '<button type="button" class="mm-g' + (mmBust[x.id] ? " b" : "") + (i === mmI ? " on" : "") + '" data-mmg="' + i + '"><b>#' + esc(String(x.n)) + "</b> " + esc(x.myth) + "</button>"; }).join("");
  }

  /* ---------- How God works ---------- */
  var wyC = 0, wyCSeen = false, wyAns = {}, wyS = 0, wyVQ = 0, wyVAns = {}, wyPv = 2, wyLens = "relational", wyCase = 0, wyRc = 0, wyRcT = null, wyF = 0;
  var WYS = { does: "He does", doesnt: "He doesn’t", depends: "It depends" };
  V.ways = function () {
    var C = A("wyChar"), S = A("wySorter"), SC = A("wyScales"), VO = A("wyVoices"), VQ = A("wyVoiceQuiz"), PV = A("wyProvidence"), M = A("wyMatters"), SK = RG.wySkeleton || {}, CS = A("wyCases"), RC = A("wyReceive"), OS = A("wyObjSubj"), F = A("wyFactors");
    var E = A("wyEvidence1").concat(A("wyEvidence2"), A("wyEvidence3"), A("wyEvidence4"), A("wyEvidence5"));
    return head("Seen in Jesus", "How God works", "Who God is when we look at Jesus, what he does and does not do in our lives and in the world, how to tell his voice from our own, what really matters to him, why the gospel matters when techniques also change people, how to receive what is already given, and why some are spared and others are not.") +
      (C.length ? '<section class="section"><h2>God’s character, through the Jesus lens</h2><p class="note">Pick a trait. See how religion pictured it, then look through Jesus.</p><div class="idc-grid">' + C.map(function (c, i) { return '<button type="button" class="idc wyc' + (i === wyC ? " on" : "") + '" data-wyc="' + i + '">' + esc(c.trait) + "</button>"; }).join("") + '</div><div id="wyc-card"></div></section>' : "") +
      (SC.length ? '<section class="section"><h2>What God does, and does not do</h2><div class="chips">' + SC.map(function (s, i) { return '<button class="chip" type="button" data-wys="' + i + '" aria-pressed="' + (i === wyS) + '">' + esc(s.scale) + "</button>"; }).join("") + '</div><div id="wys-card"></div></section>' : "") +
      (S.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Does he, or doesn’t he?</h2><span class="count" id="wyst-score"></span></div><p class="note">Sort each statement about how God works.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + S.map(function (x) { return '<article class="sc" id="wyst-' + x.id + '"><p>' + x.statement + '</p><div class="chips">' + Object.keys(WYS).map(function (k) { return '<button class="chip" type="button" data-wyst="' + x.id + '" data-ans="' + k + '">' + WYS[k] + "</button>"; }).join("") + '</div><div class="sc-out" hidden></div></article>'; }).join("") + "</div></section>" : "") +
      (VQ.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Whose voice is it?</h2><span class="count" id="wyv-score"></span></div><p class="note">Read the inner message. Which voice is speaking?</p><div id="wyv-card"></div>' + (VO.length ? '<div class="grid" style="margin-top:14px">' + VO.map(function (v, i) { return '<article class="gterm wyvo v-' + esc(v.id) + '" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><h3>' + esc(v.voice) + "</h3><p>" + v.sounds + '</p><p style="font-size:15px"><strong>Fruit:</strong> ' + v.fruit + '</p><p style="font-size:15px"><strong>Test:</strong> ' + v.test + '</p><div class="verse">' + v.ref + "</div></article>"; }).join("") + "</div>" : "") + "</section>" : "") +
      (PV.length ? '<section class="section"><h2>How does God work in events?</h2><p class="note">Five Christian views of providence, from “God determines everything” to “God’s love cannot coerce”.</p><div class="lvp"><div class="lvp-track pa-sp"><i id="wypv-dot"></i></div><div class="lvp-stops">' + PV.map(function (p, i) { return '<button type="button" class="chip" data-wypv="' + i + '" aria-pressed="' + (i === wyPv) + '">' + esc(p.label) + "</button>"; }).join("") + '</div><div id="wypv-card"></div></div></section>' : "") +
      qxSection("wyq1", A("wyQA1"), "God’s character and ways: the deep questions") +
      (M.length ? '<section class="section"><h2>What really matters, and to whom?</h2><p class="note">How each gospel says these things affect your relationship with God, and how they matter to people.</p>' + cmode("wym", 0, 0, "Legal gospel", "Relational gospel") + '<div class="cmp-list mode-both" id="wym">' + M.map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">Legal gospel</div><p>' + r.legal + '</p></div><div class="panel uni cmp-r"><div class="label">Relational gospel</div><p>' + r.relational + '</p></div></div><div class="panel gold"><div class="label">How it matters to people</div><p>' + r.people + '</p></div><div class="ref">' + esc((r.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      ((SK.layers || []).length ? '<section class="section"><h2>Where does change come from? A skeleton</h2><p class="note">Five layers of a human life. Choose a lens to see which layers it works on, and how it says change happens.</p><div class="chips">' + (SK.lenses || []).map(function (l) { return '<button class="chip" type="button" data-wyl="' + esc(l.id) + '" aria-pressed="' + (wyLens === l.id) + '">' + esc(l.label) + "</button>"; }).join("") + '</div><div class="wysk"><div class="wysk-layers" id="wysk-layers"></div><div id="wysk-card"></div></div></section>' : "") +
      (CS.length ? '<section class="section"><h2>Case studies: three ways to change</h2><p class="note">Composite stories, not real people. Where needed, professional help is part of the answer.</p><div class="chips">' + CS.map(function (c, i) { return '<button class="chip" type="button" data-wycs="' + i + '" aria-pressed="' + (i === wyCase) + '">' + esc(c.title) + "</button>"; }).join("") + '</div><div id="wycs-card"></div></section>' : "") +
      (RC.length ? '<section class="section"><h2>From gift to experience</h2><p class="note">What God has given is real before we feel it. Watch the gift open.</p><div class="wyg" id="wyg"><svg viewBox="0 0 640 220" aria-hidden="true"><defs><radialGradient id="wygg"><stop offset="0" stop-color="#fff6dc"/><stop offset=".4" stop-color="#e0ae55"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs><circle class="wyg-glow" cx="320" cy="120" r="110" fill="url(#wygg)"/><g class="wyg-box"><rect x="260" y="110" width="120" height="90" rx="6"/><rect x="314" y="110" width="12" height="90" class="wyg-rib"/></g><g class="wyg-lid"><rect x="250" y="88" width="140" height="26" rx="6"/><rect x="314" y="88" width="12" height="26" class="wyg-rib"/></g>' + [0, 1, 2, 3, 4, 5].map(function (k) { return '<circle class="wyg-sp" cx="' + (200 + k * 48) + '" cy="' + (40 + (k % 2) * 30) + '" r="4"/>'; }).join("") + '</svg><div class="chips">' + RC.map(function (r, i) { return '<button class="chip" type="button" data-wyrc="' + i + '" aria-pressed="' + (i === wyRc) + '">' + (i + 1) + ". " + esc(r.label) + "</button>"; }).join("") + '</div><div class="row"><button class="btn" type="button" id="wyrc-play">Open the gift</button></div><div id="wyrc-card"></div></div></section>' : "") +
      (OS.length ? '<section class="section"><h2>Objective truth, subjective experience</h2><p class="note">What is true in Christ, how it may feel, and the bridge between them.</p>' + cmode("wyos", 0, 0, "True in Christ", "How it feels") + '<div class="cmp-list mode-both" id="wyos">' + OS.map(function (o) { return '<article class="cmp"><div class="cmp-pair"><div class="panel gold cmp-l"><div class="label">True in Christ</div><p style="font-size:19px">' + o.objective + '</p></div><div class="panel sep cmp-r"><div class="label">How it may feel</div><p>' + o.subjective + '</p></div></div><div class="panel uni"><div class="label">The bridge</div><p>' + o.bridge + '</p></div><div class="ref">' + esc(strip(o.ref)) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (F.length ? '<section class="section"><h2>Why some are spared and others are not</h2><p class="note">There is no single answer, and no one who suffers is to blame for “too little faith”. These are the factors Scripture and honest reflection point to.</p><div class="chips">' + F.map(function (f, i) { return '<button class="chip" type="button" data-wyf="' + i + '" aria-pressed="' + (i === wyF) + '">' + esc(f.factor) + "</button>"; }).join("") + '</div><div id="wyf-card"></div></section>' : "") +
      qxSection("wyq2", A("wyQA2"), "Change, receiving and tragedy: the deep questions") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">If you are grieving a tragedy or carrying trauma, you do not have to work it out alone: reach out to people you trust and, where needed, a qualified professional or your local emergency services.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#love">God is love: one nature</a><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#living">Living it out</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#paths">Ancient paths & encounters</a></div></section>';
  };
  function wycShow() {
    var C = A("wyChar"), c = C[wyC]; if (!c || !$("#wyc-card")) return;
    $$(".wyc").forEach(function (b, i) { b.classList.toggle("on", i === wyC); });
    $("#wyc-card").innerHTML = '<article class="vph-card wyc-card' + (wyCSeen ? " seen" : "") + '"><div class="row" style="justify-content:space-between"><div class="label">' + esc(c.trait) + "</div>" + saveBtn("wchar", c.id) + '</div><div class="panel sep wyc-dist"><div class="label">How religion often pictured it</div><p>' + c.distortion + "</p></div>" + (wyCSeen ? '<div class="panel uni wyc-jesus"><div class="label">Through the Jesus lens</div><p>' + c.jesus + '</p><p style="font-size:15px"><strong>See it:</strong> ' + c.scene + '</p><div class="verse">' + c.ref + "</div></div>" : '<div class="row"><button class="btn" type="button" id="wyc-see">Look through Jesus</button></div>') + "</article>";
  }
  function wysShow() {
    var SC = A("wyScales"), s = SC[wyS]; if (!s || !$("#wys-card")) return;
    $$("[data-wys]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wys === wyS)); });
    function li(L) { return (L || []).map(function (x, i) { return '<li style="animation-delay:' + (i * 0.07).toFixed(2) + 's">' + x.t + ' <span class="ref">' + esc(strip(x.ref)) + "</span></li>"; }).join(""); }
    $("#wys-card").innerHTML = '<div class="wys"><div class="panel uni"><div class="label">He does</div><ul class="wys-l">' + li(s.does) + '</ul></div><div class="panel sep"><div class="label">He does not</div><ul class="wys-l">' + li(s.doesnt) + '</ul></div></div><p class="note" style="margin-top:10px">' + s.note + "</p>";
  }
  function wystScore() { var S = A("wySorter"), n = 0, r = 0; S.forEach(function (x) { if (wyAns[x.id]) { n++; if (wyAns[x.id] === x.answer) r++; } }); if ($("#wyst-score")) $("#wyst-score").textContent = n ? r + " of " + n + " match the study" : S.length + " statements"; }
  function wyvShow() {
    var VQ = A("wyVoiceQuiz"), VO = A("wyVoices"), q = VQ[wyVQ]; if (!q || !$("#wyv-card")) return;
    var n = 0, r = 0; VQ.forEach(function (x) { if (wyVAns[x.id]) { n++; if (wyVAns[x.id] === x.answer) r++; } }); $("#wyv-score").textContent = n ? r + " of " + n + " match" : VQ.length + " messages";
    var a = wyVAns[q.id], vname = function (id) { var v = VO.filter(function (y) { return y.id === id; })[0]; return v ? v.voice : id; };
    $("#wyv-card").innerHTML = '<article class="sc wyv' + (a ? " answered" : "") + '"><div class="label">Message ' + (wyVQ + 1) + " of " + VQ.length + '</div><p class="wyv-msg">“' + q.message + '”</p><div class="chips">' + VO.map(function (v) { return '<button class="chip' + (v.id === q.answer ? " right" : "") + '" type="button" data-wyv="' + esc(v.id) + '" aria-pressed="' + (a === v.id) + '">' + esc(v.voice) + "</button>"; }).join("") + "</div>" + (a ? '<div class="sc-out"><div class="label">' + (a === q.answer ? "Yes: " : "Most likely: ") + esc(vname(q.answer)) + "</div><p>" + q.why + "</p></div>" : "") + '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-wyvm="-1"' + (wyVQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-wyvm="1"' + (wyVQ === VQ.length - 1 ? " disabled" : "") + ">Next message →</button></div></article>";
  }
  function wypvShow() {
    var PV = A("wyProvidence"), p = PV[wyPv]; if (!p || !$("#wypv-card")) return;
    $$("[data-wypv]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wypv === wyPv)); });
    $("#wypv-dot").style.left = (PV.length > 1 ? wyPv / (PV.length - 1) * 100 : 50) + "%";
    $("#wypv-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(strip(p.who)) + "</div><h3>" + esc(p.label) + "</h3><p>" + p.view + '</p><p style="font-size:15px"><strong>Applied:</strong> ' + p.example + '</p><div class="cmp-pair"><div class="panel uni"><div class="label">Strength</div><p>' + p.strength + '</p></div><div class="panel sep"><div class="label">Weakness</div><p>' + p.weakness + "</p></div></div></article>";
  }
  function wyskShow() {
    var SK = RG.wySkeleton || {}, L = SK.layers || [], ln = (SK.lenses || []).filter(function (x) { return x.id === wyLens; })[0]; if (!$("#wysk-layers") || !ln) return;
    $$("[data-wyl]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.wyl === wyLens)); });
    var fo = ln.focus || [];
    $("#wysk-layers").className = "wysk-layers lens-" + wyLens;
    $("#wysk-layers").innerHTML = L.map(function (l, i) { var on = fo.indexOf(l.id) !== -1; return '<div class="wysk-l' + (on ? " on" : "") + '" style="--i:' + i + '"><b>' + esc(l.label) + "</b><span>" + l.text + "</span></div>"; }).join("");
    $("#wysk-card").innerHTML = '<article class="vph-card"><h3>' + esc(ln.label) + "</h3><p>" + ln.flow + '</p><div class="cmp-pair"><div class="panel uni"><div class="label">Strength</div><p>' + ln.strength + '</p></div><div class="panel sep"><div class="label">Flaw or gap</div><p>' + ln.flaw + "</p></div></div></article>";
  }
  function wycsShow() {
    var CS = A("wyCases"), c = CS[wyCase]; if (!c || !$("#wycs-card")) return;
    $$("[data-wycs]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wycs === wyCase)); });
    $("#wycs-card").innerHTML = '<article class="vph-card"><h3>' + esc(c.person) + '</h3><div class="wycs3"><div class="panel sep"><div class="label">Legal gospel</div><p>' + c.legal + '</p></div><div class="panel gold"><div class="label">Techniques only</div><p>' + c.secular + '</p></div><div class="panel uni"><div class="label">Relational gospel</div><p>' + c.relational + '</p></div></div><p style="font-size:15.5px"><strong>Outcome:</strong> ' + c.outcome + "</p></article>";
  }
  function wyrcShow() {
    var RC = A("wyReceive"), r = RC[wyRc]; if (!r || !$("#wyg")) { clearInterval(wyRcT); return; }
    $("#wyg").className = "wyg st-" + wyRc;
    $$("[data-wyrc]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wyrc === wyRc)); });
    $("#wyrc-card").innerHTML = '<article class="vph-card"><div class="label">' + (wyRc + 1) + " of " + RC.length + " · " + esc(r.label) + "</div><h3>" + r.title + "</h3><p>" + r.text + '</p><div class="ref">' + esc(strip(r.ref)) + "</div></article>";
  }
  function wyfShow() {
    var F = A("wyFactors"), f = F[wyF]; if (!f || !$("#wyf-card")) return;
    $$("[data-wyf]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.wyf === wyF)); });
    $("#wyf-card").innerHTML = '<article class="vph-card"><h3>' + esc(f.factor) + "</h3><p>" + f.text + '</p><div class="verse">' + f.ref + '</div><div class="panel sep"><div class="label">Careful</div><p>' + f.caution + "</p></div></article>";
  }

  /* ---------- Born again ---------- */
  var rbSt = 0, rbStT = null, rbLine = 0, rbLT = null, rbA = 0, rbB = 3;
  V.reborn = function () {
    var ST = A("rbStages"), J = A("rbJohn3"), IM = A("rbImages"), VW = A("rbViews"), E = A("rbEvidence1").concat(A("rbEvidence2"));
    return head("Born from above", "Born again", "What Jesus meant by being “born again” (or “born from above”), why we need it, and how it happens. Walk through Nicodemus’s night conversation line by line, see the images Scripture uses for new birth, and compare how every major tradition understands it.") +
      (ST.length ? '<section class="section"><h2>The story of new birth</h2><p class="note">Tap a stage, or watch the whole story unfold.</p><div class="rbs" id="rbs"><svg viewBox="0 0 640 240" aria-hidden="true"><defs><radialGradient id="rbg"><stop offset="0" stop-color="#fff6dc"/><stop offset=".45" stop-color="#e0ae55"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs><rect class="rbs-dark" x="0" y="0" width="640" height="240" rx="16"/><g class="rbs-rays">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (k) { return '<line x1="320" y1="120" x2="' + (320 + 200 * Math.cos(k * Math.PI / 6)).toFixed(0) + '" y2="' + (120 + 200 * Math.sin(k * Math.PI / 6)).toFixed(0) + '"/>'; }).join("") + '</g><circle class="rbs-breath" cx="320" cy="120" r="60"/><circle class="rbs-core" cx="320" cy="120" r="14" fill="url(#rbg)"/><path class="rbs-grow" d="M320 200 C 320 170, 320 150, 320 132 M320 168 C 300 160, 290 150, 286 140 M320 158 C 340 150, 350 140, 354 130"/></svg><div class="chips">' + ST.map(function (s, i) { return '<button class="chip" type="button" data-rbs="' + i + '" aria-pressed="' + (i === rbSt) + '">' + (i + 1) + ". " + esc(s.label) + "</button>"; }).join("") + '</div><div class="row"><button class="btn" type="button" id="rbs-play">Watch the story</button></div><div id="rbs-card"></div></div></section>' : "") +
      (J.length ? '<section class="section"><h2>Night conversation: John 3</h2><p class="note">Read it as a conversation. Tap a line to see the Greek and the culture behind it.</p><div class="rbj" id="rbj"></div><div class="row"><button class="btn" type="button" id="rbj-next">Next line →</button><button class="btn ghost" type="button" id="rbj-all">Show the whole conversation</button><button class="btn ghost" type="button" id="rbj-reset">Start again</button></div></section>' : "") +
      (IM.length ? '<section class="section"><h2>How Scripture pictures new birth</h2><div class="grid">' + IM.map(function (m, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><div class="orig">' + esc(m.original) + "</div><h3>" + esc(m.image) + ' <span class="ref">' + esc(m.ref) + "</span></h3><p>" + m.meaning + '</p><p style="color:var(--dawn);font-size:15px">' + m.relational + "</p></article>"; }).join("") + "</div></section>" : "") +
      (VW.length ? '<section class="section"><h2>Compare the traditions</h2><p class="note">Choose any two traditions to see them side by side.</p><div class="rbv-pick"><select id="rbv-a" aria-label="First tradition">' + VW.map(function (v, i) { return '<option value="' + i + '"' + (i === rbA ? " selected" : "") + ">" + esc(v.tradition) + "</option>"; }).join("") + '</select><span aria-hidden="true">vs</span><select id="rbv-b" aria-label="Second tradition">' + VW.map(function (v, i) { return '<option value="' + i + '"' + (i === rbB ? " selected" : "") + ">" + esc(v.tradition) + "</option>"; }).join("") + '</select></div><div class="rbv" id="rbv"></div></section>' : "") +
      qxSection("rbq", A("rbQA")) +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#saviour">Why a Saviour?</a><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#worship">Worship in Spirit & truth</a></div></section>';
  };
  function rbsShow() {
    var ST = A("rbStages"), s = ST[rbSt], root = $("#rbs"); if (!s || !root) { clearInterval(rbStT); return; }
    root.className = "rbs st-" + rbSt;
    $$("[data-rbs]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.rbs === rbSt)); });
    $("#rbs-card").innerHTML = '<article class="vph-card"><div class="label">Stage ' + (rbSt + 1) + " of " + ST.length + "</div><h3>" + s.title + "</h3><p>" + s.text + '</p><div class="ref">' + esc((s.refs || []).join(" · ")) + "</div></article>";
  }
  function rbjShow() {
    var J = A("rbJohn3"); if (!$("#rbj")) { clearInterval(rbLT); return; }
    $("#rbj").innerHTML = J.slice(0, rbLine + 1).map(function (l, i) { var who = l.speaker === "Jesus" ? "je" : l.speaker === "Nicodemus" ? "ni" : "na"; return '<button type="button" class="rbj-b ' + who + '" data-rbj="' + i + '"><span class="label">' + esc(l.speaker) + " · " + esc(l.ref) + "</span><span class=\"rbj-t\">" + l.text + "</span>" + '<span class="rbj-n" hidden>' + (l.greek ? '<span class="gorig">' + esc(l.greek) + "</span>" : "") + l.note + "</span></button>"; }).join("");
    var nx = $("#rbj-next"); if (nx) nx.disabled = rbLine >= J.length - 1;
    var last = $("#rbj .rbj-b:last-child"); if (last && rbLine > 0) last.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  }
  function rbvShow() {
    var VW = A("rbViews"); if (!$("#rbv")) return;
    function card(v) { return '<article class="vph-card"><div class="label">' + v.when + "</div><h3>" + esc(v.tradition) + "</h3><p>" + v.how + '</p><p style="font-size:15px"><strong>Sign:</strong> ' + v.sign + '</p><div class="verse">' + v.scripture + '</div><div class="panel uni"><div class="label">Strength</div><p>' + v.strength + '</p></div><div class="panel sep"><div class="label">Critique</div><p>' + v.critique + "</p></div></article>"; }
    $("#rbv").innerHTML = (VW[rbA] ? card(VW[rbA]) : "") + (VW[rbB] ? card(VW[rbB]) : "");
  }

  /* ---------- Made for each other ---------- */
  var dsR = 0, dsRel = "all", dsKind = "all";
  var DSF = [["design", "Design"], ["reason", "Reason"], ["capacity", "Capacity"], ["responsibility", "Responsibility"], ["purpose", "Purpose"]];
  V.design = function () {
    var D = A("dsDesign"), T = A("dsTrinity"), C = A("dsCorrupt"), X = A("dsExamples"), E = A("dsEvidence1").concat(A("dsEvidence2"), A("dsEvidence3"));
    return '<a class="bl-banner" href="#blood"><b>New: The life is in the blood</b><span>How blood is designed to carry life and cleanse, and what it means from the Passover to the cross →</span></a><a class="bl-banner wm-banner" href="#woman"><b>New: Man, woman & Genesis</b><span>Why man first, Genesis 1 and 2, why their eyes opened after Adam ate, and women’s dignity in God’s story →</span></a>' + head("Made in love, for love", "Made for each other", "Why God created at all, and the design behind man and woman, marriage, children, family and friendship: their reason, capacity, responsibility and purpose. What humanity built instead, and how the gospel of union restores it, with the great relationship stories of the Bible read through the relational lens.") +
      (D.length ? '<section class="section"><h2>The design of every relationship</h2><p class="note">Choose a relationship to see its design, unfolded.</p><div class="chips">' + D.map(function (d, i) { return '<button class="chip" type="button" data-dsr="' + i + '" aria-pressed="' + (i === dsR) + '">' + esc(d.rel) + "</button>"; }).join("") + '</div><div id="dsr-card"></div></section>' : "") +
      (T.length ? '<section class="section"><h2>Mirrors of the Trinity</h2><p class="note">Human love at its best echoes the life of Father, Son and Spirit. Tap to see the reflection.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))">' + T.map(function (t) { return '<button type="button" class="flip ds-tri" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front cf-front"><div class="label">In the Trinity</div><h3>' + esc(t.trinity) + '</h3><span class="note" style="font-size:14px">Tap to see it in us</span></div><div class="flip-face back"><div class="label">In us</div><p>' + t.human + '</p><div class="ref">' + esc(t.ref) + "</div></div></div></button>"; }).join("") + "</div></section>" : "") +
      (C.length ? '<section class="section"><h2>What humanity built instead</h2><p class="note">Each counterfeit copies something good. Tap to see why we reach for it, and the way back.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + C.map(function (c) { return '<button type="button" class="flip ds-cor" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">Counterfeit of ' + esc(strip(c.design)) + "</div><h3>" + esc(c.label) + '</h3><p style="font-size:15px">' + c.what + '</p><span class="note" style="font-size:14px">Tap for why, and the way back</span></div><div class="flip-face back"><div class="label" style="color:var(--wine)">Why we reach for it</div><p>' + c.why + '</p><div class="label">The way back</div><p>' + c.healing + '</p><div class="ref">' + esc((c.refs || []).join(" · ")) + "</div></div></div></button>"; }).join("") + "</div></section>" : "") +
      (X.length ? '<section class="section"><h2>Relationships in the Bible, through the relational lens</h2><div class="chips">' + ["all"].concat(uniq(X, "relation")).map(function (k) { return '<button class="chip" type="button" data-dsx="' + esc(k) + '" aria-pressed="' + (dsRel === k) + '">' + (k === "all" ? "Every relationship" : esc(k)) + "</button>"; }).join("") + '</div><div class="chips">' + ["all", "Beautiful", "Broken", "Redeemed"].map(function (k) { return '<button class="chip" type="button" data-dsk="' + k + '" aria-pressed="' + (dsKind === k) + '">' + (k === "all" ? "Every kind" : k) + "</button>"; }).join("") + '</div><div class="grid" id="dsx" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))"></div></section>' : "") +
      qxSection("dsq", A("dsQA")) +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">If a relationship involves abuse or you feel unsafe, your safety comes first: reach out to a trusted person, a qualified professional, or your local emergency services.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#why">The why of design</a><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#forgive">Forgiveness & repair</a><a class="chip" href="#living">Living it out</a><a class="chip" href="#trinity">The Trinity at work</a></div></section>';
  };
  function dsrShow() {
    var D = A("dsDesign"), d = D[dsR]; if (!d || !$("#dsr-card")) return;
    $$("[data-dsr]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.dsr === dsR)); });
    $("#dsr-card").innerHTML = '<article class="dsr"><div class="row" style="justify-content:space-between"><h3>' + esc(d.rel) + "</h3>" + saveBtn("drel", d.id) + '</div><div class="dsr-facets">' + DSF.map(function (f, i) { return '<div class="dsr-f" style="animation-delay:' + (i * 0.12).toFixed(2) + 's"><div class="label">' + f[1] + "</div><p>" + d[f[0]] + "</p></div>"; }).join("") + '</div><div class="cmp-pair"><div class="panel sep dsr-f" style="animation-delay:.7s"><div class="label">Humanity’s alternative</div><p>' + d.corruption + '</p></div><div class="panel uni dsr-f" style="animation-delay:.85s"><div class="label">Restored in Christ</div><p>' + d.restored + '</p></div></div><div class="ref">' + esc((d.refs || []).join(" · ")) + "</div></article>";
  }
  function dsxShow() {
    if (!$("#dsx")) return;
    $("#dsx").innerHTML = A("dsExamples").filter(function (x) { return (dsRel === "all" || x.relation === dsRel) && (dsKind === "all" || x.kind === dsKind); }).map(function (x, i) { return '<article class="dsx k-' + esc(x.kind.toLowerCase()) + '" style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><div class="row" style="justify-content:space-between"><span class="pill"><i></i>' + esc(x.kind) + " · " + esc(x.relation) + "</span>" + saveBtn("dex", x.id) + "</div><h3>" + esc(x.who) + ' <span class="ref">' + esc(x.ref) + '</span></h3><p style="font-size:15.5px">' + x.story + '</p><div class="panel uni"><div class="label">Through the relational lens</div><p>' + x.lens + '</p></div><p style="font-size:15px"><strong>For us:</strong> ' + x.lesson + "</p></article>"; }).join("") || '<p class="note">No story matches both filters.</p>';
  }

  /* ---------- Why a Saviour? ---------- */
  var svF = 0, svBroken = {}, svStep = -1, svTimer = null, svP = 0, svA = 0, svQ = 0, svGrp = "all";
  var SVG_ = [["all", "Every question"], ["svQA1", "Why a Saviour?"], ["svQA2", "Sharing it, and after yes"]];
  var SVK = { start: "Start", claim: "Claim", decision: "Decision", outcome: "Outcome", tension: "Tension", rest: "Rest" };
  function svList() { return svGrp === "all" ? RG.svAllQA || [] : A(svGrp); }
  V.saviour = function () {
    RG.svAllQA = A("svQA1").concat(A("svQA2"));
    var F = A("svFrom"), FL = RG.svFlow || {}, P = A("svPeople"), N = A("svNots"), O = A("svObjections"), AF = A("svAfter");
    var E = A("svEvidence1").concat(A("svEvidence2"), A("svEvidence3"), A("svEvidence4"), A("svEvidence5"));
    return head("Rescued, healed, brought home", "Why a Saviour?", "From what did Jesus save us, and why does anyone need a Saviour, even the kind, moral person next door? The evangelical answer and the relational answer side by side, Baxter Kruger’s “I am not’s”, how to share it, and what life looks like after saying yes.") +
      (F.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Saved from what?</h2><span class="count" id="svf-count"></span></div><p class="note">Tap each chain to see what Jesus broke, and how the two gospels name it.</p><div class="svf-grid" id="svf-grid"></div><div id="svf-card"></div></section>' : "") +
      ((FL.legal || []).length ? '<section class="section"><h2>Two flowcharts: how each gospel meets a good person</h2><p class="note">Press play to walk both roads side by side. Red steps are where tension appears.</p><div class="row"><button class="btn" type="button" id="svfl-play">Play both</button><button class="btn ghost" type="button" id="svfl-all">Show all</button></div><div class="svfl"><div class="svfl-col legal"><div class="label">The legal gospel</div><div id="svfl-l"></div></div><div class="svfl-col rel"><div class="label">The relational gospel</div><div id="svfl-r"></div></div></div></section>' : "") +
      (P.length ? '<section class="section"><h2>“But they’re a good person”</h2><p class="note">Choose someone. See what each gospel says to them, and how to talk with them.</p><div class="chips">' + P.map(function (p, i) { return '<button class="chip" type="button" data-svp="' + i + '" aria-pressed="' + (i === svP) + '">' + esc(p.who) + "</button>"; }).join("") + '</div><div id="svp-card"></div></section>' : "") +
      (N.length ? '<section class="section"><h2>The “I am not’s”</h2><p class="note">The lies Adam’s race believes. Tap each one to hear the truth, and notice: Christians believe them too.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr))">' + N.map(function (n) { return '<button type="button" class="flip sv-not" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The lie</div><h3>“' + esc(n.not) + '”</h3><span class="note" style="font-size:14px">Tap for the truth</span></div><div class="flip-face back"><div class="label">The truth</div><h3 style="font-size:20px">' + n.truth + '</h3><div class="ref">' + n.ref + '</div><p style="font-size:14.5px"><strong>In everyone:</strong> ' + n.everyone + '</p><p style="font-size:14.5px"><strong>In believers:</strong> ' + n.believers + '</p><span class="ref" style="font-size:11px">' + esc(strip(n.source || "")) + "</span></div></div></button>"; }).join("") + "</div></section>" : "") +
      (A("svKrugerCrit").length ? '<section class="section"><h2>Criticisms of Kruger’s teaching, and responses</h2><p class="note">The strongest criticisms of the “I am not’s” and Trinitarian inclusion, in the critics’ own best words. Tap for what they get right and the response.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + A("svKrugerCrit").map(function (o) { return '<button type="button" class="flip pa-obj" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">Criticism · ' + esc(strip(o.who)) + "</div><h3>" + o.criticism + '</h3><span class="ref">' + esc(strip(o.scripture)) + '</span><span class="note" style="font-size:14px">Tap for the response</span></div><div class="flip-face back"><div class="label" style="color:var(--gold)">What it gets right</div><p>' + o.concede + '</p><div class="label">The response</div><p>' + o.response + "</p></div></div></button>"; }).join("") + "</div></section>" : "") +
      (RG.svAllQA.length ? '<section class="section"><h2>The deep questions</h2><div class="chips">' + SVG_.filter(function (g) { return g[0] === "all" || A(g[0]).length; }).map(function (g) { return '<button class="chip" type="button" data-svgr="' + g[0] + '" aria-pressed="' + (svGrp === g[0]) + '">' + esc(g[1]) + "</button>"; }).join("") + '</div><div class="compass"><div class="compass-list" id="svq-list"></div><div id="svq-card"></div></div></section>' : "") +
      (O.length ? '<section class="section"><h2>Evangelical objections, answered</h2><p class="note">Each objection in its own best words. Tap for what it gets right and the response.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + O.map(function (o) { return '<button type="button" class="flip pa-obj" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The objection · ' + esc(strip(o.who)) + "</div><h3>" + o.objection + '</h3><span class="ref">' + esc(strip(o.scripture)) + '</span><span class="note" style="font-size:14px">Tap for the response</span></div><div class="flip-face back"><div class="label" style="color:var(--gold)">What it gets right</div><p>' + o.concede + '</p><div class="label">The relational response</div><p>' + o.response + "</p></div></div></button>"; }).join("") + "</div></section>" : "") +
      (AF.length ? '<section class="section"><h2>After saying yes</h2><p class="note">Not a ladder to climb, but a life to enjoy from the centre: union with Christ. Tap any part of the circle.</p><div class="svw-wrap"><div class="svw" id="svw"><div class="svw-ring" aria-hidden="true"></div><div class="svw-c">In Christ</div>' + AF.map(function (a, i) { var ang = -Math.PI / 2 + i / AF.length * Math.PI * 2; return '<button type="button" class="svw-b" data-sva="' + i + '" style="left:' + (50 + 37 * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + 37 * Math.sin(ang)).toFixed(1) + '%">' + esc(a.area) + "</button>"; }).join("") + '</div><div id="sva-card"></div></div></section>' : "") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#share">Sharing the good news</a><a class="chip" href="#big">Big questions</a><a class="chip" href="#compare">Legal vs relational</a><a class="chip" href="#identity">Identity & heart healing</a><a class="chip" href="#newcreation">New creation & the old self</a></div></section>';
  };
  function svfShow() {
    var F = A("svFrom"); if (!$("#svf-grid")) return;
    $("#svf-grid").innerHTML = F.map(function (f, i) { return '<button type="button" class="svf' + (svBroken[f.id] ? " broken" : "") + (i === svF ? " on" : "") + '" data-svf="' + i + '"><span class="svf-ch" aria-hidden="true"><i></i><i></i></span>' + esc(f.from) + "</button>"; }).join("");
    var n = F.filter(function (f) { return svBroken[f.id]; }).length; $("#svf-count").textContent = n + " of " + F.length + " broken";
    var f = F[svF]; if (!f || !svBroken[f.id]) { $("#svf-card").innerHTML = ""; return; }
    $("#svf-card").innerHTML = '<article class="vph-card"><div class="row" style="justify-content:space-between"><div class="label">Saved from</div>' + saveBtn("sfrom", f.id) + "</div><h3>" + esc(f.from) + "</h3>" + (f.word ? '<div class="gorig">' + esc(f.word) + "</div>" : "") + '<div class="cmp-pair"><div class="panel sep"><div class="label">The legal gospel</div><p>' + f.legal + '</p></div><div class="panel uni"><div class="label">The relational gospel</div><p>' + f.relational + '</p></div></div><div class="ref">' + esc((f.refs || []).join(" · ")) + "</div></article>";
  }
  function svflShow() {
    var FL = RG.svFlow || {}; if (!$("#svfl-l")) { clearInterval(svTimer); return; }
    function col(L) { return L.map(function (s, i) { var vis = i <= svStep; return (i ? '<div class="svfl-arrow' + (vis ? " in" : "") + '" aria-hidden="true">↓</div>' : "") + '<div class="svfl-step k-' + esc(s.kind) + (vis ? " in" : "") + '"><span class="pill"><i></i>' + esc(SVK[s.kind] || s.kind) + "</span><b>" + esc(s.step) + "</b><p>" + s.text + "</p></div>"; }).join(""); }
    $("#svfl-l").innerHTML = col(FL.legal || []); $("#svfl-r").innerHTML = col(FL.relational || []);
  }
  function svpShow() {
    var P = A("svPeople"), p = P[svP]; if (!p || !$("#svp-card")) return;
    $$("[data-svp]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.svp === svP)); });
    $("#svp-card").innerHTML = '<article class="vph-card"><div class="row" style="justify-content:space-between"><h3>' + esc(p.who) + "</h3>" + saveBtn("sppl", p.id) + "</div><p>" + p.description + '</p><div class="cmp-pair"><div class="panel sep"><div class="label">What the legal gospel tells them</div><p>' + p.legal + '</p></div><div class="panel uni"><div class="label">What the relational gospel tells them</div><p>' + p.relational + '</p></div></div><div class="panel gold"><div class="label">How to talk with them</div><p>' + p.share + "</p></div></article>";
  }
  function svaShow() {
    var AF = A("svAfter"), a = AF[svA]; if (!a || !$("#sva-card")) return;
    $$(".svw-b").forEach(function (b, i) { b.classList.toggle("on", i === svA); });
    $("#sva-card").innerHTML = '<article class="vph-card"><div class="row" style="justify-content:space-between"><div class="label">' + (svA + 1) + " of " + AF.length + "</div>" + saveBtn("safter", a.id) + "</div><h3>" + esc(a.area) + "</h3><p>" + a.what + '</p><div class="panel uni"><div class="label">Why, in union</div><p>' + a.why + '</p></div><div class="panel sep"><div class="label">What it is not</div><p>' + a.not + '</p></div><div class="ref">' + esc((a.refs || []).join(" · ")) + "</div></article>";
  }
  function svqShow() {
    var Q = svList(); if (!Q.length || !$("#svq-list")) return;
    svQ = Math.min(svQ, Q.length - 1);
    $("#svq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-svq="' + i + '" aria-current="' + (i === svQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[svQ];
    $("#svq-card").innerHTML = '<article class="compass-card"><div class="row" style="justify-content:space-between"><div class="label">Question ' + (svQ + 1) + " of " + Q.length + "</div>" + saveBtn("sq", q.id) + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + sec.title + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? evGrid(q.evidence) : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-svqm="-1"' + (svQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-svqm="1"' + (svQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }

  /* ---------- Identity & heart healing ---------- */
  var idCat = "all", idC = 0, idStage = 0, idG = 0, idLie = 0, idAns = {}, idL = 0, idQ = 0, idGrp = "all";
  var IDG = [["all", "Every question"], ["idQA1", "In Christ & the mind"], ["idQA2", "Heart healing & Word of Faith"]];
  var IDS = { confession: "Confession of faith", denial: "Denial", lament: "Honest lament" };
  function idList() { return idGrp === "all" ? RG.idAllQA || [] : A(idGrp); }
  V.identity = function () {
    RG.idAllQA = A("idQA1").concat(A("idQA2"));
    var C = A("idInChrist"), G = A("idGap"), L = A("idLies"), S = A("idSorter"), LY = A("idLayers"), AP = A("idApproaches"), WF = A("idWof"), SC = A("idScience");
    var E = A("idEvidence1").concat(A("idEvidence2"), A("idEvidence3"), A("idEvidence4"));
    return head("True in Christ, healed in the heart", "Identity & heart healing", "What is true of you in Christ, and how that truth reaches the places that still hurt. Confession and declaration, renewing the mind, healing of the heart, the problem with Word of Faith, and what Scripture and research say about how people really change.") +
      (C.length ? '<section class="section"><h2>In Christ: what is true of you</h2><p class="note">Tap a truth. Then let your heart answer honestly, and let the truth land.</p><div class="chips">' + ["all"].concat(uniq(C, "category")).map(function (k) { return '<button class="chip" type="button" data-idcat="' + esc(k) + '" aria-pressed="' + (idCat === k) + '">' + (k === "all" ? "Every truth" : esc(k)) + "</button>"; }).join("") + '</div><div class="idc-grid" id="idc-grid"></div><div id="idc-card"></div></section>' : "") +
      (G.length ? '<section class="section"><h2>From head to heart</h2><p class="note">Many people know who they are in Christ but do not feel it. Drag to see the journey from knowing to being.</p><div class="idg" id="idg"><svg viewBox="0 0 640 200" aria-hidden="true"><circle class="idg-h" cx="200" cy="100" r="70"/><text class="tl idg-ht" x="200" y="104" text-anchor="middle">HEAD</text><circle class="idg-r" cx="440" cy="100" r="70"/><text class="tl idg-rt" x="440" y="104" text-anchor="middle">HEART</text></svg><input type="range" id="idg-r" min="0" max="' + (G.length - 1) + '" step="1" value="' + idG + '" aria-label="Move from head to heart"><div class="lvb-ticks">' + G.map(function (g, i) { return '<button type="button" data-idg="' + i + '">' + esc(g.label) + "</button>"; }).join("") + '</div><div id="idg-card"></div></div></section>' : "") +
      (L.length ? '<section class="section"><h2>Exchange a lie for the truth</h2><p class="note">Which sentence does your heart sometimes say? Choose one, gently.</p><div class="chips">' + L.map(function (l, i) { return '<button class="chip" type="button" data-idl="' + i + '" aria-pressed="' + (i === idLie) + '">' + esc(l.lie) + "</button>"; }).join("") + '</div><div id="idl-card"></div></section>' : "") +
      (S.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Confession, denial, or lament?</h2><span class="count" id="ids-score"></span></div><p class="note">Faith is not pretending. Sort each sentence.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + S.map(function (x) { return '<article class="sc" id="ids-' + x.id + '"><p>“' + x.statement + '”</p><div class="chips">' + Object.keys(IDS).map(function (k) { return '<button class="chip" type="button" data-ids="' + x.id + '" data-ans="' + k + '">' + IDS[k] + "</button>"; }).join("") + '</div><div class="sc-out" hidden></div></article>'; }).join("") + "</div></section>" : "") +
      (LY.length ? '<section class="section"><h2>The healing pathway</h2><p class="note">Truth works from the inside out and the outside in. Tap a ring.</p><div class="idl-wrap"><svg viewBox="0 0 420 420" class="idl-rings" aria-hidden="true">' + LY.map(function (l, i) { var r = 190 - i * 36; return '<g class="idl-ring" data-idly="' + i + '"><circle cx="210" cy="210" r="' + r + '"/><text x="210" y="' + (210 - r + 22) + '" text-anchor="middle">' + esc(l.layer.split(":")[0]) + "</text></g>"; }).join("") + '</svg><div id="idly-card"></div></div></section>' : "") +
      (RG.idAllQA.length ? '<section class="section"><h2>The deep questions</h2><div class="chips">' + IDG.filter(function (g) { return g[0] === "all" || A(g[0]).length; }).map(function (g) { return '<button class="chip" type="button" data-idgr="' + g[0] + '" aria-pressed="' + (idGrp === g[0]) + '">' + esc(g[1]) + "</button>"; }).join("") + '</div><div class="compass"><div class="compass-list" id="idq-list"></div><div id="idq-card"></div></div></section>' : "") +
      (WF.length ? '<section class="section"><h2>Word of Faith: what it gets right, where it goes wrong</h2>' + cmode("idwf", 0, 0, "Gets right", "Goes wrong") + '<div class="cmp-list mode-both" id="idwf">' + WF.map(function (w) { return '<article class="cmp"><div class="row" style="justify-content:space-between"><h3>' + esc(w.teaching) + "</h3>" + saveBtn("iwof", w.id) + "</div><p>" + w.claim + '</p><p class="note" style="font-size:14.5px"><strong>Where it came from:</strong> ' + w.origin + '</p><div class="cmp-pair"><div class="panel gold cmp-l"><div class="label">What it gets right</div><p>' + w.right + '</p></div><div class="panel sep cmp-r"><div class="label">Where it goes wrong</div><p>' + w.problem + '</p></div></div><div class="panel uni"><div class="label">The relational response</div><p>' + w.relational + "</p></div></article>"; }).join("") + "</div></section>" : "") +
      (AP.length ? '<section class="section"><h2>Approaches to heart healing</h2><p class="note">Described fairly, with their strengths and cautions. None replaces Jesus, love, community, or professional help where it is needed.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + AP.map(function (a, i) { return '<article class="lvpp" style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><div class="row" style="justify-content:space-between"><h3>' + esc(a.name) + "</h3>" + saveBtn("iapp", a.id) + '</div><div class="ref">' + esc(a.origin) + '</div><p style="font-size:15.5px">' + a.method + '</p><details><summary>Strengths, cautions and evidence</summary><p style="font-size:15px"><strong>Strengths:</strong> ' + a.strengths + '</p><p style="font-size:15px;color:var(--wine)"><strong>Cautions:</strong> ' + a.cautions + '</p><p class="note" style="font-size:14.5px"><strong>Research:</strong> ' + a.evidence + "</p></details></article>"; }).join("") + "</div></section>" : "") +
      (SC.length ? '<section class="section"><h2>What research says about change</h2><div class="grid">' + SC.map(function (s, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><span class="pill cultural"><i></i>Research</span><h3>' + esc(s.finding) + "</h3><p>" + s.text + '</p><p style="color:var(--dawn);font-size:15px"><strong>What it may mean:</strong> ' + s.meaning + '</p><span class="ref">' + esc(s.source) + "</span>" + (s.url ? ' <a href="' + esc(s.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</article>"; }).join("") + "</div></section>" : "") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><p class="note">If you are struggling with trauma, thoughts of self-harm, or feel unsafe, please reach out to a trusted person, a qualified professional, or your local emergency services. Seeking help is not a lack of faith.</p><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#forgive">Forgiveness & repair</a><a class="chip" href="#why">The why of design</a><a class="chip" href="#embodied">The Embodied Gospel</a><a class="chip" href="#paths">Ancient paths & encounters</a></div></section>';
  };
  function idcShow() {
    var C = A("idInChrist"); if (!$("#idc-grid")) return;
    $("#idc-grid").innerHTML = C.map(function (c, i) { var vis = idCat === "all" || c.category === idCat; return vis ? '<button type="button" class="idc' + (i === idC ? " on" : "") + '" data-idc="' + i + '" style="animation-delay:' + (i * 0.02).toFixed(2) + 's"><small>' + esc(c.ref) + "</small>" + c.phrase + "</button>" : ""; }).join("");
    var c = C[idC]; if (!c) return;
    $("#idc-card").innerHTML = '<article class="vph-card idc-card st-' + idStage + '"><div class="row" style="justify-content:space-between"><div class="label">' + esc(c.category) + " · " + esc(c.ref) + "</div>" + saveBtn("iic", c.id) + '</div><h3>“' + c.phrase + '”</h3><div class="gorig">' + esc(c.prep) + "</div><p>" + c.truth + "</p>" +
      (idStage >= 1 ? '<div class="panel sep idc-in"><div class="label">But my heart says</div><p>' + c.heart + "</p></div>" : "") +
      (idStage >= 2 ? '<div class="panel uni idc-in idc-land"><div class="label">Let it land</div><p>' + c.step + "</p></div>" : "") +
      '<div class="row">' + (idStage < 1 ? '<button class="btn ghost" type="button" data-idcs="1">My heart says…</button>' : "") + (idStage === 1 ? '<button class="btn" type="button" data-idcs="2">Let it land</button>' : "") + (idStage === 2 ? '<button class="btn ghost" type="button" data-idcn="1">Next truth →</button>' : "") + "</div></article>";
  }
  function idgShow() {
    var G = A("idGap"), g = G[idG], root = $("#idg"); if (!g || !root) return;
    var k = G.length > 1 ? idG / (G.length - 1) : 1, d = 120 * (1 - k);
    $(".idg-h", root).style.transform = "translateX(" + (120 - d) + "px)"; $(".idg-ht", root).style.transform = "translateX(" + (120 - d - 40 * k) + "px)";
    $(".idg-r", root).style.transform = "translateX(" + (-120 + d) + "px)"; $(".idg-rt", root).style.transform = "translateX(" + (-120 + d + 40 * k) + "px)";
    root.classList.toggle("whole", idG === G.length - 1); $("#idg-r").value = idG;
    $$("[data-idg]").forEach(function (x, i) { x.classList.toggle("on", i === idG); });
    $("#idg-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(g.label) + "</div><h3>" + g.title + "</h3><p>" + g.text + '</p><div class="idg-cols"><div><div class="label">Head</div><p>' + g.head + '</p></div><div><div class="label">Heart</div><p>' + g.heart + '</p></div><div><div class="label">Body</div><p>' + g.body + '</p></div></div><ul class="lvb-signs">' + (g.signs || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul></article>";
  }
  function idlShow() {
    var L = A("idLies"), l = L[idLie]; if (!l || !$("#idl-card")) return;
    $$("[data-idl]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.idl === idLie)); });
    $("#idl-card").innerHTML = '<article class="idx"><div class="idx-lie"><div class="label">The lie</div><p>“' + esc(l.lie) + '”</p><small>' + l.origin + '</small></div><div class="idx-arrow" aria-hidden="true">↓</div><div class="idx-truth"><div class="label">The truth</div><p>' + l.truth + '</p><div class="verse">' + l.scripture + '</div></div><div class="panel uni idx-pray"><div class="label">A gentle prayer</div><p>' + l.prayer + '</p></div><p class="idx-pray" style="font-size:15.5px"><strong>One step:</strong> ' + l.practice + "</p></article>";
  }
  function idsScore() { var S = A("idSorter"), n = 0, r = 0; S.forEach(function (x) { if (idAns[x.id]) { n++; if (idAns[x.id] === x.answer) r++; } }); if ($("#ids-score")) $("#ids-score").textContent = n ? r + " of " + n + " match the study" : S.length + " sentences"; }
  function idlyShow() {
    var LY = A("idLayers"), l = LY[idL]; if (!l || !$("#idly-card")) return;
    $$(".idl-ring").forEach(function (g, i) { g.classList.toggle("on", i === idL); });
    $("#idly-card").innerHTML = '<article class="vph-card"><div class="label">Layer ' + (idL + 1) + " of " + LY.length + "</div><h3>" + esc(l.layer) + '</h3><div class="verse">' + l.scripture + "</div><p>" + l.what + '</p><ol class="steps">' + (l.how || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") + '</ol><p class="note" style="font-size:14.5px"><strong>Research:</strong> ' + l.science + '</p><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-idlym="-1"' + (idL === 0 ? " disabled" : "") + '>← Outer</button><button class="btn" type="button" data-idlym="1"' + (idL === LY.length - 1 ? " disabled" : "") + ">Deeper →</button></div></article>";
  }
  function idqShow() {
    var Q = idList(); if (!Q.length || !$("#idq-list")) return;
    idQ = Math.min(idQ, Q.length - 1);
    $("#idq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-idq="' + i + '" aria-current="' + (i === idQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[idQ];
    $("#idq-card").innerHTML = '<article class="compass-card"><div class="row" style="justify-content:space-between"><div class="label">Question ' + (idQ + 1) + " of " + Q.length + "</div>" + saveBtn("iq", q.id) + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + sec.title + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? evGrid(q.evidence) : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-idqm="-1"' + (idQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-idqm="1"' + (idQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }

  /* ---------- Ancient paths & encounters ---------- */
  var paStn = 0, paTrav = 0, paRaf = 0, paWalk = null, paEnc = 0, paKind = "all", paEra = "all", paCat = "all", paG = 0, paGStep = -1, paGTimer = null, paSp = 2, paTest = {}, paQ = 0, paGrp = "all";
  var PAG = [["all", "Every question"], ["paQA1", "Paths & practice"], ["paQA2", "Encounter & discernment"]];
  var PA_D = "M24 170 C 140 30, 250 40, 330 120 S 520 215, 620 115 S 820 15, 976 70";
  function paList() { return paGrp === "all" ? RG.paAllQA || [] : A(paGrp); }
  function uniq(L, k) { var o = []; L.forEach(function (x) { if (x[k] && o.indexOf(x[k]) === -1) o.push(x[k]); }); return o; }
  V.paths = function () {
    RG.paAllQA = A("paQA1").concat(A("paQA2"));
    var S = A("paPaths"), EN = A("paEncounters"), PR = A("paPractices"), G = A("paGuided"), W = A("paWords"), SP = A("paSpectrum"), T = A("paTests"), O = A("paObjections");
    var E = A("paEvidence1").concat(A("paEvidence2"), A("paEvidence3"), A("paEvidence4"), A("paEvidence5"));
    return head("Old paths, living encounter", "Ancient paths & encounters", "“Stand in the ways and see, and ask for the old paths, where the good way is; and walk in it, and you will find rest for your souls” (Jeremiah 6:16). The practices of Israel, Jesus and the early church, the ecstatic encounters of Scripture and history, how to begin, and the honest arguments on every side.") +
      (S.length ? '<section class="section"><h2>Walk the ancient paths</h2><p class="note">Tap a station, or let the traveller walk the whole road to Jesus, “the Way”.</p><div class="pa-road" id="pa-road"><svg viewBox="0 0 1000 220" aria-hidden="true"><path id="pa-path" d="' + PA_D + '" class="pa-track"/><path d="' + PA_D + '" class="pa-done" id="pa-done"/><g id="pa-stns"></g><circle id="pa-trav" r="11" class="pa-trav"/></svg><div class="row"><button class="btn" type="button" id="pa-walk">Walk the path</button><span class="count" id="pa-cnt"></span></div><div id="pa-stn-card"></div></div></section>' : "") +
      (EN.length ? '<section class="section"><h2>Encounters through the ages</h2><p class="note">From Abraham’s deep sleep to the revivals. Filter by kind, then tap any light.</p><div class="chips">' + ["all"].concat(uniq(EN, "kind")).map(function (k) { return '<button class="chip" type="button" data-pak="' + esc(k) + '" aria-pressed="' + (paKind === k) + '">' + (k === "all" ? "Every encounter" : esc(k)) + "</button>"; }).join("") + '</div><div class="pa-tl" id="pa-tl"></div><div id="pa-enc-card"></div></section>' : "") +
      (PR.length ? '<section class="section"><h2>The practices</h2><p class="note">Where each practice comes from, and how to begin.</p><div class="chips">' + ["all"].concat(uniq(PR, "era")).map(function (k) { return '<button class="chip" type="button" data-pae="' + esc(k) + '" aria-pressed="' + (paEra === k) + '">' + (k === "all" ? "Every era" : esc(k)) + "</button>"; }).join("") + '</div><div class="chips">' + ["all"].concat(uniq(PR, "category")).map(function (k) { return '<button class="chip" type="button" data-pac="' + esc(k) + '" aria-pressed="' + (paCat === k) + '">' + (k === "all" ? "Every kind" : esc(k)) + "</button>"; }).join("") + '</div><div class="grid" id="pa-prac" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))"></div></section>' : "") +
      (G.length ? '<section class="section"><h2>Try it now</h2><p class="note">A gentle guided practice. If anything feels distressing, open your eyes, feel your feet on the floor, and stop.</p><div class="chips">' + G.map(function (g, i) { return '<button class="chip" type="button" data-pag="' + i + '" aria-pressed="' + (i === paG) + '">' + esc(g.name) + "</button>"; }).join("") + '</div><div class="pa-guide" id="pa-guide"></div></section>' : "") +
      (W.length ? '<section class="section"><h2>Words for encounter</h2><div class="grid">' + W.map(function (w, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><div class="orig">' + esc(w.word) + "</div><h3>" + esc(w.translit) + ' <span class="ref">' + esc(w.lang + " · " + w.gloss) + "</span></h3><p>" + w.meaning + '</p><div class="verse">' + w.example + "</div></article>"; }).join("") + "</div></section>" : "") +
      (SP.length ? '<section class="section"><h2>Where Christians stand on experience</h2><div class="lvp"><div class="lvp-track pa-sp"><i id="pa-sp-dot"></i></div><div class="lvp-stops">' + SP.map(function (s, i) { return '<button type="button" class="chip" data-pasp="' + i + '" aria-pressed="' + (i === paSp) + '">' + esc(s.label) + "</button>"; }).join("") + '</div><div id="pa-sp-card"></div></div></section>' : "") +
      (T.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Test the experience</h2><span class="count" id="pa-t-score"></span></div><p class="note">Think of an experience, a meeting or a teaching. Tick each test it passes. “Do not quench the Spirit… test all things, and hold firmly that which is good” (1 Thess 5:19-21).</p><div class="pa-meter"><i id="pa-meter"></i></div><div class="pa-tests">' + T.map(function (x) { return '<label class="pa-test"><input type="checkbox" data-pat="' + esc(x.id) + '"' + (paTest[x.id] ? " checked" : "") + '><span><b>' + esc(x.test) + '</b> <span class="ref">' + esc(x.ref) + '</span><small>' + x.why + "</small></span></label>"; }).join("") + '</div><div id="pa-t-out"></div></section>' : "") +
      (O.length ? '<section class="section"><h2>The arguments against, and the responses</h2><p class="note">Each objection in its own best words. Tap to see what it gets right, and the reply.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + O.map(function (o) { return '<button type="button" class="flip pa-obj" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The objection · ' + esc(strip(o.who)) + "</div><h3>" + o.objection + '</h3><span class="ref">' + esc(strip(o.scripture)) + '</span><span class="note" style="font-size:14px">Tap for the response</span></div><div class="flip-face back"><div class="label" style="color:var(--gold)">What it gets right</div><p>' + o.concede + '</p><div class="label">The relational response</div><p>' + o.response + "</p></div></div></button>"; }).join("") + "</div></section>" : "") +
      (RG.paAllQA.length ? '<section class="section"><h2>The deep questions</h2><div class="chips">' + PAG.filter(function (g) { return g[0] === "all" || A(g[0]).length; }).map(function (g) { return '<button class="chip" type="button" data-pagr="' + g[0] + '" aria-pressed="' + (paGrp === g[0]) + '">' + esc(g[1]) + "</button>"; }).join("") + '</div><div class="compass"><div class="compass-list" id="paq-list"></div><div id="paq-card"></div></div></section>' : "") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#worship">Worship in Spirit & truth</a><a class="chip" href="#embodied">The Embodied Gospel</a><a class="chip" href="#voices">Church fathers & teachers</a>' + ["mystical-union", "union-sonship", "triune-dance"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>";
  };
  function paPt(len) { var p = $("#pa-path"); return p.getPointAtLength(len); }
  function paStations() {
    var S = A("paPaths"), p = $("#pa-path"); if (!p || !S.length) return;
    var L = p.getTotalLength();
    $("#pa-stns").innerHTML = S.map(function (s, i) { var q = p.getPointAtLength(S.length > 1 ? L * i / (S.length - 1) : 0); return '<g class="pa-stn" data-pas="' + i + '" tabindex="0" role="button" aria-label="' + esc(s.ref) + '"><circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="13"/><text x="' + q.x.toFixed(1) + '" y="' + (q.y + 4).toFixed(1) + '" text-anchor="middle">' + (i + 1) + "</text></g>"; }).join("");
    $("#pa-done").style.strokeDasharray = L; paTrav = S.length > 1 ? L * paStn / (S.length - 1) : 0; paMove(paTrav, true); showStn();
  }
  function paMove(to, now) {
    var p = $("#pa-path"); if (!p) return; var L = p.getTotalLength(), from = paTrav, t0 = performance.now(), dur = now || reduced ? 0 : Math.min(1600, 300 + Math.abs(to - from) * 1.4);
    cancelAnimationFrame(paRaf);
    function step(t) { if (!$("#pa-path")) return; var k = dur ? Math.min(1, (t - t0) / dur) : 1, e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; paTrav = from + (to - from) * e; var q = paPt(paTrav); $("#pa-trav").setAttribute("cx", q.x); $("#pa-trav").setAttribute("cy", q.y); $("#pa-done").style.strokeDashoffset = L - paTrav; if (k < 1) paRaf = requestAnimationFrame(step); }
    paRaf = requestAnimationFrame(step);
  }
  function showStn() {
    var S = A("paPaths"), s = S[paStn]; if (!s || !$("#pa-stn-card")) return;
    $$(".pa-stn").forEach(function (g, i) { g.classList.toggle("on", i === paStn); g.classList.toggle("past", i < paStn); });
    $("#pa-cnt").textContent = "Station " + (paStn + 1) + " of " + S.length;
    $("#pa-stn-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(s.ref) + '</div><h3>“' + s.phrase + '”</h3><div class="gorig">' + esc(s.original) + " · " + esc(s.translit) + "</div><p>" + s.meaning + '</p><div class="panel uni"><div class="label">In Christ, the Way</div><p>' + s.relational + "</p></div></article>";
  }
  function paGoStn(i) { var S = A("paPaths"), p = $("#pa-path"); if (!p) return; paStn = Math.max(0, Math.min(S.length - 1, i)); paMove(S.length > 1 ? p.getTotalLength() * paStn / (S.length - 1) : 0); showStn(); }
  function showEnc() {
    var EN = A("paEncounters"); if (!$("#pa-tl")) return;
    $("#pa-tl").innerHTML = EN.map(function (e, i) { var vis = paKind === "all" || e.kind === paKind; return '<button type="button" class="pa-dot ' + esc(e.era) + (i === paEnc ? " on" : "") + (vis ? "" : " dim") + '" data-paen="' + i + '"' + (vis ? "" : ' tabindex="-1"') + '><i></i><b>' + esc(e.who) + "</b><small>" + esc(e.when) + "</small></button>"; }).join("");
    var e = EN[paEnc]; if (!e) return;
    $("#pa-enc-card").innerHTML = '<article class="vph-card pa-enc ' + esc(e.era) + '"><div class="row" style="justify-content:space-between"><div class="label">' + esc(e.when) + " · " + esc(e.kind) + " · " + esc(e.ref) + "</div>" + saveBtn("penc", e.id) + "</div><h3>" + esc(e.who) + "</h3><p>" + e.what + "</p>" + (e.word ? '<div class="gorig">' + esc(e.word) + "</div>" : "") + '<div class="panel gold"><div class="label">What it meant then</div><p>' + e.meaning + '</p></div><div class="panel uni"><div class="label">Through the relational lens</div><p>' + e.relational + '</p></div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-paem="-1"' + (paEnc === 0 ? " disabled" : "") + '>← Earlier</button><button class="btn" type="button" data-paem="1"' + (paEnc === EN.length - 1 ? " disabled" : "") + ">Later →</button></div></article>";
    var on = $("#pa-tl .pa-dot.on"); if (on) { var tl = $("#pa-tl"); tl.scrollTo({ left: on.offsetLeft - tl.clientWidth / 2 + on.clientWidth / 2, behavior: reduced ? "auto" : "smooth" }); }
  }
  function showPrac() {
    if (!$("#pa-prac")) return;
    $("#pa-prac").innerHTML = A("paPractices").filter(function (x) { return (paEra === "all" || x.era === paEra) && (paCat === "all" || x.category === paCat); }).map(function (x, i) { return '<article class="lvpp" style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><div class="row" style="justify-content:space-between"><span class="pill principle"><i></i>' + esc(x.era) + " · " + esc(x.category) + "</span>" + saveBtn("pprac", x.id) + "</div><h3>" + esc(x.name) + '</h3><p style="font-size:15.5px">' + x.origin + '</p><div class="verse">' + x.scripture + '</div><details><summary>How to begin</summary><ol class="steps">' + (x.how || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") + '</ol></details><p style="font-size:15px"><strong>What it forms:</strong> ' + x.fruit + '</p><p class="note" style="font-size:14.5px"><strong>Watch for:</strong> ' + x.caution + "</p></article>"; }).join("") || '<p class="note">No practice matches both filters.</p>';
  }
  function showGuide() {
    var G = A("paGuided"), g = G[paG], box = $("#pa-guide"); if (!g || !box) { clearTimeout(paGTimer); return; }
    var st = g.steps[paGStep], running = paGStep >= 0 && paGStep < g.steps.length;
    $$("[data-pag]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.pag === paG)); });
    box.innerHTML = '<div class="pa-breath' + (running && !reduced ? " go" : "") + '"><span></span></div><div class="pa-gtext"><div class="label">' + (running ? "Step " + (paGStep + 1) + " of " + g.steps.length : paGStep >= g.steps.length ? "Rest here" : esc(g.name)) + "</div><p>" + (running ? st.text : paGStep >= g.steps.length ? "Stay as long as you like. You are held in the love of the Father, the Son and the Spirit." : g.intro) + '</p><div class="pa-prog"><i style="width:' + (Math.max(0, Math.min(g.steps.length, paGStep + (running ? 0 : 0))) / g.steps.length * 100).toFixed(0) + '%"></i></div><div class="row">' + (running ? '<button class="btn ghost" type="button" id="pa-gstop">Stop</button><button class="btn" type="button" id="pa-gnext">Next step →</button>' : '<button class="btn" type="button" id="pa-gstart">' + (paGStep >= g.steps.length ? "Begin again" : "Begin") + "</button>") + "</div></div>";
    clearTimeout(paGTimer);
    if (running) { var bar = $(".pa-prog i", box); requestAnimationFrame(function () { if (bar) { bar.style.transition = "width " + st.secs + "s linear"; bar.style.width = ((paGStep + 1) / g.steps.length * 100).toFixed(0) + "%"; } }); paGTimer = setTimeout(function () { paGStep++; showGuide(); }, (reduced ? Math.min(st.secs, 20) : st.secs) * 1000); }
  }
  function showSp() {
    var SP = A("paSpectrum"), s = SP[paSp]; if (!s || !$("#pa-sp-card")) return;
    $$("[data-pasp]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.pasp === paSp)); });
    $("#pa-sp-dot").style.left = (SP.length > 1 ? paSp / (SP.length - 1) * 100 : 50) + "%";
    $("#pa-sp-card").innerHTML = '<article class="vph-card"><div class="label">' + s.who + "</div><h3>" + esc(s.label) + "</h3><p>" + s.view + '</p><div class="cmp-pair"><div class="panel uni"><div class="label">Strength</div><p>' + s.strength + '</p></div><div class="panel sep"><div class="label">Weakness</div><p>' + s.weakness + "</p></div></div></article>";
  }
  function showTests() {
    var T = A("paTests"); if (!$("#pa-meter")) return;
    var n = T.filter(function (x) { return paTest[x.id]; }).length, pct = T.length ? n / T.length : 0;
    $("#pa-meter").style.width = (pct * 100).toFixed(0) + "%"; $("#pa-meter").className = pct === 1 ? "full" : pct >= 0.7 ? "good" : "";
    $("#pa-t-score").textContent = n + " of " + T.length;
    $("#pa-t-out").innerHTML = n === 0 ? "" : '<div class="panel ' + (pct === 1 ? "uni" : pct >= 0.7 ? "gold" : "sep") + '"><p>' + (pct === 1 ? "This bears the marks of the Spirit of Jesus: Christ honoured, love and fruit growing, others built up, freedom and peace. Hold on to what is good (1 Thess 5:21), and keep walking it out with others." : pct >= 0.7 ? "Much here looks healthy. Look gently at the tests it does not yet pass, and talk it over with mature, safe people before building anything on it." : "Go slowly. An experience that does not exalt Christ, grow love, build others up or leave you free and at peace is not something to build your life on. Nothing is lost by waiting, testing, and asking others you trust.") + "</p></div>";
  }
  function paqShow() {
    var Q = paList(); if (!Q.length || !$("#paq-list")) return;
    paQ = Math.min(paQ, Q.length - 1);
    $("#paq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-paq="' + i + '" aria-current="' + (i === paQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[paQ];
    $("#paq-card").innerHTML = '<article class="compass-card"><div class="row" style="justify-content:space-between"><div class="label">Question ' + (paQ + 1) + " of " + Q.length + "</div>" + saveBtn("pq", q.id) + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? evGrid(q.evidence) : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-paqm="-1"' + (paQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-paqm="1"' + (paQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }

  /* ---------- Living it out ---------- */
  var lvBal = 2, lvR = 0, lvRAns = {}, lvPr = 1, lvQ = 0, lvGrp = "all";
  var LVG = [["all", "Every question"], ["lvQA1", "Work, money & simplicity"], ["lvQA2", "Respect, love & protection"], ["lvQA3", "Values, rules & equality"], ["lvQA4", "God, sin, prayer & faith"]];
  var LVK = { silent: "Stay silent", accept: "Just accept it", fight: "Fight back", christ: "Christ's way" };
  function lvList() { return lvGrp === "all" ? RG.lvAllQA || [] : A(lvGrp); }
  function evGrid(E) { return '<div class="evidence">' + E.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + e.source + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div>"; }
  function cmode(id, a, b, la, lb) { return '<div class="su-toggle" role="group" aria-label="Choose a view"><button type="button" class="s" data-cmode="' + id + '" data-m="legal" aria-pressed="false">' + la + '</button><button type="button" data-cmode="' + id + '" data-m="both" aria-pressed="true">Both</button><button type="button" class="u" data-cmode="' + id + '" data-m="relational" aria-pressed="false">' + lb + "</button></div>"; }
  V.living = function () {
    RG.lvAllQA = A("lvQA1").concat(A("lvQA2"), A("lvQA3"), A("lvQA4"));
    var B = A("lvBalance"), R = A("lvRespond"), P = A("lvPrayer"), PP = A("lvPrayerPairs"), VA = A("lvValues"), WR = A("lvWorthRole"), F = A("lvFaith"), M = A("lvManners"), L = A("lvLend");
    var E = A("lvEvidence1").concat(A("lvEvidence2"), A("lvEvidence3"), A("lvEvidence4"), A("lvEvidence5"));
    return head("Love in everyday life", "Living it out", "Service and profit, sacrifice and comfort, respect and exploitation, rules and hierarchy, prayer and action, fear and faith. How self-giving Triune love actually lives on a Monday, with Scripture, history and honest answers.") +
      (B.length ? '<section class="section"><h2>The love balance</h2><p class="note">Drag the slider. Jesus said to love your neighbour <em>as yourself</em> (Mark 12:31): not instead of yourself, and not only yourself.</p><div class="lvb" id="lvb"><svg viewBox="0 0 640 250" aria-hidden="true">' +
        '<path d="M320 96 L290 200 L350 200 Z" class="lvb-post"/><circle class="lvb-heart" cx="320" cy="92" r="9"/>' +
        '<g class="lvb-beam"><rect x="96" y="88" width="448" height="8" rx="4"/></g>' +
        '<g class="lvb-pan lvb-l"><line x1="0" y1="0" x2="-30" y2="56"/><line x1="0" y1="0" x2="30" y2="56"/><path d="M-46 56 Q0 92 46 56 Z"/><text y="112" text-anchor="middle" class="tl">OTHERS</text></g>' +
        '<g class="lvb-pan lvb-r"><line x1="0" y1="0" x2="-30" y2="56"/><line x1="0" y1="0" x2="30" y2="56"/><path d="M-46 56 Q0 92 46 56 Z"/><text y="112" text-anchor="middle" class="tl">YOURSELF</text></g>' +
        '</svg><input type="range" id="lvb-r" min="0" max="' + (B.length - 1) + '" step="1" value="' + lvBal + '" aria-label="Move along the love balance"><div class="lvb-ticks">' + B.map(function (b, i) { return '<button type="button" data-lvb="' + i + '">' + esc(b.label) + "</button>"; }).join("") + '</div><div id="lvb-card"></div></div></section>' : "") +
      (R.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>What would love do?</h2><span class="count" id="lvr-score"></span></div><p class="note">Real situations. Choose a response, then see why.</p><div class="chips" id="lvr-tabs"></div><div id="lvr-card"></div></section>' : "") +
      (RG.lvAllQA.length ? '<section class="section"><h2>The questions</h2><div class="chips">' + LVG.filter(function (g) { return g[0] === "all" || A(g[0]).length; }).map(function (g) { return '<button class="chip" type="button" data-lvg="' + g[0] + '" aria-pressed="' + (lvGrp === g[0]) + '">' + esc(g[1]) + "</button>"; }).join("") + '</div><div class="compass"><div class="compass-list" id="lvq-list"></div><div id="lvq-card"></div></div></section>' : "") +
      (P.length ? '<section class="section"><h2>Prayer and action</h2><p class="note">Where do you live? Tap a position.</p><div class="lvp"><div class="lvp-track"><i id="lvp-dot"></i></div><div class="lvp-stops">' + P.map(function (p, i) { return '<button type="button" class="chip" data-lvp="' + i + '" aria-pressed="' + (i === lvPr) + '">' + esc(p.label) + "</button>"; }).join("") + '</div><div id="lvp-card"></div></div>' +
        (PP.length ? '<h3 style="margin-top:8px">They prayed, then they moved</h3><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + PP.map(function (x, i) { return '<article class="lvpp" style="animation-delay:' + (i * 0.05).toFixed(2) + 's"><div class="label">' + esc(x.who) + ' · <span class="ref">' + esc(x.ref) + '</span></div><div class="lvpp-row"><span class="pill principle"><i></i>Prayed</span><p>' + x.prayed + '</p></div><div class="lvpp-row"><span class="pill"><i></i>Then did</span><p>' + x.did + "</p></div></article>"; }).join("") + "</div>" : "") + "</section>" : "") +
      (VA.length ? '<section class="section"><h2>Moral values, and why God designed them</h2><p class="note">Tap a card to see how each value serves love, how it gets twisted, and how Jesus lived it.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + VA.map(function (v) { return '<button type="button" class="flip lvv" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front cf-front"><div class="label">A value of love</div><h3>' + esc(v.value) + '</h3><p style="font-size:15.5px">' + v.design + '</p><span class="note" style="font-size:14px">Tap to see it twisted, and lived</span></div><div class="flip-face back"><div class="label" style="color:var(--wine)">When it gets twisted</div><p>' + v.twisted + '</p><div class="label">How Jesus lived it</div><p>' + v.jesus + '</p><div class="ref">' + esc((v.refs || []).join(" · ")) + "</div></div></div></button>"; }).join("") + "</div></section>" : "") +
      (WR.length ? '<section class="section"><h2>Equal worth, different roles</h2><p class="note">Every person has the same worth. Roles differ for the sake of serving. Toggle to see each layer.</p>' + cmode("lvw", 0, 0, "Equal worth", "Different roles") + '<div class="cmp-list mode-both" id="lvw">' + WR.map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="cmp-pair"><div class="panel uni cmp-l"><div class="label">Equal worth</div><p>' + r.worth + '</p></div><div class="panel gold cmp-r"><div class="label">Different role</div><p>' + r.role + '</p></div></div><div class="panel sep"><div class="label">When it becomes domination</div><p>' + r.abuse + '</p></div><div class="ref">' + esc((r.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (F.length ? '<section class="section"><h2>Does God wait for us to perform?</h2><p class="note">Faith, fear, asking, testing: two ways to hear the same sermon.</p>' + cmode("lvf", 0, 0, "Vending machine", "Father") + '<div class="cmp-list mode-both" id="lvf">' + F.map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">The vending-machine God</div><p>' + r.transaction + '</p></div><div class="panel uni cmp-r"><div class="label">The Father Jesus shows</div><p>' + r.relational + '</p></div></div><div class="ref">' + esc((r.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" : "") +
      (M.length ? '<section class="section"><h2>Manners: love with good habits</h2><div class="grid">' + M.map(function (m, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><h3>' + esc(m.manner) + "</h3><p>" + m.meaning + '</p><div class="verse">' + m.scripture + '</div><p class="note" style="font-size:14.5px"><strong>Cultural or universal?</strong> ' + m.culture + "</p></article>"; }).join("") + "</div></section>" : "") +
      (L.length ? '<section class="section"><h2>Lending, giving and asking back</h2><div class="qa">' + L.map(function (l, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(l.case) + '</summary><div class="ans"><p style="color:var(--ink)">' + l.guidance + '</p><div class="ref">' + esc((l.refs || []).join(" · ")) + "</div></div></details>"; }).join("") + "</div></section>" : "") +
      (E.length ? '<section class="section"><h2>Evidence and sources</h2>' + evGrid(E) + "</section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#forgive">Forgiveness & repair</a><a class="chip" href="#why">The why of design</a><a class="chip" href="#big">Big questions</a><a class="chip" href="#compare">Legal vs relational</a></div></section>';
  };
  function showBal() {
    var B = A("lvBalance"), b = B[lvBal], root = $("#lvb"); if (!b || !root) return;
    var th = (lvBal - (B.length - 1) / 2) * 5, rad = th * Math.PI / 180;
    $(".lvb-beam", root).style.transform = "rotate(" + th + "deg)";
    $(".lvb-l", root).style.transform = "translate(" + (320 - 210 * Math.cos(rad)) + "px," + (92 - 210 * Math.sin(rad)) + "px)";
    $(".lvb-r", root).style.transform = "translate(" + (320 + 210 * Math.cos(rad)) + "px," + (92 + 210 * Math.sin(rad)) + "px)";
    root.classList.toggle("centred", lvBal === (B.length - 1) / 2);
    $("#lvb-r").value = lvBal;
    $$("[data-lvb]").forEach(function (x, i) { x.classList.toggle("on", i === lvBal); });
    $("#lvb-card").innerHTML = '<article class="vph-card"><div class="label">' + esc(b.label) + "</div><h3>" + b.title + "</h3><p>" + b.text + '</p><ul class="lvb-signs">' + (b.signs || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + '</ul><div class="ref">' + esc((b.refs || []).join(" · ")) + "</div></article>";
  }
  function showResp() {
    var R = A("lvRespond"), r = R[lvR]; if (!r || !$("#lvr-card")) return;
    var n = 0, ok = 0; R.forEach(function (x) { if (lvRAns[x.id] != null) { n++; if (x.options[lvRAns[x.id]].verdict === "right") ok++; } });
    $("#lvr-score").textContent = n ? ok + " of " + n + " Christlike" : R.length + " situations";
    $("#lvr-tabs").innerHTML = R.map(function (x, i) { return '<button class="chip" type="button" data-lvr="' + i + '" aria-pressed="' + (i === lvR) + '">' + (lvRAns[x.id] != null ? "✓ " : "") + (i + 1) + "</button>"; }).join("");
    var a = lvRAns[r.id], done = a != null;
    $("#lvr-card").innerHTML = '<article class="sc lvr' + (done ? " answered" : "") + '"><div class="label">Situation ' + (lvR + 1) + " of " + R.length + '</div><h3 style="font-size:21px">' + r.scenario + '</h3><div class="lvr-opts">' + r.options.map(function (o, j) { return '<button type="button" class="chip' + (o.verdict === "right" ? " right" : "") + '" data-lvo="' + j + '" aria-pressed="' + (a === j) + '">' + (done ? '<small class="lvr-k k-' + o.kind + '">' + esc(LVK[o.kind] || o.kind) + "</small>" : "") + esc(o.label) + "</button>"; }).join("") + "</div>" +
      (done ? '<div class="sc-out"><div class="label">' + (r.options[a].verdict === "right" ? "That is the way of Christ" : r.options[a].verdict === "partial" ? "Part of the way there" : "Love would choose differently") + "</div><p>" + r.options[a].why + "</p>" + r.options.filter(function (o, j) { return j !== a; }).map(function (o) { return '<p style="font-size:14.5px;color:var(--muted)"><strong>' + esc(o.label) + ":</strong> " + o.why + "</p>"; }).join("") + '</div><div class="panel uni"><div class="label">How Jesus handled it</div><p>' + r.jesus + "</p></div>" : "") +
      '<div class="ref">' + esc((r.refs || []).join(" · ")) + '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-lvrm="-1"' + (lvR === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-lvrm="1"' + (lvR === R.length - 1 ? " disabled" : "") + ">Next situation →</button></div></article>";
  }
  function showPr() {
    var P = A("lvPrayer"), p = P[lvPr]; if (!p || !$("#lvp-card")) return;
    $$("[data-lvp]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.lvp === lvPr)); });
    var dot = $("#lvp-dot"); dot.style.left = (P.length > 1 ? lvPr / (P.length - 1) * 100 : 50) + "%"; dot.className = lvPr === Math.floor(P.length / 2) ? "mid" : "";
    $("#lvp-card").innerHTML = '<article class="vph-card"><h3>' + esc(p.title) + "</h3><p>" + p.text + '</p><div class="panel ' + (lvPr === Math.floor(P.length / 2) ? "uni" : "sep") + '"><div class="label">' + (lvPr === Math.floor(P.length / 2) ? "Why it works" : "The risk") + "</div><p>" + p.risk + '</p></div><div class="ref">' + esc((p.refs || []).join(" · ")) + "</div></article>";
  }
  function lvqShow() {
    var Q = lvList(); if (!Q.length || !$("#lvq-list")) return;
    lvQ = Math.min(lvQ, Q.length - 1);
    $("#lvq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-lvq="' + i + '" aria-current="' + (i === lvQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[lvQ];
    $("#lvq-card").innerHTML = '<article class="compass-card"><div class="row" style="justify-content:space-between"><div class="label">Question ' + (lvQ + 1) + " of " + Q.length + "</div>" + saveBtn("lq", q.id) + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? evGrid(q.evidence) : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-lvqm="-1"' + (lvQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-lvqm="1"' + (lvQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }

  /* ---------- Forgiveness & repair ---------- */
  var fPath = "victim", fStep = 0, fTimer = null, fNode = null, fTrail = [], fQ = 0, fAns = {}, fApo = 0;
  var WHO = { me: "You", them: "Them", both: "Both", community: "Community", God: "God" };
  V.forgive = function () {
    RG.fgAllQA = A("fgQA1").concat(A("fgQA2"));
    var S = RG.fgStairs || {}, T = RG.fgTree, Ab = RG.fgAbuse || {};
    return head("Release, repair, rebuild", "Forgiveness & repair", "Forgiving people, repairing harm, keeping boundaries, and how both the hurt and the one who did harm can live afterwards. Walk the two paths, use the decision guide, and work through every hard question.") +
      '<div class="prose">' + A("fgIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<div class="panel gold"><div class="label">Safety first</div><p>Forgiveness never requires you to stay in danger, keep quiet, or trust someone again. Forgiving does not cancel reporting, legal accountability or consequences. If you are at risk, contact local emergency services or a domestic-abuse helpline.</p></div>' +
      ((S.victim || []).length ? '<section class="section"><h2>Two paths</h2><div class="row" style="justify-content:space-between"><div class="su-toggle" role="group" aria-label="Choose a path"><button type="button" class="u" data-fp="victim" aria-pressed="true">If you were hurt</button><button type="button" class="s" data-fp="offender" aria-pressed="false">If you did harm</button></div><button class="btn" type="button" id="fp-play">Walk the path</button></div><div class="stairs" id="stairs"></div><div id="stair-card"></div></section>' : "") +
      (T && T.nodes ? '<section class="section"><h2>What should I do?</h2><p class="note">A guide, not a verdict. Answer honestly; you can go back at any time.</p><div class="tree" id="tree"></div></section>' : "") +
      (RG.fgAllQA.length ? '<section class="section"><h2>The questions</h2><div class="compass"><div class="compass-list" id="fq-list"></div><div id="fq-card"></div></div></section>' : "") +
      (A("fgEgo").length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Ego or self-respect?</h2><span class="count" id="fe-score"></span></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + A("fgEgo").map(function (x) { return '<article class="sc" id="fe-' + x.id + '"><p>' + x.behaviour + '</p><div class="chips">' + [["self-respect", "Self-respect"], ["ego", "Ego"], ["depends", "It depends"]].map(function (o) { return '<button class="chip" type="button" data-fe="' + x.id + '" data-ans="' + o[0] + '">' + o[1] + "</button>"; }).join("") + '</div><div class="sc-out" hidden></div></article>'; }).join("") + "</div></section>" : "") +
      (A("fgHonor").length ? '<section class="section"><h2>What looks like honour, and what it really is</h2><p class="note">Tap a card.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + A("fgHonor").map(function (h) { return '<button type="button" class="flip" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front cf-front"><div class="label">Looks like honour</div><h3>' + esc(strip(h.looksLike)) + '</h3><span class="note" style="font-size:14px">Tap to see what it really is</span></div><div class="flip-face back"><div class="label" style="color:var(--wine)">Really</div><p>' + h.actually + '</p><div class="label">True honour</div><p>' + h.true + '</p><span class="ref">' + esc((h.refs || []).join(" · ")) + "</span></div></div></button>"; }).join("") + "</div></section>" : "") +
      ((Ab.types || []).length ? '<section class="section"><h2>Recognising abuse</h2><div class="su-toggle" role="group" aria-label="Choose a direction"><button type="button" data-ab="all" aria-pressed="true">All</button><button type="button" data-ab="self" aria-pressed="false">To yourself</button><button type="button" data-ab="others" aria-pressed="false">To others</button><button type="button" data-ab="fromOthers" aria-pressed="false">From others</button></div><div class="tri-wrap"><table class="abm ab-all" id="abm"><thead><tr><th>Type</th><th class="c-self">To yourself</th><th class="c-others">To others</th><th class="c-fromOthers">From others: signs</th></tr></thead><tbody>' + Ab.types.map(function (t) { return "<tr><th>" + esc(t.type) + '</th><td class="c-self">' + t.self + '</td><td class="c-others">' + t.others + '</td><td class="c-fromOthers">' + t.fromOthers + "</td></tr>"; }).join("") + '</tbody></table></div>' + (Ab.note ? '<div class="panel gold"><div class="label">If this is happening</div><p>' + Ab.note + "</p>" + (Ab.url ? '<a class="ref" href="' + esc(Ab.url) + '" target="_blank" rel="noopener">' + esc(Ab.source || "Source") + " ↗</a>" : "") + "</div>" : "") + "</section>" : "") +
      (A("fgDavid").length ? '<section class="section"><h2>David: forgiven, yet the story unfolds</h2><div class="legend label"><span><i style="background:var(--wine)"></i>Sin</span><span><i style="background:var(--dawn)"></i>Forgiveness</span><span><i style="background:#d9822b"></i>Consequence</span><span><i style="background:var(--gold)"></i>Mercy</span></div><div class="river-wrap"><div class="dv" id="dv">' + A("fgDavid").map(function (d, i) { return '<button type="button" class="dv-e k-' + d.kind + '" data-dv="' + i + '" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"><span class="dv-dot"></span><span class="ref">' + esc(d.ref) + "</span><b>" + esc(d.event) + "</b></button>"; }).join("") + '</div></div><div id="dv-note"></div></section>' : "") +
      (A("fgApology").length ? '<section class="section"><h2>Anatomy of a real apology</h2><div class="apo"><div class="apo-stack" id="apo-stack"></div><div class="apo-side"><div id="apo-text"></div><div class="row"><button class="btn ghost" type="button" data-apo="-1">← Remove</button><button class="btn" type="button" data-apo="1">Add the next part →</button></div></div></div></section>' : "") +
      (A("fgModels").length ? '<section class="section"><h2>Models from research and practice</h2><div class="grid">' + A("fgModels").map(function (m) { return '<article class="scale"><div class="label">' + esc(m.source) + "</div><h3>" + esc(m.name) + '</h3><ol class="steps">' + (m.steps || []).map(function (s2) { return "<li>" + s2 + "</li>"; }).join("") + "</ol>" + (m.note ? '<p class="note">' + m.note + "</p>" : "") + (m.url ? '<a class="ref" href="' + esc(m.url) + '" target="_blank" rel="noopener">Source ↗</a>' : "") + "</article>"; }).join("") + "</div></section>" : "") +
      (A("fgEvidence1").concat(A("fgEvidence2"), A("fgEvidence3")).length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("fgEvidence1").concat(A("fgEvidence2"), A("fgEvidence3")).map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#why">The why of design</a><a class="chip" href="#love">God is love</a><a class="chip" href="#big">Big questions</a></div></section>';
  };
  function showStairs() {
    var S = (RG.fgStairs || {})[fPath] || []; if (!$("#stairs")) return;
    $$("[data-fp]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.fp === fPath)); });
    $("#stairs").className = "stairs p-" + fPath;
    $("#stairs").innerHTML = S.map(function (st, i) { return '<button type="button" class="stair' + (i <= fStep ? " lit" : "") + (i === fStep ? " cur" : "") + '" data-st="' + i + '" style="--i:' + i + '"><span class="who w-' + st.who + '">' + (WHO[st.who] || st.who) + "</span><b>" + esc(st.step) + "</b></button>"; }).join("");
    var st = S[fStep]; if (!st) return;
    $("#stair-card").innerHTML = '<div class="panel ' + (fPath === "victim" ? "uni" : "sep") + '" style="animation:rise .35s both"><div class="label">Step ' + (fStep + 1) + " of " + S.length + " · in " + (WHO[st.who] || st.who).toLowerCase() + "'s hands</div><h3>" + esc(st.step) + "</h3><p>" + st.text + "</p>" + (st.oneSided ? '<p class="note"><strong>One-sided:</strong> this step does not depend on the other person.</p>' : "") + (st.note ? "<p>" + st.note + "</p>" : "") + (st.pitfall ? '<p class="note"><strong>Watch out:</strong> ' + st.pitfall + "</p>" : "") + '<div class="ref">' + esc((st.refs || []).join(" · ")) + "</div></div>";
  }
  function showTree() {
    var T = RG.fgTree; if (!T || !$("#tree")) return;
    if (!fNode) fNode = T.start;
    var n = T.nodes[fNode]; if (!n) return;
    var crumbs = fTrail.map(function (c) { return '<span class="crumb">' + esc(c.q) + " → <b>" + esc(c.a) + "</b></span>"; }).join("");
    $("#tree").innerHTML = (crumbs ? '<div class="crumbs">' + crumbs + "</div>" : "") + (n.result ? '<article class="tree-card res-' + (n.tone || "hope") + '"><div class="label">Guidance</div><h3>' + esc(n.result) + "</h3><p>" + n.text + "</p>" + ((n.steps || []).length ? '<ol class="steps">' + n.steps.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>" : "") + '<div class="ref">' + esc((n.refs || []).join(" · ")) + "</div></article>" : '<article class="tree-card"><div class="label">Question ' + (fTrail.length + 1) + "</div><h3>" + esc(n.q) + '</h3><div class="row">' + (n.options || []).map(function (o, i) { return '<button class="btn ghost" type="button" data-tn="' + i + '">' + esc(o.label) + "</button>"; }).join("") + "</div></article>") +
      '<div class="row">' + (fTrail.length ? '<button class="chip" type="button" id="tree-back">← Back</button><button class="chip" type="button" id="tree-restart">Start again</button>' : "") + "</div>";
  }
  function fqShow() {
    var Q = RG.fgAllQA || []; if (!Q.length || !$("#fq-list")) return;
    $("#fq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-fq="' + i + '" aria-current="' + (i === fQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[fQ];
    $("#fq-card").innerHTML = '<article class="compass-card"><div class="label">Question ' + (fQ + 1) + " of " + Q.length + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? '<div class="evidence">' + q.evidence.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-fqm="-1"' + (fQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-fqm="1"' + (fQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }
  function feScore() { var C = A("fgEgo"), n = 0, r = 0; C.forEach(function (x) { if (fAns[x.id]) { n++; if (fAns[x.id] === x.answer) r++; } }); if ($("#fe-score")) $("#fe-score").textContent = n ? r + " of " + n + " match the study" : C.length + " behaviours"; }
  function showApo() {
    var P = A("fgApology"); if (!P.length || !$("#apo-stack")) return;
    fApo = Math.max(0, Math.min(P.length, fApo));
    $("#apo-stack").innerHTML = P.map(function (p, i) { return '<div class="apo-b' + (i < fApo ? " in" : "") + '" style="--i:' + i + '"><span>' + (i + 1) + "</span>" + esc(p.part) + "</div>"; }).join("");
    var p = P[Math.max(0, fApo - 1)];
    $("#apo-text").innerHTML = fApo === 0 ? '<p class="note">Build an apology one part at a time.</p>' : '<div class="label">Part ' + fApo + " of " + P.length + '</div><h3 style="font-size:24px">' + esc(p.part) + "</h3><p>" + p.text + '</p><div class="verse"><span class="ref">For example</span>' + p.example + '</div><div class="ref">' + esc((p.refs || []).join(" · ")) + "</div>" + (fApo === P.length ? '<div class="panel uni"><p>That is a complete apology. It names the harm, owns it, and offers repair without demanding forgiveness.</p></div>' : "");
  }

  /* ---------- Big questions ---------- */
  var bQ = 0, bFlow = -1, bFlowTimer = null, bLane = "both", bGlossGroup = "all", bGlossView = "both", bAccTab = {};
  V.big = function () {
    RG.bigAllQA = A("bigQA").concat(A("bigQA2"));
    var F = RG.bigFlow || { legal: [], relational: [] }, G = A("bigGlossary"), groups = [];
    G.forEach(function (g) { if (groups.indexOf(g.group) === -1) groups.push(g.group); });
    return head("Foundations", "Big questions", "Why does a decent person need God? Where does the devil come from and where does he end? What is finished? Should we accept everyone? Was Adam complete? Two gospels, traced step by step, and every key word defined both ways.") +
      ((F.legal || []).length ? '<section class="section"><h2>From the Fall to the end: two stories</h2><div class="row" style="justify-content:space-between"><div class="su-toggle" role="group" aria-label="Choose a story"><button type="button" class="s" data-lane="legal" aria-pressed="false">Legal gospel</button><button type="button" data-lane="both" aria-pressed="true">Side by side</button><button type="button" class="u" data-lane="relational" aria-pressed="false">Relational gospel</button></div><button class="btn" type="button" id="flow-play">Play the story</button></div><div class="flow lane-both" id="flow"></div><div id="flow-detail"></div></section>' : "") +
      (RG.bigAllQA.length ? '<section class="section"><h2>The questions</h2><div class="compass"><div class="compass-list" id="bq-list"></div><div id="bq-card"></div></div></section>' : "") +
      (A("bigAccept").length ? '<section class="section"><h2>Accept the person, not every action</h2><p class="note">Twelve real situations. Switch between accepting the person, declining the action, and how to handle it.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + A("bigAccept").map(function (a) { return '<article class="acc" id="acc-' + a.id + '"><h3>' + esc(a.situation) + '</h3><div class="tabs">' + [["accept", "Accept them"], ["reject", "Decline the action"], ["handle", "How to handle"]].map(function (t, i) { return '<button class="chip" type="button" data-acc="' + a.id + '" data-at="' + t[0] + '" aria-pressed="' + (i === 0) + '">' + t[1] + "</button>"; }).join("") + '</div><div class="acc-body">' + accBody(a, "accept") + "</div></article>"; }).join("") + "</div></section>" : "") +
      (G.length ? '<section class="section"><h2>Every word, defined both ways</h2><div class="toolbar">' + field("gl-q", "Find a term, e.g. sin, hell, baptism, righteousness") + '<div class="su-toggle" role="group" aria-label="Choose definitions"><button type="button" class="s" data-glv="legal" aria-pressed="false">Legal</button><button type="button" data-glv="both" aria-pressed="true">Both</button><button type="button" class="u" data-glv="relational" aria-pressed="false">Relational</button></div></div><div class="chips">' + ["all"].concat(groups).map(function (g) { return '<button class="chip" type="button" data-glg="' + esc(g) + '" aria-pressed="' + (bGlossGroup === g) + '">' + (g === "all" ? "All " + G.length + " terms" : esc(g)) + "</button>"; }).join("") + '<span class="count" id="gl-count"></span></div><div class="gloss" id="gloss"></div></section>' : "") +
      (A("bigEvidence1").concat(A("bigEvidence2"), A("bigGlossEvidence")).length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("bigEvidence1").concat(A("bigEvidence2"), A("bigGlossEvidence")).map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#compare">Legal vs relational gospel</a><a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#love">God is love</a><a class="chip" href="#debate">Debates & strawmen</a><a class="chip" href="#life">Love with a spine</a></div></section>';
  };
  function accBody(a, t) {
    if (t === "handle") return "<ol class=\"steps\">" + (a.handle || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") + '</ol><div class="ref">' + esc((a.refs || []).join(" · ")) + "</div>";
    return '<div class="panel ' + (t === "accept" ? "uni" : "sep") + '"><p>' + a[t] + "</p></div>";
  }
  function showFlow() {
    var F = RG.bigFlow; if (!F || !$("#flow")) return;
    function lane(key, title, cls) { return '<div class="flow-lane ' + key + '"><div class="label">' + title + '</div>' + (F[key] || []).map(function (st, i) { return '<button type="button" class="fnode ' + cls + (i <= bFlow ? " lit" : "") + (i === bFlow ? " cur" : "") + '" data-fn="' + key + ":" + i + '"><span class="fn-n">' + (i + 1) + "</span><b>" + esc(st.step) + "</b></button>" + (i < F[key].length - 1 ? '<i class="farrow' + (i < bFlow ? " lit" : "") + '" aria-hidden="true">↓</i>' : ""); }).join("") + "</div>"; }
    $("#flow").className = "flow lane-" + bLane;
    $("#flow").innerHTML = lane("legal", "Legal gospel", "sep") + lane("relational", "Relational gospel", "uni");
  }
  function flowDetail(key, i) {
    var st = (RG.bigFlow[key] || [])[i]; if (!st) return;
    $("#flow-detail").innerHTML = '<div class="panel ' + (key === "legal" ? "sep" : "uni") + '" style="animation:rise .35s both"><div class="label">' + (key === "legal" ? "Legal gospel" : "Relational gospel") + " · step " + (i + 1) + "</div><h3>" + esc(st.step) + "</h3><p>" + st.detail + '</p><div class="ref">' + esc((st.refs || []).join(" · ")) + "</div></div>";
  }
  function playFlow() {
    clearInterval(bFlowTimer); var F = RG.bigFlow, max = Math.max((F.legal || []).length, (F.relational || []).length); bFlow = -1;
    bFlowTimer = setInterval(function () { bFlow++; showFlow(); var k = bLane === "legal" ? "legal" : "relational"; flowDetail(k, Math.min(bFlow, (F[k] || []).length - 1)); if (bFlow >= max - 1) clearInterval(bFlowTimer); }, reduced ? 60 : 1400);
  }
  function bqShow() {
    var Q = RG.bigAllQA || []; if (!Q.length || !$("#bq-list")) return;
    $("#bq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-bq="' + i + '" aria-current="' + (i === bQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[bQ];
    $("#bq-card").innerHTML = '<article class="compass-card"><div class="label">Question ' + (bQ + 1) + " of " + Q.length + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? '<div class="evidence">' + q.evidence.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-bqm="-1"' + (bQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-bqm="1"' + (bQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }
  function glossShow() {
    if (!$("#gloss")) return;
    var q = (($("#gl-q") || {}).value || "").toLowerCase().trim();
    var G = A("bigGlossary").filter(function (g) { return (bGlossGroup === "all" || g.group === bGlossGroup) && (!q || [g.term, g.legal, g.relational, g.original].join(" ").toLowerCase().indexOf(q) > -1); });
    $("#gloss").className = "gloss view-" + bGlossView;
    $("#gloss").innerHTML = G.map(function (g, i) { return '<article class="gterm" style="animation-delay:' + (i * 0.02).toFixed(2) + 's"><div class="row" style="justify-content:space-between"><div><div class="label">' + esc(g.group) + "</div><h3>" + esc(g.term) + "</h3></div>" + saveBtn("bterm", g.id) + "</div>" + (g.original ? '<div class="gorig">' + g.original + "</div>" : "") + '<div class="gpair"><div class="panel sep g-l"><div class="label">Legal</div><p>' + g.legal + '</p></div><div class="panel uni g-r"><div class="label">Relational</div><p>' + g.relational + "</p></div></div>" + (g.note ? '<p class="note">' + g.note + "</p>" : "") + '<div class="ref">' + esc((g.refs || []).join(" · ")) + "</div></article>"; }).join("") || '<p class="count">No term matches.</p>';
    $("#gl-count").textContent = G.length + " shown";
  }

  /* ---------- The why of design ---------- */
  var wGroup = "all", wSel = null, wTab = "why", wQ = 0, wAns = {};
  var W_TABS = [["why", "Why"], ["mechanism", "How it works"], ["reflects", "Reflects God"], ["counterfeit", "Counterfeit"], ["toxic", "Toxic vs healthy"], ["science", "Science"]];
  V.why = function () {
    var D = A("whyDesign"), groups = [], T = RG.whyToxic || {};
    D.forEach(function (d) { if (groups.indexOf(d.group) === -1) groups.push(d.group); });
    if (!wSel && D.length) wSel = D[0].id;
    return '<a class="bl-banner" href="#blood"><b>New: The life is in the blood</b><span>The design of blood in the body, its meaning in the Old Testament, and how Christ’s blood cleanses and heals →</span></a>' + head("Reason and mechanism", "The why of design", "Why did God make bodies, nerves, needs, families, money, work, rest and play? How does each one work, what does it show about him, what have we built to replace it, and how does it turn toxic? Explore every design, then the hard questions.") +
      '<div class="prose">' + A("whyIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      (D.length ? '<section class="section"><h2>Design explorer</h2><div class="chips">' + ["all"].concat(groups).map(function (g) { return '<button class="chip" type="button" data-wg="' + esc(g) + '" aria-pressed="' + (wGroup === g) + '">' + (g === "all" ? "Everything (" + D.length + ")" : esc(g)) + "</button>"; }).join("") +
        '</div><div class="wx"><div class="wx-tiles" id="wx-tiles"></div><div class="wx-panel" id="wx-panel"></div></div></section>' : "") +
      (A("whyCounterfeits").length ? '<section class="section"><h2>God\'s design and our counterfeits</h2><p class="note">Each card shows the original. Tap to see what we built instead, and the way back.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + A("whyCounterfeits").map(function (c) {
        return '<button type="button" class="flip" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front cf-front"><div class="label">The design</div><h3>' + esc(c.design) + '</h3><span class="note" style="font-size:14px">Tap to see the counterfeit</span></div><div class="flip-face back"><div class="label" style="color:var(--wine)">Counterfeit · ' + esc(c.counterfeit) + "</div><p>" + c.why + "</p><p><strong>Cost:</strong> " + c.cost + '</p><p style="color:var(--dawn)"><strong>The way back:</strong> ' + c.return + "</p></div></div></button>"; }).join("") + "</div></section>" : "") +
      (A("whyQuestions").length ? '<section class="section"><h2>Hard questions</h2><div class="compass"><div class="compass-list" id="wq-list"></div><div id="wq-card"></div></div></section>' : "") +
      (T.definition ? '<section class="section"><h2>What does "toxic" mean?</h2><div class="prose">' + T.definition.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div><div class="label">Signs to recognise</div><div class="grid">' + (T.signs || []).map(function (x) { return '<article class="scale"><h3>' + esc(x.sign) + '</h3><p><strong>Looks like:</strong> ' + x.looks + '</p><p class="note"><strong>Driven by:</strong> ' + x.why + '</p><div class="ref">' + esc((x.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div>" +
        '<div class="split"><div class="panel uni"><div class="label">How not to be toxic</div><ol class="steps">' + (T.notMe || []).map(function (x) { return "<li><strong>" + esc(x.step) + ".</strong> " + x.how + ' <span class="ref">' + esc((x.refs || []).join(" · ")) + "</span></li>"; }).join("") + '</ol></div><div class="panel gold"><div class="label">How to handle toxic people</div><ol class="steps">' + (T.handle || []).map(function (x) { return "<li><strong>" + esc(x.step) + ".</strong> " + x.how + ' <span class="ref">' + esc((x.refs || []).join(" · ")) + "</span></li>"; }).join("") + "</ol></div></div>" +
        '<div class="panel sep"><div class="label">A caution</div>' + (T.caution || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div></section>" : "") +
      (A("whyCheck").length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Toxic or healthy?</h2><span class="count" id="wc-score"></span></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' + A("whyCheck").map(function (x) { return '<article class="sc" id="wc-' + x.id + '"><p>' + x.behaviour + '</p><div class="chips">' + [["healthy", "Healthy"], ["toxic", "Toxic"], ["depends", "It depends"]].map(function (o) { return '<button class="chip" type="button" data-wc="' + x.id + '" data-ans="' + o[0] + '">' + o[1] + "</button>"; }).join("") + '</div><div class="sc-out" hidden></div></article>'; }).join("") + "</div></section>" : "") +
      (A("whyEvidence").length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("whyEvidence").map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips"><a class="chip" href="#life">Love with a spine</a><a class="chip" href="#embodied">The Embodied Gospel</a>' + ["designed-for-connection", "sacred-biology", "sacred-secular", "triune-dance"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>";
  };
  function wxTiles() {
    if (!$("#wx-tiles")) return;
    var D = A("whyDesign").filter(function (d) { return wGroup === "all" || d.group === wGroup; });
    if (D.length && !D.some(function (d) { return d.id === wSel; })) wSel = D[0].id;
    $("#wx-tiles").innerHTML = D.map(function (d, i) { return '<button type="button" class="wx-tile' + (d.id === wSel ? " on" : "") + '" data-wsel="' + d.id + '" style="animation-delay:' + (i * 0.025).toFixed(3) + 's"><span class="label">' + esc(d.group) + "</span><b>" + esc(d.area) + "</b></button>"; }).join("");
    wxPanel();
  }
  function wxPanel() {
    var d = A("whyDesign").filter(function (x) { return x.id === wSel; })[0]; if (!d || !$("#wx-panel")) return;
    var body = wTab === "toxic" ? '<div class="split"><div class="panel sep"><div class="label">When it turns toxic</div><p>' + d.toxic + '</p></div><div class="panel uni"><div class="label">Living it well</div><p>' + d.healthy + "</p></div></div>"
      : wTab === "science" ? (d.science ? "<p>" + d.science + "</p>" + (d.scienceUrl ? '<a href="' + esc(d.scienceUrl) + '" target="_blank" rel="noopener" class="ref">Open source ↗</a>' : "") : '<p class="note">This design is described from Scripture and the tradition rather than from a specific scientific finding.</p>')
      : "<p>" + (d[wTab] || "") + "</p>";
    $("#wx-panel").innerHTML = '<div class="label">' + esc(d.group) + '</div><h3 style="font-size:28px">' + esc(d.area) + '</h3><div class="tabs">' + W_TABS.map(function (t) { return '<button class="chip" type="button" data-wtab="' + t[0] + '" aria-pressed="' + (wTab === t[0]) + '">' + t[1] + "</button>"; }).join("") + '</div><div class="wx-body" key="' + wTab + '">' + body + '</div><div class="ref">' + esc((d.refs || []).join(" · ")) + "</div>";
    $$("#wx-tiles .wx-tile").forEach(function (b) { b.classList.toggle("on", b.dataset.wsel === wSel); });
  }
  function wqShow() {
    var Q = A("whyQuestions"); if (!Q.length || !$("#wq-list")) return;
    $("#wq-list").innerHTML = Q.map(function (q, i) { return '<button type="button" data-wq="' + i + '" aria-current="' + (i === wQ) + '"><b>' + String(i + 1).padStart(2, "0") + "</b>" + esc(q.q) + "</button>"; }).join("");
    var q = Q[wQ];
    $("#wq-card").innerHTML = '<article class="compass-card"><div class="label">Question ' + (wQ + 1) + " of " + Q.length + "</div><h2>" + esc(q.q) + '</h2><div class="panel gold"><div class="label">In short</div><p>' + q.short + '</p></div><div class="qa">' + (q.sections || []).map(function (sec, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.title) + '</summary><div class="ans">' + sec.body.map(function (p) { return '<p style="color:var(--ink)">' + p + "</p>"; }).join("") + "</div></details>"; }).join("") + '</div><div class="ref">' + esc((q.refs || []).join(" · ")) + "</div>" +
      ((q.evidence || []).length ? '<div class="evidence">' + q.evidence.map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-wqm="-1"' + (wQ === 0 ? " disabled" : "") + '>← Previous</button><button class="btn" type="button" data-wqm="1"' + (wQ === Q.length - 1 ? " disabled" : "") + ">Next question →</button></div></article>";
  }
  function wcScore() { var C = A("whyCheck"), n = 0, r = 0; C.forEach(function (x) { if (wAns[x.id]) { n++; if (wAns[x.id] === x.answer) r++; } }); if ($("#wc-score")) $("#wc-score").textContent = n ? r + " of " + n + " match the study" : C.length + " behaviours"; }

  /* ---------- Sharing the good news ---------- */
  var SH_THEMES = [["resurrection", "Resurrection"], ["lordship", "Jesus is Lord"], ["crossDeath", "His death"], ["forgiveness", "Forgiveness"], ["repentance", "Turn / repent"], ["spirit", "The Spirit"], ["scripture", "Scripture fulfilled"], ["restoration", "Restoration"], ["kingdom", "Kingdom"], ["creator", "God the Creator"], ["faith", "Faith"], ["sin", "Sin named"], ["judgment", "Judgment"], ["hell", "Hell"]];
  var shDialog = 0, shCol = "all", shTag = "all", shPri = 0, shTimer = null;
  var SH_TAGS = ["Kingdom", "Resurrection", "Cross", "Sin & guilt", "Hell & judgment", "Love of God", "Union & theosis", "Holiness", "Justice & the poor", "Healing & power", "Community", "Decision", "Culture & language"];
  V.share = function () {
    var SS = A("shareSermons"), C = A("shareCase"), D = A("shareDialogues"), H = A("shareHistory"), P = A("sharePriorities");
    return head("Announcing good news", "Sharing the good news", "How did Jesus and the apostles share the gospel, and how is that different from the methods many of us learned? Explore the sermons in Acts, two ways of having the same conversation, two thousand years of gospel preaching, and the questions evangelicals ask.") +
      '<div class="prose">' + A("shareIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      (SS.length ? '<section class="section"><h2>What the apostles actually preached</h2><p class="note">Every speech in Acts, mapped against the themes it contains. Read across a row for one sermon, or down a column for one theme. Tap a sermon for details.</p><div class="hm-wrap"><table class="hm"><thead><tr><th></th>' + SH_THEMES.map(function (t) { return '<th><span>' + t[1] + "</span></th>"; }).join("") + "</tr></thead><tbody>" +
        SS.map(function (r, i) { return '<tr><th><button type="button" data-open="ssermon.' + r.id + '"><b>' + esc(r.ref) + "</b><span>" + esc(r.speaker) + "</span></button></th>" + SH_THEMES.map(function (t, j) { var on = r.themes && r.themes[t[0]]; return '<td><i class="' + (on ? "on" : "") + (t[0] === "hell" || t[0] === "judgment" ? " warm" : "") + '" style="animation-delay:' + ((i * 40 + j * 25) / 1000).toFixed(2) + 's" title="' + esc(t[1]) + (on ? ": yes" : ": no") + '"></i></td>'; }).join("") + "</tr>"; }).join("") +
        '</tbody><tfoot><tr><th>How many sermons</th>' + SH_THEMES.map(function (t) { var n = SS.filter(function (r) { return r.themes && r.themes[t[0]]; }).length; return '<td><b>' + n + '</b><div class="hm-bar"><span style="height:' + Math.round(n / SS.length * 100) + '%"></span></div></td>'; }).join("") + "</tr></tfoot></table></div></section>" : "") +
      (D.length ? '<section class="section"><h2>Two ways to have the same conversation</h2><div class="chips">' + D.map(function (d, i) { return '<button class="chip" type="button" data-dlg="' + i + '" aria-pressed="' + (i === shDialog) + '">' + esc(d.person) + "</button>"; }).join("") + '</div><div class="dlg" id="dlg"></div></section>' : "") +
      (A("shareCompare").length ? '<section class="section"><h2>Three approaches compared</h2><div class="su-toggle" role="group" aria-label="Highlight a column"><button type="button" data-shc="all" aria-pressed="true">All three</button><button type="button" class="s" data-shc="evangelical" aria-pressed="false">Popular evangelical</button><button type="button" data-shc="apostolic" aria-pressed="false">Jesus & the apostles</button><button type="button" class="u" data-shc="relational" aria-pressed="false">Relational</button></div><div class="tri-wrap"><div class="tri" id="tri"><div class="tri-h"></div><div class="tri-h c-evangelical">Popular evangelical</div><div class="tri-h c-apostolic">Jesus & the apostles</div><div class="tri-h c-relational">Relational gospel</div>' +
        A("shareCompare").map(function (r) { return '<div class="tri-a">' + esc(r.aspect) + '</div><div class="c-evangelical">' + r.evangelical + '</div><div class="c-apostolic">' + r.apostolic + '</div><div class="c-relational">' + r.relational + "</div>"; }).join("") + "</div></div></section>" : "") +
      (H.length ? '<section class="section"><h2>Two thousand years of telling the story</h2><p class="note">Each group in church history, coloured by what it emphasised. Filter by an emphasis, then tap a group.</p><div class="chips">' + ["all"].concat(SH_TAGS).map(function (t) { return '<button class="chip" type="button" data-shtag="' + esc(t) + '" aria-pressed="' + (shTag === t) + '">' + (t === "all" ? "Every emphasis" : esc(t)) + "</button>"; }).join("") + '</div><div class="river-wrap"><div class="river" id="river"></div></div><div id="emph"></div></section>' : "") +
      '<section class="section"><h2>How Jesus shared good news</h2><div class="grid">' + A("shareJesus").map(function (j) { return card("sjesus", j, { top: '<div class="label">First move</div><p style="margin-top:-4px">' + esc(strip(j.firstMove)) + "</p>", text: "<strong>Lesson:</strong> " + clip(j.lesson, 110) }); }).join("") + "</div></section>" +
      (C.length ? '<section class="section"><h2>The study, step by step</h2><div class="chips">' + C.map(function (c, i) { return '<button class="chip" type="button" data-case="' + c.id + '">' + (i + 1) + ". " + esc(c.title) + "</button>"; }).join("") + '</div><div class="case">' +
        C.map(function (c, i) { return '<article class="case-step" id="case-' + c.id + '"><div class="case-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</div><div class="case-body"><div class="label">' + esc(c.kicker) + "</div><h3>" + esc(c.title) + '</h3><div class="prose">' + c.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div><div class="ref">' + esc((c.refs || []).join(" · ")) + "</div></div></article>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><h2>The evangelical method: the good, the harm, the mistakes</h2><div class="gbm">' + [["shareGood", "uni", "The good it produced"], ["shareBad", "sep", "The harm it caused"], ["shareMistakes", "gold", "Mistakes to learn from"]].map(function (g) { return '<div class="panel ' + g[1] + '"><div class="row" style="justify-content:space-between"><div class="label">' + g[2] + '</div><b class="gbm-n">' + A(g[0]).length + "</b></div>" + A(g[0]).map(function (x) { return "<details><summary>" + esc(x.title) + "</summary><p>" + x.text + "</p></details>"; }).join("") + "</div>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>"You don\'t preach the gospel": the accusations answered</h2><p class="note">Tap a card to see why evangelicals focus on it, and the answer.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + A("shareAccusations").map(function (a) {
        return '<button type="button" class="flip" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The accusation</div><h3>' + esc(a.accusation) + '</h3><span class="note" style="font-size:14px"><strong>Why they stress it:</strong> ' + clip(a.why, 150) + '</span></div><div class="flip-face back"><div class="label">The answer</div><p>' + clip(a.answer, 330) + '</p><span class="chip" data-open="saccuse.' + a.id + '" role="link">Read in full</span></div></div></button>'; }).join("") + "</div></section>" +
      (P.length ? '<section class="section"><h2>Our priorities</h2><div class="wheel"><div class="wheel-fig" id="wheel"></div><div class="wheel-text" id="wheel-text"></div></div></section>' : "") +
      (A("shareEvidence").concat(A("shareEvidence2")).length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("shareEvidence").concat(A("shareEvidence2")).map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips">' + ["undiluted-gospel", "inclusion", "church-now", "apokatastasis"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + '<a class="chip" href="#kingdom">Ekklesia & the Kingdom</a><a class="chip" href="#compare">Legal vs relational</a><a class="chip" href="#love">God is love</a></div></section>';
  };
  function showDialog(play) {
    var d = A("shareDialogues")[shDialog]; if (!d || !$("#dlg")) return;
    clearInterval(shTimer);
    $$("[data-dlg]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.dlg === shDialog)); });
    function col(cls, title, lines) { return '<div class="dlg-col ' + cls + '"><div class="label">' + title + '</div><div class="dlg-lines">' + lines.map(function (l, i) { return '<div class="bub ' + (l.who === "you" ? "me" : "them") + '" data-i="' + i + '"' + (play ? " hidden" : "") + "><span>" + (l.who === "you" ? "You" : "Them") + "</span>" + l.text + "</div>"; }).join("") + "</div></div>"; }
    $("#dlg").innerHTML = '<p class="note"><strong>' + esc(d.person) + ".</strong> " + d.situation + '</p><div class="row"><button class="btn" type="button" id="dlg-play">Play both conversations</button></div><div class="dlg-cols">' + col("sep", "A scripted approach", d.evangelical) + col("uni", "The way of Jesus", d.christway) + '</div><div class="panel gold"><div class="label">What the contrast teaches</div><p>' + d.note + "</p></div>";
    if (play) {
      var step = 0, max = Math.max(d.evangelical.length, d.christway.length);
      shTimer = setInterval(function () {
        $$('#dlg .bub[data-i="' + step + '"]').forEach(function (b) { b.hidden = false; });
        step++; if (step >= max) clearInterval(shTimer);
      }, reduced ? 50 : 1100);
    }
  }
  function showRiver() {
    var H = A("shareHistory"); if (!$("#river")) return;
    $("#river").innerHTML = H.map(function (h, i) {
      var match = shTag === "all" || (h.emphasis || []).indexOf(shTag) > -1;
      return '<button type="button" class="rv' + (match ? "" : " dim") + '" data-open="shist.' + h.id + '" style="animation-delay:' + (i * 0.04).toFixed(2) + 's"><span class="rv-y">' + esc(h.years) + '</span><b>' + esc(h.group) + '</b><span class="rv-tags">' + (h.emphasis || []).map(function (t) { return '<i class="tg t' + (SH_TAGS.indexOf(t) + 1) + (shTag === t ? " hl" : "") + '">' + esc(t) + "</i>"; }).join("") + "</span></button>";
    }).join("");
    var eras = []; H.forEach(function (h) { if (eras.indexOf(h.era) === -1) eras.push(h.era); });
    var pick = ["Love of God", "Kingdom", "Sin & guilt", "Hell & judgment", "Decision", "Justice & the poor"];
    var max = 1; var rows = eras.map(function (e) { var hs = H.filter(function (h) { return h.era === e; }); var c = pick.map(function (t) { return hs.filter(function (h) { return (h.emphasis || []).indexOf(t) > -1; }).length; }); max = Math.max.apply(null, [max].concat(c)); return { e: e, c: c }; });
    $("#emph").innerHTML = '<div class="label" style="margin:16px 0 8px">How often six emphases appear, era by era</div><div class="emph"><div class="emph-legend">' + pick.map(function (t) { return '<span><i class="tg t' + (SH_TAGS.indexOf(t) + 1) + '"></i>' + esc(t) + "</span>"; }).join("") + "</div>" +
      rows.map(function (r) { return '<div class="emph-row"><span>' + esc(r.e) + '</span><div class="emph-bars">' + r.c.map(function (n, k) { return '<i class="tg t' + (SH_TAGS.indexOf(pick[k]) + 1) + '" style="height:' + Math.max(4, n / max * 56) + 'px" title="' + esc(pick[k]) + ": " + n + '"></i>'; }).join("") + "</div></div>"; }).join("") + "</div>";
  }
  function showWheel() {
    var P = A("sharePriorities"); if (!P.length || !$("#wheel")) return;
    var n = P.length, R = 140, r0 = 56, cx = 160, cy = 160, out = "";
    P.forEach(function (p, i) {
      var a0 = (i / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
      function pt(rr, a) { return (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1); }
      var d = "M" + pt(r0, a0) + " L" + pt(R, a0) + " A" + R + " " + R + " 0 0 1 " + pt(R, a1) + " L" + pt(r0, a1) + " A" + r0 + " " + r0 + " 0 0 0 " + pt(r0, a0) + "Z";
      var am = (a0 + a1) / 2;
      out += '<g class="wseg' + (i === shPri ? " on" : "") + '" data-pri="' + i + '" style="cursor:pointer"><path d="' + d + '"/><text x="' + (cx + (r0 + R) / 2 * Math.cos(am)).toFixed(1) + '" y="' + (cy + (r0 + R) / 2 * Math.sin(am) + 4).toFixed(1) + '" text-anchor="middle">' + (i + 1) + "</text></g>";
    });
    $("#wheel").innerHTML = '<svg viewBox="0 0 320 320" role="img" aria-label="Priorities wheel">' + out + '<circle cx="160" cy="160" r="50" fill="var(--gold)"/><text x="160" y="157" text-anchor="middle" class="wc">Jesus</text><text x="160" y="173" text-anchor="middle" class="wc2">at the centre</text></svg>';
    var p = P[shPri];
    $("#wheel-text").innerHTML = '<div class="label">Priority ' + (shPri + 1) + " of " + n + '</div><h3 style="font-size:26px">' + esc(p.title) + "</h3><p>" + p.text + '</p><div class="ref">' + esc((p.refs || []).join(" · ")) + '</div><div class="chips">' + P.map(function (q, i) { return '<button class="chip" type="button" data-pri="' + i + '" aria-pressed="' + (i === shPri) + '">' + (i + 1) + ". " + esc(q.title) + "</button>"; }).join("") + "</div>";
  }

  /* ---------- Designed to live: love with a spine ---------- */
  var spine = 1, lifeAns = {};
  var SPINE = [
    { name: "Passive", tone: "sep", line: "Love without a spine", text: "Says yes to everything, cannot confront, absorbs mistreatment, hides needs and calls it humility. It looks gentle but it feeds resentment, enables harm and leaves the other person unchanged. This is not the love of 1 Corinthians 13, which \"does not rejoice in unrighteousness, but rejoices with the truth\".", refs: "1 Cor 13:6 · Prov 25:26 · Gal 1:10" },
    { name: "Christlike", tone: "uni", line: "Love with a spine", text: "Open-hearted and kind, but self-possessed. Speaks the truth in love, says no without guilt, rests, confronts what harms, protects the vulnerable, forgives freely yet trusts wisely, and lays down life as a free gift, not under compulsion. This is how Jesus lived.", refs: "Eph 4:15 · Matt 10:16 · John 10:18 · Mark 1:35-38 · John 2:24-25" },
    { name: "Aggressive", tone: "sep", line: "A spine without love", text: "Defends itself by attacking, controls others, punishes and keeps score. It protects the self but wounds others and the relationship. Jesus rebuked this too when the disciples wanted fire from heaven.", refs: "Luke 9:54-55 · Jas 1:20 · Rom 12:17-21" }
  ];
  V.life = function () {
    var C = A("lifeCase"), S = A("lifeScenarios");
    return head("Love with a spine", "Designed to live", "Were you taught that saying no, confronting or protecting yourself is unloving? This study looks at why, what the heart of God is really like, how God designed humans to live, and how Jesus handled people and pressure.") +
      '<div class="prose">' + A("lifeIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<div class="panel gold"><div class="label">If you are in danger</div><p>Your safety comes first. Forgiveness never requires you to stay in harm or trust an unsafe person. If you are at risk, contact local emergency services or a domestic-abuse helpline, and tell someone you trust.</p></div>' +
      '<section class="spine" id="spine"><div class="label">Where does love sit?</div><input type="range" id="spine-r" min="0" max="2" step="1" value="' + spine + '" aria-label="Move between passive, Christlike and aggressive"><div class="spine-scale"><span>Passive</span><span>Christlike</span><span>Aggressive</span></div><div id="spine-card"></div></section>' +
      (C.length ? '<section class="section"><h2>The case, step by step</h2><div class="chips">' + C.map(function (c, i) { return '<button class="chip" type="button" data-case="' + c.id + '">' + (i + 1) + ". " + esc(c.title) + "</button>"; }).join("") + '</div><div class="case">' +
        C.map(function (c, i) { return '<article class="case-step" id="case-' + c.id + '"><div class="case-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</div><div class="case-body"><div class="label">' + esc(c.kicker) + "</div><h3>" + esc(c.title) + '</h3><div class="prose">' + c.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div><div class="ref">' + esc((c.refs || []).join(" · ")) + "</div></div></article>"; }).join("") + "</div></section>" : "") +
      (S.length ? '<section class="section"><div class="row" style="justify-content:space-between"><h2>Is this love?</h2><span class="count" id="life-score"></span></div><p class="note">Read each situation and choose. Then see the reasoning.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))">' +
        S.map(function (x) { return '<article class="sc" id="sc-' + x.id + '"><p>' + x.scenario + '</p><div class="chips">' + [["loving", "Loving"], ["unloving", "Not loving"], ["depends", "It depends"]].map(function (o) { return '<button class="chip" type="button" data-sc="' + x.id + '" data-ans="' + o[0] + '">' + o[1] + "</button>"; }).join("") + '</div><div class="sc-out" hidden></div></article>'; }).join("") + "</div></section>" : "") +
      '<section class="section"><h2>Myths we were taught</h2><p class="note">Tap a card to see the truth.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">' + A("lifeMyths").map(function (m) {
        return '<button type="button" class="flip" data-flip aria-label="Flip card"><div class="flip-inner"><div class="flip-face front"><div class="label">The myth</div><h3>' + esc(m.myth) + '</h3><span class="note" style="font-size:14px">' + clip(m.origin, 150) + '</span></div><div class="flip-face back"><div class="label">The truth</div><p>' + m.truth + '</p><span class="ref">' + esc((m.refs || []).join(" · ")) + "</span></div></div></button>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Is it selfish? Ten distinctions</h2><div class="grid">' + A("lifeSelfish").map(function (d) { return '<article class="scale"><h3>' + esc(d.term) + '</h3><div class="panel uni"><div class="label">It is</div><p>' + d.is + '</p></div><div class="panel sep"><div class="label">It is not</div><p>' + d.isnot + '</p></div><div class="ref">' + esc((d.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>When you are exploited or mistreated</h2><div class="timeline">' + A("lifeSteps").map(function (x, i) { return '<article class="t-item"><div class="label">Step ' + (i + 1) + "</div><h3>" + esc(x.step) + "</h3><p>" + x.how + '</p><div class="ref">' + esc((x.refs || []).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>How God designed us, and why</h2><div class="grid">' + A("lifeDesign").map(function (d) { return card("ldesign", d, { text: clip(d.why, 130) }); }).join("") + "</div></section>" +
      '<section class="section"><h2>The traits of Jesus</h2><div class="grid">' + A("lifeTraits").map(function (d) { return card("ltrait", d, { text: clip(d.desc, 130) }); }).join("") + "</div></section>" +
      '<section class="section"><h2>How Jesus handled it</h2><div class="qa">' + A("lifeSituations").map(function (x) { return "<details><summary>" + esc(x.situation) + '</summary><div class="ans"><p style="color:var(--ink)">' + x.did + '</p><div class="panel gold"><div class="label">The principle</div><p>' + x.principle + '</p></div><p><strong>Today:</strong> ' + x.today + '</p><div class="ref">' + esc((x.refs || []).join(" · ")) + "</div></div></details>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Hard questions</h2><div class="qa">' + A("lifeQA").map(function (q) { return "<details><summary>" + esc(strip(q.q)) + '</summary><div class="ans"><p>' + q.a + "</p></div></details>"; }).join("") + "</div></section>" +
      (A("lifeEvidence").concat(A("lifeEvidence2")).length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("lifeEvidence").concat(A("lifeEvidence2")).map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips">' + ["designed-for-connection", "union-sonship", "nature-of-god", "sacred-biology", "church-now"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + '<a class="chip" href="#sayings">The words of Jesus</a><a class="chip" href="#love">God is love</a></div></section>';
  };
  function showSpine() {
    if (!$("#spine")) return; var x = SPINE[spine];
    $("#spine-card").innerHTML = '<div class="panel ' + x.tone + '"><div class="label">' + x.name + " · " + x.line + "</div><p>" + x.text + '</p><div class="ref">' + x.refs + "</div></div>";
    $("#spine").dataset.pos = String(spine);
  }
  function lifeScore() {
    var S = A("lifeScenarios"), n = 0, right = 0;
    S.forEach(function (x) { if (lifeAns[x.id]) { n++; if (lifeAns[x.id] === x.answer) right++; } });
    if ($("#life-score")) $("#life-score").textContent = n ? right + " of " + n + " match the study" : S.length + " situations";
  }

  /* ---------- Ekklesia & the Kingdom ---------- */
  var kStep = 0, kGroup = "all";
  V.kingdom = function () {
    var C = A("kingCase"), E = A("kingEnemies"), groups = [];
    A("kingConcepts").forEach(function (c) { if (groups.indexOf(c.group) === -1) groups.push(c.group); });
    return head("Seated, sent and reigning", "Ekklesia & the Kingdom", "Christ is seated at the Father's right hand \"until his enemies are made a footstool for his feet\". His ekklesia is the body through which the Head acts. Here is what the church is, how the kingdom works now, how its enemies are subdued, and what we are meant to do.") +
      '<div class="prose">' + A("kingIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      (E.length ? '<section class="foot" id="foot"><div class="row" style="justify-content:space-between"><div><div class="label">Psalm 110:1 · Hebrews 10:12-13 · 1 Corinthians 15:25-26</div><h2 style="font-size:26px;margin-top:4px">Until his enemies are his footstool</h2></div><div class="row"><button class="btn ghost" type="button" data-kmove="-1">← Back</button><button class="btn" type="button" data-kmove="1" id="k-next">Subdue the next enemy</button></div></div>' +
        '<div class="foot-grid"><div class="foot-throne"><div class="foot-crown" aria-hidden="true">♔</div><b>Christ, seated</b><span>"Sit at my right hand until I make your enemies your footstool."</span><div class="foot-stool" id="k-stool"><div class="label">Under his feet</div><div id="k-under"></div></div></div>' +
        '<div class="foot-body"><div class="label">His body, the ekklesia</div><div id="k-card" class="dawn-card"></div></div>' +
        '<div class="foot-field"><div class="label">Still resisting</div><div id="k-left"></div></div></div><div class="foot-end" id="k-end" hidden><b>"Then the end comes… that God may be all in all."</b><span class="ref">1 Cor 15:24-28 · Acts 3:21 · Rev 21:3-5</span></div></section>' : "") +
      (C.length ? '<section class="section"><h2>The case, step by step</h2><div class="chips">' + C.map(function (c, i) { return '<button class="chip" type="button" data-case="' + c.id + '">' + (i + 1) + ". " + esc(c.title) + "</button>"; }).join("") + '</div><div class="case">' +
        C.map(function (c, i) { return '<article class="case-step" id="case-' + c.id + '"><div class="case-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</div><div class="case-body"><div class="label">' + esc(c.kicker) + "</div><h3>" + esc(c.title) + '</h3><div class="prose">' + c.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div><div class="ref">' + esc((c.refs || []).join(" · ")) + "</div></div></article>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><h2>What we are meant to do</h2><div class="grid">' + A("kingPractice").map(function (k) { return card("kpractice", k, { text: clip(k.how, 140) }); }).join("") + "</div></section>" +
      '<section class="section"><h2>Key concepts</h2><div class="chips">' + ["all"].concat(groups).map(function (g) { return '<button class="chip" type="button" data-kg="' + esc(g) + '" aria-pressed="' + (kGroup === g) + '">' + (g === "all" ? "Every concept" : esc(g)) + "</button>"; }).join("") + '</div><div class="grid" id="kgrid"></div></section>' +
      '<section class="section"><h2>How Christians read the "until" texts</h2><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">' + A("kingViews").map(function (v) { return '<article class="scale"><div class="row" style="justify-content:space-between"><h3>' + esc(v.name) + '</h3><button class="chip" type="button" data-open="kview.' + v.id + '">Details</button></div><p>' + v.summary + '</p><p class="note"><strong>Reads the texts:</strong> ' + clip(v.reads, 220) + "</p></article>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Hard questions</h2><div class="qa">' + A("kingQA").map(function (q) { return "<details><summary>" + esc(strip(q.q)) + '</summary><div class="ans"><p>' + q.a + "</p></div></details>"; }).join("") + "</div></section>" +
      (A("kingEvidence").length ? '<section class="section"><h2>Evidence and sources</h2><div class="evidence">' + A("kingEvidence").map(function (e) { return '<div class="ev"><p>' + e.text + '</p><span class="ref">' + esc(e.source) + "</span>" + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Open source ↗</a>' : "") + "</div>"; }).join("") + "</div></section>" : "") +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips">' + ["church-now", "manifest-sons", "apokatastasis", "life-immortality", "union-sonship", "across-all-worlds"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + '<a class="chip" href="#embodied">The Embodied Gospel</a><a class="chip" href="#models">End-times frameworks</a></div></section>';
  };
  function showK() {
    var E = A("kingEnemies"); if (!E.length || !$("#foot")) return;
    kStep = Math.max(0, Math.min(E.length, kStep));
    $("#k-under").innerHTML = E.slice(0, kStep).map(function (e) { return '<span class="k-chip under">' + esc(e.enemy) + "</span>"; }).join("") || '<span class="note">Nothing yet. Step through the enemies.</span>';
    $("#k-left").innerHTML = E.slice(kStep).map(function (e, i) { return '<span class="k-chip' + (i === 0 ? " next" : "") + '">' + esc(e.enemy) + "</span>"; }).join("") || '<span class="note">No enemy remains.</span>';
    var cur = E[Math.min(kStep, E.length - 1)], done = kStep >= E.length, shown = done ? E[E.length - 1] : E[kStep];
    $("#k-card").innerHTML = '<div class="label">' + (done ? "The last enemy" : "Enemy " + (kStep + 1) + " of " + E.length) + '</div><h3 style="font-size:24px">' + esc(shown.enemy) + "</h3><p>" + shown.how + '</p><div class="ref">' + esc((shown.refs || []).join(" · ")) + "</div>";
    $("#k-end").hidden = !done; $("#k-next").textContent = done ? "Start again" : "Subdue the next enemy";
    $("#foot").classList.toggle("done", done);
  }
  function kGrid() { if (!$("#kgrid")) return; $("#kgrid").innerHTML = A("kingConcepts").filter(function (c) { return kGroup === "all" || c.group === kGroup; }).map(function (c) { return card("kconcept", c, { top: '<div class="label">' + esc(c.group) + "</div>", text: c.simple }); }).join(""); }

  /* ---------- The Embodied Gospel ---------- */
  var mOrder = "adam", mGroup = "all";
  V.embodied = function () {
    var groups = [];
    A("embConcepts").forEach(function (c) { if (groups.indexOf(c.group) === -1) groups.push(c.group); });
    var Z = RG.embAssess || { strengths: [], questions: [] };
    return head("Spirit, soul, body and new creation", "The Embodied Gospel", "God's plan was never to rescue souls out of bodies, but to fill human bodies with his own life. This study works through being and identity, the body, regeneration, the blood, immortality and the kingdom now, with diagrams, simple explanations and the scriptures behind each claim.") +
      '<div class="prose">' + A("embIntro").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<section class="section"><h2>Diagram: two orders of being</h2><div class="mo" id="mo"><div class="row" style="justify-content:space-between"><div class="label">Who governs whom?</div><div class="su-toggle" role="group" aria-label="Choose an order"><button type="button" class="s" data-mo="adam" aria-pressed="true">Adamic order</button><button type="button" class="u" data-mo="divine" aria-pressed="false">Divine order</button></div></div>' +
      '<div class="mo-stack" id="mo-stack">' + [["spirit", "Spirit", "Union with God; Christ in you"], ["soul", "Soul", "Mind, will, emotions"], ["body", "Body", "A perceiver, not a decider"], ["creation", "Creation", "Waits for the sons of God"]].map(function (l) { return '<div class="mo-layer mo-' + l[0] + '"><b>' + l[1] + "</b><span>" + l[2] + "</span></div>"; }).join("") +
      '</div><p class="su-text" id="mo-text"></p><div class="ref">1 Thess 5:23 · Rom 8:5-11 · 1 Cor 9:27 · Rom 8:19-21 · Gen 1:28</div></div></section>' +
      '<section class="section"><h2>Diagram: ontological transfer</h2><div class="ot" id="ot"><svg viewBox="0 0 760 210" aria-hidden="true">' +
      '<text x="20" y="34" class="tl" style="fill:var(--wine)">ADAM\'S LINEAGE · "LIVING SOUL"</text><path class="ot-old" d="M20 70 H360" stroke="var(--wine)" stroke-width="4" pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"/>' +
      '<g transform="translate(380 105)"><circle r="44" fill="var(--gold-soft)" stroke="var(--gold)"/><path d="M0 -26 V30 M-16 -8 H16" stroke="var(--gold)" stroke-width="3"/></g><text x="380" y="180" text-anchor="middle" class="tl">INCARNATION · CROSS · RESURRECTION</text>' +
      '<path class="ot-in" d="M300 70 Q350 70 360 95" fill="none" stroke="var(--wine)" stroke-width="3" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>' +
      '<path class="ot-new" d="M400 115 Q420 140 470 140 H740" fill="none" stroke="var(--dawn)" stroke-width="4" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>' +
      '<text x="740" y="128" text-anchor="end" class="tl" style="fill:var(--dawn)">CHRIST\'S LINEAGE · "LIFE-GIVING SPIRIT"</text></svg>' +
      '<div class="row" style="justify-content:space-between"><p class="note" style="max-width:60ch">1 Corinthians 15:45-49 and 2 Corinthians 5:14-17: humanity is moved from Adam\'s headship into Christ\'s. Not an improved Adam, but a new source of existence.</p><button class="btn" type="button" id="ot-play">Play the transfer</button></div></div></section>' +
      '<section class="section"><h2>Tragic or salvific? Side by side</h2><div class="toolbar"><p class="note" style="margin:0">A tragic ontology starts the human story at the Fall. A salvific ontology starts it with Christ.</p><div class="su-toggle" role="group" aria-label="Choose a view"><button type="button" class="s" data-mv="tragic" aria-pressed="false">Tragic</button><button type="button" data-mv="both" aria-pressed="true">Both</button><button type="button" class="u" data-mv="salvific" aria-pressed="false">Salvific</button></div></div><div class="cmp-list mode-both" id="mtable">' +
      A("embTable").map(function (r) { return '<article class="cmp"><h3>' + esc(r.area) + '</h3><div class="cmp-pair"><div class="panel sep cmp-l"><div class="label">Tragic ontology</div><p>' + r.tragic + '</p></div><div class="panel uni cmp-r"><div class="label">Salvific ontology</div><p>' + r.salvific + "</p></div></div>" + (r.refs ? '<div class="ref">' + esc(r.refs.join(" · ")) + "</div>" : "") + "</article>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Key concepts, simply explained</h2><div class="chips">' + ["all"].concat(groups).map(function (g) { return '<button class="chip" type="button" data-mg="' + esc(g) + '" aria-pressed="' + (mGroup === g) + '">' + (g === "all" ? "Every concept" : esc(g)) + "</button>"; }).join("") + '</div><div class="grid" id="mgrid"></div></section>' +
      '<section class="section"><h2>The studies</h2><p class="note">Each study works through one passage or idea in depth: its thesis, the teaching step by step, the scriptures, the original words and the practical outworking.</p><div class="timeline">' +
      A("embStudies").map(function (m) { return '<article class="t-item"><div class="row" style="justify-content:space-between"><div><div class="label">' + esc(m.theme) + "</div><h3>" + esc(m.title) + '</h3></div><button class="chip" type="button" data-open="msermon.' + m.id + '">Open the study</button></div><p>' + m.thesis + '</p><div class="ref">' + esc((m.verses || []).slice(0, 8).join(" · ")) + "</div></article>"; }).join("") + "</div></section>" +
      '<section class="section"><h2>Testing it honestly</h2><div class="panel uni"><div class="label">Strengths</div><ul>' + Z.strengths.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div><div class="qa">' + Z.questions.map(function (q) { return "<details><summary>" + esc(q.q) + '</summary><div class="ans"><p>' + q.a + "</p></div></details>"; }).join("") + "</div></section>" +
      '<section class="section"><div class="label">Related in this atlas</div><div class="chips">' + ["sacred-biology", "salvific-ontology", "life-immortality", "union-sonship", "manifest-sons", "incarnation", "resurrection"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + '<a class="chip" href="#newcreation">New creation & the old self</a><a class="chip" href="#compare">Legal vs relational</a></div></section>';
  };
  var MO = {
    adam: "In the Adamic order the body governs the soul. Life runs on threat-detection: fear, craving and circumstance decide who we are, and creation hears our fear.",
    divine: "In the divine order the spirit, joined to Christ, governs the soul; the soul governs the body; and the body exercises dominion over creation. \"Your body is a perceiver; it's not a decider.\""
  };
  function setMO(m) {
    if (!$("#mo")) return; mOrder = m;
    $$("[data-mo]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.mo === m)); });
    $("#mo-stack").classList.toggle("divine", m === "divine");
    $("#mo-text").textContent = MO[m];
  }
  function mGrid() {
    if (!$("#mgrid")) return;
    $("#mgrid").innerHTML = A("embConcepts").filter(function (c) { return mGroup === "all" || c.group === mGroup; }).map(function (c) { return card("mconcept", c, { top: '<div class="label">' + esc(c.group) + "</div>", text: c.simple }); }).join("");
  }
  function playOT() {
    var o = $(".ot-old"), i = $(".ot-in"), n = $(".ot-new"); if (!o) return;
    [o, i, n].forEach(function (p) { p.style.transition = "none"; });
    o.style.strokeDashoffset = "0"; i.style.strokeDashoffset = "100"; n.style.strokeDashoffset = "100"; void o.getBoundingClientRect();
    i.style.transition = "stroke-dashoffset .8s ease"; n.style.transition = "stroke-dashoffset 1.6s ease .9s"; o.style.transition = "stroke-dashoffset 1.2s ease .6s, opacity 1.2s ease .6s";
    i.style.strokeDashoffset = "0"; n.style.strokeDashoffset = "0"; o.style.opacity = ".25";
  }

  /* ---------- How God met humanity ---------- */
  var ageIdx = 0, revTab = 0;
  V.story = function () {
    var G = A("ages"), R = A("revealed");
    return head("Progressive revelation", "How God met humanity", "God came to people where they were: in a garden, a tent, a law, a temple, a prophet's cry. The light grew until it shone in a face, in the Incarnation, at the Cross and in the Resurrection. Drag through the ages and watch it rise.") +
      (G.length ? '<section class="dawn" id="dawn"><div class="dawn-sky"><svg viewBox="0 0 800 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><radialGradient id="sun"><stop offset="0" stop-color="#fff6dc"/><stop offset=".25" stop-color="#e0ae55"/><stop offset="1" stop-color="#e0ae55" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="dawn-wash" x="0" y="0" width="800" height="220" fill="var(--gold)" opacity="0"/><circle class="dawn-sun" cx="400" cy="240" r="150" fill="url(#sun)"/><path d="M0 200 Q200 170 400 190 T800 185 V220 H0z" fill="var(--bg-2)"/><path d="M0 210 Q260 195 520 206 T800 204 V220 H0z" fill="var(--surface)"/></svg>' +
        '<div class="dawn-meter"><span class="label">Clarity of revelation</span><b id="dawn-num"></b></div></div>' +
        '<div class="dawn-ctl"><input type="range" id="age-range" min="0" max="' + (G.length - 1) + '" value="' + ageIdx + '" aria-label="Move through the ages"><div class="row" style="justify-content:space-between"><span class="label">Eden</span><span class="label">The restoration of all things</span></div></div>' +
        '<article class="dawn-card" id="age-card"></article></section>' : "") +
      (R.length ? '<section class="section"><h2>Fully revealed in Jesus</h2><div class="chips" id="revtabs">' + R.map(function (r, i) { return '<button class="chip" type="button" data-rev="' + i + '" aria-pressed="' + (i === revTab) + '">' + esc(r.title) + "</button>"; }).join("") + '</div><div id="revpane">' + revPane(R[revTab]) + "</div></section>" : "") +
      '<section class="section"><h2>Every stage</h2><div class="timeline">' + (function () {
        var era = null;
        return G.map(function (g) {
          var e = g.era !== era ? '<div class="t-era">' + esc(g.era) + "</div>" : ""; era = g.era;
          return e + '<article class="t-item"><div class="row" style="justify-content:space-between"><div><h3>' + esc(g.stage) + '</h3><div class="ref">' + esc(g.ref) + "</div></div>" + lightBar(g.light) + "</div>" +
            '<div class="t-cols"><div class="a"><span class="label">The human condition</span>' + g.condition + '</div><div class="b"><span class="label">How God met them</span>' + g.met + '</div><div class="c"><span class="label">What was revealed</span>' + g.revealed + "</div></div>" +
            (g.accommodated ? '<p class="note"><strong>Accommodated:</strong> ' + g.accommodated + "</p>" : "") + "</article>";
        }).join("");
      })() + "</div></section>";
  };
  function lightBar(n) { n = Math.max(0, Math.min(10, +n || 0)); return '<span class="lightbar" title="Clarity ' + n + ' of 10" aria-label="Clarity ' + n + ' of 10"><i style="width:' + n * 10 + '%"></i></span>'; }
  function revPane(r) {
    if (!r) return "";
    return '<article class="contrast"><div class="label">' + esc(r.ref) + '</div><h3 style="font-size:26px">' + r.headline + '</h3><div class="prose">' + (r.body || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<div class="reveals">' + (r.reveals || []).map(function (x) { return "<div>" + x + "</div>"; }).join("") + "</div>" + panel("sep", "The misunderstanding it overturns", r.undoes) + "</article>";
  }
  function showAge() {
    var G = A("ages"), g = G[ageIdx]; if (!g || !$("#dawn")) return;
    var l = Math.max(0, Math.min(10, +g.light || 0)) / 10;
    $(".dawn-sun").setAttribute("cy", String(250 - l * 170)); $(".dawn-sun").setAttribute("r", String(110 + l * 80));
    $(".dawn-wash").setAttribute("opacity", String(l * 0.16));
    $("#dawn-num").textContent = (+g.light || 0) + " / 10";
    $("#age-card").innerHTML = '<div class="row" style="justify-content:space-between"><div><div class="label">' + esc(g.era) + " · stage " + (ageIdx + 1) + " of " + G.length + '</div><h3 style="font-size:26px;margin-top:4px">' + esc(g.stage) + '</h3><div class="ref">' + esc(g.ref) + "</div></div>" + lightBar(g.light) + "</div>" +
      '<div class="t-cols"><div class="a"><span class="label">The human condition</span>' + g.condition + '</div><div class="b"><span class="label">How God met them</span>' + g.met + '</div><div class="c"><span class="label">What was revealed</span>' + g.revealed + "</div></div>" +
      (g.accommodated ? '<p class="note"><strong>Accommodated:</strong> ' + g.accommodated + "</p>" : "");
  }

  /* ---------- apostles ---------- */
  V.apostles = function () {
    return head("The witnesses", "Did the apostles all see God in Jesus?", "They walked with him and still argued about who was greatest, reached for swords and called down fire. Their understanding grew in stages, led by the Spirit into all the truth.") +
      '<div class="prose">' + A("apostlesOverview").map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<div class="grid">' + A("apostles").map(function (a) { return card("apostle", a, { text: clip(a.grasped, 140) }); }).join("") + "</div>";
  };

  /* ---------- Trinity at work ---------- */
  var actIdx = 0;
  V.trinity = function () {
    var T = A("trinityActs");
    return head("Father, Son and Holy Spirit", "The Trinity at work", "Irenaeus called the Son and the Spirit the two hands of the Father. Step through the story and see each person of the Trinity engaged with humanity, from before creation to the restoration of all things.") +
      '<section class="trin"><div class="trin-fig"><svg viewBox="0 0 300 300" aria-hidden="true"><g class="trin-spin">' +
      '<circle class="tp tp-f" cx="150" cy="78" r="58"/><circle class="tp tp-s" cx="88" cy="186" r="58"/><circle class="tp tp-p" cx="212" cy="186" r="58"/></g>' +
      '<text x="150" y="58" text-anchor="middle" class="tl">FATHER</text><text x="66" y="216" text-anchor="middle" class="tl">SON</text><text x="234" y="216" text-anchor="middle" class="tl">SPIRIT</text>' +
      '<circle cx="150" cy="150" r="13" fill="var(--dawn)" class="tu"/><text x="150" y="176" text-anchor="middle" class="tl" style="fill:var(--dawn)">US</text></svg></div>' +
      '<div class="trin-side"><div class="chips">' + T.map(function (t, i) { return '<button class="chip" type="button" data-act="' + i + '" aria-pressed="' + (i === actIdx) + '">' + (i + 1) + ". " + esc(t.moment) + "</button>"; }).join("") + '</div><div id="actpane"></div>' +
      '<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-actmove="-1">← Earlier</button><button class="btn" type="button" data-actmove="1">Next moment →</button></div></div></section>' +
      '<section class="section"><div class="label">Go deeper</div><div class="chips">' + ["trinitarian-gospel", "trinity-restoration", "triune-dance", "union-sonship", "salvific-ontology"].map(function (id) { var x = find("theme", id); return x ? '<a class="chip" href="#theme.' + id + '">' + esc(x.title) + "</a>" : ""; }).join("") + "</div></section>";
  };
  function showAct() {
    var t = A("trinityActs")[actIdx]; if (!t || !$("#actpane")) return;
    $$("[data-act]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.act === actIdx)); });
    $("#actpane").innerHTML = '<div class="label">' + esc(t.ref) + '</div><h2 style="font-size:28px;margin:4px 0 12px">' + esc(t.moment) + "</h2>" +
      '<div class="trin-grid"><div class="panel gold"><div class="label">The Father</div><p>' + t.father + '</p></div><div class="panel"><div class="label" style="color:var(--wine)">The Son</div><p>' + t.son + '</p></div><div class="panel uni"><div class="label">The Spirit</div><p>' + t.spirit + '</p></div><div class="panel"><div class="label">For us</div><p>' + t.us + "</p></div></div>";
    var fig = $(".trin-fig"); if (fig) { fig.classList.remove("pulse"); void fig.offsetWidth; fig.classList.add("pulse"); }
  }

  /* ---------- voices ---------- */
  var voiceEra = "all";
  V.voices = function () {
    return head("A cloud of witnesses", "Church fathers & teachers", "The relational gospel is not new. Its roots run through the Greek and Syriac fathers, the medieval mystics and the Reformers, to modern Trinitarian theologians and teachers. Each entry also notes where they complicate the picture.") +
      '<div class="toolbar">' + field("voice-q", "Search names or ideas, e.g. Irenaeus, theosis, MacDonald") + '<span class="count" id="voice-count"></span></div>' +
      '<div class="chips">' + [["all", "Every era"]].concat(Object.keys(ERA).map(function (k) { return [k, ERA[k]]; })).map(function (e) { return '<button class="chip" type="button" data-era="' + e[0] + '" aria-pressed="' + (voiceEra === e[0]) + '">' + e[1] + "</button>"; }).join("") + "</div>" +
      '<div class="grid" id="voicegrid"></div>';
  };
  function voiceGrid() {
    var q = (($("#voice-q") || {}).value || "").toLowerCase().trim();
    var list = A("voices").filter(function (v) { return (voiceEra === "all" || v.era === voiceEra) && (!q || [v.name, v.big, v.idea, v.tradition, (v.works || []).join(" ")].join(" ").toLowerCase().indexOf(q) > -1); });
    $("#voicegrid").innerHTML = list.map(function (v) { return card("voice", v, { top: '<div class="label">' + esc(ERA[v.era] || v.era) + "</div>", text: v.big }); }).join("") || '<p class="count">No one matches. Try another name.</p>';
    $("#voice-count").textContent = list.length + " of " + A("voices").length;
  }

  /* ---------- frameworks ---------- */
  var modelFam = "atonement";
  V.models = function () {
    return head("Frameworks compared", "How Christians have explained it", "Atonement, salvation, judgement, Scripture, the end times and the covenants. Each framework is summarised fairly, then weighed through the relational, union reading.") +
      '<div class="chips">' + Object.keys(FAMILY).map(function (k) { return '<button class="chip" type="button" data-fam="' + k + '" aria-pressed="' + (modelFam === k) + '">' + FAMILY[k] + " (" + A("models").filter(function (m) { return m.family === k; }).length + ")</button>"; }).join("") + "</div>" +
      '<div class="grid" id="modelgrid">' + modelGrid() + "</div>" +
      '<section class="section"><div class="label">Also see</div><div class="chips"><a class="chip" href="#violence">Frameworks for the violent passages</a><a class="chip" href="#theme.cross">The Cross</a><a class="chip" href="#theme.apokatastasis">Apokatastasis</a></div></section>';
  };
  function modelGrid() { return A("models").filter(function (m) { return m.family === modelFam; }).map(function (m) { return card("model", m, { text: clip(m.summary, 150) }); }).join(""); }

  /* ---------- what religion misses ---------- */
  V.religion = function () {
    return head("Religion or revelation", "What religion misses", "Religion builds ladders up to God. The gospel announces that God came down the ladder and brought us home. Read each pair side by side, or light up the gospel side of all of them.") +
      '<div class="row"><button class="chip" type="button" id="miss-all" aria-pressed="false">Show the gospel side of every pair</button></div>' +
      '<div class="misses">' + A("misses").map(function (m) {
        return '<article class="miss" id="m-' + m.id + '"><div class="row" style="justify-content:space-between"><h3>' + esc(m.title) + "</h3>" + saveBtn("miss", m.id) + '</div><div class="miss-pair"><div class="panel sep"><div class="label">Religion</div><p>' + m.religion + '</p></div><div class="miss-arrow" aria-hidden="true">→</div><div class="panel uni"><div class="label">The gospel</div><p>' + m.gospel + '</p></div></div><div class="ref">' + esc((m.refs || []).join(" · ")) + "</div></article>";
      }).join("") + "</div>";
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
    principle: function (x) { return blk("The principle", x.explanation) + panel("gold", "Worked example", x.example) + panel("uni", "Ask the text", x.ask); },
    voice: function (x) {
      return '<div class="ref">' + esc(x.years + " · " + x.tradition + " · " + (ERA[x.era] || x.era)) + "</div>" + panel("gold", "The big idea", x.big) + blk("Their contribution", x.idea) +
        (x.quote ? '<div class="verse"><span class="ref">In their words</span>' + x.quote + "</div>" : "") + blk("Key works", esc((x.works || []).join(" · "))) + panel("sep", "Where they complicate the picture", x.caution);
    },
    model: function (x) { return '<div class="ref">' + esc(FAMILY[x.family] || x.family) + " · " + esc(x.proponents) + "</div>" + blk("The framework", x.summary) + blk("Scriptures", esc((x.refs || []).join(" · "))) + panel("uni", "Through the relational lens", x.relational); },
    age: function (x) { return '<div class="row"><span class="ref">' + esc(x.era + " · " + x.ref) + "</span>" + lightBar(x.light) + "</div>" + panel("sep", "The human condition", x.condition) + panel("gold", "How God met them", x.met) + blk("What God accommodated", x.accommodated) + panel("uni", "What was revealed", x.revealed); },
    revealed: function (x) { return revPane(x); },
    apostle: function (x) { return '<div class="ref">' + esc("Writings: " + x.writings) + "</div>" + panel("uni", "What they grasped", x.grasped) + panel("sep", "Where they struggled", x.struggled) + panel("gold", "How they grew", x.growth) + blk("Key passages", esc((x.keyRefs || []).join(" · "))); },
    act: function (x) { return '<div class="ref">' + esc(x.ref) + "</div>" + panel("gold", "The Father", x.father) + blk("The Son", x.son) + panel("uni", "The Spirit", x.spirit) + blk("For us", x.us); },
    lovePassage: function (x) { return '<div class="verse"><span class="ref">' + esc(x.ref) + "</span>" + x.text + "</div>" + blk("Context", x.context) + panel("sep", "How it is used to argue for retribution", x.claim) + panel("uni", "The relational reading", x.response) + panel("gold", "What remains strong in the objection", x.fair); },
    loveObj: function (x) { return blk("The answer", x.a) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    loveWord: function (x) { return '<div class="orig" style="font-size:40px">' + esc(x.original) + '</div><div class="ref">' + esc(x.lang + " · " + x.translit) + "</div>" + blk("Meaning", x.meaning) + panel("uni", "Why it matters here", x.insight) + blk("Where it appears", esc((x.refs || []).join(" · "))); },
    loveVoice: function (x) { return '<div class="verse"><span class="ref">' + esc(x.source) + "</span>" + x.text + "</div>" + blk("Note", x.note); },
    ncq: function (x) { return panel("gold", "In short", x.short) + '<div class="prose">' + (x.answer || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" + blk("Scriptures", esc((x.refs || []).join(" · "))) + (x.objection ? panel("sep", "Pushback: " + esc(strip(x.objection.q)), x.objection.a) : ""); },
    ncterm: function (x) { return '<div class="orig" style="font-size:40px">' + esc(x.original) + '</div><div class="ref">' + esc(x.translit) + "</div>" + panel("sep", "Read through a legal gospel", x.legal) + panel("uni", "Read through the relational gospel", x.relational) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    cmp: function (x) { return '<div class="ref">' + esc(x.group) + "</div>" + panel("sep", "Legal gospel", x.legal) + panel("uni", "Relational gospel", x.relational) + blk("In practice", x.practice) + panel("gold", "A fair point", x.fair) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    mconcept: function (x) { return panel("gold", "In one line", x.simple) + '<div class="prose">' + x.explain.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" + blk("Scriptures", esc((x.refs || []).join(" · "))) + panel("uni", "Connections in the tradition", x.connects); },
    msermon: function (x) {
      return '<div class="ref">' + esc(x.theme) + "</div>" + panel("gold", "Thesis", x.thesis) +
        '<div class="blk"><div class="label">The teaching, step by step</div><ol class="steps">' + (x.points || []).map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol></div>" +
        ((x.scriptures || []).length ? '<div class="blk"><div class="label">Scriptures and how they are used</div><div class="links">' + x.scriptures.map(function (r) { return '<div><span class="ref">' + esc(r.ref) + "</span> " + r.use + "</div>"; }).join("") + "</div></div>" : "") +
        ((x.words || []).length ? '<div class="blk"><div class="label">Original words</div><div class="links">' + x.words.map(function (w) { return "<div><strong>" + esc(w.word) + "</strong> " + w.meaning + "</div>"; }).join("") + "</div></div>" : "") +
        ((x.lines || []).length ? '<div class="blk"><div class="label">Key lines</div>' + x.lines.map(function (l) { return '<div class="verse">' + esc(l) + "</div>"; }).join("") + "</div>" : "") +
        panel("uni", "Living it out", x.practice) + (x.evidence ? panel("", "Supporting evidence", x.evidence) : "");
    },
    kconcept: function (x) { return panel("gold", "In one line", x.simple) + '<div class="prose">' + x.explain.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" + blk("Scriptures", esc((x.refs || []).join(" · "))) + panel("uni", "Connections", x.connects); },
    kpractice: function (x) { return panel("gold", "How", x.how) + panel("uni", "An everyday example", x.example) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    kview: function (x) { return blk("The view", x.summary) + panel("gold", "How it reads Psalm 110, 1 Corinthians 15 and Acts 3:21", x.reads) + panel("uni", "Strengths", x.strengths) + panel("sep", "Critiques", x.critiques); },
    ldesign: function (x) { return panel("gold", "Why God designed it", x.why) + panel("uni", "How it reflects God", x.reflects) + panel("sep", "How it goes wrong", x.distortion) + blk("Healthy expression", x.healthy) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    ltrait: function (x) { return blk("The trait", x.desc) + '<div class="blk"><div class="label">Scenes</div><div class="links">' + (x.scenes || []).map(function (sc) { return '<div><span class="ref">' + esc(sc.ref) + "</span> " + sc.note + "</div>"; }).join("") + "</div></div>" + panel("uni", "The Father's heart", x.father); },
    lsit: function (x) { return blk("What Jesus did", x.did) + panel("gold", "The principle", x.principle) + panel("uni", "Today", x.today) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    shist: function (x) { return '<div class="ref">' + esc(x.years + " · " + x.era) + '</div><div class="chips">' + (x.emphasis || []).map(function (t) { return '<span class="tg t' + (SH_TAGS.indexOf(t) + 1) + ' tgl">' + esc(t) + "</span>"; }).join("") + "</div>" + blk("The gospel they announced", x.message) + blk("Method", x.method) + panel("uni", "Fruit", x.fruit) + panel("sep", "Shadow", x.shadow); },
    ssermon: function (x) { return '<div class="ref">' + esc(x.audience) + "</div>" + blk("Opening", x.opening) + panel("gold", "Core message", x.core) + '<div class="blk"><div class="label">Themes present</div><div class="chips">' + SH_THEMES.map(function (t) { var on = x.themes && x.themes[t[0]]; return '<span class="chip" style="' + (on ? "border-color:var(--gold);color:var(--ink)" : "opacity:.45;text-decoration:line-through") + '">' + t[1] + "</span>"; }).join("") + "</div></div>" + panel("uni", "The response asked", x.call) + blk("Note", x.note); },
    sjesus: function (x) { return '<div class="ref">' + esc(x.ref) + "</div>" + panel("gold", "First move", x.firstMove) + blk("Key words", x.words) + blk("Approach", x.approach) + blk("Outcome", x.outcome) + panel("uni", "Lesson", x.lesson); },
    saccuse: function (x) { return panel("sep", "Why they stress it", x.why) + panel("uni", "The answer", x.answer) + blk("Scriptures", esc((x.refs || []).join(" · "))) + panel("gold", "Common ground", x.common); },
    wdesign: function (x) { return '<div class="ref">' + esc(x.group) + "</div>" + panel("gold", "Why God designed it", x.why) + blk("How it works", x.mechanism) + panel("uni", "How it reflects God", x.reflects) + blk("The counterfeit", x.counterfeit) + panel("sep", "When it turns toxic", x.toxic) + panel("uni", "Living it well", x.healthy) + (x.science ? blk("Science", x.science + (x.scienceUrl ? ' <a href="' + esc(x.scienceUrl) + '" target="_blank" rel="noopener">source ↗</a>' : "")) : "") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wcf: function (x) { return blk("The design", esc(x.design)) + panel("sep", "The counterfeit: " + esc(x.counterfeit), x.why) + blk("What it costs", x.cost) + panel("uni", "The way back", x.return) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    bq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    bterm: function (x) { return '<div class="ref">' + esc(x.group) + "</div>" + (x.original ? blk("Original word", x.original) : "") + panel("sep", "Legal gospel", x.legal) + panel("uni", "Relational gospel", x.relational) + blk("Note", x.note) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    bacc: function (x) { return panel("uni", "Accept the person", x.accept) + panel("sep", "Decline the action", x.reject) + '<div class="blk"><div class="label">How to handle</div><ol class="steps">' + (x.handle || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ol></div>" + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    fq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wq2: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wword: function (x) { return '<div class="orig" style="font-size:36px">' + esc(x.original) + '</div><div class="ref">' + esc(x.translit + " · " + x.lang + " · " + x.posture) + "</div>" + blk("Meaning", x.meaning) + panel("gold", "Example", x.example); },
    lq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    lval: function (x) { return panel("gold", "Why God designed it", x.design) + panel("sep", "When it gets twisted", x.twisted) + panel("uni", "How Jesus lived it", x.jesus) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    lman: function (x) { return blk("Meaning", x.meaning) + panel("gold", "Scripture", x.scripture) + blk("Cultural or universal?", x.culture); },
    pq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(esc(sec.title), sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    penc: function (x) { return '<div class="ref">' + esc(x.when + " · " + x.kind + " · " + x.ref) + "</div>" + blk("What happened", x.what) + (x.word ? blk("Key word", esc(x.word)) : "") + panel("gold", "What it meant then", x.meaning) + panel("uni", "Through the relational lens", x.relational); },
    pprac: function (x) { return '<div class="ref">' + esc(x.era + " · " + x.category) + "</div>" + blk("Where it comes from", x.origin) + panel("gold", "Scripture", x.scripture) + '<div class="blk"><div class="label">How to begin</div><ol class="steps">' + (x.how || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ol></div>" + panel("uni", "What it forms", x.fruit) + panel("sep", "Watch for", x.caution); },
    pobj: function (x) { return blk("Who says it", x.who) + blk("Scriptures used", x.scripture) + panel("gold", "What it gets right", x.concede) + panel("uni", "The relational response", x.response); },
    pword: function (x) { return '<div class="orig" style="font-size:36px">' + esc(x.word) + '</div><div class="ref">' + esc(x.translit + " · " + x.lang + " · " + x.gloss) + "</div>" + blk("Meaning", x.meaning) + panel("gold", "Example", x.example); },
    iq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    iic: function (x) { return '<div class="gorig">' + esc(x.prep) + "</div>" + panel("gold", "What is true", x.truth) + panel("sep", "But my heart says", x.heart) + panel("uni", "Let it land", x.step); },
    ilie: function (x) { return blk("Where it often comes from", x.origin) + panel("uni", "The truth", x.truth) + panel("gold", "Scripture", x.scripture) + blk("A gentle prayer", x.prayer) + blk("One step", x.practice); },
    iapp: function (x) { return '<div class="ref">' + esc(x.origin) + "</div>" + blk("Method", x.method) + panel("uni", "Strengths", x.strengths) + panel("sep", "Cautions", x.cautions) + blk("Research", x.evidence); },
    iwof: function (x) { return blk("The teaching", x.claim) + blk("Where it came from", x.origin) + panel("gold", "What it gets right", x.right) + panel("sep", "Where it goes wrong", x.problem) + panel("uni", "The relational response", x.relational); },
    sq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    sfrom: function (x) { return (x.word ? '<div class="gorig">' + esc(x.word) + "</div>" : "") + panel("sep", "The legal gospel", x.legal) + panel("uni", "The relational gospel", x.relational) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    sppl: function (x) { return blk("Who", x.description) + panel("sep", "What the legal gospel tells them", x.legal) + panel("uni", "What the relational gospel tells them", x.relational) + panel("gold", "How to talk with them", x.share); },
    snot: function (x) { return panel("uni", "The truth", x.truth) + blk("Scripture", x.ref) + blk("In everyone", x.everyone) + blk("In believers", x.believers) + blk("Source", x.source); },
    sobj: function (x) { return blk("Who says it", x.who) + blk("Scriptures used", x.scripture) + panel("gold", "What it gets right", x.concede) + panel("uni", "The relational response", x.response); },
    safter: function (x) { return blk("What", x.what) + panel("uni", "Why, in union", x.why) + panel("sep", "What it is not", x.not) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    rq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    rview: function (x) { return '<div class="ref">' + x.when + "</div>" + blk("How new birth happens", x.how) + blk("Sign", x.sign) + panel("gold", "Scripture", x.scripture) + panel("uni", "Strength", x.strength) + panel("sep", "Critique", x.critique); },
    dq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    drel: function (x) { return DSF.map(function (f) { return blk(f[1], x[f[0]]); }).join("") + panel("sep", "Humanity’s alternative", x.corruption) + panel("uni", "Restored in Christ", x.restored) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    dex: function (x) { return '<div class="ref">' + esc(x.ref + " · " + x.kind + " · " + x.relation) + "</div>" + blk("The story", x.story) + panel("uni", "Through the relational lens", x.lens) + panel("gold", "For us", x.lesson); },
    dcor: function (x) { return blk("Counterfeit of", x.design) + blk("What it is", x.what) + panel("sep", "Why we reach for it", x.why) + panel("uni", "The way back", x.healing) + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    skc: function (x) { return blk("Who says it", x.who) + blk("Scriptures used", x.scripture) + panel("gold", "What it gets right", x.concede) + panel("uni", "The response", x.response); },
    wq1: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wq3: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wchar: function (x) { return panel("sep", "How religion often pictured it", x.distortion) + panel("uni", "Through the Jesus lens", x.jesus) + blk("See it", x.scene) + panel("gold", "Scripture", x.ref); },
    wcase: function (x) { return blk("Who", x.person) + panel("sep", "Legal gospel", x.legal) + panel("gold", "Techniques only", x.secular) + panel("uni", "Relational gospel", x.relational) + blk("Outcome", x.outcome); },
    wprov: function (x) { return blk("Who", x.who) + blk("The view", x.view) + blk("Applied", x.example) + panel("uni", "Strength", x.strength) + panel("sep", "Weakness", x.weakness); },
    blwq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wmq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    wmw: function (x) { return '<div class="ref">' + esc(x.era + " · " + x.ref) + "</div>" + blk("Her story", x.story) + panel("uni", "What she shows", x.point); },
    jq1: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    jq2: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    bsq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    bsarg: function (x) { return panel("sep", "The argument", x.arg) + panel("gold", "What is true in it", x.truth) + panel("uni", "The answer", x.answer) + blk("Scriptures", esc(x.ref)); },
    rcq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    rccase: function (x) { return blk("The story", x.who) + panel("sep", "Legal gospel", x.legal) + panel("", "Secular help", x.secular) + panel("uni", "Relational gospel", x.relational) + '<div class="blk"><div class="label">Practical steps</div><ol class="steps">' + (x.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    jq3: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    jcase: function (x) { return blk("The story", x.story) + panel("sep", "Where the legal gospel goes wrong", x.legal) + panel("uni", "The relational solution", x.relational) + '<div class="blk"><div class="label">Steps</div><ol class="steps">' + (x.steps || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol></div>"; },
    blq: function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); },
    blst: function (x) { return blk("What happens", x.scene) + panel("gold", "In its world", x.culture) + panel("uni", "Through the relational lens", x.relational) + blk("In Christ", x.fulfilled); },
    dxpart: function (x) { return panel("gold", "Big idea", x.big) + blk("Summary", x.summary) + (x.points || []).map(function (p) { return blk(esc(p.head), p.text); }).join("") + blk("Scriptures", esc((x.scriptures || []).join(" · "))) + panel("uni", "Reflect", x.reflect); },
    dech: function (x) { return panel("gold", "Big idea", x.big) + blk("Summary", x.summary) + (x.points || []).map(function (p) { return blk(esc(p.head), p.text); }).join("") + blk("Scriptures", esc((x.scriptures || []).join(" · "))) + panel("uni", "Reflect", x.reflect); },
    mmyth: function (x) { return '<div class="ref">' + esc(x.kind + " #" + x.n + " · " + x.category) + "</div>" + panel("sep", "The myth", esc(x.myth)) + panel("uni", "What is actually true", x.truth) + blk("More", x.detail) + blk("Scriptures", esc(strip(x.scripture))) + (x.note ? blk("Note", x.note) : ""); },
    miss: function (x) { return panel("sep", "What religion says", x.religion) + panel("uni", "What the gospel reveals", x.gospel) + blk("Scriptures", esc((x.refs || []).join(" · "))); }
  };
  Object.keys(RG.studies || {}).forEach(function (v) {
    var S = RG.studies[v];
    V[v] = function () { return stView(v); };
    RG["sqa_" + v] = S.qa || [];
    TYPES["sq" + v] = { key: "sqa_" + v, view: v, title: function (x) { return x.q; }, sub: function () { return S.short || S.title; }, label: S.short || S.title };
    SHEET["sq" + v] = function (x) { return panel("gold", "In short", x.short) + (x.sections || []).map(function (sec) { return blk(sec.title, sec.body.join("</p><p>")); }).join("") + blk("Scriptures", esc((x.refs || []).join(" · "))); };
    QXSAVE["sq" + v] = "sq" + v;
  });
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
    RG.worAllQA = A("worQA1").concat(A("worQA2"));
    RG.deChapters = deAll();
    RG.dxParts = dxAll();
    RG.svAllQA = A("svQA1").concat(A("svQA2"));
    RG.idAllQA = A("idQA1").concat(A("idQA2"));
    RG.paAllQA = A("paQA1").concat(A("paQA2"));
    RG.lvAllQA = A("lvQA1").concat(A("lvQA2"), A("lvQA3"), A("lvQA4"));
    RG.fgAllQA = A("fgQA1").concat(A("fgQA2"));
    RG.bigAllQA = A("bigQA").concat(A("bigQA2"));
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
      var items = g.items.slice(); if (g.group === "The great themes") A("themes").forEach(function (t) { if (PINNED.indexOf(t.id) === -1) items.push(["theme." + t.id, t.title]); });
      return '<div class="label" style="margin:14px 0 8px">' + g.group + '</div><div class="grid">' + items.map(function (it) { return '<a href="#' + it[0] + '" data-close>' + esc(it[1]) + "</a>"; }).join("") + "</div>";
    }).join("") + "</div>";
  }

  /* ================= ATLAS CANVAS ================= */
  var sky = null;
  function startSky() {
    var cv = $("#sky"); if (!cv) return;
    var ctx = cv.getContext("2d"), stage = $("#stage"), tip = $("#tip");
    var themes = A("themes"), regions = [["tenses", "Three tenses"], ["enforce", "Truth to reality"], ["receive", "Receiving the word"], ["gifts", "Gifts & fruit"], ["parables", "Kingdom parables"], ["mission", "Mission"], ["misuse", "Scripture misused"], ["sorry", "Sorry?"], ["belief", "Belief manifests?"], ["trees", "Two trees"], ["deathless", "Deathless"], ["facets", "Gospel facets"], ["covenant", "The Blessing"], ["sons", "Sons revealed"], ["healing", "Divine healing"], ["name", "The Name"], ["blessing", "Blessing"], ["recover", "Habits & healing"], ["doxa", "Doxa"], ["woman", "Man & woman"], ["justice", "Justice & call-outs"], ["blood", "Life in the blood"], ["embrace", "Divine Embrace"], ["myths", "Myths"], ["ways", "How God works"], ["reborn", "Born again"], ["design", "Made for each other"], ["saviour", "Why a Saviour?"], ["identity", "Identity & healing"], ["paths", "Ancient paths"], ["living", "Living it out"], ["worship", "Worship"], ["forgive", "Forgiveness"], ["big", "Big questions"], ["why", "Why of design"], ["share", "Sharing it"], ["life", "Love with a spine"], ["kingdom", "Kingdom"], ["embodied", "Embodied gospel"], ["love", "God is love"], ["newcreation", "New creation"], ["compare", "Legal vs relational"], ["story", "God met us"], ["read", "Reading"], ["lens", "Old & New"], ["journey", "Misreadings"], ["violence", "Violence"], ["law", "The Law"], ["culture", "Culture"], ["sayings", "Jesus' words"], ["trinity", "Trinity"], ["apostles", "Apostles"], ["voices", "Fathers"], ["models", "Frameworks"], ["religion", "Religion"], ["debate", "Debates"]];
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
      ctx.fillStyle = "#1a1408"; ctx.font = (W > 420 ? 15 : 12) + "px Avenir Next, Nunito Sans, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Jesus", c, c);
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
    if (route.view === "story") showAge();
    if (route.view === "trinity") showAct();
    if (route.view === "voices") voiceGrid();
    clearInterval(svTimer); svStep = -1; clearInterval(rbStT); clearInterval(rbLT); clearInterval(wyRcT);
    if (route.view === "myths") mmShow();
    clearInterval(blT);
    if (RG.studies && RG.studies[route.view]) qxShow("sq" + route.view, "sq" + route.view);
    if (route.view === "blessing") { bswShow(); bsspShow(); bswhShow(); bslfShow(); bstShow(); bssShow(); bsaShow(); bsyShow(); bsvShow(); bsacShow(); bscShow(); qxShow("bsq", "bsq"); }
    if (route.view === "recover") { rcdShow(); rcvShow(); rclShow(); rclvShow(); rcrtShow(); rccyShow(); rcbShow(); rccShow(); qxShow("rcq", "rcq"); }
    if (route.view === "justice") { jxdShow(); jxsShow(); jxhShow(); jxrShow(); jxcShow(); jxtShow(); jxaShow(); qxShow("jxq1", "jq1"); qxShow("jxq2", "jq2"); qxShow("jxq3", "jq3"); }
    if (route.view === "blood") { blShow(); blpShow(); blvShow(); blwShow(); qxShow("blq", "blq"); qxShow("blwq", "blwq"); }
    clearInterval(dxStT);
    if (route.view === "doxa") { dxStepShow(); dxShow(); dxqShow(); }
    if (route.view === "woman") { wmStepShow(); wmWomenShow(); wmvShow(); qxShow("wmq", "wmq"); }
    if (route.view === "embrace") { deShow(); deWordsShow(); deQsShow(); }
    if (route.view === "ways") { wyCSeen = false; wycShow(); wysShow(); wystScore(); wyvShow(); wypvShow(); qxShow("wyq1", "wq1"); wyskShow(); wycsShow(); wyrcShow(); wyfShow(); qxShow("wyq2", "wq3"); }
    if (route.view === "reborn") { rbsShow(); rbjShow(); rbvShow(); qxShow("rbq", "rq"); }
    if (route.view === "design") { dsrShow(); dsxShow(); qxShow("dsq", "dq"); }
    if (route.view === "saviour") { svfShow(); svflShow(); svpShow(); svaShow(); svqShow(); }
    clearTimeout(paGTimer); clearInterval(paWalk); cancelAnimationFrame(paRaf); paGStep = -1;
    if (route.view === "identity") { idcShow(); idgShow(); idlShow(); idsScore(); idlyShow(); idqShow(); }
    if (route.view === "paths") { paStations(); showEnc(); showPrac(); showGuide(); showSp(); showTests(); paqShow(); }
    if (route.view === "living") { showBal(); showResp(); lvqShow(); showPr(); }
    if (route.view === "worship") { showVph(); showJ4(); showWords(); wwqShow(); }
    if (route.view === "forgive") { showStairs(); showTree(); fqShow(); feScore(); showApo(); }
    if (route.view === "big") { showFlow(); bqShow(); glossShow(); }
    if (route.view === "why") { wxTiles(); wqShow(); wcScore(); }
    if (route.view === "share") { showDialog(false); showRiver(); showWheel(); }
    if (route.view === "life") { showSpine(); lifeScore(); }
    if (route.view === "kingdom") { showK(); kGrid(); }
    if (route.view === "embodied") { setMO(mOrder); mGrid(); }
    if (route.view === "newcreation") { showNC(); ncList(); }
    if (route.view === "compare") cmpList();
    if (route.view === "love") { setScale(scaleMode); lpGrid(); }
    bindSU();
    if (r.item) openSheet(r.item.type, r.item.id);
    var ttl = route.view === "theme" ? (find("theme", route.id) || {}).title : null;
    document.title = (ttl ? ttl + " · " : "") + "Relational Gospel Atlas";
  }

  /* ---------- events ---------- */
  document.addEventListener("input", function (ev) { if (ev.target.id === "lvb-r") { lvBal = +ev.target.value; showBal(); } if (ev.target.id === "idg-r") { idG = +ev.target.value; idgShow(); } if (ev.target.id === "dx-gr") { dxG = +ev.target.value; var gl = $("#dx-gl"); if (gl) gl.style.setProperty("--t", dxG / 100); } if (ev.target.id === "mm-q") { mmQ = ev.target.value; mmI = 0; mmShow(); } if (ev.target.id === "de-wq") { deWq = ev.target.value; deWordsShow(); } if (ev.target.id === "de-qq") { deQq = ev.target.value; deQsShow(); } });
  document.addEventListener("change", function (ev) { if (ev.target.id === "rbv-a") { rbA = +ev.target.value; rbvShow(); } if (ev.target.id === "rbv-b") { rbB = +ev.target.value; rbvShow(); } });
  document.addEventListener("change", function (ev) { var d = ev.target.dataset || {}; if (d.bss) { bsS[d.bss] = ev.target.checked; bssShow(); } if (d.bsac) { bsAct[d.bsac] = ev.target.checked; bsacShow(); } });
  document.addEventListener("change", function (ev) { var jt = ev.target.dataset && ev.target.dataset.jxt; if (jt) { jxT[jt] = ev.target.checked; jxtShow(); } });
  document.addEventListener("change", function (ev) { var d = ev.target.dataset && ev.target.dataset.pat; if (d) { paTest[d] = ev.target.checked; showTests(); } });
  document.addEventListener("keydown", function (ev) { if ((ev.key === "Enter" || ev.key === " ") && ev.target.closest && ev.target.closest("[data-bls]")) { ev.preventDefault(); blS = +ev.target.closest("[data-bls]").dataset.bls; blShow(); return; } if ((ev.key === "Enter" || ev.key === " ") && ev.target.closest && ev.target.closest("[data-pas]")) { ev.preventDefault(); clearInterval(paWalk); paGoStn(+ev.target.closest("[data-pas]").dataset.pas); } });
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
    if (t.closest("#dx-veil")) { dxVeil = !dxVeil; $("#dx-hero").classList.toggle("lifted", dxVeil); t.closest("#dx-veil").textContent = dxVeil ? "Veil again" : "Lift the veil"; return; }
    var dsb2 = t.closest("[data-dxs]"); if (dsb2) { clearInterval(dxStT); dxSt = +dsb2.dataset.dxs; dxStepShow(); return; }
    if (t.closest("#dx-play")) { clearInterval(dxStT); dxSt = 0; dxStepShow(); var nDx = A("dxSteps").length; dxStT = setInterval(function () { if (dxSt >= nDx - 1) { clearInterval(dxStT); return; } dxSt++; dxStepShow(); }, reduced ? 300 : 2800); return; }
    var dpb = t.closest("[data-dxp]"); if (dpb) { dxP = +dpb.dataset.dxp; dxShow(); return; }
    var dtb2 = t.closest("[data-dxtab]"); if (dtb2) { dxTab = dtb2.dataset.dxtab; dxShow(); return; }
    var dpm = t.closest("[data-dxpm]"); if (dpm) { dxP = Math.max(0, Math.min((RG.dxParts || []).length - 1, dxP + +dpm.dataset.dxpm)); dxShow(); $("#dx-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var dob = t.closest("[data-dxo]"); if (dob) { var dq = A("dxQuiz")[dxQ]; if (dq && dxQA[dq.id] == null) { dxQA[dq.id] = +dob.dataset.dxo; dxqShow(); } return; }
    var dqm = t.closest("[data-dxqm]"); if (dqm) { dxQ = Math.max(0, Math.min(A("dxQuiz").length - 1, dxQ + +dqm.dataset.dxqm)); dxqShow(); return; }
    var bwb = t.closest("[data-blw]"); if (bwb) { blW = +bwb.dataset.blw; blwShow(); return; }
    var wsb = t.closest("[data-wms]"); if (wsb) { wmS = +wsb.dataset.wms; wmStepShow(); return; }
    var wsm = t.closest("[data-wmsm]"); if (wsm) { wmS = Math.max(0, Math.min(A("wmGen3").length - 1, wmS + +wsm.dataset.wmsm)); wmStepShow(); return; }
    var web = t.closest("[data-wme]"); if (web) { wmEra = web.dataset.wme; wmOpen = -1; $$("[data-wme]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === web)); }); wmWomenShow(); return; }
    var wwb = t.closest("[data-wmw]"); if (wwb) { var wi = +wwb.dataset.wmw; wmOpen = wmOpen === wi ? -1 : wi; wmWomenShow(); return; }
    var wvb = t.closest("[data-wmv]"); if (wvb) { wmV = +wvb.dataset.wmv; wmvShow(); return; }
    var jgo = t.closest("[data-jxgo]"); if (jgo) { var jel = document.getElementById(jgo.dataset.jxgo); if (jel) jel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var jdb = t.closest("[data-jxd]"); if (jdb) { jxD = +jdb.dataset.jxd; jxdShow(); return; }
    var jsb = t.closest("[data-jxs]"); if (jsb) { jxS = +jsb.dataset.jxs; jxsShow(); return; }
    var job = t.closest("[data-jxo]"); if (job) { var jr = A("jxScenes")[jxS]; if (jr && jxSAns[jr.id] == null) { jxSAns[jr.id] = +job.dataset.jxo; jxsShow(); } return; }
    var jsm = t.closest("[data-jxsm]"); if (jsm) { jxS = Math.max(0, Math.min(A("jxScenes").length - 1, jxS + +jsm.dataset.jxsm)); jxsShow(); $("#jxs-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var jhb = t.closest("[data-jxh]"); if (jhb) { jxH = +jhb.dataset.jxh; jxhShow(); return; }
    var jhm = t.closest("[data-jxhm]"); if (jhm) { jxH = Math.max(0, Math.min(A("jxHarass").length - 1, jxH + +jhm.dataset.jxhm)); jxhShow(); return; }
    var jrb = t.closest("[data-jxr]"); if (jrb) { jxRing = jrb.dataset.jxr; jxRi = 0; jxrShow(); return; }
    var sx7 = t.closest("[data-sxt]"); if (sx7) { var st7 = sx7.dataset.sxt.split("|"); SS[st7[0] + "|" + st7[1] + "|tab"] = st7[2]; stRedraw(st7[0], +st7[1]); return; }
    var sx8 = t.closest("[data-sxk]"); if (sx8) { var st8 = sx8.dataset.sxk.split("|"), j8 = +st8.pop(), k8 = st8.join("|"); SS[k8] = SS[k8] === j8 ? -1 : j8; stRedraw(st8[0], +st8[1]); return; }
    var sx9 = t.closest("[data-sxd]"); if (sx9) { var d9 = sx9.dataset.sxd.split("|"), id9 = d9.pop(), k9 = d9.join("|"), b9 = RG.studies[d9[0]].blocks[+d9[1]]; var p9 = (SS[k9 + "|path"] || [b9.start]).slice(), c9 = (SS[k9 + "|ch"] || []).slice(); c9.push(sx9.textContent); p9.push(id9); SS[k9 + "|path"] = p9; SS[k9 + "|ch"] = c9; stRedraw(d9[0], +d9[1]); return; }
    var sx10 = t.closest("[data-sxdb]"); if (sx10) { var k10 = sx10.dataset.sxdb, d10 = k10.split("|"); (SS[k10 + "|path"] || []).pop(); (SS[k10 + "|ch"] || []).pop(); stRedraw(d10[0], +d10[1]); return; }
    var sx11 = t.closest("[data-sxd0]"); if (sx11) { var k11 = sx11.dataset.sxd0, d11 = k11.split("|"); SS[k11 + "|path"] = null; SS[k11 + "|ch"] = null; stRedraw(d11[0], +d11[1]); return; }
    var sx1 = t.closest("[data-sx]"); if (sx1) { var sp = sx1.dataset.sx.split("|"); SS[sp[0] + "|" + sp[1]] = +sp[2]; clearInterval(stTimer); stRedraw(sp[0], +sp[1]); return; }
    var sx2 = t.closest("[data-sxm]"); if (sx2) { var sm = sx2.dataset.sxm.split("|"), sk = sm[0] + "|" + sm[1]; SS[sk] = (SS[sk] || 0) + +sm[2]; stRedraw(sm[0], +sm[1]); return; }
    var sx3 = t.closest("[data-sxp]"); if (sx3) { var spp = sx3.dataset.sxp.split("|"); stPlay(spp[0], +spp[1]); return; }
    var sx4 = t.closest("[data-sxr]"); if (sx4) { var sr = sx4.dataset.sxr.split("|"); SR[sx4.dataset.sxr] = (SR[sx4.dataset.sxr] || 0) + 1; stRedraw(sr[0], +sr[1]); return; }
    var sx5 = t.closest("[data-sxr0]"); if (sx5) { var sr0 = sx5.dataset.sxr0.split("|"); SR[sx5.dataset.sxr0] = 0; stRedraw(sr0[0], +sr0[1]); return; }
    var sx6 = t.closest("[data-sxq]"); if (sx6) { var sq = sx6.dataset.sxq.split("|"), qk = sq[0] + "|" + sq[1]; SQ[qk] = SQ[qk] || {}; SQ[qk][+sq[2]] = +sq[3]; stRedraw(sq[0], +sq[1]); return; }
    var bs1 = t.closest("[data-bsw]"); if (bs1) { bsW = +bs1.dataset.bsw; bswShow(); return; }
    var bs2 = t.closest("[data-bssp]"); if (bs2) { bsSp = +bs2.dataset.bssp; bsspShow(); return; }
    var bs3 = t.closest("[data-bswh]"); if (bs3) { bsWh = +bs3.dataset.bswh; bswhShow(); return; }
    var bs4 = t.closest("[data-bslf]"); if (bs4) { bsLf = bs4.dataset.bslf; bslfShow(); return; }
    var bs5 = t.closest("[data-bst]"); if (bs5) { bsT = +bs5.dataset.bst; bstShow(); return; }
    var bs6 = t.closest("[data-bsa]"); if (bs6) { bsA = +bs6.dataset.bsa; bsaShow(); return; }
    var bs7 = t.closest("[data-bsam]"); if (bs7) { bsA = Math.max(0, Math.min(A("bsArgs").length - 1, bsA + +bs7.dataset.bsam)); bsaShow(); return; }
    var bs8 = t.closest("[data-bsy]"); if (bs8) { bsY = +bs8.dataset.bsy; bsyShow(); return; }
    var bs9 = t.closest("[data-bsv]"); if (bs9) { bsV = +bs9.dataset.bsv; bsvShow(); return; }
    var bs10 = t.closest("[data-bsc]"); if (bs10) { bsC = +bs10.dataset.bsc; bscShow(); return; }
    var rcb1 = t.closest("[data-rcd]"); if (rcb1) { rcD = +rcb1.dataset.rcd; rcdShow(); return; }
    var rcb2 = t.closest("[data-rcv]"); if (rcb2) { rcV = rcb2.dataset.rcv; rcvShow(); return; }
    var rcb3 = t.closest("[data-rclens]"); if (rcb3) { rcLens = rcb3.dataset.rclens; rclShow(); return; }
    var rcb4 = t.closest("[data-rcn]"); if (rcb4) { rcN = +rcb4.dataset.rcn; rclShow(); return; }
    var rcb5 = t.closest("[data-rclv]"); if (rcb5) { rcLv = +rcb5.dataset.rclv; rclvShow(); return; }
    var rcb6 = t.closest("[data-rcrt]"); if (rcb6) { rcRt = +rcb6.dataset.rcrt; rcrtShow(); return; }
    var rcb7 = t.closest("[data-rccy]"); if (rcb7) { rcCyc = rcb7.dataset.rccy; rcCi = 0; rccyShow(); return; }
    var rcb8 = t.closest("[data-rcci]"); if (rcb8) { rcCi = +rcb8.dataset.rcci; rccyShow(); return; }
    var rcb9 = t.closest("[data-rcc]"); if (rcb9) { rcC = +rcb9.dataset.rcc; rccShow(); return; }
    var rcb10 = t.closest("[data-rcmy]"); if (rcb10) { var mi = +rcb10.dataset.rcmy, mm = A("rcMyths")[mi]; rcMy[mi] = !rcMy[mi]; rcb10.classList.toggle("flip", rcMy[mi]); rcb10.innerHTML = '<span class="label">' + (rcMy[mi] ? "The truth" : "Myth") + "</span><span>" + (rcMy[mi] ? mm.truth : esc(mm.myth)) + "</span>"; return; }
    var jrib = t.closest("[data-jxri]"); if (jrib) { jxRi = +jrib.dataset.jxri; jxrShow(); return; }
    var jcb = t.closest("[data-jxc]"); if (jcb) { jxCase = +jcb.dataset.jxc; jxcShow(); return; }
    var jab = t.closest("[data-jxa]"); if (jab) { jxAns = +jab.dataset.jxa; jxaShow(); return; }
    var blsb = t.closest("[data-bls]"); if (blsb) { clearInterval(blT); blS = +blsb.dataset.bls; blShow(); return; }
    if (t.closest("#bl-play")) { clearInterval(blT); blS = 0; blShow(); var nB = A("blStations").length; blT = setInterval(function () { if (blS >= nB - 1) { clearInterval(blT); return; } blS++; blShow(); }, reduced ? 400 : 3400); return; }
    var blpb = t.closest("[data-blp]"); if (blpb) { blP = +blpb.dataset.blp; blpShow(); return; }
    var bltb = t.closest("[data-blt]"); if (bltb) { var bi = +bltb.dataset.blt; blSt = blSt === bi ? -1 : bi; var STb = A("blStory"); $$(".bl-tm").forEach(function (b, i) { var s2 = STb[i]; b.classList.toggle("on", i === blSt); b.innerHTML = '<i aria-hidden="true"></i><b>' + esc(s2.title) + '</b><span class="ref">' + esc(s2.ref) + "</span>" + (i === blSt ? '<div class="bl-tm-in"><p>' + s2.scene + '</p><div class="panel gold"><div class="label">In its world</div><p>' + s2.culture + '</p></div><div class="panel uni"><div class="label">Through the relational lens</div><p>' + s2.relational + '</p></div><p style="font-size:15px"><strong>In Christ:</strong> ' + s2.fulfilled + "</p></div>" : ""); }); return; }
    var blvb = t.closest("[data-blv]"); if (blvb) { blV = +blvb.dataset.blv; blvShow(); return; }
    var dlb = t.closest("[data-delie]"); if (dlb) { deLie ^= +dlb.dataset.delie; dlb.classList.toggle("flip"); return; }
    if (t.closest("#de-glass")) { deMir = !deMir; $("#de-mirror").classList.toggle("on", deMir); return; }
    var dcb = t.closest("[data-dec]"); if (dcb) { deC = +dcb.dataset.dec; deShow(); return; }
    var dtb = t.closest("[data-detab]"); if (dtb) { deTab = dtb.dataset.detab; deShow(); return; }
    var dcm = t.closest("[data-decm]"); if (dcm) { deC = Math.max(0, Math.min((RG.deChapters || []).length - 1, deC + +dcm.dataset.decm)); deShow(); $("#de-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var dsb = t.closest("[data-dest]"); if (dsb) { var di = +dsb.dataset.dest; deStory = deStory === di ? -1 : di; $$(".de-st").forEach(function (b, i) { var x = RG.deStories[i]; b.classList.toggle("on", i === deStory); b.innerHTML = "<small>Chapter " + x.c.n + "</small><b>" + esc(x.s.title) + "</b>" + (i === deStory ? "<p>" + x.s.text + "</p>" : ""); }); return; }
    var mmcb = t.closest("[data-mmc]"); if (mmcb) { mmCat = mmcb.dataset.mmc; mmI = 0; $$("[data-mmc]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === mmcb)); }); mmShow(); return; }
    var mmkb = t.closest("[data-mmk]"); if (mmkb) { mmKind = mmkb.dataset.mmk; mmI = 0; $$("[data-mmk]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === mmkb)); }); mmShow(); return; }
    var mmbb = t.closest("[data-mmb]"); if (mmbb) { var mL = mmList()[mmI]; if (mL) { mmBel[mL.id] = mmbb.dataset.mmb === "1"; mmBust[mL.id] = true; mmShow(); } return; }
    if (t.closest("#mm-bust")) { var mL2 = mmList()[mmI]; if (mL2) { mmBust[mL2.id] = true; mmShow(); } return; }
    var mmmb = t.closest("[data-mmm]"); if (mmmb) { mmI += +mmmb.dataset.mmm; mmShow(); return; }
    var mmgb = t.closest("[data-mmg]"); if (mmgb) { mmI = +mmgb.dataset.mmg; mmShow(); $("#mm-deck").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var mmcn = t.closest("[data-mmcn]"); if (mmcn) { mmcn.classList.toggle("on"); return; }
    var wcb = t.closest("[data-wyc]"); if (wcb) { wyC = +wcb.dataset.wyc; wyCSeen = false; wycShow(); if (window.innerWidth < 980) $("#wyc-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" }); return; }
    if (t.closest("#wyc-see")) { wyCSeen = true; wycShow(); return; }
    var wsb = t.closest("[data-wys]"); if (wsb) { wyS = +wsb.dataset.wys; wysShow(); return; }
    var wstb = t.closest("[data-wyst]"); if (wstb) {
      var wx = A("wySorter").filter(function (y) { return y.id === wstb.dataset.wyst; })[0]; if (!wx) return;
      wyAns[wx.id] = wstb.dataset.ans; var wbox = $("#wyst-" + wx.id); wbox.classList.add("answered");
      $$("[data-wyst]", wbox).forEach(function (b) { b.setAttribute("aria-pressed", String(b === wstb)); b.classList.toggle("right", b.dataset.ans === wx.answer); });
      var wo = $(".sc-out", wbox); wo.hidden = false;
      wo.innerHTML = '<div class="label">' + (wstb.dataset.ans === wx.answer ? "You match the study" : "The study says: " + WYS[wx.answer]) + "</div><p>" + wx.why + '</p><div class="ref">' + esc((wx.refs || []).join(" · ")) + "</div>";
      wystScore(); return;
    }
    var wvb = t.closest("[data-wyv]"); if (wvb) { var vq = A("wyVoiceQuiz")[wyVQ]; if (vq && !wyVAns[vq.id]) { wyVAns[vq.id] = wvb.dataset.wyv; wyvShow(); } return; }
    var wvm = t.closest("[data-wyvm]"); if (wvm) { wyVQ = Math.max(0, Math.min(A("wyVoiceQuiz").length - 1, wyVQ + +wvm.dataset.wyvm)); wyvShow(); return; }
    var wpv = t.closest("[data-wypv]"); if (wpv) { wyPv = +wpv.dataset.wypv; wypvShow(); return; }
    var wlb = t.closest("[data-wyl]"); if (wlb) { wyLens = wlb.dataset.wyl; wyskShow(); return; }
    var wcsb = t.closest("[data-wycs]"); if (wcsb) { wyCase = +wcsb.dataset.wycs; wycsShow(); return; }
    var wrb = t.closest("[data-wyrc]"); if (wrb) { clearInterval(wyRcT); wyRc = +wrb.dataset.wyrc; wyrcShow(); return; }
    if (t.closest("#wyrc-play")) { clearInterval(wyRcT); wyRc = 0; wyrcShow(); var nRc = A("wyReceive").length; wyRcT = setInterval(function () { if (wyRc >= nRc - 1) { clearInterval(wyRcT); return; } wyRc++; wyrcShow(); }, reduced ? 300 : 3000); return; }
    var wfb = t.closest("[data-wyf]"); if (wfb) { wyF = +wfb.dataset.wyf; wyfShow(); return; }
    var qxb = t.closest("[data-qx]"); if (qxb) { var qp = qxb.dataset.qx.split(":"); QX[qp[0]] = +qp[1]; qxShow(qp[0], QXSAVE[qp[0]]); if (window.innerWidth < 980) $("#" + qp[0] + "-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var qxm = t.closest("[data-qxm]"); if (qxm) { var qm = qxm.dataset.qxm.split(":"); QX[qm[0]] = Math.max(0, Math.min((QXL[qm[0]] || []).length - 1, (QX[qm[0]] || 0) + +qm[1])); qxShow(qm[0], QXSAVE[qm[0]]); $("#" + qm[0] + "-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var rsb = t.closest("[data-rbs]"); if (rsb) { clearInterval(rbStT); rbSt = +rsb.dataset.rbs; rbsShow(); return; }
    if (t.closest("#rbs-play")) { clearInterval(rbStT); rbSt = 0; rbsShow(); var nRS = A("rbStages").length; rbStT = setInterval(function () { if (rbSt >= nRS - 1) { clearInterval(rbStT); return; } rbSt++; rbsShow(); }, reduced ? 300 : 3600); return; }
    var rjb = t.closest("[data-rbj]"); if (rjb) { var rn = $(".rbj-n", rjb); if (rn) { rn.hidden = !rn.hidden; rjb.classList.toggle("open", !rn.hidden); } return; }
    if (t.closest("#rbj-next")) { rbLine = Math.min(A("rbJohn3").length - 1, rbLine + 1); rbjShow(); return; }
    if (t.closest("#rbj-all")) { rbLine = A("rbJohn3").length - 1; rbjShow(); return; }
    if (t.closest("#rbj-reset")) { rbLine = 0; rbjShow(); return; }
    var drb = t.closest("[data-dsr]"); if (drb) { dsR = +drb.dataset.dsr; dsrShow(); return; }
    var dxb = t.closest("[data-dsx]"); if (dxb) { dsRel = dxb.dataset.dsx; $$("[data-dsx]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === dxb)); }); dsxShow(); return; }
    var dkb = t.closest("[data-dsk]"); if (dkb) { dsKind = dkb.dataset.dsk; $$("[data-dsk]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === dkb)); }); dsxShow(); return; }
    var sfb = t.closest("[data-svf]"); if (sfb) { svF = +sfb.dataset.svf; var sfx = A("svFrom")[svF]; if (sfx) svBroken[sfx.id] = true; svfShow(); return; }
    if (t.closest("#svfl-play")) { clearInterval(svTimer); svStep = 0; svflShow(); var nF = Math.max((RG.svFlow.legal || []).length, (RG.svFlow.relational || []).length); svTimer = setInterval(function () { svStep++; if (svStep >= nF - 1) clearInterval(svTimer); svflShow(); }, reduced ? 80 : 1500); return; }
    if (t.closest("#svfl-all")) { clearInterval(svTimer); svStep = 99; svflShow(); return; }
    var spb = t.closest("[data-svp]"); if (spb) { svP = +spb.dataset.svp; svpShow(); return; }
    var sab = t.closest("[data-sva]"); if (sab) { svA = +sab.dataset.sva; svaShow(); if (window.innerWidth < 980) $("#sva-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" }); return; }
    var sgr = t.closest("[data-svgr]"); if (sgr) { svGrp = sgr.dataset.svgr; svQ = 0; $$("[data-svgr]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === sgr)); }); svqShow(); return; }
    var sqb = t.closest("[data-svq]"); if (sqb) { svQ = +sqb.dataset.svq; svqShow(); if (window.innerWidth < 980) $("#svq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var sqm = t.closest("[data-svqm]"); if (sqm) { svQ = Math.max(0, Math.min(svList().length - 1, svQ + +sqm.dataset.svqm)); svqShow(); $("#svq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var icat = t.closest("[data-idcat]"); if (icat) { idCat = icat.dataset.idcat; $$("[data-idcat]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === icat)); }); var IC = A("idInChrist"); if (idCat !== "all" && IC[idC] && IC[idC].category !== idCat) { for (var ci = 0; ci < IC.length; ci++) if (IC[ci].category === idCat) { idC = ci; idStage = 0; break; } } idcShow(); return; }
    var icb = t.closest("[data-idc]"); if (icb) { idC = +icb.dataset.idc; idStage = 0; idcShow(); if (window.innerWidth < 980) $("#idc-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" }); return; }
    var ics = t.closest("[data-idcs]"); if (ics) { idStage = +ics.dataset.idcs; idcShow(); return; }
    if (t.closest("[data-idcn]")) { var IC2 = A("idInChrist"), nx = idC; for (var cj = 1; cj <= IC2.length; cj++) { var k2 = (idC + cj) % IC2.length; if (idCat === "all" || IC2[k2].category === idCat) { nx = k2; break; } } idC = nx; idStage = 0; idcShow(); return; }
    var igb = t.closest("[data-idg]"); if (igb) { idG = +igb.dataset.idg; idgShow(); return; }
    var ilb = t.closest("[data-idl]"); if (ilb) { idLie = +ilb.dataset.idl; idlShow(); return; }
    var isb = t.closest("[data-ids]"); if (isb) {
      var sx = A("idSorter").filter(function (y) { return y.id === isb.dataset.ids; })[0]; if (!sx) return;
      idAns[sx.id] = isb.dataset.ans; var sbox = $("#ids-" + sx.id); sbox.classList.add("answered");
      $$("[data-ids]", sbox).forEach(function (b) { b.setAttribute("aria-pressed", String(b === isb)); b.classList.toggle("right", b.dataset.ans === sx.answer); });
      var so = $(".sc-out", sbox); so.hidden = false;
      so.innerHTML = '<div class="label">' + (isb.dataset.ans === sx.answer ? "You match the study" : "The study says: " + IDS[sx.answer]) + "</div><p>" + sx.why + '</p><div class="ref">' + esc((sx.refs || []).join(" · ")) + "</div>";
      idsScore(); return;
    }
    var ily = t.closest("[data-idly]"); if (ily) { idL = +ily.dataset.idly; idlyShow(); return; }
    var ilym = t.closest("[data-idlym]"); if (ilym) { idL = Math.max(0, Math.min(A("idLayers").length - 1, idL + +ilym.dataset.idlym)); idlyShow(); return; }
    var igr = t.closest("[data-idgr]"); if (igr) { idGrp = igr.dataset.idgr; idQ = 0; $$("[data-idgr]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === igr)); }); idqShow(); return; }
    var iqb = t.closest("[data-idq]"); if (iqb) { idQ = +iqb.dataset.idq; idqShow(); if (window.innerWidth < 980) $("#idq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var iqm = t.closest("[data-idqm]"); if (iqm) { idQ = Math.max(0, Math.min(idList().length - 1, idQ + +iqm.dataset.idqm)); idqShow(); $("#idq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var pas = t.closest("[data-pas]"); if (pas) { clearInterval(paWalk); paGoStn(+pas.dataset.pas); return; }
    if (t.closest("#pa-walk")) { clearInterval(paWalk); paStn = 0; paTrav = 0; paGoStn(0); var nP = A("paPaths").length; paWalk = setInterval(function () { if (!$("#pa-path") || paStn >= nP - 1) { clearInterval(paWalk); return; } paGoStn(paStn + 1); }, reduced ? 600 : 4200); return; }
    var pak = t.closest("[data-pak]"); if (pak) { paKind = pak.dataset.pak; $$("[data-pak]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === pak)); }); var EN = A("paEncounters"); if (paKind !== "all" && EN[paEnc] && EN[paEnc].kind !== paKind) { for (var ei = 0; ei < EN.length; ei++) if (EN[ei].kind === paKind) { paEnc = ei; break; } } showEnc(); return; }
    var pen = t.closest("[data-paen]"); if (pen) { paEnc = +pen.dataset.paen; showEnc(); return; }
    var pem = t.closest("[data-paem]"); if (pem) { paEnc = Math.max(0, Math.min(A("paEncounters").length - 1, paEnc + +pem.dataset.paem)); showEnc(); return; }
    var pae = t.closest("[data-pae]"); if (pae) { paEra = pae.dataset.pae; $$("[data-pae]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === pae)); }); showPrac(); return; }
    var pac = t.closest("[data-pac]"); if (pac) { paCat = pac.dataset.pac; $$("[data-pac]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === pac)); }); showPrac(); return; }
    var pag = t.closest("[data-pag]"); if (pag) { paG = +pag.dataset.pag; paGStep = -1; showGuide(); return; }
    if (t.closest("#pa-gstart")) { paGStep = 0; showGuide(); return; }
    if (t.closest("#pa-gnext")) { paGStep++; showGuide(); return; }
    if (t.closest("#pa-gstop")) { paGStep = -1; showGuide(); return; }
    var psp = t.closest("[data-pasp]"); if (psp) { paSp = +psp.dataset.pasp; showSp(); return; }
    var pgr = t.closest("[data-pagr]"); if (pgr) { paGrp = pgr.dataset.pagr; paQ = 0; $$("[data-pagr]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === pgr)); }); paqShow(); return; }
    var pqb = t.closest("[data-paq]"); if (pqb) { paQ = +pqb.dataset.paq; paqShow(); if (window.innerWidth < 980) $("#paq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var pqm = t.closest("[data-paqm]"); if (pqm) { paQ = Math.max(0, Math.min(paList().length - 1, paQ + +pqm.dataset.paqm)); paqShow(); $("#paq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var lbb = t.closest("[data-lvb]"); if (lbb) { lvBal = +lbb.dataset.lvb; showBal(); return; }
    var lrb = t.closest("[data-lvr]"); if (lrb) { lvR = +lrb.dataset.lvr; showResp(); return; }
    var lob = t.closest("[data-lvo]"); if (lob) { var lr = A("lvRespond")[lvR]; if (lr && lvRAns[lr.id] == null) { lvRAns[lr.id] = +lob.dataset.lvo; showResp(); } return; }
    var lrm = t.closest("[data-lvrm]"); if (lrm) { lvR = Math.max(0, Math.min(A("lvRespond").length - 1, lvR + +lrm.dataset.lvrm)); showResp(); $("#lvr-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var lgb = t.closest("[data-lvg]"); if (lgb) { lvGrp = lgb.dataset.lvg; lvQ = 0; $$("[data-lvg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === lgb)); }); lvqShow(); return; }
    var lqb = t.closest("[data-lvq]"); if (lqb) { lvQ = +lqb.dataset.lvq; lvqShow(); if (window.innerWidth < 980) $("#lvq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var lqm = t.closest("[data-lvqm]"); if (lqm) { lvQ = Math.max(0, Math.min(lvList().length - 1, lvQ + +lqm.dataset.lvqm)); lvqShow(); $("#lvq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var lpb = t.closest("[data-lvp]"); if (lpb) { lvPr = +lpb.dataset.lvp; showPr(); return; }
    var cmb = t.closest("[data-cmode]"); if (cmb) { $$('[data-cmode="' + cmb.dataset.cmode + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === cmb)); }); $("#" + cmb.dataset.cmode).className = "cmp-list mode-" + cmb.dataset.m; return; }
    var vph = t.closest("[data-vph]"); if (vph) { clearInterval(vTimer); vSel = +vph.dataset.vph; showVph(); return; }
    if (t.closest("#vrs-play")) { clearInterval(vTimer); vSel = 0; showVph(); var nV = A("worVerse").length; vTimer = setInterval(function () { vSel++; if (vSel >= nV) { clearInterval(vTimer); vSel = nV - 1; } showVph(); }, reduced ? 60 : 3200); return; }
    var wpb = t.closest("[data-wp]"); if (wpb) { wPlace = +wpb.dataset.wp; showJ4(); return; }
    var wpo = t.closest("[data-wpost]"); if (wpo) { wPost = wpo.dataset.wpost; $$("[data-wpost]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === wpo)); }); showWords(); return; }
    var bab = t.closest("[data-ba]"); if (bab) { $$("[data-ba]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === bab)); }); $("#ba").className = "cmp-list mode-" + bab.dataset.ba; return; }
    var wwb = t.closest("[data-wwq]"); if (wwb) { wwQ = +wwb.dataset.wwq; wwqShow(); if (window.innerWidth < 980) $("#wwq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var wwm = t.closest("[data-wwqm]"); if (wwm) { wwQ = Math.max(0, Math.min((RG.worAllQA || []).length - 1, wwQ + +wwm.dataset.wwqm)); wwqShow(); $("#wwq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var fp = t.closest("[data-fp]"); if (fp) { fPath = fp.dataset.fp; fStep = 0; clearInterval(fTimer); showStairs(); return; }
    if (t.closest("#fp-play")) { clearInterval(fTimer); fStep = 0; showStairs(); var nS = ((RG.fgStairs || {})[fPath] || []).length; fTimer = setInterval(function () { fStep++; if (fStep >= nS) { clearInterval(fTimer); fStep = nS - 1; } showStairs(); }, reduced ? 60 : 1500); return; }
    var stb = t.closest("[data-st]"); if (stb) { clearInterval(fTimer); fStep = +stb.dataset.st; showStairs(); return; }
    var tn = t.closest("[data-tn]"); if (tn) { var nd = RG.fgTree.nodes[fNode], op = nd.options[+tn.dataset.tn]; fTrail.push({ node: fNode, q: nd.q, a: op.label }); fNode = op.next; showTree(); return; }
    if (t.closest("#tree-back")) { var last = fTrail.pop(); if (last) fNode = last.node; showTree(); return; }
    if (t.closest("#tree-restart")) { fTrail = []; fNode = RG.fgTree.start; showTree(); return; }
    var fqb = t.closest("[data-fq]"); if (fqb) { fQ = +fqb.dataset.fq; fqShow(); if (window.innerWidth < 980) $("#fq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var fqm = t.closest("[data-fqm]"); if (fqm) { fQ = Math.max(0, Math.min((RG.fgAllQA || []).length - 1, fQ + +fqm.dataset.fqm)); fqShow(); $("#fq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var feb = t.closest("[data-fe]"); if (feb) {
      var fx = A("fgEgo").filter(function (y) { return y.id === feb.dataset.fe; })[0]; if (!fx) return;
      fAns[fx.id] = feb.dataset.ans; var fbox = $("#fe-" + fx.id); fbox.classList.add("answered");
      $$("[data-fe]", fbox).forEach(function (b) { b.setAttribute("aria-pressed", String(b === feb)); b.classList.toggle("right", b.dataset.ans === fx.answer); });
      var fo = $(".sc-out", fbox); fo.hidden = false;
      fo.innerHTML = '<div class="label">' + (feb.dataset.ans === fx.answer ? "You match the study" : "The study answers: " + ({ "self-respect": "Self-respect", ego: "Ego", depends: "It depends" })[fx.answer]) + "</div><p>" + fx.why + '</p><div class="ref">' + esc((fx.refs || []).join(" · ")) + "</div>";
      feScore(); return;
    }
    var abb = t.closest("[data-ab]"); if (abb) { $$("[data-ab]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === abb)); }); $("#abm").className = "abm ab-" + abb.dataset.ab; return; }
    var dvb = t.closest("[data-dv]"); if (dvb) { var dd = A("fgDavid")[+dvb.dataset.dv]; $$("[data-dv]").forEach(function (b) { b.classList.toggle("on", b === dvb); }); $("#dv-note").innerHTML = '<div class="panel" style="animation:rise .3s both"><div class="label">' + esc(dd.ref) + " · " + esc(dd.kind) + "</div><h3>" + esc(dd.event) + "</h3><p>" + dd.note + "</p>" + (dd.lesson ? '<p class="note"><strong>Lesson:</strong> ' + dd.lesson + "</p>" : "") + "</div>"; return; }
    var apb = t.closest("[data-apo]"); if (apb) { fApo += +apb.dataset.apo; showApo(); return; }
    var ln = t.closest("[data-lane]"); if (ln) { bLane = ln.dataset.lane; $$("[data-lane]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === ln)); }); showFlow(); return; }
    if (t.closest("#flow-play")) { playFlow(); return; }
    var fn = t.closest("[data-fn]"); if (fn) { clearInterval(bFlowTimer); var fp = fn.dataset.fn.split(":"); bFlow = +fp[1]; showFlow(); flowDetail(fp[0], +fp[1]); return; }
    var bqb = t.closest("[data-bq]"); if (bqb) { bQ = +bqb.dataset.bq; bqShow(); if (window.innerWidth < 980) $("#bq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var bqm = t.closest("[data-bqm]"); if (bqm) { bQ = Math.max(0, Math.min((RG.bigAllQA || []).length - 1, bQ + +bqm.dataset.bqm)); bqShow(); $("#bq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var acb = t.closest("[data-acc]"); if (acb) { var ax = A("bigAccept").filter(function (y) { return y.id === acb.dataset.acc; })[0]; var abox = $("#acc-" + ax.id); $$("[data-acc]", abox).forEach(function (b) { b.setAttribute("aria-pressed", String(b === acb)); }); $(".acc-body", abox).innerHTML = accBody(ax, acb.dataset.at); return; }
    var glv = t.closest("[data-glv]"); if (glv) { bGlossView = glv.dataset.glv; $$("[data-glv]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === glv)); }); glossShow(); return; }
    var glg = t.closest("[data-glg]"); if (glg) { bGlossGroup = glg.dataset.glg; $$("[data-glg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === glg)); }); glossShow(); return; }
    var wg = t.closest("[data-wg]"); if (wg) { wGroup = wg.dataset.wg; $$("[data-wg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === wg)); }); wxTiles(); return; }
    var ws = t.closest("[data-wsel]"); if (ws) { wSel = ws.dataset.wsel; wxPanel(); if (window.innerWidth < 900) $("#wx-panel").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var wt = t.closest("[data-wtab]"); if (wt) { wTab = wt.dataset.wtab; wxPanel(); return; }
    var wqb = t.closest("[data-wq]"); if (wqb) { wQ = +wqb.dataset.wq; wqShow(); if (window.innerWidth < 980) $("#wq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var wqm = t.closest("[data-wqm]"); if (wqm) { wQ = Math.max(0, Math.min(A("whyQuestions").length - 1, wQ + +wqm.dataset.wqm)); wqShow(); $("#wq-card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var wcb = t.closest("[data-wc]"); if (wcb) {
      var cx = A("whyCheck").filter(function (y) { return y.id === wcb.dataset.wc; })[0]; if (!cx) return;
      wAns[cx.id] = wcb.dataset.ans; var cbox = $("#wc-" + cx.id); cbox.classList.add("answered");
      $$("[data-wc]", cbox).forEach(function (b) { b.setAttribute("aria-pressed", String(b === wcb)); b.classList.toggle("right", b.dataset.ans === cx.answer); });
      var co = $(".sc-out", cbox); co.hidden = false;
      co.innerHTML = '<div class="label">' + (wcb.dataset.ans === cx.answer ? "You match the study" : "The study answers: " + ({ healthy: "Healthy", toxic: "Toxic", depends: "It depends" })[cx.answer]) + "</div><p>" + cx.why + '</p><div class="ref">' + esc((cx.refs || []).join(" · ")) + "</div>";
      wcScore(); return;
    }
    var dl = t.closest("[data-dlg]"); if (dl) { shDialog = +dl.dataset.dlg; showDialog(false); return; }
    if (t.closest("#dlg-play")) { showDialog(true); return; }
    var shc = t.closest("[data-shc]"); if (shc) { $$("[data-shc]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === shc)); }); $("#tri").className = "tri focus-" + shc.dataset.shc; return; }
    var sht = t.closest("[data-shtag]"); if (sht) { shTag = sht.dataset.shtag; $$("[data-shtag]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === sht)); }); showRiver(); return; }
    var pr = t.closest("[data-pri]"); if (pr) { shPri = +pr.dataset.pri; showWheel(); return; }
    var scb = t.closest("[data-sc]"); if (scb) {
      var x = A("lifeScenarios").filter(function (y) { return y.id === scb.dataset.sc; })[0]; if (!x) return;
      lifeAns[x.id] = scb.dataset.ans; var box = $("#sc-" + x.id);
      $$("[data-sc]", box).forEach(function (b) { b.setAttribute("aria-pressed", String(b === scb)); b.classList.toggle("right", b.dataset.ans === x.answer); });
      box.classList.add("answered"); var o = $(".sc-out", box); o.hidden = false;
      o.innerHTML = '<div class="label">' + (scb.dataset.ans === x.answer ? "You match the study" : "The study answers: " + ({ loving: "Loving", unloving: "Not loving", depends: "It depends" })[x.answer]) + "</div><p>" + x.why + '</p><div class="ref">' + esc((x.refs || []).join(" · ")) + "</div>";
      lifeScore(); return;
    }
    var km = t.closest("[data-kmove]"); if (km) { var nE = A("kingEnemies").length; if (+km.dataset.kmove > 0 && kStep >= nE) kStep = 0; else kStep += +km.dataset.kmove; showK(); return; }
    var kg = t.closest("[data-kg]"); if (kg) { kGroup = kg.dataset.kg; $$("[data-kg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === kg)); }); kGrid(); return; }
    var mo = t.closest("[data-mo]"); if (mo) { setMO(mo.dataset.mo); return; }
    var mg = t.closest("[data-mg]"); if (mg) { mGroup = mg.dataset.mg; $$("[data-mg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === mg)); }); mGrid(); return; }
    var mv = t.closest("[data-mv]"); if (mv) { $$("[data-mv]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === mv)); }); $("#mtable").className = "cmp-list mode-" + ({ tragic: "legal", salvific: "relational", both: "both" })[mv.dataset.mv]; return; }
    if (t.closest("#ot-play")) { playOT(); return; }
    var ns = t.closest("[data-ncs]"); if (ns) { ncStage = +ns.dataset.ncs; showNC(); return; }
    var ng = t.closest("[data-ncg]"); if (ng) { ncGroup = ng.dataset.ncg; $$("[data-ncg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === ng)); }); ncList(); return; }
    var cm = t.closest("[data-cm]"); if (cm) { cmpMode = cm.dataset.cm; $$("[data-cm]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === cm)); }); cmpList(); return; }
    var cg = t.closest("[data-cg]"); if (cg) { cmpGroup = cg.dataset.cg; $$("[data-cg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === cg)); }); cmpList(); return; }
    var sc = t.closest("[data-scale]"); if (sc) { setScale(sc.dataset.scale); return; }
    var cs = t.closest("[data-case]"); if (cs) { var el2 = $("#case-" + cs.dataset.case); if (el2) el2.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return; }
    var lt = t.closest("[data-lt]"); if (lt) { loveTab = lt.dataset.lt; $$("[data-lt]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === lt)); }); $("#lovepane").innerHTML = lovePane(); lpGrid(); return; }
    var lpt = t.closest("[data-lpt]"); if (lpt) { loveTest = lpt.dataset.lpt; $$("[data-lpt]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === lpt)); }); lpGrid(); return; }
    var rv = t.closest("[data-rev]"); if (rv) { revTab = +rv.dataset.rev; $$("[data-rev]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === rv)); }); $("#revpane").innerHTML = revPane(A("revealed")[revTab]); return; }
    var ac = t.closest("[data-act]"); if (ac) { actIdx = +ac.dataset.act; showAct(); return; }
    var am = t.closest("[data-actmove]"); if (am) { var n = A("trinityActs").length; actIdx = (actIdx + +am.dataset.actmove + n) % n; showAct(); return; }
    var er = t.closest("[data-era]"); if (er) { voiceEra = er.dataset.era; $$("[data-era]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === er)); }); voiceGrid(); return; }
    var fm = t.closest("[data-fam]"); if (fm) { modelFam = fm.dataset.fam; $$("[data-fam]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === fm)); }); $("#modelgrid").innerHTML = modelGrid(); return; }
    if (t.closest("#miss-all")) { var mb = $("#miss-all"), mon = mb.getAttribute("aria-pressed") !== "true"; mb.setAttribute("aria-pressed", String(mon)); mb.textContent = mon ? "Show both sides again" : "Show the gospel side of every pair"; $$(".miss").forEach(function (m) { m.classList.toggle("lit", mon); }); return; }
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
    else if (id === "voice-q") voiceGrid();
    else if (id === "lp-q") lpGrid();
    else if (id === "nc-q") ncList();
    else if (id === "spine-r") { spine = +ev.target.value; showSpine(); }
    else if (id === "cmp-q") cmpList();
    else if (id === "rc-bal") { rcB = +ev.target.value; rcbShow(); }
    else if (id === "gl-q") glossShow();
    else if (id === "age-range") { ageIdx = +ev.target.value; showAge(); }
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
