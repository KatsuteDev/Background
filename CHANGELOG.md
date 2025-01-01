# Changelog

## 3.1.0

### New Features

* Add env var `${vscode:user}` for `Code/User` directory [#436](https://github.com/KatsuteDev/Background/pull/436) ([@Katsute](https://github.com/Katsute))

  On desktop this is the `Code/User` directory.

  On portable this is the `data/user-data/User` directory.

### Dependencies

* Bump esbuild from 0.23.1 to 0.24.0 [#415](https://github.com/KatsuteDev/Background/pull/415) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.5.0 to 22.7.4 [#417](https://github.com/KatsuteDev/Background/pull/417) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 3.1.0 to 3.1.1 [#418](https://github.com/KatsuteDev/Background/pull/418) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.93.0 to 1.94.0 [#419](https://github.com/KatsuteDev/Background/pull/419) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 3.1.1 to 3.2.0 [#422](https://github.com/KatsuteDev/Background/pull/422) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.7.4 to 22.8.1 [#425](https://github.com/KatsuteDev/Background/pull/425) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 3.2.0 to 3.2.1 [#424](https://github.com/KatsuteDev/Background/pull/424) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.94.0 to 1.95.0 [#427](https://github.com/KatsuteDev/Background/pull/427) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.8.1 to 22.9.0 [#428](https://github.com/KatsuteDev/Background/pull/428) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.6.3 to 5.7.2 [#430](https://github.com/KatsuteDev/Background/pull/430) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.9.0 to 22.10.1 [#431](https://github.com/KatsuteDev/Background/pull/431) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.95.0 to 1.96.0 [#434](https://github.com/KatsuteDev/Background/pull/434) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.24.0 to 0.24.2 [#437](https://github.com/KatsuteDev/Background/pull/437) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`3.0.2...3.1.0`](https://github.com/KatsuteDev/Background/compare/3.0.2...3.1.0)

## 3.0.2

### Fixes

* Fix extension compatibility with VSCode 1.94 for Mac [#410](https://github.com/KatsuteDev/Background/pull/410) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`3.0.1...3.0.2`](https://github.com/KatsuteDev/Background/compare/3.0.1...3.0.2)

## 3.0.1

### Fixes

* Fix extension compatibility with VSCode 1.94 [#409](https://github.com/KatsuteDev/Background/pull/409) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump @types/node from 22.4.0 to 22.5.0 [#395](https://github.com/KatsuteDev/Background/pull/395) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.92.0 to 1.93.0 [#406](https://github.com/KatsuteDev/Background/pull/406) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 3.0.0 to 3.1.0 [#407](https://github.com/KatsuteDev/Background/pull/407) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`3.0.0...3.0.1`](https://github.com/KatsuteDev/Background/compare/3.0.0...3.0.1)

## 3.0.0

### Breaking Change

* Invert opacity setting [#379](https://github.com/KatsuteDev/Background/pull/379) ([@Katsute](https://github.com/Katsute))

  Going forward, to achieve parity with other background extensions, the opacity calculation will be switched from 0 visible and 1 invisible to 1 visible and 0 invisible.

  To use the old behavior, use the **useInvertedOpacity** option. If you already have an opacity set, the inverted opacity setting will automatically be turned on.

### Removed

* Remove `useWindowOptionsForAllBackgrounds` option [#374](https://github.com/KatsuteDev/Background/pull/374) ([@Katsute](https://github.com/Katsute))

### New Features

* Add options selector to menu [#375](https://github.com/KatsuteDev/Background/pull/375) ([@Katsute](https://github.com/Katsute))
* Add option to save settings per-workspace [#383](https://github.com/KatsuteDev/Background/pull/383) ([@Katsute](https://github.com/Katsute))

  This updates the configuration menu to allow workspace specific settings; to use workspace, toggle the **Setting Scope** in the more options menu. Does not automatically update the background on workspace switch, the **Auto Install** option needs to also be turned on.

  Setting this to workspace will always use the workspace configuration, it does not fallback to global settings.

### Dependencies

* Bump esbuild from 0.21.4 to 0.21.5 [#348](https://github.com/KatsuteDev/Background/pull/348) ([@dependabot](https://github.com/dependabot))
* Bump @azure/identity from 4.2.0 to 4.2.1 [#349](https://github.com/KatsuteDev/Background/pull/349) ([@dependabot](https://github.com/dependabot))
* Bump @azure/msal-node from 2.9.1 to 2.9.2 [#350](https://github.com/KatsuteDev/Background/pull/350) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.4.5 to 5.5.2 [#355](https://github.com/KatsuteDev/Background/pull/355) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.27.0 to 2.29.0 [#353](https://github.com/KatsuteDev/Background/pull/353) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.4.1 to 10.4.2 [#354](https://github.com/KatsuteDev/Background/pull/354) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 5.0.7 to 5.0.8 [#363](https://github.com/KatsuteDev/Background/pull/363) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.4.0 to 2.4.1 [#358](https://github.com/KatsuteDev/Background/pull/358) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.5.2 to 5.5.3 [#359](https://github.com/KatsuteDev/Background/pull/359) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.4.2 to 10.4.3 [#361](https://github.com/KatsuteDev/Background/pull/361) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.90.0 to 1.91.0 [#360](https://github.com/KatsuteDev/Background/pull/360) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.21.5 to 0.23.0 [#362](https://github.com/KatsuteDev/Background/pull/362) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.29.0 to 2.30.0 [#365](https://github.com/KatsuteDev/Background/pull/365) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 5.0.8 to 6.0.1 [#366](https://github.com/KatsuteDev/Background/pull/366) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.4.3 to 11.0.0 [#364](https://github.com/KatsuteDev/Background/pull/364) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.30.0 to 2.31.1 [#369](https://github.com/KatsuteDev/Background/pull/369) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.5.3 to 5.5.4 [#377](https://github.com/KatsuteDev/Background/pull/377) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.14.0 to 22.0.0 [#376](https://github.com/KatsuteDev/Background/pull/376) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.0.0 to 22.1.0 [#384](https://github.com/KatsuteDev/Background/pull/384) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.91.0 to 1.92.0 [#385](https://github.com/KatsuteDev/Background/pull/385) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.1.0 to 22.2.0 [#388](https://github.com/KatsuteDev/Background/pull/388) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.2.0 to 22.3.0 [#389](https://github.com/KatsuteDev/Background/pull/389) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.31.1 to 2.32.0 [#390](https://github.com/KatsuteDev/Background/pull/390) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 22.3.0 to 22.4.0 [#391](https://github.com/KatsuteDev/Background/pull/391) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.23.0 to 0.23.1 [#393](https://github.com/KatsuteDev/Background/pull/393) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.32.0 to 3.0.0 [#392](https://github.com/KatsuteDev/Background/pull/392) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.10.4...3.0.0`](https://github.com/KatsuteDev/Background/compare/2.10.4...3.0.0)

## 2.10.4

### Fixes

* Fix checksum calculation [#347](https://github.com/KatsuteDev/Background/pull/347) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.10.3...2.10.4`](https://github.com/KatsuteDev/Background/compare/2.10.3...2.10.4)

## 2.10.3

### New Features

* Add button to feature request form [#341](https://github.com/KatsuteDev/Background/pull/341) ([@Katsute](https://github.com/Katsute))

### Optimizations

* Optimize extension filtering [#340](https://github.com/KatsuteDev/Background/pull/340) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump typescript from 5.4.3 to 5.4.4 [#311](https://github.com/KatsuteDev/Background/pull/311) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.87.0 to 1.88.0 [#312](https://github.com/KatsuteDev/Background/pull/312) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.24.0 to 2.25.0 [#315](https://github.com/KatsuteDev/Background/pull/315) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.4.4 to 5.4.5 [#316](https://github.com/KatsuteDev/Background/pull/316) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.25.0 to 2.26.0 [#318](https://github.com/KatsuteDev/Background/pull/318) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.88.0 to 1.89.0 [#322](https://github.com/KatsuteDev/Background/pull/322) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.26.0 to 2.26.1 [#321](https://github.com/KatsuteDev/Background/pull/321) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 5.0.5 to 5.0.7 [#328](https://github.com/KatsuteDev/Background/pull/328) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.20.2 to 0.21.2 [#326](https://github.com/KatsuteDev/Background/pull/326) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.12 to 10.3.15 [#327](https://github.com/KatsuteDev/Background/pull/327) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.21.2 to 0.21.3 [#330](https://github.com/KatsuteDev/Background/pull/330) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.9 to 2.3.10 [#329](https://github.com/KatsuteDev/Background/pull/329) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.21.3 to 0.21.4 [#333](https://github.com/KatsuteDev/Background/pull/333) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.15 to 10.4.1 [#332](https://github.com/KatsuteDev/Background/pull/332) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.10 to 2.4.0 [#342](https://github.com/KatsuteDev/Background/pull/342) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.12.2 to 20.14.0 [#343](https://github.com/KatsuteDev/Background/pull/343) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.89.0 to 1.90.0 [#345](https://github.com/KatsuteDev/Background/pull/345) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.26.1 to 2.27.0 [#344](https://github.com/KatsuteDev/Background/pull/344) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.10.2...2.10.3`](https://github.com/KatsuteDev/Background/compare/2.10.2...2.10.3)

## 2.10.2

### Fixes

* Fix bug report button when using CSS [#309](https://github.com/KatsuteDev/Background/pull/309) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump typescript from 5.4.2 to 5.4.3 [#305](https://github.com/KatsuteDev/Background/pull/305) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.11.2 to 20.12.2 [#308](https://github.com/KatsuteDev/Background/pull/308) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.10 to 10.3.12 [#307](https://github.com/KatsuteDev/Background/pull/307) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.10.1...2.10.2`](https://github.com/KatsuteDev/Background/compare/2.10.1...2.10.2)

## 2.10.1

### Fixes

* Fix paths and URLs using quotes [#304](https://github.com/KatsuteDev/Background/pull/304) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump esbuild from 0.20.0 to 0.20.1 [#296](https://github.com/KatsuteDev/Background/pull/296) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.23.0 to 2.24.0 [#297](https://github.com/KatsuteDev/Background/pull/297) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.86.0 to 1.87.0 [#299](https://github.com/KatsuteDev/Background/pull/299) ([@dependabot](https://github.com/dependabot))
* Bump tmp from 0.2.1 to 0.2.3 [#298](https://github.com/KatsuteDev/Background/pull/298) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.3.3 to 5.4.2 [#301](https://github.com/KatsuteDev/Background/pull/301) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.20.1 to 0.20.2 [#302](https://github.com/KatsuteDev/Background/pull/302) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.10.0...2.10.1`](https://github.com/KatsuteDev/Background/compare/2.10.0...2.10.1)

## 2.10.0

### New Features

* Add option to install on startup [#290](https://github.com/KatsuteDev/Background/pull/290) ([@Katsute](https://github.com/Katsute))

### Optimizations

* Installation improvements [#293](https://github.com/KatsuteDev/Background/pull/293) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump esbuild from 0.19.12 to 0.20.0 [#286](https://github.com/KatsuteDev/Background/pull/286) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.8 to 2.3.9 [#288](https://github.com/KatsuteDev/Background/pull/288) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.22.0 to 2.23.0 [#287](https://github.com/KatsuteDev/Background/pull/287) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.85.0 to 1.86.0 [#291](https://github.com/KatsuteDev/Background/pull/291) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.9.4...2.10.0`](https://github.com/KatsuteDev/Background/compare/2.9.4...2.10.0)

## 2.9.4

### Fixes

* Fix extension activation [#285](https://github.com/KatsuteDev/Background/pull/285) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.9.3...2.9.4`](https://github.com/KatsuteDev/Background/compare/2.9.3...2.9.4)

## 2.9.3

### Dependencies

* Bump esbuild from 0.19.11 to 0.19.12 [#283](https://github.com/KatsuteDev/Background/pull/283) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.9.2...2.9.3`](https://github.com/KatsuteDev/Background/compare/2.9.2...2.9.3)

## 2.9.2

### Deprecated

* `useWindowOptionsForAllBackgrounds` is now deprecated [#274](https://github.com/KatsuteDev/Background/pull/274) ([@Katsute](https://github.com/Katsute))

  This options is being removed to reduce confusion from new users, please set options for backgrounds separately.

### Fixes

* Fix using multiple environment variables [#281](https://github.com/KatsuteDev/Background/pull/281) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump esbuild from 0.19.9 to 0.19.10 [#270](https://github.com/KatsuteDev/Background/pull/270) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.19.10 to 0.19.11 [#272](https://github.com/KatsuteDev/Background/pull/272) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.10.0 to 20.11.2 [#279](https://github.com/KatsuteDev/Background/pull/279) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.9.1...2.9.2`](https://github.com/KatsuteDev/Background/compare/2.9.1...2.9.2)

## 2.9.1

### Fixes

* Fix add file and add directory not escaping glob symbols [#268](https://github.com/KatsuteDev/Background/pull/268) ([@Katsute](https://github.com/Katsute))
* Fix glob escape characters not working [#269](https://github.com/KatsuteDev/Background/pull/269) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump esbuild from 0.19.8 to 0.19.9 [#266](https://github.com/KatsuteDev/Background/pull/266) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.9.0...2.9.1`](https://github.com/KatsuteDev/Background/compare/2.9.0...2.9.1)

## 2.9.0

### New Features

* Show manual alignment/size value in menu [#260](https://github.com/KatsuteDev/Background/pull/260) ([@Katsute](https://github.com/Katsute))
* Show error message when using extension on snap installation [#261](https://github.com/KatsuteDev/Background/pull/261) ([@Katsute](https://github.com/Katsute))

### Optimizations

* Internal optimizations [#244](https://github.com/KatsuteDev/Background/pull/244) ([@Katsute](https://github.com/Katsute))

  * Remove unnecessary reload on sudo init
  * Fix sudo potentially failing on Windows

### Dependencies

* Bump @types/tmp from 0.2.5 to 0.2.6 [#246](https://github.com/KatsuteDev/Background/pull/246) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.84.0 to 1.84.1 [#247](https://github.com/KatsuteDev/Background/pull/247) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.19.5 to 0.19.6 [#252](https://github.com/KatsuteDev/Background/pull/252) ([@dependabot](https://github.com/dependabot))
* Bump actions/github-script from 6 to 7 [#251](https://github.com/KatsuteDev/Background/pull/251) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.9.0 to 20.10.0 [#256](https://github.com/KatsuteDev/Background/pull/256) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.6 to 2.3.8 [#253](https://github.com/KatsuteDev/Background/pull/253) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.2.2 to 5.3.2 [#255](https://github.com/KatsuteDev/Background/pull/255) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.19.6 to 0.19.8 [#257](https://github.com/KatsuteDev/Background/pull/257) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.84.1 to 1.84.2 [#254](https://github.com/KatsuteDev/Background/pull/254) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.3.2 to 5.3.3 [#265](https://github.com/KatsuteDev/Background/pull/265) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.84.2 to 1.85.0 [#264](https://github.com/KatsuteDev/Background/pull/264) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.8.3...2.9.0`](https://github.com/KatsuteDev/Background/compare/2.8.3...2.9.0)

## 2.8.3

### Fixes

* Fix timer not working for floating windows [#242](https://github.com/KatsuteDev/Background/pull/242) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.8.2...2.8.3`](https://github.com/KatsuteDev/Background/compare/2.8.2...2.8.3)

## 2.8.2

### New Features

* Add help page [#225](https://github.com/KatsuteDev/Background/pull/225) ([@Katsute](https://github.com/Katsute))

### Fixes

* Fix editor background for floating windows [#237](https://github.com/KatsuteDev/Background/pull/237) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump esbuild from 0.19.4 to 0.19.5 [#228](https://github.com/KatsuteDev/Background/pull/228) ([@dependabot](https://github.com/dependabot))
* Bump @types/tmp from 0.2.4 to 0.2.5 [#229](https://github.com/KatsuteDev/Background/pull/229) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.83.0 to 1.83.1 [#230](https://github.com/KatsuteDev/Background/pull/230) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.5 to 2.3.6 [#234](https://github.com/KatsuteDev/Background/pull/234) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.21.1 to 2.22.0 [#233](https://github.com/KatsuteDev/Background/pull/233) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.83.1 to 1.84.0 [#238](https://github.com/KatsuteDev/Background/pull/238) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.8.1...2.8.2`](https://github.com/KatsuteDev/Background/compare/2.8.1...2.8.2)

## 2.8.1

### New Features

* Autofill bug reports [#222](https://github.com/KatsuteDev/Background/pull/222) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump @types/node from 20.5.4 to 20.6.0 [#207](https://github.com/KatsuteDev/Background/pull/207) ([@dependabot](https://github.com/dependabot))
* Bump @types/tmp from 0.2.3 to 0.2.4 [#208](https://github.com/KatsuteDev/Background/pull/208) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.19.2 to 0.19.3 [#209](https://github.com/KatsuteDev/Background/pull/209) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.4 to 10.3.7 [#210](https://github.com/KatsuteDev/Background/pull/210) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.6.0 to 20.8.0 [#216](https://github.com/KatsuteDev/Background/pull/216) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 5.0.1 to 5.0.5 [#214](https://github.com/KatsuteDev/Background/pull/214) ([@dependabot](https://github.com/dependabot))
* Bump esbuild from 0.19.3 to 0.19.4 [#213](https://github.com/KatsuteDev/Background/pull/213) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.7 to 10.3.10 [#212](https://github.com/KatsuteDev/Background/pull/212) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.21.0 to 2.21.1 [#215](https://github.com/KatsuteDev/Background/pull/215) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.4 to 2.3.5 [#217](https://github.com/KatsuteDev/Background/pull/217) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.82.0 to 1.83.0 [#218](https://github.com/KatsuteDev/Background/pull/218) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.8.0...2.8.1`](https://github.com/KatsuteDev/Background/compare/2.8.0...2.8.1)

## 2.8.0

### New Features

* Add support for environmental variables [#196](https://github.com/KatsuteDev/Background/pull/196) ([@Katsute](https://github.com/Katsute))

  * `${vscode:workspace}` → The current project folder
  * `${user:home}` → The user's home directory
  * `${...}` → Any system environment variable

### Fixes

* Fix VSCode product icon escape on file and delete menus [#200](https://github.com/KatsuteDev/Background/pull/200) ([@Katsute](https://github.com/Katsute))

### Optimizations

* Bundle extension with ESBuild [#195](https://github.com/KatsuteDev/Background/pull/195) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump @types/node from 20.4.9 to 20.5.0 [#187](https://github.com/KatsuteDev/Background/pull/187) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.20.1 to 2.21.0 [#204](https://github.com/KatsuteDev/Background/pull/204) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.3 to 10.3.4 [#203](https://github.com/KatsuteDev/Background/pull/203) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.81.0 to 1.82.0 [#206](https://github.com/KatsuteDev/Background/pull/206) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.7.0...2.8.0`](https://github.com/KatsuteDev/Background/compare/2.7.0...2.8.0)

## 2.7.0

### New Features

* Add menu to delete backgrounds [#185](https://github.com/KatsuteDev/Background/pull/185) ([@Katsute](https://github.com/Katsute))

  ![delete](https://github.com/KatsuteDev/Background/assets/58778985/31bf6a03-f495-451e-ba9c-375953075e2e)
* Add back button to some menus [#186](https://github.com/KatsuteDev/Background/pull/186) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump @vscode/vsce from 2.20.0 to 2.20.1 [#180](https://github.com/KatsuteDev/Background/pull/180) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/test-electron from 2.3.3 to 2.3.4 [#182](https://github.com/KatsuteDev/Background/pull/182) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.80.0 to 1.81.0 [#181](https://github.com/KatsuteDev/Background/pull/181) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.6.1...2.7.0`](https://github.com/KatsuteDev/Background/compare/2.6.1...2.7.0)

## 2.6.1

* Update README

**Full Changelog**: [`2.6.0...2.6.1`](https://github.com/KatsuteDev/Background/compare/2.6.0...2.6.1)

## 2.6.0

### New Features

* Add extension API [#176](https://github.com/KatsuteDev/Background/pull/176) ([@Katsute](https://github.com/Katsute))

  Extension developers can now access the background API for this extension, refer to [API](https://github.com/KatsuteDev/Background#-api) for details.

**Full Changelog**: [`2.5.8...2.6.0`](https://github.com/KatsuteDev/Background/compare/2.5.8...2.6.0)

## 2.5.8

### Dependencies

* Bump @types/vscode from 1.78.0 to 1.78.1 [#161](https://github.com/KatsuteDev/Background/pull/161) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.0.4 to 5.1.3 [#162](https://github.com/KatsuteDev/Background/pull/162) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.2.3 to 20.3.0 [#163](https://github.com/KatsuteDev/Background/pull/163) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.2.6 to 10.2.7 [#165](https://github.com/KatsuteDev/Background/pull/165) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.78.1 to 1.79.0 [#164](https://github.com/KatsuteDev/Background/pull/164) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.79.0 to 1.79.1 [#166](https://github.com/KatsuteDev/Background/pull/166) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.2.7 to 10.3.0 [#167](https://github.com/KatsuteDev/Background/pull/167) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.1.3 to 5.1.6 [#170](https://github.com/KatsuteDev/Background/pull/170) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.0 to 10.3.1 [#169](https://github.com/KatsuteDev/Background/pull/169) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 20.3.0 to 20.4.1 [#172](https://github.com/KatsuteDev/Background/pull/172) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.3.1 to 10.3.3 [#173](https://github.com/KatsuteDev/Background/pull/173) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.79.1 to 1.80.0 [#171](https://github.com/KatsuteDev/Background/pull/171) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.7...2.5.8`](https://github.com/KatsuteDev/Background/compare/2.5.7...2.5.8)

## 2.5.7

* Adjust settings descriptions

### Dependencies

* Bump glob from 10.2.3 to 10.2.4 [#158](https://github.com/KatsuteDev/Background/pull/158) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.2.5 to 10.2.6 [#160](https://github.com/KatsuteDev/Background/pull/160) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.6...2.5.7`](https://github.com/KatsuteDev/Background/compare/2.5.6...2.5.7)

## 2.5.6

### Fixes

* Fix add multiple files not working [#154](https://github.com/KatsuteDev/Background/pull/154) ([@Katsute](https://github.com/Katsute))
* Fix background sometimes not loading [#156](https://github.com/KatsuteDev/Background/pull/156) ([@Katsute](https://github.com/Katsute))

### Dependencies

* Bump @types/node from 18.15.11 to 18.16.0 [#147](https://github.com/KatsuteDev/Background/pull/147) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.2.1 to 10.2.2 [#146](https://github.com/KatsuteDev/Background/pull/146) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 18.16.0 to 20.1.0 [#149](https://github.com/KatsuteDev/Background/pull/149) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.77.0 to 1.78.0 [#150](https://github.com/KatsuteDev/Background/pull/150) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.5...2.5.6`](https://github.com/KatsuteDev/Background/compare/2.5.5...2.5.6)

## 2.5.5

### 📘 Dependencies

* Bump typescript from 5.0.2 to 5.0.3 [#134](https://github.com/KatsuteDev/Background/pull/134) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.76.0 to 1.77.0 [#133](https://github.com/KatsuteDev/Background/pull/133) ([@dependabot](https://github.com/dependabot))
* Bump glob from 9.3.2 to 9.3.4 [#135](https://github.com/KatsuteDev/Background/pull/135) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 5.0.3 to 5.0.4 [#136](https://github.com/KatsuteDev/Background/pull/136) ([@dependabot](https://github.com/dependabot))
* Bump glob from 9.3.4 to 10.0.0 [#139](https://github.com/KatsuteDev/Background/pull/139) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 4.4.1 to 5.0.0 [#138](https://github.com/KatsuteDev/Background/pull/138) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.18.0 to 2.19.0 [#141](https://github.com/KatsuteDev/Background/pull/141) ([@dependabot](https://github.com/dependabot))
* Bump glob from 10.0.0 to 10.1.0 [#142](https://github.com/KatsuteDev/Background/pull/142) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.4...2.5.5`](https://github.com/KatsuteDev/Background/compare/2.5.4...2.5.5)

## 2.5.4

### 🐞 Bug Fixes

* Fix copy on linux [#132](https://github.com/KatsuteDev/Background/pull/132) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.5.3...2.5.4`](https://github.com/KatsuteDev/Background/compare/2.5.3...2.5.4)

## 2.5.3

### ⭐ New Features

* Add button to report issues [#127](https://github.com/KatsuteDev/Background/pull/127) ([@Katsute](https://github.com/Katsute))
* Update settings descriptions [#129](https://github.com/KatsuteDev/Background/pull/129) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump typescript from 4.9.5 to 5.0.2 [#122](https://github.com/KatsuteDev/Background/pull/122) ([@dependabot](https://github.com/dependabot))
* Bump glob from 9.3.0 to 9.3.1 [#124](https://github.com/KatsuteDev/Background/pull/124) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 4.4.0 to 4.4.1 [#126](https://github.com/KatsuteDev/Background/pull/126) ([@dependabot](https://github.com/dependabot))
* Bump glob from 9.3.1 to 9.3.2 [#125](https://github.com/KatsuteDev/Background/pull/125) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.2...2.5.3`](https://github.com/KatsuteDev/Background/compare/2.5.2...2.5.3)

## 2.5.2

### 🐞 Bug Fixes

* Fix backup write not prompting for admin permission [#119](https://github.com/KatsuteDev/Background/pull/119) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump rimraf from 4.3.0 to 4.3.1 [#115](https://github.com/KatsuteDev/Background/pull/115) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 4.3.1 to 4.4.0 [#116](https://github.com/KatsuteDev/Background/pull/116) ([@dependabot](https://github.com/dependabot))
* Bump @types/node from 18.14.6 to 18.15.0 [#117](https://github.com/KatsuteDev/Background/pull/117) ([@dependabot](https://github.com/dependabot))
* Bump glob from 9.2.1 to 9.3.0 [#121](https://github.com/KatsuteDev/Background/pull/121) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.5.1...2.5.2`](https://github.com/KatsuteDev/Background/compare/2.5.1...2.5.2)

## 2.5.1

### 🐞 Bug Fixes

* Fix write sometimes not prompting for admin permission [#114](https://github.com/KatsuteDev/Background/pull/114) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump @vscode/vsce from 2.17.0 to 2.18.0 [#105](https://github.com/KatsuteDev/Background/pull/105) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.75.1 to 1.76.0 [#110](https://github.com/KatsuteDev/Background/pull/110) ([@dependabot](https://github.com/dependabot))
* Bump rimraf from 3.0.2 to 4.3.0 [#112](https://github.com/KatsuteDev/Background/pull/112) ([@dependabot](https://github.com/dependabot))
* Update to glob v9 [#107](https://github.com/KatsuteDev/Background/pull/107) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.5.0...2.5.1`](https://github.com/KatsuteDev/Background/compare/2.5.0...2.5.1)

## 2.5.0

### ⭐ New Features

* Prompt for admin permission if write is denied [#97](https://github.com/KatsuteDev/Background/pull/97) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump @types/node from 18.13.0 to 18.14.0 [#102](https://github.com/KatsuteDev/Background/pull/102) ([@dependabot](https://github.com/dependabot))
* Bump @types/glob from 8.0.1 to 8.1.0 [#104](https://github.com/KatsuteDev/Background/pull/104) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.4.2...2.5.0`](https://github.com/KatsuteDev/Background/compare/2.4.2...2.5.0)

## 2.4.2

### 🐞 Bug Fixes

* Fix file URI on linux and mac [#101](https://github.com/KatsuteDev/Background/pull/101) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump @types/node from 18.11.19 to 18.13.0 [#98](https://github.com/KatsuteDev/Background/pull/98) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.75.0 to 1.75.1 [#99](https://github.com/KatsuteDev/Background/pull/99) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.4.1...2.4.2`](https://github.com/KatsuteDev/Background/compare/2.4.1...2.4.2)

## 2.4.1

### ⭐ New Features

* Add hint for path modification and removal [#96](https://github.com/KatsuteDev/Background/pull/96) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump glob from 8.0.3 to 8.1.0 [#87](https://github.com/KatsuteDev/Background/pull/87) ([@dependabot](https://github.com/dependabot))
* Bump @types/glob from 8.0.0 to 8.0.1 [#88](https://github.com/KatsuteDev/Background/pull/88) ([@dependabot](https://github.com/dependabot))
* Bump @vscode/vsce from 2.16.0 to 2.17.0 [#89](https://github.com/KatsuteDev/Background/pull/89) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 4.9.4 to 4.9.5 [#91](https://github.com/KatsuteDev/Background/pull/91) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.74.0 to 1.75.0 [#95](https://github.com/KatsuteDev/Background/pull/95) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.4.0...2.4.1`](https://github.com/KatsuteDev/Background/compare/2.4.0...2.4.1)

## 2.4.0

### ⭐ New Features

* Add option for `image-rendering` [#79](https://github.com/KatsuteDev/Background/pull/79) ([@Katsute](https://github.com/Katsute))

### 🔧 Optimizations

* Use `vscode-file://vscode-app/` for local images instead of base64 [#78](https://github.com/KatsuteDev/Background/pull/78) ([@Katsute](https://github.com/Katsute))
  This should fix a performance issue caused by using a large amount of images.
* Revert duplicate background fix for horizontal and vertical editor splits [#82](https://github.com/KatsuteDev/Background/pull/82) ([@Katsute](https://github.com/Katsute))
  This should fix a performance issue caused by [`2.3.0`](https://github.com/KatsuteDev/Background/releases/tag/2.3.0) when using editor images.

### 🐞 Bug Fixes

* Hide corrupt notification when using VSCode Insiders [#80](https://github.com/KatsuteDev/Background/pull/80) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump vsce from 2.14.0 to 2.15.0 [#72](https://github.com/KatsuteDev/Background/pull/72) ([@dependabot](https://github.com/dependabot))
* Bump typescript from 4.9.3 to 4.9.4 [#73](https://github.com/KatsuteDev/Background/pull/73) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.3.1...2.4.0`](https://github.com/KatsuteDev/Background/compare/2.3.1...2.4.0)

## 2.3.1

### 🔧 Optimizations

* Optimize glob [#71](https://github.com/KatsuteDev/Background/pull/71) ([@Katsute](https://github.com/Katsute))

**Full Changelog**: [`2.3.0...2.3.1`](https://github.com/KatsuteDev/Background/compare/2.3.0...2.3.1)

## 2.3.0

### ⭐ New Features

* Show how many files match a glob [#65](https://github.com/KatsuteDev/Background/pull/65) ([@Katsute](https://github.com/Katsute))
  To reduce confusion about missing backgrounds, the configuration menu will now show how many files match your globs.

  ![glob](https://user-images.githubusercontent.com/58778985/203458542-ce6456fe-a9dc-4030-b84a-051a5a71d197.gif)

### 🐞 Bug Fixes

* Fix install notification sometimes not installing backgrounds [#66](https://github.com/KatsuteDev/Background/pull/66) ([@Katsute](https://github.com/Katsute))
  * Fix rare bug where install notification would be sent before settings actually update
  * Fix multiple install notifications when selecting multiple files at once
* Override file permissions if file is read only [#64](https://github.com/KatsuteDev/Background/pull/64) ([@Katsute](https://github.com/Katsute))
  Fixes issue where backgrounds would not install when VSCode was readonly.
* Fix repeating backgrounds [#67](https://github.com/KatsuteDev/Background/pull/67) ([@Katsute](https://github.com/Katsute))
* Fix duplicate backgrounds when using horizontal and vertical editor split [#69](https://github.com/KatsuteDev/Background/pull/69) ([@Katsute](https://github.com/Katsute))

### 📘 Dependencies

* Bump typescript from 4.8.4 to 4.9.3 [#61](https://github.com/KatsuteDev/Background/pull/61) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.73.0 to 1.73.1 [#60](https://github.com/KatsuteDev/Background/pull/60) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.2.0...2.3.0`](https://github.com/KatsuteDev/Background/compare/2.2.0...2.3.0)

## 2.2.0

### ⭐ New Features

* Render content above backgrounds [#57](https://github.com/KatsuteDev/Background/pull/57) ([@Katsute](https://github.com/Katsute))

  Add new option `background.renderContentAboveBackground` to render content above backgrounds

### 📘 Dependencies

* Bump vsce from 2.13.0 to 2.14.0 [#58](https://github.com/KatsuteDev/Background/pull/58) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.1.0...2.2.0`](https://github.com/KatsuteDev/Background/compare/2.1.0...2.2.0)

## 2.1.0

### ⭐ New Features

* Add ability to transition between multiple images [#49](https://github.com/KatsuteDev/Background/pull/49) ([@Katsute](https://github.com/Katsute))
  Use this new feature by changing the `background.backgroundChangeTime` field or using the new **Time** option in the configuration menu.

  _(below image is a compressed gif, your transitions will look cleaner than this)_

  ![multiple images](https://github.com/KatsuteDev/Background/raw/e84db0493ce947761fa1bd0f45adc2e0f09668cc/assets/transition.gif)

### 📘 Dependencies

* Bump vsce from 2.11.0 to 2.12.0 [#50](https://github.com/KatsuteDev/Background/pull/50) ([@dependabot](https://github.com/dependabot))
* Bump vsce from 2.12.0 to 2.13.0 [#51](https://github.com/KatsuteDev/Background/pull/51) ([@dependabot](https://github.com/dependabot))
* Bump @types/vscode from 1.72.0 to 1.73.0 [#56](https://github.com/KatsuteDev/Background/pull/56) ([@dependabot](https://github.com/dependabot))

**Full Changelog**: [`2.0.2...2.1.0`](https://github.com/KatsuteDev/Background/compare/2.0.2...2.1.0)

## 2.0.2

### 🐞 Bug Fixes

* Remove warning about installation being corrupt [#48](https://github.com/KatsuteDev/Background/pull/48) ([@Katsute](https://github.com/Katsute))
  * Hide corrupt notification on install
  * Automatically fix checksums after relaunch

**Full Changelog**: [`2.0.1...2.0.2`](https://github.com/KatsuteDev/Background/compare/2.0.1...2.0.2)

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