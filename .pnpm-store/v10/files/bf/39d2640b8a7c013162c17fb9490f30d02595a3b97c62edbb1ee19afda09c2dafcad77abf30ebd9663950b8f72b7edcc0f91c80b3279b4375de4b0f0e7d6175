"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleSplitterItem = assembleSplitterItem;
exports.destroySplitterItem = destroySplitterItem;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function assembleSplitterItem($xeSplitter, elem, paneConfig) {
  const staticItems = $xeSplitter.reactData.staticItems;
  const parentElem = elem.parentNode;
  if (parentElem) {
    staticItems.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, paneConfig);
    $xeSplitter.reactData.staticItems = staticItems.slice(0);
  }
}
function destroySplitterItem($xeSplitter, paneConfig) {
  const staticItems = $xeSplitter.reactData.staticItems;
  const index = _xeUtils.default.findIndexOf(staticItems, item => item.id === paneConfig.id);
  if (index > -1) {
    staticItems.splice(index, 1);
  }
  $xeSplitter.reactData.staticItems = staticItems.slice(0);
}