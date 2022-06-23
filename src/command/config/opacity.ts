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

export const opacity: CommandQuickPickItem = {
    label: "Opacity",
    description: "UI opacity",
    onSelect: () => new Promise(() => {
        vscode.window.showInputBox({
            title: "UI Opacity",
            placeHolder: "UI Opacity",
            prompt: `UI Opacity (${round(+get("opacity"))})`,
            validateInput: (value: string) => {
                if(isNaN(+value))
                    return "Not a number";
                else if(+value < 0 || +value > 1)
                    return "Opacity must be between 0 and 1";
                else
                    return null;
            }
        }).then((value?: string) => {
            if(value && !isNaN(+value) && +value >= 0 && +value <= 1)
                update("opacity", round(+value));
        })
    })
}

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100