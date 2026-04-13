"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeText = exports.Text = void 0;
var _core = require("@vxe-ui/core");
var _text = _interopRequireDefault(require("./src/text"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeText = exports.VxeText = Object.assign({}, _text.default, {
  install(app) {
    app.component(_text.default.name, _text.default);
  }
});
_dynamics.dynamicApp.use(VxeText);
_core.VxeUI.component(_text.default);
const Text = exports.Text = VxeText;
var _default = exports.default = VxeText;