/*
 * Copyright (C) 2026 Katsute <https://github.com/Katsute>
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

import { commands } from "vscode";
import { add, get, remove, replace } from "../menu/file";
import { get as cget } from "./config";
import { reload } from "../lib/vscode";

export const api = {
    install: () => cget("API") && commands.executeCommand("background.install"),
    uninstall: () => cget("API") && commands.executeCommand("background.uninstall"),
    reload,
    get: (ui: string) => {
        if(cget("API"))
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    return get(ui);
                default:
                    return undefined;
            }
        else
            return undefined;
    },
    add: async (ui: string, glob: string) => {
        if(cget("API"))
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await add(ui, glob, true);
                    return true;
                default:
                    return false;
            }
        else
            return false;
    },
    replace: async (ui: string, old: string, glob: string) => {
        if(cget("API"))
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await replace(ui, old, glob, true);
                    return true;
                default:
                    return false;
            }
        else
            return false;
    },
    remove: async (ui: string, glob: string) => {
        if(cget("API"))
            switch(ui){
                case "window":
                case "editor":
                case "sidebar":
                case "panel":
                    await remove(ui, glob, true);
                    return true;
                default:
                    return false;
            }
        else
            return false;
    }
}