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

import { CommandQuickPickItem, get, options, update } from "../config";

//

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.blur", () => {
    const current: string = get("backgroundImageBlur") as string;
    vscode.window.showInputBox({
        title: `${options.title} - Blur`,
        placeHolder: "Background Blur",
        value: current,
        prompt: `Background blur (${current})`,
        validateInput: (value: string) => value.match(/[^\w.%+-]/gmi) ? "Invalid CSS" : null
    }).then((value?: string) => {
        if(value && !value.match(/[^\w.%+-]/gmi))
            update("backgroundImageBlur", value);
    });
});

export const item: CommandQuickPickItem = {
    label: "Blur",
    description: "Background image blur",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("background.config.blur"))
}