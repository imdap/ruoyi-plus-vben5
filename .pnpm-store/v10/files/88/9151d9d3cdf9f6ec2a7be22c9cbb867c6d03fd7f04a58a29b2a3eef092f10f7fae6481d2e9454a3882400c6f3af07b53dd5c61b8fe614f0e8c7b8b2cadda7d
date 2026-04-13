"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCarousel = exports.Carousel = void 0;
var _core = require("@vxe-ui/core");
var _carousel = _interopRequireDefault(require("./src/carousel"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCarousel = exports.VxeCarousel = Object.assign({}, _carousel.default, {
  install(app) {
    app.component(_carousel.default.name, _carousel.default);
  }
});
_dynamics.dynamicApp.use(VxeCarousel);
_core.VxeUI.component(_carousel.default);
const Carousel = exports.Carousel = VxeCarousel;
var _default = exports.default = VxeCarousel;