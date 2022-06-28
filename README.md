<div id="top" align="center">
    <h3>Background</h3>
    <h5>The ultimate background image extension for Visual Studio Code</h5>
    <br>
    Visual Studio Marketplace
    •
    <a href="https://github.com/KatsuteDev/background/releases">Releases</a>
</div>

// todo

 - [📃 Installation](#-installation)
 - [✨ Features](#-features)
 - [💻 Commands](#-commands)
 - [⚙️ Configuration](#-configuration)
 - [👨‍💻 Contributing](#-contributing)
 - [💼 License](#-license)

## 📃 Installation

> ⚠️ This extension is not compatible with remote distributions of VSCode (ex: Codespaces).

#### 🛒 VSCode Marketplace (recommended)

 1. Install from `katsute.background` in the extension marketplace in Visual Studio Code or install from the Visual Studio Marketplace.

#### 📦 Manual

 1. Install the latest release from the [releases](https://github.com/KatsuteDev/background/releases) tab.
 2. Open Visual Studio Code in the folder with the extension.
 3. Right click the extension and select **Install Extension VSIX**.

#### 🖼️ Usage

 1. Open the command palette and use `Background: Config` to open the configuration or press the **Background** tab in the status bar.
 2. Add background images using `Background: Select background images` or by opening the configuration menu.
 3. Use `Background: Install` to install the background.

## ✨ Features

#### ⚙️ Configuration Menu

// todo

#### 🖼️ Multiple background images

// todo

#### ✱ Glob Support

// todo

## 💻 Commands

| Command | Description |
|---|---|
|`Background: Install`|Installs and enables the background.|
|`Background: Uninstall`|Uninstalls and disables the background.|
|`Background: Config`|Opens the configuration menu.|
|`Background: Select background images`|Opens the background manager.|
|`Background: Set background image alignment`|Sets the background image alignment.|
|`Background: Set UI opacity`|Sets the UI opacity.|
|`Background: Set background image repeat`|Sets the background image repeat.|
|`Background: Set background image size`|Sets the background image size.|

## ⚙️ Configuration

| Name | Type | Description |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|The list of files or globs to use for the window background image.|
|`background.editorBackgrounds`|`string[]`|The list of files or globs to use for editor background images.|
|`background.sidebarBackgrounds`|`string[]`|The list of files or globs to use for the sidebar background images.|
|`background.panelBackgrounds`|`string[]`|The list of files or globs to use for the panel background image.|
|`backgroundImageAlignment`|`enum`|The alignment of the background image.|
|`backgroundImageAlignmentValue`|`string`|If the background image alignment is set to `Manual`, this is the literal value for the `background-position:` property.|
|`background.opacity`|`number`|The UI opacity.|
|`background.backgroundImageRepeat`|`enum`|The background image repeat.|
|`background.backgroundImageSize`|`enum`|The background image size.|
|`background.backgroundImageSizeValue`|`string`|If the background image size is set to `Manual`, this is the literal value for the `background-size` property.|

## 👨‍💻 Contributing

<!-- GitHub Copilot Disclaimer -->
<table>
    <img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-dark.png#gh-dark-mode-only" width="50"><img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-light.png#gh-light-mode-only" width="50">
    <p>GitHub Copilot is <b>strictly prohibited</b> on this repository.<br>Pulls using this will be rejected.</p>
</table>
<!-- GitHub Copilot Disclaimer -->

 - Found a bug? Post it in [issues](https://github.com/KatsuteDev/background/issues).
 - Want to further expand our project? [Fork](https://github.com/KatsuteDev/background/fork) this repository and submit a [pull request](https://github.com/KatsuteDev/background/pulls).

### 💼 License

This library is released under the [GNU General Public License (GPL) v2.0](https://github.com/KatsuteDev/background/blob/main/LICENSE).