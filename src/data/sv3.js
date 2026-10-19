window.RG = window.RG || {};
var RG = window.RG;

/* Round 14: "Why a Saviour?" part 3
   svFrom: twelve things Jesus saves us from, framed by both gospels.
   svFlow: flowchart, how each gospel meets a good, moral person.
   svPeople: six profiles and how each gospel speaks to them.
   svEvidence3: verified sources (pages seen 2026-10). */

RG.svFrom = [
  {
    id: "death-and-corruption",
    from: "Death and corruption",
    word: "φθορά (phthora), corruption, decay",
    legal: "Death is the just penalty for sin (Gen 2:17; Rom 6:23). Christ bore that penalty in our place, so believers are freed from eternal death and will be raised.",
    relational: "Athanasius saw humanity, made from nothing and turned away from the Word, sliding back toward non-being: “the race of man was perishing” (<em>On the Incarnation</em> §6). The Word took our body so that, joined to his life, it would be turned “again toward incorruption” (§8); salvation is first a rescue of our very being.",
    refs: ["Gen 2:17", "Rom 5:12", "Rom 6:23", "1 Cor 15:21-22", "1 Cor 15:54-57", "2 Tim 1:10"]
  },
  {
    id: "the-lie-about-god",
    from: "The lie about God",
    word: "ψεῦδος (pseudos), the lie",
    legal: "Sinners suppress the truth about God and exchange it for idols (Rom 1:18-25). The gospel corrects false ideas of God by revealing both his holiness and his mercy in Christ.",
    relational: "From the garden on, humanity has suspected that God is holding out on us, hard to please, or against us (Gen 3:1-5). Jesus saves us from that lie by showing the Father's real face: “He who has seen me has seen the Father” (John 14:9).",
    refs: ["Gen 3:1-5", "John 1:18", "John 8:44", "John 14:9", "Rom 1:25", "2 Cor 4:4-6", "Heb 1:3"]
  },
  {
    id: "the-lie-about-ourselves",
    from: "The lie about ourselves",
    word: "",
    legal: "We think we are better than we are; the law shows us our sin so we stop trusting our own righteousness (Rom 3:20; 7:7). Once in Christ we receive a new identity as adopted children.",
    relational: "C. Baxter Kruger describes the fallen mind as a deep sense of “I am not” (paraphrase): not loved, not accepted, not enough, not included. Jesus saves us from this lie by revealing that we were made in his image and have been adopted in him, and this lie troubles churchgoers as much as anyone (Eph 1:4-6).",
    refs: ["Gen 1:26-27", "Gen 3:7-10", "Eph 1:4-6", "Col 3:3", "1 John 3:1-2", "Gal 4:6-7"]
  },
  {
    id: "sin-as-sickness",
    from: "Sin as sickness and bondage",
    word: "ἁμαρτία (hamartia), missing the mark",
    legal: "Sin is first a breaking of God's law (1 John 3:4) that makes us guilty before him, and also a power that enslaves. Christ removes the guilt through his death and breaks sin's power through the Spirit.",
    relational: "Lexicons gloss <em>hamartia</em> as failing to hit the mark, and Paul pictures it as a power that reigns and enslaves (Rom 5:21; 6:17). Jesus came as a physician to the sick (Mark 2:17), so sin is above all a disease to be healed and a prison to be opened, and only then a debt.",
    refs: ["Mark 2:17", "John 8:34-36", "Rom 5:21", "Rom 6:6-7", "Rom 7:14-25", "1 John 3:4", "Isa 53:5"]
  },
  {
    id: "shame",
    from: "Shame",
    word: "αἰσχύνη (aischynē), shame",
    legal: "Shame is the right sense of guilt before a holy God. In Christ the believer's guilt is covered, and whoever believes on him “shall not be ashamed” (Rom 10:11, KJV).",
    relational: "Shame came straight after the fall, and the first thing Adam did was hide (Gen 3:7-10). Jesus “endured the cross, despising its shame” (Heb 12:2): he went into our shame and came out holding us, so we can stop hiding from God and from each other.",
    refs: ["Gen 2:25", "Gen 3:7-10", "Isa 54:4", "Rom 10:11", "Heb 12:2", "1 John 2:28"]
  },
  {
    id: "fear-of-death",
    from: "Fear of death",
    word: "φόβος θανάτου (phobos thanatou), fear of death",
    legal: "Fear of death is fitting for the unforgiven, because after death comes judgement (Heb 9:27). For believers that fear is removed because Christ has taken the judgement.",
    relational: "Hebrews says Jesus shared our flesh and blood so that through death he might destroy the devil and “deliver all of them who through fear of death were all their lifetime subject to bondage” (Heb 2:14-15, WEB). Much human grasping, violence and anxiety grows from this fear, and Jesus frees us by going through death and coming out alive.",
    refs: ["Heb 2:14-15", "1 Cor 15:55-57", "2 Tim 1:10", "John 11:25-26", "Rev 1:17-18"]
  },
  {
    id: "alienation-in-the-mind",
    from: "Alienation in the mind",
    word: "ἀπαλλοτριόω (apallotrioō), to estrange",
    legal: "Before conversion people are truly God's enemies, separated from him by sin, and need to be reconciled through faith in Christ's death (Col 1:21-22; Eph 2:12).",
    relational: "Paul says we were alienated and enemies “in your mind” (Col 1:21): the hostility lived on our side, not in God's heart. God was in Christ reconciling the world to himself (2 Cor 5:19), so the gospel is an appeal for us to change our minds about him: “be reconciled to God” (2 Cor 5:20).",
    refs: ["Col 1:19-22", "2 Cor 5:18-20", "Eph 2:12-16", "Eph 4:18", "Rom 5:10"]
  },
  {
    id: "the-accuser",
    from: "The accuser",
    word: "שָּׂטָן (satan), accuser; κατήγωρ (katēgōr)",
    legal: "Satan accuses believers, but his charges fail because Christ's righteousness is credited to them and Christ intercedes for them (Rom 8:33-34). The accuser's case is answered in law.",
    relational: "In Zechariah 3 the accuser stands beside Joshua the high priest in filthy clothes, and the Lord rebukes the accuser and clothes Joshua in clean garments. Revelation 12:10 says the accuser “has been thrown down”; Jesus silences the voice that tells us we are condemned, and that voice often sounds like religion.",
    refs: ["Zech 3:1-5", "Job 1:6-12", "Rev 12:10-11", "Rom 8:1", "Rom 8:33-34", "John 12:31"]
  },
  {
    id: "futility-and-decay",
    from: "Futility and decay",
    word: "ματαιότης (mataiotēs), futility, emptiness",
    legal: "Creation was cursed because of Adam's sin (Gen 3:17-19) and will be renewed when Christ returns and the redeemed are glorified.",
    relational: "Paul says creation was “subjected to vanity” in hope, and will be “delivered from the bondage of decay into the liberty of the glory of the children of God” (Rom 8:20-21, WEB). Salvation is bigger than souls escaping: in Christ the whole groaning world, bodies and all, is being brought into new creation.",
    refs: ["Gen 3:17-19", "Eccl 1:2", "Rom 8:19-23", "Col 1:20", "Rev 21:1-5"]
  },
  {
    id: "self-destruction",
    from: "Self-destruction",
    word: "παραδίδωμι (paradidōmi), to hand over",
    legal: "Romans 1 shows God's active judgement: he hands people over to their sins as a just penalty, and this present wrath anticipates the final day.",
    relational: "Three times Paul says God “gave them up” (Rom 1:24, 26, 28): wrath here looks like God letting us have what we insisted on, and sin wrecking us from the inside. Jesus saves us from the slow self-harm of sin, which is why the cure is healing and new life, not only pardon.",
    refs: ["Rom 1:24-28", "Gal 6:7-8", "Prov 8:36", "Jas 1:14-15", "Hos 13:9"]
  },
  {
    id: "religion-as-a-ladder",
    from: "Religion and law as a ladder",
    word: "παιδαγωγός (paidagōgos), guardian, child-minder",
    legal: "No one is justified by works of the law (Gal 2:16); the law shows our sin and drives us to Christ, who alone fulfilled it. Readers differ on what “works of the law” means (traditional Lutheran reading vs the New Perspective's boundary markers).",
    relational: "Paul calls the law a <em>paidagōgos</em> until Christ came (Gal 3:24-25), and he calls going back to it a return to slavery under “weak and miserable elemental principles” (Gal 4:9). Jesus saves us from trying to climb to God, because God has already come down to us and made us sons and daughters (Gal 4:4-7).",
    refs: ["Gal 2:16", "Gal 3:23-26", "Gal 4:1-9", "Gal 5:1", "Phil 3:4-9", "Rom 10:3-4"]
  },
  {
    id: "wrath",
    from: "Wrath",
    word: "ὀργή (orgē), wrath, anger",
    legal: "God's wrath is his holy, settled opposition to sin, revealed now (Rom 1:18) and coming at the judgement; whoever does not obey the Son “the wrath of God remains on him” (John 3:36). Jesus saves us from God's wrath by bearing it on the cross (Rom 5:9).",
    relational: "Wrath is real, but relational voices (e.g. Brad Jersak) read it as love's opposition to what destroys us and as the consequence of refusing mercy, shown in God “giving us over” (Rom 1:24-28), rather than a Father who must punish before he can forgive. This is debated: many evangelicals see it as weakening the cross, and the relational view answers that the cross reveals a God who absorbs our violence rather than one who needs it.",
    refs: ["Rom 1:18", "Rom 1:24-28", "Rom 5:9", "John 3:36", "1 Thess 1:10", "Eph 2:3-5"]
  }
];

