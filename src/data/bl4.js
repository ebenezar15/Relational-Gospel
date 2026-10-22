window.RG = window.RG || {};
var RG = window.RG;

/* Round 19 part A: blood as the body's cleansing transport.
   blWaste: 10 wastes and how blood carries them to be filtered or neutralised.
   blOrgans: 6 cleansing organs. blWasteQA: 2 deep questions. blEvidence4: sources.
   Biology checked 2026-10 on OpenStax Anatomy and Physiology 2e, NIDDK (NIH), MedlinePlus (NIH),
   NIAAA (NIH), Cleveland Clinic and Britannica (URLs given). Spiritual parallels are analogies,
   labelled as such, not proofs. */

RG.blWaste = [
  {
    id: "carbon-dioxide",
    waste: "Carbon dioxide",
    from: "Every working cell makes carbon dioxide as a waste product of cellular respiration, the process that turns food and oxygen into usable energy.",
    organ: "lungs",
    how: "Carbon dioxide diffuses from the tissues into the blood. About 70% travels to the lungs as <strong>bicarbonate</strong> (made inside red cells by the enzyme carbonic anhydrase), about 20% rides on haemoglobin, and about 7 to 10% simply dissolves in plasma. In the lung capillaries the reaction runs in reverse, and carbon dioxide diffuses into the air sacs.",
    out: "It is breathed out with every exhalation.",
    parallel: "As a picture: the same blood that brings life also carries away what would poison us, and lets it go with a breath. The gospel pictures sin not as something God stores up against us, but as something carried off and released.",
    ref: "Psalm 103:12 (KJV): \"As far as the east is from the west, so far hath he removed our transgressions from us.\"",
    source: "OpenStax, Anatomy and Physiology 2e, 22.5 Transport of Gases",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-5-transport-of-gases"
  },
  {
    id: "urea",
    waste: "Urea",
    from: "Urea is made in the liver from ammonia, a toxic by-product of breaking down protein. It is the body's safe, water-soluble way of packaging that nitrogen waste.",
    organ: "kidneys",
    how: "Blood carries urea from the liver to the kidneys. In each nephron the glomerulus lets small molecules, wastes and water pass out of the blood while proteins and blood cells stay in; the tubule then returns almost all the water and needed minerals to the blood and leaves the wastes behind.",
    out: "It leaves the body in urine.",
    parallel: "As a picture: the kidney keeps what is good and lets go of what harms, with great precision. Grace does not throw the person away with the sin; it keeps the person and removes the poison.",
    ref: "Psalm 51:2 (KJV): \"Wash me throughly from mine iniquity, and cleanse me from my sin.\"",
    source: "MedlinePlus (NIH), Ammonia Levels; NIDDK (NIH), Your Kidneys and How They Work",
    url: "https://medlineplus.gov/lab-tests/ammonia-levels/"
  },
  {
    id: "ammonia",
    waste: "Ammonia",
    from: "Ammonia is a normal waste product. Healthy gut bacteria make it when you digest protein in food.",
    organ: "liver",
    how: "Ammonia is toxic to the brain, so even small rises in the blood are dangerous. Blood brings it to the liver, which changes it into urea through a series of steps called the <strong>urea cycle</strong>. Liver disease is the most common cause of high ammonia levels.",
    out: "Once turned into urea, it travels to the kidneys and leaves in urine.",
    parallel: "As a picture: the liver does not hide the poison or wall it up; it transforms it into something that can be safely sent away. In the gospel, God does not merely tolerate what harms us but changes and removes it.",
    ref: "Ezekiel 36:26 (KJV): \"A new heart also will I give you, and a new spirit will I put within you.\"",
    source: "MedlinePlus (NIH), Ammonia Levels",
    url: "https://medlineplus.gov/lab-tests/ammonia-levels/"
  },
  {
    id: "creatinine",
    waste: "Creatinine",
    from: "Creatinine is made when you use your muscles and some muscle tissue breaks down. Everyone makes it all the time, more or less depending on muscle mass, diet, age and activity.",
    organ: "kidneys",
    how: "Creatinine travels in the blood to the kidneys, which filter it out. Because healthy kidneys clear it steadily, doctors use blood creatinine to estimate how fast the kidneys are filtering (the eGFR); if the kidneys struggle, creatinine builds up in the blood.",
    out: "It leaves the body in urine.",
    parallel: "As a picture: even the ordinary wear of a healthy, active life leaves residue that needs daily clearing. The gospel speaks of a cleansing that is ongoing, not a one-time bath that leaves us to fend for ourselves.",
    ref: "1 John 1:7 (KJV): \"the blood of Jesus Christ his Son cleanseth us from all sin.\"",
    source: "MedlinePlus (NIH), Creatinine Test",
    url: "https://medlineplus.gov/lab-tests/creatinine-test/"
  },
  {
    id: "water-and-salts",
    waste: "Excess water and salts",
    from: "Food and drink bring in more water and minerals than the body needs at any moment, and the balance of sodium, potassium, calcium and phosphorus must stay within narrow limits for nerves and muscles to work.",
    organ: "kidneys",
    how: "Healthy kidneys filter about 150 quarts (roughly 140 litres) of blood a day, then return most of the water and minerals to the blood and keep back only the excess. Only 1 to 2 quarts become urine. The skin helps too: sweat glands release water and salt, and when sweat evaporates it carries away heat that the blood has brought to the surface.",
    out: "It leaves mainly in urine, and partly in sweat.",
    parallel: "As a picture: the body is not cleansed by losing everything but by being brought back into balance. Healing in the gospel is restoration to wholeness, not the erasure of the person.",
    ref: "Psalm 23:3 (KJV): \"He restoreth my soul.\"",
    source: "NIDDK (NIH), Your Kidneys and How They Work; OpenStax, Anatomy and Physiology 2e, 5.3",
    url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work"
  },
  {
    id: "acids",
    waste: "Acids (pH balance)",
    from: "Most of the body's metabolic wastes, such as lactic acid and ketone bodies, are acids, and carbon dioxide itself forms carbonic acid in the blood.",
    organ: "kidneys",
    how: "Chemical buffers in the blood, especially bicarbonate, soak up extra acid within seconds. The lungs adjust blood pH within minutes by breathing out more carbon dioxide, and the kidneys do the slower, deeper work over hours to days by excreting hydrogen ions and returning bicarbonate to the blood.",
    out: "Excess acid leaves as hydrogen ions in urine, and as carbon dioxide in the breath.",
    parallel: "As a picture: the body has a gentle, layered response to what would sour it: quick relief, then steady correction. God's dealing with us is like this: immediate welcome and patient, deeper healing over time.",
    ref: "Philippians 1:6 (KJV): \"he which hath begun a good work in you will perform it until the day of Jesus Christ.\"",
    source: "OpenStax, Anatomy and Physiology 2e, 26.4 Acid-Base Balance",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/26-4-acid-base-balance"
  },
  {
    id: "toxins-drugs-alcohol",
    waste: "Toxins, drugs and alcohol",
    from: "Medicines, alcohol, chemicals and germs enter the blood from the gut, lungs or skin, and some harmful substances are made by the body itself.",
    organ: "liver",
    how: "The liver's biggest job is filtering harmful substances and waste from the blood, breaking down toxins and germs so they can safely leave. Alcohol is a clear example: most of it is broken down in the liver by the enzyme ADH into acetaldehyde, a toxic compound, which ALDH quickly turns into acetate; acetate is then broken down into carbon dioxide and water.",
    out: "The broken-down products leave in urine and stool (via bile), and alcohol's end products leave as carbon dioxide and water.",
    parallel: "As a picture: the liver does not punish the poison by keeping it; it absorbs the harm into itself and neutralises it. The relational gospel sees the cross this way: Christ takes our poison into himself and breaks its power, so that it leaves us.",
    ref: "John 1:29 (KJV): \"Behold the Lamb of God, which taketh away the sin of the world.\"",
    source: "Cleveland Clinic, Liver; NIAAA (NIH), Alcohol Metabolism",
    url: "https://www.niaaa.nih.gov/publications/alcohol-metabolism"
  },
  {
    id: "bilirubin",
    waste: "Bilirubin from old red cells",
    from: "Red blood cells live up to about 120 days. Worn-out cells are taken up by macrophages, mainly in the bone marrow, liver and spleen, and the non-iron part of their haem becomes biliverdin and then yellow bilirubin.",
    organ: "spleen",
    how: "Iron and protein from the old cells are recycled to build new ones. Bilirubin binds to albumin and travels in the blood to the liver, which puts it into bile; in the gut, bacteria turn it into stercobilin, which gives stool its brown colour, and the kidneys clear some related pigments into urine.",
    out: "It leaves mainly in stool, with a little in urine; if the liver cannot clear it, it builds up and causes jaundice.",
    parallel: "As a picture: when the old passes away, nothing of value is wasted; the iron is carried back to make new life. The gospel says the same of us: the old is not merely discarded but taken up into a new creation.",
    ref: "2 Corinthians 5:17 (KJV): \"old things are passed away; behold, all things are become new.\"",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes; MedlinePlus (NIH), Bilirubin Blood Test",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    id: "lactic-acid",
    waste: "Lactic acid",
    from: "Working muscles break down glycogen for quick energy, and when they work beyond their aerobic limit they produce lactic acid.",
    organ: "liver",
    how: "Blood carries the lactic acid away from the muscles. The bicarbonate buffer and faster breathing keep blood from becoming too acidic, and the liver uses the lactic acid to re-form glycogen (stored sugar), a loop known as the <strong>Cori cycle</strong> after Carl and Gerty Cori.",
    out: "It is not so much thrown out as recycled: the liver turns it back into fuel the body can use again.",
    parallel: "As a picture: some of what wears us down is not condemned but redeemed, turned back into strength. In God's hands even our exhaustion and failure can become part of new life.",
    ref: "Isaiah 40:31 (KJV): \"they that wait upon the LORD shall renew their strength.\"",
    source: "Britannica, Cori cycle; OpenStax, Anatomy and Physiology 2e, 26.4 Acid-Base Balance",
    url: "https://www.britannica.com/science/Cori-cycle"
  },
  {
    id: "pathogens-dead-cells",
    waste: "Pathogens and dead cells",
    from: "Bacteria and viruses get in through wounds, food and breath, and the body's own cells age, die and leave debris.",
    organ: "immune",
    how: "White blood cells patrol the blood and lymph. Lymph nodes, the “filters of the lymph”, catch bacteria from tissue fluid, and their macrophages and dendritic cells kill many of them; the spleen, the “filter of the blood”, uses macrophages to remove microbes and dying red cells from the bloodstream and launches immune responses to blood-borne germs.",
    out: "Pathogens and debris are destroyed inside phagocytes, and useful parts of dead cells, such as iron and amino acids, are recycled.",
    parallel: "As a picture: the body's defenders go to where the harm is and deal with it there, rather than abandoning the wounded part. Christ comes to the place of our sickness, not away from it.",
    ref: "Psalm 103:3 (KJV): \"Who forgiveth all thine iniquities; who healeth all thy diseases.\"",
    source: "OpenStax, Anatomy and Physiology 2e, 21.1 Anatomy of the Lymphatic and Immune Systems",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/21-1-anatomy-of-the-lymphatic-and-immune-systems"
  }
];

