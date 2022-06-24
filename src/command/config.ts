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

import { align } from "./config/align";
import { file } from "./config/file";
import { loop } from "./config/loop";
import { opacity } from "./config/opacity";
import { repeat } from "./config/repeat";
import { size } from "./config/size";
import { notify } from "./install";

//

const vsconfig = () => vscode.workspace.getConfiguration("code-background");

export const get: (key: string) => any = (key: string) => {
    return vsconfig().get(key);
}

export const update: (key: string, value: any, skipWarning?: boolean) => void = (key: string, value: any, skipWarning?: boolean) => {
    const current: any = get(key);
    vsconfig().update(key, value, vscode.ConfigurationTarget.Global);
    if(skipWarning !== true && current !== value)
        notify();
}

export const updateFromLabel: (key: string, item?: CommandQuickPickItem) => void = (key: string, item?: CommandQuickPickItem) => {
    item && item.label && update(key, item.label);
}

//

export const config: vscode.Disposable = vscode.commands.registerCommand("code-background.config", () => {
    vscode.window.showQuickPick([
        file,
        separator(),
        align,
        loop,
        opacity,
        repeat,
        size,
    ], options)
    .then(handle);
});

//

export const options: vscode.QuickPickOptions = {
    title: "Code Background",
    matchOnDetail: true,
    matchOnDescription: true
}

export const handle: (item?: CommandQuickPickItem) => void = (item?: CommandQuickPickItem) => {
    item && item.onSelect && item.onSelect(item);
}

//

export const quickPickItem: (item: CommandQuickPickItem, current?: string) => CommandQuickPickItem = (item: CommandQuickPickItem, current?: string) => ({
    ...item,
    description: current && item.label === current ? "(selected)" : undefined
} as CommandQuickPickItem);

export const separator: () => vscode.QuickPickItem = () => ({
    label: "",
    kind: vscode.QuickPickItemKind.Separator
} as vscode.QuickPickItem);

//

export type CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => Promise<void>;

export interface CommandQuickPickItem extends vscode.QuickPickItem {
    onSelect?: (item?: CommandQuickPickItem) => Promise<void>;
    value?: string
}