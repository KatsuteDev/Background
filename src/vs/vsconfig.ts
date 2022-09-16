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

import { config as cfg, Key } from "./package";

import * as vscode from "vscode";

import { CommandQuickPickItem } from "./quickpick";

import { notify } from "../command/install";

//

const config = () => vscode.workspace.getConfiguration("background");

// config

export const get: (key: Key) => any = (key: Key) => config().get(key) ?? cfg(key) ?? '␀';

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

const asNum: (ui: UI) => 0 | 1 | 2 | 3 = (ui: UI) => {
    return {
        "window": 0,
        "editor": 1,
        "sidebar": 2,
        "panel": 3
    }[ui.toLowerCase()] as 0 | 1 | 2 | 3;
}

export const getUI: (ui: UI, key: Key) => any = (ui: UI, key: Key) => {
    const arr: any[] = get(key);
    return arr[asNum(ui)] ?? cfg(key).default[0] ?? '␀';
}

export const updateUI: (ui: UI, key: Key, value: any, skipWarning?: boolean) => void = (ui: UI, key: Key, value: any, skipWarning: boolean = false) => {
    const current: any = get(key) as any;

    for(let i = current.length; i < 4; i++) // make array size 4
        current.push(cfg(key).default[0]); // push def

    const i: 0 | 1 | 2 | 3 = asNum(ui);

    const diff: boolean = current[i] !== value;

    current[i] = value; // assign
    config().update(key, current, vscode.ConfigurationTarget.Global);

    skipWarning === false && diff && notify();
}

export const updateUIFromLabel: (ui: UI, key: Key, item: CommandQuickPickItem) => void = (ui: UI, key: Key, item: CommandQuickPickItem) => {
    item.label && updateUI(ui, key, item.label);
}