## Common Issues

#### Code installation is corrupt

This warning may appear after running the uninstall command, reopen VSCode for this to disappear.

#### VSCode stopped working

This extension modifies an internal file to make backgrounds work, if VSCode stops working replace `%LocalAppData%\Programs\Microsoft VS Code\resources\app\out\vs\workbench\workbench.desktop.main.js` with `workbench.desktop.main-backup.js`.

This extension also modifies `%LocalAppData%\Programs\Microsoft VS Code\resources\app\product.json`, replace with `product-backup.json` if VSCode stops working.

#### Disable/uninstall doesn't remove background

Backgrounds are not removed on extension disable or uninstall, you must run the <kbd>Background: Uninstall</kbd> command to remove backgrounds.

#### Background doesn't work on window buttons (minimize/maximize/close)

These buttons are controlled by the system and not VSCode; and can not be modified by this extension.

## &nbsp;

#### (Windows) Doesn't work on WSL

Backgrounds can not be changed while running this extension in a remote WSL window. Backgrounds must be changed by making changes in the main VSCode window, then opening the remote WSL window.

#### (Mac) read-only file system

This extension doesn't natively support Mac, write permissions must be granted to the VSCode application:

1. Move `Visual Studio Code.app` from `Download` to the `Application` directory.
2. Run `sudo chmod -R a+rwx '/Applications/Visual Studio Code.app'` to grant write permissions.

#### (Linux) snap: read-only file system

Applications installed using [snap](https://snapcraft.io/) are inherently read-only, install VSCode using [deb](https://code.visualstudio.com/download) or [rpm](https://code.visualstudio.com/download).