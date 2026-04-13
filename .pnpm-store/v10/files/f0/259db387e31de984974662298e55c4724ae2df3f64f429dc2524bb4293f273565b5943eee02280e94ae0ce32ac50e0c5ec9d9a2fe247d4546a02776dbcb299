"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTextEllipsis = exports.TextEllipsis = void 0;
var _core = require("@vxe-ui/core");
var _textEllipsis = _interopRequireDefault(require("./src/text-ellipsis"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTextEllipsis = exports.VxeTextEllipsis = Object.assign({}, _textEllipsis.default, {
  install(app) {
    app.component(_textEllipsis.default.name, _textEllipsis.default);
  }
});
_dynamics.dynamicApp.use(VxeTextEllipsis);
_core.VxeUI.component(_textEllipsis.default);
const TextEllipsis = exports.TextEllipsis = VxeTextEllipsis;
var _default = exports.default = VxeTextEllipsis;