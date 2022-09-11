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

export const get: (key: string) => any = (key: string) => config().get(key);

export const update: (key: string, value: any, skipWarning?: boolean) => void = (key: string, value: any, skipWarning?: boolean) => {
    const current: any = get(key) as any;
    config().update(key, value, vscode.ConfigurationTarget.Global);
    if(skipWarning !== true && current !== value)
        notify();
}

export const updateFromLabel: (key: string, item?: CommandQuickPickItem) => void = (key: string, item?: CommandQuickPickItem) => {
    item && item.label && update(key, item.label);
}