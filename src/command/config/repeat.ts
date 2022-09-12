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

import { get, updateFromLabel } from "../../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem, Scope } from "../../vs/quickpick";

import { options } from "../config";

//

const onSelect: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    item && updateFromLabel(`${item.scope!}BackgroundRepeat`, item);
});

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const scope: Scope = item.scope!;
    const current: string = get(`${scope}BackgroundRepeat`) as string;

    vscode.window.showQuickPick(
        [
            quickPickItem({ label: "No Repeat", description: "Do not repeat", onSelect, scope }, current),
            quickPickItem({ label: "Repeat", description: "Repeat X/Y", onSelect, scope }, current),
            quickPickItem({ label: "Repeat X", description: "Repeat X", onSelect, scope }, current),
            quickPickItem({ label: "Repeat Y", description: "Repeat Y", onSelect, scope }, current),
            quickPickItem({ label: "Repeat Space", description: "Repeat with even spacing to fill the screen", onSelect, scope }, current),
            quickPickItem({ label: "Repeat Round", description: "Repeat and stretch images to fill the screen", onSelect, scope }, current)
        ],
        {
            ...options,
            title: `${scope} ${options.title} - Repeat`,
            placeHolder: "Background repeat",
        })
    .then(handle);
});