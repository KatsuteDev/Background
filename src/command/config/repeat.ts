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

import { getConfigurationProperty, Properties } from "../../extension/package";

import { get, UI, updateFromLabel } from "../../extension/config";
import { CommandQuickPickItem, quickPickItem, showQuickPick } from "../../lib/vscode";

import { menu as cm, options, title } from "../config";

//

const prop: Properties = getConfigurationProperty("backgroundRepeat");

const handle: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    updateFromLabel("backgroundRepeat", item, item.ui!)
        .then(() => cm(item.ui!)); // reopen menu
};

export const menu: (ui: UI) => void = (ui: UI) => {
    const current: string = get("backgroundRepeat", ui) as string;

    showQuickPick([
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![3], description: prop.items!.enumDescriptions![3], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![4], description: prop.items!.enumDescriptions![4], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![5], description: prop.items!.enumDescriptions![5], handle: handle, ui }, current),
    ],
    {
        ...options,
        title: title("Repeat", ui),
        placeHolder: "Background repeat",
    });
};