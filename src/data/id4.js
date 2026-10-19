window.RG = window.RG || {};
var RG = window.RG;

/* Round 13: Identity & heart healing (part 4)
   idGap, idLayers, idApproaches, idWof, idScience, idEvidence4 */

RG.idGap = [
  {
    id: "head-only",
    label: "Head only",
    title: "I know it, but I feel nothing (or the opposite)",
    head: "“God loves me. I am forgiven. I am a new creation.” I can quote the verses.",
    heart: "Numb, or quietly sure the opposite is true: “I’m too much, not enough, about to be found out.”",
    body: "Tight chest, braced shoulders, shallow breath; I flinch at correction and struggle to rest.",
    text: "This is where many sincere believers live, and it is not a failure of faith. The truth has reached the mind, but older lessons, stored deep in memory and in the body, are still speaking louder.",
    signs: ["Confessions feel like reciting a script", "Worship stirs shame more than joy", "Grace is easier to preach than to receive"]
  },
  {
    id: "wrestling",
    label: "Wrestling",
    title: "I can feel the gap, and it hurts",
    head: "“If this is true, why don’t I feel it? Maybe I’m doing it wrong.”",
    heart: "Grief, anger, longing and confusion rise to the surface; old pain starts to talk.",
    body: "Restless sleep, tears that surprise me, moments of fight-or-flight when the past is touched.",
    text: "Noticing the gap is actually progress, because what was hidden is now in the light (Ps 139:23-24). This is a season for honesty and lament, not for trying harder to pretend.",
    signs: ["Honest prayers, like the Psalms of lament", "Less willing to fake being fine", "Old memories and feelings surface"]
  },
  {
    id: "glimpses",
    label: "Glimpses",
    title: "Sometimes I actually feel it",
    head: "“It really is true, even when I forget.”",
    heart: "Moments of being held: in worship, with a safe friend, in a memory where Jesus is present.",
    body: "Brief deep breaths, softened face, tears of relief; the body learns what safety feels like.",
    text: "Truth begins to be experienced and not only believed, often through safe relationships and encounters with God’s presence. The glimpses fade and return, which is normal; each one leaves a deeper groove.",
    signs: ["Real moments of peace or joy", "Kindness toward myself is possible on good days", "Triggers still come but pass more quickly"]
  },
  {
    id: "integrating",
    label: "Integrating",
    title: "Truth is settling into my reactions",
    head: "“I am loved, so I can face this.”",
    heart: "A steadier sense of worth; shame visits but does not move in.",
    body: "Faster recovery after stress; I can notice my body and calm it rather than be ruled by it.",
    text: "The new story is now shaping choices, relationships and reactions, not just thoughts. Old wounds may still ache in hard seasons, but they no longer run the house.",
    signs: ["I can hear correction without collapsing", "I set boundaries without guilt spirals", "I repair quickly after conflict"]
  },
  {
    id: "whole-hearted",
    label: "Whole-hearted",
    title: "Known, felt and lived (not perfect)",
    head: "“I am the beloved, in Christ, with the Father, by the Spirit.”",
    heart: "Settled belonging; joy and sorrow can both be held without fear.",
    body: "Generally at rest; able to play, to rest, to feel, and to return to calm.",
    text: "This is not perfection or the absence of pain; it is a heart that knows it is loved and lives from that love (Eph 3:17-19). Even here we keep growing, and we stay humble, because love is learned for a lifetime.",
    signs: ["Love flows outward more easily", "Struggles are met with compassion, not panic", "Faith feels like home, not performance"]
  }
];

