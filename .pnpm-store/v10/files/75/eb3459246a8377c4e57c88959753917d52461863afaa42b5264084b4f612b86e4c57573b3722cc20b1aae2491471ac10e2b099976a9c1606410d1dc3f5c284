"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeAnchorLink = exports.AnchorLink = void 0;
var _core = require("@vxe-ui/core");
var _anchorLink = _interopRequireDefault(require("../anchor/src/anchor-link"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeAnchorLink = exports.VxeAnchorLink = Object.assign({}, _anchorLink.default, {
  install(app) {
    app.component(_anchorLink.default.name, _anchorLink.default);
  }
});
_dynamics.dynamicApp.use(VxeAnchorLink);
_core.VxeUI.component(_anchorLink.default);
const AnchorLink = exports.AnchorLink = VxeAnchorLink;
var _default = exports.default = VxeAnchorLink;