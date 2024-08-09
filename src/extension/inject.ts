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

import { round } from "../lib/math";

import { get, getCSS } from "./config";
import { sanitizeCSS } from "../lib/css";
import { resolve } from "../lib/glob";

const identifier: string = "KatsuteDev/Background";

const partition: RegExp = new RegExp(`^\\/\\* ${identifier}-start \\*\\/$` +
                                     `[\\s\\S]*?` +
                                     `^\\/\\* ${identifier}-end \\*\\/$`, "gmi");

// extensions https://github.com/microsoft/vscode/blob/main/src/vs/platform/protocol/electron-main/protocolMainService.ts#L27

export const extensions: () => string[] = () => ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"];

// inject

export const inject: (content: string) => string = (content: string) =>
    clean(content) + '\n' +
    `/* ${identifier}-start */` + '\n' +
    minifyJavaScript(getJavaScript()) + '\n' +
    `/* ${identifier}-end */`;

export const clean: (content: string) => string = (s: string) =>
    s.replace(partition, "").trim();

// javascript

const getJavaScript: () => string = () => {
    const images: {[key: string]: string[]} = {
        window:  resolve(get("windowBackgrounds")),
        editor:  resolve(get("editorBackgrounds")),
        sidebar: resolve(get("sidebarBackgrounds")),
        panel:   resolve(get("panelBackgrounds"))
    };

    const after: boolean = get("renderContentAboveBackground");

    return `(() => {` +
// shared background css
`
const bk_global = document.createElement("style");
bk_global.id = "${identifier}-global";
bk_global.setAttribute("type", "text/css");

bk_global.appendChild(document.createTextNode(\`

    body[windowTransition="true"]${!after ? `::before` : ` > div[role=application] > div.monaco-grid-view::after`},
    body[editorTransition="true"] .split-view-view > .editor-group-container::after,
    body[sidebarTransition="true"] .split-view-view > .part.sidebar::after,
    body[sidebarTransition="true"] .split-view-view > .part.auxiliarybar::after,
    body[panelTransition="true"] .split-view-view > .part.panel::after {

        opacity: 0;

    }

    body${!after ? `::before` : ` > div[role=application] > div.monaco-grid-view::after`},
    .split-view-view > .editor-group-container::after,
    .split-view-view > .part.sidebar::after,
    .split-view-view > .part.auxiliarybar::after,
    .split-view-view > .part.panel::after {

        content: "";

        top: 0;

        width: 100%;
        height: 100%;

        ${!after ? `z-index: 1000;` : ''}

        position: absolute;

        pointer-events: none;

        transition: opacity 1s ease-in-out;

        image-rendering: ${get("smoothImageRendering") ? "auto" : "pixelated"};

    }
\`));
`
+ // background image cache
`
const windowBackgrounds = [${images.window.join(',')}];
const editorBackgrounds = [${images.editor.join(',')}];
const sidebarBackgrounds = [${images.sidebar.join(',')}];
const panelBackgrounds = [${images.panel.join(',')}];

const iWindowBackgrounds = [...Array(${images.window.length}).keys()];
const iEditorBackgrounds = [...Array(${images.editor.length}).keys()];
const iSidebarBackgrounds = [...Array(${images.sidebar.length}).keys()];
const iPanelBackgrounds = [...Array(${images.panel.length}).keys()];

const windowTime = ${get("backgroundChangeTime", {ui: "window"}) == 0 ? 0 : Math.max(round(get("backgroundChangeTime", {ui: "window"}), 2), 5)};
const editorTime = ${get("backgroundChangeTime", {ui: "editor"}) == 0 ? 0 : Math.max(round(get("backgroundChangeTime", {ui: "editor"}), 2), 5)};
const sidebarTime = ${get("backgroundChangeTime", {ui: "sidebar"}) == 0 ? 0 : Math.max(round(get("backgroundChangeTime", {ui: "sidebar"}), 2), 5)};
const panelTime = ${get("backgroundChangeTime", {ui: "panel"}) == 0 ? 0 : Math.max(round(get("backgroundChangeTime", {ui: "panel"}), 2), 5)};
`
+ // individual background css - window
`
if(windowBackgrounds.length > 0){
    bk_global.appendChild(document.createTextNode(\`
        body${!after ? `::before` : ` > div[role=application] > div.monaco-grid-view::after`} {

            background-position: ${getCSS("backgroundAlignment", "window")};
            background-repeat: ${getCSS("backgroundRepeat", "window")};
            background-size: ${getCSS("backgroundSize", "window")};

            opacity: ${round(1 - +getCSS("backgroundOpacity", "window"), 2)};

            filter: blur(${getCSS("backgroundBlur", "window")});

        }
    \`));
};
`
+ // individual background css - editor
`
if(editorBackgrounds.length > 0){
    bk_global.appendChild(document.createTextNode(\`
        .split-view-view > .editor-group-container::after {

            background-position: ${getCSS("backgroundAlignment", "editor")};
            background-repeat: ${getCSS("backgroundRepeat", "editor")};
            background-size: ${getCSS("backgroundSize", "editor")};

            opacity: ${round(1 - +getCSS("backgroundOpacity", "editor"), 2)};

            filter: blur(${getCSS("backgroundBlur", "editor")});

        }
    \`));
};
`
+ // individual background css - sidebar
`
if(sidebarBackgrounds.length > 0){
    bk_global.appendChild(document.createTextNode(\`
        .split-view-view > .part.sidebar::after,
        .split-view-view > .part.auxiliarybar::after {

            background-position: ${getCSS("backgroundAlignment", "sidebar")};
            background-repeat: ${getCSS("backgroundRepeat", "sidebar")};
            background-size: ${getCSS("backgroundSize", "sidebar")};

            opacity: ${round(1 - +getCSS("backgroundOpacity", "sidebar"), 2)};

            filter: blur(${getCSS("backgroundBlur", "sidebar")});

        }
    \`));
};
`
+ // individual background css - panel
`
if(panelBackgrounds.length > 0){
    bk_global.appendChild(document.createTextNode(\`
        .split-view-view > .part.panel::after {

            background-position: ${getCSS("backgroundAlignment", "panel")};
            background-repeat: ${getCSS("backgroundRepeat", "panel")};
            background-size: ${getCSS("backgroundSize", "panel")};

            opacity: ${round(1 - +getCSS("backgroundOpacity", "panel"), 2)};

            filter: blur(${getCSS("backgroundBlur", "panel")});

        }
    \`));
};
`
+ // notification overrides
`
bk_global.appendChild(document.createTextNode(\`
    div.notification-toast:has(> div.notifications-list-container > div.monaco-list[aria-label="Your Code installation appears to be corrupt. Please reinstall., notification"]),
    div.notification-toast:has(> div.notifications-list-container > div.monaco-list[aria-label="Your Code - Insiders installation appears to be corrupt. Please reinstall., notification"]) {

        display: none;

    }

    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"],
    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"]:hover {

        background-color: #0098FF !important;
        color: white !important;

    }

    div.monaco-list-row[aria-label$=", source: Background (Extension), notification"] ::before {

        color: white;

    }
\`));
`
+ // custom user css
`
bk_global.appendChild(document.createTextNode("${sanitizeCSS(get("CSS"))}"));
`
+ // background image - window
`
const bk_window_image = document.createElement("style");
bk_window_image.id = "${identifier}-window-images";
bk_window_image.setAttribute("type", "text/css");

const setWindowBackground = () => {
    while(bk_window_image.firstChild){
        bk_window_image.removeChild(bk_window_image.firstChild);
    };

    if(windowBackgrounds.length > 0){
        shuffle(iWindowBackgrounds);

        bk_window_image.appendChild(document.createTextNode(\`
            body${!after ? `::before` : ` > div[role=application] > div.monaco-grid-view::after`} {

                background-image: url("\${windowBackgrounds[iWindowBackgrounds[0]].replace(/"/g, \`\\\\"\`)}");

            }
        \`));
    };
};
`
+ // background image - editor
`
const bk_editor_image = document.createElement("style");
bk_editor_image.id = "${identifier}-editor-images";
bk_editor_image.setAttribute("type", "text/css");

const setEditorBackground = () => {
    while(bk_editor_image.firstChild){
        bk_editor_image.removeChild(bk_editor_image.firstChild);
    };

    if(editorBackgrounds.length > 0){
        const len = Math.min(editorBackgrounds.length, 10);

        shuffle(iEditorBackgrounds);

        let buf = '';
        for(let i = 0; i < len; i++){
            buf += \`
                .part.editor :not(.split-view-container) .split-view-container > .split-view-view:nth-child(\${len}n+\${i+1}) > .editor-group-container::after {
                    background-image: url("\${editorBackgrounds[iEditorBackgrounds[i]].replace(/"/g, \`\\\\"\`)}");
                }
            \`;
        };
        bk_editor_image.appendChild(document.createTextNode(buf));
    };
};
`
+ // background image - sidebar
`
const bk_sidebar_image = document.createElement("style");
bk_sidebar_image.id = "${identifier}-sidebar-images";
bk_sidebar_image.setAttribute("type", "text/css");

const setSidebarBackground = () => {
    while(bk_sidebar_image.firstChild){
        bk_sidebar_image.removeChild(bk_sidebar_image.firstChild);
    };

    if(sidebarBackgrounds.length > 0){
        shuffle(iSidebarBackgrounds);

        bk_sidebar_image.appendChild(document.createTextNode(\`
            .split-view-view > .part.sidebar::after {

                background-image: url("\${sidebarBackgrounds[iSidebarBackgrounds[0]].replace(/"/g, \`\\\\"\`)}");

            }
            .split-view-view > .part.auxiliarybar::after {

                background-image: url("\${(sidebarBackgrounds[iSidebarBackgrounds[1]] ?? sidebarBackgrounds[iSidebarBackgrounds[0]]).replace(/"/g, \`\\\\"\`)}");

            }
        \`));
    };
};
`
+ // background image - panel
`
const bk_panel_image = document.createElement("style");
bk_panel_image.id = "${identifier}-panel-images";
bk_panel_image.setAttribute("type", "text/css");

const setPanelBackground = () => {
    while(bk_panel_image.firstChild){
        bk_panel_image.removeChild(bk_panel_image.firstChild);
    };

    if(panelBackgrounds.length > 0){
        shuffle(iPanelBackgrounds);

        bk_panel_image.appendChild(document.createTextNode(\`
            .split-view-view > .part.panel::after {

                background-image: url("\${panelBackgrounds[iPanelBackgrounds[0]].replace(/"/g, \`\\\\"\`)}");

            }
        \`));
    };
};
`
+ // random
`
const shuffle = (arr) => {
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
};
`
+ // install
`
document.getElementsByTagName("head")[0].appendChild(bk_global);
document.getElementsByTagName("head")[0].appendChild(bk_window_image);
document.getElementsByTagName("head")[0].appendChild(bk_editor_image);
document.getElementsByTagName("head")[0].appendChild(bk_sidebar_image);
document.getElementsByTagName("head")[0].appendChild(bk_panel_image);

for(const arr of [iWindowBackgrounds, iEditorBackgrounds, iSidebarBackgrounds, iPanelBackgrounds]){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
};

setWindowBackground();
setEditorBackground();
setSidebarBackground();
setPanelBackground();

if(windowTime > 0 && iWindowBackgrounds.length > 1){
    setInterval(() => {
        document.body.setAttribute("windowTransition", true);
        setTimeout(() => {
            setWindowBackground();
            document.body.setAttribute("windowTransition", false);
        }, 1 * 1000);
    }, windowTime * 1000);
};
if(editorTime > 0 && iEditorBackgrounds.length > 1){
    setInterval(() => {
        document.body.setAttribute("editorTransition", true);
        setTimeout(() => {
            setEditorBackground();
            document.body.setAttribute("editorTransition", false);
        }, 1 * 1000);
    }, editorTime * 1000);
};
if(sidebarTime > 0 && iSidebarBackgrounds.length > 1){
    setInterval(() => {
        document.body.setAttribute("sidebarTransition", true);
        setTimeout(() => {
            setSidebarBackground();
            document.body.setAttribute("sidebarTransition", false);
        }, 1 * 1000);
    }, sidebarTime * 1000);
};
if(panelTime > 0 && iPanelBackgrounds.length > 1){
    setInterval(() => {
        document.body.setAttribute("panelTransition", true);
        setTimeout(() => {
            setPanelBackground();
            document.body.setAttribute("panelTransition", false);
        }, 1 * 1000);
    }, panelTime * 1000);
};
` +
            `})();`;
}

const minifyJavaScript: (javascript: string) => string = (javascript: string) =>
    javascript
        .trim()
        .replace(/\/\/ .*$/gm, '')     // remove line // comments
        .replace(/\/\*.*?\*\//gms, '') // remove multiline /* */ comments
        .replace(/^ +/gm, '')          // remove trailing space
        .replace(/\r?\n/gm, '')        // remove newlines