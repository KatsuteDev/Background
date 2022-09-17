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

import { get, UI } from "../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../vs/quickpick";

import * as file from "./config/file";
import * as align from "./config/align";
import * as blur from "./config/blur";
import * as opacity from "./config/opacity";
import * as repeat from "./config/repeat";
import * as size from "./config/size";

import { capitalize, s } from "../lib/str";

// interface

export const config: vscode.Disposable = vscode.commands.registerCommand("background.config", () => {
    showQuickPick([
        // background types
        quickPickItem({
            label: "$(window) Window",
            description: s(get("windowBackgrounds"), "Background"),
            detail: `${get("backgroundAlignment",   "window")} Alignment`   + ` • ` +
                    `${get("backgroundBlur",        "window")} Blur`        + ` • ` +
                    `${get("backgroundOpacity",     "window")} Opacity`     + ` • ` +
                    `${get("backgroundRepeat",      "window")} Repeat`      + ` • ` +
                    `${get("backgroundSize",        "window")} Size`,
            ui: "window",
            handle: menu
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: s(get("editorBackgrounds"), "Background"),
            detail: `${get("backgroundAlignment",   "editor")} Alignment`   + ` • ` +
                    `${get("backgroundBlur",        "editor")} Blur`        + ` • ` +
                    `${get("backgroundOpacity",     "editor")} Opacity`     + ` • ` +
                    `${get("backgroundRepeat",      "editor")} Repeat`      + ` • ` +
                    `${get("backgroundSize",        "editor")} Size`,
            ui: "editor",
            handle: menu
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: s(get("sidebarBackgrounds"), "Background"),
            detail: `${get("backgroundAlignment",   "sidebar")} Alignment`  + ` • ` +
                    `${get("backgroundBlur",        "sidebar")} Blur`       + ` • ` +
                    `${get("backgroundOpacity",     "sidebar")} Opacity`    + ` • ` +
                    `${get("backgroundRepeat",      "sidebar")} Repeat`     + ` • ` +
                    `${get("backgroundSize",        "sidebar")} Size`,
            ui: "sidebar",
            handle: menu
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: s(get("panelBackgrounds"), "Background"),
            detail: `${get("backgroundAlignment",   "panel")} Alignment`    + ` • ` +
                    `${get("backgroundBlur",        "panel")} Blur`         + ` • ` +
                    `${get("backgroundOpacity",     "panel")} Opacity`      + ` • ` +
                    `${get("backgroundRepeat",      "panel")} Repeat`       + ` • ` +
                    `${get("backgroundSize",        "panel")} Size`,
            ui: "panel",
            handle: menu
        }),
        separator(),
        // extension options
        quickPickItem({
            label: "$(check) Install",
            description: "Install background",
            handle: () => vscode.commands.executeCommand("background.install")
        }),
        quickPickItem({
            label: "$(close) Uninstall",
            description: "Uninstall background",
            handle: () => vscode.commands.executeCommand("background.uninstall")
        }),
        quickPickItem({
            label: "$(refresh) Reload Background",
            description: "Randomizes installed backgrounds; Background must already be installed",
            handle: () => vscode.commands.executeCommand("background.reload")
        }),
    ], options);
});

// shared options

export const options: vscode.QuickPickOptions = {
    title: "Background",
    matchOnDetail: true,
    matchOnDescription: true
}

export const title: (s: string, ui?: UI) => string = (s: string, ui?: UI) => ui ? `${ui} ${options.title} - ${s}` : `${options.title} - ${s}`;

// menu

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: s(get(`${item.ui!}Backgrounds`), "Background"),
            detail: "Select background image files",
            ui: item.ui!,
            handle: file.menu
        }),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${get("backgroundAlignment", item.ui!)}`,
            detail: "Background image alignment",
            ui: item.ui!,
            handle: align.menu
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${get("backgroundBlur", item.ui!)}`,
            detail: "Background image blur",
            ui: item.ui!,
            handle: blur.menu
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${get("backgroundOpacity", item.ui!)}`,
            detail: "Background image opacity",
            ui: item.ui!,
            handle: opacity.menu
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${get("backgroundRepeat", item.ui!)}`,
            detail: "Background image repeat",
            ui: item.ui!,
            handle: repeat.menu
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${get("backgroundSize", item.ui!)}`,
            detail: "Background image size",
            ui: item.ui!,
            handle: size.menu
        })
    ],
    {
        ...options,
        title: `${capitalize(item.ui!)} ${options.title}`,
    });
};