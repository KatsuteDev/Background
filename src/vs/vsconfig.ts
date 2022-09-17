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

import { config as cfg, ConfigKey } from "./package";

import * as vscode from "vscode";

import { CommandQuickPickItem } from "./quickpick";

import { notify } from "../command/install";

// vs

const config = () => vscode.workspace.getConfiguration("background");

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

// config

export const get: (key: ConfigKey, ui?: UI) => any = (key: ConfigKey, ui?: UI) => {
    if(!ui)
        return config().get(key) ?? cfg(key).default ?? '␀'; // get from config or use default
    else
        return get(key)[asNum(ui)] ?? cfg(key).default[0] ?? '␀'; // get from array from config or use default
};

export const update: (key: ConfigKey, value: any, ui?: UI, skipWarning?: boolean) => void = (key: ConfigKey, value: any, ui?: UI, skipWarning?: boolean) => {
    let diff: boolean = false;
    if(!ui){
        diff = get(key) as any !== value;
        config().update(key, value, vscode.ConfigurationTarget.Global); // update
    }else{
        const current: any = get(key) as any;

        for(let i = current.length; i < 4; i++) // make array size 4
            current.push(cfg(key).default[0]); // push def

        const i: 0 | 1 | 2 | 3 = asNum(ui);

        diff = current[i] !== value; // diff

        current[i] = value; // update array
        config().update(key, current, vscode.ConfigurationTarget.Global); // update
    }
    skipWarning === false && diff && notify(); // notify
}

export const updateFromLabel: (key: ConfigKey, item: CommandQuickPickItem, ui?: UI) => void = (key: ConfigKey, item: CommandQuickPickItem, ui?:UI) => {
    item.label && update(key, item.label, ui);
}