RG.idLayers = [
  {
    id: "truth",
    layer: "Truth: who God says you are",
    scripture: "Eph 1:4 (“he chose us in him before the foundation of the world”); 2 Cor 5:17 (“if anyone is in Christ, he is a new creation”); Col 3:3 (“your life is hidden with Christ in God”); 1 John 3:1 (“that we should be called children of God”).",
    what: "Healing starts from what is already true, not from what we hope to become. In the relational gospel, your identity is a gift given in Christ, and it does not rise or fall with your feelings on a given day. This truth is the solid ground under every other layer.",
    how: ["Read the “in Christ” passages slowly and personally (Eph 1–2; Col 1–3; Rom 8)", "Write down the lies you notice and the truth Scripture speaks to each one", "Let Jesus be the picture of what God thinks of you (John 14:9)", "Hold truth as a gift, not a test you must pass"],
    science: "This layer is theological; science cannot measure identity in Christ. Research does suggest that a stable, accepting sense of self supports wellbeing, but that is a parallel observation, not proof."
  },
  {
    id: "renewed-mind",
    layer: "Renewed mind",
    scripture: "Rom 12:2 (“be transformed by the renewing of your mind”, Greek <em>anakainōsis</em>); Eph 4:23; Phil 4:8 (“whatever things are true… think about these things”); 2 Cor 10:5.",
    what: "Renewal is a process of learning to see yourself, God and others through Christ. It is more than repeating sentences; it is replacing a whole interpretation of life with a truer one. It goes best when it is honest about present feelings rather than shouting over them.",
    how: ["Notice your automatic thoughts and gently ask, “Is this how Jesus sees it?”", "Use believable, honest statements (“I am learning that I am loved”) alongside bold confessions", "Meditate on one passage for a week rather than many verses quickly", "Talk truths through with a trusted friend so they are heard, not just thought"],
    science: "Research on neuroplasticity shows that the brain’s connections change with repeated experience and learning. Studies such as Wood, Perunovic and Lee (2009) also suggest that statements far from how someone feels can backfire, so honesty matters."
  },
  {
    id: "healed-heart",
    layer: "Healed heart",
    scripture: "Ps 147:3 (“He heals the broken in heart, and binds up their wounds”); Isa 61:1 and Luke 4:18 (good news for the brokenhearted); Ps 51:6 (“you desire truth in the inward parts”); Ezek 36:26.",
    what: "In Hebrew the heart (<em>lev</em>/<em>levav</em>) is the whole inner person: thought, will, memory and emotion. Wounds stored there often need to be met, felt and comforted, not only corrected. Jesus came to heal hearts, not only to inform minds.",
    how: ["Bring specific memories and feelings to God in honest prayer, at a gentle pace", "Grieve real losses instead of rushing past them", "Practise forgiveness as a process, without minimising harm or forcing reconciliation", "Seek a wise counsellor, pastor or trauma-informed therapist for deep wounds"],
    science: "Memory reconsolidation research (from Nader et al., 2000 onward) suggests that recalled memories can be updated when new experience contradicts them. How this applies to prayer ministry is interpretation, not established research."
  },
  {
    id: "settled-body",
    layer: "Settled body",
    scripture: "1 Cor 6:19 (“your body is a temple of the Holy Spirit”); Ps 131:2 (“I have calmed and quieted my soul, like a weaned child with his mother”); Mark 6:31 (“come… and rest a while”); 1 Kgs 19:5-8 (Elijah fed and rested).",
    what: "God made us embodied, so fear and safety are felt in the body as well as the mind. A body stuck in alarm can make truth hard to feel. Caring for the body is not unspiritual; it is part of receiving God’s peace.",
    how: ["Slow your breathing and notice your feet on the ground when anxiety rises", "Protect sleep, movement, food and rest as gifts, not luxuries", "Use embodied prayer: kneeling, open hands, walking, singing", "If panic, flashbacks or numbness are frequent, seek trauma-informed professional help"],
    science: "Implicit memory (learning shown in reactions without conscious recall) is well established. Popular body-based frameworks such as polyvagal theory are helpful to many but their biology is debated by researchers."
  },
  {
    id: "shared-life",
    layer: "Shared life",
    scripture: "Gal 6:2 (“bear one another’s burdens”); Jas 5:16 (“confess your offenses to one another, and pray for one another, that you may be healed”); Eccl 4:9-10; Eph 3:17-19 (knowing love “with all the saints”).",
    what: "We are wounded in relationship and we are mostly healed in relationship. The Trinity is a communion of love, and we were made to know that love through people as well as directly. Safe community makes God’s love tangible.",
    how: ["Find one or two safe people who can hear your story without fixing or shaming", "Join a small group, recovery group or prayer partnership", "Practise receiving help, not only giving it", "Choose communities where honesty and boundaries are respected"],
    science: "Attachment research (for example Mikulincer and Shaver) finds that a sense of security can be strengthened in adulthood through supportive relationships, including therapy and religious contexts. Linking this to church life is interpretation."
  }
];

