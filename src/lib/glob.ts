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

import { glob, IOptions } from "glob";

import * as fs from "fs";
import * as path from "path";

import { unlock } from "./file";
import { extensions } from "../command/config/file";
import { unique } from "./unique";

const filter = (v: string) => { // images only
    const ext: string = path.extname(v);
    for(const m of extensions())
        if(`.${m}` === ext)
            return true;
    return false;
}

const options: IOptions = {
    absolute: true,
    nodir: true,
    nosort: true
}

export const count: (globs: string | string[]) => number = (globs: string | string[]) => {
    let i = 0;
    for(const g of (Array.isArray(globs) ? globs : [globs]).filter(unique))
        i += +g.startsWith("https://") || glob.sync(g, options).filter(filter).length;
    return i;
}

export const resolve: (globs: string | string[]) => string[] = (globs: string | string[]) => {
    let p: string[] = [];
    for(const g of (Array.isArray(globs) ? globs : [globs]).filter(unique))
        if(g.startsWith("https://"))
            p.push('"' + g + '"');
        else
            for(const f of glob.sync(g, options).filter(filter))
                unlock(f) && p.push('"' + `data:image/${path.extname(f).substring(1)};base64,${fs.readFileSync(f, "base64")}` + '"');
    return p.filter(unique);
}