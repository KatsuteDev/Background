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

import { get } from "../vs/vsconfig";
import { CommandQuickPickItem, CommandQuickPickItemPromise, handle, quickPickItem, separator } from "../vs/quickpick";

import * as reload from "./reload";
import * as install from "./install";
import * as uninstall from "./uninstall";

// interface

export const config: vscode.Disposable = vscode.commands.registerCommand("background.config", () => {
    vscode.window.showQuickPick([
        // background types
        quickPickItem({
            label: "$(window) Window",
            description: `${get("windowBackgrounds").length} Backgrounds`,
            detail: `${get("backgroundImageAlignment")} Alignment • ${get("backgroundImageBlur")} Blur • ${get("opacity")} Opacity • ${get("backgroundImageRepeat")} Repeat • ${get("backgroundImageSize")} Size`,
            onSelect: menu,
            value: "window"
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: `${get("editorBackgrounds").length} Backgrounds`,
            detail: `${get("backgroundImageAlignment")} Alignment • ${get("backgroundImageBlur")} Blur • ${get("opacity")} Opacity • ${get("backgroundImageRepeat")} Repeat • ${get("backgroundImageSize")} Size`,
            onSelect: menu,
            value: "editor"
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: `${get("sidebarBackgrounds").length} Backgrounds`,
            detail: `${get("backgroundImageAlignment")} Alignment • ${get("backgroundImageBlur")} Blur • ${get("opacity")} Opacity • ${get("backgroundImageRepeat")} Repeat • ${get("backgroundImageSize")} Size`,
            onSelect: menu,
            value: "sidebar"
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: `${get("panelBackgrounds").length} Backgrounds`,
            detail: `${get("backgroundImageAlignment")} Alignment • ${get("backgroundImageBlur")} Blur • ${get("opacity")} Opacity • ${get("backgroundImageRepeat")} Repeat • ${get("backgroundImageSize")} Size`,
            onSelect: menu,
            value: "panel"
        }),
        separator(),
        // extension options
        install.item,
        uninstall.item,
        reload.item
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

    vscode.window.showQuickPick([
        // backgrounds
        quickPickItem({
            label: "$(file-media) File",
            description: `${get(item.value! + "Backgrounds").length} Backgrounds`,
            detail: "Select background image files",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        separator(),
        // background options
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `todo`,
            detail: "Background image alignment",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `todo`,
            detail: "Background image blur",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(eye) Opacity",
            description: `todo%`,
            detail: "Background image opacity",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "Repeat",
            description: `todo`,
            detail: "Background image repeat",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "Size",
            description: `todo`,
            detail: "Background image size",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        })
    ],
    {
        ...options,
        title: `${item.value![0].toUpperCase() + item.value!.substring(1)} ${options.title}`,
        placeHolder: "Option"
    })
    .then(handle);
});