RG.idApproaches = [
  {
    id: "sanford-healing-of-memories",
    name: "Healing of memories (Agnes Sanford)",
    origin: "Agnes Sanford (1897–1982), Episcopal lay teacher; The Healing Light (1947); with her husband Edgar she began the Schools of Pastoral Care in the 1950s.",
    method: "Sanford taught that Jesus, who is not bound by time, can enter painful memories and bring forgiveness and healing there. Prayer often used the imagination to picture Christ present in the remembered scene.",
    strengths: "She pioneered the idea that the church should care for emotional wounds, not only sins, and her work shaped much of the later inner-healing movement across denominations.",
    cautions: "Critics point to imaginative visualisation, some language that sounds close to “mind cure” or New Thought ideas, and the risk of suggestion shaping memories. Her teaching was built on experience and testimony rather than research.",
    evidence: "There is no controlled research on her method as such; its influence is historical and pastoral."
  },
  {
    id: "elijah-house",
    name: "Elijah House",
    origin: "John and Paula Sandford, who founded Elijah House in the 1970s; key book The Transformation of the Inner Man (1982).",
    method: "Prayer ministry looks for “bitter-root judgments” (Heb 12:15; Matt 7:1-2) and “inner vows” formed in childhood that keep producing the same painful patterns. The person forgives, repents of judgments, renounces vows and receives prayer for healing.",
    strengths: "It connects present patterns to past wounds in a way many find illuminating, and it takes forgiveness and personal responsibility seriously.",
    cautions: "Critics worry that it can over-explain problems as the person’s own judgments, place heavy emphasis on generational and demonic factors, and be practised by lay ministers without training for trauma. Little outside evaluation exists.",
    evidence: "Mostly testimony and practitioner reports; no substantial controlled studies are known."
  },
  {
    id: "leanne-payne",
    name: "Pastoral Care Ministries (Leanne Payne)",
    origin: "Leanne Payne (1932–2015); founded Pastoral Care Ministries in the early 1980s; books include The Broken Image (1981) and The Healing Presence (1989).",
    method: "Payne emphasised “practising the presence” of God, listening prayer, receiving one’s true identity from God, and healing the imagination and memories. She drew on C.S. Lewis and sacramental, incarnational theology.",
    strengths: "Her work is rich in theology of God’s presence and the goodness of the incarnation, and it offered many people a deeply relational picture of healing.",
    cautions: "Her ministry treated same-sex attraction as gender-identity brokenness to be healed; major medical and psychological bodies now regard efforts to change sexual orientation as ineffective and potentially harmful, and many former participants report harm. Imaginative prayer also needs care around suggestion.",
    evidence: "No controlled outcome research; evaluations are testimonial or critical memoir."
  },
  {
    id: "theophostic-tpm",
    name: "Theophostic Prayer Ministry / Transformation Prayer Ministry",
    origin: "Ed Smith, a Baptist minister in Kentucky, mid-1990s; later renamed Transformation Prayer Ministry.",
    method: "The person is helped to feel a present painful emotion, follow it to an earlier memory, identify the “lie” believed there, and then wait for Jesus to bring truth. The minister is meant to be non-directive and to test what is received against Scripture and Christ’s character.",
    strengths: "It is gentle and prayer-centred, and it treats emotional pain as a pointer to beliefs that need truth. Smith explicitly warned practitioners against suggestion, hypnosis and guided imagery.",
    cautions: "In the late 1990s and early 2000s critics raised false-memory concerns (memories of abuse being created or shaped under suggestion) and theological objections; many practitioners are lay people treating complex conditions. Smith revised his teaching over time.",
    evidence: "Fernando Garzon (2004) reported surveys and 16 case studies with encouraging symptom change but stressed that randomised trials were needed and that the “scientific jury” was still out."
  },
  {
    id: "immanuel-approach",
    name: "The Immanuel Approach",
    origin: "Dr. Karl Lehman (psychiatrist) and Pastor Charlotte Lehman, developed through the 2000s; books include Outsmarting Yourself (2011).",
    method: "Sessions begin with appreciation and with perceiving Jesus’ living presence, then invite him to lead into painful memories. The facilitator mostly helps the person stay connected with Jesus rather than directing the content.",
    strengths: "It starts from connection and gratitude rather than from digging up pain, and it draws on attachment and brain-science ideas. Its own site discusses informed consent with recipients.",
    cautions: "Experiences of “seeing” Jesus are subjective and need discernment; lay facilitators can miss serious trauma or dissociation. Supporters’ claims of consistent results rest mainly on stories.",
    evidence: "Case reports and testimonies; controlled research is very limited."
  },
  {
    id: "bethel-sozo",
    name: "Bethel Sozo",
    origin: "Bethel Church, Redding, California; developed by Dawna De Silva and Teresa Liebscher in the late 1990s. Sozo is Greek for “save, heal, make whole”.",
    method: "Trained lay teams lead a person through prayer tools (for example the Father Ladder, the Four Doors and Presenting Jesus) to identify lies, wounds and spiritual “open doors”, forgive, and hear from God.",
    strengths: "It is accessible, prayerful and focused on intimacy with Father, Son and Spirit, and it has spread widely with simple, teachable tools.",
    cautions: "Sozo states it is not counselling, yet it deals with deep wounds; critics question the strong emphasis on demonic “doors”, the risk of suggestion, and Bethel’s wider theology. Trauma survivors need professional care alongside it.",
    evidence: "No published controlled studies are known; evidence is testimonial."
  },
  {
    id: "restoring-the-foundations",
    name: "Restoring the Foundations",
    origin: "Chester and Betsy Kylstra, from the 1990s (Restoring the Foundations Ministry).",
    method: "An “integrated approach” works through four areas: sins of the fathers and resulting curses, ungodly beliefs, soul and spirit hurts, and demonic oppression. Ministry is often done in extended sessions by trained teams.",
    strengths: "It is structured and thorough, and it combines belief change, emotional healing and forgiveness in one framework.",
    cautions: "Its generational-curse emphasis is debated in light of Ezek 18:20 and Gal 3:13, and a demonic framework can be over-applied to psychological problems. Little independent evaluation exists.",
    evidence: "Practitioner reports and testimonies; no robust controlled research known."
  },
  {
    id: "celebrate-recovery",
    name: "Celebrate Recovery",
    origin: "John Baker with Rick Warren, Saddleback Church, California, 1991.",
    method: "A Christ-centred twelve-step recovery programme built on eight principles drawn from the Beatitudes, for “hurts, habits and hang-ups”. Weekly large-group worship, small open-share groups and step studies with sponsors.",
    strengths: "It offers ongoing community, honesty and accountability for anyone, not just addicts, and it normalises that Christians struggle.",
    cautions: "Groups are peer-led and not therapy; serious addiction, mental illness or abuse may need medical and professional care too. Quality varies between local groups.",
    evidence: "Research on Celebrate Recovery itself is sparse; the broader evidence for twelve-step and mutual-help participation is more established, but this programme has not been widely tested on its own."
  },
  {
    id: "biblical-counselling",
    name: "Biblical (nouthetic) counselling",
    origin: "Jay Adams, Competent to Counsel (1970); the Christian Counseling and Educational Foundation (CCEF), founded 1968; later shaped by David Powlison, Ed Welch and others.",
    method: "Adams called it “nouthetic” from the Greek <em>noutheteō</em> (admonish, counsel). Counselling applies Scripture directly to heart motives, beliefs and behaviour, usually within the local church.",
    strengths: "It takes Scripture and the church seriously, treats people as worshippers and not only symptoms, and today CCEF describes people as “embodied souls” and engages other voices respectfully.",
    cautions: "Early forms were strongly suspicious of psychology and could treat suffering, trauma or mental illness mainly as sin issues; critics also raise concerns about how some settings handled abuse. Integrationist Christians argue God also teaches through research.",
    evidence: "Few outcome studies exist for biblical counselling; its case rests mainly on theological argument and pastoral experience."
  },
  {
    id: "trauma-informed-emdr",
    name: "Trauma-informed therapy, including EMDR",
    origin: "Trauma-informed care grew from research on trauma from the 1980s onward; EMDR was developed by psychologist Francine Shapiro in the late 1980s.",
    method: "Trauma-informed therapy prioritises safety, choice and pacing, and treats symptoms as adaptations to harm. EMDR has the client briefly recall a traumatic memory while following bilateral stimulation such as eye movements, in a structured protocol.",
    strengths: "Trauma-focused therapies, including EMDR and trauma-focused CBT, are recommended for PTSD in major international guidelines; they can be done by Christian or non-Christian clinicians and sit well alongside prayer.",
    cautions: "How EMDR works, and whether the eye movements add anything, is debated. Therapy quality depends on the clinician; check training and credentials.",
    evidence: "Among the approaches here, these have the strongest research base, from many randomised trials and meta-analyses for PTSD."
  },
  {
    id: "ifs",
    name: "Internal Family Systems (and Christian adaptations)",
    origin: "Richard Schwartz, family therapist, from the 1980s; Christian adaptations include Jenna Riemersma, Altogether You (2020), and Alison Cook and Kimberly Miller, Boundaries for Your Soul (2018).",
    method: "IFS sees the mind as made of “parts” (protectors and wounded “exiles”) and a core “Self” marked by calm, curiosity and compassion. Healing comes as the Self listens to and unburdens the parts; Christian versions invite Jesus or the Spirit into that process.",
    strengths: "Many find it compassionate and non-shaming, because no part is the enemy; it fits the inner conflict described in passages like Rom 7 and the Psalms.",
    cautions: "Some Christians worry that the “Self” is described in almost divine terms; others warn that parts language can be overused, and it needs care with dissociative disorders. The research base is still small.",
    evidence: "Early studies, including a small randomised trial with rheumatoid arthritis patients, are promising, but large, rigorous trials are still few."
  }
];

