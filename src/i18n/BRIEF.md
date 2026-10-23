# Tamil translation brief — Relational Gospel Atlas

You are translating one chunk of an interactive Christian study app (the "relational gospel": God as Father, Son and Spirit in self-giving love, union with Christ, sonship, grace, versus a legal/transactional gospel) from English into **Tamil**, for Tamil Christians in India, Sri Lanka and the diaspora.

## Files
- Input: `in/<CHUNK>.json` — an array of `{"k": key, "en": English}`.
- Output: write one or more files `out/<CHUNK>.p1.json`, `out/<CHUNK>.p2.json`, … Each file is ONE JSON object mapping key → Tamil: `{"3k9a1b2c": "தமிழ் …", "…": "…"}`.
  Keep each part to about 20–30 strings (or ~12,000 English characters) so writes stay manageable. Go through the input IN ORDER; every key must appear exactly once across your parts.
- Check: `node validate.js <CHUNK>` (run from this directory). It reports JSON errors, missing keys, strings with no Tamil, HTML-tag mismatches and changed scripture references. Fix everything it reports and re-run until it prints `ALL OK`.
- Read the input with the Read tool in pieces (offset/limit) if it is long. Do not write scripts that "translate" automatically; you translate every string yourself.

## Rules
1. **Translate everything, fully.** No summarising, no skipping sentences, no added commentary. Meaning, nuance, tone and caveats (e.g. "debated", "some scholars say") must survive.
2. **Natural, clear modern Tamil** a church member would read easily — warm and respectful, not stiff or overly Sanskritised, but use the established Tamil Christian vocabulary below.
3. **HTML**: keep every tag exactly (`<b>`, `<em>`, `<i>`, `<br>`, `<a href="…">`, etc.), same count; translate only the text between tags; never translate attribute values. JSON-escape any ASCII double quote (`\"`) — prefer Tamil/typographic quotes “ ” in prose.
4. **Scripture references stay in English exactly as written** (`Rom 8:1`, `John 3:16`, `1 Cor 13:4–7`, `Genesis 1:26`) — the app converts book names to Tamil itself. Do not translate or reformat them.
5. **Bible quotations**: where you know the Tamil Bible (the Tamil Union Version, பழைய மொழிபெயர்ப்பு / O.V.) wording, use it; otherwise translate the English faithfully in a Bible-like register.
6. **Names**: biblical names in their Tamil Bible form (Jesus இயேசு, Paul பவுல், Moses மோசே, Abraham ஆபிரகாம், Peter பேதுரு, John யோவான், David தாவீது, Mary மரியாள், Adam ஆதாம், Eve ஏவாள், Israel இஸ்ரவேல்). Other people (church fathers, scholars, modern authors): transliterate into Tamil script, e.g. அத்தனாசியஸ், ஐரேனியஸ், அகஸ்டின், சி.எஸ். லூயிஸ், என்.டி. ரைட். Titles of books may be translated with the English title in brackets the first time it appears in a string if helpful.
7. **Greek/Hebrew/Latin terms** written in Latin letters (agapē, hesed, dikaiosynē, perichoresis, theosis, ekklesia, shalom…) — keep them in Latin letters as written; translate the explanation around them.
8. Keep numbers, dates, units, emojis and symbols (→, ·, ✓) as they are.
9. Short UI labels (buttons, headings, chips) → short Tamil labels. If an entry is clearly program code (a CSS class, an identifier, "use strict", a selector), copy it unchanged.
10. Content on abuse, harassment and mental health must stay safety-first and gentle in Tamil too.

## Glossary (use consistently)
| English | Tamil |
|---|---|
| relational gospel | உறவுமுறை நற்செய்தி |
| legal / transactional gospel | சட்டரீதியான நற்செய்தி / பரிவர்த்தனை நற்செய்தி |
| gospel | நற்செய்தி (சுவிசேஷம் in Bible-quote contexts) |
| God | தேவன் (கடவுள் where the sentence is about "a god / gods" in general) |
| Lord | கர்த்தர் |
| Father, Son, Holy Spirit | பிதா, குமாரன், பரிசுத்த ஆவியானவர் |
| the Spirit | ஆவியானவர் |
| Trinity / Triune | திரித்துவம் / திரியேக |
| union (with Christ) | (கிறிஸ்துவுடனான) ஐக்கியம் |
| communion / fellowship | ஐக்கியம் / உறவுப் பங்கு |
| sonship | புத்திரத்துவம் |
| adoption | சுவீகாரம் (புத்திரசுவீகாரம்) |
| grace | கிருபை |
| mercy | இரக்கம் |
| love | அன்பு |
| law / the Law (Torah) | சட்டம் / நியாயப்பிரமாணம் |
| sin / sinner | பாவம் / பாவி |
| shame / guilt | அவமானம் / குற்ற உணர்வு |
| righteousness / justification | நீதி / நீதிமானாக்கப்படுதல் |
| atonement | பாவநிவிர்த்தி |
| penal substitution | தண்டனை மாற்றீட்டுக் கோட்பாடு |
| cross / resurrection / incarnation | சிலுவை / உயிர்த்தெழுதல் / மனுவுருவாதல் |
| salvation / saviour | இரட்சிப்பு / இரட்சகர் |
| repentance (metanoia) | மனந்திரும்புதல் |
| forgiveness | மன்னிப்பு |
| faith / trust | விசுவாசம் / நம்பிக்கை |
| covenant | உடன்படிக்கை |
| kingdom (of God) | (தேவனுடைய) ராஜ்யம் |
| new creation | புதிய சிருஷ்டி |
| born again | மறுபடியும் பிறத்தல் |
| glory | மகிமை |
| wrath | கோபம் |
| hell / judgement | நரகம் / நியாயத்தீர்ப்பு |
| Scripture / the Bible | வேதவாக்கியம் / வேதாகமம் |
| church | திருச்சபை (local: சபை) |
| worship | ஆராதனை |
| prayer | ஜெபம் |
| heart healing / inner healing | இதய சுகமாக்கல் / உள்ளான சுகம் |
| identity | அடையாளம் |
| apostle / prophet | அப்போஸ்தலர் / தீர்க்கதரிசி |
| Old / New Testament | பழைய / புதிய ஏற்பாடு |
| myth / mistranslation | தவறான நம்பிக்கை / தவறான மொழிபெயர்ப்பு |
| Word of Faith | விசுவாச வார்த்தை இயக்கம் (Word of Faith) |
| case study | நிகழ்வு ஆய்வு |
| counter-view / objection | மாற்றுக் கருத்து / ஆட்சேபனை |

When done, reply with just the final `node validate.js <CHUNK>` output line(s).
