<div id="top" align="center">
    <br>
    <a href="https://github.com/KatsuteDev/Background#readme">
        <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/icon.png" width="100" height="100">
    </a>
    <h3>Background</h3>
    <h5>The most advanced background image extension for VSCode</h5>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background">Visual Studio Marketplace</a>
    •
    <a href="https://github.com/KatsuteDev/Background/issues/new?template=bug.yml">Report an Issue</a>
    •
    <a href="https://github.com/KatsuteDev/Background/issues/new?template=feature.yml">Suggest a Feature</a>
    <br>
    <br>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img src="https://img.shields.io/visual-studio-marketplace/stars/katsute.code-background?style=flat-square&color=0098FF"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img src="https://img.shields.io/visual-studio-marketplace/i/katsute.code-background?style=flat-square&color=0098FF"></a>
</div>

<br>

Add multiple background images for the window, editors, sidebars, or the panel. Load backgrounds from file, [glob](https://github.com/isaacs/node-glob#glob-primer), or URL. Transition between multiple background images.

<div align="center">
    <img alt="editor background" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
</div>

## 📃 Installation

 - Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=katsute.code-background).
 - Install directly from VSCode using the id [`katsute.code-background`](https://marketplace.visualstudio.com/items?itemName=katsute.code-background).

#### 🖼️ Usage

 1. Type `Background: Configuration` in the command pallette or press the **Background** tab in the statusbar.
 2. Select where you want to add a background (Window, Editor, Sidebar, Panel).
 3. Add backgrounds and change how it should be displayed.
 4. Use `Background: Install` or press the install button.

## ✨ Features

#### 🖼️ Multiple Backgrounds

Add background images for the whole window, editors, sidebars, or the panel. Transition between multiple background images.

<div align="center">
    <img alt="window background" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/window.gif">
    <br><br>
    <img alt="editor background" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
    <br><br>
    <img alt="multiple backgrounds" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/transition.gif">
</div>

#### ⚙️ Configuration Menu

Type `Background: Configuration` in the command pallette or press the **Background** tab in the statusbar to access the configuration menu.

<div align="center">
    <img alt="configuration menu" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/configuration.gif">
</div>

#### ✱ Glob and URL Support

Add background images by file, folder, [glob](https://github.com/isaacs/node-glob#glob-primer), or URL.

<div align="center">
    <img alt="file menu" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/glob.gif">
</div>

> ⚠️ **Only use forward-slashes in glob expressions.**
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

## ⚙️ Configuration

Use the `Background: Configuration` command to access the configuration menu.

Background properties are saved as arrays so you can have different options for different UI elements.

The order settings are saved in is:

 0. Window
 1. Editor
 2. Sidebar
 3. Panel

| Background | Type | Description |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|The list of files or globs to use for the window background image.|
|`background.editorBackgrounds`|`string[]`|The list of files or globs to use for editor background images.|
|`background.sidebarBackgrounds`|`string[]`|The list of files or globs to use for the sidebar background images.|
|`background.panelBackgrounds`|`string[]`|The list of files or globs to use for the panel background image.|

<br>

| Property | Type | Description |
|---|:-:|---|
|`background.backgroundAlignment`|`enum[4]`|The alignment of the background image.|
|`background.backgroundAlignmentValue`|`string[4]`|If the background image alignment is set to `Manual`, this is the literal value for the `background-position` css property. Only accepts a [css \<position>](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value).|
|`background.backgroundBlur`|`string[4]`|Background image blur. Only accepts a [css \<length>](https://developer.mozilla.org/en-US/docs/Web/CSS/length).|
|`background.backgroundOpacity`|`number[4]`|The UI opacity. 0 is fully visible and 1 is invisible.|
|`background.backgroundRepeat`|`enum[4]`|The background image repeat.|
|`background.backgroundSize`|`enum[4]`|The background image size.|
|`background.backgroundSizeValue`|`string[4]`|If the background image size is set to `Manual`, this is the literal value for the `background-size` css property. Only accepts a [css \<position>](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value).|
|`background.backgroundChangeTime`|`number[4]`|How long in seconds before the background should automatically change. Set to 0 to always use the same image.|

<br>

| Advanced | Type | Description |
|---|:-:|---|
|`background.useWindowOptionsForAllBackgrounds`|`boolean`|If enabled, all backgrounds will use the options set for the windows background. You still need to add background images separately.|
|`background.renderContentAboveBackground`|`boolean`|If enabled, content like images, pdfs, and markdown previews will render above the background.|
|`background.CSS`|`string`|**Advanced Users Only.** Apply raw CSS to VSCode.|

## ⚠️ Known Issues

#### ⚠️ Installation appears to be corrupt

This extension modifies an internal file to make backgrounds work, as a result VSCode will warn about the installation being corrupt.

This warning will be removed after you relaunch VSCode, a reload is not enough. Alternatively select **Don't Show Again** to suppress this warning.

![corrupt](https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/corrupt.gif)

#### ⚠️ VSCode stopped working

This extension modifies an internal file to make backgrounds work, if VSCode stops working replace `%LocalAppData%\Programs\Microsoft VS Code\resources\app\out\vs\workbench\workbench.desktop.main.js` with `workbench.desktop.main-backup.js`.

This extension also modifies `%LocalAppData%\Programs\Microsoft VS Code\resources\app\product.json`, replace with `product-backup.json` if VSCode stops working.

#### ⚠️ Doesn't work on WSL

As described in [#27](https://github.com/KatsuteDev/Background/issues/27#issuecomment-1233610914), you can not change the background while running this extension in a remote WSL window. You can however still use custom backgrounds by installing and making changes in the main VSCode window, then opening a remote WSL window.

## 👨‍💻 Contributing

<!-- GitHub Copilot Disclaimer -->
<table>
    <img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-dark.png#gh-dark-mode-only" width="50">
    <img alt="GitHub Copilot" align="left" src="https://raw.githubusercontent.com/KatsuteDev/.github/main/profile/copilot-light.png#gh-light-mode-only" width="50">
    <p>GitHub Copilot is <b>strictly prohibited</b> on this repository.<br>Pulls using this will be rejected.</p>
</table>
<!-- GitHub Copilot Disclaimer -->

 - Found a bug or have a suggestion? Post it in [issues](https://github.com/KatsuteDev/Background/issues).
 - Want to further expand our project? [Fork](https://github.com/KatsuteDev/Background/fork) this repository and submit a [pull request](https://github.com/KatsuteDev/Background/pulls).

### 💼 License

This extension is released under the [GNU General Public License (GPL) v2.0](https://github.com/KatsuteDev/Background/blob/main/LICENSE).