"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleCarouselItem = assembleCarouselItem;
exports.destroyCarouselItem = destroyCarouselItem;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function assembleCarouselItem($xeCarousel, elem, itemConfig) {
  const staticItems = $xeCarousel.reactData.staticItems;
  const parentElem = elem.parentNode;
  if (parentElem) {
    staticItems.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, itemConfig);
  }
  $xeCarousel.reactData.staticItems = staticItems.slice(0);
}
function destroyCarouselItem($xeCarousel, itemConfig) {
  const staticItems = $xeCarousel.reactData.staticItems;
  const index = _xeUtils.default.findIndexOf(staticItems, item => item.id === itemConfig.id);
  if (index > -1) {
    staticItems.splice(index, 1);
  }
  $xeCarousel.reactData.staticItems = staticItems.slice(0);
}