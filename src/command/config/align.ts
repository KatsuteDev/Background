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

import { CommandQuickPickItem, CommandQuickPickItemPromise, get, handle, options, quickPickItem, separator, updateFromLabel } from "../config";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    updateFromLabel("align", item);
});

export const command: vscode.Disposable = vscode.commands.registerCommand("code-background.config.align", () => {
    const current: string = get("align") as string;
    vscode.window.showQuickPick(
        [
            quickPickItem({ label: "Top Left", onSelect }, current),
            quickPickItem({ label: "Top Center", onSelect }, current),
            quickPickItem({ label: "Top Right", onSelect }, current),
            separator(),
            quickPickItem({ label: "Center Left", onSelect }, current),
            quickPickItem({ label: "Center Center", onSelect }, current),
            quickPickItem({ label: "Center Right", onSelect }, current),
            separator(),
            quickPickItem({ label: "Bottom Left", onSelect }, current),
            quickPickItem({ label: "Bottom Center", onSelect }, current),
            quickPickItem({ label: "Bottom Right", onSelect }, current)
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
    onSelect: () => new Promise(() => vscode.commands.executeCommand("code-background.config.align"))
}