<div id="top" align="center">
    <br>
    <a href="https://github.com/KatsuteDev/Background#readme">
        <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/icon.png" width="100" height="100">
    </a>
    <h3>Background</h3>
    <h5>The most advanced background image extension for VSCode</h5>
    <br>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background">Visual Studio Marketplace</a>
    •
    <a href="https://github.com/KatsuteDev/background/releases">Releases</a>
    <br>
    <br>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img src="https://img.shields.io/visual-studio-marketplace/stars/katsute.code-background?style=flat-square&color=0098FF"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img src="https://img.shields.io/visual-studio-marketplace/i/katsute.code-background?style=flat-square&color=0098FF"></a>
</div>

<br>

The only background extension that supports [glob](https://github.com/isaacs/node-glob#glob-primer). Add multiple background images for the window, editors, sidebars, or the panel. No warnings about modified distributions.

![editor background](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif)

 - [📃 Installation](#-installation)
 - [✨ Features](#-features)
 - [💻 Commands](#-commands)
 - [⚙️ Configuration](#%EF%B8%8F-configuration)
 - [👨‍💻 Contributing](#-contributing)
 - [💼 License](#-license)

## 📃 Installation

> ⚠️ This extension is not compatible with remote distributions of VSCode (ex: Codespaces).

#### 🛒 VSCode Marketplace (recommended)

 1. Install from `katsute.code-background` in the extension marketplace in Visual Studio Code or install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=katsute.code-background).

#### 📦 Manual

 1. Install the latest release from the [releases](https://github.com/KatsuteDev/background/releases) tab.
 2. Open Visual Studio Code in the folder with the extension.
 3. Right click the extension and select **Install Extension VSIX**.

#### 🖼️ Usage

 1. Open the command palette and use `Background: Configuration` to open the configuration or press the **Background** tab in the status bar.
 2. Add background images using `Background: Select background image files` or by opening the configuration menu.
 3. Use `Background: Install` to install the background.

#### ⚠️ Bug: VSCode stopped working

This extension modifies an internal file to make backgrounds work, if VSCode stops working replace `%appdata%\Local\Programs\Microsoft VS Code\resources\app\out\bootstrap-window.js` with `bootstrap-window-backup.js`.

## ✨ Features

#### 🖼️ Multiple Backgrounds

Add background images for the whole window, editors, sidebars, or the panel. Images will be randomized whenever a window is opened.

![window background](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/window.gif)

![editor background](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif)

#### ⚙️ Configuration Menu

Access the configuration menu using from the command palette with `Background: Configuration` or by pressing the **Background** tab in the status bar.

![configuration menu](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/configuration.gif)

#### ✱ Glob Support

Add background images by file, by folder, or by [glob](https://github.com/isaacs/node-glob#glob-primer).

![file menu](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/glob.gif)

> ⚠️ **Please only use forward-slashes in glob expressions.**
>
> Though windows uses either `/` or `\` as its path separator, only `/` characters are used by this glob implementation.
> You must use forward-slashes only in glob expressions. Back-slashes will always be interpreted as escape characters, not path separators.
>
> ― [node-glob](https://github.com/isaacs/node-glob#windows)

## 💻 Commands

| Command | Description |
|---|---|
|`Background: Install`|Installs and enables the background.|
|`Background: Uninstall`|Uninstalls and disables the background.|
|`Background: Reload`|Randomizes the backgrounds. Background must already be installed.|
|`Background: Configuration`|Opens the configuration menu.|
|`Background: Select background image files`|Opens the background manager.|
|`Background: Set background image alignment`|Sets the background image alignment.|
|`Background: Set UI opacity`|Sets the UI opacity.|
|`Background: Set background image repeat`|Sets the background image repeat.|
|`Background: Set background image size`|Sets the background image size.|

## ⚙️ Configuration

Use the `Background: Configuration` command to access the configuration menu.

| Name | Type | Description |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|The list of files or globs to use for the window background image.|
|`background.editorBackgrounds`|`string[]`|The list of files or globs to use for editor background images.|
|`background.sidebarBackgrounds`|`string[]`|The list of files or globs to use for the sidebar background images.|
|`background.panelBackgrounds`|`string[]`|The list of files or globs to use for the panel background image.|
|`backgroundImageAlignment`|`enum`|The alignment of the background image.|
|`backgroundImageAlignmentValue`|`string`|If the background image alignment is set to `Manual`, this is the literal value for the `background-position` css property.|
|`background.opacity`|`number`|The UI opacity. Do not set this value too low, a low opacity might make it difficult to see the UI and more difficult to revert this change.|
|`background.backgroundImageRepeat`|`enum`|The background image repeat.|
|`background.backgroundImageSize`|`enum`|The background image size.|
|`background.backgroundImageSizeValue`|`string`|If the background image size is set to `Manual`, this is the literal value for the `background-size` css property.|

## 👨‍💻 Contributing

<!-- GitHub Copilot Disclaimer -->
<table>
    <img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-dark.png#gh-dark-mode-only" width="50"><img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-light.png#gh-light-mode-only" width="50">
    <p>GitHub Copilot is <b>strictly prohibited</b> on this repository.<br>Pulls using this will be rejected.</p>
</table>
<!-- GitHub Copilot Disclaimer -->

 - Found a bug or have a suggestion? Post it in [issues](https://github.com/KatsuteDev/background/issues).
 - Want to further expand our project? [Fork](https://github.com/KatsuteDev/background/fork) this repository and submit a [pull request](https://github.com/KatsuteDev/background/pulls).

### 💼 License

This extension is released under the [GNU General Public License (GPL) v2.0](https://github.com/KatsuteDev/background/main/LICENSE).
