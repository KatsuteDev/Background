/*
 * Copyright (C) 2026 Katsute <https://github.com/Katsute>
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

import { UI, get, notify, update, updateFromLabel } from "../extension/config";
import { Properties, getConfigurationProperty } from "../extension/package";

import { isValidCSS } from "../lib/css";
import { CommandQuickPickItem, quickPickItem, separator, showInputBox, showQuickPick } from "../lib/vscode";

import { backgroundMenu, title } from "./menu";

const prop: Properties = getConfigurationProperty("backgroundSize");

const handle: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) =>
    updateFromLabel("backgroundSize", item, item.ui!)
        .then(() => backgroundMenu(item.ui!)); // reopen menu

export const show: (ui: UI) => void = (ui: UI) => {
    const current: string = get("backgroundSize", {ui}) as string;

    showQuickPick([
        // size
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], handle, ui }, current),
        separator(),
        // manual
        quickPickItem({ label: prop.items!.enum![3], description: `(${get("backgroundSizeValue", {ui})})`, ui: ui, handle: (item: CommandQuickPickItem) => {
            const currentValue: string = get("backgroundSizeValue", {ui});
            showInputBox({
                title: title("Size", ui),
                placeHolder: "Background size",
                value: currentValue,
                prompt: `Background size (${currentValue}). The literal value for the 'background-size' css property.`,
                validateInput: (value: string) => !isValidCSS(value) ? "Invalid CSS" : null,
                handle: (value: string) => {
                    if(isValidCSS(value)){
                        let changed: boolean = get("backgroundSize", {ui}) !== prop.items!.enum![3] || currentValue !== value;

                        update("backgroundSize", prop.items!.enum![3], ui, true)
                            .then(() => update("backgroundSizeValue", value, ui, true))
                            .then(() => {
                                changed && notify();
                                backgroundMenu(ui); // reopen menu
                            });
                    }
                }
            });
        }}, current)
    ],
    {
        title: title("Size", ui),
        matchOnDescription: true,
        placeHolder: "Background size"
    });
}