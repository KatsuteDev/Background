/*
 * Copyright (C) 2022 Katsute <https://github.com/Katsute>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as vscode from "vscode";

import { glob } from "glob";

import * as fs from "fs";
import * as path from "path";

import * as reload from "./command/reload";
import * as install from "./command/install";
import * as uninstall from "./command/uninstall";

import { config, get } from "./command/config";

import * as align from "./command/config/align";
import * as file from "./command/config/file";
import * as opacity from "./command/config/opacity";
import * as repeat from "./command/config/repeat";
import * as size from "./command/config/size";

import { statusbar } from "./statusbar";

//

const identifier: string = "KatsuteDev/background";

export const activate: (context: vscode.ExtensionContext) => void = (context: vscode.ExtensionContext) => {

    // backend

    if(require.main && require.main.filename){

        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/bootstrap-window.js

        const file: string = path.join(path.dirname(require.main.filename), "bootstrap-window.js");
        if(fs.existsSync(file)){
            js = file;
            const backup: string = path.join(path.dirname(require.main.filename), "bootstrap-window-backup.js");
            if(!fs.existsSync(backup)){
                fs.copyFileSync(file, backup);
                vscode.window.showInformationMessage(`A backup was created for 'bootstrap-window.js'`);
            }
        }else
            vscode.window.showWarningMessage(`Failed to find 'bootstrap-window.js'`);
    }else
        vscode.window.showErrorMessage("Failed to find main file");

    // extension

    context.subscriptions.push(reload.command);
    context.subscriptions.push(install.command);
    context.subscriptions.push(uninstall.command);

    context.subscriptions.push(config);

    context.subscriptions.push(align.command);
    context.subscriptions.push(file.command);
    context.subscriptions.push(opacity.command);
    context.subscriptions.push(repeat.command);
    context.subscriptions.push(size.command);

    context.subscriptions.push(statusbar);
    statusbar.show();
};

//

let js: string | undefined;

export const installJS: () => void = () => {
    js && fs.writeFileSync(js, removeJS(fs.readFileSync(js, "utf-8")) + '\n' + getJS(), "utf-8")
}

export const uninstallJS: () => void = () => {
    js && fs.writeFileSync(js, removeJS(fs.readFileSync(js, "utf-8")), "utf-8");
}

export const restartVS: () => void = () => {
    vscode.commands.executeCommand("workbench.action.newWindow").then(() => {
        vscode.commands.executeCommand("workbench.action.closeWindow");
    });
}

//

const remove: RegExp = new RegExp(`\\/\\* ${identifier}-start \\*\\/` + `[\\s\\S]*?` + `\\/\\* ${identifier}-end \\*\\/`);

const unique = (v: string, i: number, self: string[]) => self.indexOf(v) === i;

const extensions = (v: string, i: number, self: string[]) => { // images only
    const ext: string = path.extname(v);
    for(const m of file.extensions())
        if(`.${m}` === ext)
            return true;
    return false;
}

const getJS: () => string = () => {
    const css: string = get("CSS") || "";

    const images: {[key: string]: string[]} = {
        window: [],
        editor: [],
        sidebar: [],
        panel: []
    }

    // populate images

    for(const s of ["window", "editor", "sidebar", "panel"])
        for(const g of (get(`${s}Backgrounds`) as string[]).filter(unique))
            for(const f of glob.sync(g).filter(extensions))
                images[s].push('"' + `data:image/${path.extname(f).substring(1)};base64,${fs.readFileSync(f, "base64")}` + '"');

    // resolve settings to css

    const position: string = {
        "Top Left": "left top",
        "Top Center": "center top",
        "Top Right": "right top",
        "Center Left": "left center",
        "Center Center": "center center",
        "Center Right": "right center",
        "Bottom Left": "left bottom",
        "Bottom Center": "center bottom",
        "Bottom Right": "right bottom",
        "Manual": get("backgroundImageAlignmentValue") as string,
    }[get("backgroundImageAlignment") as string] || "center center";

    const opacity: number = get("opacity") as number;

    const repeat: string = {
        "No Repeat": "no-repeat",
        "Repeat": "repeat",
        "Repeat X": "repeat-x",
        "Repeat Y": "repeat-y",
        "Repeat Space": "space",
        "Repeat Round": "round"
    }[get("backgroundImageRepeat") as string] || "no-repeat";

    const size: string = {
        "Auto": "auto",
        "Contain": "contain",
        "Cover": "cover",
        "Manual": get("backgroundImageSizeValue") as string
    }[get("backgroundImageSize") as string] || "cover";

    // shared ::after css

    const overlay: string =
    `
    content: "";

    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    z-index: 100;

    position: absolute;

    pointer-events: none;
    `;

    // css for each element

    return `
/* ${identifier}-start */
const windowBackgrounds = [${images.window.join(',')}];
const editorBackgrounds = [${images.editor.join(',')}];
const sidebarBackgrounds = [${images.sidebar.join(',')}];
const panelBackgrounds = [${images.panel.join(',')}];

for(const arr of [windowBackgrounds, editorBackgrounds, sidebarBackgrounds, panelBackgrounds]){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

const s = document.createElement("style");

if(windowBackgrounds.length > 0){
    s.appendChild(document.createTextNode(
    \`
body {

    background-position: ${position};
    background-repeat: ${repeat};
    background-size: ${size};
    opacity: ${opacity};

    background-image: url("\${windowBackgrounds[0]}");

}
    \`));
}

if(editorBackgrounds.length > 0){
    const len = editorBackgrounds.length;
    for(let i = 1; i <= len; i++){
        s.appendChild(document.createTextNode(
            \`
.split-view-view:nth-child(\${len}n+\${i}) > .editor-group-container::after {

    ${overlay}

    background-position: ${position};
    background-repeat: ${repeat};
    background-size: ${size};
    opacity: ${1-opacity};

    background-image: url("\${editorBackgrounds[i-1]}");

}
            \`));
    }
}

if(sidebarBackgrounds.length > 0){
    s.appendChild(document.createTextNode(
    \`
.split-view-view > #workbench\\\\.parts\\\\.sidebar::after {

    ${overlay}

    background-position: ${position};
    background-repeat: ${repeat};
    background-size: ${size};
    opacity: ${1-opacity};

    background-image: url("\${sidebarBackgrounds[0]}");

}

.split-view-view > #workbench\\\\.parts\\\\.auxiliarybar::after {

    ${overlay}

    background-position: ${position};
    background-repeat: ${repeat};
    background-size: ${size};
    opacity: ${1-opacity};

    background-image: url("\${sidebarBackgrounds[1] || sidebarBackgrounds[0]}");

}
    \`));
}

if(panelBackgrounds.length > 0){
    s.appendChild(document.createTextNode(
        \`


.split-view-view > #workbench\\\\.parts\\\\.panel::after {

    ${overlay}

    background-position: ${position};
    background-repeat: ${repeat};
    background-size: ${size};
    opacity: ${1-opacity};

    background-image: url("\${panelBackgrounds[0]}");

}
        \`));
}

s.appendChild(document.createTextNode(\`${css}\`));

window.onload = () => document.getElementsByTagName("head")[0].appendChild(s);
/* ${identifier}-end */
        `.trim();
}

const removeJS: (s: string) => string = (s: string) => {
    return s.replace(remove, "").trim();
}