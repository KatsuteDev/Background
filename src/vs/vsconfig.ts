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

// config

export const get: (key: string) => any = (key: string) => config().get(key) ?? '␀';

export const update: (key: string, value: any, skipWarning?: boolean) => void = (key: string, value: any, skipWarning?: boolean) => {
    const current: any = get(key) as any;
    config().update(key, value, vscode.ConfigurationTarget.Global);
    if(skipWarning !== true && current !== value)
        notify();
}

export const updateFromLabel: (key: string, item?: CommandQuickPickItem) => void = (key: string, item?: CommandQuickPickItem) => {
    item && item.label && update(key, item.label);
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

export const getForUI: (ui: UI, key: string) => any = (ui: UI, key: string) => {
    const arr: any[] = get(key);
    return arr[asNum(ui)] ?? arr[0];
}

export const updateForUI: (ui: UI, key: string, value: any, def: any, skipWarning?: boolean) => void = (ui: UI, key: string, value: any, def: any, skipWarning: boolean = false) => {
    const current: any = get(key) as any;

    for(let i = current.length; i < 4; i++)
        current.push(def);

    const i: UINum = asNum(ui);

    const diff: boolean = current[i] !== value;

    current[i] = value;
    config().update(key, current, vscode.ConfigurationTarget.Global);

    skipWarning !== true && diff && notify();
}

export const updateForUIFromLabel: (ui: UI, key: string, item: CommandQuickPickItem, def: any) => void = (ui: UI, key: string, def: any, item: CommandQuickPickItem) => {
    item.label && updateForUI(ui, key, item.label, def);
}