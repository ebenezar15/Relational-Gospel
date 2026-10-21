window.RG = window.RG || {};
var RG = window.RG;

/* Round 17: "The life is in the blood" (part 1: biology, journey, facts).
   Spiritual parallels are analogies, not proofs. Numbers verified 2026-10 on the pages cited. */

RG.blParts = [
  {
    id: "plasma",
    label: "Plasma",
    pct: 55,
    body: "Plasma is the pale, straw-coloured liquid part of blood, about 55% of its volume and roughly 92% water. It carries blood cells, proteins, salts, nutrients, hormones and dissolved gases around the body, and takes waste products to the kidneys and liver to be removed. It also helps keep body temperature, pH and fluid balance steady.",
    parallel: "As an analogy, plasma is like the river of grace that carries everything else: nothing in the blood gets anywhere unless it is held and carried. In the relational gospel, we do not carry ourselves to God; we are carried in the life the Father, Son and Spirit share.",
    ref: "John 7:38 (KJV): \"He that believeth on me, as the scripture hath said, out of his belly shall flow rivers of living water.\""
  },
  {
    id: "red",
    label: "Red blood cells",
    pct: 44,
    body: "Red blood cells (erythrocytes) make up about 44% of blood. They are packed with <strong>haemoglobin</strong>, an iron-containing protein that picks up oxygen in the lungs and releases it in the tissues; they also carry some carbon dioxide back to the lungs. They have no mitochondria, so they use none of the oxygen they carry and deliver it all to the body.",
    parallel: "As an analogy, red cells give away everything they carry and keep nothing for themselves, which is a picture of self-giving love. Scripture links blood with life itself, and says God <em>gave</em> it: the gift moves from God toward us.",
    ref: "Leviticus 17:11 (KJV): \"For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls.\""
  },
  {
    id: "white",
    label: "White blood cells",
    pct: 0.5,
    body: "White blood cells (leukocytes) are part of the immune system. There are five main types; neutrophils are the most common, and lymphocytes (B cells, T cells and natural killer cells) give targeted, long-remembered immunity. White cells and platelets together are only about 1% of blood; the 0.5% shown here is a display split, not a measured figure.",
    parallel: "As an analogy, white cells are a picture of a love that protects: they leave the bloodstream and go to where the harm is. The relational gospel sees God not as the threat we need protecting from but as the one who guards and heals us.",
    ref: "Psalm 121:7 (KJV): \"The LORD shall preserve thee from all evil: he shall preserve thy soul.\""
  },
  {
    id: "platelets",
    label: "Platelets",
    pct: 0.5,
    body: "Platelets (thrombocytes) are tiny cell fragments released from large bone-marrow cells called megakaryocytes. When a blood vessel is damaged, they are first on the scene, working with clotting proteins in the plasma to seal the break, and they release growth factors that help tissue repair. Together with white cells they make up about 1% of blood; the 0.5% here is a display split only.",
    parallel: "As an analogy, platelets rush to a wound and bind it up rather than avoid it. That is a picture of a God who moves toward our brokenness, not away from it.",
    ref: "Psalm 147:3 (KJV): \"He healeth the broken in heart, and bindeth up their wounds.\""
  }
];

