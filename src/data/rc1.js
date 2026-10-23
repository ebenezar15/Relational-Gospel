window.RG = window.RG || {}; var RG = window.RG;

/* Round 20 A: "Habits, healing & help" — secular help, the legal gospel and the relational gospel */

RG.rcIntro = {
  lede: "Therapy, twelve-step groups, medication, habit science and self-help really do help people leave smoking, drinking, porn and affairs, and recover from trauma. So what does the gospel add? This study compares three approaches: secular help, the legal gospel and the relational gospel. It maps where they overlap and where they differ, looks at who borrowed from whom, and asks honestly whether inner healing gets too much emphasis.",
  thesis: "God heals on two levels. On the <b>creation level</b> he works through the way he made bodies, brains, habits and relationships. That is why doctors, therapy and good habits help everyone, believers or not (common grace). On the <b>new-creation level</b> he gives what no technique can: forgiveness, a new identity as his child, union with Christ, the Spirit and an eternal hope. The legal gospel often ignores the first level or treats it with suspicion. Secular help has no access to the second. The relational gospel holds both together, and keeps Christ at the centre rather than healing."
};

/* The three approaches, compared topic by topic */
RG.rcDoors = [
  { id: "problem", topic: "What is the problem?",
    secular: "A learned pattern, a disorder or an injury: brain reward circuits, conditioning, trauma responses, unmet needs and stress. It is often described without moral language.",
    legal: "Sin: breaking God’s law. The habit is guilt before a holy Judge, and the main danger is punishment. Trauma is sometimes treated as a lack of faith or as unconfessed sin.",
    relational: "Sin <em>and</em> wound. Sin is a broken relationship that misses the mark of love, and it is real and harmful. It is often tangled with wounds, lies about identity and unmet longings for love. Scripture calls us sinners and sufferers, enslaved and harmed (Rom 7:15–24; Ps 147:3)." },
  { id: "root", topic: "What lies underneath?",
    secular: "Unmet needs (safety, connection, worth), learned coping, genetics, environment and adverse childhood experiences.",
    legal: "A rebellious heart and a lack of discipline. The answer is to repent, decide and obey.",
    relational: "A heart that is looking for life where life is not found (Jer 2:13). The longing is good, because it was made for God and for love. The address is wrong. Shame and fear drive us to hide (Gen 3:10), and hiding feeds the habit." },
  { id: "power", topic: "Where does the power come from?",
    secular: "Skills, insight, medication, support, environment change and the person’s own motivation.",
    legal: "Willpower plus prayer. God gives help when we try hard enough and stay pure enough.",
    relational: "Grace: the Father’s love, our union with Christ and the Spirit within. God also works through means such as doctors, medicine, counsel, community and new habits. Grace does not cancel effort. It fuels it (Phil 2:12–13; 1 Cor 15:10)." },
  { id: "goal", topic: "What is the goal?",
    secular: "Symptom relief, functioning, wellbeing and self-actualisation.",
    legal: "Stop sinning, avoid punishment, and be acceptable to God and the church.",
    relational: "To be with God and like him: to love God and neighbour freely. Freedom from the habit is a fruit along the way, not the condition for being loved (Gal 5:1, 13–14; 2 Cor 3:18)." },
  { id: "effort", topic: "The role of effort",
    secular: "Central: practise skills, track triggers, build new routines.",
    legal: "Central, but often anxious. Effort is used to earn or keep God’s approval, so failure brings condemnation.",
    relational: "Real effort from a secure place. We train, not just try (1 Tim 4:7–8). We work <em>from</em> acceptance, not <em>for</em> it. Grace “teaches us to say no” (Titus 2:11–12)." },
  { id: "relapse", topic: "When you relapse",
    secular: "Normal in recovery. Learn from it, adjust the plan and keep going.",
    legal: "Often treated as proof of a false conversion or a weak faith. It brings shame, hiding and promises to try harder.",
    relational: "Relapse is real failure but not rejection. Run to the Father, not from him (Luke 15:20; 1 John 1:9–2:1). Tell the truth to someone safe, learn the pattern and get up again (Prov 24:16)." },
  { id: "christ", topic: "The place of Christ",
    secular: "None. Some programmes allow a “higher power” of the person’s own understanding.",
    legal: "Christ paid the penalty. After that, the believer often lives by rules and effort, with Jesus as an example to imitate.",
    relational: "Christ is the life: he took on our humanity, healed it from the inside, and now lives in us (Gal 2:20; Col 3:3–4). Freedom is learning to live from who we already are in him (Rom 6:11)." },
  { id: "community", topic: "The role of community",
    secular: "Strongly emphasised: groups, sponsors, therapy relationships and social support.",
    legal: "Accountability, often focused on reporting failures. Secrecy is common out of fear of judgement.",
    relational: "Family: a safe place to confess and be loved (James 5:16; Gal 6:1–2). We are healed in relationship because we were wounded in relationship." },
  { id: "horizon", topic: "The final horizon",
    secular: "This life: a better-functioning self.",
    legal: "Heaven or hell. The habit is a threat to your eternal destiny.",
    relational: "New creation: the whole person and the whole world made new (Rev 21:4–5). Today’s healing is a foretaste, and what is not healed yet will be." }
];

