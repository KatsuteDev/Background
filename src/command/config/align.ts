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

import { CommandQuickPickItem, CommandQuickPickItemPromise, get, handle, options, quickPickItem, separator, update, updateFromLabel } from "../config";
import { notify } from "../install";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    updateFromLabel("backgroundImageAlignment", item);
});

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.align", () => {
    const current: string = get("backgroundImageAlignment") as string;
    vscode.window.showQuickPick(
        [
            // top
            quickPickItem({ label: "Top Left", onSelect }, current),
            quickPickItem({ label: "Top Center", onSelect }, current),
            quickPickItem({ label: "Top Right", onSelect }, current),
            separator(),
            // center
            quickPickItem({ label: "Center Left", onSelect }, current),
            quickPickItem({ label: "Center Center", onSelect }, current),
            quickPickItem({ label: "Center Right", onSelect }, current),
            separator(),
            // bottom
            quickPickItem({ label: "Bottom Left", onSelect }, current),
            quickPickItem({ label: "Bottom Center", onSelect }, current),
            quickPickItem({ label: "Bottom Right", onSelect }, current),
            separator(),
            // manual
            quickPickItem({ label: "Manual", description: "Manual position", onSelect: (item?: CommandQuickPickItem) => new Promise(() => {
                vscode.window.showInputBox({
                    title: "Background Position",
                    placeHolder: "Background position",
                    value: current,
                    prompt: `Background position (${current}). The literal value for the 'background-position' css property.`
                }).then((value?: string) => {
                    if(value !== undefined){
                        let changed: boolean = get("backgroundImageAlignment") !== "Manual" || current !== value;

                        update("backgroundImageAlignment", "Manual", true);
                        update("backgroundImageAlignmentValue", value, true);

                        if(changed)
                            notify();
                    }
                });
            })}, current)
        ],
        {
            ...options,
            title: `${options.title} - Alignment`,
            placeHolder: "Alignment"
        }
    ).then(handle);
});

export const item: CommandQuickPickItem = {
    label: "Align",
    description: "Background image alignment",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("background.config.align"))
}