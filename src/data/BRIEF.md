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