/* Habit loop flowchart: where each approach intervenes */
RG.rcLoop = [
  { id: "root", label: "The root: a need or a wound", text: "Underneath most habits is a real need or pain: loneliness, stress, boredom, rejection, trauma, shame, or a body that is already addicted.",
    secular: "Therapy names the need and finds healthier ways to meet it. Trauma therapy processes the wound.",
    legal: "Often skipped. The focus stays on the behaviour, and talking about wounds can be seen as making excuses.",
    relational: "The need is God-given, and the Father meets it first: “I have loved you with an everlasting love” (Jer 31:3). Wounds are brought into the light with Jesus and with safe people (Ps 34:18).",
    ref: "Jer 2:13; Ps 34:18" },
  { id: "cue", label: "Cue (trigger)", text: "A time, place, emotion, person or image that starts the craving: late night alone, payday, an argument, a phone in bed.",
    secular: "Identify triggers and change the environment. Avoid high-risk situations.",
    legal: "“Flee temptation”, which is wise, but often done through fear alone.",
    relational: "Wisdom and self-knowledge without shame. Jesus also says to remove what causes you to stumble (Matt 5:29–30), and Proverbs gives plenty of advice about avoiding the path (Prov 4:14–15).",
    ref: "Matt 5:29–30; Prov 4:14–15; Rom 13:14" },
  { id: "craving", label: "Craving", text: "A surge of desire, driven by dopamine in the brain’s reward system. It rises, peaks and passes, usually within minutes.",
    secular: "“Urge surfing”: notice the craving without obeying it, delay, distract. Medication can reduce cravings.",
    legal: "Resist harder and pray harder. Feeling the urge is often treated as already sinning.",
    relational: "Temptation is not sin. Jesus was tempted (Heb 4:15). Turn the craving into a conversation: “Father, this is what I want right now; what I really need is you.” Then do the next wise thing.",
    ref: "Heb 4:15–16; 1 Cor 10:13; James 1:14–15" },
  { id: "routine", label: "Routine (the act)", text: "The behaviour itself: the cigarette, the drink, the scroll, the click, the message.",
    secular: "Replace the routine with a healthier one that gives a similar reward: exercise, calling a friend, nicotine replacement.",
    legal: "Stop the behaviour by willpower and a firm decision.",
    relational: "“Put off… put on” (Eph 4:22–24): not just stopping, but replacing with something good. You do the new thing as a beloved child learning, not as a convict on probation.",
    ref: "Eph 4:22–32; Gal 5:16" },
  { id: "reward", label: "Reward", text: "Short relief: calm, pleasure, escape, connection, a feeling of control. The brain learns, “this works”.",
    secular: "Find other rewards and build a life that is more rewarding than the habit.",
    legal: "Says the pleasure is sinful and should be despised.",
    relational: "Joy is God’s idea (Ps 16:11). The problem is cheap rewards that cannot satisfy. A life of love, purpose and real friendship slowly becomes more rewarding than the counterfeit.",
    ref: "Ps 16:11; John 10:10; Isa 55:2" },
  { id: "after", label: "Aftermath: shame or grace?", text: "What happens after a failure decides the next round. Shame says “I am bad”, so the person hides and goes back to the habit to numb the pain. Guilt with grace says “I did wrong, and I am loved”, so the person repairs and grows.",
    secular: "Self-compassion and avoiding shame spirals are standard in recovery.",
    legal: "Often deepens shame, which research links to relapse and hiding.",
    relational: "“There is now no condemnation” (Rom 8:1). Confess, receive forgiveness, make repair and go again. Kindness leads to repentance (Rom 2:4).",
    ref: "Rom 8:1; Rom 2:4; 1 John 1:9" }
];

/* Common grace: why help works for everyone */
RG.rcGrace = [
  { id: "physician", title: "Jesus affirmed doctors", text: "“Those who are healthy have no need for a physician, but those who are sick do.” Jesus uses medicine as a positive picture of his own work. Luke, “the beloved physician”, travelled with Paul.", ref: "Luke 5:31; Col 4:14" },
  { id: "means", title: "God heals through means", text: "Isaiah told King Hezekiah to put a poultice of figs on his boil, even though God had promised healing. Paul told Timothy to take a little wine for his stomach. God’s promise and medical means worked together.", ref: "Isaiah 38:21; 1 Tim 5:23" },
  { id: "rain", title: "Rain on the just and the unjust", text: "God gives good gifts to everyone, including sunlight, rain, food, wisdom and healing. So when therapy or medicine helps an unbeliever, that is still God’s kindness.", ref: "Matt 5:45; Acts 14:17; James 1:17" },
  { id: "design", title: "We are fearfully and wonderfully made", text: "God designed the brain to change through practice, connection and rest. When science discovers how habits form or how trauma heals, it is describing God’s workmanship.", ref: "Psalm 139:13–16" },
  { id: "counsel", title: "Wisdom from outsiders", text: "Moses took management advice from Jethro, a Midianite priest. Proverbs borrows wisdom that has parallels in Egyptian sayings. Paul quoted pagan poets. Truth is God’s, wherever it is found.", ref: "Exodus 18:13–24; Acts 17:28; Prov 22:17–21" },
  { id: "conscience", title: "The law written on hearts", text: "Paul says people without Scripture still “do by nature the things of the law”. Human wisdom about honesty, responsibility and self-control often overlaps with God’s ways.", ref: "Romans 2:14–15" },
  { id: "counsellors", title: "Plans succeed with many advisers", text: "“Where there is no counsel, plans fail; but in a multitude of counselors they are established.” Seeking help is wise, not faithless.", ref: "Prov 15:22; Prov 11:14" },
  { id: "limits", title: "But common grace has a ceiling", text: "Common grace can heal a body, train a habit and calm a mind. It cannot forgive sin, reconcile us to God, give a new heart or raise the dead. That is saving grace, and it comes only through Christ.", ref: "John 14:6; Ezek 36:26; Eph 2:4–8" }
];

