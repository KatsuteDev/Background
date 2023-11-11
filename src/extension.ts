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

import * as sudo from "@vscode/sudo-prompt";

import * as path from "path";

import * as config from "./command/config";


import { copyCommand } from "./lib/file";
import { api } from "./extension/api";

import { reload as r, reload } from "./lib/vscode";
import { ExtensionContext, StatusBarAlignment, StatusBarItem, Uri, commands, window } from "vscode";
import { install, uninstall } from "./extension/writer";

import { existsSync, copyFileSync } from "fs";

//

export const activate: (context: ExtensionContext) => any = (context: ExtensionContext) => {
    let workbench: string;
    let product: string;
    // internal files
    if(require?.main?.filename){
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/vs/workbench/workbench.desktop.main.js
        workbench = path.join(path.dirname(require.main.filename), "vs", "workbench", "workbench.desktop.main.js");
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/product.json
        product = path.join(path.dirname(require.main.filename), "../", "product.json");

        if(!existsSync(workbench)){
            window.showErrorMessage(`Failed to find '${workbench}, please report this issue`);
            return;
        }else if(!existsSync(product)){
            window.showErrorMessage(`Failed to find '${product}, please report this issue`);
            return;
        }else{ // workbench & product exists
            const workbench_backup: string = workbench.replace(".js", "-backup.js");
            const product_backup: string = product.replace(".json", "-backup.json");

            if(!existsSync(workbench_backup) || !existsSync(product_backup)){ // backup missing
                try{
                    copyFileSync(workbench, workbench_backup);
                    copyFileSync(product, product_backup);
                }catch(err: any){
                    window.showWarningMessage("Failed to backup files, run command as administrator?", {detail: `The Background extension does not have permission to backup to the VSCode folder, run command using administrator permissions?\n\n${err.message}`, modal: true}, "Yes").then((value?: string) => {
                        if(value === "Yes"){
                            const cmd: string = copyCommand([[workbench, workbench_backup], [product, product_backup]]);
                            sudo.exec(cmd, {name: "VSCode Extension Host"}, (ERR?: Error) => {
                                if(ERR)
                                    window.showErrorMessage("Failed to backup files", {
                                        detail: `OS: ${process.platform}\nUsing command: ${cmd}\n\n${ERR.message}`, modal: true
                                    });
                                else
                                    r();
                            });
                        }else
                            window.showWarningMessage("Background extension is running without backup files");
                    });
                }
            }
        }
    }else{
        window.showErrorMessage("Failed to find main file, please report this issue");
        return;
    }

    // extension

    const changelog: Uri = Uri.file(path.join(context.extensionPath, "CHANGELOG.md"));
    const help: Uri = Uri.file(path.join(context.extensionPath, "HELP.md"));

    const statusbar: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right);

    statusbar.command = "background.config";
    statusbar.name = "Background";
    statusbar.text = "$(file-media) Background";
    statusbar.tooltip = "Open background configuration";

    context.subscriptions.push(
        commands.registerCommand("background.install", () => install(workbench, product)),
        commands.registerCommand("background.uninstall", () => uninstall(workbench, product)),
        commands.registerCommand("background.reload", reload),
        commands.registerCommand("background.help", () => commands.executeCommand("markdown.showPreview", help)),
        commands.registerCommand("background.changelog", () => commands.executeCommand("markdown.showPreview", changelog)),
        config.command,
        statusbar
    );

    statusbar.show();

    return api;
};