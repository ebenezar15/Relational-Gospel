window.RG = window.RG || {}; var RG = window.RG;
RG.studies = RG.studies || {};

/* Round 49: salvation and righteousness vocabulary, added to “Conflation & other Bible-reading fallacies” */
(function () {
  var S = RG.studies.conflate; if (!S) return;
  var add = [
    { type: "words", nav: "Salvation words", title: "Salvation words: what they really mean", note: "Words heard every Sunday that are often flattened into a single narrow meaning.",
      items: [
        { word: "sōtēria / sōzō (salvation, save)", lang: "Greek", gloss: "rescue, healing, wholeness, safety", meaning: "Used for forgiveness and eternal life, but also for healing (“your faith has saved you”, Luke 8:48), rescue from a storm (Acts 27:20, 31) and deliverance (Luke 1:71). Salvation is God making the whole person and world whole, not only a ticket to heaven.", ref: "Luke 8:48; Acts 27:20; Luke 1:71; Eph 2:8" },
        { word: "Saved: past, present and future", lang: "Greek tenses", gloss: "“have been saved”, “are being saved”, “shall be saved”", meaning: "“By grace you have been saved” (Eph 2:8); “to us who are being saved” (1 Cor 1:18); “we shall be saved by his life” (Rom 5:10). Using only one tense distorts the gospel. See “Three tenses of salvation”.", ref: "Eph 2:8; 1 Cor 1:18; Rom 5:9–10" },
        { word: "dikaiosynē (righteousness)", lang: "Greek", gloss: "right relationship, covenant faithfulness, justice", meaning: "In the Old Testament, God’s righteousness parallels his salvation: “I bring near my righteousness… and my salvation will not delay” (Isa 46:13). In Romans, “the righteousness of God” is his saving faithfulness revealed in the gospel (Rom 1:16–17). It is a gift and a relationship, not a score of good behaviour.", ref: "Isa 46:13; Rom 1:17; 2 Cor 5:21" },
        { word: "dikaioō (justify)", lang: "Greek", gloss: "to declare or show to be right; to set right", meaning: "Paul: justified by faith apart from works of the law (Rom 3:28). James: “a person is justified by works” (Jas 2:24), meaning shown to be right by living faith. The same verb is used in two senses.", ref: "Rom 3:28; Jas 2:21–24; Luke 7:29" },
        { word: "hagios (holy, saint)", lang: "Greek", gloss: "set apart, belonging to God", meaning: "Paul calls even the troubled Corinthians “saints” (1 Cor 1:2). Holiness is first belonging to God, then becoming like him. It is not a title reserved for a few heroes.", ref: "1 Cor 1:2; Heb 10:10, 14" },
        { word: "metanoia (repentance)", lang: "Greek", gloss: "a change of mind, a new way of seeing", meaning: "The Latin Vulgate rendered Jesus’ call “do penance”, which shaped centuries of thinking about self-punishment. Metanoia is turning your mind around toward God, often in response to his kindness (Rom 2:4).", ref: "Mark 1:15; Rom 2:4; Acts 3:19" },
        { word: "pistis (faith)", lang: "Greek", gloss: "trust, loyalty, faithfulness", meaning: "Not mere agreement with facts, nor positive thinking, but trust in a faithful Person. Some passages speak of the faith or faithfulness “of Christ” (Gal 2:16; 2:20): scholars debate the phrase.", ref: "Heb 11:1, 6; Gal 2:16, 20" },
        { word: "charis (grace)", lang: "Greek", gloss: "gift, favour, and enabling power", meaning: "Unearned favour, yes, but also power: “by the grace of God I am what I am… I worked harder… though it was not I, but the grace of God that is with me”. Grace is not licence (Rom 6:1–2) and not only a pardon.", ref: "1 Cor 15:10; Titus 2:11–12; 2 Cor 12:9" },
        { word: "zōē aiōnios (eternal life)", lang: "Greek", gloss: "the life of the age to come", meaning: "Not only endless existence after death, but a quality of life that starts now: “This is eternal life, that they know you, the only true God, and Jesus Christ.”", ref: "John 17:3; John 5:24; 1 John 5:11–13" },
        { word: "gennaō anōthen (born again)", lang: "Greek", gloss: "born from above, born anew", meaning: "A new birth by the Spirit, not a single emotional moment or a label for a type of church. The word anōthen means both “again” and “from above”.", ref: "John 3:3–8; 1 Pet 1:3, 23" },
        { word: "apollumi (perish, be lost)", lang: "Greek", gloss: "to be lost, ruined, destroyed", meaning: "The same word describes the lost sheep, coin and son that the Father seeks and finds (Luke 15:4, 8, 24). “Lost” first means far from home, not a label for the hopeless.", ref: "John 3:16; Luke 15:4, 24; Luke 19:10" },
        { word: "eklektos (elect, chosen)", lang: "Greek", gloss: "chosen, picked out", meaning: "Believers are chosen “in him”, in Christ (Eph 1:4), and Israel was chosen to bless all nations (Gen 12:3). Election in Scripture is often corporate and for a purpose. Christians differ on how it applies to individuals.", ref: "Eph 1:4–5; Rom 8:29; 1 Pet 2:9" },
        { word: "kaphar (atonement)", lang: "Hebrew", gloss: "to cover, purge, wipe clean, reconcile", meaning: "Used for cleansing the altar and the people (Lev 16:16–20). The English word “atonement” was coined in the 16th century to mean “at-one-ment”, reconciliation.", ref: "Lev 16:16–20, 30; Rom 5:11" }
      ] },
    { type: "compare", nav: "Salvation conflations", title: "Common conflations about salvation and righteousness", note: "What gets merged, and how Scripture distinguishes. Tap a topic.", labels: ["The conflation", "What Scripture shows"],
      items: [
        { topic: "Salvation and going to heaven", cols: ["Being saved means only escaping hell after death.", "Salvation includes forgiveness, healing, deliverance, new life now and resurrection to come (Luke 19:9; Titus 3:5; Rom 8:23)."] },
        { topic: "Righteousness and good behaviour", cols: ["Righteous means behaving well enough.", "Righteousness is first a gift and a right relationship with God (Rom 5:17; 2 Cor 5:21). Right living flows from it (Eph 2:10)."] },
        { topic: "God’s righteousness and God’s punishment", cols: ["“The righteousness of God” means his demand to punish.", "In Romans and Isaiah, it is above all his faithfulness to save (Rom 1:16–17; 3:21–26; Ps 98:2)."] },
        { topic: "Righteousness and self-righteousness", cols: ["Pursuing righteousness makes you proud and judgmental.", "Self-righteousness trusts our own performance (Luke 18:9; Phil 3:9). True righteousness is received, so it makes us humble."] },
        { topic: "Repentance and penance", cols: ["Repentance means feeling terrible, punishing yourself or doing penance.", "It means a changed mind and a turned direction, often prompted by God’s kindness (Rom 2:4; 2 Cor 7:10)."] },
        { topic: "Faith and a work", cols: ["Faith is a good work I must produce well enough.", "Faith is receiving, not earning: “it depends on faith, in order that the promise may rest on grace” (Rom 4:16). It is itself God’s gift (Eph 2:8)."] },
        { topic: "Grace and licence", cols: ["Grace means sin doesn’t matter.", "Grace trains us “to renounce ungodliness” and empowers new life (Titus 2:11–12; Rom 6:1–2, 14)."] },
        { topic: "Saint and super-Christian", cols: ["Saints are a holy few.", "Every believer is a saint, set apart in Christ (1 Cor 1:2; Eph 1:1)."] },
        { topic: "Eternal life and endless time", cols: ["Eternal life is only about duration after death.", "It is knowing God, starting now (John 17:3; 1 John 5:12)."] },
        { topic: "Lost and hopeless", cols: ["The lost are written off.", "The lost are those the Father is seeking (Luke 15; 19:10)."] },
        { topic: "Sinner and identity", cols: ["Believers are “just sinners saved by grace”, defined by sin.", "Paul calls his past self “the foremost of sinners” (1 Tim 1:15), but addresses believers as saints, sons and new creations (Rom 8:14–16; 2 Cor 5:17)."] },
        { topic: "Election and exclusion", cols: ["Chosen means others are rejected.", "Abraham and Israel were chosen so that “all the families of the earth” would be blessed (Gen 12:3); God desires all to be saved (1 Tim 2:4)."] }
      ] }
  ];
  var at = S.blocks.findIndex(function (b) { return b.type === "decide"; });
  Array.prototype.splice.apply(S.blocks, [at < 0 ? S.blocks.length : at, 0].concat(add));
})();
