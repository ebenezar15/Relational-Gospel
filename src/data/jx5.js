window.RG = window.RG || {};
var RG = window.RG;

/* Round 18 (B, C): call-out culture, biblical correction, and what Christ set us free from. */

RG.jxTests = [
  {
    id: "private-first",
    test: "Have I gone to the person privately first, where that is possible?",
    ref: "Matt 18:15",
    why: "Jesus's first step is a quiet, one-to-one conversation: \"go, show him his fault between you and him alone.\" Going public first skips the step most likely to win a brother or sister back, though it may not apply to abuse, danger, or a teacher you have no access to."
  },
  {
    id: "public-matter",
    test: "Is this a public matter that genuinely calls for a public answer?",
    ref: "Gal 2:11-14; 1 Tim 5:20",
    why: "Paul corrected Peter \"before them all\" because Peter's public conduct was confusing the whole church about the gospel. Public teaching that misleads many may be answered publicly, but private sins and personal quarrels usually should not be aired to the world."
  },
  {
    id: "accurate-fair",
    test: "Am I quoting them accurately, in context, and have I heard their side?",
    ref: "Exod 23:1; Prov 18:17",
    why: "\"You shall not spread a false report\" (Exod 23:1), and \"he who pleads his cause first seems right, until another comes and questions him\" (Prov 18:17). A clipped quote, a guessed motive or a second-hand rumour turns correction into false witness."
  },
  {
    id: "love-restoration",
    test: "Is my aim their restoration and others' good, not their defeat?",
    ref: "Gal 6:1; 2 Tim 2:24-26",
    why: "Paul says to \"restore such a one in a spirit of gentleness,\" hoping that God may grant repentance so people \"may recover themselves out of the devil's snare.\" Correction aimed at winning an argument or ending someone has already left the biblical goal behind."
  },
  {
    id: "log-before-speck",
    test: "Have I dealt honestly with my own log before pointing at their speck?",
    ref: "Matt 7:3-5",
    why: "Jesus does not forbid removing the speck; he says to take the log out of your own eye first so you can \"see clearly.\" Humility is not a delay tactic but the thing that makes clear sight possible."
  },
  {
    id: "proportional",
    test: "Is this about the heart of the gospel, or a secondary matter where Christians differ?",
    ref: "Rom 14:1",
    why: "Paul tells the church to welcome the one weak in faith \"but not for disputes over opinions.\" Treating every disagreement as heresy flattens the difference between denying Christ and disagreeing about a debated passage."
  },
  {
    id: "no-mockery",
    test: "Is my speech free of mockery, name-calling and slander?",
    ref: "Eph 4:29, 31; Jas 4:11",
    why: "Paul wants only speech that is \"good for building others up\" and tells us to put away \"bitterness, wrath, anger, outcry, and slander.\" James adds, \"Don't speak against one another\"; a warning can be firm without being cruel."
  },
  {
    id: "gentle-respectful",
    test: "Would a fair observer call my tone gentle and respectful?",
    ref: "1 Pet 3:15-16",
    why: "Peter tells believers to give a reason for their hope \"with humility and fear\" (gentleness and respect), keeping a good conscience. Truth delivered with contempt tends to discredit the truth itself."
  },
  {
    id: "open-to-wrong",
    test: "Am I genuinely open to discovering that I am the one who is wrong?",
    ref: "Prov 12:15",
    why: "\"The way of a fool is right in his own eyes, but he who is wise listens to counsel.\" If nothing could change my mind, I am not discerning; I am defending a position."
  },
  {
    id: "protect-vulnerable",
    test: "Does this protect the vulnerable, rather than build my brand or audience?",
    ref: "Ezek 34:2-4",
    why: "God's charge against the shepherds of Israel was that they fed themselves and did not strengthen the weak, heal the sick or seek the lost. Exposure that genuinely shields people from harm is shepherding; exposure that mainly grows a following repeats the shepherds' fault."
  }
];

