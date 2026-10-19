window.RG = window.RG || {};
var RG = window.RG;

/* Round 16: How God works (part 4)
   wyVoices, wyVoiceQuiz, wyProvidence, wyFactors, wyEvidence4 */

RG.wyVoices = [
  {
    id: "spirit",
    voice: "The Spirit of God",
    sounds: "Quiet, clear and kind, even when it corrects. It names the thing specifically, points you to Jesus and invites you forward: “Come, let’s deal with this together.”",
    fruit: "Peace that steadies you, honest repentance without self-hatred, love for others, courage, and a growing freedom (Gal 5:22-23). Wisdom from above is “pure, then peaceful, gentle, reasonable, full of mercy” (Jas 3:17).",
    test: "Does it sound like Jesus? It convicts the behaviour but never attacks your identity, it leaves you drawn toward God rather than hiding from him, and it agrees with Scripture read through Christ. It often grows clearer with time instead of more frantic.",
    ref: "1 Kings 19:12: “After the fire, there was a still small voice.” John 10:27: “My sheep hear my voice.”"
  },
  {
    id: "conscience",
    voice: "Conscience",
    sounds: "An inner sense of “this is right” or “this is wrong”, accusing or excusing (Rom 2:15). It often speaks in the categories you were taught, so it can be accurate, over-strict or dulled.",
    fruit: "When healthy and well taught: integrity, honesty and care for others. When wounded or untaught: either needless guilt over things God has not forbidden (the “weak” conscience of 1 Cor 8:7) or a numbness to real harm (1 Tim 4:2).",
    test: "Conscience is a God-given faculty, but it is formable and fallible. Respect it (do not train yourself to override it), and also let Christ and Scripture inform it. Paul says not to wound another’s weak conscience, and Hebrews says Christ’s blood can <em>cleanse</em> the conscience “from dead works” (Heb 9:14).",
    ref: "Romans 2:15: “their conscience testifying with them”. The Greek is <em>syneidēsis</em>, literally “knowing-with”."
  },
  {
    id: "critic",
    voice: "The inner critic (shame)",
    sounds: "Harsh, vague and global: “You always…”, “You’re such a…”, “Of course it went wrong, it’s you.” It attacks who you are rather than naming a specific act, and it never says what to do next.",
    fruit: "Hiding, self-hatred, perfectionism, people-pleasing, paralysis, and a sense of being permanently on probation with God. It isolates you from the people and the God who could help.",
    test: "If a voice leaves you hopeless, condemned and pushed away from God, it is not his voice, however religious it sounds. Scripture calls the accuser by name (Rev 12:10) and says God is greater than our condemning heart (1 John 3:20). Much of this voice is learned: old words from parents, teachers or wounds, replayed.",
    ref: "Romans 8:1: “There is therefore now no condemnation to those who are in Christ Jesus.” 1 John 3:20: “God is greater than our heart.”"
  },
  {
    id: "fear",
    voice: "Fear",
    sounds: "Urgent and catastrophic: “What if…?”, “Do it now or everything falls apart”, “If you don’t, God will punish you.” It pushes for instant decisions and certainty.",
    fruit: "Anxiety, control, compulsive checking, superstition about God (“if I miss a prayer, something bad will happen”), and choices made to avoid pain rather than to love.",
    test: "Love does not drive by threat. God’s guidance may be urgent at times, but it does not come with dread or panic as its signature. Fear can also be a healthy alarm about real danger; listen to what it warns you of, but do not let it be the voice of God in your head.",
    ref: "1 John 4:18: “There is no fear in love; but perfect love casts out fear.” 2 Timothy 1:7: “God didn’t give us a spirit of fear, but of power, love, and self-control.”"
  },
  {
    id: "religion",
    voice: "Religious culture",
    sounds: "“Good Christians don’t…”, “Our kind of people always…”, “What will they think?” It speaks with the authority of the group, and it often sounds like Scripture even when it is only custom.",
    fruit: "Conformity, comparison, judging others, fear of leaders’ disapproval, and convictions you hold because you were told to rather than because you have met Christ in them. At its best, it also passes on real wisdom and good habits.",
    test: "Ask: is this the command of God, or a tradition about it? Jesus honoured the Scriptures but challenged traditions that blocked love (Mark 7:8). Healthy community helps you hear God; unhealthy culture replaces him. Different churches “convict” about different things, which is a clue that culture is speaking (Rom 14:5).",
    ref: "Mark 7:8 (KJV): “For laying aside the commandment of God, ye hold the tradition of men.”"
  }
];

