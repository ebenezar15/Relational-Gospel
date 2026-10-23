# Relational Gospel Atlas

An interactive, animated study atlas of the relational gospel: Jesus as the perfect theology, separation vs union, the purpose of the Law (64 laws explained), the violent passages, how people misread God, Old/New Testament tensions, a culture decoder (38 customs, starting with the sandals), 44 sayings of Jesus in their setting, the great themes, common teachings, strawmen, real debates, a reading compass for approaching the Bible, how God met humanity age by age, the apostles, the Trinity at work, 46 church fathers and teachers, 36 frameworks compared, what religion misses, and themes on the Trinitarian gospel, union and sonship, the church now, the undiluted gospel, mystical union (John Crowder), Sacred Biology and salvific ontology (Tommy Miller). Typeface: Avenir Next (Nunito Sans fallback where it is not installed).

- `src/` – page template, styles, app script and content data (`src/data/*.js`)
- `node build.js` – inlines everything into `index.html` (any static host, e.g. GitHub Pages) and `dist/artifact.html`

## Languages (English / தமிழ்)

The EN | தமிழ் switch in the top-right corner changes the whole app. Tamil text lives in
`src/i18n/ta.json` (built from `src/i18n/parts/` by `src/i18n/merge.js`), ships gzipped inside the page,
and is applied by `src/i18n/runtime.js`: content strings are swapped before the app renders, interface
text is translated in the page, and scripture references get Tamil Bible book names. After changing
English content, re-run the extractor (`src/i18n/extract.js`) and translate any new strings
following `src/i18n/BRIEF.md`.