RG.idWof = [
  {
    id: "positive-confession",
    teaching: "Positive confession",
    claim: "Speaking God’s promises aloud with faith brings them into your life; E.W. Kenyon’s motto is usually summarised as “what I confess, I possess”, and Kenneth Hagin taught a formula of saying it, doing it, receiving it and telling it.",
    origin: "Kenyon (1867–1948) taught confession of the Word in the early twentieth century; Hagin (1917–2003) popularised it from the 1960s through Rhema Bible Training Center, and Kenneth Copeland spread it widely by broadcast.",
    right: "Confession matters: <em>homologeō</em> means to “say the same thing” as God (Rom 10:9-10; Heb 10:23). What we rehearse shapes us, and agreeing with God about who we are is healthy.",
    problem: "Biblical confession agrees with God; it does not compel him or create reality by human words. The Lausanne Theology Working Group rejects the idea that God’s power can be “manipulated by human words, actions or rituals”. Research also suggests forced positive statements can backfire for people who feel worst.",
    relational: "Confess truth as a love response inside a relationship, and be honest about your feelings too, as the Psalms are (Ps 42:5). We say “yes” to what Christ has done, not to make it happen."
  },
  {
    id: "faith-as-force",
    teaching: "Faith as a force / “God’s kind of faith”",
    claim: "Faith is a spiritual force or law; God himself created by faith-filled words, and believers can use “the God-kind of faith” in the same way. Hagin taught Mark 11:22 as a call to have “the God-kind of faith”.",
    origin: "Kenyon’s writings on faith and words, developed by Hagin and Copeland (for example Copeland’s teaching on the laws of prosperity and spiritual law).",
    right: "Mark 11:22-23 really does call for bold, expectant trust, and the Greek <em>echete pistin theou</em> can grammatically be read “faith of God”. Some scholars and older evangelicals accepted that reading, so it is not absurd in itself.",
    problem: "Most translators read it as “have faith in God”, and the context is trust in a person, not a force we wield (Mark 11:22; Heb 11:6). Turning faith into a law makes God a mechanism and the believer the operator (Jas 4:13-15).",
    relational: "Faith is trust in the Father’s love shown in Jesus (Gal 2:20, “the faith of the Son of God”). The relational gospel can welcome “the faith of Christ” as Jesus’ own trust shared with us, but never as a technique."
  },
  {
    id: "healing-guaranteed",
    teaching: "Healing always guaranteed",
    claim: "Because “by his stripes we are healed” (Isa 53:5; 1 Pet 2:24), physical healing is fully provided in the atonement and is always God’s will now, if received by faith; Hagin taught this strongly.",
    origin: "Nineteenth-century faith-cure teachers (Charles Cullis, A.B. Simpson, A.J. Gordon), F.F. Bosworth’s Christ the Healer (1924), Kenyon, then Hagin and later healing evangelists.",
    right: "Jesus healed constantly, healing is part of the kingdom (Matt 10:7-8; Jas 5:14-15), and the cross and resurrection guarantee the full healing of our bodies in the end (Rom 8:23).",
    problem: "1 Pet 2:24 applies Isa 53 mainly to sin and returning to the Shepherd; Matt 8:17 links it to Jesus’ healing ministry, but the New Testament also shows faithful people not yet healed (2 Cor 12:7-9; Phil 2:27; 1 Tim 5:23; 2 Tim 4:20). The timing of full healing is the resurrection.",
    relational: "Pray boldly for healing, because God is good and opposes sickness; also see doctors, and never treat continuing illness as proof of weak faith. Love stays present whether or not healing comes yet."
  },
  {
    id: "prosperity",
    teaching: "Prosperity",
    claim: "God wills financial prosperity for all believers, based on texts like 3 John 2 (“that you may prosper in all things and be healthy”) and Deut 8:18 (“it is he who gives you power to get wealth”); Copeland’s The Laws of Prosperity (1974) is a classic statement.",
    origin: "Kate Bowler traces it through metaphysical teachers, positive thinkers like Norman Vincent Peale, healing revivalists like Oral Roberts and Kenneth Hagin, to today’s preachers.",
    right: "God cares about material life, work and provision (Matt 6:31-33; 1 Tim 6:17). Lausanne affirms that the Bible includes material welfare within God’s blessing and rejects fatalism about poverty.",
    problem: "3 John 2 is a normal letter greeting, not a promise of wealth; Deut 8:18 warns Israel against pride and forgetting God. Jesus and Paul warn strongly about wealth (Luke 12:15; 1 Tim 6:6-10), and Paul knew want as well as plenty (Phil 4:11-13).",
    relational: "God’s blessing is his presence and shared life, which includes caring for our needs and for the poor (Acts 4:34). Wealth is for generosity, not proof of favour."
  },
  {
    id: "seed-faith",
    teaching: "Seed-faith giving",
    claim: "Giving money is “sowing a seed” that God will multiply back to you, often many times over; Oral Roberts popularised “seed-faith”, and many ministries ask for specific “seed” gifts in exchange for breakthrough.",
    origin: "Oral Roberts (1918–2009), from the 1950s onward, especially in his 1970 book The Miracle of Seed-Faith; later taken up by television ministries.",
    right: "Generosity is a joyful grace, and Paul does use sowing and reaping for giving (2 Cor 9:6-11). God delights in cheerful givers and provides for them.",
    problem: "In 2 Cor 9 the harvest is righteousness and more generosity for others (9:10-11), not personal enrichment. Offering returns for donations can exploit the poor; Lausanne notes it “vastly enriches those who preach it, but leaves multitudes no better off”. See Acts 8:20.",
    relational: "Give freely because you have freely received (Matt 10:8), not to buy outcomes. A loving Father does not need to be paid to bless his children."
  },
  {
    id: "negative-words",
    teaching: "“Don’t speak negative words”",
    claim: "Since “death and life are in the power of the tongue” (Prov 18:21), speaking about sickness, lack or fear gives them power, so believers should not admit symptoms or doubts.",
    origin: "Grows out of Kenyon’s and Hagin’s teaching on confession; common in popular Word of Faith preaching from the 1970s.",
    right: "Words really do matter: they build or wound (Prov 12:18; Eph 4:29; Jas 3), and constant negative talk can deepen despair.",
    problem: "Proverbs 18:21 is wisdom about speech and its fruit in relationships, not a law of creative power. Scripture is full of honest lament (Ps 13; Ps 88; Lam 3), Jesus said “My soul is exceedingly sorrowful” (Matt 26:38), and Paul named his weakness (2 Cor 12:9-10). Banning honest words breeds suppression and shame.",
    relational: "Speak truthfully and with love, including about pain. Honest lament is a form of faith, because it brings the real you to a God who listens."
  },
  {
    id: "blaming-lack-of-faith",
    teaching: "Blaming the sick and poor",
    claim: "If you are not healed or not prospering, there must be a lack of faith, a wrong confession or hidden sin in you.",
    origin: "A logical consequence of guaranteed healing and prosperity teaching; it appears in many Word of Faith settings, though some leaders have softened it.",
    right: "Faith and choices do matter, and sometimes there are real steps a person can take (Mark 6:5-6; Gal 6:7).",
    problem: "Jesus rejected blaming suffering on the sufferer (John 9:1-3; Luke 13:1-5), Job’s friends were rebuked for doing it (Job 42:7), and faithful people still suffered (Heb 11:35-39). Lausanne rejects the idea that poverty or illness is “always a sign of God’s curse, or lack of faith”.",
    relational: "Stand with the sick and the poor as Jesus did, without explanations that add shame to pain. Address injustice and offer care, and let prayer be companionship, not a verdict."
  },
  {
    id: "little-gods",
    teaching: "“Little gods”",
    claim: "Humans were created as a god-class of being and believers are “little gods”, citing Ps 82:6 (“I said, You are gods”) and John 10:34; Kenneth Copeland and others have taught versions of this.",
    origin: "Later Word of Faith teachers expanded Kenyon’s strong union language; Robert Bowman notes Kenyon himself would not have accepted the “little gods” teaching.",
    right: "Scripture gives humans astonishing dignity: image-bearers (Gen 1:26-27), sharers in the divine nature (2 Pet 1:4), co-heirs with Christ (Rom 8:17). The early church spoke of <em>theosis</em>, being made partakers of God.",
    problem: "Ps 82 rebukes unjust rulers who “shall die like men”, and Jesus’ use in John 10 is an argument from the lesser to the greater about himself. Classical <em>theosis</em> means participation in God by grace, never becoming God by nature or wielding divine power.",
    relational: "We share in the Son’s relationship with the Father by the Spirit, as beloved children, not as rival gods. Union is communion, not self-deification."
  },
  {
    id: "jesus-died-spiritually",
    teaching: "Jesus died spiritually (JDS)",
    claim: "On the cross Jesus not only died physically but “died spiritually”, taking on Satan’s nature, and was then “born again” in hell before rising; Kenyon taught a form of this and it was developed by Hagin and Copeland.",
    origin: "Kenyon’s works such as What Happened from the Cross to the Throne (published 1945); critics D.R. McConnell, A Different Gospel (1988), and Hank Hanegraaff, Christianity in Crisis (1993), made it a central objection.",
    right: "Jesus truly entered our condition all the way down: forsakenness (Mark 15:34), death and the realm of the dead (1 Pet 3:18-19; Eph 4:9). The early church celebrated his descent to free the captives.",
    problem: "Jesus committed his spirit to the Father (Luke 23:46) and told the thief “today you will be with me in Paradise” (Luke 23:43). The New Testament locates redemption in his blood and bodily death (Col 1:20-22; Heb 10:10), never in his becoming satanic or being born again.",
    relational: "The cross is the Son, never separated from the Father in being, carrying our alienation into the heart of the Trinity’s love. He descended as victor and healer, not as one who became a demon."
  },
  {
    id: "revelation-knowledge",
    teaching: "Revelation knowledge vs sense knowledge",
    claim: "Kenyon taught two kinds of knowledge: “sense knowledge” from the five senses and reason, and “revelation knowledge” from God’s Word; faith means trusting the Word even against the evidence of your senses (for example, symptoms).",
    origin: "Kenyon’s book The Two Kinds of Knowledge. McConnell argued Kenyon borrowed from New Thought and Christian Science; defenders such as Joe McIntyre, E.W. Kenyon: The True Story, and scholars like Dale Simmons and Bowman place him mainly in Higher Life and faith-cure circles, with debate over how much metaphysical influence there was.",
    right: "Spiritual truth is received by revelation (1 Cor 2:9-14), and faith can trust what is not yet seen (2 Cor 5:7; Heb 11:1).",
    problem: "Scripture also honours the senses and reason: “that which we have heard, which we have seen with our eyes… and our hands touched” (1 John 1:1); Jesus invited Thomas to touch (John 20:27). Denying symptoms can delay medical care and create dissonance.",
    relational: "God made our bodies and senses good, and the Incarnation is God revealing himself through them. Faith holds truth and reality together, honestly."
  }
];

