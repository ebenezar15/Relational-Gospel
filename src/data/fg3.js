window.RG = window.RG || {};
var RG = window.RG;

/* Round 9: "Forgiveness & repair", part 3 (interactive visuals).
   fgIntro: introduction paragraphs.
   fgStairs: two paths (the one who was hurt, the one who did harm) from harm toward possible reconciliation.
   fgTree: "What should I do?" decision tree.
   fgEgo: "Ego or self-respect?" sorter.
   fgHonor: false honour vs true honour cards.
   fgAbuse: types of abuse (of self, of others, from others) with a safety note.
   fgDavid: timeline of David's sin, forgiveness and its consequences.
   fgApology: six parts of a genuine apology (Lewicki, Polin & Lount, 2016).
   fgModels: five research and practice models.
   fgEvidence3: verified sources (checked 2026-10).
   Research models are research and practice, not Scripture. Safety comes first. */

RG.fgIntro = [
  "Forgiveness is one of the most beautiful words in the gospel, and one of the most misused. In Jesus, God does not keep a ledger against us: “Father, forgive them, for they don’t know what they are doing” (Luke 23:34). Because we have been forgiven and included in the Father’s love, we are invited to forgive too (Eph 4:32; Col 3:13). But forgiveness has often been confused with things it is not: forgetting, pretending, excusing, staying, trusting again straight away, or skipping justice.",
  "This page pulls apart words that usually get mashed together. <strong>Forgiveness</strong> is releasing the debt and the desire for revenge; it is one-sided and is often a process, not a single moment. <strong>Repentance</strong> is the other person’s change of mind and direction. <strong>Restitution</strong> is repairing what can be repaired. <strong>Trust</strong> is rebuilt slowly, by evidence, over time. <strong>Reconciliation</strong> takes two people who both choose it. And <strong>restoration to a role</strong> (a pulpit, a classroom, a position of power) is a separate question again, with its own tests (1 Tim 3:1-7).",
  "Safety comes first. If someone is hurting you or a child, or you are afraid, the most loving and Christlike step is to get safe and get help: call local emergency services if you are in danger, or contact an abuse hotline, a trusted person, or a professional. Forgiveness never requires you to stay, to keep quiet, or to trust someone who is still dangerous, and it does not cancel legal accountability, reporting duties or consequences. Nobody should pressure you to forgive quickly or to reconcile; God is patient with your pain (Ps 34:18).",
  "The tools below are interactive: two staircases (one for the one who was hurt, one for the one who did harm), a “What should I do?” decision path, a sorter for ego versus self-respect, cards on false and true honour, a guide to types of abuse, David’s story with its long aftermath, the parts of a real apology, and five research and pastoral models. The research is research, not Scripture, and Christians honestly differ on some questions (for example, whether forgiveness should wait for repentance, Luke 17:3). Use what helps, take your time, and bring it to people you trust."
];

