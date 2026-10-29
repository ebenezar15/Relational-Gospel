window.RG = window.RG || {}; var RG = window.RG;
RG.studies = RG.studies || {};

/* Round 35: short teaching notes (uploaded essays) woven into related studies; author and dates removed */
(function () {
  function addTo(id, blocks, qa, beforeType) {
    var S = RG.studies[id]; if (!S) return;
    var at = S.blocks.findIndex(function (b) { return b.type === (beforeType || "quiz"); });
    Array.prototype.splice.apply(S.blocks, [at < 0 ? S.blocks.length : at, 0].concat(blocks));
    if (qa) S.qa.push.apply(S.qa, qa);
  }

  /* 1. What is God like? → Scripture misused */
  addTo("misuse", [
    { type: "cards", nav: "What is God like?", title: "What is God like? Look at Jesus", note: "Every tradition, culture and era paints God differently: through upbringing, experience, education, films, myths and religions. Scripture gives one sure picture: Jesus, the exact representation of God’s nature. Here is what he showed us.",
      items: [
        { title: "How God responds to sin and sinners", text: "He eats with them, touches them, forgives them and calls them home.", ref: "Luke 15:1–2; John 8:10–11" },
        { title: "How God responds to anger and enemies", text: "He prays for those who crucify him and tells us to love our enemies.", ref: "Luke 23:34; Matt 5:44–45" },
        { title: "God serves, not controls", text: "He came not to be served but to serve, and washed his disciples’ feet.", ref: "Mark 10:45; John 13:3–5" },
        { title: "God loves unconditionally", text: "While we were still sinners, Christ died for us.", ref: "Rom 5:8; 1 John 4:9–10" },
        { title: "God forgives", text: "“Your sins are forgiven”: freely, before payment, with joy.", ref: "Mark 2:5; Luke 7:47–50" },
        { title: "What God’s kingdom is like", text: "Good news to the poor, freedom for captives, healing for the sick.", ref: "Luke 4:18–19; Matt 11:4–5" },
        { title: "What makes God angry", text: "Injustice and religion that excludes the marginalised, like money-changers in the temple court of the Gentiles.", ref: "Mark 11:15–17; Matt 23:4, 23" },
        { title: "Full of grace and truth", text: "Moved with compassion to heal a sin-sick humanity.", ref: "John 1:14–18; Matt 9:36" },
        { title: "What a human with God inside looks like", text: "Jesus also shows true humanity: loving, serving and honouring one another. True freedom is loving and serving each other.", ref: "Gal 5:13–14; 1 John 2:6" }
      ] }
  ], [
    { id: "god-like", q: "What is God like, when every tradition sees him differently?", short: "God is like Jesus. “Whoever has seen me has seen the Father” (John 14:9); “No one has ever seen God; the only Son… has made him known” (John 1:18). Earlier glimpses were real but veiled; in Jesus the Father is seen clearly. Anything that calls itself God but doesn’t look like Jesus is a false image.",
      sections: [{ title: "A simple lens", body: ["Read Scripture and answer hard questions with one test: does this look like Jesus? Ask not only “What would Jesus do?” but “What did Jesus do?”, and live like him."] }], refs: ["John 14:9", "John 1:18", "Heb 1:3", "Col 2:9"] }
  ]);

  /* 2. Works of grace → 52 lies */
  addTo("lies", [
    { type: "compare", nav: "Works of grace", title: "If it is finished, what about works?", note: "Saved by grace alone, yet created for good works. The difference is motivation: working from love and approval, not for them.", labels: ["Working for God (law)", "What Scripture says", "Working with God (grace)"],
      items: [
        { topic: "Salvation", cols: ["Earned or kept by effort.", "“By grace you have been saved through faith… not a result of works” (Eph 2:8–9).", "Jesus plus nothing: received as a gift."] },
        { topic: "Purpose", cols: ["Proving yourself.", "“We are his workmanship, created in Christ Jesus for good works” (Eph 2:10).", "Saved not by works but for works: fruit of the life within."] },
        { topic: "Power", cols: ["Your own strength.", "“I worked harder than any of them, though it was not I, but the grace of God that is with me” (1 Cor 15:10).", "Grace received so that we can labour: an unforced rhythm of grace."] },
        { topic: "Motive", cols: ["Insecurity, fear, earning approval.", "“The love of Christ controls us” (2 Cor 5:14).", "Security and love: “I don’t have to; I want to.”"] },
        { topic: "Danger", cols: ["Burnout and pride.", "“Do not grow weary in doing good” (Gal 6:9).", "Not the opposite danger either: grace is not a doorway to laziness but a springboard to fruitfulness (Titus 2:14)."] },
        { topic: "Reward", cols: ["Wages owed.", "God rewards those who diligently seek him (Heb 11:6); “your labour is not in vain” (1 Cor 15:58).", "Joyful partnership; the root is grace, the fruit is works."] }
      ] }
  ], [
    { id: "works", q: "If salvation is finished, do I have to do anything?", short: "For salvation, no: believe on the Lord Jesus. For maturity and your part in the kingdom, yes: grace empowers good works (Eph 2:10; Titus 3:14; Heb 10:24). Many New Testament verses after the cross speak of good works. The key is working from his love, not for it.",
      sections: [{ title: "Root and fruit", body: ["Grace is the root; works are the fruit. The more you understand the finished work, the more you will do, not because you have to, but because you want to."] }], refs: ["Eph 2:8–10", "1 Cor 15:10, 58", "Titus 2:14"] }
  ]);

  /* 3. Heaven and earth passing away → kingdom parables */
  addTo("parables", [
    { type: "flow", nav: "Heaven and earth pass away?", title: "Will literal heaven and earth pass away?", note: "Jesus said “heaven and earth will pass away” (Matt 24:35) and “until heaven and earth pass away, not an iota… will pass from the Law” (Matt 5:18). Read with first-century Jewish ears, “heaven and earth” could mean the temple world. Press play.",
      steps: [
        { label: "The earth remains", tag: "Old Testament", text: "“He set the earth on its foundations, so that it should never be moved”; “the earth remains forever.” Why would God’s heaven need to pass away?", ref: "Ps 104:5; Eccl 1:4" },
        { label: "Heaven and earth as covenant language", tag: "Israel and the temple", text: "Prophets used “heavens and earth” for Israel’s covenant world and its shaking.", ref: "Isa 51:15–16; Hag 2:6, 21–22; Deut 32:1" },
        { label: "The temple as a model cosmos", tag: "First-century view", text: "A Jewish historian of the time explained the tabernacle’s three parts as sea, land and heaven: the outer court the sea, the holy place the earth, the holy of holies heaven.", ref: "Exod 26:33; Heb 9:1–8" },
        { label: "Until all is fulfilled", tag: "The law’s end", text: "The law would stand until heaven and earth passed. Christ fulfilled it; the old covenant was “becoming obsolete… ready to vanish away”.", ref: "Matt 5:17–18; Heb 8:13" },
        { label: "AD 70", tag: "Their heaven and earth passed", text: "When the temple fell within that generation, the old covenant world passed away; there was no longer a place for sacrifices.", ref: "Matt 24:1–2, 34–35" },
        { label: "A new heaven and earth", tag: "Revelation 21", text: "“The first heaven and the first earth had passed away, and the sea was no more.” No outer court of continual sacrifice; cleansed once for all.", ref: "Rev 21:1; Heb 10:10–14" },
        { label: "You are the temple", tag: "God dwelling with people", text: "The new temple is not made with hands: “Do you not know that you are God’s temple?” New Adam, new bride, new Jerusalem, new temple: heaven invading earth.", ref: "1 Cor 3:16; 2 Cor 5:17; Rev 21:2–3" }
      ] }
  ], [
    { id: "heaven-earth", q: "Will literal heaven and earth pass away?", short: "Many read Jesus’ “heaven and earth will pass away” as covenant language for the temple world, which ended in AD 70 within that generation, when the old covenant system passed away. Revelation 21’s new heaven and earth is then the new covenant reality: God dwelling in his people. The physical earth remains and will be renewed.",
      sections: [{ title: "Fair note", body: ["Other Christians read these texts as describing a future cosmic renewal. Both views agree that God’s goal is a renewed creation where he dwells with his people, not the destruction of the world he loves."] }], refs: ["Matt 24:34–35", "Heb 8:13", "Rev 21:1–3", "Rom 8:21"] }
  ]);

  /* 4–6. Streams, judgment and diversity → two trees */
  addTo("trees", [
    { type: "mindmap", nav: "Many streams, one river", title: "Many streams, one river: what each tradition carries", note: "Every stream has received some truth and every stream is wrong about something. The danger is when one stream thinks it is the river. Tap a branch.", center: "One river: Jesus",
      branches: [
        { branch: "Catholic", leaves: ["The church universal", "The early fathers"] },
        { branch: "Orthodox", leaves: ["The creeds", "Resurrection and victory over death", "Union with God"] },
        { branch: "Lutheran", leaves: ["The just shall live by faith"] },
        { branch: "Reformed / Presbyterian", leaves: ["God’s majesty", "Local eldership", "A hopeful (postmillennial) outlook"] },
        { branch: "Methodist / holiness", leaves: ["God’s holiness", "Gospel outside the walls"] },
        { branch: "Baptist", leaves: ["Believer’s baptism", "Security as a son"] },
        { branch: "Arminian", leaves: ["Real choice", "Co-workers with the Spirit"] },
        { branch: "Pentecostal / charismatic", leaves: ["The Spirit’s power today", "Tongues and prophecy", "All the gifts"] },
        { branch: "Word of faith", leaves: ["The power of words", "Healing for today"] },
        { branch: "Kingdom / preterist", leaves: ["Kingdom now", "History read in covenant context"] },
        { branch: "Grace and sonship", leaves: ["Finished work", "Christ in you", "Preach to the Son in people, not the sin"] }
      ] },
    { type: "compare", nav: "Judging or loving", title: "Two trees again: judging or loving", note: "In Eden humans wanted to be like God not only in loving but in judging good and evil: deciding who is in and who is out. One theologian described the tree of life as God’s provision to share his life, and the tree of knowledge as his boundary against our overstepping.", labels: ["Tree of judging", "What is true", "Tree of life"],
      items: [
        { topic: "Focus", cols: ["Who is right and wrong; who is in and out.", "Sin is real.", "Seeing people’s worth and God’s image in them."] },
        { topic: "Effect on love", cols: ["Judging separates, and we can’t truly love someone we have judged unworthy.", "God alone judges rightly (Jas 4:12).", "Love that doesn’t question, understanding that doesn’t condemn."] },
        { topic: "The heart", cols: ["“I am not like him” (Luke 18:11).", "Everyone needs mercy.", "“God, be merciful to me, a sinner” (Luke 18:13)."] },
        { topic: "Reputation", cols: ["Known for what we are against.", "Christians do hold convictions.", "Known for outrageous love, especially for outcasts (Luke 7:34)."] },
        { topic: "Church culture", cols: ["Safe for respectable sins (gossip, greed, pride), unsafe for others.", "Holiness matters.", "A refuge for the hurting, wounded and sinners, as Jesus was."] },
        { topic: "When judged", cols: ["Judge back.", "Hurt is real.", "Smile and keep loving; judgment often reveals the judge’s own struggle (Matt 7:1–5)."] }
      ] },
    { type: "decide", nav: "Disagree, yet fellowship?", title: "Diversity in the kingdom: is this a reason to break fellowship?", note: "Believers differ on end times, hell, atonement models, Scripture’s inerrancy, gifts, church structure, politics and more. Use this flowchart before you draw a line.", start: "q1", stepLabel: "Question", endLabel: "Suggestion",
      nodes: {
        q1: { q: "Does the person confess Jesus as Lord and trust in him?", ref: "Rom 10:9; 1 Cor 12:3", options: [{ label: "Yes", to: "q2" }, { label: "No", to: "e3" }] },
        q2: { q: "Is the disagreement about the core of the faith (the Trinity, Christ’s deity, death and resurrection, salvation by grace)?", ref: "1 Cor 15:3–4", options: [{ label: "No, a secondary issue", to: "e1" }, { label: "Yes, a core issue", to: "q3" }] },
        q3: { q: "Is it causing harm or leading others away from Christ?", ref: "Gal 1:6–9; 2 Tim 2:17–18", options: [{ label: "Not clearly", to: "e2" }, { label: "Yes", to: "e4" }] },
        e1: { end: true, tone: "uni", title: "Keep fellowship; give grace", text: "End times, hell, inerrancy, gifts, church structure and politics have not been tests of fellowship in historic Christianity. Discuss, don’t throw spears. “A friend loves at all times.”", ref: "Rom 14:1–4; Eph 4:2–3; Prov 17:17" },
        e2: { end: true, tone: "gold", title: "Dialogue patiently", text: "Talk, listen and study together with humility. We are all wrong about something; growth needs challenge.", ref: "2 Tim 2:24–26; Acts 18:26" },
        e3: { end: true, tone: "uni", title: "Love as a neighbour", text: "Fellowship in Christ differs from friendship and love, which we owe to everyone. Keep loving and sharing hope.", ref: "1 Pet 3:15; Matt 22:39" },
        e4: { end: true, tone: "sep", title: "Correct gently and protect others", text: "Serious error that harms people calls for loving correction and, if needed, distance, always aiming at restoration.", ref: "Gal 6:1; Titus 3:10" }
      } }
  ], [
    { id: "streams", q: "Which denomination or stream is right?", short: "Every stream carries real truth, and every stream is wrong about something. The problem is when one stream thinks it is the river. Receive what God has given each tradition, stay teachable (“reformed and always reforming”), and above all, love.",
      sections: [{ title: "Don’t stay stuck", body: ["What you fight in one season, like Paul on the Damascus road, you may embrace in another. Holster the finger; keep learning."] }], refs: ["1 Cor 3:21–23", "Eph 4:13–16", "1 Cor 13:9–13"] },
    { id: "judge", q: "Why does judging people damage love?", short: "Judging means separating: deciding someone is out, unworthy or beneath us. We can’t do that and love them unconditionally at the same time. Only God can judge and love perfectly together. Our calling is radical love that sees every person’s worth.",
      sections: [{ title: "The Pharisee and the tax collector", body: ["One said “I am not like him”; the other said “have mercy on me”. Jesus said the second went home justified (Luke 18:9–14)."] }], refs: ["Matt 7:1–5", "Luke 18:9–14", "Jas 4:11–12"] },
    { id: "diversity", q: "Can I fellowship with believers who see things very differently?", short: "Yes. Views on end times, hell, atonement models, inerrancy, gifts, church structure and politics have not been tests of fellowship in historic Christianity. Dialogue rather than label; give each other grace on the journey.",
      sections: [{ title: "Unity without uniformity", body: ["God loves diversity; the body has many parts (1 Cor 12). Unity is in Jesus, not in agreeing on everything."] }], refs: ["Rom 14:1–13", "Eph 4:1–6", "John 17:21"] }
  ]);

  /* 7. Orphan vs son thinking → manifestation of the sons */
  addTo("sons", [
    { type: "compare", nav: "Orphan or son thinking?", title: "Orphan thinking and son thinking", note: "We are not orphans: God is the Father of every family in heaven and on earth (Eph 3:15). But we can still think like orphans. Compare eight areas.", labels: ["Orphan thinking", "Scripture", "Son thinking"],
      items: [
        { topic: "View of God", cols: ["A slave master to be feared.", "“You did not receive the spirit of slavery to fall back into fear” (Rom 8:15).", "A loving Father to be loved and enjoyed."] },
        { topic: "Theology", cols: ["Love of law.", "“Love is the fulfilling of the law” (Rom 13:10).", "The law of love."] },
        { topic: "Need for approval", cols: ["Strives for people’s praise; name-drops; needs to be noticed.", "“This is my beloved Son, with whom I am well pleased” (Matt 3:17).", "Fully accepted in the Father’s love; free from needing approval."] },
        { topic: "Self-image", cols: ["Self-rejection and jealousy from comparing.", "“Do not compare” (2 Cor 10:12; Gal 6:4).", "Affirmed; value found in identity from the Father."] },
        { topic: "Motive to serve", cols: ["To impress and get credit.", "“Not as people-pleasers, but as servants of Christ” (Eph 6:6).", "Serves from love as a representative of the family; want to, not have to."] },
        { topic: "God’s presence", cols: ["Conditional, distant, chased desperately.", "“I will never leave you nor forsake you” (Heb 13:5).", "Close and intimate; in union with the Father."] },
        { topic: "Authority", cols: ["Pain, distrust, “I need no one”.", "Jesus learned obedience through what he suffered (Heb 5:8).", "Respectful and honouring; knows healthy relationships are needed."] },
        { topic: "Money", cols: ["Owner: “my money, my stuff”.", "“The earth is the LORD’s and the fullness thereof” (Ps 24:1).", "Steward: the Father loves to share and meet needs."] }
      ] }
  ], [
    { id: "orphan", q: "What is orphan thinking, if we are already God’s children?", short: "Our identity is son or daughter: God is Father of every family (Eph 3:15) and in Christ we receive the Spirit of adoption. But we can still think like orphans: fearful, striving for approval, comparing, distrustful, possessive. Growing up as sons means letting the Father’s love renew these patterns.",
      sections: [{ title: "Sons inherit", body: ["Only sons receive an inheritance: “Ask of me, and I will make the nations your heritage” (Ps 2:8). Creation waits for mature sons (huioi) to be revealed (Rom 8:19)."] }], refs: ["Rom 8:14–19", "Gal 4:6–7", "Eph 3:14–15"] }
  ]);

  /* 8. Fear vs love → born again, still struggling */
  addTo("unfold", [
    { type: "flow", nav: "Fear or love?", title: "The opposite of fear is love", note: "We often think fear’s opposite is faith. Scripture says perfect love casts out fear, and faith works through love. Press play.",
      steps: [
        { label: "Fear removes love", tag: "The root of hate", text: "People hate, demonise and attack what they fear. Fear blocks love.", ref: "1 John 4:18" },
        { label: "Love removes fear", tag: "Perfect love", text: "“There is no fear in love, but perfect love casts out fear.”", ref: "1 John 4:18–19" },
        { label: "Faith works through love", tag: "Gal 5:6", text: "Where love is received, trust and confidence follow. A faith struggle is often a love struggle.", ref: "Gal 5:6" },
        { label: "Power, love, a sound mind", tag: "2 Tim 1:7", text: "God gives ability, love and a saved, sound mind instead of a spirit of fear.", ref: "2 Tim 1:7" },
        { label: "Love heals old fears", tag: "Memories touched", text: "When God’s love enters a fearful memory, its grip can break, sometimes affecting the body too (for example panic or breathing). Let Jesus into those places.", ref: "Ps 34:4; Isa 41:10" },
        { label: "“Fear not”", tag: "Jesus’ first words", text: "In storms, prisons and locked rooms Jesus said, “Do not be afraid.” He is love in person; that is why his faith was strong.", ref: "Mark 6:50; John 20:19–21" },
        { label: "Respond from love", tag: "Love never fails", text: "In every situation, love is the right response: it leads to redemptive solutions, not reactions from fear.", ref: "1 Cor 13:7–8" }
      ] }
  ], [
    { id: "fear-love", q: "Is the opposite of fear faith, or love?", short: "Scripture says perfect love casts out fear (1 John 4:18) and faith works through love (Gal 5:6). When we struggle to trust, it is often because we haven’t received God’s love in that area. As love enters, fear leaves and faith grows.",
      sections: [{ title: "Practice", body: ["Notice where fear rules your reactions. Ask the Father to show you his love there, perhaps in a specific memory. Respond to situations from love, not fear."] }], refs: ["1 John 4:16–19", "Gal 5:6", "2 Tim 1:7"] }
  ]);
})();
