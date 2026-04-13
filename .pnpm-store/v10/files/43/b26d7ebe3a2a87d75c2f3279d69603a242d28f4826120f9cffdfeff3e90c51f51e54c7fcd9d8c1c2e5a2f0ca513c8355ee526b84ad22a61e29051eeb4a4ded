"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLink = exports.Link = void 0;
var _core = require("@vxe-ui/core");
var _link = _interopRequireDefault(require("./src/link"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLink = exports.VxeLink = Object.assign({}, _link.default, {
  install(app) {
    app.component(_link.default.name, _link.default);
  }
});
_dynamics.dynamicApp.use(VxeLink);
_core.VxeUI.component(_link.default);
const Link = exports.Link = VxeLink;
var _default = exports.default = VxeLink;