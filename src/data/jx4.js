window.RG = window.RG || {};
var RG = window.RG;

/* =========================================================
   JUSTICE, CONFLICT & CALL-OUT CULTURE (round 18, part A), file 4:
   jx5D, jxScenes, jxHarass, jxRevenge, jxCases, jxEvidence4
   Scripture: World English Bible (WEB) or KJV, short quotations.
   Case studies are composites, not real people.
   ========================================================= */

/* ---------- The 5Ds of bystander intervention (Right To Be) ---------- */
RG.jx5D = [
  {
    id: "distract",
    label: "Distract",
    what: "Interrupt the harassment indirectly by turning attention away from it, without naming it or engaging the person causing harm. Right To Be, the organisation that teaches the 5Ds, calls Distraction a subtle and creative way simply to derail the incident.",
    when: "When speaking out openly might make the harasser escalate, or when you are shy, alone, or unsure how the person causing harm will react.",
    caution: "Keep your focus on the person being targeted, not the harasser. Do not argue, and do not put your body between people if there is any sign of a weapon or violence.",
    example: "On a bus, you sit beside the woman being leered at and say, “Hi! Sorry, do you know which stop is for the library?” and keep chatting until the man loses interest.",
    ref: "John 8:6 — “But Jesus stooped down, and wrote on the ground with his finger.” Faced with a crowd ready to stone a woman, Jesus first breaks the momentum."
  },
  {
    id: "delegate",
    label: "Delegate",
    what: "Ask someone else to help, ideally someone with more authority or a better position to act, such as a driver, a shop supervisor, security staff, a teacher or a manager. Tell them clearly what you see and what you would like them to do.",
    when: "When you do not feel safe acting yourself, when someone nearby has more power in that space, or when two people working together will be safer than one.",
    caution: "Right To Be advises checking with the person being harassed before calling the police on their behalf, because some people have good reason not to feel safe with police. If there is immediate danger to life, call emergency services.",
    example: "In a café you quietly tell the barista, “The man in the grey coat keeps grabbing that woman's arm. Could you go and ask if she is all right while I stay near her?”",
    ref: "Acts 23:16-17 — Paul's nephew hears of a plot to kill Paul, and Paul says, “Bring this young man to the commanding officer, for he has something to tell him.” Getting the information to someone with power saved a life."
  },
  {
    id: "document",
    label: "Document",
    what: "Record or take notes on what is happening so there is an accurate account if the person harmed wants one later. Note the time, place and what was said or done.",
    when: "Only when someone else is already helping the person being harassed and you yourself are safe; if no one is helping, use another of the Ds first.",
    caution: "Always ask the person who was harmed what they want done with your recording or notes, and never post it online without their consent; going viral can harm them again.",
    example: "While a colleague calmly walks a distressed student away from a shouting man, you film from a safe distance, then quietly ask the student, “I recorded that. Would you like me to send it to you?”",
    ref: "Deuteronomy 19:15 — “At the mouth of two witnesses, or at the mouth of three witnesses, shall a matter be established.” Careful witness is part of biblical justice."
  },
  {
    id: "delay",
    label: "Delay",
    what: "If you could not act in the moment, check in with the person afterwards, say you saw what happened, and say it was not okay. Even a few kind minutes can lessen the sense of isolation that harassment leaves behind.",
    when: "When the incident happened too fast to interrupt, or when every other option was unsafe; it can also follow any of the other Ds.",
    caution: "Let the person lead. Offer to sit with them, walk with them or help them report, but do not pressure them to do anything they do not want.",
    example: "After a man yells slurs at a teenager and gets off the train, you go over and say, “I saw that and it was wrong. Are you okay? Can I wait with you until your stop?”",
    ref: "Luke 10:34 — the Samaritan “came to him, and bound up his wounds, pouring on oil and wine.” He arrived after the attack, and still he stopped."
  },
  {
    id: "direct",
    label: "Direct",
    what: "Name the behaviour and tell the person causing harm to stop, briefly and firmly. Right To Be notes that this is the only one of the 5Ds that confronts the harasser, and so the riskiest.",
    when: "Only if you are physically safe, the person being harassed is physically safe, escalation seems unlikely, and the person targeted seems to want someone to speak up.",
    caution: "Keep it short (“That's not okay. Leave her alone.”) and do not get pulled into debate. If the harasser turns on you, turn your attention to the person harmed and move away together.",
    example: "At a barbecue, an uncle keeps making sexual comments to a young cousin. You say evenly, “That's inappropriate. Stop,” then ask your cousin to help you in the kitchen.",
    ref: "2 Samuel 12:7 — “Nathan said to David, ‘You are the man!’” Direct truth, spoken to someone with power, at the right time and in the right way."
  }
];

