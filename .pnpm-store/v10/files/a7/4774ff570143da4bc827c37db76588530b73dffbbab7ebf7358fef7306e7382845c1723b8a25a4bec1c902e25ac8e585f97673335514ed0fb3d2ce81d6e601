"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLayoutContainer = exports.LayoutContainer = void 0;
var _core = require("@vxe-ui/core");
var _layoutContainer = _interopRequireDefault(require("./src/layout-container"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLayoutContainer = exports.VxeLayoutContainer = Object.assign({}, _layoutContainer.default, {
  install(app) {
    app.component(_layoutContainer.default.name, _layoutContainer.default);
  }
});
_dynamics.dynamicApp.use(VxeLayoutContainer);
_core.VxeUI.component(_layoutContainer.default);
const LayoutContainer = exports.LayoutContainer = VxeLayoutContainer;
var _default = exports.default = VxeLayoutContainer;