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