/* ---------- Scenarios: what would you do? ---------- */
RG.jxScenes = [
  {
    id: "street-harassment",
    scenario: "Walking home in the evening, you see a man following a young woman, making sexual comments as she speeds up and looks around nervously.",
    options: [
      { label: "Keep walking; it is not your business and she will probably be fine.", verdict: "wrong", why: "Looking away leaves her alone with the threat. Scripture calls this knowing the good and not doing it (James 4:17)." },
      { label: "Shout at the man, insult him and threaten to fight him.", verdict: "partial", why: "Your anger at injustice is right, but escalating can make the man more dangerous to both of you. Courage is good; recklessness is not love." },
      { label: "Catch up with her as if you know her (“Hey, there you are!”), walk with her to a busy, lit place, and ask if she wants help to call someone.", verdict: "right", why: "This is Distract followed by Delay: it interrupts the harassment, keeps the focus on her, and lowers the risk. It is wise, safe and caring." },
      { label: "Film the whole thing and post it online to shame him.", verdict: "wrong", why: "Filming without anyone helping her leaves her exposed, and posting without her consent can harm her again. Documentation is for her, not for the internet." }
    ],
    jesus: "Jesus stood beside a woman who was being publicly shamed, turned the crowd's attention, and then spoke to her as a person (John 8:1-11). Like the Samaritan, he crossed the road toward the one in danger (Luke 10:33).",
    refs: ["John 8:1-11", "Luke 10:25-37", "Proverbs 24:11-12", "James 4:17"]
  },
  {
    id: "colleague-harassed",
    scenario: "A colleague tells you that a senior manager keeps touching her and sending sexual messages, and she is afraid of losing her job if she complains.",
    options: [
      { label: "Believe her, tell her it is not her fault, help her write down dates and keep the messages, and offer to go with her to HR or to speak to an employment adviser.", verdict: "right", why: "This honours her, keeps the decision in her hands, and makes reporting more effective and safer. Standing with her turns your belief into action." },
      { label: "Advise her to keep quiet so she does not damage her career.", verdict: "wrong", why: "Silence protects the harasser and leaves her, and probably others, exposed. Wisdom counts the cost, but this counsel just surrenders to fear." },
      { label: "Report it to HR yourself straight away, without telling her.", verdict: "partial", why: "Reporting is good and sometimes required, but acting over her head can make her feel powerless again. Where possible, act with her consent; if someone is in danger, tell her what you must do and why." },
      { label: "Confront the manager in a team meeting.", verdict: "wrong", why: "Public confrontation can expose her without her consent and invite retaliation. It also bypasses the processes that can actually protect her." }
    ],
    jesus: "Scripture calls us to speak up for those who cannot speak for themselves (Proverbs 31:8-9), and Moses “stood up and helped” the women being driven off at the well (Exodus 2:17). Jesus treated women as people of full dignity in a culture that often did not.",
    refs: ["Proverbs 31:8-9", "Exodus 2:16-17", "Galatians 6:2", "Leviticus 19:16"]
  },
  {
    id: "friend-employer-underpaying",
    scenario: "Your friend owns a small business, and you discover that he pays his migrant workers well below the legal minimum and keeps their passports “for safekeeping”.",
    options: [
      { label: "Say nothing; he is your friend and it would ruin the friendship.", verdict: "wrong", why: "Loyalty that hides exploitation is not love for him or for the workers. The Bible says unpaid wages “cry out” to God (James 5:4)." },
      { label: "Post about him online so everyone knows what he is like.", verdict: "partial", why: "The wrong is real and must be named, but public shaming first rarely helps the workers and can push the abuse underground. It skips the steps that might bring real change." },
      { label: "Lecture him about hell and stop seeing him, but do nothing else.", verdict: "wrong", why: "Condemnation without action protects no one. The workers are still unpaid and without their documents." },
      { label: "Talk to him privately and plainly; tell him it is wrong and illegal, and that holding passports is a serious warning sign. If he will not change, report it to the labour authorities or an anti-trafficking organisation.", verdict: "right", why: "This follows Matthew 18:15: go to him first, honestly. But the workers' safety comes before the friendship, so it does not stop at a private word." }
    ],
    jesus: "Nathan went to King David privately and named his abuse of power (2 Samuel 12). Jeremiah warned the one “who uses his neighbor's service without wages” (Jeremiah 22:13). Love for a friend includes telling him the truth.",
    refs: ["Matthew 18:15-17", "James 5:4", "Jeremiah 22:3, 13", "2 Samuel 12:1-7"]
  },
  {
    id: "controlling-church-leader",
    scenario: "A pastor at your church publicly shames members who question him, tells people who leave that they are under a curse, and demands to approve members' relationships and jobs.",
    options: [
      { label: "Obey; God put him in charge, and questioning leaders is rebellion.", verdict: "wrong", why: "Jesus said of controlling leadership, “it shall not be so among you” (Matthew 20:26). Submission to God never means submission to abuse." },
      { label: "Write down what you have seen, speak with other trusted members, raise it with the elders or the wider denomination, and support people who have been hurt. If he refuses to change, it is right to leave and to warn others.", verdict: "right", why: "This names the wrong, protects the vulnerable, and uses proper accountability. It follows Matthew 18 and Ephesians 5:11 without gossip or revenge." },
      { label: "Leave quietly and never mention it to anyone.", verdict: "partial", why: "Leaving may be the right thing for your own safety. But silence can leave others trapped, so if it is safe, tell someone with oversight what happened." },
      { label: "Spread rumours about his private life to bring him down.", verdict: "wrong", why: "Rumours are not justice; they are another form of control. Truth must be told truthfully." }
    ],
    jesus: "Jesus confronted religious leaders who “bind heavy burdens” on others (Matthew 23:4), and Peter told elders not to lord it over the flock (1 Peter 5:3). Paul named Diotrephes, who loved to be first and threw people out of the church (3 John 9-10).",
    refs: ["Matthew 20:25-28", "Matthew 23:1-12", "1 Peter 5:2-3", "3 John 9-10", "Ephesians 5:11"]
  },
  {
    id: "teen-bullied-online",
    scenario: "Your 14-year-old niece shows you group chats where classmates mock her body, share an edited photo of her and tell her to kill herself.",
    options: [
      { label: "Tell her to toughen up and stay off her phone.", verdict: "wrong", why: "This blames her for being attacked and leaves her alone. Words like “kill yourself” are serious and can endanger her life." },
      { label: "Message the bullies yourself and threaten them.", verdict: "partial", why: "Your protectiveness is right, but an adult threatening children can escalate things and hurt her case. Channel that energy into proper reporting." },
      { label: "Tell her you are glad she told you and it is not her fault; screenshot the messages; tell her parents; report the posts to the platform and the school; watch her wellbeing closely and get urgent help if she talks about harming herself.", verdict: "right", why: "This protects her life first, keeps evidence, and brings in people with authority to stop it. It makes her feel safe, not ashamed." },
      { label: "Do nothing; schools never do anything anyway.", verdict: "wrong", why: "Cynicism is another way of looking away. Even if one system fails, others may not, and she needs to know someone is fighting for her." }
    ],
    jesus: "Jesus welcomed children and warned that anyone who causes “one of these little ones” to stumble would be better off with a millstone around his neck (Matthew 18:6). Psalm 82 commands us to rescue the weak.",
    refs: ["Matthew 18:1-6", "Psalm 82:3-4", "Proverbs 31:8-9"]
  },
  {
    id: "elderly-neighbour-exploited",
    scenario: "Your elderly neighbour, who has early dementia, tells you her nephew has “borrowed” her bank card; since then she cannot pay her bills and is frightened of him.",
    options: [
      { label: "Confront the nephew next time he visits and demand the card.", verdict: "partial", why: "You are right to want to act, but a confrontation could put her at greater risk once you leave. Abuse is safer to address through people with authority." },
      { label: "Assume it is a family matter and stay out of it.", verdict: "wrong", why: "Financial abuse of older people is abuse. Treating it as private is how it continues." },
      { label: "Help her pay a bill or two yourself and say nothing.", verdict: "wrong", why: "Kindness is good, but it does not stop the exploitation; it may simply fund it." },
      { label: "Listen calmly, write down what she tells you, and with her knowledge report it to her bank and to adult protective or social services; keep visiting so she is not isolated.", verdict: "right", why: "This uses the people who can actually protect her money and her safety. Staying close counters the isolation exploiters rely on." }
    ],
    jesus: "Scripture repeatedly names the widow and the vulnerable as God's special concern (Isaiah 1:17; James 1:27). Jesus condemned those who “devour widows' houses” (Mark 12:40).",
    refs: ["Isaiah 1:17", "Mark 12:38-40", "James 1:27", "Proverbs 22:22-23"]
  },
  {
    id: "harassed-by-neighbour",
    scenario: "For months a neighbour has shouted abuse at you, left rubbish at your door and filmed you coming and going, and it is getting worse.",
    options: [
      { label: "Keep a dated log with photos and video, tell people you trust, make your home and routes safer, state one clear boundary in writing, and report it to the police or the local authority.", verdict: "right", why: "This protects you and builds a record that authorities can act on. Setting boundaries and seeking protection are not unloving; they are wise." },
      { label: "Get back at him: dump rubbish at his door and film him too.", verdict: "wrong", why: "Retaliation feeds the cycle and can make you look like the aggressor. “Repay no one evil for evil” (Romans 12:17)." },
      { label: "Pray and quietly put up with it; turning the other cheek means accepting it.", verdict: "partial", why: "Praying for him is good, and refusing revenge is good. But Jesus' teaching does not forbid seeking protection; Paul used the law to defend himself (Acts 22:25)." },
      { label: "Move out immediately without telling anyone.", verdict: "partial", why: "Leaving can be wise if you are in danger. But without telling anyone or reporting, you lose support and protection." }
    ],
    jesus: "Jesus refused revenge, yet more than once he walked away from those who meant him harm (Luke 4:29-30). Nehemiah prayed and also posted a guard (Nehemiah 4:9). Romans 13:4 describes rightful authority as “a servant of God to you for good.”",
    refs: ["Romans 12:17-21", "Nehemiah 4:9", "Romans 13:1-4", "Acts 22:25", "Luke 4:29-30"]
  },
  {
    id: "wanting-revenge",
    scenario: "A former business partner lied about you, cheated you out of money and turned mutual friends against you. You know secrets about him that would ruin his marriage.",
    options: [
      { label: "Leak the secrets; he deserves to feel what you felt.", verdict: "wrong", why: "This makes you an instrument of harm to his family as well as to him. Revenge rarely satisfies for long and usually escalates." },
      { label: "Name the hurt honestly to God and trusted friends, refuse to use his secrets, seek legal advice about the money, correct the lies calmly where needed, and pray for him even while you keep a distance.", verdict: "right", why: "This pursues real justice and truth while handing vengeance to God. It protects you without turning you into him." },
      { label: "Pretend it never happened and act as if you are fine.", verdict: "partial", why: "Refusing revenge is right, but denying the wound is not forgiveness. Pain that is not grieved often comes back as bitterness." },
      { label: "Cut him off and tell everyone your side in detail.", verdict: "partial", why: "Distance may be necessary, and some people do need the truth. But a campaign to win everyone over can become revenge by another name." }
    ],
    jesus: "When Jesus was insulted he “didn't curse back” but “committed himself to him who judges righteously” (1 Peter 2:23). Romans 12:19 says, “Don't seek revenge yourselves… ‘Vengeance belongs to me; I will repay, says the Lord.’”",
    refs: ["Romans 12:17-21", "1 Peter 2:21-23", "Deuteronomy 32:35", "Matthew 5:38-48"]
  }
];

