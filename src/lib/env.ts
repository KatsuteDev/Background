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

import * as os from "os";
import * as vscode from "vscode";

const home: string = os.homedir();

export const resolve: (str: string) => string = (str: string) =>
    str.replace(/\${(.*)}/g, (_, envvar) => {
        if(envvar == "vscode:workspace" && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0 && vscode.workspace.workspaceFolders[0].uri){
            return vscode.workspace.workspaceFolders[0].uri.fsPath.toString();
        }else if(envvar == "user:home"){
            return home;
        }else if(envvar in process.env){
            return process.env[envvar] || '';
        }else{
            return '';
        }
    });