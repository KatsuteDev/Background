/*
 * Copyright (C) 2024 Katsute <https://github.com/Katsute>
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

import { window } from "vscode";

import { UI, get, update } from "../extension/config";

import { round } from "../lib/math";
import { showInputBox } from "../lib/vscode";

import { open, title } from "./menu";

export const show: (ui: UI) => void = (ui: UI) => {
    const current: number = round(get("backgroundOpacity", ui) as number, 2);

    showInputBox({
        title: title("Opacity", ui),
        placeHolder: "Background opacity",
        value: current.toString(),
        prompt: `Background opacity (${current}). 0 is fully visible and 1 is invisible.`,
        validateInput: (value: string) => {
            if(isNaN(+value))
                return "Not a number";
            else if(+value < 0 || +value > 1)
                return "Opacity must be between 0 and 1";
            else
                return null;
        },
        handle: (value: string) => {
            if(!isNaN(+value)){
                const o: number = Math.min(Math.max(round(+value, 2), 0), 1);
                if(o > .9){
                    update("backgroundOpacity", o, ui)
                        .then(() => open(ui)); // reopen menu
                }else{
                    window.showWarningMessage(
                        "An opacity of " + o + " might make it difficult to see the UI, " +
                        "are you sure you want to use this opacity?",
                        { modal: true },
                        "Yes"
                    ).then((c?: "Yes") => {
                        if(c === "Yes")
                            update("backgroundOpacity", o, ui)
                                .then(() => open(ui)); // reopen menu
                    });
                }
            }
        }
    });
}