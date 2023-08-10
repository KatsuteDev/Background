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

import * as vscode from "vscode";

import { get, UI } from "../vs/vsconfig";
import { pkg } from "../vs/package";
import { quickPickItem, separator, showQuickPick } from "../vs/quickpick";

import * as file from "./config/file";
import * as align from "./config/align";
import * as blur from "./config/blur";
import * as opacity from "./config/opacity";
import * as repeat from "./config/repeat";
import * as size from "./config/size";
import * as time from "./config/time";

import * as str from "../lib/str";
import * as glob from "../lib/glob";

// interface

const issues: vscode.Uri = vscode.Uri.parse(pkg.bugs.url);

export const command: vscode.Disposable = vscode.commands.registerCommand("background.config", () => config());

export const config: () => void = () => {
    showQuickPick([
        // background types
        quickPickItem({
            label: "$(window) Window",
            description: `${str.s(get("windowBackgrounds"), "Glob")} (${str.s(glob.count(get("windowBackgrounds")), "Background")})`,
            detail: `${get("backgroundAlignment",   "window")} Alignment`   + ` • ` +
                    `${get("backgroundBlur",        "window")} Blur`        + ` • ` +
                    `${get("backgroundOpacity",     "window")} Opacity`     + ` • ` +
                    `${get("backgroundRepeat",      "window")} Repeat`      + ` • ` +
                    `${get("backgroundSize",        "window")} Size`        + ` • ` +
                    `${get("backgroundChangeTime",  "window")} second${get("backgroundChangeTime", "window") === 1 ? '' : 's'}`,
            ui: "window",
            handle: () => menu("window")
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: `${str.s(get("editorBackgrounds"), "Glob")} (${str.s(glob.count(get("editorBackgrounds")), "Background")})`,
            detail: `${get("backgroundAlignment",   "editor")} Alignment`   + ` • ` +
                    `${get("backgroundBlur",        "editor")} Blur`        + ` • ` +
                    `${get("backgroundOpacity",     "editor")} Opacity`     + ` • ` +
                    `${get("backgroundRepeat",      "editor")} Repeat`      + ` • ` +
                    `${get("backgroundSize",        "editor")} Size`        + ` • ` +
                    `${get("backgroundChangeTime",  "editor")} second${get("backgroundChangeTime", "editor") === 1 ? '' : 's'}`,
            ui: "editor",
            handle: () => menu("editor")
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: `${str.s(get("sidebarBackgrounds"), "Glob")} (${str.s(glob.count(get("sidebarBackgrounds")), "Background")})`,
            detail: `${get("backgroundAlignment",   "sidebar")} Alignment`  + ` • ` +
                    `${get("backgroundBlur",        "sidebar")} Blur`       + ` • ` +
                    `${get("backgroundOpacity",     "sidebar")} Opacity`    + ` • ` +
                    `${get("backgroundRepeat",      "sidebar")} Repeat`     + ` • ` +
                    `${get("backgroundSize",        "sidebar")} Size`       + ` • ` +
                    `${get("backgroundChangeTime",  "sidebar")} second${get("backgroundChangeTime", "sidebar") === 1 ? '' : 's'}`,
            ui: "sidebar",
            handle: () => menu("sidebar")
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: `${str.s(get("panelBackgrounds"), "Glob")} (${str.s(glob.count(get("panelBackgrounds")), "Background")})`,
            detail: `${get("backgroundAlignment",   "panel")} Alignment`    + ` • ` +
                    `${get("backgroundBlur",        "panel")} Blur`         + ` • ` +
                    `${get("backgroundOpacity",     "panel")} Opacity`      + ` • ` +
                    `${get("backgroundRepeat",      "panel")} Repeat`       + ` • ` +
                    `${get("backgroundSize",        "panel")} Size`         + ` • ` +
                    `${get("backgroundChangeTime",  "panel")} second${get("backgroundChangeTime", "panel") === 1 ? '' : 's'}`,
            ui: "panel",
            handle: () => menu("panel")
        }),
        separator(),
        // extension options
        quickPickItem({
            alwaysShow: true,
            label: "$(check) Install",
            description: "Install background",
            handle: () => vscode.commands.executeCommand("background.install")
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(close) Uninstall",
            description: "Uninstall background",
            handle: () => vscode.commands.executeCommand("background.uninstall")
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(refresh) Reload Background",
            description: "Randomizes current backgrounds",
            handle: () => vscode.commands.executeCommand("background.reload")
        }),
        separator(),
        // changelog
        quickPickItem({
            label: "$(output) Changelog",
            handle: () => vscode.commands.executeCommand("background.changelog")
        }),
        quickPickItem({
            label: `$(bug) Report an Issue`,
            handle: () => vscode.env.openExternal(issues)
        })
    ], options);
}

// shared options

export const options: vscode.QuickPickOptions = {
    title: "Background",
    matchOnDetail: true,
    matchOnDescription: true
}

export const title: (s: string, ui?: UI) => string = (s: string, ui?: UI) => ui ? `${str.capitalize(ui)} ${options.title} - ${s}` : `${options.title} - ${s}`;

// menu

export const menu: (ui: UI) => void = (ui: UI) => {
    showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: `${str.s(get(`${ui}Backgrounds`), "Glob")} (${str.s(glob.count(get(`${ui}Backgrounds`)), "Background")})`,
            detail: "Select background image files",
            ui,
            handle: () => file.menu(ui)
        }),
        separator(),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${get("backgroundAlignment", ui)}`,
            detail: "Background image alignment",
            ui,
            handle: () => align.menu(ui)
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${get("backgroundBlur", ui)}`,
            detail: "Background image blur",
            ui,
            handle: () => blur.menu(ui)
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${get("backgroundOpacity", ui)}`,
            detail: "Background image opacity",
            ui,
            handle: () => opacity.menu(ui)
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${get("backgroundRepeat", ui)}`,
            detail: "Background image repeat",
            ui,
            handle: () => repeat.menu(ui)
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${get("backgroundSize", ui)}`,
            detail: "Background image size",
            ui,
            handle: () => size.menu(ui)
        }),
        quickPickItem({
            label: "$(clock) Time",
            description: `${get("backgroundChangeTime", ui)} second${get("backgroundChangeTime", ui) === 1 ? '' : 's'}`,
            detail: "How often to change the background",
            ui,
            handle: () => time.menu(ui)
        })
    ],
    {
        ...options,
        title: `${str.capitalize(ui)} ${options.title}`,
    },
    config);
};