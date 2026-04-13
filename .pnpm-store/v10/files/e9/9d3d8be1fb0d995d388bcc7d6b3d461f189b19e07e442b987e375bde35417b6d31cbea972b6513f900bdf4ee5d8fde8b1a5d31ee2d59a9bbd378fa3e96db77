"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeIcon = exports.Icon = void 0;
var _core = require("@vxe-ui/core");
var _icon = _interopRequireDefault(require("./src/icon"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeIcon = exports.VxeIcon = Object.assign({}, _icon.default, {
  install(app) {
    app.component(_icon.default.name, _icon.default);
  }
});
_dynamics.dynamicApp.use(VxeIcon);
_core.VxeUI.component(_icon.default);
const Icon = exports.Icon = VxeIcon;
var _default = exports.default = VxeIcon;