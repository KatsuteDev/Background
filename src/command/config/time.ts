/*
 * Copyright (C) 2023 Katsute <https://github.com/Katsute>
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

import { showInputBox } from "../../vs/inputbox";
import { get, update } from "../../vs/vsconfig";
import { CommandQuickPickItem } from "../../vs/quickpick";

import { round } from "../../lib/round";
import { menu as cm, title } from "../config";

//

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    const current: number = round(get("backgroundChangeTime", item.ui!) as number, 2);

    showInputBox({
        title: title("Change Time", item.ui!),
        placeHolder: "Background change time",
        value: current.toString(),
        prompt: `Background change time (${current}). How long in seconds before the background should automatically change. Set to 0 to always use the same image.`,
        validateInput: (value: string) => {
            if(isNaN(+value))
                return "Not a number";
            else if(+value < 0)
                return "Background change time must be a positive number";
            else
                return null;
        },
        handle: (value: string) => {
            if(!isNaN(+value)){
                const o: number = Math.max(round(+value, 2), 0);
                update("backgroundChangeTime", o, item.ui!)
                    .then(() => cm(item)); // reopen menu
            }
        }
    });
};