/*
 * Copyright (C) 2025 Katsute <https://github.com/Katsute>
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

import { env } from "vscode";
import { platform } from "process";
import { createHash } from "crypto";
import { PathLike, existsSync } from "fs";

// copy

const windows: boolean = platform === "win32";
const mac: boolean = platform === "darwin";

export const copyCommand:
    (files: [source: PathLike, dest: PathLike][]) => string =
    (files: [PathLike, PathLike][]) =>
    (mac ? `sudo chmod -R a+rwx '${env.appRoot.replace(/\/Contents\/Resources\/app$/g, '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}' && ` : '') +
    files
        .map((file: [source: PathLike, dest: PathLike]) =>
            windows
            ? (!existsSync(file[1]) ? `echo "NUL" > "${file[1]}" && ` : '') + // create file to avoid F/D prompt
              `xcopy /r /y "${file[0]}" "${file[1]}"` // must use xcopy, copy doesn't overwrite read-only files
            : `cp -f '${file[0]}' '${file[1]}'`
        )
        .join(" && ");

// checksum

export const generateChecksum: (content: string) => string = (content: string) =>
    createHash("sha256")
        .update(content)
        .digest("base64")
        .replace(/=+$/gm, '');