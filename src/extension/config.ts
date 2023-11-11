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

import { ConfigurationTarget, WorkspaceConfiguration, workspace } from "vscode";
import { ConfigurationKey, Properties, getConfigurationProperty } from "./package";

import { round } from "../lib/math";
import { sanitizeUnits } from "../lib/css";
import { CommandQuickPickItem } from "../lib/vscode";

import { notify } from "../command/install";

// UI

export type UI = "window" | "editor" | "sidebar" | "panel";

const Index: (ui: UI) => 0 | 1 | 2 | 3 = (ui: UI) => {
    return {
        "window": 0,
        "editor": 1,
        "sidebar": 2,
        "panel": 3
    }[ui] as 0 | 1 | 2 | 3;
}

export const configuration: () => WorkspaceConfiguration = () => workspace.getConfiguration("background");

// get

export const get: (key: ConfigurationKey, ui?: UI, fallbackToWindowOption?: boolean) => any = (key: ConfigurationKey, ui?: UI, fallbackToWindowOption: boolean = false) =>
    !ui
    ? configuration().get(key)
      ?? getConfigurationProperty(key).default
      ?? "null"
    : (configuration().get(key) as any[])[fallbackToWindowOption && get("useWindowOptionsForAllBackgrounds") === true ? 0 : Index(ui)]
      ?? getConfigurationProperty(key).default[0]
      ?? "null";

export const getCSS: (key: ConfigurationKey, ui: UI) => string = (key: ConfigurationKey, ui: UI) => {
    const value: string = get(key, ui, true);
    const prop: Properties = getConfigurationProperty(key);

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
                case prop.items!.enum![9]: return sanitizeUnits(get("backgroundAlignmentValue", ui, true));
            }
        }
        case "backgroundBlur": {
            return sanitizeUnits(value);
        }
        case "backgroundOpacity": {
            return !isNaN(+value) ? round(+value, 2) : prop.default[0];
        }
        case "backgroundRepeat": {
            switch(value){
                case prop.items!.enum![0]: return "no-repeat";
                case prop.items!.enum![1]: return "repeat";
                case prop.items!.enum![2]: return "repeat-x";
                case prop.items!.enum![3]: return "repeat-y";
                case prop.items!.enum![4]: return "space";
                case prop.items!.enum![5]: return "round";
            }
        }
        case "backgroundSize": {
            switch(value){
                case prop.items!.enum![0]: return "auto";
                case prop.items!.enum![1]: return "contain";
                case prop.items!.enum![2]: return "cover";
                case prop.items!.enum![3]: return sanitizeUnits(get("backgroundSizeValue", ui, true));
            }
        }
        default: {
            return 'null';
        }
    }
}

// update

export const update: (key: ConfigurationKey, value: any, ui?: UI, skipNotification?: boolean) => Promise<void> = async (key: ConfigurationKey, value: any, ui?: UI, skipWarning: boolean = false) => {
    let changed: boolean = false;
    if(!ui){
        changed = get(key) !== value;
        await configuration().update(key, value, ConfigurationTarget.Global);
    }else{
        const current: any = get(key);

        // populate default if current array is not length 4
        for(let i = current.length; i < 4; i++)
            current.push(getConfigurationProperty(key).default[0]);

        const i: 0 | 1 | 2 | 3 = Index(ui);

        changed = current[i] !== value;
        current[i] = value;

        await configuration().update(key, current, ConfigurationTarget.Global);
    }
    skipWarning === false && changed && notify();
}

export const updateFromLabel: (key: ConfigurationKey, item: CommandQuickPickItem, ui?: UI) => Promise<void> = async (key: ConfigurationKey, item: CommandQuickPickItem, ui?: UI) => {
    item.label && await update(key, item.label, ui);
}