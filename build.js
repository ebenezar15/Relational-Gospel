// Inlines src/ into two single-file builds:
//   index.html          full document (GitHub Pages / any static host)
//   dist/artifact.html  page fragment for publishing as a claude.ai artifact
const fs = require("fs");
const path = require("path");
const src = (p) => fs.readFileSync(path.join(__dirname, "src", p), "utf8");
const safe = (js) => js.replace(/<\/script/gi, "<\\/script");

const order = ["themes", "themes2", "journey", "law", "culture", "debate", "story", "voices", "lovecase", "love", "newcreation", "compare", "embodied", "deep1", "deep2", "deep3", "kingdom", "life1", "life2", "share1", "share2", "why1", "why2", "big1", "big2", "big3", "fg1", "fg2", "fg3"];
const data = order
  .map((n) => path.join("data", n + ".js"))
  .filter((p) => fs.existsSync(path.join(__dirname, "src", p)))
  .map(src)
  .join("\n;\n");

const page = src("index.html")
  .replace("/*STYLES*/", () => src("styles.css"))
  .replace("/*DATA*/", () => safe(data))
  .replace("/*APP*/", () => safe(src("app.js")));

fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "dist", "artifact.html"), page);
fs.writeFileSync(
  path.join(__dirname, "index.html"),
  '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n' +
    page +
    "\n</body>\n</html>\n"
);
console.log("built", (page.length / 1024).toFixed(0) + " KB");
