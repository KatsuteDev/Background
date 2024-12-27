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

import { homedir } from "os";
import { workspace } from "vscode";

import { escape as esc } from "../lib/glob";

const home: string = homedir();

export const setUserDir: (path: string) => void = (path: string) => {
    if(!user){ // disallow reassignment
        user = path;
    }
};

let user: string;

export const resolve: (str: string) => string = (str: string) =>
    str.replace(/\${(.*?)}/g, (_, envvar) => {
        if(envvar === "vscode:workspace" && workspace.workspaceFolders && workspace.workspaceFolders.length > 0 && workspace.workspaceFolders[0].uri){
            return esc(workspace.workspaceFolders[0].uri.fsPath.toString());
        }else if(envvar === "vscode:user" && user){
            return esc(user);
        }else if(envvar === "user:home"){
            return esc(home);
        }else if(envvar in process.env){
            return esc(process.env[envvar] || '');
        }else{
            return '';
        }
    });