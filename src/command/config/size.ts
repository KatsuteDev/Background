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

import { config } from "../../vs/package";
import { showInputBox } from "../../vs/inputbox";
import { getUI, UI, updateUI, updateUIFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../../vs/quickpick";

import { options } from "../config";
import { notify } from "../install";

//

const prop: any = config("backgroundSize");

const onSelect: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    item && updateUIFromLabel(item.ui!, "backgroundSize", item);
};

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    if(!item) return;

    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundSize") as string;

    const title: string = `${ui} ${options.title} - Size`;

    showQuickPick([
        // size
        quickPickItem({ label: prop.items.enum[0], description: prop.items.enumDescriptions[0], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[1], description: prop.items.enumDescriptions[1], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[2], description: prop.items.enumDescriptions[2], then: onSelect, ui }, current),
        separator(),
        // manual
        quickPickItem({ label: prop.items.enum[3], description: prop.items.enumDescriptions[3], then: (item: CommandQuickPickItem) => {
            showInputBox({
                title,
                placeHolder: "Background size",
                value: current,
                prompt: `Background size (${current}). The literal value for the 'background-size' css property.`,
                then: (value: string) => {
                    let changed: boolean = getUI(ui, "backgroundSize") !== prop.items.enumDescriptions[3] || current !== value;

                    updateUI(ui, "backgroundSize", prop.items.enumDescriptions[3], true);
                    updateUI(ui, "backgroundSizeValue", value, true);

                    changed && notify();
                }
            });
        }}, current)
    ],
    {
        ...options,
        title,
        placeHolder: "Size"
    });
};