"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLayoutHeader = exports.LayoutHeader = void 0;
var _core = require("@vxe-ui/core");
var _layoutHeader = _interopRequireDefault(require("./src/layout-header"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLayoutHeader = exports.VxeLayoutHeader = Object.assign({}, _layoutHeader.default, {
  install(app) {
    app.component(_layoutHeader.default.name, _layoutHeader.default);
  }
});
_dynamics.dynamicApp.use(VxeLayoutHeader);
_core.VxeUI.component(_layoutHeader.default);
const LayoutHeader = exports.LayoutHeader = VxeLayoutHeader;
var _default = exports.default = VxeLayoutHeader;