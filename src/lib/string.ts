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

export const appendS: (obj: any[] | number, str: string) => string = (obj: any[] | number, str: string) =>
    Array.isArray(obj) ? appendS(obj.length, str) : `${obj} ${str}${obj != 1 ? 's' : ''}`;

export const appendIf: (s: string, condition: (s: string) => boolean, append: string) => string = (s: string, condition: (s: string) => boolean, append: string) =>
    s + (condition(s) ? append : '');

export const capitalize: (s: string) => string = (s: string) =>
    `${(s[0] ?? "").toUpperCase() + (s ?? "").substring(1)}`;