RG.blStations = [
  {
    id: "heart",
    label: "Heart",
    body: "The heart is a fist-sized muscular pump with four chambers. The right side sends oxygen-poor blood to the lungs; the left ventricle generates the high pressure that sends oxygen-rich blood out through the aorta to the whole body. Valves open and close in time with each beat so blood flows only one way.",
    parallel: "As an analogy, the heart is the steady, unforced centre from which life flows outward. In the relational gospel, the life we receive flows from the heart of the Father, who loves first and keeps on loving.",
    ref: "Proverbs 4:23 (KJV): \"Keep thy heart with all diligence; for out of it are the issues of life.\""
  },
  {
    id: "lungs",
    label: "Lungs",
    body: "In the pulmonary circuit, blood passes through the lungs, where carbon dioxide leaves the blood to be breathed out and oxygen binds to haemoglobin. Oxygen-rich blood turns bright red and returns to the left side of the heart through the pulmonary veins, ready to be pumped to the body.",
    parallel: "As an analogy, the lungs are where the old is breathed out and new life is breathed in. Scripture pictures human life itself, and the gift of the Spirit, as God's breath.",
    ref: "Genesis 2:7 (KJV): \"and breathed into his nostrils the breath of life; and man became a living soul.\""
  },
  {
    id: "arteries",
    label: "Arteries",
    body: "Arteries are strong, muscular vessels that carry oxygen-rich blood away from the heart; the pulmonary arteries, which carry blood to the lungs, are the exception. They branch into smaller arterioles, which widen or narrow to help keep blood pressure steady as blood heads toward the tissues.",
    parallel: "As an analogy, arteries carry life outward to every part of the body without first asking whether each part deserves it. The relational gospel reads the good news the same way: life sent out to all.",
    ref: "John 10:10 (KJV): \"I am come that they might have life, and that they might have it more abundantly.\""
  },
  {
    id: "cells",
    label: "Every cell",
    body: "Capillaries, the smallest and thinnest-walled vessels, connect arteries to veins and act as transfer stations. Oxygen and nutrients pass out to the cells, and carbon dioxide and other wastes pass in to be carried away. Red cells sometimes have to fold to squeeze through, and the narrow space slows them, giving more time for exchange.",
    parallel: "As an analogy, the capillaries bring life close enough to touch every single cell, and take away what would harm it. The incarnation is God coming that close: not from a distance, but into the smallest places of human life.",
    ref: "Acts 17:28 (KJV): \"For in him we live, and move, and have our being.\""
  },
  {
    id: "veins",
    label: "Veins",
    body: "From the capillaries, blood gathers into venules and then veins, which carry oxygen-poor blood back toward the heart. The two largest, the superior and inferior venae cavae, bring it into the right atrium, from where it is sent to the lungs again.",
    parallel: "As an analogy, the veins are the road home: blood that has given itself away is not abandoned but brought back to be renewed. It is a picture of the father running to meet the returning son.",
    ref: "Luke 15:20 (KJV): \"But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.\""
  },
  {
    id: "kidneys",
    label: "Kidneys",
    body: "Each kidney has about a million filtering units called nephrons. The glomerulus filters the blood and the tubule returns what the body needs and removes wastes and extra water as urine; the kidneys also balance salts and acid and make hormones, including one that helps make red blood cells. NIDDK says the kidneys filter about 150 quarts of blood a day, of which only 1 to 2 quarts become urine.",
    parallel: "As an analogy, the kidneys cleanse the blood again and again, every day, not once. 1 John 1:7 uses the present tense: the blood of Jesus <em>keeps on cleansing</em>. (In the KJV, \"reins\" means the kidneys, pictured as the seat of the inner self.)",
    ref: "Psalm 26:2 (KJV): \"Examine me, O LORD, and prove me; try my reins and my heart.\""
  },
  {
    id: "liver",
    label: "Liver",
    body: "Most nutrients absorbed from the gut travel first to the liver, which processes them before releasing them to the body. The liver filters harmful substances from the blood and breaks down toxins so they can leave the body; it makes clotting factors and albumin, and turns bilirubin from worn-out red cells into bile.",
    parallel: "As an analogy, the liver quietly takes in what is toxic and makes it harmless. Hebrews speaks of Christ's blood cleansing not only the body but the conscience, freeing us to serve the living God.",
    ref: "Hebrews 9:14 (KJV): \"How much more shall the blood of Christ... purge your conscience from dead works to serve the living God?\""
  },
  {
    id: "marrow",
    label: "Bone marrow",
    body: "Blood cells begin as stem cells in the red bone marrow, the spongy tissue inside bones. The marrow makes more than 2 million red cells every second. Worn-out red cells are removed after about 120 days, and much of their iron is carried back to the marrow to be used in new cells.",
    parallel: "As an analogy, the body never runs out of new life: old cells are retired and their iron is recycled into new ones. It is a picture of new creation, where nothing given to God is wasted.",
    ref: "Lamentations 3:22-23 (KJV): \"his compassions fail not. They are new every morning: great is thy faithfulness.\""
  },
  {
    id: "wound",
    label: "The wound",
    body: "When a vessel is torn, platelets gather at the break and, with clotting proteins such as fibrinogen from the plasma, form a plug and clot that stop the bleeding. White cells move out of the vessels toward the injury to deal with germs and debris, and platelets release growth factors that help the tissue repair.",
    parallel: "As an analogy, the whole bloodstream turns toward the wound to heal it. In the relational gospel, the cross is where God enters our deepest wound, and by his wounds we are healed.",
    ref: "Isaiah 53:5 (KJV): \"the chastisement of our peace was upon him; and with his stripes we are healed.\""
  }
];

