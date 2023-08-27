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

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const mp = path.join(__dirname, "meta.json");

const meta = JSON.parse(fs.readFileSync(mp, "utf-8"));

let licenses = "# Licenses\n\n---";

for(const dep of Object.keys(meta.inputs)
                       .filter(k => k.startsWith("node_modules/"))
                       .map(p => p.split('/'))
                       .map(p => p.slice(0, p.length - 1).join('/'))
                       .filter((p, i, self) => self.indexOf(p) === i)
                       .sort()){
    // todo: use glob to grab all LICENSE files, then use the folder name (split on node_modules) as the dependency name

    for(const LICENSE of [path.join(__dirname, dep, "LICENSE"),
                          path.join(__dirname, dep, "LICENSE.txt"),
                          path.join(__dirname, dep, "LICENSE.md")]){
        if(fs.existsSync(LICENSE)){
            let name = LICENSE.split("node_modules").slice(-1)[0].replace(/\\/g, '/').split('/');
                name = name.slice(0, name.length - 1).join('/').slice(1);

            licenses += '\n\n# ' + name;
            licenses += '\n\n' + fs.readFileSync(LICENSE, "utf-8").trim();
            break;
        }else
            console.warn(`License was missing for ${dep}`);
    }
}

fs.writeFileSync(path.join(__dirname, "LICENSES.txt"), licenses, "utf-8");
fs.rmSync(mp);