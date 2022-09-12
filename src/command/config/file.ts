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

import { get, update } from "../../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem, Scope, separator } from "../../vs/quickpick";

import { options } from "../config";
import { notify } from "../install";

// config

const unique = (v: string, i: number, self: string[]) => self.indexOf(v) === i;

const add: (scope: Scope, glob: string) => Promise<void> = (scope: Scope, glob: string) => new Promise<void>(() => {
    const files: string[] = get(`${scope}Backgrounds`) as string[];
    files.push(glob);
    update(`${scope}Backgrounds`, files.filter(unique), true);
});

const replace: (scope: Scope, old: string, glob: string) => Promise<void> = (scope: Scope, old: string, glob: string) => new Promise<void>(() => {
    const files: string[] = get(`${scope}Backgrounds`) as string[];
    for(let i = 0, l = files.length; i < l; i++)
        if(files[i] === old)
            files[i] = glob;
    update(`${scope}Backgrounds`, files.filter(unique), old === glob);
});

const remove: (scope: Scope, glob: string) => Promise<void> = (scope: Scope, glob: string) => new Promise<void>(() => {
    update(
        `${scope}Backgrounds`,
        (get(`${scope}Backgrounds`) as string[])
            .filter((f) => f !== glob)
            .filter(unique)
    );
});

// exts

export const extensions: () => string[] = () => ["png", "jpg", "jpeg", "webp", "gif"];

// update

const updateItem: (scope: Scope, item?: CommandQuickPickItem) => Promise<void> = (scope: Scope, item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showInputBox({
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
        }
    }).then((value?: string) => {
        if(item && value !== undefined)
            if(value.trim().length === 0)
                remove(scope, item.value!);
            else
                replace(scope, item.value!, value);
    });
});

// files

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const scope: Scope = item.scope!;

    // existing items
    const items: CommandQuickPickItem[] = (get(`${scope}Backgrounds`) as string[])
        .filter(unique)
        .map(file => quickPickItem({
            label: file.replace(/(\${\w+})/g, "\\$1"),
            value: file,
            onSelect: (item?: CommandQuickPickItem) => updateItem(scope, item)
        }));

    // show menu
    vscode.window.showQuickPick([
        // existing items
        ...items,
        separator(),
        // add
        quickPickItem({
            label: "$(file-add) Add a File",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                vscode.window.showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: true,
                    openLabel: "Select Image",
                    filters: {"Images": extensions()}
                }).then((files?: vscode.Uri[]) => {
                    if(files){
                        for(const file of files)
                            add(scope, file.fsPath.replace(/\\/g, '/'));
                        files.length > 0 && notify();
                    }
                });
            })
        }),
        quickPickItem({
            label: "$(file-directory-create) Add a Folder",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: true,
                    openLabel: "Select Folder"
                }).then((files?: vscode.Uri[]) => {
                    if(files){
                        for(const file of files)
                            add(scope, file.fsPath.replace(/\\/g, '/'));
                        files.length > 0 && notify();
                    }
                });
            })
        }),
        quickPickItem({
            label: "$(kebab-horizontal) Add a Glob",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
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
                        add(scope, glob);
                });
            })
        }),
        quickPickItem({
            label: "$(ports-open-browser-icon) Add a URL",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
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
                        add(scope, url);
                });
            })
        })
    ],
    {
        ...options,
        title: `${scope} ${options.title} - Files`,
        placeHolder: "Files"
    })
    .then(handle);
});