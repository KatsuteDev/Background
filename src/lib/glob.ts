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

import { GlobOptions, globSync } from "glob";

import * as path from "path";

import * as env from "../lib/env";

import { extensions } from "../command/config/file";
import { unique } from "./unique";

const filter: (v: string) => boolean = (v : string) => {
    const ext: string = path.extname(v);
    for(const m of extensions())
        if(`.${m}` === ext)
            return true;
    return false;
}

const options: GlobOptions = {
    absolute: true,
    nodir: true
}

export const count: (glob: string | string[]) => number = (glob: string | string[]) => {
    let i = 0;

    let globs: string[] = [];
    for(const g of (Array.isArray(glob) ? glob.filter(unique) : [glob]))
        if(g.startsWith("https://"))
            i++;
        else // need to normalize '/' ↓ so glob works properly
            globs.push(env.resolve(g).replace(/\\/gm, '/'));

    return i + (globSync(globs, options) as string[]).filter(filter).filter(unique).length;
}

export const resolve: (glob: string | string[]) => string[] = (glob: string | string[]) => {
    let urls: string[] = [];
    let globs: string[] = [];

    for(const g of (Array.isArray(glob) ? glob.filter(unique) : [glob]))
        if(g.startsWith("https://"))
            urls.push(g);
        else // need to normalize '/' ↓ so glob works properly
            globs.push(env.resolve(g).replace(/\\/gm, '/'));

    return urls.concat((globSync(globs, options) as string[])
                    .filter(filter) // need to normalize '/' again ↓ because glob uses the wrong slash
                    .map(path => `vscode-file://vscode-app/${path.replace(/\\/gm, '/').replace(/^\/+/gm, "")}`))
               .filter(unique)
               .map(path => '"' + path + '"');
}