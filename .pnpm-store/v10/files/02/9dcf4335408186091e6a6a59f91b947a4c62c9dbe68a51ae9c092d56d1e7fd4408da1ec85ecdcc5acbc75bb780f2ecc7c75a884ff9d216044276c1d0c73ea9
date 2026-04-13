"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeImage = exports.Image = void 0;
var _core = require("@vxe-ui/core");
var _image = _interopRequireDefault(require("./src/image"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeImage = exports.VxeImage = Object.assign({}, _image.default, {
  install(app) {
    app.component(_image.default.name, _image.default);
  }
});
_dynamics.dynamicApp.use(VxeImage);
_core.VxeUI.component(_image.default);
const Image = exports.Image = VxeImage;
var _default = exports.default = VxeImage;