"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rimrafManualSync = exports.rimrafManual = void 0;
const rimraf_posix_js_1 = require("./rimraf-posix.js");
const rimraf_windows_js_1 = require("./rimraf-windows.js");
exports.rimrafManual = process.platform === 'win32' ? rimraf_windows_js_1.rimrafWindows : rimraf_posix_js_1.rimrafPosix;
exports.rimrafManualSync = process.platform === 'win32' ? rimraf_windows_js_1.rimrafWindowsSync : rimraf_posix_js_1.rimrafPosixSync;
//# sourceMappingURL=rimraf-manual.js.map