RG.jxFactors = [
  {
    id: "real-harm",
    label: "Real harm from false teaching and abuse",
    text: "Many people have been genuinely hurt: by prosperity promises that failed, by leaders who abused power, by cover-ups. When institutions stay silent, people understandably turn to anyone who will name what happened.",
    cuts: "Every camp. Survivors of abuse and spiritual manipulation come from charismatic, Reformed, fundamentalist, Catholic and progressive churches alike, and call-outs arise in all of them.",
    healthy: "Telling the truth about harm, believing and protecting victims, and reporting crimes to the proper authorities. Exposing abuse is love for the vulnerable (Eph 5:11; Prov 31:8-9)."
  },
  {
    id: "doctrinal-precision",
    label: "A strong emphasis on doctrinal precision",
    text: "Some traditions place great weight on getting doctrine exactly right, often with real love for Scripture. When precision becomes the main measure of faithfulness, every small deviation can start to look like a threat.",
    cuts: "Strongest in some Reformed, confessional and cessationist circles, but not all Reformed or cessationist Christians behave this way, and many are known for patient charity. The same pattern appears in progressive circles that police correct language and in charismatic circles that police correct \"revelation\".",
    healthy: "Loving truth and sound teaching (Titus 1:9), while holding first things first and leaving room for disagreement on secondary matters (Rom 14:1)."
  },
  {
    id: "polemical-traditions",
    label: "Polemical traditions",
    text: "Christian history includes a long habit of argument by denunciation, from Reformation-era pamphlets to modern debate culture. Tradition can teach us that strong rhetoric is the same thing as faithfulness.",
    cuts: "Protestant and Catholic polemics, fundamentalist separatism, charismatic \"spiritual warfare\" against opponents, and progressive denunciation of traditionalists all draw on the same instinct.",
    healthy: "Clear, reasoned argument that answers ideas rather than attacking people, the way Paul reasoned in the synagogues and at Athens (Acts 17:2, 22-31)."
  },
  {
    id: "fear-certainty",
    label: "Fear and the need for certainty",
    text: "When faith feels fragile, ambiguity can feel dangerous. Sharp lines between \"us\" and \"them\" can feel safer than living with honest questions.",
    cuts: "Across camps: conservatives fearing drift, progressives fearing complicity, charismatics fearing a quenched Spirit. Anxiety looks different in each but pushes people the same way.",
    healthy: "Seeking truth from a place of rest, because \"perfect love casts out fear\" (1 John 4:18). Security in God makes it possible to listen."
  },
  {
    id: "tribal-identity",
    label: "Tribal identity",
    text: "Groups often define themselves by who they are not. Calling out an outsider can become a way of proving you belong inside.",
    cuts: "Every tribe: denominational, political, theological and online. Paul saw it in Corinth (\"I follow Paul... I follow Apollos\") long before social media.",
    healthy: "Belonging to Christ first, so that our identity is not threatened by other believers (1 Cor 1:10-13; John 17:21)."
  },
  {
    id: "attention-economy",
    label: "The online attention economy and algorithms",
    text: "Research on social media has found that moral-emotional language and posts attacking an out-group tend to be shared more. Platforms reward what gets reactions, so outrage can become a business model whether anyone intends it or not.",
    cuts: "Every camp that is online. The incentive applies equally to discernment channels, progressive commentators, charismatic personalities and their critics.",
    healthy: "Using media to teach and to warn when needed, while refusing to let engagement metrics set the tone, the targets or the frequency of criticism (Phil 4:8)."
  },
  {
    id: "personal-hurt",
    label: "Personal hurt",
    text: "Many of us carry wounds from churches or leaders. Unhealed hurt can quietly shape what we notice, what we assume and how hard we hit.",
    cuts: "Ex-charismatics critiquing charismatics, ex-fundamentalists critiquing fundamentalists, ex-progressives critiquing progressives: hurt runs in every direction. (This describes a common human pattern, not any particular person.)",
    healthy: "Letting experience inform discernment while bringing wounds to God for healing, so that warning comes from love and not from unresolved pain (Heb 12:15)."
  },
  {
    id: "right-belief-saves",
    label: "The legal gospel's \"right belief saves\" logic",
    text: "If salvation is thought to depend on holding exactly the right beliefs, then wrong beliefs become eternally dangerous and every error is an emergency. That raises the stakes of every disagreement.",
    cuts: "Wherever faith is reduced to a correct checklist, conservative or progressive. Progressive circles can show a mirror image, where holding the right social views becomes the test of belonging.",
    healthy: "Caring about truth because truth reveals who God is, while trusting that we are saved by Christ himself, not by the precision of our theology (John 5:39-40; John 13:35)."
  }
];

