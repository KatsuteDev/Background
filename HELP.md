## Common Issues

#### Legacy installation of Background has been detected

This warning may appear when migrating to v6, there are two options to migrate:

##### Rollback

 1. Right click the extension the extensions tab and choose **Install Specific Version...**
 2. Choose a version that is older than v6
 3. Click **Restart Extensions**
 4. Run the **Uninstall** command or use the button in the Background menu, this is **NOT** the extension uninstall, it is specifically the Background Uninstall that needs to run
 5. Wait for the uninstall to complete, on v5.0.3 this will show a failed notification, on older versions it will automatically reload
 6. Fully close and reopen VSCode
 7. You can now update to v6 and use this extension

##### Reinstall

 1. Reinstall [VSCode](https://code.visualstudio.com/download)

## &nbsp;

#### Code installation is corrupt

This warning may appear after running the uninstall command, reopen VSCode for this to disappear.

#### VSCode stopped working

This extension modifies an internal file to make backgrounds work, if VSCode stops working replace `%LocalAppData%\Programs\Microsoft VS Code\resources\app\out\vs\code\electron-browser\workbench\workbench.html` with `workbench-backup.html`.

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