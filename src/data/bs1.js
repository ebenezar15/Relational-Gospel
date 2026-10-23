window.RG = window.RG || {}; var RG = window.RG;

/* Round 21 A: "Blessing, matter & the spiritual life" — words, spectrum, shalom, spiritual life */

RG.bsIntro = {
  lede: "What does the Bible mean by “every spiritual blessing”? Why do many believers feel guilty about health, money and enjoyment, and push every promise off to heaven? This study traces the old Gnostic split between spirit and matter, answers the arguments against God’s will to heal and provide, asks why blessing is not always seen, and sets out what the church can do, from the relational gospel and from Word of Faith, dominion and manifested-sons perspectives, with honest cautions.",
  thesis: "In Scripture, “spiritual” means <b>of the Spirit</b>, not <b>non-material</b>. The Spirit created matter, filled Jesus’ body, raised it from the dead, and will renew the whole earth. So a spiritual blessing reaches the whole person: forgiveness and sonship first and foremost, and from that root, healing, provision, work, family and community (shalom). God’s heart is life, not sickness and lack (John 10:10; 3 John 2). Blessing is not a vending-machine guarantee for individual comfort. It is the overflow of union with Christ, shared in community and given for generosity. Where it is not yet seen, the answer is neither to deny the promise nor to blame the sufferer, but to grow up into Christ together."
};

/* Word studies */
RG.bsWords = [
  { id: "pneumatikos", word: "pneumatikos", lang: "Greek", gloss: "spiritual, of the Spirit",
    meaning: "Comes from <em>pneuma</em> (Spirit). In Paul it means “belonging to, given by or animated by the Holy Spirit”, not “immaterial”. In 1 Cor 15:44 the resurrection body is a <em>sōma pneumatikon</em>, a “spiritual body”: real, physical, touchable (Luke 24:39), but fully alive with the Spirit.",
    misread: "“Spiritual blessings” is often read as “non-physical blessings only”, as if God cared only about the invisible soul.",
    ref: "Eph 1:3; 1 Cor 15:44–46; 1 Cor 2:15" },
  { id: "eulogia", word: "eulogia", lang: "Greek", gloss: "blessing, good word, generous gift",
    meaning: "Literally a “good word”. God’s blessing is his creative word of favour. Paul uses the same word for a financial gift (2 Cor 9:5–6: “bountifully”, literally “with blessings”).",
    misread: "Separating “blessing” from material generosity, when Paul uses one word for both.",
    ref: "Eph 1:3; 2 Cor 9:5–8; Gal 3:14" },
  { id: "barak", word: "barak / berakah", lang: "Hebrew", gloss: "to bless; a blessing",
    meaning: "God’s life-giving power and favour that makes people fruitful: children, crops, flocks, peace, long life and a name. The first words God speaks to humans are a blessing: “be fruitful and multiply… and have dominion” (Gen 1:28).",
    misread: "Treating Old Testament blessing as purely earthly and New Testament blessing as purely heavenly.",
    ref: "Gen 1:28; Gen 12:2–3; Num 6:24–26; Deut 28:1–14" },
  { id: "shalom", word: "shalom", lang: "Hebrew", gloss: "peace, wholeness, wellbeing",
    meaning: "Not just the absence of conflict but completeness: health, safety, provision, right relationships with God, people and land. The priestly blessing ends with “give you shalom”.",
    misread: "Reducing peace to an inner feeling.",
    ref: "Num 6:26; Jer 29:7; Isa 53:5" },
  { id: "makarios", word: "makarios / ashrei", lang: "Greek / Hebrew", gloss: "blessed, flourishing, happy",
    meaning: "The state of a person who is truly flourishing under God’s favour. In the Beatitudes Jesus calls the poor, mourning and persecuted “blessed”, not because poverty and grief are good, but because the kingdom is coming to them.",
    misread: "Reading the Beatitudes as praise of poverty and suffering themselves.",
    ref: "Ps 1:1–3; Matt 5:3–12; Luke 6:20–26" },
  { id: "zoe", word: "zōē", lang: "Greek", gloss: "life, the life of God",
    meaning: "The divine life that Jesus has and gives: “I came that they may have life, and have it abundantly.” Eternal life is knowing the Father and the Son now (John 17:3), and it touches mortal bodies (Rom 8:11).",
    misread: "Thinking eternal life only starts after death.",
    ref: "John 10:10; John 17:3; Rom 8:11" },
  { id: "sozo", word: "sōzō", lang: "Greek", gloss: "save, heal, make whole, rescue",
    meaning: "The same verb is used for forgiveness of sins, physical healing (“your faith has made you well”) and rescue from danger. Salvation is whole-person.",
    misread: "Translating it “save” when it is about souls and “heal” when it is about bodies, which hides the connection.",
    ref: "Mark 5:34; Luke 7:50; James 5:15; Rom 10:9" }
];

