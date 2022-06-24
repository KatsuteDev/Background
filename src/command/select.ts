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

import { CommandQuickPickItem, CommandQuickPickItemPromise, get, handle, options, quickPickItem, separator, update } from "./config";

//

const unique = (v: string, i: number, self: string[]) => self.indexOf(v) === i;

const add: (s: string) => Promise<void> = (s: string) => {
    return new Promise<void>(() => {
        const files: string[] = get("files") as string[];
        files.push(s);
        update("files", files.filter(unique));
    });
}

const replace: (old: string, now: string) => Promise<void> = (old: string, now: string) => {
    return new Promise<void>(() => {
        const files: string[] = get("files") as string[];
        for(let i = 0, l = files.length; i < l; i++)
            if(files[i] === old)
                files[i] = now;
        update("files", files.filter(unique));
    });
}

const remove: (s: string) => Promise<void> = (s: string) => {
    return new Promise<void>(() => {
        update(
            "files",
            (get("files") as string[])
                .filter((f) => f !== s)
                .filter(unique)
        );
    });
}

//

const updateItem: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showInputBox({
        title: "File",
        placeHolder: "File path or glob",
        value: item!.label,
        prompt: "Leave blank to remove",
    }).then((value?: string) => {
        if(item){
            if(value === undefined || value.trim().length === 0)
                remove(item.value!);
            else
                replace(item.value!, value);
        }
    });
});

const addFile: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: true,
        openLabel: "Select Image",
        filters: {"Images": ["png", "jpg", "jpeg", "webp", "gif"]}
    }).then((value?: vscode.Uri[]) => {
        if(value)
            for(const file of value)
                add(file.fsPath.replace('\\', '/'));
    });
});

const addFolder: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: true,
        openLabel: "Select Folder"
    }).then((value?: vscode.Uri[]) => {
        if(value)
            for(const file of value)
                add(`${file.fsPath.replace('\\', '/')}/**`);
    });
});

const addGlob: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    vscode.window.showInputBox({
        title: "Add glob",
        placeHolder: "File path or glob",
        prompt: "Add file path or glob, only use '/' for paths,  '\\' are reserved for escape characters only",
    }).then((value?: string) => {
        if(value)
            add(value);
    });
});

//

export const select: vscode.Disposable = vscode.commands.registerCommand("code-background.select", () => {
    const items: CommandQuickPickItem[] = [];

    const files: string[] = get("files") as string[];

    for(const file of files)
        items.push(quickPickItem({
            label: file.replace(/(\${\w+})/, "\\$1"),
            value: file,
            onSelect: updateItem
        }))

    vscode.window.showQuickPick(
        [
            ...items,
            separator(),
            quickPickItem({
                label: "$(file-add) Add File",
                onSelect: addFile
            }),
            quickPickItem({
                label: "$(file-directory-create) Add Folder",
                onSelect: addFolder
            }),
            quickPickItem({
                label: "$(kebab-horizontal) Add Glob",
                onSelect: addGlob
            }),
        ],
        {
            ...options,
            title: `${options.title} - Files`,
            placeHolder: "Files",
        }
    ).then(handle);
});