RG.idScience = [
  {
    id: "positive-self-statements",
    finding: "Positive self-statements can backfire",
    text: "In experiments by Joanne Wood, Elaine Perunovic and John Lee, people with low self-esteem who repeated “I am a lovable person” felt worse than similar people who did not; people with high self-esteem felt only slightly better. When low self-esteem participants were allowed negative thoughts as well as positive ones, their mood fared better. These were lab studies with students and one phrase, so they do not prove affirmations always fail.",
    source: "Wood, Perunovic & Lee, Positive Self-Statements: Power for Some, Peril for Others, Psychological Science (2009), as reported by the Association for Psychological Science via ScienceDaily",
    url: "https://www.sciencedaily.com/releases/2009/07/090702110503.htm",
    meaning: "Interpretation: declaring identity while ignoring how we really feel may deepen the gap for the most wounded. Honest, believable confessions joined with heart healing seem wiser than louder repetition."
  },
  {
    id: "neuroplasticity",
    finding: "The brain keeps changing",
    text: "Neuroplasticity is the capacity of neurons and neural networks to change their connections and behaviour in response to new information, experience, development, damage or dysfunction. It is strongest early in life but continues through life, and the same mechanism can lead to positive or negative reorganisation.",
    source: "Encyclopaedia Britannica, “neuroplasticity”",
    url: "https://www.britannica.com/science/neuroplasticity",
    meaning: "Interpretation: renewing the mind (Rom 12:2) has a bodily side; repeated experiences of truth and love can, over time, reshape well-worn patterns. Change is usually gradual, so patience is realistic, not faithless."
  },
  {
    id: "implicit-memory",
    finding: "Implicit memory",
    text: "Implicit memory is memory for past experience shown indirectly, without a deliberate attempt to recall and without awareness that memory is involved. It can operate even when conscious memory fails, and the term is used interchangeably with nondeclarative memory.",
    source: "APA Dictionary of Psychology, “implicit memory”",
    url: "https://dictionary.apa.org/implicit-memory",
    meaning: "Interpretation: this helps explain why we can know a truth and still react from old lessons. The heart’s “memory” may need new experiences, not only new information."
  },
  {
    id: "memory-reconsolidation",
    finding: "Memory reconsolidation",
    text: "Nader, Schafe and LeDoux showed in rats that consolidated fear memories, when reactivated, return to a changeable state and need new protein synthesis to be stored again. Clinicians such as Bruce Ecker have since argued that therapy can change emotional learning when a recalled memory meets a vivid contradicting experience, though how far animal findings translate to therapy is still studied and debated.",
    source: "Nader, Schafe & LeDoux, “Fear memories require protein synthesis in the amygdala for reconsolidation after retrieval”, Nature 406 (2000), 722–726 (abstract on IDEAS/RePEc)",
    url: "https://ideas.repec.org/a/nat/nature/v406y2000i6797d10.1038_35021052.html",
    meaning: "Interpretation: when a painful memory is recalled in a safe place and met with truth and love (for example, Jesus’ presence), it may be genuinely updated, not just covered over. This is a hopeful parallel, not proof of any prayer method."
  },
  {
    id: "expressive-writing",
    finding: "Expressive writing",
    text: "Studies led by James Pennebaker and Joshua Smyth found that writing about stressful experiences for about 20 minutes on a few days was linked to health benefits in some groups. Researchers stress that venting alone is not enough; benefit seems to come from finding meaning, and initial writing can be distressing. Later meta-analyses find average effects that are small and vary between studies.",
    source: "Bridget Murray, “Writing to heal”, Monitor on Psychology (American Psychological Association), June 2002",
    url: "https://www.apa.org/monitor/jun02/writing",
    meaning: "Interpretation: the Psalms model honest, structured writing before God. Journaling pain and then reflecting on meaning with God may help the heart catch up with the head; go gently with trauma."
  },
  {
    id: "attachment-security",
    finding: "Attachment security can grow",
    text: "Attachment theory holds that caring, available relationship partners build a sense of safety and security, which supports emotion regulation, mental and physical health. Mario Mikulincer and Phillip Shaver review evidence that this sense of security can be enhanced in adulthood, in the lab and through partners, psychotherapy and contexts including religion.",
    source: "Mikulincer & Shaver, “Enhancing the ‘broaden and build’ cycle of attachment security in adulthood”, International Journal of Environmental Research and Public Health 17(6), 2020",
    url: "https://cris.biu.ac.il/en/publications/enhancing-the-broaden-and-build-cycle-of-attachment-security-in-a/",
    meaning: "Interpretation: knowing God as a secure base (Ps 91; Rom 8:15) and belonging to a safe community may help rewire insecure patterns. Early wounds are not the final word."
  },
  {
    id: "self-compassion",
    finding: "Self-compassion",
    text: "Kristin Neff describes self-compassion as self-kindness, a sense of common humanity and mindfulness in the face of suffering or failure. A meta-analysis by MacBeth and Gumley (2012), using Neff’s Self-Compassion Scale across 20 samples, found a large association between higher self-compassion and lower depression, anxiety and stress; these are correlations, and the scale itself has been debated.",
    source: "MacBeth & Gumley, “Exploring compassion: a meta-analysis of the association between self-compassion and psychopathology”, Clinical Psychology Review 32(6), 2012",
    url: "https://aura.abdn.ac.uk/items/23d2b308-bc55-4871-af58-2be327116fb6/full",
    meaning: "Interpretation: treating yourself as God treats you, with kindness rather than contempt, is not self-indulgence. It mirrors the Father’s compassion (Ps 103:13-14) and makes honest repentance safer."
  },
  {
    id: "polyvagal-debate",
    finding: "Polyvagal theory (debated)",
    text: "Stephen Porges’ polyvagal theory describes three nervous-system states (social engagement, fight-or-flight, shutdown) and is popular in trauma care. Physiologist Paul Grossman (2023) and others argue its core biological premises are likely wrong, while some clinicians still find it a useful practical framework for safety and co-regulation.",
    source: "Giroux, Ahlers & Miawotoe, “Polyvagal Approaches: scientifically questionable but useful in practice”, Journal of Psychiatry Reform 10(11), 2023 (citing Grossman, Biological Psychology 180, 2023)",
    url: "https://journalofpsychiatryreform.com/2023/10/17/polyvagal-approaches-scientifically-questionable-but-useful-in-practice/",
    meaning: "Interpretation: the body clearly matters in healing, but specific theories should be held lightly. Practices like slow breathing, singing and safe company are low-risk and fit Scripture’s picture of rest, whatever the final science."
  }
];

