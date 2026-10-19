window.RG = window.RG || {};
var RG = window.RG;

/* Round 11: "Living it out" — data for interactive visuals */

RG.lvBalance = [
  {
    id: "self-erased",
    label: "Self erased",
    title: "Only others, never me",
    text: "Here love has lost its \"as yourself\". You say yes to everyone, carry every mood in the room and feel guilty for having needs at all. It can look holy, but it is often fear wearing the clothes of service.",
    signs: [
      "You cannot say no without a wave of guilt",
      "You no longer know what you want or feel",
      "Resentment leaks out even though you \"never complain\""
    ],
    refs: ["Mark 12:31", "Gal 1:10", "Prov 29:25", "John 12:43"]
  },
  {
    id: "over-giving",
    label: "Over-giving",
    title: "Giving past what love can sustain",
    text: "You still know you exist, but you keep giving beyond your capacity: time, money, energy, rest. The heart is often good, yet the giving is driven by pressure or the need to be needed rather than by freedom. Burnout and quiet bitterness usually follow.",
    signs: [
      "You are exhausted and keep adding more",
      "You rescue people from consequences they need to face",
      "You feel worth something only when you are useful"
    ],
    refs: ["2 Cor 9:7", "Exod 18:17-18", "Gal 6:2", "Gal 6:5"]
  },
  {
    id: "love-as-yourself",
    label: "Love as yourself",
    title: "The centre: love your neighbour <em>as yourself</em>",
    text: "Jesus joined love of neighbour to an assumed, healthy self-regard (Mark 12:31). Paul says look <em>not</em> only to your own interests <em>but also</em> to the interests of others (Phil 2:4, Greek <em>mē… alla kai</em>): both, not either. Jesus lived this rhythm, giving himself fully yet withdrawing to pray, resting, and saying no when the Father's way led elsewhere (Mark 1:35-38; Luke 5:16).",
    signs: [
      "You can give freely and also receive",
      "Your yes and your no both come from peace, not fear",
      "You rest without guilt and serve without resentment"
    ],
    refs: ["Mark 12:31", "Phil 2:4", "Mark 1:35-38", "Luke 5:16", "Mark 6:31", "Eph 5:29"]
  },
  {
    id: "self-guarding",
    label: "Self-guarding",
    title: "Walls instead of boundaries",
    text: "Often this is where people land after being hurt or used. Boundaries harden into walls: you protect yourself so carefully that love can no longer get in or out. It is understandable, and sometimes a needed season, but it is not the place to live.",
    signs: [
      "You keep people at arm's length by default",
      "You give only when it is safe and costs little",
      "Every request feels like a threat"
    ],
    refs: ["Prov 18:1", "1 John 4:18", "1 Pet 4:8", "Ps 147:3"]
  },
  {
    id: "self-centred",
    label: "Self-centred",
    title: "Only me, others as tools",
    text: "Here the neighbour has disappeared. Others matter only when they serve my comfort, image or goals. Scripture calls this the opposite of love, which \"does not seek its own way\" (1 Cor 13:5); it is the curved-in self that grace comes to set free.",
    signs: [
      "You rarely ask how others are doing",
      "You feel entitled to people's time and help",
      "Apologising feels like losing"
    ],
    refs: ["1 Cor 13:5", "2 Tim 3:2", "Phil 2:3", "Luke 12:16-21"]
  }
];

