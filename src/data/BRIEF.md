# Content brief for "Relational Gospel Atlas" data files

The app is an interactive, animated study atlas presenting the **relational / incarnational / Trinitarian gospel** (the stream associated with themes like Christ as "perfect theology", union not separation, the cruciform hermeneutic, Trinitarian inclusion, hopeful universalism / apokatastasis). Voices in this stream and its roots: Irenaeus, Athanasius, Gregory of Nazianzus, Gregory of Nyssa, Origen, Maximus the Confessor, Julian of Norwich, George MacDonald, Karl Barth, T.F. Torrance, J.B. Torrance, C. Baxter Kruger (The Great Dance, Jesus and the Undoing of Adam, Across All Worlds), Brad Jersak (A More Christlike God), Greg Boyd (Crucifixion of the Warrior God), Brian Zahnd, Andre Rabe, Francois du Toit (Mirror Bible), Richard Rohr, David Bentley Hart (That All Shall Be Saved), Robin Parry, Thomas Talbott, Steve McVey, Wm. Paul Young.

## Voice
- The app speaks sincerely from the relational-gospel perspective, warmly and clearly, for ordinary readers (not academics). Short paragraphs, plain words.
- It is ALSO fair: give real counter-arguments from traditional/evangelical/Reformed views, and say where something is debated.
- Be historically and linguistically accurate. Never invent quotes, statistics, or book titles. Flag debated scholarly claims as debated. Known traps:
  - The "eye of the needle gate" is a medieval myth; say so if mentioned.
  - "Perichoresis" does not etymologically mean "dance" (that's perichoreuō); Kruger and others use "dance" as an image. Say so honestly.
  - Walter Wink's backhand-slap reading of "turn the other cheek" is a scholarly interpretation, not settled fact.
  - The 553 Council anathemas targeted a specific Origenist system (pre-existence of souls etc.); whether they condemn universal restoration as such is debated.
  - The "Manifest Sons of God" Latter Rain movement (1940s–50s) is distinct from a Romans 8:19 reading of creation awaiting the revealing of God's children; distinguish them.
  - The moral/civil/ceremonial division of the Law is a later Christian categorisation (Aquinas, Calvin); Jewish tradition counts 613 mitzvot without that split.
- Bible quotations: use the **World English Bible (WEB)** or **KJV** wording (public domain), or clearly paraphrase. Keep quotes short (one or two verses).
- Allowed inline HTML in strings: `<em>`, `<strong>` only. No other markup, no markdown.

## File format
Each file is plain browser JavaScript, no imports/exports:
```js
window.RG = window.RG || {};
RG.someKey = [ { ... }, ... ];
```
Use double-quoted or backtick strings; escape carefully. Every `id` is lowercase-kebab and unique within its array.

When done, validate with:
`node -e "global.window={};require('/home/user/Relational-Gospel/src/data/FILE.js');console.log(Object.keys(window.RG).map(k=>k+':'+window.RG[k].length))"`
and fix until it passes. Do not touch other files. Do not commit.

## Format fix (round 2)
Start every file with:
```js
window.RG = window.RG || {};
var RG = window.RG;
```
To ADD items to an existing array (e.g. themes) use `RG.themes = (RG.themes || []).concat([ ... ]);`.

## Research notes (verified 2026-10, use these, do not embellish)
- **Tommy Miller**: co-founder and pastor of Legacy Church International (New Philadelphia, Ohio) and the New Creation Collective ("a global ministry ecosystem dedicated to union with Christ, new creation identity, and embodied transformation"). Earlier book: *Unveiled*.
- **Sacred Biology** (Tommy Miller, with Jen Porter and Bobby Shane Brooks, 2026), subtitle "Reclaiming the body as God's chosen instrument for healing, wholeness, and the kingdom now". Publisher description: combines New Creation theology, nervous-system science and embodied transformation; challenges a gospel that "rescues the soul while leaving the body behind" and treats sickness as a teacher, death as a promotion and heaven as escape; claims God's plan moves through bodies (forming them, entering one in the Incarnation, redeeming them, filling them with the Spirit); "healing is not a perk of salvation, it is the embodiment of it"; God does not use disease to discipline his children; move from "faith toward God" to "the faith of God"; the body "not a souvenir of Adam but a sanctuary for Christ"; embodied expression flowing from union, not guilt; living as "manifest sons and daughters". Draws on Scripture and the early church fathers.
- **Salvific vs tragic ontology** (Tommy Miller with Bobby Shane Brooks, on Jason Clark's podcast "Rethinking God with Tacos", 2026): contrasts a "tragic ontology" (humanity defined at root by the Fall, separation and fear) with a "salvific ontology" (humanity's true being defined by Christ, inclusion and belovedness); the gospel as "awakening to who we have always been in Christ". Miller has preached that we are saved into the triune God's perichoresis. No fuller published definition was found, so present it as his framing, explain it carefully, connect it to Irenaeus/Athanasius/Torrance ontology-of-salvation ideas (salvation as a change in being through the Incarnation, theosis), and say that Miller's own teaching is the source to consult.
- **John Crowder**: founder of Sons of Thunder Ministries & Publications. Books include *The New Mystics* (2006), *Mystical Union* (2010), *Cosmos Reborn*, *Seven Spirits Burning*, *The Ecstasy of Loving God*, *Chosen for Paradise*. Emphasis: humanity's union with God in Christ, the finished work, grace, ecstatic joy ("drunken glory", being "drunk in the Spirit", Eph 5:18, Acts 2:13-15), and recovering the Christian mystical tradition (he draws on figures like Teresa of Avila, John of the Cross, Bernard of Clairvaux, the Desert Fathers, and stories of saints' ecstasies). He presents mystical experience as the fruit of union, not a ladder to reach God ("the mystical experience is Jesus"). Critics (e.g. Reformed sources like Monergism) call it "hyper-grace" and charismatic excess and say it downplays repentance and holiness. Do not invent specific personal experiences, dates or quotes for him; describe his themes and the kinds of experiences he and the tradition describe (ecstasy, holy laughter, trances, visions, rest) in general terms, and give the critique fairly.

