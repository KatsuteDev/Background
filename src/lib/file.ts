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

import * as fs from "fs";

export const canRead: (path: fs.PathLike) => boolean = (path: fs.PathLike) => {
    try{
        fs.accessSync(path, fs.constants.R_OK);
        return true;
    }catch(error: any){
        return false;
    }
}

export const canWrite: (path: fs.PathLike) => boolean = (path: fs.PathLike) => {
    try{
        fs.accessSync(path, fs.constants.W_OK);
        return true;
    }catch(error: any){
        return false;
    }
}

export const read: (path: fs.PathLike) => string = (path: fs.PathLike) => {
    return fs.readFileSync(path, "utf-8");
}

export const write: (path: fs.PathLike, content: string) => void = (path: fs.PathLike, content: string) => {
    fs.writeFileSync(path, content, "utf-8");
}

export const copy: (src: fs.PathLike, dest: fs.PathLike) => void = (src: fs.PathLike, dest: fs.PathLike) => {
    fs.existsSync(dest);
    fs.copyFileSync(src, dest);
}