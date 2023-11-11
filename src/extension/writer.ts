/*
 * Copyright (C) 2023 Katsute <https://github.com/Katsute>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import { fileSync } from "tmp";
import { window } from "vscode";
import { exec } from "@vscode/sudo-prompt";

import { PathOrFileDescriptor, readFileSync, writeFileSync } from "fs";

import { reload } from "../lib/vscode";
import { copyCommand, generateChecksum } from "../lib/file";

import { clean, inject } from "./inject"

export const install: (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor) => void = (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor) => {
    write(workbench, product, inject(readFileSync(workbench, "utf-8")));
}

export const uninstall: (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor) => void = (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor) => {
    write(workbench, product, clean(readFileSync(workbench, "utf-8")));
}

// write

const workbenchChecksum: RegExp = /(?<=^\s*"vs\/workbench\/workbench\.desktop\.main\.js\": \").*(?=\",\s*$)/gm;

const write: (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor, content: string) => void = (workbench: PathOrFileDescriptor, product: PathOrFileDescriptor, content: string) => {
    const pJson: string = readFileSync(product, "utf-8").replace(workbenchChecksum, generateChecksum(content));

    try{ // write changes
        writeFileSync(workbench, content, "utf-8");
        writeFileSync(product, pJson, "utf-8");
        reload();
    }catch(error: any){
        window.showWarningMessage(
            "Failed to write changes, run command as administrator?",
            {
                detail: `The Background extension does not have permission to write changes, run command using administrator permissions?\n\n${error.message}`,
                modal: true
            },
            "Yes"
        ).then((value?: string) => {
            if(value === "Yes"){
                // use temp files
                const workbenchTemp = fileSync().name;
                writeFileSync(workbenchTemp, content, "utf-8");
                const productTemp = fileSync().name;
                writeFileSync(productTemp, pJson, "utf-8");

                // sudo copy
                const command: string = copyCommand([
                    [workbenchTemp, workbench],
                    [productTemp, product]
                ]);
                exec(command, { name: "VSCode Extension Host" }, (err: any) => {
                    if(err)
                        window.showErrorMessage(
                            "Failed to write changes",
                            {
                                detail: `OS: ${process.platform}\nUsing command: ${command}\n\n${err.message}`,
                                modal: true
                            }
                        );
                    else
                        reload();
                });
            }
        })
    }
}