RG.svFlow = {
  legal: [
    { id: "l-good-person", step: "A good, moral person", text: "They are kind, honest and generous, and most people would call them good.", kind: "start" },
    { id: "l-sinner", step: "But a sinner, in Adam and by deeds", text: "Scripture says all have sinned and fall short (Rom 3:23); in Adam all inherited a fallen nature and guilt (Rom 5:12-19), and their own sins add to it. Goodness by human standards is not holiness by God's.", kind: "claim" },
    { id: "l-under-wrath", step: "Under wrath, headed for judgement", text: "Without Christ they remain under God's just condemnation (John 3:18, 36), facing eternal punishment (Matt 25:46). Most evangelical confessions teach hell as conscious and everlasting; some hold conditional immortality.", kind: "claim" },
    { id: "l-repent-believe", step: "Must repent and believe", text: "Christ died as their substitute, bearing the penalty for sin (Isa 53:5-6; 2 Cor 5:21). They must turn from sin and trust him personally (Acts 2:38; 16:31; Rom 10:9).", kind: "claim" },
    { id: "l-decision", step: "Accept Christ or reject him", text: "The decision is often framed as urgent: today is the day of salvation (2 Cor 6:2). Reformed teaching adds that faith itself is God's gift, while Arminians stress a real, grace-enabled free choice.", kind: "decision" },
    { id: "l-saved-or-lost", step: "Saved or lost", text: "Those who believe are forgiven, justified and adopted (Rom 5:1; John 1:12). Those who refuse remain lost, and if they die without faith their state is fixed (Heb 9:27).", kind: "outcome" },
    { id: "l-live-holy", step: "Now live a holy life", text: "Saved people are called to holiness and good works, as fruit and not as the root of salvation (Eph 2:8-10; Heb 12:14). Growth comes through the Spirit, Scripture, prayer and church.", kind: "claim" },
    { id: "l-if-they-fall", step: "If they fall into sin, are they still saved?", text: "Here evangelicals divide. Reformed perseverance (Westminster 17) says true believers may fall into grievous sin for a time yet will never finally fall away; Baptist eternal security (BFM 2000 V) says much the same; Arminian and Wesleyan traditions hold that a true believer can fall away by persistent unbelief (Remonstrants, 1618), while popular preaching often blurs these into “sin and you might lose it”.", kind: "tension" },
    { id: "l-assurance-or-anxiety", step: "Assurance or anxiety", text: "At its best, this gospel gives deep assurance resting on Christ's finished work and God's promise (Rom 8:1, 38-39; John 10:28). Where it is preached as performance, many live with recurring fear about whether they are truly saved.", kind: "rest" }
  ],
  relational: [
    { id: "r-good-person", step: "A good, moral person", text: "They are kind, honest and generous, and most people would call them good.", kind: "start" },
    { id: "r-loved-included", step: "Already loved and included in Christ", text: "One died for all, therefore all died; God was in Christ reconciling the world to himself, not counting their trespasses (2 Cor 5:14-19). Before they did anything, they were held in the Son.", kind: "claim" },
    { id: "r-image-showing", step: "Their goodness is God's image showing", text: "Their kindness is not their ticket to God; it is the light that lights everyone (John 1:9) and the law written on the heart (Rom 2:14-15). The gospel honours their goodness instead of grading it.", kind: "claim" },
    { id: "r-announcement", step: "The gospel announces who God is and who they are", text: "Like Paul in Athens, we tell them the God in whom they already live and move (Acts 17:28) has made himself known in the risen Jesus (Acts 17:31). The news is about God's love and their true identity, not a moral score.", kind: "claim" },
    { id: "r-invited", step: "Invited to trust, awaken and participate", text: "Faith is waking up to what is true and trusting the Father, Son and Spirit who already love them (John 17:3). Jesus becomes Lord, not in a ritual but in a life of following.", kind: "claim" },
    { id: "r-decision", step: "Believe now, or not yet", text: "The invitation is real and the choice matters, because it shapes how they live and know God now (John 10:10). Not believing yet does not cancel God's love, but it does mean living blind to it.", kind: "decision" },
    { id: "r-life-now", step: "Union known, or still pursued", text: "If they believe, union becomes known and enjoyed: adoption felt, Spirit received, life in the church and at the table. If not yet, they are still included and still pursued by the Shepherd who seeks the one (Luke 15:4).", kind: "outcome" },
    { id: "r-transformation", step: "Changed by love, not fear", text: "Holiness grows as the fruit of being loved, not as a condition for staying loved (1 John 4:18-19; 2 Cor 3:18). Sin is still serious, because it harms them and others, but it is treated as sickness to heal, not a trapdoor.", kind: "claim" },
    { id: "r-judgement", step: "Judgement as the light of Christ", text: "Judgement is Christ's light exposing and healing all that is false (1 Cor 3:13-15; John 3:19-21). Relational voices differ here: some are hopeful universalists, some are convinced universalists (e.g. David Bentley Hart), and some hold that people can finally refuse; traditional and conditional views are held by many Christians.", kind: "tension" },
    { id: "r-rest", step: "Rest", text: "The person rests in what God has done and is doing, and joins in his work of love in the world (Matt 11:28-30; Heb 4:9-10).", kind: "rest" }
  ]
};

