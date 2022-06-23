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

import { CommandQuickPickItem, get, handle, options, quickPickItem, update, updateFromLabel } from "../config";

const update2: (item?: CommandQuickPickItem) => Promise<void> = (item?: CommandQuickPickItem) => new Promise(() => {
    updateFromLabel("size", item);
});

export const size: CommandQuickPickItem = {
    label: "Size",
    description: "Background image size",
    onSelect: () => new Promise(() => {
        const current: string = get("size");
        vscode.window.showQuickPick(
            [
                quickPickItem({
                    label: "Auto",
                    description: "Original image size",
                    onSelect: update2
                }, current),
                quickPickItem({
                    label: "Contain",
                    description: "Fit window size",
                    onSelect: update2
                }, current),
                quickPickItem({
                    label: "Cover",
                    description: "Cover window size",
                    onSelect: update2
                }, current),
                quickPickItem({
                    label: "",
                    kind: vscode.QuickPickItemKind.Separator
                }, current),
                quickPickItem({
                    label: "Manual",
                    description: "Manual size",
                    onSelect: (item?: CommandQuickPickItem) => {
                        return new Promise<void>(() => {
                            vscode.window.showInputBox({
                                title: "Background size",
                                placeHolder: "Background size",
                                prompt: `Background size (${get("size-css")})`
                            }).then((value?: string) => {
                                if(value){
                                    update("size", "Manual");
                                    update("size-css", value);
                                }
                            })
                        })
                    }
                }, current)
            ],
            {
                ...options,
                ...{
                    title: `${options.title} - Size`,
                    placeHolder: "Size"
                }
            })
        .then(handle)
    })
}