RG.wyVoiceQuiz = [
  {
    id: "worthless",
    message: "You’re worthless. God is tired of you.",
    answer: "critic",
    why: "It attacks your identity and pushes you away from God, which is the signature of shame, not the Spirit. Scripture says the opposite: God is greater than our condemning heart (1 John 3:20)."
  },
  {
    id: "always-mess-up",
    message: "You always ruin everything. Why would anyone, God included, want you around?",
    answer: "critic",
    why: "The words “always” and “anyone” are global and vague; there is nothing specific to repent of and no way forward. That is the inner critic replaying old wounds, not conviction."
  },
  {
    id: "miss-prayer",
    message: "If you skip your quiet time today, something bad will happen to your family.",
    answer: "fear",
    why: "This links God to threat and superstition, as if love were a transaction. Prayer is relationship, not insurance, and “perfect love casts out fear” (1 John 4:18)."
  },
  {
    id: "decide-now",
    message: "Decide right now or you’ll miss God’s will forever.",
    answer: "fear",
    why: "Panic and a sense of one irreversible chance are marks of fear. God’s wisdom is “reasonable” and “peaceful” (Jas 3:17), and he is able to guide and redeem even our mistakes."
  },
  {
    id: "lied-colleague",
    message: "You weren’t honest with your colleague today. That wasn’t right, and you know it.",
    answer: "conscience",
    why: "It names a specific act and appeals to a moral sense you already have, which is what conscience does (Rom 2:15). Healthy conscience leads to putting it right, not to self-hatred."
  },
  {
    id: "uneasy-film",
    message: "I feel uneasy watching this, even though my friends think it’s fine.",
    answer: "conscience",
    why: "Paul says that what one believer can do freely may trouble another’s conscience, and that we should not override it or despise it in others (Rom 14; 1 Cor 8:7). Conscience can grow and be better informed, but it deserves respect now."
  },
  {
    id: "real-christians",
    message: "Real Christians in our church never miss a Sunday, and they don’t ask questions like yours.",
    answer: "religion",
    why: "It speaks with the authority of the group and measures faith by conformity. Gathering together is good (Heb 10:25), but honest questions are welcome in Scripture, from the Psalms to Thomas."
  },
  {
    id: "what-will-they-think",
    message: "What will the elders think if you’re seen helping at that kind of place?",
    answer: "religion",
    why: "This is reputation and group approval talking. Jesus was criticised for eating with the very people religion kept at a distance (Luke 15:1-2)."
  },
  {
    id: "beloved-come-home",
    message: "You are my beloved child. That sharp word you spoke hurt your friend; go and make it right, and I am with you.",
    answer: "spirit",
    why: "It is specific about the wrong yet rooted in belonging, and it invites action with God’s presence. That combination of truth, kindness and hope matches the Spirit who testifies that we are God’s children (Rom 8:15-16)."
  },
  {
    id: "rest-trust",
    message: "You don’t have to carry this alone. Rest, ask for wisdom, and take the next small step.",
    answer: "spirit",
    why: "It brings peace rather than pressure and points you to God’s generous help (Jas 1:5; Matt 11:28). The Spirit’s fruit is love, joy and peace, not frantic striving (Gal 5:22)."
  }
];