RG.jxVoices = [
  {
    id: "voice-1",
    name: "The Word of Faith critic",
    url: "",
    focus: "An evangelist and seminar speaker who critiques the Word of Faith and prosperity movements. His ministry describes itself as an expository preaching and teaching ministry focused on the sufficiency of God's Word and on exposing the false teachings of the prosperity, health and wealth gospel. He has formal theological training.",
    tradition: "Not stated publicly as a single tradition on the pages checked. His ministry's doctrinal statement affirms the Bible as God's inerrant and sufficient Word and salvation \"by grace alone through faith in Christ alone.\"",
    right: "He takes seriously the real damage done when people are promised health and wealth that do not come, and he points people back to Scripture and to Christ's sufficiency. Concern for those let down by false promises is a genuine act of love.",
    engage: "Weigh any critique by Scripture and by accurate sources, not by tone or reputation (Acts 17:11). Where you disagree, for example over spiritual gifts, say so charitably and specifically, and receive whatever is true."
  },
  {
    id: "voice-2",
    name: "The deconstruction apologist",
    url: "",
    focus: "A former Christian pop singer turned author and podcaster on progressive Christianity and deconstruction. She describes going through a period of profound doubt in her mid-thirties and investigating her faith intellectually, and she has written a book responding to progressive Christianity from her own experience.",
    tradition: "Not stated publicly as a single tradition",
    right: "She takes doubt seriously and models honest investigation rather than pretending hard questions do not exist. Her work urges Christians to know what they believe and why.",
    engage: "Readers in the relational stream can thank her for taking questions seriously and then answer her specific concerns from Scripture and the church fathers, distinguishing their views from positions they do not hold. Good-faith dialogue means describing each other's views in terms the other would recognise."
  },
  {
    id: "voice-3",
    name: "The ex–New Age apologist",
    url: "",
    focus: "An apologist and former follower of New Age and New Thought ideas, best known for her online videos on theology, apologetics and how New Age ideas enter churches. Her writing traces modern self-focused spirituality to the 1800s New Thought movement, of which she says she was once a follower.",
    tradition: "Not stated publicly as a single tradition",
    right: "She helps Christians notice when Christian language is used to carry ideas that make the self, rather than God, the centre. Her own story gives her an insider's understanding of ideas many critics only know second-hand.",
    engage: "When any critic groups different ideas together, respond by showing the differences carefully, for example that union with Christ in Athanasius and 2 Pet 1:4 means sharing God's life by grace, not becoming God by nature. Take seriously any genuine overlap a critic identifies, and change where change is due."
  },
  {
    id: "voice-4",
    name: "The online Bible teacher",
    url: "",
    focus: "A Bible teacher with a large online channel who exposes abuse and false teaching from a charismatic (continuationist) viewpoint. He describes his ministry as answering tough questions about the Bible and verse-by-verse teaching, with occasional topical series on apologetics, books of the Bible, cults, false prophets and cover-up culture.",
    tradition: "Evangelical. He has said publicly that he believes in prophecy and tongues today (continuationist), so he is not a cessationist.",
    right: "He spends long hours on careful study and has given voice to people who say they were harmed by leaders. He has stressed that criticising a charismatic leader is not the same as rejecting spiritual gifts.",
    engage: "Engage his arguments on the texts he discusses, and where you reach different conclusions, show your exegesis as carefully as he shows his. Disagreement about a doctrine does not have to become distrust of a person."
  }
];

