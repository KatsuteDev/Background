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
    updateFromLabel("backgroundImageSize", item);
});

const manual: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    const current: string = get("backgroundImageSizeValue") as string;
    vscode.window.showInputBox({
        title: "Background Size",
        placeHolder: "Background size",
        value: current,
        prompt: `Background size (${current}). The literal value for the 'background-size' css property.`
    }).then((value?: string) => {
        if(value !== undefined){
            let changed: boolean = get("backgroundImageSize") !== "Manual" || current !== value;

            update("backgroundImageSize", "Manual", true);
            update("backgroundImageSizeValue", value, true);

            if(changed)
                notify();
        }
    });
});

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.size", () => {
    const current: string = get("backgroundImageSize") as string;
    vscode.window.showQuickPick(
        [
            quickPickItem({ label: "Auto", description: "Original image size", onSelect }, current),
            quickPickItem({ label: "Contain", description: "Fit image to the screen", onSelect }, current),
            quickPickItem({ label: "Cover", description: "Stretch image to fill the screen", onSelect }, current),
            separator(),
            quickPickItem({ label: "Manual", description: "Manual size", onSelect: manual }, current)
        ],
        {
            ...options,
            title: `${options.title} - Size`,
            placeHolder: "Size"
        })
    .then(handle);
});

export const item: CommandQuickPickItem = {
    label: "Size",
    description: "Background image size",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("background.config.size"))
}