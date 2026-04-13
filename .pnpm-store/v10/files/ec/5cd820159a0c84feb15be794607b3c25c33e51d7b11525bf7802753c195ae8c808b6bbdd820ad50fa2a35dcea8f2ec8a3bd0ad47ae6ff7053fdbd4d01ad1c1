"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTag = exports.Tag = void 0;
var _core = require("@vxe-ui/core");
var _tag = _interopRequireDefault(require("./src/tag"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTag = exports.VxeTag = Object.assign({}, _tag.default, {
  install(app) {
    app.component(_tag.default.name, _tag.default);
  }
});
_dynamics.dynamicApp.use(VxeTag);
_core.VxeUI.component(_tag.default);
const Tag = exports.Tag = VxeTag;
var _default = exports.default = VxeTag;