/* The spectrum from Gnostic escape to materialism */
RG.bsSpectrum = [
  { id: "gnostic", label: "Gnostic escape", short: "Matter is bad; escape it",
    belief: "The body and the material world are inferior or evil. Salvation means the soul escaping to a purely spiritual heaven. Wealth, pleasure and the body are suspect.",
    fruit: "Guilt about enjoyment, neglect of the body, fatalism about sickness and poverty, withdrawal from society, little interest in creation care, work or justice.",
    scripture: "Paul warns against those who “forbid marriage and command to abstain from foods, which God created to be received with thanksgiving” (1 Tim 4:1–5; Col 2:20–23)." },
  { id: "pietist", label: "Heaven-only piety", short: "Body fine, but only the soul matters",
    belief: "God made the world good, but the gospel is only about getting souls to heaven. Promises of healing and provision are “spiritualised” or postponed to the afterlife.",
    fruit: "Sincere devotion, but a split between sacred and secular, low expectations for prayer, “this world is not my home” escapism.",
    scripture: "Jesus taught us to pray “your will be done on earth as it is in heaven” (Matt 6:10)." },
  { id: "shalom", label: "Biblical shalom", short: "Whole person, whole creation, Christ at the centre",
    belief: "God made matter good, became flesh, rose bodily and will renew the earth. Blessing flows from union with Christ to every area of life, for love and generosity. Suffering is real; the kingdom is now and not yet.",
    fruit: "Gratitude, generosity, prayer with expectation, use of medicine, good work, justice for the poor, contentment in want and in plenty.",
    scripture: "“Every good gift is from above” (James 1:17). “I know how to be abased and how to abound” (Phil 4:12). “Command the rich… to be generous” (1 Tim 6:17–19)." },
  { id: "prosperity", label: "Prosperity formula", short: "Faith as a tool for personal gain",
    belief: "Health and wealth are guaranteed to anyone with enough faith, confession or giving. Sickness and poverty always mean a lack of faith.",
    fruit: "Hope and boldness for some, but also guilt and blame for the sick and poor, manipulative giving appeals and leaders’ luxury.",
    scripture: "“Godliness with contentment is great gain… the love of money is a root of all kinds of evil” (1 Tim 6:6–10)." },
  { id: "materialist", label: "Secular materialism", short: "Only matter is real",
    belief: "There is no spiritual reality. Life is about comfort, consumption and success now.",
    fruit: "Restlessness, debt, consumer identity, despair when health or wealth fail.",
    scripture: "“What does it profit a man to gain the whole world and lose his soul?” (Mark 8:36)." }
];

/* Shalom wheel: dimensions of blessing */
RG.bsWheel = [
  { id: "sonship", label: "Sonship", text: "The root of every blessing: adoption, forgiveness and union with Christ. Everything else flows from this.", ref: "Eph 1:3–7; Gal 4:4–7", caution: "Never trade the Giver for the gifts." },
  { id: "spirit", label: "Spirit-life", text: "The Spirit’s presence, gifts, joy and power in daily life.", ref: "Gal 5:22–25; Acts 1:8", caution: "Spirit-life is not escape from the body but life in it." },
  { id: "mind", label: "Mind & emotions", text: "A sound mind, peace, renewed thinking, emotional healing.", ref: "2 Tim 1:7; Phil 4:6–7; Rom 12:2", caution: "Peace can coexist with grief and struggle." },
  { id: "body", label: "Health", text: "Healing, strength, long life. Jesus healed bodies as a sign of the kingdom.", ref: "Ps 103:3; Matt 8:16–17; James 5:14–16", caution: "Medicine is also God’s gift; not every healing comes on our timetable." },
  { id: "provision", label: "Provision", text: "Daily bread, enough and more than enough for generosity.", ref: "Matt 6:11, 33; 2 Cor 9:8–11; Phil 4:19", caution: "Provision is for sufficiency and generosity, not hoarding or display." },
  { id: "work", label: "Work & dominion", text: "Fruitful work, creativity, stewardship of creation.", ref: "Gen 1:28; Gen 2:15; Deut 8:18", caution: "Dominion means caring service, not domination of people." },
  { id: "family", label: "Family & friendship", text: "Marriage, children, friendship, belonging.", ref: "Ps 128; Ps 68:6; Prov 17:17", caution: "Singleness and childlessness are not curses; the church is family." },
  { id: "community", label: "Community & justice", text: "A city that flourishes, justice for the poor, a church with no needy among them.", ref: "Jer 29:7; Acts 4:32–35; Isa 58:6–12", caution: "Blessing is corporate, not just private." }
];

/* What is spiritual life? */
RG.bsLife = {
  split: [
    { label: "Spiritual", items: ["Prayer", "Bible reading", "Church meetings", "Evangelism", "The soul", "Heaven later"] },
    { label: "Secular", items: ["Work and business", "Eating and rest", "Marriage and sex", "Money", "The body and health", "This world now"] }
  ],
  whole: [
    { area: "Prayer & Scripture", text: "Conversation with the Father, in the Son, by the Spirit.", ref: "Matt 6:6; Col 3:16" },
    { area: "Work", text: "Done “as to the Lord”: carpentry, farming, business and art are spiritual when done in him.", ref: "Col 3:23–24; Exod 31:1–5" },
    { area: "Eating & rest", text: "“Whether you eat or drink, do all to the glory of God.” Sabbath rest is holy.", ref: "1 Cor 10:31; Mark 2:27" },
    { area: "Body & sexuality", text: "The body is a temple of the Spirit, not a prison of the soul. Marriage is good.", ref: "1 Cor 6:19–20; Heb 13:4; Song 7:10" },
    { area: "Money", text: "Stewarded with gratitude, generosity and contentment.", ref: "2 Cor 9:6–11; 1 Tim 6:17–19" },
    { area: "Love & justice", text: "Visiting the sick, feeding the hungry, defending the oppressed is pure religion.", ref: "James 1:27; Matt 25:35–40" }
  ],
  definition: "Spiritual life is the life of the Father, Son and Spirit shared with us: knowing God (John 17:3), walking by the Spirit (Gal 5:25), and living every part of embodied life in union with Christ. It is not a separate religious compartment. The most “spiritual” man who ever lived ate, worked as a carpenter, went to weddings, touched lepers, and rose with a body."
};
