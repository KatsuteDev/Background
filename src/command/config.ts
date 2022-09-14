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

import { get, getForUI, UI } from "../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem, separator } from "../vs/quickpick";

import * as file from "./config/file";
import * as align from "./config/align";
import * as blur from "./config/blur";
import * as opacity from "./config/opacity";
import * as repeat from "./config/repeat";
import * as size from "./config/size";

// interface

export const config: vscode.Disposable = vscode.commands.registerCommand("background.config", () => {
    vscode.window.showQuickPick([
        // background types
        quickPickItem({
            label: "$(window) Window",
            description: s(get("windowBackgrounds"), "Background"),
            detail: `${getForUI("window", "backgroundAlignment")} Alignment`    + ` • ` +
                    `${getForUI("window", "backgroundBlur")} Blur`              + ` • ` +
                    `${getForUI("window", "backgroundOpacity")} Opacity`        + ` • ` +
                    `${getForUI("window", "backgroundRepeat")} Repeat`          + ` • ` +
                    `${getForUI("window", "backgroundSize")} Size`,
            onSelect: menu,
            ui: "window"
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: s(get("editorBackgrounds"), "Background"),
            detail: `${getForUI("editor", "backgroundAlignment")} Alignment`    + ` • ` +
                    `${getForUI("editor", "backgroundBlur")} Blur`              + ` • ` +
                    `${getForUI("editor", "backgroundOpacity")} Opacity`        + ` • ` +
                    `${getForUI("editor", "backgroundRepeat")} Repeat`          + ` • ` +
                    `${getForUI("editor", "backgroundSize")} Size`,
            onSelect: menu,
            ui: "editor"
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: s(get("sidebarBackgrounds"), "Background"),
            detail: `${getForUI("sidebar", "backgroundAlignment")} Alignment`   + ` • ` +
                    `${getForUI("sidebar", "backgroundBlur")} Blur`             + ` • ` +
                    `${getForUI("sidebar", "backgroundOpacity")} Opacity`       + ` • ` +
                    `${getForUI("sidebar", "backgroundRepeat")} Repeat`         + ` • ` +
                    `${getForUI("sidebar", "backgroundSize")} Size`,
            onSelect: menu,
            ui: "sidebar"
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: s(get("panelBackgrounds"), "Background"),
            detail: `${getForUI("panel", "backgroundAlignment")} Alignment`     + ` • ` +
                    `${getForUI("panel", "backgroundBlur")} Blur`               + ` • ` +
                    `${getForUI("panel", "backgroundOpacity")} Opacity`         + ` • ` +
                    `${getForUI("panel", "backgroundRepeat")} Repeat`           + ` • ` +
                    `${getForUI("panel", "backgroundSize")} Size`,
            onSelect: menu,
            ui: "panel"
        }),
        separator(),
        // extension options
        quickPickItem({
            label: "$(check) Install",
            description: "Install background",
            onSelect: () => new Promise(() => vscode.commands.executeCommand("background.install"))
        }),
        quickPickItem({
            label: "$(close) Uninstall",
            description: "Uninstall background",
            onSelect: () => new Promise(() => vscode.commands.executeCommand("background.uninstall"))
        }),
        quickPickItem({
            label: "$(refresh) Reload Background",
            description: "Randomizes installed backgrounds; Background must already be installed",
            onSelect: () => new Promise(() => vscode.commands.executeCommand("background.reload"))
        }),
    ], options)
    .then(handle);
});

// shared options

export const options: vscode.QuickPickOptions = {
    title: "Background",
    matchOnDetail: true,
    matchOnDescription: true
}

// menu

export const menu: CommandQuickPickItemPromise = (item?: CommandQuickPickItem) => new Promise(() => {
    if(!item) return;

    const ui: UI = item.ui!;

    vscode.window.showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: s(get(`${ui}Backgrounds`), "Background"),
            detail: "Select background image files",
            onSelect: file.menu,
            ui
        }),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${getForUI(ui, "backgroundAlignment")}`,
            detail: "Background image alignment",
            onSelect: align.menu,
            ui
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${getForUI(ui, "backgroundBlur")}`,
            detail: "Background image blur",
            onSelect: blur.menu,
            ui
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${getForUI(ui, "backgroundOpacity")}`,
            detail: "Background image opacity",
            onSelect: opacity.menu,
            ui
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${getForUI(ui, "backgroundRepeat")}`,
            detail: "Background image repeat",
            onSelect: repeat.menu,
            ui
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${getForUI(ui, "backgroundSize")}`,
            detail: "Background image size",
            onSelect: size.menu,
            ui
        })
    ],
    {
        ...options,
        title: `${ui[0].toUpperCase() + ui.substring(1)} ${options.title}`,
    })
    .then(handle);
});

//

const s: (arr: any[], s: string) => string = (arr: any[], s: string) => `${arr.length} ${s}${arr.length != 1 ? 's' : ''}`;