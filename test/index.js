const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "__testno__");

const vscode = require("@vscode/test-electron");

// !fs.existsSync(file) || fs.unlinkSync(file);

vscode.runTests({
    extensionDevelopmentPath: path.join(__dirname, "../"),
    extensionTestsPath: path.join(__dirname, "test.js")
});