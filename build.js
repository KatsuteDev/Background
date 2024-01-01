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

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const mp = path.join(__dirname, "meta.json");

const meta = JSON.parse(fs.readFileSync(mp, "utf-8"));

let files = [];

// glob all potential license files
for(const dep of Object.keys(meta.inputs)
                       .filter(k => k.startsWith("node_modules/"))
                       .map(p => p.split('/')[1])
                       .filter((p, i, self) => self.indexOf(p) === i)
                       .sort((a, b) => a.length - b.length)){
    for(const license of glob.sync(`node_modules/${dep}/**/LICENSE*`, {nodir: true, nocase: true}).map(p => p.replace(/\\/g, '/'))){
        files.push(license);
    }
}

let licenses = {};

// sort so top level (newer) dependency licenses overwrite transient (potentially older) dependency licenses
for(const license of files.sort((a, b) => b.length - a.length)){
    const name = license.split("node_modules").splice(-1)[0].split('/').slice(0, -1).join('/').substring(1);
    licenses[name] = fs.readFileSync(license, "utf-8").trim();
}

let out = "# Licenses\n\n---";

// write sorted licenses
for(const k of Object.keys(licenses).sort()){
    out += `\n\n# ${k}`;
    out += `\n\n${licenses[k]}`;
}

fs.writeFileSync(path.join(__dirname, "LICENSES.txt"), out, "utf-8");
fs.rmSync(mp);