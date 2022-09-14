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

import { getUI, UI, updateUIFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem } from "../../vs/quickpick";

import { options } from "../config";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    item && updateUIFromLabel(item.ui!, "backgroundRepeat", item, "No Repeat");
});

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundRepeat") as string;

    vscode.window.showQuickPick([
        quickPickItem({ label: "No Repeat", description: "Do not repeat", onSelect, ui }, current),
        quickPickItem({ label: "Repeat", description: "Repeat X/Y", onSelect, ui }, current),
        quickPickItem({ label: "Repeat X", description: "Repeat X", onSelect, ui }, current),
        quickPickItem({ label: "Repeat Y", description: "Repeat Y", onSelect, ui }, current),
        quickPickItem({ label: "Repeat Space", description: "Repeat with even spacing to fill the screen", onSelect, ui }, current),
        quickPickItem({ label: "Repeat Round", description: "Repeat and stretch images to fill the screen", onSelect, ui }, current)
    ],
    {
        ...options,
        title: `${ui} ${options.title} - Repeat`,
        placeHolder: "Background repeat",
    })
    .then(handle);
});