/* ---------- Responding to harassment against you ---------- */
RG.jxHarass = [
  {
    id: "get-safe",
    step: "Get safe first",
    text: "Your safety matters more than winning the argument or proving a point. Move away, go somewhere public, lock doors, block accounts, or change routes if you need to. If you are in immediate danger, contact emergency services.",
    ref: "Proverbs 27:12 — “A prudent man sees danger and takes refuge.”"
  },
  {
    id: "tell-someone",
    step: "Tell someone you trust",
    text: "Harassment thrives on isolation and shame, so break the silence early with a friend, family member, colleague or pastor. You do not have to prove anything to be believed by people who love you. It is not your fault.",
    ref: "Galatians 6:2 — “Bear one another's burdens, and so fulfill the law of Christ.”"
  },
  {
    id: "document",
    step: "Write it all down",
    text: "Keep a dated log of each incident: what happened, where, who saw it, and how it affected you. Save messages, emails, screenshots, photos and voicemails, and back them up somewhere the harasser cannot reach. Records turn “your word against theirs” into a pattern others can see.",
    ref: "Deuteronomy 19:15 — “At the mouth of two witnesses, or at the mouth of three witnesses, shall a matter be established.”"
  },
  {
    id: "set-boundaries",
    step: "Set clear boundaries",
    text: "If it is safe, tell the person once, clearly and briefly, that the behaviour is unwelcome and must stop; in writing is often best, and keep a copy. You do not owe them a debate or a relationship. Then hold the line by blocking, limiting contact and refusing to be drawn back in.",
    ref: "Matthew 5:37 — “But let your ‘Yes’ be ‘Yes’ and your ‘No’ be ‘No.’”"
  },
  {
    id: "report",
    step: "Report it",
    text: "Use the channels that exist to protect you: HR or management at work, the school, the platform's reporting tools online, the landlord or local authority for neighbours, and the police where there are threats, stalking, assault or other crimes. Reporting is not revenge; it is asking rightful authority to do its God-given job.",
    ref: "Romans 13:4 — “for he is a servant of God to you for good.”"
  },
  {
    id: "get-support",
    step: "Get ongoing support",
    text: "Harassment can affect sleep, health and confidence, so a counsellor or trauma-informed therapist can help you recover. Legal advice (from an employment lawyer, a legal aid service or an advocacy group) can show you options you did not know you had. Accepting help is strength, not weakness.",
    ref: "Proverbs 15:22 — “Where there is no counsel, plans fail; but in a multitude of counselors they are established.”"
  }
];

