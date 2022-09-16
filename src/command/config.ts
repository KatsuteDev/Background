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

import { get, getUI, UI } from "../vs/vsconfig";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../vs/quickpick";

import * as file from "./config/file";
import * as align from "./config/align";
import * as blur from "./config/blur";
import * as opacity from "./config/opacity";
import * as repeat from "./config/repeat";
import * as size from "./config/size";

// interface

export const config: vscode.Disposable = vscode.commands.registerCommand("background.config", () => {
    showQuickPick([
        // background types
        quickPickItem({
            label: "$(window) Window",
            description: s(get("windowBackgrounds"), "Background"),
            detail: `${getUI("window", "backgroundAlignment")} Alignment`    + ` • ` +
                    `${getUI("window", "backgroundBlur")} Blur`              + ` • ` +
                    `${getUI("window", "backgroundOpacity")} Opacity`        + ` • ` +
                    `${getUI("window", "backgroundRepeat")} Repeat`          + ` • ` +
                    `${getUI("window", "backgroundSize")} Size`,
            then: menu,
            ui: "window"
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: s(get("editorBackgrounds"), "Background"),
            detail: `${getUI("editor", "backgroundAlignment")} Alignment`    + ` • ` +
                    `${getUI("editor", "backgroundBlur")} Blur`              + ` • ` +
                    `${getUI("editor", "backgroundOpacity")} Opacity`        + ` • ` +
                    `${getUI("editor", "backgroundRepeat")} Repeat`          + ` • ` +
                    `${getUI("editor", "backgroundSize")} Size`,
            then: menu,
            ui: "editor"
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: s(get("sidebarBackgrounds"), "Background"),
            detail: `${getUI("sidebar", "backgroundAlignment")} Alignment`   + ` • ` +
                    `${getUI("sidebar", "backgroundBlur")} Blur`             + ` • ` +
                    `${getUI("sidebar", "backgroundOpacity")} Opacity`       + ` • ` +
                    `${getUI("sidebar", "backgroundRepeat")} Repeat`         + ` • ` +
                    `${getUI("sidebar", "backgroundSize")} Size`,
            then: menu,
            ui: "sidebar"
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: s(get("panelBackgrounds"), "Background"),
            detail: `${getUI("panel", "backgroundAlignment")} Alignment`     + ` • ` +
                    `${getUI("panel", "backgroundBlur")} Blur`               + ` • ` +
                    `${getUI("panel", "backgroundOpacity")} Opacity`         + ` • ` +
                    `${getUI("panel", "backgroundRepeat")} Repeat`           + ` • ` +
                    `${getUI("panel", "backgroundSize")} Size`,
            then: menu,
            ui: "panel"
        }),
        separator(),
        // extension options
        quickPickItem({
            label: "$(check) Install",
            description: "Install background",
            then: () => vscode.commands.executeCommand("background.install")
        }),
        quickPickItem({
            label: "$(close) Uninstall",
            description: "Uninstall background",
            then: () => vscode.commands.executeCommand("background.uninstall")
        }),
        quickPickItem({
            label: "$(refresh) Reload Background",
            description: "Randomizes installed backgrounds; Background must already be installed",
            then: () => vscode.commands.executeCommand("background.reload")
        }),
    ], options);
});

// shared options

export const options: vscode.QuickPickOptions = {
    title: "Background",
    matchOnDetail: true,
    matchOnDescription: true
}

// menu

export const menu: (item: CommandQuickPickItem) => void = (item: CommandQuickPickItem) => {
    if(!item) return;

    const ui: UI = item.ui!;

    showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: s(get(`${ui}Backgrounds`), "Background"),
            detail: "Select background image files",
            then: file.menu,
            ui
        }),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${getUI(ui, "backgroundAlignment")}`,
            detail: "Background image alignment",
            then: align.menu,
            ui
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${getUI(ui, "backgroundBlur")}`,
            detail: "Background image blur",
            then: blur.menu,
            ui
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${getUI(ui, "backgroundOpacity")}`,
            detail: "Background image opacity",
            then: opacity.menu,
            ui
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${getUI(ui, "backgroundRepeat")}`,
            detail: "Background image repeat",
            then: repeat.menu,
            ui
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${getUI(ui, "backgroundSize")}`,
            detail: "Background image size",
            then: size.menu,
            ui
        })
    ],
    {
        ...options,
        title: `${ui[0].toUpperCase() + ui.substring(1)} ${options.title}`,
    });
};

//

const s: (arr: any[], s: string) => string = (arr: any[], s: string) => `${arr.length} ${s}${arr.length != 1 ? 's' : ''}`;