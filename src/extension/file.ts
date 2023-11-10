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

import { platform } from "process";
import { createHash } from "crypto";
import { PathOrFileDescriptor } from "fs";

export const copyCommand:
    (files: [source: PathOrFileDescriptor, dest: PathOrFileDescriptor][], os?: NodeJS.Platform) => string =
    (files: [PathOrFileDescriptor, PathOrFileDescriptor][], os: NodeJS.Platform = platform) => {
    const windows: boolean = os === "win32";
    return files
        .map((file: [source: PathOrFileDescriptor, dest: PathOrFileDescriptor]) =>
            windows
            ? `xcopy /r /y "${file[0]}" "${file[1]}*"` // asterisk required so windows treats as file and skips prompt asking if path is file or directory
            : `cp -f '${file[0]}' '${file[1]}'`
        )
        .join(" && ");
};

export const generateChecksum: (content: string) => string = (content: string) =>
    createHash("md5")
        .update(content)
        .digest("base64")
        .replace(/=+$/gm, '');