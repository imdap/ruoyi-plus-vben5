"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLayoutBody = exports.LayoutBody = void 0;
var _core = require("@vxe-ui/core");
var _layoutBody = _interopRequireDefault(require("./src/layout-body"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLayoutBody = exports.VxeLayoutBody = Object.assign({}, _layoutBody.default, {
  install(app) {
    app.component(_layoutBody.default.name, _layoutBody.default);
  }
});
_dynamics.dynamicApp.use(VxeLayoutBody);
_core.VxeUI.component(_layoutBody.default);
const LayoutBody = exports.LayoutBody = VxeLayoutBody;
var _default = exports.default = VxeLayoutBody;