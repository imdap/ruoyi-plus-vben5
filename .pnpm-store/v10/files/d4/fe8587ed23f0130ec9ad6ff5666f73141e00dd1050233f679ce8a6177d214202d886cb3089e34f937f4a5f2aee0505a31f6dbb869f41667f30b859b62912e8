"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTabs = exports.Tabs = void 0;
var _core = require("@vxe-ui/core");
var _tabs = _interopRequireDefault(require("./src/tabs"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTabs = exports.VxeTabs = Object.assign({}, _tabs.default, {
  install(app) {
    app.component(_tabs.default.name, _tabs.default);
  }
});
_dynamics.dynamicApp.use(VxeTabs);
_core.VxeUI.component(_tabs.default);
const Tabs = exports.Tabs = VxeTabs;
var _default = exports.default = VxeTabs;