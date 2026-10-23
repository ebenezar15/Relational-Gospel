window.RG = window.RG || {}; var RG = window.RG;

/* Round 20 B: who borrowed from whom, the shame and grace cycles, the skeleton, balance, myths */

RG.rcRoots = [
  { id: "confession", year: "1st century", method: "Confession and mutual support", root: "christian",
    origin: "“Confess your sins to one another and pray for one another, that you may be healed.” Early Christians practised honest confession in community, and later monastic communities developed spiritual direction.",
    today: "Group therapy, sponsors, “sharing” in recovery groups, and the general belief that secrets keep us sick.",
    verdict: "Christian roots. Secular use keeps the healing power of honesty but usually drops forgiveness from God.", ref: "James 5:16; 1 John 1:7–9" },
  { id: "stoic", year: "1st–2nd century", method: "Thoughts shape feelings (Stoicism)", root: "other",
    origin: "Epictetus taught that people are disturbed not by things but by their judgements about things. Scripture says something parallel: be transformed by the renewing of your mind, and think on what is true and lovely.",
    today: "Cognitive Behavioural Therapy (Aaron Beck, 1960s) and REBT (Albert Ellis, 1955). Ellis openly credited Epictetus.",
    verdict: "Shared insight. CBT draws on Stoic philosophy, not the Bible, but the truth that thoughts shape emotions is part of creation. Paul says renewal also needs the Spirit and the truth about God.", ref: "Rom 12:2; Phil 4:8; 2 Cor 10:5" },
  { id: "aa", year: "1935", method: "The Twelve Steps", root: "christian",
    origin: "Alcoholics Anonymous grew out of the Oxford Group, a Christian revival movement. Bill W. and Dr Bob adapted its practices of surrender, moral inventory, confession, restitution and helping others. Episcopal priest Sam Shoemaker was a key influence.",
    today: "AA, NA, SA and hundreds of Twelve-Step groups. Celebrate Recovery (1991) re-attached the steps to Christ and the Beatitudes.",
    verdict: "Clearly borrowed from Christian practice. The steps changed “God” to “a Power greater than ourselves… as we understood Him” so that people of any faith could join. So here secular recovery copied the church, not the other way round.", ref: "Luke 15:17–20; Matt 5:3–10" },
  { id: "frankl", year: "1946", method: "Logotherapy (meaning)", root: "mixed",
    origin: "Viktor Frankl, a Jewish psychiatrist who survived Auschwitz, taught that people can endure almost anything if they have a “why”. Meaning, love and responsibility heal.",
    today: "Meaning-centred therapy, purpose-based recovery.",
    verdict: "Influenced by his Jewish background and humanist thought. It overlaps with the biblical truth that we are made for purpose and love, but it leaves people to find meaning, while the gospel gives meaning: you are known, loved and sent.", ref: "Eph 2:10; Rom 8:28" },
  { id: "attachment", year: "1950s–60s", method: "Attachment theory", root: "other",
    origin: "John Bowlby showed that children need a secure, responsive attachment figure. Insecure attachment shapes how we cope, love and handle stress throughout life.",
    today: "Attachment-based therapy, Emotionally Focused Therapy for couples, trauma-informed care.",
    verdict: "Discovered by science, not borrowed from the church. But it describes exactly what Scripture shows: we are made for secure love, and God offers himself as a Father who never leaves. Adoption into God’s family is the deepest secure attachment.", ref: "Rom 8:15–16; Ps 27:10; Heb 13:5" },
  { id: "inner", year: "1950s–today", method: "Inner healing prayer", root: "christian",
    origin: "Christian ministers such as Agnes Sanford and later others developed prayer for healing memories. Some newer models use therapy ideas, which shows the borrowing also runs the other way.",
    today: "Inner healing ministries, Immanuel Prayer, Sozo and many others.",
    verdict: "Christian, but mixed in quality. The best forms are humble, Scripture-shaped and work alongside medical care. Weaker forms make big promises, can create false memories, or rely on one leader.", ref: "Ps 147:3; Luke 4:18" }
,
  { id: "mindfulness", year: "1979", method: "Mindfulness (MBSR)", root: "other",
    origin: "Jon Kabat-Zinn created Mindfulness-Based Stress Reduction from Buddhist meditation practice, presented in a secular, scientific form.",
    today: "Mindfulness-based relapse prevention, stress reduction, DBT skills.",
    verdict: "Buddhist roots, now secularised. Christians also have their own long tradition of attentive prayer: stillness, examen, lectio divina and breath prayers. The difference is that Christian attention is not empty awareness but attention to a Person who loves us.", ref: "Ps 46:10; Ps 131:2; 1 Thess 5:17" },
  { id: "forgiveness", year: "1980s–90s", method: "Forgiveness therapy", root: "christian",
    origin: "Psychologists such as Robert Enright and Everett Worthington (a committed Christian) built tested forgiveness programmes. Worthington’s REACH model was shaped by his own faith and his mother’s murder.",
    today: "Forgiveness interventions are used in clinics and studied in many trials.",
    verdict: "Strongly influenced by Christian teaching on forgiveness. The research supports what Jesus taught about forgiving from the heart.", ref: "Matt 18:21–35; Eph 4:32" },
  { id: "selfcompassion", year: "2003", method: "Self-compassion", root: "other",
    origin: "Kristin Neff developed self-compassion research, drawing explicitly on Buddhist ideas of compassion.",
    today: "Used to reduce shame spirals and relapse.",
    verdict: "Buddhist-influenced. Christians receive something deeper than self-compassion: compassion from God. You can be kind to yourself because the Father is kind to you first.", ref: "Ps 103:13–14; Isa 49:15" }
];

