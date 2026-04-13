"use strict";
// Copyright 2025 Google LLC. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerModule = void 0;
const p = require("path");
const elf_1 = require("./elf");
/**
 * Detect if the given binary is linked with musl libc by checking if
 * the interpreter basename starts with "ld-musl-"
 */
function isLinuxMusl(path) {
    try {
        const interpreter = (0, elf_1.getElfInterpreter)(path);
        return p.basename(interpreter).startsWith('ld-musl-');
    }
    catch (error) {
        console.warn(`Warning: Failed to detect linux-musl, fallback to linux-gnu: ${error.message}`);
        return false;
    }
}
/** The module name for the embedded compiler executable. */
exports.compilerModule = (() => {
    const platform = process.platform === 'linux' && isLinuxMusl(process.execPath)
        ? 'linux-musl'
        : process.platform;
    const arch = process.arch;
    return `sass-embedded-${platform}-${arch}`;
})();
//# sourceMappingURL=compiler-module.js.map