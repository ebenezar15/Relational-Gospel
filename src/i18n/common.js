/* Shared rules for the Tamil build: which data strings are translated and how they are keyed.
   Loaded by the extractor/build (Node) and inlined into the page for the runtime. */
var RGI18N_RULES = (function () {
  var EXCL = { id: 1, url: 1, href: 1, src: 1, source: 1, icon: 1, color: 1, verdict: 1, family: 1, testament: 1, side: 1, start: 1, tone: 1, organ: 1, kind: 1, slug: 1, related: 1, to: 1 };
  var REF_RE = /^\s*(?:(?:[1-3]\s)?[A-Z][a-z]+\.?(?:\s(?:of\s)?[A-Z][a-z]+)?\s\d+(?::\d+(?:[–-]\d+)?(?:,\s?\d+(?:[–-]\d+)?)*)?(?:[–-]\d+(?::\d+)?)?(?:\s?(?:;|,)\s?)?)+\s*$/;
  function hash(s) {
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(36) + s.length.toString(36);
  }
  function wanted(s, k) {
    if (typeof s !== "string" || EXCL[k]) return false;
    if (!/[A-Za-z]{2}/.test(s) || /^https?:/.test(s)) return false;
    if (!/\s/.test(s.trim())) return false;      // single tokens: identifiers or labels, handled by the UI dictionary
    if (REF_RE.test(s)) return false;            // pure scripture references, converted at runtime
    return true;
  }
  return { EXCL: EXCL, REF_RE: REF_RE, hash: hash, wanted: wanted };
})();
if (typeof module !== "undefined") module.exports = RGI18N_RULES;
