"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeAnchor = exports.Anchor = void 0;
var _core = require("@vxe-ui/core");
var _anchor = _interopRequireDefault(require("./src/anchor"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeAnchor = exports.VxeAnchor = Object.assign({}, _anchor.default, {
  install(app) {
    app.component(_anchor.default.name, _anchor.default);
  }
});
_dynamics.dynamicApp.use(VxeAnchor);
_core.VxeUI.component(_anchor.default);
const Anchor = exports.Anchor = VxeAnchor;
var _default = exports.default = VxeAnchor;