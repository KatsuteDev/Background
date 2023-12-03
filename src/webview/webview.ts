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

import { Uri, ViewColumn, WebviewPanel, window } from "vscode";

let panel: WebviewPanel | undefined;

export const show: (extension: Uri) => void = (extension: Uri) => {
    if(panel && !panel.visible){
        panel.reveal();
    }else{
        panel = window.createWebviewPanel(
            "background",
            "Background",
            window.activeTextEditor?.viewColumn || ViewColumn.One,
            {
                enableFindWidget: true,
                enableForms: true,
                enableScripts: true,
                localResourceRoots: [
                    extension
                ]
            }
        );

        panel.webview.html = ""; // TODO
    }
}

export const destroy: () => void = () => {
    if(panel){
        panel.dispose();
        panel = undefined;
    }
}

export const minify: (s: string) => string = (s: string) =>
    s
       .trim()
       .replace(/\/\*.*?\*\//gms, '') // remove multiline /* */ comments
       .replace(/<!--.*?-->/gms, '')  // remove multiline <!-- --> comments
       .replace(/^ +/gm, '')          // remove trailing space
       .replace(/\r?\n/gm, '')        // remove newlines