RG.blOrgans = [
  {
    id: "lungs",
    label: "Lungs",
    role: "The lungs take in oxygen and release carbon dioxide, the main waste of cellular respiration. By changing how much carbon dioxide we breathe out, they also adjust blood pH within minutes.",
    fact: "About 70% of the carbon dioxide that enters the blood reaches the lungs as bicarbonate (OpenStax, Anatomy and Physiology 2e, 22.5).",
    parallel: "As a picture, every breath out is a small release: what would harm us is let go, and new life is breathed in."
  },
  {
    id: "kidneys",
    label: "Kidneys",
    role: "The kidneys filter the blood, removing wastes such as urea and creatinine, extra water and acid, and keeping the balance of salts and minerals. They also make hormones that help control blood pressure, make red blood cells and keep bones strong.",
    fact: "Each kidney has about a million nephrons; together they filter about 150 quarts of blood a day, of which only 1 to 2 quarts become urine (NIDDK, NIH).",
    parallel: "As a picture, the kidneys hold on to everything good and release only what harms, which is how grace treats a person."
  },
  {
    id: "liver",
    label: "Liver",
    role: "The liver's biggest job is filtering harmful substances and waste from the blood, breaking down toxins, drugs, alcohol and germs, and turning toxic ammonia into urea. It also makes bile, which carries bilirubin and other wastes into the gut.",
    fact: "The liver is the largest internal organ and one of the only organs that can regenerate itself (Cleveland Clinic).",
    parallel: "As a picture, the liver takes poison into itself and transforms it, much as the gospel says Christ took our harm into himself to break its power."
  },
  {
    id: "spleen",
    label: "Spleen",
    role: "The spleen is a major lymphoid organ that filters the blood, using macrophages to remove microbes and worn-out red blood cells. It is also where the body mounts immune responses to germs in the bloodstream.",
    fact: "The spleen is about 12 cm (5 in) long and is sometimes called the “filter of the blood” (OpenStax, Anatomy and Physiology 2e, 21.1).",
    parallel: "As a picture, the spleen lets the old pass away while carrying its iron back to make something new."
  },
  {
    id: "skin",
    label: "Skin",
    role: "The skin is a barrier against germs and chemicals, and its sweat glands release water, salt and other substances. When the body is hot, skin blood vessels widen so the blood can shed heat, and evaporating sweat cools the body.",
    fact: "Even when we do not notice sweating, about 500 mL of sweat a day is secreted; an active person in the heat can sweat 0.7 to 1.5 litres an hour (OpenStax, Anatomy and Physiology 2e, 5.3).",
    parallel: "As a picture, the skin lets heat and excess go rather than trapping them inside, a sign of a body made to release what burdens it."
  },
  {
    id: "immune",
    label: "Immune system and lymph nodes",
    role: "The immune and lymphatic systems drain extra fluid back into the blood and filter pathogens out of it. White blood cells, lymph nodes and lymphoid tissue find, kill and remember invaders while (ideally) leaving the body's own cells unharmed.",
    fact: "Humans have about 500 to 600 lymph nodes, and the body contains roughly a trillion (10 to the 12th power) lymphocytes (OpenStax, Anatomy and Physiology 2e, 21.1).",
    parallel: "As a picture, the immune system is love that protects: it goes toward the harm, deals with it, and guards the whole body."
  }
];