RG.jxFreedom = [
  {
    id: "the-law",
    area: "Freedom from the law",
    promise: "\"Stand firm therefore in the liberty by which Christ has made us free\" (Gal 5:1); we have been \"discharged from the law\" to serve \"in newness of the spirit\" (Rom 7:6).",
    legal: "Rules return through the back door: dress codes, attendance targets, quiet times measured by minutes, lists of approved behaviour that decide who is \"really\" committed.",
    relational: "Christ fulfils the law and writes love on our hearts. We obey because the Spirit of the Son lives in us, not to earn standing (Rom 8:4; Gal 5:13-14).",
    refs: ["Gal 5:1", "Rom 7:6", "Rom 10:4", "Gal 5:13-14"]
  },
  {
    id: "condemnation",
    area: "Freedom from condemnation",
    promise: "\"There is therefore now no condemnation for those who are in Christ Jesus\" (Rom 8:1).",
    legal: "Believers are told they are forgiven, yet sermons leave them feeling that God is perpetually disappointed and one slip away from rejection.",
    relational: "\"No condemnation\" is a present-tense fact grounded in Christ, not in our latest performance. Conviction from the Spirit draws us home; condemnation drives us away.",
    refs: ["Rom 8:1", "Rom 8:33-34", "John 3:17"]
  },
  {
    id: "sins-power",
    area: "Freedom from sin's power",
    promise: "\"Sin will not have dominion over you. For you are not under law, but under grace\" (Rom 6:14).",
    legal: "Constant focus on sin keeps sin at the centre. People become more sin-conscious than Christ-conscious, and the struggle intensifies.",
    relational: "Paul's answer to sin is identity: \"consider yourselves dead to sin, but alive to God in Christ Jesus\" (Rom 6:11). Grace, not law, is what breaks sin's grip.",
    refs: ["Rom 6:6-14", "Rom 6:11", "Titus 2:11-12"]
  },
  {
    id: "fear-of-death",
    area: "Freedom from the fear of death",
    promise: "Christ shared our flesh to \"deliver all of them who through fear of death were all their lifetime subject to bondage\" (Heb 2:14-15).",
    legal: "Death is presented as the moment of final audit, so believers approach it with dread about whether they did enough.",
    relational: "Christ has already entered death and come out the other side. Death is defeated; for the believer it is falling asleep in the One who holds us (1 Cor 15:54-57).",
    refs: ["Heb 2:14-15", "1 Cor 15:54-57", "John 11:25-26"]
  },
  {
    id: "fear-of-hell",
    area: "Freedom from fear of hell (for believers)",
    promise: "\"Perfect love casts out fear, because fear has punishment\" (1 John 4:18); \"he who hears my word... has eternal life, and doesn't come into judgment\" (John 5:24).",
    legal: "Many believers are kept in line by the threat of hell, wondering after every failure whether they are still saved.",
    relational: "Fear of punishment is the opposite of mature love. Those in Christ are invited to live as beloved children, not as suspects awaiting trial.",
    refs: ["1 John 4:18", "John 5:24", "Rom 8:15"]
  },
  {
    id: "guilt-conscience",
    area: "Freedom from guilt and an accusing conscience",
    promise: "Worshippers once cleansed \"would have had no more consciousness of sins\"; we draw near \"having our hearts sprinkled from an evil conscience\" (Heb 10:2, 22).",
    legal: "Believers are taught to confess every sin to be re-forgiven, as if the slate were wiped clean only until the next failure.",
    relational: "Confession is honest agreement with God inside a secure relationship (1 John 1:9), not a transaction to regain lost forgiveness. Christ's one offering is enough (Heb 10:14).",
    refs: ["Heb 10:2", "Heb 10:14", "Heb 10:22", "1 John 1:9"]
  },
  {
    id: "the-accuser",
    area: "Freedom from the accuser",
    promise: "\"The accuser of our brothers has been thrown down, who accuses them before our God day and night\" (Rev 12:10).",
    legal: "Some preaching takes up the accuser's role, piling on blame and suspicion, so that church becomes another place of accusation.",
    relational: "Christ is our advocate, not our prosecutor (1 John 2:1). The church is meant to speak the Father's voice of welcome, not the accuser's.",
    refs: ["Rev 12:10", "Rom 8:33-34", "1 John 2:1"]
  },
  {
    id: "striving",
    area: "Freedom from striving and performance",
    promise: "\"Come to me, all you who labour and are heavily burdened, and I will give you rest\" (Matt 11:28).",
    legal: "Faith becomes a treadmill of service, programmes and spiritual disciplines, with burnout treated as a lack of commitment.",
    relational: "Fruit grows from abiding, not straining (John 15:4-5). We work hard, but from rest, because God is at work in us (Phil 2:13).",
    refs: ["Matt 11:28-30", "John 15:4-5", "Heb 4:9-10"]
  },
  {
    id: "shame",
    area: "Freedom from shame",
    promise: "Jesus \"endured the cross, despising its shame\" (Heb 12:2); \"whoever believes in him will not be disappointed (put to shame)\" (Rom 10:11).",
    legal: "Shame is used as a motivator: public failures are exposed, struggles are hidden, and people learn to pretend.",
    relational: "Christ carried our shame and clothes us with his honour. Where shame says \"I am bad\", grace says \"you are loved, and you can be honest here\".",
    refs: ["Heb 12:2", "Rom 10:11", "Isa 61:7"]
  },
  {
    id: "religion-rules",
    area: "Freedom from religion and human rules",
    promise: "\"If you died with Christ... why... do you subject yourselves to ordinances, 'Don't handle, nor taste, nor touch'?\"; such rules have \"no value against the indulgence of the flesh\" (Col 2:20-23).",
    legal: "Extra-biblical rules become markers of spirituality, and keeping them is mistaken for holiness.",
    relational: "Paul says human rules cannot change the heart. Transformation comes from union with the risen Christ, setting our minds on him (Col 3:1-4).",
    refs: ["Col 2:20-23", "Col 3:1-4", "Mark 7:6-8"]
  },
  {
    id: "the-curse",
    area: "Freedom from the curse",
    promise: "\"Christ redeemed us from the curse of the law, having become a curse for us\" (Gal 3:13).",
    legal: "Misfortune is interpreted as God's curse for some failure, or blessing is promised only to the obedient, reintroducing curse-thinking.",
    relational: "Christ has taken the curse into himself and exhausted it, so that \"the blessing of Abraham might come on the Gentiles through Christ Jesus\" (Gal 3:14). Suffering is not a sign that God has cursed his children.",
    refs: ["Gal 3:13-14", "Rom 8:28", "John 9:1-3"]
  },
  {
    id: "separation",
    area: "Freedom from separation from God",
    promise: "\"You who once were far off are made near in the blood of Christ\" (Eph 2:13); nothing \"will be able to separate us from God's love\" (Rom 8:38-39).",
    legal: "God is pictured as distant, holy in a way that keeps him away, so that each sin is thought to break fellowship until it is repaired.",
    relational: "In Christ, God and humanity are joined. Our feelings of distance are real, but they are not the truth about where we stand: we are in Christ, and he is in us (John 14:20).",
    refs: ["Eph 2:13", "Rom 8:38-39", "John 14:20", "Col 1:21-22"]
  }
];

