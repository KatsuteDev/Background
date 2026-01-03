/*
 * Copyright (C) 2026 Katsute <https://github.com/Katsute>
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

import { join } from "path";
import { platform, release } from "os";
import { exec } from "@vscode/sudo-prompt";
import { existsSync, copyFileSync } from "fs";
import { ConfigurationTarget, ExtensionContext, StatusBarAlignment, StatusBarItem, Uri, commands, window } from "vscode";

import { copyCommand } from "./lib/file";
import { reload } from "./lib/vscode";

import { api } from "./extension/api";
import { install, uninstall } from "./extension/writer";
import { optionMenu } from "./menu/menu";
import { configuration, get, update } from "./extension/config";
import { env } from "vscode";
import { setUserDir } from "./extension/env";

//

const forcedDelay: number = 1000; // how long to delay install when VSCode is operational

export let installDelay = 7000; // how long to delay install when VSCode is init

export const setActive: (active?: boolean) => void = (active?: boolean) => {
    statusbar.text = `$(${active === false ? "file-media" : "loading~spin"}) Background`;
}

export const statusbar: StatusBarItem = (() => {
    const item: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right);

    item.command = "background.config";
    item.name = "Background";
    item.text = "$(file-media) Background";
    item.tooltip = "Open background configuration";

    return item;
})();

export const activate: (context: ExtensionContext) => any = (context: ExtensionContext) => {
    let workbench: string;
    let product: string;

    const dir = env.appRoot;

    setUserDir(join(context.globalStorageUri.fsPath, "../../../User")); // for env var

    // internal files
    if(dir){
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/out/vs/workbench/workbench.desktop.main.js
        workbench = join(dir, "out", "vs", "workbench", "workbench.desktop.main.js");
        // %appdata%/Local/Programs/Microsoft VS Code/resources/app/product.json
        product = join(dir, "product.json");

        if(!existsSync(workbench)){
            window.showErrorMessage(`Failed to find '${workbench}', please report this issue`);
            return;
        }else if(!existsSync(product)){
            window.showErrorMessage(`Failed to find '${product}', please report this issue`);
            return;
        }else{ // workbench & product exists
            const workbench_backup: string = workbench.replace(".js", "-backup.js");
            const product_backup: string = product.replace(".json", "-backup.json");

            if(!existsSync(workbench_backup) || !existsSync(product_backup)){ // backup missing
                try{
                    copyFileSync(workbench, workbench_backup);
                    copyFileSync(product, product_backup);
                }catch(err: any){
                    const snap: boolean = platform() === "linux" &&
                    /* also in         */ workbench.toString().replace(/\\/g, '/').includes("/snap/") &&
                    /* writer.ts       */ product.toString().replace(/\\/g, '/').includes("/snap/");

                    if(snap){
                        window.showErrorMessage("Background extension does not support snap installations, use deb or rpm");
                        return;
                    }else{
                        window.showWarningMessage("Failed to backup files, run command as administrator?", {detail: `The Background extension does not have permission to backup to the VSCode folder, run command using administrator permissions?\n\n${err.message}`, modal: true}, "Yes").then((value?: string) => {
                            if(value === "Yes"){
                                const command: string = copyCommand([
                                    [workbench, workbench_backup],
                                    [product, product_backup]
                                ]);
                                exec(command, {name: "VSCode Extension Host"}, (err?: Error) => {
                                    if(err)
                                        window.showErrorMessage(
                                            "Failed to backup files",
                                            {
                                                detail: `OS: ${platform()} ${release()}\nUsing command: ${command}\n\n${err.name}\n${err.message}`.trim(),
                                                modal: true
                                            }
                                        );
                                });
                            }else
                                window.showWarningMessage("Background extension is running without backup files");
                        });
                    }
                }
            }
        }
    }else{
        window.showErrorMessage("Failed to find application directory, please report this issue");
        return;
    }

    // extension

    const changelog: Uri = Uri.file(join(context.extensionPath, "CHANGELOG.md"));
    const help: Uri = Uri.file(join(context.extensionPath, "HELP.md"));

    context.subscriptions.push(
        commands.registerCommand("background.install", () => install(workbench, product, true)),
        commands.registerCommand("background.uninstall", () =>
            configuration()
                .update("autoInstall", false, ConfigurationTarget.Global)
                .then(() => uninstall(workbench, product, true))
        ),
        commands.registerCommand("background.reload", reload),
        commands.registerCommand("background.help", () => commands.executeCommand("markdown.showPreview", help)),
        commands.registerCommand("background.changelog", () => commands.executeCommand("markdown.showPreview", changelog)),
        commands.registerCommand("background.config", optionMenu),
        statusbar
    );

    statusbar.show();

    // migrate

    if(!configuration().has("useInvertedOpacity")){
        commands.executeCommand("workbench.action.reloadWindow"); // outdated manifest, force reload
    }

    if(context.globalState.get("migratedOpacity") !== true){ // if not yet migrated
        if(get("backgroundOpacity", {scope: "global", includeDefault: false})){ // has opacity set
            update("useInvertedOpacity", true, undefined, true) // update setting
                .then(() => context.globalState.update("migratedOpacity", true)) // set migrated (changed)
                .then(() => window.showInformationMessage("Background opacity settings have been migrated to the latest version."));
        }else{
            context.globalState.update("migratedOpacity", true); // set migrated (no change)
        }
    }

    // install

    if(configuration().get("autoInstall"))
        install(workbench, product, false);

    // delay before VSCode will actually refresh properly
    for(let i = installDelay; i > forcedDelay; i -= 1000)
        setTimeout(() => installDelay -= 1000, i);

    return api;
};