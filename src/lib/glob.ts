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

import { extname } from "path";
import { GlobOptions, globSync, escape as esc } from "glob";

import { extensions } from "../extension/inject";

import { unique } from "./array";
import { resolve as resolveEnv } from "../extension/env";
import { Uri } from "vscode";

const filter: (v: string) => boolean = (v : string) => {
    const ext: string = extname(v).slice(1);
    return extensions().includes(ext);
}

const options: GlobOptions = {
    absolute: true,
    nodir: true
}

export const escapePath: (path: Uri) => string = (path: Uri) =>
    escape(path.fsPath);

export const escape: (path: string) => string = (path: string) =>
    esc(path.replace(/\\/g, '/'));

export const count: (glob: string | string[]) => number = (glob: string | string[]) => {
    let i = 0;

    let globs: string[] = [];
    for(const g of (Array.isArray(glob) ? glob.filter(unique) : [glob]))
        if(g.startsWith("https://"))
            i++;
        else // do not normalize '/', add file/dir already does this; warning already included in add glob
            globs.push(resolveEnv(g));

    return i + (globSync(globs, options) as string[]).filter(filter).filter(unique).length;
}

export const resolve: (glob: string | string[]) => string[] = (glob: string | string[]) => {
    let urls: string[] = [];
    let globs: string[] = [];

    for(const g of (Array.isArray(glob) ? glob.filter(unique) : [glob]))
        if(g.startsWith("https://"))
            urls.push(g);
        else // do not normalize '/', add file/dir already does this; warning already included in add glob
            globs.push(resolveEnv(g));

    return urls.concat((globSync(globs, options) as string[])
                    .filter(filter) // must use '/' for URL ↓
                    .map(path => `vscode-file://vscode-app/${path.replace(/\\/g, '/').replace(/^\/+/g, "")}`))
               .filter(unique)
               .map(path => '"' + path.replace(/"/g, `\\"`) + '"');
}