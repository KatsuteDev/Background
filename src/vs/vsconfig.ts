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

import { CommandQuickPickItem } from "./quickpick";

import { notify } from "../command/install";

//

const config = () => vscode.workspace.getConfiguration("background");

export type Key =
    "windowBackgrounds" |
    "editorBackgrounds" |
    "sidebarBackgrounds" |
    "panelBackgrounds" |
    "backgroundAlignment" |
    "backgroundAlignmentValue" |
    "backgroundBlur" |
    "backgroundOpacity" |
    "backgroundRepeat" |
    "backgroundSize" |
    "backgroundSizeValue" |
    "CSS";

// config

export const get: (key: Key, def?: any) => any = (key: Key, def?: any) => config().get(key) ?? def ?? '␀';

export const update: (key: Key, value: any, skipWarning?: boolean) => void = (key: Key, value: any, skipWarning?: boolean) => {
    const diff: boolean = get(key) as any !== value;
    config().update(key, value, vscode.ConfigurationTarget.Global);
    skipWarning === false && diff && notify();
}

export const updateFromLabel: (key: Key, item: CommandQuickPickItem) => void = (key: Key, item: CommandQuickPickItem) => {
    item.label && update(key, item.label);
}

// UI

export type UI = "window" | "editor" | "sidebar" | "panel";

type UINum = 0 | 1 | 2 | 3;

const asNum: (ui: UI) => UINum = (ui: UI) => {
    return {
        "window": 0,
        "editor": 1,
        "sidebar": 2,
        "panel": 3
    }[ui.toLowerCase()] as UINum;
}

export const getUI: (ui: UI, key: Key, def?: any) => any = (ui: UI, key: Key, def?: any) => {
    const arr: any[] = get(key, def);
    return arr[asNum(ui)] ?? arr[0];
}

export const updateUI: (ui: UI, key: Key, value: any, def: any, skipWarning?: boolean) => void = (ui: UI, key: Key, value: any, def: any, skipWarning: boolean = false) => {
    const current: any = get(key) as any;

    for(let i = current.length; i < 4; i++) // make array size 4
        current.push(def); // push def

    const i: UINum = asNum(ui);

    const diff: boolean = current[i] !== value;

    current[i] = value; // assign
    config().update(key, current, vscode.ConfigurationTarget.Global);

    skipWarning === false && diff && notify();
}

export const updateUIFromLabel: (ui: UI, key: Key, item: CommandQuickPickItem, def: any) => void = (ui: UI, key: Key, def: any, item: CommandQuickPickItem) => {
    item.label && updateUI(ui, key, item.label, def);
}