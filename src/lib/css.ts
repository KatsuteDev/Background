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

// sanitize

export const sanitizeCSS: (css: string) => string = (css: string) =>
    css
        .replace(/\r?\n/gm, ' ') // make single line
        .replace(/"/gm, `'`)     // prevent escaping quotes
        .replace(/\\+$/gm, '');  // prevent escaping inject script quote

export const sanitizeUnits: (unit: string) => string = (unit: string) =>
    unit.replace(/[^\w.% +-]/gmi, "");

// validation

const invalidCSS: RegExp = /[^\w.% +-]/gm;

export const isValidCSS: (css: string) => boolean = (css: string) => !css.match(invalidCSS);