RG.blWasteQA = [
  {
    id: "cleansing-system",
    q: "How does blood carry waste and toxins to the organs that filter and remove them, and what does this picture about the gospel?",
    short: "Blood is the body's cleansing transport: it collects carbon dioxide, urea, acids, toxins and worn-out cells from every tissue and carries them to the lungs, kidneys, liver, spleen, skin and immune system, which breathe them out, filter them, transform them or recycle them. As an analogy, this pictures a gospel in which sin is not hidden inside us but carried away, and in which cleansing is ongoing life, not a single transaction.",
    sections: [
      {
        title: "What many of us were taught",
        body: [
          "Many of us learned to think about blood in church only in terms of sacrifice and payment: something had to die, blood had to be shed, a debt had to be settled. That is a real thread in Scripture, and it should not be dismissed. But it can leave us with a picture of God as the one who needs the blood, rather than the one who gives it.",
          "Leviticus says something striking: “the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls” (Lev 17:11, KJV). The gift moves from God toward us. Looking at what blood actually does in the body can help us hear that verse afresh."
        ]
      },
      {
        title: "What the body actually does",
        body: [
          "Every cell makes waste just by living. Blood picks it up and carries it to the right place. Carbon dioxide travels to the lungs, about 70% of it as bicarbonate, and is breathed out. Ammonia from protein breakdown goes to the liver, which turns it into urea; the blood then carries urea and creatinine to the kidneys, which filter about 150 quarts of blood a day and keep back only 1 to 2 quarts as urine.",
          "The liver breaks down toxins, drugs, alcohol and germs so they can leave in urine and stool. Old red cells are taken apart in the spleen, liver and bone marrow: the iron is recycled to make new cells, and the yellow pigment bilirubin goes to the liver and out in bile. Lactic acid from hard-working muscles is carried to the liver and turned back into stored fuel. White cells, lymph nodes and the spleen catch and destroy germs. The skin sheds heat, water and salt through sweat.",
          "None of this is a single event. It happens every second, for as long as we live, and it works because the blood keeps moving."
        ]
      },
      {
        title: "Scripture in context: cleansing language",
        body: [
          "The Bible's cleansing words are physical words first. David prays, “Wash me throughly from mine iniquity, and cleanse me from my sin… Purge me with hyssop, and I shall be clean” (Ps 51:2, 7, KJV), drawing on the hyssop used to sprinkle in Israel's purification rites. Ezekiel promises, “Then will I sprinkle clean water upon you, and ye shall be clean… A new heart also will I give you” (Ezek 36:25-26, KJV).",
          "The New Testament keeps the same picture. Hebrews says the blood of Christ will “purge your conscience from dead works to serve the living God” (Heb 9:14, KJV); the Greek verb is <em>katharizō</em>, to cleanse. And 1 John 1:7 uses the present tense: the blood of Jesus “cleanseth us from all sin”, an ongoing action, as long as we walk in the light."
        ]
      },
      {
        title: "The relational reading, and its limits",
        body: [
          "As an analogy, the body pictures a gospel in which God is not the one demanding blood but the one giving life through it. The blood does not change the body's attitude toward its cells; it carries life to them and carries poison away from them. In the relational gospel, Christ's self-giving does not change the Father's mind about us; it is the Father's love reaching us, cleansing and healing from within (2 Cor 5:19).",
          "A fair counter-view: penal-substitution readings stress that Scripture also uses legal and sacrificial language (Rom 3:25; Isa 53:5), and that a cleansing picture alone can underplay the seriousness of guilt. That is worth hearing. Many relational voices answer that the legal and the cleansing pictures need not compete, but that the cleansing picture keeps the legal one from turning God into the problem.",
          "And the analogy has limits. Biology does not prove theology. Nor does illness mean someone is spiritually unclean: when the disciples asked who had sinned, Jesus said, “Neither hath this man sinned, nor his parents” (John 9:3, KJV). A failing liver or kidney is a medical matter, not a moral verdict."
        ]
      },
      {
        title: "What to do with this",
        body: [
          "Bring what is poisoning you into the light rather than storing it. The body gets into trouble when waste cannot leave; so do we. Confession is not reporting to an angry judge but letting the cleansing flow reach the place that needs it (1 John 1:9; Jas 5:16).",
          "Trust the ongoing work. You do not need to manufacture a fresh conversion every time you fail. Cleansing in Christ is more like a steady circulation than a series of emergency rescues (Phil 1:6). And care for your actual body too: drink water, move, rest, and see a doctor if something seems wrong. Honouring the body's design is part of honouring the Designer."
        ]
      }
    ],
    refs: ["Lev 17:11", "Ps 51:2", "Ps 51:7", "Ps 51:10", "Ezek 36:25-26", "Heb 9:14", "1 John 1:7", "1 John 1:9", "2 Cor 5:19", "Rom 3:25", "Isa 53:5", "John 9:3", "Jas 5:16", "Phil 1:6"],
    evidence: [
      {
        text: "About 70 percent of carbon dioxide is carried to the lungs as bicarbonate, made in red cells by carbonic anhydrase; about 20 percent is bound to haemoglobin and 7 to 10 percent dissolves in plasma. In the lung capillaries the reaction reverses and carbon dioxide diffuses into the alveoli to be exhaled.",
        source: "OpenStax, Anatomy and Physiology 2e, 22.5 Transport of Gases",
        url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-5-transport-of-gases"
      },
      {
        text: "“Normally, your liver changes ammonia into another waste product called urea. Your kidneys get rid of urea in urine (pee). This process is called the urea cycle.” Ammonia is “toxic (poisonous) to your brain.”",
        source: "MedlinePlus (NIH), Ammonia Levels",
        url: "https://medlineplus.gov/lab-tests/ammonia-levels/"
      },
      {
        text: "Each kidney has about a million nephrons; the glomerulus filters the blood and the tubule returns needed substances and removes wastes. The kidneys filter about 150 quarts of blood a day, and only 1 to 2 quarts become urine.",
        source: "NIDDK (NIH), Your Kidneys and How They Work",
        url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work"
      }
    ]
  },
  {
    id: "hidden-or-removed",
    q: "Does God hide sin, cover it, or carry it away? What the body's cleansing system pictures about forgiveness and healing (Ps 103:12; Mic 7:19; John 1:29; 1 John 1:7, 9; Heb 9:14; Isa 1:18).",
    short: "Scripture uses several pictures for forgiveness, including covering, but its strongest images are of sin removed, carried off, cast away and washed out. As an analogy, the body never deals with poison by hiding it; it carries it to be neutralised and sent out, and that pictures a forgiveness that heals rather than merely conceals.",
    sections: [
      {
        title: "What many of us were taught",
        body: [
          "A common way of putting the gospel goes like this: God cannot look at sin, so when he looks at a believer he sees only Jesus. Our sin is still there underneath, but it is covered, so God treats us as if it were not. Some people find comfort in that. Others are left feeling that they are still, deep down, something God has to avoid looking at.",
          "That picture raises a real question. Does God hide sin, cover it like a blanket over a stain, or actually take it away? The Bible's own words are worth looking at carefully."
        ]
      },
      {
        title: "Scripture in context: the words for forgiveness",
        body: [
          "Covering language is real. “Blessed is he whose transgression is forgiven, whose sin is covered” (Ps 32:1, KJV). The Hebrew <em>kipper</em>, usually translated “make atonement”, has been read as “cover”, “wipe clean” or “ransom”, and scholars still debate which sense is primary. But in the same psalm David says, “mine iniquity have I not hid” (Ps 32:5, KJV), and Proverbs warns, “He that covereth his sins shall not prosper” (Prov 28:13, KJV). God's covering is never our hiding.",
          "Most of the other pictures are about removal. “As far as the east is from the west, so far hath he removed our transgressions from us” (Ps 103:12). “Thou wilt cast all their sins into the depths of the sea” (Mic 7:19). On the Day of Atonement the goat “shall bear upon him all their iniquities unto a land not inhabited” (Lev 16:22). John the Baptist points to “the Lamb of God, which taketh away the sin of the world” (John 1:29); the Greek <em>airō</em> means to lift up and carry off.",
          "And then cleansing: “though your sins be as scarlet, they shall be as white as snow” (Isa 1:18, KJV). “If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness” (1 John 1:9, KJV). The blood of Christ will “purge your conscience” (Heb 9:14). Hebrews even says the old sacrifices could not do this: “it is not possible that the blood of bulls and of goats should take away sins” (Heb 10:4, KJV). The goal was always removal, not concealment."
        ]
      },
      {
        title: "What the body pictures",
        body: [
          "As an analogy, think of how the body handles poison. It never stores ammonia in a hidden corner and hopes the brain will not notice; that would be deadly. The blood carries it to the liver, which transforms it into urea, and the kidneys send it out. Carbon dioxide is not covered over; it is breathed away. When bilirubin is not cleared, it does not stay hidden; it shows up as jaundice. In the body, hidden waste is a sign of sickness, and cleared waste is a sign of health.",
          "That is the picture the relational gospel draws on. Forgiveness is not God pretending not to see. It is God seeing clearly, loving fully, and taking the poison away so that we can be healed. “Who forgiveth all thine iniquities; who healeth all thy diseases” (Ps 103:3, KJV): forgiveness and healing belong together."
        ]
      },
      {
        title: "A fair counter-view, and a response",
        body: [
          "Reformed and evangelical theology speaks of justification as a legal declaration, in which Christ's righteousness is credited to the believer (Rom 4:5-8, which quotes Ps 32:1). That is not meant as mere hiding: the same traditions teach that God also regenerates and sanctifies, changing the person from within. The trouble usually comes from a popular version that keeps the legal declaration and loses the healing.",
          "The relational reading does not deny the legal language, but holds that it serves the deeper purpose of union and healing. God does not need sin hidden in order to love us; he loved us “while we were yet sinners” (Rom 5:8). The cross is God carrying our poison into himself and away, not God finding a way to avoid looking at us."
        ]
      },
      {
        title: "What to do with this",
        body: [
          "Stop hiding, because God is not. Bring the real thing into the light, with God and, where it helps, with a trusted friend (Jas 5:16). Confession is how the poison reaches the place where it can be dealt with.",
          "Let forgiveness lead to healing. If you have wronged someone, make it right where you safely can; if you have been harmed, forgiveness does not mean hiding the harm or staying in danger. Bring abuse into the light and get safe and proper help. And when shame says you are still dirty underneath, answer with what God says: removed, cast into the sea, washed white, cleansed from all."
        ]
      }
    ],
    refs: ["Ps 32:1-5", "Prov 28:13", "Ps 103:3", "Ps 103:12", "Mic 7:19", "Lev 16:21-22", "John 1:29", "Isa 1:18", "1 John 1:7", "1 John 1:9", "Heb 9:14", "Heb 10:4", "Rom 4:5-8", "Rom 5:8", "Jas 5:16"],
    evidence: [
      {
        text: "Bilirubin, made when old red cells are broken down, binds to albumin and travels in the blood to the liver, which puts it into bile; it then leaves in the feces. “With a failing liver, bilirubin cannot be removed effectively from circulation and causes the body to assume a yellowish tinge associated with jaundice.”",
        source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
        url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
      },
      {
        text: "“Even small increases in the level of ammonia in your blood can cause permanent brain damage, coma, and even death.” Normally the liver changes ammonia into urea, which the kidneys remove in urine.",
        source: "MedlinePlus (NIH), Ammonia Levels",
        url: "https://medlineplus.gov/lab-tests/ammonia-levels/"
      }
    ]
  }
];