RG.fgStairs = {
  "victim": [
    {
      "id": "v-name-and-safety",
      "step": "Name the harm and get safe",
      "who": "community",
      "oneSided": true,
      "text": "Call the harm what it is, without shrinking it to “a misunderstanding” or blaming yourself for it. If you are in danger, the first step is safety: leave if you can, tell someone you trust, and contact emergency services, an abuse hotline or the proper authorities.",
      "note": "This step depends on you and the people around you, not on the person who hurt you. Jesus himself withdrew from people who wanted to harm him (Luke 4:29-30; John 8:59).",
      "pitfall": "Common pitfall: being told to “forgive and move on” before the harm has even been named, which keeps victims silent.",
      "refs": ["Ps 55:12-14", "Prov 22:3", "Luke 4:29-30", "John 8:59", "Acts 9:23-25", "Eph 5:11"]
    },
    {
      "id": "v-grieve-and-be-angry",
      "step": "Grieve, and be angry without sin",
      "who": "me",
      "oneSided": true,
      "text": "Anger at real wrong is not the opposite of love; it is love noticing that something precious was damaged. Pour it out honestly to God, as the psalms do, and let grief have its time, while refusing to let anger turn into cruelty or revenge.",
      "note": "Scripture says “Be angry, and don’t sin” (Eph 4:26, quoting Ps 4:4). Forgiveness that skips grief usually goes underground and comes back later.",
      "pitfall": "Common pitfall: treating all anger as sin, so that grief is buried and comes out later as depression, bitterness or explosion.",
      "refs": ["Eph 4:26-27", "Ps 4:4", "Ps 13:1-2", "Ps 55:1-8", "Lam 3:19-24", "John 11:35", "Eccl 3:4"]
    },
    {
      "id": "v-release-revenge",
      "step": "Release revenge (forgive)",
      "who": "God",
      "oneSided": true,
      "text": "Forgiving means handing the debt and the right to get even over to God, who is just and who heals. It is a decision you may need to make many times, and the feelings often follow slowly; it does not mean saying what happened was fine.",
      "note": "One-sided: you can forgive someone who never apologises (Mark 11:25; Luke 23:34). Christians differ on whether Luke 17:3 (“if he repents, forgive him”) means forgiveness should wait for repentance; many distinguish an inner release of revenge from the full, spoken forgiveness that restores a relationship.",
      "pitfall": "Common pitfall: thinking forgiveness means the feelings must vanish at once; forgiving often has to be renewed many times.",
      "refs": ["Rom 12:17-21", "Mark 11:25", "Matt 6:12-15", "Matt 18:21-22", "Luke 23:34", "Col 3:13", "1 Pet 2:23"]
    },
    {
      "id": "v-set-boundaries",
      "step": "Set boundaries",
      "who": "me",
      "oneSided": true,
      "text": "Boundaries say what you will do to protect yourself and others, whatever the other person does. They can be distance, limited contact, meeting only with others present, or no contact at all, and they are a form of love that refuses to keep feeding harm.",
      "note": "A boundary is not a punishment; it is a fence around what God has entrusted to you (Prov 4:23). Paul himself refused to keep travelling with someone he did not yet trust (Acts 15:37-39), and later trust was rebuilt (2 Tim 4:11).",
      "pitfall": "Common pitfall: feeling that any boundary is unforgiving, or being told that a “real Christian” would keep the door wide open.",
      "refs": ["Prov 4:23", "Prov 22:24-25", "Matt 10:16", "Acts 15:37-39", "2 Tim 3:5", "2 Tim 4:14-15", "Gal 6:5"]
    },
    {
      "id": "v-watch-for-change",
      "step": "Watch for genuine change",
      "who": "them",
      "oneSided": false,
      "text": "Real repentance shows itself in fruit, not only in tears or promises: ownership, no excuses, patience with your pace, repair, and different behaviour over time. You are allowed to watch, test and wait, rather than take a moving apology as proof.",
      "note": "This step is in the other person’s hands; you cannot do it for them. Paul describes godly sorrow as producing earnestness, clearing of wrong and eagerness to put things right, unlike “the sorrow of the world” (2 Cor 7:9-11).",
      "pitfall": "Common pitfall: accepting a tearful apology as proof, then being blamed for “not trusting” when the old pattern returns.",
      "refs": ["Matt 3:8", "Luke 3:8-14", "2 Cor 7:9-11", "Luke 19:8", "Prov 26:24-26", "1 John 3:18"]
    },
    {
      "id": "v-rebuild-trust",
      "step": "Rebuild trust slowly (if safe)",
      "who": "both",
      "oneSided": false,
      "text": "Trust is rebuilt in small steps, with low risk first and more only as it proves safe; it is earned, not owed. If the person becomes defensive, pushes you to hurry, or repeats the harm, it is wise and right to step back again.",
      "note": "Two-sided: it needs your willingness and their steady trustworthiness. Jesus entrusted “much” to those faithful in “little” (Luke 16:10); trust grows the same way between people.",
      "pitfall": "Common pitfall: being pressured to trust fully all at once, as if trust were owed rather than earned.",
      "refs": ["Luke 16:10-11", "Prov 20:6", "Prov 25:19", "Gen 42:15-16", "Gen 44:1-34", "1 Cor 13:7"]
    },
    {
      "id": "v-reconcile",
      "step": "Reconcile (if both choose)",
      "who": "both",
      "oneSided": false,
      "text": "Reconciliation is a restored relationship, and it takes two people who both want it and both do their part. It is a beautiful gift when it happens, and it is not a failure of faith when it cannot happen safely.",
      "note": "God’s heart is reconciliation (2 Cor 5:18-19), and Joseph’s story shows it can happen after deep harm, but only after testing and change (Gen 45:1-15; 50:15-21). Romans 12:18 is honest: “If it is possible, as much as it is up to you, be at peace with all men.”",
      "pitfall": "Common pitfall: treating reconciliation as the only “successful” outcome, so people who wisely do not reconcile feel like spiritual failures.",
      "refs": ["2 Cor 5:18-20", "Rom 12:18", "Matt 5:23-24", "Gen 45:1-15", "Gen 50:15-21", "Eph 2:14-16"]
    }
  ],
  "offender": [
    {
      "id": "o-own-it",
      "step": "Own it fully, without excuses",
      "who": "me",
      "oneSided": true,
      "text": "Name what you did in plain words, including its effect on the other person, without “but”, “if” or “you also”. Shame says “I am bad and must hide”; honest guilt says “I did something wrong and I will face it”, and that is where change begins.",
      "note": "You can do this whatever the other person does. David’s cover-up made everything worse (2 Sam 11); his confession was the turning point (2 Sam 12:13). “He who conceals his sins doesn’t prosper, but whoever confesses and renounces them finds mercy” (Prov 28:13).",
      "pitfall": "Common pitfall: the non-apology: “I’m sorry if you were offended”, “mistakes were made”, or “I did it, but you…”.",
      "refs": ["Prov 28:13", "Ps 32:3-5", "Ps 51:3-4", "1 John 1:8-9", "2 Sam 12:13", "Matt 7:3-5", "Jas 5:16"]
    },
    {
      "id": "o-receive-forgiveness",
      "step": "Receive God’s forgiveness",
      "who": "God",
      "oneSided": true,
      "text": "In Christ you are already loved and not condemned, and God meets your confession with mercy, not contempt. Receiving that mercy gives you the security to stop defending yourself and to face the person you hurt honestly.",
      "note": "God’s forgiveness heals your heart before him; it does not erase the other person’s pain or your duty to repair. A forgiven person is freed to make amends, not excused from them (Luke 19:8-9).",
      "pitfall": "Common pitfall: using “God has forgiven me” to demand that the person you hurt move on, or to avoid making amends.",
      "refs": ["Rom 8:1", "Ps 103:8-12", "1 John 1:9", "Luke 15:20-24", "Mic 7:18-19", "Heb 4:15-16"]
    },
    {
      "id": "o-apologise",
      "step": "Apologise without demanding forgiveness",
      "who": "me",
      "oneSided": true,
      "text": "Say sorry clearly, take responsibility, explain without excusing, and say what you will do differently, then leave the other person free. Pressing them to forgive you, or to say “it’s okay”, turns your apology into another demand on the one you hurt.",
      "note": "Research on apologies found that a request for forgiveness was the least important element (Lewicki and colleagues, 2016). Jesus tells us to go and make things right before worship (Matt 5:23-24), not to extract forgiveness.",
      "pitfall": "Common pitfall: apologising in order to get something (forgiveness, relief, a return to normal) instead of for the other person’s sake.",
      "refs": ["Matt 5:23-24", "Luke 15:18-19", "Jas 5:16", "Prov 18:19", "Phil 2:3-4"]
    },
    {
      "id": "o-restitution",
      "step": "Make restitution where possible",
      "who": "me",
      "oneSided": true,
      "text": "Repair what can be repaired: pay back, replace, correct the record, cover costs of counselling, tell the truth to those you misled. Some harms cannot be undone, but costly repair shows that your sorrow is about them, not just about you.",
      "note": "The Law required restoring what was taken plus a fifth (Lev 6:1-5; Num 5:6-7). Zacchaeus went further, unasked: “if I have wrongfully exacted anything of anyone, I restore four times as much” (Luke 19:8).",
      "pitfall": "Common pitfall: saying sorry while leaving the practical damage for the other person to carry.",
      "refs": ["Luke 19:8-9", "Lev 6:1-5", "Num 5:6-7", "Exod 22:1", "Ezek 33:14-16"]
    },
    {
      "id": "o-accept-consequences",
      "step": "Accept consequences and boundaries",
      "who": "them",
      "oneSided": false,
      "text": "Accept the limits the other person sets, and any legal, workplace or church consequences, without sulking, bargaining or campaigning to be let off. Respecting a boundary you do not like is one of the clearest signs that you have changed.",
      "note": "This step is shaped by the other person and the wider community; your part is to accept it humbly. Forgiveness from God and from people does not cancel lawful consequences (Rom 13:3-4; 2 Sam 12:13-14).",
      "pitfall": "Common pitfall: campaigning to have boundaries removed, recruiting allies, or calling the other person “unforgiving”.",
      "refs": ["2 Sam 12:13-14", "Rom 13:1-4", "Gal 6:7-8", "Heb 12:11", "Prov 19:19", "1 Pet 4:15"]
    },
    {
      "id": "o-change-with-accountability",
      "step": "Change over time, with accountability",
      "who": "community",
      "oneSided": false,
      "text": "Real change takes time, help and honesty: counselling or a programme for the specific problem, mentors who can ask hard questions, and openness rather than secrecy. Ask trusted people to tell you the truth, and expect to be tested.",
      "note": "Paul speaks of restoring someone “in a spirit of gentleness” and of bearing burdens together (Gal 6:1-2), and of godly sorrow that bears visible fruit (2 Cor 7:10-11). For leaders, restoration to a role is a separate question (1 Tim 3:2-7).",
      "pitfall": "Common pitfall: relying on willpower and secrecy, or choosing “accountability” partners who will never challenge you.",
      "refs": ["Gal 6:1-2", "Jas 5:16", "Heb 3:13", "Prov 27:17", "2 Cor 7:10-11", "Eph 4:22-28"]
    },
    {
      "id": "o-wait",
      "step": "Wait; reconciliation is their choice",
      "who": "them",
      "oneSided": false,
      "text": "You can do everything right and still not be reconciled, because the other person is free to decide what is safe and good for them. Keep living the change anyway, pray for them, and leave the door open without pushing on it.",
      "note": "Reconciliation is two-sided, and only the person who was harmed can choose it. “If it is possible, as much as it is up to you” (Rom 12:18) is a word for you too: some of it is not up to you.",
      "pitfall": "Common pitfall: treating your change as a debt the other person now owes you, and growing resentful when they do not reconcile.",
      "refs": ["Rom 12:18", "Gen 32:3-21", "Gen 33:1-11", "Ps 37:7", "Lam 3:25-26", "Mic 6:8"]
    }
  ]
};

