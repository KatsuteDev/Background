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

import { platform, release } from "os";
import { Uri, commands, env, version } from "vscode";

import { pkg } from "../extension/package";
import { UI, configuration, get } from "../extension/config";

import { count } from "../lib/glob";
import { appendS, appendIf, capitalize } from "../lib/string";
import { CommandQuickPickItem, quickPickItem, separator, showQuickPick } from "../lib/vscode"

import { show as fileMenu } from "./file";
import { show as alignMenu } from "./align";
import { show as blurMenu } from "./blur";
import { show as opacityMenu } from "./opacity";
import { show as repeatMenu } from "./repeat";
import { show as sizeMenu } from "./size";
import { show as timeMenu } from "./time";

const issueUrl: string = `https://github.com/KatsuteDev/Background/issues/new?template=bug.yml&os=${encodeURIComponent(`${platform()} ${release()}`)}&vs=${encodeURIComponent(version)}&version=${encodeURIComponent(pkg.version)}`;
const featureUrl: string = "https://github.com/KatsuteDev/Background/issues/new?template=feature.yml";

// main menu

export const show: () => void = () =>
    showQuickPick([
        // backgrounds
        getQuickPick("window", "window"),
        getQuickPick("editor", "multiple-windows"),
        getQuickPick("sidebar", "layout-sidebar-left"),
        getQuickPick("panel", "layout-panel"),
        // commands
        separator(),
        quickPickItem({
            alwaysShow: true,
            label: "$(check) Install",
            handle: () => commands.executeCommand("background.install")
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(close) Uninstall",
            handle: () => commands.executeCommand("background.uninstall")
        }),
        quickPickItem({
            alwaysShow: true,
            label: "$(refresh) Reload",
            handle: () => commands.executeCommand("background.reload")
        }),
        // pages
        separator(),
        quickPickItem({
            label: "$(output) Changelog",
            handle: () => commands.executeCommand("background.changelog")
        }),
        quickPickItem({
            label: "$(question) Help",
            handle: () => commands.executeCommand("background.help")
        }),
        quickPickItem({
            label: "$(add) Request a feature",
            handle: () => env.openExternal(Uri.parse(featureUrl))
        }),
        quickPickItem({
            label: "$(bug) Report an issue",
            // unfixed bug in vscode https://github.com/microsoft/vscode/issues/85930
            // @ts-ignore
            handle: () => env.openExternal(`${issueUrl}&settings=${encodeURIComponent("```json\n" + JSON.stringify(configuration(), null, 4) + "\n```")}`)
        })
    ], {
        title: "Background",
        matchOnDescription: true
    });

const getQuickPick: (ui: UI, icon: string) => CommandQuickPickItem = (ui: UI, icon: string) => {
    // description
    const backgrounds: string[] = get(`${ui}Backgrounds`);
    const description: string = `${appendS(backgrounds, "Glob")} (${appendS(count(backgrounds), "Background")})`;

    // detail
    let detail: string =
        `${get("backgroundAlignment", ui)} Alignment` + " • " +
        `${get("backgroundBlur",      ui)} Blur`      + " • " +
        `${get("backgroundOpacity",   ui)} Opacity`   + " • " +
        `${get("backgroundRepeat",    ui)} Repeat`    + " • " +
        `${get("backgroundSize",      ui)} Size`;

    // only include time if nonzero (enabled)
    const time: number = +get("backgroundChangeTime", ui);

    if(time > 0)
        detail += " • " + appendS(time, "second");

    // quick pick
    return quickPickItem({
        label: `$(${icon}) ${capitalize(ui)}`,
        description,
        detail,
        ui,
        handle: () => open(ui)
    });
}

// ui menu

export const open: (ui: UI) => void = (ui: UI) =>
    showQuickPick([
        quickPickItem({
            label: "$(file-media) File",
            description: `${appendS(get(`${ui}Backgrounds`), "Glob")} (${appendS(count(get(`${ui}Backgrounds`)), "Background")})`,
            detail: "Select background image files",
            ui,
            handle: () => fileMenu(ui)
        }),
        // options
        separator(),
        quickPickItem({
            label: "$(arrow-both) Alignment",
            description: `${appendIf(get("backgroundAlignment", ui), s => s === "Manual", ` (${get("backgroundAlignmentValue", ui)})`)}`,
            detail: "Background image alignment",
            ui,
            handle: () => alignMenu(ui)
        }),
        quickPickItem({
            label: "$(eye) Blur",
            description: `${get("backgroundBlur", ui)}`,
            detail: "Background image blur",
            ui,
            handle: () => blurMenu(ui)
        }),
        quickPickItem({
            label: "$(color-mode) Opacity",
            description: `${get("backgroundOpacity", ui)}`,
            detail: "Background image opacity",
            ui,
            handle: () => opacityMenu(ui)
        }),
        quickPickItem({
            label: "$(multiple-windows) Repeat",
            description: `${get("backgroundRepeat", ui)}`,
            detail: "Background image repeat",
            ui,
            handle: () => repeatMenu(ui)
        }),
        quickPickItem({
            label: "$(screen-full) Size",
            description: `${appendIf(get("backgroundSize", ui), s => s === "Manual", ` (${get("backgroundSizeValue", ui)})`)}`,
            detail: "Background image size",
            ui,
            handle: () => sizeMenu(ui)
        }),
        quickPickItem({
            label: "$(clock) Time",
            description: `${appendS(+get("backgroundChangeTime", ui), "second")}`,
            detail: "How often to change the background",
            ui,
            handle: () => timeMenu(ui)
        })
    ], {
        title: `${capitalize(ui)} Background`,
        matchOnDescription: true,
        matchOnDetail: true
    }, show);

// title

export const title: (title: string, ui?: UI) => string = (title: string, ui?: UI) =>
    (ui ? `${capitalize(ui)} ` : '') + `Background - ${title}`;