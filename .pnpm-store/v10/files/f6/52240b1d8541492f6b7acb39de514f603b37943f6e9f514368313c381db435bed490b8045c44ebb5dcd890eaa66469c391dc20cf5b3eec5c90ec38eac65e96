"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeIconPicker = exports.IconPicker = void 0;
var _core = require("@vxe-ui/core");
var _iconPicker = _interopRequireDefault(require("./src/icon-picker"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeIconPicker = exports.VxeIconPicker = Object.assign(_iconPicker.default, {
  install: function (app) {
    app.component(_iconPicker.default.name, _iconPicker.default);
  }
});
_dynamics.dynamicApp.use(VxeIconPicker);
_core.VxeUI.component(_iconPicker.default);
const IconPicker = exports.IconPicker = VxeIconPicker;
var _default = exports.default = VxeIconPicker;