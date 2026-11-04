window.RG = window.RG || {}; var RG = window.RG;
RG.studies = RG.studies || {};

/* Round 44: social-post contents (author omitted) verified and woven into related studies:
   sin as sickness or crime → allsaved; Augustine and Romans 5:12 → question;
   Eve and life, Gen 2–3 singular/plural → woman page (wmx); head covering → conflate */
(function () {
  function addTo(id, blocks, qa) {
    var S = RG.studies[id]; if (!S) return;
    var at = S.blocks.findIndex(function (b) { return b.type === "quiz"; });
    Array.prototype.splice.apply(S.blocks, [at < 0 ? S.blocks.length : at, 0].concat(blocks));
    if (qa) S.qa.push.apply(S.qa, qa);
  }

  /* 1. Sin: sickness to be cured or rebellion to be punished? → That all shall be saved? */
  addTo("allsaved", [
    { type: "compare", nav: "Sin: sickness or crime?", title: "Sin: a sickness to be cured, or a crime to be punished?", note: "Two pictures that shaped how the church sees judgment and hell. Scripture uses both; the question is which one leads. Tap a topic.", labels: ["Sin as sickness (healing picture)", "Sin as crime (legal picture)"],
      items: [
        { topic: "What sin is", cols: ["A wound, disease and death that has invaded humanity: “the whole head is sick” (Isa 1:5–6); “heal me, for I have sinned against you” (Ps 41:4).", "Rebellion and guilt before a lawgiver: pesha‘, “transgression”, means revolt (Isa 1:2; Rom 5:19)."] },
        { topic: "Who God is", cols: ["The Physician: “Those who are well have no need of a physician” (Mark 2:17).", "The Judge whose law has been broken (Rom 2:5–6)."] },
        { topic: "What the cross does", cols: ["Heals and gives life: “by his wounds you have been healed” (1 Pet 2:24); death is destroyed (2 Tim 1:10).", "Pays a penalty and satisfies justice (Rom 3:25–26, as read by penal views)."] },
        { topic: "The purpose of judgment", cols: ["Refining and correcting: fire that purifies gold and silver (Mal 3:2–3; 1 Cor 3:13–15).", "Retribution: giving what is deserved (Rom 2:6–9)."] },
        { topic: "Hell", cols: ["A painful remedy that aims at restoration, or the torment of resisting God’s love.", "Endless punishment of the unrepentant (Matt 25:46, as read by eternal views)."] },
        { topic: "Main voices in history", cols: ["Many Greek fathers; still the leading picture in Eastern Orthodoxy; strong in Jewish tradition.", "Developed strongly in the Latin West, especially from Augustine onward."] }
      ] },
    { type: "flow", nav: "The refiner’s fire", title: "Fire in Scripture: burning in order to heal", note: "Many of the Bible’s fire images are about purifying, not just destroying. Press play.",
      steps: [
        { label: "A refiner sits", tag: "Purpose: purity", text: "“He will sit as a refiner and purifier of silver, and he will purify the sons of Levi… that they may bring offerings in righteousness.”", ref: "Mal 3:2–3" },
        { label: "Through the fire", tag: "Tested, then restored", text: "“I will put this third into the fire, and refine them as one refines silver… They will call upon my name, and I will answer them.”", ref: "Zech 13:9; Isa 48:10" },
        { label: "Works burned, person saved", tag: "Loss, but rescue", text: "The fire tests each one’s work; if it is burned up, “he will suffer loss, though he himself will be saved, but only as through fire”.", ref: "1 Cor 3:13–15" },
        { label: "Salted with fire", tag: "A strange promise", text: "“Everyone will be salted with fire.” Salt preserves and purifies.", ref: "Mark 9:49" },
        { label: "Our God is a fire", tag: "Love that burns", text: "“Our God is a consuming fire”, the same God who “is love”. What he consumes is what destroys his beloved.", ref: "Heb 12:29; 1 John 4:8; Deut 4:24" },
        { label: "The other reading", tag: "Fair note", text: "Other texts speak of “unquenchable fire” and “eternal punishment”. Interpreters differ on whether these describe endless suffering, final destruction or an age-long correction.", ref: "Mark 9:43–48; Matt 25:46; 2 Thess 1:9" }
      ] },
    { type: "compare", nav: "Checking the claims", title: "Checking the claims about Augustine and hell", note: "Each claim compared with the sources. Tap a topic.", labels: ["The claim", "Verdict", "What the sources show"],
      items: [
        { topic: "Before Augustine, sin was mostly seen as sickness", cols: ["Sin was mainly sickness and death needing healing.", "Largely true, but simplified.", "Early writers loved the medical picture (Christ the “one Physician”, Ignatius, about AD 110; Athanasius on corruption and death). But Latin writers before Augustine (Tertullian, Cyprian) already used legal language, and Augustine himself often called Christ the physician."] },
        { topic: "The Eastern Orthodox still hold the older view", cols: ["Hell is a place of purification.", "Partly true.", "Orthodoxy frames salvation as healing and union with God, and many describe hell as experiencing God’s love as torment for those who refuse it (as in Isaac the Syrian). But official Orthodox teaching affirms eternal judgment; universal restoration is a minority hope within it."] },
        { topic: "Gehinnom lasts twelve months", cols: ["The rabbis taught the judgment of the wicked lasts twelve months (Mishnah Eduyot 2:10).", "Accurate, with a qualification.", "Mishnah Eduyot 2:10 attributes the twelve months to Rabbi Akiva. Other rabbinic texts (Talmud Rosh Hashanah 16b–17a) say a few of the very worst are punished “for ages of ages”. The main tendency is purifying and limited."] },
        { topic: "“Massa damnata”", cols: ["Augustine called humanity a “condemned mass”.", "Accurate.", "Augustine uses “massa damnata” and “massa perditionis” in several works (for example City of God 21.12; Enchiridion 27)."] },
        { topic: "Hell’s purpose was no longer to restore", cols: ["After Augustine, hell restores no one; it simply goes on forever.", "Mostly accurate for the damned.", "Augustine taught endless punishment for the damned, but he also allowed a purifying fire after death for some believers (City of God 21.13, 21.26). This later developed into the doctrine of purgatory."] },
        { topic: "“Very many” disagreed", cols: ["Augustine admitted “very many” believed hell would end (Enchiridion 112).", "Accurate.", "Enchiridion 29.112 says “very many” (quam plurimi) deny eternal punishment “from human feeling”. City of God 21.17–27 answers several merciful views held by Christians."] },
        { topic: "He was arguing against the ancient consensus", cols: ["Restoration was the ancient consensus.", "Overstated.", "There was no single consensus. Justin, Tertullian, Cyprian and Chrysostom taught eternal punishment; Clement of Alexandria, Origen and Gregory of Nyssa hoped for restoration. It was a live debate, and Augustine shows the merciful view was widespread."] },
        { topic: "Endless punishment that heals no one is sadism", cols: ["Punishment that never corrects is not justice but sadism.", "A moral argument, not a historical fact.", "It echoes Scripture’s picture of a God who “does not afflict from his heart” and disciplines “for our good” (Lam 3:31–33; Heb 12:10). Those holding eternal punishment answer that it expresses justice toward ongoing rebellion. Weigh both with humility."] }
      ] }
  ], [
    { id: "sickcrime", q: "Is sin a sickness to be healed or a crime to be punished?", short: "Scripture uses both pictures: sin is rebellion (Isa 1:2) and sickness (Isa 1:5–6; Mark 2:17). Much of the early church, and the Eastern churches today, let the healing picture lead, so judgment aims at restoration. From Augustine onward, the Latin West let the legal picture lead, so judgment became chiefly retribution. A relational reading lets Jesus decide: he came as physician to the sick, forgave his enemies, and disciplines “for our good, that we may share his holiness” (Heb 12:10).",
      sections: [{ title: "Hold with humility", body: ["Faithful Christians differ on hell. The history is more mixed than either side often claims."] }], refs: ["Mark 2:17", "Heb 12:10", "Lam 3:31–33", "Mal 3:2–3"] }
  ]);

  /* 2. Augustine, Greek and Romans 5:12 → “Don’t question God”? (history of the idea) */
  addTo("question", [
    { type: "flow", nav: "One phrase, one doctrine", title: "How one Latin phrase grew into “inherited guilt”", note: "From a schoolboy’s dislike of Greek to the damnation of unbaptised babies. Press play.",
      steps: [
        { label: "A boy who hated Greek", tag: "Confessions 1.13–14", text: "Augustine says Greek lessons were forced on him with threats and punishments, so he hated them. He learned enough to check texts later, but read Scripture mainly in Latin.", ref: "Prov 22:6" },
        { label: "The Greek of Romans 5:12", tag: "eph’ hō pantes hēmarton", text: "Paul: death spread to all people “because all sinned”. The phrase explains why death spread: all, in fact, sinned.", ref: "Rom 5:12" },
        { label: "The Latin text", tag: "in quo omnes peccaverunt", text: "The Old Latin and the Vulgate read “in quo”: “in whom all sinned”. An earlier Latin commentator (Ambrosiaster) already read “whom” as Adam.", ref: "Rom 5:12" },
        { label: "All sinned in Adam", tag: "Augustine’s reading", text: "Augustine took it to mean all humanity sinned in Adam, inside him, before birth, so every person inherits Adam’s guilt, not only his mortality.", ref: "Rom 5:18–19" },
        { label: "Infants condemned", tag: "The logical end", text: "If guilt is inherited, unbaptised infants are condemned. Augustine assigned them “the mildest punishment of all” (On the Merits and Forgiveness of Sins 1.16.21).", ref: "Matt 19:14" },
        { label: "Softened over centuries", tag: "Limbo, then hope", text: "Medieval theologians proposed “limbo”. In 2007 a Catholic theological commission said there are serious grounds to hope that such infants are saved.", ref: "Mark 10:14–16" },
        { label: "Modern reading", tag: "“Because all sinned”", text: "Most modern commentators, Catholic and Protestant, read eph’ hō as causal (“because”), or as “with the result that”, not “in whom”.", ref: "Rom 5:12" }
      ] },
    { type: "words", nav: "Words behind the doctrine", title: "The words behind the doctrine", note: "Three phrases that decide the question.",
      items: [
        { word: "eph’ hō", lang: "Greek", gloss: "because, inasmuch as, on the basis of which", meaning: "A conjunction, as in 2 Cor 5:4 (“because we do not want to be unclothed”) and Phil 3:12. It does not normally mean “in whom”.", ref: "Rom 5:12; 2 Cor 5:4; Phil 3:12" },
        { word: "in quo", lang: "Latin", gloss: "in which / in whom", meaning: "The Latin can mean “in whom”, so readers like Augustine found Adam in the verse. The ambiguity lay in the translation.", ref: "Rom 5:12" },
        { word: "lo’ yissa’ (shall not bear)", lang: "Hebrew", gloss: "“the son shall not bear the iniquity of the father”", meaning: "Ezekiel 18 is a whole chapter rejecting the exiles’ proverb, “The fathers have eaten sour grapes, and the children’s teeth are set on edge.” “The soul who sins shall die.”", ref: "Ezek 18:2–4, 20; Deut 24:16; Jer 31:29–30" }
      ] },
    { type: "compare", nav: "Three views of Adam’s legacy", title: "What did we inherit from Adam?", note: "Three historic answers. Tap a topic.", labels: ["Inherited guilt (Augustinian, Western)", "Ancestral sin (Eastern Orthodox)", "The Hebrew picture"],
      items: [
        { topic: "What passes on", cols: ["Adam’s guilt and a corrupted nature.", "Mortality and corruption: a wounded nature prone to sin, but not personal guilt.", "Mortality and a world bent by sin; each person is responsible for their own sins (Ezek 18:20)."] },
        { topic: "Newborn babies", cols: ["Guilty before God until baptised.", "Innocent of personal sin, though born into mortality.", "Innocent: children who “do not yet know good from evil” (Deut 1:39)."] },
        { topic: "God’s disposition", cols: ["Rightly angry at humanity from birth.", "A physician toward the wounded.", "A Father who rescues the mortal and the wandering (Ps 103:13–14)."] },
        { topic: "Romans 5", cols: ["“In whom all sinned”: we sinned in Adam.", "Death came through Adam, and because of death, all sin.", "Death came through one man, and all have sinned; in Christ, much more, grace and life (5:15–21)."] },
        { topic: "Strength", cols: ["Takes seriously the universality of sin and our need of grace.", "Keeps the healing picture and the innocence of infants.", "Fits Ezekiel and Deuteronomy, and Jesus’ welcome of children."] }
      ] },
    { type: "compare", nav: "Checking the Augustine claims", title: "Checking the claims about Augustine and Romans 5:12", note: "Each claim compared with the sources. Tap a topic.", labels: ["The claim", "Verdict", "What the sources show"],
      items: [
        { topic: "Augustine hated Greek", cols: ["He admits it (Confessions 1.13–14).", "Accurate.", "Confessions 1.13.20 and 1.14.23. He later gained some reading knowledge but never worked chiefly in Greek."] },
        { topic: "The Latin “in quo”", cols: ["His Latin text read “in whom all sinned”.", "Accurate.", "Old Latin and Vulgate both read “in quo”. Augustine knew the Greek phrase but defended reading “in whom”."] },
        { topic: "Inherited guilt grew from it", cols: ["The doctrine grew from this reading.", "Largely true.", "The verse was central to Augustine’s case against Pelagius, though he also used other texts (Ps 51:5; Eph 2:3). An earlier commentator had already read “in Adam”."] },
        { topic: "Unbaptised infants", cols: ["He taught they are damned, with the mildest punishment.", "Accurate.", "On the Merits and Forgiveness of Sins 1.16.21: “mitissima omnium poena”."] },
        { topic: "Modern consensus", cols: ["Commentators of every stripe now read eph’ hō as causal.", "Mostly true.", "Most read “because”; some prefer “with the result that”. Very few defend “in whom”."] },
        { topic: "The Hebrew Bible denies the concept", cols: ["Ezekiel 18 exists to kill inherited guilt.", "Strong, with a qualification.", "Ezekiel 18 and Deut 24:16 reject inherited guilt for personal sin. Other texts speak of consequences carried across generations (Exod 20:5; Lam 5:7), which Ezekiel’s generation had turned into fatalism."] }
      ] }
  ], [
    { id: "inherited", q: "Were we born guilty of Adam’s sin?", short: "The Greek of Romans 5:12 says death spread to all “because all sinned”, not “in whom all sinned”. Ezekiel 18 and Deut 24:16 reject inherited guilt. Scripture clearly teaches that all have sinned and that Adam’s fall brought death and a broken world, so all need a Saviour (Rom 3:23; 5:12–19). But being mortal, wounded and prone to wander is not the same as being born a criminal. In Christ, the last Adam, “much more” has grace overflowed to all (Rom 5:15–18).",
      sections: [{ title: "Views", body: ["The Western tradition (Catholic and many Protestants) holds some form of original guilt; the Eastern Orthodox speak of ancestral sin without inherited guilt; many evangelicals hold inherited corruption without guilt until personal sin."] }], refs: ["Rom 5:12–21", "Ezek 18:20", "Deut 24:16", "Ps 103:13–14"] }
  ]);

  /* 3. Eve and life; singular and plural in Genesis 2–3 → Man, woman & Genesis (rendered on the woman page) */
  RG.studies.wmx = { short: "Eve and life", eyebrow: "", title: "Eve and life", lede: "", thesis: "", related: [], hidden: true, qa: [], evidence: [], blocks: [
    { type: "mindmap", nav: "Eve and life", title: "Eve: “the mother of all living”", note: "A literary reading of Genesis 2–4 that links Eve with life. Tap a branch.", center: "Chavvah, “life-giver”",
      branches: [
        { branch: "Her name", leaves: ["Chavvah sounds like chay, “living” (Gen 3:20)", "Named after the curse, as a promise", "Mother of all living"] },
        { branch: "What the text says", leaves: ["The death warning was given to the man (2:17)", "Her death is not recorded", "“The man” is driven out (3:24)"] },
        { branch: "What also appears", leaves: ["Garments for “Adam and his wife” (3:21)", "Together outside the garden (4:1)", "Pain in childbearing (3:16)"] },
        { branch: "Through her, life", leaves: ["“I have gotten a man with the LORD” (4:1)", "Seth: another seed (4:25)", "The seed of the woman (3:15)"] },
        { branch: "The bigger picture", leaves: ["Women bear God’s image (1:27)", "Women lead, prophesy and judge", "Life is more than childbearing"] }
      ] },
    { type: "compare", nav: "Singular and plural", title: "“You will surely die”: singular and plural in Genesis 2–3", note: "The Hebrew is precise here. Tap a topic.", labels: ["The Hebrew", "What it shows"],
      items: [
        { topic: "God to the man (2:17)", cols: ["mot tamut: “dying you (singular, masculine) shall die”.", "Spoken to the man alone, before the woman was formed (2:18–22). She heard the command second-hand."] },
        { topic: "The serpent’s opening (3:1)", cols: ["lo’ tok’lu: “you (plural) shall not eat”.", "The serpent addresses both of them from the start. The man was “with her” (3:6)."] },
        { topic: "The woman’s report (3:3)", cols: ["pen temutun: “lest you (plural) die”, adding “neither shall you touch it”.", "She speaks for both and adds a fence around the command, a common human instinct."] },
        { topic: "The serpent’s denial (3:4)", cols: ["lo’ mot temutun: “you (plural) will not surely die”.", "He repeats her plural and contradicts God’s word directly."] },
        { topic: "The reading in the post", cols: ["“We will both die” answered by “you won’t both die”.", "Grammatically accurate, but a creative interpretation. The plural is natural because the serpent and Eve speak about both of them. Most commentators read the serpent as denying death to both."] }
      ] },
    { type: "compare", nav: "Checking the Eve claims", title: "Checking the claims about Eve", note: "Each claim compared with the text. Tap a topic.", labels: ["The claim", "Verdict", "What the text shows"],
      items: [
        { topic: "God didn’t tell her she would die", cols: ["She wasn’t told by God that she would surely die.", "True as written.", "Gen 2:17 is addressed to the man before she was formed. God’s words to her after the fall (3:16) do not mention death; those to the man do (3:19)."] },
        { topic: "She is not banished", cols: ["She is not the one banished; she is not barred from the tree of life.", "Literally true, but probably not the point.", "3:22–24 speaks of “the man” (ha’adam), which can also mean humankind (as in 1:27, “male and female”). God clothed both (3:21), and they are together outside Eden (4:1)."] },
        { topic: "Her death is not recorded", cols: ["Genesis never records Eve’s death.", "True.", "Adam’s death is recorded (5:5); Eve’s is not. Genesis often omits women’s deaths, though Sarah’s, Rebekah’s nurse’s and Rachel’s are recorded (23:2; 35:8, 19)."] },
        { topic: "No named women in Genesis 5", cols: ["Genesis 5 names no women, though there must be mothers.", "True.", "It lists “other sons and daughters” (5:4) but names only fathers and sons."] },
        { topic: "“Noah’s wife was named Eve”", cols: ["Perhaps all the mothers are “Eve”; so Noah’s wife was named Eve.", "Symbolic, not historical.", "Scripture does not name Noah’s wife. Later Jewish tradition calls her Naamah (Genesis Rabbah 23:3), and the book of Jubilees calls her Emzara. The point is symbolic: wherever there is life, there is “Eve”."] },
        { topic: "“The biblical role of a woman is: Life”", cols: ["Eve’s character teaches the value of life and of women.", "A beautiful emphasis, but not the whole picture.", "Life-bearing is honoured (Gen 3:20; 1 Tim 2:15), but women in Scripture also lead, judge, prophesy, teach and work (Judg 4:4; Acts 2:17–18; 18:26; Rom 16:1–7). Every woman bears God’s image fully, whether or not she becomes a mother (Gen 1:27)."] }
      ] },
    { type: "cards", nav: "Reading Eve relationally", title: "Reading Eve through the relational gospel", note: "Tap any.",
      items: [
        { title: "Named in hope", text: "Right after hearing of death, the man names his wife “Life”. Faith in God’s promise of a seed (3:15) breaks through the curse.", ref: "Gen 3:15, 20" },
        { title: "Not the villain", text: "Western tradition often blamed Eve for sin. Paul says “in Adam all die” and that sin entered “through one man” (1 Cor 15:22; Rom 5:12).", ref: "Rom 5:12; 1 Cor 15:22" },
        { title: "Deceived, not condemned", text: "Eve was deceived (2 Cor 11:3; 1 Tim 2:14); God still covered her and promised that her seed would crush the serpent.", ref: "Gen 3:15, 21" },
        { title: "Fulfilled in Mary and the church", text: "Early writers called Mary the “new Eve”, and the church the bride and mother of the living in Christ.", ref: "Gal 4:4, 26; Rev 12:1–5" }
      ] }
  ] };

  /* 4. Head covering (1 Cor 11:2–16) → Conflation & other Bible-reading fallacies */
  addTo("conflate", [
    { type: "mindmap", nav: "1 Cor 11 at a glance", title: "1 Corinthians 11:2–16: head coverings, mapped", note: "Paul’s argument, step by step. Tap a branch.", center: "Head coverings in worship",
      branches: [
        { branch: "Praise (11:2)", leaves: ["You keep the traditions", "Context: public worship"] },
        { branch: "Headship (11:3)", leaves: ["Christ, man, woman, God", "kephalē: “authority” or “source”?"] },
        { branch: "Praying and prophesying (11:4–6)", leaves: ["Men uncovered, women covered", "Women did pray and prophesy aloud", "Shame of a shaved head"] },
        { branch: "Creation (11:7–9)", leaves: ["Image and glory", "Woman from man, for man"] },
        { branch: "Authority and angels (11:10)", leaves: ["“Authority on her head”", "Because of the angels"] },
        { branch: "“Nevertheless in the Lord” (11:11–12)", leaves: ["Neither independent", "Man now born of woman", "All things from God"] },
        { branch: "Nature and custom (11:13–16)", leaves: ["Judge for yourselves", "Long hair as a covering", "“We have no such custom”"] }
      ] },
    { type: "cards", nav: "Corinth’s culture", title: "The cultural background in Corinth", note: "Corinth was a Roman colony with Greek and Jewish residents. Tap any.",
      items: [
        { title: "Roman men covered for sacrifice", text: "Roman men pulled their toga over their heads when praying or sacrificing to the gods (capite velato). Paul forbids men to cover, perhaps to distance Christian worship from pagan priestly practice.", ref: "1 Cor 11:4, 7" },
        { title: "The married woman’s veil", text: "In Roman and Jewish society, a respectable married woman covered her hair in public. Uncovered or loosened hair could suggest sexual availability or immodesty. Jewish law later counted a wife going out with uncovered head as grounds for divorce (Mishnah Ketubot 7:6).", ref: "1 Cor 11:5–6" },
        { title: "Lust and class", text: "Women’s hair was often seen as an object of lust. Some wealthy women showed off elaborate hairstyles uncovered, while poorer women covered. A Bible background commentary suggests Paul was resolving a class clash in the church.", ref: "1 Cor 11:5; 1 Tim 2:9; 1 Pet 3:3" },
        { title: "Ecstatic cults", text: "In some pagan cults (such as the worship of Dionysus) women prophesied with loosened, dishevelled hair. Paul may have wanted Christian prophecy to be clearly different and orderly.", ref: "1 Cor 14:33, 40" },
        { title: "Shaved heads as disgrace", text: "A shaved head could mark a woman as disgraced or punished. Paul uses that shared sense of shame: “if it is disgraceful… let her cover her head.”", ref: "1 Cor 11:6" },
        { title: "“Nature” as custom", text: "“Does not nature itself teach you that if a man wears long hair it is a disgrace?” Yet God commanded Nazirites to grow their hair (Num 6:5), and Paul himself kept a vow involving hair (Acts 18:18). “Nature” here likely includes the settled custom of the culture.", ref: "1 Cor 11:14–15" }
      ] },
    { type: "cards", nav: "Four views today", title: "Four views of head coverings today", note: "Faithful Christians differ. Tap any.",
      items: [
        { title: "1. A universal practice", text: "Paul grounds it in creation and the angels, not only culture, so women should cover in worship today. Held by many Brethren, Anabaptist, Orthodox and South Asian churches.", ref: "1 Cor 11:7–10, 16" },
        { title: "2. A timeless principle, cultural form", text: "The principles (honour, order, distinction between men and women, avoiding shame) are timeless; the veil was the culture’s way of expressing them. Many evangelical churches hold this.", ref: "1 Cor 11:3, 13; 10:32" },
        { title: "3. Long hair is the covering", text: "“Her hair is given to her for a covering” (11:15). The Greek anti can mean “instead of”: long hair is the God-given covering, not an added cloth.", ref: "1 Cor 11:15" },
        { title: "4. Mutual honour “in the Lord”", text: "Verses 11–12 qualify the argument: “in the Lord” man and woman are interdependent. The point is honouring one another in worship, not a dress code. A few read parts of the passage as Paul quoting Corinthian views.", ref: "1 Cor 11:11–12; Gal 3:28" }
      ] },
    { type: "compare", nav: "Weighing the arguments", title: "Weighing the arguments for universal head covering", note: "A common teaching weighed against the text. Tap a topic.", labels: ["The argument", "Strength", "What to weigh"],
      items: [
        { topic: "Headship of God, Christ and man (11:3–8)", cols: ["Covering expresses God’s order.", "Paul does argue from headship.", "Kephalē is debated (“authority over” or “source”). Christ’s headship is self-giving (Eph 5:23–25). The passage then says “nevertheless, in the Lord” (11:11)."] },
        { topic: "Creation purpose (11:9)", cols: ["Woman was created for man.", "Paul cites Genesis 2.", "He immediately balances it: “as woman was made from man, so man is now born of woman” (11:12)."] },
        { topic: "The angels (11:10)", cols: ["Angels watch our worship and care about God’s order. The archangel who rebelled became Satan.", "Angels observing worship has some support (1 Cor 4:9; Eph 3:10).", "The Greek says “a woman ought to have authority on her head”: some versions add “a symbol of”, and many read it as her own authority to pray and prophesy. Scripture never calls Satan an archangel; that idea comes from merging Isaiah 14 and Ezekiel 28, a conflation (see above). Michael is the only archangel named (Jude 9)."] },
        { topic: "Nature (11:14–15)", cols: ["A covering on top of long hair says “amen” to God’s order.", "Paul appeals to what “nature” teaches.", "Verse 15 says her hair is given “for” or “instead of” a covering. “Nature” likely includes custom: Nazirite men grew long hair at God’s command."] },
        { topic: "“We have no such custom” (11:16)", cols: ["The churches all practise covering.", "Paul appeals to the practice of the churches.", "“Such custom” may mean “the custom of being contentious” or “the custom of women praying uncovered”. It is debated."] },
        { topic: "“Calling it cultural discards the Lord’s Supper too”", cols: ["The Supper is also symbolic and rooted in Jewish culture.", "A fair warning against dismissing texts as “just cultural”.", "The Supper was commanded by Jesus for all (“do this… until he comes”) and rests on the gospel event (11:23–26). Head covering rests partly on shame and custom (11:6, 13–14). By the same logic, the holy kiss (commanded five times) and foot-washing would be required too."] }
      ] },
    { type: "decide", nav: "What should we do?", title: "Head coverings: a gentle way forward", note: "For churches and individuals.", start: "q1", stepLabel: "Question", endLabel: "Suggestion",
      nodes: {
        q1: { q: "In your culture, does a woman uncovered in worship communicate shame, immodesty or rebellion?", ref: "1 Cor 11:5–6, 13; 10:32", options: [{ label: "Yes", to: "e1" }, { label: "No", to: "q2" }] },
        q2: { q: "Does your conscience or church tradition lead you to cover?", ref: "Rom 14:5, 22–23", options: [{ label: "Yes", to: "e2" }, { label: "No", to: "e3" }] },
        e1: { end: true, tone: "uni", title: "Covering may honour Christ there", text: "Where uncovering sends a shameful message, covering serves the gospel, as it did in Corinth. Do it from love, not fear.", ref: "1 Cor 9:19–23; 10:31–33" },
        e2: { end: true, tone: "uni", title: "Cover freely, without judging others", text: "Follow your conscience gladly, and do not condemn sisters who read the passage differently.", ref: "Rom 14:3–4, 10" },
        e3: { end: true, tone: "gold", title: "Honour in other forms", text: "Express the same principles (honour, modesty, order and mutual respect) in ways your culture understands. Welcome women’s prayer and prophecy, which Paul assumes (11:5).", ref: "1 Cor 11:5, 11–12; Acts 2:17–18" }
      } }
  ], [
    { id: "covering", q: "Must women cover their heads in worship today?", short: "Paul clearly expected Corinthian women to cover when praying and prophesying, and grounded it in headship, creation, the angels, nature and church practice. Christians disagree on whether the covering itself is timeless or whether it was the culture’s way of expressing timeless principles of honour, modesty and order. The text also assumes women pray and prophesy aloud (11:5) and stresses mutual dependence “in the Lord” (11:11–12). Follow conscience and church peace, and do not judge others.",
      sections: [{ title: "A caution", body: ["Avoid two errors: dismissing hard texts as “just cultural”, and binding cultural forms on every culture. Ask what the text meant then, why, and how its principle is best expressed now."] }], refs: ["1 Cor 11:2–16", "Rom 14:5", "1 Cor 10:31–33"] }
  ]);
})();