RG.fgTree = {
  "start": "safe",
  "nodes": {
    "safe": {
      "q": "Are you safe right now?",
      "options": [
        { "label": "Yes, I am safe right now", "next": "overwhelm" },
        { "label": "No, I am in danger or afraid of being hurt", "next": "r-get-safe" },
        { "label": "I’m not sure", "next": "r-unsure-safety" }
      ]
    },
    "overwhelm": {
      "q": "Are you overwhelmed (constant fear or anger, flashbacks, can’t sleep, eat or function)?",
      "options": [
        { "label": "Yes, I’m barely coping", "next": "r-counselling" },
        { "label": "I’m hurting, but I can think it through", "next": "harm-ongoing" }
      ]
    },
    "harm-ongoing": {
      "q": "Is the harm still happening, or likely to happen again?",
      "options": [
        { "label": "Yes, it is ongoing or keeps repeating", "next": "abuse-crime" },
        { "label": "No, it was in the past", "next": "leader" }
      ]
    },
    "abuse-crime": {
      "q": "Does it involve abuse, violence, a crime, or a child or vulnerable adult?",
      "options": [
        { "label": "Yes", "next": "r-report" },
        { "label": "No, but it is a hurtful pattern", "next": "necessary" }
      ]
    },
    "leader": {
      "q": "Is the person a leader (pastor, teacher, boss, coach) or someone with power over others?",
      "options": [
        { "label": "Yes", "next": "leader-pattern" },
        { "label": "No", "next": "acknowledged" }
      ]
    },
    "leader-pattern": {
      "q": "Was it a misuse of their power or position, abuse, or part of a pattern, rather than an ordinary personal clash?",
      "options": [
        { "label": "Yes, it used their position or is a pattern", "next": "r-leader-accountability" },
        { "label": "No, it was a personal conflict between equals", "next": "acknowledged" }
      ]
    },
    "acknowledged": {
      "q": "Have they acknowledged the harm?",
      "options": [
        { "label": "Yes, fully and without excuses", "next": "changing" },
        { "label": "Partly, or with excuses and blame", "next": "talked" },
        { "label": "No, or they deny it", "next": "talked" }
      ]
    },
    "talked": {
      "q": "Have you been able to talk to them about it directly?",
      "options": [
        { "label": "Not yet, and it feels safe to try", "next": "r-talk-directly" },
        { "label": "Yes, but they wouldn’t listen", "next": "r-bring-others" },
        { "label": "It doesn’t feel safe to talk to them", "next": "necessary" }
      ]
    },
    "changing": {
      "q": "Are they actually changing over time, not just saying sorry?",
      "options": [
        { "label": "Yes, consistently, over months", "next": "want-reconciliation" },
        { "label": "It’s too early to tell", "next": "r-forgive-and-wait" },
        { "label": "No, the same pattern continues", "next": "necessary" }
      ]
    },
    "want-reconciliation": {
      "q": "Do you want reconciliation with them?",
      "options": [
        { "label": "Yes, I would like that", "next": "trust-ready" },
        { "label": "Not now, or I’m not sure", "next": "r-forgive-step-back" },
        { "label": "No", "next": "r-forgive-release" }
      ]
    },
    "trust-ready": {
      "q": "Is there enough safety and evidence of change to begin rebuilding trust?",
      "options": [
        { "label": "Yes, I feel safe and see real fruit", "next": "r-reconcile" },
        { "label": "Some, but I’m still deeply hurt or unsure", "next": "r-reconcile-slowly" }
      ]
    },
    "necessary": {
      "q": "Is this a relationship you cannot simply leave (close family, work, co-parenting, church)?",
      "options": [
        { "label": "Yes, I have to keep some contact", "next": "r-firm-boundaries" },
        { "label": "No, I could step away", "next": "r-limit-contact" }
      ]
    },

    "r-get-safe": {
      "result": "Get safe first",
      "tone": "safe",
      "steps": ["Call your local emergency number if you are in immediate danger.", "Go to a safe place: a friend’s home, a public place, a shelter, or a locked room with a phone.", "When you can, contact a domestic abuse hotline to make a safety plan (in the US, 1-800-799-7233 or text START to 88788).", "Keep important documents, medication, a phone charger and some money somewhere you can reach quickly."],
      "text": "Your safety matters more than any conversation about forgiveness. If you are in immediate danger, call your local emergency number (for example 911 in the US, 999 in the UK, 112 in much of Europe) and get to a safe place. When you can, contact a domestic abuse hotline or a trusted person who can help you plan your next steps. Forgiveness can wait; it never requires you to stay in danger.",
      "refs": ["Prov 22:3", "Ps 18:2", "Matt 10:23", "Acts 9:23-25", "Ps 46:1"]
    },
    "r-unsure-safety": {
      "result": "Talk to someone who can help you assess safety",
      "tone": "caution",
      "steps": ["Write down what has happened and what frightens you, with dates if you can, and keep it somewhere safe.", "Call or chat with a domestic abuse or crisis hotline and describe the situation; they can help you think through warning signs.", "Tell one trusted person what is going on and agree a code word for when you need help.", "If at any point you feel afraid for your safety, treat it as an emergency."],
      "text": "Not being sure is a reason to reach out, not to wait. A domestic abuse or crisis hotline, a counsellor or a trusted friend can help you think through warning signs and make a safety plan. If things get worse, or you feel afraid, treat it as an emergency and call local emergency services.",
      "refs": ["Prov 11:14", "Prov 15:22", "Prov 27:12", "Ps 121:7-8"]
    },
    "r-counselling": {
      "result": "Get counselling support",
      "tone": "caution",
      "steps": ["Contact your doctor or a qualified, trauma-informed counsellor; ask a friend to help you find one if that feels too much.", "If you are thinking of harming yourself, call or text a crisis line now (988 in the US) or your local emergency number.", "Look after your body: sleep, food, gentle movement and safe company help the nervous system settle.", "Pray honestly, even if all you can say is “help”, and let others pray for you."],
      "text": "When pain floods everything, the first need is care, not a forgiveness decision. A qualified counsellor or trauma-informed therapist, your doctor, and trusted people can help your body and mind settle enough to think. If you have thoughts of harming yourself, contact a crisis line now (in the US, call or text 988). You can return to these questions later; God is close to the brokenhearted.",
      "refs": ["Ps 34:18", "Ps 147:3", "1 Kings 19:4-8", "Matt 11:28-30", "Gal 6:2"]
    },
    "r-report": {
      "result": "Report to the authorities",
      "tone": "safe",
      "steps": ["If anyone is in immediate danger, call emergency services.", "Report to the police or the local child-protection or adult-safeguarding service; schools and churches usually have a designated safeguarding lead.", "Write down what you know (dates, words, what you saw) and keep any messages or evidence.", "Find support for yourself: an advocate, counsellor or trusted friend can walk with you through the process."],
      "text": "Abuse, violence and crimes, especially against children or vulnerable adults, should be reported to the police or the proper child-protection or safeguarding authorities, and churches and schools often have legal reporting duties. Reporting is not unforgiveness or gossip; it protects people and lets lawful justice do its work (Rom 13:3-4). You can forgive and still report, and a counsellor or advocate can help you through the process.",
      "refs": ["Rom 13:1-4", "Eph 5:11", "Prov 31:8-9", "Ps 82:3-4", "Luke 17:1-2"]
    },
    "r-leader-accountability": {
      "result": "Bring others in and seek independent accountability",
      "tone": "safe",
      "steps": ["Write down what happened and keep any evidence.", "Tell a trusted person outside the leader’s circle of influence.", "Use the organisation’s safeguarding or complaints process, and ask whether an independent body can investigate.", "Report to the police if any law was broken; do not let the organisation handle a crime internally."],
      "text": "When a leader misuses power, it is no longer only a private matter between two people. Tell trusted people, use the organisation’s safeguarding or complaints process (ideally an independent one), and report to authorities if any law was broken. Scripture asks that elders who keep sinning be addressed openly, with evidence (1 Tim 5:19-20). Forgiving the person is one question; whether they should keep their role is another, judged by the qualifications in 1 Tim 3.",
      "refs": ["1 Tim 5:19-21", "1 Tim 3:1-7", "Ezek 34:1-10", "Matt 18:6", "Matt 20:25-28", "3 John 9-10"]
    },
    "r-talk-directly": {
      "result": "Talk to them directly",
      "tone": "hope",
      "steps": ["Pray and plan: what happened, how it affected you, and what you are asking for.", "Use “I” statements: “When you said…, I felt…, and I need…”.", "Listen to their side, and own any part that is genuinely yours.", "Agree on a next step, and if it turns hostile or unsafe, leave and move to bringing others in."],
      "text": "Jesus’ first step is a private, honest conversation: “If your brother sins against you, go, show him his fault between you and him alone” (Matt 18:15). Plan what you want to say, describe what happened and its effect on you, and say what you need. Choose a safe time and place, and stop if it turns unsafe or abusive.",
      "refs": ["Matt 18:15", "Luke 17:3", "Eph 4:15", "Eph 4:25-26", "Prov 27:5-6", "Lev 19:17"]
    },
    "r-bring-others": {
      "result": "Bring others in",
      "tone": "caution",
      "steps": ["Choose one or two wise, fair people both of you can respect, or a trained mediator.", "Explain the situation to them honestly, including your own part.", "Meet together with a clear purpose: understanding, repair and a way forward.", "If the person still refuses to listen, you may need to involve church leaders, a manager or formal processes (Matt 18:17)."],
      "text": "If a private conversation did not work, Jesus’ next step is to “take one or two more with you” (Matt 18:16): wise, fair people who can listen to both sides and help. This might be a mediator, an elder, a counsellor or a manager. Keep forgiving in your heart (releasing revenge) while you seek a fair process.",
      "refs": ["Matt 18:16-17", "Deut 19:15", "1 Cor 6:1-5", "Phil 4:2-3", "Prov 11:14"]
    },
    "r-forgive-and-wait": {
      "result": "Forgive, keep boundaries, and watch for fruit",
      "tone": "caution",
      "steps": ["Keep releasing revenge in prayer each time the hurt resurfaces.", "Keep your boundaries in place and see whether they respect them without complaint.", "Look for specific fruit: ownership, repair, changed behaviour, patience with your pace.", "Give it real time; months, not days, for serious harm."],
      "text": "You can release revenge now while keeping the boundaries that protect you. Words of apology are a good start, but trust waits for fruit over time (Matt 3:8). Watch whether they respect your limits, take responsibility without pressure, and keep changing when nobody is checking.",
      "refs": ["Matt 3:8", "Luke 6:43-45", "2 Cor 7:10-11", "Prov 4:23", "Matt 10:16"]
    },
    "r-forgive-step-back": {
      "result": "Forgive and step back",
      "tone": "hope",
      "steps": ["Tell them, if it is safe and wise, that you need space and do not know yet what you want.", "Keep praying for them and for your own healing.", "Talk it through with a trusted friend or counsellor.", "Revisit the question later; your answer may change, and that is fine either way."],
      "text": "It is fine not to be ready for reconciliation, even if they have changed. You can release the debt, pray for them and wish them well while keeping some distance until you know what you want. Healing has its own pace, and reconciliation offered under pressure is not real reconciliation.",
      "refs": ["Eccl 3:1-8", "Rom 12:18", "Luke 5:16", "Ps 62:5-8", "Col 3:13"]
    },
    "r-forgive-release": {
      "result": "Forgive and let the relationship go",
      "tone": "hope",
      "steps": ["Name the debt and hand it to God in prayer, perhaps writing it down.", "Grieve what the relationship could have been.", "Decide what minimal contact, if any, you will have, and keep it.", "When bitterness returns, repeat the release; forgiveness is often a practice, not a single moment."],
      "text": "Forgiveness and reconciliation are different. You can release revenge and bitterness and leave the person to God without restoring the relationship (Rom 12:19). Paul and Barnabas parted ways and both kept serving (Acts 15:39-41); letting go can be peace, not failure.",
      "refs": ["Rom 12:17-21", "Acts 15:36-41", "Heb 12:14-15", "Eph 4:31-32", "Ps 37:1-8"]
    },
    "r-reconcile": {
      "result": "Reconcile and rebuild trust",
      "tone": "hope",
      "steps": ["Talk together about what happened, what has changed and what each of you needs now.", "Agree on how you will handle it if old patterns appear.", "Keep building trust with small, faithful actions over time.", "Give thanks together for what God has done; celebrate the new beginning."],
      "text": "This is the gospel’s hope in a human relationship: harm owned, forgiveness given, and a relationship made new (2 Cor 5:18). Keep building trust step by step, keep honest check-ins, and celebrate the change you see. Like Joseph and his brothers, reconciliation can become a story of God bringing good out of what was meant for harm (Gen 50:20).",
      "refs": ["2 Cor 5:17-19", "Gen 45:4-15", "Gen 50:15-21", "Luke 15:20-24", "Phlm 15-18", "John 21:15-17"]
    },
    "r-reconcile-slowly": {
      "result": "Seek reconciliation slowly, with support",
      "tone": "caution",
      "steps": ["Start with low-risk contact: a short coffee, a message, a meeting with a third person present.", "Notice how you feel before, during and after, and share that with someone you trust.", "Increase contact only as it proves safe and respectful.", "Consider a counsellor or mediator to help you both."],
      "text": "You can move toward reconciliation without rushing it. Take small, low-risk steps, perhaps with a counsellor or mediator, and give each step time to prove safe. If pain stays raw or old patterns return, it is right to slow down or step back again.",
      "refs": ["Luke 16:10", "Gen 42:1-24", "Prov 19:2", "Jas 1:19", "Gal 6:1-2"]
    },
    "r-firm-boundaries": {
      "result": "Forgive and keep firm boundaries",
      "tone": "caution",
      "steps": ["Decide in advance what contact you will have (when, where, how long, who else is there).", "Decide what you will do if a line is crossed, and do it calmly.", "Keep communication short, factual and, where needed, in writing.", "Build support around you: friends, counsellor, and, where relevant, legal advice for co-parenting."],
      "text": "When you must stay connected (family, work, co-parenting), decide clearly what contact you will have and what you will do when lines are crossed. Keep conversations short and on topic, meet with others present where needed, and write things down. Forgiveness lets go of revenge; boundaries keep the harm from continuing.",
      "refs": ["Prov 4:23", "Prov 22:24-25", "Matt 10:16", "Neh 6:2-4", "Mark 6:11", "Gal 6:5"]
    },
    "r-limit-contact": {
      "result": "Limit or end contact",
      "tone": "safe",
      "steps": ["Decide whether you need limited contact or no contact at all.", "Block or mute numbers and accounts if needed, and tell trusted people your plan.", "Prepare a short, calm answer for mutual friends or family who ask.", "Keep forgiving in prayer, and let God handle what you cannot."],
      "text": "When someone keeps hurting you and the relationship is not one you must keep, it is wise and loving to step away. Limiting or ending contact is a boundary, not a curse; you can still forgive and pray for them from a distance. Paul warned Timothy to keep away from a man who had done him much harm (2 Tim 4:14-15).",
      "refs": ["2 Tim 4:14-15", "2 Tim 3:1-5", "Prov 13:20", "1 Cor 15:33", "Rom 16:17-18"]
    }
  }
};

