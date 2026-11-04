window.RG = window.RG || {}; var RG = window.RG;
RG.studies = RG.studies || {};

/* Round 45: sin as sickness and broken relationship vs sin as legal offence → Two trees; sin conflations → Conflation */
(function () {
  function addTo(id, blocks, qa) {
    var S = RG.studies[id]; if (!S) return;
    var at = S.blocks.findIndex(function (b) { return b.type === "quiz"; });
    Array.prototype.splice.apply(S.blocks, [at < 0 ? S.blocks.length : at, 0].concat(blocks));
    if (qa) S.qa.push.apply(S.qa, qa);
  }

  addTo("trees", [
    { type: "mindmap", nav: "Sin’s many pictures", title: "How Scripture pictures sin", note: "The Bible uses many pictures for sin. Sickness, death and broken relationship are everywhere; legal words appear too, inside that larger story. Tap a branch.", center: "Sin",
      branches: [
        { branch: "Sickness", leaves: ["“The whole head is sick” (Isa 1:5–6)", "“Heal me, for I have sinned” (Ps 41:4)", "“I will heal their apostasy” (Hos 14:4)"] },
        { branch: "Death", leaves: ["“Dead in trespasses” (Eph 2:1)", "Sin “brings forth death” (Jas 1:15)", "Death spread to all (Rom 5:12)"] },
        { branch: "Slavery", leaves: ["“Everyone who sins is a slave” (John 8:34)", "Sin reigns like a tyrant (Rom 6:12)"] },
        { branch: "Missing the mark", leaves: ["chata’ / hamartia", "Falling short of glory (Rom 3:23)"] },
        { branch: "Broken relationship", leaves: ["Adultery against a loving husband (Jer 3; Hos 2)", "“Your iniquities have separated you” (Isa 59:2)", "“Where are you?” (Gen 3:9)"] },
        { branch: "Blindness and darkness", leaves: ["Minds blinded (2 Cor 4:4)", "Loving darkness (John 3:19)"] },
        { branch: "Debt", leaves: ["“Forgive us our debts” (Matt 6:12)", "The record cancelled (Col 2:14)"] },
        { branch: "Rebellion", leaves: ["“They have rebelled against me” (Isa 1:2)", "Lawlessness (1 John 3:4)", "Disobedience (Rom 5:19)"] }
      ] },
    { type: "words", nav: "The words for sin", title: "The words for sin", note: "Even the “legal-sounding” words carry relational and healing meaning.",
      items: [
        { word: "chata’ / hamartia", lang: "Hebrew / Greek", gloss: "to miss the mark", meaning: "Used of slingers who “could sling a stone at a hair and not miss” (Judg 20:16). Sin is missing what we were made for: “all have sinned and fall short of the glory of God”.", ref: "Judg 20:16; Rom 3:23" },
        { word: "‘avon", lang: "Hebrew", gloss: "iniquity: twistedness, being bent", meaning: "From a root meaning to bend or twist. It can mean both the distortion and its consequence: something bent that needs straightening.", ref: "Ps 51:5; Isa 53:5–6" },
        { word: "pesha‘", lang: "Hebrew", gloss: "rebellion, breach, revolt", meaning: "Used for a vassal nation breaking away (“Edom revolted”, 2 Kgs 8:20). It is a broken relationship of trust, more than a broken rule.", ref: "Isa 1:2; 2 Kgs 8:20; Ps 51:1" },
        { word: "‘anush", lang: "Hebrew", gloss: "incurable, desperately sick", meaning: "“The heart is deceitful above all things, and desperately sick.” The word describes an incurable wound (Jer 15:18; 30:12).", ref: "Jer 17:9; Jer 30:12–17" },
        { word: "parakoē", lang: "Greek", gloss: "disobedience, literally “hearing amiss”", meaning: "From para (“beside, wrongly”) + akouō (“hear”). Its opposite, hupakoē (obedience), is “hearing under”. Disobedience is failing to listen to a loving voice.", ref: "Rom 5:19; 2 Cor 10:6; Heb 2:2" },
        { word: "anomia", lang: "Greek", gloss: "lawlessness", meaning: "Life without God’s order. In 1 John, the opposite of lawlessness is love: “whoever does not love his brother” is not of God (3:10–11).", ref: "1 John 3:4, 10–11; Matt 24:12" },
        { word: "paraptōma / parabasis", lang: "Greek", gloss: "a false step; stepping over a line", meaning: "A slip off the path and a crossing of a boundary. Both are about walking: the way back is restoration (Gal 6:1).", ref: "Rom 5:15–20; Gal 6:1" },
        { word: "opheilēma", lang: "Greek", gloss: "debt", meaning: "Jesus’ prayer frames sin as debt that is released (aphiēmi), and teaches us to release others in the same way.", ref: "Matt 6:12; 18:23–35" }
      ] },
    { type: "compare", nav: "Same words, two readings", title: "The same words read two ways", note: "Legal words appear in Scripture. The question is what they serve. Tap a topic.", labels: ["Legal-first reading", "Relational, healing reading"],
      items: [
        { topic: "Disobedience", cols: ["Breaking a rule of the divine code.", "Failing to listen to the Father’s voice (parakoē), as in the garden, where trust was lost before the fruit was taken (Gen 3:1–6)."] },
        { topic: "The law (torah)", cols: ["A legal code whose violation incurs penalty.", "Instruction from a Father; a guardian until Christ; it exposes the disease but cannot cure it (Gal 3:24; Rom 7:7–13; 8:3)."] },
        { topic: "Death", cols: ["A penalty God imposes for law-breaking.", "The fruit of sin: “sin, when it is fully grown, brings forth death” (Jas 1:15). Cut off from the source of life, we die."] },
        { topic: "Wrath", cols: ["God’s punitive anger satisfied by penalty.", "God giving people over to what they chose (Rom 1:24–28), so they experience its consequences."] },
        { topic: "Judgment", cols: ["Sentencing in a court.", "Light exposing and setting right: “this is the judgment: the light has come” (John 3:19)."] },
        { topic: "Justification", cols: ["A verdict of acquittal only.", "Being made right with God and brought into relationship; peace and access (Rom 5:1–2)."] },
        { topic: "Forgiveness", cols: ["Cancelling a penalty.", "Release and healing: “who forgives all your iniquity, who heals all your diseases” (Ps 103:3)."] },
        { topic: "The cross", cols: ["Paying a fine owed to God.", "The Physician entering our disease and death to destroy it: “by his wounds you have been healed” (1 Pet 2:24; Heb 2:14)."] }
      ] },
    { type: "flow", nav: "How sin works", title: "How sin works, from Genesis to the gospel", note: "Sin as a disease of trust that spreads into death, and God as the Physician. Press play.",
      steps: [
        { label: "A lie about God", tag: "Distrust", text: "“Did God actually say…?” “You will not surely die… God knows…” The serpent first poisons trust in God’s goodness.", ref: "Gen 3:1–5" },
        { label: "Grasping", tag: "Taking instead of receiving", text: "What God would give freely is seized: “she took of its fruit and ate”.", ref: "Gen 3:6" },
        { label: "Shame and hiding", tag: "Fear enters", text: "“I was afraid… and I hid.” Fear and shame distort how we see God and ourselves.", ref: "Gen 3:7–10" },
        { label: "Separation in the mind", tag: "Alienation", text: "We became “alienated and hostile in mind”. God did not move; we hid.", ref: "Col 1:21; Isa 59:2" },
        { label: "Disease and death spread", tag: "Corruption", text: "Death spread to all; creation itself groans in bondage to decay.", ref: "Rom 5:12; Rom 8:20–22" },
        { label: "God comes seeking", tag: "“Where are you?”", text: "The first word after sin is a question of love, not a sentence. God clothes them and promises a Saviour.", ref: "Gen 3:9, 15, 21" },
        { label: "The Physician arrives", tag: "Healing in union", text: "Jesus came “not to call the righteous but sinners” as a doctor comes to the sick, and joined our humanity to heal it.", ref: "Mark 2:17; Heb 2:14–15; Rom 8:2–3" }
      ] },
    { type: "args", nav: "Passages that seem legal", title: "Passages that seem to make sin purely legal, and how to read them",
      items: [
        { arg: "“Sin is lawlessness” (1 John 3:4).", truth: "Sin is a violation of God’s order.", answer: "John immediately explains: the children of God are known by love, and the devil’s by not loving (3:10–11). Lawlessness is the rejection of the life of love, not just a broken rule. His answer is new birth, not a court case (3:9)." },
        { arg: "“The wages of sin is death” (Rom 6:23).", truth: "Sin leads to death.", answer: "In Romans 6, sin is pictured as a slave-master who pays its own wages. Death is what sin pays out; the contrast is “the free gift of God”. Sin is the employer, not God." },
        { arg: "Romans 3: justified, propitiation, God’s justice.", truth: "Paul does use courtroom language.", answer: "He mixes it with other pictures: redemption (freeing slaves), the mercy seat (hilastērion, the place where God met Israel), and in Romans 5–8, death, reign, slavery and new life. Legal language is one picture among many, all serving reconciliation (Rom 5:10–11)." },
        { arg: "“By one man’s disobedience many were made sinners… condemnation for all” (Rom 5:18–19).", truth: "Adam’s fall has universal consequences.", answer: "The problem Paul describes is death reigning (5:14, 17). Disobedience (parakoē) is failing to hear. The answer is “much more”: grace reigning through righteousness to life (5:15–21)." },
        { arg: "“The record of debt that stood against us with its legal demands” (Col 2:14).", truth: "There was a record against us.", answer: "God “cancelled” it and “set it aside, nailing it to the cross”. He did not demand payment to himself; he tore up the record, and disarmed the powers (2:15)." },
        { arg: "“Without the shedding of blood there is no forgiveness” (Heb 9:22).", truth: "Blood mattered under the law.", answer: "Hebrews speaks of purification under the law (9:22 begins “under the law almost everything is purified with blood”). Blood is life (Lev 17:11): Christ’s life cleanses the conscience (Heb 9:14). The picture is cleansing and access, not appeasement." },
        { arg: "“Against you only have I sinned… that you may be justified in your judgment” (Ps 51:4).", truth: "Sin is against God, and he is right.", answer: "The same psalm asks God to wash, cleanse, create a new heart and “let the bones that you have broken rejoice” (51:7–12). David’s confession is a plea for healing and restored joy." },
        { arg: "“Whoever keeps the whole law but fails in one point is guilty of all” (Jas 2:10).", truth: "No one can stand by law-keeping.", answer: "James is showing that partiality breaks the royal law of love (2:8–9). His conclusion: “mercy triumphs over judgment” (2:13)." },
        { arg: "“The soul who sins shall die” and the covenant curses (Ezek 18:4; Deut 28).", truth: "Sin brings death, and Israel’s covenant had consequences.", answer: "Ezekiel’s point is personal responsibility, and he ends with God pleading: “I have no pleasure in the death of anyone… turn, and live” (18:32). Christ “redeemed us from the curse of the law” (Gal 3:13)." },
        { arg: "“Judged according to what they had done” (Rev 20:12; 2 Cor 5:10).", truth: "Judgment is real.", answer: "Judgment in Scripture is God setting the world right and exposing what is real. For believers it is about reward, not condemnation (Rom 8:1; 1 Cor 3:13–15). Faithful Christians differ on the final judgment of unbelievers; see “That all shall be saved?”." }
      ] },
    { type: "compare", nav: "Is sin only sickness?", title: "Is sin only a sickness? An honest balance", note: "Scripture does use legal words, so “never legal” goes too far. What matters is which picture leads. Tap a topic.", labels: ["What is true in the legal picture", "Where it goes wrong if it leads"],
      items: [
        { topic: "Responsibility", cols: ["We are responsible: repentance (metanoia) means a change of mind, and we confess our sins (1 John 1:9).", "Responsibility becomes condemnation: “you are a criminal awaiting sentence.” A sick child is responsible to come to the doctor, not to be punished for being sick."] },
        { topic: "God’s justice", cols: ["God is just and will set all things right (Ps 96:13).", "Justice is reduced to retribution, and God must punish before he can love."] },
        { topic: "The seriousness of sin", cols: ["Sin destroys: it is not trivial (Rom 6:23).", "Its seriousness is placed in offending God’s honour rather than in destroying God’s beloved."] },
        { topic: "The cross", cols: ["Christ bore our sins (1 Pet 2:24).", "The cross becomes the Father punishing the Son, rather than the Son healing humanity by entering our death (2 Cor 5:19)."] },
        { topic: "Christian life", cols: ["Sin still matters to believers.", "Believers live in fear of punishment instead of growing in the health of the new creation (Rom 8:15)."] }
      ] },
    { type: "decide", nav: "When I sin", title: "When I sin: a relational response", note: "What to do the moment you know you have sinned.", start: "q1", stepLabel: "Question", endLabel: "Next step",
      nodes: {
        q1: { q: "Is my first instinct to hide from God, or to run to him?", ref: "Gen 3:8–10; Heb 4:16", options: [{ label: "To hide", to: "e1" }, { label: "To run to him", to: "q2" }] },
        q2: { q: "Has my sin hurt someone else?", ref: "Matt 5:23–24", options: [{ label: "Yes", to: "e2" }, { label: "No, mainly myself", to: "e3" }] },
        e1: { end: true, tone: "gold", title: "Come out of hiding", text: "The Father still asks, “Where are you?”: an invitation, not a summons. There is no condemnation in Christ. Come boldly to the throne of grace.", ref: "Gen 3:9; Rom 8:1; Heb 4:16" },
        e2: { end: true, tone: "uni", title: "Agree, receive, and repair", text: "Agree with God about it (homologeō, “say the same”), receive his cleansing, then go and make it right with the person you hurt.", ref: "1 John 1:9; Luke 19:8; Matt 5:24" },
        e3: { end: true, tone: "uni", title: "Let the Physician heal the root", text: "Ask what lie, wound or need lay underneath. Receive his truth and love there, and lean on others for support.", ref: "Ps 139:23–24; Jas 5:16; Rom 12:2" }
      } }
  ], [
    { id: "sinlegal", q: "Does Scripture treat sin as legal disobedience or as sickness?", short: "Both kinds of language are in Scripture, so it is not accurate to say it never uses legal terms: it speaks of transgression, lawlessness, disobedience, judgment and justification. But legal terms are a minority among many pictures (sickness, death, slavery, missing the mark, adultery, blindness, debt), and even they are relational: disobedience (parakoē) is “hearing amiss”, rebellion (pesha‘) is a broken bond of trust. The relational gospel lets the healing and family pictures lead, as Jesus did: “Those who are well have no need of a physician” (Mark 2:17). The Western legal emphasis grew especially from Augustine onward; the Eastern church kept the healing picture central.",
      sections: [{ title: "Why it matters", body: ["If sin is mainly a crime, God is mainly a judge to be appeased. If sin is mainly a disease of trust, God is a Physician and Father who comes to heal, and repentance is coming home."] }], refs: ["Mark 2:17", "Ps 103:3", "Rom 5:19", "Isa 1:5–6"] }
  ]);

  addTo("conflate", [
    { type: "compare", nav: "Conflations about sin", title: "Conflations about sin", note: "Common merges that distort how we understand sin. Tap a topic.", labels: ["What gets merged", "How Scripture distinguishes"],
      items: [
        { topic: "“Sin” and “sins”", cols: ["Sin is only individual wrong acts.", "Paul often uses “sin” (singular) for a power that reigns, deceives and kills (Rom 5:21; 6:12–14; 7:11), distinct from particular sins (1 John 1:9). The power is broken by union with Christ; acts are confessed and healed."] },
        { topic: "Sin and sickness", cols: ["Your sickness is caused by your sin.", "Sometimes sin and sickness are linked (John 5:14; Jas 5:15–16), but often not: “neither this man nor his parents sinned” (John 9:3). Sickness is not proof of personal sin."] },
        { topic: "Sin and temptation", cols: ["A tempting thought is already sin.", "Jesus was tempted yet without sin (Heb 4:15). Desire conceived and acted on becomes sin (Jas 1:14–15)."] },
        { topic: "Sin and shame", cols: ["Feeling dirty or worthless means I am still guilty.", "Guilt concerns what I did; shame says what I am. Jesus “despised the shame” and removes it (Heb 12:2; Isa 54:4)."] },
        { topic: "Consequences and punishment", cols: ["Every painful consequence is God punishing me.", "Sowing and reaping are natural consequences (Gal 6:7). Punishment for sin was borne by Christ (Isa 53:5). God disciplines as a Father for our good (Heb 12:10)."] },
        { topic: "Legal metaphor and literal court", cols: ["Heaven is literally a courtroom where God must punish.", "Courtroom language is one metaphor among many (healing, family, slave market, temple). Treating one metaphor as the whole reality is itself a conflation."] },
        { topic: "The debt picture: who was paid?", cols: ["Our debt was paid to God, so God needed payment before he could forgive.", "Jesus taught forgiving debts freely (Matt 18:27). God “cancelled” the record (Col 2:14). Early writers debated who was “paid”; Gregory of Nazianzus said the Father did not demand it."] },
        { topic: "Hamartia, anomia and parakoē", cols: ["All words for sin mean “breaking the rules”.", "Missing the mark, lawlessness (rejecting love’s order) and hearing amiss each show a different side of a broken relationship."] },
        { topic: "The old self and the flesh, and the person", cols: ["I am my sin: “I’m just a sinner.”", "The old self was crucified; believers are new creations who still face the flesh but are not defined by it (Rom 6:6; 7:17, 20; 2 Cor 5:17)."] }
      ] }
  ]);
})();
