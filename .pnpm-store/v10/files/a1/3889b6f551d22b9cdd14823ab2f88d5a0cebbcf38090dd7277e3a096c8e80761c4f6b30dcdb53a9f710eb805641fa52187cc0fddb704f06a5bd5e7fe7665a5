#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const path = require("path");
const compiler_path_1 = require("../lib/src/compiler-path");
// TODO npm/cmd-shim#152 and yarnpkg/berry#6422 - If and when the package
// managers support it, we should make this a proper shell script rather than a
// JS wrapper.
try {
    let command = compiler_path_1.compilerCommand[0];
    let args = [...compiler_path_1.compilerCommand.slice(1), ...process.argv.slice(2)];
    const options = {
        stdio: 'inherit',
        windowsHide: true,
    };
    // Node forbids launching .bat and .cmd without a shell due to CVE-2024-27980,
    // and DEP0190 forbids passing an argument list *with* shell: true. To work
    // around this, we have to manually concatenate the arguments.
    if (['.bat', '.cmd'].includes(path.extname(command).toLowerCase())) {
        command = `${command} ${args.join(' ')}`;
        args = [];
        options.shell = true;
    }
    child_process.execFileSync(command, args, options);
}
catch (error) {
    if (error.code) {
        throw error;
    }
    else {
        process.exitCode = error.status;
    }
}
//# sourceMappingURL=sass.js.map