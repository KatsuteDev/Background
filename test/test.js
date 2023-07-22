const fs = require("fs");
const path = require("path");

const vscode = require("vscode");

const file = path.join(__dirname, "__testno__");

const images = path.join(__dirname, "*.png").replace(/\\/gm, '/');

module.exports = {
    run: () => new Promise(async () => {
        await wait(5);

        const background = vscode.extensions.getExtension("katsute.code-background").exports;

        let num;
        if(!fs.existsSync(file)){
            for(const ui of ["window", "editor", "sidebar", "panel"])
                for(const image of await background.get(ui))
                    await background.remove(ui, image);
            fs.writeFileSync(file, '0', "utf-8");
            background.install();
        }else if((num = fs.readFileSync(file, "utf-8")) == 0){
            vscode.window.showInformationMessage("Testing empty install");

            await wait(3);

            await background.add("window", images);

            fs.writeFileSync(file, `${++num}`, "utf-8");

            background.install();
        }else if(num >= 1 && num <= 5){
            vscode.window.showInformationMessage(`Testing window backgrounds (${num}/5)`);

            await wait(3);

            fs.writeFileSync(file, `${++num}`, "utf-8");

            if(num == 6){
                await background.remove("window", images);
                await background.add("editor", images);
                await background.add("sidebar", images);
                await background.add("panel", images);

                background.install();
            }else{
                background.reload();
            }

        }else if(num >= 6 && num <= 10){
            vscode.window.showInformationMessage(`Testing other backgrounds (${num-5}/5)`);

            await wait(3);

            fs.writeFileSync(file, `${++num}`, "utf-8");

            if(num == 11)
                background.uninstall();
            else
                background.reload();
        }else if(num == 11){
            vscode.window.showInformationMessage(`Testing uninstall`);

            await wait(3);

            await background.add("window", images);

            fs.writeFileSync(file, `${++num}`, "utf-8");

            background.reload();
        }else{
            await background.replace("window", images, images.replace(".png", ''));

            vscode.window.showInformationMessage(`All tests completed!\n\nBackgrounds are: \nwindow: [${await background.get("window")}]\neditor: [${await background.get("editor")}]\nsidebar: [${await background.get("sidebar")}]\npanel: [${await background.get("panel")}]`);

            fs.unlinkSync(file);
        }
    })
};

const wait = (time) => new Promise((res) => setTimeout(() => res(), 1000 * time));