RG.blFacts = [
  {
    id: "volume",
    num: "~5 L",
    label: "Blood in an adult body",
    text: "The average adult male has about 5 litres (10.5 pints) of blood and the average adult female about 4 litres (8.5 pints). Blood makes up about 8% of body weight.",
    source: "Cleveland Clinic, Blood",
    url: "https://my.clevelandclinic.org/health/body/24836-blood"
  },
  {
    id: "red-lifespan",
    num: "120 days",
    label: "Lifespan of a red blood cell",
    text: "Red blood cells live up to about 120 days in circulation. Then macrophages, mainly in the bone marrow, liver and spleen, remove them and recycle parts such as iron.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    id: "red-production",
    num: "2 million/sec",
    label: "Red cells made every second",
    text: "Bone marrow produces red blood cells at \"the staggering rate of more than 2 million cells per second\". It needs iron, copper, zinc, folate and vitamin B12 to do it.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    id: "kidney-filtration",
    num: "~150 qt",
    label: "Blood filtered by the kidneys each day",
    text: "NIDDK says the kidneys filter about 150 quarts (about 140 litres) of blood a day, and only 1 to 2 quarts become urine; the rest is returned to the blood. Figures vary by source: the OpenStax textbook gives about 180 litres.",
    source: "NIDDK (NIH), Your Kidneys and How They Work",
    url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work"
  },
  {
    id: "cardiac-output",
    num: "~5 L/min",
    label: "Blood pumped by the heart at rest",
    text: "At an average resting rate of about 75 beats per minute and about 70 mL per beat, each ventricle pumps about 5.25 litres a minute. At that rate the heart beats more than 100,000 times a day (75 x 1,440 minutes).",
    source: "OpenStax, Anatomy and Physiology 2e, 19.4 Cardiac Physiology",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-4-cardiac-physiology"
  },
  {
    id: "vessel-length",
    num: "~60,000 mi",
    label: "Length of blood vessels",
    text: "Cleveland Clinic says the body contains about 60,000 miles of blood vessels, most of them tiny capillaries, venules and arterioles. This is a widely quoted rough estimate, not a precise measurement.",
    source: "Cleveland Clinic, Blood Vessels",
    url: "https://my.clevelandclinic.org/health/body/21640-blood-vessels"
  },
  {
    id: "haemoglobin",
    num: "1.2 billion",
    label: "Oxygen molecules one red cell can carry",
    text: "One red blood cell may contain about 300 million haemoglobin molecules. Each haemoglobin can carry four oxygen molecules, so one cell can carry up to about 1.2 billion.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    id: "white-cells",
    num: "5,000-10,000",
    label: "White blood cells per microlitre",
    text: "There are usually only 5,000 to 10,000 white blood cells per microlitre of blood, far fewer than red cells. Neutrophils, the fast responders to infection, make up 50 to 70% of them.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.4 Leukocytes and Platelets",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-4-leukocytes-and-platelets"
  },
  {
    id: "platelets",
    num: "~10 days",
    label: "Lifespan of a platelet",
    text: "Platelets stay in circulation for only about 10 days (Cleveland Clinic says about a week). About a third are stored in the spleen, ready for release when a vessel is damaged.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.4 Leukocytes and Platelets",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-4-leukocytes-and-platelets"
  },
  {
    id: "circuit",
    num: "~1 min",
    label: "Rough time to pump the whole blood volume once",
    text: "At rest the heart pumps about 5 litres a minute, roughly the whole adult blood volume, so on average the blood goes round about once a minute. This is a rough estimate worked out from those two figures; some routes are much shorter and others longer.",
    source: "OpenStax, Anatomy and Physiology 2e, 19.4 Cardiac Physiology (with Cleveland Clinic blood volume)",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-4-cardiac-physiology"
  }
];

RG.blEvidence1 = [
  {
    text: "Blood has four parts. Plasma is about 55% of blood, red blood cells about 44%, and white blood cells and platelets together about 1%.",
    source: "Cleveland Clinic, Blood",
    url: "https://my.clevelandclinic.org/health/body/24836-blood"
  },
  {
    text: "Plasma is about 92% water. When blood is spun in a centrifuge, the white cells and platelets form a thin \"buffy coat\" that is normally less than 1% of the sample.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.1 An Overview of Blood",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-1-an-overview-of-blood"
  },
  {
    text: "Blood carries nutrients, oxygen and hormones, and it takes carbon dioxide to the lungs and other wastes to the kidneys and liver for removal. It also helps regulate body temperature, pH (normally 7.35 to 7.45) and the water content of cells.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.1 An Overview of Blood",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-1-an-overview-of-blood"
  },
  {
    text: "Red blood cells have no mitochondria, so they do not use any of the oxygen they carry and can deliver all of it to the tissues.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    text: "When red cells wear out, the iron in their haemoglobin can be stored or carried back to the red bone marrow to be recycled into new red cells.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    text: "The kidneys filter about 180 litres of blood a day (about 20% of the resting blood flow), and they sense low oxygen and release EPO, which raises red cell production.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.3 Erythrocytes",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes"
  },
  {
    text: "Each kidney has about a million nephrons. The glomerulus filters the blood, and the tubule returns needed substances to the blood and removes wastes.",
    source: "NIDDK (NIH), Your Kidneys and How They Work",
    url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work"
  },
  {
    text: "The liver's biggest job is filtering harmful substances and waste from the blood. It also breaks down toxins and makes proteins such as clotting factors and albumin.",
    source: "Cleveland Clinic, Liver",
    url: "https://my.clevelandclinic.org/health/body/21481-liver"
  },
  {
    text: "When a vessel is damaged, platelets and clotting proteins in the plasma work together to block the break. Platelets also release growth factors that help tissue heal and repair.",
    source: "OpenStax, Anatomy and Physiology 2e, 18.4 Leukocytes and Platelets",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/18-4-leukocytes-and-platelets"
  },
  {
    text: "Oxygen-poor blood enters the right side of the heart and is pumped to the lungs, which add oxygen. The oxygen-rich blood returns to the left side, and the left ventricle pumps it to the whole body through the aorta.",
    source: "NHLBI (NIH), How Blood Flows through the Heart",
    url: "https://www.nhlbi.nih.gov/health/heart/blood-flow"
  }
];