RG.lvRespond = [
  {
    id: "workplace-exploitation",
    scenario: "Your manager keeps giving you unpaid overtime \"because you're a Christian and you don't complain\". Others go home on time.",
    options: [
      { label: "Say nothing and keep staying late", kind: "silent", verdict: "wrong", why: "Silence lets an injustice grow and teaches others that your faith makes you easy to use. Scripture says the worker deserves wages (Luke 10:7)." },
      { label: "Tell yourself this is your cross to bear", kind: "accept", verdict: "partial", why: "Patience under hardship is real virtue (1 Pet 2:19-20), but voluntary suffering for Christ is different from accepting exploitation you could lawfully and kindly address." },
      { label: "Calmly name the pattern and ask for fair limits or pay", kind: "christ", verdict: "right", why: "Truth spoken with respect, a clear boundary, and goodwill toward your manager. Paul himself used his lawful rights when they were being ignored (Acts 16:37; 22:25)." },
      { label: "Vent about the manager to the whole team", kind: "fight", verdict: "wrong", why: "Turning colleagues against someone is gossip, not justice. It skips going to the person first (Matt 18:15)." }
    ],
    jesus: "Jesus taught that a worker is worth their wages and challenged leaders who \"devour widows' houses\" (Luke 10:7; Mark 12:40). He named injustice plainly while still loving the people involved.",
    refs: ["Luke 10:7", "1 Tim 5:18", "Jas 5:4", "Acts 16:37", "Col 4:1"]
  },
  {
    id: "friend-borrowing",
    scenario: "A friend keeps borrowing money \"just until payday\" and has not paid back the last three loans. They ask again.",
    options: [
      { label: "Be honest: \"I can't lend again, but I can help in another way\"", kind: "christ", verdict: "right", why: "You stay kind, tell the truth about the pattern, and offer help that does not feed it. Love seeks the friend's good, not just their request." },
      { label: "Lend again and say nothing", kind: "silent", verdict: "wrong", why: "This keeps the friendship shallow and can enable a problem. Ps 37:21 treats not repaying as a real wrong, so pretending it is fine is not love." },
      { label: "Cut them off and tell others they're a cheat", kind: "fight", verdict: "wrong", why: "This shames them publicly and ends the relationship without honest conversation. Love covers rather than broadcasts (1 Pet 4:8)." },
      { label: "Give a final gift, clearly not a loan", kind: "accept", verdict: "partial", why: "Giving freely can be beautiful (Luke 6:35), but without naming the pattern you may simply move the problem forward." }
    ],
    jesus: "Jesus told the rich young ruler a hard truth because he loved him (Mark 10:21). Love sometimes says the uncomfortable thing that a person needs to hear.",
    refs: ["Ps 37:21", "Luke 6:35", "Prov 3:27", "Mark 10:21", "Eph 4:15"]
  },
  {
    id: "public-humiliation",
    scenario: "In a meeting, someone mocks your idea and makes a joke at your expense. People laugh.",
    options: [
      { label: "Laugh along and say nothing", kind: "silent", verdict: "partial", why: "Not retaliating in the moment can be wise, but if you never address it you may be agreeing that you deserve contempt." },
      { label: "Hit back with a sharper insult", kind: "fight", verdict: "wrong", why: "Repaying insult with insult is exactly what Scripture warns against (1 Pet 3:9). It also feeds the culture of mockery." },
      { label: "Accept it as proof your idea was worthless", kind: "accept", verdict: "wrong", why: "Someone's mockery does not define your worth. You are an image-bearer whatever the room laughs at." },
      { label: "Stay calm, steer back to the point, and talk privately afterwards", kind: "christ", verdict: "right", why: "You keep your dignity without retaliating, and you address it honestly one-to-one. This is truth, love and boundary together." }
    ],
    jesus: "When struck at his trial, Jesus neither hit back nor stayed silent: \"If I have spoken evil, testify of the evil; but if well, why do you beat me?\" (John 18:23).",
    refs: ["John 18:22-23", "1 Pet 3:9", "Prov 15:1", "Matt 18:15"]
  },
  {
    id: "gossip-about-you",
    scenario: "You learn that a church friend has been spreading a false story about you to others.",
    options: [
      { label: "Spread their secrets to even the score", kind: "fight", verdict: "wrong", why: "Revenge gossip doubles the harm. Scripture leaves vengeance to God (Rom 12:19)." },
      { label: "Go to them privately, tell them what you heard, and ask them to correct it", kind: "christ", verdict: "right", why: "This follows Jesus' pattern of going privately first (Matt 18:15), speaks truth, and gives them a real chance to repair the damage." },
      { label: "Pretend you don't know and avoid them", kind: "silent", verdict: "partial", why: "Some things can be quietly covered (Prov 19:11), but a falsehood harming your name usually needs to be addressed, not avoided." },
      { label: "Assume you must have deserved it", kind: "accept", verdict: "wrong", why: "Taking on blame for someone else's lie is not humility. Truth matters to God (Eph 4:25)." }
    ],
    jesus: "Jesus was falsely accused and answered lies with truth, refusing both silence about the truth and revenge (John 8:46-49).",
    refs: ["Matt 18:15", "Prov 19:11", "Eph 4:25", "Rom 12:19", "Exod 23:1"]
  },
  {
    id: "boss-takes-credit",
    scenario: "Your boss presents your project to senior leaders as their own work.",
    options: [
      { label: "Let it go; God sees", kind: "accept", verdict: "partial", why: "Trusting God with recognition is good (Matt 6:4), but you can trust God and still tell the truth. Letting it go every time may harm your livelihood." },
      { label: "Ask your boss privately and plainly for fair credit, then keep a record of your work", kind: "christ", verdict: "right", why: "Private first, honest and respectful, and wise about the future (Matt 10:16). This protects truth without seeking to humiliate." },
      { label: "Expose them in front of everyone at the next meeting", kind: "fight", verdict: "wrong", why: "Public confrontation can be right for public matters (Gal 2:11-14), but skipping the private step usually aims at shame rather than repair." },
      { label: "Quietly do worse work so they look bad", kind: "silent", verdict: "wrong", why: "Sabotage harms others and your own integrity. We work as for the Lord (Col 3:23)." }
    ],
    jesus: "Jesus warned against loving the place of honour but also taught that the truth sets free (Luke 14:7-11; John 8:32). He never traded truth for comfort.",
    refs: ["Matt 18:15", "Matt 10:16", "Col 3:23", "Prov 22:29", "Gal 2:11-14"]
  },
  {
    id: "family-manipulation",
    scenario: "A family member uses guilt (\"after all I've done for you\") to pressure you into decisions about your own life.",
    options: [
      { label: "Give in to keep the peace", kind: "accept", verdict: "wrong", why: "Peace bought by surrendering your God-given responsibility is not real peace. Honouring parents is not the same as obeying manipulation as an adult (Gen 2:24)." },
      { label: "Shout back and list everything they did wrong", kind: "fight", verdict: "wrong", why: "This answers manipulation with attack and makes honest conversation harder." },
      { label: "Avoid the topic forever", kind: "silent", verdict: "partial", why: "Distance can be wise for a season, especially where it is unsafe, but silence alone rarely changes a pattern." },
      { label: "Thank them for what they did, and calmly say the decision is yours to make before God", kind: "christ", verdict: "right", why: "Gratitude and honour together with a clear boundary. You refuse the guilt without refusing the person." }
    ],
    jesus: "When his family came to take him home, saying he was out of his mind, Jesus stayed with his calling and kept loving them (Mark 3:21, 31-35). Later he provided for his mother from the cross (John 19:26-27).",
    refs: ["Exod 20:12", "Gen 2:24", "Mark 3:21", "Mark 3:31-35", "John 19:26-27"]
  },
  {
    id: "helper-in-trouble",
    scenario: "A colleague covered for you, and now they are in trouble because of your mistake.",
    options: [
      { label: "Keep quiet; they chose to help", kind: "silent", verdict: "wrong", why: "Letting someone else carry the consequence of your mistake is neither honest nor loving." },
      { label: "Blame the system or someone else", kind: "fight", verdict: "wrong", why: "Shifting blame is as old as Eden (Gen 3:12-13) and adds a new wrong to the first." },
      { label: "Own it to the people involved, thank your colleague, and help fix it", kind: "christ", verdict: "right", why: "Confession, gratitude and repair. Like Zacchaeus, real change makes things right where it can (Luke 19:8)." },
      { label: "Apologise to your colleague privately but say nothing to anyone else", kind: "accept", verdict: "partial", why: "A private apology is good, but if they are still bearing the consequence, love goes further and tells the truth where it matters." }
    ],
    jesus: "Jesus stood in front of his friends in the garden: \"If you seek me, let these go their way\" (John 18:8). Love protects those who stood with us.",
    refs: ["John 18:8", "Prov 28:13", "Luke 19:8", "Jas 5:16", "Gen 3:12-13"]
  },
  {
    id: "online-insult",
    scenario: "A stranger leaves a cruel, insulting comment on your post about your faith.",
    options: [
      { label: "Reply with one calm, kind sentence, or simply block and move on", kind: "christ", verdict: "right", why: "A gentle answer or a quiet boundary are both Christ-like. You owe a stranger honesty and kindness, not unlimited access to you." },
      { label: "Write a long, cutting reply to win", kind: "fight", verdict: "wrong", why: "\"Don't answer a fool according to his folly\" (Prov 26:4). Winning the argument is not the same as loving the person." },
      { label: "Delete your post and stop sharing your faith", kind: "accept", verdict: "partial", why: "Stepping back can be wise for your peace, but letting cruelty silence you completely gives it more power than it deserves." },
      { label: "Screenshot it and rally followers to attack them", kind: "silent", verdict: "wrong", why: "Getting others to do the fighting is still revenge, just at a distance. It multiplies harm." }
    ],
    jesus: "When a Samaritan village refused him and the disciples wanted fire from heaven, Jesus rebuked them and simply went to another village (Luke 9:52-56).",
    refs: ["Luke 9:52-56", "Prov 15:1", "Prov 26:4", "1 Pet 3:15-16", "Matt 10:14"]
  }
];

