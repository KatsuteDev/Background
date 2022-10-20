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

import { ConfigKey } from "./vs/package";

import * as vscode from "vscode";

import { css, cssValue, get } from "./vs/vsconfig";

import { glob } from "glob";

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

import { unique } from "./lib/unique";

import * as reload from "./command/reload";
import * as install from "./command/install";
import * as uninstall from "./command/uninstall";
import * as changelog from "./command/changelog";

import { config } from "./command/config";

import * as file from "./command/config/file";

import { statusbar } from "./statusbar";
import { round } from "./lib/round";

//

const identifier: string = "KatsuteDev/Background";

export let clog: vscode.Uri;

export const activate: (context: vscode.ExtensionContext) => void = (context: vscode.ExtensionContext) => {

    // backend

    if(require.main && require.main.filename){

        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/vs/workbench/workbench.desktop.main.js

        {
            const base: string = path.join(path.dirname(require.main.filename), "vs", "workbench");

            const file: string = js = path.join(base, "workbench.desktop.main.js");
            const name: string = path.basename(file);

            if(fs.existsSync(file)){
                const backup: string = path.join(base, `${path.parse(name).name}-backup.js`);
                if(!fs.existsSync(backup)){
                    fs.copyFileSync(file, backup);
                    vscode.window.showInformationMessage(`A backup was created for '${name}'`);
                }
            }else
                vscode.window.showErrorMessage(`Failed to find '${name}'`);
        }

        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/product.json

        {
            const base: string = path.join(path.dirname(require.main.filename), "../");

            const file: string = json = path.join(base, "product.json");
            const name: string = path.basename(file);

            if(fs.existsSync(file)){
                const backup: string = path.join(base, `${path.parse(name).name}-backup.json`);
                if(!fs.existsSync(backup)){
                    fs.copyFileSync(file, backup);
                    vscode.window.showInformationMessage(`A backup was created for '${name}'`);
                }
            }else
                vscode.window.showErrorMessage(`Failed to find '${name}'`);
        }

    }else
        vscode.window.showErrorMessage("Failed to find main file");

    // extension

    clog = vscode.Uri.file(path.join(context.extensionPath, "CHANGELOG.md"));

    context.subscriptions.push(reload.command);
    context.subscriptions.push(install.command);
    context.subscriptions.push(uninstall.command);
    context.subscriptions.push(changelog.command);

    context.subscriptions.push(config);

    context.subscriptions.push(statusbar);
    statusbar.show();
};

//

let js: string;

export const installJS: () => void = () => {
    if(js){
        fs.writeFileSync(js, removeJS(fs.readFileSync(js, "utf-8")) + '\n' + getJS(), "utf-8");
        writeChecksum();
    }
}

export const uninstallJS: () => void = () => {
    if(js){
        fs.writeFileSync(js, removeJS(fs.readFileSync(js, "utf-8")), "utf-8");
        writeChecksum();
    }
}

export const restartVS: () => void = () => {
    vscode.commands.executeCommand("workbench.action.reloadWindow");
}

let json: string;

const checksum: (file: string) => string = (file: string) =>
    crypto
        .createHash("md5")
        .update(fs.readFileSync(file, "utf-8"))
        .digest("base64")
        .replace(/=+$/gm, '');

