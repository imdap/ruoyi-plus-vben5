"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTooltip = exports.Tooltip = void 0;
var _core = require("@vxe-ui/core");
var _tooltip = _interopRequireDefault(require("./src/tooltip"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTooltip = exports.VxeTooltip = Object.assign({}, _tooltip.default, {
  install(app) {
    app.component(_tooltip.default.name, _tooltip.default);
  }
});
_dynamics.dynamicApp.use(VxeTooltip);
_core.VxeUI.component(_tooltip.default);
const Tooltip = exports.Tooltip = VxeTooltip;
var _default = exports.default = VxeTooltip;