/* Two levels of healing */
RG.rcLevels = [
  { id: "body", level: "creation", label: "Body", text: "Detox, medication, sleep, nutrition, exercise, nicotine replacement, treating depression or chronic pain.", who: "Doctors, nurses, pharmacists", ref: "1 Tim 5:23; 1 Cor 6:19–20" },
  { id: "brain", level: "creation", label: "Brain & habits", text: "Rewiring cue–craving–reward loops, building new routines, triggers plans, renewing patterns of thought.", who: "Therapists, coaches, habit science", ref: "Rom 12:2; Phil 4:8–9" },
  { id: "emotions", level: "creation", label: "Emotions & memories", text: "Processing trauma, grief and anger; learning to name and regulate feelings.", who: "Trauma therapists, counsellors", ref: "Psalm 13; Psalm 42" },
  { id: "relationships", level: "creation", label: "Relationships", text: "Repairing trust, honest communication, boundaries, support groups.", who: "Marriage counsellors, support groups, friends", ref: "Gal 6:2; Eccl 4:9–12" },
  { id: "identity", level: "new", label: "Identity", text: "No longer “an addict” or “a failure” at the core, but a beloved child in whom Christ lives.", who: "The Father’s word; the church reminds you", ref: "1 John 3:1; 2 Cor 5:17" },
  { id: "forgiveness", level: "new", label: "Forgiveness & reconciliation", text: "Guilt actually removed, not just managed. You are reconciled with God, and that makes you able to forgive and be forgiven by others.", who: "Christ alone", ref: "Col 2:13–14; 2 Cor 5:18–19" },
  { id: "spirit", level: "new", label: "The Spirit within", text: "A new desire and power from inside. Self-control is the fruit of the Spirit, not only of training.", who: "The Holy Spirit", ref: "Gal 5:22–23; Ezek 36:26–27" },
  { id: "hope", level: "new", label: "Hope & resurrection", text: "What does not heal in this life will be healed. Every tear will be wiped away.", who: "The risen Christ", ref: "Rev 21:4; Rom 8:18–23" }
];

/* Venn map: where the approaches overlap */
RG.rcVenn = [
  { id: "s", zone: "Secular help only", items: ["Diagnosis and treatment plans", "Medication and detox protocols", "Evidence-based techniques such as CBT, EMDR and motivational interviewing", "Measurable outcomes and research"], note: "These are good gifts of common grace. Christians are free to use them." },
  { id: "l", zone: "Legal gospel only", items: ["Fear of punishment as the main motivator", "Sin management by willpower", "Shame-based accountability", "Healing seen as a sign of enough faith"], note: "Here the legal approach can harm: it makes hiding more likely and joy less likely." },
  { id: "r", zone: "Relational gospel only", items: ["Identity as a child in union with Christ", "Participation in Christ’s healed humanity", "The Father’s unconditional love as the starting point", "Healing as a fruit, not the goal"], note: "This is the distinctive heart: the new-creation level." },
  { id: "sl", zone: "Secular + legal", items: ["Behaviour change and clear boundaries", "Avoiding triggers", "Consequences matter"], note: "Both rightly take behaviour seriously." },
  { id: "sr", zone: "Secular + relational", items: ["Wounds and needs underneath habits", "Shame as fuel for addiction", "Self-compassion rather than self-hatred", "Healing in safe relationships", "Process over instant fixes"], note: "This is the overlap that makes some people think the relational gospel is “just therapy”. The overlap exists because both are describing how God made people." },
  { id: "lr", zone: "Legal + relational", items: ["Sin is real and harmful", "Jesus alone saves", "Repentance and confession", "Prayer and Scripture", "The church as community"], note: "Both are Christian; they differ in tone and centre, not on whether sin matters." },
  { id: "all", zone: "All three", items: ["Change is possible", "Honesty and confession help (“we are as sick as our secrets”)", "Community and support", "Practice over time", "Hope"], note: "These truths are so basic that every serious approach finds them, because they are written into creation." }
];
