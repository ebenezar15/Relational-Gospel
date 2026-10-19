window.RG = window.RG || {};
var RG = window.RG;

/* Round 16: "How God works", part 3 (interactive visuals).
   wyChar: 16 traits of God as seen in Jesus, with the distortions religion often projected.
   wySorter: 14 statements about how God works, sorted into does / doesn't / depends.
   wyScales: what God does and does not do personally, in callings, and globally.
   wyEvidence3: verified sources (checked 2026-10).
   Bible quotations are from the World English Bible (WEB) unless marked KJV. */

RG.wyChar = [
  {
    id: "love",
    trait: "Love",
    distortion: "God as a stern judge whose love must be earned, or who loves only the obedient and tolerates everyone else.",
    jesus: "Jesus shows a love that goes first, before anyone has cleaned themselves up. He does not love us because we are lovable; he loves because love is who God is.",
    scene: "A father runs down the road to embrace a son who wasted everything, before the son can finish his speech (Luke 15:11-24).",
    ref: "1 John 4:8 — “He who doesn’t love doesn’t know God, for God is love.”"
  },
  {
    id: "light",
    trait: "Light",
    distortion: "God as a dark, unpredictable power with a hidden side we should be afraid of.",
    jesus: "In Jesus there is no shadow side to God, no secret mood waiting behind the kindness. His light exposes what harms us so that we can be healed, not so that we can be shamed.",
    scene: "Jesus heals a man born blind and refuses the idea that his blindness was a punishment (John 9:1-7).",
    ref: "1 John 1:5 — “God is light, and in him is no darkness at all.”"
  },
  {
    id: "faithful",
    trait: "Faithful",
    distortion: "God as fickle, close when we perform well and gone when we fail.",
    jesus: "Jesus stays with people who let him down, and he keeps his promises when they do not keep theirs. His faithfulness does not depend on ours.",
    scene: "Jesus tells Peter he will deny him, prays for him in advance, and later restores him by a charcoal fire (Luke 22:31-34; John 21:15-19).",
    ref: "2 Timothy 2:13 — “If we are faithless, he remains faithful; for he can’t deny himself.”"
  },
  {
    id: "humble",
    trait: "Humble",
    distortion: "God as a cosmic emperor who demands to be served and is far above dirty, ordinary life.",
    jesus: "The one who shares God’s nature did not grasp at status but emptied himself and became a servant. God’s greatness turns out to look like lowliness.",
    scene: "Jesus is born among animals and laid in a feeding trough, with shepherds as his first visitors (Luke 2:7-16).",
    ref: "Philippians 2:7-8 — he “emptied himself, taking the form of a servant… he humbled himself, becoming obedient to death.”"
  },
  {
    id: "patient",
    trait: "Patient",
    distortion: "God as short-tempered, keeping score and quick to strike when patience runs out.",
    jesus: "Jesus is slow with slow learners. He repeats himself to confused disciples and gives fruitless lives another season of care.",
    scene: "In the parable of the fig tree, the gardener asks for one more year to dig and feed the tree instead of cutting it down (Luke 13:6-9).",
    ref: "2 Peter 3:9 — the Lord “is patient with us, not wishing that anyone should perish, but that all should come to repentance.”"
  },
  {
    id: "kind",
    trait: "Kind",
    distortion: "God as harsh, using hardship and shame to keep people in line.",
    jesus: "Jesus is kind to the people religion had pushed out: the sick, the unclean, children, foreigners. His kindness is not weakness; it is what draws people to change.",
    scene: "Jesus touches a man with leprosy, someone nobody touched, before he heals him (Mark 1:40-42).",
    ref: "Romans 2:4 — “the goodness of God leads you to repentance.”"
  },
  {
    id: "gentle",
    trait: "Gentle, non-coercive",
    distortion: "God as a controller who forces his will, overrides people, and treats love as a demand.",
    jesus: "Jesus invites, asks and knocks, but he does not force anyone through the door. He lets the rich young man walk away, loving him as he goes.",
    scene: "A rich man asks Jesus about eternal life; Jesus looks at him, loves him, tells him the truth, and lets him leave sad (Mark 10:17-22).",
    ref: "Revelation 3:20 — “Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will come in to him.”"
  },
  {
    id: "just",
    trait: "Just (restoring)",
    distortion: "God’s justice as mainly payback: a ledger that must be settled in pain.",
    jesus: "Jesus sets things right by lifting up the crushed and confronting the crushers. His justice aims at repair, though it does not excuse harm; Zacchaeus still repays fourfold.",
    scene: "A tax collector meets Jesus at dinner and chooses to give half his goods to the poor and repay those he cheated (Luke 19:1-10).",
    ref: "Luke 4:18 — “He has sent me to heal the broken hearted, to proclaim release to the captives… to deliver those who are crushed.”"
  },
  {
    id: "holy",
    trait: "Holy (wholly love)",
    distortion: "Holiness as God’s need to keep away from sinners, as if they might contaminate him.",
    jesus: "In Jesus holiness moves toward the unclean, and instead of being made unclean he makes them whole. God is “other” not by being distant, but by loving in a way nothing else does.",
    scene: "A bleeding woman, considered unclean, touches his clothes; Jesus does not rebuke her but calls her “daughter” (Mark 5:25-34).",
    ref: "Hosea 11:9 (KJV) — “I will not execute the fierceness of mine anger… for I am God, and not man; the Holy One in the midst of thee.”"
  },
  {
    id: "joyful",
    trait: "Joyful",
    distortion: "God as grim and joyless, suspicious of pleasure and party.",
    jesus: "Jesus’ first sign is at a wedding, and his critics call him a party-goer. He says heaven throws a celebration over one person who comes home.",
    scene: "At a wedding in Cana, Jesus turns water into a large amount of good wine so the celebration can go on (John 2:1-11).",
    ref: "Luke 15:7 — “there will be more joy in heaven over one sinner who repents.”"
  },
  {
    id: "self-giving",
    trait: "Self-giving",
    distortion: "God as a taker who needs our sacrifices to be satisfied.",
    jesus: "Jesus does not demand a sacrifice; he becomes one, giving himself for the people who reject him. The cross shows God giving, not God getting.",
    scene: "At supper Jesus breaks bread and says, “This is my body which is given for you” (Luke 22:19).",
    ref: "John 15:13 — “Greater love has no one than this, that someone lay down his life for his friends.”"
  },
  {
    id: "consistent",
    trait: "Consistent",
    distortion: "Two faces of God: a wrathful God of the Old Testament and a gentle Jesus who calms him down.",
    jesus: "Jesus does not change God’s mind about us; he shows us God’s mind. What we see in Jesus is what God has always been like.",
    scene: "Philip asks to see the Father; Jesus answers that whoever has seen him has seen the Father (John 14:8-9).",
    ref: "Hebrews 13:8 — “Jesus Christ is the same yesterday, today, and forever.” See also James 1:17."
  },
  {
    id: "near",
    trait: "Personal and near",
    distortion: "God as remote, uninterested in ordinary lives, reachable only through special people or places.",
    jesus: "In Jesus God moves into the neighbourhood, eats at people’s tables and calls them by name. He promises the Father and Son will make their home with those who love him.",
    scene: "Weeping in a garden, Mary Magdalene does not recognise the risen Jesus until he says her name (John 20:11-16).",
    ref: "John 1:14 — “The Word became flesh, and lived among us.”"
  },
  {
    id: "forgiving",
    trait: "Forgiving",
    distortion: "God as reluctant to forgive until he has been paid, pleaded with, or shown enough remorse.",
    jesus: "Jesus forgives before people ask, even while they are hurting him. Forgiveness is not something we pry out of God; it pours from him.",
    scene: "Nailed to the cross, Jesus prays for the soldiers and the crowd (Luke 23:33-34).",
    ref: "Luke 23:34 — “Father, forgive them, for they don’t know what they are doing.”"
  },
  {
    id: "truthful",
    trait: "Truthful",
    distortion: "God as either a flatterer who never challenges us, or a fault-finder who only tells hard truths.",
    jesus: "Jesus tells people the truth about themselves without crushing them. He is full of grace and truth at once, not one at the expense of the other.",
    scene: "At a well, Jesus names a Samaritan woman’s past honestly, and she runs to tell the town, unashamed (John 4:16-29).",
    ref: "John 1:14 — “full of grace and truth.” Also John 14:6."
  },
  {
    id: "servant",
    trait: "Servant",
    distortion: "God as a master who uses people as tools for his own glory.",
    jesus: "The Lord of all kneels to wash feet, including the feet of the one who will betray him. Serving is not beneath God; it is how God rules.",
    scene: "Jesus takes a towel and basin and washes his disciples’ feet (John 13:1-15).",
    ref: "Mark 10:45 — “the Son of Man came not to be served, but to serve, and to give his life as a ransom for many.”"
  }
];

