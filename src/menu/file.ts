/*
 * Copyright (C) 2024 Katsute <https://github.com/Katsute>
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

import { Uri, window } from "vscode";

import { extensions } from "../extension/inject";
import { UI, get as getConfig, update } from "../extension/config";

import { appendS } from "../lib/string";
import { count, escapePath } from "../lib/glob";
import { unique } from "../lib/array";
import { CommandQuickPickItem, quickPickItem, separator, showInputBox, showQuickPick } from "../lib/vscode";

import { backgroundMenu, title } from "./menu";

// config

export const get: (ui: UI) => string[] = (ui: UI) => getConfig(`${ui}Backgrounds`);

export const add: (ui: UI, glob: string | string[], skipNotification?: boolean) => Promise<void> = async (ui: UI, glob: string | string[], skipNotification: boolean = false) => {
    // add
    const globs: string[] = get(ui);
    globs.push(...(!Array.isArray(glob) ? [glob] : glob));

    // update
    await update(`${ui}Backgrounds`, globs.filter(unique), undefined, skipNotification);
    skipNotification || show(ui); // reopen menu
}

export const replace: (ui: UI, replace: string, glob: string, skipNotification?: boolean) => Promise<void> = async (ui: UI, replace: string, glob: string, skipNotification: boolean = false) => {
    // replace matching
    const files: string[] = get(ui).filter(unique);
    for(let i = 0, len = files.length; i < len; i++)
        if(files[i] === replace){
            files[i] = glob;
            break;
        }

    // updates
    await update(`${ui}Backgrounds`, files.filter(unique), undefined, skipNotification || replace === glob);
    skipNotification || show(ui); // reopen menu
}

export const remove: (ui: UI, glob: string | string[], skipNotification?: boolean) => Promise<void> = async (ui: UI, glob: string | string[], skipNotification: boolean = false) => {
    // remove matching
    const match: string[] = !Array.isArray(glob) ? [glob] : glob;
    await update(
        `${ui}Backgrounds`,
        get(ui)
            .filter(item => !match.includes(item))
            .filter(unique),
        undefined,
        skipNotification
    );
    skipNotification || show(ui); // reopen menu
}

// menu

export const show: (ui: UI) => void = (ui: UI) =>{
    // existing items
    const items: CommandQuickPickItem[] = get(ui)
        .filter(unique)
        .map(glob => quickPickItem({
            label: glob.replace(/(\$\(\w+\))/g, "\\$1"),
            value: glob,
            ui,
            description: `${appendS(count(glob), "matching file")}`,
            // update input
            handle: (item: CommandQuickPickItem) =>
                showInputBox({
                    title: `Update ${item.value}`,
                    placeHolder: "File path, glob, or URL; leave blank to remove",
                    value: item.value ?? "",
                    prompt: "Use only '/' for directories, '\\' is reserved for escape characters. Leave this field blank to remove.",
                    // validation
                    validateInput: (value: string) => {
                        if(value.startsWith("file://"))
                            return "Do not include 'file://' as part of the file path";
                        else if(value.startsWith("http://"))
                            return "Images must be served over HTTPS";
                        else
                            return null;
                    },
                    // update
                    handle: (value: string) => {
                        if(value.trim().length === 0)
                            remove(ui, item.value!);
                        else
                            replace(ui, item.value!, value);
                    }
                })
        }));

    // menu
    showQuickPick([
        // existing items
        ...items,
        // add
        separator(),
        quickPickItem({ // file
            alwaysShow: true,
            label: "$(file-add) Add a File",
            ui,
            handle: (item: CommandQuickPickItem) =>
                window.showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: true,
                    openLabel: "Select Image",
                    filters: {"Images": extensions()}
                }).then((files?: Uri[]) =>
                    files && add(ui, files.map(file => escapePath(file)))
                )
        }),
        quickPickItem({ // folder
            alwaysShow: true,
            label: "$(file-directory-create) Add a Folder",
            ui,
            handle: (item: CommandQuickPickItem) =>
                window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: true,
                    openLabel: "Select Folder"
                }).then((files?: Uri[]) =>
                    files && add(ui, files.map(file => `${escapePath(file)}/**`))
                )
        }),
        quickPickItem({ // glob
            alwaysShow: true,
            label: "$(kebab-horizontal) Add a Glob",
            ui,
            handle: (item: CommandQuickPickItem) =>
                window.showInputBox({
                    title: "Add Glob",
                    placeHolder: "File path or glob",
                    prompt: "Add a file or a glob. Use only '/' for directories, '\\' is reserved for escape characters.",
                    validateInput: (value: string) => {
                        if(value.startsWith("file://"))
                            return "Do not include 'file://' as part of the file path";
                        else if(value.startsWith("http://") || value.startsWith("https://"))
                            return "Image URLs do not support glob, use Add URL option"
                        else
                            return null;
                    }
                }).then((glob?: string) => {
                    glob && add(ui, glob!);
                })
        }),
        quickPickItem({ // url
            alwaysShow: true,
            label: "$(ports-open-browser-icon) Add a URL",
            ui,
            handle: (item: CommandQuickPickItem) =>
                window.showInputBox({
                    title: "Add URL",
                    placeHolder: "Image URL",
                    prompt: "Add a image URL. Must be served over HTTPS",
                    validateInput: (value: string) => {
                        if(value.startsWith("file://"))
                            return "File URLs not accepted, use Add File option";
                        else if(value.startsWith("http://"))
                            return "Images must be served over HTTPS";
                        else if(value.startsWith("https://"))
                            return null;
                        else
                            return "Invalid URL";
                    }
                }).then((url?: string) => {
                    url && add(ui, url);
                })
        }),
        // delete
        ... items.length > 0 ? [
            separator(),
            quickPickItem({
                alwaysShow: true,
                label: "$(trash) Delete a Background",
                ui,
                handle: (item: CommandQuickPickItem) => {
                    const items: CommandQuickPickItem[] = get(ui)
                        .filter(unique)
                        .map(glob => {
                            const matches: number = count(glob);
                            return quickPickItem({
                                label: glob.replace(/(\$\(\w+\))/g, "\\$1"),
                                value: glob,
                                ui: item.ui,
                                description: `${appendS(matches, "matching file")}`
                            });
                        });

                        window.showQuickPick(
                            items,
                            {
                                title: title("Delete", ui),
                                placeHolder: "Files",
                                canPickMany: true
                            }
                        ).then((selected?: CommandQuickPickItem[]) =>
                            selected && remove(ui, selected.map(item => item.value!))
                        );
                }
            })
        ] : []
    ], {
        title: title("Files", ui),
        placeHolder: "Files"
    },
    () => backgroundMenu(ui));
}