/* ---------- The revenge cycle and how the cross breaks it ---------- */
RG.jxRevenge = {
  cycle: [
    { id: "hurt", label: "Hurt", text: "Someone wrongs us: betrayal, humiliation, loss or injustice. The pain is real, and so is the wrong." },
    { id: "shame-powerlessness", label: "Shame and powerlessness", text: "The wound tells us we are small, foolish or worthless, and that we could not stop it. Powerlessness is often harder to bear than the original pain." },
    { id: "anger", label: "Anger", text: "Anger rises to restore a sense of strength and to say, “This was wrong.” Anger itself is not sin (Ephesians 4:26), but when it is not handled it starts to look for a target." },
    { id: "retaliation", label: "Retaliation", text: "We strike back to even the score, and for a moment it can feel good. Research on altruistic punishment (de Quervain et al., 2004) found that punishing a wrongdoer activates brain areas linked to reward, which may help explain why revenge is so tempting." },
    { id: "counter-retaliation", label: "Counter-retaliation", text: "The other side rarely sees our revenge as fair; they see a new wrong and answer it. Each side remembers its own wounds and forgets the ones it inflicted." },
    { id: "escalation", label: "Escalation", text: "The cycle spirals: families, churches and nations can be locked in it for generations. Lamech boasted, “If Cain will be avenged seven times, truly Lamech seventy-seven times” (Genesis 4:24)." }
  ],
  cross: [
    { id: "truth-named", label: "Truth named", text: "The cross does not pretend sin is small; it exposes violence for what it is. Healing begins by telling the truth about what happened, without minimising or exaggerating.", ref: "Ephesians 4:25" },
    { id: "pain-grieved", label: "Pain grieved", text: "Jesus wept, lamented and cried out, “My God, my God, why have you forsaken me?” We are invited to pour out our pain to God instead of pouring it onto others.", ref: "Psalm 62:8; Matthew 27:46" },
    { id: "vengeance-released", label: "Vengeance released to God", text: "Releasing revenge does not mean the wrong does not matter; it means we trust God, who sees everything, to set it right. On the cross Jesus prayed, “Father, forgive them, for they don't know what they are doing.”", ref: "Romans 12:19; Luke 23:34" },
    { id: "protection-justice", label: "Protection and justice pursued", text: "Forgiveness is not the same as trust or impunity. We can forgive and still report, set boundaries, seek legal justice and protect others; that is justice serving love, not vengeance.", ref: "Isaiah 1:17; Romans 13:4" },
    { id: "enemy-loved", label: "Enemy loved and blessed", text: "In Christ, God loved his enemies, us, before we changed. Praying for and blessing those who hurt us breaks the copy-cat pattern of evil from within.", ref: "Luke 6:27-28; Romans 5:10" },
    { id: "restoration", label: "Restoration where possible", text: "God's aim is not just to stop the cycle but to heal it. Where the other person owns the harm and it is safe, reconciliation may follow; where it is not, we can still be at peace inside and leave the door open.", ref: "Romans 12:18; 2 Corinthians 5:18" }
  ]
};