RG.wySorter = [
  {
    id: "forces-obedience",
    statement: "God forces people to obey him.",
    answer: "doesnt",
    why: "Love that is forced is not love, and Scripture shows God inviting, warning and pleading rather than overriding: “How often I wanted to gather your children… and you refused!” (Luke 13:34). Traditions differ on how grace works in the heart (Reformed theology speaks of grace that effectively renews the will), but none teaches that God turns people into puppets.",
    refs: ["Luke 13:34", "Revelation 3:20", "1 Corinthians 13:5", "Deuteronomy 30:19"]
  },
  {
    id: "speaks-first",
    statement: "God sometimes speaks first, even when we haven’t asked.",
    answer: "does",
    why: "Moses was minding sheep when God called from a bush, and Saul was on his way to arrest Christians when Jesus stopped him. It is true that God respects our freedom, but Scripture is full of God taking the initiative: Abram, Samuel, Jonah, Cornelius and Peter.",
    refs: ["Exodus 3:1-6", "Acts 9:1-6", "Genesis 12:1", "1 Samuel 3:1-10", "Acts 10:1-20"]
  },
  {
    id: "makes-decisions",
    statement: "God makes our decisions for us.",
    answer: "depends",
    why: "Usually God does not decide for us: he gives wisdom, counsel and freedom, and we remain responsible for our choices (Prov 3:5-6; Jas 1:5). Yet there are moments of very clear direction, like the Spirit closing doors and a vision calling Paul to Macedonia (Acts 16:6-10), and even then people still had to choose to go; how much God steers is debated between traditions.",
    refs: ["Proverbs 3:5-6", "Proverbs 16:9", "Acts 16:6-10", "Joshua 24:15"]
  },
  {
    id: "gives-wisdom",
    statement: "God gives wisdom when we ask.",
    answer: "does",
    why: "James promises that God “gives to all liberally and without reproach” when we ask for wisdom. This wisdom often comes through Scripture, good counsel, reflection and the Spirit’s quiet nudges, and it bears the marks of being “pure, then peaceful, gentle” (Jas 3:17).",
    refs: ["James 1:5", "James 3:17", "Proverbs 2:6"]
  },
  {
    id: "sends-sickness",
    statement: "God sends sickness to teach us lessons.",
    answer: "doesnt",
    why: "Jesus treated sickness as something to heal, not a lesson to accept, and he rejected the idea that a man’s blindness was punishment (John 9:1-3). The relational view says God can bring good out of illness without being its author; other Christians, pointing to texts like Deut 28 or 1 Cor 11:30, believe God can send or permit sickness as discipline, so this is honestly debated.",
    refs: ["John 9:1-3", "Acts 10:38", "Luke 13:16", "James 1:13, 17"]
  },
  {
    id: "overrides-laws",
    statement: "God overrides natural laws whenever we pray enough.",
    answer: "doesnt",
    why: "Prayer matters and God does sometimes act in extraordinary ways, but miracles are gifts, not results we can unlock with enough effort or words. Jesus warned against thinking we are heard “for our much speaking” (Matt 6:7), and Paul prayed three times for relief and was given grace instead (2 Cor 12:8-9).",
    refs: ["Matthew 6:7-8", "2 Corinthians 12:7-9", "Matthew 5:45"]
  },
  {
    id: "doctors-medicine",
    statement: "God works through doctors and medicine.",
    answer: "does",
    why: "Every good gift comes from the Father of lights (Jas 1:17), and that includes medical knowledge and skilled care. Luke, who wrote a Gospel and Acts, is called “the beloved physician,” and Paul advised Timothy to take a little wine for his stomach.",
    refs: ["James 1:17", "Colossians 4:14", "1 Timothy 5:23", "Luke 10:34"]
  },
  {
    id: "no-tragedy",
    statement: "God guarantees that no believer will suffer tragedy.",
    answer: "doesnt",
    why: "Jesus said, “In the world ye shall have tribulation” (John 16:33, KJV), and in Acts James is killed while Peter is freed (Acts 12:1-11). The promise is not that tragedy never comes but that nothing can separate us from God’s love and that he is with us in it (Rom 8:35-39; Isa 43:2).",
    refs: ["John 16:33", "Acts 12:1-11", "Hebrews 11:35-38", "Romans 8:35-39"]
  },
  {
    id: "respects-no",
    statement: "God respects our “no”.",
    answer: "does",
    why: "Jesus let the rich young man walk away, and he wept over Jerusalem because it would not receive him (Mark 10:21-22; Luke 19:41-42). God keeps loving and keeps calling, but he does not drag anyone into relationship against their will.",
    refs: ["Mark 10:21-22", "Luke 13:34", "Luke 19:41-42", "Revelation 3:20"]
  },
  {
    id: "traps-us",
    statement: "God manipulates circumstances to trap us.",
    answer: "doesnt",
    why: "James says plainly that God “tempts no one” and that every good gift comes from him (Jas 1:13, 17). God may let us face the consequences of our choices, and testing appears in Scripture, but tricking people into failure is the opposite of the light in whom there is no darkness (1 John 1:5).",
    refs: ["James 1:13-17", "1 John 1:5", "1 Corinthians 10:13"]
  },
  {
    id: "warns-guides",
    statement: "God warns and guides.",
    answer: "does",
    why: "Joseph was warned in a dream to flee to Egypt, and Paul’s plans were redirected by the Spirit. Jesus says his sheep hear his voice, and the Spirit leads God’s children (John 10:27; Rom 8:14).",
    refs: ["Matthew 2:13", "Acts 16:6-10", "John 10:27", "Romans 8:14", "Isaiah 30:21"]
  },
  {
    id: "tells-everything",
    statement: "God tells us everything we want to know.",
    answer: "doesnt",
    why: "“The secret things belong to Yahweh our God” (Deut 29:29), and Jesus told his friends, “It isn’t for you to know times or seasons” (Acts 1:7). God reveals what we need for trust and love, not every answer our curiosity wants; Job never received an explanation, but he met God.",
    refs: ["Deuteronomy 29:29", "Acts 1:7", "1 Corinthians 13:12", "Job 38:1-4"]
  },
  {
    id: "only-if-asked",
    statement: "God will never intervene unless we ask.",
    answer: "depends",
    why: "There is real truth here: God honours prayer and freedom, and James says “you don’t have, because you don’t ask” (Jas 4:2). But God also acts unasked, for example calling Saul on the Damascus road or sending Philip to the Ethiopian official (Acts 8:26-29; 9:3-6), so “never” is too strong; how prayer and God’s initiative fit together is debated among Reformed, Arminian and open views.",
    refs: ["James 4:2", "Acts 8:26-29", "Acts 9:3-6", "Romans 5:8"]
  },
  {
    id: "suffering-for-good",
    statement: "God uses suffering for good, though he does not author evil.",
    answer: "depends",
    why: "Joseph says, “You meant evil against me, but God meant it for good” (Gen 50:20), and Paul says God “works together” all things for good for those who love him (Rom 8:28). Christians agree God brings good out of suffering, but they differ on whether he ordains it (Reformed), permits it (Arminian), or opposes it while working within a world of real freedom and spiritual conflict (open and warfare views, e.g. Greg Boyd).",
    refs: ["Genesis 50:20", "Romans 8:28", "James 1:13", "Luke 13:1-5"]
  }
];

