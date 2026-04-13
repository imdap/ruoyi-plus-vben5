"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeColorPicker = exports.ColorPicker = void 0;
var _core = require("@vxe-ui/core");
var _colorPicker = _interopRequireDefault(require("./src/color-picker"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeColorPicker = exports.VxeColorPicker = Object.assign({}, _colorPicker.default, {
  install(app) {
    app.component(_colorPicker.default.name, _colorPicker.default);
  }
});
_dynamics.dynamicApp.use(VxeColorPicker);
_core.VxeUI.component(_colorPicker.default);
const ColorPicker = exports.ColorPicker = VxeColorPicker;
var _default = exports.default = VxeColorPicker;