RG.svPeople = [
  {
    id: "kind-atheist-doctor",
    who: "The kind atheist doctor",
    description: "Works long hours healing strangers, believes in science and compassion, and sees no evidence for God. Thinks religion mostly makes people judgemental.",
    legal: "Your good works cannot earn heaven or erase your sin before a holy God; you need to repent and trust Christ, who died for your sins and rose again. The evangelical answer would add, sincerely, that God loves you and sent his Son for you.",
    relational: "The compassion you pour out is the image of the God who made you, and Jesus is what that compassion looks like in God himself. You are already loved and held in him, and the gospel invites you to know the source of the love you already practise.",
    share: "Respect their honesty and their work, and do not treat their doubts as moral failure. Ask what drew them to medicine and listen; share how Jesus heals and touches the untouchable, and be ready to talk about evidence for the resurrection if they want to. Leave the door open rather than pushing for a decision."
  },
  {
    id: "devout-other-faith",
    who: "The devout person of another faith",
    description: "Prays daily, fasts, gives to the poor and loves God as their tradition teaches them. Is wary of Christians who want to “convert” them.",
    legal: "Sincere devotion cannot save, because there is salvation in no other name (Acts 4:12); they need to hear and believe the gospel of Jesus. Evangelicals differ on how God judges those who never clearly heard (exclusivism vs inclusivism).",
    relational: "God has not been absent from their search; like Paul in Athens, we can say the God they reach for is near (Acts 17:23-28), and like Cornelius their prayers are seen (Acts 10:4). We share Jesus as the fullest face of God, because he is good news for them too, not as a rival tribe's god.",
    share: "Learn about their faith from them, and honour what is true and beautiful in it without pretending all paths say the same thing. Share your own story of knowing Jesus, read a Gospel story together if they are open, and never use their hospitality or need as leverage."
  },
  {
    id: "moral-agnostic-activist",
    who: "The moral agnostic activist",
    description: "Fights for justice, the poor and the planet, and finds the church often on the wrong side. Unsure whether God exists.",
    legal: "Social justice cannot fix the deepest problem, which is sin against God; without the new birth even good causes cannot save. Many evangelicals would also affirm that care for the poor flows from the gospel (BFM 2000 XV).",
    relational: "Your hunger for justice echoes the God of the prophets and of Jesus, who announced good news to the poor and freedom to the oppressed (Luke 4:18). The kingdom of God is the world set right in love, and you are invited to know the King whose heart is already moving yours.",
    share: "Admit where the church has failed and stand with them in good causes without an agenda. Talk about Jesus's kingdom and the cross as God siding with victims and breaking the cycle of violence. Let love be the proof, and speak when they ask why you do it."
  },
  {
    id: "hurting-addict",
    who: "The hurting addict",
    description: "Caught in a cycle of using, shame and relapse, often with deep wounds underneath. Has heard plenty of judgement already.",
    legal: "Christ can forgive every sin and break the power of addiction; you must repent, turn to him, and be born again. Many evangelical recovery ministries (e.g. Celebrate Recovery) pair this with community and practical steps.",
    relational: "You are not your addiction; you are a beloved child whom Jesus came to heal, not to shame (Mark 2:17). He meets you in the pit as a physician and brother, and healing comes as love, truth, community and often professional care work together over time.",
    share: "Lead with presence, not lectures, and never make love conditional on staying clean. Encourage professional treatment and recovery groups, and take safety seriously: in a crisis, help them reach local emergency services. Relapse is not the end of the story; keep showing up."
  },
  {
    id: "burnt-out-churchgoer",
    who: "The burnt-out churchgoer afraid of hell",
    description: "Raised in church, has prayed the sinner's prayer many times, and still fears they are not really saved. Exhausted by trying to be good enough.",
    legal: "Assurance rests on Christ's finished work, not on feelings or performance (Rom 8:1; 1 John 5:13). Reformed and Baptist teaching say a true believer will be kept by God, and Arminian teaching says the believer who keeps trusting is secure; repeatedly re-praying a prayer is not what Scripture asks.",
    relational: "You were never on probation: the Father's love for you was settled in Christ before you prayed anything (Eph 1:4-6). Your fear comes from a lie about God, and Jesus shows a Father who runs to the son, not one waiting to trip you up (Luke 15:20).",
    share: "Be gentle; they may carry religious trauma and need rest more than another sermon. Read texts like Luke 15, Romans 8 and 1 John 4:18 together and let them ask hard questions without fear. Suggest a trusted counsellor if the anxiety is severe."
  },
  {
    id: "good-religious-person",
    who: "The good religious person who thinks they do not need grace",
    description: "Faithful in attendance, moral and respected, and quietly sure they are better than most. Thinks grace is for the really bad people.",
    legal: "All have sinned and fall short (Rom 3:23); even our righteousness is like filthy rags (Isa 64:6), so they need grace as much as anyone. The law is meant to show them that.",
    relational: "Grace is not a rescue for bad people only; it is the very life of God shared with every person, and no one gets to God by climbing. Like the elder brother in Luke 15, they can be in the house and still miss the Father's joy, and the gospel invites them to the feast, not to a ranking.",
    share: "Do not shame them, because shame is not how Jesus wins elder brothers. Ask questions about joy, rest and love rather than arguing about rules, and share how grace freed you. Point to Jesus's welcome of sinners and to Philippians 3, where Paul counts his own record as loss beside knowing Christ."
  }
];

