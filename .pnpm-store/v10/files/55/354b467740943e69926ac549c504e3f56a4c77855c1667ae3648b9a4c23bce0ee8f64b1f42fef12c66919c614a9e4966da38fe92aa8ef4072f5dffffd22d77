"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeUpload = exports.Upload = void 0;
var _upload = _interopRequireDefault(require("./src/upload"));
var _core = require("@vxe-ui/core");
var _dynamics = require("../dynamics");
var _util = require("./src/util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeUpload = exports.VxeUpload = Object.assign({}, _upload.default, {
  install(app) {
    app.component(_upload.default.name, _upload.default);
  }
});
_dynamics.dynamicApp.use(VxeUpload);
_core.VxeUI.component(_upload.default);
_core.VxeUI.saveFile = _util.saveLocalFile;
_core.VxeUI.readFile = _util.readLocalFile;
const Upload = exports.Upload = VxeUpload;
var _default = exports.default = VxeUpload;