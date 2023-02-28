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

import { globSync } from "glob";
import { GlobOptions } from "glob/dist/cjs";

import * as path from "path";

import { extensions } from "../command/config/file";
import { unique } from "./unique";

const filter: (v: any) => boolean = (v : string): v is string => { // images only
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

export const count: (globs: string | string[]) => number = (globs: string | string[]) => {
    let i = 0;
    for(const g of (Array.isArray(globs) ? globs : [globs]).filter(unique))
        i += +g.startsWith("https://") || globSync(g, options).filter(filter).length;
    return i;
}

export const resolve: (globs: string | string[]) => string[] = (globs: string | string[]) => {
    let p: string[] = [];
    for(const g of (Array.isArray(globs) ? globs : [globs]).filter(unique))
        if(g.startsWith("https://"))
            p.push(`"${g}"`);
        else
            for(const f of globSync(g, options).filter(filter) as string[])
                p.push(`"vscode-file://vscode-app/${f.replace(/^\/+/gm, "")}"`);
    return p.filter(unique);
}