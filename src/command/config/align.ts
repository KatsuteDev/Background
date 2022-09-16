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
    item && updateUIFromLabel(item.ui!, "backgroundAlignment", item);
});

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const ui: UI = item.ui!;
    const current: string = getUI(ui, "backgroundAlignment") as string;

    const title: string = `${ui} ${options.title} - Alignment`;

    vscode.window.showQuickPick([
        // top
        quickPickItem({ label: "Top Left", onSelect, ui }, current),
        quickPickItem({ label: "Top Center", onSelect, ui }, current),
        quickPickItem({ label: "Top Right", onSelect, ui }, current),
        separator(),
        // center
        quickPickItem({ label: "Center Left", onSelect, ui }, current),
        quickPickItem({ label: "Center Center", onSelect, ui }, current),
        quickPickItem({ label: "Center Right", onSelect, ui }, current),
        separator(),
        // bottom
        quickPickItem({ label: "Bottom Left", onSelect, ui }, current),
        quickPickItem({ label: "Bottom Center", onSelect, ui }, current),
        quickPickItem({ label: "Bottom Right", onSelect, ui }, current),
        separator(),
        // manual
        quickPickItem({ label: "Manual", description: "Manual position", ui, onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
            if(!item) return;
            vscode.window.showInputBox({
                title,
                placeHolder: "Background position",
                value: current,
                prompt: `Background position (${current}). The literal value for the 'background-position' css property.`
            }).then((value?: string) => {
                if(value !== undefined){
                    let changed: boolean = getUI(ui, "backgroundAlignment") !== "Manual" || current !== value;

                    updateUI(ui, "backgroundAlignment", "Manual", true);
                    updateUI(ui, "backgroundAlignmentValue", value, true);

                    changed && notify();
                }
            });
        })}, current)
    ],
    {
        ...options,
        title,
        placeHolder: "Background alignment"
    })
    .then(handle);
});