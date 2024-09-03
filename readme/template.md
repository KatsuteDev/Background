<div id="top" align="center">
    <br>
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
|`{{ package.name }}: {{ package.contributes.command.install }}`|Installs and enables the background.|
|`{{ package.name }}: {{ package.contributes.command.uninstall }}`|Uninstalls and disables the background.|
|`{{ package.name }}: {{ package.contributes.command.reload }}`|Randomizes the backgrounds. Background must already be installed.|
|`{{ package.name }}: {{ package.contributes.command.configuration }}`|Opens the configuration menu.|
|`{{ package.name }}: {{ package.contributes.command.changelog }}`|Opens changelog.|

<div align="right"><a href="#top"><code>▲</code></a></div>

## {{ configuration._ }}

{{ configuration.description }}

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.windowBackgrounds`|`string[]`|{{ package.contributes.configuration.windowBackgrounds }}|
|`background.editorBackgrounds`|`string[]`|{{ package.contributes.configuration.editorBackgrounds }}|
|`background.sidebarBackgrounds`|`string[]`|{{ package.contributes.configuration.sidebarBackgrounds }}|
|`background.panelBackgrounds`|`string[]`|T{{ package.contributes.configuration.panelBackgrounds }}.|

<br>

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.backgroundAlignment`|`enum[4]`|{{ package.contributes.configuration.backgroundAlignment }}|
|`background.backgroundAlignmentValue`|`string[4]`|{{ package.contributes.configuration.backgroundAlignmentValue }}|
|`background.backgroundBlur`|`string[4]`|{{ package.contributes.configuration.backgroundBlur }}|
|`background.backgroundOpacity`|`number[4]`|{{ package.contributes.configuration.backgroundOpacity }}|
|`background.backgroundRepeat`|`enum[4]`|{{ package.contributes.configuration.backgroundRepeat }}|
|`background.backgroundSize`|`enum[4]`|{{ package.contributes.configuration.backgroundSize }}|
|`background.backgroundSizeValue`|`string[4]`|{{ package.contributes.configuration.backgroundSizeValue }}|
|`background.backgroundChangeTime`|`number[4]`|{{ package.contributes.configuration.backgroundChangeTime }}|

<br>

| {{ configuration.table_key }} | {{ configuration.table_type }} | {{ configuration.table_description }} |
|---|:-:|---|
|`background.autoInstall`|`boolean`|{{ package.contributes.configuration.autoInstall }}|
|`background.renderContentAboveBackground`|`boolean`|{{ package.contributes.configuration.renderContentAboveBackground }}|
|`background.useInvertedOpacity`|`boolean`|{{ package.contributes.configuration.useInvertedOpacity }}|
|`background.smoothImageRendering`|`boolean`|{{ package.contributes.configuration.smoothImageRendering }}|
|`background.settingScope`|`Global` \| `Workspace`|{{ package.contributes.configuration.settingScope }}|
|`background.CSS`|`string`|{{ package.contributes.configuration.CSS }}|

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