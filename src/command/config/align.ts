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

import { CommandQuickPickItem, get, handle, options, quickPickItem, separator, updateFromLabel } from "../config";

const update: (item?: CommandQuickPickItem) => Promise<void> = (item?: CommandQuickPickItem) => new Promise(() => {
    updateFromLabel("align", item);
});

export const align: CommandQuickPickItem = {
    label: "Align",
    description: "Background image alignment",
    onSelect: () => new Promise(() => {
        const current: string = get("align");
        vscode.window.showInformationMessage(get("align") + ".." + vscode.workspace.getConfiguration("code-background").get("align") as string);
        vscode.window.showQuickPick(
            [
                quickPickItem({
                    label: "Top Left",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Top Center",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Top Right",
                    onSelect: update
                }, current),
                separator(),
                quickPickItem({
                    label: "Center Left",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Center Center",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Center Right",
                    onSelect: update
                }, current),
                separator(),
                quickPickItem({
                    label: "Bottom Left",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Bottom Center",
                    onSelect: update
                }, current),
                quickPickItem({
                    label: "Bottom Right",
                    onSelect: update
                }, current)
            ],
            {
                ...options,
                ...{
                    title: `${options.title} - Alignment`,
                    placeHolder: "Alignment"
                }
            })
        .then(handle)
    })
}