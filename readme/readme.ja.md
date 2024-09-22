<div align="right"><a href="https://github.com/KatsuteDev/Background#readme">English</a> | <a href="https://github.com/KatsuteDev/Background/blob/main/readme/readme.ja.md">日本語</a></div>

<div id="top" align="center">
    <br>
    <a href="https://github.com/KatsuteDev/Background#readme">
        <img alt="logo" width="100" height="100" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/icon.png">
    </a>
    <h3>Background</h3>
    <h4>The most advanced background image extension for VSCode</h4>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="Rating" src="https://img.shields.io/visual-studio-marketplace/stars/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF&label=Rating"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="Installs" src="https://img.shields.io/visual-studio-marketplace/i/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF&label=Installs"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="Downloads" src="https://img.shields.io/visual-studio-marketplace/d/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF&label=Downloads"></a>
</div>

<br>

Add multiple background images for the window, editors, sidebars, or the panel. Load backgrounds from file, [glob](https://github.com/isaacs/node-glob#glob-primer), or URL. Transition between multiple background images.

<div align="center">
    <img alt="editor background" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
</div>

## Installation

 - Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=katsute.code-background).
 - Install directly from VSCode using the id [`katsute.code-background`](https://marketplace.visualstudio.com/items?itemName=katsute.code-background).

#### Usage

 1. Type `Background: Configuration` in the command pallette or press the **Background** tab in the statusbar.
 2. Select where you want to add a background (Window, Editor, Sidebar, Panel).
 3. Add backgrounds and change how it should be displayed.
 4. Use `Background: Install` or press the install button.

## Features

#### Multiple Backgrounds

Add background images for the whole window, editors, sidebars, or the panel. Transition between multiple background images.

<div align="center">
    <h6>Full Window</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/window.gif">
    <br>
    <h6>Editor, Sidebar, and Terminal</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
    <br>
    <h6>Slideshow</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/transition.gif">
</div>

#### Configuration Menu

Type `Background: Configuration` in the command pallette or press the **Background** tab in the statusbar to access the configuration menu.

<div align="center">
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/configuration.gif">
</div>

#### Glob, URL, and Environment Variable Support

Add background images by file, folder, [glob](https://github.com/isaacs/node-glob#glob-primer), or URL.

> ⚠️ **Use only `/` for directories**
>
> [node-glob](https://github.com/isaacs/node-glob#windows) only accepts `/` as path separators, `\` is reserved for escape characters.

<div align="center">
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/glob.gif">
</div>

<div align="right"><a href="#top"><code>▲</code></a></div>

## Commands

| Command | Description |
|---|---|
|`Background: Install`|Installs and enables the background.|
|`Background: Uninstall`|Uninstalls and disables the background.|
|`Background: Reload`|Randomizes the backgrounds. Background must already be installed.|
|`Background: Configuration`|Opens the configuration menu.|
|`Background: Changelog`|Opens changelog.|

<div align="right"><a href="#top"><code>▲</code></a></div>

## Configuration

Use the `Background: Configuration` command to access the configuration menu.

Background properties are saved as arrays so you can have different options for different UI elements.

The order settings are saved in is:

 0. Window
 1. Editor
 2. Sidebar
 3. Panel

| Key | Type | Description |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|The list of files, globs, or URLs to pull background images from.<br><br>* Use only `/` for directories, `\` is reserved for escape characters.<br><br>* Image URLs must be served over HTTPS.|
|`background.editorBackgrounds`|`string[]`|The list of files, globs, or URLs to pull background images from.<br><br>* Use only `/` for directories, `\` is reserved for escape characters.<br><br>* Image URLs must be served over HTTPS.|
|`background.sidebarBackgrounds`|`string[]`|The list of files, globs, or URLs to pull background images from.<br><br>* Use only `/` for directories, `\` is reserved for escape characters.<br><br>* Image URLs must be served over HTTPS.|
|`background.panelBackgrounds`|`string[]`|TThe list of files, globs, or URLs to pull background images from.<br><br>* Use only `/` for directories, `\` is reserved for escape characters.<br><br>* Image URLs must be served over HTTPS..|

<br>

| Key | Type | Description |
|---|:-:|---|
|`background.backgroundAlignment`|`enum[4]`|The background image alignment.|
|`background.backgroundAlignmentValue`|`string[4]`|If `backgroundAlignment` is set to `Manual`, this is the literal value for the `background-position` css property.|
|`background.backgroundBlur`|`string[4]`|The background image blur amount in css units.|
|`background.backgroundOpacity`|`number[4]`|The background opacity, make sure this number is not to high, otherwise you may not be able to see the UI and revert this change.<br><br>`1` is fully visible and `0` is invisible. If `useInvertedOpacity` is true, this logic is inverted.|
|`background.backgroundRepeat`|`enum[4]`|The background image repeat.|
|`background.backgroundSize`|`enum[4]`|The background image size.|
|`background.backgroundSizeValue`|`string[4]`|If `windowBackgroundSize` is set to `Manual`, this is the literal value for the `background-size` css property.|
|`background.backgroundChangeTime`|`number[4]`|How long in seconds before the background should automatically change.<br><br>Set to `0` to always use the same image.|

<br>

| Key | Type | Description |
|---|:-:|---|
|`background.autoInstall`|`boolean`|Automatically installs backgrounds and reloads the window on startup if changes are detected or VSCode updates.<br><br>This option is disabled when you run the uninstall command.|
|`background.renderContentAboveBackground`|`boolean`|Render content like images, PDFs, and markdown previews above the background.|
|`background.useInvertedOpacity`|`boolean`|Use an inverted opacity, so 0 is fully visible and 1 is invisible.|
|`background.smoothImageRendering`|`boolean`|Use smooth image rendering rather than pixelated rendering when resizing images.|
|`background.settingScope`|`Global` \| `Workspace`|Where to save and load background settings.<br><br>This does not automatically update the background on workspace change, you need to also turn on `autoInstall`.|
|`background.CSS`|`string`|Apply raw CSS to VSCode.|

<div align="right"><a href="#top"><code>▲</code></a></div>

## Environment Variables

| Variable | Description |
|---|---|
|`${vscode:workspace}`|Current VSCode project folder|
|`${user:home}`|Current user's home directory|
|`${...}`|System environment variable|

<div align="right"><a href="#top"><code>▲</code></a></div>

## API

Add this extension to your `package.json`.

```json
{
    ...
    "extensionDependencies": [
        "katsute.code-background"
    ]
    ...
}
```

Access the api by using:

```js
const background = vscode.extensions.getExtension("katsute.code-background").exports;
```

 * `install(): void`

   Runs the `Background: Install` command.
 * `uninstall(): void`

   Runs the `Background: Uninstall` command.
 * `reload(): void`

   Runs the `Background: Reload` command.
 * `get(ui): string[]?`
   * `ui` : Background to get from; either `window`, `editor`, `sidebar`, `panel`.

   Returns an array of globs for the specified background.
 * `add(ui, glob): Promise<boolean>`
   * `ui` : Background to add to; either `window`, `editor`, `sidebar`, `panel`.
   * `glob`: Glob to add.

   Returns true if successful.
 * `replace(ui, old, glob): Promise<boolean>`
   * `ui` : Background to replace from; either `window`, `editor`, `sidebar`, `panel`.
   * `old`: Glob to replace.
   * `glob`: Updated glob.

   Returns true if successful.
 * `remove(ui, glob): Promise<boolean>`
   * `ui` : Background to remove from; either `window`, `editor`, `sidebar`, `panel`.
   * `glob`: Glob to remove.

   Returns true if successful.

<div align="right"><a href="#top"><code>▲</code></a></div>

## &nbsp;

This extension is released under the [GNU General Public License (GPL) v2.0](https://github.com/KatsuteDev/Background/blob/main/LICENSE).