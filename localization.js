const fs = require("fs");
const path = require("path");

let error = false;

// templates

const readme = fs.readFileSync(path.join(__dirname, "readme", "template.md"), "utf-8");
const help = fs.readFileSync(path.join(__dirname, "readme", "template.help.md"), "utf-8");

const localization = path.join(__dirname, "localization");

// en

const ent = JSON.parse(fs.readFileSync(path.join(localization, "en", "readme.json"), "utf-8"));
const tls = JSON.parse(fs.readFileSync(path.join(localization, "en", "translations.json"), "utf-8"));

for(const [k, v] of Object.entries(tls)){
    ent[`package.${k}`] = v.replace(/\n\n/g, "<br><br>").replace(/#\w+\.(\w+)#/g, "$1");
}

// language selector | | |

const readmePicker = fs.readdirSync(localization)
    .filter(f => !f.includes('.'))
    .map(f => [f, f === "en" ? `https://github.com/KatsuteDev/Background#readme` : `https://github.com/KatsuteDev/Background/blob/main/readme/readme.${f}.md`])
    .map(f => `<a href="${f[1]}">${JSON.parse(fs.readFileSync(path.join(localization, f[0], "readme.json"))).language}</a>`)
    .join(" | ");

const helpPicker = fs.readdirSync(localization)
    .filter(f => !f.includes('.'))
    .map(f => [f, f === "en" ? `https://github.com/KatsuteDev/Background/blob/main/HELP.md` : `https://github.com/KatsuteDev/Background/blob/main/readme/help.${f}.md`])
    .map(f => `<a href="${f[1]}">${JSON.parse(fs.readFileSync(path.join(localization, f[0], "readme.json"))).language}</a>`)
    .join(" | ");

for(const folder of fs.readdirSync(localization).filter(f => !f.includes('.'))){
    const en = folder === "en";

    const t = JSON.parse(fs.readFileSync(path.join(localization, folder, "readme.json"), "utf-8"));
    const t2 = JSON.parse(fs.readFileSync(path.join(localization, folder, "translations.json"), "utf-8"));

    for(const [k, v] of Object.entries(t2)){
        t[`package.${k}`] = v.replace(/\n\n/g, "<br><br>").replace(/#\w+\.(\w+)#/g, "$1");
    }

    const format = (s) => {
        const parts = s.trim().split(/\s*\|\s*/g);
        const key = parts[0];

        const value = t[key];

        if(!value){
            console.error(`[${folder}] Failed to find '${key}'`);
            error = true;
        }

        return (value ?? ent[key])
            .replace(/{(\d+)}/g, function(match, number) {
                const i = +number + 1;
                if(!parts[i]){
                    console.error(`[${folder}] Failed to find '${key}' [${i}]`);
                    error = true;
                }
                return parts[i] ?? match;
            });
    }

    fs.writeFileSync(en ? path.join(__dirname, "README.md") : path.join(__dirname, "readme", `readme.${folder}.md`),
        `<div align="right">${readmePicker}</div>\n\n` +
        readme
            .replace(/{{\s*([^}]+)\s*}}/g, (_, s) => format(s))
            .replace(/\r?\n/g, '\n')
            .trim(), "utf-8");

    fs.writeFileSync(en ? path.join(__dirname, "HELP.md") : path.join(__dirname, "readme", `help.${folder}.md`),
        `<div align="right">${helpPicker}</div>\n\n` +
        help.replace(/{{\s*([^}]+)\s*}}/g, (_, s) => format(s))
            .replace(/\r?\n/g, '\n')
            .trim(), "utf-8");

    fs.copyFileSync(path.join(localization, folder, "translations.json"), path.join(__dirname, en ? `package.nls.json` : `package.nls.${folder}.json`));
}

error && process.exit(1);