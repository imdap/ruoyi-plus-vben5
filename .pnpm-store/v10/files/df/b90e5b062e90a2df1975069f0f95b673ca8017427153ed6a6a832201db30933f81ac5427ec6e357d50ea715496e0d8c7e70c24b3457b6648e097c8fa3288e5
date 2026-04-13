"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTextarea = exports.Textarea = void 0;
var _core = require("@vxe-ui/core");
var _textarea = _interopRequireDefault(require("./src/textarea"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTextarea = exports.VxeTextarea = Object.assign(_textarea.default, {
  install: function (app) {
    app.component(_textarea.default.name, _textarea.default);
  }
});
_dynamics.dynamicApp.use(VxeTextarea);
_core.VxeUI.component(_textarea.default);
const Textarea = exports.Textarea = VxeTextarea;
var _default = exports.default = VxeTextarea;