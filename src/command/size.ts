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

import { getConfigurationProperty, Properties } from "../extension/package";

import { showInputBox } from "../lib/vscode";
import { get, notify, UI, update, updateFromLabel } from "../extension/config";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../lib/vscode";

import { menu as cm, options, title as t } from "./config";
import { isValidCSS } from "../lib/css";

//

const prop: Properties = getConfigurationProperty("backgroundSize");

const handle: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    updateFromLabel("backgroundSize", item, item.ui!)
        .then(() => cm(item.ui!)); // reopen menu
};

export const menu: (ui: UI) => void = (ui: UI) => {
    const current: string = get("backgroundSize", ui) as string;

    const title: string = t("Size", ui);

    showQuickPick([
        // size
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], handle, ui }, current),
        separator(),
        // manual
        quickPickItem({ label: prop.items!.enum![3], description: prop.items!.enumDescriptions![3], ui: ui, handle: (item: CommandQuickPickItem) => {
            const currentValue: string = get("backgroundSizeValue", ui);
            showInputBox({
                title,
                placeHolder: "Background size",
                value: currentValue,
                prompt: `Background size (${currentValue}). The literal value for the 'background-size' css property.`,
                validateInput: (value: string) => !isValidCSS(value) ? "Invalid CSS" : null,
                handle: (value: string) => {
                    if(isValidCSS(value)){
                        let changed: boolean = get("backgroundSize", ui) !== prop.items!.enum![3] || currentValue !== value;

                        update("backgroundSize", prop.items!.enum![3], ui, true)
                            .then(() => update("backgroundSizeValue", value, ui, true))
                            .then(() => {
                                changed && notify();
                                cm(ui); // reopen menu
                            });
                    }
                }
            });
        }}, current)
    ],
    {
        ...options,
        title,
        placeHolder: "Background size"
    });
};