RG.jxContra = {
  legal: [
    { id: "you-are-sinner", step: "You are a sinner", text: "Everyone has sinned and falls short of God's glory (Rom 3:23). This is true, and every tradition agrees on it.", kind: "claim" },
    { id: "cant-forgive", step: "God can't forgive without punishment", text: "Popular preaching often says God's justice requires that every sin be punished before he can forgive. Many traditions hold a form of this; others read the cross differently.", kind: "claim" },
    { id: "cant-be-righteous", step: "You can't make yourself righteous", text: "No one is justified by works of the law (Gal 2:16). Our own efforts cannot bridge the gap.", kind: "claim" },
    { id: "jesus-paid", step: "Jesus came and paid it all", text: "Christ died for our sins and rose again. Salvation is by grace through faith, \"not of works\" (Eph 2:8-9).", kind: "claim" },
    { id: "now-overcome", step: "Now overcome sin by effort", text: "Then the message shifts: now you must try hard to stop sinning and live a holy life. What began in grace is quietly continued by willpower.", kind: "tension" },
    { id: "or-not-saved", step: "Or you won't be saved, or you never really believed", text: "If the effort fails, listeners are warned that they may lose salvation, or that their faith was never real. The grace that saved them now seems to depend on their performance.", kind: "tension" },
    { id: "assurance-anxiety", step: "Assurance or anxiety?", text: "Many sincere believers end up checking their fruit nervously, unsure whether they are in. Paul's question fits: \"Having begun in the Spirit, are you now completed in the flesh?\" (Gal 3:3).", kind: "tension" },
    { id: "rest-question", step: "Is there a better way to hold this?", text: "The tension is real, and the major traditions have thoughtful answers to it. The relational gospel offers its own resolution, rooted in union with Christ.", kind: "rest" }
  ],
  answers: [
    {
      id: "reformed",
      tradition: "Reformed",
      answer: "Reformed theology teaches that those whom God truly calls will persevere to the end, because perseverance depends on God's faithfulness rather than on human willpower (Westminster Confession 17). Good works are \"fruits and evidences\" of true faith, not its cause, and assurance is possible, though the Confession admits a true believer may struggle long before attaining it."
    },
    {
      id: "arminian-wesleyan",
      tradition: "Arminian / Wesleyan",
      answer: "Arminian and Wesleyan traditions generally teach that grace enables a free human response and that a believer can, by persistent unbelief, fall away from grace. Wesley also stressed the Spirit's inner witness that we are God's children, so assurance rests on God's present testimony rather than a nervous audit of works."
    },
    {
      id: "lutheran",
      tradition: "Lutheran",
      answer: "Lutheran theology distinguishes sharply between law and gospel: the law exposes sin, but the gospel alone gives life and assurance, delivered through Word and sacraments. Lutherans teach that a believer can fall away, yet they direct anxious consciences away from introspection and back to Christ's promise, especially in baptism."
    }
  ],
  relational: [
    { id: "included", step: "You are included in Christ", text: "Before you tried anything, the Father placed you in his Son. Your story starts with belonging, not with failure.", ref: "Eph 1:3-6; 2 Cor 5:14-19" },
    { id: "grace-teaches", step: "Grace itself teaches", text: "The same grace that saves also trains us to say no to ungodliness. Grace is not only a pardon but a teacher and a power.", ref: "Titus 2:11-12" },
    { id: "holiness-wholeness", step: "Holiness is wholeness", text: "Holiness is not a test to pass but the healing of our humanity as we share Christ's life. It flows from union, not toward it.", ref: "2 Pet 1:3-4; 1 Thess 5:23" },
    { id: "god-works-in", step: "God works in you", text: "We \"work out\" what God is already working in. Effort is real, but it is a response to his life within, not a ladder to reach him.", ref: "Phil 2:12-13" },
    { id: "not-under-law", step: "Sin loses its grip under grace", text: "Paul's surprising claim is that grace, not law, is what breaks sin's power. Fear and threat feed the very thing they try to stop.", ref: "Rom 6:14" },
    { id: "secure-love", step: "Secure love bears fruit", text: "Branches bear fruit by staying connected, not by straining. Assurance rests on Christ's faithfulness, and from that rest, love grows.", ref: "John 15:4-5; Rom 8:38-39" }
  ]
};

