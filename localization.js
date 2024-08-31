const fs = require("fs");
const path = require("path");

const readme = fs.readFileSync(path.join(__dirname, "readme", "template.md"), "utf-8");

const localization = path.join(__dirname, "localization");

const r1 = JSON.parse(fs.readFileSync(path.join(localization, "en", "readme.json"), "utf-8"));

let error = false;

for(const folder of fs.readdirSync(localization).filter(f => !f.includes('.'))){
    if(folder === "en"){
        fs.writeFileSync(path.join(__dirname, "README.md"), readme.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
            if(!r1[key.trim()]){
                console.error(`[${folder}] Failed to find '${key.trim()}'`);
                error = true;
            }
            return r1[key.trim()];
        }).replace(/\r?\n/g, '\n').trim(), "utf-8");
        fs.copyFileSync(path.join(localization, folder, "translations.json"), path.join(__dirname, `package.nls.json`));
    }else{
        const r2 = Object.keys(JSON.parse(fs.readFileSync(path.join(localization, folder, "readme.json"), "utf-8")));
        fs.writeFileSync(path.join(__dirname, "readme", `readme.${folder}.md`), readme.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
            if(!r2[key.trim()]){
                console.warn(`[${folder}] Failed to find '${key.trim()}', using English translation`)
                return r1[key.trim()]; // if it doesn't exist it will throw an error from above block
            }
            return r2[key.trim()];
        }).replace(/\r?\n/g, '\n').trim(), "utf-8");
        fs.copyFileSync(path.join(localization, folder, "translations.json"), path.join(__dirname, `package.nls.${folder}.json`));
    }
}

if(error){
    process.exit(1);
}