RG.fgEgo = [
  {
    "id": "saying-no-overload",
    "behaviour": "Saying no to a request you genuinely cannot take on",
    "answer": "self-respect",
    "why": "Honest limits respect both your God-given capacity and the other person, who deserves a truthful answer rather than a resentful yes. Jesus himself left crowds to rest and pray (Mark 1:35-38; Luke 5:16).",
    "refs": ["Matt 5:37", "Mark 1:35-38", "Luke 5:16", "Gal 6:5"]
  },
  {
    "id": "apologise-only-if-they-do",
    "behaviour": "Refusing to apologise for your part until they apologise first",
    "answer": "ego",
    "why": "Making your honesty depend on theirs turns repentance into a bargaining chip. Jesus says to go first, even before worship (Matt 5:23-24), and to take the log out of your own eye (Matt 7:3-5).",
    "refs": ["Matt 5:23-24", "Matt 7:3-5", "Phil 2:3-4", "Jas 4:6"]
  },
  {
    "id": "leaving-when-shouting",
    "behaviour": "Leaving the room when someone starts shouting or threatening",
    "answer": "self-respect",
    "why": "Stepping away from aggression protects you and stops the conflict escalating; it is not weakness. You can calmly say you will continue when the conversation is safe and respectful.",
    "refs": ["Prov 22:24-25", "Prov 15:1", "Prov 17:14", "Luke 4:29-30"]
  },
  {
    "id": "last-word",
    "behaviour": "Needing to have the last word in every disagreement",
    "answer": "ego",
    "why": "The need to win every exchange usually protects an image rather than seeking truth or peace. Love “doesn’t seek its own way” and is not provoked (1 Cor 13:5).",
    "refs": ["1 Cor 13:4-5", "Prov 17:28", "Prov 18:2", "Jas 1:19-20"]
  },
  {
    "id": "fair-pay",
    "behaviour": "Asking to be paid fairly or treated equally at work",
    "answer": "self-respect",
    "why": "Scripture treats fair wages as a matter of justice, not greed (Deut 24:14-15; Jas 5:4). Asking respectfully for what is right honours the worth God gave you and helps others in the same position.",
    "refs": ["Deut 24:14-15", "Jas 5:4", "Luke 10:7", "1 Tim 5:18"]
  },
  {
    "id": "end-friendship-one-mistake",
    "behaviour": "Ending a friendship after one hurtful mistake",
    "answer": "depends",
    "why": "If it was a single ordinary failure, love can often cover it or talk it through (Prov 19:11; 1 Pet 4:8). If it was a serious betrayal, abuse or a sign of a dangerous pattern, stepping away can be wise and right.",
    "refs": ["Prov 19:11", "1 Pet 4:8", "Prov 17:9", "Ps 55:12-14"]
  },
  {
    "id": "refusing-all-help",
    "behaviour": "Refusing all help because you don’t want to owe anyone",
    "answer": "ego",
    "why": "Self-sufficiency can look strong but often hides pride or fear of vulnerability. We were made for mutual care; Jesus let others wash, feed and carry burdens for him (Luke 7:36-38; Luke 8:3; Mark 15:21).",
    "refs": ["Gal 6:2", "Eccl 4:9-10", "Luke 8:3", "John 13:8"]
  },
  {
    "id": "reporting-leader",
    "behaviour": "Reporting a respected leader’s abuse, even though people may be upset",
    "answer": "self-respect",
    "why": "Telling the truth to protect yourself and others is courageous love, not rebellion or slander. Scripture calls us to expose deeds of darkness and to speak up for those who cannot (Eph 5:11; Prov 31:8-9).",
    "refs": ["Eph 5:11", "Prov 31:8-9", "1 Tim 5:19-20", "Ezek 34:2-10"]
  },
  {
    "id": "withholding-to-punish",
    "behaviour": "Withholding forgiveness to make them suffer",
    "answer": "ego",
    "why": "Keeping someone in your debt so you can keep power over them is revenge in slow motion. Boundaries protect; using unforgiveness as punishment takes the place of God (Rom 12:19).",
    "refs": ["Rom 12:17-19", "Matt 18:32-35", "Heb 12:15", "Eph 4:31-32"]
  },
  {
    "id": "skip-gathering",
    "behaviour": "Not attending a family event where the person who abused you will be",
    "answer": "self-respect",
    "why": "Protecting yourself from someone who has harmed you is wise, and you do not owe anyone your presence near danger. You can still love your family and explain your reasons as much as is safe.",
    "refs": ["Prov 22:3", "Prov 4:23", "Matt 10:16", "Ps 26:4-5"]
  },
  {
    "id": "correcting-public-lie",
    "behaviour": "Publicly correcting someone who misrepresented you",
    "answer": "depends",
    "why": "Correcting a false story can protect your work, your family or the truth, as Paul did when his ministry was slandered (2 Cor 10–12). But if it is mainly about winning or humiliating them, quieter routes are usually better (Prov 26:4-5 shows both sides).",
    "refs": ["2 Cor 10:10-12", "Acts 25:8-11", "Prov 26:4-5", "Matt 5:11-12"]
  },
  {
    "id": "admit-i-was-right",
    "behaviour": "Demanding they admit you were right about everything",
    "answer": "ego",
    "why": "Acknowledgment of real harm is a fair need; total surrender to your version of every detail is not. Few conflicts have one side that was entirely right, and humility leaves room for that (Jas 3:2).",
    "refs": ["Jas 3:2", "Prov 18:17", "Rom 12:3", "Phil 2:3"]
  },
  {
    "id": "pause-before-reply",
    "behaviour": "Taking time before replying to a hurtful message",
    "answer": "self-respect",
    "why": "A pause lets your body settle and your words come from wisdom rather than reactivity. “let every man be swift to hear, slow to speak, slow to wrath” (Jas 1:19, KJV).",
    "refs": ["Jas 1:19-20", "Prov 15:28", "Prov 29:11", "Ps 4:4"]
  },
  {
    "id": "keeping-a-list",
    "behaviour": "Keeping a running list of their past wrongs to use in future arguments",
    "answer": "ego",
    "why": "Love “takes no account of evil” (1 Cor 13:5), meaning it does not keep a ledger to win later. Note the difference: keeping a factual record of abuse for safety or legal reasons is wise, not unloving.",
    "refs": ["1 Cor 13:5", "Prov 17:9", "Ps 130:3-4", "Col 3:13"]
  }
];

