"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixEPERMSync = exports.fixEPERM = void 0;
const error_js_1 = require("./error.js");
const fs_js_1 = require("./fs.js");
const ignore_enoent_js_1 = require("./ignore-enoent.js");
const { chmod } = fs_js_1.promises;
const fixEPERM = (fn) => async (path) => {
    try {
        return void (await (0, ignore_enoent_js_1.ignoreENOENT)(fn(path)));
    }
    catch (er) {
        if ((0, error_js_1.errorCode)(er) === 'EPERM') {
            if (!(await (0, ignore_enoent_js_1.ignoreENOENT)(chmod(path, 0o666).then(() => true), er))) {
                return;
            }
            return void (await fn(path));
        }
        throw er;
    }
};
exports.fixEPERM = fixEPERM;
const fixEPERMSync = (fn) => (path) => {
    try {
        return void (0, ignore_enoent_js_1.ignoreENOENTSync)(() => fn(path));
    }
    catch (er) {
        if ((0, error_js_1.errorCode)(er) === 'EPERM') {
            if (!(0, ignore_enoent_js_1.ignoreENOENTSync)(() => ((0, fs_js_1.chmodSync)(path, 0o666), true), er)) {
                return;
            }
            return void fn(path);
        }
        throw er;
    }
};
exports.fixEPERMSync = fixEPERMSync;
//# sourceMappingURL=fix-eperm.js.map