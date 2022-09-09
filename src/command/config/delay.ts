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

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config.delay", () => {
    const current: number = round(get("backgroundImageChangeDelay") as number);
    vscode.window.showInputBox({
        title: `${options.title} - Delay`,
        placeHolder: "Background image change delay",
        value: current.toString(),
        prompt: `How often to change the background image (${current}s). Set to 0 to disable.`,
        validateInput: validate
    }).then((value?: string) => {
        if(value && !isNaN(+value))
            update("backgroundImageChangeDelay", round(+value));
    });
});

export const item: CommandQuickPickItem = {
    label: "Delay",
    description: "Background image change delay",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("background.config.delay"))
}

//

const round: (num: number) => number = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

const validate: (value: string) => string | null | undefined = (value: string) => {
    return isNaN(+value) ? "Not a number" : null;
}