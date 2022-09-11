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

import * as vscode from "vscode";

// quick pick handle

export const handle: (item?: CommandQuickPickItem) => void = (item?: CommandQuickPickItem) => item && item.onSelect && item.onSelect(item);

// quick pick

export const quickPickItem: (item: CommandQuickPickItem, current?: string) => CommandQuickPickItem = (item: CommandQuickPickItem, current?: string) => ({
    ...item,
    description: ((item.description ?? "") + (item.label === current ? " (selected)" : "")).trim()
} as CommandQuickPickItem);

export const separator: () => vscode.QuickPickItem = () => ({
    label: "",
    kind: vscode.QuickPickItemKind.Separator
} as vscode.QuickPickItem);

// types

export type CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => Promise<void>;

export interface CommandQuickPickItem extends vscode.QuickPickItem {
    onSelect?: (item?: CommandQuickPickItem) => Promise<void>;
    value?: string
}