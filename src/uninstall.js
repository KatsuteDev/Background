const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const js = path.join(path.dirname(require.main.filename), "vs", "workbench", "workbench.desktop.main.js");
const json = path.join(path.dirname(require.main.filename), "../", "product.json");

const identifier = "KatsuteDev/Background";
const remove = new RegExp(`^\\/\\* ${identifier}-start \\*\\/$` + `[\\s\\S]*?` + `^\\/\\* ${identifier}-end \\*\\/$`, "gmi");

const replace = /(?<=^\s*"vs\/workbench\/workbench\.desktop\.main\.js\": \").*(?=\",\s*$)/gm;

if(fs.existsSync(js)){
    const content = fs.readFileSync(js, "utf-8").replace(remove, "").trim();
    fs.writeFileSync(js, content);
    if(fs.existsSync(json))
        fs.writeFileSync(json, fs.readFileSync(json, "utf-8").replace(replace, crypto
            .createHash("md5")
            .update(content)
            .digest("base64")
            .replace(/=+$/gm, '').trim()), "utf-8");
}