RG.fgHonor = [
  {
    "id": "never-question-pastor",
    "looksLike": "Never questioning your pastor or leaders",
    "actually": "Enabling unaccountable power, and leaving leaders alone with their blind spots.",
    "true": "True honour respects leaders and also tests teaching and holds leaders to account, as the Bereans checked even Paul against Scripture (Acts 17:11) and Paul gave rules for correcting elders (1 Tim 5:19-20).",
    "refs": ["Acts 17:11", "1 Tim 5:17-20", "Gal 2:11-14", "Heb 13:17", "1 Thess 5:12-13, 21"]
  },
  {
    "id": "silence-for-parents",
    "looksLike": "Keeping quiet about a parent’s abuse to “honour your father and mother”",
    "actually": "Silence that protects the harm and leaves the wounded (and often siblings or grandchildren) unprotected.",
    "true": "True honour tells the truth, gets help, and protects the vulnerable, while still treating the parent as a person of worth. The same Scripture that says “honour” tells parents not to provoke or crush their children (Eph 6:1-4; Col 3:21).",
    "refs": ["Exod 20:12", "Eph 6:1-4", "Col 3:21", "Eph 5:11", "Prov 31:8-9"]
  },
  {
    "id": "constant-praise",
    "looksLike": "Constantly praising a leader or a friend and never disagreeing",
    "actually": "Flattery, which feeds pride and spreads a net for the person’s feet (Prov 29:5).",
    "true": "True honour gives sincere encouragement and honest feedback. “Faithful are the wounds of a friend” (Prov 27:6).",
    "refs": ["Prov 29:5", "Prov 27:5-6", "Prov 28:23", "Rom 12:9-10", "Eph 4:15"]
  },
  {
    "id": "yes-to-every-demand",
    "looksLike": "Saying yes to every demand of ageing parents or relatives, whatever it costs your health or marriage",
    "actually": "Self-neglect, and often the neglect of your spouse and children too.",
    "true": "True honour provides real care and respect with sustainable limits, shares the load with others, and keeps the marriage bond first (Gen 2:24). Even Jesus rested and withdrew (Mark 6:31).",
    "refs": ["1 Tim 5:4, 8", "Gen 2:24", "Mark 6:31", "Exod 18:17-23", "Gal 6:2, 5"]
  },
  {
    "id": "covering-addiction",
    "looksLike": "Covering for a spouse’s or friend’s addiction to protect their reputation",
    "actually": "Enabling: shielding them from the consequences that could wake them up.",
    "true": "True honour speaks the truth in love, refuses to lie for them, and helps them find treatment and accountability. Restoring someone gently (Gal 6:1) starts with naming the problem.",
    "refs": ["Gal 6:1-2", "Prov 19:19", "Eph 4:15, 25", "Jas 5:19-20"]
  },
  {
    "id": "protecting-reputation",
    "looksLike": "Protecting the church’s or family’s good name by handling abuse “quietly”",
    "actually": "Valuing an institution’s image over people, which repeats the harm and often enables more victims.",
    "true": "True honour follows Christ, who sided with the little ones and warned those who cause them to stumble (Matt 18:6). It reports, cares for survivors, and lets the light in (John 3:20-21).",
    "refs": ["Matt 18:6", "Matt 23:27-28", "John 3:20-21", "Ezek 34:4", "Luke 12:2-3"]
  },
  {
    "id": "instant-restoration",
    "looksLike": "Forgiving a fallen leader and putting them straight back in the pulpit",
    "actually": "Cheap grace that confuses forgiveness with restoration to a role, and can expose others to harm.",
    "true": "True honour forgives the person and cares for their healing, while treating return to leadership as a separate question about character, time and qualification (1 Tim 3:2-7). Restoration of a person is not automatic restoration of a platform.",
    "refs": ["1 Tim 3:1-7", "Gal 6:1", "1 Tim 5:22", "Titus 1:6-9", "John 21:15-17"]
  },
  {
    "id": "peace-at-any-price",
    "looksLike": "Agreeing with everyone to keep the peace",
    "actually": "People-pleasing and peacekeeping that buries problems instead of resolving them.",
    "true": "True honour is peacemaking (Matt 5:9): naming issues kindly and working toward real peace. Paul says, “if I were still pleasing men, I wouldn’t be a servant of Christ” (Gal 1:10).",
    "refs": ["Matt 5:9", "Gal 1:10", "Jer 6:14", "Eph 4:15", "Jas 3:17-18"]
  },
  {
    "id": "laughing-along",
    "looksLike": "Laughing along with a boss’s demeaning jokes to show respect",
    "actually": "Compliance and complicity that teaches everyone the behaviour is acceptable.",
    "true": "True honour respects authority and still declines to join in what demeans people, calmly and without self-righteousness (Eph 5:4). Respecting a role never requires taking part in wrong.",
    "refs": ["Eph 5:3-4", "Col 4:6", "1 Pet 2:17", "Acts 5:29", "Prov 26:18-19"]
  },
  {
    "id": "silent-endurance",
    "looksLike": "Bearing every mistreatment silently, as “turning the other cheek”",
    "actually": "Passivity that leaves harm unchallenged and can teach a person they have no worth.",
    "true": "True honour refuses revenge but not truth. When struck, Jesus asked, “If I have spoken evil, testify of the evil; but if well, why do you beat me?” (John 18:23), and Paul insisted on his rights as a citizen (Acts 16:37). Readings of Matt 5:39 differ; none of them require staying in abuse.",
    "refs": ["Matt 5:38-42", "John 18:22-23", "Acts 16:35-39", "Acts 22:25", "Rom 12:17-21"]
  },
  {
    "id": "submission-as-control",
    "looksLike": "Obeying a controlling spouse as “biblical submission”",
    "actually": "Coercion dressed in Bible verses, which twists submission into domination.",
    "true": "Christians debate how to apply Eph 5 (complementarian and egalitarian readings), but both sides agree it never mandates enduring abuse. Paul frames everything with “subjecting yourselves to one another” (Eph 5:21) and with a love that gives itself up, like Christ’s (Eph 5:25).",
    "refs": ["Eph 5:21-33", "Col 3:19", "1 Pet 3:7", "Mark 10:42-45", "1 Cor 13:4-7"]
  },
  {
    "id": "taking-all-blame",
    "looksLike": "Taking all the blame so someone else stays calm",
    "actually": "Self-erasure and dishonesty that protects the other person from facing themselves.",
    "true": "True honour owns your real part and no more, and lets others carry their own load (Gal 6:5). Truth-telling honours both of you: “speak truth each one with his neighbor” (Eph 4:25).",
    "refs": ["Gal 6:4-5", "Eph 4:25", "Ezek 18:20", "Prov 12:17", "Matt 7:3-5"]
  }
];

