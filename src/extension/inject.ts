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

const identifier: string = "KatsuteDev/Background";

const partition: RegExp = new RegExp(`^\\/\\* ${identifier}-start \\*\\/$` +
                                     `[\\s\\S]*?` +
                                     `^\\/\\* ${identifier}-end \\*\\/$`, "gmi");

// inject

export const inject: (content: string) => string = (content: string) =>
    clear(content) +
    `/* ${identifier}-start */` + '\n' +
    minifyJavaScript(getJavaScript()) + '\n' +
    `/* ${identifier}-end */`;

export const clear: (content: string) => string = (s: string) =>
    s.replace(partition, "").trim();

// javascript

const minifyJavaScript: (javascript: string) => string = (javascript: string) =>
    javascript
        .trim()
        .replace(/(?<=\)|})$/gm, ';')  // add semicolon to end of ) and }
        .replace(/\/\/ .*$/gm, '')     // remove line // comments
        .replace(/\/\*.*?\*\//gms, '') // remove multiline /* */ comments
        .replace(/^ +/gm, '')          // remove trailing space
        .replace(/\r?\n/gm, '')        // remove newlines

const getJavaScript: () => string = () =>
    `(() => {` +
        (``) +
    `})();`;