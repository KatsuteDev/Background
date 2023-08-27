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

import * as vscode from "vscode";

import { showInputBox } from "../../vs/inputbox";
import { get, UI, update } from "../../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../../vs/quickpick";

import * as str from "../../lib/str";
import * as glob from "../../lib/glob";
import { unique } from "../../lib/unique";

import { menu as cm, options, title as t } from "../config";

// config

export const view: (ui: UI) => string[] = (ui: UI) => {
    return get(`${ui}Backgrounds`) as string[];
}

export const add: (ui: UI, glob: string, skipWarning?: boolean) => Promise<void> = async (ui: UI, glob: string, skipWarning: boolean = false) => {
    await addMultiple(ui, [glob], skipWarning);
}

export const addMultiple: (ui: UI, globs: string[], skipWarning?: boolean) => Promise<void> = async (ui: UI, globs: string[], skipWarning: boolean = false) => {
    const files: string[] = get(`${ui}Backgrounds`) as string[];
    files.push(...globs);
    await update(`${ui}Backgrounds`, files.filter(unique), undefined, skipWarning);
    skipWarning || menu(ui); // reopen menu
}

export const replace: (ui: UI, old: string, glob: string, skipWarning?: boolean) => Promise<void> = async (ui: UI, old: string, glob: string, skipWarning: boolean = false) => {
    const files: string[] = get(`${ui}Backgrounds`) as string[];
    for(let i = 0, l = files.length; i < l; i++)
        if(files[i] === old)
            files[i] = glob;
    await update(`${ui}Backgrounds`, files.filter(unique), undefined, skipWarning || old === glob);
    skipWarning || menu(ui); // reopen menu
};

export const remove: (ui: UI, glob: string, skipWarning?: boolean) => Promise<void> = async (ui: UI, glob: string, skipWarning: boolean = false) => {
    await removeMultiple(ui, [glob], skipWarning);
}

export const removeMultiple: (ui: UI, globs: string[], skipWarning?: boolean) => Promise<void> = async (ui: UI, globs: string[], skipWarning: boolean = false) => {
    await update(`${ui}Backgrounds`, (get(`${ui}Backgrounds`) as string[]).filter((f) => !globs.includes(f)).filter(unique), undefined, skipWarning);
    skipWarning || menu(ui); // reopen menu
}

// extensions https://github.com/microsoft/vscode/blob/main/src/vs/platform/protocol/electron-main/protocolMainService.ts#L27

export const extensions: () => string[] = () => ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"];

// update

const updateItem: (ui: UI, item: CommandQuickPickItem) => void = (ui: UI, item: CommandQuickPickItem) => {
    showInputBox({
        title: `Update ${item!.value}`,
        placeHolder: "File path, glob, or URL, leave blank to remove",
        value: item!.value ?? "",
        prompt: "Use only '/' for directories, '\\' is reserved for escape characters. Leave this field blank to remove.",
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

export const menu: (ui: UI) => void = (ui: UI) => {
    // existing items
    const items: CommandQuickPickItem[] = (get(`${ui}Backgrounds`) as string[])
        .filter(unique)
        .map(file => quickPickItem({
            label: file.replace(/(\${\w+})/g, "\$1"),
            value: file,
            ui,
            description: `${str.s(glob.count(file), "matching file")}`,
            handle: (item: CommandQuickPickItem) => updateItem(ui, item)
        }));

    // show menu
    showQuickPick([
        // existing items
        ...items,
        separator(),
        // add
        quickPickItem({
            alwaysShow: true,
            label: "$(file-add) Add a File",
            ui,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: true,
                    openLabel: "Select Image",
                    filters: {"Images": extensions()}
                }).then((files?: vscode.Uri[]) => {
                    if(files)
                        addMultiple(ui, files.map((f) => f.fsPath.replace(/\\/g, '/')));
                });
            }
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(file-directory-create) Add a Folder",
            ui: ui,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: true,
                    openLabel: "Select Folder"
                }).then((files?: vscode.Uri[]) => {
                    if(files)
                        addMultiple(ui, files.map((f) => `${f.fsPath.replace(/\\/g, '/')}/**`));
                });
            }
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(kebab-horizontal) Add a Glob",
            ui,
            handle: (item: CommandQuickPickItem) => {
                vscode.window.showInputBox({
                    title: "Add File",
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
                    if(glob)
                        add(ui, glob);
                });
            }
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(ports-open-browser-icon) Add a URL",
            ui,
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
                        add(ui, url);
                });
            }
        }),
        // delete
        ... items.length > 0 ? [
            separator(),
            quickPickItem({
                alwaysShow: true,
                label: "$(trash) Delete a background",
                ui: ui,
                handle: (item: CommandQuickPickItem) => {
                    const items: CommandQuickPickItem[] = (get(`${ui}Backgrounds`) as string[])
                        .filter(unique)
                        .map(file => quickPickItem({
                            label: file.replace(/(\${\w+})/g, "\$1"),
                            value: file,
                            ui: item.ui,
                            description: `${str.s(glob.count(file), "matching file")}`
                        }));

                    vscode.window.showQuickPick(
                        items,
                        {
                            ...options,
                            title: t("Delete", ui),
                            placeHolder: "Files",
                            canPickMany: true
                        }
                    ).then((selected?: CommandQuickPickItem[]) => {
                        if(selected)
                            removeMultiple(ui, selected.map((f) => f.value!));
                    });
                }
            })
        ] : []
    ],
    {
        ...options,
        title: t("Files", ui),
        placeHolder: "Files"
    },
    () => cm(ui));
};