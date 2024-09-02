<div id="top" align="center">
    <a href="https://github.com/KatsuteDev/Background#readme">
        <img alt="logo" width="100" height="100" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/icon.png">
    </a>
    <h3>Background</h3>
    <h4>{{ header.description }}</h4>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="{{ header.img_rating }}" src="https://img.shields.io/visual-studio-marketplace/stars/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="{{ header.img_installs }}" src="https://img.shields.io/visual-studio-marketplace/i/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=katsute.code-background"><img alt="{{ header.img_downloads }}" src="https://img.shields.io/visual-studio-marketplace/d/katsute.code-background?style=for-the-badge&logo=visualstudiocode&labelColor=252526&color=0098FF"></a>
</div>

<br>

{{ description }}

<div align="center">
    <img alt="editor background" src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
</div>

## {{ installation._ }}

{{ installation.description }}

#### {{ installation.usage._ }}

{{ installation.usage.description }}

## {{ features._ }}

#### {{ features.multiple_backgrounds._ }}

{{ features.multiple_backgrounds.description }}

<div align="center">
    <h6>{{ features.multiple_backgrounds.img_window }}</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/window.gif">
    <br>
    <h6>{{ features.multiple_backgrounds.img_other }}</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/editor.gif">
    <br>
    <h6>{{ features.multiple_backgrounds.img_slideshow }}</h6>
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/transition.gif">
</div>

#### {{ features.configuration._ }}

{{ features.configuration.description }}

<div align="center">
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/configuration.gif">
</div>

#### {{ features.path._ }}

{{ features.path.description }}

<div align="center">
    <img src="https://raw.githubusercontent.com/KatsuteDev/Background/main/assets/glob.gif">
</div>

<div align="right"><a href="#top"><code>▲</code></a></div>

## {{ commands._ }}

| {{ commands.table_command }} | {{ commands.table_description }} |
|---|---|
|`Background: Install`|Installs and enables the background.|
|`Background: Uninstall`|Uninstalls and disables the background.|
|`Background: Reload`|Randomizes the backgrounds. Background must already be installed.|
|`Background: Configuration`|Opens the configuration menu.|
|`Background: Changelog`|Opens changelog.|

<div align="right"><a href="#top"><code>▲</code></a></div>

## {{ configuration._ }}

{{ configuration.description }}

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|The list of files or globs to use for the window background image.|
|`background.editorBackgrounds`|`string[]`|The list of files or globs to use for editor background images.|
|`background.sidebarBackgrounds`|`string[]`|The list of files or globs to use for the sidebar background images.|
|`background.panelBackgrounds`|`string[]`|The list of files or globs to use for the panel background image.|

<br>

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.backgroundAlignment`|`enum[4]`|The alignment of the background image.|
|`background.backgroundAlignmentValue`|`string[4]`|If the background image alignment is set to `Manual`, this is the literal value for the `background-position` css property. Only accepts a [css \<position>](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value).|
|`background.backgroundBlur`|`string[4]`|Background image blur. Only accepts a [css \<length>](https://developer.mozilla.org/en-US/docs/Web/CSS/length).|
|`background.backgroundOpacity`|`number[4]`|The UI opacity. 1 is fully visible and 0 is invisible.|
|`background.backgroundRepeat`|`enum[4]`|The background image repeat.|
|`background.backgroundSize`|`enum[4]`|The background image size.|
|`background.backgroundSizeValue`|`string[4]`|If the background image size is set to `Manual`, this is the literal value for the `background-size` css property. Only accepts a [css \<position>](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value).|
|`background.backgroundChangeTime`|`number[4]`|How long in seconds before the background should automatically change. Set to 0 to always use the same image.|

<br>

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.autoInstall`|`boolean`|Automatically installs backgrounds and reloads the window on startup if changes are detected or VSCode updates.<br>This option is disabled when you run the uninstall command.|
|`background.renderContentAboveBackground`|`boolean`|Render content like images, PDFs, and markdown previews above the background.|
|`background.useInvertedOpacity`|`boolean`|Use an inverted opacity, so 0 is fully visible and 1 is invisible.|
|`background.smoothImageRendering`|`boolean`|Use smooth image rendering rather than pixelated rendering when resizing images.|
|`background.settingScope`|`Global` \| `Workspace`|Where to save background settings. This does not automatically update the background on workspace change, you need to also turn on `autoInstall`.|
|`background.CSS`|`string`|Apply raw CSS to VSCode.|

<div align="right"><a href="#top"><code>▲</code></a></div>

## {{ environment._ }}

| {{ environment.variable }} | {{ environment.description }} |
|---|---|
|`${vscode:workspace}`|{{ environment.desc_workspace }}|
|`${user:home}`|{{ environment.desc_home }}|
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

{{ license }}