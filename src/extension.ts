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

    if(require.main && require.main.filename){

        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/bootstrap-window.js

        const file: string = path.join(path.dirname(require.main.filename), "bootstrap-window.js");
        if(fs.existsSync(file)){
            js = file;
            const backup: string = path.join(path.dirname(require.main.filename), "bootstrap-window-backup.js");
            fs.existsSync(backup) || fs.copyFileSync(file, backup);
        }else
            vscode.window.showWarningMessage(`Failed to find 'bootstrap-window.js'`);
    }else
        vscode.window.showErrorMessage("Failed to find main file");

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


// todo: file for window background image
// todo: file for editor background image
// todo: file for panel image (lower)
// todo: file for sidebar image (always include aux sidebar)
// todo: nth loop for background images (editor only)

// * :: body
// sidebar :: .split-view-view > #workbench.parts.sidebar
// rightbar :: .split-view-view > #workbench.parts.auxiliarybar
// editor :: .split-view-view > .editor-group-container
// panel :: .split-view-view > #workbench.parts.panel

const getJS: () => string = () => {
    const images: string[] = []; // image data url with quotes

    for(const g of (get("files") as string[]).filter(unique)){
        for(const f of glob.sync(g)){
            const ext: string = path.extname(f);
            // make sure this matches command/file/addFile$filters
            switch(ext){
                case ".png":
                case ".jpeg":
                case ".jpg":
                case ".webp":
                case ".gif":
                    images.push('"' + `data:image/${ext.substring(1)};base64,${fs.readFileSync(f, "base64")}` + '"');
            }
        }
    }

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
        "Manual": get("align-css") as string,
    }[get("align") as string] || "center center";

    const opacity: number = get("opacity") as number;

    const repeat: string = {
        "No Repeat": "no-repeat",
        "Repeat": "repeat",
        "Repeat X": "repeat-x",
        "Repeat Y": "repeat-y",
        "Repeat Space": "space",
        "Repeat Round": "round"
    }[get("repeat") as string] || "no-repeat";

    const size: string = {
        "Auto": "auto",
        "Contain": "contain",
        "Cover": "cover",
        "Manual": get("size-css") as string
    }[get("size") as string] || "auto";

    return `
/* ${identifier}-start */
const images = [${images.join(',')}];

for (let i = images.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
}

if(images.length > 0){
    const s = document.createElement("style");
    s.appendChild(document.createTextNode(
    \`
    body {

        background-position: "${position}";
        background-repeat: "${repeat}";
        background-size: "${size}";
        opacity: ${opacity};

        background-image: url("\${images[0]}");

    }
    \`));

    document.getElementsByTagName("head")[0].appendChild(s);
}
/* ${identifier}-end */
        `.trim();
}

const removeJS: (s: string) => string = (s: string) => {
    return s.replace(remove, "").trim();
}