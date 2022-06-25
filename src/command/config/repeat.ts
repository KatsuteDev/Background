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

import { CommandQuickPickItem, CommandQuickPickItemPromise, get, handle, options, quickPickItem, updateFromLabel } from "../config";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    updateFromLabel("repeat", item);
});

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.repeat", () => {
    const current: string = get("repeat") as string;
    vscode.window.showQuickPick(
        [
            quickPickItem({ label: "No Repeat", description: "Do not repeat", onSelect }, current),
            quickPickItem({ label: "Repeat", description: "Repeat X/Y", onSelect }, current),
            quickPickItem({ label: "Repeat X", description: "Repeat X", onSelect }, current),
            quickPickItem({ label: "Repeat Y", description: "Repeat Y", onSelect }, current),
            quickPickItem({ label: "Repeat Space", description: "Repeat with even spacing to fill the screen", onSelect }, current),
            quickPickItem({ label: "Repeat Round", description: "Repeat and stretch images to fill the screenRepeat and stretch image", onSelect }, current)
        ],
        {
            ...options,
            title: `${options.title} - Repeat`,
            placeHolder: "Repeat",
        })
    .then(handle);
});

export const item: CommandQuickPickItem = {
    label: "Repeat",
    description: "Background image repeat",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("background.config.repeat"))
}