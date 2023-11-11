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

import * as os from "os";

import { configuration, get, UI } from "../extension/config";
import { pkg } from "../extension/package";
import { quickPickItem, separator, showQuickPick } from "../lib/vscode";

import * as file from "./file";
import * as align from "./align";
import * as blur from "./blur";
import * as opacity from "./opacity";
import * as repeat from "./repeat";
import * as size from "./size";
import * as time from "./time";

import * as str from "../lib/string";
import * as glob from "../lib/glob";

// interface

const sponsor: vscode.Uri = vscode.Uri.parse(pkg.sponsor.url);

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
            label: "$(refresh) Reload",
            description: "Randomizes the current background",
            handle: () => vscode.commands.executeCommand("background.reload")
        }),
        separator(),
        quickPickItem({
            label: "$(output) Changelog",
            handle: () => vscode.commands.executeCommand("background.changelog")
        }),
        quickPickItem({
            label: "$(question) Help",
            handle: () => vscode.commands.executeCommand("background.help")
        }),
        quickPickItem({
            label: `$(github) Report an issue on GitHub`,
            handle: () => vscode.env.openExternal(vscode.Uri.parse(`https://github.com/KatsuteDev/Background/issues/new?template=bug.yml&os=${encodeURI(`${os.platform()} ${os.release()}`)}&vs=${encodeURI(vscode.version)}&version=${encodeURI(pkg.version)}&settings=${encodeURI("```json\n" + JSON.stringify(configuration(), null, 4) + "\n```")}`))
        }),
        quickPickItem({
            label: "$(heart) Sponsor this extension",
            handle: () => vscode.env.openExternal(sponsor)
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