RG.lvPrayer = [
  {
    id: "pray-and-wait",
    label: "Pray and wait",
    title: "Prayer as a reason to do nothing",
    text: "Here prayer becomes a way of handing every responsibility back to God. \"If God wants it, he will do it.\" There is real faith in this, and sometimes God does say \"stand still\" (2 Chr 20:17). But as a whole way of life it can hide fear, passivity or avoidance behind spiritual words.",
    risk: "Unpaid bills, unaddressed conflicts and unused gifts, all labelled \"waiting on God\". It can also make God look absent when he was inviting us to act.",
    refs: ["Jas 2:15-17", "Prov 6:6-11", "2 Thess 3:10", "Exod 14:15"]
  },
  {
    id: "pray-and-partner",
    label: "Pray and partner",
    title: "The centre: God's co-workers",
    text: "Paul calls us God's fellow workers (1 Cor 3:9). We \"work out\" our salvation because God is working in us \"both to will and to work\" (Phil 2:12-13). Nehemiah's people \"made our prayer to our God, and set a watch\" (Neh 4:9). Prayer is not a substitute for action, and action is not a substitute for prayer; both flow from union with a Father who loves to work with his children.",
    risk: "Very little, as long as it stays relational. The only danger is turning \"partnering\" into a formula, or forgetting that some things only God can do.",
    refs: ["1 Cor 3:9", "Phil 2:12-13", "Neh 4:9", "Mark 16:20", "2 Cor 6:1", "Ps 127:1"]
  },
  {
    id: "do-it-all",
    label: "Do it all",
    title: "Prayer as an afterthought",
    text: "Here we plan, push and strive, and maybe pray at the end for God to bless what we already decided. It looks responsible, and diligence is good (Prov 13:4). But without dependence, life becomes anxious self-reliance, and our work loses its source.",
    risk: "Burnout, control and pride. \"Unless Yahweh builds the house, they labor in vain who build it\" (Ps 127:1).",
    refs: ["Ps 127:1-2", "John 15:5", "Jas 4:13-15", "Prov 3:5-6"]
  }
];

RG.lvPrayerPairs = [
  {
    id: "nehemiah-guard",
    who: "Nehemiah and the builders",
    prayed: "Threatened by enemies while rebuilding Jerusalem's wall, they prayed to God.",
    did: "They \"set a watch against them day and night\", armed the families, and kept building with a tool in one hand and a weapon in the other.",
    ref: "Neh 4:9, 13-17"
  },
  {
    id: "esther-fast",
    who: "Esther",
    prayed: "She called all the Jews of Susa to fast for her three days and nights, and fasted with her maids.",
    did: "Then she went to the king uninvited, risking her life: \"if I perish, I perish\", and wisely planned two banquets before making her request.",
    ref: "Esth 4:16; 5:1-8"
  },
  {
    id: "jacob-gifts",
    who: "Jacob",
    prayed: "Afraid of Esau, he prayed: \"Please deliver me from the hand of my brother\", reminding God of his promise.",
    did: "He divided his camp into two groups and sent waves of gifts ahead to make peace with his brother.",
    ref: "Gen 32:7-21"
  },
  {
    id: "paul-shipwreck",
    who: "Paul in the storm",
    prayed: "An angel promised that God had granted him everyone on board, and Paul said, \"I believe God.\"",
    did: "Yet when sailors tried to escape he warned, \"Unless these stay in the ship, you can't be saved\", and urged everyone to eat for their strength.",
    ref: "Acts 27:23-25, 31-36"
  },
  {
    id: "jesus-gethsemane",
    who: "Jesus in Gethsemane",
    prayed: "He prayed in anguish three times, \"not what I desire, but what you desire.\"",
    did: "Then he rose, woke the disciples, said \"Arise, let us be going\", and stepped forward to meet those who came to arrest him.",
    ref: "Mark 14:35-42; John 18:4"
  },
  {
    id: "early-church-boldness",
    who: "The early church",
    prayed: "Under threat, they lifted their voices together and asked God for boldness and for his hand to heal.",
    did: "The place was shaken, they were filled with the Holy Spirit, and they went out and spoke God's word with boldness.",
    ref: "Acts 4:24-31"
  },
  {
    id: "elijah-cloud",
    who: "Elijah on Carmel",
    prayed: "He bowed to the ground with his face between his knees, praying for the rain God had promised.",
    did: "Seven times he sent his servant to look toward the sea, until a cloud \"like a man's hand\" appeared; then he sent word to Ahab to get ready.",
    ref: "1 Kgs 18:1, 42-44"
  },
  {
    id: "jehoshaphat-praise",
    who: "Jehoshaphat and Judah",
    prayed: "Facing a vast army, he proclaimed a fast and prayed: \"We don't know what to do, but our eyes are on you.\"",
    did: "Told to go out and \"stand still\", they rose early, marched out, and placed singers in front of the army praising God.",
    ref: "2 Chr 20:3-22"
  }
];

