/*
 * Copyright (C) 2023 Katsute <https://github.com/Katsute>
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

import * as tmp from "tmp";
import * as vscode from "vscode";
import * as sudo from "@vscode/sudo-prompt";

import * as fs from "fs";
import * as path from "path";

import * as config from "./command/config";
import * as reload from "./command/reload";
import * as install from "./command/install";
import * as uninstall from "./command/uninstall";
import * as changelog from "./command/changelog";
import * as help from "./command/help";

import * as file from "./command/config/file";

import { statusbar } from "./statusbar";
import { inject, clean } from "./extension/inject";
import { generateChecksum } from "./extension/file";

//

export let mdchange: vscode.Uri;
export let mdhelp: vscode.Uri;

const win: boolean = process.platform === "win32";

const cp: (files: [string, string][], asterisk?: boolean) => string = (files: [string, string][], asterisk: boolean = false) => {
    let commands: string[] = [];
    for(const file of files)
        commands.push(win
            ? `xcopy /r /y "${file[0]}" "${file[1]}${asterisk ? '*' : ''}"`
            : `cp -f '${file[0]}' '${file[1]}'`);
    return commands.join(" && ");
};

export const activate: (context: vscode.ExtensionContext) => any = (context: vscode.ExtensionContext) => {
    // internal files
    if(require.main && require.main.filename){
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/vs/workbench/workbench.desktop.main.js
        const workbench: string = js = path.join(path.dirname(require.main.filename), "vs", "workbench", "workbench.desktop.main.js");
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/product.json
        const product: string = json = path.join(path.dirname(require.main.filename), "../", "product.json");

        if(!fs.existsSync(workbench))
            vscode.window.showErrorMessage(`Failed to find '${workbench}, please report this issue`);
        else if(!fs.existsSync(product))
            vscode.window.showErrorMessage(`Failed to find '${product}, please report this issue`);
        else{ // workbench & product exists
            const workbench_backup: string = workbench.replace(".js", "-backup.js");
            const product_backup: string = product.replace(".json", "-backup.json");

            if(!fs.existsSync(workbench_backup) || !fs.existsSync(product_backup)){ // backup missing
                try{
                    fs.copyFileSync(workbench, workbench_backup);
                    fs.copyFileSync(product, product_backup);
                }catch(err: any){
                    vscode.window.showWarningMessage("Failed to backup files, run command as administrator?", {detail: `The Background extension does not have permission to backup to the VSCode folder, run command using administrator permissions?\n\n${err.message}`, modal: true}, "Yes").then((value?: string) => {
                        if(value === "Yes"){
                            const cmd: string = cp([[workbench, workbench_backup], [product, product_backup]], true);
                            sudo.exec(cmd, {name: "VSCode Extension Host"}, (ERR?: Error) => {
                                if(ERR)
                                    vscode.window.showErrorMessage("Failed to backup files", {
                                        detail: `OS: ${process.platform}\nUsing command: ${cmd}\n\n${ERR.message}`, modal: true
                                    });
                                else
                                    restartVS();
                            });
                        }else
                            vscode.window.showWarningMessage("Background extension is running without backup files");
                    });
                }
            }
        }
    }else
        vscode.window.showErrorMessage("Failed to find main file, please report this issue");

    // extension

    mdchange = vscode.Uri.file(path.join(context.extensionPath, "CHANGELOG.md"));
    mdhelp   = vscode.Uri.file(path.join(context.extensionPath, "HELP.md"));

    context.subscriptions.push(
        reload.command,
        install.command,
        uninstall.command,
        changelog.command,
        help.command,
        config.command,
        statusbar
    );

    statusbar.show();

    return {
        install: () => installJS(),
        uninstall: () => uninstallJS(),
        reload: () => vscode.commands.executeCommand("workbench.action.reloadWindow"),
        get: (ui: string) => {
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    return file.view(ui);
                default:
                    return undefined;
            }
        },
        add: async (ui: string, glob: string) => {
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await file.add(ui, glob, true);
                    return true;
                default:
                    return false;
            }
        },
        replace: async (ui: string, old: string, glob: string) => {
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await file.replace(ui, old, glob, true);
                    return true;
                default:
                    return false;
            }
        },
        remove: async (ui: string, glob: string) => {
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await file.remove(ui, glob, true);
                    return true;
                default:
                    return false;
            }
        }
    };
};

//

const replace: RegExp = /(?<=^\s*"vs\/workbench\/workbench\.desktop\.main\.js\": \").*(?=\",\s*$)/gm;

let js: string, json: string;

export const installJS: () => void = () => {
    js && json && write(inject(fs.readFileSync(js, "utf-8")));
}

export const uninstallJS: () => void = () => {
    js && json && write(clean(fs.readFileSync(js, "utf-8")));
}

export const write: (content: string) => void = (content: string) => {
    const checksum: string = generateChecksum(content);

    try{
        fs.writeFileSync(js, content, "utf-8");
        fs.writeFileSync(json, fs.readFileSync(json, "utf-8").replace(replace, checksum).trim(), "utf-8");
        restartVS();
    }catch(err: any){
        vscode.window.showWarningMessage("Failed to write changes, run command as administrator?", {detail: `The Background extension does not have permission to write changes, run command using administrator permissions?\n\n${err.message}`, modal: true}, "Yes").then((value?: string) => {
            if(value === "Yes"){
                const jst = tmp.fileSync().name;
                fs.writeFileSync(jst, content, "utf-8");
                const jnt = tmp.fileSync().name;
                fs.writeFileSync(jnt, fs.readFileSync(json, "utf-8").replace(replace, checksum).trim(), "utf-8");

                const cmd: string = cp([[jst, js], [jnt, json]]);
                sudo.exec(cmd, {name: "VSCode Extension Host"}, (ERR?: Error) => {
                    if(ERR)
                        vscode.window.showErrorMessage("Failed to write changes", {
                            detail: `OS: ${process.platform}\nUsing command: ${cmd}\n\n${ERR.message}`, modal: true
                        });
                    else
                        restartVS();
                });
            }
        });
    }
}

export const restartVS: () => void = () => {
    vscode.commands.executeCommand("workbench.action.reloadWindow");
}

export const extensions = (v: string, i: number, self: string[]) => { // images only
    const ext: string = path.extname(v);
    for(const m of file.extensions())
        if(`.${m}` === ext)
            return true;
    return false;
}