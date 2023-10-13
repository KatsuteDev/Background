const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/vs/workbench/workbench.desktop.main.js
const js = path.join(path.dirname(require.main.filename), "vs", "workbench", "workbench.desktop.main.js");
// %appdata%/Local/Programs/Microsoft VS Code/resources/app/product.json
const json = path.join(path.dirname(require.main.filename), "../", "product.json");

const identifier = "KatsuteDev/Background";
const remove = new RegExp(`^\\/\\* ${identifier}-start \\*\\/$` + `[\\s\\S]*?` + `^\\/\\* ${identifier}-end \\*\\/$`, "gmi");

const replace = /(?<=^\s*"vs\/workbench\/workbench\.desktop\.main\.js\": \").*(?=\",\s*$)/gm;

if(fs.existsSync(js)){
    fs.writeFileSync(js, fs.readFileSync(js, "utf-8").replace(remove, "").trim());
    if(fs.existsSync(json)){
        const raw = fs.readFileSync(json, "utf-8");
        fs.writeFileSync(json, raw.replace(replace, crypto.createHash("md5").update(raw).digest("base64").replace(/=+$/gm, '').trim()), "utf-8");
    }
}