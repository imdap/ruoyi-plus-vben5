"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeImageGroup = exports.ImageGroup = void 0;
var _core = require("@vxe-ui/core");
var _group = _interopRequireDefault(require("../image/src/group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeImageGroup = exports.VxeImageGroup = Object.assign({}, _group.default, {
  install(app) {
    app.component(_group.default.name, _group.default);
  }
});
_dynamics.dynamicApp.use(VxeImageGroup);
_core.VxeUI.component(_group.default);
const ImageGroup = exports.ImageGroup = VxeImageGroup;
var _default = exports.default = VxeImageGroup;