/* The two cycles */
RG.rcCycles = {
  shame: [
    { label: "Pain or need", text: "Stress, loneliness or an old wound. The craving rises." },
    { label: "Act out", text: "The habit brings short relief." },
    { label: "Shame", text: "“I am disgusting. God must be sick of me.” Shame attacks the self, not just the action." },
    { label: "Hide", text: "Secrecy and avoiding God and others, like Adam hiding among the trees (Gen 3:8–10)." },
    { label: "Vow harder", text: "“Never again.” Pure willpower, alone." },
    { label: "Isolation and pain grow", text: "Shame is painful, and the quickest painkiller is the habit. The loop closes." }
  ],
  grace: [
    { label: "Pain or need", text: "Same pain, same craving, but noticed with honesty." },
    { label: "Turn toward", text: "Turn to the Father and to a safe person before or after acting (Heb 4:16)." },
    { label: "Confess", text: "Name the act, not “I am trash” but “I did this” (1 John 1:9)." },
    { label: "Received", text: "Forgiven, held, not rejected (Luke 15:20–24). Shame loses its grip." },
    { label: "Repair and learn", text: "Make amends, change the plan, adjust the environment, get help." },
    { label: "Need met in love", text: "Real connection meets the need underneath. The craving weakens over time (Rom 2:4)." }
  ]
};

/* Skeleton: how each approach works in a person's life */
RG.rcSkeleton = {
  secular: [
    { s: "Problem named", t: "“I have a problem with alcohol, porn or trauma.” A diagnosis may help.", k: "ok" },
    { s: "Assessment", t: "Triggers, history, severity and risks. Medical safety first.", k: "ok" },
    { s: "Treatment plan", t: "Therapy, medication, groups and skills.", k: "ok" },
    { s: "Practice", t: "New habits rehearsed over weeks and months.", k: "ok" },
    { s: "Relapse plan", t: "Expected and prepared for, not catastrophised.", k: "ok" },
    { s: "Functioning restored", t: "Fewer symptoms, better life.", k: "ok" },
    { s: "The ceiling", t: "Guilt is managed rather than forgiven. Meaning is self-made. Death still has the last word.", k: "gap" }
  ],
  legal: [
    { s: "Conviction", t: "“This is sin, and God is angry about it.”", k: "ok" },
    { s: "Decision", t: "Repent and decide to stop. Pray for strength.", k: "ok" },
    { s: "Effort", t: "Read more, pray more, try harder, avoid temptation.", k: "mixed" },
    { s: "Failure", t: "Relapse comes. It feels like God is disappointed.", k: "tension" },
    { s: "Shame and hiding", t: "Fear of being found out. “Maybe I’m not really saved.”", k: "tension" },
    { s: "Two outcomes", t: "Either a white-knuckle success that can turn into pride or fear, or a cycle of defeat and giving up.", k: "tension" },
    { s: "Help often refused", t: "Therapy or medication may be seen as weak faith.", k: "tension" }
  ],
  relational: [
    { s: "Loved first", t: "“You are my beloved child.” Identity comes before behaviour (Mark 1:11).", k: "ok" },
    { s: "Safe to be honest", t: "No condemnation, so truth can come out (Rom 8:1; James 5:16).", k: "ok" },
    { s: "Root and fruit", t: "Name the sin and the wound under it: needs, lies, trauma.", k: "ok" },
    { s: "All good means", t: "Prayer, Scripture, church family, plus doctors, therapy and medication where needed.", k: "ok" },
    { s: "Training in grace", t: "Put off, put on. Daily practices, walking by the Spirit (Gal 5:16; Titus 2:11–12).", k: "ok" },
    { s: "Relapse met with grace", t: "Confess, repair, learn, go again. Shame loses its fuel.", k: "ok" },
    { s: "Freedom for love", t: "The goal is not only sobriety but a life of love: serving others with your story (2 Cor 1:3–4).", k: "ok" }
  ]
};