RG.wyProvidence = [
  {
    id: "meticulous",
    label: "Meticulous sovereignty",
    who: "Reformed / Calvinist tradition: John Calvin, the Westminster Confession (1646), and today writers such as John Piper and many Reformed theologians.",
    view: "God governs “all creatures, actions, and things, from the greatest even to the least”, according to “the free and immutable counsel of his own will” (WCF 5.1). He usually works through “second causes”, including real human choices, yet all things come to pass according to his decree. God is not “the author or approver of sin”, but even evil is bounded and ordered toward his holy ends (WCF 5.4).",
    example: "A tragedy is within God’s plan, even though the people who caused it are fully guilty; God means it for a good purpose we may not see (Gen 50:20). An answered prayer is God bringing about what he had ordained to do through that very prayer.",
    strength: "Deep comfort that nothing is random or outside God’s hands, and a strong reading of texts like Gen 50:20, Acts 2:23 and Eph 1:11.",
    weakness: "Many find it hard to square with God’s love as seen in Jesus: if God decrees every abuse and disaster, how is he not their author? Critics say “second causes” names the tension rather than resolving it."
  },
  {
    id: "molinism",
    label: "Molinism (middle knowledge)",
    who: "Luis de Molina (1535-1600), a Spanish Jesuit; today William Lane Craig, Kirk MacGregor and others, including some Reformed-leaning and Arminian thinkers.",
    view: "God knows not only what will happen but what every free creature <em>would</em> freely do in any possible circumstance (“middle knowledge”). Using that knowledge, he chose to create a world in which his purposes are achieved through genuinely free choices. So God is fully sovereign and humans are fully free, because God sovereignly selects which free choices get actualised.",
    example: "God foresaw that if he created this world, a person would freely commit this evil; he permitted it because a world without such freedom, or a different feasible world, would not achieve the greater good he intends. An answered prayer is part of the world God chose knowing you would freely pray.",
    strength: "Tries to hold together strong sovereignty and real libertarian freedom, and has been influential in philosophy of religion and on the problem of evil.",
    weakness: "The “grounding objection”: what makes it true, before any creature exists, what that creature <em>would</em> freely do? Some also say it still leaves God choosing a world with known horrors in it."
  },
  {
    id: "arminian",
    label: "Classical Arminian",
    who: "Jacob Arminius, John Wesley, the Methodist and Wesleyan-Holiness traditions, and many evangelicals today (e.g. Roger Olson).",
    view: "God foreknows all things and governs the world, but he has given creatures real freedom and does not determine their choices. Wesley taught a “particular providence” (God cares about every hair of your head, Luke 12:7) and believed God can and does act beyond nature’s ordinary course, yet he governs people “so far as it can be done without compulsion, without over-ruling his liberty” (Sermon 67).",
    example: "A tragedy caused by human evil is permitted, not willed, because God will not turn people into machines; he grieves it and works to bring good from it. An answered prayer is God freely responding to your request, sometimes even suspending nature’s ordinary course.",
    strength: "Keeps God’s love and human responsibility clearly in view, and fits texts where God pleads, grieves and is resisted (Luke 13:34).",
    weakness: "Calvinists say it weakens God’s sovereignty; open theists ask how God can foreknow a choice infallibly yet the choice still be free. Why God permits some horrors and not others remains a mystery."
  },
  {
    id: "open-theism",
    label: "Open theism",
    who: "Clark Pinnock, John Sanders, Greg Boyd (<em>God of the Possible</em>, 2000), William Hasker and others. Boyd is the best-known relational-gospel voice here, adding a “warfare worldview”.",
    view: "The future is partly settled and partly open, made of real possibilities. God knows all that can be known, including every possibility, but free choices not yet made are not yet there to be known as certain. God is a wise and responsive partner who has a goal for history, adapts his plans, and works with and against free agents, including spiritual powers (Boyd’s “warfare worldview”).",
    example: "A tragedy is not God’s will or plan; it flows from free creatures (human or spiritual) and a world at war, and God works in every situation to bring good. An answered prayer is real collaboration: things happen because you prayed that might not have happened otherwise.",
    strength: "Takes at face value the many texts where God changes course, is disappointed or responds (Jer 18; Jonah 3:10), and it frees God from being the planner of evil.",
    weakness: "Critics say it limits God’s knowledge and contradicts predictive prophecy; most evangelical bodies have rejected it, and it still leaves the question why God does not intervene more often."
  },
  {
    id: "essential-kenosis",
    label: "Essential kenosis (open and relational)",
    who: "Thomas Jay Oord (<em>The Uncontrolling Love of God</em>, 2015; <em>God Can’t</em>, 2019), within a wider “open and relational” movement. Note that relational-gospel voices differ: Jersak and Zahnd stress non-coercive, Christlike love without adopting one system, while Barth, T.F. Torrance and David Bentley Hart hold a strong classical view of sovereignty read through Christ.",
    view: "Love comes first in God’s nature, and God’s love is by nature self-giving, others-empowering and uncontrolling. God <em>cannot</em> override the freedom, agency or existence he gives to creatures, not because something outside limits God, but because God “cannot deny himself” (2 Tim 2:13). God is present everywhere, working through persuasion and calling creatures to cooperate.",
    example: "God did not cause or even “allow” a tragedy, because God cannot stop it acting alone; God was present, suffering with those harmed and calling everyone toward healing. An answered prayer is God and creatures cooperating, which is why prayer and action matter.",
    strength: "Gives a clear answer to “Why didn’t God stop it?” that never makes God the author or permitter of evil, and fits the cross-shaped, non-coercive love seen in Jesus.",
    weakness: "Many think it shrinks God’s power too far, struggles with miracles, the resurrection and final victory, and leaves people wondering whether God can be trusted to win. Oord answers these at length, but most traditions do not follow him."
  }
];