RG.blEvidence4 = [
  {
    text: "Carbon dioxide is carried in three ways: about 70% as bicarbonate, about 20% bound to haemoglobin as carbaminohaemoglobin, and about 7 to 10% dissolved in plasma. At the lungs the bicarbonate reaction is reversed and carbon dioxide is exhaled.",
    source: "OpenStax, Anatomy and Physiology 2e, 22.5 Transport of Gases",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-5-transport-of-gases"
  },
  {
    text: "The kidneys remove wastes, extra fluid and acid, and keep the balance of water, salts and minerals. Each has about a million nephrons; together they filter about 150 quarts of blood a day, and only 1 to 2 quarts become urine.",
    source: "NIDDK (NIH), Your Kidneys and How They Work",
    url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work"
  },
  {
    text: "Ammonia is a normal waste product made by gut bacteria when protein is digested. The liver changes it into urea, which the kidneys remove in urine; this is the urea cycle. Liver disease is the most common cause of high ammonia.",
    source: "MedlinePlus (NIH), Ammonia Levels",
    url: "https://medlineplus.gov/lab-tests/ammonia-levels/"
  },
  {
    text: "Creatinine is a normal waste product made when muscles are used and some muscle tissue breaks down. The kidneys filter it from the blood into urine, and blood creatinine is used to estimate kidney filtering (eGFR).",
    source: "MedlinePlus (NIH), Creatinine Test",
    url: "https://medlineplus.gov/lab-tests/creatinine-test/"
  },
  {
    text: "The liver's biggest job is filtering harmful substances and waste from the blood; it breaks down toxins and germs so they safely leave the body in urine and stool. It is the largest internal organ and one of the only organs that can regenerate itself.",
    source: "Cleveland Clinic, Liver",
    url: "https://my.clevelandclinic.org/health/body/21481-liver"
  },
  {
    text: "Most alcohol is broken down in the liver by alcohol dehydrogenase (ADH) into acetaldehyde, a toxic compound and known carcinogen, which aldehyde dehydrogenase (ALDH) turns into acetate; acetate is then broken down into carbon dioxide and water, mainly in tissues other than the liver.",
    source: "NIAAA (NIH), Alcohol Metabolism",
    url: "https://www.niaaa.nih.gov/publications/alcohol-metabolism"
  },
  {
    text: "Worn-out red cells (after up to 120 days) are removed by macrophages, mainly in the bone marrow, liver and spleen. Iron and amino acids are recycled; bilirubin travels on albumin to the liver, goes into bile and leaves in the feces as stercobilin.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    text: "Blood buffers adjust pH within seconds, the lungs within minutes by exhaling CO2, and the kidneys over hours to days by excreting hydrogen ions and conserving bicarbonate. Most metabolic wastes, such as lactic acid and ketone bodies, are acids.",
    source: "OpenStax, Anatomy and Physiology 2e, 26.4 Acid-Base Balance",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/26-4-acid-base-balance"
  },
  {
    text: "Lymph nodes are “filters of the lymph”, where macrophages and dendritic cells kill many pathogens. The spleen, about 12 cm long, is the “filter of the blood”, removing microbes and dying red cells. Humans have about 500 to 600 lymph nodes.",
    source: "OpenStax, Anatomy and Physiology 2e, 21.1 Anatomy of the Lymphatic and Immune Systems",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/21-1-anatomy-of-the-lymphatic-and-immune-systems"
  },
  {
    text: "About 500 mL of sweat is secreted a day even without noticeable sweating, and up to 0.7 to 1.5 L an hour in an active person. Dermal arterioles widen so excess heat carried by the blood can leave through the skin.",
    source: "OpenStax, Anatomy and Physiology 2e, 5.3 Functions of the Integumentary System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/5-3-functions-of-the-integumentary-system"
  }
];