RG.wyScales = [
  {
    id: "personal",
    scale: "Personal",
    does: [
      { t: "He loves us before we change.", ref: "Romans 5:8" },
      { t: "He gives wisdom when we ask.", ref: "James 1:5" },
      { t: "He speaks, sometimes before we ask.", ref: "1 Samuel 3:10" },
      { t: "He comforts us in grief.", ref: "2 Corinthians 1:3-4" },
      { t: "He forgives and heals.", ref: "Psalm 103:3" },
      { t: "He is with us in the fire and the flood.", ref: "Isaiah 43:2" }
    ],
    doesnt: [
      { t: "He does not force our love or obedience.", ref: "Revelation 3:20" },
      { t: "He does not tempt us to sin.", ref: "James 1:13" },
      { t: "He does not condemn those in Christ.", ref: "Romans 8:1" },
      { t: "He does not promise a life free of trouble.", ref: "John 16:33" },
      { t: "He does not withdraw his love when we fail.", ref: "Romans 8:38-39" }
    ],
    note: "Christians agree that God is personally involved, but they differ on how directly he shapes each event in a life. The relational view stresses God’s nearness and our real freedom; Reformed believers stress that nothing happens outside his sovereign care."
  },
  {
    id: "calling",
    scale: "Calling and purpose",
    does: [
      { t: "He calls people, often unexpectedly.", ref: "Exodus 3:4-10" },
      { t: "He equips those he calls.", ref: "Exodus 4:11-12" },
      { t: "He redirects plans along the way.", ref: "Acts 16:6-10" },
      { t: "He gives different gifts to different people.", ref: "1 Corinthians 12:4-7" },
      { t: "He works through our choices and plans.", ref: "Proverbs 16:9" },
      { t: "He finishes what he begins.", ref: "Philippians 1:6" }
    ],
    doesnt: [
      { t: "He does not remove our responsibility to choose.", ref: "Joshua 24:15" },
      { t: "He does not measure our worth by our usefulness.", ref: "Luke 10:20" },
      { t: "He does not abandon us when we run away.", ref: "Jonah 2:10" },
      { t: "He does not give everyone the same path.", ref: "John 21:21-22" }
    ],
    note: "Some Christians believe God has one specific plan for each life to be discovered; others think he gives a wide space of good options within his will, guided by wisdom and love. Both views find support in Scripture, and many find guidance comes most clearly in hindsight."
  },
  {
    id: "global",
    scale: "Global",
    does: [
      { t: "He sustains all things.", ref: "Hebrews 1:3" },
      { t: "He sends sun and rain on all people.", ref: "Matthew 5:45" },
      { t: "He works for justice and peace through people.", ref: "Micah 6:8" },
      { t: "He brings good out of evil.", ref: "Genesis 50:20" },
      { t: "He is reconciling the whole world to himself.", ref: "2 Corinthians 5:19" },
      { t: "He will make all things new.", ref: "Revelation 21:5" }
    ],
    doesnt: [
      { t: "He does not treat disaster victims as worse sinners.", ref: "Luke 13:4-5" },
      { t: "He does not author evil.", ref: "James 1:13" },
      { t: "He does not rule by violence and domination.", ref: "Mark 10:42-45" },
      { t: "He does not give up on his creation.", ref: "Romans 8:19-21" }
    ],
    note: "Why God prevents some disasters and not others is one of the hardest questions in faith, and Scripture does not give a simple formula. Views range from meticulous providence (Reformed) to middle knowledge (Molinism), general providence (Arminian), and open or relational theism (Boyd, Pinnock, Oord), and honest believers hold their answer with humility."
  }
];