RG.fgAbuse = {
  "types": [
    {
      "id": "physical",
      "type": "Physical",
      "self": "Harming your own body on purpose (cutting, hitting, burning), driving yourself to exhaustion, starving or punishing your body, or ignoring serious health needs as if your body does not matter. Scripture calls the body a temple of the Holy Spirit (1 Cor 6:19), cared for, not punished.",
      "others": "Hitting, pushing, grabbing, choking, restraining, throwing things, using weapons or threats of violence, blocking someone from leaving, or harming children or pets. Any use of force or the threat of it to control someone is abuse.",
      "fromOthers": "You are hurt, held, blocked or threatened with violence; you are afraid of what will happen if you disagree; you hide injuries or make excuses for them; you are stopped from eating, sleeping, taking medication or getting medical help."
    },
    {
      "id": "emotional",
      "type": "Emotional / psychological",
      "self": "A constant inner voice of contempt (“I’m worthless”, “I ruin everything”), refusing yourself any rest or kindness, or isolating yourself as punishment. In Christ you are beloved and not condemned (Rom 8:1); you can learn to speak to yourself as he speaks to you.",
      "others": "Controlling, isolating, frightening or humiliating someone: jealousy and possessiveness, monitoring where they go and who they talk to, gaslighting (making them doubt their memory or sanity), threats, giving the silent treatment to punish, and blaming them for your behaviour.",
      "fromOthers": "You feel you are walking on eggshells; you doubt your own memory because they insist things did not happen; you have been cut off from friends or family; you are blamed for their anger; you are told you are lucky anyone puts up with you."
    },
    {
      "id": "verbal",
      "type": "Verbal",
      "self": "Talking to yourself with insults and curses you would never say to a friend, or regularly calling yourself stupid, ugly or a failure. Words shape us (Prov 18:21), including the ones we say inwardly.",
      "others": "Name-calling, yelling, insults, mocking, constant criticism, put-downs “as a joke”, swearing at someone, or threatening them. Scripture warns against words that tear down rather than build up (Eph 4:29; Jas 3:8-10).",
      "fromOthers": "You are regularly insulted, shouted at or mocked, often in front of others; you are told you are too sensitive when you object; you have started to believe the names you are called."
    },
    {
      "id": "spiritual",
      "type": "Spiritual",
      "self": "Using religion to crush yourself: believing God despises you, punishing yourself to earn forgiveness, or refusing grace because you feel too bad to receive it. The gospel is that God has come to you in Christ, not that you must climb to him.",
      "others": "Using God, the Bible or religious authority to control, shame or silence people: demanding unquestioning obedience, threatening God’s punishment for disagreeing, using verses to justify abuse, ridiculing someone’s beliefs, or stopping them practising their faith.",
      "fromOthers": "You are told that questioning a leader is questioning God; you are shamed with Scripture into staying quiet or submitting to harm; you fear spiritual punishment for leaving; your faith is mocked or controlled by a partner or leader."
    },
    {
      "id": "sexual",
      "type": "Sexual",
      "self": "Using your body in ways that harm you because you believe you are only worth what others take, or putting yourself in sexually unsafe situations out of self-contempt. Your body and your consent belong to you and are precious to God.",
      "others": "Any sexual act without free, informed consent: forcing, pressuring, guilting or manipulating someone into sex, sexual contact with children, sharing intimate images without consent, sexual insults, or reproductive coercion such as sabotaging birth control.",
      "fromOthers": "You feel you cannot say no, or that saying no has consequences; you are pressured, guilted or forced into sexual acts; you are told you owe sex; images of you are shared or threatened to be shared. Marriage never removes the right to say no."
    },
    {
      "id": "financial",
      "type": "Financial",
      "self": "Reckless spending, gambling or debt that harms you and those who depend on you, or refusing to spend anything on your own basic needs because you feel you do not deserve it.",
      "others": "Controlling someone’s money to control them: taking their wages, giving an allowance and demanding receipts, hiding accounts, running up debt in their name, stopping them from working, or refusing money for necessities.",
      "fromOthers": "You have no access to money or bank accounts; you must justify every purchase; your pay goes where you cannot reach it; you are prevented from working or forced into work; debts appear in your name without your consent."
    },
    {
      "id": "digital",
      "type": "Digital / technology",
      "self": "Doom-scrolling or compulsive comparison that steadily feeds self-hatred, or keeping yourself always available to someone who uses your phone to control you.",
      "others": "Using technology to bully, monitor, stalk or control: tracking someone’s location or phone, demanding passwords, constant checking texts, threatening or insulting messages, posting humiliating content, creating fake profiles, or pressuring someone to send explicit images.",
      "fromOthers": "Your partner checks your phone or demands passwords; you are tracked or watched through apps or devices; you receive threatening messages; you feel you cannot switch off your phone for fear of their reaction; intimate images are used against you."
    },
    {
      "id": "neglect",
      "type": "Neglect",
      "self": "Persistently ignoring your own basic needs (food, sleep, hygiene, medical care, rest, friendship) as if you do not matter. Caring for yourself is stewardship, not selfishness (Eph 5:29).",
      "others": "Failing to provide the care someone depends on you for: food, shelter, safety, medical care, supervision or emotional warmth for children, elderly relatives or people with disabilities. Scripture is blunt about providing for one’s household (1 Tim 5:8).",
      "fromOthers": "As a child or a dependent adult, your basic needs were or are not met; you are left alone, unsafe or without medical care; nobody responds to your distress. Neglect often leaves invisible wounds that are just as real as visible ones."
    }
  ],
  "note": "If you are in immediate danger, call your local emergency number (for example 911 in the US, 999 in the UK, 112 in much of the EU). In the US, the National Domestic Violence Hotline is available 24/7 at 1-800-799-7233 (or text START to 88788), and the 988 Suicide and Crisis Lifeline can be reached by calling or texting 988; most countries have similar domestic abuse and crisis lines, which a quick search or your doctor can help you find. If you are worried your devices are monitored, use a safer phone or computer. This list is general information, not a diagnosis; a counsellor, advocate or doctor can help you understand your situation. Children and vulnerable adults should be reported to the police or child-protection services.",
  "source": "The National Domestic Violence Hotline (US), “Types of Abuse”: abuse as a pattern of behaviours used to gain or maintain power and control, with physical, emotional (including verbal), sexual, financial, technology-facilitated and spiritual abuse. The “self” column and the neglect row are general descriptions added here, not from that page.",
  "url": "https://www.thehotline.org/resources/types-of-abuse/"
};

