"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeBadge = exports.Badge = void 0;
var _core = require("@vxe-ui/core");
var _badge = _interopRequireDefault(require("./src/badge"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeBadge = exports.VxeBadge = Object.assign({}, _badge.default, {
  install(app) {
    app.component(_badge.default.name, _badge.default);
  }
});
_dynamics.dynamicApp.use(VxeBadge);
_core.VxeUI.component(_badge.default);
const Badge = exports.Badge = VxeBadge;
var _default = exports.default = VxeBadge;