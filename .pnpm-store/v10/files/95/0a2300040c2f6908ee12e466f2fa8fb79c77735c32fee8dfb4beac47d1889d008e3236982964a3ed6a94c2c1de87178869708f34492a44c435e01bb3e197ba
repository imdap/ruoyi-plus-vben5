"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLayoutAside = exports.LayoutAside = void 0;
var _core = require("@vxe-ui/core");
var _layoutAside = _interopRequireDefault(require("./src/layout-aside"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLayoutAside = exports.VxeLayoutAside = Object.assign({}, _layoutAside.default, {
  install(app) {
    app.component(_layoutAside.default.name, _layoutAside.default);
  }
});
_dynamics.dynamicApp.use(VxeLayoutAside);
_core.VxeUI.component(_layoutAside.default);
const LayoutAside = exports.LayoutAside = VxeLayoutAside;
var _default = exports.default = VxeLayoutAside;