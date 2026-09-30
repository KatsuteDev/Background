/*
 * Copyright (C) 2026 Katsute <https://github.com/Katsute>
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

// sanitize

export const sanitizeCSS: (css: string) => string = (css: string) =>
    JSON.stringify(String(css ?? "")).slice(1, -1) // escapes \ " and control characters (newlines)
        .replace(/</g, "\\u003C")            // prevent </script> and <!-- from breaking out of the script tag
        .replace(/>/g, "\\u003E")
        .replace(/\//g, "\\u002F")           // prevent // and /* */ from being read as comments by the minifier
        .replace(/\*/g, "\\u002A")
        .replace(/\u2028/g, "\\u2028")       // line/paragraph separators
        .replace(/\u2029/g, "\\u2029");

export const sanitizeUnits: (unit: string) => string = (unit: string) =>
    unit.replace(/[^\w.% +-]/gmi, "");

// validation

const invalidCSS: RegExp = /[^\w.% +-]/gm;

export const isValidCSS: (css: string) => boolean = (css: string) => !css.match(invalidCSS);