RG.wyFactors = [
  {
    id: "free-will",
    factor: "Other people’s choices",
    text: "Much suffering comes from what people freely do: a drunk driver, an abuser, a war. If God made a world where love is real, choices must be real, and they affect others. Jesus himself wept over Jerusalem: “How often I wanted to gather your children… and you refused!” (Luke 13:34).",
    ref: "Luke 13:34; Gen 50:20",
    caution: "Saying God respects freedom never means the victim chose it or that God approved it."
  },
  {
    id: "time-and-chance",
    factor: "Time and chance",
    text: "We live in a stable, ordered world where gravity works, viruses spread and towers can fall. That order makes life, science and choice possible, but it also means accidents happen to good and bad people alike. Jesus said those killed when the tower of Siloam fell were not “worse offenders” than anyone else (Luke 13:4-5).",
    ref: "Eccl 9:11: “Time and chance happen to them all.” Matt 5:45",
    caution: "An accident is not a verdict on the person’s faith or worth."
  },
  {
    id: "spiritual-conflict",
    factor: "A world at war",
    text: "Scripture describes a creation in conflict, with powers that oppose God’s good purposes (Eph 6:12; Luke 13:16, where Jesus says Satan had bound a woman for eighteen years). Greg Boyd argues that this “warfare worldview” explains much evil without making it God’s will. Other traditions put more weight on God’s permission.",
    ref: "Eph 6:12; Luke 13:16; 1 John 3:8",
    caution: "Do not blame every hardship on demons or label suffering people as spiritually attacked because of their sin."
  },
  {
    id: "prayer",
    factor: "Prayer",
    text: "Scripture teaches that prayer genuinely matters and that God responds: “The insistent prayer of a righteous person is powerfully effective” (Jas 5:16). Yet James was killed while Peter was freed in the same chapter, and the church prayed for Peter (Acts 12:1-17). Prayer is real partnership, not a guarantee or a formula.",
    ref: "Jas 5:16; Acts 12:1-17",
    caution: "Never tell a grieving family that their loved one died because they did not pray enough or rightly."
  },
  {
    id: "wisdom",
    factor: "Wisdom and choices",
    text: "Some harm can be avoided by wise choices: rest, seatbelts, medical care, leaving a dangerous situation. “A prudent man sees danger and hides himself; but the simple pass on, and suffer for it” (Prov 22:3). God often protects through ordinary wisdom, doctors and good advice.",
    ref: "Prov 22:3; Jas 1:5",
    caution: "Wisdom reduces some risks, but many tragedies were not anyone’s mistake, and hindsight is not a weapon."
  },
  {
    id: "faith",
    factor: "Faith and trust",
    text: "Jesus often linked faith and healing (Mark 5:34), and trust opens us to God’s help. But Hebrews 11 lists heroes of faith who were delivered and others who “were tortured, not accepting their deliverance” (Heb 11:35-38), with no difference in their faith. Psalm 91 is a song of trust, not a promise that believers never suffer.",
    ref: "Mark 5:34; Heb 11:32-38; Ps 91",
    caution: "Never blame victims or the sick for a “lack of faith”; Jesus refused that logic (John 9:1-3)."
  },
  {
    id: "mystery",
    factor: "Honest mystery",
    text: "Job’s friends had neat explanations and God said they were wrong (Job 42:7). There are things we do not know and may not know in this life: “The secret things belong to Yahweh our God; but the things that are revealed belong to us” (Deut 29:29). What is revealed is the character of God in Jesus.",
    ref: "Deut 29:29; Job 42:7; Rom 11:33",
    caution: "Mystery is an honest “we don’t know”, not a way to shut down someone’s grief or questions."
  },
  {
    id: "presence-and-hope",
    factor: "Presence and resurrection",
    text: "God does not promise that we will avoid every flood, but he promises to be with us in it: “When you pass through the waters, I will be with you” (Isa 43:2). Nothing, not trouble, danger or death itself, can separate us from the love of God in Christ (Rom 8:35-39), and the resurrection means tragedy does not have the last word.",
    ref: "Isa 43:2; Rom 8:35-39; Rev 21:4",
    caution: "Hope is not a reason to rush grief; trauma and loss are real, and it is wise to seek support and professional help."
  }
];