RG.idEvidence4 = [
  {
    text: "“We define prosperity gospel as the teaching that believers have a right to the blessings of health and wealth and that they can obtain these blessings through positive confessions of faith and the ‘sowing of seeds’ through the faithful payments of tithes and offerings.”",
    source: "Lausanne Theology Working Group (Africa Chapter), A Statement on the Prosperity Gospel, Akropong consultations 2008–2009",
    url: "https://lausanne.org/akropong"
  },
  {
    text: "The same statement affirms that “the Bible includes material welfare (both health and wealth) within its teaching about the blessing of God”, yet rejects the notion that poverty or illness “is always a sign of God’s curse, or lack of faith”, and rejects the idea that God’s power can be “manipulated by human words, actions or rituals”.",
    source: "Lausanne Theology Working Group, A Statement on the Prosperity Gospel",
    url: "https://lausanne.org/akropong"
  },
  {
    text: "Kate Bowler traces the prosperity gospel “from the touring mesmerists, metaphysical sages, pentecostal healers, business oracles, and princely prophets of the early 20th century; through mid-century positive thinkers like Norman Vincent Peale and revivalists like Oral Roberts and Kenneth Hagin; to today’s hugely successful prosperity preachers.”",
    source: "Kate Bowler, Blessed: A History of the American Prosperity Gospel (Oxford University Press), publisher description on Duke Graduate Program in Religion",
    url: "https://graduateprograminreligion.duke.edu/books/blessed-history-american-prosperity-gospel"
  },
  {
    text: "A 1989 review of D.R. McConnell’s A Different Gospel says he shows the faith movement’s distinctives come “directly from E. W. Kenyon” and that Hagin is “very dependent (to the point of plagiarism) on Kenyon”, but argues McConnell falls short by treating the faith message as metaphysical thought, since for the metaphysical cults “God is an impersonal principle” while for faith teachers he is personal.",
    source: "Brian Onken, “A Different Gospel” (review), Christian Research Journal, 1989, on equip.org",
    url: "https://www.equip.org/articles/a-different-gospel"
  },
  {
    text: "Reviewing Robert Bowman’s The Word-Faith Controversy (2001), Paul L. King reports Bowman’s conclusions that “Kenyon is the source of most, but not all” of the movement’s distinctive teachings, that there is “little resemblance” between Kenyon and New Thought, and that the movement is “neither soundly orthodox nor thoroughly heretical”; King adds that Joe McIntyre’s E.W. Kenyon: The True Story documents Kenyon’s Keswick/Higher Life connections.",
    source: "Paul L. King, review of Robert M. Bowman Jr., The Word-Faith Controversy, Pneuma Review",
    url: "https://pneumareview.com/robert-bowman-the-word-faith-controversy/"
  },
  {
    text: "Fernando Garzon, writing as a clinical researcher, reported that in 16 Theophostic case studies 14 showed clinically significant symptom reduction, but cautioned that randomised studies were needed: “Until more studies are done however, the ‘scientific jury’ is still out.” He also notes Ed Smith warned practitioners against guided imagery and hypnosis to prevent false memories.",
    source: "Fernando Garzon, “Theophostic Ministry: What Is It? Who Is Using It? What Does the Research Show?”, Reformation & Revival 13:2 (Spring 2004)",
    url: "https://www.gospelstudies.org.uk/biblicalstudies/pdf/ref-rev/13-2/13-2_garzon.pdf"
  },
  {
    text: "The Immanuel Approach site describes Dr. Karl and Pastor Charlotte Lehman’s approach as developed “over decades of professional work combining faith-based interventions and state of the art mental health care”, and includes essays on whether it is biblical and on informed consent with recipients.",
    source: "Immanuel Approach website (Karl and Charlotte Lehman)",
    url: "https://www.immanuelapproach.com/"
  },
  {
    text: "CCEF says it “works to restore Christ to counseling” and “to restore counseling to the church”, describes people as “embodied souls shaped by a world of influences”, and says that when it disagrees with other counseling theories it aims “to identify the strengths in those theories and represent others and their viewpoints accurately”.",
    source: "Christian Counseling & Educational Foundation (CCEF), About page",
    url: "https://www.ccef.org/about/"
  }
];