/* ---------- Composite case studies with solutions ---------- */
RG.jxCases = [
  {
    id: "workplace-harassment",
    title: "The manager's messages",
    story: "Priya, a junior accountant, began receiving late-night texts from her team leader that moved from friendly to sexual. When she stopped replying, he started criticising her work in meetings. She is a Christian and wonders whether she should just forgive him and keep quiet.",
    legal: "A legal-gospel approach may tell her to examine her own sin first, to “submit to authority”, or to forgive and say nothing to avoid a bad witness, which quietly makes her responsible for his behaviour. Or it may swing the other way and encourage a furious public denunciation.",
    relational: "God's love for Priya includes her safety and dignity. She can forgive in her heart and still name the behaviour, set a boundary, and report it; forgiveness and accountability work together. Her church's role is to believe her, stand with her and help her find good advice.",
    steps: [
      "Save every message and keep a dated log of incidents and witnesses.",
      "If safe, send one clear written message: “Your messages are unwelcome and must stop.”",
      "Report to HR or a senior manager in writing, and keep a copy.",
      "Seek advice from an employment adviser or lawyer if the response is weak or she faces retaliation.",
      "Lean on friends and, if needed, a counsellor for the stress and self-doubt."
    ]
  },
  {
    id: "church-cover-up",
    title: "The youth leader nobody questioned",
    story: "A teenager told the elders that a popular youth leader had touched her inappropriately. The elders spoke to him, he wept and apologised, and they decided to “handle it internally” so as not to damage the ministry; she was told to forgive him.",
    legal: "A legal-gospel framework can treat abuse as a private sin to be forgiven and forgotten, especially for a valued leader, which is cheap grace that protects the abuser. Or it can treat the survivor as a troublemaker who is “bitter” and “unforgiving”.",
    relational: "Abuse is not just sin against God; it is harm to a person and often a crime. Love for the survivor, and even for the abuser, requires truth, reporting to the authorities, and removing the leader from access to young people. Jesus' sharpest warnings were for those who harm little ones (Matthew 18:6).",
    steps: [
      "Report the allegation to the police or child protection services as required by law; do not investigate it yourselves.",
      "Remove the leader from all contact with minors while the matter is handled.",
      "Care for the survivor and her family, and ask what support they want; never pressure her to forgive or keep quiet.",
      "Bring in an independent safeguarding specialist to review what happened and how the church responded.",
      "Tell the truth to the congregation, with care for the survivor's privacy."
    ]
  },
  {
    id: "exploiting-parents",
    title: "The son with power of attorney",
    story: "Mark noticed his elderly parents' savings shrinking and found that his brother, who holds power of attorney, had been using their money for his own debts. His parents are afraid to upset the son who visits most often.",
    legal: "A legal gospel might frame this as “honour your brother”, keep the peace and avoid family conflict, or it might turn it into a war of condemnation in which the brother is written off as beyond redemption.",
    relational: "Honouring parents (Exodus 20:12) includes protecting them. Mark can speak to his brother honestly, but his parents' security comes first, which may mean involving the bank, a lawyer or adult protective services. He can do this without hatred, still hoping his brother will turn around.",
    steps: [
      "Gather records of withdrawals and spending, with care and without accusing anyone yet.",
      "Talk with his parents privately about what they want and reassure them.",
      "Speak to his brother plainly, if it is safe to do so.",
      "Get legal advice on reviewing or revoking the power of attorney, and alert the bank.",
      "Report to adult protective or social services if the exploitation continues."
    ]
  },
  {
    id: "online-pile-on",
    title: "The post that went viral",
    story: "Jess, a friend from church, posted a clumsy and hurtful comment online. Within hours it was screenshotted and shared thousands of times; strangers posted her workplace and called for her to be fired, and some church members joined in.",
    legal: "Legal-gospel instincts can fuel the pile-on: find the sinner, expose them, pronounce judgement and demand a perfect public confession. Or they can rush to defend her without admitting she did anything wrong.",
    relational: "Love tells Jess the truth gently and helps her own what she got wrong, while refusing to join a mob that wants to destroy rather than restore. Galatians 6:1 says to restore such a person “in a spirit of gentleness”. Friends can also help protect her from threats and doxxing.",
    steps: [
      "Contact Jess privately; listen first, then be honest about what was hurtful.",
      "Help her write a short, sincere apology if she sees the wrong, without grovelling to the crowd.",
      "Refuse to share, comment on or add to the pile-on, and gently ask others to stop.",
      "Help her report threats or posted personal details to the platforms and, if needed, the police.",
      "Stay her friend after the internet has moved on."
    ]
  },
  {
    id: "revenge-after-betrayal",
    title: "The best friend and the business",
    story: "Daniel and his closest friend started a business together; the friend quietly moved the clients to a new company and spread rumours that Daniel was dishonest. Daniel lies awake planning ways to get even.",
    legal: "A legal gospel may simply command “forgive or God won't forgive you,” piling guilt on Daniel's pain, or it may present a God of retribution whose example Daniel feels free to copy.",
    relational: "God's justice is restorative love: he takes the wrong seriously and also refuses to be defined by it. Daniel can grieve the betrayal honestly, pursue fair legal remedies, correct the lies calmly, and hand the desire for revenge to God, who is the one judge. Over time, praying for his friend can loosen bitterness's grip.",
    steps: [
      "Name the hurt honestly, to God and to one or two trusted people (Psalm 55:12-14 is a betrayal psalm).",
      "Get legal advice about the business and the clients before taking any action.",
      "Correct false claims calmly and only where it matters; avoid a smear campaign in return.",
      "Pray daily for the friend, even if only, “Lord, deal with him justly and mercifully.”",
      "Consider talking with a counsellor if obsession with revenge persists."
    ]
  },
  {
    id: "looked-away",
    title: "The night I said nothing",
    story: "Years ago at a party, Sam watched a drunk friend lead a barely conscious girl upstairs and did nothing; he later learned she had been assaulted. He has carried the guilt ever since and feels God must be disgusted with him.",
    legal: "A legal gospel can leave Sam either crushed under endless self-punishment, confessing over and over to be re-forgiven, or offered a cheap “it's under the blood” that skips any honest reckoning or repair.",
    relational: "Sam's guilt points to something true: he failed to love when it mattered. But God meets him with grace, not disgust, as Jesus met Peter after his denials (John 21). Forgiveness frees Sam to grieve, to make whatever repair is possible and wanted, and to become the kind of person who steps in next time.",
    steps: [
      "Tell the whole story to a trusted pastor, counsellor or friend, and receive God's forgiveness (1 John 1:9).",
      "Consider, with wise counsel, whether any repair is possible or wanted by the survivor, never forcing contact on her.",
      "If the abuser may still be a danger to others, seek advice about reporting what you saw.",
      "Take bystander intervention training so you are ready next time.",
      "Turn regret into advocacy: support survivors and speak up when you see warning signs."
    ]
  }
];

