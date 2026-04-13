"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeAvatar = exports.Avatar = void 0;
var _core = require("@vxe-ui/core");
var _avatar = _interopRequireDefault(require("./src/avatar"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeAvatar = exports.VxeAvatar = Object.assign({}, _avatar.default, {
  install(app) {
    app.component(_avatar.default.name, _avatar.default);
  }
});
_dynamics.dynamicApp.use(VxeAvatar);
_core.VxeUI.component(_avatar.default);
const Avatar = exports.Avatar = VxeAvatar;
var _default = exports.default = VxeAvatar;