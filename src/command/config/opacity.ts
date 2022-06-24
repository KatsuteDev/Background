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

import { CommandQuickPickItem, get, update } from "../config";

//

export const command: vscode.Disposable = vscode.commands.registerCommand("code-background.config.opacity", () => {
    const current: number = round(get("opacity") as number);
    vscode.window.showInputBox({
        title: "UI Opacity",
        placeHolder: "UI opacity",
        value: current.toString(),
        prompt: `UI Opacity (${current})`,
        validateInput: validate
    }).then((value?: string) => {
        if(value && !isNaN(+value) && +value >= 0 && +value <= 1){
            const o: number = round(+value);
            if(o > .1){
                update("opacity", round(+value));
            }else{
                vscode.window.showWarningMessage(
                    "An opacity of " + o + " might make it difficult to see the UI, " +
                    "are you sure you want to use this opacity?",
                    { modal: true },
                    "Yes"
                ).then((c?: "Yes") => {
                    c && c === "Yes" && update("opacity", round(+value));
                });
            }
        }
    });
});

export const item: CommandQuickPickItem = {
    label: "Opacity",
    description: "UI opacity",
    onSelect: () => new Promise(() => vscode.commands.executeCommand("code-background.config.opacity"))
}

//

const round: (num: number) => number = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

const validate: (value: string) => string | null | undefined = (value: string) => {
    if(isNaN(+value))
        return "Not a number";
    else if(+value < 0 || +value > 1)
        return "Opacity must be between 0 and 1";
    else
        return null;
}