RG.svEvidence3 = [
  {
    text: "“For this cause, then, death having gained upon men, and corruption abiding upon them, the race of man was perishing; the rational man made in God's image was disappearing, and the handiwork of God was in process of dissolution.”",
    source: "Athanasius, On the Incarnation of the Word, §6 (NPNF trans., New Advent)",
    url: "https://www.newadvent.org/fathers/2802.htm"
  },
  {
    text: "The Word gave his body to death “in the stead of all” so that “whereas men had turned toward corruption, He might turn them again toward incorruption, and quicken them from death by the appropriation of His body and by the grace of the Resurrection.”",
    source: "Athanasius, On the Incarnation of the Word, §8 (New Advent)",
    url: "https://www.newadvent.org/fathers/2802.htm"
  },
  {
    text: "Athanasius quotes Heb 2:14-15 and then says: “For by the sacrifice of His own body, He both put an end to the law which was against us, and made a new beginning of life for us, by the hope of resurrection which He has given us.” Note that he joins a legal image and a life-giving image.",
    source: "Athanasius, On the Incarnation of the Word, §10 (New Advent)",
    url: "https://www.newadvent.org/fathers/2802.htm"
  },
  {
    text: "σώζω (sōzō): “To save, to rescue, to deliver, to heal, to preserve”; KJV renders it also “be (make) whole”, and Thayer lists uses for one “suffering from disease, to make well, heal, restore to health” (Matt 9:22; Mark 5:34; 10:52).",
    source: "Bible Hub, Strong's Greek 4982, with Thayer's Lexicon",
    url: "https://biblehub.com/greek/4982.htm"
  },
  {
    text: "σωτηρία (sōtēria): “rescue or safety (physically or morally)”; KJV renders it “deliver, health, salvation, save, saving”.",
    source: "Bible Hub, Strong's Greek 4991",
    url: "https://biblehub.com/greek/4991.htm"
  },
  {
    text: "ἁμαρτία (hamartia): Thayer gives “a failing to hit the mark”, and describes Paul's picture of sin “as a power exercising dominion over men” (Rom 5:21; 6:12-14).",
    source: "Bible Hub, Strong's Greek 266, with Thayer's Lexicon",
    url: "https://biblehub.com/greek/266.htm"
  },
  {
    text: "Those whom God has accepted in his Beloved “can neither totally nor finally fall away from the state of grace, but shall certainly persevere therein to the end”; yet they may “fall into grievous sins; and, for a time, continue therein”.",
    source: "Westminster Confession of Faith, ch. 17.1 and 17.3 (OPC text)",
    url: "https://www.opc.org/wcf.html"
  },
  {
    text: "“All true believers endure to the end… Believers may fall into sin through neglect and temptation… yet they shall be kept by the power of God through faith unto salvation.”",
    source: "Southern Baptist Convention, Baptist Faith and Message 2000, Article V",
    url: "https://bfm.sbc.net/bfm2000/"
  },
  {
    text: "The fifth Remonstrant article (1610) left open whether believers can fall away (“that must be more particularly determined out of the Holy Scriptures”); by 1618 the Remonstrants held that a true believer can fall from faith and perish.",
    source: "Five Articles of Remonstrance, Article 5 (Schaff, Creeds of Christendom, as quoted on Wikipedia)",
    url: "https://en.wikipedia.org/wiki/Five_Articles_of_Remonstrance"
  }
];