RG.lvValues = [
  {
    id: "love",
    value: "Love",
    design: "God is love (1 John 4:8), Father, Son and Spirit giving themselves to one another. We were made from that love and for it, to receive it and pass it on.",
    twisted: "\"If you loved me you would…\" Love gets used as a lever for guilt, or shrunk into niceness that never tells the truth.",
    jesus: "Jesus loved his own \"to the end\", washing feet the night he was betrayed, and also confronted, wept and said no (John 13:1-5).",
    refs: ["1 John 4:8", "John 13:1-5", "1 Cor 13:4-7", "John 15:12"]
  },
  {
    id: "truth",
    value: "Truth and honesty",
    design: "Trust is the ground of every relationship. God cannot lie, and we are \"members of one another\", so honesty keeps the body healthy (Eph 4:25).",
    twisted: "\"I'm just being honest\" as cover for cruelty; or the opposite, demanding everyone keep up a false peace by never naming problems.",
    jesus: "Jesus is \"full of grace and truth\" (John 1:14). He told the Samaritan woman the truth about her life without shaming her (John 4:16-18).",
    refs: ["Eph 4:15", "Eph 4:25", "John 1:14", "John 8:32"]
  },
  {
    id: "faithfulness",
    value: "Faithfulness",
    design: "God's <em>hesed</em> (steadfast covenant love) is faithful from generation to generation. Faithfulness makes love safe enough to rest in.",
    twisted: "Loyalty demanded to an abusive leader, system or spouse, as if faithfulness means staying silent about harm.",
    jesus: "Jesus stayed faithful to Peter after his denial and restored him by the lake (John 21:15-17).",
    refs: ["Lam 3:22-23", "2 Tim 2:13", "Prov 20:6", "John 21:15-17"]
  },
  {
    id: "justice",
    value: "Justice",
    design: "Justice (<em>mishpat</em>, with <em>tsedaqah</em>, righteousness) is love making things right for the weak: widow, orphan, stranger and poor. It is relational repair, not only punishment.",
    twisted: "Justice reduced to revenge or to protecting the powerful; or \"justice\" used to shame and cancel people with no path back.",
    jesus: "Jesus announced good news to the poor and freedom for the oppressed (Luke 4:18), and drove out those who exploited worshippers in the temple (Mark 11:15-17).",
    refs: ["Mic 6:8", "Isa 1:17", "Luke 4:18-19", "Amos 5:24"]
  },
  {
    id: "mercy",
    value: "Mercy",
    design: "Mercy is God's heart moving toward those in need or in the wrong. We are made to be merciful as our Father is merciful (Luke 6:36).",
    twisted: "Pressure on victims to \"show mercy\" by dropping accountability, staying in danger, or keeping silent.",
    jesus: "Jesus refused to condemn the woman caught in adultery and also told her, \"Go and sin no more\" (John 8:10-11).",
    refs: ["Luke 6:36", "Matt 5:7", "Jas 2:13", "John 8:10-11"]
  },
  {
    id: "humility",
    value: "Humility",
    design: "Humility is seeing yourself truly, neither above nor below others, with God as the source of everything. It frees us to serve and to receive.",
    twisted: "Taught as self-contempt or never accepting praise; or demanded of those under authority while leaders stay unaccountable.",
    jesus: "Jesus, knowing who he was and where he came from, took a towel and washed feet (John 13:3-5). Humility flowed from security, not low worth.",
    refs: ["Phil 2:3-8", "John 13:3-5", "Rom 12:3", "Jas 4:6"]
  },
  {
    id: "self-control",
    value: "Self-control",
    design: "Self-control is fruit of the Spirit (Gal 5:23): desires and emotions held in love's hands, so we can respond rather than react.",
    twisted: "Turned into suppressing every emotion, or into controlling other people's bodies, clothes and choices.",
    jesus: "Jesus felt deep anger and grief yet was never ruled by them. He looked at critics \"with anger, grieved\" and then healed (Mark 3:5).",
    refs: ["Gal 5:22-23", "Prov 16:32", "2 Tim 1:7", "Mark 3:5"]
  },
  {
    id: "generosity",
    value: "Generosity",
    design: "God \"richly provides us with everything to enjoy\" (1 Tim 6:17). Generosity is sharing in the Father's open-handedness.",
    twisted: "Giving under pressure or manipulation, \"give to get\" promises, or guilt sermons that ignore 2 Cor 9:7: not \"under compulsion\".",
    jesus: "Jesus fed thousands and noticed the widow's small gift, honouring the heart over the amount (Mark 6:41-44; 12:41-44).",
    refs: ["2 Cor 9:7", "1 Tim 6:17-19", "Acts 20:35", "Mark 12:41-44"]
  },
  {
    id: "purity",
    value: "Purity",
    design: "Purity is an undivided heart: wholeness in desire, sexuality and motive, so we can see God and others clearly (Matt 5:8).",
    twisted: "Reduced to shame about bodies, double standards for women, or purity used to rank people as clean and unclean.",
    jesus: "Jesus touched lepers and welcomed sinners, and his purity was contagious: instead of being made unclean, he made others clean (Mark 1:40-42).",
    refs: ["Matt 5:8", "Mark 1:40-42", "1 Tim 4:12", "Titus 1:15"]
  },
  {
    id: "kindness",
    value: "Kindness",
    design: "God's kindness leads us to repentance (Rom 2:4). Kindness reflects the way the Father treats us, even when we are ungrateful (Luke 6:35).",
    twisted: "\"Be kind\" used to silence anyone who names a wrong, as if kindness and truth cannot live together.",
    jesus: "Jesus took children in his arms and blessed them when others pushed them away (Mark 10:13-16).",
    refs: ["Rom 2:4", "Eph 4:32", "Luke 6:35", "Mark 10:13-16"]
  },
  {
    id: "courage",
    value: "Courage",
    design: "Courage is love that is stronger than fear. God's repeated word, \"Be strong and courageous\", comes with \"I am with you\" (Josh 1:9).",
    twisted: "Bravado and aggression called courage; or people pushed into danger \"in faith\" with no wisdom.",
    jesus: "Jesus \"set his face to go to Jerusalem\" knowing what awaited him (Luke 9:51).",
    refs: ["Josh 1:9", "1 Cor 16:13-14", "2 Tim 1:7", "Luke 9:51"]
  },
  {
    id: "work",
    value: "Work and diligence",
    design: "Adam was placed in the garden \"to cultivate and keep it\" before any fall (Gen 2:15). Work is partnership with God in caring for the world, and enjoying its fruit is his gift (Eccl 5:18-19).",
    twisted: "Worth measured by productivity; workaholism praised as devotion; or workers underpaid in God's name.",
    jesus: "Jesus worked as a carpenter (Mark 6:3) and said, \"My Father is still working, so I am working\" (John 5:17), yet kept Sabbath rest and invited the weary to rest (Matt 11:28).",
    refs: ["Gen 2:15", "Col 3:23", "Eccl 5:18-19", "Mark 6:3", "John 5:17"]
  }
];

