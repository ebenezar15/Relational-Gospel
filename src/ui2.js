/* Atlas 2 skin behaviour: scheme picker, search pill, mobile drawer, rail icons, reveal, floating buttons */
(function () {
  var root = document.documentElement, KEY = "rga.ui2";
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function put(o) { try { localStorage.setItem(KEY, JSON.stringify({ scheme: o.scheme, mode: o.mode })); } catch (e) {} }
  var st = get();
  function apply() {
    root.setAttribute("data-scheme", st.scheme || "parchment");
    var mode = st.mode || "system";
    var dark = mode === "dark" || (mode === "system" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "dark" : "light");
  }
  apply();
  if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { if ((st.mode || "system") === "system") apply(); });

  function svg(d) { return "url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>") + "\")"; }
  var IC = {
    "Begin": svg('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'),
    "The God Jesus reveals": svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    "Trinity & union": svg('<circle cx="12" cy="8" r="4"/><circle cx="8" cy="15" r="4"/><circle cx="16" cy="15" r="4"/>'),
    "Law & culture": svg('<path d="M12 3v18M5 21h14M7 7h10M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>'),
    "The great themes": svg('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
    "Voices & frameworks": svg('<path d="M20 4c-6 0-11 4-12 11l-3 5"/><path d="M8 15c4 0 7-2 8-6"/>'),
    "The conversation": svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>')
  };
  root.style.setProperty("--ic-star", svg('<path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/>'));

  function iconRail() {
    var rail = document.getElementById("rail"); if (!rail) return;
    var list = Object.keys(IC).map(function (k) { return IC[k]; }), gi = -1, cur = list[0];
    Array.prototype.forEach.call(rail.children, function (el) {
      if (el.classList.contains("rail-group")) { gi++; cur = list[gi % list.length]; }
      else if (el.tagName === "A") el.style.setProperty("--ic", cur);
    });
    if (!rail.querySelector(".u2-railfoot")) { var f = document.createElement("p"); f.className = "u2-railfoot"; f.textContent = "An atlas of the relational gospel: the Father, Son and Spirit drawing the world into their love."; rail.appendChild(f); }
  }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function reveal() {
    if (!io) return;
    document.querySelectorAll("#main .section, #main .st-b, #main .card").forEach(function (el) {
      if (el.classList.contains("u2-reveal")) return;
      var r = el.getBoundingClientRect(); if (r.top < innerHeight) return;
      el.classList.add("u2-reveal"); io.observe(el);
    });
  }

  function paletteHTML() {
    var S = [["parchment", "Parchment", "#b8892b"], ["byzantine", "Byzantine", "#6a2a8a"], ["lapis", "Lapis", "#1d4ea6"], ["iona", "Iona", "#2f6b4a"], ["desert", "Desert", "#b0541c"], ["monastic", "Monastic", "#5a5243"], ["rose", "Rose", "#a3374d"]];
    var M = [["light", "Light"], ["dark", "Dark"], ["system", "System"]];
    return '<div class="label">Colour scheme</div><div class="sw">' + S.map(function (s) { return '<button type="button" data-u2s="' + s[0] + '" aria-pressed="' + ((st.scheme || "parchment") === s[0]) + '"><i style="background:' + s[2] + '"></i>' + s[1] + "</button>"; }).join("") + '</div><div class="label">Appearance</div><div class="mode">' + M.map(function (m) { return '<button type="button" data-u2m="' + m[0] + '" aria-pressed="' + ((st.mode || "system") === m[0]) + '">' + m[1] + "</button>"; }).join("") + "</div>";
  }

  function init() {
    var top = document.querySelector(".top"), acts = document.querySelector(".top-actions"), brand = document.querySelector(".brand");
    if (!top || !acts || top.getAttribute("data-u2")) return;
    top.setAttribute("data-u2", "1");
    var bn = document.querySelector(".brand-name"); if (bn) bn.innerHTML = 'Relational Gospel <span>Atlas · the gospel of union</span>';
    var burger = document.createElement("button"); burger.type = "button"; burger.className = "icon-btn u2-burger"; burger.setAttribute("aria-label", "Open menu");
    burger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    top.insertBefore(burger, brand);
    var search = document.createElement("button"); search.type = "button"; search.className = "u2-search"; search.setAttribute("aria-label", "Search the atlas");
    search.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>Search the atlas…</span><span class="kbd">/</span>';
    brand.parentNode.insertBefore(search, acts);
    var pal = document.createElement("button"); pal.type = "button"; pal.className = "icon-btn"; pal.setAttribute("aria-label", "Colour scheme");
    pal.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.7-1.3-.7-2.2 0-.9.8-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.9 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/></svg>';
    acts.insertBefore(pal, acts.firstChild);
    var scrim = document.createElement("div"); scrim.className = "u2-scrim"; document.body.appendChild(scrim);
    var fab = document.createElement("button"); fab.type = "button"; fab.className = "u2-fab"; fab.setAttribute("aria-label", "Search the atlas");
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l1.8 4.9L19 9.7l-4 3.3 1.3 5.2L12 15.4 7.7 18.2 9 13 5 9.7l5.2-1.8z"/></svg><span>Explore</span>';
    document.body.appendChild(fab);
    var up = document.createElement("button"); up.type = "button"; up.className = "u2-top"; up.setAttribute("aria-label", "Back to top"); up.textContent = "↑"; document.body.appendChild(up);
    var openS = function () { var o = document.getElementById("open-search"); if (o) o.click(); };
    search.addEventListener("click", openS); fab.addEventListener("click", openS);
    up.addEventListener("click", function () { scrollTo({ top: 0, behavior: "smooth" }); });
    addEventListener("scroll", function () { up.classList.toggle("show", scrollY > 900); }, { passive: true });
    burger.addEventListener("click", function () { document.body.classList.toggle("u2-open"); });
    scrim.addEventListener("click", function () { document.body.classList.remove("u2-open"); });
    document.getElementById("rail").addEventListener("click", function (e) { if (e.target.closest("a")) document.body.classList.remove("u2-open"); });
    var pop = null;
    function closePop() { if (pop) { pop.remove(); pop = null; } }
    pal.addEventListener("click", function (e) {
      e.stopPropagation(); if (pop) { closePop(); return; }
      pop = document.createElement("div"); pop.className = "u2-pal"; pop.innerHTML = paletteHTML(); document.body.appendChild(pop);
      pop.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var s = ev.target.closest("[data-u2s]"), m = ev.target.closest("[data-u2m]");
        if (s) st.scheme = s.getAttribute("data-u2s"); else if (m) st.mode = m.getAttribute("data-u2m"); else return;
        put(st); apply(); pop.innerHTML = paletteHTML();
      });
    });
    document.addEventListener("click", closePop);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closePop(); document.body.classList.remove("u2-open"); } });
    var rail = document.getElementById("rail"), main = document.getElementById("main");
    if (window.MutationObserver) {
      new MutationObserver(iconRail).observe(rail, { childList: true });
      new MutationObserver(function () { if (!st._a) { st._a = 1; apply(); } setTimeout(reveal, 30); }).observe(main, { childList: true });
    }
    iconRail(); reveal(); apply();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); }); else setTimeout(init, 0);
})();
