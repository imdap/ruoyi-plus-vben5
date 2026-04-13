"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSlider = exports.Slider = void 0;
var _core = require("@vxe-ui/core");
var _slider = _interopRequireDefault(require("./src/slider"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSlider = exports.VxeSlider = Object.assign({}, _slider.default, {
  install(app) {
    app.component(_slider.default.name, _slider.default);
  }
});
_dynamics.dynamicApp.use(VxeSlider);
_core.VxeUI.component(_slider.default);
const Slider = exports.Slider = VxeSlider;
var _default = exports.default = VxeSlider;