RG.wyEvidence4 = [
  {
    text: "Strong’s 4893 <em>syneidēsis</em>, “conscience”, literally co-perception or joint-knowing. The lexicon lists the weak conscience (1 Cor 8:7), the seared conscience (1 Tim 4:2), the conscience cleansed by Christ (Heb 9:14) and Romans 2:15, with about 30 New Testament occurrences.",
    source: "Bible Hub, Strong’s Greek 4893",
    url: "https://biblehub.com/greek/4893.htm"
  },
  {
    text: "Luke 13:1-5 (WEB): of the Galileans killed by Pilate and the eighteen on whom the tower in Siloam fell, Jesus asks, “do you think that they were worse offenders than all the men who dwell in Jerusalem? I tell you, no.” Luke 13:16 speaks of a woman “whom Satan had bound eighteen long years”, and 13:34 of Jesus longing to gather Jerusalem “and you refused!”",
    source: "World English Bible, Luke 13 (eBible.org)",
    url: "https://ebible.org/eng-web/LUK13.htm"
  },
  {
    text: "Westminster Confession, chapter 5 “Of Providence”: God governs “all creatures, actions, and things, from the greatest even to the least”; all things come to pass according to his decree, yet “according to the nature of second causes, either necessarily, freely, or contingently”; God “neither is nor can be the author or approver of sin.”",
    source: "Westminster Confession of Faith ch. 5 (Bible Presbyterian Church)",
    url: "https://bpc.org/wcf-ch-5"
  },
  {
    text: "William Lane Craig explains Molina’s three kinds of divine knowledge: natural, middle and free. Middle knowledge is “God’s knowledge of what free creatures would freely do in any circumstances in which God might create them”, known logically prior to his decree to create.",
    source: "Reasonable Faith, “What Is Middle Knowledge?”",
    url: "https://www.reasonablefaith.org/media/other-videos/what-is-middle-knowledge"
  },
  {
    text: "Thomas Jay Oord: essential kenosis “says God cannot override, withdraw, or fail to provide the power of freedom, agency, or existence to creation”; “God can’t control others, not just won’t control”; and “God doesn’t even ‘allow’ suffering, because God can’t stop it acting alone.” He distinguishes this from Moltmann’s voluntary self-limitation.",
    source: "Thomas Jay Oord, “Who God Is: Essential Kenosis” (2019)",
    url: "https://thomasjayoord.com/who-god-is-essential-kenosis/"
  },
  {
    text: "John Wesley, Sermon 67 “On Divine Providence” (1786), on Luke 12:7: God governs people “so as not to destroy either their understanding, will, or liberty”, helping them “so far as it can be done without compulsion, without over-ruling his liberty”, yet Wesley also defends a “particular providence” and answered prayer beyond nature’s general laws.",
    source: "Wesley Corpus, Sermon 67",
    url: "https://corpus.historyofmethodism.com/passage/jw-sermon-067-013"
  },
  {
    text: "Publishers Weekly review of Greg Boyd’s <em>God of the Possible</em>, reproduced on ReKnew: Boyd defends the claim “that from God’s perspective, the future is partly open, a realm of possibilities as well as certainties”, and notes that open theism “usually receives a cool reception among evangelical theologians”. Endorsements include Clark Pinnock.",
    source: "ReKnew (Greg Boyd), God of the Possible endorsements and reviews",
    url: "https://reknew.org/2008/07/god-of-the-possible-endorsements-and-reviews/"
  }
];
