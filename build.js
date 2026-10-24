// Inlines src/ into two single-file builds:
//   index.html          full document (GitHub Pages / any static host)
//   dist/artifact.html  page fragment for publishing as a claude.ai artifact
const fs = require("fs");
const path = require("path");
const src = (p) => fs.readFileSync(path.join(__dirname, "src", p), "utf8");
const safe = (js) => js.replace(/<\/script/gi, "<\\/script");

const order = ["themes", "themes2", "journey", "law", "culture", "debate", "story", "voices", "lovecase", "love", "newcreation", "compare", "embodied", "deep1", "deep2", "deep3", "kingdom", "life1", "life2", "share1", "share2", "why1", "why2", "big1", "big2", "big3", "fg1", "fg2", "fg3", "wor1", "wor2", "lv1", "lv2", "lv3", "lv4", "lv5", "pa1", "pa2", "pa3", "pa4", "pa5", "id1", "id2", "id3", "id4", "sv1", "sv2", "sv3", "sv4", "sv5", "rb1", "rb2", "ds1", "ds2", "ds3", "wy1", "wy2", "wy3", "wy4", "wy5", "bk1", "bk2", "bk3", "bk4", "bk5", "bk6", "bk7", "bl1", "bl2", "bl3", "jx1", "jx2", "jx3", "jx4", "jx5", "bl4", "wm1", "wm2", "dx1", "dx2", "dx3", "rc1", "rc2", "rc3", "rc4", "rc5", "bs1", "bs2", "bs3", "bs4", "bs5", "st1", "st2", "st3", "st4", "st5", "dl1", "dl0", "ex1"];
const data = order
  .map((n) => path.join("data", n + ".js"))
  .filter((p) => fs.existsSync(path.join(__dirname, "src", p)))
  .map(src)
  .join("\n;\n");

// Tamil: src/i18n/ta.json ({d: {hash: tamil}, u: {english ui text: tamil}}) ships gzipped + base64.
const taPath = path.join(__dirname, "src", "i18n", "ta.json");
const ta = fs.existsSync(taPath) ? require("zlib").gzipSync(JSON.stringify(JSON.parse(fs.readFileSync(taPath, "utf8"))), { level: 9 }).toString("base64") : "";
const i18n = (ta ? 'window.RG_TA="' + ta + '";\n' : "") + src("i18n/common.js") + "\n" + src("i18n/runtime.js");
const app = src("app.js").replace(/^\(function \(\) \{/, "window.RGstart = function () {").replace(/\}\)\(\);\s*$/, "};\nwindow.RGboot(window.RGstart);\n");

const page = src("index.html")
  .replace("/*STYLES*/", () => src("styles.css"))
  .replace("/*DATA*/", () => safe(data))
  .replace("/*I18N*/", () => safe(i18n))
  .replace("/*APP*/", () => safe(app));

fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "dist", "artifact.html"), page);
fs.writeFileSync(
  path.join(__dirname, "index.html"),
  '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n' +
    page +
    "\n</body>\n</html>\n"
);
console.log("built", (page.length / 1024).toFixed(0) + " KB");
