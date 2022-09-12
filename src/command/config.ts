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
            description: s(get("windowBackgrounds"), "Background"),
            detail: `${get("windowBackgroundAlignment")} Alignment • ${get("windowBackgroundBlur")} Blur • ${get("windowBackgroundOpacity")} Opacity • ${get("windowBackgroundRepeat")} Repeat • ${get("windowBackgroundSize")} Size`,
            onSelect: menu,
            value: "window"
        }),
        quickPickItem({
            label: "$(multiple-windows) Editor",
            description: s(get("editorBackgrounds"), "Background"),
            detail: `${get("editorBackgroundAlignment")} Alignment • ${get("editorBackgroundBlur")} Blur • ${get("editorBackgroundOpacity")} Opacity • ${get("editorBackgroundRepeat")} Repeat • ${get("editorBackgroundSize")} Size`,
            onSelect: menu,
            value: "editor"
        }),
        quickPickItem({
            label: "$(layout-sidebar-left) Sidebar",
            description: s(get("sidebarBackgrounds"), "Background"),
            detail: `${get("sidebarBackgroundAlignment")} Alignment • ${get("sidebarBackgroundBlur")} Blur • ${get("sidebarBackgroundOpacity")} Opacity • ${get("sidebarBackgroundRepeat")} Repeat • ${get("sidebarBackgroundSize")} Size`,
            onSelect: menu,
            value: "sidebar"
        }),
        quickPickItem({
            label: "$(layout-panel) Panel",
            description: s(get("panelBackgrounds"), "Background"),
            detail: `${get("panelBackgroundAlignment")} Alignment • ${get("panelBackgroundBlur")} Blur • ${get("panelBackgroundOpacity")} Opacity • ${get("panelBackgroundRepeat")} Repeat • ${get("panelBackgroundSize")} Size`,
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

    const value: string = item.value!;

    vscode.window.showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: s(get(`${value}Backgrounds`), "Background"),
            detail: "Select background image files",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${get(`${value}BackgroundAlignment`)}`,
            detail: "Background image alignment",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${get(`${value}BackgroundBlur`)}`,
            detail: "Background image blur",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${get(`${value}BackgroundOpacity`)}`,
            detail: "Background image opacity",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${get(`${value}BackgroundRepeat`)}`,
            detail: "Background image repeat",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${get(`${value}BackgroundSize`)}`,
            detail: "Background image size",
            onSelect: (item?: CommandQuickPickItem) => new Promise(() => {

            })
        })
    ],
    {
        ...options,
        title: `${item.value![0].toUpperCase() + item.value!.substring(1)} ${options.title}`,
    })
    .then(handle);
});

//

const s: (arr: any[], s: string) => string = (arr: any[], s: string) => `${arr.length} ${s}${arr.length != 1 ? 's' : ''}`;