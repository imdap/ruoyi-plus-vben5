"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeImagePreview = exports.ImagePreview = void 0;
var _preview = _interopRequireDefault(require("../image/src/preview"));
var _core = require("@vxe-ui/core");
var _dynamics = require("../dynamics");
var _util = require("../image/src/util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeImagePreview = exports.VxeImagePreview = Object.assign(_preview.default, {
  install(app) {
    app.component(_preview.default.name, _preview.default);
  }
});
_core.VxeUI.previewImage = _util.openPreviewImage;
_dynamics.dynamicApp.use(VxeImagePreview);
_core.VxeUI.component(_preview.default);
const ImagePreview = exports.ImagePreview = VxeImagePreview;
var _default = exports.default = VxeImagePreview;