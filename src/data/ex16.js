window.RG = window.RG || {}; var RG = window.RG;
RG.studies = RG.studies || {};

/* Round 56: three shared articles (authors omitted), verified and woven into related studies:
   Hebrews 9:22, blood and the forgiveness words → Lamb of the free;
   the sheep and the goats (Matt 25) → That all shall be saved?;
   “I am the way, the truth and the life” → Included in Christ */
(function () {
  function addTo(id, blocks, qa, beforeType) {
    var S = RG.studies[id]; if (!S) return;
    var at = S.blocks.findIndex(function (b) { return b.type === (beforeType || "quiz"); });
    Array.prototype.splice.apply(S.blocks, [at < 0 ? S.blocks.length : at, 0].concat(blocks));
    if (qa) S.qa.push.apply(S.qa, qa);
  }

  /* 1. Hebrews 9:22, the blood and the forgiveness words */
  addTo("lamb", [
    { type: "layers", nav: "Hebrews 9 in context", title: "Hebrews 9, read in order", note: "“Without the shedding of blood there is no remission” is often quoted alone. Read it inside its chapter. Tap a ring, or press play.", center: "The better blood", play: "Read the chapter",
      steps: [
        { label: "The old tent and its furniture", tag: "9:1–10", text: "The tabernacle, lampstand, table, altar of incense and ark: gifts and sacrifices that “cannot perfect the conscience of the worshipper”.", ref: "Heb 9:1–10" },
        { label: "Christ’s own blood", tag: "9:11–12", text: "Christ entered the true holy place “by means of his own blood, thus securing an eternal redemption”.", ref: "Heb 9:11–12" },
        { label: "The conscience cleansed", tag: "9:14", text: "The blood of Christ will “purify our conscience from dead works to serve the living God”. The goal is a cleansed inner awareness, not a changed God.", ref: "Heb 9:14; 10:22" },
        { label: "Covenant and vessels sprinkled", tag: "9:18–21", text: "Moses sprinkled the book, the people, the tent and “all the vessels used in worship” with blood.", ref: "Heb 9:18–21; Exod 24:6–8" },
        { label: "“No remission”", tag: "9:22", text: "“Under the law almost everything is purified with blood, and without the shedding of blood there is no remission (aphesis).” The words “of sins” are not in the Greek; some translations add them.", ref: "Heb 9:22" },
        { label: "Sin put away", tag: "9:26–28", text: "Christ appeared once “to put away sin by the sacrifice of himself”, and will appear a second time “not to deal with sin but to save”.", ref: "Heb 9:26–28" },
        { label: "Sacrifices not desired", tag: "10:5–10", text: "“Sacrifices and offerings you have not desired, but a body have you prepared for me… I have come to do your will.”", ref: "Heb 10:5–10; Ps 40:6–8" }
      ] },
    { type: "words", nav: "Forgiveness words", title: "The four Greek words for forgiveness and release", note: "English “forgive” and “remission” hide several different Greek words. Reading each in its own sense removes much confusion about blood and forgiveness.",
      items: [
        { word: "aphesis", lang: "Greek", gloss: "release, sending away, liberty, remission", meaning: "The noun. Jesus came “to proclaim liberty (aphesis) to the captives… to set at liberty (aphesis) those who are oppressed” (Luke 4:18). Also “remission” in Heb 9:22 and “forgiveness” in Eph 1:7. Its heart is release from bondage.", ref: "Luke 4:18; Heb 9:22; Eph 1:7; Acts 2:38" },
        { word: "aphiēmi", lang: "Greek", gloss: "to send away, let go, release, forgive", meaning: "The verb behind most of Jesus’ “forgive”: “Son, your sins are forgiven” (Mark 2:5); “Father, forgive them” (Luke 23:34); “forgive us our debts” (Matt 6:12). It is also used for leaving nets or letting someone go.", ref: "Mark 2:5; Matt 6:12; Luke 23:34; Mark 1:18" },
        { word: "apoluō", lang: "Greek", gloss: "to set free, untie, dismiss, release", meaning: "“Release (apoluete), and you will be released” (Luke 6:37). Used for releasing prisoners and for sending a crowd home. Forgiveness as setting someone free.", ref: "Luke 6:37; Luke 13:12; Matt 27:15" },
        { word: "charizomai", lang: "Greek", gloss: "to give freely, show grace, forgive as a gift", meaning: "From charis, grace. “Having forgiven (charisamenos) us all our trespasses” (Col 2:13); “forgiving one another, as God in Christ forgave you” (Eph 4:32). Forgiveness as a gracious gift freely given.", ref: "Col 2:13; Eph 4:32; Luke 7:42–43" },
        { word: "hamartia / hamartiai", lang: "Greek", gloss: "sin (a power) / sins (acts)", meaning: "Paul often speaks of “sin” in the singular as a power that reigns and deceives (Rom 5:21; 6:12; 7:11), distinct from particular sins (plural). People commit sins out of a deeper condition.", ref: "Rom 5:21; 6:12–14; 7:11; 1 John 1:9" },
        { word: "syneidēsis", lang: "Greek", gloss: "conscience: “knowing-with”", meaning: "From syn (with) + eidō (to know); the Latin conscientia is likewise con (with) + scire (to know), the root of “conscience” and “consciousness”. Hebrews says Christ’s blood cleanses it (9:14).", ref: "Heb 9:14; 10:2, 22" }
      ] },
    { type: "compare", nav: "Checking the claims", title: "Checking the claims about blood, sin and the cross", note: "Each claim compared with the Greek and the text. Tap a topic.", labels: ["The claim", "Verdict", "What the text shows"],
      items: [
        { topic: "“Of sins” is added to Heb 9:22", cols: ["The words “of sins” are not in Hebrews 9:22.", "Accurate.", "The Greek ends “ou ginetai aphesis” (“there is no remission”). Some modern versions add “of sins” for clarity."] },
        { topic: "Heb 9:22 is only about tabernacle furniture", cols: ["In context it refers to cleansing the tabernacle and its furnishings.", "Partly.", "Verses 18–22 speak of the covenant, the people and the vessels. But the chapter goes on to Christ putting away sin (9:26) and bearing the sins of many (9:28). The context is the old covenant system as a whole."] },
        { topic: "Conscience and consciousness share a root", cols: ["Both mean “to know” and refer to heart awareness.", "Accurate.", "Syneidēsis (“knowing with”) and Latin conscientia both come from words for knowing. Hebrews places the cleansing in the conscience (9:14)."] },
        { topic: "Golgotha, the place of the skull", cols: ["The place of the skull dealt with the lies we believed.", "The name is right; the meaning is an allegory.", "Golgotha is Aramaic for “skull” (Matt 27:33; John 19:17). Reading it as the place where the mind’s lies were dealt with is a devotional picture, not the word’s meaning."] },
        { topic: "Resurrection means “discovery of spiritual truth”", cols: ["The word resurrection means discovering truth.", "Not the meaning.", "Anastasis means “standing up again”, rising. The resurrection does reveal truth (Rom 1:4), but that is its effect, not the word’s meaning."] },
        { topic: "Sin means “mistaken identity”", cols: ["The Greek word for sin means mistaken identity.", "Not in the lexicons.", "Hamartia means missing the mark, failing, wrongdoing. “Mistaken identity” is a popular devotional reading (often from a speculative etymology), not a lexical meaning. That identity lies behind behaviour is a fair theological point (Rom 6:11)."] },
        { topic: "“It is finished”: “it” means autos", cols: ["The “it” is G846 autos, meaning the baffling wind or lie of self.", "Not in the text.", "John 19:30 is one Greek word, tetelestai, “it has been completed”. There is no separate “it” and no autos in the verse. Autos (G846) means “self, he, the same”; it never means “baffling wind” or “lie”."] },
        { topic: "Aramaic: “sin” in John 1:29 means ignorance", cols: ["In Aramaic, “takes away the sin of the world” uses a word meaning ignorance.", "Not supported.", "The Syriac Peshitta uses ḥṭīthā, the ordinary word for sin. The Greek original has hamartia."] },
        { topic: "One forgiveness word means “Father not being offended”", cols: ["One Greek word denotes the Father not being offended.", "Not as stated.", "None of the four words means “not offended”. Charizomai means to give freely, to forgive as a gift. The point that forgiveness flows from love, not from appeasement, is supported elsewhere (Rom 5:8; 2 Cor 5:19)."] },
        { topic: "People were healed and forgiven before the cross", cols: ["Healing, blessing and forgiveness came before the cross.", "Accurate.", "Jesus forgave (Mark 2:5; Luke 7:48), healed and blessed throughout his ministry, showing the Father’s heart before Calvary."] }
      ] },
    { type: "flow", nav: "From sin to sins", title: "Sin, sins and identity", note: "Why people act out of who they believe they are. Press play.",
      steps: [
        { label: "Made in his image", tag: "True identity", text: "Humanity was made in God’s image and chosen in Christ before the world began.", ref: "Gen 1:26–27; Eph 1:4" },
        { label: "The lie believed", tag: "Sin as a power", text: "The serpent’s lie about God and ourselves took root; sin “deceived me and through it killed me”.", ref: "Gen 3:1–5; Rom 7:11" },
        { label: "Acting out the lie", tag: "Sins as acts", text: "We act like the person we believe we are, so a false identity produces sins and an up-and-down spiritual life.", ref: "Prov 23:7; Rom 7:15–20" },
        { label: "The cross exposes", tag: "The veil torn", text: "The cross exposed the lies, disarmed the powers and tore the veil.", ref: "Col 2:15; Matt 27:51; 2 Cor 3:16" },
        { label: "The resurrection reveals", tag: "The truth of who we are", text: "Raised with Christ, we learn to “reckon” ourselves alive to God, and the Spirit witnesses that we are children.", ref: "Rom 6:4, 11; Rom 8:16" },
        { label: "Freedom from sins", tag: "Release", text: "Forgiven and released (aphesis), we are set free from sin’s power and grow out of its acts.", ref: "Luke 4:18; Rom 6:14; Titus 2:11–12" }
      ] }
  ], [
    { id: "heb922", q: "Does Hebrews 9:22 say God needed blood before he could forgive sins?", short: "Hebrews 9:22 says that “under the law almost everything is purified with blood, and without the shedding of blood there is no remission (aphesis)”. The words “of sins” are not in the Greek. The verse describes the old covenant’s system of purification, which Hebrews says God did not ultimately desire (10:5–8). Christ’s blood cleanses our conscience (9:14) and puts sin away (9:26). It purifies us; it does not change God’s mind toward us.",
      sections: [{ title: "Fair note", body: ["Several popular claims tied to this teaching do not hold up: “sin” does not mean “mistaken identity” in the lexicons; “it is finished” is one Greek word with no autos; and the Aramaic of John 1:29 uses the ordinary word for sin. The main point, that forgiveness flows from love, stands on firmer ground (Rom 5:8; 2 Cor 5:19)."] }], refs: ["Heb 9:14, 22, 26", "Heb 10:5–8", "Luke 4:18", "Col 2:13"] }
  ], "args");

  /* 2. The sheep and the goats */
  addTo("allsaved", [
    { type: "layers", nav: "The sheep and the goats", title: "The sheep and the goats (Matthew 25:31–46), phrase by phrase", note: "A parable full of images. Tap a ring, or press play.", center: "The King", play: "Walk through the parable",
      steps: [
        { label: "“When the Son of Man comes in his glory”", tag: "25:31", text: "Most read this as Christ’s return. Others read it as fulfilled in AD 70, or as Christ revealed in his people now. The imagery comes from Daniel 7:13–14.", ref: "Matt 25:31; Dan 7:13–14; Matt 16:27–28" },
        { label: "“All the nations gathered”", tag: "25:32", text: "Ta ethnē: the nations, the Gentiles. The King separates them “as a shepherd separates the sheep from the goats”.", ref: "Matt 25:32; Ezek 34:17" },
        { label: "“I was hungry and you gave me food”", tag: "25:35–40", text: "The test is mercy to “the least of these my brothers”. Neither group knew they had met the King.", ref: "Matt 25:35–40; Prov 19:17" },
        { label: "“The fire prepared for the devil and his angels”", tag: "25:41", text: "Not prepared for people. Fire in Scripture often purifies (Mal 3:2–3).", ref: "Matt 25:41; Mal 3:2–3; 1 Cor 3:13–15" },
        { label: "“Kolasis aiōnios”", tag: "25:46", text: "Kolasis was used of pruning and corrective punishment; aiōnios means “of the age” or eternal. Readers differ on whether it is endless or age-long correction.", ref: "Matt 25:46; 1 John 4:18" },
        { label: "“Life of the age”", tag: "25:46", text: "Zōē aiōnios: the life of the age to come, which John says begins now in knowing God.", ref: "Matt 25:46; John 17:3" }
      ] },
    { type: "words", nav: "Words in Matthew 25", title: "Key words in the parable", note: "Words that shape how the parable is read.",
      items: [
        { word: "synteleia tou aiōnos", lang: "Greek", gloss: "the completion or consummation of the age", meaning: "Not “the end of the world” but the end of an age (Matt 13:39–40; 24:3; 28:20). Some read it as the climax of the old covenant age; most as Christ’s final return.", ref: "Matt 24:3; 28:20; Heb 9:26" },
        { word: "kolasis", lang: "Greek", gloss: "pruning, correction, punishment", meaning: "Originally used for pruning trees. Aristotle distinguished kolasis (for the good of the one punished) from timōria (for the satisfaction of the one punishing). In 1 John 4:18 it is translated “punishment”.", ref: "Matt 25:46; 1 John 4:18" },
        { word: "aiōnios", lang: "Greek", gloss: "of the age, age-long, eternal", meaning: "From aiōn, age. It describes God (“the eternal God”, Rom 16:26) and the age to come. Interpreters differ on whether in 25:46 it means endless or belonging to the age to come.", ref: "Matt 25:46; Rom 16:26; Jude 7" },
        { word: "eriphos / probaton", lang: "Greek", gloss: "young goat / sheep", meaning: "Ezekiel 34 already pictures God judging “between sheep and sheep, between rams and male goats”, against those who pushed the weak aside.", ref: "Ezek 34:17–22" }
      ] },
    { type: "compare", nav: "Four readings of Matthew 25", title: "Four ways Christians read the sheep and the goats", note: "Tap a topic.", labels: ["Final judgment", "Fulfilled in AD 70", "Corrective (universalist)", "Inner and allegorical"],
      items: [
        { topic: "When", cols: ["At Christ’s return.", "The judgment on Jerusalem and the nations in that generation (24:34).", "At the end of the age, with a purifying purpose.", "Now, as Christ is revealed in a people."] },
        { topic: "Who the sheep and goats are", cols: ["Those who did and did not show mercy, revealing their faith.", "Those who received or rejected Christ’s messengers then.", "All people; “goat thinking” is burned away.", "Two ways of thinking and living within people."] },
        { topic: "The fire", cols: ["Final, unending judgment.", "Historical judgment.", "A cleansing fire that lasts until its work is done.", "The refining fire of God’s word within."] },
        { topic: "Strength", cols: ["The traditional, plain reading.", "Takes “this generation” seriously.", "Fits kolasis as correction and God’s love.", "Applies the parable personally."] },
        { topic: "Weakness", cols: ["Hard to fit with God’s heart for restoration.", "Less obvious for “all the nations”.", "Aiōnios in 25:46 describes both outcomes.", "Can lose the parable’s call to practical mercy."] }
      ] },
    { type: "cards", nav: "Checking the claims", title: "Checking the claims", note: "Tap any.",
      items: [
        { title: "“Everlasting” means age-long", text: "Partly. Aiōnios can mean “of the age”, and kolasis is correctional, but many scholars read 25:46 as endless. It is a real debate; see “Three views of hell” above.", ref: "Matt 25:46" },
        { title: "Translations that render it as correction", text: "Accurate. Some literal and paraphrase translations render 25:46 as age-during correction or chastening, but most standard versions say “eternal punishment”.", ref: "Matt 25:46" },
        { title: "“The end is like the beginning”", text: "Isaiah 46:10 says God declares the end from the beginning, meaning he foretells and accomplishes his purpose. It does not say the end will be like the beginning, though Scripture does picture a restored creation (Rev 21–22).", ref: "Isa 46:10; Rev 21:1–5" },
        { title: "A victorious eschatology", text: "Well supported as a hope: “the earth will be filled with the knowledge of the glory of the LORD as the waters cover the sea.” God’s counsel will stand.", ref: "Hab 2:14; Isa 11:9; Isa 46:10" },
        { title: "The parable is not about heaven and torment", text: "The text speaks of “eternal life” and “kolasis aiōnios”, not heaven and torment directly. Its main thrust is that how we treat the least is how we treat the King.", ref: "Matt 25:40, 45" },
        { title: "Literal and allegorical", text: "Jesus spoke in parables, and Paul read history allegorically too (Gal 4:24). But allegory is best used alongside the plain sense, not instead of it.", ref: "Matt 13:34–35; Gal 4:24" }
      ] },
    { type: "flow", nav: "The parable lived", title: "What the parable asks of us now", note: "Whatever view of the end you hold, the King is met in the least. Press play.",
      steps: [
        { label: "See the King in the least", tag: "Recognition", text: "“As you did it to one of the least of these my brothers, you did it to me.”", ref: "Matt 25:40" },
        { label: "Feed, welcome, clothe", tag: "Practical mercy", text: "Hunger, thirst, strangers, nakedness, sickness, prison: six ordinary needs.", ref: "Matt 25:35–36; Jas 2:15–17" },
        { label: "Let goat thinking burn", tag: "Inner change", text: "Self-centred thinking that ignores the needy is refined away by God’s word and Spirit.", ref: "Heb 4:12; Mal 3:2–3" },
        { label: "Live from hope", tag: "A victorious end", text: "The end God declared is a world filled with his glory. Live toward it.", ref: "Hab 2:14; Rev 21:5" }
      ] }
  ], [
    { id: "sheepgoats", q: "Is the parable of the sheep and goats about eternal torment?", short: "The parable’s main point is that how we treat “the least of these” is how we treat the King (Matt 25:40, 45). Its final verse speaks of kolasis aiōnios, which can mean “eternal punishment” or “age-long correction” (kolasis was used of pruning; aiōnios means “of the age”). Christians read it as final judgment, as fulfilled in AD 70, as corrective judgment that ends when its work is done, or allegorically of an inner process. The fire is “prepared for the devil and his angels”, not for people.",
      sections: [{ title: "Fair note", body: ["Isaiah 46:10 (“declaring the end from the beginning”) is about God foretelling and accomplishing his purpose, not literally that the end mirrors the beginning; the hope of a restored creation rests on texts like Revelation 21–22 and Habakkuk 2:14."] }], refs: ["Matt 25:31–46", "Ezek 34:17–22", "Hab 2:14", "Isa 46:10"] }
  ]);

  /* 3. “I am the way, the truth and the life” */
  addTo("inclusion", [
    { type: "layers", nav: "The way, the truth, the life", title: "“I am the way, the truth, and the life” in Jewish ears", note: "John 14:6, heard as a first-century Jewish rabbi’s claim. Tap a ring, or press play.", center: "I am", play: "Hear it again",
      steps: [
        { label: "A crowded world of paths", tag: "The setting", text: "Sadducees, Pharisees, Essenes, the schools of Hillel and Shammai: each with a method and a confident answer. Jesus steps forward not as one more road, but as the road itself.", ref: "John 14:6; Acts 23:6–8" },
        { label: "The Way: derech, halakhah", tag: "A road you walk", text: "Derech is a road; halakhah, from halakh, “to walk”, is how one walks in God’s ways. Before they were called Christians, the believers were called people of the Way.", ref: "Acts 9:2; 19:9; 24:14; Ps 119:1" },
        { label: "The Truth: emet", tag: "What holds your weight", text: "Emet comes from the root ’aman, firm and reliable. Not information to verify but a Person who will not give way beneath you.", ref: "Ps 31:5; Isa 7:9; John 1:14" },
        { label: "The Life: chayyim", tag: "Always plural", text: "Chayyim is a plural noun in Hebrew, as though life were too large for the singular. Not survival, but the abundance God intended.", ref: "Deut 30:19; John 10:10" },
        { label: "“No one comes to the Father except through me”", tag: "The way home", text: "Not a doorman announcing who is turned away, but a Son who knows the way home because he came from there. “Whoever has seen me has seen the Father.”", ref: "John 14:6–9; John 1:18" },
        { label: "Healing, not burning", tag: "His mission and ours", text: "“God did not send his Son into the world to condemn the world.” His followers are sent to restore what was broken.", ref: "John 3:17; Luke 9:56; John 20:21" }
      ] },
    { type: "compare", nav: "Two ways to hear John 14:6", title: "Two ways to hear John 14:6", note: "Tap a topic.", labels: ["As a door that shuts out", "As a Son who leads home"],
      items: [
        { topic: "Tone", cols: ["A warning: only some get in.", "An invitation: “I am going to prepare a place for you… I will come again and take you to myself” (14:2–3)."] },
        { topic: "Context", cols: ["Read alone, as a rule of exclusion.", "Spoken to troubled disciples: “Let not your hearts be troubled” (14:1)."] },
        { topic: "What “through me” means", cols: ["Only those who say the right prayer.", "All who come to the Father come by the Son, who has already come to us and included us (Eph 2:18; 2 Cor 5:19)."] },
        { topic: "What it shows about God", cols: ["A God behind a locked door.", "A Father whose face is seen in Jesus (14:9)."] },
        { topic: "What both agree", cols: ["Jesus is the only way to the Father (Acts 4:12).", "Jesus is the only way to the Father: the question is how wide his way reaches (John 12:32)."] }
      ] }
  ], [
    { id: "way", q: "Is John 14:6 a statement of exclusion?", short: "In context, Jesus is comforting troubled disciples: he is going to prepare a place and will bring them home (14:1–3). In Jewish ears, “the way” (derech, halakhah, a path you walk), “the truth” (emet, what is firm and reliable) and “the life” (chayyim, abundant life) present Jesus not as one more rabbi with one more road, but as the road itself. “No one comes to the Father except through me” means the way home runs through the Son who came from the Father and shows his face. Christians agree Jesus is the only way; they differ on how wide that way reaches.",
      sections: [{ title: "Word notes", body: ["Derech = road, way; halakhah = “walking”, from halakh. Emet is from ’aman, firm. Chayyim is grammatically plural. The early believers were called “the Way” (Acts 9:2)."] }], refs: ["John 14:1–9", "Acts 9:2", "John 3:17", "John 10:10"] }
  ]);
})();
