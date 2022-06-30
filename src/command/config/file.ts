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

import { CommandQuickPickItem, CommandQuickPickItemPromise, get, handle, options, quickPickItem, separator, update } from "../config";
import { notify } from "../install";

// config

const unique = (v: string, i: number, self: string[]) => self.indexOf(v) === i;

const add: (key: string, glob: string) => Promise<void> = (key: string, glob: string) => {
    return new Promise<void>(() => {
        const files: string[] = get(key) as string[];
        files.push(glob);
        update(key, files.filter(unique), true);
    });
}

const replace: (key: string, old: string, glob: string) => Promise<void> = (key: string, old: string, glob: string) => {
    return new Promise<void>(() => {
        const files: string[] = get(key) as string[];
        for(let i = 0, l = files.length; i < l; i++)
            if(files[i] === old)
                files[i] = glob;
        update(key, files.filter(unique), old === glob);
    });
}

const remove: (key: string, glob: string) => Promise<void> = (key: string, glob: string) => {
    return new Promise<void>(() => {
        update(
            key,
            (get(key) as string[])
                .filter((f) => f !== glob)
                .filter(unique)
        );
    });
}

// ui/config interface

export const extensions: () => string[] = () => ["png", "jpg", "jpeg", "webp", "gif"];

const updateItem: (key: string, item?: CommandQuickPickItem) => Promise<void> = (key: string, item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showInputBox({
        title: `Update ${item!.value}`,
        placeHolder: "File path or glob, leave blank to remove",
        value: item!.value ?? "",
        prompt: "Only '/' can be used for paths, '\\' is reserved for escape characters. Leave this field blank to remove.",
    }).then((value?: string) => {
        if(item && value !== undefined)
            if(value.trim().length === 0)
                remove(key, item.value!);
            else
                replace(key, item.value!, value);
    });
});

const addFile: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: true,
        openLabel: "Select Image",
        filters: {"Images": extensions()}
    }).then((files?: vscode.Uri[]) => {
        if(files)
            scope().then((value?: CommandQuickPickItem[]) => {
                if(value){
                    for(const file of files)
                        for(const s of value)
                            add(`${s.value}Backgrounds`, file.fsPath.replace(/\\/g, '/'));
                    if(files.length > 0 && value.length > 0)
                        notify();
                }
            });
    });
});

const addFolder: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: true,
        openLabel: "Select Folder"
    }).then((files?: vscode.Uri[]) => {
        if(files)
            scope().then((value?: CommandQuickPickItem[]) => {
                if(value){
                    for(const file of files)
                        for(const s of value)
                            add(`${s.value}Backgrounds`, `${file.fsPath.replace(/\\/g, '/')}/**`);
                    if(files.length > 0 && value.length > 0)
                        notify();
                }
            });
    });
});

const addGlob: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showInputBox({
        title: "Add File",
        placeHolder: "File path or glob",
        prompt: "Add a file or a glob. Only '/' can be used for paths, '\\' is reserved for escape characters.",
    }).then((glob?: string) => {
        if(glob)
            scope().then((value?: CommandQuickPickItem[]) => {
                if(value){
                    for(const s of value)
                        add(`${s.value}Backgrounds`, glob);
                    if(value.length > 0)
                        notify();
                }
            });
    });
});

// ui : scope

const scope: () => Promise<CommandQuickPickItem[] | undefined> = () => new Promise((res) => {
    vscode.window.showQuickPick(
        [
            quickPickItem({
                label: "$(window) Window",
                description: "Background for full window",
                value: "window"
            }),
            quickPickItem({
                label: "$(multiple-windows) Editor",
                description: "Background for editors",
                value: "editor"
            }),
            quickPickItem({
                label: "$(layout-sidebar-left) Sidebar",
                description: "Background for left and right sidebars",
                value: "sidebar"
            }),
            quickPickItem({
                label: "$(layout-panel) Panel",
                description: "Background for lower panel",
                value: "panel"
            }),
        ],
        {
            ...options,
            title: `${options.title} - Files - Scope`,
            placeHolder: "Scope",
            canPickMany: true
        }
    ).then(res);
});

// ui : dropdown

export const item: CommandQuickPickItem = {
    label: "File",
    description: "Select background image files",
    onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
        vscode.commands.executeCommand("background.config.background");
    })
}

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.background", () => {
    const items: CommandQuickPickItem[] = [];

    for(const scope of ["window", "editor", "sidebar", "panel"]){

        const icon: string | undefined = {
            window: "window",
            editor: "multiple-windows",
            sidebar: "layout-sidebar-left",
            panel: "layout-panel"
        }[scope];

        const files: string[] = get(`${scope}Backgrounds`) as string[];
        if(files.length > 0)
            items.push(quickPickItem({
                label: scope[0].toUpperCase() + scope.substring(1),
                kind: vscode.QuickPickItemKind.Separator
            }));
        for(const file of files.filter(unique))
            items.push(quickPickItem({
                label: (icon ? `$(${icon}) ` : "") + file.replace(/(\${\w+})/g, "\\$1"),
                value: file,
                onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                    updateItem(`${scope}Backgrounds`, item);
                })
            }));
    }

    vscode.window.showQuickPick(
        [
            ...items,
            separator(),
            quickPickItem({
                label: "$(file-add) Add a File",
                onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                    addFile(item);
                })
            }),
            quickPickItem({
                label: "$(file-directory-create) Add a Folder",
                onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                    addFolder(item);
                })
            }),
            quickPickItem({
                label: "$(kebab-horizontal) Add a Glob",
                onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                    addGlob(item);
                })
            })
        ],
        {
            ...options,
            title: `${options.title} - Files`,
            placeHolder: "Files"
        }
    ).then(handle);
});