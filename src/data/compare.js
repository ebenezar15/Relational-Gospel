window.RG = window.RG || {};
var RG = window.RG;

/* Legal gospel vs relational gospel: how each sees the key events, doctrines and practices.
   "Legal" = the popular evangelical forensic framework (God as judge, sin as guilt, penal
   substitution, acquittal by faith, life as obedience), stated in its best form.
   "Relational" = the union / Trinitarian / restorative reading used across this app. */

RG.compare = [
  // ---------------------------------------------------------------- GOD
  {
    id: "nature-of-god",
    topic: "The nature of God",
    group: "God",
    legal: "God is first of all holy, just and righteous, the moral Lawgiver and Judge of all the earth (Gen 18:25). His love is real and wonderful, but it never cancels his justice, so God must punish sin in order to remain true to himself. This framework insists that love and holiness belong together and refuses a soft, sentimental God.",
    relational: "God is a communion of love: Father, Son and Spirit, giving and receiving life in each other forever. “God is love” (1 John 4:8) is not one attribute among many but a description of who God is, and his holiness is the holiness of that love. We know what God is like by looking at Jesus, who is “the exact image of his being” (Heb 1:3), so any picture of God that looks unlike Jesus needs correcting. Classical theology agrees that God has no parts (Aquinas, <em>Summa</em> I, q.3), so his justice and his mercy are not two forces pulling against each other in him.",
    refs: ["1 John 4:8", "1 John 4:16", "Heb 1:3", "John 14:9", "Col 1:15", "Gen 18:25", "Isa 6:3"],
    practice: "You stop approaching God as a courtroom you must survive and start approaching him as a home where you are wanted. Prayer, worship and obedience grow from trust rather than nervous appeasement.",
    fair: "The legal view rightly guards God’s holiness: a God whose love does not hate what destroys his children would not really be love, and the relational view must not shrink God into a mild, indulgent parent."
  },
  {
    id: "sovereignty",
    topic: "Sovereignty",
    group: "God",
    legal: "God is the sovereign King who rules over all things and decrees whatever comes to pass. In its Reformed form, his sovereignty means his will is never frustrated, and salvation depends entirely on his choice and power, not on human effort. This gives believers deep comfort that nothing happens outside his control.",
    relational: "God’s sovereignty is the sovereignty of self-giving love, revealed most clearly when Jesus washes feet and when he reigns from a cross. God is Lord of all, but his way of ruling is persuasive, patient and cruciform, not coercive control of every event. He works in all things for good (Rom 8:28), which is different from saying he causes every evil thing. His power is the power to bring resurrection out of death, and his final victory is certain because love never fails (1 Cor 13:8).",
    refs: ["Rom 8:28", "Phil 2:5-11", "John 13:3-5", "1 Cor 1:23-25", "1 Cor 13:8", "Eph 1:11", "Ps 103:19"],
    practice: "When tragedy strikes you are not forced to believe God sent it; you can trust that he is with you in it and will bring good out of it. You can lament honestly without accusing God or pretending.",
    fair: "The legal view rightly guards the certainty that God is not helpless or merely hopeful; the relational view must not make God so “non-controlling” that Scripture’s confidence in his rule and final victory disappears."
  },
  {
    id: "fear-of-god",
    topic: "The fear of God",
    group: "God",
    legal: "The fear of the Lord is the beginning of wisdom (Prov 9:10): a sober awe before a holy God who judges sin. It includes reverent dread of displeasing him and keeps believers from treating grace lightly. Even New Testament believers are told to work out their salvation “with fear and trembling” (Phil 2:12).",
    relational: "The fear of God in Scripture is mostly awe, reverence and wonder, the kind of trembling joy you feel before something vast and beautiful. John says that “perfect love casts out fear, because fear has punishment” (1 John 4:18), so the terror of punishment is not the goal of the relationship. Awe deepens as love deepens, because the closer you come to God the more overwhelming his goodness becomes. Scripture still contains real warnings, but their aim is to wake us up to life, not to keep us anxious forever.",
    refs: ["Prov 9:10", "1 John 4:18", "Ps 130:4", "Phil 2:12-13", "Heb 12:28-29", "Isa 6:1-5"],
    practice: "You can hold God in deep reverence without living in dread. Awe shows up as attention, gratitude and a desire not to wound love, rather than as constant fear of being rejected.",
    fair: "The legal view rightly guards against casual, chummy familiarity with God; the relational view must keep real awe and not dismiss every biblical warning as merely psychological."
  },
  {
    id: "election",
    topic: "Election and predestination",
    group: "God",
    legal: "In the Reformed form of the legal gospel, God chose before creation a definite number of people to save, and he passes over the rest, who receive the just punishment for their sins (double predestination, as in Calvin and the Westminster Confession). Arminian evangelicals instead say God elects those he foresees will believe. Both versions aim to honour Scripture’s language of God choosing (Eph 1:4; Rom 8:29-30).",
    relational: "Karl Barth argued that Jesus Christ is both the electing God and the elected human: in him God chose humanity for himself, and in him God took the rejection on himself (<em>Church Dogmatics</em> II/2). Election is therefore not a secret list but a name: Jesus, in whom “he chose us … before the foundation of the world” (Eph 1:4). Israel and the church are chosen not instead of others but for others, to carry blessing to all nations (Gen 12:3). Many in this stream see Romans 9–11 ending not in a divided humanity but in God having mercy on all (Rom 11:32). Whether Barth himself taught universal salvation is debated; he refused to affirm or deny it as a system.",
    refs: ["Eph 1:3-11", "Rom 8:29-30", "Rom 9–11", "Rom 11:32", "Gen 12:3", "1 Tim 2:4", "2 Cor 5:14"],
    practice: "You can tell anyone, without hidden fine print, “God has chosen you in Christ.” Your own sense of being chosen becomes a calling to bless others, not a badge that sets you above them.",
    fair: "The legal view rightly guards God’s initiative and grace in salvation (it is not our achievement); the relational view must handle Romans 9 and the reality of human resistance honestly rather than wave them away."
  },

  // ---------------------------------------------------------------- CHRIST
  {
    id: "fall",
    topic: "The Fall",
    group: "Salvation",
    legal: "Adam broke God’s command, and as humanity’s representative his guilt was credited to all his descendants (federal headship, Rom 5:12-19). Humanity now stands condemned before God and is born with a corrupted nature. The Fall explains why everyone needs a Saviour and why the world is broken.",
    relational: "The Fall is humanity turning away from the life and love of God and falling into fear, shame and death (Gen 3:7-10). Adam and Eve hide, but it is God who comes walking and calling, “Where are you?” (Gen 3:9). Irenaeus and Athanasius saw the Fall mainly as a wound and a slide back toward non-being and corruption, rather than first of all a legal debt. The Fall is real and serious, but it is not the deepest truth about us: we were made in Christ before the Fall (Eph 1:4), so the Fall is a distortion of our being, not its definition.",
    refs: ["Gen 3:1-24", "Gen 3:9", "Rom 5:12-21", "1 Cor 15:22", "Eph 1:4", "Wis 2:23-24"],
    practice: "You can face your brokenness honestly without believing it is the truest thing about you. Shame loses its grip when you hear God still calling you by name.",
    fair: "The legal view rightly guards the seriousness and universality of sin (Rom 3:23); the relational view must not downplay the Fall so much that the need for rescue seems small."
  },
  {
    id: "sin",
    topic: "Sin",
    group: "Salvation",
    legal: "Sin is transgression of God’s law (1 John 3:4), rebellion against the holy King, and it makes us guilty before him. Because God is infinitely holy, every sin deserves death and eternal condemnation (Rom 6:23). This view takes sin seriously as moral wrong, not merely as weakness or misfortune.",
    relational: "Sin is real and destructive, but at root it is a sickness and a broken relationship: <em>hamartia</em>, missing the mark of the true humanity we were made for. It is what fear, shame and self-protection do to people who have forgotten they are loved. Sin harms us, others and creation, so God hates it precisely because he loves us. The cure for sin is not first a verdict but healing: union with Christ, who takes our diseased humanity and heals it from the inside.",
    refs: ["Rom 3:23", "Rom 6:23", "1 John 3:4", "Mark 2:17", "Rom 7:15-25", "Jas 1:14-15", "Isa 53:5"],
    practice: "When you sin you go to God as a patient goes to a physician, not as a criminal waiting for sentence. You also see other people’s sin with more compassion, as a wound as well as a wrong.",
    fair: "The legal view rightly guards human responsibility and real moral guilt; the relational view must not make sin sound like mere illness for which no one is accountable."
  },
  {
    id: "law",
    topic: "The Law",
    group: "Christ",
    legal: "God’s Law reveals his holy character and shows us our sin (Rom 3:20), driving us to Christ for mercy. Many evangelicals follow the Reformed division into moral, civil and ceremonial law, holding that the moral law (summed up in the Ten Commandments) still binds Christians as a rule of life. The Law is holy, righteous and good (Rom 7:12).",
    relational: "The Torah was given to a redeemed people as a gift and a covenant way of life, not as a ladder to earn God’s love (Ex 20:2 comes before the commands). Paul calls it a temporary guardian until Christ came (Gal 3:24-25), and in Christ we live by the Spirit, who writes love on our hearts (Jer 31:33; Rom 13:10). The moral/civil/ceremonial division is a later Christian categorisation (developed by Aquinas and Calvin); Jewish tradition counts 613 commandments without that split. Jesus is the fulfilment and the true interpreter of the Law, and love is its whole point (Matt 22:37-40).",
    refs: ["Ex 20:2", "Rom 3:20", "Rom 7:12", "Gal 3:24-25", "Rom 13:8-10", "Matt 5:17", "Jer 31:31-34", "Matt 22:37-40"],
    practice: "You read the commandments as a portrait of what love looks like, not as a checklist to stay in God’s favour. You ask “What does love require here?” rather than “What is the minimum the rule demands?”",
    fair: "The legal view rightly guards the goodness of God’s commands and real moral standards; the relational view must not turn “love” into a vague feeling that excuses ignoring what Scripture actually asks."
  },
  {
    id: "incarnation",
    topic: "The Incarnation",
    group: "Christ",
    legal: "The Son became human so that he could live the perfect life we failed to live and die the death we deserved. As true God and true man he is qualified to be our substitute: human to represent us, divine to bear infinite penalty. The Incarnation is essential, though in practice it is often treated as the necessary preparation for the cross.",
    relational: "The Incarnation is not plan B but the heart of the plan: God joining himself to humanity forever. Athanasius taught that the Son “became human so that we might become divine” (<em>On the Incarnation</em> 54), and Gregory of Nazianzus that “what is not assumed is not healed”. By taking our actual fallen humanity, Christ heals it from the inside, and his whole life, death, resurrection and ascension are one saving work. T.F. Torrance and Baxter Kruger stress that in Jesus, humanity is already brought into the life of the Trinity.",
    refs: ["John 1:14", "Phil 2:6-8", "Heb 2:14-17", "Col 2:9", "2 Pet 1:4", "Rom 8:3"],
    practice: "Your ordinary body and daily life matter to God, because he has lived a human life from the inside. Every part of being human, including work, meals and grief, can be shared with him.",
    fair: "The legal view rightly guards the particular saving work of the cross; the relational view must not so emphasise the Incarnation that Christ’s death becomes an afterthought."
  },
  {
    id: "cross",
    topic: "The cross",
    group: "Christ",
    legal: "On the cross Jesus bore the penalty for our sins as our substitute, satisfying God’s justice so that God could be both just and the justifier of those who believe (Rom 3:26). In the words of The Gospel Coalition, it is “divine satisfaction through divine substitution”. This penal substitution model highlights the cost of grace and the seriousness of sin.",
    relational: "The cross is God in Christ reconciling the world to himself (2 Cor 5:19), not the Father punishing the Son to make himself willing to forgive. Here Jesus enters our deepest darkness, absorbs human violence and sin without retaliating, and forgives his killers (Luke 23:34). The early church spoke of many images together: ransom, victory over death and the devil (<em>Christus Victor</em>), healing, sacrifice, and new exodus. Jesus does bear our sin and its consequences (1 Pet 2:24), but as one with us and with the Father, so the cross reveals God’s heart rather than changing it. Brad Jersak and others prefer to speak of identification rather than penal substitution.",
    refs: ["2 Cor 5:19", "Luke 23:34", "Col 2:13-15", "Heb 2:14-15", "1 Pet 2:24", "Rom 3:21-26", "Isa 53:4-6", "John 12:32"],
    practice: "When you look at the cross you see how far God will go to be with you, not how angry he is with you. It also shapes how you treat enemies: you absorb wrongs rather than pass them on.",
    fair: "The legal view rightly guards the substitutionary language of Scripture (Isa 53; 2 Cor 5:21) and the cost of forgiveness; the relational view must not deny substitution altogether or make the cross merely an example."
  },
  {
    id: "blood-of-christ",
    topic: "The blood of Christ",
    group: "Christ",
    legal: "Without the shedding of blood there is no forgiveness (Heb 9:22). Christ’s blood is the price paid to God’s justice, the evidence that the death penalty for sin has been executed on a substitute. Through faith in his blood we are justified and protected from wrath (Rom 5:9).",
    relational: "In the Hebrew Scriptures “the life is in the blood” (Lev 17:11), so blood is life given, not mainly a penalty paid. Christ’s blood is his own life poured out to cleanse, to make covenant and to bring us near (Eph 2:13; Matt 26:28). In the Passover the blood marked a household for rescue from death, and at the Lord’s table we share in that life (1 Cor 10:16). The emphasis falls on God giving his life to us, rather than on God needing blood before he can love us.",
    refs: ["Lev 17:11", "Heb 9:22", "Matt 26:28", "Eph 2:13", "Rom 5:9", "1 John 1:7", "1 Cor 10:16", "Ex 12:13"],
    practice: "Songs and prayers about the blood become songs about life and nearness: you are cleansed, brought close and made part of a covenant family.",
    fair: "The legal view rightly guards the seriousness of sacrifice and Christ’s real death; the relational view must not spiritualise the blood until the costliness of the cross is lost."
  },
  {
    id: "resurrection",
    topic: "The resurrection",
    group: "Christ",
    legal: "The resurrection proves that God accepted Christ’s payment for sin and vindicates his claims (Rom 4:25). It guarantees the future bodily resurrection of believers. Evangelicals defend it strongly as a historical event at the heart of the faith (1 Cor 15:14).",
    relational: "The resurrection is not only a receipt for a payment but the beginning of new creation: death undone and humanity raised into God’s life. The Eastern Easter hymn sings, “Christ is risen from the dead, trampling down death by death.” When Christ rose, a renewed humanity rose with him, and we are “raised together with him” (Eph 2:6; Col 3:1). The body matters: Jesus is raised bodily, which promises that bodies and the whole creation will be healed, not discarded.",
    refs: ["1 Cor 15:12-28", "1 Cor 15:20-22", "Rom 4:25", "Rom 6:4-5", "Eph 2:5-6", "Col 3:1-4", "Luke 24:39"],
    practice: "You live from resurrection, not toward it: hope becomes a present energy in your life, not merely a ticket for after death. You care for your body and creation because God intends to raise them.",
    fair: "The legal view rightly guards the historical, bodily resurrection; the relational view must not turn it into only a symbol of personal renewal."
  },
  {
    id: "ascension",
    topic: "The ascension",
    group: "Christ",
    legal: "After his resurrection Christ ascended to the Father’s right hand, where he reigns and intercedes for believers as their advocate (Heb 7:25; 1 John 2:1). His presence there assures us that his sacrifice was accepted. The ascension is affirmed but often receives little attention in popular teaching.",
    relational: "In the ascension a human being, our humanity, is taken into the heart of the Trinity. T.F. Torrance and J.B. Torrance emphasised that Christ remains fully human in heaven, our great High Priest who prays and worships on our behalf. Because we are united to him, we are “seated with him in the heavenly places” (Eph 2:6) right now. The ascension also means Christ fills all things (Eph 4:10) and pours out the Spirit (Acts 2:33), so heaven and earth are joined in him.",
    refs: ["Acts 1:9-11", "Acts 2:33", "Eph 1:20-23", "Eph 2:6", "Eph 4:8-10", "Heb 4:14-16", "Heb 7:25"],
    practice: "When your prayer feels weak, you can rest in knowing that Jesus is already praying and worshipping for you, and you simply join in. You can approach God with confidence, because a human friend is at the Father’s side.",
    fair: "The legal view rightly guards Christ’s ongoing advocacy and distinct reign; the relational view must not blur the difference between Christ and us when it speaks of being “seated with him”."
  },
  {
    id: "second-coming",
    topic: "The second coming",
    group: "End",
    legal: "Jesus will return visibly to judge the living and the dead, rewarding believers and condemning unbelievers. Many popular evangelicals hold a dispensational timeline including a rapture, tribulation and millennium, though others are amillennial or postmillennial. The return motivates holiness and evangelism because time is short.",
    relational: "Christ’s appearing (<em>parousia</em>, royal arrival or presence) is the full unveiling of what is already true: that he is Lord and that all things hold together in him (Col 1:17). It is the coming of the Bridegroom and the healer, when the whole creation is set free from decay (Rom 8:19-21). The rapture-and-tribulation timeline is a nineteenth-century development (associated with J.N. Darby) and is debated even among evangelicals. The hope is not escape from earth but heaven coming to earth and God dwelling with humanity (Rev 21:3).",
    refs: ["Acts 1:11", "1 Thess 4:13-18", "Titus 2:13", "Col 3:4", "Rom 8:19-21", "Rev 21:1-5", "1 John 3:2"],
    practice: "You look forward to Christ’s return with longing rather than dread, and you work for justice and healing now as signs of the coming renewal.",
    fair: "The legal view rightly guards a real, future, personal return of Christ and real judgement; the relational view must not reduce the second coming to an inner awareness."
  },

  // ---------------------------------------------------------------- SALVATION
  {
    id: "justification",
    topic: "Justification by faith",
    group: "Salvation",
    legal: "Justification is God’s legal declaration that a sinner is righteous, not because of their works but because Christ’s righteousness is credited to them through faith (imputation, Rom 4:5). It is a once-for-all verdict of acquittal in God’s court. Luther called it the article on which the church stands or falls, and it gives real freedom from trying to earn God’s favour.",
    relational: "Justification is God setting things right, putting us back into right relationship with himself and with one another. The Greek word family (<em>dikaiosynē</em>) covers righteousness and justice, and Christopher Marshall (<em>Beyond Retribution</em>, 2001) argues it is relational and covenantal more than purely forensic. Many in this stream, following Torrance, read Paul’s phrase <em>pistis Christou</em> as “the faithfulness of Christ” (Gal 2:16), a reading that is debated among scholars. On that view, we are justified because Jesus was faithful for us, and our faith is a trusting response to what is already true in him.",
    refs: ["Rom 3:21-26", "Rom 4:5", "Rom 5:1", "Rom 5:18", "Gal 2:16", "2 Cor 5:21", "Isa 53:11"],
    practice: "You can stop measuring whether your faith is strong enough to save you, and instead rest in Christ’s faithfulness. Being made right with God naturally moves you to make things right with people.",
    fair: "The legal view rightly guards the truth that we are accepted by grace, not by our performance, which the Reformation fought hard to recover; the relational view must not lose that clarity in talk of transformation."
  },
  {
    id: "faith",
    topic: "Faith",
    group: "Salvation",
    legal: "Faith is the God-given means by which a person receives salvation: trusting in Christ’s finished work and believing the gospel. It includes knowledge, agreement and personal trust (the Reformers’ <em>notitia</em>, <em>assensus</em>, <em>fiducia</em>). In popular evangelism it is often expressed as a decision or prayer to accept Christ.",
    relational: "Faith is trust and rest in a God who is already faithful, more like a child leaning on a parent than a transaction that switches salvation on. It is first Christ’s own faith and faithfulness toward the Father on our behalf, which we share in by the Spirit (Gal 2:20, KJV: “I live by the faith of the Son of God”). Faith does not create our union with God; it opens our eyes to it and lets us live from it. Contemporary New Creation teachers speak of moving from “faith toward God” to “the faith of God”, meaning we participate in Jesus’ own trust rather than manufacture our own.",
    refs: ["Gal 2:20", "Eph 2:8-9", "Heb 11:1", "Heb 12:2", "Rom 10:9-10", "Mark 9:24"],
    practice: "Doubt no longer feels like losing your salvation; you can pray, “I believe; help my unbelief” and lean on Jesus’ faithfulness. Faith grows like a friendship, through time and attention.",
    fair: "The legal view rightly guards the need for a real, personal response of faith (Rom 10:9-10); the relational view must not make faith so automatic that personal trust appears unnecessary."
  },
  {
    id: "grace",
    topic: "Grace",
    group: "Salvation",
    legal: "Grace is God’s undeserved favour, given to sinners who deserve only judgement. It is the free gift of salvation provided through Christ’s payment, received by faith and not by works (Eph 2:8-9). Grace is “amazing” precisely because our guilt is so great.",
    relational: "Grace is God giving himself, his own life and presence, not only a favourable status. It is not God’s reluctant concession to sinners but the overflow of the Trinity’s love, which was there before sin and will be there after it. In this stream grace also empowers: it “teaches us” to live well (Titus 2:11-12) and makes us partakers of the divine nature (2 Pet 1:4). Grace is the atmosphere of our whole life, not only the entrance gate.",
    refs: ["Eph 2:4-9", "Titus 2:11-14", "John 1:16-17", "2 Cor 12:9", "Rom 5:20-21", "2 Pet 1:3-4"],
    practice: "You stop treating grace as a one-time pardon and begin receiving it daily as strength, comfort and change. You also extend that same undeserved kindness to people around you.",
    fair: "The legal view rightly guards grace as unearned mercy toward the guilty; the relational view must not drift into a “hyper-grace” that dismisses repentance and holiness, a criticism often made of this stream."
  },
  {
    id: "repentance",
    topic: "Repentance",
    group: "Salvation",
    legal: "Repentance is turning from sin to God with sorrow, confession and a resolve to obey. It is necessary for salvation alongside faith (Acts 3:19; Acts 20:21). Genuine repentance shows itself in changed behaviour and protects against cheap grace.",
    relational: "The Greek <em>metanoia</em> means a change of mind, a new way of seeing. Repentance is turning around to see that God has already turned toward us, like the prodigal who “came to himself” and found a running Father (Luke 15:17-20). Paul says it is God’s kindness that leads us to repentance (Rom 2:4). Repentance is not paying for sin with tears but waking up to love, and it naturally leads to turning away from what harms.",
    refs: ["Mark 1:15", "Luke 15:11-32", "Rom 2:4", "Acts 3:19", "2 Cor 7:10", "Matt 3:8"],
    practice: "You can repent often and quickly, without spiralling into self-punishment, because you are turning toward kindness. Repentance becomes a daily rethink of how you see God, yourself and others.",
    fair: "The legal view rightly guards real sorrow for sin and real change of behaviour (“fruit in keeping with repentance”); the relational view must not reduce repentance to a change of opinion with no change of life."
  },
  {
    id: "forgiveness-from-god",
    topic: "Forgiveness from God",
    group: "Salvation",
    legal: "God forgives sinners because Christ paid their debt; forgiveness is the cancelling of guilt on the basis of a satisfied penalty. Believers are forgiven once for all at conversion as to their legal standing, and they confess sins to restore fellowship. This gives a solid, objective ground for peace with God.",
    relational: "Forgiveness flows from who God is, not from a payment that makes him willing. Jesus forgave people freely before the cross (Mark 2:5; Luke 7:48), and on the cross he prayed, “Father, forgive them” (Luke 23:34). The New Testament speaks of God “not counting their trespasses against them” (2 Cor 5:19) and of forgiveness offered to all. George MacDonald, in his sermon “Justice”, wrote that “God is not bound to punish sin; he is bound to destroy sin”: forgiveness is aimed at healing the sinner, not at settling an account.",
    refs: ["Luke 23:34", "Mark 2:5", "2 Cor 5:19", "Col 2:13-14", "Eph 1:7", "Ps 103:10-12", "Mic 7:18-19"],
    practice: "You can receive forgiveness as a gift already given, not something to extract through enough remorse. Freed from fear, you can look at your sin honestly and let God heal it.",
    fair: "The legal view rightly guards forgiveness as costly and grounded in Christ’s work (Eph 1:7); the relational view must not make forgiveness sound cheap or irrelevant to the cross."
  },
  {
    id: "forgiving-others",
    topic: "Forgiving other people",
    group: "Salvation",
    legal: "Because God has forgiven us so great a debt, we are commanded to forgive others (Col 3:13). Refusing to forgive is serious disobedience, and Jesus warns that the unforgiving will not be forgiven (Matt 6:14-15). Forgiveness is often presented as a choice of the will to release the debt.",
    relational: "Forgiving others is sharing in God’s own forgiving life: we forgive because we are “in” the one who forgives. Forgiveness releases the debt but does not require pretending the harm did not happen, and it is distinct from reconciliation or trust, which may need time and changed behaviour. Jesus’ warning in Matthew 18 shows that refusing mercy shuts us inside our own prison, not that God loves us less. Forgiveness is often a process, especially after serious abuse, and grace can meet people in that process.",
    refs: ["Matt 6:12-15", "Matt 18:21-35", "Col 3:13", "Eph 4:31-32", "Luke 17:3-4", "Rom 12:17-21"],
    practice: "You can forgive someone without excusing them, and without putting yourself back in harm’s way. Forgiveness becomes a path of freedom you walk with God, not a test you must pass instantly.",
    fair: "The legal view rightly guards the seriousness of Jesus’ command to forgive; the relational view must not use “process” language as a permanent excuse never to forgive."
  },
  {
    id: "reconciliation",
    topic: "Reconciliation",
    group: "Salvation",
    legal: "Reconciliation means that sinners who were God’s enemies are brought into peace with him because Christ removed the barrier of guilt and wrath (Rom 5:10). It is offered to all but becomes effective for each person when they believe. Believers then carry this message to others.",
    relational: "Paul says God “was in Christ reconciling the world to himself” (2 Cor 5:19): the reconciling was done by God, toward us, for the whole world. God was never the one who needed to be reconciled; we were the ones estranged in our minds (Col 1:21). The message of reconciliation is therefore an announcement: “Be reconciled to God” means awaken to and welcome a peace already made. Reconciliation also reaches across human walls: Jew and Gentile made one new humanity (Eph 2:14-16).",
    refs: ["2 Cor 5:17-21", "Rom 5:10-11", "Col 1:19-22", "Eph 2:14-16", "Matt 5:23-24"],
    practice: "You share the gospel as good news of a peace already made, not as a sales pitch. You also work for reconciliation between people, races and churches as part of that same message.",
    fair: "The legal view rightly guards the need for each person to receive reconciliation (“be reconciled”); the relational view must not imply that a person’s response simply does not matter."
  },
  {
    id: "salvation",
    topic: "Salvation",
    group: "Salvation",
    legal: "Salvation is being rescued from the penalty of sin (God’s wrath and hell) through faith in Christ, with the promise of heaven after death. It has a past tense (justification), a present (sanctification) and a future (glorification). Popular preaching often focuses on knowing where you will go when you die.",
    relational: "Salvation (<em>sōtēria</em>) means rescue, healing and wholeness: the same word family is used when Jesus heals people (“your faith has made you whole”, Mark 5:34). It is participation in the life of the Trinity, beginning now and fulfilled in new creation, what the Eastern church calls <em>theosis</em>. One contemporary New Creation teacher contrasts a “tragic ontology” (humanity defined by the Fall) with a “salvific ontology” (humanity defined by Christ) and describes the gospel as “awakening to who we have always been in Christ”; his own teaching is the source to consult for that framing. It echoes Irenaeus and Athanasius, who saw salvation as a change in human being brought about by the Incarnation.",
    refs: ["Mark 5:34", "John 17:3", "Eph 2:4-10", "2 Pet 1:4", "Titus 3:4-7", "Rom 8:29", "Col 1:27"],
    practice: "Salvation becomes something you live in today (healing of fear, shame and relationships), not only a destination after death. You ask “How is God making me whole right now?”",
    fair: "The legal view rightly guards rescue from real judgement and a clear call to respond; the relational view must not dissolve salvation into general wellbeing or self-discovery."
  },
  {
    id: "new-birth",
    topic: "The new birth",
    group: "Salvation",
    legal: "The new birth (regeneration) is the Holy Spirit giving spiritual life to a person dead in sin, so that they repent and believe (John 3:3-7). In popular evangelicalism it is linked to a conversion moment, often called being “born again”. It marks the line between the saved and the lost.",
    relational: "The new birth is being born “from above” (<em>anōthen</em>, John 3:3) into the life that already belongs to us in Christ. Peter says we were born again “through the resurrection of Jesus Christ from the dead” (1 Pet 1:3), which places the new birth first in Christ’s own rising and then in our awakening to it by the Spirit. It may come as a crisis moment or as a gradual dawning, and both are real. The new birth is not becoming someone else but becoming who we truly are.",
    refs: ["John 3:3-8", "1 Pet 1:3", "1 Pet 1:23", "Titus 3:5", "2 Cor 5:17", "John 1:12-13"],
    practice: "You do not have to doubt your faith because you cannot name a date of conversion. You also expect real newness of life, because the Spirit is truly at work in you.",
    fair: "The legal view rightly guards the need for genuine spiritual change in each person; the relational view must not erase the difference between those who have awakened to Christ and those who have not."
  },
  {
    id: "identity",
    topic: "Identity",
    group: "Salvation",
    legal: "In the legal frame, a believer’s identity is “a sinner saved by grace”: forgiven, declared righteous, adopted, yet still struggling with sin. Some stress that we remain sinners to keep humility; others emphasise our new standing in Christ. The aim is to keep both grace and humility in view.",
    relational: "Your deepest identity is beloved child of the Father, made in God’s image and included in Christ (Eph 1:4-6). At Jesus’ baptism the Father says, “You are my beloved Son” before Jesus has done any public ministry (Mark 1:11), and in Christ those words are spoken over us. Paul calls believers “saints” and “new creation” rather than “sinners” as their primary name (1 Cor 1:2; 2 Cor 5:17). Sin is real behaviour, but it is not who you are; you behave your way out of who you are, not into it.",
    refs: ["Mark 1:11", "Eph 1:4-6", "2 Cor 5:17", "1 Cor 1:2", "Gal 4:6-7", "1 John 3:1-2", "Col 3:3"],
    practice: "You start the day knowing you are loved before you have done anything. Temptation loses strength when you see sin as being untrue to yourself, not as expressing the “real you”.",
    fair: "The legal view rightly guards humility and honesty about ongoing sin (1 John 1:8); the relational view must not let “new creation identity” become denial of real struggles."
  },
  {
    id: "self-worth",
    topic: "Self-love and self-worth",
    group: "Salvation",
    legal: "Many evangelicals are cautious about self-love, stressing self-denial (Luke 9:23) and warning against pride. Some older hymns and preaching emphasise human unworthiness, such as Isaac Watts’ line “for such a worm as I” (often called “worm theology”, from Ps 22:6). The best of this view guards against self-centredness and puts our worth in God’s grace rather than in our achievements.",
    relational: "Jesus says, “love your neighbour as yourself” (Matt 22:39), which assumes a proper love of self; Paul says “no one ever hated his own flesh, but nourishes and cherishes it” (Eph 5:29). Every person bears the image of God (Gen 1:27) and is valued at the price of Christ himself, so contempt for yourself is not humility but a denial of what God says about you. Healthy self-love is receiving God’s love for you and caring for yourself as God’s beloved, which frees you to give yourself away. This is the opposite of narcissism, which is a fragile, grasping self-focus born from not knowing you are loved; Psalm 22:6 is a cry of anguish (quoted at the cross), not a definition of human nature.",
    refs: ["Matt 22:39", "Eph 5:29", "Gen 1:26-27", "Ps 139:13-14", "Ps 8:4-6", "Luke 9:23-24", "Ps 22:6", "Phil 2:3-4"],
    practice: "You speak to yourself the way God speaks to you: honestly, but kindly. You rest, eat and care for your body and heart without guilt, and you say no to self-hatred as you would say no to any lie.",
    fair: "The legal view rightly warns against pride and self-absorption (2 Tim 3:2); the relational view must make clear that self-love means receiving God’s love, not putting yourself at the centre."
  },
  {
    id: "assurance",
    topic: "Assurance",
    group: "Salvation",
    legal: "Assurance comes from trusting God’s promises (1 John 5:13), the inner witness of the Spirit, and the evidence of a changed life. Reformed teaching warns against false assurance and encourages self-examination (2 Cor 13:5). Many believers find great comfort in the objective promise that whoever believes has eternal life.",
    relational: "Assurance rests on Christ, not on the quality of your faith or the evidence of your fruit. Because your life is “hidden with Christ in God” (Col 3:3) and he is faithful even when we are faithless (2 Tim 2:13), your security is as secure as Jesus is. The Spirit cries “Abba, Father” within us (Rom 8:15-16), which is assurance as an experience of belonging. Introspection that constantly checks for enough fruit often breeds anxiety; looking at Jesus breeds confidence.",
    refs: ["Col 3:3", "2 Tim 2:13", "Rom 8:15-16", "Rom 8:38-39", "John 10:28-29", "1 John 5:13", "2 Cor 13:5"],
    practice: "You can stop asking “Am I really saved?” every time you fail. Instead you look at Christ and hear again that you belong.",
    fair: "The legal view rightly guards against presumption by asking whether faith is real (Jas 2:17); the relational view must still take seriously the call to self-examination."
  },

  // ---------------------------------------------------------------- LIFE
  {
    id: "sanctification",
    topic: "Sanctification and holiness",
    group: "Life",
    legal: "Sanctification is the lifelong process by which a justified believer, helped by the Spirit, grows in holiness and becomes more obedient to God’s commands. Justification is God’s once-for-all verdict; sanctification is the gradual change that follows, and the two must never be confused. Its best form insists that grace is never a licence to keep sinning (Rom 6:1-2) and calls believers to real moral seriousness and discipline.",
    relational: "Holiness is not first a moral achievement but a belonging: to be “holy” is to be set apart for God and filled with his life, and in Christ we are already “sanctified” (1 Cor 1:2; 1 Cor 1:30; Heb 10:10). Growth in holiness is becoming outwardly what we already are inwardly, as we behold the Lord’s glory and are “transformed into the same image from glory to glory” (2 Cor 3:18). The Eastern church calls this lifelong journey <em>theosis</em>, sharing ever more deeply in the divine life (2 Pet 1:4). The engine of change is not fear of falling short but love, attention and the Spirit’s quiet work, so holiness looks like Jesus: humble, joyful, merciful and free.",
    refs: ["1 Cor 1:2", "1 Cor 1:30", "Heb 10:10", "Heb 10:14", "2 Cor 3:18", "Rom 6:1-14", "1 Thess 5:23-24", "2 Pet 1:3-8", "Heb 12:14"],
    practice: "You pursue holiness by spending time with Jesus and letting love reshape your habits, not by white-knuckled willpower alone. When you fail, you return to who you are in him rather than starting over from zero.",
    fair: "The legal view rightly guards the call to real, costly growth in holiness (“without which no one will see the Lord”, Heb 12:14); the relational view must not let “already holy in Christ” become an excuse for not changing."
  },
  {
    id: "obedience",
    topic: "Obedience",
    group: "Life",
    legal: "Obedience is the believer’s grateful response to salvation: keeping God’s commands because he is Lord and because Jesus said, “If you love me, keep my commandments” (John 14:15). It is not the ground of salvation, but it is its necessary evidence. At its best this view refuses a faith that is all talk, and it honours God’s wisdom in giving clear moral direction.",
    relational: "Paul speaks of “the obedience of faith” (Rom 1:5; Rom 16:26): obedience that grows out of trust, the way a child follows a parent they know is good. The Greek word for obey (<em>hypakouō</em>) has “hearing” at its root, so obedience is listening closely to the voice of love and responding. Jesus’ own obedience to the Father flowed from intimate union (“I do only what I see the Father doing”, John 5:19), and we share in his obedience rather than producing our own. Commands are not hoops to jump through but descriptions of what life in the Trinity’s love looks like on earth.",
    refs: ["Rom 1:5", "John 14:15", "John 14:23", "John 5:19", "John 15:9-14", "Phil 2:12-13", "1 John 5:3", "Heb 5:8"],
    practice: "You obey by first listening: in prayer, in Scripture and in community, asking what love is asking of you today. Obedience becomes a response to being loved, not a payment to keep being loved.",
    fair: "The legal view rightly guards the fact that Jesus really does command and expects to be obeyed (Luke 6:46); the relational view must not make obedience optional or purely a matter of feeling."
  },
  {
    id: "holy-spirit",
    topic: "The Holy Spirit",
    group: "Life",
    legal: "The Holy Spirit is the third person of the Trinity, who convicts the world of sin, regenerates believers, indwells them and helps them obey (John 16:8; Gal 5:16). He seals believers until the day of redemption (Eph 1:13-14). Many evangelicals stress his work through Scripture and are cautious about subjective experience, guarding against error and emotionalism.",
    relational: "The Spirit is the bond of love between the Father and the Son, now poured into our hearts (Rom 5:5), so that we share in the Son’s own cry, “Abba, Father” (Gal 4:6). He is not only a helper for moral effort but the presence of God himself, making Christ real in us and us real in Christ. The Spirit was poured out “on all flesh” (Acts 2:17), and he works in creation, in the church and far beyond it, drawing everything toward Jesus. In this stream the Spirit’s fruit (love, joy, peace) is the true sign of his presence, and experiences of his nearness, from quiet peace to ecstatic joy (Eph 5:18; Acts 2:13-15), are welcomed as fruits of union rather than ladders to reach God.",
    refs: ["Rom 5:5", "Rom 8:9-16", "Gal 4:6", "Gal 5:22-23", "John 14:16-17", "John 16:8-15", "Acts 2:17", "Eph 5:18"],
    practice: "You can expect God’s real presence and comfort in ordinary moments, not only in big meetings. You test experiences by their fruit: do they make you more loving, humble and Christlike?",
    fair: "The legal view rightly guards against experience-driven excess and teachings untethered from Scripture; the relational view must keep testing the spirits (1 John 4:1), a caution critics raise especially about ecstatic “drunken glory” emphases."
  },
  {
    id: "spiritual-gifts",
    topic: "Spiritual gifts",
    group: "Life",
    legal: "Spiritual gifts are abilities given by the Spirit for building up the church (1 Cor 12:7). Cessationists believe the miraculous sign gifts (such as tongues and prophecy) ended with the apostles, while continuationists believe they continue under careful order. Both sides stress that gifts must be governed by Scripture and used decently and in order (1 Cor 14:40).",
    relational: "Gifts (<em>charismata</em>) are expressions of grace (<em>charis</em>): the one Spirit sharing his life through every member of the body for the good of all (1 Cor 12:4-7). In this stream they are expected and welcomed today, not as status symbols or proofs of spiritual rank, but as ways God’s love touches people. Paul places the great chapter on love (1 Cor 13) right in the middle of his teaching on gifts, which shows that love is the purpose and the measure of them all. Every believer has something to give, so no one is merely an audience.",
    refs: ["1 Cor 12:4-31", "1 Cor 13:1-13", "1 Cor 14:1-40", "Rom 12:4-8", "Eph 4:7-13", "1 Pet 4:10-11"],
    practice: "You look for what God has given you to share and offer it simply, without needing a title. You value love above impressive displays in yourself and in others.",
    fair: "The legal view rightly guards order, accountability and testing of prophecy (1 Thess 5:20-21); the relational view must not treat dramatic gifts as proof of maturity or let leaders use them to manipulate."
  },
  {
    id: "healing",
    topic: "Healing",
    group: "Life",
    legal: "Many evangelicals believe God can heal in answer to prayer, but they treat physical healing as a possible blessing, not a guaranteed part of salvation in this life. Some see sickness as something God may permit or use for discipline and growth, and they stress that the final healing comes at the resurrection. The strength of this view is its honesty about unanswered prayer and its refusal to blame the sick for lacking faith.",
    relational: "Jesus healed everyone who came to him (Matt 4:23-24; Acts 10:38), and he is the perfect picture of the Father’s will, so the relational stream sees sickness as an enemy Jesus opposes, not a tool God uses to punish his children. Salvation (<em>sōzō</em>) includes the whole person, body as well as soul, and healing is a sign that the kingdom has come near. A recent book on embodied New Creation theology (2026) argues that “healing is not a perk of salvation, it is the embodiment of it”, that God does not use disease to discipline his children, and that the body is “not a souvenir of Adam but a sanctuary for Christ”, drawing on Scripture, the early church fathers and nervous-system science. Healing can be sudden or gradual, through prayer, medicine, rest and community, and the final healing of all things is still to come.",
    refs: ["Matt 4:23-24", "Matt 8:16-17", "Acts 10:38", "Jas 5:14-16", "Isa 53:4-5", "Mark 16:18", "1 Cor 12:9", "Rom 8:11"],
    practice: "You pray for the sick with confidence that God is for their healing, and you also welcome doctors, medicine and rest as part of God’s care. When healing does not come, you stay with the person in love instead of blaming their faith.",
    fair: "The legal view rightly guards against promising healing on demand and against shaming those who stay sick; the relational view must be honest that faithful people, including Paul’s friends (2 Tim 4:20), are not always healed in this life."
  },
  {
    id: "body",
    topic: "The body",
    group: "Life",
    legal: "The body is God’s good creation and will be raised, but in popular preaching the main concern is the soul and its eternal destiny. The body is often treated mainly as a source of temptation to be disciplined (1 Cor 9:27). This view rightly takes seriously the struggle with bodily desires and the call to self-control.",
    relational: "God’s story moves through bodies: he forms Adam from the dust, takes a body in the Incarnation, is raised bodily, and fills our bodies with his Spirit as temples (1 Cor 6:19). A gospel that rescues the soul and leaves the body behind misses this, which is the concern a recent book on embodied New Creation theology (2026) raises against treating sickness as a teacher, death as a promotion and heaven as an escape. The early church fought Gnostic contempt for matter, and Irenaeus insisted that the flesh itself is saved. Our bodies are where we pray, love, rest and serve, and they are part of the creation God will make new.",
    refs: ["Gen 2:7", "John 1:14", "1 Cor 6:19-20", "Rom 12:1", "Rom 8:11", "Rom 8:23", "1 Cor 15:42-44", "Phil 3:21"],
    practice: "You honour God by caring for your body through sleep, food, movement and touch, and by letting worship and prayer involve your whole self. You stop treating your body as an enemy or a mere container.",
    fair: "The legal view rightly guards self-control and warns against indulging the flesh (Gal 5:16-17); the relational view must not make bodily health or feelings the measure of spirituality."
  },
  {
    id: "suffering",
    topic: "Suffering",
    group: "Life",
    legal: "Suffering is a result of living in a fallen world, and God, in his sovereignty, permits or ordains it for his glory and our good (Rom 8:28; Jas 1:2-4). It can be discipline from a loving Father (Heb 12:6) and a means of growing in holiness. At its best this view gives deep stability to believers, assuring them that their pain is not meaningless or out of God’s hands.",
    relational: "In Jesus, God does not stand above our suffering explaining it; he enters it, weeps at a grave (John 11:35) and cries out from the cross, “My God, my God, why have you forsaken me?” (Mark 15:34, quoting Ps 22). Suffering is not God’s plan for his children, but God is present in it and can bring good out of what he did not will. We share in Christ’s sufferings (Phil 3:10) as we love in a broken world, and that suffering is a road to resurrection, not a punishment. This view takes lament seriously, as the Psalms and Job do, and refuses to give quick answers that blame God or the sufferer.",
    refs: ["John 11:33-35", "Mark 15:34", "Rom 8:18-28", "2 Cor 1:3-7", "Phil 3:10-11", "Heb 12:5-11", "Rev 21:4", "Job 42:7"],
    practice: "When you suffer, you can be honest with God, cry out and grieve, and trust that he is suffering with you. When others suffer, you sit with them rather than rushing to explain.",
    fair: "The legal view rightly guards God’s sovereignty and the real biblical theme that God disciplines his children (Heb 12:5-11); the relational view must not dismiss these texts simply because they are hard."
  },
  {
    id: "work-vocation",
    topic: "Work and vocation",
    group: "Life",
    legal: "Work is a creation mandate (Gen 2:15) and should be done diligently as to the Lord (Col 3:23). Popular evangelicalism, however, often treats “ministry” and evangelism as the most important work, with daily jobs valued mainly as a platform for witness or a source of income for missions. The Reformers, notably Luther, pushed back on this by teaching that every honest calling serves God.",
    relational: "In Eden, before any sin, Adam is placed in the garden “to cultivate and keep it” (Gen 2:15), so work is part of our image-bearing partnership with God, not a curse. Paul says, “Whatever you do, work heartily, as for the Lord” (Col 3:23), which removes the wall between sacred and secular. Because Christ fills all things, every task done in love (teaching, nursing, plumbing, parenting, art) is participation in God’s care for his world. The kingdom comes not only through church activities but through ordinary faithful work that brings order, beauty and justice.",
    refs: ["Gen 1:28", "Gen 2:15", "Col 3:17", "Col 3:23-24", "Eph 4:28", "1 Cor 10:31", "Eccl 2:24", "Prov 22:29"],
    practice: "You stop thinking your “real” service to God happens only on Sundays. You offer your work to God each morning and look for ways it can bless people and creation.",
    fair: "The legal view rightly guards the urgency of the gospel message and the church’s distinct mission; the relational view must not reduce mission to good work while forgetting to speak of Christ."
  },
  {
    id: "rest-sabbath",
    topic: "Rest and Sabbath",
    group: "Life",
    legal: "Some evangelicals (especially Reformed sabbatarians) hold that the fourth commandment continues as a Christian Sabbath on Sunday, with work and recreation set aside for worship. Others teach that the Sabbath was fulfilled in Christ and that Sunday is a day of gathering, not a strict law. Both views value regular worship and rest as obedience to God’s design.",
    relational: "God rested on the seventh day (Gen 2:2-3), and humanity was created on the sixth, so our first full day was a day of rest: we begin with God’s finished work, not our own. Jesus said, “The Sabbath was made for man, not man for the Sabbath” (Mark 2:27), and he healed on the Sabbath as a sign of its true purpose. Hebrews speaks of entering God’s rest by ceasing from our own works (Heb 4:9-10), and Jesus invites the weary, “Come to me … and I will give you rest” (Matt 11:28). Sabbath becomes a weekly practice of trust and delight and a whole posture of resting in the finished work of Christ.",
    refs: ["Gen 2:2-3", "Ex 20:8-11", "Deut 5:12-15", "Mark 2:27-28", "Matt 11:28-30", "Heb 4:1-11", "Col 2:16-17"],
    practice: "You set aside regular time to stop, rest and enjoy God and others, without guilt. Even in busy seasons, you work from rest, not for it.",
    fair: "The legal view rightly guards a real, regular, embodied practice of rest and worship; the relational view must not make “resting in Christ” so spiritual that people never actually stop working."
  },
  {
    id: "marriage-family",
    topic: "Marriage and family",
    group: "Life",
    legal: "Marriage is a covenant between one man and one woman, instituted by God at creation (Gen 2:24; Matt 19:4-6). Many evangelicals teach complementarian roles of husband as loving head and wife as helper, while egalitarian evangelicals emphasise mutual submission. Both stress faithfulness, covenant commitment and raising children in the Lord.",
    relational: "Marriage is a small picture of a great mystery: Christ and the church (Eph 5:32) and, behind that, the self-giving love of the Trinity. Paul begins his teaching with “submitting to one another in the fear of Christ” (Eph 5:21) and calls husbands to love as Christ loved, by giving himself up (Eph 5:25), so the shape of marriage is mutual self-giving, not control. Families are places where people learn they are beloved, where forgiveness is practised and where children meet a Christlike God. Single people are also fully part of God’s family; Jesus himself was unmarried, and the church is a household for all (Mark 3:34-35).",
    refs: ["Gen 2:18-25", "Eph 5:21-33", "Col 3:18-21", "1 Cor 7:1-40", "Mark 3:34-35", "1 John 4:7-12", "Mal 2:14"],
    practice: "You treat your spouse and children the way God treats you: with patience, delight and quick forgiveness. You make your home a place where everyone, including single friends, finds belonging.",
    fair: "The legal view rightly guards covenant faithfulness and clear biblical commitments about marriage; the relational view must be honest that Christians still disagree on questions like roles and sexuality and must not claim easy unanimity."
  },

  // ---------------------------------------------------------------- PRACTICES
  {
    id: "prayer",
    topic: "Prayer",
    group: "Practices",
    legal: "Prayer is the believer’s privilege of approaching a holy God through the mediation of Christ, made possible because the barrier of sin has been removed (Heb 10:19-22). It includes adoration, confession, thanksgiving and supplication (the well-known ACTS pattern). This view rightly honours the wonder that sinners may speak to God at all and calls for discipline and persistence in prayer.",
    relational: "Prayer is joining a conversation that is already going on: the Son’s eternal communion with the Father in the Spirit. Because Jesus is our great High Priest who “always lives to make intercession” (Heb 7:25), and the Spirit “intercedes for us with groanings which can’t be uttered” (Rom 8:26), we never pray alone or from the outside. J.B. Torrance described Christian worship and prayer as participating by the Spirit in the Son’s communion with the Father. So prayer can be words, silence, tears, listening or simple awareness of being loved; it is less about getting God’s attention and more about giving him ours.",
    refs: ["Matt 6:5-13", "Rom 8:15", "Rom 8:26-27", "Heb 4:14-16", "Heb 7:25", "1 Thess 5:17", "Phil 4:6-7", "Luke 11:1-13"],
    practice: "You start prayer by remembering you are already in God’s presence, not by trying to get there. Short, honest prayers through the day matter as much as long prayer times.",
    fair: "The legal view rightly guards reverence and confession in prayer and the discipline of praying when we do not feel like it; the relational view must not turn prayer into only a vague feeling of presence."
  },
  {
    id: "worship",
    topic: "Worship",
    group: "Practices",
    legal: "Worship is giving God the glory he deserves as Creator and Redeemer, in obedience to his revealed will. Many evangelicals emphasise preaching as the high point of the service and singing as a response of gratitude for salvation. At its best this view keeps worship centred on God rather than on entertainment or human performance.",
    relational: "Worship is not first something we generate but something we join: Christ is the true worshipper, “the minister of the holy places” who leads our praise (Heb 8:2; Heb 2:12). J.B. Torrance, in <em>Worship, Community and the Triune God of Grace</em> (1996), contrasted a “unitarian” view of worship (us doing something to God) with a Trinitarian view (sharing by the Spirit in the Son’s offering to the Father). Worship includes song and silence, sacrament and service, and it reaches into ordinary life: “present your bodies a living sacrifice” (Rom 12:1). Because it is participation in the Trinity’s joy, worship can be free, glad and even exuberant.",
    refs: ["John 4:23-24", "Rom 12:1-2", "Heb 2:12", "Heb 8:1-2", "Heb 13:15-16", "Ps 100", "Rev 4–5", "Eph 5:18-20"],
    practice: "On Sunday you stop feeling you must work up the right emotion; you join Jesus’ own worship and let it carry you. During the week you worship through kindness, work and rest.",
    fair: "The legal view rightly guards the centrality of God’s Word and God’s glory in worship; the relational view must not let freedom in worship slide into self-focus or spectacle."
  },
  {
    id: "bible-reading",
    topic: "Bible reading",
    group: "Practices",
    legal: "Scripture is the inspired, inerrant Word of God and the final authority for faith and life (2 Tim 3:16). Believers are encouraged to read it daily, study it carefully and obey it. The great strength of this approach is its love for Scripture and its insistence that God has spoken clearly and that his Word stands above every human opinion.",
    relational: "Scripture is God-breathed, and its centre and lens is Jesus: “You search the Scriptures … these are they which testify about me” (John 5:39). In this stream Christ is “perfect theology”, so every text, especially hard ones about divine violence, is read in the light of the crucified and risen Lord (Luke 24:27; Heb 1:1-3), a “cruciform hermeneutic” developed by Greg Boyd and Brad Jersak. Reading becomes less like searching a rulebook and more like listening to the Word himself speak through the words. Ancient practices like <em>lectio divina</em> (slow, prayerful reading) and reading with the community and the church fathers help guard against private, idiosyncratic readings.",
    refs: ["2 Tim 3:14-17", "John 5:39-40", "Luke 24:27", "Luke 24:44-45", "Heb 1:1-3", "John 1:1-14", "Ps 119:105"],
    practice: "You read the Bible to meet Jesus, asking “What does this show me of Christ?” You read slowly, pray through what you read and talk it over with others.",
    fair: "The legal view rightly guards the full authority of all of Scripture; the relational view must not use “Christ-centred reading” to quietly discard texts it finds uncomfortable without honest wrestling."
  },
  {
    id: "fasting",
    topic: "Fasting",
    group: "Practices",
    legal: "Fasting is a spiritual discipline of abstaining from food for a time to seek God, express repentance or prepare for important decisions (Acts 13:2-3). Jesus assumed his followers would fast (“when you fast”, Matt 6:16). Many evangelicals encourage it as a way to humble oneself and to strengthen prayer.",
    relational: "Fasting is not a way to twist God’s arm or earn answers, but a way of making space to hunger for the God who already feeds us. Isaiah 58 describes the fast God chooses: loosing the bonds of injustice, sharing bread with the hungry and not hiding from your own flesh. Jesus said his disciples would fast when the bridegroom was taken (Mark 2:19-20), so fasting is an act of longing and love, not self-punishment. Because the body is good, fasting is done wisely and gently, never as contempt for the body, and those with health concerns or eating disorders may fast from other things instead.",
    refs: ["Matt 6:16-18", "Mark 2:18-20", "Isa 58:3-12", "Acts 13:2-3", "Joel 2:12-13", "Matt 4:1-4"],
    practice: "You might fast a meal and use the hunger to pray, or give the food money to someone in need. You fast from things like screens or noise when food fasting is not wise for you.",
    fair: "The legal view rightly guards fasting as a real, expected discipline; the relational view must not let “not earning anything” become a reason never to practise it."
  },
  {
    id: "confession",
    topic: "Confession of sin",
    group: "Practices",
    legal: "Believers are called to confess their sins regularly to God, who promises: “If we confess our sins, he is faithful and righteous to forgive us the sins” (1 John 1:9). Many evangelicals teach that confession keeps fellowship with God unbroken, even though the believer’s legal standing is secure. This practice guards against hiding sin and complacency.",
    relational: "In context, 1 John 1 is addressing people who claimed they had no sin at all (1 John 1:8, 10), so verse 9 is an invitation to stop pretending and walk in the light, not a requirement to list every sin to stay forgiven. The same letter assures readers, “your sins are forgiven you for his name’s sake” (1 John 2:12) and points to Jesus as the atoning sacrifice for the whole world (1 John 2:2). Confession (<em>homologeō</em>, “to say the same thing”) means agreeing with God about the truth: about sin, yes, but also about his forgiveness and our identity. James adds confession to one another for healing (Jas 5:16), so confession is relational and restorative, not a legal transaction.",
    refs: ["1 John 1:5-10", "1 John 2:1-2", "1 John 2:12", "Jas 5:16", "Ps 32:1-5", "Ps 51", "Prov 28:13"],
    practice: "When you sin, you bring it honestly into the light with God and, where helpful, a trusted friend, and you receive forgiveness rather than wait anxiously for it. Confession becomes a door into healing, not a ritual of fear.",
    fair: "The legal view rightly guards the need for honest, specific confession; the relational view must not make “already forgiven” an excuse to avoid naming sin to God or making amends to others."
  },
  {
    id: "baptism",
    topic: "Baptism",
    group: "Practices",
    legal: "Most popular evangelicals see baptism as an ordinance: an act of obedience and public testimony following a personal decision of faith, often by immersion (believer’s baptism). It symbolises cleansing and a new life but does not itself save. Reformed and other evangelicals baptise infants of believers as a sign of the covenant, while some traditions (Lutheran, Anglican, Catholic, Orthodox) speak of baptism as a sacrament through which God gives grace.",
    relational: "Baptism is participation in Christ’s own death and resurrection: “we were buried with him through baptism into death, that just like Christ was raised … we also might walk in newness of life” (Rom 6:3-4; Col 2:12). The Greek <em>baptizō</em> means to dip or immerse, and immersion vividly shows going under and rising into Christ, though the early church also allowed pouring when water was scarce (<em>Didache</em> 7). Peter says baptism “now saves you” not as washing dirt from the body but as an appeal to God through the resurrection of Jesus (1 Pet 3:21), so baptism is neither mere symbol nor magic, but God’s act of including us, celebrated and received in faith. Christians remain divided between infant baptism (stressing God’s prior grace and covenant family) and believer’s baptism (stressing a personal response); the relational view honours what each guards, since the grace of union comes before our response and calls for it.",
    refs: ["Rom 6:3-5", "Col 2:11-12", "1 Pet 3:21", "Gal 3:26-28", "Matt 28:19", "Acts 2:38-41", "Mark 1:9-11", "Eph 4:5"],
    practice: "You remember your baptism as the place where God named you as his own and joined you to Christ, and you return to it when you doubt or fail. If you have never been baptised, you can receive it as a joyful participation, not a test of obedience.",
    fair: "The legal view rightly guards against treating baptism as automatic salvation without faith; the relational view must be honest that the meaning and mode of baptism remain debated among faithful Christians."
  },
  {
    id: "communion",
    topic: "Communion / the Lord’s Supper",
    group: "Practices",
    legal: "Many evangelicals hold a memorial view (associated with Zwingli): the bread and cup are symbols that help us remember Christ’s sacrificial death for our sins (“do this in remembrance of me”, Luke 22:19). Others, following Calvin, speak of a real spiritual presence received by faith, while Catholic, Orthodox and Lutheran Christians affirm Christ’s real presence in the elements in different ways. The Supper calls believers to examine themselves and not take it lightly (1 Cor 11:27-28).",
    relational: "The Lord’s Supper is participation (<em>koinōnia</em>): “The cup of blessing which we bless, isn’t it a sharing of the blood of Christ? The bread which we break, isn’t it a sharing of the body of Christ? Because there is one loaf of bread, we, who are many, are one body” (1 Cor 10:16-17). In Corinth, the problem Paul addresses is the rich eating while the poor went hungry (1 Cor 11:20-22), so “discerning the body” (1 Cor 11:29) most likely includes recognising the community as Christ’s body, not only examining one’s private sins; this reading is widely held, though some read “the body” as Christ’s body in the elements. The table is a family meal where Christ is host, a sign that he still eats with sinners (Luke 15:2), and the Greek word for thanksgiving, <em>eucharistia</em>, gives the meal its older name. Remembrance (<em>anamnēsis</em>) here is more than mental recall; it is making the saving event present and living from it.",
    refs: ["1 Cor 10:16-17", "1 Cor 11:17-34", "Luke 22:14-20", "John 6:53-58", "Luke 24:30-35", "Acts 2:42-46", "Luke 15:1-2"],
    practice: "At the table you look not only inward at your sins but outward at the people around you, and you make peace and share with them. You receive the bread and cup as Christ giving himself to you and making you one with others.",
    fair: "The legal view rightly guards the seriousness of the Supper and the call to self-examination (1 Cor 11:28); the relational view must acknowledge that Christians hold memorial, spiritual-presence and real-presence views in good faith."
  },
  {
    id: "tithe",
    topic: "The tithe",
    group: "Practices",
    legal: "Many evangelical churches teach that giving ten percent of income to the local church is a biblical standard, often quoting Malachi 3:8-10 (“Will a man rob God? … Bring the whole tithe into the storehouse”). They note that Abraham tithed before the Law (Gen 14:20), so the tithe is said to be a timeless principle. The best form of this teaching encourages generosity, trust in God’s provision and faithful support of ministry.",
    relational: "In the Torah the tithe was mainly agricultural produce and livestock, supporting the Levites and priests who had no land, funding festival meals the worshipper himself shared, and providing for “the foreigner, the fatherless, and the widow” (Lev 27:30-32; Num 18:21-24; Deut 14:22-29). Malachi 3 is addressed to Israel under the old covenant, and in context the priests themselves were being rebuked (Mal 1:6–2:9), with the “storehouse” being the temple storerooms that fed the Levites and the poor. Abraham’s tithe in Genesis 14 was a one-time tenth of war spoils given to Melchizedek, with the rest returned, and Hebrews 7 uses it to show Christ’s greater priesthood, not to command a church tithe. The New Testament never commands Christians to tithe; Paul teaches grace giving, freely, generously and “not grudgingly or under compulsion, for God loves a cheerful giver” (2 Cor 8–9), and threats of curses for not tithing sit badly with the new covenant.",
    refs: ["Gen 14:18-20", "Lev 27:30-32", "Num 18:21-24", "Deut 14:22-29", "Mal 3:8-12", "Matt 23:23", "Heb 7:1-10", "2 Cor 8:1-15", "2 Cor 9:6-8"],
    practice: "You give out of joy and love, deciding in your heart what to give, perhaps more than ten percent, perhaps less in hard seasons, without fear of a curse. You remember that caring for the poor was always at the heart of the tithe.",
    fair: "The legal view rightly guards generosity and the support of those who serve the church (1 Cor 9:14; Gal 6:6); the relational view must not let “not under law” become an excuse for giving little or nothing."
  },
  {
    id: "giving",
    topic: "Offerings and giving",
    group: "Practices",
    legal: "Beyond the tithe, believers are encouraged to give offerings to missions, the poor and special needs as stewards of what God has entrusted to them. Everything belongs to God (Ps 24:1), and we will give account for how we used our resources. This stewardship model teaches responsibility, accountability and sacrificial giving.",
    relational: "Giving is sharing in the self-giving life of God: “you know the grace of our Lord Jesus Christ, that, though he was rich, yet for your sakes he became poor” (2 Cor 8:9). The early church shared possessions so that “there was not among them any who lacked” (Acts 4:34), and Paul’s collection for Jerusalem aimed at “equality” between churches (2 Cor 8:13-14). Giving is not a transaction to get blessing back, but it does open our hands to receive and share God’s abundance. Jesus praised the widow’s small coins (Mark 12:41-44), showing that God sees the heart, not the amount.",
    refs: ["2 Cor 8:9", "2 Cor 8:13-15", "2 Cor 9:6-15", "Acts 2:44-45", "Acts 4:32-35", "Mark 12:41-44", "Luke 6:38", "Ps 24:1"],
    practice: "You look for people and needs to bless with your money, time and skills, not only an institution. You give gladly, and you resist both guilt-driven giving and “give to get” promises.",
    fair: "The legal view rightly guards accountability and stewardship of resources; the relational view must not use “freedom” to avoid planned, regular, sacrificial giving."
  },

  // ---------------------------------------------------------------- CHURCH
  {
    id: "ekklesia",
    topic: "Ekklesia (the church)",
    group: "Church",
    legal: "The church is the community of those who have been saved by faith in Christ, gathered for worship, teaching, fellowship and mission. Many evangelicals distinguish the universal invisible church (all true believers) from the local visible church with membership, elders and discipline. At its best this view takes the local church seriously as God’s family and refuses the idea of a lone-ranger Christian.",
    relational: "<em>Ekklesia</em> in Greek meant an assembly of citizens “called out” to gather, and the Greek Old Testament uses it for Israel assembled before God; it describes a people, never a building. The church is the body of Christ (1 Cor 12:27) and a sign and foretaste of what God intends for all humanity: a new family where walls between Jew and Gentile, slave and free, male and female are broken down (Gal 3:28; Eph 2:14-16). It is not a club of the saved separated from the lost, but the part of humanity that has awakened to Christ and lives from that reality for the sake of the world. The church shares in the communion of the Trinity, so its life together, its <em>koinōnia</em>, is itself part of its witness (John 17:21).",
    refs: ["Matt 16:18", "Acts 2:42-47", "1 Cor 12:12-27", "Eph 1:22-23", "Eph 2:14-22", "Gal 3:28", "John 17:20-23", "Heb 10:24-25"],
    practice: "You see church less as a place you attend and more as a family you belong to, practising love in ordinary ways. You welcome outsiders as people God already loves, not as projects.",
    fair: "The legal view rightly guards the church’s distinct identity, membership and teaching responsibilities; the relational view must not blur the church into the world so much that commitment, accountability and gathering seem optional."
  },
  {
    id: "church-discipline",
    topic: "Church discipline",
    group: "Church",
    legal: "Church discipline is the process by which a church confronts unrepentant sin among members, following Jesus’ steps in Matthew 18:15-17 and, where necessary, removing the person from membership. Its aims are the purity of the church, the honour of Christ and the repentance of the sinner. Many evangelical leaders, including 9Marks, rightly stress that a church without discipline is not taking holiness or love seriously.",
    relational: "Jesus’ steps in Matthew 18:15-17 begin privately and aim to “gain your brother”, and the same chapter goes on to the lost sheep and the command to forgive seventy times seven (Matt 18:12-14, 21-22). Even “let him be to you as a Gentile and a tax collector” is striking when we remember how Jesus treated Gentiles and tax collectors: he ate with them and sought them. Paul’s severe instruction in 1 Corinthians 5:5 has a restorative aim, “that the spirit may be saved in the day of the Lord Jesus”, and in 2 Corinthians 2:6-8 he urges the church to forgive and comfort a disciplined man “so that he would not be swallowed up with his excessive sorrow”. Discipline is a family’s loving intervention, never punishment, shaming or control.",
    refs: ["Matt 18:12-22", "1 Cor 5:1-13", "2 Cor 2:5-11", "Gal 6:1-2", "2 Tim 2:24-26", "Jas 5:19-20"],
    practice: "When someone is harming themselves or others, you speak to them gently and privately first, with the goal of restoration. You also protect the vulnerable and refuse to let “restoration” cover up abuse.",
    fair: "The legal view rightly guards the need for real boundaries and accountability in the church (1 Cor 5:11-13); the relational view must not let gentleness become a refusal ever to confront sin or protect victims."
  },
  {
    id: "ministry-leadership",
    topic: "Ministry and leadership",
    group: "Church",
    legal: "God calls and equips pastors and elders to lead, teach and shepherd the church, and believers are to honour and submit to them (Heb 13:17). Many evangelicals distinguish ordained ministry from lay service, though they affirm that every believer should serve. At its best this view provides order, sound teaching and protection from error.",
    relational: "Jesus redefined leadership: “whoever wants to become great among you shall be your servant” (Mark 10:43-45), and he washed his disciples’ feet (John 13:14-15). Paul says God “gave to us the ministry of reconciliation” (2 Cor 5:18), and that “us” includes every believer, so every Christian is a minister and a priest (1 Pet 2:9). Leaders are given to “equip the saints for the work of ministry” (Eph 4:11-12), not to do all the ministry or to control people. Authority in the kingdom is the authority of love, character and service, never of title or force (1 Pet 5:2-3).",
    refs: ["Mark 10:42-45", "John 13:12-17", "2 Cor 5:18-20", "1 Pet 2:9", "Eph 4:11-16", "1 Pet 5:1-4", "Heb 13:17", "Matt 23:8-12"],
    practice: "You take up your own ministry of reconciliation at home, at work and in your neighbourhood without waiting for a title. If you lead, you serve, listen and empower others rather than gather control.",
    fair: "The legal view rightly guards the need for qualified, accountable leaders and sound teaching (1 Tim 3; Titus 1); the relational view must not become anti-leadership in a way that leaves churches without care or protection."
  },
  {
    id: "evangelism-mission",
    topic: "Evangelism and mission",
    group: "Church",
    legal: "Evangelism is urgently calling sinners to repent and believe so that they are saved from judgement and hell, in obedience to the Great Commission (Matt 28:19-20). Popular methods often present a gospel outline: God is holy, you are a sinner, Christ died for you, you must respond. This approach has carried the gospel around the world and rightly insists that people need to hear and respond to the message of Christ.",
    relational: "The gospel is good news to announce, not a threat to escape: God has reconciled the world to himself in Christ, so “be reconciled to God” (2 Cor 5:19-20). Paul in Athens begins with what is already true of his hearers, “in him we live, move, and have our being” (Acts 17:28), and calls them to see it. Mission is joining what the Father, Son and Spirit are already doing in people’s lives (John 5:17), with words and with deeds of healing, justice and love. People are invited to awaken to who they already are in Christ, not to complete a transaction that makes God love them.",
    refs: ["Matt 28:18-20", "Luke 4:18-19", "2 Cor 5:14-20", "Acts 17:22-31", "John 20:21", "Rom 10:14-15", "1 Pet 3:15"],
    practice: "You share Jesus with people as someone who has found good news, not as a salesperson with a quota. You listen for where God is already at work in their story and name it.",
    fair: "The legal view rightly guards the urgency of evangelism and the need for a clear message and personal response; the relational view must not become so confident in God’s inclusion that it stops speaking the gospel at all."
  },
  {
    id: "kingdom-of-god",
    topic: "The kingdom of God",
    group: "Church",
    legal: "The kingdom of God is God’s rule, entered by being born again (John 3:3), present now in the hearts of believers and fully revealed at Christ’s return. Popular evangelicalism often focuses on individual salvation and the future heavenly kingdom, though many evangelical scholars (following George Ladd) stress the “already and not yet”. This view rightly holds that the kingdom is God’s gift and not a human project.",
    relational: "Jesus’ central message was “The kingdom of God is at hand!” (Mark 1:15): God’s loving reign breaking into the world now, through healing, forgiveness, table fellowship with outsiders and good news to the poor (Luke 4:18-19). Jesus taught us to pray, “your kingdom come … on earth as it is in heaven” (Matt 6:10), so the kingdom is not mainly about leaving earth but about earth being healed. The kingdom grows quietly like yeast and a mustard seed (Matt 13:31-33) and has a cross-shaped way of power, conquering through self-giving love. It is already present in Christ and still to come in fullness.",
    refs: ["Mark 1:14-15", "Luke 4:18-21", "Matt 6:10", "Matt 13:31-33", "Luke 17:20-21", "Rom 14:17", "Rev 11:15"],
    practice: "You look for small ways to make your corner of the world more like heaven: forgiving, healing, welcoming and doing justice. You pray the Lord’s Prayer as a daily commitment, not only a wish.",
    fair: "The legal view rightly guards the truth that only God can bring the kingdom in fullness; the relational view must not confuse the kingdom with any political programme or human progress."
  },
  {
    id: "justice-poor",
    topic: "Justice and the poor",
    group: "Church",
    legal: "Evangelicals have a strong history of caring for the poor (from Wilberforce’s campaign against the slave trade to many relief agencies today). In the legal frame, however, justice is mainly God’s retributive justice against sin, and social action is often seen as secondary to saving souls. Its best form insists that compassion must be joined to the proclamation of the gospel.",
    relational: "In Scripture “justice” (<em>mishpat</em>) and “righteousness” (<em>tsedaqah</em>) often appear together and describe making things right, especially for the widow, orphan, foreigner and poor (Ps 146:7-9; Isa 1:17). Christopher Marshall (<em>Beyond Retribution</em>, 2001) argues that restoration, not retribution, is the hallmark of God’s justice, and Brian Zahnd writes, “The justice of God is not retributive; the justice of God is restorative.” Jesus identified himself with the hungry, the stranger and the prisoner (Matt 25:35-40), so caring for them is caring for him. Justice is not an add-on to the gospel but one of its fruits and signs.",
    refs: ["Mic 6:8", "Isa 1:17", "Isa 58:6-10", "Ps 146:7-9", "Amos 5:24", "Luke 4:18-19", "Matt 25:31-46", "Jas 1:27"],
    practice: "You work for the good of the vulnerable in practical ways, from volunteering to fair dealing at work. You see the face of Christ in the poor and treat them with dignity.",
    fair: "The legal view rightly guards the uniqueness of the gospel message and warns against reducing the church to a social agency; the relational view must keep proclaiming Christ alongside its works of justice."
  },

  // ---------------------------------------------------------------- GOD (more)
  {
    id: "wrath-of-god",
    topic: "The wrath of God",
    group: "God",
    legal: "God’s wrath is his holy, settled opposition to sin. The Gospel Coalition defines it as “the holy action of retributive justice towards persons whose actions deserve eternal condemnation”, in perfect harmony with his other attributes. Salvation is salvation from God’s wrath (Rom 5:9; 1 Thess 1:10), and on the cross Jesus bore that wrath for us, an emphasis that rightly refuses to make sin trivial.",
    relational: "God’s wrath is real, but it is the wrath of love against what destroys his children, not anger against the children themselves. In Romans 1 Paul describes wrath as God “giving them up” to the consequences of their choices (Rom 1:24, 26, 28), and Brad Jersak describes it as the intrinsic consequence of refusing God’s mercy rather than retributive punishment. George MacDonald wrote in “Justice” that “there is no opposition, no strife whatever, between mercy and justice”, and Aquinas taught that in every work of God justice presupposes mercy and is founded on it (<em>Summa</em> I, q.21, a.4, paraphrased). Wrath, on this reading, is God’s love refusing to let sin have the last word.",
    refs: ["Rom 1:18-32", "Rom 5:9", "Eph 2:3-5", "John 3:36", "1 Thess 1:10", "Ps 103:8-9", "Isa 54:7-10", "Lam 3:31-33"],
    practice: "You can take sin seriously because God does, but you do not need to fear that God’s anger is aimed at you as his child. You learn to hate what harms people while loving the people themselves.",
    fair: "The legal view rightly guards the many texts about God’s wrath (Rom 1:18; Rev 6:16) and refuses a God who shrugs at evil; the relational view must not explain wrath away as merely impersonal cause and effect."
  },
  {
    id: "trinity",
    topic: "The Trinity",
    group: "God",
    legal: "Evangelicals affirm the historic doctrine of the Trinity: one God in three persons, Father, Son and Holy Spirit. In the legal framework the Trinity often appears as a division of roles in salvation: the Father plans and judges, the Son pays, the Spirit applies. This rightly honours the distinct work of each person in our redemption.",
    relational: "The Trinity is the heart of the gospel: God is a fellowship of self-giving love, and salvation is being brought into that fellowship. The church fathers spoke of <em>perichoresis</em>, the mutual indwelling of the persons in one another (John 14:10-11; John 17:21). Baxter Kruger (<em>The Great Dance</em>) and others use the image of a “dance”; that is a helpful image, but the word <em>perichōrēsis</em> does not etymologically mean “dance” (that is a different word, <em>perichoreuō</em>). Because the persons are never divided, the Father never opposes the Son on the cross; the whole Trinity acts together in reconciling the world.",
    refs: ["Matt 28:19", "John 14:9-11", "John 17:20-26", "2 Cor 13:14", "Eph 2:18", "Mark 1:9-11"],
    practice: "You understand your life as being included in a love that existed before the world, not as a separate life you try to make acceptable to God. You relate to each person of the Trinity with trust.",
    fair: "The legal view rightly guards the distinctness of the divine persons and their roles; the relational view must be careful not to speak loosely, for example by implying that humans become additional members of the Trinity."
  },

  // ---------------------------------------------------------------- MORE SALVATION AND LIFE
  {
    id: "decision",
    topic: "Conversion and the sinner’s prayer",
    group: "Salvation",
    legal: "In popular evangelicalism, salvation is often received at a moment of decision: admitting you are a sinner, believing Christ died for you and asking him into your heart, sometimes through a “sinner’s prayer”. This moment is seen as the point at which a person passes from condemnation to life (John 5:24). At its best it insists that the gospel calls for a real, personal response and not merely inherited religion.",
    relational: "The phrase “sinner’s prayer” and the formula of “asking Jesus into your heart” do not appear in the Bible; they became common in modern revivalism. Conversion is real and often dramatic, but it is waking up to what God has already done, not the moment God changes his mind about you (Rom 5:8: “while we were yet sinners, Christ died for us”). Some people come to faith in a single moment, others slowly over years, and children raised in faith may never remember a time they did not trust Jesus. The question is less “Have you said the prayer?” and more “Are you coming alive to the love of the Father in Christ?”",
    refs: ["Rom 5:8", "Rom 10:9-13", "John 5:24", "Acts 16:30-34", "Luke 15:17-24", "2 Cor 3:16-18", "Eph 1:17-18"],
    practice: "You stop trying to remember exactly the right words or the right date, and you keep turning toward Christ day by day. You invite others to trust Jesus without pressure or formulas.",
    fair: "The legal view rightly guards the need for a clear, personal turning to Christ; the relational view must still call people to respond, believe and be baptised (Acts 2:38)."
  },
  {
    id: "adoption",
    topic: "Adoption",
    group: "Salvation",
    legal: "Adoption is a legal act by which God takes justified sinners into his family as sons and daughters, with all the rights and privileges of heirs (Gal 4:4-7). J.I. Packer called it the highest privilege the gospel offers, even higher than justification. This rightly stresses that God does not only acquit us but welcomes us into his family.",
    relational: "Adoption (<em>huiothesia</em>, literally “placing as a son”) is the Father bringing us to share in the Son’s own relationship with him. In Ephesians 1:5 it was planned “before the foundation of the world”, not as a remedy added after the Fall but as the purpose of creation. The Spirit of adoption cries “Abba, Father” in us (Rom 8:15), so we know God from the inside, as Jesus knows him. In this stream adoption is the language of identity, not merely of legal status: we are truly children, made for the Father’s heart.",
    refs: ["Gal 4:4-7", "Rom 8:14-17", "Rom 8:23", "Eph 1:3-6", "John 1:12", "1 John 3:1-2", "John 20:17"],
    practice: "You learn to call God “Father” with simple confidence, and you see other believers as true brothers and sisters. You let yourself be cared for, not only instructed.",
    fair: "The legal view rightly guards the gift character of adoption (we are not children by nature in the same way Jesus is); the relational view must keep the distinction between the eternal Son and adopted sons and daughters."
  },
  {
    id: "temptation",
    topic: "Temptation and the struggle with sin",
    group: "Life",
    legal: "Believers still have a sinful nature (“the flesh”) that wars against the Spirit (Gal 5:17), and they must resist temptation through Scripture, prayer, accountability and self-discipline. Many quote Romans 7 to describe the ongoing Christian struggle with sin. This view rightly refuses to pretend that Christians are beyond temptation and gives practical help for the fight.",
    relational: "Jesus himself was tempted “in all points like we are, yet without sin” (Heb 4:15), so temptation is not a sign that you are bad, and he is with you in it. Paul says our “old man was crucified with him” and calls us to “consider yourselves to be dead to sin, but alive to God in Christ Jesus” (Rom 6:6, 11), so the battle is fought from victory and identity, not toward them. Whether Romans 7 describes the Christian life or life under the Law is debated; many in this stream read it as life under the Law that Romans 8 answers (“There is therefore now no condemnation”, Rom 8:1). Temptation often loses power when we bring our hidden needs and wounds to God and to trusted people, rather than only fighting the behaviour.",
    refs: ["Heb 4:15-16", "Rom 6:6-14", "Rom 7:14-25", "Rom 8:1-4", "1 Cor 10:13", "Gal 5:16-25", "Jas 1:13-15"],
    practice: "When tempted you remind yourself who you are in Christ and ask what you are really hungry for. You bring struggles into the light with a friend instead of hiding them in shame.",
    fair: "The legal view rightly guards the reality of ongoing battle and the need for effort and accountability (1 Cor 9:27); the relational view must not make identity talk a replacement for practical wisdom and discipline."
  },
  {
    id: "spiritual-warfare",
    topic: "The devil and spiritual warfare",
    group: "Christ",
    legal: "Satan is a real, fallen angel who tempts, accuses and deceives, and believers must resist him by faith and the armour of God (Eph 6:10-18; Jas 4:7). In the legal frame, the devil’s main power is accusation and guilt, which Christ disarmed by paying for sin. This view rightly takes evil seriously as a personal reality, not only a metaphor.",
    relational: "The early church’s <em>Christus Victor</em> theme sees the cross and resurrection as Christ’s victory over sin, death and the devil: “he disarmed the principalities and powers … triumphing over them in it” (Col 2:15; Heb 2:14-15). The name Satan means “accuser”, and the accuser has been “thrown down” (Rev 12:10), so believers fight from Christ’s finished victory, not in fear. Spiritual warfare mostly looks like truth, righteousness, peace, faith and prayer (Eph 6:14-18), and it is directed against powers, not against human beings, for “our wrestling is not against flesh and blood” (Eph 6:12). Fear-driven obsession with demons can itself become a stronghold; the strongest weapon is resting in Christ’s love.",
    refs: ["Col 2:15", "Heb 2:14-15", "1 John 3:8", "Rev 12:10-11", "Eph 6:10-18", "Jas 4:7", "Luke 10:17-20"],
    practice: "You resist lies and accusations by agreeing with what God says about you. You refuse to treat human opponents as enemies, praying for them instead.",
    fair: "The legal view rightly guards the reality of evil and a sober watchfulness (1 Pet 5:8); the relational view must not dismiss the personal reality of evil or become careless about it."
  },

  // ---------------------------------------------------------------- END
  {
    id: "death",
    topic: "Death",
    group: "End",
    legal: "Death is the penalty for sin (Rom 6:23; Gen 2:17), and for believers it is the doorway into the presence of Christ (Phil 1:23). At death a person’s eternal destiny is fixed (Heb 9:27). This view brings deep comfort to the dying and urgency to evangelism.",
    relational: "Death is an enemy, “the last enemy to be abolished” (1 Cor 15:26), not a friend or a promotion. Jesus wept at Lazarus’s tomb (John 11:35) and then raised him, and in his own death and resurrection he destroyed the power of death (Heb 2:14). For those in Christ death is no longer the end: to be absent from the body is to be with the Lord (2 Cor 5:8), but the final hope is bodily resurrection, not a disembodied heaven. Whether a person’s destiny is fixed at death is debated: Hebrews 9:27 speaks of judgement after death but does not say that the door of mercy closes, and texts like 1 Peter 3:19 and 4:6 have led many from the early church onward to hope otherwise.",
    refs: ["1 Cor 15:26", "1 Cor 15:54-57", "John 11:25-26", "John 11:35", "Heb 2:14-15", "2 Cor 5:1-8", "Phil 1:21-23", "1 Pet 3:18-20", "1 Pet 4:6"],
    practice: "You grieve honestly, without pretending death is good, and you hope deeply because death does not have the last word. You can face your own death in peace.",
    fair: "The legal view rightly guards the urgency of this life and the seriousness of judgement after death; the relational view must be clear that post-mortem hope is a debated reading, not a reason to delay responding to God now."
  },
  {
    id: "judgement",
    topic: "Judgement",
    group: "End",
    legal: "All people will stand before the judgement seat of God, who will judge with perfect justice (2 Cor 5:10; Rev 20:12). Those who are in Christ will be acquitted because their sins have already been judged in him; those outside Christ will receive the just penalty for their sins. This view rightly insists that evil will be called to account and that justice will finally be done.",
    relational: "The Judge is Jesus (John 5:22), the one who died for the world, so judgement is in the hands of the one who loves us most. In Scripture God’s judgement is often the putting right of what is wrong, the reason the Psalms rejoice that God “comes to judge the earth” (Ps 96:12-13). George MacDonald argued that punishment “nowise” atones for wrong, but “may do good to the man who does the wrong”, and that God is bound to destroy sin rather than merely to punish it. Judgement is therefore deeply serious, exposing and burning away all that is false (1 Cor 3:13-15), but its aim is restoration; MacDonald’s key text is Psalm 62:12: “unto thee, O Lord, belongeth mercy: for thou renderest to every man according to his work.”",
    refs: ["John 5:22-27", "2 Cor 5:10", "Rom 2:5-11", "Ps 96:10-13", "Ps 62:12", "1 Cor 3:11-15", "Rev 20:11-15", "Jas 2:13"],
    practice: "You can look toward judgement with hope, letting God’s light expose what needs healing in you now. You also leave revenge to God and seek restorative justice in your own conflicts.",
    fair: "The legal view rightly guards the reality of final accountability and the truth that evil will not simply be ignored; the relational view must not soften judgement into a mere formality."
  },
  {
    id: "hell",
    topic: "Hell",
    group: "End",
    legal: "Hell is the place of eternal conscious punishment for those who die without faith in Christ, the just penalty for sin against an infinitely holy God (Matt 25:46; Rev 14:10-11). Some evangelicals hold annihilationism (conditional immortality) instead, in which the lost are finally destroyed. The traditional view rightly takes Jesus’ own sober warnings seriously and underscores the gravity of sin.",
    relational: "Jesus’ warnings are real and severe, and the relational stream does not deny them; the question is what they mean. The word often translated “hell” is <em>Gehenna</em>, the Valley of Hinnom outside Jerusalem, a place associated with child sacrifice and judgement (Jer 7:31-32), and the word <em>aiōnios</em> (“eternal”) can mean “of the age to come” as well as “endless”, a meaning that is debated among scholars. Many early fathers, such as Gregory of Nyssa and (in a contested system) Origen, hoped that the fire of God is purifying and that God will finally be “all in all” (1 Cor 15:28); David Bentley Hart (<em>That All Shall Be Saved</em>, 2019), Robin Parry and Thomas Talbott defend this hope today, while others like Brad Jersak hold it as hope rather than certainty. The Council of 553 condemned a specific Origenist system (including pre-existence of souls); whether it condemned universal restoration as such is debated.",
    refs: ["Matt 25:41-46", "Mark 9:43-48", "Jer 7:31-32", "Rev 14:10-11", "Rev 20:14-15", "1 Cor 15:22-28", "Rom 5:18", "Phil 2:10-11", "Col 1:20"],
    practice: "You take sin and its destructive consequences seriously, but you do not use hell as a threat to manipulate people. You pray and hope for the salvation of all, as 1 Timothy 2:1-4 encourages.",
    fair: "The legal view rightly guards the real seriousness of Jesus’ warnings, and the eternal punishment view has been the majority view in the Western church; the relational view must present universal restoration as a hope argued from Scripture, not as settled certainty or an excuse to ignore warnings."
  },
  {
    id: "heaven-new-creation",
    topic: "Heaven and the new creation",
    group: "End",
    legal: "Heaven is the eternal home of believers, where they will be with God forever, free from sin, sorrow and pain. Popular preaching often focuses on “going to heaven when you die”, while many evangelical scholars stress the final resurrection and the new heavens and new earth. This view rightly gives great hope and comfort to believers facing death and suffering.",
    relational: "The Bible’s final hope is not escaping to heaven but heaven and earth united: “I saw a new heaven and a new earth … God’s dwelling is with people” (Rev 21:1-3). Creation itself “will be delivered from the bondage of decay into the liberty of the glory of the children of God” (Rom 8:21), so bodies, cultures and the world are healed and renewed, not thrown away. God’s plan is to sum up all things in Christ (Eph 1:10) and reconcile all things to himself (Col 1:20). Heaven is not a distant place to wait for but the life of God, which begins now and will one day fill everything.",
    refs: ["Rev 21:1-5", "Rev 22:1-5", "Rom 8:18-25", "Eph 1:10", "Col 1:19-20", "Isa 65:17-25", "2 Pet 3:13", "1 Cor 15:42-44"],
    practice: "You care for the earth, your body and your community because they have a future in God. Hope becomes a reason to work for healing now, not a reason to withdraw.",
    fair: "The legal view rightly guards the real hope of being with Christ after death (Phil 1:23); the relational view must not lose the comfort of that hope in its emphasis on the new creation."
  },
  {
    id: "rewards",
    topic: "Rewards",
    group: "End",
    legal: "Believers will receive rewards (crowns) at the judgement seat of Christ according to their faithfulness, even though salvation itself is a free gift (1 Cor 3:12-15; 2 Cor 5:10). The prospect of rewards motivates diligent service and endurance. This view rightly honours Jesus’ own frequent promises of reward (Matt 6:4; Matt 25:21).",
    relational: "Jesus does speak of rewards, but his parables often overturn our scorekeeping: in the vineyard the last workers receive the same wage as the first, and the generous landowner asks, “Is your eye evil, because I am good?” (Matt 20:15). The deepest reward is God himself and the joy of sharing in his life: “Enter into the joy of your lord” (Matt 25:21). In Revelation the elders cast their crowns before the throne (Rev 4:10), showing that every reward is a gift to be given back in love. Rewards are not a heavenly ranking system but the fruit of love made visible.",
    refs: ["Matt 6:1-6", "Matt 20:1-16", "Matt 25:14-30", "1 Cor 3:10-15", "2 Cor 5:10", "Rev 4:10-11", "Col 3:23-24"],
    practice: "You serve with joy and secret kindness, trusting that nothing done in love is ever wasted. You stop comparing your “score” with others.",
    fair: "The legal view rightly guards the biblical teaching that faithfulness matters and that our choices have lasting consequences; the relational view must not dismiss reward language as unspiritual."
  },
  {
    id: "end-of-all-things",
    topic: "The end of all things",
    group: "End",
    legal: "History is moving toward a final division between the saved and the lost, with God glorified both in his mercy to the redeemed and in his justice toward the condemned. Christ will hand over the kingdom to the Father, and God will reign forever. This view rightly holds that history has a goal and that God will finally put down all rebellion.",
    relational: "The goal of all things is that God may be “all in all” (1 Cor 15:28), with every knee bowing and every tongue confessing that Jesus Christ is Lord “to the glory of God the Father” (Phil 2:10-11). Early fathers such as Gregory of Nyssa called this hope <em>apokatastasis</em>, the restoration of all things (from Acts 3:21), and Julian of Norwich heard the promise, “all shall be well, and all shall be well, and all manner of thing shall be well.” Isaac the Syrian, as usually translated, compared the sin of all flesh to a handful of sand thrown into the great sea of God’s mercy. Christians disagree about whether every person will finally be restored; the relational stream at least holds that God’s love will have the last word and invites us to hope and pray for all.",
    refs: ["1 Cor 15:24-28", "Phil 2:9-11", "Acts 3:21", "Eph 1:9-10", "Col 1:19-20", "Rev 21:5", "Rom 11:32-36"],
    practice: "You live with long, stubborn hope for the world, for the people you love and even for your enemies. You work and pray toward the day when all things are made new.",
    fair: "The legal view rightly guards human freedom to refuse God and the plain warnings of Scripture; the relational view must present universal restoration as hope and argument, debated across church history, not as settled dogma."
  },

  // ---------------------------------------------------------------- ADDITIONAL CORE THEMES
  {
    id: "union-with-christ",
    topic: "Union with Christ",
    group: "Salvation",
    legal: "Reformed evangelicals affirm union with Christ as central: Calvin wrote that as long as Christ remains outside us, all he has done is useless to us (<em>Institutes</em> III.1.1, paraphrased). In the popular legal framework, however, union is often treated as one benefit among others, entered at the moment of faith and mainly securing a legal standing. This view rightly guards the difference between Christ and the believer and the need for the Spirit to join us to him personally.",
    relational: "Union with Christ is the centre of everything: Paul’s favourite phrase is “in Christ”, used again and again in his letters. Because the eternal Son has joined himself to our humanity in the Incarnation, the human race is already bound to him, and the Spirit awakens us to share that union personally and consciously (John 14:20: “you will know that I am in my Father, and you in me, and I in you”). Union, not separation, is the true story: sin made us feel cut off and hide, but God never stopped holding us (Col 1:17; Acts 17:28). The Christian life is learning to live from this union, “Christ in you, the hope of glory” (Col 1:27), rather than trying to reach God from far away.",
    refs: ["John 14:20", "John 15:4-5", "John 17:21-23", "Gal 2:20", "Col 1:27", "Col 3:3-4", "1 Cor 6:17", "Eph 1:3-14"],
    practice: "You begin prayer, work and relationships from the truth that Christ is in you and you in him. You read “in Christ” passages slowly and let them tell you who you are.",
    fair: "The legal view rightly guards the creature–Creator distinction and the personal work of the Spirit in joining us to Christ; the relational view must not speak of union so loosely that it sounds as if humans simply are divine or that faith is unnecessary."
  },
  {
    id: "god-in-old-testament",
    topic: "God in the Old Testament",
    group: "God",
    legal: "The God of the Old Testament is the same holy God revealed in Jesus, and his commands to judge nations (such as the conquest of Canaan) were just acts of a righteous Judge against grave wickedness (Gen 15:16; Deut 9:5). Evangelicals defend the unity of the Testaments and resist setting an “angry Old Testament God” against a “loving New Testament God”. This view rightly honours the whole Bible as God’s Word.",
    relational: "The relational stream also holds that there is one God across both Testaments, but it reads the Old Testament through Jesus, who is the clearest revelation of that God (Heb 1:1-3; John 1:18). Greg Boyd (<em>Crucifixion of the Warrior God</em>, 2017) argues that violent portraits of God show God humbly accommodating the fallen understanding of his people, much as he bore our sin on the cross; Brad Jersak (<em>A More Christlike God</em>, 2015) describes a progressive revelation that culminates in Christ. Jesus himself sometimes corrected earlier readings (Luke 9:54-55, where he rebukes the wish to call down fire as Elijah did; Matt 5:38-45). These are debated proposals, and many scholars disagree, but they aim to let the cross, not the sword, define God.",
    refs: ["Heb 1:1-3", "John 1:18", "John 14:9", "Luke 9:51-56", "Matt 5:38-48", "Ex 34:6-7", "Hos 11:8-9", "Deut 20:16-18"],
    practice: "When you meet a troubling passage you neither ignore it nor let it overrule Jesus; you bring it to the cross and ask what it reveals. Your picture of God settles into the face of Christ.",
    fair: "The legal view rightly guards the full authority of Scripture and warns against a modern “Marcionism” that rejects the Old Testament; the relational view must make clear that its cruciform reading is a debated interpretation, not a reason to discard texts."
  },
  {
    id: "enemy-love",
    topic: "Enemy love and nonviolence",
    group: "Life",
    legal: "Christians are called to love their enemies and not take personal revenge (Rom 12:19-21), leaving vengeance to God. Many evangelicals also support just war and the state’s right to use force to punish wrongdoing (Rom 13:4). This view rightly distinguishes personal forgiveness from the duty of governments to restrain evil and protect the vulnerable.",
    relational: "Jesus says, “Love your enemies, bless those who curse you … that you may be children of your Father who is in heaven” (Matt 5:44-45): enemy-love is how God himself behaves, sending rain on the just and unjust. The cross is God’s ultimate refusal of retaliation, as Christ absorbs violence and forgives (Luke 23:34), and Derek Flood (<em>Healing the Gospel</em>, 2012) connects a nonviolent reading of the atonement with a gospel of enemy-love. Walter Wink’s reading of “turn the other cheek” as creative, nonviolent resistance (a backhand slap that humiliates, answered by offering the other cheek) is a scholarly interpretation, not settled fact, but it highlights that Jesus’ way is neither passivity nor revenge. Many in this stream lean toward Christian pacifism, though others hold just-war views, and the debate is old.",
    refs: ["Matt 5:38-48", "Luke 6:27-36", "Rom 12:14-21", "1 Pet 2:21-23", "Luke 23:34", "Rom 5:10", "Prov 25:21-22"],
    practice: "You pray by name for people who have hurt you and look for ways to do them good without enabling harm. In conflict you refuse both revenge and silent surrender, seeking a third way.",
    fair: "The legal view rightly guards the protection of victims and the God-given role of just authority (Rom 13:1-4); the relational view must not make enemy-love a pressure on abuse survivors to stay in danger."
  },
  {
    id: "holiness-of-god",
    topic: "The holiness of God",
    group: "God",
    legal: "God is holy, holy, holy (Isa 6:3), the only attribute repeated three times in this way, as R.C. Sproul emphasised. He is “of purer eyes than to see evil” (Hab 1:13), so sinful people cannot come near without a mediator. This view rightly fosters reverence and a sense of the vast gulf between Creator and creature.",
    relational: "God’s holiness is his utter otherness, but in Jesus the Holy One turns out to be the one who touches lepers, eats with sinners and lets a sinful woman wash his feet (Luke 7:36-50). Holiness does not keep God away from sinners; it is the purity of a love so strong that it is not contaminated by touching what is unclean, but heals it instead (Mark 1:40-42). In Isaiah 6, the holy God does not destroy the trembling prophet but sends a coal to cleanse him and then sends him out. Habakkuk 1:13 is part of a lament that goes on to ask why God does look on evil, so it is not a statement that God turns away from sinners.",
    refs: ["Isa 6:1-8", "Hab 1:12-13", "Mark 1:40-42", "Luke 7:36-50", "Lev 19:2", "1 Pet 1:15-16", "Hos 11:9"],
    practice: "You approach God with awe and with confidence at the same time, knowing his holiness moves toward you to heal. You let his holiness inspire you to love the unclean, not to avoid them.",
    fair: "The legal view rightly guards the awe and moral purity of God’s holiness; the relational view must not reduce holiness to “love” so completely that God’s otherness and moral purity vanish."
  },
  {
    id: "contemplation",
    topic: "Contemplation and mystical experience",
    group: "Practices",
    legal: "Many evangelicals are cautious about mysticism and contemplative practices, fearing that they replace Scripture with subjective experience or borrow from non-Christian spirituality. They emphasise knowing God through his Word, sound doctrine and prayer with the mind (1 Cor 14:15). At its best this caution protects believers from deception and keeps experience anchored in the gospel.",
    relational: "The relational stream draws on the long Christian contemplative tradition: the Desert Fathers, Bernard of Clairvaux, Teresa of Avila, John of the Cross and Julian of Norwich. Contemplation is simply resting in God’s presence, “Be still, and know that I am God” (Ps 46:10), and letting love look at love. Teachers like John Crowder (<em>Mystical Union</em>, 2010) stress that mystical experience, including joy, rest, visions or the ecstasy some call being “drunk in the Spirit” (Eph 5:18; Acts 2:13-15), is the fruit of union already given in Christ, not a ladder to climb up to God. Critics, including Reformed writers, call this hyper-grace and charismatic excess and say it downplays repentance and holiness, so the tradition’s own test applies: the real fruit of contemplation is humility and love.",
    refs: ["Ps 46:10", "Ps 27:4", "2 Cor 3:18", "2 Cor 12:1-4", "Acts 10:9-16", "Eph 5:18-20", "Luke 10:38-42", "1 John 4:1"],
    practice: "You set aside quiet time simply to be with God, without an agenda, and let your attention rest in his love. You hold experiences loosely and judge them by whether they make you kinder and humbler.",
    fair: "The legal view rightly guards against experience becoming the authority and against manipulation in emotional settings; the relational view must keep contemplation tied to Scripture, the church and ordinary obedience."
  }
];