RG.fgDavid = [
  {
    "id": "bathsheba",
    "ref": "2 Sam 11:1-5",
    "event": "David stays home from war and takes Bathsheba",
    "kind": "sin",
    "note": "The king sees, sends, takes; the verbs are all his, and Bathsheba, summoned by the most powerful man in the land, is given no voice. Many scholars now read this as an abuse of royal power rather than a mutual affair.",
    "lesson": "Power changes the moral weight of what happens; when the powerful “take”, the one taken is not to blame."
  },
  {
    "id": "uriah",
    "ref": "2 Sam 11:6-27",
    "event": "The cover-up and the killing of Uriah",
    "kind": "sin",
    "note": "When Bathsheba is pregnant, David tries to make her husband Uriah sleep at home, and when that fails, sends him back carrying the letter that arranges his death. “But the thing that David had done displeased the LORD” (11:27, KJV).",
    "lesson": "Cover-ups rarely stay small: each step to hide a wrong tends to require a worse one."
  },
  {
    "id": "nathan",
    "ref": "2 Sam 12:1-12",
    "event": "Nathan’s parable: “Thou art the man”",
    "kind": "consequence",
    "note": "God sends a prophet who tells a story about a rich man stealing a poor man’s only lamb, and David condemns himself before he realises it. Nathan names the sin and announces that “the sword shall never depart from thine house” (12:10, KJV).",
    "lesson": "God loves wrongdoers enough to send truth-tellers, and a story can open a heart that an accusation would close."
  },
  {
    "id": "i-have-sinned",
    "ref": "2 Sam 12:13",
    "event": "“I have sinned against the LORD” / “The LORD also hath put away thy sin”",
    "kind": "forgiveness",
    "note": "David confesses without excuses, and Nathan immediately declares God’s forgiveness: “thou shalt not die” (KJV). Forgiveness comes at once, yet the next verses show that the consequences in the family do not vanish.",
    "lesson": "Forgiveness and consequences are both real: God’s mercy is immediate, but the harm already set in motion still has to be faced."
  },
  {
    "id": "psalm-51",
    "ref": "Ps 51",
    "event": "Psalm 51: “Create in me a clean heart, O God”",
    "kind": "forgiveness",
    "note": "The psalm’s heading links it to Nathan’s visit (headings are ancient but debated as to authorship). It pleads for mercy, cleansing and a renewed spirit, trusting God’s “lovingkindness” (51:1) more than sacrifices (51:16-17).",
    "lesson": "Repentance is about a renewed heart, not about earning God’s favour; God does not despise “a broken and a contrite heart” (51:17)."
  },
  {
    "id": "the-child",
    "ref": "2 Sam 12:14-23",
    "event": "The child dies",
    "kind": "consequence",
    "note": "This is one of the hardest texts in Scripture, and readers wrestle with it: traditional readings see God’s judgment; many relational readers struggle to square it with Christ and see the narrator’s theology alongside the tragedy of sin’s fallout. David fasts and weeps, then worships, and says, “I shall go to him” (12:23, KJV).",
    "lesson": "Hard texts should be read honestly and slowly, without forcing quick answers; grief and worship can sit side by side."
  },
  {
    "id": "solomon-jedidiah",
    "ref": "2 Sam 12:24-25",
    "event": "Solomon is born, and God names him Jedidiah",
    "kind": "mercy",
    "note": "David comforts Bathsheba, and their son Solomon is born. Through Nathan, God names him Jedidiah, “because of the LORD” (12:25, KJV), a name meaning “beloved of the LORD”: grace growing from the ruins.",
    "lesson": "Grace can name someone “beloved” in the middle of a story of failure."
  },
  {
    "id": "amnon-tamar",
    "ref": "2 Sam 13:1-22",
    "event": "Amnon rapes his half-sister Tamar",
    "kind": "sin",
    "note": "Tamar speaks clearly and is not heard, and afterwards she lives “desolate” (13:20). David “was very wroth” (13:21, KJV) but does nothing, a father’s silence that leaves a victim unprotected and the family wound open.",
    "lesson": "Anger without action is not justice; a leader’s silence can be a second wound for the victim."
  },
  {
    "id": "absalom-kills-amnon",
    "ref": "2 Sam 13:23-39",
    "event": "Absalom kills Amnon",
    "kind": "consequence",
    "note": "Two years later, Tamar’s full brother Absalom takes revenge and has Amnon murdered at a feast, then flees. Injustice left unaddressed by those with authority often turns into private vengeance.",
    "lesson": "When justice is denied, revenge often fills the gap; this is why Scripture tells us to leave vengeance to God and to just authorities (Rom 12:19; 13:4)."
  },
  {
    "id": "absalom-returns",
    "ref": "2 Sam 14:1-33",
    "event": "Absalom returns, but without real reconciliation",
    "kind": "consequence",
    "note": "Joab engineers Absalom’s return, but David says “let him not see my face” (14:24, KJV), and for two years they do not meet. A token kiss follows (14:33), but nothing is named or repaired, and the distance hardens into rebellion.",
    "lesson": "Bringing someone back without naming the harm or repairing it is not reconciliation; it only postpones the conflict."
  },
  {
    "id": "absalom-revolt",
    "ref": "2 Sam 15–17",
    "event": "Absalom’s revolt",
    "kind": "consequence",
    "note": "Absalom steals the people’s hearts (15:6) and seizes Jerusalem, and David flees barefoot and weeping up the Mount of Olives (15:30). Absalom’s public act with David’s concubines (16:21-22) echoes Nathan’s warning (12:11-12), and harms more people who had no voice.",
    "lesson": "Unhealed family wounds can spill into public life and hurt many others."
  },
  {
    "id": "absalom-death",
    "ref": "2 Sam 18:1-33",
    "event": "Absalom’s death: “O my son Absalom”",
    "kind": "consequence",
    "note": "Despite David’s order to “deal gently” with him (18:5), Joab kills Absalom. David’s grief is one of the most piercing cries in Scripture: “would God I had died for thee, O Absalom, my son, my son!” (18:33, KJV).",
    "lesson": "Love and grief remain, even after terrible choices; David’s cry shows a father’s heart that never stopped caring."
  },
  {
    "id": "adonijah-solomon",
    "ref": "1 Kings 1:1–2:12",
    "event": "Adonijah’s bid and Solomon on the throne",
    "kind": "mercy",
    "note": "Another son, Adonijah, grasps for the crown, and the text notes that his father “had not displeased him at any time” by asking what he was doing (1 Kings 1:6, KJV). Bathsheba and Nathan intervene, and Solomon, the son of the very marriage born in sin, becomes king (1 Kings 1:39; 2:12).",
    "lesson": "Never saying “why have you done this?” to a child is not kindness; love includes correction."
  },
  {
    "id": "matthew-genealogy",
    "ref": "Matt 1:6",
    "event": "In Jesus’ family tree: “her that had been the wife of Urias”",
    "kind": "mercy",
    "note": "Matthew does not hide the story; he names Uriah, remembering the man who was wronged (KJV). The line of the Messiah runs through this broken history, showing that grace does not erase the truth but redeems it.",
    "lesson": "The gospel does not hide the truth of what happened; it tells it, and then shows that God can still bring redemption."
  }
];

RG.fgApology = [
  {
    "id": "acknowledge-responsibility",
    "part": "Acknowledgment of responsibility",
    "rank": "Most important in the study",
    "text": "Say clearly that it was your fault, without shifting blame, minimising or hiding behind “mistakes were made”. In Lewicki’s study this was the single most important element.",
    "example": "“I was wrong. I lied to you about the money, and that was my choice, not yours.”",
    "refs": ["2 Sam 12:13", "Ps 51:3-4", "Luke 15:18-19", "Prov 28:13"]
  },
  {
    "id": "offer-repair",
    "part": "Offer of repair",
    "rank": "Second most important",
    "text": "Commit to action that undoes or limits the damage, rather than words alone. The researchers note that talk is cheap, and an offer to fix what is wrong shows you are serious.",
    "example": "“I will pay back every dollar by the end of March, and I’ve set up an automatic transfer so you don’t have to chase me.”",
    "refs": ["Luke 19:8", "Lev 6:4-5", "Num 5:7", "1 John 3:18"]
  },
  {
    "id": "expression-of-regret",
    "part": "Expression of regret",
    "rank": "Joint third",
    "text": "Say that you are sorry and that you regret what you did and the pain it caused. Regret focuses on the other person’s hurt, not on how bad you feel about being caught.",
    "example": "“I am truly sorry. I can see how much this has hurt you and shaken your trust.”",
    "refs": ["2 Cor 7:10", "Ps 38:18", "Joel 2:12-13"]
  },
  {
    "id": "explanation",
    "part": "Explanation of what went wrong",
    "rank": "Joint third",
    "text": "Briefly explain how it happened, so the other person can make sense of it, without turning the explanation into an excuse. If you notice “but” creeping in, stop and go back to responsibility.",
    "example": "“I was ashamed about my debts and hid them instead of telling you. That doesn’t excuse it; it’s just how I got there.”",
    "refs": ["Gen 3:12-13", "Prov 18:17", "Jas 1:14-15"]
  },
  {
    "id": "declaration-of-repentance",
    "part": "Declaration of repentance",
    "rank": "Joint third",
    "text": "Say what will be different and how, so the apology points forward. Repentance (Greek <em>metanoia</em>, a change of mind and direction) is proved over time, but naming it gives the other person something to watch for.",
    "example": "“I’ve started seeing a financial counsellor, and I’ll show you our statements every month for as long as you want.”",
    "refs": ["Matt 3:8", "Acts 26:20", "2 Cor 7:11", "Eph 4:28"]
  },
  {
    "id": "request-for-forgiveness",
    "part": "Request for forgiveness",
    "rank": "Least important; can be left out",
    "text": "You may ask to be forgiven, gently and once, without pressure or a deadline. In the study this was the weakest element (Lewicki: “That’s the one you can leave out if you have to”), and in situations of serious harm it is often wiser to leave the other person completely free.",
    "example": "“If and when you are ever ready, I would be grateful for your forgiveness, but I understand if you are not, and I’m not asking you to decide now.”",
    "refs": ["Luke 15:19", "Phlm 17-18", "Rom 12:18"]
  }
];