/* Balance: is inner healing over-emphasised? */
RG.rcBalance = [
  { label: "Neglect", title: "Wounds are ignored", signs: ["“Just repent and move on.”", "Trauma treated as weak faith", "Therapy and medication viewed with suspicion", "People mask their pain and relapse in secret"], fix: "Take wounds seriously. Jesus came to bind up the broken-hearted (Luke 4:18), and lament takes up a third of the Psalms." },
  { label: "Suspicious", title: "Healing is allowed but kept at arm’s length", signs: ["Only “spiritual” solutions are trusted", "Pastors try to handle serious trauma alone", "Medication is a last resort tinged with shame"], fix: "Use all of God’s gifts. Refer people to professionals when needs go beyond pastoral care." },
  { label: "Balanced", title: "Christ at the centre, healing in its place", signs: ["Healing serves love and mission", "Sin and wounds both named", "Prayer and professional help work together", "People grow in obedience, joy and service", "Suffering that remains is held with hope"], fix: "This is the goal: whole people living for God and neighbour (Mark 12:30–31)." },
  { label: "Over-focused", title: "Healing becomes the main event", signs: ["Endless inner work, little outward love", "Every problem traced to a wound, never to choice", "Repentance language disappears", "Always processing, rarely serving"], fix: "Healing is a means, not the end. “Whoever loses his life for my sake will find it” (Matt 16:25). Obedience and service also heal." },
  { label: "Distorted", title: "Healing replaces the gospel", signs: ["The self, not Christ, is the centre", "Leaders promise instant freedom or rediscovered memories", "Dependence on one ministry or technique", "People feel failures if they are not “fully healed”"], fix: "Return to Christ himself. Test every method (1 Thess 5:21). Avoid practices that suggest memories, and keep care accountable." }
];

/* Common misunderstandings */
RG.rcMyths = [
  { myth: "If secular methods work, Jesus is unnecessary.", truth: "Secular methods work on the creation level, through how God made us. They cannot forgive sin, reconcile us to God, give eternal life or a new identity. Healing a habit is good. Being reconciled to God is a different and deeper gift." },
  { myth: "Using therapy or medication shows a lack of faith.", truth: "Scripture affirms physicians and means (Luke 5:31; Isa 38:21; 1 Tim 5:23). Using a doctor is no more faithless than wearing glasses. Faith trusts God to work through his gifts." },
  { myth: "Real Christians do not struggle with addiction.", truth: "Paul describes the struggle in Romans 7, and the New Testament letters are written to believers who struggle. Struggle shows that the Spirit is at war with the flesh, not that faith is fake (Gal 5:17)." },
  { myth: "If I pray enough, the craving will vanish instantly.", truth: "Sometimes God gives sudden freedom; more often he works through a process. Both are his grace. Brains rewire over months, and that pace is not a lack of faith." },
  { myth: "Relapse proves I was never saved.", truth: "Relapse is serious, but John writes, “if anyone sins, we have an Advocate with the Father” (1 John 2:1). The question is where you run after falling." },
  { myth: "The relational gospel says sin doesn’t matter, only wounds.", truth: "Sin is real and destructive in the relational gospel too. The difference is how God treats the sinner: as a Father who restores, not a judge looking for a reason to reject." },
  { myth: "Secular psychology stole everything from the Bible.", truth: "Some methods came from Christian practice, such as the Twelve Steps and forgiveness therapy. Others came from Stoicism, Buddhism or science. Much is shared discovery of creation. Honest history avoids both “they stole it” and “the church copied them”." },
  { myth: "Inner healing is the gospel.", truth: "The gospel is Jesus: his life, death, resurrection and the gift of the Spirit. Healing is one fruit of the gospel, not the gospel itself." },
  { myth: "Porn or masturbation struggles always mean addiction.", truth: "Research shows some religious people describe themselves as addicted mainly because of moral conflict and shame, even when their use is moderate. Others have a genuine compulsive problem. Honest assessment matters for the right kind of help." },
  { myth: "Self-effort and grace are opposites.", truth: "Grace is opposed to earning, not to effort (Dallas Willard). “I worked harder than all of them, yet not I, but the grace of God that was with me” (1 Cor 15:10)." }
];
