"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promises = exports.readdirSync = exports.unlinkSync = exports.lstatSync = exports.statSync = exports.rmSync = exports.rmdirSync = exports.renameSync = exports.mkdirSync = exports.chmodSync = void 0;
const fs_1 = require("fs");
const promises_1 = __importDefault(require("fs/promises"));
// sync ones just take the sync version from node
// readdir forces withFileTypes: true
var fs_2 = require("fs");
Object.defineProperty(exports, "chmodSync", { enumerable: true, get: function () { return fs_2.chmodSync; } });
Object.defineProperty(exports, "mkdirSync", { enumerable: true, get: function () { return fs_2.mkdirSync; } });
Object.defineProperty(exports, "renameSync", { enumerable: true, get: function () { return fs_2.renameSync; } });
Object.defineProperty(exports, "rmdirSync", { enumerable: true, get: function () { return fs_2.rmdirSync; } });
Object.defineProperty(exports, "rmSync", { enumerable: true, get: function () { return fs_2.rmSync; } });
Object.defineProperty(exports, "statSync", { enumerable: true, get: function () { return fs_2.statSync; } });
Object.defineProperty(exports, "lstatSync", { enumerable: true, get: function () { return fs_2.lstatSync; } });
Object.defineProperty(exports, "unlinkSync", { enumerable: true, get: function () { return fs_2.unlinkSync; } });
const readdirSync = (path) => (0, fs_1.readdirSync)(path, { withFileTypes: true });
exports.readdirSync = readdirSync;
exports.promises = {
    chmod: promises_1.default.chmod,
    mkdir: promises_1.default.mkdir,
    readdir: (path) => promises_1.default.readdir(path, { withFileTypes: true }),
    rename: promises_1.default.rename,
    rm: promises_1.default.rm,
    rmdir: promises_1.default.rmdir,
    stat: promises_1.default.stat,
    lstat: promises_1.default.lstat,
    unlink: promises_1.default.unlink,
};
//# sourceMappingURL=fs.js.map