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

import { config as cfg, ConfigKey, Props } from "./package";

import * as vscode from "vscode";

import { CommandQuickPickItem } from "./quickpick";

import { notify } from "../command/install";
import { round } from "../lib/round";

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

export const get: (key: ConfigKey, ui?: UI, fallback?: boolean) => any = (key: ConfigKey, ui?: UI, fallback?: boolean) => {
    return !ui
        ? config().get(key) ?? cfg(key).default ?? '␀'
        : (config().get(key) as any[])[fallback && get("useWindowOptionsForAllBackgrounds") === true ? 0 : asNum(ui)] ?? cfg(key).default[0] ?? '␀'; // fallback default
}

export const update: (key: ConfigKey, value: any, ui?: UI, skipWarning?: boolean) => Promise<void> = async (key: ConfigKey, value: any, ui?: UI, skipWarning: boolean = false) => {
    let diff: boolean = false;
    if(!ui){
        diff = get(key) as any !== value;
        await config().update(key, value, vscode.ConfigurationTarget.Global); // update
    }else{
        const current: any = get(key) as any;

        for(let i = current.length; i < 4; i++) // make array size 4
            current.push(cfg(key).default[0]); // push def

        const i: 0 | 1 | 2 | 3 = asNum(ui);

        diff = current[i] !== value; // diff

        current[i] = value; // update array
        await config().update(key, current, vscode.ConfigurationTarget.Global); // update
    }
    skipWarning === false && diff && notify(); // notify
}

export const updateFromLabel: (key: ConfigKey, item: CommandQuickPickItem, ui?: UI) => void = (key: ConfigKey, item: CommandQuickPickItem, ui?:UI) => {
    item.label && update(key, item.label, ui);
}

// css

export const css: (key: ConfigKey, ui: UI) => string = (key: ConfigKey, ui: UI) => {
    const value: string = get(key, ui, true);

    const prop: Props = cfg(key);

    switch(key){
        case "backgroundAlignment": {
            switch(value){
                // top
                case prop.items!.enum![0]: return "left top";
                case prop.items!.enum![1]: return "center top";
                case prop.items!.enum![2]: return "right top";
                // center
                case prop.items!.enum![3]: return "left center";
                case prop.items!.enum![4]: return "center center";
                case prop.items!.enum![5]: return "right center";
                // bottom
                case prop.items!.enum![6]: return "left bottom";
                case prop.items!.enum![7]: return "center bottom";
                case prop.items!.enum![8]: return "right bottom";
                case prop.items!.enum![9]: return cssUnits(get("backgroundAlignmentValue", ui));
            }
        }
        case "backgroundBlur": {
            return cssUnits(value);
        }
        case "backgroundOpacity": {
            return !isNaN(+value) ? round(+value, 2) : prop.default[0];
        }
        case "backgroundRepeat": {
            switch(value){
                case prop.items!.enum![0]: return "no-repeat";
                case prop.items!.enum![1]: return "repeat";
                case prop.items!.enum![2]: return "repeat-x";
                case prop.items!.enum![3]: return "repeat-x";
                case prop.items!.enum![4]: return "space";
                case prop.items!.enum![5]: return "round";
            }
        }
        case "backgroundSize": {
            switch(value){
                case prop.items!.enum![0]: return "auto";
                case prop.items!.enum![1]: return "contain";
                case prop.items!.enum![2]: return "cover";
                case prop.items!.enum![3]: return cssUnits(get("backgroundSizeValue", ui));
            }
        }
    }
    return '␀';
}

export const cssValue: (s: string) => string = (s: string) => s
    .replace(/\n\r?/gm, ' ') // make single line
    .replace(/"/gm, '\'')    // prevent escaping quotes
    .replace(/\\+$/gm, '');  // prevent escaping last script quote;

export const cssUnits: (s: string) => string = (s: string) => s
    .replace(/[^\w.% +-]/gmi, "") // make css units