const replace: RegExp = /(?<=^\s*"vs\/workbench\/workbench\.desktop\.main\.js\": \").*(?=\",\s*$)/gm;

const writeChecksum: () => void = () => {
    json && fs.writeFileSync(json, fs.readFileSync(json, "utf-8").replace(replace, checksum(js)).trim());
}

//

const remove: RegExp = new RegExp(`^\\/\\* ${identifier}-start \\*\\/$` + `[\\s\\S]*?` + `^\\/\\* ${identifier}-end \\*\\/$`, "gmi");

const extensions = (v: string, i: number, self: string[]) => { // images only
    const ext: string = path.extname(v);
    for(const m of file.extensions())
        if(`.${m}` === ext)
            return true;
    return false;
}

const getJS: () => string = () => {
    // populate images

    const images: {[key: string]: string[]} = { // include start and end quotes
        window: [],
        editor: [],
        sidebar: [],
        panel: []
    };

    for(const s of ["window", "editor", "sidebar", "panel"])
        for(const g of (get(`${s}Backgrounds` as ConfigKey) as string[]).filter(unique))
            if(g.startsWith("https://")) // use literal URL
                images[s].push('"' + g + '"');
            else // use glob
                for(const f of glob.sync(g).filter(extensions))
                    images[s].push('"' + `data:image/${path.extname(f).substring(1)};base64,${fs.readFileSync(f, "base64")}` + '"');

    return `/* ${identifier}-start */` + '\n' +
// background image css
(`
const bk_global = document.createElement("style");
bk_global.id = "${identifier}-global";
bk_global.setAttribute("type", "text/css");

bk_global.appendChild(document.createTextNode(\`

    body[windowTransition="true"]::before,
    body[editorTransition="true"] .split-view-view > .editor-group-container::after,
    body[sidebarTransition="true"] .split-view-view > #workbench\\\\.parts\\\\.sidebar::after,
    body[sidebarTransition="true"] .split-view-view > #workbench\\\\.parts\\\\.auxiliarybar::after,
    body[panelTransition="true"] .split-view-view > #workbench\\\\.parts\\\\.panel::after {

        opacity: 0;

    }

    body::before,
    .split-view-view > .editor-group-container::after,
    .split-view-view > #workbench\\\\.parts\\\\.sidebar::after,
    .split-view-view > #workbench\\\\.parts\\\\.auxiliarybar::after,
    .split-view-view > #workbench\\\\.parts\\\\.panel::after {

        content: "";

        top: 0;

        width: 100%;
        height: 100%;

        z-index: 1000;

        position: absolute;

        pointer-events: none;

        transition: opacity 1s ease-in-out;

    }
\`));
`
+ // notification overrides
`
bk_global.appendChild(document.createTextNode(\`
    div.notifications-toasts div.monaco-list[aria-label="Your Code installation appears to be corrupt. Please reinstall., notification"] {

        display: none;

    }

    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"],
    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"]:hover {

        background-color: #0098FF !important;
        border-radius: .5rem;
        color: white;

    }

    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"] ::before {

        color: white;

    }
\`));
`
+ // custom user css
`
bk_global.appendChild(document.createTextNode("${cssValue(get("CSS"))}"));
`
+ // background image cache
`
const windowBackgrounds = [${images.window.join(',')}];
const editorBackgrounds = [${images.editor.join(',')}];
const sidebarBackgrounds = [${images.sidebar.join(',')}];
const panelBackgrounds = [${images.panel.join(',')}];

const iWindowBackgrounds = [...Array(${images.window.length}).keys()];
const iEditorBackgrounds = [...Array(${images.editor.length}).keys()];
const iSidebarBackgrounds = [...Array(${images.sidebar.length}).keys()];
const iPanelBackgrounds = [...Array(${images.panel.length}).keys()];
`
+ // background images
`
const bk_image = document.createElement("style");
bk_image.id = "${identifier}-images";
bk_image.setAttribute("type", "text/css");

const setBackground = () => {
    while(bk_image.firstChild){
        bk_image.removeChild(bk_image.firstChild);
    };
`
+ // window
`
    if(windowBackgrounds.length > 0){
        bk_image.appendChild(document.createTextNode(\`
            body::before {

                background-image: url("\${windowBackgrounds[iWindowBackgrounds[0]]}");

                background-position: ${css("backgroundAlignment", "window")};
                background-repeat: ${css("backgroundRepeat", "window")};
                background-size: ${css("backgroundSize", "window")};

                opacity: ${round(1 - +css("backgroundOpacity", "window"), 2)};

                filter: blur(${css("backgroundBlur", "window")});

            }
        \`));
    };
`
+ // editor
`
    if(editorBackgrounds.length > 0){
        const len = editorBackgrounds.length;
        bk_image.appendChild(document.createTextNode(\`
            .split-view-view > .editor-group-container::after {

                background-position: ${css("backgroundAlignment", "editor")};
                background-repeat: ${css("backgroundRepeat", "editor")};
                background-size: ${css("backgroundSize", "editor")};

                opacity: ${round(1 - +css("backgroundOpacity", "editor"), 2)};

                filter: blur(${css("backgroundBlur", "editor")});

            }
        \`));
        for(let i = 1; i <= len; i++){
            bk_image.appendChild(document.createTextNode(\`
                .split-view-view:nth-child(\${len}n+\${i}) > .editor-group-container::after {

                    background-image: url("\${editorBackgrounds[iEditorBackgrounds[i-1]]}");

                }
            \`));
        };
    };
`
+ // sidebar
`
    if(sidebarBackgrounds.length > 0){
        bk_image.appendChild(document.createTextNode(\`
            .split-view-view > #workbench\\\\.parts\\\\.sidebar::after {

                background-image: url("\${sidebarBackgrounds[iSidebarBackgrounds[0]]}");

                background-position: ${css("backgroundAlignment", "sidebar")};
                background-repeat: ${css("backgroundRepeat", "sidebar")};
                background-size: ${css("backgroundSize", "sidebar")};

                opacity: ${round(1 - +css("backgroundOpacity", "sidebar"), 2)};

                filter: blur(${css("backgroundBlur", "sidebar")});

            }
            .split-view-view > #workbench\\\\.parts\\\\.auxiliarybar::after {

                background-image: url("\${sidebarBackgrounds[iSidebarBackgrounds[1] || 0]}");

                background-position: ${css("backgroundAlignment", "sidebar")};
                background-repeat: ${css("backgroundRepeat", "sidebar")};
                background-size: ${css("backgroundSize", "sidebar")};

                opacity: ${round(1 - +css("backgroundOpacity", "sidebar"), 2)};

                filter: blur(${css("backgroundBlur", "sidebar")});

            }
        \`));
    };
`
+ // panel
`
    if(panelBackgrounds.length > 0){
        bk_image.appendChild(document.createTextNode(\`
            .split-view-view > #workbench\\\\.parts\\\\.panel::after {

                background-image: url("\${panelBackgrounds[iPanelBackgrounds[0]]}");

                background-position: ${css("backgroundAlignment", "panel")};
                background-repeat: ${css("backgroundRepeat", "panel")};
                background-size: ${css("backgroundSize", "panel")};

                opacity: ${round(1 - +css("backgroundOpacity", "panel"), 2)};

                filter: blur(${css("backgroundBlur", "panel")});

            }
        \`));
    };
};
`
+ // randomize backgrounds
`
const randomize = () => {
    for(const arr of [iWindowBackgrounds, iEditorBackgrounds, iSidebarBackgrounds, iPanelBackgrounds]){
        shuffle(arr);
    };
};

const shuffle = (arr) => {
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};
`
+ // install
`
window.onload = () => {
    document.getElementsByTagName("head")[0].appendChild(bk_global);
    document.getElementsByTagName("head")[0].appendChild(bk_image);

    randomize();
    setBackground();
};
`)
// minify
    .trim()
    .replace(/^ +/gm, '') // spaces
    .replace(/\r?\n/gm, '') + // newlines
    '\n' + `/* ${identifier}-end */`; // EOF
}

const removeJS: (s: string) => string = (s: string) => {
    return s.replace(remove, "").trim();
}