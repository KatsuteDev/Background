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

import { showInputBox } from "../../vs/inputbox";
import { get, UI, update } from "../../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../../vs/quickpick";

import { unique } from "../../lib/unique";

import { menu as cm, options } from "../config";
import { notify } from "../install";
import { capitalize } from "../../lib/str";

// config

const add: (ui: UI, glob: string) => void = (ui: UI, glob: string) => {
    const files: string[] = get(`${ui}Backgrounds`) as string[];
    files.push(glob);
    update(`${ui}Backgrounds`, files.filter(unique));
    cm({label: '␀', ui}); // reopen files
};

const replace: (ui: UI, old: string, glob: string) => void = (ui: UI, old: string, glob: string) => {
    const files: string[] = get(`${ui}Backgrounds`) as string[];
    for(let i = 0, l = files.length; i < l; i++)
        if(files[i] === old)
            files[i] = glob;
    update(`${ui}Backgrounds`, files.filter(unique), undefined, old === glob);
    cm({label: '␀', ui}); // reopen files
};

const remove: (ui: UI, glob: string) => void = (ui: UI, glob: string) => {
    update(
        `${ui}Backgrounds`,
        (get(`${ui}Backgrounds`) as string[])
            .filter((f) => f !== glob)
            .filter(unique)
    );
    cm({label: '␀', ui}); // reopen files
};

// exts

export const extensions: () => string[] = () => ["png", "jpg", "jpeg", "webp", "gif"];

// update

const updateItem: (ui: UI, item: CommandQuickPickItem) => void = (ui: UI, item: CommandQuickPickItem) => {
    showInputBox({
        title: `Update ${item!.value}`,
        placeHolder: "File path, glob, or URL, leave blank to remove",
        value: item!.value ?? "",
        prompt: "Only '/' can be used for paths, '\\' is reserved for escape characters. Leave this field blank to remove.",
        validateInput: (value: string) => {
            if(value.startsWith("file://"))
                return "Do not include 'file://' as part of the file path";
            else if(value.startsWith("http://"))
                return "Images must be served over HTTPS";
            else
                return null;
        },
        handle: (value: string) => {
            if(value.trim().length === 0)
                remove(ui, item.value!);
            else
                replace(ui, item.value!, value);
        }
    });
};

// files

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    // existing items
    const items: CommandQuickPickItem[] = (get(`${item.ui!}Backgrounds`) as string[])
        .filter(unique)
        .map(file => quickPickItem({
            label: file.replace(/(\${\w+})/g, "\\$1"),
            value: file,
            ui: item.ui,
            handle: (item: CommandQuickPickItem) => updateItem(item.ui!, item)
        }));

    // show menu
    showQuickPick([
        // existing items
        ...items,
        separator(),
        // add
        quickPickItem({
            label: "$(file-add) Add a File",
            ui: item.ui!,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: true,
                    openLabel: "Select Image",
                    filters: {"Images": extensions()}
                }).then((files?: vscode.Uri[]) => {
                    if(files){
                        for(const file of files)
                            add(item.ui!, file.fsPath.replace(/\\/g, '/'));
                        files.length > 0 && notify();
                    }
                });
            }
        }),
        quickPickItem({
            label: "$(file-directory-create) Add a Folder",
            ui: item.ui!,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: true,
                    openLabel: "Select Folder"
                }).then((files?: vscode.Uri[]) => {
                    if(files){
                        for(const file of files)
                            add(item.ui!, file.fsPath.replace(/\\/g, '/'));
                        files.length > 0 && notify();
                    }
                });
            }
        }),
        quickPickItem({
            label: "$(kebab-horizontal) Add a Glob",
            ui: item.ui!,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showInputBox({
                    title: "Add File",
                    placeHolder: "File path or glob",
                    prompt: "Add a file or a glob. Only '/' can be used for paths, '\\' is reserved for escape characters.",
                    validateInput: (value: string) => {
                        if(value.startsWith("file://"))
                            return "Do not include 'file://' as part of the file path";
                        else if(value.startsWith("http://") || value.startsWith("https://"))
                            return "Image URLs do not support glob, use Add URL option"
                        else
                            return null;
                    }
                }).then((glob?: string) => {
                    if(glob)
                        add(item.ui!, glob);
                });
            }
        }),
        quickPickItem({
            label: "$(ports-open-browser-icon) Add a URL",
            ui: item.ui!,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showInputBox({
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
                    if(url)
                        add(item.ui!, url);
                });
            }
        })
    ],
    {
        ...options,
        title: `${capitalize(item.ui!)} ${options.title} - Files`,
        placeHolder: "Files"
    });
};