RG.wyEvidence3 = [
  {
    text: "Hebrews 1:3 (WEB): “His Son is the radiance of his glory, the very image of his substance, and upholding all things by the word of his power.”",
    source: "Bible Hub, Hebrews 1 (World English Bible)",
    url: "https://biblehub.com/web/hebrews/1.htm"
  },
  {
    text: "John 14:9 (WEB): “He who has seen me has seen the Father. How do you say, ‘Show us the Father?’”",
    source: "Bible Hub, John 14 (World English Bible)",
    url: "https://biblehub.com/web/john/14.htm"
  },
  {
    text: "James 1:5 and 1:17 (WEB): God “gives to all liberally and without reproach”; every good gift comes “from the Father of lights, with whom can be no variation nor turning shadow.”",
    source: "Bible Hub, James 1 (World English Bible)",
    url: "https://biblehub.com/web/james/1.htm"
  },
  {
    text: "1 Corinthians 13:4-5 (WEB): “Love is patient and is kind… doesn’t seek its own way, is not provoked, takes no account of evil.”",
    source: "Bible Hub, 1 Corinthians 13 (World English Bible)",
    url: "https://biblehub.com/web/1_corinthians/13.htm"
  },
  {
    text: "Luke 13:4-5 (WEB): of the eighteen killed by the tower in Siloam, Jesus asks, “do you think that they were worse offenders than all the men who dwell in Jerusalem? I tell you, no.”",
    source: "Bible Hub, Luke 13 (World English Bible)",
    url: "https://biblehub.com/web/luke/13.htm"
  },
  {
    text: "Athanasius: “For He was made man that we might be made God; and He manifested Himself by a body that we might receive the idea of the unseen Father.”",
    source: "Athanasius, On the Incarnation of the Word, 54 (NPNF translation, New Advent)",
    url: "https://www.newadvent.org/fathers/2802.htm"
  },
  {
    text: "Irenaeus: God, invisible in his greatness, “as regards His love… is always known through Him by whose means He ordained all things”; and “the glory of God is a living man; and the life of man consists in beholding God.”",
    source: "Irenaeus, Against Heresies IV.20.4 and IV.20.7 (ANF translation, New Advent)",
    url: "https://www.newadvent.org/fathers/0103420.htm"
  },
  {
    text: "Brad Jersak’s book asks: “what if we conceived of God as completely Christlike—the perfect Incarnation of self-giving, radically forgiving, co-suffering love?” The publisher says it challenges “good cop/bad cop” distortions of God.",
    source: "Plain Truth Ministries, book page for Brad Jersak, A More Christlike God: A More Beautiful Gospel (2015)",
    url: "https://www.ptm.org/books/a-more-christlike-god-a-more-beautiful-gospel"
  },
  {
    text: "ReKnew (Greg Boyd): “Our conviction is that Jesus is the one and only perfect revelation of God’s true nature (Hebrews 1:3)… God’s nature is other-oriented, non-violent, self-sacrificial love.”",
    source: "ReKnew, About / ReKnew Manifesto, “ReThink Our Picture of God”",
    url: "https://reknew.org/about/"
  },
  {
    text: "On providence, ReKnew contrasts an all-controlling “blueprint worldview” with a “warfare worldview,” cites Irenaeus as saying “God is a God of persuasion, not coercion,” and says: “while we don’t believe everything happens for a good purpose, we believe everything happens with a good purpose.” This is one view among several (Reformed, Molinist, Arminian, open).",
    source: "ReKnew, About / ReKnew Manifesto, “ReThink Providence”",
    url: "https://reknew.org/about/"
  }
];
