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

import { getUI, UI, updateUIFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, showQuickPick } from "../../vs/quickpick";

import { options } from "../config";

//

const prop: Props = config("backgroundRepeat");

const onSelect: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    updateUIFromLabel(item.ui!, "backgroundRepeat", item);
};

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundRepeat") as string;

    showQuickPick([
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items!.enum![3], description: prop.items!.enumDescriptions![3], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items!.enum![4], description: prop.items!.enumDescriptions![4], then: onSelect, ui }, current),
        quickPickItem({ label: prop.items!.enum![5], description: prop.items!.enumDescriptions![5], then: onSelect, ui }, current),
    ],
    {
        ...options,
        title: `${ui} ${options.title} - Repeat`,
        placeHolder: "Background repeat",
    });
};