RG.jxEvidence5 = [
  {
    text: "Brady and colleagues (PNAS, 2017) analysed 563,312 social media messages on polarising issues and found that each additional moral-emotional word increased a message's diffusion by about 20%, more strongly within like-minded networks.",
    source: "NYU Center for Social Media and Politics, research summary",
    url: "https://csmapnyu.org/research/academic-research/emotion-shapes-the-diffusion-of-moralized-content-in-social-networks"
  },
  {
    text: "Rathje, Van Bavel and van der Linden (PNAS, 2021) found that posts referring to the political out-group were shared about twice as often as posts about the in-group, and drew more \"angry\" reactions.",
    source: "PsyPost summary of \"Out-group animosity drives engagement on social media\"",
    url: "https://www.psypost.org/hostility-towards-outsiders-motivates-engagement-on-social-media"
  },
  {
    text: "The Westminster Confession (ch. 17-18) teaches that those effectually called \"can neither totally nor finally fall away from the state of grace,\" calls good works \"fruits and evidences of a true and lively faith,\" and says a true believer \"may wait long and conflict with many difficulties\" before attaining assurance.",
    source: "Ligonier Ministries, The Westminster Confession of Faith",
    url: "https://learn.ligonier.org/articles/westminster-confession-faith"
  }
];