RG.lvWorthRole = [
  {
    id: "work",
    area: "Work",
    worth: "Employer and employee are equal image-bearers before God, with one Master in heaven (Eph 6:9).",
    role: "Roles of direction and responsibility exist so work can be organised and shared well. Authority is a task given for the good of the whole.",
    abuse: "When managers treat staff as tools, withhold fair pay or demand unlimited availability. Jesus: \"it shall not be so among you\" (Mark 10:43).",
    refs: ["Eph 6:9", "Col 4:1", "Jas 5:4", "Mark 10:42-45"]
  },
  {
    id: "church",
    area: "Church",
    worth: "All believers are one in Christ, a royal priesthood, each given gifts by the Spirit (1 Pet 2:9; 1 Cor 12:7).",
    role: "Elders and leaders exist to shepherd, teach and equip others for ministry (Eph 4:11-12), not to do it all or to rule over them.",
    abuse: "When leaders \"lord it over\" the flock (1 Pet 5:3), demand unquestioning loyalty, or shield themselves from accountability.",
    refs: ["1 Pet 2:9", "Eph 4:11-12", "1 Pet 5:1-3", "Matt 23:8-11"]
  },
  {
    id: "family",
    area: "Family",
    worth: "Parents and children, husbands and wives are all equally loved by God and bearers of his image.",
    role: "Parents carry responsibility to nurture and guide children who are still growing (Eph 6:4). Children are called to honour parents; adult children leave and form their own households (Gen 2:24).",
    abuse: "When parental authority becomes control, fear or harm, or continues to dominate adult children. Fathers are told not to provoke children to anger (Eph 6:4; Col 3:21).",
    refs: ["Eph 6:1-4", "Col 3:21", "Gen 2:24", "Exod 20:12"]
  },
  {
    id: "government",
    area: "Government",
    worth: "Rulers and citizens are equally human, and rulers answer to God as servants for the people's good (Rom 13:4).",
    role: "Government exists to restrain evil and protect the common good. Christians pray for leaders and generally respect the law (1 Tim 2:1-2).",
    abuse: "When power oppresses, demands what belongs to God, or crushes the poor. Then \"we must obey God rather than men\" (Acts 5:29).",
    refs: ["Rom 13:1-7", "1 Tim 2:1-2", "Acts 5:29", "Rev 13"]
  },
  {
    id: "gifts-talents",
    area: "Gifts and talents",
    worth: "No gift makes anyone more valuable. The parts that seem weaker are \"necessary\" and given greater honour (1 Cor 12:22-23).",
    role: "Different gifts give different tasks so the whole body is built up (1 Cor 12:4-7; Rom 12:6-8).",
    abuse: "When the gifted become celebrities above correction, or the less visible are ignored. \"What do you have that you didn't receive?\" (1 Cor 4:7).",
    refs: ["1 Cor 12:4-26", "Rom 12:6-8", "1 Cor 4:7", "1 Pet 4:10"]
  },
  {
    id: "wealth",
    area: "Wealth",
    worth: "\"The rich and the poor have this in common: Yahweh is the maker of them all\" (Prov 22:2).",
    role: "Wealth brings responsibility and opportunity: to be \"rich in good works, ready to distribute\" (1 Tim 6:17-18).",
    abuse: "When money buys honour in church or power over others (Jas 2:1-9), or when \"the borrower is servant to the lender\" becomes a tool of control (Prov 22:7).",
    refs: ["Prov 22:2", "Prov 22:7", "Jas 2:1-9", "1 Tim 6:17-19"]
  },
  {
    id: "age-experience",
    area: "Age and experience",
    worth: "Young and old have equal worth. The Spirit is poured on \"your sons and your daughters… your old men… your young men\" (Joel 2:28).",
    role: "Elders carry wisdom worth honouring (Lev 19:32); the young bring strength and fresh vision. Each needs the other.",
    abuse: "When age is used to silence the young (1 Tim 4:12), or when the old are dismissed as no longer useful.",
    refs: ["Lev 19:32", "1 Tim 4:12", "1 Tim 5:1-2", "Joel 2:28"]
  },
  {
    id: "gender",
    area: "Gender",
    worth: "Male and female are both created in God's image (Gen 1:27), co-heirs of grace (1 Pet 3:7), and \"one in Christ Jesus\" (Gal 3:28). Christians across views agree on this equal worth.",
    role: "Here Christians genuinely differ. <strong>Complementarians</strong> read texts like 1 Tim 2:12 and Eph 5:22-33 as giving men a distinct role of servant leadership in church and home. <strong>Egalitarians</strong> read the same texts as addressed to specific situations, point to women leaders (Deborah, Phoebe, Junia, Priscilla) and see mutual submission (Eph 5:21) as the trajectory. Sincere, Bible-believing people hold both.",
    abuse: "Whatever one's view, any reading that excuses control, contempt or abuse betrays Christ's servant pattern. Husbands are told to love \"as Christ loved the church, and gave himself up for it\" (Eph 5:25).",
    refs: ["Gen 1:27", "Gal 3:28", "Eph 5:21-33", "1 Tim 2:11-15", "Rom 16:1-7", "Judg 4:4"]
  }
];

