"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCarouselItem = exports.CarouselItem = void 0;
var _core = require("@vxe-ui/core");
var _carouselItem = _interopRequireDefault(require("../carousel/src/carousel-item"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCarouselItem = exports.VxeCarouselItem = Object.assign({}, _carouselItem.default, {
  install(app) {
    app.component(_carouselItem.default.name, _carouselItem.default);
  }
});
_dynamics.dynamicApp.use(VxeCarouselItem);
_core.VxeUI.component(_carouselItem.default);
const CarouselItem = exports.CarouselItem = VxeCarouselItem;
var _default = exports.default = VxeCarouselItem;