"use strict";
// Copyright 2021 Google LLC. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerCommand = void 0;
const p = require("path");
const compiler_module_1 = require("./compiler-module");
/** The full command for the embedded compiler executable. */
exports.compilerCommand = (() => {
    try {
        return [
            require.resolve(`${compiler_module_1.compilerModule}/dart-sass/src/dart` +
                (process.platform === 'win32' ? '.exe' : '')),
            require.resolve(`${compiler_module_1.compilerModule}/dart-sass/src/sass.snapshot`),
        ];
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
    }
    try {
        return [
            require.resolve(`${compiler_module_1.compilerModule}/dart-sass/sass` +
                (process.platform === 'win32' ? '.bat' : '')),
        ];
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
    }
    try {
        return [
            process.execPath,
            p.join(p.dirname(require.resolve('sass')), 'sass.js'),
        ];
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
    }
    throw new Error("Embedded Dart Sass couldn't find the embedded compiler executable. " +
        `Please make sure the optional dependency ${compiler_module_1.compilerModule} or sass is ` +
        'installed in node_modules.');
})();
//# sourceMappingURL=compiler-path.js.map