RG.lvFaith = [
  {
    id: "prayer",
    area: "Prayer",
    transaction: "Prayer is a coin I put in: the right words, enough hours, enough intensity, and God has to respond.",
    relational: "Prayer is conversation with a Father who \"knows what you need before you ask him\" (Matt 6:8). We still ask, because asking is part of the relationship.",
    refs: ["Matt 6:7-8", "Luke 11:11-13", "Rom 8:26"]
  },
  {
    id: "faith",
    area: "Faith",
    transaction: "Faith is a force I must produce. If nothing happens, I did not believe hard enough.",
    relational: "Faith is trust in a faithful Person, and even it is a gift (Eph 2:8). Jesus honoured faith \"as small as a grain of mustard seed\" and the cry \"help my unbelief\" (Mark 9:24).",
    refs: ["Mark 9:24", "Luke 17:5-6", "Eph 2:8", "Gal 2:20"]
  },
  {
    id: "fear",
    area: "Fear",
    transaction: "My fear blocks God; if I feel anxious, I have opened the door to punishment.",
    relational: "\"There is no fear in love\" (1 John 4:18). God meets frightened people gently, again and again saying \"Don't be afraid\", and invites us to cast our anxiety on him (1 Pet 5:7).",
    refs: ["1 John 4:18", "1 Pet 5:7", "Isa 41:10", "Phil 4:6-7"]
  },
  {
    id: "asking",
    area: "Asking",
    transaction: "God answers whoever pesters him most, like the unjust judge in Luke 18.",
    relational: "In Luke 18:1-8 the judge is a contrast: if even an unjust judge gives in, how much more will God, who is just and loves us. And \"you don't have, because you don't ask\" (Jas 4:2) invites us to ask freely as children.",
    refs: ["Luke 18:1-8", "Jas 4:2-3", "Matt 7:9-11"]
  },
  {
    id: "healing",
    area: "Healing",
    transaction: "Healing comes if I have enough faith, confess the right words or give enough. If I am still sick, it is my fault.",
    relational: "Jesus healed out of compassion, often for people who showed little faith (John 5:5-9). Healing is a sign of the kingdom; when it does not come, God has not withdrawn his love (2 Cor 12:7-9).",
    refs: ["Matt 14:14", "John 5:5-9", "Jas 5:14-15", "2 Cor 12:7-9"]
  },
  {
    id: "provision",
    area: "Provision",
    transaction: "Give money to get money back. Prosperity is the reward for performance.",
    relational: "The Father feeds the birds and knows what we need (Matt 6:26-32). Paul learned contentment in plenty and in want (Phil 4:11-13). We give because we have received, not to get.",
    refs: ["Matt 6:25-33", "Phil 4:11-13", "1 Tim 6:6-10", "2 Cor 9:8"]
  },
  {
    id: "testing",
    area: "Testing",
    transaction: "God sends hardship to see if I pass, and tempts me to catch me out.",
    relational: "God \"tempts no one\" (Jas 1:13). Scripture speaks of testing (<em>dokimazō</em>) as refining, like gold, so that faith grows genuine (1 Pet 1:6-7). The Greek <em>peirazō</em> can mean test or tempt; context decides.",
    refs: ["Jas 1:2-4", "Jas 1:13", "1 Pet 1:6-7", "Deut 8:2"]
  },
  {
    id: "obedience",
    area: "Obedience",
    transaction: "I obey so that God will love and bless me; disobedience switches his love off.",
    relational: "We love because he first loved us (1 John 4:19). Obedience is the fruit of being loved and the way we stay in that love, not the price of earning it (John 15:9-10).",
    refs: ["1 John 4:19", "John 14:15", "John 15:9-10", "Rom 5:8"]
  },
  {
    id: "suffering",
    area: "Suffering",
    transaction: "Suffering means I did something wrong and God is paying me back.",
    relational: "Jesus rejected that link for the man born blind (John 9:2-3) and the victims at Siloam (Luke 13:4-5). God suffers with us in Christ and works in all things for good (Rom 8:28).",
    refs: ["John 9:2-3", "Luke 13:1-5", "Rom 8:28", "Heb 4:15"]
  },
  {
    id: "giving",
    area: "Giving",
    transaction: "Tithing is a payment to keep God from cursing me and to unlock blessing.",
    relational: "\"God loves a cheerful giver\", not one who gives \"grudgingly, or under compulsion\" (2 Cor 9:7). Generosity is sharing in the Father's own open hand.",
    refs: ["2 Cor 9:6-8", "Acts 20:35", "Luke 6:38", "Mark 12:41-44"]
  }
];

