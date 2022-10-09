# Changelog

## 2.0.1

* Fix README [`b5469c3`](https://github.com/KatsuteDev/Background/commit/b5469c307b6734b56ac5cee1213254f11932c75f) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.0.0...2.0.1`](https://github.com/KatsuteDev/Background/compare/2.0.0...2.0.1)

## 2.0.0

### ⚠️ Breaking Change

* Fix VSCode 1.72 [#45](https://github.com/KatsuteDev/Background/pull/45) ([@Katsute](https://github.com/Katsute))
  Installing backgrounds using this extension now causes VSCode to warn about the installation being corrupt 😭. Select **Don't Show Again** to suppress this message.

  ![corrupt](https://user-images.githubusercontent.com/58778985/194679747-3f0d1d28-f389-4c7e-9bfb-4580c17daf01.gif)

### ⭐ New Features

* Use separate options depending on background type [#36](https://github.com/KatsuteDev/Background/pull/36) ([@Katsute](https://github.com/Katsute))
  ![configuration](https://raw.githubusercontent.com/KatsuteDev/Background/be20d9ec47892bdacf76c5b049b59a0279cf283c/assets/configuration.gif)

  * New configuration menu
  * Removed property specific commands
  * Background options are now separated based on UI type
  * Settings are now saved as arrays rather than objects. Values are in order of
    1. Window
    2. Editor
    3. Sidebar
    4. Panel
  * Fixed some validation issues

  If you do not like this separation of options you can restore the old behavior by using the new option `useWindowOptionsForAllBackgrounds` which will use the window options for all backgrounds. You still need to add background images separately.

  ![old](https://raw.githubusercontent.com/KatsuteDev/Background/be20d9ec47892bdacf76c5b049b59a0279cf283c/assets/old.gif)
* Add command to view changelog [#42](https://github.com/KatsuteDev/Background/pull/42) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump typescript from 4.8.3 to 4.8.4 [#38](https://github.com/KatsuteDev/Background/pull/38) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`1.3.0...2.0.0`](https://github.com/KatsuteDev/Background/compare/1.3.0...2.0.0)

## 1.3.0

### ⭐ New Features

* Accept background images from URLs [#35](https://github.com/KatsuteDev/Background/pull/35) ([@Katsute](https://github.com/Katsute))
  * Image URLs must be served over HTTPS
  * File URLs (`file://`) do not work, use `Add File` or `Add Folder` option

**Full Changelog**: https://github.com/KatsuteDev/Background/compare/1.2.0...1.3.0

## 1.2.0

### ⭐ New Features

* Add background blur https://github.com/KatsuteDev/Background/pull/28 (@Katsute)

  Set background image blur using `Background: Set background image blur`

### 📘 Dependencies

* Bump vsce from 2.10.1 to 2.10.2 https://github.com/KatsuteDev/Background/pull/20 (@dependabot)
* Bump typescript from 4.7.4 to 4.8.2 https://github.com/KatsuteDev/Background/pull/22 (@dependabot)
* Bump vsce from 2.10.2 to 2.11.0 https://github.com/KatsuteDev/Background/pull/23 (@dependabot)
* Bump @types/glob from 7.2.0 to 8.0.0 https://github.com/KatsuteDev/Background/pull/26 (@dependabot)
* Bump @types/vscode from 1.70.0 to 1.71.0 https://github.com/KatsuteDev/Background/pull/29 (@dependabot)

**Full Changelog**: https://github.com/KatsuteDev/Background/compare/1.1.0...1.2.0

## 1.1.0

### ⭐ New Features

* Add ability to use custom CSS https://github.com/KatsuteDev/Background/pull/14 (@Katsute)

  Added `background.CSS` setting to apply custom CSS to VSCode. Only available in the settings window.

  _Experimental feature!_ Use at your own risk.

### 📘 Dependencies

* Bump @types/vscode from 1.68.1 to 1.69.0 https://github.com/KatsuteDev/Background/pull/3 (@dependabot)
* Bump vsce from 2.9.2 to 2.9.3 https://github.com/KatsuteDev/Background/pull/5 (@dependabot)
* Bump vsce from 2.9.3 to 2.10.0 https://github.com/KatsuteDev/Background/pull/6 (@dependabot)
* Bump @types/node from 18.0.1 to 18.6.1 https://github.com/KatsuteDev/Background/pull/7 (@dependabot)
* Bump @types/vscode from 1.69.0 to 1.69.1 https://github.com/KatsuteDev/Background/pull/13 (@dependabot)
* Bump @types/node from 18.6.1 to 18.7.1 https://github.com/KatsuteDev/Background/pull/16 (@dependabot)

**Full Changelog**: https://github.com/KatsuteDev/Background/compare/1.0.0...1.1.0

## 1.0.0

Initial Release

**Full Changelog**: https://github.com/KatsuteDev/Background/commits/1.0.0