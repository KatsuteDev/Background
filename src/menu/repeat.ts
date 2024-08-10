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

import { UI, get, updateFromLabel } from "../extension/config";
import { Properties, getConfigurationProperty } from "../extension/package";

import { CommandQuickPickItem, quickPickItem, showQuickPick } from "../lib/vscode";

import { backgroundMenu, title } from "./menu";

const prop: Properties = getConfigurationProperty("backgroundRepeat");

const handle: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) =>
    updateFromLabel("backgroundRepeat", item, item.ui!)
        .then(() => backgroundMenu(item.ui!)); // reopen menu

export const show: (ui: UI) => void = (ui: UI) => {
    const current: string = get("backgroundRepeat", {ui}) as string;

    showQuickPick([
        quickPickItem({ label: prop.items!.enum![0], description: prop.items!.enumDescriptions![0], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![1], description: prop.items!.enumDescriptions![1], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![2], description: prop.items!.enumDescriptions![2], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![3], description: prop.items!.enumDescriptions![3], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![4], description: prop.items!.enumDescriptions![4], handle: handle, ui }, current),
        quickPickItem({ label: prop.items!.enum![5], description: prop.items!.enumDescriptions![5], handle: handle, ui }, current),
    ], {
        title: title("Repeat", ui),
        matchOnDescription: true,
        placeHolder: "Background repeat"
    });
};