RG.lvManners = [
  {
    id: "greeting",
    manner: "Greeting",
    meaning: "A greeting says \"I see you; you matter\". It treats each person as an image-bearer, not as background.",
    scripture: "Paul ends letters with long lists of greetings (Rom 16:3-16). Jesus said greeting only those who greet you is no more than anyone does (Matt 5:47).",
    culture: "Handshakes, bows, kisses or hugs are cultural; the \"holy kiss\" was a first-century form. The universal part is warm, respectful recognition of each person."
  },
  {
    id: "hospitality",
    manner: "Hospitality",
    meaning: "Making room for others at your table and in your life, especially strangers and those who cannot repay.",
    scripture: "\"Don't forget to show hospitality to strangers\" (Heb 13:2). Jesus said to invite \"the poor, the maimed, the lame, or the blind\" (Luke 14:13-14).",
    culture: "Food, formality and how long guests stay vary widely. The universal heart is welcome, especially for the overlooked; it does not mean having no limits on your home."
  },
  {
    id: "thank-you",
    manner: "Saying thank you",
    meaning: "Gratitude honours the giver and keeps us from entitlement. It is how love receives.",
    scripture: "Of ten healed lepers only one returned to thank Jesus, and Jesus noticed (Luke 17:15-18). \"In everything give thanks\" (1 Thess 5:18).",
    culture: "Thank-you notes, gifts or spoken thanks are cultural forms. Universally, gratitude acknowledges that what we receive is a gift."
  },
  {
    id: "apologising",
    manner: "Apologising",
    meaning: "A real apology owns the harm, names it, and seeks to repair it. It restores trust and dignity on both sides.",
    scripture: "\"Confess your offenses to one another\" (Jas 5:16). Leave your gift at the altar and first be reconciled (Matt 5:23-24). Zacchaeus made restitution (Luke 19:8).",
    culture: "Some cultures apologise often as politeness; others rarely. The universal core is honest ownership, not just smoothing things over."
  },
  {
    id: "table-seating",
    manner: "Table manners and seating",
    meaning: "How we sit and eat together shows who we think matters. Love does not grab the best place.",
    scripture: "Jesus told guests not to choose the place of honour but the lowest place (Luke 14:7-11). Paul rebuked Corinthians who ate ahead while the poor went hungry (1 Cor 11:20-22).",
    culture: "Cutlery, chopsticks or hands, and who sits where, are cultural. The universal heart is honouring others above yourself and making sure no one is shamed or left out."
  },
  {
    id: "honouring-elders",
    manner: "Honouring elders",
    meaning: "Giving respect to those who have gone before us, valuing their experience and caring for them as they age.",
    scripture: "\"You shall rise up before the gray head, and honor the face of the elderly\" (Lev 19:32). Treat older men as fathers and older women as mothers (1 Tim 5:1-2).",
    culture: "Titles, standing up, or deference in decisions vary. Honour does not mean blind obedience or excusing harm; the universal part is respect and care."
  },
  {
    id: "listening",
    manner: "Listening",
    meaning: "Listening says the other person's inner world is worth your attention. It is one of the simplest forms of love.",
    scripture: "\"Let every man be swift to hear, slow to speak, and slow to anger\" (Jas 1:19). Answering before listening is \"folly and shame\" (Prov 18:13).",
    culture: "Eye contact, silence and interrupting have different meanings across cultures. The universal part is genuine attention and seeking to understand."
  },
  {
    id: "punctuality",
    manner: "Punctuality",
    meaning: "Respecting other people's time and keeping your word about when you will be there.",
    scripture: "Scripture has no rule about clocks, but it does say let your \"yes\" be \"yes\" (Matt 5:37) and to make the best use of time (Eph 5:16).",
    culture: "This is strongly cultural: some cultures are clock-based, others event-based. The universal part is honouring others and keeping commitments as they are understood where you are."
  },
  {
    id: "privacy",
    manner: "Privacy",
    meaning: "Respecting what belongs to another person: their story, home, body and confidences.",
    scripture: "\"One who brings gossip betrays a confidence\" (Prov 11:13). Don't make a habit of your neighbour's house, lest he grow tired of you (Prov 25:17).",
    culture: "What counts as private (money, age, family matters) differs by culture. The universal heart is not exposing or using someone's private life against them; safety concerns are a different matter."
  },
  {
    id: "speech",
    manner: "Speech",
    meaning: "Words build or break. Gracious speech gives life and dignity, even in disagreement.",
    scripture: "\"Let no corrupt speech proceed out of your mouth, but only what is good for building others up\" (Eph 4:29). \"Let your speech always be with grace, seasoned with salt\" (Col 4:6).",
    culture: "Directness, volume and humour vary. Some cultures value bluntness, others indirectness. The universal part is truth spoken in love, without contempt."
  }
];

