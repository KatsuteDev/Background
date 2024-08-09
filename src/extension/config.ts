/*
 * Copyright (C) 2024 Katsute <https://github.com/Katsute>
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

import { ConfigurationScope, ConfigurationTarget, WorkspaceConfiguration, commands, window, workspace } from "vscode";

import { ConfigurationKey, Properties, getConfigurationProperty } from "./package";

import { round } from "../lib/math";
import { sanitizeUnits } from "../lib/css";
import { CommandQuickPickItem } from "../lib/vscode";

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

export const configuration: (scope?: ConfigurationScope | null) => WorkspaceConfiguration = (scope?: ConfigurationScope | null) => workspace.getConfiguration("background", scope);

export const target: () => ConfigurationTarget = () => configuration().get("settingScope") === "Workspace" && workspace.workspaceFolders ? ConfigurationTarget.Workspace : ConfigurationTarget.Global;

export const notify: () => void = () =>
    window.showWarningMessage("Background has been modified, a reinstall is required to see changes.", "Install and Reload", "Ignore")
        .then((value?: string) => {
            value === "Install and Reload" && commands.executeCommand("background.install")
        });

// get

export const get: (key: ConfigurationKey, options?: {
    ui?: UI, // UI for [,,,] settings
    scope?: "workspace" | "global", // force override
    includeDefault?: boolean, // [true] use default value if none set
}) => any = (key: ConfigurationKey, options?: {ui?: UI, scope?: "workspace" | "global", includeDefault?: boolean}) => {
    const option = configuration().inspect(key);

    const {ui, scope, includeDefault = true} = options ?? {};

    const values: {workspace: any | undefined, global: any | undefined, default: any } = {
        workspace: option!.workspaceValue,
        global: option!.globalValue,
        default: option!.defaultValue
    };

    let value: any;

    value = Array.isArray(values.default) && (scope === "workspace" || target() === ConfigurationTarget.Workspace)
        ? values.workspace // array and workspace setting
        : values.global; // non-array (bool) or global setting

    value ??= includeDefault ? values.default : undefined; // assign default if current value is undefined and includeDefault is true

    if(Array.isArray(values.default)){ // background[,,,] setting
        if(values.default.length === 0){ // backgrounds[]
            return value;
        }else if(ui){ // background setting[,,,]
            return value[Index(ui!)];
        }
    }

    return value; // default
}

export const getCSS: (key: ConfigurationKey, ui: UI) => string = (key: ConfigurationKey, ui: UI) => {
    const value: string = get(key, {ui});
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
                case prop.items!.enum![9]: return sanitizeUnits(get("backgroundAlignmentValue", {ui}));
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
                case prop.items!.enum![3]: return sanitizeUnits(get("backgroundSizeValue", {ui}));
            }
        }
        default: {
            return 'null';
        }
    }
}

// update

export const update: (key: ConfigurationKey, value: any, ui?: UI, skipNotification?: boolean) => Promise<void> = async (key: ConfigurationKey, value: any, ui?: UI, skipNotification: boolean = false) => {
    let changed: boolean = false;
    if(!ui){
        changed = get(key) !== value;
        // if value is array, then it is the background[] array and should use targeted scope, otherwise it is a config setting and should be global
        await configuration().update(key, value, Array.isArray(value) ? target() : ConfigurationTarget.Global);
    }else{
        const current: any = get(key);

        // populate default if current array is not length 4
        for(let i = current.length; i < 4; i++)
            current.push(getConfigurationProperty(key).default[0]);

        const i: 0 | 1 | 2 | 3 = Index(ui);

        changed = current[i] !== value;
        current[i] = value;

        await configuration().update(key, current, target()); // update to target
    }
    skipNotification === false && changed && notify();
}

export const updateFromLabel: (key: ConfigurationKey, item: CommandQuickPickItem, ui?: UI) => Promise<void> = async (key: ConfigurationKey, item: CommandQuickPickItem, ui?: UI) => {
    item.label && await update(key, item.label, ui);
}