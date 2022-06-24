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

const validate: (value: string) => string | null | undefined = (value: string) => {
    if(isNaN(+value))
        return "Not a number";
    else if(+value < 0)
        return "Opacity must be greater than -1";
    else
        return null;
}

export const loop: CommandQuickPickItem = {
    label: "Loop",
    description: "How long to change image",
    onSelect: () => new Promise(() => {
        const current: number = round(get("loop") as number);
        vscode.window.showInputBox({
            title: "Loop time",
            placeHolder: "Loop time",
            value: current.toString(),
            prompt: `Loop time (${current}), set to 0 to disable`,
            validateInput: validate
        }).then((value?: string) => {
            if(value && !isNaN(+value) && +value >= 0){
                update("loop", round(+value));
            }
        });
    })
}

//

const round: (num: number) => number = (num: number) => Math.round(num + Number.EPSILON);