/* ---------- Evidence ---------- */
RG.jxEvidence4 = [
  {
    text: "Right To Be describes its 5Ds of Bystander Intervention (Distract, Delegate, Document, Delay and Direct) as methods for supporting someone being harassed, noting they are designed to be safe and that four of the five are indirect. It says it developed them with the Green Dot programme, which pioneered Distract, Delegate and Direct, adding Delay in 2015 and Document in 2017.",
    source: "Right To Be, “The 5Ds of Bystander Intervention”",
    url: "https://righttobe.org/guides/bystander-intervention-training/"
  },
  {
    text: "Right To Be advises that Document should be used only when someone is already helping the person harassed, and that you should never post a recording without their permission. It calls Direct the riskiest D, to be used only if everyone is physically safe and escalation seems unlikely.",
    source: "Right To Be, “The 5Ds of Bystander Intervention”",
    url: "https://righttobe.org/guides/bystander-intervention-training/"
  },
  {
    text: "Right to Be (formerly Hollaback!) is a nonprofit working to end harassment through bystander intervention trainings, storytelling and grassroots initiatives; it began in 2005 as a blog documenting street harassment.",
    source: "Wikipedia, “Right to Be”",
    url: "https://en.wikipedia.org/wiki/Right_to_Be"
  },
  {
    text: "In Darley and Latané's 1968 intercom study, participants heard what seemed to be another student having a seizure. 85% of those who thought they were the only listener reported it, compared with 31% of those who thought four others could hear; the researchers attributed this to diffusion of responsibility.",
    source: "Simply Psychology, “Bystander Effect In Psychology” (summarising Darley & Latané, 1968, Journal of Personality and Social Psychology 8, 377–383)",
    url: "https://www.simplypsychology.org/bystander-effect.html"
  },
  {
    text: "The famous account of the 1964 Kitty Genovese murder, with “38 witnesses who did nothing”, has been shown to be exaggerated (Manning, Levine & Collins, 2007). A 2011 meta-analysis found the bystander effect real but modest and weaker in dangerous emergencies, and a 2020 study of CCTV footage of 219 real public conflicts found that at least one bystander intervened in 90.9% of them.",
    source: "Simply Psychology, “Bystander Effect In Psychology” (summarising Fischer et al., 2011; Philpot et al., 2020)",
    url: "https://www.simplypsychology.org/bystander-effect.html"
  },
  {
    text: "de Quervain and colleagues used PET scanning while people punished someone who had abused their trust in an economic game. Effective punishment activated the dorsal striatum, a region linked to reward, and the authors concluded that people “derive satisfaction from punishing norm violations”.",
    source: "de Quervain, D. J.-F. et al. (2004), “The neural basis of altruistic punishment”, Science 305(5688), 1254–1258 (abstract)",
    url: "https://kops.uni-konstanz.de/entities/publication/3bc22069-141f-40eb-aacc-293bac8176c2"
  },
  {
    text: "The Centre for Justice and Reconciliation (Prison Fellowship International) names three core elements of restorative justice: Encounter, Repair and Transform, “a journey toward wellbeing and wholeness that victims, offenders, and community members can experience.”",
    source: "RestorativeJustice.org, “What is Restorative Justice?”",
    url: "https://restorativejustice.org/what-is-restorative-justice/"
  },
  {
    text: "The US Equal Employment Opportunity Commission (EEOC) defines workplace harassment as unwelcome conduct based on protected characteristics, encourages employees to tell the harasser directly that the conduct is unwelcome and must stop, and to report it to management early to prevent escalation. Its page notes that it is under review and may be revised.",
    source: "U.S. EEOC, “Harassment”",
    url: "https://www.eeoc.gov/harassment"
  }
];
