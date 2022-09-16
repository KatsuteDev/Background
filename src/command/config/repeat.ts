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

import * as vscode from "vscode";

import { getUI, UI, updateUIFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem } from "../../vs/quickpick";

import { options } from "../config";

//

const prop: any = config("backgroundRepeat");

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    item && updateUIFromLabel(item.ui!, "backgroundRepeat", item);
});

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundRepeat") as string;

    vscode.window.showQuickPick([
        quickPickItem({ label: prop.items.enum[0], description: prop.items.enumDescriptions[0], onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[1], description: prop.items.enumDescriptions[1], onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[2], description: prop.items.enumDescriptions[2], onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[3], description: prop.items.enumDescriptions[3], onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[4], description: prop.items.enumDescriptions[4], onSelect, ui }, current),
        quickPickItem({ label: prop.items.enum[5], description: prop.items.enumDescriptions[5], onSelect, ui }, current),
    ],
    {
        ...options,
        title: `${ui} ${options.title} - Repeat`,
        placeHolder: "Background repeat",
    })
    .then(handle);
});