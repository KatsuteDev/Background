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

import { getUI, UI, updateUI, updateUIFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem, separator } from "../../vs/quickpick";

import { options } from "../config";

import { notify } from "../install";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    item && updateUIFromLabel(item.ui!, "backgroundSize", item, "Cover");
});

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundSize") as string;

    const title: string = `${ui} ${options.title} - Size`;

    vscode.window.showQuickPick([
        // size
        quickPickItem({ label: "Auto", description: "Original image size", onSelect, ui }, current),
        quickPickItem({ label: "Contain", description: "Fit image to the screen", onSelect, ui }, current),
        quickPickItem({ label: "Cover", description: "Stretch image to fill the screen", onSelect, ui }, current),
        separator(),
        // manual
        quickPickItem({ label: "Manual", description: "Manual size", onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
            vscode.window.showInputBox({
                title,
                placeHolder: "Background size",
                value: current,
                prompt: `Background size (${current}). The literal value for the 'background-size' css property.`
            }).then((value?: string) => {
                if(value !== undefined){
                    let changed: boolean = getUI(ui, "backgroundSize") !== "Manual" || current !== value;

                    updateUI(ui, "backgroundSize", "Manual", "Cover", true);
                    updateUI(ui, "backgroundSizeValue", value, "", true);

                    changed && notify();
                }
            });
        })}, current)
    ],
    {
        ...options,
        title,
        placeHolder: "Size"
    })
    .then(handle);
});