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

import { capitalize, s } from "../lib/str";

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
            ui: "window",
            handle: menu
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: s(get("editorBackgrounds"), "Background"),
            detail: `${getUI("editor", "backgroundAlignment")} Alignment`    + ` • ` +
                    `${getUI("editor", "backgroundBlur")} Blur`              + ` • ` +
                    `${getUI("editor", "backgroundOpacity")} Opacity`        + ` • ` +
                    `${getUI("editor", "backgroundRepeat")} Repeat`          + ` • ` +
                    `${getUI("editor", "backgroundSize")} Size`,
            ui: "editor",
            handle: menu
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: s(get("sidebarBackgrounds"), "Background"),
            detail: `${getUI("sidebar", "backgroundAlignment")} Alignment`   + ` • ` +
                    `${getUI("sidebar", "backgroundBlur")} Blur`             + ` • ` +
                    `${getUI("sidebar", "backgroundOpacity")} Opacity`       + ` • ` +
                    `${getUI("sidebar", "backgroundRepeat")} Repeat`         + ` • ` +
                    `${getUI("sidebar", "backgroundSize")} Size`,
            ui: "sidebar",
            handle: menu
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: s(get("panelBackgrounds"), "Background"),
            detail: `${getUI("panel", "backgroundAlignment")} Alignment`     + ` • ` +
                    `${getUI("panel", "backgroundBlur")} Blur`               + ` • ` +
                    `${getUI("panel", "backgroundOpacity")} Opacity`         + ` • ` +
                    `${getUI("panel", "backgroundRepeat")} Repeat`           + ` • ` +
                    `${getUI("panel", "backgroundSize")} Size`,
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
            description: `${getUI(item.ui!, "backgroundAlignment")}`,
            detail: "Background image alignment",
            ui: item.ui!,
            handle: align.menu
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${getUI(item.ui!, "backgroundBlur")}`,
            detail: "Background image blur",
            ui: item.ui!,
            handle: blur.menu
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${getUI(item.ui!, "backgroundOpacity")}`,
            detail: "Background image opacity",
            ui: item.ui!,
            handle: opacity.menu
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${getUI(item.ui!, "backgroundRepeat")}`,
            detail: "Background image repeat",
            ui: item.ui!,
            handle: repeat.menu
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${getUI(item.ui!, "backgroundSize")}`,
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