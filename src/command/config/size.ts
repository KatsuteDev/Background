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

import { config, Props } from "../../vs/package";
import { showInputBox } from "../../vs/inputbox";
import { get, update, updateFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../../vs/quickpick";

import { menu as cm, options, title as t } from "../config";
import { notify } from "../install";
import { validCSS } from "../../lib/str";

//

const prop: Props = config("backgroundSize");

const handle: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    updateFromLabel("backgroundSize", item, item.ui!)
        .then(() => cm(item)); // reopen menu
};

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    const current: string = get("backgroundSize", item.ui!) as string;

    const title: string = t("Size", item.ui!);

    showQuickPick([
        // size
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], handle, ui: item.ui! }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], handle, ui: item.ui! }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], handle, ui: item.ui! }, current),
        separator(),
        // manual
        quickPickItem({ label: prop.items!.enum![3], description: prop.items!.enumDescriptions![3], ui: item.ui!, handle: (item: CommandQuickPickItem) => {
            const currentValue: string = get("backgroundSizeValue", item.ui!);
            showInputBox({
                title,
                placeHolder: "Background size",
                value: currentValue,
                prompt: `Background size (${currentValue}). The literal value for the 'background-size' css property.`,
                validateInput: (value: string) => !validCSS(value) ? "Invalid CSS" : null,
                handle: (value: string) => {
                    if(validCSS(value)){
                        let changed: boolean = get("backgroundSize", item.ui!) !== prop.items!.enum![3] || currentValue !== value;

                        update("backgroundSize", prop.items!.enum![3], item.ui!, true)
                            .then(() => update("backgroundSizeValue", value, item.ui!, true))
                            .then(() => {
                                changed && notify();
                                cm(item); // reopen menu
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