## Research notes, round 3: love and justice (verified 2026-10)
- **George MacDonald, "Justice"** (Unspoken Sermons, Series Three, 1889). Verified wording: "There is no opposition, no strife whatever, between mercy and justice." / "repentance removes the offence which no suffering could." / punishment "nowise" atones for the wrong, although punishment "may do good to the man who does the wrong". His key text is Psalm 62:12 (KJV): "Also unto thee, O Lord, belongeth mercy: for thou renderest to every man according to his work." The widely quoted line "God is not bound to punish sin; he is bound to destroy sin" is from this sermon (cite it as "from 'Justice'"). He also argues that if mercy could be "too much" for God, mercy could not be a divine attribute.
- **Thomas Aquinas, Summa Theologiae I, q.21** (on God's justice and mercy), art. 4: in every work of God there are justice and mercy, and the work of divine justice always presupposes the work of mercy and is founded on it (paraphrase). Divine simplicity (ST I, q.3): God has no parts; his essence is identical with his attributes, so his justice and his mercy are not two competing things in him. Use this to show that "two natures in tension" is not even classical theism.
- **Evangelical position, fairly stated** (sources):
  - The Gospel Coalition essay "The Wrath of God": wrath is "the holy action of retributive justice towards persons whose actions deserve eternal condemnation", in perfect harmony with God's other attributes; divorcing love from holiness misshapes God; salvation is salvation from God's wrath; on the cross Jesus bore divine judgment, "divine satisfaction through divine substitution". Texts it uses: Deut 32:35; Nahum 1:2; Ex 34:6-7; Rom 1:18; Rom 2:5, 8; Rom 3:21-26; Rom 5:9; Rom 6:23; Rom 12:19; Eph 2:3; John 3:36; Rev 6:16; Rev 14:10; Rev 19:1-3; Ps 5:4-6; Ps 11:4-7; Lev 10; Gen 6–9; Gen 19; Ps 75:8; Matt 26:39 (the cup); 1 John 4:10 (propitiation).
  - 9Marks: God's love cannot be separated from his justice, nor his holiness from his goodness.
  - J.I. Packer, "What Did the Cross Achieve?" / "Penal Substitution Revisited": God's mercy to guilty sinners is framed by his holy hostility (wrath) against their sins.
  - SBC resolution "On the Necessity of Penal Substitutionary Atonement" (2017): God's perfect love applies his perfect justice to satisfy his perfect holiness in redeeming sinners (citing Rom 3:26).
  - Also common: R.C. Sproul's emphasis on holiness ("holy, holy, holy" Isa 6:3 as the only attribute repeated three times); Anselm's argument that an offence against infinite honour demands infinite satisfaction; "love without justice is mere sentimentality"; Prov 17:15 (justifying the wicked is an abomination); Hab 1:13 (too pure to look on evil).
- **Relational / restorative voices:**
  - Christopher Marshall, *Beyond Retribution* (Eerdmans, 2001): righteousness, justice and justification are relational and covenantal rather than primarily forensic; restoration, not retribution, is the hallmark of God's justice and God's final word.
  - Brian Zahnd, *Sinners in the Hands of a Loving God* (2017): "The justice of God is not retributive; the justice of God is restorative." (widely quoted; cite as his)
  - Derek Flood, *Healing the Gospel* (Cascade, 2012): restorative justice, a nonviolent atonement, a gospel of enemy-love rather than retribution.
  - Brad Jersak: wrath as the intrinsic consequence of refusing God's mercy, not retributive punishment; the cross as identification rather than substitution; *A More Christlike God* (2015).
  - Isaac the Syrian (Homily 51 as usually translated): as a handful of sand thrown into the sea, so is the sin of all flesh compared with the mind of God; and justice cannot counterbalance his mercy (paraphrase, mark as "as usually translated").

## Round 4: deep studies with sources
Each theme page gets a "Deep study" block. Write file `src/data/deepN.js` with the round-2 header, then:
```js
RG.deep = RG.deep || {};
RG.deep["theme-id"] = {
  sections: [ { title: "...", body: ["paragraph", ...], refs: ["Rom 6:6", ...] }, ... ],   // 5–7 sections
  evidence: [ { text: "a short verified quote or fact", source: "Author, Work, section", url: "https://..." }, ... ] // 5–10 items
};
```
- Sections go deeper than the existing theme page (read `src/data/themes.js` / `themes2.js` first so you do not repeat it): word studies (Hebrew/Greek), close reading of the key passages in context, how the early church read them, the strongest counter-reading and a response, and practical meaning. Simple language, short paragraphs, many Scripture references.
- **Evidence must be real and checked.** Use WebSearch / WebFetch (prefer these; Firecrawl is rate-limited and shared) to find primary or reliable sources online — e.g. CCEL / New Advent for church fathers, Bible Hub / Blue Letter Bible lexicons for word meanings, reputable scholarly or publisher pages. Only include a quote if you saw its wording on the page you cite; put that page's URL in `url`. If you cannot verify, paraphrase and say "Paraphrase:".
- No details about any living preacher's church, family or location.

## Round 5: "Designed to Live" (love with a spine)
Topic: how the relational gospel understands self-worth, love, safety, boundaries, confronting, refusing to help, dignity and honour; why many Christians were taught these are unloving or selfish (and where that came from); what to do when exploited; how God designed humans and why; and how Jesus modelled it. Voice: warm, pastoral, clear, grounded in Scripture and the relational/union gospel (God is love; Christ the measure; humans as beloved image-bearers), honest about debate. Safety matters: where abuse or danger is involved, say plainly that safety comes first, that forgiveness does not require staying or trusting, and encourage seeking trusted people, professional help and local emergency services or abuse hotlines. Do not give clinical diagnoses. Be careful and accurate with Greek: Gal 6:2 *baros* (heavy burden) vs 6:5 *phortion* (one's own load); Phil 2:4 "not only… but also"; *praus* (meek) — the "trained war horse" image is a popular illustration, not established lexical meaning, so mark it as such. Use the evangelical book *Boundaries* (Cloud & Townsend, 1992) fairly: evangelicals also produced strong teaching FOR boundaries, so do not caricature. Verify any quotes from Augustine, Bernard of Clairvaux (On Loving God, four degrees), Aquinas (ST II-II q.25 a.4 on charity and self-love), Kierkegaard (Works of Love) on a page you actually saw, with URL; otherwise paraphrase.

## Round 6: Sharing the good news
Topic: how to share the gospel the way Jesus and the apostles did, as the relational gospel and the gospel of the kingdom; how this differs from popular evangelical methods (Four Spiritual Laws, Romans Road, sinner's prayer, altar call, "if you died tonight", crusade evangelism, tracts); why the evangelical presentation feels easy; its real good, its harms and its mistakes; how groups across church history presented the gospel; the evangelical charge that relational-gospel people "don't preach the gospel" (sin, holiness, salvation, second coming, hell), why that framework treats rescue-from-hell evangelism as the main or only assignment, and how Scripture and the relational gospel answer; and what our priorities are. Voice: honest and fair — respect evangelicals' zeal and fruit, name harms plainly, avoid caricature. Verify historical facts and dates with web sources (e.g. Bill Bright's Four Spiritual Laws, Finney's "new measures" and the anxious bench, Evangelism Explosion and D. James Kennedy's diagnostic questions, Billy Graham, Lausanne Covenant 1974, C.H. Dodd's *The Apostolic Preaching and Its Developments* (1936), Scot McKnight's *The King Jesus Gospel* (2011), the Priene calendar inscription's use of "good news" for Augustus, the Didache, Patrick, Cyril and Methodius, Matteo Ricci, Zinzendorf/Moravians, Wesley's field preaching, Edwards's "Sinners in the Hands of an Angry God" 1741, Azusa Street 1906). Count claims about Acts must be checked against the text (e.g. Gehenna never appears in Acts; Hades appears only in Acts 2:27, 31 quoting Psalm 16).

## Round 7: "The why of design"
From a relational-gospel perspective (God is love; Father, Son and Spirit in communion; humans as beloved image-bearers made for union; Christ the measure; new creation), explain the reason and mechanism behind what God designed, the counterfeits humans built instead, and hard questions. Use Scripture carefully (Hebrew/Greek where helpful) AND reputable science where relevant (nervous system, attachment, sleep, play, newborn crying, pain, neuroplasticity, implicit memory). Science claims must be accurate and modest; verify with reliable sources (NIH/NCBI, Harvard Health, Cleveland Clinic, Mayo Clinic, APA, peer-reviewed summaries, Britannica) and give URLs. Distinguish clearly what Scripture says, what tradition says, what science says, and what is interpretation. Respect debate (e.g. eternal functional subordination in the Trinity; complementarian vs egalitarian; Gen 3:16 readings). No medical or clinical advice beyond general information; encourage professional help where relevant.