RG.lvLend = [
  {
    id: "lending-poor",
    case: "Someone in real need asks to borrow money",
    guidance: "The Law forbade charging interest to a poor neighbour (Exod 22:25) and told Israel not to harden their hearts or close their hands to a brother in need (Deut 15:7-8). Deuteronomy 15 even released debts every seventh year. Lending to the poor was meant to lift people up, not to profit from their trouble.",
    refs: ["Exod 22:25", "Deut 15:1-11", "Lev 25:35-37", "Prov 19:17"]
  },
  {
    id: "asking-back",
    case: "Asking for money back",
    guidance: "Repaying is a matter of integrity: \"The wicked borrow, and don't pay back\" (Ps 37:21), so it is not unloving to ask kindly. Jesus also calls us beyond calculation: \"lend, expecting nothing back\" (Luke 6:34-35). In practice, lend only what you could bear to lose, ask honestly when it is due, and decide in freedom whether to release the debt.",
    refs: ["Ps 37:21", "Luke 6:34-35", "Rom 13:8", "Matt 18:23-35"]
  },
  {
    id: "guaranteeing",
    case: "Being asked to co-sign or guarantee a loan",
    guidance: "Proverbs warns: \"Don't you be one of those who strike hands, of those who are collateral for debts. If you don't have means to pay, why should he take away your bed from under you?\" (Prov 22:26-27). Love does not require putting your household at risk; it is wise to say no or to give a smaller, clear gift instead.",
    refs: ["Prov 22:26-27", "Prov 6:1-5", "Prov 17:18", "1 Tim 5:8"]
  },
  {
    id: "give-not-lend",
    case: "When to give rather than lend",
    guidance: "If repayment is unlikely or would damage the relationship, it is often kinder to give a smaller gift freely than to lend a larger sum. \"The borrower is servant to the lender\" (Prov 22:7), and debt between friends can quietly sour love. A gift keeps the relationship free.",
    refs: ["Prov 22:7", "Luke 6:30", "2 Cor 9:7", "Acts 20:35"]
  },
  {
    id: "will-not-work",
    case: "Someone able to work keeps asking for support",
    guidance: "Paul wrote, \"If anyone is not willing to work, don't let him eat\" (2 Thess 3:10), addressing people who chose idleness, not those who cannot work. Paul himself worked as a tentmaker so as not to be a burden (Acts 18:3; 2 Thess 3:8). Love may say no to ongoing support while still helping someone find work, skills or proper help.",
    refs: ["2 Thess 3:6-13", "Acts 18:3", "Eph 4:28", "1 Tim 5:8"]
  },
  {
    id: "generous-not-used",
    case: "Being generous without being used",
    guidance: "Jesus calls us to open-handed generosity (Luke 6:38) and also to be \"wise as serpents and harmless as doves\" (Matt 10:16). Give from freedom, not fear or guilt (2 Cor 9:7); set a budget for giving; check real needs; and notice manipulation. Saying no to one request can keep you free to say yes where it truly helps.",
    refs: ["Luke 6:38", "Matt 10:16", "2 Cor 9:7", "1 Tim 6:17-19", "Eccl 5:18-19"]
  }
];

RG.lvEvidence5 = [
  {
    text: "\"But we made our prayer to our God, and set a watch against them day and night because of them.\"",
    source: "Nehemiah 4:9, World English Bible",
    url: "https://biblehub.com/web/nehemiah/4.htm"
  },
  {
    text: "After the angel's promise and \"I believe God, that it will be just as it has been spoken to me\" (v. 25), Paul still says: \"Unless these stay in the ship, you can't be saved.\"",
    source: "Acts 27:25, 31, World English Bible",
    url: "https://biblehub.com/web/acts/27.htm"
  },
  {
    text: "Elijah \"bowed himself down on the earth, and put his face between his knees. He said to his servant, 'Go up now and look toward the sea.'\"",
    source: "1 Kings 18:42-43, World English Bible",
    url: "https://biblehub.com/web/1_kings/18.htm"
  },
  {
    text: "\"We don't know what to do, but our eyes are on you.\" Then they rose early and went out, with singers praising God before the army.",
    source: "2 Chronicles 20:12, 20-21, World English Bible",
    url: "https://biblehub.com/web/2_chronicles/20.htm"
  },
  {
    text: "Jacob prays, \"Please deliver me from the hand of my brother\" (v. 11), then takes \"a present for Esau, his brother\" (v. 13).",
    source: "Genesis 32:11, 13, World English Bible",
    url: "https://biblehub.com/web/genesis/32.htm"
  },
  {
    text: "Phil 2:4 in Greek reads <em>mē ta heautōn hekastoi skopountes, alla kai ta heterōn hekastoi</em>: \"not [only] looking to your own things, but <em>also</em> to the things of others\". The <em>kai</em> (\"also\") keeps both in view.",
    source: "Philippians 2:4, Greek text analysis (Nestle 1904 / Westcott-Hort)",
    url: "https://biblehub.com/text/philippians/2-4.htm"
  },
  {
    text: "\"You know that they who are recognized as rulers over the nations lord it over them… But it shall not be so among you, but whoever wants to become great among you shall be your servant.\"",
    source: "Mark 10:42-43, World English Bible",
    url: "https://biblehub.com/web/mark/10.htm"
  },
  {
    text: "\"Don't you be one of those who strike hands, of those who are collateral for debts. If you don't have means to pay, why should he take away your bed from under you?\"",
    source: "Proverbs 22:26-27, World English Bible",
    url: "https://biblehub.com/web/proverbs/22.htm"
  },
  {
    text: "\"The wicked borrow, and don't pay back, but the righteous give generously.\"",
    source: "Psalm 37:21, World English Bible",
    url: "https://biblehub.com/web/psalms/37.htm"
  },
  {
    text: "Wesley's first rule is \"Gain all you can\", but \"we ought not to gain money at the expense of life, nor (which is in effect the same thing) at the expense of our health\", nor by \"hurting our neighbor\". His rules end: \"Having, First, gained all you can, and, Secondly, saved all you can, Then 'give all you can.'\"",
    source: "John Wesley, Sermon \"The Use of Money\" (reprint, Christian History Issue 2)",
    url: "https://christianhistoryinstitute.org/magazine/article/wesleys-sermon-use-of-money"
  }
];