RG.fgModels = [
  {
    "id": "reach",
    "name": "REACH Forgiveness",
    "source": "Everett L. Worthington Jr. (clinical psychologist, Virginia Commonwealth University)",
    "steps": [
      "<strong>R</strong>ecall the hurt: face that you were hurt, without being nasty, treating yourself as a victim, or treating the other person as a monster.",
      "<strong>E</strong>mpathize: imagine the other person’s point of view (Worthington suggests an empty-chair exercise); if empathy is impossible, sympathy or compassion still help.",
      "<strong>A</strong>ltruistic gift: give forgiveness as an unselfish gift, remembering times you were forgiven.",
      "<strong>C</strong>ommit: write or tell someone that you have forgiven, to make it last.",
      "<strong>H</strong>old on to forgiveness: when doubts and memories return, go back to your commitment."
    ],
    "note": "Research, not Scripture. Worthington also distinguishes a decision not to seek revenge from a slower emotional change. A large five-country study of the REACH workbook reported reduced depression and anxiety, though at the time of press coverage it had not yet been peer-reviewed. REACH is about forgiving, not about reconciling or trusting again.",
    "url": "https://www.evworthington-forgiveness.com/reach-forgiveness-of-others"
  },
  {
    "id": "enright",
    "name": "Process Model of Forgiveness",
    "source": "Robert D. Enright and colleagues (University of Wisconsin–Madison; International Forgiveness Institute)",
    "steps": [
      "Uncovering phase: face the anger, shame, rumination and changed view of the world caused by the injury.",
      "Decision phase: see that old strategies are not working, become willing to consider forgiveness, and commit to forgive.",
      "Work phase: see the wrongdoer as more than the offence, grow in empathy and compassion, bear the pain, and give a “moral gift”.",
      "Deepening phase: find meaning, remember your own need for forgiveness, realise you are not alone, and notice negative emotions easing."
    ],
    "note": "Research and therapy, not Scripture. The model has 20 units in four phases and is meant to be used flexibly, at each person’s pace. It treats forgiveness as possible without the offender’s repentance and as separate from reconciliation, which needs two people and signs of change. Critics warn it can pressure victims, and that fear and safety may need attention before forgiveness work.",
    "url": "https://archive.ncca.org.au/files/Departments/Safe_as_Churches/Forgiving_the_Unforgivable.pdf"
  },
  {
    "id": "restorative-justice",
    "name": "Restorative justice principles",
    "source": "Howard Zehr, “Restorative Justice in Threes” (2009); The Little Book of Restorative Justice (2002)",
    "steps": [
      "Harm: when people and relationships are harmed, needs are created.",
      "Obligation: the needs created by harm lead to obligations to heal and “put right” the harm.",
      "Engagement: involve those affected (those harmed, those who caused harm, and the community) in the resolution.",
      "Ask three questions: Who has been hurt? What are their needs? Who has the obligation to address them? (instead of only: What rules were broken? Who did it? What do they deserve?)",
      "Hold the values of respect, responsibility and relationship."
    ],
    "note": "A justice framework, not Scripture, though Zehr’s handout names the aspiration to live in right relationship with one another, with creation and with the Creator. It fits the relational reading of biblical justice as setting things right (see Christopher Marshall’s <em>Beyond Retribution</em>). It complements, not replaces, the courts in serious crime.",
    "url": "https://www.uab.edu/cas/news/images/documents/Restorative-Justice-in-Threes.pdf"
  },
  {
    "id": "shame-guilt",
    "name": "Shame vs guilt",
    "source": "Brené Brown (research professor, University of Houston), “Shame vs. Guilt” and <em>Daring Greatly</em> (2012)",
    "steps": [
      "Guilt: “holding something we’ve done or failed to do up against our values and feeling psychological discomfort” (Brown’s words); it focuses on behaviour.",
      "Shame: “the intensely painful feeling or experience of believing that we are flawed and therefore unworthy of love and belonging” (Brown’s words); it focuses on the self.",
      "Guilt tends to motivate repair; Brown argues shame is more likely to drive hiding and destructive behaviour.",
      "For change, move away from shaming and labelling, and toward owning behaviour."
    ],
    "note": "Research, not Scripture. This is often summed up as “guilt: I did something bad; shame: I am bad”. It matches the gospel picture of a beloved child who can face sin without fear of rejection (Rom 8:1; 1 John 4:18). Some researchers define shame differently, so treat it as one useful lens.",
    "url": "https://brenebrown.com/articles/2013/01/15/shame-v-guilt/"
  },
  {
    "id": "matthew-18",
    "name": "A pastoral model: the Matthew 18 process and peacemaking",
    "source": "Matthew 18:15-17 (WEB); Peacemaker Ministries, “The Peacemaker Pledge” (Ken Sande)",
    "steps": [
      "Go privately: “go, show him his fault between you and him alone. If he listens to you, you have gained back your brother” (Matt 18:15).",
      "Take one or two others: wise witnesses who can help (Matt 18:16; Deut 19:15).",
      "Tell it to the assembly (the church) if they still refuse to listen (Matt 18:17).",
      "If they still refuse, treat them “as a Gentile or a tax collector” (Matt 18:17), which many note is how Jesus treated outsiders: with distance from their influence, yet still with love and invitation.",
      "Peacemaker principles: glorify God, get the log out of your own eye, gently restore, go and be reconciled."
    ],
    "note": "Scripture plus pastoral practice. Matthew 18 was given for ordinary sin between members of a community, not as a requirement for victims of abuse or crime to confront their abuser privately; in abuse or crime, safety and reporting come first, and leaders who misuse power are addressed openly (1 Tim 5:19-20). The same chapter warns of harming “little ones” (18:6) and ends with the parable of the unforgiving servant (18:21-35).",
    "url": "https://www.biblegateway.com/passage/?search=Matthew+18%3A15-17&version=WEB"
  }
];

RG.fgEvidence3 = [
  {
    "text": "Lewicki and colleagues tested how 755 people reacted to apologies containing one to six elements: expression of regret, explanation of what went wrong, acknowledgment of responsibility, declaration of repentance, offer of repair, and request for forgiveness. “The most important component is an acknowledgment of responsibility.”",
    "source": "Ohio State News, “The 6 elements of an effective apology, according to science” (12 April 2016), on Lewicki, Polin and Lount, Negotiation and Conflict Management Research (May 2016)",
    "url": "https://news.osu.edu/the-6-elements-of-an-effective-apology-according-to-science/"
  },
  {
    "text": "The second most important element was an offer of repair; a request for forgiveness was the least effective. Lewicki: “That’s the one you can leave out if you have to.”",
    "source": "Ohio State News, “The 6 elements of an effective apology, according to science” (2016)",
    "url": "https://news.osu.edu/the-6-elements-of-an-effective-apology-according-to-science/"
  },
  {
    "text": "REACH: Recall the hurt; Empathize; Altruistic gift; Commit; Hold onto forgiveness. On Recall: “Make up your mind not to be snarky (i.e., nasty and hurtful), not to treat yourself like a victim, and not to treat the other person as a jerk.”",
    "source": "Everett L. Worthington Jr., “REACH Forgiveness of Others”",
    "url": "https://www.evworthington-forgiveness.com/reach-forgiveness-of-others"
  },
  {
    "text": "Worthington’s study included more than 4,500 participants from five countries; those who completed the REACH workbook had fewer symptoms of depression and anxiety after two weeks. The coverage notes the research had not yet been peer-reviewed. Worthington: “No one deserves forgiveness because they hurt me.”",
    "source": "CNBC Make It, “Use these 5 steps to forgive others” (6 May 2023)",
    "url": "https://www.cnbc.com/2023/05/06/forgiveness-can-boost-happiness-improve-mental-health-how-to-start.html"
  },
  {
    "text": "Enright’s model has four phases (Uncovering, Decision, Work, Deepening) with 20 units. Forgiveness “does not require repentance from the offender”, is “viewed as separate from reconciliation”, while “reconciliation always involves at least two people”. Scholars define forgiveness as not forgetting, excusing, justifying or condoning.",
    "source": "Michael Proeve, “Forgiving the Unforgivable?”, plenary address, Safe as Churches IV, National Council of Churches in Australia (2009)",
    "url": "https://archive.ncca.org.au/files/Departments/Safe_as_Churches/Forgiving_the_Unforgivable.pdf"
  },
  {
    "text": "“While forgiveness of others is a Christian imperative, there is no time schedule for forgiveness. Pressure from other people to offer forgiveness quickly is not helpful and may be harmful.”",
    "source": "Michael Proeve, “Forgiving the Unforgivable?”, Safe as Churches IV (2009)",
    "url": "https://archive.ncca.org.au/files/Departments/Safe_as_Churches/Forgiving_the_Unforgivable.pdf"
  },
  {
    "text": "“When people and relationships are harmed, needs are created.” Restorative justice asks “Who has been hurt? What are their needs? Who has the obligation to address the needs…?” as opposed to “What rules were broken? Who did it? What do they deserve?”",
    "source": "Howard Zehr, “Restorative Justice in Threes” (May 2009)",
    "url": "https://www.uab.edu/cas/news/images/documents/Restorative-Justice-in-Threes.pdf"
  },
  {
    "text": "Guilt is “holding something we’ve done or failed to do up against our values and feeling psychological discomfort”; shame is “the intensely painful feeling or experience of believing that we are flawed and therefore unworthy of love and belonging.”",
    "source": "Brené Brown, “Shame vs. Guilt” (2013)",
    "url": "https://brenebrown.com/articles/2013/01/15/shame-v-guilt/"
  },
  {
    "text": "“Relationship abuse is a pattern of behaviors used to gain or maintain power and control over a partner.” The page describes physical, emotional, sexual, financial, technology-facilitated and spiritual abuse, and notes that spiritual abuse “is a form of emotional and psychological abuse”.",
    "source": "The National Domestic Violence Hotline, “Types of Abuse”",
    "url": "https://www.thehotline.org/resources/types-of-abuse/"
  },
  {
    "text": "“If your brother sins against you, go, show him his fault between you and him alone. If he listens to you, you have gained back your brother.”",
    "source": "Matthew 18:15, World English Bible",
    "url": "https://www.biblegateway.com/passage/?search=Matthew+18%3A15-17&version=WEB"
  },
  {
    "text": "Peacemaker principles: Glorify God; Get the Log Out of Your Eye (“confessing our sins to those we have wronged… and seeking to repair any harm we have caused”); Gently Restore; Go and Be Reconciled.",
    "source": "Peacemaker Ministries, “The Peacemaker Pledge”",
    "url": "https://www.statesvillechristian.org/editoruploads/files/peacemaker%20pledge(1).pdf"
  }
];
